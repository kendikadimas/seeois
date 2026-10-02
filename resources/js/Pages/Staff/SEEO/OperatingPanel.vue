<script setup>
import StaffLayout from '@/Layouts/StaffLayout.vue';
import Notif from '@/Components/Notif.vue';
import { Head, router } from '@inertiajs/vue3';
import { formatDateOnly, formatTime } from '@/utils';
import { computed, ref } from 'vue';

// Manual route helper to avoid Ziggy resolution issues
const route = (name, params = {}) => {
    const routes = {
        'logbook.validate': '/logbook/validate/{id}',
    };
    if (routes[name]) {
        let url = routes[name];
        if (params && typeof params === 'object') {
            for (const key in params) {
                url = url.replace(`{${key}}`, params[key]);
            }
        } else if (params) {
            // Handle single param as {id}
            url = url.replace(/\{[a-z]+\}/, params);
        }
        return url;
    }
    console.warn(`Route "${name}" not found in OperatingPanel helper.`);
    return window.route ? window.route(name, params) : '#';
};

const props = defineProps({
    logs: {
        type: Array,
        default: () => [],
    },
    staffSummary: {
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

const logSearch = ref('');
const validationFilter = ref('all');

const filteredLogs = computed(() => {
    const keyword = logSearch.value.trim().toLowerCase();
    return props.logs.filter((log) => {
        const statusMatch =
            validationFilter.value === 'all' ||
            (validationFilter.value === 'validated' && log.validated) ||
            (validationFilter.value === 'pending' && !log.validated);

        if (!statusMatch) return false;
        if (!keyword) return true;

        const haystack = [log.employee?.name, log.program?.name, log.title].filter(Boolean).join(' ').toLowerCase();
        return haystack.includes(keyword);
    });
});

const totalLogs = computed(() => props.logs.length);
const validatedLogs = computed(() => props.logs.filter((log) => log.validated).length);
const pendingLogs = computed(() => props.logs.filter((log) => !log.validated).length);

function toggleValidation(logId) {
    router.post(`/seeo/staff/logbook/validate/${logId}`, {}, { preserveScroll: true });
}
</script>

<template>
    <Head title="Operating Panel" />

    <StaffLayout>
        <div class="container-fluid operating-panel px-2 px-sm-3 px-lg-4 py-3 py-md-4">
            <Notif v-if="notif" :notif="notif" />

            <div class="row g-4">
                <div class="col-12">
                    <div class="row g-3 mb-3">
                        <div class="col-4">
                            <div class="card border-0 shadow-sm h-100">
                                <div class="card-body p-2 p-md-3">
                                    <div class="text-muted small">Total Logbook</div>
                                    <div class="fs-3 fw-bold">{{ totalLogs }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="card border-0 shadow-sm h-100">
                                <div class="card-body p-2 p-md-3">
                                    <div class="text-muted small">Sudah Valid</div>
                                    <div class="fs-3 fw-bold">{{ validatedLogs }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="card border-0 shadow-sm h-100">
                                <div class="card-body p-2 p-md-3">
                                    <div class="text-muted small">Menunggu Validasi</div>
                                    <div class="fs-3 fw-bold">{{ pendingLogs }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card border-0 shadow-sm">
                        <div class="card-body">
                            <h4 class="mb-1">Operating Panel</h4>
                            <p class="text-muted mb-0">Pantau semua logbook staff dan validasi logbook yang masuk.</p>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-xl-4">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-header bg-transparent border-0 pt-4 pb-0">
                            <h5 class="mb-0">Ringkasan Staff</h5>
                        </div>
                        <div class="card-body">
                            <div v-for="staff in staffSummary" :key="staff.id" class="d-flex justify-content-between py-2 border-bottom">
                                <div>
                                    <div class="fw-semibold">{{ staff.name }}</div>
                                    <div class="text-muted small">Role {{ staff.roles_id }}</div>
                                </div>
                                <span class="badge bg-primary">{{ staff.logbooks_count }}</span>
                            </div>
                            <div v-if="!staffSummary.length" class="text-muted">Belum ada logbook yang diupload.</div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-xl-8">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-transparent border-0 pt-4 pb-0">
                            <h5 class="mb-0">Semua Logbook</h5>
                        </div>
                        <div class="card-body">
                            <div class="row g-2 mb-3">
                                <div class="col-md-5">
                                    <input v-model="logSearch" type="search" class="form-control" placeholder="Cari staff, program, atau judul" />
                                </div>
                                <div class="col-md-4">
                                    <select v-model="validationFilter" class="form-select">
                                        <option value="all">Semua status</option>
                                        <option value="pending">Menunggu validasi</option>
                                        <option value="validated">Sudah valid</option>
                                    </select>
                                </div>
                                <div class="col-md-3 text-md-end">
                                    <button class="btn btn-outline-secondary w-100" @click="logSearch = ''; validationFilter = 'all'">Reset Filter</button>
                                </div>
                            </div>
                            <div class="table-responsive d-none d-md-block">
                                <table class="table align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th>Staff</th>
                                            <th>Program</th>
                                            <th>Judul</th>
                                            <th>Tanggal</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="log in filteredLogs" :key="log.id">
                                            <td>{{ log.employee?.name ?? '-' }}</td>
                                            <td>{{ log.program?.name ?? '-' }}</td>
                                            <td class="logbook-title-cell">{{ log.title }}</td>
                                            <td class="text-nowrap">{{ formatDateOnly(log.date_time) }} {{ formatTime(log.date_time) }}</td>
                                            <td>
                                                <span class="badge" :class="log.validated ? 'bg-success' : 'bg-warning text-dark'">
                                                    {{ log.validated ? 'Valid' : 'Menunggu' }}
                                                </span>
                                            </td>
                                            <td class="text-end">
                                                <button class="btn btn-outline-primary btn-sm text-nowrap" @click="toggleValidation(log.id)">
                                                    {{ log.validated ? 'Batal Validasi' : 'Validasi' }}
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="d-md-none logbook-mobile-list">
                                <article
                                    v-for="log in filteredLogs"
                                    :key="`mobile-${log.id}`"
                                    class="logbook-mobile-card"
                                >
                                    <div class="d-flex align-items-start gap-2">
                                        <div class="min-w-0 flex-grow-1">
                                            <div class="fw-semibold text-dark text-break">
                                                {{ log.employee?.name ?? '-' }}
                                            </div>
                                            <div class="small text-primary text-break">
                                                {{ log.program?.name ?? '-' }}
                                            </div>
                                        </div>
                                        <span class="badge flex-shrink-0" :class="log.validated ? 'bg-success' : 'bg-warning text-dark'">
                                            {{ log.validated ? 'Valid' : 'Menunggu' }}
                                        </span>
                                    </div>
                                    <p class="logbook-mobile-title mb-2 mt-2">{{ log.title }}</p>
                                    <div class="d-flex flex-column flex-sm-row align-items-sm-center gap-2">
                                        <small class="text-muted me-sm-auto">
                                            <i class="bi bi-calendar3 me-1"></i>
                                            {{ formatDateOnly(log.date_time) }} {{ formatTime(log.date_time) }}
                                        </small>
                                        <button class="btn btn-outline-primary btn-sm" @click="toggleValidation(log.id)">
                                            {{ log.validated ? 'Batal Validasi' : 'Validasi' }}
                                        </button>
                                    </div>
                                </article>
                            </div>

                            <div v-if="!filteredLogs.length" class="text-center text-muted py-4">
                                Tidak ada logbook yang sesuai dengan filter.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StaffLayout>
</template>

<style scoped>
.min-w-0 {
    min-width: 0;
}

.logbook-title-cell {
    min-width: 12rem;
    max-width: 24rem;
    overflow-wrap: anywhere;
}

.logbook-mobile-list {
    border-top: 1px solid rgba(148, 163, 184, 0.25);
}

.logbook-mobile-card {
    padding: 1rem 0;
    border-bottom: 1px solid rgba(148, 163, 184, 0.25);
}

.logbook-mobile-card:last-child {
    border-bottom: 0;
    padding-bottom: 0;
}

.logbook-mobile-title {
    color: #334155;
    line-height: 1.4;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
}

@media (max-width: 575.98px) {
    .operating-panel .row.g-4 {
        --bs-gutter-y: 1rem;
    }

    .operating-panel .row.g-3 {
        --bs-gutter-x: 0.5rem;
    }

    .operating-panel .card-body {
        min-width: 0;
    }

    .operating-panel .fs-3 {
        font-size: 1.35rem !important;
    }

    .operating-panel .text-muted.small {
        font-size: 0.68rem;
        line-height: 1.2;
    }

    .logbook-mobile-card .btn {
        width: 100%;
    }
}
</style>
