<?php

use App\Models\Department;
use App\Models\Program;
use App\Models\User;
use Illuminate\Support\Facades\DB;



describe('Department - Index', function () {
    test('CEO can access department index page', function () {
        $user = User::factory()->create(['roles_id' => 1]);
        $this->actingAs($user)->get('/seeo/staff/structural')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('Staff/SEEO/Structural'));
    });

    test('guest is redirected to login', function () {
        $this->get('/seeo/staff/structural')->assertRedirect('/login');
    });
});

describe('Department - Store', function () {
    beforeEach(function () {
        $this->ceo = User::factory()->create(['roles_id' => 1]);
        $this->actingAs($this->ceo);
    });

    test('CEO can create new department', function () {
        $manager = User::factory()->create(['roles_id' => 2]); // Manager

        $response = $this->post('/seeo/staff/department/add', [
            'name' => 'IT Research',
            'manager_id' => $manager->id,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');

        $this->assertDatabaseHas('department', [
            'name' => 'IT Research',
            'manager_id' => $manager->id,
        ]);
    });

    test('department creation fails without name', function () {
        $this->post('/seeo/staff/department/add', [
            'manager_id' => 1,
        ])->assertSessionHasErrors('name');
    });

    test('Super Admin can create new department', function () {
        $admin = User::factory()->create(['roles_id' => 99]);
        $manager = User::factory()->create(['roles_id' => 2]);

        $response = $this->actingAs($admin)->post('/seeo/staff/department/add', [
            'name' => 'Admin Dept ' . uniqid(),
            'manager_id' => $manager->id,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');
    });

    test('Co-CEO can create new department', function () {
        $coCeo = User::factory()->create(['roles_id' => 7]);
        $manager = User::factory()->create(['roles_id' => 2]);

        $response = $this->actingAs($coCeo)->post('/seeo/staff/department/add', [
            'name' => 'Co-CEO Dept ' . uniqid(),
            'manager_id' => $manager->id,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');
    });

    test('Staff cannot create new department', function () {
        $staff = User::factory()->create(['roles_id' => 4]);
        $manager = User::factory()->create(['roles_id' => 2]);

        $response = $this->actingAs($staff)->post('/seeo/staff/department/add', [
            'name' => 'Staff Blocked Dept',
            'manager_id' => $manager->id,
        ]);

        $response->assertForbidden();
        $this->assertDatabaseMissing('department', ['name' => 'Staff Blocked Dept']);
    });
});

describe('Department - Update', function () {
    beforeEach(function () {
        $this->ceo = User::factory()->create(['roles_id' => 1]);
        $this->manager1 = User::factory()->create(['roles_id' => 2]);
        $this->manager2 = User::factory()->create(['roles_id' => 2]);

        $this->department = Department::create([
            'name' => 'Old Dept Name',
            'manager_id' => $this->manager1->id,
            'budget' => 0,
        ]);

        $this->actingAs($this->ceo);
    });

    test('CEO can update department name and manager', function () {
        $response = $this->post("/seeo/staff/department/update/{$this->department->id}", [
            'name' => 'New Dept Name',
            'manager_id' => $this->manager2->id,
        ]);

        $response->assertRedirect();
        
        $updated = $this->department->fresh();
        $this->assertEquals('New Dept Name', $updated->name);
        $this->assertEquals($this->manager2->id, $updated->manager_id);
    });

    test('department name must be unique on update', function () {
        Department::create([
            'name' => 'Existing Dept',
            'manager_id' => $this->manager1->id,
        ]);

        $this->post("/seeo/staff/department/update/{$this->department->id}", [
            'name' => 'Existing Dept', // Duplicate name
            'manager_id' => $this->manager2->id,
        ])->assertSessionHasErrors('name');
    });

    test('Staff cannot update department', function () {
        $staff = User::factory()->create(['roles_id' => 4]);

        $this->actingAs($staff)->post("/seeo/staff/department/update/{$this->department->id}", [
            'name' => 'Hacked Dept Name',
            'manager_id' => $this->manager2->id,
        ])->assertForbidden();

        $this->assertDatabaseMissing('department', ['name' => 'Hacked Dept Name']);
    });
});

describe('Department - Delete', function () {
    beforeEach(function () {
        $this->ceo = User::factory()->create(['roles_id' => 1, 'password' => bcrypt('password')]);
        $this->actingAs($this->ceo);
    });

    test('can delete department with no budget and no programs', function () {
        $dept = Department::create([
            'name' => 'Empty Dept',
            'manager_id' => $this->ceo->id,
            'budget' => 0,
            'expense' => 0,
        ]);

        $response = $this->post("/seeo/staff/department/delete/{$dept->id}", [
            'password' => 'password'
        ]);
        
        $response->assertRedirect('/seeo/staff/structural');
        $this->assertSoftDeleted('department', ['id' => $dept->id]);
    });

    test('cannot delete department if it has budget', function () {
        $dept = Department::create([
            'name' => 'Funded Dept',
            'manager_id' => $this->ceo->id,
            'budget' => 1000000,
        ]);

        $response = $this->post("/seeo/staff/department/delete/{$dept->id}", [
            'password' => 'password'
        ]);
        
        $response->assertSessionHas('notif.type', 'warning');
        $this->assertDatabaseHas('department', ['id' => $dept->id]);
    });

    test('deleting department releases all assigned staff', function () {
        $staff = User::factory()->create(['roles_id' => 4]);
        $dept = Department::create([
            'name' => 'Temporary Dept',
            'manager_id' => $this->ceo->id,
        ]);
        $staff->forceFill(['department_id' => $dept->id])->save();

        $this->post("/seeo/staff/department/delete/{$dept->id}", [
            'password' => 'password',
        ])->assertRedirect('/seeo/staff/structural');

        expect($staff->fresh()->department_id)->toBeNull();
    });

    test('Staff cannot delete department', function () {
        $staff = User::factory()->create(['roles_id' => 4, 'password' => bcrypt('password')]);
        $dept = Department::create([
            'name' => 'Staff Cannot Delete Dept',
            'manager_id' => $this->ceo->id,
            'budget' => 0,
            'expense' => 0,
        ]);

        $response = $this->actingAs($staff)->post("/seeo/staff/department/delete/{$dept->id}", [
            'password' => 'password',
        ]);

        $response->assertForbidden();
        $this->assertDatabaseHas('department', ['id' => $dept->id, 'deleted_at' => null]);
    });
});

describe('Department - Staff membership', function () {
    beforeEach(function () {
        $this->manager = User::factory()->create(['roles_id' => 4]);
        $this->staff = User::factory()->create(['roles_id' => 4]);
        $this->department = Department::create([
            'name' => 'Marketing & Medinfo',
            'manager_id' => $this->manager->id,
        ]);

        $this->manager->forceFill(['department_id' => $this->department->id])->save();
        $this->staff->forceFill(['department_id' => $this->department->id])->save();
    });

    test('department manager can remove a staff member who is also a program PIC', function () {
        Program::create([
            'name' => 'Campaign',
            'department_id' => $this->department->id,
            'pic_id' => $this->staff->id,
        ]);

        $response = $this->actingAs($this->manager)
            ->post("/seeo/staff/department/staff/remove/{$this->staff->id}");

        $response->assertRedirect()->assertSessionHas('notif.type', 'info');
        expect($this->staff->fresh()->department_id)->toBeNull();
    });

    test('organization manager can remove department staff', function () {
        $ceo = User::factory()->create(['roles_id' => 1]);

        $response = $this->actingAs($ceo)
            ->post("/seeo/staff/department/staff/remove/{$this->staff->id}");

        $response->assertRedirect()->assertSessionHas('notif.type', 'info');
        expect($this->staff->fresh()->department_id)->toBeNull();
    });

    test('unprivileged staff cannot remove another department member', function () {
        $outsider = User::factory()->create(['roles_id' => 4]);

        $response = $this->actingAs($outsider)
            ->post("/seeo/staff/department/staff/remove/{$this->staff->id}");

        $response->assertRedirect()->assertSessionHas('notif.type', 'danger');
        expect($this->staff->fresh()->department_id)->toBe($this->department->id);
    });

    test('department membership grants and revokes department capabilities', function () {
        expect($this->staff->fresh()->canPerform('marketing.manage'))->toBeTrue();

        $this->actingAs($this->manager)
            ->post("/seeo/staff/department/staff/remove/{$this->staff->id}");

        expect($this->staff->fresh()->canPerform('marketing.manage'))->toBeFalse()
            ->and($this->staff->fresh()->canPerform('organization.view'))->toBeTrue();
    });

    test('removing employee status also clears department and missing payroll level safely', function () {
        $ceo = User::factory()->create(['roles_id' => 1]);
        $this->staff->forceFill(['level' => 99])->save();

        $response = $this->actingAs($ceo)
            ->post("/seeo/staff/user/role/remove/{$this->staff->id}");

        $response->assertRedirect('/seeo/staff/user')->assertSessionHas('notif.type', 'info');
        $removedStaff = $this->staff->fresh();
        expect($removedStaff->roles_id)->toBeNull()
            ->and($removedStaff->department_id)->toBeNull()
            ->and($removedStaff->level)->toBeNull();
    });
});
