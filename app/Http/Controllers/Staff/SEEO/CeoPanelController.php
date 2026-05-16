<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Models\GovernanceYear;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CeoPanelController extends Controller
{
    /** CEO Management Panel – year governance + staff promotion */
    public function index()
    {
        $governanceYears = GovernanceYear::with('activatedBy')
            ->orderByDesc('year')
            ->get();

        $activeYear = GovernanceYear::current();

        // Users with roles (staff)
        $staff = User::whereNotNull('roles_id')
            ->with('roles')
            ->orderBy('name')
            ->when($activeYear, fn($q) => $q->where(function ($q2) use ($activeYear) {
                $q2->where('year_id', $activeYear->id)->orWhereNull('year_id');
            }))
            ->get();

        // Users without roles (not yet staff / customers)
        $nonStaff = User::whereNull('roles_id')
            ->orderBy('name')
            ->get();

        $roles = Role::orderBy('id')->get();

        return Inertia::render('Staff/SEEO/CeoPanel', [
            'governanceYears' => $governanceYears,
            'activeYear'      => $activeYear,
            'staff'           => $staff,
            'nonStaff'        => $nonStaff,
            'roles'           => $roles,
            'notif'           => session('notif'),
            'errors'          => session('errors')
                ? session('errors')->getBag('default')->getMessages()
                : [],
        ]);
    }

    // ──────────────────────────────────────────────────────────
    // YEAR MANAGEMENT
    // ──────────────────────────────────────────────────────────

    /** Create a new governance year */
    public function storeYear(Request $request)
    {
        $data = $request->validate([
            'year'  => ['required', 'integer', 'min:2000', 'max:2099', 'unique:governance_years,year'],
            'label' => ['nullable', 'string', 'max:100'],
        ]);

        GovernanceYear::create($data);

        return back()->with('notif', [
            'type'    => 'info',
            'message' => "Tahun kepengurusan {$data['year']} berhasil ditambahkan.",
        ]);
    }

    /** Activate a governance year (deactivates all others) */
    public function activateYear(GovernanceYear $governanceYear)
    {
        // Deactivate all
        GovernanceYear::query()->update(['is_active' => false]);

        // Activate chosen year
        $governanceYear->update([
            'is_active'    => true,
            'activated_by' => Auth::id(),
            'activated_at' => now(),
        ]);

        // Sync session year
        session(['selected_year' => $governanceYear->year]);

        return back()->with('notif', [
            'type'    => 'info',
            'message' => "Kepengurusan tahun {$governanceYear->year} sekarang aktif.",
        ]);
    }

    /**
     * Toggle a governance year ON or OFF.
     * - Turning ON: deactivates all others, activates this one, syncs session.
     *   Also auto-archives any unassigned (NULL year_id) records into the previously active year.
     * - Turning OFF: simply deactivates this year.
     */
    public function toggleYear(GovernanceYear $governanceYear)
    {
        if ($governanceYear->is_active) {
            // Turn OFF — just deactivate this year
            $governanceYear->update(['is_active' => false]);
            session()->forget('selected_year');

            return back()->with('notif', [
                'type'    => 'info',
                'message' => "Kepengurusan tahun {$governanceYear->year} dinonaktifkan.",
            ]);
        }

        // Turn ON — get the current active year before switching
        $previousYear = GovernanceYear::current();

        // Auto-archive: assign all records with NULL year_id to the previous year
        if ($previousYear) {
            $tables = ['stand', 'program', 'department', 'users', 'cash_in_item', 'contribution', 'contribution_configuration'];
            foreach ($tables as $table) {
                DB::table($table)
                    ->whereNull('year_id')
                    ->update(['year_id' => $previousYear->id]);
            }
        }

        // Deactivate all years, then activate the chosen one
        GovernanceYear::query()->update(['is_active' => false]);

        $governanceYear->update([
            'is_active'    => true,
            'activated_by' => Auth::id(),
            'activated_at' => now(),
        ]);

        session(['selected_year' => $governanceYear->year]);

        return back()->with('notif', [
            'type'    => 'info',
            'message' => "Kepengurusan tahun {$governanceYear->year} sekarang aktif.",
        ]);
    }

    // ──────────────────────────────────────────────────────────
    // STAFF MANAGEMENT
    // ──────────────────────────────────────────────────────────

    /** Promote a non-staff user to staff (assign default role 4 = Staff) */
    public function promoteUser(Request $request, User $user)
    {
        if ($user->roles_id) {
            return back()->with('notif', [
                'type'    => 'warning',
                'message' => "{$user->name} sudah menjadi staff.",
            ]);
        }

        $activeYear = GovernanceYear::current();

        $user->roles_id = 4; // default: Staff
        $user->year_id  = $activeYear?->id;
        $user->save();

        return back()->with('notif', [
            'type'    => 'info',
            'message' => "{$user->name} berhasil dijadikan Staff" . ($activeYear ? " kepengurusan {$activeYear->year}." : '.'),
        ]);
    }

    /** Assign / change role for an existing staff member */
    public function assignRole(Request $request, User $user)
    {
        $data = $request->validate([
            'roles_id' => ['required', 'integer', 'exists:roles,id'],
        ]);

        // CEO cannot change their own role
        if (Auth::id() === $user->id) {
            return back()->with('notif', [
                'type'    => 'warning',
                'message' => 'Anda tidak dapat mengubah role Anda sendiri.',
            ]);
        }

        $old = $user->roles_id;
        $user->roles_id = $data['roles_id'];
        $user->save();

        return back()->with('notif', [
            'type'    => 'info',
            'message' => "Role {$user->name} berhasil diubah dari role #{$old} ke role #{$user->roles_id}.",
        ]);
    }

    /** Remove a staff member (demote back to non-staff/customer) */
    public function demoteUser(User $user)
    {
        if (Auth::id() === $user->id) {
            return back()->with('notif', [
                'type'    => 'warning',
                'message' => 'Anda tidak dapat menghapus diri sendiri dari staff.',
            ]);
        }

        $name = $user->name;
        $user->roles_id      = null;
        $user->department_id = null;
        $user->year_id       = null;
        $user->save();

        return back()->with('notif', [
            'type'    => 'info',
            'message' => "{$name} telah dikeluarkan dari daftar staff.",
        ]);
    }
}
