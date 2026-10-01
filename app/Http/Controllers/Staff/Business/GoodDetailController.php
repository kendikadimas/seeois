<?php

namespace App\Http\Controllers\Staff\Business;

use App\Http\Controllers\Controller;
use App\Models\GoodsProduct;
use App\Models\GoodsSales;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class GoodDetailController extends Controller
{
    /**
     * Show detail page of product.
     */
    public function detail(Request $request, int $id): Response|\Illuminate\Http\RedirectResponse
    {
        $product = GoodsProduct::with(['image', 'variant', 'pic'])->find($id);
        if ($product == null) {
            return redirect()->route('good.product')->with('notif', [
                'type' => 'warning',
                'message' => 'Produk tidak ditemukan. Silakan pilih produk yang tersedia.',
            ]);
        }

        return Inertia::render('Staff/Business/GoodDetail', [
            'product' => $product,
            'cart_count' => GoodsSales::where('transaction', 0)->count(),
            'can_manage' => $request->user()->canPerform('goods.manage'),
            'notif' => session('notif'),
            'errors' => session('errors')?->getBag('default')?->getMessages() ?? (object) [],
        ]);
    }

    /**
     * Insert new product image.
     */
    public function insertImage(Request $request, int $id)
    {
        $validated = $request->validate([
            'note' => ['nullable', 'string', 'max:255'],
            'image' => ['required', File::image()->max(5 * 1024)],
        ]);

        $product = GoodsProduct::findOrFail($id);
        $image = $validated['image'];
        $imageName = 'PI_'.$id.'_'.now()->format('YmdHis').'_'.str()->random(6).'.'.$image->extension();
        $disk = app()->environment('production') ? 'google' : 'public';
        $image->storePubliclyAs('images/product', $imageName, $disk);

        $product_image = ProductImage::create([
            'image' => $imageName,
            'note' => $validated['note'] ?? null,
            'product_id' => $id,
        ]);

        return redirect()->back()->with('notif', [
            'type' => 'info',
            'message' => 'Foto produk berhasil ditambahkan.',
        ]);
    }

    /**
     * Move product image to trash folder.
     */
    public function deleteImage(Request $request, int $id)
    {
        $image = ProductImage::findOrFail($id);
        $product = $image->product;
        $disk = Storage::disk(app()->environment('production') ? 'google' : 'public');
        $path = 'images/product/' . $image->image;
        if ($disk->exists($path)) {
            $disk->move($path, 'trash/images/product/' . $image->image);
        }

        $image->delete();

        return redirect()->back()->with('notif', [
            'type' => 'info',
            'message' => "Foto produk '{$product->name}' berhasil dihapus.",
        ]);
    }

    /**
     * Insert new product variant.
     */
    public function insertVariant(Request $request, int $id)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'description' => ['required', 'string', 'max:2000'],
        ]);
        $product = GoodsProduct::findOrFail($id);
        $variant = ProductVariant::create([
            'product_id' => $id,
            'name' => $validated['name'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'description' => $validated['description'],
        ]);

        return redirect()->back()->with('notif', [
            'type' => 'info',
            'message' => "Varian '{$variant->name}' berhasil ditambahkan ke {$product->name}.",
        ]);
    }

    /**
     * Change the transaction status of the product.
     */
    public function productStatus(Request $request, int $id)
    {
        $product = GoodsProduct::findOrFail($id);
        $product->operational_id = $product->operational_id == 0 ? Auth::user()->id : 0;
        if ($product->save()) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success ' . ($product->operational_id > 0 ? 'open' : 'close') . ' transaction for ' . $product->name . '.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to ' . ($product->operational_id > 0 ? 'open' : 'close') . ' transaction for ' . $product->name . '. Please try again or contact admin.']);
        }
    }

    /**
     * Change the product variant description.
     */
    public function updateDescription(Request $request, int $id)
    {
        $validated = $request->validate([
            'update_description' => ['required', 'string', 'max:2000'],
        ]);
        $variant = ProductVariant::with('product')->findOrFail($id);
        $variant->update(['description' => $validated['update_description']]);

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Deskripsi varian berhasil diperbarui.']);
    }

    /**
     * Change the product variant stock.
     */
    public function updateStock(Request $request, int $id)
    {
        $validated = $request->validate([
            'update_stock' => ['required', 'integer', 'not_in:0'],
        ]);
        $variant = ProductVariant::with('product')->findOrFail($id);
        $newStock = (int) $variant->stock + (int) $validated['update_stock'];

        if ($newStock < 0) {
            throw ValidationException::withMessages([
                'update_stock' => 'Stok tidak boleh menjadi negatif.',
            ]);
        }

        $variant->update(['stock' => $newStock]);

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Stok varian berhasil diperbarui.']);
    }
}
