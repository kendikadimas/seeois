<?php
// Script untuk check HR Manager dan authorization issue

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;
use App\Models\Program;

// 1. Cek siapa yang memiliki role HR Manager (role 5)
echo "\n=== CHECKING HR MANAGER (ROLE 5) ===\n";
$hrManagers = User::where('roles_id', 5)->get(['id', 'name', 'email', 'roles_id']);
if ($hrManagers->isEmpty()) {
    echo "❌ TIDAK ADA HR MANAGER (ROLE 5)\n";
} else {
    echo "✅ HR MANAGERS FOUND:\n";
    foreach ($hrManagers as $hr) {
        echo "   - ID: {$hr->id}, Name: {$hr->name}, Email: {$hr->email}, Role: {$hr->roles_id}\n";
    }
}

// 2. Cek siapa yang memiliki role PIC Internship (role 6)
echo "\n=== CHECKING PIC INTERNSHIP (ROLE 6) ===\n";
$picInternships = User::where('roles_id', 6)->get(['id', 'name', 'email', 'roles_id']);
if ($picInternships->isEmpty()) {
    echo "❌ TIDAK ADA PIC INTERNSHIP (ROLE 6)\n";
} else {
    echo "✅ PIC INTERNSHIPS FOUND:\n";
    foreach ($picInternships as $pic) {
        echo "   - ID: {$pic->id}, Name: {$pic->name}, Email: {$pic->email}, Role: {$pic->roles_id}\n";
    }
}

// 3. Cek Program Internship dan PIC-nya
echo "\n=== CHECKING INTERNSHIP PROGRAM ===\n";
$internshipProgram = Program::where('name', 'like', '%internship%')
    ->orWhere('name', 'like', '%Magang%')
    ->first();

if (!$internshipProgram) {
    $internshipProgram = Program::find(5);
}

if ($internshipProgram) {
    echo "✅ INTERNSHIP PROGRAM FOUND:\n";
    echo "   - ID: {$internshipProgram->id}\n";
    echo "   - Name: {$internshipProgram->name}\n";
    echo "   - PIC ID: {$internshipProgram->pic_id}\n";
    
    // Cek PIC user
    $picUser = User::find($internshipProgram->pic_id);
    if ($picUser) {
        echo "   - PIC Name: {$picUser->name} (ID: {$picUser->id})\n";
        echo "   - PIC Role: {$picUser->roles_id}\n";
    } else {
        echo "   ❌ PIC USER NOT FOUND (ID: {$internshipProgram->pic_id})\n";
    }
} else {
    echo "❌ INTERNSHIP PROGRAM NOT FOUND\n";
}

// 4. Cek semua program
echo "\n=== ALL PROGRAMS ===\n";
$programs = Program::get(['id', 'name', 'pic_id']);
foreach ($programs as $prog) {
    $picName = $prog->pic_id ? User::find($prog->pic_id)?->name : "NONE";
    echo "   - ID: {$prog->id}, Name: {$prog->name}, PIC ID: {$prog->pic_id} ({$picName})\n";
}

// 5. Authorization check untuk HR Manager
if (!$hrManagers->isEmpty() && $internshipProgram) {
    echo "\n=== AUTHORIZATION CHECK ===\n";
    foreach ($hrManagers as $hr) {
        $canManage = $hr->id === $internshipProgram->pic_id;
        $status = $canManage ? "✅ CAN MANAGE" : "❌ CANNOT MANAGE";
        echo "   - {$hr->name} (ID: {$hr->id}): {$status}\n";
        if (!$canManage) {
            echo "     Reason: Not PIC of program (PIC ID: {$internshipProgram->pic_id})\n";
        }
    }
}

echo "\n";
