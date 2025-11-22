<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class StaffAuthorizationCheck
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        if (!$user) {
            return redirect()->route('login')->with('notif', ['type' => 'warning', 'message' => 'Please login']);
        }

        // Super Admin bypass: selalu dianggap staff
        if (is_super_admin($user)) {
            return $next($request);
        }

        if ($user->roles_id == null) {
            return redirect()->route('login')->with('notif', ['type' => 'warning', 'message' => 'Only SEEO Staff are allowed.']);
        }
        return $next($request);
    }
}
