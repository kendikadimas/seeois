<script setup>
import StaffLayout from '@/Layouts/StaffLayout.vue';
import Notif from '@/Components/Notif.vue';
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import { Head, useForm, Link } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps({
    event: {
        type: Object,
        required: true,
    },
    registrations: {
        type: Array,
        default: () => [],
    },
    notif: {
        type: Object,
        default: null,
    },
});

const modalConfirmationRef = ref(null);

function confirmation(routeUrl, message) {
    modalConfirmationRef.value.showModal(routeUrl, message);
}

function exportData() {
    window.location.href = `/seeo/staff/seminar/registrations/event/${props.event.id}/export`;
}
</script>

<template>
    <Head :title="`Registrasi: ${event.name}`" />

    <StaffLayout>
        <template #header>
            <div class="d-flex align-items-center">
                <Link href="/seeo/staff/seminar/registrations" class="btn btn-sm btn-light me-3">
                    <i class="bi bi-arrow-left"></i>
                </Link>
                Data Pendaftar: {{ event.name }}
            </div>
        </template>

        <div class="container-fluid py-4">
            <Notif v-if="notif" :notif="notif" />
            <ModalConfirmation ref="modalConfirmationRef" />

            <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <div>
                    <h4 class="mb-1">Total: {{ registrations.length }} Pendaftar</h4>
                    <p class="text-muted small mb-0">Manajemen pendaftaran individu dan ekspor data untuk event ini.</p>
                </div>
                <div class="d-flex flex-wrap gap-2">
                    <a :href="`/seminar/nasional/register/${event.slug}`" target="_blank" class="btn btn-outline-primary">
                        <i class="bi bi-box-arrow-up-right me-1"></i> Lihat Form Publik
                    </a>
                    <button class="btn btn-success" @click="exportData">
                        <i class="bi bi-file-earmark-excel me-1"></i> Export CSV
                    </button>
                    <button class="btn btn-outline-danger" @click="confirmation(`/seeo/staff/seminar/registrations/event/${event.id}/clear`, 'Apakah Anda yakin ingin menghapus SELURUH data pendaftaran untuk event ini?')">
                        <i class="bi bi-trash me-1"></i> Kosongkan Data
                    </button>
                </div>
            </div>

            <div class="card border-0 shadow-sm">
                <div class="card-body table-responsive">
                    <table class="table align-middle table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>HP</th>
                                <th>Institusi</th>
                                <th>Jabatan</th>
                                <th>Catatan</th>
                                <th>Waktu Daftar</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="registration in registrations" :key="registration.id">
                                <td class="fw-medium">{{ registration.full_name }}</td>
                                <td>{{ registration.email ?? '-' }}</td>
                                <td>{{ registration.phone ?? '-' }}</td>
                                <td>{{ registration.institution ?? '-' }}</td>
                                <td>{{ registration.job_title ?? '-' }}</td>
                                <td class="text-muted small">{{ registration.notes ?? '-' }}</td>
                                <td class="small">{{ new Date(registration.created_at).toLocaleString('id-ID') }}</td>
                                <td>
                                    <button class="btn btn-sm btn-light text-danger" @click="confirmation(`/seeo/staff/seminar/registrations/registration/${registration.id}`, 'Hapus data pendaftaran ini?')">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="registrations.length === 0">
                                <td colspan="8" class="text-center py-5 text-muted">
                                    <i class="bi bi-inbox fs-2 d-block mb-2"></i>
                                    Belum ada pendaftaran untuk event ini.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </StaffLayout>
</template>
