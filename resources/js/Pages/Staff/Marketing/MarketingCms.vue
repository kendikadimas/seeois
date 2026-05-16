<template>
    <StaffLayout>
        <template #header>Marketing CMS Panel</template>

        <div class="container-fluid p-4">
            <Notif v-if="notif" :notif="notif" />

            <!-- Navigation Tabs -->
            <ul class="nav nav-pills mb-4 bg-white p-2 rounded shadow-sm d-inline-flex border" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active fw-medium px-4" id="pills-articles-tab" data-bs-toggle="pill" data-bs-target="#pills-articles" type="button" role="tab">
                        <i class="bi bi-newspaper me-2"></i>Articles
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fw-medium px-4" id="pills-members-tab" data-bs-toggle="pill" data-bs-target="#pills-members" type="button" role="tab">
                        <i class="bi bi-people me-2"></i>Members
                    </button>
                </li>
            </ul>

            <div class="tab-content" id="pills-tabContent">
                <!-- ARTICLES SECTION -->
                <div class="tab-pane fade show active" id="pills-articles" role="tabpanel">
                    <div class="card shadow-sm border-0">
                        <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                            <h5 class="mb-0 fw-bold">Recent Articles & News</h5>
                            <button class="btn btn-primary btn-sm px-3" @click="openModal('article')">
                                <i class="bi bi-plus-lg me-1"></i> New Article
                            </button>
                        </div>
                        <div class="table-responsive">
                            <table class="table align-middle mb-0 table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th>Image</th>
                                        <th>Title & Slug</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th class="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="article in articles" :key="article.id">
                                        <td style="width: 80px;">
                                            <img v-if="article.image_url" :src="article.image_url" class="rounded shadow-sm" style="width: 60px; height: 40px; object-fit: cover;">
                                            <div v-else class="rounded bg-light d-flex align-items-center justify-content-center text-muted" style="width: 60px; height: 40px;"><i class="bi bi-image"></i></div>
                                        </td>
                                        <td>
                                            <div class="fw-bold">{{ article.title }}</div>
                                            <div class="small text-muted">{{ article.slug }}</div>
                                        </td>
                                        <td><span class="badge bg-secondary-subtle text-secondary px-2 border">{{ article.category || 'General' }}</span></td>
                                        <td>
                                            <span v-if="article.is_published" class="badge bg-success-subtle text-success">Published</span>
                                            <span v-else class="badge bg-warning-subtle text-warning text-dark">Draft</span>
                                        </td>
                                        <td class="text-center">
                                            <div class="btn-group">
                                                <button @click="editItem('article', article)" class="btn btn-sm btn-light border text-primary" title="Edit"><i class="bi bi-pencil"></i></button>
                                                <button @click="deleteItem('article', article.id)" class="btn btn-sm btn-light border text-danger" title="Delete"><i class="bi bi-trash"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="articles.length === 0">
                                        <td colspan="5" class="text-center py-5 text-muted small italic">No articles found. Write your first story!</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- MEMBERS SECTION -->
                <div class="tab-pane fade" id="pills-members" role="tabpanel">
                    <div class="card shadow-sm border-0">
                        <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                            <h5 class="mb-0 fw-bold">Staff & Member Structure</h5>
                            <button class="btn btn-primary btn-sm px-3" @click="openModal('member')">
                                <i class="bi bi-person-plus me-1"></i> Add Member
                            </button>
                        </div>
                        <div class="table-responsive">
                            <table class="table align-middle mb-0 table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th>Photo</th>
                                        <th>Name & Role</th>
                                        <th>Department</th>
                                        <th>Priority</th>
                                        <th class="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="member in members" :key="member.id">
                                        <td style="width: 80px;">
                                            <img v-if="member.image_url" :src="member.image_url" class="rounded-circle shadow-sm" style="width: 45px; height: 45px; object-fit: cover;">
                                            <div v-else class="rounded-circle bg-light d-flex align-items-center justify-content-center text-muted" style="width: 45px; height: 45px;"><i class="bi bi-person"></i></div>
                                        </td>
                                        <td>
                                            <div class="fw-bold">{{ member.name }}</div>
                                            <div class="small text-muted">{{ member.role_title }}</div>
                                        </td>
                                        <td>{{ member.department_name }}</td>
                                        <td><span class="badge bg-light text-dark border">{{ member.order_num }}</span></td>
                                        <td class="text-center">
                                            <div class="btn-group">
                                                <button @click="editItem('member', member)" class="btn btn-sm btn-light border text-primary" title="Edit"><i class="bi bi-pencil"></i></button>
                                                <button @click="deleteItem('member', member.id)" class="btn btn-sm btn-light border text-danger" title="Delete"><i class="bi bi-trash"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="members.length === 0">
                                        <td colspan="5" class="text-center py-5 text-muted small italic">No organizational structure defined yet.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODAL FORM -->
        <div class="modal fade shadow-lg" id="cmsModal" tabindex="-1" ref="modalRef">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content border-0">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title fw-bold">
                            <i :class="getModalIcon()" class="me-2"></i>
                            {{ isEdit ? 'Edit' : 'Add New' }} {{ activeTabLabel }}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <form @submit.prevent="submit">
                        <div class="modal-body p-4">
                            <!-- ARTICLE FORM -->
                            <template v-if="activeType === 'article'">
                                <div class="mb-3">
                                    <label class="form-label fw-semibold small">Article Title</label>
                                    <input type="text" v-model="formArticle.title" class="form-control form-control-lg fw-bold" placeholder="Judul Artikel..." required>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold small">Category</label>
                                        <input type="text" v-model="formArticle.category" class="form-control" placeholder="e.g. News, Event">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold small">Date</label>
                                        <input type="date" v-model="formArticle.date" class="form-control">
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-semibold small">Content / Description</label>
                                    <RichTextEditor v-model="formArticle.description" placeholder="Tulis konten artikel di sini..." />
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold small">Cover Image</label>
                                        <input type="file" @input="formArticle.image_path = $event.target.files[0]" class="form-control">
                                        <div v-if="isEdit && currentItem.image_url" class="mt-2 small text-muted italic">Current image: {{ currentItem.image_path }}</div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold small">Gallery (Multiple Images)</label>
                                        <input type="file" @input="formArticle.gallery = $event.target.files" class="form-control" multiple>
                                        <div v-if="isEdit && currentItem.gallery_urls?.length" class="mt-2 d-flex gap-1 flex-wrap">
                                            <img v-for="url in currentItem.gallery_urls" :key="url" :src="url" class="rounded border" style="width: 30px; height: 30px; object-fit: cover;">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-check form-switch mt-3">
                                    <input class="form-check-input" type="checkbox" v-model="formArticle.is_published" id="isPublished">
                                    <label class="form-check-label fw-semibold" for="isPublished">Publish Article</label>
                                </div>
                            </template>

                            <!-- MEMBER FORM -->
                            <template v-else-if="activeType === 'member'">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold small">Full Name</label>
                                        <input type="text" v-model="formMember.name" class="form-control" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold small">Role Title</label>
                                        <input type="text" v-model="formMember.role_title" class="form-control" placeholder="e.g. Manager Marketing" required>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold small">Department</label>
                                        <select v-model="formMember.department_name" class="form-select" required>
                                            <option value="">Select Department</option>
                                            <option v-for="dept in departments" :key="dept.id" :value="dept.name">{{ dept.name }}</option>
                                            <option value="Non-Departmental">Non-Departmental / Executive</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold small">Order (Display Priority)</label>
                                        <input type="number" v-model="formMember.order_num" class="form-control">
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-semibold small">Photo</label>
                                    <input type="file" @input="formMember.image_path = $event.target.files[0]" class="form-control">
                                </div>
                                <div class="form-check form-switch mt-3">
                                    <input class="form-check-input" type="checkbox" v-model="formMember.is_executive" id="isExecutive">
                                    <label class="form-check-label fw-semibold" for="isExecutive">Executive Member (Top Level)</label>
                                </div>
                            </template>
                        </div>
                        <div class="modal-footer bg-light p-3">
                            <button type="button" class="btn btn-light px-4" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary px-5 shadow-sm" :disabled="formArticle.processing || formMember.processing">
                                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                                {{ isEdit ? 'Save Changes' : 'Create Now' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <ModalConfirmation ref="modalConfirmationRef" />
    </StaffLayout>
</template>

<script setup>
import StaffLayout from '@/Layouts/StaffLayout.vue';
import Notif from '@/Components/Notif.vue';
import RichTextEditor from '@/Components/RichTextEditor.vue';
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import { useForm, router } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
    stats: Array,
    articles: Array,
    members: Array,
    departments: Array,
    notif: Object,
});

const modalRef = ref(null);
const modalConfirmationRef = ref(null);
const activeType = ref('article'); // article, member
const isEdit = ref(false);
const currentItem = ref(null);
let bootstrapModal = null;

const formArticle = useForm({
    title: '',
    description: '',
    image_path: null,
    category: '',
    date: new Date().toISOString().substr(0, 10),
    is_published: true,
    gallery: null,
});

const formMember = useForm({
    name: '',
    role_title: '',
    department_name: '',
    image_path: null,
    order_num: 1,
    is_executive: false,
});

const activeTabLabel = computed(() => {
    if (activeType.value === 'article') return 'Article';
    if (activeType.value === 'member') return 'Member';
    return '';
});

const isLoading = computed(() => {
    return formArticle.processing || formMember.processing;
});

onMounted(() => {
    if (typeof window.bootstrap !== 'undefined') {
        bootstrapModal = new window.bootstrap.Modal(modalRef.value);
    }
});

function getModalIcon() {
    if (activeType.value === 'article') return 'bi-newspaper';
    if (activeType.value === 'member') return 'bi-person-badge';
    return '';
}

function openModal(type) {
    activeType.value = type;
    isEdit.value = false;
    currentItem.value = null;

    if (type === 'article') formArticle.reset();
    else if (type === 'member') formMember.reset();

    if (bootstrapModal) bootstrapModal.show();
}

function editItem(type, item) {
    activeType.value = type;
    isEdit.value = true;
    currentItem.value = item;

    if (type === 'article') {
        formArticle.title = item.title;
        formArticle.description = item.description;
        formArticle.category = item.category;
        formArticle.date = item.date;
        formArticle.is_published = !!item.is_published;
        formArticle.image_path = null;
    } else if (type === 'member') {
        formMember.name = item.name;
        formMember.role_title = item.role_title;
        formMember.department_name = item.department_name;
        formMember.order_num = item.order_num;
        formMember.is_executive = !!item.is_executive;
        formMember.image_path = null;
    }

    if (bootstrapModal) bootstrapModal.show();
}

function submit() {
    let url = '';
    let form = null;

    if (activeType.value === 'article') {
        form = formArticle;
        url = isEdit.value ? `/seeo/marketing/activities/${currentItem.value.id}` : `/seeo/marketing/activities`;
    } else if (activeType.value === 'member') {
        form = formMember;
        url = isEdit.value ? `/seeo/marketing/structures/${currentItem.value.id}` : `/seeo/marketing/structures`;
    }

    // Use multipart/form-data for image uploads via post
    // Inertia handles method spoofing for update if we pass _method
    const options = {
        onSuccess: () => {
            if (bootstrapModal) bootstrapModal.hide();
        },
        forceFormData: true,
    };

    if (isEdit.value) {
        // Manual post to support file upload on update
        router.post(url, {
            ...form.data(),
            _method: 'PUT'
        }, options);
    } else {
        form.post(url, options);
    }
}

function deleteItem(type, id) {
    let url = '';
    let label = '';

    if (type === 'article') { url = `/seeo/marketing/activities/${id}`; label = 'Article'; }
    else if (type === 'member') { url = `/seeo/marketing/structures/${id}`; label = 'Member'; }

    modalConfirmationRef.value.showModal(url, `Hapus ${label} ini?`, 'DELETE');
}
</script>

<style scoped>
.nav-pills .nav-link.active {
    background-color: var(--bs-primary);
}
.nav-link {
    color: #64748b;
    border-radius: 6px !important;
}
.table img {
    transition: transform 0.2s;
}
.table tr:hover img {
    transform: scale(1.1);
}
.pulse {
    animation: pulse-animation 2s infinite;
}
</style>
