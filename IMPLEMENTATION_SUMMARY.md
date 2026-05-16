# Ringkasan Implementasi Fitur Baru SEEO v5.0

## 📋 Daftar Isi
1. [Overview Fitur Berdasarkan Role](#overview-fitur-berdasarkan-role)
2. [Route Mapping](#route-mapping)
3. [Controller & Function Details](#controller--function-details)
4. [Model & Database](#model--database)
5. [Vue Components](#vue-components)
6. [Testing Credentials](#testing-credentials)

---

## Overview Fitur Berdasarkan Role

### 🎯 Role 3: Operational Officer (Petugas Operasional)

**Fitur Utama:** Operating Panel - Monitor dan Validasi Logbook

**Deskripsi:**
- Memantau semua logbook/catatan harian dari karyawan
- Melihat ringkasan aktivitas per staff
- Mencari logbook berdasarkan nama staff, program, atau judul
- Filter berdasarkan status validasi (semua/pending/tervalidasi)
- Menampilkan total, tervalidasi, dan pending logbook

**Menu Sidebar:**
```
Business > Foods > Operating Panel
```

**Status:** ✅ Fully Implemented

---

### 🏪 Role 10: Sales Distribution (Penjualan & Distribusi)

**Fitur Utama:** Sales Distribution Panel - Menu Board & Order Management

**Deskripsi:**
- Membuat menu makanan baru untuk stand
- Menambahkan resep dengan komponen biaya otomatis
- Menghitung harga pokok menu dari bahan
- Menyarankan harga jual (pokok × 1.3)
- Mempublikasikan/menarik menu dari toko
- Melacak pesanan pelanggan dan pengiriman
- Pencarian menu (nama/kategori) dan pembeli
- Filter pesanan berdasarkan status pengiriman

**Menu Sidebar:**
```
Business > Foods > Sales Distribution
```

**Features:**
- ✅ Create Menu Item
- ✅ Add Recipe Components
- ✅ Auto Cost Calculation
- ✅ Publish/Unpublish Menu
- ✅ Track Orders & Delivery
- ✅ Search & Filter

**Status:** ✅ Fully Implemented

---

### 🏭 Role 11: Production Manager (Produksi)

**Fitur Utama:** Production Panel - Stock Management

**Deskripsi:**
- Melihat semua menu dengan harga pokok dan jual
- Memperbarui stock menu (+/-)
- Mempublikasikan menu ke toko
- Quick counter untuk menu yang dipublikasikan

**Menu Sidebar:**
```
Business > Foods > Production Panel
```

**Features:**
- ✅ View All Menus with Cost
- ✅ Update Stock Quantity
- ✅ Publish/Unpublish Menu
- ✅ Published Menu Counter

**Status:** ✅ Fully Implemented

---

### 📢 Role 12: Public Relations (Hubungan Masyarakat)

**Fitur Utama:** Seminar Registration - Public & Staff View

**Deskripsi:**
- **Public:** Form pendaftaran seminar untuk publik
- **Staff:** Menampilkan semua pendaftaran yang masuk

**Menu Sidebar:**
```
Organization > SeminarPanel > Seminar Registrations
```

**Public Features:**
- ✅ Event Registration Form
- ✅ Collect Participant Data
- ✅ Success Notification

**Staff Features:**
- ✅ View All Registrations
- ✅ Export Ready Data

**Status:** ✅ Fully Implemented

---

### 👑 Role 99: Super Admin

**Akses:** Semua fitur di atas (Operating, Sales, Production, Seminar)

---

## Route Mapping

### Operating Panel Routes

| Method | Route | Name | Controller@Function | Middleware |
|--------|-------|------|-------------------|------------|
| GET | `/seeo/operating/panel` | `operating.panel` | OperatingPanelController@index | `role:3,99` |

---

### Sales Distribution Routes

| Method | Route | Name | Controller@Function | Middleware |
|--------|-------|------|-------------------|------------|
| GET | `/staff/sales-distribution` | `staff.sales-distribution.index` | MenuBoardController@index | `role:10,99` |
| POST | `/staff/sales-distribution/menu` | `staff.sales-distribution.menu.store` | MenuBoardController@storeMenu | `role:10,99` |
| POST | `/staff/sales-distribution/menu/{menu}/recipe` | `staff.sales-distribution.menu.recipe.store` | MenuBoardController@attachRecipe | `role:10,99` |
| POST | `/staff/sales-distribution/menu/{menu}/publish` | `staff.sales-distribution.menu.publish` | MenuBoardController@togglePublish | `role:10,99` |
| POST | `/staff/sales-distribution/order/{sale}/deliver` | `staff.sales-distribution.order.deliver` | MenuBoardController@toggleDelivery | `role:10,99` |

---

### Production Panel Routes

| Method | Route | Name | Controller@Function | Middleware |
|--------|-------|------|-------------------|------------|
| GET | `/staff/production/panel` | `staff.production.panel.index` | ProductionPanelController@index | `role:11,99` |
| POST | `/staff/production/panel/menu/{menu}/stock` | `staff.production.panel.stock.update` | ProductionPanelController@updateStock | `role:11,99` |
| POST | `/staff/production/panel/menu/{menu}/publish` | `staff.production.panel.publish` | ProductionPanelController@togglePublish | `role:11,99` |

---

### Seminar Registration Routes

| Method | Route | Name | Controller@Function | Middleware |
|--------|-------|------|-------------------|------------|
| GET | `/seminar/nasional/register` | `seminar.registration.create` | SeminarRegistrationController@create | None (Public) |
| POST | `/seminar/nasional/register` | `seminar.registration.store` | SeminarRegistrationController@store | None (Public) |
| GET | `/seeo/seminar/registrations` | `staff.seminar.registrations.index` | SeminarRegistrationController@index | `role:12,99` |

---

## Controller & Function Details

### MenuBoardController (Sales Distribution)
**Path:** `app/Http/Controllers/Staff/Business/MenuBoardController.php`

#### `index(Request $request): Response`
**Tujuan:** Load halaman sales distribution dengan semua data menu dan pembeli
```
Input:  stand_id (optional, dari query string)
Output: Inertia response dengan:
  - stands: Daftar semua stand
  - selectedStand: Stand yang dipilih
  - menus: Menu items dengan cost, recipe, publish status
  - buyers: Orders dengan status pengiriman
  - expenseItems: Biaya operasional
```

#### `storeMenu(Request $request)`
**Tujuan:** Membuat menu item baru
```
Validasi:
  - stand_id (required, exist di tabel stand)
  - name (required, max 255)
  - category (required, max 100)
  - price (required, integer >= 0)
  - stock (required, integer >= 0)
  - volume, volume_unit, mass, mass_unit (optional)
Action: Create MenuItem & redirect dengan notifikasi
```

#### `attachRecipe(Request $request, MenuItem $menu)`
**Tujuan:** Menambahkan komponen resep ke menu
```
Validasi:
  - components[].stand_expense_id (required, exist)
  - components[].quantity_used (required, numeric >= 0.01)
Action: Create/Update RecipeComponent dengan unit otomatis
```

#### `togglePublish(MenuItem $menu)`
**Tujuan:** Publikasikan/tarik menu dari toko
```
Action: Toggle is_published & set published_at timestamp
Return: Back dengan notifikasi
```

#### `toggleDelivery(StandSales $sale)`
**Tujuan:** Tandai order sudah diantar
```
Action: Set/unset delivered_at timestamp
Return: Back dengan notifikasi
```

#### `calculateMenuCost(MenuItem $menu): ?float`
**Tujuan:** Hitung total harga pokok menu dari resep
```
Logic:
  1. Loop setiap RecipeComponent
  2. Hitung unit price: total_price / qty
  3. Total cost: unit_price × quantity_used
  4. Return rounded(total, 2) atau null
```

---

### ProductionPanelController (Production)
**Path:** `app/Http/Controllers/Staff/Business/ProductionPanelController.php`

#### `index(Request $request): Response`
**Tujuan:** Load halaman production panel
```
Input:  stand_id (optional)
Output: Inertia response dengan:
  - stands: Daftar stand
  - selectedStand: Stand terpilih
  - menus: Menu dengan cost & publish status
```

#### `updateStock(Request $request, MenuItem $menu)`
**Tujuan:** Update stock menu (tambah/kurang)
```
Validasi:
  - amount (required, integer)
Action: menu->stock += amount; save()
Return: Back dengan notifikasi
```

#### `togglePublish(MenuItem $menu)`
**Tujuan:** Publikasikan/tarik menu
```
Action: Toggle is_published & set published_at
Return: Back dengan notifikasi
```

---

### OperatingPanelController (Operating)
**Path:** `app/Http/Controllers/Staff/SEEO/OperatingPanelController.php`

#### `index(): Response`
**Tujuan:** Load halaman operating panel dengan logbook
```
Output: Inertia response dengan:
  - logs: Logbook items dengan:
    - id, title, date_time, validated, image
    - employee: {id, name}
    - program: {id, name}
  - staffSummary: User list dengan logbook count
```

---

### SeminarRegistrationController (Public Relations)
**Path:** `app/Http/Controllers/PublicRelation/SeminarRegistrationController.php`

#### `create(): Response`
**Tujuan:** Tampilkan form pendaftaran seminar (public)
```
Output: Inertia response dengan:
  - eventName: 'Seminar Nasional SEEO'
```

#### `store(Request $request)`
**Tujuan:** Simpan pendaftaran seminar
```
Validasi:
  - event_name (required, max 255)
  - full_name (required, max 255)
  - email (nullable, email)
  - phone (nullable, max 50)
  - institution (nullable, max 255)
  - job_title (nullable, max 255)
  - notes (nullable)
Action: Create EventRegistration
Return: Redirect ke form dengan notifikasi sukses
```

#### `index(): Response`
**Tujuan:** Tampilkan semua pendaftaran (staff)
```
Output: Inertia response dengan:
  - registrations: Semua EventRegistration (latest first)
```

---

## Model & Database

### Models Used

#### 1. MenuItem
**File:** `app/Models/MenuItem.php`
**Tabel:** `foods_menu`
**Fillable:** `stand_id, name, category, price, stock, volume, volume_unit, mass, mass_unit, sale, is_published, published_at`
**Casts:** `['is_published' => 'boolean', 'published_at' => 'datetime']`
**Relations:**
- `stand()` - BelongsTo Stand
- `recipeComponents()` - HasMany RecipeComponent
- `sale()` - HasMany StandSales

#### 2. RecipeComponent
**File:** `app/Models/RecipeComponent.php`
**Tabel:** `recipe_components`
**Fields:** `menu_id, stand_expense_id, quantity_used, unit_used`
**Relations:**
- `menu()` - BelongsTo MenuItem
- `expense()` - BelongsTo StandExpense

#### 3. StandSales
**File:** `app/Models/StandSales.php`
**Tabel:** `sales`
**Fillable:** `stand_id, customer, order_type, send_option, transaction, delivered_at`
**Casts:** `['delivered_at' => 'datetime']`
**Relations:**
- `stand()` - BelongsTo Stand
- `order()` - HasMany FoodOrder

#### 4. StandExpense
**File:** `app/Models/StandExpense.php`
**Tabel:** `stand_expense_item`
**Fields:** `stand_id, name, qty, unit, total_price, operational_id`
**Relations:**
- `stand()` - BelongsTo Stand
- `recipeComponents()` - HasMany RecipeComponent

#### 5. Logbook
**File:** `app/Models/Logbook.php`
**Tabel:** `logbooks`
**Fields:** `employee_id, program_id, title, date_time, validated, image`
**Relations:**
- `employee()` - BelongsTo User
- `program()` - BelongsTo Program

#### 6. EventRegistration
**File:** `app/Models/EventRegistration.php`
**Tabel:** `event_registrations`
**Fillable:** `event_name, full_name, email, phone, institution, job_title, notes`
**HasFactory:** true

#### 7. User
**File:** `app/Models/User.php`
**New Relation:** `logbooks()` - HasMany Logbook

### Database Migrations

#### 2026_05_14_000005_add_publication_fields_to_foods_menu_table.php
```sql
ALTER TABLE foods_menu ADD COLUMN is_published BOOLEAN DEFAULT FALSE;
ALTER TABLE foods_menu ADD COLUMN published_at TIMESTAMP NULL;
```

#### 2026_05_14_000006_add_delivery_fields_to_sales_table.php
```sql
ALTER TABLE sales ADD COLUMN delivered_at TIMESTAMP NULL;
```

#### 2026_05_14_000007_create_event_registrations_table.php
```sql
CREATE TABLE event_registrations (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  event_name VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NULLABLE,
  phone VARCHAR(50) NULLABLE,
  institution VARCHAR(255) NULLABLE,
  job_title VARCHAR(255) NULLABLE,
  notes LONGTEXT NULLABLE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

---

## Vue Components

### 1. MenuBoard.vue
**Path:** `resources/js/Pages/Staff/Business/MenuBoard.vue`
**Purpose:** Sales Distribution Panel UI

**Features:**
- Stand selection dropdown
- Menu creation form
- Recipe component attachment
- Menu list with search/filter
- Buyer order list with delivery checklist
- Summary cards (published count, delivery stats)

**Key Refs:**
- `menuSearch` - Search menus by name/category
- `buyerSearch` - Search orders by customer/menu
- `deliveryFilter` - Filter by delivery status (all/pending/delivered)

**Key Computeds:**
- `filteredMenus` - Apply keyword filter
- `filteredBuyers` - Apply keyword + status filter
- `publishedMenuCount` - Count published menus
- `deliveredCount` - Count delivered orders
- `pendingDeliveryCount` - Count pending orders

---

### 2. ProductionPanel.vue
**Path:** `resources/js/Pages/Staff/Business/ProductionPanel.vue`
**Purpose:** Production Panel UI

**Features:**
- Stand selection dropdown
- Menu list with cost/price
- Stock update form (+/-)
- Publish/unpublish toggle
- Quick published menu counter

**Key Computeds:**
- `publishedMenuCount` - Count published menus

---

### 3. OperatingPanel.vue
**Path:** `resources/js/Pages/Staff/SEEO/OperatingPanel.vue`
**Purpose:** Operating Panel UI

**Features:**
- Logbook list with search/filter
- Staff summary with logbook count
- Validation toggle for each logbook
- Search by staff name/program/title
- Filter by validation status (all/pending/validated)

**Key Refs:**
- `logSearch` - Search query
- `validationFilter` - Filter status

**Key Computeds:**
- `filteredLogs` - Apply keyword + status filter
- `totalLogs` - Total logbook count
- `validatedLogs` - Count validated
- `pendingLogs` - Count pending

---

### 4. SeminarRegistrations.vue
**Path:** `resources/js/Pages/Staff/SEEO/SeminarRegistrations.vue`
**Purpose:** Seminar Registrations (Staff View)

**Features:**
- Display all registrations in table
- Show participant details
- Latest registrations first

---

### 5. SeminarRegister.vue
**Path:** `resources/js/Pages/Public/SeminarRegister.vue`
**Purpose:** Public Seminar Registration Form

**Features:**
- Event registration form
- Collect: name, email, phone, institution, job_title, notes
- Form validation
- Success notification
- Auto form reset

---

## Sidebar Navigation

### Updated File: StaffLayout.vue
**Path:** `resources/js/Layouts/StaffLayout.vue`

**Navigation Structure:**
```
Organization
├── ... (existing items)
└── SeminarPanel (role 12)
    └── Seminar Registrations

Business
├── Insight
├── Foods
│   ├── Stand
│   ├── Sales Distribution (role 10)
│   ├── Operating Panel (role 3)
│   └── Production Panel (role 11)
└── Goods
    └── Product (Coming Soon)
```

**Role-based Visibility:**
```javascript
// Role 3: Operating Panel
if (userRole === 3 || userRole === 99) {
  list.Business.Foods.push({ 
    route: route("operating.panel"),
    title: "Operating Panel" 
  });
}

// Role 10: Sales Distribution
if (userRole === 10 || userRole === 99) {
  list.Business.Foods.push({
    route: route("staff.sales-distribution.index"),
    title: "Sales Distribution"
  });
}

// Role 11: Production Panel
if (userRole === 11 || userRole === 99) {
  list.Business.Foods.push({
    route: route("staff.production.panel.index"),
    title: "Production Panel"
  });
}

// Role 12: Seminar
if (userRole === 12 || userRole === 99) {
  list.Organization.SeminarPanel = {
    route: route("staff.seminar.registrations.index"),
    title: "Seminar Registrations"
  };
}
```

**Active State Detection:**
```javascript
// active_group: Detect which menu group is active
if (current.includes('MenuBoard') || 
    current.includes('OperatingPanel') || 
    current.includes('ProductionPanel') ||
    current.includes('Foods')) 
  return 'Foods';
```

---

## Testing Credentials

Semua test user memiliki password: **`password`**

| Email | Role | Role ID | Akses |
|-------|------|---------|-------|
| operating@test.com | Operational Officer | 3 | Operating Panel |
| sales@test.com | Sales Distribution | 10 | Sales Distribution |
| production@test.com | Production Manager | 11 | Production Panel |
| relations@test.com | Public Relations | 12 | Seminar Registrations |
| admin@test.com | Super Admin | 99 | All Panels |

**Create Test Users:**
```bash
php artisan db:seed --class=TestUserSeeder
```

---

## File Structure

```
app/
├── Http/Controllers/
│   ├── Staff/Business/
│   │   ├── MenuBoardController.php (Role 10)
│   │   └── ProductionPanelController.php (Role 11)
│   └── Staff/SEEO/
│       └── OperatingPanelController.php (Role 3)
└── PublicRelation/
    └── SeminarRegistrationController.php (Role 12)

app/Models/
├── MenuItem.php
├── RecipeComponent.php
├── StandSales.php
├── StandExpense.php
├── Logbook.php
├── EventRegistration.php
└── User.php

resources/js/Pages/
├── Staff/Business/
│   ├── MenuBoard.vue
│   └── ProductionPanel.vue
├── Staff/SEEO/
│   ├── OperatingPanel.vue
│   └── SeminarRegistrations.vue
└── Public/
    └── SeminarRegister.vue

resources/js/Layouts/
└── StaffLayout.vue (Updated for new navigation)

database/migrations/
├── 2026_05_14_000005_add_publication_fields_to_foods_menu_table.php
├── 2026_05_14_000006_add_delivery_fields_to_sales_table.php
└── 2026_05_14_000007_create_event_registrations_table.php

database/seeders/
└── TestUserSeeder.php

routes/
└── web.php (Updated with new routes)
```

---

## Status Implementasi

✅ **Completed:**
- MenuBoardController dengan semua CRUD
- ProductionPanelController dengan stock management
- OperatingPanelController dengan logbook monitoring
- SeminarRegistrationController (public + staff)
- Semua Vue components dengan search/filter
- Database migrations (applied)
- Sidebar navigation dengan role-based visibility
- Route protection dengan middleware
- Test users untuk semua role

---

## Catatan Penting

1. **Role-based Access:**
   - Setiap fitur dilindungi middleware `role:ID,99`
   - Super Admin (role 99) dapat akses semua fitur

2. **Active State Detection:**
   - Sidebar menu menggunakan `route.current()` untuk mendeteksi halaman aktif
   - Active group detection menggunakan component name matching

3. **Cost Calculation:**
   - Menu cost = sum(ingredient unit_price × quantity_used)
   - Unit price = total_price / qty dari stand_expense

4. **Notifications:**
   - Semua action mengembalikan notifikasi via session
   - Error handling menggunakan Laravel validation

5. **Search & Filter:**
   - MenuBoard: Search menu & buyer, filter delivery status
   - OperatingPanel: Search logbook, filter validation status
   - Real-time dengan computed properties Vue 3

---

**Last Updated:** May 14, 2026
**Version:** 5.0
**Status:** Production Ready ✅
