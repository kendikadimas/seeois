<?php

namespace App\Http\Controllers;

use App\Models\CompanyContent;
use App\Support\MediaStorage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComproController extends Controller
{
    public function index()
    {
        $items = CompanyContent::orderBy('order')->get()->each(function (CompanyContent $item) {
            $item->image_url = MediaStorage::url($item->image_path);
        });
        return Inertia::render('Staff/Marketing/Compro', [
            'items' => $items,
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'key' => 'required|string|max:191|unique:company_contents,key',
            'value' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
            'order' => 'integer',
        ]);

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('images/compro', MediaStorage::diskName());
        }

        CompanyContent::create([
            'key' => $data['key'],
            'value' => $data['value'] ?? null,
            'image_path' => $data['image_path'] ?? null,
            'order' => $data['order'] ?? 0,
        ]);

        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Content added']);
    }

    public function update(Request $request, CompanyContent $companyContent)
    {
        $data = $request->validate([
            'value' => 'nullable|string',
            'image' => 'nullable|image|max:5120',
            'order' => 'integer',
        ]);

        if ($request->hasFile('image')) {
            $oldImagePath = $companyContent->image_path;
            $data['image_path'] = $request->file('image')->store('images/compro', MediaStorage::diskName());
        }

        $companyContent->update([
            'value' => $data['value'] ?? null,
            'image_path' => $data['image_path'] ?? $companyContent->image_path,
            'order' => $data['order'] ?? $companyContent->order,
        ]);

        if (isset($oldImagePath) && $oldImagePath !== $companyContent->image_path) {
            MediaStorage::disk()->delete($oldImagePath);
        }

        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Content updated']);
    }

    public function destroy(CompanyContent $companyContent)
    {
        $imagePath = $companyContent->image_path;
        $companyContent->delete();

        if ($imagePath) {
            MediaStorage::disk()->delete($imagePath);
        }
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Content removed']);
    }
}
