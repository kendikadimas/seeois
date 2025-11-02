<?php

namespace App\Http\Controllers\Staff\Business;

use App\Http\Controllers\Controller;
use App\Models\FoodOrder;
use App\Models\FoodsExpense;
use App\Models\FoodsIncome;
use App\Models\FoodsTag;
use App\Models\GeneralContact;
use App\Models\MenuItem;
use App\Models\Stand;
use App\Models\StandExpense;
use App\Models\StandSales;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver as GdDriver;
use Intervention\Image\Drivers\Imagick\Driver as ImagickDriver;


class StandController extends Controller
{
    /**
     * Choose Stand before go to detail stand.
     */
    function index(Request $request)
    {
        // Retrieve or create session
        $stand_session = session('stand', ['category' => 'date', 'order' => 'desc', 'active' => false]);
        // Save session to database
        $request->session()->put('stand', $stand_session);
        // Stand filter
        $stand_category = $stand_session['category'];
        $stand_order = $stand_session['order'];
        $stand_active = $stand_session['active'];
        $stand_list = $stand_active ?  Stand::with(['pic'])->where('menu_lock', '>', 0)->where('sale_validation', '=', 0)->orderBy($stand_category, $stand_order)->get() : Stand::with(['pic'])->orderBy($stand_category, $stand_order)->get();
        $data = [
            'staff_list' => User::select(['id', 'name'])->where('roles_id', '>', 0)->get(),
            'stand_list' => $stand_list,
            'filter' => [
                'category' => $stand_category,
                'order' => $stand_order,
                'active' => $stand_active,
            ],
            'notif' => session('notif'),
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
        // Retrieve or create session
        $income_session = session('stand_income', ['name' => null]);
        $expense_session = session('stand_expense', ['name' => null]);
        // Save session to database
        $request->session()->put('stand_income', $income_session);
        $request->session()->put('stand_expense', $expense_session);
        $menu_list = MenuItem::where('stand_id', $stand->id)->with(['tags'])->orderBy('name', 'asc')->get()->groupBy('category');
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
            ", [$expense_name, "$expense_name%", "%$expense_name%"]) :
            StandExpense::where('stand_id', $stand->id)->orderBy('created_at', 'desc')->with(['operational'])->get();
        $food_tag_list = FoodsTag::all();
        $data = [
            'sidebar' => 'blaterian',
            'users' => User::where('roles_id', '!=', null)->get(),
            'stand' => $stand,
            'menu_category' => $menu_list,
            'income_list' => $income_list,
            'expense_list' => $expense_list,
            'food_tag_list' => $food_tag_list,
            'dana_contact' => GeneralContact::where('title', '=', 'dana')->first(),
            'notif' => session('notif'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ];
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
        session()->put('stand', ['category' => $category, 'order' => $order, 'active' => $active,]);
        return redirect()->route('food.stand');
    }

    /**
     * Add new stand.
     */
    function insertStand(Request $request)
    {
        // Validating data
        $request->validate([
            'name' => ['required', 'string'],
            'pic_id' => ['required', 'numeric'],
            'place' => ['required', 'string'],
            'type' => ['required', 'numeric'],
            'date' => ['required', 'date',  'after_or_equal:today'],
        ]);

        // Insert new stand
        $stand = Stand::create([
            'name' => $request->input('name'),
            'pic_id' => $request->input('pic_id'),
            'date' => $request->input('date'),
            'place' => $request->input('place'),
            'type' => $request->input('type'),
        ]);

        // Insert new foods expense
        $expense = FoodsExpense::create([
            'category' => 'stand expense',
            'category_id' => Stand::where('name', '=', $request->input('name'))->first()->id,
            'price' => 0,
        ]);

        // Insert new foods income
        $income = FoodsIncome::create([
            'category' => 'stand income',
            'category_id' => Stand::where('name', '=', $request->input('name'))->first()->id,
            'price' => 0,
        ]);

        // sucees insert
        if ($stand && $expense && $income) {
            return redirect()->route('food.stand', ['id' => $stand->id])->with('notif', ['type' => 'info', 'message' => 'Success create new stand.']);
        } else {
            return redirect()->route('food.stand')->with('notif', ['type' => 'warning', 'message' => 'Failed to create new stand. Please try again or contact admin.']);
        }
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
        $stand = Stand::find($id);
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
        $request->flash();
        // Validating data
        $request->validate([
            'name' => ['required', 'string'],
            'price' => ['required', 'integer'],
            'qty' => ['required', 'integer'],
            'unit' => ['required', 'string'],
            'reciept' => [!$request->input('same_receipt_check') ? File::types(['jpg', 'jpeg', 'png', 'heic'])->max(5 * 1024) : ''],
            'receipt_same' => [$request->input('same_receipt_check') ? 'integer' : ''],
        ]);
        $auth_user = Auth::user();
        $stand = Stand::find($id);
        if ($stand->cashier->contains('cashier_id', $auth_user->id)) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'You are not cashier in Stand (' . $stand->pic->name . '). Only cashier can add transaction.']);
        }
        $last = StandExpense::orderBy('id', 'desc')->first();
        $last_id = $last->id;
        if (!$request->input('same_receipt_check')) {
            // Format receipt file
            $receipt = $request->file('reciept');
            // create new manager instance with desired driver
            $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
            $manager = new ImageManager($driver);

            // read receipt image
            $receipt_image = $manager->read($receipt->getRealPath());
            // encod jpeg data
            $receipt_encoded = $receipt_image->toWebp(60);
            // Format receipt name
            $reciept_name =  'SE' . $id . $last_id + 1 . '_receipt.webp';
            // Checkk for env
            $disk = config('app.env') === 'production' ? 'google' : 'public';
            // store reciept file
            Storage::disk($disk)->put('images/receipt/stand/expense/' . $reciept_name, $receipt_encoded);
        } else {
            $reciept_name = StandExpense::find($request->input('receipt_same'))->reciept;
        }
        $total_price =  $request->input('qty') *  $request->input('price');
        $data = [
            'stand_id' => $id,
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'qty' => $request->input('qty'),
            'unit' => $request->input('unit'),
            'total_price' => $total_price,
            'reciept' => $reciept_name,
            'updated_at' => now(),
            'created_at' => now()
        ];
        // sucees insert
        $standExpense = StandExpense::create($data);
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'New stand expense item has been added.']);
    }

    /**
     * delete StandExpenseItem.
     */
    public function deleteStandExpenseItem($id)
    {
        $expenseItem = StandExpense::find($id);
        $name = $expenseItem->name;
        $stand = $expenseItem->stand;
        if ($expenseItem->financial_id > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'You can not delete Expense Item after validated by Financial Officer']);
        }
        // update necessary data
        if (StandExpense::where('reciept', '=', $expenseItem->reciept)->get()->count() == 0) {
            // Checkk for env
            $disk = config('app.env') === 'production' ? 'google' : 'public';
            // delete stand expense receipt
            Storage::disk($disk)->delete('images/receipt/stand/expense/' . $expenseItem->reciept);
        }
        if ($expenseItem->delete()) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success delete ' . $name . ' from Stand ' . $stand->name . ' Expense Item']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Success delete ' . $name . ' from Stand ' . $stand->name . ' Expense Item']);
        }
    }

    /**
     * validate receipt StandExpense.
     */
    public function validateExpenseReceipt(Request $request, $id)
    {
        $auth_user = Auth::user();
        $stand_expense = StandExpense::find($id);
        $stand = $stand_expense->stand;
        if ($stand->sale_validation > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Stand ' . $stand->name . ' sale has been validated. This stand is inactive, You can not change anyting.']);
        }
        $valid = !($stand_expense->operational_id > 0);
        $stand_expense->operational_id = $valid ? $auth_user->id : 0;
        $this->updateStandExpense($stand->id, $valid, $stand_expense->total_price);
        $validation = $valid ? 'validate' : 'unvalidate';
        if ($stand_expense->save()) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Succes ' . $validation . ' from Stand ' . $stand->name . ' Expense List.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'Failed to  ' . $validation . ' from Stand ' . $stand->name . ' Expense List.']);
        }
    }

    /**
     * update new stand total expense.
     * 
     * 
     *  @var $id is stand id, @var $add to determine add or minus 
     */
    public function updateStandExpense(int $id, bool $add, int $new_expense)
    {
        // retrieve stand and foods expense model
        $stand = Stand::find($id);
        $foodsExpense = FoodsExpense::where('category_id', '=', $id)->first();

        // determine add/minus expense
        $new_expense = $add ? $new_expense : $new_expense * (-1);

        // update current expense with new expense
        $updated_expense = $stand->expense + $new_expense;

        // set new expense value to model
        $foodsExpense->price = $updated_expense;
        $stand->expense = $updated_expense;
        $stand->profit -= $new_expense;

        // save model
        $stand->updated_at = now();
        $stand->save();
        $foodsExpense->updated_at = now();
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
        $request->flash();
        $stand = Stand::find($id);
        if ($stand->menu_lock > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'You can not add new menu to Stand ' . $stand->name . ' after stand menu locked by Operational Officer.']);
        }
        if ($stand->sale_validation > 0) {
            return redirect()->back()->with('notif', ['type' => 'warning', 'message' => 'You can not add new menu to Stand ' . $stand->name . ' after stand income validated by Operational Officer.']);
        }
        // Validating data
        $integer1 = $request->input('menu_volume_unit') !== null ? 'integer' : '';
        $integer2 = $request->input('menu_mass_unit') !== null ? 'integer' : '';
        $string1 = $request->input('menu_volume') !== null ? 'string' : '';
        $string2 = $request->input('menu_mass') !== null ? 'string' : '';
        $request->validate([
            'name' => ['required', 'string'],
            'price' => ['required', 'integer'],
            'stock' => ['required', 'integer'],
            'category' => ['required', 'string'],
            'food_tag' => ['required', 'array'],
            'image' => ['nullable', 'file', File::types(['webp', 'jpeg', 'jpg', 'png', 'heic'])->max(5 * 1024), 'dimensions:ratio=1'],
            'volume' => [Rule::requiredIf($request->input('volume_unit') !== null), $integer1],
            'volume_unit' => [Rule::requiredIf($request->input('volume') !== null), $string1],
            'mass' => [Rule::requiredIf($request->input('mass_unit') !== null), $integer2],
            'mass_unit' => [Rule::requiredIf($request->input('mass') !== null), $string2],
        ]);
        // Store image
        $data = [
            'stand_id' => $id,
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'volume' => $request->input('volume'),
            'volume_unit' => $request->input('volume_unit'),
            'mass' => $request->input('mass'),
            'mass_unit' => $request->input('mass_unit'),
            'stock' => $request->input('stock'),
            'category' => $request->input('category'),
            'updated_at' => now(),
            'created_at' => now()
        ];
        $image = $request->file('image');
        if ($image) {
            // Checkk for env
            $disk = config('app.env') === 'production' ? 'google' : 'public';
            // Format receipt file
            // create new manager instance with desired driver
            $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
            $manager = new ImageManager($driver);
            // read receipt image
            $menu_image = $manager->read($image->getRealPath());
            // encod jpeg data
            $image_encoded = $menu_image->toWebp(60);
            // Get last id
            $last_id = MenuItem::orderBy('id', 'desc')->first()->id;
            // Format receipt name
            $image_name =  'M_' . $last_id + 1 . '_' . now()->format('dmyhis') . '.webp';
            // store reciept file
            Storage::disk($disk)->put('images/shop/foods/menu/' . $image_name, $image_encoded);
            $data['image'] =  $image_name;
        }
        // sucees insert
        $menuItem = MenuItem::create($data);
        $menuItem->tags()->attach($request->input('food_tag'));
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'New menu item has been added.']);
    }

    /**
     * lock Menu Item.
     */
    public function lockMenu($id)
    {
        $auth_user = Auth::user();
        $stand = Stand::find($id);
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
        // Checkk for env
        $disk = config('app.env') === 'production' ? 'google' : 'public';
        // store reciept file
        Storage::disk($disk)->delete('images/shop/foods/menu/' . $menu_item->image);
        $data['image'] =  $menu_item->image;
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
        $expense = $stand->expense()->where('operational_id', '!=', 0)->sum('total_price');
        $income = $stand->sale()->sum('transaction');
        $stand->profit = $income - $expense;
        $stand->save();
        return back()->with('notif', ['type' => 'info', 'message' => $stand->name . ' Balance is updated.']);
    }

    /**
     * update stock menu.
     */
    function updateStock(Request $request)
    {
        $id = $request->input('id');
        $stock = $request->input('amount');

        $menu = MenuItem::find($id);
        $menu->stock += $stock;
        $stand = $menu->stand;

        if ($menu->save() > 0) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Success update stock ' . $menu->name . ' from Stand ' . $stand->name . ' Menu.']);
        } else {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Failed to update stock ' . $menu->name . ' from Stand ' . $stand->name . ' Menu. Please try again or contact admin.']);
        }
    }

    /**
     * update menu image
     */
    function updateImage(Request $request, $id)
    {
        $request->validate([
            'image' => ['required', File::types(['webp', 'jpeg', 'jpg', 'png', 'heic'])->max(5 * 1024), 'dimensions:ratio=1'],
        ]);
        $menu = MenuItem::find($id);
        if (!$menu) {
            return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Menu item is not found. Please try again or ask IT Support.']);
        }
        // Checkk for env
        $disk = config('app.env') === 'production' ? 'google' : 'public';
        if ($menu->image) {
            Storage::disk($disk)->delete('images/shop/foods/menu/' . $menu->image);
        }
        // Format receipt file
        $image = $request->file('image');
        // create new manager instance with desired driver
        $driver = config('app.env') === 'production' ? new ImagickDriver() : new GdDriver();
        $manager = new ImageManager($driver);
        // read receipt image
        $menu_image = $manager->read($image->getRealPath());
        // encod jpeg data
        $image_encoded = $menu_image->toWebp(60);
        $image_name = 'M_' . $menu->id . '_' . now()->format('dmyhis') . '.webp';
        // store reciept file
        Storage::disk($disk)->put('images/shop/foods/menu/' . $image_name, $image_encoded);
        $menu->image = $image_name;
        $menu->save();
        return redirect()->back()->with('notif', ['type' => 'info', 'message' => 'Successfully update ' . $menu->name . ' image.']);
    }
}
