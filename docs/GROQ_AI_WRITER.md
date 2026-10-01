# Instalasi Groq AI Writer

Fitur ini membuat draf deskripsi pada halaman **Manajemen Berita & Kegiatan**. API dipanggil oleh Laravel di server sehingga API key tidak dikirim ke browser.

## 1. Buat API key Groq

1. Masuk atau daftar di [GroqCloud Console](https://console.groq.com/).
2. Buat atau pilih sebuah project.
3. Buka menu **API Keys**, pilih **Create API Key**, lalu salin key yang diberikan.
4. Simpan key di password manager karena key lengkap biasanya hanya ditampilkan saat dibuat.

## 2. Atur `.env`

Tambahkan konfigurasi berikut ke file `.env` di server aplikasi:

```dotenv
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx
GROQ_MODEL=openai/gpt-oss-120b
GROQ_BASE_URL=https://api.groq.com
GROQ_TIMEOUT=30
GROQ_MAX_COMPLETION_TOKENS=1600
GROQ_REASONING_EFFORT=low
```

Jangan memakai awalan `VITE_` pada API key dan jangan commit file `.env` ke Git. Variabel berawalan `VITE_` dapat ikut masuk ke bundle browser.

Tidak ada package Groq tambahan yang perlu diinstal. Integrasi menggunakan HTTP client bawaan Laravel.

## 3. Muat ulang konfigurasi

Jalankan dari root project:

```bash
php artisan optimize:clear
```

Jika production menggunakan config cache, jalankan kembali:

```bash
php artisan config:cache
```

## 4. Gunakan fitur

1. Login sebagai pengguna yang memiliki akses Marketing.
2. Buka **Manajemen Berita & Kegiatan** lalu tambah atau edit berita.
3. Isi judul dan bahan berita faktual pada kolom deskripsi. Kategori dan tanggal bersifat opsional.
4. Klik **Buat Konten dengan AI**.
5. Periksa dan sunting fakta pada hasil AI sebelum menyimpan atau menerbitkan berita.

Untuk hasil yang terasa seperti artikel redaksi, isi kolom deskripsi terlebih dahulu dengan bahan faktual 5W+1H: pihak yang terlibat, bentuk kegiatan, waktu, lokasi, rangkaian acara, hasil, dan kutipan jika tersedia. Minimal 40 karakter bahan berita diperlukan agar AI tidak mengisi artikel dengan asumsi atau kalimat generik.

Model dapat diganti melalui `GROQ_MODEL` tanpa mengubah kode. Gunakan ID model aktif yang tercantum di dokumentasi model Groq.

## Pemecahan masalah

- **Groq API belum dikonfigurasi**: pastikan `GROQ_API_KEY` ada pada `.env`, lalu jalankan `php artisan optimize:clear`.
- **Periksa API key dan model**: key mungkin tidak valid atau `GROQ_MODEL` tidak tersedia untuk project tersebut.
- **Batas penggunaan tercapai**: tunggu sesuai reset rate limit Groq atau periksa batas project pada GroqCloud Console.
- **Tidak dapat terhubung**: pastikan server dapat melakukan koneksi HTTPS keluar ke `api.groq.com`.
