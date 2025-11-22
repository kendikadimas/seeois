<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class PromoteSuperAdmin extends Command
{
    protected $signature = 'user:promote-super-admin {user_id : The ID of the user to promote}';
    protected $description = 'Promote a user to Super Admin (role id 99) with full access bypass.';

    public function handle(): int
    {
        $userId = (int)$this->argument('user_id');
        $user = User::find($userId);
        if (!$user) {
            $this->error('User not found');
            return Command::FAILURE;
        }
        $user->roles_id = 99; // SUPER ADMIN ID
        $user->save();
        $this->info('User '.$user->name.' (ID '.$user->id.') promoted to Super Admin (roles_id=99).');
        return Command::SUCCESS;
    }
}
