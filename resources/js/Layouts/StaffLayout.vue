<script setup>
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import { Head, usePage } from "@inertiajs/vue3";
import { ref, watch, computed, onMounted, defineProps, nextTick } from "vue";

// Prop total_amount (jika masih relevan)
// const props = defineProps({
//     total_amount: Number,
// });

const page = usePage();
const sidebarRef = ref(null); // Ref untuk sidebar element
const mainContentRef = ref(null); // Ref untuk main content (opsional, untuk backdrop)
const offcanvasInstance = ref(null); // Untuk instance Offcanvas Bootstrap

const auth_user = computed(() => page.props.auth.user);

// [FUNGSI ROUTE MANUAL ANDA - TIDAK DIUBAH]
const route = (name, params = {}) => {
    const routes = {
        'dashboard': '/seeo/dashboard',
        'role': '/seeo/user',
        'structural': '/seeo/structural',
        'department': '/seeo/department',
        'program': '/seeo/program',
        'finance': '/seeo/finance',
        'finance.feature': '/seeo/finance_feature',
        'blaterian.insight': '/blaterian/insight',
        'blaterian.insight.cashflow': '/blaterian/insight/cashflow',
        'blaterian.insight.customer': '/blaterian/insight/customer',
        'food.stand': '/blaterian/foods/stand',
        'food.stand.detail': '/blaterian/foods/stand_detail',
        'food.stand.cashier': '/blaterian/foods/cashier',
        'profile.edit': '/profile',
        'logout': '/logout',
        'intro': '/intro',
        'billboard.remove': '/billboard/delete',
        'attachment.remove': '/attachment/remove',
        'post.remove': '/dashboard/post/remove',
        'billboard.add': '/billboard/add',
        'attachment.add': '/attachment/add',
        'post.add': '/dashboard/post/add',
    };
    if (routes[name]) {
        let url = routes[name];
        if (params && Object.keys(params).length > 0) {
            for (const key in params) {
                let replaced = url.replace(`{${key}}`, params[key]);
                if (replaced === url) {
                    replaced = url.replace(`{${key}?}`, params[key]);
                }
                url = replaced;
            }
            url = url.replace(/\{\w+\?\}/g, '');
             if (url.endsWith('/') && url.length > 1) {
                url = url.slice(0, -1);
            }
        }
         else if (params && params.id && !url.includes('{id}') && !url.includes('{id?}')) {
            url = `${url}/${params.id}`;
         }
        return url;
    }
    console.warn(`Route "${name}" not found.`);
    return '#';
};
route.current = (routeName) => {
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
        'Staff/Business/Insight': 'blaterian.insight',
        'Staff/Business/InsightCashflow': 'blaterian.insight.cashflow',
        'Staff/Business/InsightCustomer': 'blaterian.insight.customer',
        'Staff/Business/Stand': 'food.stand',
        'Staff/Business/StandDetail': 'food.stand.detail',
        'Staff/Business/StandCashier': 'food.stand.cashier',
        'Staff/Business/GoodBalance': 'good.balance',
        'Staff/Business/GoodProduct': 'good.product',
    };
    const currentRouteBase = componentToRouteBase[currentComponent];
    if (!currentRouteBase) return false;
    return currentRouteBase === routeName || currentRouteBase.startsWith(routeName + '.');
};
// [AKHIR FUNGSI ROUTE MANUAL]

const currentTime = ref('');
const modalConfirmationRef = ref(null);
const nav_list = ref({});

const active_section = computed(() => {
    const current = page.component;
    if (current.startsWith('Staff/SEEO')) return 'Organization';
    if (current.startsWith('Staff/Business')) return 'Business';
    return 'Organization';
});

const active_group = computed(() => {
    const current = page.component;
    if (current.includes('Finance') || current.includes('CashFlow')) return 'Finance';
    if (current.includes('Foods') || current.includes('Stand')) return 'Foods';
    if (current.includes('Goods') || current.includes('Good')) return 'Goods';
    return null;
});

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

function updateNavList() {
     // Definisikan ulang nav_list di sini
     nav_list.value = {
        Organization: {
            Dashboard: { route: route("dashboard"), active: route.current("dashboard"), title: "Dashboard" },
            User: { route: route("role"), active: route.current("role"), title: "User" },
            Structural: { route: route("structural"), active: route.current("structural") || route.current("department") || route.current("program"), title: "Structural" },
            Finance: [
                { route: route("finance"), active: route.current("finance"), title: "Cashflow" },
                { route: route("finance.feature"), active: route.current("finance.feature"), title: "Feature" }
            ],
        },
        Business: {
            Insight: { route: route("blaterian.insight"), active: route.current("blaterian.insight"), title: "Insight" },
            Foods: [
                { route: route("food.stand"), active: route.current("food.stand"), title: "Stand" },
            ],
            Goods: [
                 { route: route('good.product'), active: route.current("good"), title: "Product (Coming Soon)" }
            ],
        },
    };
     console.log("Nav list updated:", JSON.parse(JSON.stringify(nav_list.value))); // Debug log
}

let timeInterval = null;

onMounted(async () => {
    updateTime();
    timeInterval = setInterval(updateTime, 1000);
    await nextTick(); // Tunggu DOM siap

    // Inisialisasi Bootstrap Offcanvas
    if (typeof window.bootstrap !== 'undefined') {
        if (sidebarRef.value) {
            try {
                offcanvasInstance.value = window.bootstrap.Offcanvas.getOrCreateInstance(sidebarRef.value);
                console.log("Bootstrap Offcanvas initialized.");
                // Add resize listener
                window.addEventListener('resize', () => {
                     if (window.innerWidth >= 992 && offcanvasInstance.value) {
                         offcanvasInstance.value.hide();
                    }
                });
            } catch (e) { console.error("Error initializing Offcanvas:", e); }
        } else console.warn("Sidebar element not found.");
         // Panggil updateNavList SETELAH memastikan bootstrap ada (atau setidaknya setelah tick pertama)
        updateNavList(); // Panggil di sini

    } else console.error("window.bootstrap is undefined. Check app.js.");

    // Cleanup function
    return () => {
        if (timeInterval) clearInterval(timeInterval);
        // Hapus listener
        // offcanvasInstance.value?.dispose();
    };
});

// Watch page component changes to update nav list and close mobile sidebar
watch(() => page.component, () => {
    updateNavList(); // Update list on navigation
    if (window.innerWidth < 992 && offcanvasInstance.value) {
        offcanvasInstance.value.hide(); // Close mobile sidebar
    }
});
</script>
<template>
    <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"> <!-- Ganti ke 5.3.2 jika perlu -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet"> <!-- Ganti ke 1.11 jika perlu -->
    </Head>

    <div class="d-flex vh-100 overflow-hidden">
        <div class="sidebar-desktop d-none d-lg-flex flex-column flex-shrink-0 bg-gradient-custom text-white">
             <div class="sidebar-content-inner p-3">
                <div class="sidebar-logo mb-4">
                     <div class="d-flex align-items-center p-2 rounded bg-white bg-opacity-10">
                        <img src="/storage/local/images/apps/logo.png" alt="SEEO Logo" class="sidebar-logo-img me-2" @error="$event.target.src='/storage/local/images/compro/logo.png'"/>
                        <div class="lh-sm">
                            <h5 class="sidebar-logo-title mb-0">SEEO</h5>
                            <span class="sidebar-logo-subtitle d-block">Information System</span>
                            <small class="sidebar-logo-version text-warning">v2.0</small>
                        </div>
                    </div>
                </div>
                 <div class="navigation-menu flex-grow-1">
                    <div v-for="(sectionContent, sectionKey) in nav_list" :key="sectionKey" class="nav-section mb-2">
                         <button
                            type="button"
                            class="nav-header btn w-100 text-start d-flex align-items-center"
                            data-bs-toggle="collapse"
                            :data-bs-target="'#nav_section_desktop_' + sectionKey.replace(/\s+/g, '')"
                            :class="{'active-section': active_section == sectionKey}"
                            @click="changeIcon('icon_nav_section_desktop_' + sectionKey.replace(/\s+/g, ''))"
                        >
                            <i :id="'icon_nav_section_desktop_' + sectionKey.replace(/\s+/g, '')" :class="['bi', 'me-2', active_section == sectionKey ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
                            <span class="fw-semibold">{{ sectionKey }}</span>
                        </button>
                        <div class="collapse" :id="'nav_section_desktop_' + sectionKey.replace(/\s+/g, '')">
                            <div class="nav-items pt-1 ps-3">
                                <div v-for="(nav_group, nav_group_key) in sectionContent" :key="nav_group_key" class="mb-1">
                                    <a v-if="Array.isArray(nav_group)"
                                        class="nav-item nav-group d-flex align-items-center btn text-start w-100"
                                        data-bs-toggle="collapse"
                                        :href="'#nav_group_desktop_' + sectionKey.replace(/\s+/g, '') + '_' + nav_group_key.replace(/\s+/g, '')"
                                        role="button"
                                        :class="{'active-group': active_group == nav_group_key}"
                                        @click="changeIcon('icon_nav_group_desktop_' + sectionKey.replace(/\s+/g, '') + '_' + nav_group_key.replace(/\s+/g, ''))"
                                    >
                                        <i :id="'icon_nav_group_desktop_' + sectionKey.replace(/\s+/g, '') + '_' + nav_group_key.replace(/\s+/g, '')" :class="['bi', 'me-2', 'nav-group-icon', active_group == nav_group_key ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
                                        <span class="fw-medium">{{ nav_group_key }}</span>
                                    </a>
                                     <div v-if="Array.isArray(nav_group)"
                                        class="collapse"
                                        :id="'nav_group_desktop_' + sectionKey.replace(/\s+/g, '') + '_' + nav_group_key.replace(/\s+/g, '')"
                                    >
                                         <a v-for="(nav, index) in nav_group"
                                            :key="`${sectionKey}-${nav_group_key}-${index}`"
                                            :href="nav.route"
                                            :class="['nav-item', 'sub-item', 'd-block', nav.active ? 'active' : '']"
                                        >
                                            {{ nav.title }}
                                        </a>
                                    </div>
                                    <a v-else-if="typeof nav_group === 'object' && nav_group !== null && nav_group.route !== undefined"
                                        :href="nav_group.route"
                                        :class="['nav-item', 'd-block', nav_group.active ? 'active' : '']"
                                    >
                                        {{ nav_group.title }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

         <div class="offcanvas offcanvas-start bg-gradient-custom text-white sidebar-mobile" tabindex="-1" id="sidebarOffcanvas" aria-labelledby="sidebarOffcanvasLabel" ref="sidebarRef">
            <div class="offcanvas-header border-bottom border-white border-opacity-25">
                 <div class="d-flex align-items-center">
                    <img src="/storage/local/images/apps/logo.png" alt="SEEO Logo" class="sidebar-logo-img me-2" @error="$event.target.src='/storage/local/images/compro/logo.png'"/>
                    <div class="lh-sm">
                        <h5 class="sidebar-logo-title mb-0" id="sidebarOffcanvasLabel">SEEO</h5>
                        <span class="sidebar-logo-subtitle d-block">Information System</span>
                    </div>
                </div>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body sidebar-content-inner p-3">
                 <div class="navigation-menu flex-grow-1">
                     <div v-for="(sectionContent, sectionKey) in nav_list" :key="sectionKey + '-mobile'" class="nav-section mb-2">
                         <button
                            type="button"
                            class="nav-header btn w-100 text-start d-flex align-items-center"
                            data-bs-toggle="collapse"
                            :data-bs-target="'#nav_section_mobile_' + sectionKey.replace(/\s+/g, '')"
                            :class="{'active-section': active_section == sectionKey}"
                            @click="changeIcon('icon_nav_section_mobile_' + sectionKey.replace(/\s+/g, ''))"
                        >
                            <i :id="'icon_nav_section_mobile_' + sectionKey.replace(/\s+/g, '')" :class="['bi', 'me-2', active_section == sectionKey ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
                            <span class="fw-semibold">{{ sectionKey }}</span>
                        </button>
                         <div class="collapse" :id="'nav_section_mobile_' + sectionKey.replace(/\s+/g, '')">
                            <div class="nav-items pt-1 ps-3">
                                 <div v-for="(nav_group, nav_group_key) in sectionContent" :key="nav_group_key + '-mobile'" class="mb-1">
                                     <a v-if="Array.isArray(nav_group)"
                                        class="nav-item nav-group d-flex align-items-center btn text-start w-100"
                                        data-bs-toggle="collapse"
                                        :href="'#nav_group_mobile_' + sectionKey.replace(/\s+/g, '') + '_' + nav_group_key.replace(/\s+/g, '')"
                                        role="button"
                                        :class="{'active-group': active_group == nav_group_key}"
                                        @click="changeIcon('icon_nav_group_mobile_' + sectionKey.replace(/\s+/g, '') + '_' + nav_group_key.replace(/\s+/g, ''))"
                                    >
                                         <i :id="'icon_nav_group_mobile_' + sectionKey.replace(/\s+/g, '') + '_' + nav_group_key.replace(/\s+/g, '')" :class="['bi', 'me-2', 'nav-group-icon', active_group == nav_group_key ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
                                         <span class="fw-medium">{{ nav_group_key }}</span>
                                    </a>
                                     <div v-if="Array.isArray(nav_group)"
                                        class="collapse"
                                        :id="'nav_group_mobile_' + sectionKey.replace(/\s+/g, '') + '_' + nav_group_key.replace(/\s+/g, '')"
                                    >
                                         <a v-for="(nav, index) in nav_group"
                                            :key="`${sectionKey}-${nav_group_key}-${index}-mobile`"
                                            :href="nav.route"
                                            :class="['nav-item', 'sub-item', 'd-block', nav.active ? 'active' : '']"
                                        >
                                            {{ nav.title }}
                                        </a>
                                    </div>
                                     <a v-else-if="typeof nav_group === 'object' && nav_group !== null && nav_group.route !== undefined"
                                        :href="nav_group.route"
                                        :class="['nav-item', 'd-block', nav_group.active ? 'active' : '']"
                                    >
                                        {{ nav_group.title }}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="main-content-wrapper flex-grow-1 d-flex flex-column overflow-hidden">
<header class="top-header bg-white border-bottom shadow-sm px-2 px-lg-3 py-2" v-if="$slots.header">
                 <div class="d-flex justify-content-between align-items-center">
                    <button class="btn border-0 d-lg-none p-1 me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas" aria-controls="sidebarOffcanvas">
                        <i class="bi bi-list fs-3"></i>
                    </button>

                    <div class="page-title me-auto">
                        <h4 class="mb-0 fs-5 fw-semibold"><slot name="header" /></h4>
                        <div class="page-meta small text-muted">
                            <span>{{ date_header }}</span>
                            <span class="mx-1 d-none d-md-inline">•</span>
                            <span class="d-none d-md-inline">{{ currentTime }}</span>
                        </div>
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
                                :src="'/storage/images/profile/' + (auth_user?.profile_image ?? 'example.png')"
                                alt="Profile"
                                class="profile-img rounded-circle me-2"
                                @error="$event.target.src='/storage/local/images/compro/logo.png'"
                                style="width: 40px; height: 40px; object-fit: cover;"
                            />
                            <div class="profile-info d-none d-lg-block lh-sm text-start">
                                <h6 class="mb-0 small fw-medium text-dark text-truncate" style="max-width: 150px;">{{ auth_user?.name }}</h6>
                                <small class="text-muted d-block text-truncate" style="max-width: 150px;">{{ auth_user?.roles?.name || 'Staff' }}</small>
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

            <main class="content-container flex-grow-1 overflow-auto p-2 p-lg-3">
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
     background: linear-gradient(135deg, #0d6efd 0%, #6ea8fe 100%);
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
    background-color: #f8fafc; /* Latar belakang area konten */
}

/* Top Header */
.top-header {
    height: 65px; /* Tinggi header tetap */
    flex-shrink: 0;
}
.profile-img { width: 40px; height: 40px; } /* Ukuran gambar profil */

/* Content Container */
.content-container {
    background-color: #f8fafc;
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
.form-check-input:checked { background-color: #4e54c8; border-color: #4e54c8; } /* Warna check input */
.btn-primary { background-color: #0d6efd; border-color: #0d6efd; }
.btn-primary:hover { background-color: #0b5ed7; border-color: #0b5ed7; }
.btn-success { background-color: #10b981; border-color: #10b981; }
.btn-success:hover { background-color: #059669; border-color: #059669; }
.text-primary { color: #0d6efd !important; }
a.text-primary:hover { color: #0b5ed7 !important; }
</style>