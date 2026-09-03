<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\CustomerFeedback;
use App\Models\User;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CustomerController extends Controller
{
    function profile()
    {
        return Inertia::render('Public/Profile', [
            'notif' => session('notif'),
        ]);
    }
    function insertFeedback(Request $request)
    {
        $validated = $request->validate([
            'rate' => ['required', 'integer', 'between:1,5'],
            'feedback' => ['required', 'string', 'max:255'],
        ]);

        $feedback = CustomerFeedback::where('customer_id', Auth::id())->first();
        $wasUpdated = $feedback !== null;

        CustomerFeedback::updateOrCreate(
            ['customer_id' => Auth::id()],
            ['rate' => $validated['rate'], 'message' => $validated['feedback']],
        );

        if ($wasUpdated) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Thank you! Your rating and feedback has been updated and saved.']);
        }

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Thank you for your rating and feedback.']);
    }

    function redeemVoucher($voucher_id)
    {
        $result = DB::transaction(function () use ($voucher_id) {
            $user = User::query()->lockForUpdate()->findOrFail(Auth::id());
            $voucher = Voucher::query()->lockForUpdate()->find($voucher_id);

            if (!$voucher || $voucher->start_date > today()->toDateString() || $voucher->end_date < today()->toDateString()) {
                return ['type' => 'warning', 'message' => 'This voucher is not available.'];
            }

            if ($user->voucher()->where('voucher_id', $voucher->id)->exists()) {
                return ['type' => 'warning', 'message' => 'You have already redeemed this voucher.'];
            }

            if ($voucher->user_quota <= $voucher->customer()->count()) {
                return ['type' => 'warning', 'message' => 'This voucher quota has been reached.'];
            }

            if ($user->point < $voucher->point) {
                return ['type' => 'warning', 'message' => 'You do not have enough points to redeem this voucher.'];
            }

            $user->decrement('point', $voucher->point);
            $user->voucher()->attach($voucher->id);

            return ['type' => 'success', 'message' => 'Voucher redeemed successfully!'];
        });

        return redirect()->back()->with('notif', $result);
    }
}
