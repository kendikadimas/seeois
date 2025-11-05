<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CreateHRManagerUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * Purpose: Create a new HR Manager user from scratch
     * Safe to run in production - no schema changes
     * 
     * This creates a complete new HR Manager user with:
     * - Email: hr-manager@seeonow.local
     * - Name: HR Manager
     * - Role: 5 (HR Manager)
     * - Password: hashed
     * 
     * Usage: php artisan db:seed --class=CreateHRManagerUserSeeder
     */
    public function run(): void
    {
        echo "\n========== CREATING HR MANAGER USER ==========\n";

        // Check if HR Manager already exists
        echo "\n1️⃣ CHECKING FOR EXISTING HR MANAGERS:\n";
        $existingHRManager = DB::table('users')->where('roles_id', 5)->first();

        if ($existingHRManager) {
            echo "   ✅ HR Manager already exists!\n";
            echo "   Name: {$existingHRManager->name} (ID: {$existingHRManager->id})\n";
            echo "   Email: {$existingHRManager->email}\n";
            echo "   No new user created.\n";
            return;
        }

        echo "   ❌ No HR Manager found. Creating new user...\n";

        // Check if email already exists
        echo "\n2️⃣ CHECKING EMAIL AVAILABILITY:\n";
        $emailToUse = 'hr-manager@seeonow.local';
        $existingEmail = DB::table('users')->where('email', $emailToUse)->first();

        if ($existingEmail) {
            $emailToUse = 'hr-manager-' . time() . '@seeonow.local';
            echo "   Email {$emailToUse} already exists.\n";
            echo "   Using alternative: {$emailToUse}\n";
        } else {
            echo "   ✅ Email available: {$emailToUse}\n";
        }

        // Prepare user data
        echo "\n3️⃣ PREPARING USER DATA:\n";
        $userData = [
            'name' => 'HR Manager',
            'email' => $emailToUse,
            'roles_id' => 5,  // HR Manager role
            'password' => bcrypt('default123'),  // Default password
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ];

        echo "   Name: {$userData['name']}\n";
        echo "   Email: {$userData['email']}\n";
        echo "   Role: {$userData['roles_id']} (HR Manager)\n";
        echo "   Status: Ready to insert\n";

        // Insert user
        echo "\n4️⃣ INSERTING USER INTO DATABASE:\n";
        try {
            $userId = DB::table('users')->insertGetId($userData);
            echo "   ✅ SUCCESS!\n";
            echo "   New HR Manager created with ID: {$userId}\n";

            // Verify
            echo "\n5️⃣ VERIFICATION:\n";
            $verifyUser = DB::table('users')->where('id', $userId)->first();
            echo "   User: {$verifyUser->name}\n";
            echo "   Email: {$verifyUser->email}\n";
            echo "   Role: {$verifyUser->roles_id}\n";
            echo "   Status: ✅ CONFIRMED\n";

            echo "\n6️⃣ IMPORTANT INFORMATION:\n";
            echo "   📧 Email: {$userData['email']}\n";
            echo "   🔐 Default Password: default123\n";
            echo "   ⚠️  IMPORTANT: Change password immediately after first login!\n";

            echo "\n7️⃣ NEXT STEPS:\n";
            echo "   ✅ Test login with credentials above\n";
            echo "   ✅ Change password to secure password\n";
            echo "   ✅ Access: /staff/internship/certificates/manage\n";
            echo "   ✅ Test certificate upload/management features\n";

        } catch (\Exception $e) {
            echo "   ❌ ERROR: " . $e->getMessage() . "\n";
            echo "   Please check database connection and try again.\n";
        }

        echo "\n";
    }
}
