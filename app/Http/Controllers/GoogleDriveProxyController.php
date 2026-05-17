<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class GoogleDriveProxyController extends Controller
{
    /**
     * Proxy and stream files securely from Google Drive to avoid public permission & sharing issues.
     */
    public function stream($path)
    {
        try {
            $disk = Storage::disk('google');

            if (!$disk->exists($path)) {
                Log::warning('Google Drive Proxy: File does not exist: ' . $path);
                abort(404, 'File not found');
            }

            // Cache binary files for 24 hours to ensure high speed and low Google API overhead
            $cacheKey = 'gd_proxy_' . md5($path);
            $fileData = Cache::remember($cacheKey, 86400, function () use ($disk, $path) {
                return [
                    'content' => $disk->get($path),
                    'mime' => $disk->mimeType($path) ?? 'image/webp'
                ];
            });

            return Response::make($fileData['content'], 200, [
                'Content-Type' => $fileData['mime'],
                'Cache-Control' => 'public, max-age=31536000, immutable',
                'Access-Control-Allow-Origin' => '*',
            ]);
        } catch (\Throwable $e) {
            Log::error('Google Drive Proxy Error for path (' . $path . '): ' . $e->getMessage());
            abort(404, 'Error loading assets');
        }
    }
}
