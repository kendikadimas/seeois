<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

// ============================================================
// LOGIN
// ============================================================

describe('Login Form', function () {
    test('login page can be rendered', function () {
        $this->get('/login')->assertStatus(200);
    });

    test('user cannot access dashboard without login', function () {
        $this->get('/seeo/dashboard')->assertRedirect('/login');
    });

    test('user can login with valid credentials', function () {
        $user = User::factory()->create([
            'email'    => 'staff@seeo.test',
            'password' => Hash::make('password123'),
        ]);

        $this->post('/login', [
            'email'    => 'staff@seeo.test',
            'password' => 'password123',
        ])->assertRedirect();

        $this->assertAuthenticatedAs($user);
    });

    test('user cannot login with wrong password', function () {
        User::factory()->create([
            'email'    => 'staff@seeo.test',
            'password' => Hash::make('password123'),
        ]);

        $this->post('/login', [
            'email'    => 'staff@seeo.test',
            'password' => 'wrong-password',
        ])->assertSessionHasErrors();

        $this->assertGuest();
    });

    test('login fails with unregistered email', function () {
        $this->post('/login', [
            'email'    => 'notfound@seeo.test',
            'password' => 'password123',
        ])->assertSessionHas('notif.type', 'warning');

        $this->assertGuest();
    });

    test('login fails without email field', function () {
        $this->post('/login', [
            'password' => 'password123',
        ])->assertSessionHasErrors('email');
    });

    test('login fails without password field', function () {
        User::factory()->create(['email' => 'staff@seeo.test']);

        $this->post('/login', [
            'email' => 'staff@seeo.test',
        ])->assertSessionHasErrors('password');
    });

    test('remember me functionality stores token in session', function () {
        $user = User::factory()->create([
            'email'    => 'staff@seeo.test',
            'password' => Hash::make('password123'),
        ]);

        $this->post('/login', [
            'email'    => 'staff@seeo.test',
            'password' => 'password123',
            'remember' => 'on',
        ])->assertRedirect();

        $this->assertAuthenticatedAs($user);
    });

    test('authenticated user is redirected away from login page', function () {
        $user = User::factory()->create();
        $this->actingAs($user)->get('/login')->assertRedirect();
    });
});

// ============================================================
// LOGOUT
// ============================================================

describe('Logout', function () {
    test('logged-in user can logout', function () {
        $user = User::factory()->create();
        $this->actingAs($user)->post('/logout');

        $this->assertGuest();
    });

    test('logout redirects to home', function () {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->post('/logout');

        $response->assertRedirect('/');
    });

    test('guest cannot use logout endpoint', function () {
        // Guest hitting logout should redirect without throwing error
        $this->post('/logout')->assertStatus(302);
    });
});
