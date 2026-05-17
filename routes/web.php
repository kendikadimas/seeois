<?php

use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\CompanyProfileController;
use App\Http\Controllers\InternshipApplicationController;
use App\Http\Controllers\PinnedDocController;
use App\Http\Controllers\Shop\CustomerController;
use App\Http\Controllers\Staff\SEEO\PayrollController;
use App\Http\Controllers\Shop\ShopController;
use App\Http\Controllers\Shop\VoucherController;
use App\Http\Controllers\Staff\Business\BlaterianFoodBalanceController;
use App\Http\Controllers\Staff\Business\BlaterianGoodBalanceController;
use App\Http\Controllers\Staff\Business\GoodController;
use App\Http\Controllers\Staff\Business\GoodDetailController;
use App\Http\Controllers\Staff\Business\GoodInsightController;
use App\Http\Controllers\Staff\Business\GoodOrderController;
use App\Http\Controllers\Staff\Business\GoodSaleController;
use App\Http\Controllers\Staff\Business\InsightController;
use App\Http\Controllers\Staff\Business\MenuBoardController;
use App\Http\Controllers\Staff\Business\ProductionPanelController;
use App\Http\Controllers\Staff\Business\SalesController;
use App\Http\Controllers\Staff\Business\StandController;
use App\Http\Controllers\Staff\Business\ExpenseReceiptController;
use App\Http\Controllers\Staff\SEEO\BudgetItemController;
use App\Http\Controllers\Staff\SEEO\CashFlowController;
use App\Http\Controllers\Staff\SEEO\DashboardController;
use App\Http\Controllers\Staff\SEEO\DepartmentController;
use App\Http\Controllers\Staff\SEEO\DisbursementItemController;
use App\Http\Controllers\Staff\SEEO\DisbursementLetterController;
use App\Http\Controllers\Staff\SEEO\ExpenseItemController;
use App\Http\Controllers\Staff\SEEO\OperatingPanelController;
use App\Http\Controllers\Staff\SEEO\LogbookController;
use App\Http\Controllers\Staff\SEEO\ProfileController;
use App\Http\Controllers\Staff\SEEO\ProgramController;
use App\Http\Controllers\Staff\SEEO\ContributionController;
use App\Http\Controllers\Staff\SEEO\FinancePanelController;
use App\Http\Controllers\Staff\SEEO\HrBirthdayController;
use App\Http\Controllers\Staff\SEEO\IwpPanelController;
use App\Http\Controllers\PublicRelation\SeminarRegistrationController;
use App\Http\Controllers\Staff\SEEO\CeoPanelController;
use App\Http\Controllers\Staff\Marketing\MarketingCmsController;
use App\Http\Controllers\Staff\SEEO\UserController;
use App\Http\Controllers\Staff\SEEO\YearController;
use App\Http\Controllers\Staff\SEEO\SuperAdminController;
use App\Http\Controllers\InternshipCertificateController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\GoogleDriveAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

// Test
// Route::get('/test', function () {
//     return redirect()->route('dashboard')->with('notif', ['type' => 'info', 'message' => 'session notif']);
// });

// General Resources
Route::get('/storage/{path?}', [StorageController::class, 'show'])->where('path', '.*');
// Welcome
Route::get('/', [CompanyProfileController::class, 'homepage'])->name('homepage');
Route::get('/structure', [CompanyProfileController::class, 'structure'])->name('structure');
Route::get('/activity', [CompanyProfileController::class, 'activity'])->name('activity');
Route::get('/activity/{activity:slug}', [CompanyProfileController::class, 'activityDetail'])->name('activity.detail');
Route::get('/contact', [CompanyProfileController::class, 'contact'])->name('contact');
Route::get('/about', [CompanyProfileController::class, 'about'])->name('about');
Route::get('/seminar/nasional/register/{event:slug}', [SeminarRegistrationController::class, 'create'])->name('seminar.registration.create');
Route::post('/seminar/nasional/register/{event:slug}', [SeminarRegistrationController::class, 'store'])->name('seminar.registration.store');

// Route::get('/', [WelcomeController::class, 'index'])->name('intro');
Route::get('/bingo', function () {
    return Inertia::render('Bingo');
})->name('bingo');

// Google Authentication
Route::get('/google/auth/callback', [GoogleController::class, 'callback']);

// Google Drive Asset Secure Proxy Route
Route::get('/storage/google/{path}', [App\Http\Controllers\GoogleDriveProxyController::class, 'stream'])->where('path', '.*')->name('google.drive.proxy');

// Customer
Route::get('/shop/home/{tab?}', [ShopController::class, 'index'])->name('shop');

// form daftar internship
Route::get('/seeo/internship/register', [InternshipApplicationController::class, 'create'])->name('internship.create');
Route::post('/seeo/internship/register', [InternshipApplicationController::class, 'store'])->name('internship.store');

// Authenticated customer
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/shop/stand/{id}/{new?}', [ShopController::class, 'stand'])->name('shop.stand');
    Route::get('/shop/promotion', [ShopController::class, 'promotion'])->name('shop.promotion');
    Route::post('/customer/order', [ShopController::class, 'order'])->name('shop.checkout');
    Route::get('/customer/order', [ShopController::class, 'transaction'])->name('customer.transaction');
    Route::post('/shop/payment', [ShopController::class, 'addTransaction'])->name('customer.order.add');
    Route::post('/customer/feedback/add', [CustomerController::class, 'insertFeedback'])->name('customer.feedback.add');
    Route::get('/customer/profile', [CustomerController::class, 'profile'])->name('customer.profile');
    Route::post('/customer/voucher/redeem/{voucher_id}', [CustomerController::class, 'redeemVoucher'])->name('customer.redeem.voucher');
});

    // Backward-compatible stand detail redirect for old links
    Route::get('/blaterian/foods/stand_detail/{id?}', function ($id = null) {
        $path = '/seeo/staff/blaterian/foods/stand_detail' . ($id ? '/' . $id : '');
        return redirect($path);
    })->whereNumber('id');

// Authenticated staff - Unified Group
Route::middleware(['auth', 'verified', 'staff'])->prefix('seeo/staff')->group(function () {

    // Internship Applications
    // Access: CEO, Co-CEO, HR Manager, dan PIC Internship
    Route::middleware(['internship.access'])->group(function () {
        Route::get('/internship', [InternshipApplicationController::class, 'index'])->name('internship.applications.index');
        Route::post('/internship/review/{internshipApplication}', [InternshipApplicationController::class, 'updateDecision'])->middleware('role:1,5,6,15,99')->name('internship.applications.decision');
    });

    // Super Admin Panel
    Route::middleware(['role:99'])->group(function () {
        Route::get('/super-admin', [SuperAdminController::class, 'index'])->name('super.admin.panel');
        Route::post('/super-admin/google-drive', [SuperAdminController::class, 'saveConfig'])->name('super.admin.save_config');
        Route::get('/super-admin/debug-logs', function () {
            $logPath = storage_path('logs/laravel.log');
            if (!file_exists($logPath)) {
                return 'Log file not found';
            }
            
            $size = filesize($logPath);
            $file = fopen($logPath, 'r');
            if (!$file) {
                return 'Could not open log file';
            }
            
            // Read last 200KB of the file to be safe and extremely fast
            $maxReadBytes = 200 * 1024;
            $startOffset = max(0, $size - $maxReadBytes);
            
            fseek($file, $startOffset);
            $data = fread($file, $maxReadBytes);
            fclose($file);
            
            $lines = explode("\n", $data);
            $lastLines = array_slice($lines, -150);
            return '<pre>Log File Size: ' . round($size / 1024 / 1024, 2) . ' MB | Showing last 150 lines:<br><br>' . htmlspecialchars(implode("\n", $lastLines)) . '</pre>';
        })->name('super.admin.debug_logs');
    });

    // SEEO Management
    Route::get('/profile/{id?}', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/password', [ProfileController::class, 'changePassword'])->name('password.change');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/logbook/add/{id?}', [LogbookController::class, 'insertLog'])->name('logbook.add');
    Route::post('/logbook/delete/{id?}', [LogbookController::class, 'deleteLog'])->name('logbook.delete');
    Route::post('/logbook/validate/{id?}', [LogbookController::class, 'validateLog'])->name('logbook.validate');
    Route::get('/dashboard/{advance?}', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/dashboard/post/add', [DashboardController::class, 'addPost'])->name('post.add');
    Route::get('/user', [UserController::class, 'index'])->name('role');
    Route::post('/user', [UserController::class, 'filterEmployee'])->name('role.filter');
    Route::post('/user/role/update', [UserController::class, 'update'])->name('role.update');
    Route::post('/user/role/remove/{id}', [UserController::class, 'delete'])->name('role.remove');
    Route::post('/user/recruit/{id}', [UserController::class, 'addEmployee'])->name('employee.add');
    Route::post('/user/level/add', [UserController::class, 'addOrEditLevel'])->name('level.add.edit');
    Route::post('/payroll/balance/add', [UserController::class, 'setPayrollBalance'])->name('payroll.balance.add');
    Route::get('/structural/{id?}', [DepartmentController::class, 'structural'])->name('structural');
    Route::post('/structural', [DepartmentController::class, 'filterDepartment'])->name('structural.filter');
    Route::get('/department/{id}', [DepartmentController::class, 'department'])->name('department');
    Route::post('/unemployee', [UserController::class, 'filterUnmployee'])->name('unemployee.filter');
    Route::get('/finance', [CashFlowController::class, 'index'])->name('finance');
    Route::get('/finance_feature', [CashFlowController::class, 'feature'])->name('finance.feature');
    Route::get('/contribution/{id}', [CashFlowController::class, 'showMyContribution'])->name('checkContribution');
    Route::post('/cashflow/in', [CashFlowController::class, 'filterCashIn'])->name('cashIn.filter');
    Route::post('/cashflow/out', [CashFlowController::class, 'filterCashOut'])->name('cashOut.filter');
    Route::get('/program/{id}', [ProgramController::class, 'program'])->name('program');
    Route::get('/program/{program_id}/logbook/{logbook_id}', [ProgramController::class, 'showMyLogbook'])->name('checkLogbook');
    Route::post('/program/expense/item/add/{id}', [ExpenseItemController::class, 'insertExpenseItem'])->name('program.expense.add');
    Route::post('/program/expense/item/delete/{id}', [ExpenseItemController::class, 'deleteExpenseItem'])->name('program.expense.delete');
    Route::post('/program/budget/item/add/{id}', [BudgetItemController::class, 'insertBudgetItem'])->name('program.budget.add');
    Route::post('/program/budget/item/delete/{id}', [BudgetItemController::class, 'deleteBudgetItem'])->name('program.budget.delete');
    Route::post('/program/disbursement/letter/add/{id}', [DisbursementLetterController::class, 'insertDisbursementLetter'])->name('program.disbursement.letter.add');
    Route::post('/program/disbursement/letter/delete/{id}', [DisbursementLetterController::class, 'deleteDisbursementLetter'])->name('program.disbursement.letter.delete');
    Route::post('/program/add/{id}', [ProgramController::class, 'insertProgram'])->name('program.add');
    Route::post('/program/update/{id}', [ProgramController::class, 'updateProgram'])->name('program.update');
    Route::post('/program/delete/{id}', [ProgramController::class, 'deleteProgram'])->name('program.delete');
    Route::post('/program/budget/filter/{id}', [ProgramController::class, 'filterBudget'])->name('program.budget.filter');
    Route::post('/program/disbursement/filter/{id}', [ProgramController::class, 'filterDisbursement'])->name('program.disbursement.filter');
    Route::post('/program/expense/filter/{id}', [ProgramController::class, 'filterExpense'])->name('program.expense.filter');
    Route::post('/program/staff/filter/{id}', [ProgramController::class, 'filterStaff'])->name('program.staff.filter');
    Route::post('/program/staff/add/{id}', [ProgramController::class, 'insertStaff'])->name('program.staff.add');
    Route::post('/program/staff/delete/{id}', [ProgramController::class, 'deleteStaff'])->name('program.staff.delete');
    Route::post('/department/staff/add/{id}', [DepartmentController::class, 'insertStaff'])->name('department.staff.add');
    Route::post('/department/staff/remove/{id}', [DepartmentController::class, 'removeStaff'])->name('department.staff.remove');
    Route::post('/contribution', [ContributionController::class, 'filterContribution'])->name('contribution.filter');
    Route::post('/contribution/insert', [ContributionController::class, 'insert'])->name('contribution.insert');

    // Blaterian Business
    Route::get('/blaterian/insight', [InsightController::class, 'index'])->name('blaterian.insight');
    Route::post('/food/insight/taste_tag', [InsightController::class, 'setTasteTag'])->name('update.insight.taste_tag');
    Route::get('/blaterian/insight/cashflow', [InsightController::class, 'cashflow'])->name('blaterian.insight.cashflow');
    Route::post('/blaterian/insight/filter/foods', [InsightController::class, 'filterFoods'])->name('insight.filter.foods');
    Route::post('/blaterian/insight/filter/goods', [InsightController::class, 'filterGoods'])->name('insight.filter.goods');
    Route::get('/blaterian/foods/cashier/{id}', [SalesController::class, 'sales'])->name('food.stand.cashier');
    Route::get('/blaterian/foods/balance/{default_tab?}/{refresh?}', [BlaterianFoodBalanceController::class, 'balance'])->name('food.balance');
    Route::get('/blaterian/foods/stand', [StandController::class, 'index'])->name('food.stand');
    Route::get('/blaterian/foods/stand_detail/{id?}', [StandController::class, 'stand'])->name('food.stand.detail');
    
    // Alias/typo redirect
    Route::get('/blaterian/foods/food.stand.detail/{id?}', function ($id = null) {
        $path = '/seeo/staff/blaterian/foods/stand_detail' . ($id ? '/' . $id : '');
        return redirect($path);
    });

    Route::get('/blaterian/goods/balance/{default_tab?}/{refresh?}', [BlaterianGoodBalanceController::class, 'balance'])->name('good.balance');
    Route::get('/blaterian/goods/product', [GoodController::class, 'product'])->name('good.product');
    Route::get('/blaterian/goods/product/detail/{id}', [GoodDetailController::class, 'detail'])->name('good.product.detail');
    Route::get('/blaterian/goods/insight/detail', [GoodInsightController::class, 'insight'])->name('good.insight');
    
    Route::post('/food/stand/production/{stand_id}', [StandController::class, 'setProductionStaff'])->name('update.stand.production_staff');
    Route::post('/food/stand/cashier/{stand_id}', [StandController::class, 'setCashierStaff'])->name('update.stand.cashier_staff');
    Route::post('/food/stand/filter', [StandController::class, 'filterStand'])->name('food.stand.filter');
    Route::post('/food/stand/update/{id}', [StandController::class, 'updateStand'])->middleware('role:3')->name('food.stand.update');
    Route::post('/food/stand/expense/filter', [StandController::class, 'filterStandExpense'])->name('stand.expense.filter');
    Route::post('/food/stand/expense/add/{id}', [StandController::class, 'insertStandExpense'])->name('stand.expense.add');
    Route::post('/food/stand/expense/delete/{id}', [StandController::class, 'deleteStandExpenseItem'])->name('stand.expense.delete');
    
    // Stream expense receipt
    Route::get('/food/stand/expense/receipt/{filename}', [ExpenseReceiptController::class, 'showExpenseReceipt'])
        ->where('filename', '(SE\d+_\d+_receipt\.webp|SE\d+_receipt\.webp)')
        ->name('stand.expense.receipt');
        
    Route::post('/food/stand/menu/filter/{id}', [StandController::class, 'filterStandMenu'])->name('stand.menu.filter');
    Route::post('/food/stand/menu/add/{id}', [StandController::class, 'insertMenu'])->name('stand.menu.add');
    Route::post('/food/stand/menu/delete/{id}', [StandController::class, 'deleteMenu'])->name('stand.menu.delete');
    Route::post('/food/stand/menu/stock/update', [StandController::class, 'updateStock'])->name('stand.menu.stock.update');
    Route::post('/food/stand/menu/image/update/{id}', [StandController::class, 'updateImage'])->name('stand.menu.image.update');
    Route::post('/food/stand/menu/recipe/store/{menu_id}', [\App\Http\Controllers\Staff\Business\RecipeComponentController::class, 'store'])->name('stand.menu.recipe.store');
    Route::post('/food/stand/menu/update/{id}', [\App\Http\Controllers\Staff\Business\StandController::class, 'updateMenu'])->name('stand.menu.update');
    
    Route::post('/food/stand/sales/customer/add/{id}', [SalesController::class, 'insertCustomer'])->name('sale.customer.add');
    Route::post('/food/stand/sales/add/{id}', [SalesController::class, 'insertSale'])->name('stand.sale.add');
    Route::post('/food/stand/sales/filter', [SalesController::class, 'filterStandIncome'])->name('stand.income.filter');
    Route::post('/food/stand/sales/delete/{id}', [SalesController::class, 'deleteSale'])->name('stand.sale.delete');
    
    Route::post('/shop/transaction/finish', [SalesController::class, 'finishTransaction'])->name('shop.transaction.finish');
    Route::post('/shop/transaction/cancel/{id}', [SalesController::class, 'cancelTransaction'])->name('shop.transaction.cancel');
    
    Route::post('/good/balance/cash_in', [BlaterianGoodBalanceController::class, 'filterCashIn'])->name('good.balance.filter.cash_in');
    Route::post('/good/balance/cash_out', [BlaterianGoodBalanceController::class, 'filterCashOut'])->name('good.balance.filter.cash_out');
    Route::post('/good/product/filter', [GoodController::class, 'filterProduct'])->name('good.product.filter');
    Route::post('/good/product/image/add/{id}', [GoodDetailController::class, 'insertImage'])->name('good.product.image.add');
    Route::post('/good/product/variant/add/{id}', [GoodDetailController::class, 'insertVariant'])->name('good.product.variant.add');
    Route::post('/good/product/stock/update/{id?}', [GoodDetailController::class, 'updateStock'])->name('good.product.stock.update');
    Route::post('/good/variant/description/update/{id?}', [GoodDetailController::class, 'updateDescription'])->name('good.product.description.update');
    Route::post('/goods/insight/filter/{filter_name?}', [GoodInsightController::class, 'filterInsight'])->name('good.insight.filter');
    Route::post('/good/capital/add', [GoodInsightController::class, 'insertCapital'])->name('good.capital.add');
    Route::post('/good/capital/delete/{id}', [GoodInsightController::class, 'deleteCapital'])->name('good.capital.delete');
    Route::post('/good/cart/add', [GoodSaleController::class, 'addCart'])->name('good.cart.add');
    Route::post('/good/order/add/{id?}', [GoodOrderController::class, 'addOrder'])->name('good.order.add');
    Route::post('/good/transaction/add/{id?}', [GoodSaleController::class, 'addTransaction'])->name('good.transaction.add');
    Route::post('/good/transaction/cancel/{id?}', [GoodSaleController::class, 'cancelTransaction'])->name('good.transaction.cancel');

    // Operational Only Feature
    Route::post('/food/stand/add/new', [StandController::class, 'insertStand'])->middleware('role:3,99')->name('food.stand.insert');
    Route::post('/food/stand/delete/{id}', [StandController::class, 'deleteStand'])->middleware('role:3')->name('food.stand.delete');
    Route::post('/food/stand/expense/validate/{id}', [StandController::class, 'validateExpenseReceipt'])->middleware('role:3,99')->name('stand.expense.validate');
    Route::post('/food/stand/menu/lock/{id}', [StandController::class, 'lockMenu'])->middleware('role:3,10,99')->name('stand.menu.validate');
    Route::post('/food/stand/sales/validate/{id}', [SalesController::class, 'validateSales'])->middleware('role:3,99')->name('stand.income.validate');
    Route::post('/food/balance/send', [BlaterianFoodBalanceController::class, 'withdrawBalance'])->middleware('role:3,99')->name('food.balance.withdraw');
    Route::post('/good/product/add', [GoodController::class, 'insertProduct'])->middleware('role:3')->name('good.product.add');
    Route::post('/good/product/delete/{id}', [GoodController::class, 'deleteProduct'])->middleware('role:3')->name('good.product.delete');
    Route::post('/good/product/transaction/status/{id}', [GoodDetailController::class, 'productStatus'])->middleware('role:3')->name('good.product.transaction.status');
    Route::post('/good/capital/validate', [GoodInsightController::class, 'validateCapital'])->name('good.capital.validate');
    Route::post('/good/sale/validate/{id}/{valid}', [GoodSaleController::class, 'validateSale'])->name('good.sale.validate');
    Route::post('/good/sale/delete/{id}', [GoodSaleController::class, 'deleteSale'])->name('good.sale.delete');
    Route::post('/good/balance/send', [BlaterianGoodBalanceController::class, 'withdrawBalance'])->middleware('role:3')->name('good.balance.withdraw');
    Route::post('/shop/voucher/add', [VoucherController::class, 'addVoucher'])->middleware('role:3')->name('shop.voucher.add');
    Route::post('/shop/payment/dana/set', [ShopController::class, 'setDanaContact'])->middleware('role:3')->name('shop.payment.dana.set');
    Route::post('/shop/voucher/delete/{voudher_id}', [VoucherController::class, 'deleteVoucher'])->middleware('role:3')->name('shop.voucher.delete');

    // Sales Distribution & Production
    Route::get('/sales-distribution', [MenuBoardController::class, 'index'])->middleware('role:10,99')->name('staff.sales-distribution.index');
    Route::post('/sales-distribution/menu', [MenuBoardController::class, 'storeMenu'])->middleware('role:10,99')->name('staff.sales-distribution.menu.store');
    Route::post('/sales-distribution/menu/{menu}/recipe', [MenuBoardController::class, 'attachRecipe'])->middleware('role:10,99')->name('staff.sales-distribution.menu.recipe.store');
    Route::post('/sales-distribution/menu/{menu}/publish', [MenuBoardController::class, 'togglePublish'])->middleware('role:10,99')->name('staff.sales-distribution.menu.publish');
    Route::post('/sales-distribution/order/{sale}/deliver', [MenuBoardController::class, 'toggleDelivery'])->middleware('role:10,99')->name('staff.sales-distribution.order.deliver');

    Route::get('/production/panel', [ProductionPanelController::class, 'index'])->middleware('role:11,99')->name('staff.production.panel.index');
    Route::post('/production/panel/menu/{menu}/stock', [ProductionPanelController::class, 'updateStock'])->middleware('role:11,99')->name('staff.production.panel.stock.update');
    Route::post('/production/panel/menu/{menu}/publish', [ProductionPanelController::class, 'togglePublish'])->middleware('role:11,99')->name('staff.production.panel.publish');

    Route::get('/operating/panel', [OperatingPanelController::class, 'index'])->middleware('role:3,99')->name('operating.panel');

    // Seminar Registration Management (Relations)
    Route::get('/seminar/registrations', [SeminarRegistrationController::class, 'index'])->middleware('role:12,99')->name('staff.seminar.registrations.index');
    Route::post('/seminar/registrations/events', [SeminarRegistrationController::class, 'storeEvent'])->middleware('role:12,99')->name('staff.seminar.registrations.store_event');
    Route::post('/seminar/registrations/events/{event}/toggle', [SeminarRegistrationController::class, 'toggleEvent'])->middleware('role:12,99')->name('staff.seminar.registrations.toggle_event');
    Route::delete('/seminar/registrations/events/{event}', [SeminarRegistrationController::class, 'destroyEvent'])->middleware('role:12,99')->name('staff.seminar.registrations.destroy_event');
    
    // Per Event Registrations
    Route::get('/seminar/registrations/event/{event}', [SeminarRegistrationController::class, 'viewRegistrations'])->middleware('role:12,99')->name('staff.seminar.registrations.view');
    Route::get('/seminar/registrations/event/{event}/export', [SeminarRegistrationController::class, 'export'])->middleware('role:12,99')->name('staff.seminar.registrations.export');
    Route::delete('/seminar/registrations/event/{event}/clear', [SeminarRegistrationController::class, 'clearAll'])->middleware('role:12,99')->name('staff.seminar.registrations.clear');
    Route::delete('/seminar/registrations/registration/{registration}', [SeminarRegistrationController::class, 'destroy'])->middleware('role:12,99')->name('staff.seminar.registrations.destroy');

    // Financial Only Feature
    Route::post('/program/budget/validate/{id}/{valid}', [ProgramController::class, 'validateBudget'])->middleware('role:2')->name('program.budget.validate');
    Route::post('/program/expense/validate/{id?}', [ExpenseItemController::class, 'validateReceipt'])->middleware('role:2')->name('program.expense.validate');
    Route::post('/program/disbursement/add/{id}', [DisbursementItemController::class, 'insertDisbursementItem'])->middleware('role:2')->name('program.disbursement.add');
    Route::post('/program/disbursement/delete/{id}', [DisbursementItemController::class, 'deleteDisbursementItem'])->middleware('role:2')->name('program.disbursement.delete');
    Route::post('/cash_in_item/item/update', [CashFlowController::class, 'updateCashInItem'])->middleware('role:2')->name('cashIn.update');
    Route::post('/cash_in_item/item/add', [CashFlowController::class, 'insertCashInItem'])->middleware('role:2')->name('cashIn.add');
    Route::post('/cash_in_item/item/delete/{id}', [CashFlowController::class, 'deleteCashInItem'])->middleware('role:2')->name('cashIn.delete');
    Route::post('/cash_in_item/item/validate/{id}', [CashFlowController::class, 'validateCashInItem'])->middleware('role:2')->name('cashIn.validate');
    Route::post('/contribution/settings', [ContributionController::class, 'updateContributionConfiguration'])->middleware('role:2')->name('contribution.settings');
    Route::post('/contribution/validation/{id}', [ContributionController::class, 'validation'])->middleware('role:2')->name('contribution.validation');
    Route::post('/contribution/delete', [ContributionController::class, 'delete'])->middleware('role:2')->name('contribution.delete');
    Route::post('/payroll/settings', [PayrollController::class, 'setPayrollSettings'])->middleware('role:2')->name('payroll.settings');
    Route::post('/payroll/single', [PayrollController::class, 'updateSingle'])->name('payroll.update.single');
    Route::post('/payroll/batch', [PayrollController::class, 'updateBatch'])->name('payroll.update.batch');

    // CEO Only Feature
    Route::post('/billboard/add', [DashboardController::class, 'addBillboard'])->middleware('role:1')->name('billboard.add');
    Route::post('/dashboard/post/remove/{id?}', [DashboardController::class, 'removePost'])->name('post.remove');
    Route::post('/department/delete/{id}', [DepartmentController::class, 'deleteDepartment'])->middleware('role:1')->name('department.delete');
    Route::post('/department/update/{id}', [DepartmentController::class, 'updateDepartment'])->middleware('role:1')->name('department.update');
    Route::post('/department/add', [DepartmentController::class, 'insertDepartment'])->middleware('role:1')->name('department.add');
    Route::post('/billboard/delete/{id?}', [DashboardController::class, 'removeBillboard'])->middleware('role:1')->name('billboard.remove');

    // CEO Panel — Governance Year & Staff Management (role:1,99)
    Route::middleware('role:1,99')->prefix('ceo')->group(function () {
        Route::get('/panel',                           [CeoPanelController::class, 'index'])->name('ceo.panel');
        Route::post('/year',                           [CeoPanelController::class, 'storeYear'])->name('ceo.year.store');
        Route::post('/year/{governanceYear}/toggle',   [CeoPanelController::class, 'toggleYear'])->name('ceo.year.toggle');
        Route::post('/user/{user}/promote',            [CeoPanelController::class, 'promoteUser'])->name('ceo.user.promote');
        Route::post('/user/{user}/role',               [CeoPanelController::class, 'assignRole'])->name('ceo.user.role');
        Route::post('/user/{user}/demote',             [CeoPanelController::class, 'demoteUser'])->name('ceo.user.demote');
    });

    // CEO/Admin: pinned-doc (Attachment) management
    Route::post('/attachment/add', [DashboardController::class, 'addAttachment'])->middleware('role:1,8,99')->name('attachment.add');
    Route::post('/attachment/delete/{id?}', [DashboardController::class, 'removeAttachment'])->middleware('role:1,8,99')->name('attachment.remove');

    // CEO/Admin: year switch
    Route::post('/year', [YearController::class, 'set'])->middleware('role:1,8')->name('staff.year.set');

    // Finance monitoring panel (pending validation documents)
    Route::get('/finance/pending-docs', [FinancePanelController::class, 'index'])->middleware('role:2,99')->name('finance.pending');

    // IWP receipt validation panel
    Route::get('/iwp/receipts', [IwpPanelController::class, 'index'])->middleware('role:13')->name('iwp.receipts');
    Route::post('/iwp/receipts/{id}/validate', [IwpPanelController::class, 'validateReceipt'])->middleware('role:13')->name('iwp.receipts.validate');

    // HR birthday panel
    Route::get('/hr/birthdays', [HrBirthdayController::class, 'index'])->middleware('role:6,99')->name('hr.birthdays');
    Route::post('/hr/birthdays/{id}', [HrBirthdayController::class, 'update'])->middleware('role:6,99')->name('hr.birthdays.update');

    // CEO/Admin: pinned-doc management
    Route::middleware('role:1,8')->group(function () {
        Route::get('/pinned-docs', [PinnedDocController::class, 'index'])->name('pinneddoc.index');
        Route::post('/pinned-docs', [PinnedDocController::class, 'store'])->name('pinneddoc.store');
        Route::post('/pinned-docs/{pinnedDoc}', [PinnedDocController::class, 'update'])->name('pinneddoc.update');
        Route::delete('/pinned-docs/{pinnedDoc}', [PinnedDocController::class, 'destroy'])->name('pinneddoc.destroy');
    });

    // Internship Certificates Management - For Staff Only (HR Manager & PIC Internship)
    Route::group([], function () {
        Route::get('/internship/certificates/manage', [InternshipCertificateController::class, 'manageIndex'])->name('certificate.manage');
        Route::post('/internship/certificate/store', [InternshipCertificateController::class, 'store'])->name('certificate.store');
        Route::post('/internship/certificate/update/{id}', [InternshipCertificateController::class, 'update'])->name('certificate.update');
        Route::delete('/internship/certificate/delete/{id}', [InternshipCertificateController::class, 'destroy'])->name('certificate.destroy');
    });

    // Unified Marketing CMS Panel
    Route::middleware('role:9,100,99')->get('/marketing/cms', [MarketingCmsController::class, 'index'])->name('marketing.cms');
    Route::middleware('role:9,100,99')->post('/marketing/upload-image', [MarketingCmsController::class, 'uploadImage'])->name('marketing.upload.image');

    // Marketing Medinfo Dashboard (Legacy routes kept for persistence logic)
    Route::middleware('role:9,100,99')->prefix('marketing')->group(function () {
        Route::get('/structures', [\App\Http\Controllers\StructureController::class, 'index'])->name('marketing.structures.index');
        Route::post('/structures', [\App\Http\Controllers\StructureController::class, 'store'])->name('marketing.structures.store');
        Route::post('/structures/{structure}', [\App\Http\Controllers\StructureController::class, 'update'])->name('marketing.structures.update');
        Route::delete('/structures/{structure}', [\App\Http\Controllers\StructureController::class, 'destroy'])->name('marketing.structures.destroy');

        Route::get('/activities', [\App\Http\Controllers\ActivityController::class, 'index'])->name('marketing.activities.index');
        Route::post('/activities', [\App\Http\Controllers\ActivityController::class, 'store'])->name('marketing.activities.store');
        Route::post('/activities/{activity}', [\App\Http\Controllers\ActivityController::class, 'update'])->name('marketing.activities.update');
        Route::delete('/activities/{activity}', [\App\Http\Controllers\ActivityController::class, 'destroy'])->name('marketing.activities.destroy');

        // Compro CMS (editable homepage content)
        Route::get('/compro', [\App\Http\Controllers\ComproController::class, 'index'])->name('marketing.compro.index');
        Route::post('/compro', [\App\Http\Controllers\ComproController::class, 'store'])->name('marketing.compro.store');
        Route::post('/compro/{companyContent}', [\App\Http\Controllers\ComproController::class, 'update'])->name('marketing.compro.update');
        Route::delete('/compro/{companyContent}', [\App\Http\Controllers\ComproController::class, 'destroy'])->name('marketing.compro.destroy');
    });
});

// Internship Certificates - For Interns (Any authenticated user)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/seeo/internship/certificates', [InternshipCertificateController::class, 'index'])->name('certificate.index');
    Route::get('/seeo/internship/certificate/download/{id}', [InternshipCertificateController::class, 'download'])->name('certificate.download');
});

// Google Drive Authentication Routes
Route::middleware(['auth', 'verified', 'staff', 'role:99'])->group(function () {
    Route::get('/google-drive/auth', [GoogleDriveAuthController::class, 'redirect'])->name('google.drive.auth');
    Route::get('/google-drive/callback', [GoogleDriveAuthController::class, 'callback'])->name('google.drive.callback');
});

require __DIR__ . '/auth.php';
