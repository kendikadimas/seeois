<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\GovernanceYear;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

/**
 * Bug reproduction tests.
 *
 * Bug 1: Tiap departemen ga bisa ngubah manager nya
 * Bug 2: Di ceo panel manajemen staff ga ada opsi co ceo
 */
class DepartmentManagerAndCeoPanelTest extends TestCase
{
    use RefreshDatabase;

    protected function setActiveYear(): GovernanceYear
    {
        return GovernanceYear::create([
            'year' => 2030,
            'is_active' => true,
        ]);
    }

    protected function makeCeo(array $attributes = []): User
    {
        return $this->makeStaff(array_merge(['roles_id' => 1], $attributes));
    }

    protected function makeStaff(array $attributes = []): User
    {
        return User::create(array_merge([
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('password'),
            'roles_id' => 4,
            'year_id' => $this->year->id,
        ], $attributes));
    }

    protected function setUp(): void
    {
        parent::setUp();
        $this->year = $this->setActiveYear();
    }

    protected function ensureCoCeoRole(): void
    {
        if (!Role::find(7)) {
            DB::table('roles')->insert(['id' => 7, 'name' => 'Co-CEO']);
        }
    }

    // ─────────────────────────────────────────────────────────
    // BUG 1: Department manager cannot be changed
    // ─────────────────────────────────────────────────────────

    public function test_ceo_can_change_department_manager(): void
    {
        $ceo = $this->makeCeo();
        $oldManager = $this->makeStaff();
        $newManager = $this->makeStaff();

        $department = Department::create([
            'name' => 'Test Dept',
            'manager_id' => $oldManager->id,
            'year_id' => $this->year->id,
        ]);
        $oldManager->update(['department_id' => $department->id]);

        $response = $this->actingAs($ceo)
            ->post("/seeo/staff/department/update/{$department->id}", [
                'name' => 'Test Dept',
                'manager_id' => $newManager->id,
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('notif.type', 'info');

        $department->refresh();
        $this->assertEquals($newManager->id, $department->manager_id, 'Department manager_id should be updated');
        $this->assertEquals($department->id, $newManager->fresh()->department_id, 'New manager should belong to the department');
        $this->assertNull($oldManager->fresh()->department_id, 'Old manager should be detached');
    }

    public function test_update_survives_when_old_manager_record_missing(): void
    {
        $ceo = $this->makeCeo();
        $newManager = $this->makeStaff();

        $department = Department::create([
            'name' => 'Orphan Dept',
            'manager_id' => 999999, // stale manager id (user does not exist)
            'year_id' => $this->year->id,
        ]);

        $response = $this->actingAs($ceo)
            ->post("/seeo/staff/department/update/{$department->id}", [
                'name' => 'Orphan Dept',
                'manager_id' => $newManager->id,
            ]);

        $response->assertRedirect(); // Before fix: 500 "Attempt to assign property on null"
        $department->refresh();
        $this->assertEquals($newManager->id, $department->manager_id);
    }

    public function test_update_with_integer_vs_string_manager_id(): void
    {
        $ceo = $this->makeCeo();
        $oldManager = $this->makeStaff();
        $newManager = $this->makeStaff();

        $department = Department::create([
            'name' => 'Type Dept',
            'manager_id' => (string) $oldManager->id,
            'year_id' => $this->year->id,
        ]);

        $response = $this->actingAs($ceo)
            ->post("/seeo/staff/department/update/{$department->id}", [
                'name' => 'Type Dept',
                'manager_id' => (string) $newManager->id,
            ]);

        $response->assertRedirect();
        $department->refresh();
        $this->assertEquals($newManager->id, (int) $department->manager_id);
        $this->assertNull($oldManager->fresh()->department_id);
    }

    // ─────────────────────────────────────────────────────────
    // BUG 2: No Co-CEO option in CEO panel staff management
    // ─────────────────────────────────────────────────────────

    public function test_ceo_panel_shows_co_ceo_role_option(): void
    {
        $this->ensureCoCeoRole();
        $ceo = $this->makeCeo();

        $response = $this->actingAs($ceo)->get('/seeo/staff/ceo/panel');

        $response->assertOk();
        $page = $response->inertiaPage();
        $roles = collect($page['props']['roles'] ?? []);
        $this->assertTrue(
            $roles->contains(fn ($r) => str_contains($r['name'] ?? '', 'Co-CEO')),
            'Co-CEO role must be available in CEO panel role options'
        );
    }

    public function test_ceo_can_assign_co_ceo_role(): void
    {
        $this->ensureCoCeoRole();
        $ceo = $this->makeCeo();
        $staff = $this->makeStaff();

        $response = $this->actingAs($ceo)
            ->post("/seeo/staff/ceo/user/{$staff->id}/role", ['roles_id' => 7]);

        $response->assertRedirect();
        $this->assertEquals(7, $staff->fresh()->roles_id, 'Staff should be assigned Co-CEO role (id 7)');
        $this->assertTrue($staff->fresh()->isCoCeo(), 'User with role 7 must be recognized as Co-CEO');
    }

    public function test_ceo_can_recruit_nonstaff_directly_as_co_ceo(): void
    {
        $this->ensureCoCeoRole();
        $ceo = $this->makeCeo();
        $candidate = User::create([
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('password'),
            'roles_id' => null,
            'year_id' => null,
        ]);

        $response = $this->actingAs($ceo)
            ->post("/seeo/staff/ceo/user/{$candidate->id}/promote", ['roles_id' => 7]);

        $response->assertRedirect();
        $this->assertEquals(7, $candidate->fresh()->roles_id, 'Candidate should be recruited directly as Co-CEO');
        $this->assertEquals($this->year->id, $candidate->fresh()->year_id);
    }

    public function test_recruit_defaults_to_staff_role_without_roles_id(): void
    {
        $this->ensureCoCeoRole();
        $ceo = $this->makeCeo();
        $candidate = User::create([
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('password'),
            'roles_id' => null,
            'year_id' => null,
        ]);

        $response = $this->actingAs($ceo)
            ->post("/seeo/staff/ceo/user/{$candidate->id}/promote", []);

        $response->assertRedirect();
        $this->assertEquals(4, $candidate->fresh()->roles_id, 'Default recruit role should be Staff (id 4)');
    }
}

