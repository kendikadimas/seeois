<?php

namespace App\Http\Controllers\Staff\Business;

use App\Http\Controllers\Controller;
use App\Models\GoodsCapital;
use App\Models\GoodsExpense;
use App\Models\GoodsSales;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Inertia\Response;

class GoodInsightController extends Controller
{
    /**
     * Show insight page of product.
     */
    public function insight(Request $request): Response
    {
        // Retrieve or create session
        $sale_session = session('sale', ['category' => 'created_at', 'order' => 'desc', 'keyword' => null]);
        $capital_session = session('capital', ['category' => 'created_at', 'order' => 'desc']);
        $sale_category = in_array($sale_session['category'] ?? null, ['created_at', 'customer', 'transaction'], true) ? $sale_session['category'] : 'created_at';
        $sale_order = in_array($sale_session['order'] ?? null, ['asc', 'desc'], true) ? $sale_session['order'] : 'desc';
        $sale_keyword = filled($sale_session['keyword'] ?? null) ? trim($sale_session['keyword']) : null;
        $request->session()->put('sale', ['category' => $sale_category, 'order' => $sale_order, 'keyword' => $sale_keyword]);
        $sale_list = $sale_keyword !== null ? GoodsSales::where('transaction', '>', 0)->with(['operational', 'cashier', 'order' => ['variant' => ['product']]])->orderByRaw("
                CASE
                WHEN customer = ? THEN 1
                WHEN customer LIKE ? THEN 2
                WHEN customer LIKE ? THEN 3
                ELSE 4
                END 
            ", [$sale_keyword, "$sale_keyword%", "%$sale_keyword%"])->get()
            : GoodsSales::where('transaction', '>', 0)->orderBy($sale_category, $sale_order)->with(['operational', 'cashier', 'order' => ['variant' => ['product']]])->get();
        // Capital filter
        $capital_category = in_array($capital_session['category'] ?? null, ['created_at', 'name', 'total_price'], true) ? $capital_session['category'] : 'created_at';
        $capital_order = in_array($capital_session['order'] ?? null, ['asc', 'desc'], true) ? $capital_session['order'] : 'desc';
        $request->session()->put('capital', ['category' => $capital_category, 'order' => $capital_order, 'keyword' => null]);
        $capital_list = GoodsCapital::with(['operational'])->orderBy($capital_category, $capital_order)->get();
        return Inertia::render('Staff/Business/GoodInsight', [
            'filter' => [
                'sale' => [
                    'category' => $sale_category,
                    'order' => $sale_order,
                    'keyword' => $sale_keyword,
                ],
                'capital' => [
                    'category' => $capital_category,
                    'order' => $capital_order,
                ]
            ],
            'sale_list' => $sale_list,
            'capital_list' => $capital_list,
            'notif' => session('notif'),
            'errors' => session('errors')?->getBag('default')?->getMessages() ?? (object) [],
        ]);
    }

    /**
     * Filtering product list order.
     */
    public function filterInsight(Request $request, $filter_name = 'sale')
    {
        abort_unless(in_array($filter_name, ['sale', 'capital'], true), 404);
        $allowedCategories = $filter_name === 'sale'
            ? ['created_at', 'customer', 'transaction']
            : ['created_at', 'name', 'total_price'];
        $validated = $request->validate([
            'keyword' => ['nullable', 'string', 'max:100'],
            'category' => ['nullable', Rule::in($allowedCategories)],
            'order' => ['nullable', 'in:asc,desc'],
        ]);
        $keyword = filled($validated['keyword'] ?? null) ? trim($validated['keyword']) : null;
        $category = $validated['category'] ?? 'created_at';
        $order = $validated['order'] ?? 'desc';
        session()->put($filter_name, ['category' => $category, 'order' => $order, 'keyword' => $keyword,]);
        return redirect()->route('good.insight');
    }

    /**
     * Filtering product list order.
     */
    public function insertCapital(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:1'],
            'qty' => ['required', 'integer', 'min:1'],
            'unit' => ['required', 'string', 'max:50'],
            'receipt' => [Rule::requiredIf($request->input('same_receipt_check') != 'on'), File::types(['jpg', 'jpeg', 'png', 'heic'])->max(5 * 1024)],
            'receipt_same' => [Rule::requiredIf($request->input('same_receipt_check') == 'on'), 'nullable', 'integer', 'exists:goods_capital,id'],
            'same_receipt_check' => ['nullable', 'in:on'],
        ]);

        if ($request->input('same_receipt_check') != 'on') {
            $receipt = $validated['receipt'];
            $receipt_name = 'GE_'.now()->format('YmdHis').'_'.str()->random(6).'.'.$receipt->extension();
            $disk = app()->environment('production') ? 'google' : 'public';
            $receipt->storePubliclyAs('images/receipt/goods/expense', $receipt_name, $disk);
        } else {
            $receipt_name = GoodsCapital::findOrFail($validated['receipt_same'])->receipt;
        }

        $total_price = $validated['qty'] * $validated['price'];
        $goods_expense = GoodsCapital::create([
            'name' => $validated['name'],
            'price' => $validated['price'],
            'qty' => $validated['qty'],
            'unit' => $validated['unit'],
            'total_price' => $total_price,
            'receipt' => $receipt_name,
        ]);

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => "Pengeluaran '{$goods_expense->name}' berhasil ditambahkan."]);
    }

    /**
     * Change the validatiion status of the product receipt.
     */
    public function validateCapital(Request $request)
    {
        $id = $request->input('receipt_id');
        $capital = GoodsCapital::find($id);
        if (!$capital) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Can not find the goods expense. Please contact admin.']);
        }
        $is_valid = $capital->operational_id == 0;
        DB::transaction(function () use ($capital, $is_valid, $id) {
            $capital->operational_id = $is_valid ? Auth::id() : null;
            $capital->save();

            if ($is_valid) {
                GoodsExpense::updateOrCreate(
                    ['category' => 'goods expense', 'category_id' => $id],
                    ['price' => $capital->total_price]
                );
            } else {
                GoodsExpense::where('category', 'goods expense')->where('category_id', $id)->delete();
            }
        });

        return redirect()->back()->with('notif', [
            'type' => 'info',
            'message' => $is_valid ? 'Pengeluaran berhasil divalidasi.' : 'Validasi pengeluaran berhasil dibatalkan.',
        ]);
    }

    /**
     * Delete the product capital.
     */
    public function deleteCapital(Request $request, int $id)
    {
        $capital = GoodsCapital::find($id);
        if (!$capital) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Can not find the goods expense. Please contact admin.']);
        }
        if ($capital->operational_id > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'This goods expense has been validated by Operational Officer.']);
        }
        // update necessary data
        if ($capital->receipt && GoodsCapital::where('receipt', $capital->receipt)->count() <= 1) {
            $disk = Storage::disk(app()->environment('production') ? 'google' : 'public');
            $path = 'images/receipt/goods/expense/' . $capital->receipt;
            if ($disk->exists($path)) {
                $disk->move($path, 'trash/images/receipt/goods/expense/' . $capital->receipt);
            }
        }
        $capital->delete();

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Pengeluaran berhasil dihapus.']);
    }
}
