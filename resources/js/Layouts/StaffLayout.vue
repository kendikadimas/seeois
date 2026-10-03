<script setup>
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import RoleWorkflowGuideModal from "@/Components/RoleWorkflowGuideModal.vue";
import WelcomeBanner from "@/Components/WelcomeBanner.vue";
import { getRoleWorkflow } from "@/utils/roleWorkflows";
import { Head, usePage, router } from "@inertiajs/vue3";
import { ref, watch, computed, onMounted, onBeforeUnmount, nextTick } from "vue";

const logoSrc = '/images/assets/logo.png';

const page = usePage();
const sidebarRef = ref(null);
const offcanvasInstance = ref(null);
const modalConfirmationRef = ref(null);
const guideModalRef = ref(null);

const auth_user = computed(() => page.props.auth?.user || {});
const appVersion = computed(() => page.props.app?.version || '6.0');
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
        'Staff/Business/FoodBalance': 'food.balance',
        'Staff/Business/GoodBalance': 'good.balance',
        'Staff/Business/GoodProduct': 'good.product',
        'Staff/Business/GoodDetail': 'good.product',
        'Staff/Business/GoodInsight': 'good.insight',
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

const welcomeSteps = computed(() => [
    { icon: 'bi-journal-arrow-up', text: 'Isi logbook', action: route('staff.logbook') },
    { icon: 'bi-wallet2', text: 'Cek pembayaran IWP', action: route('staff.iwp-payment') },
]);

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
        items.push({ route: route("staff.iwp-payment"), active: route.current("staff.iwp-payment"), title: "IWP Saya", tag: "Iuran Pribadi", icon: "bi-wallet2" });
    }
    // Management Document / Sekretaris (8)
    else if (role === 8) {
        items.push({ route: route("pinneddoc.index"), active: route.current("PinnedDocs"), title: "Dokumen Sematan (Pinned)", tag: "SK & SOP", icon: "bi-pin-angle-fill" });
        items.push({ route: route("dashboard"), active: route.current("dashboard"), title: "Lampiran Dashboard", tag: "Attachment", icon: "bi-paperclip" });
    }
    // Default: Staff & Interns (4, 5)
    else {
        items.push({ route: route("staff.logbook"), active: route.current("staff.logbook"), title: "Upload Logbook Harian", tag: "Tugas Harian", icon: "bi-journal-arrow-up" });
        items.push({ route: route("staff.iwp-payment"), active: route.current("staff.iwp-payment"), title: "Pembayaran IWP", tag: "Iuran Bulanan", icon: "bi-wallet2" });
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
        { route: route("staff.logbook"), active: route.current("staff.logbook"), title: "Logbook", sub: "Laporan Aktivitas Harian", icon: "bi-journal-arrow-up" },
        { route: route("staff.iwp-payment"), active: route.current("staff.iwp-payment"), title: "Pembayaran IWP", sub: "Iuran Wajib Pengurus", icon: "bi-wallet2" },
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
            route: route('good.insight'),
            active: route.current("good.insight"),
            title: "Insight Merchandise",
            sub: "Penjualan & Modal Produk",
            icon: "bi-graph-up-arrow"
        });
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

// Sections are always open — no accordion behavior needed

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
const handleViewportResize = () => {
    if (window.innerWidth >= 992 && offcanvasInstance.value) {
        offcanvasInstance.value.hide();
    }
};

onMounted(async () => {
    updateTime();
    timeInterval = setInterval(updateTime, 1000);
    await nextTick();

    if (typeof window.bootstrap !== 'undefined' && sidebarRef.value) {
        try {
            offcanvasInstance.value = window.bootstrap.Offcanvas.getOrCreateInstance(sidebarRef.value);
            window.addEventListener('resize', handleViewportResize);
        } catch (e) {
            console.error("Error initializing Offcanvas:", e);
        }
    }
});

onBeforeUnmount(() => {
    if (timeInterval) clearInterval(timeInterval);
    window.removeEventListener('resize', handleViewportResize);
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
    <div class="d-flex overflow-x-hidden staff-app-root">
        <!-- ================= DESKTOP SIDEBAR ================= -->
        <aside class="sidebar-desktop d-none d-lg-flex flex-column shrink-0 bg-sidebar text-white">
            <!-- Brand & App Identity -->
            <div class="sidebar-header p-3 border-bottom border-white border-opacity-10">
                <a :href="route('dashboard')" class="text-decoration-none">
                    <div class="d-flex align-items-center px-1 py-2 brand-box">
                        <img :src="logoSrc" alt="SEEO Logo" class="brand-logo me-2 rounded-2" @error="$event.target.src=logoSrc"/>
                        <div class="lh-sm">
                            <div class="d-flex align-items-center gap-2">
                                <h5 class="brand-title mb-0 fw-bold text-white tracking-wide">SEEOIS</h5>
                                <span class="app-version-badge">v{{ appVersion }}</span>
                            </div>
                            <span class="brand-subtitle text-white text-opacity-75 d-block">Information System</span>
                        </div>
                    </div>
                </a>

                <!-- User Role Indicator Card -->
                <div class="role-identity-card mt-3 p-2">
                    <div class="d-flex align-items-center gap-2">
                        <div class="role-icon-pill" :style="{ backgroundColor: currentRoleWorkflow.theme?.accentColor || '#4f46e5' }">
                            <i :class="['bi', currentRoleWorkflow.icon || 'bi-person-check']" style="font-size:1.1rem;"></i>
                        </div>
                        <div class="text-truncate flex-grow-1">
                            <div class="fw-bold text-white text-truncate" style="font-size:0.85rem;">{{ currentRoleWorkflow.title }}</div>
                            <small class="text-white text-opacity-75 d-block text-truncate" style="font-size:0.75rem;">{{ currentRoleWorkflow.alias }}</small>
                        </div>
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-light px-2 py-0 hover-white flex-shrink-0"
                            style="font-size:0.7rem;"
                            @click="openGuideModal(userRole)"
                            title="Lihat panduan alur kerja untuk peran ini"
                        >
                            <i class="bi bi-question-circle me-1"></i> SOP
                        </button>
                    </div>
                </div>

                <!-- Live Search Box -->
                <div class="menu-search-wrapper mt-3">
                    <div class="input-group">
                        <span class="input-group-text bg-white bg-opacity-10 border-0 text-white text-opacity-60">
                            <i class="bi bi-search" style="font-size:0.9rem;"></i>
                        </span>
                        <input
                            type="text"
                            v-model="searchKeyword"
                            class="form-control bg-white bg-opacity-10 border-0 text-white placeholder-white-50"
                            style="font-size:0.85rem;"
                            placeholder="Cari fitur atau menu..."
                            aria-label="Cari fitur"
                        />
                        <button
                            v-if="searchKeyword"
                            class="btn bg-white bg-opacity-10 text-white border-0"
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
                    <div class="text-white text-opacity-75 mb-2 fw-semibold px-2" style="font-size:0.8rem;">
                        Hasil Pencarian ({{ search_results.length }}):
                    </div>
                    <div v-if="search_results.length === 0" class="text-center py-4 text-white text-opacity-50">
                        <i class="bi bi-search display-6 d-block mb-2 opacity-50"></i>
                        <div style="font-size:0.85rem;">Tidak ditemukan: "{{ searchKeyword }}"</div>
                    </div>
                    <div v-else class="d-flex flex-column gap-1">
                        <a
                            v-for="(res, idx) in search_results"
                            :key="idx"
                            :href="res.route"
                            :title="res.sub || res.title"
                            class="search-item d-flex align-items-center gap-3 p-2 rounded-3 text-white text-decoration-none transition-all"
                            :class="{ active: res.active }"
                        >
                            <i :class="['bi', res.icon || 'bi-arrow-right', 'text-warning']" style="font-size:1.1rem; flex-shrink:0;"></i>
                            <div class="text-truncate">
                                <div class="fw-semibold text-truncate" style="font-size:0.85rem;">{{ res.title }}</div>
                                <div class="text-white text-opacity-50 text-truncate" style="font-size:0.75rem;">{{ res.sectionName }}</div>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- NORMAL NAVIGATION MENU — No Accordion, Always Visible -->
                <div v-else class="standard-menu-tree">
                    <!-- ⭐ RUANG KERJA UTAMA -->
                    <div class="primary-workspace-section mb-4 pb-3">
                        <div class="d-flex align-items-center gap-2 px-2 py-1 mb-2">
                            <i class="bi bi-grid-1x2 text-white text-opacity-75" style="font-size:0.85rem;"></i>
                            <span class="fw-bold text-white text-opacity-75 text-uppercase" style="font-size:0.72rem; letter-spacing:0.07em;">Ruang kerja</span>
                        </div>
                        <div class="d-flex flex-column gap-1">
                            <a
                                v-for="(item, idx) in primary_workspace_items"
                                :key="'prim-' + idx"
                                :href="item.route"
                                :title="item.title"
                                class="primary-nav-link d-flex align-items-center justify-content-between p-2 px-3 rounded-2 text-white text-decoration-none transition-all"
                                :class="{ active: item.active }"
                            >
                                <div class="d-flex align-items-center gap-3 text-truncate">
                                    <i :class="['bi', item.icon]" style="font-size:1.1rem; flex-shrink:0;"></i>
                                    <span class="fw-semibold text-truncate" style="font-size:0.95rem;">{{ item.title }}</span>
                                </div>
                                <span v-if="item.tag" class="nav-tag ms-2 flex-shrink-0">
                                    {{ item.tag }}
                                </span>
                            </a>
                        </div>
                    </div>

                    <!-- SEKSI MENU SELALU TERLIHAT (Non-Collapsible) -->
                    <div
                        v-for="section in nav_sections"
                        :key="section.key"
                        class="nav-section-group mb-4"
                    >
                        <!-- Section Header (label only, no toggle button) -->
                        <div class="section-header d-flex align-items-center gap-2 px-2 mb-2">
                            <i :class="['bi', section.icon, 'text-warning text-opacity-80']" style="font-size:0.85rem;"></i>
                            <span class="fw-bold text-white text-opacity-70 text-uppercase" style="font-size:0.75rem; letter-spacing:0.06em;">{{ section.title }}</span>
                            <div class="section-divider flex-grow-1 ms-1"></div>
                        </div>

                        <!-- Section Items — always visible -->
                        <div class="section-links-container ps-1">
                            <a
                                v-for="(item, iIdx) in section.items"
                                :key="section.key + '-' + iIdx"
                                :href="item.route"
                                :title="item.sub || item.title"
                                class="standard-nav-link d-flex align-items-center justify-content-between p-2 px-3 rounded-2 text-white text-decoration-none mb-1"
                                :class="{ active: item.active }"
                            >
                                <div class="d-flex align-items-center gap-3 text-truncate">
                                    <i :class="['bi', item.icon || 'bi-circle', 'nav-icon']" style="flex-shrink:0;"></i>
<div class="lh-sm text-truncate">
                                                    <div class="fw-medium text-truncate" style="font-size:0.925rem;">{{ item.title }}</div>
                                                    <div v-if="item.sub" class="text-white text-opacity-50 text-truncate" style="font-size:0.78rem;">{{ item.sub }}</div>
                                                </div>
                                </div>
                                <span v-if="item.badge" class="badge bg-danger rounded-pill ms-2 flex-shrink-0" style="font-size:0.7rem;">
                                    {{ item.badge }}
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar Footer — Butuh Bantuan? -->
            <div class="sidebar-footer p-3 border-top border-white border-opacity-10">
                <button
                    type="button"
                    class="sidebar-help-btn btn w-100 d-flex align-items-center gap-2 px-3 py-2 text-white"
                    @click="openGuideModal(userRole)"
                >
                    <i class="bi bi-question-circle" style="font-size:1.05rem;"></i>
                    <div class="text-start lh-sm">
                        <div style="font-size:0.86rem; font-weight:650;">Panduan kerja</div>
                        <div style="font-size:0.72rem; opacity:0.72;">Alur dan SOP peran</div>
                    </div>
                    <i class="bi bi-chevron-right ms-auto" style="font-size:0.85rem; opacity:0.9;"></i>
                </button>
            </div>
        </aside>

        <!-- ================= MOBILE OFFCANVAS SIDEBAR ================= -->
        <div class="offcanvas offcanvas-start bg-sidebar text-white sidebar-mobile" tabindex="-1" id="sidebarOffcanvas" ref="sidebarRef">
            <div class="offcanvas-header border-bottom border-white border-opacity-10 p-3">
                <div class="d-flex align-items-center gap-2">
                    <img :src="logoSrc" alt="SEEO Logo" class="brand-logo rounded-circle" @error="$event.target.src=logoSrc"/>
                    <div>
                        <div class="d-flex align-items-center gap-2">
                            <h5 class="brand-title mb-0 fw-bold text-white">SEEOIS</h5>
                            <span class="app-version-badge">v{{ appVersion }}</span>
                        </div>
                        <small class="text-white text-opacity-75">Information System</small>
                    </div>
                </div>
                <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div class="offcanvas-body p-3 overflow-y-auto">
                <!-- Mobile Role Card -->
                <div class="role-identity-card mb-3 p-2">
                    <div class="d-flex align-items-center gap-3">
                        <div class="role-icon-pill" :style="{ backgroundColor: currentRoleWorkflow.theme?.accentColor || '#4f46e5' }">
                            <i :class="['bi', currentRoleWorkflow.icon || 'bi-person-check']" style="font-size:1.1rem;"></i>
                        </div>
                        <div class="text-truncate">
                            <div class="fw-bold text-white text-truncate" style="font-size:0.9rem;">{{ currentRoleWorkflow.title }}</div>
                            <div class="text-white text-opacity-75 text-truncate" style="font-size:0.78rem;">{{ currentRoleWorkflow.alias }}</div>
                        </div>
                    </div>
                </div>

                <div v-if="can_switch_year" class="mobile-year-switcher mb-3">
                    <label for="mobile-governance-year" class="small text-white text-opacity-75 mb-1">Periode data</label>
                    <select
                        id="mobile-governance-year"
                        class="form-select form-select-sm"
                        v-model="selected_year"
                        @change="submitYear"
                    >
                        <option v-for="y in available_years" :key="y" :value="y">{{ y }}</option>
                    </select>
                </div>

                <div class="menu-search-wrapper mb-3">
                    <div class="input-group">
                        <span class="input-group-text bg-white bg-opacity-10 border-0 text-white text-opacity-50">
                            <i class="bi bi-search"></i>
                        </span>
                        <input
                            v-model="searchKeyword"
                            type="search"
                            class="form-control bg-white bg-opacity-10 border-0 text-white placeholder-white-50"
                            placeholder="Cari menu atau fitur..."
                            aria-label="Cari menu atau fitur"
                        />
                        <button v-if="searchKeyword" type="button" class="btn bg-white bg-opacity-10 text-white border-0" @click="searchKeyword = ''" aria-label="Hapus pencarian">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>

                <div v-if="searchKeyword.trim()" class="mb-3">
                    <div class="text-2xs fw-bold text-uppercase tracking-wider text-white text-opacity-60 px-2 mb-2">
                        Hasil pencarian
                    </div>
                    <div v-if="search_results.length" class="d-flex flex-column gap-1">
                        <a
                            v-for="(result, index) in search_results"
                            :key="'mob-search-' + index"
                            :href="result.route"
                            class="search-item d-flex align-items-center gap-2 p-3 rounded-3 text-white text-decoration-none"
                            :class="{ active: result.active }"
                        >
                            <i :class="['bi', result.icon || 'bi-arrow-right-circle', 'text-warning']"></i>
                            <div class="min-width-0">
                                <div class="small fw-semibold text-truncate">{{ result.title }}</div>
                                <div class="text-3xs text-white text-opacity-50">{{ result.sectionName }}</div>
                            </div>
                        </a>
                    </div>
                    <div v-else class="text-center text-white text-opacity-50 small py-4">
                        <i class="bi bi-search d-block fs-3 mb-2"></i>
                        Menu tidak ditemukan.
                    </div>
                </div>

                <!-- Primary Workspace for Mobile -->
                <div v-show="!searchKeyword.trim()" class="primary-workspace-section mb-3 pb-3">
                    <div class="px-2 py-1 text-2xs fw-bold text-uppercase tracking-wider text-warning mb-1">
                        Ruang kerja {{ currentRoleWorkflow.alias }}
                    </div>
                    <div class="d-flex flex-column gap-1">
                        <a
                            v-for="(item, idx) in primary_workspace_items"
                            :key="'mob-prim-' + idx"
                            :href="item.route"
                            :title="item.title"
                            class="primary-nav-link d-flex align-items-center gap-3 p-2 px-3 rounded-2 text-white text-decoration-none"
                            :class="{ active: item.active }"
                        >
                            <i :class="['bi', item.icon, 'text-warning']" style="font-size:1.1rem; flex-shrink:0;"></i>
                            <span class="fw-semibold" style="font-size:0.875rem;">{{ item.title }}</span>
                        </a>
                    </div>
                </div>

                <!-- Categorized Sections for Mobile — always visible -->
                <div
                    v-for="section in nav_sections"
                    :key="'mob-' + section.key"
                    v-show="!searchKeyword.trim()"
                    class="mb-3"
                >
                    <div class="d-flex align-items-center gap-2 px-2 mb-2">
                        <i :class="['bi', section.icon, 'text-warning text-opacity-80']" style="font-size:0.85rem;"></i>
                        <span class="fw-bold text-white text-opacity-70 text-uppercase" style="font-size:0.75rem; letter-spacing:0.05em;">{{ section.title }}</span>
                    </div>
                    <div class="d-flex flex-column gap-1 ps-1">
                        <a
                            v-for="(item, iIdx) in section.items"
                            :key="'mob-link-' + iIdx"
                            :href="item.route"
                            :title="item.sub || item.title"
                            class="standard-nav-link d-flex align-items-center gap-3 p-2 px-3 rounded-2 text-white text-decoration-none"
                            :class="{ active: item.active }"
                        >
                            <i :class="['bi', item.icon || 'bi-circle', 'nav-icon']" style="flex-shrink:0;"></i>
                            <div class="lh-sm text-truncate">
                                <div class="fw-medium text-truncate" style="font-size:0.875rem;">{{ item.title }}</div>
                                <div v-if="item.sub" class="text-white text-opacity-50 text-truncate" style="font-size:0.75rem;">{{ item.sub }}</div>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Mobile Help Button -->
                <div class="pt-3 border-top border-white border-opacity-15">
                    <button
                        type="button"
                        class="btn w-100 fw-bold d-flex align-items-center justify-center gap-2 rounded-3 py-3 border border-primary bg-primary bg-opacity-10 text-white"
                        @click="openGuideModal(userRole)"
                    >
                        <i class="bi bi-lightbulb-fill" style="font-size:1.25rem;"></i>
                        <span style="font-size:0.95rem;">Butuh Bantuan? Lihat Panduan</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- ================= MAIN CONTENT WRAPPER ================= -->
        <div class="main-content-wrapper grow d-flex flex-column overflow-hidden position-relative bg-surface">
            <!-- Modern Top Header -->
            <header class="top-header border-bottom px-3 d-flex justify-content-between align-items-center z-dropdown">
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
                        <div class="page-role small fw-medium">
                            {{ currentRoleWorkflow.title }}
                        </div>
                    </div>
                </div>

                <!-- Right: Header Actions (Guide Button, Year Switcher, Profile) -->
                <div class="d-flex align-items-center gap-2">
                    <!-- Interactive Role Workflow Guide Button -->
                    <button
                        type="button"
                        class="btn btn-outline-secondary header-guide-btn d-flex align-items-center gap-2 px-3 py-1"
                        @click="openGuideModal(userRole)"
                        title="Klik untuk panduan cara kerja peran Anda"
                    >
                        <i class="bi bi-question-circle fs-6"></i>
                        <span class="d-none d-sm-inline fw-semibold">Panduan</span>
                    </button>

                    <!-- Governance Year Selector -->
                    <div v-if="can_switch_year" class="d-none d-md-flex align-items-center gap-1 bg-white p-1 ps-2 rounded-2 border">
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
                            class="profile-btn btn d-flex align-items-center gap-2 dropdown-toggle border p-1 px-2 rounded-2 bg-white"
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

            <!-- Welcome Banner -->
            <WelcomeBanner :steps="welcomeSteps" />

            <!-- Main Dynamic Page Content Container -->
            <main id="main-content" class="content-container grow overflow-auto p-2 p-md-3" tabindex="-1">
                <div class="content-stage">
                    <slot />
                </div>
            </main>
        </div>

        <nav class="mobile-quick-nav d-lg-none" aria-label="Navigasi cepat">
            <a
                v-for="(item, index) in primary_workspace_items.slice(0, 3)"
                :key="'quick-' + index"
                :href="item.route"
                class="mobile-quick-link"
                :class="{ active: item.active }"
            >
                <i :class="['bi', item.icon]"></i>
                <span>{{ item.title }}</span>
            </a>
            <button
                type="button"
                class="mobile-quick-link"
                data-bs-toggle="offcanvas"
                data-bs-target="#sidebarOffcanvas"
                aria-controls="sidebarOffcanvas"
            >
                <i class="bi bi-grid-fill"></i>
                <span>Semua Menu</span>
            </button>
        </nav>

        <!-- Global Modals -->
        <ModalConfirmation ref="modalConfirmationRef" />
        <RoleWorkflowGuideModal ref="guideModalRef" />
    </div>
</template>

<style scoped>
/* ===== APP FONT ===== */
.staff-app-root {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    color: #172033;
    width: 100%;
    height: 100vh;
    height: 100dvh;
    min-height: 100vh;
    min-height: 100dvh;
    overflow: hidden;
}

/* ===== BACKGROUNDS ===== */
.bg-sidebar {
    background: #17223b;
}
.bg-surface {
    background: #f5f7fa;
}

.main-content-wrapper {
    height: 100%;
    min-width: 0;
    min-height: 0;
}

.content-container {
    min-height: 0;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-y: contain;
}

/* ===== SIDEBAR DIMENSIONS ===== */
.sidebar-desktop {
    width: 280px;
    height: 100vh;
    height: 100dvh;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
}
.sidebar-mobile {
    width: min(340px, 88vw) !important;
}

/* ===== BRAND AREA ===== */
.brand-logo {
    width: 38px;
    height: 38px;
    object-fit: cover;
}
.brand-title {
    font-size: 1.1rem;
    letter-spacing: 0.04em;
}
.brand-subtitle {
    font-size: 0.74rem;
}
.brand-box:hover {
    opacity: 0.86;
}
.app-version-badge {
    display: inline-flex;
    align-items: center;
    min-height: 20px;
    padding: 0.1rem 0.45rem;
    border: 1px solid rgba(253, 230, 138, 0.6);
    border-radius: 999px;
    background: rgba(251, 191, 36, 0.94);
    color: #3f2d06;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.03em;
}

/* ===== ROLE INDICATOR ===== */
.role-icon-pill {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    flex-shrink: 0;
}
.role-identity-card {
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 0.6rem;
    background: rgba(255, 255, 255, 0.05);
}

/* ===== SCROLLABLE SIDEBAR CONTENT ===== */
.sidebar-scrollable-content {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
.sidebar-scrollable-content::-webkit-scrollbar {
    width: 4px;
}
.sidebar-scrollable-content::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 4px;
}

/* ===== SECTION HEADER DIVIDER ===== */
.section-header {
    margin-bottom: 4px;
}
.section-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 1px;
}

/* ===== PRIMARY WORKSPACE LINKS ===== */
.primary-nav-link {
    min-height: 42px;
    background: transparent;
    transition: background 0.18s ease, transform 0.15s ease;
}
.primary-nav-link:hover {
    background: rgba(255, 255, 255, 0.08);
}
.primary-nav-link.active {
    background: #4f46e5;
    color: #ffffff !important;
    box-shadow: none;
}
.primary-nav-link.active .bi {
    color: #ffffff !important;
}
.nav-tag {
    padding: 0.15rem 0.4rem;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 0.35rem;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.65rem;
    font-weight: 600;
}
.primary-nav-link.active .nav-tag {
    border-color: rgba(255, 255, 255, 0.28);
    color: rgba(255, 255, 255, 0.85);
}

/* ===== STANDARD NAV LINKS ===== */
.standard-nav-link {
    min-height: 44px;
    color: rgba(255, 255, 255, 0.82);
    border-left: 2px solid transparent;
    transition: background 0.18s ease, border-color 0.15s ease;
}
.standard-nav-link:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.10);
}
.standard-nav-link.active {
    color: #ffffff !important;
    background: rgba(99, 102, 241, 0.34);
    border-left-color: #a5b4fc;
    font-weight: 700;
    box-shadow: none;
}
.standard-nav-link.active * {
    color: inherit !important;
}
.standard-nav-link.active .nav-icon {
    color: #fde68a;
    opacity: 1;
}
.nav-icon {
    font-size: 1.1rem;
    opacity: 0.78;
    transition: opacity 0.15s;
}
.standard-nav-link:hover .nav-icon,
.standard-nav-link.active .nav-icon {
    opacity: 1;
}

/* ===== SEARCH RESULTS ===== */
.search-item {
    transition: background 0.15s;
}
.search-item:hover {
    background-color: rgba(255, 255, 255, 0.13);
}
.search-item.active {
    background: rgba(255, 255, 255, 0.12);
    border-left: 2px solid #a5b4fc;
}

/* ===== HELP BUTTON (Footer) ===== */
.sidebar-help-btn {
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 0.6rem;
    background: rgba(255, 255, 255, 0.05);
    text-align: left;
}
.sidebar-help-btn:hover {
    border-color: rgba(255, 255, 255, 0.28);
    background: rgba(255, 255, 255, 0.09);
}

/* ===== TOP HEADER ===== */
.top-header {
    background-color: #ffffff;
    height: 68px;
    flex-shrink: 0;
    position: relative;
    z-index: 1030;
}
.page-role {
    color: #64748b;
}
.profile-img {
    width: 40px;
    height: 40px;
    object-fit: cover;
}
.header-guide-btn {
    transition: color 0.18s ease, background-color 0.18s ease;
}

.content-stage {
    min-height: 100%;
    animation: content-enter 220ms ease-out;
}

.mobile-quick-nav {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1025;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
    gap: 0;
    padding: 0.25rem 0 max(0.25rem, env(safe-area-inset-bottom));
    border-top: 1px solid #dfe5ee;
    background: #ffffff;
    box-shadow: 0 -4px 16px rgba(30, 41, 59, 0.06);
}

.mobile-quick-link {
    min-width: 0;
    min-height: 54px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    padding: 0.35rem 0.2rem;
    border: 0;
    border-radius: 0;
    background: transparent;
    color: #64748b;
    text-decoration: none;
}

.mobile-quick-link i {
    font-size: 1.05rem;
}

.mobile-quick-link span {
    width: 100%;
    overflow: hidden;
    font-size: 0.62rem;
    font-weight: 700;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.mobile-quick-link.active {
    background: transparent;
    color: #4f46e5;
}

.min-width-0 {
    min-width: 0;
}

@keyframes content-enter {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 991.98px) {
    .content-container {
        padding-bottom: 5.75rem !important;
    }

    .top-header {
        height: 60px;
    }

    .page-main-title {
        max-width: 46vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

@media (max-width: 575.98px) {
    .header-guide-btn {
        width: 38px;
        height: 38px;
        justify-content: center;
        padding: 0 !important;
    }

    .page-meta {
        font-size: 0.68rem !important;
    }

    .page-role {
        display: none;
    }

    .top-header {
        padding-inline: 0.65rem !important;
    }

    .profile-img {
        width: 36px;
        height: 36px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .content-stage,
    .primary-nav-link,
    .standard-nav-link,
    .header-guide-btn {
        animation: none !important;
        transition: none !important;
        transform: none !important;
    }
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
