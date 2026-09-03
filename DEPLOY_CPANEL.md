# Deployment SEEO ke cPanel

Panduan ini mengasumsikan cPanel menyediakan PHP 8.2+, MySQL/MariaDB, Composer, Terminal/SSH, SSL, dan Cron Jobs.

## 1. Persiapan domain dan direktori

- Buat subdomain/addon domain dan arahkan **Document Root** langsung ke folder `public` Laravel, misalnya `/home/USERNAME/seeois/public`.
- Jangan menggunakan URL yang mengandung `/public`.
- Aktifkan SSL/AutoSSL sebelum menghubungkan Google OAuth.
- Simpan source aplikasi di luar `public_html` jika memungkinkan.

Contoh struktur:

```text
/home/USERNAME/seeois/          # source Laravel
/home/USERNAME/seeois/public/   # document root domain
```

## 2. Upload dan dependency

Upload source tanpa `.env`, `node_modules`, dan `vendor`. Dari Terminal cPanel:

```bash
cd /home/USERNAME/seeois
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
```

Build frontend dapat dilakukan lokal lalu upload `public/build` dan `bootstrap/ssr`, atau pada server jika Node tersedia:

```bash
npm ci
npm run build
```

SSR tidak wajib dijalankan sebagai service; build browser di `public/build` tetap wajib tersedia.

## 3. Environment production

Salin `.env.cpanel.example` menjadi `.env`, lalu isi domain, database, SMTP, serta seluruh credential Google. Jangan upload `.env` ke repository atau membagikannya.

```bash
cp .env.cpanel.example .env
php artisan key:generate --force
```

Gunakan refresh token yang sudah dibuat, tetapi pastikan OAuth Client production memiliki URI berikut:

```text
https://DOMAIN/google/auth/callback
https://DOMAIN/google-drive/callback
```

`GOOGLE_HTTP_VERIFY` wajib `true` pada production.

## 4. Database dan storage

Buat database serta user melalui **MySQL Databases**, beri `ALL PRIVILEGES`, lalu jalankan:

```bash
php artisan migrate --force
php artisan storage:link
chmod -R 775 storage bootstrap/cache
```

Jika hosting menolak symlink, minta penyedia hosting mengaktifkannya. Jangan membuka permission `777` kecuali diarahkan penyedia hosting untuk kasus yang sangat spesifik.

## 5. Pemeriksaan dan optimasi

```bash
php artisan optimize:clear
php artisan app:deployment-check
php artisan optimize
```

Perintah pemeriksaan tidak mencetak nilai secret dan harus berakhir dengan `Production configuration is ready`.

## 6. Cron cPanel

Tambahkan cron scheduler setiap menit (sesuaikan path PHP dari menu cPanel **Terminal** atau **Select PHP Version**):

```cron
* * * * * /usr/local/bin/php /home/USERNAME/seeois/artisan schedule:run >> /dev/null 2>&1
```

Untuk queue database pada shared hosting tanpa Supervisor, tambahkan:

```cron
* * * * * /usr/local/bin/php /home/USERNAME/seeois/artisan queue:work --stop-when-empty --tries=3 --timeout=90 >> /dev/null 2>&1
```

Pada VPS, gunakan Supervisor/systemd untuk `queue:work` sebagai pengganti cron.

## 7. Google dan pemeriksaan akhir

- Aktifkan Google Drive API.
- Ubah OAuth Audience ke production dan selesaikan verifikasi Google bila scope Drive memerlukannya.
- Rotasi Client Secret lama karena sebelumnya pernah tersimpan sebagai fallback dalam source.
- Uji login biasa, login Google, upload/download Drive, email, role staff, transaksi, dan halaman `/up`.
- Pastikan `.env` tidak dapat diakses dari browser dan `APP_DEBUG=false`.

## Update berikutnya

```bash
cd /home/USERNAME/seeois
php artisan down
git pull
composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
php artisan migrate --force
php artisan optimize
php artisan queue:restart
php artisan up
```

Backup database dan file `.env` sebelum setiap update.
