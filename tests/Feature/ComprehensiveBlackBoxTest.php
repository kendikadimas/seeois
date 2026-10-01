<?php

use App\Models\Activity;
use App\Models\Department;
use App\Models\EventRegistration;
use App\Models\InternshipApplication;
use App\Models\MenuItem;
use App\Models\PaymentMethod;
use App\Models\Program;
use App\Models\SeminarEvent;
use App\Models\Stand;
use App\Models\StandSales;
use App\Models\User;
use App\Models\Voucher;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| COMPREHENSIVE BLACK BOX TEST SUITE FOR SEEOIS
|--------------------------------------------------------------------------
| Testing from an external/user perspective across all modules:
| 1. Authentication & Session Management
| 2. Public Company Profile & Navigation
| 3. Public Seminar Event Registration
| 4. Public Internship (Magang) Application
| 5. Shop & Customer E-Commerce (Cart, Checkout, Stock, Voucher)
| 6. Role-Based Access Control (RBAC) & Cross-Role Isolation
| 7. Department & Program Management Lifecycle
| 8. Sales Distribution & Production Modules
| 9. Groq AI Content Writer Feature
| 10. Security, Boundaries & Input Validation
*/

function makeBlackBoxSeminar(array $attrs = []): SeminarEvent
{
    return SeminarEvent::create(array_merge([
        'name'      => 'Seminar Test ' . uniqid(),
        'slug'      => 'seminar-' . uniqid(),
        'is_active' => true,
    ], $attrs));
}

function makeBlackBoxStand(): Stand
{
    return Stand::create([
        'name'            => 'Stand BB ' . uniqid(),
        'pic_id'          => 0,
        'income'          => 0,
        'expense'         => 0,
        'profit'          => 0,
        'menu_lock'       => 1,
        'sale_validation' => 0,
    ]);
}

// =========================================================================
// 1. AUTHENTICATION & SESSION MANAGEMENT
// =========================================================================
describe('Black Box - Authentication & Session Management', function () {
    test('guest can view login screen', function () {
        $this->get('/login')->assertOk();
    });

    test('guest can view registration screen', function () {
        $this->get('/register')->assertOk();
    });

    test('guest can view forgot password screen', function () {
        $this->get('/forgot-password')->assertOk();
    });

    test('login fails with unregistered email', function () {
        $response = $this->post('/login', [
            'email' => 'unregistered_user_999@test.com',
            'password' => 'somepassword123',
        ]);
        $response->assertSessionHas('notif.type', 'warning');
        $this->assertGuest();
    });

    test('login fails with incorrect password', function () {
        $user = User::factory()->create([
            'email' => 'test_user_auth@test.com',
            'password' => Hash::make('correct_password'),
        ]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong_password_xyz',
        ]);
        $response->assertSessionHasErrors();
        $this->assertGuest();
    });

    test('login fails when required fields are missing', function () {
        $response = $this->post('/login', []);
        $response->assertSessionHasErrors(['email', 'password']);
        $this->assertGuest();
    });

    test('login succeeds with valid credentials and redirects to intended page', function () {
        $user = User::factory()->create([
            'email' => 'auth_success_' . uniqid() . '@test.com',
            'password' => Hash::make('validpassword123'),
            'roles_id' => 99,
        ]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'validpassword123',
        ]);

        $response->assertRedirect();
        $this->assertAuthenticatedAs($user);
    });

    test('authenticated user can logout and session is invalidated', function () {
        $user = staffUser(4);
        $this->actingAs($user);
        $this->assertAuthenticated();

        $response = $this->post('/logout');
        $response->assertRedirect('/');
        $this->assertGuest();
    });

    test('registration validation enforces required fields and valid email', function () {
        $response = $this->post('/register', [
            'name' => '',
            'email' => 'not-an-email',
            'password' => 'short',
            'password_confirmation' => 'mismatch',
        ]);
        $response->assertSessionHasErrors(['name', 'email', 'password']);
    });
});

// =========================================================================
// 2. PUBLIC COMPANY PROFILE & VISITOR EXPERIENCE
// =========================================================================
describe('Black Box - Public Pages & Navigation', function () {
    test('public homepage is accessible with status 200', function () {
        $this->get('/')->assertOk();
    });

    test('public organizational structure page is accessible with status 200', function () {
        $this->get('/structure')->assertOk();
    });

    test('public activity list page is accessible with status 200', function () {
        $this->get('/activity')->assertOk();
    });

    test('non-existent url returns 404 error page gracefully', function () {
        $this->get('/non-existent-page-' . uniqid())->assertNotFound();
    });

    test('public activity detail page displays published activity', function () {
        $slug = 'pameran-kewirausahaan-' . uniqid();
        $activity = Activity::factory()->create([
            'title' => 'Pameran Kewirausahaan Nasional',
            'slug' => $slug,
            'description' => 'Detail kegiatan pameran kewirausahaan mahasiswa.',
            'is_published' => true,
        ]);

        $this->get("/activity/{$slug}")->assertOk();
    });
});

// =========================================================================
// 3. PUBLIC SEMINAR EVENT REGISTRATION
// =========================================================================
describe('Black Box - Public Seminar Registration', function () {
    test('guest cannot view registration page for non-existent seminar slug', function () {
        $this->get('/seminar/nasional/register/slug-palsu-tidak-ada')->assertNotFound();
    });

    test('guest can access registration page for an active seminar', function () {
        $event = makeBlackBoxSeminar();
        $this->get("/seminar/nasional/register/{$event->slug}")->assertOk();
    });

    test('guest cannot access registration page for an inactive seminar', function () {
        $event = makeBlackBoxSeminar(['is_active' => false]);
        $this->get("/seminar/nasional/register/{$event->slug}")->assertNotFound();
    });

    test('submitting seminar registration without required full_name fails validation', function () {
        $event = makeBlackBoxSeminar();
        $response = $this->post("/seminar/nasional/register/{$event->slug}", []);
        $response->assertSessionHasErrors('full_name');
    });

    test('submitting seminar registration with valid data stores the registration', function () {
        useFakeStorageDisks();
        $event = makeBlackBoxSeminar();

        $response = $this->post("/seminar/nasional/register/{$event->slug}", [
            'full_name' => 'Peserta Seminar',
            'email' => 'peserta_' . uniqid() . '@seminar.com',
            'phone' => '081234567890',
            'institution' => 'Universitas Jenderal Soedirman',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('event_registrations', [
            'event_id' => $event->id,
            'full_name' => 'Peserta Seminar',
            'institution' => 'Universitas Jenderal Soedirman',
        ]);
    });
});

// =========================================================================
// 4. PUBLIC INTERNSHIP (MAGANG) REGISTRATION
// =========================================================================
describe('Black Box - Public Internship Application', function () {
    beforeEach(function () {
        Program::firstOrCreate(['name' => 'Internship'], [
            'department_id' => 1,
            'pic_id' => 0,
        ]);
    });

    test('public can access internship application form', function () {
        $this->get('/seeo/internship/register')->assertOk();
    });

    test('internship application requires all mandatory fields', function () {
        $response = $this->post('/seeo/internship/register', []);
        $response->assertSessionHasErrors(['name', 'nim', 'phone_number', 'email_username', 'study_program']);
    });

    test('internship application fails if duplicate NIM is submitted', function () {
        useFakeStorageDisks();

        $nim = 'BB' . rand(100000, 999999);
        InternshipApplication::create([
            'name' => 'Peserta Pertama',
            'nim' => $nim,
            'phone_number' => '08111111111',
            'email' => 'peserta1@univ.ac.id',
            'study_program' => 'Informatika',
            'internship_year' => now()->year,
            'division_choice_1' => 'Software Engineer',
            'reason_choice_1' => 'Belajar tech stack',
            'division_choice_2' => 'UI/UX',
            'reason_choice_2' => 'Belajar desain',
            'willing_to_be_placed_elsewhere' => true,
            'status' => 'pending',
            'krs_path' => 'krs/test.jpg',
        ]);

        $response = $this->post('/seeo/internship/register', [
            'name' => 'Peserta Kedua',
            'nim' => $nim,
            'phone_number' => '08222222222',
            'email_username' => 'peserta2',
            'study_program' => 'Informatika',
            'internship_year' => now()->year,
            'division_choice_1' => 'Software Engineer',
            'reason_choice_1' => 'Belajar coding',
            'division_choice_2' => 'UI/UX',
            'reason_choice_2' => 'Belajar figma',
            'willing_to_be_placed_elsewhere' => true,
            'krs_photo' => UploadedFile::fake()->image('krs2.jpg'),
        ]);

        $response->assertSessionHasErrors('nim');
    });

    test('valid internship application submission succeeds and stores record', function () {
        useFakeStorageDisks();

        $nim = 'BB' . rand(100000, 999999);
        $response = $this->post('/seeo/internship/register', [
            'name' => 'Calon Magang Unggul',
            'nim' => $nim,
            'phone_number' => '081234987654',
            'email_username' => 'calon_magang_' . uniqid(),
            'study_program' => 'Teknik Elektro',
            'internship_year' => now()->year,
            'division_choice_1' => 'Public Relations',
            'reason_choice_1' => 'Ingin memperluas relasi media',
            'division_choice_2' => 'Marketing',
            'reason_choice_2' => 'Belajar digital marketing',
            'willing_to_be_placed_elsewhere' => true,
            'krs_photo' => UploadedFile::fake()->image('krs_valid.jpg'),
        ]);

        $response->assertOk();
        $this->assertDatabaseHas('internship_applications', [
            'nim' => $nim,
            'name' => 'Calon Magang Unggul',
        ]);
    });
});

// =========================================================================
// 5. SHOP & CUSTOMER E-COMMERCE SYSTEM
// =========================================================================
describe('Black Box - Blaterian Shop & Inventory Integrity', function () {
    test('public shop catalog is accessible to guests', function () {
        $this->get('/shop/home')->assertOk();
    });

    test('guest accessing customer promotion page is redirected to login', function () {
        $this->get('/shop/promotion')->assertRedirect('/login');
    });

    test('authenticated customer can view promotions', function () {
        $customer = User::factory()->create(['email_verified_at' => now()]);
        $this->actingAs($customer)->get('/shop/promotion')->assertOk();
    });

    test('customer checkout rolls back and aborts when item stock is insufficient', function () {
        $stand = makeBlackBoxStand();

        $menu = MenuItem::create([
            'stand_id' => $stand->id,
            'name' => 'Kopi Robusta',
            'category' => 'Drink',
            'price' => 15000,
            'stock' => 2, // only 2 available
            'sale' => 0,
        ]);

        PaymentMethod::firstOrCreate(['name' => 'Cash']);
        $customer = User::factory()->create(['email_verified_at' => now()]);

        // Attempting to checkout 5 items when only 2 exist
        $session = [
            'stand_id' => $stand->id,
            'transaction' => 75000,
            'voucher_id' => null,
            'order_list' => [['id' => $menu->id, 'qty' => 5, 'price' => 15000]],
        ];

        $response = $this->actingAs($customer)->withSession(['transaction' => $session])->post('/shop/payment', [
            'order_type' => 'now',
            'send_option' => 'pick_up',
            'payment_method' => 'cash',
            'payment_price' => 75000,
        ]);

        $response->assertSessionHasErrors('amount');
        expect($menu->fresh()->stock)->toBe(2)
            ->and(StandSales::where('stand_id', $stand->id)->count())->toBe(0);
    });

    test('customer voucher redemption fails when point balance is insufficient', function () {
        $customer = User::factory()->create(['point' => 50, 'email_verified_at' => now()]);
        $voucher = Voucher::create([
            'name' => 'Voucher Diskon 20K',
            'code' => 'VOUCH-' . uniqid(),
            'point' => 200, // requires 200 points
            'start_date' => today()->subDay()->toDateString(),
            'end_date' => today()->addDays(7)->toDateString(),
            'user_quota' => 10,
            'discount_type' => 'price',
        ]);

        $this->actingAs($customer)->post(route('customer.redeem.voucher', $voucher))->assertRedirect();
        expect($customer->fresh()->point)->toBe(50)
            ->and($customer->voucher()->where('voucher_id', $voucher->id)->exists())->toBeFalse();
    });
});

// =========================================================================
// 6. ROLE-BASED ACCESS CONTROL (RBAC) & ISOLATION
// =========================================================================
describe('Black Box - Role-Based Access Isolation', function () {
    test('guest accessing any staff panel is redirected to login', function () {
        $staffPanels = [
            STAFF_PREFIX . '/dashboard',
            STAFF_PREFIX . '/structural',
            STAFF_PREFIX . '/finance/pending-docs',
            STAFF_PREFIX . '/operating/panel',
            STAFF_PREFIX . '/sales-distribution',
            STAFF_PREFIX . '/production/panel',
            STAFF_PREFIX . '/seminar/registrations',
            STAFF_PREFIX . '/hr/birthdays',
            STAFF_PREFIX . '/iwp/receipts',
            STAFF_PREFIX . '/super-admin',
        ];

        foreach ($staffPanels as $panel) {
            $this->get($panel)->assertRedirect('/login');
        }
    });

    test('cross-role privilege boundaries reject unauthorized access', function () {
        // Role 10 (Sales) cannot access Finance Pending Docs (Role 2)
        $salesUser = staffUser(10);
        $res = $this->actingAs($salesUser)->get(STAFF_PREFIX . '/finance/pending-docs');
        expect(in_array($res->status(), [302, 403], true))->toBeTrue();

        // Role 2 (Finance) cannot access Operating Panel (Role 3)
        $financeUser = staffUser(2);
        $res = $this->actingAs($financeUser)->get(STAFF_PREFIX . '/operating/panel');
        expect(in_array($res->status(), [302, 403], true))->toBeTrue();

        // Role 6 (HR) cannot access IWP Receipts (Role 13)
        $hrUser = staffUser(6);
        $res = $this->actingAs($hrUser)->get(STAFF_PREFIX . '/iwp/receipts');
        expect(in_array($res->status(), [302, 403], true))->toBeTrue();

        // Role 9 (Marketing) cannot access Operating Panel (Role 3)
        $marketingUser = staffUser(9);
        $res = $this->actingAs($marketingUser)->get(STAFF_PREFIX . '/operating/panel');
        expect(in_array($res->status(), [302, 403], true))->toBeTrue();

        // Normal staff (Role 4) cannot access Super Admin panel
        $normalStaff = staffUser(4);
        $res = $this->actingAs($normalStaff)->get(STAFF_PREFIX . '/super-admin');
        expect(in_array($res->status(), [302, 403], true))->toBeTrue();
    });

    test('Super Admin (Role 99) has bypass access to all sensitive panels', function () {
        $superAdmin = staffUser(99);
        $this->actingAs($superAdmin);

        $this->get(STAFF_PREFIX . '/super-admin')->assertOk();
        $this->get(STAFF_PREFIX . '/finance/pending-docs')->assertOk();
        $this->get(STAFF_PREFIX . '/operating/panel')->assertOk();
        $this->get(STAFF_PREFIX . '/sales-distribution')->assertOk();
        $this->get(STAFF_PREFIX . '/production/panel')->assertOk();
        $this->get(STAFF_PREFIX . '/seminar/registrations')->assertOk();
        $this->get(STAFF_PREFIX . '/hr/birthdays')->assertOk();
        $this->get(STAFF_PREFIX . '/iwp/receipts')->assertOk();
    });
});

// =========================================================================
// 7. INTERNAL SEEO MANAGEMENT (DEPARTMENTS & PROGRAMS)
// =========================================================================
describe('Black Box - Department & Program Workflow', function () {
    test('department creation validates uniqueness of name', function () {
        $ceo = staffUser(1);
        $this->actingAs($ceo);

        Department::create([
            'name' => 'Divisi Riset ' . uniqid(),
            'manager_id' => $ceo->id,
            'initial' => 'DR',
        ]);

        $dept = Department::where('manager_id', $ceo->id)->first();

        $response = $this->post(STAFF_PREFIX . '/department/add', [
            'name' => $dept->name,
            'manager_id' => $ceo->id,
            'initial' => 'DR2',
        ]);

        $response->assertSessionHasErrors('name');
    });

    test('employee management prevents CEO from demoting themselves', function () {
        $ceo = staffUser(1);
        $this->actingAs($ceo);

        $response = $this->post(STAFF_PREFIX . '/user/role/update', [
            'user_id' => $ceo->id,
            'roles_id' => 4, // attempt to demote self
        ]);

        $response->assertSessionHas('notif.type', 'warning');
        $this->assertEquals(1, $ceo->fresh()->roles_id);
    });
});

// =========================================================================
// 8. SALES DISTRIBUTION & PRODUCTION SUBSYSTEMS
// =========================================================================
describe('Black Box - Sales & Production Panel Workflow', function () {
    test('production panel prevents menu stock from becoming negative', function () {
        $stand = makeBlackBoxStand();
        $menu = MenuItem::create([
            'stand_id' => $stand->id,
            'name' => 'Ayam Penyet',
            'category' => 'Food',
            'price' => 12000,
            'stock' => 5,
            'sale' => 0,
        ]);

        $prodStaff = staffUser(11);
        $stand->production()->attach($prodStaff->id);
        $this->actingAs($prodStaff);

        // Attempting to subtract 10 when stock is only 5
        $this->post("/seeo/staff/production/panel/menu/{$menu->id}/stock", [
            'amount' => -10,
        ]);

        // Stock must not drop below zero
        $this->assertGreaterThanOrEqual(0, $menu->fresh()->stock);
    });

    test('production staff can add stock to an assigned stand menu', function () {
        $stand = makeBlackBoxStand();
        $menu = MenuItem::create([
            'stand_id' => $stand->id,
            'name' => 'Es Jeruk Segar',
            'category' => 'Drink',
            'price' => 6000,
            'stock' => 10,
            'sale' => 0,
        ]);

        $prodStaff = staffUser(11);
        $stand->production()->attach($prodStaff->id);
        $this->actingAs($prodStaff);

        $response = $this->post("/seeo/staff/production/panel/menu/{$menu->id}/stock", [
            'amount' => 15,
        ]);

        $response->assertRedirect();
        $this->assertEquals(25, $menu->fresh()->stock);
    });
});

// =========================================================================
// 9. GROQ AI CONTENT WRITER FEATURE
// =========================================================================
describe('Black Box - Groq AI Content Writer Feature', function () {
    test('guest is rejected when accessing generate-content endpoint', function () {
        $response = $this->postJson('/seeo/staff/marketing/activities/generate-content', [
            'title' => 'Judul Berita',
            'current_content' => 'Bahan berita lengkap yang melebihi batas empat puluh karakter untuk pengujian.',
        ]);
        $response->assertUnauthorized();
    });

    test('non-marketing role is forbidden (403) from AI content writer', function () {
        $financeUser = staffUser(2);
        $response = $this->actingAs($financeUser)->postJson('/seeo/staff/marketing/activities/generate-content', [
            'title' => 'Judul Berita',
            'current_content' => 'Bahan berita lengkap yang melebihi batas empat puluh karakter untuk pengujian.',
        ]);
        $response->assertForbidden();
    });

    test('AI writer rejects request if current_content is missing', function () {
        $marketingUser = staffUser(9);
        $response = $this->actingAs($marketingUser)->postJson('/seeo/staff/marketing/activities/generate-content', [
            'title' => 'Judul Berita',
        ]);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors('current_content');
    });

    test('AI writer rejects request if current_content is shorter than 40 characters', function () {
        $marketingUser = staffUser(9);
        $response = $this->actingAs($marketingUser)->postJson('/seeo/staff/marketing/activities/generate-content', [
            'title' => 'Judul Berita',
            'current_content' => 'Terlalu pendek',
        ]);
        $response->assertStatus(422);
        $response->assertJsonValidationErrors('current_content');
    });

    test('AI writer successfully generates article content when valid input is provided', function () {
        $marketingUser = staffUser(9);

        Http::fake([
            'https://api.groq.com/openai/v1/chat/completions' => Http::response([
                'choices' => [
                    [
                        'message' => [
                            'content' => 'PURBALINGGA — SEEO menyelenggarakan lokakarya kewirausahaan mahasiswa pada hari ini dengan dihadiri oleh puluhan peserta dari berbagai program studi.',
                        ],
                    ],
                ],
            ], 200),
        ]);

        $response = $this->actingAs($marketingUser)->postJson('/seeo/staff/marketing/activities/generate-content', [
            'title' => 'Lokakarya Kewirausahaan Mahasiswa 2026',
            'category' => 'Workshop',
            'current_content' => 'Bahan berita mengenai acara lokakarya kewirausahaan SEEO yang sukses diadakan di kampus hari ini.',
        ]);

        $response->assertOk();
        $response->assertJsonStructure(['content']);
        $this->assertStringContainsString('kewirausahaan', $response->json('content'));
    });
});

// =========================================================================
// 10. SECURITY, BOUNDARIES & INPUT SANITIZATION
// =========================================================================
describe('Black Box - Security & Boundary Validation', function () {
    test('malicious script tag in public registration input is safely stored or escaped without crashing', function () {
        useFakeStorageDisks();
        $event = makeBlackBoxSeminar();

        $xssName = '<script>alert("xss")</script>';
        $response = $this->post("/seminar/nasional/register/{$event->slug}", [
            'full_name' => $xssName,
            'email' => 'xss_tester_' . uniqid() . '@security.com',
            'phone' => '08123456789',
            'institution' => 'Lab Cyber',
        ]);

        $response->assertRedirect();
        $reg = EventRegistration::where('full_name', $xssName)->first();
        $this->assertNotNull($reg);
        $this->assertEquals($xssName, $reg->full_name);
    });

    test('disallowed executable file upload is strictly rejected', function () {
        $marketingUser = staffUser(9);
        $this->actingAs($marketingUser);

        // Attempting to upload an executable PHP file disguised or raw
        $maliciousFile = UploadedFile::fake()->create('exploit.php', 100, 'application/x-php');

        $response = $this->post(STAFF_PREFIX . '/marketing/activities', [
            'title' => 'Artikel Berkas Berbahaya',
            'description' => 'Mencoba unggah berkas php terlarang.',
            'image_path' => $maliciousFile,
        ]);

        $response->assertSessionHasErrors('image_path');
    });
});
