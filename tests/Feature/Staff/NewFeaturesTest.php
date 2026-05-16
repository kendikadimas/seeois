<?php

use App\Models\EventRegistration;
use App\Models\FoodsTag;
use App\Models\Logbook;
use App\Models\SeminarEvent;
use App\Models\MenuItem;
use App\Models\Program;
use App\Models\RecipeComponent;
use App\Models\Stand;
use App\Models\StandExpense;
use App\Models\StandSales;
use App\Models\User;




// ============================================================
// HELPERS
// ============================================================

function makeUser(int $rolesId): User
{
    return User::factory()->create([
        'roles_id'          => $rolesId,
        'email_verified_at' => now(),
    ]);
}

function makeStand(): Stand
{
    return Stand::create([
        'name'            => 'Test Stand ' . uniqid(),
        'pic_id'          => 0,
        'income'          => 0,
        'expense'         => 0,
        'profit'          => 0,
        'menu_lock'       => 0,
        'sale_validation' => 0,
    ]);
}

function makeMenu(Stand $stand, array $attrs = []): MenuItem
{
    return MenuItem::create(array_merge([
        'stand_id'   => $stand->id,
        'name'       => 'Menu Test ' . uniqid(),
        'category'   => 'Main Course',
        'price'      => 15000,
        'stock'      => 10,
        'sale'       => 0,
        'is_published' => false,
    ], $attrs));
}

function makeStandExpense(Stand $stand): StandExpense
{
    return StandExpense::create([
        'stand_id'       => $stand->id,
        'name'           => 'Bahan Test',
        'qty'            => 10,
        'unit'           => 'kg',
        'total_price'    => 50000,
        'price'          => 5000,
        'operational_id' => 1,
    ]);
}

function makeLogbook(User $employee, Program $program): Logbook
{
    return Logbook::create([
        'user_id'    => $employee->id,
        'program_id' => $program->id,
        'title'      => 'Log Test ' . uniqid(),
        'date_time'  => now(),
        'validated'  => 0,
        'image'      => 'test.webp',
    ]);
}

function makeProgram(User $owner): Program
{
    return Program::create([
        'name'          => 'Program Test ' . uniqid(),
        'department_id' => 1,
        'pic_id'        => $owner->id,
        'budget'        => 0,
        'expense'       => 0,
        'disbursement'  => 0,
    ]);
}

function defaultFoodTags(): array
{
    $tag = FoodsTag::firstOrCreate(
        ['name' => 'Test Tag'],
        ['color' => '#000000']
    );

    return [$tag->id];
}

function menuPayload(Stand $stand, array $overrides = []): array
{
    return array_merge([
        'stand_id' => $stand->id,
        'name'     => 'Menu Test ' . uniqid(),
        'category' => 'Main Course',
        'food_tag' => defaultFoodTags(),
        'price'    => 15000,
        'stock'    => 10,
    ], $overrides);
}

// ============================================================
// ROLE ACCESS CONTROL — semua panel
// ============================================================

describe('Role Access Control', function () {
    test('unauthenticated user redirected from operating panel', function () {
        $this->get('/seeo/staff/operating/panel')->assertRedirect('/login');
    });

    test('unauthenticated user redirected from sales distribution', function () {
        $this->get('/seeo/staff/sales-distribution')->assertRedirect('/login');
    });

    test('unauthenticated user redirected from production panel', function () {
        $this->get('/seeo/staff/production/panel')->assertRedirect('/login');
    });

    test('unauthenticated user redirected from seminar registrations', function () {
        $this->get('/seeo/staff/seminar/registrations')->assertRedirect('/login');
    });

    test('role 3 can access operating panel', function () {
        $user = makeUser(3);
        $this->actingAs($user)->get('/seeo/staff/operating/panel')->assertStatus(200);
    });

    test('role 10 can access sales distribution panel', function () {
        $user = makeUser(10);
        $this->actingAs($user)->get('/seeo/staff/sales-distribution')->assertStatus(200);
    });

    test('role 11 can access production panel', function () {
        $user = makeUser(11);
        $this->actingAs($user)->get('/seeo/staff/production/panel')->assertStatus(200);
    });

    test('role 12 can access seminar registrations panel', function () {
        $user = makeUser(12);
        $this->actingAs($user)->get('/seeo/staff/seminar/registrations')->assertStatus(200);
    });

    test('super admin (99) can access all panels', function () {
        $user = makeUser(99);
        $this->actingAs($user)
            ->get('/seeo/staff/operating/panel')->assertStatus(200);
        $this->actingAs($user)
            ->get('/seeo/staff/sales-distribution')->assertStatus(200);
        $this->actingAs($user)
            ->get('/seeo/staff/production/panel')->assertStatus(200);
        $this->actingAs($user)
            ->get('/seeo/staff/seminar/registrations')->assertStatus(200);
    });

    test('role 3 cannot access sales distribution', function () {
        $user = makeUser(3);
        $this->actingAs($user)->get('/seeo/staff/sales-distribution')->assertRedirect();
    });

    test('role 10 cannot access operating panel', function () {
        $user = makeUser(10);
        $this->actingAs($user)->get('/seeo/staff/operating/panel')->assertRedirect();
    });

    test('role 11 cannot access sales distribution', function () {
        $user = makeUser(11);
        $this->actingAs($user)->get('/seeo/staff/sales-distribution')->assertRedirect();
    });

    test('role 12 cannot access production panel', function () {
        $user = makeUser(12);
        $this->actingAs($user)->get('/seeo/staff/production/panel')->assertRedirect();
    });
});

// ============================================================
// PUBLIC SEMINAR REGISTRATION
// ============================================================

function makeSeminarEvent(array $attrs = []): SeminarEvent
{
    return SeminarEvent::create(array_merge([
        'name'      => 'Seminar Test ' . uniqid(),
        'slug'      => 'seminar-' . uniqid(),
        'is_active' => true,
    ], $attrs));
}

describe('Public Seminar Registration', function () {
    test('public can access seminar registration form', function () {
        $event = makeSeminarEvent();
        $this->get("/seminar/nasional/register/{$event->slug}")->assertStatus(200);
    });

    test('public can submit seminar registration with required fields', function () {
        $event = makeSeminarEvent();
        $response = $this->post("/seminar/nasional/register/{$event->slug}", [
            'full_name'   => 'Budi Santoso',
            'email'       => 'budi@example.com',
            'phone'       => '08123456789',
            'institution' => 'Universitas Negeri',
            'job_title'   => 'Mahasiswa',
            'notes'       => 'Tertarik dengan topik teknologi',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');
        $this->assertDatabaseHas('event_registrations', [
            'full_name' => 'Budi Santoso',
            'event_id'  => $event->id,
        ]);
    });

    test('seminar registration fails without full_name', function () {
        $event = makeSeminarEvent();
        $this->post("/seminar/nasional/register/{$event->slug}", [
            'email' => 'budi@example.com',
        ])->assertSessionHasErrors('full_name');
    });

    test('inactive seminar returns 404', function () {
        $event = makeSeminarEvent(['is_active' => false]);
        $this->get("/seminar/nasional/register/{$event->slug}")->assertNotFound();
    });

    test('seminar registration fails with invalid email', function () {
        $event = makeSeminarEvent();
        $this->post("/seminar/nasional/register/{$event->slug}", [
            'full_name' => 'Budi',
            'email'     => 'bukan-email',
        ])->assertSessionHasErrors('email');
    });

    test('seminar registration succeeds with only required fields', function () {
        $event = makeSeminarEvent();
        $response = $this->post("/seminar/nasional/register/{$event->slug}", [
            'full_name' => 'Peserta Tanpa Kontak',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('event_registrations', [
            'full_name' => 'Peserta Tanpa Kontak',
            'event_id'  => $event->id,
        ]);
    });
});

// ============================================================
// SEMINAR REGISTRATIONS — STAFF VIEW (ROLE 12)
// ============================================================

describe('Seminar Registrations Staff Panel', function () {
    beforeEach(function () {
        $this->user = makeUser(12);
        $this->actingAs($this->user);
    });

    test('role 12 can view seminar registrations list', function () {
        EventRegistration::create([
            'event_name' => 'Seminar Test',
            'full_name'  => 'Peserta Satu',
        ]);

        $this->get('/seeo/staff/seminar/registrations')->assertStatus(200);
    });
});

// ============================================================
// OPERATING PANEL (ROLE 3)
// ============================================================

describe('Operating Panel', function () {
    beforeEach(function () {
        $this->user = makeUser(3);
        $this->actingAs($this->user);
    });

    test('role 3 sees operating panel page', function () {
        $this->get('/seeo/staff/operating/panel')->assertStatus(200);
    });

    test('role 3 can validate a logbook', function () {
        $employee = makeUser(1);
        $program  = makeProgram($employee);
        $logbook  = makeLogbook($employee, $program);

        $response = $this->post("/seeo/staff/logbook/validate/{$logbook->id}");

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');
        $this->assertDatabaseHas('logbook', [
            'id'        => $logbook->id,
            'validated' => 1,
        ]);
    });

    test('role 3 can toggle-unvalidate a validated logbook', function () {
        $employee = makeUser(1);
        $program  = makeProgram($employee);
        $logbook  = makeLogbook($employee, $program);
        $logbook->update(['validated' => 1]);

        $this->post("/seeo/staff/logbook/validate/{$logbook->id}");

        $this->assertDatabaseHas('logbook', [
            'id'        => $logbook->id,
            'validated' => 0,
        ]);
    });

    test('validating non-existent logbook returns warning', function () {
        $this->post('/seeo/staff/logbook/validate/99999')
            ->assertRedirect()
            ->assertSessionHas('notif.type', 'warning');
    });
});

// ============================================================
// SALES DISTRIBUTION PANEL (ROLE 10)
// ============================================================

describe('Sales Distribution — Menu Management', function () {
    beforeEach(function () {
        $this->user  = makeUser(10);
        $this->stand = makeStand();
        $this->actingAs($this->user);
    });

    test('role 10 can access sales distribution panel', function () {
        $this->get('/seeo/staff/sales-distribution')->assertStatus(200);
    });

    test('role 10 can access panel with specific stand_id', function () {
        $this->get("/seeo/staff/sales-distribution?stand_id={$this->stand->id}")
            ->assertStatus(200);
    });

    test('role 10 can create a new menu item', function () {
        $response = $this->post('/seeo/staff/sales-distribution/menu', menuPayload($this->stand, [
            'name'  => 'Nasi Goreng Spesial',
            'stock' => 20,
        ]));

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');
        $this->assertDatabaseHas('foods_menu', [
            'name'     => 'Nasi Goreng Spesial',
            'stand_id' => $this->stand->id,
        ]);
    });

    test('create menu fails without name', function () {
        $payload = menuPayload($this->stand);
        unset($payload['name']);
        $this->post('/seeo/staff/sales-distribution/menu', $payload)
            ->assertSessionHasErrors('name');
    });

    test('create menu fails without stand_id', function () {
        $payload = menuPayload($this->stand);
        unset($payload['stand_id']);
        $this->post('/seeo/staff/sales-distribution/menu', $payload)
            ->assertSessionHasErrors('stand_id');
    });

    test('create menu fails with non-existent stand_id', function () {
        $this->post('/seeo/staff/sales-distribution/menu', menuPayload($this->stand, [
            'stand_id' => 99999,
            'name'     => 'Menu Invalid Stand',
        ]))->assertSessionHasErrors('stand_id');
    });

    test('create menu fails with negative price', function () {
        $this->post('/seeo/staff/sales-distribution/menu', menuPayload($this->stand, [
            'name'  => 'Menu Harga Negatif',
            'price' => -1000,
        ]))->assertSessionHasErrors('price');
    });

    test('create menu with optional volume and mass fields', function () {
        $response = $this->post('/seeo/staff/sales-distribution/menu', menuPayload($this->stand, [
            'name'        => 'Es Teh Manis',
            'category'    => 'Minuman',
            'price'       => 5000,
            'stock'       => 50,
            'volume'      => '250',
            'volume_unit' => 'ml',
            'mass'        => '200',
            'mass_unit'   => 'gr',
        ]));

        $response->assertRedirect();
        $this->assertDatabaseHas('foods_menu', [
            'name'        => 'Es Teh Manis',
            'volume'      => '250',
            'volume_unit' => 'ml',
        ]);
    });
});

describe('Sales Distribution — Publish/Unpublish', function () {
    beforeEach(function () {
        $this->user  = makeUser(10);
        $this->stand = makeStand();
        $this->menu  = makeMenu($this->stand);
        $this->actingAs($this->user);
    });

    test('role 10 can publish a menu', function () {
        $response = $this->post("/seeo/staff/sales-distribution/menu/{$this->menu->id}/publish");

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');
        $this->assertDatabaseHas('foods_menu', [
            'id'           => $this->menu->id,
            'is_published' => 1,
        ]);
    });

    test('role 10 can unpublish a published menu', function () {
        $this->menu->update(['is_published' => true, 'published_at' => now()]);

        $this->post("/seeo/staff/sales-distribution/menu/{$this->menu->id}/publish");

        $this->assertDatabaseHas('foods_menu', [
            'id'           => $this->menu->id,
            'is_published' => 0,
        ]);
    });
});

describe('Sales Distribution — Recipe', function () {
    beforeEach(function () {
        $this->user    = makeUser(10);
        $this->stand   = makeStand();
        $this->menu    = makeMenu($this->stand);
        $this->expense = makeStandExpense($this->stand);
        $this->actingAs($this->user);
    });

    test('role 10 can attach recipe components to a menu', function () {
        $response = $this->post("/seeo/staff/sales-distribution/menu/{$this->menu->id}/recipe", [
            'components' => [
                [
                    'stand_expense_id' => $this->expense->id,
                    'quantity_used'    => 2.5,
                ],
            ],
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');
        $this->assertDatabaseHas('menu_recipe_components', [
            'menu_id'          => $this->menu->id,
            'stand_expense_id' => $this->expense->id,
        ]);
    });

    test('attach recipe fails with invalid expense id', function () {
        $this->post("/seeo/staff/sales-distribution/menu/{$this->menu->id}/recipe", [
            'components' => [
                [
                    'stand_expense_id' => 99999,
                    'quantity_used'    => 1.0,
                ],
            ],
        ])->assertSessionHasErrors('components.0.stand_expense_id');
    });

    test('attach recipe fails with zero quantity', function () {
        $this->post("/seeo/staff/sales-distribution/menu/{$this->menu->id}/recipe", [
            'components' => [
                [
                    'stand_expense_id' => $this->expense->id,
                    'quantity_used'    => 0,
                ],
            ],
        ])->assertSessionHasErrors('components.0.quantity_used');
    });

    test('attach recipe fails with empty components', function () {
        $this->post("/seeo/staff/sales-distribution/menu/{$this->menu->id}/recipe", [
            'components' => [],
        ])->assertSessionHasErrors('components');
    });
});

describe('Sales Distribution — Delivery Toggle', function () {
    beforeEach(function () {
        $this->user  = makeUser(10);
        $this->stand = makeStand();
        $this->actingAs($this->user);

        $this->sale = StandSales::create([
            'stand_id'    => $this->stand->id,
            'customer'    => 'Customer Test',
            'cashier_id'  => $this->user->id,
            'order_type'  => 'now',
            'send_option' => 'delivery',
            'transaction' => 25000,
            'discount'    => 0,
            'payment_method_id' => 1,
            'payment_price'     => 25000,
        ]);
    });

    test('role 10 can mark order as delivered', function () {
        $response = $this->post("/seeo/staff/sales-distribution/order/{$this->sale->id}/deliver");

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');

        $this->assertNotNull($this->sale->fresh()->delivered_at);
    });

    test('role 10 can toggle-cancel delivery', function () {
        $this->sale->update(['delivered_at' => now()]);

        $this->post("/seeo/staff/sales-distribution/order/{$this->sale->id}/deliver");

        $this->assertNull($this->sale->fresh()->delivered_at);
    });
});

// ============================================================
// PRODUCTION PANEL (ROLE 11)
// ============================================================

describe('Production Panel', function () {
    beforeEach(function () {
        $this->user  = makeUser(11);
        $this->stand = makeStand();
        $this->menu  = makeMenu($this->stand, ['stock' => 10]);
        $this->actingAs($this->user);
    });

    test('role 11 can access production panel', function () {
        $this->get('/seeo/staff/production/panel')->assertStatus(200);
    });

    test('role 11 can access panel with specific stand_id', function () {
        $this->get("/seeo/staff/production/panel?stand_id={$this->stand->id}")
            ->assertStatus(200);
    });

    test('role 11 can update menu stock (add)', function () {
        $response = $this->post("/seeo/staff/production/panel/menu/{$this->menu->id}/stock", [
            'amount' => 5,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');
        $this->assertDatabaseHas('foods_menu', [
            'id'    => $this->menu->id,
            'stock' => 15,
        ]);
    });

    test('role 11 can update menu stock (subtract)', function () {
        $this->post("/seeo/staff/production/panel/menu/{$this->menu->id}/stock", [
            'amount' => -3,
        ]);

        $this->assertDatabaseHas('foods_menu', [
            'id'    => $this->menu->id,
            'stock' => 7,
        ]);
    });

    test('update stock fails without amount', function () {
        $this->post("/seeo/staff/production/panel/menu/{$this->menu->id}/stock", [])
            ->assertSessionHasErrors('amount');
    });

    test('update stock fails with non-integer amount', function () {
        $this->post("/seeo/staff/production/panel/menu/{$this->menu->id}/stock", [
            'amount' => 'abc',
        ])->assertSessionHasErrors('amount');
    });

    test('role 11 can publish a menu', function () {
        $response = $this->post("/seeo/staff/production/panel/menu/{$this->menu->id}/publish");

        $response->assertRedirect();
        $this->assertDatabaseHas('foods_menu', [
            'id'           => $this->menu->id,
            'is_published' => 1,
        ]);
    });

    test('role 11 can unpublish a published menu', function () {
        $this->menu->update(['is_published' => true]);

        $this->post("/seeo/staff/production/panel/menu/{$this->menu->id}/publish");

        $this->assertDatabaseHas('foods_menu', [
            'id'           => $this->menu->id,
            'is_published' => 0,
        ]);
    });
});

// ============================================================
// SUPER ADMIN ACCESS (ROLE 99)
// ============================================================

describe('Super Admin Access', function () {
    beforeEach(function () {
        $this->admin = makeUser(99);
        $this->stand = makeStand();
        $this->menu  = makeMenu($this->stand, ['stock' => 5]);
        $this->actingAs($this->admin);
    });

    test('super admin can create menu via sales panel', function () {
        $this->post('/seeo/staff/sales-distribution/menu', menuPayload($this->stand, [
            'name'     => 'Menu Admin',
            'category' => 'Special',
            'price'    => 50000,
        ]))->assertRedirect()->assertSessionHas('notif.type', 'info');
    });

    test('super admin can update stock via production panel', function () {
        $this->post("/seeo/staff/production/panel/menu/{$this->menu->id}/stock", [
            'amount' => 10,
        ])->assertRedirect();

        $this->assertDatabaseHas('foods_menu', ['id' => $this->menu->id, 'stock' => 15]);
    });

    test('super admin can publish via production panel', function () {
        $this->post("/seeo/staff/production/panel/menu/{$this->menu->id}/publish")
            ->assertRedirect();
        $this->assertDatabaseHas('foods_menu', ['id' => $this->menu->id, 'is_published' => 1]);
    });

    test('super admin can publish via sales distribution panel', function () {
        $this->post("/seeo/staff/sales-distribution/menu/{$this->menu->id}/publish")
            ->assertRedirect();
        $this->assertDatabaseHas('foods_menu', ['id' => $this->menu->id, 'is_published' => 1]);
    });
});
