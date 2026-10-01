<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\ScopedByYear;
use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PinnedDocController extends Controller
{
    use ScopedByYear;

    public function index()
    {
        [$activeYear] = $this->activeYearScope();
        $defaultYear  = $activeYear?->year ?? now()->year;

        $pinnedDocs = Attachment::where('is_pinned', true)
            ->with('user')
            ->orderBy('pinned_year', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Staff/SEEO/PinnedDocs', [
            'pinnedDocs'  => $pinnedDocs,
            'defaultYear' => $defaultYear,
        ]);
    }

    public function store(Request $request)
    {
        [$activeYear] = $this->activeYearScope();
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'document'    => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'link'        => 'nullable|url',
            'pinned_year' => 'nullable|integer|min:2000|max:2099',
            'type'        => 'nullable|integer',
        ]);

        $attachmentData = [
            'user_id'     => Auth::id() ?: 1,
            'is_pinned'   => true,
            'title'       => $data['title'],
            'link'        => $data['link'] ?? null,
            'pinned_year' => $data['pinned_year'] ?? $activeYear?->year ?? now()->year,
            'type'        => $data['type'] ?? 1,
        ];

        if ($request->hasFile('document')) {
            $attachmentData['document'] = $request->file('document')->store('documents/pinned', 'public');
        }

        Attachment::create($attachmentData);

        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Pinned document added']);
    }

    public function update(Request $request, Attachment $pinnedDoc)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'document'    => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'link'        => 'nullable|url',
            'pinned_year' => 'nullable|integer|min:2000|max:2099',
        ]);

        if ($request->hasFile('document')) {
            $oldDocument = $pinnedDoc->document;
            $data['document'] = $request->file('document')->store('documents/pinned', 'public');
            $pinnedDoc->update(['document' => $data['document']]);

            if ($oldDocument && $oldDocument !== $data['document']) {
                Storage::disk('public')->delete($oldDocument);
            }
        }

        $pinnedDoc->update([
            'title' => $data['title'],
            'link' => $data['link'] ?? null,
            'pinned_year' => $data['pinned_year'],
        ]);

        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Pinned document updated']);
    }

    public function destroy(Attachment $pinnedDoc)
    {
        $document = $pinnedDoc->document;
        $pinnedDoc->delete();

        if ($document) {
            Storage::disk('public')->delete($document);
        }
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Pinned document removed']);
    }
}
