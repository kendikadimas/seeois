<?php

namespace App\Http\Controllers\Staff\Business;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Concerns\ScopedByYear;
use App\Models\FoodOrder;
use App\Models\FoodsExpense;
use App\Models\FoodsIncome;
use App\Models\FoodsTag;
use App\Models\GeneralContact;
use App\Models\GovernanceYear;
use App\Models\MenuItem;
use App\Models\Stand;
use App\Models\StandExpense;
use App\Models\StandSales;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\Drivers\Imagick\Driver as ImagickDriver;
use App\Services\ProfitCalculator;
use App\Services\MenuInventoryService;


class StandController extends Controller
{
    use ScopedByYear;

    /**
     * Choose Stand before go to detail stand.
     */
    function index(Request $request)
    {
        [$activeYear, $defaultYearId] = $this->activeYearScope();

        // Allow switching year via query param (year tab filter)
        $selectedYearId = $request->integer('year_id', $defaultYearId);
        $yearId = $selectedYearId ?: $defaultYearId;

        // All governance years for tab bar
        $governanceYears = GovernanceYear::orderByDesc('year')->get(['id', 'year', 'label', 'is_active']);

        // Retrieve or create session
        $stand_session = session('stand', ['category' => 'date', 'order' => 'desc', 'active' => false]);
        $request->session()->put('stand', $stand_session);
        // Stand filter
        $stand_category = $stand_session['category'];
        $stand_order    = $stand_session['order'];
        $stand_active   = $stand_session['active'];

        $standQuery = Stand::with(['pic'])->where('year_id', $yearId);
        if ($stand_active) {
            $standQuery->where('menu_lock', '>', 0)->where('sale_validation', '=', 0);
        }
        $stand_list = $standQuery->orderBy($stand_category, $stand_order)->get();

        $staffQuery = User::select(['id', 'name'])->where('roles_id', '>', 0)->where('year_id', $yearId);
        $staff_list = $staffQuery->get();

        $data = [
            'staff_list'      => $staff_list,
            'stand_list'      => $stand_list,
            'governance_years'=> $governanceYears,
            'selected_year_id'=> $yearId,
            'active_year_id'  => $defaultYearId,
            'filter'          => [
                'category' => $stand_category,
                'order'    => $stand_order,
                'active'   => $stand_active,
            ],
            'notif'  => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ];
        return Inertia::render('Staff/Business/Stand', $data);
    }
    /**
     * Display foods stand detail.
     */
    public function stand(Request $request, $id = 0)
    {
        $stand = Stand::with(['pic', 'menu_validator', 'sales_validator', 'production', 'cashier'])->find($id);
        if (!$stand) {
            return redirect()->route('food.stand')->with('notif', ['type' => 'warning', 'message' => 'Stand not found. Choose available stand on this page.']);
        }
        // Auto-recalculate profit using recipe components if available
        $newProfit = \App\Services\ProfitCalculator::calculateStandProfit($stand->id);
        if ($newProfit !== null && $newProfit != $stand->profit) {
            $stand->profit = $newProfit;
            $stand->save();
        }
        // Retrieve or create session
        $income_session = session('stand_income', ['name' => null]);
        $expense_session = session('stand_expense', ['name' => null]);
        // Save session to database
        $request->session()->put('stand_income', $income_session);
        $request->session()->put('stand_expense', $expense_session);
        // Include recipe components to allow frontend coverage indicator
        $menu_list = MenuItem::where('stand_id', $stand->id)
            ->with(['tags', 'recipeComponents.expense'])
            ->orderBy('name', 'asc')
            ->get()
            ->groupBy('category');
        $income_name = $income_session['name'];
        $income_list = $income_name !== null ?
            StandSales::where('stand_id', $stand->id)->orderByRaw("
                CASE
                    WHEN customer = ? THEN 1
                    WHEN customer LIKE ? THEN 2
                    WHEN customer LIKE ? THEN 3
                    ELSE 4
                END 
            ", [$income_name, "$income_name%", "%$income_name%"])->with(['order' => ['menu'], 'cashier' => function ($q) {
                $q->select('id', 'name');
            }, 'payment' => function ($q) {
                $q->select('id', 'name');
            }, 'customer' => function ($q) {
                $q->select('id', 'name', 'phone');
            }])->get() :
            StandSales::where('stand_id', $stand->id)->orderBy('created_at', 'desc')->with(['order' => ['menu'],  'cashier' => function ($q) {
                $q->select('id', 'name');
            }, 'payment' => function ($q) {
                $q->select('id', 'name');
            }, 'customer' => function ($q) {
                $q->select('id', 'name', 'phone');
            }])->get();
        $expense_name = $expense_session['name'];
        $expense_list = $expense_name !== null ? StandExpense::where('stand_id', $stand->id)->orderByRaw("
                CASE
                    WHEN name = ? THEN 1
                    WHEN name LIKE ? THEN 2
                    WHEN name LIKE ? THEN 3
                    ELSE 4
                END 
            ", [$expense_name, "$expense_name%", "%$expense_name%"])->with(['operational'])->get() :
            StandExpense::where('stand_id', $stand->id)->orderBy('created_at', 'desc')->with(['operational'])->get();
        $food_tag_list = FoodsTag::all();
        $data = [
            'sidebar' => 'blaterian',
            'users' => User::where('roles_id', '!=', null)->get(),
            'stand' => $stand,
            'menu_category' => $menu_list,
            'all_categories' => MenuItem::select('category')->distinct()->pluck('category')->toArray(),
            'income_list' => $income_list,
            'expense_list' => $expense_list,
            'food_tag_list' => $food_tag_list,
            'dana_contact' => GeneralContact::where('title', '=', 'dana')->first(),
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ];
        // Server-side debug snapshot to verify data retrieval
        Log::debug('[StandController@stand] Data prepared', [
            'stand_id' => $stand->id,
            'stand_name' => $stand->name,
            'menu_lock' => $stand->menu_lock,
            'sale_validation' => $stand->sale_validation,
            'production_count' => $stand->production->count(),
            'cashier_count' => $stand->cashier->count(),
            'menu_category_groups' => collect($menu_list)->keys(),
            'income_list_count' => $income_list->count(),
            'expense_list_count' => $expense_list->count(),
            'food_tag_list_count' => $food_tag_list->count(),
        ]);
        return Inertia::render('Staff/Business/StandDetail', $data);
    }

    /**
     * Filtering stand order.
     */
    function filterStand(Request $request)
    {
        $active = $request->input('active');
        $category =  $request->input('category');
        $order =  $request->input('order');
        $yearId = $request->input('year_id');
        session()->put('stand', ['category' => $category, 'order' => $order, 'active' => $active,]);
        return redirect()->route('food.stand', ['year_id' => $yearId]);
    }

    /**
     * Add new stand.
     */
    function insertStand(Request $request)
    {
        [$activeYear, $defaultYearId] = $this->activeYearScope();
        $yearId = $request->integer('year_id') ?: $defaultYearId;

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'pic_id' => [
                'required',
                'integer',
                Rule::exists('users', 'id')->where(fn ($query) => $query
                    ->where('roles_id', '>', 0)
                    ->where('year_id', $yearId)),
            ],
            'place' => ['required', 'string', 'max:255'],
            'type' => ['required', 'integer', Rule::in([0, 1, 2])],
            'date' => ['required', 'date', 'after_or_equal:today'],
            'year_id' => ['nullable', 'integer', 'exists:governance_years,id'],
        ]);

        $stand = DB::transaction(function () use ($validated, $yearId) {
            $stand = Stand::create([
                'name' => trim($validated['name']),
                'pic_id' => $validated['pic_id'],
                'date' => $validated['date'],
                'place' => trim($validated['place']),
                'type' => $validated['type'],
                'year_id' => $yearId,
            ]);

            FoodsExpense::create([
                'category' => 'stand expense',
                'category_id' => $stand->id,
                'price' => 0,
            ]);

            FoodsIncome::create([
                'category' => 'stand income',
                'category_id' => $stand->id,
                'price' => 0,
            ]);

            return $stand;
        });

        return redirect()
            ->route('food.stand.detail', ['id' => $stand->id])
            ->with('notif', ['type' => 'info', 'message' => "Stand '{$stand->name}' berhasil dibuat. Lanjutkan dengan menambahkan tim, menu, dan bahan belanja."]);
    }

    /**
     * update Stand.
     */
    public function updateStand(Request $request, $id)
    {
        // Validating data
        $request->validate([
            'name' => ['required', 'string'],
            'place' => ['required', 'string'],
            'type' => ['required', 'numeric'],
            'date' => ['required', 'date',  'after_or_equal:today'],
        ]);

        $stand = Stand::find($id);
        if (!$stand) {
            return redirect()->route('food.stand')->with('notif', ['type' => 'warning', 'message' => 'Stand tidak ditemukan.']);
        }
        $stand->name = $request->input('name');
        $stand->place = $request->input('place');
        $stand->date = $request->input('date');
        $stand->type = $request->input('type');
        // sucees update
        if ($stand->save()) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success update Stand ' . $stand->name . '.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to update Stand ' . $stand->name . '. Please try again later, or contact admin.']);
        };
    }

    /**
     * delete stand.
     */
    public function deleteStand(Request $request, $id)
    {
        $stand = Stand::find($id);
        if (!$stand) {
            return redirect()->route('food.stand')->with('notif', ['type' => 'warning', 'message' => 'Stand tidak ditemukan atau sudah dihapus.']);
        }

        // Authorization check
        if (!Hash::check($request->input('password'), $request->user()->password)) {
            return back()->with('notif', ['type' => 'danger', 'message' => 'Your password is wrong.']);
        }

        // Delete stand expense, income, and menu
        StandExpense::where('stand_id', $id)->delete();
        $sales = StandSales::where('stand_id', $id)->with(['order'])->get();
        foreach ($sales as $sale) {
            foreach ($sale->order as $order) {
                $order->delete();
            }
            $sale->delete();
        }
        MenuItem::where('stand_id', $id)->delete();
        FoodsExpense::where('category', 'stand expense')->where('category_id', $id)->delete();
        FoodsIncome::where('category', 'stand income')->where('category_id', $id)->delete();

        // delete stand
        $name = $stand->name;
        $stand->delete();

        // update data
        BlaterianFoodBalanceController::refreshBalance();

        return redirect()->route('food.stand')->with('notif', ['type' => 'warning', 'message' => 'Stand ' . $name . ' has been deleted.']);
    }

    // update production staff
    function setProductionStaff(Request $request, $stand_id)
    {
        $request->validate([
            'staff_list' => ['array', 'required'],
        ]);
        $stand = Stand::find($stand_id);
        if (!$stand) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Stand not found. Please set stand production staff from available form.']);
        }

        $staff_list = collect($request->input('staff_list'));

        // Handle New Staff
        $new_staff = $staff_list->filter(function ($item) {
            return collect($item)->count() == 2;
        });
        // Handle Old Staff
        $old_staff = $staff_list->filter(function ($item) {
            return (collect($item)->count() > 3);
        });

        $duplicates = $staff_list->duplicates('name');
        if (($duplicates->count()) > 0) {
            $duplicated_staff = '';
            $duplicated_length = $duplicates->count() - 1;
            for ($i = 0; $i <= $duplicated_length; $i++) {
                $duplicated_staff .= ($i == $duplicated_length && $i > 0  ? ' and ' : ($i > 0 && $i < $duplicated_length ? ', ' : ' ')) . $duplicates->values()->toArray()[$i];
            };
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => ['You have duplicated staff name : ' . $duplicated_staff . '.', 'Do not try to delete then add same person.']]);
        }


        if ($new_staff->count() > 0) {
            $stand->production()->attach($new_staff->pluck('id')->toArray());
        }
        foreach ($old_staff as $staff) {
            if ($staff['deleted_at'] != null) {
                $stand->production()->detach($staff['id']);
            }
        }

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success update Stand ' . $stand->name . ' production staff.']);
    }

    // update cashier staff
    function setCashierStaff(Request $request, $stand_id)
    {
        $request->validate([
            'staff_list' => ['array', 'required'],
        ]);
        $stand = Stand::find($stand_id);
        if (!$stand) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Stand not found. Please set stand cashier from available form.']);
        }

        $staff_list = collect($request->input('staff_list'));

        // Handle New Staff
        $new_staff = $staff_list->filter(function ($item) {
            return collect($item)->count() == 2;
        });
        // Handle Old Staff
        $old_staff = $staff_list->filter(function ($item) {
            return (collect($item)->count() > 3);
        });

        $duplicates = $staff_list->duplicates('name');
        if (($duplicates->count()) > 0) {
            $duplicated_staff = '';
            $duplicated_length = $duplicates->count() - 1;
            for ($i = 0; $i <= $duplicated_length; $i++) {
                $duplicated_staff .= ($i == $duplicated_length && $i > 0  ? ' and ' : ($i > 0 && $i < $duplicated_length ? ', ' : ' ')) . $duplicates->values()->toArray()[$i];
            };
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => ['You have duplicated staff name : ' . $duplicated_staff . '.', 'Do not try to delete then add same person.']]);
        }


        if ($new_staff->count() > 0) {
            $stand->cashier()->attach($new_staff->pluck('id')->toArray());
        }
        foreach ($old_staff as $staff) {
            if ($staff['deleted_at'] != null) {
                $stand->cashier()->detach($staff['id']);
            }
        }

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success update Stand ' . $stand->name . ' Cashier.']);
    }

    // STAND EXPENSE

    /**
     * Filtering stand expense order.
     */
    function filterStandExpense(Request $request)
    {
        $name = $request->input('name');
        session()->put('stand_expense', ['name' => $name]);
        return redirect()->back();
    }

    /**
     * add new Stand Expense.
     */
    public function insertStandExpense(Request $request, $id)
    {
        $user = $request->user();
        abort_unless($user, 401);

        $stand = Stand::with('production')->find($id);
        if (!$stand) {
            return redirect()->route('food.stand')->with('notif', [
                'type' => 'warning',
                'message' => 'Stand tidak ditemukan. Silakan pilih stand yang masih tersedia.',
            ]);
        }

        $canAddExpense = is_super_admin($user)
            || $user->canPerform('stands.manage')
            || $stand->production->contains('id', $user->id);
        abort_unless($canAddExpense, 403, 'Anda tidak memiliki akses untuk menambahkan pengeluaran pada stand ini.');

        $reuseReceipt = $request->boolean('same_receipt_check');
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:1'],
            'qty' => ['required', 'integer', 'min:1'],
            'unit' => ['required', 'string', 'max:50'],
            'same_receipt_check' => ['nullable', 'boolean'],
            'reciept' => [
                Rule::requiredIf(!$reuseReceipt),
                'nullable',
                File::types(['jpg', 'jpeg', 'png', 'webp'])->max(5 * 1024),
            ],
            'receipt_same' => [
                Rule::requiredIf($reuseReceipt),
                'nullable',
                'integer',
                Rule::exists('stand_expense_item', 'id')->where(fn ($query) => $query
                    ->where('stand_id', $stand->id)
                    ->whereNotNull('reciept')
                    ->whereNull('deleted_at')),
            ],
        ], [
            'reciept.required' => 'Foto struk wajib diunggah.',
            'reciept.max' => 'Ukuran foto struk maksimal 5 MB.',
            'receipt_same.required' => 'Pilih pengeluaran yang struknya ingin digunakan kembali.',
            'receipt_same.exists' => 'Struk yang dipilih tidak tersedia pada stand ini.',
        ]);

        if ($reuseReceipt) {
            $sourceExpense = StandExpense::where('stand_id', $stand->id)
                ->whereKey($validated['receipt_same'])
                ->whereNotNull('reciept')
                ->firstOrFail();
            $receiptName = $sourceExpense->reciept;
        } else {
            try {
                $receipt = $request->file('reciept');
                $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
                $manager = new ImageManager($driver);
                $receiptEncoded = $manager->read($receipt->getRealPath())->toWebp(60);
                $receiptName = 'SE' . $stand->id . '_' . now()->format('YmdHis') . random_int(100000, 999999) . '_receipt.webp';
                $receiptPath = 'images/receipt/stand/expense/' . $receiptName;

                // Public storage keeps the feature usable if the remote disk is temporarily unavailable.
                $stored = Storage::disk('public')->put($receiptPath, $receiptEncoded);
                try {
                    $stored = Storage::disk('google')->put($receiptPath, $receiptEncoded) || $stored;
                } catch (\Throwable $exception) {
                    Log::warning('Stand expense receipt could not be mirrored to Google Drive', [
                        'stand_id' => $stand->id,
                        'message' => $exception->getMessage(),
                    ]);
                }

                if (!$stored) {
                    throw new \RuntimeException('Receipt could not be stored.');
                }
            } catch (\Throwable $exception) {
                Log::error('Failed to process stand expense receipt', [
                    'stand_id' => $stand->id,
                    'user_id' => $user->id,
                    'message' => $exception->getMessage(),
                ]);

                return redirect()->back()
                    ->withInput()
                    ->withErrors(['reciept' => 'Foto struk gagal diproses. Gunakan JPG, PNG, atau WebP maksimal 5 MB.']);
            }
        }

        StandExpense::create([
            'stand_id' => $stand->id,
            'name' => trim($validated['name']),
            'price' => $validated['price'],
            'qty' => $validated['qty'],
            'unit' => trim($validated['unit']),
            'total_price' => $validated['qty'] * $validated['price'],
            'reciept' => $receiptName,
        ]);

        return redirect()->back()->with('notif', [
            'type' => 'info',
            'message' => "Pengeluaran '{$validated['name']}' berhasil ditambahkan.",
        ]);
    }

    /**
     * delete StandExpenseItem.
     */
    public function deleteStandExpenseItem(Request $request, $id)
    {
        $expenseItem = StandExpense::with(['stand.production'])->find($id);
        if (!$expenseItem || !$expenseItem->stand) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Data pengeluaran tidak ditemukan.']);
        }

        $user = $request->user();
        $stand = $expenseItem->stand;
        $canDeleteExpense = is_super_admin($user)
            || $user?->canPerform('stands.manage')
            || $stand->production->contains('id', $user?->id);
        abort_unless($canDeleteExpense, 403, 'Anda tidak memiliki akses untuk menghapus pengeluaran ini.');

        if ($expenseItem->operational_id) {
            return redirect()->back()->with('notif', [
                'type' => 'warning',
                'message' => 'Pengeluaran yang sudah divalidasi tidak dapat dihapus. Batalkan validasi terlebih dahulu.',
            ]);
        }

        if ($stand->sale_validation > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Stand sudah ditutup sehingga pengeluaran tidak dapat diubah.']);
        }

        $name = $expenseItem->name;
        $receiptName = $expenseItem->reciept;
        $expenseItem->delete();

        $receiptStillUsed = $receiptName && StandExpense::where('reciept', $receiptName)->exists();
        if ($receiptName && !$receiptStillUsed) {
            $receiptPath = 'images/receipt/stand/expense/' . $receiptName;
            foreach (['public', 'google'] as $disk) {
                try {
                    Storage::disk($disk)->delete($receiptPath);
                } catch (\Throwable $exception) {
                    Log::warning('Could not delete unused stand expense receipt', [
                        'disk' => $disk,
                        'path' => $receiptPath,
                        'message' => $exception->getMessage(),
                    ]);
                }
            }
        }

        return redirect()->back()->with('notif', [
            'type' => 'info',
            'message' => "Pengeluaran '{$name}' berhasil dihapus dari stand {$stand->name}.",
        ]);
    }

    /**
     * validate receipt StandExpense.
     */
    public function validateExpenseReceipt(Request $request, $id)
    {
        $authUser = $request->user();
        abort_unless($authUser, 401);

        $stand_expense = StandExpense::with('stand')->find($id);
        if (!$stand_expense || !$stand_expense->stand) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Data pengeluaran tidak ditemukan.']);
        }

        $stand = $stand_expense->stand;
        if ($stand->sale_validation > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => "Stand {$stand->name} sudah ditutup sehingga validasi tidak dapat diubah."]);
        }

        $valid = !$stand_expense->operational_id;
        $stand_expense->operational_id = $valid ? $authUser->id : null;
        $stand_expense->save();
        $this->updateStandExpense($stand->id, $valid, $stand_expense->total_price);

        return redirect()->back()->with('notif', [
            'type' => 'info',
            'message' => $valid
                ? "Pengeluaran '{$stand_expense->name}' berhasil divalidasi."
                : "Validasi pengeluaran '{$stand_expense->name}' berhasil dibatalkan.",
        ]);
    }

    /**
     * update new stand total expense.
     * 
     * 
     *  @var $id is stand id, @var $add to determine add or minus 
     */
    public function updateStandExpense(int $id, bool $add, int $new_expense)
    {
        $stand = Stand::find($id);
        if (!$stand) {
            return null;
        }

        // Recalculate from the source records to prevent totals drifting after retries.
        $updatedExpense = StandExpense::where('stand_id', $id)
            ->whereNotNull('operational_id')
            ->where('operational_id', '>', 0)
            ->sum('total_price');

        $foodsExpense = FoodsExpense::firstOrNew([
            'category' => 'stand expense',
            'category_id' => $id,
        ]);
        $foodsExpense->price = $updatedExpense;
        $stand->expense = $updatedExpense;

        // Recalculate profit using recipe components if available, else fallback
        $recalc = ProfitCalculator::calculateStandProfit($stand->id);
        $stand->profit = $recalc !== null ? $recalc : ($stand->income - $stand->expense);

        // save model
        $stand->save();
        $foodsExpense->save();
        return BlaterianFoodBalanceController::refreshBalance();
    }


    // MENU

    /**
     * Filtering stand menu order.
     */
    function filterStandMenu(Request $request, $id)
    {
        $category = $request->input('category');
        $order = $request->input('order');
        session()->put('stand_menu', ['category' => $category, 'order' => $order]);
        return redirect()->route('food.stand', ['id' => $id, 'default_tab' => 2, 'default_collapse' => 1]);
    }

    /**
     * add new Stand Menu.
     */
    public function insertMenu(Request $request, $id)
    {
        $stand = Stand::find($id);
        if (!$stand) {
            return redirect()->route('food.stand')->with('notif', ['type' => 'warning', 'message' => 'Stand tidak ditemukan.']);
        }

        $user = $request->user();
        $isProductionOnly = !$user->canPerform('menu.manage');
        if ($isProductionOnly) {
            abort_unless(
                $stand->production()->where('users.id', $user->id)->exists(),
                403,
                'Anda tidak ditugaskan pada stand ini.'
            );
        }

        if ($stand->menu_lock > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => "Menu stand {$stand->name} sudah dikunci dan tidak dapat ditambah."]);
        }
        if ($stand->sale_validation > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => "Stand {$stand->name} sudah ditutup dan tidak dapat diubah."]);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'integer', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'category' => ['required', 'string', 'max:100'],
            'food_tag' => ['nullable', 'array'],
            'food_tag.*' => ['integer', 'distinct', 'exists:food_tag,id'],
            'image' => ['nullable', File::types(['webp', 'jpeg', 'jpg', 'png'])->image()->max(5 * 1024)],
            'volume' => ['nullable', 'numeric', 'min:0'],
            'volume_unit' => ['nullable', 'required_with:volume', Rule::in(['ml', 'l', 'cc'])],
            'mass' => ['nullable', 'numeric', 'min:0'],
            'mass_unit' => ['nullable', 'required_with:mass', Rule::in(['g', 'gr', 'kg'])],
        ], [
            'image.dimensions' => 'Gambar menu harus berbentuk persegi (rasio 1:1).',
        ]);

        $data = [
            'stand_id' => $stand->id,
            'name' => trim($validated['name']),
            'price' => $validated['price'],
            'volume' => $validated['volume'] ?? null,
            'volume_unit' => $validated['volume_unit'] ?? null,
            'mass' => $validated['mass'] ?? null,
            'mass_unit' => $validated['mass_unit'] ?? null,
            'stock' => $validated['stock'],
            'category' => trim($validated['category']),
            'workflow_status' => 'draft',
            'is_published' => false,
        ];

        $image = $request->file('image');
        if ($image) {
            try {
                $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
                $imageEncoded = (new ImageManager($driver))->read($image->getRealPath())->toWebp(70);
                $imageName = 'M_' . $stand->id . '_' . now()->format('YmdHis') . random_int(1000, 9999) . '.webp';
                $imagePath = 'images/shop/foods/menu/' . $imageName;
                $stored = Storage::disk('public')->put($imagePath, $imageEncoded);
                try {
                    $stored = Storage::disk('google')->put($imagePath, $imageEncoded) || $stored;
                } catch (\Throwable $exception) {
                    Log::warning('Menu image could not be mirrored to Google Drive', [
                        'stand_id' => $stand->id,
                        'message' => $exception->getMessage(),
                    ]);
                }
                if (!$stored) {
                    throw new \RuntimeException('Menu image could not be stored.');
                }
                $data['image'] = $imageName;
            } catch (\Throwable $exception) {
                Log::error('Failed to process menu image', ['stand_id' => $stand->id, 'message' => $exception->getMessage()]);
                return redirect()->back()->withInput()->withErrors(['image' => 'Gambar gagal diproses. Gunakan JPG, PNG, atau WebP persegi maksimal 5 MB.']);
            }
        }

        $menuItem = DB::transaction(function () use ($data, $validated) {
            $menuItem = MenuItem::create($data);
            if (!empty($validated['food_tag'])) {
                $menuItem->tags()->attach($validated['food_tag']);
            }
            return $menuItem;
        });

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => "Menu '{$menuItem->name}' berhasil ditambahkan."]);
    }

    /**
     * lock Menu Item.
     */
    public function lockMenu(Request $request, $id)
    {
        $auth_user = $request->user();
        $stand = Stand::find($id);
        if (!$stand) {
            return redirect()->route('food.stand')->with('notif', ['type' => 'warning', 'message' => 'Stand tidak ditemukan.']);
        }
        if ($stand->sale_validation > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Stand ' . $stand->name . ' sale has been validated. This stand is inactive, You can not change anyting.']);
        }
        $menu_lock = $stand->menu_lock > 0 ? 0 : $auth_user->id;
        // dd($menu_lock);
        $stand->menu_lock = $menu_lock;
        if ($stand->save()) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Succes ' . ($menu_lock > 0 ? 'lock ' : 'unlock ') . $stand->name .  ' Menu List.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to ' . ($menu_lock > 0 ? 'lock ' : 'unlock ') . $stand->name .  ' Menu List. Please try again or contact admin.']);
        }
    }

    /**
     * delete MenuItem.
     */
    public function deleteMenu($id)
    {
        $menu_item = MenuItem::find($id);
        if (!$menu_item || !$menu_item->stand) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Menu tidak ditemukan.']);
        }
        $name = $menu_item->name;
        $stand = $menu_item->stand;
        if ($stand->sale_validation > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'You can not delete ' . $name . ' from Stand ' . $stand->name . ' Menu after stand income validated by Operational Officer.']);
        }
        if ($stand->menu_lock > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'You can not add new menu to Stand ' . $stand->name . ' after stand menu locked by Operational Officer.']);
        }
        if ($menu_item->sale > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'You can not delete ' . $name . ' from Stand ' . $stand->name . ' Menu. This menu have sales.']);
        }
        $menu_item->tags()->detach();
        if ($menu_item->image) {
            $imagePath = 'images/shop/foods/menu/' . $menu_item->image;
            foreach (['public', 'google'] as $disk) {
                try {
                    Storage::disk($disk)->delete($imagePath);
                } catch (\Throwable $exception) {
                    Log::warning('Could not delete menu image', ['disk' => $disk, 'path' => $imagePath]);
                }
            }
        }
        if ($menu_item->delete()) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Succes delete ' . $name . ' from Stand ' . $stand->name . ' Menu.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to delete ' . $name . ' from Stand ' . $stand->name . ' Menu. Please try again or contact admin.']);
        }
    }

    /**
     * refresh Profit.
     */
    public function refreshProfit($stand_id)
    {
        $stand = Stand::find($stand_id);
        if (!$stand) {
            return redirect()->route('food.stand')->with('notif', ['type' => 'warning', 'message' => 'Stand tidak ditemukan.']);
        }
        // Attempt detailed profit first
        $detailed = ProfitCalculator::calculateStandProfit($stand_id);
        if ($detailed !== null) {
            $stand->profit = $detailed;
        } else {
            $expense = $stand->expenseItems()->where('operational_id', '!=', 0)->sum('total_price');
            $income = $stand->sale()->sum('transaction');
            $stand->profit = $income - $expense;
        }
        $stand->save();
        return back()->with('notif', ['type' => 'info', 'message' => $stand->name . ' Balance is updated.']);
    }

    /**
     * update stock menu.
     */
    function updateStock(Request $request)
    {
        $validated = $request->validate([
            'id' => ['required', 'integer', Rule::exists('foods_menu', 'id')->whereNull('deleted_at')],
            'amount' => ['required', 'integer', 'not_in:0'],
            'request_id' => ['nullable', 'uuid'],
            'reason' => ['nullable', Rule::in(['production', 'correction', 'damaged', 'return'])],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $menu = MenuItem::find($validated['id']);

        if (!$menu) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Menu item not found.']);
        }

        $user = $request->user();
        if ($user->roles_id === 11 && !$menu->stand?->production()->whereKey($user->id)->exists()) {
            abort(403, 'Anda tidak ditugaskan pada stand menu ini.');
        }

        $stand = $menu->stand;
        app(MenuInventoryService::class)->adjust(
            $menu,
            $validated['amount'],
            $user->id,
            $validated['reason'] ?? 'correction',
            $validated['notes'] ?? 'Penyesuaian dari detail stand',
            $validated['request_id'] ?? null,
        );

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success update stock ' . $menu->name . ' from Stand ' . ($stand->name ?? 'Unknown') . ' Menu.']);
    }

    /**
     * update menu details
     */
    function updateMenu(Request $request, $id)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'category' => ['required', 'string'],
            'food_tag' => ['nullable', 'array'],
        ]);

        $menu = MenuItem::find($id);
        if (!$menu) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Menu not found.']);
        }

        $menu->update([
            'name' => $request->name,
            'price' => $request->price,
            'category' => $request->category,
        ]);

        if ($request->has('food_tag')) {
            $menu->tags()->sync($request->food_tag);
        }

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success update menu ' . $menu->name]);
    }

    /**
     * update menu image
     */
    function updateImage(Request $request, $id)
    {
        $request->validate([
            'image' => ['required', File::image()->max(5 * 1024)],
        ], [
            'image.dimensions' => 'Gambar menu harus berbentuk persegi (rasio 1:1).',
        ]);
        $menu = MenuItem::find($id);
        if (!$menu) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Menu tidak ditemukan.']);
        }

        try {
            $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
            $imageEncoded = (new ImageManager($driver))
                ->read($request->file('image')->getRealPath())
                ->toWebp(70);
            $imageName = 'M_' . $menu->id . '_' . now()->format('YmdHis') . random_int(1000, 9999) . '.webp';
            $imagePath = 'images/shop/foods/menu/' . $imageName;
            $stored = Storage::disk('public')->put($imagePath, $imageEncoded);

            try {
                $stored = Storage::disk('google')->put($imagePath, $imageEncoded) || $stored;
            } catch (\Throwable $exception) {
                Log::warning('Updated menu image could not be mirrored to Google Drive', [
                    'menu_id' => $menu->id,
                    'message' => $exception->getMessage(),
                ]);
            }

            if (!$stored) {
                throw new \RuntimeException('Menu image could not be stored.');
            }
        } catch (\Throwable $exception) {
            Log::error('Failed to update menu image', ['menu_id' => $menu->id, 'message' => $exception->getMessage()]);
            return redirect()->back()->withErrors(['image' => 'Gambar gagal diproses. Gunakan gambar persegi maksimal 5 MB.']);
        }

        $oldImage = $menu->image;
        $menu->image = $imageName;
        $menu->save();

        if ($oldImage) {
            $oldPath = 'images/shop/foods/menu/' . $oldImage;
            foreach (['public', 'google'] as $disk) {
                try {
                    Storage::disk($disk)->delete($oldPath);
                } catch (\Throwable $exception) {
                    Log::warning('Could not delete replaced menu image', ['disk' => $disk, 'path' => $oldPath]);
                }
            }
        }

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => "Foto menu '{$menu->name}' berhasil diperbarui."]);
    }

    /**
     * Quick store food tag directly from menu creation form
     */
    public function quickStoreTag(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:50'],
            'color' => ['nullable', 'string', 'max:20'],
        ]);

        $colors = ['#2563eb', '#7c3aed', '#0284c7', '#ea580c', '#dc2626', '#d97706', '#059669', '#ca8a04', '#e11d48', '#16a34a'];
        $randomColor = $colors[array_rand($colors)];

        $tag = FoodsTag::withTrashed()->firstOrCreate(
            ['name' => trim($validated['name'])],
            ['color' => !empty($validated['color']) ? $validated['color'] : $randomColor]
        );

        if ($tag->trashed()) {
            $tag->restore();
        }

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'tag' => [
                    'id' => $tag->id,
                    'name' => $tag->name,
                    'color' => $tag->color,
                ],
                'message' => 'Tag baru berhasil ditambahkan.',
            ]);
        }

        return redirect()->back()->with('notif', ['type' => 'info', 'message' => "Tag '{$tag->name}' berhasil ditambahkan."]);
    }
}
