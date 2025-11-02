<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    // redirect to google authentication
    function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    // get response from google
    function callback()
    {
        $user = null;
        try {
            $user = Socialite::driver('google')->user();
        } catch (Exception $e) {
            return redirect()->route('login')->with('notif', ['type' => 'warning', 'message' => 'Please reload the page, then try to login.']);
        }
        try {
            $findUserGoogle = User::where('id_google', $user->id)->first();
            $findUserMail = User::where('email', $user->email)->first();
            if ($findUserGoogle && $findUserMail) {
                return  $findUserGoogle->password ? $this->login_google($findUserGoogle) : redirect()->route('register.google', ['id' => $findUserGoogle->id_google]);
            } else if ($findUserMail) {
                return $this->register_google($findUserMail, $user->id);
            } else {
                return $this->register($user->name, $user->email, $user->id);
            }
        } catch (Exception $e) {
            return redirect()->route('login')->with('notif', ['type' => 'warning', 'message' => 'Please reload the page, then try to login.']);
        }
    }

    // google login authentication
    private function login_google(User $user)
    {
        Auth::login($user);

        if (Auth::user()->roles_id > 0) {
            session('notif', ['type' => 'info', 'message' => 'Hi ' . Auth::user()->name . ', welcome to SEEO Information System']);
            return redirect()->intended(route('dashboard', absolute: false))->with('notif', ['type' => 'info', 'message' => 'Hi ' . Auth::user()->name . ', welcome to SEEO Information System']);
        } else {
            return redirect()->intended(route('login', absolute: false))->with('notif', ['type' => 'info', 'message' => 'Hi ' . Auth::user()->name . ', welcome to Blaterian']);
        }
    }

    // google register authentication 
    private function register_google(User $user, $id_google)
    {
        $user->change($user->id, [
            'id_google' => $id_google,
            'updated_at' => now(),
        ]);
        return $this->login_google($user);
    }

    // manual register authentication 
    private function register($name, $email, $id)
    {
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'id_google' => $id,
        ]);
        $user->markEmailAsVerified();
        return redirect()->route('register.google', ['id' => $id]);
    }
}
