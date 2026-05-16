# Jalankan semua tes akses role + modul extended SEEO
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

Write-Host "=== SEEO Extended Test Suite ===" -ForegroundColor Cyan

$files = @(
    "tests/Feature/RoleBasedAccessMatrixTest.php",
    "tests/Feature/Staff/NewFeaturesTest.php",
    "tests/Feature/Staff/ExtendedRolesTest.php",
    "tests/Feature/Staff/CeoFinanceRoutesTest.php",
    "tests/Feature/Staff/CashflowModuleTest.php",
    "tests/Feature/Staff/StandCashierModuleTest.php",
    "tests/Feature/Staff/FileUploadStorageTest.php",
    "tests/Feature/Staff/GoogleDriveIntegrationTest.php",
    "tests/Feature/Staff/InternshipReviewTest.php",
    "tests/Feature/Staff/DashboardTest.php",
    "tests/Feature/InternshipTest.php"
)

foreach ($f in $files) {
    Write-Host ">> $f" -ForegroundColor Yellow
    php artisan test $f
    if ($LASTEXITCODE -ne 0) {
        Write-Host "FAILED: $f" -ForegroundColor Red
        exit $LASTEXITCODE
    }
}

Write-Host "=== All extended tests passed ===" -ForegroundColor Green
