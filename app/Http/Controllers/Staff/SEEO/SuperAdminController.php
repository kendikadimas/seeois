<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class SuperAdminController extends Controller
{
    /**
     * Super Admin Panel - Restricted to roles_id = 99
     */
    public function index()
    {
        return Inertia::render('Staff/SEEO/SuperAdminPanel', [
            'notif' => session('notif'),
            'env' => [
                'has_google_client' => !empty(config('filesystems.disks.google.clientId')),
                'has_google_secret' => !empty(config('filesystems.disks.google.clientSecret')),
                'has_refresh_token' => !empty(config('filesystems.disks.google.refreshToken')),
                'app_url'           => config('app.url'),
                'callback_uri'      => url('/google-drive/callback'),
            ]
        ]);
    }
}
