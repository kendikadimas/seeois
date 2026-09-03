<?php

namespace App\Http\Middleware;

use App\Models\AuditLog;
use Closure;
use Illuminate\Http\Request;

class RecordStaffAuditLog
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        if (! $request->isMethodSafe() && $request->user() && $request->is('seeo/staff/*')) {
            $payload = collect($request->except([
                'password', 'password_confirmation', 'current_password', '_token',
                'client_secret', 'refresh_token', 'access_token',
            ]))->map(fn ($value) => $value instanceof \Illuminate\Http\UploadedFile
                ? ['filename' => $value->getClientOriginalName(), 'size' => $value->getSize()]
                : $value)->all();

            AuditLog::create([
                'user_id' => $request->user()->id,
                'action' => $request->route()?->getName() ?? 'unnamed',
                'method' => $request->method(),
                'path' => $request->path(),
                'status' => $response->getStatusCode(),
                'payload' => $payload,
                'ip_address' => $request->ip(),
                'user_agent' => substr((string) $request->userAgent(), 0, 1000),
                'created_at' => now(),
            ]);
        }

        return $response;
    }
}
