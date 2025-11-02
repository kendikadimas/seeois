<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Models\BlaterianBalance;
use App\Models\BlaterianGoodBalance;
use App\Models\CashInItem;
use App\Models\ContributionConfig;
use App\Models\Department;
use App\Models\FoodsExpense;
use App\Models\GoodsExpense;
use App\Models\PayrollBalance;
use App\Models\PayrollLevel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\Drivers\Imagick\Driver as ImagickDriver;

class CashFlowController extends Controller
{
    public function index(Request $request)
    {
        // Retrieve or create session
        $cash_in_session = session('cashIn', ['category' => 'price', 'order' => 'asc']);
        $cash_out_session = session('cashOut', ['category' => 'disbursement', 'order' => 'asc']);
        // Retrieve session

        // Save session 
        $request->session()->put('cashIn', $cash_in_session);
        $request->session()->put('cashOut', $cash_out_session);

        // Cash Flow filter
        $cash_in_category = $cash_in_session['category'];
        $cash_in_order = $cash_in_session['order'];
        $cash_in_items = CashInItem::orderBy($cash_in_category, $cash_in_order)->with(['financial'])->get();
        $cash_out_category = $cash_out_session['category'];
        $cash_out_order = $cash_out_session['order'];
        $cash_out_items = Department::orderBy($cash_out_category, $cash_out_order)->with(['manager'])->get();
        $data = [
            'cash_in_items' => $cash_in_items,
            'cash_out_items' => $cash_out_items,
            'cash_in_total' => $cash_in_items->sum('price'),
            'cash_out_total' => $cash_out_items->sum('disbursement'),
            'filter' => [
                'cash_in' => [
                    'category' => $cash_in_category,
                    'order' => $cash_in_order,
                ],
                'cash_out' => [
                    'category' => $cash_out_category,
                    'order' => $cash_out_order,
                ]
            ],
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ];
        return Inertia::render('Staff/SEEO/CashFlow', $data);
    }

    public function feature(Request $request)
    {
        // Retrieve or create session
        $contribution_session = session('contribution', ['category' => 'name', 'order' => 'asc', 'keyword' => null]);
        $default_contribution_id = session('defaultContributionId');
        // Delete session
        session()->forget('defaultContributionId');
        // Save session
        $request->session()->put('contribution', $contribution_session);

        // ContributionConfig
        $contribution_config = ContributionConfig::where('id', '=', 1)->with(['financial'])->first() ??
            ContributionConfig::create([
                'price' => 0,
                'start' => 0,
                'period' => 0,
                'financial_id' => 0,
            ]);
        // Contribution filter
        $contribution_category = $contribution_session['category'];
        $contribution_order = $contribution_session['order'];
        $contribution_keyword = $contribution_session['keyword'];
        $contribution_users = $contribution_keyword !== null ?
            User::where('roles_id', '>', 0)->orderByRaw("
                CASE
                WHEN name = ? THEN 1
                WHEN name LIKE ? THEN 2
                WHEN name LIKE ? THEN 3
                ELSE 4
                END 
            ", [$contribution_keyword, "$contribution_keyword%", "%$contribution_keyword%"])->with(['contribution' => ['receipt' => ['financial']]])->get() :
            User::where('roles_id', '>', 0)->orderBy($contribution_category, $contribution_order)->with(['contribution' => ['receipt' => ['financial']]])->get();

        $payroll_detail = PayrollLevel::orderBy('level')->get();
        $payroll_balance = PayrollBalance::with(['financial'])->first() ?? PayrollBalance::create([
            'balance' => 0,
        ]);
        $data = [
            'default_contribution_id' => $default_contribution_id ?? 0,
            'contribution_config' => $contribution_config,
            'contribution_users' => $contribution_users,
            'payroll_detail' => $payroll_detail,
            'payroll_balance' => $payroll_balance,
            'filter' => [
                'contribution' => [
                    'category' => $contribution_category,
                    'order' => $contribution_order,
                    'keyword' => $contribution_keyword,
                ],
            ],
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ];
        return Inertia::render('Staff/SEEO/FinanceFeature', $data);
    }

    /**
     * filter cash In.
     */
    function filterCashIn(Request $request)
    {
        $category = $request->input('category');
        $order = $request->input('order');
        session()->put('cashIn', ['category' => $category, 'order' => $order]);
        return redirect()->back();
    }

    /**
     * filter cash Out.
     */
    function filterCashOut(Request $request)
    {
        $category = $request->input('category');
        $order = $request->input('order');
        session()->put('cashOut', ['category' => $category, 'order' => $order]);
        return redirect()->back();
    }

    function showMyContribution(int $id)
    {
        $user_id =  Auth::user()->id;
        if ($id == $user_id) {
            session()->put('defaultContributionId', $user_id);
        }
        return redirect()->route('finance.feature');
    }

    /**
     * add new Cash In Item.
     */
    public function insertCashInItem(Request $request)
    {
        $request->flash();
        // Validating data
        $request->validate([
            'name' => ['required', 'string'],
            'price' => ['required', 'integer'],
            'receipt' => ['required', File::types(['jpg', 'jpeg', 'png', 'heic'])->max(5 * 1024)],
        ]);

        // Format receipt file
        $receipt = $request->file('receipt');
        // create new manager instance with desired driver
        $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
        $manager = new ImageManager($driver);
        // get last id
        $last = CashInItem::orderBy('id', 'desc')->first();
        $last_id = $last->id;
        // read receipt image
        $receipt_image = $manager->read($receipt->getRealPath());
        // encod jpeg data
        $receipt_encoded = $receipt_image->toWebp(60);
        // Format receipt name
        $receipt_name =  'CI_' . $last_id + 1 . '_receipt.webp';
        // Checkk for env
        $disk = config('app.env') === 'production' ? 'google' : 'public';
        // store reciept file
        Storage::disk($disk)->put('images/receipt/cash_in/' . $receipt_name, $receipt_encoded);

        $data = [
            'financial_id' => Auth::user()->id,
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'reciept' => $receipt_name,
            'updated_at' => now(),
            'created_at' => now()
        ];

        // sucees insert
        CashInItem::create($data);
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'New cash in item has been added.']);
    }


    /**
     * delete Cash In Item.
     */
    public function deleteCashInItem($ci_id)
    {
        $cashInItem = CashInItem::find($ci_id);
        if ($cashInItem->name == 'Contribution Charge') {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Contribution Charge can not be deleted. It is needed to display total cash in from staff contribution.']);
        }
        $foods_balance = FoodsExpense::where('category', '=', 'withdraw')->where('category_id', '=', $ci_id)->first();
        $continue = true;
        if ($foods_balance) {
            $balance = BlaterianBalance::first();
            $balance->expense -= $foods_balance->price;
            $balance->balance = $balance->income - $balance->expense;
            $balance->save();
            $foods_balance->delete();
            $continue = false;
        }
        if ($continue) {
            $goods_balance = GoodsExpense::where('category', '=', 'withdraw')->where('category_id', '=', $ci_id)->first();
            if ($goods_balance) {
                $balance = BlaterianGoodBalance::first();
                $balance->expense -= $goods_balance->price;
                $balance->balance = $balance->income - $balance->expense;
                $balance->save();
                $goods_balance->delete();
            }
        }
        // delete budget item
        Storage::disk('public')->delete('images/receipt/cash_in/' . $cashInItem->reciept);
        if ($cashInItem->delete()) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Succes delete Cash In Item.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to delete Cash In Item. Please try again, or contact admin.']);
        }
    }

    /**
     * validate Cash In Item.
     */
    public function validateCashInItem($ci_id)
    {
        $cashInItem = CashInItem::find($ci_id);
        $cashInItem->financial_id = Auth::user()->id;

        if ($cashInItem->save()) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Succes validate Cash In Item.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to validate Cash In Item. Please try again, or contact admin.']);
        }
    }
}
