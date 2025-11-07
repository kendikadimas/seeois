# Debug 403 Forbidden - Internship Certificates Management

## Masalah
User dengan role_id = 5 (HR Manager) mendapat **403 Forbidden** saat akses `/staff/internship/certificates/manage`

## Langkah Debugging di Production

### 1. Pull Latest Code
```bash
ssh -p 2223 seej2596@seeoftunsoed.com
cd ~/sis/seeois
git pull origin main
```

### 2. Clear Cache
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan optimize:clear
```

### 3. Test Access
Akses URL: `https://seeoftunsoed.com/staff/internship/certificates/manage`

### 4. Check Laravel Log
```bash
# Real-time log monitoring
tail -f storage/logs/laravel.log

# Or check recent logs
tail -100 storage/logs/laravel.log | grep -i "InternshipCertificatePolicy"
```

### 5. Analisis Log Output
Cari log dengan prefix `InternshipCertificatePolicy`:

**Log yang Diharapkan (Jika HR Manager):**
```
InternshipCertificatePolicy::manage called
- user_id: 14
- user_name: [nama user]
- roles_id: 5
- roles_id_type: integer atau string

InternshipCertificatePolicy: HR Manager authorized
```

**Log yang Diharapkan (Jika Bukan HR Manager):**
```
InternshipCertificatePolicy: User not authorized
- user_id: 14
- roles_id: [nilai roles_id]
- is_pic: false
```

## Kemungkinan Masalah & Solusi

### Problem 1: roles_id adalah string "5" bukan integer 5
**Gejala:** Log menunjukkan `roles_id_type: string`

**Penyebab:** Database menyimpan sebagai VARCHAR atau CHAR, bukan INT

**Solusi Sementara:** Sudah menggunakan `==` (loose comparison) di Policy

**Solusi Permanen:**
```bash
# Cek tipe kolom di database
php artisan tinker
User::find(14)->roles_id;
gettype(User::find(14)->roles_id);
```

Jika hasilnya string, perlu migration untuk ubah tipe kolom:
```sql
ALTER TABLE users MODIFY roles_id INT NULL;
```

### Problem 2: Policy Tidak Terdaftar
**Gejala:** Tidak ada log dari InternshipCertificatePolicy sama sekali

**Solusi:**
```bash
# Cek apakah Policy terdaftar
php artisan route:list | grep certificate

# Clear policy cache
php artisan optimize:clear
composer dump-autoload
```

### Problem 3: Route Tidak Ada Middleware Auth
**Gejala:** User tidak login tapi bisa akses (redirect ke login)

**Cek Route:**
```bash
php artisan route:list --path=staff/internship
```

Expected output harus menunjukkan middleware: `web,auth,verified,staff`

Jika tidak ada, berarti route tidak terlindungi dengan benar.

### Problem 4: User Tidak Memiliki roles_id = 5
**Gejala:** Log menunjukkan `roles_id: NULL` atau nilai lain

**Cek Database:**
```bash
php artisan tinker
$user = User::find(14);
echo "User: {$user->name}\n";
echo "roles_id: {$user->roles_id}\n";
echo "Type: " . gettype($user->roles_id) . "\n";
```

**Fix:**
```sql
UPDATE users SET roles_id = 5 WHERE id = 14;
```

## Quick Fix Commands

### Jika roles_id adalah String
Tambahkan casting di Model User:

File: `app/Models/User.php`
```php
protected $casts = [
    'roles_id' => 'integer',
    // ... other casts
];
```

Then:
```bash
php artisan config:clear
php artisan cache:clear
```

### Jika Policy Tidak Jalan
```bash
# Re-register policies
php artisan optimize:clear
composer dump-autoload --optimize
php artisan config:cache
php artisan route:cache
```

## Verifikasi Final

### Test Manual di Tinker:
```bash
php artisan tinker
```

```php
$user = User::find(14);
$policy = new App\Policies\InternshipCertificatePolicy();
$result = $policy->manage($user);
echo "Can manage: " . ($result ? 'YES' : 'NO') . "\n";
```

Expected output: `Can manage: YES`

## Report Back

Setelah cek log, kirim informasi berikut:
1. Output dari `tail -100 storage/logs/laravel.log | grep -i "InternshipCertificatePolicy"`
2. Output dari tinker: `User::find(14)->roles_id` dan `gettype(User::find(14)->roles_id)`
3. Screenshot error 403 (jika ada detail error message)

## Remove Logging (Setelah Debug Selesai)

Setelah masalah teridentifikasi dan diperbaiki, hapus log debugging:

File: `app/Policies/InternshipCertificatePolicy.php`
- Hapus semua `\Log::info()` dan `\Log::warning()`
- Commit dengan message: `chore: remove debug logging from InternshipCertificatePolicy`
