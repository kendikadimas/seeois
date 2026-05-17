<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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
                'has_google_client' => !empty(env('GOOGLE_DRIVE_CLIENT_ID')),
                'has_google_secret' => !empty(env('GOOGLE_DRIVE_CLIENT_SECRET')),
                'has_refresh_token' => !empty(env('GOOGLE_DRIVE_REFRESH_TOKEN')),
                'google_client_id'  => env('GOOGLE_DRIVE_CLIENT_ID'),
                'google_client_secret' => env('GOOGLE_DRIVE_CLIENT_SECRET'),
                'app_url'           => env('APP_URL'),
                'callback_uri'      => url('/google-drive/callback'),
            ]
        ]);
    }

    /**
     * Save Google Drive Config to .env
     */
    public function saveConfig(Request $request)
    {
        $data = $request->validate([
            'google_client_id'     => 'required|string',
            'google_client_secret' => 'required|string',
            'app_url'              => 'required|url',
        ]);

        $this->updateEnv('GOOGLE_DRIVE_CLIENT_ID', $data['google_client_id']);
        $this->updateEnv('GOOGLE_DRIVE_CLIENT_SECRET', $data['google_client_secret']);
        $this->updateEnv('APP_URL', $data['app_url']);

        // Update current process environment so the redirect works correctly
        putenv("GOOGLE_DRIVE_CLIENT_ID={$request->google_client_id}");
        putenv("GOOGLE_DRIVE_CLIENT_SECRET={$request->google_client_secret}");

        return redirect()->back()->with('notif', [
            'type'    => 'success',
            'message' => 'Configuration updated successfully! Your changes have been saved to the environment.',
            
        ]);
    }

    protected function updateEnv($key, $value)
    {
        $path = base_path('.env');
        if (\File::exists($path)) {
            $contents = \File::get($path);
            $value = trim($value);
            
            if (preg_match("/^{$key}=/m", $contents)) {
                $newContents = preg_replace(
                    "/^{$key}=.*/m",
                    "{$key}=" . (preg_match('/\s/', $value) ? "\"{$value}\"" : $value),
                    $contents
                );
            } else {
                $newContents = $contents . "\n{$key}=" . (preg_match('/\s/', $value) ? "\"{$value}\"" : $value);
            }
            
            \File::put($path, $newContents);
        }
    }
}
