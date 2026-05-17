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

            // Retrieve from cache
            $fileData = Cache::get($cacheKey);

            // If cache is empty or has invalid/empty content, fetch fresh from Google Drive
            // Using content_base64 is 100% safe for database-backed cache drivers (preventing SQLSTATE encoding errors)
            if (!$fileData || !is_array($fileData) || empty($fileData['content_base64'])) {
                // Clear the cache key to be clean
                Cache::forget($cacheKey);

                $content = $disk->get($path);
                if ($content === false || $content === null || empty($content)) {
                    throw new \Exception("File data is empty or could not be read");
                }

                $fileData = [
                    'content_base64' => base64_encode($content),
                    'mime' => $disk->mimeType($path) ?? 'image/webp'
                ];

                // Cache successful read for 24 hours
                Cache::put($cacheKey, $fileData, 86400);
            }

            $rawContent = base64_decode($fileData['content_base64']);

            // Safely clear any previous output buffers to avoid contamination and browser ERR_INVALID_RESPONSE
            if (ob_get_level()) {
                ob_end_clean();
            }

            return Response::make($rawContent, 200, [
                'Content-Type' => $fileData['mime'],
                'Cache-Control' => 'public, max-age=31536000, immutable',
                'Access-Control-Allow-Origin' => '*',
            ]);
        } catch (\Throwable $e) {
            Log::error('Google Drive Proxy Error for path (' . $path . '): ' . $e->getMessage());
            Cache::forget($cacheKey);
            
            if (ob_get_level()) {
                ob_end_clean();
            }
            
            return response("Google Drive Proxy Error for path [$path]:\n" . $e->getMessage() . "\n\nStack Trace:\n" . $e->getTraceAsString(), 500)
                ->header('Content-Type', 'text/plain');
        }
    }
}
