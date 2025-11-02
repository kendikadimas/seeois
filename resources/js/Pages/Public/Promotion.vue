<script setup>
import Notif from "@/Components/Notif.vue";
import InputError from "@/Components/InputError.vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import ModalAlertNotification from "@/Components/ModalAlertNotification.vue";
import {
    formatDate,
    formatDateOnly,
    formatDateSimple,
    formatIDR,
    showImage,
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
import { format } from "date-fns";

const props = defineProps({
    notif: Object,
    voucher_list: Array,
    customer_voucher: Array,
});
const auth_user = usePage().props.auth.user;
const title = ref("Promotion");
const active_tab = ref(1);
const active_tab_voucher = ref(1);
const toastNotifRef = ref(null);
const modalConfirmationRef = ref(null);
const modalAlertNotificationRef = ref(null);
const modalAddVoucher = ref(null);
const isLargeScreen = ref(window.innerWidth >= 1200);
const scrollY = ref(0);
const onScroll = () => {
    scrollY.value = window.scrollY;
};
const order_list = ref([]);
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
const form_add_voucher = useForm({
    name: null,
    code: null,
    point: 0,
    start_date: 0,
    end_date: 0,
    image: null,
    user_quota: 0,
    min_transaction: 0,
    discount_type: "price",
    discount_price: 0,
    discount_percent: 0,
    discount_max_price: 0,
});
function showAddVoucherModal(is_show) {
    if (modalAddVoucher.value == null) {
        const modal = document.getElementById("addVoucherModal");
        modalAddVoucher.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalAddVoucher.value.show();
    } else {
        modalAddVoucher.value.hide();
    }
}
function handleAddVoucher() {
    form_add_voucher.post(route("shop.voucher.add"), {
        onSuccess: () => {
            showAddVoucherModal(false);
            form_add_voucher.reset();
        },
        onError: (e) => {
            for (let key in e) {
                toastNotifRef.value.showToast("warning", e[key]);
            }
        },
    });
}
const handleFileUploadVoucherImage = (event) => {
    form_add_voucher.image = event.target.files[0];
};
function changeDetailCollapseTriger(id) {
    const collapseElement = document.getElementById(
        "voucherDetailTrigger" + id
    );
    if (collapseElement.innerHTML == "Click to see voucher detail") {
        collapseElement.innerHTML = "Hide voucher detail";
    } else {
        collapseElement.innerHTML = "Click to see voucher detail";
    }
}
function changeCustomerDetailCollapseTriger(id) {
    const collapseElement = document.getElementById(
        "customerVoucherDetailTrigger" + id
    );
    if (collapseElement.innerHTML == "Click to see voucher detail") {
        collapseElement.innerHTML = "Hide voucher detail";
    } else {
        collapseElement.innerHTML = "Click to see voucher detail";
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
                        @click="router.visit(route('shop'))"
                    >
                        <i class="bi bi-chevron-left"></i>
                        <span class="d-none d-lg-inline ms-2">{{
                            "Back"
                        }}</span>
                    </button>
                    <div
                        class="border-start border-primary border-2 mx-2 mx-lg-4"
                    ></div>
                    <img
                        :src="
                            '/storage/images/profile/' +
                            (auth_user?.profile_image ?? 'example.png')
                        "
                        alt="image"
                        class="rounded object-fit-cover placeholder"
                        @load="showImage"
                        style="width: 3rem; height: 3rem"
                    />
                    <div class="px-2">
                        <h6 class="mb-0">
                            {{ auth_user?.name ?? "Guest" }}
                        </h6>
                        <span class="fw-light">{{
                            auth_user
                                ? auth_user.roles?.name ?? "Customer"
                                : "Please Login"
                        }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Content -->
        <div class="container" style="margin-top: 9rem">
            <div class="row">
                <div class="col-12 col-xl-5">
                    <div class="card bg-white shadow p-3">
                        <div class="d-flex">
                            <div class="w-50">
                                <div class="d-flex">
                                    <span
                                        class="d-block text-primary-emphasis h6 mb-0 me-3 my-auto"
                                        >{{ "My Point" }}
                                    </span>
                                    <i
                                        @click="
                                            alertNotification(
                                                'Point is used to redeem voucher and promotion. For every multiple of Rp10.000 in a transaction, you will earn 50 point.'
                                            )
                                        "
                                        class="bi bi-question-circle my-auto"
                                    ></i>
                                </div>
                                <span class="d-block text-warning fs-5 fw-bold">
                                    <i class="fa-solid fa-coins me-1"></i>
                                    {{ auth_user?.point ?? 0 }}
                                </span>
                            </div>
                            <div class="w-50">
                                <div class="d-flex">
                                    <span
                                        class="d-block text-primary-emphasis h6 mb-0 me-3 my-auto"
                                        >{{ "My Voucher" }}
                                    </span>
                                    <i
                                        @click="
                                            alertNotification(
                                                'Voucher is a discount that can be used in the next transaction. You can earn voucher by redeeming point'
                                            )
                                        "
                                        class="bi bi-question-circle my-auto"
                                    ></i>
                                </div>
                                <span class="d-block text-warning fs-5 fw-bold">
                                    <i class="fa-solid fa-ticket me-1"></i>
                                    {{ customer_voucher?.length ?? 0 }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="d-flex d-xl-none mt-4 bg-white shadow-sm p-2 rounded"
                    >
                        <button
                            :class="
                                'btn btn-sm border-0 card-bg-hover-warning w-50 ' +
                                (active_tab_voucher == 1
                                    ? 'bg-warning bg-opacity-10'
                                    : '')
                            "
                            @click="active_tab_voucher = 0"
                        >
                            <i class="bi bi-folder2-open me-2"></i
                            >{{ "Available" }}
                        </button>
                        <button
                            :class="
                                'btn btn-sm border-0 card-bg-hover-warning w-50 ms-2 ' +
                                (active_tab_voucher == 2
                                    ? 'bg-warning bg-opacity-10'
                                    : '')
                            "
                            @click="active_tab_voucher = 0"
                        >
                            <i class="bi bi-folder-plus me-2"></i
                            >{{ "Gallery" }}
                        </button>
                    </div>
                    <transition
                        name="fade-slide-ltr"
                        @after-leave="active_tab_voucher = 2"
                    >
                        <div
                            class="card bg-white shadow-sm my-4 px-0"
                            v-if="active_tab_voucher == 1 || isLargeScreen"
                        >
                            <div
                                class="card p-3 shadow-sm bg-white rounded-bottom-0"
                            >
                                <span class="text-primary-emphasis h6 mb-0">
                                    <i class="bi bi-folder2-open me-2"></i>

                                    {{ "Available Voucher" }}</span
                                >
                            </div>
                            <div class="d-flex">
                                <div
                                    class="scroll-container-4 scroll-container-lg-3 scroll-thumb-warning pe-3 ps-3 pb-2 pt-3"
                                >
                                    <div
                                        class="my-3"
                                        v-if="!(customer_voucher?.length > 0)"
                                    >
                                        <div class="d-flex">
                                            <span
                                                class="text-secondary mx-auto"
                                            >
                                                {{ "No voucher available" }}
                                            </span>
                                        </div>
                                        <div class="d-flex">
                                            <span
                                                class="text-secondary mx-auto fst-italic"
                                                style="font-size: 0.8rem"
                                            >
                                                {{
                                                    "Redeem voucher using points"
                                                }}
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        v-for="voucher in customer_voucher"
                                        :key="voucher.id"
                                        class="position-relative bg-warning bg-opacity-25 d-flex rounded-4 mb-3"
                                    >
                                        <div
                                            v-for="dot in [
                                                { top: '30%', left: '0' },
                                                { top: '70%', left: '0' },
                                                { top: '30%', left: '100%' },
                                                { top: '70%', left: '100%' },
                                            ]"
                                            class="position-absolute rounded-circle p-3 bg-white"
                                            :style="{
                                                top: dot.top,
                                                left: dot.left,
                                                transform:
                                                    'translate(-50%, -50%)',
                                            }"
                                        ></div>
                                        <div
                                            class="d-xl-flex d-block border-secondary-subtle rounded-3 border-0 bg-primary bg-opacity-25 my-2 mx-4 w-100 py-2 px-3"
                                        >
                                            <img
                                                :src="
                                                    '/storage/images/shop/voucher/' +
                                                    (voucher?.image ??
                                                        'default.png')
                                                "
                                                class="rounded-3 my-auto"
                                                alt="Ticket Image"
                                                :style="{
                                                    aspectRatio: '1/1',
                                                    width: isLargeScreen
                                                        ? '25%'
                                                        : '100%',
                                                    minWidth: '90px',
                                                    backgroundSize: 'cover',
                                                }"
                                            />
                                            <div
                                                class="ms-xl-3 rounded bg-white p-3"
                                                :style="{
                                                    width: isLargeScreen
                                                        ? '75%'
                                                        : '100%',
                                                }"
                                            >
                                                <div
                                                    class="d-flex bg-primary bg-opacity-10 rounded-top"
                                                >
                                                    <span
                                                        class="text-primary h6 mb-0 mx-auto py-1"
                                                        >{{
                                                            voucher?.discount_type ==
                                                            "price"
                                                                ? "DISCOUNT " +
                                                                  formatIDR(
                                                                      voucher?.discount_price
                                                                  ) +
                                                                  "!"
                                                                : "DISCOUNT " +
                                                                  voucher?.discount_percent +
                                                                  "%!"
                                                        }}</span
                                                    >
                                                </div>
                                                <div class="d-flex">
                                                    <span
                                                        class="text-primary-emphasis"
                                                        style="
                                                            font-size: 0.8rem;
                                                        "
                                                    >
                                                        {{ "PROMO : " }}
                                                        <span
                                                            class="h6 mb-0"
                                                            style="
                                                                font-size: 0.8rem;
                                                            "
                                                        >
                                                            {{
                                                                (
                                                                    voucher?.name ??
                                                                    "No Name"
                                                                ).toUpperCase()
                                                            }}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div class="d-flex mb-2">
                                                    <span
                                                        class="text-secondary"
                                                        style="
                                                            font-size: 0.8rem;
                                                        "
                                                    >
                                                        {{
                                                            format(
                                                                voucher?.start_date,
                                                                "d MMM yyy"
                                                            ) +
                                                            " - " +
                                                            format(
                                                                voucher?.end_date,
                                                                "d MMM yyy"
                                                            )
                                                        }}
                                                    </span>
                                                </div>
                                                <div class="mb-2">
                                                    <div
                                                        class="card border text-secondary"
                                                    >
                                                        <button
                                                            :id="
                                                                'customerVoucherDetailTrigger' +
                                                                voucher?.id
                                                            "
                                                            class="btn btn-sm text-primary card-bg-hover border-0 py-1"
                                                            style="
                                                                font-size: 0.8rem;
                                                            "
                                                            data-bs-toggle="collapse"
                                                            :data-bs-target="
                                                                '#customerVoucherDetail' +
                                                                voucher?.id
                                                            "
                                                            @click="
                                                                changeCustomerDetailCollapseTriger(
                                                                    voucher?.id
                                                                )
                                                            "
                                                        >
                                                            {{
                                                                "Click to see voucher detail"
                                                            }}
                                                        </button>
                                                        <div
                                                            class="collapse"
                                                            :id="
                                                                'customerVoucherDetail' +
                                                                voucher?.id
                                                            "
                                                            style="
                                                                font-size: 0.8rem;
                                                            "
                                                        >
                                                            <li
                                                                class="list-group list-group-flush"
                                                            >
                                                                <ul
                                                                    class="list-group-item list-group-item-action mb-0 py-1"
                                                                    v-for="(
                                                                        item,
                                                                        key
                                                                    ) in {
                                                                        user_quota:
                                                                            {
                                                                                text:
                                                                                    'This voucher can be redeemed by the first ' +
                                                                                    voucher?.user_quota +
                                                                                    ' user.',
                                                                                sub:
                                                                                    'Kupon ini dapat ditebus oleh ' +
                                                                                    voucher?.user_quota +
                                                                                    ' pengguna tercepat.',
                                                                            },
                                                                        min_transaction:
                                                                            {
                                                                                text:
                                                                                    'Minimum transaction is ' +
                                                                                    formatIDR(
                                                                                        voucher?.min_transaction
                                                                                    ) +
                                                                                    '.',
                                                                                sub:
                                                                                    'Transaksi minimum senilai ' +
                                                                                    formatIDR(
                                                                                        voucher?.min_transaction
                                                                                    ) +
                                                                                    '.',
                                                                            },
                                                                        discount_max_price:
                                                                            {
                                                                                text:
                                                                                    voucher.discount_type ==
                                                                                    'percent'
                                                                                        ? 'Maximum discount price is ' +
                                                                                          formatIDR(
                                                                                              voucher?.discount_max_price
                                                                                          ) +
                                                                                          '.'
                                                                                        : null,
                                                                                sub:
                                                                                    voucher.discount_type ==
                                                                                    'percent'
                                                                                        ? 'Potongan harga paling besar senilai ' +
                                                                                          formatIDR(
                                                                                              voucher?.discount_max_price
                                                                                          ) +
                                                                                          '.'
                                                                                        : null,
                                                                            },
                                                                    }"
                                                                >
                                                                    <div
                                                                        class="d-inline"
                                                                    >
                                                                        <p
                                                                            class="mb-0"
                                                                        >
                                                                            {{
                                                                                item.text
                                                                            }}
                                                                        </p>
                                                                        <p
                                                                            class="mb-0 fst-italic text-secondary"
                                                                        >
                                                                            {{
                                                                                item.sub
                                                                            }}
                                                                        </p>
                                                                    </div>
                                                                </ul>
                                                            </li>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
                <div class="col-12 col-xl-7">
                    <transition
                        name="fade-slide-rtl"
                        @after-leave="active_tab_voucher = 1"
                    >
                        <div
                            class="card bg-white shadow-sm p-0 mt-4 mt-xl-0"
                            v-if="active_tab_voucher == 2 || isLargeScreen"
                        >
                            <div class="d-flex shadow-sm p-3">
                                <span
                                    class="text-primary-emphasis h6 mb-0 me-3"
                                >
                                    <i class="bi bi-folder-plus me-2"></i>
                                    {{ "Voucher Gallery" }}
                                </span>
                                <button
                                    v-if="auth_user?.roles_id == 3"
                                    class="btn btn-sm btn-outline-primary border-0 py-0 ms-auto"
                                    @click="
                                        () => {
                                            if (auth_user.roles_id == 3) {
                                                showAddVoucherModal(true);
                                            }
                                        }
                                    "
                                >
                                    <i class="bi bi-plus-lg me-1"></i>
                                    {{ "Add Voucher" }}
                                </button>
                            </div>
                            <div class="d-flex">
                                <div
                                    class="scroll-container-4 scroll-container-lg-4 pe-3 ps-3 pt-3"
                                >
                                    <div
                                        v-for="voucher in voucher_list"
                                        :key="voucher.id"
                                        class="position-relative bg-warning bg-opacity-25 d-flex rounded-4 mb-3"
                                    >
                                        <div
                                            v-for="dot in [
                                                { top: '30%', left: '0' },
                                                { top: '70%', left: '0' },
                                                { top: '30%', left: '100%' },
                                                { top: '70%', left: '100%' },
                                            ]"
                                            class="position-absolute rounded-circle p-3 bg-white"
                                            :style="{
                                                top: dot.top,
                                                left: dot.left,
                                                transform:
                                                    'translate(-50%, -50%)',
                                            }"
                                        ></div>
                                        <div
                                            class="d-xl-flex d-block border-secondary-subtle rounded-3 border-0 bg-primary bg-opacity-25 my-2 mx-4 w-100 py-2 px-3"
                                        >
                                            <img
                                                :src="
                                                    '/storage/images/shop/voucher/' +
                                                    (voucher?.image ??
                                                        'default.png')
                                                "
                                                class="rounded-3 my-auto"
                                                alt="Ticket Image"
                                                :style="{
                                                    aspectRatio: '1/1',
                                                    width: isLargeScreen
                                                        ? '25%'
                                                        : '100%',
                                                    minWidth: '90px',
                                                    backgroundSize: 'cover',
                                                }"
                                            />
                                            <div
                                                class="ms-xl-3 rounded bg-white p-3"
                                                :style="{
                                                    width: isLargeScreen
                                                        ? '75%'
                                                        : '100%',
                                                }"
                                            >
                                                <div
                                                    class="d-flex bg-success bg-opacity-10 rounded-top"
                                                >
                                                    <span
                                                        class="text-primary h6 mb-0 mx-auto py-1"
                                                        >{{
                                                            voucher?.discount_type ==
                                                            "price"
                                                                ? "DISCOUNT " +
                                                                  formatIDR(
                                                                      voucher?.discount_price
                                                                  ) +
                                                                  "!"
                                                                : "DISCOUNT " +
                                                                  voucher?.discount_percent +
                                                                  "%!"
                                                        }}</span
                                                    >
                                                </div>
                                                <div class="d-flex">
                                                    <span
                                                        class="text-primary-emphasis"
                                                        style="
                                                            font-size: 0.8rem;
                                                        "
                                                    >
                                                        {{ "PROMO : " }}
                                                        <span
                                                            class="h6 mb-0"
                                                            style="
                                                                font-size: 0.8rem;
                                                            "
                                                        >
                                                            {{
                                                                (
                                                                    voucher?.name ??
                                                                    "No Name"
                                                                ).toUpperCase()
                                                            }}
                                                        </span>
                                                    </span>
                                                </div>
                                                <div class="d-flex mb-2">
                                                    <span
                                                        class="text-secondary"
                                                        style="
                                                            font-size: 0.8rem;
                                                        "
                                                    >
                                                        {{
                                                            format(
                                                                voucher?.start_date,
                                                                "d MMM yyy"
                                                            ) +
                                                            " - " +
                                                            format(
                                                                voucher?.end_date,
                                                                "d MMM yyy"
                                                            )
                                                        }}
                                                    </span>
                                                </div>
                                                <div class="mb-2">
                                                    <div
                                                        class="card border text-secondary"
                                                    >
                                                        <button
                                                            :id="
                                                                'voucherDetailTrigger' +
                                                                voucher?.id
                                                            "
                                                            class="btn btn-sm text-primary card-bg-hover border-0 py-1"
                                                            style="
                                                                font-size: 0.8rem;
                                                            "
                                                            data-bs-toggle="collapse"
                                                            :data-bs-target="
                                                                '#voucherDetail' +
                                                                voucher?.id
                                                            "
                                                            @click="
                                                                changeDetailCollapseTriger(
                                                                    voucher?.id
                                                                )
                                                            "
                                                        >
                                                            {{
                                                                "Click to see voucher detail"
                                                            }}
                                                        </button>
                                                        <div
                                                            class="collapse"
                                                            :id="
                                                                'voucherDetail' +
                                                                voucher?.id
                                                            "
                                                            style="
                                                                font-size: 0.8rem;
                                                            "
                                                        >
                                                            <li
                                                                class="list-group list-group-flush"
                                                            >
                                                                <ul
                                                                    class="list-group-item list-group-item-action mb-0 py-1"
                                                                    v-for="(
                                                                        item,
                                                                        key
                                                                    ) in {
                                                                        user_quota:
                                                                            {
                                                                                text:
                                                                                    'This voucher can be redeemed by the first ' +
                                                                                    voucher?.user_quota +
                                                                                    ' user.',
                                                                                sub:
                                                                                    'Kupon ini dapat ditebus oleh ' +
                                                                                    voucher?.user_quota +
                                                                                    ' pengguna tercepat.',
                                                                            },
                                                                        min_transaction:
                                                                            {
                                                                                text:
                                                                                    'Minimum transaction is ' +
                                                                                    formatIDR(
                                                                                        voucher?.min_transaction
                                                                                    ) +
                                                                                    '.',
                                                                                sub:
                                                                                    'Transaksi minimum senilai ' +
                                                                                    formatIDR(
                                                                                        voucher?.min_transaction
                                                                                    ) +
                                                                                    '.',
                                                                            },
                                                                        discount_max_price:
                                                                            {
                                                                                text:
                                                                                    voucher.discount_type ==
                                                                                    'percent'
                                                                                        ? 'Maximum discount price is ' +
                                                                                          formatIDR(
                                                                                              voucher?.discount_max_price
                                                                                          ) +
                                                                                          '.'
                                                                                        : null,
                                                                                sub:
                                                                                    voucher.discount_type ==
                                                                                    'percent'
                                                                                        ? 'Potongan harga paling besar senilai ' +
                                                                                          formatIDR(
                                                                                              voucher?.discount_max_price
                                                                                          ) +
                                                                                          '.'
                                                                                        : null,
                                                                            },
                                                                        author: {
                                                                            text:
                                                                                auth_user.roles_id >
                                                                                0
                                                                                    ? voucher
                                                                                          .customer
                                                                                          .length +
                                                                                      ' customer has redeemed this voucher.'
                                                                                    : null,
                                                                            sub:
                                                                                auth_user.roles_id >
                                                                                0
                                                                                    ? 'This is only shown to staff of SEEO. Customer can not see this information.'
                                                                                    : null,
                                                                        },
                                                                        redeemed_user:
                                                                            {
                                                                                text:
                                                                                    auth_user.roles_id >
                                                                                    0
                                                                                        ? 'Created by ' +
                                                                                          voucher
                                                                                              .operational
                                                                                              .name +
                                                                                          ' at ' +
                                                                                          formatDate(
                                                                                              voucher.created_at
                                                                                          ) +
                                                                                          '.'
                                                                                        : null,
                                                                                sub:
                                                                                    auth_user.roles_id >
                                                                                    0
                                                                                        ? 'This is only shown to staff of SEEO. Customer can not see this information.'
                                                                                        : null,
                                                                            },
                                                                    }"
                                                                >
                                                                    <div
                                                                        class="d-inline"
                                                                    >
                                                                        <p
                                                                            class="mb-0"
                                                                        >
                                                                            {{
                                                                                item.text
                                                                            }}
                                                                        </p>
                                                                        <p
                                                                            class="mb-0 fst-italic text-secondary"
                                                                        >
                                                                            {{
                                                                                item.sub
                                                                            }}
                                                                        </p>
                                                                    </div>
                                                                </ul>
                                                            </li>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="d-flex">
                                                    <button
                                                        class="btn btn-sm btn-primary w-100"
                                                        :disabled="
                                                            voucher.customer
                                                                .length >
                                                            voucher.user_quota
                                                        "
                                                        @click="
                                                            voucher.customer
                                                                .length <=
                                                            voucher.user_quota
                                                                ? confirmation(
                                                                      route(
                                                                          'customer.redeem.voucher',
                                                                          voucher.id
                                                                      ),
                                                                      'Are you sure you want to redeem Voucher ' +
                                                                          voucher?.name.toUpperCase() +
                                                                          '?'
                                                                  )
                                                                : alertNotification(
                                                                      'This voucher has been redeemed by the maximum user quota.'
                                                                  )
                                                        "
                                                    >
                                                        {{ "Redeem" }}
                                                        <span
                                                            class="h6 my-auto ms-2 mb-0"
                                                            >{{
                                                                voucher?.point
                                                            }}</span
                                                        >
                                                        <i
                                                            class="ms-1 fa-solid fa-coins"
                                                        ></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </GuestLayout>

    <!-- Modal -->
    <!-- Add Menu Modal -->
    <div
        v-if="auth_user?.roles_id == 3"
        class="modal fade"
        id="addVoucherModal"
        tabindex="-1"
        aria-labelledby="addVoucherModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i class="fa-solid fa-ticket pe-2"></i>
                        {{ "New Voucher" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showAddVoucherModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <form @submit.prevent="handleAddVoucher()">
                    <div class="modal-body bg-light">
                        <transition
                            name="fade-slide-ltr"
                            @after-leave="
                                () => {
                                    active_tab = 2;
                                }
                            "
                        >
                            <div v-if="active_tab == 1">
                                <div class="d-flex">
                                    <span
                                        class="text-primary-emphasis mx-auto mb-2"
                                        >{{ "General Condition " }}</span
                                    >
                                </div>
                                <div class="row mt-0 justify-content-center">
                                    <div class="col-4 col-lg-3">
                                        <label
                                            for="voucher_name"
                                            class="form-label d-inline-block"
                                            >{{ "Name" }}</label
                                        >
                                    </div>
                                    <div class="col-8 col-lg-7">
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            id="voucher_name"
                                            v-model="form_add_voucher.name"
                                            required
                                        />
                                        <InputError
                                            :message="
                                                form_add_voucher.errors.name
                                            "
                                            class="mt-2"
                                        />
                                    </div>
                                </div>
                                <div class="row mt-2 justify-content-center">
                                    <div class="col-4 col-lg-3">
                                        <label
                                            for="voucher_code"
                                            class="form-label d-inline-block"
                                            >{{ "Code" }}</label
                                        >
                                    </div>
                                    <div class="col-8 col-lg-7">
                                        <input
                                            type="text"
                                            class="form-control form-control-sm"
                                            id="voucher_code"
                                            v-model="form_add_voucher.code"
                                            placeholder="e.g. VOUCHER123"
                                            required
                                        />
                                        <InputError
                                            :message="
                                                form_add_voucher.errors.code
                                            "
                                            class="mt-2"
                                        />
                                    </div>
                                </div>
                                <div class="row mt-2 justify-content-center">
                                    <div class="col-4 col-lg-3">
                                        <label
                                            for="voucher_point"
                                            class="form-label d-inline-block"
                                            >{{ "Point" }}</label
                                        >
                                    </div>
                                    <div class="col-8 col-lg-7">
                                        <input
                                            type="number"
                                            class="form-control form-control-sm"
                                            id="voucher_point"
                                            v-model="form_add_voucher.point"
                                            required
                                        />
                                        <InputError
                                            :message="
                                                form_add_voucher.errors.point
                                            "
                                            class="mt-2"
                                        />
                                    </div>
                                </div>
                                <div class="row mt-2 justify-content-center">
                                    <div class="col-4 col-lg-3">
                                        <label
                                            for="voucher_start"
                                            class="form-label d-inline-block"
                                            >{{ "Start Date" }}</label
                                        >
                                    </div>
                                    <div class="col-8 col-lg-7">
                                        <input
                                            type="date"
                                            class="form-control form-control-sm"
                                            id="voucher_start"
                                            v-model="
                                                form_add_voucher.start_date
                                            "
                                            required
                                        />
                                        <InputError
                                            :message="
                                                form_add_voucher.errors
                                                    .start_date
                                            "
                                            class="mt-2"
                                        />
                                    </div>
                                </div>
                                <div class="row mt-2 justify-content-center">
                                    <div class="col-4 col-lg-3">
                                        <label
                                            for="voucher_end"
                                            class="form-label d-inline-block"
                                            >{{ "End Date" }}</label
                                        >
                                    </div>
                                    <div class="col-8 col-lg-7">
                                        <input
                                            type="date"
                                            class="form-control form-control-sm"
                                            id="voucher_end"
                                            v-model="form_add_voucher.end_date"
                                            required
                                        />
                                        <InputError
                                            :message="
                                                form_add_voucher.errors.end_date
                                            "
                                            class="mt-2"
                                        />
                                    </div>
                                </div>
                                <div class="row mt-2 justify-content-center">
                                    <div class="col-4 col-lg-3">
                                        <label
                                            for="voucher_image"
                                            class="form-label d-inline-block"
                                            >{{ "Image" }}</label
                                        >
                                    </div>
                                    <div class="col-8 col-lg-7">
                                        <input
                                            type="file"
                                            class="form-control form-control-sm"
                                            id="voucher_image"
                                            @change="
                                                handleFileUploadVoucherImage
                                            "
                                            required
                                        />
                                        <span
                                            class="d-block text-secondary"
                                            style="font-size: 0.8rem"
                                            >{{ "Ratio = 1:1 " }}</span
                                        >
                                        <InputError
                                            :message="
                                                form_add_voucher.errors.image
                                            "
                                            class="mt-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </transition>
                        <transition
                            name="fade-slide-rtl"
                            @after-leave="
                                () => {
                                    active_tab = 1;
                                }
                            "
                        >
                            <div v-if="active_tab == 2">
                                <div class="d-flex">
                                    <span
                                        class="text-primary-emphasis mx-auto mb-2"
                                        >{{ "Specific Condition" }}</span
                                    >
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div
                                            class="card shadow-sm p-2 bg-white"
                                        >
                                            <div class="form-floating mb-2">
                                                <input
                                                    type="number"
                                                    class="form-control form-control-sm"
                                                    id="voucher_user_max_quota"
                                                    v-model="
                                                        form_add_voucher.user_quota
                                                    "
                                                    placeholder="10"
                                                />
                                                <label
                                                    for="voucher_user_max_quota"
                                                    >{{ "User Quota" }}
                                                    <InputError
                                                        :message="
                                                            form_add_voucher
                                                                .errors
                                                                .min_transaction
                                                        "
                                                        class="ms-2"
                                                /></label>
                                            </div>
                                            <div class="form-floating mb-2">
                                                <input
                                                    type="number"
                                                    class="form-control form-control-sm"
                                                    id="voucher_min_transaction"
                                                    v-model="
                                                        form_add_voucher.min_transaction
                                                    "
                                                    placeholder="10"
                                                />
                                                <label
                                                    for="voucher_min_transaction"
                                                    >{{
                                                        "Minimum Transaction (Rp)"
                                                    }}
                                                    <InputError
                                                        :message="
                                                            form_add_voucher
                                                                .errors
                                                                .min_transaction
                                                        "
                                                        class="ms-2"
                                                    />
                                                </label>
                                            </div>
                                            <div class="d-flex w-100">
                                                <button
                                                    @click="
                                                        () => {
                                                            form_add_voucher.discount_type =
                                                                '';
                                                        }
                                                    "
                                                    type="button"
                                                    :class="
                                                        'btn btn-outline-secondary btn-sm w-50 border-0 rounded-end-0 ' +
                                                        (form_add_voucher.discount_type ==
                                                        'price'
                                                            ? 'active'
                                                            : '')
                                                    "
                                                >
                                                    {{ "by Price" }}
                                                </button>
                                                <button
                                                    @click="
                                                        () => {
                                                            form_add_voucher.discount_type =
                                                                '';
                                                        }
                                                    "
                                                    type="button"
                                                    :class="
                                                        'btn btn-outline-secondary btn-sm w-50 border-0 rounded-start-0 ' +
                                                        (form_add_voucher.discount_type ==
                                                        'percent'
                                                            ? 'active'
                                                            : '')
                                                    "
                                                >
                                                    {{ "by Percent" }}
                                                </button>
                                            </div>
                                            <transition
                                                name="fade-slide-ltr"
                                                @after-leave="
                                                    () => {
                                                        form_add_voucher.discount_type =
                                                            'percent';
                                                    }
                                                "
                                            >
                                                <div
                                                    class="form-floating mt-2"
                                                    v-if="
                                                        form_add_voucher.discount_type ==
                                                        'price'
                                                    "
                                                >
                                                    <input
                                                        type="number"
                                                        class="form-control form-control-sm"
                                                        id="voucher_discount_price"
                                                        v-model="
                                                            form_add_voucher.discount_price
                                                        "
                                                    />
                                                    <label
                                                        for="voucher_discount_price"
                                                        >{{ "Price (Rp)" }}
                                                        <InputError
                                                            :message="
                                                                form_add_voucher
                                                                    .errors
                                                                    .discount_price
                                                            "
                                                            class="ms-2"
                                                        />
                                                    </label>
                                                </div>
                                            </transition>
                                            <transition
                                                name="fade-slide-rtl"
                                                @after-leave="
                                                    () => {
                                                        form_add_voucher.discount_type =
                                                            'price';
                                                    }
                                                "
                                            >
                                                <div
                                                    class="mt-2"
                                                    v-if="
                                                        form_add_voucher.discount_type ==
                                                        'percent'
                                                    "
                                                >
                                                    <div
                                                        class="form-floating mb-2"
                                                    >
                                                        <input
                                                            type="number"
                                                            class="form-control form-control-sm"
                                                            id="voucher_discount_percent"
                                                            v-model="
                                                                form_add_voucher.discount_percent
                                                            "
                                                        />
                                                        <label
                                                            for="voucher_discount_percent"
                                                            >{{ "Percent (%)" }}
                                                            <InputError
                                                                :message="
                                                                    form_add_voucher
                                                                        .errors
                                                                        .discount_percent
                                                                "
                                                                class="ms-2"
                                                            />
                                                        </label>
                                                    </div>
                                                    <div
                                                        class="form-floating mb-2"
                                                    >
                                                        <input
                                                            type="number"
                                                            class="form-control form-control-sm"
                                                            id="voucher_discount_max_price"
                                                            v-model="
                                                                form_add_voucher.discount_max_price
                                                            "
                                                        />
                                                        <label
                                                            for="voucher_discount_max_price"
                                                            >{{
                                                                "Maximum Discount (Rp)"
                                                            }}
                                                            <InputError
                                                                :message="
                                                                    form_add_voucher
                                                                        .errors
                                                                        .discount_max_price
                                                                "
                                                                class="ms-2"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <div class="modal-footer p-1">
                        <button
                            v-if="active_tab == 1"
                            type="button"
                            @click="
                                () => {
                                    active_tab = 0;
                                }
                            "
                            class="btn btn-sm btn-primary"
                            style="width: 10rem"
                        >
                            {{ "Next" }}
                            <i class="bi bi-chevron-right ms-2"></i>
                        </button>
                        <div class="d-flex w-100" v-if="active_tab == 2">
                            <button
                                type="button"
                                class="btn btn-sm btn-primary me-auto"
                                style="width: 10rem"
                                @click="
                                    () => {
                                        active_tab = 0;
                                    }
                                "
                            >
                                <i class="bi bi-chevron-left me-2"></i>
                                {{ "Back" }}
                            </button>
                            <button
                                type="submit"
                                class="btn btn-sm btn-primary"
                                style="width: 10rem"
                            >
                                <i class="bi bi-plus-lg me-2"></i>
                                {{ "Add Voucher" }}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
