<script setup>
import StaffLayout from "@/Layouts/StaffLayout.vue";
import Notif from "@/Components/Notif.vue";
import { ref, computed } from "vue";
import { router, usePage } from "@inertiajs/vue3";

const props = defineProps({
    governanceYears: Array,
    activeYear: Object,
    staff: Array,
    nonStaff: Array,
    roles: Array,
    notif: Object,
    errors: Object,
});

// ── Year Form ─────────────────────────────────────────────
const newYear = ref(new Date().getFullYear() + 1);
const newLabel = ref("");

function storeYear() {
    router.post("/seeo/staff/ceo/year", { year: newYear.value, label: newLabel.value }, {
        preserveScroll: true,
        onSuccess: () => { newYear.value = new Date().getFullYear() + 1; newLabel.value = ""; }
    });
}

function toggleYear(id) {
    router.post(`/seeo/staff/ceo/year/${id}/toggle`, {}, { preserveScroll: true });
}

// ── Staff Management ──────────────────────────────────────
const staffSearch = ref("");
const nonStaffSearch = ref("");

const filteredStaff = computed(() =>
    props.staff.filter(u =>
        u.name.toLowerCase().includes(staffSearch.value.toLowerCase()) ||
        (u.email || "").toLowerCase().includes(staffSearch.value.toLowerCase())
    )
);

const filteredNonStaff = computed(() =>
    props.nonStaff.filter(u =>
        u.name.toLowerCase().includes(nonStaffSearch.value.toLowerCase()) ||
        (u.email || "").toLowerCase().includes(nonStaffSearch.value.toLowerCase())
    )
);

// Per-staff role assignment state
const roleMap = ref({});
function getRoleValue(user) {
    return roleMap.value[user.id] ?? user.roles_id;
}
function setRoleValue(user, val) {
    roleMap.value[user.id] = parseInt(val);
}

function assignRole(user) {
    const rid = roleMap.value[user.id] ?? user.roles_id;
    router.post(`/seeo/staff/ceo/user/${user.id}/role`, { roles_id: rid }, { preserveScroll: true });
}

function promoteUser(userId) {
    router.post(`/seeo/staff/ceo/user/${userId}/promote`, {}, { preserveScroll: true });
}

function demoteUser(userId, name) {
    if (!confirm(`Keluarkan ${name} dari staff?`)) return;
    router.post(`/seeo/staff/ceo/user/${userId}/demote`, {}, { preserveScroll: true });
}

// ── Tab state ─────────────────────────────────────────────
const tab = ref("years"); // "years" | "staff" | "recruit"
</script>

<template>
    <StaffLayout page_title="CEO Panel">
        <Head title="CEO Panel" />

        <Notif v-if="notif" :type="notif.type" :message="notif.message" />

        <div class="ceo-panel">
            <!-- Header -->
            <div class="panel-header">
                <div>
                    <h1 class="panel-title"><i class="bi bi-award-fill me-2"></i>CEO Panel</h1>
                    <p class="panel-sub">Kelola kepengurusan tahunan &amp; manajemen staff</p>
                </div>
                <div class="active-year-badge" v-if="activeYear">
                    <i class="bi bi-calendar-check-fill"></i>
                    Aktif: {{ activeYear.label || activeYear.year }}
                </div>
                <div class="active-year-badge inactive" v-else>
                    <i class="bi bi-exclamation-triangle-fill"></i>
                    Belum ada tahun aktif
                </div>
            </div>

            <!-- Tabs -->
            <div class="tab-bar">
                <button :class="['tab-btn', { active: tab === 'years' }]" @click="tab = 'years'">
                    <i class="bi bi-calendar3"></i> Tahun Kepengurusan
                </button>
                <button :class="['tab-btn', { active: tab === 'staff' }]" @click="tab = 'staff'">
                    <i class="bi bi-people-fill"></i> Manajemen Staff
                    <span class="badge">{{ staff.length }}</span>
                </button>
                <button :class="['tab-btn', { active: tab === 'recruit' }]" @click="tab = 'recruit'">
                    <i class="bi bi-person-plus-fill"></i> Rekrut Staff
                    <span class="badge">{{ nonStaff.length }}</span>
                </button>
            </div>

            <!-- ═══════════════════════════════════════════════════ -->
            <!-- TAB: TAHUN KEPENGURUSAN                            -->
            <!-- ═══════════════════════════════════════════════════ -->
            <div v-show="tab === 'years'" class="tab-content">

                <!-- Add Year Form -->
                <div class="card-block">
                    <h3 class="block-title"><i class="bi bi-plus-circle-fill"></i> Tambah Tahun Kepengurusan</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Tahun</label>
                            <input type="number" v-model="newYear" min="2000" max="2099" class="form-ctrl" />
                        </div>
                        <div class="form-group flex-2">
                            <label>Label (opsional)</label>
                            <input type="text" v-model="newLabel" placeholder="cth: Kepengurusan 2026/2027" class="form-ctrl" />
                        </div>
                        <div class="form-group align-end">
                            <button class="btn-primary" @click="storeYear">
                                <i class="bi bi-plus"></i> Tambah
                            </button>
                        </div>
                    </div>
                    <p v-if="errors?.year" class="err-msg">{{ errors.year[0] }}</p>
                </div>

                <!-- Year List -->
                <div class="card-block">
                    <h3 class="block-title"><i class="bi bi-list-ul"></i> Daftar Tahun Kepengurusan</h3>
                    <div v-if="governanceYears.length === 0" class="empty-state">
                        Belum ada tahun kepengurusan. Tambahkan di atas.
                    </div>
                    <div v-else class="year-list">
                        <div
                            v-for="gy in governanceYears"
                            :key="gy.id"
                            :class="['year-card', { 'year-active': gy.is_active }]"
                        >
                            <div class="year-info">
                                <span class="year-number">{{ gy.year }}</span>
                                <span class="year-label">{{ gy.label || '—' }}</span>
                                <span v-if="gy.is_active" class="badge-active">AKTIF</span>
                            </div>
                            <div class="year-meta" v-if="gy.activated_by && gy.is_active">
                                Diaktifkan oleh {{ gy.activated_by?.name || '—' }}
                                {{ gy.activated_at ? 'pada ' + new Date(gy.activated_at).toLocaleDateString('id-ID') : '' }}
                            </div>
                            <div class="year-actions">
                                <!-- Toggle switch ON/OFF -->
                                <button
                                    :class="['toggle-switch', { 'toggle-on': gy.is_active }]"
                                    @click="toggleYear(gy.id)"
                                    :title="gy.is_active ? 'Klik untuk nonaktifkan' : 'Klik untuk aktifkan'"
                                >
                                    <span class="toggle-knob"></span>
                                </button>
                                <span class="toggle-label" :class="{ 'toggle-label-on': gy.is_active }">
                                    {{ gy.is_active ? 'Aktif' : 'Nonaktif' }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ═══════════════════════════════════════════════════ -->
            <!-- TAB: MANAJEMEN STAFF                               -->
            <!-- ═══════════════════════════════════════════════════ -->
            <div v-show="tab === 'staff'" class="tab-content">
                <div class="card-block">
                    <div class="block-header">
                        <h3 class="block-title"><i class="bi bi-people-fill"></i> Daftar Staff</h3>
                        <input type="text" v-model="staffSearch" placeholder="Cari nama / email..." class="form-ctrl search-ctrl" />
                    </div>

                    <div v-if="filteredStaff.length === 0" class="empty-state">
                        Tidak ada staff ditemukan.
                    </div>
                    <div v-else class="staff-table-wrap">
                        <table class="staff-table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>Role Saat Ini</th>
                                    <th>Ubah Role</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in filteredStaff" :key="user.id">
                                    <td>
                                        <div class="user-name">{{ user.name }}</div>
                                    </td>
                                    <td class="text-muted">{{ user.email }}</td>
                                    <td>
                                        <span class="role-chip">
                                            {{ user.roles?.name || 'Role #' + user.roles_id }}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            :value="getRoleValue(user)"
                                            @change="setRoleValue(user, $event.target.value)"
                                            class="form-ctrl-sm"
                                        >
                                            <option v-for="r in roles" :key="r.id" :value="r.id">
                                                [{{ r.id }}] {{ r.name }}
                                            </option>
                                        </select>
                                    </td>
                                    <td class="actions-cell">
                                        <button class="btn-sm-primary" @click="assignRole(user)" title="Simpan role">
                                            <i class="bi bi-check2"></i> Simpan
                                        </button>
                                        <button class="btn-sm-danger" @click="demoteUser(user.id, user.name)" title="Keluarkan dari staff">
                                            <i class="bi bi-person-dash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- ═══════════════════════════════════════════════════ -->
            <!-- TAB: REKRUT STAFF                                  -->
            <!-- ═══════════════════════════════════════════════════ -->
            <div v-show="tab === 'recruit'" class="tab-content">
                <div class="card-block">
                    <div class="block-header">
                        <h3 class="block-title"><i class="bi bi-person-plus-fill"></i> User Terdaftar (Belum Staff)</h3>
                        <input type="text" v-model="nonStaffSearch" placeholder="Cari nama / email..." class="form-ctrl search-ctrl" />
                    </div>

                    <div v-if="filteredNonStaff.length === 0" class="empty-state">
                        Semua user sudah menjadi staff, atau belum ada yang mendaftar.
                    </div>
                    <div v-else class="staff-table-wrap">
                        <table class="staff-table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>Bergabung</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in filteredNonStaff" :key="user.id">
                                    <td><div class="user-name">{{ user.name }}</div></td>
                                    <td class="text-muted">{{ user.email }}</td>
                                    <td class="text-muted">
                                        {{ new Date(user.created_at).toLocaleDateString('id-ID') }}
                                    </td>
                                    <td>
                                        <button class="btn-sm-primary" @click="promoteUser(user.id)">
                                            <i class="bi bi-person-plus"></i> Jadikan Staff
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </StaffLayout>
</template>

<style scoped>
.ceo-panel { padding: 1.5rem; max-width: 1100px; margin: 0 auto; }

.panel-header {
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;
}
.panel-title { font-size: 1.6rem; font-weight: 700; margin: 0; color: #1e293b; }
.panel-sub { color: #64748b; margin: 0; font-size: 0.9rem; }

.active-year-badge {
    display: flex; align-items: center; gap: 0.4rem;
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    color: white; padding: 0.4rem 1rem; border-radius: 99px;
    font-weight: 600; font-size: 0.9rem;
}
.active-year-badge.inactive { background: linear-gradient(135deg, #f59e0b, #ef4444); }

/* Tabs */
.tab-bar { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.tab-btn {
    display: flex; align-items: center; gap: 0.4rem;
    padding: 0.55rem 1.2rem; border-radius: 8px; border: 1.5px solid #e2e8f0;
    background: white; cursor: pointer; font-size: 0.9rem; color: #475569;
    font-weight: 500; transition: all 0.2s;
}
.tab-btn:hover { border-color: #6366f1; color: #6366f1; }
.tab-btn.active { background: #6366f1; color: white; border-color: #6366f1; }
.tab-btn .badge {
    background: rgba(255,255,255,0.25); color: inherit;
    border-radius: 99px; padding: 0 0.5rem; font-size: 0.75rem; font-weight: 700;
}
.tab-btn:not(.active) .badge { background: #e2e8f0; color: #64748b; }

/* Cards */
.card-block {
    background: white; border-radius: 12px; padding: 1.5rem;
    box-shadow: 0 1px 6px rgba(0,0,0,0.06); margin-bottom: 1.2rem;
    border: 1px solid #e2e8f0;
}
.block-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.2rem; flex-wrap: wrap; }
.block-title { font-size: 1rem; font-weight: 600; color: #334155; margin: 0 0 1rem; display: flex; align-items: center; gap: 0.4rem; }
.block-header .block-title { margin: 0; }

/* Form */
.form-row { display: flex; gap: 0.8rem; flex-wrap: wrap; align-items: flex-end; }
.form-group { display: flex; flex-direction: column; gap: 0.3rem; flex: 1; min-width: 140px; }
.form-group.flex-2 { flex: 2; }
.form-group.align-end { justify-content: flex-end; }
.form-ctrl {
    padding: 0.5rem 0.8rem; border-radius: 8px; border: 1.5px solid #cbd5e1;
    font-size: 0.9rem; outline: none; transition: border 0.2s; background: #f8fafc;
}
.form-ctrl:focus { border-color: #6366f1; background: white; }
.form-ctrl-sm {
    padding: 0.35rem 0.6rem; border-radius: 6px; border: 1.5px solid #cbd5e1;
    font-size: 0.85rem; outline: none; background: #f8fafc; width: 100%;
}
.search-ctrl { max-width: 260px; }
label { font-size: 0.82rem; color: #64748b; font-weight: 500; }
.err-msg { color: #ef4444; font-size: 0.82rem; margin-top: 0.4rem; }

/* Buttons */
.btn-primary {
    background: #6366f1; color: white; border: none; padding: 0.5rem 1.2rem;
    border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem;
    display: flex; align-items: center; gap: 0.3rem; transition: opacity 0.2s;
}
.btn-primary:hover { opacity: 0.88; }
.btn-success {
    background: #10b981; color: white; border: none; padding: 0.4rem 1rem;
    border-radius: 7px; cursor: pointer; font-size: 0.85rem; font-weight: 600;
    display: flex; align-items: center; gap: 0.3rem; transition: opacity 0.2s;
}
.btn-success:hover { opacity: 0.88; }
.btn-disabled {
    color: #94a3b8; font-size: 0.85rem; display: flex; align-items: center; gap: 0.3rem;
    padding: 0.4rem 0.8rem;
}
.btn-danger-sm {
    background: #fee2e2; color: #ef4444; border: none; padding: 0.4rem 0.7rem;
    border-radius: 7px; cursor: pointer; font-size: 0.85rem; transition: background 0.2s;
}
.btn-danger-sm:hover { background: #fca5a5; }
.btn-sm-primary {
    background: #6366f1; color: white; border: none; padding: 0.32rem 0.8rem;
    border-radius: 6px; cursor: pointer; font-size: 0.82rem; font-weight: 600;
    display: inline-flex; align-items: center; gap: 0.25rem; transition: opacity 0.2s;
}
.btn-sm-primary:hover { opacity: 0.88; }
.btn-sm-danger {
    background: #fee2e2; color: #ef4444; border: none; padding: 0.32rem 0.65rem;
    border-radius: 6px; cursor: pointer; font-size: 0.82rem; transition: background 0.2s;
}
.btn-sm-danger:hover { background: #fca5a5; }

/* Toggle Switch */
.toggle-switch {
    position: relative; display: inline-flex; align-items: center;
    width: 48px; height: 26px; border-radius: 99px; border: none;
    background: #cbd5e1; cursor: pointer;
    transition: background 0.3s ease; padding: 0; flex-shrink: 0;
}
.toggle-switch.toggle-on { background: #10b981; }
.toggle-knob {
    position: absolute; left: 3px;
    width: 20px; height: 20px; border-radius: 50%; background: white;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    transition: transform 0.3s ease;
}
.toggle-switch.toggle-on .toggle-knob { transform: translateX(22px); }
.toggle-label { font-size: 0.82rem; color: #94a3b8; font-weight: 500; }
.toggle-label-on { color: #10b981; font-weight: 600; }

/* Year Cards */
.year-list { display: flex; flex-direction: column; gap: 0.8rem; }
.year-card {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;
    gap: 0.8rem; padding: 1rem 1.2rem; border-radius: 10px;
    border: 1.5px solid #e2e8f0; background: #f8fafc; transition: border-color 0.2s;
}
.year-card.year-active { border-color: #6366f1; background: #eef2ff; }
.year-info { display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap; }
.year-number { font-size: 1.25rem; font-weight: 700; color: #1e293b; }
.year-label { color: #64748b; font-size: 0.9rem; }
.badge-active {
    background: #6366f1; color: white; font-size: 0.72rem; font-weight: 700;
    padding: 0.15rem 0.6rem; border-radius: 99px; letter-spacing: 0.05em;
}
.year-meta { font-size: 0.8rem; color: #94a3b8; width: 100%; }
.year-actions { display: flex; align-items: center; gap: 0.5rem; }

/* Staff Table */
.staff-table-wrap { overflow-x: auto; }
.staff-table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
.staff-table th {
    text-align: left; padding: 0.6rem 0.8rem; border-bottom: 2px solid #e2e8f0;
    color: #64748b; font-weight: 600; font-size: 0.8rem; text-transform: uppercase;
    letter-spacing: 0.04em; white-space: nowrap;
}
.staff-table td { padding: 0.65rem 0.8rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
.staff-table tr:hover td { background: #f8fafc; }
.user-name { font-weight: 600; color: #1e293b; }
.text-muted { color: #94a3b8; }
.role-chip {
    background: #f1f5f9; color: #475569; padding: 0.2rem 0.7rem;
    border-radius: 99px; font-size: 0.8rem; font-weight: 500; white-space: nowrap;
}
.actions-cell { display: flex; gap: 0.4rem; align-items: center; white-space: nowrap; }

.empty-state {
    text-align: center; padding: 2.5rem; color: #94a3b8;
    font-size: 0.95rem; background: #f8fafc; border-radius: 8px;
}

@media (max-width: 640px) {
    .ceo-panel { padding: 1rem; }
    .panel-header { flex-direction: column; align-items: flex-start; }
    .tab-bar { gap: 0.4rem; }
    .tab-btn { padding: 0.45rem 0.9rem; font-size: 0.82rem; }
}
</style>
