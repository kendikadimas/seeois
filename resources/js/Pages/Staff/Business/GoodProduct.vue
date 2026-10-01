<script setup>
import { computed, ref } from 'vue';
import { Head, Link, router, useForm, usePage } from '@inertiajs/vue3';
import StaffLayout from '@/Layouts/StaffLayout.vue';
import Notif from '@/Components/Notif.vue';

const props = defineProps({
    product_list: { type: Array, default: () => [] },
    user_list: { type: Array, default: () => [] },
    cart_count: { type: Number, default: 0 },
    filter: { type: Object, default: () => ({}) },
    notif: { type: Object, default: null },
});

const page = usePage();
const canManage = computed(() => (page.props.auth?.user?.capabilities ?? []).some((item) => item === '*' || item === 'goods.manage'));
const search = ref(props.filter?.product?.keyword ?? '');
const category = ref(props.filter?.product?.category ?? 'created_at');
const order = ref(props.filter?.product?.order ?? 'desc');
const productForm = useForm({ name: '', category: '', pic: '' });

const totalVariants = computed(() => props.product_list.reduce((sum, product) => sum + (product.variant?.length ?? 0), 0));
const totalStock = computed(() => props.product_list.reduce((sum, product) => sum + (product.variant ?? []).reduce((acc, variant) => acc + Number(variant.stock || 0), 0), 0));
const imageUrl = (product) => product.image?.[0]?.image ? `/storage/images/product/${encodeURIComponent(product.image[0].image)}` : null;

function applyFilter() {
    router.post(route('good.product.filter'), { keyword: search.value || null, category: category.value, order: order.value }, { preserveScroll: true });
}

function resetFilter() {
    search.value = '';
    category.value = 'created_at';
    order.value = 'desc';
    applyFilter();
}

function createProduct() {
    productForm.post(route('good.product.add'), {
        preserveScroll: true,
        onSuccess: () => productForm.reset(),
    });
}

function deleteProduct(product) {
    if (!window.confirm(`Hapus produk "${product.name}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    router.post(route('good.product.delete', { id: product.id }), {}, { preserveScroll: true });
}
</script>

<template>
    <Head title="Produk Merchandise" />
    <StaffLayout>
        <template #header>Produk Merchandise</template>
        <div class="container-fluid py-3 py-lg-4">
            <Notif v-if="notif" :notif="notif" />

            <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div><h2 class="fw-bold mb-1">Katalog Merchandise</h2><p class="text-muted mb-0">Kelola produk, varian, stok, dan penanggung jawab dalam satu tempat.</p></div>
                <button v-if="canManage" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newProductModal"><i class="bi bi-plus-lg me-2"></i>Tambah produk</button>
            </div>

            <div class="row g-3 mb-4">
                <div class="col-4"><div class="card border-0 shadow-sm h-100"><div class="card-body"><div class="text-muted small">Produk</div><div class="fs-3 fw-bold">{{ product_list.length }}</div></div></div></div>
                <div class="col-4"><div class="card border-0 shadow-sm h-100"><div class="card-body"><div class="text-muted small">Varian</div><div class="fs-3 fw-bold">{{ totalVariants }}</div></div></div></div>
                <div class="col-4"><div class="card border-0 shadow-sm h-100"><div class="card-body"><div class="text-muted small">Total stok</div><div class="fs-3 fw-bold">{{ totalStock }}</div></div></div></div>
            </div>

            <form class="card border-0 shadow-sm mb-4" @submit.prevent="applyFilter">
                <div class="card-body row g-2 align-items-center">
                    <div class="col-12 col-lg-5"><input v-model="search" type="search" class="form-control" placeholder="Cari nama atau kategori produk..."></div>
                    <div class="col-6 col-lg-2"><select v-model="category" class="form-select"><option value="created_at">Tanggal dibuat</option><option value="name">Nama</option><option value="category">Kategori</option></select></div>
                    <div class="col-6 col-lg-2"><select v-model="order" class="form-select"><option value="desc">Menurun</option><option value="asc">Menaik</option></select></div>
                    <div class="col-7 col-lg-auto"><button class="btn btn-outline-primary w-100"><i class="bi bi-search me-2"></i>Cari</button></div>
                    <div class="col-5 col-lg-auto"><button type="button" class="btn btn-light w-100" @click="resetFilter">Reset</button></div>
                </div>
            </form>

            <div v-if="product_list.length" class="row g-3">
                <div v-for="product in product_list" :key="product.id" class="col-12 col-md-6 col-xl-4">
                    <div class="card border-0 shadow-sm h-100 overflow-hidden">
                        <div class="ratio ratio-16x9 bg-light d-flex align-items-center justify-content-center">
                            <img v-if="imageUrl(product)" :src="imageUrl(product)" :alt="product.name" class="w-100 h-100 object-fit-cover">
                            <div v-else class="d-flex flex-column align-items-center justify-content-center text-muted"><i class="bi bi-box-seam fs-1"></i><span class="small">Belum ada foto</span></div>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <div class="d-flex justify-content-between gap-2"><div><span class="badge text-bg-light mb-2">{{ product.category }}</span><h5 class="mb-1">{{ product.name }}</h5></div><button v-if="canManage" class="btn btn-sm btn-link text-danger align-self-start" title="Hapus produk" @click="deleteProduct(product)"><i class="bi bi-trash"></i></button></div>
                            <div class="text-muted small mb-3">PIC: {{ product.pic?.name ?? 'Belum ditentukan' }}</div>
                            <div class="d-flex gap-3 small mb-3"><span><i class="bi bi-layers me-1"></i>{{ product.variant?.length ?? 0 }} varian</span><span><i class="bi bi-boxes me-1"></i>{{ (product.variant ?? []).reduce((sum, item) => sum + Number(item.stock || 0), 0) }} stok</span></div>
                            <Link :href="route('good.product.detail', { id: product.id })" class="btn btn-outline-primary mt-auto">Lihat & kelola produk</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="card border-0 shadow-sm"><div class="card-body text-center py-5"><i class="bi bi-search fs-1 text-muted"></i><h5 class="mt-3">Produk tidak ditemukan</h5><p class="text-muted">Coba ubah kata kunci atau tambahkan produk baru.</p></div></div>
        </div>

        <div id="newProductModal" class="modal fade" tabindex="-1" aria-hidden="true"><div class="modal-dialog"><form class="modal-content" @submit.prevent="createProduct">
            <div class="modal-header"><h5 class="modal-title">Tambah produk</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
            <div class="modal-body">
                <div class="mb-3"><label class="form-label">Nama produk</label><input v-model="productForm.name" class="form-control" required maxlength="255"><div class="text-danger small">{{ productForm.errors.name }}</div></div>
                <div class="mb-3"><label class="form-label">Kategori</label><input v-model="productForm.category" class="form-control" required maxlength="100" placeholder="Contoh: Pakaian"><div class="text-danger small">{{ productForm.errors.category }}</div></div>
                <div><label class="form-label">Penanggung jawab</label><select v-model="productForm.pic" class="form-select" required><option value="" disabled>Pilih PIC</option><option v-for="user in user_list" :key="user.id" :value="user.id">{{ user.name }}</option></select><div class="text-danger small">{{ productForm.errors.pic }}</div></div>
            </div>
            <div class="modal-footer"><button type="button" class="btn btn-light" data-bs-dismiss="modal">Batal</button><button class="btn btn-primary" :disabled="productForm.processing">{{ productForm.processing ? 'Menyimpan...' : 'Simpan produk' }}</button></div>
        </form></div></div>
    </StaffLayout>
</template>
