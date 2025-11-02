<script setup>
import Notif from "@/Components/Notif.vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import ModalAlertNotification from "@/Components/ModalAlertNotification.vue";
import { formatDate, formatDateSimple, formatIDR, showImage } from "@/utils";
import { Head, router, useForm, usePage } from "@inertiajs/vue3";
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
    notif: Object,
    stand_list: Array,
    active_order_list: Array,
    finished_order_list: Array,
});
const auth_user = usePage().props.auth.user;
const toastNotifRef = ref(null);
const modalConfirmationRef = ref(null);
const modalAlertNotificationRef = ref(null);
const active_tab = ref(1);
const active_history_tab = ref(1);
const prev_tab = ref(0);
const next_tab = ref(0);
const title = ref("Shop");
const linkIntroRef = ref();
const linkShop1 = ref();
const linkShop2 = ref();
const linkProfileRef = ref();

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

const form_add_feedback = useForm({
    rate: 0,
    feedback: null,
});

const stand_type = [
    { value: 0, name: "Live" },
    { value: 1, name: "Pre-Order" },
    { value: 2, name: "Live and Pre-Order" },
];

const isLargeScreen = ref(window.innerWidth >= 1200);
const handleResize = () => {
    isLargeScreen.value = window.innerWidth >= 768;
    window.addEventListener("resize", handleResize);
};
function handleAddFeedback() {
    form_add_feedback.post(route("customer.feedback.add"), {
        onError: (e) => {
            for (i = 0; i < e.length; i++) {
                toastNotifRef.value.showToast("warning", e);
            }
        },
    });
}
function redirectToStand(id) {
    return document.getElementById("linkStand" + id).click();
}
function setTab(tab) {
    prev_tab.value = active_tab.value;
    next_tab.value = tab;
    active_tab.value = 0;
}
function proceedTab() {
    active_tab.value = next_tab.value;
}
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
        <Head :title="title" :icon="'/storage/local/images/apps/logo.png'" />
        <!-- Modal Box -->
        <ModalConfirmation ref="modalConfirmationRef" />
        <ModalAlertNotification ref="modalAlertNotificationRef" />
        <!-- Header -->
        <div
            class="card rounded-0 bg-warning bg-opacity-50 position-fixed start-50 translate-middle-x z-3"
            :style="headerStyle"
        >
            <button
                class="btn btn-light shadow-lg text-start p-2 mx-auto"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
            >
                <div class="d-flex">
                    <div
                        class="d-flex border-end border-primary-subtle border-2 pe-1 me-2"
                    >
                        <img
                            src="/storage/local/images/shop/brand/blaterian_logo.png"
                            alt="image"
                            style="height: 2.5rem"
                            class="my-auto"
                        />
                        <img
                            src="/storage/local/images/shop/brand/blaterian_text.png"
                            alt="image"
                            class="my-auto"
                            style="height: 2.5rem"
                        />
                    </div>
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
                    <div class="px-2 d-none d-xl-block">
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
            </button>
        </div>
        <!-- Offcanvas -->
        <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
        >
            <div class="offcanvas-header border-bottom shadow-sm">
                <div class="d-flex">
                    <img
                        :src="
                            '/storage/images/profile/' +
                            (auth_user?.profile_image ?? 'example.png')
                        "
                        alt="image"
                        class="rounded img-fluid object-fit-cover placeholder"
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
                <button
                    type="button"
                    class="btn btn-sm btn-outline-warning border-0 ms-auto"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                >
                    {{ "Close" }}
                    <i class="bi bi-chevron-right"></i>
                </button>
            </div>
            <div class="offcanvas-body">
                <ul class="list-group list-group-flush">
                    <li
                        class="list-group-item list-group-item-action"
                        @click="
                            () => {
                                linkIntroRef.click();
                            }
                        "
                    >
                        <a ref="linkIntroRef" :href="route('intro')"></a>
                        <div class="d-flex fs-5">
                            <i class="bi bi-house me-2"></i>
                            {{ "Home" }}
                        </div>
                    </li>
                    <li
                        v-if="auth_user"
                        class="list-group-item list-group-item-action"
                        @click="
                            () => {
                                linkProfileRef.click();
                            }
                        "
                    >
                        <a
                            ref="linkProfileRef"
                            :href="route('customer.profile')"
                        ></a>
                        <div class="d-flex fs-5">
                            <i class="bi bi-person me-2"></i>
                            {{ "Profile" }}
                        </div>
                    </li>
                    <li class="list-group-item list-group-item-action">
                        <div class="d-flex fs-5">
                            <i class="bi bi-question-circle me-2"></i>
                            {{ "FAQ" }}
                        </div>
                    </li>
                </ul>
                <div class="d-flex mt-3">
                    <button
                        v-if="auth_user"
                        class="btn btn-warning w-100"
                        @click="
                            confirmation(
                                route('logout'),
                                'Are you sure you want to logout?'
                            )
                        "
                    >
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        {{ "Logout" }}
                    </button>
                    <div
                        v-if="!auth_user"
                        class="d-flex rounded border border-warning w-100"
                    >
                        <a
                            :href="route('login')"
                            class="btn btn-warning w-50 rounded-end-0 border-0"
                        >
                            <i class="fa-solid fa-arrow-right-to-bracket"></i>
                            {{ "Login" }}
                        </a>
                        <a
                            :href="route('register')"
                            class="btn btn-warning w-50 rounded-start-0 border-0"
                        >
                            <i class="fa-solid fa-user-plus"></i>
                            {{ "Register" }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Tab Content -->
        <div class="container" style="margin-bottom: 4rem; margin-top: 8rem">
            <!-- FnB Tab -->
            <transition name="fade-slide-ltr" @after-leave="proceedTab()">
                <div v-if="active_tab == 1">
                    <div class="row g-4">
                        <div class="col-xl-4 col-lg-5 col-12">
                            <div class="card shadow-sm p-1">
                                <div
                                    class="scroll-container-horizontal scroll-container-horizontal-lg pb-1"
                                >
                                    <img
                                        src="/storage/images/billboard/Billboard_1741771637.png"
                                        alt=""
                                        class="img-fluid rounded w-100 me-2"
                                    />
                                    <img
                                        src="/storage/images/billboard/Billboard_1741771637.png"
                                        alt=""
                                        class="img-fluid rounded w-100 me-2"
                                    />
                                </div>
                            </div>
                            <div class="row g-4 mt-0">
                                <div class="col-12 col-md-7 col-lg-12">
                                    <div
                                        class="card shadow-sm p-3"
                                        @click="
                                            () => {
                                                if (auth_user) {
                                                    router.visit(
                                                        route('shop.promotion')
                                                    );
                                                } else {
                                                    toastNotifRef.showToast(
                                                        'warning',
                                                        'Please login to redeem the voucher.'
                                                    );
                                                }
                                            }
                                        "
                                    >
                                        <div class="d-flex">
                                            <div class="w-50">
                                                <span
                                                    class="h6 text-primary-emphasis d-block mb-0"
                                                    >{{ "My Points" }}</span
                                                >
                                                <span class="h3 text-warning">
                                                    <i
                                                        class="fa-solid fa-coins fs-5"
                                                    ></i>
                                                    {{ auth_user ? 0 : 0 }}
                                                </span>
                                            </div>
                                            <div
                                                class="border border-start border-primary-subtle mx-3"
                                            ></div>
                                            <div class="w-50">
                                                <span
                                                    class="h6 text-primary-emphasis d-block mb-0"
                                                    >{{ "My Vouchers" }}</span
                                                >
                                                <span class="h3 text-warning">
                                                    <i
                                                        class="fa-solid fa-ticket fs-5"
                                                    ></i>
                                                    {{ auth_user ? 0 : 0 }}
                                                </span>
                                            </div>
                                        </div>
                                        <span
                                            class="text-secondary fst-italic mt-2"
                                            style="font-size: 0.8rem"
                                            >{{
                                                auth_user
                                                    ? "Woo-hoo! You have point, let`s redeem the voucher and get the discount! "
                                                    : "Create an account, collect the points and redeem the voucher!"
                                            }}</span
                                        >
                                    </div>
                                </div>
                                <div class="col-12 col-md-5 col-lg-12">
                                    <div class="card shadow-sm p-3">
                                        <div
                                            class="d-flex border-bottom border-primary border-2 pb-1"
                                        >
                                            <i
                                                class="bi bi-chat-dots text-primary-emphasis me-2 ms-auto"
                                            ></i>
                                            <span
                                                class="h6 text-primary-emphasis me-auto my-auto"
                                                >{{ "Rate & Feedback" }}</span
                                            >
                                        </div>
                                        <span
                                            class="d-block text-secondary mt-2"
                                            style="font-size: 0.8rem"
                                            >{{ "Rate" }}</span
                                        >
                                        <div class="d-flex mt-0 w-100">
                                            <div
                                                class="d-flex"
                                                style="width: 20%"
                                                v-for="i in 5"
                                                @click="
                                                    () => {
                                                        if (auth_user) {
                                                            form_add_feedback.rate =
                                                                i;
                                                        } else {
                                                            toastNotifRef.showToast(
                                                                'warning',
                                                                'We love to hear your feedback. Please login first to submit feedback.'
                                                            );
                                                        }
                                                    }
                                                "
                                            >
                                                <i
                                                    :class="
                                                        'bi text-warning fs-5 d-block card-bg-hover-warning text-center px-2 rounded-circle mx-auto bi-' +
                                                        (form_add_feedback.rate >=
                                                        i
                                                            ? 'star-fill'
                                                            : 'star')
                                                    "
                                                ></i>
                                            </div>
                                        </div>
                                        <span
                                            for="input_feedback"
                                            class="d-block text-secondary mt-2"
                                            style="font-size: 0.8rem"
                                            >{{ "Feedback" }}</span
                                        >
                                        <textarea
                                            class="form-control mt-2"
                                            id="input_feedback"
                                            style="height: 80px"
                                            :placeholder="
                                                auth_user
                                                    ? 'Help us serve you better, with give us your honest review.'
                                                    : null
                                            "
                                            v-model="form_add_feedback.feedback"
                                            :disabled="!auth_user"
                                        ></textarea>

                                        <button
                                            @click="
                                                auth_user
                                                    ? handleAddFeedback()
                                                    : alertNotification(
                                                          'We love to hear your feedback. Please login first to submit feedback.'
                                                      )
                                            "
                                            type="button"
                                            class="btn btn-warning w-100 btn-sm mt-2"
                                            :disabled="!auth_user"
                                        >
                                            {{ "Submit" }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-8 col-lg-7 col-12">
                            <div class="card shadow-sm p-3">
                                <p
                                    class="h6 text-primary-emphasis mb-0 border-bottom border-primary border-2 pb-2"
                                >
                                    <i class="bi bi-shop me-1"></i>
                                    {{ "Available Stand" }}
                                </p>
                                <div
                                    class="scroll-container-4 scroll-container-lg-4 scroll-thumb-warning pe-2 mt-3"
                                >
                                    <div
                                        v-for="stand in stand_list"
                                        class="card-bg-hover-warning p-1 mb-4"
                                        @click="redirectToStand(stand.id)"
                                    >
                                        <a
                                            :id="'linkStand' + stand.id"
                                            :href="
                                                route('shop.stand', stand.id)
                                            "
                                        ></a>
                                        <p class="mb-0 d-flex">
                                            <span
                                                class="text-warning-emphasis h6"
                                            >
                                                {{ "Stand " + stand.name }}
                                            </span>
                                            <span
                                                style="font-size: 0.8rem"
                                                class="ms-auto text-primary text-nowrap me-2"
                                                >{{
                                                    stand_type.find(
                                                        (item) =>
                                                            item.value ==
                                                            stand.type
                                                    ).name
                                                }}</span
                                            >
                                        </p>
                                        <div class="d-flex">
                                            <span
                                                class="text-secondary"
                                                style="font-size: 0.8rem"
                                            >
                                                <i
                                                    class="fa-solid fa-utensils text-body-tertiary me-1"
                                                ></i>
                                                {{ "Menu" }}
                                            </span>
                                        </div>
                                        <div class="row g-2">
                                            <div class="col-xl-11 col-10">
                                                <div class="w-100">
                                                    <div
                                                        class="scroll-container-horizontal scroll-container-horizontal-lg scroll-thumb-warning py-1 mt-1 bg-warning bg-opacity-25 rounded"
                                                    >
                                                        <div
                                                            class="card card-bg-hover shadow-sm d-inline-block p-0 ms-2 me-2 rounded"
                                                            v-for="menu in stand.menu.slice(
                                                                0,
                                                                7
                                                            )"
                                                        >
                                                            <img
                                                                :src="
                                                                    menu.image
                                                                        ? '/storage/images/shop/foods/menu/' +
                                                                          menu.image
                                                                        : '/storage/local/images/shop/foods/menu/default.png'
                                                                "
                                                                alt=""
                                                                class="rounded-top placeholder m-1"
                                                                style="
                                                                    width: 120px;
                                                                    height: 120px;
                                                                "
                                                                @load="
                                                                    showImage
                                                                "
                                                            />
                                                            <div
                                                                class="d-flex px-2"
                                                            >
                                                                <div
                                                                    class="scroll-x-hidden"
                                                                    style="
                                                                        width: 104px;
                                                                    "
                                                                >
                                                                    <span
                                                                        class="text-nowrap text-dark"
                                                                        style="
                                                                            font-size: 0.8rem;
                                                                        "
                                                                        >{{
                                                                            menu.name
                                                                        }}</span
                                                                    >
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="d-flex px-2"
                                                            >
                                                                <span
                                                                    class="text-secondary"
                                                                    style="
                                                                        font-size: 0.8rem;
                                                                    "
                                                                    >{{
                                                                        formatIDR(
                                                                            menu.price
                                                                        )
                                                                    }}</span
                                                                >
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-1 col-2">
                                                <div class="w-100">
                                                    <div class="d-flex">
                                                        <i
                                                            class="bi bi-chevron-compact-right text-body-tertiary my-auto fs-1 mt-5 mx-auto"
                                                        ></i>
                                                    </div>
                                                    <div class="d-flex">
                                                        <span
                                                            class="mx-auto text-secondary"
                                                            style="
                                                                font-size: 0.8rem;
                                                            "
                                                            >{{ "More" }}</span
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="d-flex"
                                        v-if="stand_list.length == 0"
                                    >
                                        <div class="mx-auto">
                                            <span
                                                class="fs-1 text-body-tertiary d-block"
                                            >
                                                {{
                                                    "Oops! No available stand."
                                                }}
                                            </span>
                                            <span class="text-secondary d-block"
                                                >{{
                                                    "We are searching new recipe for you..."
                                                }}
                                                <i
                                                    class="fa-solid fa-comment-dots"
                                                ></i
                                            ></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <!-- History Tab -->
            <transition name="fade-slide-rtl" @after-leave="proceedTab()">
                <div v-if="active_tab == 2 && auth_user">
                    <div class="row g-4">
                        <div class="col-12 d-lg-none">
                            <div class="d-flex bg-white shadow-sm p-1">
                                <button
                                    @click="active_history_tab = 0"
                                    :class="
                                        'btn btn-sm btn-outline-primary border-0 w-50 ' +
                                        (active_history_tab == 1
                                            ? 'active'
                                            : '')
                                    "
                                >
                                    {{ "On Going" }}
                                    <i
                                        :class="
                                            'bi bi-' +
                                            (active_history_tab != 1
                                                ? active_order_list?.length
                                                : '') +
                                            '-square-fill ms-2'
                                        "
                                    ></i>
                                </button>
                                <button
                                    @click="active_history_tab = 0"
                                    :class="
                                        'btn btn-sm btn-outline-primary border-0 w-50 ' +
                                        (active_history_tab == 2
                                            ? 'active'
                                            : '')
                                    "
                                >
                                    {{ "Finish" }}
                                </button>
                            </div>
                        </div>
                        <transition
                            name="fade-slide-ltr"
                            @after-leave="active_history_tab = 2"
                        >
                            <div
                                class="col-xl-6 col-12"
                                v-if="isLargeScreen || active_history_tab == 1"
                            >
                                <div class="card p-3 shadow-sm">
                                    <div
                                        class="d-flex border-bottom border-primary border-2 pb-2"
                                    >
                                        <span
                                            class="h6 mb-0 text-primary-emphasis"
                                        >
                                            <i class="bi bi-app-indicator"></i>
                                            {{ "On Going Order" }}
                                        </span>
                                        <span
                                            class="text-success my-0 ms-auto"
                                            style="font-size: 0.8rem"
                                            >{{
                                                active_order_list?.length +
                                                " order"
                                            }}</span
                                        >
                                    </div>
                                    <div
                                        class="scroll-container-4 scroll-container-lg-3 pe-1 scroll-thumb-warning"
                                    >
                                        <li class="list-group list-group-flush">
                                            <ul
                                                v-for="item in active_order_list"
                                                class="list-group-item list-group-item-action mb-0 px-1 pt-2"
                                            >
                                                <div class="d-flex">
                                                    <span
                                                        style="
                                                            font-size: 0.8rem;
                                                        "
                                                        class="text-secondary"
                                                    >
                                                        <span
                                                            class="border-end border-2 border-secondary me-1 pe-1"
                                                        >
                                                            <i
                                                                class="bi bi-shop"
                                                            ></i>
                                                            {{
                                                                item.stand.name
                                                            }} </span
                                                        >{{
                                                            formatDate(
                                                                item.updated_at
                                                            )
                                                        }}</span
                                                    >
                                                    <span
                                                        style="
                                                            font-size: 0.8rem;
                                                        "
                                                        class="text-primary ms-auto mb-auto"
                                                        >{{
                                                            item.send_option ==
                                                            "delivery"
                                                                ? "Delivery"
                                                                : "Pick-Up"
                                                        }}</span
                                                    >
                                                </div>
                                                <div class="d-flex">
                                                    <span
                                                        class="text-secondary"
                                                        style="
                                                            font-size: 0.6rem;
                                                        "
                                                        >{{ "Menu Item" }}</span
                                                    >
                                                </div>
                                                <div
                                                    class="scroll-container scroll-container-lg"
                                                >
                                                    <li
                                                        class="list-group list-group-flush"
                                                    >
                                                        <ul
                                                            v-for="order in item.order"
                                                            class="list-group-item list-group-item-light mb-0 p-1"
                                                        >
                                                            <span
                                                                class="text-secondary me-1"
                                                            >
                                                                {{
                                                                    "(" +
                                                                    order.amount +
                                                                    ")"
                                                                }}
                                                            </span>
                                                            <span
                                                                class="text-dark"
                                                                >{{
                                                                    order.menu
                                                                        .name
                                                                }}</span
                                                            >
                                                            <span
                                                                class="text-dark float-end"
                                                            >
                                                                {{
                                                                    formatIDR(
                                                                        order
                                                                            .menu
                                                                            .price *
                                                                            order.amount
                                                                    )
                                                                }}
                                                            </span>
                                                        </ul>
                                                    </li>
                                                </div>
                                                <div class="d-flex mt-1">
                                                    <span
                                                        v-if="item.discount > 0"
                                                        class="text-secondary ms-3 mt-auto"
                                                        style="
                                                            font-size: 0.8rem;
                                                        "
                                                        >{{
                                                            "discount :"
                                                        }}</span
                                                    >
                                                    <span
                                                        v-if="item.discount > 0"
                                                        class="text-primary-emphasis py-0 my-auto ms-2"
                                                        >{{
                                                            formatIDR(
                                                                item.discount
                                                            )
                                                        }}</span
                                                    >
                                                    <span
                                                        class="text-secondary ms-auto mt-auto"
                                                        style="
                                                            font-size: 0.8rem;
                                                        "
                                                        >{{ "total :" }}</span
                                                    >
                                                    <span
                                                        class="text-primary-emphasis h6 my-auto ms-2"
                                                        >{{
                                                            formatIDR(
                                                                item.transaction
                                                            )
                                                        }}</span
                                                    >
                                                </div>
                                            </ul>
                                        </li>
                                        <div
                                            class="d-flex"
                                            v-if="active_order_list.length == 0"
                                        >
                                            <div class="mx-auto my-3">
                                                <span
                                                    class="text-secondary my-auto h6 d-block"
                                                >
                                                    {{ "No Active Order" }}
                                                </span>
                                                <span
                                                    class="text-secondary"
                                                    style="font-size: 0.8rem"
                                                >
                                                    {{
                                                        "Let`s make new Order!"
                                                    }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                        <transition
                            name="fade-slide-rtl"
                            @after-leave="active_history_tab = 1"
                        >
                            <div
                                class="col-xl-6 col-12"
                                v-if="isLargeScreen || active_history_tab == 2"
                            >
                                <div class="card p-3 shadow-sm">
                                    <div
                                        class="d-flex border-bottom border-primary border-2 pb-2"
                                    >
                                        <span
                                            class="h6 mb-0 text-primary-emphasis"
                                        >
                                            <i class="bi bi-check2-square"></i>
                                            {{ "Finish Transaction" }}
                                        </span>
                                    </div>
                                    <div
                                        class="scroll-container-4 scroll-container-lg-3 pe-1 scroll-thumb-warning"
                                    >
                                        <li class="list-group list-group-flush">
                                            <ul
                                                v-for="item in finished_order_list"
                                                class="list-group-item list-group-item-action mb-0 px-1 pt-2"
                                            >
                                                <div class="d-flex">
                                                    <span
                                                        style="
                                                            font-size: 0.8rem;
                                                        "
                                                        class="text-secondary"
                                                    >
                                                        <span
                                                            class="border-end border-2 border-secondary me-1 pe-1"
                                                        >
                                                            <i
                                                                class="bi bi-shop"
                                                            ></i>
                                                            {{
                                                                item.stand.name
                                                            }} </span
                                                        >{{
                                                            formatDate(
                                                                item.updated_at
                                                            )
                                                        }}</span
                                                    >
                                                    <span
                                                        style="
                                                            font-size: 0.8rem;
                                                        "
                                                        class="text-primary ms-auto mb-auto"
                                                        >{{
                                                            item.send_option ==
                                                            "delivery"
                                                                ? "Delivery"
                                                                : "Pick-Up"
                                                        }}</span
                                                    >
                                                </div>
                                                <div class="d-flex">
                                                    <span
                                                        class="text-secondary"
                                                        style="
                                                            font-size: 0.6rem;
                                                        "
                                                        >{{ "Menu Item" }}</span
                                                    >
                                                </div>
                                                <div
                                                    class="scroll-container scroll-container-lg"
                                                >
                                                    <li
                                                        class="list-group list-group-flush"
                                                    >
                                                        <ul
                                                            v-for="order in item.order"
                                                            class="list-group-item list-group-item-light mb-0 p-1"
                                                        >
                                                            <span
                                                                class="text-secondary me-1"
                                                            >
                                                                {{
                                                                    "(" +
                                                                    order.amount +
                                                                    ")"
                                                                }}
                                                            </span>
                                                            <span
                                                                class="text-dark"
                                                                >{{
                                                                    order.menu
                                                                        .name
                                                                }}</span
                                                            >
                                                            <span
                                                                class="text-dark float-end"
                                                            >
                                                                {{
                                                                    formatIDR(
                                                                        order
                                                                            .menu
                                                                            .price *
                                                                            order.amount
                                                                    )
                                                                }}
                                                            </span>
                                                        </ul>
                                                    </li>
                                                </div>
                                                <div class="d-flex mt-1">
                                                    <span
                                                        v-if="item.discount > 0"
                                                        class="text-secondary ms-3 mt-auto"
                                                        style="
                                                            font-size: 0.8rem;
                                                        "
                                                        >{{
                                                            "discount :"
                                                        }}</span
                                                    >
                                                    <span
                                                        v-if="item.discount > 0"
                                                        class="text-primary-emphasis py-0 my-auto ms-2"
                                                        >{{
                                                            formatIDR(
                                                                item.discount
                                                            )
                                                        }}</span
                                                    >
                                                    <span
                                                        class="text-secondary ms-auto mt-auto"
                                                        style="
                                                            font-size: 0.8rem;
                                                        "
                                                        >{{ "total :" }}</span
                                                    >
                                                    <span
                                                        class="text-primary-emphasis h6 my-auto ms-2"
                                                        >{{
                                                            formatIDR(
                                                                item.transaction
                                                            )
                                                        }}</span
                                                    >
                                                </div>
                                            </ul>
                                        </li>
                                        <div
                                            class="d-flex"
                                            v-if="active_order_list.length == 0"
                                        >
                                            <div class="mx-auto my-3">
                                                <span
                                                    class="text-secondary my-auto h6 d-block"
                                                >
                                                    {{ "No Active Order" }}
                                                </span>
                                                <span
                                                    class="text-secondary"
                                                    style="font-size: 0.8rem"
                                                >
                                                    {{
                                                        "Let`s make new Order!"
                                                    }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </transition>
        </div>
        <!-- Tab Navigation -->
        <div
            class="position-fixed bottom-0 start-50 translate-middle-x w-100 bg-white shadow z-1"
        >
            <div class="d-flex w-100">
                <button
                    :class="
                        'btn btn-sm btn-outline-warning w-100 rounded-0 border-0 p-xl-3 p-1 ' +
                        (active_tab == 1 ? 'active' : '')
                    "
                    @click="setTab(1)"
                >
                    <a ref="linkShop1" :href="route('shop', 1)"></a>
                    <i :class="'fa-utensils fa-solid'"></i>
                    <span
                        :class="'d-xl-inline d-block ms-2'"
                        :style="isLargeScreen ? 'font-size: 0.8rem;' : ''"
                        >{{ "Foods and Beverage" }}</span
                    >
                </button>
                <button
                    v-if="auth_user"
                    @click="setTab(2)"
                    :class="
                        'btn btn-sm btn-outline-warning w-100 rounded-0 border-0 p-xl-3 p-1 ' +
                        (active_tab == 2 ? 'active' : '')
                    "
                >
                    <a ref="linkShop2" :href="route('shop', 2)"></a>
                    <i :class="'fa-clipboard-list fa-solid'"></i>
                    <span
                        :class="'d-xl-inline d-block ms-2'"
                        :style="isLargeScreen ? 'font-size: 0.8rem;' : ''"
                        >{{ "History" }}</span
                    >
                </button>
            </div>
        </div>
        <!-- Notif Toast -->
        <Notif ref="toastNotifRef" />
    </GuestLayout>
</template>
