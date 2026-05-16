<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Department;
use App\Models\GovernanceYear;

$activeYear = GovernanceYear::where('is_active', true)->first();
if ($activeYear) {
    $count = Department::whereNull('year_id')->update(['year_id' => $activeYear->id]);
    echo "Successfully associated $count departments with year {$activeYear->year}.\n";
} else {
    echo "No active governance year found.\n";
}
