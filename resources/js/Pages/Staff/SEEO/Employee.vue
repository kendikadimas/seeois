<script setup>
import StaffLayout from "@/Layouts/StaffLayout.vue";
import InputError from "@/Components/InputError.vue";
import Notif from "@/Components/Notif.vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import { Head, useForm, usePage } from "@inertiajs/vue3";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { ref, computed, watch, onMounted, onUnmounted, defineProps } from "vue";

const props = defineProps({
    unemployees: Array,
    employees: Array,
    filter: Object,
    roles: Array,
    level_list: Array,
    departments: Array,
    notif: Object,
    errors: Object,
});

const auth_user = usePage().props.auth.user;
const title = ref("User Manager");
const modalConfirmationRef = ref(null);
const toastNotifRef = ref(null);
const active_tab = ref(1);

const selected_employee = ref({
    id: null,
    name: "Username",
    email: "user@mail.com",
    phone: "08xxxxxxxx",
    department: {
        name: " - ",
    },
    level: " - ",
    roles_id: 0,
});

const default_selected_employee = {
    id: null,
    name: "User name",
    email: "user@mail.com",
    phone: "08xxxxxxxx",
    department: {
        name: " - ",
    },
    level: " - ",
    roles_id: 0,
};

const form_update_employee = useForm({
    user_id: null,
    roles_id: null,
});

const form_employee_filter = useForm({
    keyword: props.filter.staff.keyword,
    category: props.filter.staff.category,
    order: props.filter.staff.order,
});

const selected_customer = ref({
    id: null,
    name: "Username",
    email: "user@mail.com",
    phone: "08xxxxxxxx",
    roles_id: null,
});

const default_selected_customer = {
    id: null,
    name: "Username",
    email: "user@mail.com",
    phone: "08xxxxxxxx",
    roles_id: null,
};

const form_customer_filter = useForm({
    keyword: props.filter.customer.keyword,
    category: props.filter.customer.category,
    order: props.filter.customer.order,
});

function setActiveTab(number) {
    active_tab.value = number;
}

function setSelectedEmployee(employee) {
    selected_employee.value = employee;
}

function handleUpdateEmployee() {
    event.preventDefault();
    form_update_employee.user_id = selected_employee.value.id;
    console.log(form_update_employee);

    form_update_employee.post(route("role.update"), {
        onSuccess: () => {
            form_update_employee.reset();
        },
        onError: (error) => console.error("update employee failed:", error),
    });
}

function handleEmployeeFilter(category = null) {
    if (category) {
        form_employee_filter.order =
            form_employee_filter.category == category
                ? form_employee_filter.order == "asc"
                    ? "desc"
                    : "asc"
                : "desc";
        form_employee_filter.category = category;
        form_employee_filter.keyword = null;
    }
    form_employee_filter.post(route("role.filter"));
}

function handleCustomerFilter(category = null) {
    if (category) {
        form_customer_filter.order =
            form_customer_filter.category == category
                ? form_customer_filter.order == "asc"
                    ? "desc"
                    : "asc"
                : "desc";
        form_customer_filter.category = category;
        form_customer_filter.keyword = null;
    }
    form_customer_filter.post(route("unemployee.filter"));
}

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
        if (notification.type !== "warning" && notification.type !== "danger") {
            selected_employee.value = default_selected_employee;
            selected_customer.value = default_selected_customer;
        }
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
            {{ title }}
        </template>
        <div class="container me-lg-0 mx-auto mb-5">
            <div class="row gx-4 mt-4 px-lg-0 px-2">
                <div class="col-lg-5">
                    <!-- Tab Header -->
                    <div class="row mb-4">
                        <div class="col-12">
                            <div class="card shadow-sm border-light border-4">
                                <div class="d-flex">
                                    <button
                                        :class="
                                            'btn btn-sm btn-outline-primary border-0 w-50 text-center me-1 ' +
                                            (active_tab == 1 ? 'active ' : '')
                                        "
                                        @click="setActiveTab(0)"
                                    >
                                        {{ "Staff" }}
                                    </button>

                                    <button
                                        :class="
                                            'btn btn-sm btn-outline-primary border-0 w-50 text-center ' +
                                            (active_tab == 2 ? 'active ' : '')
                                        "
                                        @click="setActiveTab(0)"
                                    >
                                        {{ "Customer" }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Staff Detail -->
                    <transition
                        :name="isLargeScreen ? 'fade' : 'fade-slide-ltr'"
                        @after-leave="setActiveTab(2)"
                    >
                        <div class="row mb-4" v-if="active_tab == 1">
                            <div class="col-12">
                                <div class="card border-0 shadow-sm p-3">
                                    <div class="row">
                                        <div class="col-12">
                                            <div
                                                class="card border-0 border-bottom border-primary rounded-0 rounded-top d-flex"
                                            >
                                                <div class="d-flex mb-1">
                                                    <div
                                                        class="scroll-x-hidden mx-auto"
                                                    >
                                                        <span
                                                            class="h5 text-primary-emphasis text-nowrap"
                                                        >
                                                            <i
                                                                class="bi bi-person-vcard me-2"
                                                            ></i>
                                                            <span>
                                                                {{
                                                                    "Staff Contact"
                                                                }}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row g-2 mt-2">
                                        <div class="col-12 col-lg-6">
                                            <span
                                                class="text-secondary d-block"
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "Name" }}
                                            </span>
                                            <a
                                                :href="
                                                    selected_employee.id > 0
                                                        ? route(
                                                              'profile.edit',
                                                              selected_employee.id
                                                          )
                                                        : ''
                                                "
                                                class="text-dark scroll-x-hidden d-block text-decoration-none"
                                            >
                                                <span class="text-nowrap">
                                                    {{ selected_employee.name }}
                                                </span>
                                                <i
                                                    v-if="
                                                        selected_employee.id > 0
                                                    "
                                                    style="font-size: 0.8rem"
                                                    class="bi bi-box-arrow-up-right ms-2 my-auto"
                                                ></i>
                                            </a>
                                        </div>
                                        <div class="col-12 col-lg-6">
                                            <span
                                                class="text-secondary d-block"
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "Email" }}
                                            </span>
                                            <span
                                                class="text-dark scroll-x-hidden d-block"
                                            >
                                                <span class="text-nowrap">
                                                    {{
                                                        selected_employee.email
                                                    }}
                                                </span>
                                            </span>
                                        </div>
                                        <div class="col-12 col-lg-6">
                                            <span
                                                class="text-secondary d-block"
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "Phone" }}
                                            </span>
                                            <span class="text-dark">
                                                {{ selected_employee.phone }}
                                            </span>
                                        </div>
                                        <div class="col-12 col-lg-6">
                                            <span
                                                class="text-secondary d-block"
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "Role" }}
                                            </span>
                                            <span
                                                class="d-block"
                                                v-if="
                                                    !(selected_employee?.id > 0)
                                                "
                                            >
                                                {{ " - " }}
                                            </span>
                                            <span
                                                class="d-block"
                                                v-if="
                                                    auth_user.roles_id !== 1 &&
                                                    selected_employee?.id > 0
                                                "
                                            >
                                                {{
                                                    selected_employee.roles.name
                                                }}
                                            </span>
                                            <div
                                                class="d-flex"
                                                v-if="
                                                    auth_user.roles_id == 1 &&
                                                    selected_employee?.id > 0
                                                "
                                            >
                                                <v-select
                                                    class="bg-white text-nowrap w-100"
                                                    :options="roles"
                                                    label="name"
                                                    :reduce="(role) => role.id"
                                                    v-model="
                                                        form_update_employee.roles_id
                                                    "
                                                    placeholder="Select role"
                                                />
                                                <button
                                                    @click="
                                                        handleUpdateEmployee
                                                    "
                                                    class="btn btn-outline-primary border-0 py-0"
                                                >
                                                    <i
                                                        class="bi bi-check-lg"
                                                    ></i>
                                                </button>
                                            </div>
                                            <InputError
                                                v-if="
                                                    auth_user.roles_id == 1 &&
                                                    selected_employee?.id > 0
                                                "
                                                :message="
                                                    form_update_employee.errors
                                                        .roles_id
                                                "
                                                class="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        class="d-flex mt-2"
                                        v-if="
                                            auth_user.roles_id == 1 &&
                                            selected_employee.id > 0
                                        "
                                    >
                                        <button
                                            @click="
                                                confirmation(
                                                    route(
                                                        'role.remove',
                                                        selected_employee.id
                                                    ),
                                                    'Are you sure want to remove ' +
                                                        selected_employee.name +
                                                        ' from SEEO Staff?'
                                                )
                                            "
                                            class="btn btn-sm btn-secondary w-100 text-decoration-none"
                                        >
                                            {{ "Remove" }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <!-- Customer Detail -->
                    <transition
                        :name="isLargeScreen ? 'fade' : 'fade-slide-rtl'"
                        @after-leave="setActiveTab(1)"
                    >
                        <div class="row mb-4" v-if="active_tab == 2">
                            <div class="col-12">
                                <div class="card border-0 shadow-sm p-3">
                                    <div class="row">
                                        <div class="col-12">
                                            <div
                                                class="card border-0 border-bottom border-primary rounded-0 rounded-top d-flex"
                                            >
                                                <span
                                                    class="h5 text-primary-emphasis fw-bold mx-auto"
                                                >
                                                    <i
                                                        class="bi bi-person-vcard me-2"
                                                    ></i>
                                                    <span>
                                                        {{ "Customer Contact" }}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row g-2 mt-2">
                                        <div class="col-12 col-lg-6">
                                            <span
                                                class="text-secondary d-block"
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "Name" }}
                                            </span>
                                            <span
                                                class="text-dark scroll-x-hidden d-block text-decoration-none"
                                            >
                                                <span class="text-nowrap">
                                                    {{ selected_customer.name }}
                                                </span>
                                            </span>
                                        </div>
                                        <div class="col-12 col-lg-6">
                                            <span
                                                class="text-secondary d-block"
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "Email" }}
                                            </span>
                                            <span
                                                class="text-dark scroll-x-hidden d-block"
                                            >
                                                <span class="text-nowrap">
                                                    {{
                                                        selected_customer.email
                                                    }}
                                                </span>
                                            </span>
                                        </div>
                                        <div class="col-12 col-lg-6">
                                            <span
                                                class="text-secondary d-block"
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "Phone" }}
                                            </span>
                                            <span class="text-dark">
                                                {{ selected_customer.phone }}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        v-if="
                                            auth_user.roles_id == 1 &&
                                            selected_customer?.id > 0
                                        "
                                        @click="
                                            confirmation(
                                                route(
                                                    'employee.add',
                                                    selected_customer.id
                                                ),
                                                'Are you sure want to recruit ' +
                                                    selected_customer.name +
                                                    ' to SEEO Staff?'
                                            )
                                        "
                                        class="btn btn-sm btn-primary w-100 text-decoration-none mt-2"
                                    >
                                        {{ "Recruit" }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <div class="col-lg-7">
                    <!-- Staff List -->
                    <transition
                        :name="isLargeScreen ? 'fade' : 'fade-slide-ltr'"
                        @after-leave="setActiveTab(2)"
                    >
                        <div class="row mb-3" v-if="active_tab == 1">
                            <div class="col-12">
                                <div class="card shadow-sm p-3">
                                    <!-- Staff Filter -->
                                    <div class="row">
                                        <div class="col-12">
                                            <div
                                                class="d-flex border-primary border-bottom pb-2"
                                            >
                                                <span
                                                    class="text-primary-emphasis me-auto my-auto h6"
                                                >
                                                    <i
                                                        class="bi bi-people me-1"
                                                    ></i>
                                                    {{ "Staff List" }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <span
                                            class="text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto"
                                            >{{ "Filter" }}</span
                                        >
                                        <button
                                            @click="
                                                handleEmployeeFilter('name')
                                            "
                                            class="btn text-nowrap btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"
                                        >
                                            {{ "Name" }}
                                            <i
                                                :class="
                                                    'bi bi-arrow-' +
                                                    (filter.staff.category ==
                                                    'name'
                                                        ? filter.staff.order ==
                                                          'asc'
                                                            ? 'up'
                                                            : 'down'
                                                        : 'up')
                                                "
                                            ></i>
                                        </button>
                                        <button
                                            @click="
                                                handleEmployeeFilter('roles_id')
                                            "
                                            class="btn text-nowrap btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0 ms-2"
                                        >
                                            {{ "Role" }}
                                            <i
                                                :class="
                                                    'bi bi-arrow-' +
                                                    (filter.staff.category ==
                                                    'roles_id'
                                                        ? filter.staff.order ==
                                                          'asc'
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
                                                v-model="
                                                    form_employee_filter.keyword
                                                "
                                                @input="handleEmployeeFilter()"
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
                                    </div>
                                    <!-- Staff List Item -->
                                    <div
                                        class="scroll-container-3 scroll-container-lg-3 mt-2"
                                    >
                                        <li class="list-group list-group-flush">
                                            <ul
                                                class="list-group-item"
                                                v-if="employees.length == 0"
                                            >
                                                <div class="col">
                                                    <span
                                                        class="ms-3 text-secondary"
                                                        >{{
                                                            "No employee found."
                                                        }}</span
                                                    >
                                                </div>
                                            </ul>
                                            <ul
                                                :class="
                                                    'list-group-item list-group-item-action mb-0 py-2 px-0 ' +
                                                    (employee.id ==
                                                    selected_employee.id
                                                        ? 'bg-light'
                                                        : '')
                                                "
                                                v-if="employees.length > 0"
                                                v-for="employee in employees"
                                                :key="employees.id"
                                            >
                                                <span
                                                    class="d-flex"
                                                    @click="
                                                        setSelectedEmployee(
                                                            employee
                                                        )
                                                    "
                                                >
                                                    <span
                                                        class="me-2 border-end border-secondary-subtle border-2 text-secondary fw-normal pe-2"
                                                        >{{
                                                            employees.indexOf(
                                                                employee
                                                            ) + 1
                                                        }}</span
                                                    >
                                                    <span
                                                        :class="
                                                            'scroll-x-hidden me-2 ' +
                                                            (employee.id ==
                                                            selected_employee.id
                                                                ? 'text-primary'
                                                                : 'text-dark')
                                                        "
                                                    >
                                                        <span
                                                            class="text-nowrap"
                                                            >{{
                                                                employee.name
                                                            }}</span
                                                        >
                                                    </span>
                                                    <span
                                                        class="ms-auto text-secondary scroll-x-hidden"
                                                    >
                                                        <span
                                                            class="text-nowrap"
                                                            >{{
                                                                employee.roles_id
                                                                    ? employee
                                                                          .roles
                                                                          .name
                                                                    : ""
                                                            }}</span
                                                        >
                                                    </span>
                                                </span>
                                            </ul>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <!-- Customer List -->
                    <transition
                        :name="isLargeScreen ? 'fade' : 'fade-slide-rtl'"
                        @after-leave="setActiveTab(1)"
                    >
                        <div class="row mb-3" v-if="active_tab == 2">
                            <div class="col-12">
                                <div class="card shadow-sm p-3">
                                    <!-- Customer Filter -->
                                    <div class="row">
                                        <div class="col-12">
                                            <div
                                                class="d-flex border-primary border-bottom pb-2"
                                            >
                                                <span
                                                    class="text-primary-emphasis me-auto my-auto h6"
                                                >
                                                    <i
                                                        class="bi bi-people me-1"
                                                    ></i>
                                                    <span
                                                        class="d-none d-lg-inline"
                                                        >{{ "Employee " }}</span
                                                    >
                                                    {{ "List" }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex mt-2">
                                        <span
                                            class="text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto"
                                            >{{ "Filter" }}</span
                                        >
                                        <button
                                            @click="
                                                handleCustomerFilter('name')
                                            "
                                            class="btn text-nowrap btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"
                                        >
                                            {{ "Name" }}
                                            <i
                                                :class="
                                                    'bi bi-arrow-' +
                                                    (filter.customer.category ==
                                                    'name'
                                                        ? filter.customer
                                                              .order == 'asc'
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
                                                v-model="
                                                    form_customer_filter.keyword
                                                "
                                                @input="handleCustomerFilter()"
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
                                    </div>
                                    <!-- Customer List Item -->
                                    <div
                                        class="scroll-container-3 scroll-container-lg-3 mt-2"
                                    >
                                        <li class="list-group list-group-flush">
                                            <ul
                                                class="list-group-item list-group-item-action"
                                                v-if="unemployees.length == 0"
                                            >
                                                <span
                                                    class="text-secondary fst-italic"
                                                    >{{
                                                        "No employee found."
                                                    }}</span
                                                >
                                            </ul>
                                            <ul
                                                v-if="unemployees.length > 0"
                                                v-for="employee in unemployees"
                                                :class="
                                                    'list-group-item list-group-item-action mb-0 ' +
                                                    (employee.id ==
                                                    selected_customer.id
                                                        ? ' bg-light'
                                                        : '')
                                                "
                                                @click="
                                                    () => {
                                                        selected_customer =
                                                            employee;
                                                    }
                                                "
                                            >
                                                <span class="d-flex">
                                                    <span
                                                        class="mx-2 border-end border-secondary-subtle border-2 text-secondary pe-2"
                                                        >{{
                                                            unemployees.indexOf(
                                                                employee
                                                            ) + 1
                                                        }}</span
                                                    >
                                                    <span
                                                        :class="
                                                            employee.id ==
                                                            selected_customer.id
                                                                ? 'text-primary'
                                                                : 'text-secondary'
                                                        "
                                                        >{{
                                                            employee.name
                                                        }}</span
                                                    >
                                                </span>
                                            </ul>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </StaffLayout>

    <!-- Notif Toast -->
    <Notif ref="toastNotifRef" />
</template>
