<?php

namespace App\Http\Middleware;

use App\Models\Role;
use Closure;
use Illuminate\Http\Request;

class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request)
     */
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @param string ...$requiredRoleIds Role ids from middleware (e.g. role:3,99 → '3', '99')
     */
    public function handle(Request $request, Closure $next, string ...$requiredRoleIds)
    {
        $user = $request->user();
        if (!$user) {
            return redirect()->route('login')->with('notif', ['type' => 'warning', 'message' => 'Please login']);
        }

        $SUPER_ADMIN_ID = 99; // global super admin bypass id

        if ($user->roles_id == $SUPER_ADMIN_ID) {
            return $next($request); // bypass all specific role checks
        }

        $requiredRoleIds = collect($requiredRoleIds)
            ->flatMap(fn ($id) => explode(',', (string) $id))
            ->map(fn ($id) => trim($id))
            ->filter(fn ($id) => $id !== '')
            ->map(fn ($id) => (int) $id)
            ->values();

        if ($requiredRoleIds->isEmpty()) {
            return redirect()->back()->with('notif', [
                'type' => 'danger',
                'message' => 'You are not allowed. Missing required role configuration.'
            ]);
        }

        if (!$requiredRoleIds->contains((int) $user->roles_id)) {
            $targetNames = Role::whereIn('id', $requiredRoleIds->all())->pluck('name')->filter()->values();
            $targetName = $targetNames->isNotEmpty() ? $targetNames->implode(' / ') : 'required role';

            return redirect()->back()->with('notif', [
                'type' => 'danger',
                'message' => 'You are not allowed. Please contact ' . $targetName . ' to access this feature.'
            ]);
        }

        return $next($request);
    }
}
