<?php

use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\CompanyProfileController;
use App\Http\Controllers\InternshipApplicationController;
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
use App\Http\Controllers\Staff\Business\SalesController;
use App\Http\Controllers\Staff\Business\StandController;
use App\Http\Controllers\Staff\SEEO\BudgetItemController;
use App\Http\Controllers\Staff\SEEO\CashFlowController;
use App\Http\Controllers\Staff\SEEO\DashboardController;
use App\Http\Controllers\Staff\SEEO\DepartmentController;
use App\Http\Controllers\Staff\SEEO\DisbursementItemController;
use App\Http\Controllers\Staff\SEEO\DisbursementLetterController;
use App\Http\Controllers\Staff\SEEO\ExpenseItemController;
use App\Http\Controllers\Staff\SEEO\LogbookController;
use App\Http\Controllers\Staff\SEEO\ProfileController;
use App\Http\Controllers\Staff\SEEO\ProgramController;
use App\Http\Controllers\Staff\SEEO\ContributionController;
use App\Http\Controllers\Staff\SEEO\UserController;
use App\Http\Controllers\InternshipCertificateController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\StorageController;
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
Route::get('/contact', [CompanyProfileController::class, 'contact'])->name('contact');
Route::get('/about', [CompanyProfileController::class, 'about'])->name('about');

// Route::get('/', [WelcomeController::class, 'index'])->name('intro');
Route::get('/bingo', function () {
    return Inertia::render('Bingo');
})->name('bingo');

// Google Authentication
Route::get('/google/auth/callback', [GoogleController::class, 'callback']);

// Customer
Route::get('/shop/home/{tab?}', [ShopController::class, 'index'])->name('shop');


// Internship Applications
// Access: CEO, Co-CEO, HR Manager, dan PIC Internship
Route::middleware(['auth', 'verified', 'staff', 'internship.access'])->group(function () {
    Route::get('/internship-applications', [InternshipApplicationController::class, 'index'])->name('internship.applications.index');
});

// form daftar internship
// Route::get('/pendaftaran-internship', [InternshipApplicationController::class, 'create'])->name('internship.create');
// Route::post('/pendaftaran-internship', [InternshipApplicationController::class, 'store'])->name('internship.store');

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

// Authenticated staff
Route::middleware(['auth', 'verified', 'staff'])->group(function () {

    // SEEO Management
    Route::get('/profile/{id?}', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/password/change', [ProfileController::class, 'changePassword'])->name('password.change');
    Route::post('/logbook/add/{id?}', [LogbookController::class, 'insertLog'])->name('logbook.add');
    Route::post('/logbook/delete/{id?}', [LogbookController::class, 'deleteLog'])->name('logbook.delete');
    Route::post('/logbook/validate/{id?}', [LogbookController::class, 'validateLog'])->name('logbook.validate');
    Route::get('/seeo/dashboard/{advance?}', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/dashboard/post/add', [DashboardController::class, 'addPost'])->name('post.add');
    Route::get('/seeo/user', [UserController::class, 'index'])->name('role');
    Route::post('/user', [UserController::class, 'filterEmployee'])->name('role.filter');
    Route::post('/user/level/add', [UserController::class, 'addOrEditLevel'])->name('level.add.edit');
    Route::post('/payroll/balance/add', [UserController::class, 'setPayrollBalance'])->name('payroll.balance.add');
    Route::get('/seeo/structural/{id?}', [DepartmentController::class, 'structural'])->name('structural');
    Route::post('/structural', [DepartmentController::class, 'filterDepartment'])->name('structural.filter');
    Route::get('/seeo/department/{id}', [DepartmentController::class, 'department'])->name('department');
    Route::post('/unemployee', [UserController::class, 'filterUnmployee'])->name('unemployee.filter');
    Route::get('/seeo/finance', [CashFlowController::class, 'index'])->name('finance');
    Route::get('/seeo/finance_feature', [CashFlowController::class, 'feature'])->name('finance.feature');
    Route::get('/seeo/contribution/{id}', [CashFlowController::class, 'showMyContribution'])->name('checkContribution');
    Route::post('/cashflow/in', [CashFlowController::class, 'filterCashIn'])->name('cashIn.filter');
    Route::post('/cashflow/out', [CashFlowController::class, 'filterCashOut'])->name('cashOut.filter');
    Route::get('/seeo/program/{id}', [ProgramController::class, 'program'])->name('program');
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
    Route::post('/food/stand/menu/filter/{id}', [StandController::class, 'filterStandMenu'])->name('stand.menu.filter');
    Route::post('/food/stand/menu/add/{id}', [StandController::class, 'insertMenu'])->name('stand.menu.add');
    Route::post('/food/stand/menu/delete/{id}', [StandController::class, 'deleteMenu'])->name('stand.menu.delete');
    Route::post('/food/stand/menu/stock/update', [StandController::class, 'updateStock'])->name('stand.menu.stock.update');
    Route::post('/food/stand/menu/image/update/{id}', [StandController::class, 'updateImage'])->name('stand.menu.image.update');
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
    Route::post('/food/stand/add/new', [StandController::class, 'insertStand'])->middleware('role:3')->name('food.stand.insert');
    Route::post('/food/stand/delete/{id}', [StandController::class, 'deleteStand'])->middleware('role:3')->name('food.stand.delete');
    Route::post('/food/stand/expense/validate/{id}', [StandController::class, 'validateExpenseReceipt'])->middleware('role:3')->name('stand.expense.validate');
    Route::post('/food/stand/menu/lock/{id}', [StandController::class, 'lockMenu'])->middleware('role:3')->name('stand.menu.validate');
    Route::post('/food/stand/sales/validate/{id}', [SalesController::class, 'validateSales'])->middleware('role:3')->name('stand.income.validate');
    Route::post('/food/balance/send', [BlaterianFoodBalanceController::class, 'withdrawBalance'])->middleware('role:3')->name('food.balance.withdraw');
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
    Route::post('/employee/add/{id}', [UserController::class, 'addEmployee'])->middleware('role:1')->name('employee.add');
    Route::post('/role/update', [UserController::class, 'update'])->middleware('role:1')->name('role.update');
    Route::post('/user/delete/{id?}', [UserController::class, 'delete'])->middleware('role:1')->name('role.remove');
    Route::post('/billboard/delete/{id?}', [DashboardController::class, 'removeBillboard'])->middleware('role:1')->name('billboard.remove');
    Route::post('/attachment/add', [DashboardController::class, 'addAttachment'])->middleware('role:1')->name('attachment.add');
    Route::post('/attachment/remove/{id?}', [DashboardController::class, 'removeAttachment'])->middleware('role:1')->name('attachment.remove');

    // Internship Certificates - For Interns (Any authenticated user)
    Route::middleware('auth')->group(function(){
        Route::get('/internship/certificates', [InternshipCertificateController::class, 'index'])->name('certificate.index');
        Route::get('/internship/certificate/download/{id}', [InternshipCertificateController::class, 'download'])->name('certificate.download');
    });

    Route::prefix('staff')->group(function(){
        Route::get('/internship/certificates/manage', [InternshipCertificateController::class, 'manageIndex'])->name('certificate.manage');
        Route::post('/internship/certificate/store', [InternshipCertificateController::class, 'store'])->name('certificate.store');
        Route::post('/internship/certificate/update/{id}', [InternshipCertificateController::class, 'update'])->name('certificate.update');
        Route::delete('/internship/certificate/delete/{id}', [InternshipCertificateController::class, 'destroy'])->name('certificate.destroy');
    });
});

require __DIR__ . '/auth.php';
