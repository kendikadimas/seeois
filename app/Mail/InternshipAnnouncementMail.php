<?php

namespace App\Mail;

use App\Models\InternshipApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InternshipAnnouncementMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public InternshipApplication $application,
        public string $decision,
        public ?string $note = null,
    ) {
    }

    public function envelope(): Envelope
    {
        $subject = $this->decision === 'accepted'
            ? 'Hasil Seleksi Internship SEEO'
            : 'Informasi Seleksi Internship SEEO';

        return new Envelope(subject: $subject);
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.internship-announcement',
            with: [
                'application' => $this->application,
                'decision' => $this->decision,
                'note' => $this->note,
            ],
        );
    }
}
