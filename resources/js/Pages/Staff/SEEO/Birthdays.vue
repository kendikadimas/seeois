<template>
    <StaffLayout>
        <template #header>HR Birthday Panel</template>

        <div class="container-fluid p-4">
            <Notif v-if="notif" :notif="notif" />

            <div class="card shadow-sm border-0">
                <div class="card-header bg-white py-3 fw-bold d-flex justify-content-between align-items-center">
                    <span class="text-primary"><i class="bi bi-cake2 me-2"></i>Staff Birthdays</span>
                    <span class="badge bg-primary rounded-pill">{{ users.length }} Staff</span>
                </div>
                <div class="table-responsive">
                    <table class="table mb-0 align-middle table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Birth Date</th>
                                <th>Next Birthday</th>
                                <th>Days Left</th>
                                <th class="text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" :key="user.id" :class="{'table-info-subtle': user.birthday_in_days >= 0 && user.birthday_in_days <= 7}">
                                <td>
                                    <div class="fw-medium">{{ user.name }}</div>
                                </td>
                                <td>{{ user.role_name || '-' }}</td>
                                <td>
                                    <span v-if="user.birth_date" class="text-dark">
                                        {{ new Date(user.birth_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' }) }}
                                    </span>
                                    <span v-else class="text-muted small italic">Belum diset</span>
                                </td>
                                <td>{{ user.next_birthday }}</td>
                                <td>
                                    <span v-if="user.birthday_in_days === 0" class="badge bg-danger pulse">Today! 🎂</span>
                                    <span v-else-if="user.birthday_in_days > 0 && user.birthday_in_days <= 7" class="badge bg-warning text-dark">In {{ user.birthday_in_days }} days</span>
                                    <span v-else-if="user.birthday_in_days > 7">{{ user.birthday_in_days }} days</span>
                                    <span v-else class="text-muted">-</span>
                                </td>
                                <td class="text-center">
                                    <button @click="openEditModal(user)" class="btn btn-sm btn-light" title="Edit Tanggal Lahir">
                                        <i class="bi bi-pencil-square text-primary"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="users.length === 0">
                                <td colspan="6" class="text-center text-muted py-5">
                                    <i class="bi bi-person-exclamation fs-2 d-block mb-2"></i>
                                    No staff data found.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div class="modal fade" id="editBirthdayModal" tabindex="-1" ref="modalRef">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold">Set Tanggal Lahir</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <form @submit.prevent="submit">
                        <div class="modal-body">
                            <div class="mb-3 text-center">
                                <div class="small text-muted mb-1">Karyawan</div>
                                <div class="fw-bold fs-5">{{ editingUser?.name }}</div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label small fw-medium">Tanggal Lahir</label>
                                <input type="date" v-model="form.birth_date" class="form-control" required>
                                <div v-if="errors.birth_date" class="text-danger small mt-1">{{ errors.birth_date }}</div>
                            </div>
                        </div>
                        <div class="modal-footer bg-light">
                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Batal</button>
                            <button type="submit" class="btn btn-primary" :disabled="form.processing">
                                <span v-if="form.processing" class="spinner-border spinner-border-sm me-1"></span>
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </StaffLayout>
</template>

<script setup>
import StaffLayout from '@/Layouts/StaffLayout.vue';
import Notif from '@/Components/Notif.vue';
import { useForm } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';

const props = defineProps({
    users: { type: Array, default: () => [] },
    notif: Object,
    errors: Object,
});

const modalRef = ref(null);
const editingUser = ref(null);
let bootstrapModal = null;

const form = useForm({
    birth_date: '',
});

onMounted(() => {
    if (typeof window.bootstrap !== 'undefined') {
        bootstrapModal = new window.bootstrap.Modal(modalRef.value);
    }
});

function openEditModal(user) {
    editingUser.value = user;
    form.birth_date = user.birth_date || '';
    if (bootstrapModal) bootstrapModal.show();
}

function submit() {
    form.post(`/seeo/staff/hr/birthdays/${editingUser.value.id}`, {
        onSuccess: () => {
            if (bootstrapModal) bootstrapModal.hide();
        },
    });
}
</script>

<style scoped>
.pulse {
    animation: pulse-animation 2s infinite;
}
@keyframes pulse-animation {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}
.table-info-subtle {
    background-color: rgba(13, 202, 240, 0.05);
}
</style>
