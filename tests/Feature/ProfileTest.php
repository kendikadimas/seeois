<?php

use App\Models\User;

test('profile page is displayed', function () {
    $user = User::factory()->create([
        'roles_id' => 1,
        'phone' => '081234567890',
        'password' => bcrypt('password'),
    ]);

    $response = $this
        ->actingAs($user)
        ->get('/profile');

    $response->assertOk();
});

test('profile information can be updated', function () {
    $user = User::factory()->create([
        'roles_id' => 1,
        'phone' => '081234567890',
        'password' => bcrypt('password'),
    ]);

    $response = $this
        ->actingAs($user)
        ->from('/profile')
        ->post('/profile', [
            'name' => 'Test User Long Name',
            'phone' => '081234567891',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/profile');

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
        ->delete('/profile', [
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
        ->from('/profile')
        ->delete('/profile', [
            'password' => 'wrong-password',
        ]);

    $response
        ->assertSessionHasErrors('password', null, 'userDeletion')
        ->assertRedirect('/profile');

    $this->assertNotNull($user->fresh());
});
