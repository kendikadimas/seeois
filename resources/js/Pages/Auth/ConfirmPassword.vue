<script setup>
import InputError from "@/Components/InputError.vue";
import { Head, useForm } from "@inertiajs/vue3";
import { ref } from 'vue';
// import { showPassword } from "@/utils"; // Dihapus

// Logic show/hide password baru
const showPassword = ref(false);
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};
// ---

const form = useForm({
    password: "",
});

const submit = () => {
    form.post(route("password.confirm"), {
        onFinish: () => form.reset(),
    });
};
</script>

<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap">
    <Head title="Konfirmasi Password - SEEO" />

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
                            <h2 class="h3 fw-bold mb-2">Area Aman</h2>
                            <p class="text-muted">Konfirmasi kata sandi Anda.</p>
                        </div>
                        
                        <div class="mb-4 text-muted small" style="text-align: justify;">
                            Ini adalah area aman aplikasi. Harap konfirmasi kata sandi Anda sebelum melanjutkan.
                        </div>

                        <form @submit.prevent="submit">
                            <div class="mb-3 form-floating position-relative">
                                <input
                                    id="password"
                                    :type="showPassword ? 'text' : 'password'"
                                    class="form-control"
                                    v-model="form.password"
                                    required
                                    autocomplete="current-password"
                                    autofocus
                                    placeholder="Kata Sandi"
                                />
                                <label for="password">Kata Sandi</label>
                                <button
                                    type="button"
                                    @click="togglePasswordVisibility"
                                    class="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2 border-0"
                                    style="z-index:2;"
                                >
                                    <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/></svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.94 5.94 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.16.163-.32.321-.478.481l.77.771zm-1.605-1.605c.16-.16.32-.321.478-.481.635-.634 1.13-1.274 1.465-1.755.073-.105.137-.20.195-.288A13.133 13.133 0 0 0 8 3.5a5.94 5.94 0 0 0-.77.076l.77.771z"/><path d="M14.082 9.182a.5.5 0 0 1 .53-.642c.262.068.526.148.79.24.098.034.2.07.303.111.01.004.02.007.03.011a.5.5 0 0 1-.254.99c-.066.014-.132.028-.2.042-.264.068-.53.148-.796.24-.098.034-.2.07-.303.111a.5.5 0 0 1-.53-.642zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/><path d="M12.5 8a4.5 4.5 0 0 1-8.31 2.802l1.018-.948a3.5 3.5 0 1 1 5.218-3.666l.94.94a4.5 4.5 0 0 1 1.134 3.77z"/><path d="M1.36 2.111L.11 3.36a.5.5 0 0 0 0 .707l14.142 14.142a.5.5 0 0 0 .707 0l1.25-1.25a.5.5 0 0 0 0-.707L2.067 2.111a.5.5 0 0 0-.707 0z"/></svg>
                                </button>
                                <InputError
                                    id="password_icon"
                                    class="mt-1"
                                    :message="form.errors.password"
                                />
                            </div>

                            <div class="d-grid mt-4">
                                <button
                                    class="btn btn-primary btn-lg"
                                    :class="{ 'opacity-25': form.processing }"
                                    :disabled="form.processing"
                                >
                                    <span v-if="form.processing" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span v-if="form.processing"> Mengkonfirmasi...</span>
                                    <span v-else>Konfirmasi</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
body, .container-fluid, .card, .form-label, .form-control, .btn, .fw-bolder, .fw-bold, .fw-light, .h3, .h2, .h1, .display-4, .lead, .text-muted {
    font-family: 'Poppins', Arial, Helvetica, sans-serif !important;
}
</style>