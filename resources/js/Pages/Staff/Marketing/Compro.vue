<script setup>
import StaffLayout from '@/Layouts/StaffLayout.vue';
import InputError from '@/Components/InputError.vue';
import { computed, ref } from 'vue';
import { useForm } from '@inertiajs/vue3';

const props = defineProps({ items: Array });
const route = (name, params = {}) => window.route(name, params);

const items = computed(() => props.items || []);
const showAdd = ref(false);
const currentImageUrl = ref(null);
const addFileError = ref('');
const editFileError = ref('');

const form = useForm({ key: '', value: '', image: null, order: 0 });
const editForm = useForm({ id: null, value: '', image: null, order: 0 });

function validateImage(file) {
    if (!file) return '';
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        return 'Gunakan gambar JPG, PNG, atau WEBP.';
    }
    if (file.size > 5 * 1024 * 1024) return 'Ukuran gambar maksimal 5 MB.';
    return '';
}

function onFile(event) {
    const file = event.target.files?.[0] || null;
    addFileError.value = validateImage(file);
    form.image = addFileError.value ? null : file;
    if (addFileError.value) event.target.value = '';
}

function onEditFile(event) {
    const file = event.target.files?.[0] || null;
    editFileError.value = validateImage(file);
    editForm.image = editFileError.value ? null : file;
    if (editFileError.value) event.target.value = '';
}

function openAddForm() {
    if (showAdd.value) {
        showAdd.value = false;
        return;
    }

    form.reset();
    form.clearErrors();
    addFileError.value = '';
    showAdd.value = true;
}

function submitAdd() {
    if (addFileError.value) return;
    form.post(route('marketing.compro.store'), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            showAdd.value = false;
        },
    });
}

function startEdit(item) {
    editForm.reset();
    editForm.clearErrors();
    editFileError.value = '';
    editForm.id = item.id;
    editForm.value = item.value || '';
    editForm.order = item.order || 0;
    currentImageUrl.value = item.image_url;

    const modalEl = document.getElementById('editComproModal');
    if (modalEl && window.bootstrap) window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

function submitEdit() {
    if (editFileError.value) return;
    editForm.post(route('marketing.compro.update', editForm.id), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            const modalEl = document.getElementById('editComproModal');
            if (modalEl && window.bootstrap) window.bootstrap.Modal.getOrCreateInstance(modalEl).hide();
        },
    });
}

function remove(id) {
    if (!confirm('Hapus konten ini? Data yang dihapus tidak dapat dikembalikan.')) return;
    useForm({}).delete(route('marketing.compro.destroy', id), { preserveScroll: true });
}
</script>

<template>
    <StaffLayout>
        <template #header>Konten Company Profile</template>

        <div class="container-fluid p-4">
            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-header bg-white d-flex flex-wrap gap-3 justify-content-between align-items-center py-3">
                    <div>
                        <h5 class="mb-1 fw-bold">Konten Halaman Publik</h5>
                        <small class="text-muted">Kelola teks dan gambar yang digunakan pada company profile.</small>
                    </div>
                    <button type="button" class="btn btn-primary" @click="openAddForm">
                        <i :class="showAdd ? 'bi-x-lg' : 'bi-plus-lg'" class="bi me-1"></i>
                        {{ showAdd ? 'Tutup Form' : 'Tambah Konten' }}
                    </button>
                </div>
                <div class="card-body">
                    <div v-if="showAdd" class="mb-4 p-3 p-md-4 border rounded-3 bg-light">
                        <h6 class="fw-bold mb-3">Konten Baru</h6>
                        <form @submit.prevent="submitAdd">
                            <div class="row g-3">
                                <div class="col-md-8">
                                    <label class="form-label">Key / Identitas Konten <span class="text-danger">*</span></label>
                                    <input v-model.trim="form.key" class="form-control" placeholder="Contoh: homepage_hero_title" required />
                                    <div class="form-text">Harus unik. Key dipakai sistem untuk menempatkan konten dan tidak dapat diedit setelah dibuat.</div>
                                    <InputError :message="form.errors.key" class="mt-1" />
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label">Urutan Tampil</label>
                                    <input v-model.number="form.order" min="0" type="number" class="form-control" />
                                    <InputError :message="form.errors.order" class="mt-1" />
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Isi Konten</label>
                                    <textarea v-model="form.value" class="form-control" rows="4" placeholder="Tulis isi konten di sini"></textarea>
                                    <InputError :message="form.errors.value" class="mt-1" />
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Gambar <span class="text-muted">(opsional)</span></label>
                                    <input type="file" @change="onFile" accept="image/jpeg,image/png,image/webp" class="form-control" />
                                    <div class="form-text">JPG, PNG, atau WEBP; maksimal 5 MB.</div>
                                    <div v-if="addFileError" class="text-danger small mt-1">{{ addFileError }}</div>
                                    <InputError :message="form.errors.image" class="mt-1" />
                                </div>
                                <div class="col-12 text-end">
                                    <button type="button" class="btn btn-light border me-2" @click="openAddForm">Batal</button>
                                    <button type="submit" class="btn btn-success" :disabled="form.processing || !!addFileError">
                                        <span v-if="form.processing" class="spinner-border spinner-border-sm me-2"></span>
                                        {{ form.processing ? 'Menyimpan...' : 'Simpan Konten' }}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div v-if="items.length" class="list-group list-group-flush border rounded-3 overflow-hidden">
                        <div v-for="item in items" :key="item.id" class="list-group-item p-3 d-flex flex-column flex-md-row gap-3 justify-content-between align-items-md-center">
                            <div class="d-flex gap-3 align-items-center min-width-0">
                                <img v-if="item.image_url" :src="item.image_url" alt="Gambar konten" class="rounded border object-fit-cover flex-shrink-0" style="width: 72px; height: 56px;" />
                                <div class="min-width-0">
                                    <div class="fw-bold text-break">{{ item.key }} <small class="badge bg-light text-dark border ms-1">Urutan {{ item.order }}</small></div>
                                    <div class="text-muted small text-preview">{{ item.value || 'Belum ada isi teks.' }}</div>
                                </div>
                            </div>
                            <div class="d-flex gap-2 flex-shrink-0">
                                <a v-if="item.image_url" :href="item.image_url" target="_blank" rel="noopener" class="btn btn-sm btn-outline-secondary">Lihat Gambar</a>
                                <button type="button" class="btn btn-sm btn-outline-primary" @click="startEdit(item)">Edit</button>
                                <button type="button" class="btn btn-sm btn-outline-danger" @click="remove(item.id)">Hapus</button>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-center text-muted py-5">
                        <i class="bi bi-file-earmark-text fs-1 d-block mb-2"></i>
                        Belum ada konten company profile.
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="editComproModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <form @submit.prevent="submitEdit">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Konten</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Isi Konten</label>
                                <textarea v-model="editForm.value" class="form-control" rows="6"></textarea>
                                <InputError :message="editForm.errors.value" class="mt-1" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Ganti Gambar</label>
                                <img v-if="currentImageUrl" :src="currentImageUrl" alt="Gambar saat ini" class="d-block rounded border object-fit-cover mb-2" style="width: 140px; height: 90px;" />
                                <input type="file" @change="onEditFile" class="form-control" accept="image/jpeg,image/png,image/webp" />
                                <div class="form-text">Biarkan kosong untuk mempertahankan gambar saat ini. Maksimal 5 MB.</div>
                                <div v-if="editFileError" class="text-danger small mt-1">{{ editFileError }}</div>
                                <InputError :message="editForm.errors.image" class="mt-1" />
                            </div>
                            <div>
                                <label class="form-label">Urutan Tampil</label>
                                <input v-model.number="editForm.order" min="0" type="number" class="form-control" />
                                <InputError :message="editForm.errors.order" class="mt-1" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light border" data-bs-dismiss="modal">Batal</button>
                            <button type="submit" class="btn btn-primary" :disabled="editForm.processing || !!editFileError">
                                <span v-if="editForm.processing" class="spinner-border spinner-border-sm me-2"></span>
                                {{ editForm.processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </StaffLayout>
</template>

<style scoped>
.min-width-0 { min-width: 0; }
.text-preview { white-space: pre-line; overflow-wrap: anywhere; }
</style>
