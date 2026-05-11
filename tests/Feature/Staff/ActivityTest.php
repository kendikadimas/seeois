<?php

use App\Models\Activity;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

describe('Activity (Berita/Kegiatan) - Index', function () {
    test('authenticated staff can view activity management page', function () {
        $user = User::factory()->create(['roles_id' => 100]); // role:100 is required for marketing
        $this->actingAs($user)->get('/marketing/activities')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('Staff/Marketing/Activities'));
    });

    test('guest cannot access activity management page', function () {
        $this->get('/marketing/activities')->assertRedirect('/login');
    });
});

describe('Activity Store', function () {
    beforeEach(function () {
        Storage::fake('public');
        $this->user = User::factory()->create(['roles_id' => 100]);
        $this->actingAs($this->user);
    });

    test('staff can create activity without image', function () {
        $response = $this->post('/marketing/activities', [
            'title'        => 'Workshop Kewirausahaan 2025',
            'description'  => 'Deskripsi kegiatan workshop yang diselenggarakan SEEO.',
            'category'     => 'Workshop',
            'date'         => '2025-12-01',
            'is_published' => true,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'success');
        $this->assertDatabaseHas('activities', ['title' => 'Workshop Kewirausahaan 2025']);
    });

    test('activity is created with a unique slug', function () {
        $this->post('/marketing/activities', [
            'title'        => 'Seminar Bisnis',
            'description'  => 'Deskripsi seminar bisnis',
            'is_published' => false,
        ]);

        $activity = Activity::where('title', 'Seminar Bisnis')->first();
        $this->assertNotNull($activity->slug);
        $this->assertStringContainsString('seminar-bisnis', $activity->slug);
    });

    test('staff can upload image when creating activity', function () {
        $image = UploadedFile::fake()->image('activity.jpg', 800, 600);

        $this->post('/marketing/activities', [
            'title'        => 'Kegiatan dengan Foto',
            'description'  => 'Deskripsi',
            'image_path'   => $image,
            'is_published' => true,
        ]);

        $activity = Activity::where('title', 'Kegiatan dengan Foto')->first();
        $this->assertNotNull($activity->image_path);
        Storage::disk('public')->assertExists($activity->image_path);
    });

    test('activity creation fails without title', function () {
        $this->post('/marketing/activities', [
            'description' => 'Deskripsi tanpa judul',
        ])->assertSessionHasErrors('title');
    });

    test('activity creation fails without description', function () {
        $this->post('/marketing/activities', [
            'title' => 'Judul tanpa deskripsi',
        ])->assertSessionHasErrors('description');
    });

    test('image must not exceed 2MB', function () {
        $largeImage = UploadedFile::fake()->image('big.jpg')->size(3000);

        $this->post('/marketing/activities', [
            'title'       => 'Test Besar',
            'description' => 'Test',
            'image_path'  => $largeImage,
        ])->assertSessionHasErrors('image_path');
    });
});

describe('Activity Update', function () {
    beforeEach(function () {
        Storage::fake('public');
        $this->user = User::factory()->create(['roles_id' => 100]);
        $this->actingAs($this->user);
        $this->activity = Activity::factory()->create([
            'title'       => 'Judul Awal',
            'description' => 'Deskripsi awal',
            'slug'        => 'judul-awal-' . uniqid(),
        ]);
    });

    test('staff can update activity title and description', function () {
        $response = $this->post("/marketing/activities/{$this->activity->id}", [
            'title'       => 'Judul Diperbarui',
            'description' => 'Deskripsi yang sudah diperbarui',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('activities', ['title' => 'Judul Diperbarui']);
    });

    test('staff can replace activity image', function () {
        $newImage = UploadedFile::fake()->image('new.jpg');

        $this->post("/marketing/activities/{$this->activity->id}", [
            'title'       => 'Judul',
            'description' => 'Deskripsi',
            'image_path'  => $newImage,
        ]);

        $updated = $this->activity->fresh();
        Storage::disk('public')->assertExists($updated->image_path);
    });

    test('activity update fails without required fields', function () {
        $this->post("/marketing/activities/{$this->activity->id}", [])
            ->assertSessionHasErrors(['title', 'description']);
    });
});

describe('Activity Delete', function () {
    beforeEach(function () {
        Storage::fake('public');
        $this->user = User::factory()->create(['roles_id' => 100]);
        $this->actingAs($this->user);
    });

    test('staff can delete activity without image', function () {
        $activity = Activity::factory()->create([
            'title'       => 'Hapus Ini',
            'description' => 'Desc',
            'slug'        => 'hapus-ini-' . uniqid(),
        ]);

        $this->delete("/marketing/activities/{$activity->id}")->assertRedirect();
        $this->assertDatabaseMissing('activities', ['id' => $activity->id]);
    });

    test('deleting activity with image also deletes the file', function () {
        $path     = 'images/activities/test.jpg';
        Storage::disk('public')->put($path, 'fake content');

        $activity = Activity::factory()->create([
            'title'       => 'Dengan Gambar',
            'description' => 'Desc',
            'slug'        => 'dengan-gambar-' . uniqid(),
            'image_path'  => $path,
        ]);

        $this->delete("/marketing/activities/{$activity->id}");

        Storage::disk('public')->assertMissing($path);
    });
});
