<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssignUserToHRManagerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Purpose: Assign a specific user to HR Manager role (role_id = 5)
     * Safe to run in production - no schema changes, just data update
     * 
     * BEFORE RUNNING:
     * 1. Edit this file and set $userIdToAssign to the user ID you want to make HR Manager
     * 2. Verify the user ID is correct
     * 3. Run: php artisan db:seed --class=AssignUserToHRManagerSeeder
     * 
     * Usage Examples:
     *   - Make user ID 3 as HR Manager: Set $userIdToAssign = 3
     *   - Make user ID 14 as HR Manager: Set $userIdToAssign = 14
     */
    public function run(): void
    {
        echo "\n========== ASSIGNING USER TO HR MANAGER ROLE ==========\n";

        // 🔴 EDIT THIS VALUE - Set the user ID you want to make HR Manager
        $userIdToAssign = 3;  // ← CHANGE THIS TO THE USER ID YOU WANT

        echo "\n1️⃣ CONFIGURATION:\n";
        echo "   User ID to assign: {$userIdToAssign}\n";
        echo "   Target Role: 5 (HR Manager)\n";

        // Verify user exists
        echo "\n2️⃣ VERIFYING USER EXISTS:\n";
        $user = DB::table('users')->where('id', $userIdToAssign)->first();

        if (!$user) {
            echo "   ❌ ERROR: User ID {$userIdToAssign} not found!\n";
            echo "   Please check the user ID and try again.\n";
            return;
        }

        echo "   ✅ User found: {$user->name}\n";
        echo "   Current Role: {$user->roles_id}\n";

        // Check if already HR Manager
        if ($user->roles_id === 5) {
            echo "\n3️⃣ ASSIGNMENT STATUS:\n";
            echo "   ⚠️  User is already HR Manager (role_id = 5)\n";
            echo "   No changes needed.\n";
            return;
        }

        // Show confirmation
        echo "\n3️⃣ ASSIGNMENT DETAILS:\n";
        echo "   From: Role {$user->roles_id}\n";
        echo "   To: Role 5 (HR Manager)\n";
        echo "   User: {$user->name} (ID: {$user->id})\n";

        // Perform update
        echo "\n4️⃣ EXECUTING UPDATE...\n";
        
        try {
            $updated = DB::table('users')
                ->where('id', $userIdToAssign)
                ->update(['roles_id' => 5]);

            if ($updated) {
                echo "   ✅ SUCCESS!\n";
                echo "   User {$user->name} is now HR Manager (role_id = 5)\n";

                // Verify the update
                $verifyUser = DB::table('users')->where('id', $userIdToAssign)->first();
                echo "\n5️⃣ VERIFICATION:\n";
                echo "   Updated Role: {$verifyUser->roles_id}\n";
                echo "   Status: " . ($verifyUser->roles_id === 5 ? "✅ CONFIRMED" : "❌ FAILED") . "\n";

                echo "\n6️⃣ NEXT STEPS:\n";
                echo "   ✅ User can now access: /staff/internship/certificates/manage\n";
                echo "   ✅ User can upload, edit, delete certificates\n";
                echo "   ✅ Clear browser cache: Ctrl+Shift+Delete\n";
                echo "   ✅ Test login with this user\n";

            } else {
                echo "   ❌ FAILED: Update query returned 0 rows affected\n";
            }
        } catch (\Exception $e) {
            echo "   ❌ ERROR: " . $e->getMessage() . "\n";
        }

        echo "\n";
    }
}
