<script setup>
import { Head, router, useForm, usePage } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';
import { formatIDR } from '@/utils';
import InputError from '@/Components/InputError.vue';
import StaffLayout from '@/Layouts/StaffLayout.vue';
import Notif from '@/Components/Notif.vue';

const route = (name, params = {}) => window.route(name, params);

const props = defineProps({
    stands: {
        type: Array,
        default: () => [],
    },
    selectedStand: {
        type: Object,
        default: null,
    },
    expenseItems: {
        type: Array,
        default: () => [],
    },
    menus: {
        type: Array,
        default: () => [],
    },
    buyers: {
        type: Array,
        default: () => [],
    },
    menu_category: {
        type: Object,
        default: () => ({}),
    },
    food_tag_list: {
        type: Array,
        default: () => [],
    },
    all_categories: {
        type: Array,
        default: () => [],
    },
    notif: {
        type: Object,
        default: null,
    },
    errors: {
        type: Object,
        default: () => ({}),
    },
});

const { auth } = usePage().props;
const auth_user = auth.user;

const selectedStandId = ref(props.selectedStand?.id ?? props.stands?.[0]?.id ?? null);
const selectedMenuId = ref(props.menus?.[0]?.id ?? null);

// Primary Tabs: 'delivery' (Pengantaran) | 'catalog' (Katalog Toko) | 'recipe' (Resep & HPP)
const activeTab = ref('delivery');

// Guide Modal state
const showGuideModal = ref(false);

// Search & Filter state
const menuSearch = ref('');
const buyerSearch = ref('');
const deliveryFilter = ref('all'); // 'all' | 'pending' | 'delivered'
const categoryFilter = ref('all');

const recipeForm = useForm({
    components: [],
});

const activeMenu = computed(() => props.menus.find((menu) => menu.id === selectedMenuId.value) ?? null);

const filteredMenus = computed(() => {
    const keyword = menuSearch.value.trim().toLowerCase();
    return props.menus.filter((menu) => {
        const catMatch = categoryFilter.value === 'all' || menu.category === categoryFilter.value;
        if (!catMatch) return false;
        if (!keyword) return true;
        return [menu.name, menu.category]
            .filter(Boolean)
            .some((value) => String(value).toLowerCase().includes(keyword));
    });
});

const filteredBuyers = computed(() => {
    const keyword = buyerSearch.value.trim().toLowerCase();
    return props.buyers.filter((buyer) => {
        const statusMatch =
            deliveryFilter.value === 'all' ||
            (deliveryFilter.value === 'delivered' && buyer.is_delivered) ||
            (deliveryFilter.value === 'pending' && !buyer.is_delivered);
        if (!statusMatch) return false;
        if (!keyword) return true;

        const haystack = [buyer.customer, buyer.order_type, buyer.send_option, ...(buyer.items || []).map((item) => item.menu)]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
        return haystack.includes(keyword);
    });
});

const publishedMenuCount = computed(() => props.menus.filter((menu) => menu.is_published).length);
const pendingDeliveryCount = computed(() => props.buyers.filter((buyer) => !buyer.is_delivered).length);
const deliveredCount = computed(() => props.buyers.filter((buyer) => buyer.is_delivered).length);

function filterStand() {
    router.get(route('staff.sales-distribution.index'), { stand_id: selectedStandId.value }, { preserveState: true, replace: true });
}

function buildRecipeComponents(menu) {
    return props.expenseItems.map((expense) => {
        const currentComponent = menu?.recipe_components?.find((component) => component.stand_expense_id === expense.id);
        return {
            stand_expense_id: expense.id,
            name: expense.name,
            unit: expense.unit,
            total_price: expense.total_price,
            expense: expense,
            quantity_used: currentComponent?.quantity_used ?? 0,
        };
    });
}

function syncRecipeMenu(menuId) {
    selectedMenuId.value = Number(menuId);
    const menu = props.menus.find((item) => item.id === selectedMenuId.value) ?? null;
    recipeForm.components = buildRecipeComponents(menu);
    activeTab.value = 'recipe'; // Switch to recipe tab for seamless UX
}

watch(
    () => props.menus,
    (menus) => {
        if (!menus.length) {
            selectedMenuId.value = null;
            recipeForm.components = buildRecipeComponents(null);
            return;
        }

        if (!selectedMenuId.value || !menus.some((menu) => menu.id === selectedMenuId.value)) {
            selectedMenuId.value = menus[0].id;
            recipeForm.components = buildRecipeComponents(menus[0]);
        }
    },
    { immediate: true }
);

function submitRecipe() {
    if (!selectedMenuId.value) return;

    recipeForm.transform((data) => ({
        ...data,
        components: data.components
            .filter((component) => Number(component.quantity_used) > 0)
            .map(({ stand_expense_id, quantity_used }) => ({ stand_expense_id, quantity_used })),
    })).post(route('staff.sales-distribution.menu.recipe.store', { menu: selectedMenuId.value }), {
        preserveScroll: true,
    });
}

function togglePublish(menu) {
    router.post(route('staff.sales-distribution.menu.publish', { menu: menu.id }), {}, { preserveScroll: true });
}

function toggleDelivery(buyer) {
    router.post(route('staff.sales-distribution.order.deliver', { sale: buyer.id }), {}, { preserveScroll: true });
}

function suggestPrice(cost) {
    if (!cost) return '-';
    return formatIDR(Math.ceil(cost * 1.3));
}
</script>

<template>
    <Head title="Sales Distribution & Pengantaran" />

    <StaffLayout>
        <div class="container-fluid py-3 py-md-4">
            <Notif v-if="notif" :notif="notif" />

            <!-- ================= TOP HEADER BANNER ================= -->
            <div class="card border-0 shadow-sm rounded-4 bg-white mb-4">
                <div class="card-body p-4 d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-center">
                    <div>
                        <div class="d-flex align-items-center gap-2 mb-1 flex-wrap">
                            <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-semibold">
                                <i class="bi bi-cart-check-fill me-1"></i> Sales Distribution
                            </span>
                            <span class="badge bg-light text-secondary border rounded-pill px-3 py-1">
                                Stand: {{ selectedStand?.name || 'Semua Stand' }}
                            </span>
                        </div>
                        <h4 class="mb-1 fw-bold text-dark">Manajemen Penjualan, Etalase & Pengantaran</h4>
                        <p class="text-secondary mb-0 small">
                            Pantau antrean pengantaran pesanan, atur ketersediaan menu di web toko, dan kelola HPP resep produk.
                        </p>
                    </div>

                    <div class="d-flex gap-2 align-items-center flex-wrap">
                        <!-- Button Panduan Alur Fitur -->
                        <button
                            type="button"
                            class="btn btn-warning text-dark fw-bold rounded-pill px-3 py-2 shadow-2xs d-inline-flex align-items-center gap-2 hover-lift transition-all"
                            @click="showGuideModal = true"
                        >
                            <i class="bi bi-lightbulb-fill text-dark fs-6"></i>
                            <span>Panduan Alur Fitur</span>
                        </button>

                        <!-- Stand Selector Dropdown -->
                        <div class="d-flex align-items-center gap-1 bg-light p-1 ps-2 rounded-pill border">
                            <i class="bi bi-shop text-muted small"></i>
                            <select
                                v-model="selectedStandId"
                                class="form-select form-select-sm border-0 bg-transparent fw-medium pe-4"
                                style="min-width: 180px;"
                                @change="filterStand"
                            >
                                <option v-for="stand in stands" :key="stand.id" :value="stand.id">{{ stand.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= TOP METRICS STATS ================= -->
            <div class="row g-3 mb-4">
                <!-- 1. Menunggu Pengantaran (Paling Kritis) -->
                <div class="col-12 col-sm-6 col-lg-4">
                    <div
                        class="card border-0 shadow-sm rounded-4 p-3 transition-all cursor-pointer h-100"
                        :class="pendingDeliveryCount > 0 ? 'bg-warning bg-opacity-10 border-start border-4 border-warning' : 'bg-white'"
                        @click="activeTab = 'delivery'"
                    >
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="text-secondary small fw-medium">Antrean Menunggu Pengantaran</span>
                                <div class="fs-3 fw-bold mt-1" :class="pendingDeliveryCount > 0 ? 'text-danger' : 'text-dark'">
                                    {{ pendingDeliveryCount }} Pesanan
                                </div>
                                <small class="text-muted d-block mt-1">Perlu diantar ke pemesan</small>
                            </div>
                            <div class="rounded-circle p-3 d-flex align-items-center justify-content-center" :class="pendingDeliveryCount > 0 ? 'bg-warning text-dark' : 'bg-light text-secondary'" style="width: 52px; height: 52px;">
                                <i class="bi bi-box-seam fs-4"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 2. Pesanan Selesai Diantar -->
                <div class="col-12 col-sm-6 col-lg-4">
                    <div class="card border-0 shadow-sm rounded-4 p-3 bg-white h-100 cursor-pointer" @click="activeTab = 'delivery'">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="text-secondary small fw-medium">Order Selesai Diantar</span>
                                <div class="fs-3 fw-bold text-success mt-1">
                                    {{ deliveredCount }} Pesanan
                                </div>
                                <small class="text-muted d-block mt-1">Telah diserahkan ke pelanggan</small>
                            </div>
                            <div class="rounded-circle p-3 bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center" style="width: 52px; height: 52px;">
                                <i class="bi bi-check2-circle fs-4"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 3. Menu Tayang di Toko -->
                <div class="col-12 col-sm-6 col-lg-4">
                    <div class="card border-0 shadow-sm rounded-4 p-3 bg-white h-100 cursor-pointer" @click="activeTab = 'catalog'">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="text-secondary small fw-medium">Menu Tayang di Toko Online</span>
                                <div class="fs-3 fw-bold text-primary mt-1">
                                    {{ publishedMenuCount }} / {{ menus.length }} Menu
                                </div>
                                <small class="text-muted d-block mt-1">Aktif & dapat dibeli konsumen</small>
                            </div>
                            <div class="rounded-circle p-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center" style="width: 52px; height: 52px;">
                                <i class="bi bi-shop fs-4"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= BUSINESS TABS NAVIGATION ================= -->
            <div class="card border-0 shadow-sm rounded-4 bg-white mb-4">
                <div class="card-header bg-white border-bottom p-2 px-3">
                    <ul class="nav nav-pills gap-2 flex-wrap" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button
                                class="nav-link rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2"
                                :class="{ active: activeTab === 'delivery' }"
                                type="button"
                                @click="activeTab = 'delivery'"
                            >
                                <i class="bi bi-box-seam"></i>
                                <span>Pengantaran Pesanan (Delivery)</span>
                                <span v-if="pendingDeliveryCount > 0" class="badge bg-danger rounded-pill ms-1">
                                    {{ pendingDeliveryCount }}
                                </span>
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button
                                class="nav-link rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2"
                                :class="{ active: activeTab === 'catalog' }"
                                type="button"
                                @click="activeTab = 'catalog'"
                            >
                                <i class="bi bi-grid"></i>
                                <span>Etalase & Publikasi Toko</span>
                                <span class="badge bg-secondary rounded-pill ms-1">
                                    {{ menus.length }}
                                </span>
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button
                                class="nav-link rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2"
                                :class="{ active: activeTab === 'recipe' }"
                                type="button"
                                @click="activeTab = 'recipe'"
                            >
                                <i class="bi bi-card-checklist"></i>
                                <span>Resep & Kalkulasi HPP</span>
                            </button>
                        </li>
                    </ul>
                </div>

                <div class="card-body p-3 p-md-4">
                    <!-- ================= TAB 1: PENGANTARAN PESANAN (DELIVERY) ================= -->
                    <div v-if="activeTab === 'delivery'" class="delivery-tab-pane">
                        <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                            <div>
                                <h5 class="fw-bold text-dark mb-1">
                                    <i class="bi bi-bicycle text-primary me-1"></i> Antrean Pengantaran Pesanan Konsumen
                                </h5>
                                <small class="text-muted">Kelola pesanan yang masuk dan tandai pesanan yang telah berhasil diantar ke pembeli.</small>
                            </div>

                            <!-- Search & Status Filter -->
                            <div class="d-flex gap-2 align-items-center flex-wrap">
                                <div class="input-group input-group-sm" style="width: 220px;">
                                    <span class="input-group-text bg-light"><i class="bi bi-search"></i></span>
                                    <input
                                        v-model="buyerSearch"
                                        type="search"
                                        class="form-control"
                                        placeholder="Cari pembeli / menu..."
                                    />
                                </div>
                                <select v-model="deliveryFilter" class="form-select form-select-sm" style="width: 170px;">
                                    <option value="all">Semua Status ({{ buyers.length }})</option>
                                    <option value="pending">🛵 Belum Diantar ({{ pendingDeliveryCount }})</option>
                                    <option value="delivered">✓ Sudah Diantar ({{ deliveredCount }})</option>
                                </select>
                            </div>
                        </div>

                        <!-- Delivery Table -->
                        <div class="table-responsive rounded-3 border">
                            <table class="table align-middle table-hover mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th class="ps-3 fw-semibold small text-secondary">Pembeli & Opsi Kirim</th>
                                        <th class="fw-semibold small text-secondary">Rincian Menu & Jumlah</th>
                                        <th class="fw-semibold small text-secondary">Total Transaksi</th>
                                        <th class="fw-semibold small text-secondary">Status Pengantaran</th>
                                        <th class="text-center fw-semibold small text-secondary pe-3">Aksi Petugas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="buyer in filteredBuyers" :key="buyer.id">
                                        <td class="ps-3">
                                            <div class="fw-bold text-dark">{{ buyer.customer }}</div>
                                            <div class="d-flex gap-1 mt-1">
                                                <span class="badge bg-light text-secondary border small">{{ buyer.order_type || 'Takeaway' }}</span>
                                                <span class="badge bg-primary-subtle text-primary border border-primary-subtle small">{{ buyer.send_option || 'Delivery' }}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex flex-column gap-1">
                                                <div v-for="item in buyer.items" :key="item.id" class="small fw-medium text-dark">
                                                    • {{ item.menu }} <span class="badge bg-light text-dark border ms-1">{{ item.amount }}x</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span class="fw-bold text-success">{{ formatIDR(buyer.transaction) }}</span>
                                        </td>
                                        <td>
                                            <span
                                                class="badge rounded-pill px-3 py-1 fw-bold"
                                                :class="buyer.is_delivered ? 'bg-success text-white' : 'bg-warning text-dark'"
                                            >
                                                {{ buyer.is_delivered ? '✓ Sudah Diantar' : '🛵 Belum Diantar' }}
                                            </span>
                                        </td>
                                        <td class="text-center pe-3">
                                            <button
                                                class="btn btn-sm rounded-pill px-3 fw-semibold d-inline-flex align-items-center gap-1 shadow-2xs"
                                                :class="buyer.is_delivered ? 'btn-outline-danger' : 'btn-success text-white'"
                                                @click="toggleDelivery(buyer)"
                                                :title="buyer.is_delivered ? 'Batalkan status sudah diantar' : 'Konfirmasi pesanan telah sampai ke tangan pemesan'"
                                            >
                                                <i :class="buyer.is_delivered ? 'bi bi-arrow-counterclockwise' : 'bi bi-check2-circle'"></i>
                                                <span>{{ buyer.is_delivered ? 'Batalkan' : 'Tandai Sudah Diantar' }}</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-if="!filteredBuyers.length">
                                        <td colspan="5" class="text-center text-muted py-5">
                                            <i class="bi bi-inbox display-6 d-block mb-2 text-muted opacity-50"></i>
                                            Tidak ada data pesanan yang cocok dengan filter.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- ================= TAB 2: ETALASE & PUBLIKASI MENU (CATALOG) ================= -->
                    <div v-else-if="activeTab === 'catalog'" class="catalog-tab-pane">
                        <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                            <div>
                                <h5 class="fw-bold text-dark mb-1">
                                    <i class="bi bi-grid text-primary me-1"></i> Katalog Menu Stand & Status Toko Online
                                </h5>
                                <small class="text-muted">Tentukan menu mana yang boleh tampil dan dipesan oleh pelanggan di web `/shop`.</small>
                            </div>

                            <div class="d-flex gap-2 align-items-center flex-wrap">
                                <div class="input-group input-group-sm" style="width: 220px;">
                                    <span class="input-group-text bg-light"><i class="bi bi-search"></i></span>
                                    <input
                                        v-model="menuSearch"
                                        type="search"
                                        class="form-control"
                                        placeholder="Cari nama menu..."
                                    />
                                </div>
                                <select v-model="categoryFilter" class="form-select form-select-sm" style="width: 170px;">
                                    <option value="all">Semua Kategori</option>
                                    <option v-for="cat in all_categories" :key="cat" :value="cat">{{ cat }}</option>
                                </select>
                            </div>
                        </div>

                        <!-- Menu Table -->
                        <div class="table-responsive rounded-3 border">
                            <table class="table align-middle table-hover mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th class="ps-3 fw-semibold small text-secondary">Menu</th>
                                        <th class="fw-semibold small text-secondary">Stok & Penjualan</th>
                                        <th class="fw-semibold small text-secondary">HPP (Biaya)</th>
                                        <th class="fw-semibold small text-secondary">Harga Jual</th>
                                        <th class="fw-semibold small text-secondary">Status Toko</th>
                                        <th class="text-center fw-semibold small text-secondary pe-3">Aksi Publikasi & Resep</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="menu in filteredMenus" :key="menu.id">
                                        <td class="ps-3">
                                            <div class="fw-bold text-dark">{{ menu.name }}</div>
                                            <span class="badge bg-light text-secondary border small">{{ menu.category }}</span>
                                        </td>
                                        <td>
                                            <div class="small fw-medium text-dark">Stok: <strong>{{ menu.stock }}</strong> porsi</div>
                                            <small class="text-muted">Terjual: {{ menu.sale }} porsi</small>
                                        </td>
                                        <td>
                                            <span class="small fw-medium" :class="menu.cost ? 'text-secondary' : 'text-danger'">
                                                {{ menu.cost ? formatIDR(menu.cost) : 'Belum diset' }}
                                            </span>
                                        </td>
                                        <td>
                                            <span class="fw-bold text-success">{{ formatIDR(menu.price) }}</span>
                                        </td>
                                        <td>
                                            <span
                                                class="badge rounded-pill px-3 py-1 fw-bold"
                                                :class="menu.is_published ? 'bg-success text-white' : 'bg-secondary text-white'"
                                            >
                                                {{ menu.is_published ? '🟢 Tayang di Toko' : '⚪ Draft / Sembunyi' }}
                                            </span>
                                        </td>
                                        <td class="text-center pe-3">
                                            <div class="d-flex gap-2 justify-content-center">
                                                <button
                                                    type="button"
                                                    class="btn btn-outline-primary btn-sm rounded-pill px-3 shadow-2xs"
                                                    @click="syncRecipeMenu(menu.id)"
                                                    title="Buka kalkulator resep bahan & HPP untuk menu ini"
                                                >
                                                    <i class="bi bi-card-checklist me-1"></i> Resep & HPP
                                                </button>
                                                <button
                                                    type="button"
                                                    class="btn btn-sm rounded-pill px-3 shadow-2xs fw-semibold"
                                                    :class="menu.is_published ? 'btn-outline-danger' : 'btn-success text-white'"
                                                    @click="togglePublish(menu)"
                                                    :title="menu.is_published ? 'Tarik menu dari toko online pelanggan' : 'Tampilkan menu di toko online pelanggan'"
                                                >
                                                    <i :class="menu.is_published ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                                    <span>{{ menu.is_published ? 'Tarik (Unpublish)' : 'Tayangkan (Publish)' }}</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="!filteredMenus.length">
                                        <td colspan="6" class="text-center text-muted py-5">
                                            <i class="bi bi-inbox display-6 d-block mb-2 text-muted opacity-50"></i>
                                            Tidak ada menu yang sesuai dengan pencarian.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- ================= TAB 3: RESEP & KALKULASI HPP (RECIPE) ================= -->
                    <div v-else-if="activeTab === 'recipe'" class="recipe-tab-pane">
                        <div class="row g-4">
                            <!-- Left: Select Menu & Cost Summary -->
                            <div class="col-12 col-lg-4">
                                <div class="p-3 p-md-4 rounded-4 bg-light border h-100">
                                    <h6 class="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                                        <i class="bi bi-calculator-fill text-primary"></i>
                                        Pilih Menu & Rangkuman Biaya
                                    </h6>

                                    <div class="mb-3">
                                        <label class="form-label small fw-semibold text-secondary">Pilih Menu yang Dihitung:</label>
                                        <select
                                            v-model="selectedMenuId"
                                            class="form-select form-select-sm rounded-3 fw-medium"
                                            @change="syncRecipeMenu($event.target.value)"
                                        >
                                            <option v-for="menu in menus" :key="menu.id" :value="menu.id">{{ menu.name }}</option>
                                        </select>
                                    </div>

                                    <div v-if="activeMenu" class="cost-summary-card card border-0 shadow-2xs p-3 rounded-3 bg-white mb-3">
                                        <div class="fw-bold text-dark mb-2">{{ activeMenu.name }}</div>
                                        <div class="d-flex justify-content-between py-1 border-bottom small">
                                            <span class="text-muted">Biaya Produksi (HPP):</span>
                                            <span class="fw-bold" :class="activeMenu.cost ? 'text-primary' : 'text-danger'">
                                                {{ activeMenu.cost ? formatIDR(activeMenu.cost) : 'Belum dihitung' }}
                                            </span>
                                        </div>
                                        <div class="d-flex justify-content-between py-1 border-bottom small">
                                            <span class="text-muted">Saran Harga (+30%):</span>
                                            <span class="fw-semibold text-success">{{ suggestPrice(activeMenu.cost) }}</span>
                                        </div>
                                        <div class="d-flex justify-content-between py-1 small">
                                            <span class="text-muted">Harga Jual Saat Ini:</span>
                                            <span class="fw-bold text-dark">{{ formatIDR(activeMenu.price) }}</span>
                                        </div>
                                    </div>

                                    <div v-if="activeMenu" class="d-grid gap-2">
                                        <button
                                            type="button"
                                            class="btn btn-sm rounded-pill fw-semibold py-2"
                                            :class="activeMenu.is_published ? 'btn-outline-danger' : 'btn-success'"
                                            @click="togglePublish(activeMenu)"
                                        >
                                            <i :class="activeMenu.is_published ? 'bi bi-eye-slash me-1' : 'bi bi-check-circle me-1'"></i>
                                            {{ activeMenu.is_published ? 'Tarik dari Toko (Unpublish)' : 'Tayangkan Menu ke Toko' }}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Right: Ingredients Table -->
                            <div class="col-12 col-lg-8">
                                <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                                    <div>
                                        <h6 class="fw-bold text-dark mb-1">
                                            <i class="bi bi-basket3-fill text-warning me-1"></i> Komposisi Bahan Baku Stand
                                        </h6>
                                        <small class="text-muted">Masukkan takaran bahan belanja yang digunakan per porsi menu ini.</small>
                                    </div>
                                    <button
                                        type="button"
                                        class="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm btn-sm"
                                        :disabled="recipeForm.processing"
                                        @click="submitRecipe"
                                    >
                                        <span v-if="recipeForm.processing" class="spinner-border spinner-border-sm me-1"></span>
                                        <i v-else class="bi bi-save me-1"></i>
                                        <span>Simpan Resep Menu</span>
                                    </button>
                                </div>

                                <div class="table-responsive rounded-3 border">
                                    <table class="table align-middle table-hover mb-0">
                                        <thead class="table-light">
                                            <tr>
                                                <th class="ps-3 fw-semibold small text-secondary">Nama Bahan Belanja</th>
                                                <th class="fw-semibold small text-secondary" style="width: 180px;">Takaran / Porsi</th>
                                                <th class="text-end pe-3 fw-semibold small text-secondary">Estimasi Biaya Bahan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(component, index) in recipeForm.components" :key="component.stand_expense_id">
                                                <td class="ps-3">
                                                    <div class="fw-bold text-dark">{{ component.name }}</div>
                                                    <small class="text-muted">
                                                        Harga Beli: {{ formatIDR(component.total_price) }} per {{ component.expense?.qty || 1 }} {{ component.unit }}
                                                    </small>
                                                </td>
                                                <td>
                                                    <div class="input-group input-group-sm">
                                                        <input
                                                            v-model.number="recipeForm.components[index].quantity_used"
                                                            type="number"
                                                            min="0"
                                                            step="0.01"
                                                            class="form-control text-center"
                                                            placeholder="0"
                                                        />
                                                        <span class="input-group-text bg-light small">{{ component.unit }}</span>
                                                    </div>
                                                </td>
                                                <td class="text-end pe-3">
                                                    <span v-if="component.quantity_used > 0" class="fw-bold text-dark">
                                                        {{ formatIDR((component.total_price / (component.expense?.qty || 1)) * component.quantity_used) }}
                                                    </span>
                                                    <span v-else class="text-muted small">-</span>
                                                </td>
                                            </tr>
                                            <tr v-if="!recipeForm.components.length">
                                                <td colspan="3" class="text-center text-muted py-5">
                                                    <i class="bi bi-receipt display-6 d-block mb-2 text-muted opacity-50"></i>
                                                    Belum ada item belanja pengeluaran yang divalidasi pada stand ini.
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StaffLayout>

    <!-- ================= MODAL PANDUAN ALUR FITUR SALES DISTRIBUTION ================= -->
    <Teleport to="body">
        <transition name="fade">
            <div
                v-if="showGuideModal"
                class="guide-modal-backdrop"
                @click.self="showGuideModal = false"
                tabindex="-1"
            >
                <div class="guide-modal-box card border-0 shadow-lg rounded-4 overflow-hidden" role="dialog">
                    <div class="modal-header-custom p-4 text-white" style="background: linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%);">
                        <div class="d-flex justify-content-between align-items-center w-100">
                            <div class="d-flex align-items-center gap-3">
                                <div class="rounded-circle p-2 bg-white bg-opacity-20 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px;">
                                    <i class="bi bi-cart-check-fill fs-4 text-warning"></i>
                                </div>
                                <div>
                                    <span class="badge rounded-pill bg-white bg-opacity-20 text-white text-2xs mb-1">Panduan Pengoperasian</span>
                                    <h5 class="mb-0 fw-bold">Alur Kerja Fitur Sales Distribution</h5>
                                </div>
                            </div>
                            <button type="button" class="btn-close btn-close-white" @click="showGuideModal = false" aria-label="Close"></button>
                        </div>
                    </div>

                    <div class="modal-body-custom p-4 overflow-y-auto" style="max-height: 75vh;">
                        <!-- Bagian 1: Tujuan Fitur -->
                        <div class="mb-4">
                            <h6 class="fw-bold text-dark d-flex align-items-center gap-2 mb-2">
                                <i class="bi bi-bullseye text-primary"></i> Apa Tujuan Halaman Ini?
                            </h6>
                            <p class="small text-secondary mb-0 lh-base">
                                Halaman <strong>Sales Distribution</strong> adalah jembatan antara tim Dapur (Produksi) dan Konsumen. Tugas utama tim di halaman ini terbagi menjadi 3 kegiatan pokok:
                            </p>
                        </div>

                        <!-- Bagian 2: Alur 3 Langkah Bertahap -->
                        <div class="mb-4">
                            <h6 class="fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                                <i class="bi bi-signpost-2 text-primary"></i> 3 Alur Kerja Pokok (SOP Harian)
                            </h6>

                            <div class="d-flex flex-column gap-3">
                                <!-- Langkah 1 -->
                                <div class="d-flex gap-3 p-3 rounded-3 bg-light border">
                                    <div class="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center shrink-0" style="width: 32px; height: 32px;">
                                        1
                                    </div>
                                    <div>
                                        <div class="fw-bold text-dark small mb-1">Hitung Resep & Biaya Pokok Produksi (HPP)</div>
                                        <p class="small text-secondary mb-0 lh-sm">
                                            Buka tab <strong>Resep & Kalkulasi HPP</strong>. Pilih menu yang dibuat, lalu masukkan jumlah takaran bahan belanja yang dipakai per porsi. Sistem akan otomatis menghitung HPP dan memberikan saran harga jual (+30%).
                                        </p>
                                    </div>
                                </div>

                                <!-- Langkah 2 -->
                                <div class="d-flex gap-3 p-3 rounded-3 bg-light border">
                                    <div class="rounded-circle bg-success text-white fw-bold d-flex align-items-center justify-content-center shrink-0" style="width: 32px; height: 32px;">
                                        2
                                    </div>
                                    <div>
                                        <div class="fw-bold text-dark small mb-1">Publikasikan Menu ke Toko Online (Publish to Shop)</div>
                                        <p class="small text-secondary mb-0 lh-sm">
                                            Buka tab <strong>Etalase & Publikasi Toko</strong>. Setelah stok siap dari dapur, klik tombol <strong>"Tayangkan (Publish)"</strong> agar menu dapat dipesan konsumen di website pemesanan pelanggan (`/shop`). Jika bahan baku habis, klik <strong>"Tarik (Unpublish)"</strong>.
                                        </p>
                                    </div>
                                </div>

                                <!-- Langkah 3 -->
                                <div class="d-flex gap-3 p-3 rounded-3 bg-light border">
                                    <div class="rounded-circle bg-warning text-dark fw-bold d-flex align-items-center justify-content-center shrink-0" style="width: 32px; height: 32px;">
                                        3
                                    </div>
                                    <div>
                                        <div class="fw-bold text-dark small mb-1">Pantau & Konfirmasi Pengantaran Pesanan (Delivery)</div>
                                        <p class="small text-secondary mb-0 lh-sm">
                                            Buka tab <strong>Pengantaran Pesanan</strong>. Saat ada pesanan dengan opsi delivery masuk, pantau nama pembeli dan rincian makanannya. Setelah kurir atau staf menyerahkan pesanan ke pelanggan, klik tombol <strong>"Tandai Sudah Diantar"</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Bagian 3: Kamus Istilah Penting -->
                        <div class="mb-4">
                            <h6 class="fw-bold text-dark d-flex align-items-center gap-2 mb-3">
                                <i class="bi bi-book-half text-primary"></i> Kamus Istilah Penting
                            </h6>
                            <div class="row g-2">
                                <div class="col-12 col-md-6">
                                    <div class="p-2 px-3 rounded-3 bg-light border small">
                                        <strong class="text-primary d-block">Published</strong>
                                        Menu aktif dan dapat dilihat serta dibeli oleh customer di web belanja.
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="p-2 px-3 rounded-3 bg-light border small">
                                        <strong class="text-danger d-block">Draft / Unpublish</strong>
                                        Menu disembunyikan sementara dari toko online (misal saat stok habis).
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="p-2 px-3 rounded-3 bg-light border small">
                                        <strong class="text-success d-block">HPP (Biaya Produksi)</strong>
                                        Akumulasi harga bahan baku yang dihabiskan untuk memproduksi 1 porsi menu.
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="p-2 px-3 rounded-3 bg-light border small">
                                        <strong class="text-warning text-dark d-block">Tandai Sudah Diantar</strong>
                                        Status bahwa pesanan antar telah sampai ke tangan customer dengan sukses.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Bagian 4: Pertanyaan Sering Diajukan (FAQ) -->
                        <div>
                            <h6 class="fw-bold text-dark d-flex align-items-center gap-2 mb-2">
                                <i class="bi bi-question-circle text-primary"></i> Pertanyaan Sering Diajukan
                            </h6>
                            <div class="small text-secondary">
                                <p class="mb-2"><strong>Q: Mengapa HPP menu berstatus "Belum dihitung"?</strong><br>A: Karena menu tersebut belum diatur takaran bahan bakunya pada tab <em>Resep & Kalkulasi HPP</em>.</p>
                                <p class="mb-0"><strong>Q: Bagaimana cara menambah menu baru jika belum ada di daftar?</strong><br>A: Pembuatan menu baru dilakukan di menu <strong>Production Panel</strong> oleh tim dapur.</p>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer-custom bg-light p-3 px-4 border-top d-flex justify-content-end">
                        <button type="button" class="btn btn-primary rounded-pill px-4 fw-medium" @click="showGuideModal = false">
                            <i class="bi bi-check2 me-1"></i> Saya Paham
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<style scoped>
.text-2xs {
    font-size: 0.75rem;
}
.shadow-2xs {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.cursor-pointer {
    cursor: pointer;
}
.hover-lift:hover {
    transform: translateY(-2px);
}
.nav-pills .nav-link {
    color: #475569;
    background-color: #f1f5f9;
}
.nav-pills .nav-link.active {
    color: #ffffff;
    background-color: #0284c7;
}

/* Guide Modal Styling */
.guide-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(4px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}
.guide-modal-box {
    background: #ffffff;
    width: 100%;
    max-width: 750px;
    max-height: 90vh;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
