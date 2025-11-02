<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class CompanyProfileController extends Controller
{
    // Hanya me-render halaman Homepage
    public function homepage()
    {
        return Inertia::render('Public/Homepage');
    }

    // Hanya me-render halaman OurBrand
    public function ourBrand()
    {
        return Inertia::render('Public/OurBrand');
    }

    // Hanya me-render halaman Departments
    public function departments()
    {
        return Inertia::render('Public/Departments');
    }

    // Hanya me-render halaman Events
    public function activity()
    {
        return Inertia::render('Public/Activity');
    }

    // Hanya me-render halaman About
    public function about()
    {
        return Inertia::render('Public/About');
    }
    
    // Hanya me-render halaman Contact
    public function contact()
    {
        return Inertia::render('Public/Contact');
    }

    public function structure()
    {
        return Inertia::render('Public/Structure');
    }
}