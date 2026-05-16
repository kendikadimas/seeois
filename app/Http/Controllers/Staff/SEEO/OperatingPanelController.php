<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Models\Logbook;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class OperatingPanelController extends Controller
{
    public function index(): Response
    {
        $logs = Logbook::query()
            ->with(['employee', 'program'])
            ->latest('date_time')
            ->latest('id')
            ->get()
            ->map(function (Logbook $logbook) {
                return [
                    'id' => $logbook->id,
                    'title' => $logbook->title,
                    'date_time' => $logbook->date_time,
                    'validated' => (bool) $logbook->validated,
                    'image' => $logbook->image,
                    'employee' => $logbook->employee ? [
                        'id' => $logbook->employee->id,
                        'name' => $logbook->employee->name,
                    ] : null,
                    'program' => $logbook->program ? [
                        'id' => $logbook->program->id,
                        'name' => $logbook->program->name,
                    ] : null,
                ];
            });

        $staffSummary = User::query()
            ->select('id', 'name', 'roles_id')
            ->whereHas('logbooks')
            ->withCount('logbooks')
            ->orderByDesc('logbooks_count')
            ->get();

        return Inertia::render('Staff/SEEO/OperatingPanel', [
            'logs' => $logs,
            'staffSummary' => $staffSummary,
            'notif' => session('notif'),
            'errors' => session('errors')?->getBag('default')?->getMessages() ?? (object) [],
        ]);
    }
}
