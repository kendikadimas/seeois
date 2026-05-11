<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

test('password can be updated', function () {
    $user = User::factory()->create([
        'roles_id' => 1,
        'phone' => '081234567890',
        'password' => Hash::make('OldPassword123!'),
    ]);

    $response = $this
        ->actingAs($user)
        ->from('/profile')
        ->post('/password/change', [
            'old_password' => 'OldPassword123!',
            'password' => 'NewPassword123!',
            'password_confirmation' => 'NewPassword123!',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect('/profile');

    $this->assertTrue(Hash::check('NewPassword123!', $user->refresh()->password));
});

test('correct password must be provided to update password', function () {
    $user = User::factory()->create([
        'roles_id' => 1,
        'phone' => '081234567890',
        'password' => Hash::make('OldPassword123!'),
    ]);

    $response = $this
        ->actingAs($user)
        ->from('/profile')
        ->post('/password/change', [
            'old_password' => 'wrong-password',
            'password' => 'NewPassword123!',
            'password_confirmation' => 'NewPassword123!',
        ]);

    $response
        ->assertSessionHas('notif.type', 'warning')
        ->assertRedirect('/profile');
});
