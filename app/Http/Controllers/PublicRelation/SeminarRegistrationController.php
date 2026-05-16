<?php

namespace App\Http\Controllers\PublicRelation;

use App\Http\Controllers\Controller;
use App\Models\EventRegistration;
use App\Models\SeminarEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class SeminarRegistrationController extends Controller
{
    /**
     * Public: Show the registration form for a specific event
     */
    public function create(SeminarEvent $event): Response
    {
        if (!$event->is_active) {
            abort(404, 'Pendaftaran untuk event ini sudah ditutup.');
        }

        return Inertia::render('Public/SeminarRegister', [
            'event' => $event,
            'eventName' => $event->name, // Keep for backward compatibility
            'waLink' => $event->wa_link, // Keep for backward compatibility
            'notif' => session('notif'),
            'errors' => session('errors')?->getBag('default')?->getMessages() ?? (object) [],
        ]);
    }

    /**
     * Public: Store a new registration
     */
    public function store(Request $request, SeminarEvent $event)
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'institution' => ['nullable', 'string', 'max:255'],
            'job_title' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
        ]);

        $validated['event_id'] = $event->id;
        $validated['event_name'] = $event->name;

        EventRegistration::create($validated);

        return redirect()
            ->back()
            ->with('notif', ['type' => 'info', 'message' => 'Pendaftaran seminar berhasil dikirim.']);
    }

    /**
     * Staff: List all events
     */
    public function index(): Response
    {
        $events = SeminarEvent::withCount('registrations')->latest()->get();

        return Inertia::render('Staff/SEEO/SeminarRegistrations', [
            'events' => $events,
            'notif' => session('notif'),
        ]);
    }

    /**
     * Staff: Store a new event
     */
    public function storeEvent(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'wa_link' => ['nullable', 'url', 'max:255'],
        ]);

        SeminarEvent::create($validated);

        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Event pendaftaran baru berhasil ditambahkan.']);
    }

    /**
     * Staff: Toggle event active status
     */
    public function toggleEvent(SeminarEvent $event)
    {
        $event->update(['is_active' => !$event->is_active]);
        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Status event berhasil diubah.']);
    }

    /**
     * Staff: Delete an event
     */
    public function destroyEvent(SeminarEvent $event)
    {
        $event->delete();
        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Event berhasil dihapus.']);
    }

    /**
     * Staff: View registrations for a specific event
     */
    public function viewRegistrations(SeminarEvent $event): Response
    {
        $registrations = $event->registrations()->latest()->get();

        return Inertia::render('Staff/SEEO/SeminarRegistrationsDetail', [
            'event' => $event,
            'registrations' => $registrations,
            'notif' => session('notif'),
        ]);
    }

    /**
     * Staff: Delete a single registration
     */
    public function destroy(EventRegistration $registration)
    {
        $registration->delete();
        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Data registrasi berhasil dihapus.']);
    }

    /**
     * Staff: Clear all registrations for an event
     */
    public function clearAll(SeminarEvent $event)
    {
        $event->registrations()->delete();
        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Seluruh data registrasi untuk event ini berhasil dikosongkan.']);
    }

    /**
     * Staff: Export registrations for an event
     */
    public function export(SeminarEvent $event)
    {
        $registrations = $event->registrations;
        $csvHeader = ['ID', 'Full Name', 'Email', 'Phone', 'Institution', 'Job Title', 'Notes', 'Registered At'];
        
        $callback = function() use ($registrations, $csvHeader) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $csvHeader);

            foreach ($registrations as $row) {
                fputcsv($file, [
                    $row->id,
                    $row->full_name,
                    $row->email,
                    $row->phone,
                    $row->institution,
                    $row->job_title,
                    $row->notes,
                    $row->created_at,
                ]);
            }
            fclose($file);
        };

        return response()->streamDownload($callback, 'registrations_' . Str::slug($event->name) . '_' . date('Y-m-d') . '.csv', [
            'Content-Type' => 'text/csv',
        ]);
    }
}
