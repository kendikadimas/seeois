<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Structure;
use App\Models\Activity;
use App\Support\MediaStorage;

class CompanyProfileController extends Controller
{
    // Hanya me-render halaman Homepage
    public function homepage()
    {
        $structures = Structure::orderBy('order_num')->get()->map(function ($q) {
            $q->image_url = MediaStorage::url($q->image_path);
            return $q;
        });

        $activities = Activity::where('is_published', 1)->latest()->limit(3)->get()->map(function ($q) {
            $q->image_url = MediaStorage::url($q->image_path);
            return $q;
        });

        $companyContents = \App\Models\CompanyContent::orderBy('order')->get()->map(function ($c) {
            return [
                'key' => $c->key,
                'value' => $c->value,
                'image_url' => MediaStorage::url($c->image_path),
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
            $q->image_url = MediaStorage::url($q->image_path);
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
        $activity->image_url = MediaStorage::url($activity->image_path);
        $activity->gallery_urls = $activity->gallery ? collect($activity->gallery)->map(fn ($p) => MediaStorage::url($p))->all() : [];

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
            $q->image_url = MediaStorage::url($q->image_path);
            return $q;
        });

        return Inertia::render('Public/Structure', [
            'structures' => $structures
        ]);
    }
}
