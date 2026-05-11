<?php

use App\Models\InternshipApplication;
use App\Models\Program;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    Program::create([
        'name' => 'Internship',
        'department_id' => 1,
        'pic_id' => 0
    ]);
});

describe('Internship Application - Index (Admin)', function () {
    test('guest cannot access internship index', function () {
        $this->get('/internship')->assertRedirect('/login');
    });

    test('normal staff cannot access internship index', function () {
        $user = User::factory()->create(['roles_id' => 4]); // Normal staff
        $this->actingAs($user)->get('/internship')->assertStatus(403);
    });

    test('CEO can access internship index', function () {
        $ceo = User::factory()->create(['roles_id' => 1]);
        $this->actingAs($ceo)->get('/internship')->assertStatus(200);
    });

    test('HR Manager can access internship index', function () {
        $hr = User::factory()->create(['roles_id' => 6]);
        $this->actingAs($hr)->get('/internship')->assertStatus(200);
    });

    test('Internship PIC can access internship index', function () {
        $pic = User::factory()->create(['roles_id' => 4]);
        
        // Update program internship set current user as PIC
        Program::where('name', 'Internship')->update([
            'pic_id' => $pic->id,
        ]);

        $this->actingAs($pic)->get('/internship')->assertStatus(200);
    });
});

describe('Internship Application - Create Form (Public)', function () {
    test('public can access internship registration form', function () {
        $this->get('/internship/register')->assertStatus(200);
    });

    test('user who already submitted via session sees success state', function () {
        $response = $this->withSession(['internship_submitted' => true])
            ->get('/internship/register');
        
        $response->assertStatus(200);
        // Inertia prop assertion would go here in a full UI test
    });
});

describe('Internship Application - Store (Public)', function () {
    beforeEach(function () {
        Storage::fake('google'); // Use the disk specified in controller
    });

    test('user can submit internship application', function () {
        $krsFile = UploadedFile::fake()->image('krs.jpg', 600, 800);

        $response = $this->post('/internship/register', [
            'name' => 'Mahasiswa Magang',
            'nim' => 'H1A020001',
            'phone_number' => '081234567890',
            'krs_photo' => $krsFile,
            'email_username' => 'mahasiswa.magang',
            'study_program' => 'Informatika',
            'division_choice_1' => 'Software Engineer',
            'reason_choice_1' => 'Ingin belajar coding',
            'division_choice_2' => 'UI/UX Designer',
            'reason_choice_2' => 'Suka desain',
            'willing_to_be_placed_elsewhere' => true,
        ]);

        $response->assertStatus(200); // Inertia returns 200 on successful form submit with component render
        $this->assertDatabaseHas('internship_applications', [
            'nim' => 'H1A020001',
            'name' => 'Mahasiswa Magang',
        ]);
        
        $application = InternshipApplication::where('nim', 'H1A020001')->first();
        $this->assertNotNull($application->krs_path);
    });

    test('application fails if NIM is already registered', function () {
        InternshipApplication::create([
            'name' => 'Existing User',
            'nim' => 'H1A020002',
            'phone_number' => '08111111111',
            'krs_path' => 'dummy/path',
            'email' => 'existing@mhs.unsoed.ac.id',
            'study_program' => 'Sistem Informasi',
            'division_choice_1' => 'Data Analyst',
            'reason_choice_1' => 'Suka data',
            'division_choice_2' => 'QA',
            'reason_choice_2' => 'Suka testing',
            'willing_to_be_placed_elsewhere' => false,
            'ip_address' => '127.0.0.1'
        ]);

        $krsFile = UploadedFile::fake()->image('krs.jpg');

        $this->post('/internship/register', [
            'name' => 'Another User',
            'nim' => 'H1A020002', // Duplicate
            'phone_number' => '08222222222',
            'krs_photo' => $krsFile,
            'email_username' => 'another.user',
            'study_program' => 'Informatika',
            'division_choice_1' => 'SE',
            'reason_choice_1' => 'Alasan',
            'division_choice_2' => 'UI',
            'reason_choice_2' => 'Alasan',
            'willing_to_be_placed_elsewhere' => true,
        ])->assertSessionHasErrors('nim');
    });

    test('application fails if missing required fields', function () {
        $this->post('/internship/register', [
            'name' => 'Incomplete',
        ])->assertSessionHasErrors(['nim', 'phone_number', 'krs_photo', 'email_username']);
    });
});
