#!/bin/bash

###############################################################################
# Production Deployment Script for SEEO SIS
# Location: ~/sis/seeois/deploy.sh
# Usage: bash deploy.sh
###############################################################################

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/home/seej2596/sis/seeois"
PUBLIC_HTML="/home/seej2596/public_html"
LOG_FILE="$PROJECT_DIR/deploy.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
    echo "[INFO] $1" >> "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}[✓]${NC} $1"
    echo "[SUCCESS] $1" >> "$LOG_FILE"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
    echo "[WARNING] $1" >> "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
    echo "[ERROR] $1" >> "$LOG_FILE"
}

# Start deployment
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║          🚀 SEEO SIS Production Deployment 🚀             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
log_info "Deployment started at $TIMESTAMP"
log_info "Project directory: $PROJECT_DIR"
log_info "Public HTML: $PUBLIC_HTML"
echo ""

# Check if project directory exists
if [ ! -d "$PROJECT_DIR" ]; then
    log_error "Project directory not found: $PROJECT_DIR"
    exit 1
fi

cd "$PROJECT_DIR"
log_success "Changed to project directory"

# ============================================================================
# Step 1: Pull Latest Code from GitHub
# ============================================================================
log_info "Step 1/5: Pulling latest code from GitHub..."
if git pull origin main >> "$LOG_FILE" 2>&1; then
    log_success "Code pulled successfully"
else
    log_error "Failed to pull code"
    exit 1
fi
echo ""

# Note: Steps for composer install, npm install, and npm run build are skipped
# These should be done locally before pushing to GitHub
# (Server resources are not sufficient for building)

# ============================================================================
# Step 2: Copy Build Files to public_html and Configure index.php
# ============================================================================
log_info "Step 2/5: Copying build files to public_html..."

# Remove old public_html content (keep images symlink and other important files)
if [ -d "$PUBLIC_HTML" ]; then
    log_warning "Cleaning public_html directory..."
    # Remove files except .htaccess, error_log, .gitkeep
    find "$PUBLIC_HTML" -maxdepth 1 -type f ! -name ".htaccess" ! -name "error_log" ! -name ".gitkeep" -delete 2>/dev/null || true
    # Remove directories except images (which is the symlink) - use -delete not -exec
    find "$PUBLIC_HTML" -maxdepth 1 -type d ! -name "." ! -name ".." ! -name "images" -delete 2>/dev/null || true
    log_success "Public_html cleaned"
else
    log_warning "Creating public_html directory..."
    mkdir -p "$PUBLIC_HTML"
    log_success "public_html directory created"
fi

# Copy build content to public_html
log_info "Checking build source directory: $PROJECT_DIR/public/build/"
if [ -d "$PROJECT_DIR/public/build" ]; then
    BUILD_FILE_COUNT=$(find "$PROJECT_DIR/public/build" -type f | wc -l)
    log_info "Found $BUILD_FILE_COUNT build files"
    
    # Copy with full directory structure preserved
    log_info "Copying build directory structure..."
    if cp -r "$PROJECT_DIR/public/build/." "$PUBLIC_HTML/" 2>&1 | tee -a "$LOG_FILE"; then
        log_success "Build files copied to public_html"
        
        # Verify copy was successful
        COPIED_FILE_COUNT=$(find "$PUBLIC_HTML" -type f ! -name ".htaccess" ! -name "error_log" ! -name ".gitkeep" | wc -l)
        ASSETS_COUNT=$(find "$PUBLIC_HTML/assets" -type f 2>/dev/null | wc -l)
        
        log_info "Verified $COPIED_FILE_COUNT total files in public_html"
        log_info "Found $ASSETS_COUNT files in assets folder"
        
        if [ "$ASSETS_COUNT" -lt 50 ]; then
            log_error "Assets folder appears to be empty or incomplete! Expected >50 files"
            log_error "Source: $(find "$PROJECT_DIR/public/build/assets" -type f | wc -l) files"
            exit 1
        fi
    else
        log_error "Failed to copy build files"
        exit 1
    fi
else
    log_error "Build source directory not found: $PROJECT_DIR/public/build"
    exit 1
fi

# Also copy index.php and .htaccess
if [ -f "$PROJECT_DIR/public/index.php" ]; then
    cp "$PROJECT_DIR/public/index.php" "$PUBLIC_HTML/index.php"
    log_success "index.php copied"
fi

if [ -f "$PROJECT_DIR/public/.htaccess" ]; then
    cp "$PROJECT_DIR/public/.htaccess" "$PUBLIC_HTML/.htaccess"
    log_success ".htaccess copied for URL routing"
else
    log_warning ".htaccess not found - URL routing may not work correctly"
fi

# Edit index.php to reference sis/seeois path
if [ -f "$PUBLIC_HTML/index.php" ]; then
    # Backup original index.php
    cp "$PUBLIC_HTML/index.php" "$PUBLIC_HTML/index.php.backup"
    log_success "index.php backed up"
    
    # Update path references in index.php
    # Change: require __DIR__.'/../app.php' to require '/home/seej2596/sis/seeois/bootstrap/app.php'
    sed -i "s|require __DIR__.'/../bootstrap/app.php'|require '/home/seej2596/sis/seeois/bootstrap/app.php'|g" "$PUBLIC_HTML/index.php"
    sed -i "s|require __DIR__.'/../vendor/autoload.php'|require '/home/seej2596/sis/seeois/vendor/autoload.php'|g" "$PUBLIC_HTML/index.php"
    
    log_success "index.php paths updated to reference /home/seej2596/sis/seeois/"
else
    log_error "index.php not found in public_html"
    exit 1
fi

# Set correct permissions
if chmod -R 755 "$PUBLIC_HTML"; then
    log_success "Permissions set (755) for public_html"
else
    log_warning "Could not set permissions for public_html"
fi
echo ""

# ============================================================================
# Step 3: Clear Laravel Cache & Configuration
# ============================================================================
log_info "Step 3/5: Clearing Laravel cache and configuration..."
php artisan config:clear >> "$LOG_FILE" 2>&1 && log_success "Config cleared"
php artisan view:clear >> "$LOG_FILE" 2>&1 && log_success "Views cleared"
php artisan cache:clear >> "$LOG_FILE" 2>&1 && log_success "Cache cleared"
php artisan optimize >> "$LOG_FILE" 2>&1 && log_success "Application optimized"
echo ""

# ============================================================================
# Step 4: Setup Image Symlink
# ============================================================================
log_info "Step 4/5: Setting up image symlink..."

# Remove old symlink if exists (but not the images directory itself)
if [ -L "$PUBLIC_HTML/images" ]; then
    log_warning "Removing old symlink: $PUBLIC_HTML/images"
    rm -f "$PUBLIC_HTML/images"
    log_success "Old symlink removed"
fi

# Create new symlink
if ln -s "$PROJECT_DIR/public/images" "$PUBLIC_HTML/images" 2>&1 | tee -a "$LOG_FILE"; then
    log_success "Image symlink created: $PUBLIC_HTML/images → $PROJECT_DIR/public/images"
else
    # If symlink already exists and is correct, don't fail
    if [ -L "$PUBLIC_HTML/images" ] && [ "$(readlink "$PUBLIC_HTML/images")" = "$PROJECT_DIR/public/images" ]; then
        log_success "Image symlink already exists and is correct"
    else
        log_error "Failed to create symlink"
        exit 1
    fi
fi

# Set permissions on source
if chmod -R 755 "$PROJECT_DIR/public/images" 2>/dev/null; then
    log_success "Permissions set (755) for images source"
else
    log_warning "Could not set permissions for images source"
fi
echo ""

# ============================================================================
# Step 5: Run Database Migrations
# ============================================================================
log_info "Step 5/5: Running database migrations..."
if php artisan migrate --force >> "$LOG_FILE" 2>&1; then
    log_success "Database migrations completed"
else
    log_warning "Database migrations skipped or failed (check logs)"
fi
echo ""

# ============================================================================
# Verify Deployment
# ============================================================================
log_info "Verifying deployment..."

# Check if symlink works
if [ -L "$PUBLIC_HTML/images" ]; then
    log_success "Image symlink verified"
else
    log_error "Image symlink verification failed"
    exit 1
fi

# Check if key files exist
if [ -f "$PROJECT_DIR/public/index.php" ]; then
    log_success "Laravel index.php found"
else
    log_warning "Laravel index.php not found"
fi

if [ -f "$PROJECT_DIR/public/build/manifest.json" ]; then
    log_success "Frontend build manifest found"
else
    log_warning "Frontend build manifest not found"
fi

# Verify index.php in public_html
if [ -f "$PUBLIC_HTML/index.php" ]; then
    log_success "index.php found in public_html"
    # Check if it has the correct path reference
    if grep -q "/home/seej2596/sis/seeois" "$PUBLIC_HTML/index.php"; then
        log_success "index.php correctly references sis/seeois path"
    else
        log_warning "index.php path references may need manual verification"
    fi
else
    log_error "index.php not found in public_html"
    exit 1
fi

# Verify .htaccess for URL routing
if [ -f "$PUBLIC_HTML/.htaccess" ]; then
    log_success ".htaccess found in public_html"
    if grep -q "RewriteEngine On" "$PUBLIC_HTML/.htaccess"; then
        log_success ".htaccess contains mod_rewrite rules for routing"
    else
        log_warning ".htaccess may not have routing rules configured"
    fi
else
    log_warning ".htaccess not found - routing may not work"
fi
echo ""

# ============================================================================
# Deployment Complete
# ============================================================================
END_TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
log_info "Deployment completed at $END_TIMESTAMP"
echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║           ✨ Deployment Completed Successfully! ✨          ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "📝 Log file: ${YELLOW}$LOG_FILE${NC}"
echo -e "🌐 Website: ${YELLOW}https://seeoftunsoed.com${NC}"
echo -e "📸 Images: ${YELLOW}https://seeoftunsoed.com/images/compro/logo.png${NC}"
echo ""
echo "To verify deployment:"
echo "  1. Visit https://seeoftunsoed.com"
echo "  2. Check if images load correctly"
echo "  3. Check application logs: tail -f $PROJECT_DIR/storage/logs/laravel.log"
echo ""
