<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        return [
            ...parent::share($request),
            'selected_year' => fn() => (int) $request->session()->get('selected_year', now()->year),
            'available_years' => fn() => collect(range(now()->year, now()->year - 5))->values()->all(),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles_id' => $user->roles_id,
                    // Share resolved role_name for UI
                    // Prefer DB-driven role name to avoid hardcoded role IDs drifting over time.
                    'role_name' => (int) $user->roles_id === 99
                        ? 'Super Admin'
                        : ($user->roles?->name ?? 'Staff'),
                    'is_super_admin' => is_super_admin($user),
                ] : null,
            ],
            'is_super_admin' => $user ? is_super_admin($user) : false,
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'notif' => fn() => $request->session()->get('notif'),
            'flash' => [
                'notif' => session('notif'),
                'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
            ],
        ];
    }
}
