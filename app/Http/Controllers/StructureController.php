<?php

namespace App\Http\Controllers;

use App\Models\Structure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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
                // Add absolute URL for image
                $q->image_url = $q->image_path ? Storage::disk('public')->url($q->image_path) : null;
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
            'order_num' => 'integer',
            'is_executive' => 'boolean',
        ]);

        $data = $request->except('image_path');

        if ($request->hasFile('image_path')) {
            $data['image_path'] = $request->file('image_path')->store('images/structures', 'public');
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
            'image_path' => 'nullable', // can be file or string
            'order_num' => 'integer',
            'is_executive' => 'boolean',
        ]);

        $data = $request->except('image_path');

        if ($request->hasFile('image_path')) {
            if ($structure->image_path) {
                Storage::disk('public')->delete($structure->image_path);
            }
            $data['image_path'] = $request->file('image_path')->store('images/structures', 'public');
        }

        $structure->update($data);

        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Struktur berhasil diperbarui.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Structure $structure)
    {
        if ($structure->image_path) {
            Storage::disk('public')->delete($structure->image_path);
        }
        $structure->delete();

        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Struktur berhasil dihapus.']);
    }
}
