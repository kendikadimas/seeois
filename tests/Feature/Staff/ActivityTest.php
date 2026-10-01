<?php

use App\Models\Activity;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;



describe('Activity (Berita/Kegiatan) - Index', function () {
    test('authenticated staff can view activity management page', function () {
        $user = User::factory()->create(['roles_id' => 100]); // role:100 is required for marketing
        $this->actingAs($user)->get('/seeo/staff/marketing/activities')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('Staff/Marketing/Activities'));
    });

    test('guest cannot access activity management page', function () {
        $this->get('/seeo/staff/marketing/activities')->assertRedirect('/login');
    });
});

describe('Activity Store', function () {
    beforeEach(function () {
        Storage::fake('public');
        $this->user = User::factory()->create(['roles_id' => 100]);
        $this->actingAs($this->user);
    });

    test('staff can create activity without image', function () {
        $response = $this->post('/seeo/staff/marketing/activities', [
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
        $this->post('/seeo/staff/marketing/activities', [
            'title'        => 'Seminar Bisnis',
            'description'  => 'Deskripsi seminar bisnis',
            'is_published' => false,
        ]);

        $activity = Activity::where('title', 'Seminar Bisnis')->first();
        $this->assertNotNull($activity->slug);
        $this->assertStringContainsString('seminar-bisnis', $activity->slug);
    });

    test('title is limited and long slugs are shortened', function () {
        $this->post('/seeo/staff/marketing/activities', [
            'title' => str_repeat('a', 151),
            'description' => 'Deskripsi berita',
        ])->assertSessionHasErrors('title');

        $this->post('/seeo/staff/marketing/activities', [
            'title' => str_repeat('Judul panjang ', 10),
            'description' => 'Deskripsi berita',
            'is_published' => false,
        ])->assertSessionDoesntHaveErrors();

        $activity = Activity::latest('id')->first();

        $this->assertLessThanOrEqual(114, strlen($activity->slug));
    });

    test('staff can upload image when creating activity', function () {
        $image = UploadedFile::fake()->image('activity.jpg', 800, 600);

        $this->post('/seeo/staff/marketing/activities', [
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
        $this->post('/seeo/staff/marketing/activities', [
            'description' => 'Deskripsi tanpa judul',
        ])->assertSessionHasErrors('title');
    });

    test('activity creation fails without description', function () {
        $this->post('/seeo/staff/marketing/activities', [
            'title' => 'Judul tanpa deskripsi',
        ])->assertSessionHasErrors('description');
    });

    test('image must not exceed 2MB', function () {
        $largeImage = UploadedFile::fake()->image('big.jpg')->size(3000);

        $this->post('/seeo/staff/marketing/activities', [
            'title'       => 'Test Besar',
            'description' => 'Test',
            'image_path'  => $largeImage,
        ])->assertSessionHasErrors('image_path');
    });
});

describe('Activity AI Writer', function () {
    beforeEach(function () {
        $this->user = User::factory()->create(['roles_id' => 100]);
        $this->actingAs($this->user);
        config([
            'services.groq.api_key' => 'test-key',
            'services.groq.base_url' => 'https://api.groq.com',
            'services.groq.model' => 'openai/gpt-oss-120b',
            'services.groq.max_completion_tokens' => 1600,
            'services.groq.reasoning_effort' => 'low',
        ]);
    });

    test('marketing staff can generate activity content with groq', function () {
        Http::fake([
            'api.groq.com/*' => Http::response([
                'choices' => [[
                    'message' => ['content' => 'SEEO menyelenggarakan kegiatan yang memberi manfaat bagi para peserta.'],
                ]],
            ]),
        ]);

        $this->postJson(route('marketing.activities.generate-content'), [
            'title' => 'Workshop Kewirausahaan',
            'category' => 'Workshop',
            'date' => '2026-10-01',
            'current_content' => 'Workshop diikuti mahasiswa dan membahas penyusunan model bisnis.',
        ])->assertOk()->assertJson([
            'content' => 'SEEO menyelenggarakan kegiatan yang memberi manfaat bagi para peserta.',
        ]);

        Http::assertSent(fn ($request) =>
            $request->url() === 'https://api.groq.com/openai/v1/chat/completions'
            && $request['model'] === 'openai/gpt-oss-120b'
            && $request['reasoning_effort'] === 'low'
            && $request['reasoning_format'] === 'hidden'
            && $request['max_completion_tokens'] === 1600
            && str_contains($request['messages'][0]['content'], 'Workshop Kewirausahaan')
            && str_contains($request['messages'][0]['content'], 'struktur piramida terbalik')
            && str_contains($request['messages'][0]['content'], 'merupakan wujud nyata')
        );
    });

    test('ai writer retries once when groq returns empty content', function () {
        Http::fakeSequence()
            ->push([
                'choices' => [[
                    'message' => ['content' => null, 'reasoning' => 'Internal reasoning'],
                ]],
            ])
            ->push([
                'choices' => [[
                    'message' => ['content' => 'Konten berhasil dibuat pada percobaan kedua.'],
                ]],
            ]);

        $this->postJson(route('marketing.activities.generate-content'), [
            'title' => 'Pelatihan Bisnis SEEO',
            'current_content' => 'Pelatihan diikuti mahasiswa Fakultas Teknik dan membahas ide bisnis.',
        ])->assertOk()->assertJson([
            'content' => 'Konten berhasil dibuat pada percobaan kedua.',
        ]);

        Http::assertSentCount(2);
    });

    test('ai writer requires a title', function () {
        Http::fake();

        $this->postJson(route('marketing.activities.generate-content'), [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('title');

        Http::assertNothingSent();
    });

    test('ai writer requires enough factual source material', function () {
        Http::fake();

        $this->postJson(route('marketing.activities.generate-content'), [
            'title' => 'Workshop SEEO',
            'current_content' => 'Workshop mahasiswa.',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('current_content');

        Http::assertNothingSent();
    });

    test('ai writer reports missing api configuration', function () {
        config(['services.groq.api_key' => null]);
        Http::fake();

        $this->postJson(route('marketing.activities.generate-content'), [
            'title' => 'Kegiatan SEEO',
            'current_content' => 'Kegiatan SEEO diikuti mahasiswa Fakultas Teknik pada awal Oktober.',
        ])->assertStatus(503)
            ->assertJsonPath('message', 'Groq API belum dikonfigurasi. Tambahkan GROQ_API_KEY pada file .env.');

        Http::assertNothingSent();
    });

    test('guest cannot call the ai writer', function () {
        auth()->logout();
        Http::fake();

        $this->postJson(route('marketing.activities.generate-content'), [
            'title' => 'Kegiatan SEEO',
            'current_content' => 'Kegiatan SEEO diikuti mahasiswa Fakultas Teknik pada awal Oktober.',
        ])->assertUnauthorized();

        Http::assertNothingSent();
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
        $response = $this->post("/seeo/staff/marketing/activities/{$this->activity->id}", [
            'title'       => 'Judul Diperbarui',
            'description' => 'Deskripsi yang sudah diperbarui',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('activities', ['title' => 'Judul Diperbarui']);
    });

    test('staff can replace activity image', function () {
        $newImage = UploadedFile::fake()->image('new.jpg');

        $this->post("/seeo/staff/marketing/activities/{$this->activity->id}", [
            'title'       => 'Judul',
            'description' => 'Deskripsi',
            'image_path'  => $newImage,
        ]);

        $updated = $this->activity->fresh();
        Storage::disk('public')->assertExists($updated->image_path);
    });

    test('activity update fails without required fields', function () {
        $this->post("/seeo/staff/marketing/activities/{$this->activity->id}", [])
            ->assertSessionHasErrors(['title', 'description']);
    });

    test('activity update rejects a non-image upload', function () {
        $file = UploadedFile::fake()->create('malware.txt', 10, 'text/plain');

        $this->post(route('marketing.activities.update', $this->activity), [
            'title' => 'Judul',
            'description' => 'Deskripsi',
            'image_path' => $file,
        ])->assertSessionHasErrors('image_path');
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

        $this->delete("/seeo/staff/marketing/activities/{$activity->id}")->assertRedirect();
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

        $this->delete("/seeo/staff/marketing/activities/{$activity->id}");

        Storage::disk('public')->assertMissing($path);
    });

    test('deleting activity also deletes gallery images', function () {
        $gallery = ['images/activities/gallery/one.jpg', 'images/activities/gallery/two.jpg'];
        foreach ($gallery as $path) {
            Storage::disk('public')->put($path, 'image');
        }

        $activity = Activity::factory()->create([
            'title' => 'Aktivitas Bergaleri',
            'description' => 'Deskripsi',
            'slug' => 'aktivitas-bergaleri-'.uniqid(),
            'gallery' => $gallery,
        ]);
        $this->delete(route('marketing.activities.destroy', $activity))->assertRedirect();

        foreach ($gallery as $path) {
            Storage::disk('public')->assertMissing($path);
        }
    });
});
