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
     * @param string $requiredRoleId Role id passed from middleware definition (e.g. role:3)
     */
    public function handle(Request $request, Closure $next, string $requiredRoleId)
    {
        $user = $request->user();
        if (!$user) {
            return redirect()->route('login')->with('notif', ['type' => 'warning', 'message' => 'Please login']);
        }

        $SUPER_ADMIN_ID = 99; // global super admin bypass id

        if ($user->roles_id == $SUPER_ADMIN_ID) {
            return $next($request); // bypass all specific role checks
        }

        if ((int)$user->roles_id !== (int)$requiredRoleId) {
            $targetRole = Role::find($requiredRoleId);
            $targetName = $targetRole?->name ?? 'required role';
            return redirect()->back()->with('notif', [
                'type' => 'danger',
                'message' => 'You are not allowed. Please contact ' . $targetName . ' to access this feature.'
            ]);
        }

        return $next($request);
    }
}
