<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\CustomerVoucher;
use App\Models\FoodOrder;
use App\Models\GeneralContact;
use App\Models\MenuItem;
use App\Services\MenuInventoryService;
use App\Models\Stand;
use App\Models\StandSales;
use App\Models\User;
use App\Models\Voucher;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\Drivers\Imagick\Driver as ImagickDriver;

class ShopController extends Controller
{
    function index()
    {
        $stand_list = Stand::where('menu_lock', '>', 0)->where('sale_validation', '=', 0)->where('date', '>=', now()->format('Y-m-d'))->with(['menu'])->get();
        $data = [
            'notif' => session('notif'),
            'stand_list' => $stand_list,
        ];
        if (Auth::user()) {
            $user = User::find(Auth::user()->id);
            $data += [
                'customer_voucher' => $user->voucher()->wherePivot('use_date', null)->where('end_date', '>=', Carbon::parse(now())->toDateString())->get() ?? collect([]),
                'active_order_list' => StandSales::where('customer_id', '=', Auth::user()->id)->where('cashier_id', '=', 0)->orderBy('updated_at', 'desc')->with(['order' => ['menu'], 'stand'])->get(),
                'finished_order_list' => StandSales::where('customer_id', '=', Auth::user()->id)->where('cashier_id', '>', 0)->orderBy('updated_at', 'desc')->with(['order' => ['menu'], 'stand'])->get(),
            ];
        }
        return Inertia::render('Public/Shop', $data);
    }

    function stand($id, $new = 'old')
    {
        $stand = Stand::find($id);
        if (!$stand) {
            $stand = Stand::where('menu_lock', '>', 0)->where('sale_validation', '=', 0)->first();
        }
        if ($new == 'new') {
            session()->forget('transaction');
        }
        $user = User::with(['voucher'])->find(Auth::user()->id);
        $menu_group = MenuItem::where('stand_id', '=', $stand->id)->with(['tags'])->orderBy('name', 'asc')->get()->groupBy('category');
        return Inertia::render('Public/Stand', [
            'notif' => session('notif'),
            'stand' => $stand,
            'menu_group' => $menu_group,
            'customer_voucher' => $user->voucher()->wherePivot('use_date', null)->where('end_date', '>=', Carbon::parse(now())->toDateString())->get() ?? collect([]),
            'active_transaction' => session('transaction'),
        ]);
    }

    function order(Request $request)
    {
        session()->put('transaction', $request->input());
        return redirect()->route('customer.transaction');
    }

    function transaction()
    {
        if (!session('transaction')) {
            return redirect()->route('shop');
        }
        return Inertia::render('Public/Transaction', [
            'notif' => session('notif'),
            'transaction' => session('transaction'),
            'stand' => Stand::find(session('transaction')['stand_id']),
            'dana_contact' => GeneralContact::where('title', 'dana')->first(),
        ]);
    }

    function setDanaContact(Request $request)
    {
        $request->validate([
            'name' => 'string|required',
            'number' => 'numeric|digits_between:9,13|required',
        ]);
        $contact = GeneralContact::where('title', 'dana')->first();
        if ($contact) {
            $contact->name = $request->input('name');
            $contact->phone = $request->input('number');
            $contact->save();
        } else {
            GeneralContact::create([
                'title' => 'dana',
                'name' => $request->input('name'),
                'phone' => $request->input('number'),
                'address' => ''
            ]);
        }
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'DANA Contact has been set!']);
    }

    public function addTransaction(Request $request)
    {
        // Validating data
        $request->validate([
            'order_type' => ['required', Rule::in(['now', 'pre_order'])],
            'send_option' => ['required', Rule::in(['pick_up', 'delivery'])],
            'payment_method' => ['required', Rule::in(['cash', 'dana'])],
            'payment_price' => ['nullable', 'integer', 'requiredIf:payment_method,cash'],
            'dana_receipt' => ['nullable', 'image', 'max:5000', 'mimes:jpeg,jpg,png,webp', 'requiredIf:payment_method,dana'],
        ]);
        $transaction = session('transaction');
        if (!is_array($transaction)) {
            throw ValidationException::withMessages(['transaction' => 'Sesi transaksi sudah berakhir. Silakan ulangi pesanan.']);
        }

        $transaction = Validator::make($transaction, [
            'stand_id' => ['required', 'integer', Rule::exists('stand', 'id')],
            'transaction' => ['required', 'integer', 'min:0'],
            'discount' => ['nullable', 'integer', 'min:0'],
            'voucher_id' => ['nullable', 'integer'],
            'order_list' => ['required', 'array', 'min:1'],
            'order_list.*.id' => ['required', 'integer', Rule::exists('foods_menu', 'id')->whereNull('deleted_at')],
            'order_list.*.qty' => ['required', 'integer', 'min:1'],
        ])->validate();

        $stand = Stand::findOrFail($transaction['stand_id']);
        $subtotal = 0;
        foreach ($transaction['order_list'] as $order) {
            $menu = MenuItem::where('stand_id', $stand->id)->find($order['id']);
            if (!$menu) {
                throw ValidationException::withMessages(['order_list' => 'Terdapat menu yang bukan milik stand ini.']);
            }
            $subtotal += (int) $menu->price * (int) $order['qty'];
        }

        $discount = 0;
        if (($transaction['voucher_id'] ?? 0) > 0) {
            $voucher = Auth::user()->voucher()
                ->where('voucher.id', $transaction['voucher_id'])->wherePivotNull('use_date')
                ->whereDate('start_date', '<=', today())->whereDate('end_date', '>=', today())->first();
            if (!$voucher || $subtotal < (int) $voucher->min_transaction) {
                throw ValidationException::withMessages(['voucher_id' => 'Voucher tidak valid atau minimum transaksi belum terpenuhi.']);
            }
            $discount = $voucher->discount_percent
                ? min(($subtotal * (float) $voucher->discount_percent) / 100, (float) $voucher->discount_max_price)
                : (float) $voucher->discount_price;
            $discount = (int) min($subtotal, $discount);
        }
        $transaction['discount'] = $discount;
        $transaction['transaction'] = max(0, $subtotal - $discount);
        if ($request->input('payment_method') === 'cash' && (int) $request->input('payment_price') < $transaction['transaction']) {
            throw ValidationException::withMessages(['payment_price' => 'Nominal pembayaran kurang dari total transaksi.']);
        }

        $data = [
            'cashier_id' => 0,
            'stand_id' => $transaction['stand_id'],
            'discount' => $transaction['discount'] ?? 0,
            'transaction' => $transaction['transaction'],
            'voucher_id' => $transaction['voucher_id'] ?? 0,
            'customer' => Auth::user()->name,
            'customer_id' => Auth::user()->id,
            'order_type' => $request->input('order_type'),
            'send_option' => $request->input('send_option'),
            'payment_method_id' => ($request->input('payment_method') == 'cash' ? 1 : 2),
            'payment_price' => $request->input('payment_method') == 'cash' ? $request->input('payment_price') : $transaction['transaction'],
        ];
        if ($request->hasFile('dana_receipt')) {
            // Format receipt file
            $receipt = $request->file('dana_receipt');
            // create new manager instance with desired driver
            $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
            $manager = new ImageManager($driver);
            // read receipt image
            $receipt_image = $manager->read($receipt->getRealPath());
            // encod jpeg data
            $receipt_encoded = $receipt_image->toWebp(60);
            // The final filename is assigned after the sale is created, so it
            // uses the actual primary key and also works for the first sale.
            $data += ['pending_receipt' => $receipt_encoded];
        }
        $pendingReceipt = $data['pending_receipt'] ?? null;
        unset($data['pending_receipt']);
        $storedReceipt = null;
        $receiptDisk = config('app.env') === 'production' ? 'google' : 'public';
        try {
            DB::transaction(function () use ($data, $transaction, $pendingReceipt, $receiptDisk, &$storedReceipt) {
                $sale = StandSales::create($data);
                if ($pendingReceipt !== null) {
                    $receiptName = 'PR' . $sale->stand_id . '_' . $sale->id . '.webp';
                    $storedReceipt = 'images/receipt/stand/income/' . $receiptName;
                    if (!Storage::disk($receiptDisk)->put($storedReceipt, $pendingReceipt)) {
                        throw ValidationException::withMessages(['dana_receipt' => 'Bukti pembayaran gagal disimpan.']);
                    }
                    $sale->update(['receipt_income' => $receiptName]);
                }

                foreach ($transaction['order_list'] as $order) {
                    $menu = MenuItem::where('stand_id', $sale->stand_id)->findOrFail($order['id']);
                    app(MenuInventoryService::class)->adjust($menu, -$order['qty'], Auth::id(), 'sale', 'Pesanan customer #' . $sale->id);
                    $menu->increment('sale', $order['qty']);
                    FoodOrder::create(['sales_id' => $sale->id, 'menu_id' => $menu->id, 'amount' => $order['qty']]);
                }
                if ($data['voucher_id'] > 0) {
                    $voucherOwnership = DB::table('customer_voucher')->where('customer_id', $data['customer_id'])
                        ->where('voucher_id', $data['voucher_id'])->whereNull('use_date')->lockForUpdate()->first();
                    if (!$voucherOwnership) {
                        throw ValidationException::withMessages(['voucher_id' => 'Voucher sudah digunakan atau tidak dimiliki.']);
                    }
                    DB::table('customer_voucher')->where('customer_id', $data['customer_id'])
                        ->where('voucher_id', $data['voucher_id'])->update(['use_date' => now()]);
                }
            });
        } catch (\Throwable $exception) {
            if ($storedReceipt) {
                Storage::disk($receiptDisk)->delete($storedReceipt);
            }
            throw $exception;
        }
        session()->forget('transaction');
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => ['Your order has been set!', 'Our chef is preparing your order. We wish to have your next order soon!']]);
    }

    function promotion()
    {
        return Inertia::render('Public/Promotion', [
            'notif' => session('notif'),
            'voucher_list' => Voucher::orderBy('start_date', 'asc')
                ->where('end_date', '>=', Carbon::parse(now())->toDateString())->with(['operational', 'customer'])
                ->get(),
            'customer_voucher' => User::find(Auth::user()->id)->voucher()->wherePivot('use_date', null)->where('end_date', '>=', Carbon::parse(now())->toDateString())->get(),
        ]);
    }
}
