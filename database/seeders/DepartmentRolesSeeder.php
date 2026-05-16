<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class DepartmentRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Safe / idempotent: only inserts missing roles; does not delete anything.
     *
     * Usage:
     *   php artisan db:seed --class=DepartmentRolesSeeder
     */
    public function run(): void
    {
        $roleNames = [
            // Existing core roles usually already present:
            // - Chief Executive Officer
            // - Financial Officer
            // - Operational Officer
            // - Staff
            // - HR Manager
            // - Interns

            // New department/panel roles requested:
            'Administration',
            'Marketing Medinfo',
            'Sales Distribution',
            'Production',
            'Public Relation',

            // Optional “PIC” roles (add now so they can be assigned later)
            'IWP PIC',
            'Logbook PIC',
            'Intern PIC',
        ];

        foreach ($roleNames as $name) {
            Role::firstOrCreate(['name' => $name]);
        }
    }
}
