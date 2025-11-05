# 📋 Quick Troubleshooting: HR Manager Certificate Access

## ✅ Fixed Issue
**Problem**: HR Manager tidak bisa buka `/staff/internship/certificates/manage`  
**Status**: 🟢 FIXED

---

## 🔧 If Still Not Working

### Step 1: Clear Cache
```bash
cd d:\laragon\www\seeonow\blaterian_seeo
php artisan cache:clear
php artisan config:clear
```

### Step 2: Hard Refresh Browser
- Press: `Ctrl + Shift + Delete` (clear cache)
- Or: `Ctrl + F5` (hard refresh)
- Close and reopen browser

### Step 3: Check User Role
```bash
# Run this command to check HR Manager role
php artisan tinker
>>> DB::table('users')->where('roles_id', 5)->get();
```

Expected output should show user with `roles_id = 5`

### Step 4: Verify File Updated
Check if file has been updated:
```
File: app/Policies/InternshipCertificatePolicy.php
Line: ~32
Should have: if ($user->roles_id === 5) { return true; }
```

### Step 5: Test with Browser Console
1. Open browser Developer Tools (F12)
2. Go to Network tab
3. Try accessing `/staff/internship/certificates/manage`
4. Check response status
   - ✅ 200 = Working
   - ❌ 403 = Not fixed yet
   - ❌ 404 = Wrong URL

---

## 🆘 If Still Blocked (403)

### Check Database
```bash
php artisan tinker

# Check HR Manager exists
DB::table('users')->where('roles_id', 5)->count();
# Should return: 1 or more

# Check Internship Program
DB::table('program')->where('name', 'like', '%internship%')->first();
# Should show program data
```

### Check Policy File
```bash
# Verify file updated
grep -n "roles_id === 5" app/Policies/InternshipCertificatePolicy.php
# Should show: if ($user->roles_id === 5) { return true; }
```

### Check Routes
```bash
# Verify route exists
php artisan route:list | grep certificate
# Should show multiple certificate routes
```

---

## 📞 Common Issues & Solutions

### Issue 1: "403 Forbidden"
```
Cause: HR Manager (role_id=5) not found or authorization still failing
Fix: 
  1. Verify Policy file updated ✓
  2. Clear cache: php artisan cache:clear
  3. Refresh browser: Ctrl+F5
```

### Issue 2: "404 Page Not Found"
```
Cause: Route not found or typo in URL
Fix:
  1. Check URL: /staff/internship/certificates/manage
  2. Route requires auth middleware
  3. Must be logged in
```

### Issue 3: "Database Connection Error"
```
Cause: Database not accessible or migration not run
Fix:
  1. Check .env file database config
  2. Run migrations: php artisan migrate
  3. Check database exists
```

### Issue 4: "500 Internal Server Error"
```
Cause: PHP error in Policy or Controller
Fix:
  1. Check Laravel logs: storage/logs/
  2. Run: php artisan cache:clear
  3. Verify all files saved correctly
```

---

## ✅ Verify Everything Works

### Test Checklist
- [ ] HR Manager can access `/staff/internship/certificates/manage`
- [ ] Page loads without errors
- [ ] Can see form to upload certificates
- [ ] Can select internship application
- [ ] Can upload PDF file
- [ ] Can view uploaded certificates
- [ ] Can download certificates
- [ ] Can edit certificates
- [ ] Can delete certificates
- [ ] No error messages shown

### Test Blocked Access (Security)
- [ ] Try accessing as Intern (role 7) → Should see 403
- [ ] Try accessing without login → Should see login page
- [ ] Try accessing with other staff (role 3, 2) → Should see 403

---

## 📊 Authorization Matrix (After Fix)

| Role | Can Access | Status |
|------|-----------|--------|
| **5** (HR Manager) | ✅ YES | **FIXED** |
| **6** (PIC Internship) | ✅ YES* | *if is PIC of program |
| **4** (Co-CEO) | ✅ YES* | *if is PIC of program |
| **7** (Intern) | ❌ NO | Security ✅ |
| **Others** | ❌ NO | Security ✅ |

---

## 🔍 Debug Commands

### Check who can manage
```bash
php artisan tinker

# Import classes
use App\Models\User;
use App\Policies\InternshipCertificatePolicy;

# Get HR Manager
$hr = User::where('roles_id', 5)->first();

# Test authorization
$policy = new InternshipCertificatePolicy();
$policy->manage($hr);  # Should return true (boolean)
```

### Check program PIC
```bash
use App\Models\Program;

$program = Program::where('name', 'like', '%internship%')->first();
# Shows: id, name, pic_id, etc
```

### Check routes
```bash
php artisan route:list --name=certificate
# Shows all certificate routes
```

---

## 📝 Notes

- Fix is in: `app/Policies/InternshipCertificatePolicy.php`
- No database changes needed
- No migration needed
- All existing functionality preserved
- Security maintained
- Backward compatible

---

## 🎯 Quick Summary

| What | Answer |
|------|--------|
| **Fixed?** | ✅ YES |
| **HR Manager can access?** | ✅ YES |
| **Need cache clear?** | ✅ YES (recommended) |
| **Database changes?** | ❌ NO |
| **Breaking changes?** | ❌ NO |
| **Security affected?** | ❌ NO |

---

**Still having issues?**  
1. Clear cache: `php artisan cache:clear`
2. Hard refresh: `Ctrl + Shift + Delete`
3. Check file: `app/Policies/InternshipCertificatePolicy.php`
4. Check logs: `storage/logs/laravel.log`

