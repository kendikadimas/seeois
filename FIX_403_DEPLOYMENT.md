# Fix 403 Forbidden - Internship Certificates Management

## Masalah yang Diperbaiki
User dengan `roles_id = 5` (HR Manager) mendapat **403 Forbidden** saat akses `/staff/internship/certificates/manage`

## Penyebab
1. **Type Mismatch**: `roles_id` di database disimpan sebagai string, tapi Policy mengecek sebagai integer
2. **Route Tidak Terlindungi**: Route `/staff/internship/certificates/manage` TIDAK berada dalam middleware group 'staff'

## Solusi yang Diterapkan

### 1. Cast roles_id ke Integer
File: `app/Models/User.php`
```php
protected function casts(): array
{
    return [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'roles_id' => 'integer',  // ✅ Force roles_id to always be integer
    ];
}
```

### 2. Pindahkan Routes ke dalam Staff Middleware Group
File: `routes/web.php`
- Route certificates management sekarang berada di DALAM closing bracket `Route::middleware(['auth', 'verified', 'staff'])->group()`
- Memastikan hanya staff yang bisa akses

### 3. Added Debug Logging
File: `app/Policies/InternshipCertificatePolicy.php`
- Menambahkan logging untuk debugging (bisa dihapus nanti)

## Deployment ke Production

### 1. SSH ke Server
```bash
ssh -p 2223 seej2596@seeoftunsoed.com
cd ~/sis/seeois
```

### 2. Pull Latest Changes
```bash
git pull origin main
```

Expected output:
```
Updating 99a7627b..047af47a
Fast-forward
 app/Models/User.php                          | 1 +
 app/Policies/InternshipCertificatePolicy.php | 1 +
 2 files changed, 2 insertions(+)
```

### 3. Clear ALL Cache
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear
composer dump-autoload --optimize
```

### 4. Verify Routes
```bash
php artisan route:list --path=staff/internship
```

Expected output harus menunjukkan middleware: `web,auth,verified,staff`

### 5. Test dengan Tinker (Optional)
```bash
php artisan tinker
```

```php
// Test 1: Cek type roles_id
$user = User::find(14);
echo "roles_id: {$user->roles_id}\n";
echo "Type: " . gettype($user->roles_id) . "\n";
// Expected: Type: integer

// Test 2: Test Policy
$policy = new App\Policies\InternshipCertificatePolicy();
$result = $policy->manage($user);
echo "Can manage: " . ($result ? 'YES' : 'NO') . "\n";
// Expected: Can manage: YES
```

### 6. Test Access
Akses URL: `https://seeoftunsoed.com/staff/internship/certificates/manage`

**Expected Result:** ✅ Halaman certificates management terbuka tanpa error

## Verifikasi User ID 14

### Cek roles_id di Database
```bash
php artisan tinker
```

```php
$user = User::find(14);
echo "Name: {$user->name}\n";
echo "Email: {$user->email}\n";
echo "roles_id: {$user->roles_id}\n";
echo "Role Name: {$user->roles->name}\n";
```

Expected output:
```
Name: [Nama HR Manager]
Email: [email]
roles_id: 5
Role Name: HR Manager
```

### Jika roles_id BUKAN 5
```sql
-- Di MySQL/phpMyAdmin atau melalui tinker
UPDATE users SET roles_id = 5 WHERE id = 14;
```

## Check Laravel Logs (Setelah Test)

```bash
tail -100 storage/logs/laravel.log | grep -i "InternshipCertificatePolicy"
```

Expected log untuk HR Manager:
```
[timestamp] local.INFO: InternshipCertificatePolicy::manage called
{"user_id":14,"user_name":"[nama]","roles_id":5,"roles_id_type":"integer"}

[timestamp] local.INFO: InternshipCertificatePolicy: HR Manager authorized
```

## Remove Debug Logging (Setelah Confirmed Working)

Setelah confirmed working, hapus semua `\Log::info()` dan `\Log::warning()` dari:
- `app/Policies/InternshipCertificatePolicy.php`

```bash
# Edit file, hapus log statements, lalu:
git add app/Policies/InternshipCertificatePolicy.php
git commit -m "chore: remove debug logging from InternshipCertificatePolicy"
git push
```

## Troubleshooting

### Jika Masih 403:

1. **Cek User Login Benar**
```bash
php artisan tinker
Auth::id(); // Pastikan mengembalikan 14 atau user yang benar
```

2. **Cek Middleware Applied**
```bash
php artisan route:list --path=staff/internship --columns=uri,name,action,middleware
```

3. **Cek roles_id Type**
```bash
php artisan tinker
$user = User::find(14);
var_dump($user->roles_id);  // Harus: int(5)
```

4. **Clear Browser Cache**
- Ctrl + Shift + Delete
- Clear cookies untuk seeoftunsoed.com
- Test dengan Incognito mode

5. **Cek Table roles**
```bash
php artisan tinker
DB::table('roles')->where('id', 5)->first();
```
Pastikan role ID 5 ada dan nama nya "HR Manager"

## Success Criteria

✅ User dengan `roles_id = 5` bisa akses `/staff/internship/certificates/manage`
✅ User dengan `roles_id != 5` dan bukan PIC Internship mendapat 403
✅ Log menunjukkan "HR Manager authorized"
✅ Type `roles_id` adalah integer bukan string

## Rollback (Jika Ada Masalah)

```bash
cd ~/sis/seeois
git log --oneline -5
git reset --hard 99a7627b  # Commit sebelum fix
php artisan optimize:clear
```
