<?php

use App\Models\GoodsProduct;
use App\Models\GoodsCapital;
use App\Models\ProductVariant;
use Inertia\Testing\AssertableInertia as Assert;

describe('Recovered goods pages', function () {
    beforeEach(function () {
        $this->operations = staffUser(3);
        $this->actingAs($this->operations);
    });

    test('goods catalogue renders the Inertia page', function () {
        $this->get(route('good.product'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Staff/Business/GoodProduct')
                ->has('product_list')
                ->has('user_list'));
    });

    test('goods detail renders an existing product', function () {
        $product = GoodsProduct::create([
            'name' => 'Produk Uji',
            'category' => 'Merchandise',
            'pic_id' => $this->operations->id,
        ]);

        $this->get(route('good.product.detail', $product->id))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Staff/Business/GoodDetail')
                ->where('product.id', $product->id));
    });

    test('missing goods detail returns to catalogue with a notification', function () {
        $this->get(route('good.product.detail', 999999))
            ->assertRedirect(route('good.product'))
            ->assertSessionHas('notif.type', 'warning');
    });

    test('goods insight and balances render without missing views', function () {
        $this->get(route('good.insight'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Staff/Business/GoodInsight'));

        $this->get(route('good.balance'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Staff/Business/GoodBalance'));

        $this->get(route('food.balance'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Staff/Business/FoodBalance'));
    });

    test('inventory viewers can see products but cannot manage balances', function () {
        $production = staffUser(11);

        $this->actingAs($production)->get(route('good.product'))->assertOk();
        $this->actingAs($production)->get(route('good.balance'))->assertForbidden();
    });

    test('product filter rejects unsupported sort columns', function () {
        $this->post(route('good.product.filter'), [
            'category' => 'deleted_at desc',
            'order' => 'sideways',
        ])->assertSessionHasErrors(['category', 'order']);
    });

    test('operations can create a product and variant then adjust stock safely', function () {
        $this->post(route('good.product.add'), [
            'name' => 'Kaos SEEO',
            'category' => 'Pakaian',
            'pic' => $this->operations->id,
        ])->assertRedirect(route('good.product'));

        $product = GoodsProduct::where('name', 'Kaos SEEO')->firstOrFail();
        $this->post(route('good.product.variant.add', $product->id), [
            'name' => 'Ukuran M',
            'price' => 75000,
            'stock' => 4,
            'description' => 'Kaos ukuran medium',
        ])->assertRedirect();

        $variant = ProductVariant::where('product_id', $product->id)->firstOrFail();
        $this->post(route('good.product.stock.update', $variant->id), ['update_stock' => -5])
            ->assertSessionHasErrors('update_stock');
        expect($variant->fresh()->stock)->toBe(4);

        $this->post(route('good.product.stock.update', $variant->id), ['update_stock' => 3])
            ->assertRedirect();
        expect($variant->fresh()->stock)->toBe(7);
    });

    test('capital validation can be toggled without crashing', function () {
        $capital = GoodsCapital::create([
            'name' => 'Bahan kemasan',
            'price' => 5000,
            'qty' => 2,
            'unit' => 'pcs',
            'total_price' => 10000,
        ]);

        $this->post(route('good.capital.validate'), ['receipt_id' => $capital->id])->assertRedirect();
        $this->assertDatabaseHas('goods_expense', [
            'category' => 'goods expense',
            'category_id' => $capital->id,
            'price' => 10000,
        ]);

        $this->post(route('good.capital.validate'), ['receipt_id' => $capital->id])->assertRedirect();
        $this->assertSoftDeleted('goods_expense', [
            'category' => 'goods expense',
            'category_id' => $capital->id,
        ]);
    });

    test('food balance withdrawal records its amount', function () {
        useFakeStorageDisks();

        $this->post(route('food.balance.withdraw'), [
            'name' => 'Setoran stand makanan',
            'price' => 125000,
            'receipt' => fakeImageUpload('food-balance.jpg'),
        ])->assertRedirect(route('food.balance', ['default_tab' => 2]));

        $this->assertDatabaseHas('foods_expense', [
            'category' => 'withdraw',
            'price' => 125000,
        ]);
        $this->assertDatabaseHas('cash_in_item', [
            'name' => 'Setoran stand makanan',
            'price' => 125000,
        ]);
    });
});
