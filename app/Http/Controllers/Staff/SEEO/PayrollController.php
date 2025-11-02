<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Models\PayrollBalance;
use App\Models\PayrollLevel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PayrollController extends Controller
{
    public function setPayrollSettings(Request $request)
    {
        $request->validate([
            'balance' => ['integer', 'required'],
            'level_list' => ['array', 'required'],
        ]);
        $level_list = collect($request->input('level_list'));
        $duplicates = $level_list->duplicates('level');
        if ($duplicates->count() > 0) {
            $duplicated_level = '';
            $duplicated_length = $duplicates->count() - 1;
            for ($i = 0; $i <= $duplicated_length; $i++) {
                $duplicated_level .= ($i == $duplicated_length && $i > 0  ? ' and ' : ($i > 0 && $i < $duplicated_length ? ', ' : ' ')) . $duplicates->values()->toArray()[$i];
            };
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => ['Level' . $duplicated_level . ' is duplicated or existed. Do not create same level.', 'If you want to edit existing level, just change the salary do not create a new level with the same level.']]);
        }
        // Handle Balance Changes
        $payroll_balance = PayrollBalance::first();
        $payroll_balance->balance = $request->input('balance');
        $payroll_balance->financial_id = Auth::user()->id;
        $payroll_balance->save();

        // Handle New Level
        $new_level = $level_list->filter(function ($item) {
            return (collect($item)->count() == 3) && ($item['deleted_at'] == null);
        });
        if ($new_level->count() > 0) {
            DB::transaction(function () use ($new_level) {
                foreach ($new_level as $item) {
                    PayrollLevel::create([
                        'level' => $item['level'],
                        'salary' => $item['salary'],
                    ]);
                }
            });
        }
        // Handle Level Changes
        $update_level = $level_list->filter(function ($item) {
            return collect($item)->count() == 8;
        });

        $payroll_level = PayrollLevel::all()->keyBy('id');
        $type = 'info';
        $message = collect(['Succes set up payroll settings.']);
        foreach ($update_level as $item) {
            if (isset($payroll_level[$item['id']])) {
                $payroll_level[$item['id']]->level = $item['level'];
                $payroll_level[$item['id']]->salary = $item['salary'];
                // Handle Level Removal
                if ($item['deleted_at'] != null) {
                    if (User::where('level', '=', $item['level'])->get()->count() > 0) {
                        $type = 'warning';
                        $message->push('Level ' . $item['level'] . ' can not be deleted. There are staff on level ' . $item['level'] . '.', 'Please try again after remove every staff on level ' . $item['level'] . '.');
                    } else {
                        $payroll_level[$item['id']]->deleted_at = $item['deleted_at'] ? now() : null;
                    }
                }
            }
        }

        DB::transaction(function () use ($payroll_level) {
            $payroll_level->each->save();
        });

        $this->recountPayrollLevel();

        return redirect()->back()->with('notif', ['type' => $type, 'message' => $message->toArray()]);
    }

    public function recountPayrollLevel()
    {
        $staff_group = User::where('roles_id', '>', 0)->get()->groupBy('level');
        $payroll_level = PayrollLevel::orderBy('level')->get()->keyBy('level');
        $payroll_balance = PayrollBalance::first();
        foreach ($payroll_level as $level) {
            if (isset($payroll_level[$level->level])) {
                $payroll_level[$level->level]->employee = $staff_group[$level->level]->count();
                $percent = $payroll_level[$level->level]->salary;
                $employee = $payroll_level[$level->level]->employee;
                $payroll_level[$level->level]->salary_idr = round($percent * 0.01 * $payroll_balance->balance / $employee);
            }
        }
        DB::transaction(function () use ($payroll_level) {
            $payroll_level->each->save();
        });
    }

    public function updateSingle(Request $request)
    {
        $request->validate([
            'user_id' => ['required', 'integer'],
            'level' => ['required', 'integer'],
        ]);
        $staff = User::find($request->input('user_id'));
        $old_level = $staff->level;
        $new_level = $request->input('level');
        if ($old_level !== $new_level) {
            $staff->level = $new_level;
            $message = ['Success update ' . $staff->name . ' payroll level. ', ' From ' . ($old_level > 0 ? 'level ' . $old_level : ' not have level') . ' to ' . $new_level . '.'];
        } else {
            $message = 'Nothing to update. ' . Str::ucfirst($staff->name) . ' is already at level ' . $old_level . '.';
        }
        $staff->save();
        $this->recountPayrollLevel();
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => $message]);
    }

    public function updateBatch(Request $request)
    {
        $request->validate([
            'staff_id_list' => ['array', 'min:1'],
            'level' => ['integer', 'min:1']
        ]);

        $staff_list = User::whereIn('id', $request->input('staff_id_list'))->get()->keyBy('id');

        foreach ($staff_list as $staff) {
            $staff->level = $request->input('level');
        }

        DB::transaction(function () use ($staff_list) {
            $staff_list->each->save();
        });

        $this->recountPayrollLevel();
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success update batch level of ' . $staff_list->count() . ($staff_list->count() > 1 ? ' persons' : 'person')]);
    }
}
