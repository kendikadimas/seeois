<?php

use App\Models\CompanyContent;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
    $this->actingAs(User::factory()->create(['roles_id' => 100]));
});

test('marketing staff can create company profile content with an image', function () {
    $response = $this->post(route('marketing.compro.store'), [
        'key' => 'homepage_test',
        'value' => 'Konten uji',
        'order' => 2,
        'image' => UploadedFile::fake()->image('homepage.jpg'),
    ]);

    $response->assertRedirect()->assertSessionHas('notif.type', 'success');
    $content = CompanyContent::where('key', 'homepage_test')->firstOrFail();
    Storage::disk('public')->assertExists($content->image_path);
});

test('company profile content update uses post route and safely replaces image', function () {
    $oldPath = 'images/compro/old.jpg';
    Storage::disk('public')->put($oldPath, 'old image');
    $content = CompanyContent::create([
        'key' => 'about_test',
        'value' => 'Isi lama',
        'image_path' => $oldPath,
        'order' => 1,
    ]);

    $response = $this->post(route('marketing.compro.update', $content), [
        'value' => 'Isi baru',
        'order' => 3,
        'image' => UploadedFile::fake()->image('new.jpg'),
    ]);

    $response->assertRedirect();
    $content->refresh();
    expect($content->value)->toBe('Isi baru')
        ->and($content->order)->toBe(3)
        ->and($content->image_path)->not->toBe($oldPath);
    Storage::disk('public')->assertExists($content->image_path);
    Storage::disk('public')->assertMissing($oldPath);
});

test('company profile content can be deleted with its image', function () {
    $path = 'images/compro/remove.jpg';
    Storage::disk('public')->put($path, 'image');
    $content = CompanyContent::create([
        'key' => 'remove_test',
        'image_path' => $path,
        'order' => 0,
    ]);

    $this->delete(route('marketing.compro.destroy', $content))->assertRedirect();

    $this->assertDatabaseMissing('company_contents', ['id' => $content->id]);
    Storage::disk('public')->assertMissing($path);
});
