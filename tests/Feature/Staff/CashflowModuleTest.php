<?php

use App\Models\CashInItem;

describe('Cashflow module access', function () {
    test('role 2 can access finance page', function () {
        $user = staffUser(2);
        $this->actingAs($user)->get(STAFF_PREFIX . '/finance')->assertOk();
    });

    test('role 2 can access finance feature page', function () {
        $user = staffUser(2);
        $this->actingAs($user)->get(STAFF_PREFIX . '/finance_feature')->assertOk();
    });

    test('role 10 can access finance page (general staff route)', function () {
        $user = staffUser(10);
        $this->actingAs($user)->get(STAFF_PREFIX . '/finance')->assertOk();
    });

    test('role 10 cannot access finance pending-docs panel', function () {
        $user = staffUser(10);
        $this->actingAs($user)->get(STAFF_PREFIX . '/finance/pending-docs')->assertForbidden();
    });

    test('staff can filter cashflow in', function () {
        $user = staffUser(2);
        $this->actingAs($user)
            ->post(STAFF_PREFIX . '/cashflow/in', ['name' => 'test'])
            ->assertRedirect();
    });

    test('staff can filter cashflow out', function () {
        $user = staffUser(2);
        $this->actingAs($user)
            ->post(STAFF_PREFIX . '/cashflow/out', ['name' => 'test'])
            ->assertRedirect();
    });
});

describe('Cashflow cash-in with receipt upload', function () {
    beforeEach(function () {
        useFakeStorageDisks();
        CashInItem::create(['name' => 'Bootstrap', 'price' => 0]);
        $this->actingAs(staffUser(2));
    });

    test('cash-in receipt is stored on disk', function () {
        $name = 'Receipt Test ' . uniqid();

        $this->post(STAFF_PREFIX . '/cash_in_item/item/add', [
            'name'    => $name,
            'price'   => 75000,
            'receipt' => fakeImageUpload(),
        ])->assertRedirect();

        $item = CashInItem::where('name', $name)->first();
        expect($item->reciept)->not->toBeNull();

        $disk = config('app.env') === 'production' ? 'google' : 'public';
        expect(\Illuminate\Support\Facades\Storage::disk($disk)
            ->exists('images/receipt/cash_in/' . $item->reciept))->toBeTrue();
    });
});
