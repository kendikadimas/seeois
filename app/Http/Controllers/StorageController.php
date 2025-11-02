<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class StorageController extends Controller
{
    public function show($path = '/')
    {
        $pathArray = explode('/', $path);
        // Remove empty elements
        $pathArray = array_filter($pathArray);
        // Convert to Laravel Collection
        $pathCollection = collect($pathArray);
        // return $pathCollection->first() != "local" && config('app.env') == 'production' ? $this->show_gdrive($path) : $this->show_local($path);
        if ($pathCollection->first() !== 'local') {
            return $this->show_gdrive($path);
        } else {
            return $this->show_local($path);
        }
    }

    public function show_gdrive($path = '/')
    {
        // Check if the file exists in the Google Drive disk
        if (Storage::disk('google')->exists($path)) {
            $file = Storage::disk('google')->get($path);
            $mimeType = Storage::disk('google')->mimeType($path);
            return response($file, 200)->header('Content-Type', $mimeType);
        }
        // If file does not exist, return a 404 response
        abort(404);
    }

    public function show_local($path = '/')
    {
        $path = Str::of($path)->remove('local/');
        // Check if the file exists in the Google Drive disk
        if (Storage::disk('public')->exists($path)) {
            $file = Storage::disk('public')->get($path);
            $mimeType = Storage::disk('public')->mimeType($path);
            return response($file, 200)->header('Content-Type', $mimeType);
        }
        // If file does not exist, return a 404 response
        abort(404);
    }
}
