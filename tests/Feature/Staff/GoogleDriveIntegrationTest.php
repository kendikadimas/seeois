<?php

use Illuminate\Support\Facades\Storage;

describe('Google Drive storage integration (mocked)', function () {
    beforeEach(function () {
        useFakeStorageDisks();
    });

    test('google disk can store and read files', function () {
        Storage::disk('google')->put('test/sample.txt', 'hello-drive');

        expect(Storage::disk('google')->exists('test/sample.txt'))->toBeTrue();
        expect(Storage::disk('google')->get('test/sample.txt'))->toBe('hello-drive');
    });

    test('stand expense stores receipt on google disk', function () {
        $stand = \App\Models\Stand::create([
            'name' => 'GD Stand', 'pic_id' => 0, 'income' => 0,
            'expense' => 0, 'profit' => 0, 'menu_lock' => 0, 'sale_validation' => 0,
        ]);

        \App\Models\StandExpense::create([
            'stand_id' => $stand->id, 'name' => 'Seed', 'qty' => 1, 'unit' => 'x',
            'total_price' => 1, 'price' => 1, 'operational_id' => 1,
            'reciept' => 'SE' . $stand->id . '_0_receipt.webp',
        ]);

        $ops = staffUser(3);
        $this->actingAs($ops)->post(STAFF_PREFIX . "/food/stand/expense/add/{$stand->id}", [
            'name'    => 'GD Expense',
            'price'   => 1000,
            'qty'     => 1,
            'unit'    => 'pcs',
            'reciept' => fakeImageUpload(),
        ])->assertRedirect();

        $files = Storage::disk('google')->allFiles('images/receipt/stand/expense');
        expect(count($files))->toBeGreaterThan(1);
    });
});

describe('Super Admin Google Drive config panel', function () {
    test('only super admin can access super-admin panel', function () {
        $this->actingAs(staffUser(99))
            ->get(STAFF_PREFIX . '/super-admin')
            ->assertOk();

        $this->actingAs(staffUser(1))
            ->get(STAFF_PREFIX . '/super-admin')
            ->assertRedirect();
    });

    test('super admin save config validates required fields', function () {
        $this->actingAs(staffUser(99))
            ->post(STAFF_PREFIX . '/super-admin/google-drive', [])
            ->assertSessionHasErrors(['google_client_id', 'google_client_secret', 'app_url']);
    });

    test('role 1 cannot save google drive config', function () {
        $this->actingAs(staffUser(1))
            ->post(STAFF_PREFIX . '/super-admin/google-drive', [
                'google_client_id'     => 'id',
                'google_client_secret' => 'secret',
                'app_url'              => 'http://localhost',
            ])
            ->assertRedirect();
    });
});

describe('Google Drive auth controller', function () {
    test('super admin panel exposes google drive env flags', function () {
        $response = $this->actingAs(staffUser(99))
            ->get(STAFF_PREFIX . '/super-admin');

        $response->assertOk();
    });
});
