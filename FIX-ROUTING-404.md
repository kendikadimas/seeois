# 🔧 Fix: 404 Error on Routes Like /login

## Problem
- ✅ Homepage (`/`) loads correctly
- ❌ Routes like `/login`, `/register`, etc. return 404
- ❌ Error: `Failed to load resource: the server responded with a status of 404`

## Root Cause
**Missing `.htaccess` file in `public_html`**

`.htaccess` contains URL rewrite rules that tell Apache to route all requests through `index.php` (Laravel routing).

Without it, server tries to find actual files for `/login`, `/register`, etc. and returns 404.

## Solution

### What Was Fixed
Updated `deploy.sh` to:
1. Copy `.htaccess` from `~/sis/seeois/public/` to `~/public_html/`
2. Verify `.htaccess` contains mod_rewrite rules
3. Verify routing is enabled

### Implementation

```bash
# Added to deploy.sh Step 2:
if [ -f "$PROJECT_DIR/public/.htaccess" ]; then
    cp "$PROJECT_DIR/public/.htaccess" "$PUBLIC_HTML/.htaccess"
    log_success ".htaccess copied for URL routing"
fi
```

## Testing

### Step 1: Pull Latest Changes
```bash
ssh -p 2223 seej2596@seeoftunsoed.com
cd ~/sis/seeois && git pull origin main
```

### Step 2: Run Deploy Script
```bash
bash deploy.sh
```

Expected output:
```
[✓] .htaccess copied for URL routing
[✓] .htaccess found in public_html
[✓] .htaccess contains mod_rewrite rules for routing
```

### Step 3: Verify Routes Work
```bash
# Test homepage
curl -I https://seeoftunsoed.com/
# Expected: 200

# Test login route
curl -I https://seeoftunsoed.com/login
# Expected: 200 (now redirects through index.php)

# In browser
https://seeoftunsoed.com/login     # Should work
https://seeoftunsoed.com/register  # Should work
```

### Step 4: Browser Test
1. Visit https://seeoftunsoed.com/
2. Click on login link or navigate to /login
3. Page should load without 404 errors
4. Check console - no `Failed to load resource: 404` messages

## Manual Fix (if needed)

```bash
ssh -p 2223 seej2596@seeoftunsoed.com

# Copy .htaccess
cp ~/sis/seeois/public/.htaccess ~/public_html/.htaccess

# Verify
cat ~/public_html/.htaccess | head -10
# Should show: RewriteEngine On

# Test
curl -I https://seeoftunsoed.com/login
```

## What .htaccess Does

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller (index.php)...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

**Key rule**: 
```apache
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [L]
```

This says:
- If request is NOT a real file (`!-f`)
- And NOT a real directory (`!-d`)
- Then rewrite to `index.php`
- Laravel then routes it based on URL

## Checklist

- [ ] Pull latest code: `git pull origin main`
- [ ] Run deploy: `bash deploy.sh`
- [ ] Check .htaccess exists: `ls ~/public_html/.htaccess`
- [ ] Test homepage: `curl -I https://seeoftunsoed.com/`
- [ ] Test route: `curl -I https://seeoftunsoed.com/login`
- [ ] Visit in browser: https://seeoftunsoed.com/login
- [ ] Check console: No 404 errors

## If Still Having Issues

1. Check if mod_rewrite is enabled on server
2. Verify .htaccess permissions: `ls -la ~/public_html/.htaccess` (should be 644)
3. Check cPanel/server logs: `/home/seej2596/public_html/error_log`
4. Ensure index.php is correctly configured to find Laravel bootstrap

## Next Steps
Run `bash deploy.sh` again and test all routes! 🚀
