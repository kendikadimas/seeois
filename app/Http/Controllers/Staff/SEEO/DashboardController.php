<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Models\Attachment;
use App\Models\Billboard;
use App\Models\Post;
use App\Models\MenuItem;
use App\Models\StandSales;
use App\Models\Logbook;
use App\Models\InternshipApplication;
use App\Models\GovernanceYear;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\Drivers\Imagick\Driver as ImagickDriver;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $diskName = config('app.env') === 'production' ? 'google' : 'public';
        $disk = null;
        try {
            $disk = Storage::disk($diskName);
        } catch (\Throwable $e) {
            Log::warning('Gagal memuat disk storage', ['error' => $e->getMessage()]);
        }

        // Siapkan link gambar billboard: cek lokal dulu agar loading cepat, Google Drive sebagai cadangan
        $billboard_list = Billboard::all()->map(function ($billboard) {
            if ($billboard->image) {
                if (file_exists(public_path('images/billboard/' . $billboard->image))) {
                    $billboard->full_image_url = asset('images/billboard/' . $billboard->image);
                } elseif (Storage::disk('public')->exists('images/billboard/' . $billboard->image)) {
                    $billboard->full_image_url = '/storage/images/billboard/' . $billboard->image;
                } elseif (config('app.env') === 'production') {
                    $billboard->full_image_url = url('/google-media/images/billboard/' . $billboard->image);
                } else {
                    $billboard->full_image_url = '/storage/images/billboard/' . $billboard->image;
                }
            }
            return $billboard;
        });

        $post_list = Post::with('user')->orderBy('created_at', 'desc')->limit(50)->get()->map(function ($post) {
            if ($post->anonymus) {
                $post->full_profile_image_url = 'https://ui-avatars.com/api/?name=%3F&color=718096&background=EDF2F7'; // Beautiful anonymous fallback avatar "?"
                return $post;
            }

            $fallbackUrl = 'https://ui-avatars.com/api/?name=' . urlencode($post->user?->name ?? 'User') . '&color=7F9CF5&background=EBF4FF';
            
            if ($post->user && $post->user->profile_image) {
                if (file_exists(public_path('images/profile/' . $post->user->profile_image))) {
                    $post->user->full_profile_image_url = asset('images/profile/' . $post->user->profile_image);
                } elseif (Storage::disk('public')->exists('images/profile/' . $post->user->profile_image)) {
                    $post->user->full_profile_image_url = '/storage/images/profile/' . $post->user->profile_image;
                } elseif (config('app.env') === 'production') {
                    $post->user->full_profile_image_url = url('/google-media/images/profile/' . $post->user->profile_image);
                } else {
                    $post->user->full_profile_image_url = '/storage/images/profile/' . $post->user->profile_image;
                }
            } else {
                if ($post->user) {
                    $post->user->full_profile_image_url = $fallbackUrl;
                }
            }
            return $post;
        });

        $user = $request->user();
        $activeYear = GovernanceYear::current();
        $yearId = $activeYear?->id;
        $year = $activeYear?->year ?? (int) session('selected_year', now()->year);
        $monitoring = [];
        if ($user->canPerform('inventory.view')) {
            $menuScope = fn ($query) => $query->when($yearId, fn ($q) => $q->whereHas('stand', fn ($stand) => $stand->where('year_id', $yearId)));
            $monitoring['Stok menipis'] = $menuScope(MenuItem::query())->where('stock', '<=', 5)->count();
            $monitoring['Menu tanpa resep'] = $menuScope(MenuItem::query())->whereDoesntHave('recipeComponents')->count();
        }
        if ($user->canPerform('sales.manage')) {
            $monitoring['Pengantaran tertunda'] = StandSales::whereNull('delivered_at')->where('send_option', 'delivery')
                ->when($yearId, fn ($query) => $query->whereHas('stand', fn ($stand) => $stand->where('year_id', $yearId)))->count();
        }
        if ($user->canPerform('stands.manage')) {
            $monitoring['Logbook belum valid'] = Logbook::where('validated', 0)->whereYear('created_at', $year)->count();
        }
        if ($user->canPerform('internship.manage')) {
            $monitoring['Internship menunggu review'] = InternshipApplication::where('status', 'pending')->where('internship_year', $year)->count();
        }

        return Inertia::render('Staff/SEEO/Dashboard', [
            'billboard_list' => $billboard_list,
            'attachment_list' => Attachment::all(),
            'post_list' => $post_list,
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
            'monitoring' => $monitoring,
        ]);
    }


    /**
     * Kompres dan ubah gambar upload ke format WebP.
     * Otomatis pakai Imagick jika terpasang di server, jika tidak otomatis fallback ke GD agar tidak error.
     */
    private function encodeImageToWebp($file, int $quality = 60): string
    {
        try {
            $driver = extension_loaded('imagick') ? new ImagickDriver() : new GdDriver();
            $manager = new ImageManager($driver);
            $image = $manager->read($file->getRealPath());
            return (string) $image->toWebp($quality);
        } catch (\Throwable $e) {
            try {
                // Cadangan: coba pakai GD driver jika Imagick gagal
                $manager = new ImageManager(new GdDriver());
                $image = $manager->read($file->getRealPath());
                return (string) $image->toWebp($quality);
            } catch (\Throwable $e2) {
                // Jika kedua driver gagal konversi WebP, simpan file aslinya
                return (string) file_get_contents($file->getRealPath());
            }
        }
    }

    /**
     * Simpan file gambar dengan aman (berlapis):
     * 1. Utama: Simpan ke storage lokal server agar gambar selalu bisa dibuka langsung.
     * 2. Cadangan: Sinkronkan ke Google Drive di production (kalau token Google mati/expired, upload tetap sukses).
     */
    private function storePublicFile(string $relativePath, string $content): void
    {
        // 1. Simpan ke storage lokal (public disk) agar gambar dijamin tersimpan di server hosting
        try {
            Storage::disk('public')->put($relativePath, $content);
        } catch (\Throwable $e) {
            Log::warning("Gagal simpan ke storage public lokal [{$relativePath}]: " . $e->getMessage());
        }

        // 2. Salin langsung ke folder public_path agar web server bisa membaca langsung tanpa symlink
        try {
            $fullPublicPath = public_path($relativePath);
            $dir = dirname($fullPublicPath);
            if (!file_exists($dir)) {
                @mkdir($dir, 0755, true);
            }
            @file_put_contents($fullPublicPath, $content);
        } catch (\Throwable $e) {
            // Abaikan jika permission tidak mengizinkan write langsung
        }

        // 3. Backup ke Google Drive saat production (jika Google Drive error/expired, tidak menggagalkan upload)
        if (config('app.env') === 'production') {
            try {
                Storage::disk('google')->put($relativePath, $content);
            } catch (\Throwable $e) {
                Log::warning("Sinkronisasi Google Drive dilewati/gagal untuk [{$relativePath}]: " . $e->getMessage());
            }
        }
    }

    /**
     * Hapus file gambar dari storage lokal dan Google Drive secara aman tanpa bikin web crash.
     */
    private function deletePublicFile(string $relativePath): void
    {
        try {
            // Hapus dari storage lokal
            Storage::disk('public')->delete($relativePath);
            $fullPublicPath = public_path($relativePath);
            if (file_exists($fullPublicPath)) {
                @unlink($fullPublicPath);
            }
            // Hapus juga dari Google Drive jika di production
            if (config('app.env') === 'production') {
                try {
                    Storage::disk('google')->delete($relativePath);
                } catch (\Throwable $e) {
                    // Abaikan error Google Drive saat hapus file
                }
            }
        } catch (\Throwable $e) {
            Log::warning("Gagal hapus file [{$relativePath}]: " . $e->getMessage());
        }
    }

    // Kelola Billboard (Papan Pengumuman Dashboard)
    function addBillboard(Request $request)
    {
        $request->flash();
        // Validasi input: judul wajib, teks & gambar wajib jika centang tipe aktif
        $request->validate([
            'billboard_title' => 'required|string|max:255',
            'billboard_text' => Rule::requiredIf($request->boolean('billboard_typeText')),
            'billboard_image' => ['nullable', Rule::requiredIf($request->boolean('billboard_typeImage')), File::types(['jpg', 'jpeg', 'png', 'heic', 'webp'])->max(5 * 1024)],
        ]);

        if (!$request->input('billboard_typeImage') && !$request->input('billboard_typeText')) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Pilih minimal satu tipe billboard (gambar atau teks).']);
        }

        try {
            $data = [
                'type' => ($request->input('billboard_typeImage') ? 1 : 0) + ($request->input('billboard_typeText') ? 2 : 0),
                'title' => $request->input('billboard_title'),
                'text' => $request->input('billboard_text'),
            ];

            // Proses upload gambar jika tipe gambar dicentang
            if ($request->input('billboard_typeImage')) {
                if ($request->hasFile('billboard_image')) {
                    $receipt = $request->file('billboard_image');
                    // Kompres gambar ke format webp
                    $receipt_encoded = $this->encodeImageToWebp($receipt, 60);

                    // Buat nama file unik agar tidak bentrok dengan gambar lama
                    $last = Billboard::withTrashed()->orderBy('id', 'desc')->first();
                    $last_id = $last ? $last->id : 0;
                    $receipt_name = 'BB_' . ($last_id + 1) . '_' . time() . '.webp';

                    // Simpan ke storage lokal server & backup ke cloud
                    $this->storePublicFile('images/billboard/' . $receipt_name, $receipt_encoded);

                    $data += ['image' => $receipt_name];
                } else {
                    return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'File gambar masih kosong. Hapus centang gambar jika tidak ingin upload foto.']);
                }
            }

            // Simpan record billboard baru ke database
            Billboard::create($data);
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Billboard baru berhasil ditambahkan.']);
        } catch (\Throwable $e) {
            // Tangani error tak terduga agar tidak keluar halaman error 500
            Log::error('Gagal menambahkan billboard: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return redirect()->back()->with('notif', ['type' => 'danger', 'message' => 'Gagal menambahkan billboard: ' . $e->getMessage()]);
        }
    }

    function updateBillboard(Request $request, $id = 0)
    {
        if ($id == 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Parameter ID tidak valid.']);
        }

        $billboard = Billboard::find($id);
        if (!$billboard) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Data billboard tidak ditemukan.']);
        }

        $request->flash();
        $request->validate([
            'billboard_title' => 'required|string|max:255',
            'billboard_text' => Rule::requiredIf($request->boolean('billboard_typeText')),
            'billboard_image' => ['nullable', Rule::requiredIf($request->boolean('billboard_typeImage') && !$billboard->image), File::types(['jpg', 'jpeg', 'png', 'heic', 'webp'])->max(5 * 1024)],
        ]);

        if (!$request->input('billboard_typeImage') && !$request->input('billboard_typeText')) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Pilih minimal satu tipe billboard.']);
        }

        try {
            $data = [
                'type' => ($request->input('billboard_typeImage') ? 1 : 0) + ($request->input('billboard_typeText') ? 2 : 0),
                'title' => $request->input('billboard_title'),
                'text' => $request->input('billboard_text'),
            ];

            // Kelola pergantian file gambar
            if ($request->input('billboard_typeImage')) {
                if ($request->hasFile('billboard_image')) {
                    // Hapus gambar lama agar storage server tidak penuh
                    if ($billboard->image) {
                        $this->deletePublicFile('images/billboard/' . $billboard->image);
                    }

                    // Upload dan kompres gambar baru
                    $receipt = $request->file('billboard_image');
                    $receipt_encoded = $this->encodeImageToWebp($receipt, 60);
                    $receipt_name = 'BB_' . $id . '_' . time() . '.webp';

                    $this->storePublicFile('images/billboard/' . $receipt_name, $receipt_encoded);

                    $data['image'] = $receipt_name;
                } elseif (!$billboard->image) {
                    return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'File gambar masih kosong.']);
                } else {
                    // Pertahankan gambar yang sudah ada jika tidak upload baru
                    $data['image'] = $billboard->image;
                }
            } else {
                // Jika tipe diubah jadi teks saja, hapus gambar lama
                if ($billboard->image) {
                    $this->deletePublicFile('images/billboard/' . $billboard->image);
                }
                $data['image'] = null;
            }

            $billboard->update($data);

            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Billboard berhasil diperbarui.']);
        } catch (\Throwable $e) {
            Log::error('Gagal memperbarui billboard: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return redirect()->back()->with('notif', ['type' => 'danger', 'message' => 'Gagal memperbarui billboard: ' . $e->getMessage()]);
        }
    }

    function removeBillboard($id = 0)
    {
        if ($id == 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Parameter ID tidak valid.']);
        }
        $billboard = Billboard::find($id);
        if (!$billboard) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Billboard tidak ditemukan. Silakan hubungi administrator.']);
        }

        try {
            // Hapus file gambar dari server & cloud jika ada
            if ($billboard->image) {
                $this->deletePublicFile('images/billboard/' . $billboard->image);
            }
            $title = $billboard->title ?? 'Billboard';
            $billboard->delete();

            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Berhasil menghapus billboard ' . $title . '.']);
        } catch (\Throwable $e) {
            Log::error('Gagal menghapus billboard: ' . $e->getMessage());
            return redirect()->back()->with('notif', ['type' => 'danger', 'message' => 'Gagal menghapus billboard: ' . $e->getMessage()]);
        }
    }

    // Attachment function
    function addAttachment(Request $request)
    {
        $request->flash();
        $input = $request->validate([
            'attachment_type' => 'required|string',
            'attachment_title' => 'required|string|max:255',
            'attachment_link' => ['url:https', Rule::requiredIf($request->input('attachment_type') == 'link'), 'nullable'],
            'attachment_document' => ['file', 'mimes:pdf,docx,png,jpeg,jpg,heic', 'max:5120', Rule::requiredIf($request->input('attachment_type') == 'document'), 'nullable']
        ]);

        try {
            $data = [
                'user_id' => Auth::user()->id,
                'title' => $input['attachment_title'],
            ];

            if ($input['attachment_type'] == 'document') {
                $document = $request->file('attachment_document');
                $document_name = 'af_' . time() . '.' . $document->extension();
                $document_content = (string) file_get_contents($document->getRealPath());

                $this->storePublicFile('document/attachment/' . $document_name, $document_content);

                $data += [
                    'type' => 0,
                    'document' => $document_name
                ];
            } elseif ($input['attachment_type'] == 'link') {
                $data += [
                    'type' => 1,
                    'link' => $input['attachment_link']
                ];
            }

            Attachment::create($data);

            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success add new ' . $input['attachment_type'] . ' attachment']);
        } catch (\Throwable $e) {
            Log::error('Failed to add attachment: ' . $e->getMessage());
            return redirect()->back()->with('notif', ['type' => 'danger', 'message' => 'Gagal menambahkan lampiran: ' . $e->getMessage()]);
        }
    }

    function removeAttachment($id)
    {
        $attachment = Attachment::find($id);
        if (!$attachment) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Attachment doesn`t exist.']);
        }

        try {
            if ($attachment->type == 0 && $attachment->document) {
                $this->deletePublicFile('document/attachment/' . $attachment->document);
            }
            $title = $attachment->title ?? 'Attachment';
            $attachment->delete();
            
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success remove ' . $title . ' from attachment list.']);
        } catch (\Throwable $e) {
            Log::error('Failed to remove attachment: ' . $e->getMessage());
            return redirect()->back()->with('notif', ['type' => 'danger', 'message' => 'Gagal menghapus lampiran: ' . $e->getMessage()]);
        }
    }

    // Post function
    function addPost(Request $request)
    {
        $request->flash();
        $input = $request->validate([
            'post_text' => 'required|string|max:255',
        ]);
        Post::create([
            'user_id' => Auth::user()->id,
            'text' => $input['post_text'],
            'anonymus' => $request->input('post_username') == 'on' ? true : false,
        ]);

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'New post has been added!']);
    }

    function updatePost(Request $request, $id)
    {
        $post = Post::find($id);
        if (!$post) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Post is not exist. Please try again later or ask admin.']);
        }

        $request->flash();
        $input = $request->validate([
            'post_text' => 'required|string|max:255',
        ]);

        $post->update([
            'text' => $input['post_text'],
            'anonymus' => $request->input('post_username') == 'on' ? true : false,
        ]);

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Post has been updated!']);
    }

    function removePost($id)
    {
        $post = Post::find($id);
        if (!$post) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Post is not exist. Please try again later or ask admin.']);
        }
        $post->delete();
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success remove post.']);
    }
}
