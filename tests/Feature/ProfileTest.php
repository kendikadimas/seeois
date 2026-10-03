<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('profile page is displayed', function () {
    $user = User::factory()->create([
        'roles_id' => 1,
        'phone' => '081234567890',
        'password' => bcrypt('password'),
    ]);

    $response = $this
        ->actingAs($user)
        ->get('/seeo/staff/profile');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('Staff/Profile')
        ->where('section', 'profile'));
});

test('logbook and iwp use separate staff pages', function () {
    $user = User::factory()->create([
        'roles_id' => 1,
        'phone' => '081234567890',
        'password' => bcrypt('password'),
    ]);

    $this->actingAs($user)
        ->get('/seeo/staff/logbook')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Staff/Profile')
            ->where('section', 'logbook'));

    $this->actingAs($user)
        ->get('/seeo/staff/iwp-payment')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Staff/Profile')
            ->where('section', 'iwp'));
});

test('profile information can be updated', function () {
    $user = User::factory()->create([
        'roles_id' => 1,
        'phone' => '081234567890',
        'password' => bcrypt('password'),
    ]);

    $response = $this
        ->actingAs($user)
        ->from('/seeo/staff/profile')
        ->post('/seeo/staff/profile/update', [
            'name' => 'Test User Long Name',
            'phone' => '081234567891',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/seeo/staff/profile');

    $user->refresh();

    $this->assertSame('Test User Long Name', $user->name);
    $this->assertSame('081234567891', $user->phone);
});

test('user can delete their account', function () {
    $user = User::factory()->create([
        'roles_id' => 1,
        'phone' => '081234567890',
        'password' => bcrypt('password'),
    ]);

    $response = $this
        ->actingAs($user)
        ->delete('/seeo/staff/profile', [
            'password' => 'password',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/');

    $this->assertGuest();
    $this->assertSoftDeleted($user);
});

test('correct password must be provided to delete account', function () {
    $user = User::factory()->create([
        'roles_id' => 1,
        'phone' => '081234567890',
        'password' => bcrypt('password'),
    ]);

    $response = $this
        ->actingAs($user)
        ->from('/seeo/staff/profile')
        ->delete('/seeo/staff/profile', [
            'password' => 'wrong-password',
        ]);

    $response
        ->assertSessionHasErrors('password', null, 'userDeletion')
        ->assertRedirect('/seeo/staff/profile');

    $this->assertNotNull($user->fresh());
});
