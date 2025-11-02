<?php

namespace App\Http\Middleware;

use App\Models\Program;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class CheckInternshipAccess
{
    /**
     * Handle an incoming request.
     * Mengecek apakah user memiliki akses ke data internship applications.
     * Yang diizinkan: CEO, Co-CEO, HR Manager, dan PIC Internship.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Cek apakah user sudah login
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Silakan login terlebih dahulu.');
        }

        $user = Auth::user();
        
        // Debug middleware
        Log::info('CheckInternshipAccess middleware', [
            'user_id' => $user->id,
            'user_name' => $user->name,
            'roles_id' => $user->roles_id,
        ]);

        // 2. Definisi role yang diizinkan akses:
        // 1 = CEO, 5 = Co-CEO, 6 = HR Manager
        $allowedRoles = [1, 5, 6]; // CEO, Co-CEO, HR Manager
        
        // 3. Cek apakah user memiliki role yang diizinkan
        if (in_array($user->roles_id, $allowedRoles)) {
            Log::info('User has allowed role, access granted', [
                'role_id' => $user->roles_id
            ]);
            return $next($request);
        }
        
        if ($user->id === 39) {
            Log::info('User ID 39 (PIC Internship Staff) access granted', [
                'user_id' => $user->id,
                'user_name' => $user->name
            ]);
            return $next($request);
        }

        // 4. Jika bukan role yang diizinkan, cek apakah dia PIC Internship
        $internshipProgram = Program::where('name', 'Internship')->first();
        
        Log::info('Internship program check', [
            'program_found' => $internshipProgram ? true : false,
            'program_id' => $internshipProgram ? $internshipProgram->id : null,
            'program_pic_id' => $internshipProgram ? $internshipProgram->pic_id : null,
        ]);
        
        if (!$internshipProgram) {
            Log::warning('Internship program not found');
            abort(404, 'Program Internship tidak ditemukan dalam database.');
        }

        // 5. Cek apakah user adalah PIC Internship
        if ($user->id === $internshipProgram->pic_id) {
            Log::info('User is Internship PIC, access granted');
            return $next($request);
        }

        // 6. Jika tidak memenuhi kriteria, tolak akses
        Log::warning('User access denied to internship applications', [
            'user_id' => $user->id,
            'roles_id' => $user->roles_id,
            'is_pic' => false
        ]);
        
        abort(403, 'Anda tidak memiliki akses untuk melihat data pendaftar internship. Hanya CEO, Co-CEO, HR Manager, dan PIC Internship yang dapat mengakses halaman ini.');
    }
}
