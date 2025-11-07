<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\InternshipCertificate;
use App\Models\InternshipApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class InternshipCertificateController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $user = Auth::user();
        // Hanya sertifikat published yang ditampilkan ke pemiliknya
        $certs = InternshipCertificate::where('generated_for_user_id', $user->id)
            ->orWhereHas('application', fn($q) => $q->where('user_id', $user->id))
            ->where('status','published')
            ->orderBy('issued_at','desc')
            ->get();

        return inertia('Internship/Certificates/Index', compact('certs'));
    }

    public function download($id)
    {
        $cert = InternshipCertificate::with('recipient')->findOrFail($id);
        $this->authorize('download', $cert);
        
        $filePath = storage_path('app/public/' . $cert->file);
        
        // Get recipient name and format filename
        $recipientName = $cert->recipient?->name ?? 'unknown';
        // Convert to slug: remove special chars, lowercase, replace spaces with underscore
        $recipientSlug = strtoupper(str_replace(' ', '_', preg_replace('/[^a-zA-Z0-9 ]/', '', $recipientName)));
        $fileName = 'SERTIFIKAT_INTERNSHIP25_' . $recipientSlug . '.pdf';
        
        if (!file_exists($filePath)) {
            abort(404, 'File tidak ditemukan');
        }

        if (!is_readable($filePath)) {
            abort(403, 'File tidak bisa dibaca');
        }

        // Track last download timestamp in cache per user per cert
        // Prevent multiple increments within 2 seconds (normal browser behavior)
        $cacheKey = 'cert_download_' . $id . '_' . Auth::id();
        $lastDownload = cache()->get($cacheKey);
        $now = now()->timestamp;
        
        // Only increment if last download was more than 2 seconds ago
        if (!$lastDownload || ($now - $lastDownload) > 2) {
            $cert->increment('download_count');
        }
        
        // Update last download timestamp
        cache()->put($cacheKey, $now, now()->addMinutes(5));

        return response()->download($filePath, $fileName, [
            'Content-Type' => 'application/pdf',
        ]);
    }

    // For HR/PIC: list management page
    public function manageIndex()
    {
        $this->authorize('manage', InternshipCertificate::class);
        // Get all interns (users with role_id = 6 or application users)
        $interns = \App\Models\User::where('roles_id',5)->orderBy('name')->get();
        $certs = InternshipCertificate::with(['application','recipient','issuer'])->orderBy('created_at','desc')->get();
        return inertia('Staff/Internship/CertificatesManage', compact('interns','certs'));
    }

    // Store uploaded PDF
    public function store(Request $request)
    {
        $this->authorize('manage', InternshipCertificate::class);

        $data = $request->validate([
            'generated_for_user_id' => ['required','exists:users,id'],
            'file' => ['required','file','mimes:pdf','max:20480'], // max 20MB in KB
        ]);

        $path = $request->file('file')->store('internship/certificates', 'public');

        $cert = InternshipCertificate::create([
            'internship_application_id' => null,
            'generated_for_user_id' => $data['generated_for_user_id'],
            'file' => $path,
            'status' => 'published',
            'issued_by' => Auth::user()->id,
            'issued_at' => now(),
            'download_token' => Str::random(40),
        ]);

        return back()->with('success', 'Sertifikat berhasil diunggah.');
    }

    // Update certificate
    public function update(Request $request, $id)
    {
        $cert = InternshipCertificate::findOrFail($id);
        $this->authorize('manage', $cert);

        $data = $request->validate([
            'internship_application_id' => ['required','exists:internship_applications,id'],
            'generated_for_user_id' => ['nullable','exists:users,id'],
            'file' => ['nullable','file','mimes:pdf','max:20480'],
        ]);

        if ($request->hasFile('file')) {
            Storage::disk('public')->delete($cert->file);
            $path = $request->file('file')->store('internship/certificates', 'public');
            $cert->file = $path;
        }

        $cert->update([
            'internship_application_id' => $data['internship_application_id'],
            'generated_for_user_id' => $data['generated_for_user_id'] ?? $cert->generated_for_user_id,
        ]);

        return back()->with('success', 'Sertifikat berhasil diperbarui.');
    }

    // Delete certificate
    public function destroy($id)
    {
        $cert = InternshipCertificate::findOrFail($id);
        $this->authorize('manage', $cert);

        Storage::disk('public')->delete($cert->file);
        $cert->delete();

        return back()->with('success', 'Sertifikat berhasil dihapus.');
    }
}