<script setup>
import StaffLayout from "@/Layouts/StaffLayout.vue";
import InputError from "@/Components/InputError.vue";
import Notif from "@/Components/Notif.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { Head, useForm, usePage } from "@inertiajs/vue3";
import {
    ref,
    computed,
    watch,
    onMounted,
    defineProps,
} from "vue";
import { formatDateOnly } from "@/utils";

const route = (name, params = {}) => window.route(name, params);

const props = defineProps({
    staff_list: Array,
    stand_list: Array,
    governance_years: Array,
    selected_year_id: Number,
    active_year_id: Number,
    filter: Object,
    notif: Object,
    errors: Object,
});

const auth_user = usePage().props.auth.user;
const capabilities = computed(() => auth_user?.capabilities ?? []);
const canManageStands = computed(() => capabilities.value.includes('*') || capabilities.value.includes('stands.manage'));
const title = ref("Manajemen Stand");
const toastNotifRef = ref(null);
const modalNewStand = ref(null);
const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

const form_filter = useForm({
    category: props.filter.category,
    order: props.filter.order,
    active: props.filter.active,
    year_id: props.selected_year_id,
});
const form_new_stand = useForm({
    name: null,
    pic_id: null,
    place: null,
    date: today,
    type: 0,
    year_id: props.selected_year_id,
});

// Safe label accessor to avoid reading .name of null/primitive
function safeNameLabel(option) {
    if (option == null) return '';
    if (typeof option === 'string') return option;
    if (typeof option === 'object') return option.name || option.label || '';
    return '';
}

function handleSubmitFilter(category) {
    if (category) {
        form_filter.order =
            form_filter.category == category
                ? form_filter.order == "asc"
                    ? "desc"
                    : "asc"
                : "desc";
        form_filter.category = category;
        form_filter.keyword = null;
    }
    form_filter.post(route('food.stand.filter'), { preserveScroll: true });
}

function showNewStandModal(is_show) {
    if (modalNewStand.value == null) {
        const modal = document.getElementById("newStandModal");
        modalNewStand.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        form_new_stand.clearErrors();
        modalNewStand.value.show();
    } else {
        modalNewStand.value.hide();
    }
}

function handleNewStand() {
    form_new_stand.post(route('food.stand.insert'), {
        preserveScroll: true,
        onSuccess: () => {
            showNewStandModal(false);
            form_new_stand.reset();
        },
    });
}

function debugOpenStandDetail(stand) {
    console.debug('[Stand] opening detail', {
        standId: stand.id,
        standName: stand.name,
        href: `/seeo/staff/blaterian/foods/stand_detail/${stand.id}`,
        activeYearId: props.selected_year_id,
    });
}

const standTypeLabel = (type) => ({ 0: 'Live', 1: 'Pre-order', 2: 'Live & Pre-order' }[Number(type)] ?? 'Tidak diketahui');

onMounted(() => {
    if (props.notif) {
        toastNotifRef.value?.showToast(props.notif.type, props.notif.message);
    }
});

watch(
    () => props.notif,
    (newValue) => {
        if (newValue) toastNotifRef.value?.showToast(newValue.type, newValue.message);
    }
);
</script>

<style>
.vs__dropdown-menu {
    max-height: 150px;
    overflow-y: auto;
    text-wrap: nowrap;
}

.stand-hero {
    background:
        radial-gradient(circle at 90% 15%, rgba(59, 130, 246, 0.16), transparent 28%),
        linear-gradient(135deg, #ffffff 0%, #f8fbff 100%);
}

.stand-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stand-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 1rem 2rem rgba(15, 23, 42, 0.1) !important;
}

.stand-icon,
.empty-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
    color: #2563eb;
    background: #dbeafe;
    font-size: 1.25rem;
}

.empty-icon {
    width: 4rem;
    height: 4rem;
    font-size: 1.75rem;
}
</style>

<template>
    <!-- Page Layout -->
    <StaffLayout>
        <Head :title="title" icon="/favicon.ico" />
        <template #header>
            {{ title }}
        </template>

        <div class="container-fluid py-3 py-md-4">
            <section class="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 stand-hero">
                <div class="card-body p-4 p-lg-5 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                    <div>
                        <span class="badge rounded-pill bg-primary-subtle text-primary border border-primary-subtle mb-2">
                            <i class="bi bi-shop me-1"></i> Operasional Penjualan
                        </span>
                        <h2 class="fw-bold mb-1">Manajemen Stand</h2>
                        <p class="text-muted mb-0">Buat stand, tentukan penanggung jawab, lalu kelola menu, bahan, kasir, dan penjualannya.</p>
                    </div>
                    <button
                        v-if="canManageStands"
                        type="button"
                        class="btn btn-primary btn-lg rounded-pill px-4 align-self-start align-self-lg-center"
                        @click="showNewStandModal(true)"
                    >
                        <i class="bi bi-plus-circle-fill me-2"></i>Tambah Stand Baru
                    </button>
                    <div v-else class="alert alert-light border mb-0 py-2 px-3 small align-self-start align-self-lg-center">
                        <i class="bi bi-lock me-1 text-primary"></i>Pembuatan stand hanya tersedia untuk COO dan Super Admin.
                    </div>
                </div>
            </section>

            <section class="card border-0 shadow-sm rounded-4 mb-4">
                <div class="card-body p-3 p-md-4">
                    <div class="d-flex flex-column flex-xl-row justify-content-between gap-3">
                        <div>
                            <label class="form-label small fw-bold text-secondary mb-2">Periode kepengurusan</label>
                            <div class="d-flex flex-wrap gap-2">
                                <a
                                    v-for="year in governance_years"
                                    :key="year.id"
                                    :href="route('food.stand', { year_id: year.id })"
                                    :class="['btn btn-sm rounded-pill px-3', selected_year_id === year.id ? 'btn-primary' : 'btn-outline-secondary']"
                                >
                                    {{ year.year }}
                                    <span v-if="year.is_active" class="badge rounded-pill bg-info text-dark ms-1">Aktif</span>
                                </a>
                            </div>
                        </div>

                        <div>
                            <label class="form-label small fw-bold text-secondary mb-2">Urutkan dan tampilkan</label>
                            <div class="d-flex flex-wrap gap-2">
                                <button type="button" @click="handleSubmitFilter('name')" class="btn btn-sm btn-outline-secondary rounded-pill px-3">
                                    <i class="bi bi-sort-alpha-down me-1"></i>Nama
                                    <i v-if="filter.category === 'name'" :class="filter.order === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                                </button>
                                <button type="button" @click="handleSubmitFilter('date')" class="btn btn-sm btn-outline-secondary rounded-pill px-3">
                                    <i class="bi bi-calendar3 me-1"></i>Tanggal
                                    <i v-if="filter.category === 'date'" :class="filter.order === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'"></i>
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-sm rounded-pill px-3"
                                    :class="filter.active ? 'btn-success' : 'btn-outline-success'"
                                    @click="form_filter.active = !filter.active; handleSubmitFilter()"
                                >
                                    <i class="bi bi-toggle-on me-1"></i>{{ filter.active ? 'Hanya Stand Aktif' : 'Semua Status' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div v-if="stand_list?.length" class="row g-3 g-lg-4">
                <div v-for="stand in stand_list" :key="stand.id" class="col-12 col-md-6 col-xl-4">
                    <a
                        :href="route('food.stand.detail', { id: stand.id })"
                        @click="debugOpenStandDetail(stand)"
                        class="text-decoration-none"
                    >
                        <article class="card stand-card border-0 shadow-sm h-100 rounded-4">
                            <div class="card-body p-4">
                                <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
                                    <div class="stand-icon"><i class="bi bi-shop-window"></i></div>
                                    <span
                                        class="badge rounded-pill"
                                        :class="(stand?.menu_lock || 0) > 0 && (stand?.sale_validation || 0) == 0 ? 'text-bg-success' : 'text-bg-secondary'"
                                    >
                                        {{ (stand?.menu_lock || 0) > 0 && (stand?.sale_validation || 0) == 0 ? 'Aktif' : 'Belum aktif' }}
                                    </span>
                                </div>
                                <h5 class="fw-bold text-dark mb-2">{{ stand?.name || 'Stand tanpa nama' }}</h5>
                                <div class="d-grid gap-2 small text-muted">
                                    <span><i class="bi bi-geo-alt me-2 text-primary"></i>{{ stand?.place || 'Lokasi belum diisi' }}</span>
                                    <span><i class="bi bi-person-badge me-2 text-primary"></i>PIC: {{ stand?.pic?.name || 'Belum ditentukan' }}</span>
                                    <span><i class="bi bi-calendar-event me-2 text-primary"></i>{{ stand?.date ? formatDateOnly(stand.date) : 'Tanggal belum diisi' }}</span>
                                    <span><i class="bi bi-bag-check me-2 text-primary"></i>{{ standTypeLabel(stand?.type) }}</span>
                                </div>
                            </div>
                            <div class="card-footer bg-transparent border-top px-4 py-3 d-flex justify-content-between align-items-center text-primary fw-semibold small">
                                <span>Buka dan kelola stand</span><i class="bi bi-arrow-right"></i>
                            </div>
                        </article>
                    </a>
                </div>
            </div>

            <section v-else class="card border-0 shadow-sm rounded-4">
                <div class="card-body text-center py-5 px-3">
                    <div class="empty-icon mx-auto mb-3"><i class="bi bi-shop"></i></div>
                    <h4 class="fw-bold">Belum ada stand pada periode ini</h4>
                    <p class="text-muted mx-auto" style="max-width: 520px;">
                        Stand adalah tempat utama untuk mengelola menu, bahan belanja, tim produksi, kasir, stok, dan transaksi.
                    </p>
                    <button v-if="canManageStands" type="button" class="btn btn-primary rounded-pill px-4" @click="showNewStandModal(true)">
                        <i class="bi bi-plus-circle me-2"></i>Buat Stand Pertama
                    </button>
                    <div v-else class="alert alert-light border d-inline-flex align-items-center gap-2 mb-0 text-start">
                        <i class="bi bi-info-circle text-primary"></i>
                        <span>Hanya COO atau Super Admin yang dapat membuat stand. Hubungi pengelola jika stand yang dibutuhkan belum tersedia.</span>
                    </div>
                </div>
            </section>
        </div>
    </StaffLayout>

    <!-- Modal -->
    <!-- New Stand Modal -->
    <div
        v-if="canManageStands"
        class="modal fade"
        id="newStandModal"
        tabindex="-1"
        aria-labelledby="newStandModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg mx-3 rounded-4 overflow-hidden">
                <div class="modal-header border-0 bg-primary text-white p-4">
                    <div>
                        <h5 id="newStandModalLabel" class="modal-title fw-bold"><i class="bi bi-shop-window me-2"></i>Tambah Stand Baru</h5>
                        <small class="text-white text-opacity-75">Lengkapi identitas dasar. Menu dan anggota tim dapat ditambahkan setelah stand dibuat.</small>
                    </div>
                    <button
                        type="button"
                        class="btn-close btn-close-white ms-auto"
                        @click="showNewStandModal(false)"
                        aria-label="Tutup"
                    ></button>
                </div>
                <form @submit.prevent="handleNewStand()">
                    <div class="modal-body p-4">
                        <div class="mb-3">
                                <label for="stand_name" class="form-label fw-semibold">Nama stand <span class="text-danger">*</span></label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="stand_name"
                                    v-model="form_new_stand.name"
                                    placeholder="Contoh: Blaterian Fakultas Ekonomi"
                                    maxlength="255"
                                    required
                                />
                                <InputError :message="form_new_stand.errors.name" class="mt-2" />
                        </div>
                        <div class="mb-3">
                                <label for="stand_place" class="form-label fw-semibold">Lokasi <span class="text-danger">*</span></label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="stand_place"
                                    v-model="form_new_stand.place"
                                    placeholder="Contoh: Lobi Gedung F"
                                    maxlength="255"
                                    required
                                />
                                <InputError :message="form_new_stand.errors.place" class="mt-2" />
                        </div>
                        <div class="row g-3 mb-3">
                            <div class="col-sm-6">
                                <label for="stand_date" class="form-label fw-semibold">Tanggal mulai <span class="text-danger">*</span></label>
                                <input
                                    type="date"
                                    class="form-control"
                                    id="stand_date"
                                    v-model="form_new_stand.date"
                                    :min="today"
                                    required
                                />
                                <InputError :message="form_new_stand.errors.date" class="mt-2" />
                            </div>
                            <div class="col-sm-6">
                                <label for="stand_type" class="form-label fw-semibold">Sistem penjualan <span class="text-danger">*</span></label>
                                <select
                                    id="stand_type"
                                    class="form-select"
                                    v-model="form_new_stand.type"
                                    required
                                >
                                    <option
                                        :value="item.value"
                                        v-for="item in [
                                            { value: 0, name: 'Penjualan langsung (Live)' },
                                            { value: 1, name: 'Pre-order' },
                                            {
                                                value: 2,
                                                name: 'Live dan Pre-order',
                                            },
                                        ]"
                                    >
                                        {{ item.name }}
                                    </option>
                                </select>
                                <InputError :message="form_new_stand.errors.type" class="mt-2" />
                            </div>
                        </div>
                        <div>
                                <label for="stand_pic" class="form-label fw-semibold">Penanggung jawab (PIC) <span class="text-danger">*</span></label>
                                <v-select
                                    class="bg-white text-nowrap"
                                    :options="staff_list"
                                    :getOptionLabel="safeNameLabel"
                                    label="name"
                                    :reduce="(staff) => staff?.id"
                                    v-model="form_new_stand.pic_id"
                                    placeholder="Pilih anggota staf"
                                    input-id="stand_pic"
                                />
                                <div v-if="!staff_list?.length" class="form-text text-warning">Belum ada staf pada periode ini. Tambahkan staf terlebih dahulu melalui Manajemen Staff.</div>
                                <InputError :message="form_new_stand.errors.pic_id" class="mt-2" />
                        </div>
                    </div>
                    <div class="modal-footer border-0 px-4 pb-4 pt-0">
                        <button type="button" class="btn btn-light" @click="showNewStandModal(false)">Batal</button>
                        <button type="submit" class="btn btn-primary px-4" :disabled="form_new_stand.processing || !staff_list?.length">
                            <span v-if="form_new_stand.processing" class="spinner-border spinner-border-sm me-2"></span>
                            {{ form_new_stand.processing ? 'Membuat stand...' : 'Buat Stand' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Notif Toast -->
    <Notif ref="toastNotifRef" />
</template>
