<?php
$files = glob(__DIR__ . '/tests/Feature/**/*.php', GLOB_BRACE | GLOB_NOSORT);

function getFiles($dir) {
    $files = [];
    foreach (glob($dir . '/*') as $file) {
        if (is_dir($file)) {
            $files = array_merge($files, getFiles($file));
        } else {
            if (pathinfo($file, PATHINFO_EXTENSION) == 'php') {
                $files[] = $file;
            }
        }
    }
    return $files;
}

$files = array_merge(getFiles(__DIR__ . '/tests/Feature'), glob(__DIR__ . '/tests/Feature/*.php'));

$replacements = [
    "'/seeo/dashboard" => "'/seeo/staff/dashboard",
    "\"/seeo/dashboard" => "\"/seeo/staff/dashboard",
    "'/profile" => "'/seeo/staff/profile",
    "\"/profile" => "\"/seeo/staff/profile",
    "'/password/change" => "'/seeo/staff/profile/password",
    "\"/password/change" => "\"/seeo/staff/profile/password",
];

foreach ($files as $file) {
    $content = file_get_contents($file);
    $newContent = strtr($content, $replacements);
    if ($content !== $newContent) {
        file_put_contents($file, $newContent);
    }
}
echo "Done replacing routes";
