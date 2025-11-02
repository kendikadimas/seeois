<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Models\CashInItem;
use App\Models\Contribution;
use App\Models\ContributionConfig;
use App\Models\ContributionReceipt;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\Drivers\Imagick\Driver as ImagickDriver;

class ContributionController extends Controller
{

    /**
     * find and filter contribution.
     */
    function filterContribution(Request $request)
    {
        $keyword = $request->has('keyword') || $request->input('keyword') !== null ? $request->input('keyword') : null;
        $category = (!$request->has('keyword') || $request->input('keyword') == null) && $request->has('category') ?  $request->input('category') : 'name';
        $order = (!$request->has('keyword') || $request->input('keyword') == null) && $request->has('order') ?  $request->input('order') : 'asc';
        session()->put('contribution', ['category' => $category, 'order' => $order, 'keyword' => $keyword,]);
        return redirect()->back();
    }

    function setCashIn()
    {
        // set Contribution Charge in Cash In Item.
        return CashInItem::create([
            'name' => 'Contribution Charge',
            'price' => 0,
            'financial_id' => Auth::user()->id,
        ]);
    }

    /**
     * insert contribution receipt.
     */
    function insert(Request $request)
    {
        // Data Validation
        $request->validate([
            'month' => ['required', 'numeric'],
            'receipt' => [File::types(['jpg', 'jpeg', 'png', 'heic'])->max(5 * 1024)],
        ]);

        $month = $request->input(('month'));
        $config = ContributionConfig::first();
        $employee = User::select('id', 'name')->with('contribution')->find(Auth::user()->id);
        // check if input month greater than configuration period.
        if ($employee->contribution && $employee->contribution->month + $month > $config->period) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'You can not contribute more than ' . $config->period - $employee->contribution->month . ' month.']);
        }
        if (!$employee->contribution) {
            $contribution = new Contribution();
            $contribution->user_id = $employee->id;
            $contribution->months = 0;
            $contribution->save();
        }
        $contribution = User::select('id')->find($employee->id)->contribution;
        $updated_contribution = $contribution->receipt ? $contribution->receipt->count() : 0;
        $contribution_receipt = new ContributionReceipt();
        $contribution_receipt->contribution_id = $contribution->id;
        $contribution_receipt->months = $request->input('month');

        // Format receipt file
        $receipt = $request->file('receipt');
        // create new manager instance with desired driver
        $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
        $manager = new ImageManager($driver);

        // read receipt image
        $receipt_image = $manager->read($receipt->getRealPath());
        // encod jpeg data
        $receipt_encoded = $receipt_image->toWebp(60);
        // Format receipt name
        $receipt_name =  'CTR_' . $employee->id . $updated_contribution + 1 . '_receipt.webp';
        // Checkk for env
        $disk = config('app.env') === 'production' ? 'google' : 'public';
        // store reciept file
        Storage::disk($disk)->put('images/receipt/contribution/' . $receipt_name, $receipt_encoded);

        $contribution_receipt->receipt = $receipt_name;

        if ($contribution_receipt->save() > 0) {
            return back()->with('notif', ['type' => 'info', 'message' => 'Your contribution charge upload successfully. Unpaid bill will be updated when Financial validate your receipt.']);
        } else {
            return back()->with('notif', ['type' => 'warning', 'message' => 'Your contribution charge upload failed. Please try again or contact admin.']);
        }
    }

    /**
     * delete contribution receipt.
     */
    function delete(Request $request)
    {
        $receipt = ContributionReceipt::find($request->input('receipt_id'));
        if ($receipt->financial_id) {
            return back()->with('notif', ['type' => 'warning', 'message' => 'Please unvalidate this receipt before deleting it.']);
        }
        if ($receipt->delete() > 0) {
            return back()->with('notif', ['type' => 'info', 'message' => 'Success delete ' . $receipt->receipt . '.']);
        } else {
            return back()->with('notif', ['type' => 'warning', 'message' => 'Failed delete ' . $receipt->receipt . '. Please try again or contact admin.']);
        }
    }

    /**
     * validate contribution receipt.
     */
    function validation($id)
    {
        $receipt = ContributionReceipt::find($id);
        if (!$receipt) {
            return back()->with('notif', ['type' => 'warning', 'message' => 'Contribution Receipt not found. Please do not commit any changes to the application.']);
        }
        $cash_in = CashInItem::where('name', '=', 'Contribution Charge')->first();
        $config = ContributionConfig::first();
        $validate = $receipt->financial_id ? 'unvalidate' : 'validate';
        if (!$receipt->financial_id) {
            $receipt->financial_id = Auth::user()->id;
            $receipt->contribution->months += $receipt->months;
            $cash_in->price += $receipt->months * $config->price;
        } else {
            $receipt->financial_id = null;
            $receipt->contribution->months -= $receipt->months;
            $cash_in->price -= $receipt->months * $config->price;
        }
        if ($receipt->contribution->save() && $receipt->save() && $cash_in->save()) {
            return back()->with('notif', ['type' => 'info', 'message' => 'Success ' . $validate . ' ' . $receipt->receipt . '.']);
        } else {
            return back()->with('notif', ['type' => 'warning', 'message' => 'Failed ' . $validate . ' ' . $receipt->receipt . '.']);
        }
    }


    // CONFTRIBUTION SETTINGS

    /**
     * update configuration.
     */
    function updateContributionConfiguration(Request $request)
    {
        // Data Validation
        $request->validate([
            'price' => ['required', 'numeric'],
            'start' => ['required', 'numeric'],
            'end' => ['required', 'numeric', ''],
        ]);

        $contribution_config = ContributionConfig::first();
        $is_same = $contribution_config->price == $request->input('price');
        $contribution_config->price = $request->input('price');
        $contribution_config->start = $request->input('start');
        $contribution_config->period = $request->input('end') - $request->input('start') + 1;
        $contribution_config->financial_id = Auth::user()->id;
        $existed_contribution = Contribution::select(['id'])->get();
        $existed_receipt = ContributionReceipt::select(['id'])->get();
        $unvalidate = false;
        if (!$is_same) {
            Contribution::whereIn('id', $existed_contribution)->update(['months' => 0]);
            ContributionReceipt::whereIn('id', $existed_receipt)->update(['financial_id' => null]);
            $cash_in = CashInItem::where('name', '=', 'Contribution Charge')->first();
            $cash_in->price = 0;
            $cash_in->save();
            $unvalidate = true;
        }

        if ($contribution_config->save()) {
            return back()->with('notif', ['type' => 'info', 'message' => 'Success settting Contribution.' . ($unvalidate ? ' All receipt has been unvalidate. Please re-validate all receipt.' : '')]);
        } else {
            return back()->with('notif', ['type' => 'waring', 'message' => 'Failed settting Contribution. Please try again, or contact admin.']);
        }
    }
}
