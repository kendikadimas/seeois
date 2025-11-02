<script setup>
import InputError from "@/Components/InputError.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";

defineProps({
    status: {
        type: String,
    },
});

const form_reset = useForm({
    email: null,
});
</script>

<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap">
    <Head title="Lupa Password - SEEO" />

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
                            <h2 class="h3 fw-bold mb-2">Lupa Kata Sandi?</h2>
                            <!-- <p class="text-muted">Jangan khawatir, kami akan kirimkan link reset.</p> -->
                        </div>
                        
                        <div class="mb-4 text-muted" style="text-align: justify; font-size: 0.95rem;">
                            Masukkan alamat email Anda yang terdaftar. Kami akan mengirimkan link untuk mengatur ulang kata sandi Anda.
                        </div>

                        <div v-if="status" class="alert alert-success small">
                            {{ status }}
                        </div>

                        <form @submit.prevent="form_reset.post(route('password.email'))">
                            <div class="mb-3 form-floating">
                                <input
                                    id="email"
                                    type="email"
                                    class="form-control"
                                    placeholder="Alamat Email"
                                    v-model="form_reset.email"
                                    autocomplete="username"
                                    autofocus
                                    required
                                />
                                <label for="email">Alamat Email</label>
                                <InputError :message="form_reset.errors.email" class="mt-1" />
                            </div>

                            <div class="d-grid mt-4">
                                <button type="submit" class="btn btn-primary btn-lg" :disabled="form_reset.processing">
                                    <span v-if="form_reset.processing" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span v-if="form_reset.processing"> Mengirim...</span>
                                    <span v-else>Kirim Link Reset</span>
                                </button>
                            </div>
                            
                            <div class="text-center text-muted border-top pt-3 mt-4">
                                Ingat kata sandi Anda? 
                                <Link 
                                    href="/login" 
                                    class="fw-bold text-primary text-decoration-none"
                                >
                                    Login
                                </Link>
                            </div>
                        </form>
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