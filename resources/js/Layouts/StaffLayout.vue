<script setup>
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import { Head, usePage, router } from "@inertiajs/vue3";
import { ref, watch, computed, onMounted, defineProps, nextTick } from "vue";
// Placeholder logo to prevent missing asset build failures
const logoSrc = '/images/assets/logo.png';

// Prop total_amount (jika masih relevan)
// const props = defineProps({
//     total_amount: Number,
// });

const page = usePage();
const sidebarRef = ref(null); // Ref untuk sidebar element
const mainContentRef = ref(null); // Ref untuk main content (opsional, untuk backdrop)
const offcanvasInstance = ref(null); // Untuk instance Offcanvas Bootstrap

const auth_user = computed(() => page.props.auth.user);
const available_years = computed(() => page.props.available_years || []);
const selected_year = ref(page.props.selected_year || new Date().getFullYear());

watch(
    () => page.props.selected_year,
    (newYear) => {
        if (newYear) selected_year.value = newYear;
    }
);

const can_switch_year = computed(() => {
    const roleId = auth_user.value?.roles_id;
    return roleId === 1 || roleId === 8 || roleId === 99;
});

function submitYear() {
    router.post("/seeo/staff/year", { year: selected_year.value }, { preserveScroll: true, preserveState: true });
}

// All URLs come from Laravel/Ziggy so route prefixes cannot drift between pages.
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
const modalConfirmationRef = ref(null);

const userRole = computed(() => Number(page.props.auth?.user?.roles_id || 0));
const roleName = computed(() => page.props.auth?.user?.role_name || '');
const capabilities = computed(() => page.props.auth?.user?.capabilities || []);
const can = (capability) => capabilities.value.includes('*') || capabilities.value.includes(capability);

// OPTIMIZED: Build nav_list ONCE saat initialization
const nav_list = computed(() => {
    const role = userRole.value;
    const name = roleName.value;

    let list = {
        Dashboard: {},
        Management: {},
        Business: {},
        'HR & Internship': {},
        Marketing: {},
        'Special Access': {},
    };

    // === DASHBOARD (Available for all staff) ===
    list.Dashboard.Home = { route: route("dashboard"), active: route.current("dashboard"), title: "Dashboard", icon: "bi-speedometer2" };
    list.Dashboard.UploadLogbook = { route: route("profile.edit") + "#logbook-upload", active: false, title: "Upload Logbook", icon: "bi-journal-arrow-up" };
    list.Dashboard.PembayaranIwp = { route: route("profile.edit") + "#iwp-payment", active: false, title: "Pembayaran IWP", icon: "bi-wallet2" };

    // === MANAGEMENT (Organization & Finance) ===
    // Structural & Departments
    if (can('organization.view') || can('organization.manage')) {
        list.Management.Structural = { 
            route: route("structural"), 
            active: route.current("structural") || route.current("department") || route.current("program"), 
            title: "Structural", 
            icon: "bi-diagram-3" 
        };
    }

    // User & Employee Management
    if (can('employee.manage')) {
        list.Management.User = { route: route("role"), active: route.current("role"), title: "User & Employee", icon: "bi-person-badge" };
    }

    // Finance
    if (can('finance.view') || can('finance.manage')) {
        list.Management.Finance = [
            { route: route("finance"), active: route.current("finance"), title: "Cashflow", icon: "bi-cash-coin" },
            { route: route("finance.feature"), active: route.current("finance.feature"), title: "Contribution & Payroll", icon: "bi-stars" }
        ];
    }

    // Finance Panel (for Finance role)
    if (can('finance.manage')) {
        list.Management.FinancePanel = { route: route("finance.pending"), active: route.current("finance.pending"), title: "Pending Validation", icon: "bi-wallet2" };
    }

    // IWP Panel
    if (can('iwp.manage')) {
        list.Management.IwpPanel = { route: route("iwp.receipts"), active: route.current("iwp.receipts"), title: "Validasi Pembayaran IWP", icon: "bi-receipt" };
    }

    // === BUSINESS (Blaterian Foods & Goods) ===
    // Business Insight
    if (can('inventory.view') || can('stands.manage') || can('goods.manage')) {
        list.Business.Insight = { route: route("blaterian.insight"), active: route.current("blaterian.insight"), title: "Business Insight", icon: "bi-graph-up" };
    }

    // Foods Business
    const foodsMenu = [];
    if (can('stands.manage') || can('inventory.view')) {
        foodsMenu.push({ route: route("food.stand"), active: route.current("food.stand"), title: "Stand Management", icon: "bi-shop" });
    }
    if (can('stands.manage')) {
        foodsMenu.push({ route: route("operating.panel"), active: route.current("operating.panel"), title: "Operating Panel", icon: "bi-clipboard-check" });
    }
    if (can('sales.manage')) {
        foodsMenu.push({ route: route("staff.sales-distribution.index"), active: route.current("staff.sales-distribution.index"), title: "Sales Distribution", icon: "bi-cart-check" });
    }
    if (can('production.manage')) {
        foodsMenu.push({ route: route("staff.production.panel.index"), active: route.current("staff.production.panel.index"), title: "Production Panel", icon: "bi-tools" });
    }
    if (foodsMenu.length > 0) {
        list.Business.Foods = foodsMenu;
    }

    // Goods Business
    if (can('goods.manage') || can('inventory.view')) {
        list.Business.Goods = [
            { route: route('good.product'), active: route.current("good.product"), title: "Product Management", icon: "bi-box" }
        ];
    }

    // === HR & INTERNSHIP ===
    if (can('hr.manage')) {
        list['HR & Internship'].HRPanel = { route: route("hr.birthdays"), active: route.current("hr.birthdays"), title: "Staff Birthdays", icon: "bi-balloon" };
    }

    if (can('internship.manage') || can('internship.view')) {
        list['HR & Internship'].Internship = { route: route("internship.applications.index"), active: route.current("internship.applications.index"), title: "Internship Applications", icon: "bi-briefcase" };
    }

    if (can('internship.manage')) {
        list['HR & Internship'].Certificates = { route: route("certificate.manage"), active: route.current("certificate.manage"), title: "Certificates", icon: "bi-award" };
    }

    // === MARKETING ===
    if (can('marketing.manage')) {
        list.Marketing.CMS = { route: route("marketing.cms"), active: route.current("marketing.cms"), title: "Marketing CMS", icon: "bi-megaphone" };
        list.Marketing.Structures = { route: route("marketing.structures.index"), active: route.current("marketing.structures"), title: "Company Structure", icon: "bi-diagram-2" };
        list.Marketing.Activities = { route: route("marketing.activities.index"), active: route.current("marketing.activities"), title: "Activities & News", icon: "bi-newspaper" };
    }

    if (can('seminar.manage')) {
        list.Marketing.Seminar = { route: route("staff.seminar.registrations.index"), active: route.current("staff.seminar.registrations"), title: "Seminar Registration", icon: "bi-easel" };
    }

    // === SPECIAL ACCESS (CEO, Admin, etc) ===
    // CEO Panel
    if (can('organization.manage')) {
        list['Special Access'].CeoPanel = { route: route("ceo.panel"), active: route.current("ceo.panel"), title: "CEO Panel", icon: "bi-award-fill" };
    }

    // Pinned Documents
    if (can('documents.manage')) {
        list['Special Access'].PinnedDocs = { route: route("pinneddoc.index"), active: route.current("PinnedDocs"), title: "Pinned Documents", icon: "bi-pin-angle" };
    }

    // Super Admin Panel
    if (role === 99) {
        list['Special Access'].SuperAdmin = { route: route("super.admin.panel"), active: route.current("super.admin.panel"), title: "Super Admin Panel", icon: "bi-shield-lock-fill" };
    }
    
    // Filter empty sections
    return Object.fromEntries(Object.entries(list).filter(([_, content]) => Object.keys(content).length > 0));
});

const active_section = computed(() => {
    const current = page.component;
    
    // Dashboard
    if (current === 'Staff/SEEO/Dashboard') return 'Dashboard';
    
    // Management section
    if (current.includes('User') || current.includes('Employee') || 
        current.includes('Department') || current.includes('Program') || 
        current.includes('Structural') || current.includes('CashFlow') || 
        current.includes('Finance') || current.includes('Contribution') ||
        current.includes('Payroll') || current.includes('IwpPanel')) {
        return 'Management';
    }
    
    // Business section
    if (current.includes('Business') || current.includes('Stand') || 
        current.includes('MenuBoard') || current.includes('OperatingPanel') || 
        current.includes('ProductionPanel') || current.includes('Insight') ||
        current.includes('Good')) {
        return 'Business';
    }
    
    // HR & Internship section
    if (current.includes('Internship') || current.includes('Birthdays') || 
        current.includes('Certificate')) {
        return 'HR & Internship';
    }
    
    // Marketing section
    if (current.includes('Marketing') || current.includes('Seminar') || 
        current.includes('Structure') || current.includes('Activities')) {
        return 'Marketing';
    }
    
    // Special Access section
    if (current.includes('CeoPanel') || current.includes('SuperAdmin') || 
        current.includes('PinnedDocs')) {
        return 'Special Access';
    }
    
    return 'Dashboard';
});

const active_group = computed(() => {
    const current = page.component;
    
    // Management groups
    if (current.includes('Finance') || current.includes('CashFlow') || current.includes('Contribution') || current.includes('Payroll')) return 'Finance';
    
    // Business groups
    if (current.includes('Foods') || current.includes('Stand') || current.includes('MenuBoard') || current.includes('OperatingPanel') || current.includes('ProductionPanel')) return 'Foods';
    if (current.includes('Goods') || current.includes('Good')) return 'Goods';
    
    return null;
});

// Helper for section icons
function getSectionIcon(sectionKey) {
    const icons = {
        Dashboard: 'bi-speedometer2',
        Management: 'bi-building',
        Business: 'bi-briefcase',
        'HR & Internship': 'bi-people',
        Marketing: 'bi-megaphone',
        'Special Access': 'bi-star-fill'
    };
    return icons[sectionKey] || 'bi-layers';
}

// Local UI state for collapses (allows multiple to be open at once)
const openedSections = ref({ 'Dashboard': true });
const openedGroups = ref({}); // { 'sectionKey_groupKey': true }

function toggleSection(sectionKey) {
    openedSections.value[sectionKey] = !openedSections.value[sectionKey];
}

function toggleGroup(sectionKey, groupKey) {
    const key = `${sectionKey}_${groupKey}`;
    openedGroups.value[key] = !openedGroups.value[key];
}

function updateTime() {
    currentTime.value = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

const date_header = computed(() => {
    const now = new Date();
    return now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
});

function confirmation(routeUrl, message) {
    if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(routeUrl, message);
    } else {
        console.error("modalConfirmationRef is null");
    }
}

function changeIcon(elementId) { // Tetap gunakan untuk ikon collapse Bootstrap
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle("bi-chevron-up");
        element.classList.toggle("bi-chevron-down");
    }
}

function showImage(event) {
    if (event && event.target) {
        event.target.style.opacity = '1';
    }
}

// Fungsi untuk toggle sidebar mobile menggunakan Bootstrap Offcanvas
function toggleSidebar() {
    if (offcanvasInstance.value) {
        offcanvasInstance.value.toggle();
    } else if (typeof window.bootstrap !== 'undefined' && sidebarRef.value) { // Akses window.bootstrap
        console.warn("Offcanvas instance not found in toggle, trying to create and toggle.");
        try {
            // Gunakan window.bootstrap secara eksplisit
            const instance = window.bootstrap.Offcanvas.getOrCreateInstance(sidebarRef.value);
            instance.toggle();
            offcanvasInstance.value = instance; // Simpan untuk nanti
        } catch(e) {
             console.error("Error creating/toggling Offcanvas instance:", e);
        }
    } else {
        console.error("Bootstrap JS (window.bootstrap) not found or sidebarRef is null during toggle.");
    }
}

// REMOVED: updateNavList() - nav_list is now a computed property
// No need to rebuild nav_list manually anymore

let timeInterval = null;

onMounted(async () => {
    updateTime();
    timeInterval = setInterval(updateTime, 1000);
    await nextTick(); // Tunggu DOM siap

    // Initialize openedSections with active_section for initial route context
    openedSections.value[active_section.value] = true;
    // Initialize openedGroups for active group if present
    if (active_group.value) {
        openedGroups.value[`${active_section.value}_${active_group.value}`] = true;
    }

    // Inisialisasi Bootstrap Offcanvas HANYA SEKALI
    if (typeof window.bootstrap !== 'undefined') {
        if (sidebarRef.value) {
            try {
                offcanvasInstance.value = window.bootstrap.Offcanvas.getOrCreateInstance(sidebarRef.value);
                // Add resize listener
                window.addEventListener('resize', () => {
                     if (window.innerWidth >= 992 && offcanvasInstance.value) {
                         offcanvasInstance.value.hide();
                    }
                });
            } catch (e) { console.error("Error initializing Offcanvas:", e); }
        }
    } else console.error("window.bootstrap is undefined. Check app.js.");

    // Cleanup function
    return () => {
        if (timeInterval) clearInterval(timeInterval);
    };
});

// OPTIMIZED: Close mobile sidebar on navigation (no rebuilding nav_list)
watch(() => page.component, () => {
    // Sync opened state with route changes
    openedSections.value[active_section.value] = true;
    if (active_group.value) {
        openedGroups.value[`${active_section.value}_${active_group.value}`] = true;
    }
    if (window.innerWidth < 992 && offcanvasInstance.value) {
        offcanvasInstance.value.hide();
    }
});
</script>
<template>
    <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <!-- Bootstrap CSS kini bundled via app.css; Bootstrap Icons tetap dari CDN -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
        <!-- Bootstrap JS loaded via Vite in app.js -->
    </Head>

    <!-- Removed overflow-hidden to prevent dropdown menu clipping; use overflow-x-hidden if horizontal clipping needed -->
    <div class="d-flex vh-100 overflow-x-hidden">
        <div class="sidebar-desktop d-none d-lg-flex flex-column shrink-0 bg-gradient-custom text-white">
             <div class="sidebar-content-inner p-3">
                <div class="sidebar-logo mb-4">
                     <a :href="route('dashboard')" class="text-decoration-none">
                        <div class="d-flex align-items-center p-2 rounded bg-white bg-opacity-10 sidebar-logo-hover">
                            <img :src="logoSrc" alt="SEEO Logo" class="sidebar-logo-img me-2" @error="$event.target.src=logoSrc"/>
                            <div class="lh-sm">
                                <h5 class="sidebar-logo-title mb-0 text-white">SEEO</h5>
                                <span class="sidebar-logo-subtitle d-block text-white">Information System</span>
                                <small class="sidebar-logo-version text-warning">v5.0</small>
                            </div>
                        </div>
                     </a>
                </div>
                 <div class="navigation-menu grow">
                    <div v-for="(sectionContent, sectionKey) in nav_list" :key="sectionKey" class="nav-section mb-2">
                        <button
                            type="button"
                            class="nav-header btn w-100 text-start d-flex align-items-center"
                            :class="{'active-section': active_section == sectionKey, 'open': openedSections[sectionKey]}"
                            @click="() => { toggleSection(sectionKey); changeIcon('icon_nav_section_desktop_' + sectionKey.replace(/\s+/g, '')); }"
                        >
                            <i :id="'icon_nav_section_desktop_' + sectionKey.replace(/\s+/g, '')" :class="['bi', 'me-2', openedSections[sectionKey] ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
                            <i :class="['bi', getSectionIcon(sectionKey), 'me-2', 'text-warning']"></i>
                            <span class="fw-semibold">{{ sectionKey }}</span>
                        </button>
                        <div v-show="openedSections[sectionKey]" :id="'nav_section_desktop_' + sectionKey.replace(/\s+/g, '')">
                            <div class="nav-items pt-1 ps-3">
                                <div v-for="(nav_group, nav_group_key) in sectionContent" :key="nav_group_key" class="mb-1">
                                    <template v-if="Array.isArray(nav_group)">
                                        <button
                                            type="button"
                                            class="nav-item nav-group d-flex align-items-center btn text-start w-100"
                                            :class="{'active-group': active_group == nav_group_key, 'open': openedGroups[`${sectionKey}_${nav_group_key}`]}"
                                            @click="() => { toggleGroup(sectionKey, nav_group_key); changeIcon('icon_nav_group_desktop_' + sectionKey.replace(/\s+/g, '') + '_' + nav_group_key.replace(/\s+/g, '')); }"
                                        >
                                            <i :id="'icon_nav_group_desktop_' + sectionKey.replace(/\s+/g, '') + '_' + nav_group_key.replace(/\s+/g, '')" :class="['bi', 'me-2', 'nav-group-icon', openedGroups[`${sectionKey}_${nav_group_key}`] ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
                                            <span class="fw-medium">{{ nav_group_key }}</span>
                                        </button>
                                        <div v-show="openedGroups[`${sectionKey}_${nav_group_key}`]"
                                            :id="'nav_group_desktop_' + sectionKey.replace(/\s+/g, '') + '_' + nav_group_key.replace(/\s+/g, '')"
                                        >
                                            <a v-for="(nav, index) in nav_group"
                                                :key="`${sectionKey}-${nav_group_key}-${index}`"
                                                :href="nav.route"
                                                :class="['nav-item', 'sub-item', 'd-flex', 'align-items-center', nav.active ? 'active' : '']"
                                            >
                                                <i v-if="nav.icon" :class="['bi', nav.icon, 'me-2']"></i>
                                                {{ nav.title }}
                                            </a>
                                        </div>
                                    </template>
                                    <template v-if="!Array.isArray(nav_group) && typeof nav_group === 'object' && nav_group !== null && nav_group.route !== undefined">
                                        <a
                                            :href="nav_group.route"
                                            :class="['nav-item', 'd-flex', 'align-items-center', nav_group.active ? 'active' : '']"
                                        >
                                            <i v-if="nav_group.icon" :class="['bi', nav_group.icon, 'me-2']"></i>
                                            {{ nav_group.title }}
                                        </a>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <div class="offcanvas offcanvas-start bg-gradient-custom text-white sidebar-mobile" tabindex="-1" id="sidebarOffcanvas" aria-labelledby="sidebarOffcanvasLabel" ref="sidebarRef">
            <div class="offcanvas-header border-bottom border-white border-opacity-25">
                 <a :href="route('dashboard')" class="text-decoration-none">
                    <div class="d-flex align-items-center">
                        <img :src="logoSrc" alt="SEEO Logo" class="sidebar-logo-img me-2" @error="$event.target.src=logoSrc"/>
                        <div class="lh-sm">
                            <h5 class="sidebar-logo-title mb-0 text-white" id="sidebarOffcanvasLabel">SEEO</h5>
                            <span class="sidebar-logo-subtitle d-block text-white">Information System</span>
                        </div>
                    </div>
                 </a>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body sidebar-content-inner p-3">
                 <div class="navigation-menu grow">
                     <div v-for="(sectionContent, sectionKey) in nav_list" :key="sectionKey + '-mobile'" class="nav-section mb-2">
                         <button
                            type="button"
                             class="nav-header btn w-100 text-start d-flex align-items-center"
                            :class="{'active-section': active_section == sectionKey, 'open': openedSections[sectionKey]}"
                            @click="() => { toggleSection(sectionKey); changeIcon('icon_nav_section_mobile_' + sectionKey.replace(/\s+/g, '')); }"
                        >
                            <i :id="'icon_nav_section_mobile_' + sectionKey.replace(/\s+/g, '')" :class="['bi', 'me-2', openedSections[sectionKey] ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
                            <i :class="['bi', getSectionIcon(sectionKey), 'me-2', 'text-warning']"></i>
                            <span class="fw-semibold">{{ sectionKey }}</span>
                        </button>
                        <div v-show="openedSections[sectionKey]" :id="'nav_section_mobile_' + sectionKey.replace(/\s+/g, '')">
                            <div class="nav-items pt-1 ps-3">
                                 <div v-for="(nav_group, nav_group_key) in sectionContent" :key="nav_group_key + '-mobile'" class="mb-1">
                                     <template v-if="Array.isArray(nav_group)">
                                         <button
                                            type="button"
                                             class="nav-item nav-group d-flex align-items-center btn text-start w-100"
                                            :class="{'active-group': active_group == nav_group_key, 'open': openedGroups[`${sectionKey}_${nav_group_key}`]}"
                                            @click="() => { toggleGroup(sectionKey, nav_group_key); changeIcon('icon_nav_group_mobile_' + sectionKey.replace(/\s+/g, '') + '_' + nav_group_key.replace(/\s+/g, '')); }"
                                        >
                                             <i :id="'icon_nav_group_mobile_' + sectionKey.replace(/\s+/g, '') + '_' + nav_group_key.replace(/\s+/g, '')" :class="['bi', 'me-2', 'nav-group-icon', openedGroups[`${sectionKey}_${nav_group_key}`] ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
                                             <span class="fw-medium">{{ nav_group_key }}</span>
                                        </button>
                                                     <div v-show="openedGroups[`${sectionKey}_${nav_group_key}`]"
                                            :id="'nav_group_mobile_' + sectionKey.replace(/\s+/g, '') + '_' + nav_group_key.replace(/\s+/g, '')"
                                        >
                                             <a v-for="(nav, index) in nav_group"
                                                :key="`${sectionKey}-${nav_group_key}-${index}-mobile`"
                                                :href="nav.route"
                                                :class="['nav-item', 'sub-item', 'd-flex', 'align-items-center', nav.active ? 'active' : '']"
                                            >
                                                <i v-if="nav.icon" :class="['bi', nav.icon, 'me-2']"></i>
                                                {{ nav.title }}
                                            </a>
                                        </div>
                                     </template>
                                     <template v-if="!Array.isArray(nav_group) && typeof nav_group === 'object' && nav_group !== null && nav_group.route !== undefined">
                                        <a
                                            :href="nav_group.route"
                                            :class="['nav-item', 'd-flex', 'align-items-center', nav_group.active ? 'active' : '']"
                                        >
                                            <i v-if="nav_group.icon" :class="['bi', nav_group.icon, 'me-2']"></i>
                                            {{ nav_group.title }}
                                        </a>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="main-content-wrapper grow d-flex flex-column overflow-hidden position-relative">
<header class="top-header bg-white border-bottom shadow-sm px-2 px-lg-3 py-2 position-relative z-dropdown" v-if="$slots.header">
                 <div class="d-flex justify-content-between align-items-center">
                    <button class="btn border-0 d-lg-none p-1 me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas" aria-controls="sidebarOffcanvas">
                        <i class="bi bi-list fs-3"></i>
                    </button>

                    <div class="page-title me-auto">
                        <h4 class="mb-0 fs-5 fw-semibold"><slot name="header" /></h4>
                        <div class="page-meta small text-muted">
                            <span>{{ date_header }}</span>
                            <span class="mx-1 d-none d-md-inline">â€¢</span>
                            <span class="d-none d-md-inline">{{ currentTime }}</span>
                        </div>
                    </div>

                    <div v-if="can_switch_year" class="me-2 d-none d-md-flex align-items-center gap-2">
                        <span class="small text-muted">Tahun</span>
                        <select class="form-select form-select-sm" style="width: 110px;" v-model="selected_year" @change="submitYear">
                            <option v-for="y in available_years" :key="y" :value="y">{{ y }}</option>
                        </select>
                    </div>

                    <div class="user-profile dropdown">
                        <button
                            class="profile-btn btn d-flex align-items-center dropdown-toggle border-0"
                            type="button"
                            id="profileDropdownMenu"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                :src="auth_user?.full_profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(auth_user?.name || 'User')}&color=7F9CF5&background=EBF4FF`"
                                alt="Profile"
                                class="profile-img rounded-circle me-2"
                                @error="$event.target.src='/storage/local/images/compro/logo.png'"
                                style="width: 40px; height: 40px; object-fit: cover;"
                            />
                            <div class="profile-info d-none d-lg-block lh-sm text-start">
                                <h6 class="mb-0 small fw-medium text-dark text-truncate" style="max-width: 150px;">{{ auth_user?.name }}</h6>
                                <small class="text-muted d-block text-truncate" style="max-width: 150px;">{{ auth_user?.role_name || 'Staff' }}</small>
                            </div>
                        </button>
                         <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2" aria-labelledby="profileDropdownMenu">
                           <li>
                                <a :href="route('profile.edit')" class="dropdown-item small">
                                    <i class="bi bi-person-circle me-2"></i>
                                    <span>Profile</span>
                                </a>
                           </li>
                           <li><hr class="dropdown-divider my-1"></li>
                           <li>
                               <a
                                    class="dropdown-item text-danger small"
                                    href="#" @click.prevent="confirmation(route('logout'), 'Are you sure want to logout?')"
                                >
                                    <i class="bi bi-box-arrow-right me-2"></i>
                                    <span>Logout</span>
                                </a>
                           </li>
                        </ul>
                    </div>
                </div>
            </header>

            <main class="content-container grow overflow-auto">
                <slot />
            </main>
        </div>

        <ModalConfirmation ref="modalConfirmationRef" />
    </div>
</template>

<style scoped>
/* Gunakan font Poppins untuk semua */
* {
    font-family: 'Poppins', sans-serif;
}

/* Sidebar Desktop */
.sidebar-desktop {
    width: 260px; /* Lebar sidebar */
    height: 100vh;
}
.bg-gradient-custom {
     /* Selaraskan dengan palet login: Bootstrap Primary gradient */
     background: #27187e;
}
.sidebar-content-inner {
    overflow-y: auto;
    height: 100%; /* Agar bisa scroll jika konten panjang */
    background-color: transparent; /* Kembali ke teks putih di atas biru */
}

/* Logo Sidebar */
.sidebar-logo-img { width: 45px; height: 45px; }
.sidebar-logo-title { font-weight: 600; font-size: 1.2rem; }
.sidebar-logo-subtitle { font-size: 0.8rem; opacity: 0.8; }
.sidebar-logo-version { font-size: 0.7rem; }
.sidebar-logo-hover {
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
}
.sidebar-logo-hover:hover {
    background-color: rgba(255, 255, 255, 0.15) !important;
    transform: translateX(2px);
}

/* Navigation Base */
.nav-section .btn { /* Tombol header section & group */
    color: rgba(255, 255, 255, 0.9);
    background-color: transparent;
    border: none;
    transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
    border-radius: 0.375rem; /* rounded-md */
    padding: 0.6rem 0.8rem;
    margin-bottom: 0.1rem;
}
.nav-section .btn:hover {
    background-color: rgba(255, 255, 255, 0.12);
    color: #ffffff;
    transform: translateX(3px);
}
.nav-section .btn.active-section,
.nav-section .btn.active-group {
    background-color: rgba(255, 255, 255, 0.18);
    color: #ffffff;
}
.nav-section .nav-header span { font-size: 0.95rem; }
.nav-section .nav-group span { font-size: 0.9rem; }
.nav-section .nav-group-icon { font-size: 0.75rem; }

/* Navigation Items */
.nav-item {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    padding: 0.5rem 0.8rem; /* Lebih kecil dari header/group */
    font-size: 0.85rem;
    transition: background-color 0.2s ease, color 0.2s ease, border-left-color 0.2s ease, padding-left 0.2s ease;
    border-left: 3px solid transparent; /* Border inaktif */
    border-radius: 0 0.375rem 0.375rem 0; /* Rounded di kanan */
}
.nav-item:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.12);
}
.nav-item.active {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.18);
    font-weight: 500;
    border-left-color: #fbbf24; /* Warna border aktif */
    padding-left: calc(0.8rem - 3px); /* Kompensasi border */
}
.sub-item {
     padding-left: 1.8rem; /* Indentasi sub-item */
     font-size: 0.8rem;
}
.sub-item.active {
     padding-left: calc(1.8rem - 3px);
}

/* Sidebar Mobile (Offcanvas) */
.sidebar-mobile {
    width: 260px; /* Samakan lebar dengan desktop */
}

/* Main Content Wrapper */
.main-content-wrapper {
    background-color: #f7f7ff; /* Latar belakang area konten */
}

/* Top Header */
.top-header {
    background-color: #f7f7ff !important;
    height: 65px; /* Tinggi header tetap */
    flex-shrink: 0;
    z-index: 1040;
}
.z-dropdown {
    z-index: 1040;
}
.user-profile {
    position: relative;
    z-index: 1041;
}
.dropdown-menu {
    z-index: 1050 !important;
}
.profile-img { width: 40px; height: 40px; } /* Ukuran gambar profil */

/* Content Container */
.content-container {
    background-color: #f7f7ff;
}

/* Custom Scrollbar (dari style.css Anda) */
.sidebar-content-inner::-webkit-scrollbar,
.content-container::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
.sidebar-content-inner::-webkit-scrollbar-track,
.content-container::-webkit-scrollbar-track {
    background: transparent;
}
.sidebar-content-inner::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
}
.content-container::-webkit-scrollbar-thumb {
    background-color: #adb5bd; /* Warna scrollbar konten */
    border-radius: 3px;
}
.sidebar-content-inner::-webkit-scrollbar-thumb:hover,
.content-container::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.5); /* Sidebar hover */
}
.content-container::-webkit-scrollbar-thumb:hover {
    background-color: #6c757d; /* Konten hover */
}

/* Style tambahan jika diperlukan */
.text-warning { color: #fbbf24 !important; } /* Sesuaikan warna warning */
.form-check-input:checked { background-color: #27187e; border-color: #27187e; } /* Warna check input */
.btn-primary { background-color: #27187e; border-color: #27187e; color: #fff; }
.btn-primary:hover { background-color: #27187e; border-color: #27187e; color: #fff; }
.btn-outline-primary { color: #27187e; border-color: #27187e; }
.btn-outline-primary:hover { background-color: #27187e; color: #fff; }
.btn-success { background-color: #10b981; border-color: #10b981; }
.btn-success:hover { background-color: #059669; border-color: #059669; }
.text-primary { color: #27187e !important; }
a.text-primary:hover { color: #27187e !important; }
.bg-white { background-color: #f7f7ff !important; }
</style>


