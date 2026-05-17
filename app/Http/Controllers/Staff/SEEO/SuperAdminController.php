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
                'has_google_client' => !empty(config('filesystems.disks.google.clientId')),
                'has_google_secret' => !empty(config('filesystems.disks.google.clientSecret')),
                'has_refresh_token' => !empty(config('filesystems.disks.google.refreshToken')),
                'google_client_id'  => config('filesystems.disks.google.clientId'),
                'google_client_secret' => config('filesystems.disks.google.clientSecret'),
                'google_drive_folder'  => config('filesystems.disks.google.folder'),
                'app_url'           => config('app.url'),
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
            'google_drive_folder'  => 'required|string',
            'app_url'              => 'required|url',
        ]);

        $this->updateEnv('GOOGLE_DRIVE_CLIENT_ID', $data['google_client_id']);
        $this->updateEnv('GOOGLE_DRIVE_CLIENT_SECRET', $data['google_client_secret']);
        $this->updateEnv('GOOGLE_DRIVE_FOLDER', $data['google_drive_folder']);
        $this->updateEnv('APP_URL', $data['app_url']);

        // Clear config cache programmatically so new env values are loaded immediately
        try {
            \Illuminate\Support\Facades\Artisan::call('config:clear');
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Artisan config:clear failed: ' . $e->getMessage());
        }

        // Update current process environment so the redirect works correctly
        putenv("GOOGLE_DRIVE_CLIENT_ID={$request->google_client_id}");
        putenv("GOOGLE_DRIVE_CLIENT_SECRET={$request->google_client_secret}");
        putenv("GOOGLE_DRIVE_FOLDER={$request->google_drive_folder}");

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
            
            // Format value: quote it if it contains spaces or special characters
            $formattedValue = (preg_match('/\s/', $value) || preg_match('/[\'"#]/', $value)) 
                ? '"' . str_replace('"', '\\"', $value) . '"' 
                : $value;

            // Split file into lines (handling both Unix and Windows line endings)
            $lines = explode("\n", str_replace("\r", "", $contents));
            $keyExists = false;

            foreach ($lines as $i => $line) {
                // Check if the line starts with KEY= (ignoring leading spaces)
                if (strpos(trim($line), $key . '=') === 0) {
                    $lines[$i] = $key . '=' . $formattedValue;
                    $keyExists = true;
                    break;
                }
            }

            if (!$keyExists) {
                $lines[] = $key . '=' . $formattedValue;
            }

            $newContents = implode("\n", $lines);
            \File::put($path, $newContents);
        }
    }
}
