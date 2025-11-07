@echo off
echo ========================================
echo RESTARTING DEVELOPMENT ENVIRONMENT
echo ========================================
echo.

echo [1/5] Clearing Laravel cache...
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

echo.
echo [2/5] Clearing Vite cache...
if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite"
if exist ".vite" rmdir /s /q ".vite"

echo.
echo [3/5] Removing old build files...
if exist "public\build" rmdir /s /q "public\build"
if exist "public\hot" del /f /q "public\hot"

echo.
echo [4/5] Optimizing Laravel...
php artisan config:cache
php artisan route:cache

echo.
echo [5/5] Starting Vite dev server...
echo ========================================
echo  Ready! Now run: npm run dev
echo ========================================
pause
