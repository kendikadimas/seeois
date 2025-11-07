@echo off
echo ========================================
echo BUILDING FOR PRODUCTION
echo ========================================
echo.

echo [1/5] Clearing all caches...
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite"
if exist ".vite" rmdir /s /q ".vite"

echo.
echo [2/5] Removing old build...
if exist "public\build" rmdir /s /q "public\build"
if exist "public\hot" del /f /q "public\hot"

echo.
echo [3/5] Building assets with Vite...
call npm run build

echo.
echo [4/5] Optimizing Laravel...
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo.
echo [5/5] Done!
echo ========================================
echo  Production build complete!
echo ========================================
pause
