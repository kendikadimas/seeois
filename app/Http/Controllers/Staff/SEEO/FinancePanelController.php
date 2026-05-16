<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Models\ContributionReceipt;
use App\Models\DisbursementItem;
use App\Models\DisbursementLetter;
use App\Models\ExpenseItem;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FinancePanelController extends Controller
{
    public function index()
    {
        $pendingContributionReceipts = ContributionReceipt::with(['contribution.employee'])
            ->whereNull('financial_id')
            ->latest()
            ->get();

        $pendingExpenseItems = ExpenseItem::with(['program.department'])
            ->whereNull('financial_id')
            ->latest()
            ->get();

        $pendingDisbursementItems = DisbursementItem::with(['program.department', 'letter'])
            ->whereNull('financial_id')
            ->latest()
            ->get();

        $pendingDisbursementLetters = DisbursementLetter::with(['program.department', 'disbursement'])
            ->doesntHave('disbursement')
            ->latest()
            ->get();

        return Inertia::render('Staff/SEEO/FinancePanel', [
            'pendingContributionReceipts' => $pendingContributionReceipts,
            'pendingExpenseItems' => $pendingExpenseItems,
            'pendingDisbursementItems' => $pendingDisbursementItems,
            'pendingDisbursementLetters' => $pendingDisbursementLetters,
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ]);
    }
}
