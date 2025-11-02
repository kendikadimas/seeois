<?php

namespace App\Policies;

use App\Models\InternshipCertificate;
use App\Models\Program;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class InternshipCertificatePolicy
{
    use HandlesAuthorization;

    /**
     * Get the internship program (hardcoded to find Internship program)
     * Or you can pass program_id as parameter if needed
     */
    private function getInternshipProgram(): ?Program
    {
        // Find the Internship program - you can filter by name or ID
        return Program::where('name', 'like', '%internship%')
            ->orWhere('name', 'like', '%Magang%')
            ->first() ?? Program::find(5); // Fallback to program ID 5 if available
    }

    /**
     * Determine if user can manage (view all, create, update, delete) certificates
     * Only the PIC (Person In Charge) of internship program can manage
     */
    public function manage(User $user, ?InternshipCertificate $certificate = null): bool
    {
        $internshipProgram = $this->getInternshipProgram();
        
        if (!$internshipProgram) {
            return false;
        }

        // Check if user is the PIC of internship program
        return $user->id === $internshipProgram->pic_id;
    }

    /**
     * Determine if user can view a specific certificate
     * Only the recipient or the PIC can view
     */
    public function view(User $user, InternshipCertificate $certificate): bool
    {
        // Owner (recipient) can view their own certificate
        if ($certificate->generated_for_user_id === $user->id) {
            return true;
        }

        // PIC of internship program can view any certificate
        return $this->manage($user, $certificate);
    }

    /**
     * Determine if user can download a certificate
     */
    public function download(User $user, InternshipCertificate $certificate): bool
    {
        return $this->view($user, $certificate);
    }

    /**
     * Determine if user can create a certificate
     */
    public function create(User $user): bool
    {
        return $this->manage($user);
    }

    /**
     * Determine if user can update a certificate
     */
    public function update(User $user, InternshipCertificate $certificate): bool
    {
        return $this->manage($user, $certificate);
    }

    /**
     * Determine if user can delete a certificate
     */
    public function delete(User $user, InternshipCertificate $certificate): bool
    {
        return $this->manage($user, $certificate);
    }
}
