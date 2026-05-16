<template>
    <StaffLayout>
        <template #header>IWP Receipt Panel</template>

        <div class="container-fluid p-4">
            <!-- Search and Filter Bar -->
            <div class="row mb-4">
                <div class="col-md-6 col-lg-4">
                    <div class="input-group shadow-sm rounded-lg overflow-hidden border-0">
                        <span class="input-group-text bg-white border-0 ps-3">
                            <i class="bi bi-search text-muted"></i>
                        </span>
                        <input 
                            type="text" 
                            v-model="search" 
                            class="form-control border-0 py-2.5" 
                            placeholder="Search by staff name..."
                            @keyup.enter="handleSearch"
                        >
                        <button v-if="search" class="btn btn-white border-0 text-muted" @click="clearSearch">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div class="card shadow-sm border-0">
                <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h5 class="mb-0 fw-bold">Pending Staff Payment Receipts</h5>
                    <div class="d-flex align-items-center gap-3">
                        <span v-if="filters.search" class="small text-muted">Results for "{{ filters.search }}"</span>
                        <span class="badge bg-primary px-3 rounded-pill">{{ pendingReceipts.length }}</span>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table mb-0 align-middle table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Employee</th>
                                <th class="text-center">Months</th>
                                <th>Receipt File</th>
                                <th class="text-end px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="receipt in pendingReceipts" :key="receipt.id">
                                <td class="fw-medium">{{ receipt.contribution?.employee?.name || '-' }}</td>
                                <td class="text-center">
                                    <span class="badge bg-info-subtle text-info border border-info-subtle px-3">{{ receipt.months }}</span>
                                </td>
                                <td class="text-muted small">{{ receipt.receipt }}</td>
                                <td class="text-end px-4">
                                    <button class="btn btn-sm btn-primary px-3" @click="showPreview(receipt)">
                                        <i class="bi bi-eye me-1"></i> Preview & Validate
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="pendingReceipts.length === 0">
                                <td colspan="4" class="text-center text-muted py-5 italic">
                                    <i class="bi bi-check2-circle d-block mb-2 fs-2 text-success"></i>
                                    No pending receipts. All staff payments are validated.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Receipt Preview Modal -->
        <div class="modal fade shadow-lg" id="receiptModal" tabindex="-1" ref="modalRef">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white border-0">
                        <h5 class="modal-title fw-bold">Receipt Preview</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body p-0 bg-light d-flex align-items-center justify-content-center min-vh-50" style="overflow: hidden;">
                        <img v-if="selectedReceipt?.image_url" :src="selectedReceipt.image_url" class="img-fluid shadow-sm" style="max-height: 70vh; object-fit: contain;">
                        <div v-else class="p-5 text-center text-muted">
                            <i class="bi bi-image fs-1 mb-3"></i>
                            <p>Image not available</p>
                        </div>
                    </div>
                    <div v-if="selectedReceipt" class="p-3 bg-white border-top">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <div class="small text-muted uppercase fw-bold tracking-wider">Employee</div>
                                <div class="fw-bold fs-5">{{ selectedReceipt.contribution?.employee?.name }}</div>
                            </div>
                            <div class="text-end">
                                <div class="small text-muted uppercase fw-bold tracking-wider">Payment Period</div>
                                <div class="badge bg-primary fs-6">{{ selectedReceipt.months }} Months</div>
                            </div>
                        </div>
                        <div class="d-grid">
                            <button class="btn btn-success py-2 fw-bold shadow-sm" @click="confirmValidation">
                                <i class="bi bi-check-lg me-2"></i> Confirm Validation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StaffLayout>
</template>

<script setup>
import StaffLayout from '@/Layouts/StaffLayout.vue';
import { router } from '@inertiajs/vue3';
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    pendingReceipts: { type: Array, default: () => [] },
    filters: { type: Object, default: () => ({ search: '' }) },
});

const modalRef = ref(null);
const selectedReceipt = ref(null);
const search = ref(props.filters.search);
let bootstrapModal = null;
let searchTimeout = null;

onMounted(() => {
    if (typeof window.bootstrap !== 'undefined') {
        bootstrapModal = new window.bootstrap.Modal(modalRef.value);
    }
});

const handleSearch = () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        router.get('/seeo/staff/iwp/receipts', { search: search.value }, { 
            preserveState: true, 
            replace: true,
            preserveScroll: true 
        });
    }, 500);
};

watch(search, () => {
    handleSearch();
});

function clearSearch() {
    search.value = '';
}

function showPreview(receipt) {
    selectedReceipt.value = receipt;
    if (bootstrapModal) bootstrapModal.show();
}

function confirmValidation() {
    if (!selectedReceipt.value) return;
    
    router.post(`/seeo/staff/iwp/receipts/${selectedReceipt.value.id}/validate`, {}, { 
        preserveScroll: true,
        onSuccess: () => {
            if (bootstrapModal) bootstrapModal.hide();
            selectedReceipt.value = null;
        }
    });
}
</script>

<style scoped>
.min-vh-50 {
    min-height: 50vh;
}
.tracking-wider {
    letter-spacing: 0.05em;
}
</style>
