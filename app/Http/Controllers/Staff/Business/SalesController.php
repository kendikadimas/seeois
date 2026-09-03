<?php

namespace App\Http\Controllers\Staff\Business;

use App\Http\Controllers\Controller;
use App\Models\FoodOrder;
use App\Models\FoodsIncome;
use App\Models\MenuItem;
use App\Services\MenuInventoryService;
use App\Models\PaymentMethod;
use App\Models\Stand;
use App\Models\StandSales;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use App\Services\ProfitCalculator;

class SalesController extends Controller
{
    /**
     * Display foods sales.
     */
    public function sales(Request $request, $id)
    {
        $auth_user = Auth::user();
        $query = Stand::with(['pic', 'cashier']);
        
        // Super Admin bypass
        if ($auth_user->roles_id != 99) {
            $query->where('sale_validation', '=', 0)->where('menu_lock', '!=', 0);
        }

        $stand = $query->find($id);
        if (!$stand) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Stand is not found. Try again from Stand Detail page.']);
        }
        $menu_list = MenuItem::where('stand_id', $stand->id)->orderBy('name', 'asc')->get()->groupBy('category');
        $payment_method_list = PaymentMethod::all();
        $customer_list = User::where('phone', "!=", null)->where('phone', '!=', '')->select(['id', 'name', 'phone'])->get();
        $order_list = StandSales::where('cashier_id', "=", 0)->where('stand_id', $stand->id)->with(['voucher', 'customer', 'order' => ['menu']])->get();
        $today_sales = StandSales::where('stand_id', $stand->id)
            ->where('cashier_id', '>', 0)
            ->whereDate('created_at', today())
            ->with(['customer', 'order' => ['menu']])
            ->orderBy('created_at', 'desc')
            ->get();
        $data = [
            'stand' => $stand,
            'menu_list' => $menu_list,
            'customer_list' => $customer_list,
            'order_list' => $order_list,
            'today_sales' => $today_sales,
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
        $stand = Stand::find($id);
        if (!$stand) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Stand tidak ditemukan.']);
        }

        $auth_user = Auth::user();
        // Allow Super Admin or authorized cashier
        if ($auth_user->roles_id != 99 && !$stand->cashier->contains('id', $auth_user->id)) {
            $standLabel = $stand->pic?->name ?? $stand->name ?? 'this stand';
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'You are not cashier in Stand (' . $standLabel . '). Only cashier can add transaction.']);
        }
        $validated = $request->validate([
            'discount' => ['required', 'integer', 'min:0'],
            'transaction' => ['required', 'integer', 'min:0'],
            'customer_id' => ['required', 'integer', Rule::exists('users', 'id')],
            'order' => ['required', 'array', 'min:1'],
            'order.*.menu_id' => ['required', 'integer', Rule::exists('foods_menu', 'id')->where('stand_id', $stand->id)->whereNull('deleted_at')],
            'order.*.amount' => ['required', 'integer', 'min:1'],
            'payment_method_id' => ['required', 'integer', Rule::exists('payment_method', 'id')],
            'payment_price' => ['required', 'integer', 'min:0'],
        ]);
        $subtotal = collect($validated['order'])->sum(function ($order) use ($stand) {
            return (int) MenuItem::where('stand_id', $stand->id)->findOrFail($order['menu_id'])->price * (int) $order['amount'];
        });
        $validated['discount'] = min($validated['discount'], $subtotal);
        $validated['transaction'] = $subtotal - $validated['discount'];
        if ($validated['payment_price'] < $validated['transaction']) {
            throw ValidationException::withMessages(['payment_price' => 'Nominal pembayaran kurang dari total transaksi.']);
        }
        DB::transaction(function () use ($validated, $stand, $auth_user, $request) {
            $customer = User::query()->lockForUpdate()->findOrFail($validated['customer_id']);
            $sale = StandSales::create([
                'cashier_id' => $auth_user->id, 'stand_id' => $stand->id,
                'discount' => $validated['discount'], 'transaction' => $validated['transaction'],
                'customer' => $request->input('customer', $customer->name), 'customer_id' => $customer->id,
                'order_type' => 'now', 'send_option' => 'pick_up',
                'payment_method_id' => $validated['payment_method_id'], 'payment_price' => $validated['payment_price'],
            ]);

            foreach ($validated['order'] as $order) {
                $menu = MenuItem::where('stand_id', $stand->id)->findOrFail($order['menu_id']);
                app(MenuInventoryService::class)->adjust($menu, -$order['amount'], $auth_user->id, 'sale', 'Kasir stand #' . $stand->id);
                $menu->increment('sale', $order['amount']);
                FoodOrder::create(['sales_id' => $sale->id, 'menu_id' => $menu->id, 'amount' => $order['amount']]);
            }

            $customer->increment('point', (int) floor($validated['transaction'] / 10000) * 50);
        });
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success add new transaction to Stand ' . $stand->name]);
    }

    /**
     * add new Customer.
     */
    public function insertCustomer(Request $request, $id)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20', 'unique:users,phone']
        ]);
        $stand = Stand::find($id);
        $auth_user = Auth::user();
        if (!$stand) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Stand tidak ditemukan.']);
        }
        // Allow Super Admin or authorized cashier
        if ($auth_user->roles_id != 99 && !$stand->cashier->contains('id', $auth_user->id)) {
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
        $sale = StandSales::with('stand.cashier')->find($id);
        if (!$sale) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Transaction is not found.']);
        }
        $user = Auth::user();
        if ($user->roles_id !== 99 && $user->roles_id !== 3 && !$sale->stand?->cashier->contains('id', $user->id)) {
            abort(403);
        }
        $receipt = $sale->receipt_income;
        $response = $this->reverseSale($id, 'deleted');
        if ($receipt) {
            $disk = config('app.env') === 'production' ? 'google' : 'public';
            Storage::disk($disk)->delete('images/receipt/stand/income/' . $receipt);
        }
        return $response;
    }

    /**
     * Cancel customer order
     */
    public function  cancelTransaction($id)
    {
        $transaction = StandSales::find($id);
        if (!$transaction) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Transaction is not found. Please try again or contact IT Support.']);
        }
        $auth_user = Auth::user();
        $stand = Stand::find($transaction->stand_id);
        if (!$stand) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Stand transaksi tidak ditemukan.']);
        }
        // Allow Super Admin or authorized cashier
        if ($auth_user->roles_id != 99 && !$stand->cashier->contains('id', $auth_user->id)) {
            return redirect()->back()->with('notif', ['type' => 'danger', 'message' => ['You are not listed as cashier.', 'This feature only available for cashier.']]);
        }
        $receipt = $transaction->payment_method_id == 2 ? $transaction->receipt_income : null;
        $response = $this->reverseSale($transaction->id, 'cancelled');
        if ($receipt) {
            $disk = config('app.env') === 'production' ? 'google' : 'public';
            Storage::disk($disk)->delete('images/receipt/stand/income/' . $receipt);
        }
        return $response;
    }

    private function reverseSale(int $id, string $action)
    {
        $name = '';
        $standName = '';
        DB::transaction(function () use ($id, &$name, &$standName) {
            $sale = StandSales::query()->lockForUpdate()->with(['order.menu', 'stand'])->findOrFail($id);
            $name = $sale->customer;
            $standName = $sale->stand?->name ?? 'Unknown';

            foreach ($sale->order as $order) {
                if ($order->menu) {
                    app(MenuInventoryService::class)->adjust($order->menu, (int) $order->amount, Auth::id(), 'return', 'Pembatalan transaksi #' . $sale->id);
                    $order->menu->decrement('sale', min((int) $order->menu->sale, (int) $order->amount));
                }
                $order->delete();
            }

            $customer = User::query()->lockForUpdate()->find($sale->customer_id);
            if ($customer) {
                if ($sale->voucher_id > 0) {
                    $customer->voucher()->updateExistingPivot($sale->voucher_id, ['use_date' => null]);
                }
                $points = (int) floor($sale->transaction / 10000) * 50;
                $customer->update(['point' => max(0, (int) $customer->point - $points)]);
            }
            $sale->delete();
        });

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => "Transaction {$name} was {$action} from Stand {$standName}."]);
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
        if (!$transaction) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Transaction is not found.']);
        }
        if ($transaction->cashier_id > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'This transaction has been done by ' . $transaction->cashier->name . '.']);
        }
        $auth_user = Auth::user();
        $stand = Stand::find($transaction->stand_id);
        // Allow Super Admin or authorized cashier
        if ($auth_user->roles_id != 99 && !$stand->cashier->contains('id', $auth_user->id)) {
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
        if (!$stand) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Stand tidak ditemukan.']);
        }
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
        // Recalculate profit with recipe-based COGS if available
        $recalc = ProfitCalculator::calculateStandProfit($stand->id);
        $stand->profit = $recalc !== null ? $recalc : ($stand->income - $stand->expense);
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
