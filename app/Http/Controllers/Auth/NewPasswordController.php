<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class NewPasswordController extends Controller
{
    /**
     * Display the password reset view.
     */
    public function create(Request $request)
    {
        return Inertia::render('Auth/ResetPassword', [
            'email' => $request->email ?? '',
            'token' => $request->route('token'),
        ]);
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'token.required' => 'Token reset tidak ditemukan.',
            'email.required' => 'Alamat email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'password.required' => 'Kata sandi baru wajib diisi.',
            'password.confirmed' => 'Konfirmasi kata sandi tidak cocok.',
            'password.min' => 'Kata sandi baru minimal 8 karakter.',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            $msg = 'Kata sandi Anda berhasil diatur ulang! Silakan masuk menggunakan kata sandi baru.';
            return redirect()->route('login')->with('notif', [
                'type' => 'success',
                'message' => $msg,
            ])->with('status', $msg);
        }

        $errorMessage = match($status) {
            Password::INVALID_USER => 'Pengguna dengan email tersebut tidak ditemukan.',
            Password::INVALID_TOKEN => 'Token reset kata sandi tidak valid atau sudah kedaluwarsa. Silakan minta tautan baru.',
            default => trans($status) ?: 'Gagal mengatur ulang kata sandi.',
        };

        return back()->withInput($request->only('email'))
            ->withErrors(['email' => $errorMessage]);
    }
}
