<?php

namespace App\Http\Controllers\Staff\Business;

use App\Http\Controllers\Controller;
use App\Models\BlaterianBalance;
use App\Models\BlaterianGoodBalance;
use App\Models\CashInItem;
use App\Models\GoodsCapital;
use App\Models\GoodsExpense;
use App\Models\GoodsIncome;
use App\Models\GoodsSales;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Inertia\Response;

class BlaterianGoodBalanceController extends Controller
{
    //Good Balance

    /**
     * 
     * display foods balance.
     * 
     */
    public function balance(Request $request, $default_tab = 1, $refresh = false): Response
    {
        $this->refreshBalance();
        $income_session = session('balance_cash_in', ['category' => 'price', 'order' => 'desc', 'income' => null]);
        $expense_session = session('balance_cash_out', ['category' => 'price', 'order' => 'desc', 'expense' => null]);
        $income_category = in_array($income_session['category'] ?? null, ['price', 'category', 'created_at'], true) ? $income_session['category'] : 'price';
        $income_order = in_array($income_session['order'] ?? null, ['asc', 'desc'], true) ? $income_session['order'] : 'desc';
        $income_scope = ($income_session['income'] ?? null) === 'income' ? 'income' : null;
        $request->session()->put('balance_cash_in', ['category' => $income_category, 'order' => $income_order, 'income' => $income_scope]);
        $cash_in_list = $income_scope === 'income' ?
            GoodsIncome::orderBy($income_category, $income_order)->with(['program', 'sales'])->get() :
            GoodsIncome::where('category', '!=', 'goods income')->orderBy($income_category, $income_order)->with(['program', 'sales'])->get();
        $expense_category = in_array($expense_session['category'] ?? null, ['price', 'category', 'created_at'], true) ? $expense_session['category'] : 'price';
        $expense_order = in_array($expense_session['order'] ?? null, ['asc', 'desc'], true) ? $expense_session['order'] : 'desc';
        $expense_scope = ($expense_session['expense'] ?? null) === 'expense' ? 'expense' : null;
        $request->session()->put('balance_cash_out', ['category' => $expense_category, 'order' => $expense_order, 'expense' => $expense_scope]);
        $cash_out_list = $expense_scope === 'expense' ?
            GoodsExpense::orderBy($expense_category, $expense_order)->with(['withdraw', 'capital'])->get() :
            GoodsExpense::where('category', '!=', 'goods expense')->orderBy($expense_category, $expense_order)->with(['withdraw', 'capital'])->get();

        $balance = BlaterianGoodBalance::firstOrCreate(['id' => 1], ['income' => 0, 'expense' => 0, 'balance' => 0]);

        $income = GoodsSales::where('operational_id', '>', 0)->sum('transaction');
        $expense = GoodsCapital::where('operational_id', '>', 0)->sum('total_price');

        // Chart Data
        $variant_list = ProductVariant::orderBy('sale', 'desc')->with('product')->take(5)->get();

        $labels = collect([]);
        $sales = collect([]);
        foreach ($variant_list as $variant) {
            $labels->push($variant->product->name . ' : ' . $variant->name);
            $sales->push($variant->sale);
        }
        $chartData = [
            'labels' => $labels->all(),
            'sales' => $sales->all(),
        ];
        return Inertia::render('Staff/Business/GoodBalance', [
            'balance' => $balance,
            'total_income' => $income,
            'total_expense' => $expense,
            'income' => $cash_in_list,
            'expense' => $cash_out_list,
            'chartData' => $chartData,
            'default_tab' => $default_tab,
            'filter' => [
                'cash_in' => [
                    'category' => $income_category,
                    'order' => $income_order,
                    'income' => $income_scope,
                ],
                'cash_out' => [
                    'category' => $expense_category,
                    'order' => $expense_order,
                    'expense' => $expense_scope,
                ],
            ],
            'notif' => session('notif'),
            'errors' => session('errors')?->getBag('default')?->getMessages() ?? (object) [],
        ]);
    }

    /**
     * filter cash in balance.
     */
    public function filterCashIn(Request $request)
    {
        $validated = $request->validate([
            'category' => ['nullable', 'in:price,category,created_at'],
            'order' => ['nullable', 'in:asc,desc'],
            'income' => ['nullable', 'in:income'],
        ]);
        $current = session('balance_cash_in', ['category' => 'price', 'order' => 'desc', 'income' => null]);
        $category = $validated['category'] ?? $current['category'];
        $order = $validated['order'] ?? $current['order'];
        $income = array_key_exists('income', $validated) ? $validated['income'] : $current['income'];
        session()->put('balance_cash_in', ['category' => $category, 'order' => $order, 'income' => $income]);
        return redirect()->route('good.balance', ['default_tab' => 1]);
    }

    /**
     * filter cash put balance.
     */
    public function filterCashOut(Request $request)
    {
        $validated = $request->validate([
            'category' => ['nullable', 'in:price,category,created_at'],
            'order' => ['nullable', 'in:asc,desc'],
            'expense' => ['nullable', 'in:expense'],
        ]);
        $current = session('balance_cash_out', ['category' => 'price', 'order' => 'desc', 'expense' => null]);
        $category = $validated['category'] ?? $current['category'];
        $order = $validated['order'] ?? $current['order'];
        $expense = array_key_exists('expense', $validated) ? $validated['expense'] : $current['expense'];
        session()->put('balance_cash_out', ['category' => $category, 'order' => $order, 'expense' => $expense]);
        return redirect()->route('good.balance', ['default_tab' => 2]);
    }

    /**
     * 
     * refresh stand cash flow to makesure it is accurate.
     * 
     *  @var $id is program id, @var $add to determine add or minus 
     */
    static function refreshBalance(): void
    {
        // retrieve models
        $goodsExpense = GoodsExpense::sum('price');
        $goodsIncome = GoodsIncome::sum('price');
        // update balance or create new balance if it doesn't exist
        $balance = BlaterianGoodBalance::find(1);
        if ($balance) {
            $balance->expense = $goodsExpense;
            $balance->income = $goodsIncome;
            $balance->balance = $goodsIncome - $goodsExpense;
            $balance->save();
        } else {
            BlaterianGoodBalance::create([
                'expense' => $goodsExpense,
                'income' => $goodsIncome,
                'balance' => $goodsIncome - $goodsExpense,
            ]);
        }
    }

    public function withdrawBalance(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:1'],
            'receipt' => ['required', File::types(['jpg', 'jpeg', 'png', 'heic', 'webp'])->max(5 * 1024)],
        ]);

        $receipt = $validated['receipt'];
        $receipt_name = 'cash_in_goods_'.now()->format('YmdHis').'_'.str()->random(6).'.'.$receipt->extension();
        $disk = app()->environment('production') ? 'google' : 'public';
        $receipt->storePubliclyAs('images/receipt/cash_in', $receipt_name, $disk);

        DB::transaction(function () use ($validated, $receipt_name) {
            $cashIn = CashInItem::create([
                'financial_id' => null,
                'name' => $validated['name'],
                'price' => $validated['price'],
                'reciept' => $receipt_name,
            ]);

            GoodsExpense::create([
                'category_id' => $cashIn->id,
                'category' => 'withdraw',
                'price' => $validated['price'],
            ]);
        });

        $this->refreshBalance();

        return redirect()->route('good.balance', ['default_tab' => 2])->with('notif', [
            'type' => 'info',
            'message' => 'Dana berhasil dikirim ke kas SEEO dan menunggu validasi Financial Officer.',
        ]);
    }
}
