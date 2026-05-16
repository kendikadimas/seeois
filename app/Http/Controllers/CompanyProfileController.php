<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Structure;
use App\Models\Activity;
use Illuminate\Support\Facades\Storage;

class CompanyProfileController extends Controller
{
    // Hanya me-render halaman Homepage
    public function homepage()
    {
        $structures = Structure::orderBy('order_num')->get()->map(function ($q) {
            $q->image_url = $q->image_path ? Storage::disk('public')->url($q->image_path) : null;
            return $q;
        });

        $activities = Activity::where('is_published', 1)->latest()->limit(3)->get()->map(function ($q) {
            $q->image_url = $q->image_path ? Storage::disk('public')->url($q->image_path) : null;
            return $q;
        });

        $companyContents = \App\Models\CompanyContent::orderBy('order')->get()->map(function ($c) {
            return [
                'key' => $c->key,
                'value' => $c->value,
                'image_url' => $c->image_path ? Storage::disk('public')->url($c->image_path) : null,
            ];
        });

        $activeSeminars = \App\Models\SeminarEvent::where('is_active', true)->get();

        return Inertia::render('Public/Homepage', [
            'structures' => $structures,
            'activities' => $activities,
            'companyContents' => $companyContents,
            'activeSeminars' => $activeSeminars,
        ]);
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
        $activities = Activity::where('is_published', 1)->latest()->get()->map(function ($q) {
            $q->image_url = $q->image_path ? Storage::disk('public')->url($q->image_path) : null;
            return $q;
        });

        $categories = Activity::where('is_published', 1)
            ->whereNotNull('category')
            ->distinct()
            ->pluck('category');

        return Inertia::render('Public/Activity', [
            'activities' => $activities,
            'categories' => $categories
        ]);
    }

    public function activityDetail(Activity $activity)
    {
        $activity->image_url = $activity->image_path ? Storage::disk('public')->url($activity->image_path) : null;
        $activity->gallery_urls = $activity->gallery ? collect($activity->gallery)->map(fn($p) => Storage::disk('public')->url($p))->all() : [];

        return Inertia::render('Public/ActivityDetail', [
            'activity' => $activity
        ]);
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
        $structures = \App\Models\Structure::orderBy('order_num')->get()->map(function ($q) {
            $q->image_url = $q->image_path ? \Illuminate\Support\Facades\Storage::disk('public')->url($q->image_path) : null;
            return $q;
        });

        return Inertia::render('Public/Structure', [
            'structures' => $structures
        ]);
    }
}