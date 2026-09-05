<script setup>
import { ref, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { getRoleWorkflow, ROLE_WORKFLOWS } from '@/utils/roleWorkflows';

const page = usePage();
const authUser = computed(() => page.props.auth?.user || {});
const userRoleId = computed(() => Number(authUser.value?.roles_id || 0));
const userRoleName = computed(() => authUser.value?.role_name || 'Staff');

// Modal visibility state
const isOpen = ref(false);

// Active Tab inside guide
const activeTab = ref('steps'); // 'steps' | 'glossary' | 'faqs' | 'all-roles'

// Selected role for preview (default to user's current role)
const selectedRoleId = ref(userRoleId.value);

// Check if user is Super Admin or CEO (can inspect other roles)
const isElevated = computed(() => userRoleId.value === 99 || userRoleId.value === 1);

// Active workflow being viewed
const currentWorkflow = computed(() => {
    return getRoleWorkflow(selectedRoleId.value, userRoleName.value);
});

// Route helper (safe Ziggy)
const route = (name, params = {}) => {
    if (typeof window.route === 'function') {
        try {
            return window.route(name, params);
        } catch (e) {
            console.warn(`Route ${name} resolution error:`, e);
        }
    }
    return '#';
};

function open(roleId = null) {
    selectedRoleId.value = roleId !== null ? Number(roleId) : userRoleId.value;
    activeTab.value = 'steps';
    isOpen.value = true;
    document.body.style.overflow = 'hidden';
}

function close() {
    isOpen.value = false;
    document.body.style.overflow = '';
}

function selectRole(roleId) {
    selectedRoleId.value = Number(roleId);
    activeTab.value = 'steps';
}

defineExpose({ open, close });
</script>

<template>
    <!-- Modal Backdrop & Container -->
    <Teleport to="body">
        <transition name="fade">
            <div
                v-if="isOpen"
                class="guide-modal-backdrop"
                @click.self="close"
                tabindex="-1"
            >
                <div class="guide-modal-container" role="dialog" aria-modal="true">
                    <!-- Modal Header -->
                    <div class="guide-modal-header text-white" :style="{ background: currentWorkflow.theme?.gradient || 'linear-gradient(135deg, #1e1b4b, #3730a3)' }">
                        <div class="d-flex justify-content-between align-items-start w-100">
                            <div class="d-flex align-items-center gap-3">
                                <div class="guide-role-icon shadow-sm">
                                    <i :class="['bi', currentWorkflow.icon || 'bi-stars']"></i>
                                </div>
                                <div>
                                    <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
                                        <span class="badge rounded-pill bg-white bg-opacity-25 text-white fw-normal px-2 py-1">
                                            {{ currentWorkflow.category }}
                                        </span>
                                        <span v-if="selectedRoleId === userRoleId" class="badge rounded-pill bg-warning text-dark fw-bold px-2 py-1">
                                            <i class="bi bi-person-check-fill me-1"></i> Peran Anda
                                        </span>
                                    </div>
                                    <h4 class="guide-modal-title mb-0 fw-bold">
                                        {{ currentWorkflow.title }}
                                        <small class="fs-6 opacity-75 fw-normal d-block d-md-inline ms-md-2">
                                            ({{ currentWorkflow.alias }})
                                        </small>
                                    </h4>
                                </div>
                            </div>
                            <button
                                type="button"
                                class="btn btn-close-custom text-white"
                                @click="close"
                                aria-label="Tutup"
                            >
                                <i class="bi bi-x-lg fs-5"></i>
                            </button>
                        </div>

                        <!-- Role Mission Summary -->
                        <div class="guide-mission-card mt-3 p-2 px-3 rounded-3 bg-white bg-opacity-15 small">
                            <i class="bi bi-info-circle-fill me-2 text-warning"></i>
                            <span>{{ currentWorkflow.mission }}</span>
                        </div>

                        <!-- Tab Navigators -->
                        <div class="guide-tabs mt-3 d-flex gap-2 border-top border-white border-opacity-20 pt-2 flex-wrap">
                            <button
                                class="guide-tab-btn"
                                :class="{ active: activeTab === 'steps' }"
                                @click="activeTab = 'steps'"
                            >
                                <i class="bi bi-123 me-1"></i> Alur Kerja Harian (SOP)
                            </button>
                            <button
                                v-if="currentWorkflow.glossary && currentWorkflow.glossary.length > 0"
                                class="guide-tab-btn"
                                :class="{ active: activeTab === 'glossary' }"
                                @click="activeTab = 'glossary'"
                            >
                                <i class="bi bi-book me-1"></i> Kamus Istilah
                            </button>
                            <button
                                v-if="currentWorkflow.faqs && currentWorkflow.faqs.length > 0"
                                class="guide-tab-btn"
                                :class="{ active: activeTab === 'faqs' }"
                                @click="activeTab = 'faqs'"
                            >
                                <i class="bi bi-question-circle me-1"></i> Tanya Jawab (FAQ)
                            </button>
                            <button
                                v-if="isElevated"
                                class="guide-tab-btn ms-auto"
                                :class="{ active: activeTab === 'all-roles' }"
                                @click="activeTab = 'all-roles'"
                            >
                                <i class="bi bi-layers me-1"></i> Beralih Panduan Role Lain
                            </button>
                        </div>
                    </div>

                    <!-- Modal Body -->
                    <div class="guide-modal-body p-3 p-md-4">
                        <!-- TAB 1: STEPS (ALUR KERJA HARIAN) -->
                        <div v-if="activeTab === 'steps'" class="steps-container">
                            <div class="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                                <div>
                                    <h6 class="fw-bold mb-1 text-dark">
                                        <i class="bi bi-signpost-split-fill text-primary me-2"></i>
                                        Langkah Kerja Harian Mandiri
                                    </h6>
                                    <small class="text-muted">Ikuti alur kerja berikut secara berurutan agar aktivitas peran Anda tercatat rapi.</small>
                                </div>
                                <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1">
                                    {{ currentWorkflow.steps?.length || 0 }} Langkah Utama
                                </span>
                            </div>

                            <div class="timeline-stepper">
                                <div
                                    v-for="(st, idx) in currentWorkflow.steps"
                                    :key="idx"
                                    class="stepper-item d-flex gap-3 mb-4"
                                >
                                    <!-- Stepper Number & Connector -->
                                    <div class="stepper-track d-flex flex-column align-items-center">
                                        <div
                                            class="stepper-circle fw-bold text-white shadow-sm"
                                            :style="{ backgroundColor: currentWorkflow.theme?.accentColor || '#4f46e5' }"
                                        >
                                            {{ st.step }}
                                        </div>
                                        <div v-if="idx < (currentWorkflow.steps.length - 1)" class="stepper-line grow"></div>
                                    </div>

                                    <!-- Stepper Content Card -->
                                    <div class="stepper-card card border-0 shadow-sm p-3 w-100 rounded-3" :style="{ backgroundColor: currentWorkflow.theme?.lightBg || '#f8fafc' }">
                                        <div class="d-flex justify-content-between align-items-start gap-2 flex-wrap mb-2">
                                            <div class="d-flex align-items-center gap-2">
                                                <div class="step-icon-badge text-white rounded p-1 px-2" :style="{ backgroundColor: currentWorkflow.theme?.accentColor || '#4f46e5' }">
                                                    <i :class="['bi', st.icon || 'bi-arrow-right-circle']"></i>
                                                </div>
                                                <h6 class="mb-0 fw-bold text-dark">{{ st.title }}</h6>
                                            </div>
                                            <span class="badge bg-white text-secondary border small">
                                                Langkah ke-{{ st.step }}
                                            </span>
                                        </div>
                                        <p class="small text-secondary mb-3 lh-sm">
                                            {{ st.desc }}
                                        </p>
                                        <div class="d-flex justify-content-end">
                                            <a
                                                :href="route(st.route) + (st.hash || '')"
                                                class="btn btn-sm text-white fw-medium shadow-sm d-inline-flex align-items-center gap-2 rounded-pill px-3"
                                                :style="{ backgroundColor: currentWorkflow.theme?.accentColor || '#4f46e5' }"
                                                @click="close"
                                            >
                                                <span>{{ st.btnText }}</span>
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- TAB 2: GLOSSARY (KAMUS ISTILAH) -->
                        <div v-else-if="activeTab === 'glossary'" class="glossary-container">
                            <div class="mb-3 pb-2 border-bottom">
                                <h6 class="fw-bold mb-1 text-dark">
                                    <i class="bi bi-book-half text-primary me-2"></i>
                                    Kamus Istilah & Simbol Operasional
                                </h6>
                                <small class="text-muted">Pahami istilah penting dalam peran Anda tanpa perlu membaca buku panduan tebal.</small>
                            </div>

                            <div class="row g-3">
                                <div
                                    v-for="(item, idx) in currentWorkflow.glossary"
                                    :key="idx"
                                    class="col-12 col-md-6"
                                >
                                    <div class="card h-100 border-0 shadow-sm p-3 rounded-3 bg-light">
                                        <div class="d-flex align-items-center gap-2 mb-2">
                                            <span class="badge bg-primary text-white">Istilah</span>
                                            <h6 class="fw-bold mb-0 text-dark">{{ item.term }}</h6>
                                        </div>
                                        <p class="small text-secondary mb-0 lh-sm">
                                            {{ item.desc }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- TAB 3: FAQS (TANYA JAWAB) -->
                        <div v-else-if="activeTab === 'faqs'" class="faqs-container">
                            <div class="mb-3 pb-2 border-bottom">
                                <h6 class="fw-bold mb-1 text-dark">
                                    <i class="bi bi-patch-question-fill text-primary me-2"></i>
                                    Pertanyaan Sering Ditanyakan (FAQ)
                                </h6>
                                <small class="text-muted">Solusi cepat untuk kendala yang kerap dihadapi saat mengoperasikan sistem.</small>
                            </div>

                            <div class="d-flex flex-column gap-3">
                                <div
                                    v-for="(faq, idx) in currentWorkflow.faqs"
                                    :key="idx"
                                    class="card border-0 shadow-sm p-3 rounded-3"
                                >
                                    <h6 class="fw-bold text-dark d-flex align-items-start gap-2 mb-2">
                                        <span class="badge bg-danger rounded-circle p-1 px-2">Q</span>
                                        <span>{{ faq.q }}</span>
                                    </h6>
                                    <div class="p-2 px-3 rounded bg-light border-start border-3 border-success small text-secondary">
                                        <strong class="text-success me-1">Jawaban:</strong>
                                        <span>{{ faq.a }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- TAB 4: ALL ROLES SWITCHER (ELEVATED ONLY) -->
                        <div v-else-if="activeTab === 'all-roles'" class="all-roles-container">
                            <div class="mb-3 pb-2 border-bottom">
                                <h6 class="fw-bold mb-1 text-dark">
                                    <i class="bi bi-people-fill text-primary me-2"></i>
                                    Lihat SOP & Panduan Seluruh Role
                                </h6>
                                <small class="text-muted">Sebagai Pimpinan/Admin, Anda dapat meninjau alur kerja peran lain untuk keperluan pengawasan.</small>
                            </div>

                            <div class="row g-2">
                                <div
                                    v-for="(wf, rId) in ROLE_WORKFLOWS"
                                    :key="rId"
                                    class="col-12 col-sm-6 col-lg-4"
                                >
                                    <button
                                        type="button"
                                        class="btn w-100 text-start p-2 rounded-3 border d-flex align-items-center gap-2"
                                        :class="selectedRoleId === Number(rId) ? 'border-primary bg-primary-subtle' : 'bg-white hover-light'"
                                        @click="selectRole(rId)"
                                    >
                                        <div class="rounded-circle p-2 text-white d-flex align-items-center justify-content-center" :style="{ backgroundColor: wf.theme?.accentColor || '#4f46e5', width: '36px', height: '36px' }">
                                            <i :class="['bi', wf.icon || 'bi-person']"></i>
                                        </div>
                                        <div class="text-truncate">
                                            <div class="fw-bold small text-dark text-truncate">{{ wf.title }}</div>
                                            <small class="text-muted d-block text-truncate">{{ wf.alias }}</small>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Footer -->
                    <div class="guide-modal-footer bg-light p-3 px-4 border-top d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center gap-2 small text-muted">
                            <i class="bi bi-lightbulb-fill text-warning"></i>
                            <span>Panduan terpadu SEEOIS v5.0 — Bebas bingung tanpa guidebook terpisah!</span>
                        </div>
                        <button
                            type="button"
                            class="btn btn-primary rounded-pill px-4 fw-medium"
                            @click="close"
                        >
                            <i class="bi bi-check2-circle me-1"></i> Paham & Tutup
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<style scoped>
.guide-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(4px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.guide-modal-container {
    background: #ffffff;
    width: 100%;
    max-width: 850px;
    max-height: 90vh;
    border-radius: 1rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalSlideUp {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.guide-modal-header {
    padding: 1.5rem 1.5rem 0.75rem 1.5rem;
    flex-shrink: 0;
}

.guide-role-icon {
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.btn-close-custom {
    background: rgba(255, 255, 255, 0.15);
    border: none;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-close-custom:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
}

.guide-tabs {
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
}

.guide-tab-btn {
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.8);
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.2s;
    cursor: pointer;
}

.guide-tab-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
}

.guide-tab-btn.active {
    background: rgba(255, 255, 255, 0.25);
    color: #ffffff;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.guide-modal-body {
    overflow-y: auto;
    flex-grow: 1;
}

/* Stepper Track */
.stepper-track {
    width: 36px;
    flex-shrink: 0;
}

.stepper-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    z-index: 2;
}

.stepper-line {
    width: 2px;
    background-color: #cbd5e1;
    min-height: 24px;
    margin: 4px 0;
}

.hover-light:hover {
    background-color: #f1f5f9 !important;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
