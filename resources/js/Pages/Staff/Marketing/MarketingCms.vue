<template>
    <StaffLayout>
        <Head title="Marketing CMS" />
        <template #header>Panel Konten Marketing</template>

        <div class="container-fluid p-4">
            <Notif ref="notifRef" />

            <!-- Navigation Tabs -->
            <ul class="nav nav-pills mb-4 bg-white p-2 rounded shadow-sm d-inline-flex border" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active fw-medium px-4" id="pills-articles-tab" data-bs-toggle="pill" data-bs-target="#pills-articles" type="button" role="tab">
                        <i class="bi bi-newspaper me-2"></i>Berita & Kegiatan
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link fw-medium px-4" id="pills-members-tab" data-bs-toggle="pill" data-bs-target="#pills-members" type="button" role="tab">
                        <i class="bi bi-people me-2"></i>Struktur Organisasi
                    </button>
                </li>
            </ul>

            <div class="tab-content" id="pills-tabContent">
                <!-- ARTICLES SECTION -->
                <div class="tab-pane fade show active" id="pills-articles" role="tabpanel">
                    <div class="card shadow-sm border-0">
                        <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                            <h5 class="mb-0 fw-bold">Berita & Kegiatan Terbaru</h5>
                            <button type="button" class="btn btn-primary btn-sm px-3" @click="openModal('article')">
                                <i class="bi bi-plus-lg me-1"></i> Tambah Berita
                            </button>
                        </div>
                        <div class="table-responsive">
                            <table class="table align-middle mb-0 table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th>Gambar</th>
                                        <th>Judul & Slug</th>
                                        <th>Kategori</th>
                                        <th>Status</th>
                                        <th class="text-center">Aksi</th>
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
                                        <td><span class="badge bg-secondary-subtle text-secondary px-2 border">{{ article.category || 'Umum' }}</span></td>
                                        <td>
                                            <span v-if="article.is_published" class="badge bg-success-subtle text-success">Terbit</span>
                                            <span v-else class="badge bg-warning-subtle text-warning text-dark">Draft</span>
                                        </td>
                                        <td class="text-center">
                                            <div class="btn-group">
                                                <button type="button" @click="editItem('article', article)" class="btn btn-sm btn-light border text-primary" title="Edit"><i class="bi bi-pencil"></i></button>
                                                <button type="button" @click="deleteItem('article', article.id)" class="btn btn-sm btn-light border text-danger" title="Hapus"><i class="bi bi-trash"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="articles.length === 0">
                                        <td colspan="5" class="text-center py-5 text-muted small italic">Belum ada berita. Tambahkan berita pertama Anda.</td>
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
                            <h5 class="mb-0 fw-bold">Anggota Struktur Organisasi</h5>
                            <button type="button" class="btn btn-primary btn-sm px-3" @click="openModal('member')">
                                <i class="bi bi-person-plus me-1"></i> Tambah Anggota
                            </button>
                        </div>
                        <div class="table-responsive">
                            <table class="table align-middle mb-0 table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th>Foto</th>
                                        <th>Nama & Jabatan</th>
                                        <th>Departemen</th>
                                        <th>Urutan</th>
                                        <th class="text-center">Aksi</th>
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
                                                <button type="button" @click="editItem('member', member)" class="btn btn-sm btn-light border text-primary" title="Edit"><i class="bi bi-pencil"></i></button>
                                                <button type="button" @click="deleteItem('member', member.id)" class="btn btn-sm btn-light border text-danger" title="Hapus"><i class="bi bi-trash"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="members.length === 0">
                                        <td colspan="5" class="text-center py-5 text-muted small italic">Belum ada anggota struktur organisasi.</td>
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
                            {{ isEdit ? 'Edit' : 'Tambah' }} {{ activeTabLabel }}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <form @submit.prevent="submit">
                        <div class="modal-body p-4">
                            <!-- ARTICLE FORM -->
                            <template v-if="activeType === 'article'">
                                <div class="mb-3">
                                    <label class="form-label fw-semibold small">Judul <span class="text-danger">*</span></label>
                                    <input type="text" v-model="formArticle.title" class="form-control form-control-lg fw-bold" placeholder="Judul Artikel..." required>
                                    <InputError :message="formArticle.errors.title" class="mt-1" />
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold small">Kategori</label>
                                        <input type="text" v-model="formArticle.category" class="form-control" placeholder="Contoh: Berita, Event">
                                        <InputError :message="formArticle.errors.category" class="mt-1" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold small">Tanggal</label>
                                        <input type="date" v-model="formArticle.date" class="form-control">
                                        <InputError :message="formArticle.errors.date" class="mt-1" />
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-semibold small">Isi / Deskripsi <span class="text-danger">*</span></label>
                                    <RichTextEditor v-model="formArticle.description" placeholder="Tulis konten artikel di sini..." />
                                    <InputError :message="formArticle.errors.description" class="mt-1" />
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold small">Gambar Sampul</label>
                                        <input type="file" accept="image/jpeg,image/png,image/webp" @input="formArticle.image_path = $event.target.files[0]" class="form-control">
                                        <div class="form-text">JPG, PNG, atau WEBP; maksimal 2 MB.</div>
                                        <InputError :message="formArticle.errors.image_path" class="mt-1" />
                                        <img v-if="isEdit && currentItem.image_url" :src="currentItem.image_url" alt="Gambar saat ini" class="mt-2 rounded border object-fit-cover" style="width: 100px; height: 70px;">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold small">Galeri (maksimal 10 gambar)</label>
                                        <input type="file" accept="image/jpeg,image/png,image/webp" @input="formArticle.gallery = Array.from($event.target.files)" class="form-control" multiple>
                                        <div class="form-text">Masing-masing gambar maksimal 2 MB.</div>
                                        <InputError :message="formArticle.errors.gallery" class="mt-1" />
                                        <div v-if="isEdit && currentItem.gallery_urls?.length" class="mt-2 d-flex gap-1 flex-wrap">
                                            <img v-for="url in currentItem.gallery_urls" :key="url" :src="url" class="rounded border" style="width: 30px; height: 30px; object-fit: cover;">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-check form-switch mt-3">
                                    <input class="form-check-input" type="checkbox" v-model="formArticle.is_published" id="isPublished">
                                    <label class="form-check-label fw-semibold" for="isPublished">Langsung tampilkan di halaman publik</label>
                                </div>
                            </template>

                            <!-- MEMBER FORM -->
                            <template v-else-if="activeType === 'member'">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold small">Nama Lengkap <span class="text-danger">*</span></label>
                                        <input type="text" v-model="formMember.name" class="form-control" required>
                                        <InputError :message="formMember.errors.name" class="mt-1" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold small">Jabatan <span class="text-danger">*</span></label>
                                        <input type="text" v-model="formMember.role_title" class="form-control" placeholder="Contoh: Manajer Marketing" required>
                                        <InputError :message="formMember.errors.role_title" class="mt-1" />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold small">Departemen</label>
                                        <select v-model="formMember.department_name" class="form-select">
                                            <option value="">Pilih Departemen</option>
                                            <option v-for="dept in departments" :key="dept.id" :value="dept.name">{{ dept.name }}</option>
                                            <option value="Non-Departmental">Eksekutif / Tanpa Departemen</option>
                                        </select>
                                        <InputError :message="formMember.errors.department_name" class="mt-1" />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold small">Urutan Tampil</label>
                                        <input type="number" min="0" v-model.number="formMember.order_num" class="form-control">
                                        <div class="form-text">Angka kecil tampil lebih dahulu.</div>
                                        <InputError :message="formMember.errors.order_num" class="mt-1" />
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-semibold small">Foto</label>
                                    <input type="file" accept="image/jpeg,image/png,image/webp" @input="formMember.image_path = $event.target.files[0]" class="form-control">
                                    <div class="form-text">JPG, PNG, atau WEBP; maksimal 2 MB.</div>
                                    <InputError :message="formMember.errors.image_path" class="mt-1" />
                                </div>
                                <div class="form-check form-switch mt-3">
                                    <input class="form-check-input" type="checkbox" v-model="formMember.is_executive" id="isExecutive">
                                    <label class="form-check-label fw-semibold" for="isExecutive">Anggota eksekutif / pimpinan</label>
                                </div>
                            </template>
                        </div>
                        <div class="modal-footer bg-light p-3">
                            <button type="button" class="btn btn-light px-4" data-bs-dismiss="modal">Batal</button>
                            <button type="submit" class="btn btn-primary px-5 shadow-sm" :disabled="formArticle.processing || formMember.processing">
                                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                                {{ isLoading ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambahkan') }}
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
import InputError from '@/Components/InputError.vue';
import RichTextEditor from '@/Components/RichTextEditor.vue';
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import { Head, useForm } from '@inertiajs/vue3';
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
    stats: Array,
    articles: Array,
    members: Array,
    departments: Array,
    notif: Object,
});
const route = (name, params = {}) => window.route(name, params);

const modalRef = ref(null);
const modalConfirmationRef = ref(null);
const notifRef = ref(null);
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
    if (activeType.value === 'article') return 'Berita / Kegiatan';
    if (activeType.value === 'member') return 'Anggota Struktur';
    return '';
});

const isLoading = computed(() => {
    return formArticle.processing || formMember.processing;
});

onMounted(() => {
    if (typeof window.bootstrap !== 'undefined') {
        bootstrapModal = new window.bootstrap.Modal(modalRef.value);
    }

    if (props.notif) {
        notifRef.value?.showToast(props.notif.type, props.notif.message);
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

    if (type === 'article') {
        formArticle.reset();
        formArticle.clearErrors();
    } else if (type === 'member') {
        formMember.reset();
        formMember.clearErrors();
    }

    if (bootstrapModal) bootstrapModal.show();
}

function editItem(type, item) {
    activeType.value = type;
    isEdit.value = true;
    currentItem.value = item;

    if (type === 'article') {
        formArticle.reset();
        formArticle.clearErrors();
        formArticle.title = item.title;
        formArticle.description = item.description;
        formArticle.category = item.category;
        formArticle.date = item.date?.slice(0, 10) || '';
        formArticle.is_published = !!item.is_published;
        formArticle.image_path = null;
    } else if (type === 'member') {
        formMember.reset();
        formMember.clearErrors();
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
        url = isEdit.value
            ? route('marketing.activities.update', currentItem.value.id)
            : route('marketing.activities.store');
    } else if (activeType.value === 'member') {
        form = formMember;
        url = isEdit.value
            ? route('marketing.structures.update', currentItem.value.id)
            : route('marketing.structures.store');
    }

    const options = {
        onSuccess: () => {
            if (bootstrapModal) bootstrapModal.hide();
        },
        forceFormData: true,
    };

    form.post(url, options);
}

function deleteItem(type, id) {
    let url = '';
    let label = '';

    if (type === 'article') { url = route('marketing.activities.destroy', id); label = 'berita/kegiatan'; }
    else if (type === 'member') { url = route('marketing.structures.destroy', id); label = 'anggota struktur'; }

    modalConfirmationRef.value.showModal(url, `Hapus ${label} ini? Data yang dihapus tidak dapat dikembalikan.`, 'DELETE');
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
