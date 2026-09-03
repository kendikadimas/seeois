<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserHasCapability
{
    public function handle(Request $request, Closure $next, string ...$capabilities)
    {
        $user = $request->user();
        abort_unless($user, 401);

        foreach ($capabilities as $capability) {
            if ($user->canPerform($capability)) {
                return $next($request);
            }
        }

        abort(403, 'Anda tidak memiliki izin untuk menjalankan fitur ini.');
    }
}
