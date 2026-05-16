<?php

use App\Models\Billboard;
use App\Models\Department;
use App\Models\GovernanceYear;
use App\Models\User;

describe('CEO POST routes (role 1)', function () {
    beforeEach(function () {
        $this->ceo = staffUser(1);
        $this->actingAs($this->ceo);
    });

    test('CEO can add department', function () {
        $manager = staffUser(4);
        $name = 'Dept Test ' . uniqid();

        $this->post(STAFF_PREFIX . '/department/add', [
            'name'       => $name,
            'manager_id' => $manager->id,
        ])->assertRedirect();

        $this->assertDatabaseHas('department', ['name' => $name]);
    });

    test('CEO cannot add department without manager_id', function () {
        $this->post(STAFF_PREFIX . '/department/add', [
            'name' => 'Dept Tanpa Manager',
        ])->assertSessionHasErrors('manager_id');
    });

    test('role 2 cannot add department', function () {
        $finance = staffUser(2);
        $manager = staffUser(4);

        $this->actingAs($finance)
            ->post(STAFF_PREFIX . '/department/add', [
                'name'       => 'Blocked Dept',
                'manager_id' => $manager->id,
            ])
            ->assertRedirect();

        $this->assertDatabaseMissing('department', ['name' => 'Blocked Dept']);
    });

    test('CEO can store governance year', function () {
        $year = 2090 + random_int(1, 9);

        $this->post(STAFF_PREFIX . '/ceo/year', [
            'year'  => $year,
            'label' => 'Test Year',
        ])->assertRedirect();

        $this->assertDatabaseHas('governance_years', ['year' => $year]);
    });

    test('CEO can toggle governance year', function () {
        $gy = GovernanceYear::create([
            'year'      => 2088,
            'label'     => 'Toggle Test',
            'is_active' => false,
        ]);

        $this->post(STAFF_PREFIX . "/ceo/year/{$gy->id}/toggle")
            ->assertRedirect();

        expect($gy->fresh()->is_active)->toBeTrue();
    });

    test('CEO can promote non-staff user', function () {
        $applicant = User::factory()->create(['roles_id' => null]);

        $this->post(STAFF_PREFIX . "/ceo/user/{$applicant->id}/promote")
            ->assertRedirect();

        expect($applicant->fresh()->roles_id)->toBe(4);
    });

    test('CEO can assign role to staff', function () {
        $staff = staffUser(4);

        $this->post(STAFF_PREFIX . "/ceo/user/{$staff->id}/role", [
            'roles_id' => 10,
        ])->assertRedirect();

        expect($staff->fresh()->roles_id)->toBe(10);
    });

    test('CEO cannot change own role', function () {
        $this->post(STAFF_PREFIX . '/ceo/user/' . $this->ceo->id . '/role', [
            'roles_id' => 2,
        ])
            ->assertRedirect()
            ->assertSessionHas('notif.type', 'warning');

        expect($this->ceo->fresh()->roles_id)->toBe(1);
    });

    test('CEO can add text billboard', function () {
        $this->post(STAFF_PREFIX . '/billboard/add', [
            'billboard_title'    => 'CEO Billboard',
            'billboard_typeText' => '1',
            'billboard_text'     => 'Isi pengumuman',
        ])
            ->assertRedirect()
            ->assertSessionHas('notif.type', 'info');

        $this->assertDatabaseHas('billboard', ['title' => 'CEO Billboard']);
    });

    test('CEO can delete billboard', function () {
        $billboard = Billboard::create([
            'type'  => 2,
            'title' => 'Hapus Ini',
            'text'  => 'Teks',
        ]);

        $this->post(STAFF_PREFIX . "/billboard/delete/{$billboard->id}")
            ->assertRedirect();
    });
});

describe('Finance POST routes (role 2)', function () {
    beforeEach(function () {
        useFakeStorageDisks();
        $this->finance = staffUser(2);
        $this->actingAs($this->finance);
        \App\Models\CashInItem::create([
            'name'  => 'Seed Item',
            'price' => 0,
        ]);
    });

    test('finance can add cash-in with receipt upload', function () {
        $name = 'Cash In ' . uniqid();

        $this->post(STAFF_PREFIX . '/cash_in_item/item/add', [
            'name'    => $name,
            'price'   => 500000,
            'receipt' => fakeImageUpload(),
        ])
            ->assertRedirect()
            ->assertSessionHas('notif.type', 'info');

        $this->assertDatabaseHas('cash_in_item', ['name' => $name]);
    });

    test('cash-in requires receipt file', function () {
        $this->post(STAFF_PREFIX . '/cash_in_item/item/add', [
            'name'  => 'Tanpa Receipt',
            'price' => 1000,
        ])->assertSessionHasErrors('receipt');
    });

    test('role 3 cannot add cash-in', function () {
        $ops = staffUser(3);
        $this->actingAs($ops)
            ->post(STAFF_PREFIX . '/cash_in_item/item/add', [
                'name'    => 'Blocked',
                'price'   => 1,
                'receipt' => fakeImageUpload(),
            ])
            ->assertRedirect();
    });

    test('finance can validate cash-in item', function () {
        $item = \App\Models\CashInItem::create([
            'name'         => 'Validate Me',
            'price'        => 10000,
            'financial_id' => 0,
        ]);

        $this->post(STAFF_PREFIX . "/cash_in_item/item/validate/{$item->id}")
            ->assertRedirect();

        expect($item->fresh()->financial_id)->toBe($this->finance->id);
    });

    test('finance can delete cash-in item', function () {
        $item = \App\Models\CashInItem::create([
            'name'  => 'Delete Me ' . uniqid(),
            'price' => 5000,
        ]);

        $this->post(STAFF_PREFIX . "/cash_in_item/item/delete/{$item->id}")
            ->assertRedirect();
    });

    test('role 1 cannot validate budget (role 2 only)', function () {
        $ceo = staffUser(1);
        $this->actingAs($ceo)
            ->post(STAFF_PREFIX . '/program/budget/validate/1/1')
            ->assertRedirect();
    });
});
