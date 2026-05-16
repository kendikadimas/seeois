<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testUsers = [
            // Role 3 - Operating/Operational Officer → /seeo/operating/panel
            [
                'name'     => 'Operating Officer',
                'email'    => 'operating@test.com',
                'password' => Hash::make('password'),
                'roles_id' => 3,
            ],
            // Role 10 - Sales Distribution → /staff/sales-distribution
            [
                'name'     => 'Sales Distribution',
                'email'    => 'sales@test.com',
                'password' => Hash::make('password'),
                'roles_id' => 10,
            ],
            // Role 11 - Production Manager → /staff/production/panel
            [
                'name'     => 'Production Manager',
                'email'    => 'production@test.com',
                'password' => Hash::make('password'),
                'roles_id' => 11,
            ],
            // Role 12 - Public Relations → /seeo/seminar/registrations
            [
                'name'     => 'Public Relations',
                'email'    => 'relations@test.com',
                'password' => Hash::make('password'),
                'roles_id' => 12,
            ],
            // Role 1 - Chief Executive Officer → /ceo/panel + semua fitur
            [
                'name'     => 'Chief Executive Officer',
                'email'    => 'ceo@test.com',
                'password' => Hash::make('password'),
                'roles_id' => 1,
            ],

            [
                'name'     => 'Finance Officer',
                'email'    => 'finance@test.com',
                'password' => Hash::make('password'),
                'roles_id' => 2,
            ],
            // Role 6 - HR Manager → /seeo/hr/birthdays
            [
                'name'     => 'HR Manager',
                'email'    => 'hr@test.com',
                'password' => Hash::make('password'),
                'roles_id' => 6,
            ],
            // Role 9 - Marketing Medinfo → /marketing/structures, /marketing/activities, /marketing/compro
            [
                'name'     => 'Marketing Medinfo',
                'email'    => 'marketing@test.com',
                'password' => Hash::make('password'),
                'roles_id' => 9,
            ],
            // Role 13 - IWP Officer → /seeo/iwp/receipts (validasi contribution receipt)
            [
                'name'     => 'IWP Officer',
                'email'    => 'iwp@test.com',
                'password' => Hash::make('password'),
                'roles_id' => 13,
            ],
            // Role 99 - Super Admin → semua panel
            [
                'name'     => 'Super Admin',
                'email'    => 'admin@test.com',
                'password' => Hash::make('password'),
                'roles_id' => 99,
            ],
        ];

        foreach ($testUsers as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                array_merge($userData, ['email_verified_at' => now()])
            );
        }

        $this->command->info('✅ Test users created/updated successfully!');
        $this->command->table(
            ['Name', 'Email', 'Role', 'Panel URL'],
            [
                ['Operating Officer', 'operating@test.com',  'role:3',  '/seeo/operating/panel'],
                ['Sales Distribution','sales@test.com',      'role:10', '/staff/sales-distribution'],
                ['Production Manager','production@test.com', 'role:11', '/staff/production/panel'],
                ['Public Relations',  'relations@test.com',  'role:12', '/seeo/seminar/registrations'],
                ['Finance Officer',   'finance@test.com',    'role:2',  '/seeo/finance/pending-docs'],
                ['HR Manager',        'hr@test.com',         'role:6',  '/seeo/hr/birthdays'],
                ['Marketing Medinfo', 'marketing@test.com',  'role:9',  '/marketing/structures'],
                ['IWP Officer',       'iwp@test.com',        'role:13', '/seeo/iwp/receipts'],
                ['Super Admin',       'admin@test.com',      'role:99', 'Semua panel'],
            ]
        );
        $this->command->line('🔑 Password semua akun: <comment>password</comment>');
    }
}
