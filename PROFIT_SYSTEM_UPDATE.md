# Blaterian Stand Profit System Update (Ingredient-Based COGS)

## Ringkasan
Sebelumnya profit stand dihitung sederhana: `profit = income - expense` (total pemasukan divalidasi dikurangi total semua pengeluaran tervalidasi). Sistem baru menambahkan perhitungan berbasis resep (ingredient usage) untuk mendapatkan COGS (Cost of Goods Sold) yang lebih akurat per menu. Jika data resep tersedia, profit dihitung dari laba per menu (jumlah terjual * (harga jual - biaya bahan per unit)). Jika tidak ada data resep sama sekali untuk stand tersebut, sistem fallback ke rumus lama agar tidak memblokir operasional.

## Perilaku Stand Lama Tanpa Data Resep
1. Tidak ada baris di tabel `menu_recipe_components` yang terkait menu-menu stand → perhitungan resep mengembalikan `null`.
2. Controller / command akan fallback ke rumus lama: `stand.profit = stand.income - stand.expense`.
3. Stand tetap bisa beroperasi normal. Profit baru akan aktif setelah minimal satu menu memiliki recipe component.
4. Saat sebagian menu memiliki resep dan sebagian belum: menu tanpa resep dihitung penuh (harga jual dianggap laba kotor) sesuai implementasi saat ini. (Catatan: Bisa disempurnakan nanti dengan asumsi biaya default, dokumentasi ini menandai potensi perbaikan.)

## Tabel & Model Baru
- Migration: `2025_11_22_000001_create_menu_recipe_components_table.php`
  - Tabel: `menu_recipe_components`
  - Kolom utama: `menu_id`, `stand_expense_id` (nullable), `quantity_used`, `unit_used`.
  - Relasi:
    - `menu_id` → `foods_menu.id`
    - `stand_expense_id` → `stand_expense_item.id`
- Model: `App\Models\RecipeComponent`
  - Relasi: `menu()` (belongsTo `MenuItem`), `expense()` (belongsTo `StandExpense`).

## File yang Dipengaruhi
1. `app/Models/MenuItem.php`
   - Ditambah relasi: `recipeComponents()`.
2. `app/Services/ProfitCalculator.php`
   - Logika inti perhitungan laba berbasis resep.
3. `app/Http/Controllers/Staff/Business/StandController.php`
   - Metode: `updateStandExpense()` dan `refreshProfit()` sekarang memanggil kalkulasi baru + fallback.
   - Metode: `stand()` (detail view) men-trigger recalculation otomatis bila ada data resep.
4. `app/Http/Controllers/Staff/Business/SalesController.php`
   - Metode: `updateStandIncome()` menghitung ulang profit dengan sistem baru.
5. Artisan Command: `app/Console/Commands/RecalculateStandProfit.php`
   - Perintah: `php artisan stand:recalc-profit` untuk batch recompute.
6. Migration baru: memastikan struktur tabel untuk menyimpan data pemakaian bahan.

## Alur Perhitungan (Recipe-Based)
1. Ambil semua menu milik stand.
2. Cek apakah ada minimal satu `RecipeComponent` terkait set menu (global check). Jika tidak ada → return `null` (memicu fallback).
3. Untuk setiap menu:
   - Ambil semua recipe component + expense terkait.
   - Hitung biaya per unit menu: saat ini menggunakan formula sederhana `unit_cost += expense.price * quantity_used` (mengasumsikan `price` adalah harga satuan pembelian). **Catatan Penting:** Jika struktur expense sebenarnya menyimpan total dalam `total_price` dan jumlah satuan di `qty`, maka formula akurat seharusnya: `unit_cost += (expense.total_price / expense.qty) * quantity_used`. (Belum diterapkan di versi ini.)
   - Laba unit: `unit_profit = menu.price - unit_cost`.
   - Laba total menu: `menu.sale * unit_profit`.
4. Profit stand = penjumlahan laba total semua menu.

## Fallback Logic
- Jika fungsi `ProfitCalculator::calculateStandProfit()` mengembalikan `null`:
  - Controller / command akan mengatur profit ke `income - expense`.
- Ini mencegah stand tanpa data resep terlihat "kosong" atau profit tidak berubah.

## Command Batch
- `php artisan stand:recalc-profit` → menghitung ulang profit stand yang punya data resep.
- Opsi `--force-legacy` (bila ditambahkan) akan memaksa menyegarkan profit stand tanpa resep dengan rumus lama (sinkronisasi penuh). (Versi sekarang belum menambahkan opsi ini dalam dokumentasi, sudah ada di signature command.)

## Cara Menambahkan Data Resep
1. Pastikan expense item yang akan dijadikan bahan sudah tervalidasi (punya `operational_id > 0`).
2. Insert row ke `menu_recipe_components` dengan:
   - `menu_id` = ID menu.
   - `stand_expense_id` = ID expense item yang mewakili bahan itu (boleh null jika ingin bahan generik tanpa keterkaitan expense tertentu, tetapi biaya tidak akan dihitung).
   - `quantity_used` = jumlah pemakaian bahan per satu unit menu.
   - `unit_used` = satuan (opsional: misalnya gr, ml, pcs).
3. Buka kembali halaman detail stand atau jalankan command batch agar profit diperbarui.

### Contoh Insert Manual (SQL)
```sql
INSERT INTO menu_recipe_components (menu_id, stand_expense_id, quantity_used, unit_used, created_at, updated_at)
VALUES (12, 55, 0.05, 'kg', NOW(), NOW());
```

## Pengujian Manual
1. Buat sebuah stand dengan beberapa menu dan lakukan beberapa penjualan (menambah `sale`).
2. Tambah expense item yang tervalidasi untuk bahan-bahan menu.
3. Tambah baris resep yang menghubungkan menu ke expense item dengan porsi pemakaian.
4. Buka halaman Stand Detail → nilai profit harus berbeda dari sekedar `income - expense` jika biaya per unit signifikan.
5. Jalankan command:
```bash
php artisan stand:recalc-profit
```
6. Bandingkan hasil dengan spreadsheet acuan (laba per item & total).

## Potensi Perbaikan Lanjutan
- Gunakan rumus yang membagi `total_price / qty` untuk mengestimasi biaya per satuan bahan (bila struktur expense mendukung).
- Tambah caching agar kalkulasi berat tidak dipanggil berulang di halaman yang sama.
- Tambah field packaging cost (task TODO: migrasi packaging config) dan integrasikan ke `unit_cost`.
- Tambah indikator di UI apakah profit sedang menggunakan mode "fallback" atau "detailed".
- Tambah validasi agar menu tanpa resep tidak otomatis dihitung full revenue sebagai laba (misal tetapkan margin default atau flag incomplete).
- Tambah indikator per menu (sudah diterapkan): badge "No Ingredients" (kuning) bila belum ada komponen resep, dan badge hijau dengan jumlah bahan bila sudah terhubung.

## Ringkas Dampak Ke Sistem
| Aspek | Lama | Baru |
|-------|------|------|
| Formula dasar | income - expense | Σ(menu.sale * (menu.price - COGS unit)) |
| Granularitas biaya | Agregat | Per menu (ingredient level) |
| Stand tanpa resep | Sama seperti lama | Fallback otomatis |
| Partial coverage | Tidak ada konsep | Menu tanpa resep = full price laba (sementara) |
| Batch update | Tidak tersedia | Command artisan `stand:recalc-profit` |

## Referensi Cepat File
- Service: `app/Services/ProfitCalculator.php`
- Model baru: `app/Models/RecipeComponent.php`
- Migration: `database/migrations/2025_11_22_000001_create_menu_recipe_components_table.php`
- Controller patch: `StandController.php`, `SalesController.php`
- Command: `app/Console/Commands/RecalculateStandProfit.php`

---
_Dokumen ini menjelaskan status implementasi saat ini dan area pengembangan lanjutan untuk meningkatkan akurasi dan fleksibilitas perhitungan profit._
