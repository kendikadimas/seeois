<?php

use App\Http\Middleware\CheckInternshipAccess;
use App\Http\Middleware\CheckInternshipPic;
use App\Http\Middleware\EnsureUserHasRole;
use App\Http\Middleware\EnsureUserHasCapability;
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
            'capability' => EnsureUserHasCapability::class,
            'staff' => StaffAuthorizationCheck::class,
            'is.internship.pic' => CheckInternshipPic::class,
            'internship.access' => CheckInternshipAccess::class,
        ]);
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            \App\Http\Middleware\RecordStaffAuditLog::class,
        ]);
        
        // Trust all proxies for production (behind load balancer/reverse proxy)
        $middleware->trustProxies(at: '*');
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function ($response, $exception, $request) {
            $status = $response->getStatusCode();
            if (in_array($status, [403, 404, 419, 500, 503], true) && ! app()->environment('local')) {
                return Inertia::render("Errors/Default", [
                    'status' => $status,
                    'message' => match ($status) {
                        403 => 'Anda tidak memiliki izin untuk membuka atau mengubah data ini.',
                        404 => 'Halaman atau data yang dicari tidak ditemukan.',
                        419 => 'Sesi Anda berakhir. Muat ulang halaman lalu coba kembali.',
                        503 => 'Sistem sedang dalam pemeliharaan.',
                        default => 'Terjadi gangguan pada server. Silakan coba kembali.',
                    },
                ])->toResponse($request)->setStatusCode($status);
            }
            return $response;
        });
    })->create();
