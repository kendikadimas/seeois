# 📌 PRODUCTION UPDATE - QUICK REFERENCE CARD

**Print This Page | Bookmark This | Copy Commands Below**

---

## 🚀 UPDATE PRODUCTION DALAM 4 LANGKAH

### **STEP 1️⃣ BACKUP**
```bash
mysqldump -u root -p seeo > backup_$(date +%Y%m%d).sql
```

### **STEP 2️⃣ PULL CODE**
```bash
cd /path/to/seeonow/blaterian_seeo
git pull origin main
```

### **STEP 3️⃣ ADD HR MANAGER** (Pick ONE)

**Option A: Assign User 3**
```bash
php artisan tinker
DB::table('users')->where('id', 3)->update(['roles_id' => 5]);
exit
```

**Option B: Create New**
```bash
php artisan tinker
DB::table('users')->insertGetId(['name' => 'HR Manager', 'email' => 'hr-manager@seeonow.local', 'roles_id' => 5, 'password' => bcrypt('default123'), 'email_verified_at' => now(), 'created_at' => now(), 'updated_at' => now()]);
exit
```

### **STEP 4️⃣ CLEAR & TEST**
```bash
php artisan cache:clear
# Clear browser cache: Ctrl+Shift+Delete
# Test: /staff/internship/certificates/manage
```

---

## 📋 VERIFY

```bash
php artisan tinker
DB::table('users')->where('roles_id', 5)->first(['id', 'name', 'email']);
exit
```

Should show: `roles_id = 5` ✅

---

## 🆘 PROBLEM?

| Problem | Solution |
|---------|----------|
| 403 Forbidden | Clear cache: `php artisan cache:clear` |
| User not found | Change user ID in command |
| Login fails | Verify user exists & password correct |
| Need to revert | `git checkout app/Policies/InternshipCertificatePolicy.php` |

---

## 🔗 FULL DOCS

- `URUTAN_UPDATE_PRODUCTION_SINGKAT.md` - Urutan lengkap
- `QUICK_COMMANDS_HR_MANAGER.md` - More commands
- `TROUBLESHOOTING.md` - More help
- `PRODUCTION_UPDATE_COMPLETE_GUIDE.md` - All details

---

**Time**: ~15 min | **Risk**: LOW | **Migrate**: NO

