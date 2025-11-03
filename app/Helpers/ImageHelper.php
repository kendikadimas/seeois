<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ImageHelper
{
    /**
     * Get image URL yang kompatibel untuk local dan production
     * 
     * @param string $path - Path relatif ke gambar (contoh: 'compro/seeo.jpg')
     * @return string - URL yang bisa diakses
     */
    public static function url($path)
    {
        // Untuk production (cpanel), gunakan public folder
        $publicPath = public_path('images/' . $path);
        if (file_exists($publicPath)) {
            return asset('images/' . $path);
        }

        // Untuk local, cek di storage/app/public
        $storagePath = storage_path('app/public/images/' . $path);
        if (file_exists($storagePath)) {
            return asset('storage/images/' . $path);
        }

        // Fallback ke storage local (untuk kompatibilitas)
        $localPath = storage_path('app/local/images/' . $path);
        if (file_exists($localPath)) {
            return asset('storage/local/images/' . $path);
        }

        // Return placeholder jika gambar tidak ditemukan
        return asset('images/placeholder.jpg');
    }

    /**
     * Check apakah gambar ada di salah satu lokasi
     */
    public static function exists($path)
    {
        return file_exists(public_path('images/' . $path)) ||
               file_exists(storage_path('app/public/images/' . $path)) ||
               file_exists(storage_path('app/local/images/' . $path));
    }
}
