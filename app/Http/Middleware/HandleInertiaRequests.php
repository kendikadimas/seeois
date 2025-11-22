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
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles_id' => $user->roles_id,
                    // Share resolved role_name for UI (avoids needing roles relationship everywhere)
                    'role_name' => match ((int)$user->roles_id) {
                        99 => 'Super Admin',
                        1 => 'CEO',
                        2 => 'Finance',
                        3 => 'Operational',
                        6 => 'HR Manager',
                        default => 'Staff',
                    },
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
