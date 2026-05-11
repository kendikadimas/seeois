<?php

use App\Models\Structure;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

describe('Structure Index', function () {
    test('staff can view structure management page', function () {
        $user = User::factory()->create(['roles_id' => 100]); // role:100 is required for marketing
        $this->actingAs($user)->get('/marketing/structures')
            ->assertStatus(200)
            ->assertInertia(fn ($page) => $page->component('Staff/Marketing/Structures'));
    });

    test('guest is redirected from structure page', function () {
        $this->get('/marketing/structures')->assertRedirect('/login');
    });
});

describe('Structure Store', function () {
    beforeEach(function () {
        Storage::fake('public');
        $this->user = User::factory()->create(['roles_id' => 100]);
        $this->actingAs($this->user);
    });

    test('staff can create structure without image', function () {
        $response = $this->post('/marketing/structures', [
            'name'          => 'Budi Santoso',
            'role_title'    => 'Ketua Umum',
            'department_name' => 'Executive',
            'order_num'     => 1,
            'is_executive'  => true,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'success');
        $this->assertDatabaseHas('structures', ['name' => 'Budi Santoso']);
    });

    test('staff can create structure with image', function () {
        $image = UploadedFile::fake()->image('foto.jpg', 400, 400);

        $this->post('/marketing/structures', [
            'name'       => 'Siti Aminah',
            'role_title' => 'Sekretaris',
            'image_path' => $image,
        ]);

        $structure = Structure::where('name', 'Siti Aminah')->first();
        $this->assertNotNull($structure->image_path);
        Storage::disk('public')->assertExists($structure->image_path);
    });

    test('structure creation fails without name', function () {
        $this->post('/marketing/structures', [
            'role_title' => 'Bendahara',
        ])->assertSessionHasErrors('name');
    });

    test('structure creation fails without role_title', function () {
        $this->post('/marketing/structures', [
            'name' => 'Ahmad',
        ])->assertSessionHasErrors('role_title');
    });

    test('name cannot exceed 255 characters', function () {
        $this->post('/marketing/structures', [
            'name'       => str_repeat('a', 256),
            'role_title' => 'Anggota',
        ])->assertSessionHasErrors('name');
    });

    test('image must be valid image type', function () {
        $file = UploadedFile::fake()->create('document.pdf', 100, 'application/pdf');

        $this->post('/marketing/structures', [
            'name'       => 'Test',
            'role_title' => 'Test',
            'image_path' => $file,
        ])->assertSessionHasErrors('image_path');
    });

    test('image cannot exceed 2MB', function () {
        $bigImage = UploadedFile::fake()->image('big.jpg')->size(3000);

        $this->post('/marketing/structures', [
            'name'       => 'Test',
            'role_title' => 'Test',
            'image_path' => $bigImage,
        ])->assertSessionHasErrors('image_path');
    });
});

describe('Structure Update', function () {
    beforeEach(function () {
        Storage::fake('public');
        $this->user = User::factory()->create(['roles_id' => 100]);
        $this->actingAs($this->user);
        $this->structure = Structure::factory()->create([
            'name'       => 'Nama Awal',
            'role_title' => 'Jabatan Awal',
        ]);
    });

    test('staff can update structure name and role', function () {
        $this->post("/marketing/structures/{$this->structure->id}", [
            'name'       => 'Nama Baru',
            'role_title' => 'Jabatan Baru',
        ])->assertRedirect();

        $this->assertDatabaseHas('structures', ['name' => 'Nama Baru']);
    });

    test('staff can update structure image', function () {
        $newImage = UploadedFile::fake()->image('baru.jpg');

        $this->post("/marketing/structures/{$this->structure->id}", [
            'name'       => 'Nama',
            'role_title' => 'Jabatan',
            'image_path' => $newImage,
        ]);

        $updated = $this->structure->fresh();
        Storage::disk('public')->assertExists($updated->image_path);
    });

    test('old image is deleted when replacing with new image', function () {
        $oldPath = 'images/structures/old.jpg';
        Storage::disk('public')->put($oldPath, 'old content');

        $this->structure->image_path = $oldPath;
        $this->structure->save();

        $newImage = UploadedFile::fake()->image('new.jpg');
        $this->post("/marketing/structures/{$this->structure->id}", [
            'name'       => 'Nama',
            'role_title' => 'Jabatan',
            'image_path' => $newImage,
        ]);

        Storage::disk('public')->assertMissing($oldPath);
    });

    test('update fails without required fields', function () {
        $this->post("/marketing/structures/{$this->structure->id}", [])
            ->assertSessionHasErrors(['name', 'role_title']);
    });
});

describe('Structure Delete', function () {
    beforeEach(function () {
        Storage::fake('public');
        $this->user = User::factory()->create(['roles_id' => 100]);
        $this->actingAs($this->user);
    });

    test('staff can delete structure', function () {
        $structure = Structure::factory()->create([
            'name'       => 'Akan Dihapus',
            'role_title' => 'Jabatan',
        ]);

        $this->delete("/marketing/structures/{$structure->id}")->assertRedirect();
        $this->assertDatabaseMissing('structures', ['id' => $structure->id]);
    });

    test('deleting structure with image removes the file', function () {
        $path = 'images/structures/foto.jpg';
        Storage::disk('public')->put($path, 'content');

        $structure = Structure::factory()->create([
            'name'       => 'Ada Foto',
            'role_title' => 'Jabatan',
            'image_path' => $path,
        ]);

        $this->delete("/marketing/structures/{$structure->id}");
        Storage::disk('public')->assertMissing($path);
    });
});
