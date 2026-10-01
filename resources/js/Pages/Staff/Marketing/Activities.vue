<script setup>
import { useForm, usePage } from '@inertiajs/vue3';
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import StaffLayout from '@/Layouts/StaffLayout.vue';
import InputError from '@/Components/InputError.vue';
import Notif from '@/Components/Notif.vue';

const props = defineProps({
    activities: Array,
});
const route = (name, params = {}) => window.route(name, params);

const notifRef = ref(null);
const modalInstance = ref(null);
const isEdit = ref(false);
const currentImageUrl = ref(null);
const imagePreviewUrl = ref(null);
const fileError = ref('');
const fileInputKey = ref(0);
const isGeneratingContent = ref(false);
const aiError = ref('');

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
    const file = e.target.files?.[0] || null;
    fileError.value = '';

    if (file && !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        fileError.value = 'Gunakan gambar JPG, PNG, atau WEBP.';
        e.target.value = '';
        form.image_path = null;
        clearImagePreview();
        return;
    }

    if (file && file.size > 2 * 1024 * 1024) {
        fileError.value = 'Ukuran gambar maksimal 2 MB.';
        e.target.value = '';
        form.image_path = null;
        clearImagePreview();
        return;
    }

    clearImagePreview();
    form.image_path = file;
    imagePreviewUrl.value = file ? URL.createObjectURL(file) : null;
}

function clearImagePreview() {
    if (imagePreviewUrl.value) URL.revokeObjectURL(imagePreviewUrl.value);
    imagePreviewUrl.value = null;
}

function formatDate(value) {
    if (!value) return '-';
    const [year, month, day] = value.slice(0, 10).split('-');
    return `${day}/${month}/${year}`;
}

function showModal(activity = null) {
    form.reset();
    form.clearErrors();
    clearImagePreview();
    fileError.value = '';
    fileInputKey.value += 1;
    aiError.value = '';

    if (activity) {
        isEdit.value = true;
        form.id = activity.id;
        form.title = activity.title;
        form.description = activity.description;
        form.category = activity.category;
        form.date = activity.date?.slice(0, 10) || '';
        form.is_published = activity.is_published == 1;
        form.image_path = null;
        currentImageUrl.value = activity.image_url;
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
    aiError.value = '';
    clearImagePreview();
    fileInputKey.value += 1;
}

async function generateContent() {
    aiError.value = '';

    if (!form.title.trim()) {
        aiError.value = 'Isi judul terlebih dahulu agar AI memiliki konteks.';
        return;
    }

    if (form.description.trim().length < 40) {
        aiError.value = 'Tuliskan bahan berita minimal 40 karakter (5W+1H, rangkaian, atau hasil kegiatan) sebelum menggunakan AI.';
        return;
    }

    if (form.description.trim() && !confirm('Konten yang ada akan diganti dengan hasil AI. Lanjutkan?')) {
        return;
    }

    isGeneratingContent.value = true;

    try {
        const response = await window.axios.post(
            route('marketing.activities.generate-content'),
            {
                title: form.title,
                category: form.category || null,
                date: form.date || null,
                current_content: form.description || null,
            },
        );

        form.description = response.data.content;
        notifRef.value?.showToast('success', 'Draf konten berhasil dibuat oleh AI. Silakan periksa sebelum diterbitkan.');
    } catch (error) {
        aiError.value = error.response?.data?.message
            || error.response?.data?.errors?.title?.[0]
            || error.response?.data?.errors?.current_content?.[0]
            || 'Konten AI gagal dibuat. Silakan coba lagi.';
    } finally {
        isGeneratingContent.value = false;
    }
}

function submitForm() {
    if (fileError.value) return;

    const options = {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            const message = isEdit.value
                ? 'Berita atau kegiatan berhasil diperbarui.'
                : 'Berita atau kegiatan berhasil ditambahkan.';
            hideModal();
            notifRef.value?.showToast('success', message);
        },
    };

    if (isEdit.value) {
        form.post(route('marketing.activities.update', form.id), options);
    } else {
        form.post(route('marketing.activities.store'), options);
    }
}

function deleteActivity(id) {
    if (confirm('Yakin ingin menghapus berita/kegiatan ini?')) {
        form.delete(route('marketing.activities.destroy', id), {
            preserveScroll: true,
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

onBeforeUnmount(clearImagePreview);
</script>

<template>
    <StaffLayout>
        <template #header> Manajemen Berita & Kegiatan (Marketing) </template>
        
        <div class="container-fluid p-4">
            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-header bg-white border-bottom py-3 d-flex flex-wrap gap-3 justify-content-between align-items-center">
                    <div>
                        <h5 class="mb-1 fw-bold">Data Berita / Sorotan Program</h5>
                        <small class="text-muted">Buat sebagai draft dulu atau langsung terbitkan ke halaman publik.</small>
                    </div>
                    <button type="button" class="btn btn-primary shadow-sm" @click="showModal(null)">
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
                                    <td>{{ formatDate(item.date) }}</td>
                                    <td>
                                        <span class="badge" :class="item.is_published ? 'bg-success' : 'bg-warning text-dark'">
                                            {{ item.is_published ? 'Terbit' : 'Draft' }}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="fw-medium d-block">{{ item.title }}</span>
                                        <small class="text-muted text-truncate d-inline-block" style="max-width:250px;">{{ item.description }}</small>
                                    </td>
                                    <td>{{ item.category || '-' }}</td>
                                    <td>
                                        <img v-if="item.image_url" :src="item.image_url" class="rounded border object-fit-cover" style="width: 60px; height: 40px;" />
                                        <span v-else class="text-muted small fst-italic">Tanpa gambar</span>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-sm btn-light border me-2" title="Edit berita" @click="showModal(item)">
                                            <i class="bi bi-pencil me-1"></i>Edit
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-danger" title="Hapus berita" @click="deleteActivity(item.id)">
                                            <i class="bi bi-trash me-1"></i>Hapus
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
                                <label class="form-label">Judul / Sorotan Utama <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" v-model.trim="form.title" maxlength="150" placeholder="Judul singkat, bukan bahan berita" required autofocus>
                                <div class="form-text d-flex justify-content-between gap-3">
                                    <span>Maksimal 150 karakter. Masukkan fakta mentah pada kolom Bahan AI di bawah.</span>
                                    <span>{{ form.title.length }}/150</span>
                                </div>
                                <InputError :message="form.errors.title" class="mt-1" />
                            </div>
                            
                            <div class="mb-3">
                                <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                                    <label class="form-label mb-0">Deskripsi Lengkap / Bahan AI <span class="text-danger">*</span></label>
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-primary"
                                        :disabled="isGeneratingContent || !form.title.trim()"
                                        @click="generateContent"
                                    >
                                        <span v-if="isGeneratingContent" class="spinner-border spinner-border-sm me-1"></span>
                                        <i v-else class="bi bi-stars me-1"></i>
                                        {{ isGeneratingContent ? 'AI sedang menulis...' : 'Buat Konten dengan AI' }}
                                    </button>
                                </div>
                                <textarea class="form-control" v-model.trim="form.description" rows="6" placeholder="Tuliskan poin faktual: siapa yang terlibat, apa kegiatannya, kapan dan di mana, rangkaian acara, hasil, serta kutipan bila ada. Setelah itu klik Buat Konten dengan AI." required></textarea>
                                <div class="form-text">Semakin lengkap bahan 5W+1H yang ditulis, semakin natural hasil artikelnya. AI tidak akan menambahkan fakta yang tidak tersedia.</div>
                                <div v-if="aiError" class="text-danger small mt-1">{{ aiError }}</div>
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
                                    <img v-if="imagePreviewUrl || currentImageUrl" :src="imagePreviewUrl || currentImageUrl" alt="Pratinjau gambar" class="d-block rounded border object-fit-cover mb-2 w-100" style="height: 130px;">
                                    <input :key="fileInputKey" type="file" class="form-control" @change="handleFileChange" accept="image/jpeg,image/png,image/webp">
                                    <InputError :message="form.errors.image_path" class="mt-1" />
                                    <div v-if="fileError" class="text-danger small mt-1">{{ fileError }}</div>
                                    <div class="form-text">JPG, PNG, atau WEBP; maksimal 2 MB. {{ isEdit ? 'Biarkan kosong untuk mempertahankan gambar.' : '' }}</div>
                                </div>
                                <div class="col-md-6 d-flex align-items-center">
                                    <div class="form-check form-switch mt-4">
                                        <input class="form-check-input" type="checkbox" id="isPub" v-model="form.is_published">
                                        <label class="form-check-label" for="isPub">Langsung tampilkan di halaman publik</label>
                                    </div>
                                    <InputError :message="form.errors.is_published" class="mt-1" />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="hideModal">Batal</button>
                            <button type="submit" class="btn btn-primary" :disabled="form.processing || !!fileError">
                                <span v-if="form.processing" class="spinner-border spinner-border-sm me-2"></span>
                                {{ form.processing ? 'Menyimpan...' : (isEdit ? 'Simpan Perubahan' : 'Tambah Berita') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <Notif ref="notifRef" />
    </StaffLayout>
</template>
