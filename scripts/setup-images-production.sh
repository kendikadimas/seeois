#!/bin/bash
# Production Deployment - Setup Images

# Script ini untuk setup images di production
# Run di production server setelah deploy

echo "Setting up images for production..."

# 1. Create public/images directory jika belum ada
mkdir -p public/images/compro
mkdir -p public/images/apps
mkdir -p public/images/billboard
mkdir -p public/images/product
mkdir -p public/images/profile
mkdir -p public/images/receipt
mkdir -p public/images/log
mkdir -p public/images/shop

# 2. Copy images dari storage ke public (jika belum ada)
echo "Copying images from storage to public..."

# Copy compro images
if [ ! -d "public/images/compro" ] || [ -z "$(ls -A public/images/compro)" ]; then
    cp -rv storage/app/public/images/compro/* public/images/compro/ 2>/dev/null || true
fi

# Copy apps images
if [ ! -d "public/images/apps" ] || [ -z "$(ls -A public/images/apps)" ]; then
    cp -rv storage/app/public/images/apps/* public/images/apps/ 2>/dev/null || true
fi

# Copy all other images
cp -rv storage/app/public/images/* public/images/ 2>/dev/null || true

# 3. Set permissions
echo "Setting permissions..."
chmod -R 755 public/images

# 4. Verify
echo ""
echo "Verification:"
ls -lh public/images/compro/ | head -5
echo "..."
echo ""
echo "✅ Setup complete! Images are now accessible at /images/compro/, /images/apps/, etc."
echo ""
echo "Test URL: https://seeoftunsoed.com/images/compro/logo.png"
