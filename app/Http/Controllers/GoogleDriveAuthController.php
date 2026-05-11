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
        $this->client->setClientId(env('GOOGLE_DRIVE_CLIENT_ID'));
        $this->client->setClientSecret(env('GOOGLE_DRIVE_CLIENT_SECRET'));
        
        // Callback URL (Pastikan URL ini didaftarkan di Google Cloud Console)
        $this->client->setRedirectUri(url('/google-drive/callback'));
        
        // Disable SSL verification for Laragon local
        $this->client->setHttpClient(new \GuzzleHttp\Client(['verify' => false]));
        
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
                
                \Log::warning('Google Drive Auth: Refresh token tidak didapatkan.', ['token_response' => $token]);
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
            
            // Hapus whitespace berlebih
            $value = trim($value);
            
            // Cek apakah key sudah ada di .env
            if (preg_match("/^{$key}=/m", $contents)) {
                $newContents = preg_replace(
                    "/^{$key}=.*/m",
                    "{$key}=" . (preg_match('/\s/', $value) ? "\"{$value}\"" : $value),
                    $contents
                );
            } else {
                // Jika belum ada, tambahkan di baris baru
                $newContents = $contents . "\n{$key}=" . (preg_match('/\s/', $value) ? "\"{$value}\"" : $value);
            }
            
            File::put($path, $newContents);
        }
    }
}
