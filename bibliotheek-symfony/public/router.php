<?php
// Router script for PHP's built-in server to forward
// all non-existing files to the Symfony front controller.

$url = parse_url($_SERVER['REQUEST_URI']);
$file = __DIR__ . $url['path'];

if (is_file($file)) {
    return false;
}

// Route everything else through index.php
$_SERVER['SCRIPT_FILENAME'] = __DIR__ . '/index.php';
require __DIR__ . '/index.php';
