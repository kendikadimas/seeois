<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Staff\Business\BlaterianFoodBalanceController;
use App\Http\Controllers\Staff\Business\BlaterianGoodBalanceController;
use App\Models\Department;
use App\Models\DisbursementItem;
use App\Models\FoodsIncome;
use App\Models\GoodsIncome;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\Drivers\Imagick\Driver as ImagickDriver;

class DisbursementItemController extends Controller
{
    /**
     * add new DisbursementItem.
     */
    public function insertDisbursementItem(Request $request, $id)
    {
        $request->flash();
        // Validating data
        $request->validate([
            'name' => ['required', 'string'],
            'price' => ['required', 'integer'],
            'letter_id' => ['required', 'integer'],
            'receipt' => ['required', File::types(['jpg', 'jpeg', 'png', 'heic'])->max(5 * 1024)],
        ]);

        // Format receipt file
        $receipt = $request->file('receipt');
        // create new manager instance with desired driver
        $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
        $manager = new ImageManager($driver);
        // get last id
        $last = DisbursementItem::orderBy('id', 'desc')->first();
        $last_id = $last->id;
        // read receipt image
        $receipt_image = $manager->read($receipt->getRealPath());
        // encod jpeg data
        $receipt_encoded = $receipt_image->toWebp(60);
        // Format receipt name
        $receipt_name =  'DS_' . $id . $last_id + 1 . '_receipt.webp';
        // Checkk for env
        $disk = config('app.env') === 'production' ? 'google' : 'public';
        // store reciept file
        Storage::disk($disk)->put('images/receipt/disbursement/' . $receipt_name, $receipt_encoded);

        // add new disbursement item
        $disbursement = DisbursementItem::create([
            'name' => $request->input('name'),
            'financial_id' => Auth::user()->id,
            'program_id' => $id,
            'letter_id' => $request->input('letter_id'),
            'price' => $request->input('price'),
            'reciept' => $receipt_name,
            'updated_at' => now(),
            'created_at' => now()
        ]);
        // add new Blaterian disbursement
        $blaterian_balance = $request->input('blaterian_balance');
        if ($blaterian_balance !== null) {
            switch ($request->input('blaterian_disbursement')) {
                case 'foods':
                    $balance = FoodsIncome::create([
                        'name' => $request->input('name'),
                        'price' => $request->input('price'),
                        'category' => 'program disbursement',
                        'category_id' => $disbursement->id,
                    ]);
                    BlaterianFoodBalanceController::refreshBalance();
                    break;

                default:
                    $balance = GoodsIncome::create([
                        'name' => $request->input('name'),
                        'price' => $request->input('price'),
                        'category' => 'program disbursement',
                        'category_id' => $disbursement->id,
                    ]);
                    BlaterianGoodBalanceController::refreshBalance();
                    break;
            }
        }
        // update necessary data
        $this->updateProgramDisbursement($id, true, $request->input('price'));
        if ($disbursement) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success add new Disbursement Item.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to add new Disbursement Item. Please try again or contact admin.']);
        }
    }

    /**
     * delete DisbursementItem.
     */
    public function deleteDisbursementItem($id)
    {
        $disbursementItem = DisbursementItem::find($id);
        $name = $disbursementItem->name;
        $program = $disbursementItem->program;
        $this->updateProgramDisbursement($disbursementItem->program_id, false, $disbursementItem->price);
        // delete disbursement item
        Storage::disk('public')->delete('images/receipt/disbursement/' . $disbursementItem->reciept);
        $disbursementItem->financial_id = Auth::user()->id;
        $disbursementItem->save();
        $success_delete = $disbursementItem->delete();
        // delete blaterian disbursement
        $foods_income = FoodsIncome::where('category', 'program disbursement')->where('category_id', $id)->first();
        $goods_income = GoodsIncome::where('category', 'program disbursement')->where('category_id', $id)->first();
        $blaterian_disbursement = $foods_income ? $foods_income : $goods_income;
        if ($blaterian_disbursement) {
            $success_delete = $success_delete && $blaterian_disbursement->delete();
            BlaterianFoodBalanceController::refreshBalance();
            BlaterianGoodBalanceController::refreshBalance();
        }
        if ($success_delete) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success delete Disbursement Item ' . $name . ' from ' . $program->name . ' Program Budget.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to delete Disbursement Item ' . $name . ' from ' . $program->name . ' Program Budget. Please try again or contact admin.']);
        }
    }

    /**
     * update new program total disbursement.
     * 
     * 
     *  @var $id is program id, @var $add to determine add or minus 
     */
    public function updateProgramDisbursement(int $id, bool $add, int $new_disbursement)
    {
        $program = Program::find($id);
        $current_disbursement = $program->disbursement;
        if ($add) {
            $program->disbursement = $current_disbursement + $new_disbursement;
        } else {
            $program->disbursement = $current_disbursement - $new_disbursement;
        }
        $department = Department::find($program->department_id);
        $current_disbursement = $department->disbursement;
        if ($add) {
            $department->disbursement = $current_disbursement + $new_disbursement;
        } else {
            $department->disbursement = $current_disbursement - $new_disbursement;
        }

        return $program->save() && $department->save();
    }
}
