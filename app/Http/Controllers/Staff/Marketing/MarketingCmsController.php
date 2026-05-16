<?php

namespace App\Http\Controllers\Staff\Marketing;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\CompanyContent;
use App\Models\Department;
use App\Models\Structure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MarketingCmsController extends Controller
{
    public function index()
    {
        $stats = CompanyContent::orderBy('order')->get();
        $articles = Activity::latest()->get()->map(function ($q) {
            $q->image_url = $q->image_path ? Storage::disk('public')->url($q->image_path) : null;
            $q->gallery_urls = $q->gallery ? collect($q->gallery)->map(fn($p) => Storage::disk('public')->url($p))->all() : [];
            return $q;
        });
        $members = Structure::orderBy('order_num')->get()->map(function ($q) {
            $q->image_url = $q->image_path ? Storage::disk('public')->url($q->image_path) : null;
            return $q;
        });
        $departments = Department::select('id', 'name')->get();

        return Inertia::render('Staff/Marketing/MarketingCms', [
            'stats' => $stats,
            'articles' => $articles,
            'members' => $members,
            'departments' => $departments,
            'notif' => session('notif'),
        ]);
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:5120',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images/marketing/editor', 'public');
            return response()->json([
                'url' => Storage::disk('public')->url($path),
                'path' => $path
            ]);
        }

        return response()->json(['error' => 'Upload failed'], 400);
    }
}
