<template>
    <Head>
        <!-- Bootstrap CSS via CDN as fallback -->
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
            rel="stylesheet"
        />
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet"
        />
    </Head>

    <div class="authentication-container">
        <div class="container-fluid">
            <div class="row justify-content-center align-items-center min-vh-100">
                <div class="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <div class="authentication-card">
                        <div class="text-center mb-4">
                            <Link
                                href="/"
                                class="text-decoration-none"
                            >
                                <img
                                    src="/storage/local/images/compro/logo.png"
                                    alt="SEEO Logo"
                                    class="mb-3"
                                    width="60"
                                />
                                <h4 class="text-primary">SEEO</h4>
                            </Link>
                            <p class="text-muted small">Authentication System</p>
                        </div>

                        <!-- Auth Content -->
                        <slot />

                        <div class="text-center mt-4">
                            <Link
                                href="/"
                                class="text-decoration-none text-muted small"
                            >
                                ← Back to Homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { onMounted } from 'vue';

// Load Bootstrap CSS and JS dynamically
onMounted(async () => {
    // Load Bootstrap CSS
    await import('../../css/bootstrap.css');
    
    // Load Bootstrap JS dynamically
    if (!window.bootstrap) {
        const bootstrap = await import('bootstrap/dist/js/bootstrap.bundle.min.js');
        window.bootstrap = bootstrap;
    }
});
</script>

<style scoped>
.authentication-container {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    font-family: 'Poppins', sans-serif;
}

.authentication-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.min-vh-100 {
    min-height: 100vh !important;
}

/* Custom form styling */
:deep(.form-control) {
    border-radius: 8px;
    border: 1px solid #e0e6ed;
    transition: all 0.3s ease;
}

:deep(.form-control:focus) {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

:deep(.btn-primary) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 8px;
    transition: all 0.3s ease;
}

:deep(.btn-primary:hover) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

:deep(.btn-outline-primary) {
    border-color: #667eea;
    color: #667eea;
    border-radius: 6px;
}

:deep(.btn-outline-primary:hover) {
    background-color: #667eea;
    border-color: #667eea;
}
</style>
