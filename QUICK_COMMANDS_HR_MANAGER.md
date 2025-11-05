# 🚀 ONE-LINER COMMANDS - HR MANAGER SETUP FOR PRODUCTION

**CAUTION**: Copy-paste command di production. Pastikan sudah backup database!

---

## ⚡ QUICK SETUP (PALING CEPAT)

### **OPTION 1: Assign User ID 3 as HR Manager**
```bash
php artisan tinker <<< "DB::table('users')->where('id', 3)->update(['roles_id' => 5]); DB::table('users')->where('id', 3)->first();" && php artisan cache:clear
```

**Replace `3` dengan user ID yang ingin Anda assign**

---

### **OPTION 2: Assign User ID 14 as HR Manager**
```bash
php artisan tinker <<< "DB::table('users')->where('id', 14)->update(['roles_id' => 5]); DB::table('users')->where('id', 14)->first();" && php artisan cache:clear
```

---

### **OPTION 3: Create New HR Manager User**
```bash
php artisan tinker <<< "DB::table('users')->insertGetId(['name' => 'HR Manager', 'email' => 'hr-manager@seeonow.local', 'roles_id' => 5, 'password' => bcrypt('default123'), 'email_verified_at' => now(), 'created_at' => now(), 'updated_at' => now()]); echo 'HR Manager created';" && php artisan cache:clear
```

---

## 🔍 VERIFICATION COMMANDS

### **Check who is HR Manager**
```bash
php artisan tinker <<< "DB::table('users')->where('roles_id', 5)->get(['id', 'name', 'email']);"
```

### **Check specific user role**
```bash
php artisan tinker <<< "DB::table('users')->where('id', 3)->first(['id', 'name', 'email', 'roles_id']);"
```

### **List all users with role info**
```bash
php artisan tinker <<< "DB::table('users')->get(['id', 'name', 'email', 'roles_id'])->each(function(\$u) { echo \"ID: \$u->id, Name: \$u->name, Role: \$u->roles_id\\n\"; });"
```

---

## 🔄 REVERT COMMANDS

### **Revert User ID 3 back to Role 1**
```bash
php artisan tinker <<< "DB::table('users')->where('id', 3)->update(['roles_id' => 1]); echo 'Reverted to role 1';"
```

### **Remove HR Manager Status**
```bash
php artisan tinker <<< "DB::table('users')->where('roles_id', 5)->update(['roles_id' => 3]); echo 'Reverted to role 3';"
```

---

## 💡 TIPS

1. **Ganti User ID sesuai kebutuhan**
   - Default examples: 3, 14
   - Check user ID dengan verification commands

2. **Always clear cache after update**
   ```bash
   php artisan cache:clear
   php artisan config:clear
   ```

3. **Test after update**
   - Login dengan user yang di-update
   - Buka: `/staff/internship/certificates/manage`
   - Harus bisa akses tanpa 403

4. **Jika ada error**
   - Check database connection
   - Check user exists
   - Check database accessible

---

## 📋 STEP-BY-STEP PROCEDURE

### **Step 1: SSH ke Server Production**
```bash
ssh your_username@your_server_ip
```

### **Step 2: Navigate ke Project**
```bash
cd /path/to/seeonow/blaterian_seeo
```

### **Step 3: Backup Database (IMPORTANT!)**
```bash
# Via mysqldump
mysqldump -u root -p seeo > seeo_backup_$(date +%Y%m%d_%H%M%S).sql
# Enter password when prompted
```

### **Step 4: Run Command**
Choose ONE of the options above and run it.

Example for Option 1:
```bash
php artisan tinker <<< "DB::table('users')->where('id', 3)->update(['roles_id' => 5]); DB::table('users')->where('id', 3)->first();" && php artisan cache:clear
```

### **Step 5: Verify**
```bash
php artisan tinker <<< "DB::table('users')->where('id', 3)->first(['id', 'name', 'email', 'roles_id']);"
```

Expected output should show:
```
roles_id = 5
```

### **Step 6: Clear Browser Cache**
- Press: `Ctrl + Shift + Delete`
- Or use incognito/private window

### **Step 7: Test Login**
- Login dengan user yang di-update
- Akses: `/staff/internship/certificates/manage`
- Test upload/download certificate

---

## ❌ TROUBLESHOOTING

### **Problem: Command not found**
```bash
# Make sure you're in the right directory
pwd  # should output: /path/to/seeonow/blaterian_seeo

# Check if artisan exists
ls -la artisan
```

### **Problem: Database error**
```bash
# Check database connection
php artisan tinker
# If fails, check .env file:
# DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD

# Verify connection:
php artisan db
```

### **Problem: User not found**
```bash
# List all users to find correct ID
php artisan tinker <<< "DB::table('users')->pluck('id', 'name');"

# Choose the correct ID and run update again
```

### **Problem: Still getting 403**
```bash
# 1. Verify role was updated
php artisan tinker <<< "DB::table('users')->where('id', 3)->first();"

# 2. Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# 3. Clear browser cache: Ctrl+Shift+Delete

# 4. Try incognito window
```

---

## ✅ COMPLETE EXAMPLE

Full example dari start sampai end:

```bash
# 1. SSH to server
ssh user@192.168.1.1

# 2. Go to project
cd /home/user/laragon/www/seeonow/blaterian_seeo

# 3. Backup database
mysqldump -u root -p seeo > backup_$(date +%Y%m%d_%H%M%S).sql

# 4. Assign user 3 as HR Manager
php artisan tinker <<< "DB::table('users')->where('id', 3)->update(['roles_id' => 5]); echo 'Updated';" && php artisan cache:clear

# 5. Verify
php artisan tinker <<< "DB::table('users')->where('id', 3)->first(['id', 'name', 'email', 'roles_id']);"

# Expected: roles_id = 5 ✅

# 6. Exit SSH
exit
```

---

## 📚 REFERENCE

| Role ID | Role Name |
|---------|-----------|
| 1 | CEO |
| 2 | Financial Staff |
| 3 | Operational Staff |
| 4 | Co-CEO |
| 5 | **HR Manager** ← We want this |
| 6 | PIC Internship |
| 7 | Intern |

---

## ⚡ MINIMUM TIME NEEDED

- Backup: 2 min
- SSH connect: 1 min
- Run command: 1 min
- Verify: 1 min
- Cache clear: 1 min
- Test: 5 min
- **TOTAL**: ~11 minutes

---

**Status**: 🟢 PRODUCTION READY  
**Risk**: LOW (No migrations, data only)  
**Rollback**: Simple (just update role back)

