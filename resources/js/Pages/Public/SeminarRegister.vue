<script setup>
import PublicLayout from '@/Layouts/PublicLayout.vue';
import Notif from '@/Components/Notif.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps({
    event: {
        type: Object,
        required: true,
    },
    eventName: {
        type: String,
        default: 'Seminar Nasional',
    },
    waLink: {
        type: String,
        default: '',
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

const form = useForm({
    full_name: '',
    email: '',
    phone: '',
    institution: '',
    job_title: '',
    notes: '',
});

const showSuccessModal = ref(false);

function submit() {
    form.post(`/seminar/nasional/register/${props.event.slug}`, {
        preserveScroll: true,
        onSuccess: () => {
            form.reset('full_name', 'email', 'phone', 'institution', 'job_title', 'notes');
            showSuccessModal.value = true;
            // Initialize Bootstrap modal
            const modalElement = document.getElementById('successModal');
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        },
    });
}
</script>

<template>
    <Head :title="eventName" />

    <PublicLayout>
        <div class="container py-5">
            <Notif v-if="notif" :notif="notif" />

            <div class="row justify-content-center">
                <div class="col-12 col-lg-8">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body p-4 p-lg-5">
                            <p class="text-uppercase text-primary fw-semibold mb-2">Public Relation</p>
                            <h2 class="mb-2">{{ eventName }}</h2>
                            <p class="text-muted mb-4">Isi data seperti form Google Form. Data ini akan dipakai untuk rekap registrasi seminar.</p>

                            <div class="mb-3">
                                <label class="form-label">Nama Lengkap</label>
                                <input v-model="form.full_name" type="text" class="form-control" />
                                <small class="text-danger" v-if="form.errors.full_name">{{ form.errors.full_name }}</small>
                            </div>

                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">Email</label>
                                    <input v-model="form.email" type="email" class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">No. HP</label>
                                    <input v-model="form.phone" type="text" class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Institusi / Sekolah / Kampus</label>
                                    <input v-model="form.institution" type="text" class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Jabatan / Pekerjaan</label>
                                    <input v-model="form.job_title" type="text" class="form-control" />
                                </div>
                            </div>

                            <div class="mt-3">
                                <label class="form-label">Catatan</label>
                                <textarea v-model="form.notes" class="form-control" rows="4" placeholder="Tulis pertanyaan, kebutuhan khusus, atau informasi tambahan"></textarea>
                            </div>

                            <button class="btn btn-primary mt-4" :disabled="form.processing" @click="submit">
                                {{ form.processing ? 'Mengirim...' : 'Kirim Pendaftaran' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Success Modal -->
        <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg text-center p-4">
                    <div class="modal-body">
                        <div class="mb-4">
                            <div class="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                                <i class="bi bi-check-lg fs-1"></i>
                            </div>
                        </div>
                        <h3 class="fw-bold mb-2">Pendaftaran Berhasil!</h3>
                        <p class="text-muted mb-4">Terima kasih telah mendaftar di {{ eventName }}. Data Anda telah kami terima.</p>
                        
                        <div v-if="waLink" class="bg-light p-4 rounded-3 mb-4">
                            <p class="small fw-bold text-uppercase tracking-wider text-muted mb-3">Langkah Selanjutnya</p>
                            <p class="mb-4">Silakan bergabung ke grup WhatsApp resmi peserta untuk mendapatkan informasi lebih lanjut.</p>
                            <a :href="waLink" target="_blank" class="btn btn-success w-100 py-3 fw-bold">
                                <i class="bi bi-whatsapp me-2"></i> Gabung Grup WhatsApp
                            </a>
                        </div>
                        
                        <button type="button" class="btn btn-outline-secondary w-100" data-bs-dismiss="modal">Tutup</button>
                    </div>
                </div>
            </div>
        </div>
    </PublicLayout>
</template>
