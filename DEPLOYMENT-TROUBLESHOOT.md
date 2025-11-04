# Deployment Troubleshooting Guide

## Problem: 404 Build Files Not Found

### Symptoms
- All .js, .css files returning 404
- Website shows "Failed to load resource"
- jQuery and PhpDebugBar undefined errors

### Root Cause Analysis

#### Step 1: Verify Build Files in Repository
```powershell
cd c:\xampp\htdocs\seeonow\blaterian_seeo
git ls-files | Where-Object {$_ -match "public/build"} | Measure-Object -Line
```
**Expected**: Should show ~83-84 files

#### Step 2: Verify Local Build Files Exist
```powershell
Get-ChildItem "public/build/assets" -File | Measure-Object
```
**Expected**: Should show Count: 82 files

#### Step 3: Verify Git Remote Has Files
```powershell
git ls-tree -r HEAD -- public/build | Measure-Object
```
**Expected**: Should show Count: 83

### Server-Side Debugging

#### SSH to Server
```bash
ssh -p 2223 seej2596@seeoftunsoed.com
```

#### Check 1: Verify Project Directory
```bash
ls -la ~/sis/seeois/public/build/
# Should show: assets/, manifest.json
```

#### Check 2: Count Build Files in Project
```bash
find ~/sis/seeois/public/build -type f | wc -l
# Should show: ~83 files
```

#### Check 3: Check public_html Deployment
```bash
ls -la ~/public_html/
# Should show: assets/, manifest.json, index.php, images (symlink)
```

#### Check 4: Count Files in public_html
```bash
find ~/public_html -type f ! -name ".htaccess" ! -name "error_log" | wc -l
# Should show: ~85+ files (including index.php + build files)
```

#### Check 5: Verify App Files
```bash
ls ~/public_html/app*.js
# Should show:
# /home/seej2596/public_html/app-BNtVQNrL.js
# /home/seej2596/public_html/app-CfkJyshZ.css
```

#### Check 6: Check Deploy Log
```bash
tail -100 ~/sis/seeois/deploy.log
# Look for "Build files copied to public_html" message
# Look for "Verified XXX files in public_html"
```

### Fix Procedures

#### If Build Files Not Pulled
```bash
ssh -p 2223 seej2596@seeoftunsoed.com
cd ~/sis/seeois
git pull origin main
git status
```

#### If Build Files Exist but Not Copied to public_html
```bash
ssh -p 2223 seej2596@seeoftunsoed.com
cd ~/sis/seeois

# Manual copy
cp -r ~/sis/seeois/public/build/* ~/public_html/
cp ~/sis/seeois/public/index.php ~/public_html/

# Verify
ls ~/public_html/app*.js
```

#### If index.php Needs Path Correction
```bash
ssh -p 2223 seej2596@seeoftunsoed.com

# Backup
cp ~/public_html/index.php ~/public_html/index.php.backup

# Edit paths
sed -i "s|require __DIR__.'/../bootstrap/app.php'|require '/home/seej2596/sis/seeois/bootstrap/app.php'|g" ~/public_html/index.php
sed -i "s|require __DIR__.'/../vendor/autoload.php'|require '/home/seej2596/sis/seeois/vendor/autoload.php'|g" ~/public_html/index.php

# Verify
grep "sis/seeois" ~/public_html/index.php
```

#### Full Manual Deployment
```bash
ssh -p 2223 seej2596@seeoftunsoed.com
cd ~/sis/seeois

# 1. Pull code
git pull origin main

# 2. Clean public_html
find ~/public_html -maxdepth 1 -type f ! -name ".htaccess" ! -name "error_log" ! -name ".gitkeep" -delete
find ~/public_html -maxdepth 1 -type d ! -name "." ! -name ".." ! -name "images" -delete

# 3. Copy build files
cp -r ~/sis/seeois/public/build/* ~/public_html/
cp ~/sis/seeois/public/index.php ~/public_html/

# 4. Edit index.php
cp ~/public_html/index.php ~/public_html/index.php.backup
sed -i "s|require __DIR__.'/../bootstrap/app.php'|require '/home/seej2596/sis/seeois/bootstrap/app.php'|g" ~/public_html/index.php
sed -i "s|require __DIR__.'/../vendor/autoload.php'|require '/home/seej2596/sis/seeois/vendor/autoload.php'|g" ~/public_html/index.php

# 5. Set permissions
chmod -R 755 ~/public_html

# 6. Setup symlink
rm ~/public_html/images 2>/dev/null || true
ln -s ~/sis/seeois/public/images ~/public_html/images

# 7. Clear Laravel cache
cd ~/sis/seeois
php artisan config:clear
php artisan cache:clear
php artisan optimize

# 8. Verify
ls ~/public_html/app*.js
curl -I https://seeoftunsoed.com/app-BNtVQNrL.js
```

### Verification

#### Test in Browser
```
https://seeoftunsoed.com/app-BNtVQNrL.js
https://seeoftunsoed.com/Login-DTX0oObo.js
```
Should return **200 OK**, not 404

#### Test Images
```
https://seeoftunsoed.com/images/compro/logo.png
```
Should return **200 OK**

#### Check Console
Open browser DevTools → Console
- No 404 errors for .js/.css files
- jQuery should be defined
- PhpDebugBar should be available

### Automated Deploy Command
```bash
ssh -p 2223 seej2596@seeoftunsoed.com "cd ~/sis/seeois && bash deploy.sh"
```

The script should output:
```
✓ Code pulled successfully
✓ Public_html cleaned
✓ Found XX build files
✓ Build files copied to public_html
✓ Verified XX files in public_html
✓ index.php copied
✓ index.php backed up
✓ index.php paths updated
✓ Permissions set (755) for public_html
✓ Config cleared
✓ Views cleared
✓ Cache cleared
✓ Application optimized
✓ Image symlink created
✓ Database migrations completed
✓ Image symlink verified
✓ Frontend build manifest found
✓ index.php found in public_html
✓ index.php correctly references sis/seeois path

✨ Deployment Completed Successfully! ✨
```

## Quick Summary

| Component | Expected | Check Command |
|-----------|----------|---|
| GitHub | 83 build files | `git ls-tree -r HEAD -- public/build \| Measure-Object` |
| Local | 82 asset files | `Get-ChildItem "public/build/assets" \| Measure-Object` |
| Project Dir | 83 files | `find ~/sis/seeois/public/build -type f \| wc -l` |
| public_html | 83+ files | `find ~/public_html -type f \| wc -l` |
| Symlink | images → project | `readlink ~/public_html/images` |
| File Accessible | HTTP 200 | `curl -I https://seeoftunsoed.com/app-BNtVQNrL.js` |
