# System Analysis Report

## Project Identity

This repository is a Laravel + Inertia + Vue 3 application for SEEO and Blaterian operations.

- Backend: Laravel 12, PHP 8.2+
- Frontend: Vue 3, Inertia.js, Vite, Bootstrap 5, Tailwind utilities
- Database: MySQL/MariaDB
- File storage: local storage plus Google Drive via a custom Google filesystem disk
- Queue: database queue by default

Primary source files reviewed for this report:

- `routes/web.php`
- `database/seeo.sql`
- `app/Models/*`
- `app/Http/Controllers/*`
- `resources/js/Layouts/*`
- `resources/js/Pages/*`
- `resources/js/Components/*`
- `config/filesystems.php`
- `config/queue.php`
- `composer.json`
- `package.json`

## Executive Summary

The system is not a single-purpose app. It is a multi-domain internal platform with three major usage layers:

1. Public information and customer flows.
2. Staff/admin operations for SEEO.
3. Business operations for Blaterian food and goods units.

The SEEO area is the largest part of the system. It manages organizational structure, departments, programs, staff assignment, budgets, disbursements, expenses, payroll, contributions, cashflow, logbooks, dashboard posts, billboards, and attachments.

The Blaterian area handles stands, menus, cashier/sales flows, goods products, product variants, stock, sales, expenses, income, and financial insight pages.

The public area provides homepage content, company profile pages, activity pages, contact/about pages, shop pages, internship registration, and internship certificate access.

The authoritative database source is `database/seeo.sql`. If you want the exact same schema and seed state, import that dump directly instead of reconstructing tables manually.

## Technology Stack

- Framework: Laravel
- Frontend bridge: Inertia.js
- UI framework: Vue 3 + Bootstrap 5
- Styling/build: Vite, Tailwind CSS utilities, Sass, Bootstrap Icons
- Routing helper: Ziggy
- Charts/visuals: Chart.js
- Export/document utilities: SheetJS/XLSX, jsPDF, html2canvas
- Image processing: Intervention Image, Spatie image optimizer
- Auth: Laravel auth, Socialite Google login
- Google Drive integration: `yaza/laravel-google-drive-storage`

## System Structure

### 1. Public layer

Public pages are for visitors or logged-in customers. They include:

- Homepage
- About
- Contact
- Activity
- Structure
- Promotion
- Shop
- Stand browsing
- Transaction history
- Internship registration
- Internship certificate download

### 2. Staff layer

This is the internal admin area and is protected by `auth`, `verified`, and `staff` middleware. It contains the SEEO management system and the Blaterian business back office.

### 3. Role-based submodules

The staff layer is further split by role checks and feature access:

- Role 1: CEO-only operations
- Role 2: Financial-only operations
- Role 3: Operational-only operations
- Role 100: Marketing / Medinfo dashboard

## Backend Inventory

### Route Organization

The route map in `routes/web.php` is the canonical entry point for the system.

Main route groups:

- Public routes for homepage, structure, activity, about, contact
- Customer routes for shop, checkout, profile, vouchers
- Internship routes for application registration and staff review
- Staff routes for SEEO and Blaterian operations
- Marketing routes for structures and activities

### Major Controllers by Domain

#### Public and general

- `CompanyProfileController` for public pages
- `WelcomeController` for alternative landing flow
- `StorageController` for serving stored files
- `StructureController` and `ActivityController` for marketing pages

#### Authentication

- `Auth\LoginController`
- `Auth\GoogleController`
- `Auth\RegisteredUserController`
- `Auth\RegisteredGoogleUserController`
- `Auth\PasswordController`
- `Auth\PasswordResetLinkController`
- `Auth\VerifyEmailController`
- `Auth\ConfirmablePasswordController`
- `Auth\AuthenticatedSessionController`

#### SEEO management

- `Staff\SEEO\DashboardController`
- `Staff\SEEO\DepartmentController`
- `Staff\SEEO\ProgramController`
- `Staff\SEEO\UserController`
- `Staff\SEEO\ProfileController`
- `Staff\SEEO\PayrollController`
- `Staff\SEEO\LogbookController`
- `Staff\SEEO\ExpenseItemController`
- `Staff\SEEO\DisbursementLetterController`
- `Staff\SEEO\DisbursementItemController`
- `Staff\SEEO\ContributionController`
- `Staff\SEEO\CashFlowController`
- `Staff\SEEO\BudgetItemController`

#### Blaterian business

- `Staff\Business\StandController`
- `Staff\Business\SalesController`
- `Staff\Business\GoodController`
- `Staff\Business\GoodDetailController`
- `Staff\Business\GoodOrderController`
- `Staff\Business\GoodSaleController`
- `Staff\Business\GoodInsightController`
- `Staff\Business\InsightController`
- `Staff\Business\BlaterianFoodBalanceController`
- `Staff\Business\BlaterianGoodBalanceController`
- `Staff\Business\ExpenseReceiptController`
- `Staff\Business\RecipeComponentController`

#### Customer/shop

- `Shop\ShopController`
- `Shop\CustomerController`
- `Shop\VoucherController`

#### Internship

- `InternshipApplicationController`
- `InternshipCertificateController`

#### Google Drive auth helper

- `GoogleDriveAuthController`

## Frontend Inventory

### Layouts

- `resources/js/Layouts/StaffLayout.vue` is the core staff shell and sidebar layout.
- `resources/js/Layouts/PublicLayout.vue` is the public shell.
- `resources/js/Layouts/InternLayout.vue` is used for internship-related views.
- `resources/js/Layouts/GuestLayout.vue` and `AuthenticationLayout.vue` support auth pages.

### Core shared components

- `resources/js/Components/ModalConfirmation.vue`
- `resources/js/Components/Notif.vue`
- `resources/js/Components/InputError.vue`
- `resources/js/Components/PrimaryButton.vue`
- `resources/js/Components/Dropdown.vue`
- `resources/js/Components/DropdownLink.vue`
- `resources/js/Components/IncomeReceiptTemplate.vue`
- `resources/js/Components/VueSelect.vue`

### Utility module

- `resources/js/utils.js` contains shared formatting and helper functions:
  - `formatIDR`
  - `showImage`
  - `formatDate`
  - `formatDateSimple`
  - `formatDateOnly`
  - `formatTime`
  - `formatTimeOnly`
  - `getMonthName`
  - `showPassword`

### Important frontend pages

#### Public pages

- `resources/js/Pages/Public/Homepage.vue`
- `resources/js/Pages/Public/About.vue`
- `resources/js/Pages/Public/Contact.vue`
- `resources/js/Pages/Public/Activity.vue`
- `resources/js/Pages/Public/Structure.vue`
- `resources/js/Pages/Public/Promotion.vue`
- `resources/js/Pages/Public/Shop.vue`
- `resources/js/Pages/Public/Stand.vue`
- `resources/js/Pages/Public/Profile.vue`
- `resources/js/Pages/Public/Transaction.vue`

#### Auth pages

- `resources/js/Pages/Auth/Login.vue`
- `resources/js/Pages/Auth/Register.vue`
- `resources/js/Pages/Auth/RegisterGoogle.vue`
- `resources/js/Pages/Auth/ForgotPassword.vue`
- `resources/js/Pages/Auth/ResetPassword.vue`
- `resources/js/Pages/Auth/VerifyEmail.vue`

#### Internship pages

- `resources/js/Pages/Internship/Register.vue`
- `resources/js/Pages/Internship/Index.vue`
- `resources/js/Pages/Internship/Certificates/Index.vue`

#### SEEO staff pages

- `resources/js/Pages/Staff/SEEO/Dashboard.vue`
- `resources/js/Pages/Staff/SEEO/Structural.vue`
- `resources/js/Pages/Staff/SEEO/Department.vue`
- `resources/js/Pages/Staff/SEEO/Program.vue`
- `resources/js/Pages/Staff/SEEO/Employee.vue`
- `resources/js/Pages/Staff/SEEO/CashFlow.vue`
- `resources/js/Pages/Staff/SEEO/FinanceFeature.vue`

#### Blaterian staff pages

- `resources/js/Pages/Staff/Business/Stand.vue`
- `resources/js/Pages/Staff/Business/StandDetail.vue`
- `resources/js/Pages/Staff/Business/StandCashier.vue`
- `resources/js/Pages/Staff/Business/Insight.vue`
- `resources/js/Pages/Staff/Business/InsightCashflow.vue`

#### Marketing pages

- `resources/js/Pages/Staff/Marketing/Structures.vue`
- `resources/js/Pages/Staff/Marketing/Activities.vue`

## Detailed Module Analysis

### A. SEEO Dashboard Module

Purpose:

- Central internal dashboard for staff.
- Shows billboard content, posts, attachments, and internal updates.

Main functions:

- View dashboard feed
- Add post
- Remove post
- Add billboard
- Remove billboard
- Add attachments
- Remove attachments

Key data tables:

- `post`
- `billboard`
- `attachment`

Flow:

1. Staff opens dashboard.
2. Controller fetches billboards, posts, and attachments.
3. Staff adds content.
4. Uploaded files are stored and served via storage/Google Drive depending on configuration.

### B. Organizational Structure Module

Purpose:

- Manage organizational units, departments, and staff grouping.

Main functions:

- View structure listing
- View department detail
- Add/remove staff in department
- Add/update/delete departments

Key data tables:

- `department`
- `structure`
- `users`

Flow:

1. CEO or staff opens structural overview.
2. System lists departments and organizational structure entries.
3. Department detail shows assigned staff and program links.
4. CEO can modify departments and assignments.

### C. Program Module

Purpose:

- Manage specific programs under departments.
- Handle program budgets, expenses, staff assignment, and disbursements.

Main functions:

- View program detail
- Add/update/delete program
- Manage staff in program
- Add/delete budget items
- Add/delete expense items
- Validate budget and expense receipts
- Manage disbursement letters/items

Key data tables:

- `program`
- `program_staff`
- `budget_item`
- `expense_item`
- `disbursement_letter`
- `disbursement_item`

Flow:

1. Department page links to program detail.
2. Program detail shows budget, expense, staff, and disbursement tabs.
3. Financial staff can validate budget/expense items.
4. Operational staff can create/update program content.

### D. Cashflow and Contribution Module

Purpose:

- Manage internal cash in/out financial tracking and contributions.

Main functions:

- View cashflow summary
- Add cash in item
- Filter cash in/out lists
- Validate cash in items
- Manage contribution configuration
- Validate contribution payments
- Delete contribution records

Key data tables:

- `cash_in_item`
- `contribution`
- `contribution_receipt`
- `contribution_config`

Flow:

1. Financial staff opens cashflow pages.
2. Cash inflow and outflow lists are displayed with totals.
3. Financial team can create and validate entries.
4. Contribution settings define who pays, when, and how much.

### E. Payroll and Role Management

Purpose:

- Manage staff payroll settings, role mapping, and pay balances.

Main functions:

- View employee role list
- Filter employees
- Add/edit staff level/role
- Set payroll balance
- Update payroll settings
- Batch/single payroll updates

Key data tables:

- `roles`
- `users`
- `payroll_level`
- `payroll_balance`

### F. Logbook Module

Purpose:

- Track staff work logs and activity validation.

Main functions:

- Add log entry
- Delete log entry
- Validate log entry
- Check logbook per program

Key data table:

- `logbook`

### G. Blaterian Food Business Module

Purpose:

- Manage food stands and operational cashier activities.

Main functions:

- Stand list and detail
- Assign production staff
- Assign cashier staff
- Add/update/delete stands
- Filter stand data
- Manage menu items
- Update menu stock and image
- Add recipe components
- Track expenses and sales
- Validate expenses and income

Key data tables:

- `stand`
- `menu_item`
- `production_staff`
- `cashier`
- `stand_expense`
- `stand_sales`
- `recipe_component`
- `foods_income`
- `foods_expense`
- `foods_tag`
- `food_order`
- `blaterian_food_balance`

### H. Blaterian Goods Business Module

Purpose:

- Manage goods/products business with stock, variants, orders, and financial records.

Main functions:

- Product listing/detail
- Add/update/delete products
- Add images and variants
- Update stock and descriptions
- Create orders and cart transactions
- Validate sales and capital
- Track goods income, expense, and balance

Key data tables:

- `goods_product`
- `product_image`
- `product_variant`
- `goods_order`
- `goods_sales`
- `goods_income`
- `goods_expense`
- `goods_capital`
- `blaterian_good_balance`

### I. Shop / Customer Module

Purpose:

- Public customer-facing purchasing flow.

Main functions:

- Browse shop home
- Browse stand pages
- Place order
- Finish payment
- Cancel transaction
- Redeem voucher
- Submit feedback
- View customer profile

Key data tables:

- `customer_feedback`
- `voucher`
- `customer_voucher`
- `food_order`
- `goods_order`
- payment-related tables under stand/shop flows

### J. Internship Module

Purpose:

- Collect internship applicants and issue internship certificates.

Main functions:

- Public internship registration
- Staff review of applications
- Certificate management and download

Key data tables:

- `internship_applications`
- `internship_certificates`

### K. Marketing Module

Purpose:

- Role 100 dashboard for structures and activities.

Main functions:

- CRUD structures
- CRUD activities

Key data tables:

- `structures`
- `activities`

## Feature Flow Summary

### Public user flow

1. Open homepage.
2. Read company info, structure, activity, and contact pages.
3. Visit shop or promotion pages.
4. Register for internship if needed.
5. Use customer-facing order or voucher flows after login.

### Staff flow

1. Log in with staff account.
2. Land on dashboard.
3. Navigate to SEEO or Blaterian modules through staff sidebar.
4. Depending on role, see only allowed actions.

### SEEO operational flow

1. CEO defines departments and programs.
2. Staff are assigned to department/program.
3. Program budgets and expenses are created.
4. Financial staff validates budget and receipt items.
5. Logbook entries are added and validated.
6. Payroll and contribution settings are managed.

### Blaterian food flow

1. Admin creates stand.
2. Staff assigned to production/cashier roles.
3. Menu items and receipts are maintained.
4. Transactions are created at cashier.
5. Expenses and sales affect balance and insights.

### Blaterian goods flow

1. Product created and variants/images added.
2. Stock and description updated.
3. Orders and cart items are recorded.
4. Sales and capital are validated.
5. Balance and insight pages summarize performance.

## Database Structure Notes

The exact schema is best reproduced from `database/seeo.sql`.

Observed schema characteristics:

- Many tables use soft deletes (`deleted_at`).
- Most records use `created_at` and `updated_at` timestamps.
- There are several financial balance summary tables with aggregated amounts.
- Many domain tables are linked by integer foreign keys rather than modern explicit FK constraints in every case.
- Queue configuration expects `jobs` and `failed_jobs` tables.

Important groups of tables in the dump:

- Core auth: `users`, `roles`
- Organization: `department`, `program`, `program_staff`, `structure`
- SEEO finance: `budget_item`, `expense_item`, `disbursement_letter`, `disbursement_item`, `cash_in_item`, `contribution`, `contribution_receipt`, `contribution_config`, `payroll_level`, `payroll_balance`, `logbook`
- Dashboard/media: `post`, `billboard`, `attachment`, `like`
- Internship: `internship_applications`, `internship_certificates`, `event_registrations`
- Marketing: `activities`, `structures`
- Blaterian food: `stand`, `menu_item`, `stand_expense`, `stand_sales`, `foods_income`, `foods_expense`, `foods_tag`, `food_order`, `blaterian_food_balance`
- Blaterian goods: `goods_product`, `product_variant`, `goods_order`, `goods_sales`, `goods_income`, `goods_expense`, `goods_capital`, `blaterian_good_balance`
- Shop/customer: `voucher`, `customer_voucher`, `customer_feedback`, `payment_method`, `general_contact`

## Storage and Integration Notes

### Google Drive

- Configured in `config/filesystems.php` as a `google` disk.
- Uses client id, client secret, refresh token, and folder from environment.
- The app includes a Google OAuth helper controller to refresh and persist the refresh token.

### Local file storage

- Standard Laravel `public` and `local` disks are also present.
- `public/storage` symbolic link is configured in the filesystem links section.

### Queue

- Default queue driver is `database` in `config/queue.php`.
- If queue tables are missing, the app will log errors when queue operations run.

### Mail

- Mailer is configured through Laravel standard mail config.
- Development defaults are log-based in `.env.example`.

## Rebuild / Reimplementation Blueprint

If you are recreating the project, the safe order is:

1. Recreate the database by importing `database/seeo.sql`.
2. Recreate Laravel models/controllers/routes from the domain map above.
3. Recreate the staff/public layouts and shared components.
4. Recreate utility functions in `resources/js/utils.js`.
5. Recreate role and middleware logic.
6. Recreate file storage and Google Drive integration.
7. Recreate queue support and ensure queue tables exist.

Recommended setup commands:

```bash
composer install
npm install
php artisan key:generate
php artisan storage:link
php artisan queue:table
php artisan queue:failed-table
php artisan migrate
```

If you want the exact seeded state, import the SQL dump instead of migrating from scratch.

## Known Operational Risks

- Some browser/runtime issues were caused by missing front-end imports or stale Vite hot reload state.
- Google OAuth token exchange can fail if CA certificates are misconfigured on the development machine.
- Disk-based queue mode requires `jobs` table creation.
- Several pages rely on `utils.js`; replacing those with explicit imports is safer for rebuild work.

## Conclusion

This codebase is a fairly large multi-domain operational system. The most stable source of truth for the schema is `database/seeo.sql`, while the functional structure is best understood by grouping the routes and controllers into SEEO, Blaterian, Public, Internship, and Marketing domains.

For a rebuild, import the SQL dump first, then recreate the controllers and pages using the module map in this report.

## Rebuild Architecture

If you are rebuilding from zero, use this architecture order.

### 1. Core platform layer

- Laravel application bootstrap
- Auth, roles, middleware, and route groups
- Shared helpers in `app/helpers.php`
- Shared utility functions in `resources/js/utils.js`
- Global layouts for public, staff, internship, guest, and auth pages

### 2. Data layer

- Import `database/seeo.sql` to preserve exact schema and seeded IDs
- Recreate Eloquent models for all domain tables
- Keep `deleted_at`, `created_at`, and `updated_at` behavior consistent
- Preserve the role and department relationships used by the UI

### 3. Domain modules

- SEEO dashboard, structure, department, program, payroll, contribution, logbook, cashflow
- Blaterian food: stand, menu, sales, cashier, expenses, balances
- Blaterian goods: product, variant, order, sales, balances, insights
- Public pages: homepage, about, contact, activity, structure, promotion, shop
- Internship: registration, review, certificate management
- Marketing: structures and activities for role 100

### 4. Frontend assembly

- Rebuild `StaffLayout.vue` first because it is the shell for almost all staff pages
- Rebuild public pages and their shared cards/sections next
- Reconnect each page to the matching controller method and route name
- Use explicit imports from `resources/js/utils.js` instead of hidden globals

### 5. Integrations

- Google Drive disk and OAuth refresh token flow
- Queue tables if the database queue driver stays enabled
- File streaming controllers for receipts and attachments

### 6. Validation

- Check that `vite` builds cleanly
- Confirm `storage:link` works
- Confirm role-based menu visibility in the staff sidebar
- Confirm file uploads and Google Drive retrieval paths

## Schema Appendix

The full table-by-table column inventory is stored in [DATABASE_SCHEMA_APPENDIX.md](DATABASE_SCHEMA_APPENDIX.md). That appendix is derived from `database/seeo.sql` and is intended to be the rebuild reference for exact schema recreation.

## SQL Import Checklist

Use this checklist when cloning or recreating the project database.

### Before import

1. Make sure MySQL/MariaDB is running.
2. Create the target database with `utf8mb4` encoding.
3. Back up any existing database if you are importing into an existing environment.
4. Confirm the SQL file path is the exact dump you want to restore.

### Import steps

```bash
mysql -u root -p -e "CREATE DATABASE seeo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p seeo_db < database/seeo.sql
```

### After import

1. Update `.env` database credentials to match the target database.
2. Run `php artisan key:generate` if the app key is empty.
3. Run `php artisan storage:link`.
4. Run `php artisan optimize:clear` to flush old config and view caches.
5. If queue mode remains `database`, create and migrate the queue tables.

### Optional queue tables

```bash
php artisan queue:table
php artisan queue:failed-table
php artisan migrate
```

### Verification

1. Open the login page and confirm auth works.
2. Open staff dashboard and confirm the sidebar renders.
3. Open a public page and confirm the layout/assets load.
4. Check that uploaded images and receipts resolve through the storage controller.
5. Confirm Google Drive callbacks still work if those features are enabled in `.env`.