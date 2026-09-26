<script setup>
import { computed, ref } from 'vue';
import { Head, router, useForm } from '@inertiajs/vue3';
import StaffLayout from '@/Layouts/StaffLayout.vue';
import Notif from '@/Components/Notif.vue';

const props = defineProps({
    sale_list: { type: Array, default: () => [] },
    capital_list: { type: Array, default: () => [] },
    filter: { type: Object, default: () => ({}) },
    notif: { type: Object, default: null },
});

const activeTab = ref('sales');
const saleFilter = useForm({ keyword: props.filter?.sale?.keyword ?? '', category: props.filter?.sale?.category ?? 'created_at', order: props.filter?.sale?.order ?? 'desc' });
const capitalFilter = useForm({ category: props.filter?.capital?.category ?? 'created_at', order: props.filter?.capital?.order ?? 'desc' });
const capitalForm = useForm({ name: '', price: '', qty: '', unit: '', receipt: null, same_receipt_check: '', receipt_same: '' });
const money = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(value || 0));
const date = (value) => value ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '-';
const totalRevenue = computed(() => props.sale_list.reduce((sum, sale) => sum + Number(sale.transaction || 0), 0));
const totalCapital = computed(() => props.capital_list.reduce((sum, capital) => sum + Number(capital.total_price || 0), 0));
const pendingCapital = computed(() => props.capital_list.filter((capital) => !capital.operational_id).length);

function filterSales() { saleFilter.post(route('good.insight.filter', { filter_name: 'sale' }), { preserveScroll: true }); }
function filterCapital() { capitalFilter.post(route('good.insight.filter', { filter_name: 'capital' }), { preserveScroll: true }); }
function addCapital() { capitalForm.post(route('good.capital.add'), { forceFormData: true, preserveScroll: true, onSuccess: () => capitalForm.reset() }); }
function toggleValidation(capital) { router.post(route('good.capital.validate'), { receipt_id: capital.id }, { preserveScroll: true }); }
function deleteCapital(capital) {
    if (!window.confirm(`Hapus pengeluaran "${capital.name}"?`)) return;
    router.post(route('good.capital.delete', { id: capital.id }), {}, { preserveScroll: true });
}
</script>

<template>
    <Head title="Insight Merchandise" />
    <StaffLayout>
        <template #header>Insight Merchandise</template>
        <div class="container-fluid py-3 py-lg-4">
            <Notif v-if="notif" :notif="notif" />
            <div class="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4"><div><h2 class="fw-bold mb-1">Insight Merchandise</h2><p class="text-muted mb-0">Pantau penjualan dan modal produk secara terpusat.</p></div><button class="btn btn-primary align-self-lg-center" data-bs-toggle="modal" data-bs-target="#newCapitalModal"><i class="bi bi-receipt me-2"></i>Catat pengeluaran</button></div>

            <div class="row g-3 mb-4">
                <div class="col-12 col-md-4"><div class="card border-0 shadow-sm h-100"><div class="card-body"><div class="small text-muted">Omzet penjualan</div><div class="fs-4 fw-bold text-success">{{ money(totalRevenue) }}</div></div></div></div>
                <div class="col-6 col-md-4"><div class="card border-0 shadow-sm h-100"><div class="card-body"><div class="small text-muted">Total modal</div><div class="fs-4 fw-bold text-danger">{{ money(totalCapital) }}</div></div></div></div>
                <div class="col-6 col-md-4"><div class="card border-0 shadow-sm h-100"><div class="card-body"><div class="small text-muted">Menunggu validasi</div><div class="fs-4 fw-bold text-warning">{{ pendingCapital }}</div></div></div></div>
            </div>

            <div class="card border-0 shadow-sm"><div class="card-header bg-white border-0 pt-3"><ul class="nav nav-pills gap-2"><li class="nav-item"><button class="nav-link" :class="{ active: activeTab === 'sales' }" @click="activeTab = 'sales'">Penjualan ({{ sale_list.length }})</button></li><li class="nav-item"><button class="nav-link" :class="{ active: activeTab === 'capital' }" @click="activeTab = 'capital'">Pengeluaran ({{ capital_list.length }})</button></li></ul></div>
                <div class="card-body">
                    <template v-if="activeTab === 'sales'">
                        <form class="row g-2 mb-3" @submit.prevent="filterSales"><div class="col-12 col-md-5"><input v-model="saleFilter.keyword" class="form-control" type="search" placeholder="Cari nama pelanggan..."></div><div class="col-6 col-md-3"><select v-model="saleFilter.category" class="form-select"><option value="created_at">Tanggal</option><option value="customer">Pelanggan</option><option value="transaction">Nominal</option></select></div><div class="col-6 col-md-2"><select v-model="saleFilter.order" class="form-select"><option value="desc">Menurun</option><option value="asc">Menaik</option></select></div><div class="col-md-auto"><button class="btn btn-outline-primary w-100">Terapkan</button></div></form>
                        <div class="table-responsive"><table class="table table-hover align-middle"><thead><tr><th>Tanggal</th><th>Pelanggan</th><th>Pesanan</th><th>Kasir</th><th>Status</th><th class="text-end">Total</th></tr></thead><tbody>
                            <tr v-for="sale in sale_list" :key="sale.id"><td class="text-nowrap">{{ date(sale.created_at) }}</td><td>{{ sale.customer || 'Walk-in' }}</td><td><div v-for="order in sale.order" :key="order.id" class="small">{{ order.amount }}× {{ order.variant?.product?.name }} {{ order.variant?.name }}</div><span v-if="!sale.order?.length" class="text-muted">-</span></td><td>{{ sale.cashier?.name ?? '-' }}</td><td><span class="badge" :class="sale.operational_id ? 'text-bg-success' : 'text-bg-warning'">{{ sale.operational_id ? 'Valid' : 'Menunggu' }}</span></td><td class="text-end fw-semibold">{{ money(sale.transaction) }}</td></tr>
                            <tr v-if="!sale_list.length"><td colspan="6" class="text-center text-muted py-5">Belum ada transaksi penjualan.</td></tr>
                        </tbody></table></div>
                    </template>
                    <template v-else>
                        <form class="row g-2 mb-3" @submit.prevent="filterCapital"><div class="col-6 col-md-3"><select v-model="capitalFilter.category" class="form-select"><option value="created_at">Tanggal</option><option value="name">Nama</option><option value="total_price">Total</option></select></div><div class="col-6 col-md-3"><select v-model="capitalFilter.order" class="form-select"><option value="desc">Menurun</option><option value="asc">Menaik</option></select></div><div class="col-md-auto"><button class="btn btn-outline-primary w-100">Terapkan</button></div></form>
                        <div class="table-responsive"><table class="table table-hover align-middle"><thead><tr><th>Tanggal</th><th>Item</th><th>Jumlah</th><th class="text-end">Total</th><th>Status</th><th class="text-end">Aksi</th></tr></thead><tbody>
                            <tr v-for="capital in capital_list" :key="capital.id"><td class="text-nowrap">{{ date(capital.created_at) }}</td><td><div class="fw-semibold">{{ capital.name }}</div><div class="small text-muted">{{ money(capital.price) }} / {{ capital.unit }}</div></td><td>{{ capital.qty }} {{ capital.unit }}</td><td class="text-end fw-semibold">{{ money(capital.total_price) }}</td><td><span class="badge" :class="capital.operational_id ? 'text-bg-success' : 'text-bg-warning'">{{ capital.operational_id ? 'Valid' : 'Menunggu' }}</span></td><td class="text-end"><button class="btn btn-sm me-1" :class="capital.operational_id ? 'btn-outline-warning' : 'btn-outline-success'" @click="toggleValidation(capital)">{{ capital.operational_id ? 'Batalkan' : 'Validasi' }}</button><button v-if="!capital.operational_id" class="btn btn-sm btn-outline-danger" @click="deleteCapital(capital)"><i class="bi bi-trash"></i></button></td></tr>
                            <tr v-if="!capital_list.length"><td colspan="6" class="text-center text-muted py-5">Belum ada pengeluaran merchandise.</td></tr>
                        </tbody></table></div>
                    </template>
                </div>
            </div>
        </div>

        <div id="newCapitalModal" class="modal fade" tabindex="-1" aria-hidden="true"><div class="modal-dialog"><form class="modal-content" @submit.prevent="addCapital">
            <div class="modal-header"><h5 class="modal-title">Catat pengeluaran</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
            <div class="modal-body">
                <div class="mb-3"><label class="form-label">Nama item</label><input v-model="capitalForm.name" class="form-control" required maxlength="255"><div class="text-danger small">{{ capitalForm.errors.name }}</div></div>
                <div class="row g-2 mb-3"><div class="col-6"><label class="form-label">Harga satuan</label><input v-model="capitalForm.price" type="number" min="1" class="form-control" required></div><div class="col-3"><label class="form-label">Jumlah</label><input v-model="capitalForm.qty" type="number" min="1" class="form-control" required></div><div class="col-3"><label class="form-label">Satuan</label><input v-model="capitalForm.unit" class="form-control" required placeholder="pcs"></div></div>
                <div class="form-check mb-3"><input id="sameReceipt" v-model="capitalForm.same_receipt_check" class="form-check-input" type="checkbox" true-value="on" false-value=""><label class="form-check-label" for="sameReceipt">Gunakan bukti dari pengeluaran lain</label></div>
                <div v-if="capitalForm.same_receipt_check === 'on'"><label class="form-label">Pilih pengeluaran</label><select v-model="capitalForm.receipt_same" class="form-select" required><option value="" disabled>Pilih bukti</option><option v-for="item in capital_list.filter((row) => row.receipt)" :key="item.id" :value="item.id">{{ item.name }} — {{ date(item.created_at) }}</option></select></div>
                <div v-else><label class="form-label">Bukti pembelian</label><input type="file" accept="image/*" class="form-control" required @change="capitalForm.receipt = $event.target.files[0]"></div>
                <div v-for="error in capitalForm.errors" :key="error" class="text-danger small mt-1">{{ error }}</div>
            </div>
            <div class="modal-footer"><button type="button" class="btn btn-light" data-bs-dismiss="modal">Batal</button><button class="btn btn-primary" :disabled="capitalForm.processing">Simpan pengeluaran</button></div>
        </form></div></div>
    </StaffLayout>
</template>
