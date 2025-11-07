<script setup>
import StaffLayout from "@/Layouts/StaffLayout.vue";
import InputError from "@/Components/InputError.vue";
import Notif from "@/Components/Notif.vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import { useForm, usePage, Link } from "@inertiajs/vue3";
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { route } from 'ziggy-js'; // Ziggy helper, use named import

const props = defineProps({
    post_list: Array,
    billboard_list: Array,
    attachment_list: Array,
    notif: Object,
    errors: Object, // Error dari session flash
});

const auth_user = usePage().props.auth.user;
const title = ref("Dashboard");
const modalConfirmationRef = ref(null);
const toastNotifRef = ref(null);

// Refs untuk menyimpan instance Modal Bootstrap
const modal_post_instance = ref(null);
const modal_attachment_instance = ref(null);
const modal_billboard_instance = ref(null);

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
    post_username: false, // Default tidak anonim
});

// Computed properties
const document_list = computed(() => props.attachment_list?.filter(a => a.type === 0) || []);
const link_list = computed(() => props.attachment_list?.filter(a => a.type === 1) || []);

// --- Fungsi Handler Form ---
function handleFormErrors(responseErrors, formErrors) {
     const errorsToShow = Object.keys(responseErrors).length > 0 ? responseErrors : formErrors;
     console.error("Form submission failed:", errorsToShow);
     if (toastNotifRef.value) {
         for (const key in errorsToShow) {
             const message = Array.isArray(errorsToShow[key]) ? errorsToShow[key][0] : errorsToShow[key];
             toastNotifRef.value.showToast('warning', message);
         }
     }
}

function handleSubmitBillboard() {
    if (!form_billboard.billboard_typeText && !form_billboard.billboard_typeImage) {
        toastNotifRef.value?.showToast('warning', 'Pilih minimal satu tipe billboard.'); return;
    }
    form_billboard.post(route("billboard.add"), {
        preserveScroll: true,
        onSuccess: () => { form_billboard.reset(); modal_billboard_instance.value?.hide(); toastNotifRef.value?.showToast('info','Billboard ditambahkan.'); },
        onError: (errors) => { handleFormErrors(usePage().props.errors, form_billboard.errors); }
    });
}
function handleFileBillboard(event) { form_billboard.billboard_image = event.target.files[0] || null; }

function handleSubmitAttachment() {
    form_attachment.post(route("attachment.add"), {
        preserveScroll: true,
        onSuccess: () => { form_attachment.reset(); modal_attachment_instance.value?.hide(); toastNotifRef.value?.showToast('info', 'Attachment ditambahkan.'); },
        onError: (errors) => { handleFormErrors(usePage().props.errors, form_attachment.errors); }
    });
}
function handleFileAttachment(event) { form_attachment.attachment_document = event.target.files[0] || null; }

function handleSubmitPost() {
    form_post.post(route("post.add"), {
        preserveScroll: true,
        onSuccess: () => { form_post.reset(); modal_post_instance.value?.hide(); toastNotifRef.value?.showToast('info', 'Post ditambahkan.'); },
        onError: (errors) => { handleFormErrors(usePage().props.errors, form_post.errors); }
    });
}
// --- Akhir Handler Form ---

// --- Fungsi Helper Tampilan ---
// function setBillboardImage(billboard_image) { return `/storage/images/billboard/${billboard_image}`; }
function setBillboardImage(billboard_image) {
    if (!billboard_image) return null;
    // Gunakan path langsung yang sama seperti VerifyEmail
    return `/storage/local/images/billboard/${billboard_image}`;
}
function setPostImage(isAnonymus, profile_image) {
    const defaultImage = 'example.png';
    const image = isAnonymus ? defaultImage : (profile_image || defaultImage);
    return `/storage/local/images/profile/${image}`;
}
// --- Akhir Helper Tampilan ---

// --- Fungsi Modal ---
function confirmation(routeUrl, message) { // Menerima URL string
     if (!routeUrl || routeUrl === '#') {
         console.error("Invalid route URL passed to confirmation:", routeUrl);
         toastNotifRef.value?.showToast('danger', 'Aksi tidak valid.');
         return;
     }
    modalConfirmationRef.value?.showModal(routeUrl, message);
}function showModalBillboard() {
    if (modal_billboard_instance.value) modal_billboard_instance.value.show();
    else { console.error("Billboard modal instance not ready."); toastNotifRef.value?.showToast('danger', 'Gagal membuka modal Billboard.'); }
}
function showModalPost() {
    if (modal_post_instance.value) modal_post_instance.value.show();
    else { console.error("Post modal instance not ready."); toastNotifRef.value?.showToast('danger', 'Gagal membuka modal Post.'); }
}
function showModalAttachment() {
    if (modal_attachment_instance.value) modal_attachment_instance.value.show();
    else { console.error("Attachment modal instance not ready."); toastNotifRef.value?.showToast('danger', 'Gagal membuka modal Attachment.'); }
}
// --- Akhir Fungsi Modal ---

// Watchers
watch(() => props.notif, (newValue) => {
     if (newValue && toastNotifRef.value) { toastNotifRef.value.showToast(newValue.type, newValue.message); }
}, { deep: true, immediate: true });
watch(() => props.errors,(newErrors) => {
     if (newErrors && Object.keys(newErrors).length > 0 && toastNotifRef.value) {
         console.warn("Flash errors detected:", newErrors); handleFormErrors(newErrors, {});
     }
}, { deep: true, immediate: true });

onMounted(async () => {
    await nextTick();
    if (typeof window.bootstrap !== 'undefined') {
        // Init Carousel
        const carouselElement = document.getElementById('billboardCarousel');
        if (carouselElement && props.billboard_list?.length > 0) {
            try { window.bootstrap.Carousel.getOrCreateInstance(carouselElement); } catch(e) { console.error("Carousel Init Err:", e); }
        }
        // Init Modals
        const bbModalEl = document.getElementById("setBillboardModal");
        if (bbModalEl) try { modal_billboard_instance.value = window.bootstrap.Modal.getOrCreateInstance(bbModalEl); } catch(e) { console.error("BB Modal Err:", e); } else console.error("#setBillboardModal not found!");
        const attModalEl = document.getElementById("addAttachmentModal");
        if (attModalEl) try { modal_attachment_instance.value = window.bootstrap.Modal.getOrCreateInstance(attModalEl); } catch(e) { console.error("Att Modal Err:", e); } else console.error("#addAttachmentModal not found!");
        const postModalEl = document.getElementById("addPostModal");
        if (postModalEl) try { modal_post_instance.value = window.bootstrap.Modal.getOrCreateInstance(postModalEl); } catch(e) { console.error("Post Modal Err:", e); } else console.error("#addPostModal not found!");
    } else console.error("window.bootstrap is undefined.");
});
</script>

<template>
    <StaffLayout>
        <ModalConfirmation ref="modalConfirmationRef" />
        <template #header> {{ title }} </template>

    <div class="container-fluid g-0">
        <div class="row g-0 vh-100 overflow-hidden">

            <div class="col-12 d-flex flex-column bg-light overflow-hidden">

                <main class="dashboard-content flex-grow-1 overflow-auto p-2 p-lg-3">
                    <div class="row gx-2 gy-3 gy-lg-3 gx-lg-3">
                        <div class="col-12 col-lg-9 d-flex flex-column">
                            <div class="card shadow-sm mb-2 mb-lg-3 flex-shrink-0 rounded-3 border-0">
                                <div class="card-body p-0 position-relative rounded-3 overflow-hidden">
                                    <div v-if="!billboard_list || billboard_list.length === 0" class="empty-billboard d-flex align-items-center justify-content-center p-4" style="min-height: 200px; max-height: 360px; background-color: #e9ecef;">
                                         <button class="btn btn-primary btn-lg" @click="showModalBillboard" v-if="auth_user.roles_id === 1"> <i class="bi bi-plus-circle me-2"></i> <span>Tambah Billboard</span> </button>
                                         <span v-else class="text-muted fs-5">Selamat Datang!</span>
                                    </div>
                                    <div v-else id="billboardCarousel" class="carousel slide" data-bs-ride="carousel" style="max-height: 360px;">
                                        <div v-if="auth_user.roles_id === 1" class="position-absolute top-0 end-0 p-2" style="z-index: 20;">
                                            <button class="btn btn-sm btn-light me-1" @click="showModalBillboard" title="Tambah Billboard Baru"> <i class="bi bi-plus-lg"></i> </button>
                                        </div>
                                        <div class="carousel-inner rounded-3">
                                             <div v-for="(billboard, index) in billboard_list" :key="billboard.id" :class="['carousel-item', index === 0 ? 'active' : '']">
                                                <div class="billboard-wrapper position-relative">
                                                     <button v-if="auth_user.roles_id == 1" class="btn btn-danger btn-sm rounded-circle p-0 lh-1 position-absolute m-2" style="z-index: 11; width: 28px; height: 28px; top: 0.35rem; right: 3rem;" @click="confirmation( route('billboard.remove', { id: billboard.id }), 'Hapus billboard \'' + billboard.title + '\'?' )"> <i class="bi bi-x-lg small"></i> </button>
                                                    <img v-if="billboard.image && setBillboardImage(billboard.image)" :src="setBillboardImage(billboard.image)" alt="Billboard" @error="$event.target.style.display='none'"/>
                                                    <div v-else-if="!billboard.image && billboard.text" class="d-flex flex-column justify-content-center align-items-center text-center p-4 bg-light w-100 h-100"> <h3 class="mb-2">{{ billboard.title }}</h3> <p class="mb-0">{{ billboard.text }}</p> </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button v-if="billboard_list && billboard_list.length > 1" class="carousel-control-prev" type="button" data-bs-target="#billboardCarousel" data-bs-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="visually-hidden">Previous</span> </button>
                                        <button v-if="billboard_list && billboard_list.length > 1" class="carousel-control-next" type="button" data-bs-target="#billboardCarousel" data-bs-slide="next"> <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="visually-hidden">Next</span> </button>
                                    </div>
                                </div>
                            </div>
                            <div class="card shadow-sm flex-grow-1 rounded-3 border-0">
                                <div class="card-header d-flex justify-content-between align-items-center py-2 bg-white border-0 border-bottom rounded-top">
                                    <h5 class="mb-0 fs-6 fw-medium text-secondary"> <i class="bi bi-paperclip me-2"></i> Attachments </h5>
                                    <button v-if="auth_user.roles_id === 1" class="btn btn-outline-success btn-sm rounded-circle p-0 lh-1" style="width: 28px; height: 28px;" @click="showModalAttachment" title="Tambah Attachment"> <i class="bi bi-plus-lg"></i> </button>
                                </div>
                                <div class="card-body pt-2">
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <h6 class="text-muted small mb-2"><i class="bi bi-file-earmark-text me-1"></i> Documents</h6>
                                            <div class="attachment-list list-group list-group-flush small scroll-container-sm">
                                                <div v-if="document_list.length === 0" class="list-group-item text-muted text-center py-3 border-0 fst-italic"> <small>No documents.</small> </div>
                                                <div v-else v-for="document in document_list" :key="document.id" class="list-group-item d-flex justify-content-between align-items-center px-0 py-1 border-bottom">
                                                    <a :href="`/storage/document/attachment/${document.document}`" class="text-decoration-none text-dark text-truncate me-2" download :title="document.title"> {{ document.title }} </a>
                                                    <button v-if="auth_user.roles_id === 1" class="btn btn-outline-danger border-0 btn-sm py-0 px-1" @click="confirmation( route('attachment.remove', { id: document.id }), 'Hapus \'' + document.title + '\'?' )"> <i class="bi bi-trash3"></i> </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <h6 class="text-muted small mb-2"><i class="bi bi-link-45deg me-1"></i> Links</h6>
                                            <div class="attachment-list list-group list-group-flush small scroll-container-sm">
                                                 <div v-if="link_list.length === 0" class="list-group-item text-muted text-center py-3 border-0 fst-italic"> <small>No links.</small> </div>
                                                <div v-else v-for="link in link_list" :key="link.id" class="list-group-item d-flex justify-content-between align-items-center px-0 py-1 border-bottom">
                                                    <a :href="link.link" target="_blank" rel="noopener noreferrer" class="text-decoration-none text-primary text-truncate me-2" :title="link.title"> {{ link.title }} </a>
                                                    <button v-if="auth_user.roles_id === 1" class="btn btn-outline-danger border-0 btn-sm py-0 px-1" @click="confirmation( route('attachment.remove', { id: link.id }), 'Hapus \'' + link.title + '\'?' )"> <i class="bi bi-trash3"></i> </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </div>
                        <div class="col-12 col-lg-3 d-flex">
                             <div class="card shadow-sm h-100 w-100 d-flex flex-column">
                                <div class="card-header d-flex justify-content-between align-items-center py-2 bg-primary text-white">
                                    <h4 class="mb-0 fs-6 fw-medium"> <i class="bi bi-send me-2"></i> SEEO POST </h4>
                                    <button class="btn btn-light btn-sm rounded-circle p-0 lh-1" style="width: 28px; height: 28px;" @click="showModalPost" title="Buat Postingan"> <i class="bi bi-plus-lg text-primary"></i> </button>
                                </div>
                                <div class="card-body d-flex flex-column overflow-hidden p-2" style="max-height: calc(100vh - 180px);">
                                    <div v-if="!post_list || post_list.length === 0" class="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center text-muted p-4">
                                        <i class="bi bi-chat-square-dots display-5 mb-3 opacity-50"></i>
                                        <h6 class="mb-1 text-secondary">Belum Ada Postingan</h6>
                                        <p class="small mb-0 text-secondary">Jadilah yang pertama berbagi!</p>
                                    </div>
                                    <div v-else class="posts-list flex-grow-1 overflow-auto pe-1">
                                        <div v-for="post in post_list" :key="post.id" class="post-card bg-light border rounded p-2 mb-2">
                                            <div class="d-flex justify-content-between align-items-start mb-1">
                                                <div class="d-flex align-items-center text-truncate me-2">
                                                    <img :src="setPostImage(post.anonymus, post.user?.profile_image)" alt="Avatar" class="rounded-circle me-2" style="width: 24px; height: 24px; object-fit: cover;"/>
                                                    <div class="lh-sm">
                                                        <h6 class="mb-0 small fw-bold text-truncate" style="max-width: 150px;">{{ post.anonymus ? 'Anonymous' : post.user?.name }}</h6>
                                                        <small class="text-muted" style="font-size: 0.7rem;">{{ new Date(post.created_at).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short'}) }}</small>
                                                    </div>
                                                </div>
                                                <button v-if="auth_user.roles_id === 1 || (!post.anonymus && auth_user.id == post.user_id)"
                                                    class="btn btn-outline-danger border-0 btn-sm py-0 px-1 flex-shrink-0"
                                                    @click="confirmation( route('post.remove', { id: post.id }), 'Hapus post ini?' )">
                                                    <i class="bi bi-trash3 small"></i>
                                                </button>
                                            </div>
                                            <p class="mb-0 small post-text" style="max-height: 110px; overflow: hidden;">{{ post.text }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </div>
                     </div>
                 </main>
                 <button class="btn btn-primary rounded-circle shadow fab d-lg-none" @click="showModalPost" title="Buat Postingan" style="width: 56px; height: 56px;">
                    <i class="bi bi-send-plus fs-4"></i>
                 </button>
            </div>
        </div>
    </div>

    <div class="modal fade" id="setBillboardModal" tabindex="-1" aria-labelledby="setBillboardModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <form @submit.prevent="handleSubmitBillboard">
                    <div class="modal-header"> <h1 class="modal-title fs-5" id="setBillboardModalLabel">Tambah Billboard Baru</h1> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> </div>
                    <div class="modal-body">
                         <div class="mb-3"> <label for="billboard_title_modal" class="form-label">Judul <span class="text-danger">*</span></label> <input type="text" class="form-control" id="billboard_title_modal" v-model="form_billboard.billboard_title" required> <InputError :message="errors.billboard_title || form_billboard.errors.billboard_title" class="mt-1" /> </div>
                         <div class="mb-3"> <label class="form-label">Tipe <span class="text-danger">*</span></label> <div class="d-flex gap-3"> <div class="form-check"> <input class="form-check-input" type="checkbox" v-model="form_billboard.billboard_typeText" id="billboard_typeText_modal"> <label class="form-check-label" for="billboard_typeText_modal"> Teks </label> </div> <div class="form-check"> <input class="form-check-input" type="checkbox" v-model="form_billboard.billboard_typeImage" id="billboard_typeImage_modal"> <label class="form-check-label" for="billboard_typeImage_modal"> Gambar </label> </div> </div> </div>
                         <div class="mb-3" v-if="form_billboard.billboard_typeText"> <label for="billboard_text_modal" class="form-label">Teks <span class="text-danger">*</span></label> <textarea class="form-control" id="billboard_text_modal" rows="3" v-model="form_billboard.billboard_text" :required="form_billboard.billboard_typeText"></textarea> <InputError :message="errors.billboard_text || form_billboard.errors.billboard_text" class="mt-1" /> </div>
                         <div class="mb-3" v-if="form_billboard.billboard_typeImage"> <label for="billboard_image_modal" class="form-label">Gambar <span class="text-danger">*</span></label> <input class="form-control" type="file" id="billboard_image_modal" @input="handleFileBillboard" accept="image/jpeg,image/png,image/heic" :required="form_billboard.billboard_typeImage"> <div class="form-text">JPG, PNG, HEIC. Maks: 5MB.</div> <InputError :message="errors.billboard_image || form_billboard.errors.billboard_image" class="mt-1" /> </div>
                    </div>
                    <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button> <button type="submit" class="btn btn-primary" :disabled="form_billboard.processing"> <span v-if="form_billboard.processing" class="spinner-border spinner-border-sm me-1" aria-hidden="true"></span> Simpan </button> </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Add Attachment Modal -->
    <div class="modal fade" id="addAttachmentModal" tabindex="-1" aria-labelledby="addAttachmentModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                 <form @submit.prevent="handleSubmitAttachment">
                    <div class="modal-header"> <h1 class="modal-title fs-5" id="addAttachmentModalLabel">Tambah Attachment</h1> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> </div>
                    <div class="modal-body">
                         <div class="mb-3"> <label for="attachment_title_modal" class="form-label">Judul <span class="text-danger">*</span></label> <input type="text" class="form-control" id="attachment_title_modal" v-model="form_attachment.attachment_title" required> <InputError :message="errors.attachment_title || form_attachment.errors.attachment_title" class="mt-1" /> </div>
                         <div class="mb-3"> <label for="attachment_type_modal" class="form-label">Tipe <span class="text-danger">*</span></label> <select class="form-select" id="attachment_type_modal" v-model="form_attachment.attachment_type" required> <option value="document">Dokumen (File)</option> <option value="link">Link Eksternal</option> </select> <InputError :message="errors.attachment_type || form_attachment.errors.attachment_type" class="mt-1" /> </div>
                         <div class="mb-3" v-if="form_attachment.attachment_type === 'document'"> <label for="attachment_document_modal" class="form-label">Dokumen <span class="text-danger">*</span></label> <input class="form-control" type="file" id="attachment_document_modal" @input="handleFileAttachment" accept=".pdf,.doc,.docx,.png,.jpeg,.jpg,.heic" :required="form_attachment.attachment_type === 'document'"> <div class="form-text">PDF, DOCX, PNG, JPG, HEIC. Maks: 5MB.</div> <InputError :message="errors.attachment_document || form_attachment.errors.attachment_document" class="mt-1" /> </div>
                         <div class="mb-3" v-if="form_attachment.attachment_type === 'link'"> <label for="attachment_link_modal" class="form-label">URL Link <span class="text-danger">*</span></label> <input type="url" class="form-control" id="attachment_link_modal" v-model="form_attachment.attachment_link" placeholder="https://contoh.com" :required="form_attachment.attachment_type === 'link'"> <InputError :message="errors.attachment_link || form_attachment.errors.attachment_link" class="mt-1" /> </div>
                    </div>
                    <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button> <button type="submit" class="btn btn-primary" :disabled="form_attachment.processing"> <span v-if="form_attachment.processing" class="spinner-border spinner-border-sm me-1" aria-hidden="true"></span> Simpan </button> </div>
                </form>
            </div>
        </div>
    </div>
     <div class="modal fade" id="addPostModal" tabindex="-1" aria-labelledby="addPostModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                 <form @submit.prevent="handleSubmitPost">
                    <div class="modal-header"> <h1 class="modal-title fs-5" id="addPostModalLabel">Buat Postingan Baru</h1> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> </div>
                    <div class="modal-body">
                         <div class="mb-3"> <label for="post_text_modal" class="form-label">Isi Postingan <span class="text-danger">*</span></label> <textarea class="form-control" id="post_text_modal" rows="4" v-model="form_post.post_text" required maxlength="255"></textarea> <div class="form-text text-end small">{{ form_post.post_text?.length || 0 }}/255 karakter</div> <InputError :message="errors.post_text || form_post.errors.post_text" class="mt-1" /> </div>
                         <div class="form-check"> <input class="form-check-input" type="checkbox" v-model="form_post.post_username" id="post_username_modal"> <label class="form-check-label" for="post_username_modal"> Posting sebagai Anonymous </label> </div>
                    </div>
                    <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button> <button type="submit" class="btn btn-primary" :disabled="form_post.processing"> <span v-if="form_post.processing" class="spinner-border spinner-border-sm me-1" aria-hidden="true"></span> Kirim </button> </div>
                </form>
            </div>
        </div>
    </div>

    <Notif ref="toastNotifRef" />
    </StaffLayout>
</template>


<style scoped>
    /* Gradient Sidebar */
    .bg-gradient-custom {
        background: linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%);
    }

    /* Billboard area keeps strict 16:9 without stretching */
    .billboard-wrapper {
        width: 100%;
        aspect-ratio: 16 / 9;
        max-height: 360px;
        overflow: hidden;
        border-top-left-radius: .375rem; /* match .rounded-top */
        border-top-right-radius: .375rem;
        background: #e9ecef;
    }
    .billboard-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
    }

    /* Container Konten Kanan */
    .dashboard-content {
        background-color: #f8fafc; /* Warna latar belakang */
    }

    /* Tinggi Kolom dan Scroll Utama */
     .row.vh-100 > [class*='col-'] {
        height: 100vh;
        overflow: hidden; /* Kolom utama tidak scroll */
    }
     .dashboard-content {
        height: calc(100vh - 65px); /* Sesuaikan tinggi header */
    }

     /* Styling Post List (Scrollable) */
    .posts-list {
         padding-right: 5px; /* Sedikit ruang untuk scrollbar */
    }
    .post-card { background-color: #ffffff; } /* Warna card post terang */
    .post-text { white-space: pre-wrap; word-break: break-word; }

    /* Attachment List Scrollable */
    .scroll-container-sm {
        max-height: 150px; /* Batasi tinggi list attachment */
        overflow-y: auto;
    }

    /* FAB */
    .fab { position: fixed; bottom: 20px; right: 20px; z-index: 1030; }

    /* Custom Scrollbar */
    .posts-list::-webkit-scrollbar, .scroll-container-sm::-webkit-scrollbar { width: 5px; height: 5px;}
    .posts-list::-webkit-scrollbar-track, .scroll-container-sm::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px;}
    .posts-list::-webkit-scrollbar-thumb, .scroll-container-sm::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 10px;}
    .posts-list::-webkit-scrollbar-thumb:hover, .scroll-container-sm::-webkit-scrollbar-thumb:hover { background: #a1a1a1; }
</style>