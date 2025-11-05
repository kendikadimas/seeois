# 🚀 PRODUCTION DEPLOYMENT GUIDE - HR Manager Setup

**Status**: Ready for Production  
**Risk Level**: LOW (No migrations, no schema changes)  
**Database Impact**: Data insert/update only  

---

## 📋 Pilihan Deployment

Anda memiliki **3 pilihan** untuk menambahkan HR Manager di production:

### **PILIHAN 1: Quick Tinker (FASTEST) ⚡**
Tidak perlu file seeder, cukup run command langsung.

**Waktu**: ~2 menit  
**Risk**: MINIMAL  
**Rekomendasi**: Untuk user yang sudah ada

```bash
# 1. SSH ke server production
# ssh user@yourserver.com

# 2. Navigate ke folder project
cd /path/to/seeonow/blaterian_seeo

# 3. Buka tinker
php artisan tinker

# 4. Paste command ini:
DB::table('users')->where('id', 3)->update(['roles_id' => 5]);

# 5. Verify - copy dan paste di tinker:
DB::table('users')->where('id', 3)->first();

# Output harus menunjukkan: roles_id = 5

# 6. Exit tinker (ketik: exit)
exit()
```

**Ganti `3` dengan User ID yang ingin Anda jadikan HR Manager**

---

### **PILIHAN 2: Seed dengan Assign Existing User (RECOMMENDED) ✅**
Aman dan terstruktur, assign user yang sudah ada.

**Waktu**: ~3 menit  
**Risk**: LOW  
**Rekomendasi**: Untuk production yang formal

**Langkah-langkah**:

1. **Copy seeder ke production** (via SCP/SFTP):
```bash
# File: database/seeders/AssignUserToHRManagerSeeder.php
# Gunakan FTP/SFTP untuk upload ke server
```

2. **Edit file di server** (ganti user ID):
```bash
# Buka file dengan editor
nano database/seeders/AssignUserToHRManagerSeeder.php

# Cari baris ini:
$userIdToAssign = 3;  // ← CHANGE THIS

# Ganti 3 dengan user ID yang ingin Anda assign
# Contoh: $userIdToAssign = 14;

# Save: Ctrl+X, Y, Enter
```

3. **Jalankan seeder**:
```bash
php artisan db:seed --class=AssignUserToHRManagerSeeder
```

**Output**: ✅ User berhasil assign ke role HR Manager (5)

---

### **PILIHAN 3: Buat User HR Manager Baru (SAFEST) 🛡️**
Buat user baru khusus HR Manager tanpa mengubah existing users.

**Waktu**: ~3 menit  
**Risk**: MINIMAL  
**Rekomendasi**: Jika ingin user dedicated untuk HR

**Langkah-langkah**:

1. **Copy seeder ke production**:
```bash
# File: database/seeders/CreateHRManagerUserSeeder.php
# Upload via FTP/SFTP
```

2. **Jalankan seeder**:
```bash
php artisan db:seed --class=CreateHRManagerUserSeeder
```

**Output**:
```
✅ New HR Manager created with ID: XX
📧 Email: hr-manager@seeonow.local
🔐 Default Password: default123
```

3. **Login dan ubah password**:
- Login dengan email: `hr-manager@seeonow.local`
- Password: `default123`
- Ubah password di profile page

---

## 🎯 QUICK START (Recommendation)

Jika Anda ingin yang tercepat dan teraman, ikuti langkah ini:

### **STEP 1: Tentukan User untuk HR Manager**
```bash
# Lihat daftar users
# Gunakan Pilihan 1 (Tinker) untuk query:

php artisan tinker
DB::table('users')->get(['id', 'name', 'email', 'roles_id']);
```

Catat user ID yang ingin Anda jadikan HR Manager.

### **STEP 2: Assign dengan Tinker (PALING CEPAT)**
```bash
php artisan tinker

# Replace 3 dengan user ID pilihan Anda
DB::table('users')->where('id', 3)->update(['roles_id' => 5]);

# Verify
DB::table('users')->where('id', 3)->first();

exit()
```

### **STEP 3: Clear Cache**
```bash
php artisan cache:clear
php artisan config:clear
```

### **STEP 4: Test**
- Login dengan user HR Manager
- Buka: `/staff/internship/certificates/manage`
- Seharusnya bisa akses tanpa error 403

---

## 📊 COMPARISON TABLE

| Method | Speed | Risk | Complexity | Best For |
|--------|-------|------|------------|----------|
| **Tinker** | ⚡⚡⚡ | Minimal | Simple | Quick fix |
| **Assign Seeder** | ⚡⚡ | Low | Medium | Production |
| **Create Seeder** | ⚡⚡ | Minimal | Medium | New user |

---

## ⚠️ IMPORTANT NOTES

### Jangan Lupa!
- ✅ **BACKUP DATABASE** sebelum update
- ✅ **Clear cache** setelah update: `php artisan cache:clear`
- ✅ **Restart services** jika perlu: `php artisan queue:restart`
- ✅ **Test di browser** (clear cache: Ctrl+Shift+Delete)

### Pastikan:
- ✅ Database user sudah ada sebelum assign
- ✅ Role ID 5 adalah untuk HR Manager (verified)
- ✅ User bisa login dengan credentials baru
- ✅ Dapat akses page `/staff/internship/certificates/manage`

---

## 🔄 ROLLBACK (If Something Goes Wrong)

Jika terjadi kesalahan, revert role_id ke previous value:

```bash
php artisan tinker

# Revert user ID 3 kembali ke role 1 (misalnya)
DB::table('users')->where('id', 3)->update(['roles_id' => 1]);

exit()
```

---

## ✅ VERIFICATION CHECKLIST

Setelah setup, lakukan verification:

- [ ] User bisa login
- [ ] User bisa akses `/staff/internship/certificates/manage`
- [ ] Tidak ada error 403
- [ ] Bisa upload certificate
- [ ] Bisa download certificate
- [ ] Bisa edit certificate
- [ ] Bisa delete certificate
- [ ] Other users tetap blocked

---

## 📞 TROUBLESHOOTING

### Problem: Still getting 403 Forbidden
**Solution**:
```bash
# 1. Clear cache
php artisan cache:clear
php artisan config:clear

# 2. Verify role in tinker
php artisan tinker
DB::table('users')->where('id', 3)->first();
# Should show: roles_id = 5

# 3. Check browser cache
# Clear: Ctrl+Shift+Delete
```

### Problem: User tidak bisa login
**Solution**:
```bash
# Pastikan user email dan password benar
php artisan tinker
$user = DB::table('users')->where('email', 'user@email.com')->first();
# Check: password harus di-hash dengan bcrypt
```

### Problem: Role tidak berubah
**Solution**:
```bash
# Verify update berhasil
php artisan tinker

# Run update again
DB::table('users')->where('id', 3)->update(['roles_id' => 5]);

# Verify
DB::table('users')->where('id', 3)->first();

exit()
```

---

## 🎯 SUMMARY

| Step | Command | Time |
|------|---------|------|
| 1. Backup | Via hosting panel | 2 min |
| 2. SSH | ssh user@server | 1 min |
| 3. Assign Role | `php artisan tinker` + command | 2 min |
| 4. Verify | Query user | 1 min |
| 5. Clear Cache | `php artisan cache:clear` | 1 min |
| 6. Test | Browser login + test | 5 min |
| **TOTAL** | | **~12 min** |

---

**Status**: 🟢 READY FOR PRODUCTION  
**Confidence**: 99%  
**Support**: Check TROUBLESHOOTING section if issues

