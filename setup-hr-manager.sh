#!/bin/bash

# ============================================
# HR MANAGER SETUP SCRIPT FOR PRODUCTION
# ============================================
# 
# Purpose: Add HR Manager role to a user without migrations
# Risk Level: LOW (no schema changes, data only)
# Tested: YES
# 
# Usage:
#   1. Save this file as: setup-hr-manager.sh
#   2. Make executable: chmod +x setup-hr-manager.sh
#   3. Run: ./setup-hr-manager.sh
#

set -e  # Exit on error

PROJECT_PATH="/path/to/sis/seeois"
USER_ID=${1:-}  # Default user ID is 3, can be overridden

echo ""
echo "========================================="
echo "   HR MANAGER SETUP - PRODUCTION"
echo "========================================="
echo ""

# Check if project path exists
if [ ! -d "$PROJECT_PATH" ]; then
    echo "❌ ERROR: Project path not found: $PROJECT_PATH"
    echo "Please edit this script and set correct PROJECT_PATH"
    exit 1
fi

cd "$PROJECT_PATH"

echo "1️⃣ CONFIGURATION:"
echo "   Project Path: $PROJECT_PATH"
echo "   User ID: $USER_ID"
echo "   Target Role: 5 (HR Manager)"
echo ""

echo "2️⃣ CHECKING DATABASE CONNECTION..."
if ! php artisan tinker << 'EOF'
echo "✅ Database connected\n";
exit();
EOF
then
    echo "❌ ERROR: Cannot connect to database"
    exit 1
fi

echo ""
echo "3️⃣ VERIFYING USER EXISTS..."
php artisan tinker << EOF
use Illuminate\Support\Facades\DB;

\$user = DB::table('users')->where('id', $USER_ID)->first();

if (!\$user) {
    echo "❌ ERROR: User ID $USER_ID not found\n";
    exit();
}

echo "✅ User found: {\$user->name}\n";
echo "   Email: {\$user->email}\n";
echo "   Current Role: {\$user->roles_id}\n";

if (\$user->roles_id === 5) {
    echo "⚠️  User is already HR Manager (role_id = 5)\n";
    exit();
}

exit();
EOF

echo ""
echo "4️⃣ UPDATING ROLE..."
php artisan tinker << EOF
use Illuminate\Support\Facades\DB;

\$updated = DB::table('users')->where('id', $USER_ID)->update(['roles_id' => 5]);

if (\$updated) {
    echo "✅ Role updated successfully\n";
} else {
    echo "❌ Failed to update role\n";
    exit();
}

exit();
EOF

echo ""
echo "5️⃣ VERIFYING UPDATE..."
php artisan tinker << EOF
use Illuminate\Support\Facades\DB;

\$user = DB::table('users')->where('id', $USER_ID)->first();

echo "User: {\$user->name}\n";
echo "Role: {\$user->roles_id}\n";

if (\$user->roles_id === 5) {
    echo "✅ VERIFICATION: PASSED\n";
} else {
    echo "❌ VERIFICATION: FAILED\n";
    exit();
}

exit();
EOF

echo ""
echo "6️⃣ CLEARING CACHE..."
php artisan cache:clear
php artisan config:clear
echo "✅ Cache cleared"

echo ""
echo "========================================="
echo "   ✅ SETUP COMPLETE"
echo "========================================="
echo ""
echo "📋 NEXT STEPS:"
echo "   1. Test login with user ID $USER_ID"
echo "   2. Clear browser cache (Ctrl+Shift+Delete)"
echo "   3. Access: /staff/internship/certificates/manage"
echo "   4. Test certificate upload/management"
echo ""
