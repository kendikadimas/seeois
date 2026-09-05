<script setup>
import StaffLayout from "@/Layouts/StaffLayout.vue";
import InputError from "@/Components/InputError.vue";
import Notif from "@/Components/Notif.vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import RoleWorkflowGuideModal from "@/Components/RoleWorkflowGuideModal.vue";
import { getRoleWorkflow } from "@/utils/roleWorkflows";
import { useForm, usePage } from "@inertiajs/vue3";
import { ref, computed, watch, onMounted, nextTick } from "vue";

const props = defineProps({
    post_list: Array,
    billboard_list: Array,
    attachment_list: Array,
    notif: Object,
    errors: Object,
    monitoring: { type: Object, default: () => ({}) },
});

const page = usePage();
const auth_user = computed(() => page.props.auth?.user || {});
const userRoleId = computed(() => Number(auth_user.value?.roles_id || 0));
const userRoleName = computed(() => auth_user.value?.role_name || 'Staff');
const selectedYear = computed(() => page.props.selected_year || new Date().getFullYear());

// Role Workflow info
const currentWorkflow = computed(() => getRoleWorkflow(userRoleId.value, userRoleName.value));

const title = ref("Dashboard");
const modalConfirmationRef = ref(null);
const toastNotifRef = ref(null);
const guideModalRef = ref(null);

// Modal instances
const modal_post_instance = ref(null);
const modal_attachment_instance = ref(null);
const modal_billboard_instance = ref(null);

// Safe route helper
const route = (name, params = {}) => {
    if (typeof window.route === 'function') {
        try {
            return window.route(name, params);
        } catch (e) {
            console.warn(`Route ${name} error:`, e);
        }
    }
    return '#';
};

// Forms
const form_billboard = useForm({
    billboard_title: "",
    billboard_typeText: false,
    billboard_typeImage: false,
    billboard_text: "",
    billboard_image: null,
});
const form_attachment = useForm({
    attachment_title: "",
    attachment_type: "document",
    attachment_link: "",
    attachment_document: null,
});
const form_post = useForm({
    post_text: "",
    post_username: false,
});

// Computed properties for attachments
const document_list = computed(() => props.attachment_list?.filter(a => a.type === 0) || []);
const link_list = computed(() => props.attachment_list?.filter(a => a.type === 1) || []);

// Helper mapping for monitoring alert links
function getMonitoringLink(label) {
    if (label.includes('Stok')) return route('staff.production.panel.index');
    if (label.includes('resep')) return route('staff.sales-distribution.index');
    if (label.includes('Pengantaran')) return route('staff.sales-distribution.index');
    if (label.includes('Logbook')) return route('operating.panel');
    if (label.includes('Internship')) return route('internship.applications.index');
    return '#';
}

function handleFormErrors(responseErrors, formErrors) {
     const errorsToShow = Object.keys(responseErrors).length > 0 ? responseErrors : formErrors;
     console.error("Form submission failed:", errorsToShow);
     if (toastNotifRef.value) {
         for (const key in errorsToShow) {
             const messages = Array.isArray(errorsToShow[key]) ? errorsToShow[key] : [errorsToShow[key]];
             messages.forEach(msg => {
                 toastNotifRef.value.showToast('warning', msg);
             });
         }
     }
}

function handleSubmitBillboard() {
    if (!form_billboard.billboard_typeText && !form_billboard.billboard_typeImage) {
        toastNotifRef.value?.showToast('warning', 'Pilih minimal satu tipe billboard.'); return;
    }
    form_billboard.post("/seeo/staff/billboard/add", {
        preserveScroll: true,
        onSuccess: () => {
            form_billboard.reset();
            modal_billboard_instance.value?.hide();
            toastNotifRef.value?.showToast('info','Billboard berhasil ditambahkan.');
        },
        onError: () => { handleFormErrors(page.props.errors, form_billboard.errors); }
    });
}

function handleFileBillboard(event) { 
    const file = event.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
        toastNotifRef.value?.showToast('warning', 'File terlalu besar! Batas upload server Anda saat ini adalah 2MB.');
    }
    form_billboard.billboard_image = file || null; 
}

function handleSubmitAttachment() {
    form_attachment.post("/seeo/staff/attachment/add", {
        preserveScroll: true,
        onSuccess: () => {
            form_attachment.reset();
            modal_attachment_instance.value?.hide();
            toastNotifRef.value?.showToast('info', 'Attachment berhasil ditambahkan.');
        },
        onError: () => { handleFormErrors(page.props.errors, form_attachment.errors); }
    });
}

function handleFileAttachment(event) { 
    const file = event.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
        toastNotifRef.value?.showToast('warning', 'File terlalu besar! Batas upload server Anda saat ini adalah 2MB.');
    }
    form_attachment.attachment_document = file || null; 
}

function handleSubmitPost() {
    form_post.post("/seeo/staff/dashboard/post/add", {
        preserveScroll: true,
        onSuccess: () => {
            form_post.reset();
            modal_post_instance.value?.hide();
            toastNotifRef.value?.showToast('info', 'Postingan baru berhasil dibuat.');
        },
        onError: () => { handleFormErrors(page.props.errors, form_post.errors); }
    });
}

function getProfileImage(user) {
    if (!user) return '/storage/images/profile/example.png';
    return (
        user.drive_profile_image_url ||
        user.full_profile_image_url ||
        '/storage/images/profile/example.png'
    );
}

function confirmation(routeUrl, message) {
     if (!routeUrl || routeUrl === '#') {
         toastNotifRef.value?.showToast('danger', 'Aksi tidak valid.');
         return;
     }
    modalConfirmationRef.value?.showModal(routeUrl, message);
}

function showModalBillboard() {
    if (modal_billboard_instance.value) modal_billboard_instance.value.show();
    else toastNotifRef.value?.showToast('danger', 'Gagal membuka modal Billboard.');
}

function showModalPost() {
    if (modal_post_instance.value) modal_post_instance.value.show();
    else toastNotifRef.value?.showToast('danger', 'Gagal membuka modal Post.');
}

function showModalAttachment() {
    if (modal_attachment_instance.value) modal_attachment_instance.value.show();
    else toastNotifRef.value?.showToast('danger', 'Gagal membuka modal Attachment.');
}

function openGuide() {
    guideModalRef.value?.open(userRoleId.value);
}

watch(() => props.notif, (newValue) => {
     if (newValue && toastNotifRef.value) { toastNotifRef.value.showToast(newValue.type, newValue.message); }
}, { deep: true, immediate: true });

watch(() => props.errors, (newErrors) => {
     if (newErrors && Object.keys(newErrors).length > 0 && toastNotifRef.value) {
         handleFormErrors(newErrors, {});
     }
}, { deep: true, immediate: true });

onMounted(async () => {
    await nextTick();
    if (typeof window.bootstrap !== 'undefined') {
        const carouselElement = document.getElementById('billboardCarousel');
        if (carouselElement && props.billboard_list?.length > 0) {
            try { window.bootstrap.Carousel.getOrCreateInstance(carouselElement); } catch(e) { console.error("Carousel Err:", e); }
        }
        const bbModalEl = document.getElementById("setBillboardModal");
        if (bbModalEl) try { modal_billboard_instance.value = window.bootstrap.Modal.getOrCreateInstance(bbModalEl); } catch(e) {}
        const attModalEl = document.getElementById("addAttachmentModal");
        if (attModalEl) try { modal_attachment_instance.value = window.bootstrap.Modal.getOrCreateInstance(attModalEl); } catch(e) {}
        const postModalEl = document.getElementById("addPostModal");
        if (postModalEl) try { modal_post_instance.value = window.bootstrap.Modal.getOrCreateInstance(postModalEl); } catch(e) {}
    }
});
</script>

<template>
    <StaffLayout>
        <ModalConfirmation ref="modalConfirmationRef" />
        <RoleWorkflowGuideModal ref="guideModalRef" />
        <template #header> {{ title }} </template>

        <div class="dashboard-command-center py-2">
            <!-- ================= HERO ROLE COMMAND BANNER ================= -->
            <div class="hero-role-card card border-0 shadow-sm rounded-4 mb-4 overflow-hidden text-white" :style="{ background: currentWorkflow.theme?.gradient || 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 100%)' }">
                <div class="card-body p-4 position-relative">
                    <div class="row align-items-center g-3">
                        <div class="col-12 col-lg-8">
                            <div class="d-flex align-items-center gap-2 mb-2 flex-wrap">
                                <span class="badge rounded-pill bg-white bg-opacity-20 text-white px-3 py-1 fw-medium">
                                    <i class="bi bi-person-circle me-1"></i> {{ auth_user.name }}
                                </span>
                                <span class="badge rounded-pill bg-warning text-dark px-3 py-1 fw-bold">
                                    <i :class="['bi', currentWorkflow.icon || 'bi-stars', 'me-1']"></i> {{ currentWorkflow.title }}
                                </span>
                                <span class="badge rounded-pill bg-white bg-opacity-20 text-white px-3 py-1">
                                    Tahun Periode: {{ selectedYear }}
                                </span>
                            </div>
                            <h2 class="hero-title fw-bold mb-2 text-white">
                                Selamat Datang di Pusat Komando Peran Anda 👋
                            </h2>
                            <p class="hero-mission text-white text-opacity-90 mb-0 small lh-base" style="max-width: 680px;">
                                {{ currentWorkflow.mission }}
                            </p>
                        </div>
                        <div class="col-12 col-lg-4 d-flex justify-content-lg-end">
                            <button
                                type="button"
                                class="btn btn-warning text-dark fw-bold rounded-pill shadow-sm px-4 py-2 d-inline-flex align-items-center gap-2 hover-scale transition-all"
                                @click="openGuide"
                            >
                                <i class="bi bi-lightbulb-fill fs-5"></i>
                                <span>Buka Panduan & SOP Peran</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= DAILY WORKFLOW STEPPER CARDS ================= -->
            <div class="daily-workflow-section mb-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h5 class="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                            <i class="bi bi-signpost-2-fill text-primary"></i>
                            Alur Tugas Harian ({{ currentWorkflow.alias }})
                        </h5>
                        <small class="text-muted">Ikuti alur bertahap di bawah ini untuk menyelesaikan tugas pokok peran Anda.</small>
                    </div>
                    <button
                        type="button"
                        class="btn btn-sm btn-link text-primary text-decoration-none fw-semibold p-0"
                        @click="openGuide"
                    >
                        Lihat Kamus & FAQ <i class="bi bi-arrow-right"></i>
                    </button>
                </div>

                <div class="row g-3">
                    <div
                        v-for="(st, idx) in currentWorkflow.steps"
                        :key="idx"
                        class="col-12 col-md-6 col-xl-3"
                    >
                        <div class="step-card card h-100 border-0 shadow-sm rounded-4 p-3 d-flex flex-column justify-content-between transition-all" :style="{ backgroundColor: currentWorkflow.theme?.lightBg || '#ffffff' }">
                            <div>
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <div
                                        class="step-badge-num fw-bold text-white rounded-circle shadow-2xs"
                                        :style="{ backgroundColor: currentWorkflow.theme?.accentColor || '#4f46e5' }"
                                    >
                                        {{ st.step }}
                                    </div>
                                    <span class="badge bg-white text-secondary border small">
                                        Langkah {{ st.step }}
                                    </span>
                                </div>
                                <h6 class="fw-bold text-dark mb-1">{{ st.title }}</h6>
                                <p class="small text-secondary mb-3 lh-sm">{{ st.desc }}</p>
                            </div>
                            <div>
                                <a
                                    :href="route(st.route) + (st.hash || '')"
                                    class="btn btn-sm w-100 text-white rounded-pill fw-medium d-flex align-items-center justify-content-center gap-2 shadow-2xs"
                                    :style="{ backgroundColor: currentWorkflow.theme?.accentColor || '#4f46e5' }"
                                >
                                    <span>{{ st.btnText }}</span>
                                    <i class="bi bi-arrow-right-short fs-6"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ================= ATTENTION / MONITORING METRICS (IF ANY) ================= -->
            <div v-if="Object.keys(monitoring).length" class="monitoring-section mb-4">
                <div class="mb-2">
                    <h6 class="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                        <i class="bi bi-bell-fill text-danger"></i>
                        Perhatian & Tugas Tertunda
                    </h6>
                    <small class="text-muted">Item yang memerlukan tindakan cepat dari Anda saat ini.</small>
                </div>
                <div class="row g-2">
                    <div
                        v-for="(count, label) in monitoring"
                        :key="label"
                        class="col-6 col-md-3"
                    >
                        <a
                            :href="getMonitoringLink(label)"
                            class="card border-0 shadow-sm rounded-3 text-decoration-none transition-all hover-lift"
                            :class="count > 0 ? 'border-start border-4 border-warning bg-white' : 'bg-light text-muted'"
                        >
                            <div class="card-body p-3 d-flex justify-content-between align-items-center">
                                <div>
                                    <div class="small text-secondary text-truncate" style="max-width: 150px;">{{ label }}</div>
                                    <div class="fs-4 fw-bold" :class="count > 0 ? 'text-danger' : 'text-muted'">{{ count }}</div>
                                </div>
                                <div class="rounded-circle p-2 bg-light text-secondary">
                                    <i class="bi bi-arrow-up-right-square"></i>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <!-- ================= QUICK SHORTCUTS GRID ================= -->
            <div class="quick-shortcuts-section mb-4">
                <div class="mb-2">
                    <h6 class="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                        <i class="bi bi-grid-fill text-primary"></i>
                        Aksi Cepat Peran Anda
                    </h6>
                </div>
                <div class="row g-2">
                    <div
                        v-for="(qa, idx) in currentWorkflow.quickActions"
                        :key="idx"
                        class="col-6 col-sm-4 col-md-3 col-xl-2"
                    >
                        <a
                            :href="route(qa.route) + (qa.hash || '')"
                            class="quick-action-card card border-0 shadow-sm rounded-3 p-3 text-center text-decoration-none bg-white transition-all hover-lift h-100 d-flex flex-column align-items-center justify-content-center"
                        >
                            <div class="qa-icon-wrapper rounded-circle p-3 mb-2 shadow-2xs" :class="'bg-' + (qa.color || 'primary') + '-subtle text-' + (qa.color || 'primary')">
                                <i :class="['bi', qa.icon, 'fs-4']"></i>
                            </div>
                            <span class="small fw-bold text-dark lh-sm text-truncate w-100">{{ qa.title }}</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- ================= BOTTOM TWO-COLUMN GRID (BILLBOARDS, ATTACHMENTS, POSTS) ================= -->
            <div class="row g-3">
                <!-- Left Column (8 cols): Billboard & Attachments -->
                <div class="col-12 col-lg-8 d-flex flex-column gap-3">
                    <!-- Billboard Carousel Card -->
                    <div class="card shadow-sm border-0 rounded-4 overflow-hidden bg-white">
                        <div class="card-header bg-white border-0 py-3 px-4 d-flex justify-content-between align-items-center">
                            <h6 class="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                                <i class="bi bi-megaphone-fill text-warning"></i>
                                Papan Pengumuman (Billboard)
                            </h6>
                            <button
                                v-if="auth_user.roles_id === 1 || auth_user.roles_id === 99"
                                class="btn btn-sm btn-primary rounded-pill px-3 shadow-2xs"
                                @click="showModalBillboard"
                            >
                                <i class="bi bi-plus-lg me-1"></i> Tambah Banner
                            </button>
                        </div>
                        <div class="card-body p-0 position-relative">
                            <div v-if="!billboard_list || billboard_list.length === 0" class="empty-billboard d-flex flex-column align-items-center justify-content-center p-5 text-center bg-light" style="min-height: 220px;">
                                <i class="bi bi-images display-5 text-muted opacity-50 mb-2"></i>
                                <h6 class="text-secondary mb-1">Belum Ada Banner Pengumuman</h6>
                                <p class="small text-muted mb-0">Informasi dan agenda penting kepengurusan akan ditampilkan di sini.</p>
                            </div>
                            <div v-else id="billboardCarousel" class="carousel slide" data-bs-ride="carousel" style="max-height: 380px;">
                                <div class="carousel-inner">
                                    <div
                                        v-for="(billboard, index) in billboard_list"
                                        :key="billboard.id"
                                        :class="['carousel-item', index === 0 ? 'active' : '']"
                                    >
                                        <div class="billboard-wrapper position-relative">
                                            <button
                                                v-if="auth_user.roles_id == 1 || auth_user.roles_id === 99"
                                                class="btn btn-danger btn-sm rounded-circle p-0 lh-1 position-absolute m-3 shadow"
                                                style="z-index: 15; width: 32px; height: 32px; top: 0; right: 0;"
                                                @click="confirmation(`/seeo/staff/billboard/delete/${billboard.id}`, `Hapus billboard '${billboard.title}'?`)"
                                                title="Hapus Banner"
                                            >
                                                <i class="bi bi-trash3-fill small"></i>
                                            </button>
                                            <img
                                                v-if="billboard.image && billboard.full_image_url"
                                                :src="billboard.full_image_url"
                                                alt="Billboard"
                                                class="w-100 object-fit-cover"
                                                style="max-height: 380px;"
                                                @error="$event.target.style.display='none'"
                                            />
                                            <div v-else class="d-flex flex-column justify-content-center align-items-center text-center p-5 bg-light w-100" style="min-height: 240px;">
                                                <h4 class="fw-bold text-dark mb-2">{{ billboard.title }}</h4>
                                                <p class="text-secondary mb-0 small" style="max-width: 500px;">{{ billboard.text }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button v-if="billboard_list.length > 1" class="carousel-control-prev" type="button" data-bs-target="#billboardCarousel" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button v-if="billboard_list.length > 1" class="carousel-control-next" type="button" data-bs-target="#billboardCarousel" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Attachments (Documents & Links) -->
                    <div class="card shadow-sm border-0 rounded-4 bg-white grow">
                        <div class="card-header bg-white border-0 py-3 px-4 d-flex justify-content-between align-items-center">
                            <h6 class="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                                <i class="bi bi-paperclip text-primary"></i>
                                Berkas & Tautan Penting Organisasi
                            </h6>
                            <button
                                v-if="auth_user.roles_id === 1 || auth_user.roles_id === 8 || auth_user.roles_id === 99"
                                class="btn btn-sm btn-outline-primary rounded-pill px-3 shadow-2xs"
                                @click="showModalAttachment"
                            >
                                <i class="bi bi-plus-lg me-1"></i> Tambah Berkas
                            </button>
                        </div>
                        <div class="card-body pt-0 px-4 pb-4">
                            <div class="row g-3">
                                <!-- Documents Column -->
                                <div class="col-12 col-md-6">
                                    <div class="p-3 rounded-3 bg-light h-100">
                                        <h6 class="small fw-bold text-secondary text-uppercase tracking-wider mb-2">
                                            <i class="bi bi-file-earmark-pdf-fill text-danger me-1"></i> Dokumen Resmi
                                        </h6>
                                        <div v-if="document_list.length === 0" class="text-center py-4 text-muted small">
                                            Belum ada dokumen yang diunggah.
                                        </div>
                                        <div v-else class="d-flex flex-column gap-2">
                                            <div
                                                v-for="doc in document_list"
                                                :key="doc.id"
                                                class="d-flex justify-content-between align-items-center p-2 rounded-2 bg-white border shadow-2xs"
                                            >
                                                <a
                                                    :href="`/storage/document/attachment/${doc.document}`"
                                                    class="text-decoration-none text-dark fw-medium small text-truncate me-2"
                                                    download
                                                    :title="doc.title"
                                                >
                                                    <i class="bi bi-file-earmark-arrow-down text-primary me-1"></i>
                                                    {{ doc.title }}
                                                </a>
                                                <button
                                                    v-if="auth_user.roles_id === 1 || auth_user.roles_id === 8 || auth_user.roles_id === 99"
                                                    class="btn btn-sm btn-link text-danger p-0"
                                                    @click="confirmation(`/seeo/staff/attachment/delete/${doc.id}`, `Hapus attachment '${doc.title}'?`)"
                                                    title="Hapus"
                                                >
                                                    <i class="bi bi-trash3"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- External Links Column -->
                                <div class="col-12 col-md-6">
                                    <div class="p-3 rounded-3 bg-light h-100">
                                        <h6 class="small fw-bold text-secondary text-uppercase tracking-wider mb-2">
                                            <i class="bi bi-link-45deg text-primary me-1"></i> Tautan Cepat
                                        </h6>
                                        <div v-if="link_list.length === 0" class="text-center py-4 text-muted small">
                                            Belum ada link eksternal.
                                        </div>
                                        <div v-else class="d-flex flex-column gap-2">
                                            <div
                                                v-for="lnk in link_list"
                                                :key="lnk.id"
                                                class="d-flex justify-content-between align-items-center p-2 rounded-2 bg-white border shadow-2xs"
                                            >
                                                <a
                                                    :href="lnk.link"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    class="text-decoration-none text-primary fw-medium small text-truncate me-2"
                                                    :title="lnk.title"
                                                >
                                                    <i class="bi bi-box-arrow-up-right me-1"></i>
                                                    {{ lnk.title }}
                                                </a>
                                                <button
                                                    v-if="auth_user.roles_id === 1 || auth_user.roles_id === 8 || auth_user.roles_id === 99"
                                                    class="btn btn-sm btn-link text-danger p-0"
                                                    @click="confirmation(`/seeo/staff/attachment/delete/${lnk.id}`, `Hapus link '${lnk.title}'?`)"
                                                    title="Hapus"
                                                >
                                                    <i class="bi bi-trash3"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column (4 cols): SEEO Post Feed -->
                <div class="col-12 col-lg-4">
                    <div class="card shadow-sm border-0 rounded-4 h-100 bg-white d-flex flex-column overflow-hidden">
                        <div class="card-header bg-primary text-white py-3 px-3 d-flex justify-content-between align-items-center">
                            <h6 class="mb-0 fw-bold d-flex align-items-center gap-2">
                                <i class="bi bi-chat-quote-fill text-warning"></i>
                                SEEO Post (Feed)
                            </h6>
                            <button
                                class="btn btn-sm btn-light rounded-circle shadow-2xs p-0 d-flex align-items-center justify-content-center"
                                style="width: 32px; height: 32px;"
                                @click="showModalPost"
                                title="Buat Postingan Baru"
                            >
                                <i class="bi bi-plus-lg text-primary fw-bold"></i>
                            </button>
                        </div>
                        <div class="card-body p-3 grow overflow-auto" style="max-height: 600px;">
                            <div v-if="!post_list || post_list.length === 0" class="text-center py-5 text-muted small">
                                <i class="bi bi-chat-dots display-6 opacity-50 d-block mb-2"></i>
                                Belum ada postingan. Jadilah yang pertama berbagi!
                            </div>
                            <div v-else class="d-flex flex-column gap-2">
                                <div
                                    v-for="post in post_list"
                                    :key="post.id"
                                    class="post-bubble p-3 rounded-3 bg-light border shadow-2xs transition-all"
                                >
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <div class="d-flex align-items-center gap-2 text-truncate">
                                            <img
                                                :src="post.full_profile_image_url || getProfileImage(post.user)"
                                                alt="Avatar"
                                                class="rounded-circle shadow-2xs"
                                                style="width: 28px; height: 28px; object-fit: cover;"
                                                @error="$event.target.src='/storage/images/profile/example.png'"
                                            />
                                            <div class="lh-1 text-truncate">
                                                <div class="fw-bold small text-dark text-truncate" style="max-width: 140px;">
                                                    {{ post.anonymus ? 'Anonymous' : post.user?.name }}
                                                </div>
                                                <small class="text-muted text-3xs">{{ new Date(post.created_at).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short'}) }}</small>
                                            </div>
                                        </div>
                                        <button
                                            v-if="auth_user.roles_id === 99 || auth_user.roles_id === 1 || auth_user.id == post.user_id"
                                            class="btn btn-sm btn-link text-danger p-0"
                                            @click="confirmation(`/seeo/staff/dashboard/post/remove/${post.id}`, 'Hapus postingan ini?')"
                                            title="Hapus Post"
                                        >
                                            <i class="bi bi-trash3 small"></i>
                                        </button>
                                    </div>
                                    <p class="mb-0 small text-secondary lh-sm">{{ post.text }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ================= MODALS (BILLBOARD, ATTACHMENT, POST) ================= -->
        <!-- Add Billboard Modal -->
        <div class="modal fade" id="setBillboardModal" tabindex="-1" aria-labelledby="setBillboardModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content rounded-4 border-0 shadow">
                    <form @submit.prevent="handleSubmitBillboard">
                        <div class="modal-header">
                            <h5 class="modal-title fw-bold" id="setBillboardModalLabel">Tambah Banner Billboard Baru</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4">
                            <div class="mb-3">
                                <label for="billboard_title_modal" class="form-label fw-semibold">Judul Pengumuman <span class="text-danger">*</span></label>
                                <input type="text" class="form-control rounded-3" id="billboard_title_modal" v-model="form_billboard.billboard_title" required placeholder="Contoh: Rapat Pleno Tahunan">
                                <InputError :message="errors.billboard_title || form_billboard.errors.billboard_title" class="mt-1" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-semibold">Format Konten <span class="text-danger">*</span></label>
                                <div class="d-flex gap-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" v-model="form_billboard.billboard_typeText" id="billboard_typeText_modal">
                                        <label class="form-check-label" for="billboard_typeText_modal">Teks Pesan</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" v-model="form_billboard.billboard_typeImage" id="billboard_typeImage_modal">
                                        <label class="form-check-label" for="billboard_typeImage_modal">Gambar Poster (16:9)</label>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3" v-if="form_billboard.billboard_typeText">
                                <label for="billboard_text_modal" class="form-label fw-semibold">Isi Teks Pengumuman <span class="text-danger">*</span></label>
                                <textarea class="form-control rounded-3" id="billboard_text_modal" rows="3" v-model="form_billboard.billboard_text" :required="form_billboard.billboard_typeText" placeholder="Tuliskan pesan lengkap..."></textarea>
                                <InputError :message="errors.billboard_text || form_billboard.errors.billboard_text" class="mt-1" />
                            </div>
                            <div class="mb-3" v-if="form_billboard.billboard_typeImage">
                                <label for="billboard_image_modal" class="form-label fw-semibold">File Gambar Poster <span class="text-danger">*</span></label>
                                <input class="form-control rounded-3" type="file" id="billboard_image_modal" @input="handleFileBillboard" accept="image/jpeg,image/png,image/heic" :required="form_billboard.billboard_typeImage">
                                <div class="form-text small">Format JPG, PNG. Maks: 2MB.</div>
                                <InputError :message="errors.billboard_image || form_billboard.errors.billboard_image" class="mt-1" />
                            </div>
                        </div>
                        <div class="modal-footer bg-light border-top p-3">
                            <button type="button" class="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal">Batal</button>
                            <button type="submit" class="btn btn-primary rounded-pill px-4 fw-semibold" :disabled="form_billboard.processing">
                                <span v-if="form_billboard.processing" class="spinner-border spinner-border-sm me-1"></span> Simpan Billboard
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Add Attachment Modal -->
        <div class="modal fade" id="addAttachmentModal" tabindex="-1" aria-labelledby="addAttachmentModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content rounded-4 border-0 shadow">
                    <form @submit.prevent="handleSubmitAttachment">
                        <div class="modal-header">
                            <h5 class="modal-title fw-bold" id="addAttachmentModalLabel">Tambah Lampiran Berkas / Tautan</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4">
                            <div class="mb-3">
                                <label for="attachment_title_modal" class="form-label fw-semibold">Nama Berkas / Judul <span class="text-danger">*</span></label>
                                <input type="text" class="form-control rounded-3" id="attachment_title_modal" v-model="form_attachment.attachment_title" required placeholder="Contoh: AD/ART Organisasi 2026">
                                <InputError :message="errors.attachment_title || form_attachment.errors.attachment_title" class="mt-1" />
                            </div>
                            <div class="mb-3">
                                <label for="attachment_type_modal" class="form-label fw-semibold">Tipe Lampiran <span class="text-danger">*</span></label>
                                <select class="form-select rounded-3" id="attachment_type_modal" v-model="form_attachment.attachment_type" required>
                                    <option value="document">Dokumen File (PDF / Word / Gambar)</option>
                                    <option value="link">Tautan Eksternal (Google Drive / Form / Website)</option>
                                </select>
                            </div>
                            <div class="mb-3" v-if="form_attachment.attachment_type === 'document'">
                                <label for="attachment_document_modal" class="form-label fw-semibold">Pilih Berkas File <span class="text-danger">*</span></label>
                                <input class="form-control rounded-3" type="file" id="attachment_document_modal" @input="handleFileAttachment" accept=".pdf,.doc,.docx,.png,.jpeg,.jpg,.heic" :required="form_attachment.attachment_type === 'document'">
                                <div class="form-text small">PDF, DOCX, PNG, JPG. Maksimal 2MB.</div>
                                <InputError :message="errors.attachment_document || form_attachment.errors.attachment_document" class="mt-1" />
                            </div>
                            <div class="mb-3" v-if="form_attachment.attachment_type === 'link'">
                                <label for="attachment_link_modal" class="form-label fw-semibold">URL Alamat Tautan <span class="text-danger">*</span></label>
                                <input type="url" class="form-control rounded-3" id="attachment_link_modal" v-model="form_attachment.attachment_link" placeholder="https://..." :required="form_attachment.attachment_type === 'link'">
                                <InputError :message="errors.attachment_link || form_attachment.errors.attachment_link" class="mt-1" />
                            </div>
                        </div>
                        <div class="modal-footer bg-light border-top p-3">
                            <button type="button" class="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal">Batal</button>
                            <button type="submit" class="btn btn-primary rounded-pill px-4 fw-semibold" :disabled="form_attachment.processing">
                                <span v-if="form_attachment.processing" class="spinner-border spinner-border-sm me-1"></span> Simpan Lampiran
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Add Post Modal -->
        <div class="modal fade" id="addPostModal" tabindex="-1" aria-labelledby="addPostModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content rounded-4 border-0 shadow">
                    <form @submit.prevent="handleSubmitPost">
                        <div class="modal-header">
                            <h5 class="modal-title fw-bold" id="addPostModalLabel">Buat Postingan Baru di Feed SEEO</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4">
                            <div class="mb-3">
                                <label for="post_text_modal" class="form-label fw-semibold">Tulis Pesan <span class="text-danger">*</span></label>
                                <textarea class="form-control rounded-3" id="post_text_modal" rows="4" v-model="form_post.post_text" required maxlength="255" placeholder="Bagikan informasi atau kabar ke seluruh staf..."></textarea>
                                <div class="form-text text-end small">{{ form_post.post_text?.length || 0 }}/255 karakter</div>
                                <InputError :message="errors.post_text || form_post.errors.post_text" class="mt-1" />
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" v-model="form_post.post_username" id="post_username_modal">
                                <label class="form-check-label" for="post_username_modal">Kirim sebagai Anonymous (Nama Disamarkan)</label>
                            </div>
                        </div>
                        <div class="modal-footer bg-light border-top p-3">
                            <button type="button" class="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal">Batal</button>
                            <button type="submit" class="btn btn-primary rounded-pill px-4 fw-semibold" :disabled="form_post.processing">
                                <span v-if="form_post.processing" class="spinner-border spinner-border-sm me-1"></span> Terbitkan Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <Notif ref="toastNotifRef" />
    </StaffLayout>
</template>

<style scoped>
.dashboard-command-center {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}

/* Hero Card */
.hero-role-card {
    position: relative;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}
.hero-title {
    font-size: 1.5rem;
    letter-spacing: -0.02em;
}

/* Stepper Card */
.step-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.step-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08) !important;
}
.step-badge-num {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
}

/* Quick Action Cards */
.qa-icon-wrapper {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.quick-action-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.08) !important;
}

/* Post bubble */
.post-bubble:hover {
    background-color: #f1f5f9 !important;
}

/* Utility */
.shadow-2xs {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.text-3xs {
    font-size: 0.68rem;
}
.hover-lift:hover {
    transform: translateY(-2px);
}
.hover-scale:hover {
    transform: scale(1.03);
}
</style>
