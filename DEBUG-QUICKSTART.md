# 🔍 Build Files Deployment - Debugging Steps

## ✅ Verifikasi Build Files Sudah di GitHub

```powershell
cd c:\xampp\htdocs\seeonow\blaterian_seeo

# Check 1: Hitung file yang di-track
git ls-files | Where-Object {$_ -match "public/build"} | Measure-Object -Line
# Output: Lines = 84 (seharusnya ada ~84 files)

# Check 2: Verifikasi remote repo
git ls-tree -r HEAD -- public/build | Measure-Object
# Output: Count = 83 (seharusnya sama di remote)
```

## 🖥️ Server-Side Debugging (via SSH)

**SSH Command:**
```
ssh -p 2223 seej2596@seeoftunsoed.com
```

### Diagnosis Commands (Jalankan di Server)

**1. Check apakah build folder ada di project:**
```bash
ls -la ~/sis/seeois/public/build/
```
Seharusnya menampilkan:
```
drwxr-xr-x assets
-rw-r--r-- manifest.json
```

**2. Hitung build files di project:**
```bash
find ~/sis/seeois/public/build -type f | wc -l
```
Seharusnya: **83** files

**3. Hitung files di public_html:**
```bash
find ~/public_html -maxdepth 1 -type f | wc -l
```
Seharusnya: **~85** files (include index.php + manifest.json + build files)

**4. Check app.js ada atau tidak:**
```bash
ls ~/public_html/app-*.js
```
Seharusnya menampilkan file seperti:
```
/home/seej2596/public_html/app-BNtVQNrL.js
```

**5. Lihat deploy log:**
```bash
tail -50 ~/sis/seeois/deploy.log
```
Cari message:
```
[✓] Found XX build files
[✓] Build files copied to public_html
[✓] Verified XX files in public_html
```

## 🚀 Jika Build Files Tidak Ada - Solusi

### Opsi 1: Jalankan Deploy Script Lagi
```bash
ssh -p 2223 seej2596@seeoftunsoed.com "cd ~/sis/seeois && bash deploy.sh"
```

### Opsi 2: Manual Copy Build Files
```bash
ssh -p 2223 seej2596@seeoftunsoed.com << 'EOF'
cd ~/sis/seeois

# Pull latest code (jika belum)
git pull origin main

# Copy build files secara manual
cp -r ~/sis/seeois/public/build/* ~/public_html/

# Verify
ls ~/public_html/app-*.js

# Check file count
find ~/public_html -type f ! -name ".htaccess" ! -name "error_log" | wc -l
EOF
```

### Opsi 3: Full Manual Deployment
```bash
ssh -p 2223 seej2596@seeoftunsoed.com << 'EOF'
cd ~/sis/seeois

# 1. Pull code
echo "[1/8] Pulling code..."
git pull origin main

# 2. Clean public_html
echo "[2/8] Cleaning public_html..."
find ~/public_html -maxdepth 1 -type f ! -name ".htaccess" ! -name "error_log" ! -name ".gitkeep" -delete

# 3. Copy build
echo "[3/8] Copying build files..."
cp -r ~/sis/seeois/public/build/* ~/public_html/
cp ~/sis/seeois/public/index.php ~/public_html/

# 4. Edit index.php
echo "[4/8] Configuring index.php..."
cp ~/public_html/index.php ~/public_html/index.php.backup
sed -i "s|require __DIR__.'/../bootstrap/app.php'|require '/home/seej2596/sis/seeois/bootstrap/app.php'|g" ~/public_html/index.php
sed -i "s|require __DIR__.'/../vendor/autoload.php'|require '/home/seej2596/sis/seeois/vendor/autoload.php'|g" ~/public_html/index.php

# 5. Setup symlink
echo "[5/8] Setting up symlink..."
rm ~/public_html/images 2>/dev/null || true
ln -s ~/sis/seeois/public/images ~/public_html/images

# 6. Permissions
echo "[6/8] Setting permissions..."
chmod -R 755 ~/public_html

# 7. Clear cache
echo "[7/8] Clearing cache..."
cd ~/sis/seeois
php artisan config:clear 2>/dev/null || true
php artisan cache:clear 2>/dev/null || true

# 8. Verify
echo "[8/8] Verifying..."
echo "Build files in public_html:"
ls ~/public_html/app-*.js | wc -l
echo "Done!"
EOF
```

## 🧪 Verification

### Test 1: Check Build Files URL
```bash
# Di local computer
curl -I https://seeoftunsoed.com/app-BNtVQNrL.js
curl -I https://seeoftunsoed.com/Login-DTX0oObo.js
```
Seharusnya return **200 OK**, bukan **404**

### Test 2: Visit Website
```
https://seeoftunsoed.com
```
- Check browser console untuk 404 errors
- Tidak boleh ada errors
- Gambar harus load

## 🐛 Common Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| 404 on .js/.css | Build files not copied | Run deploy.sh atau manual copy |
| jQuery undefined | index.html not loading | Check index.php paths |
| Images 404 | Symlink broken | Run step 5: `ln -s ~/sis/seeois/public/images ~/public_html/images` |
| "Permission denied" | Wrong permissions | Run `chmod -R 755 ~/public_html` |

## 📋 Checklist

- [ ] Build files di-track di Git (`git ls-files | grep public/build` = 84 files)
- [ ] Build files di-push ke GitHub (`git ls-remote origin ... public/build` = 83 files)
- [ ] Pull di server berhasil (`cd ~/sis/seeois && git pull` = up to date)
- [ ] Build files ada di `~/sis/seeois/public/build/` (`ls ~/sis/seeois/public/build/assets/ | wc -l` = 82)
- [ ] Build files ter-copy ke `~/public_html/` (`find ~/public_html -name "*.js" | wc -l` > 0)
- [ ] index.php ter-edit dengan path sis/seeois (`grep sis/seeois ~/public_html/index.php`)
- [ ] Symlink images ada (`ls -l ~/public_html/images`)
- [ ] HTTP 200 untuk .js files (`curl -I https://seeoftunsoed.com/app-*.js`)
- [ ] Website load tanpa errors

## 💡 Tips

1. **Fastest Fix**: Just run `bash deploy.sh` again on server
2. **If still failing**: Run manual copy option (Opsi 2)
3. **Still not working**: Run full manual deployment (Opsi 3)
4. **Verify always**: Test dengan `curl -I https://seeoftunsoed.com/app-*.js`
