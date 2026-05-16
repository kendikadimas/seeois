# Dokumentasi Routing dan Role Mapping - Fitur Baru

## 1. Sales Distribution Panel (Role: 10 - Sales/Distribution)

### Route Information
- **Path:** `/staff/sales-distribution`
- **Route Name:** `staff.sales-distribution.index`
- **Controller:** `App\Http\Controllers\Staff\Business\MenuBoardController`
- **Component:** `Staff/Business/MenuBoard.vue`
- **Middleware:** `role:10,99`

### Sub Routes
- `POST /staff/sales-distribution/menu` → `staff.sales-distribution.menu.store` (Create menu)
- `POST /staff/sales-distribution/menu/{menu}/recipe` → `staff.sales-distribution.menu.recipe.store` (Add recipe)
- `POST /staff/sales-distribution/menu/{menu}/publish` → `staff.sales-distribution.menu.publish` (Toggle publish)
- `POST /staff/sales-distribution/order/{sale}/deliver` → `staff.sales-distribution.order.deliver` (Mark delivery)

### Navigation
- **Section:** Business
- **Group:** Foods
- **Active Detection:** `route.current("staff.sales-distribution")`
- **Sidebar:** Visible for role 10 (Sales/Distribution) and Super Admin (99)

### Features
- ✅ Create new menu items
- ✅ Calculate production cost from ingredients
- ✅ Suggest selling price (cost × 1.3)
- ✅ Publish/unpublish menus to shop
- ✅ Track buyer orders
- ✅ Mark delivery status
- ✅ Search menu and buyers
- ✅ Filter by delivery status

---

## 2. Production Panel (Role: 11 - Production/Manufacturing)

### Route Information
- **Path:** `/staff/production/panel`
- **Route Name:** `staff.production.panel.index`
- **Controller:** `App\Http\Controllers\Staff\Business\ProductionPanelController`
- **Component:** `Staff/Business/ProductionPanel.vue`
- **Middleware:** `role:11,99`

### Sub Routes
- `POST /staff/production/panel/menu/{menu}/stock` → `staff.production.panel.stock.update` (Update stock)
- `POST /staff/production/panel/menu/{menu}/publish` → `staff.production.panel.publish` (Toggle publish)

### Navigation
- **Section:** Business
- **Group:** Foods
- **Active Detection:** `route.current("staff.production.panel")`
- **Sidebar:** Visible for role 11 (Production) and Super Admin (99)

### Features
- ✅ View all menus with cost and price
- ✅ Update stock quantities
- ✅ Publish/unpublish menus
- ✅ Quick published menu counter

---

## 3. Operating Panel (Role: 3 - Operational Officer)

### Route Information
- **Path:** `/seeo/operating/panel`
- **Route Name:** `operating.panel`
- **Controller:** `App\Http\Controllers\Staff\SEEO\OperatingPanelController`
- **Component:** `Staff/SEEO/OperatingPanel.vue`
- **Middleware:** `role:3,99`

### Navigation
- **Section:** Business
- **Group:** Foods
- **Active Detection:** `route.current("operating.panel")`
- **Sidebar:** Visible for role 3 (Operational) and Super Admin (99)

### Features
- ✅ Monitor all logbooks
- ✅ View staff activity summary
- ✅ Validate/invalidate logbooks
- ✅ Search by staff, program, or title
- ✅ Filter by validation status
- ✅ Quick summary counters (Total, Valid, Pending)

---

## 4. Seminar Registration (Role: 12 - Public Relations)

### Public Registration Route
- **Path:** `/seminar/nasional/register`
- **Route Name:** `seminar.registration.create`
- **Controller:** `App\Http\Controllers\PublicRelation\SeminarRegistrationController`
- **Component:** `Public/SeminarRegister.vue`
- **Middleware:** None (Public)
- **Method:** GET

### Staff Management Route
- **Path:** `/seeo/seminar/registrations`
- **Route Name:** `staff.seminar.registrations.index`
- **Controller:** `App\Http\Controllers\PublicRelation\SeminarRegistrationController`
- **Component:** `Staff/SEEO/SeminarRegistrations.vue`
- **Middleware:** `role:12,99`
- **Method:** GET

### Registration Submission
- **Path:** `/seminar/nasional/register`
- **Route Name:** `seminar.registration.store`
- **Method:** POST

### Navigation (Staff)
- **Section:** Organization
- **Menu:** SeminarPanel
- **Active Detection:** `route.current("staff.seminar.registrations")`
- **Sidebar:** Visible for role 12 (Public Relations) and Super Admin (99)

### Features
- ✅ Public registration form for events
- ✅ Collect participant data (name, email, phone, institution, position)
- ✅ Staff view all registrations
- ✅ Registration success notification
- ✅ Form reset after successful submission

---

## Database Tables

### New Tables
1. **event_registrations**
   - id (PK)
   - event_name
   - full_name (required)
   - email (nullable)
   - phone (nullable)
   - institution (nullable)
   - job_title (nullable)
   - notes (nullable)
   - created_at, updated_at

### Modified Tables
1. **foods_menu**
   - Added: `is_published` (boolean, default: false)
   - Added: `published_at` (timestamp, nullable)

2. **sales**
   - Added: `delivered_at` (timestamp, nullable)

---

## Role Mapping Summary

| Role ID | Role Name | Accessible Panels |
|---------|-----------|------------------|
| 3 | Operational Officer | Operating Panel |
| 10 | Sales/Distribution | Sales Distribution Panel |
| 11 | Production | Production Panel |
| 12 | Public Relations | Seminar Registrations |
| 99 | Super Admin | All Panels |

---

## Testing Checklist

- [ ] Role 3: Can access Operating Panel, see logbooks, search & filter, validate
- [ ] Role 10: Can access Sales Distribution, create menu, add recipe, publish, track delivery
- [ ] Role 11: Can access Production Panel, update stock, publish menus
- [ ] Role 12: Can access Seminar Registrations, view submissions
- [ ] Role 99: Can access all panels
- [ ] Public: Can access seminar registration form
- [ ] Navigation: All menu items display correctly based on role
- [ ] Active state: Correct menu highlighting when on each panel
- [ ] Search & Filter: Working correctly on Sales & Operating panels
- [ ] Database: Migration successful, no errors

---

## Migration Files

1. `2026_05_14_000005_add_publication_fields_to_foods_menu_table.php` - Add publication fields
2. `2026_05_14_000006_add_delivery_fields_to_sales_table.php` - Add delivery tracking
3. `2026_05_14_000007_create_event_registrations_table.php` - Event registrations table

All migrations have been applied successfully.
