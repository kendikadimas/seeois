<?php

use App\Models\Attachment;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
    $this->actingAs(User::factory()->create(['roles_id' => 8]));
});

test('pinned document can be updated through its post route', function () {
    $document = Attachment::create([
        'user_id' => auth()->id(),
        'title' => 'Dokumen Lama',
        'link' => 'https://example.com/old',
        'is_pinned' => true,
        'pinned_year' => 2026,
        'type' => 1,
    ]);

    $this->post(route('pinneddoc.update', $document), [
        'title' => 'Dokumen Baru',
        'link' => '',
        'pinned_year' => 2026,
    ])->assertRedirect();

    $document->refresh();
    expect($document->title)->toBe('Dokumen Baru')
        ->and($document->link)->toBeNull();
});

test('pinned document only accepts the file types shown in the form', function () {
    $this->post(route('pinneddoc.store'), [
        'title' => 'Dokumen Tidak Valid',
        'document' => UploadedFile::fake()->image('photo.jpg'),
        'pinned_year' => 2026,
    ])->assertSessionHasErrors('document');
});

test('replacing a pinned document removes the old file', function () {
    $oldPath = 'documents/pinned/old.pdf';
    Storage::disk('public')->put($oldPath, 'old');
    $document = Attachment::create([
        'user_id' => auth()->id(),
        'title' => 'Dokumen',
        'document' => $oldPath,
        'is_pinned' => true,
        'pinned_year' => 2026,
        'type' => 1,
    ]);

    $this->post(route('pinneddoc.update', $document), [
        'title' => 'Dokumen',
        'pinned_year' => 2026,
        'document' => UploadedFile::fake()->create('new.pdf', 100, 'application/pdf'),
    ])->assertRedirect();

    $document->refresh();
    Storage::disk('public')->assertExists($document->document);
    Storage::disk('public')->assertMissing($oldPath);
});
