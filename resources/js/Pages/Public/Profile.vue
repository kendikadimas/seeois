<script setup>
import Notif from "@/Components/Notif.vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import InputError from "@/Components/InputError.vue";
import {
    formatDate,
    formatDateSimple,
    formatIDR,
    showImage,
    showPassword,
} from "@/utils";
import { Head, useForm, usePage } from "@inertiajs/vue3";
import { router } from "@inertiajs/vue3";
import {
    ref,
    computed,
    watch,
    onMounted,
    onUnmounted,
    defineProps,
    defineExpose,
} from "vue";

const props = defineProps({
    notif: Object,
});
const auth_user = computed(() => usePage().props.auth.user);
const title = ref("Profile");
const toastNotifRef = ref(null);
const modalConfirmationRef = ref(null);
const modalUpdateProfileRef = ref(null);
const modalUpdateProfile = ref(null);
const modalUpdatePasswordRef = ref(null);
const modalUpdatePassword = ref(null);
const inputProfileImageRef = ref(null);
const isLargeScreen = ref(window.innerWidth >= 1200);
const formUpdateProfile = useForm({
    name: auth_user.value.name,
    phone: auth_user.value.phone,
    profile_image: auth_user.value.profile_image,
    location: auth_user.value?.location ?? null,
});

const formUpdatePassword = useForm({
    old_password: null,
    password: null,
    password_confirmation: null,
});

function triggerFileUploadProfileImage() {
    inputProfileImageRef.value.click();
}
function handleSubmitUpdateProfile() {
    formUpdateProfile.post(route("profile.update"), {
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
const handleFileUploadProfileImage = (event) => {
    formUpdateProfile.profile_image = event.target.files[0];
    handleSubmitUpdateProfile();
};
function handleSubmitUpdatePassword() {
    formUpdatePassword.post(route("password.change"), {
        onSuccess: () => {
            showUpdatePasswordModal(false);
            formUpdatePassword.reset();
        },
    });
}
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
const handleResize = () => {
    isLargeScreen.value = window.innerWidth >= 768;
    window.addEventListener("resize", handleResize);
};

function confirmation(route, message) {
    if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route, message);
    } else {
        console.error("modalConfirmationRef is null");
    }
}
onMounted(() => {
    window.addEventListener("resize", handleResize);
});
onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
});

watch(
    () => props.notif,
    (newValue) => {
        const notification = newValue;
        toastNotifRef.value.showToast(notification.type, notification.message);
    }
);
</script>
<template>
    <GuestLayout>
        <!-- Page Layout -->
        <Head :title="title" />
        <!-- Modal Box -->
        <ModalConfirmation ref="modalConfirmationRef" />
        <!-- Notif Toast -->
        <Notif ref="toastNotifRef" />
        <div
            :class="isLargeScreen ? 'bg-light' : 'bg-light'"
            style="min-height: 100vh; min-width: 100vw"
        >
            <div class="bg-warning shadow-lg mx-auto px-3 py-3">
                <div class="d-flex text-primary-emphasis">
                    <div class="card bg-white shadow p-3 mx-auto">
                        <div class="d-flex">
                            <button
                                class="btn btn-sm btn-light text-primary"
                                @click="router.visit(route('shop'))"
                            >
                                <i class="bi bi-chevron-left"></i>
                                <span class="ms-2">{{ "Back" }}</span>
                            </button>
                            <div
                                class="border-start border-primary border-2 mx-3 my-1"
                            ></div>
                            <span class="h4 text-warning my-auto">
                                <i class="bi bi-person-fill"></i>
                                {{ "Profile" }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mt-5">
                <div class="row g-4">
                    <div class="col-12 col-xl-7">
                        <div class="card bg-white shadow-sm p-3">
                            <div class="d-block position-relative">
                                <div class="dropdown">
                                    <button
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        class="btn btn-sm btn-outline-secondary end-0 top-0 position-absolute mt-1 me-1 border-0"
                                    >
                                        <i class="bi bi-gear-fill"></i>
                                    </button>
                                    <div
                                        class="dropdown-menu dropdown-menu-end p-0 shadow border"
                                    >
                                        <ul class="list-group list-group-flush">
                                            <li
                                                class="list-group-item list-group-item-action p-2 d-flex rounded-top"
                                                @click="
                                                    showUpdateProfileModal(true)
                                                "
                                            >
                                                <i
                                                    class="bi bi-person-vcard text-secondary me-2"
                                                ></i
                                                >{{ "Profile" }}
                                            </li>
                                            <li
                                                class="list-group-item list-group-item-action p-2 d-flex rounded-bottom"
                                                @click="
                                                    showUpdatePasswordModal(
                                                        true
                                                    )
                                                "
                                            >
                                                <i
                                                    class="bi bi-key text-secondary me-2"
                                                ></i
                                                >{{ "Password" }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div
                                    class="rounded d-xl-inline-block d-block mx-auto mx-xl-0 float-xl-start position-relative"
                                    :style="{ width: '40%' }"
                                >
                                    <img
                                        :src="
                                            '/storage/images/profile/' +
                                            (auth_user?.profile_image ??
                                                'example.png')
                                        "
                                        alt="image"
                                        class="w-100 rounded"
                                        style="
                                            aspect-ratio: 1;
                                            object-fit: cover;
                                            width: 40%;
                                        "
                                    />
                                    <button
                                        @click="triggerFileUploadProfileImage()"
                                        class="btn btn-sm btn-primary border-0 shadow rounded-5 position-absolute end-0 bottom-0 me-2 mb-2"
                                    >
                                        <i class="bi bi-camera"></i>
                                    </button>
                                    <!-- Image File Input -->
                                    <input
                                        ref="inputProfileImageRef"
                                        type="file"
                                        class="d-none"
                                        @change="handleFileUploadProfileImage"
                                    />
                                </div>
                                <div
                                    class="d-xl-inline-block d-lg-block ps-3 float-xl-end"
                                    style="width: 60%"
                                >
                                    <div class="d-flex mt-3 mt-xl-0">
                                        <i
                                            class="bi bi-person text-secondary fs-5 me-3 my-auto"
                                        ></i>
                                        <div class="">
                                            <p
                                                class="text-secondary mb-0"
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "Name" }}
                                            </p>
                                            <p
                                                class="text-secondary-emphasis mb-0"
                                            >
                                                {{ auth_user.name }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="d-flex mt-3">
                                        <i
                                            class="bi bi-envelope-at text-secondary fs-5 me-3 my-auto"
                                        ></i>
                                        <div class="">
                                            <p
                                                class="text-secondary mb-0"
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "Email" }}
                                            </p>
                                            <p
                                                class="text-secondary-emphasis mb-0"
                                            >
                                                {{ auth_user.email }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="d-flex mt-3">
                                        <i
                                            class="bi bi-whatsapp text-secondary fs-5 me-3 my-auto"
                                        ></i>
                                        <div class="">
                                            <p
                                                class="text-secondary mb-0"
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "Whatsapp / Phone" }}
                                            </p>
                                            <p
                                                class="text-secondary-emphasis mb-0"
                                            >
                                                {{ auth_user.phone }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="d-flex mt-3">
                                        <i
                                            class="bi bi-cake2 text-secondary fs-5 me-3 my-auto"
                                        ></i>
                                        <div class="">
                                            <p
                                                class="text-secondary mb-0"
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "Birth Date" }}
                                            </p>
                                            <p
                                                class="text-secondary-emphasis mb-0"
                                            >
                                                {{ auth_user.phone }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="d-flex mt-3">
                                        <i
                                            class="bi bi-geo-alt text-secondary fs-5 me-3 my-auto"
                                        ></i>
                                        <div class="">
                                            <p
                                                class="text-secondary mb-0"
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "Address" }}
                                            </p>
                                            <p
                                                class="text-secondary-emphasis mb-0"
                                            >
                                                {{
                                                    auth_user?.location ??
                                                    "Not set"
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </GuestLayout>

    <!-- Modal -->
    <!-- Update Profile Modal -->
    <div class="modal fade" ref="modalUpdateProfileRef" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered px-3 px-lg-0">
            <div class="modal-content shadow mt-5">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i
                            class="bi bi-person-vcard border-secondary-subtle border-2 border-end pe-2"
                        ></i>
                        {{ "Update Profile" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showUpdateProfileModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <form
                    method="post"
                    @submit.prevent="handleSubmitUpdateProfile()"
                >
                    <div class="modal-body bg-light">
                        <div class="row justify-content-center">
                            <div class="col-4 col-lg-3 d-flex">
                                <label
                                    class="form-label d-inline-block my-auto"
                                    >{{ "Email" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <span>{{ auth_user.email }}</span>
                            </div>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <div class="col-4 col-lg-3 d-flex">
                                <label
                                    for="profile_name"
                                    class="form-label d-inline-block my-auto"
                                    >{{ "Name" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    id="profile_name"
                                    type="text"
                                    class="form-control form-control-sm d-inline-block"
                                    v-model="formUpdateProfile.name"
                                    required
                                />
                                <InputError
                                    :message="formUpdateProfile.errors.name"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <div class="col-4 col-lg-3 d-flex">
                                <label
                                    for="profile_phone"
                                    class="form-label d-inline-block my-auto"
                                    >{{ "Whatsapp/Phone" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    id="profile_phone"
                                    type="tel"
                                    class="form-control form-control-sm d-inline-block"
                                    v-model="formUpdateProfile.phone"
                                    required
                                />
                                <InputError
                                    :message="formUpdateProfile.errors.phone"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <div class="col-4 col-lg-3 d-flex">
                                <label
                                    for="profile_location"
                                    class="form-label d-inline-block my-auto"
                                    >{{ "Location" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    id="profile_location"
                                    type="text"
                                    class="form-control form-control-sm d-inline-block"
                                    v-model="formUpdateProfile.location"
                                />
                                <InputError
                                    :message="formUpdateProfile.errors.location"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-1">
                        <button type="submit" class="btn btn-sm btn-primary">
                            {{ "Update" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Update Password Modal -->
    <div class="modal fade" ref="modalUpdatePasswordRef" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered px-3 px-lg-0">
            <div class="modal-content shadow mt-5">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i
                            class="bi bi-key border-secondary-subtle border-2 border-end pe-2"
                        ></i>
                        {{ "Update Password" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showUpdatePasswordModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <form
                    method="post"
                    @submit.prevent="handleSubmitUpdatePassword()"
                >
                    <div class="modal-body bg-light">
                        <div class="row justify-content-center">
                            <div class="col-10">
                                <span
                                    class="text-secondary d-block"
                                    style="text-align: justify"
                                    >{{
                                        "Be caution, you will update your password account. If you are forget, you can choose 'forget password' in the login or register page."
                                    }}</span
                                >
                            </div>
                        </div>
                        <!-- Old Password -->
                        <div class="row justify-content-center mt-3">
                            <div class="col-5 col-lg-4">
                                <label
                                    for="old_password"
                                    class="form-label my-1"
                                    >Old Password</label
                                >
                            </div>
                            <div class="col-7 col-lg-6">
                                <div class="input-group input-group-sm">
                                    <input
                                        type="password"
                                        class="form-control form-control-sm"
                                        id="old_password"
                                        v-model="
                                            formUpdatePassword.old_password
                                        "
                                        autocomplete="password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        class="btn bg-light text-secondary"
                                        @click="
                                            showPassword(
                                                'old_password',
                                                'old_password_icon'
                                            )
                                        "
                                    >
                                        <i
                                            class="bi bi-eye-slash-fill"
                                            id="old_password_icon"
                                        ></i>
                                    </button>
                                </div>
                                <InputError
                                    :message="
                                        formUpdatePassword.errors.old_password
                                    "
                                />
                            </div>
                        </div>
                        <!-- New Password -->
                        <div class="row justify-content-center mt-3">
                            <div class="col-5 col-lg-4">
                                <label for="password" class="form-label my-1"
                                    >New Password</label
                                >
                            </div>
                            <div class="col-7 col-lg-6">
                                <div class="input-group input-group-sm">
                                    <input
                                        type="password"
                                        class="form-control form-control-sm"
                                        id="password"
                                        v-model="formUpdatePassword.password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        class="btn bg-light text-secondary"
                                        @click="
                                            showPassword(
                                                'password',
                                                'password_icon'
                                            )
                                        "
                                    >
                                        <i
                                            class="bi bi-eye-slash-fill"
                                            id="password_icon"
                                        ></i>
                                    </button>
                                </div>
                                <InputError
                                    :message="
                                        formUpdatePassword.errors.password
                                    "
                                />
                            </div>
                        </div>
                        <!-- Confirm Password -->
                        <div class="row justify-content-center mt-3">
                            <div class="col-5 col-lg-4">
                                <label
                                    for="password_confirmation"
                                    class="form-label my-1"
                                    >Confirm Password</label
                                >
                            </div>
                            <div class="col-7 col-lg-6">
                                <div class="input-group input-group-sm">
                                    <input
                                        type="password"
                                        class="form-control form-control-sm"
                                        id="password_confirmation"
                                        v-model="
                                            formUpdatePassword.password_confirmation
                                        "
                                        required
                                    />
                                    <button
                                        type="button"
                                        class="btn bg-light text-secondary"
                                        @click="
                                            showPassword(
                                                'password_confirmation',
                                                'password_confirmation_icon'
                                            )
                                        "
                                    >
                                        <i
                                            class="bi bi-eye-slash-fill"
                                            id="password_confirmation_icon"
                                        ></i>
                                    </button>
                                </div>
                                <InputError
                                    :message="
                                        formUpdatePassword.errors
                                            .password_confirmation
                                    "
                                />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-1">
                        <button type="submit" class="btn btn-sm btn-primary">
                            {{ "Update" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
