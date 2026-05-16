<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestingUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = \App\Models\Role::all();

        foreach ($roles as $role) {
            $roleNameStr = preg_replace('/[^a-zA-Z0-9]/', '', strtolower($role->name));
            $email = $roleNameStr . '@test.com';
            
            \App\Models\User::firstOrCreate(
                ['email' => $email],
                [
                    'name' => 'Testing ' . $role->name,
                    'password' => \Illuminate\Support\Facades\Hash::make('password123'),
                    'roles_id' => $role->id,
                    'email_verified_at' => now(),
                    'phone' => '08000' . str_pad($role->id, 5, '0', STR_PAD_LEFT),
                ]
            );
        }
    }
}
