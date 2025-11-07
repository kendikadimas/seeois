# 🔍 DEBUGGING HR MANAGER 403 ERROR

User ID 14 (HR_Sellyjuan Alya) sudah punya `roles_id: 5` tapi masih dapat 403.

## 🔧 DEBUG STEPS

### **STEP 1: Check User Data**
```bash
php artisan tinker
```

```php
$user = DB::table('users')->where('id', 14)->first();
echo "User ID: {$user->id}\n";
echo "Role ID: {$user->roles_id}\n";
echo "Name: {$user->name}\n";
echo "Deleted At: {$user->deleted_at}\n";
exit;
```

**Expected:**
- Role ID = 5
- Deleted At = NULL

---

### **STEP 2: Check If Middleware Blocks**

Dari `routes/web.php` line ~152-159:
```php
Route::middleware('auth')->prefix('staff')->group(function(){
    Route::get('/internship/certificates/manage', [InternshipCertificateController::class, 'manageIndex'])->name('certificate.manage');
    ...
});
```

**Issue:** Route hanya punya `['auth']` middleware, tidak ada `['staff']`!

Cek di terminal apakah route sudah di-update:

```bash
php artisan route:list | grep certificate.manage
```

**Expected output:**
```
GET|HEAD /staff/internship/certificates/manage
```

---

### **STEP 3: Check Policy Authorization**

```bash
php artisan tinker
```

```php
use App\Models\User;
use App\Models\InternshipCertificate;

$user = User::find(14);
echo "User: {$user->name}\n";
echo "Role: {$user->roles_id}\n";

// Test policy directly
$policy = app('Illuminate\Auth\Access\AuthorizationException');

// Check manage permission
$can = $user->can('manage', InternshipCertificate::class);
echo "Can Manage: " . ($can ? 'YES' : 'NO') . "\n";

// Check internship program
$programs = DB::table('programs')
    ->where('name', 'like', '%internship%')
    ->orWhere('name', 'like', '%Magang%')
    ->get();
echo "Internship Programs:\n";
foreach ($programs as $p) {
    echo "  - ID {$p->id}: {$p->name} (PIC: {$p->pic_id})\n";
}

exit;
```

**Expected:**
- Can Manage = YES
- Find Internship Program

---

### **STEP 4: Check Session & Auth**

```bash
php artisan tinker
```

```php
use Illuminate\Support\Facades\Auth;

// Simulate login as user 14
Auth::loginUsingId(14);
$current = Auth::user();

echo "Current User: {$current->name}\n";
echo "Current Role: {$current->roles_id}\n";

// Test policy with authenticated user
$can = $current->can('manage', \App\Models\InternshipCertificate::class);
echo "Can Manage (Authenticated): " . ($can ? 'YES' : 'NO') . "\n";

exit;
```

---

### **STEP 5: Check Controller Logic**

```bash
php artisan tinker
```

```php
use App\Http\Controllers\InternshipCertificateController;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

$user = User::find(14);
Auth::loginUsingId(14);

echo "Testing manageIndex()...\n";
echo "User: {$user->name}\n";
echo "Role: {$user->roles_id}\n";

// Manually test authorization
try {
    $request = request();
    $controller = new InternshipCertificateController();
    $controller->authorize('manage', \App\Models\InternshipCertificate::class);
    echo "✅ Authorization PASSED\n";
} catch (\Exception $e) {
    echo "❌ Authorization FAILED: {$e->getMessage()}\n";
}

exit;
```

---

### **STEP 6: Check Cache & Config**

```bash
php artisan tinker
```

```php
// Check if cache is actually cleared
echo "Cache Driver: " . config('cache.default') . "\n";
echo "Cache Prefix: " . config('cache.prefix') . "\n";

// Try to get cached value
$cached = cache('user_roles');
echo "Cached User Roles: " . ($cached ? 'EXISTS (DELETE ME!)' : 'NOT FOUND (GOOD)') . "\n";

// Clear everything
cache()->flush();
config()->flush();
echo "✅ Cache & Config Flushed\n";

exit;
```

---

### **STEP 7: Check Browser Network Tab**

1. Open Browser DevTools (F12)
2. Go to Network tab
3. Try to access `/staff/internship/certificates/manage`
4. Find the request that returns 403
5. Click on it → Response tab
6. Look for:
   - Error message
   - Policy denial reason
   - Stack trace

---

### **STEP 8: Check Laravel Logs**

```bash
tail -n 100 storage/logs/laravel.log
```

Look for:
- `403 Forbidden`
- `AuthorizationException`
- Policy-related errors

Or search for recent errors:

```bash
grep -i "authorization\|403\|policy" storage/logs/laravel.log | tail -20
```

---

## 🎯 QUICK DIAGNOSTIC COMMAND

Jalankan semua sekaligus:

```bash
php artisan tinker
```

```php
$user = User::find(14);
echo "=== USER DEBUG ===\n";
echo "ID: {$user->id}\n";
echo "Name: {$user->name}\n";
echo "Role: {$user->roles_id}\n";
echo "Deleted: {$user->deleted_at}\n\n";

echo "=== AUTHORIZATION DEBUG ===\n";
try {
    Auth::loginUsingId(14);
    $can = Auth::user()->can('manage', \App\Models\InternshipCertificate::class);
    echo "Can Manage (Direct): " . ($can ? '✅ YES' : '❌ NO') . "\n";
} catch (\Exception $e) {
    echo "Error: {$e->getMessage()}\n";
}

echo "\n=== INTERNSHIP PROGRAM DEBUG ===\n";
$programs = DB::table('programs')->where('name', 'like', '%internship%')->orWhere('name', 'like', '%Magang%')->get();
if ($programs->count() > 0) {
    foreach ($programs as $p) {
        echo "Program: {$p->name} (ID: {$p->id}, PIC: {$p->pic_id})\n";
    }
} else {
    echo "❌ NO INTERNSHIP PROGRAM FOUND\n";
}

echo "\n=== POLICY CLASS DEBUG ===\n";
$policyMethod = method_exists(\App\Policies\InternshipCertificatePolicy::class, 'manage');
echo "Policy has manage(): " . ($policyMethod ? '✅ YES' : '❌ NO') . "\n";

exit;
```

---

## 🚨 POSSIBLE ISSUES & FIXES

### **Issue 1: No Internship Program**
**Symptom:** "NO INTERNSHIP PROGRAM FOUND"

**Fix:**
```php
// Create one
DB::table('programs')->insert([
    'name' => 'Internship',
    'pic_id' => 14,
    'created_at' => now(),
    'updated_at' => now(),
]);
```

---

### **Issue 2: User has deleted_at set**
**Symptom:** `Deleted: NOT NULL`

**Fix:**
```php
DB::table('users')->where('id', 14)->update(['deleted_at' => null]);
```

---

### **Issue 3: Policy file not loaded**
**Symptom:** `Can Manage: NO` tapi roles_id = 5

**Fix:** Check AuthServiceProvider:
```bash
cat app/Providers/AuthServiceProvider.php
```

Should have:
```php
Gate::policy(InternshipCertificate::class, InternshipCertificatePolicy::class);
```

---

### **Issue 4: Route middleware missing 'staff'**
**Symptom:** Error says "not staff member"

**Check routes/web.php line 152:**
```php
Route::middleware('auth')->prefix('staff')->group(function(){
    // Change to:
    Route::middleware(['auth', 'verified', 'staff'])->prefix('staff')->group(function(){
```

Then clear route cache:
```bash
php artisan route:clear
```

---

## 📋 CHECKLIST

- [ ] User ID 14 exists in database
- [ ] Role ID = 5 (HR Manager)
- [ ] Deleted at = NULL
- [ ] Internship program exists
- [ ] Policy class loaded correctly
- [ ] Cache cleared
- [ ] Config cleared
- [ ] Route cached cleared
- [ ] Browser cache cleared (Ctrl+Shift+Delete)
- [ ] Logged out and back in

---

## 💡 NEXT STEPS

1. Run **QUICK DIAGNOSTIC COMMAND** above
2. Share output here
3. I'll identify the exact issue

