# Production Session Debug Guide

## Masalah Redirect Loop Login

### Symptom
- Login form submit
- Redirect ke dashboard (302)
- Redirect kembali ke login (302)
- Loop terus-menerus

### Penyebab Umum

#### 1. Session Tidak Tersimpan
**Kemungkinan:**
- Session driver tidak bekerja
- Database session table tidak ada
- Session cookie tidak bisa di-set

**Debug:**
```bash
# Cek session table
php artisan tinker
DB::table('sessions')->count();

# Cek session config
php artisan config:show session
```

#### 2. Cookie Tidak Bisa Di-Set (PALING SERING DI PRODUCTION)
**Kemungkinan:**
- `SESSION_SECURE_COOKIE=true` tapi akses via HTTP
- `SESSION_DOMAIN` salah
- `SESSION_SAME_SITE` terlalu ketat
- Browser block third-party cookies

**Solusi:**
```env
# CRITICAL: Pastikan ini sesuai dengan setup server
SESSION_SECURE_COOKIE=true  # Hanya jika site sudah HTTPS
SESSION_DOMAIN=.seeoftunsoed.com  # Dengan dot prefix untuk subdomain
SESSION_SAME_SITE=lax  # Jangan pakai 'strict'
```

#### 3. Middleware Authentication Issue
**Kemungkinan:**
- Middleware `auth` tidak recognize session
- Trusted proxies tidak ter-configure

### Quick Fix untuk Production

#### Step 1: Test dengan Session File Driver (Temporary)
```env
# Ubah sementara di .env
SESSION_DRIVER=file
SESSION_SECURE_COOKIE=false
```

```bash
php artisan config:clear
php artisan cache:clear
```

**Jika ini berhasil**, berarti masalah di database session atau cookie config.

#### Step 2: Cek HTTPS Configuration
```bash
# Test apakah site sudah HTTPS
curl -I https://seeoftunsoed.com/login

# Cek header
# Harus ada: HTTPS, tidak redirect HTTP
```

Jika masih HTTP, ubah:
```env
SESSION_SECURE_COOKIE=false
```

#### Step 3: Debug Session di Code
Tambahkan temporary debug di `AuthenticatedSessionController.php`:

```php
public function store(LoginRequest $request): RedirectResponse
{
    // ... existing code ...
    
    $request->authenticate();
    $request->session()->regenerate();
    
    // TEMPORARY DEBUG - REMOVE AFTER TESTING
    \Log::info('Login Success', [
        'user_id' => Auth::id(),
        'session_id' => session()->getId(),
        'roles_id' => Auth::user()->roles_id,
        'session_driver' => config('session.driver'),
        'session_domain' => config('session.domain'),
        'session_secure' => config('session.secure'),
    ]);
    
    // ... rest of code ...
}
```

Cek log:
```bash
tail -f storage/logs/laravel.log
```

#### Step 4: Cek Permissions
```bash
# Storage harus writable
ls -la storage/
ls -la storage/framework/sessions/

# Fix permissions
chmod -R 755 storage
chown -R www-data:www-data storage
```

### Production .env Configuration (RECOMMENDED)

```env
# App
APP_ENV=production
APP_DEBUG=false
APP_URL=https://seeoftunsoed.com

# Session - CRITICAL CONFIG
SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false

# Cookie Settings - ADJUST BASED ON YOUR SETUP
SESSION_SECURE_COOKIE=true    # ONLY if using HTTPS
SESSION_HTTP_ONLY=true
SESSION_SAME_SITE=lax         # NOT 'strict'
SESSION_DOMAIN=.seeoftunsoed.com  # WITH leading dot
SESSION_PATH=/

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=your_db
DB_USERNAME=your_user
DB_PASSWORD=your_pass
```

### Testing Checklist

1. **Test Login di Incognito/Private Window**
   - Eliminates old cookies/cache

2. **Clear Browser DevTools**
   ```
   F12 → Application → Storage → Clear Site Data
   ```

3. **Check Session Cookie Created**
   ```
   F12 → Application → Cookies → seeoftunsoed.com
   Look for: "seeo_is_session" or similar
   ```

4. **Check Response Headers**
   ```
   F12 → Network → login (POST) → Headers
   Should see: Set-Cookie: ...
   ```

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Cookie not set | Check SESSION_SECURE_COOKIE matches HTTPS |
| Session cleared on redirect | Check SESSION_DOMAIN and SESSION_PATH |
| Login works locally, not production | Check trusted proxies config |
| "Session store not set" | Run php artisan session:table + migrate |
| CSRF token mismatch | Clear cache, check APP_KEY set |

### Emergency Rollback

Jika tidak bisa login sama sekali:

```bash
# 1. Switch to file session
echo "SESSION_DRIVER=file" >> .env
echo "SESSION_SECURE_COOKIE=false" >> .env

# 2. Clear everything
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# 3. Test login

# 4. Gradually enable features one by one
```

### Debug Commands

```bash
# Check session config
php artisan tinker
>>> config('session')

# Test session write
php artisan tinker
>>> session()->put('test', 'value')
>>> session()->get('test')  // Should return 'value'
>>> session()->save()

# Check if user authenticated
php artisan tinker
>>> Auth::attempt(['email' => 'test@example.com', 'password' => 'password'])
>>> Auth::check()  // Should be true
>>> Auth::id()     // Should return user ID
```

### Contact
Jika masih stuck, provide:
1. Output dari `php artisan about`
2. Content dari `storage/logs/laravel.log`
3. Screenshot dari browser DevTools (Network + Application tabs)
4. Output dari `echo "SESSION_DRIVER=" . env('SESSION_DRIVER')`
