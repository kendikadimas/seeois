<?php

use App\Models\FoodsTag;
use App\Models\Program;
use App\Models\Stand;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

describe('Menu image upload (Sales Distribution)', function () {
    beforeEach(function () {
        useFakeStorageDisks();
        $this->user = staffUser(10);
        $this->stand = Stand::create([
            'name' => 'Upload Stand', 'pic_id' => 0, 'income' => 0,
            'expense' => 0, 'profit' => 0, 'menu_lock' => 0, 'sale_validation' => 0,
        ]);
        FoodsTag::firstOrCreate(['name' => 'Test'], ['color' => '#111']);
        $this->actingAs($this->user);
    });

    test('role 10 can create menu with image file', function () {
        $tag = FoodsTag::first();

        $response = $this->post(STAFF_PREFIX . '/sales-distribution/menu', [
            'stand_id' => $this->stand->id,
            'name'     => 'Menu With Photo',
            'category' => 'Snack',
            'food_tag' => [$tag->id],
            'price'    => 8000,
            'stock'    => 5,
            'image'    => UploadedFile::fake()->image('menu.jpg'),
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('foods_menu', ['name' => 'Menu With Photo']);

        $menu = \App\Models\MenuItem::where('name', 'Menu With Photo')->first();
        expect($menu->image)->not->toBeNull();

        $disk = config('app.env') === 'production' ? 'google' : 'public';
        expect(Storage::disk($disk)->exists('images/shop/foods/menu/' . $menu->image))->toBeTrue();
    });
});

describe('Marketing CMS image upload', function () {
    beforeEach(function () {
        useFakeStorageDisks();
        $this->actingAs(staffUser(9));
    });

    test('marketing can upload editor image', function () {
        $response = $this->post(STAFF_PREFIX . '/marketing/upload-image', [
            'image' => UploadedFile::fake()->image('editor.png'),
        ]);

        $response->assertOk();
        $response->assertJsonStructure(['url', 'path']);

        expect(Storage::disk('public')->exists($response->json('path')))->toBeTrue();
    });

    test('role 2 cannot upload marketing image', function () {
        $this->actingAs(staffUser(2))
            ->post(STAFF_PREFIX . '/marketing/upload-image', [
                'image' => UploadedFile::fake()->image('blocked.png'),
            ])
            ->assertRedirect();
    });
});

describe('Internship KRS upload (google disk)', function () {
    beforeEach(function () {
        useFakeStorageDisks();
        Program::create([
            'name' => 'Internship', 'department_id' => 1, 'pic_id' => 0,
        ]);
    });

    test('public can submit internship with KRS image', function () {
        $nim = 'H1D' . random_int(10000, 99999);

        $response = $this->post('/seeo/internship/register', [
            'name'                         => 'Mahasiswa Test',
            'nim'                          => $nim,
            'phone_number'                 => '08' . random_int(100000000, 999999999),
            'krs_photo'                    => UploadedFile::fake()->image('krs.jpg'),
            'email_username'               => 'mhs.test',
            'study_program'                => 'Informatika',
            'internship_year'              => now()->year,
            'division_choice_1'            => 'Software',
            'reason_choice_1'              => 'Belajar',
            'division_choice_2'            => 'Marketing',
            'reason_choice_2'              => 'Minat',
            'willing_to_be_placed_elsewhere' => true,
        ]);

        $response->assertOk();
        $this->assertDatabaseHas('internship_applications', ['nim' => $nim]);

        $app = \App\Models\InternshipApplication::where('nim', $nim)->first();
        expect($app->krs_path)->not->toBeNull();
        expect(Storage::disk('google')->exists($app->krs_path))->toBeTrue();
    });
});
