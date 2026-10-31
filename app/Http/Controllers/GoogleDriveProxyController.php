<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class GoogleDriveProxyController extends Controller
{
    /**
     * Proxy dan streaming file gambar/dokumen secara aman:
     * 1. Cek langsung storage lokal (paling cepat & tidak butuh internet).
     * 2. Jika di lokal belum ada, ambil dari Google Drive dan simpan di cache.
     * 3. Jika file tidak ada atau Google Drive gagal, beri respon 404 (bukan error 500).
     */
    public function stream($path)
    {
        // 1. Cek langsung file di folder public lokal (paling cepat, tanpa beban jaringan)
        $publicFile = public_path($path);
        if (file_exists($publicFile) && is_file($publicFile)) {
            if (ob_get_level()) {
                ob_end_clean();
            }
            $mime = mime_content_type($publicFile) ?: 'image/webp';
            return Response::make(file_get_contents($publicFile), 200, [
                'Content-Type' => $mime,
                'Cache-Control' => 'public, max-age=31536000, immutable',
                'Access-Control-Allow-Origin' => '*',
            ]);
        }

        // 2. Cek di disk storage lokal (storage/app/public)
        if (Storage::disk('public')->exists($path)) {
            if (ob_get_level()) {
                ob_end_clean();
            }
            $content = Storage::disk('public')->get($path);
            $mime = Storage::disk('public')->mimeType($path) ?? 'image/webp';
            return Response::make($content, 200, [
                'Content-Type' => $mime,
                'Cache-Control' => 'public, max-age=31536000, immutable',
                'Access-Control-Allow-Origin' => '*',
            ]);
        }

        // 3. Cadangan: Ambil dari Google Drive jika tidak ada di storage lokal
        $cacheKey = 'gd_proxy_' . md5($path);
        try {
            $disk = Storage::disk('google');

            // Ambil dari cache sistem
            $fileData = Cache::get($cacheKey);

            // Jika cache kosong, unduh file segar dari Google Drive
            if (!$fileData || !is_array($fileData) || empty($fileData['content_base64'])) {
                Cache::forget($cacheKey);

                $content = $disk->get($path);
                if ($content === false || $content === null || empty($content)) {
                    throw new \Exception("File kosong atau tidak dapat dibaca");
                }

                $fileData = [
                    'content_base64' => base64_encode($content),
                    'mime' => $disk->mimeType($path) ?? 'image/webp'
                ];

                // Simpan di cache selama 24 jam agar loading cepat
                Cache::put($cacheKey, $fileData, 86400);
            }

            $rawContent = base64_decode($fileData['content_base64']);

            // Bersihkan buffer output agar respon gambar tidak rusak
            if (ob_get_level()) {
                ob_end_clean();
            }

            return Response::make($rawContent, 200, [
                'Content-Type' => $fileData['mime'],
                'Cache-Control' => 'public, max-age=31536000, immutable',
                'Access-Control-Allow-Origin' => '*',
            ]);
        } catch (\Throwable $e) {
            Log::warning('Peringatan Google Drive Proxy untuk path (' . $path . '): ' . $e->getMessage());
            Cache::forget($cacheKey);
            
            if (ob_get_level()) {
                ob_end_clean();
            }
            
            // Kembalikan 404 jika file tidak ada/Google Drive tidak bisa diakses (bukan error 500)
            return response("File tidak ditemukan atau storage belum tersedia untuk path [$path]", 404)
                ->header('Content-Type', 'text/plain');
        }
    }
}
