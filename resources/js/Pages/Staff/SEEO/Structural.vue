<script setup>
import StaffLayout from "@/Layouts/StaffLayout.vue";
import InputError from "@/Components/InputError.vue";
import Notif from "@/Components/Notif.vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import VueSelect from "@/Components/VueSelect.vue";
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
import { formatDate, formatDateOnly, showPassword } from "@/utils";

const props = defineProps({
    staff_list: Array,
    department_list: Array,
    filter: Object,
    notif: Object,
    errors: Object,
});

const auth_user = usePage().props.auth.user;
const title = ref("Structural");
const modalConfirmationRef = ref(null);
const toastNotifRef = ref(null);
const placeholder = ref("placeholder");
const modalNewDepartment = ref(null);
const modalUpdateDepartmentRef = ref(null);
const modalDeleteDepartmentRef = ref(null);
const active_department = ref(null);

const form_filter = useForm({
    category: props.filter.category,
    order: props.filter.order,
    keyword: props.filter.keyword,
});

const form_new_department = useForm({
    name: null,
    manager_id: null,
});

const form_update_department = useForm({
    name: null,
    manager_id: null,
});

const form_delete_department = useForm({
    password: null,
});

function handleSubmitFilter(category) {
    if (category) {
        form_filter.order =
            form_filter.category == category
                ? form_filter.order == "asc"
                    ? "desc"
                    : "asc"
                : "desc";
        form_filter.category = category;
        form_filter.keyword = null;
    }
    form_filter.post(route("structural.filter"));
}

function handleNewDepartment() {
    form_new_department.post(route("department.add"), {
        onSuccess: () => {
            showNewDepartmentModal(false);
            form_new_department.reset();
        },
    });
}

function handleUpdateDepartment() {
    console.log(form_update_department);

    form_update_department.post(
        route("department.update", active_department.value.id),
        {
            onSuccess: () => {
                showUpdateDepartmentModal(false);
                form_update_department.reset();
            },
            onError: (e) => {
                for (let key in e) {
                    toastNotifRef.value.showToast("warning", e[key]);
                }
            },
        }
    );
}

function handleDeleteDepartment() {
    form_delete_department.post(
        route("department.delete", active_department.value?.id),
        {
            onSuccess: () => {
                showDeleteDepartmentModal(false);
                form_delete_department.reset();
            },
            onError: (e) => {
                for (let key in e) {
                    toastNotifRef.value.showToast("warning", e[key]);
                }
            },
        }
    );
}

function showNewDepartmentModal(is_show) {
    if (modalNewDepartment.value == null) {
        const modal = document.getElementById("newDepartmentModal");
        modalNewDepartment.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalNewDepartment.value.show();
    } else {
        modalNewDepartment.value.hide();
    }
}

function showUpdateDepartmentModal(is_show) {
    if (modalUpdateDepartmentRef.value == null) {
        const modal = document.getElementById("updateDepartmentModal");
        modalUpdateDepartmentRef.value =
            bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalUpdateDepartmentRef.value.show();
    } else {
        modalUpdateDepartmentRef.value.hide();
    }
}

function showDeleteDepartmentModal(is_show) {
    if (modalDeleteDepartmentRef.value == null) {
        const modal = document.getElementById("deleteDepartmentModal");
        modalDeleteDepartmentRef.value =
            bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalDeleteDepartmentRef.value.show();
    } else {
        modalDeleteDepartmentRef.value.hide();
    }
}

function navigateToDepartment(id) {
    document.getElementById("department_" + id).click();
}

function confirmation(route, message) {
    if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route, message);
    } else {
        console.error("modalConfirmationRef is null");
    }
}

function showImage(event) {
    utils.showImage(event);
}

const isLargeScreen = ref(window.innerWidth >= 768);
const handleResize = () => {
    isLargeScreen.value = window.innerWidth >= 768;
    window.addEventListener("resize", handleResize);
};

onMounted(() => {
    window.addEventListener("resize", handleResize);
    if (props.notif) {
        toastNotifRef.value.showToast(props.notif.type, props.notif.message);
    }
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

<style>
.vs__dropdown-menu {
    max-height: 150px;
    overflow-y: auto;
    text-wrap: nowrap;
}

.department-card {
    transition: all 0.3s ease;
    border: 1px solid #e2e8f0;
}

.department-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-color: #0d6efd;
}

.department-card:active {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    background-color: #f0f7ff;
}

.department-card .card-title {
    transition: color 0.2s ease;
}

.department-card:hover .card-title {
    color: #0d6efd;
}
</style>

<template>
    <!-- Page Layout -->
    <StaffLayout>
        <Head :title="title" :icon="'/storage/local/images/apps/logo.png'" />
        <!-- Modal Box -->
        <ModalConfirmation ref="modalConfirmationRef" />
        <template #header>
            {{ title }}
        </template>

        <div class="container me-lg-0 mx-auto mb-5">
            <!-- Filter -->
            <div class="row mt-4">
                <div class="col-12">
                    <div class="card shadow-sm p-lg-3 p-2">
                        <div class="d-flex">
                            <span
                                class="text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto"
                                >{{ "Filter" }}</span
                            >
                            <button
                                @click="handleSubmitFilter('name')"
                                class="btn text-nowrap btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"
                            >
                                {{ "Name" }}
                                <i
                                    :class="
                                        'bi bi-arrow-' +
                                        (filter.category == 'name'
                                            ? filter.order == 'asc'
                                                ? 'up'
                                                : 'down'
                                            : 'up')
                                    "
                                ></i>
                            </button>
                            <div class="input-group ms-2">
                                <input
                                    type="text"
                                    class="form-control form-control-sm py-0"
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="basic-addon1"
                                    v-model="form_filter.keyword"
                                    @input="handleSubmitFilter()"
                                />
                                <span
                                    class="input-group-text py-0"
                                    id="basic-addon1"
                                    ><i
                                        class="bi bi-search"
                                        :style="'font-size: 0.9rem'"
                                    ></i
                                ></span>
                            </div>
                            <!-- New Department -->
                            <button
                                v-if="auth_user.roles_id == 1"
                                class="ms-2 btn btn-sm btn-outline-primary border-0 py-0 text-nowrap"
                                @click="showNewDepartmentModal(true)"
                            >
                                <i class="bi bi-plus-lg d-lg-none"></i>
                                <span class="d-none d-lg-block">{{
                                    "New Department"
                                }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Department List -->
            <div class="row gx-4 mt-4 mt-lg-5">
                <div v-for="item in department_list" :key="item.id" class="col-lg-4 col-12">
                    <div 
                        class="card department-card p-3 mb-3 mb-lg-4" 
                        style="cursor: pointer;"
                        @click="$inertia.visit(`/seeo/department/${item.id}`)"
                    >
                        <div class="d-flex">
                            <div class="" style="font-size: 0.8rem">
                                <span class="text-secondary d-block mb-1">
                                    <i class="bi bi-person-badge me-1"></i>
                                    {{ item.manager.name }}
                                </span>
                                <span class="h5 text-primary-emphasis d-block card-title">
                                    <i class="bi bi-building me-2"></i>
                                    {{ "Department " + item.name }}
                                </span>
                            </div>
                            <div class="ms-auto mb-auto d-flex" style="z-index: 10; position: relative;">
                                <button
                                    class="border-0 btn btn-sm btn-outline-secondary"
                                    v-if="auth_user.roles_id == 1"
                                    @click.stop="
                                        () => {
                                            active_department = item;
                                            form_update_department.name = item.name;
                                            form_update_department.manager_id = item.manager_id;
                                            showUpdateDepartmentModal(true);
                                        }
                                    "
                                    title="Edit Department"
                                >
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <div
                                    class="border-start border-secondary border-2 mx-1 my-1"
                                    v-if="auth_user.roles_id == 1"
                                ></div>
                                <button
                                    class="border-0 btn btn-sm btn-outline-secondary"
                                    v-if="auth_user.roles_id == 1"
                                    @click.stop="
                                        () => {
                                            active_department = item;
                                            showDeleteDepartmentModal(true);
                                        }
                                    "
                                    title="Delete Department"
                                >
                                    <i class="bi bi-trash3"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StaffLayout>

    <!-- New Department Modal -->
    <div
        v-if="auth_user.roles_id == 1"
        class="modal fade"
        id="newDepartmentModal"
        tabindex="-1"
        aria-labelledby="newDepartmentModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i class="bi bi-building-add pe-2"></i>
                        {{ "New Department" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showNewDepartmentModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <form @submit.prevent="handleNewDepartment()">
                    <div class="modal-body bg-light">
                        <div class="row justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="department_name"
                                    class="form-label d-inline-block"
                                    >{{ "Name" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <div
                                    class="input-group input-group-sm bg-secondary bg-opacity-10 border-dark"
                                >
                                    <label
                                        class="form-label text-secondary my-auto px-2"
                                        for="department_name"
                                        >{{ "Department" }}</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        id="department_name"
                                        v-model="form_new_department.name"
                                        placeholder="Finance"
                                    />
                                </div>
                                <InputError
                                    :message="form_new_department.errors.name"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="stand_pic"
                                    class="form-label d-inline-block"
                                    >{{ "Manager" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <VueSelect
                                    class="bg-white text-nowrap"
                                    :options="staff_list"
                                    label="name"
                                    :reduce="(staff) => staff.id"
                                    v-model="form_new_department.manager_id"
                                    placeholder="Select staff"
                                />
                                <InputError
                                    :message="
                                        form_new_department.errors.manager_id
                                    "
                                    class="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-1">
                        <button type="submit" class="btn btn-sm btn-primary">
                            {{ "Create" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Edit Department Modal -->
    <div
        v-if="auth_user.roles_id == 1"
        class="modal fade"
        id="updateDepartmentModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span
                        class="modal-title fs-5 text-primary-emphasis"
                        id="exampleModalLabel"
                    >
                        <i class="bi bi-building-gear me-2"></i>
                        {{ "Update " + active_department?.name }}
                        <span class="d-none d-lg-inline">{{
                            "Department"
                        }}</span>
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <form @submit.prevent="handleUpdateDepartment()">
                    <div class="modal-body bg-light">
                        <div class="row justify-content-center mt-0">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="edit_department_name"
                                    class="form-label text-sm"
                                    >Name</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    id="edit_department_name"
                                    class="form-control form-control-sm"
                                    type="text"
                                    required
                                    v-model="form_update_department.name"
                                />
                                <InputError
                                    :messages="
                                        form_update_department.errors.name
                                    "
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="edit_department_manager"
                                    class="form-label d-inline-block"
                                    >Manager</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <VueSelect
                                    class="bg-white text-nowrap"
                                    :options="staff_list"
                                    label="name"
                                    :reduce="(staff) => staff.id"
                                    v-model="form_update_department.manager_id"
                                    placeholder="Select staff"
                                />
                                <InputError
                                    :messages="
                                        form_update_department.errors.manager_id
                                    "
                                    class="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-1">
                        <button
                            type="submit"
                            class="btn btn-sm btn-primary shadow"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Delete Department Modal -->
    <div
        v-if="auth_user.roles_id == 1"
        class="modal fade"
        id="deleteDepartmentModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span
                        class="modal-title text-primary-emphasis fs-5"
                        id="exampleModalLabel"
                    >
                        <i class="bi bi-building-exclamation me-2"></i>
                        {{ "Delete " + active_department?.name }}
                        <span class="d-none d-lg-inline">Department</span>
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <form @submit.prevent="handleDeleteDepartment()">
                    <div class="modal-body bg-light">
                        <div class="row justify-content-center">
                            <div class="col-12 col-lg-10">
                                <p class="m-0" style="text-align: justify">
                                    {{
                                        "All program and progress in " +
                                        active_department?.name +
                                        " Department will be lost. Please make sure you have back up all the data needed."
                                    }}
                                </p>
                            </div>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <div class="col-lg-10 col-11 border-bottom">
                                <span class="d-block text-center">
                                    <label for="password"
                                        >Password Needed to Authorize</label
                                    >
                                </span>
                            </div>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <div class="col-3 col-lg-3">
                                <label
                                    for="pic"
                                    class="form-label d-inline-block"
                                    >Password</label
                                >
                            </div>
                            <div class="col-9 col-lg-7">
                                <div class="input-group">
                                    <input
                                        id="password"
                                        class="form-control"
                                        type="password"
                                        v-model="
                                            form_delete_department.password
                                        "
                                        required
                                        autocomplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        class="btn bg-light"
                                        @click="
                                            showPassword(
                                                'password',
                                                'password_icon_del'
                                            )
                                        "
                                    >
                                        <i
                                            class="bi bi-eye-slash-fill"
                                            id="password_icon_del"
                                        ></i>
                                    </button>
                                </div>
                                <InputError
                                    :messages="
                                        form_delete_department.errors.password
                                    "
                                    class="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-1">
                        <button
                            type="submit"
                            class="btn btn-sm btn-danger shadow"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Notif Toast -->
    <Notif ref="toastNotifRef" />
</template>
