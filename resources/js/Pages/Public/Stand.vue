<script setup>
import Notif from "@/Components/Notif.vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import { formatDate, formatDateSimple, formatIDR, showImage } from "@/utils";
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
    stand: Object,
    menu_group: Object,
    customer_voucher: Array,
    active_transaction: Object,
});
const auth_user = usePage().props.auth.user;
const title = ref("Stand " + props.stand.name);
const toastNotifRef = ref(null);
const modalConfirmationRef = ref(null);
const active_tab = ref(1);
const isLargeScreen = ref(window.innerWidth >= 1200);
const scrollY = ref(0);
const onScroll = () => {
    scrollY.value = window.scrollY;
};
const form_add_transaction = useForm({
    stand_id: props.stand.id,
    order_list: [],
    voucher_id: null,
    discount: null,
    transaction: null,
});
const order_list = ref(props.active_transaction?.order_list ?? []);
const total_price = computed(() => {
    return order_list.value.reduce((total, item) => {
        return total + item.price * item.qty;
    }, 0);
});
const total_item = computed(() => {
    return order_list.value.reduce((total, item) => {
        return total + Number(item.qty);
    }, 0);
});
const discount = computed(() => {
    const voucher = props.customer_voucher.find(
        (voucher) => voucher.id == form_add_transaction.voucher_id
    );
    if (voucher?.discount_percent) {
        const discountedPrice =
            (total_price.value * voucher?.discount_percent) / 100;

        return discountedPrice > voucher.discount_max_price
            ? voucher.discount_max_price
            : discountedPrice;
    } else if (voucher?.discount_price) {
        return voucher?.discount_price;
    }
});
const order_type = computed(() => {
    if (props.stand.type == 0) {
        return "Now";
    } else if (props.stand.type == 1) {
        return "Pre-Order";
    } else if (props.stand.type == 2) {
        return "Now / Pre-Order";
    }
});
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
function handlePayment() {
    form_add_transaction.order_list = order_list.value;
    form_add_transaction.discount = discount.value;
    form_add_transaction.transaction =
        total_price.value - (discount.value ?? 0);

    form_add_transaction.post(route("shop.checkout"), {
        onError: (e) => {
            for (let key in e) {
                toastNotifRef.value.showToast("warning", e[key]);
            }
        },
    });
}
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
    form_add_transaction.voucher_id =
        props.active_transaction?.voucher_id ?? null;
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
watch(
    () => total_price.value,
    (newValue) => {
        const total = newValue;
        const voucher = props.customer_voucher.find(
            (item) => item.id == form_add_transaction.voucher_id
        );
        if (total < voucher?.min_transaction) {
            toastNotifRef.value.showToast("warning", [
                "Subtotal is less than minimum transaction.",
            ]);
            setTimeout(() => {
                form_add_transaction.voucher_id = null;
                toastNotifRef.value.showToast("warning", ["Voucher removed."]);
            }, 1000);
        }
    }
);
</script>

<template>
    <GuestLayout>
        <!-- Page Layout -->
        <Head :title="title" />
        <!-- Modal Box -->
        <ModalConfirmation ref="modalConfirmationRef" />
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

                    <span class="h5 my-auto">
                        <i class="bi bi-shop me-0 d-inline d-lg-inline"></i>
                        {{ "Stand " + stand.name }}</span
                    >
                </div>
            </div>
        </div>
        <!-- Content -->
        <div class="container pb-5" style="min-height: 100vh; margin-top: 8rem">
            <div class="row g-4">
                <div class="col-12 d-block d-xl-none">
                    <div class="d-flex bg-white shadow-sm p-2 mb-2">
                        <button
                            :class="
                                'btn btn-sm btn-outline-primary border-0 w-50 me-2 ' +
                                (active_tab == 1 ? 'active' : '')
                            "
                            @click="active_tab = 0"
                        >
                            <i class="fa-solid fa-utensils me-1"></i>
                            {{ "Menu" }}
                        </button>
                        <button
                            :class="
                                'btn btn-sm btn-outline-primary border-0 w-50 ' +
                                (active_tab == 2 ? 'active' : '')
                            "
                            @click="active_tab = 0"
                        >
                            <i class="bi bi-cart4 me-1"></i>
                            <span class="position-relative">
                                {{ "Cart" }}
                            </span>
                            <span
                                v-if="order_list.length > 0 && active_tab != 2"
                                class="bg-danger text-white rounded-2 ms-2"
                                style="
                                    font-size: 0.7rem;
                                    padding: 0.1rem 0.5rem;
                                "
                            >
                                {{ order_list.length }}
                            </span>
                        </button>
                    </div>
                </div>
                <transition name="fade-slide-ltr" @after-leave="active_tab = 2">
                    <div
                        class="col-12 col-xl-8"
                        v-if="active_tab == 1 || isLargeScreen"
                    >
                        <div class="card bg-white shadow-sm p-0">
                            <div class="d-flex shadow-sm">
                                <span class="text-secondary m-3">
                                    <i class="fa-solid fa-utensils me-2"></i>
                                    {{ "Menu List" }}
                                </span>
                                <span
                                    class="text-secondary ms-auto me-3 my-auto"
                                    style="font-size: 0.8rem"
                                    >{{ "order type :" }}

                                    <span class="ms-1 fw-bold">
                                        {{ order_type }}
                                    </span>
                                </span>
                            </div>
                            <div
                                class="scroll-container-lg-5 scroll-container-4 scroll-thumb-warning pe-1"
                            >
                                <div
                                    class="d-flex w-100 p-2"
                                    v-if="order_list.length == 0"
                                >
                                    <span
                                        class="text-secondary fst-italic mx-auto"
                                        >{{
                                            auth_user
                                                ? "Click on the menu to add to cart"
                                                : "Please login to add menu to cart"
                                        }}</span
                                    >
                                </div>
                                <li
                                    class="list-group list-group-flush"
                                    v-for="(menu_list, key) in menu_group"
                                >
                                    <ul
                                        class="list-group-item mb-0 bg-warning bg-opacity-10"
                                    >
                                        <span class="text-warning-emphasis">{{
                                            key
                                        }}</span>
                                    </ul>
                                    <ul
                                        :class="
                                            'list-group-item list-group-item-action px-2 py-1 mb-0 ' +
                                            (item.sale < item.stock
                                                ? ''
                                                : 'bg-secondary bg-opacity-10')
                                        "
                                        v-for="item in menu_list"
                                        @click="
                                            () => {
                                                if (auth_user) {
                                                    if (
                                                        item.sale < item.stock
                                                    ) {
                                                        if (
                                                            order_list.find(
                                                                (order) =>
                                                                    order.id ==
                                                                    item.id
                                                            )
                                                        ) {
                                                            order_list.find(
                                                                (order) =>
                                                                    order.id ==
                                                                    item.id
                                                            ).qty++;
                                                        } else {
                                                            order_list.push({
                                                                id: item.id,
                                                                name: item.name,
                                                                price: item.price,
                                                                image: item.image,
                                                                qty: 1,
                                                            });
                                                        }
                                                    } else {
                                                        toastNotifRef.showToast(
                                                            'info',
                                                            'Sorry for the incovenience, ' +
                                                                item.name +
                                                                ' is Out of Stock. '
                                                        );
                                                        toastNotifRef.showToast(
                                                            'info',
                                                            'We appreciate you enthusiasm. We`ll add more stock next time!'
                                                        );
                                                    }
                                                } else {
                                                    confirmation(
                                                        route('post.login'),
                                                        'Please login to add menu to cart'
                                                    );
                                                }
                                            }
                                        "
                                    >
                                        <div class="text-nowrap p-1">
                                            <div
                                                class="rounded-3 d-inline-block float-start"
                                                :style="{
                                                    width: isLargeScreen
                                                        ? '20%'
                                                        : '30%',
                                                }"
                                            >
                                                <img
                                                    :src="
                                                        item.image
                                                            ? '/storage/images/shop/foods/menu/' +
                                                              item.image
                                                            : '/storage/images/shop/foods/menu/default.png'
                                                    "
                                                    alt="image"
                                                    class="placeholder img-fluid rounded"
                                                    @load="showImage"
                                                    style="aspect-ratio: 1"
                                                />
                                            </div>
                                            <div
                                                class="ps-2 d-inline-block"
                                                :style="{
                                                    width: isLargeScreen
                                                        ? '80%'
                                                        : '70%',
                                                }"
                                            >
                                                <div class="d-flex">
                                                    <div
                                                        class="scroll-x-hidden me-2 my-auto"
                                                    >
                                                        <div class="d-flex">
                                                            <span
                                                                class="text-primary-emphasis text-nowrap me-1"
                                                                >{{
                                                                    item.name
                                                                }}</span
                                                            >
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span
                                                        class="text-secondary d-inline-block my-auto"
                                                        style="
                                                            width: 60px;
                                                            font-size: 0.8rem;
                                                        "
                                                        >{{ "Price" }}</span
                                                    >
                                                    <span>{{ ":" }}</span>

                                                    <span class="ms-1 h6">{{
                                                        formatIDR(item.price)
                                                    }}</span>
                                                </div>
                                                <div class="">
                                                    <span
                                                        class="text-secondary d-inline-block my-auto"
                                                        style="
                                                            width: 60px;
                                                            font-size: 0.8rem;
                                                        "
                                                        >{{ "Detail" }}</span
                                                    >
                                                    <span
                                                        class="text-secondary d-inline-block text-nowrap"
                                                    >
                                                        {{ ":" }}
                                                        {{
                                                            (!(
                                                                item.volume > 0
                                                            ) &&
                                                            !(item.mass > 0)
                                                                ? "- "
                                                                : "") +
                                                            (item.volume > 0
                                                                ? item.volume +
                                                                  item.volume_unit +
                                                                  " "
                                                                : "") +
                                                            (item.volume > 0 &&
                                                            item.mass > 0
                                                                ? "- "
                                                                : "") +
                                                            (item.mass > 0
                                                                ? item.mass +
                                                                  item.mass_unit +
                                                                  " "
                                                                : "")
                                                        }}</span
                                                    >
                                                </div>

                                                <div class="d-block">
                                                    <span
                                                        class="text-secondary d-inline-block my-auto"
                                                        style="
                                                            width: 60px;
                                                            font-size: 0.8rem;
                                                        "
                                                        >{{ "Taste" }}</span
                                                    >
                                                    <span>{{ ":" }}</span>

                                                    <div
                                                        class="d-inline-flex me-5"
                                                        style="flex-wrap: wrap"
                                                    >
                                                        <span
                                                            class="py-0 px-2 ms-2 mb-2 rounded-1 bg-secondary bg-opacity-10 text-secondary d-inline-block border-0"
                                                            v-for="tag in item.tags"
                                                            :style="{
                                                                borderWidth:
                                                                    '1px',
                                                                borderStyle:
                                                                    'solid',
                                                                fontSize:
                                                                    '0.8rem',
                                                            }"
                                                            >{{
                                                                tag.name
                                                            }}</span
                                                        >
                                                        <span
                                                            v-if="
                                                                item.tags
                                                                    .length == 0
                                                            "
                                                            class="py-0 px-2 ms-2 rounded-1 border-secondary text-secondary mb-2"
                                                            :style="{
                                                                borderWidth:
                                                                    '1px',
                                                                borderStyle:
                                                                    'solid',
                                                                fontSize:
                                                                    '0.8rem',
                                                            }"
                                                            >{{ "None" }}</span
                                                        >
                                                    </div>
                                                </div>
                                                <div class="">
                                                    <span
                                                        class="text-secondary d-inline-block"
                                                        style="
                                                            width: 60px;
                                                            font-size: 0.8rem;
                                                        "
                                                        >{{ "Sold " }}</span
                                                    >
                                                    <span
                                                        class="text-dark my-auto text-nowrap"
                                                    >
                                                        {{ ": " + item.sale }}
                                                    </span>
                                                    <div
                                                        :class="
                                                            'card bg-opacity-10 px-2 d-inline-block float-end bg-' +
                                                            (item.sale <
                                                            item.stock
                                                                ? 'warning'
                                                                : 'secondary')
                                                        "
                                                    >
                                                        <span
                                                            :class="
                                                                'text-' +
                                                                (item.sale <
                                                                item.stock
                                                                    ? 'secondary'
                                                                    : 'primary')
                                                            "
                                                            style="
                                                                font-size: 0.8rem;
                                                            "
                                                            >{{
                                                                item.sale <
                                                                item.stock
                                                                    ? "Ready Stock"
                                                                    : "Out of Stock"
                                                            }}</span
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </li>
                            </div>
                        </div>
                    </div>
                </transition>
                <transition name="fade-slide-rtl" @after-leave="active_tab = 1">
                    <div
                        class="col-12 col-xl-4"
                        v-if="active_tab == 2 || isLargeScreen"
                    >
                        <div class="card bg-white shadow-sm p-3">
                            <div
                                class="d-flex border-bottom border-2 border-primary mb-3 pb-1"
                            >
                                <span class="h6 text-primary-emphasis mx-auto">
                                    <i class="bi bi-cart4 me-0"></i>
                                    {{ "My Order" }}
                                </span>
                            </div>
                            <div
                                class="d-flex w-100 p-2"
                                v-if="order_list.length == 0"
                            >
                                <span
                                    class="text-secondary fst-italic mx-auto"
                                    >{{
                                        auth_user
                                            ? "Click on the menu to add to cart"
                                            : "Please login to add menu to cart"
                                    }}</span
                                >
                            </div>
                            <div
                                class="scroll-container-lg-3 scroll-container-3 scroll-thumb-warning pe-1"
                            >
                                <li class="list-group list-group-flush">
                                    <ul
                                        class="list-group-item list-group-item-action px-0 py-1 mb-0"
                                        v-for="(item, index) in order_list"
                                    >
                                        <div class="w-25 float-start">
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
                                        <div class="w-75 float-end ps-3">
                                            <span
                                                class="d-block text-primary-emphasis"
                                                >{{ item.name }}</span
                                            >
                                            <div class="">
                                                <span
                                                    class="d-inline-block text-secondary my-auto"
                                                    style="
                                                        width: 60px;
                                                        font-size: 0.8rem;
                                                    "
                                                    >{{ "Price" }}</span
                                                >
                                                <span class="">{{
                                                    ": " + formatIDR(item.price)
                                                }}</span>
                                            </div>
                                            <div class="">
                                                <span
                                                    class="d-inline-block text-secondary my-auto"
                                                    style="
                                                        width: 60px;
                                                        font-size: 0.8rem;
                                                    "
                                                    >{{ "Total" }}</span
                                                >
                                                <span class="h6">{{
                                                    ": " +
                                                    formatIDR(
                                                        item.price * item.qty
                                                    )
                                                }}</span>
                                            </div>
                                            <div class="d-flex">
                                                <button
                                                    class="btn btn-sm btn-outline-primary border-0 py-0 ms-auto"
                                                    @click="
                                                        if (item.qty > 1) {
                                                            item.qty--;
                                                        } else {
                                                            order_list.splice(
                                                                index,
                                                                1
                                                            );
                                                        }
                                                    "
                                                >
                                                    <i
                                                        :class="
                                                            'bi bi-' +
                                                            (item.qty > 1
                                                                ? 'dash'
                                                                : 'trash3')
                                                        "
                                                    ></i>
                                                </button>
                                                <span
                                                    class="d-inline block bg-warning bg-opacity-10 px-2 text-warning-emphasis h6 mb-0"
                                                >
                                                    {{ item.qty }}
                                                </span>
                                                <button
                                                    class="btn btn-sm btn-outline-primary border-0 py-0"
                                                    @click="item.qty++"
                                                >
                                                    <i
                                                        :class="'bi bi-plus'"
                                                    ></i>
                                                </button>
                                            </div>
                                        </div>
                                    </ul>
                                </li>
                            </div>
                        </div>
                        <div class="card bg-white shadow-sm p-3 mt-4">
                            <div class="d-flex">
                                <span class="text-secondary">
                                    {{
                                        "Subtotal ( " +
                                        total_item +
                                        (total_item > 1 ? " items" : " item") +
                                        " )"
                                    }}
                                </span>
                                <span class="ms-auto">
                                    {{ formatIDR(total_price ?? 0) }}
                                </span>
                            </div>
                            <div class="d-flex mt-2">
                                <span class="text-secondary my-auto">
                                    {{ "Voucher" }}
                                </span>
                                <div
                                    class="bg-warning bg-opacity-10 ms-auto rounded"
                                >
                                    <button
                                        :disabled="!auth_user"
                                        data-bs-toggle="modal"
                                        data-bs-target="#voucherModal"
                                        type="button"
                                        class="btn btn-sm card-bg-hover-warning text-warning-emphasis border-0 p-1 px-2 px-1"
                                    >
                                        <span class="">{{
                                            customer_voucher.find(
                                                (item) =>
                                                    item.id ==
                                                    form_add_transaction.voucher_id
                                            )?.code ?? "Click here"
                                        }}</span>
                                        <i
                                            class="fa-solid fa-ticket ms-2 rounded"
                                        ></i>
                                    </button>
                                </div>
                            </div>
                            <div class="d-flex mt-2">
                                <span class="text-secondary">
                                    {{ "Discount" }}
                                </span>
                                <span class="ms-auto">
                                    {{ formatIDR(discount ?? 0) }}</span
                                >
                            </div>
                            <div
                                class="d-flex mt-2 rounded bg-warning bg-opacity-25 p-1"
                            >
                                <button
                                    :disabled="
                                        !auth_user || order_list.length == 0
                                    "
                                    class="btn btn-sm btn-warning w-50"
                                    @click="
                                        auth_user && order_list.length > 0
                                            ? handlePayment()
                                            : null
                                    "
                                >
                                    <span class="h6 mb-0">
                                        <i class="bi bi-cart-check me-1"></i>
                                        {{ "Checkout" }}
                                    </span>
                                </button>
                                <span
                                    class="h6 my-auto ms-auto text-warning-emphasis"
                                >
                                    {{
                                        formatIDR(total_price - (discount ?? 0))
                                    }}
                                </span>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </GuestLayout>

    <!-- Modal -->
    <!-- Use Voucher Modal -->
    <div
        class="modal fade"
        id="voucherModal"
        tabindex="-1"
        aria-labelledby="voucherModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i class="fa-solid fa-ticket pe-2"></i>
                        {{ "Available Voucher" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        data-bs-dismiss="modal"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="modal-body bg-light rounded-bottom p-0">
                    <div class="d-flex">
                        <div
                            class="scroll-container-4 scroll-container-lg-4 px-3 pt-3"
                        >
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
                                        transform: 'translate(-50%, -50%)',
                                    }"
                                ></div>
                                <div
                                    class="d-block border-secondary-subtle rounded-3 border-0 bg-primary bg-opacity-25 my-2 mx-4 w-100 py-2 px-3"
                                >
                                    <img
                                        :src="
                                            '/storage/images/shop/voucher/' +
                                            (voucher?.image ?? 'default.png')
                                        "
                                        class="rounded-3 my-auto"
                                        alt="Ticket Image"
                                        :style="{
                                            aspectRatio: '1/1',
                                            width: '100%',
                                            minWidth: '90px',
                                            backgroundSize: 'cover',
                                        }"
                                    />
                                    <div
                                        class="rounded bg-white p-3"
                                        :style="{
                                            width: '100%',
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
                                                style="font-size: 0.8rem"
                                            >
                                                {{ "PROMO : " }}
                                                <span
                                                    class="h6 mb-0"
                                                    style="font-size: 0.8rem"
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
                                                style="font-size: 0.8rem"
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
                                                    style="font-size: 0.8rem"
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
                                                    style="font-size: 0.8rem"
                                                >
                                                    <li
                                                        class="list-group list-group-flush"
                                                    >
                                                        <ul
                                                            class="list-group-item list-group-item-action mb-0 py-1"
                                                            v-for="(
                                                                item, key
                                                            ) in {
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
                                                                <p class="mb-0">
                                                                    {{
                                                                        item.text
                                                                    }}
                                                                    <i
                                                                        v-if="
                                                                            key ==
                                                                                'min_transaction' &&
                                                                            total_price <
                                                                                voucher?.min_transaction
                                                                        "
                                                                        class="bi bi-exclamation-circle-fill text-danger rounded-circle p-0"
                                                                    ></i>
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
                                                data-bs-dismiss="modal"
                                                :class="
                                                    'btn btn-sm ' +
                                                    (total_price <
                                                    voucher?.min_transaction
                                                        ? 'disabled '
                                                        : ' ') +
                                                    (form_add_transaction?.voucher_id ==
                                                    voucher?.id
                                                        ? 'w-75 btn-success '
                                                        : 'w-100 btn-primary ')
                                                "
                                                @click="
                                                    () => {
                                                        form_add_transaction.voucher_id =
                                                            voucher.id;
                                                        toastNotifRef.showToast(
                                                            'info',
                                                            'Voucher applied!'
                                                        );
                                                    }
                                                "
                                            >
                                                {{
                                                    form_add_transaction.voucher_id ==
                                                    voucher.id
                                                        ? "Applied"
                                                        : "Use Voucher"
                                                }}
                                            </button>
                                            <button
                                                v-if="
                                                    form_add_transaction?.voucher_id ==
                                                    voucher?.id
                                                "
                                                @click="
                                                    () => {
                                                        form_add_transaction.voucher_id =
                                                            null;
                                                        toastNotifRef.showToast(
                                                            'warning',
                                                            'Voucher canceled'
                                                        );
                                                    }
                                                "
                                                class="btn btn-sm btn-outline-secondary w-25 ms-2"
                                            >
                                                {{ "Cancel" }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="mb-5 mt-3"
                                v-if="!(customer_voucher?.length > 0)"
                            >
                                <div class="d-flex">
                                    <span class="text-secondary mx-auto">
                                        {{ "No voucher available" }}
                                    </span>
                                </div>
                                <div class="d-flex">
                                    <span
                                        class="text-secondary mx-auto fst-italic"
                                        style="font-size: 0.8rem"
                                    >
                                        {{ "Redeem voucher using points" }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
