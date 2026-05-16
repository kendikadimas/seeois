<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class CoreRoleSeeder extends Seeder
{
    /**
     * Seed the core roles with specific IDs to match middleware/logic requirements.
     */
    public function run(): void
    {
        $roles = [
            1  => 'Chief Executive Officer',
            2  => 'Financial Officer',
            3  => 'Operational Officer',
            4  => 'Staff',
            5  => 'Interns',
            6  => 'HR Manager',
            8  => 'Management Document',
            9  => 'Marketing Medinfo',
            10 => 'Sales Distribution',
            11 => 'Production',
            12 => 'Public Relation',
            13 => 'IWP PIC',
            99 => 'Super Admin',
        ];

        foreach ($roles as $id => $name) {
            Role::updateOrCreate(
                ['id' => $id],
                ['name' => $name]
            );
        }
    }
}
