# Production Login Redirect Loop Fix

## Masalah
"Too many redirects" atau redirect loop saat login di production server.

## Penyebab
1. **HTTPS/HTTP Mismatch**: Server production menggunakan HTTPS tapi Laravel tidak mendeteksi dengan benar
2. **Proxy/Load Balancer**: Server di belakang proxy/load balancer (cPanel, Nginx, Apache)
3. **Session Cookie**: Konfigurasi session cookie tidak sesuai dengan HTTPS
4. **Trusted Proxies**: Laravel tidak mempercayai headers dari proxy

## Solusi yang Sudah Diterapkan

### 1. Trust All Proxies
File: `bootstrap/app.php`
```php
// Trust all proxies for production
$middleware->trustProxies(at: '*');
```

### 2. Force HTTPS in Production
File: `app/Providers/AppServiceProvider.php`
```php
if ($this->app->environment('production')) {
    \URL::forceScheme('https');
}
```

### 3. Session Configuration
File: `.env` di production harus memiliki:
```env
# Session Configuration (CRITICAL!)
SESSION_DRIVER=database
SESSION_SECURE_COOKIE=true
SESSION_HTTP_ONLY=true
SESSION_SAME_SITE=lax
SESSION_DOMAIN=.seeoftunsoed.com
SESSION_PATH=/
```

## Langkah-Langkah Deploy ke Production

### 1. Pull Latest Code
```bash
# SSH ke server
ssh -p 2223 seej2596@seeoftunsoed.com

# Navigate to project
cd sis/seeois

# Pull latest changes
git pull origin main

# Install/update dependencies
composer install --optimize-autoloader --no-dev
```

### 2. Update .env di Production Server
```bash
# SSH ke server
ssh -p 2223 seej2596@seeoftunsoed.com

# Edit .env file
nano .env

# Pastikan konfigurasi berikut:
APP_ENV=production
APP_DEBUG=false
APP_URL=https://seeoftunsoed.com

SESSION_DRIVER=database
SESSION_SECURE_COOKIE=true
SESSION_HTTP_ONLY=true
SESSION_SAME_SITE=lax
SESSION_DOMAIN=.seeoftunsoed.com
```

### 2. Clear Cache
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan optimize
```

### 3. Migrate Sessions Table (jika belum ada)
```bash
php artisan session:table
php artisan migrate
```

### 4. Set Permissions
```bash
chmod -R 755 storage
chmod -R 755 bootstrap/cache
chown -R www-data:www-data storage
chown -R www-data:www-data bootstrap/cache
```

### 5. Build Assets (dari local)
```bash
npm run build
```

### 6. Upload ke Server
Upload hasil build dari `public/build/` ke server production.

## Verifikasi

### 1. Cek Environment
```bash
php artisan about
```
Pastikan:
- Environment: production
- Debug Mode: OFF
- URL: https://seeoftunsoed.com

### 2. Cek Session Table
```bash
php artisan tinker
DB::table('sessions')->count();
```

### 3. Test Login
- Buka https://seeoftunsoed.com/login
- Coba login dengan akun test
- Jika masih redirect loop, lakukan langkah troubleshooting

## Troubleshooting Lanjutan

### Jika Masih Redirect Loop:

1. **Clear Browser Cache**
   - Ctrl + Shift + Delete
   - Clear cookies untuk domain seeoftunsoed.com
   - Atau gunakan incognito mode

2. **Cek .htaccess** (jika pakai Apache/cPanel)
   ```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On
       
       # Force HTTPS
       RewriteCond %{HTTPS} off
       RewriteRule ^(.*)$ https://%{HTTP_HOST%}/$1 [R=301,L]
       
       # Handle Authorization Header
       RewriteCond %{HTTP:Authorization} .
       RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
       
       # Redirect to public folder
       RewriteRule ^(.*)$ public/$1 [L]
   </IfModule>
   ```

3. **Cek Session Driver**
   ```bash
   # Pastikan table sessions ada
   php artisan migrate:status
   
   # Test session
   php artisan tinker
   session()->put('test', 'value');
   session()->get('test');
   ```

4. **Debug Mode Sementara**
   ```env
   # Temporary untuk debug (JANGAN LUPA MATIKAN!)
   APP_DEBUG=true
   ```
   Akses /login dan lihat error message lengkap.
   **IMPORTANT**: Matikan kembali setelah selesai debug!

5. **Cek Laravel Log**
   ```bash
   tail -f storage/logs/laravel.log
   ```

6. **Cek PHP Session**
   ```bash
   # Cek session path writable
   php -i | grep session.save_path
   ls -la /path/to/session
   ```

## Konfigurasi Server yang Benar

### cPanel/Shared Hosting
```
Document Root: public_html/public
PHP Version: 8.3+
```

### Environment Variables (di cPanel)
```
APP_ENV=production
APP_URL=https://seeoftunsoed.com
SESSION_SECURE_COOKIE=true
```

### PHP Configuration
```ini
session.cookie_secure = 1
session.cookie_httponly = 1
session.cookie_samesite = Lax
```

## Kontak
Jika masih ada masalah, hubungi admin server atau cek dokumentasi Laravel:
https://laravel.com/docs/11.x/session
