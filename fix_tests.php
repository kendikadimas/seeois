<?php

$dir = __DIR__ . '/tests/Feature/Staff';
$files = glob($dir . '/*.php');

$replacements = [
    "'/department" => "'/seeo/staff/department",
    "\"/department" => "\"/seeo/staff/department",
    "'/program" => "'/seeo/staff/program",
    "\"/program" => "\"/seeo/staff/program",
    "'/user" => "'/seeo/staff/user",
    "\"/user" => "\"/seeo/staff/user",
    "'/dashboard" => "'/seeo/staff/dashboard",
    "\"/dashboard" => "\"/seeo/staff/dashboard",
    "'/structural" => "'/seeo/staff/structural",
    "\"/structural" => "\"/seeo/staff/structural",
    "'/unemployee" => "'/seeo/staff/unemployee",
    "\"/unemployee" => "\"/seeo/staff/unemployee",
    "'/payroll" => "'/seeo/staff/payroll",
    "\"/payroll" => "\"/seeo/staff/payroll",
    "'/finance" => "'/seeo/staff/finance",
    "\"/finance" => "\"/seeo/staff/finance",
    "'/seeo/program" => "'/seeo/staff/program",
    "\"/seeo/program" => "\"/seeo/staff/program",
    "'/seeo/structural" => "'/seeo/staff/structural",
    "\"/seeo/structural" => "\"/seeo/staff/structural",
    "'/seeo/department" => "'/seeo/staff/department",
    "\"/seeo/department" => "\"/seeo/staff/department",
];

foreach ($files as $file) {
    $content = file_get_contents($file);
    
    foreach ($replacements as $search => $replace) {
        $content = str_replace($search, $replace, $content);
    }

    // Clean up duplicate prefixes if they were already correct
    $content = str_replace("'/seeo/staff/seeo/staff/", "'/seeo/staff/", $content);
    $content = str_replace("\"/seeo/staff/seeo/staff/", "\"/seeo/staff/", $content);
    $content = str_replace("'/seeo/staff/seeo/", "'/seeo/staff/", $content);
    $content = str_replace("\"/seeo/staff/seeo/", "\"/seeo/staff/", $content);

    file_put_contents($file, $content);
}
echo "Done";
