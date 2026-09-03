<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Google\Client;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class GoogleDriveAuthController extends Controller
{
    private $client;

    public function __construct()
    {
        $this->client = new Client();
        $this->client->setClientId(config('filesystems.disks.google.clientId'));
        $this->client->setClientSecret(config('filesystems.disks.google.clientSecret'));
        
        // Callback URL (Pastikan URL ini didaftarkan di Google Cloud Console)
        $this->client->setRedirectUri(url('/google-drive/callback'));
        
        $this->client->setHttpClient(new \GuzzleHttp\Client([
            'verify' => filter_var(config('filesystems.disks.google.verifySsl', true), FILTER_VALIDATE_BOOL),
        ]));
        
        // Scope untuk akses drive
        $this->client->addScope("https://www.googleapis.com/auth/drive");
        
        // Force approval prompt agar google selalu mengembalikan refresh_token
        $this->client->setAccessType('offline');
        $this->client->setPrompt('consent');
    }

    public function redirect()
    {
        $authUrl = $this->client->createAuthUrl();
        return redirect()->away($authUrl);
    }

    public function callback(Request $request)
    {
        if ($request->has('code')) {
            try {
                $token = $this->client->fetchAccessTokenWithAuthCode($request->get('code'));
                
                if (!isset($token['error']) && isset($token['refresh_token'])) {
                    $this->updateEnv('GOOGLE_DRIVE_REFRESH_TOKEN', $token['refresh_token']);
                    
                    // Bersihkan cache agar refresh token baru langsung dipakai
                    Artisan::call('config:clear');
                    Artisan::call('cache:clear');

                    return redirect('/')->with('success', 'Refresh Token Google Drive berhasil diperbarui!');
                }
                
                Log::warning('Google Drive Auth: Refresh token tidak didapatkan.', [
                    'has_error' => isset($token['error']),
                    'error' => $token['error'] ?? null,
                ]);
                return redirect('/')->with('error', 'Gagal update token. Pastikan Anda "Hapus Akses" aplikasi ini di Akun Google Anda terlebih dahulu jika sebelumnya sudah pernah menghubungkan akun.');

            } catch (\Exception $e) {
                \Log::error('Google Drive Auth Error: ' . $e->getMessage());
                return redirect('/')->with('error', 'Terjadi kesalahan sistem saat menghubungi Google.');
            }
        }

        return redirect('/')->with('error', 'Akses ditolak oleh Google.');
    }

    protected function updateEnv($key, $value)
    {
        $path = base_path('.env');
        if (File::exists($path)) {
            $contents = File::get($path);
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
            File::put($path, $newContents);
        }
    }
}
