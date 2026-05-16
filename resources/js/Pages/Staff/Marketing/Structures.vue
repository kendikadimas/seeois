<script setup>
import { useForm, usePage } from '@inertiajs/vue3';
import { ref, onMounted, nextTick } from 'vue';
import StaffLayout from '@/Layouts/StaffLayout.vue';
import InputError from '@/Components/InputError.vue';
import Notif from '@/Components/Notif.vue';

const props = defineProps({
    structures: Array,
});

const notifRef = ref(null);
const modalInstance = ref(null);
const isEdit = ref(false);

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
    form.image_path = e.target.files[0];
}

function showModal(structure = null) {
    if (structure) {
        isEdit.value = true;
        form.id = structure.id;
        form.name = structure.name;
        form.role_title = structure.role_title;
        form.department_name = structure.department_name;
        form.order_num = structure.order_num;
        form.is_executive = structure.is_executive == 1;
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
        })).post(`/seeo/marketing/structures/${form.id}`, {
            onSuccess: () => {
                hideModal();
                notifRef.value?.showToast('success', 'Struktur berhasil diupdate.');
            }
        });
    } else {
        form.post("/seeo/marketing/structures", {
            onSuccess: () => {
                hideModal();
                notifRef.value?.showToast('success', 'Struktur berhasil ditambahkan.');
            }
        });
    }
}

function deleteStructure(id) {
    if (confirm('Yakin ingin menghapus data struktur ini?')) {
        form.delete(`/seeo/marketing/structures/${id}`, {
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
</script>

<template>
    <StaffLayout>
        <template #header> Manajemen Struktur (Marketing) </template>
        
        <div class="container-fluid p-4">
            <div class="card shadow-sm border-0 rounded-4">
                <div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                    <h5 class="mb-0 fw-bold">Data Struktur Organisasi</h5>
                    <button class="btn btn-primary shadow-sm" @click="showModal(null)">
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
                                        <button class="btn btn-sm btn-light border me-2" @click="showModal(item)">
                                            <i class="bi bi-pencil"></i>
                                        </button>
                                        <button class="btn btn-sm btn-outline-danger" @click="deleteStructure(item.id)">
                                            <i class="bi bi-trash"></i>
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
                                <label class="form-label">Nama</label>
                                <input type="text" class="form-control" v-model="form.name" required>
                                <InputError :message="form.errors.name" class="mt-1" />
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label class="form-label">Jabatan (Role Title)</label>
                                    <input type="text" class="form-control" v-model="form.role_title" required>
                                    <InputError :message="form.errors.role_title" class="mt-1" />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Departemen</label>
                                    <input type="text" class="form-control" v-model="form.department_name">
                                    <InputError :message="form.errors.department_name" class="mt-1" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label class="form-label">Nomor Urut</label>
                                    <input type="number" class="form-control" v-model="form.order_num">
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
                                <label class="form-label">Foto Profil (Opsional)</label>
                                <input type="file" class="form-control" @change="handleFileChange" accept="image/*">
                                <InputError :message="form.errors.image_path" class="mt-1" />
                                <div v-if="isEdit" class="form-text text-muted">Biarkan kosong jika tidak ingin mengubah foto.</div>
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
