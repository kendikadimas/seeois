<?php
$dir = __DIR__ . '/tests/Feature/Staff';
$files = glob($dir . '/*.php');

foreach ($files as $file) {
    $content = file_get_contents($file);
    
    // Fix cases where my script added /seeo/staff/ but there's a STAFF_PREFIX .
    // Example: STAFF_PREFIX . '/seeo/staff/department
    $content = str_replace("STAFF_PREFIX . '/seeo/staff/", "STAFF_PREFIX . '/", $content);
    $content = str_replace("STAFF_PREFIX . \"/seeo/staff/", "STAFF_PREFIX . \"/", $content);
    
    file_put_contents($file, $content);
}
echo "Done fix_prefix";
