/**
 * roleWorkflows.js
 * Registri terpadu untuk alur kerja (SOP), panduan mandiri, aksi cepat,
 * dan kamus istilah operasional per-role di sistem SEEOIS.
 */

export const ROLE_WORKFLOWS = {
    // 99: Super Admin
    99: {
        id: 99,
        title: 'Super Admin',
        alias: 'Administrator Utama',
        category: 'Eksekutif & Tata Kelola Sistem',
        theme: {
            badgeClass: 'bg-danger-subtle text-danger border border-danger-subtle',
            accentColor: '#dc2626',
            gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
            iconBg: 'bg-danger text-white',
            lightBg: '#fef2f2'
        },
        icon: 'bi-shield-lock-fill',
        mission: 'Akses penuh ke seluruh konfigurasi sistem, audit log, perbaikan data, tata kelola tahun periode, serta pemantauan menyeluruh seluruh modul organisasi.',
        steps: [
            {
                step: 1,
                title: 'Periksa Diagnostik & Konfigurasi Sistem',
                desc: 'Pantau status cloud storage Google Drive, log server, dan kesehatan database aplikasi.',
                route: 'super.admin.panel',
                btnText: 'Buka Super Admin Panel',
                icon: 'bi-hdd-network'
            },
            {
                step: 2,
                title: 'Tata Kelola Periode & Penugasan Staf',
                desc: 'Kelola pergantian tahun kepengurusan aktif, promosi jabatan, dan demosi di CEO Panel.',
                route: 'ceo.panel',
                btnText: 'Buka CEO Panel',
                icon: 'bi-calendar-check'
            },
            {
                step: 3,
                title: 'Audit Hak Akses & Akun Pegawai',
                desc: 'Kelola pendaftaran staf baru, pengaturan level remunerasi, dan assign role pengguna.',
                route: 'role',
                btnText: 'Buka Manajemen Pegawai',
                icon: 'bi-people'
            },
            {
                step: 4,
                title: 'Pemantauan Bisnis & Kas Organisasi',
                desc: 'Pantau perkembangan omzet stand, stok produk goods, serta cashflow organisasi.',
                route: 'blaterian.insight',
                btnText: 'Buka Business Insight',
                icon: 'bi-graph-up-arrow'
            }
        ],
        quickActions: [
            { title: 'Super Admin Panel', route: 'super.admin.panel', icon: 'bi-shield-check', color: 'danger' },
            { title: 'CEO Panel', route: 'ceo.panel', icon: 'bi-award', color: 'primary' },
            { title: 'Data Pegawai & Role', route: 'role', icon: 'bi-person-gear', color: 'indigo' },
            { title: 'Operating Panel', route: 'operating.panel', icon: 'bi-clipboard2-data', color: 'warning' },
            { title: 'Cashflow Finansial', route: 'finance', icon: 'bi-cash-coin', color: 'success' },
            { title: 'Insight Bisnis', route: 'blaterian.insight', icon: 'bi-bar-chart-line', color: 'info' }
        ],
        glossary: [
            { term: 'Governance Year', desc: 'Tahun kepengurusan aktif yang menjadi filter utama seluruh data program kerja, stand, dan staf.' },
            { term: 'Promote / Demote', desc: 'Fitur untuk menaikkan user umum menjadi staf atau menurunkan staf kembali menjadi user biasa.' },
            { term: 'Role Capabilities', desc: 'Izin spesifik (seperti menu.manage, finance.manage) yang melekat otomatis berdasarkan nomor role pengguna.' }
        ],
        faqs: [
            { q: 'Bagaimana jika user baru mendaftar tetapi belum muncul di menu staf?', a: 'Buka menu "User & Employee" atau "CEO Panel", cari akun tersebut di daftar pemohon/unemployee, lalu klik tombol Promote / Recruit untuk menetapkan rolenya.' },
            { q: 'Bagaimana cara membuka tahun kepengurusan baru?', a: 'Masuk ke menu CEO Panel -> Bagian Governance Year, klik Tambah Tahun Baru, lalu aktifkan switch tahun tersebut.' }
        ]
    },

    // 1: Chief Executive Officer (CEO)
    1: {
        id: 1,
        title: 'Chief Executive Officer',
        alias: 'Ketua Umum / Direktur Utama',
        category: 'Pimpinan Tertinggi Organisasi',
        theme: {
            badgeClass: 'bg-primary-subtle text-primary border border-primary-subtle',
            accentColor: '#2563eb',
            gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
            iconBg: 'bg-primary text-white',
            lightBg: '#eff6ff'
        },
        icon: 'bi-award-fill',
        mission: 'Memimpin arah strategis organisasi, mengawasi seluruh departemen, menyetujui program kerja tahunan, serta menetapkan struktur organisasi kepengurusan.',
        steps: [
            {
                step: 1,
                title: 'Tinjau Struktur Organisasi & Departemen',
                desc: 'Pastikan seluruh kepala departemen dan staf sudah teralokasi dengan benar pada periode aktif saat ini.',
                route: 'structural',
                btnText: 'Buka Struktural',
                icon: 'bi-diagram-3'
            },
            {
                step: 2,
                title: 'Evaluasi Program Kerja & Logbook',
                desc: 'Pantau ketercapaian target program kerja dan rekap aktivitas harian yang dilaporkan anggota.',
                route: 'structural',
                btnText: 'Lihat Program Departemen',
                icon: 'bi-calendar3-range'
            },
            {
                step: 3,
                title: 'Pengawasan Bisnis & Keuangan',
                desc: 'Tinjau performa finansial organisasi dan kemajuan unit bisnis makanan & merchandise Blaterian.',
                route: 'blaterian.insight',
                btnText: 'Buka Business Insight',
                icon: 'bi-graph-up'
            },
            {
                step: 4,
                title: 'Kelola Pengumuman (Billboard) & Dokumen',
                desc: 'Unggah pengumuman penting di dashboard dan pin dokumen regulasi organisasi untuk seluruh staf.',
                route: 'pinneddoc.index',
                btnText: 'Kelola Pinned Docs',
                icon: 'bi-pin-angle'
            }
        ],
        quickActions: [
            { title: 'CEO Panel', route: 'ceo.panel', icon: 'bi-award', color: 'primary' },
            { title: 'Struktur Organisasi', route: 'structural', icon: 'bi-diagram-3', color: 'info' },
            { title: 'Kelola Staf & Akun', route: 'role', icon: 'bi-person-badge', color: 'secondary' },
            { title: 'Dokumen Sematan (SK/SOP)', route: 'pinneddoc.index', icon: 'bi-pin-angle', color: 'dark' },
            { title: 'Laporan Cashflow', route: 'finance', icon: 'bi-cash-stack', color: 'success' },
            { title: 'Insight Bisnis Blaterian', route: 'blaterian.insight', icon: 'bi-pie-chart', color: 'warning' }
        ],
        glossary: [
            { term: 'Struktural', desc: 'Bagan organisasi yang memetakan Departemen, Manajer, Staf pelaksana, dan Program Kerja terkait.' },
            { term: 'Pinned Docs', desc: 'Dokumen penting (AD/ART, SK, Pedoman) yang disematkan agar dapat diunduh oleh seluruh staf dari dashboard.' },
            { term: 'Billboard', desc: 'Banner visual/teks pengumuman utama yang tampil di carousel dashboard staf.' }
        ],
        faqs: [
            { q: 'Bagaimana cara menambahkan manajer baru ke suatu departemen?', a: 'Buka menu "Struktural", pilih departemen yang dituju, klik tombol Edit Departemen, lalu pilih staf yang akan dijadikan Manager.' },
            { q: 'Bagaimana membuat pengumuman billboard baru?', a: 'Di halaman Dashboard, klik tombol "+ Tambah Billboard" di atas carousel banner, lalu upload gambar atau teks pengumuman.' }
        ]
    },

    // 2: Financial Officer
    2: {
        id: 2,
        title: 'Financial Officer',
        alias: 'Bendahara Umum / Keuangan',
        category: 'Pengelola Keuangan Organisasi',
        theme: {
            badgeClass: 'bg-success-subtle text-success border border-success-subtle',
            accentColor: '#059669',
            gradient: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
            iconBg: 'bg-success text-white',
            lightBg: '#f0fdf4'
        },
        icon: 'bi-cash-coin',
        mission: 'Bertanggung jawab penuh atas pembukuan kas masuk/keluar, validasi nota pengeluaran departemen, pencairan anggaran program, serta pengelolaan payroll staf.',
        steps: [
            {
                step: 1,
                title: 'Periksa Dokumen Menunggu Validasi (Pending)',
                desc: 'Tinjau bukti kuitansi iuran, nota belanja program kerja, dan surat permohonan pencairan dana yang diajukan departemen.',
                route: 'finance.pending',
                btnText: 'Buka Pending Validation',
                icon: 'bi-clock-history'
            },
            {
                step: 2,
                title: 'Catat Arus Kas Masuk & Keluar (Cashflow)',
                desc: 'Input transaksi penerimaan dana hibah/usaha dan pengeluaran operasional organisasi secara akurat.',
                route: 'finance',
                btnText: 'Buka Buku Kas (Cashflow)',
                icon: 'bi-journal-check'
            },
            {
                step: 3,
                title: 'Kelola Iuran Staf & Penggajian (Payroll)',
                desc: 'Pantau iuran wajib anggota dan kelola perhitungan saldo payroll berdasarkan level kontribusi staf.',
                route: 'finance.feature',
                btnText: 'Buka Contribution & Payroll',
                icon: 'bi-wallet2'
            }
        ],
        quickActions: [
            { title: 'Pending Validation', route: 'finance.pending', icon: 'bi-clipboard-check', color: 'danger' },
            { title: 'Buku Kas (Cashflow)', route: 'finance', icon: 'bi-cash-stack', color: 'success' },
            { title: 'Iuran & Payroll', route: 'finance.feature', icon: 'bi-stars', color: 'primary' },
            { title: 'Struktural Anggaran', route: 'structural', icon: 'bi-diagram-3', color: 'info' }
        ],
        glossary: [
            { term: 'Disbursement Item', desc: 'Item pencairan dana dari kas bendahara kepada penanggung jawab program kerja.' },
            { term: 'Expense Item (Belanja)', desc: 'Realisasi belanja barang/jasa yang wajib disertai unggahan foto kuitansi/nota sah.' },
            { term: 'Contribution (Iuran Staf)', desc: 'Iuran wajib pengurus yang dibayarkan staf tiap bulan untuk mendukung kas organisasi.' }
        ],
        faqs: [
            { q: 'Bagaimana cara memvalidasi nota belanja dari program kerja?', a: 'Buka menu "Pending Validation", pilih tab "Expense Items", klik tombol mata untuk melihat foto struk, lalu klik tanda centang hijau untuk memvalidasi.' },
            { q: 'Apakah saldo cashflow terpotong otomatis saat pencairan disetujui?', a: 'Ya, sistem secara otomatis memperbarui saldo buku kas begitu item disbursement divalidasi oleh Financial Officer.' }
        ]
    },

    // 3: Operational Officer (COO)
    3: {
        id: 3,
        title: 'Operational Officer',
        alias: 'COO / Manajer Operasional',
        category: 'Operasional Lapangan & Unit Bisnis',
        theme: {
            badgeClass: 'bg-warning-subtle text-warning-emphasis border border-warning-subtle',
            accentColor: '#d97706',
            gradient: 'linear-gradient(135deg, #78350f 0%, #d97706 100%)',
            iconBg: 'bg-warning text-dark',
            lightBg: '#fffbeb'
        },
        icon: 'bi-gear-wide-connected',
        mission: 'Mengawasi berjalannya seluruh unit usaha makanan Blaterian Foods, memvalidasi logbook aktivitas harian seluruh staf, serta memvalidasi nota dan closing kasir stand.',
        steps: [
            {
                step: 1,
                title: 'Validasi Logbook Harian Staf',
                desc: 'Buka Operating Panel untuk memeriksa dan memvalidasi laporan aktivitas harian yang diisi oleh seluruh anggota.',
                route: 'operating.panel',
                btnText: 'Buka Operating Panel',
                icon: 'bi-journal-check'
            },
            {
                step: 2,
                title: 'Kelola Stand Makanan & Personil',
                desc: 'Pantau stand makanan yang aktif, atur staf produksi (dapur/bar), dan tentukan staf kasir yang bertugas.',
                route: 'food.stand',
                btnText: 'Buka Manajemen Stand',
                icon: 'bi-shop'
            },
            {
                step: 3,
                title: 'Validasi Pengeluaran Stand & Hasil Penjualan',
                desc: 'Masuk ke detail stand untuk memvalidasi kuitansi belanja bahan baku harian dan laporan omzet penjualan kasir.',
                route: 'food.stand',
                btnText: 'Cek Detail Stand',
                icon: 'bi-check2-circle'
            },
            {
                step: 4,
                title: 'Tarik Saldo Stand yang Sudah Bersih',
                desc: 'Lakukan penarikan saldo stand yang sudah tervalidasi untuk disetorkan ke kas pusat organisasi.',
                route: 'food.balance',
                btnText: 'Buka Saldo Stand Makanan',
                icon: 'bi-bank'
            }
        ],
        quickActions: [
            { title: 'Operating Panel (Logbook)', route: 'operating.panel', icon: 'bi-check2-square', color: 'warning' },
            { title: 'Manajemen Stand Makanan', route: 'food.stand', icon: 'bi-shop-window', color: 'primary' },
            { title: 'Saldo Stand Foods', route: 'food.balance', icon: 'bi-currency-exchange', color: 'success' },
            { title: 'Distribusi Pesanan', route: 'staff.sales-distribution.index', icon: 'bi-cart-check', color: 'info' }
        ],
        glossary: [
            { term: 'Lock Menu', desc: 'Mengunci menu pada stand agar kasir tidak dapat mengubah harga atau deskripsi secara sepihak.' },
            { term: 'Validation Struk Stand', desc: 'Tindakan COO memeriksa foto bukti struk belanja bahan baku stand sebelum nilainya diakui sebagai pengeluaran resmi.' },
            { term: 'Withdraw Saldo', desc: 'Proses penarikan keuntungan stand setelah semua pendapatan dan beban belanja disetujui.' }
        ],
        faqs: [
            { q: 'Bagaimana cara menentukan staf kasir untuk suatu stand?', a: 'Masuk ke menu "Stand Management" -> klik stand yang bersangkutan -> klik tombol "Atur Petugas Stand" untuk memilih staf kasir dan staf produksi.' },
            { q: 'Kapan saldo stand bisa ditarik?', a: 'Saldo stand dapat ditarik setelah seluruh transaksi penjualan dan nota belanja pada hari tersebut sudah divalidasi oleh COO.' }
        ]
    },

    // 10: Sales Distribution / Kasir Stand
    10: {
        id: 10,
        title: 'Sales Distribution',
        alias: 'Kasir & Distribusi Penjualan',
        category: 'Pelayanan Transaksi Konsumen',
        theme: {
            badgeClass: 'bg-info-subtle text-info border border-info-subtle',
            accentColor: '#0284c7',
            gradient: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)',
            iconBg: 'bg-info text-white',
            lightBg: '#f0f9ff'
        },
        icon: 'bi-cart-check-fill',
        mission: 'Melayani transaksi pemesanan konsumen di stand makanan/minuman, mencatat pembayaran tunai/QRIS, serta menandai status pengantaran pesanan.',
        steps: [
            {
                step: 1,
                title: 'Buka Mesin Kasir Stand',
                desc: 'Pilih stand yang Anda tugaskan, lalu buka antarmuka POS Kasir untuk melayani pesanan pembeli.',
                route: 'food.stand',
                btnText: 'Pilih Stand & Buka Kasir',
                icon: 'bi-calculator'
            },
            {
                step: 2,
                title: 'Input Pesanan & Cetak / Catat Pembayaran',
                desc: 'Pilih item menu pesanan pelanggan, tentukan dine-in atau delivery, dan konfirmasi metode pembayaran.',
                route: 'food.stand',
                btnText: 'Masuk ke POS Stand',
                icon: 'bi-receipt'
            },
            {
                step: 3,
                title: 'Tandai Pengantaran Pesanan (Delivery)',
                desc: 'Buka Sales Distribution untuk menandai pesanan delivery yang sudah selesai diserahkan ke pelanggan.',
                route: 'staff.sales-distribution.index',
                btnText: 'Buka Sales Distribution',
                icon: 'bi-box-seam'
            }
        ],
        quickActions: [
            { title: 'POS Kasir Stand', route: 'food.stand', icon: 'bi-calculator', color: 'info' },
            { title: 'Sales Distribution (Delivery)', route: 'staff.sales-distribution.index', icon: 'bi-cart-check', color: 'primary' },
            { title: 'Wawasan Penjualan', route: 'blaterian.insight', icon: 'bi-graph-up', color: 'success' }
        ],
        glossary: [
            { term: 'POS Kasir', desc: 'Layar input penjualan yang dirancang cepat untuk menambahkan pesanan, menghitung total, dan memotong stok otomatis.' },
            { term: 'Deliver Order', desc: 'Tombol untuk mengubah status pesanan antar menjadi terkirim (delivered).' }
        ],
        faqs: [
            { q: 'Bagaimana jika stand saya belum memiliki tombol kasir?', a: 'Pastikan nama Anda sudah didaftarkan sebagai petugas kasir oleh Operational Officer (COO) pada stand tersebut.' },
            { q: 'Apakah pembayaran DANA/QRIS otomatis tercatat?', a: 'Ya, pastikan bukti bayar konsumen telah sesuai sebelum menekan tombol Selesaikan Transaksi.' }
        ]
    },

    // 11: Production
    11: {
        id: 11,
        title: 'Production Team',
        alias: 'Tim Dapur & Bar / Produksi',
        category: 'Pengolahan & Manajemen Stok',
        theme: {
            badgeClass: 'bg-teal-subtle text-teal border border-teal-subtle',
            accentColor: '#0d9488',
            gradient: 'linear-gradient(135deg, #134e4a 0%, #0d9488 100%)',
            iconBg: 'bg-secondary text-white',
            lightBg: '#f0fdfa'
        },
        icon: 'bi-tools',
        mission: 'Menyusun komponen resep produk, memperbarui jumlah porsi fisik yang tersedia (stok), serta mengontrol ketersediaan menu di etalase kasir/publik.',
        steps: [
            {
                step: 1,
                title: 'Buka Production Panel',
                desc: 'Pantau status seluruh menu pada stand produksi Anda (stok siap jual, status terbit, dan peringatan stok habis).',
                route: 'staff.production.panel.index',
                btnText: 'Buka Production Panel',
                icon: 'bi-columns-gap'
            },
            {
                step: 2,
                title: 'Perbarui Stok Fisik Menu Harian',
                desc: 'Update jumlah porsi menu yang telah selesai diproduksi di dapur/bar agar kasir dapat menjualnya.',
                route: 'staff.production.panel.index',
                btnText: 'Update Stok Menu',
                icon: 'bi-boxes'
            },
            {
                step: 3,
                title: 'Kelola Resep & Status Publikasi',
                desc: 'Tambahkan komponen bahan baku pada menu dan ubah status menjadi Publish (Tersedia) atau Unpublish jika bahan habis.',
                route: 'staff.sales-distribution.index',
                btnText: 'Kelola Resep Menu',
                icon: 'bi-card-checklist'
            }
        ],
        quickActions: [
            { title: 'Production Panel (Stok)', route: 'staff.production.panel.index', icon: 'bi-tools', color: 'teal' },
            { title: 'Resep & Menu Board', route: 'staff.sales-distribution.index', icon: 'bi-card-list', color: 'primary' },
            { title: 'Stand Makanan', route: 'food.stand', icon: 'bi-shop', color: 'info' }
        ],
        glossary: [
            { term: 'Production Panel', desc: 'Dashboard khusus tim dapur untuk menyesuaikan stok real-time dan mengaktifkan ketersediaan menu.' },
            { term: 'Recipe Component', desc: 'Daftar takaran bahan baku (misal: gramasi kopi, susu) yang digunakan dalam satu porsi menu.' },
            { term: 'Publish Toggle', desc: 'Sakelar untuk menampilkan atau menyembunyikan menu dari katalog pemesanan pelanggan.' }
        ],
        faqs: [
            { q: 'Bagaimana cara menonaktifkan menu yang mendadak habis bahan bakunya?', a: 'Di Production Panel, klik tombol toggle "Publish" pada kartu menu terkait agar otomatis berstatus Nonaktif di kasir.' },
            { q: 'Kenapa stok menu berkurang sendiri?', a: 'Stok menu berkurang secara otomatis setiap kali kasir menyelesaikan transaksi penjualan produk tersebut.' }
        ]
    },

    // 6: HR Manager
    6: {
        id: 6,
        title: 'HR Manager',
        alias: 'Kepala SDM / Personalia',
        category: 'Pengelolaan Sumber Daya Manusia',
        theme: {
            badgeClass: 'bg-purple-subtle text-purple border border-purple-subtle',
            accentColor: '#7c3aed',
            gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
            iconBg: 'bg-purple text-white',
            lightBg: '#faf5ff'
        },
        icon: 'bi-people-fill',
        mission: 'Mengelola perekrutan staf & anak magang, meninjau berkas pendaftaran internship, memantau hari ulang tahun anggota, serta menerbitkan sertifikat resmi.',
        steps: [
            {
                step: 1,
                title: 'Review Berkas Pendaftar Magang (Internship)',
                desc: 'Periksa formulir dan CV calon intern yang masuk, lalu tentukan keputusan (Diterima / Ditolak / Wawancara).',
                route: 'internship.applications.index',
                btnText: 'Review Lamaran Magang',
                icon: 'bi-person-lines-fill'
            },
            {
                step: 2,
                title: 'Pantau Ulang Tahun Staf Bulan Ini',
                desc: 'Cek daftar anggota yang berulang tahun bulan ini untuk penyampaian apresiasi dan poster ucapan.',
                route: 'hr.birthdays',
                btnText: 'Lihat Kalender Ulang Tahun',
                icon: 'bi-balloon'
            },
            {
                step: 3,
                title: 'Kelola & Terbitkan Sertifikat Magang',
                desc: 'Generate nomor sertifikat, isi nilai/keterangan, dan terbitkan e-sertifikat yang dapat diunduh langsung oleh peserta magang.',
                route: 'certificate.manage',
                btnText: 'Kelola Sertifikat',
                icon: 'bi-award'
            },
            {
                step: 4,
                title: 'Perekrutan & Update Data Pegawai',
                desc: 'Rekrut pengguna baru menjadi staf organisasi dan kelola penetapan peran kerja mereka.',
                route: 'role',
                btnText: 'Manajemen Pegawai',
                icon: 'bi-person-badge'
            }
        ],
        quickActions: [
            { title: 'Lamaran Magang', route: 'internship.applications.index', icon: 'bi-briefcase', color: 'purple' },
            { title: 'Sertifikat Magang', route: 'certificate.manage', icon: 'bi-award', color: 'primary' },
            { title: 'Ulang Tahun Staf', route: 'hr.birthdays', icon: 'bi-balloon', color: 'danger' },
            { title: 'Data Pegawai', route: 'role', icon: 'bi-people', color: 'info' }
        ],
        glossary: [
            { term: 'Internship Decision', desc: 'Keputusan resmi penerimaan calon anak magang yang tercatat di database sistem.' },
            { term: 'Certificate Generator', desc: 'Alat otomatis pembuat PDF sertifikat kelulusan magang dengan kode verifikasi unik.' }
        ],
        faqs: [
            { q: 'Bagaimana cara menerbitkan sertifikat untuk anak magang?', a: 'Buka menu "Certificates", klik tombol Tambah Sertifikat, pilih nama intern yang bersangkutan, lalu simpan untuk mengenerate link unduh.' },
            { q: 'Di mana peserta magang bisa mengunduh sertifikatnya?', a: 'Peserta magang cukup login ke akunnya, lalu membuka menu "Sertifikat Saya" di portal intern.' }
        ]
    },

    // 9 & 100: Marketing Medinfo & Marketing Administrator
    9: {
        id: 9,
        title: 'Marketing Medinfo',
        alias: 'Media & Informasi / Publikasi',
        category: 'Konten Website, Berita & Seminar',
        theme: {
            badgeClass: 'bg-pink-subtle text-pink border border-pink-subtle',
            accentColor: '#db2777',
            gradient: 'linear-gradient(135deg, #831843 0%, #db2777 100%)',
            iconBg: 'bg-danger text-white',
            lightBg: '#fdf2f8'
        },
        icon: 'bi-megaphone-fill',
        mission: 'Mengelola tampilan website profil publik, mempublikasikan liputan berita kegiatan organisasi, memperbarui bagan kepengurusan, serta mengelola pendaftaran seminar nasional.',
        steps: [
            {
                step: 1,
                title: 'Kelola Konten Halaman Web (Marketing CMS)',
                desc: 'Ubah teks sambutan, visi misi, foto galeri, dan banner pada landing page utama SEEO.',
                route: 'marketing.cms',
                btnText: 'Buka Marketing CMS',
                icon: 'bi-laptop'
            },
            {
                step: 2,
                title: 'Publikasikan Berita & Kegiatan Terbaru',
                desc: 'Unggah artikel liputan agenda organisasi lengkap dengan foto dokumentasi agar tayang di website publik.',
                route: 'marketing.activities.index',
                btnText: 'Kelola Berita & Kegiatan',
                icon: 'bi-newspaper'
            },
            {
                step: 3,
                title: 'Kelola Pendaftaran Seminar Nasional',
                desc: 'Buka pendaftaran event seminar, pantau data peserta yang mendaftar, dan ekspor daftar hadir ke format Excel.',
                route: 'staff.seminar.registrations.index',
                btnText: 'Buka Registrasi Seminar',
                icon: 'bi-easel'
            }
        ],
        quickActions: [
            { title: 'Marketing CMS (Web)', route: 'marketing.cms', icon: 'bi-megaphone', color: 'pink' },
            { title: 'Berita & Aktivitas', route: 'marketing.activities.index', icon: 'bi-newspaper', color: 'primary' },
            { title: 'Struktur Web Publik', route: 'marketing.structures.index', icon: 'bi-diagram-2', color: 'info' },
            { title: 'Pendaftaran Seminar', route: 'staff.seminar.registrations.index', icon: 'bi-easel', color: 'warning' }
        ],
        glossary: [
            { term: 'Marketing CMS', desc: 'Panel pengaturan visual untuk mengedit konten teks dan media website company profile tanpa coding.' },
            { term: 'Seminar Export', desc: 'Fitur untuk mengunduh seluruh data peserta pendaftar seminar nasional ke format Microsoft Excel.' }
        ],
        faqs: [
            { q: 'Bagaimana cara menambahkan berita kegiatan baru?', a: 'Buka menu "Activities & News", klik tombol "+ Tambah Kegiatan", isi judul, tanggal, deskripsi, dan upload foto banner utama.' },
            { q: 'Di mana letak formulir pendaftaran seminar publik?', a: 'Link registrasi publik otomatis dibuat saat Anda menambahkan event baru di menu Seminar Registrations.' }
        ]
    },

    // 13: IWP PIC
    13: {
        id: 13,
        title: 'IWP PIC',
        alias: 'Penanggung Jawab Iuran Wajib Pengurus',
        category: 'Verifikasi Iuran Anggota',
        theme: {
            badgeClass: 'bg-emerald-subtle text-emerald border border-emerald-subtle',
            accentColor: '#059669',
            gradient: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)',
            iconBg: 'bg-success text-white',
            lightBg: '#ecfdf5'
        },
        icon: 'bi-receipt-cutoff',
        mission: 'Memeriksa bukti transfer Iuran Wajib Pengurus (IWP) yang diunggah oleh seluruh staf dan memvalidasi keabsahan pembayarannya setiap bulan.',
        steps: [
            {
                step: 1,
                title: 'Buka Panel Validasi IWP',
                desc: 'Pantau daftar bukti transfer iuran yang masuk dan masih berstatus pending.',
                route: 'iwp.receipts',
                btnText: 'Buka Validasi Pembayaran IWP',
                icon: 'bi-receipt'
            },
            {
                step: 2,
                title: 'Periksa Foto Struk & Nominal Pembayaran',
                desc: 'Cocokkan nominal transfer dengan jumlah bulan iuran yang dipilih oleh staf pengunggah.',
                route: 'iwp.receipts',
                btnText: 'Cek Antrean Struk',
                icon: 'bi-eye'
            },
            {
                step: 3,
                title: 'Setujui / Validasi Bukti Pembayaran',
                desc: 'Klik tombol centang hijau untuk memvalidasi pembayaran agar status iuran anggota di profilnya menjadi Lunas.',
                route: 'iwp.receipts',
                btnText: 'Validasi Struk Sekarang',
                icon: 'bi-check-circle'
            }
        ],
        quickActions: [
            { title: 'Panel Validasi IWP', route: 'iwp.receipts', icon: 'bi-receipt', color: 'success' },
            { title: 'Profil & IWP Saya', route: 'profile.edit', icon: 'bi-wallet2', color: 'primary' }
        ],
        glossary: [
            { term: 'IWP (Iuran Wajib Pengurus)', desc: 'Kewajiban kontribusi kas bulanan dari setiap staf aktif SEEOIS.' },
            { term: 'Validasi IWP', desc: 'Persetujuan resmi PIC bahwa dana transfer telah benar-benar masuk ke rekening kas organisasi.' }
        ],
        faqs: [
            { q: 'Bagaimana jika staf salah mengunggah foto struk?', a: 'Anda dapat menolak bukti transfer tersebut dan meminta staf bersangkutan mengunggah ulang melalui menu Profil -> Pembayaran IWP miliknya.' }
        ]
    },

    // 4: Staff Member
    4: {
        id: 4,
        title: 'Staff Member',
        alias: 'Staf / Anggota Organisasi',
        category: 'Aktivitas Harian Anggota',
        theme: {
            badgeClass: 'bg-slate-subtle text-slate border border-slate-subtle',
            accentColor: '#475569',
            gradient: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
            iconBg: 'bg-dark text-white',
            lightBg: '#f8fafc'
        },
        icon: 'bi-person-workspace',
        mission: 'Menjalankan program kerja sesuai departemen, mengisi logbook aktivitas kegiatan harian, serta melunasi Iuran Wajib Pengurus (IWP).',
        steps: [
            {
                step: 1,
                title: 'Unggah Logbook Aktivitas Harian',
                desc: 'Laporkan kegiatan, rapat, atau progres program kerja yang Anda kerjakan hari ini agar dapat divalidasi oleh COO.',
                route: 'profile.edit',
                hash: '#logbook-upload',
                btnText: 'Isi Logbook Hari Ini',
                icon: 'bi-journal-arrow-up'
            },
            {
                step: 2,
                title: 'Bayar Iuran Wajib Pengurus (IWP)',
                desc: 'Unggah bukti transfer pembayaran iuran bulanan Anda untuk diverifikasi oleh PIC IWP.',
                route: 'profile.edit',
                hash: '#iwp-payment',
                btnText: 'Unggah Bukti IWP',
                icon: 'bi-wallet2'
            },
            {
                step: 3,
                title: 'Cek Struktur & Program Kerja Departemen',
                desc: 'Lihat susunan tim Anda, jadwal program kerja, serta berkas lampiran yang dibagikan organisasi.',
                route: 'structural',
                btnText: 'Buka Departemen Saya',
                icon: 'bi-diagram-3'
            }
        ],
        quickActions: [
            { title: 'Upload Logbook', route: 'profile.edit', hash: '#logbook-upload', icon: 'bi-journal-arrow-up', color: 'primary' },
            { title: 'Pembayaran IWP', route: 'profile.edit', hash: '#iwp-payment', icon: 'bi-wallet2', color: 'success' },
            { title: 'Struktur Organisasi', route: 'structural', icon: 'bi-diagram-3', color: 'info' },
            { title: 'Edit Profil Saya', route: 'profile.edit', icon: 'bi-person-gear', color: 'secondary' }
        ],
        glossary: [
            { term: 'Logbook Harian', desc: 'Formulir laporan mandiri berisi tanggal, jam mulai-selesai, uraian kegiatan, dan foto bukti pelaksanaan.' },
            { term: 'Status Logbook "Valid"', desc: 'Tanda bahwa laporan kerja Anda sudah disetujui secara resmi oleh Operational Officer.' }
        ],
        faqs: [
            { q: 'Kapan batas akhir pengisian logbook?', a: 'Logbook sebaiknya diisi setiap selesai melakukan kegiatan organisasi agar tidak menumpuk di akhir bulan.' },
            { q: 'Bagaimana mengetahui apakah pembayaran IWP saya sudah lunas?', a: 'Buka halaman Profil Anda, gulir ke bagian Status IWP. Jika kotak bulan berwarna hijau dengan tanda centang, berarti pembayaran Anda sudah lunas.' }
        ]
    },

    // 5: Interns
    5: {
        id: 5,
        title: 'Interns',
        alias: 'Peserta Magang',
        category: 'Aktivitas Program Magang',
        theme: {
            badgeClass: 'bg-teal-subtle text-teal border border-teal-subtle',
            accentColor: '#0f766e',
            gradient: 'linear-gradient(135deg, #134e4a 0%, #0f766e 100%)',
            iconBg: 'bg-teal text-white',
            lightBg: '#f0fdfa'
        },
        icon: 'bi-mortarboard-fill',
        mission: 'Mengikuti alur pembinaan magang, mengerjakan tugas penugasan departemen, mengisi logbook harian, serta mengunduh sertifikat kelulusan magang.',
        steps: [
            {
                step: 1,
                title: 'Isi Logbook Magang Harian',
                desc: 'Catat tugas yang diberikan pembimbing dan lampirkan bukti foto kegiatan di formulir logbook profil Anda.',
                route: 'profile.edit',
                hash: '#logbook-upload',
                btnText: 'Isi Logbook Magang',
                icon: 'bi-journal-check'
            },
            {
                step: 2,
                title: 'Pantau Tim & Departemen Magang',
                desc: 'Lihat struktur departemen tempat Anda ditempatkan dan kenali rekan satu tim Anda.',
                route: 'structural',
                btnText: 'Lihat Departemen',
                icon: 'bi-diagram-3'
            },
            {
                step: 3,
                title: 'Unduh E-Sertifikat Kelulusan',
                desc: 'Setelah periode magang berakhir dan dinilai oleh HR, unduh sertifikat resmi Anda di portal magang.',
                route: 'certificate.index',
                btnText: 'Unduh Sertifikat Saya',
                icon: 'bi-award'
            }
        ],
        quickActions: [
            { title: 'Upload Logbook', route: 'profile.edit', hash: '#logbook-upload', icon: 'bi-journal-arrow-up', color: 'teal' },
            { title: 'Departemen Penugasan', route: 'structural', icon: 'bi-diagram-3', color: 'primary' },
            { title: 'Sertifikat Magang', route: 'certificate.index', icon: 'bi-award', color: 'success' },
            { title: 'Profil Saya', route: 'profile.edit', icon: 'bi-person-circle', color: 'secondary' }
        ],
        glossary: [
            { term: 'Logbook Magang', desc: 'Rekap kehadiran dan pekerjaan peserta magang yang menjadi syarat kelulusan dan penerbitan sertifikat.' }
        ],
        faqs: [
            { q: 'Kapan sertifikat magang saya bisa diunduh?', a: 'Sertifikat dapat diunduh di menu "Sertifikat Magang" setelah HR Manager memvalidasi laporan akhir Anda.' }
        ]
    },

    // 8: Management Document
    8: {
        id: 8,
        title: 'Management Document',
        alias: 'Sekretaris / Arsiparis',
        category: 'Tata Kelola Berkas & SK',
        theme: {
            badgeClass: 'bg-secondary-subtle text-secondary border border-secondary-subtle',
            accentColor: '#475569',
            gradient: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            iconBg: 'bg-secondary text-white',
            lightBg: '#f8fafc'
        },
        icon: 'bi-folder-check',
        mission: 'Mengarsipkan dokumen regulasi organisasi, menyematkan file pedoman/SOP penting di dashboard, serta mengelola berkas lampiran resmi.',
        steps: [
            {
                step: 1,
                title: 'Kelola Dokumen Penting yang Disematkan (Pinned Docs)',
                desc: 'Unggah file AD/ART, SK Kepengurusan, dan dokumen penting agar selalu dapat diakses oleh seluruh staf.',
                route: 'pinneddoc.index',
                btnText: 'Buka Pinned Documents',
                icon: 'bi-pin-angle'
            },
            {
                step: 2,
                title: 'Perbarui Lampiran Berkas di Dashboard',
                desc: 'Tambahkan berkas unduhan PDF atau tautan formulir eksternal pada kartu Attachment di beranda utama.',
                route: 'dashboard',
                btnText: 'Ke Dashboard Utama',
                icon: 'bi-paperclip'
            }
        ],
        quickActions: [
            { title: 'Pinned Documents', route: 'pinneddoc.index', icon: 'bi-pin-angle', color: 'primary' },
            { title: 'Lampiran Dashboard', route: 'dashboard', icon: 'bi-paperclip', color: 'info' }
        ],
        glossary: [
            { term: 'Pinned Docs', desc: 'Kumpulan dokumen resmi yang diberi prioritas semat agar mudah ditemukan oleh semua anggota.' }
        ],
        faqs: [
            { q: 'Format file apa saja yang didukung untuk lampiran?', a: 'Sistem mendukung berkas PDF, DOCX, JPG, PNG hingga ukuran 5MB.' }
        ]
    }
};

// Aliases for matching roles with similar IDs
ROLE_WORKFLOWS[15] = { ...ROLE_WORKFLOWS[6], id: 15, title: 'Intern PIC', alias: 'PIC Pembimbing Magang' };
ROLE_WORKFLOWS[12] = { ...ROLE_WORKFLOWS[9], id: 12, title: 'Public Relation', alias: 'Hubungan Masyarakat & Seminar' };
ROLE_WORKFLOWS[100] = { ...ROLE_WORKFLOWS[9], id: 100, title: 'Marketing Administrator', alias: 'Administrator Marketing' };

/**
 * Mendapatkan informasi workflow dan panduan peran berdasarkan roles_id
 */
export function getRoleWorkflow(rolesId, roleNameFallback = '') {
    const numericId = Number(rolesId || 0);
    if (ROLE_WORKFLOWS[numericId]) {
        return ROLE_WORKFLOWS[numericId];
    }

    // Fallback jika role id belum terdaftar
    return {
        id: numericId,
        title: roleNameFallback || 'Staff Member',
        alias: 'Anggota Tim',
        category: 'Operasional Anggota',
        theme: {
            badgeClass: 'bg-primary-subtle text-primary border border-primary-subtle',
            accentColor: '#4f46e5',
            gradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
            iconBg: 'bg-primary text-white',
            lightBg: '#eef2ff'
        },
        icon: 'bi-person-badge',
        mission: 'Menjalankan tugas dan tanggung jawab sesuai penugasan divisi organisasi dengan tertib dan terstruktur.',
        steps: [
            {
                step: 1,
                title: 'Laporkan Aktivitas di Logbook',
                desc: 'Isi logbook harian setiap selesai bertugas.',
                route: 'profile.edit',
                hash: '#logbook-upload',
                btnText: 'Isi Logbook',
                icon: 'bi-journal-text'
            },
            {
                step: 2,
                title: 'Cek Departemen & Program Kerja',
                desc: 'Lihat agenda dan rekan kerja Anda di struktural.',
                route: 'structural',
                btnText: 'Lihat Struktural',
                icon: 'bi-diagram-3'
            }
        ],
        quickActions: [
            { title: 'Upload Logbook', route: 'profile.edit', hash: '#logbook-upload', icon: 'bi-journal-arrow-up', color: 'primary' },
            { title: 'Struktural', route: 'structural', icon: 'bi-diagram-3', color: 'info' }
        ],
        glossary: [],
        faqs: []
    };
}
