# 🔧 FIX: Build Files Not Copying Properly

## Root Cause Identified

**Problem**: `cp -r ~/sis/seeois/public/build/* ~/public_html/`
- Copies contents of build folder but may not preserve `assets/` directory structure correctly
- The `/*` pattern can cause issues with empty directories

**Solution**: Use `cp -r ~/sis/seeois/public/build/. ~/public_html/` 
- The `.` means "copy this directory's contents including structure"
- Better handles nested directories like `assets/`

## Changes Made to deploy.sh

1. **Better Build Copy**: Changed from `build/*` to `build/.`
2. **Better Verification**: Added count of files in `assets/` folder to detect failures
3. **Better Symlink**: Added fallback if symlink already exists
4. **Better Error Checking**: Validates that assets folder has >50 files after copy

## Test Procedure

### Step 1: SSH to Server
```bash
ssh -p 2223 seej2596@seeoftunsoed.com
```

### Step 2: Pull Latest Changes
```bash
cd ~/sis/seeois
git pull origin main
```

### Step 3: Run Deploy Script
```bash
bash deploy.sh
```

Expected output should show:
```
[✓] Found 83 build files
[✓] Copying build directory structure...
[✓] Build files copied to public_html
[✓] Verified 85 total files in public_html
[✓] Found 82 files in assets folder
[✓] index.php copied
...
✨ Deployment Completed Successfully! ✨
```

### Step 4: Verify Files
```bash
# Check app files exist
ls ~/public_html/app-*.js
# Expected: /home/seej2596/public_html/app-BNtVQNrL.js

# Verify assets folder
find ~/public_html/assets -type f | wc -l
# Expected: 82

# Test HTTP response
curl -I https://seeoftunsoed.com/app-BNtVQNrL.js
# Expected: HTTP/2 200 OK
```

## If Still Having Issues

### Manual Debug
```bash
cd ~/sis/seeois

# Check source
ls -la public/build/
find public/build -type f | wc -l

# Manual copy with verbose
rm -rf ~/public_html/assets ~/public_html/manifest.json
cp -rv public/build/. ~/public_html/ 2>&1 | tail -20

# Verify
find ~/public_html/assets -type f | wc -l
```

### Full Manual Fix
```bash
ssh -p 2223 seej2596@seeoftunsoed.com << 'EOF'
cd ~/sis/seeois

# 1. Clean
find ~/public_html -maxdepth 1 -type f ! -name ".htaccess" ! -name "error_log" ! -name ".gitkeep" -delete
find ~/public_html -maxdepth 1 -type d ! -name "." ! -name ".." ! -name "images" -delete

# 2. Copy using correct method
cp -r ~/sis/seeois/public/build/. ~/public_html/
cp ~/sis/seeois/public/index.php ~/public_html/

# 3. Fix index.php
cp ~/public_html/index.php ~/public_html/index.php.backup
sed -i "s|require __DIR__.'/../bootstrap/app.php'|require '/home/seej2596/sis/seeois/bootstrap/app.php'|g" ~/public_html/index.php
sed -i "s|require __DIR__.'/../vendor/autoload.php'|require '/home/seej2596/sis/seeois/vendor/autoload.php'|g" ~/public_html/index.php

# 4. Symlink
rm ~/public_html/images 2>/dev/null || true
ln -s ~/sis/seeois/public/images ~/public_html/images

# 5. Permissions
chmod -R 755 ~/public_html

# 6. Verify
echo "=== Verification ==="
echo "App files:"
find ~/public_html -name "app-*.js" | head -1
echo "Assets count:"
find ~/public_html/assets -type f | wc -l
echo "Done!"
EOF
```

## Expected Results After Fix

✅ All .js and .css files return HTTP 200
✅ Website loads without console errors
✅ jQuery defined properly
✅ Images load correctly
✅ No 404 errors

## Rollback (if needed)

```bash
# Restore backup
cp ~/public_html/index.php.backup ~/public_html/index.php

# Or re-run deploy.sh
bash deploy.sh
```
