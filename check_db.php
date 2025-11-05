<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\Program;
use DB;

echo "\n========== HR MANAGER DIAGNOSIS ==========\n";

// 1. Users dengan role 5 (HR Manager)
echo "\n1. HR MANAGERS (Role 5):\n";
$hrManagers = DB::table('users')->where('roles_id', 5)->get();
if ($hrManagers->isEmpty()) {
    echo "   ❌ No HR Managers found\n";
} else {
    foreach ($hrManagers as $hr) {
        echo "   ✅ ID: {$hr->id}, Name: {$hr->name}, Role: {$hr->roles_id}\n";
    }
}

// 2. Users dengan role 6 (PIC Internship)
echo "\n2. PIC INTERNSHIP (Role 6):\n";
$picUsers = DB::table('users')->where('roles_id', 6)->get();
if ($picUsers->isEmpty()) {
    echo "   ❌ No PIC Internship found\n";
} else {
    foreach ($picUsers as $pic) {
        echo "   ✅ ID: {$pic->id}, Name: {$pic->name}, Role: {$pic->roles_id}\n";
    }
}

// 3. Cek Program Internship
echo "\n3. INTERNSHIP PROGRAM:\n";
$program = DB::table('programs')
    ->whereRaw("LOWER(name) LIKE '%internship%' OR LOWER(name) LIKE '%magang%'")
    ->first();

if (!$program) {
    $program = DB::table('programs')->where('id', 5)->first();
}

if ($program) {
    echo "   ✅ Found: ID={$program->id}, Name={$program->name}, PIC_ID={$program->pic_id}\n";
    
    // Cek PIC user
    if ($program->pic_id) {
        $picUser = DB::table('users')->where('id', $program->pic_id)->first();
        if ($picUser) {
            echo "      - PIC: {$picUser->name} (ID: {$picUser->id}, Role: {$picUser->roles_id})\n";
        } else {
            echo "      - ❌ PIC user not found (ID: {$program->pic_id})\n";
        }
    } else {
        echo "      - ❌ No PIC assigned\n";
    }
} else {
    echo "   ❌ Internship program not found\n";
}

// 4. Authorization Analysis
echo "\n4. AUTHORIZATION ANALYSIS:\n";
if (!$hrManagers->isEmpty() && $program) {
    foreach ($hrManagers as $hr) {
        $canAccess = ($hr->id === $program->pic_id);
        $status = $canAccess ? "✅ CAN ACCESS" : "❌ CANNOT ACCESS";
        echo "   {$hr->name} (ID: {$hr->id}): {$status}\n";
        if (!$canAccess) {
            echo "      └─ Reason: Not PIC (current PIC ID: {$program->pic_id})\n";
        }
    }
}

echo "\n5. SUMMARY:\n";
if ($hrManagers->isEmpty()) {
    echo "   ❌ No HR Manager exists\n";
} elseif (!$program) {
    echo "   ❌ No Internship program found\n";
} else {
    $picMatchCount = 0;
    foreach ($hrManagers as $hr) {
        if ($hr->id === $program->pic_id) {
            $picMatchCount++;
        }
    }
    if ($picMatchCount > 0) {
        echo "   ✅ HR Manager can access (is PIC)\n";
    } else {
        echo "   ❌ HR Manager CANNOT access (not PIC of internship program)\n";
        echo "   📝 FIX: Update program PIC to HR Manager ID\n";
    }
}

echo "\n";
