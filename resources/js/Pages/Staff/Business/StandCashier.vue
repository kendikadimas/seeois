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
// no Ziggy; use explicit endpoints

const props = defineProps({
    stand: Object,
    menu_list: Object,
    customer_list: Array,
    order_list: Array,
    today_sales: Array,
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
const modalCashierHelp = ref(null);
const customerSelect = ref(null);
const toastNotifRef = ref(null);
const receiptContentRef = ref(null);
const receiptPrintedImageUrl = ref(null);
const currentSearch = ref("");
const selectedTodaySale = ref(null); // track which today-sale opened the receipt modal

// Watch for new customer data from server to auto-select
watch(() => props.data, (newData) => {
    if (newData && newData.new_customer_id) {
        form_transaction.customer_id = newData.new_customer_id;
        // Also update the customer name in the form
        const newCustomer = props.customer_list.find(c => c.id == newData.new_customer_id);
        if (newCustomer) {
            form_transaction.customer = newCustomer.name;
        }
        toastNotifRef.value.showToast("info", "New customer auto-selected");
    }
}, { deep: true });
const receiptIsDownload = { value: false };
const receiptIsSendWhatsapp = { value: false };
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

function handleSubmitSale() {
    form_transaction.post(`/seeo/staff/food/stand/sales/add/${props.stand.id}`, {
        onError: (errors) => {
            for (const key in errors) {
                toastNotifRef.value.showToast("warning", errors[key]);
            }
        },
    });
}

function debugOpenStandDetail() {
    console.debug('[StandCashier] opening detail', {
        standId: props.stand.id,
        standName: props.stand.name,
        href: `/seeo/staff/blaterian/foods/stand_detail/${props.stand.id}`,
    });
}

function handleSubmitNewCustomer() {
    form_new_customer.post(`/seeo/staff/food/stand/sales/customer/add/${props.stand.id}`, {
        onSuccess: () => {
            showNewCustomerModal(false);
            form_new_customer.reset();
        },
        onError: (errors) => {
            for (const key in errors) {
                toastNotifRef.value.showToast("warning", errors[key]);
            }
        }
    });
}

function handleFinishTransaction(id) {
    const form = useForm({
        transaction_id: id,
    });
    form.post('/seeo/staff/shop/transaction/finish', {
        preserveScroll: true,
        preserveState: true
    });
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
        selectedTodaySale.value = null; // reset when closing
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

function showCashierHelpModal(is_show) {
    if (modalCashierHelp.value == null) {
        const modal = document.getElementById("cashierHelpModal");
        modalCashierHelp.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalCashierHelp.value.show();
    } else {
        modalCashierHelp.value.hide();
    }
}

/**
 * Open the receipt modal pre-filled from a completed today_sales entry.
 * Reuses the existing printReceiptModal and form_print_receipt.
 */
function openTodayReceiptModal(sale) {
    selectedTodaySale.value = sale;
    form_print_receipt.value.date = format(new Date(sale.created_at), "EE, dd/MM/yy HH:mm");
    form_print_receipt.value.customer = sale.customer?.name ?? sale.customer ?? "â€”";
    form_print_receipt.value.customer_id = sale.customer_id;
    form_print_receipt.value.order_list = sale.order; // items have .menu.name / .menu.price / .amount
    form_print_receipt.value.subtotal = (sale.transaction ?? 0) + (sale.discount ?? 0);
    form_print_receipt.value.discount = sale.discount ?? 0;
    form_print_receipt.value.transaction = sale.transaction ?? 0;
    form_print_receipt.value.payment_method_id = sale.payment_method_id;
    form_print_receipt.value.payment_price = sale.payment_price ?? 0;
    form_print_receipt.value.payment_change = (sale.payment_price ?? 0) - (sale.transaction ?? 0);
    showPrintReceiptModal(true);
}

function openNewCustomerModal() {
    if (auth_user.roles_id != 99 && !props.stand.cashier.some(c => c.id === auth_user.id)) {
        alertNotification(
            'You are not listed as Cashier in Stand ' +
                props.stand.name +
                '. Only cashier can add customer.'
        );
    } else {
        // Pre-fill phone from v-select search if user typed a number there
        const searchVal = currentSearch.value?.trim() ?? "";
        form_new_customer.phone = searchVal !== "" ? searchVal : "";

        // Pre-fill name from the customer name input if already typed
        const nameVal = form_transaction.customer?.trim() ?? "";
        form_new_customer.name = nameVal !== "" ? nameVal : "";

        showNewCustomerModal(true);
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
    try {
        const element = receiptContentRef.value;
        if (!element) {
            toastNotifRef.value.showToast("warning", "Receipt element not found. Try again.");
            return;
        }

        toastNotifRef.value.showToast("info", "Generating receipt...");

        // Clone outside modal to bypass Bootstrap overflow/transform issues.
        // Use left: -9999px (off-screen) instead of opacity:0 â€” html2canvas
        // cannot capture invisible elements.
        const clone = element.cloneNode(true);
        clone.style.position = "absolute";
        clone.style.top = "0";
        clone.style.left = "-9999px";
        clone.style.width = "360px";
        clone.style.height = "640px";
        clone.style.zIndex = "1";
        clone.style.pointerEvents = "none";
        document.body.appendChild(clone);

        await new Promise(resolve => setTimeout(resolve, 200));

        const canvas = await html2canvas(clone, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            logging: false,
            width: 360,
            height: 640,
        });

        document.body.removeChild(clone);

        const dataUrl = canvas.toDataURL("image/png", 0.9);
        receiptPrintedImageUrl.value = dataUrl;

        // Download
        if (receiptIsDownload.value) {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "receipt_" + props.stand.id + "_" + format(new Date(), "ddMMyyHHmm") + ".png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toastNotifRef.value.showToast("info", "Receipt downloaded.");
        }

        // Send to WhatsApp
        if (receiptIsSendWhatsapp.value) {
            if (!form_print_receipt.value.customer_id) {
                toastNotifRef.value.showToast("warning", "No customer selected. Cannot send WhatsApp.");
                return;
            }
            let customer_phone = props.customer_list.find(
                (item) => item.id == form_print_receipt.value.customer_id
            )?.phone;
            if (!customer_phone && selectedTodaySale.value) {
                customer_phone = selectedTodaySale.value.customer?.phone;
            }
            if (!customer_phone) {
                toastNotifRef.value.showToast("warning", "Customer phone number not found.");
                return;
            }
            const normalized = customer_phone.startsWith("0") ? customer_phone.slice(1) : customer_phone;
            const phone = "62" + normalized;
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
    } catch (err) {
        console.error("[printReceipt] error:", err);
        toastNotifRef.value.showToast("warning", "Failed to generate receipt: " + err.message);
    }
};

function onSearchCustomer(search) {
    currentSearch.value = search;
    if (search && search.trim() !== "") {
        form_new_customer.phone = search;
    }
}

const onInputCustomer = () => {
    if (form_transaction.customer) {
        form_new_customer.name = form_transaction.customer;
    }
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
                href="/blaterian/foods/stand"
                class="bg-opacity-0 text-decoration-none text-primary-emphasis"
            >
                <span class="fw-light">{{ "Stand" }}</span>
            </a>
            <span class="mx-2">{{ "/" }}</span>
            <a
                :href="`/seeo/staff/blaterian/foods/stand_detail/${stand.id}`"
                @click="debugOpenStandDetail()"
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
                        <div class="d-flex ">
                            <span class="h5 text-primary-emphasis me-auto"
                                ><i class="bi bi-shop me-2"></i
                                >{{ "Stand " + stand.name }}</span
                            >
                            <button
                                class="btn btn-sm btn-outline-info border-0 py-0 mb-auto"
                                @click="showCashierHelpModal(true)"
                                title="Panduan Kasir"
                            >
                                <i class="bi bi-question-circle"></i>
                            </button>
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
                                    'btn btn-sm btn-outline-primary border-0 w-33 ' +
                                    (active_tab == 1 ? 'active' : '')
                                "
                                style="width:33.33%"
                                @click="active_tab = 1"
                            >
                                <i class="fa-solid fa-cash-register me-2"></i>
                                {{ "Cashier" }}
                            </button>
                            <!--
                            SELF-ORDER TAB BUTTON (MOBILE) â€” ARCHIVED
                            <button
                                :class="
                                    'btn btn-sm btn-outline-primary border-0 ' +
                                    (active_tab == 2 ? 'active' : '')
                                "
                                style="width:33.33%"
                                @click="active_tab = 2"
                            >
                                <i class="fa-solid fa-user-group me-2"></i>
                                {{ "Self-Order" }}
                            </button>
                            -->
                            <button
                                :class="
                                    'btn btn-sm btn-outline-primary border-0 ' +
                                    (active_tab == 3 ? 'active' : '')
                                "
                                style="width:33.33%"
                                @click="active_tab = 3"
                            >
                                <i class="bi bi-receipt me-2"></i>
                                {{ "Today" }}
                                <span v-if="today_sales?.length > 0" class="badge bg-primary ms-1" style="font-size:0.65rem">{{ today_sales.length }}</span>
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
                    <!-- SELF-ORDER ORDER LIST CARD (LEFT COLUMN) â€” ARCHIVED
                    <div class="card p-3 bg-white mt-4" v-if="active_tab == 2">
                        <div
                            class="d-flex  border-1 pb-2"
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
                                                `/shop/transaction/cancel/${item.id}`,
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
                    END ARCHIVED -->
                </div>
                <div class="col-12 col-lg-7">
                    <div class="card mb-4 bg-white p-1 d-lg-block d-none">
                        <div class="d-flex">
                            <button
                                :class="
                                    'btn btn-sm btn-outline-primary border-0 ' +
                                    (active_tab == 1 ? 'active' : '')
                                "
                                style="width:33.33%"
                                @click="active_tab = 1"
                            >
                                <i class="fa-solid fa-cash-register me-2"></i>
                                {{ "Cashier" }}
                            </button>
                            <!--
                            SELF-ORDER TAB BUTTON (DESKTOP) â€” ARCHIVED
                            <button
                                :class="
                                    'btn btn-sm btn-outline-primary border-0 ' +
                                    (active_tab == 2 ? 'active' : '')
                                "
                                style="width:33.33%"
                                @click="active_tab = 2"
                            >
                                <i class="fa-solid fa-user-group me-2"></i>
                                {{ "Self-Order" }}
                            </button>
                            -->
                            <button
                                :class="
                                    'btn btn-sm btn-outline-primary border-0 ' +
                                    (active_tab == 3 ? 'active' : '')
                                "
                                style="width:33.33%"
                                @click="active_tab = 3"
                            >
                                <i class="bi bi-receipt me-2"></i>
                                {{ "Today's Transactions" }}
                                <span v-if="today_sales?.length > 0" class="badge bg-primary ms-1" style="font-size:0.65rem">{{ today_sales.length }}</span>
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
                                        ref="customerSelect"
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
                                        @click="openNewCustomerModal"
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
                                @click="handleSubmitSale"
                                class="btn btn-outline-primary w-50 border-0 rounded-0"
                            >
                                {{ "Submit" }}
                            </button>
                            <button
                                class="btn btn-sm btn-outline-primary w-50 rounded-0 border-0"
                                @click="
                                    () => {
                                        if (auth_user.roles_id != 99 && !stand.cashier.some(c => c.cashier_id === auth_user.id)) {
                                            alertNotification(
                                                'You are not listed as Cashier in Stand ' +
                                                    stand.name +
                                                    '. Only cashier can add transaction.'
                                            );
                                        } else {
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
                                        }
                                    }
                                "
                            >
                                <i class="bi bi-receipt-cutoff me-2"></i>
                                {{ "Receipt" }}
                            </button>
                        </div>
                    </div>
                    <!-- SELF-ORDER ORDER DETAIL CARD (RIGHT COLUMN) â€” ARCHIVED
                    <div class="card p-3 my-4" v-if="active_tab == 2">
                        <div class="d-flex pb-2 ">
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
                    END ARCHIVED -->
                    <!-- Today's Transactions Tab -->
                    <div class="card p-3 my-4" v-if="active_tab == 3">
                        <div class="d-flex pb-2 ">
                            <span class="text-primary-emphasis h6 mb-0 me-auto">
                                <i class="bi bi-receipt me-2"></i>
                                {{ "Today's Transactions" }}
                            </span>
                            <span class="text-secondary my-auto" style="font-size:0.8rem">
                                {{ today_sales?.length ?? 0 }} transaksi
                            </span>
                        </div>
                        <!-- Summary row -->
                        <div class="row g-2 mt-1 mb-2">
                            <div class="col-6">
                                <span class="d-block text-secondary" style="font-size:0.8rem">Total Pemasukan</span>
                                <span class="d-block text-primary fw-bold">
                                    {{ formatIDR(today_sales?.reduce((sum, s) => sum + (s.transaction ?? 0), 0) ?? 0) }}
                                </span>
                            </div>
                            <div class="col-6">
                                <span class="d-block text-secondary" style="font-size:0.8rem">Total Transaksi</span>
                                <span class="d-block text-primary-emphasis fw-bold">
                                    {{ today_sales?.length ?? 0 }} order
                                </span>
                            </div>
                        </div>
                        <div class="scroll-container scroll-container-lg pe-1">
                            <div v-if="!today_sales || today_sales.length === 0" class="d-flex bg-light py-2">
                                <span class="text-secondary fst-italic mx-auto" style="font-size:0.8rem">Belum ada transaksi hari ini.</span>
                            </div>
                            <li class="list-group list-group-flush" v-else>
                                <ul
                                    class="list-group-item mb-0 px-0 py-2"
                                    v-for="sale in today_sales"
                                    :key="sale.id"
                                >
                                    <div class="d-flex align-items-start gap-2">
                                        <!-- Customer & time -->
                                        <div class="me-auto">
                                            <span class="d-block text-primary-emphasis fw-semibold">
                                                {{ sale.customer?.name ?? sale.customer ?? "â€”" }}
                                            </span>
                                            <span class="text-secondary d-block" style="font-size:0.75rem">
                                                <i class="bi bi-telephone me-1"></i>{{ sale.customer?.phone ?? "â€”" }}
                                            </span>
                                            <span class="text-secondary" style="font-size:0.75rem">
                                                <i class="bi bi-clock me-1"></i>{{ formatDate(sale.created_at) }}
                                            </span>
                                        </div>
                                        <!-- Amount & method -->
                                        <div class="text-end">
                                            <span class="d-block text-primary fw-bold">
                                                {{ formatIDR(sale.transaction ?? 0) }}
                                            </span>
                                            <span class="text-secondary d-block" style="font-size:0.75rem">
                                                {{ payment_method_list.find(p => p.id == sale.payment_method_id)?.name ?? "â€”" }}
                                            </span>
                                        </div>
                                        <!-- Receipt button -->
                                        <button
                                            class="btn btn-sm btn-outline-primary border-0 px-2 py-0 align-self-center"
                                            title="Lihat & Print Receipt"
                                            @click="openTodayReceiptModal(sale)"
                                        >
                                            <i class="bi bi-receipt-cutoff"></i>
                                        </button>
                                    </div>
                                    <!-- Order items -->
                                    <div class="mt-1 ps-1">
                                        <span
                                            class="badge bg-light text-secondary border me-1 mb-1"
                                            style="font-size:0.7rem"
                                            v-for="item in sale.order"
                                            :key="item.id"
                                        >
                                            {{ item.amount }}x {{ item.menu?.name ?? "?" }}
                                        </span>
                                    </div>
                                </ul>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StaffLayout>

    <!-- Modals -->
    <!-- Print Receipt Modal -->
    <div
        class="modal fade"
        id="printReceiptModal"
        tabindex="-1"
        aria-labelledby="printReceiptModal"
    >
        <div class="modal-dialog modal-dialog-centered" style="max-width: 380px;">
            <div class="modal-content shadow mx-auto" style="width: 380px;">
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
                    <!-- Receipt Container â€” fixed 9:16 ratio (360Ã—640px) -->
                    <div
                        ref="receiptContentRef"
                        style="
                            width: 360px;
                            height: 640px;
                            background-color: #ffffff;
                            background-image: url('/storage/local/images/shop/brand/logo_watermark.png');
                            background-repeat: repeat;
                            background-size: 60px;
                            display: flex;
                            flex-direction: column;
                            overflow: hidden;
                            margin: 0 auto;
                            font-family: 'Segoe UI', Arial, sans-serif;
                        "
                    >
                        <!-- â”€â”€ HEADER â”€â”€ -->
                        <div style="background-color:#412f55; padding:20px 16px 16px; flex-shrink:0; display:flex; justify-content:center; align-items:center; gap:10px;">
                            <img
                                :src="'/storage/local/images/shop/brand/blaterian_logo.png'"
                                alt="logo"
                                style="height:48px; object-fit:contain;"
                            />
                            <img
                                :src="'/storage/local/images/shop/brand/blaterian_text.png'"
                                alt="BLATERIAN"
                                style="height:36px; object-fit:contain;"
                            />
                        </div>

                        <!-- â”€â”€ BODY â”€â”€ -->
                        <div style="flex:1; padding:16px 20px; display:flex; flex-direction:column; gap:0; overflow:hidden;">

                            <!-- Transaction Info: 2-col grid -->
                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:4px 12px; margin-bottom:14px;">
                                <div>
                                    <div style="font-size:0.72rem; color:#888; margin-bottom:2px;">Date-Time</div>
                                    <div style="font-size:0.92rem; font-weight:600; color:#222;">{{ form_print_receipt?.date }}</div>
                                </div>
                                <div>
                                    <div style="font-size:0.72rem; color:#888; margin-bottom:2px;">Place</div>
                                    <div style="font-size:0.92rem; font-weight:600; color:#222;">{{ stand.place }}</div>
                                </div>
                                <div style="margin-top:8px;">
                                    <div style="font-size:0.72rem; color:#888; margin-bottom:2px;">Customer</div>
                                    <div style="font-size:0.92rem; font-weight:600; color:#222;">{{ form_print_receipt?.customer }}</div>
                                </div>
                                <div style="margin-top:8px;">
                                    <div style="font-size:0.72rem; color:#888; margin-bottom:2px;">Cashier</div>
                                    <div style="font-size:0.92rem; font-weight:600; color:#222;">{{ auth_user.name }}</div>
                                </div>
                            </div>

                            <!-- Divider -->
                            <div style="border-top:1.5px dashed #c8c8c8; margin-bottom:10px;"></div>

                            <!-- Order Items -->
                            <div style="margin-bottom:10px;">
                                <div style="font-size:1rem; font-weight:700; color:#412f55; margin-bottom:8px;">Order Items</div>
                                <div
                                    v-for="item in form_print_receipt?.order_list"
                                    style="margin-bottom:6px;"
                                >
                                    <div style="font-size:0.88rem;">
                                        <span style="color:#555;">({{ item.amount }})</span>
                                        <span style="font-weight:700; margin-left:6px;">{{ item?.menu ? item.menu.name : item.name }}</span>
                                    </div>
                                    <div style="display:flex; justify-content:space-between; font-size:0.82rem; color:#555; margin-top:1px;">
                                        <span>{{ formatIDR(item?.menu ? item.menu.price : item.price) }}</span>
                                        <span style="color:#222; font-weight:500;">{{ formatIDR(item?.menu ? item.menu.price * item.amount : item.total) }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Divider -->
                            <div style="border-top:1.5px dashed #c8c8c8; margin-bottom:10px;"></div>

                            <!-- Total â€” 3 columns -->
                            <div style="margin-bottom:10px;">
                                <div style="font-size:1rem; font-weight:700; color:#412f55; margin-bottom:8px;">Total</div>
                                <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:4px;">
                                    <div>
                                        <div style="font-size:0.72rem; color:#888; margin-bottom:2px;">Subtotal</div>
                                        <div style="font-size:0.88rem; color:#222;">{{ formatIDR(form_print_receipt?.subtotal ?? 0) }}</div>
                                    </div>
                                    <div>
                                        <div style="font-size:0.72rem; color:#888; margin-bottom:2px;">Discount</div>
                                        <div style="font-size:0.88rem; color:#222;">{{ formatIDR(form_print_receipt?.discount ?? 0) }}</div>
                                    </div>
                                    <div>
                                        <div style="font-size:0.72rem; color:#888; margin-bottom:2px;">Total</div>
                                        <div style="font-size:0.92rem; font-weight:700; color:#222;">{{ formatIDR(form_print_receipt?.transaction ?? 0) }}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Divider -->
                            <div style="border-top:1.5px dashed #c8c8c8; margin-bottom:10px;"></div>

                            <!-- Payment â€” 3 columns -->
                            <div>
                                <div style="font-size:1rem; font-weight:700; color:#412f55; margin-bottom:8px;">Payment</div>
                                <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:4px;">
                                    <div>
                                        <div style="font-size:0.72rem; color:#888; margin-bottom:2px;">Method</div>
                                        <div style="font-size:0.88rem; color:#222;">{{ payment_method_list.find(p => p.id == form_print_receipt?.payment_method_id)?.name ?? 'â€”' }}</div>
                                    </div>
                                    <div>
                                        <div style="font-size:0.72rem; color:#888; margin-bottom:2px;">Price</div>
                                        <div style="font-size:0.88rem; color:#222;">{{ formatIDR(form_print_receipt?.payment_price ?? 0) }}</div>
                                    </div>
                                    <div>
                                        <div style="font-size:0.72rem; color:#888; margin-bottom:2px;">Change</div>
                                        <div style="font-size:0.88rem; color:#222;">{{ formatIDR((form_print_receipt?.payment_price ?? 0) - (form_print_receipt?.transaction ?? 0)) }}</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <!-- â”€â”€ FOOTER â”€â”€ -->
                        <div style="background-color:#412f55; border-top:2px dashed #efc55c; padding:10px 16px; flex-shrink:0; display:flex; justify-content:center; align-items:center; gap:8px;">
                            <i class="bi bi-instagram" style="color:#efc55c; font-size:1rem;"></i>
                            <span style="color:#efc55c; font-size:0.85rem; font-weight:500;">blaterian.id</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer p-2 d-flex flex-column gap-2">
                    <div class="d-flex gap-2 w-100">
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-primary w-50 d-flex align-items-center justify-content-center gap-2"
                            @click="() => { receiptIsDownload.value = true; receiptIsSendWhatsapp.value = false; printReceipt(); }"
                        >
                            <i class="bi bi-download"></i>
                            {{ "Download" }}
                        </button>
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-success w-50 d-flex align-items-center justify-content-center gap-2"
                            @click="() => { receiptIsDownload.value = false; receiptIsSendWhatsapp.value = true; printReceipt(); }"
                        >
                            <i class="bi bi-whatsapp"></i>
                            {{ "Share WA" }}
                        </button>
                    </div>
                    <button
                        type="button"
                        class="btn btn-sm btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                        @click="() => { receiptIsDownload.value = true; receiptIsSendWhatsapp.value = true; printReceipt(); }"
                    >
                        <i class="bi bi-printer"></i>
                        {{ "Download & Share WA" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- New Customer -->
    <div
        v-if="is_cashier || auth_user.roles_id == 99"
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
                <form @submit.prevent="handleSubmitNewCustomer">
                    <div class="modal-body bg-white">
                        <p class="text-secondary mb-3" style="font-size: 0.8rem">
                            Tambahkan customer baru dengan nama dan nomor HP. Nomor HP akan digunakan untuk mencatat transaksi.
                        </p>
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
                            required
                            autofocus
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
                            required
                        />
                        <InputError
                            :message="form_new_customer.errors.phone"
                            class="mt-2"
                        />
                    </div>
                    <div class="modal-footer py-1 px-2">
                        <button
                            type="submit"
                            class="btn btn-sm btn-primary w-100"
                            :disabled="form_new_customer.processing"
                        >
                            <i class="bi bi-save me-2" v-if="!form_new_customer.processing"></i>
                            <span class="spinner-border spinner-border-sm me-2" role="status" v-if="form_new_customer.processing"></span>
                            {{ form_new_customer.processing ? "Adding..." : "Add Customer" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Dana Receipt Modal -->
    <div
        v-if="is_cashier || auth_user.roles_id == 99"
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
                            <rect width="24" height="24" fill="#ccc" rx="4"></rect>
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
    <!-- Cashier Help Modal -->
    <div class="modal fade" id="cashierHelpModal" tabindex="-1" aria-labelledby="cashierHelpModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content border-0 shadow-lg">
                <div class="modal-header border-0" style="background-color:#412f55;">
                    <h5 class="modal-title fw-bold text-white" id="cashierHelpModalLabel">
                        <i class="bi bi-question-circle me-2"></i>Panduan Kasir
                    </h5>
                    <button type="button" class="btn-close btn-close-white" @click="showCashierHelpModal(false)"></button>
                </div>
                <div class="modal-body p-0">

                    <div class="px-4 pt-3 pb-2 bg-light border-bottom">
                        <p class="small text-muted mb-0">Panduan singkat untuk kasir dalam mencatat transaksi di stand <strong>{{ stand.name }}</strong>.</p>
                    </div>

                    <div class="px-4 py-3 d-flex flex-column gap-4">

                        <!-- Cara catat transaksi -->
                        <div>
                            <h6 class="fw-bold mb-2" style="color:#412f55;"><i class="bi bi-cart-plus me-2"></i>Cara Mencatat Transaksi</h6>
                            <ol class="small text-muted ps-3 mb-0" style="line-height:1.8;">
                                <li>Pastikan kamu berada di tab <strong>Cashier</strong>.</li>
                                <li>Klik menu di daftar kiri untuk menambahkan ke order.</li>
                                <li>Isi nama customer di kolom <strong>Customer</strong>.</li>
                                <li>Pilih nomor HP customer dari dropdown, atau klik <i class="bi bi-plus-lg"></i> untuk daftarkan customer baru.</li>
                                <li>Isi <strong>Discount</strong> jika ada (opsional).</li>
                                <li>Pilih <strong>Payment Method</strong> dan isi <strong>Payment Price</strong>.</li>
                                <li>Klik <strong>Submit</strong> untuk menyimpan transaksi.</li>
                            </ol>
                        </div>

                        <!-- Tambah customer baru -->
                        <div class="border rounded p-3 bg-light">
                            <h6 class="fw-bold mb-2"><i class="bi bi-person-plus text-primary me-2"></i>Customer Baru</h6>
                            <p class="small text-muted mb-0">Jika customer belum terdaftar, klik tombol <span class="badge bg-primary"><i class="bi bi-plus-lg"></i></span> di sebelah dropdown nomor HP. Isi nama dan nomor HP, lalu simpan. Customer akan otomatis ter-select.</p>
                        </div>

                        <!-- Receipt -->
                        <div class="border rounded p-3 bg-light">
                            <h6 class="fw-bold mb-2"><i class="bi bi-receipt-cutoff text-secondary me-2"></i>Cetak & Share Receipt</h6>
                            <p class="small text-muted mb-1">Klik tombol <strong>Receipt</strong> setelah mengisi form transaksi untuk preview receipt.</p>
                            <div class="d-flex gap-2 flex-wrap">
                                <span class="badge bg-primary" style="font-size:0.7rem;"><i class="bi bi-download me-1"></i>Download</span>
                                <span class="badge bg-success" style="font-size:0.7rem;"><i class="bi bi-whatsapp me-1"></i>Share WA</span>
                                <span class="badge bg-dark" style="font-size:0.7rem;"><i class="bi bi-printer me-1"></i>Download & Share WA</span>
                            </div>
                        </div>

                        <!-- Today tab -->
                        <div class="border rounded p-3 bg-light">
                            <h6 class="fw-bold mb-2"><i class="bi bi-receipt text-info me-2"></i>Tab Today's Transactions</h6>
                            <p class="small text-muted mb-0">Lihat semua transaksi yang sudah selesai hari ini. Klik ikon <i class="bi bi-receipt-cutoff"></i> di setiap baris untuk mencetak ulang atau share receipt ke customer.</p>
                        </div>

                        <!-- Stok habis -->
                        <div class="border rounded p-3" style="border-color:#efc55c !important;background:#fffbf0;">
                            <h6 class="fw-bold mb-2"><i class="bi bi-exclamation-triangle text-warning me-2"></i>Stok Habis</h6>
                            <p class="small text-muted mb-0">Menu yang stoknya habis (sold = stock) masih bisa diklik tapi sebaiknya tidak dijual. Hubungi Production Staff untuk update stok via ikon <i class="bi bi-box-seam"></i> di halaman Stand Detail.</p>
                        </div>

                        <!-- Indikator stok di menu list -->
                        <div>
                            <h6 class="fw-bold mb-2" style="color:#412f55;"><i class="bi bi-info-circle me-2"></i>Indikator Stok di Daftar Menu</h6>
                            <div class="d-flex flex-column gap-1 small">
                                <div><span class="text-dark fw-bold me-2">( sold / stock )</span>â€” angka terjual vs stok total</div>
                                <div><span class="text-danger fw-bold me-2">Merah</span>â€” stok habis (sold = stock)</div>
                                <div><span class="text-warning fw-bold me-2">Kuning</span>â€” stok hampir habis (sisa â‰¤ 5)</div>
                                <div><span class="text-dark fw-bold me-2">Hitam</span>â€” stok masih aman</div>
                            </div>
                        </div>

                        <!-- Payment method -->
                        <div>
                            <h6 class="fw-bold mb-2" style="color:#412f55;"><i class="bi bi-credit-card me-2"></i>Metode Pembayaran</h6>
                            <div class="small text-muted">
                                Pilih metode sesuai cara bayar customer. Untuk pembayaran <strong>DANA</strong>, minta customer upload bukti transfer â€” kasir perlu memverifikasi sebelum submit.
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer border-0 bg-light">
                    <button type="button" class="btn btn-sm px-4 text-white" style="background-color:#412f55;" @click="showCashierHelpModal(false)">Mengerti</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Notif Toast -->
    <Notif ref="toastNotifRef" />
</template>
