<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Support\MediaStorage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

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
                $q->image_url = MediaStorage::url($q->image_path);
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
            'gallery' => 'nullable|array|max:10',
            'gallery.*' => 'nullable|image|max:2048',
            'category' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'is_published' => 'boolean',
        ]);

        $data = $request->except(['image_path', 'gallery']);
        $data['slug'] = Str::slug($request->title) . '-' . uniqid();

        if ($request->hasFile('image_path')) {
            $data['image_path'] = $request->file('image_path')->store('images/activities', MediaStorage::diskName());
        }

        if ($request->hasFile('gallery')) {
            $galleryPaths = [];
            foreach ($request->file('gallery') as $file) {
                $galleryPaths[] = $file->store('images/activities/gallery', MediaStorage::diskName());
            }
            $data['gallery'] = $galleryPaths;
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
            'image_path' => 'nullable|image|max:2048',
            'gallery' => 'nullable|array|max:10',
            'gallery.*' => 'nullable|image|max:2048',
            'category' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'is_published' => 'boolean',
        ]);

        $data = $request->except(['image_path', 'gallery']);

        if ($request->hasFile('image_path')) {
            $oldImagePath = $activity->image_path;
            $data['image_path'] = $request->file('image_path')->store('images/activities', MediaStorage::diskName());
        }

        if ($request->hasFile('gallery')) {
            $oldGalleryPaths = $activity->gallery ?? [];
            $galleryPaths = [];
            foreach ($request->file('gallery') as $file) {
                $galleryPaths[] = $file->store('images/activities/gallery', MediaStorage::diskName());
            }
            $data['gallery'] = $galleryPaths;
        }

        $activity->update($data);

        if (isset($oldImagePath) && $oldImagePath !== $activity->image_path) {
            MediaStorage::disk()->delete($oldImagePath);
        }

        if (isset($oldGalleryPaths)) {
            MediaStorage::disk()->delete($oldGalleryPaths);
        }

        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Aktivitas/Berita berhasil diperbarui.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        $paths = array_filter(array_merge([$activity->image_path], $activity->gallery ?? []));
        $activity->delete();

        if ($paths !== []) {
            MediaStorage::disk()->delete($paths);
        }

        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Aktivitas/Berita berhasil dihapus.']);
    }
}
