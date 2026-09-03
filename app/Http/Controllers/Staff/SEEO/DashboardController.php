<?php

namespace App\Http\Controllers\Staff\SEEO;

use App\Http\Controllers\Controller;
use App\Models\Attachment;
use App\Models\Billboard;
use App\Models\Post;
use App\Models\MenuItem;
use App\Models\StandSales;
use App\Models\Logbook;
use App\Models\InternshipApplication;
use App\Models\GovernanceYear;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\Drivers\Imagick\Driver as ImagickDriver;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $diskName = config('app.env') === 'production' ? 'google' : 'public';
        $disk = null;
        try {
            $disk = Storage::disk($diskName);
        } catch (\Throwable $e) {
            Log::warning('Failed to resolve storage disk', ['error' => $e->getMessage()]);
        }

        $billboard_list = Billboard::all()->map(function ($billboard) {
            if ($billboard->image) {
                if (config('app.env') === 'production') {
                    $billboard->full_image_url = url('/google-media/images/billboard/' . $billboard->image);
                } else {
                    $billboard->full_image_url = '/storage/images/billboard/' . $billboard->image;
                }
            }
            return $billboard;
        });

        $post_list = Post::with('user')->orderBy('created_at', 'desc')->limit(50)->get()->map(function ($post) {
            if ($post->anonymus) {
                $post->full_profile_image_url = 'https://ui-avatars.com/api/?name=%3F&color=718096&background=EDF2F7'; // Beautiful anonymous fallback avatar "?"
                return $post;
            }

            $fallbackUrl = 'https://ui-avatars.com/api/?name=' . urlencode($post->user?->name ?? 'User') . '&color=7F9CF5&background=EBF4FF';
            
            if ($post->user && $post->user->profile_image) {
                if (config('app.env') === 'production') {
                    $post->user->full_profile_image_url = url('/google-media/images/profile/' . $post->user->profile_image);
                } else {
                    $post->user->full_profile_image_url = '/storage/images/profile/' . $post->user->profile_image;
                }
            } else {
                if ($post->user) {
                    $post->user->full_profile_image_url = $fallbackUrl;
                }
            }
            return $post;
        });

        $user = $request->user();
        $activeYear = GovernanceYear::current();
        $yearId = $activeYear?->id;
        $year = $activeYear?->year ?? (int) session('selected_year', now()->year);
        $monitoring = [];
        if ($user->canPerform('inventory.view')) {
            $menuScope = fn ($query) => $query->when($yearId, fn ($q) => $q->whereHas('stand', fn ($stand) => $stand->where('year_id', $yearId)));
            $monitoring['Stok menipis'] = $menuScope(MenuItem::query())->where('stock', '<=', 5)->count();
            $monitoring['Menu tanpa resep'] = $menuScope(MenuItem::query())->whereDoesntHave('recipeComponents')->count();
        }
        if ($user->canPerform('sales.manage')) {
            $monitoring['Pengantaran tertunda'] = StandSales::whereNull('delivered_at')->where('send_option', 'delivery')
                ->when($yearId, fn ($query) => $query->whereHas('stand', fn ($stand) => $stand->where('year_id', $yearId)))->count();
        }
        if ($user->canPerform('stands.manage')) {
            $monitoring['Logbook belum valid'] = Logbook::where('validated', 0)->whereYear('created_at', $year)->count();
        }
        if ($user->canPerform('internship.manage')) {
            $monitoring['Internship menunggu review'] = InternshipApplication::where('status', 'pending')->where('internship_year', $year)->count();
        }

        return Inertia::render('Staff/SEEO/Dashboard', [
            'billboard_list' => $billboard_list,
            'attachment_list' => Attachment::all(),
            'post_list' => $post_list,
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
            'monitoring' => $monitoring,
        ]);
    }


    // Billboard function
    function addBillboard(Request $request)
    {
        $request->flash();
        $request->validate([
            'billboard_title' => 'required',
            'billboard_text' => Rule::requiredIf($request->boolean('billboard_typeText')),
            'billboard_image' => ['nullable', Rule::requiredIf($request->boolean('billboard_typeImage')), File::types(['jpg', 'jpeg', 'png', 'heic'])->max(5 * 1024)],
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

    function updateBillboard(Request $request, $id = 0)
    {
        if ($id == 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Missing parameter.']);
        }

        $billboard = Billboard::find($id);
        if (!$billboard) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Billboard doesn`t exist.']);
        }

        $request->flash();
        $request->validate([
            'billboard_title' => 'required',
            'billboard_text' => Rule::requiredIf($request->boolean('billboard_typeText')),
            'billboard_image' => ['nullable', Rule::requiredIf($request->boolean('billboard_typeImage') && !$billboard->image), File::types(['jpg', 'jpeg', 'png', 'heic'])->max(5 * 1024)],
        ]);

        $data = [
            'type' => ($request->input('billboard_typeImage') ? 1 : 0) + ($request->input('billboard_typeText') ? 2 : 0),
            'title' => $request->input('billboard_title'),
            'text' => $request->input('billboard_text'),
        ];

        if (!$request->input('billboard_typeImage') && !$request->input('billboard_typeText')) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Please choose the billboard type.']);
        }

        // Handle image update
        if ($request->input('billboard_typeImage')) {
            if ($request->hasFile('billboard_image')) {
                // Delete old image if exists
                if ($billboard->image) {
                    $disk = config('app.env') === 'production' ? 'google' : 'public';
                    Storage::disk($disk)->delete('images/billboard/' . $billboard->image);
                }

                // Upload new image
                $receipt = $request->file('billboard_image');
                $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
                $manager = new ImageManager($driver);
                $receipt_image = $manager->read($receipt->getRealPath());
                $receipt_encoded = $receipt_image->toWebp(60);
                $receipt_name = 'BB_' . $id . '_image.webp';
                $disk = config('app.env') === 'production' ? 'google' : 'public';
                Storage::disk($disk)->put('images/billboard/' . $receipt_name, $receipt_encoded);

                $data['image'] = $receipt_name;
            } elseif (!$billboard->image) {
                return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'The file is empty. Uncheck image if you do not want to use image.']);
            } else {
                // Keep existing image
                $data['image'] = $billboard->image;
            }
        } else {
            // Remove image if type changed to text only
            if ($billboard->image) {
                $disk = config('app.env') === 'production' ? 'google' : 'public';
                Storage::disk($disk)->delete('images/billboard/' . $billboard->image);
            }
            $data['image'] = null;
        }

        $billboard->update($data);

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success update billboard.']);
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
            $disk = config('app.env') === 'production' ? 'google' : 'public';
            $document->storePubliclyAs('document/attachment/', $document_name, $disk);
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
            $disk = config('app.env') === 'production' ? 'google' : 'public';
            Storage::disk($disk)->delete('document/attachment/' . $attachment->document);        }
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

    function updatePost(Request $request, $id)
    {
        $post = Post::find($id);
        if (!$post) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Post is not exist. Please try again later or ask admin.']);
        }

        $request->flash();
        $input = $request->validate([
            'post_text' => 'required|string|max:255',
        ]);

        $post->update([
            'text' => $input['post_text'],
            'anonymus' => $request->input('post_username') == 'on' ? true : false,
        ]);

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Post has been updated!']);
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
