<?php

namespace App\Http\Controllers;

use App\Models\InternshipApplication;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\Drivers\Imagick\Driver as ImagickDriver;
use Illuminate\Support\Facades\Storage;

class InternshipApplicationController extends Controller
{
    /**
     * Menampilkan daftar pendaftar internship.
     * Hanya dapat diakses oleh CEO, Co-CEO, HR Manager, dan PIC Internship.
     */
    public function index()
    {
        // Cek apakah user sudah login
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Anda harus login terlebih dahulu untuk melihat data pendaftar internship.');
        }
        
        // Double check authorization di controller
        $user = Auth::user();
        
        // Debug info
        Log::info('User trying to access internship applications', [
            'user_id' => $user->id,
            'user_name' => $user->name,
            'roles_id' => $user->roles_id,
        ]);
        
        // Ambil program Internship di awal agar bisa digunakan di semua scope
        $internshipProgram = Program::where('name', 'Internship')->first();
        
        Log::info('Checking internship program', [
            'program_found' => $internshipProgram ? true : false,
            'program_pic_id' => $internshipProgram ? $internshipProgram->pic_id : null,
            'user_id' => $user->id
        ]);
        
        // Definisi role yang diizinkan akses:
        // 1 = CEO, 5 = Co-CEO, 6 = HR Manager
        $allowedRoles = [1, 5, 6]; // CEO, Co-CEO, HR Manager
        
        // Cek apakah user memiliki role yang diizinkan
        $hasAllowedRole = in_array($user->roles_id, $allowedRoles);
        
        // Cek apakah user adalah PIC Internship
        $isPICInternship = $internshipProgram && $user->id === $internshipProgram->pic_id;
        
        // Jika bukan role yang diizinkan dan bukan PIC Internship, tolak akses
        if (!$hasAllowedRole && !$isPICInternship) {
            abort(403, 'Anda tidak memiliki akses untuk melihat data pendaftar internship. Hanya CEO, Co-CEO, HR Manager, dan PIC Internship yang dapat mengakses halaman ini.');
        }

        // Ambil semua data aplikasi, diurutkan dari yang terbaru
        $applications = InternshipApplication::latest()->get();

        // Log akses
        Log::info('Data pendaftar internship diakses', [
            'user_id' => $user->id,
            'user_name' => $user->name,
            'user_role' => $user->roles_id,
            'total_applications' => $applications->count(),
            'accessed_at' => now()
        ]);

        // Render komponen Vue dan kirim data 'applications' sebagai props
        return Inertia::render('Internship/Index', [
            'applications' => $applications,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'role_id' => $user->roles_id,
                'is_ceo' => $user->roles_id === 1,
                'is_co_ceo' => $user->roles_id === 5,
                'is_hr_manager' => $user->roles_id === 6,
                'is_internship_pic' => $internshipProgram && $user->id === $internshipProgram->pic_id,
                'has_management_access' => in_array($user->roles_id, [1, 5, 6]) || ($internshipProgram && $user->id === $internshipProgram->pic_id)
            ]
        ]);
    }
    
    /**
     * Menampilkan halaman form pendaftaran.
     * Dapat diakses oleh semua orang (public).
     */
    public function create(Request $request)
    {
        // Cek apakah sudah pernah submit berdasarkan session/IP
        $hasSubmitted = false;
        $submissionData = null;
        
        // Cek berdasarkan session jika ada
        if ($request->session()->has('internship_submitted')) {
            $hasSubmitted = true;
            $submissionData = $request->session()->get('internship_submission_data');
        }
        
        // Jika belum submit berdasarkan session, cek berdasarkan IP address
        if (!$hasSubmitted) {
            $clientIp = $request->ip();
            $recentSubmission = InternshipApplication::where('ip_address', $clientIp)
                ->where('created_at', '>=', now()->subHours(24)) // dalam 24 jam terakhir
                ->first();
                
            if ($recentSubmission) {
                $hasSubmitted = true;
                $submissionData = $recentSubmission;
                
                // Set session untuk menghindari query ulang
                $request->session()->put('internship_submitted', true);
                $request->session()->put('internship_submission_data', $recentSubmission);
            }
        }
        
        // Render komponen Vue dengan status submission
        return Inertia::render('Internship/Register', [
            'hasSubmitted' => $hasSubmitted,
            'submissionData' => $submissionData
        ]);
    }

    /**
     * Menyimpan data pendaftaran baru.
     * Dapat diakses oleh semua orang (public).
     */
    public function store(Request $request)
    {
        try {
            Log::info('Store method called', $request->all());
            
            // Validasi dengan batasan per pengunjung (NIM dan phone_number harus unique)
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'nim' => 'required|string|max:20|unique:internship_applications,nim',
                'phone_number' => 'required|string|max:15|unique:internship_applications,phone_number',
                'krs_photo' => 'required|file|mimes:jpeg,png,jpg,pdf|max:2048',
                'email_username' => 'required|string|max:100',
                'study_program' => 'required|string|max:255',
                'division_choice_1' => 'required|string|max:255',
                'reason_choice_1' => 'required|string',
                'division_choice_2' => 'required|string|max:255|different:division_choice_1',
                'reason_choice_2' => 'required|string',
                'willing_to_be_placed_elsewhere' => 'required|boolean',
            ], [
                'nim.unique' => 'NIM ini sudah terdaftar. Setiap pengunjung hanya dapat mendaftar sekali.',
                'phone_number.unique' => 'Nomor telepon ini sudah terdaftar. Setiap pengunjung hanya dapat mendaftar sekali.',
            ]);
            
            Log::info('Validation passed');
                    
            $krsFile = $request->file('krs_photo');
            $nameSlug = \Illuminate\Support\Str::slug($validatedData['name'], '_');
            $nim = $validatedData['nim'];

            // Prepare content depending on mime type (convert images to webp, keep PDF as is)
            $mimeType = $krsFile->getMimeType();
            $fileName = "krs_{$nim}_{$nameSlug}.webp";
            $content = null;

            try {
                if ($mimeType !== 'application/pdf') {
                    // Tentukan driver image berdasarkan environment
                    $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
                    $manager = new ImageManager($driver);

                    // Baca gambar dan konversi ke format WebP untuk efisiensi
                    $image = $manager->read($krsFile->getRealPath());
                    $content = $image->toWebp(75); // Kualitas 75%
                    $fileName = "krs_{$nim}_{$nameSlug}.webp";
                } else {
                    // Jika PDF, langsung baca kontennya
                    $content = file_get_contents($krsFile->getRealPath());
                    $fileName = "krs_{$nim}_{$nameSlug}.pdf";
                }

                // Force menggunakan disk Google untuk internship KRS
                $disk = 'google';
                Log::info('Using disk for KRS storage', ['disk' => $disk, 'app_env' => config('app.env')]);

                // Simpan file menggunakan Laravel Storage abstraction
                $storagePath = 'internship/krs/' . $fileName;
                $stored = Storage::disk($disk)->put($storagePath, $content);

                if (!$stored) {
                    Log::error('Storage::put returned false when saving KRS', ['disk' => $disk, 'path' => $storagePath]);
                    return back()->withErrors(['general' => 'Gagal menyimpan file KRS. Silakan coba lagi.'])->withInput();
                }

                // Jika disk Google, coba ambil URL (tergantung adapter) untuk mempermudah akses
                try {
                    if ($disk === 'google') {
                        // Beberapa adapter menyediakan metode url(); jika tidak, fallback ke path
                        $krsUrl = Storage::disk($disk)->url($storagePath);
                        $krsPath = $krsUrl ?: $storagePath;
                    } else {
                        $krsPath = $storagePath;
                    }
                } catch (\Exception $e) {
                    // Adapter mungkin tidak mendukung url(); gunakan path sebagai fallback
                    Log::warning('Unable to get URL from storage disk: ' . $e->getMessage(), ['disk' => $disk, 'path' => $storagePath]);
                    $krsPath = $storagePath;
                }

                Log::info('File KRS berhasil disimpan ke disk', ['disk' => $disk, 'path' => $krsPath]);
            } catch (\Exception $e) {
                Log::error('Gagal menyimpan file KRS: ' . $e->getMessage());
                Log::error('Stack trace: ' . $e->getTraceAsString());
                return back()->withErrors(['general' => 'Terjadi kesalahan sistem saat mengunggah file KRS. Silakan coba lagi.'])->withInput();
            }
            
            $fullEmail = $validatedData['email_username'] . '@mhs.unsoed.ac.id';
            
            // Proses simpan data
            $application = InternshipApplication::create([
                'name' => $validatedData['name'],
                'nim' => $validatedData['nim'],
                'phone_number' => $validatedData['phone_number'],
                'krs_path' => $krsPath,
                'email' => $fullEmail,
                'study_program' => $validatedData['study_program'],
                'division_choice_1' => $validatedData['division_choice_1'],
                'reason_choice_1' => $validatedData['reason_choice_1'],
                'division_choice_2' => $validatedData['division_choice_2'],
                'reason_choice_2' => $validatedData['reason_choice_2'],
                'willing_to_be_placed_elsewhere' => $validatedData['willing_to_be_placed_elsewhere'],
                'ip_address' => $request->ip(),
            ]);
            
            // Set session untuk mencegah submit ulang
            $request->session()->put('internship_submitted', true);
            $request->session()->put('internship_submission_data', $application);
            
            Log::info('Data saved successfully', ['id' => $application->id]);

            // Log pendaftaran baru
            Log::info('Pendaftaran internship baru', [
                'application_id' => $application->id,
                'name' => $application->name,
                'nim' => $application->nim,
                'study_program' => $application->study_program,
                'division_1' => $application->division_choice_1,
                'division_2' => $application->division_choice_2,
                'registered_at' => now()
            ]);

            // Menggunakan Inertia render dengan flash data
            return Inertia::render('Internship/Register', [
                'flash' => [
                    'success' => 'Pendaftaran Anda berhasil dikirim. Terima kasih!',
                    'whatsapp_link' => 'https://chat.whatsapp.com/Ef6sbho6nQ6CIVw7HnLqaB'
                ]
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error in store method: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return back()->withErrors([
                'general' => 'Terjadi kesalahan saat menyimpan data. Silakan coba lagi.'
            ])->withInput();
        }
    }
}