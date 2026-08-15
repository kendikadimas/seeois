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
        ->get('/seeo/staff/profile');

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
