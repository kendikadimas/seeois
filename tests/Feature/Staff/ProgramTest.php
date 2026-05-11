<?php

use App\Models\Department;
use App\Models\Program;
use App\Models\ProgramStaff;
use App\Models\User;
use App\Models\BudgetItem;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

describe('Program Controller - Index', function () {
    beforeEach(function () {
        $this->user = User::factory()->create(['roles_id' => 1]); // CEO
        $this->department = Department::create([
            'name' => 'IT Department',
            'manager_id' => $this->user->id,
            'budget' => 1000000,
        ]);
        $this->program = Program::create([
            'name' => 'Bootcamp',
            'department_id' => $this->department->id,
            'pic_id' => $this->user->id,
            'budget' => 0,
            'expense' => 0,
            'disbursement' => 0,
        ]);
        $this->actingAs($this->user);
    });

    test('staff can access program details', function () {
        $this->get("/seeo/program/{$this->program->id}")
            ->assertStatus(200);
    });

    test('redirects to department if program not found', function () {
        $this->get('/seeo/program/9999')->assertRedirect('/seeo/structural');
    });
});

describe('Program Store & Update', function () {
    beforeEach(function () {
        $this->manager = User::factory()->create(['roles_id' => 2]); // Manager
        $this->department = Department::create([
            'name' => 'Marketing',
            'manager_id' => $this->manager->id,
            'budget' => 5000000,
        ]);
        $this->actingAs($this->manager);
    });

    test('manager can create new program in their department', function () {
        $pic = User::factory()->create(['roles_id' => 4]);

        $response = $this->post("/program/add/{$this->department->id}", [
            'name' => 'Campaign Q1',
            'pic_id' => $pic->id,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');

        $this->assertDatabaseHas('program', [
            'name' => 'Campaign Q1',
            'department_id' => $this->department->id,
            'pic_id' => $pic->id,
        ]);

        // Assert PIC is automatically added as Program Staff
        $this->assertDatabaseHas('program_staff', [
            'user_id' => $pic->id,
            'title' => 'Person In Charge',
        ]);
    });

    test('cannot create program if not department manager', function () {
        $otherStaff = User::factory()->create(['roles_id' => 4]);
        
        $response = $this->actingAs($otherStaff)->post("/program/add/{$this->department->id}", [
            'name' => 'Campaign Q1',
            'pic_id' => $otherStaff->id,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('notif.message', 'You are not allowed. Please contact the Manager.');
    });

    test('can update program details', function () {
        $pic1 = User::factory()->create(['roles_id' => 4]);
        $pic2 = User::factory()->create(['roles_id' => 4]);

        $program = Program::create([
            'name' => 'Old Program',
            'department_id' => $this->department->id,
            'pic_id' => $pic1->id,
        ]);

        $response = $this->post("/program/update/{$program->id}", [
            'name' => 'Updated Program Name',
            'pic_id' => $pic2->id,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('program', [
            'id' => $program->id,
            'name' => 'Updated Program Name',
            'pic_id' => $pic2->id,
        ]);
    });
});

describe('Program Deletion', function () {
    beforeEach(function () {
        $this->user = User::factory()->create(['roles_id' => 1]);
        $this->department = Department::create([
            'name' => 'IT Department',
            'manager_id' => $this->user->id,
        ]);
        $this->actingAs($this->user);
    });

    test('can delete program with no budget, expense, or extra staff', function () {
        $program = Program::create([
            'name' => 'Empty Program',
            'department_id' => $this->department->id,
            'pic_id' => $this->user->id,
            'budget' => 0,
            'expense' => 0,
            'disbursement' => 0,
        ]);

        // Add PIC as staff
        ProgramStaff::create([
            'program_id' => $program->id,
            'user_id' => $this->user->id,
            'title' => 'PIC'
        ]);

        $response = $this->post("/program/delete/{$program->id}");
        $response->assertRedirect();
        $this->assertSoftDeleted('program', ['id' => $program->id]);
    });

    test('cannot delete program if it has budget', function () {
        $program = Program::create([
            'name' => 'Funded Program',
            'department_id' => $this->department->id,
            'pic_id' => $this->user->id,
            'budget' => 1000,
        ]);

        $response = $this->post("/program/delete/{$program->id}");
        $response->assertSessionHas('notif.type', 'warning');
        $this->assertDatabaseHas('program', ['id' => $program->id]);
    });
});

describe('Program Staff Management', function () {
    beforeEach(function () {
        $this->user = User::factory()->create(['roles_id' => 1]);
        $this->program = Program::create([
            'name' => 'Test Program',
            'department_id' => 1,
            'pic_id' => $this->user->id,
        ]);
        $this->actingAs($this->user);
    });

    test('can add staff to program', function () {
        $staff = User::factory()->create(['roles_id' => 4]);

        $response = $this->post("/program/staff/add/{$this->program->id}", [
            'staff_id' => $staff->id,
            'staff_title' => 'Developer',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('program_staff', [
            'program_id' => $this->program->id,
            'user_id' => $staff->id,
            'title' => 'Developer',
        ]);
    });

    test('can remove staff from program', function () {
        $staffUser = User::factory()->create(['roles_id' => 4]);
        $staff = ProgramStaff::create([
            'program_id' => $this->program->id,
            'user_id' => $staffUser->id,
            'title' => 'Developer',
        ]);

        $this->post("/program/staff/delete/{$staff->id}")->assertRedirect();
        $this->assertSoftDeleted('program_staff', ['id' => $staff->id]);
    });
});

describe('Program Budget Validation', function () {
    test('can validate program budget', function () {
        $user = User::factory()->create(['roles_id' => 2]); // Need role 2 for validate budget
        $this->actingAs($user);

        $program = Program::create([
            'name' => 'Test Program',
            'department_id' => 1,
            'pic_id' => $user->id,
            'financial_id' => 0, // Unvalidated
        ]);

        // 1 means validate
        $this->post("/program/budget/validate/{$program->id}/1")->assertRedirect();
        
        $this->assertEquals($user->id, $program->fresh()->financial_id);
    });

    test('can invalidate program budget', function () {
        $user = User::factory()->create(['roles_id' => 2]); // Need role 2
        $this->actingAs($user);

        $program = Program::create([
            'name' => 'Test Program',
            'department_id' => 1,
            'pic_id' => $user->id,
            'financial_id' => $user->id, // Validated
        ]);

        // 0 means invalidate
        $this->post("/program/budget/validate/{$program->id}/0")->assertRedirect();
        
        $this->assertEquals(0, $program->fresh()->financial_id);
    });
});
