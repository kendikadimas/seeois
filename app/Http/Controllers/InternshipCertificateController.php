<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\InternshipCertificate;
use App\Models\InternshipApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class InternshipCertificateController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $user = auth()->user();
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
        $cert = InternshipCertificate::findOrFail($id);
        // Authorization: check via policy
        $this->authorize('download', $cert);
        
        $cert->increment('download_count');
        
        $filePath = storage_path('app/public/' . $cert->file);
        if (!file_exists($filePath)) {
            abort(404, 'File not found');
        }
        
        return response()->download($filePath, 'sertifikat-' . $cert->id . '.pdf');
    }

    // For HR/PIC: list management page
    public function manageIndex()
    {
        $this->authorize('manage', InternshipCertificate::class);
        $applications = InternshipApplication::with('user')->orderBy('created_at','desc')->get();
        $certs = InternshipCertificate::with(['application','recipient','issuer'])->orderBy('created_at','desc')->paginate(30);
        return inertia('Staff/Internship/CertificatesManage', compact('applications','certs'));
    }

    // Store uploaded PDF
    public function store(Request $request)
    {
        $this->authorize('manage', InternshipCertificate::class);

        $data = $request->validate([
            'internship_application_id' => ['required','exists:internship_applications,id'],
            'generated_for_user_id' => ['nullable','exists:users,id'],
            'file' => ['required','file','mimes:pdf','max:20480'], // max 20MB in KB
        ]);

        $path = $request->file('file')->store('internship/certificates', 'public');

        $cert = InternshipCertificate::create([
            'internship_application_id' => $data['internship_application_id'],
            'generated_for_user_id' => $data['generated_for_user_id'] ?? null,
            'file' => $path,
            'status' => 'published',
            'issued_by' => auth()->id(),
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