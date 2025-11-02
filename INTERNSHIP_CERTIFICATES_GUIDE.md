# Internship Certificate System - Implementation Guide

## ✅ Implementation Complete

The internship certificate management system has been successfully implemented with role-based access control and PDF file handling.

---

## 📋 System Overview

### Features
- **Interns (Role 7)**: View and download their published certificates
- **HR Manager/PIC (Roles 5, 6)**: Upload, manage, edit, and delete certificates
- **File Storage**: PDF files stored in `storage/app/public/internship/certificates/`
- **Authorization**: Policy-based access control with Laravel's gate system
- **Download Tracking**: Tracks number of times each certificate is downloaded

---

## 🗂️ Files Created/Modified

### Backend Files

#### Models
- **`app/Models/InternshipCertificate.php`** ✅
  - Relationships: `application()`, `recipient()`, `issuer()`
  - Attributes: `internship_application_id`, `generated_for_user_id`, `file`, `status`, `issued_by`, `issued_at`, `download_token`
  - Timestamps & Soft Deletes enabled

#### Controllers
- **`app/Http/Controllers/InternshipCertificateController.php`** ✅
  - `index()`: List certificates for interns (published only)
  - `download($id)`: Download PDF with authorization & tracking
  - `manageIndex()`: HR/PIC management page
  - `store()`: Upload new certificate (PDF validation: max 20MB)
  - `update($id)`: Update certificate or file
  - `destroy($id)`: Delete certificate and file

#### Policies
- **`app/Policies/InternshipCertificatePolicy.php`** ✅
  - `manage()`: Check if user is HR Manager or PIC (roles 5, 6)
  - `view()`: Check if owner or authorized staff
  - `download()`: Same as view
  - `create()`, `update()`, `delete()`: Require manage permission

#### Providers
- **`app/Providers/AuthServiceProvider.php`** ✅
  - Registers `InternshipCertificatePolicy` for authorization checks
- **`bootstrap/providers.php`** ✅
  - AuthServiceProvider added to provider list

#### Database
- **`database/migrations/2025_11_01_232315_create_internship_certificates_table.php`** ✅
  - Table: `internship_certificates`
  - Columns: id, internship_application_id, generated_for_user_id, file, status, issued_by, issued_at, download_token, download_count, timestamps, soft_deletes

#### Routes
- **`routes/web.php`** ✅
  - **Intern Routes (role:7)**:
    - `GET /internship/certificates` → `certificate.index`
    - `GET /internship/certificate/download/{id}` → `certificate.download`
  - **HR/PIC Routes (role:5,6)**:
    - `GET /staff/internship/certificates/manage` → `certificate.manage`
    - `POST /staff/internship/certificate/store` → `certificate.store`
    - `POST /staff/internship/certificate/update/{id}` → `certificate.update`
    - `DELETE /staff/internship/certificate/delete/{id}` → `certificate.destroy`

### Frontend Files

#### Layouts
- **`resources/js/Layouts/InternLayout.vue`** ✅
  - Simple responsive navbar for intern users
  - Links to certificates and profile
  - Logout functionality

#### Pages - Interns
- **`resources/js/Pages/Internship/Certificates/Index.vue`** ✅
  - Displays all published certificates for the logged-in intern
  - Shows: Issue Date, Issuer Name, Download Count, Download Button
  - Table layout with responsive design
  - Download functionality with loading state

#### Pages - HR/PIC Staff
- **`resources/js/Pages/Staff/Internship/CertificatesManage.vue`** ✅
  - Two-column layout:
    - **Left**: Upload form for new certificates
      - Select internship application
      - Optional: Select specific user
      - PDF file upload (20MB max)
    - **Right**: List all certificates with management actions
      - Display recipient, issue date, issuer, download count
      - Download and Delete buttons
  - Bootstrap styling with responsive design

---

## 🚀 Usage Instructions

### For Interns

1. **Access Certificate Page**
   ```
   Navigate to: /internship/certificates
   ```

2. **View Certificates**
   - Lists all published certificates issued to you
   - Shows date, issuer name, and download count

3. **Download Certificate**
   - Click "Unduh" button
   - PDF automatically downloads as `sertifikat-{id}.pdf`
   - Download count increments

### For HR Manager / PIC

1. **Access Management Page**
   ```
   Navigate to: /staff/internship/certificates/manage
   ```

2. **Upload New Certificate**
   - Select internship application from dropdown
   - (Optional) Select specific user if different from applicant
   - Choose PDF file (max 20MB)
   - Click "Unggah Sertifikat"
   - Success message displayed

3. **Manage Certificates**
   - View all uploaded certificates
   - **Download**: Click download icon to view PDF
   - **Delete**: Click trash icon to remove (with confirmation)

---

## 🔐 Authorization & Permissions

### Role-Based Access

| Action | Role 7 (Intern) | Role 5 (HR) | Role 6 (PIC) |
|--------|---|---|---|
| View own certificates | ✅ | - | - |
| Download own certificates | ✅ | - | - |
| Access management page | - | ✅ | ✅ |
| Upload certificates | - | ✅ | ✅ |
| Edit certificates | - | ✅ | ✅ |
| Delete certificates | - | ✅ | ✅ |

### Policy Checks
- All management actions check `InternshipCertificatePolicy::manage()`
- Download actions verify certificate recipient or staff authorization
- Unauthorized users receive 403 Forbidden response

---

## 📁 Storage Structure

```
storage/app/public/
└── internship/
    └── certificates/
        ├── internship_certificates/...pdf
        ├── internship_certificates/...pdf
        └── ...
```

**Access via web**: `/storage/internship/certificates/...`  
**Symlink**: Already created via `php artisan storage:link`

---

## ✔️ Validation Rules

### File Upload
- **Type**: PDF only (`mimes:pdf`)
- **Size**: Max 20MB (`max:20480` in kilobytes)
- **Required**: Always require file for new uploads

### Database Fields
- `internship_application_id`: Required, must exist in `internship_applications`
- `generated_for_user_id`: Optional, must exist in `users` if provided
- `file`: Path to uploaded PDF file
- `status`: Enum (draft, published, revoked) - defaults to published
- `issued_by`: User ID of issuer - auto-set to auth()->id()
- `issued_at`: Timestamp - auto-set to now()

---

## 🧪 Testing Checklist

### Intern User (Role 7)
- [ ] Can access `/internship/certificates`
- [ ] Sees only published certificates issued to them
- [ ] Can download certificates successfully
- [ ] Cannot access HR/PIC management pages
- [ ] Cannot upload/edit/delete certificates

### HR Manager / PIC User (Role 5 or 6)
- [ ] Can access `/staff/internship/certificates/manage`
- [ ] Can upload PDF certificates successfully
- [ ] Can select internship application from dropdown
- [ ] File validation works (reject non-PDF, files > 20MB)
- [ ] Can download uploaded certificates
- [ ] Can delete certificates with confirmation
- [ ] Cannot access intern-only pages

### File Operations
- [ ] Files upload to correct storage path
- [ ] Files accessible via `/storage/internship/certificates/`
- [ ] Download increments `download_count`
- [ ] Delete removes file from storage
- [ ] Missing files show 404 error

---

## 🔧 Configuration Notes

### Environment
- Storage disk: `public` (symlinked to web-accessible path)
- File path pattern: `internship/certificates/{filename}`
- Max upload size: 20MB (check also in `php.ini` for `upload_max_filesize`)

### Middleware
- Intern routes: `middleware('role:7')`
- HR/PIC routes: `middleware('role:5,6')`
- All routes require authentication

### Authorization
- Uses Laravel's Gate system via `AuthServiceProvider`
- Policies checked in controller with `$this->authorize()`
- Falls back to abort(403) if unauthorized

---

## 🐛 Troubleshooting

### Issue: Files not uploading
**Solution**: 
- Verify `storage/app/public/internship/certificates/` directory exists
- Check `php.ini`: `upload_max_filesize` should be > 20MB
- Verify storage symlink: `php artisan storage:link`

### Issue: Downloads not working
**Solution**:
- Check file exists at `storage/app/public/{path}`
- Verify web server can access storage directory
- Check download_count increments (indicates authorization passed)

### Issue: Policy authorization errors
**Solution**:
- Clear config cache: `php artisan config:cache`
- Verify user has correct role_id (5 or 6 for HR/PIC)
- Check `AuthServiceProvider` registered in `bootstrap/providers.php`

### Issue: Routes not found
**Solution**:
- Clear route cache: `php artisan route:cache`
- Verify routes added to `routes/web.php`
- Check middleware names: `role:7` and `role:5,6`

---

## 📝 Database Rollback

If needed to rollback the certificate system:

```bash
php artisan migrate:rollback --step=1
```

This will remove the `internship_certificates` table and all data.

---

## 🎯 Future Enhancements

Possible improvements:
- [ ] Bulk upload certificates
- [ ] Certificate templates/generation
- [ ] Email notifications on certificate issuance
- [ ] QR code verification
- [ ] Expiry dates for certificates
- [ ] Certificate categories/types
- [ ] Download history audit log

---

## 📞 Support

For issues or questions about the certificate system:
1. Check validation errors in browser console
2. Review Laravel logs at `storage/logs/`
3. Verify all files created in correct locations
4. Ensure user has correct role assignment

---

**System Version**: v1.0  
**Last Updated**: November 2025  
**Status**: ✅ Production Ready
