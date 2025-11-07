<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Models\BudgetItem;
use App\Models\Department;
use App\Models\DisbursementItem;
use App\Models\ExpenseItem;
use App\Models\Program;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\View\View;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    /**
     * Display departments.
     */
    public function structural(Request $request)
    {
        // Retrieve or create session
        $structural_session = session('structural', ['category' => 'name', 'order' => 'asc', 'keyword' => null]);
        // Save session to database
        $request->session()->put('structural', $structural_session);
        // Stand filter
        $structural_category = $structural_session['category'];
        $structural_order = $structural_session['order'];
        $structural_keyword = $structural_session['keyword'];
        $department_list = $structural_keyword !== null ?
            Department::orderByRaw("
                CASE
                WHEN name = ? THEN 1
                WHEN name LIKE ? THEN 2
                WHEN name LIKE ? THEN 3
                ELSE 4
                END 
            ", [$structural_keyword, "$structural_keyword%", "%$structural_keyword%"])->with(['manager'])->get() :
            Department::orderBy($structural_category, $structural_order)->with(['manager'])->get();
        $data = [
            'staff_list' => User::select(['id', 'name'])->where('roles_id', '>', 0)->get(),
            'department_list' => $department_list,
            'filter' => [
                'category' => $structural_category,
                'order' => $structural_order,
                'keyword' => $structural_keyword,
            ],
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ];
        return Inertia::render('Staff/SEEO/Structural', $data);
    }

    /**
     * filter Department in Structural.
     */
    function filterDepartment(Request $request)
    {
        $keyword = $request->has('keyword') || $request->input('keyword') !== null ? $request->input('keyword') : null;
        $category = (!$request->has('keyword') || $request->input('keyword') == null) && $request->has('category') ?  $request->input('category') : 'name';
        $order = (!$request->has('keyword') || $request->input('keyword') == null) && $request->has('order') ?  $request->input('order') : 'asc';
        session()->put('structural', ['category' => $category, 'order' => $order, 'keyword' => $keyword,]);
        return redirect()->back();
    }

    /**
     * Display departments.
     */
    public function department(Request $request, $id)
    {
        $staff_session = session('department_staff', ['keyword' => null]);
        $request->session()->put('department_staff', $staff_session);
        $department = Department::with(['manager', 'program' => ['user'], 'staff'])->find($id);
        if (!$department) {
            return redirect()->route('structural')->with('notif', ['type' => 'warning', 'message' => 'Department not found. Please select available departments in this page.']);
        }
        $data = [
            'staff_list' => User::select(['id', 'name'])->where('roles_id', '>', 0)->where('department_id', '=', null)->get(),
            'staff_list_2' => User::select(['id', 'name'])->where('roles_id', '>', 0)->get(),
            'department' => $department,
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ];
        return Inertia::render('Staff/SEEO/Department', $data);
    }

    /**
     * filter Staff in Department.
     */
    function filterStaff(Request $request)
    {
        $keyword = $request->has('keyword') ? $request->input('keyword') : null;
        session()->put('department_staff', ['keyword' => $keyword,]);
        return redirect()->back();
    }

    /**
     * add new Department.
     */
    public function insertDepartment(Request $request)
    {
        // Validating data
        $request->validate([
            'name' => ['required', Rule::unique(Department::class)->whereNull('deleted_at')],
            'manager_id' => ['required', 'numeric', Rule::unique(Department::class)->whereNull('deleted_at')],
        ]);

        $department = Department::create(
            [
                'name' => $request->input('name'),
                'manager_id' => $request->input('manager_id'),
            ]
        );
        $manager = User::find($request->input('manager_id'));
        $manager->department_id = $department->id;
        // sucees insert
        if ($department && $manager->save()) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Department ' . $request->input('name') . ' has been added.']);
        };
        return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Can not add Department ' . $request->input('name') . '. Please try again later, or contact admin.']);
    }

    /**
     * update Department.
     */
    public function updateDepartment(Request $request, $id)
    {
        // Validating data
        $request->validate([
            'name' => ['required'],
            'manager_id' => ['required', 'numeric'],
        ]);

        $department = Department::find($id);
        $current_name = $department->name;
        $new_name = $request->input('name');

        $department->name = $new_name;

        if ($department->manager_id !== $request->input('manager_id')) {
            $old_manager = User::find($department->manager_id);
            $old_manager->department_id = null;
            $old_manager->save();

            $new_manager = User::find($request->input('manager_id'));
            $new_manager->department_id = $id;
            $new_manager->save();
        }
        $department->manager_id = $request->input('manager_id');
        // sucees update
        if ($department->save()) {
            if ($current_name != $new_name) {
                return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Department ' . $current_name . ' has been changed to ' . $new_name . '.']);
            } else {
                return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Department ' . $current_name . ' has been updated.']);
            }
        };
        return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'No changes were made.']);
    }

    /**
     * delete Department.
     */
    public function deleteDepartment(Request $request, $id)
    {
        // Authorization check
        if (!Hash::check($request->input('password'), Auth::user()->password)) {
            return back()->with('notif', ['type' => 'danger', 'message' => 'Your password is wrong.']);
            dd();
        }

        // delete budget, disbursement, expense in the program
        $programs = Program::where('department_id', $id);
        foreach ($programs as $program) {
            BudgetItem::where('program_id', $program->id)->delete();
            ExpenseItem::where('program_id', $program->id)->delete();
            DisbursementItem::where('program_id', $program->id)->delete();
        }

        // delete program in the department
        $programs->delete();

        // delete department
        $department = Department::find($id);
        $name = $department->name;
        $department->manager->department_id = null;
        $department->manager->save();

        $department->delete();

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Department ' . $name . ' has been deleted.']);
    }

    /**
     * refresh budget and expense for make sure program budget is accurate.
     * 
     * 
     *  @var $id is program id, @var $add to determine add or minus 
     */
    public function refreshBudgetAndExpense(int $id)
    {
        $department = Department::with('program')->find($id);
        $programs = $department->program;
        $department->budget = $programs->sum('budget');
        $department->expense = $programs->sum('expense');
        $department->disbursement = $programs->sum('disbursement');
        return $department->save();
    }

    function insertStaff(Request $request, $id)
    {
        $request->validate(['staff_id' => 'numeric|required']);

        $user = User::find($request->input('staff_id'));
        if (!$user) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'User not found.']);
        }
        $user->department_id = $id;

        if ($user->save()) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success add ' . $user->name . ' to Department Staff.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to add ' . $user->name . ' to Department Staff. Please try again or ask admin.']);
        }
    }

    function removeStaff(Request $request, $id)
    {
        $user = User::find($id);
        // Check selected user if available in database
        if (!$user) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'User not found.']);
        }
        $department = Department::find($user->department_id)->load(['program']);
        // Check authenticated user must be manager of the department.
        if (Auth::user()->id !== $department->manager_id) {
            return redirect()->back()->with('notif', ['type' => 'danger', 'message' => 'You are not authorize! Only department manager can remove department staff.']);
        }
        // Check selected user if is a program PIC
        if ($user->program) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => $user->name . ' is PIC of ' . $user->program->name . '. Please remove from the program.']);
        }
        $user->department_id = null;
        if ($user->save()) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success remove ' . $user->name . ' from ' . $department->name . ' Department Staff.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to remove ' . $user->name . ' from ' . $department->name . ' Department Staff. Please try again or ask admin.']);
        }
    }
}
