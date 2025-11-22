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

        // Share helpers & auth flags with all views (Blade)
        view()->share('image_url', fn($path) => image_url($path));
        view()->composer('*', function ($view) {
            $user = \Illuminate\Support\Facades\Auth::user();
            $view->with('is_super_admin', is_super_admin($user));
        });
    }
}
