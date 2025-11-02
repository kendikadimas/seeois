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

import { format, getMonth } from "date-fns";
import { getMonthName, formatIDR, formatDate } from "@/utils";

const props = defineProps({
    default_contribution_id: Number,
    contribution_config: Object,
    contribution_users: Array,
    payroll_detail: Array,
    payroll_balance: Object,
    filter: Object,
    notif: Object,
    errors: Object,
});

const auth_user = usePage().props.auth.user;
const title = ref("Finance Feature");
const modalConfirmationRef = ref(null);
const toastNotifRef = ref(null);
const placeholder = ref("placeholder");
const date = new Date();
const modalContributionSettingRef = ref(null);
const modalPayrollSettingRef = ref(null);
const thisMonth = computed(() => {
    return new Date().getMonth() + 1;
});
const contribution_configuration_collapse = ref(false);
const icon_collapse_contribution_configuration = computed(() =>
    contribution_configuration_collapse.value ? "up" : "down"
);
const is_batch = ref(false);
const unselect = ref(false);
const active_tab = ref(1);
const selected_receipt_id = ref(null);
const selected_receipt = computed(() => {
    return props.contribution_users
        .find((user) => user.id == selected_contribution_id.value)
        ?.contribution.receipt.find(
            (receipt) => receipt.id == selected_receipt_id.value
        );
});
const selected_contribution_id = ref(null);
const selected_contribution = computed(() => {
    return props.contribution_users.find(
        (user) => user.id == selected_contribution_id.value
    );
});
const form_contribution_setting = useForm({
    price:
        props.contribution_config?.financial_id > 0
            ? props.contribution_config.price
            : 0,
    start:
        props.contribution_config?.financial_id > 0
            ? props.contribution_config.start
            : new Date().getMonth(),
    end:
        props.contribution_config?.financial_id > 0
            ? props.contribution_config.period +
              props.contribution_config.start -
              1
            : new Date().getMonth(),
});
const form_contribution_filter = useForm({
    keyword: props.filter.contribution.keyword,
});
const form_payroll_setting = useForm({
    balance: props.payroll_balance.balance,
    level_list: props.payroll_detail,
});
const form_update_payroll_single = useForm({
    user_id: null,
    level: null,
});
const form_update_payroll_batch = useForm({
    staff_id_list: [],
    level: "",
});

function handleSetContribution() {
    form_contribution_setting.post(route("contribution.settings"), {
        onSuccess: () => {
            showContributionSettingsModal(false);
            form_contribution_setting.reset();
        },
        onError: (e) => {
            for (let key in e) {
                toastNotifRef.value.showToast("warning", e[key]);
            }
        },
    });
}

function handleSetPayroll() {
    form_payroll_setting.post(route("payroll.settings"), {
        onSuccess: () => {
            showPayrollSettingsModal(false);
        },
    });
}

function handleUpdatePayrollSingle() {
    form_update_payroll_single.post(route("payroll.update.single"));
}

function handleUpdatePayrollBatch() {
    form_update_payroll_batch.post(route("payroll.update.batch"));
}

function showContributionSettingsModal(is_show) {
    if (modalContributionSettingRef.value == null) {
        const modal = document.getElementById("modalSettingContribution");
        modalContributionSettingRef.value =
            bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalContributionSettingRef.value.show();
    } else {
        modalContributionSettingRef.value.hide();
    }
}

function showPayrollSettingsModal(is_show) {
    if (modalPayrollSettingRef.value == null) {
        const modal = document.getElementById("modalSettingPayroll");
        modalPayrollSettingRef.value =
            bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalPayrollSettingRef.value.show();
    } else {
        modalPayrollSettingRef.value.hide();
    }
}

function setSelectedContribution(contribution_id) {
    selected_contribution_id.value = contribution_id;
}

function setSelectedReceipt(receipt_id) {
    selected_receipt_id.value = receipt_id;
}

function handleContributionFilter() {
    form_contribution_filter.post(route("contribution.filter"));
}

function newLevel() {
    form_payroll_setting.level_list.push({
        level:
            props.payroll_detail.length > 0
                ? Math.max(
                      ...form_payroll_setting.level_list
                          .filter((item) => item.deleted_at == null)
                          .map((item) => item.level)
                  ) + 1
                : 0,
        salary: 0,
        deleted_at: null,
    });
}

function removeLevel(index) {
    if (form_payroll_setting.level_list[index].id > 0) {
        form_payroll_setting.level_list[index].deleted_at = date;
    } else {
        form_payroll_setting.level_list.splice(index, 1);
    }
}

function resetPayrollSetting() {
    form_payroll_setting.reset();
}

function selectStaffBatch(staff) {
    let is_exist = form_update_payroll_batch.staff_id_list.findIndex(
        (item) => item == staff.id
    );
    if (
        form_update_payroll_batch.staff_id_list.find((item) => item == staff.id)
    ) {
        form_update_payroll_batch.staff_id_list.splice(is_exist, 1);
    } else {
        form_update_payroll_batch.staff_id_list.push(staff.id);
    }
}

function round(number) {
    return Math.round(number);
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
            {{ title }}
        </template>

        <div class="container me-lg-0 mx-auto mb-5">
            <div class="row gx-2 mt-4 d-lg-none">
                <div class="col-12">
                    <div class="card p-2 bg-light">
                        <div class="d-flex">
                            <button
                                :class="
                                    'btn btn-sm btn-outline-primary border-0 w-50 ' +
                                    (active_tab == 1 ? 'active' : '')
                                "
                                @click="
                                    () => {
                                        active_tab = 0;
                                    }
                                "
                            >
                                {{ "Contribution" }}
                            </button>
                            <div class="mx-1"></div>
                            <button
                                :class="
                                    'btn btn-sm btn-outline-primary border-0 w-50 ' +
                                    (active_tab == 2 ? 'active' : '')
                                "
                                @click="
                                    () => {
                                        active_tab = 0;
                                    }
                                "
                            >
                                {{ "Payroll" }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row gx-4 mt-4">
                <div class="col-12">
                    <div class="card p-3 shadow-sm bg-white">
                        <!-- Hedaer -->
                        <div class="d-flex text-primary-emphasis h5">
                            <span class="d-none d-lg-inline">
                                {{ "Contribution & Payroll" }}
                            </span>
                            <div class="d-lg-none">
                                <transition
                                    name="fade-slide-ltr"
                                    @after-leave="
                                        () => {
                                            active_tab = 2;
                                        }
                                    "
                                >
                                    <span v-if="active_tab == 1">
                                        {{ "Contribution" }}
                                    </span>
                                </transition>
                                <transition
                                    name="fade-slide-rtl"
                                    @after-leave="
                                        () => {
                                            active_tab = 1;
                                        }
                                    "
                                >
                                    <span v-if="active_tab == 2">
                                        {{ "Payroll" }}
                                    </span>
                                </transition>
                            </div>
                            <button
                                @click="
                                    () =>
                                        (contribution_configuration_collapse =
                                            !contribution_configuration_collapse)
                                "
                                class="btn btn-sm btn-outline-primary border-0 py-0 ms-auto"
                                :style="'font-size: 0.8rem;'"
                            >
                                {{
                                    icon_collapse_contribution_configuration ==
                                    "up"
                                        ? "hide"
                                        : "settings"
                                }}
                                <i
                                    :class="
                                        'bi my-auto bi-chevron-' +
                                        icon_collapse_contribution_configuration
                                    "
                                    :style="'font-size: 0.8rem;'"
                                ></i>
                            </button>
                        </div>
                        <!-- Settings Detail -->
                        <transition name="fade">
                            <div
                                v-if="contribution_configuration_collapse"
                                class="mb-2"
                            >
                                <transition name="fade-slide-ltr">
                                    <div
                                        v-if="active_tab == 1 || isLargeScreen"
                                    >
                                        <!-- Contribution -->
                                        <div class="row gx-2">
                                            <div
                                                class="col-2 d-none d-lg-block"
                                            >
                                                <div class="d-flex h-100">
                                                    <span
                                                        class="text-primary my-auto"
                                                        >{{
                                                            "Contribution"
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                            <div class="col-lg-10 col-12">
                                                <div class="row g-2">
                                                    <div class="col-6 col-lg-3">
                                                        <span
                                                            class="text-secondary d-block"
                                                            :style="'font-size: 0.8rem;'"
                                                            >{{
                                                                "Charge"
                                                            }}</span
                                                        >
                                                        <span class="text-dark">
                                                            {{
                                                                formatIDR(
                                                                    contribution_config.price
                                                                )
                                                            }}
                                                        </span>
                                                    </div>
                                                    <div class="col-6 col-lg-3">
                                                        <span
                                                            class="text-secondary d-block"
                                                            :style="'font-size: 0.8rem;'"
                                                            >{{
                                                                "Period"
                                                            }}</span
                                                        >
                                                        <span class="text-dark">
                                                            {{
                                                                getMonthName(
                                                                    contribution_config.start
                                                                ) +
                                                                " - " +
                                                                getMonthName(
                                                                    contribution_config.start +
                                                                        contribution_config.period -
                                                                        1
                                                                )
                                                            }}
                                                        </span>
                                                    </div>
                                                    <div class="col-6 col-lg-3">
                                                        <span
                                                            class="text-secondary d-block"
                                                            :style="'font-size: 0.8rem;'"
                                                            >{{ "Total" }}</span
                                                        >
                                                        <span class="text-dark">
                                                            {{
                                                                formatIDR(
                                                                    contribution_config.period *
                                                                        contribution_config.price
                                                                )
                                                            }}
                                                        </span>
                                                    </div>
                                                    <div class="col-6 col-lg-3">
                                                        <span
                                                            class="text-secondary d-block"
                                                            :style="'font-size: 0.8rem;'"
                                                            >{{
                                                                "Set by"
                                                            }}</span
                                                        >
                                                        <a
                                                            :href="
                                                                route(
                                                                    'profile.edit',
                                                                    contribution_config.financial_id
                                                                )
                                                            "
                                                            class="text-dark text-decoration-none d-flex"
                                                            >{{
                                                                contribution_config
                                                                    .financial
                                                                    .name
                                                            }}
                                                            <i
                                                                :style="'font-size: 0.8rem;'"
                                                                class="bi bi-box-arrow-up-right my-auto ms-2"
                                                            ></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Contribution Settings -->
                                        <div class="row">
                                            <div class="col">
                                                <div
                                                    class="d-flex mt-2 pt-1"
                                                    :style="'font-size: 0.8rem;'"
                                                >
                                                    <span
                                                        class="ms-0 my-auto ms-lg-auto me-2 text-secondary"
                                                        >{{
                                                            contribution_config.financial_id >
                                                            0
                                                                ? "Set on " +
                                                                  formatDate(
                                                                      contribution_config.updated_at
                                                                  )
                                                                : "Wait for Financial set up"
                                                        }}</span
                                                    >

                                                    <button
                                                        v-if="
                                                            auth_user.roles_id ==
                                                            2
                                                        "
                                                        class="btn btn-sm btn-outline-secondary ms-auto ms-lg-0 py-0 d-flex border-0"
                                                        @click="
                                                            showContributionSettingsModal(
                                                                true
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="bi bi-gear my-auto"
                                                            :style="'font-size:0.8rem;'"
                                                        ></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                                <transition name="fade-slide-rtl">
                                    <div
                                        v-if="active_tab == 2 || isLargeScreen"
                                    >
                                        <!-- Payroll -->
                                        <div class="row gx-2">
                                            <div
                                                class="col-2 d-none d-lg-block"
                                            >
                                                <div class="d-flex h-100">
                                                    <span
                                                        class="text-primary mt-2"
                                                        >{{ "Payroll" }}</span
                                                    >
                                                </div>
                                            </div>
                                            <div class="col-12 col-lg-10">
                                                <div class="row g-2">
                                                    <div
                                                        class="col-12 col-lg-3"
                                                    >
                                                        <div class="row g-2">
                                                            <div
                                                                class="col-6 col-lg-12"
                                                            >
                                                                <span
                                                                    class="text-secondary d-block"
                                                                    :style="'font-size: 0.8rem;'"
                                                                    >{{
                                                                        "Budget"
                                                                    }}</span
                                                                >
                                                                <span
                                                                    class="text-dark"
                                                                >
                                                                    {{
                                                                        formatIDR(
                                                                            payroll_balance.balance
                                                                        )
                                                                    }}
                                                                </span>
                                                            </div>
                                                            <div
                                                                class="col-6 col-lg-12"
                                                            >
                                                                <span
                                                                    class="text-secondary d-block"
                                                                    :style="'font-size: 0.8rem;'"
                                                                    >{{
                                                                        "Set by"
                                                                    }}</span
                                                                >
                                                                <a
                                                                    v-if="
                                                                        payroll_balance.financial_id >
                                                                        0
                                                                    "
                                                                    :href="
                                                                        route(
                                                                            'profile.edit',
                                                                            payroll_balance?.financial_id
                                                                        )
                                                                    "
                                                                    class="text-dark text-decoration-none d-flex"
                                                                    >{{
                                                                        payroll_balance
                                                                            ?.financial
                                                                            ?.name ??
                                                                        "-"
                                                                    }}
                                                                    <i
                                                                        :style="'font-size: 0.8rem;'"
                                                                        class="bi bi-box-arrow-up-right my-auto ms-2"
                                                                    ></i>
                                                                </a>
                                                                <span v-else>{{
                                                                    " - "
                                                                }}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-12 col-lg-9"
                                                    >
                                                        <div
                                                            class="d-block mb-2"
                                                            v-for="item in payroll_detail"
                                                        >
                                                            <span
                                                                class="text-secondary d-block"
                                                                :style="'font-size: 0.8rem;'"
                                                                >{{
                                                                    "Level " +
                                                                    item.level
                                                                }}</span
                                                            >
                                                            <div
                                                                class="row gx-2"
                                                            >
                                                                <div
                                                                    class="col-4"
                                                                >
                                                                    {{
                                                                        item.salary +
                                                                        " percent"
                                                                    }}
                                                                </div>
                                                                <div
                                                                    class="col-4"
                                                                >
                                                                    {{
                                                                        item.employee +
                                                                        (item.employee >
                                                                        1
                                                                            ? " persons"
                                                                            : " person")
                                                                    }}
                                                                </div>
                                                                <div
                                                                    class="col-4 scroll-x-hidden"
                                                                >
                                                                    <span
                                                                        class="text-nowrap"
                                                                        >{{
                                                                            formatIDR(
                                                                                item.salary_idr
                                                                            ) +
                                                                            " /person"
                                                                        }}</span
                                                                    >
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Payroll Settings -->
                                        <div class="row">
                                            <div class="col">
                                                <div
                                                    class="d-flex mt-2 pt-1"
                                                    :style="'font-size: 0.8rem;'"
                                                >
                                                    <span
                                                        class="ms-0 my-auto ms-lg-auto me-lg-2 text-secondary"
                                                        >{{
                                                            payroll_balance.financial_id >
                                                            0
                                                                ? "Set on " +
                                                                  formatDate(
                                                                      payroll_balance.updated_at
                                                                  )
                                                                : "Wait for Financial set up"
                                                        }}</span
                                                    >

                                                    <button
                                                        v-if="
                                                            auth_user.roles_id ==
                                                            2
                                                        "
                                                        class="ms-auto ms-lg-0 btn btn-sm btn-outline-secondary py-0 d-flex border-0"
                                                        @click="
                                                            showPayrollSettingsModal(
                                                                true
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="bi bi-gear my-auto"
                                                            :style="'font-size:0.8rem;'"
                                                        ></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </transition>
                        <!-- Staff Detail -->
                        <div
                            class="card border-top border-0 border-primary rounded-top-0"
                        >
                            <div class="row g-2 mt-2">
                                <div class="col-12 col-lg-3">
                                    <span
                                        class="text-secondary d-block"
                                        :style="'font-size: 0.8rem;'"
                                        >{{ "Staff" }}</span
                                    >
                                    <a
                                        :href="
                                            selected_contribution?.id > 0
                                                ? route(
                                                      'profile.edit',
                                                      selected_contribution?.id
                                                  )
                                                : ''
                                        "
                                        class="text-dark text-decoration-none d-flex scroll-x-hidden"
                                    >
                                        <span class="text-nowrap">{{
                                            selected_contribution?.id > 0
                                                ? selected_contribution.name
                                                : " - "
                                        }}</span>
                                        <i
                                            v-if="selected_contribution?.id > 0"
                                            :style="'font-size: 0.8rem;'"
                                            class="bi bi-box-arrow-up-right my-auto ms-2"
                                        ></i>
                                    </a>
                                </div>
                                <div class="col-12 col-lg-9">
                                    <div class="row gx-4">
                                        <!-- Staff Contribution -->
                                        <transition name="fade-slide-ltr">
                                            <div
                                                class="col-12 col-lg-6"
                                                v-if="
                                                    active_tab == 1 ||
                                                    isLargeScreen
                                                "
                                            >
                                                <div class="row g-2">
                                                    <div
                                                        class="col-12 d-lg-block d-none"
                                                    >
                                                        <div
                                                            class="d-flex bg-light p-3"
                                                        >
                                                            <span
                                                                class="text-primary-emphasis h6 mb-0 text-center"
                                                                >{{
                                                                    "Contribution"
                                                                }}</span
                                                            >
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <span
                                                            :style="'font-size:0.8rem;'"
                                                            class="text-secondary d-block"
                                                            >{{
                                                                "Progress "
                                                            }}</span
                                                        >
                                                        <!-- Progress -->
                                                        <div
                                                            :class="
                                                                'btn shadow-sm px-1 py-0 me-2 ' +
                                                                (month +
                                                                    contribution_config?.start -
                                                                    1 <=
                                                                    thisMonth &&
                                                                month >
                                                                    (selected_contribution?.contribution
                                                                        ? selected_contribution
                                                                              ?.contribution
                                                                              ?.months
                                                                        : 0)
                                                                    ? 'bg-danger bg-opacity-25'
                                                                    : '') +
                                                                (month <=
                                                                selected_contribution
                                                                    ?.contribution
                                                                    ?.months
                                                                    ? 'bg-primary bg-opacity-25'
                                                                    : 'bg-secondary bg-opacity-25 border-dark-subtle border-1')
                                                            "
                                                            v-for="month in contribution_config.period"
                                                        >
                                                            <span
                                                                :style="'font-size: 0.7rem;'"
                                                                :class="
                                                                    'position-relative ' +
                                                                    (month <=
                                                                    selected_contribution
                                                                        ?.contribution
                                                                        ?.months
                                                                        ? 'text-primary'
                                                                        : 'text-secondary')
                                                                "
                                                                >{{
                                                                    getMonthName(
                                                                        month +
                                                                            contribution_config.start -
                                                                            1,
                                                                        "short"
                                                                    )
                                                                }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <span
                                                            :style="'font-size:0.8rem;'"
                                                            class="text-secondary d-block mt-2"
                                                            >{{
                                                                "Status "
                                                            }}</span
                                                        >
                                                        <!-- Status -->
                                                        <span
                                                            v-if="
                                                                selected_contribution_id >
                                                                0
                                                            "
                                                            class="text-dark d-block"
                                                            >{{
                                                                contribution_config.start +
                                                                    (selected_contribution?.contribution
                                                                        ? selected_contribution
                                                                              .contribution
                                                                              .months -
                                                                          1
                                                                        : 0) <=
                                                                thisMonth
                                                                    ? "Late for " +
                                                                      (thisMonth -
                                                                          contribution_config?.start -
                                                                          (selected_contribution?.contribution
                                                                              ? selected_contribution
                                                                                    ?.contribution
                                                                                    ?.months -
                                                                                1
                                                                              : -1) +
                                                                          (thisMonth -
                                                                              contribution_config?.start -
                                                                              (selected_contribution?.contribution
                                                                                  ? selected_contribution
                                                                                        ?.contribution
                                                                                        ?.months -
                                                                                    1
                                                                                  : -1) >
                                                                          1
                                                                              ? " months"
                                                                              : " month"))
                                                                    : "On track."
                                                            }}</span
                                                        >
                                                        <span
                                                            class="d-block text-dark fst-italic"
                                                            v-if="
                                                                selected_contribution_id <=
                                                                0
                                                            "
                                                        >
                                                            {{
                                                                "based on this month (" +
                                                                getMonthName(
                                                                    thisMonth
                                                                ) +
                                                                ")"
                                                            }}
                                                        </span>
                                                    </div>
                                                    <div class="col-12">
                                                        <span
                                                            :style="'font-size:0.8rem;'"
                                                            class="text-secondary d-block mt-2"
                                                            >{{
                                                                "Receipt "
                                                            }}</span
                                                        >
                                                        <!-- Receipt -->
                                                        <transition
                                                            name="fade"
                                                            mode="out-in"
                                                        >
                                                            <div class="">
                                                                <button
                                                                    v-if="
                                                                        selected_contribution
                                                                            ?.contribution
                                                                            ?.receipt
                                                                    "
                                                                    v-for="receipt in selected_contribution
                                                                        ?.contribution
                                                                        ?.receipt"
                                                                    :class="
                                                                        'border-1 border-primary-subtle btn btn-sm btn-outline-primary me-2 py-0 position-relative ' +
                                                                        (receipt.id ==
                                                                        selected_receipt?.id
                                                                            ? 'active'
                                                                            : '')
                                                                    "
                                                                    :key="
                                                                        receipt.id
                                                                    "
                                                                    @click="
                                                                        setSelectedReceipt(
                                                                            receipt.id
                                                                        )
                                                                    "
                                                                >
                                                                    {{
                                                                        selected_contribution?.contribution?.receipt.indexOf(
                                                                            receipt
                                                                        ) + 1
                                                                    }}
                                                                    <i
                                                                        class="bi bi-receipt ms-0"
                                                                    >
                                                                    </i>
                                                                    <i
                                                                        v-if="
                                                                            receipt.financial_id ==
                                                                            null
                                                                        "
                                                                        class="bi bi-circle-fill position-absolute top-0 start-100 translate-middle text-danger"
                                                                        :style="'font-size: 0.5rem;'"
                                                                    ></i>
                                                                </button>
                                                                <span
                                                                    class="text-secondary"
                                                                    v-else
                                                                    >{{
                                                                        " - "
                                                                    }}</span
                                                                >
                                                            </div>
                                                        </transition>
                                                    </div>
                                                    <transition name="fade">
                                                        <div
                                                            class="col-12"
                                                            v-if="
                                                                selected_receipt_id
                                                            "
                                                        >
                                                            <div
                                                                class="card mt-2 bg-light"
                                                            >
                                                                <div
                                                                    class="row mt-2"
                                                                >
                                                                    <div
                                                                        class="col-12 d-flex"
                                                                    >
                                                                        <a
                                                                            :href="
                                                                                '/storage/images/receipt/contribution/' +
                                                                                selected_receipt.receipt
                                                                            "
                                                                            class="btn btn-sm btn-light border-0 mx-auto"
                                                                            download
                                                                        >
                                                                            {{
                                                                                selected_receipt.receipt
                                                                            }}
                                                                            <i
                                                                                :style="'font-size: 0.8rem;'"
                                                                                class="bi bi-download text-primary ms-2 my-auto"
                                                                            ></i>
                                                                        </a>
                                                                        <button
                                                                            class="btn btn-sm btn-light me-2"
                                                                            @click="
                                                                                setSelectedReceipt(
                                                                                    null
                                                                                )
                                                                            "
                                                                        >
                                                                            <i
                                                                                class="bi bi-x-lg"
                                                                            ></i>
                                                                        </button>
                                                                    </div>
                                                                    <div
                                                                        class="col-12"
                                                                    >
                                                                        <div
                                                                            class="card border-1 m-2"
                                                                        >
                                                                            <transition
                                                                                name="fade"
                                                                                mode="out-in"
                                                                            >
                                                                                <img
                                                                                    :key="
                                                                                        selected_receipt
                                                                                    "
                                                                                    :src="
                                                                                        '/storage/images/receipt/contribution/' +
                                                                                        selected_receipt.receipt
                                                                                    "
                                                                                    class="w-100 rounded"
                                                                                    alt="image"
                                                                                />
                                                                            </transition>
                                                                        </div>
                                                                        <div
                                                                            class="d-flex mb-1"
                                                                            v-if="
                                                                                auth_user.roles_id ==
                                                                                2
                                                                            "
                                                                        >
                                                                            <transition
                                                                                name="fade"
                                                                                mode="out-in"
                                                                            >
                                                                                <button
                                                                                    @click="
                                                                                        confirmation(
                                                                                            route(
                                                                                                'contribution.validation',
                                                                                                selected_receipt.id
                                                                                            ),
                                                                                            'Confirm to ' +
                                                                                                (selected_receipt.financial_id
                                                                                                    ? 'unvalidate'
                                                                                                    : 'validate') +
                                                                                                ' ' +
                                                                                                selected_receipt.receipt +
                                                                                                '?'
                                                                                        )
                                                                                    "
                                                                                    :class="
                                                                                        'mx-2 w-100 btn btn-sm btn-' +
                                                                                        (selected_receipt.financial_id
                                                                                            ? 'secondary'
                                                                                            : 'success')
                                                                                    "
                                                                                    :style="'font-size: 0.8rem;'"
                                                                                >
                                                                                    {{
                                                                                        selected_receipt.financial_id
                                                                                            ? "Unvalid for " +
                                                                                              selected_receipt.months +
                                                                                              (selected_receipt.months >
                                                                                              1
                                                                                                  ? " months"
                                                                                                  : " month")
                                                                                            : "Valid for " +
                                                                                              selected_receipt.months +
                                                                                              (selected_receipt.months >
                                                                                              1
                                                                                                  ? " months"
                                                                                                  : " month")
                                                                                    }}
                                                                                </button>
                                                                            </transition>
                                                                        </div>
                                                                        <div
                                                                            class="d-flex text-center w-100 px-2 mb-1"
                                                                            v-if="
                                                                                auth_user.roles_id !==
                                                                                2
                                                                            "
                                                                        >
                                                                            <transition
                                                                                name="fade"
                                                                                mode="out-in"
                                                                            >
                                                                                <span
                                                                                    class="fw-light text-secondary"
                                                                                    :style="'font-size: 0.8rem;'"
                                                                                >
                                                                                    {{
                                                                                        selected_receipt.financial_id
                                                                                            ? "Valid for " +
                                                                                              selected_receipt.months +
                                                                                              (selected_receipt.months >
                                                                                              1
                                                                                                  ? " months"
                                                                                                  : " month") +
                                                                                              " by "
                                                                                            : "Unvalid for " +
                                                                                              selected_receipt.months +
                                                                                              (selected_receipt.months >
                                                                                              1
                                                                                                  ? " months"
                                                                                                  : " month")
                                                                                    }}
                                                                                    <span
                                                                                        v-if="
                                                                                            selected_receipt.financial_id
                                                                                        "
                                                                                        class="scroll-x-hidden"
                                                                                    >
                                                                                        <span
                                                                                            class="text-nowrap"
                                                                                        >
                                                                                            {{
                                                                                                selected_receipt
                                                                                                    .financial
                                                                                                    .name
                                                                                            }}
                                                                                        </span>
                                                                                    </span>
                                                                                </span>
                                                                            </transition>
                                                                            <transition
                                                                                name="fade"
                                                                                mode="out-in"
                                                                            >
                                                                                <span
                                                                                    class="fw-light text-secondary ms-auto"
                                                                                    :style="'font-size: 0.8rem;'"
                                                                                >
                                                                                    {{
                                                                                        selected_receipt.financial_id
                                                                                            ? formatDate(
                                                                                                  selected_receipt.updated_at
                                                                                              )
                                                                                            : ""
                                                                                    }}
                                                                                </span>
                                                                            </transition>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </transition>
                                                </div>
                                            </div>
                                        </transition>
                                        <!-- Staff Payroll -->
                                        <transition name="fade-slide-rtl">
                                            <div
                                                class="col-12 col-lg-6"
                                                v-if="
                                                    active_tab == 2 ||
                                                    isLargeScreen
                                                "
                                            >
                                                <div class="row g-2">
                                                    <div
                                                        class="col-12 d-lg-block d-none"
                                                    >
                                                        <div
                                                            class="d-flex bg-light p-3"
                                                        >
                                                            <span
                                                                class="text-primary-emphasis h6 mb-0 text-center"
                                                                >{{
                                                                    "Payroll"
                                                                }}</span
                                                            >
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <span
                                                            class="text-secondary d-block"
                                                            style="
                                                                font-size: 0.8rem;
                                                            "
                                                            >{{ "Level" }}</span
                                                        >
                                                        <span
                                                            class="mt-1"
                                                            v-if="
                                                                auth_user.roles_id !==
                                                                    2 ||
                                                                !(
                                                                    selected_contribution?.id >
                                                                    0
                                                                )
                                                            "
                                                            >{{
                                                                selected_contribution?.level ??
                                                                " - "
                                                            }}</span
                                                        >
                                                        <div
                                                            v-if="
                                                                auth_user.roles_id ==
                                                                    2 &&
                                                                selected_contribution?.id >
                                                                    0
                                                            "
                                                            class="input-group input-group-sm bg-light border rounded-2 mt-1"
                                                        >
                                                            <select
                                                                v-model="
                                                                    form_update_payroll_single.level
                                                                "
                                                                class="form-select border-0"
                                                            >
                                                                <option
                                                                    value="0"
                                                                >
                                                                    {{
                                                                        "Unset"
                                                                    }}
                                                                </option>
                                                                <option
                                                                    :value="
                                                                        i.level
                                                                    "
                                                                    v-for="i in payroll_detail"
                                                                >
                                                                    {{
                                                                        "Level " +
                                                                        i.level
                                                                    }}
                                                                </option>
                                                            </select>
                                                            <button
                                                                @click="
                                                                    handleUpdatePayrollSingle
                                                                "
                                                                class="btn btn-sm btn-outline-primary border-0 py-0"
                                                            >
                                                                <i
                                                                    class="bi bi-check-lg"
                                                                ></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <span
                                                            class="text-secondary d-block"
                                                            style="
                                                                font-size: 0.8rem;
                                                            "
                                                            >{{
                                                                "Salary (Rp)"
                                                            }}</span
                                                        >
                                                        <span>{{
                                                            formatIDR(
                                                                payroll_detail.find(
                                                                    (item) =>
                                                                        item.level ==
                                                                        selected_contribution?.level
                                                                )?.salary_idr ??
                                                                    0
                                                            )
                                                        }}</span>
                                                    </div>
                                                    <div
                                                        class="col-12"
                                                        v-if="
                                                            auth_user.roles_id ==
                                                            2
                                                        "
                                                    >
                                                        <div
                                                            class="rounded-2 border"
                                                        >
                                                            <button
                                                                @click="
                                                                    () => {
                                                                        is_batch =
                                                                            !is_batch;
                                                                    }
                                                                "
                                                                data-bs-toggle="collapse"
                                                                data-bs-target="#batchLevelAssignmentDiv"
                                                                class="btn btn-sm text-primary border-0 w-100 py-2 d-flex"
                                                            >
                                                                {{
                                                                    "Batch Level Assignment"
                                                                }}
                                                                <i
                                                                    class="bi bi-chevron-down ms-auto"
                                                                ></i>
                                                            </button>
                                                            <div
                                                                class="collapse p-3"
                                                                id="batchLevelAssignmentDiv"
                                                            >
                                                                <span
                                                                    class="text-secondary d-block"
                                                                    style="
                                                                        font-size: 0.8rem;
                                                                    "
                                                                    >{{
                                                                        "Selected staff"
                                                                    }}</span
                                                                >
                                                                <span
                                                                    class="mb-3 d-block"
                                                                >
                                                                    {{
                                                                        form_update_payroll_batch
                                                                            .staff_id_list
                                                                            .length +
                                                                        (form_update_payroll_batch
                                                                            .staff_id_list
                                                                            .length >
                                                                        1
                                                                            ? " persons"
                                                                            : " person")
                                                                    }}
                                                                </span>
                                                                <InputError
                                                                    :message="
                                                                        form_update_payroll_batch
                                                                            .errors
                                                                            .staff_id_list
                                                                    "
                                                                />
                                                                <span
                                                                    class="text-secondary d-block"
                                                                    style="
                                                                        font-size: 0.8rem;
                                                                    "
                                                                    >{{
                                                                        "Update to"
                                                                    }}</span
                                                                >
                                                                <div
                                                                    class="input-group input-group-sm bg-light border border-1 border-secondary-subtle rounded-2"
                                                                >
                                                                    <span
                                                                        class="form-label px-2 py-0 my-auto text-secondary"
                                                                        for="batch_level"
                                                                        >{{
                                                                            "Level"
                                                                        }}</span
                                                                    >
                                                                    <select
                                                                        id="batch_level"
                                                                        v-model="
                                                                            form_update_payroll_batch.level
                                                                        "
                                                                        class="form-select border-0"
                                                                    >
                                                                        <option
                                                                            value=""
                                                                        >
                                                                            {{
                                                                                "Unset"
                                                                            }}
                                                                        </option>
                                                                        <option
                                                                            :value="
                                                                                i.level
                                                                            "
                                                                            v-for="i in payroll_detail"
                                                                        >
                                                                            {{
                                                                                "Level " +
                                                                                i.level
                                                                            }}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <InputError
                                                                    :message="
                                                                        form_update_payroll_batch
                                                                            .errors
                                                                            .level
                                                                    "
                                                                />
                                                                <button
                                                                    @click="
                                                                        handleUpdatePayrollBatch
                                                                    "
                                                                    class="btn btn-sm btn-primary border-0 py-1 mt-3 w-100"
                                                                >
                                                                    {{
                                                                        "Update Level"
                                                                    }}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Staff List -->
            <div class="row gx-4 mt-4">
                <div class="col-12 col-lg-6">
                    <transition name="fade" mode="out-in">
                        <div
                            class="card sm p-3"
                            v-if="selected_receipt_id == null"
                        >
                            <div class="row">
                                <div class="col-12">
                                    <div
                                        class="d-flex border-primary border-bottom pb-2"
                                    >
                                        <span
                                            class="text-primary-emphasis me-auto my-auto h6"
                                        >
                                            <i class="bi bi-people me-1"></i>
                                            {{ "Staff List" }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <!-- Staff Filter -->
                            <div class="d-flex mt-2">
                                <button
                                    class="btn btn-sm btn-outline-primary border me-2 text-nowrap"
                                    v-if="
                                        form_update_payroll_batch.staff_id_list
                                            .length > 0
                                    "
                                    @click="
                                        () => {
                                            form_update_payroll_batch.staff_id_list =
                                                [];
                                        }
                                    "
                                >
                                    {{ "Unselect all" }}
                                </button>
                                <div class="input-group">
                                    <input
                                        type="text"
                                        class="form-control form-control-sm py-0"
                                        placeholder="Search"
                                        aria-label="Search"
                                        aria-describedby="basic-addon1"
                                        v-model="
                                            form_contribution_filter.keyword
                                        "
                                        @input="handleContributionFilter"
                                    />
                                    <span
                                        class="input-group-text py-0"
                                        id="basic-addon1"
                                        ><i
                                            class="bi bi-search"
                                            :style="'font-size: 0.9rem'"
                                        ></i
                                    ></span>
                                </div>
                            </div>
                            <!-- Staff List -->
                            <div
                                class="scroll-container-2 scroll-container-lg-2"
                            >
                                <li class="list-group list-group-flush">
                                    <ul
                                        class="list-group-item list-group-item-action"
                                        v-if="contribution_users.length == 0"
                                    >
                                        <span
                                            class="fst-italic text-secondary"
                                            >{{ "No employee found." }}</span
                                        >
                                    </ul>
                                    <ul
                                        :class="
                                            'list-group-item list-group-item-action mb-0 py-1 px-0 ' +
                                            (contribution.id ==
                                            selected_contribution_id
                                                ? 'bg-light'
                                                : '')
                                        "
                                        v-if="contribution_users.length > 0"
                                        v-for="contribution in contribution_users"
                                        @click="
                                            () => {
                                                setSelectedContribution(
                                                    contribution.id
                                                );
                                                form_update_payroll_single.level =
                                                    contribution.level;
                                                form_update_payroll_single.user_id =
                                                    contribution.id;
                                            }
                                        "
                                    >
                                        <div class="mx-2 d-flex">
                                            <input
                                                type="checkbox"
                                                v-if="is_batch"
                                                class="form-check-input me-2"
                                                v-model="
                                                    form_update_payroll_batch.staff_id_list
                                                "
                                                :value="contribution.id"
                                                @click.stop
                                            />
                                            <span
                                                :class="
                                                    'me-auto ' +
                                                    (contribution.id ==
                                                    selected_contribution_id
                                                        ? ''
                                                        : 'text-secondary')
                                                "
                                                >{{ contribution.name }}</span
                                            >

                                            <div
                                                class="d-flex"
                                                v-if="!is_batch"
                                            >
                                                <span
                                                    v-if="
                                                        contribution
                                                            .contribution
                                                            ?.months +
                                                            contribution_config.start -
                                                            1 <=
                                                            getMonth(date) +
                                                                1 ||
                                                        !contribution.contribution
                                                    "
                                                    class="text-danger ms-auto border-danger-subtle border px-2 rounded-2 text-nowrap d-flex"
                                                    style="font-size: 0.8rem"
                                                >
                                                    <span class="my-auto">
                                                        {{ "Late" }}
                                                    </span>
                                                    <i
                                                        class="bi bi-exclamation my-auto"
                                                    ></i>
                                                </span>
                                            </div>
                                            <span
                                                class="text-secondary ms-2"
                                                v-if="is_batch"
                                                >{{
                                                    contribution?.level
                                                        ? "Level " +
                                                          contribution.level
                                                        : "Unset"
                                                }}</span
                                            >
                                        </div>
                                    </ul>
                                </li>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </StaffLayout>

    <!-- Modal -->
    <!-- Contribution Setting Modal -->
    <div
        v-if="auth_user.roles_id == 2"
        class="modal fade"
        id="modalSettingContribution"
        tabindex="-1"
        aria-labelledby="modalSettingContribution"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3 text-dark">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i
                            class="bi bi-gear border-secondary border-end me-2 pe-2"
                        ></i>
                        {{ "Contribution Settings" }}
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
                <form @submit.prevent="handleSetContribution()">
                    <div class="modal-body bg-light pt-1">
                        <div class="row pt-0">
                            <div class="col-12">
                                <div class="d-flex">
                                    <i
                                        class="bi bi-exclamation-triangle text-danger me-2 ms-auto my-auto pb-2 fs-4"
                                    ></i>
                                    <span
                                        :style="'font-size:0.8rem;'"
                                        class="me-auto text-danger w-50 mb-1"
                                    >
                                        {{
                                            "Changing charge price may result in all receipts having to be "
                                        }}
                                        <span
                                            class="text-decoration-underline"
                                            >{{ "revalidated" }}</span
                                        >
                                        {{ "." }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center mb-2">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="contribution_setting_price"
                                    class="form-label d-inline-block"
                                    >{{ "Charge" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    type="number"
                                    class="form-control form-control-sm"
                                    id="contribution_setting_price"
                                    v-model="form_contribution_setting.price"
                                    placeholder="Dana Fakultas or etc..."
                                />
                                <InputError
                                    :messages="
                                        form_contribution_setting.errors.price
                                    "
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center mb-2">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="contribution_setting_start"
                                    class="form-label d-inline-block"
                                    >{{ "Start Month" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <select
                                    class="form-control form-control-sm form-select"
                                    id="contribution_setting_start"
                                    v-model="form_contribution_setting.start"
                                >
                                    <option :value="i" v-for="i in 12" :key="i">
                                        {{ getMonthName(i) }}
                                    </option>
                                </select>
                                <InputError
                                    :messages="
                                        form_contribution_setting.errors.start
                                    "
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="contribution_setting_end"
                                    class="form-label d-inline-block"
                                    >{{ "End Month" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <select
                                    class="form-control form-control-sm form-select"
                                    id="contribution_setting_end"
                                    v-model="form_contribution_setting.end"
                                >
                                    <option :value="i" v-for="i in 12" :key="i">
                                        {{ getMonthName(i) }}
                                    </option>
                                </select>
                                <InputError
                                    :messages="
                                        form_contribution_setting.errors.end
                                    "
                                    class="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-1">
                        <button type="submit" class="btn btn-sm btn-primary">
                            {{ "Set" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Payroll Setting Modal -->
    <div
        v-if="auth_user.roles_id == 2"
        class="modal fade"
        id="modalSettingPayroll"
        tabindex="-1"
        aria-labelledby="modalSettingPayroll"
    >
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content shadow mx-3 text-dark">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i
                            class="bi bi-gear border-secondary border-end me-2 pe-2"
                        ></i>
                        {{ "Payroll Settings" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showPayrollSettingsModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <form @submit.prevent="handleSetPayroll()">
                    <div class="modal-body bg-light pt-3">
                        <div class="row justify-content-center mb-3">
                            <div class="col-12 col-lg-2">
                                <label
                                    for="payroll_setting_balance"
                                    class="form-label d-inline-block ms-0"
                                    >{{ "Budget" }}</label
                                >
                            </div>
                            <div class="col-12 col-lg-8">
                                <div
                                    class="input-group input-group-sm bg-secondary rounded-2 ps-2"
                                >
                                    <label
                                        for="payroll_setting_balance"
                                        class="form-label d-inline-block me-2 my-auto text-white"
                                        >{{ "Rp" }}</label
                                    >
                                    <input
                                        type="number"
                                        class="form-control form-control-sm"
                                        id="payroll_setting_balance"
                                        v-model="form_payroll_setting.balance"
                                        placeholder="Dana Fakultas or etc..."
                                    />
                                </div>
                                <InputError
                                    :messages="
                                        form_payroll_setting.errors.balance
                                    "
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center mb-3">
                            <div class="col-12 col-lg-2">
                                <label class="form-label d-inline-block ms-0">{{
                                    "Level"
                                }}</label>
                            </div>
                            <div class="col-12 col-lg-8">
                                <div
                                    v-for="(
                                        item, index
                                    ) in form_payroll_setting.level_list"
                                >
                                    <div
                                        class="d-flex mb-2"
                                        v-if="item.deleted_at == null"
                                    >
                                        <div class="me-2">
                                            <div
                                                class="input-group input-group-sm bg-secondary text-white rounded-2 px-2"
                                            >
                                                <label
                                                    :for="
                                                        'payroll_setting_level' +
                                                        item.id
                                                    "
                                                    class="form-label my-auto me-2"
                                                    >{{ "Level" }}</label
                                                >
                                                <input
                                                    type="number"
                                                    class="form-control form-control-sm"
                                                    :id="
                                                        'payroll_setting_level' +
                                                        item.id
                                                    "
                                                    v-model="
                                                        form_payroll_setting
                                                            .level_list[index]
                                                            .level
                                                    "
                                                    placeholder="ex: 1, 2, ..."
                                                />
                                                <input
                                                    type="number"
                                                    class="form-control form-control-sm"
                                                    :id="
                                                        'payroll_setting_salary' +
                                                        item.id
                                                    "
                                                    v-model="
                                                        form_payroll_setting
                                                            .level_list[index]
                                                            .salary
                                                    "
                                                    placeholder="ex: 20, 50, ..."
                                                />
                                                <span
                                                    class="form-label ms-2 my-auto"
                                                    >{{ "%" }}</span
                                                >
                                            </div>
                                            <div class="d-flex">
                                                <div class="w-100">
                                                    <InputError
                                                        :messages="
                                                            form_payroll_setting
                                                                .errors
                                                                .level_list
                                                                ? form_payroll_setting
                                                                      .errors
                                                                      .level_list[
                                                                      index
                                                                  ].level
                                                                : null
                                                        "
                                                        class="mt-2"
                                                    />
                                                </div>
                                                <div class="w-100">
                                                    <InputError
                                                        :messages="
                                                            form_payroll_setting
                                                                .errors
                                                                .level_list
                                                                ? form_payroll_setting
                                                                      .errors
                                                                      .level_list[
                                                                      index
                                                                  ].salary
                                                                : null
                                                        "
                                                        class="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex ms-2 my-auto">
                                            <span
                                                class="text-nowrap text-primary-emphasis"
                                            >
                                                {{
                                                    formatIDR(
                                                        item.salary *
                                                            payroll_balance.balance *
                                                            0.01
                                                    )
                                                }}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            @click="removeLevel(index)"
                                            class="btn btn-sm btn-outline-secondary border-0 py-0 ms-2"
                                        >
                                            <i class="bi bi-trash3"></i>
                                        </button>
                                    </div>
                                </div>
                                <InputError
                                    :message="
                                        form_payroll_setting.errors.level_list
                                    "
                                />
                                <div class="d-block mt-2">
                                    <span
                                        v-if="
                                            form_payroll_setting.level_list.reduce(
                                                (sum, item) =>
                                                    sum + item.salary,
                                                0
                                            ) > 100
                                        "
                                        class="d-flex my-auto text-danger"
                                        style="font-size: 0.8rem"
                                    >
                                        <i
                                            class="bi bi-exclamation-triangle me-2"
                                        ></i>
                                        {{
                                            "Warning! Total salary percentage is can`t be bigger than 100."
                                        }}
                                    </span>
                                    <span
                                        v-if="
                                            form_payroll_setting.level_list.reduce(
                                                (sum, item) =>
                                                    sum + item.salary,
                                                0
                                            ) < 100
                                        "
                                        class="d-flex my-auto text-danger"
                                        style="font-size: 0.8rem"
                                    >
                                        <i
                                            class="bi bi-exclamation-triangle me-2"
                                        ></i>
                                        {{
                                            "Warning! Total salary percentage is less than 100."
                                        }}
                                    </span>
                                    <div class="d-flex w-100">
                                        <button
                                            type="button"
                                            class="btn btn-sm btn-outline-secondary border-0 py-0 text-nowrap"
                                            @click="resetPayrollSetting"
                                        >
                                            {{ "Reset" }}
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-sm btn-outline-primary border-0 py-0 ms-auto text-nowrap"
                                            @click="newLevel"
                                        >
                                            {{ "New Level" }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-1">
                        <button
                            type="submit"
                            class="btn btn-sm btn-primary w-25"
                        >
                            {{ "Set" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Notif Toast -->
    <Notif ref="toastNotifRef" />
</template>
