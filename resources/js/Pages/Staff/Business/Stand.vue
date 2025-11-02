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
    onUnmounted,
    defineProps,
    defineExpose,
} from "vue";
import { formatDate, formatDateOnly } from "@/utils";

const props = defineProps({
    staff_list: Array,
    stand_list: Array,
    filter: Object,
    notif: Object,
    errors: Object,
});

const auth_user = usePage().props.auth.user;
const title = ref("Stand");
const modalConfirmationRef = ref(null);
const toastNotifRef = ref(null);
const placeholder = ref("placeholder");
const modalNewStand = ref(null);

const form_filter = useForm({
    category: props.filter.category,
    order: props.filter.order,
    active: props.filter.active,
});
const form_new_stand = useForm({
    name: null,
    pic_id: null,
    place: null,
    date: null,
    type: 0,
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
    form_filter.post(route("food.stand.filter"));
}

function showNewStandModal(is_show) {
    if (modalNewStand.value == null) {
        const modal = document.getElementById("newStandModal");
        modalNewStand.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalNewStand.value.show();
    } else {
        modalNewStand.value.hide();
    }
}

function handleNewStand() {
    form_new_stand.post(route("food.stand.insert"), {
        onSuccess: () => {
            showNewStandModal(false);
            form_new_stand.reset();
        },
    });
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
                            <div class="d-flex mx-auto">
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
                                <button
                                    @click="handleSubmitFilter('date')"
                                    class="btn text-nowrap btn-sm btn-outline-secondary ms-2 border-1 rounded-2 border-secondary-subtle py-0"
                                >
                                    {{ "Date" }}
                                    <i
                                        :class="
                                            'bi bi-arrow-' +
                                            (filter.category == 'date'
                                                ? filter.order == 'asc'
                                                    ? 'up'
                                                    : 'down'
                                                : 'up')
                                        "
                                    ></i>
                                </button>
                                <button
                                    @click="
                                        () => {
                                            form_filter.active = !filter.active;
                                            handleSubmitFilter();
                                        }
                                    "
                                    :class="
                                        'btn text-nowrap btn-sm ms-2 border-1 rounded-2 border-secondary-subtle py-0 btn-outline-success ' +
                                        (filter.active == true ? 'active' : '')
                                    "
                                >
                                    {{
                                        filter.active == true
                                            ? "Active"
                                            : "All Status"
                                    }}
                                </button>
                            </div>
                            <!-- New Stand -->
                            <button
                                v-if="auth_user.roles_id == 3"
                                class="btn btn-sm btn-outline-primary border-0 py-0"
                                @click="showNewStandModal(true)"
                            >
                                <i class="bi bi-plus-lg d-lg-none"></i>
                                <span class="d-none d-lg-block">{{
                                    "New Stand"
                                }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Stand List -->
            <div class="row gx-4 mt-4 mt-lg-5">
                <div v-for="stand in stand_list" class="col-lg-4 col-12">
                    <a
                        :href="route('food.stand.detail', stand.id)"
                        class="text-decoration-none"
                    >
                        <div class="card card-bg-hover p-3 mb-3 mb-lg-4">
                            <div class="d-flex" style="font-size: 0.8rem">
                                <span class="me-auto">{{
                                    formatDateOnly(stand.date)
                                }}</span>
                                <span
                                    :class="
                                        'd-block ' +
                                        (stand.menu_lock > 0 &&
                                        stand.sale_validation == 0
                                            ? 'text-success'
                                            : 'text-secondary')
                                    "
                                    >{{
                                        stand.menu_lock > 0 &&
                                        stand.sale_validation == 0
                                            ? "active"
                                            : "inactive"
                                    }}</span
                                >
                            </div>
                            <span class="h5 text-primary-emphasis me-auto">
                                {{ "Stand " + stand.name }}
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </StaffLayout>

    <!-- Modal -->
    <!-- New Stand Modal -->
    <div
        v-if="auth_user.roles_id == 3"
        class="modal fade"
        id="newStandModal"
        tabindex="-1"
        aria-labelledby="newStandModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i class="bi bi-shop pe-2"></i>
                        {{ "New Stand" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showNewStandModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <form @submit.prevent="handleNewStand()">
                    <div class="modal-body bg-light">
                        <div class="row justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="stand_name"
                                    class="form-label d-inline-block"
                                    >{{ "Name" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    id="stand_name"
                                    v-model="form_new_stand.name"
                                    placeholder="Blaterian 1"
                                />
                                <InputError
                                    :message="form_new_stand.errors.name"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="stand_place"
                                    class="form-label d-inline-block"
                                    >{{ "Place" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    id="stand_place"
                                    v-model="form_new_stand.place"
                                    placeholder="Gedung F"
                                />
                                <InputError
                                    :message="form_new_stand.errors.place"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="stand_date"
                                    class="form-label d-inline-block"
                                    >{{ "Date" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    type="date"
                                    class="form-control form-control-sm"
                                    id="stand_date"
                                    v-model="form_new_stand.date"
                                />
                                <InputError
                                    :message="form_new_stand.errors.date"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="stand_type"
                                    class="form-label d-inline-block"
                                    >{{ "Type" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <select
                                    id="stand_type"
                                    class="form-select form-select-sm"
                                    v-model="form_new_stand.type"
                                >
                                    <option
                                        :value="item.value"
                                        v-for="item in [
                                            { value: 0, name: 'Live' },
                                            { value: 1, name: 'Pre-Order' },
                                            {
                                                value: 2,
                                                name: 'Live and Pre-Order',
                                            },
                                        ]"
                                    >
                                        {{ item.name }}
                                    </option>
                                </select>
                                <InputError
                                    :message="form_new_stand.errors.type"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="stand_pic"
                                    class="form-label d-inline-block"
                                    >{{ "In Charge" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <v-select
                                    class="bg-white text-nowrap"
                                    :options="staff_list"
                                    label="name"
                                    :reduce="(staff) => staff.id"
                                    v-model="form_new_stand.pic_id"
                                    placeholder="Select staff"
                                />
                                <InputError
                                    :message="form_new_stand.errors.pic_id"
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
