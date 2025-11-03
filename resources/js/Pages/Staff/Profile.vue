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
    onMounted,
    onUnmounted,
    defineProps,
    defineExpose,
} from "vue";
import { formatIDR, getMonthName, showImage } from "@/utils";
import { getMonth } from "date-fns";

const props = defineProps({
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
    return props.profile.name + " Profile";
});
const modalConfirmationRef = ref(null);
const toastNotifRef = ref(null);
const modalUpdateProfileRef = ref(null);
const modalUpdateProfile = ref(null);
const modalUpdatePasswordRef = ref(null);
const modalUpdatePassword = ref(null);
const inputProfileImageRef = ref(null);
const logbookImageRef = ref(null);
const contributionReceiptRef = ref(null);
const activeTab = ref(1);
const targetTab = ref(0);
const thisMonth = computed(() => {
    return new Date().getMonth() + 1;
});

const formUpdateProfile = useForm({
    name: props.profile.name,
    phone: props.profile.phone,
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

function handleSubmitUpdatePassword() {
    formUpdatePassword.post(route("password.change"), {
        onSuccess: () => {
            showUpdatePasswordModal(false);
            formUpdatePassword.reset();
        },
    });
}

function handleSubmitLogbook() {
    formAddLogbook.post(route("logbook.add"), {
        onSuccess: () => {
            formAddLogbook.reset();
            if (logbookImageRef.value) {
                logbookImageRef.value.value = "";
            }
        },
    });
}

function handleSubmitContribution() {
    formAddContribution.post(route("contribution.insert"), {
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

function setActiveTab() {
    activeTab.value = targetTab.value;
}

function setTargetTab(number) {
    targetTab.value = number;
    activeTab.value = 0;
    console.log(targetTab.value, activeTab.value);
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

const isLargeScreen = ref(window.innerWidth >= 768);
const handleResize = () => {
    isLargeScreen.value = window.innerWidth >= 768;
};

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
    <!-- Page Layout -->
    <StaffLayout>
        <Head :title="title" :icon="$imageUrl('apps/logo.png')" />
        <!-- Modal Box -->
        <ModalConfirmation ref="modalConfirmationRef" />
        <template #header>
            {{ title }}
        </template>

        <div class="container me-lg-0 mx-auto mb-5">
            <div class="row gx-4 mt-4">
                <transition name="fade-slide-ltr" @after-leave="setActiveTab()">
                    <!-- Profile Card -->
                    <div
                        v-if="activeTab == 1 || isLargeScreen"
                        :class="
                            'col-12 ' +
                            (auth_user.id == profile.id
                                ? 'col-lg-5'
                                : 'col-lg-9')
                        "
                    >
                        <div class="card position-relative shadow">
                            <div class="dropdown">
                                <button
                                    v-if="auth_user.id == profile.id"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    class="btn btn-sm btn-outline-secondary end-0 top-0 position-absolute mt-1 me-1 border-0"
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
                                    v-if="auth_user.id == profile.id"
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
                                    v-if="auth_user.id == profile.id"
                                    class="modal fade"
                                    ref="modalUpdatePasswordRef"
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
                                                        class="bi bi-key border-secondary-subtle border-2 border-end pe-2"
                                                    ></i>
                                                    {{ "Update Password" }}
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
                                                    handleSubmitUpdatePassword()
                                                "
                                            >
                                                <div
                                                    class="modal-body bg-light"
                                                >
                                                    <div
                                                        class="row justify-content-center"
                                                    >
                                                        <div class="col-10">
                                                            <span
                                                                class="text-secondary d-block"
                                                                style="
                                                                    text-align: justify;
                                                                "
                                                                >{{
                                                                    "Be caution, you will update your password account. If you are forget, you can choose 'forget password' in the login or register page."
                                                                }}</span
                                                            >
                                                        </div>
                                                    </div>
                                                    <!-- Old Password -->
                                                    <div
                                                        class="row justify-content-center mt-3"
                                                    >
                                                        <div
                                                            class="col-5 col-lg-4"
                                                        >
                                                            <label
                                                                for="old_password"
                                                                class="form-label my-1"
                                                                >Old
                                                                Password</label
                                                            >
                                                        </div>
                                                        <div
                                                            class="col-7 col-lg-6"
                                                        >
                                                            <div
                                                                class="input-group input-group-sm"
                                                            >
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
                                                                        show_password(
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
                                                                    formUpdatePassword
                                                                        .errors
                                                                        .old_password
                                                                "
                                                            />
                                                        </div>
                                                    </div>
                                                    <!-- New Password -->
                                                    <div
                                                        class="row justify-content-center mt-3"
                                                    >
                                                        <div
                                                            class="col-5 col-lg-4"
                                                        >
                                                            <label
                                                                for="password"
                                                                class="form-label my-1"
                                                                >New
                                                                Password</label
                                                            >
                                                        </div>
                                                        <div
                                                            class="col-7 col-lg-6"
                                                        >
                                                            <div
                                                                class="input-group input-group-sm"
                                                            >
                                                                <input
                                                                    type="password"
                                                                    class="form-control form-control-sm"
                                                                    id="password"
                                                                    v-model="
                                                                        formUpdatePassword.password
                                                                    "
                                                                    required
                                                                />
                                                                <button
                                                                    type="button"
                                                                    class="btn bg-light text-secondary"
                                                                    @click="
                                                                        show_password(
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
                                                                    formUpdatePassword
                                                                        .errors
                                                                        .password
                                                                "
                                                            />
                                                        </div>
                                                    </div>
                                                    <!-- Confirm Password -->
                                                    <div
                                                        class="row justify-content-center mt-3"
                                                    >
                                                        <div
                                                            class="col-5 col-lg-4"
                                                        >
                                                            <label
                                                                for="password_confirmation"
                                                                class="form-label my-1"
                                                                >Confirm
                                                                Password</label
                                                            >
                                                        </div>
                                                        <div
                                                            class="col-7 col-lg-6"
                                                        >
                                                            <div
                                                                class="input-group input-group-sm"
                                                            >
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
                                                                        show_password(
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
                                                                    formUpdatePassword
                                                                        .errors
                                                                        .password_confirmation
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
                            </div>
                            <div class="row gx-3 justify-content-center">
                                <div class="col-5 col-lg-5 d-flex">
                                    <div
                                        class="card position-relative my-3 ms-3 w-100"
                                    >
                                        <img
                                            :src="
                                                '/storage/images/profile/' +
                                                (profile?.profile_image ??
                                                    'example.png')
                                            "
                                            alt="image"
                                            class="img-fluid w-100 h-100 object-fit-cover rounded border-secondary-subtle border-1 shadow placeholder"
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
                                                'btn btn-sm btn-primary border-0 shadow rounded-5 position-absolute end-0 bottom-0 mb-2 ' +
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
                                            v-if="auth_user.id == profile.id"
                                            @click="
                                                triggerFileUploadProfileImage()
                                            "
                                            class="btn btn-sm btn-primary border-0 shadow rounded-5 position-absolute end-0 bottom-0 me-2 mb-2"
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
                                <div class="col-10 col-lg-7">
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
                                                {{ profile.roles.name }}
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
                                            <p class="text-secondary-emphasis">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card p-3 mt-4 d-lg-none">
                            <div
                                class="d-flex border-bottom border-secondary pb-1"
                            >
                                <span class="text-secondary">{{
                                    "Duties and Obligations"
                                }}</span>
                            </div>
                            <div class="d-flex mt-2">
                                <!-- Logbook trigger -->
                                <button
                                    class="btn btn-sm"
                                    @click="setTargetTab(2)"
                                >
                                    <div class="d-flex">
                                        <i
                                            class="bi bi-journal-bookmark rounded-4 fs-1 text-primary border border-primary-subtle border-1 shadow-sm py-1 px-2 d-block mx-auto"
                                        ></i>
                                    </div>
                                    <span
                                        class="fw-light d-block mt-1"
                                        style="font-size: 0.8rem"
                                        >{{ "Logbook" }}</span
                                    >
                                </button>
                                <!-- Contribution trigger -->
                                <button
                                    class="ms-4 btn btn-sm"
                                    @click="setTargetTab(3)"
                                >
                                    <div class="d-flex">
                                        <i
                                            class="bi bi-journal-text rounded-4 fs-1 text-primary border border-primary-subtle border-1 shadow-sm py-1 px-2 mx-auto"
                                        ></i>
                                    </div>
                                    <span
                                        class="fw-light d-block mt-1"
                                        style="font-size: 0.8rem"
                                        >{{ "Contribution" }}</span
                                    >
                                </button>
                            </div>
                        </div>
                    </div>
                </transition>
                <!-- Staff Obligations -->
                <div class="col-lg-7 col-12" v-if="auth_user.id == profile.id">
                    <div class="row gx-4">
                        <div class="col-lg-6 col-12">
                            <transition
                                name="fade-slide-rtl"
                                @after-leave="setActiveTab()"
                            >
                                <!-- Logbook -->
                                <div
                                    class="card p-3"
                                    v-if="activeTab == 2 || isLargeScreen"
                                >
                                    <div
                                        class="d-flex border-bottom border-primary"
                                    >
                                        <span
                                            class="w-100 text-primary-emphasis h5"
                                        >
                                            <i
                                                class="bi bi-journal-bookmark me-2 fs-6"
                                            ></i
                                            >{{ "Logbook" }}
                                        </span>
                                        <button
                                            class="btn btn-sm text-primary fw-light ms-auto p-0 d-lg-none d-flex"
                                            @click="setTargetTab(1)"
                                        >
                                            <i class="bi bi-chevron-left"></i>
                                            {{ "Back" }}
                                        </button>
                                    </div>
                                    <!-- Add Logbook -->
                                    <form
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
                                    <div class="mt-2">
                                        <div class="d-flex">
                                            <button
                                                class="btn btn-sm border-0 ms-auto text-primary text-decoration-none p-0"
                                                style="font-size: 0.7rem"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#programListCollapse"
                                            >
                                                {{ "check my logbook" }}
                                            </button>
                                        </div>
                                        <div
                                            class="collapse"
                                            id="programListCollapse"
                                        >
                                            <a
                                                v-for="program in program_list"
                                                :href="
                                                    route('checkLogbook', [
                                                        program.program_id,
                                                        auth_user.id,
                                                    ])
                                                "
                                                :class="'text-decoration-none '"
                                            >
                                                <div
                                                    :class="
                                                        'd-flex ' +
                                                        (program_list.indexOf(
                                                            program
                                                        ) > 0
                                                            ? 'mt-2'
                                                            : '')
                                                    "
                                                    style="font-size: 0.8rem"
                                                >
                                                    <span
                                                        class="text-secondary"
                                                        >{{
                                                            program.program
                                                                ?.name ??
                                                            program.program_id
                                                        }}</span
                                                    >
                                                    <span
                                                        class="fw-light text-secondary mx-2"
                                                        >{{ "as" }}</span
                                                    >
                                                    <span
                                                        class="fw-light text-primary"
                                                        >{{
                                                            program.title
                                                        }}</span
                                                    >
                                                    <i
                                                        class="bi bi-box-arrow-up-right ms-1 text-primary"
                                                    ></i>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                        <div class="col-lg-6 col-12">
                            <transition
                                name="fade-slide-rtl"
                                @after-leave="setActiveTab()"
                            >
                                <!-- Contribution -->
                                <div
                                    class="card p-3"
                                    v-if="activeTab == 3 || isLargeScreen"
                                >
                                    <div
                                        class="d-flex border-bottom border-primary"
                                    >
                                        <span
                                            class="w-100 text-primary-emphasis h5"
                                        >
                                            <i
                                                class="bi bi-journal-text me-2 fs-6"
                                            ></i
                                            >{{ "Contribution" }}
                                        </span>
                                        <button
                                            class="btn btn-sm text-primary fw-light ms-auto p-0 d-lg-none d-flex"
                                            @click="setTargetTab(1)"
                                        >
                                            <i
                                                class="bi bi-chevron-left mb-0"
                                            ></i>
                                            {{ "Back" }}
                                        </button>
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
                                                    : 'bg-secondary bg-opacity-25 border-dark-subtle border-1')
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
                                    <div class="mt-2 d-flex">
                                        <a
                                            class="ms-auto text-primary text-decoration-none"
                                            style="font-size: 0.7rem"
                                            :href="
                                                route(
                                                    'checkContribution',
                                                    auth_user.id
                                                )
                                            "
                                        >
                                            {{ "check my contribution" }}
                                            <i
                                                class="bi bi-box-arrow-up-right ms-1"
                                            ></i>
                                        </a>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StaffLayout>

    <!-- Notif Toast -->
    <Notif ref="toastNotifRef" />
</template>
