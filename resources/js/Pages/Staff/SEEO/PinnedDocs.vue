<template>
    <StaffLayout>
        <template #header>Dokumen Penting (Pinned Documents)</template>

        <div class="container-fluid p-4">
            <div class="card shadow-sm">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Daftar Dokumen Penting</h5>
                    <button class="btn btn-primary" @click="showAdd = !showAdd">Tambah Dokumen</button>
                </div>
                <div class="card-body">
                    <!-- Add Form -->
                    <div v-if="showAdd" class="mb-4 p-3 border rounded bg-light">
                        <h6>Tambah Dokumen Penting</h6>
                        <form @submit.prevent="submitAdd" enctype="multipart/form-data">
                            <div class="row g-2">
                                <div class="col-md-6">
                                    <label class="form-label">Judul</label>
                                    <input v-model="form.title" class="form-control" required />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Tahun <small class="text-muted">(opsional)</small></label>
                                    <input v-model.number="form.pinned_year" type="number" class="form-control" placeholder="cth: 2025" min="2000" max="2099" />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">File Dokumen (PDF/DOC)</label>
                                    <input type="file" @change="onFile" accept=".pdf,.doc,.docx" class="form-control" />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Link (opsional)</label>
                                    <input v-model="form.link" type="url" class="form-control" placeholder="https://..." />
                                </div>
                                <div class="col-12 mt-2 text-end">
                                    <button class="btn btn-secondary me-2" @click="showAdd = false">Batal</button>
                                    <button class="btn btn-success" :disabled="processing">Simpan</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <!-- Documents Table -->
                    <div v-if="pinnedDocs && pinnedDocs.length" class="table-responsive">
                        <table class="table table-hover">
                            <thead class="table-light">
                                <tr>
                                    <th>Judul</th>
                                    <th>Tahun</th>
                                    <th>Tipe</th>
                                    <th>File</th>
                                    <th>Link</th>
                                    <th>Pembuat</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="doc in pinnedDocs" :key="doc.id">
                                    <td>{{ doc.title }}</td>
                                    <td><span class="badge bg-secondary">{{ doc.pinned_year }}</span></td>
                                    <td><small class="text-muted">{{ doc.type }}</small></td>
                                    <td>
                                        <a v-if="doc.document" :href="`/storage/local/${doc.document}`" target="_blank" class="btn btn-sm btn-outline-secondary">Unduh</a>
                                        <small v-else class="text-muted">-</small>
                                    </td>
                                    <td>
                                        <a v-if="doc.link" :href="doc.link" target="_blank" class="btn btn-sm btn-outline-info">Buka</a>
                                        <small v-else class="text-muted">-</small>
                                    </td>
                                    <td><small>{{ doc.user?.name || 'N/A' }}</small></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary" @click="startEdit(doc)">Edit</button>
                                        <button class="btn btn-sm btn-outline-danger ms-1" @click="remove(doc.id)">Hapus</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="alert alert-info">Belum ada dokumen penting yang ditambahkan.</div>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <form @submit.prevent="submitEdit" enctype="multipart/form-data">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Dokumen Penting</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Judul</label>
                                <input v-model="editForm.title" class="form-control" required />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Tahun <small class="text-muted">(opsional)</small></label>
                                <input v-model.number="editForm.pinned_year" type="number" class="form-control" placeholder="cth: 2025" min="2000" max="2099" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">File Dokumen (PDF/DOC)</label>
                                <input type="file" @change="onEditFile" accept=".pdf,.doc,.docx" class="form-control" />
                                <small class="text-muted d-block mt-1">Kosongkan jika tidak ingin mengubah file</small>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Link (opsional)</label>
                                <input v-model="editForm.link" type="url" class="form-control" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                            <button class="btn btn-primary" :disabled="processing">Simpan Perubahan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </StaffLayout>
</template>

<script setup>
import StaffLayout from '@/Layouts/StaffLayout.vue';
import { ref, onMounted } from 'vue';
import { useForm } from '@inertiajs/vue3';

const props = defineProps({
    pinnedDocs: Array,
    defaultYear: Number,
});

const pinnedDocs = ref(props.pinnedDocs || []);
const showAdd = ref(false);
const processing = ref(false);

const form = useForm({
    title: '',
    document: null,
    link: '',
    pinned_year: props.defaultYear ?? new Date().getFullYear(),
    type: 1,
});

function onFile(e) {
    form.document = e.target.files[0] || null;
}

const editForm = useForm({
    id: null,
    title: '',
    document: null,
    link: '',
    pinned_year: props.defaultYear ?? new Date().getFullYear(),
});

function onEditFile(e) {
    editForm.document = e.target.files[0] || null;
}

function submitAdd() {
    processing.value = true;
    form.post('/seeo/staff/pinned-docs', {
        onSuccess: () => location.reload(),
        onFinish: () => processing.value = false,
    });
}

function startEdit(doc) {
    editForm.id = doc.id;
    editForm.title = doc.title;
    editForm.link = doc.link || '';
    editForm.pinned_year = doc.pinned_year;
    const modalEl = document.getElementById('editModal');
    if (modalEl && window.bootstrap) window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

function submitEdit() {
    processing.value = true;
    editForm.transform(data => ({ ...data, _method: 'put' })).post('/seeo/staff/pinned-docs/' + editForm.id, {
        onSuccess: () => location.reload(),
        onFinish: () => processing.value = false,
    });
}

function remove(id) {
    if (!confirm('Hapus dokumen ini?')) return;
    const f = useForm();
    f.delete('/seeo/staff/pinned-docs/' + id, { onSuccess: () => location.reload() });
}

onMounted(() => {});
</script>

<style scoped>
.table-responsive { max-height: 600px; overflow-y: auto; }
</style>
