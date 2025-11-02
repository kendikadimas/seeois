<script setup>
import StaffLayout from "@/Layouts/StaffLayout.vue";
import ModalAlertNotification from "@/Components/ModalAlertNotification.vue";
import Notif from "@/Components/Notif.vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import InputError from "@/Components/InputError.vue";
import { Head, useForm, usePage, Link } from "@inertiajs/vue3";
import { formatDate, formatIDR } from "@/utils";
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
    errors: Object,
    program: Object,
    default_logbook_id: Number,
    filter: Object,
    budget_list: Array,
    staff_list: Array,
    disbursement_list: Array,
    expense_list: Array,
    logbook_list: Array,
    disbursement_letter_list: Array,
    employee_list: Array,
    can_access_internship: Boolean,
    is_internship_program: Boolean,
    user_access_info: Object,
});
const auth_user = usePage().props.auth.user;
const placeholder = ref("placeholder");
const modalConfirmationRef = ref(null);
const modalAlertNotificationRef = ref(null);
const modalLetterRef = ref(null);
const modalAddDisbursementLetterRef = ref(null);
const modalAddDisbursementRef = ref(null);
const modalAddExpenseRef = ref(null);
const modalAddStaffRef = ref(null);
const modalReceiptDisbursementRef = ref(null);
const active_logbook = computed(() => {
    return props.logbook_list.filter(
        (logbook) => logbook.user_id == selected_user.value.id
    );
});
const selected_user = ref(0);
const active_tab = ref(1);
const next_tab = ref(0);
const prev_tab = ref(0);
const staffLogbookContainerRef = ref(null);
const toastNotifRef = ref(null);
const selectedLogbookImage = ref(null);
const disbursement_letter = ref({
    id: null,
    letter: null,
    link: null,
    valid: null,
});
const order_inverse = ref({
    asc: "desc",
    desc: "asc",
});
const trashed_inverse = ref({
    trashed: "exist",
    exist: "trashed",
});
const disbursement_receipt = ref({
    image: null,
    link: null,
});
const expense_receipt = ref({
    iid: null,
    image: null,
    link: null,
    status: null,
    valid: null,
});
const formBudgetFilter = useForm({
    category: props.filter["budget"]["category"],
    order: props.filter["budget"]["order"],
});
const formDisbursementFilter = useForm({
    category: "price",
    order: props.filter["disbursement"]["order"],
    trashed: props.filter["disbursement"]["trashed"],
});
const formExpenseFilter = useForm({
    category: props.filter["expense"]["category"],
    order: props.filter["expense"]["order"],
});
const formStaffFilter = useForm({
    category: props.filter["staff"]["category"],
    order: props.filter["staff"]["order"],
});
const formAddBudget = useForm({
    name: "",
    price: null,
    unit: null,
    qty: null,
    receipt: null,
});
const formAddDisbursementLetter = useForm({
    letter: null,
});
const formAddDisbursement = useForm({
    name: "",
    price: null,
    letter_id: "",
    receipt: null,
    blaterian_balance: null,
    blaterian_disbursement: null,
});
const formAddExpense = useForm({
    name: "",
    price: 0,
    unit: "",
    qty: 0,
    reciept: null,
    same_receipt_check: false,
    receipt_same: false,
});
const formAddStaff = useForm({
    staff_title: null,
    staff_id: null,
});

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

function show_tab(target) {
    prev_tab.value = active_tab.value;
    active_tab.value = 0;
    next_tab.value = target;
}

function proceed_show_tab() {
    active_tab.value = next_tab.value;
}

function budgetFilterCategory(category) {
    if (formBudgetFilter.category !== category) {
        formBudgetFilter.order = order_inverse.value[formBudgetFilter.order];
    }
    formBudgetFilter.category = category;
}
function expenseFilterCategory(category) {
    if (formExpenseFilter.category !== category) {
        formExpenseFilter.order = order_inverse.value[formExpenseFilter.order];
    }
    formExpenseFilter.category = category;
}
function staffFilterCategory(category) {
    if (formStaffFilter.category !== category) {
        formStaffFilter.order = order_inverse.value[formStaffFilter.order];
    }
    formStaffFilter.category = category;
}
function filterDisbursementAction(action) {
    if (action == "trashed") {
        formDisbursementFilter.trashed =
            trashed_inverse.value[formDisbursementFilter.trashed];
    } else {
        formDisbursementFilter.order =
            order_inverse.value[formDisbursementFilter.order];
    }
}
function handleSubmitBudgetFilter(event, route_name) {
    event.preventDefault();

    formBudgetFilter.order = order_inverse.value[formBudgetFilter.order];
    formBudgetFilter.post(route_name, {
        onError: (error) => console.log(error),
    });
}
function handleSubmitDisbursementFilter(event, route_name) {
    event.preventDefault();
    formDisbursementFilter.post(route_name, {
        onError: (error) => console.log(error),
    });
}
function handleSubmitExpenseFilter(event, route_name) {
    event.preventDefault();
    formExpenseFilter.order = order_inverse.value[formExpenseFilter.order];
    formExpenseFilter.post(route_name, {
        onError: (error) => console.log(error),
    });
}
function handleSubmitStaffFilter(event, route_name) {
    event.preventDefault();
    formStaffFilter.order = order_inverse.value[formStaffFilter.order];
    formStaffFilter.post(route_name, {
        onError: (error) => console.log(error),
    });
}
function handleSubmitAddBudget(event, route_name) {
    event.preventDefault();
    formAddBudget.post(route_name, {
        onError: (error) =>
            console.log("formAddBudget error submission:", error),
    });
}
function handleSubmitAddDisbursement(event, route_name) {
    event.preventDefault();
    formAddDisbursement.post(route_name, {
        onSuccess: () => {
            showAddDisbursementModal(false);
            formAddDisbursement.reset();
        },
        onError: (error) =>
            console.log("formAddDisbursement error submission:", error),
    });
}
function handleSubmitAddDisbursementLetter(event, route_name) {
    event.preventDefault();
    formAddDisbursementLetter.post(route_name, {
        onSuccess: () => {
            showAddDisbursementLetterModal(false);
            formAddDisbursementLetter.reset();
        },
        onError: (error) =>
            console.log("formAddDisbursementLetter error submission:", error),
    });
}
function handleSubmitAddExpense(event, route_name) {
    event.preventDefault();
    formAddExpense.post(route_name, {
        onSuccess: () => {
            showAddExpenseModal(false);
            formAddExpense.reset();
        },
        onError: (error) =>
            console.log("formAddExpense error submission:", error),
    });
}
function handleSubmitAddStaff(event, route_name) {
    event.preventDefault();
    formAddStaff.post(route_name, {
        onSuccess: () => {
            showAddStaffModal(false);
            formAddStaff.reset();
        },
        onError: (error) => toastNotifRef.value.showToast("warning", error),
    });
}

function handleFileAddDisbursementReceipt(event) {
    formAddDisbursement.receipt = event.target.files[0];
}
function handleFileAddExpenseReceipt(event) {
    formAddExpense.reciept = event.target.files[0];
}
function handleFileAddDisbursementLetter(event) {
    formAddDisbursementLetter.letter = event.target.files[0];
}

function setDisbursementReceipt(receipt) {
    disbursement_receipt.value.image = receipt;
    disbursement_receipt.value.link =
        "/storage/images/receipt/disbursement/" + receipt;
    showReceiptDisbursementModal(true);
}
function setExpenseReceipt(expense) {
    expense_receipt.value.image = expense.reciept;
    expense_receipt.value.link =
        "/storage/images/receipt/expense/" + expense.reciept;
    expense_receipt.value.status =
        expense.financial_id > 0
            ? "Validated by " + expense.financial.name
            : "Unvalidated";
    expense_receipt.value.valid = expense.financial_id > 0;
    expense_receipt.value.id = expense.id;
}

function setLetter(letter, valid) {
    disbursement_letter.value.id = letter.id;
    disbursement_letter.value.letter = letter.letter;
    disbursement_letter.value.valid = valid;
    disbursement_letter.value.link =
        "/storage/document/letter/disbursement/" + letter.letter;
}

function setSelectedUser(user) {
    selected_user.value = user;
}

function setSelectedLogbookImage(image) {
    selectedLogbookImage.value = image;
}

function showLetterModal(is_show) {
    if (modalLetterRef.value == null) {
        const modal = document.getElementById("disbursementLetterModal");
        modalLetterRef.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalLetterRef.value.show();
    } else {
        modalLetterRef.value.hide();
    }
}

function showAddDisbursementLetterModal(is_show) {
    if (modalAddDisbursementLetterRef.value == null) {
        const modal = document.getElementById("addProgramDisbursementLetter");
        modalAddDisbursementLetterRef.value =
            bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalAddDisbursementLetterRef.value.show();
    } else {
        modalAddDisbursementLetterRef.value.hide();
    }
}

function showAddDisbursementModal(is_show) {
    if (modalAddDisbursementRef.value == null) {
        const modal = document.getElementById("addProgramDisbursement");
        modalAddDisbursementRef.value =
            bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalAddDisbursementRef.value.show();
    } else {
        modalAddDisbursementRef.value.hide();
    }
}

function showAddExpenseModal(is_show) {
    if (modalAddExpenseRef.value == null) {
        const modal = document.getElementById("addProgramExpense");
        modalAddExpenseRef.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalAddExpenseRef.value.show();
    } else {
        modalAddExpenseRef.value.hide();
    }
}

function showAddStaffModal(is_show) {
    if (modalAddStaffRef.value == null) {
        const modal = document.getElementById("addProgramStaff");
        modalAddStaffRef.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalAddStaffRef.value.show();
    } else {
        modalAddStaffRef.value.hide();
    }
}

function showReceiptDisbursementModal(is_show) {
    if (modalReceiptDisbursementRef.value == null) {
        const modal = document.getElementById("receiptDisbursementModal");
        modalReceiptDisbursementRef.value =
            bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalReceiptDisbursementRef.value.show();
    } else {
        modalReceiptDisbursementRef.value.hide();
    }
}

function scrollHorizontal(amount) {
    staffLogbookContainerRef.value.scrollBy({
        left: amount,
        behavior: "smooth",
    });
}

const isLargeScreen = ref(window.innerWidth >= 768);
const handleResize = () => {
    isLargeScreen.value = window.innerWidth >= 768;
    window.addEventListener("resize", handleResize);
};

const showInternshipButton = computed(() => {

    console.log('=== DEBUG INTERNSHIP BUTTON ===');
    console.log('Program name:', props.program?.name);
    console.log('Is Internship program:', props.is_internship_program);
    console.log('Can access internship:', props.can_access_internship);
    console.log('Auth user roles_id:', auth_user.roles_id);
    console.log('User access info:', props.user_access_info);
    
    // Cek apakah program ini adalah "Internship"
    const isInternshipProgram = props.is_internship_program;
    
    if (!isInternshipProgram) {
        console.log('Not an internship program, hiding button');
        return false;
    }
    
    // Gunakan data dari controller
    const canAccess = props.can_access_internship;
    
    console.log('Final decision - Show button:', canAccess);
    return canAccess;
});

onMounted(() => {
    placeholder.value = "";
    if (props.default_logbook_id > 0) {
        if (props.default_logbook_id == auth_user.id) {
            setSelectedUser(auth_user);
        }
    }
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
        if (notification.message == "Success delete Disbursement Letter.") {
            showLetterModal(false);
        }
    }
);
</script>

<template>
    <StaffLayout>
        <Head title="Program" :icon="'/storage/local/images/apps/logo.png'" />
        <!-- Notif Toast -->
        <Notif ref="toastNotifRef" />
        <!-- Modal Box -->
        <ModalConfirmation ref="modalConfirmationRef" />
        <ModalAlertNotification ref="modalAlertNotificationRef" />
        <template #header>
            <a
                :href="route('structural')"
                class="bg-opacity-0 text-decoration-none text-primary-emphasis"
            >
                <span class="fw-light">{{ "Structural" }}</span>
            </a>
            <span class="ms-2">{{ "/" }}</span>
            <a
                :href="route('department', program.department_id)"
                class="bg-opacity-0 text-decoration-none text-primary-emphasis ms-2"
            >
                <span class="fw-light">{{ "Department" }}</span>
            </a>
            <span class="ms-2">{{ "/" }}</span>
            {{ "Program" }}
        </template>
        <div class="container me-lg-0 mx-auto mb-5">
            <!-- {{-- Details --}} -->
            <div class="row mt-4">
                <div class="col-12">
                    <div class="card shadow-sm p-3">
                        <div class="row">
                            <div class="col-12">
                                <div
                                    class="d-flex border-primary border-bottom pb-0"
                                >
                                    <span class="h5 text-primary-emphasis">
                                        {{ program.name + " Program" }}
                                    </span>

                                    <Link
                                        v-if="showInternshipButton"
                                        :href="route('internship.applications.index')"
                                        class="btn btn-sm btn-outline-primary ms-auto me-2 d-flex align-items-center gap-2"
                                        style="text-decoration: none;"
                                    >
                                        <i class="bi bi-people-fill"></i>
                                        <span class="d-none d-md-inline">Data Pendaftar</span>
                                        <span class="d-md-none">Pendaftar</span>
                                    </Link>
                                    
                                    <button
                                        v-if="
                                            auth_user.id ==
                                            program.department.manager_id
                                        "
                                        @click="
                                            confirmation(
                                                route('program.delete', {
                                                    id: program.id,
                                                }),
                                                'Are you sure want to delete ' +
                                                    program.name +
                                                    ' Program?'
                                            )
                                        "
                                        class="text-decoration-none ms-auto mb-2 py-0 btn btn-sm btn-outline-secondary border-0"
                                    >
                                        <i class="bi bi-trash3"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-2 d-lg-none">
                            <span class="text-secondary">{{ "Detail" }}</span>
                        </div>
                        <div class="row g-2 mt-0 mt-lg-2">
                            <div class="col-lg-1 d-none d-lg-block">
                                <div class="d-flex w-100 h-100">
                                    <span class="text-secondary my-auto">{{
                                        "Detail"
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
                                <div class="d-flex">
                                    <i
                                        class="bi bi-person text-primary fs-5 my-auto me-2"
                                    ></i>
                                    <div>
                                        <span
                                            class="text-secondary d-block"
                                            style="font-size: 0.8rem"
                                            >{{ "In Charge" }}</span
                                        >
                                        <div class="scroll-x-hidden">
                                            <span
                                                class="text-dark text-nowrap"
                                                >{{ program.user.name }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
                                <div class="d-flex">
                                    <i
                                        class="bi bi-people text-primary fs-5 my-auto me-2"
                                    ></i>
                                    <div>
                                        <span
                                            class="text-secondary d-block"
                                            style="font-size: 0.8rem"
                                            >{{ "Staff" }}</span
                                        >
                                        <div class="scroll-x-hidden">
                                            <span
                                                class="text-dark text-nowrap"
                                                >{{
                                                    staff_list.length +
                                                    (staff_list.length > 1
                                                        ? " persons"
                                                        : " person")
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-lg-3">
                                <div class="d-flex">
                                    <i
                                        class="bi bi-calendar2 text-primary fs-5 my-auto me-2"
                                    ></i>
                                    <div>
                                        <span
                                            class="text-secondary d-block"
                                            style="font-size: 0.8rem"
                                            >{{ "Progress" }}</span
                                        >
                                        <div class="scroll-x-hidden">
                                            <span
                                                class="text-dark text-nowrap"
                                                >{{
                                                    program.financial_id == 0
                                                        ? "Waiting for budget validation."
                                                        : program.disbursement ==
                                                          0
                                                        ? "Waiting for disbursement."
                                                        : "On progress"
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-2 d-lg-none">
                            <span class="text-secondary">{{ "Cashflow" }}</span>
                        </div>
                        <div class="row g-2 mt-lg-2 mt-0">
                            <div class="col-lg-1 d-none d-lg-block">
                                <div class="d-flex w-100 h-100">
                                    <span class="text-secondary my-auto">{{
                                        "Cashflow"
                                    }}</span>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
                                <div class="d-flex">
                                    <i
                                        class="bi bi-list-columns-reverse text-primary fs-5 my-auto me-2"
                                    ></i>
                                    <div>
                                        <span
                                            class="text-secondary d-block"
                                            style="font-size: 0.8rem"
                                            >{{ "Budget" }}</span
                                        >
                                        <div class="scroll-x-hidden">
                                            <span
                                                class="text-dark text-nowrap"
                                                >{{
                                                    formatIDR(program.budget)
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
                                <div class="d-flex">
                                    <i
                                        class="bi bi-box-arrow-in-down text-primary fs-5 my-auto me-2"
                                    ></i>
                                    <div>
                                        <span
                                            class="text-secondary d-block"
                                            style="font-size: 0.8rem"
                                            >{{ "Disbursement" }}</span
                                        >
                                        <div class="scroll-x-hidden">
                                            <span
                                                class="text-dark text-nowrap"
                                                >{{
                                                    formatIDR(
                                                        program.disbursement
                                                    )
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-lg-3">
                                <div class="d-flex">
                                    <i
                                        class="bi bi-box-arrow-up text-primary fs-5 my-auto me-2"
                                    ></i>
                                    <div>
                                        <span
                                            class="text-secondary d-block"
                                            style="font-size: 0.8rem"
                                            >{{ "Expense" }}</span
                                        >
                                        <div class="scroll-x-hidden">
                                            <span
                                                class="text-dark text-nowrap"
                                                >{{
                                                    formatIDR(program.expense)
                                                }}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row gx-4">
                <div class="col-lg-6 col-12">
                    <!-- Logbook -->
                    <div class="row mt-4">
                        <div class="col-12">
                            <div class="card p-2">
                                <div
                                    class="d-flex border-bottom mx-2 border-primary py-1"
                                >
                                    <span class="h5 text-primary-emphasis my-1">
                                        {{ "Logbook" }}
                                    </span>
                                </div>
                                <div class="row gx-2 mt-2">
                                    <div class="col-2 col-lg-2 d-flex">
                                        <span
                                            class="text-primary-emphasis text-nowrap my-auto ms-auto"
                                        >
                                            {{ "Staff " }}
                                            <span class="d-lg-inline d-none">
                                                {{ "List" }}
                                            </span>
                                            {{ ": " }}
                                        </span>
                                    </div>
                                    <div class="col-10 col-lg-10 d-flex">
                                        <button
                                            @click="scrollHorizontal(-100)"
                                            class="btn btn-sm btn-outline-primary border-0 my-auto d-lg-block d-none px-0 me-1"
                                        >
                                            <i
                                                class="bi bi-caret-left-fill"
                                            ></i>
                                        </button>
                                        <div
                                            ref="staffLogbookContainerRef"
                                            class="scroll-container-horizontal-lg scroll-container-horizontal bg-body-tertiary rounded px-2 me-2 me-lg-0"
                                        >
                                            <button
                                                :class="
                                                    'btn btn-sm card shadow-sm my-1 me-2 card-bg-hover d-inline-block ' +
                                                    (staff.employee.id ==
                                                    selected_user.id
                                                        ? 'bg-secondary bg-opacity-25'
                                                        : '')
                                                "
                                                v-for="staff in staff_list"
                                                @click="
                                                    setSelectedUser(
                                                        staff.employee
                                                    )
                                                "
                                            >
                                                <span class="mx-1 text-nowrap">
                                                    {{ staff.employee.name }}
                                                </span>
                                            </button>
                                        </div>
                                        <button
                                            class="btn btn-sm btn-outline-primary border-0 my-auto d-lg-block d-none px-0 ms-1 me-2"
                                            @click="scrollHorizontal(100)"
                                        >
                                            <i
                                                class="bi bi-caret-right-fill"
                                            ></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-12">
                                        <div
                                            class="d-flex border-bottom border-1 mx-2"
                                        >
                                            <span
                                                class="h6 text-primary-emphasis mx-auto"
                                                >{{
                                                    selected_user.name ??
                                                    "Select Staff"
                                                }}</span
                                            >
                                            <a
                                                v-if="selected_user.id"
                                                :href="
                                                    route(
                                                        'profile.edit',
                                                        selected_user.id
                                                    )
                                                "
                                                class="text-decoration-none me-2 d-flex"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <span
                                                    class="text-primary mb-auto"
                                                    :style="'font-size:0.7rem;'"
                                                >
                                                    {{ "visit profile" }}
                                                    <i
                                                        class="bi bi-box-arrow-up-right"
                                                    ></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 d-flex">
                                        <div
                                            class="scroll-container-lg-2 scroll-container-2 mx-2"
                                        >
                                            <ul
                                                class="list-group list-group-flush"
                                            >
                                                <li
                                                    class="list-group-item px-0"
                                                    v-for="logbook in active_logbook"
                                                >
                                                    <div class="d-flex w-100">
                                                        <div
                                                            class="card d-flex me-2"
                                                            :style="'width: 25%; height: auto;'"
                                                        >
                                                            <img
                                                                :src="
                                                                    '/storage/images/log/' +
                                                                    program.id +
                                                                    '/' +
                                                                    logbook.image
                                                                "
                                                                alt="image"
                                                                class="rounded border border-1 border-secondary-subtle"
                                                                data-bs-target="#modalLogbookImage"
                                                                data-bs-toggle="modal"
                                                                @click="
                                                                    setSelectedLogbookImage(
                                                                        logbook.image
                                                                    )
                                                                "
                                                            />
                                                            <!-- Logbook Image Modal -->
                                                            <div
                                                                class="modal fade"
                                                                id="modalLogbookImage"
                                                                tabindex="-1"
                                                            >
                                                                <div
                                                                    class="modal-dialog modal-dialog-centered px-3 px-lg-0"
                                                                >
                                                                    <div
                                                                        class="modal-content shadow mt-5"
                                                                    >
                                                                        <div
                                                                            class="modal-header py-1 ps-3 pe-2"
                                                                        >
                                                                            <span
                                                                                class="modal-title fs-5 text-primary-emphasis"
                                                                            >
                                                                                <i
                                                                                    class="bi bi-key border-secondary-subtle border-2 border-end pe-2"
                                                                                ></i>
                                                                                {{
                                                                                    "Logbook Image"
                                                                                }}
                                                                            </span>
                                                                            <button
                                                                                type="button"
                                                                                class="btn btn-sm ms-auto"
                                                                                data-bs-dismiss="modal"
                                                                            >
                                                                                <i
                                                                                    class="bi bi-x-lg"
                                                                                ></i>
                                                                            </button>
                                                                        </div>
                                                                        <div
                                                                            class="modal-body bg-light"
                                                                        >
                                                                            <div
                                                                                class="d-flex w-100"
                                                                            >
                                                                                <img
                                                                                    :src="
                                                                                        '/storage/images/log/' +
                                                                                        program.id +
                                                                                        '/' +
                                                                                        selectedLogbookImage
                                                                                    "
                                                                                    alt="image"
                                                                                    class="img-fluid object-fit-cover"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="modal-footer p-1"
                                                                        >
                                                                            <a
                                                                                :href="
                                                                                    '/storage/images/log/' +
                                                                                    program.id +
                                                                                    '/' +
                                                                                    selectedLogbookImage
                                                                                "
                                                                                download
                                                                                class="btn btn-sm text-center text-decoration-none text-secondary w-100"
                                                                            >
                                                                                {{
                                                                                    selectedLogbookImage
                                                                                }}
                                                                                <i
                                                                                    class="bi bi-download text-primary"
                                                                                ></i>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="w-100">
                                                            <div
                                                                class="d-flex w-100"
                                                            >
                                                                <span
                                                                    class="fw-light me-auto"
                                                                    >{{
                                                                        formatDate(
                                                                            logbook.created_at
                                                                        )
                                                                    }}</span
                                                                >
                                                                <button
                                                                    v-if="
                                                                        auth_user.id ==
                                                                        program.pic_id
                                                                    "
                                                                    @click="
                                                                        confirmation(
                                                                            route(
                                                                                'logbook.validate',
                                                                                logbook.id
                                                                            ),
                                                                            'Are you sure this log book is ' +
                                                                                (logbook.validated >
                                                                                0
                                                                                    ? 'not valid'
                                                                                    : 'valid') +
                                                                                '?'
                                                                        )
                                                                    "
                                                                    :class="
                                                                        'btn btn-sm border-0 py-0 btn-outline-' +
                                                                        (logbook.validated >
                                                                        0
                                                                            ? 'success'
                                                                            : 'secondary')
                                                                    "
                                                                >
                                                                    {{
                                                                        logbook.validated >
                                                                        0
                                                                            ? "validated"
                                                                            : "unvalidated"
                                                                    }}
                                                                </button>
                                                                <span
                                                                    v-if="
                                                                        auth_user.id !==
                                                                        program.pic_id
                                                                    "
                                                                    :class="
                                                                        'text-' +
                                                                        (logbook.validated >
                                                                        0
                                                                            ? 'success'
                                                                            : 'secondary')
                                                                    "
                                                                    >{{
                                                                        logbook.validated >
                                                                        0
                                                                            ? "valid"
                                                                            : "unvalid"
                                                                    }}</span
                                                                >
                                                                <div
                                                                    v-if="
                                                                        auth_user.id ==
                                                                            selected_user.id &&
                                                                        logbook.validated ==
                                                                            0
                                                                    "
                                                                    class="my-1 border-start border-1 mx-1"
                                                                ></div>
                                                                <button
                                                                    v-if="
                                                                        auth_user.id ==
                                                                            selected_user.id &&
                                                                        logbook.validated ==
                                                                            0
                                                                    "
                                                                    class="btn btn-sm btn-outline-secondary border-0 py-0"
                                                                    @click="
                                                                        confirmation(
                                                                            route(
                                                                                'logbook.delete',
                                                                                logbook.id
                                                                            ),
                                                                            'Are you sure want to delete this log?'
                                                                        )
                                                                    "
                                                                >
                                                                    <i
                                                                        class="bi bi-trash3"
                                                                    ></i>
                                                                </button>
                                                            </div>
                                                            <span>{{
                                                                logbook.title
                                                            }}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li
                                                    class="list-group-item px-0"
                                                    v-if="
                                                        active_logbook.length ==
                                                        0
                                                    "
                                                >
                                                    <div class="d-flex">
                                                        <div
                                                            class="card d-flex me-2"
                                                            :style="'width: 25%; height: auto;'"
                                                        >
                                                            <img
                                                                :src="'/storage/images/apps/logo.png'"
                                                                alt="image"
                                                                class="rounded border border-1 border-secondary-subtle"
                                                            />
                                                        </div>
                                                        <div class="w-100">
                                                            <div class="d-flex">
                                                                <div
                                                                    class="fw-light card me-auto"
                                                                >
                                                                    {{
                                                                        selected_user ==
                                                                        0
                                                                            ? "Logbook date"
                                                                            : "-"
                                                                    }}
                                                                </div>
                                                                <div
                                                                    class="text-secondary d-block ms-auto me-2"
                                                                >
                                                                    {{
                                                                        selected_user ==
                                                                        0
                                                                            ? "Logbook status"
                                                                            : ""
                                                                    }}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {{
                                                                    selected_user ==
                                                                    0
                                                                        ? "Logbook detail"
                                                                        : selected_user.name +
                                                                          " have not create any logbook."
                                                                }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-12">
                    <!-- {{-- Content Tab Navigation --}} -->
                    <div class="row mt-4 mb-4">
                        <div class="col-12">
                            <div class="d-flex bg-white rounded">
                                <button
                                    @click="show_tab(1)"
                                    :key="active_tab == 1"
                                    :class="
                                        'btn btn-sm btn-outline-primary rounded w-25 border-3 border-light py-1 ' +
                                        (active_tab == 1 ? 'active' : '')
                                    "
                                >
                                    <i
                                        :class="
                                            'bi bi-list-columns-reverse d-lg-none ' +
                                            (active_tab == 1 ? 'd-none' : '')
                                        "
                                    ></i
                                    ><span
                                        :style="
                                            isLargeScreen
                                                ? 'font-size:1rem;'
                                                : 'font-size:0.7rem;'
                                        "
                                        :class="
                                            'd-lg-inline ' +
                                            (active_tab == 1 ? '' : 'd-none')
                                        "
                                        >{{ "Budget" }}</span
                                    >
                                </button>

                                <button
                                    @click="show_tab(2)"
                                    :key="active_tab == 2"
                                    :class="
                                        'btn btn-sm btn-outline-primary rounded w-25 border-3 border-light py-1 ' +
                                        (active_tab == 2 ? 'active' : '')
                                    "
                                >
                                    <i
                                        :class="
                                            'bi bi-box-arrow-in-down d-lg-none ' +
                                            (active_tab == 2 ? 'd-none' : '')
                                        "
                                    ></i
                                    ><span
                                        :style="
                                            isLargeScreen
                                                ? 'font-size:1rem;'
                                                : 'font-size:0.7rem;'
                                        "
                                        :class="
                                            'd-lg-inline ' +
                                            (active_tab == 2 ? '' : 'd-none')
                                        "
                                        >{{ "Disbursement" }}</span
                                    >
                                </button>

                                <button
                                    @click="show_tab(3)"
                                    :key="active_tab == 3"
                                    :class="
                                        'btn btn-sm btn-outline-primary rounded w-25 border-3 border-light py-1 ' +
                                        (active_tab == 3 ? 'active' : '')
                                    "
                                >
                                    <i
                                        :class="
                                            'bi bi-box-arrow-up d-lg-none ' +
                                            (active_tab == 3 ? 'd-none' : '')
                                        "
                                    ></i
                                    ><span
                                        :style="
                                            isLargeScreen
                                                ? 'font-size:1rem;'
                                                : 'font-size:0.7rem;'
                                        "
                                        :class="
                                            'd-lg-inline ' +
                                            (active_tab == 3 ? '' : 'd-none')
                                        "
                                        >{{ "Expense" }}</span
                                    >
                                </button>

                                <button
                                    @click="show_tab(4)"
                                    :key="active_tab == 4"
                                    :class="
                                        'btn btn-sm btn-outline-primary rounded w-25 border-3 border-light py-1 ' +
                                        (active_tab == 4 ? 'active' : '')
                                    "
                                >
                                    <i
                                        :class="
                                            'bi bi-people d-lg-none ' +
                                            (active_tab == 4 ? 'd-none' : '')
                                        "
                                    ></i
                                    ><span
                                        :style="
                                            isLargeScreen
                                                ? 'font-size:1rem;'
                                                : 'font-size:0.7rem;'
                                        "
                                        :class="
                                            'd-lg-inline ' +
                                            (active_tab == 4 ? '' : 'd-none')
                                        "
                                        id="tab_span_4"
                                        >{{ "Staff" }}</span
                                    >
                                </button>
                            </div>
                        </div>
                    </div>
                    <transition
                        name="fade-slide-ltr"
                        @after-leave="proceed_show_tab()"
                    >
                        <!-- {{-- Budget list --}} -->
                        <div id="content_1" v-if="active_tab == 1">
                            <!-- {{-- Budget Filter --}} -->
                            <div class="row justify-content-center">
                                <div class="col-12">
                                    <nav
                                        class="navbar rounded bg-white shadow-sm p-2"
                                    >
                                        <form
                                            method="post"
                                            id="formBudgetFilter"
                                            @submit.prevent="
                                                handleSubmitBudgetFilter(
                                                    $event,
                                                    route(
                                                        'program.budget.filter',
                                                        {
                                                            id: program.id,
                                                        }
                                                    )
                                                )
                                            "
                                        ></form>
                                        <div class="container d-block px-0">
                                            <div class="row">
                                                <div class="col-12 d-flex">
                                                    <div
                                                        class="input-group bg-body-tertiary rounded"
                                                    >
                                                        <button
                                                            type="button"
                                                            form="formBudgetFilter"
                                                            class="btn btn-sm rounded-0 rounded-start text-light bg-secondary"
                                                        >
                                                            <i
                                                                class="bi bi-funnel-fill"
                                                            ></i>
                                                            <span
                                                                class="ms-1 ps-2 border-start border-light d-none d-md-inline"
                                                                >{{
                                                                    "Filter"
                                                                }}</span
                                                            >
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            form="formBudgetFilter"
                                                            class="btn btn-sm btn-outline-secondary border-0 rounded-0 my-0"
                                                            @click="
                                                                budgetFilterCategory(
                                                                    'name'
                                                                )
                                                            "
                                                        >
                                                            <span
                                                                class="me-1"
                                                                >{{
                                                                    "Name"
                                                                }}</span
                                                            >
                                                            <i
                                                                :class="
                                                                    'bi bi-sort-numeric-' +
                                                                    (filter[
                                                                        'budget'
                                                                    ][
                                                                        'category'
                                                                    ] ==
                                                                        'name' &&
                                                                    filter[
                                                                        'budget'
                                                                    ][
                                                                        'order'
                                                                    ] == 'asc'
                                                                        ? 'up'
                                                                        : 'down') +
                                                                    '-alt'
                                                                "
                                                            ></i>
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            form="formBudgetFilter"
                                                            class="btn btn-sm btn-outline-secondary border-0 rounded-0 my-0"
                                                            @click="
                                                                budgetFilterCategory(
                                                                    'price'
                                                                )
                                                            "
                                                        >
                                                            <span
                                                                class="me-1"
                                                                >{{
                                                                    "Price"
                                                                }}</span
                                                            >
                                                            <i
                                                                :class="
                                                                    'bi bi-sort-numeric-' +
                                                                    (filter[
                                                                        'budget'
                                                                    ][
                                                                        'category'
                                                                    ] ==
                                                                        'price' &&
                                                                    filter[
                                                                        'budget'
                                                                    ][
                                                                        'order'
                                                                    ] == 'asc'
                                                                        ? 'up'
                                                                        : 'down') +
                                                                    '-alt'
                                                                "
                                                            ></i>
                                                        </button>
                                                    </div>
                                                    <!-- Button trigger Add Budget Modal -->
                                                    <div
                                                        v-if="
                                                            auth_user.id ==
                                                            program.pic_id
                                                        "
                                                        @click="
                                                            program.financial_id >
                                                            0
                                                                ? alertNotification(
                                                                      'You can not add Budget Item after Program Budget approved by Financial Officer.'
                                                                  )
                                                                : ''
                                                        "
                                                    >
                                                        <button
                                                            :class="
                                                                'ms-2 btn btn-sm btn-outline-primary border-0 ' +
                                                                (program.financial_id <=
                                                                0
                                                                    ? ''
                                                                    : 'disabled')
                                                            "
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#addProgramBudget"
                                                        >
                                                            <i
                                                                class="bi bi-plus-lg"
                                                            ></i>
                                                        </button>
                                                    </div>
                                                    <!-- Add Budget Modal -->
                                                    <div
                                                        class="modal fade"
                                                        id="addProgramBudget"
                                                        tabindex="-1"
                                                        v-if="
                                                            auth_user.id ==
                                                                program.pic_id &&
                                                            program.financial_id <=
                                                                0
                                                        "
                                                        aria-labelledby="exampleModalLabel"
                                                        aria-hidden="true"
                                                    >
                                                        <div
                                                            class="modal-dialog modal-dialog-centered"
                                                        >
                                                            <div
                                                                class="modal-content shadow mx-3"
                                                            >
                                                                <div
                                                                    class="modal-header py-1 ps-3 pe-2"
                                                                >
                                                                    <span
                                                                        class="modal-title fs-5 text-primary-emphasis"
                                                                        id="exampleModalLabel"
                                                                        ><i
                                                                            class="bi bi-journal-plus border-secondary border-end me-2 pe-2"
                                                                        ></i>
                                                                        {{
                                                                            "New Budget Item"
                                                                        }}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        class="btn btn-sm ms-auto"
                                                                        data-bs-dismiss="modal"
                                                                        aria-label="Close"
                                                                    >
                                                                        <i
                                                                            class="bi bi-x-lg"
                                                                        ></i>
                                                                    </button>
                                                                </div>
                                                                <form
                                                                    method="post"
                                                                    @submit.prevent="
                                                                        handleSubmitAddBudget(
                                                                            $event,
                                                                            route(
                                                                                'program.budget.add',
                                                                                {
                                                                                    id: program.id,
                                                                                }
                                                                            )
                                                                        )
                                                                    "
                                                                >
                                                                    <div
                                                                        class="modal-body bg-light"
                                                                    >
                                                                        <div
                                                                            class="row justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3"
                                                                            >
                                                                                <label
                                                                                    for="add_budget_name"
                                                                                    class="form-label d-inline-block"
                                                                                    >{{
                                                                                        "Name"
                                                                                    }}</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <input
                                                                                    type="text"
                                                                                    class="form-control form-control-sm d-inline-block"
                                                                                    v-model="
                                                                                        formAddBudget.name
                                                                                    "
                                                                                    id="add_budget_name"
                                                                                    required
                                                                                />
                                                                                <InputError
                                                                                    :message="
                                                                                        formAddBudget
                                                                                            .errors
                                                                                            .item_name
                                                                                    "
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="row mt-2 justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3"
                                                                            >
                                                                                <label
                                                                                    for="add_budget_price"
                                                                                    class="form-label d-inline-block"
                                                                                    >{{
                                                                                        "Price"
                                                                                    }}</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <input
                                                                                    type="number"
                                                                                    class="form-control form-control-sm d-inline-block"
                                                                                    id="add_budget_price"
                                                                                    v-model="
                                                                                        formAddBudget.price
                                                                                    "
                                                                                    placeholder="Type numbers only"
                                                                                    required
                                                                                />
                                                                                <InputError
                                                                                    :message="
                                                                                        formAddBudget
                                                                                            .errors
                                                                                            .price
                                                                                    "
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="row mt-2 justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3"
                                                                            >
                                                                                <label
                                                                                    for="add_budget_unit"
                                                                                    class="form-label d-inline-block"
                                                                                    >{{
                                                                                        "Unit"
                                                                                    }}</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <input
                                                                                    type="text"
                                                                                    class="form-control form-control-sm d-inline-block"
                                                                                    placeholder="gram, ml, pcs, etc.."
                                                                                    id="add_budget_unit"
                                                                                    v-model="
                                                                                        formAddBudget.unit
                                                                                    "
                                                                                    required
                                                                                />
                                                                                <InputError
                                                                                    :message="
                                                                                        formAddBudget
                                                                                            .errors
                                                                                            .unit
                                                                                    "
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="row mt-2 justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3"
                                                                            >
                                                                                <label
                                                                                    for="add_budget_qty"
                                                                                    class="form-label d-inline-block"
                                                                                    >{{
                                                                                        "Quantity"
                                                                                    }}</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <input
                                                                                    type="number"
                                                                                    class="form-control form-control-sm d-inline-block"
                                                                                    id="add_budget_qty"
                                                                                    v-model="
                                                                                        formAddBudget.qty
                                                                                    "
                                                                                    placeholder="Type numbers only"
                                                                                    required
                                                                                />
                                                                                <InputError
                                                                                    :message="
                                                                                        formAddBudget
                                                                                            .errors
                                                                                            .qty
                                                                                    "
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="row mt-2 justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3"
                                                                            >
                                                                                <span
                                                                                    >{{
                                                                                        "Total Price"
                                                                                    }}</span
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <span
                                                                                    id="add_budget_total"
                                                                                    >{{
                                                                                        formatIDR(
                                                                                            formAddBudget.price *
                                                                                                formAddBudget.qty
                                                                                        )
                                                                                    }}</span
                                                                                >
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        class="modal-footer p-1"
                                                                    >
                                                                        <button
                                                                            type="submit"
                                                                            class="btn btn-sm btn-primary"
                                                                        >
                                                                            {{
                                                                                "Add"
                                                                            }}
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- {{-- Validation Button --}} -->
                                                    <button
                                                        v-if="
                                                            auth_user.roles_id ==
                                                            2
                                                        "
                                                        :class="
                                                            'position-relative ms-2 border-0 btn btn-sm btn-outline-' +
                                                            (program.financial_id >
                                                            0
                                                                ? 'success'
                                                                : 'secondary')
                                                        "
                                                        @click="
                                                            confirmation(
                                                                route(
                                                                    'program.budget.validate',
                                                                    {
                                                                        id: program.id,
                                                                        valid:
                                                                            program.financial_id >
                                                                            0
                                                                                ? 0
                                                                                : 1,
                                                                    }
                                                                ),
                                                                program.financial_id >
                                                                    0
                                                                    ? 'Are you sure want to UNPROVE ' +
                                                                          program.name +
                                                                          ' Program Budget?'
                                                                    : 'Are you sure want to APPROVE ' +
                                                                          program.name +
                                                                          ' Program Budget?'
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            :class="
                                                                'bi bi-' +
                                                                (program.financial_id >
                                                                0
                                                                    ? 'lock-fill'
                                                                    : 'unlock')
                                                            "
                                                        ></i>
                                                        <i
                                                            v-if="
                                                                program.financial_id <=
                                                                0
                                                            "
                                                            :style="'font-size:0.5rem;'"
                                                            class="bi bi-circle-fill position-absolute top-0 end-0 text-danger"
                                                        ></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <!-- {{-- Budget list item --}} -->
                            <div class="row">
                                <div class="col-12">
                                    <div
                                        class="scroll-container-3 scroll-container-lg-2 bg-secondary bg-opacity-25 px-2 pt-2 rounded mt-2"
                                    >
                                        <div
                                            class="card card-bg-hover shadow mb-2 py-1"
                                            v-for="budget in budget_list"
                                        >
                                            <div class="row">
                                                <div class="col-12 d-flex">
                                                    <span
                                                        class="text-primary-emphasis ms-2 my-auto"
                                                        >{{ budget.name }}</span
                                                    >
                                                    <span
                                                        class="fw-light ms-2 d-none d-lg-flex my-auto"
                                                        >{{
                                                            "- " +
                                                            formatIDR(
                                                                budget.price
                                                            ) +
                                                            " /" +
                                                            budget.unit
                                                        }}</span
                                                    >
                                                    <span
                                                        class="fw-light ms-auto d-none d-lg-flex my-auto"
                                                        >{{
                                                            "total (" +
                                                            budget.qty +
                                                            ") : "
                                                        }}</span
                                                    >
                                                    <span
                                                        class="fw-normal mx-2 d-none d-lg-flex my-auto"
                                                        >{{
                                                            formatIDR(
                                                                budget.total_price
                                                            )
                                                        }}</span
                                                    >
                                                    <!-- {{-- Delete Button --}} -->
                                                    <button
                                                        class="ms-auto ms-lg-1 me-2 btn btn-sm btn-danger"
                                                        v-if="
                                                            auth_user.id ==
                                                                program.pic_id &&
                                                            program.financial_id <=
                                                                0
                                                        "
                                                        @click="
                                                            confirmation(
                                                                route(
                                                                    'program.budget.delete',
                                                                    {
                                                                        id: budget.id,
                                                                    }
                                                                ),
                                                                'Are you sure want to delete ' +
                                                                    budget.name +
                                                                    ' from ' +
                                                                    program.name +
                                                                    ' Program Budget?'
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="bi bi-trash"
                                                        ></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="row d-lg-none">
                                                <div class="col-12 d-flex">
                                                    <span
                                                        class="fw-light ms-2"
                                                        >{{
                                                            formatIDR(
                                                                budget.price
                                                            ) +
                                                            " /" +
                                                            budget.unit
                                                        }}</span
                                                    >
                                                    <span
                                                        class="fw-light ms-auto"
                                                        >{{
                                                            "total (" +
                                                            budget.qty +
                                                            ") : "
                                                        }}</span
                                                    >
                                                    <span
                                                        class="fw-normal mx-2"
                                                        >{{
                                                            formatIDR(
                                                                budget.total_price
                                                            )
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition
                        :name="
                            prev_tab > 2 || next_tab > 2
                                ? 'fade-slide-ltr'
                                : 'fade-slide-rtl'
                        "
                        @after-leave="proceed_show_tab()"
                    >
                        <!-- {{-- Disbursement list --}} -->
                        <div id="content_2" v-if="active_tab == 2">
                            <!-- {{-- Disbursement Filter --}} -->
                            <div class="row justify-content-center">
                                <div class="col-12">
                                    <nav
                                        class="navbar rounded bg-white shadow-sm p-2"
                                    >
                                        <form
                                            method="post"
                                            id="formDisbursementFilter"
                                            @submit.prevent="
                                                handleSubmitDisbursementFilter(
                                                    $event,
                                                    route(
                                                        'program.disbursement.filter',
                                                        { id: program.id }
                                                    )
                                                )
                                            "
                                        ></form>
                                        <div class="container d-block px-0">
                                            <div class="row">
                                                <div class="col-12 d-flex">
                                                    <div
                                                        class="input-group bg-body-tertiary rounded"
                                                    >
                                                        <button
                                                            type="button"
                                                            class="btn btn-sm rounded-0 rounded-start text-light bg-secondary"
                                                        >
                                                            <i
                                                                class="bi bi-funnel-fill"
                                                            ></i>
                                                            <span
                                                                class="ms-1 ps-2 border-start border-light d-none d-md-inline"
                                                                >{{
                                                                    "Filter"
                                                                }}</span
                                                            >
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            form="formDisbursementFilter"
                                                            class="btn btn-sm btn-outline-secondary border-0 rounded-0 my-0"
                                                            @click="
                                                                filterDisbursementAction(
                                                                    'price'
                                                                )
                                                            "
                                                        >
                                                            <span
                                                                class="me-1"
                                                                >{{
                                                                    "Price"
                                                                }}</span
                                                            >
                                                            <i
                                                                :class="
                                                                    'bi bi-sort-numeric-' +
                                                                    (filter[
                                                                        'disbursement'
                                                                    ][
                                                                        'category'
                                                                    ] ==
                                                                        'price' &&
                                                                    filter[
                                                                        'disbursement'
                                                                    ][
                                                                        'order'
                                                                    ] == 'asc'
                                                                        ? 'up'
                                                                        : 'down') +
                                                                    '-alt'
                                                                "
                                                            ></i>
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            form="formDisbursementFilter"
                                                            @click="
                                                                filterDisbursementAction(
                                                                    'trashed'
                                                                )
                                                            "
                                                            :class="
                                                                'btn btn-sm btn-outline-secondary ' +
                                                                (filter[
                                                                    'disbursement'
                                                                ]['trashed'] ==
                                                                'trashed'
                                                                    ? 'active'
                                                                    : '') +
                                                                ' border-0 rounded-0 my-0'
                                                            "
                                                        >
                                                            <span
                                                                class="me-1"
                                                                >{{
                                                                    "Trashed"
                                                                }}</span
                                                            >
                                                            <i
                                                                class="bi bi-trash3"
                                                            ></i>
                                                        </button>
                                                    </div>
                                                    <!-- Button trigger Add Disbursement Modal -->
                                                    <div
                                                        v-if="
                                                            auth_user.roles_id ==
                                                            2
                                                        "
                                                        @click="
                                                            program.financial_id ==
                                                            0
                                                                ? alertNotification(
                                                                      'You can add Disbursement Item after Program Budget approved by Financial Officer.'
                                                                  )
                                                                : ''
                                                        "
                                                    >
                                                        <button
                                                            :class="
                                                                'ms-2 btn btn-sm btn-outline-primary border-0 ' +
                                                                (program.financial_id >
                                                                0
                                                                    ? ''
                                                                    : ' disabled')
                                                            "
                                                            @click="
                                                                showAddDisbursementModal(
                                                                    true
                                                                )
                                                            "
                                                        >
                                                            <i
                                                                class="bi bi-plus-lg"
                                                            ></i>
                                                        </button>
                                                    </div>
                                                    <!-- Add Disbursement Modal -->
                                                    <div
                                                        v-if="
                                                            program.financial_id >
                                                            0
                                                        "
                                                        class="modal fade"
                                                        id="addProgramDisbursement"
                                                        tabindex="-1"
                                                        aria-labelledby="exampleModalLabel"
                                                        aria-hidden="true"
                                                    >
                                                        <div
                                                            class="modal-dialog modal-dialog-centered"
                                                        >
                                                            <div
                                                                class="modal-content shadow mx-3"
                                                            >
                                                                <div
                                                                    class="modal-header py-1 ps-3 pe-2"
                                                                >
                                                                    <span
                                                                        class="modal-title fs-5 text-primary-emphasis"
                                                                        ><i
                                                                            class="bi bi-wallet2 border-secondary border-end me-2 pe-2"
                                                                        ></i>
                                                                        {{
                                                                            "New Disbursement Item"
                                                                        }}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        class="btn btn-sm ms-auto"
                                                                        @click="
                                                                            showAddDisbursementModal(
                                                                                false
                                                                            )
                                                                        "
                                                                    >
                                                                        <i
                                                                            class="bi bi-x-lg"
                                                                        ></i>
                                                                    </button>
                                                                </div>
                                                                <form
                                                                    method="post"
                                                                    enctype="multipart/form-data"
                                                                    @submit.prevent="
                                                                        handleSubmitAddDisbursement(
                                                                            $event,
                                                                            route(
                                                                                'program.disbursement.add',
                                                                                {
                                                                                    id: program.id,
                                                                                }
                                                                            )
                                                                        )
                                                                    "
                                                                >
                                                                    <div
                                                                        class="modal-body bg-light"
                                                                    >
                                                                        <div
                                                                            class="row justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3"
                                                                            >
                                                                                <label
                                                                                    for="add_disbursement_name"
                                                                                    class="form-label d-inline-block"
                                                                                    >Name</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <input
                                                                                    type="text"
                                                                                    class="form-control form-control-sm d-inline-block"
                                                                                    id="add_disbursement_name"
                                                                                    v-model="
                                                                                        formAddDisbursement.name
                                                                                    "
                                                                                    required
                                                                                />
                                                                                <InputError
                                                                                    :message="
                                                                                        formAddDisbursement
                                                                                            .errors
                                                                                            .name
                                                                                    "
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="row mt-2 justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3"
                                                                            >
                                                                                <label
                                                                                    for="add_disbursement_price"
                                                                                    class="form-label d-inline-block"
                                                                                    >Price</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <input
                                                                                    type="number"
                                                                                    class="form-control form-control-sm d-inline-block"
                                                                                    name="price"
                                                                                    v-model="
                                                                                        formAddDisbursement.price
                                                                                    "
                                                                                    placeholder="Type numbers only"
                                                                                    required
                                                                                />
                                                                                <InputError
                                                                                    :message="
                                                                                        formAddDisbursement
                                                                                            .errors
                                                                                            .price
                                                                                    "
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="row mt-2 justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3"
                                                                            >
                                                                                <label
                                                                                    for="add_disbursement_letter"
                                                                                    class="form-label d-inline-block"
                                                                                    >{{
                                                                                        "Letter"
                                                                                    }}</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <select
                                                                                    v-model="
                                                                                        formAddDisbursement.letter_id
                                                                                    "
                                                                                    class="form-select py-0 d-inline"
                                                                                    id="add_disbursement_letter"
                                                                                >
                                                                                    <option
                                                                                        v-for="(
                                                                                            disbursement_letter,
                                                                                            index
                                                                                        ) in disbursement_letter_list.filter(
                                                                                            (
                                                                                                item
                                                                                            ) =>
                                                                                                !item.disbursement
                                                                                        )"
                                                                                        :value="
                                                                                            disbursement_letter.id
                                                                                        "
                                                                                        :key="
                                                                                            disbursement_letter.id
                                                                                        "
                                                                                        :selected="
                                                                                            index ==
                                                                                            1
                                                                                        "
                                                                                    >
                                                                                        {{
                                                                                            "disbursement_letter... " +
                                                                                            (index +
                                                                                                1)
                                                                                        }}
                                                                                    </option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="row mt-2 justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3"
                                                                            >
                                                                                <label
                                                                                    for="add_disbursement_receipt"
                                                                                    class="form-label d-inline-block"
                                                                                    >{{
                                                                                        "Receipt"
                                                                                    }}</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <input
                                                                                    type="file"
                                                                                    class="form-control form-control-sm"
                                                                                    @change="
                                                                                        handleFileAddDisbursementReceipt
                                                                                    "
                                                                                    id="add_disbursement_receipt"
                                                                                />
                                                                                <InputError
                                                                                    :message="
                                                                                        formAddDisbursement
                                                                                            .errors
                                                                                            .receipt
                                                                                    "
                                                                                />
                                                                                <label
                                                                                    for="blaterian_balance"
                                                                                    class="inline-flex items-center mt-1"
                                                                                >
                                                                                    <input
                                                                                        id="blaterian_balance"
                                                                                        type="checkbox"
                                                                                        name="blaterian_balance"
                                                                                        v-model="
                                                                                            formAddDisbursement.blaterian_balance
                                                                                        "
                                                                                        class="rounded"
                                                                                    />
                                                                                    <span
                                                                                        class="ms-2 text-sm"
                                                                                        >{{
                                                                                            "For Blaterian Balance"
                                                                                        }}</span
                                                                                    >
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="row mt-2 justify-content-center"
                                                                            v-if="
                                                                                formAddDisbursement.blaterian_balance
                                                                            "
                                                                            id="add_blaterian_disbursement_container"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3"
                                                                            >
                                                                                <label
                                                                                    for="add_disbursement_price"
                                                                                    class="form-label d-inline-block"
                                                                                    >{{
                                                                                        "Blaterian"
                                                                                    }}</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <div
                                                                                    class="input-group input-group-sm"
                                                                                >
                                                                                    <select
                                                                                        v-model="
                                                                                            formAddDisbursement.blaterian_disbursement
                                                                                        "
                                                                                        class="form-select py-0 d-inline"
                                                                                        id="add_blaterian_disbursement"
                                                                                    >
                                                                                        <option
                                                                                            value="foods"
                                                                                            selected
                                                                                        >
                                                                                            {{
                                                                                                "Food"
                                                                                            }}
                                                                                        </option>
                                                                                        <option
                                                                                            value="goods"
                                                                                        >
                                                                                            {{
                                                                                                "Good"
                                                                                            }}
                                                                                        </option>
                                                                                    </select>
                                                                                    <label
                                                                                        for="add_blaterian_disbursement"
                                                                                        class="input-group-text"
                                                                                        >{{
                                                                                            "Balance"
                                                                                        }}</label
                                                                                    >
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        class="modal-footer p-1"
                                                                    >
                                                                        <button
                                                                            type="submit"
                                                                            class="btn btn-sm btn-primary"
                                                                        >
                                                                            {{
                                                                                "Add"
                                                                            }}
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- {{-- Disbursement Letter List --}} -->
                                            <div class="row mt-2">
                                                <div class="col-12 d-flex">
                                                    <span
                                                        class="fw-light d-none d-lg-inline me-1 my-auto"
                                                        >{{
                                                            "Disbursement "
                                                        }}</span
                                                    >
                                                    <span
                                                        class="fw-light my-auto me-1"
                                                        >{{ "Letter :" }}</span
                                                    >
                                                    <button
                                                        class="me-1 btn btn-sm btn-outline-primary border-0 py-0 position-relative"
                                                        v-for="(
                                                            disbursement_letter,
                                                            disbursement_letter_index
                                                        ) in disbursement_letter_list.filter(
                                                            (
                                                                disbursement_letter
                                                            ) =>
                                                                !disbursement_letter.disbursement
                                                        )"
                                                        :key="
                                                            disbursement_letter.id
                                                        "
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#disbursementLetterModal"
                                                        @click="
                                                            setLetter(
                                                                disbursement_letter,
                                                                false
                                                            )
                                                        "
                                                    >
                                                        {{
                                                            disbursement_letter_index +
                                                            1
                                                        }}
                                                        <i
                                                            class="bi bi-envelope-exclamation"
                                                        >
                                                        </i>
                                                    </button>
                                                    <!-- Disbursement Letter Modal -->
                                                    <div
                                                        class="modal fade"
                                                        id="disbursementLetterModal"
                                                        tabindex="-1"
                                                        aria-labelledby="disbursementLetterModal"
                                                        aria-hidden="true"
                                                    >
                                                        <div
                                                            class="modal-dialog modal-lg modal-dialog-centered"
                                                        >
                                                            <div
                                                                class="modal-content shadow mx-3 mt-5"
                                                            >
                                                                <div
                                                                    class="modal-header py-1 ps-3 pe-2"
                                                                >
                                                                    <span
                                                                        class="modal-title fs-5 text-primary-emphasis"
                                                                    >
                                                                        <i
                                                                            class="bi bi-envelope border-secondary border-end me-2 pe-2"
                                                                        ></i>
                                                                        {{
                                                                            "Disbursement Letter"
                                                                        }}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        class="btn btn-sm ms-auto"
                                                                        @click="
                                                                            showLetterModal(
                                                                                false
                                                                            )
                                                                        "
                                                                    >
                                                                        <i
                                                                            class="bi bi-x-lg"
                                                                        ></i>
                                                                    </button>
                                                                </div>
                                                                <div
                                                                    class="modal-body bg-light p-1 px-3"
                                                                >
                                                                    <div
                                                                        class="row justify-content-center mt-2"
                                                                    >
                                                                        <div
                                                                            class="col-12 d-flex ratio ratio-16x9"
                                                                        >
                                                                            <transition
                                                                                name="fade"
                                                                                mode="out-in"
                                                                                :key="
                                                                                    disbursement_letter.link
                                                                                "
                                                                            >
                                                                                <iframe
                                                                                    id="disbursement_letter"
                                                                                    :src="
                                                                                        disbursement_letter.link
                                                                                    "
                                                                                    frameborder="0"
                                                                                ></iframe>
                                                                            </transition>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        class="row justify-content-center"
                                                                    >
                                                                        <div
                                                                            class="col-12 d-flex"
                                                                        >
                                                                            <a
                                                                                :href="
                                                                                    disbursement_letter.link
                                                                                "
                                                                                target="blank"
                                                                                class="mx-auto text-decoration-none"
                                                                                id="disbursement_letter_download"
                                                                                download
                                                                            >
                                                                                <button
                                                                                    class="btn btn-sm btn-light"
                                                                                >
                                                                                    <span
                                                                                        class="fw-light d-none d-lg-inline"
                                                                                        id="disbursement_letter_name"
                                                                                    ></span>
                                                                                    <span
                                                                                        class="fw-light"
                                                                                        >{{
                                                                                            disbursement_letter.letter
                                                                                        }}</span
                                                                                    >
                                                                                    <i
                                                                                        class="bi bi-download text-primary ms-2"
                                                                                    ></i>
                                                                                </button>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="modal-footer p-1 px-2"
                                                                >
                                                                    <div
                                                                        class="row"
                                                                    >
                                                                        <div
                                                                            class="col-12 d-flex px-0"
                                                                        >
                                                                            <div
                                                                                class="input-group input-group-sm ms-auto"
                                                                            >
                                                                                <button
                                                                                    v-if="
                                                                                        auth_user.id ==
                                                                                            program.pic_id &&
                                                                                        !disbursement_letter.valid
                                                                                    "
                                                                                    @click="
                                                                                        confirmation(
                                                                                            route(
                                                                                                'program.disbursement.letter.delete',
                                                                                                {
                                                                                                    id: disbursement_letter.id,
                                                                                                }
                                                                                            ),
                                                                                            'Are you sure want to delete ' +
                                                                                                disbursement_letter.letter +
                                                                                                ' from disbursement letter list?'
                                                                                        )
                                                                                    "
                                                                                    id="disbursement_letter_delete"
                                                                                    class="btn btn-sm btn-danger text-decoration-none"
                                                                                >
                                                                                    {{
                                                                                        "Delete"
                                                                                    }}
                                                                                </button>
                                                                                <button
                                                                                    data-bs-dismiss="modal"
                                                                                    aria-label="Close"
                                                                                    class="btn btn-sm btn-secondary"
                                                                                >
                                                                                    {{
                                                                                        "Close"
                                                                                    }}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Button trigger Add Disbursement Letter Modal -->
                                                    <div
                                                        class="ms-auto"
                                                        v-if="
                                                            auth_user.id ==
                                                            program.pic_id
                                                        "
                                                        @click="
                                                            program.financial_id >
                                                            0
                                                                ? ''
                                                                : alertNotification(
                                                                      'You can add Disbursement Letter after Program Budget approved by Financial Officer.'
                                                                  )
                                                        "
                                                    >
                                                        <button
                                                            :class="
                                                                'btn btn-sm btn-outline-primary border-0 ' +
                                                                (program.financial_id >
                                                                0
                                                                    ? ''
                                                                    : ' disabled')
                                                            "
                                                            @click="
                                                                showAddDisbursementLetterModal(
                                                                    true
                                                                )
                                                            "
                                                        >
                                                            <i
                                                                class="bi bi-envelope-plus"
                                                            ></i>
                                                        </button>
                                                    </div>
                                                    <!-- Add Disbursement Letter Modal -->
                                                    <div
                                                        v-if="
                                                            auth_user.id ==
                                                                program.pic_id &&
                                                            program.financial_id >
                                                                0
                                                        "
                                                        class="modal fade"
                                                        id="addProgramDisbursementLetter"
                                                        tabindex="-1"
                                                        aria-labelledby="exampleModalLabel"
                                                        aria-hidden="true"
                                                    >
                                                        <div
                                                            class="modal-dialog modal-dialog-centered"
                                                        >
                                                            <div
                                                                class="modal-content shadow mx-3"
                                                            >
                                                                <div
                                                                    class="modal-header py-1 ps-3 pe-2"
                                                                >
                                                                    <span
                                                                        class="modal-title fs-5 text-primary-emphasis"
                                                                        id="exampleModalLabel"
                                                                        ><i
                                                                            class="bi bi-wallet2 border-secondary border-end me-2 pe-2"
                                                                        ></i>
                                                                        {{
                                                                            "New Disbursement Letter"
                                                                        }}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        class="btn btn-sm ms-auto"
                                                                        @click="
                                                                            showAddDisbursementLetterModal(
                                                                                false
                                                                            )
                                                                        "
                                                                    >
                                                                        <i
                                                                            class="bi bi-x-lg"
                                                                        ></i>
                                                                    </button>
                                                                </div>
                                                                <form
                                                                    method="post"
                                                                    enctype="multipart/form-data"
                                                                    @submit.prevent="
                                                                        handleSubmitAddDisbursementLetter(
                                                                            $event,
                                                                            route(
                                                                                'program.disbursement.letter.add',
                                                                                {
                                                                                    id: program.id,
                                                                                }
                                                                            )
                                                                        )
                                                                    "
                                                                >
                                                                    <div
                                                                        class="modal-body bg-light"
                                                                    >
                                                                        <div
                                                                            class="row justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3"
                                                                            >
                                                                                <label
                                                                                    for="add_disbursement_letter"
                                                                                    class="form-label d-inline-block"
                                                                                    >{{
                                                                                        "Letter"
                                                                                    }}</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <input
                                                                                    type="file"
                                                                                    class="form-control form-control-sm"
                                                                                    id="add_disbursement_letter"
                                                                                    @change="
                                                                                        handleFileAddDisbursementLetter
                                                                                    "
                                                                                />
                                                                                <InputError
                                                                                    :message="
                                                                                        formAddDisbursementLetter
                                                                                            .errors
                                                                                            .letter
                                                                                    "
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        class="modal-footer p-1"
                                                                    >
                                                                        <button
                                                                            type="submit"
                                                                            class="btn btn-sm btn-primary"
                                                                        >
                                                                            {{
                                                                                "Add"
                                                                            }}
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <!-- {{-- Disbursement list item --}} -->
                            <div class="row">
                                <div class="col-12">
                                    <div
                                        class="scroll-container-3 scroll-container-lg-2 bg-secondary bg-opacity-25 px-2 pt-2 rounded mt-2"
                                    >
                                        <div
                                            class="card card-bg-hover shadow mb-2 py-1"
                                            v-for="disbursement in disbursement_list"
                                        >
                                            <div class="row">
                                                <div class="col-12 d-flex">
                                                    <span
                                                        class="text-primary-emphasis ms-2 my-auto scroll-x-hidden text-nowrap me-2"
                                                        >{{
                                                            disbursement.name
                                                        }}</span
                                                    >
                                                    <span
                                                        class="fw-light ms-2 d-none d-lg-flex my-auto scroll-x-hidden text-nowrap me-3"
                                                        >{{
                                                            "by " +
                                                            disbursement
                                                                .financial.name
                                                        }}</span
                                                    >
                                                    <span
                                                        class="fw-light ms-auto d-none d-lg-flex my-auto text-nowrap"
                                                        >{{ "price : " }}</span
                                                    >
                                                    <span
                                                        class="fw-normal mx-2 d-none d-lg-flex my-auto"
                                                        >{{
                                                            formatIDR(
                                                                disbursement.price
                                                            )
                                                        }}</span
                                                    >
                                                    <!-- {{-- Letter Trigger Button --}} -->
                                                    <button
                                                        v-if="
                                                            disbursement.deleted_at ==
                                                            null
                                                        "
                                                        class="ms-auto ms-lg-1 btn btn-sm btn-outline-secondary border-0 position-relative"
                                                        @click="
                                                            () => {
                                                                setLetter(
                                                                    disbursement.letter,
                                                                    true
                                                                );
                                                                showLetterModal(
                                                                    true
                                                                );
                                                            }
                                                        "
                                                    >
                                                        <i
                                                            class="bi bi-envelope-paper"
                                                        >
                                                        </i>
                                                    </button>
                                                    <div
                                                        class="border-start border-1 h-100 mx-1"
                                                    ></div>
                                                    <!-- {{-- Receipt Trigger Button --}} -->
                                                    <button
                                                        :class="' btn btn-sm btn-outline-secondary border-0 me-1 '"
                                                        @click="
                                                            setDisbursementReceipt(
                                                                disbursement.reciept
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="bi bi-receipt"
                                                        >
                                                        </i>
                                                    </button>
                                                    <div
                                                        v-if="
                                                            auth_user.roles_id ==
                                                                2 &&
                                                            filter[
                                                                'disbursement'
                                                            ]['trashed'] !==
                                                                'trashed'
                                                        "
                                                        class="border-start border-1 h-100 me-1"
                                                    ></div>
                                                    <!-- {{-- Delete Button --}} -->
                                                    <button
                                                        class="me-2 btn btn-sm btn-outline-danger border-0"
                                                        v-if="
                                                            auth_user.roles_id ==
                                                                2 &&
                                                            filter[
                                                                'disbursement'
                                                            ]['trashed'] !==
                                                                'trashed'
                                                        "
                                                        @click="
                                                            confirmation(
                                                                route(
                                                                    'program.disbursement.delete',
                                                                    {
                                                                        id: disbursement.id,
                                                                    }
                                                                ),
                                                                'Are you sure want to delete ' +
                                                                    disbursement.name +
                                                                    ' from ' +
                                                                    program.name +
                                                                    ' Program Disbursement?'
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="bi bi-trash"
                                                        ></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="row d-lg-none">
                                                <div class="col-12 d-flex">
                                                    <span
                                                        class="fw-light ms-2"
                                                        >{{
                                                            "by " +
                                                            disbursement
                                                                .financial.name
                                                        }}</span
                                                    >
                                                    <span
                                                        class="fw-light ms-auto"
                                                        >{{ "price : " }}</span
                                                    >
                                                    <span
                                                        class="fw-normal mx-2"
                                                        >{{
                                                            formatIDR(
                                                                disbursement.price
                                                            )
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Disbursement Receipt Modal -->
                                <div
                                    class="modal fade"
                                    id="receiptDisbursementModal"
                                    tabindex="-1"
                                    aria-labelledby="receiptDisbursementModal"
                                    aria-hidden="true"
                                >
                                    <div
                                        class="modal-dialog modal-dialog-centered"
                                    >
                                        <div
                                            class="modal-content shadow mx-3 mt-5"
                                        >
                                            <div
                                                class="modal-header py-1 ps-3 pe-2"
                                            >
                                                <span
                                                    class="modal-title fs-5 text-primary-emphasis"
                                                >
                                                    <i
                                                        class="bi bi-receipt border-secondary border-end me-2 pe-2"
                                                    ></i>
                                                    {{ "Disbursement Receipt" }}
                                                </span>
                                                <button
                                                    type="button"
                                                    class="btn btn-sm ms-auto"
                                                    @click="
                                                        showReceiptDisbursementModal(
                                                            false
                                                        )
                                                    "
                                                >
                                                    <i class="bi bi-x-lg"></i>
                                                </button>
                                            </div>
                                            <div
                                                class="modal-body bg-light p-1 px-3"
                                            >
                                                <div
                                                    class="row justify-content-center mt-2"
                                                >
                                                    <div class="col-12 d-flex">
                                                        <img
                                                            :src="
                                                                disbursement_receipt.link
                                                            "
                                                            alt="image"
                                                            :class="
                                                                'rounded mx-auto ' +
                                                                placeholder
                                                            "
                                                            @load="
                                                                showImage(this)
                                                            "
                                                            :style="{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit:
                                                                    'contain',
                                                                maxHeight:
                                                                    '320px',
                                                            }"
                                                            id="disbursement_receipt_image"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    class="row justify-content-center"
                                                >
                                                    <div class="col-12 d-flex">
                                                        <a
                                                            :href="
                                                                disbursement_receipt.link
                                                            "
                                                            target="blank"
                                                            class="mx-auto text-decoration-none"
                                                            id="disbursement_receipt_download"
                                                            download
                                                        >
                                                            <button
                                                                class="btn btn-sm btn-light"
                                                            >
                                                                <span
                                                                    class="fw-light"
                                                                    >{{
                                                                        disbursement_receipt.image
                                                                    }}</span
                                                                >
                                                                <i
                                                                    class="bi bi-download text-primary ms-2"
                                                                ></i>
                                                            </button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer p-1 px-2">
                                                <button
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                    class="btn btn-sm btn-secondary"
                                                >
                                                    {{ "Close" }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition
                        :name="
                            prev_tab > 3 || next_tab > 3
                                ? 'fade-slide-ltr'
                                : 'fade-slide-rtl'
                        "
                        @after-leave="proceed_show_tab()"
                    >
                        <!-- {{-- Expense list --}} -->
                        <div id="content_3" v-if="active_tab == 3">
                            <!-- {{-- Expense Filter --}} -->
                            <div class="row justify-content-center">
                                <div class="col-12">
                                    <nav
                                        class="navbar rounded bg-white shadow-sm p-2"
                                    >
                                        <form
                                            method="post"
                                            id="formExpenseFilter"
                                            @submit.prevent="
                                                handleSubmitExpenseFilter(
                                                    $event,
                                                    route(
                                                        'program.expense.filter',
                                                        { id: program.id }
                                                    )
                                                )
                                            "
                                        ></form>
                                        <div class="container d-block px-0">
                                            <div class="row">
                                                <div class="col-12 d-flex">
                                                    <div
                                                        class="input-group input-group-sm bg-body-tertiary rounded"
                                                    >
                                                        <button
                                                            type="button"
                                                            class="btn btn-sm rounded-0 rounded-start text-light bg-secondary"
                                                        >
                                                            <i
                                                                class="bi bi-funnel-fill"
                                                            ></i>
                                                            <span
                                                                class="ms-1 ps-2 border-start border-light d-none d-md-inline"
                                                                >{{
                                                                    "Filter"
                                                                }}</span
                                                            >
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            form="formExpenseFilter"
                                                            class="btn btn-sm btn-outline-secondary border-0 rounded-0 my-0"
                                                            @click="
                                                                expenseFilterCategory(
                                                                    'name'
                                                                )
                                                            "
                                                        >
                                                            <span
                                                                class="me-1"
                                                                >{{
                                                                    "Name"
                                                                }}</span
                                                            >
                                                            <i
                                                                :class="
                                                                    'bi bi-sort-numeric-' +
                                                                    (filter[
                                                                        'expense'
                                                                    ][
                                                                        'category'
                                                                    ] ==
                                                                        'name' &&
                                                                    filter[
                                                                        'expense'
                                                                    ][
                                                                        'order'
                                                                    ] == 'asc'
                                                                        ? 'up'
                                                                        : 'down') +
                                                                    '-alt'
                                                                "
                                                            ></i>
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            form="formExpenseFilter"
                                                            class="btn btn-sm btn-outline-secondary border-0 rounded-0 my-0"
                                                            @click="
                                                                expenseFilterCategory(
                                                                    'total_price'
                                                                )
                                                            "
                                                        >
                                                            <span
                                                                class="me-1"
                                                                >{{
                                                                    "Price"
                                                                }}</span
                                                            >
                                                            <i
                                                                :class="
                                                                    'bi bi-sort-numeric-' +
                                                                    (filter[
                                                                        'expense'
                                                                    ][
                                                                        'category'
                                                                    ] ==
                                                                        'total_price' &&
                                                                    filter[
                                                                        'expense'
                                                                    ][
                                                                        'order'
                                                                    ] == 'asc'
                                                                        ? 'up'
                                                                        : 'down') +
                                                                    '-alt'
                                                                "
                                                            ></i>
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            form="formExpenseFilter"
                                                            class="btn btn-sm btn-outline-secondary border-0 rounded-0 my-0"
                                                            @click="
                                                                expenseFilterCategory(
                                                                    'financial_id'
                                                                )
                                                            "
                                                        >
                                                            <span
                                                                class="me-1"
                                                                >{{
                                                                    "Valid"
                                                                }}</span
                                                            >
                                                            <i
                                                                :class="
                                                                    'bi bi-sort-numeric-' +
                                                                    (filter[
                                                                        'expense'
                                                                    ][
                                                                        'category'
                                                                    ] ==
                                                                        'financial_id' &&
                                                                    filter[
                                                                        'expense'
                                                                    ][
                                                                        'order'
                                                                    ] == 'asc'
                                                                        ? 'up'
                                                                        : 'down') +
                                                                    '-alt'
                                                                "
                                                            ></i>
                                                        </button>
                                                    </div>
                                                    <!-- Button trigger Add Expense Modal -->
                                                    <div
                                                        v-if="
                                                            auth_user.id ==
                                                            program.pic_id
                                                        "
                                                        @click="
                                                            program.financial_id >
                                                            0
                                                                ? ''
                                                                : alertNotification(
                                                                      'You can add Expense Item after Program Budget approved by Financial Officer.'
                                                                  )
                                                        "
                                                    >
                                                        <button
                                                            :class="
                                                                'ms-2 btn btn-sm btn-outline-primary border-0 ' +
                                                                (program.financial_id >
                                                                0
                                                                    ? ''
                                                                    : ' disabled')
                                                            "
                                                            @click="
                                                                showAddExpenseModal(
                                                                    true
                                                                )
                                                            "
                                                        >
                                                            <i
                                                                class="bi bi-plus-lg"
                                                            ></i>
                                                        </button>
                                                    </div>
                                                    <!-- Add Expense Modal -->
                                                    <div
                                                        class="modal fade"
                                                        id="addProgramExpense"
                                                        tabindex="-1"
                                                        v-if="
                                                            auth_user.id ==
                                                                program.pic_id &&
                                                            program.financial_id >
                                                                0
                                                        "
                                                        aria-labelledby="exampleModalLabel"
                                                        aria-hidden="true"
                                                    >
                                                        <div
                                                            class="modal-dialog modal-dialog-centered"
                                                        >
                                                            <div
                                                                class="modal-content shadow mx-3"
                                                            >
                                                                <div
                                                                    class="modal-header py-1 ps-3 pe-2"
                                                                >
                                                                    <span
                                                                        class="modal-title fs-5 text-primary-emphasis"
                                                                        id="exampleModalLabel"
                                                                        ><i
                                                                            class="bi bi-cart-plus border-secondary border-end me-2 pe-2"
                                                                        ></i>
                                                                        {{
                                                                            "New Expense Item"
                                                                        }}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        class="btn btn-sm ms-auto"
                                                                        @click="
                                                                            showAddExpenseModal(
                                                                                false
                                                                            )
                                                                        "
                                                                    >
                                                                        <i
                                                                            class="bi bi-x-lg"
                                                                        ></i>
                                                                    </button>
                                                                </div>
                                                                <form
                                                                    method="post"
                                                                    enctype="multipart/form-data"
                                                                    @submit.prevent="
                                                                        handleSubmitAddExpense(
                                                                            $event,
                                                                            route(
                                                                                'program.expense.add',
                                                                                {
                                                                                    id: program.id,
                                                                                }
                                                                            )
                                                                        )
                                                                    "
                                                                >
                                                                    <div
                                                                        class="modal-body bg-light"
                                                                    >
                                                                        <div
                                                                            class="row justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3 d-flex"
                                                                            >
                                                                                <label
                                                                                    for="add_expense_name"
                                                                                    class="form-label d-inline-block my-auto"
                                                                                    >{{
                                                                                        "Name"
                                                                                    }}</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <input
                                                                                    type="text"
                                                                                    class="form-control form-control-sm d-inline-block"
                                                                                    name="name"
                                                                                    v-model="
                                                                                        formAddExpense.name
                                                                                    "
                                                                                    required
                                                                                />
                                                                                <InputError
                                                                                    :message="
                                                                                        formAddExpense
                                                                                            .errors
                                                                                            .name
                                                                                    "
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="row mt-2 justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3 d-flex"
                                                                            >
                                                                                <label
                                                                                    for="add_expense_price"
                                                                                    class="form-label d-inline-block my-auto"
                                                                                    >Price</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <input
                                                                                    type="number"
                                                                                    class="form-control form-control-sm d-inline-block"
                                                                                    name="price"
                                                                                    id="add_expense_price"
                                                                                    v-model="
                                                                                        formAddExpense.price
                                                                                    "
                                                                                    placeholder="Type numbers only"
                                                                                    required
                                                                                />
                                                                                <InputError
                                                                                    :message="
                                                                                        formAddExpense
                                                                                            .errors
                                                                                            .price
                                                                                    "
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="row mt-2 justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3 d-flex"
                                                                            >
                                                                                <label
                                                                                    for="add_expense_unit"
                                                                                    class="form-label d-inline-block my-auto"
                                                                                    >Unit</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <input
                                                                                    type="text"
                                                                                    class="form-control form-control-sm d-inline-block"
                                                                                    name="unit"
                                                                                    placeholder="gram, ml, pcs, etc.."
                                                                                    v-model="
                                                                                        formAddExpense.unit
                                                                                    "
                                                                                    required
                                                                                />
                                                                                <InputError
                                                                                    :message="
                                                                                        formAddExpense
                                                                                            .errors
                                                                                            .unit
                                                                                    "
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="row mt-2 justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3 d-flex"
                                                                            >
                                                                                <label
                                                                                    for="add_expense_qty"
                                                                                    class="form-label d-inline-block my-auto"
                                                                                    >Quantity</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <input
                                                                                    type="number"
                                                                                    class="form-control form-control-sm d-inline-block"
                                                                                    name="qty"
                                                                                    id="add_expense_qty"
                                                                                    placeholder="Type numbers only"
                                                                                    v-model="
                                                                                        formAddExpense.qty
                                                                                    "
                                                                                    required
                                                                                />
                                                                                <InputError
                                                                                    :message="
                                                                                        formAddExpense
                                                                                            .errors
                                                                                            .qty
                                                                                    "
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="row mt-2 justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3 d-flex"
                                                                            >
                                                                                <span
                                                                                    >{{
                                                                                        "Total Price"
                                                                                    }}</span
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <span
                                                                                    >{{
                                                                                        formatIDR(
                                                                                            formAddExpense.price *
                                                                                                formAddExpense.qty
                                                                                        )
                                                                                    }}</span
                                                                                >
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="row mt-2 justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3 d-flex"
                                                                            >
                                                                                <label
                                                                                    for="add_expense_receipt"
                                                                                    class="form-label d-inline-block my-auto"
                                                                                    >{{
                                                                                        "Receipt"
                                                                                    }}</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <input
                                                                                    type="file"
                                                                                    class="form-control form-control-sm"
                                                                                    name="reciept"
                                                                                    v-if="
                                                                                        !formAddExpense.same_receipt_check
                                                                                    "
                                                                                    @change="
                                                                                        handleFileAddExpenseReceipt(
                                                                                            $event
                                                                                        )
                                                                                    "
                                                                                />
                                                                                <InputError
                                                                                    :message="
                                                                                        formAddExpense
                                                                                            .errors
                                                                                            .reciept
                                                                                    "
                                                                                />
                                                                                <div
                                                                                    class="input-group input-group-sm"
                                                                                    id="add_expense_receipt_same_container"
                                                                                    v-if="
                                                                                        formAddExpense.same_receipt_check
                                                                                    "
                                                                                >
                                                                                    <label
                                                                                        for="add_expense_receipt_same"
                                                                                        class="input-group-text"
                                                                                        >{{
                                                                                            "Same as item"
                                                                                        }}</label
                                                                                    >
                                                                                    <select
                                                                                        v-model="
                                                                                            formAddExpense.receipt_same
                                                                                        "
                                                                                        class="form-select py-0 d-inline"
                                                                                        id="add_expense_receipt_same"
                                                                                    >
                                                                                        <option
                                                                                            v-for="expense in expense_list"
                                                                                            :value="
                                                                                                expense.id
                                                                                            "
                                                                                            :selected="
                                                                                                expense_list.indexOf(
                                                                                                    expense
                                                                                                ) ==
                                                                                                1
                                                                                            "
                                                                                        >
                                                                                            {{
                                                                                                expense.name
                                                                                            }}
                                                                                        </option>
                                                                                    </select>
                                                                                </div>
                                                                                <label
                                                                                    v-if="
                                                                                        expense_list.length >
                                                                                        0
                                                                                    "
                                                                                    for="same_receipt_check"
                                                                                    class="inline-flex items-center mt-1"
                                                                                >
                                                                                    <input
                                                                                        id="same_receipt_check"
                                                                                        type="checkbox"
                                                                                        v-model="
                                                                                            formAddExpense.same_receipt_check
                                                                                        "
                                                                                        class="rounded"
                                                                                    />
                                                                                    <span
                                                                                        class="ms-2 text-sm"
                                                                                        >{{
                                                                                            "same as exist item"
                                                                                        }}</span
                                                                                    >
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        class="modal-footer p-1"
                                                                    >
                                                                        <button
                                                                            type="submit"
                                                                            class="btn btn-sm btn-primary"
                                                                        >
                                                                            {{
                                                                                "Add"
                                                                            }}
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <!-- {{-- Expense list item --}} -->
                            <div class="row">
                                <div class="col-12">
                                    <div
                                        class="scroll-container-3 scroll-container-lg-2 bg-secondary bg-opacity-25 px-2 pt-2 rounded mt-2"
                                    >
                                        <div
                                            class="card card-bg-hover shadow mb-2 py-1"
                                            v-for="expense in expense_list"
                                        >
                                            <div class="row">
                                                <div class="col-12 d-flex">
                                                    <span
                                                        class="text-primary-emphasis ms-2 my-auto"
                                                        >{{
                                                            expense.name
                                                        }}</span
                                                    >
                                                    <span
                                                        class="fw-light ms-2 d-none d-lg-flex my-auto"
                                                        >{{
                                                            "- " +
                                                            formatIDR(
                                                                expense.price
                                                            ) +
                                                            " /" +
                                                            expense.unit
                                                        }}</span
                                                    >
                                                    <span
                                                        class="fw-light ms-auto d-none d-lg-flex my-auto"
                                                        >{{
                                                            "total (" +
                                                            expense.qty +
                                                            ") : "
                                                        }}</span
                                                    >
                                                    <span
                                                        class="fw-normal mx-2 d-none d-lg-flex my-auto"
                                                        >{{
                                                            formatIDR(
                                                                expense.total_price
                                                            )
                                                        }}</span
                                                    >
                                                    <!-- {{-- Receipt Trigger Button --}} -->
                                                    <button
                                                        class="ms-auto ms-lg-1 me-1 btn btn-sm btn-outline-secondary border-0 position-relative my-auto"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#receiptExpenseModal"
                                                        @click="
                                                            setExpenseReceipt(
                                                                expense
                                                            )
                                                        "
                                                    >
                                                        <span
                                                            v-if="
                                                                expense.financial_id ==
                                                                null
                                                            "
                                                            class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
                                                        ></span>
                                                        <i
                                                            class="bi bi-receipt"
                                                        >
                                                        </i>
                                                    </button>
                                                    <div
                                                        v-if="
                                                            auth_user.id ==
                                                            program.pic_id
                                                        "
                                                        class="border-start border-1 border-secondary-subtle me-1 my-1"
                                                    ></div>
                                                    <!-- {{-- Delete Button --}} -->
                                                    <div
                                                        v-if="
                                                            auth_user.id ==
                                                            program.pic_id
                                                        "
                                                        class="me-1 my-auto"
                                                        @click="
                                                            expense.financial_id <=
                                                            0
                                                                ? ''
                                                                : alertNotification(
                                                                      'This expense has been validated by Financial Officer. You can not delete it, please contact Financial Officer.'
                                                                  )
                                                        "
                                                    >
                                                        <button
                                                            :class="
                                                                'btn btn-sm btn-outline-danger border-0 ' +
                                                                (expense.financial_id >
                                                                0
                                                                    ? 'disabled'
                                                                    : '')
                                                            "
                                                            @click="
                                                                confirmation(
                                                                    route(
                                                                        'program.expense.delete',
                                                                        {
                                                                            id: expense.id,
                                                                        }
                                                                    ),
                                                                    'Are you sure want to delete ' +
                                                                        expense.name +
                                                                        ' from ' +
                                                                        program.name +
                                                                        ' Program Expense?'
                                                                )
                                                            "
                                                        >
                                                            <i
                                                                class="bi bi-trash"
                                                            ></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row d-lg-none">
                                                <div class="col-12 d-flex">
                                                    <span
                                                        class="fw-light ms-2"
                                                        >{{
                                                            formatIDR(
                                                                expense.price
                                                            ) +
                                                            " /" +
                                                            expense.unit
                                                        }}</span
                                                    >
                                                    <span
                                                        class="fw-light ms-auto"
                                                        >{{
                                                            "total (" +
                                                            expense.qty +
                                                            ") : "
                                                        }}</span
                                                    >
                                                    <span
                                                        class="fw-normal mx-2"
                                                        >{{
                                                            formatIDR(
                                                                expense.total_price
                                                            )
                                                        }}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Expense Receipt Modal -->
                                <div
                                    class="modal fade"
                                    id="receiptExpenseModal"
                                    tabindex="-1"
                                    aria-labelledby="receiptExpenseModal"
                                    aria-hidden="true"
                                >
                                    <div
                                        class="modal-dialog modal-dialog-centered"
                                    >
                                        <div
                                            class="modal-content shadow mx-3 mt-5"
                                        >
                                            <div
                                                class="modal-header py-1 ps-3 pe-2"
                                            >
                                                <span
                                                    class="modal-title fs-5 text-primary-emphasis"
                                                >
                                                    <i
                                                        class="bi bi-receipt border-secondary border-end me-2 pe-2"
                                                    ></i>
                                                    {{ "Expense Receipt" }}
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
                                            <div
                                                class="modal-body bg-light p-1 px-3"
                                            >
                                                <div
                                                    class="row justify-content-center mt-2"
                                                >
                                                    <div class="col-12 d-flex">
                                                        <img
                                                            :src="
                                                                expense_receipt.link
                                                            "
                                                            alt="image"
                                                            :class="
                                                                'rounded mx-auto' +
                                                                placeholder
                                                            "
                                                            :style="{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit:
                                                                    'contain',
                                                                maxHeight:
                                                                    '320px',
                                                            }"
                                                            id="expense_receipt_image"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    class="row mt-2 justify-content-center"
                                                >
                                                    <div class="col-12 d-flex">
                                                        <span
                                                            class="fw-light ms-auto"
                                                            >{{
                                                                "Status : "
                                                            }}</span
                                                        >
                                                        <span
                                                            class="fw-normal text-primary-emphasis me-auto ms-1"
                                                            >{{
                                                                expense_receipt.status
                                                            }}</span
                                                        >
                                                    </div>
                                                </div>
                                                <div
                                                    class="row justify-content-center"
                                                >
                                                    <div class="col-12 d-flex">
                                                        <a
                                                            :href="
                                                                expense_receipt.link
                                                            "
                                                            target="blank"
                                                            class="mx-auto text-decoration-none"
                                                            id="expense_receipt_download"
                                                            download
                                                        >
                                                            <button
                                                                class="btn btn-sm btn-light"
                                                            >
                                                                <span
                                                                    class="fw-light"
                                                                    >{{
                                                                        expense_receipt.image
                                                                    }}</span
                                                                >
                                                                <i
                                                                    class="bi bi-download text-primary ms-2"
                                                                ></i>
                                                            </button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer p-1 px-2">
                                                <button
                                                    v-if="
                                                        auth_user.roles_id == 2
                                                    "
                                                    type="button"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                    :class="
                                                        'btn btn-sm btn-' +
                                                        (expense_receipt.valid
                                                            ? 'secondary'
                                                            : 'success')
                                                    "
                                                    id="expense_receipt_button"
                                                    @click="
                                                        confirmation(
                                                            route(
                                                                'program.expense.validate',
                                                                {
                                                                    id: expense_receipt.id,
                                                                }
                                                            ),
                                                            'Are you sure want to ' +
                                                                (expense_receipt.valid
                                                                    ? 'Unvalidate'
                                                                    : 'Validate') +
                                                                ' ' +
                                                                expense_receipt.image +
                                                                '?'
                                                        )
                                                    "
                                                >
                                                    {{
                                                        expense_receipt.valid
                                                            ? "Unvalidate"
                                                            : "Validate"
                                                    }}
                                                </button>
                                                <button
                                                    v-if="
                                                        auth_user.roles_id !== 2
                                                    "
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                    class="btn btn-sm btn-secondary"
                                                >
                                                    {{ "Close" }}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition
                        :name="'fade-slide-rtl'"
                        @after-leave="proceed_show_tab()"
                    >
                        <!-- {{-- Staff list --}} -->
                        <div id="content_4" v-if="active_tab == 4">
                            <!-- {{-- Staff Filter --}} -->
                            <div class="row justify-content-center">
                                <div class="col-12">
                                    <nav
                                        class="navbar rounded bg-white shadow-sm p-2"
                                    >
                                        <form
                                            method="post"
                                            id="formStaffFilter"
                                            @submit.prevent="
                                                handleSubmitStaffFilter(
                                                    $event,
                                                    route(
                                                        'program.staff.filter',
                                                        {
                                                            id: program.id,
                                                        }
                                                    )
                                                )
                                            "
                                        ></form>
                                        <div class="container d-block px-0">
                                            <div class="row">
                                                <div class="col-12 d-flex">
                                                    <div
                                                        class="input-group input-group-sm bg-body-tertiary rounded"
                                                    >
                                                        <button
                                                            type="button"
                                                            class="btn btn-sm rounded-0 rounded-start text-light bg-secondary"
                                                        >
                                                            <i
                                                                class="bi bi-funnel-fill"
                                                            ></i>
                                                            <span
                                                                class="ms-1 ps-2 border-start border-light d-none d-md-inline"
                                                                >{{
                                                                    "Filter"
                                                                }}</span
                                                            >
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            form="formStaffFilter"
                                                            class="btn btn-sm btn-outline-secondary border-0 rounded-0 my-0"
                                                            @click="
                                                                staffFilterCategory(
                                                                    'name'
                                                                )
                                                            "
                                                        >
                                                            <span
                                                                class="me-1"
                                                                >{{
                                                                    "Name"
                                                                }}</span
                                                            >
                                                            <i
                                                                :class="
                                                                    'bi bi-sort-numeric-' +
                                                                    (filter[
                                                                        'staff'
                                                                    ][
                                                                        'category'
                                                                    ] ==
                                                                        'name' &&
                                                                    filter[
                                                                        'staff'
                                                                    ][
                                                                        'order'
                                                                    ] == 'asc'
                                                                        ? 'up'
                                                                        : 'down') +
                                                                    '-alt'
                                                                "
                                                            ></i>
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            form="formStaffFilter"
                                                            class="btn btn-sm btn-outline-secondary border-0 rounded-0 my-0"
                                                            @click="
                                                                staffFilterCategory(
                                                                    'created_at'
                                                                )
                                                            "
                                                        >
                                                            <span
                                                                class="me-1"
                                                                >{{
                                                                    "Date"
                                                                }}</span
                                                            >
                                                            <i
                                                                :class="
                                                                    'bi bi-sort-numeric-' +
                                                                    (filter[
                                                                        'staff'
                                                                    ][
                                                                        'category'
                                                                    ] ==
                                                                        'created_at' &&
                                                                    filter[
                                                                        'staff'
                                                                    ][
                                                                        'order'
                                                                    ] == 'asc'
                                                                        ? 'up'
                                                                        : 'down') +
                                                                    '-alt'
                                                                "
                                                            ></i>
                                                        </button>
                                                    </div>
                                                    <!-- Button trigger Add Staff Modal -->

                                                    <button
                                                        v-if="
                                                            auth_user.id ==
                                                            program.pic_id
                                                        "
                                                        :class="
                                                            'ms-2 btn btn-sm btn-outline-primary border-0 ' +
                                                            (program.financial_id >
                                                            0
                                                                ? ''
                                                                : 'disabled')
                                                        "
                                                        @click="
                                                            showAddStaffModal(
                                                                true
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="bi bi-plus-lg"
                                                        ></i>
                                                    </button>
                                                    <!-- Add Staff Modal -->
                                                    <div
                                                        v-if="
                                                            auth_user.id ==
                                                            program.pic_id
                                                        "
                                                        class="modal fade"
                                                        id="addProgramStaff"
                                                        tabindex="-1"
                                                        aria-labelledby="exampleModalLabel"
                                                        aria-hidden="true"
                                                    >
                                                        <div
                                                            class="modal-dialog modal-dialog-centered"
                                                        >
                                                            <div
                                                                class="modal-content shadow mx-3"
                                                            >
                                                                <div
                                                                    class="modal-header py-1 ps-3 pe-2"
                                                                >
                                                                    <span
                                                                        class="modal-title fs-5 text-primary-emphasis"
                                                                        id="exampleModalLabel"
                                                                        ><i
                                                                            class="bi bi-person-fill-add border-secondary border-end me-2 pe-2"
                                                                        ></i>
                                                                        {{
                                                                            "Add New Staff"
                                                                        }}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        class="btn btn-sm ms-auto"
                                                                        @click="
                                                                            showAddStaffModal(
                                                                                false
                                                                            )
                                                                        "
                                                                    >
                                                                        <i
                                                                            class="bi bi-x-lg"
                                                                        ></i>
                                                                    </button>
                                                                </div>
                                                                <form
                                                                    method="post"
                                                                    @submit.prevent="
                                                                        handleSubmitAddStaff(
                                                                            $event,
                                                                            route(
                                                                                'program.staff.add',
                                                                                {
                                                                                    id: program.id,
                                                                                }
                                                                            )
                                                                        )
                                                                    "
                                                                >
                                                                    <div
                                                                        class="modal-body bg-light"
                                                                    >
                                                                        <div
                                                                            class="row mt-0 justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3"
                                                                            >
                                                                                <label
                                                                                    for="add_staff_title"
                                                                                    class="form-label d-inline-block"
                                                                                    >{{
                                                                                        "Title"
                                                                                    }}</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <input
                                                                                    type="text"
                                                                                    class="form-control form-control-sm d-inline-block"
                                                                                    id="add_staff_title"
                                                                                    v-model="
                                                                                        formAddStaff.staff_title
                                                                                    "
                                                                                    placeholder="PDD, ATP, etc.."
                                                                                    required
                                                                                />
                                                                                <InputError
                                                                                    :message="
                                                                                        formAddStaff
                                                                                            .errors
                                                                                            .staff_title
                                                                                    "
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="row mt-2 justify-content-center"
                                                                        >
                                                                            <div
                                                                                class="col-4 col-lg-3"
                                                                            >
                                                                                <label
                                                                                    for="add_staff_id"
                                                                                    class="form-label d-inline-block"
                                                                                    >{{
                                                                                        "Staff"
                                                                                    }}</label
                                                                                >
                                                                            </div>
                                                                            <div
                                                                                class="col-8 col-lg-7"
                                                                            >
                                                                                <span
                                                                                    v-if="
                                                                                        employee_list.length ==
                                                                                        0
                                                                                    "
                                                                                    class="fw-light fst-italic"
                                                                                >
                                                                                    {{
                                                                                        "There are no available staff."
                                                                                    }}
                                                                                </span>
                                                                                <select
                                                                                    v-if="
                                                                                        employee_list.length >
                                                                                        0
                                                                                    "
                                                                                    v-model="
                                                                                        formAddStaff.staff_id
                                                                                    "
                                                                                    class="form-select py-0 d-inline"
                                                                                    id="add_staff_id"
                                                                                    required
                                                                                >
                                                                                    <option
                                                                                        v-for="employee in employee_list"
                                                                                        :value="
                                                                                            employee.id
                                                                                        "
                                                                                        :selected="
                                                                                            employee_list.indexOf(
                                                                                                employee
                                                                                            ) ==
                                                                                            1
                                                                                        "
                                                                                    >
                                                                                        {{
                                                                                            employee.name
                                                                                        }}
                                                                                    </option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        class="modal-footer p-1"
                                                                    >
                                                                        <button
                                                                            :type="
                                                                                employee_list.length >
                                                                                0
                                                                                    ? 'submit'
                                                                                    : 'button'
                                                                            "
                                                                            :class="
                                                                                'btn btn-sm btn-primary ' +
                                                                                (employee_list.length ==
                                                                                0
                                                                                    ? 'disabled'
                                                                                    : '')
                                                                            "
                                                                        >
                                                                            {{
                                                                                "Add"
                                                                            }}
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <!-- {{-- Staff list item --}} -->
                            <div class="row">
                                <div class="col-12">
                                    <div
                                        class="scroll-container-3 scroll-container-lg-2 bg-secondary bg-opacity-25 px-2 pt-2 rounded mt-2"
                                    >
                                        <div
                                            v-for="staff in staff_list"
                                            class="card card-bg-hover shadow mb-2"
                                        >
                                            <div
                                                class="row gx-0 px-1"
                                                :style="{ height: '100%' }"
                                            >
                                                <div class="col-auto d-flex">
                                                    <div
                                                        class="card position-relative shadow-sm rounded-circle border-primary border-2 my-auto"
                                                        :style="{
                                                            paddingBottom:
                                                                '25px',
                                                            width: '25px',
                                                        }"
                                                    >
                                                        <img
                                                            :src="
                                                                '/storage/images/profile/' +
                                                                (staff.employee
                                                                    .profile_image !==
                                                                null
                                                                    ? staff
                                                                          .employee
                                                                          .profile_image
                                                                    : 'example.png')
                                                            "
                                                            alt="image"
                                                            :class="
                                                                'rounded-circle position-absolute top-0 start-0 w-100 h-100 ' +
                                                                placeholder
                                                            "
                                                            :style="{
                                                                objectFit:
                                                                    'cover',
                                                            }"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col d-flex my-1">
                                                    <a
                                                        :href="
                                                            route(
                                                                'profile.edit',
                                                                {
                                                                    id: staff
                                                                        ?.employee
                                                                        ?.id,
                                                                }
                                                            )
                                                        "
                                                        rel="noopener noreferrer"
                                                        class="text-decoration-none d-flex w-100"
                                                    >
                                                        <div
                                                            class="d-flex scroll-x-hidden text-nowrap ms-2"
                                                        >
                                                            <span
                                                                class="text-primary-emphasis my-auto"
                                                                >{{
                                                                    staff
                                                                        .employee
                                                                        .name
                                                                }}</span
                                                            >
                                                            <span
                                                                :class="
                                                                    'fw-light ms-1 my-auto ' +
                                                                    (staff
                                                                        .employee
                                                                        .id ==
                                                                    program.pic_id
                                                                        ? 'text-dark'
                                                                        : '')
                                                                "
                                                                >{{
                                                                    "- " +
                                                                    staff.title
                                                                }}</span
                                                            >
                                                        </div>
                                                    </a>

                                                    <!-- {{-- Delete Button --}} -->
                                                    <button
                                                        v-if="
                                                            auth_user.id ==
                                                                program.pic_id &&
                                                            program.staff_lock <=
                                                                0 &&
                                                            staff.user_id !==
                                                                program.pic_id
                                                        "
                                                        class="ms-auto btn btn-sm btn-outline-danger border-0"
                                                        @click="
                                                            confirmation(
                                                                route(
                                                                    'program.staff.delete',
                                                                    {
                                                                        id: staff.id,
                                                                    }
                                                                ),
                                                                'Are you sure want to remove ' +
                                                                    staff
                                                                        .employee
                                                                        .name +
                                                                    ' from ' +
                                                                    program.name +
                                                                    ' Staff Program ?'
                                                            )
                                                        "
                                                    >
                                                        <i
                                                            class="bi bi-trash"
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
    </StaffLayout>
</template>
<style scoped>

/* Internship Button Styles */
.btn-outline-primary {
    transition: all 0.3s ease !important;
}

.btn-outline-primary:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3) !important;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .d-flex.border-primary.border-bottom {
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 0.5rem !important;
    }
    
    .btn-outline-primary {
        order: -1 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        margin-bottom: 0.5rem !important;
        width: fit-content !important;
    }
}
</style>