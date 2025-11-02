<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Models\Logbook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\Drivers\Imagick\Driver as ImagickDriver;

class LogbookController extends Controller
{
    function insertLog(Request $request)
    {
        $request->flash();
        $request->validate([
            'program_id' => ['numeric'],
            'description' => ['string'],
            'date_time' => ['date', 'before_or_equal:today'],
            'image' => [File::types(['jpg', 'jpeg', 'png', 'heic'])->max(5 * 1024)],
        ]);
        $auth_user = Auth::user();
        $program_id = $request->input('program_id');

        // Format receipt file
        $receipt = $request->file('image');
        // create new manager instance with desired driver
        $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
        $manager = new ImageManager($driver);
        // get last id
        $last = Logbook::orderBy('id', 'desc')->first();
        $last_id = $last->id;
        // read receipt image
        $receipt_image = $manager->read($receipt->getRealPath());
        // encod jpeg data
        $receipt_encoded = $receipt_image->toWebp(60);
        // Format receipt name
        $receipt_name =  'LB_' . $auth_user->id . $last_id + 1 . '_image.webp';
        // Checkk for env
        $disk = config('app.env') === 'production' ? 'google' : 'public';
        // store reciept file
        Storage::disk($disk)->put('images/log/' . $program_id . '/' . $receipt_name, $receipt_encoded);

        $log = Logbook::create([
            'program_id' => $program_id,
            'user_id' => $auth_user->id,
            'image' => $receipt_name,
            'date_time' => $request->input('date_time'),
            'title' => $request->input('description'),
        ]);

        if ($log) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success submit new log.']);
        }
    }

    function deleteLog(Request $request, $id)
    {
        $log = Logbook::with('program')->find($id);
        if (!$log) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'This log is not found. Please contact admin or try other log. ']);
        }

        $image = Storage::disk('public')->delete('images/log/' . $log->program->id . '/' . $log->image);
        if ($log->delete() && $image) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success delete log.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed delete log. Please try again or contact admin.']);
        }
    }

    function validateLog(Request $request, $id)
    {
        $log = Logbook::find($id);
        if (!$log) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'This log is not found. Please contact admin or try other log. ']);
        }
        $is_validate = $log->validated == 0;
        $log->validated = $is_validate ? 1 : 0;
        $log->save();
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success ' . ($is_validate ? 'validate' : 'unvalidate') . ' log.']);
    }
}
