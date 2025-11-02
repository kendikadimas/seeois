<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Models\Contribution;
use App\Models\ContributionConfig;
use App\Models\Logbook;
use App\Models\ProgramStaff;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\Drivers\Imagick\Driver as ImagickDriver;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request, $id = 0)
    {
        $profile = User::find($id) ?? Auth::user();
        $is_staff = $profile->roles_id > 0;
        if (!$is_staff) {
            $profile = Auth::user();
        }

        if (!$profile->phone || !$profile->password) {
            return back()->with('notif', ['type' => 'info', 'message' => $profile->name . '`s account has not finish the registration process.']);
        }

        $program_list = ProgramStaff::with(['program'])->where('user_id', '=', $profile->id)->get();
        $logbook_list = Logbook::with(['program', 'employee'])->where('user_id', '=', $profile->id)->orderBy('created_at', 'desc')->limit(5)->get();
        $contribution = Contribution::with(['receipt' => ['financial']])->where('user_id', '=', $profile->id)->first();
        $contribution_settings = ContributionConfig::first();
        $data = [
            'profile' => $profile,
            'logbook_list' => $logbook_list,
            'program_list' => $program_list,
            'contribution' => $contribution,
            'contribution_settings' => $contribution_settings,
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ];
        return Inertia::render('Staff/Profile', $data);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {
        $request->validate([
            'name' => ['string', 'min:10', 'max:50', 'nullable'],
            'phone' => ['numeric', 'max_digits:15', 'min_digits:10', 'starts_with:0', 'nullable'],
            'location' => ['string', 'nullable'],
        ]);
        $auth_user = Auth::user();
        $user = User::find($auth_user->id);
        // Update new profile image if exist in request
        if ($request->hasFile('profile_image')) {
            $request->validate(
                [
                    'profile_image' => [File::types(['jpg', 'jpeg', 'png', 'heic', 'webp'])->max(5 * 1024)]
                ]
            );
            // Delete previous profile if exist
            // Checkk for env
            $disk = config('app.env') === 'production' ? 'google' : 'public';
            if ($auth_user->profile_image) {
                Storage::disk($disk)->delete('images/profile/' . $auth_user->profile_image);
            }

            // Format receipt file
            $receipt = $request->file('profile_image');
            // create new manager instance with desired driver
            $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
            $manager = new ImageManager($driver);
            // read receipt image
            $receipt_image = $manager->read($receipt->getRealPath());
            // encod jpeg data
            $receipt_encoded = $receipt_image->toWebp(60);
            // Format receipt name
            $receipt_name =  'PRF_' . $auth_user->id . '_image.webp';
            // store reciept file
            Storage::disk($disk)->put('images/profile/' . $receipt_name, $receipt_encoded);

            $user->profile_image = $receipt_name;
        }

        $user_phone = $request->input('phone') ? $request->input('phone') : $auth_user->phone;
        $user_name = $request->input('name') ? $request->input('name') : $auth_user->name;
        $user_location = $request->input('location') ? $request->input('location') : $auth_user->location;
        $user->phone = $user_phone;
        $user->name = $user_name;
        $user->location = $user_location;

        if ($user->save()) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success update profile.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed update profile. Please try again or contact admin.']);
        }
    }

    function changePassword(Request $request)
    {
        $attempt = session('password_attempt', 4);
        if (($attempt - 1) == 0) {
            session()->pull('password_attempt');
            return redirect()->route('logout')->with('Because your password is wrong too many times, you are logged out. Please try again later.');
        }
        $request->flash();
        $request->validate([
            'old_password' => 'required',
            'password' => ['required', Password::min(8)->mixedCase()->numbers(), Password::defaults(), 'confirmed'],
        ]);
        $auth_user = Auth::user();
        if (!Hash::check($request->input('old_password'), $auth_user->password)) {
            session(['password_attempt' => ($attempt - 1)]);
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Your old password is wrong. You have ' . $attempt . ' more attempt.']);
        }
        if ($request->input('old_password') == $request->input('password')) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Your new password is same to your old password. Please create new different password.']);
        }

        $user = User::find($auth_user->id);
        $user->password = Hash::make($request->input('password'));
        session()->pull('password_attempt');
        if ($user->save()) {
            return redirect()->route('profile.edit')->with('notif', ['type' => 'info', 'message' => 'Your password is changed.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Failed to change password. Please try again or ask admin.']);
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validateWithBag('userDeletion', [
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
