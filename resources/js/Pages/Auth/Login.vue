<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap">
    <Head title="Login - SEEO" />

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
                            <h2 class="h3 fw-bold mb-2">Masuk ke Akun</h2>
                            <p class="text-muted">Selamat datang kembali!</p>
                        </div>

                        <form @submit.prevent="submit_login">
                            <div class="mb-3 form-floating">
                                <input
                                    id="email"
                                    type="email"
                                    v-model="form_login.email"
                                    autocomplete="username"
                                    required
                                    class="form-control"
                                    placeholder="Alamat Email"
                                />
                                <label for="email">Alamat Email</label>
                                <InputError :message="form_login.errors.email" class="mt-1" />
                            </div>

                            <div class="mb-3 form-floating position-relative">
                                <input
                                    id="password"
                                    :type="showPassword ? 'text' : 'password'"
                                    v-model="form_login.password"
                                    autocomplete="current-password"
                                    required
                                    class="form-control"
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
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16"><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.94 5.94 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.16.163-.32.321-.478.481l.77.771zm-1.605-1.605c.16-.16.32-.321.478-.481.635-.634 1.13-1.274 1.465-1.755.073-.105.137-.20.195-.288A13.133 13.133 0 0 0 8 3.5a5.94 5.94 0 0 0-.77.076l.77.771z"/><path d="M14.082 9.182a.5.5 0 0 1 .53-.642c.262.068.526.148.79.24.098.034.2.07.303.111.01.004.02.007.03.011a.5.5 0 0 1-.254.99c-.066.014-.132.028-.2.042-.264.068-.53.148-.796.24-.098.034-.2.07-.303.111a.5.5 0 0 1-.53-.642zM4.5 8a3.5 3.5 0 0 1-7 0z"/><path d="M12.5 8a4.5 4.5 0 0 1-8.31 2.802l1.018-.948a3.5 3.5 0 1 1 5.218-3.666l.94.94a4.5 4.5 0 0 1 1.134 3.77z"/><path d="M1.36 2.111L.11 3.36a.5.5 0 0 0 0 .707l14.142 14.142a.5.5 0 0 0 .707 0l1.25-1.25a.5.5 0 0 0 0-.707L2.067 2.111a.5.5 0 0 0-.707 0z"/></svg>
                                </button>
                                <InputError :message="form_login.errors.password" class="mt-1" />
                            </div>
                            
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <div class="form-check">
                                    <Checkbox
                                        id="remember_me"
                                        v-model:checked="form_login.remember"
                                        class="form-check-input" 
                                    />
                                    <label class="form-check-label ms-1" for="remember_me">
                                        Ingat saya
                                    </label>
                                </div>
                                <Link 
                                    href="/forgot-password" 
                                    class="text-primary text-decoration-none"
                                >
                                    Lupa kata sandi?
                                </Link>
                            </div>

                            <div class="d-grid mb-3">
                                <button
                                    type="submit"
                                    :disabled="form_login.processing"
                                    class="btn btn-primary btn-lg"
                                >
                                    <span v-if="form_login.processing" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span v-if="form_login.processing"> Memproses...</span>
                                    <span v-else>Login</span>
                                </button>
                            </div>
                        </form>
                        
                        <div class="d-flex align-items-center my-3">
                            <hr class="flex-grow-1">
                            <span class="mx-2 text-muted small">Atau</span>
                            <hr class="flex-grow-1">
                        </div>
                        
                        <div class="d-grid mb-3">
                            <Link 
                                href="/google/auth"
                                class="btn btn-outline-dark btn-lg d-flex justify-content-center align-items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google me-2" viewBox="0 0 16 16">
                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                                </svg>
                                Masuk dengan Google
                            </Link>
                        </div>

                        <div class="text-center text-muted">
                            Belum punya akun?
                            <Link 
                                href="/register" 
                                class="fw-bold text-primary text-decoration-none"
                            >
                                Daftar sekarang
                            </Link>
                        </div>
                        
                        <!-- <div class="text-center border-top pt-3">
                            <Link 
                                href="/" 
                                class="text-muted text-decoration-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left me-1" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                                Kembali ke Beranda
                            </Link>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import InputError from "@/Components/InputError.vue";
import Checkbox from "@/Components/Checkbox.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { ref } from 'vue';

const showPassword = ref(false);

const form_login = useForm({
    email: "",
    password: "",
    remember: false,
});

const submit_login = () => {
    form_login.post('/login', {
        onFinish: () => form_login.reset("password"),
    });
};

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};
</script>

<style scoped>
body, .container-fluid, .card, .form-label, .form-control, .btn, .fw-bolder, .fw-bold, .fw-light, .h3, .h2, .h1, .display-4, .lead, .text-muted {
    font-family: 'Poppins', Arial, Helvetica, sans-serif !important;
}
/* Style tambahan untuk tombol google */
.btn-outline-dark {
    border-color: #cdd3d8;
    color: #333;
}
.btn-outline-dark:hover {
    background-color: #f8f9fa;
    color: #000;
}
</style>