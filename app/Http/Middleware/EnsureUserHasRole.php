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
    public function handle(Request $request, Closure $next, string $role)
    {
        if ($request->user()->roles->id != $role) {
            return redirect()->back()->with('notif', ['type' => 'danger', 'message' => 'You are not allowed. Please contact ' . Role::find($role)->name . ' to access this feature.']);
        }

        return $next($request);
    }
}
