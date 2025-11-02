<script setup>
import StaffLayout from "@/Layouts/StaffLayout.vue";
import InputError from "@/Components/InputError.vue";
import Notif from "@/Components/Notif.vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import ModalAlertNotification from "@/Components/ModalAlertNotification.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { Head, useForm, usePage } from "@inertiajs/vue3";
import html2canvas from "html2canvas";
import {
    ref,
    computed,
    watch,
    onMounted,
    onUnmounted,
    defineProps,
    defineExpose,
} from "vue";
import {
    formatDate,
    formatDateOnly,
    formatDateSimple,
    formatIDR,
    formatTimeOnly,
} from "@/utils";
import { format } from "date-fns";

const props = defineProps({
    stand: Object,
    menu_list: Object,
    customer_list: Array,
    order_list: Array,
    payment_method_list: Array,
    data: Object,
    notif: Object,
    errors: Object,
});

const auth_user = usePage().props.auth.user;
const title = ref("Cashier");
const modalConfirmationRef = ref(null);
const modalAlertNotificationRef = ref(null);
const modalPrintReceipt = ref(null);
const modalNewCustomer = ref(null);
const toastNotifRef = ref(null);
const receiptContentRef = ref(null);
const receiptPrintedImageUrl = ref(null);
const receiptIsDownload = ref(true);
const receiptIsSendWhatsapp = ref(true);
const active_tab = ref(1);
const selected_order = ref();
const placeholder = ref("placeholder");
const today = ref(new Date());
const is_cashier = computed(() => {
    return props.stand.cashier.some((cashier) => cashier.id == auth_user.id);
});
const printedReceipt = ref({
    id: null,
    print: false,
});

const form_transaction = useForm({
    customer: null,
    customer_id: null,
    order: [],
    discount: 0,
    subtotal: 0,
    transaction: 0,
    payment_method_id: 1,
    payment_price: 0,
});

const form_new_customer = useForm({
    name: null,
    phone: null,
});

const form_print_receipt = ref({
    date: null,
    customer: null,
    customer_id: null,
    order_list: null,
    discount: null,
    transaction: null,
    payment_method_id: null,
    payment_price: null,
});

function addOrder(menu) {
    const index = form_transaction.order.findIndex(
        (item) => item.menu_id === menu.id
    );

    if (index !== -1) {
        form_transaction.order[index].amount += 1;
        form_transaction.order[index].total += Number(
            form_transaction.order[index].price
        );
        form_transaction.subtotal += Number(
            form_transaction.order[index].price
        );
    } else {
        form_transaction.order.push({
            menu_id: menu.id,
            name: menu.name,
            price: Number(menu.price),
            amount: 1,
            total: Number(menu.price),
        });
        form_transaction.subtotal += Number(menu.price);
    }
}

function handleSubmitTransaction() {
    console.log(form_transaction);

    form_transaction.post(route("stand.sale.add", props.stand.id), {
        onError: (errors) => {
            for (const key in errors) {
                toastNotifRef.value.showToast("warning", errors[key]);
            }
        },
    });
}

function handleSubmitNewCustomer() {
    form_new_customer.post(route("sale.customer.add", props.stand.id));
}

function handleFinishTransaction(id) {
    const form = useForm({
        transaction_id: id,
    });
    form.post(route("shop.transaction.finish"));
}

function showPrintReceiptModal(is_show) {
    if (modalPrintReceipt.value == null) {
        const modal = document.getElementById("printReceiptModal");
        modalPrintReceipt.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalPrintReceipt.value.show();
    } else {
        modalPrintReceipt.value.hide();
    }
}

function showNewCustomerModal(is_show) {
    if (modalNewCustomer.value == null) {
        const modal = document.getElementById("newCustomerModal");
        modalNewCustomer.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalNewCustomer.value.show();
    } else {
        modalNewCustomer.value.hide();
    }
}

function resetForm() {
    form_transaction.customer = null;
    form_transaction.customer_id = null;
    form_transaction.discount = null;
    form_transaction.order = [];
    form_transaction.transaction = null;
    form_transaction.subtotal = null;
    form_transaction.payment_method_id = 1;
    form_transaction.payment_price = 0;
}

const printReceipt = async () => {
    const element = receiptContentRef.value;
    const canvas = await html2canvas(element, {
        scale: 2, // higher quality
    });
    receiptPrintedImageUrl.value = canvas.toDataURL("image/png", 0.8);
    // Optional: download
    if (receiptIsDownload.value) {
        const link = document.createElement("a");
        link.href = receiptPrintedImageUrl.value;
        link.download =
            "receipt" +
            props.stand.id +
            auth_user.id +
            format(today.value, "HHmm") +
            ".png";
        link.click();
    }
    // Send to Whatsapp
    if (receiptIsSendWhatsapp.value) {
        if (!form_print_receipt.value.customer_id) {
            return toastNotifRef.value.showToast(
                "warning",
                "Please add the customer first."
            );
        }
        const customer_phone = props.customer_list.find(
            (item) => item.id == form_print_receipt.value.customer_id
        )?.phone;
        const phone =
            "62" +
            (customer_phone.startsWith("0")
                ? customer_phone.slice(1)
                : customer_phone);
        const message = encodeURIComponent(
            [
                "*BLATERIAN RECEIPT*",
                "",
                "Thank you!! We excited to have your next order (>_<)",
                "Have a great dayy...",
                "================",
                "Terima kasih!! Kami nantikan pesananmu selanjutnya (>_<)",
                "Semoga harimu luar biasaa...",
                "",
                "#GoodFoodMakesGoodMood",
            ].join("\n")
        );
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    }
};

function onSearchCustomer(search) {
    if (search !== "") {
        form_new_customer.phone = search;
    }
}

const onInputCustomer = () => {
    form_new_customer.name = form_transaction.customer;
};

function confirmation(route, message) {
    if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route, message);
    } else {
        console.error("modalConfirmationRef is null");
    }
}

function alertNotification(message) {
    modalAlertNotificationRef.value.showModal(message);
}

onMounted(() => {});
watch(
    () => props.notif,
    (newValue) => {
        const notification = newValue;

        toastNotifRef.value.showToast(notification.type, notification.message);
    }
);

watch(
    () => form_transaction.discount,
    (newValue) => {
        const discount = Number(newValue);
        form_transaction.transaction = form_transaction.subtotal - discount;
    }
);
watch(
    () => form_transaction.subtotal,
    (newValue) => {
        const subtotal = Number(newValue);
        form_transaction.transaction = subtotal - form_transaction.discount;
    }
);
</script>

<template>
    <!-- Page Layout -->
    <StaffLayout>
        <Head :title="title" :icon="'/storage/local/images/apps/logo.png'" />
        <!-- Modal Box -->
        <ModalConfirmation ref="modalConfirmationRef" />
        <ModalAlertNotification ref="modalAlertNotificationRef" />
        <template #header>
            <a
                :href="route('food.stand')"
                class="bg-opacity-0 text-decoration-none text-primary-emphasis"
            >
                <span class="fw-light">{{ "Stand" }}</span>
            </a>
            <span class="mx-2">{{ "/" }}</span>
            <a
                :href="route('food.stand.detail', stand.id)"
                class="bg-opacity-0 text-decoration-none text-primary-emphasis"
            >
                <span class="fw-light">{{ stand.name }}</span>
            </a>
            <span class="mx-2">{{ "/" }}</span>
            {{ title }}
        </template>

        <div class="container me-lg-0 mx-auto mb-5">
            <div class="row gx-4 mt-4">
                <div class="col-12 col-lg-5">
                    <div class="card bg-white p-3">
                        <div class="d-flex border-bottom border-primary">
                            <span class="h5 text-primary-emphasis me-auto"
                                ><i class="bi bi-shop me-2"></i
                                >{{ "Stand " + stand.name }}</span
                            >
                        </div>
                        <div class="row g-2 mt-1">
                            <div class="col-6">
                                <span
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "In Charge" }}</span
                                >
                                <div class="scroll-x-hidden">
                                    <span
                                        class="d-block text-primary-emphasis text-nowrap"
                                        >{{ stand.pic.name }}</span
                                    >
                                </div>
                            </div>
                            <div class="col-6">
                                <span
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Place" }}</span
                                >
                                <div class="scroll-x-hidden">
                                    <span
                                        class="d-block text-primary-emphasis text-nowrap"
                                        >{{ stand.place }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card my-4 bg-white p-1 d-lg-none">
                        <div class="d-flex">
                            <button
                                :class="
                                    'btn btn-sm btn-outline-primary border-0 w-50 ' +
                                    (active_tab == 1 ? 'active' : '')
                                "
                                @click="active_tab = 1"
                            >
                                <i class="fa-solid fa-cash-register me-2"></i>
                                {{ "Cashier" }}
                            </button>
                            <button
                                :class="
                                    'btn btn-sm btn-outline-primary border-0 w-50 ' +
                                    (active_tab == 2 ? 'active' : '')
                                "
                                @click="active_tab = 2"
                            >
                                <i class="fa-solid fa-user-group me-2"></i>
                                {{ "Self-Order" }}
                            </button>
                        </div>
                    </div>
                    <div class="card bg-white p-3 my-4" v-if="active_tab == 1">
                        <div class="d-flex">
                            <span class="text-primary h6 mb-0 me-auto"
                                ><i class="bi bi-list-ul me-2"></i
                                >{{ "Menu" }}</span
                            >
                            <span
                                class="text-secondary fst-italic ms-2"
                                style="font-size: 0.8rem"
                                >{{
                                    "Click on the menu, to add customer order."
                                }}</span
                            >
                        </div>
                        <div
                            class="scroll-container-3 scroll-container-lg-2 pe-1"
                        >
                            <li
                                class="list-group list-group-flush"
                                v-for="(list, category) in menu_list"
                            >
                                <ul
                                    class="list-group-item list-group-item-light py-1 ps-0 pe-2 mb-0"
                                >
                                    <span class="text-secondary">{{
                                        category
                                    }}</span>
                                </ul>
                                <ul
                                    @click="addOrder(item)"
                                    class="list-group-item list-group-item-action py-1 ps-0 pe-2 mb-0"
                                    v-for="item in list"
                                >
                                    <div class="d-flex">
                                        <span class="rounded-2 text-nowrap">
                                            {{ "(" }}
                                            <span
                                                :class="
                                                    'text-nowrap text-' +
                                                    (item.stock - item.sale == 0
                                                        ? 'danger'
                                                        : item.stock -
                                                              item.sale <=
                                                          5
                                                        ? 'warning'
                                                        : 'dark')
                                                "
                                                >{{ item.sale }}</span
                                            >
                                            {{ "/" }}
                                            <span
                                                :class="
                                                    'text-nowrap text-' +
                                                    (item.stock == 0
                                                        ? 'danger'
                                                        : 'dark')
                                                "
                                                >{{ item.stock }}</span
                                            >
                                            {{ ")" }}
                                        </span>
                                        <span
                                            class="scroll-x-hidden ms-2 me-auto my-auto"
                                        >
                                            <span
                                                class="text-nowrap text-primary-emphasis"
                                                >{{ item.name }}</span
                                            >
                                            <span
                                                class="text-nowrap text-secondary"
                                            >
                                                {{
                                                    (item.volume || item.mass
                                                        ? " - "
                                                        : "") +
                                                    (item.volume
                                                        ? item.volume +
                                                          item.volume_unit
                                                        : "") +
                                                    (item.mass
                                                        ? item.mass +
                                                          item.mass_unit
                                                        : "")
                                                }}
                                            </span>
                                        </span>
                                        <span
                                            class="text-nowrap my-auto text-primary"
                                            >{{ formatIDR(item.price) }}</span
                                        >
                                    </div>
                                </ul>
                            </li>
                        </div>
                    </div>
                    <div class="card p-3 bg-white mt-4" v-if="active_tab == 2">
                        <div
                            class="d-flex border-primary border-bottom border-1 pb-2"
                        >
                            <span class="h6 mb-0 text-primary-emphasis">
                                <i class="fa-solid fa-user-group me-2"></i
                                >{{ "Order List" }}</span
                            >
                            <span class="text-secondary"></span>
                        </div>
                        <div
                            class="scroll-container-2 scroll-container-lg-2 pe-1"
                        >
                            <div class="d-flex bg-light">
                                <span
                                    class="text-secondary fst-italic mx-auto my-1"
                                    style="font-size: 0.8rem"
                                    >{{
                                        order_list.length == 0
                                            ? "Nothing"
                                            : "Click to see detail"
                                    }}</span
                                >
                            </div>
                            <li class="list-group list-group-flush">
                                <ul
                                    :class="
                                        'list-group-item list-group-item-action mb-0 px-0 d-flex ' +
                                        (selected_order?.id == item.id
                                            ? 'bg-primary bg-opacity-10'
                                            : '')
                                    "
                                    v-for="item in order_list"
                                    @click="
                                        () => {
                                            if (is_cashier) {
                                                selected_order = item;
                                                selected_order.dana_receipt_validate = false;
                                            } else {
                                                alertNotification(
                                                    'You are not Cashier. This feature only available for listed cashier in Stand ' +
                                                        stand?.name
                                                );
                                            }
                                        }
                                    "
                                >
                                    {{
                                        item?.customer?.name
                                    }}
                                    <span class="text-secondary ms-auto">{{
                                        formatDate(item?.created_at)
                                    }}</span>
                                    <i
                                        @click.prevent="
                                            confirmation(
                                                route(
                                                    'shop.transaction.cancel',
                                                    item.id
                                                ),
                                                'Confirm to cancel tranasction order from ' +
                                                    item?.customer?.name +
                                                    '?'
                                            )
                                        "
                                        class="bi bi-x-lg btn btn-sm btn-light ms-2"
                                    ></i>
                                </ul>
                            </li>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-7">
                    <div class="card mb-4 bg-white p-1 d-lg-block d-none">
                        <div class="d-flex">
                            <button
                                :class="
                                    'btn btn-sm btn-outline-primary border-0 w-50 ' +
                                    (active_tab == 1 ? 'active' : '')
                                "
                                @click="active_tab = 1"
                            >
                                <i class="fa-solid fa-cash-register me-2"></i>
                                {{ "Cashier" }}
                            </button>
                            <button
                                :class="
                                    'btn btn-sm btn-outline-primary border-0 w-50 ' +
                                    (active_tab == 2 ? 'active' : '')
                                "
                                @click="active_tab = 2"
                            >
                                <i class="fa-solid fa-user-group me-2"></i>
                                {{ "Self-Order" }}
                            </button>
                        </div>
                    </div>
                    <div class="card bg-white p-3 mb-4" v-if="active_tab == 1">
                        <div class="d-flex">
                            <span class="h6 mb-0 text-primary">
                                {{ "Point Of Sales" }}
                            </span>
                        </div>
                        <div class="d-flex mt-2 bg-light">
                            <button
                                @click="resetForm()"
                                class="btn-outline-secondary btn py-1 rounded-0 w-100 border-0"
                            >
                                {{ "New Transaction" }}
                            </button>
                        </div>
                        <div class="row g-2 mt-1">
                            <div class="col-6 col-lg-4">
                                <span
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Cashier" }}</span
                                >
                                <div class="scroll-x-hidden">
                                    <span
                                        class="d-block text-primary-emphasis text-nowrap"
                                        >{{ auth_user.name }}</span
                                    >
                                </div>
                            </div>

                            <div class="col-12 col-lg-8">
                                <label
                                    for="customer"
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Customer" }}</label
                                >
                                <div class="d-flex">
                                    <input
                                        type="text"
                                        v-model="form_transaction.customer"
                                        class="form-control form-control-sm py-0 w-50 me-2"
                                        placeholder="ex: Timothy"
                                        @input="onInputCustomer"
                                    />
                                    <v-select
                                        class="bg-white text-nowrap w-100 me-2"
                                        :options="customer_list"
                                        label="phone"
                                        :reduce="(customer) => customer.id"
                                        v-model="form_transaction.customer_id"
                                        placeholder="08xxxxxx"
                                        @search="onSearchCustomer"
                                        @option:selected="
                                            () => {
                                                form_transaction.customer =
                                                    customer_list.find(
                                                        (item) =>
                                                            item.id ==
                                                            form_transaction.customer_id
                                                    ).name;
                                            }
                                        "
                                    />
                                    <button
                                        class="btn btn-sm btn-outline-primary"
                                        @click="
                                            () => {
                                                if (is_cashier) {
                                                    showNewCustomerModal(true);
                                                } else {
                                                    alertNotification(
                                                        'You are not listed as Cashier in Stand ' +
                                                            stand.name +
                                                            '. Only cashier can add customer.'
                                                    );
                                                }
                                            }
                                        "
                                    >
                                        <i class="bi bi-plus-lg"></i>
                                    </button>
                                </div>
                                <InputError
                                    :message="
                                        form_transaction.errors.customer_id
                                    "
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <span
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Order" }}</span
                                >
                                <div
                                    class="border rounded-3"
                                    style="min-height: 50px"
                                >
                                    <span
                                        class="text-secondary fst-italic ms-2"
                                        v-if="
                                            form_transaction.order?.length == 0
                                        "
                                        style="font-size: 0.8rem"
                                        >{{
                                            "Add an order from menu list."
                                        }}</span
                                    >
                                    <div
                                        class="scroll-container scroll-container-lg pe-1"
                                    >
                                        <li
                                            class="list-group list-group-flush px-2"
                                            v-if="
                                                form_transaction.order?.length >
                                                0
                                            "
                                        >
                                            <ul
                                                class="list-group-item list-group-item-action mb-0 py-1 px-1"
                                                v-for="(
                                                    menu, index
                                                ) in form_transaction.order"
                                            >
                                                <div class="d-flex">
                                                    <button
                                                        @click="
                                                            () => {
                                                                if (
                                                                    menu.amount >
                                                                    1
                                                                ) {
                                                                    form_transaction.order[
                                                                        index
                                                                    ].amount -= 1;
                                                                    form_transaction.order[
                                                                        index
                                                                    ].total =
                                                                        menu.price *
                                                                        menu.amount;
                                                                } else {
                                                                    form_transaction.order.splice(
                                                                        index,
                                                                        1
                                                                    );
                                                                }
                                                                form_transaction.subtotal -=
                                                                    menu.price;
                                                            }
                                                        "
                                                        class="btn btn-sm btn-outline-primary border-0 py-0"
                                                    >
                                                        <i
                                                            :class="
                                                                'bi bi-' +
                                                                (menu.amount > 1
                                                                    ? 'dash-lg'
                                                                    : 'trash3')
                                                            "
                                                            style="
                                                                font-size: 0.8rem;
                                                            "
                                                        ></i>
                                                    </button>
                                                    <span
                                                        class="text-secondary mx-1"
                                                    >
                                                        {{ menu.amount }}
                                                    </span>
                                                    <button
                                                        @click="
                                                            () => {
                                                                form_transaction.order[
                                                                    index
                                                                ].amount += 1;
                                                                form_transaction.order[
                                                                    index
                                                                ].total =
                                                                    menu.price *
                                                                    menu.amount;
                                                                form_transaction.subtotal +=
                                                                    menu.price;
                                                            }
                                                        "
                                                        class="btn btn-sm btn-outline-primary border-0 py-0"
                                                    >
                                                        <i
                                                            class="bi bi-plus-lg"
                                                            style="
                                                                font-size: 0.8rem;
                                                            "
                                                        ></i>
                                                    </button>
                                                    <span
                                                        class="scroll-x-hidden me-auto"
                                                    >
                                                        <span
                                                            class="text-nowrap text-primary-emphasis"
                                                            >{{
                                                                menu.name
                                                            }}</span
                                                        >
                                                    </span>
                                                    <span
                                                        class="ms-2 text-secondary"
                                                    >
                                                        {{
                                                            formatIDR(
                                                                menu.total
                                                            )
                                                        }}
                                                    </span>
                                                </div>
                                            </ul>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-end g-2 mt-2">
                            <div class="col-6 col-lg-4">
                                <span
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Subtotal" }}</span
                                >
                                <div class="scroll-x-hidden">
                                    <span
                                        class="d-block text-primary-emphasis text-nowrap"
                                        >{{
                                            formatIDR(form_transaction.subtotal)
                                        }}</span
                                    >
                                </div>
                            </div>
                            <div class="col-lg-4 col-6">
                                <label
                                    for="discount"
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Discount" }}</label
                                >
                                <div
                                    class="input-group input-group-sm bg-light"
                                >
                                    <label
                                        for="discount"
                                        class="text-secondary my-auto mx-1"
                                        >{{ "Rp" }}</label
                                    >
                                    <input
                                        type="number"
                                        v-model="form_transaction.discount"
                                        id="discount"
                                        class="form-control form-control-sm py-0 rounded-2"
                                        placeholder="ex: 2000"
                                    />
                                </div>
                            </div>
                            <div class="col-6 col-lg-4">
                                <span
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Total Transaction" }}</span
                                >
                                <div class="d-flex">
                                    <div class="scroll-x-hidden w-100">
                                        <span
                                            class="d-block text-primary text-nowrap"
                                            >{{
                                                formatIDR(
                                                    form_transaction.transaction
                                                )
                                            }}</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-end g-2 mt-2">
                            <div class="col-6 col-lg-4">
                                <label
                                    for="payment_method_id"
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Payment Method" }}</label
                                >
                                <div
                                    class="input-group input-group-sm bg-light"
                                >
                                    <select
                                        v-model="
                                            form_transaction.payment_method_id
                                        "
                                        required
                                        id="payment_method_id"
                                        class="form-select"
                                    >
                                        <option
                                            :value="item.id"
                                            v-for="item in payment_method_list"
                                        >
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4 col-6">
                                <label
                                    for="payment_price"
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Payment Price" }}</label
                                >
                                <div
                                    class="input-group input-group-sm bg-light"
                                >
                                    <label
                                        for="payment_price"
                                        class="text-secondary my-auto mx-1"
                                        >{{ "Rp" }}</label
                                    >
                                    <input
                                        type="number"
                                        v-model="form_transaction.payment_price"
                                        id="payment_price"
                                        class="form-control form-control-sm py-0 rounded-2 rounded-end-0"
                                        placeholder="ex: 2000"
                                    />
                                    <div class="btn-group">
                                        <button
                                            type="button"
                                            class="btn btn-outline-secondary border-0 px-2 dropdown-toggle rounded-start-0"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        ></button>
                                        <ul
                                            class="dropdown-menu dropdown-menu-end"
                                        >
                                            <li
                                                class="dropdown-item"
                                                @click="
                                                    () => {
                                                        form_transaction.payment_price =
                                                            form_transaction.transaction;
                                                    }
                                                "
                                            >
                                                {{
                                                    formatIDR(
                                                        form_transaction.transaction
                                                    )
                                                }}
                                            </li>
                                            <li
                                                class="dropdown-item"
                                                v-for="cash in [
                                                    5000, 10000, 20000, 50000,
                                                    100000,
                                                ]"
                                                @click="
                                                    () => {
                                                        form_transaction.payment_price =
                                                            cash;
                                                    }
                                                "
                                            >
                                                {{ formatIDR(cash) }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-6">
                                <label
                                    for="payment_price"
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Payment Change" }}</label
                                >
                                <div class="scroll-x-hidden w-100">
                                    <span
                                        class="d-block text-secondary text-nowrap"
                                        >{{
                                            formatIDR(
                                                form_transaction.payment_price -
                                                    form_transaction.transaction
                                            )
                                        }}</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-3 bg-primary bg-opacity-10">
                            <button
                                @click="handleSubmitTransaction"
                                class="btn btn-outline-primary w-50 border-0 rounded-0"
                            >
                                {{ "Submit" }}
                            </button>
                            <button
                                class="btn btn-sm btn-outline-primary w-50 rounded-0 border-0"
                                @click="
                                    () => {
                                        if (is_cashier) {
                                            form_print_receipt.date = format(
                                                new Date(),
                                                'EE, dd/MM/yy-HH:ii'
                                            );
                                            form_print_receipt.customer =
                                                form_transaction?.customer;
                                            form_print_receipt.customer_id =
                                                form_transaction?.customer_id;
                                            form_print_receipt.order_list =
                                                form_transaction?.order;
                                            form_print_receipt.subtotal =
                                                form_transaction?.transaction +
                                                form_transaction?.discount;
                                            form_print_receipt.discount =
                                                form_transaction?.discount;
                                            form_print_receipt.transaction =
                                                form_transaction?.transaction;
                                            form_print_receipt.payment_method_id =
                                                form_transaction?.payment_method_id;
                                            form_print_receipt.payment_price =
                                                form_transaction?.payment_price;
                                            form_print_receipt.payment_change =
                                                form_transaction?.payment_price -
                                                form_transaction?.transaction;
                                            showPrintReceiptModal(true);
                                        } else {
                                            alertNotification(
                                                'You are not listed as Cashier in Stand ' +
                                                    stand.name +
                                                    '. Only cashier can add transaction.'
                                            );
                                        }
                                    }
                                "
                            >
                                <i class="bi bi-receipt-cutoff me-2"></i>
                                {{ "Receipt" }}
                            </button>
                        </div>
                    </div>
                    <div class="card p-3 my-4" v-if="active_tab == 2">
                        <div class="d-flex pb-2 border-bottom border-primary">
                            <span class="text-primary-emphasis h6 mb-0">
                                <i class="bi bi-info-circle-fill me-1"></i>
                                {{ "Order Detail" }}
                            </span>
                        </div>
                        <div class="row g-3 mt-0">
                            <div class="col-lg-4 col-6">
                                <span
                                    class="text-secondary d-block"
                                    style="font-size: 0.8rem"
                                >
                                    <i class="bi bi-person-fill me-1"></i>
                                    {{ "Customer" }}
                                </span>
                                <div>
                                    <span class="">{{
                                        selected_order?.customer?.name ??
                                        "Unselected"
                                    }}</span>
                                    <a
                                        target="_blank"
                                        :href="
                                            'https://wa.me/62' +
                                            (selected_order?.customer?.phone.startsWith(
                                                '0'
                                            )
                                                ? selected_order?.customer?.phone.slice(
                                                      1
                                                  )
                                                : selected_order?.customer
                                                      ?.phone)
                                        "
                                    >
                                        <i
                                            class="bi bi-chat-dots card-bg-hover text-primary px-2"
                                        ></i>
                                    </a>
                                </div>
                            </div>
                            <div class="col-lg-4 col-6">
                                <span
                                    class="text-secondary d-block"
                                    style="font-size: 0.8rem"
                                >
                                    <i class="bi bi-calendar2-check me-1"></i>
                                    {{ "Order Date" }}
                                </span>
                                <div>
                                    <span class="">{{
                                        formatDate(
                                            selected_order?.created_at ??
                                                new Date()
                                        )
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-lg-4 col-6">
                                <span
                                    class="text-secondary d-block"
                                    style="font-size: 0.8rem"
                                >
                                    <i class="bi bi-calendar2-check me-1"></i>
                                    {{ "Send Option" }}
                                </span>
                                <div>
                                    <span class="">{{
                                        selected_order?.send_option ==
                                        "delivery"
                                            ? "Delivery"
                                            : "Pick Up"
                                    }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-3">
                            <span
                                class="text-secondary"
                                style="font-size: 0.8rem"
                            >
                                <i class="fa-solid fa-utensils me-1"></i>
                                {{ "Menu List" }}
                            </span>
                        </div>
                        <div class="scroll-container scroll-container-lg pe-1">
                            <li class="list-group list-group-flush">
                                <ul
                                    class="list-group-item list-group-item-action mb-0 py-1"
                                    v-for="item in selected_order?.order"
                                >
                                    <span
                                        class="text-secondary d-inline-block"
                                        style="width: 2.7rem"
                                        >{{ "( " + item?.amount + " )" }}</span
                                    >
                                    <span class="ms-0">{{
                                        item?.menu?.name
                                    }}</span>
                                    <span
                                        class="float-end text-primary-emphasis"
                                        >{{ formatIDR(item.menu.price) }}</span
                                    >
                                </ul>
                            </li>
                        </div>
                        <div class="row g-3 mt-0">
                            <div class="col-lg-4 col-6">
                                <span
                                    class="text-secondary d-block"
                                    style="font-size: 0.8rem"
                                >
                                    {{ "Subtotal" }}
                                </span>
                                <div>
                                    <span class="">{{
                                        formatIDR(
                                            (selected_order?.transaction ?? 0) +
                                                (selected_order?.discount ?? 0)
                                        )
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-lg-4 col-6">
                                <span
                                    class="text-secondary d-block"
                                    style="font-size: 0.8rem"
                                >
                                    {{ "Discount" }}
                                </span>
                                <div>
                                    <span class="me-2">{{
                                        formatIDR(selected_order?.discount ?? 0)
                                    }}</span>
                                    <span
                                        v-if="selected_order?.voucher_id > 0"
                                        class="text-success bg-success bg-opacity-10 px-2 text-nowrap"
                                    >
                                        <i class="fa-solid fa-ticket me-1"></i
                                        >{{
                                            selected_order?.voucher?.code ?? 0
                                        }}</span
                                    >
                                </div>
                            </div>
                            <div class="col-lg-4 col-6">
                                <span
                                    class="text-secondary d-block"
                                    style="font-size: 0.8rem"
                                >
                                    {{ "Total Transaction" }}
                                </span>
                                <div>
                                    <span class="text-primary">{{
                                        formatIDR(
                                            selected_order?.transaction ?? 0
                                        )
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-lg-4 col-6">
                                <span
                                    class="text-secondary d-block"
                                    style="font-size: 0.8rem"
                                >
                                    {{ "Payment Method" }}
                                </span>
                                <div class="d-flex">
                                    <span class="">{{
                                        payment_method_list.find(
                                            (item) =>
                                                item.id ==
                                                selected_order?.payment_method_id
                                        )?.name ?? "Unset"
                                    }}</span>
                                    <button
                                        v-if="
                                            selected_order?.payment_method_id ==
                                            2
                                        "
                                        class="btn btn-sm btn-light py-0 ms-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#danaReceiptModal"
                                    >
                                        <i class="bi bi-image"></i>
                                        <i
                                            v-if="
                                                selected_order?.dana_receipt_validate ==
                                                false
                                            "
                                            class="bi bi-exclamation text-danger ms-2"
                                        ></i>
                                        <i
                                            v-if="
                                                selected_order?.dana_receipt_validate ==
                                                true
                                            "
                                            class="bi bi-check2 ms-2 text-success"
                                        ></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-lg-4 col-6">
                                <span
                                    class="text-secondary d-block"
                                    style="font-size: 0.8rem"
                                >
                                    {{ "Payment Price" }}
                                </span>
                                <div>
                                    <span class="">{{
                                        formatIDR(
                                            selected_order?.payment_price ?? 0
                                        )
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-lg-4 col-6">
                                <span
                                    class="text-secondary d-block"
                                    style="font-size: 0.8rem"
                                >
                                    {{ "Payment Change" }}
                                </span>
                                <div>
                                    <span class="">{{
                                        formatIDR(
                                            (selected_order?.payment_price ??
                                                0) -
                                                (selected_order?.transaction ??
                                                    0)
                                        )
                                    }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-3 bg-primary bg-opacity-10">
                            <div
                                class="w-50 p-0 m-0"
                                @click="
                                    () => {
                                        if (!printedReceipt?.print) {
                                            alertNotification(
                                                'Please print the receipt first before submit the transaction. After transaction submit, you can not print the receipt in this page and must go to Stand ' +
                                                    stand?.name +
                                                    ' page.'
                                            );
                                        }
                                    }
                                "
                            >
                                <button
                                    :disabled="!printedReceipt?.print"
                                    class="btn btn-sm btn-outline-primary w-100 rounded-0 border-0"
                                    @click.prevent="
                                        () => {
                                            if (is_cashier) {
                                                handleFinishTransaction(
                                                    selected_order?.id
                                                );
                                                selected_order = null;
                                            } else {
                                                alertNotification(
                                                    'You are not listed as Cashier in Stand ' +
                                                        stand.name +
                                                        '. Only cashier can add transaction.'
                                                );
                                            }
                                        }
                                    "
                                >
                                    {{ "Submit" }}
                                </button>
                            </div>
                            <div
                                class="w-50 p-0 m-0"
                                @click="
                                    () => {
                                        if (!selected_order?.id) {
                                            toastNotifRef.showToast(
                                                'warning',
                                                'Please select order to print the receipt.'
                                            );
                                        }
                                    }
                                "
                            >
                                <button
                                    :disabled="!selected_order?.id"
                                    class="btn btn-sm btn-outline-primary w-100 rounded-0 border-0"
                                    @click.prevent="
                                        () => {
                                            if (is_cashier) {
                                                form_print_receipt.date =
                                                    format(
                                                        new Date(
                                                            selected_order?.created_at
                                                        ),
                                                        'EE, dd/MM/yy-HH:ii'
                                                    );
                                                form_print_receipt.customer =
                                                    selected_order?.customer.name;
                                                form_print_receipt.customer_id =
                                                    selected_order?.customer_id;
                                                form_print_receipt.order_list =
                                                    selected_order?.order;
                                                form_print_receipt.subtotal =
                                                    selected_order?.transaction +
                                                    selected_order?.discount;
                                                form_print_receipt.discount =
                                                    selected_order?.discount;
                                                form_print_receipt.transaction =
                                                    selected_order?.transaction;
                                                form_print_receipt.payment_method_id =
                                                    selected_order?.payment_method_id;
                                                form_print_receipt.payment_price =
                                                    selected_order?.payment_price;
                                                form_print_receipt.payment_change =
                                                    selected_order?.payment_price -
                                                    selected_order?.transaction;
                                                showPrintReceiptModal(true);
                                            } else {
                                                alertNotification(
                                                    'You are not listed as Cashier in Stand ' +
                                                        stand.name +
                                                        '. Only cashier can add transaction.'
                                                );
                                            }
                                        }
                                    "
                                >
                                    <i
                                        :class="
                                            'bi me-2 bi-' +
                                            (printedReceipt?.id ==
                                                selected_order?.id &&
                                            printedReceipt?.print
                                                ? 'check2-square'
                                                : 'square')
                                        "
                                    ></i>
                                    {{ "Receipt" }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StaffLayout>

    <!-- Modals -->
    <!-- Print Receipt Modal -->
    <div
        v-if="is_cashier"
        class="modal fade"
        id="printReceiptModal"
        tabindex="-1"
        aria-labelledby="printReceiptModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-auto">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i class="bi bi-receipt-cutoff pe-2"></i>
                        {{ "Receipt" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showPrintReceiptModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="modal-body p-0">
                    <!-- Receipt Container -->
                    <div
                        class="bg-white watermark-background"
                        ref="receiptContentRef"
                        style="
                            background: url('/storage/local/images/shop/brand/logo_watermark.png');
                            background-repeat: repeat;
                            background-size: 25mm;
                        "
                    >
                        <!-- Header -->
                        <div class="p-3" style="background-color: #412f55">
                            <div class="d-flex">
                                <div class="mx-auto">
                                    <img
                                        :src="'/storage/local/images/shop/brand/blaterian_logo.png'"
                                        alt="image"
                                        class=""
                                        style="height: 15mm"
                                    />
                                    <img
                                        :src="'/storage/local/images/shop/brand/blaterian_text.png'"
                                        alt="image"
                                        class=""
                                        style="height: 15mm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="p-3">
                            <!-- Stand Detail -->
                            <div class="row g-3">
                                <div class="col-6">
                                    <span
                                        class="d-block text-secondary"
                                        style="font-size: 0.8rem"
                                        >{{ "Date-Time" }}
                                    </span>
                                    <div class="d-flex scroll-x-hidden">
                                        <span class="text-nowrap">{{
                                            form_print_receipt?.date
                                        }}</span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <span
                                        class="d-block text-secondary"
                                        style="font-size: 0.8rem"
                                        >{{ "Place" }}
                                    </span>
                                    <div class="d-flex scroll-x-hidden">
                                        <span class="text-nowrap">{{
                                            stand.place
                                        }}</span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <span
                                        class="d-block text-secondary"
                                        style="font-size: 0.8rem"
                                        >{{ "Customer" }}
                                    </span>
                                    <div class="d-flex scroll-x-hidden">
                                        <span class="text-nowrap">{{
                                            form_print_receipt?.customer
                                        }}</span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <span
                                        class="d-block text-secondary"
                                        style="font-size: 0.8rem"
                                        >{{ "Cashier" }}
                                    </span>
                                    <div class="d-flex scroll-x-hidden">
                                        <span class="text-nowrap">{{
                                            auth_user.name
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="border-1 border-secondary-subtle mt-3"
                                style="border-style: dashed"
                            ></div>
                            <!-- Order Detail  -->
                            <div class="mt-2">
                                <span
                                    class="d-block h6 text-primary-emphasis"
                                    >{{ "Order Items" }}</span
                                >
                                <div
                                    class="mt-2"
                                    v-for="item in form_print_receipt?.order_list"
                                >
                                    <div class="d-flex">
                                        <span class="me-2">{{
                                            "(" + item.amount + ")"
                                        }}</span>
                                        <span class="fw-bold me-2">{{
                                            item?.menu
                                                ? item?.menu?.name
                                                : item.name
                                        }}</span>
                                    </div>
                                    <div class="d-flex">
                                        <span class="me-auto text-secondary">
                                            {{
                                                formatIDR(
                                                    item?.menu
                                                        ? item?.menu?.price
                                                        : item.price
                                                )
                                            }}
                                        </span>
                                        <span class="ms-2">{{
                                            formatIDR(
                                                item?.menu
                                                    ? item?.menu?.price *
                                                          item?.amount
                                                    : item.total
                                            )
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="border-1 border-secondary-subtle mt-3"
                                style="border-style: dashed"
                            ></div>
                            <!-- Total -->
                            <div class="mt-2">
                                <span
                                    class="d-block h6 text-primary-emphasis"
                                    >{{ "Total" }}</span
                                >
                                <div class="d-flex">
                                    <div class="">
                                        <span
                                            class="d-block text-secondary"
                                            style="font-size: 0.8rem"
                                            >{{ "Subtotal" }}
                                        </span>
                                        <div class="d-flex scroll-x-hidden">
                                            <span class="text-nowrap">{{
                                                formatIDR(
                                                    form_print_receipt?.subtotal ??
                                                        0
                                                )
                                            }}</span>
                                        </div>
                                    </div>
                                    <div class="mx-auto">
                                        <span
                                            class="d-block text-secondary"
                                            style="font-size: 0.8rem"
                                            >{{ "Discount" }}
                                        </span>
                                        <div class="d-flex scroll-x-hidden">
                                            <span class="text-nowrap">{{
                                                formatIDR(
                                                    form_print_receipt.discount
                                                )
                                            }}</span>
                                        </div>
                                    </div>
                                    <div class="">
                                        <span
                                            class="d-block text-secondary"
                                            style="font-size: 0.8rem"
                                            >{{ "Total" }}
                                        </span>
                                        <div class="d-flex scroll-x-hidden">
                                            <span class="text-nowrap fw-bold">{{
                                                formatIDR(
                                                    form_print_receipt.transaction
                                                )
                                            }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="border-1 border-secondary-subtle mt-3"
                                style="border-style: dashed"
                            ></div>
                            <!-- Payment -->
                            <div class="mt-2">
                                <span
                                    class="d-block h6 text-primary-emphasis"
                                    >{{ "Payment" }}</span
                                >
                                <div class="d-flex">
                                    <div class="">
                                        <span
                                            class="d-block text-secondary"
                                            style="font-size: 0.8rem"
                                            >{{ "Method" }}
                                        </span>
                                        <div class="d-flex scroll-x-hidden">
                                            <span class="text-nowrap">{{
                                                payment_method_list.find(
                                                    (item) =>
                                                        item.id ==
                                                        form_print_receipt?.payment_method_id
                                                )?.name
                                            }}</span>
                                        </div>
                                    </div>
                                    <div class="mx-auto">
                                        <span
                                            class="d-block text-secondary"
                                            style="font-size: 0.8rem"
                                            >{{ "Price" }}
                                        </span>
                                        <div class="d-flex scroll-x-hidden">
                                            <span class="text-nowrap">{{
                                                formatIDR(
                                                    form_print_receipt?.payment_price
                                                )
                                            }}</span>
                                        </div>
                                    </div>
                                    <div class="">
                                        <span
                                            class="d-block text-secondary"
                                            style="font-size: 0.8rem"
                                            >{{ "Change" }}
                                        </span>
                                        <div class="d-flex scroll-x-hidden">
                                            <span class="text-nowrap">{{
                                                formatIDR(
                                                    form_print_receipt?.payment_price -
                                                        form_print_receipt?.transaction
                                                )
                                            }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Footer -->
                        <div
                            style="
                                background-color: #412f55;
                                border-top-style: dashed;
                                border-top-color: #efc55c;
                                border-top-width: 0.1rem;
                            "
                        >
                            <div class="d-flex">
                                <span
                                    class="mx-auto my-2"
                                    style="font-size: 0.8rem; color: #efc55c"
                                >
                                    <i class="bi bi-instagram me-2"></i>
                                    {{ "blaterian.id" }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer p-1">
                    <div class="d-flex bg-white">
                        <div class="d-flex me-3">
                            <input
                                type="checkbox"
                                v-model="receiptIsDownload"
                            />
                            <div class="d-flex w-100">
                                <span class="ms-2" style="font-size: 0.8rem"
                                    >{{ "Download Receipt" }}
                                </span>
                                <i
                                    class="bi bi-download ms-2 text-primary"
                                    style="font-size: 0.8rem"
                                ></i>
                            </div>
                        </div>
                        <div class="d-flex">
                            <input
                                type="checkbox"
                                v-model="receiptIsSendWhatsapp"
                            />
                            <div class="d-flex w-100">
                                <span class="ms-2" style="font-size: 0.8rem"
                                    >{{ "Send Whatsapp" }}
                                </span>
                                <i
                                    class="bi bi-whatsapp ms-2 text-success"
                                    style="font-size: 0.8rem"
                                ></i>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        class="btn btn-sm btn-primary w-100"
                        @click="
                            () => {
                                printedReceipt.id = selected_order?.id;
                                printedReceipt.print = true;
                                // printReceipt();
                            }
                        "
                    >
                        <i class="bi bi-printer me-2"></i> {{ "Print Receipt" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- New Customer -->
    <div
        v-if="is_cashier"
        class="modal fade"
        id="newCustomerModal"
        tabindex="-1"
        aria-labelledby="newCustomerModal"
    >
        <div class="modal-dialog modal-sm modal-dialog-centered">
            <div class="modal-content shadow">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i class="bi bi-person-plus pe-2"></i>
                        {{ "New Customer" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showNewCustomerModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="modal-body bg-white">
                    <span
                        class="text-secondary d-block"
                        style="font-size: 0.8rem"
                    >
                        {{ "Name" }}
                    </span>
                    <input
                        type="text"
                        v-model="form_new_customer.name"
                        class="form-control form-control-sm"
                        placeholder="ex: Timothy"
                    />
                    <InputError
                        :message="form_new_customer.errors.name"
                        class="mt-2"
                    />
                    <span
                        class="text-secondary d-block mt-3"
                        style="font-size: 0.8rem"
                    >
                        {{ "Phone" }}
                    </span>
                    <input
                        type="tel"
                        v-model="form_new_customer.phone"
                        class="form-control form-control-sm"
                        placeholder="08xxxxxxx"
                    />
                    <InputError
                        :message="form_new_customer.errors.phone"
                        class="mt-2"
                    />
                </div>
                <div class="modal-footer py-1 px-2">
                    <button
                        class="btn btn-sm btn-primary w-100"
                        @click="handleSubmitNewCustomer"
                    >
                        {{ "Add Customer" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Dana Receipt Modal -->
    <div
        v-if="is_cashier"
        class="modal fade"
        id="danaReceiptModal"
        tabindex="-1"
        aria-labelledby="danaReceiptModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <svg
                            class="icon icon-dana d-inline rounded-circle border-primary border"
                            style="
                                width: 1.5rem;
                                height: 1.5rem;
                                padding: 0.1rem;
                            "
                        >
                            <use href="/icons.svg#dana"></use>
                        </svg>
                        {{ "Dana Transfer Receipt" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        data-bs-dismiss="modal"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="modal-body bg-secondary bg-opacity-50">
                    <div class="d-flex bg-white p-2 rounded shadow-sm">
                        <img
                            :src="
                                '/storage/images/receipt/stand/income/' +
                                selected_order?.receipt_income
                            "
                            alt="image"
                            style="width: 100%; max-height: 80vh"
                        />
                    </div>
                    <div class="d-flex bg-white p-2 rounded shadow-sm mt-3">
                        <span class="text-secondary">{{ "Customer" }}</span>
                        <span class="text-primary ms-auto">{{
                            selected_order?.customer?.name
                        }}</span>
                    </div>
                    <div class="d-flex bg-white p-2 rounded shadow-sm mt-3">
                        <span class="text-secondary">{{
                            "Payment Price"
                        }}</span>
                        <span class="text-primary ms-auto">{{
                            formatIDR(selected_order?.payment_price)
                        }}</span>
                    </div>
                </div>
                <div class="modal-footer py-1 px-2">
                    <button
                        :class="
                            'btn btn-sm w-100 border-0 btn-outline-primary ' +
                            (selected_order?.dana_receipt_validate
                                ? 'active'
                                : '')
                        "
                        data-bs-dismiss="modal"
                        @click="
                            () => {
                                selected_order.dana_receipt_validate =
                                    !selected_order?.dana_receipt_validate;
                                if (selected_order?.dana_receipt_validate) {
                                    toastNotifRef.showToast(
                                        'info',
                                        'Order from ' +
                                            selected_order?.customer?.name +
                                            ' with Payment Price ' +
                                            formatIDR(
                                                selected_order?.transaction
                                            ) +
                                            ' is Validated.'
                                    );
                                    toastNotifRef.showToast(
                                        'info',
                                        'Please continue with the Payment Validation form. '
                                    );
                                } else {
                                    toastNotifRef.showToast(
                                        'warning',
                                        'Order from ' +
                                            selected_order?.customer?.name +
                                            ' with Payment Price ' +
                                            formatIDR(
                                                selected_order?.transaction
                                            ) +
                                            ' is Unvalidated.'
                                    );
                                    toastNotifRef.showToast(
                                        'info',
                                        'You can chat the customer if there is any mistake.'
                                    );
                                }
                            }
                        "
                    >
                        <i
                            :class="
                                'bi me-2 bi-' +
                                (selected_order?.dana_receipt_validate
                                    ? 'check-square '
                                    : 'square ')
                            "
                        ></i>
                        {{ "Validate" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Notif Toast -->
    <Notif ref="toastNotifRef" />
</template>
