<?php

namespace App\Http\Controllers;

use App\Models\Structure;
use App\Support\MediaStorage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StructureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $structures = Structure::orderBy('order_num')->get();
        return Inertia::render('Staff/Marketing/Structures', [
            'structures' => $structures->map(function ($q) {
                $q->image_url = MediaStorage::url($q->image_path);
                return $q;
            })
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'role_title' => 'required|string|max:255',
            'department_name' => 'nullable|string|max:255',
            'image_path' => 'nullable|image|max:2048',
            'order_num' => 'nullable|integer|min:0',
            'is_executive' => 'boolean',
        ]);

        $data = $request->except('image_path');

        if ($request->hasFile('image_path')) {
            $data['image_path'] = $request->file('image_path')->store('images/structures', MediaStorage::diskName());
        }

        Structure::create($data);

        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Struktur berhasil ditambahkan.']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Structure $structure)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'role_title' => 'required|string|max:255',
            'department_name' => 'nullable|string|max:255',
            'image_path' => 'nullable|image|max:2048',
            'order_num' => 'nullable|integer|min:0',
            'is_executive' => 'boolean',
        ]);

        $data = $request->except('image_path');

        if ($request->hasFile('image_path')) {
            $oldImagePath = $structure->image_path;
            $data['image_path'] = $request->file('image_path')->store('images/structures', MediaStorage::diskName());
        }

        $structure->update($data);

        if (isset($oldImagePath) && $oldImagePath !== $structure->image_path) {
            MediaStorage::disk()->delete($oldImagePath);
        }

        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Struktur berhasil diperbarui.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Structure $structure)
    {
        $imagePath = $structure->image_path;
        $structure->delete();

        if ($imagePath) {
            MediaStorage::disk()->delete($imagePath);
        }

        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Struktur berhasil dihapus.']);
    }
}
