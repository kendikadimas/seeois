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
import IncomeReceiptTemplate from "@/Components/IncomeReceiptTemplate.vue";
import ToastNotification from "@/Components/ToastNotification.vue";
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
    income_list: {
        type: Array,
        default: () => []
    },
    menu_category: {
        type: Object,
        default: () => ({})
    },
    expense_list: {
        type: Array,
        default: () => []
    },
    food_tag_list: {
        type: Array,
        default: () => []
    },
    all_categories: {
        type: Array,
        default: () => []
    },
    users: {
        type: Array,
        default: () => []
    },
    stand: {
        type: Object,
        default: null
    },
    dana_contact: {
        type: Object,
        default: null
    },
    notif: {
        type: Object,
        default: null
    },
    errors: {
        type: Object,
        default: () => ({})
    },
});

// Reactive wrappers (avoid null property access & keep reactivity)
const stand = computed(() => props.stand || {});
const income_list = computed(() => props.income_list || []);
const expense_list = computed(() => props.expense_list || []);
const menu_category = computed(() => props.menu_category || {});
const food_tag_list = computed(() => props.food_tag_list || []);
const users = computed(() => props.users || []);
const dana_contact = computed(() => props.dana_contact || null);
const notif = computed(() => props.notif || null);
const errors = computed(() => props.errors || {});

// Safe label accessor for v-select options that may be null
function safeNameLabel(option) {
    if (option == null) return '';
    if (typeof option === 'string') return option;
    if (typeof option === 'object') return option.name || option.label || '';
    return '';
}

const auth_user = usePage().props.auth.user;
const title = ref(stand.value?.name || 'Stand Detail');
const modalConfirmationRef = ref(null);
const modalAlertNotificationRef = ref(null);
const toastNotifRef = ref(null);
const receiptContentRef = ref(null); // legacy ref (modal content)
const incomeReceiptRef = ref(null); // new dedicated receipt component ref
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
const modalExpenseReceipt = ref(null);
const stand_status = computed(() => {
    if (!props.stand) return "Loading...";
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
const next_tab = ref(0);
const prev_tab = ref(0);

// Sync selected items with updated props when server data changes
watch(() => props.stand, (newStand) => {
    if (!newStand) return;
    
    // Sync selected_expense if it's currently open
    if (selected_expense.value) {
        const updated = (newStand.expense || []).find(e => e.id === selected_expense.value.id);
        if (updated) selected_expense.value = updated;
    }
    
    // Sync selected_menu if it's currently open
    if (selected_menu.value) {
        const updated = (newStand.menu || []).find(m => m.id === selected_menu.value.id);
        if (updated) selected_menu.value = updated;
    }
}, { deep: true });
const selected_expense = ref(null);
// Safe accessor for selected expense
const getSelectedExpense = computed(() => selected_expense.value || null);
const selected_income = ref(null);
// Tambahkan computed aman untuk income
const selectedIncome = computed(() => selected_income.value || null);
const selected_stock = ref(null);
const selected_menu = ref(null);
// Include super admin override for cashier & production privileges
const is_cashier = computed(() => {
    if (auth_user?.roles_id == 99) return true;
    return props.stand?.cashier?.some((cashier) => cashier.id == auth_user.id) || false;
});
const is_production = computed(() => {
    if (auth_user?.roles_id == 99) return true;
    return props.stand?.production?.some(
        (production) => production.id == auth_user.id
    ) || false;
});
const food_tags = computed(() => props.food_tag_list || []);
const category_options = computed(() => props.all_categories || []);

const shop_status = computed(() => {
    if (!props.stand) return "close";
    if (props.stand.menu_lock > 0 && !(props.stand.sale_validation > 0)) {
        switch (props.stand.type) {
            case 0:
                return new Date().setHours(0, 0, 0, 0) ==
                    new Date(props.stand.date).setHours(0, 0, 0, 0)
                    ? "open"
                    : "close";
            case 1:
                return new Date().setHours(0, 0, 0, 0) <
                    new Date(props.stand.date).setHours(0, 0, 0, 0)
                    ? "open"
                    : "close";
            case 2:
                return new Date().setHours(0, 0, 0, 0) <=
                    new Date(props.stand.date).setHours(0, 0, 0, 0)
                    ? "open"
                    : "close";
            default:
                return "close";
        }
    }
    return "close";
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

const form_edit_menu = useForm({
    id: null,
    name: null,
    category: null,
    price: null,
    food_tag: [],
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
    staff_list: props.stand?.production || [],
});

const form_cashier_staff = useForm({
    staff_list: props.stand?.cashier || [],
});

const form_edit_menu_image = useForm({
    image: null,
});

// Attach recipe (ingredients) form
const form_attach_recipe = useForm({
    components: [] // { stand_expense_id, quantity_used }
});
const modalAttachRecipe = ref(null);
const modalWorkflowGuide = ref(null);

function showWorkflowGuideModal(is_show) {
    if (modalWorkflowGuide.value == null) {
        const modal = document.getElementById("workflowGuideModal");
        modalWorkflowGuide.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalWorkflowGuide.value.show();
    } else {
        modalWorkflowGuide.value.hide();
    }
}

function showAttachRecipeModal(is_show, item = null) {
    if (modalAttachRecipe.value == null) {
        const modal = document.getElementById('attachRecipeModal');
        if (modal) {
            modalAttachRecipe.value = bootstrap.Modal.getOrCreateInstance(modal);
        }
    }
    
    if (is_show) {
        if (item) selected_menu.value = item;
        
        if (selected_menu.value && modalAttachRecipe.value) {
            form_attach_recipe.id = selected_menu.value.id;
            // Map validated expenses and merge existing recipe data
            // CRITICAL: Must use .value for computed property
            form_attach_recipe.components = (expense_list.value || [])
                .filter(e => e.operational_id && e.operational_id > 0)
                .map(e => {
                    const existing = selected_menu.value.recipe_components?.find(rc => rc.stand_expense_id === e.id);
                    return { 
                        stand_expense_id: e.id, 
                        name: e.name, 
                        unit: e.unit, 
                        price: e.price, 
                        qty: e.qty, 
                        total_price: e.total_price, 
                        quantity_used: existing ? existing.quantity_used : 0 
                    };
                });
            modalAttachRecipe.value.show();
        }
    } else {
        modalAttachRecipe.value?.hide();
    }
}

function handleAttachRecipe() {
    if (!selected_menu.value?.id) return;
    // Filter only components with quantity_used > 0
    const payload = form_attach_recipe.components
        .filter(c => c.quantity_used && c.quantity_used > 0)
        .map(c => ({ stand_expense_id: c.stand_expense_id, quantity_used: c.quantity_used }));
    if (payload.length === 0) {
        toastNotifRef.value.showToast('warning', 'Please input at least one ingredient quantity');
        return;
    }
    useForm({ components: payload }).post(`/seeo/staff/food/stand/menu/recipe/store/${selected_menu.value.id}`, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            showAttachRecipeModal(false);
            toastNotifRef.value.showToast('info', 'Ingredients saved');
        },
        onError: (e) => {
            for (let key in e) {
                toastNotifRef.value.showToast('warning', e[key]);
            }
        }
    });
}

// Edit stand form (was missing, causing render warnings)
const form_edit_stand = useForm({
    name: props.stand?.name || null,
    pic_id: props.stand?.pic_id || null,
    place: props.stand?.place || null,
    date: props.stand?.date || null,
    type: props.stand?.type || null,
});

// Normalized receipt file (handles both reciept/receipt misspellings)
const expenseReceiptFile = computed(() => {
    const item = selected_expense.value;
    if (!item) return null;
    return item.reciept || item.receipt || null;
});

// Build expense receipt URL depending on environment
const expenseReceiptUrl = computed(() => {
    const file = expenseReceiptFile.value;
    if (!file) return null;
    let built = null;
    // Attempt global Ziggy route helper first
    try {
        if (typeof route === 'function') {
            built = `/seeo/staff/food/stand/expense/receipt/${encodeURIComponent(file)}`;
        }
    } catch (e) {
        console.warn('[StandDetail] Failed building receipt route via Ziggy', e);
    }
    // If helper failed or returned just the name, fallback to manual path
    if (!built || !/\/seeo\/staff\/food\/stand\/expense\/receipt\//.test(built)) {
        built = `/seeo/staff/food/stand/expense/receipt/${encodeURIComponent(file)}`;
    }
    return built;
});

// Prefetch / cache (in-memory) a limited number of receipt images for instant modal display
// Using object URLs stored in a Map; revoke on unmount to avoid leaks
const receiptBlobCache = new Map(); // filename => objectURL
const MAX_PREFETCH = 5; // limit to avoid excessive bandwidth usage

function buildReceiptUrlForFile(filename) {
    if (!filename) return null;
    let built = null;
    try {
        if (typeof route === 'function') {
            built = `/seeo/staff/food/stand/expense/receipt/${encodeURIComponent(filename)}`;
        }
    } catch (_) { }
    if (!built || !/\/seeo\/staff\/food\/stand\/expense\/receipt\//.test(built)) {
        built = `/seeo/staff/food/stand/expense/receipt/${encodeURIComponent(filename)}`;
    }
    return built;
}

function prefetchExpenseReceipts(limit = MAX_PREFETCH) {
    if (!Array.isArray(expense_list) || expense_list.length === 0) return;
    let count = 0;
    for (const exp of expense_list) {
        if (count >= limit) break;
        const fname = exp?.reciept || exp?.receipt;
        if (!fname) continue;
        if (receiptBlobCache.has(fname)) continue; // already cached
        const url = buildReceiptUrlForFile(fname);
        if (!url) continue;
        fetch(url)
            .then(r => (r.ok ? r.blob() : Promise.reject(r.status)))
            .then(blob => {
                const objUrl = URL.createObjectURL(blob);
                receiptBlobCache.set(fname, objUrl);
                console.debug('[StandDetail] Prefetched receipt', fname);
            })
            .catch(err => console.debug('[StandDetail] Prefetch failed', fname, err));
        count++;
    }
}

// Computed src that prefers cached object URL if available
const expenseReceiptSrc = computed(() => {
    const file = expenseReceiptFile.value;
    if (!file) return null;
    if (receiptBlobCache.has(file)) {
        return receiptBlobCache.get(file);
    }
    return expenseReceiptUrl.value; // fallback to normal route URL
});

// Loading & error states for expense receipt image
const expenseReceiptLoading = ref(false);
const expenseReceiptError = ref(null);

// Watch the actual displayed src (could be cached blob or remote URL)
watch(expenseReceiptSrc, (newUrl) => {
    if (newUrl) {
        expenseReceiptLoading.value = true;
        expenseReceiptError.value = null;
        console.debug('[StandDetail] Loading expense receipt', newUrl);
    } else {
        expenseReceiptLoading.value = false;
        expenseReceiptError.value = null;
    }
});

function onExpenseReceiptLoad(e) {
    expenseReceiptLoading.value = false;
    expenseReceiptError.value = null;
    console.debug('[StandDetail] Expense receipt loaded', expenseReceiptUrl.value, {
        naturalWidth: e?.target?.naturalWidth,
        naturalHeight: e?.target?.naturalHeight
    });
}

function onExpenseReceiptError(e) {
    expenseReceiptLoading.value = false;
    expenseReceiptError.value = 'Failed to load receipt image.';
    if (e?.target) {
        e.target.style.display = 'none';
    }
    console.warn('[StandDetail] Failed load receipt', expenseReceiptUrl.value);
}

// Download & share helpers for expense receipt
function downloadExpenseReceipt() {
    if (!expenseReceiptUrl.value || !expenseReceiptFile.value) return;
    // Force fetch to blob then download for reliability (auth protected route)
    fetch(expenseReceiptUrl.value)
        .then(r => r.ok ? r.blob() : Promise.reject('HTTP ' + r.status))
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = expenseReceiptFile.value;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(link.href), 1000);
            toastNotifRef?.value?.showToast('info', 'Receipt downloaded');
        })
        .catch(err => {
            console.warn('[StandDetail] Failed download receipt', err);
            toastNotifRef?.value?.showToast('warning', 'Failed to download receipt');
        });
}

function copyExpenseReceiptLink() {
    if (!expenseReceiptUrl.value) return;
    navigator.clipboard.writeText(window.location.origin + expenseReceiptUrl.value)
        .then(() => {
            toastNotifRef?.value?.showToast('info', 'Receipt link copied');
        })
        .catch(() => {
            toastNotifRef?.value?.showToast('warning', 'Failed to copy link');
        });
}

function shareExpenseReceiptWhatsApp() {
    if (!expenseReceiptUrl.value) return;
    const link = window.location.origin + expenseReceiptUrl.value;
    const message = encodeURIComponent(['Expense Receipt', stand?.name ? ('Stand: ' + (stand?.name || '')) : '', 'Item: ' + (selected_expense.value?.name || ''), link].filter(Boolean).join('\n'));
    window.open('https://wa.me/?text=' + message, '_blank');
}

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
    is_show ? modalAddMenu.value.show() : modalAddMenu.value.hide();
}

const modalEditMenu = ref(null);
function showEditMenuModal(is_show, item = null) {
    if (modalEditMenu.value == null) {
        const modal = document.getElementById("editMenuModal");
        modalEditMenu.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        if (item) {
            selected_menu.value = item;
            form_edit_menu.id = item.id;
            form_edit_menu.name = item.name;
            form_edit_menu.category = item.category;
            form_edit_menu.price = item.price;
            form_edit_menu.food_tag = item.tags ? item.tags.map(t => t.id) : [];
        }
        modalEditMenu.value.show();
    } else {
        modalEditMenu.value.hide();
    }
}

function showAddStockModal(is_show, item = null) {
    if (modalAddStock.value == null) {
        const modal = document.getElementById("addStockModal");
        modalAddStock.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        if (item) selected_stock.value = item;
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

function showExpenseReceiptModal(is_show) {
    if (modalExpenseReceipt.value == null) {
        const modal = document.getElementById("receiptModal");
        modalExpenseReceipt.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        modalExpenseReceipt.value.show();
    } else {
        modalExpenseReceipt.value.hide();
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

function showEditMenuImageModal(is_show, item = null) {
    if (modalEditMenuImage.value == null) {
        const modal = document.getElementById("editMenuImageModal");
        modalEditMenuImage.value = bootstrap.Modal.getOrCreateInstance(modal);
    }
    if (is_show) {
        if (item) selected_menu.value = item;
        modalEditMenuImage.value.show();
    } else {
        modalEditMenuImage.value.hide();
    }
}

function handleEditStand() {
    if (!props.stand?.id) return;
    form_edit_stand.post(`/seeo/staff/food/stand/update/${props.stand.id}`, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            showEditStandModal(false);
            form_edit_stand.reset();
            toastNotifRef.value.showToast("info", "Stand updated successfully");
        },
    });
}

function handleAddMenu() {
    if (!props.stand?.id) return;
    form_add_menu.post(`/seeo/staff/food/stand/menu/add/${props.stand.id}`, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            showAddMenuModal(false);
            form_add_menu.reset();
            toastNotifRef.value.showToast("info", "Menu added successfully");
        },
        onError: (e) => {
            for (let key in e) {
                toastNotifRef.value.showToast("warning", e[key]);
            }
        },
    });
}

function handleEditMenuImage() {
    if (!selected_menu.value?.id) return;
    form_edit_menu_image.post(
        `/seeo/staff/food/stand/menu/image/update/${selected_menu.value.id}`,
        {
            preserveScroll: true,
            preserveState: false,
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

function handleEditMenu() {
    if (!form_edit_menu.id) return;
    form_edit_menu.post(`/seeo/staff/food/stand/menu/update/${form_edit_menu.id}`, {
        preserveScroll: true,
        preserveState: false,
        onSuccess: () => {
            showEditMenuModal(false);
            form_edit_menu.reset();
        },
    });
}
function handleAddStock() {
    if (!props.stand?.id) return;
    form_add_stock.id = selected_stock.value?.id;
    form_add_stock.post(`/seeo/staff/food/stand/menu/stock/update`, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            showAddStockModal(false);
            form_add_stock.reset();
            toastNotifRef.value.showToast("info", "Stock updated successfully");
        },
        onError: (e) => {
            for (let key in e) {
                toastNotifRef.value.showToast("warning", e[key]);
            }
        },
    });
}

function handleAddExpense() {
    if (!props.stand?.id) return;
    form_add_expense.post(`/seeo/staff/food/stand/expense/add/${props.stand.id}`, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            showAddExpenseModal(false);
            form_add_expense.reset();
            toastNotifRef.value.showToast("info", "Expense added successfully");
            // Force reload to be 100% sure props are fresh
            router.reload({ only: ['stand'] });
        },
        onError: (e) => {
            for (let key in e) {
                toastNotifRef.value.showToast("warning", e[key]);
            }
        },
    });
}

// Selection helpers with defensive ref checks
function selectExpense(item) {
    if (!selected_expense) {
        console.error('[StandDetail] selected_expense ref missing');
        return;
    }
    selected_expense.value = item;
    console.debug('[StandDetail] Expense selected:', {
        id: item?.id,
        name: item?.name,
        reciept: item?.reciept
    });
    // Initialize loading state for receipt image when selecting an expense
    const file = item?.reciept || item?.receipt;
    // If already prefetched we can skip showing spinner
    if (file && receiptBlobCache.has(file)) {
        expenseReceiptLoading.value = false;
    } else {
        expenseReceiptLoading.value = !!file;
        // Opportunistic single prefetch if not done yet
        if (file && !receiptBlobCache.has(file)) {
            const url = buildReceiptUrlForFile(file);
            if (url) {
                fetch(url)
                    .then(r => (r.ok ? r.blob() : Promise.reject(r.status)))
                    .then(blob => {
                        const objUrl = URL.createObjectURL(blob);
                        receiptBlobCache.set(file, objUrl);
                        console.debug('[StandDetail] On-demand prefetched receipt', file);
                        // Trigger reactivity manually by toggling loading if still open
                        expenseReceiptLoading.value = false;
                    })
                    .catch(err => console.debug('[StandDetail] On-demand prefetch failed', file, err));
            }
        }
    }
    expenseReceiptError.value = null;
    showExpenseReceiptModal(true);
}

function selectIncome(item) {
    if (!selected_income) {
        console.error('[StandDetail] selected_income ref missing');
        return;
    }
    selected_income.value = item;
    console.debug('[StandDetail] Income selected:', {
        id: item?.id,
        customer: item?.customer?.name,
        order_count: item?.order?.length
    });
    showIncomeDetailModal(true);
}

function handleDeleteStand() {
    if (!props.stand?.id) return;
    form_delete_stand.post(`/seeo/staff/food/stand/delete/${props.stand.id}`, {
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
    form_filter_expense.post(`/seeo/staff/food/stand/expense/filter`);
}

function handleFilterIncome() {
    form_filter_income.post(`/seeo/staff/food/stand/sales/filter`);
}

function handleFileAddExpenseReceipt(event) {
    form_add_expense.reciept = event.target.files[0];
}

function handleSetProductionStaff() {
    if (!props.stand?.id) return;
    form_production_staff.post(
        `/seeo/staff/food/stand/production/${props.stand.id}`,
        {
            onSuccess: () => {
                form_production_staff.staff_list = props.stand?.production || [];
                showProductionStaffModal(false);
            },
        }
    );
}

function handleSetCashierStaff() {
    if (!props.stand?.id) return;
    form_cashier_staff.post(
        `/seeo/staff/food/stand/cashier/${props.stand.id}`,
        {
            onSuccess: () => {
                form_cashier_staff.staff_list = props.stand?.cashier || [];
                showCashierStaffModal(false);
            },
        }
    );
}

function handleSetDanaContact() {
    form_set_dana_contact.post(`/seeo/staff/shop/payment/dana/set`, {
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
    if (event && event.target) {
        event.target.style.opacity = '1';
    }
}

const downloadReceipt = async () => {
    if (!selected_income.value) return;
    const target = incomeReceiptRef.value || receiptContentRef.value;
    toastNotifRef.value.showToast("info", "Rendering receipt...");
    try {
        const canvas = await html2canvas(target, { scale: 2, backgroundColor: '#ffffff' });
        const date = new Date(selected_income.value.created_at);
        const dataUrl = canvas.toDataURL("image/png", 0.9);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `income_receipt_${props.stand?.id || 0}_${auth_user.id}_${format(date, 'HHmm')}.png`;
        link.click();
        toastNotifRef.value.showToast("info", "Receipt downloaded");
    } catch (e) {
        toastNotifRef.value.showToast("warning", "Failed to render receipt");
        console.warn('[StandDetail] html2canvas income receipt failed', e);
    }
};

const printReceipt = async () => {
    // Send to Whatsapp
    const customer_phone = selected_income.value?.customer?.phone;
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
    console.debug('[StandDetail] props snapshot:', {
        stand: props.stand,
        stand_exists: !!props.stand,
        stand_name: props.stand?.name,
        stand_pic: props.stand?.pic,
        income_list: props.income_list?.length,
        expense_list: props.expense_list?.length,
        menu_category_keys: Object.keys(props.menu_category || {}),
        all_props_keys: Object.keys(props)
    });
    
    // Warn if critical data is missing
    if (!props.stand) {
        console.warn('[StandDetail] Critical: props.stand is null/undefined');
    }
    if (props.stand && !props.stand.name) {
        console.warn('[StandDetail] Warning: props.stand.name is null/undefined');
    }
    if (props.stand && !props.stand.pic) {
        console.warn('[StandDetail] Warning: props.stand.pic is null/undefined');
    }
    
    // Debug refs initialization
    console.debug('[StandDetail] Refs initialized:', {
        selected_income_exists: !!selected_income,
        selected_expense_exists: !!selected_expense,
        selected_stock_exists: !!selected_stock,
        selected_menu_exists: !!selected_menu,
        selected_income_value: selected_income.value,
        selected_expense_value: selected_expense.value
    });
    
    window.addEventListener("resize", handleResize);

    // Prefetch a subset of expense receipt images for faster first modal open
    prefetchExpenseReceipts();
});
onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    // Revoke object URLs to release memory
    for (const url of receiptBlobCache.values()) {
        try { URL.revokeObjectURL(url); } catch (_) { }
    }
    receiptBlobCache.clear();
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
                :href="`/seeo/staff/blaterian/foods/stand`"
                class="bg-opacity-0 text-decoration-none text-primary-emphasis"
            >
                <span class="fw-light">{{ "Stand" }}</span>
            </a>
            <span class="ms-2">{{ "/" }}</span>
            {{ title }}
        </template>

        <div class="container me-lg-0 mx-auto mb-5" v-if="stand">
            <!-- Detail -->
            <div class="row gx-4 mt-4 mb-5">
                <div class="col-12">
                    <div class="card bg-white p-3">
                        <div class="d-flex border-bottom border-primary">
                            <span class="h5 text-primary-emphasis me-auto">
                                <i class="bi bi-shop me-2"></i>{{ "Stand " + (stand?.name || 'Unknown') }}
                            </span>
                            <div class="ms-auto d-flex gap-2">
                                <button
                                    @click="showWorkflowGuideModal(true)"
                                    class="btn btn-sm btn-outline-info border-0 py-0 mb-auto"
                                    title="Workflow Guide"
                                >
                                    <i class="bi bi-lightbulb-fill"></i>
                                </button>
                                <a
                                    v-if="auth_user.roles_id == 3 || auth_user.roles_id == 99"
                                    href="/seeo/staff/operating/panel"
                                    class="btn btn-sm btn-outline-primary border-0 py-0 mb-auto"
                                    title="Go to Operating Panel"
                                >
                                    <i class="bi bi-box-arrow-up-right"></i>
                                </a>
                                <button
                                    v-if="auth_user.roles_id == 99 || auth_user.id == stand?.pic_id"
                                    @click="() => { showEditStandModal(true); form_edit_stand.name = stand?.name || null; form_edit_stand.pic_id = stand?.pic_id || null; form_edit_stand.place = stand?.place || null; form_edit_stand.date = stand?.date || null; form_edit_stand.type = stand?.type || null; }"
                                    class="btn btn-sm btn-outline-secondary border-0 py-0 mb-auto"
                                >
                                    <span class="d-none d-lg-block">Edit</span>
                                    <i class="bi bi-pencil d-lg-none"></i>
                                </button>
                                <button
                                    v-if="auth_user.roles_id == 3 || auth_user.roles_id == 99"
                                    @click="showDeleteStandModal(true)"
                                    class="btn btn-sm btn-outline-danger border-0 py-0 mb-auto"
                                >
                                    <span class="d-none d-lg-block">Delete</span>
                                    <i class="bi bi-trash3 d-lg-none"></i>
                                </button>
                            </div>
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
                                        >{{ stand.pic?.name || 'Not Assigned' }}</span
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
                                        >{{ shop_status }}</span
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
                                        >{{ stand?.place || '-' }}</span
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
                                        >{{ stand?.date ? formatDateOnly(stand.date) : '-' }}</span
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
                                            )?.name || 'Unknown Type'
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
                                        >{{ formatIDR(stand?.profit || 0) }}</span
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
                                        >{{ formatIDR(stand?.income || 0) }}</span
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
                                        >{{ formatIDR(stand?.expense || 0) }}</span
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
                                            (stand_status !== 'Waiting for menu lock' && auth_user.roles_id != 99)
                                                ? stand_status == 'Active'
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
                                            v-if="auth_user.roles_id == 99 || auth_user.id == stand?.pic_id"
                                            @click="
                                                (stand_status == 'Waiting for menu lock' || auth_user.roles_id == 99)
                                                    ? showAddMenuModal(true)
                                                    : ''
                                            "
                                            :class="
                                                'btn btn-sm border-0 py-0 btn-outline-' +
                                                (stand_status !== 'Waiting for menu lock' && auth_user.roles_id != 99
                                                    ? 'secondary disabled'
                                                    : 'primary')
                                            "
                                            title="Add Menu"
                                        >
                                            <i class="bi bi-plus-lg"></i>
                                        </button>
                                        <a
                                            v-if="auth_user.roles_id == 10 || auth_user.roles_id == 99"
                                            href="/seeo/staff/sales-distribution"
                                            class="btn btn-sm border-0 py-0 btn-outline-primary ms-1"
                                            title="Go to Sales Distribution Panel"
                                        >
                                            <i class="bi bi-box-arrow-up-right"></i>
                                        </a>
                                    </div>
                                    <div
                                        class="border-start border-2 mt-1 mx-1"
                                        v-if="
                                            (auth_user.roles_id == 99 || auth_user.id == stand?.pic_id) &&
                                            (auth_user.roles_id == 3 || auth_user.roles_id == 99)
                                        "
                                    ></div>
                                    <div
                                        @click="
                                            (stand_status == 'Inactive' && auth_user.roles_id != 99)
                                                ? alertNotification(
                                                      'This stand is inactive. All feature are locked.'
                                                  )
                                                : ''
                                        "
                                    >
                                        <button
                                            v-if="auth_user.roles_id == 3 || auth_user.roles_id == 10 || auth_user.roles_id == 99"
                                            @click="
                                                menu_category
                                                    ? stand_status == 'Inactive'
                                                        ? ''
                                                        : confirmation(
                                                              `/seeo/staff/food/stand/menu/lock/${stand.id}`,
                                                              'Are you sure want to ' +
                                                                  (stand.menu_lock > 0 ? 'unlock' : 'lock') +
                                                                  ' the menu list of Stand ' +
                                                                  (stand?.name || '') +
                                                                  '?'
                                                          )
                                                    : alertNotification(
                                                          'Please create a menu'
                                                      )
                                            "
                                            :class="
                                                'btn btn-sm border-0 py-0 btn-outline-' +
                                                (stand_status == 'Inactive' && auth_user.roles_id != 99
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
                                        <div class="p-1">
                                            <div class="d-flex">
                                                <div class="border-2 border-primary-subtle rounded-3 overflow-hidden d-flex align-items-center justify-content-center bg-light" style="width: 85px; height: 85px; flex-shrink: 0;">
                                                    <img
                                                        :src="item.image ? '/storage/images/shop/foods/menu/' + item.image : '/storage/images/shop/foods/menu/default.png'"
                                                        alt="image"
                                                        class="img-fluid"
                                                        style="object-fit: cover; width: 100%; height: 100%; opacity: 0; transition: opacity 0.3s;"
                                                        @load="showImage"
                                                    />
                                                </div>
                                                <div class="ps-2" style="width: 80%">
                                                    <div class="scroll-x-hidden mb-1">
                                                        <span
                                                            class="text-primary-emphasis d-block"
                                                            :title="item?.name || ''"
                                                            >{{ item?.name || '' }}</span
                                                        >
                                                    </div>
                                                    <div class="mb-1">
                                                        <span class="text-secondary d-block"
                                                            >{{
                                                                (item.volume > 0
                                                                    ? item.volume + item.volume_unit + ' '
                                                                    : '') +
                                                                (item.volume > 0 || item.mass > 0 ? '- ' : '') +
                                                                (item.mass > 0
                                                                    ? item.mass + item.mass_unit + ' '
                                                                    : '')
                                                            }}</span
                                                        >
                                                        <span class="text-primary d-block">{{ formatIDR(item.price) }}</span>
                                                    </div>
                                                    <span class="rounded-3 text-dark px-1 text-nowrap d-block mb-2">
                                                        {{ '( ' }}
                                                        <span class="text-secondary" style="font-size: 0.8rem">{{ 'sold:' }}</span>
                                                        {{ item.sale + ' / ' }}
                                                        <span class="text-secondary" style="font-size: 0.8rem">{{ 'stock:' }}</span>
                                                        {{ item.stock + ' )' }}
                                                    </span>
                                                    <div class="mb-2">
                                                        <template v-if="Array.isArray(item.recipe_components) && item.recipe_components.length > 0">
                                                            <span class="badge bg-success-subtle text-success border border-success border-opacity-25 d-inline-flex align-items-center" style="font-size:0.65rem">
                                                                <i class="bi bi-check-all me-1"></i>{{ (item.recipe_components || []).length }} Ingredients
                                                                <span class="ms-1 border-start ps-1 border-success border-opacity-25">Modal: {{ formatIDR((item.recipe_components || []).reduce((acc, curr) => {
                                                                    const cost = parseFloat(curr.price > 0 ? curr.price : (curr.expense?.price ?? 0));
                                                                    return acc + (parseFloat(curr.quantity_used || 0) * cost);
                                                                }, 0)) }}</span>
                                                                <span class="ms-1 border-start ps-1 border-success border-opacity-25 text-primary">Untung: {{ formatIDR(parseFloat(item.price || 0) - (item.recipe_components || []).reduce((acc, curr) => {
                                                                    const cost = parseFloat(curr.price > 0 ? curr.price : (curr.expense?.price ?? 0));
                                                                    return acc + (parseFloat(curr.quantity_used || 0) * cost);
                                                                }, 0)) }}</span>
                                                            </span>
                                                        </template>
                                                        <template v-else>
                                                            <span class="badge bg-warning text-dark" style="font-size:0.65rem" title="Belum ada ingredient">
                                                                <i class="bi bi-exclamation-triangle me-1"></i>No Ingredients
                                                            </span>
                                                        </template>
                                                    </div>
                                                    <div class="d-flex mt-auto flex-wrap gap-1">
                                                        <div v-if="auth_user.roles_id == 99 || auth_user.roles_id == 10 || auth_user.roles_id == 3">
                                                            <button
                                                                @click="showEditMenuModal(true, item)"
                                                                class="btn btn-sm btn-outline-primary border-0 p-1"
                                                                title="Edit Details"
                                                            >
                                                                <i class="bi bi-pencil-square" style="font-size: 1.1rem;"></i>
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <button
                                                                @click="showEditMenuImageModal(true, item)"
                                                                class="btn btn-sm btn-outline-secondary border-0 p-1"
                                                                :disabled="stand.sale_validation > 0 && auth_user.roles_id != 99"
                                                                title="Update Image"
                                                            >
                                                                <i class="bi bi-image" style="font-size: 1.1rem;"></i>
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <button
                                                                @click="showAddStockModal(true, item)"
                                                                class="btn btn-sm btn-outline-secondary border-0 p-1"
                                                                :disabled="stand.sale_validation > 0 && auth_user.roles_id != 99"
                                                                title="Add Stock"
                                                            >
                                                                <i class="bi bi-box-seam" style="font-size: 1.1rem;"></i>
                                                            </button>
                                                        </div>
                                                        <div v-if="auth_user.roles_id == 99 || auth_user.roles_id == 10 || is_production">
                                                            <button
                                                                class="btn btn-sm btn-outline-success border-0 p-1"
                                                                @click="showAttachRecipeModal(true, item)"
                                                                :disabled="stand.sale_validation > 0 && auth_user.roles_id != 99"
                                                                title="Set Ingredients"
                                                            >
                                                                <i class="bi bi-clipboard-plus" style="font-size: 1.1rem;"></i>
                                                            </button>
                                                        </div>
                                                        <div v-if="auth_user.roles_id == 99 || auth_user.id == stand?.pic_id">
                                                            <button
                                                                class="btn btn-sm btn-outline-danger border-0 p-1"
                                                                @click="confirmation(`/seeo/staff/food/stand/menu/delete/${item.id}`, 'Remove ' + item.name + '?')"
                                                                :disabled="((stand?.menu_lock || 0) > 0 || (stand?.sale_validation || 0) > 0) && auth_user.roles_id != 99"
                                                                title="Delete Menu"
                                                            >
                                                                <i class="bi bi-trash3" style="font-size: 1.1rem;"></i>
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
                                            auth_user.roles_id == 99 || stand.production.some(
                                                (staff) => staff.id == auth_user.id
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
                                        title="Add Expense"
                                    >
                                        <i class="bi bi-plus-lg"></i>
                                    </button>
                                    <button
                                        @click="
                                            (stand_status == 'Inactive' && auth_user.roles_id != 99)
                                                ? ''
                                                : showProductionStaffModal(true)
                                        "
                                        :class="
                                            'btn btn-sm border-0 py-0 btn-outline-' +
                                            (stand_status == 'Inactive' && auth_user.roles_id != 99
                                                ? 'secondary disabled '
                                                : 'primary')
                                        "
                                        title="Production Staff"
                                    >
                                        <i class="bi bi-people"></i>
                                    </button>
                                    <a
                                        v-if="auth_user.roles_id == 3 || auth_user.roles_id == 99"
                                        href="/seeo/staff/operating/panel"
                                        class="btn btn-sm border-0 py-0 btn-outline-primary ms-1"
                                        title="Go to Operating Panel"
                                    >
                                        <i class="bi bi-box-arrow-up-right"></i>
                                    </a>
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
                                        <div class="d-block">
                                            <div class="scroll-x-hidden mb-1">
                                                <span class="text-dark d-block" :title="item?.name || ''">{{ item?.name || '' }}</span>
                                                <span class="rounded-3 text-primary-emphasis px-1" style="font-size:0.75rem">{{ '( ' + item.qty + ' )' }}</span>
                                            </div>
                                            <div class="mb-1">
                                                <span class="text-secondary d-block">{{ '- ' + formatIDR(item.price) + '/' + item.unit }}</span>
                                                <span class="text-primary d-block">{{ formatIDR(item.total_price) }}</span>
                                            </div>
                                            <div class="d-flex gap-2">
                                                <button
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#receiptModal"
                                                    :class="'btn btn-sm border-0 btn-outline-secondary d-flex'"
                                                    @click="selectExpense(item)"
                                                >
                                                    <i
                                                        class="bi bi-exclamation text-danger"
                                                        v-if="item.operational_id == 0 || item.operational_id == null"
                                                    ></i>
                                                    <i class="bi bi-receipt"></i>
                                                </button>
                                                <button
                                                    :class="
                                                        'btn btn-sm border-0 ' +
                                                        ((stand?.sale_validation || 0) > 0 ? 'text-body-tertiary' : 'btn-outline-secondary')
                                                    "
                                                    v-if="is_production"
                                                    @click="() => {
                                                        if ((stand?.sale_validation || 0) > 0) {
                                                            alertNotification('This stand is inactive. All feature are disabled.');
                                                        } else {
                                                            confirmation(
                                                                `/seeo/staff/food/stand/expense/delete/${item.id}`,
                                                                'Are you sure want to delete ' + (item?.name || '') + ' from Stand ' + (stand?.name || '') + '?'
                                                            );
                                                        }
                                                    }"
                                                >
                                                    <i class="bi bi-trash3"></i>
                                                </button>
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
                        (next_tab > 1 || prev_tab > 1 ? 'ltr' : 'rtl')
                    "
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
                                    <i class="bi bi-graph-up me-2 d-none d-lg-inline"></i>{{ "Income" }}
                                </span>
                                <div class="ms-auto me-2 d-flex gap-1">
                                    <!-- Validate Stand Button for Super Admin & Operating -->
                                    <button
                                        v-if="(auth_user.roles_id == 99 || auth_user.roles_id == 3) && stand.sale_validation == 0"
                                        @click="confirmation(`/seeo/staff/food/stand/sales/validate/${stand.id}`, 'Finalize and validate all sales for this stand?')"
                                        class="btn btn-sm btn-success border-0 py-0"
                                        title="Validate Stand Sales"
                                    >
                                        <i class="bi bi-check-all"></i>
                                    </button>

                                    <button
                                        v-if="auth_user.roles_id == 99 || auth_user.id == stand?.pic_id"
                                        @click="
                                            (stand_status == 'Inactive' && auth_user.roles_id != 99)
                                                ? ''
                                                : showCashierStaffModal(true)
                                        "
                                        :class="
                                            'btn btn-sm border-0 py-0 btn-outline-' +
                                            (stand_status == 'Inactive' && auth_user.roles_id != 99
                                                ? 'secondary disabled'
                                                : 'primary')
                                        "
                                        title="Cashier Staff"
                                    >
                                        <i class="bi bi-person-badge"></i>
                                    </button>

                                    <!-- Open Cashier Panel Button -->
                                    <a
                                        v-if="auth_user.roles_id == 99 || auth_user.id == stand?.pic_id"
                                        :href="`/seeo/staff/blaterian/foods/cashier/${stand.id}`"
                                        class="btn btn-sm btn-outline-info border-0 py-0"
                                        title="Open Cashier Panel"
                                    >
                                        <i class="bi bi-cart-plus"></i>
                                    </a>
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
                            <div
                                class="scroll-container-2 scroll-container-lg-2"
                            >
                                <ul class="list-group list-group-flush">
                                    <li
                                        class="list-group-item list-group-item-action px-2 py-1"
                                        v-for="item in income_list"
                                    >
                                        <div class="d-block">
                                            <div class="scroll-x-hidden mb-1">
                                                <span
                                                    class="text-dark d-block"
                                                    :title="item.customer?.name"
                                                    >{{ item.customer?.name ?? 'Unregistered' }}</span>
                                                <span class="text-secondary d-block" style="font-size:0.75rem">{{ formatTime(item.created_at) }}</span>
                                            </div>
                                            <span class="text-primary d-block mb-1">{{ formatIDR(item.transaction) }}</span>
                                            <div class="d-flex">
                                                <button
                                                    class="btn btn-sm btn-outline-secondary border-0 ms-auto"
                                                    @click="selectIncome(item)"
                                                >
                                                    <i class="bi bi-eye"></i>
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
        </div>
        
        <!-- Loading State -->
        <div v-else class="container me-lg-0 mx-auto mb-5">
            <div class="row gx-4 mt-4 mb-5">
                <div class="col-12">
                    <div class="card bg-white p-3">
                        <div class="d-flex justify-content-center align-items-center" style="height: 200px;">
                            <div class="text-center">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <p class="mt-2 text-muted">Loading stand data...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StaffLayout>

    <!-- Edit Stand Modal -->
    <div
        class="modal fade"
        id="editStandModal"
        tabindex="-1"
        aria-labelledby="editStandModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editStandModalLabel">
                        {{ "Edit Stand" }}
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <form v-if="form_edit_stand" @submit.prevent="handleEditStand">
                        <div class="mb-3">
                            <label
                                for="editStandName"
                                class="form-label fw-medium"
                            >
                                {{ "Stand Name" }}
                            </label>
                            <input
                                :value="form_edit_stand.name"
                                @input="form_edit_stand.name = $event.target.value"
                                type="text"
                                class="form-control form-control-sm"
                                id="editStandName"
                                required
                            />
                            <InputError
                                :message="errors.name"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="mb-3">
                            <label
                                for="editStandPIC"
                                class="form-label fw-medium"
                            >
                                {{ "Person In Charge" }}
                            </label>
                            <v-select
                                v-if="form_edit_stand"
                                v-model="form_edit_stand.pic_id"
                                :options="users"
                                :reduce="user => user?.id"
                                :getOptionLabel="safeNameLabel"
                                label="name"
                                id="editStandPIC"
                                class="basic-single"
                                :class="{
                                    'is-invalid': errors.pic_id,
                                }"
                                placeholder="Select PIC"
                                :disabled="
                                    auth_user.roles_id == 3 || auth_user.roles_id == 99 ||
                                    stand_status !== 'Waiting for menu lock'
                                "
                            />
                            <InputError
                                :message="errors.pic_id"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="mb-3">
                            <label
                                for="editStandPlace"
                                class="form-label fw-medium"
                            >
                                {{ "Place" }}
                            </label>
                            <input
                                :value="form_edit_stand.place"
                                @input="form_edit_stand.place = $event.target.value"
                                type="text"
                                class="form-control form-control-sm"
                                id="editStandPlace"
                                required
                            />
                            <InputError
                                :message="errors.place"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="mb-3">
                            <label
                                for="editStandDate"
                                class="form-label fw-medium"
                            >
                                {{ "Date" }}
                            </label>
                            <input
                                :value="form_edit_stand.date"
                                @input="form_edit_stand.date = $event.target.value"
                                type="date"
                                class="form-control form-control-sm"
                                id="editStandDate"
                                required
                            />
                            <InputError
                                :message="errors.date"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="mb-4">
                            <label
                                for="editStandType"
                                class="form-label fw-medium"
                            >
                                {{ "Type" }}
                            </label>
                            <select
                                v-if="form_edit_stand"
                                v-model="form_edit_stand.type"
                                class="form-select form-select-sm"
                                id="editStandType"
                                required
                            >
                                <option
                                    v-for="type in stand_type"
                                    :key="type.value"
                                    :value="type.value"
                                >
                                    {{ type.name }}
                                </option>
                            </select>
                            <InputError
                                :message="errors.type"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button
                                type="button"
                                class="btn btn-secondary btn-sm me-2"
                                data-bs-dismiss="modal"
                            >
                                {{ "Close" }}
                            </button>
                            <button
                                type="submit"
                                class="btn btn-primary btn-sm"
                            >
                                {{ "Save Changes" }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Delete Stand Modal -->
    <div
        class="modal fade"
        id="deleteStandModal"
        tabindex="-1"
        aria-labelledby="deleteStandModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteStandModalLabel">
                        {{ "Delete Stand" }}
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <p class="mb-0">
                        {{ "Are you sure you want to delete this stand?" }}
                    </p>
                    <p class="text-danger" style="font-size: 0.9rem">
                        {{ "This action cannot be undone." }}
                    </p>
                    <form @submit.prevent="handleDeleteStand">
                        <div class="mb-3">
                            <label
                                for="deleteStandPassword"
                                class="form-label fw-medium"
                            >
                                {{ "Confirm with Password" }}
                            </label>
                            <input
                                v-model="form_delete_stand.password"
                                type="password"
                                class="form-control form-control-sm"
                                id="deleteStandPassword"
                                required
                            />
                            <InputError
                                :message="errors.password"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button
                                type="button"
                                class="btn btn-secondary btn-sm me-2"
                                data-bs-dismiss="modal"
                            >
                                {{ "Close" }}
                            </button>
                            <button
                                type="submit"
                                class="btn btn-danger btn-sm"
                            >
                                {{ "Delete Stand" }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Attach Recipe Modal -->
    <div class="modal fade" id="attachRecipeModal" tabindex="-1" aria-labelledby="attachRecipeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="attachRecipeModalLabel">Set Ingredients for {{ selected_menu?.name || 'Menu' }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="text-secondary" style="font-size:0.8rem">Input penggunaan bahan per 1 porsi menu. Hanya bahan yang sudah tervalidasi (operational) ditampilkan.</p>
                    <div v-if="form_attach_recipe.components.length > 0" class="table-responsive" style="max-height:50vh;">
                        <table class="table table-sm align-middle">
                            <thead class="table-light" style="position:sticky; top:0;">
                                <tr>
                                    <th style="width:25%">Ingredient</th>
                                    <th style="width:15%">Unit</th>
                                    <th style="width:15%">Purchase Cost/Unit</th>
                                    <th style="width:15%">Qty Purchase</th>
                                    <th style="width:15%">Used / Portion</th>
                                    <th style="width:15%">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="comp in form_attach_recipe.components" :key="comp.stand_expense_id">
                                    <td><span class="text-primary-emphasis d-block fw-medium" :title="comp.name">{{ comp.name }}</span></td>
                                    <td><span class="text-secondary small">{{ comp.unit }}</span></td>
                                    <td><span class="text-dark small">{{ formatIDR(comp.price) }}</span></td>
                                    <td><span class="text-secondary small">{{ comp.qty }}</span></td>
                                    <td>
                                        <div class="input-group input-group-sm">
                                            <input type="number" min="0" step="0.001" class="form-control" v-model.number="comp.quantity_used" />
                                            <span class="input-group-text">{{ comp.unit }}</span>
                                        </div>
                                    </td>
                                    <td class="text-end">
                                        <div class="small fw-bold text-primary">{{ formatIDR(Math.round(comp.quantity_used * comp.price)) }}</div>
                                        <button class="btn btn-sm btn-link text-danger p-0 border-0" @click="comp.quantity_used = 0" type="button" title="Clear">
                                            <i class="bi bi-trash-fill" style="font-size: 0.75rem;"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot class="table-light">
                                <tr>
                                    <td colspan="4" class="text-end fw-bold">Total Modal / Porsi:</td>
                                    <td colspan="2" class="text-end fw-bold text-danger">
                                        {{ formatIDR(form_attach_recipe.components.reduce((acc, curr) => acc + (curr.quantity_used * curr.price), 0)) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="text-end fw-bold">Harga Jual:</td>
                                    <td colspan="2" class="text-end fw-bold text-primary">
                                        {{ formatIDR(selected_menu?.price || 0) }}
                                    </td>
                                </tr>
                                <tr class="table-success border-top border-2 border-success border-opacity-25">
                                    <td colspan="4" class="text-end fw-bold">Estimasi Keuntungan / Porsi:</td>
                                    <td colspan="2" class="text-end fw-bold" :class="(selected_menu?.price || 0) - form_attach_recipe.components.reduce((acc, curr) => acc + (curr.quantity_used * curr.price), 0) >= 0 ? 'text-success' : 'text-danger'">
                                        {{ formatIDR((selected_menu?.price || 0) - form_attach_recipe.components.reduce((acc, curr) => acc + (curr.quantity_used * curr.price), 0)) }}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div v-else class="text-center py-3">
                        <span class="text-secondary">Tidak ada expense tervalidasi untuk dijadikan bahan.</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary btn-sm" @click="handleAttachRecipe" :disabled="!selected_menu">Save Ingredients</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Menu Modal -->
    <div class="modal fade" id="editMenuModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg">
                <div class="modal-header bg-primary text-white border-0">
                    <h5 class="modal-title fw-bold">Edit Menu Details</h5>
                    <button type="button" class="btn-close btn-close-white" @click="showEditMenuModal(false)"></button>
                </div>
                <form @submit.prevent="handleEditMenu">
                    <div class="modal-body p-4">
                        <div class="mb-3">
                            <label class="form-label fw-bold small text-muted">MENU NAME</label>
                            <input type="text" v-model="form_edit_menu.name" class="form-control" placeholder="e.g. Nasi Goreng Special" required />
                        </div>
                        <div class="row g-3 mb-3">
                            <div class="col-6">
                                <label class="form-label fw-bold small text-muted">PRICE (Rp)</label>
                                <input type="number" v-model="form_edit_menu.price" class="form-control" placeholder="0" required />
                            </div>
                            <div class="col-6">
                                <label class="form-label fw-bold small text-muted">CATEGORY</label>
                                <v-select
                                    v-model="form_edit_menu.category"
                                    :options="category_options"
                                    placeholder="Select Category"
                                    required
                                />
                            </div>
                        </div>
                        <div class="mb-0">
                            <label class="form-label fw-bold small text-muted">FOOD TAGS</label>
                            <v-select
                                v-model="form_edit_menu.food_tag"
                                :options="food_tags"
                                label="name"
                                :reduce="tag => tag.id"
                                multiple
                                placeholder="Select Tags"
                            />
                        </div>
                    </div>
                    <div class="modal-footer border-0 p-4 pt-0">
                        <button type="button" class="btn btn-light px-4" @click="showEditMenuModal(false)">Cancel</button>
                        <button type="submit" class="btn btn-primary px-4" :disabled="form_edit_menu.processing">
                            <span v-if="form_edit_menu.processing" class="spinner-border spinner-border-sm me-2"></span>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Add Menu Modal -->
    <div
        class="modal fade"
        id="addMenuModal"
        tabindex="-1"
        aria-labelledby="addMenuModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addMenuModalLabel">
                        {{ "Add Menu" }}
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="handleAddMenu">
                        <div class="mb-3">
                            <label
                                for="addMenuName"
                                class="form-label fw-medium"
                            >
                                {{ "Menu Name" }}
                            </label>
                            <input
                                v-model="form_add_menu.name"
                                type="text"
                                class="form-control form-control-sm"
                                id="addMenuName"
                                required
                            />
                            <InputError
                                :message="errors.name"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="mb-3">
                            <label
                                for="addMenuCategory"
                                class="form-label fw-medium"
                            >
                                {{ "Category" }}
                            </label>
                            <v-select
                                v-model="form_add_menu.category"
                                :options="[...new Set([...(all_categories || []), 'Main Course', 'Drink', 'Snack', 'Dessert'])]"
                                id="addMenuCategory"
                                class="basic-single"
                                :class="{
                                    'is-invalid': errors.category,
                                }"
                                placeholder="Select Category"
                                :disabled="
                                    auth_user.roles_id != 99 &&
                                    stand_status !== 'Waiting for menu lock'
                                "
                            />
                            <InputError
                                :message="errors.category"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="mb-3">
                            <label
                                for="addMenuFoodTag"
                                class="form-label fw-medium"
                            >
                                {{ "Food Tag" }}
                            </label>
                            <v-select
                                v-model="form_add_menu.food_tag"
                                :options="food_tag_list"
                                label="name"
                                :reduce="tag => tag.id"
                                id="addMenuFoodTag"
                                class="basic-single"
                                multiple
                                :class="{
                                    'is-invalid': errors.food_tag,
                                }"
                                placeholder="Select Food Tag"
                                :disabled="
                                    auth_user.roles_id != 99 &&
                                    stand_status !== 'Waiting for menu lock'
                                "
                            />
                            <InputError
                                :message="errors.food_tag"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="mb-3">
                            <label
                                for="addMenuPrice"
                                class="form-label fw-medium"
                            >
                                {{ "Price" }}
                            </label>
                            <input
                                v-model="form_add_menu.price"
                                type="number"
                                class="form-control form-control-sm"
                                id="addMenuPrice"
                                required
                            />
                            <InputError
                                :message="errors.price"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="mb-3">
                            <label
                                for="addMenuStock"
                                class="form-label fw-medium"
                            >
                                {{ "Stock" }}
                            </label>
                            <input
                                v-model="form_add_menu.stock"
                                type="number"
                                class="form-control form-control-sm"
                                id="addMenuStock"
                                required
                            />
                            <InputError
                                :message="errors.stock"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="mb-3">
                            <label
                                for="addMenuVolume"
                                class="form-label fw-medium"
                            >
                                {{ "Volume" }}
                            </label>
                            <div class="input-group">
                                <input
                                    v-model="form_add_menu.volume"
                                    type="number"
                                    class="form-control form-control-sm"
                                    id="addMenuVolume"
                                    required
                                />
                                <select
                                    v-model="form_add_menu.volume_unit"
                                    class="form-select form-select-sm"
                                    id="addMenuVolumeUnit"
                                    required
                                >
                                    <option value="">{{ "-- Select Unit --" }}</option>
                                    <option value="ml">ml</option>
                                    <option value="l">l</option>
                                    <option value="cc">cc</option>
                                    <option value="g">g</option>
                                    <option value="kg">kg</option>
                                </select>
                            </div>
                            <InputError
                                :message="errors.volume"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="mb-3">
                            <label
                                for="addMenuMass"
                                class="form-label fw-medium"
                            >
                                {{ "Mass" }}
                            </label>
                            <div class="input-group">
                                <input
                                    v-model="form_add_menu.mass"
                                    type="number"
                                    class="form-control form-control-sm"
                                    id="addMenuMass"
                                    required
                                />
                                <select
                                    v-model="form_add_menu.mass_unit"
                                    class="form-select form-select-sm"
                                    id="addMenuMassUnit"
                                    required
                                >
                                    <option value="">{{ "-- Select Unit --" }}</option>
                                    <option value="gr">gr</option>
                                    <option value="kg">kg</option>
                                </select>
                            </div>
                            <InputError
                                :message="errors.mass"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="mb-3">
                            <label
                                for="addMenuImage"
                                class="form-label fw-medium"
                            >
                                {{ "Image" }}
                            </label>
                            <input
                                ref="fileEditMenuImageRef"
                                @change="handleFileUploadMenuImage"
                                class="form-control form-control-sm"
                                type="file"
                                id="addMenuImage"
                                accept="image/*"
                            />
                            <InputError
                                :message="errors.image"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button
                                type="button"
                                class="btn btn-secondary btn-sm me-2"
                                data-bs-dismiss="modal"
                            >
                                {{ "Close" }}
                            </button>
                            <button
                                type="submit"
                                class="btn btn-primary btn-sm"
                            >
                                {{ "Add Menu" }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Stock Modal -->
    <div
        class="modal fade"
        id="addStockModal"
        tabindex="-1"
        aria-labelledby="addStockModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addStockModalLabel">
                        {{ "Add Stock" }}
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="handleAddStock">
                        <div class="mb-3">
                            <label
                                for="addStockItem"
                                class="form-label fw-medium"
                            >
                                {{ "Menu Item" }}
                            </label>
                            <input
                                :value="selected_stock?.name || ''"
                                type="text"
                                class="form-control bg-light"
                                id="addStockItem"
                                readonly
                                disabled
                            />
                        </div>
                        <div class="mb-3">
                            <label
                                for="addStockAmount"
                                class="form-label fw-medium"
                            >
                                {{ "Amount" }}
                            </label>
                            <input
                                v-model="form_add_stock.amount"
                                type="number"
                                class="form-control form-control-sm"
                                id="addStockAmount"
                                required
                            />
                            <InputError
                                :message="errors.amount"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button
                                type="button"
                                class="btn btn-secondary btn-sm me-2"
                                data-bs-dismiss="modal"
                            >
                                {{ "Close" }}
                            </button>
                            <button
                                type="submit"
                                class="btn btn-primary btn-sm"
                            >
                                {{ "Add Stock" }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Expense Modal -->
    <div
        class="modal fade"
        id="addExpenseModal"
        tabindex="-1"
        aria-labelledby="addExpenseModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addExpenseModalLabel">
                        {{ "Add Expense" }}
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="handleAddExpense">
                        <div class="mb-3">
                            <label
                                for="addExpenseName"
                                class="form-label fw-medium"
                            >
                                {{ "Expense Name" }}
                            </label>
                            <input
                                v-model="form_add_expense.name"
                                type="text"
                                class="form-control form-control-sm"
                                id="addExpenseName"
                                required
                            />
                            <InputError
                                :message="errors.name"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="mb-3">
                            <label
                                for="addExpensePrice"
                                class="form-label fw-medium"
                            >
                                {{ "Price" }}
                            </label>
                            <input
                                v-model="form_add_expense.price"
                                type="number"
                                class="form-control form-control-sm"
                                id="addExpensePrice"
                                required
                            />
                            <InputError
                                :message="errors.price"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="mb-3">
                            <label
                                for="addExpenseQty"
                                class="form-label fw-medium"
                            >
                                {{ "Quantity" }}
                            </label>
                            <input
                                v-model="form_add_expense.qty"
                                type="number"
                                class="form-control form-control-sm"
                                id="addExpenseQty"
                                required
                            />
                            <InputError
                                :message="errors.qty"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="mb-3">
                            <label
                                for="addExpenseUnit"
                                class="form-label fw-medium"
                            >
                                {{ "Unit" }}
                            </label>
                            <input
                                v-model="form_add_expense.unit"
                                type="text"
                                class="form-control form-control-sm"
                                id="addExpenseUnit"
                                required
                            />
                            <InputError
                                :message="errors.unit"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="mb-3">
                            <label
                                for="addExpenseReceipt"
                                class="form-label fw-medium"
                            >
                                {{ "Receipt" }}
                            </label>
                            <input
                                ref="fileAddExpenseReceipt"
                                @change="handleFileAddExpenseReceipt"
                                class="form-control form-control-sm"
                                type="file"
                                id="addExpenseReceipt"
                                accept="image/*"
                            />
                            <InputError
                                :message="errors.reciept"
                                class="mt-2"
                            ></InputError>
                        </div>
                        <div class="mb-3 form-check">
                            <input
                                v-model="form_add_expense.receipt_same"
                                type="checkbox"
                                class="form-check-input"
                                id="addExpenseReceiptSame"
                            />
                            <label
                                class="form-check-label"
                                for="addExpenseReceiptSame"
                            >
                                {{ "Use same receipt for all items" }}
                            </label>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button
                                type="button"
                                class="btn btn-secondary btn-sm me-2"
                                data-bs-dismiss="modal"
                            >
                                {{ "Close" }}
                            </button>
                            <button
                                type="submit"
                                class="btn btn-primary btn-sm"
                            >
                                {{ "Add Expense" }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Income Detail Modal (FIXED) -->
    <div
        class="modal fade"
        id="incomeDetailModal"
        tabindex="-1"
        aria-labelledby="incomeDetailModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content" ref="receiptContentRef">
                <div class="modal-header">
                    <h5 class="modal-title" id="incomeDetailModalLabel">
                        {{ "Income Detail" }}
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <div v-if="selectedIncome">
                        <IncomeReceiptTemplate :income="selectedIncome" :stand="stand" ref="incomeReceiptRef" />
                        <div class="mt-3 text-center">
                            <button class="btn btn-primary btn-sm me-2" @click="downloadReceipt">
                                <i class="bi bi-download"></i> {{ "Download" }}
                            </button>
                            <button class="btn btn-success btn-sm" @click="printReceipt">
                                <i class="bi bi-whatsapp"></i> {{ "Share / Whatsapp" }}
                            </button>
                        </div>
                    </div>
                    <div v-else class="text-center p-4">
                        <p class="text-muted mb-0">No income selected.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Expense Receipt Modal -->
    <div
        class="modal fade"
        id="receiptModal"
        tabindex="-1"
        aria-labelledby="receiptModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="receiptModalLabel">Expense Receipt</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div v-if="selected_expense">
                        <p class="mb-1 text-primary-emphasis fw-medium">{{ selected_expense?.name || '' }}</p>
                        <div class="small mb-2">
                            <div><span class="text-secondary">Qty:</span> {{ selected_expense.qty }}</div>
                            <div><span class="text-secondary">Unit Price:</span> {{ formatIDR(selected_expense.price) }}</div>
                            <div><span class="text-secondary">Total:</span> {{ formatIDR(selected_expense.total_price) }}</div>
                            <div class="mt-1">
                                <span v-if="selected_expense.operational_id && selected_expense.operational_id > 0" class="badge bg-success">
                                    <i class="bi bi-check-circle me-1"></i>Validated
                                </span>
                                <span v-else class="badge bg-warning text-dark">
                                    <i class="bi bi-clock me-1"></i>Pending Validation
                                </span>
                            </div>
                        </div>
                        <div v-if="expenseReceiptUrl" class="text-center">
                            <div v-if="expenseReceiptLoading" class="py-3">
                                <div class="spinner-border text-primary spinner-border-sm" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <div class="small text-muted mt-1">Loading receipt...</div>
                            </div>
                            <img
                                v-show="!expenseReceiptLoading && !expenseReceiptError"
                                :src="expenseReceiptSrc"
                                alt="Receipt"
                                class="img-fluid rounded border"
                                style="max-height:300px"
                                @load="onExpenseReceiptLoad"
                                @error="onExpenseReceiptError"
                            />
                            <div v-if="expenseReceiptError" class="small text-danger mt-2">{{ expenseReceiptError }}</div>
                            <div class="mt-3 d-flex flex-wrap gap-2 justify-content-center">
                                <button type="button" class="btn btn-sm btn-outline-primary" @click="downloadExpenseReceipt" :disabled="expenseReceiptLoading || expenseReceiptError">Download</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary" @click="copyExpenseReceiptLink" :disabled="expenseReceiptLoading || expenseReceiptError">Copy Link</button>
                                <button type="button" class="btn btn-sm btn-outline-success" @click="shareExpenseReceiptWhatsApp" :disabled="expenseReceiptLoading || expenseReceiptError">Share WA</button>
                                
                                <!-- Validation Button for Role 99 & 3 -->
                                <button 
                                    v-if="(auth_user.roles_id == 99 || auth_user.roles_id == 3) && !selected_expense.operational_id"
                                    type="button" 
                                    class="btn btn-sm btn-primary px-4 shadow-sm" 
                                    @click="confirmation(`/seeo/staff/food/stand/expense/validate/${selected_expense.id}`, 'Validate this expense?')"
                                >
                                    <i class="bi bi-check2-circle me-1"></i>Validate Expense
                                </button>
                            </div>
                        </div>
                        <div v-else class="text-center text-muted small">No receipt image.</div>
                    </div>
                    <div v-else class="text-center text-muted small">No expense selected.</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Workflow Guide Modal -->
    <div class="modal fade" id="workflowGuideModal" tabindex="-1" aria-labelledby="workflowGuideModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div class="modal-content border-0 shadow-lg">
                <div class="modal-header border-0" style="background-color:#412f55;">
                    <h5 class="modal-title fw-bold text-white" id="workflowGuideModalLabel">
                        <i class="bi bi-map me-2"></i>Stand Management — Panduan Lengkap
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body p-0">

                    <!-- Timeline header -->
                    <div class="px-4 pt-3 pb-2 bg-light border-bottom">
                        <p class="small text-muted mb-0">Ikuti urutan langkah berikut dari awal hingga stand siap berjualan dan ditutup. Setiap langkah memiliki peran yang bertanggung jawab.</p>
                    </div>

                    <!-- Steps -->
                    <div class="px-4 py-3">

                        <!-- STEP 1 -->
                        <div class="d-flex gap-3 mb-4">
                            <div class="d-flex flex-column align-items-center" style="min-width:36px;">
                                <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:36px;height:36px;background:#412f55;flex-shrink:0;">1</div>
                                <div style="width:2px;flex:1;background:#dee2e6;margin-top:4px;"></div>
                            </div>
                            <div class="pb-3" style="flex:1;">
                                <div class="d-flex align-items-center gap-2 mb-1">
                                    <h6 class="fw-bold mb-0">Buat Stand</h6>
                                    <span class="badge bg-primary" style="font-size:0.6rem;">Operating (3)</span>
                                    <span class="badge bg-dark" style="font-size:0.6rem;">Super Admin (99)</span>
                                </div>
                                <p class="small text-muted mb-2">Buat stand baru dari halaman <strong>Stand List</strong>. Isi nama, tempat, tanggal, tipe (Live / Pre-Order), dan tentukan PIC.</p>
                                <div class="bg-light rounded p-2 small">
                                    <i class="bi bi-info-circle text-primary me-1"></i>
                                    Setelah dibuat, stand berstatus <strong>"Waiting for menu lock"</strong> — semua fitur editing terbuka.
                                </div>
                            </div>
                        </div>

                        <!-- STEP 2 -->
                        <div class="d-flex gap-3 mb-4">
                            <div class="d-flex flex-column align-items-center" style="min-width:36px;">
                                <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:36px;height:36px;background:#412f55;flex-shrink:0;">2</div>
                                <div style="width:2px;flex:1;background:#dee2e6;margin-top:4px;"></div>
                            </div>
                            <div class="pb-3" style="flex:1;">
                                <div class="d-flex align-items-center gap-2 mb-1">
                                    <h6 class="fw-bold mb-0">Daftarkan Production Staff & Cashier</h6>
                                    <span class="badge bg-primary" style="font-size:0.6rem;">Operating (3)</span>
                                    <span class="badge" style="font-size:0.6rem;background:#412f55;">PIC Stand</span>
                                </div>
                                <p class="small text-muted mb-2">Klik ikon <i class="bi bi-people"></i> (Production Staff) dan <i class="bi bi-person-badge"></i> (Cashier) di tab Expense dan Income untuk mendaftarkan anggota tim.</p>
                                <div class="row g-2">
                                    <div class="col-6">
                                        <div class="border rounded p-2 small h-100">
                                            <i class="bi bi-people text-warning me-1"></i><strong>Production Staff</strong><br>
                                            <span class="text-muted">Bisa input expense & set resep menu.</span>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="border rounded p-2 small h-100">
                                            <i class="bi bi-person-badge text-info me-1"></i><strong>Cashier Staff</strong><br>
                                            <span class="text-muted">Bisa akses panel kasir & catat transaksi.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- STEP 3 -->
                        <div class="d-flex gap-3 mb-4">
                            <div class="d-flex flex-column align-items-center" style="min-width:36px;">
                                <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:36px;height:36px;background:#412f55;flex-shrink:0;">3</div>
                                <div style="width:2px;flex:1;background:#dee2e6;margin-top:4px;"></div>
                            </div>
                            <div class="pb-3" style="flex:1;">
                                <div class="d-flex align-items-center gap-2 mb-1">
                                    <h6 class="fw-bold mb-0">Input Expense (Belanja Bahan)</h6>
                                    <span class="badge bg-warning text-dark" style="font-size:0.6rem;">Production Staff</span>
                                </div>
                                <p class="small text-muted mb-2">Di tab <strong>Expense</strong>, klik <i class="bi bi-plus-lg"></i> untuk input setiap bahan yang dibeli. Isi nama, harga satuan, jumlah, satuan, dan foto nota.</p>
                                <div class="bg-warning bg-opacity-10 border border-warning border-opacity-25 rounded p-2 small">
                                    <i class="bi bi-exclamation-triangle text-warning me-1"></i>
                                    Expense yang belum divalidasi <strong>tidak bisa</strong> digunakan sebagai bahan resep.
                                </div>
                            </div>
                        </div>

                        <!-- STEP 4 -->
                        <div class="d-flex gap-3 mb-4">
                            <div class="d-flex flex-column align-items-center" style="min-width:36px;">
                                <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:36px;height:36px;background:#412f55;flex-shrink:0;">4</div>
                                <div style="width:2px;flex:1;background:#dee2e6;margin-top:4px;"></div>
                            </div>
                            <div class="pb-3" style="flex:1;">
                                <div class="d-flex align-items-center gap-2 mb-1">
                                    <h6 class="fw-bold mb-0">Validasi Expense</h6>
                                    <span class="badge bg-primary" style="font-size:0.6rem;">Operating (3)</span>
                                    <span class="badge bg-dark" style="font-size:0.6rem;">Super Admin (99)</span>
                                </div>
                                <p class="small text-muted mb-2">Klik ikon <i class="bi bi-receipt"></i> pada setiap expense, cek foto nota, lalu klik <strong>Validate Expense</strong>. Expense yang tervalidasi ditandai badge hijau <span class="badge bg-success" style="font-size:0.6rem;">Validated</span>.</p>
                                <div class="bg-light rounded p-2 small">
                                    <i class="bi bi-check-circle text-success me-1"></i>
                                    Setelah divalidasi, total expense stand otomatis terupdate.
                                </div>
                            </div>
                        </div>

                        <!-- STEP 5 -->
                        <div class="d-flex gap-3 mb-4">
                            <div class="d-flex flex-column align-items-center" style="min-width:36px;">
                                <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:36px;height:36px;background:#412f55;flex-shrink:0;">5</div>
                                <div style="width:2px;flex:1;background:#dee2e6;margin-top:4px;"></div>
                            </div>
                            <div class="pb-3" style="flex:1;">
                                <div class="d-flex align-items-center gap-2 mb-1">
                                    <h6 class="fw-bold mb-0">Tambah Menu & Set Resep</h6>
                                    <span class="badge bg-info text-dark" style="font-size:0.6rem;">Sales Distribution (10)</span>
                                    <span class="badge bg-warning text-dark" style="font-size:0.6rem;">Production Staff</span>
                                </div>
                                <p class="small text-muted mb-2">Di tab <strong>Menu</strong>, klik <i class="bi bi-plus-lg"></i> untuk tambah item menu (nama, kategori, harga, stok, foto). Lalu klik <i class="bi bi-clipboard-plus"></i> untuk set takaran bahan per porsi.</p>
                                <div class="row g-2">
                                    <div class="col-6">
                                        <div class="border rounded p-2 small h-100">
                                            <i class="bi bi-plus-circle text-primary me-1"></i><strong>Tambah Menu</strong><br>
                                            <span class="text-muted">Isi nama, harga, stok awal, foto (rasio 1:1).</span>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="border rounded p-2 small h-100">
                                            <i class="bi bi-clipboard-plus text-success me-1"></i><strong>Set Resep</strong><br>
                                            <span class="text-muted">Input qty bahan per porsi → modal & untung terhitung otomatis.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- STEP 6 -->
                        <div class="d-flex gap-3 mb-4">
                            <div class="d-flex flex-column align-items-center" style="min-width:36px;">
                                <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:36px;height:36px;background:#412f55;flex-shrink:0;">6</div>
                                <div style="width:2px;flex:1;background:#dee2e6;margin-top:4px;"></div>
                            </div>
                            <div class="pb-3" style="flex:1;">
                                <div class="d-flex align-items-center gap-2 mb-1">
                                    <h6 class="fw-bold mb-0">Menu Lock — Stand Siap Berjualan</h6>
                                    <span class="badge bg-primary" style="font-size:0.6rem;">Operating (3)</span>
                                    <span class="badge bg-dark" style="font-size:0.6rem;">Super Admin (99)</span>
                                </div>
                                <p class="small text-muted mb-2">Klik ikon <i class="bi bi-unlock"></i> (gembok) di tab Menu untuk mengunci daftar menu. Status stand berubah menjadi <strong class="text-success">Active</strong>.</p>
                                <div class="bg-success bg-opacity-10 border border-success border-opacity-25 rounded p-2 small">
                                    <i class="bi bi-lock-fill text-success me-1"></i>
                                    Setelah dikunci, menu tidak bisa diubah. Kasir bisa mulai mencatat transaksi via panel kasir <i class="bi bi-cart-plus"></i>.
                                </div>
                            </div>
                        </div>

                        <!-- STEP 7 -->
                        <div class="d-flex gap-3 mb-4">
                            <div class="d-flex flex-column align-items-center" style="min-width:36px;">
                                <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:36px;height:36px;background:#412f55;flex-shrink:0;">7</div>
                                <div style="width:2px;flex:1;background:#dee2e6;margin-top:4px;"></div>
                            </div>
                            <div class="pb-3" style="flex:1;">
                                <div class="d-flex align-items-center gap-2 mb-1">
                                    <h6 class="fw-bold mb-0">Operasional — Catat Transaksi</h6>
                                    <span class="badge bg-secondary" style="font-size:0.6rem;">Cashier Staff</span>
                                </div>
                                <p class="small text-muted mb-2">Kasir membuka panel kasir via tombol <i class="bi bi-cart-plus"></i> di tab Income. Pilih menu → isi customer → submit transaksi → cetak/share receipt.</p>
                                <div class="bg-light rounded p-2 small">
                                    <i class="bi bi-lightbulb text-warning me-1"></i>
                                    Stok menu berkurang otomatis setiap transaksi. Update stok manual via ikon <i class="bi bi-box-seam"></i> jika diperlukan.
                                </div>
                            </div>
                        </div>

                        <!-- STEP 8 -->
                        <div class="d-flex gap-3">
                            <div class="d-flex flex-column align-items-center" style="min-width:36px;">
                                <div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width:36px;height:36px;background:#412f55;flex-shrink:0;">8</div>
                            </div>
                            <div style="flex:1;">
                                <div class="d-flex align-items-center gap-2 mb-1">
                                    <h6 class="fw-bold mb-0">Tutup Stand — Validasi Sales</h6>
                                    <span class="badge bg-primary" style="font-size:0.6rem;">Operating (3)</span>
                                    <span class="badge bg-dark" style="font-size:0.6rem;">Super Admin (99)</span>
                                </div>
                                <p class="small text-muted mb-2">Setelah selesai berjualan, klik <i class="bi bi-check-all"></i> di tab Income untuk memvalidasi semua sales. Stand berubah menjadi <strong class="text-secondary">Inactive</strong>.</p>
                                <div class="bg-light rounded p-2 small">
                                    <i class="bi bi-bar-chart text-primary me-1"></i>
                                    Income, expense, dan profit stand otomatis terekap di halaman <strong>Insight</strong>.
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Icon legend -->
                    <div class="px-4 pb-3 pt-0">
                        <div class="border rounded p-3 bg-light">
                            <p class="small fw-bold text-muted mb-2">LEGENDA IKON</p>
                            <div class="row g-1" style="font-size:0.78rem;">
                                <div class="col-6"><i class="bi bi-plus-lg text-primary me-1"></i>Tambah item</div>
                                <div class="col-6"><i class="bi bi-unlock text-success me-1"></i>Lock / Unlock menu</div>
                                <div class="col-6"><i class="bi bi-receipt text-secondary me-1"></i>Lihat nota expense</div>
                                <div class="col-6"><i class="bi bi-clipboard-plus text-success me-1"></i>Set resep / ingredient</div>
                                <div class="col-6"><i class="bi bi-people text-warning me-1"></i>Kelola production staff</div>
                                <div class="col-6"><i class="bi bi-person-badge text-info me-1"></i>Kelola cashier staff</div>
                                <div class="col-6"><i class="bi bi-cart-plus text-info me-1"></i>Buka panel kasir</div>
                                <div class="col-6"><i class="bi bi-check-all text-success me-1"></i>Validasi sales (tutup stand)</div>
                                <div class="col-6"><i class="bi bi-box-seam text-secondary me-1"></i>Update stok menu</div>
                                <div class="col-6"><i class="bi bi-pencil-square text-primary me-1"></i>Edit detail menu</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0 bg-light rounded-bottom">
                    <button type="button" class="btn btn-sm px-4 text-white" style="background-color:#412f55;" data-bs-dismiss="modal">Saya Mengerti</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Menu Image Modal -->
    <div class="modal fade" id="editMenuImageModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg">
                <div class="modal-header bg-secondary text-white border-0">
                    <h5 class="modal-title fw-bold">Update Menu Image</h5>
                    <button type="button" class="btn-close btn-close-white" @click="showEditMenuImageModal(false)"></button>
                </div>
                <form @submit.prevent="handleEditMenuImage">
                    <div class="modal-body p-4 text-center">
                        <p class="small text-muted mb-3">Update image for <strong>{{ selected_menu?.name }}</strong>.</p>
                        <div class="alert alert-warning py-2 small mb-3">
                            <i class="bi bi-exclamation-triangle me-2"></i>Image <strong>MUST</strong> be square (Ratio 1:1) or it will be rejected.
                        </div>
                        <div class="mb-3">
                            <input
                                ref="fileEditMenuImageRef"
                                @change="handleFileEditMenuImage"
                                class="form-control"
                                type="file"
                                accept="image/*"
                                required
                            />
                        </div>
                    </div>
                    <div class="modal-footer border-0 p-4 pt-0">
                        <button type="button" class="btn btn-light px-4" @click="showEditMenuImageModal(false)">Cancel</button>
                        <button type="submit" class="btn btn-secondary px-4" :disabled="form_edit_menu_image.processing">
                            <span v-if="form_edit_menu_image.processing" class="spinner-border spinner-border-sm me-2"></span>
                            Update Image
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Attach Recipe Modal (Clipboard Icon) -->
    <div class="modal fade" id="attachRecipeModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content border-0 shadow-lg">
                <div class="modal-header bg-success text-white border-0">
                    <h5 class="modal-title fw-bold">Set Ingredients for {{ selected_menu?.name }}</h5>
                    <button type="button" class="btn-close btn-close-white" @click="showAttachRecipeModal(false)"></button>
                </div>
                <form @submit.prevent="handleAttachRecipe">
                    <div class="modal-body p-4">
                        <p class="small text-muted mb-4">Input the quantity of each validated ingredient used per portion. Cost and profit will be calculated automatically.</p>
                        
                        <div class="scroll-container-3 pe-2">
                            <div v-if="form_attach_recipe.components.length === 0" class="text-center py-5">
                                <i class="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
                                <p class="text-muted">No validated ingredients found for this stand.<br>Please add and validate expenses first.</p>
                            </div>
                            
                            <div v-for="(comp, index) in form_attach_recipe.components" :key="comp.stand_expense_id" class="card border-0 bg-light mb-3">
                                <div class="card-body p-3">
                                    <div class="row align-items-center">
                                        <div class="col-md-5">
                                            <div class="fw-bold text-primary">{{ comp.name }}</div>
                                            <div class="small text-muted">Stock: {{ comp.qty }} {{ comp.unit }} | Price: {{ formatIDR(comp.price) }}</div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="input-group input-group-sm">
                                                <input type="number" step="0.001" v-model="comp.quantity_used" class="form-control" placeholder="0.00" />
                                                <span class="input-group-text bg-white border-start-0">{{ comp.unit }}</span>
                                            </div>
                                        </div>
                                        <div class="col-md-3 text-end">
                                            <div class="small text-muted mb-0">Cost per portion:</div>
                                            <div class="fw-bold">{{ formatIDR(comp.quantity_used * comp.price) }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Modal Calculation Summary -->
                        <div class="mt-4 p-3 bg-dark text-white rounded-3">
                            <div class="row align-items-center">
                                <div class="col-sm-4">
                                    <div class="small opacity-75">Modal per portion:</div>
                                    <div class="fs-5 fw-bold">{{ formatIDR(form_attach_recipe.components.reduce((acc, curr) => acc + (curr.quantity_used * curr.price), 0)) }}</div>
                                </div>
                                <div class="col-sm-4 border-start border-white border-opacity-25">
                                    <div class="small opacity-75">Selling Price:</div>
                                    <div class="fs-5 fw-bold">{{ formatIDR(selected_menu?.price || 0) }}</div>
                                </div>
                                <div class="col-sm-4 border-start border-white border-opacity-25 text-warning">
                                    <div class="small opacity-75 text-warning">Estimated Profit:</div>
                                    <div class="fs-5 fw-bold text-warning">{{ formatIDR((selected_menu?.price || 0) - form_attach_recipe.components.reduce((acc, curr) => acc + (curr.quantity_used * curr.price), 0)) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-0 p-4 pt-0">
                        <button type="button" class="btn btn-light px-4" @click="showAttachRecipeModal(false)">Cancel</button>
                        <button type="submit" class="btn btn-success px-4" :disabled="form_attach_recipe.processing">
                            <span v-if="form_attach_recipe.processing" class="spinner-border spinner-border-sm me-2"></span>
                            Save Ingredients
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Toast Notification -->
    <ToastNotification ref="toastNotifRef" />

    <!-- Production Staff Modal -->
    <div class="modal fade" id="prouctionStaffModal" tabindex="-1" aria-labelledby="productionStaffModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="productionStaffModalLabel">
                        <i class="bi bi-people me-2"></i>Production Staff
                    </h5>
                    <button type="button" class="btn-close" @click="showProductionStaffModal(false)"></button>
                </div>
                <form @submit.prevent="handleSetProductionStaff">
                    <div class="modal-body">
                        <p class="text-secondary small mb-3">Staff yang terdaftar sebagai Production dapat menambahkan expense dan mengatur resep menu.</p>
                        <!-- Current list -->
                        <div class="mb-3">
                            <label class="form-label fw-medium small text-muted">CURRENT PRODUCTION STAFF</label>
                            <div v-if="form_production_staff.staff_list.filter(s => !s.deleted_at).length === 0" class="text-secondary small fst-italic">Belum ada production staff.</div>
                            <ul class="list-group list-group-flush">
                                <li
                                    v-for="(staff, index) in form_production_staff.staff_list"
                                    :key="staff.id"
                                    v-show="!staff.deleted_at"
                                    class="list-group-item px-0 py-1 d-flex align-items-center"
                                >
                                    <i class="bi bi-person-fill text-primary me-2"></i>
                                    <span class="me-auto">{{ staff.name }}</span>
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-danger border-0 py-0"
                                        @click="removeProductionStaff(index)"
                                    >
                                        <i class="bi bi-x-lg"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <!-- Add staff -->
                        <div>
                            <label class="form-label fw-medium small text-muted">ADD STAFF</label>
                            <v-select
                                :options="users.filter(u => !form_production_staff.staff_list.some(s => s.id === u.id && !s.deleted_at))"
                                label="name"
                                placeholder="Search staff..."
                                @option:selected="(user) => { if (user) { form_production_staff.staff_list.push({ id: user.id, name: user.name }); } }"
                            />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-sm" @click="showProductionStaffModal(false)">Cancel</button>
                        <button type="submit" class="btn btn-primary btn-sm" :disabled="form_production_staff.processing">
                            <span v-if="form_production_staff.processing" class="spinner-border spinner-border-sm me-1"></span>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Cashier Staff Modal -->
    <div class="modal fade" id="cashierStaffModal" tabindex="-1" aria-labelledby="cashierStaffModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="cashierStaffModalLabel">
                        <i class="bi bi-person-badge me-2"></i>Cashier Staff
                    </h5>
                    <button type="button" class="btn-close" @click="showCashierStaffModal(false)"></button>
                </div>
                <form @submit.prevent="handleSetCashierStaff">
                    <div class="modal-body">
                        <p class="text-secondary small mb-3">Staff yang terdaftar sebagai Cashier dapat mengakses panel kasir dan mencatat transaksi.</p>
                        <!-- Current list -->
                        <div class="mb-3">
                            <label class="form-label fw-medium small text-muted">CURRENT CASHIER STAFF</label>
                            <div v-if="form_cashier_staff.staff_list.filter(s => !s.deleted_at).length === 0" class="text-secondary small fst-italic">Belum ada cashier staff.</div>
                            <ul class="list-group list-group-flush">
                                <li
                                    v-for="(staff, index) in form_cashier_staff.staff_list"
                                    :key="staff.id"
                                    v-show="!staff.deleted_at"
                                    class="list-group-item px-0 py-1 d-flex align-items-center"
                                >
                                    <i class="bi bi-person-badge text-primary me-2"></i>
                                    <span class="me-auto">{{ staff.name }}</span>
                                    <button
                                        type="button"
                                        class="btn btn-sm btn-outline-danger border-0 py-0"
                                        @click="removeCashierStaff(index)"
                                    >
                                        <i class="bi bi-x-lg"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <!-- Add staff -->
                        <div>
                            <label class="form-label fw-medium small text-muted">ADD STAFF</label>
                            <v-select
                                :options="users.filter(u => !form_cashier_staff.staff_list.some(s => s.id === u.id && !s.deleted_at))"
                                label="name"
                                placeholder="Search staff..."
                                @option:selected="(user) => { if (user) { form_cashier_staff.staff_list.push({ id: user.id, name: user.name }); } }"
                            />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-sm" @click="showCashierStaffModal(false)">Cancel</button>
                        <button type="submit" class="btn btn-primary btn-sm" :disabled="form_cashier_staff.processing">
                            <span v-if="form_cashier_staff.processing" class="spinner-border spinner-border-sm me-1"></span>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scroll-container-2 {
    max-height: 300px;
    overflow-y: auto;
}

.scroll-container-3 {
    max-height: 400px;
    overflow-y: auto;
}

.fade-slide-ltr-enter-active,
.fade-slide-ltr-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-ltr-enter {
    opacity: 0;
    transform: translateX(-10px);
}

.fade-slide-ltr-leave-to {
    opacity: 0;
    transform: translateX(10px);
}

.fade-slide-rtl-enter-active,
.fade-slide-rtl-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-rtl-enter {
    opacity: 0;
    transform: translateX(10px);
}

.fade-slide-rtl-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}
</style>
