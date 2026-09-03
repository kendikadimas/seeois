<script setup>
import StaffLayout from '@/Layouts/StaffLayout.vue';
import Notif from '@/Components/Notif.vue';
import { Head, router, useForm } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { formatIDR } from '@/utils';

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
    menus: {
        type: Array,
        default: () => [],
    },
    foodTags: {
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

const selectedStandId = ref(props.selectedStand?.id ?? props.stands?.[0]?.id ?? null);
const stockForms = ref({});
const menuForm = useForm({
    stand_id: selectedStandId.value,
    name: '',
    category: '',
    food_tag: [],
    price: 0,
    stock: 0,
});

const activeMenuCount = computed(() => props.menus.filter((menu) => menu.is_published).length);

function filterStand() {
    router.get(route('staff.production.panel.index'), { stand_id: selectedStandId.value }, { preserveState: true, replace: true });
}

function submitMenu() {
    menuForm.stand_id = selectedStandId.value;
    menuForm.post(route('staff.sales-distribution.menu.store'), {
        preserveScroll: true,
        onSuccess: () => menuForm.reset('name', 'category', 'food_tag', 'price', 'stock'),
    });
}

function togglePublish(menu) {
    router.post(route('staff.production.panel.publish', { menu: menu.id }), {}, { preserveScroll: true });
}

function updateStock(menuId) {
    const amount = stockForms.value[`amount_${menuId}`];
    const request_id = crypto.randomUUID();
    router.post(route('staff.production.panel.stock.update', { menu: menuId }), {
        amount,
        request_id,
        reason: stockForms.value[`reason_${menuId}`] || 'production',
        notes: stockForms.value[`notes_${menuId}`] || null,
    }, { preserveScroll: true });
}
</script>

<template>
    <Head title="Production Panel" />

    <StaffLayout>
        <div class="container-fluid py-4">
            <Notif v-if="notif" :notif="notif" />

            <div v-if="!stands.length" class="alert alert-warning">
                Anda belum ditugaskan ke stand aktif. Hubungi Operational Officer untuk menambahkan assignment Production.
            </div>

            <div class="row g-4">
                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center">
                            <div>
                                <h4 class="mb-1">Production Panel</h4>
                                <p class="text-muted mb-0">Kelola publish shop dan stock menu sebelum distribusi ke customer.</p>
                            </div>
                            <div class="d-flex gap-2 align-items-center">
                                <span class="badge bg-primary">Published {{ activeMenuCount }}</span>
                                <select v-model="selectedStandId" class="form-select" style="min-width: 220px" @change="filterStand">
                                    <option v-for="stand in stands" :key="stand.id" :value="stand.id">{{ stand.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12" v-if="selectedStandId">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-transparent border-0 pt-4"><h5 class="mb-0">Tambah Menu Produksi</h5></div>
                        <form class="card-body row g-3" @submit.prevent="submitMenu">
                            <div class="col-md-4"><input v-model="menuForm.name" class="form-control" placeholder="Nama menu" required /></div>
                            <div class="col-md-3"><input v-model="menuForm.category" class="form-control" placeholder="Kategori" required /></div>
                            <div class="col-md-2"><input v-model.number="menuForm.price" type="number" min="0" class="form-control" placeholder="Harga" required /></div>
                            <div class="col-md-2"><input v-model.number="menuForm.stock" type="number" min="0" class="form-control" placeholder="Stok awal" required /></div>
                            <div class="col-md-4">
                                <select v-model="menuForm.food_tag" class="form-select" multiple required>
                                    <option v-for="tag in foodTags" :key="tag.id" :value="tag.id">{{ tag.name }}</option>
                                </select>
                            </div>
                            <div class="col-md-2 d-grid"><button class="btn btn-primary" :disabled="menuForm.processing">Tambah Menu</button></div>
                            <div v-if="Object.keys(menuForm.errors).length" class="col-12 text-danger small">{{ Object.values(menuForm.errors)[0] }}</div>
                        </form>
                    </div>
                </div>

                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-transparent border-0 pt-4 pb-0">
                            <h5 class="mb-0">Menu & Stock</h5>
                        </div>
                        <div class="card-body table-responsive">
                            <table class="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Menu</th>
                                        <th>Stock</th>
                                        <th>Biaya Produksi</th>
                                        <th>Harga Jual</th>
                                        <th>Status</th>
                                        <th>Mutasi Terakhir</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="menu in menus" :key="menu.id">
                                        <td>{{ menu.name }}</td>
                                        <td>{{ menu.stock }}</td>
                                        <td>{{ menu.cost ? formatIDR(menu.cost) : '-' }}</td>
                                        <td>{{ formatIDR(menu.price) }}</td>
                                        <td>
                                            <span class="badge" :class="menu.is_published ? 'bg-success' : 'bg-secondary'">
                                                {{ menu.workflow_status === 'ready' ? 'Siap Dijual' : (menu.is_published ? 'Published' : 'Draft') }}
                                            </span>
                                        </td>
                                        <td class="small text-muted">
                                            <template v-if="menu.latest_stock_movement">
                                                <span :class="menu.latest_stock_movement.change > 0 ? 'text-success' : 'text-danger'">
                                                    {{ menu.latest_stock_movement.change > 0 ? '+' : '' }}{{ menu.latest_stock_movement.change }}
                                                </span>
                                                · {{ menu.latest_stock_movement.staff || 'Sistem' }}
                                            </template>
                                            <span v-else>-</span>
                                        </td>
                                        <td>
                                            <div class="d-flex gap-2 flex-wrap justify-content-end">
                                                <input v-model="stockForms[`amount_${menu.id}`]" type="number" class="form-control form-control-sm" style="width: 110px" placeholder="stock" />
                                                <select v-model="stockForms[`reason_${menu.id}`]" class="form-select form-select-sm" style="width: 130px">
                                                    <option value="production">Produksi</option><option value="correction">Koreksi</option><option value="damaged">Rusak</option><option value="return">Retur</option>
                                                </select>
                                                <button class="btn btn-outline-primary btn-sm" @click="updateStock(menu.id)">Update</button>
                                                <button class="btn btn-outline-success btn-sm" @click="togglePublish(menu)">
                                                    {{ menu.workflow_status === 'ready' ? 'Batalkan Siap' : 'Tandai Siap' }}
                                                </button>
                                            </div>
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
</template>
