import { computed, ref, unref, useSSRContext, watch, onMounted, nextTick, withCtx, createVNode } from "vue";
import { ssrRenderTeleport, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderComponent, ssrRenderSlot, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./ModalConfirmation-CaKJYApU.js";
import { usePage, Head } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const ROLE_WORKFLOWS = {
  // 99: Super Admin
  99: {
    id: 99,
    title: "Super Admin",
    alias: "Administrator Utama",
    category: "Eksekutif & Tata Kelola Sistem",
    theme: {
      badgeClass: "bg-danger-subtle text-danger border border-danger-subtle",
      accentColor: "#dc2626",
      gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
      iconBg: "bg-danger text-white",
      lightBg: "#fef2f2"
    },
    icon: "bi-shield-lock-fill",
    mission: "Akses penuh ke seluruh konfigurasi sistem, audit log, perbaikan data, tata kelola tahun periode, serta pemantauan menyeluruh seluruh modul organisasi.",
    steps: [
      {
        step: 1,
        title: "Periksa Diagnostik & Konfigurasi Sistem",
        desc: "Pantau status cloud storage Google Drive, log server, dan kesehatan database aplikasi.",
        route: "super.admin.panel",
        btnText: "Buka Super Admin Panel",
        icon: "bi-hdd-network"
      },
      {
        step: 2,
        title: "Tata Kelola Periode & Penugasan Staf",
        desc: "Kelola pergantian tahun kepengurusan aktif, promosi jabatan, dan demosi di CEO Panel.",
        route: "ceo.panel",
        btnText: "Buka CEO Panel",
        icon: "bi-calendar-check"
      },
      {
        step: 3,
        title: "Audit Hak Akses & Akun Pegawai",
        desc: "Kelola pendaftaran staf baru, pengaturan level remunerasi, dan assign role pengguna.",
        route: "role",
        btnText: "Buka Manajemen Pegawai",
        icon: "bi-people"
      },
      {
        step: 4,
        title: "Pemantauan Bisnis & Kas Organisasi",
        desc: "Pantau perkembangan omzet stand, stok produk goods, serta cashflow organisasi.",
        route: "blaterian.insight",
        btnText: "Buka Business Insight",
        icon: "bi-graph-up-arrow"
      }
    ],
    quickActions: [
      { title: "Super Admin Panel", route: "super.admin.panel", icon: "bi-shield-check", color: "danger" },
      { title: "CEO Panel", route: "ceo.panel", icon: "bi-award", color: "primary" },
      { title: "Data Pegawai & Role", route: "role", icon: "bi-person-gear", color: "indigo" },
      { title: "Operating Panel", route: "operating.panel", icon: "bi-clipboard2-data", color: "warning" },
      { title: "Cashflow Finansial", route: "finance", icon: "bi-cash-coin", color: "success" },
      { title: "Insight Bisnis", route: "blaterian.insight", icon: "bi-bar-chart-line", color: "info" }
    ],
    glossary: [
      { term: "Governance Year", desc: "Tahun kepengurusan aktif yang menjadi filter utama seluruh data program kerja, stand, dan staf." },
      { term: "Promote / Demote", desc: "Fitur untuk menaikkan user umum menjadi staf atau menurunkan staf kembali menjadi user biasa." },
      { term: "Role Capabilities", desc: "Izin spesifik (seperti menu.manage, finance.manage) yang melekat otomatis berdasarkan nomor role pengguna." }
    ],
    faqs: [
      { q: "Bagaimana jika user baru mendaftar tetapi belum muncul di menu staf?", a: 'Buka menu "User & Employee" atau "CEO Panel", cari akun tersebut di daftar pemohon/unemployee, lalu klik tombol Promote / Recruit untuk menetapkan rolenya.' },
      { q: "Bagaimana cara membuka tahun kepengurusan baru?", a: "Masuk ke menu CEO Panel -> Bagian Governance Year, klik Tambah Tahun Baru, lalu aktifkan switch tahun tersebut." }
    ]
  },
  // 1: Chief Executive Officer (CEO)
  1: {
    id: 1,
    title: "Chief Executive Officer",
    alias: "Ketua Umum / Direktur Utama",
    category: "Pimpinan Tertinggi Organisasi",
    theme: {
      badgeClass: "bg-primary-subtle text-primary border border-primary-subtle",
      accentColor: "#2563eb",
      gradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
      iconBg: "bg-primary text-white",
      lightBg: "#eff6ff"
    },
    icon: "bi-award-fill",
    mission: "Memimpin arah strategis organisasi, mengawasi seluruh departemen, menyetujui program kerja tahunan, serta menetapkan struktur organisasi kepengurusan.",
    steps: [
      {
        step: 1,
        title: "Tinjau Struktur Organisasi & Departemen",
        desc: "Pastikan seluruh kepala departemen dan staf sudah teralokasi dengan benar pada periode aktif saat ini.",
        route: "structural",
        btnText: "Buka Struktural",
        icon: "bi-diagram-3"
      },
      {
        step: 2,
        title: "Evaluasi Program Kerja & Logbook",
        desc: "Pantau ketercapaian target program kerja dan rekap aktivitas harian yang dilaporkan anggota.",
        route: "structural",
        btnText: "Lihat Program Departemen",
        icon: "bi-calendar3-range"
      },
      {
        step: 3,
        title: "Pengawasan Bisnis & Keuangan",
        desc: "Tinjau performa finansial organisasi dan kemajuan unit bisnis makanan & merchandise Blaterian.",
        route: "blaterian.insight",
        btnText: "Buka Business Insight",
        icon: "bi-graph-up"
      },
      {
        step: 4,
        title: "Kelola Pengumuman (Billboard) & Dokumen",
        desc: "Unggah pengumuman penting di dashboard dan pin dokumen regulasi organisasi untuk seluruh staf.",
        route: "pinneddoc.index",
        btnText: "Kelola Pinned Docs",
        icon: "bi-pin-angle"
      }
    ],
    quickActions: [
      { title: "CEO Panel", route: "ceo.panel", icon: "bi-award", color: "primary" },
      { title: "Struktur Organisasi", route: "structural", icon: "bi-diagram-3", color: "info" },
      { title: "Kelola Staf & Akun", route: "role", icon: "bi-person-badge", color: "secondary" },
      { title: "Dokumen Sematan (SK/SOP)", route: "pinneddoc.index", icon: "bi-pin-angle", color: "dark" },
      { title: "Laporan Cashflow", route: "finance", icon: "bi-cash-stack", color: "success" },
      { title: "Insight Bisnis Blaterian", route: "blaterian.insight", icon: "bi-pie-chart", color: "warning" }
    ],
    glossary: [
      { term: "Struktural", desc: "Bagan organisasi yang memetakan Departemen, Manajer, Staf pelaksana, dan Program Kerja terkait." },
      { term: "Pinned Docs", desc: "Dokumen penting (AD/ART, SK, Pedoman) yang disematkan agar dapat diunduh oleh seluruh staf dari dashboard." },
      { term: "Billboard", desc: "Banner visual/teks pengumuman utama yang tampil di carousel dashboard staf." }
    ],
    faqs: [
      { q: "Bagaimana cara menambahkan manajer baru ke suatu departemen?", a: 'Buka menu "Struktural", pilih departemen yang dituju, klik tombol Edit Departemen, lalu pilih staf yang akan dijadikan Manager.' },
      { q: "Bagaimana membuat pengumuman billboard baru?", a: 'Di halaman Dashboard, klik tombol "+ Tambah Billboard" di atas carousel banner, lalu upload gambar atau teks pengumuman.' }
    ]
  },
  // 2: Financial Officer
  2: {
    id: 2,
    title: "Financial Officer",
    alias: "Bendahara Umum / Keuangan",
    category: "Pengelola Keuangan Organisasi",
    theme: {
      badgeClass: "bg-success-subtle text-success border border-success-subtle",
      accentColor: "#059669",
      gradient: "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
      iconBg: "bg-success text-white",
      lightBg: "#f0fdf4"
    },
    icon: "bi-cash-coin",
    mission: "Bertanggung jawab penuh atas pembukuan kas masuk/keluar, validasi nota pengeluaran departemen, pencairan anggaran program, serta pengelolaan payroll staf.",
    steps: [
      {
        step: 1,
        title: "Periksa Dokumen Menunggu Validasi (Pending)",
        desc: "Tinjau bukti kuitansi iuran, nota belanja program kerja, dan surat permohonan pencairan dana yang diajukan departemen.",
        route: "finance.pending",
        btnText: "Buka Pending Validation",
        icon: "bi-clock-history"
      },
      {
        step: 2,
        title: "Catat Arus Kas Masuk & Keluar (Cashflow)",
        desc: "Input transaksi penerimaan dana hibah/usaha dan pengeluaran operasional organisasi secara akurat.",
        route: "finance",
        btnText: "Buka Buku Kas (Cashflow)",
        icon: "bi-journal-check"
      },
      {
        step: 3,
        title: "Kelola Iuran Staf & Penggajian (Payroll)",
        desc: "Pantau iuran wajib anggota dan kelola perhitungan saldo payroll berdasarkan level kontribusi staf.",
        route: "finance.feature",
        btnText: "Buka Contribution & Payroll",
        icon: "bi-wallet2"
      }
    ],
    quickActions: [
      { title: "Pending Validation", route: "finance.pending", icon: "bi-clipboard-check", color: "danger" },
      { title: "Buku Kas (Cashflow)", route: "finance", icon: "bi-cash-stack", color: "success" },
      { title: "Iuran & Payroll", route: "finance.feature", icon: "bi-stars", color: "primary" },
      { title: "Struktural Anggaran", route: "structural", icon: "bi-diagram-3", color: "info" }
    ],
    glossary: [
      { term: "Disbursement Item", desc: "Item pencairan dana dari kas bendahara kepada penanggung jawab program kerja." },
      { term: "Expense Item (Belanja)", desc: "Realisasi belanja barang/jasa yang wajib disertai unggahan foto kuitansi/nota sah." },
      { term: "Contribution (Iuran Staf)", desc: "Iuran wajib pengurus yang dibayarkan staf tiap bulan untuk mendukung kas organisasi." }
    ],
    faqs: [
      { q: "Bagaimana cara memvalidasi nota belanja dari program kerja?", a: 'Buka menu "Pending Validation", pilih tab "Expense Items", klik tombol mata untuk melihat foto struk, lalu klik tanda centang hijau untuk memvalidasi.' },
      { q: "Apakah saldo cashflow terpotong otomatis saat pencairan disetujui?", a: "Ya, sistem secara otomatis memperbarui saldo buku kas begitu item disbursement divalidasi oleh Financial Officer." }
    ]
  },
  // 3: Operational Officer (COO)
  3: {
    id: 3,
    title: "Operational Officer",
    alias: "COO / Manajer Operasional",
    category: "Operasional Lapangan & Unit Bisnis",
    theme: {
      badgeClass: "bg-warning-subtle text-warning-emphasis border border-warning-subtle",
      accentColor: "#d97706",
      gradient: "linear-gradient(135deg, #78350f 0%, #d97706 100%)",
      iconBg: "bg-warning text-dark",
      lightBg: "#fffbeb"
    },
    icon: "bi-gear-wide-connected",
    mission: "Mengawasi berjalannya seluruh unit usaha makanan Blaterian Foods, memvalidasi logbook aktivitas harian seluruh staf, serta memvalidasi nota dan closing kasir stand.",
    steps: [
      {
        step: 1,
        title: "Validasi Logbook Harian Staf",
        desc: "Buka Operating Panel untuk memeriksa dan memvalidasi laporan aktivitas harian yang diisi oleh seluruh anggota.",
        route: "operating.panel",
        btnText: "Buka Operating Panel",
        icon: "bi-journal-check"
      },
      {
        step: 2,
        title: "Kelola Stand Makanan & Personil",
        desc: "Pantau stand makanan yang aktif, atur staf produksi (dapur/bar), dan tentukan staf kasir yang bertugas.",
        route: "food.stand",
        btnText: "Buka Manajemen Stand",
        icon: "bi-shop"
      },
      {
        step: 3,
        title: "Validasi Pengeluaran Stand & Hasil Penjualan",
        desc: "Masuk ke detail stand untuk memvalidasi kuitansi belanja bahan baku harian dan laporan omzet penjualan kasir.",
        route: "food.stand",
        btnText: "Cek Detail Stand",
        icon: "bi-check2-circle"
      },
      {
        step: 4,
        title: "Tarik Saldo Stand yang Sudah Bersih",
        desc: "Lakukan penarikan saldo stand yang sudah tervalidasi untuk disetorkan ke kas pusat organisasi.",
        route: "food.balance",
        btnText: "Buka Saldo Stand Makanan",
        icon: "bi-bank"
      }
    ],
    quickActions: [
      { title: "Operating Panel (Logbook)", route: "operating.panel", icon: "bi-check2-square", color: "warning" },
      { title: "Manajemen Stand Makanan", route: "food.stand", icon: "bi-shop-window", color: "primary" },
      { title: "Saldo Stand Foods", route: "food.balance", icon: "bi-currency-exchange", color: "success" },
      { title: "Distribusi Pesanan", route: "staff.sales-distribution.index", icon: "bi-cart-check", color: "info" }
    ],
    glossary: [
      { term: "Lock Menu", desc: "Mengunci menu pada stand agar kasir tidak dapat mengubah harga atau deskripsi secara sepihak." },
      { term: "Validation Struk Stand", desc: "Tindakan COO memeriksa foto bukti struk belanja bahan baku stand sebelum nilainya diakui sebagai pengeluaran resmi." },
      { term: "Withdraw Saldo", desc: "Proses penarikan keuntungan stand setelah semua pendapatan dan beban belanja disetujui." }
    ],
    faqs: [
      { q: "Bagaimana cara menentukan staf kasir untuk suatu stand?", a: 'Masuk ke menu "Stand Management" -> klik stand yang bersangkutan -> klik tombol "Atur Petugas Stand" untuk memilih staf kasir dan staf produksi.' },
      { q: "Kapan saldo stand bisa ditarik?", a: "Saldo stand dapat ditarik setelah seluruh transaksi penjualan dan nota belanja pada hari tersebut sudah divalidasi oleh COO." }
    ]
  },
  // 10: Sales Distribution / Kasir Stand
  10: {
    id: 10,
    title: "Sales Distribution",
    alias: "Kasir & Distribusi Penjualan",
    category: "Pelayanan Transaksi Konsumen",
    theme: {
      badgeClass: "bg-info-subtle text-info border border-info-subtle",
      accentColor: "#0284c7",
      gradient: "linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)",
      iconBg: "bg-info text-white",
      lightBg: "#f0f9ff"
    },
    icon: "bi-cart-check-fill",
    mission: "Melayani transaksi pemesanan konsumen di stand makanan/minuman, mencatat pembayaran tunai/QRIS, serta menandai status pengantaran pesanan.",
    steps: [
      {
        step: 1,
        title: "Buka Mesin Kasir Stand",
        desc: "Pilih stand yang Anda tugaskan, lalu buka antarmuka POS Kasir untuk melayani pesanan pembeli.",
        route: "food.stand",
        btnText: "Pilih Stand & Buka Kasir",
        icon: "bi-calculator"
      },
      {
        step: 2,
        title: "Input Pesanan & Cetak / Catat Pembayaran",
        desc: "Pilih item menu pesanan pelanggan, tentukan dine-in atau delivery, dan konfirmasi metode pembayaran.",
        route: "food.stand",
        btnText: "Masuk ke POS Stand",
        icon: "bi-receipt"
      },
      {
        step: 3,
        title: "Tandai Pengantaran Pesanan (Delivery)",
        desc: "Buka Sales Distribution untuk menandai pesanan delivery yang sudah selesai diserahkan ke pelanggan.",
        route: "staff.sales-distribution.index",
        btnText: "Buka Sales Distribution",
        icon: "bi-box-seam"
      }
    ],
    quickActions: [
      { title: "POS Kasir Stand", route: "food.stand", icon: "bi-calculator", color: "info" },
      { title: "Sales Distribution (Delivery)", route: "staff.sales-distribution.index", icon: "bi-cart-check", color: "primary" },
      { title: "Wawasan Penjualan", route: "blaterian.insight", icon: "bi-graph-up", color: "success" }
    ],
    glossary: [
      { term: "POS Kasir", desc: "Layar input penjualan yang dirancang cepat untuk menambahkan pesanan, menghitung total, dan memotong stok otomatis." },
      { term: "Deliver Order", desc: "Tombol untuk mengubah status pesanan antar menjadi terkirim (delivered)." }
    ],
    faqs: [
      { q: "Bagaimana jika stand saya belum memiliki tombol kasir?", a: "Pastikan nama Anda sudah didaftarkan sebagai petugas kasir oleh Operational Officer (COO) pada stand tersebut." },
      { q: "Apakah pembayaran DANA/QRIS otomatis tercatat?", a: "Ya, pastikan bukti bayar konsumen telah sesuai sebelum menekan tombol Selesaikan Transaksi." }
    ]
  },
  // 11: Production
  11: {
    id: 11,
    title: "Production Team",
    alias: "Tim Dapur & Bar / Produksi",
    category: "Pengolahan & Manajemen Stok",
    theme: {
      badgeClass: "bg-teal-subtle text-teal border border-teal-subtle",
      accentColor: "#0d9488",
      gradient: "linear-gradient(135deg, #134e4a 0%, #0d9488 100%)",
      iconBg: "bg-secondary text-white",
      lightBg: "#f0fdfa"
    },
    icon: "bi-tools",
    mission: "Menyusun komponen resep produk, memperbarui jumlah porsi fisik yang tersedia (stok), serta mengontrol ketersediaan menu di etalase kasir/publik.",
    steps: [
      {
        step: 1,
        title: "Buka Production Panel",
        desc: "Pantau status seluruh menu pada stand produksi Anda (stok siap jual, status terbit, dan peringatan stok habis).",
        route: "staff.production.panel.index",
        btnText: "Buka Production Panel",
        icon: "bi-columns-gap"
      },
      {
        step: 2,
        title: "Perbarui Stok Fisik Menu Harian",
        desc: "Update jumlah porsi menu yang telah selesai diproduksi di dapur/bar agar kasir dapat menjualnya.",
        route: "staff.production.panel.index",
        btnText: "Update Stok Menu",
        icon: "bi-boxes"
      },
      {
        step: 3,
        title: "Kelola Resep & Status Publikasi",
        desc: "Tambahkan komponen bahan baku pada menu dan ubah status menjadi Publish (Tersedia) atau Unpublish jika bahan habis.",
        route: "staff.sales-distribution.index",
        btnText: "Kelola Resep Menu",
        icon: "bi-card-checklist"
      }
    ],
    quickActions: [
      { title: "Production Panel (Stok)", route: "staff.production.panel.index", icon: "bi-tools", color: "teal" },
      { title: "Resep & Menu Board", route: "staff.sales-distribution.index", icon: "bi-card-list", color: "primary" },
      { title: "Stand Makanan", route: "food.stand", icon: "bi-shop", color: "info" }
    ],
    glossary: [
      { term: "Production Panel", desc: "Dashboard khusus tim dapur untuk menyesuaikan stok real-time dan mengaktifkan ketersediaan menu." },
      { term: "Recipe Component", desc: "Daftar takaran bahan baku (misal: gramasi kopi, susu) yang digunakan dalam satu porsi menu." },
      { term: "Publish Toggle", desc: "Sakelar untuk menampilkan atau menyembunyikan menu dari katalog pemesanan pelanggan." }
    ],
    faqs: [
      { q: "Bagaimana cara menonaktifkan menu yang mendadak habis bahan bakunya?", a: 'Di Production Panel, klik tombol toggle "Publish" pada kartu menu terkait agar otomatis berstatus Nonaktif di kasir.' },
      { q: "Kenapa stok menu berkurang sendiri?", a: "Stok menu berkurang secara otomatis setiap kali kasir menyelesaikan transaksi penjualan produk tersebut." }
    ]
  },
  // 6: HR Manager
  6: {
    id: 6,
    title: "HR Manager",
    alias: "Kepala SDM / Personalia",
    category: "Pengelolaan Sumber Daya Manusia",
    theme: {
      badgeClass: "bg-purple-subtle text-purple border border-purple-subtle",
      accentColor: "#7c3aed",
      gradient: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
      iconBg: "bg-purple text-white",
      lightBg: "#faf5ff"
    },
    icon: "bi-people-fill",
    mission: "Mengelola perekrutan staf & anak magang, meninjau berkas pendaftaran internship, memantau hari ulang tahun anggota, serta menerbitkan sertifikat resmi.",
    steps: [
      {
        step: 1,
        title: "Review Berkas Pendaftar Magang (Internship)",
        desc: "Periksa formulir dan CV calon intern yang masuk, lalu tentukan keputusan (Diterima / Ditolak / Wawancara).",
        route: "internship.applications.index",
        btnText: "Review Lamaran Magang",
        icon: "bi-person-lines-fill"
      },
      {
        step: 2,
        title: "Pantau Ulang Tahun Staf Bulan Ini",
        desc: "Cek daftar anggota yang berulang tahun bulan ini untuk penyampaian apresiasi dan poster ucapan.",
        route: "hr.birthdays",
        btnText: "Lihat Kalender Ulang Tahun",
        icon: "bi-balloon"
      },
      {
        step: 3,
        title: "Kelola & Terbitkan Sertifikat Magang",
        desc: "Generate nomor sertifikat, isi nilai/keterangan, dan terbitkan e-sertifikat yang dapat diunduh langsung oleh peserta magang.",
        route: "certificate.manage",
        btnText: "Kelola Sertifikat",
        icon: "bi-award"
      },
      {
        step: 4,
        title: "Perekrutan & Update Data Pegawai",
        desc: "Rekrut pengguna baru menjadi staf organisasi dan kelola penetapan peran kerja mereka.",
        route: "role",
        btnText: "Manajemen Pegawai",
        icon: "bi-person-badge"
      }
    ],
    quickActions: [
      { title: "Lamaran Magang", route: "internship.applications.index", icon: "bi-briefcase", color: "purple" },
      { title: "Sertifikat Magang", route: "certificate.manage", icon: "bi-award", color: "primary" },
      { title: "Ulang Tahun Staf", route: "hr.birthdays", icon: "bi-balloon", color: "danger" },
      { title: "Data Pegawai", route: "role", icon: "bi-people", color: "info" }
    ],
    glossary: [
      { term: "Internship Decision", desc: "Keputusan resmi penerimaan calon anak magang yang tercatat di database sistem." },
      { term: "Certificate Generator", desc: "Alat otomatis pembuat PDF sertifikat kelulusan magang dengan kode verifikasi unik." }
    ],
    faqs: [
      { q: "Bagaimana cara menerbitkan sertifikat untuk anak magang?", a: 'Buka menu "Certificates", klik tombol Tambah Sertifikat, pilih nama intern yang bersangkutan, lalu simpan untuk mengenerate link unduh.' },
      { q: "Di mana peserta magang bisa mengunduh sertifikatnya?", a: 'Peserta magang cukup login ke akunnya, lalu membuka menu "Sertifikat Saya" di portal intern.' }
    ]
  },
  // 9 & 100: Marketing Medinfo & Marketing Administrator
  9: {
    id: 9,
    title: "Marketing Medinfo",
    alias: "Media & Informasi / Publikasi",
    category: "Konten Website, Berita & Seminar",
    theme: {
      badgeClass: "bg-pink-subtle text-pink border border-pink-subtle",
      accentColor: "#db2777",
      gradient: "linear-gradient(135deg, #831843 0%, #db2777 100%)",
      iconBg: "bg-danger text-white",
      lightBg: "#fdf2f8"
    },
    icon: "bi-megaphone-fill",
    mission: "Mengelola tampilan website profil publik, mempublikasikan liputan berita kegiatan organisasi, memperbarui bagan kepengurusan, serta mengelola pendaftaran seminar nasional.",
    steps: [
      {
        step: 1,
        title: "Kelola Konten Halaman Web (Marketing CMS)",
        desc: "Ubah teks sambutan, visi misi, foto galeri, dan banner pada landing page utama SEEO.",
        route: "marketing.cms",
        btnText: "Buka Marketing CMS",
        icon: "bi-laptop"
      },
      {
        step: 2,
        title: "Publikasikan Berita & Kegiatan Terbaru",
        desc: "Unggah artikel liputan agenda organisasi lengkap dengan foto dokumentasi agar tayang di website publik.",
        route: "marketing.activities.index",
        btnText: "Kelola Berita & Kegiatan",
        icon: "bi-newspaper"
      },
      {
        step: 3,
        title: "Kelola Pendaftaran Seminar Nasional",
        desc: "Buka pendaftaran event seminar, pantau data peserta yang mendaftar, dan ekspor daftar hadir ke format Excel.",
        route: "staff.seminar.registrations.index",
        btnText: "Buka Registrasi Seminar",
        icon: "bi-easel"
      }
    ],
    quickActions: [
      { title: "Marketing CMS (Web)", route: "marketing.cms", icon: "bi-megaphone", color: "pink" },
      { title: "Berita & Aktivitas", route: "marketing.activities.index", icon: "bi-newspaper", color: "primary" },
      { title: "Struktur Web Publik", route: "marketing.structures.index", icon: "bi-diagram-2", color: "info" },
      { title: "Pendaftaran Seminar", route: "staff.seminar.registrations.index", icon: "bi-easel", color: "warning" }
    ],
    glossary: [
      { term: "Marketing CMS", desc: "Panel pengaturan visual untuk mengedit konten teks dan media website company profile tanpa coding." },
      { term: "Seminar Export", desc: "Fitur untuk mengunduh seluruh data peserta pendaftar seminar nasional ke format Microsoft Excel." }
    ],
    faqs: [
      { q: "Bagaimana cara menambahkan berita kegiatan baru?", a: 'Buka menu "Activities & News", klik tombol "+ Tambah Kegiatan", isi judul, tanggal, deskripsi, dan upload foto banner utama.' },
      { q: "Di mana letak formulir pendaftaran seminar publik?", a: "Link registrasi publik otomatis dibuat saat Anda menambahkan event baru di menu Seminar Registrations." }
    ]
  },
  // 13: IWP PIC
  13: {
    id: 13,
    title: "IWP PIC",
    alias: "Penanggung Jawab Iuran Wajib Pengurus",
    category: "Verifikasi Iuran Anggota",
    theme: {
      badgeClass: "bg-emerald-subtle text-emerald border border-emerald-subtle",
      accentColor: "#059669",
      gradient: "linear-gradient(135deg, #064e3b 0%, #10b981 100%)",
      iconBg: "bg-success text-white",
      lightBg: "#ecfdf5"
    },
    icon: "bi-receipt-cutoff",
    mission: "Memeriksa bukti transfer Iuran Wajib Pengurus (IWP) yang diunggah oleh seluruh staf dan memvalidasi keabsahan pembayarannya setiap bulan.",
    steps: [
      {
        step: 1,
        title: "Buka Panel Validasi IWP",
        desc: "Pantau daftar bukti transfer iuran yang masuk dan masih berstatus pending.",
        route: "iwp.receipts",
        btnText: "Buka Validasi Pembayaran IWP",
        icon: "bi-receipt"
      },
      {
        step: 2,
        title: "Periksa Foto Struk & Nominal Pembayaran",
        desc: "Cocokkan nominal transfer dengan jumlah bulan iuran yang dipilih oleh staf pengunggah.",
        route: "iwp.receipts",
        btnText: "Cek Antrean Struk",
        icon: "bi-eye"
      },
      {
        step: 3,
        title: "Setujui / Validasi Bukti Pembayaran",
        desc: "Klik tombol centang hijau untuk memvalidasi pembayaran agar status iuran anggota di profilnya menjadi Lunas.",
        route: "iwp.receipts",
        btnText: "Validasi Struk Sekarang",
        icon: "bi-check-circle"
      }
    ],
    quickActions: [
      { title: "Panel Validasi IWP", route: "iwp.receipts", icon: "bi-receipt", color: "success" },
      { title: "Profil & IWP Saya", route: "profile.edit", icon: "bi-wallet2", color: "primary" }
    ],
    glossary: [
      { term: "IWP (Iuran Wajib Pengurus)", desc: "Kewajiban kontribusi kas bulanan dari setiap staf aktif SEEOIS." },
      { term: "Validasi IWP", desc: "Persetujuan resmi PIC bahwa dana transfer telah benar-benar masuk ke rekening kas organisasi." }
    ],
    faqs: [
      { q: "Bagaimana jika staf salah mengunggah foto struk?", a: "Anda dapat menolak bukti transfer tersebut dan meminta staf bersangkutan mengunggah ulang melalui menu Profil -> Pembayaran IWP miliknya." }
    ]
  },
  // 4: Staff Member
  4: {
    id: 4,
    title: "Staff Member",
    alias: "Staf / Anggota Organisasi",
    category: "Aktivitas Harian Anggota",
    theme: {
      badgeClass: "bg-slate-subtle text-slate border border-slate-subtle",
      accentColor: "#475569",
      gradient: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
      iconBg: "bg-dark text-white",
      lightBg: "#f8fafc"
    },
    icon: "bi-person-workspace",
    mission: "Menjalankan program kerja sesuai departemen, mengisi logbook aktivitas kegiatan harian, serta melunasi Iuran Wajib Pengurus (IWP).",
    steps: [
      {
        step: 1,
        title: "Unggah Logbook Aktivitas Harian",
        desc: "Laporkan kegiatan, rapat, atau progres program kerja yang Anda kerjakan hari ini agar dapat divalidasi oleh COO.",
        route: "profile.edit",
        hash: "#logbook-upload",
        btnText: "Isi Logbook Hari Ini",
        icon: "bi-journal-arrow-up"
      },
      {
        step: 2,
        title: "Bayar Iuran Wajib Pengurus (IWP)",
        desc: "Unggah bukti transfer pembayaran iuran bulanan Anda untuk diverifikasi oleh PIC IWP.",
        route: "profile.edit",
        hash: "#iwp-payment",
        btnText: "Unggah Bukti IWP",
        icon: "bi-wallet2"
      },
      {
        step: 3,
        title: "Cek Struktur & Program Kerja Departemen",
        desc: "Lihat susunan tim Anda, jadwal program kerja, serta berkas lampiran yang dibagikan organisasi.",
        route: "structural",
        btnText: "Buka Departemen Saya",
        icon: "bi-diagram-3"
      }
    ],
    quickActions: [
      { title: "Upload Logbook", route: "profile.edit", hash: "#logbook-upload", icon: "bi-journal-arrow-up", color: "primary" },
      { title: "Pembayaran IWP", route: "profile.edit", hash: "#iwp-payment", icon: "bi-wallet2", color: "success" },
      { title: "Struktur Organisasi", route: "structural", icon: "bi-diagram-3", color: "info" },
      { title: "Edit Profil Saya", route: "profile.edit", icon: "bi-person-gear", color: "secondary" }
    ],
    glossary: [
      { term: "Logbook Harian", desc: "Formulir laporan mandiri berisi tanggal, jam mulai-selesai, uraian kegiatan, dan foto bukti pelaksanaan." },
      { term: 'Status Logbook "Valid"', desc: "Tanda bahwa laporan kerja Anda sudah disetujui secara resmi oleh Operational Officer." }
    ],
    faqs: [
      { q: "Kapan batas akhir pengisian logbook?", a: "Logbook sebaiknya diisi setiap selesai melakukan kegiatan organisasi agar tidak menumpuk di akhir bulan." },
      { q: "Bagaimana mengetahui apakah pembayaran IWP saya sudah lunas?", a: "Buka halaman Profil Anda, gulir ke bagian Status IWP. Jika kotak bulan berwarna hijau dengan tanda centang, berarti pembayaran Anda sudah lunas." }
    ]
  },
  // 5: Interns
  5: {
    id: 5,
    title: "Interns",
    alias: "Peserta Magang",
    category: "Aktivitas Program Magang",
    theme: {
      badgeClass: "bg-teal-subtle text-teal border border-teal-subtle",
      accentColor: "#0f766e",
      gradient: "linear-gradient(135deg, #134e4a 0%, #0f766e 100%)",
      iconBg: "bg-teal text-white",
      lightBg: "#f0fdfa"
    },
    icon: "bi-mortarboard-fill",
    mission: "Mengikuti alur pembinaan magang, mengerjakan tugas penugasan departemen, mengisi logbook harian, serta mengunduh sertifikat kelulusan magang.",
    steps: [
      {
        step: 1,
        title: "Isi Logbook Magang Harian",
        desc: "Catat tugas yang diberikan pembimbing dan lampirkan bukti foto kegiatan di formulir logbook profil Anda.",
        route: "profile.edit",
        hash: "#logbook-upload",
        btnText: "Isi Logbook Magang",
        icon: "bi-journal-check"
      },
      {
        step: 2,
        title: "Pantau Tim & Departemen Magang",
        desc: "Lihat struktur departemen tempat Anda ditempatkan dan kenali rekan satu tim Anda.",
        route: "structural",
        btnText: "Lihat Departemen",
        icon: "bi-diagram-3"
      },
      {
        step: 3,
        title: "Unduh E-Sertifikat Kelulusan",
        desc: "Setelah periode magang berakhir dan dinilai oleh HR, unduh sertifikat resmi Anda di portal magang.",
        route: "certificate.index",
        btnText: "Unduh Sertifikat Saya",
        icon: "bi-award"
      }
    ],
    quickActions: [
      { title: "Upload Logbook", route: "profile.edit", hash: "#logbook-upload", icon: "bi-journal-arrow-up", color: "teal" },
      { title: "Departemen Penugasan", route: "structural", icon: "bi-diagram-3", color: "primary" },
      { title: "Sertifikat Magang", route: "certificate.index", icon: "bi-award", color: "success" },
      { title: "Profil Saya", route: "profile.edit", icon: "bi-person-circle", color: "secondary" }
    ],
    glossary: [
      { term: "Logbook Magang", desc: "Rekap kehadiran dan pekerjaan peserta magang yang menjadi syarat kelulusan dan penerbitan sertifikat." }
    ],
    faqs: [
      { q: "Kapan sertifikat magang saya bisa diunduh?", a: 'Sertifikat dapat diunduh di menu "Sertifikat Magang" setelah HR Manager memvalidasi laporan akhir Anda.' }
    ]
  },
  // 8: Management Document
  8: {
    id: 8,
    title: "Management Document",
    alias: "Sekretaris / Arsiparis",
    category: "Tata Kelola Berkas & SK",
    theme: {
      badgeClass: "bg-secondary-subtle text-secondary border border-secondary-subtle",
      accentColor: "#475569",
      gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
      iconBg: "bg-secondary text-white",
      lightBg: "#f8fafc"
    },
    icon: "bi-folder-check",
    mission: "Mengarsipkan dokumen regulasi organisasi, menyematkan file pedoman/SOP penting di dashboard, serta mengelola berkas lampiran resmi.",
    steps: [
      {
        step: 1,
        title: "Kelola Dokumen Penting yang Disematkan (Pinned Docs)",
        desc: "Unggah file AD/ART, SK Kepengurusan, dan dokumen penting agar selalu dapat diakses oleh seluruh staf.",
        route: "pinneddoc.index",
        btnText: "Buka Pinned Documents",
        icon: "bi-pin-angle"
      },
      {
        step: 2,
        title: "Perbarui Lampiran Berkas di Dashboard",
        desc: "Tambahkan berkas unduhan PDF atau tautan formulir eksternal pada kartu Attachment di beranda utama.",
        route: "dashboard",
        btnText: "Ke Dashboard Utama",
        icon: "bi-paperclip"
      }
    ],
    quickActions: [
      { title: "Pinned Documents", route: "pinneddoc.index", icon: "bi-pin-angle", color: "primary" },
      { title: "Lampiran Dashboard", route: "dashboard", icon: "bi-paperclip", color: "info" }
    ],
    glossary: [
      { term: "Pinned Docs", desc: "Kumpulan dokumen resmi yang diberi prioritas semat agar mudah ditemukan oleh semua anggota." }
    ],
    faqs: [
      { q: "Format file apa saja yang didukung untuk lampiran?", a: "Sistem mendukung berkas PDF, DOCX, JPG, PNG hingga ukuran 5MB." }
    ]
  }
};
ROLE_WORKFLOWS[15] = { ...ROLE_WORKFLOWS[6], id: 15, title: "Intern PIC", alias: "PIC Pembimbing Magang" };
ROLE_WORKFLOWS[12] = { ...ROLE_WORKFLOWS[9], id: 12, title: "Public Relation", alias: "Hubungan Masyarakat & Seminar" };
ROLE_WORKFLOWS[100] = { ...ROLE_WORKFLOWS[9], id: 100, title: "Marketing Administrator", alias: "Administrator Marketing" };
function getRoleWorkflow(rolesId, roleNameFallback = "") {
  const numericId = Number(rolesId || 0);
  if (ROLE_WORKFLOWS[numericId]) {
    return ROLE_WORKFLOWS[numericId];
  }
  return {
    id: numericId,
    title: roleNameFallback || "Staff Member",
    alias: "Anggota Tim",
    category: "Operasional Anggota",
    theme: {
      badgeClass: "bg-primary-subtle text-primary border border-primary-subtle",
      accentColor: "#4f46e5",
      gradient: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)",
      iconBg: "bg-primary text-white",
      lightBg: "#eef2ff"
    },
    icon: "bi-person-badge",
    mission: "Menjalankan tugas dan tanggung jawab sesuai penugasan divisi organisasi dengan tertib dan terstruktur.",
    steps: [
      {
        step: 1,
        title: "Laporkan Aktivitas di Logbook",
        desc: "Isi logbook harian setiap selesai bertugas.",
        route: "profile.edit",
        hash: "#logbook-upload",
        btnText: "Isi Logbook",
        icon: "bi-journal-text"
      },
      {
        step: 2,
        title: "Cek Departemen & Program Kerja",
        desc: "Lihat agenda dan rekan kerja Anda di struktural.",
        route: "structural",
        btnText: "Lihat Struktural",
        icon: "bi-diagram-3"
      }
    ],
    quickActions: [
      { title: "Upload Logbook", route: "profile.edit", hash: "#logbook-upload", icon: "bi-journal-arrow-up", color: "primary" },
      { title: "Struktural", route: "structural", icon: "bi-diagram-3", color: "info" }
    ],
    glossary: [],
    faqs: []
  };
}
const _sfc_main$1 = {
  __name: "RoleWorkflowGuideModal",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const page = usePage();
    const authUser = computed(() => {
      var _a;
      return ((_a = page.props.auth) == null ? void 0 : _a.user) || {};
    });
    const userRoleId = computed(() => {
      var _a;
      return Number(((_a = authUser.value) == null ? void 0 : _a.roles_id) || 0);
    });
    const userRoleName = computed(() => {
      var _a;
      return ((_a = authUser.value) == null ? void 0 : _a.role_name) || "Staff";
    });
    const isOpen = ref(false);
    const activeTab = ref("steps");
    const selectedRoleId = ref(userRoleId.value);
    const isElevated = computed(() => userRoleId.value === 99 || userRoleId.value === 1);
    const currentWorkflow = computed(() => {
      return getRoleWorkflow(selectedRoleId.value, userRoleName.value);
    });
    const route = (name, params = {}) => {
      if (typeof window.route === "function") {
        try {
          return window.route(name, params);
        } catch (e) {
          console.warn(`Route ${name} resolution error:`, e);
        }
      }
      return "#";
    };
    function open(roleId = null) {
      selectedRoleId.value = roleId !== null ? Number(roleId) : userRoleId.value;
      activeTab.value = "steps";
      isOpen.value = true;
      document.body.style.overflow = "hidden";
    }
    function close() {
      isOpen.value = false;
      document.body.style.overflow = "";
    }
    __expose({ open, close });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        var _a, _b;
        if (isOpen.value) {
          _push2(`<div class="guide-modal-backdrop" tabindex="-1" data-v-40d68f05><div class="guide-modal-container" role="dialog" aria-modal="true" data-v-40d68f05><div class="guide-modal-header text-white" style="${ssrRenderStyle({ background: ((_a = currentWorkflow.value.theme) == null ? void 0 : _a.gradient) || "linear-gradient(135deg, #1e1b4b, #3730a3)" })}" data-v-40d68f05><div class="d-flex justify-content-between align-items-start w-100" data-v-40d68f05><div class="d-flex align-items-center gap-3" data-v-40d68f05><div class="guide-role-icon shadow-sm" data-v-40d68f05><i class="${ssrRenderClass(["bi", currentWorkflow.value.icon || "bi-stars"])}" data-v-40d68f05></i></div><div data-v-40d68f05><div class="d-flex align-items-center gap-2 flex-wrap mb-1" data-v-40d68f05><span class="badge rounded-pill bg-white bg-opacity-25 text-white fw-normal px-2 py-1" data-v-40d68f05>${ssrInterpolate(currentWorkflow.value.category)}</span>`);
          if (selectedRoleId.value === userRoleId.value) {
            _push2(`<span class="badge rounded-pill bg-warning text-dark fw-bold px-2 py-1" data-v-40d68f05><i class="bi bi-person-check-fill me-1" data-v-40d68f05></i> Peran Anda </span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><h4 class="guide-modal-title mb-0 fw-bold" data-v-40d68f05>${ssrInterpolate(currentWorkflow.value.title)} <small class="fs-6 opacity-75 fw-normal d-block d-md-inline ms-md-2" data-v-40d68f05> (${ssrInterpolate(currentWorkflow.value.alias)}) </small></h4></div></div><button type="button" class="btn btn-close-custom text-white" aria-label="Tutup" data-v-40d68f05><i class="bi bi-x-lg fs-5" data-v-40d68f05></i></button></div><div class="guide-mission-card mt-3 p-2 px-3 rounded-3 bg-white bg-opacity-15 small" data-v-40d68f05><i class="bi bi-info-circle-fill me-2 text-warning" data-v-40d68f05></i><span data-v-40d68f05>${ssrInterpolate(currentWorkflow.value.mission)}</span></div><div class="guide-tabs mt-3 d-flex gap-2 border-top border-white border-opacity-20 pt-2 flex-wrap" data-v-40d68f05><button class="${ssrRenderClass([{ active: activeTab.value === "steps" }, "guide-tab-btn"])}" data-v-40d68f05><i class="bi bi-123 me-1" data-v-40d68f05></i> Alur Kerja Harian (SOP) </button>`);
          if (currentWorkflow.value.glossary && currentWorkflow.value.glossary.length > 0) {
            _push2(`<button class="${ssrRenderClass([{ active: activeTab.value === "glossary" }, "guide-tab-btn"])}" data-v-40d68f05><i class="bi bi-book me-1" data-v-40d68f05></i> Kamus Istilah </button>`);
          } else {
            _push2(`<!---->`);
          }
          if (currentWorkflow.value.faqs && currentWorkflow.value.faqs.length > 0) {
            _push2(`<button class="${ssrRenderClass([{ active: activeTab.value === "faqs" }, "guide-tab-btn"])}" data-v-40d68f05><i class="bi bi-question-circle me-1" data-v-40d68f05></i> Tanya Jawab (FAQ) </button>`);
          } else {
            _push2(`<!---->`);
          }
          if (isElevated.value) {
            _push2(`<button class="${ssrRenderClass([{ active: activeTab.value === "all-roles" }, "guide-tab-btn ms-auto"])}" data-v-40d68f05><i class="bi bi-layers me-1" data-v-40d68f05></i> Beralih Panduan Role Lain </button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div><div class="guide-modal-body p-3 p-md-4" data-v-40d68f05>`);
          if (activeTab.value === "steps") {
            _push2(`<div class="steps-container" data-v-40d68f05><div class="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom" data-v-40d68f05><div data-v-40d68f05><h6 class="fw-bold mb-1 text-dark" data-v-40d68f05><i class="bi bi-signpost-split-fill text-primary me-2" data-v-40d68f05></i> Langkah Kerja Harian Mandiri </h6><small class="text-muted" data-v-40d68f05>Ikuti alur kerja berikut secara berurutan agar aktivitas peran Anda tercatat rapi.</small></div><span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1" data-v-40d68f05>${ssrInterpolate(((_b = currentWorkflow.value.steps) == null ? void 0 : _b.length) || 0)} Langkah Utama </span></div><div class="timeline-stepper" data-v-40d68f05><!--[-->`);
            ssrRenderList(currentWorkflow.value.steps, (st, idx) => {
              var _a2, _b2, _c, _d;
              _push2(`<div class="stepper-item d-flex gap-3 mb-4" data-v-40d68f05><div class="stepper-track d-flex flex-column align-items-center" data-v-40d68f05><div class="stepper-circle fw-bold text-white shadow-sm" style="${ssrRenderStyle({ backgroundColor: ((_a2 = currentWorkflow.value.theme) == null ? void 0 : _a2.accentColor) || "#4f46e5" })}" data-v-40d68f05>${ssrInterpolate(st.step)}</div>`);
              if (idx < currentWorkflow.value.steps.length - 1) {
                _push2(`<div class="stepper-line grow" data-v-40d68f05></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="stepper-card card border-0 shadow-sm p-3 w-100 rounded-3" style="${ssrRenderStyle({ backgroundColor: ((_b2 = currentWorkflow.value.theme) == null ? void 0 : _b2.lightBg) || "#f8fafc" })}" data-v-40d68f05><div class="d-flex justify-content-between align-items-start gap-2 flex-wrap mb-2" data-v-40d68f05><div class="d-flex align-items-center gap-2" data-v-40d68f05><div class="step-icon-badge text-white rounded p-1 px-2" style="${ssrRenderStyle({ backgroundColor: ((_c = currentWorkflow.value.theme) == null ? void 0 : _c.accentColor) || "#4f46e5" })}" data-v-40d68f05><i class="${ssrRenderClass(["bi", st.icon || "bi-arrow-right-circle"])}" data-v-40d68f05></i></div><h6 class="mb-0 fw-bold text-dark" data-v-40d68f05>${ssrInterpolate(st.title)}</h6></div><span class="badge bg-white text-secondary border small" data-v-40d68f05> Langkah ke-${ssrInterpolate(st.step)}</span></div><p class="small text-secondary mb-3 lh-sm" data-v-40d68f05>${ssrInterpolate(st.desc)}</p><div class="d-flex justify-content-end" data-v-40d68f05><a${ssrRenderAttr("href", route(st.route) + (st.hash || ""))} class="btn btn-sm text-white fw-medium shadow-sm d-inline-flex align-items-center gap-2 rounded-pill px-3" style="${ssrRenderStyle({ backgroundColor: ((_d = currentWorkflow.value.theme) == null ? void 0 : _d.accentColor) || "#4f46e5" })}" data-v-40d68f05><span data-v-40d68f05>${ssrInterpolate(st.btnText)}</span><i class="bi bi-arrow-right" data-v-40d68f05></i></a></div></div></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else if (activeTab.value === "glossary") {
            _push2(`<div class="glossary-container" data-v-40d68f05><div class="mb-3 pb-2 border-bottom" data-v-40d68f05><h6 class="fw-bold mb-1 text-dark" data-v-40d68f05><i class="bi bi-book-half text-primary me-2" data-v-40d68f05></i> Kamus Istilah &amp; Simbol Operasional </h6><small class="text-muted" data-v-40d68f05>Pahami istilah penting dalam peran Anda tanpa perlu membaca buku panduan tebal.</small></div><div class="row g-3" data-v-40d68f05><!--[-->`);
            ssrRenderList(currentWorkflow.value.glossary, (item, idx) => {
              _push2(`<div class="col-12 col-md-6" data-v-40d68f05><div class="card h-100 border-0 shadow-sm p-3 rounded-3 bg-light" data-v-40d68f05><div class="d-flex align-items-center gap-2 mb-2" data-v-40d68f05><span class="badge bg-primary text-white" data-v-40d68f05>Istilah</span><h6 class="fw-bold mb-0 text-dark" data-v-40d68f05>${ssrInterpolate(item.term)}</h6></div><p class="small text-secondary mb-0 lh-sm" data-v-40d68f05>${ssrInterpolate(item.desc)}</p></div></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else if (activeTab.value === "faqs") {
            _push2(`<div class="faqs-container" data-v-40d68f05><div class="mb-3 pb-2 border-bottom" data-v-40d68f05><h6 class="fw-bold mb-1 text-dark" data-v-40d68f05><i class="bi bi-patch-question-fill text-primary me-2" data-v-40d68f05></i> Pertanyaan Sering Ditanyakan (FAQ) </h6><small class="text-muted" data-v-40d68f05>Solusi cepat untuk kendala yang kerap dihadapi saat mengoperasikan sistem.</small></div><div class="d-flex flex-column gap-3" data-v-40d68f05><!--[-->`);
            ssrRenderList(currentWorkflow.value.faqs, (faq, idx) => {
              _push2(`<div class="card border-0 shadow-sm p-3 rounded-3" data-v-40d68f05><h6 class="fw-bold text-dark d-flex align-items-start gap-2 mb-2" data-v-40d68f05><span class="badge bg-danger rounded-circle p-1 px-2" data-v-40d68f05>Q</span><span data-v-40d68f05>${ssrInterpolate(faq.q)}</span></h6><div class="p-2 px-3 rounded bg-light border-start border-3 border-success small text-secondary" data-v-40d68f05><strong class="text-success me-1" data-v-40d68f05>Jawaban:</strong><span data-v-40d68f05>${ssrInterpolate(faq.a)}</span></div></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else if (activeTab.value === "all-roles") {
            _push2(`<div class="all-roles-container" data-v-40d68f05><div class="mb-3 pb-2 border-bottom" data-v-40d68f05><h6 class="fw-bold mb-1 text-dark" data-v-40d68f05><i class="bi bi-people-fill text-primary me-2" data-v-40d68f05></i> Lihat SOP &amp; Panduan Seluruh Role </h6><small class="text-muted" data-v-40d68f05>Sebagai Pimpinan/Admin, Anda dapat meninjau alur kerja peran lain untuk keperluan pengawasan.</small></div><div class="row g-2" data-v-40d68f05><!--[-->`);
            ssrRenderList(unref(ROLE_WORKFLOWS), (wf, rId) => {
              var _a2;
              _push2(`<div class="col-12 col-sm-6 col-lg-4" data-v-40d68f05><button type="button" class="${ssrRenderClass([selectedRoleId.value === Number(rId) ? "border-primary bg-primary-subtle" : "bg-white hover-light", "btn w-100 text-start p-2 rounded-3 border d-flex align-items-center gap-2"])}" data-v-40d68f05><div class="rounded-circle p-2 text-white d-flex align-items-center justify-content-center" style="${ssrRenderStyle({ backgroundColor: ((_a2 = wf.theme) == null ? void 0 : _a2.accentColor) || "#4f46e5", width: "36px", height: "36px" })}" data-v-40d68f05><i class="${ssrRenderClass(["bi", wf.icon || "bi-person"])}" data-v-40d68f05></i></div><div class="text-truncate" data-v-40d68f05><div class="fw-bold small text-dark text-truncate" data-v-40d68f05>${ssrInterpolate(wf.title)}</div><small class="text-muted d-block text-truncate" data-v-40d68f05>${ssrInterpolate(wf.alias)}</small></div></button></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="guide-modal-footer bg-light p-3 px-4 border-top d-flex justify-content-between align-items-center" data-v-40d68f05><div class="d-flex align-items-center gap-2 small text-muted" data-v-40d68f05><i class="bi bi-lightbulb-fill text-warning" data-v-40d68f05></i><span data-v-40d68f05>Panduan terpadu SEEOIS v5.0 — Bebas bingung tanpa guidebook terpisah!</span></div><button type="button" class="btn btn-primary rounded-pill px-4 fw-medium" data-v-40d68f05><i class="bi bi-check2-circle me-1" data-v-40d68f05></i> Paham &amp; Tutup </button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/RoleWorkflowGuideModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const RoleWorkflowGuideModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-40d68f05"]]);
const logoSrc = "/images/assets/logo.png";
const _sfc_main = {
  __name: "StaffLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const sidebarRef = ref(null);
    const offcanvasInstance = ref(null);
    const modalConfirmationRef = ref(null);
    const guideModalRef = ref(null);
    const auth_user = computed(() => {
      var _a;
      return ((_a = page.props.auth) == null ? void 0 : _a.user) || {};
    });
    const userRole = computed(() => {
      var _a;
      return Number(((_a = auth_user.value) == null ? void 0 : _a.roles_id) || 0);
    });
    const roleName = computed(() => {
      var _a;
      return ((_a = auth_user.value) == null ? void 0 : _a.role_name) || "Staff";
    });
    const capabilities = computed(() => {
      var _a;
      return ((_a = auth_user.value) == null ? void 0 : _a.capabilities) || [];
    });
    const can = (capability) => capabilities.value.includes("*") || capabilities.value.includes(capability);
    const currentRoleWorkflow = computed(() => getRoleWorkflow(userRole.value, roleName.value));
    const available_years = computed(() => page.props.available_years || []);
    const selected_year = ref(page.props.selected_year || (/* @__PURE__ */ new Date()).getFullYear());
    watch(
      () => page.props.selected_year,
      (newYear) => {
        if (newYear) selected_year.value = newYear;
      }
    );
    const can_switch_year = computed(() => {
      const roleId = userRole.value;
      return roleId === 1 || roleId === 8 || roleId === 99;
    });
    const route = (name, params = {}) => window.route(name, params);
    route.current = (routeName) => {
      if (window.route().current(routeName)) return true;
      const currentComponent = page.component;
      if (!routeName) return currentComponent;
      const componentToRouteBase = {
        "Staff/SEEO/Dashboard": "dashboard",
        "Staff/SEEO/UserController": "role",
        "Staff/SEEO/DepartmentController": "structural",
        "Staff/SEEO/Department": "department",
        "Staff/SEEO/Program": "program",
        "Staff/SEEO/CashFlow": "finance",
        "Staff/SEEO/CashFlowFeature": "finance.feature",
        "Staff/SEEO/PinnedDocs": "PinnedDocs",
        "Staff/SEEO/FinancePanel": "finance.pending",
        "Staff/SEEO/IwpPanel": "iwp.receipts",
        "Staff/SEEO/Birthdays": "hr.birthdays",
        "Staff/Business/Insight": "blaterian.insight",
        "Staff/Business/InsightCashflow": "blaterian.insight.cashflow",
        "Staff/Business/InsightCustomer": "blaterian.insight.customer",
        "Staff/Business/Stand": "food.stand",
        "Staff/Business/StandDetail": "food.stand.detail",
        "Staff/Business/StandCashier": "food.stand.cashier",
        "Staff/Business/GoodBalance": "good.balance",
        "Staff/Business/GoodProduct": "good.product",
        "Staff/Marketing/MarketingCms": "marketing.cms",
        "Staff/Marketing/Structures": "marketing.structures.index",
        "Staff/Marketing/Activities": "marketing.activities",
        "Staff/SEEO/OperatingPanel": "operating.panel",
        "Staff/Business/MenuBoard": "staff.sales-distribution.index",
        "Staff/Business/ProductionPanel": "staff.production.panel.index",
        "Staff/SEEO/SeminarRegistrations": "staff.seminar.registrations.index",
        "Staff/SEEO/SuperAdminPanel": "super.admin.panel",
        "Public/SeminarRegister": "seminar.registration.create"
      };
      const currentRouteBase = componentToRouteBase[currentComponent];
      if (!currentRouteBase) return false;
      return currentRouteBase === routeName || currentRouteBase.startsWith(routeName + ".");
    };
    const currentTime = ref("");
    const date_header = computed(() => {
      const now = /* @__PURE__ */ new Date();
      return now.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    });
    const searchKeyword = ref("");
    const primary_workspace_items = computed(() => {
      const role = userRole.value;
      const items = [];
      if (role === 99) {
        items.push({ route: route("super.admin.panel"), active: route.current("super.admin.panel"), title: "Super Admin Panel", tag: "Sistem", icon: "bi-shield-lock-fill" });
        items.push({ route: route("ceo.panel"), active: route.current("ceo.panel"), title: "CEO Panel (Tata Kelola)", tag: "Periode", icon: "bi-award-fill" });
        items.push({ route: route("role"), active: route.current("role"), title: "User & Role Staf", tag: "Akun", icon: "bi-person-gear" });
        items.push({ route: route("operating.panel"), active: route.current("operating.panel"), title: "Operating Panel", tag: "Logbook", icon: "bi-clipboard2-check" });
        items.push({ route: route("blaterian.insight"), active: route.current("blaterian.insight"), title: "Business Insight", tag: "Bisnis", icon: "bi-graph-up-arrow" });
      } else if (role === 1) {
        items.push({ route: route("ceo.panel"), active: route.current("ceo.panel"), title: "CEO Panel", tag: "Governance", icon: "bi-award-fill" });
        items.push({ route: route("structural"), active: route.current("structural") || route.current("department") || route.current("program"), title: "Struktur Organisasi", tag: "Departemen", icon: "bi-diagram-3-fill" });
        items.push({ route: route("role"), active: route.current("role"), title: "Data Staf & Role", tag: "SDM", icon: "bi-people-fill" });
        items.push({ route: route("blaterian.insight"), active: route.current("blaterian.insight"), title: "Wawasan Bisnis", tag: "Omzet", icon: "bi-graph-up" });
      } else if (role === 2) {
        items.push({ route: route("finance.pending"), active: route.current("finance.pending"), title: "Pending Validation", tag: "Validasi", icon: "bi-clock-history" });
        items.push({ route: route("finance"), active: route.current("finance"), title: "Buku Kas (Cashflow)", tag: "Kas Masuk/Keluar", icon: "bi-cash-stack" });
        items.push({ route: route("finance.feature"), active: route.current("finance.feature"), title: "Contribution & Payroll", tag: "Iuran & Gaji", icon: "bi-stars" });
      } else if (role === 3) {
        items.push({ route: route("operating.panel"), active: route.current("operating.panel"), title: "Operating Panel", tag: "Validasi Logbook", icon: "bi-clipboard2-check" });
        items.push({ route: route("food.stand"), active: route.current("food.stand") || route.current("food.stand.detail"), title: "Stand Management", tag: "Stand Foods", icon: "bi-shop" });
        items.push({ route: route("food.balance"), active: route.current("food.balance"), title: "Saldo Stand Makanan", tag: "Tarik Saldo", icon: "bi-bank" });
        items.push({ route: route("blaterian.insight"), active: route.current("blaterian.insight"), title: "Business Insight", tag: "Omzet Stand", icon: "bi-graph-up" });
      } else if (role === 10) {
        items.push({ route: route("food.stand"), active: route.current("food.stand") || route.current("food.stand.cashier"), title: "Kasir Stand Foods", tag: "POS Kasir", icon: "bi-calculator-fill" });
        items.push({ route: route("staff.sales-distribution.index"), active: route.current("staff.sales-distribution.index"), title: "Distribusi Pesanan", tag: "Deliver", icon: "bi-cart-check-fill" });
        items.push({ route: route("blaterian.insight"), active: route.current("blaterian.insight"), title: "Wawasan Penjualan", tag: "Rekap", icon: "bi-graph-up" });
      } else if (role === 11) {
        items.push({ route: route("staff.production.panel.index"), active: route.current("staff.production.panel.index"), title: "Production Panel", tag: "Update Stok", icon: "bi-boxes" });
        items.push({ route: route("staff.sales-distribution.index"), active: route.current("staff.sales-distribution.index"), title: "Resep & Menu Board", tag: "Komponen Menu", icon: "bi-card-checklist" });
        items.push({ route: route("food.stand"), active: route.current("food.stand"), title: "Stand Makanan", tag: "Stand", icon: "bi-shop" });
      } else if (role === 6 || role === 15) {
        items.push({ route: route("internship.applications.index"), active: route.current("internship.applications.index"), title: "Pendaftaran Magang", tag: "Review Seleksi", icon: "bi-briefcase-fill" });
        items.push({ route: route("certificate.manage"), active: route.current("certificate.manage"), title: "Sertifikat Magang", tag: "Kelola E-Sertifikat", icon: "bi-award-fill" });
        items.push({ route: route("hr.birthdays"), active: route.current("hr.birthdays"), title: "Ulang Tahun Staf", tag: "Apresiasi", icon: "bi-balloon-fill" });
        items.push({ route: route("role"), active: route.current("role"), title: "User & Pegawai", tag: "Rekrutmen", icon: "bi-people-fill" });
      } else if (role === 9 || role === 100 || role === 12) {
        items.push({ route: route("marketing.cms"), active: route.current("marketing.cms"), title: "Marketing CMS", tag: "Web Profile", icon: "bi-laptop" });
        items.push({ route: route("marketing.activities.index"), active: route.current("marketing.activities"), title: "Berita & Aktivitas", tag: "Liputan", icon: "bi-newspaper" });
        items.push({ route: route("staff.seminar.registrations.index"), active: route.current("staff.seminar.registrations"), title: "Pendaftaran Seminar", tag: "Event", icon: "bi-easel-fill" });
      } else if (role === 13) {
        items.push({ route: route("iwp.receipts"), active: route.current("iwp.receipts"), title: "Validasi Pembayaran IWP", tag: "Verifikasi Struk", icon: "bi-receipt-cutoff" });
        items.push({ route: route("profile.edit") + "#iwp-payment", active: false, title: "IWP Saya", tag: "Iuran Pribadi", icon: "bi-wallet2" });
      } else if (role === 8) {
        items.push({ route: route("pinneddoc.index"), active: route.current("PinnedDocs"), title: "Dokumen Sematan (Pinned)", tag: "SK & SOP", icon: "bi-pin-angle-fill" });
        items.push({ route: route("dashboard"), active: route.current("dashboard"), title: "Lampiran Dashboard", tag: "Attachment", icon: "bi-paperclip" });
      } else {
        items.push({ route: route("profile.edit") + "#logbook-upload", active: false, title: "Upload Logbook Harian", tag: "Tugas Harian", icon: "bi-journal-arrow-up" });
        items.push({ route: route("profile.edit") + "#iwp-payment", active: false, title: "Pembayaran IWP", tag: "Iuran Bulanan", icon: "bi-wallet2" });
        if (can("organization.view")) {
          items.push({ route: route("structural"), active: route.current("structural"), title: "Struktur Departemen", tag: "Agenda Tim", icon: "bi-diagram-3" });
        }
      }
      return items;
    });
    const nav_sections = computed(() => {
      const role = userRole.value;
      const sections = [];
      const pribadiItems = [
        { route: route("dashboard"), active: route.current("dashboard"), title: "Dashboard Utama", sub: "Beranda & Pengumuman", icon: "bi-speedometer2" },
        { route: route("profile.edit") + "#logbook-upload", active: false, title: "Upload Logbook", sub: "Laporan Aktivitas Harian", icon: "bi-journal-arrow-up" },
        { route: route("profile.edit") + "#iwp-payment", active: false, title: "Pembayaran IWP", sub: "Iuran Wajib Pengurus", icon: "bi-wallet2" },
        { route: route("profile.edit"), active: route.current("profile.edit"), title: "Profil Saya", sub: "Data Pribadi & Password", icon: "bi-person-circle" }
      ];
      sections.push({
        key: "pribadi",
        title: "Pribadi & Aktivitas",
        icon: "bi-person-workspace",
        items: pribadiItems
      });
      const orgItems = [];
      if (can("organization.view") || can("organization.manage")) {
        orgItems.push({
          route: route("structural"),
          active: route.current("structural") || route.current("department") || route.current("program"),
          title: "Struktur Organisasi",
          sub: "Departemen & Program Kerja",
          icon: "bi-diagram-3"
        });
      }
      if (can("employee.manage")) {
        orgItems.push({
          route: route("role"),
          active: route.current("role"),
          title: "Pengguna & Pegawai",
          sub: "Data Staf & Hak Akses",
          icon: "bi-person-badge"
        });
      }
      if (orgItems.length > 0) {
        sections.push({
          key: "organisasi",
          title: "Manajemen Organisasi",
          icon: "bi-building",
          items: orgItems
        });
      }
      const finItems = [];
      if (can("finance.manage")) {
        finItems.push({
          route: route("finance.pending"),
          active: route.current("finance.pending"),
          title: "Pending Validation",
          sub: "Kuitansi & Belanja Pending",
          icon: "bi-clock-history",
          badge: "Penting"
        });
      }
      if (can("finance.view") || can("finance.manage")) {
        finItems.push({
          route: route("finance"),
          active: route.current("finance"),
          title: "Buku Kas (Cashflow)",
          sub: "Arus Masuk & Keluar",
          icon: "bi-cash-coin"
        });
        finItems.push({
          route: route("finance.feature"),
          active: route.current("finance.feature"),
          title: "Iuran & Payroll",
          sub: "Kontribusi & Penggajian",
          icon: "bi-stars"
        });
      }
      if (can("iwp.manage")) {
        finItems.push({
          route: route("iwp.receipts"),
          active: route.current("iwp.receipts"),
          title: "Validasi IWP",
          sub: "Bukti Transfer Staf",
          icon: "bi-receipt"
        });
      }
      if (finItems.length > 0) {
        sections.push({
          key: "keuangan",
          title: "Keuangan & Kas",
          icon: "bi-wallet-fill",
          items: finItems
        });
      }
      const foodItems = [];
      if (can("inventory.view") || can("stands.manage") || can("goods.manage")) {
        foodItems.push({
          route: route("blaterian.insight"),
          active: route.current("blaterian.insight"),
          title: "Business Insight",
          sub: "Statistik Penjualan & Omzet",
          icon: "bi-graph-up"
        });
      }
      if (can("stands.manage") || can("inventory.view")) {
        foodItems.push({
          route: route("food.stand"),
          active: route.current("food.stand") || route.current("food.stand.detail") || route.current("food.stand.cashier"),
          title: "Manajemen Stand",
          sub: "Stand Makanan & Kasir",
          icon: "bi-shop"
        });
      }
      if (can("stands.manage")) {
        foodItems.push({
          route: route("operating.panel"),
          active: route.current("operating.panel"),
          title: "Operating Panel",
          sub: "Validasi Logbook Anggota",
          icon: "bi-clipboard2-check"
        });
        foodItems.push({
          route: route("food.balance"),
          active: route.current("food.balance"),
          title: "Saldo Stand Makanan",
          sub: "Penarikan Dana Stand",
          icon: "bi-bank"
        });
      }
      if (can("sales.manage")) {
        foodItems.push({
          route: route("staff.sales-distribution.index"),
          active: route.current("staff.sales-distribution.index"),
          title: "Distribusi Penjualan",
          sub: "Antrean Pesanan & Deliver",
          icon: "bi-cart-check"
        });
      }
      if (can("production.manage")) {
        foodItems.push({
          route: route("staff.production.panel.index"),
          active: route.current("staff.production.panel.index"),
          title: "Production Panel",
          sub: "Manajemen Stok Dapur/Bar",
          icon: "bi-boxes"
        });
      }
      if (foodItems.length > 0) {
        sections.push({
          key: "bisnis_foods",
          title: "Bisnis Stand & Foods",
          icon: "bi-cup-hot-fill",
          items: foodItems
        });
      }
      const goodsItems = [];
      if (can("goods.manage") || can("inventory.view")) {
        goodsItems.push({
          route: route("good.product"),
          active: route.current("good.product"),
          title: "Produk Merchandise",
          sub: "Katalog Barang & Varian",
          icon: "bi-box-seam"
        });
      }
      if (can("goods.manage")) {
        goodsItems.push({
          route: route("good.balance"),
          active: route.current("good.balance"),
          title: "Saldo Goods",
          sub: "Kas Masuk/Keluar Merchandise",
          icon: "bi-currency-exchange"
        });
      }
      if (goodsItems.length > 0) {
        sections.push({
          key: "bisnis_goods",
          title: "Bisnis Merchandise",
          icon: "bi-bag-check-fill",
          items: goodsItems
        });
      }
      const hrItems = [];
      if (can("internship.manage") || can("internship.view")) {
        hrItems.push({
          route: route("internship.applications.index"),
          active: route.current("internship.applications.index"),
          title: "Pendaftaran Magang",
          sub: "Seleksi Berkas Calon Intern",
          icon: "bi-briefcase"
        });
      }
      if (can("internship.manage")) {
        hrItems.push({
          route: route("certificate.manage"),
          active: route.current("certificate.manage"),
          title: "Sertifikat Magang",
          sub: "Penerbitan E-Sertifikat",
          icon: "bi-award"
        });
      }
      if (can("hr.manage")) {
        hrItems.push({
          route: route("hr.birthdays"),
          active: route.current("hr.birthdays"),
          title: "Ulang Tahun Staf",
          sub: "Kalender Apresiasi",
          icon: "bi-balloon"
        });
      }
      if (hrItems.length > 0) {
        sections.push({
          key: "sdm",
          title: "SDM & Magang",
          icon: "bi-people-fill",
          items: hrItems
        });
      }
      const marketingItems = [];
      if (can("marketing.manage")) {
        marketingItems.push({
          route: route("marketing.cms"),
          active: route.current("marketing.cms"),
          title: "Marketing CMS",
          sub: "Editor Teks Website Publik",
          icon: "bi-laptop"
        });
        marketingItems.push({
          route: route("marketing.structures.index"),
          active: route.current("marketing.structures"),
          title: "Struktur Web Publik",
          sub: "Bagan Kepengurusan Publik",
          icon: "bi-diagram-2"
        });
        marketingItems.push({
          route: route("marketing.activities.index"),
          active: route.current("marketing.activities"),
          title: "Berita & Aktivitas",
          sub: "Liputan Agenda SEEO",
          icon: "bi-newspaper"
        });
      }
      if (can("seminar.manage")) {
        marketingItems.push({
          route: route("staff.seminar.registrations.index"),
          active: route.current("staff.seminar.registrations"),
          title: "Registrasi Seminar",
          sub: "Pendaftaran Event Nasional",
          icon: "bi-easel"
        });
      }
      if (marketingItems.length > 0) {
        sections.push({
          key: "marketing",
          title: "Media & Pemasaran",
          icon: "bi-megaphone-fill",
          items: marketingItems
        });
      }
      const specialItems = [];
      if (can("organization.manage")) {
        specialItems.push({
          route: route("ceo.panel"),
          active: route.current("ceo.panel"),
          title: "CEO Panel",
          sub: "Governance & Transisi Periode",
          icon: "bi-award-fill"
        });
      }
      if (can("documents.manage")) {
        specialItems.push({
          route: route("pinneddoc.index"),
          active: route.current("PinnedDocs"),
          title: "Dokumen Sematan (Pinned)",
          sub: "Arsip SK & SOP Resmi",
          icon: "bi-pin-angle"
        });
      }
      if (role === 99) {
        specialItems.push({
          route: route("super.admin.panel"),
          active: route.current("super.admin.panel"),
          title: "Super Admin Panel",
          sub: "Diagnostik & Log Server",
          icon: "bi-shield-lock-fill"
        });
      }
      if (specialItems.length > 0) {
        sections.push({
          key: "sistem",
          title: "Tata Kelola & Sistem",
          icon: "bi-gear-fill",
          items: specialItems
        });
      }
      return sections;
    });
    const all_nav_items_flat = computed(() => {
      const list = [];
      nav_sections.value.forEach((section) => {
        section.items.forEach((item) => {
          list.push({
            ...item,
            sectionName: section.title
          });
        });
      });
      return list;
    });
    const search_results = computed(() => {
      const q = searchKeyword.value.trim().toLowerCase();
      if (!q) return [];
      return all_nav_items_flat.value.filter((item) => {
        return item.title.toLowerCase().includes(q) || item.sub && item.sub.toLowerCase().includes(q) || item.sectionName.toLowerCase().includes(q);
      });
    });
    const openedSections = ref({
      pribadi: true,
      organisasi: true,
      keuangan: true,
      bisnis_foods: true,
      bisnis_goods: true,
      sdm: true,
      marketing: true,
      sistem: true
    });
    function updateTime() {
      currentTime.value = (/* @__PURE__ */ new Date()).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    }
    onMounted(async () => {
      updateTime();
      setInterval(updateTime, 1e3);
      await nextTick();
      if (typeof window.bootstrap !== "undefined" && sidebarRef.value) {
        try {
          offcanvasInstance.value = window.bootstrap.Offcanvas.getOrCreateInstance(sidebarRef.value);
          window.addEventListener("resize", () => {
            if (window.innerWidth >= 992 && offcanvasInstance.value) {
              offcanvasInstance.value.hide();
            }
          });
        } catch (e) {
          console.error("Error initializing Offcanvas:", e);
        }
      }
    });
    watch(() => page.component, () => {
      if (window.innerWidth < 992 && offcanvasInstance.value) {
        offcanvasInstance.value.hide();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<link rel="preconnect" href="https://fonts.googleapis.com" data-v-233cf267${_scopeId}><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin data-v-233cf267${_scopeId}><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet" data-v-233cf267${_scopeId}><link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet" data-v-233cf267${_scopeId}>`);
          } else {
            return [
              createVNode("link", {
                rel: "preconnect",
                href: "https://fonts.googleapis.com"
              }),
              createVNode("link", {
                rel: "preconnect",
                href: "https://fonts.gstatic.com",
                crossorigin: ""
              }),
              createVNode("link", {
                href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap",
                rel: "stylesheet"
              }),
              createVNode("link", {
                href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css",
                rel: "stylesheet"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="d-flex vh-100 overflow-x-hidden staff-app-root" data-v-233cf267><aside class="sidebar-desktop d-none d-lg-flex flex-column shrink-0 bg-sidebar text-white shadow" data-v-233cf267><div class="sidebar-header p-3 border-bottom border-white border-opacity-10" data-v-233cf267><a${ssrRenderAttr("href", route("dashboard"))} class="text-decoration-none" data-v-233cf267><div class="d-flex align-items-center p-2 rounded-3 bg-white bg-opacity-10 brand-box transition-all" data-v-233cf267><img${ssrRenderAttr("src", logoSrc)} alt="SEEO Logo" class="brand-logo me-2 shadow-sm rounded-circle" data-v-233cf267><div class="lh-sm" data-v-233cf267><div class="d-flex align-items-center gap-2" data-v-233cf267><h5 class="brand-title mb-0 fw-bold text-white tracking-wide" data-v-233cf267>SEEOIS</h5><span class="badge bg-warning text-dark fw-bold text-2xs px-1 py-0 rounded" data-v-233cf267>v5.0</span></div><span class="brand-subtitle text-white text-opacity-75 d-block" data-v-233cf267>Information System</span></div></div></a><div class="role-identity-card mt-3 p-2 px-3 rounded-3 bg-white bg-opacity-10 border border-white border-opacity-15" data-v-233cf267><div class="d-flex justify-content-between align-items-center mb-1" data-v-233cf267><span class="text-2xs text-uppercase tracking-wider text-warning fw-bold" data-v-233cf267><i class="bi bi-person-badge me-1" data-v-233cf267></i> Peran Aktif </span><button type="button" class="btn btn-link p-0 text-white text-opacity-75 text-decoration-none text-2xs hover-white" title="Buka panduan alur kerja untuk peran ini" data-v-233cf267><i class="bi bi-question-circle me-1" data-v-233cf267></i> SOP </button></div><div class="d-flex align-items-center gap-2" data-v-233cf267><div class="role-icon-pill" style="${ssrRenderStyle({ backgroundColor: ((_a = currentRoleWorkflow.value.theme) == null ? void 0 : _a.accentColor) || "#4f46e5" })}" data-v-233cf267><i class="${ssrRenderClass(["bi", currentRoleWorkflow.value.icon || "bi-person-check"])}" data-v-233cf267></i></div><div class="text-truncate" data-v-233cf267><div class="fw-bold small text-white text-truncate" data-v-233cf267>${ssrInterpolate(currentRoleWorkflow.value.title)}</div><small class="text-white text-opacity-75 text-2xs d-block text-truncate" data-v-233cf267>${ssrInterpolate(currentRoleWorkflow.value.alias)}</small></div></div></div><div class="menu-search-wrapper mt-3" data-v-233cf267><div class="input-group input-group-sm" data-v-233cf267><span class="input-group-text bg-white bg-opacity-10 border-0 text-white text-opacity-50" data-v-233cf267><i class="bi bi-search" data-v-233cf267></i></span><input type="text"${ssrRenderAttr("value", searchKeyword.value)} class="form-control bg-white bg-opacity-10 border-0 text-white placeholder-white-50" placeholder="Cari fitur atau aksi..." aria-label="Cari fitur" data-v-233cf267>`);
      if (searchKeyword.value) {
        _push(`<button class="btn btn-sm bg-white bg-opacity-10 text-white border-0" type="button" data-v-233cf267><i class="bi bi-x" data-v-233cf267></i></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="sidebar-scrollable-content grow p-3" data-v-233cf267>`);
      if (searchKeyword.value.trim()) {
        _push(`<div class="search-results-box" data-v-233cf267><div class="small text-white text-opacity-75 mb-2 fw-semibold px-2" data-v-233cf267> Hasil Pencarian (${ssrInterpolate(search_results.value.length)}): </div>`);
        if (search_results.value.length === 0) {
          _push(`<div class="text-center py-4 text-white text-opacity-50 small" data-v-233cf267><i class="bi bi-search display-6 d-block mb-2 opacity-50" data-v-233cf267></i> Tidak ada menu yang cocok dengan &quot;${ssrInterpolate(searchKeyword.value)}&quot; </div>`);
        } else {
          _push(`<div class="d-flex flex-column gap-1" data-v-233cf267><!--[-->`);
          ssrRenderList(search_results.value, (res, idx) => {
            _push(`<a${ssrRenderAttr("href", res.route)} class="${ssrRenderClass([{ active: res.active }, "search-item d-flex align-items-center gap-2 p-2 rounded-3 text-white text-decoration-none transition-all"])}" data-v-233cf267><i class="${ssrRenderClass(["bi", res.icon || "bi-arrow-right", "text-warning fs-6"])}" data-v-233cf267></i><div class="text-truncate" data-v-233cf267><div class="fw-medium small text-truncate" data-v-233cf267>${ssrInterpolate(res.title)}</div><small class="text-white text-opacity-50 text-2xs d-block text-truncate" data-v-233cf267>${ssrInterpolate(res.sectionName)} • ${ssrInterpolate(res.sub || "")}</small></div></a>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="standard-menu-tree" data-v-233cf267><div class="primary-workspace-section mb-4 p-2 rounded-3 bg-white bg-opacity-10 border border-white border-opacity-15 shadow-2xs" data-v-233cf267><div class="d-flex justify-content-between align-items-center px-2 py-1 mb-2" data-v-233cf267><span class="text-2xs fw-bold text-uppercase tracking-wider text-warning" data-v-233cf267><i class="bi bi-star-fill me-1" data-v-233cf267></i> Ruang Kerja Utama </span><span class="badge rounded-pill bg-warning text-dark text-3xs px-2 py-0" data-v-233cf267>Prioritas</span></div><div class="d-flex flex-column gap-1" data-v-233cf267><!--[-->`);
        ssrRenderList(primary_workspace_items.value, (item, idx) => {
          _push(`<a${ssrRenderAttr("href", item.route)} class="${ssrRenderClass([{ active: item.active }, "primary-nav-link d-flex align-items-center justify-content-between p-2 rounded-2 text-white text-decoration-none transition-all"])}" data-v-233cf267><div class="d-flex align-items-center gap-2 text-truncate" data-v-233cf267><i class="${ssrRenderClass(["bi", item.icon, "text-warning"])}" data-v-233cf267></i><span class="fw-medium small text-truncate" data-v-233cf267>${ssrInterpolate(item.title)}</span></div>`);
          if (item.tag) {
            _push(`<span class="badge rounded-pill bg-white bg-opacity-20 text-white text-3xs px-2" data-v-233cf267>${ssrInterpolate(item.tag)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</a>`);
        });
        _push(`<!--]--></div></div><!--[-->`);
        ssrRenderList(nav_sections.value, (section) => {
          _push(`<div class="nav-section-group mb-3" data-v-233cf267><button type="button" class="section-toggle-btn w-100 d-flex justify-content-between align-items-center text-start border-0 bg-transparent text-white text-opacity-80 p-2 rounded-2 transition-all" data-v-233cf267><div class="d-flex align-items-center gap-2" data-v-233cf267><i class="${ssrRenderClass(["bi", section.icon, "text-warning text-opacity-80 small"])}" data-v-233cf267></i><span class="fw-bold text-uppercase tracking-wider text-2xs" data-v-233cf267>${ssrInterpolate(section.title)}</span></div><i class="${ssrRenderClass(["bi", openedSections.value[section.key] ? "bi-chevron-up" : "bi-chevron-down", "text-2xs opacity-50"])}" data-v-233cf267></i></button><div style="${ssrRenderStyle(openedSections.value[section.key] ? null : { display: "none" })}" class="section-links-container pt-1 ps-2" data-v-233cf267><!--[-->`);
          ssrRenderList(section.items, (item, iIdx) => {
            _push(`<a${ssrRenderAttr("href", item.route)} class="${ssrRenderClass([{ active: item.active }, "standard-nav-link d-flex align-items-center justify-content-between p-2 rounded-2 text-white text-decoration-none transition-all mb-1"])}" data-v-233cf267><div class="d-flex align-items-center gap-2 text-truncate" data-v-233cf267><i class="${ssrRenderClass(["bi", item.icon || "bi-circle", "nav-icon"])}" data-v-233cf267></i><div class="lh-1 text-truncate" data-v-233cf267><div class="fw-medium small text-truncate" data-v-233cf267>${ssrInterpolate(item.title)}</div>`);
            if (item.sub) {
              _push(`<small class="text-white text-opacity-50 text-3xs d-block text-truncate mt-1" data-v-233cf267>${ssrInterpolate(item.sub)}</small>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
            if (item.badge) {
              _push(`<span class="badge bg-danger rounded-pill text-3xs px-2" data-v-233cf267>${ssrInterpolate(item.badge)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</a>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div><div class="sidebar-footer p-3 border-top border-white border-opacity-10 bg-black bg-opacity-15" data-v-233cf267><button type="button" class="btn btn-warning w-100 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-pill shadow-sm py-2" data-v-233cf267><i class="bi bi-lightbulb-fill" data-v-233cf267></i><span data-v-233cf267>Panduan Alur Peran</span></button></div></aside><div class="offcanvas offcanvas-start bg-sidebar text-white sidebar-mobile" tabindex="-1" id="sidebarOffcanvas" data-v-233cf267><div class="offcanvas-header border-bottom border-white border-opacity-10 p-3" data-v-233cf267><div class="d-flex align-items-center p-1" data-v-233cf267><img${ssrRenderAttr("src", logoSrc)} alt="SEEO Logo" class="brand-logo me-2 rounded-circle" data-v-233cf267><div data-v-233cf267><h5 class="brand-title mb-0 fw-bold text-white" data-v-233cf267>SEEOIS</h5><small class="text-white text-opacity-75" data-v-233cf267>Information System</small></div></div><button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" data-v-233cf267></button></div><div class="offcanvas-body p-3 overflow-y-auto" data-v-233cf267><div class="role-identity-card mb-3 p-2 px-3 rounded-3 bg-white bg-opacity-10 border border-white border-opacity-15" data-v-233cf267><div class="d-flex align-items-center gap-2" data-v-233cf267><div class="role-icon-pill" style="${ssrRenderStyle({ backgroundColor: ((_b = currentRoleWorkflow.value.theme) == null ? void 0 : _b.accentColor) || "#4f46e5" })}" data-v-233cf267><i class="${ssrRenderClass(["bi", currentRoleWorkflow.value.icon || "bi-person-check"])}" data-v-233cf267></i></div><div class="text-truncate" data-v-233cf267><div class="fw-bold small text-white text-truncate" data-v-233cf267>${ssrInterpolate(currentRoleWorkflow.value.title)}</div><small class="text-white text-opacity-75 text-2xs d-block text-truncate" data-v-233cf267>${ssrInterpolate(currentRoleWorkflow.value.alias)}</small></div></div></div><div class="primary-workspace-section mb-3 p-2 rounded-3 bg-white bg-opacity-10 border border-white border-opacity-15" data-v-233cf267><div class="px-2 py-1 text-2xs fw-bold text-uppercase tracking-wider text-warning mb-1" data-v-233cf267> Ruang Kerja Utama (${ssrInterpolate(currentRoleWorkflow.value.alias)}) </div><div class="d-flex flex-column gap-1" data-v-233cf267><!--[-->`);
      ssrRenderList(primary_workspace_items.value, (item, idx) => {
        _push(`<a${ssrRenderAttr("href", item.route)} class="${ssrRenderClass([{ active: item.active }, "primary-nav-link d-flex align-items-center gap-2 p-2 rounded-2 text-white text-decoration-none"])}" data-v-233cf267><i class="${ssrRenderClass(["bi", item.icon, "text-warning"])}" data-v-233cf267></i><span class="small fw-medium" data-v-233cf267>${ssrInterpolate(item.title)}</span></a>`);
      });
      _push(`<!--]--></div></div><!--[-->`);
      ssrRenderList(nav_sections.value, (section) => {
        _push(`<div class="mb-3" data-v-233cf267><div class="text-2xs fw-bold text-uppercase tracking-wider text-white text-opacity-60 px-2 mb-1" data-v-233cf267>${ssrInterpolate(section.title)}</div><div class="d-flex flex-column gap-1 ps-2" data-v-233cf267><!--[-->`);
        ssrRenderList(section.items, (item, iIdx) => {
          _push(`<a${ssrRenderAttr("href", item.route)} class="${ssrRenderClass([{ active: item.active }, "standard-nav-link d-flex align-items-center gap-2 p-2 rounded-2 text-white text-decoration-none"])}" data-v-233cf267><i class="${ssrRenderClass(["bi", item.icon || "bi-circle", "nav-icon"])}" data-v-233cf267></i><span class="small" data-v-233cf267>${ssrInterpolate(item.title)}</span></a>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--><div class="pt-3 border-top border-white border-opacity-15" data-v-233cf267><button type="button" class="btn btn-warning w-100 fw-bold rounded-pill" data-v-233cf267><i class="bi bi-lightbulb-fill me-1" data-v-233cf267></i> Panduan Alur Peran </button></div></div></div><div class="main-content-wrapper grow d-flex flex-column overflow-hidden position-relative bg-surface" data-v-233cf267><header class="top-header border-bottom px-3 py-2 d-flex justify-content-between align-items-center shadow-2xs z-dropdown" data-v-233cf267><div class="d-flex align-items-center gap-2 me-auto" data-v-233cf267><button class="btn btn-light d-lg-none p-1 px-2 border-0 shadow-2xs" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas" aria-controls="sidebarOffcanvas" title="Buka Menu" data-v-233cf267><i class="bi bi-list fs-4" data-v-233cf267></i></button><div class="page-header-info" data-v-233cf267><h1 class="page-main-title mb-0 fs-5 fw-bold text-dark lh-sm" data-v-233cf267>`);
      ssrRenderSlot(_ctx.$slots, "header", {}, () => {
        _push(`Dashboard`);
      }, _push, _parent);
      _push(`</h1><div class="page-meta small text-muted d-flex align-items-center gap-2" data-v-233cf267><span data-v-233cf267>${ssrInterpolate(date_header.value)}</span><span class="d-none d-md-inline" data-v-233cf267>•</span><span class="d-none d-md-inline fw-medium text-dark" data-v-233cf267><i class="bi bi-clock me-1" data-v-233cf267></i>${ssrInterpolate(currentTime.value)}</span></div></div></div><div class="d-flex align-items-center gap-2" data-v-233cf267><button type="button" class="btn btn-outline-primary header-guide-btn d-flex align-items-center gap-2 rounded-pill px-3 py-1 shadow-2xs transition-all" title="Klik untuk panduan cara kerja peran Anda" data-v-233cf267><i class="bi bi-lightbulb-fill text-warning fs-6" data-v-233cf267></i><span class="d-none d-sm-inline fw-semibold" data-v-233cf267>Panduan Alur</span><span class="badge rounded-pill bg-primary text-white d-none d-md-inline" data-v-233cf267>${ssrInterpolate(currentRoleWorkflow.value.alias)}</span></button>`);
      if (can_switch_year.value) {
        _push(`<div class="d-none d-md-flex align-items-center gap-1 bg-white p-1 ps-2 rounded-pill border shadow-2xs" data-v-233cf267><i class="bi bi-calendar-event text-secondary small" data-v-233cf267></i><select class="form-select form-select-sm border-0 bg-transparent fw-medium py-0 pe-4" style="${ssrRenderStyle({ "width": "90px", "box-shadow": "none", "font-size": "0.85rem" })}" data-v-233cf267><!--[-->`);
        ssrRenderList(available_years.value, (y) => {
          _push(`<option${ssrRenderAttr("value", y)} data-v-233cf267${ssrIncludeBooleanAttr(Array.isArray(selected_year.value) ? ssrLooseContain(selected_year.value, y) : ssrLooseEqual(selected_year.value, y)) ? " selected" : ""}>${ssrInterpolate(y)}</option>`);
        });
        _push(`<!--]--></select></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="user-profile dropdown" data-v-233cf267><button class="profile-btn btn d-flex align-items-center gap-2 dropdown-toggle border-0 p-1 px-2 rounded-pill bg-white shadow-2xs" type="button" id="profileDropdownMenu" data-bs-toggle="dropdown" aria-expanded="false" data-v-233cf267><img${ssrRenderAttr("src", ((_c = auth_user.value) == null ? void 0 : _c.full_profile_image_url) || `https://ui-avatars.com/api/?name=${encodeURIComponent(((_d = auth_user.value) == null ? void 0 : _d.name) || "User")}&color=4F46E5&background=EEF2FF`)} alt="Profile" class="profile-img rounded-circle shadow-2xs" data-v-233cf267><div class="profile-info d-none d-lg-block text-start lh-1 me-1" data-v-233cf267><div class="fw-bold small text-dark text-truncate" style="${ssrRenderStyle({ "max-width": "140px" })}" data-v-233cf267>${ssrInterpolate((_e = auth_user.value) == null ? void 0 : _e.name)}</div><span class="badge bg-primary-subtle text-primary border border-primary-subtle text-3xs px-1 mt-1" data-v-233cf267>${ssrInterpolate(currentRoleWorkflow.value.alias)}</span></div></button><ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2 rounded-3 py-2" aria-labelledby="profileDropdownMenu" data-v-233cf267><li class="px-3 py-1 mb-1 border-bottom" data-v-233cf267><div class="fw-bold small text-dark" data-v-233cf267>${ssrInterpolate((_f = auth_user.value) == null ? void 0 : _f.name)}</div><small class="text-muted" data-v-233cf267>${ssrInterpolate((_g = auth_user.value) == null ? void 0 : _g.email)}</small></li><li data-v-233cf267><a${ssrRenderAttr("href", route("profile.edit"))} class="dropdown-item small py-2" data-v-233cf267><i class="bi bi-person-gear me-2 text-primary" data-v-233cf267></i><span data-v-233cf267>Pengaturan Profil</span></a></li><li data-v-233cf267><button type="button" class="dropdown-item small py-2" data-v-233cf267><i class="bi bi-lightbulb me-2 text-warning" data-v-233cf267></i><span data-v-233cf267>Panduan Alur Peran</span></button></li><li data-v-233cf267><hr class="dropdown-divider my-1" data-v-233cf267></li><li data-v-233cf267><a class="dropdown-item text-danger small py-2" href="#" data-v-233cf267><i class="bi bi-box-arrow-right me-2" data-v-233cf267></i><span data-v-233cf267>Keluar (Logout)</span></a></li></ul></div></div></header><main class="content-container grow overflow-auto p-2 p-md-3" data-v-233cf267>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        ref_key: "modalConfirmationRef",
        ref: modalConfirmationRef
      }, null, _parent));
      _push(ssrRenderComponent(RoleWorkflowGuideModal, {
        ref_key: "guideModalRef",
        ref: guideModalRef
      }, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/StaffLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const StaffLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-233cf267"]]);
export {
  RoleWorkflowGuideModal as R,
  StaffLayout as S,
  getRoleWorkflow as g
};
//# sourceMappingURL=StaffLayout-kVLGS8T_.js.map
