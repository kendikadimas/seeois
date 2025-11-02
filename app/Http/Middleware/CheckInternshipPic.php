<?php

namespace App\Http\Middleware;

use App\Models\Program;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class CheckInternshipPic
{
    /**
     * Handle an incoming request.
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
        Log::info('CheckInternshipPic middleware', [
            'user_id' => $user->id,
            'user_name' => $user->name,
            'roles_id' => $user->roles_id,
        ]);

        // 2. CEO (roles_id = 1) selalu bisa akses
        if ($user->roles_id === 1) { // UBAH DARI role_id KE roles_id
            Log::info('User is CEO, access granted');
            return $next($request);
        }

        // 3. Dapatkan program 'Internship' dari database
        $internshipProgram = Program::where('name', 'Internship')->first();
        
        Log::info('Internship program check', [
            'program_found' => $internshipProgram ? true : false,
            'program_id' => $internshipProgram ? $internshipProgram->id : null,
            'program_pic_id' => $internshipProgram ? $internshipProgram->pic_id : null,
        ]);
        
        if (!$internshipProgram) {
            Log::error('Program Internship tidak ditemukan di database');
            abort(404, 'Program Internship tidak ditemukan.');
        }

        // 4. Cek apakah user adalah PIC dari program Internship
        if ($user->id !== $internshipProgram->pic_id) {
            Log::warning('User bukan PIC Internship', [
                'user_id' => $user->id,
                'pic_id' => $internshipProgram->pic_id
            ]);
            // 5. Jika bukan CEO dan bukan PIC Internship, tolak akses
            abort(403, 'ANDA TIDAK MEMILIKI HAK AKSES UNTUK HALAMAN INI. Hanya CEO dan PIC Internship yang dapat mengakses data pendaftar internship.');
        }

        Log::info('User is PIC Internship, access granted');
        // 6. Jika user adalah CEO atau PIC Internship, izinkan akses
        return $next($request);
    }
}