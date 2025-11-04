#!/bin/bash
# Quick Deployment Commands
# Copy and paste these commands directly into server SSH

# ============================================================================
# DIAGNOSIS: Check Build Files Status
# ============================================================================

# Check 1: Build files in project directory
echo "=== Checking build files in project ==="
find ~/sis/seeois/public/build -type f | wc -l
echo ""

# Check 2: Build files in public_html
echo "=== Checking build files in public_html ==="
find ~/public_html -type f ! -name ".htaccess" ! -name "error_log" | wc -l
echo ""

# Check 3: App files exist
echo "=== Checking app.js and app.css ==="
ls -lh ~/public_html/app-*.js ~/public_html/app-*.css 2>/dev/null || echo "NOT FOUND!"
echo ""

# Check 4: Verify symlink
echo "=== Checking images symlink ==="
ls -la ~/public_html/images 2>/dev/null || echo "NOT FOUND!"
echo ""

# Check 5: Verify index.php
echo "=== Checking index.php path references ==="
grep "sis/seeois" ~/public_html/index.php || echo "NOT FOUND!"
echo ""

# Check 6: Recent deploy log
echo "=== Recent Deploy Log (last 30 lines) ==="
tail -30 ~/sis/seeois/deploy.log
echo ""

# ============================================================================
# DEPLOY: Run Automated Deployment
# ============================================================================
# cd ~/sis/seeois && bash deploy.sh

# ============================================================================
# FIX: Manual Copy If Needed
# ============================================================================

# If build files need manual copy:
# cp -r ~/sis/seeois/public/build/* ~/public_html/
# cp ~/sis/seeois/public/index.php ~/public_html/
# chmod -R 755 ~/public_html

# ============================================================================
# VERIFY: Test HTTP Responses
# ============================================================================

# curl -I https://seeoftunsoed.com/app-BNtVQNrL.js
# curl -I https://seeoftunsoed.com/Login-DTX0oObo.js
# curl -I https://seeoftunsoed.com/images/compro/logo.png
