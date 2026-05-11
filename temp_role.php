<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
$r = App\Models\Role::where('name', 'Staff Marketing Medinfo')->first();
if (!$r) {
    $r = new App\Models\Role;
    $r->name = 'Staff Marketing Medinfo';
    $r->save();
}
echo 'ROLE_ID=' . $r->id;
