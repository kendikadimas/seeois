# Production Deployment - Image Configuration

## Quick Deploy Guide

### What Changed
- All image paths now use `$imageUrl()` helper function
- Automatically detects environment and loads from correct location
- **No changes to page functionality or appearance**

### Production Setup (cPanel)

#### Option 1: Copy Images to Public Folder (Recommended)
```bash
# SSH into production server
cd /path/to/public_html/blaterian_seeo

# Create image directories
mkdir -p public/images/compro
mkdir -p public/images/apps

# Copy images from local storage
# (Do this locally and upload via FTP/SFTP, or if images exist in production storage:)
cp -r storage/app/local/images/compro/* public/images/compro/
cp -r storage/app/local/images/apps/* public/images/apps/

# Set permissions
chmod -R 755 public/images
```

#### Option 2: Use Storage Symlink (If cPanel Supports)
```bash
# Run artisan command
php artisan storage:link

# This creates: public/storage → storage/app/public
# Then place images in: storage/app/public/images/
```

### Image Locations Priority

The application checks these locations in order:
1. `public/images/` ← **Recommended for production**
2. `storage/app/public/images/` (via symlink)
3. `storage/app/local/images/` (fallback)

### Directory Structure Expected

```
blaterian_seeo/
├── public/
│   └── images/                    ← Place images here for production
│       ├── compro/
│       │   ├── seeo.jpg
│       │   ├── logo.png
│       │   ├── blaterianlogo.png
│       │   ├── entclass.JPG
│       │   ├── visitasi.JPG
│       │   ├── upgrading.webp
│       │   └── raplen1.JPG
│       └── apps/
│           ├── logo.png
│           └── error_background.png
├── storage/
│   └── app/
│       ├── local/images/         ← Local development location
│       │   ├── compro/
│       │   └── apps/
│       └── public/               ← If using symlink
│           └── images/
└── ...
```

### Files That Need Images

#### Company Profile Images (compro/):
- `seeo.jpg` - Hero section image
- `logo.png` - SEEO logo (used everywhere)
- `blaterianlogo.png` - Blaterian brand logo
- `entclass.JPG` - EntClass activity
- `visitasi.JPG` - Visitasi activity
- `upgrading.webp` - Upgrading activity
- `raplen1.JPG` - Rapat Pleno activity

#### App Images (apps/):
- `logo.png` - Sidebar application logo
- `error_background.png` - Error page background

### Upload Method

**Via FTP/SFTP**:
```
1. Navigate to: public_html/blaterian_seeo/public/
2. Create folders: images/compro and images/apps
3. Upload all image files to respective folders
4. Verify permissions are 755
```

**Via SSH**:
```bash
scp -r ./public/images/* user@production:/path/to/public_html/blaterian_seeo/public/images/
```

### Verify Deployment

1. **Check local images exist**:
   ```bash
   ls -la public/images/compro/
   ls -la public/images/apps/
   ```

2. **Test in browser**:
   - Visit homepage: Images should load
   - Right-click image → Inspect
   - Check src attribute in Network tab
   - Should be `/images/compro/seeo.jpg` (not `/storage/local/...`)

3. **Check helper is working**:
   ```bash
   php artisan tinker
   >>> app('ImageHelper')->url('compro/seeo.jpg')
   => "/images/compro/seeo.jpg"
   ```

### Troubleshooting

**Images not loading in production?**
1. Verify files exist: `ls public/images/compro/`
2. Check file permissions: `chmod 755 public/images`
3. Clear cache: `php artisan cache:clear`
4. Clear browser cache (Ctrl+Shift+Delete)
5. Check browser console for exact image paths being requested

**Getting 404 errors?**
1. Ensure public directory is writable
2. Verify image file names match exactly (case-sensitive)
3. Check web server is serving public/ folder as root

**All images showing placeholder?**
- ImageHelper is working (fallback active)
- Images not found in any location
- Copy images to `public/images/` directory

### Performance Tips

1. **Compress images before upload**:
   ```bash
   # Use ImageMagick or similar
   convert image.jpg -quality 85 image-optimized.jpg
   ```

2. **Use WebP format**:
   - Convert JPG/PNG to WebP for smaller file sizes
   - ImageHelper will serve both formats

3. **Set cache headers**:
   ```apache
   # In public/.htaccess
   <FilesMatch "\.(jpg|jpeg|png|webp|gif|ico|svg|css|js)$">
       Header set Cache-Control "max-age=31536000, public"
   </FilesMatch>
   ```

### Deployment Checklist

- [ ] `php artisan cache:clear`
- [ ] `npm run build` (done locally, pushed to production)
- [ ] Create `public/images/` directory structure
- [ ] Copy/upload all image files
- [ ] Verify file permissions (755)
- [ ] Test homepage loads with images
- [ ] Test error page with background
- [ ] Check browser Network tab for correct paths
- [ ] Verify placeholder doesn't show

### Rollback Plan

If images break in production:
1. Check file paths in browser inspector
2. Verify files exist where expected
3. Restore from backup if needed
4. Check `app/Helpers/ImageHelper.php` logic hasn't changed
5. Ensure `.env` and config are correct

### Support

For issues or questions about image loading:
1. Check `IMAGE_LOADING_SOLUTION.md` for detailed documentation
2. Review this deployment guide
3. Verify all image files are present and accessible
4. Check application logs: `storage/logs/laravel.log`
