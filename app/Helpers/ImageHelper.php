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
        // Prioritas 1: Production - images dalam public/images/
        $publicImagesPath = public_path('images/' . $path);
        if (file_exists($publicImagesPath)) {
            return asset('images/' . $path);
        }

        // Prioritas 2: Production symlink - storage/app/public/images/ via /storage/
        $storagePublicPath = storage_path('app/public/images/' . $path);
        if (file_exists($storagePublicPath)) {
            // Check if storage:link has been run (symlink exists)
            if (file_exists(public_path('storage'))) {
                return asset('storage/images/' . $path);
            }
            // Fallback jika symlink belum ada tapi file exists
            return '/storage/app/public/images/' . $path;
        }

        // Prioritas 3: Backward compatibility - storage/app/local/images/
        $localPath = storage_path('app/local/images/' . $path);
        if (file_exists($localPath)) {
            return asset('storage/local/images/' . $path);
        }

        // Prioritas 4: Development - just use /images/ directly
        return '/images/' . $path;
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
