# Database Schema Appendix

Source of truth: `database/seeo.sql`

This appendix lists the schema tables and columns extracted from the SQL dump.

## Core System Tables

### `users`
- `id`: bigint(20) UNSIGNED NOT NULL
- `id_google`: varchar(255) DEFAULT NULL
- `name`: varchar(255) NOT NULL
- `email`: varchar(255) DEFAULT NULL
- `phone`: varchar(255) DEFAULT NULL
- `email_verified_at`: timestamp NULL DEFAULT NULL
- `password`: varchar(255) DEFAULT NULL
- `location`: varchar(255) DEFAULT NULL
- `point`: int(11) NOT NULL DEFAULT 0
- `profile_image`: varchar(255) DEFAULT NULL
- `roles_id`: int(11) DEFAULT NULL
- `department_id`: int(11) DEFAULT NULL
- `level`: int(11) DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `remember_token`: varchar(100) DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `roles`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(255) NOT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `sessions`
- `id`: varchar(255) NOT NULL
- `user_id`: bigint(20) UNSIGNED DEFAULT NULL
- `ip_address`: varchar(45) DEFAULT NULL
- `user_agent`: text DEFAULT NULL
- `payload`: longtext NOT NULL
- `last_activity`: int(11) NOT NULL

### `migrations`
- `id`: int(10) UNSIGNED NOT NULL
- `migration`: varchar(255) NOT NULL
- `batch`: int(11) NOT NULL

### `password_reset_tokens`
- `email`: varchar(255) NOT NULL
- `token`: varchar(255) NOT NULL
- `created_at`: timestamp NULL DEFAULT NULL

### `cache`
- `key`: varchar(255) NOT NULL
- `value`: mediumtext NOT NULL
- `expiration`: int(11) NOT NULL

### `cache_locks`
- `key`: varchar(255) NOT NULL
- `owner`: varchar(255) NOT NULL
- `expiration`: int(11) NOT NULL

## Organizational Tables

### `department`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(255) NOT NULL
- `manager_id`: int(11) NOT NULL DEFAULT 0
- `budget`: int(11) NOT NULL DEFAULT 0
- `expense`: int(11) NOT NULL DEFAULT 0
- `disbursement`: int(11) NOT NULL DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `program`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(255) NOT NULL
- `department_id`: int(11) NOT NULL
- `pic_id`: int(11) NOT NULL
- `budget`: int(11) NOT NULL DEFAULT 0
- `expense`: int(11) NOT NULL DEFAULT 0
- `disbursement`: int(11) NOT NULL DEFAULT 0
- `financial_id`: int(11) NOT NULL DEFAULT 0
- `staff_lock`: int(11) NOT NULL DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `program_staff`
- `id`: bigint(20) UNSIGNED NOT NULL
- `program_id`: int(11) NOT NULL
- `user_id`: int(11) NOT NULL
- `title`: varchar(255) NOT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `structure`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(255) NOT NULL
- `description`: text DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `activities`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(255) NOT NULL
- `description`: text DEFAULT NULL
- `image`: varchar(255) DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

## SEEO Finance Tables

### `budget_item`
- `id`: bigint(20) UNSIGNED NOT NULL
- `program_id`: int(11) NOT NULL
- `name`: varchar(255) NOT NULL
- `price`: int(11) NOT NULL
- `qty`: int(11) NOT NULL
- `unit`: varchar(255) NOT NULL
- `total_price`: int(11) NOT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `expense_item`
- `id`: bigint(20) UNSIGNED NOT NULL
- `program_id`: int(11) NOT NULL
- `name`: varchar(255) NOT NULL
- `price`: int(11) NOT NULL
- `qty`: int(11) NOT NULL
- `unit`: varchar(255) NOT NULL
- `total_price`: int(11) NOT NULL
- `financial_id`: int(11) DEFAULT NULL
- `reciept`: varchar(255) DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `disbursement_letter`
- `id`: bigint(20) UNSIGNED NOT NULL
- `program_id`: varchar(255) NOT NULL
- `letter`: varchar(255) NOT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `disbursement_item`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(255) NOT NULL
- `program_id`: int(11) NOT NULL
- `letter_id`: int(11) NOT NULL
- `financial_id`: int(11) NOT NULL
- `price`: int(11) NOT NULL
- `reciept`: varchar(255) NOT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `cash_in_item`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(255) NOT NULL
- `price`: int(11) NOT NULL
- `financial_id`: int(11) DEFAULT NULL
- `reciept`: varchar(255) DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `contribution`
- `id`: bigint(20) UNSIGNED NOT NULL
- `user_id`: smallint(6) NOT NULL
- `months`: smallint(6) NOT NULL DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `contribution_configuration`
- `id`: bigint(20) UNSIGNED NOT NULL
- `price`: int(11) DEFAULT NULL
- `start`: smallint(6) DEFAULT NULL
- `period`: smallint(6) DEFAULT NULL
- `financial_id`: smallint(6) DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `contribution_receipt`
- `id`: bigint(20) UNSIGNED NOT NULL
- `contribution_id`: smallint(6) NOT NULL
- `financial_id`: smallint(6) DEFAULT NULL
- `months`: smallint(6) NOT NULL
- `receipt`: varchar(255) NOT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `payroll_level`
- `id`: bigint(20) UNSIGNED NOT NULL
- `level`: varchar(255) NOT NULL DEFAULT '1'
- `salary`: int(11) NOT NULL DEFAULT 0
- `employee`: int(11) NOT NULL DEFAULT 0
- `salary_idr`: int(11) NOT NULL DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `payroll_balance`
- `id`: bigint(20) UNSIGNED NOT NULL
- `balance`: int(11) DEFAULT 0
- `financial_id`: smallint(6) DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

## Dashboard and Social Tables

### `post`
- `id`: bigint(20) UNSIGNED NOT NULL
- `user_id`: int(11) NOT NULL
- `text`: varchar(255) NOT NULL
- `anonymus`: tinyint(1) NOT NULL DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `billboard`
- `id`: bigint(20) UNSIGNED NOT NULL
- `type`: int(11) NOT NULL DEFAULT 1
- `image`: varchar(255) DEFAULT NULL
- `title`: varchar(255) DEFAULT NULL
- `text`: varchar(255) DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `attachment`
- `id`: bigint(20) UNSIGNED NOT NULL
- `user_id`: int(11) NOT NULL
- `type`: int(11) NOT NULL DEFAULT 1
- `title`: varchar(255) DEFAULT NULL
- `document`: varchar(255) DEFAULT NULL
- `link`: varchar(255) DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `like`
- `id`: bigint(20) UNSIGNED NOT NULL
- `user_id`: int(11) NOT NULL
- `post_id`: int(11) NOT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `logbook`
- `id`: bigint(20) UNSIGNED NOT NULL
- `program_id`: int(11) NOT NULL
- `user_id`: int(11) NOT NULL
- `validated`: smallint(6) DEFAULT 0
- `image`: varchar(255) NOT NULL
- `title`: varchar(2000) NOT NULL
- `date_time`: timestamp NULL DEFAULT current_timestamp()
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

## Blaterian Food Tables

### `stand`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(255) NOT NULL
- `place`: varchar(255) DEFAULT NULL
- `date`: date DEFAULT NULL
- `pic_id`: int(11) NOT NULL
- `expense`: int(11) DEFAULT NULL
- `income`: int(11) DEFAULT NULL
- `profit`: int(11) DEFAULT NULL
- `balance`: int(11) DEFAULT NULL
- `menu_lock`: tinyint(4) NOT NULL DEFAULT 0
- `sale_validation`: tinyint(4) NOT NULL DEFAULT 0
- `cashier_token`: int(11) DEFAULT NULL
- `type`: tinyint(4) NOT NULL DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `foods_menu`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(255) NOT NULL
- `volume`: varchar(255) DEFAULT NULL
- `volume_unit`: varchar(255) DEFAULT NULL
- `mass`: varchar(255) DEFAULT NULL
- `mass_unit`: varchar(255) DEFAULT NULL
- `price`: int(11) NOT NULL
- `sale`: tinyint(4) NOT NULL DEFAULT 0
- `stock`: tinyint(4) NOT NULL DEFAULT 0
- `stand_id`: int(11) NOT NULL
- `category`: varchar(255) DEFAULT NULL
- `image`: varchar(255) DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `foods_order`
- `id`: bigint(20) UNSIGNED NOT NULL
- `sales_id`: varchar(255) NOT NULL
- `menu_id`: varchar(255) NOT NULL
- `amount`: varchar(255) NOT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `foods_income`
- `id`: bigint(20) UNSIGNED NOT NULL
- `category`: varchar(255) NOT NULL
- `category_id`: int(11) NOT NULL
- `price`: int(11) NOT NULL DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `foods_expense`
- `id`: bigint(20) UNSIGNED NOT NULL
- `category`: varchar(255) NOT NULL
- `category_id`: int(11) NOT NULL
- `price`: int(11) NOT NULL DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `food_tag`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(255) NOT NULL
- `color`: varchar(255) DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `pivot_food_menu_tag`
- `menu_id`: int(11) NOT NULL
- `food_tag_id`: int(11) NOT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `production_staff`
- `stand_id`: int(11) NOT NULL
- `staff_id`: int(11) NOT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `cashier`
- `stand_id`: int(11) NOT NULL
- `cashier_id`: int(11) NOT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `stand_expense_item`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(255) NOT NULL
- `price`: int(11) NOT NULL
- `qty`: int(11) NOT NULL
- `unit`: varchar(255) NOT NULL
- `total_price`: int(11) NOT NULL
- `stand_id`: int(11) DEFAULT NULL
- `operational_id`: int(11) DEFAULT NULL
- `reciept`: varchar(255) DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `blaterian_food_balance`
- `id`: bigint(20) UNSIGNED NOT NULL
- `balance`: int(11) NOT NULL DEFAULT 0
- `expense`: int(11) NOT NULL DEFAULT 0
- `income`: int(11) NOT NULL DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

## Blaterian Goods Tables

### `goods_product`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(255) NOT NULL
- `category`: varchar(255) NOT NULL
- `pic_id`: int(11) NOT NULL
- `operational_id`: int(11) NOT NULL DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `product_image`
- `id`: bigint(20) UNSIGNED NOT NULL
- `image`: varchar(255) NOT NULL
- `product_id`: int(11) NOT NULL DEFAULT 0
- `note`: varchar(255) DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `product_variant`
- `id`: bigint(20) UNSIGNED NOT NULL
- `product_id`: int(11) NOT NULL
- `name`: varchar(255) NOT NULL
- `description`: text NOT NULL
- `price`: int(11) NOT NULL
- `sale`: int(11) NOT NULL DEFAULT 0
- `stock`: int(11) NOT NULL
- `rate`: double NOT NULL DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `goods_order`
- `id`: bigint(20) UNSIGNED NOT NULL
- `sales_id`: varchar(255) NOT NULL
- `variant_id`: varchar(255) NOT NULL
- `discount`: int(11) NOT NULL DEFAULT 0
- `amount`: varchar(255) NOT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `goods_sale`
- `id`: bigint(20) UNSIGNED NOT NULL
- `transaction`: int(11) NOT NULL DEFAULT 0
- `customer`: varchar(255) NOT NULL
- `operational_id`: int(11) DEFAULT NULL
- `cashier_id`: int(11) DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `goods_income`
- `id`: bigint(20) UNSIGNED NOT NULL
- `category`: varchar(255) NOT NULL
- `category_id`: int(11) NOT NULL
- `price`: int(11) NOT NULL DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `goods_expense`
- `id`: bigint(20) UNSIGNED NOT NULL
- `category`: varchar(255) NOT NULL
- `category_id`: int(11) NOT NULL
- `price`: int(11) NOT NULL DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `goods_capital`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(255) NOT NULL
- `price`: int(11) NOT NULL
- `qty`: int(11) NOT NULL
- `unit`: varchar(255) NOT NULL
- `total_price`: int(11) NOT NULL
- `operational_id`: int(11) DEFAULT NULL
- `receipt`: varchar(255) DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `blaterian_good_balance`
- `id`: bigint(20) UNSIGNED NOT NULL
- `balance`: int(11) NOT NULL DEFAULT 0
- `expense`: int(11) NOT NULL DEFAULT 0
- `income`: int(11) NOT NULL DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

## Customer / Shop Tables

### `voucher`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(30) NOT NULL
- `code`: varchar(30) DEFAULT NULL
- `point`: int(11) NOT NULL DEFAULT 0
- `start_date`: date NOT NULL
- `end_date`: date NOT NULL
- `image`: varchar(255) DEFAULT NULL
- `user_quota`: int(11) NOT NULL
- `min_transaction`: int(11) NOT NULL DEFAULT 0
- `discount_type`: varchar(30) NOT NULL
- `discount_price`: int(11) NOT NULL DEFAULT 0
- `discount_percent`: int(11) NOT NULL DEFAULT 0
- `discount_max_price`: int(11) NOT NULL DEFAULT 0
- `operational_id`: int(11) NOT NULL DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `customer_voucher`
- `customer_id`: int(11) NOT NULL DEFAULT 0
- `voucher_id`: int(11) NOT NULL DEFAULT 0
- `use_date`: date DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `customer_feedback`
- `id`: bigint(20) UNSIGNED NOT NULL
- `customer_id`: int(11) NOT NULL
- `rate`: int(11) NOT NULL
- `message`: varchar(255) NOT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `payment_method`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(255) NOT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `general_contact`
- `id`: bigint(20) UNSIGNED NOT NULL
- `title`: varchar(255) NOT NULL
- `name`: varchar(255) NOT NULL
- `phone`: varchar(255) NOT NULL
- `address`: varchar(255) NOT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `sales`
- `id`: bigint(20) UNSIGNED NOT NULL
- `cashier_id`: tinyint(4) NOT NULL
- `stand_id`: tinyint(4) NOT NULL
- `discount`: int(11) NOT NULL DEFAULT 0
- `transaction`: int(11) NOT NULL
- `customer`: varchar(255) DEFAULT NULL
- `customer_id`: int(11) DEFAULT NULL
- `voucher_id`: int(11) DEFAULT NULL
- `receipt_income`: varchar(50) DEFAULT NULL
- `order_type`: varchar(50) DEFAULT NULL
- `send_option`: varchar(50) DEFAULT NULL
- `payment_method_id`: int(11) NOT NULL DEFAULT 1
- `payment_price`: int(11) NOT NULL DEFAULT 0
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

## Internship Tables

### `internship_applications`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(255) NOT NULL
- `email`: varchar(255) DEFAULT NULL
- `phone_number`: varchar(255) DEFAULT NULL
- `study_program`: varchar(255) DEFAULT NULL
- `division_choice_1`: varchar(255) DEFAULT NULL
- `reason_choice_1`: text DEFAULT NULL
- `division_choice_2`: varchar(255) DEFAULT NULL
- `reason_choice_2`: text DEFAULT NULL
- `willing_to_be_placed_elsewhere`: tinyint(1) DEFAULT 0
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `internship_certificates`
- `id`: bigint(20) UNSIGNED NOT NULL
- `user_id`: int(11) NOT NULL
- `file`: varchar(255) NOT NULL
- `issued_at`: date DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `event_registrations`
- `id`: bigint(20) UNSIGNED NOT NULL
- `name`: varchar(255) NOT NULL
- `email`: varchar(255) DEFAULT NULL
- `phone`: varchar(255) DEFAULT NULL
- `event_name`: varchar(255) DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

## Marketing Tables

### `structures`
- `id`: bigint(20) UNSIGNED NOT NULL
- `title`: varchar(255) NOT NULL
- `description`: text DEFAULT NULL
- `image`: varchar(255) DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

### `activities`
- `id`: bigint(20) UNSIGNED NOT NULL
- `title`: varchar(255) NOT NULL
- `description`: text DEFAULT NULL
- `image`: varchar(255) DEFAULT NULL
- `deleted_at`: timestamp NULL DEFAULT NULL
- `created_at`: timestamp NULL DEFAULT NULL
- `updated_at`: timestamp NULL DEFAULT NULL

## Utility and Support Tables

### `jobs`
- `id`: bigint(20) UNSIGNED NOT NULL
- `queue`: varchar(255) NOT NULL
- `payload`: longtext NOT NULL
- `attempts`: tinyint(3) UNSIGNED NOT NULL
- `reserved_at`: int(10) UNSIGNED DEFAULT NULL
- `available_at`: int(10) UNSIGNED NOT NULL
- `created_at`: int(10) UNSIGNED NOT NULL

### `failed_jobs`
- Not present in the excerpted extraction, but expected by Laravel queue config when using database queue.

## Notes

- Most domain tables use `deleted_at`, so soft deletes are part of the data lifecycle.
- Many fields are stored as integers even when they represent money or counters.
- Several tables use `*_id` naming without full FK declarations in the dump. Preserve the semantic relationships when rebuilding.
- The dump mixes operational tables, support tables, and queue/session tables in one schema snapshot.
