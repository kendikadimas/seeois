<script setup>
import { onMounted, ref } from 'vue';

defineProps({
    steps: {
        type: Array,
        default: () => [
            { icon: 'bi-journal-arrow-up', text: 'Upload logbook harian Anda', action: '#logbook-upload' },
            { icon: 'bi-wallet2', text: 'Cek status pembayaran IWP', action: '#iwp-payment' }
        ]
    }
});

const isClosed = ref(false);

onMounted(() => {
    isClosed.value = localStorage.getItem('welcomeBannerClosed') === 'true';
});

const closeBanner = () => {
    isClosed.value = true;
    localStorage.setItem('welcomeBannerClosed', 'true');
};

const handleStepClick = (step) => {
    window.location.href = step.action;
};
</script>

<template>
    <div v-if="!isClosed" class="welcome-banner bg-gradient-primary text-white rounded-4 shadow-lg p-3 p-md-4 mb-4 position-relative overflow-hidden">
        <div class="position-absolute top-0 end-0 p-2 z-3">
            <button 
                type="button" 
                class="btn-close btn-close-white opacity-75" 
                @click="closeBanner"
                aria-label="Tutup banner"
            ></button>
        </div>

        <div class="row align-items-center g-3">
            <div class="col-12 col-lg-4">
                <div class="d-flex align-items-center gap-2 mb-2">
                    <div class="welcome-icon bg-white bg-opacity-20 rounded-circle p-2">
                        <i class="bi bi-hand-thumbs-up-fill fs-5"></i>
                    </div>
                    <div class="text-truncate flex-grow-1">
                        <h5 class="mb-0 fw-bold fs-6">Selamat Datang!</h5>
                        <p class="mb-0 text-white text-opacity-85 small">Silakan lakukan aktivitas harian</p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-8">
                <div class="small fw-semibold mb-2">Apa yang perlu saya lakukan hari ini?</div>
                <div class="row g-2">
                    <div 
                        v-for="(step, idx) in steps" 
                        :key="idx"
                        class="col-12 col-sm-6 col-lg-4"
                    >
                        <button
                            type="button"
                            class="btn btn-light w-100 text-start d-flex align-items-center gap-2 p-2 shadow-sm border-0 hover-scale"
                            style="font-size: 0.85rem;"
                            @click="handleStepClick(step)"
                        >
                            <i :class="['bi', step.icon, 'fs-6 text-primary flex-shrink-0']"></i>
                            <span class="small fw-medium text-dark text-truncate">{{ step.text }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="banner-decoration position-absolute bottom-0 end-0 opacity-10">
            <i class="bi bi-stars fs-1"></i>
        </div>
    </div>
</template>

<style scoped>
.welcome-banner {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    animation: fadeInDown 0.5s ease-out;
}

@keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

.hover-scale {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-scale:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.welcome-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.banner-decoration {
    font-size: 8rem;
    line-height: 1;
    pointer-events: none;
}
</style>
