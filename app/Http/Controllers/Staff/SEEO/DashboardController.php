<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Models\Attachment;
use App\Models\Billboard;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\Drivers\Imagick\Driver as ImagickDriver;

class DashboardController extends Controller
{
    public function index()
    {
        $billboard_list = Billboard::all()->map(function ($billboard) {
            if ($billboard->image) {
                $diskName = config('app.env') === 'production' ? 'google' : 'public';
                $disk = Storage::disk($diskName);
                // Storage::url() akan otomatis membuat URL yang benar
                // Untuk disk 'public', hasilnya: /storage/images/billboard/namafile.webp
                // Untuk disk 'google', hasilnya: https://storage.googleapis.com/.../namafile.webp
                $billboard->full_image_url = $disk->url('images/billboard/' . $billboard->image);
            }
            return $billboard;
        });

        return Inertia::render('Staff/SEEO/Dashboard', [
            'billboard_list' => $billboard_list,
            'attachment_list' => Attachment::all(),
            'post_list' => Post::with('user')->orderBy('created_at', 'desc')->limit(50)->get('*'),
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ]);
    }


    // Billboard function
    function addBillboard(Request $request)
    {
        $request->flash();
        $request->validate([
            'billboard_title' => 'required',
            'billboard_text' => Rule::requiredIf($request->boolean('billboard_typeText')),
            'billboard_image' => [Rule::requiredIf($request->boolean('billboard_typeImage')), File::types(['jpg', 'jpeg', 'png', 'heic'])->max(5 * 1024)],
        ]);
        $data = [
            'type' => ($request->input('billboard_typeImage') ? 1 : 0) + ($request->input('billboard_typeText') ? 2 : 0),
            'title' => $request->input('billboard_title'),
            'text' => $request->input('billboard_text'),
        ];
        if (!$request->input('billboard_typeImage') && !$request->input('billboard_typeText')) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Please choose the dashboard type.']);
        }

        if ($request->input('billboard_typeImage')) {
            if ($request->hasFile('billboard_image')) {
                // Format receipt file
                $receipt = $request->file('billboard_image');
                // create new manager instance with desired driver
                $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
                $manager = new ImageManager($driver);
                // get last id
                $last = Billboard::orderBy('id', 'desc')->first();
                $last_id = $last ? $last->id : 0;
                // read receipt image
                $receipt_image = $manager->read($receipt->getRealPath());
                // encod jpeg data
                $receipt_encoded = $receipt_image->toWebp(60);
                // Format receipt name
                $receipt_name =  'BB_' . ($last_id + 1) . '_image.webp';                // Checkk for env
                $disk = config('app.env') === 'production' ? 'google' : 'public';
                // store reciept file
                Storage::disk($disk)->put('images/billboard/' . $receipt_name, $receipt_encoded);

                $data += ['image' => $receipt_name];
            } else {
                return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'The file is empty. Uncheck image if you do not want to use image.']);
            }
        }

        // Save data
        Billboard::create($data);
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success add new Billboard.']);
    }

    function removeBillboard($id = 0)
    {
        if ($id == 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Missing parameter.']);
        }
        $billboard = Billboard::find($id);
        if (!$billboard) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Billboard doesn`t exist. Please ask administrator to check billboard id.']);
        }
        // Delete image if exist
        if ($billboard->image) {
            // FIXED: Hapus dari disk yang benar
            $disk = config('app.env') === 'production' ? 'google' : 'public';
            Storage::disk($disk)->delete('images/billboard/' . $billboard->image);
        }
        $billboard->delete();

        return  redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success delete billboard ' . $billboard->name . '.']);
    }

    // Attachment function
    function addAttachment(Request $request)
    {
        $request->flash();
        $input = $request->validate([
            'attachment_type' => 'required|string',
            'attachment_title' => 'required|string|max:255',
            'attachment_link' => ['url:https', Rule::requiredIf($request->input('attachment_type') == 'link'), 'nullable'],
            'attachment_document' => ['file', 'mimes:pdf,docx,png,jpeg,jpg,heic', 'max:5120', Rule::requiredIf($request->input('attachment_type') == 'document'), 'nullable']
        ]);
        $data = [
            'user_id' => Auth::user()->id,
            'title' => $input['attachment_title'],
        ];

        if ($input['attachment_type'] == 'document') {
            $document = $request->file('attachment_document');
            $document_name =  'af_' . time() . '.' . $document->extension();
            // store image file
            $document->storePubliclyAs('document/attachment/', $document_name, 'google');
            $data += [
                'type' => 0,
                'document' => $document_name
            ];
        } elseif ($input['attachment_type'] == 'link') {
            $data += [
                'type' => 1,
                'link' => $input['attachment_link']
            ];
        }

        Attachment::create($data);

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success add new ' . $input['attachment_type'] . ' attachment']);
    }

    function removeAttachment($id)
    {
        $attachment = Attachment::find($id);
        if (!$attachment) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Attachment doesn`t existed. Your action can damage the system.']);
        }
        if ($attachment->type == 0) {
            Storage::disk('google')->delete('document/attachment/' . $attachment->document);        }
        $attachment->delete();
        
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success remove ' . $attachment->title . ' from attachment list.']);
    }

    // Post function
    function addPost(Request $request)
    {
        $request->flash();
        $input = $request->validate([
            'post_text' => 'required|string|max:255',
        ]);
        Post::create([
            'user_id' => Auth::user()->id,
            'text' => $input['post_text'],
            'anonymus' => $request->input('post_username') == 'on' ? true : false,
        ]);

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'New post has been added!']);
    }

    function removePost($id)
    {
        $post = Post::find($id);
        if (!$post) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Post is not exist. Please try again later or ask admin.']);
        }
        $post->delete();
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success remove post.']);
    }
}
