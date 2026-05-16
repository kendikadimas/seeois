<script setup>
import StaffLayout from '@/Layouts/StaffLayout.vue';
import Notif from '@/Components/Notif.vue';
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import { Head, useForm, Link } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps({
    events: {
        type: Array,
        default: () => [],
    },
    notif: {
        type: Object,
        default: null,
    },
});

const modalConfirmationRef = ref(null);
const modalAddEventRef = ref(null);

const formAdd = useForm({
    name: '',
    wa_link: '',
});

function submitAdd() {
    formAdd.post('/seeo/staff/seminar/registrations/events', {
        onSuccess: () => {
            formAdd.reset();
            const modal = bootstrap.Modal.getInstance(modalAddEventRef.value);
            modal.hide();
        }
    });
}

function confirmation(routeUrl, message) {
    modalConfirmationRef.value.showModal(routeUrl, message);
}
</script>

<template>
    <Head title="Manajemen Seminar" />

    <StaffLayout>
        <template #header>
            Manajemen Seminar & Pendaftaran
        </template>

        <div class="container-fluid py-4">
            <Notif v-if="notif" :notif="notif" />
            <ModalConfirmation ref="modalConfirmationRef" />

            <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <h4 class="mb-1">Daftar Event Seminar</h4>
                    <p class="text-muted small mb-0">Kelola berbagai event seminar dan pantau pendaftar di setiap event.</p>
                </div>
                <div>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalAddEvent">
                        <i class="bi bi-plus-lg me-1"></i> Tambah Event Baru
                    </button>
                </div>
            </div>

            <div class="row g-4">
                <div v-for="event in events" :key="event.id" class="col-12 col-md-6 col-xl-4">
                    <div class="card border-0 shadow-sm h-100">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <span :class="`badge ${event.is_active ? 'bg-success' : 'bg-secondary'}`">
                                    {{ event.is_active ? 'Aktif' : 'Nonaktif' }}
                                </span>
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-light" type="button" data-bs-toggle="dropdown">
                                        <i class="bi bi-three-dots-vertical"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-end shadow border-0">
                                        <li>
                                            <button class="dropdown-item" @click="confirmation(`/seeo/staff/seminar/registrations/events/${event.id}/toggle`, event.is_active ? 'Nonaktifkan pendaftaran ini?' : 'Aktifkan kembali pendaftaran ini?')">
                                                <i :class="`bi ${event.is_active ? 'bi-pause-circle' : 'bi-play-circle'} me-2`"></i>
                                                {{ event.is_active ? 'Nonaktifkan' : 'Aktifkan' }}
                                            </button>
                                        </li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li>
                                            <button class="dropdown-item text-danger" @click="confirmation(`/seeo/staff/seminar/registrations/events/${event.id}`, 'Hapus event ini beserta SELURUH data pendaftarannya?')">
                                                <i class="bi bi-trash me-2"></i> Hapus Event
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <h5 class="fw-bold mb-1">{{ event.name }}</h5>
                            <p class="text-muted small mb-3">Slug: {{ event.slug }}</p>
                            
                            <div class="d-flex align-items-center gap-3 mb-4">
                                <div class="p-3 bg-light rounded-3 text-center flex-grow-1">
                                    <h4 class="fw-bold mb-0">{{ event.registrations_count }}</h4>
                                    <span class="text-muted extra-small uppercase fw-bold">Pendaftar</span>
                                </div>
                                <div class="flex-grow-1 text-center">
                                    <a v-if="event.is_active" :href="`/seminar/nasional/register/${event.slug}`" target="_blank" class="text-decoration-none small text-primary fw-bold">
                                        <i class="bi bi-link-45deg"></i> Lihat Form
                                    </a>
                                    <span v-else class="text-muted small italic">Form Tutup</span>
                                </div>
                            </div>

                            <div class="d-grid">
                                <Link :href="`/seeo/staff/seminar/registrations/event/${event.id}`" class="btn btn-outline-primary">
                                    Lihat Data & Kelola <i class="bi bi-arrow-right ms-1"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="events.length === 0" class="col-12">
                    <div class="card border-0 shadow-sm py-5 text-center">
                        <div class="card-body text-muted">
                            <i class="bi bi-calendar-x fs-1 d-block mb-3"></i>
                            <h5>Belum ada event seminar</h5>
                            <p>Klik tombol "Tambah Event Baru" untuk memulai.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Add Event -->
        <div class="modal fade" id="modalAddEvent" tabindex="-1" ref="modalAddEventRef">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow">
                    <div class="modal-header border-0">
                        <h5 class="modal-title fw-bold">Tambah Event Seminar Baru</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label fw-medium">Nama Event</label>
                            <input v-model="formAdd.name" type="text" class="form-control" placeholder="Contoh: Seminar Nasional SEEO 2025" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-medium">Link Grup WhatsApp (Opsional)</label>
                            <input v-model="formAdd.wa_link" type="text" class="form-control" placeholder="https://chat.whatsapp.com/...">
                            <div class="form-text">Peserta akan diarahkan ke link ini setelah mendaftar.</div>
                        </div>
                    </div>
                    <div class="modal-footer border-0">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Batal</button>
                        <button type="button" class="btn btn-primary" :disabled="formAdd.processing" @click="submitAdd">
                            {{ formAdd.processing ? 'Menyimpan...' : 'Buat Event' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </StaffLayout>
</template>

<style scoped>
.extra-small { font-size: 0.65rem; }
</style>
