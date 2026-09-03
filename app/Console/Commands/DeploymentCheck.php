<?php

namespace App\Console\Commands;

use App\Models\Role;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;

class DeploymentCheck extends Command
{
    protected $signature = 'app:deployment-check';

    protected $description = 'Validate production configuration without printing secrets';

    public function handle(): int
    {
        $checks = [
            ['APP_ENV is production', app()->environment('production')],
            ['APP_DEBUG is disabled', config('app.debug') === false],
            ['APP_URL uses HTTPS', str_starts_with((string) config('app.url'), 'https://')],
            ['APP_KEY is configured', filled(config('app.key'))],
            ['Database is not SQLite', config('database.default') !== 'sqlite'],
            ['Mail is not using log driver', ! in_array(config('mail.default'), ['log', 'array'], true)],
            ['Google login client ID is configured', filled(config('services.google.client_id'))],
            ['Google login client secret is configured', filled(config('services.google.client_secret'))],
            ['Google Drive client ID is configured', filled(config('filesystems.disks.google.clientId'))],
            ['Google Drive client secret is configured', filled(config('filesystems.disks.google.clientSecret'))],
            ['Google Drive refresh token is configured', filled(config('filesystems.disks.google.refreshToken'))],
            ['Google Drive folder is configured', filled(config('filesystems.disks.google.folder'))],
            ['Google HTTP TLS verification is enabled', filter_var(config('filesystems.disks.google.verifySsl'), FILTER_VALIDATE_BOOL)],
            ['Queue is not synchronous', config('queue.default') !== 'sync'],
            ['Frontend manifest exists', is_file(public_path('build/manifest.json'))],
            ['Storage link/directory is available', is_dir(public_path('storage')) || app()->environment('production')],
            ['Audit log table exists', Schema::hasTable('audit_logs')],
            ['Stock ledger table exists', Schema::hasTable('menu_stock_movements')],
        ];

        $requiredRoles = array_map('intval', array_keys(config('permissions.roles', [])));
        $checks[] = ['All configured roles exist', Role::whereIn('id', $requiredRoles)->count() === count($requiredRoles)];

        Artisan::call('migrate:status');
        $checks[] = ['Database migrations are inspectable', Artisan::output() !== ''];

        $failed = false;
        foreach ($checks as [$label, $passed]) {
            $passed ? $this->components->info($label) : $this->components->error($label);
            $failed = $failed || ! $passed;
        }

        if ($failed) {
            $this->newLine();
            $this->error('Deployment check failed. Correct the production .env and run config:clear before retrying.');

            return self::FAILURE;
        }

        $this->newLine();
        $this->info('Production configuration is ready.');

        return self::SUCCESS;
    }
}
