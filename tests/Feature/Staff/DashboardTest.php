<?php

use App\Models\User;
use App\Models\Role;

// ============================================================
// DASHBOARD
// ============================================================

describe('Dashboard', function () {
    test('staff can access SEEO dashboard', function () {
        $user = User::factory()->create(['roles_id' => 1]); // CEO
        $this->actingAs($user)->get('/seeo/staff/dashboard')->assertStatus(200);
    });

    test('guest is redirected from dashboard to login', function () {
        $this->get('/seeo/staff/dashboard')->assertRedirect('/login');
    });

    test('user without role is blocked from staff dashboard', function () {
        $user = User::factory()->create(['roles_id' => null]);
        $this->actingAs($user)->get('/seeo/staff/dashboard')->assertStatus(403);
    });
});

// ============================================================
// BILLBOARD
// ============================================================

describe('Billboard', function () {
    beforeEach(function () {
        $this->user = User::factory()->create(['roles_id' => 1]);
        $this->actingAs($this->user);
    });

    test('CEO can add text billboard', function () {
        $response = $this->post('/seeo/staff/billboard/add', [
            'billboard_title'    => 'Pengumuman Penting',
            'billboard_typeText' => '1',
            'billboard_text'     => 'Rapat mingguan pukul 14.00 WIB',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');
        $this->assertDatabaseHas('billboard', ['title' => 'Pengumuman Penting']);
    });

    test('billboard creation fails without title', function () {
        $this->post('/seeo/staff/billboard/add', [
            'billboard_typeText' => '1',
            'billboard_text'     => 'Isi teks',
        ])->assertSessionHasErrors('billboard_title');
    });

    test('billboard creation fails without selecting type', function () {
        $response = $this->post('/seeo/staff/billboard/add', [
            'billboard_title' => 'Judul',
        ]);
        // No type selected → warning notif
        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'warning');
    });

    test('text billboard requires text when type is text', function () {
        $this->post('/seeo/staff/billboard/add', [
            'billboard_title'    => 'Judul',
            'billboard_typeText' => '1',
            // billboard_text missing
        ])->assertSessionHasErrors('billboard_text');
    });

    test('CEO can delete existing billboard', function () {
        $billboard = \App\Models\Billboard::create([
            'type'  => 2,
            'title' => 'Hapus Billboard Ini',
            'text'  => 'Isi pengumuman',
        ]);

        $response = $this->post("/seeo/staff/billboard/delete/{$billboard->id}");

        $response->assertRedirect();
        $this->assertSoftDeleted('billboard', ['id' => $billboard->id]);
    });

    test('delete non-existent billboard returns warning', function () {
        $response = $this->post('/seeo/staff/billboard/delete/9999');

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'warning');
    });
});

// ============================================================
// POST (SEEO COMMUNITY FEED)
// ============================================================

describe('SEEO Post', function () {
    beforeEach(function () {
        $this->user = User::factory()->create(['roles_id' => 1]);
        $this->actingAs($this->user);
    });

    test('staff can add a post', function () {
        $response = $this->post('/seeo/staff/dashboard/post/add', [
            'post_text' => 'Ini adalah post baru dari staff',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');
        $this->assertDatabaseHas('post', [
            'user_id' => $this->user->id,
            'text'    => 'Ini adalah post baru dari staff',
        ]);
    });

    test('post creation fails without text', function () {
        $this->post('/seeo/staff/dashboard/post/add', [])->assertSessionHasErrors('post_text');
    });

    test('post text cannot exceed 255 characters', function () {
        $this->post('/seeo/staff/dashboard/post/add', [
            'post_text' => str_repeat('a', 256),
        ])->assertSessionHasErrors('post_text');
    });

    test('staff can delete their own post', function () {
        $post = \App\Models\Post::create([
            'user_id' => $this->user->id,
            'text'    => 'Post yang akan dihapus',
        ]);

        $response = $this->post("/seeo/staff/dashboard/post/remove/{$post->id}");
        $response->assertRedirect();
        $this->assertSoftDeleted('post', ['id' => $post->id]);
    });

    test('deleting non-existent post returns warning', function () {
        $response = $this->post('/seeo/staff/dashboard/post/remove/9999');
        $response->assertSessionHas('notif.type', 'warning');
    });

    test('anonymous post flag is stored correctly', function () {
        $this->post('/seeo/staff/dashboard/post/add', [
            'post_text'     => 'Post anonim',
            'post_username' => 'on',
        ]);

        $this->assertDatabaseHas('post', [
            'user_id' => $this->user->id,
            'anonymus' => true,
        ]);
    });
});
