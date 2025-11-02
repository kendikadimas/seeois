<script setup>
import StaffLayout from "@/Layouts/StaffLayout.vue";
import InputError from "@/Components/InputError.vue";
import Notif from "@/Components/Notif.vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { Head, useForm, usePage } from "@inertiajs/vue3";
import {
    ref,
    computed,
    watch,
    onMounted,
    defineProps,
    defineExpose,
} from "vue";
import { formatIDR } from "@/utils";

const props = defineProps({
    staff_list: Array,
    staff_list_2: Array,
    department: Object,
    notif: Object,
    errors: Object,
});

const auth_user = usePage().props.auth.user;
const title = ref("Department");
const modalConfirmationRef = ref(null);
const toastNotifRef = ref(null);
const placeholder = ref("placeholder");
const modalAddStaffRef = ref(null);
const modalNewProgram = ref(null);

const form_add_staff = useForm({
    staff_id: null,
});

const form_new_program = useForm({
    name: null,
    pic_id: null,
});

function navigateToStaff(id) {
    document.getElementById(id).click();
}

function handleAddStaff() {
    form_add_staff.post(route("department.staff.add", props.department.id), {
        onSuccess: () => {
            showAddStaffModal(false);
            form_add_staff.reset();
        },
        onError: (e) => {
            for (let key in e) {
                toastNotifRef.value.showToast("warning", e[key]);
            }
        },
    });
}

function handleNewProgram() {
    form_new_program.post(route("program.add", props.department.id), {
        onSuccess: () => {
            showNewProgramModal(false);
            form_new_program.reset();
        },
    });
}

function showAddStaffModal(is_show) {
    if (modalAddStaffRef.value == null) {
        const modal = document.getElementById("addStaffModal");
        modalAddStaffRef.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalAddStaffRef.value.show();
    } else {
        modalAddStaffRef.value.hide();
    }
}

function showNewProgramModal(is_show) {
    if (modalNewProgram.value == null) {
        const modal = document.getElementById("newProgramModal");
        modalNewProgram.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalNewProgram.value.show();
    } else {
        modalNewProgram.value.hide();
    }
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
onMounted(() => {});
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
        <Head :title="title" :icon="'/storage/local/images/apps/logo.png'" />
        <!-- Modal Box -->
        <ModalConfirmation ref="modalConfirmationRef" />
        <template #header>
            <a
                :href="route('structural')"
                class="bg-opacity-0 text-decoration-none text-primary-emphasis"
            >
                <span class="fw-light">{{ "Structural" }}</span>
            </a>
            <span class="ms-2">{{ "/" }}</span>
            {{ title }}
        </template>

        <div class="container me-lg-0 mx-auto mb-5">
            <div class="row mt-4">
                <div class="col-12">
                    <div class="card p-3">
                        <div class="d-flex border-bottom border-primary pb-1">
                            <span class="h5 text-primary-emphasis">
                                <i class="bi bi-building me-2"></i>
                                {{ "Department " + department.name }}
                            </span>
                        </div>
                        <div class="d-flex mt-2 d-lg-none">
                            <span class="text-secondary">{{ "Detail" }}</span>
                        </div>
                        <div class="row g-2 mt-0 mt-lg-2">
                            <div class="col-lg-1 d-none d-lg-block">
                                <div class="d-flex w-100 h-100">
                                    <span class="text-secondary my-auto">{{
                                        "Detail"
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
                                <div class="d-flex">
                                    <i
                                        class="bi bi-person text-primary fs-5 my-auto me-2"
                                    ></i>
                                    <div>
                                        <span
                                            class="text-secondary d-block"
                                            style="font-size: 0.8rem"
                                            >{{ "Manager" }}</span
                                        >
                                        <div class="scroll-x-hidden">
                                            <span
                                                class="text-dark text-nowrap"
                                                >{{
                                                    department.manager.name
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
                                <div class="d-flex">
                                    <i
                                        class="bi bi-people text-primary fs-5 my-auto me-2"
                                    ></i>
                                    <div>
                                        <span
                                            class="text-secondary d-block"
                                            style="font-size: 0.8rem"
                                            >{{ "Staff" }}</span
                                        >
                                        <div class="scroll-x-hidden">
                                            <span
                                                class="text-dark text-nowrap"
                                                >{{
                                                    department.staff.length +
                                                    (department.staff.length > 1
                                                        ? " persons"
                                                        : " person")
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
                                <div class="d-flex">
                                    <i
                                        class="bi bi-grid text-primary fs-5 my-auto me-2"
                                    ></i>
                                    <div>
                                        <span
                                            class="text-secondary d-block"
                                            style="font-size: 0.8rem"
                                            >{{ "Program" }}</span
                                        >
                                        <div class="scroll-x-hidden">
                                            <span
                                                class="text-dark text-nowrap"
                                                >{{
                                                    department.program.length +
                                                    (department.program.length >
                                                    1
                                                        ? " programs"
                                                        : " program")
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-2 d-lg-none">
                            <span class="text-secondary">{{ "Cashflow" }}</span>
                        </div>
                        <div class="row g-2 mt-lg-2 mt-0">
                            <div class="col-lg-1 d-none d-lg-block">
                                <div class="d-flex w-100 h-100">
                                    <span class="text-secondary my-auto">{{
                                        "Cashflow"
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
                                <div class="d-flex">
                                    <i
                                        class="bi bi-list-columns-reverse text-primary fs-5 my-auto me-2"
                                    ></i>
                                    <div>
                                        <span
                                            class="text-secondary d-block"
                                            style="font-size: 0.8rem"
                                            >{{ "Budget" }}</span
                                        >
                                        <div class="scroll-x-hidden">
                                            <span
                                                class="text-dark text-nowrap"
                                                >{{
                                                    formatIDR(department.budget)
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
                                <div class="d-flex">
                                    <i
                                        class="bi bi-box-arrow-in-down text-primary fs-5 my-auto me-2"
                                    ></i>
                                    <div>
                                        <span
                                            class="text-secondary d-block"
                                            style="font-size: 0.8rem"
                                            >{{ "Disbursement" }}</span
                                        >
                                        <div class="scroll-x-hidden">
                                            <span
                                                class="text-dark text-nowrap"
                                                >{{
                                                    formatIDR(
                                                        department.disbursement
                                                    )
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
                                <div class="d-flex">
                                    <i
                                        class="bi bi-box-arrow-up text-primary fs-5 my-auto me-2"
                                    ></i>
                                    <div>
                                        <span
                                            class="text-secondary d-block"
                                            style="font-size: 0.8rem"
                                            >{{ "Expense" }}</span
                                        >
                                        <div class="scroll-x-hidden">
                                            <span
                                                class="text-dark text-nowrap"
                                                >{{
                                                    formatIDR(
                                                        department.expense
                                                    )
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-4 mt-0">
                <!-- Staff -->
                <div class="col-12 col-lg-6">
                    <div class="card sm p-3">
                        <div class="row">
                            <div class="col-12">
                                <div
                                    class="d-flex border-primary border-bottom pb-2"
                                >
                                    <span
                                        class="text-primary-emphasis me-auto my-auto h6"
                                    >
                                        <i class="bi bi-people me-1"></i>
                                        {{ "Staff List" }}
                                    </span>
                                    <button
                                        v-if="
                                            auth_user.id ==
                                            department.manager_id
                                        "
                                        @click="showAddStaffModal(true)"
                                        class="btn btn-sm btn-outline-primary border-0 ms-auto py-0"
                                    >
                                        <i class="bi bi-plus-lg d-lg-none"></i>
                                        <span class="d-lg-block d-none">{{
                                            "New Staff"
                                        }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- Staff List -->
                        <div class="scroll-container-2 scroll-container-lg-2">
                            <li class="list-group list-group-flush">
                                <ul
                                    class="list-group-item list-group-item-action"
                                    v-if="department.staff.length == 0"
                                >
                                    <span class="fst-italic text-secondary">{{
                                        "No staff found."
                                    }}</span>
                                </ul>
                                <ul
                                    @click="
                                        navigateToStaff(
                                            'staff_' + (staff.id * 7 - 3)
                                        )
                                    "
                                    class="list-group-item list-group-item-action mb-0 py-2 px-0"
                                    v-if="department.staff.length > 0"
                                    v-for="(staff, index) in department.staff"
                                >
                                    <a
                                        :id="'staff_' + (staff.id * 7 - 3)"
                                        :href="route('profile.edit', staff.id)"
                                    ></a>
                                    <div class="d-flex">
                                        <span
                                            class="text-secondary border-end border-2 pe-2 me-2"
                                            >{{ index + 1 }}</span
                                        >
                                        <span class="text-dark d-flex"
                                            >{{ staff.name }}
                                            <i
                                                class="bi bi-box-arrow-up-right ms-2 my-auto"
                                                style="font-size: 0.8rem"
                                            ></i>
                                        </span>
                                        <button
                                            class="btn btn-sm btn-outline-secondary border-0 ms-auto py-0"
                                            @click.stop="
                                                confirmation(
                                                    route(
                                                        'department.staff.remove',
                                                        staff.id
                                                    ),
                                                    'Are you sure want to remove ' +
                                                        staff.name +
                                                        ' from Department ' +
                                                        department.name +
                                                        ' staff?'
                                                )
                                            "
                                        >
                                            <i class="bi bi-trash3"></i>
                                        </button>
                                    </div>
                                </ul>
                            </li>
                        </div>
                    </div>
                </div>
                <!-- Program -->
                <div class="col-12 col-lg-6">
                    <div class="card sm p-3">
                        <div class="row">
                            <div class="col-12">
                                <div
                                    class="d-flex border-primary border-bottom pb-2"
                                >
                                    <span
                                        class="text-primary-emphasis me-auto my-auto h6"
                                    >
                                        <i class="bi bi-grid me-1"></i>
                                        {{ "Program List" }}
                                    </span>
                                    <button
                                        v-if="
                                            auth_user.id ==
                                            department.manager_id
                                        "
                                        @click="showNewProgramModal(true)"
                                        class="btn btn-sm btn-outline-primary border-0 ms-auto py-0"
                                    >
                                        <i class="bi bi-plus-lg d-lg-none"></i>
                                        <span class="d-lg-block d-none">{{
                                            "New Program"
                                        }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- Program List -->
                        <div class="scroll-container-2 scroll-container-lg-2">
                            <li class="list-group list-group-flush">
                                <ul
                                    class="list-group-item list-group-item-action"
                                    v-if="department.program.length == 0"
                                >
                                    <span class="fst-italic text-secondary">{{
                                        "No program found."
                                    }}</span>
                                </ul>
                                <ul
                                    @click="
                                        navigateToStaff(
                                            'program_' + (program.id * 7 - 3)
                                        )
                                    "
                                    class="list-group-item list-group-item-action mb-0 py-2 px-0"
                                    v-if="department.program.length > 0"
                                    v-for="(
                                        program, index
                                    ) in department.program"
                                >
                                    <a
                                        :id="'program_' + (program.id * 7 - 3)"
                                        :href="route('program', program.id)"
                                    ></a>
                                    <div class="d-flex">
                                        <span
                                            class="text-secondary border-end border-2 pe-2 me-2"
                                            >{{ index + 1 }}</span
                                        >
                                        <span class="text-dark d-flex"
                                            >{{ program.name }}
                                            <i
                                                class="bi bi-box-arrow-up-right ms-2 my-auto"
                                                style="font-size: 0.8rem"
                                            ></i>
                                        </span>
                                        <button
                                            class="btn btn-sm btn-outline-secondary border-0 ms-auto py-0"
                                            @click.stop="
                                                confirmation(
                                                    route(
                                                        'program.delete',
                                                        program.id
                                                    ),
                                                    'Are you sure want to remove ' +
                                                        program.name +
                                                        ' from Department ' +
                                                        department.name +
                                                        ' program?'
                                                )
                                            "
                                        >
                                            <i class="bi bi-trash3"></i>
                                        </button>
                                    </div>
                                </ul>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StaffLayout>

    <!-- Add Staff Modal -->
    <div
        v-if="auth_user.id == department.manager_id"
        class="modal fade"
        id="addStaffModal"
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
                        ><i
                            class="bi bi-person-plus border-secondary border-end me-2 pe-2"
                        ></i>
                        {{ "New Staff" }}
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
                <form @submit.prevent="handleAddStaff()">
                    <div class="modal-body bg-light">
                        <div class="row mt-2 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="add_staff"
                                    class="form-label d-inline-block"
                                    >{{ "Staff" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <v-select
                                    v-if="staff_list.length > 0"
                                    class="bg-white text-nowrap"
                                    :options="staff_list"
                                    label="name"
                                    :reduce="(staff) => staff.id"
                                    v-model="form_add_staff.staff_id"
                                    placeholder="Select staff"
                                />
                                <span
                                    v-if="staff_list.length == 0"
                                    class="fst-italic fw-light"
                                    >{{
                                        "All staf already belongs to department."
                                    }}</span
                                >
                                <InputError
                                    :messages="form_add_staff.errors.staff_id"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-1">
                        <button type="submit" class="btn btn-sm btn-primary">
                            {{ "Add" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- New Program Modal -->
    <div
        v-if="auth_user.id == department.manager_id"
        class="modal fade"
        id="newProgramModal"
        tabindex="-1"
        aria-labelledby="newProgramModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i class="bi bi-app-indicator pe-2"></i>
                        {{ "New Program" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showNewProgramModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <form @submit.prevent="handleNewProgram()">
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
                                        >{{ "Program" }}</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        id="department_name"
                                        v-model="form_new_program.name"
                                        placeholder="Finance"
                                    />
                                </div>
                                <InputError
                                    :message="form_new_program.errors.name"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="stand_pic"
                                    class="form-label d-inline-block"
                                    >{{ "PIC" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <v-select
                                    class="bg-white text-nowrap"
                                    :options="staff_list_2"
                                    label="name"
                                    :reduce="(staff) => staff.id"
                                    v-model="form_new_program.pic_id"
                                    placeholder="Select staff"
                                />
                                <InputError
                                    :message="form_new_program.errors.pic_id"
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

    <!-- Notif Toast -->
    <Notif ref="toastNotifRef" />
</template>
