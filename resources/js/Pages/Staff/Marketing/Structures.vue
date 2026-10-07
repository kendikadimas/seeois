<script setup>
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import StaffLayout from '@/Layouts/StaffLayout.vue';
import InputError from '@/Components/InputError.vue';
import Notif from '@/Components/Notif.vue';

const props = defineProps({
    structures: Array,
});
const route = (name, params = {}) => window.route(name, params);

const notifRef = ref(null);
const modalInstance = ref(null);
const isEdit = ref(false);
const currentImageUrl = ref(null);
const photoPreviewUrl = ref(null);
const fileError = ref('');
const fileInputKey = ref(0);

const form = useForm({
    id: null,
    name: '',
    role_title: '',
    department_name: '',
    order_num: 0,
    is_executive: false,
    image_path: null,
});

function handleFileChange(e) {
    const file = e.target.files?.[0] || null;
    fileError.value = '';

    if (file && !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        fileError.value = 'Gunakan foto JPG, PNG, atau WEBP.';
        e.target.value = '';
        form.image_path = null;
        clearPhotoPreview();
        return;
    }

    if (file && file.size > 2 * 1024 * 1024) {
        fileError.value = 'Ukuran foto maksimal 2 MB.';
        e.target.value = '';
        form.image_path = null;
        clearPhotoPreview();
        return;
    }

    clearPhotoPreview();
    form.image_path = file;
    photoPreviewUrl.value = file ? URL.createObjectURL(file) : null;
}

function clearPhotoPreview() {
    if (photoPreviewUrl.value) URL.revokeObjectURL(photoPreviewUrl.value);
    photoPreviewUrl.value = null;
}

function showModal(structure = null) {
    form.reset();
    form.clearErrors();
    clearPhotoPreview();
    fileError.value = '';
    fileInputKey.value += 1;

    if (structure) {
        isEdit.value = true;
        form.id = structure.id;
        form.name = structure.name;
        form.role_title = structure.role_title;
        form.department_name = structure.department_name;
        form.order_num = structure.order_num ?? 0;
        form.is_executive = structure.is_executive == 1;
        form.image_path = null;
        currentImageUrl.value = structure.image_url;
    } else {
        isEdit.value = false;
        currentImageUrl.value = null;
    }
    if (modalInstance.value) modalInstance.value.show();
}

function hideModal() {
    if (modalInstance.value) modalInstance.value.hide();
    form.reset();
    form.clearErrors();
    currentImageUrl.value = null;
    fileError.value = '';
    clearPhotoPreview();
    fileInputKey.value += 1;
}

function submitForm() {
    if (fileError.value) return;

    const options = {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            hideModal();
            notifRef.value?.showToast('success', isEdit.value
                ? 'Struktur berhasil diperbarui.'
                : 'Struktur berhasil ditambahkan.');
        },
    };

    if (isEdit.value) {
        form.post(route('marketing.structures.update', form.id), options);
    } else {
        form.post(route('marketing.structures.store'), options);
    }
}

function deleteStructure(id) {
    if (confirm('Yakin ingin menghapus data struktur ini?')) {
        form.delete(route('marketing.structures.destroy', id), {
            preserveScroll: true,
            onSuccess: () => {
                notifRef.value?.showToast('success', 'Struktur berhasil dihapus.');
            }
        });
    }
}

onMounted(async () => {
    await nextTick();
    const modalEl = document.getElementById('structureModal');
    if (modalEl && typeof window.bootstrap !== 'undefined') {
        modalInstance.value = new window.bootstrap.Modal(modalEl);
    }
    
    const pageProps = usePage().props;
    if (pageProps.notif && notifRef.value) {
        notifRef.value.showToast(pageProps.notif.type, pageProps.notif.message);
    }
});

onBeforeUnmount(clearPhotoPreview);
</script>

<template>
    <StaffLayout>
        <Head title="Manajemen Struktur" />
        <template #header> Manajemen Struktur (Marketing) </template>
        
        <div class="container-fluid p-4">
            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-header bg-white border-bottom py-3 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                    <div>
                        <h5 class="mb-1 fw-bold">Data Struktur Organisasi</h5>
                        <small class="text-muted">Atur nama, jabatan, urutan tampil, dan foto anggota.</small>
                    </div>
                    <button type="button" class="btn btn-primary shadow-sm" @click="showModal(null)">
                        <i class="bi bi-plus-lg me-1"></i> Tambah Struktur
                    </button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle">
                            <thead class="table-light">
                                <tr>
                                    <th>#Order</th>
                                    <th>Executive?</th>
                                    <th>Nama</th>
                                    <th>Jabatan</th>
                                    <th>Departemen</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in structures" :key="item.id">
                                    <td>{{ item.order_num }}</td>
                                    <td>
                                        <span class="badge" :class="item.is_executive ? 'bg-success' : 'bg-secondary'">
                                            {{ item.is_executive ? 'Ya' : 'Tidak' }}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <img v-if="item.image_url" :src="item.image_url" class="rounded-circle me-2 object-fit-cover" style="width: 40px; height: 40px;" />
                                            <div v-else class="rounded-circle bg-light me-2 d-flex justify-content-center align-items-center" style="width: 40px; height: 40px;">
                                                <i class="bi bi-person text-secondary"></i>
                                            </div>
                                            <span class="fw-medium">{{ item.name }}</span>
                                        </div>
                                    </td>
                                    <td>{{ item.role_title }}</td>
                                    <td>{{ item.department_name || '-' }}</td>
                                    <td>
                                        <button type="button" class="btn btn-sm btn-light border me-2" title="Edit anggota" @click="showModal(item)">
                                            <i class="bi bi-pencil me-1"></i>Edit
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-danger" title="Hapus anggota" @click="deleteStructure(item.id)">
                                            <i class="bi bi-trash me-1"></i>Hapus
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="structures.length === 0">
                                    <td colspan="6" class="text-center py-4 text-muted">Belum ada data struktur.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="structureModal" tabindex="-1" aria-labelledby="structureModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form @submit.prevent="submitForm">
                        <div class="modal-header">
                            <h5 class="modal-title" id="structureModalLabel">{{ isEdit ? 'Edit Struktur' : 'Tambah Struktur' }}</h5>
                            <button type="button" class="btn-close" @click="hideModal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Nama <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" v-model.trim="form.name" placeholder="Nama lengkap anggota" required autofocus>
                                <InputError :message="form.errors.name" class="mt-1" />
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label class="form-label">Jabatan <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" v-model.trim="form.role_title" placeholder="Contoh: Ketua Umum" required>
                                    <InputError :message="form.errors.role_title" class="mt-1" />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Departemen</label>
                                    <input type="text" class="form-control" v-model.trim="form.department_name" placeholder="Contoh: Marketing">
                                    <InputError :message="form.errors.department_name" class="mt-1" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label class="form-label">Nomor Urut</label>
                                    <input type="number" min="0" class="form-control" v-model.number="form.order_num">
                                    <div class="form-text">Angka kecil tampil lebih dahulu.</div>
                                    <InputError :message="form.errors.order_num" class="mt-1" />
                                </div>
                                <div class="col-md-6 d-flex align-items-end">
                                    <div class="form-check form-switch pb-2">
                                        <input class="form-check-input" type="checkbox" id="isExec" v-model="form.is_executive">
                                        <label class="form-check-label" for="isExec">Executive (Pimpinan)?</label>
                                    </div>
                                    <InputError :message="form.errors.is_executive" class="mt-1" />
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Foto Profil <span class="text-muted">(opsional)</span></label>
                                <div v-if="photoPreviewUrl || currentImageUrl" class="mb-2 d-flex align-items-center gap-3">
                                    <img :src="photoPreviewUrl || currentImageUrl" alt="Pratinjau foto" class="rounded-circle border object-fit-cover" style="width: 72px; height: 72px;">
                                    <small class="text-muted">{{ photoPreviewUrl ? 'Pratinjau foto baru' : 'Foto saat ini' }}</small>
                                </div>
                                <input :key="fileInputKey" type="file" class="form-control" @change="handleFileChange" accept="image/jpeg,image/png,image/webp">
                                <InputError :message="form.errors.image_path" class="mt-1" />
                                <div v-if="fileError" class="text-danger small mt-1">{{ fileError }}</div>
                                <div class="form-text">JPG, PNG, atau WEBP; maksimal 2 MB. {{ isEdit ? 'Biarkan kosong untuk mempertahankan foto.' : '' }}</div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="hideModal">Batal</button>
                            <button type="submit" class="btn btn-primary" :disabled="form.processing || !!fileError">
                                <span v-if="form.processing" class="spinner-border spinner-border-sm me-2"></span>
                                {{ form.processing ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambah Anggota') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <Notif ref="notifRef" />
    </StaffLayout>
</template>
