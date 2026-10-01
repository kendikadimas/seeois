<?php

use App\Models\Structure;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('marketing uploads use cloud storage in production', function () {
    $originalEnvironment = app()->environment();
    app()['env'] = 'production';
    Storage::fake('google');

    try {
        $this->withoutMiddleware(\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class);
        $this->actingAs(User::factory()->create(['roles_id' => 100]))
            ->post(route('marketing.structures.store'), [
                'name' => 'Cloud User',
                'role_title' => 'Marketing',
                'image_path' => UploadedFile::fake()->image('cloud.jpg'),
            ])
            ->assertRedirect();

        $structure = Structure::where('name', 'Cloud User')->firstOrFail();
        Storage::disk('google')->assertExists($structure->image_path);
    } finally {
        app()['env'] = $originalEnvironment;
    }
});

test('production media endpoint falls back to legacy local files', function () {
    $originalEnvironment = app()->environment();
    app()['env'] = 'production';
    Storage::fake('google');
    Storage::fake('public');
    Storage::disk('public')->put('images/legacy.txt', 'legacy-file');

    try {
        $this->get('/storage/images/legacy.txt')
            ->assertOk()
            ->assertSeeText('legacy-file');
    } finally {
        app()['env'] = $originalEnvironment;
    }
});
