# Panduan Developer Lengkap — Blaterian SEEO

Dokumentasi ini adalah versi lengkap (onboarding + technical guide) untuk developer baru. Tujuannya membuat developer yang belum tahu apa-apa tentang sistem ini dapat:

- Memahami arsitektur keseluruhan dan bagian-bagian penting kode.
- Mengatur lingkungan pengembangan lokal dan menjalankan aplikasi.
- Menemukan file/komponen yang relevan untuk mengimplementasikan fitur baru.
- Men-debug masalah umum dan menerapkan perubahan di produksi.

Dokumen ini panjang dan terstruktur; gunakan indeks isi di bawah untuk melompat ke bagian yang Anda perlukan.

## Indeks (cepat)
- [Overview & Arsitektur](#)
- [Persyaratan & Setup Awal](#)
- [Lingkungan & Variabel ENV penting](#)
- [Database & Seeders penting](#)
- [Role & Authorization detail](#)
- [Routing, Controllers & Flow permintaan](#)
- [Frontend, Assets & SSR](#)
- [Build dan Deployment](#)
- [Testing & QA](#)
- [Debugging, Logs & Troubleshooting](#)
- [Kontribusi & Workflow pengembangan](#)
- [Appendix: File penting & quick links](#)

---

**Catatan cepat**: referensi file di repo ditulis sebagai tautan file workspace, contoh: [app/helpers.php](app/helpers.php). Gunakan tautan itu untuk membuka file langsung dari VS Code.

## 1. Overview & Arsitektur

1.1. Teknologi utama
- Backend: Laravel (PHP) — arsitektur MVC.
- Frontend: Inertia.js + Vue (single-page components) di `resources/js` dan SSR bundle di `bootstrap/ssr`.
- Build tool: Vite.
- Database: MySQL/MariaDB (dump sedia di `database/seeo.sql`).

1.2. Struktur tinggi folder
- `app/` — source PHP utama (Controllers, Models, Policies, Services, Middleware).
- `config/` — konfigurasi Laravel.
- `routes/` — definisi route (`web.php`, `auth.php`, `console.php`).
- `resources/` — Vue/JS, CSS, views.
- `database/` — migrations, seeders, SQL dump `seeo.sql`.
- `bootstrap/ssr` — bundel server-side rendering (SSR) dan assets prebuilt.

1.3. Patterns penting
- Authorization: gabungan middleware role-based dan Policy class untuk domain-specific checks.
- Helpers global di `app/helpers.php` untuk fungsi seperti `is_super_admin()`.

## 2. Persyaratan & Setup Awal (detil)

2.1. Prasyarat sistem
- PHP >= 8.1 (periksa `composer.json`).
- Composer 2.x
- Node.js >= 16, npm atau Yarn
- MySQL / MariaDB
- Git

2.2. Langkah setup lengkap (copy/paste)

```bash
# 1. Clone repo
git clone <repo-url> project && cd project

# 2. Copy env dan install PHP deps
cp .env.example .env
composer install --no-interaction --prefer-dist

# 3. Node deps dan build dev
npm install
npm run dev

# 4. Generate key & link storage
php artisan key:generate
php artisan storage:link

# 5. Import DB (opsional)
# mysql -u root -p your_db < database/seeo.sql

# 6. Seeder roles (recommended)
php artisan db:seed --class=Database\\Seeders\\CoreRoleSeeder

# 7. Jalankan server laravel
php artisan serve --host=127.0.0.1 --port=8000
```

2.3. Perintah tambahan yang berguna
- `composer dump-autoload` — regenerate autoloaders.
- `php artisan optimize:clear` — bersihkan cache config/route/view.
- `php artisan migrate` — jalankan migrasi (jika ada perubahan schema).

## 3. Lingkungan & Variabel ENV penting

Berikut variabel `.env` yang biasanya kritikal untuk pengembangan dan produksi:
- `APP_ENV`, `APP_DEBUG`, `APP_URL`
- `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
- `MAIL_MAILER`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD` — untuk email.
- `VITE_PUSHER_APP_KEY`/front-end related keys (cek `vite.config.js` jika ada).
- `SSO_*` atau `GOOGLE_*` jika menggunakan OAuth (cek `app/Http/Controllers/Auth/GoogleController.php`).

Saran: simpan contoh `.env.example` yang jelas di repo; pastikan variabel sensitif tidak dicheck-in.

## 4. Database & Seeders penting

4.1. Dump DB
- `database/seeo.sql` — dump schema + sample data; gunakan untuk membuat environment development cepat.

4.2. Seeders utama
- `database/seeders/CoreRoleSeeder.php` — menanamkan role dengan ID tetap (1,2,3,4,5,6,8,9,10,11,12,13,99). Pastikan dijalankan untuk konsistensi role checks.
- `database/seeders/AddHRManagerRoleSeeder.php` — helper seeder untuk men-set HR Manager jika belum ada.

4.3. Tabel penting (ringkasan)
- `users` — user utama, kolom `roles_id` menyimpan FK ke `roles.id`.
- `roles` — mapping id → nama role (lihat `Role` model di [app/Models/Role.php](app/Models/Role.php)).
- Tabel domain lain: `internship_applications`, `internship_certificates`, `cashflows` (atau tabel terkait finansial) — periksa folder `database/migrations/` untuk nama lengkap.

## 5. Role & Authorization (detil)

5.1. Mapping role
- Gunakan `database/seeders/CoreRoleSeeder.php` sebagai sumber kebenaran. Contoh mapping utama:

| ID | Name |
|----|------|
| 1  | Chief Executive Officer |
| 2  | Financial Officer |
| 5  | Interns |
| 6  | HR Manager |
| 99 | Super Admin |

5.2. Middleware
- `app/Http/Middleware/EnsureUserHasRole.php` — middleware generik yang menerima parameter role id(s). Super Admin (99) otomatis bypass.
- `app/Http/Middleware/CheckInternshipAccess.php` — rules akses untuk fitur internship.
- `app/Http/Middleware/CheckInternshipPic.php` — pengecualian PIC internship dan CEO.

5.3. Policies
- Domain-specific checks ditempatkan di `app/Policies` (mis. `InternshipCertificatePolicy.php`) — gunakan untuk otorisasi berbasis model.

5.4. Praktik perubahan role
- Saat menambah role baru, tambahkan record di seeder `CoreRoleSeeder` lalu seeding di environment development/production sesuai prosedur deploy.

## 6. Routing, Controllers & Request Flow

6.1. Routing
- Route utama di [routes/web.php](routes/web.php). Auth routes di [routes/auth.php](routes/auth.php).
- Banyak route di-protect dengan middleware `role:x,y` atau policies.

6.2. Contoh alur: Permintaan dashboard
- User mengakses `/dashboard` → Route mengarah ke `DashboardController@index` → controller mengumpulkan data dari service/repository → mengembalikan Inertia response ke Vue component.

6.3. Mapping penting (ringkasan contoh)
- `app/Http/Controllers/Auth` — login, logout, OAuth handlers.
- `app/Http/Controllers/Staff/SEEO/CashFlowController.php` — semua operasi cashflow: list, add, validate.
- `app/Http/Controllers/InternshipCertificateController.php` — CRUD sertifikat magang.

## 7. Frontend & SSR

7.1. Lokasi source
- Vue components: `resources/js/Pages` dan `resources/js/Components`.
- Styling: Tailwind + custom CSS di `resources/css`.

7.2. SSR
- Prebuilt SSR bundle ada di `bootstrap/ssr`. Saat deploy ke server, pastikan SSR bundle dan build assets ter-sinkron.

7.3. Cara build assets

```bash
npm run build   # produksi
npm run dev     # development (watch)
```

## 8. Build & Deployment

8.1. Script dan helper
- `build-production.bat` — Windows production build helper.
- `deploy.sh` — contoh deploy script.

8.2. Perintah produksi umum

```bash
composer install --no-dev --optimize-autoloader
npm ci && npm run build
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

8.3. Background jobs & scheduler
- Jika aplikasi menggunakan queue: pastikan `php artisan queue:work` dijalankan menggunakan supervisor/systemd.
- Scheduler: tambahkan cron entry `* * * * * php /path/artisan schedule:run >> /dev/null 2>&1`.

## 9. Testing & QA

9.1. Framework test
- Pest + PHPUnit. Contoh jalankan:

```bash
vendor/bin/pest --colors
php artisan test
```

9.2. Menulis test
- Tempatkan test feature di `tests/Feature` dan unit di `tests/Unit`.
- Gunakan model factories (jika ada) untuk membuat data uji.

## 10. Debugging, Logs & Troubleshooting

10.1. Lokasi log
- Laravel: `storage/logs/laravel.log` — periksa stack trace.

10.2. Masalah umum & solusi singkat
- Error migrasi: jalankan `php artisan migrate:status` lalu perbaiki migration conflict.
- ENV tidak ter-load: periksa `.env` dan jalankan `php artisan config:clear`.
- Assets tidak muncul: jalankan `npm run dev` atau `npm run build` dan pastikan path di template sesuai.

10.3. Debug authorization
- Tambahkan log di middleware `EnsureUserHasRole` atau gunakan `Gate::allows()` dan `dd()` untuk inspeksi cepat.

## 11. Contribution & Workflow pengembangan

11.1. Branching & commits
- Ikuti workflow Git: feature branches, PR ke `main`, deskripsi PR lengkap, target reviewer.

11.2. Code style
- Ikuti standar PSR-12 untuk PHP; gunakan `composer fix` jika tersedia atau `php-cs-fixer` bila diterapkan.

11.3. Pull request checklist
- Pastikan tests lulus.
- Jalankan `npm run build` (untuk view changes jika ada front-end change).
- Update dokumentasi jika ada perubahan API atau DB.

## Appendix — File penting & quick links

- `artisan` — CLI entry
- [composer.json](composer.json)
- [package.json](package.json)
- [routes/web.php](routes/web.php)
- [routes/auth.php](routes/auth.php)
- [app/helpers.php](app/helpers.php)
- [app/Models/Role.php](app/Models/Role.php)
- [app/Http/Middleware/EnsureUserHasRole.php](app/Http/Middleware/EnsureUserHasRole.php)
- [app/Http/Middleware/CheckInternshipAccess.php](app/Http/Middleware/CheckInternshipAccess.php)
- [database/seeo.sql](database/seeo.sql)
- [database/seeders/CoreRoleSeeder.php](database/seeders/CoreRoleSeeder.php)
- [app/Console/Commands/PromoteSuperAdmin.php](app/Console/Commands/PromoteSuperAdmin.php)

---

Jika Anda ingin, saya bisa melanjutkan dengan salah satu opsi berikut:
- `Tambah: QUICKSTART.md` di root dengan perintah singkat (CI-ready).
- `Perluas: Env reference` — saya bisa membuat `docs/ENV_REFERENCE.md` yang memuat semua variabel `.env` lengkap.
- `Generate: API endpoint list` — saya bisa memindai `routes/` dan menghasilkan tabel endpoint lengkap.

Beritahu pilihan Anda, saya akan lanjutkan.
