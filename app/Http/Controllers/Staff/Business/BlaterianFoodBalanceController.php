<?php

namespace App\Http\Controllers\Staff\Business;

use App\Http\Controllers\Controller;
use App\Models\BlaterianBalance;
use App\Models\CashInItem;
use App\Models\FoodsExpense;
use App\Models\FoodsIncome;
use App\Models\Stand;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Inertia\Response;

class BlaterianFoodBalanceController extends Controller
{
    //Food Balance

    /**
     * 
     * display foods balance.
     * 
     */
    public function balance(Request $request, $default_tab = 1, $refresh = false): Response
    {
        $this->refreshBalance();
        $income_session = session('balance_income', ['category' => 'price', 'order' => 'desc']);
        $expense_session = session('balance_expense', ['category' => 'price', 'order' => 'desc']);
        $income_category = in_array($income_session['category'] ?? null, ['price', 'category', 'created_at'], true) ? $income_session['category'] : 'price';
        $income_order = in_array($income_session['order'] ?? null, ['asc', 'desc'], true) ? $income_session['order'] : 'desc';
        $request->session()->put('balance_income', ['category' => $income_category, 'order' => $income_order]);
        $income_list = FoodsIncome::orderBy($income_category, $income_order)->with(['program', 'stand'])->get();
        $expense_category = in_array($expense_session['category'] ?? null, ['price', 'category', 'created_at'], true) ? $expense_session['category'] : 'price';
        $expense_order = in_array($expense_session['order'] ?? null, ['asc', 'desc'], true) ? $expense_session['order'] : 'desc';
        $request->session()->put('balance_expense', ['category' => $expense_category, 'order' => $expense_order]);
        $expense_list = FoodsExpense::orderBy($expense_category, $expense_order)->with(['withdraw', 'stand'])->get();

        // Chart Data
        $chart_raw = Stand::orderBy('updated_at', 'desc')->get(['date', 'profit', 'expense', 'income']);
        $chart_group = $chart_raw->groupBy(function ($chart_raw) {
            return strval(date_format(date_create($chart_raw->date), 'm'));
        });
        $profit_chart = $chart_group->map(function ($profit) {
            return $profit->sum('profit');
        });
        $expense_chart = $chart_group->map(function ($expense) {
            return $expense->sum('expense');
        });
        $income_chart = $chart_group->map(function ($income) {
            return $income->sum('income');
        });
        $chart = [
            'month' => $profit_chart->keys()->map(function ($month) {
                return Carbon::createFromFormat('m', strval($month))->format('F');
            }),
            'profit' => $profit_chart->values(),
            'expense' => $expense_chart->values(),
            'income' => $income_chart->values(),
        ];
        $stands = Stand::all();
        return Inertia::render('Staff/Business/FoodBalance', [
            'title' => 'Blaterian Foods Balance',
            'balance' => BlaterianBalance::find(1),
            'total_income' => $stands->sum('income'),
            'total_expense' => $stands->sum('expense'),
            'income' => $income_list,
            'expense' => $expense_list,
            'chart' => $chart,
            'default_tab' => $default_tab,
            'filter' => [
                'income' => [
                    'category' => $income_category,
                    'order' => $income_order,
                ],
                'expense' => [
                    'category' => $expense_category,
                    'order' => $expense_order,
                ],
            ],
            'notif' => session('notif'),
            'errors' => session('errors')?->getBag('default')?->getMessages() ?? (object) [],
        ]);
    }

    /**
     * filter cash Income.
     */
    public function filterIncome(Request $request)
    {
        $validated = $request->validate([
            'category' => ['required', 'in:price,category,created_at'],
            'order' => ['required', 'in:asc,desc'],
        ]);
        $category = $validated['category'];
        $order = $validated['order'];
        session()->put('balance_income', ['category' => $category, 'order' => $order]);
        return redirect()->route('food.balance', ['default_tab' => 1]);
    }

    /**
     * filter cash Expense.
     */
    public function filterExpense(Request $request)
    {
        $validated = $request->validate([
            'category' => ['required', 'in:price,category,created_at'],
            'order' => ['required', 'in:asc,desc'],
        ]);
        $category = $validated['category'];
        $order = $validated['order'];
        session()->put('balance_expense', ['category' => $category, 'order' => $order]);
        return redirect()->route('food.balance', ['default_tab' => 2]);
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
        $foodsExpense = FoodsExpense::sum('price');
        $foodsIncome = FoodsIncome::sum('price');

        // update balance or create new balance if it doesn't exist
        $balance = BlaterianBalance::find(1);
        if ($balance) {
            $balance->expense = $foodsExpense;
            $balance->income = $foodsIncome;
            $balance->balance = $foodsIncome - $foodsExpense;
            $balance->save();
        } else {
            BlaterianBalance::create([
                'expense' => $foodsExpense,
                'income' => $foodsIncome,
                'balance' => $foodsIncome - $foodsExpense,
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
        $receipt_name = 'cash_in_foods_'.now()->format('YmdHis').'_'.str()->random(6).'.'.$receipt->extension();
        $disk = app()->environment('production') ? 'google' : 'public';
        $receipt->storePubliclyAs('images/receipt/cash_in', $receipt_name, $disk);

        DB::transaction(function () use ($validated, $receipt_name) {
            $cashIn = CashInItem::create([
                'financial_id' => null,
                'name' => $validated['name'],
                'price' => $validated['price'],
                'reciept' => $receipt_name,
            ]);

            FoodsExpense::create([
                'category_id' => $cashIn->id,
                'category' => 'withdraw',
                'price' => $validated['price'],
            ]);
        });

        $this->refreshBalance();

        return redirect()->route('food.balance', ['default_tab' => 2])->with('notif', [
            'type' => 'info',
            'message' => 'Dana berhasil dikirim ke kas SEEO dan menunggu validasi Financial Officer.',
        ]);
    }
}
