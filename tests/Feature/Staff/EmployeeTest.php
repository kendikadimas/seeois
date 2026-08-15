<?php

use App\Models\Department;
use App\Models\PayrollLevel;
use App\Models\Role;
use App\Models\User;



// ============================================================
// EMPLOYEE / USER MANAGEMENT
// ============================================================

describe('Employee Index', function () {
    test('CEO can view employee management page', function () {
        $user = User::factory()->create(['roles_id' => 1]);
        $this->actingAs($user)->get('/seeo/staff/user')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('Staff/SEEO/Employee'));
    });

    test('guest is redirected from employee page', function () {
        $this->get('/seeo/staff/user')->assertRedirect('/login');
    });
});

describe('Add Employee', function () {
    test('CEO can promote a registered user to employee', function () {
        $ceo      = User::factory()->create(['roles_id' => 1]);
        $newStaff = User::factory()->create(['roles_id' => null]);

        $this->actingAs($ceo)->post("/seeo/staff/user/recruit/{$newStaff->id}");

        $this->assertEquals(4, $newStaff->fresh()->roles_id);
    });

    test('adding non-existent user as employee returns redirect', function () {
        $ceo = User::factory()->create(['roles_id' => 1]);

        // User 9999 does not exist, should still redirect without crashing
        $this->actingAs($ceo)->post('/seeo/staff/user/recruit/9999')->assertStatus(302);
    });
});

describe('Update Employee Role', function () {
    test('CEO can update another employee role', function () {
        $ceo       = User::factory()->create(['roles_id' => 1]);
        $employee  = User::factory()->create(['roles_id' => 4]);

        $this->actingAs($ceo)->post('/seeo/staff/user/role/update', [
            'user_id'  => $employee->id,
            'roles_id' => 5,
        ]);

        $this->assertEquals(5, $employee->fresh()->roles_id);
    });

    test('CEO cannot update their own role', function () {
        $ceo = User::factory()->create(['roles_id' => 1]);

        $response = $this->actingAs($ceo)->post('/seeo/staff/user/role/update', [
            'user_id'  => $ceo->id,
            'roles_id' => 4,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'warning');
        $this->assertEquals(1, $ceo->fresh()->roles_id); // Role unchanged
    });

    test('update fails without user_id', function () {
        $ceo = User::factory()->create(['roles_id' => 1]);

        $this->actingAs($ceo)->post('/seeo/staff/user/role/update', [
            'roles_id' => 4,
        ])->assertSessionHasErrors('user_id');
    });

    test('update fails without roles_id', function () {
        $ceo      = User::factory()->create(['roles_id' => 1]);
        $employee = User::factory()->create(['roles_id' => 4]);

        $this->actingAs($ceo)->post('/seeo/staff/user/role/update', [
            'user_id' => $employee->id,
        ])->assertSessionHasErrors('roles_id');
    });
});

describe('Delete Employee from Staff', function () {
    test('CEO can remove employee from staff list', function () {
        $ceo      = User::factory()->create(['roles_id' => 1]);
        $employee = User::factory()->create(['roles_id' => 4]);

        $this->actingAs($ceo)->post("/seeo/staff/user/role/remove/{$employee->id}");

        $this->assertNull($employee->fresh()->roles_id);
    });

    test('CEO cannot delete themselves from staff list', function () {
        $ceo = User::factory()->create(['roles_id' => 1]);

        $response = $this->actingAs($ceo)->post("/seeo/staff/user/role/remove/{$ceo->id}");

        $response->assertSessionHas('notif.type', 'warning');
        $this->assertEquals(1, $ceo->fresh()->roles_id);
    });

    test('delete non-existent user returns danger notif', function () {
        $ceo = User::factory()->create(['roles_id' => 1]);

        $response = $this->actingAs($ceo)->post('/seeo/staff/user/role/remove/9999');
        $response->assertSessionHas('notif.type', 'danger');
    });
});

describe('Filter Employee', function () {
    test('employee filter stores keyword in session', function () {
        $ceo = User::factory()->create(['roles_id' => 1]);

        $this->actingAs($ceo)->post('/seeo/staff/user', [
            'keyword' => 'Budi',
        ])->assertRedirect();

        $response = $this->actingAs($ceo)->get('/seeo/user');
        $this->assertEquals('Budi', session('employee')['keyword']);
    });

    test('unemployee filter stores keyword in session', function () {
        $ceo = User::factory()->create(['roles_id' => 1]);

        $this->actingAs($ceo)->post('/seeo/staff/unemployee', [
            'keyword' => 'Siti',
        ])->assertRedirect();

        $this->assertEquals('Siti', session('unemployee')['keyword']);
    });
});
