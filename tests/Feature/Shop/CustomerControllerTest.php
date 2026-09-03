<?php

use App\Models\CustomerFeedback;
use App\Models\User;
use App\Models\Voucher;

function customerVoucher(array $overrides = []): Voucher
{
    return Voucher::create(array_merge([
        'name' => 'Test Voucher',
        'code' => 'TEST-' . fake()->unique()->numerify('#####'),
        'point' => 100,
        'start_date' => today()->subDay()->toDateString(),
        'end_date' => today()->addDay()->toDateString(),
        'user_quota' => 10,
        'discount_type' => 'price',
    ], $overrides));
}

test('customer feedback is associated with the authenticated customer and updated in place', function () {
    $customer = User::factory()->create(['email_verified_at' => now()]);

    $this->actingAs($customer)->post(route('customer.feedback.add'), [
        'rate' => 4,
        'feedback' => 'Good service',
    ])->assertRedirect();

    $this->assertDatabaseHas('customer_feedback', [
        'customer_id' => $customer->id,
        'rate' => 4,
        'message' => 'Good service',
    ]);

    $this->actingAs($customer)->post(route('customer.feedback.add'), [
        'rate' => 5,
        'feedback' => 'Excellent service',
    ])->assertRedirect();

    expect(CustomerFeedback::where('customer_id', $customer->id)->count())->toBe(1);
    $this->assertDatabaseHas('customer_feedback', [
        'customer_id' => $customer->id,
        'rate' => 5,
        'message' => 'Excellent service',
    ]);
});

test('voucher is not attached when customer has insufficient points', function () {
    $customer = User::factory()->create(['point' => 99, 'email_verified_at' => now()]);
    $voucher = customerVoucher(['point' => 100]);

    $this->actingAs($customer)->post(route('customer.redeem.voucher', $voucher))->assertRedirect();

    expect($customer->fresh()->point)->toBe(99)
        ->and($customer->voucher()->where('voucher_id', $voucher->id)->exists())->toBeFalse();
});

test('customer can redeem a voucher using their exact point balance', function () {
    $customer = User::factory()->create(['point' => 100, 'email_verified_at' => now()]);
    $voucher = customerVoucher(['point' => 100]);

    $this->actingAs($customer)->post(route('customer.redeem.voucher', $voucher))->assertRedirect();

    expect($customer->fresh()->point)->toBe(0)
        ->and($customer->voucher()->where('voucher_id', $voucher->id)->exists())->toBeTrue();
});

test('expired and fully redeemed vouchers cannot be redeemed', function () {
    $customer = User::factory()->create(['point' => 500, 'email_verified_at' => now()]);
    $expired = customerVoucher([
        'start_date' => today()->subDays(2)->toDateString(),
        'end_date' => today()->subDay()->toDateString(),
    ]);
    $full = customerVoucher(['user_quota' => 1]);
    $otherCustomer = User::factory()->create();
    $otherCustomer->voucher()->attach($full->id);

    $this->actingAs($customer)->post(route('customer.redeem.voucher', $expired))->assertRedirect();
    $this->actingAs($customer)->post(route('customer.redeem.voucher', $full))->assertRedirect();

    expect($customer->voucher()->count())->toBe(0)
        ->and($customer->fresh()->point)->toBe(500);
});
