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

const props = defineProps({
    default_contribution_id: Number,
    contribution_config: Object,
    contribution_users: Array,
    cash_in_items: Array,
    cash_out_items: Array,
    cash_in_total: Number,
    cash_out_total: Number,
    filter: Object,
    notif: Object,
    errors: Object,
});

const auth_user = usePage().props.auth.user;
const title = ref("Cash Flow");
const modalConfirmationRef = ref(null);
const modalAddCashInRef = ref(null);
const toastNotifRef = ref(null);
const cash_in_receipt = ref(null);

const form_add_cash_in = useForm({
    name: null,
    price: null,
    receipt: null,
});
const form_cash_in_filter = useForm({
    category: props.filter.cash_in.category,
    order: props.filter.cash_in.order,
});
const form_cash_out_filter = useForm({
    category: props.filter.cash_out.category,
    order: props.filter.cash_out.order,
});

function handleAddCashIn() {
    form_add_cash_in.post(route("cashIn.add"), {
        onSuccess: () => {
            showAddCashInModal(false);
            form_add_cash_in.reset();
        },
        onError: (e) => {
            for (let key in e) {
                toastNotifRef.value.showToast("warning", e[key]);
            }
        },
    });
}

function handleCashInFilter(category) {
    form_cash_in_filter.order =
        props.filter.cash_in.category == category
            ? props.filter.cash_in.order == "asc"
                ? "desc"
                : "asc"
            : "desc";
    form_cash_in_filter.category = category;
    form_cash_in_filter.post(route("cashIn.filter"));
}

function handleCashOutFilter(category) {
    form_cash_out_filter.order =
        props.filter.cash_out.category == category
            ? props.filter.cash_out.order == "asc"
                ? "desc"
                : "asc"
            : "desc";
    form_cash_out_filter.category = category;
    form_cash_out_filter.post(route("cashOut.filter"));
}

const handleFileAddCashIn = (event) => {
    form_add_cash_in.receipt = event.target.files[0];
};

function showAddCashInModal(is_show) {
    if (modalAddCashInRef.value == null) {
        const modal = document.getElementById("addCashInModal");
        modalAddCashInRef.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalAddCashInRef.value.show();
    } else {
        modalAddCashInRef.value.hide();
    }
}

function confirmation(route, message) {
    if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route, message);
    } else {
        console.error("modalConfirmationRef is null");
    }
}

function show_image(event) {
    utils.showImage(event);
}

function formatIDR(amount) {
    return utils.formatIDR(amount);
}

function formatDate(date) {
    return utils.formatDate(date);
}

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
            <div class="row gx-lg-4 mt-4">
                <div class="col-12">
                    <!-- {{-- Cash Accounts --}} -->
                    <div class="row">
                        <div class="col-12">
                            <div class="card p-3">
                                <div
                                    class="d-flex border-bottom border-1 border-primary"
                                >
                                    <span class="h5 text-primary-emphasis">{{
                                        "General Cashflow"
                                    }}</span>
                                </div>
                                <div class="row gx-2">
                                    <div class="col-6 col-lg-4">
                                        <div class="mx-auto mt-2 d-flex">
                                            <i
                                                class="bi bi-wallet2 me-3 text-primary fs-5 my-auto"
                                            ></i>
                                            <div>
                                                <span
                                                    class="d-block text-secondary"
                                                    style="font-size: 0.8rem"
                                                >
                                                    {{ "Balance" }}
                                                </span>
                                                <span class="text-dark">{{
                                                    formatIDR(
                                                        cash_in_total -
                                                            cash_out_total
                                                    )
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6 col-lg-4">
                                        <div class="mx-auto mt-2 d-flex">
                                            <i
                                                class="bi bi-journal-plus me-3 text-primary fs-5 my-auto"
                                            ></i>
                                            <div>
                                                <span
                                                    class="d-block text-secondary"
                                                    style="font-size: 0.8rem"
                                                >
                                                    {{ "Cash In" }}
                                                </span>
                                                <span class="text-dark">{{
                                                    formatIDR(cash_in_total)
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6 col-lg-4">
                                        <div class="mx-auto mt-2 d-flex">
                                            <i
                                                class="bi bi-journal-minus me-3 text-primary fs-5 my-auto"
                                            ></i>
                                            <div>
                                                <span
                                                    class="d-block text-secondary"
                                                    style="font-size: 0.8rem"
                                                >
                                                    {{ "Cash Out" }}
                                                </span>
                                                <span class="text-dark">{{
                                                    formatIDR(cash_out_total)
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Cash List -->
                    <div class="row gx-4 pb-4">
                        <!-- Cash In -->
                        <div class="col-12 col-lg-6">
                            <div class="card bg-secondary bg-opacity-25 mt-4">
                                <!-- {{-- Cash In Filter --}} -->
                                <div class="row">
                                    <div class="col-12">
                                        <div class="card p-3">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div
                                                        class="d-flex border-primary border-bottom pb-2 px-0"
                                                    >
                                                        <span
                                                            class="text-primary-emphasis ms-0 me-auto my-auto h6"
                                                        >
                                                            <i
                                                                class="bi bi-journal-plus me-1"
                                                            ></i>
                                                            {{ "Cash In List" }}
                                                        </span>
                                                        <!-- Button trigger Insert Cash In Modal -->
                                                        <button
                                                            v-if="
                                                                auth_user.roles_id ==
                                                                2
                                                            "
                                                            class="btn btn-sm btn-outline-primary border-0 py-0"
                                                            @click="
                                                                showAddCashInModal(
                                                                    true
                                                                )
                                                            "
                                                        >
                                                            <i
                                                                class="bi bi-plus-lg"
                                                            ></i>
                                                        </button>
                                                        <!-- Insert Cash In Modal -->
                                                        <div
                                                            v-if="
                                                                auth_user.roles_id ==
                                                                2
                                                            "
                                                            class="modal fade"
                                                            id="addCashInModal"
                                                            tabindex="-1"
                                                            aria-labelledby="newCashInModal"
                                                        >
                                                            <div
                                                                class="modal-dialog modal-dialog-centered"
                                                            >
                                                                <div
                                                                    class="modal-content shadow mx-3"
                                                                >
                                                                    <div
                                                                        class="modal-header py-1 ps-3 pe-2"
                                                                    >
                                                                        <span
                                                                            class="modal-title fs-5 text-primary-emphasis"
                                                                            id="newCashInModal"
                                                                        >
                                                                            <i
                                                                                class="bi bi-wallet border-secondary border-end me-2 pe-2"
                                                                            ></i>
                                                                            {{
                                                                                "New Cash In"
                                                                            }}
                                                                        </span>
                                                                        <button
                                                                            type="button"
                                                                            class="btn btn-sm ms-auto"
                                                                            @click="
                                                                                showAddCashInModal(
                                                                                    false
                                                                                )
                                                                            "
                                                                        >
                                                                            <i
                                                                                class="bi bi-x-lg"
                                                                            ></i>
                                                                        </button>
                                                                    </div>
                                                                    <form
                                                                        @submit.prevent="
                                                                            handleAddCashIn()
                                                                        "
                                                                    >
                                                                        <div
                                                                            class="modal-body bg-light"
                                                                        >
                                                                            <div
                                                                                class="row justify-content-center"
                                                                            >
                                                                                <div
                                                                                    class="col-4 col-lg-3"
                                                                                >
                                                                                    <label
                                                                                        for="cash_in_name"
                                                                                        class="form-label d-inline-block"
                                                                                        >{{
                                                                                            "Name"
                                                                                        }}</label
                                                                                    >
                                                                                </div>
                                                                                <div
                                                                                    class="col-8 col-lg-7"
                                                                                >
                                                                                    <input
                                                                                        type="text"
                                                                                        class="form-control form-control-sm"
                                                                                        id="cash_in_name"
                                                                                        v-model="
                                                                                            form_add_cash_in.name
                                                                                        "
                                                                                        placeholder="Dana Fakultas or etc..."
                                                                                    />
                                                                                    <InputError
                                                                                        :messages="
                                                                                            form_add_cash_in
                                                                                                .errors
                                                                                                .name
                                                                                        "
                                                                                        class="mt-2"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                class="row mt-2 justify-content-center"
                                                                            >
                                                                                <div
                                                                                    class="col-4 col-lg-3"
                                                                                >
                                                                                    <label
                                                                                        for="cash_in_price"
                                                                                        class="form-label d-inline-block"
                                                                                        >{{
                                                                                            "Price"
                                                                                        }}</label
                                                                                    >
                                                                                </div>
                                                                                <div
                                                                                    class="col-8 col-lg-7"
                                                                                >
                                                                                    <input
                                                                                        type="number"
                                                                                        name="cash_in_price"
                                                                                        class="form-control form-control-sm"
                                                                                        v-model="
                                                                                            form_add_cash_in.price
                                                                                        "
                                                                                        id="cash_in_price"
                                                                                    />
                                                                                    <InputError
                                                                                        :messages="
                                                                                            form_add_cash_in
                                                                                                .errors
                                                                                                .price
                                                                                        "
                                                                                        class="mt-2"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                class="row mt-2 justify-content-center"
                                                                            >
                                                                                <div
                                                                                    class="col-4 col-lg-3"
                                                                                >
                                                                                    <label
                                                                                        for="cash_in_receipt"
                                                                                        class="form-label d-inline-block"
                                                                                        >{{
                                                                                            "Receipt"
                                                                                        }}</label
                                                                                    >
                                                                                </div>
                                                                                <div
                                                                                    class="col-8 col-lg-7"
                                                                                >
                                                                                    <input
                                                                                        type="file"
                                                                                        class="form-control form-control-sm"
                                                                                        id="cash_in_receipt"
                                                                                        @change="
                                                                                            handleFileAddCashIn
                                                                                        "
                                                                                        required
                                                                                    />
                                                                                    <InputError
                                                                                        :messages="
                                                                                            form_add_cash_in
                                                                                                .errors
                                                                                                .receipt
                                                                                        "
                                                                                        class="mt-2"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="modal-footer p-1"
                                                                        >
                                                                            <button
                                                                                type="submit"
                                                                                class="btn btn-sm btn-primary"
                                                                            >
                                                                                {{
                                                                                    "Add Cash In"
                                                                                }}
                                                                            </button>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                        handleCashInFilter(
                                                            'name'
                                                        )
                                                    "
                                                    class="btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"
                                                >
                                                    {{ "Name" }}
                                                    <i
                                                        :class="
                                                            'bi bi-arrow-' +
                                                            (filter.cash_in
                                                                .category ==
                                                            'name'
                                                                ? filter.cash_in
                                                                      .order ==
                                                                  'asc'
                                                                    ? 'up'
                                                                    : 'down'
                                                                : 'up')
                                                        "
                                                    ></i>
                                                </button>
                                                <button
                                                    @click="
                                                        handleCashInFilter(
                                                            'price'
                                                        )
                                                    "
                                                    class="btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0 ms-2"
                                                >
                                                    {{ "Price" }}
                                                    <i
                                                        :class="
                                                            'bi bi-arrow-' +
                                                            (filter.cash_in
                                                                .category ==
                                                            'price'
                                                                ? filter.cash_in
                                                                      .order ==
                                                                  'asc'
                                                                    ? 'up'
                                                                    : 'down'
                                                                : 'up')
                                                        "
                                                    ></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- {{-- Cash In List --}} -->
                                <div class="row">
                                    <div class="col-12">
                                        <div
                                            class="scroll-container-2 scroll-container-lg-2 pt-2 mb-1 rounded"
                                        >
                                            <div
                                                class="row mb-2"
                                                v-if="cash_in_items.length == 0"
                                            >
                                                <div class="col">
                                                    <span
                                                        class="ms-3 text-secondary"
                                                        >{{
                                                            "No cash in found."
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                            <div
                                                class="row mb-2"
                                                v-for="item in cash_in_items"
                                            >
                                                <div class="col-12">
                                                    <div
                                                        class="card py-2 mx-2 px-1 shadow-sm card-bg-hover text-dark"
                                                    >
                                                        <div
                                                            class="d-block"
                                                            style="width: 100%"
                                                        >
                                                            <div
                                                                class="d-flex border-bottom border-1 mx-2 pb-1"
                                                            >
                                                                <p
                                                                    class="fw-normal me-auto my-auto scroll-x-hidden"
                                                                >
                                                                    <span
                                                                        class="text-nowrap text-primary-emphasis"
                                                                    >
                                                                        {{
                                                                            item.name
                                                                        }}
                                                                    </span>
                                                                </p>
                                                                <div
                                                                    class="d-flex ms-2 mb-auto"
                                                                >
                                                                    <button
                                                                        v-if="
                                                                            item.name !==
                                                                            'Contribution Charge'
                                                                        "
                                                                        class="btn btn-sm btn-outline-secondary border-0 my-auto"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#cashInReceiptModal"
                                                                        @click="
                                                                            () =>
                                                                                (cash_in_receipt =
                                                                                    item.name !==
                                                                                    'Contribution Charge'
                                                                                        ? item.reciept
                                                                                        : '')
                                                                        "
                                                                    >
                                                                        <i
                                                                            class="bi bi-receipt"
                                                                        ></i>
                                                                    </button>
                                                                    <div
                                                                        v-if="
                                                                            auth_user.roles_id ==
                                                                                2 &&
                                                                            item.name !==
                                                                                'Contribution Charge'
                                                                        "
                                                                        class="border-start border-2 border-secondary-subtle my-1 mx-1"
                                                                    ></div>
                                                                    <button
                                                                        v-if="
                                                                            auth_user.roles_id ==
                                                                                2 &&
                                                                            item.name !==
                                                                                'Contribution Charge'
                                                                        "
                                                                        class="text-decoration-none btn btn-sm btn-outline-secondary border-0 my-auto"
                                                                        @click="
                                                                            confirmation(
                                                                                route(
                                                                                    'cashIn.delete',
                                                                                    item.id
                                                                                ),
                                                                                'Please confirm to delete ' +
                                                                                    item.name +
                                                                                    ' from Cash In item list.'
                                                                            )
                                                                        "
                                                                    >
                                                                        <i
                                                                            class="bi bi-trash"
                                                                        ></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="d-flex mx-0 mt-1"
                                                            >
                                                                <p
                                                                    class="mb-0 ms-2"
                                                                >
                                                                    <i
                                                                        :class="
                                                                            ' me-2 text-secondary bi bi-person' +
                                                                            (item.financial
                                                                                ? ''
                                                                                : '-exclamation text-danger')
                                                                        "
                                                                    ></i>
                                                                    <span
                                                                        v-if="
                                                                            item.financial
                                                                        "
                                                                    >
                                                                        {{
                                                                            item
                                                                                .financial
                                                                                .name
                                                                        }}
                                                                    </span>
                                                                    <button
                                                                        v-if="
                                                                            auth_user.roles_id ==
                                                                                2 &&
                                                                            item.name !==
                                                                                'Contribution Charge' &&
                                                                            !item.financial
                                                                        "
                                                                        class="btn btn-sm btn-outline-danger border-0"
                                                                        @click="
                                                                            confirmation(
                                                                                route(
                                                                                    'cashIn.validate',
                                                                                    item.id
                                                                                ),
                                                                                'Click the button to confirm that ' +
                                                                                    item.name +
                                                                                    ' price is valid for ' +
                                                                                    formatIDR(
                                                                                        item.price
                                                                                    ) +
                                                                                    '.'
                                                                            )
                                                                        "
                                                                    >
                                                                        {{
                                                                            "Click here to validate"
                                                                        }}
                                                                    </button>
                                                                    <span
                                                                        v-if="
                                                                            auth_user.roles_id !==
                                                                                2 &&
                                                                            item.name !==
                                                                                'Contribution Charge' &&
                                                                            !item.financial
                                                                        "
                                                                    >
                                                                        {{
                                                                            "Required validation from Financial Officer."
                                                                        }}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <div
                                                                class="d-flex mx-0 mt-1"
                                                            >
                                                                <span
                                                                    class="ms-2 text-primary"
                                                                >
                                                                    <i
                                                                        class="bi bi-journal-plus me-2 text-secondary"
                                                                    ></i>
                                                                    {{
                                                                        formatIDR(
                                                                            item.price
                                                                        )
                                                                    }}
                                                                </span>
                                                                <span
                                                                    class="ms-auto me-2 my-auto text-end text-secondary"
                                                                    style="
                                                                        font-size: 0.8rem;
                                                                    "
                                                                >
                                                                    {{
                                                                        formatDate(
                                                                            item.created_at
                                                                        )
                                                                    }}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Cash Out -->
                        <div class="col-12 col-lg-6">
                            <div class="card bg-secondary bg-opacity-25 mt-4">
                                <!-- {{-- Cash Out Filter --}} -->
                                <div class="row">
                                    <div class="col-12">
                                        <div class="card shadow-sm p-3">
                                            <div class="row px-0">
                                                <div class="col-12">
                                                    <div
                                                        class="d-flex border-primary border-bottom px-0 pb-2"
                                                    >
                                                        <span
                                                            class="text-primary-emphasis ms-0 me-auto my-auto h6"
                                                        >
                                                            <i
                                                                class="bi bi-journal-minus me-1"
                                                            ></i>
                                                            {{
                                                                "Cash Out List"
                                                            }}
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
                                                        handleCashOutFilter(
                                                            'name'
                                                        )
                                                    "
                                                    class="btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"
                                                >
                                                    {{ "Name" }}
                                                    <i
                                                        :class="
                                                            'bi bi-arrow-' +
                                                            (filter.cash_out
                                                                .category ==
                                                            'name'
                                                                ? filter
                                                                      .cash_out
                                                                      .order ==
                                                                  'asc'
                                                                    ? 'up'
                                                                    : 'down'
                                                                : 'up')
                                                        "
                                                    ></i>
                                                </button>
                                                <button
                                                    @click="
                                                        handleCashOutFilter(
                                                            'disbursement'
                                                        )
                                                    "
                                                    class="btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0 ms-2"
                                                >
                                                    {{ "Price" }}
                                                    <i
                                                        :class="
                                                            'bi bi-arrow-' +
                                                            (filter.cash_out
                                                                .category ==
                                                            'disbursement'
                                                                ? filter
                                                                      .cash_out
                                                                      .order ==
                                                                  'asc'
                                                                    ? 'up'
                                                                    : 'down'
                                                                : 'up')
                                                        "
                                                    ></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- {{-- Cash Out List --}} -->
                                <div class="row mt-0">
                                    <div class="col-12">
                                        <div
                                            class="scroll-container-2 scroll-container-lg-2 pt-2 mb-1 rounded"
                                        >
                                            <div
                                                v-if="
                                                    cash_out_items.length == 0
                                                "
                                                class="row mb-2"
                                            >
                                                <div class="col">
                                                    <span
                                                        class="ms-3 text-secondary"
                                                        >{{
                                                            "No department found."
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                            <div
                                                class="row mb-2"
                                                v-for="item in cash_out_items"
                                            >
                                                <div class="col-12">
                                                    <div
                                                        class="card py-2 mx-2 px-1 shadow-sm card-bg-hover text-dark"
                                                    >
                                                        <div
                                                            class="d-block mx-0"
                                                        >
                                                            <div
                                                                class="d-flex mx-2 border-bottom border-1 pb-1"
                                                            >
                                                                <p
                                                                    class="fw-normal me-auto my-auto text-primary-emphasis"
                                                                >
                                                                    {{
                                                                        item.name
                                                                    }}
                                                                </p>
                                                                <div
                                                                    class="btn-group btn-group-sm ms-auto"
                                                                >
                                                                    <a
                                                                        class="btn btn-sm btn-outline-primary border-0 text-decoration-none py-0 d-flex"
                                                                        :href="
                                                                            route(
                                                                                'department',
                                                                                item.department_id
                                                                            )
                                                                        "
                                                                    >
                                                                        <i
                                                                            class="bi bi-info-circle my-auto"
                                                                        ></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="d-flex mx-2 mt-1 text-secondary"
                                                            >
                                                                <i
                                                                    class="bi bi-person me-2"
                                                                ></i>
                                                                {{
                                                                    item.manager
                                                                        .name
                                                                }}
                                                            </div>
                                                            <div class="d-flex">
                                                                <span
                                                                    class="ms-2 text-primary"
                                                                >
                                                                    <i
                                                                        class="bi bi-journal-minus me-2 text-secondary"
                                                                    ></i>
                                                                    {{
                                                                        formatIDR(
                                                                            item.disbursement
                                                                        )
                                                                    }}
                                                                </span>
                                                                <span
                                                                    class="ms-auto me-2 my-auto text-end text-secondary"
                                                                    :style="'font-size: 0.8rem;'"
                                                                >
                                                                    {{
                                                                        formatDate(
                                                                            item.created_at
                                                                        )
                                                                    }}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StaffLayout>

    <!-- {{-- Cash In Receipt Modal --}} -->
    <div
        class="modal fade"
        id="cashInReceiptModal"
        tabindex="-1"
        aria-labelledby="cashInReceiptModal"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3 mt-5">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i
                            class="bi bi-receipt border-secondary border-end me-2 pe-2"
                        ></i>
                        {{ "Cash In Receipt" }}
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
                <div class="modal-body bg-light p-1 px-3">
                    <div class="row justify-content-center mt-2">
                        <div class="col-12 d-flex">
                            <img
                                :src="
                                    '/storage/local/images/receipt/cash_in/' +
                                    cash_in_receipt
                                "
                                alt="image"
                                class="rounded mx-auto placeholder"
                                @load="show_image"
                                style="
                                    width: 100%;
                                    height: 100%;
                                    object-fit: contain;
                                    max-height: 320px;
                                "
                            />
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-12 d-flex">
                            <a
                                :href="
                                    '/storage/local/images/receipt/cash_in/' +
                                    cash_in_receipt
                                "
                                target="blank"
                                style="text-decoration-none"
                                class="mx-auto"
                                id="ci_receipt_download"
                                download
                            >
                                <button class="btn btn-sm btn-light">
                                    <span class="fw-light me-2">{{
                                        cash_in_receipt
                                    }}</span>
                                    <i class="bi bi-download text-primary"></i>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="modal-footer p-1">
                    <button
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        class="btn btn-sm btn-secondary"
                    >
                        {{ "Close" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Notif Toast -->
    <Notif ref="toastNotifRef" />
</template>
