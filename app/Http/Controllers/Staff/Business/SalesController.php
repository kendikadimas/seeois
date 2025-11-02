<?php

namespace App\Http\Controllers\Staff\Business;

use App\Http\Controllers\Controller;
use App\Models\FoodOrder;
use App\Models\FoodsIncome;
use App\Models\MenuItem;
use App\Models\PaymentMethod;
use App\Models\Stand;
use App\Models\StandSales;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SalesController extends Controller
{
    /**
     * Display foods sales.
     */
    public function sales(Request $request, $id)
    {

        $stand = Stand::with(['pic', 'cashier'])->where('sale_validation', '==', 0)->where('menu_lock', '!=', 0)->find($id);
        if (!$stand) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Stand is not found. Try again from Stand Detail page.']);
        }
        $menu_list = MenuItem::where('stand_id', $stand->id)->orderBy('name', 'asc')->get()->groupBy('category');
        $payment_method_list = PaymentMethod::all();
        $customer_list = User::where('phone', "!=", null)->where('phone', '!=', '')->select(['id', 'name', 'phone'])->get();
        $order_list = StandSales::where('cashier_id', "=", 0)->where('stand_id', $stand->id)->with(['voucher', 'customer', 'order' => ['menu']])->get();
        $data = [
            'stand' => $stand,
            'menu_list' => $menu_list,
            'customer_list' => $customer_list,
            'order_list' => $order_list,
            'payment_method_list' => $payment_method_list,
            'data' => session('data'),
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],

        ];
        return Inertia::render('Staff/Business/StandCashier', $data);
    }



    /**
     * Filtering stand income order.
     */
    function filterStandIncome(Request $request)
    {
        $name = $request->input('name');
        session()->put('stand_income', ['name' => $name]);
        return redirect()->back();
    }

    /**
     * add new Sale Item.
     */
    public function insertSale(Request $request, $id)
    {
        // Validating data
        $request->validate([
            'discount' => ['required', 'integer'],
            'transaction' => ['required', 'integer'],
            'customer_id' => ['required', 'integer'],
            'order' => 'required|array',
            'payment_method_id' => ['required', 'integer'],
            'payment_price' => ['required', 'integer'],
        ]);
        // Checking Cashier Token
        $stand = Stand::find($id);
        $auth_user = Auth::user();
        if ($stand->cashier->contains('cashier_id', $auth_user->id)) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'You are not cashier in Stand (' . $stand->pic->name . '). Only cashier can add transaction.']);
        }
        $sale = StandSales::create([
            'cashier_id' => Auth::user()->id,
            'stand_id' => $id,
            'discount' => $request->input('discount'),
            'transaction' => $request->input('transaction'),
            'customer' => $request->input('customer'),
            'customer_id' => $request->input('customer_id'),
            'order_type' => 'now',
            'send_option' => 'pick_up',
            'payment_method_id' => $request->input('payment_method_id'),
            'payment_price' => $request->input('payment_price'),
        ]);

        $order_list = $request->input('order');
        foreach ($order_list as $order) {
            $menu = MenuItem::find($order['menu_id']);
            $menu->sale += $order['amount'];
            $menu->save();

            FoodOrder::create([
                'sales_id' => $sale->id,
                'menu_id' => $order['menu_id'],
                'amount' => $order['amount'],
            ]);
        }
        $user = User::find($request->input('customer_id'));
        $user->point += floor($request->input('transaction') / 10000) * 50; // 50 point for every 10k transaction    
        $user->save();
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success add new transaction to Stand ' . $stand->name]);
    }

    /**
     * add new Customer.
     */
    public function insertCustomer(Request $request, $id)
    {
        $request->validate([
            'name' => ['required'],
            'phone' => ['required']
        ]);
        $stand = Stand::find($id);
        $auth_user = Auth::user();
        if ($stand->cashier->contains('cashier_id', $auth_user->id)) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'You are not cashier in Stand (' . $stand->pic->name . '). Only cashier can add customer.']);
        }
        $customer = new User();
        $customer->name = $request->input('name');
        $customer->phone = $request->input('phone');
        $customer->save();
        return back()->with('notif', ['type' => 'info', 'message' => 'Success add new customer.'])->with('data', ['new_customer_id' => $customer->id]);
    }

    /**
     * delete selected Sale Item.
     */
    public function deleteSale($id)
    {
        $sale_item = StandSales::with(['stand', 'order', 'order.menu'])->find($id);
        $stand = $sale_item->stand;
        $name = $sale_item->customer;

        $order_list = $sale_item->order;
        foreach ($order_list as $order) {
            // update menu sale
            $menu = $order->menu;
            $menu->sale = $menu->sale - $order->amount;
            $menu->save();
            // delete order
            $order->delete();
        }
        $user = User::find($sale_item->customer_id);
        $user->point -= floor($sale_item->transaction / 10000) * 50; // 50 point for every 10k transaction    
        $user->save();
        // delete sale item
        if ($sale_item->delete()) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success delete ' . $name . ' transaction from Stand ' . $stand->name . ' Income.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Failed to delete ' . $name . ' transaction from Stand ' . $stand->name . ' Income. Please try again or contact admin']);
        }
    }

    /**
     * Cancel customer order
     */
    public function  cancelTransaction($id)
    {
        $transaction = StandSales::with('customer')->find($id);
        $auth_user = Auth::user();
        if (!Stand::find($transaction->stand_id)->cashier->contains($auth_user->id)) {
            return redirect()->back()->with('notif', ['type' => 'danger', 'message' => ['You are not listed as cashier.', 'This feature only available for cashier.']]);
        }
        if (!$transaction) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Transaction is not found. Please try again or contact IT Suppport.']);
        }
        if ($transaction->payment_method_id == 2) {
            // Checkk for env
            $disk = config('app.env') === 'production' ? 'google' : 'public';
            // delete stand expense receipt
            Storage::disk($disk)->delete('images/receipt/stand/income/' . $transaction->reciept_income);
        }
        if ($transaction->voucher_id > 0) {
            User::find($transaction->customer_id)->voucher()->updateExistingPivot($transaction->voucher_id, ['use_date' => null]);
        }
        $order_list = $transaction->order;
        foreach ($order_list as $order) {
            // update menu sale
            $menu = $order->menu;
            $menu->sale = $menu->sale - $order->amount;
            $menu->save();
            // delete order
            $order->delete();
        }
        $name = $transaction->customer;
        $transaction->delete();
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success cancel transaction order from ' . $name . '.']);
    }

    /**
     * submit a complete transaction order from customer.
     */
    public function finishTransaction(Request $request)
    {
        $request->validate([
            'transaction_id' => ['required', 'numeric'],
        ]);
        $transaction = StandSales::find($request->input(('transaction_id')));
        if ($transaction->cashier_id > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'This transaction has been done by ' . $transaction->cashier->name . '.']);
        }
        $auth_user = Auth::user();
        if (!Stand::find($transaction->stand_id)->cashier->contains($auth_user->id)) {
            return redirect()->back()->with('notif', ['type' => 'danger', 'message' => ['You are not listed as cashier.', 'This feature only available for cashier.']]);
        }
        $transaction->cashier_id = Auth::user()->id;
        $transaction->save();
        $user = User::find($transaction->customer_id);
        $user->point += floor($transaction->transaction / 10000) * 50; // 50 point for every 10k transaction    
        $user->save();
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Transaction from ' . $transaction->customer . ' has been finished.']);
    }

    /**
     * validate sales item by Operational.
     */

    public function validateSales($id)
    {
        $auth_user = Auth::user();
        $stand = Stand::find($id);
        $sale_validation = $stand->sale_validation > 0  ? 0 :  $auth_user->id;
        $stand->sale_validation = $sale_validation;
        if ($sale_validation > 0) {
            $stand->menu_lock = $auth_user->id;
        }
        $validation = $sale_validation > 0  ? 'validate' : 'unvalidate';
        $this->updateStandIncome($id);
        if ($stand->save()) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Succes ' . $validation . ' Stand ' . $stand->name . ' Income.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Failed to ' . $validation . ' Stand ' . $stand->name . ' Income. Please try again or contact admin.']);
        }
    }

    /**
     * update new stand total income.
     * 
     * 
     *  @var $id is stand id, @var $add to determine add or minus 
     */
    public function updateStandIncome(int $id)
    {
        // retrieve foods income model
        $foodsIncome = FoodsIncome::where('category', '=', 'stand income')->where('category_id', '=', $id)->first();
        
        // set new income
        $new_income = StandSales::where('stand_id', '=', $id)->where('cashier_id', '>', 0)->sum('transaction');

        // update stand income
        $stand = Stand::find($id);
        $stand->income = $new_income;
        $stand->profit = $stand->income - $stand->expense;
        $stand->updated_at = now();
        $stand->save();

        // Create or update foods income model
        if ($foodsIncome) {
            // Update existing record
            $foodsIncome->price = $new_income;
            $foodsIncome->updated_at = now();
            $foodsIncome->save();
        } else {
            // Create new record if it doesn't exist
            FoodsIncome::create([
                'category' => 'stand income',
                'category_id' => $id,
                'price' => $new_income,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return BlaterianFoodBalanceController::refreshBalance();
    }
}
