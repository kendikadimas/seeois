<script setup>
import Notif from "@/Components/Notif.vue";
import InputError from "@/Components/InputError.vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import ModalAlertNotification from "@/Components/ModalAlertNotification.vue";
import { formatDate, formatIDR, showImage } from "@/utils";
import { Head, useForm, usePage } from "@inertiajs/vue3";
import { router } from "@inertiajs/vue3";
import { ref, computed, watch, onMounted, onUnmounted, defineProps } from "vue";
import { format } from "date-fns";

const props = defineProps({
    notif: Object,
    transaction: Object,
    stand: Object,
    dana_contact: Object,
});
const auth_user = usePage().props.auth.user;
const title = ref("Payment Transaction");
const toastNotifRef = ref(null);
const modalConfirmationRef = ref(null);
const modalAlertNotificationRef = ref(null);
const inputDanaReceiptRef = ref(null);
const isLargeScreen = ref(window.innerWidth >= 1200);
const menu_collapse_trigger = ref("show");
const payment_method = ref("cash");
const send_option = ref(props.stand.type > 0 ? "delivery" : "pick_up");
const scrollY = ref(0);
const onScroll = () => {
    scrollY.value = window.scrollY;
};
const headerStyle = computed(() => {
    const offsetY = Math.min(scrollY.value * 0.3, 100); // slow scroll
    const opacity = scrollY.value < 50 ? 1 : 0; // disappear after 50px
    return {
        top: "0px",
        transform: `translate(-50%, ${offsetY}px)`,
        transition: "transform 0.3s ease, opacity 0.5s ease",
        opacity: opacity,
        width: "100%",
        padding: "1rem",
        backgroundImage: `url('/storage/local/images/shop/brand/background.png')`,
        backgroundRepeat: "repeat-x",
        backgroundSize: isLargeScreen.value ? "auto 100%" : "auto 0%",
    };
});
const handleResize = () => {
    isLargeScreen.value = window.innerWidth >= 768;
    window.addEventListener("resize", handleResize);
};
const total_item = computed(() => {
    return props.transaction.order_list.reduce((total, item) => {
        return total + Number(item.qty);
    }, 0);
});
const total_price = computed(() => {
    return props.transaction.order_list.reduce((total, item) => {
        return total + Number(item.qty) * item.price;
    }, 0);
});
const form_add_transaction = useForm({
    order_type: null,
    send_option: null,
    payment_method: null,
    payment_price: null,
    dana_receipt: null,
});
function handleAddTransaction() {
    form_add_transaction.payment_method = payment_method.value;
    form_add_transaction.order_type =
        format(new Date(), "yyyy-MM-dd") ==
        format(new Date(props.stand.date), "yyyy-MM-dd")
            ? "now"
            : "pre_order";
    form_add_transaction.send_option = send_option.value;
    if (
        form_add_transaction.payment_price < props.transaction.transaction &&
        form_add_transaction.payment_method == "cash"
    ) {
        return toastNotifRef.value.showToast(
            "danger",
            "Payment Price can is less than Total Transaction!"
        );
    }
    form_add_transaction.post(route("customer.order.add"), {
        onSuccess: () => {
            setTimeout(() => {
                router.visit(
                    route("shop.stand", [props.transaction.stand_id, "new"])
                );
            }, 200);
        },
        onError: (e) => {
            for (let i in e) {
                toastNotifRef.value.showToast("warning", e[i]);
            }
        },
    });
}
const handleFileUploadDanaReceipt = (event) => {
    form_add_transaction.dana_receipt = event.target.files[0];
};
function triggerFileDanaReceiptImage() {
    inputDanaReceiptRef.value.click();
}
function copyDanaContact() {
    if (navigator.clipboard) {
        navigator.clipboard
            .writeText(props.dana_contact.phone)
            .then(() => {
                toastNotifRef.value.showToast(
                    "info",
                    "Copied " +
                        props.dana_contact.name +
                        " DANA Number to clipboard."
                );
            })
            .catch(() => {
                toastNotifRef.value.showToast("warning", [
                    "Can not copy " + props.dana_contact.name + " DANA Number.",
                    "Browser is not supported. Please copy manually.",
                ]);
            });
    } else {
        toastNotifRef.value.showToast("warning", [
            "Can not copy " + props.dana_contact.name + " DANA Number.",
            "Browser is not supported. Please copy manually.",
        ]);
    }
}
function alertNotification(message) {
    modalAlertNotificationRef.value.showModal(message);
}
function confirmation(route, message) {
    if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route, message);
    } else {
        console.error("modalConfirmationRef is null");
    }
}
onMounted(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", onScroll);
    console.log(new Date() == new Date(props.stand.date));
});
onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("scroll", onScroll);
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
        <ModalAlertNotification ref="modalAlertNotificationRef" />
        <!-- Notif Toast -->
        <Notif ref="toastNotifRef" />
        <!-- Header -->
        <div
            class="card rounded-0 bg-warning bg-opacity-50 position-fixed start-50 translate-middle-x z-3"
            :style="headerStyle"
        >
            <div class="card shadow-lg mx-auto px-3 py-3">
                <div class="d-flex text-primary-emphasis">
                    <button
                        class="btn btn-sm btn-light text-primary"
                        @click="
                            router.visit(
                                route('shop.stand', transaction.stand_id)
                            )
                        "
                    >
                        <i class="bi bi-chevron-left"></i>
                        <span class="d-none d-lg-inline ms-2">{{
                            "Back"
                        }}</span>
                    </button>
                    <div
                        class="border-start border-primary border-2 mx-2 mx-lg-4"
                    ></div>

                    <div class="d-flex">
                        <span class="h5 my-auto">
                            {{
                                isLargeScreen
                                    ? "Payment Transaction"
                                    : "Payment"
                            }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Content -->
        <div class="container" style="margin-top: 8rem">
            <div class="row g-4">
                <div class="col-12 col-xl-7">
                    <div class="card bg-white shadow-sm">
                        <div class="d-flex shadow-sm p-3 bg-white rounded-top">
                            <span class="h6 text-primary-emphasis mb-0">
                                <i class="bi bi-cart4 me-2"></i>
                                {{ "Order Detail" }}
                            </span>
                        </div>
                        <div class="d-flex px-3 py-2">
                            <span class="text-secondary h6 mb-0">
                                {{ "Menu" }}
                            </span>

                            <span
                                :class="
                                    'ms-auto text-secondary mt-auto ' +
                                    (!isLargeScreen
                                        ? 'border-end border-primary border-2 pe-2'
                                        : '')
                                "
                                style="font-size: 0.8rem"
                            >
                                {{
                                    total_item +
                                    (total_item > 1 ? " items" : " item")
                                }}
                            </span>
                            <button
                                v-if="!isLargeScreen"
                                data-bs-toggle="collapse"
                                data-bs-target="#menu_collapse"
                                class="btn btn-sm btn-outline-primary border-0 py-0"
                                style="font-size: 0.8rem"
                                id="menu_collapse_trigger"
                                @click="
                                    () => {
                                        menu_collapse_trigger =
                                            menu_collapse_trigger == 'show'
                                                ? 'hide'
                                                : 'show';
                                    }
                                "
                            >
                                {{ menu_collapse_trigger }}
                            </button>
                        </div>
                        <div
                            :class="'collapse ' + (isLargeScreen ? 'show' : '')"
                            id="menu_collapse"
                        >
                            <div
                                class="scroll-container-3 scroll-container-lg-2 pe-1"
                            >
                                <li class="list-group list-group-flush">
                                    <ul
                                        class="list-group-item list-group-item-action px-0 py-1 mb-0"
                                        v-for="(
                                            item, index
                                        ) in transaction.order_list"
                                    >
                                        <div
                                            class="float-start p-2"
                                            :style="{
                                                width: isLargeScreen
                                                    ? '15%'
                                                    : '20%',
                                            }"
                                        >
                                            <img
                                                :src="
                                                    '/storage/images/shop/foods/menu/' +
                                                    (item?.image ??
                                                        'default.png')
                                                "
                                                alt="image"
                                                style="
                                                    aspect-ratio: 1;
                                                    width: 100%;
                                                "
                                                class="placeholder img-fluid rounded"
                                                @load="showImage"
                                            />
                                        </div>
                                        <div
                                            class="float-end py-2 my-auto"
                                            :style="{
                                                width: isLargeScreen
                                                    ? '85%'
                                                    : '80%',
                                            }"
                                        >
                                            <span
                                                class="d-block text-primary-emphasis"
                                                >{{
                                                    "( " +
                                                    item.qty +
                                                    " ) " +
                                                    item.name
                                                }}</span
                                            >
                                            <div class="d-flex">
                                                <div class="">
                                                    <span
                                                        class="d-inline-block text-secondary my-auto"
                                                        style="
                                                            width: 2.5rem;
                                                            font-size: 0.8rem;
                                                        "
                                                        >{{ "Price" }}</span
                                                    >
                                                    <span class="">{{
                                                        ": " +
                                                        formatIDR(item.price)
                                                    }}</span>
                                                </div>
                                                <div class="ms-auto">
                                                    <span
                                                        class="d-inline-block text-secondary my-auto"
                                                        style="
                                                            width: 2.5rem;
                                                            font-size: 0.8rem;
                                                        "
                                                        >{{ "Total" }}</span
                                                    >
                                                    <span
                                                        class="h6 d-inline-block"
                                                        style="width: 6rem"
                                                        >{{
                                                            ": " +
                                                            formatIDR(
                                                                item.price *
                                                                    item.qty
                                                            )
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </li>
                            </div>
                        </div>
                        <div class="d-flex px-3 py-2">
                            <span class="text-secondary h6 mb-0">
                                {{ "Transaction" }}
                            </span>
                        </div>
                        <div class="d-flex mt-2 px-3">
                            <span class="text-secondary">
                                {{ "Subtotal" }}
                            </span>
                            <span class="ms-auto">
                                {{ formatIDR(total_price ?? 0) }}
                            </span>
                        </div>
                        <div class="d-flex mt-2 px-3">
                            <span class="text-secondary my-auto">
                                {{ "Voucher" }}
                            </span>
                            <div
                                class="bg-warning bg-opacity-10 ms-auto rounded px-2"
                            >
                                {{
                                    transaction.voucher_id > 0
                                        ? "Applied"
                                        : "Not Used"
                                }}
                            </div>
                        </div>
                        <div class="d-flex mt-2 px-3">
                            <span class="text-secondary">
                                {{ "Discount" }}
                            </span>
                            <span class="ms-auto">
                                {{ formatIDR(transaction.discount ?? 0) }}</span
                            >
                        </div>
                        <div
                            class="d-flex mt-2 rounded bg-warning bg-opacity-25 p-2 mx-3 mb-3"
                        >
                            <span>{{ "Total" }}</span>
                            <span
                                class="h6 my-auto ms-auto text-warning-emphasis"
                            >
                                {{ formatIDR(transaction.transaction) }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-xl-5">
                    <div class="card p-3 shadow-sm">
                        <div
                            class="d-flex border-bottom border-primary border-2 pb-2"
                        >
                            <span class="mb-0 h6 text-primary-emphasis">
                                <i class="fa-solid fa-cash-register me-2"></i
                                >{{ "PAYMENT" }}</span
                            >
                        </div>
                        <div class="d-flex mt-2">
                            <span
                                class="text-secondary"
                                style="font-size: 0.8rem"
                                >{{ "Order Type" }}</span
                            >
                        </div>
                        <div class="d-flex">
                            <div
                                v-if="
                                    format(new Date(), 'yyyy-MM-dd') ==
                                    format(new Date(stand.date), 'yyyy-MM-dd')
                                "
                                class="w-50 rounded card-bg-hover-warning"
                            >
                                <div :class="'card bg-warning bg-opacity-10'">
                                    <span :class="'mx-auto text-dark'"
                                        ><i
                                            class="bi bi-calendar-check me-1"
                                        ></i>
                                        {{ "Now" }}
                                    </span>
                                </div>
                            </div>
                            <div
                                v-if="
                                    format(new Date(), 'yyyy-MM-dd') <
                                    format(new Date(stand.date), 'yyyy-MM-dd')
                                "
                                class="w-50 rounded card-bg-hover-warning"
                            >
                                <div :class="'card bg-warning bg-opacity-10'">
                                    <span :class="'mx-auto text-dark'"
                                        ><i
                                            class="bi bi-calendar-week me-1"
                                        ></i>
                                        {{ "Pre-Order" }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-2">
                            <span
                                class="text-secondary"
                                style="font-size: 0.8rem"
                                >{{ "Send Option" }}</span
                            >
                        </div>
                        <div class="d-flex">
                            <div
                                v-if="stand.type != 1"
                                class="w-50 rounded card-bg-hover-warning"
                                @click="send_option = 'pick_up'"
                            >
                                <div
                                    :class="
                                        'card ' +
                                        (send_option == 'pick_up'
                                            ? 'bg-warning bg-opacity-10'
                                            : '')
                                    "
                                >
                                    <span
                                        :class="
                                            'mx-auto ' +
                                            (send_option == 'pick_up'
                                                ? 'text-dark'
                                                : 'text-secondary')
                                        "
                                        ><i
                                            class="bi bi-person-arms-up me-1"
                                        ></i>
                                        {{ "Pick Up" }}
                                    </span>
                                </div>
                            </div>
                            <div
                                class="w-50 rounded card-bg-hover-warning"
                                @click="send_option = 'delivery'"
                            >
                                <div
                                    :class="
                                        'card ' +
                                        (send_option == 'delivery'
                                            ? 'bg-warning bg-opacity-10'
                                            : '')
                                    "
                                >
                                    <span
                                        :class="
                                            'mx-auto ' +
                                            (send_option == 'delivery'
                                                ? 'text-dark'
                                                : 'text-secondary')
                                        "
                                        ><i
                                            class="fa-solid fa-truck-fast me-1"
                                        ></i>
                                        {{ "Delivery" }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-2">
                            <span
                                class="text-secondary"
                                style="font-size: 0.8rem"
                                >{{
                                    (send_option == "pick_up"
                                        ? "Pick up "
                                        : "Delivery ") + " Date"
                                }}</span
                            >
                        </div>
                        <div class="d-flex my-1">
                            <span class="text-warning-emphasis h6 mb-0">{{
                                format(stand.date, "EEEE, dd MMM yyy")
                            }}</span>
                        </div>
                        <div class="d-flex mt-2">
                            <span
                                class="text-secondary"
                                style="font-size: 0.8rem"
                                >{{ "Payment Method" }}</span
                            >
                        </div>
                        <div class="d-flex">
                            <div
                                class="w-50 rounded card-bg-hover-warning"
                                @click="payment_method = ''"
                            >
                                <div
                                    :class="
                                        'card ' +
                                        (payment_method == 'cash'
                                            ? 'bg-warning bg-opacity-10'
                                            : '')
                                    "
                                >
                                    <span
                                        :class="
                                            'mx-auto ' +
                                            (payment_method == 'cash'
                                                ? 'text-dark'
                                                : 'text-secondary')
                                        "
                                    >
                                        <i
                                            class="fa-solid fa-money-bill-wave me-2 text-primary"
                                        ></i>
                                        {{ "Cash" }}
                                    </span>
                                </div>
                            </div>
                            <div
                                class="w-50 rounded card-bg-hover-warning"
                                @click="payment_method = ''"
                            >
                                <div
                                    :class="
                                        'card ' +
                                        (payment_method == 'dana'
                                            ? 'bg-warning bg-opacity-10'
                                            : '')
                                    "
                                >
                                    <span
                                        :class="
                                            'mx-auto ' +
                                            (payment_method == 'dana'
                                                ? 'text-dark'
                                                : 'text-secondary')
                                        "
                                    >
                                        <svg
                                            class="icon icon-dana d-inline rounded-circle border-primary border"
                                            style="
                                                width: 1rem;
                                                height: 1rem;
                                                padding: 0.1rem;
                                            "
                                        >
                                            <use href="/icons.svg#dana"></use>
                                        </svg>
                                        {{ "Dana" }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-3">
                            <button
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target=".multi-collapse"
                                aria-controls="paymentGuideCollapseCash paymentGuideCollapseDana"
                                class="btn btn-outline-secondary btn-sm py-0 w-100 border"
                            >
                                <span style="font-size: 0.8rem">{{
                                    "Payment Guide"
                                }}</span>
                            </button>
                        </div>
                        <transition
                            name="fade-slide-ltr"
                            @after-leave="payment_method = 'dana'"
                        >
                            <div v-if="payment_method == 'cash'">
                                <div
                                    class="collapse multi-collapse"
                                    id="paymentGuideCollapseCash"
                                >
                                    <li class="list-group list-group-flush">
                                        <ul
                                            style="font-size: 0.8rem"
                                            class="list-group-item list-group-item-light mb-0"
                                            v-for="item in [
                                                {
                                                    text: 'Please give the cash to the courier when you receive the order.',
                                                    sub: 'Anda dapat memberikan uangnya kepada kurir ketika menerima pesanan.',
                                                },
                                                {
                                                    text: 'Please fill the \'Payment Price\'. For the courier will bring the payment change.',
                                                    sub: 'Silakan mengisi \'Payment Price\' sesuai nominal uang yang akan diberikan. Agar kurir dapat memberikan kembalian.',
                                                },
                                            ]"
                                        >
                                            <p class="mb-0">{{ item.text }}</p>
                                            <p
                                                class="mb-0 text-secondary fst-italic"
                                            >
                                                {{ item.sub }}
                                            </p>
                                        </ul>
                                    </li>
                                </div>
                                <div class="d-flex mt-2">
                                    <span
                                        class="text-secondary"
                                        style="font-size: 0.8rem"
                                        >{{ "Payment Price" }}

                                        <i
                                            data-bs-target="#paymentGuideCollapseCash"
                                            data-bs-toggle="collapse"
                                            class="bi bi-info-circle ms-1 my-auto"
                                            style="font-size: 0.6rem"
                                        ></i>
                                    </span>
                                </div>
                                <div class="input-group input-group-sm">
                                    <label
                                        for="payment_price"
                                        class="input-group-text"
                                        >{{ "Rp" }}</label
                                    >
                                    <input
                                        type="number"
                                        id="payment_price"
                                        class="form-control"
                                        :placeholder="
                                            'e.g ' + transaction.transaction
                                        "
                                        :required="payment_method == 'cash'"
                                        v-model="
                                            form_add_transaction.payment_price
                                        "
                                    />
                                </div>
                            </div>
                        </transition>
                        <transition
                            name="fade-slide-rtl"
                            @after-leave="payment_method = 'cash'"
                        >
                            <div v-if="payment_method == 'dana'">
                                <div
                                    class="collapse multi-collapse"
                                    id="paymentGuideCollapseDana"
                                >
                                    <li class="list-group list-group-flush">
                                        <ul
                                            style="font-size: 0.8rem"
                                            class="list-group-item list-group-item-light mb-0"
                                            v-for="item in [
                                                {
                                                    text: 'Please upload the transfer receipt of DANA to the \'DANA Receipt\'.',
                                                    sub: 'Silakan mengunggah bukti transfer DANA ke bagian \'DANA Receipt\'.',
                                                },
                                                {
                                                    text: 'Please transfer exact amount of \'Total Transaction\'.',
                                                    sub: 'Mohon untuk mentransfer jumlah yang sesuai dengan \'Total Transaction\'.',
                                                },
                                            ]"
                                        >
                                            <p class="mb-0">{{ item.text }}</p>
                                            <p
                                                class="mb-0 text-secondary fst-italic"
                                            >
                                                {{ item.sub }}
                                            </p>
                                        </ul>
                                    </li>
                                </div>
                                <div class="d-flex mt-2">
                                    <span
                                        class="text-secondary"
                                        style="font-size: 0.8rem"
                                        >{{ "DANA Contact" }}
                                    </span>
                                </div>
                                <div class="d-flex">
                                    <span class="text-secondary" style="">
                                        {{ dana_contact.name + " - " }}
                                        <span class="text-dark">{{
                                            dana_contact.phone
                                        }}</span>
                                    </span>
                                    <i
                                        class="bi bi-copy text-secondary card-bg-hover px-2 rounded"
                                        @click="copyDanaContact()"
                                    ></i>
                                </div>
                                <div class="d-flex mt-2">
                                    <span
                                        class="text-secondary"
                                        style="font-size: 0.8rem"
                                        >{{ "Total Transaction" }}
                                    </span>
                                </div>
                                <div class="d-flex">
                                    <span class="h6" style="">{{
                                        formatIDR(transaction.transaction)
                                    }}</span>
                                </div>
                                <div class="d-flex mt-2">
                                    <span
                                        class="text-secondary"
                                        style="font-size: 0.8rem"
                                        >{{ "DANA Receipt" }}

                                        <i
                                            data-bs-target="#paymentGuideCollapseDana"
                                            data-bs-toggle="collapse"
                                            class="bi bi-info-circle ms-1 my-auto"
                                            style="font-size: 0.6rem"
                                        ></i>
                                    </span>
                                </div>
                                <div
                                    class="input-group input-group-sm border rounded"
                                >
                                    <button
                                        class="btn btn-outline-secondary border-0"
                                        type="button"
                                        @click="triggerFileDanaReceiptImage()"
                                    >
                                        {{ "Upload Receipt" }}
                                    </button>
                                    <input
                                        ref="inputDanaReceiptRef"
                                        type="file"
                                        class="d-none"
                                        @change="handleFileUploadDanaReceipt"
                                    />
                                    <input
                                        type="text"
                                        class="form-control"
                                        disabled
                                        :placeholder="
                                            form_add_transaction?.dana_receipt
                                                ?.name ?? 'filename.format'
                                        "
                                    />
                                </div>
                            </div>
                        </transition>
                        <div class="d-flex mt-3">
                            <button
                                type="button"
                                class="btn btn-sm btn-warning w-100"
                                @click="handleAddTransaction()"
                            >
                                <span class="h6 mb-0">
                                    {{
                                        "Pay with " +
                                        (payment_method == "cash"
                                            ? "Cash On Delivery"
                                            : "Dana")
                                    }}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </GuestLayout>
</template>
