# DEBUG: Check Build Files in Detail

## Server Status dari Output
1. `find ~/public_html -maxdepth 1 -type f | wc -l` = **4 files** (hanya .htaccess, error_log, index.php, manifest.json)
2. `ls ~/public_html/app-*.js` = **NOT FOUND** (0 files)
3. `find ~/public_html -type f ! -name ".htaccess" ! -name "error_log" | wc -l` = **85 files** ← This is key!

**INSIGHT**: Ada 85 files total tapi app-*.js tidak ditemukan. Ini berarti files ada tapi tidak di root, kemungkinan di subdirektori!

## Diagnostic Commands (Run di Server)

```bash
# 1. Check structure di public_html
ls -la ~/public_html/
# Expected: Should show "assets" folder if files were copied

# 2. Find app files anywhere
find ~/public_html -name "app-*.js"
# Expected: Should find files like ~/public_html/assets/app-BNtVQNrL.js

# 3. Check public/build structure
ls -la ~/sis/seeois/public/build/
# Expected: assets/, manifest.json

# 4. Check if assets folder in build is empty
ls -la ~/sis/seeois/public/build/assets/
# Expected: Should show many .js and .css files

# 5. Count files in assets
find ~/sis/seeois/public/build/assets -type f | wc -l
# Expected: Should be ~82 files

# 6. Check if assets copied correctly
find ~/public_html/assets -type f 2>/dev/null | wc -l
# Expected: Should be ~82 files if copy was successful
```

## Possible Issue

Build files might be:
1. In subdirectories (assets/) instead of root
2. Or copy command failed silently
3. Or permissions issue preventing copy

## Solution

```bash
# Check exact structure
find ~/sis/seeois/public/build -type f

# Copy with verbose output
cp -rv ~/sis/seeois/public/build/* ~/public_html/ 2>&1 | tail -20

# Verify copied
find ~/public_html -name "*.js" | wc -l
find ~/public_html -name "*.css" | wc -l
```
