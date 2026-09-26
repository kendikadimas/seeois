<script setup>
import { computed, ref } from 'vue';
import { useForm } from '@inertiajs/vue3';

const props = defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    balance: { type: Object, default: () => ({}) },
    totalIncome: { type: Number, default: 0 },
    totalExpense: { type: Number, default: 0 },
    income: { type: Array, default: () => [] },
    expense: { type: Array, default: () => [] },
    defaultTab: { type: [Number, String], default: 1 },
    filter: { type: Object, default: () => ({}) },
    incomeFilterRoute: { type: String, required: true },
    expenseFilterRoute: { type: String, required: true },
    withdrawRoute: { type: String, required: true },
});

const activeTab = ref(Number(props.defaultTab) === 2 ? 2 : 1);
const incomeSettings = props.filter.cash_in ?? props.filter.income ?? {};
const expenseSettings = props.filter.cash_out ?? props.filter.expense ?? {};
const incomeFilter = useForm({
    category: incomeSettings.category ?? 'price',
    order: incomeSettings.order ?? 'desc',
});
const expenseFilter = useForm({
    category: expenseSettings.category ?? 'price',
    order: expenseSettings.order ?? 'desc',
});
const withdrawForm = useForm({ name: '', price: '', receipt: null });

const calculatedBalance = computed(() => Number(props.balance?.balance ?? (props.totalIncome - props.totalExpense)));
const money = (value) => new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
}).format(Number(value || 0));
const date = (value) => value ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(value)) : '-';

function detail(item) {
    return item.stand?.name ?? item.program?.name ?? item.capital?.name ?? item.withdraw?.name ?? item.sales?.customer ?? '-';
}

function applyIncomeFilter() {
    incomeFilter.post(props.incomeFilterRoute, { preserveScroll: true });
}

function applyExpenseFilter() {
    expenseFilter.post(props.expenseFilterRoute, { preserveScroll: true });
}

function submitWithdrawal() {
    withdrawForm.post(props.withdrawRoute, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => withdrawForm.reset(),
    });
}
</script>

<template>
    <div class="container-fluid py-3 py-lg-4">
        <div class="d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-center mb-4">
            <div>
                <h2 class="fw-bold mb-1">{{ title }}</h2>
                <p class="text-muted mb-0">{{ subtitle }}</p>
            </div>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#withdrawBalanceModal">
                <i class="bi bi-send me-2"></i>Setor ke Kas SEEO
            </button>
        </div>

        <div class="row g-3 mb-4">
            <div class="col-12 col-md-4">
                <div class="card border-0 shadow-sm h-100"><div class="card-body">
                    <div class="small text-muted">Saldo tercatat</div>
                    <div class="fs-3 fw-bold" :class="calculatedBalance < 0 ? 'text-danger' : 'text-primary'">{{ money(calculatedBalance) }}</div>
                </div></div>
            </div>
            <div class="col-6 col-md-4">
                <div class="card border-0 shadow-sm h-100"><div class="card-body">
                    <div class="small text-muted">Total pemasukan</div>
                    <div class="fs-4 fw-bold text-success">{{ money(totalIncome) }}</div>
                </div></div>
            </div>
            <div class="col-6 col-md-4">
                <div class="card border-0 shadow-sm h-100"><div class="card-body">
                    <div class="small text-muted">Total pengeluaran</div>
                    <div class="fs-4 fw-bold text-danger">{{ money(totalExpense) }}</div>
                </div></div>
            </div>
        </div>

        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-0 pt-3">
                <ul class="nav nav-pills gap-2">
                    <li class="nav-item"><button class="nav-link" :class="{ active: activeTab === 1 }" @click="activeTab = 1">Pemasukan ({{ income.length }})</button></li>
                    <li class="nav-item"><button class="nav-link" :class="{ active: activeTab === 2 }" @click="activeTab = 2">Pengeluaran ({{ expense.length }})</button></li>
                </ul>
            </div>
            <div class="card-body">
                <form v-if="activeTab === 1" class="row g-2 mb-3" @submit.prevent="applyIncomeFilter">
                    <div class="col-6 col-md-3">
                        <select v-model="incomeFilter.category" class="form-select" aria-label="Urutkan pemasukan">
                            <option value="created_at">Tanggal</option><option value="price">Nominal</option><option value="category">Kategori</option>
                        </select>
                    </div>
                    <div class="col-6 col-md-3">
                        <select v-model="incomeFilter.order" class="form-select"><option value="desc">Terbaru / terbesar</option><option value="asc">Terlama / terkecil</option></select>
                    </div>
                    <div class="col-md-auto"><button class="btn btn-outline-primary w-100" :disabled="incomeFilter.processing">Terapkan</button></div>
                </form>
                <form v-else class="row g-2 mb-3" @submit.prevent="applyExpenseFilter">
                    <div class="col-6 col-md-3">
                        <select v-model="expenseFilter.category" class="form-select" aria-label="Urutkan pengeluaran">
                            <option value="created_at">Tanggal</option><option value="price">Nominal</option><option value="category">Kategori</option>
                        </select>
                    </div>
                    <div class="col-6 col-md-3">
                        <select v-model="expenseFilter.order" class="form-select"><option value="desc">Terbaru / terbesar</option><option value="asc">Terlama / terkecil</option></select>
                    </div>
                    <div class="col-md-auto"><button class="btn btn-outline-primary w-100" :disabled="expenseFilter.processing">Terapkan</button></div>
                </form>

                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead><tr><th>Tanggal</th><th>Kategori</th><th>Keterangan</th><th class="text-end">Nominal</th></tr></thead>
                        <tbody>
                            <tr v-for="item in (activeTab === 1 ? income : expense)" :key="`${activeTab}-${item.id}`">
                                <td class="text-nowrap">{{ date(item.created_at) }}</td>
                                <td><span class="badge text-bg-light text-capitalize">{{ item.category?.replaceAll('_', ' ') }}</span></td>
                                <td>{{ detail(item) }}</td>
                                <td class="text-end fw-semibold" :class="activeTab === 1 ? 'text-success' : 'text-danger'">{{ money(item.price) }}</td>
                            </tr>
                            <tr v-if="!(activeTab === 1 ? income : expense).length"><td colspan="4" class="text-center text-muted py-5">Belum ada transaksi pada bagian ini.</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div id="withdrawBalanceModal" class="modal fade" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog"><form class="modal-content" @submit.prevent="submitWithdrawal">
                <div class="modal-header"><h5 class="modal-title">Setor saldo ke kas SEEO</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
                <div class="modal-body">
                    <div class="alert alert-info small">Transaksi akan tercatat sebagai pengeluaran dan menunggu validasi Financial Officer.</div>
                    <div class="mb-3"><label class="form-label">Keterangan</label><input v-model="withdrawForm.name" class="form-control" required maxlength="255"><div class="text-danger small">{{ withdrawForm.errors.name }}</div></div>
                    <div class="mb-3"><label class="form-label">Nominal</label><input v-model="withdrawForm.price" type="number" min="1" class="form-control" required><div class="text-danger small">{{ withdrawForm.errors.price }}</div></div>
                    <div><label class="form-label">Bukti transfer</label><input type="file" accept="image/*" class="form-control" required @change="withdrawForm.receipt = $event.target.files[0]"><div class="text-danger small">{{ withdrawForm.errors.receipt }}</div></div>
                </div>
                <div class="modal-footer"><button type="button" class="btn btn-light" data-bs-dismiss="modal">Batal</button><button class="btn btn-primary" :disabled="withdrawForm.processing">{{ withdrawForm.processing ? 'Mengirim...' : 'Kirim setoran' }}</button></div>
            </form></div>
        </div>
    </div>
</template>
