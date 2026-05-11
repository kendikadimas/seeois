<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $activities = Activity::latest()->get();
        return Inertia::render('Staff/Marketing/Activities', [
            'activities' => $activities->map(function ($q) {
                $q->image_url = $q->image_path ? Storage::url($q->image_path) : null;
                return $q;
            })
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image_path' => 'nullable|image|max:2048',
            'category' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'is_published' => 'boolean',
        ]);

        $data = $request->except('image_path');
        $data['slug'] = Str::slug($request->title) . '-' . uniqid();

        if ($request->hasFile('image_path')) {
            $data['image_path'] = $request->file('image_path')->store('images/activities', 'public');
        }

        Activity::create($data);

        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Aktivitas/Berita berhasil diterbitkan.']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Activity $activity)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image_path' => 'nullable',
            'category' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'is_published' => 'boolean',
        ]);

        $data = $request->except('image_path');

        if ($request->hasFile('image_path')) {
            if ($activity->image_path) {
                Storage::disk('public')->delete($activity->image_path);
            }
            $data['image_path'] = $request->file('image_path')->store('images/activities', 'public');
        }

        $activity->update($data);

        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Aktivitas/Berita berhasil diperbarui.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        if ($activity->image_path) {
            Storage::disk('public')->delete($activity->image_path);
        }
        $activity->delete();

        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Aktivitas/Berita berhasil dihapus.']);
    }
}
