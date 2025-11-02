<script setup>
import StaffLayout from "@/Layouts/StaffLayout.vue";
import InputError from "@/Components/InputError.vue";
import Notif from "@/Components/Notif.vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import ModalAlertNotification from "@/Components/ModalAlertNotification.vue";
import { Head, useForm, usePage } from "@inertiajs/vue3";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
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
    formatTime,
    formatTimeOnly,
    showPassword,
} from "@/utils";
import { format } from "date-fns";

const props = defineProps({
    income_list: Array,
    menu_category: Object,
    expense_list: Array,
    food_tag_list: Array,
    users: Array,
    stand: Object,
    dana_contact: Object,
    notif: Object,
    errors: Object,
});

const auth_user = usePage().props.auth.user;
const title = ref(props.stand.name);
const modalConfirmationRef = ref(null);
const modalAlertNotificationRef = ref(null);
const toastNotifRef = ref(null);
const receiptContentRef = ref(null);
const placeholder = ref("placeholder");
const modalProductionStaff = ref(null);
const modalCashierStaff = ref(null);
const modalDanaContact = ref(null);
const modalEditStand = ref(null);
const modalDeleteStand = ref(null);
const modalAddMenu = ref(null);
const modalAddStock = ref(null);
const modalAddExpense = ref(null);
const modalIncomeDetail = ref(null);
const modalEditMenuImage = ref(null);
const fileEditMenuImageRef = ref(null);
const stand_status = computed(() => {
    if (props.stand.menu_lock > 0 && props.stand.sale_validation == 0) {
        return "Active";
    } else if (props.stand.menu_lock > 0 && props.stand.sale_validation > 0) {
        return "Inactive";
    } else {
        return "Waiting for menu lock";
    }
});
const stand_type = [
    { value: 0, name: "Live" },
    { value: 1, name: "Pre-Order" },
    { value: 2, name: "Live and Pre-Order" },
];
const active_tab = ref(1);
const next_tab = ref(1);
const prev_tab = ref(1);
const selected_expense = ref(null);
const selected_income = ref(null);
const selected_stock = ref(null);
const selected_menu = ref(null);
const is_cashier = computed(() => {
    return props.stand.cashier.some((cashier) => cashier.id == auth_user.id);
});
const is_production = computed(() => {
    return props.stand.production.some(
        (production) => production.id == auth_user.id
    );
});
const shop_status = computed(() => {
    if (props.stand.menu_lock > 0 && !(props.stand.sale_validation > 0)) {
        switch (props.stand.type) {
            case 0:
                return new Date().setHours(0, 0, 0, 0) ==
                    new Date(props.stand.date).setHours(0, 0, 0, 0)
                    ? "open"
                    : "close";

                break;
            case 1:
                return new Date().setHours(0, 0, 0, 0) <
                    new Date(props.stand.date).setHours(0, 0, 0, 0)
                    ? "open"
                    : "close";

                break;
            case 2:
                return new Date().setHours(0, 0, 0, 0) <=
                    new Date(props.stand.date).setHours(0, 0, 0, 0)
                    ? "open"
                    : "close";
                break;
            default:
                break;
        }
    } else {
        return "close";
    }
});

const new_production_staff = ref({
    staff: null,
    stand_id: props.stand.id,
});

const new_cashier_staff = ref({
    staff: null,
    stand_id: props.stand.id,
});

const form_edit_stand = useForm({
    name: props.stand.name,
    pic_id: props.stand.pic_id,
    place: props.stand.place,
    date: props.stand.date,
    type: props.stand.type,
});

const form_delete_stand = useForm({
    password: null,
});

const form_filter_expense = useForm({
    name: null,
});

const form_filter_income = useForm({
    name: null,
});

const form_add_menu = useForm({
    name: null,
    category: null,
    food_tag: null,
    price: null,
    stock: null,
    volume: null,
    volume_unit: null,
    mass: null,
    mass_unit: null,
    image: null,
});

const form_add_stock = useForm({
    id: null,
    amount: null,
});

const form_add_expense = useForm({
    name: null,
    price: null,
    qty: null,
    unit: null,
    reciept: null,
    receipt_same: null,
    same_receipt_check: null,
});

const form_set_dana_contact = useForm({
    name: null,
    number: null,
});

const form_production_staff = useForm({
    staff_list: props.stand.production,
});

const form_cashier_staff = useForm({
    staff_list: props.stand.cashier,
});

const form_edit_menu_image = useForm({
    image: null,
});

function showEditStandModal(is_show) {
    if (modalEditStand.value == null) {
        const modal = document.getElementById("editStandModal");
        modalEditStand.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalEditStand.value.show();
    } else {
        modalEditStand.value.hide();
    }
}

function showDeleteStandModal(is_show) {
    if (modalDeleteStand.value == null) {
        const modal = document.getElementById("deleteStandModal");
        modalDeleteStand.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalDeleteStand.value.show();
    } else {
        modalDeleteStand.value.hide();
    }
}

function showAddMenuModal(is_show) {
    if (modalAddMenu.value == null) {
        const modal = document.getElementById("addMenuModal");
        modalAddMenu.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalAddMenu.value.show();
    } else {
        modalAddMenu.value.hide();
    }
}

function showAddStockModal(is_show) {
    if (modalAddStock.value == null) {
        const modal = document.getElementById("addStockModal");
        modalAddStock.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalAddStock.value.show();
    } else {
        modalAddStock.value.hide();
    }
}

function showAddExpenseModal(is_show) {
    if (modalAddExpense.value == null) {
        const modal = document.getElementById("addExpenseModal");
        modalAddExpense.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalAddExpense.value.show();
    } else {
        modalAddExpense.value.hide();
    }
}

function showIncomeDetailModal(is_show) {
    if (modalIncomeDetail.value == null) {
        const modal = document.getElementById("incomeDetailModal");
        modalIncomeDetail.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalIncomeDetail.value.show();
    } else {
        modalIncomeDetail.value.hide();
    }
}

function showProductionStaffModal(is_show) {
    if (modalProductionStaff.value == null) {
        const modal = document.getElementById("prouctionStaffModal");
        modalProductionStaff.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalProductionStaff.value.show();
    } else {
        modalProductionStaff.value.hide();
    }
}

function showCashierStaffModal(is_show) {
    if (modalCashierStaff.value == null) {
        const modal = document.getElementById("cashierStaffModal");
        modalCashierStaff.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalCashierStaff.value.show();
    } else {
        modalCashierStaff.value.hide();
    }
}

function showDanaContactModal(is_show) {
    if (modalDanaContact.value == null) {
        const modal = document.getElementById("danaContactModal");
        modalDanaContact.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalDanaContact.value.show();
    } else {
        modalDanaContact.value.hide();
    }
}

function showEditMenuImageModal(is_show) {
    if (modalEditMenuImage.value == null) {
        const modal = document.getElementById("editMenuImageModal");
        modalEditMenuImage.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalEditMenuImage.value.show();
    } else {
        modalEditMenuImage.value.hide();
    }
}

function handleEditStand() {
    form_edit_stand.post(route("food.stand.update", props.stand.id), {
        onSuccess: () => {
            showEditStandModal(false);
            form_edit_stand.reset();
        },
    });
}

function handleAddMenu() {
    form_add_menu.post(route("stand.menu.add", props.stand.id), {
        onSuccess: () => {
            showAddMenuModal(false);
            form_add_menu.reset();
        },
        onError: (e) => {
            for (let key in e) {
                toastNotifRef.value.showToast("warning", e[key]);
            }
        },
    });
}

function handleEditMenuImage() {
    form_edit_menu_image.post(
        route("stand.menu.image.update", selected_menu.value.id),
        {
            onSuccess: () => {
                showEditMenuImageModal(false);
                form_edit_menu_image.reset();
                fileEditMenuImageRef.value.value = null;
            },
            onError: (e) => {
                for (let key in e) {
                    toastNotifRef.value.showToast("warning", e[key]);
                }
            },
        }
    );
}

const handleFileUploadMenuImage = (event) => {
    form_add_menu.image = event.target.files[0];
};

const handleFileEditMenuImage = (event) => {
    form_edit_menu_image.image = event.target.files[0];
};

function handleAddStock() {
    form_add_stock.id = selected_stock.value?.id;
    form_add_stock.post(route("stand.menu.stock.update", props.stand.id), {
        onSuccess: () => {
            showAddStockModal(false);
            form_add_stock.reset();
        },
        onError: (e) => {
            for (let key in e) {
                toastNotifRef.value.showToast("warning", e[key]);
            }
        },
    });
}

function handleAddExpense() {
    form_add_expense.post(route("stand.expense.add", props.stand.id), {
        onSuccess: () => {
            showAddMenuModal(false);
            form_add_expense.reset();
        },
        onError: (e) => {
            for (let key in e) {
                toastNotifRef.value.showToast("warning", e[key]);
            }
        },
    });
}

function handleDeleteStand() {
    form_delete_stand.post(route("food.stand.delete", props.stand.id), {
        onSuccess: () => {
            showDeleteStandModal(false);
            form_delete_stand.reset();
        },
        onError: (e) => {
            for (let key in e) {
                toastNotifRef.value.showToast("warning", e[key]);
            }
        },
    });
}

function handleFilterExpense() {
    form_filter_expense.post(route("stand.expense.filter"));
}

function handleFilterIncome() {
    form_filter_income.post(route("stand.income.filter"));
}

function handleFileAddExpenseReceipt(event) {
    form_add_expense.reciept = event.target.files[0];
}

function handleSetProductionStaff() {
    form_production_staff.post(
        route("update.stand.production_staff", props.stand.id),
        {
            onSuccess: () => {
                form_production_staff.staff_list = props.stand.production;
                showProductionStaffModal(false);
            },
        }
    );
}

function handleSetCashierStaff() {
    form_cashier_staff.post(
        route("update.stand.cashier_staff", props.stand.id),
        {
            onSuccess: () => {
                form_cashier_staff.staff_list = props.stand.cashier;
                showCashierStaffModal(false);
            },
        }
    );
}

function handleSetDanaContact() {
    form_set_dana_contact.post(route("shop.payment.dana.set"), {
        onSuccess: () => {
            form_set_dana_contact.reset();
            showDanaContactModal(false);
        },
    });
}

function removeProductionStaff(index) {
    if (Object.keys(form_production_staff.staff_list[index]).length > 3) {
        form_production_staff.staff_list[index].deleted_at = new Date();
    } else {
        form_production_staff.staff_list.splice(index, 1);
    }
}

function removeCashierStaff(index) {
    if (Object.keys(form_cashier_staff.staff_list[index]).length > 3) {
        form_cashier_staff.staff_list[index].deleted_at = new Date();
    } else {
        form_cashier_staff.staff_list.splice(index, 1);
    }
}

function showTab(number) {
    prev_tab.value = active_tab.value;
    active_tab.value = 0;
    next_tab.value = number;
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

function showImage(event) {
    utils.showImage(event);
}

const downloadReceipt = async () => {
    toastNotifRef.value.showToast("info", "Download started!");
    setTimeout(() => {
        toastNotifRef.value.showToast(
            "info",
            "Check the progress in your browser."
        );
    }, 1500);
    const element = receiptContentRef.value;
    const canvas = await html2canvas(element, {
        scale: 2, // higher quality
    });
    const date = new Date(selected_income.value.created_at);
    const receiptPrintedImageUrl = canvas.toDataURL("image/png", 0.8);
    // Optional: download
    const link = document.createElement("a");
    link.href = receiptPrintedImageUrl;
    link.download =
        "receipt" +
        props.stand.id +
        auth_user.id +
        format(date, "HHmm") +
        ".png";
    link.click();
};

const printReceipt = async () => {
    // Send to Whatsapp
    const customer_phone = selected_income?.value.customer?.phone;
    if (customer_phone) {
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
    } else {
        showIncomeDetailModal(false);
        alertNotification(
            "This customer is not registered and phone number is not found. Can not open whatsapp chat."
        );
    }
};

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
        <ModalAlertNotification ref="modalAlertNotificationRef" />
        <template #header>
            <a
                :href="route('food.stand')"
                class="bg-opacity-0 text-decoration-none text-primary-emphasis"
            >
                <span class="fw-light">{{ "Stand" }}</span>
            </a>
            <span class="ms-2">{{ "/" }}</span>
            {{ title }}
        </template>

        <div class="container me-lg-0 mx-auto mb-5">
            <!-- Detail -->
            <div class="row gx-4 mt-4 mb-5">
                <div class="col-12">
                    <div class="card bg-white p-3">
                        <div class="d-flex border-bottom border-primary">
                            <span class="h5 text-primary-emphasis me-auto"
                                ><i class="bi bi-shop me-2"></i
                                >{{ "Stand " + stand.name }}</span
                            >
                            <button
                                v-if="auth_user.id == stand.pic_id"
                                @click="
                                    () => {
                                        showEditStandModal(true);
                                        form_edit_stand.name = stand.name;
                                        form_edit_stand.pic_id = stand.pic_id;
                                        form_edit_stand.place = stand.place;
                                        form_edit_stand.date = stand.date;
                                        form_edit_stand.type = stand.type;
                                    }
                                "
                                class="btn btn-sm btn-outline-secondary border-0 py-0 mb-auto"
                            >
                                <span class="d-none d-lg-block">{{
                                    "Edit"
                                }}</span>
                                <i class="bi bi-pencil d-lg-none"></i>
                            </button>
                            <div
                                v-if="
                                    auth_user.id == stand.pic_id &&
                                    auth_user.roles_id == 3
                                "
                                class="border-start border-2 mx-1 mb-2"
                            ></div>
                            <button
                                v-if="auth_user.roles_id == 3"
                                @click="showDeleteStandModal(true)"
                                class="btn btn-sm btn-outline-danger border-0 py-0 mb-auto"
                            >
                                <span class="d-none d-lg-block">{{
                                    "Delete"
                                }}</span>
                                <i class="bi bi-trash3 d-lg-none"></i>
                            </button>
                        </div>
                        <div class="row g-2 mt-1">
                            <div class="col-6 col-lg-3">
                                <span
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Person In Charge" }}</span
                                >
                                <div class="scroll-x-hidden">
                                    <span
                                        class="d-block text-primary-emphasis text-nowrap"
                                        >{{ stand.pic.name }}</span
                                    >
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
                                <span
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Status" }}</span
                                >
                                <div class="d-flex">
                                    <div class="scroll-x-hidden">
                                        <span
                                            :class="
                                                'd-block text-nowrap ' +
                                                (stand_status == 'Active'
                                                    ? 'text-success'
                                                    : 'text-primary-emphasis')
                                            "
                                            >{{ stand_status }}
                                        </span>
                                    </div>
                                    <span
                                        :class="
                                            'd-block text-nowrap px-2 ms-2 rounded ' +
                                            (shop_status == 'open'
                                                ? 'text-white bg-success'
                                                : 'text-secondary')
                                        "
                                        >{{ shop_status}}</span
                                    >
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
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
                            <div class="col-6 col-lg-3">
                                <span
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Date" }}</span
                                >
                                <div class="scroll-x-hidden">
                                    <span
                                        class="d-block text-primary-emphasis text-nowrap"
                                        >{{ formatDateOnly(stand.date) }}</span
                                    >
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
                                <span
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Type" }}</span
                                >
                                <div class="scroll-x-hidden">
                                    <span
                                        class="d-block text-primary-emphasis text-nowrap"
                                        >{{
                                            stand_type.find(
                                                (item) =>
                                                    item.value == stand.type
                                            ).name
                                        }}</span
                                    >
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
                                <span
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Profit" }}</span
                                >
                                <div class="scroll-x-hidden">
                                    <span
                                        class="d-block text-primary-emphasis text-nowrap"
                                        >{{ formatIDR(stand.profit) }}</span
                                    >
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
                                <span
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Income" }}</span
                                >
                                <div class="scroll-x-hidden">
                                    <span
                                        class="d-block text-primary-emphasis text-nowrap"
                                        >{{ formatIDR(stand.income) }}</span
                                    >
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
                                <span
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Expense" }}</span
                                >
                                <div class="scroll-x-hidden">
                                    <span
                                        class="d-block text-primary-emphasis text-nowrap"
                                        >{{ formatIDR(stand.expense) }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- List -->
            <!-- Header -->
            <div class="row gx-4 mt-4">
                <div class="col-12">
                    <div class="card bg-white p-1 d-lg-none">
                        <div class="d-flex">
                            <button
                                @click="showTab(1)"
                                class="btn btn-sm btn-outline-primary border-0 w-100 me-2"
                            >
                                <span v-if="active_tab == 1">{{ "Menu" }}</span>
                                <i
                                    class="bi bi-list-ul"
                                    v-if="active_tab !== 1"
                                ></i>
                            </button>
                            <button
                                @click="showTab(2)"
                                class="btn btn-sm btn-outline-primary border-0 w-100 me-2"
                            >
                                <span v-if="active_tab == 2">{{
                                    "Expense"
                                }}</span>
                                <i
                                    class="bi bi-cart4"
                                    v-if="active_tab !== 2"
                                ></i>
                            </button>

                            <button
                                @click="showTab(3)"
                                class="btn btn-sm btn-outline-primary border-0 w-100 me-2"
                            >
                                <span v-if="active_tab == 3">{{
                                    "Income"
                                }}</span>
                                <i
                                    class="bi bi-graph-up"
                                    v-if="active_tab !== 3"
                                ></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Tabs -->
            <div class="row gx-4 mt-4 mt-lg-0">
                <transition
                    name="fade-slide-ltr"
                    mode="out-in"
                    @after-leave="proceedTab()"
                >
                    <!-- Menu List -->
                    <div
                        class="col-12 col-lg-4"
                        v-if="active_tab == 1 || isLargeScreen"
                    >
                        <div class="card bg-white p-2">
                            <div class="d-flex pb-2">
                                <span class="text-primary ms-2">
                                    <i
                                        class="bi bi-list-ul me-2 d-none d-lg-inline"
                                    ></i
                                    >{{ "Menu" }}</span
                                >
                                <div class="ms-auto me-2 d-flex">
                                    <div
                                        @click="
                                            stand_status !==
                                            'Waiting for menu lock'
                                                ? stand_status == 'active'
                                                    ? alertNotification(
                                                          'You can`t change menu list after being locked by Operational Staff.'
                                                      )
                                                    : alertNotification(
                                                          'This stand is inactive. All feature are locked.'
                                                      )
                                                : ''
                                        "
                                    >
                                        <button
                                            v-if="auth_user.id == stand.pic_id"
                                            @click="
                                                stand_status ==
                                                'Waiting for menu lock'
                                                    ? showAddMenuModal(true)
                                                    : ''
                                            "
                                            :class="
                                                'btn btn-sm border-0 py-0 btn-outline-' +
                                                (stand_status !==
                                                'Waiting for menu lock'
                                                    ? 'secondary disabled'
                                                    : 'primary')
                                            "
                                        >
                                            <i class="bi bi-plus-lg"></i>
                                        </button>
                                    </div>
                                    <div
                                        class="border-start border-2 mt-1 mx-1"
                                        v-if="
                                            auth_user.id == stand.pic_id &&
                                            auth_user.roles_id == 3
                                        "
                                    ></div>
                                    <div
                                        @click="
                                            stand_status == 'Inactive'
                                                ? alertNotification(
                                                      'This stand is inactive. All feature are locked.'
                                                  )
                                                : ''
                                        "
                                    >
                                        <button
                                            v-if="auth_user.roles_id == 3"
                                            @click="
                                                menu_category
                                                    ? stand_status == 'Inactive'
                                                        ? ''
                                                        : confirmation(
                                                              route(
                                                                  'stand.menu.validate',
                                                                  stand.id
                                                              ),
                                                              'Are you sure want to ' +
                                                                  (stand.menu_lock >
                                                                  0
                                                                      ? 'unlock'
                                                                      : 'lock') +
                                                                  ' the menu list of Stand ' +
                                                                  stand.name +
                                                                  '?'
                                                          )
                                                    : alertNotification(
                                                          'Please create a menu'
                                                      )
                                            "
                                            :class="
                                                'btn btn-sm border-0 py-0 btn-outline-' +
                                                (stand_status == 'Inactive'
                                                    ? 'secondary disabled'
                                                    : 'success')
                                            "
                                        >
                                            <i
                                                :class="
                                                    'bi bi-' +
                                                    (stand.menu_lock > 0
                                                        ? 'lock-fill'
                                                        : 'unlock')
                                                "
                                            ></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="scroll-container-3 scroll-container-lg-2"
                            >
                                <ul
                                    class="list-group list-group-flush mb-2"
                                    v-for="(menu_list, key) in menu_category"
                                >
                                    <li
                                        class="list-group-item list-group-item-light px-2 py-1"
                                    >
                                        <span class="text-secondary">{{
                                            key
                                        }}</span>
                                    </li>
                                    <li
                                        class="list-group-item list-group-item-action px-2 py-1"
                                        v-for="item in menu_list"
                                    >
                                        <div class="text-nowrap p-1">
                                            <div
                                                class="border border-primary-subtle border-2 rounded-3 d-inline-block float-start"
                                                style="width: 20%"
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
                                                style="width: 80%"
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
                                                            <span
                                                                class="text-secondary text-nowrap"
                                                                >{{
                                                                    (item.volume >
                                                                    0
                                                                        ? item.volume +
                                                                          item.volume_unit +
                                                                          " "
                                                                        : "") +
                                                                    (item.volume >
                                                                        0 ||
                                                                    item.mass >
                                                                        0
                                                                        ? "- "
                                                                        : "") +
                                                                    (item.mass >
                                                                    0
                                                                        ? item.mass +
                                                                          item.mass_unit +
                                                                          " "
                                                                        : "")
                                                                }}</span
                                                            >
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="ms-auto text-end d-flex my-auto"
                                                    >
                                                        <span
                                                            class="ms-1 text-primary"
                                                            >{{
                                                                formatIDR(
                                                                    item.price
                                                                )
                                                            }}</span
                                                        >
                                                    </div>
                                                </div>
                                                <div class="d-flex">
                                                    <span
                                                        class="text-secondary border-end border-2 pe-2 my-1"
                                                        style="
                                                            font-size: 0.8rem;
                                                        "
                                                        >{{ "Tags" }}</span
                                                    >
                                                    <div
                                                        class="my-auto scroll-container-horizontal scroll-container-horizontal-lg pb-1"
                                                    >
                                                        <span
                                                            class="py-0 px-2 ms-2 rounded-1 bg-light bg-opacity-25 text-secondary d-inline-block"
                                                            v-for="tag in item.tags"
                                                            :style="{
                                                                borderColor:
                                                                    tag.color,
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
                                                            class="py-0 px-2 ms-2 rounded-1 border-secondary text-secondary"
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
                                                <div class="d-flex">
                                                    <span
                                                        class="rounded-3 text-dark my-auto px-1 text-nowrap ms-auto"
                                                    >
                                                        {{ "( " }}
                                                        <span
                                                            class="text-secondary"
                                                            style="
                                                                font-size: 0.8rem;
                                                            "
                                                            >{{ "sold:" }}</span
                                                        >
                                                        {{ item.sale + " / " }}
                                                        <span
                                                            class="text-secondary"
                                                            style="
                                                                font-size: 0.8rem;
                                                            "
                                                            >{{
                                                                "stock:"
                                                            }}</span
                                                        >
                                                        {{ item.stock + " )" }}
                                                    </span>
                                                    <div class="ms-1">
                                                        <div
                                                            @click="
                                                                stand.sale_validation >
                                                                0
                                                                    ? alertNotification(
                                                                          'This stand is inactive. All feature are disabled.'
                                                                      )
                                                                    : ''
                                                            "
                                                        >
                                                            <button
                                                                @click="
                                                                    () => {
                                                                        showEditMenuImageModal(
                                                                            true
                                                                        );
                                                                        selected_menu =
                                                                            item;
                                                                    }
                                                                "
                                                                :class="
                                                                    'btn btn-sm btn-outline-secondary border-0 ' +
                                                                    (stand.sale_validation >
                                                                    0
                                                                        ? 'disabled'
                                                                        : '')
                                                                "
                                                            >
                                                                <i
                                                                    class="bi bi-image"
                                                                ></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="ms-0">
                                                        <div
                                                            @click="
                                                                stand.sale_validation >
                                                                0
                                                                    ? alertNotification(
                                                                          'This stand is inactive. All feature are disabled.'
                                                                      )
                                                                    : ''
                                                            "
                                                        >
                                                            <button
                                                                @click="
                                                                    () => {
                                                                        showAddStockModal(
                                                                            true
                                                                        );
                                                                        selected_stock =
                                                                            item;
                                                                    }
                                                                "
                                                                :class="
                                                                    'btn btn-sm btn-outline-secondary border-0 ' +
                                                                    (stand.sale_validation >
                                                                    0
                                                                        ? 'disabled'
                                                                        : '')
                                                                "
                                                            >
                                                                <i
                                                                    class="bi bi-box-seam"
                                                                ></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="ms-0">
                                                        <div
                                                            @click="
                                                                stand.menu_lock >
                                                                0
                                                                    ? alertNotification(
                                                                          'Menu list is locked by ' +
                                                                              stand
                                                                                  .menu_validator
                                                                                  .name +
                                                                              '. You can`t delete or make any changes.'
                                                                      )
                                                                    : ''
                                                            "
                                                        >
                                                            <button
                                                                @click="
                                                                    confirmation(
                                                                        route(
                                                                            'stand.menu.delete',
                                                                            item.id
                                                                        ),
                                                                        'Are you sure want to remove ' +
                                                                            item.name +
                                                                            ' from menu list?'
                                                                    )
                                                                "
                                                                :class="
                                                                    'btn btn-sm btn-outline-secondary border-0 ' +
                                                                    (stand.menu_lock >
                                                                    0
                                                                        ? 'disabled'
                                                                        : '')
                                                                "
                                                                v-if="
                                                                    auth_user.id ==
                                                                    stand.pic_id
                                                                "
                                                            >
                                                                <i
                                                                    class="bi bi-trash3 py-0"
                                                                ></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </transition>
                <transition
                    :name="
                        'fade-slide-' +
                        (next_tab > 2 || prev_tab > 2 ? 'ltr' : 'rtl')
                    "
                    mode="out-in"
                    @after-leave="proceedTab()"
                >
                    <!-- Expense List -->
                    <div
                        class="col-12 col-lg-4"
                        v-if="active_tab == 2 || isLargeScreen"
                    >
                        <div class="card bg-white p-2">
                            <div class="d-flex mb-2">
                                <span class="text-primary ms-2">
                                    <i
                                        class="bi bi-cart4 me-2 d-none d-lg-inline"
                                    ></i
                                    >{{ "Expenses" }}</span
                                >
                                <div
                                    class="ms-auto me-2"
                                    @click="
                                        stand_status == 'Inactive'
                                            ? alertNotification(
                                                  'This stand is inactive. All feature are locked.'
                                              )
                                            : ''
                                    "
                                >
                                    <button
                                        v-if="
                                            stand.production.some(
                                                (staff) =>
                                                    staff.id == auth_user.id
                                            )
                                        "
                                        @click="
                                            stand_status == 'Inactive'
                                                ? ''
                                                : showAddExpenseModal(true)
                                        "
                                        :class="
                                            'btn btn-sm border-0 py-0 btn-outline-' +
                                            (stand_status == 'Inactive'
                                                ? 'secondary disabled '
                                                : 'primary')
                                        "
                                    >
                                        <i class="bi bi-plus-lg"></i>
                                    </button>
                                    <button
                                        @click="
                                            stand_status == 'Inactive'
                                                ? ''
                                                : showProductionStaffModal(true)
                                        "
                                        :class="
                                            'btn btn-sm border-0 py-0 btn-outline-' +
                                            (stand_status == 'Inactive'
                                                ? 'secondary disabled '
                                                : 'primary')
                                        "
                                    >
                                        <i class="bi bi-people"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="input-group">
                                    <input
                                        type="text"
                                        class="form-control form-control-sm py-0"
                                        placeholder="Search"
                                        aria-label="Search"
                                        aria-describedby="basic-addon1"
                                        v-model="form_filter_expense.name"
                                        @input="handleFilterExpense"
                                    />
                                    <span
                                        class="input-group-text py-0"
                                        id="basic-addon1"
                                        ><i
                                            class="bi bi-search"
                                            style="font-size: 0.9rem"
                                        ></i
                                    ></span>
                                </div>
                            </div>
                            <div class="d-flex mb-1">
                                <span
                                    class="text-secondary fst-italic mx-auto"
                                    style="font-size: 0.8rem"
                                >
                                    <i class="bi bi-exclamation-triangle"></i>
                                    {{
                                        "Expenses must be validated to update stand expense."
                                    }}
                                </span>
                            </div>
                            <div
                                class="scroll-container-2 scroll-container-lg-2"
                            >
                                <ul class="list-group list-group-flush">
                                    <li
                                        class="list-group-item list-group-item-action px-2 py-1"
                                        v-for="item in expense_list"
                                    >
                                        <div class="d-flex">
                                            <span
                                                class="rounded-3 text-primary-emphasis my-auto px-1 text-nowrap"
                                            >
                                                {{ "( " + item.qty + " )" }}
                                            </span>
                                            <div
                                                class="scroll-x-hidden me-2 my-auto"
                                            >
                                                <div class="d-flex">
                                                    <span
                                                        class="text-dark text-nowrap me-1"
                                                        >{{ item.name }}</span
                                                    >
                                                    <span
                                                        class="text-secondary text-nowrap"
                                                        >{{
                                                            "- " +
                                                            formatIDR(
                                                                item.price
                                                            ) +
                                                            "/" +
                                                            item.unit
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                            <div
                                                class="ms-auto text-end d-flex my-auto"
                                            >
                                                <span
                                                    class="ms-1 text-primary"
                                                    >{{
                                                        formatIDR(
                                                            item.total_price
                                                        )
                                                    }}</span
                                                >
                                            </div>
                                            <button
                                                data-bs-toggle="modal"
                                                data-bs-target="#receiptModal"
                                                :class="'btn btn-sm border-0 my-auto ms-2 btn-outline-secondary d-flex'"
                                                @click="
                                                    () => {
                                                        selected_expense = item;
                                                    }
                                                "
                                            >
                                                <i
                                                    class="bi bi-exclamation text-danger"
                                                    v-if="
                                                        item.operational_id ==
                                                            0 ||
                                                        item.operational_id ==
                                                            null
                                                    "
                                                ></i>
                                                <i class="bi bi-receipt"></i>
                                            </button>
                                            <div
                                                v-if="is_production"
                                                class="border-start border-2 mx-1 my-1"
                                            ></div>
                                            <button
                                                :class="
                                                    'btn btn-sm border-0 ' +
                                                    (stand.sale_validation > 0
                                                        ? 'text-body-tertiary'
                                                        : 'btn-outline-secondary')
                                                "
                                                v-if="is_production"
                                                @click="
                                                    () => {
                                                        if (
                                                            stand.sale_validation >
                                                            0
                                                        ) {
                                                            alertNotification(
                                                                'This stand is inactive. All feature are disabled.'
                                                            );
                                                        } else {
                                                            confirmation(
                                                                route(
                                                                    'stand.expense.delete',
                                                                    item.id
                                                                ),
                                                                'Are you sure want to delete ' +
                                                                    item.name +
                                                                    ' from Stand ' +
                                                                    stand.name +
                                                                    ' Expense List?'
                                                            );
                                                        }
                                                    }
                                                "
                                            >
                                                <i class="bi bi-trash3"></i>
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </transition>
                <transition
                    name="fade-slide-rtl"
                    mode="out-in"
                    @after-leave="proceedTab()"
                >
                    <!-- Income List -->
                    <div
                        class="col-12 col-lg-4"
                        v-if="active_tab == 3 || isLargeScreen"
                    >
                        <div class="card bg-white p-2">
                            <div class="d-flex mb-2">
                                <span class="text-primary ms-2">
                                    <i
                                        class="bi bi-graph-up me-2 d-none d-lg-inline"
                                    ></i>
                                    {{ "Income" }}</span
                                >
                                <div class="d-flex ms-auto">
                                    <button
                                        @click="
                                            () => {
                                                if (
                                                    !(
                                                        stand_status ==
                                                        'Inactive'
                                                    )
                                                ) {
                                                    form_set_dana_contact.name =
                                                        dana_contact?.name;
                                                    form_set_dana_contact.number =
                                                        dana_contact?.phone;
                                                    showDanaContactModal(true);
                                                }
                                            }
                                        "
                                        :class="
                                            'btn btn-sm border-0 py-0 btn-outline-' +
                                            (stand_status == 'Inactive'
                                                ? 'secondary disabled '
                                                : 'primary')
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
                                    </button>
                                    <button
                                        @click="
                                            stand_status == 'Inactive'
                                                ? ''
                                                : showCashierStaffModal(true)
                                        "
                                        :class="
                                            'btn btn-sm border-0 py-0 btn-outline-' +
                                            (stand_status == 'Inactive'
                                                ? 'secondary disabled '
                                                : 'primary')
                                        "
                                    >
                                        <i class="bi bi-people"></i>
                                    </button>
                                    <button
                                        v-if="auth_user.roles_id == 3"
                                        @click="
                                            confirmation(
                                                route(
                                                    'stand.income.validate',
                                                    stand.id
                                                ),
                                                'Are you sure want to ' +
                                                    (stand.sale_validation > 0
                                                        ? 'unlock'
                                                        : 'lock') +
                                                    ' income ' +
                                                    stand.name +
                                                    '?'
                                            )
                                        "
                                        :class="
                                            'btn btn-sm border-0 py-0 btn-outline-' +
                                            (stand_status.sale_validation > 0
                                                ? 'success'
                                                : 'secondary')
                                        "
                                    >
                                        <i
                                            :class="
                                                'bi bi-' +
                                                (stand.sale_validation > 0
                                                    ? 'lock-fill'
                                                    : 'unlock')
                                            "
                                        ></i>
                                    </button>
                                </div>
                            </div>
                            <div class="d-flex">
                                <div class="input-group">
                                    <input
                                        type="text"
                                        class="form-control form-control-sm py-0"
                                        placeholder="Search"
                                        aria-label="Search"
                                        aria-describedby="basic-addon1"
                                        v-model="form_filter_income.name"
                                        @input="handleFilterIncome"
                                    />
                                    <span
                                        class="input-group-text py-0"
                                        id="basic-addon1"
                                        ><i
                                            class="bi bi-search"
                                            style="font-size: 0.9rem"
                                        ></i
                                    ></span>
                                </div>
                            </div>
                            <div class="d-flex mb-1">
                                <span
                                    class="text-secondary fst-italic mx-auto"
                                    style="font-size: 0.8rem"
                                >
                                    <i class="bi bi-exclamation-triangle"></i>
                                    {{
                                        "Transaction must be lock to update stand income."
                                    }}
                                </span>
                            </div>
                            <div
                                class="scroll-container-2 scroll-container-lg-2"
                            >
                                <ul class="list-group list-group-flush">
                                    <li
                                        class="list-group-item list-group-item-action px-2 py-1"
                                        v-for="item in income_list"
                                    >
                                        <div class="d-flex">
                                            <span
                                                class="text-secondary my-auto me-2"
                                            >
                                                {{
                                                    formatTime(item.created_at)
                                                }}
                                            </span>
                                            <div
                                                class="scroll-x-hidden me-2 my-auto"
                                            >
                                                <span
                                                    class="text-dark text-nowrap me-1"
                                                    >{{
                                                        item.customer?.name ??
                                                        "Unregistered"
                                                    }}</span
                                                >
                                            </div>
                                            <div
                                                class="ms-auto text-end d-flex"
                                            >
                                                <span
                                                    class="ms-1 text-primary"
                                                    >{{
                                                        formatIDR(
                                                            item.transaction
                                                        )
                                                    }}</span
                                                >
                                            </div>
                                            <button
                                                class="btn btn-sm btn-outline-secondary border-0 my-auto ms-2"
                                                @click="
                                                    () => {
                                                        selected_income = item;
                                                        showIncomeDetailModal(
                                                            true
                                                        );
                                                    }
                                                "
                                            >
                                                <i class="bi bi-receipt"></i>
                                            </button>
                                            <div
                                                v-if="is_cashier"
                                                class="border-start border-2 mx-1 my-1"
                                            ></div>
                                            <div
                                                v-if="is_cashier"
                                                @click="
                                                    stand.sale_validation > 0
                                                        ? alertNotification(
                                                              'This stand is Inactive. All feature are locked.'
                                                          )
                                                        : ''
                                                "
                                            >
                                                <button
                                                    @click="
                                                        confirmation(
                                                            route(
                                                                'stand.sale.delete',
                                                                item.id
                                                            ),
                                                            'Are you sure want to remove ' +
                                                                (item.customer
                                                                    ?.name ??
                                                                    'Unregistered Customer') +
                                                                ' transaction from Stand ' +
                                                                stand.name +
                                                                ' income?'
                                                        )
                                                    "
                                                    :class="
                                                        'btn btn-sm btn-outline-secondary border-0 ' +
                                                        (stand.sale_validation >
                                                        0
                                                            ? 'disabled'
                                                            : '')
                                                    "
                                                >
                                                    <i
                                                        class="bi bi-trash3 py-0"
                                                    ></i>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="row mt-5"></div>
        </div>

        <!-- FAB -->
        <div
            class="fab bg-white"
            @click="
                stand.sale_validation > 0 || stand.menu_lock == 0
                    ? alertNotification(
                          stand.sale_validation > 0
                              ? 'This stand is inactive. All feature are locked.'
                              : 'This stand is still waiting for menu validation.'
                      )
                    : ''
            "
        >
            <a
                :class="
                    'p-2 w-100 h-100 rounded-circle d-flex btn btn-' +
                    (stand.sale_validation > 0 || stand.menu_lock == 0
                        ? 'secondary disabled'
                        : 'primary')
                "
                :href="route('food.stand.cashier', stand.id)"
            >
                <i class="bi bi-shop-window fs-3 m-auto"></i>
            </a>
        </div>
    </StaffLayout>

    <!-- Modals -->
    <!-- Edit Stand Modal -->
    <div
        v-if="auth_user.id == stand.pic_id"
        class="modal fade"
        id="editStandModal"
        tabindex="-1"
        aria-labelledby="editStandModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i class="bi bi-shop pe-2"></i>
                        {{ "Edit Stand" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showEditStandModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <form @submit.prevent="handleEditStand()">
                    <div class="modal-body bg-light">
                        <div class="row justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="stand_name"
                                    class="form-label d-inline-block"
                                    >{{ "Name" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    id="stand_name"
                                    v-model="form_edit_stand.name"
                                    placeholder="Blaterian 1"
                                />
                                <InputError
                                    :message="form_edit_stand.errors.name"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="stand_place"
                                    class="form-label d-inline-block"
                                    >{{ "Place" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    id="stand_place"
                                    v-model="form_edit_stand.place"
                                    placeholder="Gedung F"
                                />
                                <InputError
                                    :message="form_edit_stand.errors.place"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="stand_date"
                                    class="form-label d-inline-block"
                                    >{{ "Date" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    type="date"
                                    class="form-control form-control-sm"
                                    id="stand_date"
                                    v-model="form_edit_stand.date"
                                />
                                <InputError
                                    :message="form_edit_stand.errors.date"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row justify-content-center mt-2">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="stand_type"
                                    class="form-label d-inline-block"
                                    >{{ "Type" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <select
                                    id="stand_type"
                                    class="form-select form-select-sm"
                                    v-model="form_edit_stand.type"
                                >
                                    <option
                                        :value="item.value"
                                        v-for="item in [
                                            { value: 0, name: 'Live' },
                                            { value: 1, name: 'Pre-Order' },
                                            {
                                                value: 2,
                                                name: 'Live and Pre-Order',
                                            },
                                        ]"
                                    >
                                        {{ item.name }}
                                    </option>
                                </select>
                                <InputError
                                    :message="form_edit_stand.errors.type"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-1">
                        <button
                            type="submit"
                            class="btn btn-sm btn-primary w-25"
                        >
                            {{ "Edit" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Delete Stand Modal -->
    <div
        v-if="auth_user.roles_id == 3"
        class="modal fade"
        id="deleteStandModal"
        tabindex="-1"
        aria-labelledby="deleteStandModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i class="bi bi-trash3 pe-2"></i>
                        {{ "Delete Stand" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showDeleteStandModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <form @submit.prevent="handleDeleteStand()">
                    <div class="modal-body bg-light">
                        <div class="d-flex">
                            <p
                                class="text-secondary"
                                style="text-align: justify"
                            >
                                {{
                                    "You are going to permanently delete Stand " +
                                    stand.name +
                                    " data. Password needed to validate your action."
                                }}
                            </p>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-4 col-lg-3">
                                <div class="d-flex w-100 h-100">
                                    <label
                                        for="stand_name"
                                        class="form-label d-inline-block my-auto"
                                        >{{ "Password" }}</label
                                    >
                                </div>
                            </div>
                            <div class="col-8 col-lg-7">
                                <div class="input-group">
                                    <input
                                        type="password"
                                        class="form-control form-control-sm"
                                        id="stand_delete_password"
                                        v-model="form_delete_stand.password"
                                        placeholder="password"
                                        autocomplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        class="btn bg-light"
                                        @click="
                                            showPassword(
                                                'stand_delete_password',
                                                'password_icon_del'
                                            )
                                        "
                                    >
                                        <i
                                            class="bi bi-eye-slash-fill"
                                            id="password_icon_del"
                                        ></i>
                                    </button>
                                </div>
                                <InputError
                                    :message="form_delete_stand.errors.password"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-1">
                        <button
                            type="submit"
                            class="btn btn-sm btn-danger w-25"
                        >
                            {{ "Delete" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Add Menu Modal -->
    <div
        v-if="auth_user.id == stand.pic_id && stand.menu_lock == 0"
        class="modal fade"
        id="addMenuModal"
        tabindex="-1"
        aria-labelledby="addMenuModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i class="bi bi-list-ul pe-2"></i>
                        {{ "New Menu" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showAddMenuModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <form @submit.prevent="handleAddMenu()">
                    <div class="modal-body bg-light">
                        <div class="row mt-0 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="menu_name"
                                    class="form-label d-inline-block"
                                    >{{ "Name" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    id="menu_name"
                                    v-model="form_add_menu.name"
                                    required
                                />
                                <InputError
                                    :message="form_add_menu.errors.name"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row mt-2 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="menu_category"
                                    class="form-label d-inline-block"
                                    >{{ "Category" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    id="menu_category"
                                    v-model="form_add_menu.category"
                                    required
                                />
                                <InputError
                                    :message="form_add_menu.errors.category"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row mt-2 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="menu_tag"
                                    class="form-label d-inline-block"
                                    >{{ "Tag" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <v-select
                                    id="menu_tag"
                                    class="bg-white text-nowrap"
                                    :options="food_tag_list"
                                    :multiple="true"
                                    label="name"
                                    v-model="form_add_menu.food_tag"
                                    :reduce="(item) => item.id"
                                    placeholder="Choose Tag"
                                    :getOptionKey="(option) => option.id"
                                    required
                                />
                                <InputError
                                    :message="form_add_menu.errors.food_tag"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row mt-2 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="menu_volume"
                                    class="form-label d-inline-block"
                                    >{{ "Volume" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <div class="input-group input-group-sm">
                                    <input
                                        type="number"
                                        class="form-control form-control-sm"
                                        id="menu_volume"
                                        v-model="form_add_menu.volume"
                                    />
                                    <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        id="menu_volume_unit"
                                        v-model="form_add_menu.volume_unit"
                                        placeholder="unit: ml, ..."
                                    />
                                </div>
                                <InputError
                                    :message="form_add_menu.errors.volume"
                                    class="mt-2"
                                />
                                <InputError
                                    :message="form_add_menu.errors.volume_unit"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row mt-2 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="menu_mass"
                                    class="form-label d-inline-block"
                                    >{{ "Mass" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <div class="input-group input-group-sm">
                                    <input
                                        type="number"
                                        class="form-control form-control-sm"
                                        id="menu_mass"
                                        v-model="form_add_menu.mass"
                                    />
                                    <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        id="menu_mass_unit"
                                        v-model="form_add_menu.mass_unit"
                                        placeholder="unit: gram, ..."
                                    />
                                </div>
                                <InputError
                                    :message="form_add_menu.errors.mass"
                                    class="mt-2"
                                />
                                <InputError
                                    :message="form_add_menu.errors.mass_unit"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row mt-2 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="menu_stock"
                                    class="form-label d-inline-block"
                                    >{{ "Stock" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    type="number"
                                    class="form-control form-control-sm"
                                    id="menu_stock"
                                    v-model="form_add_menu.stock"
                                    required
                                />
                                <InputError
                                    :message="form_add_menu.errors.stock"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row mt-2 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="menu_price"
                                    class="form-label d-inline-block"
                                    >{{ "Price" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    type="number"
                                    class="form-control form-control-sm"
                                    id="menu_price"
                                    v-model="form_add_menu.price"
                                    required
                                />
                                <InputError
                                    :message="form_add_menu.errors.price"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row mt-2 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="menu_image"
                                    class="form-label d-inline-block"
                                    >{{ "Image" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    type="file"
                                    class="form-control form-control-sm"
                                    id="menu_image"
                                    @change="handleFileUploadMenuImage"
                                    required
                                />
                                <span
                                    class="d-block text-secondary"
                                    style="font-size: 0.8rem"
                                    >{{ "Ratio = 1:1 " }}</span
                                >
                                <InputError
                                    :message="form_add_menu.errors.image"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-1">
                        <button
                            type="submit"
                            class="btn btn-sm btn-primary w-25"
                        >
                            {{ "Add Menu" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Edit Menu Image Modal -->
    <div
        v-if="auth_user.id == stand.pic_id && stand.sale_validation == 0"
        class="modal fade"
        id="editMenuImageModal"
        tabindex="-1"
        aria-labelledby="editMenuImageModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i class="bi bi-image pe-2"></i>
                        {{ "Edit Menu Image" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showEditMenuImageModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="modal-body bg-light">
                    <div class="row mt-0 justify-content-center">
                        <div class="col-4 col-lg-3">
                            <label
                                for="menu_name"
                                class="form-label d-inline-block"
                                >{{ "Name" }}</label
                            >
                        </div>
                        <div class="col-8 col-lg-7">
                            <span
                                class="rounded text-secondary px-2 py-1 w-100"
                                >{{ selected_menu?.name }}</span
                            >
                        </div>
                    </div>

                    <div class="row mt-2 justify-content-center">
                        <div class="col-4 col-lg-3">
                            <label
                                for="edit_menu_image"
                                class="form-label d-inline-block"
                                >{{ "New Image" }}</label
                            >
                        </div>
                        <div class="col-8 col-lg-7">
                            <input
                                type="file"
                                class="form-control form-control-sm"
                                id="edit_menu_image"
                                @change="handleFileEditMenuImage"
                                ref="fileEditMenuImageRef"
                                required
                            />
                            <span
                                class="d-block text-secondary"
                                style="font-size: 0.8rem"
                                >{{ "Ratio = 1:1 " }}</span
                            >
                            <InputError
                                :message="form_edit_menu_image.errors.image"
                                class="mt-2"
                            />
                        </div>
                    </div>
                </div>
                <div class="modal-footer p-1">
                    <button
                        type="submit"
                        @click.prevent="handleEditMenuImage"
                        class="btn btn-sm btn-primary w-25"
                    >
                        {{ "Submit" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Add Stock Modal -->
    <div
        v-if="auth_user.id == stand.pic_id && stand.sale_validation == 0"
        class="modal fade"
        id="addStockModal"
        tabindex="-1"
        aria-labelledby="addStockModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i class="bi bi-box-seam pe-2"></i>
                        {{ "Update Stock" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showAddStockModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <form @submit.prevent="handleAddStock()">
                    <div class="modal-body bg-light">
                        <div class="row mt-0 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label class="form-label d-inline-block">{{
                                    "Menu"
                                }}</label>
                            </div>
                            <div class="col-8 col-lg-7">
                                <div class="d-flex">
                                    <span
                                        class="bg-white rounded-2 border w-100 text-secondary px-2 py-1"
                                    >
                                        {{ selected_stock?.name }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label class="form-label d-inline-block">{{
                                    "Old Stock"
                                }}</label>
                            </div>
                            <div class="col-8 col-lg-7">
                                <div class="d-flex">
                                    <span
                                        class="bg-white rounded-2 border w-100 text-secondary px-2 py-1"
                                    >
                                        {{ selected_stock?.stock + " pcs" }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="stock_amount"
                                    class="form-label d-inline-block"
                                    >{{ "Add" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <div
                                    class="input-group input-group-sm bg-light rounded-2 border"
                                >
                                    <input
                                        type="number"
                                        class="form-control form-control-sm"
                                        id="stock_amount"
                                        v-model="form_add_stock.amount"
                                        placeholder="Add ( - ) to reduce"
                                    />
                                    <span
                                        class="rounded-end rounded-2 text-secondary px-2 py-1"
                                    >
                                        {{ "pcs" }}
                                    </span>
                                </div>
                                <InputError
                                    :message="form_add_stock.errors.amount"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row mt-2 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label class="form-label d-inline-block">{{
                                    "Total Stock"
                                }}</label>
                            </div>
                            <div class="col-8 col-lg-7">
                                <div class="d-flex">
                                    <span
                                        class="bg-white rounded-2 border w-100 text-secondary px-2 py-1"
                                    >
                                        {{
                                            selected_stock?.stock +
                                            form_add_stock.amount +
                                            " pcs"
                                        }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-1">
                        <button
                            type="submit"
                            class="btn btn-sm btn-primary w-25"
                        >
                            {{ "Add Stock" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Add Expense Modal -->
    <div
        v-if="is_production"
        class="modal fade"
        id="addExpenseModal"
        tabindex="-1"
        aria-labelledby="addExpenseModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i class="bi bi-cart4 pe-2"></i>
                        {{ "New Expense" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showAddExpenseModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <form @submit.prevent="handleAddExpense()">
                    <div class="modal-body bg-light">
                        <div class="row mt-0 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="expense_name"
                                    class="form-label d-inline-block"
                                    >{{ "Name" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    type="text"
                                    class="form-control form-control-sm"
                                    id="expense_name"
                                    v-model="form_add_expense.name"
                                    required
                                />
                                <InputError
                                    :message="form_add_expense.errors.name"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row mt-2 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="expense_price"
                                    class="form-label d-inline-block"
                                    >{{ "Price" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    type="number"
                                    class="form-control form-control-sm"
                                    id="expense_price"
                                    v-model="form_add_expense.price"
                                    required
                                />
                                <InputError
                                    :message="form_add_expense.errors.price"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row mt-2 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="expense_qty"
                                    class="form-label d-inline-block"
                                    >{{ "Quantity/unit" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <div class="input-group input-group-sm">
                                    <input
                                        type="number"
                                        class="form-control form-control-sm"
                                        id="expense_qty"
                                        v-model="form_add_expense.qty"
                                    />
                                    <input
                                        type="text"
                                        class="form-control form-control-sm"
                                        id="expense_unit"
                                        v-model="form_add_expense.unit"
                                        placeholder="pcs, ml, ..."
                                    />
                                </div>
                                <InputError
                                    :message="form_add_expense.errors.qty"
                                    class="mt-2"
                                />
                                <InputError
                                    :message="form_add_expense.errors.unit"
                                    class="mt-2"
                                />
                            </div>
                        </div>
                        <div class="row mt-2 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="expense_price"
                                    class="form-label d-inline-block"
                                    >{{ "Total Price" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <span>{{
                                    formatIDR(
                                        (form_add_expense?.price ?? 0) *
                                            (form_add_expense?.qty ?? 0)
                                    )
                                }}</span>
                            </div>
                        </div>
                        <div class="row mt-2 justify-content-center">
                            <div class="col-4 col-lg-3">
                                <label
                                    for="expense_stock"
                                    class="form-label d-inline-block"
                                    >{{ "Receipt" }}</label
                                >
                            </div>
                            <div class="col-8 col-lg-7">
                                <input
                                    type="file"
                                    class="form-control form-control-sm"
                                    name="reciept"
                                    v-if="!form_add_expense.same_receipt_check"
                                    @change="
                                        handleFileAddExpenseReceipt($event)
                                    "
                                />

                                <v-select
                                    v-if="form_add_expense.same_receipt_check"
                                    class="bg-white text-nowrap"
                                    :options="expense_list"
                                    label="name"
                                    :reduce="(expense) => expense.id"
                                    v-model="form_add_expense.receipt_same"
                                    placeholder="Select Item"
                                />
                                <label
                                    v-if="expense_list.length > 0"
                                    for="same_receipt_check"
                                    class="inline-flex items-center mt-1"
                                >
                                    <input
                                        id="same_receipt_check"
                                        type="checkbox"
                                        v-model="
                                            form_add_expense.same_receipt_check
                                        "
                                        class="rounded"
                                    />
                                    <span class="ms-2 text-sm">{{
                                        "same as exist item"
                                    }}</span>
                                </label>

                                <InputError
                                    :message="form_add_expense.errors.reciept"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-1">
                        <button
                            type="submit"
                            class="btn btn-sm btn-primary w-25"
                        >
                            {{ "Add Menu" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Expense Receipt Modal -->
    <div
        class="modal fade"
        id="receiptModal"
        tabindex="-1"
        aria-labelledby="receiptModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header border-2 py-2 ps-3 pe-2">
                    <span class="h6 text-primary-emphasis mb-0 me-auto">
                        <i class="bi bi-receipt me-2"></i
                        >{{ "Expense Receipt" }}
                    </span>
                    <button
                        class="btn btn-sm btn-outline-secondary border-0"
                        data-bs-toggle="modal"
                        data-bs-dismiss="true"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="modal-body pt-0">
                    <div class="d-flex w-100">
                        <a
                            :href="
                                '/storage/images/receipt/stand/expense/' +
                                selected_expense?.reciept
                            "
                            download
                            class="btn btn-sm border-0 text-decoration-none mx-auto w-50"
                        >
                            {{ selected_expense?.reciept }}
                            <i class="bi bi-download text-primary ms-2"></i>
                        </a>
                    </div>
                    <div
                        class="scroll-container-3 w-100"
                        style="min-height: 200px"
                    >
                        <img
                            :src="
                                '/storage/images/receipt/stand/expense/' +
                                selected_expense?.reciept
                            "
                            alt="image"
                            class="img-fluid w-100 h-100 object-fit-cover placeholder"
                            @load="showImage"
                        />
                    </div>
                    <div class="d-flex text-secondary">
                        <span class="">{{
                            selected_expense?.operational_id > 0
                                ? "Validated by " +
                                  selected_expense?.operational.name
                                : "Unvalidated"
                        }}</span>
                        <span class="ms-auto">{{
                            formatDate(selected_expense?.updated_at)
                        }}</span>
                    </div>
                    <div class="d-flex">
                        <span class="">{{ selected_expense?.name }}</span>
                        <span class="ms-auto text-secondary">{{
                            formatIDR(selected_expense?.total_price)
                        }}</span>
                    </div>
                    <div
                        class="d-flex w-100 mt-2"
                        v-if="auth_user.roles_id == 3"
                    >
                        <button
                            data-bs-toggle="modal"
                            data-bs-dismiss="true"
                            :class="
                                'w-100 btn btn-sm btn-' +
                                (selected_expense?.operational_id > 0
                                    ? 'secondary'
                                    : 'success')
                            "
                            @click="
                                confirmation(
                                    route(
                                        'stand.expense.validate',
                                        selected_expense.id
                                    ),
                                    'Confirm to ' +
                                        (selected_expense?.operational_id > 0
                                            ? 'unvalidate'
                                            : 'validate') +
                                        ' receipt ' +
                                        selected_expense.reciept
                                )
                            "
                        >
                            {{
                                selected_expense?.operational_id > 0
                                    ? "Unvalidate"
                                    : "Validate"
                            }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Income Detail Modal -->
    <div
        class="modal fade"
        id="incomeDetailModal"
        tabindex="-1"
        aria-labelledby="incomeDetailModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header border-2 py-2 ps-3 pe-2">
                    <span class="h6 text-primary-emphasis mb-0 me-auto">
                        <i class="bi bi-receipt me-2"></i>{{ "Receipt" }}
                    </span>
                    <button
                        class="btn btn-sm btn-outline-secondary border-0"
                        @click="showIncomeDetailModal(false)"
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
                            <div class="d-flex w-100">
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
                                        >{{ "Date & Time" }}
                                    </span>
                                    <div class="d-flex scroll-x-hidden">
                                        <span class="text-nowrap">{{
                                            formatDateOnly(
                                                selected_income?.created_at
                                            ) +
                                            " - " +
                                            formatTimeOnly(
                                                selected_income?.created_at
                                            )
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
                                            stand?.place
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
                                            selected_income?.customer?.name ??
                                            "Unregistered"
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
                                            selected_income?.cashier?.name
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
                                    v-for="item in selected_income?.order"
                                >
                                    <div class="d-flex">
                                        <span class="me-2">{{
                                            "(" + item.amount + ")"
                                        }}</span>
                                        <span class="fw-bold me-2">{{
                                            item.menu.name
                                        }}</span>
                                    </div>
                                    <div class="d-flex">
                                        <span class="me-auto text-secondary">
                                            {{ formatIDR(item.menu.price) }}
                                        </span>
                                        <span class="ms-2">{{
                                            formatIDR(
                                                item.menu.price * item.amount
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
                                                    selected_income?.transaction +
                                                        selected_income?.discount
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
                                                    selected_income?.discount
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
                                                    selected_income?.transaction
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
                                                selected_income?.payment?.name
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
                                                    selected_income?.payment_price >
                                                        0
                                                        ? selected_income?.payment_price
                                                        : selected_income?.transaction
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
                                                    selected_income?.payment_price ??
                                                        selected_income?.transaction -
                                                            selected_income?.transaction
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
                <div class="modal-footer p-0">
                    <div class="d-flex w-100">
                        <button
                            @click="
                                is_cashier
                                    ? downloadReceipt
                                    : alertNotification(
                                          'You are not listed as cashier in Stand ' +
                                              stand.name +
                                              '. Only Cashier can access this feature.'
                                      )
                            "
                            class="btn btn-sm btn-outline-primary border-0 w-50 text-nowrap"
                        >
                            <i class="bi bi-download me-2"></i>
                            {{ "Download" }}
                        </button>
                        <button
                            @click="
                                is_cashier
                                    ? printReceipt
                                    : alertNotification(
                                          'You are not listed as cashier in Stand ' +
                                              stand.name +
                                              '. Only Cashier can access this feature.'
                                      )
                            "
                            class="btn btn-sm btn-outline-primary border-0 w-50 text-nowrap"
                        >
                            <i class="bi bi-whatsapp me-2"></i>
                            {{ "Chat Customer" }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Production Staff Modal -->
    <div
        class="modal fade"
        id="prouctionStaffModal"
        tabindex="-1"
        aria-labelledby="prouctionStaffModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3 text-dark">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title h5 text-primary-emphasis">
                        <i class="bi bi-perople border-secondary"></i>
                        {{ "Production Staff" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showProductionStaffModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="d-flex border-bottom border-2 pb-1">
                        <span class="text-dark">{{ "Staff List" }}</span>
                    </div>
                    <div
                        class=""
                        v-for="(
                            item, index
                        ) in form_production_staff.staff_list"
                    >
                        <div class="d-flex" v-if="item.deleted_at == null">
                            <div class="w-100">
                                <label
                                    style="font-size: 0.8rem"
                                    :for="'form_production_staff_' + index"
                                    class="form-label text-secondary"
                                    >{{ "Name" }}</label
                                >
                                <span
                                    class="d-block bg-white rounded-2 border px-2 py-1"
                                >
                                    {{
                                        form_production_staff.staff_list[index]
                                            .name
                                    }}
                                </span>
                            </div>

                            <button
                                v-if="auth_user.id == stand.pic_id"
                                type="button"
                                @click="removeProductionStaff(index)"
                                class="btn btn-sm btn-outline-secondary border-0 ms-2 mt-1 mb-auto"
                            >
                                <i class="bi bi-trash3"></i>
                            </button>
                        </div>
                    </div>
                    <InputError
                        :message="form_production_staff.errors.staff_list"
                    />
                    <div class="d-flex" v-if="auth_user.id == stand.pic_id">
                        <div class="w-100">
                            <label
                                style="font-size: 0.8rem"
                                :for="'new_production_staff_'"
                                class="form-label text-secondary"
                                >{{ "New Staff Name" }}</label
                            >

                            <v-select
                                :id="'new_production_staff_'"
                                class="bg-white text-nowrap w-100 me-2"
                                :options="users"
                                label="name"
                                :reduce="(staff) => staff"
                                v-model="new_production_staff.staff"
                                placeholder="ex: Timothy"
                                required
                            />
                        </div>

                        <button
                            type="button"
                            @click="
                                () => {
                                    if (new_production_staff.staff !== null) {
                                        form_production_staff.staff_list.push({
                                            id: new_production_staff.staff.id,
                                            name: new_production_staff.staff
                                                .name,
                                        });
                                    } else {
                                        toastNotifRef.showToast(
                                            'warning',
                                            'Please select available staff.'
                                        );
                                    }
                                }
                            "
                            class="btn btn-sm btn-outline-primary border-0 ms-2 mt-1 mb-auto"
                        >
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-footer p-1">
                    <div
                        class="d-flex w-100"
                        v-if="auth_user.id == stand.pic_id"
                    >
                        <button
                            @click="
                                form_production_staff.staff_list =
                                    stand.production
                            "
                            class="btn btn-sm btn-outline-primary w-50 rounded-end-0"
                        >
                            {{ "Reset" }}
                        </button>
                        <button
                            @click="handleSetProductionStaff"
                            class="btn btn-sm btn-primary w-50 rounded-start-0"
                        >
                            {{ "Save" }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Cashier Staff Modal -->
    <div
        class="modal fade"
        id="cashierStaffModal"
        tabindex="-1"
        aria-labelledby="cashierStaffModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3 text-dark">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title h5 text-primary-emphasis">
                        <i class="bi bi-perople border-secondary"></i>
                        {{ "Cashier Staff" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        @click="showCashierStaffModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="d-flex border-bottom border-2 pb-1">
                        <span class="text-dark">{{ "Staff List" }}</span>
                    </div>
                    <div
                        class=""
                        v-for="(item, index) in form_cashier_staff.staff_list"
                    >
                        <div class="d-flex" v-if="item.deleted_at == null">
                            <div class="w-100">
                                <label
                                    style="font-size: 0.8rem"
                                    :for="'form_cashier_staff_' + index"
                                    class="form-label text-secondary"
                                    >{{ "Name" }}</label
                                >
                                <span
                                    class="d-block bg-white rounded-2 border px-2 py-1"
                                >
                                    {{
                                        form_cashier_staff.staff_list[index]
                                            .name
                                    }}
                                </span>
                            </div>

                            <button
                                v-if="auth_user.id == stand.pic_id"
                                type="button"
                                @click="removeCashierStaff(index)"
                                class="btn btn-sm btn-outline-secondary border-0 ms-2 mt-1 mb-auto"
                            >
                                <i class="bi bi-trash3"></i>
                            </button>
                        </div>
                    </div>
                    <InputError
                        :message="form_cashier_staff.errors.staff_list"
                    />
                    <div class="d-flex" v-if="auth_user.id == stand.pic_id">
                        <div class="w-100">
                            <label
                                style="font-size: 0.8rem"
                                :for="'new_cashier_staff_'"
                                class="form-label text-secondary"
                                >{{ "New Cashier Name" }}</label
                            >

                            <v-select
                                :id="'new_cashier_staff_'"
                                class="bg-white text-nowrap w-100 me-2"
                                :options="users"
                                label="name"
                                :reduce="(staff) => staff"
                                v-model="new_cashier_staff.staff"
                                placeholder="ex: Timothy"
                                required
                            />
                        </div>

                        <button
                            type="button"
                            @click="
                                () => {
                                    if (new_cashier_staff.staff !== null) {
                                        form_cashier_staff.staff_list.push({
                                            id: new_cashier_staff.staff.id,
                                            name: new_cashier_staff.staff.name,
                                        });
                                    } else {
                                        toastNotifRef.showToast(
                                            'warning',
                                            'Please select available staff.'
                                        );
                                    }
                                }
                            "
                            class="btn btn-sm btn-outline-primary border-0 ms-2 mt-1 mb-auto"
                        >
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-footer p-1">
                    <div
                        class="d-flex w-100"
                        v-if="auth_user.id == stand.pic_id"
                    >
                        <button
                            @click="
                                form_cashier_staff.staff_list = stand.cashier
                            "
                            class="btn btn-sm btn-outline-primary w-50 rounded-end-0"
                        >
                            {{ "Reset" }}
                        </button>
                        <button
                            @click="handleSetCashierStaff"
                            class="btn btn-sm btn-primary w-50 rounded-start-0"
                        >
                            {{ "Save" }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Dana Contact Modal -->
    <div
        class="modal fade"
        id="danaContactModal"
        tabindex="-1"
        aria-labelledby="danaContactModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header border-2 py-2 ps-3 pe-2">
                    <span class="h6 text-primary-emphasis mb-0 me-auto">
                        <svg
                            class="icon icon-dana d-inline rounded-circle border-primary border me-2"
                            style="width: 1rem; height: 1rem; padding: 0.1rem"
                        >
                            <use href="/icons.svg#dana"></use></svg
                        >{{ "Dana Contact" }}
                    </span>
                    <button
                        class="btn btn-sm btn-outline-secondary border-0"
                        @click="showDanaContactModal(false)"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="modal-body p-3">
                    <div class="bg-white rounded">
                        <div class="d-flex">
                            <span
                                class="text-secondary"
                                style="font-size: 0.8rem"
                                >{{ "Contact Name" }}</span
                            >
                        </div>
                        <input
                            type="text"
                            required
                            placeholder="e.g Timothy Arella"
                            class="form-control form-control-sm"
                            v-model="form_set_dana_contact.name"
                        />
                    </div>
                    <div class="bg-white rounded mt-3">
                        <div class="d-flex">
                            <span
                                class="text-secondary"
                                style="font-size: 0.8rem"
                                >{{ "Contact Number" }}</span
                            >
                        </div>
                        <input
                            type="tel"
                            required
                            placeholder="e.g 08xxxxxxxx"
                            class="form-control form-control-sm"
                            v-model="form_set_dana_contact.number"
                        />
                    </div>
                </div>
                <div class="modal-footer px-2 py-1">
                    <div class="d-flex w-100">
                        <button
                            @click="
                                auth_user.roles_id == 3
                                    ? handleSetDanaContact()
                                    : toastNotifRef.showToast(
                                          'warning',
                                          'Only Operational can set DANA Contact.'
                                      )
                            "
                            class="btn btn-sm btn-primary border-0 w-100 text-nowrap"
                        >
                            <i class="bi bi-person-fill-check me-2"></i>
                            {{ "Set Contact" }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Notif Toast -->
    <Notif ref="toastNotifRef" />
</template>
