# 🎓 Internship Certificate System - Quick Start

## ✨ What Was Built

A complete role-based certificate management system for SEEO that allows:
- **Interns** to view and download their issued certificates
- **HR/PIC Staff** to upload and manage PDF certificates

---

## 🚦 Quick Access

### For Interns (Role 7)
**URL**: `http://localhost/internship/certificates`
- View all your published certificates
- Download PDFs (tracked automatically)

### For HR/PIC Staff (Roles 5 & 6)
**URL**: `http://localhost/staff/internship/certificates/manage`
- Upload new certificates (PDF, max 20MB)
- Download, edit, or delete existing certificates
- Manage via intuitive dashboard

---

## 📦 What's Installed

### Database
- ✅ Table: `internship_certificates` (migrated)
- ✅ Soft deletes enabled
- ✅ Tracks download counts

### Backend
- ✅ Controller with 6 methods (index, download, manageIndex, store, update, destroy)
- ✅ Policy with authorization checks
- ✅ Model with relationships

### Frontend
- ✅ Intern view page (list & download)
- ✅ HR/PIC management page (upload & CRUD)
- ✅ InternLayout & responsive design

### Storage
- ✅ Public storage symlink created
- ✅ Certificates stored at: `storage/app/public/internship/certificates/`

---

## 🔒 Security Features

| Feature | Status |
|---------|--------|
| Role-based access | ✅ Middleware: role:5,6 and role:7 |
| Policy authorization | ✅ Can method checks |
| File validation | ✅ PDF only, 20MB max |
| CSRF protection | ✅ Inertia form handling |
| Soft deletes | ✅ Preserve audit trail |

---

## 📊 Database Schema

```sql
internship_certificates
├── id (Primary Key)
├── internship_application_id (Foreign Key)
├── generated_for_user_id (Foreign Key, Nullable)
├── file (string - storage path)
├── status (enum: draft, published, revoked)
├── issued_by (Foreign Key - User ID)
├── issued_at (timestamp)
├── download_token (string - random)
├── download_count (integer)
├── created_at, updated_at
└── deleted_at (soft delete)
```

---

## 🛠️ File Locations

```
Backend:
├── app/Http/Controllers/InternshipCertificateController.php
├── app/Models/InternshipCertificate.php
├── app/Policies/InternshipCertificatePolicy.php
├── app/Providers/AuthServiceProvider.php
├── routes/web.php (updated)
└── bootstrap/providers.php (updated)

Frontend:
├── resources/js/Layouts/InternLayout.vue
├── resources/js/Pages/Internship/Certificates/Index.vue
└── resources/js/Pages/Staff/Internship/CertificatesManage.vue

Storage:
└── storage/app/public/internship/certificates/
```

---

## 🚀 Next Steps

### Test the System
1. **Login as Intern** (role 7)
   - Visit `/internship/certificates`
   - Should see empty list or existing certificates

2. **Login as HR/PIC** (role 5 or 6)
   - Visit `/staff/internship/certificates/manage`
   - Upload a test PDF file
   - Verify it appears in the list

3. **Test Download**
   - Download certificate
   - Verify download count increments
   - Check file in `storage/app/public/internship/certificates/`

### Common Tasks
```bash
# Clear caches if routes don't work
php artisan route:cache
php artisan config:cache

# Check routes
php artisan route:list | grep certificate

# Test policy
php artisan tinker
>>> auth()->user()->can('manage', InternshipCertificate::class)

# Reset storage
php artisan storage:link
```

---

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| Routes not found | Run `php artisan route:cache` |
| Can't upload files | Check `storage/app/public/internship/certificates/` exists |
| 403 Forbidden | Verify user role is 5, 6 (HR/PIC) or 7 (Intern) |
| Files not downloading | Check `php.ini` upload_max_filesize >= 20M |
| Page shows error | Check `storage/logs/laravel.log` |

---

## 📋 Routes Summary

```
Interns Only (Role 7):
  GET  /internship/certificates                    → certificate.index
  GET  /internship/certificate/download/{id}       → certificate.download

HR/PIC Only (Roles 5,6):
  GET  /staff/internship/certificates/manage       → certificate.manage
  POST /staff/internship/certificate/store         → certificate.store
  POST /staff/internship/certificate/update/{id}   → certificate.update
  DELETE /staff/internship/certificate/delete/{id} → certificate.destroy
```

---

## 🎯 Features

✅ **Upload PDFs** - HR/PIC staff can upload certificates  
✅ **Download PDFs** - Interns and staff can download with tracking  
✅ **File Validation** - Only PDFs up to 20MB  
✅ **Authorization** - Role-based access control  
✅ **Audit Trail** - Soft deletes, download counts, issued_at timestamps  
✅ **Responsive UI** - Works on mobile and desktop  
✅ **Error Handling** - Validation errors, file not found, authorization fails  

---

**Everything is ready to use!** 🎉

For detailed documentation, see `INTERNSHIP_CERTIFICATES_GUIDE.md`
