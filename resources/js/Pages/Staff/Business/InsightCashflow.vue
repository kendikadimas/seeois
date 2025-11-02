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
import { formatDate, formatIDR } from "@/utils";

const props = defineProps({
    foods: Object,
    goods: Object,
    notif: Object,
    errors: Object,
});

const auth_user = usePage().props.auth.user;
const title = ref("Cashflow");
const modalConfirmationRef = ref(null);
const toastNotifRef = ref(null);
const foods_active_tab = ref(1);
const foods_prev_tab = ref(1);
const foods_next_tab = ref(1);
const goods_active_tab = ref(1);
const goods_prev_tab = ref(1);
const goods_next_tab = ref(1);
const opened_detail = ref("");
const form_foods_filter = useForm({
    category: props.foods.filter.category,
    order: props.foods.filter.order,
});
const form_goods_filter = useForm({
    category: props.goods.filter.category,
    order: props.goods.filter.order,
});

const filtered_foods_income_list = computed(() => {
    return props.foods.income_list.filter(
        (item) => item.category == "stand income"
    );
});
const filtered_foods_expense_list = computed(() => {
    return props.foods.expense_list.filter(
        (item) => item.category == "stand expense"
    );
});
const filtered_goods_income_list = computed(() => {
    return props.goods.income_list.filter(
        (item) => item.category == "goods income"
    );
});
const filtered_goods_expense_list = computed(() => {
    return props.goods.expense_list.filter(
        (item) => item.category == "goods expense"
    );
});

function handleSubmitFilterFoods() {
    form_foods_filter.post(route("insight.filter.foods"));
}

function handleSubmitFilterGoods() {
    form_goods_filter.post(route("insight.filter.goods"));
}

function handleFoodsFilter(category) {
    form_foods_filter.order =
        props.foods.filter.category == category
            ? props.foods.filter.order == "asc"
                ? "desc"
                : "asc"
            : "desc";
    form_foods_filter.category = category;
    form_foods_filter.post(route("insight.filter.foods"));
}

function handleGoodsFilter(category) {
    form_goods_filter.order =
        props.goods.filter.category == category
            ? props.goods.filter.order == "asc"
                ? "desc"
                : "asc"
            : "desc";
    form_goods_filter.category = category;
    form_goods_filter.post(route("insight.filter.goods"));
}

function setFoodsActiveTab(number) {
    foods_prev_tab.value = foods_next_tab.value;
    foods_active_tab.value = 0;
    foods_next_tab.value = number;
}

function setGoodsActiveTab(number) {
    goods_prev_tab.value = goods_next_tab.value;
    goods_active_tab.value = 0;
    goods_next_tab.value = number;
}

function proceedFoodsTab() {
    foods_active_tab.value = foods_next_tab.value;
}

function proceedGoodsTab() {
    goods_active_tab.value = goods_next_tab.value;
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

<template>
    <!-- Page Layout -->
    <StaffLayout>
        <Head :title="title" :icon="'/storage/local/images/apps/logo.png'" />
        <!-- Modal Box -->
        <ModalConfirmation ref="modalConfirmationRef" />
        <template #header>
            <a
                :href="route('blaterian.insight')"
                class="bg-opacity-0 text-decoration-none text-primary-emphasis"
            >
                <span class="fw-light">{{ "Business Insight" }}</span>
            </a>
            <span class="ms-2">{{ "/" }}</span>
            {{ title }}
        </template>

        <div class="container me-lg-0 mx-auto mb-5">
            <!-- Insight -->
            <div class="row mt-4">
                <div class="col-12">
                    <!-- Foods -->
                    <div class="card bg-white p-3">
                        <div
                            class="border-bottom border-1 border-primary pb-1 d-flex"
                        >
                            <span class="text-primary-emphasis h5">{{
                                "Foods"
                            }}</span>
                            <button
                                class="btn-sm border-0 ms-auto p-0 bg-white d-lg-none"
                                style="font-size: 0.8rem"
                                @click="
                                    () => {
                                        opened_detail =
                                            opened_detail == 'foods'
                                                ? ''
                                                : 'foods';
                                    }
                                "
                            >
                                <span class="text-primary"
                                    >{{
                                        opened_detail == "foods"
                                            ? "hide detail"
                                            : "show detail"
                                    }}
                                    <i
                                        :class="
                                            'bi bi-chevron-' +
                                            (opened_detail == 'foods'
                                                ? 'up'
                                                : 'down')
                                        "
                                    ></i
                                ></span>
                            </button>
                        </div>
                        <div class="row gx-2">
                            <div class="col-6 col-lg-2 d-flex mt-2">
                                <i
                                    class="bi bi-wallet2 fs-5 my-auto text-primary"
                                ></i>
                                <div class="ms-3">
                                    <span
                                        class="d-block text-secondary"
                                        :style="'font-size:0.8rem;'"
                                        >{{ "Balance" }}</span
                                    >
                                    <span class="d-block">{{
                                        formatIDR(foods.balance.balance)
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-2 d-flex mt-2">
                                <i
                                    class="bi bi-box-arrow-in-down fs-5 my-auto text-primary"
                                ></i>
                                <div class="ms-3">
                                    <span
                                        class="d-block text-secondary"
                                        :style="'font-size:0.8rem;'"
                                        >{{ "Cash In" }}</span
                                    >
                                    <span class="d-block">{{
                                        formatIDR(foods.balance.income)
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-2 d-flex mt-2">
                                <i
                                    class="bi bi-box-arrow-up fs-5 my-auto text-primary"
                                ></i>
                                <div class="ms-3">
                                    <span
                                        class="d-block text-secondary"
                                        :style="'font-size:0.8rem;'"
                                        >{{ "Cash Out" }}</span
                                    >
                                    <span class="d-block">{{
                                        formatIDR(foods.balance.expense)
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-2 d-flex mt-2">
                                <i
                                    class="bi bi-cash-stack fs-5 my-auto text-primary"
                                ></i>
                                <div class="ms-3">
                                    <span
                                        class="d-block text-secondary"
                                        :style="'font-size:0.8rem;'"
                                        >{{ "Profit" }}</span
                                    >
                                    <span class="d-block">{{
                                        formatIDR(
                                            foods.total_income -
                                                foods.total_expense
                                        )
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-2 d-flex mt-2">
                                <i
                                    class="bi bi-graph-up fs-5 my-auto text-primary"
                                ></i>
                                <div class="ms-3">
                                    <span
                                        class="d-block text-secondary"
                                        :style="'font-size:0.8rem;'"
                                        >{{ "Income" }}</span
                                    >
                                    <span class="d-block">{{
                                        formatIDR(foods.total_income)
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-2 d-flex mt-2">
                                <i
                                    class="bi bi-graph-down fs-5 my-auto text-primary"
                                ></i>
                                <div class="ms-3">
                                    <span
                                        class="d-block text-secondary"
                                        :style="'font-size:0.8rem;'"
                                        >{{ "Expense" }}</span
                                    >
                                    <span class="d-block">{{
                                        formatIDR(foods.total_expense)
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Goods -->
                    <div class="card bg-white p-3 mt-4">
                        <div
                            class="border-bottom border-1 border-primary pb-1 d-flex"
                        >
                            <span class="text-primary-emphasis h5">{{
                                "Goods"
                            }}</span>
                            <button
                                class="ms-auto p-0 btn-sm border-0 bg-white d-lg-none"
                                style="font-size: 0.8rem"
                                @click="
                                    () => {
                                        opened_detail =
                                            opened_detail == 'goods'
                                                ? ''
                                                : 'goods';
                                    }
                                "
                            >
                                <span class="text-primary"
                                    >{{
                                        opened_detail == "goods"
                                            ? "hide detail"
                                            : "show detail"
                                    }}
                                    <i
                                        :class="
                                            'bi bi-chevron-' +
                                            (opened_detail == 'goods'
                                                ? 'up'
                                                : 'down')
                                        "
                                    ></i
                                ></span>
                            </button>
                        </div>
                        <div class="row gx-2">
                            <div class="col-6 col-lg-2 d-flex mt-2">
                                <i
                                    class="bi bi-wallet2 fs-5 my-auto text-primary"
                                ></i>
                                <div class="ms-3">
                                    <span
                                        class="d-block text-secondary"
                                        :style="'font-size:0.8rem;'"
                                        >{{ "Balance" }}</span
                                    >
                                    <span class="d-block">{{
                                        formatIDR(goods.balance.balance)
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-2 d-flex mt-2">
                                <i
                                    class="bi bi-box-arrow-in-down fs-5 my-auto text-primary"
                                ></i>
                                <div class="ms-3">
                                    <span
                                        class="d-block text-secondary"
                                        :style="'font-size:0.8rem;'"
                                        >{{ "Cash In" }}</span
                                    >
                                    <span class="d-block">{{
                                        formatIDR(goods.balance.income)
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-2 d-flex mt-2">
                                <i
                                    class="bi bi-box-arrow-up fs-5 my-auto text-primary"
                                ></i>
                                <div class="ms-3">
                                    <span
                                        class="d-block text-secondary"
                                        :style="'font-size:0.8rem;'"
                                        >{{ "Cash Out" }}</span
                                    >
                                    <span class="d-block">{{
                                        formatIDR(goods.balance.expense)
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-2 d-flex mt-2">
                                <i
                                    class="bi bi-cash-stack fs-5 my-auto text-primary"
                                ></i>
                                <div class="ms-3">
                                    <span
                                        class="d-block text-secondary"
                                        :style="'font-size:0.8rem;'"
                                        >{{ "Profit" }}</span
                                    >
                                    <span class="d-block">{{
                                        formatIDR(
                                            goods.total_income -
                                                goods.total_expense
                                        )
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-2 d-flex mt-2">
                                <i
                                    class="bi bi-graph-up fs-5 my-auto text-primary"
                                ></i>
                                <div class="ms-3">
                                    <span
                                        class="d-block text-secondary"
                                        :style="'font-size:0.8rem;'"
                                        >{{ "Income" }}</span
                                    >
                                    <span class="d-block">{{
                                        formatIDR(goods.total_income)
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-2 d-flex mt-2">
                                <i
                                    class="bi bi-graph-down fs-5 my-auto text-primary"
                                ></i>
                                <div class="ms-3">
                                    <span
                                        class="d-block text-secondary"
                                        :style="'font-size:0.8rem;'"
                                        >{{ "Expense" }}</span
                                    >
                                    <span class="d-block">{{
                                        formatIDR(goods.total_expense)
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <transition name="fade" mode="out-in">
                <div class="row gx-4 mt-4" :key="opened_detail">
                    <!-- Foods List -->
                    <div
                        v-if="isLargeScreen || opened_detail == 'foods'"
                        class="col-lg-6 col-12"
                        id="foodsDetail"
                    >
                        <div class="card p-2">
                            <!-- Header -->
                            <div class="card bg-white p-1">
                                <div class="d-flex">
                                    <span
                                        class="h6 text-primary-emphasis ms-1 me-2 my-auto text-nowrap"
                                    >
                                        {{ "Foods List" }}
                                    </span>
                                    <div class="d-flex w-100">
                                        <button
                                            @click="setFoodsActiveTab(1)"
                                            :class="
                                                'btn btn-sm btn-outline-primary border-0 text-center w-25 ' +
                                                (foods_active_tab == 1
                                                    ? 'border-bottom rounded-0 border-primary'
                                                    : '')
                                            "
                                        >
                                            {{
                                                foods_active_tab == 1
                                                    ? "Cash In"
                                                    : ""
                                            }}
                                            <i
                                                class="bi bi-box-arrow-in-down"
                                                v-if="foods_active_tab !== 1"
                                            ></i>
                                        </button>

                                        <button
                                            @click="setFoodsActiveTab(2)"
                                            :class="
                                                'btn btn-sm btn-outline-primary border-0 text-center w-25 ' +
                                                (foods_active_tab == 2
                                                    ? 'border-bottom rounded-0 border-primary'
                                                    : '')
                                            "
                                        >
                                            {{
                                                foods_active_tab == 2
                                                    ? "Cash Out"
                                                    : ""
                                            }}
                                            <i
                                                class="bi bi-box-arrow-up"
                                                v-if="foods_active_tab !== 2"
                                            ></i>
                                        </button>

                                        <button
                                            @click="setFoodsActiveTab(3)"
                                            :class="
                                                'btn btn-sm btn-outline-primary border-0 text-center w-25 ' +
                                                (foods_active_tab == 3
                                                    ? 'border-bottom rounded-0 border-primary'
                                                    : '')
                                            "
                                        >
                                            {{
                                                foods_active_tab == 3
                                                    ? "Income"
                                                    : ""
                                            }}
                                            <i
                                                class="bi bi-graph-up"
                                                v-if="foods_active_tab !== 3"
                                            ></i>
                                        </button>

                                        <button
                                            @click="setFoodsActiveTab(4)"
                                            :class="
                                                'btn btn-sm btn-outline-primary border-0 text-center w-25 ' +
                                                (foods_active_tab == 4
                                                    ? 'border-bottom rounded-0 border-primary'
                                                    : '')
                                            "
                                        >
                                            {{
                                                foods_active_tab == 4
                                                    ? "Expense"
                                                    : ""
                                            }}
                                            <i
                                                class="bi bi-graph-down"
                                                v-if="foods_active_tab !== 4"
                                            ></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex mt-2 ms-2">
                                <span
                                    class="text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto h6"
                                    >{{ "Filter" }}</span
                                >
                                <button
                                    @click="handleFoodsFilter('updated_at')"
                                    class="btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"
                                >
                                    {{ "Date" }}
                                    <i
                                        :class="
                                            'bi bi-arrow-' +
                                            (foods.filter.category ==
                                            'updated_at'
                                                ? foods.filter.order == 'asc'
                                                    ? 'up'
                                                    : 'down'
                                                : 'up')
                                        "
                                    ></i>
                                </button>
                                <button
                                    @click="handleFoodsFilter('price')"
                                    class="btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0 ms-2"
                                >
                                    {{ "Price" }}
                                    <i
                                        :class="
                                            'bi bi-arrow-' +
                                            (foods.filter.category == 'price'
                                                ? foods.filter.order == 'asc'
                                                    ? 'up'
                                                    : 'down'
                                                : 'up')
                                        "
                                    ></i>
                                </button>
                            </div>
                            <!-- List Item -->
                            <transition
                                :name="'fade-slide-ltr'"
                                mode="out-in"
                                @after-leave="proceedFoodsTab"
                            >
                                <!-- Cash In List -->
                                <div
                                    v-if="foods_active_tab == 1"
                                    class="scroll-container-lg-3 scroll-container-3"
                                >
                                    <div class="list-group list-group-flush">
                                        <div
                                            v-for="item in foods.income_list"
                                            :class="
                                                'list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 ' +
                                                (foods.income_list.indexOf(
                                                    item
                                                ) ==
                                                foods.income_list.length - 1
                                                    ? 'rounded-bottom-3'
                                                    : '')
                                            "
                                        >
                                            <div class="d-flex">
                                                <span
                                                    class="text-primary fw-light me-2"
                                                    style="font-size: 0.8rem"
                                                    >{{
                                                        formatDate(
                                                            item.created_at
                                                        )
                                                    }}</span
                                                >
                                                <span
                                                    class="text-secondary"
                                                    style="font-size: 0.8rem"
                                                    >{{ item.category }}</span
                                                >
                                            </div>
                                            <div class="d-flex">
                                                <div class="scroll-x-hidden">
                                                    <span
                                                        class="text-primary-emphasis text-nowrap"
                                                        >{{
                                                            item.category ==
                                                            "stand income"
                                                                ? item.stand
                                                                      .name
                                                                : item.program
                                                                      .name
                                                        }}</span
                                                    >
                                                </div>
                                                <span class="ms-auto me-0">
                                                    {{ formatIDR(item.price) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                            <transition
                                :name="
                                    'fade-slide-' +
                                    (foods_prev_tab > 2 || foods_next_tab > 2
                                        ? 'ltr'
                                        : 'rtl')
                                "
                                @after-leave="proceedFoodsTab"
                            >
                                <!-- Cash Out List -->
                                <div
                                    v-if="foods_active_tab == 2"
                                    class="scroll-container-lg-3 scroll-container-3"
                                >
                                    <div class="list-group list-group-flush">
                                        <div
                                            v-for="item in foods.expense_list"
                                            :class="
                                                'list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 ' +
                                                (foods.expense_list.indexOf(
                                                    item
                                                ) ==
                                                foods.expense_list.length - 1
                                                    ? 'rounded-bottom-3'
                                                    : '')
                                            "
                                        >
                                            <div class="d-flex">
                                                <span
                                                    class="text-primary fw-light me-2"
                                                    style="font-size: 0.8rem"
                                                    >{{
                                                        formatDate(
                                                            item.created_at
                                                        )
                                                    }}</span
                                                >
                                                <span
                                                    class="text-secondary"
                                                    style="font-size: 0.8rem"
                                                    >{{ item.category }}</span
                                                >
                                            </div>
                                            <div class="d-flex">
                                                <div class="scroll-x-hidden">
                                                    <span
                                                        class="text-primary-emphasis text-nowrap"
                                                        >{{
                                                            item.category ==
                                                            "stand expense"
                                                                ? item.stand
                                                                      .name
                                                                : item.withdraw
                                                                      .name
                                                        }}</span
                                                    >
                                                </div>
                                                <span class="ms-auto me-0">
                                                    {{ formatIDR(item.price) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                            <transition
                                :name="
                                    'fade-slide-' +
                                    (foods_prev_tab > 3 || foods_next_tab > 3
                                        ? 'ltr'
                                        : 'rtl')
                                "
                                @after-leave="proceedFoodsTab"
                            >
                                <!-- Income List -->
                                <div
                                    v-if="foods_active_tab == 3"
                                    class="scroll-container-lg-3 scroll-container-3"
                                >
                                    <div class="list-group list-group-flush">
                                        <div
                                            v-for="item in filtered_foods_income_list"
                                            :class="
                                                'list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 ' +
                                                (filtered_foods_income_list.indexOf(
                                                    item
                                                ) ==
                                                filtered_foods_income_list.length -
                                                    1
                                                    ? 'rounded-bottom-3'
                                                    : '')
                                            "
                                        >
                                            <div class="d-flex">
                                                <span
                                                    class="text-primary fw-light me-2"
                                                    style="font-size: 0.8rem"
                                                    >{{
                                                        formatDate(
                                                            item.created_at
                                                        )
                                                    }}</span
                                                >
                                            </div>
                                            <div class="d-flex">
                                                <div class="scroll-x-hidden">
                                                    <span
                                                        class="text-primary-emphasis text-nowrap"
                                                        >{{
                                                            item.stand.name
                                                        }}</span
                                                    >
                                                </div>
                                                <span class="ms-auto me-0">
                                                    {{ formatIDR(item.price) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                            <transition
                                :name="'fade-slide-rtl'"
                                @after-leave="proceedFoodsTab"
                            >
                                <!-- Expense List -->
                                <div
                                    v-if="foods_active_tab == 4"
                                    class="scroll-container-lg-3 scroll-container-3"
                                >
                                    <div class="list-group list-group-flush">
                                        <div
                                            v-for="item in filtered_foods_expense_list"
                                            :class="
                                                'list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 ' +
                                                (filtered_foods_expense_list.indexOf(
                                                    item
                                                ) ==
                                                filtered_foods_expense_list.length -
                                                    1
                                                    ? 'rounded-bottom-3'
                                                    : '')
                                            "
                                        >
                                            <div class="d-flex">
                                                <span
                                                    class="text-primary fw-light me-2"
                                                    style="font-size: 0.8rem"
                                                    >{{
                                                        formatDate(
                                                            item.created_at
                                                        )
                                                    }}</span
                                                >
                                            </div>
                                            <div class="d-flex">
                                                <div class="scroll-x-hidden">
                                                    <span
                                                        class="text-primary-emphasis text-nowrap"
                                                        >{{
                                                            item.stand.name
                                                        }}</span
                                                    >
                                                </div>
                                                <span class="ms-auto me-0">
                                                    {{ formatIDR(item.price) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <!-- Goods List -->
                    <div
                        v-if="isLargeScreen || opened_detail == 'goods'"
                        class="col-lg-6 col-12"
                        id="goodsDetail"
                    >
                        <div class="card p-2">
                            <!-- Header -->
                            <div class="card bg-white p-1">
                                <div class="d-flex">
                                    <span
                                        class="h6 text-primary-emphasis mx-2 my-auto text-nowrap"
                                    >
                                        {{ "Goods List" }}
                                    </span>
                                    <div class="d-flex w-100">
                                        <button
                                            @click="setGoodsActiveTab(1)"
                                            :class="
                                                'btn btn-sm btn-outline-primary border-0 text-center w-25 ' +
                                                (goods_active_tab == 1
                                                    ? 'border-bottom rounded-0 border-primary'
                                                    : '')
                                            "
                                        >
                                            {{
                                                goods_active_tab == 1
                                                    ? "Cash In"
                                                    : ""
                                            }}
                                            <i
                                                class="bi bi-box-arrow-in-down"
                                                v-if="goods_active_tab !== 1"
                                            ></i>
                                        </button>

                                        <button
                                            @click="setGoodsActiveTab(2)"
                                            :class="
                                                'btn btn-sm btn-outline-primary border-0 text-center w-25 ' +
                                                (goods_active_tab == 2
                                                    ? 'border-bottom rounded-0 border-primary'
                                                    : '')
                                            "
                                        >
                                            {{
                                                goods_active_tab == 2
                                                    ? "Cash Out"
                                                    : ""
                                            }}
                                            <i
                                                class="bi bi-box-arrow-up"
                                                v-if="goods_active_tab !== 2"
                                            ></i>
                                        </button>

                                        <button
                                            @click="setGoodsActiveTab(3)"
                                            :class="
                                                'btn btn-sm btn-outline-primary border-0 text-center w-25 ' +
                                                (goods_active_tab == 3
                                                    ? 'border-bottom rounded-0 border-primary'
                                                    : '')
                                            "
                                        >
                                            {{
                                                goods_active_tab == 3
                                                    ? "Income"
                                                    : ""
                                            }}
                                            <i
                                                class="bi bi-graph-up"
                                                v-if="goods_active_tab !== 3"
                                            ></i>
                                        </button>

                                        <button
                                            @click="setGoodsActiveTab(4)"
                                            :class="
                                                'btn btn-sm btn-outline-primary border-0 text-center w-25 ' +
                                                (goods_active_tab == 4
                                                    ? 'border-bottom rounded-0 border-primary'
                                                    : '')
                                            "
                                        >
                                            {{
                                                goods_active_tab == 4
                                                    ? "Expense"
                                                    : ""
                                            }}
                                            <i
                                                class="bi bi-graph-down"
                                                v-if="goods_active_tab !== 4"
                                            ></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex mt-2 ms-2">
                                <span
                                    class="text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto h6"
                                    >{{ "Filter" }}</span
                                >
                                <button
                                    @click="handleGoodsFilter('updated_at')"
                                    class="btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"
                                >
                                    {{ "Date" }}
                                    <i
                                        :class="
                                            'bi bi-arrow-' +
                                            (goods.filter.category ==
                                            'updated_at'
                                                ? goods.filter.order == 'asc'
                                                    ? 'up'
                                                    : 'down'
                                                : 'up')
                                        "
                                    ></i>
                                </button>
                                <button
                                    @click="handleGoodsFilter('price')"
                                    class="btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0 ms-2"
                                >
                                    {{ "Price" }}
                                    <i
                                        :class="
                                            'bi bi-arrow-' +
                                            (goods.filter.category == 'price'
                                                ? goods.filter.order == 'asc'
                                                    ? 'up'
                                                    : 'down'
                                                : 'up')
                                        "
                                    ></i>
                                </button>
                            </div>
                            <!-- List Item -->
                            <!-- Cash In List -->
                            <transition
                                :name="'fade-slide-ltr'"
                                mode="out-in"
                                @after-leave="proceedGoodsTab"
                            >
                                <div
                                    v-if="goods_active_tab == 1"
                                    class="scroll-container-lg-3 scroll-container-3"
                                >
                                    <div class="list-group list-group-flush">
                                        <div
                                            v-for="item in goods.income_list"
                                            :class="
                                                'list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 ' +
                                                (goods.income_list.indexOf(
                                                    item
                                                ) ==
                                                goods.income_list.length - 1
                                                    ? 'rounded-bottom-3'
                                                    : '')
                                            "
                                        >
                                            <div class="d-flex">
                                                <span
                                                    class="text-primary fw-light me-2"
                                                    style="font-size: 0.8rem"
                                                    >{{
                                                        formatDate(
                                                            item.created_at
                                                        )
                                                    }}</span
                                                >
                                                <span
                                                    class="text-secondary"
                                                    style="font-size: 0.8rem"
                                                    >{{ item.category }}</span
                                                >
                                            </div>
                                            <div class="d-flex">
                                                <div class="scroll-x-hidden">
                                                    <span
                                                        class="text-primary-emphasis text-nowrap"
                                                        >{{
                                                            item.category ==
                                                            "goods income"
                                                                ? item.sales
                                                                      .customer
                                                                : item.program
                                                                      .name
                                                        }}</span
                                                    >
                                                </div>
                                                <span class="ms-auto me-0">
                                                    {{ formatIDR(item.price) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                            <!-- Cash Out List -->
                            <transition
                                :name="
                                    'fade-slide-' +
                                    (goods_prev_tab > 2 || goods_next_tab > 2
                                        ? 'ltr'
                                        : 'rtl')
                                "
                                @after-leave="proceedGoodsTab"
                            >
                                <div
                                    v-if="goods_active_tab == 2"
                                    class="scroll-container-lg-3 scroll-container-3"
                                >
                                    <div class="list-group list-group-flush">
                                        <div
                                            v-for="item in goods.expense_list"
                                            :class="
                                                'list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 ' +
                                                (goods.expense_list.indexOf(
                                                    item
                                                ) ==
                                                goods.expense_list.length - 1
                                                    ? 'rounded-bottom-3'
                                                    : '')
                                            "
                                        >
                                            <div class="d-flex">
                                                <span
                                                    class="text-primary fw-light me-2"
                                                    style="font-size: 0.8rem"
                                                    >{{
                                                        formatDate(
                                                            item.created_at
                                                        )
                                                    }}</span
                                                >
                                                <span
                                                    class="text-secondary"
                                                    style="font-size: 0.8rem"
                                                    >{{ item.category }}</span
                                                >
                                            </div>
                                            <div class="d-flex">
                                                <div class="scroll-x-hidden">
                                                    <span
                                                        class="text-primary-emphasis text-nowrap"
                                                        >{{
                                                            item.category ==
                                                            "goods expense"
                                                                ? item.capital
                                                                      .name
                                                                : item.withdraw
                                                                      .name
                                                        }}</span
                                                    >
                                                </div>
                                                <span class="ms-auto me-0">
                                                    {{ formatIDR(item.price) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                            <!-- Income List -->
                            <transition
                                :name="
                                    'fade-slide-' +
                                    (goods_prev_tab > 3 || goods_next_tab > 3
                                        ? 'ltr'
                                        : 'rtl')
                                "
                                @after-leave="proceedGoodsTab"
                            >
                                <div
                                    v-if="goods_active_tab == 3"
                                    class="scroll-container-lg-3 scroll-container-3"
                                >
                                    <div class="list-group list-group-flush">
                                        <div
                                            v-for="item in filtered_goods_income_list"
                                            :class="
                                                'list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 ' +
                                                (filtered_goods_income_list.indexOf(
                                                    item
                                                ) ==
                                                filtered_goods_income_list.length -
                                                    1
                                                    ? 'rounded-bottom-3'
                                                    : '')
                                            "
                                        >
                                            <div class="d-flex">
                                                <span
                                                    class="text-primary fw-light me-2"
                                                    style="font-size: 0.8rem"
                                                    >{{
                                                        formatDate(
                                                            item.created_at
                                                        )
                                                    }}</span
                                                >
                                            </div>
                                            <div class="d-flex">
                                                <div class="scroll-x-hidden">
                                                    <span
                                                        class="text-primary-emphasis text-nowrap"
                                                        >{{
                                                            item.sales.customer
                                                        }}</span
                                                    >
                                                </div>
                                                <span class="ms-auto me-0">
                                                    {{ formatIDR(item.price) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                            <!-- Expense List -->
                            <transition
                                :name="'fade-slide-rtl'"
                                @after-leave="proceedGoodsTab"
                            >
                                <div
                                    v-if="goods_active_tab == 4"
                                    class="scroll-container-lg-3 scroll-container-3"
                                >
                                    <div class="list-group list-group-flush">
                                        <div
                                            v-for="item in filtered_goods_expense_list"
                                            :class="
                                                'list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 ' +
                                                (filtered_goods_expense_list.indexOf(
                                                    item
                                                ) ==
                                                filtered_goods_expense_list.length -
                                                    1
                                                    ? 'rounded-bottom-3'
                                                    : '')
                                            "
                                        >
                                            <div class="d-flex">
                                                <span
                                                    class="text-primary fw-light me-2"
                                                    style="font-size: 0.8rem"
                                                    >{{
                                                        formatDate(
                                                            item.created_at
                                                        )
                                                    }}</span
                                                >
                                            </div>
                                            <div class="d-flex">
                                                <div class="scroll-x-hidden">
                                                    <span
                                                        class="text-primary-emphasis text-nowrap"
                                                        >{{
                                                            item.capital.name
                                                        }}</span
                                                    >
                                                </div>
                                                <span class="ms-auto me-0">
                                                    {{ formatIDR(item.price) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </StaffLayout>

    <!-- Notif Toast -->
    <Notif ref="toastNotifRef" />
</template>
