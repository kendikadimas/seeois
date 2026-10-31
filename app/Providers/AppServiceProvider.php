<?php

namespace App\Providers;

use App\Helpers\ImageHelper;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton('ImageHelper', function () {
            return new ImageHelper();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (method_exists(Vite::class, 'prefetch')) {
            Vite::prefetch(concurrency: 3);
        }

        // Registrasi driver penyimpanan Google Drive dengan pengaman koneksi SSL
        \Illuminate\Support\Facades\Storage::extend('google', function ($app, $config) {
            $options = [];
            if (! empty($config['teamDriveId'] ?? null)) {
                $options['teamDriveId'] = $config['teamDriveId'];
            }

            $client = new \Google\Client;
            $client->setClientId($config['clientId']);
            $client->setClientSecret($config['clientSecret']);
            $client->setHttpClient(new \GuzzleHttp\Client([
                'verify' => filter_var($config['verifySsl'] ?? true, FILTER_VALIDATE_BOOL),
            ]));
            
            try {
                $client->refreshToken($config['refreshToken']);
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::error('Koneksi Refresh Token Google Drive gagal: ' . $e->getMessage());
            }

            if (isset($config['accessToken'])) {
                $client->setAccessToken($config['accessToken']);
            }

            try {
                $service = new \Google\Service\Drive($client);
                
                $folder = $config['folder'] ?? '/';
                // Deteksi apakah ID folder Google Drive valid
                if ($folder !== '/' && preg_match('/^[a-zA-Z0-9-_]{25,45}$/', $folder)) {
                    $options['sharedFolderId'] = $folder;
                    $folder = null;
                }

                $adapter = new \Masbug\Flysystem\GoogleDriveAdapter($service, $folder, $options);
                $driver = new \League\Flysystem\Filesystem($adapter);

                return new \Illuminate\Filesystem\FilesystemAdapter($driver, $adapter);
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::error('Inisialisasi Google Drive gagal: ' . $e->getMessage());

                // Jika token Google Drive expired / bermasalah, otomatis alihkan ke storage lokal agar website tidak error 500
                return \Illuminate\Support\Facades\Storage::disk('public');
            }
        });

        // Wajibkan HTTPS saat berjalan di server production
        if ($this->app->environment('production')) {
            \URL::forceScheme('https');
        }

        // Bagikan fungsi helper gambar dan hak akses ke semua tampilan Blade
        view()->share('image_url', fn($path) => image_url($path));
        view()->composer('*', function ($view) {
            $user = \Illuminate\Support\Facades\Auth::user();
            $view->with('is_super_admin', is_super_admin($user));
        });
    }
}
