<script setup>
import { useForm, usePage } from '@inertiajs/vue3';
import { ref, onMounted, nextTick } from 'vue';
import StaffLayout from '@/Layouts/StaffLayout.vue';
import InputError from '@/Components/InputError.vue';
import Notif from '@/Components/Notif.vue';

const props = defineProps({
    activities: Array,
});

const notifRef = ref(null);
const modalInstance = ref(null);
const isEdit = ref(false);

const form = useForm({
    id: null,
    title: '',
    description: '',
    category: '',
    date: '',
    is_published: true,
    image_path: null,
});

function handleFileChange(e) {
    form.image_path = e.target.files[0];
}

function showModal(activity = null) {
    if (activity) {
        isEdit.value = true;
        form.id = activity.id;
        form.title = activity.title;
        form.description = activity.description;
        form.category = activity.category;
        form.date = activity.date || '';
        form.is_published = activity.is_published == 1;
        form.image_path = null; 
    } else {
        isEdit.value = false;
        form.reset();
    }
    if (modalInstance.value) modalInstance.value.show();
}

function hideModal() {
    if (modalInstance.value) modalInstance.value.hide();
    form.reset();
}

function submitForm() {
    if (isEdit.value) {
        // use generic inertia post with _method=PUT to handle multipart edit
        form.transform((data) => ({
            ...data,
            _method: 'put'
        })).post(`/seeo/marketing/activities/${form.id}`, {
            onSuccess: () => {
                hideModal();
                notifRef.value?.showToast('success', 'Kegiatan/Berita berhasil diupdate.');
            }
        });
    } else {
        form.post("/seeo/marketing/activities", {
            onSuccess: () => {
                hideModal();
                notifRef.value?.showToast('success', 'Kegiatan/Berita berhasil ditambahkan.');
            }
        });
    }
}

function deleteActivity(id) {
    if (confirm('Yakin ingin menghapus berita/kegiatan ini?')) {
        form.delete(`/seeo/marketing/activities/${id}`, {
            onSuccess: () => {
                notifRef.value?.showToast('success', 'Berita/Kegiatan berhasil dihapus.');
            }
        });
    }
}

onMounted(async () => {
    await nextTick();
    const modalEl = document.getElementById('activityModal');
    if (modalEl && typeof window.bootstrap !== 'undefined') {
        modalInstance.value = new window.bootstrap.Modal(modalEl);
    }
    
    const pageProps = usePage().props;
    if (pageProps.notif && notifRef.value) {
        notifRef.value.showToast(pageProps.notif.type, pageProps.notif.message);
    }
});
</script>

<template>
    <StaffLayout>
        <template #header> Manajemen Berita & Kegiatan (Marketing) </template>
        
        <div class="container-fluid p-4">
            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                    <h5 class="mb-0 fw-bold">Data Berita / Sorotan Program</h5>
                    <button class="btn btn-primary shadow-sm" @click="showModal(null)">
                        <i class="bi bi-plus-lg me-1"></i> Tambah Entri
                    </button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle">
                            <thead class="table-light">
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Status</th>
                                    <th>Judul / Berita</th>
                                    <th>Kategori</th>
                                    <th>Banner</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in activities" :key="item.id">
                                    <td>{{ item.date || '-' }}</td>
                                    <td>
                                        <span class="badge" :class="item.is_published ? 'bg-success' : 'bg-warning text-dark'">
                                            {{ item.is_published ? 'Published' : 'Draft' }}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="fw-medium d-block">{{ item.title }}</span>
                                        <small class="text-muted text-truncate d-inline-block" style="max-width:250px;">{{ item.description }}</small>
                                    </td>
                                    <td>{{ item.category || '-' }}</td>
                                    <td>
                                        <img v-if="item.image_url" :src="item.image_url" class="rounded border object-fit-cover" style="width: 60px; height: 40px;" />
                                        <span v-else class="text-muted small fst-italic">No Image</span>
                                    </td>
                                    <td>
                                        <button class="btn btn-sm btn-light border me-2" @click="showModal(item)">
                                            <i class="bi bi-pencil"></i>
                                        </button>
                                        <button class="btn btn-sm btn-outline-danger" @click="deleteActivity(item.id)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="activities.length === 0">
                                    <td colspan="6" class="text-center py-4 text-muted">Belum ada data berita atau aktivitas.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="activityModal" tabindex="-1" aria-labelledby="activityModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <form @submit.prevent="submitForm">
                        <div class="modal-header">
                            <h5 class="modal-title" id="activityModalLabel">{{ isEdit ? 'Edit Berita/Kegiatan' : 'Tambah Berita/Kegiatan' }}</h5>
                            <button type="button" class="btn-close" @click="hideModal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Judul / Sorotan Utama</label>
                                <input type="text" class="form-control" v-model="form.title" required>
                                <InputError :message="form.errors.title" class="mt-1" />
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label">Deskripsi Lengkap</label>
                                <textarea class="form-control" v-model="form.description" rows="4" required></textarea>
                                <InputError :message="form.errors.description" class="mt-1" />
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label class="form-label">Kategori</label>
                                    <input type="text" class="form-control" v-model="form.category" placeholder="Contoh: Publikasi, Event, dst">
                                    <InputError :message="form.errors.category" class="mt-1" />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Tanggal Terjadi (Opsional)</label>
                                    <input type="date" class="form-control" v-model="form.date">
                                    <InputError :message="form.errors.date" class="mt-1" />
                                </div>
                            </div>
                            
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label class="form-label">Gambar Thumbnail / Banner</label>
                                    <input type="file" class="form-control" @change="handleFileChange" accept="image/*">
                                    <InputError :message="form.errors.image_path" class="mt-1" />
                                    <div v-if="isEdit" class="form-text text-muted">Biarkan kosong jika tidak mengubah gambar lama.</div>
                                </div>
                                <div class="col-md-6 d-flex align-items-center">
                                    <div class="form-check form-switch mt-4">
                                        <input class="form-check-input" type="checkbox" id="isPub" v-model="form.is_published">
                                        <label class="form-check-label" for="isPub">Terbitkan (Published)?</label>
                                    </div>
                                    <InputError :message="form.errors.is_published" class="mt-1" />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="hideModal">Batal</button>
                            <button type="submit" class="btn btn-primary" :disabled="form.processing">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <Notif ref="notifRef" />
    </StaffLayout>
</template>
