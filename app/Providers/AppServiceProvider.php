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

        // Register the Google Drive filesystem with production-safe TLS defaults.
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
                \Illuminate\Support\Facades\Log::error('Google Drive Refresh Token Error: ' . $e->getMessage());
            }

            if (isset($config['accessToken'])) {
                $client->setAccessToken($config['accessToken']);
            }

            try {
                $service = new \Google\Service\Drive($client);
                
                $folder = $config['folder'] ?? '/';
                // Detect if the folder option is a Google Drive Folder ID (e.g. 14vpzj0A2vTkiKiDW0PjX_Sx2NbTYXogI)
                // Google Drive Folder IDs are alphanumeric, may contain dashes or underscores, and are usually 28-33 chars long.
                if ($folder !== '/' && preg_match('/^[a-zA-Z0-9-_]{25,45}$/', $folder)) {
                    $options['sharedFolderId'] = $folder;
                    $folder = null;
                }

                $adapter = new \Masbug\Flysystem\GoogleDriveAdapter($service, $folder, $options);
                $driver = new \League\Flysystem\Filesystem($adapter);

                return new \Illuminate\Filesystem\FilesystemAdapter($driver, $adapter);
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::error('Google Drive Adapter Initialization Failed: ' . $e->getMessage());

                if ($app->environment('production')) {
                    throw $e;
                }

                // Keep local development usable when Google credentials are absent.
                return \Illuminate\Support\Facades\Storage::disk('public');
            }
        });

        // Force HTTPS in production
        if ($this->app->environment('production')) {
            \URL::forceScheme('https');
        }

        // Share helpers & auth flags with all views (Blade)
        view()->share('image_url', fn($path) => image_url($path));
        view()->composer('*', function ($view) {
            $user = \Illuminate\Support\Facades\Auth::user();
            $view->with('is_super_admin', is_super_admin($user));
        });
    }
}
