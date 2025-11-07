# 🔧 FIX USER ID 14 - HR MANAGER ACCESS

## Masalah
User ID 14 mendapat 403 saat akses `/staff/internship/certificates/manage`

## Solusi

### **STEP 1: Cek Current Role**
Jalankan di production server:

```bash
php artisan tinker
```

Kemudian copy-paste:

```php
DB::table('users')->where('id', 14)->first();
```

**Expected output:**
Lihat field `roles_id` berapa nilainya. Seharusnya bukan 5.

---

### **STEP 2: Update Role ke HR Manager (5)**

Masih di tinker, jalankan:

```php
DB::table('users')->where('id', 14)->update(['roles_id' => 5]);
```

**Expected output:**
```
=> 1
```

Artinya: 1 user ter-update.

---

### **STEP 3: Verifikasi Update**

Masih di tinker, jalankan:

```php
DB::table('users')->where('id', 14)->first();
```

**Expected output:**
- `id`: 14
- `roles_id`: **5** ✅
- `name`: Sesuai nama user

---

### **STEP 4: Exit Tinker**

```php
exit
```

---

### **STEP 5: Clear Cache**

```bash
php artisan cache:clear
php artisan config:clear
```

---

### **STEP 6: Logout & Login Ulang**

1. Logout dari account
2. Login ulang
3. Akses: `https://seeoftunsoed.com/staff/internship/certificates/manage`

---

## ✅ Expected Result

- Page berhasil load (tidak ada 403)
- Bisa lihat list sertifikat
- Bisa upload/edit/delete sertifikat

---

## 🔍 Troubleshooting

**Masih 403 setelah semua?**

Cek:
1. Sudah clear cache? ✅
2. Sudah logout/login ulang? ✅
3. Cek di browser dev tools → Network → Response 403, cek error message

---

## 📋 Quick Commands (Copy-Paste)

**Verifikasi:**
```
php artisan tinker
DB::table('users')->where('id', 14)->first();
exit
```

**Update:**
```
php artisan tinker
DB::table('users')->where('id', 14)->update(['roles_id' => 5]);
exit
php artisan cache:clear
```

