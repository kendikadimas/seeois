# Dokumentasi Sistem Kasir Stand (Stand Cashier System) - SEEO

Dokumentasi ini ditujukan bagi developer selanjutnya untuk memahami alur kerja, arsitektur, dan seluk-beluk teknis dari modul **Stand Cashier** pada sistem SEEO. Modul ini merupakan fitur Point of Sales (POS) yang digunakan oleh kasir stand makanan/minuman untuk mencatat pesanan, menambahkan customer, hingga mencetak dan mengirimkan nota elektronik (receipt) via WhatsApp.

---

## 1. Arsitektur & File Utama

Sistem ini dibangun di atas stack **Laravel + Vue 3 (Inertia.js)**. Berikut adalah lokasi file-file kunci yang mengendalikan modul ini:

### 🌟 Frontend (Vue.js / Inertia)
- **`resources/js/Pages/Staff/Business/StandCashier.vue`**
  - **Fungsi:** Merupakan antarmuka utama (UI) untuk Kasir. Menangani semua interaksi pengguna seperti keranjang belanja (cart), pemilihan customer, perhitungan harga, rendering struk digital, hingga melihat riwayat transaksi hari ini.
  - **Komponen Penting:**
    - `vue-select`: Digunakan untuk mencari customer berdasarkan nomor HP.
    - `html2canvas`: Digunakan untuk mengubah elemen HTML struk (receipt) menjadi gambar `.png` agar bisa di-download.

### 🌟 Backend (Controllers)
- **`app/Http/Controllers/Staff/Business/SalesController.php`**
  - **Fungsi:** Menangani *business logic* dan validasi dari request frontend.
  - **Fungsi Utama:**
    - `insertCustomer`: Menyimpan data customer baru ke database.
    - Menangani proses penambahan transaksi (sales) dan validasi hak akses kasir.

### 🌟 Models & Database (Eloquent)
- **`app/Models/Stand.php`**: Relasi ke kasir (`cashier()` method), menu, dan sales.
- **`app/Models/StandSales.php`**: Menyimpan data histori transaksi penjualan per stand.
- **`app/Models/User.php`**: Digunakan baik untuk data *staff* (kasir) maupun *customer*. Kolom `phone` dan `name` merupakan key penting untuk mengenali customer.

---

## 2. Role & Permission (Hak Akses)

Sistem ini menerapkan validasi akses secara ketat, baik di sisi *Frontend* (untuk menyembunyikan tombol/form) maupun di *Backend* (untuk mencegah eksekusi melalui API).

- **Super Admin (`roles_id == 99`)**: Memiliki akses penuh (Bypass) ke semua stand, meskipun tidak ditugaskan sebagai kasir di stand tersebut.
- **Cashier (Kasir Khusus Stand)**: Staff biasa hanya bisa memproses transaksi dan menambah customer **jika dan hanya jika** ID mereka terdaftar pada tabel pivot/relasi kasir untuk stand tersebut (`$stand->cashier->contains('id', auth()->id())`).

*Catatan Developer: Selalu pastikan validasi backend membandingkan `id` dari koleksi object User (kasir), bukan `cashier_id`.*

---

## 3. Fitur Utama & Alur Sistem

### A. Pencatatan Transaksi (Point of Sales)
1. **Pemilihan Menu**: Kasir mengklik menu dari sisi kiri layar. Menu ditambahkan ke array keranjang `form_transaction.order`.
2. **Kalkulasi Otomatis**: Subtotal akan dijumlahkan berdasarkan harga x kuantitas. Total akhir = Subtotal - Discount.
3. **Pemilihan Pembayaran**: Kasir mengisi `Payment Price` (uang yang diterima) dan sistem menghitung kembalian (Change).

### B. Modul Customer (Pencarian & Penambahan)
Ini adalah modul yang cukup krusial dan kompleks:
1. **Pencarian**: Menggunakan komponen `v-select`. Kasir mengetikkan nomor HP.
2. **Auto-Fill Data Baru**: Jika nomor tidak ada, kasir menekan tombol plus (`+`). Modul `openNewCustomerModal()` akan aktif. State pencarian (`currentSearch.value`) diteruskan ke form agar kasir tidak perlu mengetik ulang nomor HP.
3. **Validasi Unique Backend**: Nomor handphone di-set sebagai *unique* (`unique:users,phone`) di database. Jika nomor HP sudah ada namun proses tambah customer dipaksakan, sistem akan memunculkan Toast Notification error alih-alih me-return HTTP 500 error layar putih.

### C. Digital Receipt (Struk Elektronik)
Sistem ini menggunakan fitur Receipt dinamis (tanpa printer thermal fisik):
1. **Teknologi**: Menggunakan library `html2canvas`.
2. **Mekanisme**: Komponen HTML receipt dirender di balik layar (off-screen style `left: -9999px` agar tidak merusak layout), difoto (canvas), lalu diubah menjadi base64/PNG image (`toDataURL`).
3. **Share WA**: Link gambar lokal bisa didownload. Pesan tagihan dikirim melalui WhatsApp Web API (URL `wa.me`) dengan format teks yang rapi.

### D. Today's Transactions Tab
Fitur riwayat pesanan (tab Today) untuk merekap penjualan di hari yang sama:
1. Berisi daftar pesanan, nama customer, metode pembayaran, jam transaksi, dan rincian menu.
2. Kasir bisa **mencetak/mengirim ulang struk** untuk transaksi lama dari sini dengan memanfaatkan method `openTodayReceiptModal(sale)` yang me-reuse modal print receipt yang sama.

---

## 4. Tantangan Teknis / Catatan untuk Developer Selanjutnya

Jika Anda ingin mengubah atau memperbaiki modul ini, perhatikan poin-poin berikut:

1. **Bug Pencarian `v-select` (Telah Diperbaiki)**
   *Issue sebelumnya:* Input teks dari `v-select` menghilang jika diklik di luar kotak sebelum sempat memilih.
   *Solusi saat ini:* Teks yang diketik selalu di-*track* menggunakan variabel Vue ref `currentSearch` di setiap event `@search`. Jangan hapus variabel ini saat melakukan refactor UI Customer.

2. **Inertia.js & Form Reset**
   Formulir pengiriman data (`useForm`) seperti `form_new_customer` dan `form_transaction` sangat mengandalkan lifecycle Inertia. Jangan lupa memanggil `.reset()` di dalam block `onSuccess` callback setiap proses submit (POST) selesai, agar data sisa pelanggan sebelumnya tidak tersimpan untuk transaksi berikutnya.

3. **Html2Canvas Quirks (Keterbatasan)**
   Terkadang render canvas tidak sempurna di resolusi mobile kecil jika parent div *hidden* (`display: none`). Pada implementasi saat ini, trik yang dipakai adalah men-clone elemen struk dan memindahkannya ke luar layar (posisi absolut) agar ukurannya (`width 360px`, `height 640px`) dan rendering-nya tetap sempurna tanpa dipotong oleh batasan screen layar HP kasir.

4. **Panduan Kasir (Cashier Help)**
   Terdapat komponen `cashierHelpModal` (tombol '?'). Apabila Anda merubah alur bisnis (misal: merubah cara pemotongan modal), mohon sesuaikan juga *copywriting* teks instruksi yang terdapat di dalam HTML Help Modal ini agar kasir tidak kebingungan.

---

*Dokumentasi digenerate pada Mei 2026. Prioritaskan pengecekan langsung ke script `.vue` dan `.php` karena aplikasi berjalan secara dinamis.*
