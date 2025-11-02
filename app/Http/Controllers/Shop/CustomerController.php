<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\CustomerFeedback;
use App\Models\User;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $request->validate([
            'rate' => 'numeric',
            'feedback' => ['string', 'max:255'],
        ]);
        $auth_user = Auth::user();
        $customer_feedback = CustomerFeedback::find($auth_user->id);
        if ($customer_feedback) {
            $customer_feedback->rate = $request->input('rate');
            $customer_feedback->message = $request->input('feedback');
            $customer_feedback->save();
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Thank you! Your rating and feedback has been updated and saved.']);
        } else {
            CustomerFeedback::create([
                'rate' => $request->input('rate'),
                'message' => $request->input('feedback'),
            ]);
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Thank you for your rating and feedback.']);
        }
    }
    function redeemVoucher($voucher_id)
    {
        $user = User::find(Auth::user()->id);
        $available_voucher = $user->voucher()->where('voucher_id', $voucher_id)->first();
        if ($available_voucher) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'You have already redeemed this voucher.']);
        }
        $user->voucher()->attach($voucher_id);
        $voucher = Voucher::find($voucher_id);
        if ($user->point <= $voucher->point) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'You do not have enough points to redeem this voucher.']);
        }
        $user->point -= $voucher->point;
        $user->save();
        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Voucher redeemed successfully!']);
    }
}
