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
                                <h4 class="mb-1">
                                    <i class="bi bi-tools me-2 text-primary"></i>Production Panel
                                </h4>
                                <p class="text-muted mb-0">
                                    <i class="bi bi-info-circle me-1"></i>
                                    Buat menu baru, kelola stok produksi, dan tandai menu yang siap dijual ke customer.
                                </p>
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
                        <div class="card-header bg-white border-bottom pt-4 pb-3">
                            <div class="d-flex align-items-start gap-3">
                                <div class="flex-shrink-0">
                                    <div class="bg-primary bg-opacity-10 rounded-circle p-3">
                                        <i class="bi bi-plus-circle text-primary fs-3"></i>
                                    </div>
                                </div>
                                <div class="flex-grow-1">
                                    <h5 class="mb-2 fw-bold">Tambah Menu Produksi Baru</h5>
                                    <div class="alert alert-info mb-0">
                                        <div class="d-flex align-items-start">
                                            <i class="bi bi-info-circle-fill me-2 flex-shrink-0 mt-1"></i>
                                            <div>
                                                <strong>Cara Mengisi Form:</strong>
                                                <ul class="mb-0 mt-1 ps-3">
                                                    <li><strong>Nama Menu:</strong> Tulis nama makanan/minuman yang akan diproduksi</li>
                                                    <li><strong>Kategori:</strong> Jenis menu (Makanan Berat, Minuman, Snack, dll)</li>
                                                    <li><strong>Harga Jual:</strong> Harga yang akan dijual ke customer (dalam Rupiah)</li>
                                                    <li><strong>Stok Awal:</strong> Jumlah porsi yang sudah siap dijual saat ini</li>
                                                    <li><strong>Tag Menu:</strong> Pilih karakteristik menu (Pedas, Manis, Halal, dll) - Tekan Ctrl untuk pilih lebih dari satu</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form class="card-body row g-3" @submit.prevent="submitMenu">
                            <div class="col-md-4">
                                <label for="menuName" class="form-label fw-semibold mb-2">
                                    <i class="bi bi-card-text me-2 text-primary"></i>Nama Menu 
                                    <span class="text-danger">*</span>
                                </label>
                                <input 
                                    id="menuName" 
                                    v-model="menuForm.name" 
                                    class="form-control form-control-lg" 
                                    placeholder="Contoh: Nasi Goreng Spesial" 
                                    required 
                                />
                                <small class="text-muted">Nama menu yang akan ditampilkan ke customer</small>
                            </div>
                            <div class="col-md-3">
                                <label for="menuCategory" class="form-label fw-semibold mb-2">
                                    <i class="bi bi-tag me-2 text-primary"></i>Kategori 
                                    <span class="text-danger">*</span>
                                </label>
                                <input 
                                    id="menuCategory" 
                                    v-model="menuForm.category" 
                                    class="form-control form-control-lg" 
                                    placeholder="Contoh: Makanan Berat" 
                                    required 
                                />
                                <small class="text-muted">Jenis/kategori menu</small>
                            </div>
                            <div class="col-md-2">
                                <label for="menuPrice" class="form-label fw-semibold mb-2">
                                    <i class="bi bi-cash me-2 text-success"></i>Harga Jual (Rp) 
                                    <span class="text-danger">*</span>
                                </label>
                                <input 
                                    id="menuPrice" 
                                    v-model.number="menuForm.price" 
                                    type="number" 
                                    min="0" 
                                    step="1000"
                                    class="form-control form-control-lg" 
                                    placeholder="15000" 
                                    required 
                                />
                                <small class="text-muted">Harga jual ke customer</small>
                            </div>
                            <div class="col-md-3">
                                <label for="menuStock" class="form-label fw-semibold mb-2">
                                    <i class="bi bi-box-seam me-2 text-warning"></i>Stok Awal (Porsi) 
                                    <span class="text-danger">*</span>
                                </label>
                                <input 
                                    id="menuStock" 
                                    v-model.number="menuForm.stock" 
                                    type="number" 
                                    min="0" 
                                    class="form-control form-control-lg" 
                                    placeholder="20" 
                                    required 
                                />
                                <small class="text-muted">Jumlah porsi yang sudah siap</small>
                            </div>
                            <div class="col-md-8">
                                <label for="menuTags" class="form-label fw-semibold mb-2">
                                    <i class="bi bi-tags me-2 text-info"></i>Tag Menu 
                                    <span class="text-danger">*</span>
                                </label>
                                <select id="menuTags" v-model="menuForm.food_tag" class="form-select form-select-lg" multiple required style="min-height: 80px;">
                                    <option v-for="tag in foodTags" :key="tag.id" :value="tag.id">{{ tag.name }}</option>
                                </select>
                                <small class="text-muted">
                                    <i class="bi bi-hand-index me-1"></i>
                                    <strong>Cara memilih:</strong> Tekan dan tahan tombol <kbd>Ctrl</kbd> (Windows) atau <kbd>Cmd</kbd> (Mac), lalu klik beberapa tag
                                </small>
                            </div>
                            <div class="col-md-4 d-grid align-self-end">
                                <button class="btn btn-primary btn-lg" :disabled="menuForm.processing">
                                    <i class="bi bi-plus-lg me-2"></i>
                                    {{ menuForm.processing ? 'Menambah Menu...' : 'Tambah Menu' }}
                                </button>
                            </div>
                            <div v-if="Object.keys(menuForm.errors).length" class="col-12">
                                <div class="alert alert-danger mb-0">
                                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                                    <strong>Error:</strong> {{ Object.values(menuForm.errors)[0] }}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-white border-bottom pt-4 pb-3">
                            <div class="d-flex align-items-start gap-3">
                                <div class="flex-shrink-0">
                                    <div class="bg-success bg-opacity-10 rounded-circle p-3">
                                        <i class="bi bi-list-check text-success fs-3"></i>
                                    </div>
                                </div>
                                <div class="flex-grow-1">
                                    <h5 class="mb-2 fw-bold">Kelola Menu & Stok Produksi</h5>
                                    <div class="alert alert-light border mb-0">
                                        <div class="d-flex align-items-start">
                                            <i class="bi bi-lightbulb-fill me-2 flex-shrink-0 mt-1 text-warning"></i>
                                            <div>
                                                <strong>Panduan Kolom Aksi:</strong>
                                                <ul class="mb-0 mt-1 ps-3 small">
                                                    <li><strong>Jumlah:</strong> Isi angka positif (+) untuk menambah stok, atau negatif (-) untuk mengurangi stok</li>
                                                    <li><strong>Alasan:</strong> Pilih alasan perubahan stok (Produksi = tambah stok baru, Koreksi = perbaikan data, Rusak/Retur = kurangi stok)</li>
                                                    <li><strong>Tombol Update:</strong> Klik untuk menyimpan perubahan stok</li>
                                                    <li><strong>Tombol Siap Jual:</strong> Tandai menu sudah siap untuk dipublish oleh Sales Distribution ke toko online</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body table-responsive">
                            <table class="table align-middle table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th class="fw-semibold">Menu</th>
                                        <th class="fw-semibold">Stock Saat Ini</th>
                                        <th class="fw-semibold">Biaya Produksi</th>
                                        <th class="fw-semibold">Harga Jual</th>
                                        <th class="fw-semibold">Status</th>
                                        <th class="fw-semibold">Mutasi Terakhir</th>
                                        <th class="fw-semibold text-center">Kelola Stok & Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="menu in menus" :key="menu.id">
                                        <td>
                                            <div class="fw-semibold">{{ menu.name }}</div>
                                            <small class="text-muted">{{ menu.category }}</small>
                                        </td>
                                        <td>
                                            <span class="badge bg-primary fs-6">{{ menu.stock }} porsi</span>
                                        </td>
                                        <td>{{ menu.cost ? formatIDR(menu.cost) : '-' }}</td>
                                        <td>{{ formatIDR(menu.price) }}</td>
                                        <td>
                                            <span class="badge" :class="menu.is_published ? 'bg-success' : (menu.workflow_status === 'ready' ? 'bg-info' : 'bg-secondary')">
                                                {{ menu.workflow_status === 'ready' ? '✓ Siap Dijual' : (menu.is_published ? 'Published' : 'Draft') }}
                                            </span>
                                        </td>
                                        <td class="small text-muted">
                                            <template v-if="menu.latest_stock_movement">
                                                <span :class="menu.latest_stock_movement.change > 0 ? 'text-success fw-semibold' : 'text-danger fw-semibold'">
                                                    {{ menu.latest_stock_movement.change > 0 ? '+' : '' }}{{ menu.latest_stock_movement.change }}
                                                </span>
                                                · {{ menu.latest_stock_movement.staff || 'Sistem' }}
                                            </template>
                                            <span v-else>-</span>
                                        </td>
                                        <td>
                                            <div class="d-flex gap-2 flex-wrap justify-content-center align-items-end">
                                                <div style="width: 120px">
                                                    <label :for="`stockAmount_${menu.id}`" class="form-label small mb-1 fw-semibold">
                                                        <i class="bi bi-hash"></i> Jumlah Stok
                                                    </label>
                                                    <input 
                                                        :id="`stockAmount_${menu.id}`" 
                                                        v-model="stockForms[`amount_${menu.id}`]" 
                                                        type="number" 
                                                        class="form-control form-control-sm text-center" 
                                                        placeholder="±10"
                                                        title="Isi angka positif untuk tambah stok, negatif untuk kurangi stok" 
                                                    />
                                                </div>
                                                <div style="width: 140px">
                                                    <label :for="`stockReason_${menu.id}`" class="form-label small mb-1 fw-semibold">
                                                        <i class="bi bi-question-circle"></i> Alasan
                                                    </label>
                                                    <select :id="`stockReason_${menu.id}`" v-model="stockForms[`reason_${menu.id}`]" class="form-select form-select-sm">
                                                        <option value="production">➕ Produksi</option>
                                                        <option value="correction">🔧 Koreksi</option>
                                                        <option value="damaged">❌ Rusak</option>
                                                        <option value="return">🔄 Retur</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <button 
                                                        class="btn btn-primary btn-sm" 
                                                        @click="updateStock(menu.id)" 
                                                        title="Klik untuk menyimpan perubahan stok"
                                                    >
                                                        <i class="bi bi-save me-1"></i>Update Stok
                                                    </button>
                                                </div>
                                                <div>
                                                    <button 
                                                        class="btn btn-sm" 
                                                        :class="menu.workflow_status === 'ready' ? 'btn-warning' : 'btn-success'"
                                                        @click="togglePublish(menu)"
                                                        :title="menu.workflow_status === 'ready' ? 'Batalkan status siap dijual' : 'Tandai menu siap dijual ke customer'"
                                                    >
                                                        <i :class="menu.workflow_status === 'ready' ? 'bi bi-x-circle' : 'bi bi-check-circle'" class="me-1"></i>
                                                        {{ menu.workflow_status === 'ready' ? 'Batalkan' : 'Siap Jual' }}
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="!menus.length">
                                        <td colspan="7" class="text-center text-muted py-4">
                                            <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                                            Belum ada menu. Silakan tambahkan menu baru di form di atas.
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
