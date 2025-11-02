<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Models\BudgetItem;
use App\Models\Department;
use App\Models\DisbursementItem;
use App\Models\DisbursementLetter;
use App\Models\ExpenseItem;
use App\Models\Logbook;
use App\Models\Program;
use App\Models\ProgramStaff;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProgramController extends Controller
{
    /**
     * Display the program details.
     */
    public function program(Request $request, $id)
    {
        $program = Program::where('id', '=', $id)->with(['department', 'financial', 'user'])->first();
        // program not exist
        if ($program == null) {
            return redirect()->route('department');
        }

        // Retrieve or create session
        $budget_session = session('program_budget', ['category' => 'name', 'order' => 'asc']);
        $disbursement_session = session('program_disbursement', ['category' => 'created_at', 'order' => 'desc', 'trashed' => 'exist']);
        $expense_session = session('program_expense', ['category' => 'name', 'order' => 'asc']);
        $staff_session = session('program_staff', ['category' => 'created_at', 'order' => 'asc']);
        $default_session = session('default', ['tab' => 1, 'collapse' => 1]);
        // Retrieve session
        $default_logbook_id = session('defaultLogbookId');
        // Delete session
        session()->forget('defaultLogbookId');
        // Save session to database
        $request->session()->put('program_budget', $budget_session);
        $request->session()->put('program_disbursement', $disbursement_session);
        $request->session()->put('program_expense', $expense_session);
        $request->session()->put('program_staff', $staff_session);
        $request->session()->put('default', $default_session);
        // Balance filter
        $budget_category = $budget_session['category'];
        $budget_order = $budget_session['order'];
        $budget_list = BudgetItem::where('program_id', $id)->orderBy($budget_category, $budget_order)->get();
        $disbursement_category = $disbursement_session['category'];
        $disbursement_order = $disbursement_session['order'];
        $disbursement_list = $disbursement_session['trashed'] == 'trashed' ? DisbursementItem::onlyTrashed()->where('program_id', $id)->with(['financial'])->orderBy($disbursement_category, $disbursement_order)->get() : DisbursementItem::where('program_id', $id)->with(['financial', 'letter'])->orderBy($disbursement_category, $disbursement_order)->get();
        $expense_category = $expense_session['category'];
        $expense_order = $expense_session['order'];
        $expense_list = ExpenseItem::with(['financial'])->where('program_id', $id)->orderBy($expense_category, $expense_order)->get();
        $disbursement_letter_list = DisbursementLetter::with(['disbursement', 'program'])->where('program_id', $id)->orderBy('created_at', 'desc')->get();
        $staff_category = $staff_session['category'];
        $staff_order = $staff_session['order'];
        $staff_list = $staff_category == 'name' ?
            ProgramStaff::with('employee')->where('program_id', $id)->join('users', 'program_staff.user_id', '=', 'users.id')->orderBy($staff_category, $staff_order)->select('program_staff.*')->get() :
            ProgramStaff::with('employee')->where('program_id', $id)->orderBy($staff_category, $staff_order)->get();
        $employee_list = User::where('roles_id', '>', 0)->whereNotIn('id', $staff_list->pluck('user_id'))->select(['name', 'id'])->get();
        $logbook_list = Logbook::where('program_id', '=', $program->id)->orderBy('date_time', 'desc')->get();
        $data = [
            'available_users' => User::where('roles_id', '!=', null)->get(),
            'default_logbook_id' => $default_logbook_id ?? 0,
            'program' => $program,
            'budget_list' => $budget_list,
            'disbursement_list' => $disbursement_list,
            'disbursement_letter_list' => $disbursement_letter_list->toArray(),
            'expense_list' => $expense_list,
            'staff_list' => $staff_list,
            'employee_list' => $employee_list,
            'logbook_list' => $logbook_list,
            'filter' => [
                'budget' => [
                    'category' => $budget_category,
                    'order' => $budget_order,
                ],
                'staff' => [
                    'category' => $staff_category,
                    'order' => $staff_order,
                ],
                'disbursement' => [
                    'category' => $disbursement_category,
                    'order' => $disbursement_order,
                    'trashed' => $disbursement_session['trashed'],
                ],
                'expense' => [
                    'category' => $expense_category,
                    'order' => $expense_order,
                ],
            ],
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ];
        return Inertia::render('Staff/SEEO/Program', $data);
    }

    /**
     * filter program Budget.
     */
    function filterBudget(Request $request, int $id)
    {
        $category = $request->input('category');
        $order = $request->input('order');
        session()->put('program_budget', ['category' => $category, 'order' => $order]);
        session()->put('default', ['tab' => 1, 'collapse' => 2]);
        return redirect()->back();
    }
    /**
     * filter program Disbursement.
     */
    function filterDisbursement(Request $request, int $id)
    {
        $category = $request->input('category') ?  $request->input('category') : session('program_disbursement')['category'];
        $order = $request->input('order') ? $request->input('order') : session('program_disbursement')['order'];
        $trashed = $request->input('trashed') ? $request->input('trashed') : session('program_disbursement')['trashed'];
        // dd($request->input('category'), $order, $trashed);
        session()->put('default', ['tab' => 2, 'collapse' => 2]);
        session()->put('program_disbursement', ['category' => $category, 'order' => $order, 'trashed' => $trashed]);
        return redirect()->back();
    }
    /**
     * filter program Expense.
     */
    function filterExpense(Request $request, int $id)
    {
        $category = $request->input('category');
        $order = $request->input('order');
        session()->put('default', ['tab' => 3, 'collapse' => 2]);
        session()->put('program_expense', ['category' => $category, 'order' => $order]);
        return redirect()->back();
    }
    /**
     * filter program Staff.
     */
    function filterStaff(Request $request, int $id)
    {
        $category = $request->input('category');
        $order = $request->input('order');
        session()->put('default', ['tab' => 4, 'collapse' => 2]);
        session()->put('program_staff', ['category' => $category, 'order' => $order]);
        return redirect()->back();
    }

    function showMyLogbook(int $program_id, int $logbook_id)
    {
        $user_id =  Auth::user()->id;
        if ($logbook_id == $user_id) {
            session()->put('defaultLogbookId', $user_id);
        }
        return redirect()->route('program', $program_id);
    }

    /**
     * add new Program.
     */
    public function insertProgram(Request $request, $id)
    {
        $auth_user = Auth::user();
        // Validating data
        $request->validate([
            'name' => ['required', 'string'],
            'pic_id' => ['required', 'numeric'],
        ]);

        $department = Department::find($id);
        // check manager
        if ($auth_user->id != $department->manager_id) {
            return back()->with('notif', ['type' => 'info', 'message' => 'You are not allowed. Please contact the Manager.']);
        };

        $program = Program::create([
            'name' => $request->input('name'),
            'pic_id' => $request->input('pic_id'),
            'department_id' => $department->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $staff = ProgramStaff::create([
            'title' => 'Person In Charge',
            'program_id' => $program->id,
            'user_id' => $request->input('pic_id'),
        ]);
        // sucees insert
        if ($program && $staff) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Succes create Program ' . $request->input('name') . '.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to create Program ' . $request->input('name') . '. Please try again later, or contact admin.']);
        }
    }

    /**
     * update Program.
     */
    public function updateProgram(Request $request, $id)
    {
        // Validating data
        $request->validate([
            'name' => ['required', 'unique:' . Program::class],
            'pic_id' => ['required', 'numeric'],
        ]);

        $current_name = Program::find($id)->name;
        $new_name = $request->input('name');

        $data = ['name' => $new_name, 'pic_id' => $request->input('pic_id')];
        $program = new Program();
        // sucees update
        if ($program->change($id, $data) > 0) {
            if ($current_name != $new_name) {
                return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Program ' . $current_name . ' has been changed to ' . $new_name . '.']);
            } else {
                return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Program ' . $current_name . ' has been updated.']);
            }
        };
        return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Can not change department name at the moment. Please try again later, or contact admin.']);
    }

    /**
     * delete Program.
     */
    public function deleteProgram(Request $request, $id)
    {
        // delete department
        $program = Program::find($id);
        $name = $program->name;
        if ($program->budget > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => $name . ' Program have approved budget. Please remove any budget.']);
        } elseif ($program->disbursement > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => $name . ' Program have some disbursement. Please remove any disbursement.']);
        } elseif ($program->expense > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => $name . ' Program have some expense. Please remove any expense.']);
        } elseif ($program->staff->count() > 1) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => $name . ' Program have some staff. Please remove any staff exclude the Person In Charge.']);
        }
        $department_id = $program->department_id;
        $pic = ProgramStaff::where('program_id', '=', $id)->first();
        if ($program->delete() && $pic->delete()) {
            return redirect()->route('department', ['id' => $department_id])->with('notif', ['type' => 'info', 'message' => 'Succes delete ' . $name . ' Program.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Failed to delete ' . $name . ' Program. Please try again, or contact admin.']);
        }
    }

    /**
     * change validation of selected program budget.
     */
    public function validateBudget($id, $valid)
    {
        $program = Program::find($id);
        $program->financial_id = $valid == 0 ? 0 : Auth::user()->id;
        $program->updated_at = now();
        $validate = $valid == 0 ? 'unvalidate ' : 'validate ';
        if ($program->save() > 0) {
            return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Success ' . $validate . $program->name . ' Program Budget.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Success ' . $validate . $program->name . ' Program Budget. Please try again later or contact admin.']);
        }
    }


    /**
     * refresh budget and expense for make sure program budget is accurate.
     * 
     * 
     *  @var $id is program id, @var $add to determine add or minus 
     */
    public function refreshData(int $id)
    {
        $program = Program::find($id);
        $budget_price = 0;
        $expense_price = 0;
        $disbursement_price = 0;
        $budgets = BudgetItem::where('program_id', $id)->get();
        foreach ($budgets as $budget) {
            $budget_price += $budget->total_price;
        }
        $expenses = ExpenseItem::where('program_id', $id)->where('financial_id', '!=', null)->get();
        foreach ($expenses as $expense) {
            $expense_price += $expense->total_price;
        }
        $disbursements = DisbursementItem::where('program_id', $id)->get();
        foreach ($disbursements as $disbursement) {
            $disbursement_price += $disbursement->price;
        }
        $data = ['budget' => $budget_price, 'expense' => $expense_price, 'disbursement' => $disbursement_price];

        // also refresh department budget
        $department = new DepartmentController();
        $department->refreshBudgetAndExpense($program->department_id);

        return $program->change($id, $data);
    }

    // Staff Program 
    function insertStaff(Request $request, $id)
    {
        $request->flash();
        $request->validate([
            'staff_id' => ['required', 'numeric'],
            'staff_title' => ['required', 'string'],
        ]);

        $staff = ProgramStaff::create([
            'program_id' => $id,
            'user_id' => $request->input('staff_id'),
            'title' => $request->input('staff_title'),
        ]);

        if ($staff) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success add ' . User::find($request->input('staff_id'))->name . ' as ' . $request->input('staff_title') . ' staff.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to add ' . User::find($request->input('staff_id'))->name . ' as ' . $request->input('staff_title') . ' staff. Please try again or contact admin.']);
        }
    }

    function deleteStaff(Request $request, $id)
    {
        $staff = ProgramStaff::find($id);
        $program_id = $staff->program_id;
        $user_id = $staff->user_id;

        if ($staff->delete()) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success remove ' . User::find($user_id)->name . ' as ' . $request->input('staff_title') . '.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to remove ' . User::find($user_id)->name . ' as ' . $request->input('staff_title') . '. Please try again or contact admin.']);
        }
    }
}
