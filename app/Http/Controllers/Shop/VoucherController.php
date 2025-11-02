<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\Drivers\Imagick\Driver as ImagickDriver;

class VoucherController extends Controller
{
    function addVoucher(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:30',
            'code' => 'nullable|string|max:30|unique:voucher,code',
            'point' => 'required|integer|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'image' => 'nullable|image|max:2048|mimes:jpeg,jpg,png,webp|dimensions:ratio=1',
            'user_quota' => 'required|integer|min:1',
            'min_transaction' => 'required|numeric|min:0',
            'discount_type' => 'required|string',
            'discount_price' => 'nullable|numeric|min:0|required_if:discount_type,price',
            'discount_percent' => 'nullable|numeric|min:0|max:100|required_if:discount_type,percent',
            'discount_max_price' => 'nullable|numeric|min:0|required_if:discount_type,percent',
        ]);
        $data = [
            'name' => $request->input('name'),
            'code' => $request->input('code'),
            'point' => $request->input('point'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
            'user_quota' => $request->input('user_quota'),
            'min_transaction' => $request->input('min_transaction'),
            'discount_type' => $request->input('discount_type'),
            'discount_price' => $request->input('discount_price'),
            'discount_percent' => $request->input('discount_percent'),
            'discount_max_price' => $request->input('discount_max_price'),
            'operational_id' => Auth::user()->id,
        ];
        // Handle file upload for image if provided
        $image = $request->file('image');
        if ($image) {
            // Checkk for env
            $disk = config('app.env') === 'production' ? 'google' : 'public';
            // Format receipt file
            // create new manager instance with desired driver
            $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
            $manager = new ImageManager($driver);
            // read receipt image
            $voucher_image = $manager->read($image->getRealPath());
            // encod jpeg data
            $image_encoded = $voucher_image->toWebp(60);
            // Get last id
            $last_id = Voucher::orderBy('id', 'desc')->first()->id;
            // Format receipt name
            $image_name =  'VCH_' . $last_id + 1 . '_' . now()->format('dmyhis') . '.webp';
            // store reciept file
            Storage::disk($disk)->put('images/shop/voucher/' . $image_name, $image_encoded);
            $data['image'] =  $image_name;
        } else {
            $data['image'] = null; // Set to null if no image is provided
        }
        // Logic to save the voucher goes here
        Voucher::create($data);
        // Return success response
        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Voucher added successfully!']);
    }

    function deleteVoucher($voucher_id)
    {
        $voucher = Voucher::find($voucher_id);
        if (!$voucher) {
            return redirect()->back()->with('notif', ['type' => 'error', 'message' => 'Voucher not found.']);
        }
        // Check if the voucher has been redeemed by any user
        if ($voucher->customer()->count() > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'This voucher has already been redeemed by users and cannot be deleted.']);
        }
        // Delete the voucher
        $voucher->delete();
        return redirect()->back()->with('notif', ['type' => 'success', 'message' => 'Voucher deleted successfully!']);
    }
}
