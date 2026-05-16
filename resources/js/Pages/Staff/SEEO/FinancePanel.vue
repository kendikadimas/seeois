<template>
    <StaffLayout>
        <template #header>Finance Monitoring Panel</template>

        <div class="container-fluid p-4">
            <div class="row g-3 mb-4">
                <div class="col-md-3">
                    <div class="card shadow-sm p-3 border-0 bg-white">
                        <div class="text-muted small mb-1">Pending Contribution</div>
                        <div class="fs-3 fw-bold text-primary">{{ pendingContributionReceipts.length }}</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card shadow-sm p-3 border-0 bg-white">
                        <div class="text-muted small mb-1">Pending Expense</div>
                        <div class="fs-3 fw-bold text-primary">{{ pendingExpenseItems.length }}</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card shadow-sm p-3 border-0 bg-white">
                        <div class="text-muted small mb-1">Pending Disbursement</div>
                        <div class="fs-3 fw-bold text-primary">{{ pendingDisbursementItems.length }}</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card shadow-sm p-3 border-0 bg-white">
                        <div class="text-muted small mb-1">Pending Letters</div>
                        <div class="fs-3 fw-bold text-primary">{{ pendingDisbursementLetters.length }}</div>
                    </div>
                </div>
            </div>

            <!-- Contribution Receipts -->
            <div class="card shadow-sm mb-4 border-0">
                <div class="card-header bg-white fw-bold d-flex justify-content-between align-items-center py-3">
                    <span>Pending Contribution Receipts</span>
                    <span class="badge bg-primary rounded-pill">{{ pendingContributionReceipts.length }}</span>
                </div>
                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>Employee</th>
                                <th>Months</th>
                                <th>Waktu</th>
                                <th class="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in pendingContributionReceipts" :key="item.id">
                                <td>
                                    <div class="fw-medium">{{ item.contribution?.employee?.name || '-' }}</div>
                                    <div class="small text-muted">{{ item.contribution?.employee?.role_name }}</div>
                                </td>
                                <td><span class="badge bg-info-subtle text-info px-2">{{ item.months }} Bulan</span></td>
                                <td class="small text-muted">{{ new Date(item.created_at).toLocaleString('id-ID') }}</td>
                                <td class="text-center">
                                    <div class="d-flex justify-content-center gap-2">
                                        <button @click="previewDoc(`/storage/images/receipt/contribution/${item.receipt}`, `/contribution/validation/${item.id}`, 'Validasi bukti iuran ini?')" class="btn btn-sm btn-light" title="Preview">
                                            <i class="bi bi-eye text-primary"></i>
                                        </button>
                                        <button @click="validateDoc(`/contribution/validation/${item.id}`, 'Validasi bukti iuran ini?')" class="btn btn-sm btn-light" title="Validate">
                                            <i class="bi bi-check-circle text-success"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="pendingContributionReceipts.length === 0">
                                <td colspan="4" class="text-center py-4 text-muted small">Tidak ada data pending.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Expense Items -->
            <div class="card shadow-sm mb-4 border-0">
                <div class="card-header bg-white fw-bold d-flex justify-content-between align-items-center py-3">
                    <span>Pending Expense Items (Belanja)</span>
                    <span class="badge bg-primary rounded-pill">{{ pendingExpenseItems.length }}</span>
                </div>
                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>Program</th>
                                <th>Item Name</th>
                                <th>Total</th>
                                <th class="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in pendingExpenseItems" :key="item.id">
                                <td>
                                    <div class="fw-medium">{{ item.program?.name || '-' }}</div>
                                    <div class="small text-muted">{{ item.program?.department?.name }}</div>
                                </td>
                                <td>{{ item.name }}</td>
                                <td class="fw-bold">Rp {{ item.total_price?.toLocaleString('id-ID') }}</td>
                                <td class="text-center">
                                    <div class="d-flex justify-content-center gap-2">
                                        <button @click="previewDoc(`/storage/images/receipt/expense/${item.receipt}`, `/program/expense/validate/${item.id}`, 'Validasi bukti belanja ini?')" class="btn btn-sm btn-light" title="Preview">
                                            <i class="bi bi-eye text-primary"></i>
                                        </button>
                                        <button @click="validateDoc(`/program/expense/validate/${item.id}`, 'Validasi bukti belanja ini?')" class="btn btn-sm btn-light" title="Validate">
                                            <i class="bi bi-check-circle text-success"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="pendingExpenseItems.length === 0">
                                <td colspan="4" class="text-center py-4 text-muted small">Tidak ada data pending.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Disbursement Items -->
            <div class="card shadow-sm mb-4 border-0">
                <div class="card-header bg-white fw-bold d-flex justify-content-between align-items-center py-3">
                    <span>Pending Disbursement Items (Pencairan)</span>
                    <span class="badge bg-primary rounded-pill">{{ pendingDisbursementItems.length }}</span>
                </div>
                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>Program</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th class="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in pendingDisbursementItems" :key="item.id">
                                <td>{{ item.program?.name || '-' }}</td>
                                <td>{{ item.name }}</td>
                                <td class="fw-bold">Rp {{ item.price?.toLocaleString('id-ID') }}</td>
                                <td class="text-center">
                                    <button @click="previewDoc(`/storage/images/receipt/disbursement/${item.reciept}`)" class="btn btn-sm btn-light" title="Preview">
                                        <i class="bi bi-eye text-primary"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="pendingDisbursementItems.length === 0">
                                <td colspan="4" class="text-center py-4 text-muted small">Tidak ada data pending.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Disbursement Letters -->
            <div class="card shadow-sm border-0">
                <div class="card-header bg-white fw-bold d-flex justify-content-between align-items-center py-3">
                    <span>Pending Disbursement Letters (Surat Pencairan)</span>
                    <span class="badge bg-primary rounded-pill">{{ pendingDisbursementLetters.length }}</span>
                </div>
                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>Program</th>
                                <th>PIC</th>
                                <th>Waktu</th>
                                <th class="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in pendingDisbursementLetters" :key="item.id">
                                <td>
                                    <div class="fw-medium text-truncate" style="max-width: 250px;">{{ item.program?.name || '-' }}</div>
                                    <div class="small text-muted">{{ item.program?.department?.name }}</div>
                                </td>
                                <td>{{ item.program?.pic?.name }}</td>
                                <td class="small text-muted">{{ new Date(item.created_at).toLocaleString('id-ID') }}</td>
                                <td class="text-center">
                                    <div class="d-flex justify-content-center gap-2">
                                        <button @click="previewDoc(`/storage/document/letter/disbursement/${item.letter}`)" class="btn btn-sm btn-light" title="Preview PDF">
                                            <i class="bi bi-file-earmark-pdf text-danger"></i>
                                        </button>
                                        <Link :href="`/seeo/staff/program/${item.program_id}`" class="btn btn-sm btn-light" title="Proses Pencairan">
                                            <i class="bi bi-plus-circle text-success"></i>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="pendingDisbursementLetters.length === 0">
                                <td colspan="4" class="text-center py-4 text-muted small">Tidak ada surat pending.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal Confirmation -->
        <ModalConfirmation ref="modalConfirmationRef" />

        <!-- Preview Modal -->
        <div class="modal fade" id="previewModal" tabindex="-1" aria-hidden="true" ref="previewModalRef">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title fw-bold">Document Preview</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-0 bg-secondary bg-opacity-10 d-flex justify-content-center align-items-center" style="min-height: 400px; max-height: 85vh; overflow: auto;">
                        <template v-if="previewUrl">
                            <img v-if="isImage(previewUrl)" :src="previewUrl" class="img-fluid shadow-sm" alt="Preview">
                            <iframe v-else :src="previewUrl" class="w-100" style="height: 75vh;" frameborder="0"></iframe>
                        </template>
                        <div v-else class="text-muted">Loading...</div>
                    </div>
                    <div class="modal-footer bg-light py-2">
                        <button type="button" class="btn btn-secondary btn-sm px-4" data-bs-dismiss="modal">Tutup</button>
                        <a :href="previewUrl" target="_blank" class="btn btn-outline-primary btn-sm px-4">
                            <i class="bi bi-box-arrow-up-right me-1"></i> Tab Baru
                        </a>
                        <button v-if="currentValidateRoute" @click="confirmFromPreview" class="btn btn-success btn-sm px-4">
                            <i class="bi bi-check-circle me-1"></i> Validasi Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </StaffLayout>
</template>

<script setup>
import StaffLayout from '@/Layouts/StaffLayout.vue';
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import { Link } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';

defineProps({
    pendingContributionReceipts: { type: Array, default: () => [] },
    pendingExpenseItems: { type: Array, default: () => [] },
    pendingDisbursementItems: { type: Array, default: () => [] },
    pendingDisbursementLetters: { type: Array, default: () => [] },
});

const modalConfirmationRef = ref(null);
const previewModalRef = ref(null);
const previewUrl = ref(null);
const currentValidateRoute = ref(null);
const currentValidateMessage = ref(null);
let bootstrapModal = null;

onMounted(() => {
    if (typeof window.bootstrap !== 'undefined') {
        bootstrapModal = new window.bootstrap.Modal(previewModalRef.value);
    }
});

function isImage(url) {
    if (!url) return false;
    const ext = url.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png', 'webp', 'heic'].includes(ext);
}

function previewDoc(url, validateRoute = null, validateMessage = null) {
    previewUrl.value = url;
    currentValidateRoute.value = validateRoute;
    currentValidateMessage.value = validateMessage;
    if (bootstrapModal) {
        bootstrapModal.show();
    } else {
        window.open(url, '_blank');
    }
}

function confirmFromPreview() {
    if (bootstrapModal) bootstrapModal.hide();
    validateDoc(currentValidateRoute.value, currentValidateMessage.value);
}

function validateDoc(routeUrl, message) {
    modalConfirmationRef.value.showModal(routeUrl, message);
}
</script>

<style scoped>
.card {
    transition: transform 0.2s ease;
}
.btn-light:hover {
    background-color: #f1f5f9;
}
</style>
