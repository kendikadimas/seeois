<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Models\CashInItem;
use App\Models\ContributionConfig;
use App\Models\ContributionReceipt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IwpPanelController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $query = ContributionReceipt::with(['contribution.employee', 'financial'])
            ->whereNull('financial_id');

        if ($search) {
            $query->whereHas('contribution.employee', function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%');
            });
        }

        $pendingReceipts = $query->latest()
            ->get()
            ->map(function ($receipt) {
                // Forcing public for now as per previous fix to avoid 401
                $receipt->image_url = \Illuminate\Support\Facades\Storage::disk('public')->url('images/receipt/contribution/' . $receipt->receipt);
                return $receipt;
            });

        return Inertia::render('Staff/SEEO/IwpPanel', [
            'pendingReceipts' => $pendingReceipts,
            'filters' => [
                'search' => $search
            ],
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ]);
    }

    public function validateReceipt($id)
    {
        $receipt = ContributionReceipt::with('contribution')->find($id);
        if (!$receipt) {
            return back()->with('notif', ['type' => 'warning', 'message' => 'Receipt not found.']);
        }

        $cashIn = CashInItem::where('name', '=', 'Contribution Charge')->first();
        $config = ContributionConfig::first();
        if (!$cashIn || !$config) {
            return back()->with('notif', ['type' => 'warning', 'message' => 'Contribution configuration is missing.']);
        }

        if (!$receipt->financial_id) {
            $receipt->financial_id = Auth::id();
            $receipt->contribution->months += $receipt->months;
            $cashIn->price += $receipt->months * $config->price;
            $message = 'Success validate ' . $receipt->receipt . '.';
        } else {
            $receipt->financial_id = null;
            $receipt->contribution->months -= $receipt->months;
            $cashIn->price -= $receipt->months * $config->price;
            $message = 'Success unvalidate ' . $receipt->receipt . '.';
        }

        if ($receipt->contribution->save() && $receipt->save() && $cashIn->save()) {
            return back()->with('notif', ['type' => 'info', 'message' => $message]);
        }

        return back()->with('notif', ['type' => 'warning', 'message' => 'Failed to update receipt status.']);
    }
}
