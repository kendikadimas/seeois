<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\PayrollBalance;
use App\Models\PayrollLevel;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display the employee's roles edit table.
     */
    public function index(Request $request)
    {
        $unemployee_session = session('unemployee', ['category' => 'name', 'order' => 'asc', 'keyword' => '']);
        $employee_session = session('employee', ['category' => 'name', 'order' => 'asc', 'keyword' => '']);
        // Save to session
        $request->session()->put('unemployee', $unemployee_session);
        $request->session()->put('employee', $employee_session);
        // Stand filter
        $employee_category = $employee_session['category'];
        $employee_order = $employee_session['order'];
        $employee_keyword = $employee_session['keyword'];
        $unemployee_category = $unemployee_session['category'];
        $unemployee_order = $unemployee_session['order'];
        $unemployee_keyword = $unemployee_session['keyword'];
        $employees = $employee_keyword !== null ?
            User::where('roles_id', '!=', null)->orderByRaw("
                CASE
                    WHEN name = ? THEN 1
                    WHEN name LIKE ? THEN 2
                    WHEN name LIKE ? THEN 3
                    ELSE 4
                END 
            ", [$employee_keyword, "$employee_keyword%", "%$employee_keyword%"],)->with(['department', 'roles'])->get() :
            User::where('roles_id', '!=', null)->orderBy($employee_category, $employee_order)->with(['department', 'roles'])->get();
        $payroll_balance = PayrollBalance::first();
        $unemployees = $unemployee_keyword !== null ?
            User::where('roles_id', '=', null)->orderByRaw("
                CASE
                    WHEN name = ? THEN 1
                    WHEN name LIKE ? THEN 2
                    WHEN name LIKE ? THEN 3
                    ELSE 4
                END 
            ", [$unemployee_keyword, "$unemployee_keyword%", "%$unemployee_keyword%"],)->get() :
            User::where('roles_id', '=', null)->orderBy($unemployee_category, $unemployee_order)->get();
        if (!$payroll_balance) {
            PayrollBalance::create(['balance' => 0]);
        }
        $payroll_balance = $payroll_balance ? $payroll_balance->balance : 0;
        $data = [
            'employees' => $employees,
            'unemployees' => $unemployees,
            'filter' => [
                'staff' => [
                    'keyword' => $employee_keyword,
                    'category' => $employee_category,
                    'order' => $employee_order,
                ],
                'customer' => [
                    'keyword' => $unemployee_keyword,
                    'category' => $unemployee_category,
                    'order' => $unemployee_order,
                ],
            ],
            'roles' => Role::all(),
            'level_list' => PayrollLevel::orderBy('level', 'asc')->get(),
            'payroll_balance' => $payroll_balance,
            'departments' => Department::all(),
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ];
        return Inertia::render('Staff/SEEO/Employee', $data);
        // return view('pages.staff.roles', $data);
    }

    /**
     * find and filter employee.
     */
    function filterEmployee(Request $request)
    {
        $keyword = $request->has('keyword') || $request->input('keyword') !== null ? $request->input('keyword') : null;
        $category = (!$request->has('keyword') || $request->input('keyword') == null) && $request->has('category') ?  $request->input('category') : 'name';
        $order = (!$request->has('keyword') || $request->input('keyword') == null) && $request->has('order') ?  $request->input('order') : 'asc';
        session()->put('employee', ['category' => $category, 'order' => $order, 'keyword' => $keyword,]);
        return redirect()->route('role');
    }

    /**
     * find and filter employee.
     */
    function filterUnmployee(Request $request)
    {
        $keyword = $request->has('keyword') || $request->input('keyword') !== null ? $request->input('keyword') : null;
        $category = (!$request->has('keyword') || $request->input('keyword') == null) && $request->has('category') ?  $request->input('category') : 'name';
        $order = (!$request->has('keyword') || $request->input('keyword') == null) && $request->has('order') ?  $request->input('order') : 'asc';
        session()->put('unemployee', ['category' => $category, 'order' => $order, 'keyword' => $keyword,]);
        return redirect()->back();
    }

    /**
     * add registered user to employee list.
     */
    function addEmployee(Request $request, $id)
    {

        $user = User::find($id);
        $user->roles_id = 4;

        // save new role
        if ($user->save() > 0) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success add ' . $user->name . ' to SEEO Staff .']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to add employee. Please try again or contact adminsitrator.']);
        }
    }


    /**
     * update Special Role to selected user.
     */
    public function update(Request $request)
    {
        $request->flash();
        $request->validate([
            'user_id' => ['required', 'numeric'],
            'roles_id' => ['required', 'numeric'],
        ]);
        // CEO can not selfupdate 
        if (Auth::user()->id == $request->input('user_id')) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'You are prohibitted to update your role. Please ask another Chief Executive Officer.']);
        }
        $user = User::find($request->input('user_id'));

        $user->roles_id = $request->input('roles_id');

        // save new role
        if ($user->save() > 0) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success update ' . $user->name . '.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Update failed. Please try again or contact adminsitrator.']);
        }
    }

    /**
     * remove user from employee list.
     */
    public function delete(Request $request, $id)
    {
        // check if CEO update his/herself
        if (Auth::user()->id == $id) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'You are prohibitted to delete your role. Please ask another Chief Executive Officer.']);
        }

        $user = User::find($id);
        if (!$user) {
            return redirect()->back()->with('notif', ['type' => 'danger', 'message' => 'User not found! Please try again or ask admin.']);
        }

        // check if user is have relation to any database
        if ($user->program) {
            return redirect()->route('role')->with('notif', ['type' => 'danger', 'message' => 'Can not delete! ' . $user->name . ' is in charge of ' . $user->program->name . ' Program.']);
        }
        if ($user->stand) {
            return redirect()->route('role')->with('notif', ['type' => 'danger', 'message' => 'Can not delete! ' . $user->name . ' is in charge of ' . $user->stand->name . ' Department.']);
        }
        if ($user->manager) {
            return redirect()->route('role')->with('notif', ['type' => 'danger', 'message' => 'Can not delete! ' . $user->name . ' is manager of ' . $user->manager->name . ' Department.']);
        }
        if ($user->level !== null || $user->level > 0) {
            $payroll_level = PayrollLevel::where('level', '=', $user->level)->first();
            $payroll_level->employee -= 1;
            $payroll_level->save();
        }
        $user->roles_id = NULL;
        $user->department_id = NULL;
        if ($user->save() > 0) {
            return redirect()->route('role')->with('notif', ['type' => 'info', 'message' => $user->name . ' account has been removed from Employee List.']);
        } else {
            return redirect()->route('role')->with('notif', ['type' => 'warning', 'message' => 'Delete failed. Please try again or contact admin.']);
        }
    }
}
