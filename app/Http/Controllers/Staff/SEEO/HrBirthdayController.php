<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Concerns\ScopedByYear;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HrBirthdayController extends Controller
{
    use ScopedByYear;

    public function index()
    {
        [$activeYear, $yearId] = $this->activeYearScope();
        // Include all staff so HR can add birth dates for those who don't have it yet
        $query = User::whereNotNull('roles_id');
        $this->applyYearScope($query, $yearId);
        
        $users = $query
            ->orderByRaw('birth_date IS NULL, MONTH(birth_date), DAY(birth_date)')
            ->get()
            ->map(function ($user) {
                if ($user->birth_date) {
                    $birthDate = Carbon::parse($user->birth_date);
                    $nextBirthday = Carbon::createFromDate(now()->year, $birthDate->month, $birthDate->day);
                    if ($nextBirthday->isPast()) {
                        $nextBirthday->addYear();
                    }

                    $user->next_birthday = $nextBirthday->toDateString();
                    $user->birthday_in_days = now()->diffInDays($nextBirthday, false);
                } else {
                    $user->next_birthday = '-';
                    $user->birthday_in_days = '-';
                }
                return $user;
            });

        return Inertia::render('Staff/SEEO/Birthdays', [
            'users' => $users,
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'birth_date' => 'required|date',
        ]);

        $user = User::findOrFail($id);
        $user->birth_date = $request->birth_date;
        
        if ($user->save()) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Birthday updated for ' . $user->name]);
        }
        
        return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to update birthday.']);
    }
}
