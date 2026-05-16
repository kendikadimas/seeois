#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "=== SEEO Extended Test Suite ==="

php artisan test tests/Feature/RoleBasedAccessMatrixTest.php
php artisan test tests/Feature/Staff/NewFeaturesTest.php
php artisan test tests/Feature/Staff/ExtendedRolesTest.php
php artisan test tests/Feature/Staff/CeoFinanceRoutesTest.php
php artisan test tests/Feature/Staff/CashflowModuleTest.php
php artisan test tests/Feature/Staff/StandCashierModuleTest.php
php artisan test tests/Feature/Staff/FileUploadStorageTest.php
php artisan test tests/Feature/Staff/GoogleDriveIntegrationTest.php
php artisan test tests/Feature/Staff/InternshipReviewTest.php
php artisan test tests/Feature/Staff/DashboardTest.php
php artisan test tests/Feature/InternshipTest.php

echo "=== All extended tests passed ==="
