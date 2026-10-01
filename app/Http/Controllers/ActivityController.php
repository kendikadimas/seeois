<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Services\GroqContentWriter;
use App\Support\MediaStorage;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Throwable;

class ActivityController extends Controller
{
    public function generateContent(Request $request, GroqContentWriter $writer)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'category' => ['nullable', 'string', 'max:255'],
            'date' => ['nullable', 'date'],
            'current_content' => ['required', 'string', 'min:40', 'max:10000'],
        ], [
            'current_content.required' => 'Tuliskan bahan berita terlebih dahulu sebelum menggunakan AI.',
            'current_content.min' => 'Bahan berita minimal 40 karakter agar hasil artikel tidak terlalu generik.',
        ]);

        if (blank(config('services.groq.api_key'))) {
            return response()->json([
                'message' => 'Groq API belum dikonfigurasi. Tambahkan GROQ_API_KEY pada file .env.',
            ], 503);
        }

        try {
            return response()->json([
                'content' => $writer->generate($validated),
            ]);
        } catch (RequestException $exception) {
            Log::warning('Groq API rejected an AI writer request.', [
                'status' => $exception->response->status(),
                'groq_error' => $exception->response->json('error.message'),
                'user_id' => $request->user()?->id,
            ]);

            $message = $exception->response->status() === 429
                ? 'Batas penggunaan Groq sedang tercapai. Silakan coba lagi beberapa saat.'
                : 'Groq gagal membuat konten. Periksa API key dan model yang digunakan.';

            return response()->json(['message' => $message], 502);
        } catch (ConnectionException $exception) {
            Log::warning('Could not connect to Groq API.', [
                'user_id' => $request->user()?->id,
                'error' => $exception->getMessage(),
            ]);

            return response()->json([
                'message' => 'Tidak dapat terhubung ke Groq. Periksa koneksi internet lalu coba lagi.',
            ], 502);
        } catch (Throwable $exception) {
            report($exception);

            return response()->json([
                'message' => 'Konten AI belum berhasil dibuat. Silakan coba lagi.',
            ], 500);
        }
    }

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
            }),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:150',
            'description' => 'required|string',
            'image_path' => 'nullable|image|max:2048',
            'gallery' => 'nullable|array|max:10',
            'gallery.*' => 'nullable|image|max:2048',
            'category' => 'nullable|string|max:255',
            'date' => 'nullable|date',
            'is_published' => 'boolean',
        ]);

        $data = $request->except(['image_path', 'gallery']);
        $data['slug'] = Str::limit(Str::slug($request->title), 100, '') . '-' . uniqid();

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
            'title' => 'required|string|max:150',
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
