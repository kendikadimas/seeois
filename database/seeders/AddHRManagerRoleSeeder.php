<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AddHRManagerRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Purpose: Add HR Manager role (role_id = 5) to users table
     * This is a safe seeder that can be run in production without migrations
     * 
     * Usage: php artisan db:seed --class=AddHRManagerRoleSeeder
     */
    public function run(): void
    {
        echo "\n========== ADDING HR MANAGER ROLE ==========\n";

        // Option 1: Update existing user to HR Manager role
        // This is the SAFE approach - assign existing user to role 5

        echo "\n1️⃣ CURRENT USERS:\n";
        $users = DB::table('users')->whereIn('roles_id', [4, 5, 6])->get();
        
        if ($users->isEmpty()) {
            echo "   No users found with roles 4, 5, or 6\n";
        } else {
            foreach ($users as $user) {
                $roleName = match($user->roles_id) {
                    4 => 'Co-CEO',
                    5 => 'HR Manager',
                    6 => 'PIC Internship',
                    default => 'Unknown'
                };
                echo "   - ID: {$user->id}, Name: {$user->name}, Role: {$user->roles_id} ({$roleName})\n";
            }
        }

        // Check if role 5 already assigned to someone
        echo "\n2️⃣ CHECKING EXISTING HR MANAGERS (role_id = 5):\n";
        $existingHRManager = DB::table('users')->where('roles_id', 5)->first();
        
        if ($existingHRManager) {
            echo "   ✅ HR Manager already exists!\n";
            echo "   Name: {$existingHRManager->name} (ID: {$existingHRManager->id})\n";
            echo "   No changes needed.\n";
            return;
        }

        echo "   ❌ No HR Manager found. Ready to add.\n";

        // Option A: Convert existing user to HR Manager
        echo "\n3️⃣ AVAILABLE OPTIONS:\n";
        echo "   Option A: Assign existing user to HR Manager role (RECOMMENDED)\n";
        echo "   Option B: Create new HR Manager user\n";

        // Show candidates for HR Manager role
        echo "\n4️⃣ SUGGESTED CANDIDATES FOR HR MANAGER:\n";
        $candidates = DB::table('users')
            ->where('roles_id', '!=', 7)  // Not interns
            ->where('roles_id', '!=', 1)  // Not CEO (to avoid confusion)
            ->orderBy('id', 'asc')
            ->limit(10)
            ->get();

        if ($candidates->isEmpty()) {
            echo "   ❌ No suitable candidates found.\n";
            echo "   Please create HR Manager user manually or provide user ID.\n";
            return;
        }

        foreach ($candidates as $candidate) {
            $roleName = match($candidate->roles_id) {
                2 => 'Financial Staff',
                3 => 'Operational Staff',
                4 => 'Co-CEO',
                5 => 'HR Manager',
                6 => 'PIC Internship',
                default => 'Role ' . $candidate->roles_id
            };
            echo "   - ID: {$candidate->id}, Name: {$candidate->name}, Current Role: {$roleName}\n";
        }

        echo "\n📝 TO ASSIGN EXISTING USER TO HR MANAGER:\n";
        echo "   Run: php artisan tinker\n";
        echo "   Then: DB::table('users')->where('id', <USER_ID>)->update(['roles_id' => 5]);\n";
        echo "   Where <USER_ID> is the ID of the user you want to make HR Manager\n";

        echo "\n✅ SEEDER COMPLETE\n";
        echo "   If no HR Manager exists, please:\n";
        echo "   1. Choose a suitable user ID from the list above\n";
        echo "   2. Run: php artisan db:seed --class=AssignUserToHRManagerSeeder\n";
        echo "      (or use the manual tinker command above)\n";
        echo "\n";
    }
}
