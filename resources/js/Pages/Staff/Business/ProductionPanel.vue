<script setup>
import StaffLayout from '@/Layouts/StaffLayout.vue';
import Notif from '@/Components/Notif.vue';
import { Head, router, useForm } from '@inertiajs/vue3';
import { ref, computed, watch } from 'vue';
import { formatIDR } from '@/utils';
import axios from 'axios';

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

// Reactive local food tags to allow instant inline addition
const localFoodTags = ref([...(props.foodTags || [])]);
watch(() => props.foodTags, (newTags) => {
    if (newTags) localFoodTags.value = [...newTags];
}, { deep: true });

// Quick Category suggestions
const categorySuggestions = ['Makanan Berat', 'Minuman Dingin', 'Minuman Hangat', 'Snack & Cemilan', 'Dessert'];

// Quick Tag form state
const showNewTagForm = ref(false);
const newTagName = ref('');
const newTagColor = ref('#2563eb');
const isSubmittingTag = ref(false);
const tagColorOptions = ['#2563eb', '#7c3aed', '#0284c7', '#ea580c', '#dc2626', '#d97706', '#059669', '#ca8a04', '#e11d48'];

function selectCategory(cat) {
    menuForm.category = cat;
}

function toggleTag(tagId) {
    const idx = menuForm.food_tag.indexOf(tagId);
    if (idx > -1) {
        menuForm.food_tag.splice(idx, 1);
    } else {
        menuForm.food_tag.push(tagId);
    }
}

async function submitQuickTag() {
    const trimmed = newTagName.value.trim();
    if (!trimmed) return;

    isSubmittingTag.value = true;
    try {
        const response = await axios.post('/seeo/staff/food/tag/quick-store', {
            name: trimmed,
            color: newTagColor.value,
        }, {
            headers: { 'Accept': 'application/json' }
        });

        if (response.data && response.data.tag) {
            const createdTag = response.data.tag;
            // Check if already in local list
            const existingIdx = localFoodTags.value.findIndex(t => t.id === createdTag.id);
            if (existingIdx === -1) {
                localFoodTags.value.push(createdTag);
            }
            // Auto select newly created tag
            if (!menuForm.food_tag.includes(createdTag.id)) {
                menuForm.food_tag.push(createdTag.id);
            }
            newTagName.value = '';
            showNewTagForm.value = false;
        }
    } catch (err) {
        console.error('Gagal menambahkan tag:', err);
        alert('Gagal menambahkan tag baru. Silakan coba lagi.');
    } finally {
        isSubmittingTag.value = false;
    }
}

const activeMenuCount = computed(() => props.menus.filter((menu) => menu.is_published).length);

function filterStand() {
    router.get(route('staff.production.panel.index'), { stand_id: selectedStandId.value }, { preserveState: true, replace: true });
}

function submitMenu() {
    menuForm.stand_id = selectedStandId.value;
    menuForm.post(route('staff.sales-distribution.menu.store'), {
        preserveScroll: true,
        onSuccess: () => {
            menuForm.reset('name', 'category', 'food_tag', 'price', 'stock');
        },
    });
}

function togglePublish(menu) {
    router.post(route('staff.production.panel.publish', { menu: menu.id }), {}, { preserveScroll: true });
}

function updateStock(menuId) {
    const amount = stockForms.value[`amount_${menuId}`];
    if (!amount || amount === 0) {
        alert('Silakan masukkan jumlah penambahan (+) atau pengurangan (-) stok terlebih dahulu.');
        return;
    }
    const request_id = crypto.randomUUID();
    router.post(route('staff.production.panel.stock.update', { menu: menuId }), {
        amount,
        request_id,
        reason: stockForms.value[`reason_${menuId}`] || 'production',
        notes: stockForms.value[`notes_${menuId}`] || null,
    }, {
        preserveScroll: true,
        onSuccess: () => {
            stockForms.value[`amount_${menuId}`] = '';
        }
    });
}
</script>

<template>
    <Head title="Production Panel" />

    <StaffLayout>
        <div class="container-fluid py-3 py-md-4">
            <Notif v-if="notif" :notif="notif" />

            <div v-if="!stands.length" class="alert alert-warning shadow-2xs rounded-3">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                Anda belum ditugaskan ke stand aktif. Hubungi Operational Officer (COO) untuk menambahkan assignment tim Produksi Anda.
            </div>

            <div class="row g-4">
                <!-- Header Banner -->
                <div class="col-12">
                    <div class="card border-0 shadow-sm rounded-4 bg-white">
                        <div class="card-body p-4 d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center">
                            <div>
                                <h4 class="mb-1 fw-bold text-dark d-flex align-items-center gap-2">
                                    <i class="bi bi-tools text-primary"></i>
                                    <span>Production & Kitchen Panel</span>
                                </h4>
                                <p class="text-secondary mb-0 small">
                                    Kelola resep makanan, pantau porsi siap jual, dan perbarui stok menu harian secara real-time.
                                </p>
                            </div>
                            <div class="d-flex gap-2 align-items-center flex-wrap">
                                <span class="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-3 py-2 fw-semibold">
                                    <i class="bi bi-check-circle-fill me-1"></i> Published: {{ activeMenuCount }} Menu
                                </span>
                                <div class="d-flex align-items-center gap-1 bg-light p-1 ps-2 rounded-pill border">
                                    <i class="bi bi-shop text-muted small"></i>
                                    <select v-model="selectedStandId" class="form-select form-select-sm border-0 bg-transparent fw-medium pe-4" style="min-width: 180px;" @change="filterStand">
                                        <option v-for="stand in stands" :key="stand.id" :value="stand.id">{{ stand.name }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form Tambah Menu Produksi Baru (REDESIGNED) -->
                <div class="col-12" v-if="selectedStandId">
                    <div class="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
                        <div class="card-header bg-white border-bottom p-4">
                            <div class="d-flex align-items-center gap-3">
                                <div class="rounded-circle p-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center" style="width: 52px; height: 52px;">
                                    <i class="bi bi-plus-circle-fill fs-4"></i>
                                </div>
                                <div>
                                    <h5 class="mb-1 fw-bold text-dark">Tambah Menu Baru ke Stand</h5>
                                    <p class="mb-0 text-muted small">Isi data produk makanan/minuman yang akan diproduksi dan dijual ke pelanggan.</p>
                                </div>
                            </div>
                        </div>

                        <form class="card-body p-4" @submit.prevent="submitMenu">
                            <div class="row g-3">
                                <!-- Nama Menu -->
                                <div class="col-12 col-md-6 col-lg-4">
                                    <label for="menuName" class="form-label fw-semibold text-dark mb-1">
                                        <i class="bi bi-card-text text-primary me-1"></i> Nama Menu
                                        <span class="text-danger">*</span>
                                    </label>
                                    <input 
                                        id="menuName" 
                                        v-model="menuForm.name" 
                                        class="form-control rounded-3" 
                                        placeholder="Contoh: Nasi Goreng Spesial" 
                                        required 
                                    />
                                    <div class="form-text text-2xs text-muted">Nama yang akan tampil pada kasir & struk belanja</div>
                                </div>

                                <!-- Kategori Menu -->
                                <div class="col-12 col-md-6 col-lg-4">
                                    <label for="menuCategory" class="form-label fw-semibold text-dark mb-1">
                                        <i class="bi bi-tag-fill text-primary me-1"></i> Kategori
                                        <span class="text-danger">*</span>
                                    </label>
                                    <input 
                                        id="menuCategory" 
                                        v-model="menuForm.category" 
                                        class="form-control rounded-3" 
                                        placeholder="Ketik atau pilih kategori..." 
                                        required 
                                    />
                                    <!-- Quick category chips -->
                                    <div class="d-flex flex-wrap gap-1 mt-1">
                                        <button
                                            v-for="cat in categorySuggestions"
                                            :key="cat"
                                            type="button"
                                            class="btn btn-2xs rounded-pill py-0 px-2"
                                            :class="menuForm.category === cat ? 'btn-primary' : 'btn-outline-secondary'"
                                            @click="selectCategory(cat)"
                                        >
                                            {{ cat }}
                                        </button>
                                    </div>
                                </div>

                                <!-- Harga Jual -->
                                <div class="col-6 col-lg-2">
                                    <label for="menuPrice" class="form-label fw-semibold text-dark mb-1">
                                        <i class="bi bi-cash-stack text-success me-1"></i> Harga Jual
                                        <span class="text-danger">*</span>
                                    </label>
                                    <div class="input-group">
                                        <span class="input-group-text bg-light text-muted small">Rp</span>
                                        <input 
                                            id="menuPrice" 
                                            v-model.number="menuForm.price" 
                                            type="number" 
                                            min="0" 
                                            step="500"
                                            class="form-control" 
                                            placeholder="15000" 
                                            required 
                                        />
                                    </div>
                                    <div class="form-text text-2xs text-muted">Harga ke pembeli</div>
                                </div>

                                <!-- Stok Awal -->
                                <div class="col-6 col-lg-2">
                                    <label for="menuStock" class="form-label fw-semibold text-dark mb-1">
                                        <i class="bi bi-box-seam-fill text-warning me-1"></i> Stok Siap
                                        <span class="text-danger">*</span>
                                    </label>
                                    <div class="input-group">
                                        <input 
                                            id="menuStock" 
                                            v-model.number="menuForm.stock" 
                                            type="number" 
                                            min="0" 
                                            class="form-control" 
                                            placeholder="20" 
                                            required 
                                        />
                                        <span class="input-group-text bg-light text-muted small">Porsi</span>
                                    </div>
                                    <div class="form-text text-2xs text-muted">Porsi awal di dapur</div>
                                </div>

                                <!-- ================= TAG MENU SELECTION (REDESIGNED) ================= -->
                                <div class="col-12 mt-3">
                                    <div class="p-3 rounded-4 bg-light border">
                                        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                                            <div>
                                                <label class="form-label fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                                                    <i class="bi bi-tags-fill text-info"></i>
                                                    <span>Tag Menu (Rasa & Karakteristik)</span>
                                                    <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill text-3xs">
                                                        Terpilih: {{ menuForm.food_tag.length }} Tag
                                                    </span>
                                                </label>
                                                <small class="text-muted d-block mt-1">
                                                    Klik badge di bawah untuk memilih karakteristik menu (bisa pilih lebih dari satu, tanpa tombol Ctrl):
                                                </small>
                                            </div>
                                            <!-- Quick Add Tag Button -->
                                            <button
                                                type="button"
                                                class="btn btn-sm btn-outline-primary rounded-pill px-3 shadow-2xs d-inline-flex align-items-center gap-1"
                                                @click="showNewTagForm = !showNewTagForm"
                                            >
                                                <i :class="showNewTagForm ? 'bi bi-x-lg' : 'bi bi-plus-lg'"></i>
                                                <span>{{ showNewTagForm ? 'Tutup Form Tag' : '+ Tambah Tag Baru' }}</span>
                                            </button>
                                        </div>

                                        <!-- Inline New Tag Creator -->
                                        <div v-if="showNewTagForm" class="p-3 mb-3 bg-white border rounded-3 shadow-2xs transition-all">
                                            <div class="row g-2 align-items-center">
                                                <div class="col-12 col-md-5">
                                                    <label class="form-label small fw-semibold text-secondary mb-1">Nama Tag Rasa / Karakteristik:</label>
                                                    <input
                                                        type="text"
                                                        v-model="newTagName"
                                                        class="form-control form-control-sm rounded-pill px-3"
                                                        placeholder="Contoh: Kopi, Dingin, Extra Pedas, Halal..."
                                                        @keydown.enter.prevent="submitQuickTag"
                                                    />
                                                </div>
                                                <div class="col-12 col-md-4">
                                                    <label class="form-label small fw-semibold text-secondary mb-1">Pilihan Warna Tag:</label>
                                                    <div class="d-flex gap-2 align-items-center flex-wrap">
                                                        <div
                                                            v-for="c in tagColorOptions"
                                                            :key="c"
                                                            class="color-dot rounded-circle cursor-pointer transition-all"
                                                            :style="{ backgroundColor: c, width: '22px', height: '22px', border: newTagColor === c ? '2px solid #000' : '2px solid transparent' }"
                                                            @click="newTagColor = c"
                                                            :title="c"
                                                        ></div>
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-3 d-grid align-self-end">
                                                    <button
                                                        type="button"
                                                        class="btn btn-sm btn-primary rounded-pill fw-medium"
                                                        :disabled="!newTagName.trim() || isSubmittingTag"
                                                        @click="submitQuickTag"
                                                    >
                                                        <span v-if="isSubmittingTag" class="spinner-border spinner-border-sm me-1"></span>
                                                        Simpan & Gunakan
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Clickable Tag Chips -->
                                        <div class="tag-chips-box d-flex flex-wrap gap-2 pt-1">
                                            <div v-if="localFoodTags.length === 0" class="text-muted small py-2">
                                                Belum ada tag menu. Klik <strong>+ Tambah Tag Baru</strong> untuk membuat tag pertama Anda.
                                            </div>
                                            <button
                                                v-for="tag in localFoodTags"
                                                :key="tag.id"
                                                type="button"
                                                class="btn btn-sm rounded-pill tag-chip transition-all d-flex align-items-center gap-1"
                                                :class="menuForm.food_tag.includes(tag.id) ? 'tag-chip-active shadow-sm text-white' : 'bg-white border text-secondary hover-lift'"
                                                :style="menuForm.food_tag.includes(tag.id) ? { backgroundColor: tag.color || '#2563eb', borderColor: tag.color || '#2563eb' } : {}"
                                                @click="toggleTag(tag.id)"
                                            >
                                                <i :class="menuForm.food_tag.includes(tag.id) ? 'bi bi-check-circle-fill' : 'bi bi-plus'"></i>
                                                <span class="fw-medium small">{{ tag.name }}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- Action Buttons -->
                                <div class="col-12 d-flex justify-content-end gap-2 mt-3 pt-2 border-top">
                                    <button 
                                        type="submit" 
                                        class="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm d-flex align-items-center gap-2" 
                                        :disabled="menuForm.processing"
                                    >
                                        <span v-if="menuForm.processing" class="spinner-border spinner-border-sm"></span>
                                        <i v-else class="bi bi-plus-lg"></i>
                                        <span>{{ menuForm.processing ? 'Menyimpan Menu...' : 'Tambah Menu ke Stand' }}</span>
                                    </button>
                                </div>

                                <!-- Error Alert -->
                                <div v-if="Object.keys(menuForm.errors).length" class="col-12">
                                    <div class="alert alert-danger mb-0 rounded-3 small">
                                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                                        <strong>Error:</strong> {{ Object.values(menuForm.errors)[0] }}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Tabel Kelola Menu & Stok Produksi -->
                <div class="col-12">
                    <div class="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
                        <div class="card-header bg-white border-bottom p-4">
                            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="rounded-circle p-3 bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center" style="width: 52px; height: 52px;">
                                        <i class="bi bi-list-check fs-4"></i>
                                    </div>
                                    <div>
                                        <h5 class="mb-1 fw-bold text-dark">Katalog Menu & Stok Siap Jual</h5>
                                        <p class="mb-0 text-muted small">Kelola ketersediaan porsi, biaya produksi (HPP), dan status publikasi menu.</p>
                                    </div>
                                </div>
                                <span class="badge bg-light text-dark border px-3 py-2 rounded-pill">
                                    Total {{ menus.length }} Menu Terdaftar
                                </span>
                            </div>
                        </div>

                        <div class="card-body p-0 table-responsive">
                            <table class="table align-middle table-hover mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th class="ps-4 fw-semibold small text-secondary">Menu</th>
                                        <th class="fw-semibold small text-secondary">Stok Siap</th>
                                        <th class="fw-semibold small text-secondary">HPP (Biaya)</th>
                                        <th class="fw-semibold small text-secondary">Harga Jual</th>
                                        <th class="fw-semibold small text-secondary">Status Kasir</th>
                                        <th class="fw-semibold small text-secondary">Mutasi Terakhir</th>
                                        <th class="text-center fw-semibold small text-secondary pe-4">Aksi Stok & Ketersediaan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="menu in menus" :key="menu.id">
                                        <td class="ps-4">
                                            <div class="fw-bold text-dark">{{ menu.name }}</div>
                                            <span class="badge bg-light text-secondary border small">{{ menu.category }}</span>
                                        </td>
                                        <td>
                                            <span 
                                                class="badge rounded-pill px-3 py-1 fw-bold"
                                                :class="menu.stock <= 5 ? 'bg-danger text-white' : (menu.stock <= 15 ? 'bg-warning text-dark' : 'bg-primary text-white')"
                                            >
                                                {{ menu.stock }} Porsi
                                            </span>
                                        </td>
                                        <td>
                                            <span class="small fw-medium text-secondary">
                                                {{ menu.cost ? formatIDR(menu.cost) : '-' }}
                                            </span>
                                        </td>
                                        <td>
                                            <span class="fw-bold text-success">{{ formatIDR(menu.price) }}</span>
                                        </td>
                                        <td>
                                            <span 
                                                class="badge rounded-pill px-2 py-1" 
                                                :class="menu.is_published ? 'bg-success text-white' : (menu.workflow_status === 'ready' ? 'bg-info text-white' : 'bg-secondary text-white')"
                                            >
                                                {{ menu.is_published ? '✓ Tayang di Kasir' : (menu.workflow_status === 'ready' ? 'Siap Dijual' : 'Draft') }}
                                            </span>
                                        </td>
                                        <td class="small text-muted">
                                            <template v-if="menu.latest_stock_movement">
                                                <span :class="menu.latest_stock_movement.change > 0 ? 'text-success fw-bold' : 'text-danger fw-bold'">
                                                    {{ menu.latest_stock_movement.change > 0 ? '+' : '' }}{{ menu.latest_stock_movement.change }}
                                                </span>
                                                <span class="text-2xs d-block text-muted">{{ menu.latest_stock_movement.staff || 'Sistem' }}</span>
                                            </template>
                                            <span v-else class="text-muted">-</span>
                                        </td>
                                        <td class="pe-4">
                                            <div class="d-flex gap-2 flex-wrap justify-content-center align-items-center">
                                                <!-- Penyesuaian Stok Cepat -->
                                                <div class="input-group input-group-sm" style="width: 140px;">
                                                    <input 
                                                        :id="`stockAmount_${menu.id}`" 
                                                        v-model="stockForms[`amount_${menu.id}`]" 
                                                        type="number" 
                                                        class="form-control text-center" 
                                                        placeholder="± Porsi"
                                                        title="Ketik angka positif untuk menambah stok, negatif untuk mengurangi" 
                                                    />
                                                    <button 
                                                        class="btn btn-primary" 
                                                        type="button"
                                                        @click="updateStock(menu.id)" 
                                                        title="Simpan perubahan stok"
                                                    >
                                                        <i class="bi bi-check-lg"></i>
                                                    </button>
                                                </div>

                                                <!-- Alasan Mutasi -->
                                                <select :id="`stockReason_${menu.id}`" v-model="stockForms[`reason_${menu.id}`]" class="form-select form-select-sm" style="width: 120px;">
                                                    <option value="production">➕ Produksi</option>
                                                    <option value="correction">🔧 Koreksi</option>
                                                    <option value="damaged">❌ Rusak</option>
                                                    <option value="return">🔄 Retur</option>
                                                </select>

                                                <!-- Toggle Publish / Siap Jual -->
                                                <button 
                                                    class="btn btn-sm rounded-pill px-3" 
                                                    :class="menu.is_published ? 'btn-outline-danger' : 'btn-success'"
                                                    @click="togglePublish(menu)"
                                                    :title="menu.is_published ? 'Tarik dari kasir (Sold out)' : 'Aktifkan agar bisa dipesan di kasir'"
                                                >
                                                    <i :class="menu.is_published ? 'bi bi-eye-slash-fill' : 'bi bi-check-circle-fill'" class="me-1"></i>
                                                    {{ menu.is_published ? 'Nonaktifkan' : 'Tayangkan' }}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="!menus.length">
                                        <td colspan="7" class="text-center text-muted py-5">
                                            <i class="bi bi-inbox display-6 d-block mb-2 text-muted opacity-50"></i>
                                            Belum ada menu terdaftar untuk stand ini. Silakan tambahkan menu baru di form di atas.
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

<style scoped>
.text-2xs {
    font-size: 0.75rem;
}
.text-3xs {
    font-size: 0.68rem;
}
.btn-2xs {
    font-size: 0.72rem;
    padding: 0.15rem 0.5rem;
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
.color-dot:hover {
    transform: scale(1.2);
}
.tag-chip {
    border-width: 1.5px;
    padding: 0.35rem 0.85rem;
}
</style>
