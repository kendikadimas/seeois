<?php

use App\Models\MenuItem;
use App\Models\PaymentMethod;
use App\Models\Stand;
use App\Models\StandExpense;
use App\Models\StandSales;
use App\Models\User;

function makeCashierStand(): Stand
{
    return Stand::create([
        'name'            => 'Stand Cashier ' . uniqid(),
        'pic_id'          => 0,
        'income'          => 0,
        'expense'         => 0,
        'profit'          => 0,
        'menu_lock'       => 1,
        'sale_validation' => 0,
    ]);
}

describe('Stand & Cashier module', function () {
    beforeEach(function () {
        $this->stand = makeCashierStand();
        $this->menu = MenuItem::create([
            'stand_id' => $this->stand->id,
            'name'     => 'Nasi Uduk',
            'category' => 'Main',
            'price'    => 12000,
            'stock'    => 20,
            'sale'     => 0,
        ]);
        PaymentMethod::firstOrCreate(['name' => 'Cash']);
    });

    test('staff can access stand list', function () {
        $user = staffUser(3);
        $this->actingAs($user)->get(STAFF_PREFIX . '/blaterian/foods/stand')->assertOk();
    });

    test('staff can access stand detail', function () {
        $user = staffUser(3);
        $this->actingAs($user)
            ->get(STAFF_PREFIX . "/blaterian/foods/stand_detail/{$this->stand->id}")
            ->assertOk();
    });

    test('cashier can access stand cashier page', function () {
        $cashier = staffUser(4);
        $this->stand->cashier()->attach($cashier->id);

        $this->actingAs($cashier)
            ->get(STAFF_PREFIX . "/blaterian/foods/cashier/{$this->stand->id}")
            ->assertOk();
    });

    test('cashier can create sale', function () {
        $cashier = staffUser(4);
        $customer = User::factory()->create(['phone' => '08123' . random_int(10000, 99999)]);
        $this->stand->cashier()->attach($cashier->id);
        $payment = PaymentMethod::first();

        $this->actingAs($cashier)
            ->post(STAFF_PREFIX . "/food/stand/sales/add/{$this->stand->id}", [
                'discount'          => 0,
                'transaction'       => 12000,
                'customer_id'       => $customer->id,
                'customer'          => $customer->name,
                'payment_method_id' => $payment->id,
                'payment_price'     => 12000,
                'order'             => [
                    ['menu_id' => $this->menu->id, 'amount' => 1],
                ],
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('sales', [
            'stand_id'   => $this->stand->id,
            'cashier_id' => $cashier->id,
        ]);
    });

    test('non-cashier cannot create sale', function () {
        $outsider = staffUser(10);

        $this->actingAs($outsider)
            ->post(STAFF_PREFIX . "/food/stand/sales/add/{$this->stand->id}", [
                'discount'          => 0,
                'transaction'       => 12000,
                'customer_id'       => 1,
                'customer'          => 'Guest',
                'payment_method_id' => PaymentMethod::first()->id,
                'payment_price'     => 12000,
                'order'             => [
                    ['menu_id' => $this->menu->id, 'amount' => 1],
                ],
            ])
            ->assertRedirect()
            ->assertSessionHas('notif.type', 'warning');
    });

    test('role 3 can insert stand', function () {
        $ops = staffUser(3);
        $this->actingAs($ops)
            ->post(STAFF_PREFIX . '/food/stand/add/new', [
                'name' => 'Stand Baru ' . uniqid(),
            ])
            ->assertRedirect();
    });
});

describe('Stand expense receipt upload', function () {
    beforeEach(function () {
        useFakeStorageDisks();
        $this->stand = makeCashierStand();
        $this->ops = staffUser(3);
        $this->actingAs($this->ops);
        StandExpense::create([
            'stand_id'       => $this->stand->id,
            'name'           => 'Seed Expense',
            'qty'            => 1,
            'unit'           => 'kg',
            'total_price'    => 1000,
            'price'          => 1000,
            'operational_id' => 1,
            'reciept'        => 'SE' . $this->stand->id . '_0_receipt.webp',
        ]);
    });

    test('operational can add stand expense with receipt', function () {
        $this->post(STAFF_PREFIX . "/food/stand/expense/add/{$this->stand->id}", [
            'name'    => 'Bahan Baku',
            'price'   => 5000,
            'qty'     => 2,
            'unit'    => 'kg',
            'reciept' => fakeImageUpload('expense.jpg'),
        ])
            ->assertRedirect()
            ->assertSessionHas('notif.type', 'info');

        $this->assertDatabaseHas('stand_expense_item', [
            'stand_id' => $this->stand->id,
            'name'     => 'Bahan Baku',
        ]);

        $files = \Illuminate\Support\Facades\Storage::disk('google')->allFiles('images/receipt/stand/expense');
        expect(count($files))->toBeGreaterThan(0);
    });
});

describe('Food sale inventory integrity', function () {
    beforeEach(function () {
        $this->stand = makeCashierStand();
        $this->cashier = staffUser(4);
        $this->customer = User::factory()->create(['phone' => '0899' . random_int(100000, 999999), 'point' => 0]);
        $this->stand->cashier()->attach($this->cashier->id);
        $this->payment = PaymentMethod::firstOrCreate(['name' => 'Cash']);
        $this->menu = MenuItem::create([
            'stand_id' => $this->stand->id, 'name' => 'Menu Aman', 'category' => 'Main',
            'price' => 10000, 'stock' => 5, 'sale' => 0,
        ]);
    });

    test('sale rolls back completely when one menu is out of stock', function () {
        $insufficient = MenuItem::create([
            'stand_id' => $this->stand->id, 'name' => 'Menu Habis', 'category' => 'Main',
            'price' => 10000, 'stock' => 0, 'sale' => 0,
        ]);

        $this->actingAs($this->cashier)->post(STAFF_PREFIX . "/food/stand/sales/add/{$this->stand->id}", [
            'discount' => 0, 'transaction' => 20000, 'customer_id' => $this->customer->id,
            'payment_method_id' => $this->payment->id, 'payment_price' => 20000,
            'order' => [
                ['menu_id' => $this->menu->id, 'amount' => 1],
                ['menu_id' => $insufficient->id, 'amount' => 1],
            ],
        ])->assertSessionHasErrors('amount');

        expect($this->menu->fresh()->stock)->toBe(5)
            ->and($this->menu->fresh()->sale)->toBe(0)
            ->and(StandSales::where('stand_id', $this->stand->id)->count())->toBe(0);
    });

    test('cancelling a sale restores stock and writes return ledger', function () {
        $this->actingAs($this->cashier)->post(STAFF_PREFIX . "/food/stand/sales/add/{$this->stand->id}", [
            'discount' => 0, 'transaction' => 20000, 'customer_id' => $this->customer->id,
            'payment_method_id' => $this->payment->id, 'payment_price' => 20000,
            'order' => [['menu_id' => $this->menu->id, 'amount' => 2]],
        ]);
        $sale = StandSales::where('stand_id', $this->stand->id)->latest('id')->firstOrFail();

        expect($this->menu->fresh()->stock)->toBe(3);
        $this->actingAs($this->cashier)->post(STAFF_PREFIX . "/shop/transaction/cancel/{$sale->id}")->assertRedirect();

        expect($this->menu->fresh()->stock)->toBe(5)
            ->and($this->menu->fresh()->sale)->toBe(0);
        $this->assertSoftDeleted('sales', ['id' => $sale->id]);
        $this->assertDatabaseHas('menu_stock_movements', [
            'menu_id' => $this->menu->id, 'change' => 2, 'reason' => 'return',
        ]);
    });
});

describe('Customer checkout inventory integrity', function () {
    beforeEach(function () {
        $this->stand = makeCashierStand();
        $this->customer = User::factory()->create();
        $this->menu = MenuItem::create([
            'stand_id' => $this->stand->id, 'name' => 'Customer Menu', 'category' => 'Main',
            'price' => 15000, 'stock' => 3, 'sale' => 0,
        ]);
    });

    test('checkout recalculates totals on server and updates stock atomically', function () {
        $session = [
            'stand_id' => $this->stand->id, 'discount' => 999999, 'transaction' => 1, 'voucher_id' => null,
            'order_list' => [['id' => $this->menu->id, 'qty' => 2, 'price' => 1]],
        ];

        $this->actingAs($this->customer)->withSession(['transaction' => $session])->post('/shop/payment', [
            'order_type' => 'now', 'send_option' => 'pick_up', 'payment_method' => 'cash', 'payment_price' => 30000,
        ])->assertRedirect();

        $this->assertDatabaseHas('sales', [
            'stand_id' => $this->stand->id, 'customer_id' => $this->customer->id,
            'discount' => 0, 'transaction' => 30000,
        ]);
        expect($this->menu->fresh()->stock)->toBe(1)->and($this->menu->fresh()->sale)->toBe(2);
    });

    test('checkout rolls back sale when stock is insufficient', function () {
        $session = [
            'stand_id' => $this->stand->id, 'transaction' => 60000, 'voucher_id' => null,
            'order_list' => [['id' => $this->menu->id, 'qty' => 4, 'price' => 15000]],
        ];

        $this->actingAs($this->customer)->withSession(['transaction' => $session])->post('/shop/payment', [
            'order_type' => 'now', 'send_option' => 'pick_up', 'payment_method' => 'cash', 'payment_price' => 60000,
        ])->assertSessionHasErrors('amount');

        expect($this->menu->fresh()->stock)->toBe(3)
            ->and(StandSales::where('stand_id', $this->stand->id)->count())->toBe(0);
    });
});
