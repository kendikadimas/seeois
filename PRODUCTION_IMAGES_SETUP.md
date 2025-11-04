# Production Image Setup - Quick Guide

## URL Format di Production
```
https://seeoftunsoed.com/images/compro/logo.png
https://seeoftunsoed.com/images/apps/logo.png
```

## Setup Steps

### Step 1: SSH ke Production
```bash
ssh -p 2223 seej2596@seeoftunsoed.com
cd /home/seej2596/public_html/blaterian_seeo
```

### Step 2: Create directories
```bash
mkdir -p public/images/{compro,apps,billboard,product,profile,receipt,log,shop}
```

### Step 3: Copy images dari storage
```bash
# Copy all images dari storage ke public
cp -r storage/app/public/images/* public/images/

# Set permissions
chmod -R 755 public/images
```

### Step 4: Verify
```bash
# Check if images copied correctly
ls -la public/images/compro/ | head
ls -la public/images/apps/ | head

# Test a specific image
curl -I https://seeoftunsoed.com/images/compro/logo.png
```

### Expected Output
```
HTTP/1.1 200 OK
Content-Type: image/png
Content-Length: xxxxx
```

## Troubleshooting

### 404 Error pada image?
1. Verify file exists:
   ```bash
   ls -la public/images/compro/logo.png
   ```

2. Check file permissions:
   ```bash
   chmod 644 public/images/compro/logo.png
   ```

3. Check directory permissions:
   ```bash
   chmod 755 public/images
   chmod 755 public/images/compro
   ```

### Images muncul placeholder?
- ImageHelper fallback ke `/images/` path
- Verify images ada di `public/images/`
- Check browser console untuk error

## Automated Script

Atau gunakan script otomatis:
```bash
cd /home/seej2596/public_html/blaterian_seeo
bash scripts/setup-images-production.sh
```

## Development vs Production

### Local Development
- Images: `storage/app/local/images/` atau `storage/app/public/images/`
- URL: `/storage/local/images/compro/logo.png` atau `/storage/images/compro/logo.png`
- ImageHelper handle fallback automatically

### Production (cPanel)
- Images: `public/images/`
- URL: `/images/compro/logo.png`
- Direct access to public folder

## After Deployment

1. ✅ Push kode ke GitHub (sudah di-push)
2. ✅ Pull di production
3. ✅ Run: `php artisan cache:clear`
4. ✅ Copy images: `cp -r storage/app/public/images/* public/images/`
5. ✅ Set permissions: `chmod -R 755 public/images`
6. ✅ Test URL in browser

## Notes

- Images di `storage/app/public/` adalah backup (sudah di-push ke GitHub)
- Images di `public/images/` adalah yang diakses oleh web server
- ImageHelper otomatis mendeteksi lokasi dan return URL yang benar
- Tidak perlu symlink jika copy ke public/images/
