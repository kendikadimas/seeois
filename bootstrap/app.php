<?php

use App\Http\Middleware\CheckInternshipAccess;
use App\Http\Middleware\CheckInternshipPic;
use App\Http\Middleware\EnsureUserHasRole;
use App\Http\Middleware\StaffAuthorizationCheck;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Inertia\Inertia;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'role' => EnsureUserHasRole::class,
            'staff' => StaffAuthorizationCheck::class,
            'is.internship.pic' => CheckInternshipPic::class,
            'internship.access' => CheckInternshipAccess::class,
        ]);
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function ($response) {
            $status = $response->getStatusCode();
            if ($status === 419) {
                return Inertia::render("Errors/Default", [
                    'status' => $status,
                ]);
            }
            return $response;
        });
    })->create();
