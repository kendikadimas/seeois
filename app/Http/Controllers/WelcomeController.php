<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        // This will render the login page
        return Inertia::render('Auth/Login', [
            'notif' => session('notif')
        ]);
    }
    
    public function welcome()
    {
        // This can be used for a separate welcome page if needed
        return Inertia::render('Public/Welcome', [
            'notif' => session('notif')
        ]);
    }
}
