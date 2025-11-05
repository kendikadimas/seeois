<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

echo "\n========== HR MANAGER ACCESS ISSUE - FULL DIAGNOSIS ==========\n";

// 1. Check Users with Role 5 (HR Manager)
echo "\n1️⃣ USERS WITH ROLE 5 (HR MANAGER):\n";
$hrManagers = DB::table('users')->where('roles_id', 5)->get();
if ($hrManagers->isEmpty()) {
    echo "   ❌ NO HR MANAGERS FOUND (role_id = 5)\n";
} else {
    foreach ($hrManagers as $user) {
        echo "   ✅ {$user->name} (ID: {$user->id}, Role: {$user->roles_id})\n";
    }
}

// 2. Check Users with Role 6 (PIC Internship)
echo "\n2️⃣ USERS WITH ROLE 6 (PIC INTERNSHIP):\n";
$picUsers = DB::table('users')->where('roles_id', 6)->get();
if ($picUsers->isEmpty()) {
    echo "   ❌ NO PIC INTERNSHIP FOUND (role_id = 6)\n";
} else {
    foreach ($picUsers as $user) {
        echo "   ✅ {$user->name} (ID: {$user->id}, Role: {$user->roles_id})\n";
    }
}

// 3. Check Internship Program
echo "\n3️⃣ INTERNSHIP PROGRAM DATA:\n";
$program = DB::table('program')
    ->where(DB::raw('LOWER(name)'), 'like', '%internship%')
    ->orWhere(DB::raw('LOWER(name)'), 'like', '%magang%')
    ->first();

if (!$program) {
    $program = DB::table('program')->where('id', 5)->first();
}

if ($program) {
    echo "   ✅ FOUND: Program ID={$program->id}, Name='{$program->name}', PIC_ID={$program->pic_id}\n";
    
    // Get PIC details
    $picDetails = DB::table('users')->where('id', $program->pic_id)->first();
    if ($picDetails) {
        echo "   └─ PIC: {$picDetails->name} (ID: {$picDetails->id}, Role: {$picDetails->roles_id})\n";
    } else {
        echo "   └─ ❌ PIC user ID {$program->pic_id} not found\n";
    }
} else {
    echo "   ❌ INTERNSHIP PROGRAM NOT FOUND\n";
    echo "   📌 All programs:\n";
    $allPrograms = DB::table('program')->get();
    foreach ($allPrograms as $p) {
        $pic = DB::table('users')->where('id', $p->pic_id)->first();
        $picName = $pic ? $pic->name : "N/A";
        echo "      - ID: {$p->id}, Name: {$p->name}, PIC: {$p->pic_id} ({$picName})\n";
    }
}

// 4. Authorization Analysis
echo "\n4️⃣ AUTHORIZATION ISSUE ANALYSIS:\n";
if ($hrManagers->isEmpty() && $picUsers->isEmpty()) {
    echo "   ❌ CRITICAL: No HR Manager (role 5) and No PIC (role 6) exist!\n";
} elseif ($hrManagers->isEmpty()) {
    echo "   ❌ ISSUE: No HR Manager with role_id=5 exists\n";
    echo "   ℹ️  Only PIC Internship (role_id=6) exists\n";
    echo "   📝 SOLUTION: Either create HR Manager user or update Policy to allow role_id=5\n";
} elseif ($program) {
    echo "   Policy Check: Only PIC (user_id = {$program->pic_id}) can manage certificates\n";
    foreach ($hrManagers as $hr) {
        $canAccess = ($hr->id === $program->pic_id);
        echo "   {$hr->name} (ID: {$hr->id}): " . ($canAccess ? "✅ CAN ACCESS" : "❌ CANNOT ACCESS") . "\n";
        if (!$canAccess) {
            echo "      └─ Reason: Not PIC of internship program\n";
        }
    }
}

// 5. Current Authorization Model
echo "\n5️⃣ CURRENT AUTHORIZATION MODEL:\n";
echo "   📍 System uses: PIC-BASED authorization\n";
echo "   ❌ Old system used: ROLE-BASED (role 5, 6)\n";
echo "   📋 Changes:\n";
echo "      - Removed middleware('role:5,6') from routes\n";
echo "      - Added Policy check: user.id === program.pic_id\n";
echo "      - Only PIC can access /staff/internship/certificates/manage\n";

echo "\n6️⃣ ROOT CAUSE:\n";
if ($hrManagers->isEmpty()) {
    echo "   ✅ HR Manager (role_id=5) doesn't exist in database\n";
    echo "   ✅ OR HR Manager exists but is NOT the PIC of Internship Program\n";
} else {
    foreach ($hrManagers as $hr) {
        if ($program && $hr->id !== $program->pic_id) {
            echo "   ✅ HR Manager '{$hr->name}' (ID: {$hr->id}) is NOT PIC\n";
            echo "   ✅ Current PIC: ID {$program->pic_id} (must be {$hr->id} to grant access)\n";
        }
    }
}

echo "\n7️⃣ SOLUTIONS:\n";
echo "   Option 1: Update Policy to allow role_id = 5 (legacy role-based)\n";
echo "   Option 2: Make HR Manager the PIC of Internship Program\n";
echo "   Option 3: Create new HR Manager if doesn't exist\n";

echo "\n";
