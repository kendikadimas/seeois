<script setup>
import StaffLayout from "@/Layouts/StaffLayout.vue";
import InputError from "@/Components/InputError.vue";
import Notif from "@/Components/Notif.vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import { Head, useForm, usePage } from "@inertiajs/vue3";
import {
    ref,
    computed,
    watch,
    defineProps,
} from "vue";
import { formatIDR, getMonthName, showImage, formatDateOnly } from "@/utils";

const props = defineProps({
    section: { type: String, default: "profile" },
    profile: Object,
    logbook_list: Array,
    program_list: Array,
    contribution_settings: Object,
    contribution: Object,
    notif: Object,
    errors: Object,
});

const auth_user = computed(() => {
    return usePage().props.auth.user;
});
const title = computed(() => {
    if (props.section === "logbook") return "Logbook Saya";
    if (props.section === "iwp") return "Pembayaran IWP";
    return "Profil " + props.profile.name;
});
const modalConfirmationRef = ref(null);
const toastNotifRef = ref(null);
const modalUpdateProfileRef = ref(null);
const modalUpdateProfile = ref(null);
const modalUpdatePasswordRef = ref(null);
const modalUpdatePassword = ref(null);
const inputProfileImageRef = ref(null);
const logbookImageRef = ref(null);
const modalLogbookImageRef = ref(null);
const selectedLogbookImage = ref(null);
const isLogbookOpen = ref(false);

function openLogbookImage(src) {
    selectedLogbookImage.value = src;
    if (typeof bootstrap !== "undefined" && modalLogbookImageRef.value) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalLogbookImageRef.value);
        modal.show();
    }
}

const contributionReceiptRef = ref(null);
const thisMonth = computed(() => {
    return new Date().getMonth() + 1;
});

const formUpdateProfile = useForm({
    name: props.profile.name,
    phone: props.profile.phone,
    birth_date: props.profile.birth_date,
    profile_image: props.profile.profile_image,
});

const formUpdatePassword = useForm({
    old_password: null,
    password: null,
    password_confirmation: null,
});

const formAddLogbook = useForm({
    program_id: null,
    date_time: null,
    description: null,
    image: null,
});

const formAddContribution = useForm({
    month: null,
    receipt: null,
});

function handleSubmitUpdateProfile() {
    formUpdateProfile.post("/seeo/staff/profile/update", {
        onSuccess: () => {
            showUpdateProfileModal(false);
        },
        onError: (e) => {
            if (e["profile_image"]?.length > 0) {
                toastNotifRef.value.showToast("warning", e["profile_image"]);
            }
        },
    });
}

function handleSubmitUpdatePassword() {
    formUpdatePassword.post("/seeo/staff/profile/password", {
        onSuccess: () => {
            showUpdatePasswordModal(false);
            formUpdatePassword.reset();
        },
    });
}

function handleSubmitLogbook() {
    formAddLogbook.post("/seeo/staff/logbook/add", {
        onSuccess: () => {
            formAddLogbook.reset();
            if (logbookImageRef.value) {
                logbookImageRef.value.value = "";
            }
        },
    });
}

function handleSubmitContribution() {
    formAddContribution.post("/seeo/staff/contribution/insert", {
        onSuccess: () => {
            formAddContribution.reset();
            if (contributionReceiptRef.value) {
                contributionReceiptRef.value.value = "";
            }
        },
    });
}

function triggerFileUploadProfileImage() {
    inputProfileImageRef.value.click();
}

const handleFileUploadProfileImage = (event) => {
    formUpdateProfile.profile_image = event.target.files[0];
    handleSubmitUpdateProfile();
};

const handleFileUploadLogbookImage = (event) => {
    formAddLogbook.image = event.target.files[0];
};

const handleFileUploadContributionReceipt = (event) => {
    formAddContribution.receipt = event.target.files[0];
};

function showUpdateProfileModal(is_true) {
    modalUpdateProfile.value = bootstrap.Modal.getOrCreateInstance(
        modalUpdateProfileRef.value
    );
    if (is_true) {
        modalUpdateProfile.value.show();
    } else {
        modalUpdateProfile.value.hide();
    }
}

function showUpdatePasswordModal(is_true) {
    modalUpdatePassword.value = bootstrap.Modal.getOrCreateInstance(
        modalUpdatePasswordRef.value
    );
    if (is_true) {
        modalUpdatePassword.value.show();
    } else {
        modalUpdatePassword.value.hide();
    }
}

const show_password = (input_id, icon_id) => {
    var password = document.getElementById(input_id);
    var password_icon = document.getElementById(icon_id);
    if (password.type === "password") {
        password.type = "text";
        password_icon.classList.remove("bi-eye-slash-fill");
        password_icon.classList.add("bi-eye-fill");
    } else {
        password.type = "password";
        password_icon.classList.remove("bi-eye-fill");
        password_icon.classList.add("bi-eye-slash-fill");
    }
};

function confirmation(route, message) {
    if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route, message);
    } else {
        console.error("modalConfirmationRef is null");
    }
}

watch(
    () => props.notif,
    (newValue) => {
        if (newValue) toastNotifRef.value?.showToast(newValue.type, newValue.message);
    }
);
</script>

<template>
    <!-- Page Layout -->
    <StaffLayout>
        <Head :title="title" :icon="$imageUrl('apps/logo.png')" />
        <!-- Modal Box -->
        <ModalConfirmation ref="modalConfirmationRef" />
        <template #header>
            {{ title }}
        </template>

        <div
            class="container profile-page mb-5"
            :class="{ 'profile-feature-page': section !== 'profile' }"
        >
            <div class="row gx-3 gy-3 mt-1 mt-md-3 profile-grid">
                <transition name="fade-slide-ltr">
                    <!-- Profile Card -->
                    <div
                        v-if="section === 'profile'"
                        class="col-12 col-xl-9 mx-auto"
                    >
                        <div id="profile-summary" class="card position-relative profile-summary-card">
                            <div class="dropdown">
                                <button
                                    v-if="auth_user.roles_id == 99 || auth_user.id == profile.id"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    class="btn btn-sm btn-outline-secondary inset-e-0 top-0 position-absolute mt-1 me-1 border-0"
                                >
                                    <i class="bi bi-gear-fill"></i>
                                </button>
                                <div
                                    class="dropdown-menu dropdown-menu-end p-0 shadow"
                                >
                                    <ul class="list-group list-group-flush">
                                        <li
                                            class="list-group-item p-0 d-flex rounded-top"
                                        >
                                            <button
                                                class="btn btn-sm border-0 w-100 card-bg-hover text-start"
                                                @click="
                                                    showUpdateProfileModal(true)
                                                "
                                            >
                                                <i
                                                    class="bi bi-person-vcard text-secondary me-2"
                                                ></i
                                                >{{ "Profile" }}
                                            </button>
                                        </li>
                                        <li
                                            class="list-group-item p-0 d-flex rounded-bottom"
                                        >
                                            <button
                                                @click="
                                                    showUpdatePasswordModal(
                                                        true
                                                    )
                                                "
                                                class="btn btn-sm border-0 w-100 card-bg-hover text-start"
                                            >
                                                <i
                                                    class="bi bi-key text-secondary me-2"
                                                ></i
                                                >{{ "Password" }}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <!-- Update Profile Modal -->
                                <div
                                    v-if="auth_user.roles_id == 99 || auth_user.id == profile.id"
                                    class="modal fade"
                                    ref="modalUpdateProfileRef"
                                    tabindex="-1"
                                >
                                    <div
                                        class="modal-dialog modal-dialog-centered px-3 px-lg-0"
                                    >
                                        <div class="modal-content shadow mt-5">
                                            <div
                                                class="modal-header py-1 ps-3 pe-2"
                                            >
                                                <span
                                                    class="modal-title fs-5 text-primary-emphasis"
                                                >
                                                    <i
                                                        class="bi bi-person-vcard border-secondary-subtle border-2 border-end pe-2"
                                                    ></i>
                                                    {{ "Update Profile" }}
                                                </span>
                                                <button
                                                    type="button"
                                                    class="btn btn-sm ms-auto"
                                                    @click="
                                                        showUpdateProfileModal(
                                                            false
                                                        )
                                                    "
                                                >
                                                    <i class="bi bi-x-lg"></i>
                                                </button>
                                            </div>
                                            <form
                                                method="post"
                                                @submit.prevent="
                                                    handleSubmitUpdateProfile()
                                                "
                                            >
                                                <div
                                                    class="modal-body bg-light"
                                                >
                                                    <div
                                                        class="row justify-content-center"
                                                    >
                                                        <div
                                                            class="col-4 col-lg-3 d-flex"
                                                        >
                                                            <label
                                                                class="form-label d-inline-block my-auto"
                                                                >{{
                                                                    "Email"
                                                                }}</label
                                                            >
                                                        </div>
                                                        <div
                                                            class="col-8 col-lg-7"
                                                        >
                                                            <span>{{
                                                                profile.email
                                                            }}</span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="row justify-content-center mt-2"
                                                    >
                                                        <div
                                                            class="col-4 col-lg-3 d-flex"
                                                        >
                                                            <label
                                                                for="profile_name"
                                                                class="form-label d-inline-block my-auto"
                                                                >{{
                                                                    "Name"
                                                                }}</label
                                                            >
                                                        </div>
                                                        <div
                                                            class="col-8 col-lg-7"
                                                        >
                                                            <input
                                                                id="profile_name"
                                                                type="text"
                                                                class="form-control form-control-sm d-inline-block"
                                                                v-model="
                                                                    formUpdateProfile.name
                                                                "
                                                                required
                                                            />
                                                            <InputError
                                                                :message="
                                                                    formUpdateProfile
                                                                        .errors
                                                                        .name
                                                                "
                                                            />
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="row justify-content-center mt-2"
                                                    >
                                                        <div
                                                            class="col-4 col-lg-3 d-flex"
                                                        >
                                                            <label
                                                                for="profile_phone"
                                                                class="form-label d-inline-block my-auto"
                                                                >{{
                                                                    "Phone"
                                                                }}</label
                                                            >
                                                        </div>
                                                        <div
                                                            class="col-8 col-lg-7"
                                                        >
                                                            <input
                                                                id="profile_phone"
                                                                type="tel"
                                                                class="form-control form-control-sm d-inline-block"
                                                                v-model="
                                                                    formUpdateProfile.phone
                                                                "
                                                                required
                                                            />
                                                            <InputError
                                                                :message="
                                                                    formUpdateProfile
                                                                        .errors
                                                                        .phone
                                                                "
                                                            />
                                                        </div>
                                                    </div>

                                                    <div
                                                        class="row justify-content-center mt-2"
                                                    >
                                                        <div
                                                            class="col-4 col-lg-3 d-flex"
                                                        >
                                                            <label
                                                                for="profile_birth_date"
                                                                class="form-label d-inline-block my-auto"
                                                                >Birthday</label
                                                            >
                                                        </div>
                                                        <div
                                                            class="col-8 col-lg-7"
                                                        >
                                                            <input
                                                                id="profile_birth_date"
                                                                type="date"
                                                                class="form-control form-control-sm d-inline-block"
                                                                v-model="
                                                                    formUpdateProfile.birth_date
                                                                "
                                                            />
                                                            <InputError
                                                                :message="
                                                                    formUpdateProfile
                                                                        .errors
                                                                        .birth_date
                                                                "
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer p-1">
                                                    <button
                                                        type="submit"
                                                        class="btn btn-sm btn-primary"
                                                    >
                                                        {{ "Update" }}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <!-- Update Password Modal -->
                                <div
                                    v-if="auth_user.roles_id == 99 || auth_user.id == profile.id"
                                    class="modal fade"
                                    ref="modalUpdatePasswordRef"
                                    tabindex="-1"
                                    aria-labelledby="modalUpdatePasswordTitle"
                                    aria-hidden="true"
                                >
                                    <div class="modal-dialog modal-dialog-centered px-3 px-lg-0">
                                        <div class="modal-content border-0 shadow-lg rounded-3 overflow-hidden">
                                            <div class="modal-header bg-light border-bottom py-2.5 px-3">
                                                <div class="d-flex align-items-center gap-2">
                                                    <div class="rounded-circle bg-warning-subtle text-warning d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
                                                        <i class="bi bi-key-fill"></i>
                                                    </div>
                                                    <div>
                                                        <h6 class="modal-title fw-bold text-dark mb-0" id="modalUpdatePasswordTitle">
                                                            Ganti Kata Sandi
                                                        </h6>
                                                        <small class="text-secondary" style="font-size: 0.75rem;">
                                                            Perbarui kata sandi akun Anda
                                                        </small>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    class="btn-close"
                                                    aria-label="Close"
                                                    @click="showUpdatePasswordModal(false)"
                                                ></button>
                                            </div>
                                            <form
                                                method="post"
                                                @submit.prevent="handleSubmitUpdatePassword()"
                                            >
                                                <div class="modal-body p-3 p-md-4">
                                                    <div class="alert alert-info py-2 px-3 small d-flex align-items-start gap-2 mb-3 rounded-2">
                                                        <i class="bi bi-info-circle-fill text-info mt-0.5"></i>
                                                        <span>Pastikan kata sandi baru Anda minimal 8 karakter dan belum pernah digunakan sebelumnya.</span>
                                                    </div>

                                                    <!-- Old Password -->
                                                    <div class="mb-3">
                                                        <label for="old_password" class="form-label small fw-semibold text-secondary mb-1">
                                                            Kata Sandi Saat Ini <span class="text-danger">*</span>
                                                        </label>
                                                        <div class="input-group">
                                                            <span class="input-group-text bg-light text-secondary border-end-0">
                                                                <i class="bi bi-lock"></i>
                                                            </span>
                                                            <input
                                                                type="password"
                                                                class="form-control border-start-0 border-end-0"
                                                                id="old_password"
                                                                v-model="formUpdatePassword.old_password"
                                                                placeholder="Masukkan kata sandi saat ini"
                                                                autocomplete="current-password"
                                                                required
                                                            />
                                                            <button
                                                                type="button"
                                                                class="btn btn-outline-secondary border-start-0"
                                                                @click="show_password('old_password', 'old_password_icon')"
                                                            >
                                                                <i class="bi bi-eye-slash-fill" id="old_password_icon"></i>
                                                            </button>
                                                        </div>
                                                        <InputError :message="formUpdatePassword.errors.old_password" class="mt-1" />
                                                    </div>

                                                    <!-- New Password -->
                                                    <div class="mb-3">
                                                        <label for="password" class="form-label small fw-semibold text-secondary mb-1">
                                                            Kata Sandi Baru <span class="text-danger">*</span>
                                                        </label>
                                                        <div class="input-group">
                                                            <span class="input-group-text bg-light text-secondary border-end-0">
                                                                <i class="bi bi-shield-lock"></i>
                                                            </span>
                                                            <input
                                                                type="password"
                                                                class="form-control border-start-0 border-end-0"
                                                                id="password"
                                                                v-model="formUpdatePassword.password"
                                                                placeholder="Minimal 8 karakter"
                                                                autocomplete="new-password"
                                                                required
                                                            />
                                                            <button
                                                                type="button"
                                                                class="btn btn-outline-secondary border-start-0"
                                                                @click="show_password('password', 'password_icon')"
                                                            >
                                                                <i class="bi bi-eye-slash-fill" id="password_icon"></i>
                                                            </button>
                                                        </div>
                                                        <InputError :message="formUpdatePassword.errors.password" class="mt-1" />
                                                    </div>

                                                    <!-- Confirm Password -->
                                                    <div class="mb-2">
                                                        <label for="password_confirmation" class="form-label small fw-semibold text-secondary mb-1">
                                                            Konfirmasi Kata Sandi Baru <span class="text-danger">*</span>
                                                        </label>
                                                        <div class="input-group">
                                                            <span class="input-group-text bg-light text-secondary border-end-0">
                                                                <i class="bi bi-check2-circle"></i>
                                                            </span>
                                                            <input
                                                                type="password"
                                                                class="form-control border-start-0 border-end-0"
                                                                id="password_confirmation"
                                                                v-model="formUpdatePassword.password_confirmation"
                                                                placeholder="Ketik ulang kata sandi baru"
                                                                autocomplete="new-password"
                                                                required
                                                            />
                                                            <button
                                                                type="button"
                                                                class="btn btn-outline-secondary border-start-0"
                                                                @click="show_password('password_confirmation', 'password_confirmation_icon')"
                                                            >
                                                                <i class="bi bi-eye-slash-fill" id="password_confirmation_icon"></i>
                                                            </button>
                                                        </div>
                                                        <InputError :message="formUpdatePassword.errors.password_confirmation" class="mt-1" />
                                                    </div>
                                                </div>
                                                <div class="modal-footer bg-light py-2 px-3 border-top d-flex justify-content-end gap-2">
                                                    <button
                                                        type="button"
                                                        class="btn btn-sm btn-outline-secondary px-3"
                                                        @click="showUpdatePasswordModal(false)"
                                                    >
                                                        Batal
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        class="btn btn-sm btn-primary px-3 d-inline-flex align-items-center gap-1.5"
                                                        :disabled="formUpdatePassword.processing"
                                                    >
                                                        <span
                                                            v-if="formUpdatePassword.processing"
                                                            class="spinner-border spinner-border-sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                        ></span>
                                                        <i v-else class="bi bi-check-lg"></i>
                                                        <span>Simpan Kata Sandi</span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row gx-3 justify-content-center">
                                <div class="col-12 col-sm-5 col-lg-5 d-flex">
                                    <div
                                        class="profile-photo-card position-relative mx-3 mt-3 mb-2 mx-sm-0 ms-sm-3 mb-sm-3 w-100"
                                    >
                                        <img
                                            :src="
                                                '/storage/images/profile/' +
                                                (profile?.profile_image ??
                                                    'example.png')
                                            "
                                            alt="image"
                                            class="img-fluid w-100 h-100 object-fit-cover rounded border-secondary-subtle border shadow placeholder"
                                            @load="showImage"
                                            style="min-height: 200px"
                                        />
                                        <a
                                            :href="
                                                '/storage/images/profile/' +
                                                (profile?.profile_image ??
                                                    'example.png')
                                            "
                                            :class="
                                                'btn btn-sm btn-primary border-0 shadow rounded-5 position-absolute inset-e-0 bottom-0 mb-2 ' +
                                                (auth_user.id !== profile.id
                                                    ? 'me-2'
                                                    : '')
                                            "
                                            style="
                                                font-size: 0.6rem;
                                                padding: 0.15rem 0.34rem;
                                                margin-right: 2.5rem;
                                            "
                                            download
                                        >
                                            <i class="bi bi-download"></i>
                                        </a>
                                        <button
                                            v-if="auth_user.roles_id == 99 || auth_user.id == profile.id"
                                            @click="
                                                triggerFileUploadProfileImage()
                                            "
                                            class="btn btn-sm btn-primary border-0 shadow rounded-5 position-absolute inset-e-0 bottom-0 me-2 mb-2"
                                        >
                                            <i class="bi bi-camera"></i>
                                        </button>
                                        <!-- Image File Input -->
                                        <input
                                            ref="inputProfileImageRef"
                                            type="file"
                                            class="d-none"
                                            @change="
                                                handleFileUploadProfileImage
                                            "
                                        />
                                    </div>
                                </div>
                                <div class="col-12 col-sm-7 col-lg-7 px-4 px-sm-3 pb-3 pb-sm-0">
                                    <div class="d-flex">
                                        <i
                                            class="bi bi-person text-secondary d-lg-none fs-5 me-3 mt-1"
                                        ></i>
                                        <div class="">
                                            <p
                                                class="text-secondary mb-0 mt-lg-3"
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "Name" }}
                                            </p>
                                            <p class="text-secondary-emphasis">
                                                {{ profile.name }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <i
                                            class="bi bi-person-badge text-secondary d-lg-none fs-5 me-3 mt-1"
                                        ></i>
                                        <div>
                                            <p
                                                class="text-secondary mb-0"
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "Role" }}
                                            </p>
                                            <p class="text-secondary-emphasis">
                                                {{ profile.roles?.name }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <i
                                            class="bi bi-envelope-at text-secondary d-lg-none fs-5 me-3 mt-1"
                                        ></i>
                                        <div>
                                            <p
                                                class="text-secondary mb-0"
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "Email" }}
                                            </p>
                                            <p class="text-secondary-emphasis">
                                                {{ profile.email }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <i
                                            class="bi bi-whatsapp text-secondary d-lg-none fs-5 me-3 mt-1"
                                        ></i>
                                        <div>
                                            <p
                                                class="text-secondary mb-0"
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "Phone" }}
                                            </p>
                                            <p class="text-secondary-emphasis" v-if="profile.phone">
                                                <a
                                                    :href="
                                                        'https://wa.me/+62' +
                                                        profile.phone.slice(1)
                                                    "
                                                    target="_blank"
                                                    class="text-decoration-none text-primary"
                                                >
                                                    <i
                                                        class="bi bi-whatsapp d-none d-lg-inline"
                                                    ></i>
                                                    {{ profile.phone }}
                                                </a>
                                            </p>
                                            <p class="text-muted small" v-else>Belum diatur</p>
                                        </div>
                                    </div>
                                    <div v-if="auth_user.roles_id == 99 || auth_user.id == profile.id" class="d-flex flex-wrap gap-2 mt-4 pt-3 border-top">
                                        <button
                                            type="button"
                                            class="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1.5 px-3 py-1.5 rounded-2"
                                            @click="showUpdateProfileModal(true)"
                                        >
                                            <i class="bi bi-pencil-square"></i>
                                            <span>Edit Profil</span>
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1.5 px-3 py-1.5 rounded-2"
                                            @click="showUpdatePasswordModal(true)"
                                        >
                                            <i class="bi bi-key-fill text-warning"></i>
                                            <span>Ganti Password</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Card Keamanan Akun / Ganti Password -->
                        <div
                            v-if="auth_user.roles_id == 99 || auth_user.id == profile.id"
                            class="card mt-3 border-0 shadow-sm rounded-3 p-3 p-md-4 bg-white"
                        >
                            <div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                                <h6 class="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                                    <i class="bi bi-shield-lock-fill text-primary"></i>
                                    Keamanan Akun & Kata Sandi
                                </h6>
                                <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2.5 py-1 small">
                                    Keamanan
                                </span>
                            </div>
                            <div class="row align-items-center g-3">
                                <div class="col-12 col-md-8">
                                    <p class="small text-secondary mb-0">
                                        Ganti kata sandi secara berkala untuk menjaga akun Anda tetap aman. Kata sandi minimal 8 karakter dengan kombinasi huruf besar, huruf kecil, dan angka.
                                    </p>
                                </div>
                                <div class="col-12 col-md-4 text-md-end">
                                    <button
                                        type="button"
                                        class="btn btn-primary btn-sm d-inline-flex align-items-center gap-2 px-3 py-2 rounded-2 fw-semibold shadow-2xs"
                                        @click="showUpdatePasswordModal(true)"
                                    >
                                        <i class="bi bi-key-fill"></i>
                                        <span>Ganti Password</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
                <!-- Staff Obligations -->
                <div
                    class="col-12 profile-obligations"
                    v-if="section !== 'profile' && (auth_user.roles_id == 99 || auth_user.id == profile.id)"
                >
                    <div class="row gx-3 gy-3">
                        <div class="col-12">
                            <transition
                                name="fade-slide-rtl"
                            >
                                <!-- Logbook -->
                                <div
                                    id="logbook-upload"
                                    class="card p-3 obligation-card"
                                    v-if="section === 'logbook'"
                                >
                                    <div
                                        class="d-flex "
                                    >
                                        <span
                                            class="w-100 text-primary-emphasis h5"
                                        >
                                            <i
                                                class="bi bi-journal-bookmark me-2 fs-6"
                                            ></i
                                            >{{ "Logbook" }}
                                        </span>
                                    </div>
                                    <!-- Add Logbook -->
                                    <form
                                        v-if="auth_user.id == profile.id"
                                        @submit.prevent="handleSubmitLogbook()"
                                    >
                                        <div class="mt-2">
                                            <div class="form-floating">
                                                <select
                                                    :class="
                                                        'form-select border-0 border-bottom ' +
                                                        (formAddLogbook.errors
                                                            .program_id
                                                            ? 'is-invalid'
                                                            : '')
                                                    "
                                                    id="logbook_program"
                                                    aria-label="Floating label select example"
                                                    v-model="
                                                        formAddLogbook.program_id
                                                    "
                                                    required
                                                >
                                                    <option
                                                        value="null"
                                                        selected
                                                    >
                                                        {{ "Choose here" }}
                                                    </option>
                                                    <option
                                                        v-for="program in program_list"
                                                        :value="
                                                            program.program_id
                                                        "
                                                    >
                                                        {{
                                                            program.program
                                                                ?.name +
                                                            " as " +
                                                            program.title
                                                        }}
                                                    </option>
                                                </select>
                                                <label for="logbook_program"
                                                    >Program</label
                                                >
                                            </div>
                                            <InputError
                                                :message="
                                                    formAddLogbook.errors
                                                        .program_id
                                                "
                                            />
                                        </div>
                                        <div class="mt-2">
                                            <div class="form-floating">
                                                <input
                                                    type="date"
                                                    :class="
                                                        'form-control border-0 border-bottom  ' +
                                                        (formAddLogbook.errors
                                                            .date_time
                                                            ? 'is-invalid'
                                                            : '')
                                                    "
                                                    id="logbook_date"
                                                    v-model="
                                                        formAddLogbook.date_time
                                                    "
                                                />
                                                <label for="logbook_date"
                                                    >Date & Time</label
                                                >
                                            </div>
                                            <InputError
                                                :message="
                                                    formAddLogbook.errors
                                                        .date_time
                                                "
                                            />
                                        </div>
                                        <div class="mt-2">
                                            <div class="form-floating">
                                                <input
                                                    type="file"
                                                    :class="
                                                        'form-control border-0 border-bottom  ' +
                                                        (formAddLogbook.errors
                                                            .image
                                                            ? 'is-invalid'
                                                            : '')
                                                    "
                                                    id="logbook_image"
                                                    ref="logbookImageRef"
                                                    @change="
                                                        handleFileUploadLogbookImage
                                                    "
                                                />
                                                <label for="logbook_image">{{
                                                    "Image Photo"
                                                }}</label>
                                            </div>
                                            <InputError
                                                :message="
                                                    formAddLogbook.errors.image
                                                "
                                            />
                                        </div>
                                        <div class="mt-2">
                                            <div class="form-floating">
                                                <textarea
                                                    class="form-control border-0 border-bottom"
                                                    id="logbook_description"
                                                    style="height: 84px"
                                                    v-model="
                                                        formAddLogbook.description
                                                    "
                                                    placeholder="Add description of your activities"
                                                ></textarea>
                                                <label
                                                    for="logbook_description"
                                                    >{{ "Description" }}</label
                                                >
                                            </div>
                                            <InputError
                                                :message="
                                                    formAddLogbook.errors
                                                        .description
                                                "
                                            />
                                        </div>
                                        <div class="mt-3">
                                            <button
                                                type="submit"
                                                class="btn btn-sm btn-primary w-100"
                                            >
                                                {{ "Add Logbook" }}
                                            </button>
                                        </div>
                                    </form>
                                    <div class="mt-2 pt-2 border-top">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <button
                                                type="button"
                                                class="btn btn-sm border-0 text-primary text-decoration-none p-0 d-flex align-items-center gap-1"
                                                style="font-size: 0.78rem"
                                                @click="isLogbookOpen = !isLogbookOpen"
                                            >
                                                <i class="bi bi-journal-text fs-6"></i>
                                                <span class="fw-semibold">
                                                    {{ auth_user.id == profile.id ? "check my logbook" : "check logbook" }}
                                                </span>
                                                <span
                                                    v-if="logbook_list && logbook_list.length > 0"
                                                    class="badge rounded-pill bg-primary-subtle text-primary border border-primary-subtle ms-1"
                                                    style="font-size: 0.68rem"
                                                >
                                                    {{ logbook_list.length }}
                                                </span>
                                                <i
                                                    class="bi ms-1"
                                                    :class="isLogbookOpen ? 'bi-chevron-up' : 'bi-chevron-down'"
                                                    style="font-size: 0.75rem"
                                                ></i>
                                            </button>
                                            <span
                                                v-if="program_list && program_list.length > 0"
                                                class="text-muted"
                                                style="font-size: 0.72rem"
                                            >
                                                {{ program_list.length }} Program
                                            </span>
                                        </div>

                                        <!-- Logbook Details Panel -->
                                        <transition name="fade">
                                            <div
                                                v-show="isLogbookOpen"
                                                class="mt-2 pt-2 border-top"
                                            >
                                                <!-- 1. Akses Halaman Logbook per Program -->
                                                <div class="mb-3">
                                                    <div class="d-flex align-items-center justify-content-between mb-1">
                                                        <span
                                                            class="text-secondary fw-semibold"
                                                            style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.5px;"
                                                        >
                                                            <i class="bi bi-folder2-open me-1"></i>Halaman Logbook Program
                                                        </span>
                                                    </div>
                                                    <div
                                                        v-if="program_list && program_list.length > 0"
                                                        class="d-flex flex-column gap-1"
                                                    >
                                                        <a
                                                            v-for="program in program_list"
                                                            :key="program.id"
                                                            :href="`/seeo/staff/program/${program.program_id}/logbook/${profile.id}`"
                                                            class="d-flex align-items-center justify-content-between p-2 rounded-2 border bg-light text-decoration-none text-body"
                                                            style="font-size: 0.78rem;"
                                                        >
                                                            <div class="d-flex align-items-center text-truncate me-2">
                                                                <i class="bi bi-kanban text-primary me-2 flex-shrink-0"></i>
                                                                <span class="fw-medium text-dark text-truncate">{{ program.program?.name ?? ('Program #' + program.program_id) }}</span>
                                                                <span class="text-secondary mx-1 fw-light">as</span>
                                                                <span class="text-primary fw-medium text-truncate">{{ program.title }}</span>
                                                            </div>
                                                            <i class="bi bi-box-arrow-up-right text-primary flex-shrink-0" style="font-size: 0.72rem"></i>
                                                        </a>
                                                    </div>
                                                    <div v-else class="text-muted fst-italic py-1" style="font-size: 0.75rem">
                                                        Belum terdaftar pada program apapun.
                                                    </div>
                                                </div>

                                                <!-- 2. Riwayat Logbook Terbaru -->
                                                <div>
                                                    <div class="d-flex align-items-center justify-content-between mb-2">
                                                        <span
                                                            class="text-secondary fw-semibold"
                                                            style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.5px;"
                                                        >
                                                            <i class="bi bi-clock-history me-1"></i>Riwayat Logbook
                                                        </span>
                                                        <span
                                                            v-if="logbook_list && logbook_list.length > 0"
                                                            class="text-muted"
                                                            style="font-size: 0.7rem"
                                                        >
                                                            (5 Terakhir)
                                                        </span>
                                                    </div>

                                                    <div
                                                        v-if="logbook_list && logbook_list.length > 0"
                                                        class="d-flex flex-column gap-2"
                                                        style="max-height: 380px; overflow-y: auto;"
                                                    >
                                                        <div
                                                            v-for="log in logbook_list"
                                                            :key="log.id"
                                                            class="card border border-light-subtle bg-white p-2 rounded-2 shadow-xs"
                                                        >
                                                            <div class="d-flex justify-content-between align-items-start mb-1">
                                                                <div class="d-flex align-items-center gap-1 flex-wrap">
                                                                    <span
                                                                        class="badge bg-primary-subtle text-primary border border-primary-subtle"
                                                                        style="font-size: 0.68rem"
                                                                    >
                                                                        {{ log.program?.name ?? 'Program' }}
                                                                    </span>
                                                                    <span
                                                                        v-if="log.validated == 1"
                                                                        class="badge bg-success-subtle text-success border border-success-subtle"
                                                                        style="font-size: 0.65rem"
                                                                    >
                                                                        <i class="bi bi-check-circle-fill me-1"></i>Tervalidasi
                                                                    </span>
                                                                    <span
                                                                        v-else
                                                                        class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle"
                                                                        style="font-size: 0.65rem"
                                                                    >
                                                                        <i class="bi bi-clock me-1"></i>Pending
                                                                    </span>
                                                                </div>
                                                                <small class="text-muted flex-shrink-0 ms-1" style="font-size: 0.7rem">
                                                                    <i class="bi bi-calendar3 me-1"></i>{{ formatDateOnly(log.date_time) }}
                                                                </small>
                                                            </div>

                                                            <div class="d-flex gap-2 align-items-start mt-1">
                                                                <!-- Thumbnail with click to preview modal -->
                                                                <div v-if="log.image" class="flex-shrink-0">
                                                                    <img
                                                                        :src="`/storage/images/log/${log.program_id}/${log.image}`"
                                                                        alt="Foto Logbook"
                                                                        class="rounded border border-secondary-subtle object-fit-cover"
                                                                        style="width: 52px; height: 52px; cursor: pointer"
                                                                        @click="openLogbookImage(`/storage/images/log/${log.program_id}/${log.image}`)"
                                                                        title="Klik untuk melihat foto lebih besar"
                                                                    />
                                                                </div>
                                                                <div class="flex-grow-1 text-wrap" style="min-width: 0;">
                                                                    <p class="mb-1 text-dark" style="font-size: 0.78rem; line-height: 1.35; white-space: pre-line">
                                                                        {{ log.title || '(Tanpa keterangan kegiatan)' }}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div class="d-flex justify-content-end mt-1 pt-1 border-top border-light">
                                                                <a
                                                                    :href="`/seeo/staff/program/${log.program_id}/logbook/${profile.id}`"
                                                                    class="text-primary text-decoration-none fw-medium d-inline-flex align-items-center"
                                                                    style="font-size: 0.7rem"
                                                                >
                                                                    <span>Buka halaman program</span>
                                                                    <i class="bi bi-arrow-right-short fs-6"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div v-else class="alert alert-light border text-center py-3 my-1 rounded-2">
                                                        <i class="bi bi-journal-x text-muted fs-3 d-block mb-1"></i>
                                                        <p class="mb-0 text-muted" style="font-size: 0.78rem">
                                                            Belum ada catatan logbook yang diunggah.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <div class="col-12">
                            <transition
                                name="fade-slide-rtl"
                            >
                                <!-- Contribution -->
                                <div
                                    id="iwp-payment"
                                    class="card p-3 obligation-card"
                                    v-if="section === 'iwp'"
                                >
                                    <div
                                        class="d-flex "
                                    >
                                        <span
                                            class="w-100 text-primary-emphasis h5"
                                        >
                                            <i
                                                class="bi bi-journal-text me-2 fs-6"
                                            ></i
                                            >{{ "Contribution" }}
                                        </span>
                                    </div>
                                    <div class="mt-2">
                                        <span
                                            class="text-secondary"
                                            style="font-size: 0.8rem"
                                            >{{ "Your progress :" }}</span
                                        >
                                    </div>
                                    <div class="mt-1">
                                        <div
                                            :class="
                                                'btn shadow-sm px-1 py-0 me-1 ' +
                                                (month +
                                                    contribution_settings?.start -
                                                    1 <=
                                                    thisMonth &&
                                                month >
                                                    (contribution
                                                        ? contribution?.months
                                                        : 0)
                                                    ? 'bg-danger bg-opacity-25'
                                                    : '') +
                                                (month <= contribution?.months
                                                    ? 'bg-primary bg-opacity-25'
                                                    : 'bg-secondary bg-opacity-25 border-dark-subtle border')
                                            "
                                            v-for="month in contribution_settings.period"
                                        >
                                            <span
                                                style="font-size: 0.7rem"
                                                :class="
                                                    'position-relative ' +
                                                    (month <=
                                                    contribution?.months
                                                        ? 'text-primary '
                                                        : 'text-secondary ')
                                                "
                                                >{{
                                                    getMonthName(
                                                        month +
                                                            contribution_settings.start -
                                                            1,
                                                        "short"
                                                    )
                                                }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="mt-2 d-flex">
                                        <span
                                            class="text-secondary me-2"
                                            style="font-size: 0.8rem"
                                            >{{ "Status :" }}</span
                                        >
                                    </div>
                                    <div class="mt-1">
                                        <span class="text-secondary">{{
                                            contribution_settings.start +
                                                (contribution
                                                    ? contribution.months - 1
                                                    : 0) <=
                                            thisMonth
                                                ? "You have unpaid bill for " +
                                                  (thisMonth -
                                                      contribution_settings?.start -
                                                      (contribution
                                                          ? contribution.months -
                                                            1
                                                          : -1) +
                                                      (thisMonth -
                                                          contribution_settings?.start -
                                                          (contribution
                                                              ? contribution.months -
                                                                1
                                                              : -1) >
                                                      1
                                                          ? " months"
                                                          : " month"))
                                                : "You are on track."
                                        }}</span>
                                    </div>
                                    <!-- Add Contribution -->
                                    <form
                                        v-if="auth_user.id == profile.id"
                                        @submit.prevent="
                                            handleSubmitContribution()
                                        "
                                    >
                                        <div
                                            class="mt-3 border-top border-primary"
                                        >
                                            <div class="form-floating">
                                                <select
                                                    :class="
                                                        'form-select border-0 border-bottom ' +
                                                        (formAddContribution
                                                            .errors.month
                                                            ? 'is-invalid'
                                                            : '')
                                                    "
                                                    id="contribution_month"
                                                    aria-label="Floating label select example"
                                                    v-model="
                                                        formAddContribution.month
                                                    "
                                                    required
                                                >
                                                    <option
                                                        value="null"
                                                        selected
                                                    >
                                                        {{ "Choose here" }}
                                                    </option>
                                                    <option
                                                        v-for="month in contribution_settings?.period -
                                                        (contribution
                                                            ? contribution?.months
                                                            : 0)"
                                                        :value="month"
                                                        class="position-relative"
                                                    >
                                                        {{
                                                            month +
                                                            (month > 1
                                                                ? " months"
                                                                : " month")
                                                        }}
                                                    </option>
                                                </select>
                                                <label
                                                    for="contribution_month"
                                                    >{{ "Pay for" }}</label
                                                >
                                            </div>
                                            <InputError
                                                :message="
                                                    formAddContribution.errors
                                                        .month
                                                "
                                            />
                                        </div>
                                        <div class="mt-2">
                                            <div class="form-floating">
                                                <input
                                                    type="file"
                                                    :class="
                                                        'form-control border-0 border-bottom  ' +
                                                        (formAddContribution
                                                            .errors.receipt
                                                            ? 'is-invalid'
                                                            : '')
                                                    "
                                                    id="contribution_receipt"
                                                    ref="contributionReceiptRef"
                                                    @change="
                                                        handleFileUploadContributionReceipt
                                                    "
                                                />
                                                <label
                                                    for="contribution_receipt"
                                                    >{{ "Receipt" }}</label
                                                >
                                            </div>
                                            <InputError
                                                :message="
                                                    formAddContribution.errors
                                                        .receipt
                                                "
                                            />
                                        </div>
                                        <div class="mt-2 d-flex">
                                            <span
                                                class="ms-auto text-secondary"
                                                >{{ "Price : " }}</span
                                            >
                                            <span class="text-dark ms-2">{{
                                                formatIDR(
                                                    contribution_settings?.price *
                                                        formAddContribution.month
                                                )
                                            }}</span>
                                        </div>
                                        <div class="mt-3">
                                            <button
                                                type="submit"
                                                class="btn btn-sm btn-primary w-100"
                                            >
                                                {{ "Add Contribution" }}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <!-- Modal Preview Foto Logbook -->
    <div
        class="modal fade"
        ref="modalLogbookImageRef"
        tabindex="-1"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow border-0">
                <div class="modal-header py-2 ps-3 pe-2 bg-light">
                    <span class="modal-title fs-6 fw-semibold text-primary-emphasis">
                        <i class="bi bi-image me-2 text-primary"></i>Foto Dokumentasi Logbook
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        data-bs-dismiss="modal"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="modal-body bg-light text-center p-3">
                    <img
                        v-if="selectedLogbookImage"
                        :src="selectedLogbookImage"
                        class="img-fluid rounded shadow-sm border"
                        style="max-height: 70vh; object-fit: contain"
                        alt="Foto Logbook"
                    />
                </div>
                <div class="modal-footer py-2 px-3 d-flex justify-content-between">
                    <a
                        v-if="selectedLogbookImage"
                        :href="selectedLogbookImage"
                        target="_blank"
                        download
                        class="btn btn-sm btn-outline-primary"
                    >
                        <i class="bi bi-download me-1"></i>Download Foto
                    </a>
                    <button
                        type="button"
                        class="btn btn-sm btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    </div>
    </StaffLayout>

    <!-- Notif Toast -->
    <Notif ref="toastNotifRef" />
</template>

<style scoped>
.profile-page,
.profile-grid,
.profile-grid > * {
    min-width: 0;
}

.profile-summary-card,
.obligation-card {
    box-shadow: 0 2px 8px rgba(30, 41, 59, 0.05) !important;
}

.profile-feature-page {
    max-width: 760px !important;
}

.profile-feature-page .obligation-card {
    width: 100%;
}

.profile-photo-card {
    min-width: 0;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    border-radius: 0.65rem;
    background: #f8fafc;
}

.profile-photo-card > img {
    display: block;
    aspect-ratio: 4 / 5;
    min-height: 0 !important;
    object-fit: cover;
}

.obligation-card {
    scroll-margin-top: 0.75rem;
}

@media (max-width: 991.98px) {
    .profile-obligations,
    .profile-obligations > .row,
    .profile-obligations > .row > div {
        min-width: 0;
    }

    .obligation-card {
        width: 100%;
        margin: 0;
    }
}

@media (max-width: 575.98px) {
    .profile-page {
        margin-bottom: 0 !important;
    }

    .profile-page .form-floating > label {
        max-width: calc(100% - 1rem);
    }

    .profile-photo-card {
        max-width: 15rem;
        margin-inline: auto !important;
    }

    .profile-photo-card > img {
        max-height: 15rem;
        aspect-ratio: 1 / 1;
    }

    .profile-mobile-actions .btn {
        flex: 1;
        margin-left: 0 !important;
    }

    .profile-mobile-actions .d-flex.mt-2 {
        gap: 0.5rem;
    }

    .obligation-card {
        padding: 0.9rem !important;
    }
}
</style>



