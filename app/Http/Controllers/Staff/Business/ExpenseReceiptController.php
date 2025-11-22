<?php

namespace App\Http\Controllers\Staff\Business;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExpenseReceiptController extends Controller
{
    /**
     * Stream expense receipt image from Google Drive.
     * Always uses the 'google' disk; filenames are validated to prevent path traversal.
     */
    public function showExpenseReceipt(string $filename)
    {
        // Basic filename validation (e.g., SE1991_receipt.webp)
        // Accept both legacy pattern (SE<stand><expense>_receipt.webp without underscore) and new pattern with underscore separator
        if (!preg_match('/^(SE\d+_\d+_receipt\.webp|SE\d+_receipt\.webp)$/', $filename)) {
            abort(404);
        }
        $relativePath = 'images/receipt/stand/expense/' . $filename;
        // Prefer google disk; fallback to public if not found
        $primaryDisk = Storage::disk('google')->exists($relativePath) ? 'google' : null;
        $fallbackDisk = !$primaryDisk && Storage::disk('public')->exists($relativePath) ? 'public' : null;
        $disk = $primaryDisk ?: $fallbackDisk;
        if (!$disk) {
            Log::warning('Expense receipt not found on any disk', ['path' => $relativePath]);
            abort(404);
        }

        // Local cache path (public disk) to speed up subsequent loads
        $cachePath = 'cache/receipt/stand/expense/' . $filename;
        if (!Storage::disk('public')->exists($cachePath)) {
            // Stream from source and store cached copy (avoid double memory reads)
            $stream = Storage::disk($disk)->readStream($relativePath);
            if ($stream) {
                // Write stream to public cache
                Storage::disk('public')->put($cachePath, stream_get_contents($stream));
                if (is_resource($stream)) {
                    fclose($stream);
                }
            }
        }

        // Serve from cache using stream for lower memory footprint
        $responseStream = Storage::disk('public')->readStream($cachePath);
        if (!$responseStream) {
            abort(404);
        }

        return response()->stream(function () use ($responseStream) {
            fpassthru($responseStream);
            if (is_resource($responseStream)) {
                fclose($responseStream);
            }
        }, 200, [
            'Content-Type' => 'image/webp',
            'Cache-Control' => 'public, max-age=86400', // 24h client cache
            'X-Source-Disk' => $disk,
        ]);
    }
}
