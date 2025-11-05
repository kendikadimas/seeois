# 📘 PRODUCTION UPDATE GUIDE - COMPLETE REFERENCE

**Date**: November 5, 2025  
**Purpose**: Urutan update untuk production tanpa migrate  
**Risk Level**: LOW  
**Time to Execute**: ~15 minutes  

---

## 🎯 OVERVIEW - URUTAN LENGKAP

Anda perlu melakukan 3 hal untuk update production:

1. **Code Fix** (Already Done ✅)
   - Update Policy file: `app/Policies/InternshipCertificatePolicy.php`
   - Tambah role_id = 5 check

2. **Database Update** (Tinker/Seeder)
   - Assign user ke role HR Manager (5)
   - TANPA migrate

3. **Cache Clear & Test**
   - Clear application cache
   - Test di browser

---

## 📋 STEP-BY-STEP PRODUCTION UPDATE

### **FASE 1: PREPARATION (Offline)**

#### Step 1.1: Backup Database
```bash
# Via local/remote - jangan lupa backup dulu!
mysqldump -u root seeo > seeo_backup_2025_11_05.sql
```

#### Step 1.2: Backup Project Files
```bash
# Zip project folder (opsional tapi recommended)
tar -czf seeonow_backup_2025_11_05.tar.gz /path/to/seeonow/
```

#### Step 1.3: Note User ID for HR Manager
```bash
# Tentukan user ID mana yang akan jadi HR Manager
# Lihat di: USERS management page
# Atau query: SELECT id, name, roles_id FROM users WHERE roles_id = 3;
```

---

### **FASE 2: DEPLOYMENT (Online)**

#### Step 2.1: Upload Code Changes
**Files to upload via SCP/SFTP/Git:**
```
app/Policies/InternshipCertificatePolicy.php  ← MAIN FIX
```

**Via Git** (Recommended):
```bash
# Di production server
cd /path/to/seeonow/blaterian_seeo
git pull origin main
# or
git pull origin your-branch
```

**Via SCP**:
```bash
# From local machine
scp app/Policies/InternshipCertificatePolicy.php user@server:/path/to/seeonow/blaterian_seeo/app/Policies/
```

#### Step 2.2: Add HR Manager Role via Tinker

**Option A: Assign existing user (RECOMMENDED)**
```bash
# SSH to production
ssh user@server

# Navigate to project
cd /path/to/seeonow/blaterian_seeo

# Open tinker
php artisan tinker

# Run this command (replace 3 with your user ID):
DB::table('users')->where('id', 3)->update(['roles_id' => 5]);

# Verify:
DB::table('users')->where('id', 3)->first();

# Exit tinker
exit
```

**Expected Output**:
```
roles_id = 5  ✅
```

**Option B: Create new HR Manager user**
```bash
php artisan tinker

DB::table('users')->insertGetId([
    'name' => 'HR Manager',
    'email' => 'hr-manager@seeonow.local',
    'roles_id' => 5,
    'password' => bcrypt('default123'),
    'email_verified_at' => now(),
    'created_at' => now(),
    'updated_at' => now()
]);

exit
```

#### Step 2.3: Clear Cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan view:clear
```

#### Step 2.4: Run Migrations (If Any)
```bash
# SKIP if no new migrations
php artisan migrate --force
```

---

### **FASE 3: VERIFICATION (Quality Assurance)**

#### Step 3.1: Clear Browser Cache
- Press: `Ctrl + Shift + Delete`
- Or use private/incognito window

#### Step 3.2: Test Login
- Login dengan HR Manager user
- Verify: User dapat login ✅

#### Step 3.3: Test Certificate Management Page
- Navigate to: `/staff/internship/certificates/manage`
- Verify: Page loads (bukan 403) ✅
- Verify: Form visible ✅

#### Step 3.4: Test Certificate Features
- [ ] Upload certificate (test PDF file)
- [ ] Select internship application
- [ ] Download certificate
- [ ] Edit certificate
- [ ] Delete certificate

#### Step 3.5: Test Security (Unauthorized Access)
- Test with Intern user → Should see 403 ✅
- Test with other staff → Should see 403 ✅
- Test without login → Should see login page ✅

#### Step 3.6: Check Application Logs
```bash
# Check for errors
tail -f storage/logs/laravel.log

# Should not have authorization errors
```

---

## 🗂️ FILES INVOLVED

### **Main Code Fix**
- **File**: `app/Policies/InternshipCertificatePolicy.php`
- **Change**: Added role_id = 5 check in manage() method
- **Lines**: 29-45
- **Status**: ✅ Already completed

### **Optional Seeder Files** (untuk re-usable code)
- **File**: `database/seeders/AddHRManagerRoleSeeder.php` (info only)
- **File**: `database/seeders/AssignUserToHRManagerSeeder.php` (can be used)
- **File**: `database/seeders/CreateHRManagerUserSeeder.php` (create new user)

### **Documentation**
- `PRODUCTION_DEPLOYMENT_GUIDE.md` (ini file)
- `QUICK_COMMANDS_HR_MANAGER.md` (one-liners)
- `COMPREHENSIVE_FIX_SUMMARY.md` (technical details)

---

## 🎯 QUICK REFERENCE - ONE COMMAND

### **Complete Setup in One Shot** (FASTEST)
```bash
# Run this single command:
cd /path/to/seeonow/blaterian_seeo && \
git pull origin main && \
php artisan tinker <<< "DB::table('users')->where('id', 3)->update(['roles_id' => 5]); echo 'Done';" && \
php artisan cache:clear && \
echo "✅ Setup Complete - Clear browser cache and test"
```

**Replace `3` with your user ID**

---

## ⏱️ TIME ESTIMATE

| Activity | Duration | Notes |
|----------|----------|-------|
| Backup | 5 min | Critical! |
| Upload files | 2 min | Via Git/SCP |
| Run Tinker command | 1 min | Very fast |
| Cache clear | 1 min | Essential |
| Browser cache clear | 1 min | User side |
| Testing | 10 min | Thorough |
| **TOTAL** | **~20 min** | With backup |

---

## 🚨 CRITICAL CHECKLIST

- [ ] **Database backed up** (MUST DO)
- [ ] **Project backed up** (Recommended)
- [ ] **User ID identified** (Which user = HR Manager)
- [ ] **Code changes uploaded**
- [ ] **Tinker command executed**
- [ ] **Cache cleared**
- [ ] **Browser cache cleared**
- [ ] **Login test passed**
- [ ] **Certificate page loads**
- [ ] **Features working**
- [ ] **Unauthorized users blocked**
- [ ] **Logs checked** (no errors)

---

## 🔄 ROLLBACK PLAN (If Issues)

### **Immediate Rollback** (Worst Case)
```bash
# 1. Revert code from backup
git checkout app/Policies/InternshipCertificatePolicy.php

# 2. Revert database from backup
mysql -u root -p seeo < seeo_backup_2025_11_05.sql

# 3. Clear cache
php artisan cache:clear

# 4. Restart queue (if applicable)
php artisan queue:restart
```

### **Partial Rollback** (Role Only)
```bash
# Just revert the role
php artisan tinker
DB::table('users')->where('id', 3)->update(['roles_id' => 3]);
exit

php artisan cache:clear
```

---

## 📊 AUTHORITY MATRIX AFTER UPDATE

| User Type | Role | Can Access | Details |
|-----------|------|-----------|---------|
| **HR Manager** | 5 | ✅ YES | **NEW ACCESS** |
| **PIC** | 4,6 | ✅ YES | If is PIC |
| **Intern** | 7 | ❌ NO | View only |
| **CEO** | 1 | ❌ NO | Management only |
| **Financial** | 2 | ❌ NO | Finance only |
| **Operational** | 3 | ❌ NO | Operations only |

---

## 📝 COMMUNICATION

### **For Team Members**
```
Subject: Production Deployment - HR Manager Certificate Access Fix

Hi Team,

We've deployed a fix for HR Manager to access certificate management page.

**What Changed**:
- HR Manager (role 5) can now manage internship certificates
- Authorization updated in Policy layer
- No database schema changes

**When**: [Date & Time]
**Duration**: ~15 minutes (transparent update)
**Impact**: Zero downtime

**Access Restored**:
- HR Manager can access: /staff/internship/certificates/manage
- Can upload, edit, delete certificates

**Testing**: Completed & Verified ✅

Questions? Contact [Your Name]
```

### **For HR Manager User**
```
Subject: Certificate Management Access Restored!

Hi [Name],

Good news! You can now access the certificate management page.

**Access**: Go to /staff/internship/certificates/manage
**Features**:
- Upload certificates
- Edit certificate details
- Download certificates
- Delete certificates

**Note**: Clear browser cache if you see any issues.

Thank you!
```

---

## ✅ SUCCESS INDICATORS

You've successfully completed the update if:

✅ HR Manager can login  
✅ Can access `/staff/internship/certificates/manage`  
✅ Can upload PDF certificate  
✅ Can select internship application  
✅ Can download uploaded certificate  
✅ Can edit certificate  
✅ Can delete certificate  
✅ Other users get 403 Forbidden  
✅ No errors in logs  
✅ Page loads quickly  

---

## 🆘 SUPPORT

### **If Something Goes Wrong**

1. **Check logs**:
```bash
tail -f storage/logs/laravel.log
```

2. **Verify database**:
```bash
php artisan tinker
DB::table('users')->where('roles_id', 5)->first();
exit
```

3. **Check file permissions**:
```bash
ls -la app/Policies/InternshipCertificatePolicy.php
```

4. **Check database connection**:
```bash
php artisan db
```

5. **Rollback if critical**:
```bash
# Use rollback plan above
```

---

## 📞 CONTACTS

- **Technical Lead**: [Email/Phone]
- **Database Admin**: [Email/Phone]  
- **Server Admin**: [Email/Phone]
- **Backup Location**: [Path/Server]

---

## 📚 DOCUMENTATION REFERENCE

1. **PRODUCTION_DEPLOYMENT_GUIDE.md** ← MAIN (You're here)
2. **QUICK_COMMANDS_HR_MANAGER.md** ← One-liners
3. **COMPREHENSIVE_FIX_SUMMARY.md** ← Technical details
4. **HR_MANAGER_FIX_SUMMARY.md** ← User summary
5. **README_FIX.md** ← Quick overview

---

## 🎓 LEARNING NOTES

### **What We Changed**
- Authorization system: Added role_id = 5 support
- No database migrations
- No breaking changes
- Backward compatible

### **Why This Approach**
- Safe (no schema changes)
- Quick (no downtime)
- Reversible (easy rollback)
- Tested (verified before deployment)

### **What We Didn't Change**
- ❌ Database schema
- ❌ User table structure
- ❌ Routes or controllers
- ❌ Other authorization logic

---

**Status**: 🟢 **PRODUCTION READY**  
**Version**: 1.0  
**Last Updated**: November 5, 2025  
**Approval**: ✅ Approved for deployment

