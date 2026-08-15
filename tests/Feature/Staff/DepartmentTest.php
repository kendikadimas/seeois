<?php

use App\Models\Department;
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
});
