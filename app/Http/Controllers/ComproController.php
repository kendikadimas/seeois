<?php

namespace App\Http\Controllers;

use App\Models\CompanyContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ComproController extends Controller
{
    public function index()
    {
        $items = CompanyContent::orderBy('order')->get();
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
            $data['image_path'] = $request->file('image')->store('images/compro', 'public');
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
            // delete old
            if ($companyContent->image_path) Storage::disk('public')->delete($companyContent->image_path);
            $data['image_path'] = $request->file('image')->store('images/compro', 'public');
        }

        $companyContent->update([
            'value' => $data['value'] ?? $companyContent->value,
            'image_path' => $data['image_path'] ?? $companyContent->image_path,
            'order' => $data['order'] ?? $companyContent->order,
        ]);

        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Content updated']);
    }

    public function destroy(CompanyContent $companyContent)
    {
        if ($companyContent->image_path) Storage::disk('public')->delete($companyContent->image_path);
        $companyContent->delete();
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Content removed']);
    }
}
