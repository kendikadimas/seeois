<script setup>
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import RoleWorkflowGuideModal from "@/Components/RoleWorkflowGuideModal.vue";
import { getRoleWorkflow } from "@/utils/roleWorkflows";
import { Head, usePage, router } from "@inertiajs/vue3";
import { ref, watch, computed, onMounted, nextTick } from "vue";

const logoSrc = '/images/assets/logo.png';

const page = usePage();
const sidebarRef = ref(null);
const offcanvasInstance = ref(null);
const modalConfirmationRef = ref(null);
const guideModalRef = ref(null);

const auth_user = computed(() => page.props.auth?.user || {});
const userRole = computed(() => Number(auth_user.value?.roles_id || 0));
const roleName = computed(() => auth_user.value?.role_name || 'Staff');
const capabilities = computed(() => auth_user.value?.capabilities || []);
const can = (capability) => capabilities.value.includes('*') || capabilities.value.includes(capability);

// Role Workflow metadata
const currentRoleWorkflow = computed(() => getRoleWorkflow(userRole.value, roleName.value));

const available_years = computed(() => page.props.available_years || []);
const selected_year = ref(page.props.selected_year || new Date().getFullYear());

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

function submitYear() {
    router.post("/seeo/staff/year", { year: selected_year.value }, { preserveScroll: true, preserveState: true });
}

// Route helper
const route = (name, params = {}) => window.route(name, params);
route.current = (routeName) => {
    if (window.route().current(routeName)) return true;
    const currentComponent = page.component;
    if (!routeName) return currentComponent;
    const componentToRouteBase = {
        'Staff/SEEO/Dashboard': 'dashboard',
        'Staff/SEEO/UserController': 'role',
        'Staff/SEEO/DepartmentController': 'structural',
        'Staff/SEEO/Department': 'department',
        'Staff/SEEO/Program': 'program',
        'Staff/SEEO/CashFlow': 'finance',
        'Staff/SEEO/CashFlowFeature': 'finance.feature',
        'Staff/SEEO/PinnedDocs': 'PinnedDocs',
        'Staff/SEEO/FinancePanel': 'finance.pending',
        'Staff/SEEO/IwpPanel': 'iwp.receipts',
        'Staff/SEEO/Birthdays': 'hr.birthdays',
        'Staff/Business/Insight': 'blaterian.insight',
        'Staff/Business/InsightCashflow': 'blaterian.insight.cashflow',
        'Staff/Business/InsightCustomer': 'blaterian.insight.customer',
        'Staff/Business/Stand': 'food.stand',
        'Staff/Business/StandDetail': 'food.stand.detail',
        'Staff/Business/StandCashier': 'food.stand.cashier',
        'Staff/Business/GoodBalance': 'good.balance',
        'Staff/Business/GoodProduct': 'good.product',
        'Staff/Marketing/MarketingCms': 'marketing.cms',
        'Staff/Marketing/Structures': 'marketing.structures.index',
        'Staff/Marketing/Activities': 'marketing.activities',
        'Staff/SEEO/OperatingPanel': 'operating.panel',
        'Staff/Business/MenuBoard': 'staff.sales-distribution.index',
        'Staff/Business/ProductionPanel': 'staff.production.panel.index',
        'Staff/SEEO/SeminarRegistrations': 'staff.seminar.registrations.index',
        'Staff/SEEO/SuperAdminPanel': 'super.admin.panel',
        'Public/SeminarRegister': 'seminar.registration.create',
    };
    const currentRouteBase = componentToRouteBase[currentComponent];
    if (!currentRouteBase) return false;
    return currentRouteBase === routeName || currentRouteBase.startsWith(routeName + '.');
};

const currentTime = ref('');
const date_header = computed(() => {
    const now = new Date();
    return now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
});

// Live Search Filter for Navigation Menu
const searchKeyword = ref('');

// === 1. PRIMARY ROLE WORKSPACE ITEMS (Displayed prominently at top) ===
const primary_workspace_items = computed(() => {
    const role = userRole.value;
    const items = [];

    // Super Admin (99)
    if (role === 99) {
        items.push({ route: route("super.admin.panel"), active: route.current("super.admin.panel"), title: "Super Admin Panel", tag: "Sistem", icon: "bi-shield-lock-fill" });
        items.push({ route: route("ceo.panel"), active: route.current("ceo.panel"), title: "CEO Panel (Tata Kelola)", tag: "Periode", icon: "bi-award-fill" });
        items.push({ route: route("role"), active: route.current("role"), title: "User & Role Staf", tag: "Akun", icon: "bi-person-gear" });
        items.push({ route: route("operating.panel"), active: route.current("operating.panel"), title: "Operating Panel", tag: "Logbook", icon: "bi-clipboard2-check" });
        items.push({ route: route("blaterian.insight"), active: route.current("blaterian.insight"), title: "Business Insight", tag: "Bisnis", icon: "bi-graph-up-arrow" });
    }
    // CEO (1)
    else if (role === 1) {
        items.push({ route: route("ceo.panel"), active: route.current("ceo.panel"), title: "CEO Panel", tag: "Governance", icon: "bi-award-fill" });
        items.push({ route: route("structural"), active: route.current("structural") || route.current("department") || route.current("program"), title: "Struktur Organisasi", tag: "Departemen", icon: "bi-diagram-3-fill" });
        items.push({ route: route("role"), active: route.current("role"), title: "Data Staf & Role", tag: "SDM", icon: "bi-people-fill" });
        items.push({ route: route("blaterian.insight"), active: route.current("blaterian.insight"), title: "Wawasan Bisnis", tag: "Omzet", icon: "bi-graph-up" });
    }
    // Financial Officer (2)
    else if (role === 2) {
        items.push({ route: route("finance.pending"), active: route.current("finance.pending"), title: "Pending Validation", tag: "Validasi", icon: "bi-clock-history" });
        items.push({ route: route("finance"), active: route.current("finance"), title: "Buku Kas (Cashflow)", tag: "Kas Masuk/Keluar", icon: "bi-cash-stack" });
        items.push({ route: route("finance.feature"), active: route.current("finance.feature"), title: "Contribution & Payroll", tag: "Iuran & Gaji", icon: "bi-stars" });
    }
    // Operational Officer (COO) (3)
    else if (role === 3) {
        items.push({ route: route("operating.panel"), active: route.current("operating.panel"), title: "Operating Panel", tag: "Validasi Logbook", icon: "bi-clipboard2-check" });
        items.push({ route: route("food.stand"), active: route.current("food.stand") || route.current("food.stand.detail"), title: "Stand Management", tag: "Stand Foods", icon: "bi-shop" });
        items.push({ route: route("food.balance"), active: route.current("food.balance"), title: "Saldo Stand Makanan", tag: "Tarik Saldo", icon: "bi-bank" });
        items.push({ route: route("blaterian.insight"), active: route.current("blaterian.insight"), title: "Business Insight", tag: "Omzet Stand", icon: "bi-graph-up" });
    }
    // Sales Distribution / Kasir (10)
    else if (role === 10) {
        items.push({ route: route("food.stand"), active: route.current("food.stand") || route.current("food.stand.cashier"), title: "Kasir Stand Foods", tag: "POS Kasir", icon: "bi-calculator-fill" });
        items.push({ route: route("staff.sales-distribution.index"), active: route.current("staff.sales-distribution.index"), title: "Distribusi Pesanan", tag: "Deliver", icon: "bi-cart-check-fill" });
        items.push({ route: route("blaterian.insight"), active: route.current("blaterian.insight"), title: "Wawasan Penjualan", tag: "Rekap", icon: "bi-graph-up" });
    }
    // Production / Dapur & Bar (11)
    else if (role === 11) {
        items.push({ route: route("staff.production.panel.index"), active: route.current("staff.production.panel.index"), title: "Production Panel", tag: "Update Stok", icon: "bi-boxes" });
        items.push({ route: route("staff.sales-distribution.index"), active: route.current("staff.sales-distribution.index"), title: "Resep & Menu Board", tag: "Komponen Menu", icon: "bi-card-checklist" });
        items.push({ route: route("food.stand"), active: route.current("food.stand"), title: "Stand Makanan", tag: "Stand", icon: "bi-shop" });
    }
    // HR Manager (6) & Intern PIC (15)
    else if (role === 6 || role === 15) {
        items.push({ route: route("internship.applications.index"), active: route.current("internship.applications.index"), title: "Pendaftaran Magang", tag: "Review Seleksi", icon: "bi-briefcase-fill" });
        items.push({ route: route("certificate.manage"), active: route.current("certificate.manage"), title: "Sertifikat Magang", tag: "Kelola E-Sertifikat", icon: "bi-award-fill" });
        items.push({ route: route("hr.birthdays"), active: route.current("hr.birthdays"), title: "Ulang Tahun Staf", tag: "Apresiasi", icon: "bi-balloon-fill" });
        items.push({ route: route("role"), active: route.current("role"), title: "User & Pegawai", tag: "Rekrutmen", icon: "bi-people-fill" });
    }
    // Marketing Medinfo (9, 100) & PR (12)
    else if (role === 9 || role === 100 || role === 12) {
        items.push({ route: route("marketing.cms"), active: route.current("marketing.cms"), title: "Marketing CMS", tag: "Web Profile", icon: "bi-laptop" });
        items.push({ route: route("marketing.activities.index"), active: route.current("marketing.activities"), title: "Berita & Aktivitas", tag: "Liputan", icon: "bi-newspaper" });
        items.push({ route: route("staff.seminar.registrations.index"), active: route.current("staff.seminar.registrations"), title: "Pendaftaran Seminar", tag: "Event", icon: "bi-easel-fill" });
    }
    // IWP PIC (13)
    else if (role === 13) {
        items.push({ route: route("iwp.receipts"), active: route.current("iwp.receipts"), title: "Validasi Pembayaran IWP", tag: "Verifikasi Struk", icon: "bi-receipt-cutoff" });
        items.push({ route: route("profile.edit") + "#iwp-payment", active: false, title: "IWP Saya", tag: "Iuran Pribadi", icon: "bi-wallet2" });
    }
    // Management Document / Sekretaris (8)
    else if (role === 8) {
        items.push({ route: route("pinneddoc.index"), active: route.current("PinnedDocs"), title: "Dokumen Sematan (Pinned)", tag: "SK & SOP", icon: "bi-pin-angle-fill" });
        items.push({ route: route("dashboard"), active: route.current("dashboard"), title: "Lampiran Dashboard", tag: "Attachment", icon: "bi-paperclip" });
    }
    // Default: Staff & Interns (4, 5)
    else {
        items.push({ route: route("profile.edit") + "#logbook-upload", active: false, title: "Upload Logbook Harian", tag: "Tugas Harian", icon: "bi-journal-arrow-up" });
        items.push({ route: route("profile.edit") + "#iwp-payment", active: false, title: "Pembayaran IWP", tag: "Iuran Bulanan", icon: "bi-wallet2" });
        if (can('organization.view')) {
            items.push({ route: route("structural"), active: route.current("structural"), title: "Struktur Departemen", tag: "Agenda Tim", icon: "bi-diagram-3" });
        }
    }

    return items;
});

// === 2. FULL ORGANIZED NAVIGATION SECTIONS ===
const nav_sections = computed(() => {
    const role = userRole.value;
    const sections = [];

    // --- SEKSI 1: PRIBADI & LOGBOOK ---
    const pribadiItems = [
        { route: route("dashboard"), active: route.current("dashboard"), title: "Dashboard Utama", sub: "Beranda & Pengumuman", icon: "bi-speedometer2" },
        { route: route("profile.edit") + "#logbook-upload", active: false, title: "Upload Logbook", sub: "Laporan Aktivitas Harian", icon: "bi-journal-arrow-up" },
        { route: route("profile.edit") + "#iwp-payment", active: false, title: "Pembayaran IWP", sub: "Iuran Wajib Pengurus", icon: "bi-wallet2" },
        { route: route("profile.edit"), active: route.current("profile.edit"), title: "Profil Saya", sub: "Data Pribadi & Password", icon: "bi-person-circle" },
    ];
    sections.push({
        key: 'pribadi',
        title: 'Pribadi & Aktivitas',
        icon: 'bi-person-workspace',
        items: pribadiItems
    });

    // --- SEKSI 2: MANAJEMEN ORGANISASI ---
    const orgItems = [];
    if (can('organization.view') || can('organization.manage')) {
        orgItems.push({
            route: route("structural"),
            active: route.current("structural") || route.current("department") || route.current("program"),
            title: "Struktur Organisasi",
            sub: "Departemen & Program Kerja",
            icon: "bi-diagram-3"
        });
    }
    if (can('employee.manage')) {
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
            key: 'organisasi',
            title: 'Manajemen Organisasi',
            icon: 'bi-building',
            items: orgItems
        });
    }

    // --- SEKSI 3: KEUANGAN & ANGGARAN ---
    const finItems = [];
    if (can('finance.manage')) {
        finItems.push({
            route: route("finance.pending"),
            active: route.current("finance.pending"),
            title: "Pending Validation",
            sub: "Kuitansi & Belanja Pending",
            icon: "bi-clock-history",
            badge: "Penting"
        });
    }
    if (can('finance.view') || can('finance.manage')) {
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
    if (can('iwp.manage')) {
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
            key: 'keuangan',
            title: 'Keuangan & Kas',
            icon: 'bi-wallet-fill',
            items: finItems
        });
    }

    // --- SEKSI 4: BISNIS STAND & FOODS ---
    const foodItems = [];
    if (can('inventory.view') || can('stands.manage') || can('goods.manage')) {
        foodItems.push({
            route: route("blaterian.insight"),
            active: route.current("blaterian.insight"),
            title: "Business Insight",
            sub: "Statistik Penjualan & Omzet",
            icon: "bi-graph-up"
        });
    }
    if (can('stands.manage') || can('inventory.view')) {
        foodItems.push({
            route: route("food.stand"),
            active: route.current("food.stand") || route.current("food.stand.detail") || route.current("food.stand.cashier"),
            title: "Manajemen Stand",
            sub: "Stand Makanan & Kasir",
            icon: "bi-shop"
        });
    }
    if (can('stands.manage')) {
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
    if (can('sales.manage')) {
        foodItems.push({
            route: route("staff.sales-distribution.index"),
            active: route.current("staff.sales-distribution.index"),
            title: "Distribusi Penjualan",
            sub: "Antrean Pesanan & Deliver",
            icon: "bi-cart-check"
        });
    }
    if (can('production.manage')) {
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
            key: 'bisnis_foods',
            title: 'Bisnis Stand & Foods',
            icon: 'bi-cup-hot-fill',
            items: foodItems
        });
    }

    // --- SEKSI 5: BISNIS PRODUK (GOODS) ---
    const goodsItems = [];
    if (can('goods.manage') || can('inventory.view')) {
        goodsItems.push({
            route: route('good.product'),
            active: route.current("good.product"),
            title: "Produk Merchandise",
            sub: "Katalog Barang & Varian",
            icon: "bi-box-seam"
        });
    }
    if (can('goods.manage')) {
        goodsItems.push({
            route: route('good.balance'),
            active: route.current("good.balance"),
            title: "Saldo Goods",
            sub: "Kas Masuk/Keluar Merchandise",
            icon: "bi-currency-exchange"
        });
    }
    if (goodsItems.length > 0) {
        sections.push({
            key: 'bisnis_goods',
            title: 'Bisnis Merchandise',
            icon: 'bi-bag-check-fill',
            items: goodsItems
        });
    }

    // --- SEKSI 6: SDM & MAGANG ---
    const hrItems = [];
    if (can('internship.manage') || can('internship.view')) {
        hrItems.push({
            route: route("internship.applications.index"),
            active: route.current("internship.applications.index"),
            title: "Pendaftaran Magang",
            sub: "Seleksi Berkas Calon Intern",
            icon: "bi-briefcase"
        });
    }
    if (can('internship.manage')) {
        hrItems.push({
            route: route("certificate.manage"),
            active: route.current("certificate.manage"),
            title: "Sertifikat Magang",
            sub: "Penerbitan E-Sertifikat",
            icon: "bi-award"
        });
    }
    if (can('hr.manage')) {
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
            key: 'sdm',
            title: 'SDM & Magang',
            icon: 'bi-people-fill',
            items: hrItems
        });
    }

    // --- SEKSI 7: MEDIA & PEMASARAN ---
    const marketingItems = [];
    if (can('marketing.manage')) {
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
    if (can('seminar.manage')) {
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
            key: 'marketing',
            title: 'Media & Pemasaran',
            icon: 'bi-megaphone-fill',
            items: marketingItems
        });
    }

    // --- SEKSI 8: TATA KELOLA & SISTEM ---
    const specialItems = [];
    if (can('organization.manage')) {
        specialItems.push({
            route: route("ceo.panel"),
            active: route.current("ceo.panel"),
            title: "CEO Panel",
            sub: "Governance & Transisi Periode",
            icon: "bi-award-fill"
        });
    }
    if (can('documents.manage')) {
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
            key: 'sistem',
            title: 'Tata Kelola & Sistem',
            icon: 'bi-gear-fill',
            items: specialItems
        });
    }

    return sections;
});

// Flat array for instant live search
const all_nav_items_flat = computed(() => {
    const list = [];
    nav_sections.value.forEach(section => {
        section.items.forEach(item => {
            list.push({
                ...item,
                sectionName: section.title
            });
        });
    });
    return list;
});

// Filtered search results
const search_results = computed(() => {
    const q = searchKeyword.value.trim().toLowerCase();
    if (!q) return [];
    return all_nav_items_flat.value.filter(item => {
        return item.title.toLowerCase().includes(q) ||
               (item.sub && item.sub.toLowerCase().includes(q)) ||
               item.sectionName.toLowerCase().includes(q);
    });
});

// Section accordion state (default open all)
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

function toggleSection(key) {
    openedSections.value[key] = !openedSections.value[key];
}

function updateTime() {
    currentTime.value = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function confirmation(routeUrl, message) {
    if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(routeUrl, message);
    }
}

function openGuideModal(roleId = null) {
    guideModalRef.value?.open(roleId);
}

let timeInterval = null;

onMounted(async () => {
    updateTime();
    timeInterval = setInterval(updateTime, 1000);
    await nextTick();

    if (typeof window.bootstrap !== 'undefined' && sidebarRef.value) {
        try {
            offcanvasInstance.value = window.bootstrap.Offcanvas.getOrCreateInstance(sidebarRef.value);
            window.addEventListener('resize', () => {
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
</script>

<template>
    <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
    </Head>

    <div class="d-flex vh-100 overflow-x-hidden staff-app-root">
        <!-- ================= DESKTOP SIDEBAR ================= -->
        <aside class="sidebar-desktop d-none d-lg-flex flex-column shrink-0 bg-sidebar text-white shadow">
            <!-- Brand & App Identity -->
            <div class="sidebar-header p-3 border-bottom border-white border-opacity-10">
                <a :href="route('dashboard')" class="text-decoration-none">
                    <div class="d-flex align-items-center p-2 rounded-3 bg-white bg-opacity-10 brand-box transition-all">
                        <img :src="logoSrc" alt="SEEO Logo" class="brand-logo me-2 shadow-sm rounded-circle" @error="$event.target.src=logoSrc"/>
                        <div class="lh-sm">
                            <div class="d-flex align-items-center gap-2">
                                <h5 class="brand-title mb-0 fw-bold text-white tracking-wide">SEEOIS</h5>
                                <span class="badge bg-warning text-dark fw-bold text-2xs px-1 py-0 rounded">v5.0</span>
                            </div>
                            <span class="brand-subtitle text-white text-opacity-75 d-block">Information System</span>
                        </div>
                    </div>
                </a>

                <!-- User Role Indicator Card -->
                <div class="role-identity-card mt-3 p-2 px-3 rounded-3 bg-white bg-opacity-10 border border-white border-opacity-15">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="text-2xs text-uppercase tracking-wider text-warning fw-bold">
                            <i class="bi bi-person-badge me-1"></i> Peran Aktif
                        </span>
                        <button
                            type="button"
                            class="btn btn-link p-0 text-white text-opacity-75 text-decoration-none text-2xs hover-white"
                            @click="openGuideModal(userRole)"
                            title="Buka panduan alur kerja untuk peran ini"
                        >
                            <i class="bi bi-question-circle me-1"></i> SOP
                        </button>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <div class="role-icon-pill" :style="{ backgroundColor: currentRoleWorkflow.theme?.accentColor || '#4f46e5' }">
                            <i :class="['bi', currentRoleWorkflow.icon || 'bi-person-check']"></i>
                        </div>
                        <div class="text-truncate">
                            <div class="fw-bold small text-white text-truncate">{{ currentRoleWorkflow.title }}</div>
                            <small class="text-white text-opacity-75 text-2xs d-block text-truncate">{{ currentRoleWorkflow.alias }}</small>
                        </div>
                    </div>
                </div>

                <!-- Live Search Box -->
                <div class="menu-search-wrapper mt-3">
                    <div class="input-group input-group-sm">
                        <span class="input-group-text bg-white bg-opacity-10 border-0 text-white text-opacity-50">
                            <i class="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            v-model="searchKeyword"
                            class="form-control bg-white bg-opacity-10 border-0 text-white placeholder-white-50"
                            placeholder="Cari fitur atau aksi..."
                            aria-label="Cari fitur"
                        />
                        <button
                            v-if="searchKeyword"
                            class="btn btn-sm bg-white bg-opacity-10 text-white border-0"
                            type="button"
                            @click="searchKeyword = ''"
                        >
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Sidebar Scrollable Navigation Body -->
            <div class="sidebar-scrollable-content grow p-3">
                <!-- IF SEARCH ACTIVE: DISPLAY INSTANT SEARCH RESULTS -->
                <div v-if="searchKeyword.trim()" class="search-results-box">
                    <div class="small text-white text-opacity-75 mb-2 fw-semibold px-2">
                        Hasil Pencarian ({{ search_results.length }}):
                    </div>
                    <div v-if="search_results.length === 0" class="text-center py-4 text-white text-opacity-50 small">
                        <i class="bi bi-search display-6 d-block mb-2 opacity-50"></i>
                        Tidak ada menu yang cocok dengan "{{ searchKeyword }}"
                    </div>
                    <div v-else class="d-flex flex-column gap-1">
                        <a
                            v-for="(res, idx) in search_results"
                            :key="idx"
                            :href="res.route"
                            class="search-item d-flex align-items-center gap-2 p-2 rounded-3 text-white text-decoration-none transition-all"
                            :class="{ active: res.active }"
                        >
                            <i :class="['bi', res.icon || 'bi-arrow-right', 'text-warning fs-6']"></i>
                            <div class="text-truncate">
                                <div class="fw-medium small text-truncate">{{ res.title }}</div>
                                <small class="text-white text-opacity-50 text-2xs d-block text-truncate">{{ res.sectionName }} • {{ res.sub || '' }}</small>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- NORMAL NAVIGATION MENU -->
                <div v-else class="standard-menu-tree">
                    <!-- 🌟 RUANG KERJA UTAMA (Highlighted Role Workspace) -->
                    <div class="primary-workspace-section mb-4 p-2 rounded-3 bg-white bg-opacity-10 border border-white border-opacity-15 shadow-2xs">
                        <div class="d-flex justify-content-between align-items-center px-2 py-1 mb-2">
                            <span class="text-2xs fw-bold text-uppercase tracking-wider text-warning">
                                <i class="bi bi-star-fill me-1"></i> Ruang Kerja Utama
                            </span>
                            <span class="badge rounded-pill bg-warning text-dark text-3xs px-2 py-0">Prioritas</span>
                        </div>
                        <div class="d-flex flex-column gap-1">
                            <a
                                v-for="(item, idx) in primary_workspace_items"
                                :key="'prim-' + idx"
                                :href="item.route"
                                class="primary-nav-link d-flex align-items-center justify-content-between p-2 rounded-2 text-white text-decoration-none transition-all"
                                :class="{ active: item.active }"
                            >
                                <div class="d-flex align-items-center gap-2 text-truncate">
                                    <i :class="['bi', item.icon, 'text-warning']"></i>
                                    <span class="fw-medium small text-truncate">{{ item.title }}</span>
                                </div>
                                <span v-if="item.tag" class="badge rounded-pill bg-white bg-opacity-20 text-white text-3xs px-2">
                                    {{ item.tag }}
                                </span>
                            </a>
                        </div>
                    </div>

                    <!-- CATEGORIZED ACCORDIONS -->
                    <div
                        v-for="section in nav_sections"
                        :key="section.key"
                        class="nav-section-group mb-3"
                    >
                        <button
                            type="button"
                            class="section-toggle-btn w-100 d-flex justify-content-between align-items-center text-start border-0 bg-transparent text-white text-opacity-80 p-2 rounded-2 transition-all"
                            @click="toggleSection(section.key)"
                        >
                            <div class="d-flex align-items-center gap-2">
                                <i :class="['bi', section.icon, 'text-warning text-opacity-80 small']"></i>
                                <span class="fw-bold text-uppercase tracking-wider text-2xs">{{ section.title }}</span>
                            </div>
                            <i :class="['bi', openedSections[section.key] ? 'bi-chevron-up' : 'bi-chevron-down', 'text-2xs opacity-50']"></i>
                        </button>

                        <div v-show="openedSections[section.key]" class="section-links-container pt-1 ps-2">
                            <a
                                v-for="(item, iIdx) in section.items"
                                :key="section.key + '-' + iIdx"
                                :href="item.route"
                                class="standard-nav-link d-flex align-items-center justify-content-between p-2 rounded-2 text-white text-decoration-none transition-all mb-1"
                                :class="{ active: item.active }"
                            >
                                <div class="d-flex align-items-center gap-2 text-truncate">
                                    <i :class="['bi', item.icon || 'bi-circle', 'nav-icon']"></i>
                                    <div class="lh-1 text-truncate">
                                        <div class="fw-medium small text-truncate">{{ item.title }}</div>
                                        <small v-if="item.sub" class="text-white text-opacity-50 text-3xs d-block text-truncate mt-1">{{ item.sub }}</small>
                                    </div>
                                </div>
                                <span v-if="item.badge" class="badge bg-danger rounded-pill text-3xs px-2">
                                    {{ item.badge }}
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar Footer (Quick Guide Button) -->
            <div class="sidebar-footer p-3 border-top border-white border-opacity-10 bg-black bg-opacity-15">
                <button
                    type="button"
                    class="btn btn-warning w-100 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-pill shadow-sm py-2"
                    @click="openGuideModal(userRole)"
                >
                    <i class="bi bi-lightbulb-fill"></i>
                    <span>Panduan Alur Peran</span>
                </button>
            </div>
        </aside>

        <!-- ================= MOBILE OFFCANVAS SIDEBAR ================= -->
        <div class="offcanvas offcanvas-start bg-sidebar text-white sidebar-mobile" tabindex="-1" id="sidebarOffcanvas" ref="sidebarRef">
            <div class="offcanvas-header border-bottom border-white border-opacity-10 p-3">
                <div class="d-flex align-items-center p-1">
                    <img :src="logoSrc" alt="SEEO Logo" class="brand-logo me-2 rounded-circle" @error="$event.target.src=logoSrc"/>
                    <div>
                        <h5 class="brand-title mb-0 fw-bold text-white">SEEOIS</h5>
                        <small class="text-white text-opacity-75">Information System</small>
                    </div>
                </div>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div class="offcanvas-body p-3 overflow-y-auto">
                <!-- Mobile Role Card -->
                <div class="role-identity-card mb-3 p-2 px-3 rounded-3 bg-white bg-opacity-10 border border-white border-opacity-15">
                    <div class="d-flex align-items-center gap-2">
                        <div class="role-icon-pill" :style="{ backgroundColor: currentRoleWorkflow.theme?.accentColor || '#4f46e5' }">
                            <i :class="['bi', currentRoleWorkflow.icon || 'bi-person-check']"></i>
                        </div>
                        <div class="text-truncate">
                            <div class="fw-bold small text-white text-truncate">{{ currentRoleWorkflow.title }}</div>
                            <small class="text-white text-opacity-75 text-2xs d-block text-truncate">{{ currentRoleWorkflow.alias }}</small>
                        </div>
                    </div>
                </div>

                <!-- Primary Workspace for Mobile -->
                <div class="primary-workspace-section mb-3 p-2 rounded-3 bg-white bg-opacity-10 border border-white border-opacity-15">
                    <div class="px-2 py-1 text-2xs fw-bold text-uppercase tracking-wider text-warning mb-1">
                        Ruang Kerja Utama ({{ currentRoleWorkflow.alias }})
                    </div>
                    <div class="d-flex flex-column gap-1">
                        <a
                            v-for="(item, idx) in primary_workspace_items"
                            :key="'mob-prim-' + idx"
                            :href="item.route"
                            class="primary-nav-link d-flex align-items-center gap-2 p-2 rounded-2 text-white text-decoration-none"
                            :class="{ active: item.active }"
                        >
                            <i :class="['bi', item.icon, 'text-warning']"></i>
                            <span class="small fw-medium">{{ item.title }}</span>
                        </a>
                    </div>
                </div>

                <!-- Categorized Sections for Mobile -->
                <div
                    v-for="section in nav_sections"
                    :key="'mob-' + section.key"
                    class="mb-3"
                >
                    <div class="text-2xs fw-bold text-uppercase tracking-wider text-white text-opacity-60 px-2 mb-1">
                        {{ section.title }}
                    </div>
                    <div class="d-flex flex-column gap-1 ps-2">
                        <a
                            v-for="(item, iIdx) in section.items"
                            :key="'mob-link-' + iIdx"
                            :href="item.route"
                            class="standard-nav-link d-flex align-items-center gap-2 p-2 rounded-2 text-white text-decoration-none"
                            :class="{ active: item.active }"
                        >
                            <i :class="['bi', item.icon || 'bi-circle', 'nav-icon']"></i>
                            <span class="small">{{ item.title }}</span>
                        </a>
                    </div>
                </div>

                <div class="pt-3 border-top border-white border-opacity-15">
                    <button
                        type="button"
                        class="btn btn-warning w-100 fw-bold rounded-pill"
                        @click="openGuideModal(userRole)"
                    >
                        <i class="bi bi-lightbulb-fill me-1"></i> Panduan Alur Peran
                    </button>
                </div>
            </div>
        </div>

        <!-- ================= MAIN CONTENT WRAPPER ================= -->
        <div class="main-content-wrapper grow d-flex flex-column overflow-hidden position-relative bg-surface">
            <!-- Modern Top Header -->
            <header class="top-header border-bottom px-3 py-2 d-flex justify-content-between align-items-center shadow-2xs z-dropdown">
                <!-- Left: Mobile Toggle & Page Breadcrumbs -->
                <div class="d-flex align-items-center gap-2 me-auto">
                    <button
                        class="btn btn-light d-lg-none p-1 px-2 border-0 shadow-2xs"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#sidebarOffcanvas"
                        aria-controls="sidebarOffcanvas"
                        title="Buka Menu"
                    >
                        <i class="bi bi-list fs-4"></i>
                    </button>

                    <div class="page-header-info">
                        <h1 class="page-main-title mb-0 fs-5 fw-bold text-dark lh-sm">
                            <slot name="header">Dashboard</slot>
                        </h1>
                        <div class="page-meta small text-muted d-flex align-items-center gap-2">
                            <span>{{ date_header }}</span>
                            <span class="d-none d-md-inline">•</span>
                            <span class="d-none d-md-inline fw-medium text-dark"><i class="bi bi-clock me-1"></i>{{ currentTime }}</span>
                        </div>
                    </div>
                </div>

                <!-- Right: Header Actions (Guide Button, Year Switcher, Profile) -->
                <div class="d-flex align-items-center gap-2">
                    <!-- Interactive Role Workflow Guide Button -->
                    <button
                        type="button"
                        class="btn btn-outline-primary header-guide-btn d-flex align-items-center gap-2 rounded-pill px-3 py-1 shadow-2xs transition-all"
                        @click="openGuideModal(userRole)"
                        title="Klik untuk panduan cara kerja peran Anda"
                    >
                        <i class="bi bi-lightbulb-fill text-warning fs-6"></i>
                        <span class="d-none d-sm-inline fw-semibold">Panduan Alur</span>
                        <span class="badge rounded-pill bg-primary text-white d-none d-md-inline">
                            {{ currentRoleWorkflow.alias }}
                        </span>
                    </button>

                    <!-- Governance Year Selector -->
                    <div v-if="can_switch_year" class="d-none d-md-flex align-items-center gap-1 bg-white p-1 ps-2 rounded-pill border shadow-2xs">
                        <i class="bi bi-calendar-event text-secondary small"></i>
                        <select
                            class="form-select form-select-sm border-0 bg-transparent fw-medium py-0 pe-4"
                            style="width: 90px; box-shadow: none; font-size: 0.85rem;"
                            v-model="selected_year"
                            @change="submitYear"
                        >
                            <option v-for="y in available_years" :key="y" :value="y">{{ y }}</option>
                        </select>
                    </div>

                    <!-- User Profile Dropdown -->
                    <div class="user-profile dropdown">
                        <button
                            class="profile-btn btn d-flex align-items-center gap-2 dropdown-toggle border-0 p-1 px-2 rounded-pill bg-white shadow-2xs"
                            type="button"
                            id="profileDropdownMenu"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                :src="auth_user?.full_profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(auth_user?.name || 'User')}&color=4F46E5&background=EEF2FF`"
                                alt="Profile"
                                class="profile-img rounded-circle shadow-2xs"
                                @error="$event.target.src='/storage/local/images/compro/logo.png'"
                            />
                            <div class="profile-info d-none d-lg-block text-start lh-1 me-1">
                                <div class="fw-bold small text-dark text-truncate" style="max-width: 140px;">
                                    {{ auth_user?.name }}
                                </div>
                                <span class="badge bg-primary-subtle text-primary border border-primary-subtle text-3xs px-1 mt-1">
                                    {{ currentRoleWorkflow.alias }}
                                </span>
                            </div>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2 rounded-3 py-2" aria-labelledby="profileDropdownMenu">
                            <li class="px-3 py-1 mb-1 border-bottom">
                                <div class="fw-bold small text-dark">{{ auth_user?.name }}</div>
                                <small class="text-muted">{{ auth_user?.email }}</small>
                            </li>
                            <li>
                                <a :href="route('profile.edit')" class="dropdown-item small py-2">
                                    <i class="bi bi-person-gear me-2 text-primary"></i>
                                    <span>Pengaturan Profil</span>
                                </a>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item small py-2" @click="openGuideModal(userRole)">
                                    <i class="bi bi-lightbulb me-2 text-warning"></i>
                                    <span>Panduan Alur Peran</span>
                                </button>
                            </li>
                            <li><hr class="dropdown-divider my-1"></li>
                            <li>
                                <a
                                    class="dropdown-item text-danger small py-2"
                                    href="#"
                                    @click.prevent="confirmation(route('logout'), 'Apakah Anda yakin ingin keluar dari aplikasi?')"
                                >
                                    <i class="bi bi-box-arrow-right me-2"></i>
                                    <span>Keluar (Logout)</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            <!-- Main Dynamic Page Content Container -->
            <main class="content-container grow overflow-auto p-2 p-md-3">
                <slot />
            </main>
        </div>

        <!-- Global Modals -->
        <ModalConfirmation ref="modalConfirmationRef" />
        <RoleWorkflowGuideModal ref="guideModalRef" />
    </div>
</template>

<style scoped>
/* App Font */
.staff-app-root {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}

/* Backgrounds & Palette */
.bg-sidebar {
    background: linear-gradient(180deg, #1e1b4b 0%, #2e266d 100%);
}
.bg-surface {
    background-color: #f8fafc;
}

/* Sidebar Desktop */
.sidebar-desktop {
    width: 275px;
    height: 100vh;
}
.sidebar-mobile {
    width: 280px;
}

.brand-logo {
    width: 38px;
    height: 38px;
    object-fit: cover;
}
.brand-title {
    font-size: 1.15rem;
    letter-spacing: 0.05em;
}
.brand-subtitle {
    font-size: 0.72rem;
}
.brand-box:hover {
    background-color: rgba(255, 255, 255, 0.15) !important;
}

/* Role Indicator Card */
.role-icon-pill {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 0.9rem;
    flex-shrink: 0;
}

/* Scrollable Menu Area */
.sidebar-scrollable-content {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
.sidebar-scrollable-content::-webkit-scrollbar {
    width: 5px;
}
.sidebar-scrollable-content::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
}

/* Primary Workspace Links */
.primary-nav-link {
    background: rgba(255, 255, 255, 0.08);
}
.primary-nav-link:hover {
    background: rgba(255, 255, 255, 0.18);
    transform: translateX(3px);
}
.primary-nav-link.active {
    background: #4f46e5;
    box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.4);
}

/* Standard Accordion Links */
.section-toggle-btn:hover {
    background-color: rgba(255, 255, 255, 0.08);
}
.standard-nav-link {
    color: rgba(255, 255, 255, 0.85);
    border-left: 2px solid transparent;
}
.standard-nav-link:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.12);
    transform: translateX(3px);
}
.standard-nav-link.active {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.2);
    border-left-color: #fbbf24;
    font-weight: 600;
}
.standard-nav-link .nav-icon {
    font-size: 0.9rem;
    opacity: 0.8;
}

/* Search results */
.search-item:hover {
    background-color: rgba(255, 255, 255, 0.15);
}
.search-item.active {
    background-color: #4f46e5;
}

/* Header */
.top-header {
    background-color: #ffffff;
    height: 65px;
    flex-shrink: 0;
}
.profile-img {
    width: 38px;
    height: 38px;
    object-fit: cover;
}
.header-guide-btn {
    border-width: 1.5px;
}
.header-guide-btn:hover {
    transform: translateY(-1px);
}

/* Utility font sizes */
.text-2xs {
    font-size: 0.75rem;
}
.text-3xs {
    font-size: 0.68rem;
}
.shadow-2xs {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.hover-white:hover {
    color: #ffffff !important;
}
</style>
