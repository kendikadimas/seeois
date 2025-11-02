<script setup>
import StaffLayout from "@/Layouts/StaffLayout.vue";
import InputError from "@/Components/InputError.vue";
import Notif from "@/Components/Notif.vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import { Head, useForm, usePage } from "@inertiajs/vue3";
import {
    Chart,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
} from "chart.js";
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
    taste_chart: Array,
    food_tag_list: Array,
    customer_lifetime_list: Array,
    combo_list: Object,
    customer_feedback: Object,
    menu_performance_list: Object,
    foods: Object,
    goods: Object,
    notif: Object,
    errors: Object,
});

const auth_user = usePage().props.auth.user;
const title = ref("Business Insight");
const modalConfirmationRef = ref(null);
const modalTasteTagSettingRef = ref(null);
const toastNotifRef = ref(null);
const opened_detail = ref("");
const tasteChart = ref(null);
const chartInstance = ref(null);
const date = new Date();
const active_tab = ref(1);
const prev_tab = ref(0);
const next_tab = ref(0);

const form_taste_tag = useForm({
    food_tag: props.food_tag_list,
});

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

function showTasteTagSettingModal(is_show) {
    if (modalTasteTagSettingRef.value == null) {
        const modal = document.getElementById("tasteSettingModal");
        modalTasteTagSettingRef.value =
            bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalTasteTagSettingRef.value.show();
    } else {
        modalTasteTagSettingRef.value.hide();
    }
}

function handleSetTasteTag() {
    form_taste_tag.post(route("update.insight.taste_tag"), {
        onSuccess: () => {
            showTasteTagSettingModal(false);
        },
    });
}

function newTag() {
    form_taste_tag.food_tag.push({
        name: "",
        color: "#FFFFFF",
        deleted_at: null,
    });
}

function removeTag(index) {
    if (form_taste_tag.food_tag[index].id > 0) {
        form_taste_tag.food_tag[index].deleted_at = date;
    } else {
        form_taste_tag.food_tag.splice(index, 1);
    }
}

function renderChart(data) {
    const canvasContainer = tasteChart.value.parentElement;
    canvasContainer.style.width = props.taste_chart.length * 60 + "px";

    const ctx = tasteChart.value.getContext("2d");

    // Destroy old chart if exists
    if (chartInstance.value) {
        chartInstance.value.destroy();
    }

    chartInstance.value = new Chart(ctx, {
        type: "bar",
        data: {
            labels: data.map((item) => item.name),
            datasets: [
                {
                    label: "Total Orders",
                    data: data.map((item) => item.order_count),
                    backgroundColor: data.map((item) => item.color),
                    borderRadius: 6,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                },
                x: {
                    ticks: {
                        maxRotation: 0,
                        minRotation: 0,
                        callback: function (value, index, ticks) {
                            let label = this.getLabelForValue(value);
                            return label.length > 10
                                ? label.slice(0, 10) + "…"
                                : label;
                        },
                    },
                },
            },
        },
    });
}

function setTargetTab(tab) {
    prev_tab.value = active_tab.value;
    next_tab.value = tab;
    active_tab.value = 0;
}

function proceedTab() {
    active_tab.value = next_tab.value;
    next_tab.value = 0;
}

function goToWhatsapp(customer_phone) {
    const wa_phone = customer_phone.startsWith("0")
        ? customer_phone.slice(1)
        : customer_phone;

    window.open(`https://wa.me/62${wa_phone}`, "_blank");
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
    renderChart(props.taste_chart);
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

// Watch for updates in the prop
watch(
    () => props.taste_chart,
    (newVal) => {
        if (newVal && newVal.length > 0) {
            renderChart(newVal);
        }
    },
    { deep: true }
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
            <!-- Tabs Header -->
            <div class="row mt-4">
                <div class="col-12">
                    <div class="card p-1">
                        <div class="d-flex">
                            <button
                                :class="
                                    'btn btn-outline-primary border-0 w-100 text-nowrap ' +
                                    (active_tab == 1 ? 'active' : '')
                                "
                                @click="setTargetTab(1)"
                            >
                                <i
                                    :class="
                                        'bi bi-list-ul me-2 d-lg-none ' +
                                        (active_tab == 1 ? 'd-none' : '')
                                    "
                                ></i>
                                <span
                                    :class="
                                        'd-lg-inline ' +
                                        (active_tab == 1 || isLargeScreen
                                            ? ''
                                            : 'd-none')
                                    "
                                >
                                    {{ "by Menu" }}
                                </span>
                            </button>
                            <button
                                :class="
                                    'btn btn-outline-primary border-0 w-100 text-nowrap ' +
                                    (active_tab == 2 ? 'active' : '')
                                "
                                @click="setTargetTab(2)"
                            >
                                <i
                                    :class="
                                        'bi bi-person-lines-fill me-2 d-lg-none ' +
                                        (active_tab == 2 ? 'd-none' : '')
                                    "
                                ></i>
                                <span
                                    :class="
                                        'd-lg-inline ' +
                                        (active_tab == 2 || isLargeScreen
                                            ? ''
                                            : 'd-none')
                                    "
                                >
                                    {{ "by Customer" }}
                                </span>
                            </button>
                            <button
                                :class="
                                    'btn btn-outline-primary border-0 w-100 text-nowrap ' +
                                    (active_tab == 3 ? 'active' : '')
                                "
                                @click="setTargetTab(3)"
                            >
                                <i
                                    :class="
                                        'bi bi-wallet2 me-2 d-lg-none ' +
                                        (active_tab == 3 ? 'd-none' : '')
                                    "
                                ></i>
                                <span
                                    :class="
                                        'd-lg-inline ' +
                                        (active_tab == 3 || isLargeScreen
                                            ? ''
                                            : 'd-none')
                                    "
                                >
                                    {{ "Cash Flow" }}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Tabs Content -->
            <transition
                name="fade-slide-ltr"
                @after-leave="proceedTab()"
                @after-enter="renderChart(taste_chart)"
            >
                <div v-if="active_tab == 1" class="row g-4 mt-0">
                    <!-- Taste & Menu -->
                    <div class="col-12 col-lg-8">
                        <div class="row g-4">
                            <!-- Taste Preference -->
                            <div class="col-12">
                                <div class="card p-3 border-0">
                                    <div
                                        class="d-flex border-bottom border-primary pb-2"
                                    >
                                        <span
                                            class="text-primary-emphasis h6 my-auto"
                                            >{{ "Taste Preference" }}</span
                                        >
                                        <button
                                            v-if="auth_user.roles_id == 3"
                                            type="button"
                                            @click="
                                                showTasteTagSettingModal(true)
                                            "
                                            class="btn btn-sm btn-outline-secondary border-0 py-0 ms-auto"
                                        >
                                            <i class="bi bi-gear"></i>
                                        </button>
                                    </div>
                                    <div
                                        class="scroll-container-horizontal-lg scroll-container-horizontal"
                                    >
                                        <div class="text-nowrap">
                                            <canvas
                                                ref="tasteChart"
                                                style="height: 160px"
                                            ></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Menu Performance -->
                            <div class="col-12">
                                <div class="card p-3 border-0">
                                    <div
                                        class="d-flex border-bottom border-primary pb-2"
                                    >
                                        <span
                                            class="text-primary-emphasis h6 my-auto"
                                            >{{ "Menu Performance" }}</span
                                        >
                                    </div>
                                    <div
                                        class="scroll-container-horizontal-lg scroll-container-horizontal"
                                    >
                                        <div class="d-flex">
                                            <div class="w-100">
                                                <div class="d-flex my-2">
                                                    <i
                                                        class="bi bi-graph-up-arrow text-primary ms-auto me-2"
                                                    ></i>
                                                    <span
                                                        class="me-auto d-block text-primary-emphasis h6 my-auto"
                                                        >{{
                                                            "Top Selling"
                                                        }}</span
                                                    >
                                                </div>
                                                <table
                                                    class="table mb-0 table-hover"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <td
                                                                class="text-secondary text-center"
                                                            >
                                                                {{ "Rank" }}
                                                            </td>
                                                            <td
                                                                class="text-secondary"
                                                            >
                                                                {{ "Menu" }}
                                                            </td>
                                                            <td
                                                                class="text-secondary"
                                                            >
                                                                {{ "Sales" }}
                                                            </td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr
                                                            v-for="(
                                                                item, index
                                                            ) in menu_performance_list.top"
                                                        >
                                                            <td
                                                                class="text-center text-secondary"
                                                            >
                                                                {{ index + 1 }}
                                                            </td>
                                                            <td
                                                                class="text-nowrap"
                                                            >
                                                                {{ item.name }}
                                                            </td>
                                                            <td
                                                                class="text-nowrap text-primary"
                                                            >
                                                                {{
                                                                    item.sale +
                                                                    " pcs"
                                                                }}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="d-flex">
                                                <span
                                                    class="text-primary mt-2"
                                                    >{{ "Vs" }}</span
                                                >
                                            </div>
                                            <div class="w-100">
                                                <div class="d-flex my-2">
                                                    <i
                                                        class="bi bi-graph-down-arrow text-primary ms-auto me-2"
                                                    ></i>
                                                    <span
                                                        class="me-auto d-block text-primary-emphasis h6 my-auto"
                                                        >{{
                                                            "Less Popular"
                                                        }}</span
                                                    >
                                                </div>
                                                <table
                                                    class="table mb-0 table-hover"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <td
                                                                class="text-secondary text-center"
                                                            >
                                                                {{ "Rank" }}
                                                            </td>
                                                            <td
                                                                class="text-secondary"
                                                            >
                                                                {{ "Menu" }}
                                                            </td>
                                                            <td
                                                                class="text-secondary"
                                                            >
                                                                {{ "Sales" }}
                                                            </td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr
                                                            v-for="(
                                                                item, index
                                                            ) in menu_performance_list.bottom"
                                                        >
                                                            <td
                                                                class="text-center text-secondary"
                                                            >
                                                                {{ index + 1 }}
                                                            </td>
                                                            <td
                                                                class="text-nowrap"
                                                            >
                                                                {{ item.name }}
                                                            </td>
                                                            <td
                                                                class="text-nowrap text-primary"
                                                            >
                                                                {{
                                                                    item.sale +
                                                                    " pcs"
                                                                }}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Combo Pattern -->
                    <div class="col-12 col-lg-4">
                        <div class="card p-3 border-0">
                            <div class="d-flex border-bottom border-primary">
                                <span class="h6 text-primary-emphasis">
                                    {{ "Menu Combo Pattern" }}
                                </span>
                            </div>
                            <div
                                class="scroll-container-2 scroll-container-lg-3"
                            >
                                <li class="list-group list-group-flush">
                                    <ul
                                        class="list-group-item list-group-item-action mb-0"
                                        v-for="item in combo_list"
                                    >
                                        <div class="d-flex">
                                            <div class="me-0">
                                                <span
                                                    class="text-secondary d-block"
                                                    style="font-size: 0.8rem"
                                                    >{{ "Transaction" }}</span
                                                >
                                                <span
                                                    class="text-primary d-block"
                                                    >{{
                                                        item.transaction +
                                                        " time"
                                                    }}</span
                                                >
                                            </div>
                                            <div class="ms-3">
                                                <span
                                                    class="text-secondary d-block"
                                                    style="font-size: 0.8rem"
                                                    >{{
                                                        "Menu Pattern  "
                                                    }}</span
                                                >
                                                <div
                                                    v-if="
                                                        Array.isArray(
                                                            item.menu_list
                                                        )
                                                    "
                                                    class="d-flex"
                                                    v-for="menu in item.menu_list"
                                                >
                                                    <i
                                                        style="
                                                            font-size: 0.5rem;
                                                        "
                                                        class="bi bi-chevron-right text-primary my-auto"
                                                    ></i>
                                                    <span
                                                        class="text-dark ms-2"
                                                        >{{ menu }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <transition
                :name="
                    next_tab > 2 || 2 < prev_tab
                        ? 'fade-slide-ltr'
                        : 'fade-slide-rtl'
                "
                @after-leave="proceedTab()"
            >
                <div v-if="active_tab == 2" class="row mt-0 g-4">
                    <div class="col-12 col-lg-6">
                        <div class="card p-3">
                            <div class="d-flex border-bottom border-primary">
                                <span class="text-primary-emphasis h6">{{
                                    "Customer Lifetime Value"
                                }}</span>
                            </div>
                            <table class="table mb-0 table-hover">
                                <thead>
                                    <tr>
                                        <td class="text-secondary text-center">
                                            {{ "Rank" }}
                                        </td>
                                        <td class="text-secondary">
                                            {{ "Customer" }}
                                        </td>
                                        <td class="text-secondary">
                                            {{ "Transaction" }}
                                        </td>
                                        <td class="text-secondary">
                                            {{ "Point" }}
                                        </td>
                                    </tr>
                                </thead>
                                <tbody
                                    class="scroll-container-3 scroll-container-lg-2"
                                >
                                    <tr
                                        v-for="(
                                            item, index
                                        ) in customer_lifetime_list"
                                        @click="goToWhatsapp(item.phone)"
                                    >
                                        <td class="text-center text-secondary">
                                            {{ index + 1 }}
                                        </td>
                                        <td>
                                            {{ item.name }}
                                            <i
                                                class="bi bi-whatsapp text-success"
                                                style="font-size: 0.8rem"
                                            ></i>
                                        </td>
                                        <td class="text-nowrap text-primary">
                                            {{ formatIDR(item.transaction) }}
                                        </td>
                                        <td
                                            class="text-nowrap text-primary-emphasis"
                                        >
                                            <i
                                                class="fa-solid fa-coins text-warning"
                                            ></i>
                                            {{ item.point }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6">
                        <div class="card p-3">
                            <div class="d-flex border-bottom border-primary">
                                <span class="text-primary-emphasis h6">{{
                                    "Customer Rating & Feedback"
                                }}</span>
                            </div>
                            <div class="d-flex my-2 px-2 py-1">
                                <span class="text-secondary">{{
                                    "Average Rating"
                                }}</span>
                                <div class="d-flex ms-auto">
                                    <i
                                        v-for="rate in 5"
                                        :class="
                                            'bi text-warning me-2 bi-star' +
                                            (customer_feedback.average > rate
                                                ? '-fill'
                                                : customer_feedback.average >
                                                  rate - 0.5
                                                ? '-half'
                                                : '')
                                        "
                                    ></i>
                                    <span
                                        class="text-primary my-auto border-start border-primary ps-2"
                                        >{{ customer_feedback.average }}</span
                                    >
                                </div>
                            </div>
                            <div
                                class="scroll-container-3 scroll-container-lg-3"
                            >
                                <li class="list-group list-group-flush">
                                    <ul
                                        class="list-group-item list-group-item-action mb-0"
                                        v-for="item in customer_feedback.feedback_list"
                                    >
                                        <div class="d-flex">
                                            <div class="scroll-x-hidden">
                                                <span class="text-nowrap">{{
                                                    item.customer.name
                                                }}</span>
                                            </div>
                                            <div class="ms-auto">
                                                <i
                                                    v-for="rate in 5"
                                                    :class="
                                                        'bi  text-warning me-2 bi-star' +
                                                        (item.rate > rate
                                                            ? '-fill'
                                                            : item.rate >
                                                              rate - 0.5
                                                            ? '-half'
                                                            : '')
                                                    "
                                                ></i>
                                            </div>
                                        </div>
                                        <span
                                            class="text-secondary"
                                            style="text-align: justify"
                                            >{{ item.message }}</span
                                        >
                                    </ul>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <transition name="fade-slide-rtl" @after-leave="proceedTab()">
                <div v-if="active_tab == 3" class="row mt-0 g-4">
                    <!-- Cashflow -->
                    <div class="col-12 col-lg-6">
                        <div class="card bg-white p-3">
                            <div
                                class="border-bottom border-1 border-primary d-flex"
                            >
                                <span class="text-primary-emphasis h6">{{
                                    "Cashflow"
                                }}</span>
                                <a
                                    :href="route('blaterian.insight.cashflow')"
                                    class="text-decoration-none ms-auto my-auto"
                                    style="font-size: 0.8rem"
                                >
                                    {{ "details" }}
                                    <i
                                        class="bi bi-box-arrow-up-right ms-0"
                                    ></i>
                                </a>
                            </div>
                            <span class="d-block text-secondary mt-2">
                                {{ "Foods and Beverages" }}
                            </span>
                            <div class="row gx-2">
                                <div class="col-6 col-lg-4 d-flex mt-2">
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
                                <div class="col-6 col-lg-4 d-flex mt-2">
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
                                <div class="col-6 col-lg-4 d-flex mt-2">
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
                                <div class="col-6 col-lg-4 d-flex mt-2">
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
                                <div class="col-6 col-lg-4 d-flex mt-2">
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
                                <div class="col-6 col-lg-4 d-flex mt-2">
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
                            <!-- Temporary Hidden -->
                            <!-- Using d-none to hidden -->
                            <span class="d-block text-secondary mt-2 d-none">
                                {{ "Goods " }}
                            </span>
                            <div class="row gx-2 d-none">
                                <div class="col-6 col-lg-4 d-flex mt-2">
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
                                <div class="col-6 col-lg-4 d-flex mt-2">
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
                                <div class="col-6 col-lg-4 d-flex mt-2">
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
                                <div class="col-6 col-lg-4 d-flex mt-2">
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
                                <div class="col-6 col-lg-4 d-flex mt-2">
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
                                <div class="col-6 col-lg-4 d-flex mt-2">
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
            </transition>
        </div>
    </StaffLayout>

    <!-- Modal -->
    <!-- Taste Setting Modal -->
    <div
        v-if="auth_user.roles_id == 3"
        class="modal fade"
        id="tasteSettingModal"
        tabindex="-1"
        aria-labelledby="tasteSettingModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3 text-dark">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title h5 text-primary-emphasis">
                        <i class="bi bi-gear border-secondary"></i>
                        {{ "Taste Settings" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showTasteTagSettingModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="d-flex border-bottom border-2 pb-1">
                        <span class="text-dark">{{ "Tag List" }}</span>
                        <button
                            @click="newTag"
                            class="btn btn-outline-primary btn-sm border-0 ms-auto"
                        >
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </div>
                    <div
                        class=""
                        v-for="(item, index) in form_taste_tag.food_tag"
                    >
                        <div class="d-flex" v-if="item.deleted_at == null">
                            <div class="w-50">
                                <label
                                    style="font-size: 0.8rem"
                                    :for="'form_food_tag_' + index"
                                    class="form-label text-secondary"
                                    >{{ "Name" }}</label
                                >
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    v-model="
                                        form_taste_tag.food_tag[index].name
                                    "
                                />
                            </div>
                            <div class="w-50 ms-2">
                                <label
                                    style="font-size: 0.8rem"
                                    :for="'form_food_tag_' + index"
                                    class="form-label text-secondary"
                                    >{{ "Color" }}</label
                                >
                                <div class="input-group input-group-sm">
                                    <span class="input-group-text">{{
                                        form_taste_tag.food_tag[index].color
                                    }}</span>
                                    <input
                                        type="color"
                                        class="form-control form-control-sm"
                                        v-model="
                                            form_taste_tag.food_tag[index].color
                                        "
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                @click="removeTag(index)"
                                class="btn btn-sm btn-outline-secondary border-0 ms-2 mt-1 mb-auto"
                            >
                                <i class="bi bi-trash3"></i>
                            </button>
                        </div>
                    </div>
                    <InputError :message="form_taste_tag.errors.food_tag" />
                </div>
                <div class="modal-footer p-1">
                    <div class="d-flex w-100">
                        <button
                            @click="form_taste_tag.food_tag = food_tag_list"
                            class="btn btn-sm btn-outline-primary w-50 rounded-end-0"
                        >
                            {{ "Reset" }}
                        </button>
                        <button
                            @click="handleSetTasteTag"
                            class="btn btn-sm btn-primary w-50 rounded-start-0"
                        >
                            {{ "Save" }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Notif Toast -->
    <Notif ref="toastNotifRef" />
</template>
