<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\CustomerVoucher;
use App\Models\FoodOrder;
use App\Models\GeneralContact;
use App\Models\MenuItem;
use App\Models\Stand;
use App\Models\StandSales;
use App\Models\User;
use App\Models\Voucher;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
            'order_type' => ['required', 'string'],
            'send_option' => ['required', 'string'],
            'payment_method' => ['required', 'string'],
            'payment_price' => ['nullable', 'integer', 'requiredIf:payment_method,cash'],
            'dana_receipt' => ['nullable', 'image', 'max:5000', 'mimes:jpeg,jpg,png,webp', 'requiredIf:payment_method,dana'],
        ]);
        $data = [
            'cashier_id' => 0,
            'stand_id' => session('transaction')['stand_id'],
            'discount' => session('transaction')['discount'] ?? 0,
            'transaction' => session('transaction')['transaction'],
            'voucher_id' => session('transaction')['voucher_id'],
            'customer' => Auth::user()->name,
            'customer_id' => Auth::user()->id,
            'order_type' => $request->input('order_type'),
            'send_option' => $request->input('send_option'),
            'payment_method_id' => ($request->input('payment_method') == 'cash' ? 1 : 2),
            'payment_price' => $request->input('payment_method') == 'cash' ? $request->input('payment_price') : session('transaction')['transaction'],
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
            // Get Id
            $last_id = StandSales::orderBy('id', 'desc')->first()->id;
            // Format receipt name
            $receipt_name =  'PR' . session('transaction')['stand_id'] . $last_id + 1 . '.webp';
            // Checkk for env
            $disk = config('app.env') === 'production' ? 'google' : 'public';
            // store reciept file
            Storage::disk($disk)->put('images/receipt/stand/income/' . $receipt_name, $receipt_encoded);
            $data += ['receipt_income' => $receipt_name];
        }
        $sale = StandSales::create($data);
        $order_list = session('transaction')['order_list'];
        foreach ($order_list as $order) {
            $menu = MenuItem::find($order['id']);
            $menu->sale += $order['qty'];
            $menu->save();

            FoodOrder::create([
                'sales_id' => $sale->id,
                'menu_id' => $order['id'],
                'amount' => $order['qty'],
            ]);
        }
        if ($data['voucher_id'] > 0) {
            User::find($data['customer_id'])->voucher()->updateExistingPivot($data['voucher_id'], ['use_date' => now()]);
        }
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
