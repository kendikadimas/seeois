<?php

namespace App\Http\Controllers\Staff\Business;

use App\Http\Controllers\Controller;
use App\Models\BlaterianBalance;
use App\Models\BlaterianGoodBalance;
use App\Models\CustomerFeedback;
use App\Models\FoodOrder;
use App\Models\FoodsExpense;
use App\Models\FoodsIncome;
use App\Models\FoodsTag;
use App\Models\GoodsCapital;
use App\Models\GoodsExpense;
use App\Models\GoodsIncome;
use App\Models\GoodsSales;
use App\Models\MenuItem;
use App\Models\ProductVariant;
use App\Models\Stand;
use App\Models\StandSales;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InsightController extends Controller
{
    function index(Request $request)
    {
        // Taste Preference
        $tasteStats = FoodsTag::select('food_tag.*')
            ->selectSub(function ($query) {
                $query->from('foods_menu')
                    ->join('pivot_food_menu_tag', 'foods_menu.id', '=', 'pivot_food_menu_tag.menu_id')
                    ->join('foods_order', 'foods_menu.id', '=', 'foods_order.menu_id')
                    ->whereColumn('pivot_food_menu_tag.food_tag_id', 'food_tag.id')
                    ->selectRaw('COALESCE(SUM(foods_order.amount), 0)');
            }, 'order_count')
            ->orderByDesc('order_count')
            ->get();

        // Menu Combo Pattern
        $food_tag_list = FoodsTag::all();
        $combo_count = FoodOrder::select('sales_id',  DB::raw('GROUP_CONCAT(menu_id ORDER BY menu_id) as combo'))->groupBy('sales_id')->get()->groupBy('combo')->map(function ($items) {
            return count($items);
        });
        $menu_list = MenuItem::all();
        $menu_names = $menu_list->pluck('name', 'id');
        $combo_names = $combo_count->map(function ($count, $key) use ($menu_names) {
            $names = collect(explode(',', $key))
                ->map(fn($id) => $menu_names[$id] ?? 'Deleted');

            return ['transaction' => $count, 'menu_list' => $names];
        })->sortByDesc('transaction')->toArray();
        $combo_list = collect([]);
        foreach ($combo_names as $combo) {
            if ($combo['menu_list']->count() > 1) {
                $combo_list->push([
                    'transaction' => $combo['transaction'],
                    'menu_list' => $combo['menu_list'],
                ]);
            }
        }
        // Menu Performance
        $menu_performance_top = collect([]);
        foreach ($menu_list->sortByDesc('sale')->take(5) as $menu) {
            $menu_performance_top->push($menu);
        }
        $menu_performance_bottom = collect([]);
        foreach ($menu_list->sortBy('sale')->take(5) as $menu) {
            $menu_performance_bottom->push($menu);
        }

        // Customer Lifetime
        $customer_lifetime_list = StandSales::where('customer_id', '>', 0)->select(['customer_id', 'transaction'])->get()->groupBy('customer_id');
        $customer_lifetime_id = collect([]);
        foreach ($customer_lifetime_list as $key => $value) {
            $customer_lifetime_id->push($key);
        }
        $customer_name = User::whereIn('id', $customer_lifetime_id)->select(['id', 'name', 'point', 'phone'])->get()->keyBy('id');
        $customer_lifetime_list = $customer_lifetime_list->map(function ($items, $key) use ($customer_name) {
            $customer = $customer_name[$key];
            return [
                'name' => $customer ? $customer->name : 'Unregistered',
                'transaction' => $items->sum('transaction'),
                'point' => $customer->point,
                'phone' => $customer->phone
            ];
        })->sortByDesc('transaction')->take(50);
        $customer_lifetime_value_list = collect([]);
        foreach ($customer_lifetime_list as $customer) {
            $customer_lifetime_value_list->push([
                'name' => $customer['name'],
                'point' => $customer['point'],
                'phone' => $customer['phone'],
                'transaction' => $customer['transaction'],
            ]);
        }

        // Rating and Feedback
        $feedback = CustomerFeedback::orderBy('created_at', 'desc')->with(['customer' => function ($query) {
            $query->select('id', 'name');
        }])->take(20)->get();


        $stands = Stand::all();
        $balance = BlaterianGoodBalance::find(1);
        $balance = $balance ? $balance : BlaterianGoodBalance::create();

        $goods_income = GoodsSales::where('operational_id', '>', 0)->sum('transaction');
        $goods_expense = GoodsCapital::where('operational_id', '>', 0)->sum('total_price');

        return Inertia::render('Staff/Business/Insight', [
            'taste_chart' => $tasteStats,
            'food_tag_list' => $food_tag_list,
            'combo_list' => $combo_list,
            'customer_lifetime_list' => $customer_lifetime_value_list,
            'customer_feedback' => [
                'feedback_list' => $feedback,
                'average' => round($feedback->avg('rate'), 2),
                'count' => $feedback->count(),
            ],
            'menu_performance_list' => [
                'top' => $menu_performance_top,
                'bottom' => $menu_performance_bottom,
            ],
            'goods' => [
                'balance' => $balance,
                'total_income' => $goods_income,
                'total_expense' => $goods_expense,
            ],
            'foods' => [
                'balance' => BlaterianBalance::find(1),
                'total_income' => $stands->sum('income'),
                'total_expense' => $stands->sum('expense'),
            ],
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ]);
    }

    function cashflow(Request $request)
    {
        // Foods
        $foods_filter_session = session('foods_balance_filter', ['category' => 'price', 'order' => 'desc']);
        // Save session to database
        $request->session()->put('foods_balance_filter', $foods_filter_session);
        // Balance filter
        $foods_category = $foods_filter_session['category'];
        // $foods_category = 'created_at';
        $foods_order = $foods_filter_session['order'];
        $foods_income_list = FoodsIncome::orderBy($foods_category, $foods_order)->with(['program', 'stand'])->get();
        $foods_expense_list = FoodsExpense::orderBy($foods_category, $foods_order)->with(['withdraw', 'stand'])->get();

        $stands = Stand::all();

        // Goods
        $goods_filter_session = session('goods_balance_filter', ['category' => 'price', 'order' => 'desc']);
        // Save session to database
        $request->session()->put('goods_balance_filter', $goods_filter_session);
        // Balance filter
        $goods_category = $goods_filter_session['category'];
        // $foods_category = 'created_at';
        $goods_order = $goods_filter_session['order'];
        $cash_in_list = GoodsIncome::orderBy($goods_category, $goods_order)->with(['program', 'sales'])->get();
        $cash_out_list = GoodsExpense::orderBy($goods_category, $goods_order)->with(['withdraw', 'capital'])->get();

        $balance = BlaterianGoodBalance::find(1);
        $balance = $balance ? $balance : BlaterianGoodBalance::create();

        $goods_income = GoodsSales::where('operational_id', '>', 0)->sum('transaction');
        $goods_expense = GoodsCapital::where('operational_id', '>', 0)->sum('total_price');
        return Inertia::render('Staff/Business/InsightCashflow', [
            'goods' => [
                'balance' => $balance,
                'total_income' => $goods_income,
                'total_expense' => $goods_expense,
                'income_list' => $cash_in_list,
                'expense_list' => $cash_out_list,
                'chartData' => $this->goodsChart(),
                'filter' => [
                    'category' => $goods_category,
                    'order' => $goods_order,
                ]
            ],
            'foods' => [
                'balance' => BlaterianBalance::find(1),
                'total_income' => $stands->sum('income'),
                'total_expense' => $stands->sum('expense'),
                'income_list' => $foods_income_list,
                'expense_list' => $foods_expense_list,
                'chart' => $this->foodsChart(),
                'filter' => [
                    'category' => $foods_category,
                    'order' => $foods_order,
                ]
            ],
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ]);
    }


    function foodsChart()
    {
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
        return $chart;
    }

    function goodsChart()
    {
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
        return $chartData;
    }

    function filterFoods(Request $request)
    {
        $category = $request->input('category');
        $order = $request->input('order');
        session()->put('foods_balance_filter', ['category' => $category, 'order' => $order]);
        return redirect()->back();
    }

    function filterGoods(Request $request)
    {
        $category = $request->input('category');
        $order = $request->input('order');
        session()->put('goods_balance_filter', ['category' => $category, 'order' => $order]);
        return redirect()->back();
    }

    function setTasteTag(Request $request)
    {
        $request->validate([
            'food_tag' => ['array', 'required'],
        ]);

        $food_tag_list = collect($request->input('food_tag'));
        $duplicates = $food_tag_list->duplicates('name');
        if ($duplicates->count() > 0) {
            $duplicated_tag = '';
            $duplicated_length = $duplicates->count() - 1;
            for ($i = 0; $i <= $duplicated_length; $i++) {
                $duplicated_tag .= ($i == $duplicated_length && $i > 0  ? ' and ' : ($i > 0 && $i < $duplicated_length ? ', ' : ' ')) . $duplicates->values()->toArray()[$i];
            };
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => ['You have duplicated tag name at : ' . $duplicated_tag . '.', 'Similar tag can reduce the effectiveness of Customer Taste analytic.', 'Rename the duplicates, then save with new name.']]);
        }

        // Handle New Tag
        $new_tag = $food_tag_list->filter(function ($item) {
            return (collect($item)->count() == 3) && ($item['deleted_at'] == null);
        });
        if ($new_tag->count() > 0) {
            DB::transaction(function () use ($new_tag) {
                foreach ($new_tag as $item) {
                    FoodsTag::create([
                        'name' => $item['name'],
                        'color' => $item['color'],
                    ]);
                }
            });
        }

        // Handle Tag Changes
        $update_tag = $food_tag_list->filter(function ($item) {
            return collect($item)->count() == 6;
        });

        $foods_tag = FoodsTag::all()->keyBy('id');
        $type = 'info';
        $message = collect(['Succes set up foods tag settings.']);
        foreach ($update_tag as $item) {
            if (isset($foods_tag[$item['id']])) {
                $foods_tag[$item['id']]->name = $item['name'];
                $foods_tag[$item['id']]->color = $item['color'];
                // Handle Tag Removal
                if ($item['deleted_at'] != null) {
                    if (DB::table('pivot_food_menu_tag')->where('food_tag_id', '=', $item['id'])->get()->count() > 0) {
                        $type = 'warning';
                        $message->push('Tag ' . $item['name'] . ' can not be deleted. There are menu tagged with it.', 'Alternative approach, you can change the tag name.');
                    } else {
                        $foods_tag[$item['id']]->deleted_at = $item['deleted_at'] ? now() : null;
                    }
                }
            }
        }

        DB::transaction(function () use ($foods_tag) {
            $foods_tag->each->save();
        });

        return redirect()->back()->with('notif', ['type' => $type, 'message' => $message->toArray()]);
    }
}
