<?php

/**
 * Matrix test: setiap route terproteksi role harus:
 * - redirect ke login jika guest
 * - 200 untuk role yang diizinkan (+ super admin 99)
 * - redirect untuk role yang tidak diizinkan
 *
 * Jalankan: php artisan test tests/Feature/RoleBasedAccessMatrixTest.php
 */

use App\Models\SeminarEvent;
use App\Models\User;

/**
 * @return array<int, array{path: string, allowed: int[], denied: int[]}>
 */
function roleProtectedGetRoutes(): array
{
  return [
    [
      'label'   => 'Operating Panel',
      'path'    => STAFF_PREFIX . '/operating/panel',
      'allowed' => [3],
      'denied'  => [2, 10, 11, 12, 9],
    ],
    [
      'label'   => 'Sales Distribution',
      'path'    => STAFF_PREFIX . '/sales-distribution',
      'allowed' => [10],
      'denied'  => [3, 11, 12, 2],
    ],
    [
      'label'   => 'Production Panel',
      'path'    => STAFF_PREFIX . '/production/panel',
      'allowed' => [11],
      'denied'  => [3, 10, 12, 2],
    ],
    [
      'label'   => 'Seminar Registrations',
      'path'    => STAFF_PREFIX . '/seminar/registrations',
      'allowed' => [12],
      'denied'  => [3, 10, 11, 2],
    ],
    [
      'label'   => 'Finance Pending Docs',
      'path'    => STAFF_PREFIX . '/finance/pending-docs',
      'allowed' => [2],
      'denied'  => [3, 10, 6, 9],
    ],
    [
      'label'   => 'HR Birthdays',
      'path'    => STAFF_PREFIX . '/hr/birthdays',
      'allowed' => [6],
      'denied'  => [2, 10, 13, 9],
    ],
    [
      'label'   => 'IWP Receipts',
      'path'    => STAFF_PREFIX . '/iwp/receipts',
      'allowed' => [13],
      'denied'  => [2, 6, 9, 10],
    ],
    [
      'label'   => 'Marketing CMS',
      'path'    => STAFF_PREFIX . '/marketing/cms',
      'allowed' => [9],
      'denied'  => [2, 6, 13, 3],
    ],
    [
      'label'   => 'Marketing Structures',
      'path'    => STAFF_PREFIX . '/marketing/structures',
      'allowed' => [9],
      'denied'  => [2, 6, 13],
    ],
    [
      'label'   => 'Marketing Activities',
      'path'    => STAFF_PREFIX . '/marketing/activities',
      'allowed' => [9],
      'denied'  => [2, 6],
    ],
    [
      'label'   => 'Marketing Compro',
      'path'    => STAFF_PREFIX . '/marketing/compro',
      'allowed' => [9],
      'denied'  => [2, 13],
    ],
    [
      'label'   => 'CEO Panel',
      'path'    => STAFF_PREFIX . '/ceo/panel',
      'allowed' => [1],
      'denied'  => [2, 3, 10],
    ],
    [
      'label'   => 'Super Admin Panel',
      'path'    => STAFF_PREFIX . '/super-admin',
      'allowed' => [99],
      'denied'  => [1, 2, 3],
    ],
    [
      'label'   => 'Pinned Docs',
      'path'    => STAFF_PREFIX . '/pinned-docs',
      'allowed' => [1, 8],
      'denied'  => [2, 3, 9],
    ],
    [
      'label'   => 'Internship Applications',
      'path'    => STAFF_PREFIX . '/internship',
      'allowed' => [1, 5, 6],
      'denied'  => [4, 10, 12],
    ],
  ];
}

describe('Role access matrix (GET routes)', function () {
  foreach (roleProtectedGetRoutes() as $route) {
    $path = $route['path'];
    $label = $route['label'];

    test("guest cannot access {$label}", function () use ($path) {
      $this->get($path)->assertRedirect('/login');
    });

    foreach ($route['allowed'] as $roleId) {
      test("role {$roleId} CAN access {$label}", function () use ($path, $roleId) {
        $user = staffUser($roleId);
        $this->actingAs($user)->get($path)->assertOk();
      });
    }

    test("super admin (99) CAN access {$label}", function () use ($path) {
      $user = staffUser(99);
      $this->actingAs($user)->get($path)->assertOk();
    });

    foreach ($route['denied'] as $roleId) {
      test("role {$roleId} CANNOT access {$label}", function () use ($path, $roleId) {
        $user = staffUser($roleId);
        $response = $this->actingAs($user)->get($path);

        if ($response->status() === 403) {
          $response->assertForbidden();
        } else {
          $response->assertRedirect();
        }
      });
    }
  }
});

describe('Middleware multi-role fix (role:1,8)', function () {
  test('role 8 (Management Document) can access pinned-docs', function () {
    $user = staffUser(8);
    $this->actingAs($user)->get(STAFF_PREFIX . '/pinned-docs')->assertOk();
  });

  test('role 8 can POST year switch like role 1', function () {
    $user = staffUser(8);
    $this->actingAs($user)
      ->post(STAFF_PREFIX . '/year', ['year' => (int) date('Y')])
      ->assertRedirect();
  });
});

describe('Staff area — general access', function () {
  test('any staff with roles_id can access dashboard', function () {
    foreach ([1, 2, 3, 4, 10] as $roleId) {
      $user = staffUser($roleId);
      $this->actingAs($user)->get(STAFF_PREFIX . '/dashboard')->assertOk();
    }
  });

  test('user without role is forbidden from staff dashboard', function () {
    $user = User::factory()->create([
      'roles_id'          => null,
      'email_verified_at' => now(),
    ]);
    $this->actingAs($user)->get(STAFF_PREFIX . '/dashboard')->assertForbidden();
  });

  test('guest redirected from staff dashboard', function () {
    $this->get(STAFF_PREFIX . '/dashboard')->assertRedirect('/login');
  });
});

describe('Role-restricted POST actions', function () {
  test('role 2 can POST cash-in item', function () {
    $user = staffUser(2);
    $this->actingAs($user)
      ->post(STAFF_PREFIX . '/cash_in_item/item/add', [
        'name'  => 'Test Cash In ' . uniqid(),
        'price' => 1000000,
      ])
      ->assertRedirect();
  });

  test('role 10 cannot POST cash-in item', function () {
    $user = staffUser(10);
    $this->actingAs($user)
      ->post(STAFF_PREFIX . '/cash_in_item/item/add', [
        'name'  => 'Blocked',
        'price' => 1,
      ])
      ->assertRedirect();
  });

  test('role 1 cannot POST budget validate (role 2 only)', function () {
    $user = staffUser(1);
    $this->actingAs($user)
      ->post(STAFF_PREFIX . '/program/budget/validate/1/1')
      ->assertRedirect();
  });

  test('role 2 gets redirect when validating missing program budget', function () {
    $user = staffUser(2);
    $this->actingAs($user)
      ->post(STAFF_PREFIX . '/program/budget/validate/99999/1')
      ->assertRedirect()
      ->assertSessionHas('notif.type', 'warning');
  });

  test('role 3 can POST stand insert', function () {
    $user = staffUser(3);
    $this->actingAs($user)
      ->post(STAFF_PREFIX . '/food/stand/add/new', [
        'name' => 'Stand Test ' . uniqid(),
      ])
      ->assertRedirect();
  });

  test('role 10 cannot POST stand insert', function () {
    $user = staffUser(10);
    $this->actingAs($user)
      ->post(STAFF_PREFIX . '/food/stand/add/new', [
        'name' => 'Unauthorized Stand',
      ])
      ->assertRedirect();
  });
});

describe('Public seminar registration (slug-based)', function () {
  test('public can view active seminar form', function () {
    $event = SeminarEvent::create([
      'name'      => 'Seminar Test ' . uniqid(),
      'slug'      => 'seminar-test-' . uniqid(),
      'is_active' => true,
    ]);

    $this->get("/seminar/nasional/register/{$event->slug}")->assertOk();
  });

  test('public cannot view inactive seminar form', function () {
    $event = SeminarEvent::create([
      'name'      => 'Closed Seminar',
      'slug'      => 'closed-' . uniqid(),
      'is_active' => false,
    ]);

    $this->get("/seminar/nasional/register/{$event->slug}")->assertNotFound();
  });

  test('public can submit registration', function () {
    $event = SeminarEvent::create([
      'name'      => 'Seminar Submit',
      'slug'      => 'submit-' . uniqid(),
      'is_active' => true,
    ]);

    $response = $this->post("/seminar/nasional/register/{$event->slug}", [
      'full_name' => 'Peserta Test',
      'email'     => 'peserta@example.com',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('event_registrations', [
      'full_name' => 'Peserta Test',
      'event_id'  => $event->id,
    ]);
  });

  test('registration fails without full_name', function () {
    $event = SeminarEvent::create([
      'name'      => 'Seminar Validation',
      'slug'      => 'valid-' . uniqid(),
      'is_active' => true,
    ]);

    $this->post("/seminar/nasional/register/{$event->slug}", [])
      ->assertSessionHasErrors('full_name');
  });
});
