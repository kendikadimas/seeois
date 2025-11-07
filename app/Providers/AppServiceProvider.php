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
        Vite::prefetch(concurrency: 3);

        // Force HTTPS in production
        if ($this->app->environment('production')) {
            \URL::forceScheme('https');
        }

        // Register image_url helper function globally
        if (!function_exists('image_url')) {
            function image_url($path)
            {
                return app('ImageHelper')->url($path);
            }
        }

        // Share image_url helper with all views
        view()->share('image_url', function ($path) {
            return image_url($path);
        });
    }
}
