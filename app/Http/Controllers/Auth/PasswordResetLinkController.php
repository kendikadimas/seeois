<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
            'reset_url' => session('reset_url'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
        ], [
            'email.required' => 'Alamat email wajib diisi.',
            'email.email' => 'Format alamat email tidak valid.',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['Alamat email tersebut tidak terdaftar di sistem kami.'],
            ]);
        }

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            $resetUrl = null;
            // Jika dalam mode lokal atau driver mail log, sediakan tautan langsung untuk memudahkan pengujian
            if (config('app.env') === 'local' || config('mail.default') === 'log') {
                $token = Password::broker()->createToken($user);
                $resetUrl = url(route('password.reset', [
                    'token' => $token,
                    'email' => $user->email,
                ], false));
            }

            return back()->with('status', 'Tautan untuk mengatur ulang kata sandi telah dikirim ke email Anda.')
                         ->with('reset_url', $resetUrl);
        }

        $message = match($status) {
            Password::RESET_THROTTLED => 'Silakan tunggu beberapa saat sebelum meminta tautan reset kembali.',
            Password::INVALID_USER => 'Alamat email tersebut tidak terdaftar di sistem kami.',
            default => trans($status) ?: 'Gagal mengirimkan tautan reset kata sandi.',
        };

        throw ValidationException::withMessages([
            'email' => [$message],
        ]);
    }
}
