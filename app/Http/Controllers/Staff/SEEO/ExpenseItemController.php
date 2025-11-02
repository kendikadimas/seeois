<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\ExpenseItem;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\Drivers\Imagick\Driver as ImagickDriver;

class ExpenseItemController extends Controller
{
    /**
     * add new ExpenseItem.
     */
    public function insertExpenseItem(Request $request, $id)
    {
        $request->flash();
        // Validating data
        $request->validate([
            'name' => ['required', 'string'],
            'price' => ['required', 'integer'],
            'qty' => ['required', 'integer'],
            'unit' => ['required', 'string'],
            'reciept' => [Rule::requiredIf($request->input('same_receipt_check') == false), File::types(['jpg', 'jpeg', 'png', 'heic'])->max(5 * 1024), 'nullable'],
            'receipt_same' => [Rule::requiredIf($request->input('same_receipt_check') == true), 'integer'],
        ]);
        if ($request->input('same_receipt_check') == false) {
            // Format receipt file
            $receipt = $request->file('reciept');
            // create new manager instance with desired driver
            $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
            $manager = new ImageManager($driver);
            // get last id
            $last = ExpenseItem::orderBy('id', 'desc')->first();
            $last_id = $last->id;
            // read receipt image
            $receipt_image = $manager->read($receipt->getRealPath());
            // encod jpeg data
            $receipt_encoded = $receipt_image->toWebp(60);
            // Format receipt name
            $receipt_name =  'PE_' . $id . $last_id + 1 . '_receipt.webp';
            // Checkk for env
            $disk = config('app.env') === 'production' ? 'google' : 'public';
            // store reciept file
            Storage::disk($disk)->put('images/receipt/expense/' . $receipt_name, $receipt_encoded);
        } else {
            $reciept_name = ExpenseItem::find($request->input('receipt_same'))->reciept;
        }
        $total_price =  $request->input('qty') *  $request->input('price');
        $data = [
            'program_id' => $id,
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'qty' => $request->input('qty'),
            'unit' => $request->input('unit'),
            'total_price' => $total_price,
            'reciept' => $reciept_name,
            'updated_at' => now(),
            'created_at' => now()
        ];
        // sucees insert
        $expenseItem = new ExpenseItem();
        if ($expenseItem->insert($data) > 0) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'New expense item has been added.']);
        };
        return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Can not add new expense item. Please try again later, or contact admin.']);
    }

    /**
     * delete ExpenseItem.
     */
    public function deleteExpenseItem($id)
    {
        $expenseItem = ExpenseItem::find($id);
        $expense = $expenseItem;
        $program = $expenseItem->program;
        // delete budget item
        $success = $expenseItem->delete();
        $has_same_receipt = ExpenseItem::where('reciept', '=', $expense->reciept);
        if ($has_same_receipt->count() == 0) {
            Storage::disk('public')->delete('images/receipt/expense/' . $expense->reciept);
        }
        if ($success) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success delete ' . $expense->name . ' from ' . $program->name . ' Program Expense']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to delete ' . $expense->name . ' from ' . $program->name . ' Program Expense. Please try again or contact admin.']);
        }
    }

    /**
     * validate receipt ExpenseItem.
     */
    public function validateReceipt(Request $request, $id = 0)
    {
        $receipt_id = $id == 0 ? $request->input('receipt_id') : $id;
        $expenseItem = ExpenseItem::find($receipt_id);
        $is_validate = $expenseItem->financial_id > 0;
        $expenseItem->financial_id = !$is_validate ? Auth::user()->id : null;
        $valid = $is_validate ? 'unvalidate' : 'validate';
        // update necessary data
        $this->updateProgramExpense($expenseItem->program_id, !$is_validate, $expenseItem->total_price);
        if ($expenseItem->save()) {
            return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Success ' . $valid . ' ' . $expenseItem->name . '.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to ' . $valid . ' ' . $expenseItem->name . '. Please try again or contact admin.']);
        }
    }


    /**
     * update new program total expense.
     * 
     * 
     *  @var $id is program id, @var $add to determine add or minus 
     */
    public function updateProgramExpense(int $id, bool $add, int $new_expense)
    {
        $program = Program::find($id);
        $current_expense = $program->expense;
        if ($add) {
            $program->expense = $current_expense + $new_expense;
        } else {
            $program->expense = $current_expense - $new_expense;
        }
        $department = Department::find($program->department_id);
        $current_expense = $department->expense;
        if ($add) {
            $department->expense = $current_expense + $new_expense;
        } else {
            $department->expense = $current_expense - $new_expense;
        }
        return $program->save() && $department->save();
    }
}
