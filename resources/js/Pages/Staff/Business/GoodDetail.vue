<script setup>
import { reactive } from 'vue';
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import StaffLayout from '@/Layouts/StaffLayout.vue';
import Notif from '@/Components/Notif.vue';

const props = defineProps({
    product: { type: Object, required: true },
    cart_count: { type: Number, default: 0 },
    can_manage: { type: Boolean, default: false },
    notif: { type: Object, default: null },
});

const variantForm = useForm({ name: '', price: '', stock: 0, description: '' });
const imageForm = useForm({ image: null, note: '' });
const stockChanges = reactive({});
const descriptions = reactive(Object.fromEntries((props.product.variant ?? []).map((variant) => [variant.id, variant.description ?? ''])));
const money = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(value || 0));
const imageUrl = (image) => `/storage/images/product/${encodeURIComponent(image.image)}`;

function addVariant() {
    variantForm.post(route('good.product.variant.add', { id: props.product.id }), { preserveScroll: true, onSuccess: () => variantForm.reset() });
}

function addImage() {
    imageForm.post(route('good.product.image.add', { id: props.product.id }), { forceFormData: true, preserveScroll: true, onSuccess: () => imageForm.reset() });
}

function updateStock(variant) {
    router.post(route('good.product.stock.update', { id: variant.id }), { update_stock: Number(stockChanges[variant.id] || 0) }, { preserveScroll: true, onSuccess: () => { stockChanges[variant.id] = ''; } });
}

function updateDescription(variant) {
    router.post(route('good.product.description.update', { id: variant.id }), { update_description: descriptions[variant.id] }, { preserveScroll: true });
}

function deleteImage(image) {
    if (!window.confirm('Hapus foto produk ini?')) return;
    router.delete(route('good.product.image.delete', { id: image.id }), { preserveScroll: true });
}

function toggleStatus() {
    router.post(route('good.product.transaction.status', { id: props.product.id }), {}, { preserveScroll: true });
}
</script>

<template>
    <Head :title="product.name" />
    <StaffLayout>
        <template #header>Detail Produk</template>
        <div class="container-fluid py-3 py-lg-4">
            <Notif v-if="notif" :notif="notif" />
            <div class="mb-3"><Link :href="route('good.product')" class="text-decoration-none"><i class="bi bi-arrow-left me-2"></i>Kembali ke katalog</Link></div>

            <div class="card border-0 shadow-sm mb-4"><div class="card-body d-flex flex-column flex-lg-row justify-content-between gap-3">
                <div><span class="badge text-bg-light mb-2">{{ product.category }}</span><h2 class="fw-bold mb-1">{{ product.name }}</h2><p class="text-muted mb-0">PIC: {{ product.pic?.name ?? 'Belum ditentukan' }} · {{ product.variant?.length ?? 0 }} varian</p></div>
                <div v-if="can_manage" class="align-self-lg-center"><button class="btn" :class="product.operational_id ? 'btn-outline-danger' : 'btn-outline-success'" @click="toggleStatus"><i class="bi me-2" :class="product.operational_id ? 'bi-pause-circle' : 'bi-play-circle'"></i>{{ product.operational_id ? 'Tutup transaksi' : 'Buka transaksi' }}</button></div>
            </div></div>

            <div class="row g-4">
                <div class="col-12 col-xl-4">
                    <div class="card border-0 shadow-sm mb-4"><div class="card-header bg-white border-0 pt-3 d-flex justify-content-between"><h5 class="mb-0">Foto produk</h5><span class="badge text-bg-light">{{ product.image?.length ?? 0 }}</span></div><div class="card-body">
                        <div v-if="product.image?.length" class="row g-2">
                            <div v-for="image in product.image" :key="image.id" class="col-6"><div class="position-relative"><img :src="imageUrl(image)" :alt="image.note || product.name" class="img-fluid rounded border ratio ratio-1x1 object-fit-cover"><button v-if="can_manage" class="btn btn-danger btn-sm position-absolute top-0 end-0 m-1" @click="deleteImage(image)"><i class="bi bi-trash"></i></button></div><div class="small text-muted mt-1 text-truncate">{{ image.note || 'Tanpa catatan' }}</div></div>
                        </div>
                        <div v-else class="text-center text-muted py-4"><i class="bi bi-images fs-1"></i><p class="mb-0 mt-2">Belum ada foto produk.</p></div>
                        <form v-if="can_manage" class="border-top mt-3 pt-3" @submit.prevent="addImage"><label class="form-label fw-semibold">Tambah foto persegi</label><input type="file" accept="image/*" class="form-control mb-2" required @change="imageForm.image = $event.target.files[0]"><input v-model="imageForm.note" class="form-control mb-2" maxlength="255" placeholder="Catatan foto (opsional)"><div v-for="error in imageForm.errors" :key="error" class="text-danger small">{{ error }}</div><button class="btn btn-outline-primary w-100 mt-2" :disabled="imageForm.processing">Unggah foto</button></form>
                    </div></div>
                </div>

                <div class="col-12 col-xl-8">
                    <div class="d-flex justify-content-between align-items-center mb-3"><h4 class="mb-0">Varian produk</h4><button v-if="can_manage" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#newVariantModal"><i class="bi bi-plus-lg me-1"></i>Tambah varian</button></div>
                    <div v-if="product.variant?.length" class="d-grid gap-3">
                        <div v-for="variant in product.variant" :key="variant.id" class="card border-0 shadow-sm"><div class="card-body">
                            <div class="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3"><div><h5 class="mb-1">{{ variant.name }}</h5><div class="text-muted">{{ money(variant.price) }} · Terjual {{ variant.sale ?? 0 }}</div></div><span class="badge align-self-start fs-6" :class="Number(variant.stock) > 0 ? 'text-bg-success' : 'text-bg-danger'">Stok {{ variant.stock }}</span></div>
                            <template v-if="can_manage">
                                <form class="input-group mb-3" @submit.prevent="updateStock(variant)"><span class="input-group-text">Perubahan stok</span><input v-model="stockChanges[variant.id]" type="number" class="form-control" required placeholder="Contoh: 5 atau -2"><button class="btn btn-outline-primary">Simpan</button></form>
                                <form @submit.prevent="updateDescription(variant)"><label class="form-label small fw-semibold">Deskripsi</label><textarea v-model="descriptions[variant.id]" class="form-control" rows="2" required maxlength="2000"></textarea><button class="btn btn-sm btn-outline-secondary mt-2">Perbarui deskripsi</button></form>
                            </template>
                            <p v-else class="mb-0">{{ variant.description || 'Belum ada deskripsi.' }}</p>
                        </div></div>
                    </div>
                    <div v-else class="card border-0 shadow-sm"><div class="card-body text-center py-5 text-muted"><i class="bi bi-layers fs-1"></i><h5 class="mt-3">Belum ada varian</h5><p class="mb-0">Tambahkan varian agar stok dan harga produk dapat dikelola.</p></div></div>
                </div>
            </div>
        </div>

        <div id="newVariantModal" class="modal fade" tabindex="-1" aria-hidden="true"><div class="modal-dialog"><form class="modal-content" @submit.prevent="addVariant">
            <div class="modal-header"><h5 class="modal-title">Tambah varian</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
            <div class="modal-body">
                <div class="mb-3"><label class="form-label">Nama varian</label><input v-model="variantForm.name" class="form-control" required maxlength="255"><div class="text-danger small">{{ variantForm.errors.name }}</div></div>
                <div class="row g-2 mb-3"><div class="col-6"><label class="form-label">Harga</label><input v-model="variantForm.price" type="number" min="0" class="form-control" required><div class="text-danger small">{{ variantForm.errors.price }}</div></div><div class="col-6"><label class="form-label">Stok awal</label><input v-model="variantForm.stock" type="number" min="0" class="form-control" required><div class="text-danger small">{{ variantForm.errors.stock }}</div></div></div>
                <div><label class="form-label">Deskripsi</label><textarea v-model="variantForm.description" class="form-control" rows="3" required maxlength="2000"></textarea><div class="text-danger small">{{ variantForm.errors.description }}</div></div>
            </div>
            <div class="modal-footer"><button type="button" class="btn btn-light" data-bs-dismiss="modal">Batal</button><button class="btn btn-primary" :disabled="variantForm.processing">Simpan varian</button></div>
        </form></div></div>
    </StaffLayout>
</template>
