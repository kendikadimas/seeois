<script setup>
import { computed, ref } from "vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import { Head, Link, useForm, usePage } from "@inertiajs/vue3";

const props = defineProps({
    status: {
        type: String,
    },
});

const form = useForm({});
const auth_user = usePage().props.auth.user;
const modalConfirmationRef = ref(null);

const submit = () => {
    form.post(route("verification.send"));
};

const verificationLinkSent = computed(
    () => props.status === "verification-link-sent"
);

function confirmation(route, message) {
    if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route, message);
    } else {
        console.error("modalConfirmationRef is null");
    }
}
</script>

<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap">
    <Head title="Verifikasi Email - SEEO" />
    
    <ModalConfirmation ref="modalConfirmationRef" />

    <div class="container-fluid g-0">
        <div class="row g-0 vh-100">
            <div class="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center bg-primary bg-gradient text-white p-5">
                <div class="text-center" style="max-width: 450px;">
                    <div class="mb-4 d-flex ">
                        <div class="mx-auto d-flex align-items-center justify-content-center bg-white bg-opacity-25 rounded-circle shadow-lg" style="width: 130px; height: 130px;">
                            <img src="/storage/local/images/compro/logo.png" alt="SEEO Logo" class="rounded-circle" style="width: 90px; height: 90px;">
                        </div>
                    </div>
                    <h1 class="display-4 fw-bolder mb-3">SIS v5.0</h1>
                    <h2 class="h3 fw-light mb-4">SEEO INFORMATION SYSTEM</h2>
                </div>
            </div>

            <div class="col-lg-6 d-flex flex-column justify-content-center align-items-center bg-light p-4 p-lg-5">
                
                <div class="card shadow-lg border-0 rounded-4" style="width: 100%; max-width: 450px;">
                    <div class="card-body p-4 p-lg-5">
                        
                        <div class="text-center mb-4">
                            <div class="d-lg-none mb-4">
                                <img src="/storage/local/images/compro/logo.png" alt="SEEO Logo" style="width: 70px; height: 70px;">
                            </div>
                            <h2 class="h3 fw-bold mb-2">Verifikasi Email Anda</h2>
                            <p class="text-muted">Satu langkah terakhir!</p>
                        </div>
                        
                        <div class="mb-4 text-muted small" style="text-align: justify;">
                            Terima kasih telah mendaftar! Sebelum memulai, silakan konfirmasi email Anda dengan 
                            <b>mengklik link</b> yang telah kami kirimkan ke 
                            <b class="text-dark">{{ auth_user.email }}</b>.
                            Jika Anda tidak menerima email, kami akan dengan senang hati mengirimkannya lagi.
                        </div>

                        <div
                            class="alert alert-success small"
                            v-if="verificationLinkSent"
                        >
                            Link verifikasi baru telah dikirimkan ke alamat email yang Anda berikan saat pendaftaran.
                        </div>

                        <div class="mt-4 d-flex justify-content-between align-items-center">
                            <button
                                @click="submit"
                                class="btn btn-primary"
                                :disabled="form.processing"
                            >
                                <span v-if="form.processing" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span v-if="form.processing"> Mengirim...</span>
                                <span v-else>Kirim Ulang Email</span>
                            </button>

                            <a
                                @click="confirmation(route('logout'), 'Apakah Anda yakin ingin logout?')"
                                class="btn btn-outline-secondary"
                                >Log Out</a
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
body, .container-fluid, .card, .form-label, .form-control, .btn, .fw-bolder, .fw-bold, .fw-light, .h3, .h2, .h1, .display-4, .lead, .text-muted, .alert {
    font-family: 'Poppins', Arial, Helvetica, sans-serif !important;
}
</style>