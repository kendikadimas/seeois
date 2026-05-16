<script setup>
import { Head, router, useForm, usePage } from '@inertiajs/vue3';
import { computed, ref, watch, onMounted } from 'vue';
import { formatIDR } from '@/utils';
import InputError from '@/Components/InputError.vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

// Manual route helper to avoid Ziggy resolution issues
const route = (name, params = {}) => {
    const routes = {
        'staff.sales-distribution.index': '/staff/sales-distribution',
        'staff.sales-distribution.menu.store': '/staff/sales-distribution/menu',
        'staff.sales-distribution.menu.recipe.store': '/staff/sales-distribution/menu/{menu}/recipe',
        'staff.sales-distribution.menu.publish': '/staff/sales-distribution/menu/{menu}/publish',
        'staff.sales-distribution.order.deliver': '/staff/sales-distribution/order/{sale}/deliver',
    };
    if (routes[name]) {
        let url = routes[name];
        if (params && typeof params === 'object') {
            for (const key in params) {
                url = url.replace(`{${key}}`, params[key]);
            }
        } else if (params) {
            // Handle single param as {menu} or {sale}
            url = url.replace(/\{[a-z]+\}/, params);
        }
        return url;
    }
    console.warn(`Route "${name}" not found in MenuBoard helper.`);
    return window.route ? window.route(name, params) : '#';
};

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
const menuSearch = ref('');
const buyerSearch = ref('');
const deliveryFilter = ref('all');

const menuForm = useForm({
    stand_id: selectedStandId.value,
    name: '',
    category: '',
    food_tag: [],
    price: 0,
    stock: 0,
    volume: '',
    volume_unit: '',
    mass: '',
    mass_unit: '',
    image: null,
});

const addMenuModalRef = ref(null);
const fileAddMenuImageRef = ref(null);

function showAddMenuModal(show) {
    if (addMenuModalRef.value) {
        const modal = bootstrap.Modal.getOrCreateInstance(addMenuModalRef.value);
        if (show) modal.show();
        else modal.hide();
    }
}

const handleFileUploadMenuImage = (event) => {
    menuForm.image = event.target.files[0];
};

const recipeForm = useForm({
    components: [],
});

const activeMenu = computed(() => props.menus.find((menu) => menu.id === selectedMenuId.value) ?? null);
const filteredMenus = computed(() => {
    const keyword = menuSearch.value.trim().toLowerCase();
    return props.menus.filter((menu) => {
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
            syncRecipeMenu(menus[0].id);
            return;
        }

        recipeForm.components = buildRecipeComponents(activeMenu.value);
    },
    { immediate: true, deep: true }
);

watch(selectedStandId, (value) => {
    menuForm.stand_id = value;
});

function filterStand() {
    router.get('/staff/sales-distribution', { stand_id: selectedStandId.value }, { preserveState: true, replace: true });
}

function submitMenu() {
    menuForm.post('/staff/sales-distribution/menu', {
        preserveScroll: true,
        onSuccess: () => {
            showAddMenuModal(false);
            menuForm.reset();
            if (fileAddMenuImageRef.value) fileAddMenuImageRef.value.value = null;
        },
    });
}

function submitRecipe() {
    if (!selectedMenuId.value) {
        return;
    }

    recipeForm.post(`/staff/sales-distribution/menu/${selectedMenuId.value}/recipe`, {
        preserveScroll: true,
    });
}

function togglePublish(menu) {
    router.post(`/staff/sales-distribution/menu/${menu.id}/publish`, {}, { preserveScroll: true });
}

function toggleDelivery(buyer) {
    router.post(`/staff/sales-distribution/order/${buyer.id}/deliver`, {}, { preserveScroll: true });
}

function suggestPrice(cost) {
    if (!cost) {
        return '-';
    }

    return formatIDR(Math.ceil(cost * 1.3));
}
</script>

<template>
    <Head title="Sales Distribution Panel" />

    <StaffLayout>
        <div class="container-fluid py-4">
            <Notif v-if="notif" :notif="notif" />

            <div class="row g-4">
                <div class="col-12">
                    <div class="row g-3 mb-3">
                        <div class="col-12 col-md-4">
                            <div class="card border-0 shadow-sm h-100">
                                <div class="card-body">
                                    <div class="text-muted small">Menu Published</div>
                                    <div class="fs-3 fw-bold">{{ publishedMenuCount }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="card border-0 shadow-sm h-100">
                                <div class="card-body">
                                    <div class="text-muted small">Order Sudah Diantar</div>
                                    <div class="fs-3 fw-bold">{{ deliveredCount }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="card border-0 shadow-sm h-100">
                                <div class="card-body">
                                    <div class="text-muted small">Menunggu Pengantaran</div>
                                    <div class="fs-3 fw-bold">{{ pendingDeliveryCount }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card border-0 shadow-sm">
                        <div class="card-body">
                            <div class="d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-center">
                                <div>
                                    <h4 class="mb-1">Sales Distribution Panel</h4>
                                    <p class="text-muted mb-0">Buat menu, hitung biaya produksi, publish ke shop, dan pantau pengantaran order.</p>
                                </div>
                                <div class="d-flex gap-2 align-items-center">
                                    <select v-model="selectedStandId" class="form-select" style="min-width: 220px" @change="filterStand">
                                        <option v-for="stand in stands" :key="stand.id" :value="stand.id">{{ stand.name }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-xl-5">
                    <div class="card border-0 shadow-sm mb-4">
                        <div class="card-body text-center py-4">
                            <i class="bi bi-plus-circle text-primary fs-1 mb-3"></i>
                            <h5>Tambah Menu Baru</h5>
                            <p class="text-muted small mb-4">Tambahkan item menu baru untuk stand yang dipilih.</p>
                            <button class="btn btn-primary px-4" @click="showAddMenuModal(true)">
                                <i class="bi bi-plus-lg me-2"></i>Tambah Menu
                            </button>
                        </div>
                    </div>

                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-transparent border-0 pt-4 pb-0">
                            <h5 class="mb-0">Bahan & Biaya Produksi</h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Pilih Menu</label>
                                <select v-model="selectedMenuId" class="form-select" @change="syncRecipeMenu($event.target.value)">
                                    <option v-for="menu in menus" :key="menu.id" :value="menu.id">{{ menu.name }}</option>
                                </select>
                            </div>

                            <div v-if="activeMenu" class="alert alert-light border">
                                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                    <div>
                                        <strong>{{ activeMenu.name }}</strong>
                                        <div class="text-muted small">Biaya produksi: {{ activeMenu.cost ? formatIDR(activeMenu.cost) : '-' }}</div>
                                        <div class="text-muted small">Harga saran: {{ suggestPrice(activeMenu.cost) }}</div>
                                    </div>
                                    <button class="btn btn-outline-primary btn-sm" @click="togglePublish(activeMenu)">
                                        {{ activeMenu.is_published ? 'Unpublish' : 'Publish to Shop' }}
                                    </button>
                                </div>
                            </div>

                            <div v-if="activeMenu" class="table-responsive">
                                <table class="table align-middle">
                                    <thead>
                                        <tr>
                                            <th>Bahan</th>
                                            <th>Qty Dipakai</th>
                                            <th>Harga Total Bahan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(component, index) in recipeForm.components" :key="component.stand_expense_id">
                                            <td>
                                                <div>{{ component.name }}</div>
                                                <div class="text-muted small">{{ formatIDR(component.total_price) }} / {{ component.unit }}</div>
                                            </td>
                                            <td style="width: 180px;">
                                                <input v-model="recipeForm.components[index].quantity_used" type="number" min="0" step="0.01" class="form-control" />
                                            </td>
                                            <td>
                                                <span v-if="component.quantity_used > 0">
                                                    {{ formatIDR((component.total_price / (component.expense?.qty || 1)) * component.quantity_used) }}
                                                </span>
                                                <span v-else>-</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <button v-if="activeMenu" class="btn btn-primary" :disabled="recipeForm.processing" @click="submitRecipe">
                                {{ recipeForm.processing ? 'Menyimpan...' : 'Simpan Resep Menu' }}
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-xl-7">
                    <div class="card border-0 shadow-sm mb-4">
                        <div class="card-header bg-transparent border-0 pt-4 pb-0">
                            <h5 class="mb-0">Daftar Menu</h5>
                        </div>
                        <div class="card-body table-responsive">
                            <div class="row g-2 mb-3">
                                <div class="col-md-8">
                                    <input v-model="menuSearch" type="search" class="form-control" placeholder="Cari menu atau kategori" />
                                </div>
                                <div class="col-md-4 text-md-end">
                                    <button class="btn btn-outline-secondary w-100" @click="menuSearch = ''">Reset Pencarian</button>
                                </div>
                            </div>
                            <table class="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Menu</th>
                                        <th>Biaya Produksi</th>
                                        <th>Harga Jual</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="menu in filteredMenus" :key="menu.id">
                                        <td>
                                            <div class="fw-semibold">{{ menu.name }}</div>
                                            <div class="text-muted small">Stock {{ menu.stock }} | Terjual {{ menu.sale }}</div>
                                        </td>
                                        <td>{{ menu.cost ? formatIDR(menu.cost) : '-' }}</td>
                                        <td>{{ formatIDR(menu.price) }}</td>
                                        <td>
                                            <span class="badge" :class="menu.is_published ? 'bg-success' : 'bg-secondary'">
                                                {{ menu.is_published ? 'Published' : 'Draft' }}
                                            </span>
                                        </td>
                                        <td class="text-end">
                                            <button class="btn btn-outline-primary btn-sm" @click="syncRecipeMenu(menu.id)">Resep</button>
                                            <button class="btn btn-outline-success btn-sm ms-2" @click="togglePublish(menu)">{{ menu.is_published ? 'Unpublish' : 'Publish' }}</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-transparent border-0 pt-4 pb-0">
                            <h5 class="mb-0">Daftar Pembeli & Pengantaran</h5>
                        </div>
                        <div class="card-body table-responsive">
                            <div class="row g-2 mb-3">
                                <div class="col-md-5">
                                    <input v-model="buyerSearch" type="search" class="form-control" placeholder="Cari pembeli / menu / opsi kirim" />
                                </div>
                                <div class="col-md-4">
                                    <select v-model="deliveryFilter" class="form-select">
                                        <option value="all">Semua status</option>
                                        <option value="pending">Belum diantar</option>
                                        <option value="delivered">Sudah diantar</option>
                                    </select>
                                </div>
                                <div class="col-md-3 text-md-end">
                                    <button class="btn btn-outline-secondary w-100" @click="buyerSearch = ''; deliveryFilter = 'all'">Reset Filter</button>
                                </div>
                            </div>
                            <table class="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Pembeli</th>
                                        <th>Detail Order</th>
                                        <th>Total</th>
                                        <th>Diantar</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="buyer in filteredBuyers" :key="buyer.id">
                                        <td>
                                            <div class="fw-semibold">{{ buyer.customer }}</div>
                                            <div class="text-muted small">{{ buyer.order_type }} • {{ buyer.send_option }}</div>
                                        </td>
                                        <td>
                                            <div v-for="item in buyer.items" :key="item.id" class="small">
                                                {{ item.menu }} x{{ item.amount }}
                                            </div>
                                        </td>
                                        <td>{{ formatIDR(buyer.transaction) }}</td>
                                        <td>
                                            <span class="badge" :class="buyer.is_delivered ? 'bg-success' : 'bg-warning text-dark'">
                                                {{ buyer.is_delivered ? 'Sudah' : 'Belum' }}
                                            </span>
                                        </td>
                                        <td class="text-end">
                                            <button class="btn btn-outline-primary btn-sm" @click="toggleDelivery(buyer)">
                                                {{ buyer.is_delivered ? 'Batalkan' : 'Checklist' }}
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StaffLayout>

    <!-- Add Menu Modal -->
    <div
        class="modal fade"
        id="addMenuModal"
        ref="addMenuModalRef"
        tabindex="-1"
        aria-labelledby="addMenuModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addMenuModalLabel">
                        Tambah Menu Baru
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitMenu">
                        <div class="mb-3">
                            <label class="form-label fw-medium">Stand</label>
                            <select v-model="menuForm.stand_id" class="form-select form-select-sm">
                                <option v-for="stand in stands" :key="stand.id" :value="stand.id">{{ stand.name }}</option>
                            </select>
                            <InputError :message="menuForm.errors.stand_id" class="mt-2" />
                        </div>
                        <div class="mb-3">
                            <label for="addMenuName" class="form-label fw-medium">Nama Menu</label>
                            <input
                                v-model="menuForm.name"
                                type="text"
                                class="form-control form-control-sm"
                                id="addMenuName"
                                required
                            />
                            <InputError :message="menuForm.errors.name" class="mt-2" />
                        </div>
                        <div class="mb-3">
                            <label for="addMenuCategory" class="form-label fw-medium">Kategori</label>
                            <v-select
                                v-model="menuForm.category"
                                :options="[...new Set([...(all_categories || []), 'Main Course', 'Drink', 'Snack', 'Dessert'])]"
                                id="addMenuCategory"
                                class="basic-single"
                                :class="{ 'is-invalid': menuForm.errors.category }"
                                placeholder="Pilih Kategori"
                                taggable
                            />
                            <InputError :message="menuForm.errors.category" class="mt-2" />
                        </div>
                        <div class="mb-3">
                            <label for="addMenuFoodTag" class="form-label fw-medium">Food Tag</label>
                            <v-select
                                v-model="menuForm.food_tag"
                                :options="food_tag_list"
                                label="name"
                                :reduce="tag => tag.id"
                                id="addMenuFoodTag"
                                class="basic-single"
                                multiple
                                :class="{ 'is-invalid': menuForm.errors.food_tag }"
                                placeholder="Pilih Food Tag"
                            />
                            <InputError :message="menuForm.errors.food_tag" class="mt-2" />
                        </div>
                        <div class="row g-2 mb-3">
                            <div class="col-md-6">
                                <label for="addMenuPrice" class="form-label fw-medium">Harga Jual</label>
                                <input
                                    v-model="menuForm.price"
                                    type="number"
                                    class="form-control form-control-sm"
                                    id="addMenuPrice"
                                    required
                                />
                                <InputError :message="menuForm.errors.price" class="mt-2" />
                            </div>
                            <div class="col-md-6">
                                <label for="addMenuStock" class="form-label fw-medium">Stock Awal</label>
                                <input
                                    v-model="menuForm.stock"
                                    type="number"
                                    class="form-control form-control-sm"
                                    id="addMenuStock"
                                    required
                                />
                                <InputError :message="menuForm.errors.stock" class="mt-2" />
                            </div>
                        </div>
                        <div class="row g-2 mb-3">
                            <div class="col-md-6">
                                <label for="addMenuVolume" class="form-label fw-medium">Volume</label>
                                <div class="input-group">
                                    <input
                                        v-model="menuForm.volume"
                                        type="number"
                                        class="form-control form-control-sm"
                                        id="addMenuVolume"
                                    />
                                    <select
                                        v-model="menuForm.volume_unit"
                                        class="form-select form-select-sm"
                                        id="addMenuVolumeUnit"
                                    >
                                        <option value="">Unit</option>
                                        <option value="ml">ml</option>
                                        <option value="l">l</option>
                                        <option value="cc">cc</option>
                                        <option value="g">g</option>
                                        <option value="kg">kg</option>
                                        <option value="pcs">pcs</option>
                                    </select>
                                </div>
                                <InputError :message="menuForm.errors.volume" class="mt-2" />
                            </div>
                            <div class="col-md-6">
                                <label for="addMenuMass" class="form-label fw-medium">Massa</label>
                                <div class="input-group">
                                    <input
                                        v-model="menuForm.mass"
                                        type="number"
                                        class="form-control form-control-sm"
                                        id="addMenuMass"
                                    />
                                    <select
                                        v-model="menuForm.mass_unit"
                                        class="form-select form-select-sm"
                                        id="addMenuMassUnit"
                                    >
                                        <option value="">Unit</option>
                                        <option value="gr">gr</option>
                                        <option value="kg">kg</option>
                                    </select>
                                </div>
                                <InputError :message="menuForm.errors.mass" class="mt-2" />
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="addMenuImage" class="form-label fw-medium">Gambar Menu</label>
                            <input
                                ref="fileAddMenuImageRef"
                                @change="handleFileUploadMenuImage"
                                class="form-control form-control-sm"
                                type="file"
                                id="addMenuImage"
                                accept="image/*"
                            />
                            <InputError :message="menuForm.errors.image" class="mt-2" />
                        </div>
                        <div class="d-flex justify-content-end">
                            <button
                                type="button"
                                class="btn btn-secondary btn-sm me-2"
                                data-bs-dismiss="modal"
                            >
                                Tutup
                            </button>
                            <button
                                type="submit"
                                class="btn btn-primary btn-sm"
                                :disabled="menuForm.processing"
                            >
                                {{ menuForm.processing ? 'Menyimpan...' : 'Simpan Menu' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
