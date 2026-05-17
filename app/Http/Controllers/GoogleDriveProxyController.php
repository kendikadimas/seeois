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
        $cacheKey = 'gd_proxy_' . md5($path);
        try {
            $disk = Storage::disk('google');

            $fileData = Cache::remember($cacheKey, 86400, function () use ($disk, $path) {
                // Read the file directly, which is extremely robust
                $content = $disk->get($path);
                if ($content === false || $content === null) {
                    throw new \Exception("File data is empty or could not be read");
                }
                return [
                    'content' => $content,
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
            Cache::forget($cacheKey);
            abort(404, 'Error loading assets');
        }
    }
}
