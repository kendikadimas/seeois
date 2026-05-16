<template>
    <StaffLayout>
        <template #header>Company Profile CMS (Marketing)</template>

        <div class="container-fluid p-4">
            <div class="card shadow-sm">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Konten Company Profile</h5>
                    <button class="btn btn-primary" @click="showAdd = !showAdd">Tambah Konten</button>
                </div>
                <div class="card-body">
                    <div v-if="showAdd" class="mb-4">
                        <form @submit.prevent="submitAdd" enctype="multipart/form-data">
                            <div class="row g-2">
                                <div class="col-md-4"><input v-model="form.key" class="form-control" placeholder="Key (unique)" required /></div>
                                <div class="col-md-4"><input v-model="form.order" type="number" class="form-control" placeholder="Order" /></div>
                                <div class="col-md-4"><input type="file" @change="onFile" accept="image/*" class="form-control" /></div>
                                <div class="col-12 mt-2"><textarea v-model="form.value" class="form-control" rows="3" placeholder="Content value (HTML allowed)"></textarea></div>
                                <div class="col-12 mt-2 text-end"><button class="btn btn-success" :disabled="processing">Simpan</button></div>
                            </div>
                        </form>
                    </div>

                    <div class="list-group">
                        <div v-for="item in items" :key="item.id" class="list-group-item d-flex justify-content-between align-items-start">
                            <div>
                                <div class="fw-bold">{{ item.key }} <small class="text-muted">#{{ item.order }}</small></div>
                                <div class="text-truncate" style="max-width:600px;">{{ item.value }}</div>
                            </div>
                            <div class="d-flex gap-2">
                                <a v-if="item.image_path" :href="item.image_path" target="_blank" class="btn btn-sm btn-outline-secondary">View</a>
                                <button class="btn btn-sm btn-outline-primary" @click="startEdit(item)">Edit</button>
                                <button class="btn btn-sm btn-outline-danger" @click="remove(item.id)">Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <form @submit.prevent="submitEdit" enctype="multipart/form-data">
                        <div class="modal-header"><h5 class="modal-title">Edit Konten</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
                        <div class="modal-body">
                            <div class="mb-2"><textarea v-model="editForm.value" class="form-control" rows="6"></textarea></div>
                            <div class="mb-2"><input type="file" @change="onEditFile" class="form-control" accept="image/*" /></div>
                            <div class="mb-2"><input v-model.number="editForm.order" type="number" class="form-control" /></div>
                        </div>
                        <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Batal</button><button class="btn btn-primary" :disabled="processing">Simpan</button></div>
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

const props = defineProps({ items: Array });

const items = ref(props.items || []);
const showAdd = ref(false);
const processing = ref(false);

const form = useForm({ key: '', value: '', image: null, order: 0 });
function onFile(e) { form.image = e.target.files[0] || null; }

const editForm = useForm({ id: null, value: '', image: null, order: 0 });
function onEditFile(e) { editForm.image = e.target.files[0] || null; }

function submitAdd() {
    processing.value = true;
    form.post("/seeo/marketing/compro", {
        onSuccess: () => location.reload(),
        onFinish: () => processing.value = false,
    });
}

function startEdit(item) {
    editForm.id = item.id;
    editForm.value = item.value;
    editForm.order = item.order || 0;
    const modalEl = document.getElementById('editModal');
    if (modalEl && window.bootstrap) window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

function submitEdit() {
    processing.value = true;
    editForm.transform(data => ({ ...data, _method: 'put' })).post(`/seeo/marketing/compro/${editForm.id}`, {
        onSuccess: () => location.reload(),
        onFinish: () => processing.value = false,
    });
}

function remove(id) {
    if (!confirm('Hapus konten ini?')) return;
    const f = useForm();
    f.delete(`/seeo/marketing/compro/${id}`, { onSuccess: () => location.reload() });
}

onMounted(() => {});
</script>

<style scoped>
.text-truncate { white-space: normal; overflow: hidden; text-overflow: ellipsis; }
</style>
