<script setup>
import StaffLayout from '@/Layouts/StaffLayout.vue';
import Notif from '@/Components/Notif.vue';
import { Head, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { formatIDR } from '@/utils';

// Manual route helper to avoid Ziggy resolution issues
const route = (name, params = {}) => {
    const routes = {
        'staff.production.panel.index': '/staff/production/panel',
        'staff.production.panel.stock.update': '/staff/production/panel/menu/{menu}/stock',
        'staff.production.panel.publish': '/staff/production/panel/menu/{menu}/publish',
    };
    if (routes[name]) {
        let url = routes[name];
        if (params && typeof params === 'object') {
            for (const key in params) {
                url = url.replace(`{${key}}`, params[key]);
            }
        } else if (params) {
            // Handle single param as {menu}
            url = url.replace(/\{[a-z]+\}/, params);
        }
        return url;
    }
    console.warn(`Route "${name}" not found in ProductionPanel helper.`);
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
    menus: {
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

const activeMenuCount = computed(() => props.menus.filter((menu) => menu.is_published).length);

function filterStand() {
    router.get('/staff/production/panel', { stand_id: selectedStandId.value }, { preserveState: true, replace: true });
}

function togglePublish(menu) {
    router.post(`/staff/production/panel/menu/${menu.id}/publish`, {}, { preserveScroll: true });
}

function updateStock(menuId) {
    const amount = stockForms.value[`amount_${menuId}`];
    router.post(`/staff/production/panel/menu/${menuId}/stock`, { amount }, { preserveScroll: true });
}
</script>

<template>
    <Head title="Production Panel" />

    <StaffLayout>
        <div class="container-fluid py-4">
            <Notif v-if="notif" :notif="notif" />

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
                                                {{ menu.is_published ? 'Published' : 'Draft' }}
                                            </span>
                                        </td>
                                        <td>
                                            <div class="d-flex gap-2 flex-wrap justify-content-end">
                                                <input v-model="stockForms[`amount_${menu.id}`]" type="number" class="form-control form-control-sm" style="width: 110px" placeholder="stock" />
                                                <button class="btn btn-outline-primary btn-sm" @click="updateStock(menu.id)">Update</button>
                                                <button class="btn btn-outline-success btn-sm" @click="togglePublish(menu)">
                                                    {{ menu.is_published ? 'Unpublish' : 'Publish' }}
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
