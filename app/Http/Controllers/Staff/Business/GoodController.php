<?php

namespace App\Http\Controllers\Staff\Business;

use App\Http\Controllers\Controller;
use App\Models\GoodsProduct;
use App\Models\GoodsSales;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GoodController extends Controller
{
    /**
     * Show product list page.
     */
    public function product(Request $request): Response
    {
        $productSession = session('product', ['category' => 'created_at', 'order' => 'desc', 'keyword' => null]);
        $productCategory = in_array($productSession['category'] ?? null, ['name', 'category', 'created_at'], true)
            ? $productSession['category']
            : 'created_at';
        $productOrder = in_array($productSession['order'] ?? null, ['asc', 'desc'], true)
            ? $productSession['order']
            : 'desc';
        $productKeyword = filled($productSession['keyword'] ?? null) ? trim($productSession['keyword']) : null;

        $request->session()->put('product', [
            'category' => $productCategory,
            'order' => $productOrder,
            'keyword' => $productKeyword,
        ]);

        $productList = $productKeyword !== null ?
            GoodsProduct::orderByRaw("
                CASE
                WHEN name = ? THEN 1
                WHEN name LIKE ? THEN 2
                WHEN name LIKE ? THEN 3
                ELSE 4
                END 
            ", [$productKeyword, "$productKeyword%", "%$productKeyword%"])->orderByRaw("
                CASE
                WHEN category = ? THEN 1
                WHEN category LIKE ? THEN 2
                WHEN category LIKE ? THEN 3
                ELSE 4
                END 
            ", [$productKeyword, "$productKeyword%", "%$productKeyword%"])->with(['pic:id,name', 'image', 'variant'])->get()
            : GoodsProduct::with(['pic:id,name', 'image', 'variant'])->orderBy($productCategory, $productOrder)->get();

        return Inertia::render('Staff/Business/GoodProduct', [
            'filter' => [
                'product' => [
                    'category' => $productCategory,
                    'order' => $productOrder,
                    'keyword' => $productKeyword,
                ]
            ],
            'product_list' => $productList,
            'user_list' => User::whereNotNull('roles_id')->orderBy('name')->get(['id', 'name']),
            'cart_count' => GoodsSales::where('transaction', 0)->count(),
            'notif' => session('notif'),
            'errors' => session('errors')?->getBag('default')?->getMessages() ?? (object) [],
        ]);
    }

    /**
     * Insert new product.
     */
    public function insertProduct(Request $request)
    {
        $validated = $request->validate([
            'category' => ['required', 'string', 'max:100'],
            'name' => ['required', 'string', 'max:255'],
            'pic' => ['required', 'integer', 'exists:users,id'],
        ]);

        $product = GoodsProduct::create([
            'category' => $validated['category'],
            'name' => $validated['name'],
            'pic_id' => $validated['pic'],
        ]);

        return redirect()->route('good.product')->with('notif', [
            'type' => 'info',
            'message' => "Produk '{$product->name}' berhasil ditambahkan.",
        ]);
    }

    /**
     * Delete selected product.
     */
    public function deleteProduct(int $id)
    {
        $product = GoodsProduct::with(['variant', 'image'])->findOrFail($id);
        if ($product->variant->sum('sale')) {
            return redirect()->route('good.product')->with('notif', [
                'type' => 'warning',
                'message' => 'Produk yang sudah memiliki penjualan tidak dapat dihapus.',
            ]);
        }

        $disk = Storage::disk(app()->environment('production') ? 'google' : 'public');
        foreach ($product->image as $image) {
            $path = 'images/product/' . $image->image;
            if ($disk->exists($path)) {
                $disk->move($path, 'trash/images/product/' . $image->image);
            }
            $image->delete();
        }
        foreach ($product->variant as $variant) {
            $variant->delete();
        }

        $product->delete();

        return redirect()->route('good.product')->with('notif', [
            'type' => 'info',
            'message' => "Produk '{$product->name}' berhasil dihapus.",
        ]);
    }

    /**
     * Filtering product list order.
     */
    public function filterProduct(Request $request)
    {
        $validated = $request->validate([
            'keyword' => ['nullable', 'string', 'max:100'],
            'category' => ['nullable', 'in:name,category,created_at'],
            'order' => ['nullable', 'in:asc,desc'],
        ]);

        session()->put('product', [
            'category' => $validated['category'] ?? 'name',
            'order' => $validated['order'] ?? 'asc',
            'keyword' => filled($validated['keyword'] ?? null) ? trim($validated['keyword']) : null,
        ]);

        return redirect()->route('good.product');
    }
}
