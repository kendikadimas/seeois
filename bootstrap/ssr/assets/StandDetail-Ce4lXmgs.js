import { computed, mergeProps, unref, useSSRContext, ref, watch, onMounted, onUnmounted, withCtx, createVNode, openBlock, createBlock, createTextVNode, toDisplayString, createCommentVNode, Transition, Fragment, renderList, withDirectives, vModelText } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-kVLGS8T_.js";
import { _ as _sfc_main$4 } from "./InputError-DkffFxkw.js";
import "./Notif-DL0SggHu.js";
import { _ as _sfc_main$3 } from "./ModalConfirmation-CaKJYApU.js";
import { M as ModalAlertNotification } from "./ModalAlertNotification-DTKoiHkW.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import vSelect from "vue-select";
/* empty css                    */
import "html2canvas";
import { b as formatDateOnly, c as formatTime, f as formatIDR } from "./utils-DIF4pdrF.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
import "date-fns";
const _sfc_main$2 = {
  __name: "IncomeReceiptTemplate",
  __ssrInlineRender: true,
  props: {
    income: { type: Object, default: null },
    stand: { type: Object, default: null }
  },
  setup(__props) {
    const props = __props;
    const items = computed(() => {
      var _a;
      return ((_a = props.income) == null ? void 0 : _a.order) || [];
    });
    const subtotal = computed(() => {
      var _a;
      return ((_a = props.income) == null ? void 0 : _a.transaction) || 0;
    });
    const discount = computed(() => {
      var _a;
      return ((_a = props.income) == null ? void 0 : _a.discount) || 0;
    });
    const tax = computed(() => {
      var _a;
      return ((_a = props.income) == null ? void 0 : _a.tax) || 0;
    });
    const total = computed(() => {
      var _a;
      return ((_a = props.income) == null ? void 0 : _a.total) || subtotal.value;
    });
    const paymentPrice = computed(() => {
      var _a;
      return ((_a = props.income) == null ? void 0 : _a.payment_price) || subtotal.value;
    });
    const change = computed(() => Math.max(paymentPrice.value - total.value, 0));
    const method = computed(() => {
      var _a, _b;
      return ((_a = props.income) == null ? void 0 : _a.method) || ((_b = props.income) == null ? void 0 : _b.payment_method) || "Cash";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "income-receipt-wrapper" }, _attrs))} data-v-0f772d63><div class="receipt-header" data-v-0f772d63><div class="brand-name" data-v-0f772d63>BLATERIAN</div></div><div class="receipt-body" data-v-0f772d63><div class="meta-grid" data-v-0f772d63><div class="meta-block" data-v-0f772d63><span class="meta-label" data-v-0f772d63>Date &amp; Time</span><span class="meta-value" data-v-0f772d63>${ssrInterpolate(props.income ? unref(formatDateOnly)(props.income.created_at) + " - " + unref(formatTime)(props.income.created_at) : "-")}</span></div><div class="meta-block" data-v-0f772d63><span class="meta-label" data-v-0f772d63>Place</span><span class="meta-value" data-v-0f772d63>${ssrInterpolate(((_a = props.stand) == null ? void 0 : _a.place) || "-")}</span></div><div class="meta-block" data-v-0f772d63><span class="meta-label" data-v-0f772d63>Customer</span><span class="meta-value" data-v-0f772d63>${ssrInterpolate(((_c = (_b = props.income) == null ? void 0 : _b.customer) == null ? void 0 : _c.name) || "Unregistered")}</span></div><div class="meta-block" data-v-0f772d63><span class="meta-label" data-v-0f772d63>Cashier</span><span class="meta-value" data-v-0f772d63>${ssrInterpolate(((_e = (_d = props.income) == null ? void 0 : _d.cashier) == null ? void 0 : _e.name) || ((_g = (_f = props.stand) == null ? void 0 : _f.pic) == null ? void 0 : _g.name) || "-")}</span></div></div><div class="divider" data-v-0f772d63></div><div class="section-title" data-v-0f772d63>Order Items</div><div class="items-list" data-v-0f772d63><!--[-->`);
      ssrRenderList(items.value, (it, idx) => {
        var _a2, _b2, _c2;
        _push(`<div class="item-row" data-v-0f772d63><div class="item-main" data-v-0f772d63><span class="item-qty" data-v-0f772d63>(${ssrInterpolate(it.qty || 0)})</span><span class="item-name"${ssrRenderAttr("title", (_a2 = it.menu) == null ? void 0 : _a2.name)} data-v-0f772d63>${ssrInterpolate(((_b2 = it.menu) == null ? void 0 : _b2.name) || "Unknown")}</span></div><div class="item-price" data-v-0f772d63>${ssrInterpolate(unref(formatIDR)(((_c2 = it.menu) == null ? void 0 : _c2.price) || 0))}</div></div>`);
      });
      _push(`<!--]-->`);
      if (items.value.length === 0) {
        _push(`<div class="empty-items" data-v-0f772d63>No items.</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="divider" data-v-0f772d63></div><div class="totals" data-v-0f772d63><div class="totals-row" data-v-0f772d63><span data-v-0f772d63>Subtotal</span><span data-v-0f772d63>${ssrInterpolate(unref(formatIDR)(subtotal.value))}</span></div><div class="totals-row" data-v-0f772d63><span data-v-0f772d63>Discount</span><span data-v-0f772d63>${ssrInterpolate(unref(formatIDR)(discount.value))}</span></div><div class="totals-row" data-v-0f772d63><span data-v-0f772d63>Tax</span><span data-v-0f772d63>${ssrInterpolate(unref(formatIDR)(tax.value))}</span></div><div class="totals-row total" data-v-0f772d63><span data-v-0f772d63>Total</span><span data-v-0f772d63>${ssrInterpolate(unref(formatIDR)(total.value))}</span></div></div><div class="divider" data-v-0f772d63></div><div class="payment" data-v-0f772d63><div class="totals-row" data-v-0f772d63><span data-v-0f772d63>Method</span><span data-v-0f772d63>${ssrInterpolate(method.value)}</span></div><div class="totals-row" data-v-0f772d63><span data-v-0f772d63>Price</span><span data-v-0f772d63>${ssrInterpolate(unref(formatIDR)(paymentPrice.value))}</span></div><div class="totals-row" data-v-0f772d63><span data-v-0f772d63>Change</span><span data-v-0f772d63>${ssrInterpolate(unref(formatIDR)(change.value))}</span></div></div><div class="footer" data-v-0f772d63><div class="tagline" data-v-0f772d63>#GoodFoodMakesGoodMood</div><div class="social" data-v-0f772d63>blaterian.id</div></div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/IncomeReceiptTemplate.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const IncomeReceiptTemplate = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-0f772d63"]]);
const _sfc_main$1 = {
  props: {
    notif: Array,
    errors: Array
  },
  data() {
    return {
      notif_type: String,
      notif_message: String,
      notif_time: String,
      notif_title: String,
      is_error: Boolean,
      currentTime: /* @__PURE__ */ new Date()
    };
  },
  methods: {
    showToast(type, message) {
      this.notif_type = type;
      this.notif_message = message;
      this.notif_title = type.charAt(0).toUpperCase() + type.slice(1) + ".";
      this.currentTime = /* @__PURE__ */ new Date();
      const hours = String(this.currentTime.getHours()).padStart(2, "0");
      const minutes = String(this.currentTime.getMinutes()).padStart(
        2,
        "0"
      );
      this.notif_time = hours + ":" + minutes;
      const toastEl = document.getElementById("toast_notification");
      if (toastEl) {
        const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
        toast.show();
      }
    },
    notif_parse() {
      var _a, _b;
      if (!this.notif && !this.errors) return;
      this.notif_type = this.is_error ? "warning" : ((_a = this.notif) == null ? void 0 : _a.type) || "info";
      this.notif_message = this.is_error ? Array.isArray(this.errors) ? this.errors.join(". ") : this.errors : ((_b = this.notif) == null ? void 0 : _b.message) || "";
      this.currentTime = /* @__PURE__ */ new Date();
      const hours = String(this.currentTime.getHours()).padStart(2, "0");
      const minutes = String(this.currentTime.getMinutes()).padStart(2, "0");
      this.notif_time = hours + ":" + minutes;
      switch (this.notif_type) {
        case "warning":
          this.notif_title = "Warning!";
          break;
        case "danger":
          this.notif_title = "Danger!";
          break;
        default:
          this.notif_title = "Information.";
          break;
      }
    }
  },
  mounted() {
    if (this.errors && this.errors.length > 0) {
      this.is_error = true;
      this.notif_parse();
      this.showToast("warning", Array.isArray(this.errors) ? this.errors.join(". ") : this.errors);
    } else if (this.notif && this.notif.message) {
      this.is_error = false;
      this.notif_parse();
      this.showToast(this.notif.type, this.notif.message);
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "toast-container top-15 start-50 translate-middle-x p-3" }, _attrs))}><div class="${ssrRenderClass("toast bg-light border-" + $data.notif_type)}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" id="toast_notification"><div class="${ssrRenderClass(
    "toast-header bg-" + $data.notif_type + "-subtle border-" + $data.notif_type
  )}"><span class="fw-bold text-dark me-auto"><i class="${ssrRenderClass("bi bi-app text-" + $data.notif_type + "me-2")}"></i> ${ssrInterpolate($data.notif_title)}</span><small class="text-body-secondary d-none d-lg-block">${ssrInterpolate($data.notif_time)}</small><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button></div><div class="toast-body">${ssrInterpolate($data.notif_message)}</div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ToastNotification.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ToastNotification = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const MAX_PREFETCH = 5;
const _sfc_main = {
  __name: "StandDetail",
  __ssrInlineRender: true,
  props: {
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
    }
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const props = __props;
    const stand = computed(() => props.stand || {});
    const income_list = computed(() => props.income_list || []);
    const expense_list = computed(() => props.expense_list || []);
    const menu_category = computed(() => props.menu_category || {});
    const food_tag_list = computed(() => props.food_tag_list || []);
    const users = computed(() => props.users || []);
    computed(() => props.dana_contact || null);
    computed(() => props.notif || null);
    const errors = computed(() => props.errors || {});
    function safeNameLabel(option) {
      if (option == null) return "";
      if (typeof option === "string") return option;
      if (typeof option === "object") return option.name || option.label || "";
      return "";
    }
    const auth_user = usePage().props.auth.user;
    const title = ref(((_a = stand.value) == null ? void 0 : _a.name) || "Stand Detail");
    const modalConfirmationRef = ref(null);
    const modalAlertNotificationRef = ref(null);
    const toastNotifRef = ref(null);
    ref(null);
    const incomeReceiptRef = ref(null);
    ref("placeholder");
    const modalProductionStaff = ref(null);
    const modalCashierStaff = ref(null);
    ref(null);
    const modalEditStand = ref(null);
    const modalDeleteStand = ref(null);
    const modalAddMenu = ref(null);
    const modalAddStock = ref(null);
    const modalAddExpense = ref(null);
    const modalIncomeDetail = ref(null);
    const modalEditMenuImage = ref(null);
    ref(null);
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
      { value: 2, name: "Live and Pre-Order" }
    ];
    const active_tab = ref(1);
    const next_tab = ref(0);
    const prev_tab = ref(0);
    watch(() => props.stand, (newStand) => {
      if (!newStand) return;
      if (selected_expense.value) {
        const updated = (newStand.expense || []).find((e) => e.id === selected_expense.value.id);
        if (updated) selected_expense.value = updated;
      }
      if (selected_menu.value) {
        const updated = (newStand.menu || []).find((m) => m.id === selected_menu.value.id);
        if (updated) selected_menu.value = updated;
      }
    }, { deep: true });
    const selected_expense = ref(null);
    computed(() => selected_expense.value || null);
    const selected_income = ref(null);
    const selectedIncome = computed(() => selected_income.value || null);
    const selected_stock = ref(null);
    const selected_menu = ref(null);
    computed(() => {
      var _a2, _b2;
      if ((auth_user == null ? void 0 : auth_user.roles_id) == 99) return true;
      return ((_b2 = (_a2 = props.stand) == null ? void 0 : _a2.cashier) == null ? void 0 : _b2.some((cashier) => cashier.id == auth_user.id)) || false;
    });
    const is_production = computed(() => {
      var _a2, _b2;
      if ((auth_user == null ? void 0 : auth_user.roles_id) == 99) return true;
      return ((_b2 = (_a2 = props.stand) == null ? void 0 : _a2.production) == null ? void 0 : _b2.some(
        (production) => production.id == auth_user.id
      )) || false;
    });
    const food_tags = computed(() => props.food_tag_list || []);
    const category_options = computed(() => props.all_categories || []);
    const shop_status = computed(() => {
      if (!props.stand) return "close";
      if (props.stand.menu_lock > 0 && !(props.stand.sale_validation > 0)) {
        switch (props.stand.type) {
          case 0:
            return (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0) == new Date(props.stand.date).setHours(0, 0, 0, 0) ? "open" : "close";
          case 1:
            return (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0) < new Date(props.stand.date).setHours(0, 0, 0, 0) ? "open" : "close";
          case 2:
            return (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0) <= new Date(props.stand.date).setHours(0, 0, 0, 0) ? "open" : "close";
          default:
            return "close";
        }
      }
      return "close";
    });
    const form_delete_stand = useForm({
      password: null
    });
    const form_filter_expense = useForm({
      name: null
    });
    const form_filter_income = useForm({
      name: null
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
      image: null
    });
    const form_edit_menu = useForm({
      id: null,
      name: null,
      category: null,
      price: null,
      food_tag: []
    });
    const form_add_stock = useForm({
      id: null,
      amount: null,
      request_id: null,
      reason: "correction"
    });
    const form_add_expense = useForm({
      name: null,
      price: null,
      qty: null,
      unit: null,
      reciept: null,
      receipt_same: null,
      same_receipt_check: null
    });
    useForm({
      name: null,
      number: null
    });
    const form_production_staff = useForm({
      staff_list: ((_b = props.stand) == null ? void 0 : _b.production) || []
    });
    const form_cashier_staff = useForm({
      staff_list: ((_c = props.stand) == null ? void 0 : _c.cashier) || []
    });
    const form_edit_menu_image = useForm({
      image: null
    });
    const form_attach_recipe = useForm({
      components: []
      // { stand_expense_id, quantity_used }
    });
    const modalAttachRecipe = ref(null);
    const modalWorkflowGuide = ref(null);
    function showWorkflowGuideModal(is_show) {
      if (modalWorkflowGuide.value == null) {
        const modal = document.getElementById("workflowGuideModal");
        modalWorkflowGuide.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalWorkflowGuide.value.show();
      }
    }
    function showAttachRecipeModal(is_show, item = null) {
      if (modalAttachRecipe.value == null) {
        const modal = document.getElementById("attachRecipeModal");
        if (modal) {
          modalAttachRecipe.value = bootstrap.Modal.getOrCreateInstance(modal);
        }
      }
      {
        if (item) selected_menu.value = item;
        if (selected_menu.value && modalAttachRecipe.value) {
          form_attach_recipe.id = selected_menu.value.id;
          form_attach_recipe.components = (expense_list.value || []).filter((e) => e.operational_id && e.operational_id > 0).map((e) => {
            var _a2;
            const existing = (_a2 = selected_menu.value.recipe_components) == null ? void 0 : _a2.find((rc) => rc.stand_expense_id === e.id);
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
      }
    }
    const form_edit_stand = useForm({
      name: ((_d = props.stand) == null ? void 0 : _d.name) || null,
      pic_id: ((_e = props.stand) == null ? void 0 : _e.pic_id) || null,
      place: ((_f = props.stand) == null ? void 0 : _f.place) || null,
      date: ((_g = props.stand) == null ? void 0 : _g.date) || null,
      type: ((_h = props.stand) == null ? void 0 : _h.type) || null
    });
    const expenseReceiptFile = computed(() => {
      const item = selected_expense.value;
      if (!item) return null;
      return item.reciept || item.receipt || null;
    });
    const expenseReceiptUrl = computed(() => {
      const file = expenseReceiptFile.value;
      if (!file) return null;
      let built = null;
      try {
        if (typeof route === "function") {
          built = `/seeo/staff/food/stand/expense/receipt/${encodeURIComponent(file)}`;
        }
      } catch (e) {
        console.warn("[StandDetail] Failed building receipt route via Ziggy", e);
      }
      if (!built || !/\/seeo\/staff\/food\/stand\/expense\/receipt\//.test(built)) {
        built = `/seeo/staff/food/stand/expense/receipt/${encodeURIComponent(file)}`;
      }
      return built;
    });
    const receiptBlobCache = /* @__PURE__ */ new Map();
    function buildReceiptUrlForFile(filename) {
      if (!filename) return null;
      let built = null;
      try {
        if (typeof route === "function") {
          built = `/seeo/staff/food/stand/expense/receipt/${encodeURIComponent(filename)}`;
        }
      } catch (_) {
      }
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
        const fname = (exp == null ? void 0 : exp.reciept) || (exp == null ? void 0 : exp.receipt);
        if (!fname) continue;
        if (receiptBlobCache.has(fname)) continue;
        const url = buildReceiptUrlForFile(fname);
        if (!url) continue;
        fetch(url).then((r) => r.ok ? r.blob() : Promise.reject(r.status)).then((blob) => {
          const objUrl = URL.createObjectURL(blob);
          receiptBlobCache.set(fname, objUrl);
          console.debug("[StandDetail] Prefetched receipt", fname);
        }).catch((err) => console.debug("[StandDetail] Prefetch failed", fname, err));
        count++;
      }
    }
    const expenseReceiptSrc = computed(() => {
      const file = expenseReceiptFile.value;
      if (!file) return null;
      if (receiptBlobCache.has(file)) {
        return receiptBlobCache.get(file);
      }
      return expenseReceiptUrl.value;
    });
    const expenseReceiptLoading = ref(false);
    const expenseReceiptError = ref(null);
    watch(expenseReceiptSrc, (newUrl) => {
      if (newUrl) {
        expenseReceiptLoading.value = true;
        expenseReceiptError.value = null;
        console.debug("[StandDetail] Loading expense receipt", newUrl);
      } else {
        expenseReceiptLoading.value = false;
        expenseReceiptError.value = null;
      }
    });
    function showEditStandModal(is_show) {
      if (modalEditStand.value == null) {
        const modal = document.getElementById("editStandModal");
        modalEditStand.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalEditStand.value.show();
      }
    }
    function showDeleteStandModal(is_show) {
      if (modalDeleteStand.value == null) {
        const modal = document.getElementById("deleteStandModal");
        modalDeleteStand.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalDeleteStand.value.show();
      }
    }
    function showAddMenuModal(is_show) {
      if (modalAddMenu.value == null) {
        const modal = document.getElementById("addMenuModal");
        modalAddMenu.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      modalAddMenu.value.show();
    }
    const modalEditMenu = ref(null);
    function showEditMenuModal(is_show, item = null) {
      if (modalEditMenu.value == null) {
        const modal = document.getElementById("editMenuModal");
        modalEditMenu.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        if (item) {
          selected_menu.value = item;
          form_edit_menu.id = item.id;
          form_edit_menu.name = item.name;
          form_edit_menu.category = item.category;
          form_edit_menu.price = item.price;
          form_edit_menu.food_tag = item.tags ? item.tags.map((t) => t.id) : [];
        }
        modalEditMenu.value.show();
      }
    }
    function showAddStockModal(is_show, item = null) {
      if (modalAddStock.value == null) {
        const modal = document.getElementById("addStockModal");
        modalAddStock.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        if (item) selected_stock.value = item;
        modalAddStock.value.show();
      }
    }
    function showAddExpenseModal(is_show) {
      if (modalAddExpense.value == null) {
        const modal = document.getElementById("addExpenseModal");
        modalAddExpense.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalAddExpense.value.show();
      }
    }
    function showIncomeDetailModal(is_show) {
      if (modalIncomeDetail.value == null) {
        const modal = document.getElementById("incomeDetailModal");
        modalIncomeDetail.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalIncomeDetail.value.show();
      }
    }
    function showExpenseReceiptModal(is_show) {
      if (modalExpenseReceipt.value == null) {
        const modal = document.getElementById("receiptModal");
        modalExpenseReceipt.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalExpenseReceipt.value.show();
      }
    }
    function showProductionStaffModal(is_show) {
      if (modalProductionStaff.value == null) {
        const modal = document.getElementById("prouctionStaffModal");
        modalProductionStaff.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalProductionStaff.value.show();
      }
    }
    function showCashierStaffModal(is_show) {
      if (modalCashierStaff.value == null) {
        const modal = document.getElementById("cashierStaffModal");
        modalCashierStaff.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalCashierStaff.value.show();
      }
    }
    function showEditMenuImageModal(is_show, item = null) {
      if (modalEditMenuImage.value == null) {
        const modal = document.getElementById("editMenuImageModal");
        modalEditMenuImage.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        if (item) selected_menu.value = item;
        modalEditMenuImage.value.show();
      }
    }
    function selectExpense(item) {
      if (!selected_expense) {
        console.error("[StandDetail] selected_expense ref missing");
        return;
      }
      selected_expense.value = item;
      console.debug("[StandDetail] Expense selected:", {
        id: item == null ? void 0 : item.id,
        name: item == null ? void 0 : item.name,
        reciept: item == null ? void 0 : item.reciept
      });
      const file = (item == null ? void 0 : item.reciept) || (item == null ? void 0 : item.receipt);
      if (file && receiptBlobCache.has(file)) {
        expenseReceiptLoading.value = false;
      } else {
        expenseReceiptLoading.value = !!file;
        if (file && !receiptBlobCache.has(file)) {
          const url = buildReceiptUrlForFile(file);
          if (url) {
            fetch(url).then((r) => r.ok ? r.blob() : Promise.reject(r.status)).then((blob) => {
              const objUrl = URL.createObjectURL(blob);
              receiptBlobCache.set(file, objUrl);
              console.debug("[StandDetail] On-demand prefetched receipt", file);
              expenseReceiptLoading.value = false;
            }).catch((err) => console.debug("[StandDetail] On-demand prefetch failed", file, err));
          }
        }
      }
      expenseReceiptError.value = null;
      showExpenseReceiptModal();
    }
    function selectIncome(item) {
      var _a2, _b2;
      if (!selected_income) {
        console.error("[StandDetail] selected_income ref missing");
        return;
      }
      selected_income.value = item;
      console.debug("[StandDetail] Income selected:", {
        id: item == null ? void 0 : item.id,
        customer: (_a2 = item == null ? void 0 : item.customer) == null ? void 0 : _a2.name,
        order_count: (_b2 = item == null ? void 0 : item.order) == null ? void 0 : _b2.length
      });
      showIncomeDetailModal();
    }
    function handleFilterExpense() {
      form_filter_expense.post(`/seeo/staff/food/stand/expense/filter`);
    }
    function handleFilterIncome() {
      form_filter_income.post(`/seeo/staff/food/stand/sales/filter`);
    }
    function showTab(number) {
      prev_tab.value = active_tab.value;
      active_tab.value = 0;
      next_tab.value = number;
    }
    function proceedTab() {
      active_tab.value = next_tab.value;
    }
    function confirmation(route2, message) {
      if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route2, message);
      } else {
        console.error("modalConfirmationRef is null");
      }
    }
    function alertNotification(message) {
      modalAlertNotificationRef.value.showModal(message);
    }
    function showImage(event) {
      if (event && event.target) {
        event.target.style.opacity = "1";
      }
    }
    const isLargeScreen = ref(window.innerWidth >= 768);
    const handleResize = () => {
      isLargeScreen.value = window.innerWidth >= 768;
      window.addEventListener("resize", handleResize);
    };
    onMounted(() => {
      var _a2, _b2, _c2, _d2;
      console.debug("[StandDetail] props snapshot:", {
        stand: props.stand,
        stand_exists: !!props.stand,
        stand_name: (_a2 = props.stand) == null ? void 0 : _a2.name,
        stand_pic: (_b2 = props.stand) == null ? void 0 : _b2.pic,
        income_list: (_c2 = props.income_list) == null ? void 0 : _c2.length,
        expense_list: (_d2 = props.expense_list) == null ? void 0 : _d2.length,
        menu_category_keys: Object.keys(props.menu_category || {}),
        all_props_keys: Object.keys(props)
      });
      if (!props.stand) {
        console.warn("[StandDetail] Critical: props.stand is null/undefined");
      }
      if (props.stand && !props.stand.name) {
        console.warn("[StandDetail] Warning: props.stand.name is null/undefined");
      }
      if (props.stand && !props.stand.pic) {
        console.warn("[StandDetail] Warning: props.stand.pic is null/undefined");
      }
      console.debug("[StandDetail] Refs initialized:", {
        selected_income_exists: !!selected_income,
        selected_expense_exists: !!selected_expense,
        selected_stock_exists: !!selected_stock,
        selected_menu_exists: !!selected_menu,
        selected_income_value: selected_income.value,
        selected_expense_value: selected_expense.value
      });
      window.addEventListener("resize", handleResize);
      prefetchExpenseReceipts();
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
      for (const url of receiptBlobCache.values()) {
        try {
          URL.revokeObjectURL(url);
        } catch (_) {
        }
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
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i, _j;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(StaffLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", `/seeo/staff/blaterian/foods/stand`)} class="bg-opacity-0 text-decoration-none text-primary-emphasis" data-v-40e633c5${_scopeId}><span class="fw-light" data-v-40e633c5${_scopeId}>${ssrInterpolate("Stand")}</span></a><span class="ms-2" data-v-40e633c5${_scopeId}>${ssrInterpolate("/")}</span> ${ssrInterpolate(title.value)}`);
          } else {
            return [
              createVNode("a", {
                href: `/seeo/staff/blaterian/foods/stand`,
                class: "bg-opacity-0 text-decoration-none text-primary-emphasis"
              }, [
                createVNode("span", { class: "fw-light" }, toDisplayString("Stand"))
              ]),
              createVNode("span", { class: "ms-2" }, toDisplayString("/")),
              createTextVNode(" " + toDisplayString(title.value), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b3, _c3, _d3, _e3, _f3, _g3, _h3, _i2, _j2, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: title.value,
              icon: "/favicon.ico"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(ModalAlertNotification, {
              ref_key: "modalAlertNotificationRef",
              ref: modalAlertNotificationRef
            }, null, _parent2, _scopeId));
            if (stand.value) {
              _push2(`<div class="container me-lg-0 mx-auto mb-5" data-v-40e633c5${_scopeId}><div class="row gx-4 mt-4 mb-5" data-v-40e633c5${_scopeId}><div class="col-12" data-v-40e633c5${_scopeId}><div class="card bg-white p-3" data-v-40e633c5${_scopeId}><div class="d-flex" data-v-40e633c5${_scopeId}><span class="h5 text-primary-emphasis me-auto" data-v-40e633c5${_scopeId}><i class="bi bi-shop me-2" data-v-40e633c5${_scopeId}></i>${ssrInterpolate("Stand " + (((_a3 = stand.value) == null ? void 0 : _a3.name) || "Unknown"))}</span><div class="ms-auto d-flex gap-2" data-v-40e633c5${_scopeId}><button class="btn btn-sm btn-outline-info border-0 py-0 mb-auto" title="Workflow Guide" data-v-40e633c5${_scopeId}><i class="bi bi-lightbulb-fill" data-v-40e633c5${_scopeId}></i></button>`);
              if (unref(auth_user).roles_id == 3 || unref(auth_user).roles_id == 99) {
                _push2(`<a href="/seeo/staff/operating/panel" class="btn btn-sm btn-outline-primary border-0 py-0 mb-auto" title="Go to Operating Panel" data-v-40e633c5${_scopeId}><i class="bi bi-box-arrow-up-right" data-v-40e633c5${_scopeId}></i></a>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).roles_id == 99 || unref(auth_user).id == ((_b3 = stand.value) == null ? void 0 : _b3.pic_id)) {
                _push2(`<button class="btn btn-sm btn-outline-secondary border-0 py-0 mb-auto" data-v-40e633c5${_scopeId}><span class="d-none d-lg-block" data-v-40e633c5${_scopeId}>Edit</span><i class="bi bi-pencil d-lg-none" data-v-40e633c5${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).roles_id == 3 || unref(auth_user).roles_id == 99) {
                _push2(`<button class="btn btn-sm btn-outline-danger border-0 py-0 mb-auto" data-v-40e633c5${_scopeId}><span class="d-none d-lg-block" data-v-40e633c5${_scopeId}>Delete</span><i class="bi bi-trash3 d-lg-none" data-v-40e633c5${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="row g-2 mt-1" data-v-40e633c5${_scopeId}><div class="col-6 col-lg-3" data-v-40e633c5${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-40e633c5${_scopeId}>${ssrInterpolate("Person In Charge")}</span><div class="scroll-x-hidden" data-v-40e633c5${_scopeId}><span class="d-block text-primary-emphasis text-nowrap" data-v-40e633c5${_scopeId}>${ssrInterpolate(((_c3 = stand.value.pic) == null ? void 0 : _c3.name) || "Not Assigned")}</span></div></div><div class="col-6 col-lg-3" data-v-40e633c5${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-40e633c5${_scopeId}>${ssrInterpolate("Status")}</span><div class="d-flex" data-v-40e633c5${_scopeId}><div class="scroll-x-hidden" data-v-40e633c5${_scopeId}><span class="${ssrRenderClass(
                "d-block text-nowrap " + (stand_status.value == "Active" ? "text-success" : "text-primary-emphasis")
              )}" data-v-40e633c5${_scopeId}>${ssrInterpolate(stand_status.value)}</span></div><span class="${ssrRenderClass(
                "d-block text-nowrap px-2 ms-2 rounded " + (shop_status.value == "open" ? "text-white bg-success" : "text-secondary")
              )}" data-v-40e633c5${_scopeId}>${ssrInterpolate(shop_status.value)}</span></div></div><div class="col-6 col-lg-3" data-v-40e633c5${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-40e633c5${_scopeId}>${ssrInterpolate("Place")}</span><div class="scroll-x-hidden" data-v-40e633c5${_scopeId}><span class="d-block text-primary-emphasis text-nowrap" data-v-40e633c5${_scopeId}>${ssrInterpolate(((_d3 = stand.value) == null ? void 0 : _d3.place) || "-")}</span></div></div><div class="col-6 col-lg-3" data-v-40e633c5${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-40e633c5${_scopeId}>${ssrInterpolate("Date")}</span><div class="scroll-x-hidden" data-v-40e633c5${_scopeId}><span class="d-block text-primary-emphasis text-nowrap" data-v-40e633c5${_scopeId}>${ssrInterpolate(((_e3 = stand.value) == null ? void 0 : _e3.date) ? unref(formatDateOnly)(stand.value.date) : "-")}</span></div></div><div class="col-6 col-lg-3" data-v-40e633c5${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-40e633c5${_scopeId}>${ssrInterpolate("Type")}</span><div class="scroll-x-hidden" data-v-40e633c5${_scopeId}><span class="d-block text-primary-emphasis text-nowrap" data-v-40e633c5${_scopeId}>${ssrInterpolate(((_f3 = stand_type.find(
                (item) => item.value == stand.value.type
              )) == null ? void 0 : _f3.name) || "Unknown Type")}</span></div></div><div class="col-6 col-lg-3" data-v-40e633c5${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-40e633c5${_scopeId}>${ssrInterpolate("Profit")}</span><div class="scroll-x-hidden" data-v-40e633c5${_scopeId}><span class="d-block text-primary-emphasis text-nowrap" data-v-40e633c5${_scopeId}>${ssrInterpolate(unref(formatIDR)(((_g3 = stand.value) == null ? void 0 : _g3.profit) || 0))}</span></div></div><div class="col-6 col-lg-3" data-v-40e633c5${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-40e633c5${_scopeId}>${ssrInterpolate("Income")}</span><div class="scroll-x-hidden" data-v-40e633c5${_scopeId}><span class="d-block text-primary-emphasis text-nowrap" data-v-40e633c5${_scopeId}>${ssrInterpolate(unref(formatIDR)(((_h3 = stand.value) == null ? void 0 : _h3.income) || 0))}</span></div></div><div class="col-6 col-lg-3" data-v-40e633c5${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-40e633c5${_scopeId}>${ssrInterpolate("Expense")}</span><div class="scroll-x-hidden" data-v-40e633c5${_scopeId}><span class="d-block text-primary-emphasis text-nowrap" data-v-40e633c5${_scopeId}>${ssrInterpolate(unref(formatIDR)(((_i2 = stand.value) == null ? void 0 : _i2.expense) || 0))}</span></div></div></div></div></div></div><div class="row gx-4 mt-4" data-v-40e633c5${_scopeId}><div class="col-12" data-v-40e633c5${_scopeId}><div class="card bg-white p-1 d-lg-none" data-v-40e633c5${_scopeId}><div class="d-flex" data-v-40e633c5${_scopeId}><button class="btn btn-sm btn-outline-primary border-0 w-100 me-2" data-v-40e633c5${_scopeId}>`);
              if (active_tab.value == 1) {
                _push2(`<span data-v-40e633c5${_scopeId}>${ssrInterpolate("Menu")}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (active_tab.value !== 1) {
                _push2(`<i class="bi bi-list-ul" data-v-40e633c5${_scopeId}></i>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</button><button class="btn btn-sm btn-outline-primary border-0 w-100 me-2" data-v-40e633c5${_scopeId}>`);
              if (active_tab.value == 2) {
                _push2(`<span data-v-40e633c5${_scopeId}>${ssrInterpolate("Expense")}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (active_tab.value !== 2) {
                _push2(`<i class="bi bi-cart4" data-v-40e633c5${_scopeId}></i>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</button><button class="btn btn-sm btn-outline-primary border-0 w-100 me-2" data-v-40e633c5${_scopeId}>`);
              if (active_tab.value == 3) {
                _push2(`<span data-v-40e633c5${_scopeId}>${ssrInterpolate("Income")}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (active_tab.value !== 3) {
                _push2(`<i class="bi bi-graph-up" data-v-40e633c5${_scopeId}></i>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</button></div></div></div></div><div class="row gx-4 mt-4 mt-lg-0" data-v-40e633c5${_scopeId}>`);
              if (active_tab.value == 1 || isLargeScreen.value) {
                _push2(`<div class="col-12 col-lg-4" data-v-40e633c5${_scopeId}><div class="card bg-white p-2" data-v-40e633c5${_scopeId}><div class="d-flex pb-2" data-v-40e633c5${_scopeId}><span class="text-primary ms-2" data-v-40e633c5${_scopeId}><i class="bi bi-list-ul me-2 d-none d-lg-inline" data-v-40e633c5${_scopeId}></i>${ssrInterpolate("Menu")}</span><div class="ms-auto me-2 d-flex" data-v-40e633c5${_scopeId}><div data-v-40e633c5${_scopeId}>`);
                if (unref(auth_user).roles_id == 99 || unref(auth_user).id == ((_j2 = stand.value) == null ? void 0 : _j2.pic_id)) {
                  _push2(`<button class="${ssrRenderClass(
                    "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value !== "Waiting for menu lock" && unref(auth_user).roles_id != 99 ? "secondary disabled" : "primary")
                  )}" title="Add Menu" data-v-40e633c5${_scopeId}><i class="bi bi-plus-lg" data-v-40e633c5${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                if (unref(auth_user).roles_id == 10 || unref(auth_user).roles_id == 99) {
                  _push2(`<a${ssrRenderAttr("href", _ctx.window.route("staff.sales-distribution.index"))} class="btn btn-sm border-0 py-0 btn-outline-primary ms-1" title="Go to Sales Distribution Panel" data-v-40e633c5${_scopeId}><i class="bi bi-box-arrow-up-right" data-v-40e633c5${_scopeId}></i></a>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
                if ((unref(auth_user).roles_id == 99 || unref(auth_user).id == ((_k = stand.value) == null ? void 0 : _k.pic_id)) && (unref(auth_user).roles_id == 3 || unref(auth_user).roles_id == 99)) {
                  _push2(`<div class="border-start border-2 mt-1 mx-1" data-v-40e633c5${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div data-v-40e633c5${_scopeId}>`);
                if (unref(auth_user).roles_id == 3 || unref(auth_user).roles_id == 10 || unref(auth_user).roles_id == 99) {
                  _push2(`<button class="${ssrRenderClass(
                    "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" && unref(auth_user).roles_id != 99 ? "secondary disabled" : "success")
                  )}" data-v-40e633c5${_scopeId}><i class="${ssrRenderClass(
                    "bi bi-" + (stand.value.menu_lock > 0 ? "lock-fill" : "unlock")
                  )}" data-v-40e633c5${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div><div class="scroll-container-3 scroll-container-lg-2" data-v-40e633c5${_scopeId}><!--[-->`);
                ssrRenderList(menu_category.value, (menu_list, key) => {
                  _push2(`<ul class="list-group list-group-flush mb-2" data-v-40e633c5${_scopeId}><li class="list-group-item list-group-item-light px-2 py-1" data-v-40e633c5${_scopeId}><span class="text-secondary" data-v-40e633c5${_scopeId}>${ssrInterpolate(key)}</span></li><!--[-->`);
                  ssrRenderList(menu_list, (item) => {
                    var _a4, _b4, _c4;
                    _push2(`<li class="list-group-item list-group-item-action px-2 py-1" data-v-40e633c5${_scopeId}><div class="p-1" data-v-40e633c5${_scopeId}><div class="d-flex" data-v-40e633c5${_scopeId}><div class="border-2 border-primary-subtle rounded-3 overflow-hidden d-flex align-items-center justify-content-center bg-light" style="${ssrRenderStyle({ "width": "85px", "height": "85px", "flex-shrink": "0" })}" data-v-40e633c5${_scopeId}><img${ssrRenderAttr("src", item.image ? "/storage/images/shop/foods/menu/" + item.image : "/storage/images/shop/foods/menu/default.png")} alt="image" class="img-fluid" style="${ssrRenderStyle({ "object-fit": "cover", "width": "100%", "height": "100%", "opacity": "0", "transition": "opacity 0.3s" })}" data-v-40e633c5${_scopeId}></div><div class="ps-2" style="${ssrRenderStyle({ "width": "80%" })}" data-v-40e633c5${_scopeId}><div class="scroll-x-hidden mb-1" data-v-40e633c5${_scopeId}><span class="text-primary-emphasis d-block"${ssrRenderAttr("title", (item == null ? void 0 : item.name) || "")} data-v-40e633c5${_scopeId}>${ssrInterpolate((item == null ? void 0 : item.name) || "")}</span></div><div class="mb-1" data-v-40e633c5${_scopeId}><span class="text-secondary d-block" data-v-40e633c5${_scopeId}>${ssrInterpolate((item.volume > 0 ? item.volume + item.volume_unit + " " : "") + (item.volume > 0 || item.mass > 0 ? "- " : "") + (item.mass > 0 ? item.mass + item.mass_unit + " " : ""))}</span><span class="text-primary d-block" data-v-40e633c5${_scopeId}>${ssrInterpolate(unref(formatIDR)(item.price))}</span></div><span class="rounded-3 text-dark px-1 text-nowrap d-block mb-2" data-v-40e633c5${_scopeId}>${ssrInterpolate("( ")} <span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-40e633c5${_scopeId}>${ssrInterpolate("sold:")}</span> ${ssrInterpolate(item.sale + " / ")} <span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-40e633c5${_scopeId}>${ssrInterpolate("stock:")}</span> ${ssrInterpolate(item.stock + " )")}</span><div class="mb-2" data-v-40e633c5${_scopeId}>`);
                    if (Array.isArray(item.recipe_components) && item.recipe_components.length > 0) {
                      _push2(`<span class="badge bg-success-subtle text-success border border-success border-opacity-25 d-inline-flex align-items-center" style="${ssrRenderStyle({ "font-size": "0.65rem" })}" data-v-40e633c5${_scopeId}><i class="bi bi-check-all me-1" data-v-40e633c5${_scopeId}></i>${ssrInterpolate((item.recipe_components || []).length)} Ingredients <span class="ms-1 border-start ps-1 border-success border-opacity-25" data-v-40e633c5${_scopeId}>Modal: ${ssrInterpolate(unref(formatIDR)((item.recipe_components || []).reduce((acc, curr) => {
                        var _a5;
                        const cost = parseFloat(curr.price > 0 ? curr.price : ((_a5 = curr.expense) == null ? void 0 : _a5.price) ?? 0);
                        return acc + parseFloat(curr.quantity_used || 0) * cost;
                      }, 0)))}</span><span class="ms-1 border-start ps-1 border-success border-opacity-25 text-primary" data-v-40e633c5${_scopeId}>Untung: ${ssrInterpolate(unref(formatIDR)(parseFloat(item.price || 0) - (item.recipe_components || []).reduce((acc, curr) => {
                        var _a5;
                        const cost = parseFloat(curr.price > 0 ? curr.price : ((_a5 = curr.expense) == null ? void 0 : _a5.price) ?? 0);
                        return acc + parseFloat(curr.quantity_used || 0) * cost;
                      }, 0)))}</span></span>`);
                    } else {
                      _push2(`<span class="badge bg-warning text-dark" style="${ssrRenderStyle({ "font-size": "0.65rem" })}" title="Belum ada ingredient" data-v-40e633c5${_scopeId}><i class="bi bi-exclamation-triangle me-1" data-v-40e633c5${_scopeId}></i>No Ingredients </span>`);
                    }
                    _push2(`</div><div class="d-flex mt-auto flex-wrap gap-1" data-v-40e633c5${_scopeId}>`);
                    if (unref(auth_user).roles_id == 99 || unref(auth_user).roles_id == 10 || unref(auth_user).roles_id == 3) {
                      _push2(`<div data-v-40e633c5${_scopeId}><button class="btn btn-sm btn-outline-primary border-0 p-1" title="Edit Details" data-v-40e633c5${_scopeId}><i class="bi bi-pencil-square" style="${ssrRenderStyle({ "font-size": "1.1rem" })}" data-v-40e633c5${_scopeId}></i></button></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<div data-v-40e633c5${_scopeId}><button class="btn btn-sm btn-outline-secondary border-0 p-1"${ssrIncludeBooleanAttr(stand.value.sale_validation > 0 && unref(auth_user).roles_id != 99) ? " disabled" : ""} title="Update Image" data-v-40e633c5${_scopeId}><i class="bi bi-image" style="${ssrRenderStyle({ "font-size": "1.1rem" })}" data-v-40e633c5${_scopeId}></i></button></div><div data-v-40e633c5${_scopeId}><button class="btn btn-sm btn-outline-secondary border-0 p-1"${ssrIncludeBooleanAttr(stand.value.sale_validation > 0 && unref(auth_user).roles_id != 99) ? " disabled" : ""} title="Add Stock" data-v-40e633c5${_scopeId}><i class="bi bi-box-seam" style="${ssrRenderStyle({ "font-size": "1.1rem" })}" data-v-40e633c5${_scopeId}></i></button></div>`);
                    if (unref(auth_user).roles_id == 99 || unref(auth_user).roles_id == 10 || is_production.value) {
                      _push2(`<div data-v-40e633c5${_scopeId}><button class="btn btn-sm btn-outline-success border-0 p-1"${ssrIncludeBooleanAttr(stand.value.sale_validation > 0 && unref(auth_user).roles_id != 99) ? " disabled" : ""} title="Set Ingredients" data-v-40e633c5${_scopeId}><i class="bi bi-clipboard-plus" style="${ssrRenderStyle({ "font-size": "1.1rem" })}" data-v-40e633c5${_scopeId}></i></button></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if (unref(auth_user).roles_id == 99 || unref(auth_user).id == ((_a4 = stand.value) == null ? void 0 : _a4.pic_id)) {
                      _push2(`<div data-v-40e633c5${_scopeId}><button class="btn btn-sm btn-outline-danger border-0 p-1"${ssrIncludeBooleanAttr(((((_b4 = stand.value) == null ? void 0 : _b4.menu_lock) || 0) > 0 || (((_c4 = stand.value) == null ? void 0 : _c4.sale_validation) || 0) > 0) && unref(auth_user).roles_id != 99) ? " disabled" : ""} title="Delete Menu" data-v-40e633c5${_scopeId}><i class="bi bi-trash3" style="${ssrRenderStyle({ "font-size": "1.1rem" })}" data-v-40e633c5${_scopeId}></i></button></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div></div></div></div></li>`);
                  });
                  _push2(`<!--]--></ul>`);
                });
                _push2(`<!--]--></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (active_tab.value == 2 || isLargeScreen.value) {
                _push2(`<div class="col-12 col-lg-4" data-v-40e633c5${_scopeId}><div class="card bg-white p-2" data-v-40e633c5${_scopeId}><div class="d-flex mb-2" data-v-40e633c5${_scopeId}><span class="text-primary ms-2" data-v-40e633c5${_scopeId}><i class="bi bi-cart4 me-2 d-none d-lg-inline" data-v-40e633c5${_scopeId}></i>${ssrInterpolate("Expenses")}</span><div class="ms-auto me-2" data-v-40e633c5${_scopeId}>`);
                if (unref(auth_user).roles_id == 99 || stand.value.production.some(
                  (staff) => staff.id == unref(auth_user).id
                )) {
                  _push2(`<button class="${ssrRenderClass(
                    "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" ? "secondary disabled " : "primary")
                  )}" title="Add Expense" data-v-40e633c5${_scopeId}><i class="bi bi-plus-lg" data-v-40e633c5${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<button class="${ssrRenderClass(
                  "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" && unref(auth_user).roles_id != 99 ? "secondary disabled " : "primary")
                )}" title="Production Staff" data-v-40e633c5${_scopeId}><i class="bi bi-people" data-v-40e633c5${_scopeId}></i></button>`);
                if (unref(auth_user).roles_id == 3 || unref(auth_user).roles_id == 99) {
                  _push2(`<a href="/seeo/staff/operating/panel" class="btn btn-sm border-0 py-0 btn-outline-primary ms-1" title="Go to Operating Panel" data-v-40e633c5${_scopeId}><i class="bi bi-box-arrow-up-right" data-v-40e633c5${_scopeId}></i></a>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><div class="d-flex" data-v-40e633c5${_scopeId}><div class="input-group" data-v-40e633c5${_scopeId}><input type="text" class="form-control form-control-sm py-0" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1"${ssrRenderAttr("value", unref(form_filter_expense).name)} data-v-40e633c5${_scopeId}><span class="input-group-text py-0" id="basic-addon1" data-v-40e633c5${_scopeId}><i class="bi bi-search" style="${ssrRenderStyle({ "font-size": "0.9rem" })}" data-v-40e633c5${_scopeId}></i></span></div></div><div class="d-flex mb-1" data-v-40e633c5${_scopeId}><span class="text-secondary fst-italic mx-auto" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-40e633c5${_scopeId}><i class="bi bi-exclamation-triangle" data-v-40e633c5${_scopeId}></i> ${ssrInterpolate("Expenses must be validated to update stand expense.")}</span></div><div class="scroll-container-2 scroll-container-lg-2" data-v-40e633c5${_scopeId}><ul class="list-group list-group-flush" data-v-40e633c5${_scopeId}><!--[-->`);
                ssrRenderList(expense_list.value, (item) => {
                  var _a4;
                  _push2(`<li class="list-group-item list-group-item-action px-2 py-1" data-v-40e633c5${_scopeId}><div class="d-block" data-v-40e633c5${_scopeId}><div class="scroll-x-hidden mb-1" data-v-40e633c5${_scopeId}><span class="text-dark d-block"${ssrRenderAttr("title", (item == null ? void 0 : item.name) || "")} data-v-40e633c5${_scopeId}>${ssrInterpolate((item == null ? void 0 : item.name) || "")}</span><span class="rounded-3 text-primary-emphasis px-1" style="${ssrRenderStyle({ "font-size": "0.75rem" })}" data-v-40e633c5${_scopeId}>${ssrInterpolate("( " + item.qty + " )")}</span></div><div class="mb-1" data-v-40e633c5${_scopeId}><span class="text-secondary d-block" data-v-40e633c5${_scopeId}>${ssrInterpolate("- " + unref(formatIDR)(item.price) + "/" + item.unit)}</span><span class="text-primary d-block" data-v-40e633c5${_scopeId}>${ssrInterpolate(unref(formatIDR)(item.total_price))}</span></div><div class="d-flex gap-2" data-v-40e633c5${_scopeId}><button data-bs-toggle="modal" data-bs-target="#receiptModal" class="${ssrRenderClass("btn btn-sm border-0 btn-outline-secondary d-flex")}" data-v-40e633c5${_scopeId}>`);
                  if (item.operational_id == 0 || item.operational_id == null) {
                    _push2(`<i class="bi bi-exclamation text-danger" data-v-40e633c5${_scopeId}></i>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<i class="bi bi-receipt" data-v-40e633c5${_scopeId}></i></button>`);
                  if (is_production.value) {
                    _push2(`<button class="${ssrRenderClass(
                      "btn btn-sm border-0 " + ((((_a4 = stand.value) == null ? void 0 : _a4.sale_validation) || 0) > 0 ? "text-body-tertiary" : "btn-outline-secondary")
                    )}" data-v-40e633c5${_scopeId}><i class="bi bi-trash3" data-v-40e633c5${_scopeId}></i></button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div></li>`);
                });
                _push2(`<!--]--></ul></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (active_tab.value == 3 || isLargeScreen.value) {
                _push2(`<div class="col-12 col-lg-4" data-v-40e633c5${_scopeId}><div class="card bg-white p-2" data-v-40e633c5${_scopeId}><div class="d-flex mb-2" data-v-40e633c5${_scopeId}><span class="text-primary ms-2" data-v-40e633c5${_scopeId}><i class="bi bi-graph-up me-2 d-none d-lg-inline" data-v-40e633c5${_scopeId}></i>${ssrInterpolate("Income")}</span><div class="ms-auto me-2 d-flex gap-1" data-v-40e633c5${_scopeId}>`);
                if ((unref(auth_user).roles_id == 99 || unref(auth_user).roles_id == 3) && stand.value.sale_validation == 0) {
                  _push2(`<button class="btn btn-sm btn-success border-0 py-0" title="Validate Stand Sales" data-v-40e633c5${_scopeId}><i class="bi bi-check-all" data-v-40e633c5${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                if (unref(auth_user).roles_id == 99 || unref(auth_user).id == ((_l = stand.value) == null ? void 0 : _l.pic_id)) {
                  _push2(`<button class="${ssrRenderClass(
                    "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" && unref(auth_user).roles_id != 99 ? "secondary disabled" : "primary")
                  )}" title="Cashier Staff" data-v-40e633c5${_scopeId}><i class="bi bi-person-badge" data-v-40e633c5${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                if (unref(auth_user).roles_id == 99 || unref(auth_user).id == ((_m = stand.value) == null ? void 0 : _m.pic_id)) {
                  _push2(`<a${ssrRenderAttr("href", `/seeo/staff/blaterian/foods/cashier/${stand.value.id}`)} class="btn btn-sm btn-outline-info border-0 py-0" title="Open Cashier Panel" data-v-40e633c5${_scopeId}><i class="bi bi-cart-plus" data-v-40e633c5${_scopeId}></i></a>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><div class="d-flex" data-v-40e633c5${_scopeId}><div class="input-group" data-v-40e633c5${_scopeId}><input type="text" class="form-control form-control-sm py-0" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1"${ssrRenderAttr("value", unref(form_filter_income).name)} data-v-40e633c5${_scopeId}><span class="input-group-text py-0" id="basic-addon1" data-v-40e633c5${_scopeId}><i class="bi bi-search" style="${ssrRenderStyle({ "font-size": "0.9rem" })}" data-v-40e633c5${_scopeId}></i></span></div></div><div class="scroll-container-2 scroll-container-lg-2" data-v-40e633c5${_scopeId}><ul class="list-group list-group-flush" data-v-40e633c5${_scopeId}><!--[-->`);
                ssrRenderList(income_list.value, (item) => {
                  var _a4, _b4;
                  _push2(`<li class="list-group-item list-group-item-action px-2 py-1" data-v-40e633c5${_scopeId}><div class="d-block" data-v-40e633c5${_scopeId}><div class="scroll-x-hidden mb-1" data-v-40e633c5${_scopeId}><span class="text-dark d-block"${ssrRenderAttr("title", (_a4 = item.customer) == null ? void 0 : _a4.name)} data-v-40e633c5${_scopeId}>${ssrInterpolate(((_b4 = item.customer) == null ? void 0 : _b4.name) ?? "Unregistered")}</span><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.75rem" })}" data-v-40e633c5${_scopeId}>${ssrInterpolate(unref(formatTime)(item.created_at))}</span></div><span class="text-primary d-block mb-1" data-v-40e633c5${_scopeId}>${ssrInterpolate(unref(formatIDR)(item.transaction))}</span><div class="d-flex" data-v-40e633c5${_scopeId}><button class="btn btn-sm btn-outline-secondary border-0 ms-auto" data-v-40e633c5${_scopeId}><i class="bi bi-eye" data-v-40e633c5${_scopeId}></i></button></div></div></li>`);
                });
                _push2(`<!--]--></ul></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<div class="container me-lg-0 mx-auto mb-5" data-v-40e633c5${_scopeId}><div class="row gx-4 mt-4 mb-5" data-v-40e633c5${_scopeId}><div class="col-12" data-v-40e633c5${_scopeId}><div class="card bg-white p-3" data-v-40e633c5${_scopeId}><div class="d-flex justify-content-center align-items-center" style="${ssrRenderStyle({ "height": "200px" })}" data-v-40e633c5${_scopeId}><div class="text-center" data-v-40e633c5${_scopeId}><div class="spinner-border text-primary" role="status" data-v-40e633c5${_scopeId}><span class="visually-hidden" data-v-40e633c5${_scopeId}>Loading...</span></div><p class="mt-2 text-muted" data-v-40e633c5${_scopeId}>Loading stand data...</p></div></div></div></div></div></div>`);
            }
          } else {
            return [
              createVNode(unref(Head), {
                title: title.value,
                icon: "/favicon.ico"
              }, null, 8, ["title"]),
              createVNode(_sfc_main$3, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
              }, null, 512),
              createVNode(ModalAlertNotification, {
                ref_key: "modalAlertNotificationRef",
                ref: modalAlertNotificationRef
              }, null, 512),
              stand.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "container me-lg-0 mx-auto mb-5"
              }, [
                createVNode("div", { class: "row gx-4 mt-4 mb-5" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card bg-white p-3" }, [
                      createVNode("div", { class: "d-flex" }, [
                        createVNode("span", { class: "h5 text-primary-emphasis me-auto" }, [
                          createVNode("i", { class: "bi bi-shop me-2" }),
                          createTextVNode(toDisplayString("Stand " + (((_n = stand.value) == null ? void 0 : _n.name) || "Unknown")), 1)
                        ]),
                        createVNode("div", { class: "ms-auto d-flex gap-2" }, [
                          createVNode("button", {
                            onClick: ($event) => showWorkflowGuideModal(),
                            class: "btn btn-sm btn-outline-info border-0 py-0 mb-auto",
                            title: "Workflow Guide"
                          }, [
                            createVNode("i", { class: "bi bi-lightbulb-fill" })
                          ], 8, ["onClick"]),
                          unref(auth_user).roles_id == 3 || unref(auth_user).roles_id == 99 ? (openBlock(), createBlock("a", {
                            key: 0,
                            href: "/seeo/staff/operating/panel",
                            class: "btn btn-sm btn-outline-primary border-0 py-0 mb-auto",
                            title: "Go to Operating Panel"
                          }, [
                            createVNode("i", { class: "bi bi-box-arrow-up-right" })
                          ])) : createCommentVNode("", true),
                          unref(auth_user).roles_id == 99 || unref(auth_user).id == ((_o = stand.value) == null ? void 0 : _o.pic_id) ? (openBlock(), createBlock("button", {
                            key: 1,
                            onClick: () => {
                              var _a4, _b4, _c4, _d4, _e4;
                              showEditStandModal();
                              unref(form_edit_stand).name = ((_a4 = stand.value) == null ? void 0 : _a4.name) || null;
                              unref(form_edit_stand).pic_id = ((_b4 = stand.value) == null ? void 0 : _b4.pic_id) || null;
                              unref(form_edit_stand).place = ((_c4 = stand.value) == null ? void 0 : _c4.place) || null;
                              unref(form_edit_stand).date = ((_d4 = stand.value) == null ? void 0 : _d4.date) || null;
                              unref(form_edit_stand).type = ((_e4 = stand.value) == null ? void 0 : _e4.type) || null;
                            },
                            class: "btn btn-sm btn-outline-secondary border-0 py-0 mb-auto"
                          }, [
                            createVNode("span", { class: "d-none d-lg-block" }, "Edit"),
                            createVNode("i", { class: "bi bi-pencil d-lg-none" })
                          ], 8, ["onClick"])) : createCommentVNode("", true),
                          unref(auth_user).roles_id == 3 || unref(auth_user).roles_id == 99 ? (openBlock(), createBlock("button", {
                            key: 2,
                            onClick: ($event) => showDeleteStandModal(),
                            class: "btn btn-sm btn-outline-danger border-0 py-0 mb-auto"
                          }, [
                            createVNode("span", { class: "d-none d-lg-block" }, "Delete"),
                            createVNode("i", { class: "bi bi-trash3 d-lg-none" })
                          ], 8, ["onClick"])) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "row g-2 mt-1" }, [
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Person In Charge")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(((_p = stand.value.pic) == null ? void 0 : _p.name) || "Not Assigned"), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Status")),
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("div", { class: "scroll-x-hidden" }, [
                              createVNode("span", {
                                class: "d-block text-nowrap " + (stand_status.value == "Active" ? "text-success" : "text-primary-emphasis")
                              }, toDisplayString(stand_status.value), 3)
                            ]),
                            createVNode("span", {
                              class: "d-block text-nowrap px-2 ms-2 rounded " + (shop_status.value == "open" ? "text-white bg-success" : "text-secondary")
                            }, toDisplayString(shop_status.value), 3)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Place")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(((_q = stand.value) == null ? void 0 : _q.place) || "-"), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Date")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(((_r = stand.value) == null ? void 0 : _r.date) ? unref(formatDateOnly)(stand.value.date) : "-"), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Type")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(((_s = stand_type.find(
                              (item) => item.value == stand.value.type
                            )) == null ? void 0 : _s.name) || "Unknown Type"), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Profit")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(unref(formatIDR)(((_t = stand.value) == null ? void 0 : _t.profit) || 0)), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Income")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(unref(formatIDR)(((_u = stand.value) == null ? void 0 : _u.income) || 0)), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Expense")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(unref(formatIDR)(((_v = stand.value) == null ? void 0 : _v.expense) || 0)), 1)
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "row gx-4 mt-4" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card bg-white p-1 d-lg-none" }, [
                      createVNode("div", { class: "d-flex" }, [
                        createVNode("button", {
                          onClick: ($event) => showTab(1),
                          class: "btn btn-sm btn-outline-primary border-0 w-100 me-2"
                        }, [
                          active_tab.value == 1 ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString("Menu"))) : createCommentVNode("", true),
                          active_tab.value !== 1 ? (openBlock(), createBlock("i", {
                            key: 1,
                            class: "bi bi-list-ul"
                          })) : createCommentVNode("", true)
                        ], 8, ["onClick"]),
                        createVNode("button", {
                          onClick: ($event) => showTab(2),
                          class: "btn btn-sm btn-outline-primary border-0 w-100 me-2"
                        }, [
                          active_tab.value == 2 ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString("Expense"))) : createCommentVNode("", true),
                          active_tab.value !== 2 ? (openBlock(), createBlock("i", {
                            key: 1,
                            class: "bi bi-cart4"
                          })) : createCommentVNode("", true)
                        ], 8, ["onClick"]),
                        createVNode("button", {
                          onClick: ($event) => showTab(3),
                          class: "btn btn-sm btn-outline-primary border-0 w-100 me-2"
                        }, [
                          active_tab.value == 3 ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString("Income"))) : createCommentVNode("", true),
                          active_tab.value !== 3 ? (openBlock(), createBlock("i", {
                            key: 1,
                            class: "bi bi-graph-up"
                          })) : createCommentVNode("", true)
                        ], 8, ["onClick"])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "row gx-4 mt-4 mt-lg-0" }, [
                  createVNode(Transition, {
                    name: "fade-slide-ltr",
                    mode: "out-in",
                    onAfterLeave: ($event) => proceedTab()
                  }, {
                    default: withCtx(() => {
                      var _a4, _b4;
                      return [
                        active_tab.value == 1 || isLargeScreen.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "col-12 col-lg-4"
                        }, [
                          createVNode("div", { class: "card bg-white p-2" }, [
                            createVNode("div", { class: "d-flex pb-2" }, [
                              createVNode("span", { class: "text-primary ms-2" }, [
                                createVNode("i", { class: "bi bi-list-ul me-2 d-none d-lg-inline" }),
                                createTextVNode(toDisplayString("Menu"))
                              ]),
                              createVNode("div", { class: "ms-auto me-2 d-flex" }, [
                                createVNode("div", {
                                  onClick: ($event) => stand_status.value !== "Waiting for menu lock" && unref(auth_user).roles_id != 99 ? stand_status.value == "Active" ? alertNotification(
                                    "You can`t change menu list after being locked by Operational Staff."
                                  ) : alertNotification(
                                    "This stand is inactive. All feature are locked."
                                  ) : ""
                                }, [
                                  unref(auth_user).roles_id == 99 || unref(auth_user).id == ((_a4 = stand.value) == null ? void 0 : _a4.pic_id) ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    onClick: ($event) => stand_status.value == "Waiting for menu lock" || unref(auth_user).roles_id == 99 ? showAddMenuModal() : "",
                                    class: "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value !== "Waiting for menu lock" && unref(auth_user).roles_id != 99 ? "secondary disabled" : "primary"),
                                    title: "Add Menu"
                                  }, [
                                    createVNode("i", { class: "bi bi-plus-lg" })
                                  ], 10, ["onClick"])) : createCommentVNode("", true),
                                  unref(auth_user).roles_id == 10 || unref(auth_user).roles_id == 99 ? (openBlock(), createBlock("a", {
                                    key: 1,
                                    href: _ctx.window.route("staff.sales-distribution.index"),
                                    class: "btn btn-sm border-0 py-0 btn-outline-primary ms-1",
                                    title: "Go to Sales Distribution Panel"
                                  }, [
                                    createVNode("i", { class: "bi bi-box-arrow-up-right" })
                                  ], 8, ["href"])) : createCommentVNode("", true)
                                ], 8, ["onClick"]),
                                (unref(auth_user).roles_id == 99 || unref(auth_user).id == ((_b4 = stand.value) == null ? void 0 : _b4.pic_id)) && (unref(auth_user).roles_id == 3 || unref(auth_user).roles_id == 99) ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "border-start border-2 mt-1 mx-1"
                                })) : createCommentVNode("", true),
                                createVNode("div", {
                                  onClick: ($event) => stand_status.value == "Inactive" && unref(auth_user).roles_id != 99 ? alertNotification(
                                    "This stand is inactive. All feature are locked."
                                  ) : ""
                                }, [
                                  unref(auth_user).roles_id == 3 || unref(auth_user).roles_id == 10 || unref(auth_user).roles_id == 99 ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    onClick: ($event) => {
                                      var _a5;
                                      return menu_category.value ? stand_status.value == "Inactive" ? "" : confirmation(
                                        `/seeo/staff/food/stand/menu/lock/${stand.value.id}`,
                                        "Are you sure want to " + (stand.value.menu_lock > 0 ? "unlock" : "lock") + " the menu list of Stand " + (((_a5 = stand.value) == null ? void 0 : _a5.name) || "") + "?"
                                      ) : alertNotification(
                                        "Please create a menu"
                                      );
                                    },
                                    class: "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" && unref(auth_user).roles_id != 99 ? "secondary disabled" : "success")
                                  }, [
                                    createVNode("i", {
                                      class: "bi bi-" + (stand.value.menu_lock > 0 ? "lock-fill" : "unlock")
                                    }, null, 2)
                                  ], 10, ["onClick"])) : createCommentVNode("", true)
                                ], 8, ["onClick"])
                              ])
                            ]),
                            createVNode("div", { class: "scroll-container-3 scroll-container-lg-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(menu_category.value, (menu_list, key) => {
                                return openBlock(), createBlock("ul", { class: "list-group list-group-flush mb-2" }, [
                                  createVNode("li", { class: "list-group-item list-group-item-light px-2 py-1" }, [
                                    createVNode("span", { class: "text-secondary" }, toDisplayString(key), 1)
                                  ]),
                                  (openBlock(true), createBlock(Fragment, null, renderList(menu_list, (item) => {
                                    var _a5, _b5, _c4;
                                    return openBlock(), createBlock("li", { class: "list-group-item list-group-item-action px-2 py-1" }, [
                                      createVNode("div", { class: "p-1" }, [
                                        createVNode("div", { class: "d-flex" }, [
                                          createVNode("div", {
                                            class: "border-2 border-primary-subtle rounded-3 overflow-hidden d-flex align-items-center justify-content-center bg-light",
                                            style: { "width": "85px", "height": "85px", "flex-shrink": "0" }
                                          }, [
                                            createVNode("img", {
                                              src: item.image ? "/storage/images/shop/foods/menu/" + item.image : "/storage/images/shop/foods/menu/default.png",
                                              alt: "image",
                                              class: "img-fluid",
                                              style: { "object-fit": "cover", "width": "100%", "height": "100%", "opacity": "0", "transition": "opacity 0.3s" },
                                              onLoad: showImage
                                            }, null, 40, ["src"])
                                          ]),
                                          createVNode("div", {
                                            class: "ps-2",
                                            style: { "width": "80%" }
                                          }, [
                                            createVNode("div", { class: "scroll-x-hidden mb-1" }, [
                                              createVNode("span", {
                                                class: "text-primary-emphasis d-block",
                                                title: (item == null ? void 0 : item.name) || ""
                                              }, toDisplayString((item == null ? void 0 : item.name) || ""), 9, ["title"])
                                            ]),
                                            createVNode("div", { class: "mb-1" }, [
                                              createVNode("span", { class: "text-secondary d-block" }, toDisplayString((item.volume > 0 ? item.volume + item.volume_unit + " " : "") + (item.volume > 0 || item.mass > 0 ? "- " : "") + (item.mass > 0 ? item.mass + item.mass_unit + " " : "")), 1),
                                              createVNode("span", { class: "text-primary d-block" }, toDisplayString(unref(formatIDR)(item.price)), 1)
                                            ]),
                                            createVNode("span", { class: "rounded-3 text-dark px-1 text-nowrap d-block mb-2" }, [
                                              createTextVNode(toDisplayString("( ") + " "),
                                              createVNode("span", {
                                                class: "text-secondary",
                                                style: { "font-size": "0.8rem" }
                                              }, toDisplayString("sold:")),
                                              createTextVNode(" " + toDisplayString(item.sale + " / ") + " ", 1),
                                              createVNode("span", {
                                                class: "text-secondary",
                                                style: { "font-size": "0.8rem" }
                                              }, toDisplayString("stock:")),
                                              createTextVNode(" " + toDisplayString(item.stock + " )"), 1)
                                            ]),
                                            createVNode("div", { class: "mb-2" }, [
                                              Array.isArray(item.recipe_components) && item.recipe_components.length > 0 ? (openBlock(), createBlock("span", {
                                                key: 0,
                                                class: "badge bg-success-subtle text-success border border-success border-opacity-25 d-inline-flex align-items-center",
                                                style: { "font-size": "0.65rem" }
                                              }, [
                                                createVNode("i", { class: "bi bi-check-all me-1" }),
                                                createTextVNode(toDisplayString((item.recipe_components || []).length) + " Ingredients ", 1),
                                                createVNode("span", { class: "ms-1 border-start ps-1 border-success border-opacity-25" }, "Modal: " + toDisplayString(unref(formatIDR)((item.recipe_components || []).reduce((acc, curr) => {
                                                  var _a6;
                                                  const cost = parseFloat(curr.price > 0 ? curr.price : ((_a6 = curr.expense) == null ? void 0 : _a6.price) ?? 0);
                                                  return acc + parseFloat(curr.quantity_used || 0) * cost;
                                                }, 0))), 1),
                                                createVNode("span", { class: "ms-1 border-start ps-1 border-success border-opacity-25 text-primary" }, "Untung: " + toDisplayString(unref(formatIDR)(parseFloat(item.price || 0) - (item.recipe_components || []).reduce((acc, curr) => {
                                                  var _a6;
                                                  const cost = parseFloat(curr.price > 0 ? curr.price : ((_a6 = curr.expense) == null ? void 0 : _a6.price) ?? 0);
                                                  return acc + parseFloat(curr.quantity_used || 0) * cost;
                                                }, 0))), 1)
                                              ])) : (openBlock(), createBlock("span", {
                                                key: 1,
                                                class: "badge bg-warning text-dark",
                                                style: { "font-size": "0.65rem" },
                                                title: "Belum ada ingredient"
                                              }, [
                                                createVNode("i", { class: "bi bi-exclamation-triangle me-1" }),
                                                createTextVNode("No Ingredients ")
                                              ]))
                                            ]),
                                            createVNode("div", { class: "d-flex mt-auto flex-wrap gap-1" }, [
                                              unref(auth_user).roles_id == 99 || unref(auth_user).roles_id == 10 || unref(auth_user).roles_id == 3 ? (openBlock(), createBlock("div", { key: 0 }, [
                                                createVNode("button", {
                                                  onClick: ($event) => showEditMenuModal(true, item),
                                                  class: "btn btn-sm btn-outline-primary border-0 p-1",
                                                  title: "Edit Details"
                                                }, [
                                                  createVNode("i", {
                                                    class: "bi bi-pencil-square",
                                                    style: { "font-size": "1.1rem" }
                                                  })
                                                ], 8, ["onClick"])
                                              ])) : createCommentVNode("", true),
                                              createVNode("div", null, [
                                                createVNode("button", {
                                                  onClick: ($event) => showEditMenuImageModal(true, item),
                                                  class: "btn btn-sm btn-outline-secondary border-0 p-1",
                                                  disabled: stand.value.sale_validation > 0 && unref(auth_user).roles_id != 99,
                                                  title: "Update Image"
                                                }, [
                                                  createVNode("i", {
                                                    class: "bi bi-image",
                                                    style: { "font-size": "1.1rem" }
                                                  })
                                                ], 8, ["onClick", "disabled"])
                                              ]),
                                              createVNode("div", null, [
                                                createVNode("button", {
                                                  onClick: ($event) => showAddStockModal(true, item),
                                                  class: "btn btn-sm btn-outline-secondary border-0 p-1",
                                                  disabled: stand.value.sale_validation > 0 && unref(auth_user).roles_id != 99,
                                                  title: "Add Stock"
                                                }, [
                                                  createVNode("i", {
                                                    class: "bi bi-box-seam",
                                                    style: { "font-size": "1.1rem" }
                                                  })
                                                ], 8, ["onClick", "disabled"])
                                              ]),
                                              unref(auth_user).roles_id == 99 || unref(auth_user).roles_id == 10 || is_production.value ? (openBlock(), createBlock("div", { key: 1 }, [
                                                createVNode("button", {
                                                  class: "btn btn-sm btn-outline-success border-0 p-1",
                                                  onClick: ($event) => showAttachRecipeModal(true, item),
                                                  disabled: stand.value.sale_validation > 0 && unref(auth_user).roles_id != 99,
                                                  title: "Set Ingredients"
                                                }, [
                                                  createVNode("i", {
                                                    class: "bi bi-clipboard-plus",
                                                    style: { "font-size": "1.1rem" }
                                                  })
                                                ], 8, ["onClick", "disabled"])
                                              ])) : createCommentVNode("", true),
                                              unref(auth_user).roles_id == 99 || unref(auth_user).id == ((_a5 = stand.value) == null ? void 0 : _a5.pic_id) ? (openBlock(), createBlock("div", { key: 2 }, [
                                                createVNode("button", {
                                                  class: "btn btn-sm btn-outline-danger border-0 p-1",
                                                  onClick: ($event) => confirmation(`/seeo/staff/food/stand/menu/delete/${item.id}`, "Remove " + item.name + "?"),
                                                  disabled: ((((_b5 = stand.value) == null ? void 0 : _b5.menu_lock) || 0) > 0 || (((_c4 = stand.value) == null ? void 0 : _c4.sale_validation) || 0) > 0) && unref(auth_user).roles_id != 99,
                                                  title: "Delete Menu"
                                                }, [
                                                  createVNode("i", {
                                                    class: "bi bi-trash3",
                                                    style: { "font-size": "1.1rem" }
                                                  })
                                                ], 8, ["onClick", "disabled"])
                                              ])) : createCommentVNode("", true)
                                            ])
                                          ])
                                        ])
                                      ])
                                    ]);
                                  }), 256))
                                ]);
                              }), 256))
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ];
                    }),
                    _: 1
                  }, 8, ["onAfterLeave"]),
                  createVNode(Transition, {
                    name: "fade-slide-" + (next_tab.value > 2 || prev_tab.value > 2 ? "ltr" : "rtl"),
                    mode: "out-in",
                    onAfterLeave: ($event) => proceedTab()
                  }, {
                    default: withCtx(() => [
                      active_tab.value == 2 || isLargeScreen.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "col-12 col-lg-4"
                      }, [
                        createVNode("div", { class: "card bg-white p-2" }, [
                          createVNode("div", { class: "d-flex mb-2" }, [
                            createVNode("span", { class: "text-primary ms-2" }, [
                              createVNode("i", { class: "bi bi-cart4 me-2 d-none d-lg-inline" }),
                              createTextVNode(toDisplayString("Expenses"))
                            ]),
                            createVNode("div", {
                              class: "ms-auto me-2",
                              onClick: ($event) => stand_status.value == "Inactive" ? alertNotification(
                                "This stand is inactive. All feature are locked."
                              ) : ""
                            }, [
                              unref(auth_user).roles_id == 99 || stand.value.production.some(
                                (staff) => staff.id == unref(auth_user).id
                              ) ? (openBlock(), createBlock("button", {
                                key: 0,
                                onClick: ($event) => stand_status.value == "Inactive" ? "" : showAddExpenseModal(),
                                class: "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" ? "secondary disabled " : "primary"),
                                title: "Add Expense"
                              }, [
                                createVNode("i", { class: "bi bi-plus-lg" })
                              ], 10, ["onClick"])) : createCommentVNode("", true),
                              createVNode("button", {
                                onClick: ($event) => stand_status.value == "Inactive" && unref(auth_user).roles_id != 99 ? "" : showProductionStaffModal(),
                                class: "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" && unref(auth_user).roles_id != 99 ? "secondary disabled " : "primary"),
                                title: "Production Staff"
                              }, [
                                createVNode("i", { class: "bi bi-people" })
                              ], 10, ["onClick"]),
                              unref(auth_user).roles_id == 3 || unref(auth_user).roles_id == 99 ? (openBlock(), createBlock("a", {
                                key: 1,
                                href: "/seeo/staff/operating/panel",
                                class: "btn btn-sm border-0 py-0 btn-outline-primary ms-1",
                                title: "Go to Operating Panel"
                              }, [
                                createVNode("i", { class: "bi bi-box-arrow-up-right" })
                              ])) : createCommentVNode("", true)
                            ], 8, ["onClick"])
                          ]),
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("div", { class: "input-group" }, [
                              withDirectives(createVNode("input", {
                                type: "text",
                                class: "form-control form-control-sm py-0",
                                placeholder: "Search",
                                "aria-label": "Search",
                                "aria-describedby": "basic-addon1",
                                "onUpdate:modelValue": ($event) => unref(form_filter_expense).name = $event,
                                onInput: handleFilterExpense
                              }, null, 40, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form_filter_expense).name]
                              ]),
                              createVNode("span", {
                                class: "input-group-text py-0",
                                id: "basic-addon1"
                              }, [
                                createVNode("i", {
                                  class: "bi bi-search",
                                  style: { "font-size": "0.9rem" }
                                })
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "d-flex mb-1" }, [
                            createVNode("span", {
                              class: "text-secondary fst-italic mx-auto",
                              style: { "font-size": "0.8rem" }
                            }, [
                              createVNode("i", { class: "bi bi-exclamation-triangle" }),
                              createTextVNode(" " + toDisplayString("Expenses must be validated to update stand expense."))
                            ])
                          ]),
                          createVNode("div", { class: "scroll-container-2 scroll-container-lg-2" }, [
                            createVNode("ul", { class: "list-group list-group-flush" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(expense_list.value, (item) => {
                                var _a4;
                                return openBlock(), createBlock("li", { class: "list-group-item list-group-item-action px-2 py-1" }, [
                                  createVNode("div", { class: "d-block" }, [
                                    createVNode("div", { class: "scroll-x-hidden mb-1" }, [
                                      createVNode("span", {
                                        class: "text-dark d-block",
                                        title: (item == null ? void 0 : item.name) || ""
                                      }, toDisplayString((item == null ? void 0 : item.name) || ""), 9, ["title"]),
                                      createVNode("span", {
                                        class: "rounded-3 text-primary-emphasis px-1",
                                        style: { "font-size": "0.75rem" }
                                      }, toDisplayString("( " + item.qty + " )"), 1)
                                    ]),
                                    createVNode("div", { class: "mb-1" }, [
                                      createVNode("span", { class: "text-secondary d-block" }, toDisplayString("- " + unref(formatIDR)(item.price) + "/" + item.unit), 1),
                                      createVNode("span", { class: "text-primary d-block" }, toDisplayString(unref(formatIDR)(item.total_price)), 1)
                                    ]),
                                    createVNode("div", { class: "d-flex gap-2" }, [
                                      createVNode("button", {
                                        "data-bs-toggle": "modal",
                                        "data-bs-target": "#receiptModal",
                                        class: "btn btn-sm border-0 btn-outline-secondary d-flex",
                                        onClick: ($event) => selectExpense(item)
                                      }, [
                                        item.operational_id == 0 || item.operational_id == null ? (openBlock(), createBlock("i", {
                                          key: 0,
                                          class: "bi bi-exclamation text-danger"
                                        })) : createCommentVNode("", true),
                                        createVNode("i", { class: "bi bi-receipt" })
                                      ], 8, ["onClick"]),
                                      is_production.value ? (openBlock(), createBlock("button", {
                                        key: 0,
                                        class: "btn btn-sm border-0 " + ((((_a4 = stand.value) == null ? void 0 : _a4.sale_validation) || 0) > 0 ? "text-body-tertiary" : "btn-outline-secondary"),
                                        onClick: () => {
                                          var _a5, _b4;
                                          if ((((_a5 = stand.value) == null ? void 0 : _a5.sale_validation) || 0) > 0) {
                                            alertNotification("This stand is inactive. All feature are disabled.");
                                          } else {
                                            confirmation(
                                              `/seeo/staff/food/stand/expense/delete/${item.id}`,
                                              "Are you sure want to delete " + ((item == null ? void 0 : item.name) || "") + " from Stand " + (((_b4 = stand.value) == null ? void 0 : _b4.name) || "") + "?"
                                            );
                                          }
                                        }
                                      }, [
                                        createVNode("i", { class: "bi bi-trash3" })
                                      ], 10, ["onClick"])) : createCommentVNode("", true)
                                    ])
                                  ])
                                ]);
                              }), 256))
                            ])
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["name", "onAfterLeave"]),
                  createVNode(Transition, {
                    name: "fade-slide-" + (next_tab.value > 1 || prev_tab.value > 1 ? "ltr" : "rtl"),
                    mode: "out-in",
                    onAfterLeave: ($event) => proceedTab()
                  }, {
                    default: withCtx(() => {
                      var _a4, _b4;
                      return [
                        active_tab.value == 3 || isLargeScreen.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "col-12 col-lg-4"
                        }, [
                          createVNode("div", { class: "card bg-white p-2" }, [
                            createVNode("div", { class: "d-flex mb-2" }, [
                              createVNode("span", { class: "text-primary ms-2" }, [
                                createVNode("i", { class: "bi bi-graph-up me-2 d-none d-lg-inline" }),
                                createTextVNode(toDisplayString("Income"))
                              ]),
                              createVNode("div", { class: "ms-auto me-2 d-flex gap-1" }, [
                                (unref(auth_user).roles_id == 99 || unref(auth_user).roles_id == 3) && stand.value.sale_validation == 0 ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => confirmation(`/seeo/staff/food/stand/sales/validate/${stand.value.id}`, "Finalize and validate all sales for this stand?"),
                                  class: "btn btn-sm btn-success border-0 py-0",
                                  title: "Validate Stand Sales"
                                }, [
                                  createVNode("i", { class: "bi bi-check-all" })
                                ], 8, ["onClick"])) : createCommentVNode("", true),
                                unref(auth_user).roles_id == 99 || unref(auth_user).id == ((_a4 = stand.value) == null ? void 0 : _a4.pic_id) ? (openBlock(), createBlock("button", {
                                  key: 1,
                                  onClick: ($event) => stand_status.value == "Inactive" && unref(auth_user).roles_id != 99 ? "" : showCashierStaffModal(),
                                  class: "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" && unref(auth_user).roles_id != 99 ? "secondary disabled" : "primary"),
                                  title: "Cashier Staff"
                                }, [
                                  createVNode("i", { class: "bi bi-person-badge" })
                                ], 10, ["onClick"])) : createCommentVNode("", true),
                                unref(auth_user).roles_id == 99 || unref(auth_user).id == ((_b4 = stand.value) == null ? void 0 : _b4.pic_id) ? (openBlock(), createBlock("a", {
                                  key: 2,
                                  href: `/seeo/staff/blaterian/foods/cashier/${stand.value.id}`,
                                  class: "btn btn-sm btn-outline-info border-0 py-0",
                                  title: "Open Cashier Panel"
                                }, [
                                  createVNode("i", { class: "bi bi-cart-plus" })
                                ], 8, ["href"])) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("div", { class: "d-flex" }, [
                              createVNode("div", { class: "input-group" }, [
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  class: "form-control form-control-sm py-0",
                                  placeholder: "Search",
                                  "aria-label": "Search",
                                  "aria-describedby": "basic-addon1",
                                  "onUpdate:modelValue": ($event) => unref(form_filter_income).name = $event,
                                  onInput: handleFilterIncome
                                }, null, 40, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form_filter_income).name]
                                ]),
                                createVNode("span", {
                                  class: "input-group-text py-0",
                                  id: "basic-addon1"
                                }, [
                                  createVNode("i", {
                                    class: "bi bi-search",
                                    style: { "font-size": "0.9rem" }
                                  })
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "scroll-container-2 scroll-container-lg-2" }, [
                              createVNode("ul", { class: "list-group list-group-flush" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(income_list.value, (item) => {
                                  var _a5, _b5;
                                  return openBlock(), createBlock("li", { class: "list-group-item list-group-item-action px-2 py-1" }, [
                                    createVNode("div", { class: "d-block" }, [
                                      createVNode("div", { class: "scroll-x-hidden mb-1" }, [
                                        createVNode("span", {
                                          class: "text-dark d-block",
                                          title: (_a5 = item.customer) == null ? void 0 : _a5.name
                                        }, toDisplayString(((_b5 = item.customer) == null ? void 0 : _b5.name) ?? "Unregistered"), 9, ["title"]),
                                        createVNode("span", {
                                          class: "text-secondary d-block",
                                          style: { "font-size": "0.75rem" }
                                        }, toDisplayString(unref(formatTime)(item.created_at)), 1)
                                      ]),
                                      createVNode("span", { class: "text-primary d-block mb-1" }, toDisplayString(unref(formatIDR)(item.transaction)), 1),
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("button", {
                                          class: "btn btn-sm btn-outline-secondary border-0 ms-auto",
                                          onClick: ($event) => selectIncome(item)
                                        }, [
                                          createVNode("i", { class: "bi bi-eye" })
                                        ], 8, ["onClick"])
                                      ])
                                    ])
                                  ]);
                                }), 256))
                              ])
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ];
                    }),
                    _: 1
                  }, 8, ["name", "onAfterLeave"])
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "container me-lg-0 mx-auto mb-5"
              }, [
                createVNode("div", { class: "row gx-4 mt-4 mb-5" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card bg-white p-3" }, [
                      createVNode("div", {
                        class: "d-flex justify-content-center align-items-center",
                        style: { "height": "200px" }
                      }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", {
                            class: "spinner-border text-primary",
                            role: "status"
                          }, [
                            createVNode("span", { class: "visually-hidden" }, "Loading...")
                          ]),
                          createVNode("p", { class: "mt-2 text-muted" }, "Loading stand data...")
                        ])
                      ])
                    ])
                  ])
                ])
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="modal fade" id="editStandModal" tabindex="-1" aria-labelledby="editStandModalLabel" aria-hidden="true" data-v-40e633c5><div class="modal-dialog modal-dialog-centered" data-v-40e633c5><div class="modal-content" data-v-40e633c5><div class="modal-header" data-v-40e633c5><h5 class="modal-title" id="editStandModalLabel" data-v-40e633c5>${ssrInterpolate("Edit Stand")}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-40e633c5></button></div><div class="modal-body" data-v-40e633c5>`);
      if (unref(form_edit_stand)) {
        _push(`<form data-v-40e633c5><div class="mb-3" data-v-40e633c5><label for="editStandName" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Stand Name")}</label><input${ssrRenderAttr("value", unref(form_edit_stand).name)} type="text" class="form-control form-control-sm" id="editStandName" required data-v-40e633c5>`);
        _push(ssrRenderComponent(_sfc_main$4, {
          message: errors.value.name,
          class: "mt-2"
        }, null, _parent));
        _push(`</div><div class="mb-3" data-v-40e633c5><label for="editStandPIC" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Person In Charge")}</label>`);
        if (unref(form_edit_stand)) {
          _push(ssrRenderComponent(unref(vSelect), {
            modelValue: unref(form_edit_stand).pic_id,
            "onUpdate:modelValue": ($event) => unref(form_edit_stand).pic_id = $event,
            options: users.value,
            reduce: (user) => user == null ? void 0 : user.id,
            getOptionLabel: safeNameLabel,
            label: "name",
            id: "editStandPIC",
            class: ["basic-single", {
              "is-invalid": errors.value.pic_id
            }],
            placeholder: "Select PIC",
            disabled: unref(auth_user).roles_id == 3 || unref(auth_user).roles_id == 99 || stand_status.value !== "Waiting for menu lock"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_sfc_main$4, {
          message: errors.value.pic_id,
          class: "mt-2"
        }, null, _parent));
        _push(`</div><div class="mb-3" data-v-40e633c5><label for="editStandPlace" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Place")}</label><input${ssrRenderAttr("value", unref(form_edit_stand).place)} type="text" class="form-control form-control-sm" id="editStandPlace" required data-v-40e633c5>`);
        _push(ssrRenderComponent(_sfc_main$4, {
          message: errors.value.place,
          class: "mt-2"
        }, null, _parent));
        _push(`</div><div class="mb-3" data-v-40e633c5><label for="editStandDate" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Date")}</label><input${ssrRenderAttr("value", unref(form_edit_stand).date)} type="date" class="form-control form-control-sm" id="editStandDate" required data-v-40e633c5>`);
        _push(ssrRenderComponent(_sfc_main$4, {
          message: errors.value.date,
          class: "mt-2"
        }, null, _parent));
        _push(`</div><div class="mb-4" data-v-40e633c5><label for="editStandType" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Type")}</label>`);
        if (unref(form_edit_stand)) {
          _push(`<select class="form-select form-select-sm" id="editStandType" required data-v-40e633c5><!--[-->`);
          ssrRenderList(stand_type, (type) => {
            _push(`<option${ssrRenderAttr("value", type.value)} data-v-40e633c5${ssrIncludeBooleanAttr(Array.isArray(unref(form_edit_stand).type) ? ssrLooseContain(unref(form_edit_stand).type, type.value) : ssrLooseEqual(unref(form_edit_stand).type, type.value)) ? " selected" : ""}>${ssrInterpolate(type.name)}</option>`);
          });
          _push(`<!--]--></select>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_sfc_main$4, {
          message: errors.value.type,
          class: "mt-2"
        }, null, _parent));
        _push(`</div><div class="d-flex justify-content-end" data-v-40e633c5><button type="button" class="btn btn-secondary btn-sm me-2" data-bs-dismiss="modal" data-v-40e633c5>${ssrInterpolate("Close")}</button><button type="submit" class="btn btn-primary btn-sm" data-v-40e633c5>${ssrInterpolate("Save Changes")}</button></div></form>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><div class="modal fade" id="deleteStandModal" tabindex="-1" aria-labelledby="deleteStandModalLabel" aria-hidden="true" data-v-40e633c5><div class="modal-dialog modal-dialog-centered" data-v-40e633c5><div class="modal-content" data-v-40e633c5><div class="modal-header" data-v-40e633c5><h5 class="modal-title" id="deleteStandModalLabel" data-v-40e633c5>${ssrInterpolate("Delete Stand")}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-40e633c5></button></div><div class="modal-body" data-v-40e633c5><p class="mb-0" data-v-40e633c5>${ssrInterpolate("Are you sure you want to delete this stand?")}</p><p class="text-danger" style="${ssrRenderStyle({ "font-size": "0.9rem" })}" data-v-40e633c5>${ssrInterpolate("This action cannot be undone.")}</p><form data-v-40e633c5><div class="mb-3" data-v-40e633c5><label for="deleteStandPassword" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Confirm with Password")}</label><input${ssrRenderAttr("value", unref(form_delete_stand).password)} type="password" class="form-control form-control-sm" id="deleteStandPassword" required data-v-40e633c5>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        message: errors.value.password,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="d-flex justify-content-end" data-v-40e633c5><button type="button" class="btn btn-secondary btn-sm me-2" data-bs-dismiss="modal" data-v-40e633c5>${ssrInterpolate("Close")}</button><button type="submit" class="btn btn-danger btn-sm" data-v-40e633c5>${ssrInterpolate("Delete Stand")}</button></div></form></div></div></div></div><div class="modal fade" id="attachRecipeModal" tabindex="-1" aria-labelledby="attachRecipeModalLabel" aria-hidden="true" data-v-40e633c5><div class="modal-dialog modal-dialog-centered modal-lg" data-v-40e633c5><div class="modal-content" data-v-40e633c5><div class="modal-header" data-v-40e633c5><h5 class="modal-title" id="attachRecipeModalLabel" data-v-40e633c5>Set Ingredients for ${ssrInterpolate(((_a2 = selected_menu.value) == null ? void 0 : _a2.name) || "Menu")}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-40e633c5></button></div><div class="modal-body" data-v-40e633c5><p class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-40e633c5>Input penggunaan bahan per 1 porsi menu. Hanya bahan yang sudah tervalidasi (operational) ditampilkan.</p>`);
      if (unref(form_attach_recipe).components.length > 0) {
        _push(`<div class="table-responsive" style="${ssrRenderStyle({ "max-height": "50vh" })}" data-v-40e633c5><table class="table table-sm align-middle" data-v-40e633c5><thead class="table-light" style="${ssrRenderStyle({ "position": "sticky", "top": "0" })}" data-v-40e633c5><tr data-v-40e633c5><th style="${ssrRenderStyle({ "width": "25%" })}" data-v-40e633c5>Ingredient</th><th style="${ssrRenderStyle({ "width": "15%" })}" data-v-40e633c5>Unit</th><th style="${ssrRenderStyle({ "width": "15%" })}" data-v-40e633c5>Purchase Cost/Unit</th><th style="${ssrRenderStyle({ "width": "15%" })}" data-v-40e633c5>Qty Purchase</th><th style="${ssrRenderStyle({ "width": "15%" })}" data-v-40e633c5>Used / Portion</th><th style="${ssrRenderStyle({ "width": "15%" })}" data-v-40e633c5>Action</th></tr></thead><tbody data-v-40e633c5><!--[-->`);
        ssrRenderList(unref(form_attach_recipe).components, (comp) => {
          _push(`<tr data-v-40e633c5><td data-v-40e633c5><span class="text-primary-emphasis d-block fw-medium"${ssrRenderAttr("title", comp.name)} data-v-40e633c5>${ssrInterpolate(comp.name)}</span></td><td data-v-40e633c5><span class="text-secondary small" data-v-40e633c5>${ssrInterpolate(comp.unit)}</span></td><td data-v-40e633c5><span class="text-dark small" data-v-40e633c5>${ssrInterpolate(unref(formatIDR)(comp.price))}</span></td><td data-v-40e633c5><span class="text-secondary small" data-v-40e633c5>${ssrInterpolate(comp.qty)}</span></td><td data-v-40e633c5><div class="input-group input-group-sm" data-v-40e633c5><input type="number" min="0" step="0.001" class="form-control"${ssrRenderAttr("value", comp.quantity_used)} data-v-40e633c5><span class="input-group-text" data-v-40e633c5>${ssrInterpolate(comp.unit)}</span></div></td><td class="text-end" data-v-40e633c5><div class="small fw-bold text-primary" data-v-40e633c5>${ssrInterpolate(unref(formatIDR)(Math.round(comp.quantity_used * comp.price)))}</div><button class="btn btn-sm btn-link text-danger p-0 border-0" type="button" title="Clear" data-v-40e633c5><i class="bi bi-trash-fill" style="${ssrRenderStyle({ "font-size": "0.75rem" })}" data-v-40e633c5></i></button></td></tr>`);
        });
        _push(`<!--]--></tbody><tfoot class="table-light" data-v-40e633c5><tr data-v-40e633c5><td colspan="4" class="text-end fw-bold" data-v-40e633c5>Total Modal / Porsi:</td><td colspan="2" class="text-end fw-bold text-danger" data-v-40e633c5>${ssrInterpolate(unref(formatIDR)(unref(form_attach_recipe).components.reduce((acc, curr) => acc + curr.quantity_used * curr.price, 0)))}</td></tr><tr data-v-40e633c5><td colspan="4" class="text-end fw-bold" data-v-40e633c5>Harga Jual:</td><td colspan="2" class="text-end fw-bold text-primary" data-v-40e633c5>${ssrInterpolate(unref(formatIDR)(((_b2 = selected_menu.value) == null ? void 0 : _b2.price) || 0))}</td></tr><tr class="table-success border-top border-2 border-success border-opacity-25" data-v-40e633c5><td colspan="4" class="text-end fw-bold" data-v-40e633c5>Estimasi Keuntungan / Porsi:</td><td colspan="2" class="${ssrRenderClass([(((_c2 = selected_menu.value) == null ? void 0 : _c2.price) || 0) - unref(form_attach_recipe).components.reduce((acc, curr) => acc + curr.quantity_used * curr.price, 0) >= 0 ? "text-success" : "text-danger", "text-end fw-bold"])}" data-v-40e633c5>${ssrInterpolate(unref(formatIDR)((((_d2 = selected_menu.value) == null ? void 0 : _d2.price) || 0) - unref(form_attach_recipe).components.reduce((acc, curr) => acc + curr.quantity_used * curr.price, 0)))}</td></tr></tfoot></table></div>`);
      } else {
        _push(`<div class="text-center py-3" data-v-40e633c5><span class="text-secondary" data-v-40e633c5>Tidak ada expense tervalidasi untuk dijadikan bahan.</span></div>`);
      }
      _push(`</div><div class="modal-footer" data-v-40e633c5><button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" data-v-40e633c5>Close</button><button type="button" class="btn btn-primary btn-sm"${ssrIncludeBooleanAttr(!selected_menu.value) ? " disabled" : ""} data-v-40e633c5>Save Ingredients</button></div></div></div></div><div class="modal fade" id="editMenuModal" tabindex="-1" aria-hidden="true" data-v-40e633c5><div class="modal-dialog modal-dialog-centered" data-v-40e633c5><div class="modal-content border-0 shadow-lg" data-v-40e633c5><div class="modal-header bg-primary text-white border-0" data-v-40e633c5><h5 class="modal-title fw-bold" data-v-40e633c5>Edit Menu Details</h5><button type="button" class="btn-close btn-close-white" data-v-40e633c5></button></div><form data-v-40e633c5><div class="modal-body p-4" data-v-40e633c5><div class="mb-3" data-v-40e633c5><label class="form-label fw-bold small text-muted" data-v-40e633c5>MENU NAME</label><input type="text"${ssrRenderAttr("value", unref(form_edit_menu).name)} class="form-control" placeholder="e.g. Nasi Goreng Special" required data-v-40e633c5></div><div class="row g-3 mb-3" data-v-40e633c5><div class="col-6" data-v-40e633c5><label class="form-label fw-bold small text-muted" data-v-40e633c5>PRICE (Rp)</label><input type="number"${ssrRenderAttr("value", unref(form_edit_menu).price)} class="form-control" placeholder="0" required data-v-40e633c5></div><div class="col-6" data-v-40e633c5><label class="form-label fw-bold small text-muted" data-v-40e633c5>CATEGORY</label>`);
      _push(ssrRenderComponent(unref(vSelect), {
        modelValue: unref(form_edit_menu).category,
        "onUpdate:modelValue": ($event) => unref(form_edit_menu).category = $event,
        options: category_options.value,
        placeholder: "Select Category",
        required: ""
      }, null, _parent));
      _push(`</div></div><div class="mb-0" data-v-40e633c5><label class="form-label fw-bold small text-muted" data-v-40e633c5>FOOD TAGS</label>`);
      _push(ssrRenderComponent(unref(vSelect), {
        modelValue: unref(form_edit_menu).food_tag,
        "onUpdate:modelValue": ($event) => unref(form_edit_menu).food_tag = $event,
        options: food_tags.value,
        label: "name",
        reduce: (tag) => tag.id,
        multiple: "",
        placeholder: "Select Tags"
      }, null, _parent));
      _push(`</div></div><div class="modal-footer border-0 p-4 pt-0" data-v-40e633c5><button type="button" class="btn btn-light px-4" data-v-40e633c5>Cancel</button><button type="submit" class="btn btn-primary px-4"${ssrIncludeBooleanAttr(unref(form_edit_menu).processing) ? " disabled" : ""} data-v-40e633c5>`);
      if (unref(form_edit_menu).processing) {
        _push(`<span class="spinner-border spinner-border-sm me-2" data-v-40e633c5></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` Save Changes </button></div></form></div></div></div><div class="modal fade" id="addMenuModal" tabindex="-1" aria-labelledby="addMenuModalLabel" aria-hidden="true" data-v-40e633c5><div class="modal-dialog modal-dialog-centered" data-v-40e633c5><div class="modal-content" data-v-40e633c5><div class="modal-header" data-v-40e633c5><h5 class="modal-title" id="addMenuModalLabel" data-v-40e633c5>${ssrInterpolate("Add Menu")}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-40e633c5></button></div><div class="modal-body" data-v-40e633c5><form data-v-40e633c5><div class="mb-3" data-v-40e633c5><label for="addMenuName" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Menu Name")}</label><input${ssrRenderAttr("value", unref(form_add_menu).name)} type="text" class="form-control form-control-sm" id="addMenuName" required data-v-40e633c5>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        message: errors.value.name,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="mb-3" data-v-40e633c5><label for="addMenuCategory" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Category")}</label>`);
      _push(ssrRenderComponent(unref(vSelect), {
        modelValue: unref(form_add_menu).category,
        "onUpdate:modelValue": ($event) => unref(form_add_menu).category = $event,
        options: [.../* @__PURE__ */ new Set([...__props.all_categories || [], "Main Course", "Drink", "Snack", "Dessert"])],
        id: "addMenuCategory",
        class: ["basic-single", {
          "is-invalid": errors.value.category
        }],
        placeholder: "Select Category",
        disabled: unref(auth_user).roles_id != 99 && stand_status.value !== "Waiting for menu lock"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        message: errors.value.category,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="mb-3" data-v-40e633c5><label for="addMenuFoodTag" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Food Tag")}</label>`);
      _push(ssrRenderComponent(unref(vSelect), {
        modelValue: unref(form_add_menu).food_tag,
        "onUpdate:modelValue": ($event) => unref(form_add_menu).food_tag = $event,
        options: food_tag_list.value,
        label: "name",
        reduce: (tag) => tag.id,
        id: "addMenuFoodTag",
        class: ["basic-single", {
          "is-invalid": errors.value.food_tag
        }],
        multiple: "",
        placeholder: "Select Food Tag",
        disabled: unref(auth_user).roles_id != 99 && stand_status.value !== "Waiting for menu lock"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        message: errors.value.food_tag,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="mb-3" data-v-40e633c5><label for="addMenuPrice" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Price")}</label><input${ssrRenderAttr("value", unref(form_add_menu).price)} type="number" class="form-control form-control-sm" id="addMenuPrice" required data-v-40e633c5>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        message: errors.value.price,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="mb-3" data-v-40e633c5><label for="addMenuStock" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Stock")}</label><input${ssrRenderAttr("value", unref(form_add_menu).stock)} type="number" class="form-control form-control-sm" id="addMenuStock" required data-v-40e633c5>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        message: errors.value.stock,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="mb-3" data-v-40e633c5><label for="addMenuVolume" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Volume")}</label><div class="input-group" data-v-40e633c5><input${ssrRenderAttr("value", unref(form_add_menu).volume)} type="number" class="form-control form-control-sm" id="addMenuVolume" required data-v-40e633c5><select class="form-select form-select-sm" id="addMenuVolumeUnit" required data-v-40e633c5><option value="" data-v-40e633c5${ssrIncludeBooleanAttr(Array.isArray(unref(form_add_menu).volume_unit) ? ssrLooseContain(unref(form_add_menu).volume_unit, "") : ssrLooseEqual(unref(form_add_menu).volume_unit, "")) ? " selected" : ""}>${ssrInterpolate("-- Select Unit --")}</option><option value="ml" data-v-40e633c5${ssrIncludeBooleanAttr(Array.isArray(unref(form_add_menu).volume_unit) ? ssrLooseContain(unref(form_add_menu).volume_unit, "ml") : ssrLooseEqual(unref(form_add_menu).volume_unit, "ml")) ? " selected" : ""}>ml</option><option value="l" data-v-40e633c5${ssrIncludeBooleanAttr(Array.isArray(unref(form_add_menu).volume_unit) ? ssrLooseContain(unref(form_add_menu).volume_unit, "l") : ssrLooseEqual(unref(form_add_menu).volume_unit, "l")) ? " selected" : ""}>l</option><option value="cc" data-v-40e633c5${ssrIncludeBooleanAttr(Array.isArray(unref(form_add_menu).volume_unit) ? ssrLooseContain(unref(form_add_menu).volume_unit, "cc") : ssrLooseEqual(unref(form_add_menu).volume_unit, "cc")) ? " selected" : ""}>cc</option><option value="g" data-v-40e633c5${ssrIncludeBooleanAttr(Array.isArray(unref(form_add_menu).volume_unit) ? ssrLooseContain(unref(form_add_menu).volume_unit, "g") : ssrLooseEqual(unref(form_add_menu).volume_unit, "g")) ? " selected" : ""}>g</option><option value="kg" data-v-40e633c5${ssrIncludeBooleanAttr(Array.isArray(unref(form_add_menu).volume_unit) ? ssrLooseContain(unref(form_add_menu).volume_unit, "kg") : ssrLooseEqual(unref(form_add_menu).volume_unit, "kg")) ? " selected" : ""}>kg</option></select></div>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        message: errors.value.volume,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="mb-3" data-v-40e633c5><label for="addMenuMass" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Mass")}</label><div class="input-group" data-v-40e633c5><input${ssrRenderAttr("value", unref(form_add_menu).mass)} type="number" class="form-control form-control-sm" id="addMenuMass" required data-v-40e633c5><select class="form-select form-select-sm" id="addMenuMassUnit" required data-v-40e633c5><option value="" data-v-40e633c5${ssrIncludeBooleanAttr(Array.isArray(unref(form_add_menu).mass_unit) ? ssrLooseContain(unref(form_add_menu).mass_unit, "") : ssrLooseEqual(unref(form_add_menu).mass_unit, "")) ? " selected" : ""}>${ssrInterpolate("-- Select Unit --")}</option><option value="gr" data-v-40e633c5${ssrIncludeBooleanAttr(Array.isArray(unref(form_add_menu).mass_unit) ? ssrLooseContain(unref(form_add_menu).mass_unit, "gr") : ssrLooseEqual(unref(form_add_menu).mass_unit, "gr")) ? " selected" : ""}>gr</option><option value="kg" data-v-40e633c5${ssrIncludeBooleanAttr(Array.isArray(unref(form_add_menu).mass_unit) ? ssrLooseContain(unref(form_add_menu).mass_unit, "kg") : ssrLooseEqual(unref(form_add_menu).mass_unit, "kg")) ? " selected" : ""}>kg</option></select></div>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        message: errors.value.mass,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="mb-3" data-v-40e633c5><label for="addMenuImage" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Image")}</label><input class="form-control form-control-sm" type="file" id="addMenuImage" accept="image/*" data-v-40e633c5>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        message: errors.value.image,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="d-flex justify-content-end" data-v-40e633c5><button type="button" class="btn btn-secondary btn-sm me-2" data-bs-dismiss="modal" data-v-40e633c5>${ssrInterpolate("Close")}</button><button type="submit" class="btn btn-primary btn-sm" data-v-40e633c5>${ssrInterpolate("Add Menu")}</button></div></form></div></div></div></div><div class="modal fade" id="addStockModal" tabindex="-1" aria-labelledby="addStockModalLabel" aria-hidden="true" data-v-40e633c5><div class="modal-dialog modal-dialog-centered" data-v-40e633c5><div class="modal-content" data-v-40e633c5><div class="modal-header" data-v-40e633c5><h5 class="modal-title" id="addStockModalLabel" data-v-40e633c5>${ssrInterpolate("Add Stock")}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-40e633c5></button></div><div class="modal-body" data-v-40e633c5><form data-v-40e633c5><div class="mb-3" data-v-40e633c5><label for="addStockItem" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Menu Item")}</label><input${ssrRenderAttr("value", ((_e2 = selected_stock.value) == null ? void 0 : _e2.name) || "")} type="text" class="form-control bg-light" id="addStockItem" readonly disabled data-v-40e633c5></div><div class="mb-3" data-v-40e633c5><label for="addStockAmount" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Amount")}</label><input${ssrRenderAttr("value", unref(form_add_stock).amount)} type="number" class="form-control form-control-sm" id="addStockAmount" required data-v-40e633c5>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        message: errors.value.amount,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="d-flex justify-content-end" data-v-40e633c5><button type="button" class="btn btn-secondary btn-sm me-2" data-bs-dismiss="modal" data-v-40e633c5>${ssrInterpolate("Close")}</button><button type="submit" class="btn btn-primary btn-sm" data-v-40e633c5>${ssrInterpolate("Add Stock")}</button></div></form></div></div></div></div><div class="modal fade" id="addExpenseModal" tabindex="-1" aria-labelledby="addExpenseModalLabel" aria-hidden="true" data-v-40e633c5><div class="modal-dialog modal-dialog-centered" data-v-40e633c5><div class="modal-content" data-v-40e633c5><div class="modal-header" data-v-40e633c5><h5 class="modal-title" id="addExpenseModalLabel" data-v-40e633c5>${ssrInterpolate("Add Expense")}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-40e633c5></button></div><div class="modal-body" data-v-40e633c5><form data-v-40e633c5><div class="mb-3" data-v-40e633c5><label for="addExpenseName" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Expense Name")}</label><input${ssrRenderAttr("value", unref(form_add_expense).name)} type="text" class="form-control form-control-sm" id="addExpenseName" required data-v-40e633c5>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        message: errors.value.name,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="mb-3" data-v-40e633c5><label for="addExpensePrice" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Price")}</label><input${ssrRenderAttr("value", unref(form_add_expense).price)} type="number" class="form-control form-control-sm" id="addExpensePrice" required data-v-40e633c5>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        message: errors.value.price,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="mb-3" data-v-40e633c5><label for="addExpenseQty" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Quantity")}</label><input${ssrRenderAttr("value", unref(form_add_expense).qty)} type="number" class="form-control form-control-sm" id="addExpenseQty" required data-v-40e633c5>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        message: errors.value.qty,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="mb-3" data-v-40e633c5><label for="addExpenseUnit" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Unit")}</label><input${ssrRenderAttr("value", unref(form_add_expense).unit)} type="text" class="form-control form-control-sm" id="addExpenseUnit" required data-v-40e633c5>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        message: errors.value.unit,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="mb-3" data-v-40e633c5><label for="addExpenseReceipt" class="form-label fw-medium" data-v-40e633c5>${ssrInterpolate("Receipt")}</label><input class="form-control form-control-sm" type="file" id="addExpenseReceipt" accept="image/*" data-v-40e633c5>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        message: errors.value.reciept,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="mb-3 form-check" data-v-40e633c5><input${ssrIncludeBooleanAttr(Array.isArray(unref(form_add_expense).receipt_same) ? ssrLooseContain(unref(form_add_expense).receipt_same, null) : unref(form_add_expense).receipt_same) ? " checked" : ""} type="checkbox" class="form-check-input" id="addExpenseReceiptSame" data-v-40e633c5><label class="form-check-label" for="addExpenseReceiptSame" data-v-40e633c5>${ssrInterpolate("Use same receipt for all items")}</label></div><div class="d-flex justify-content-end" data-v-40e633c5><button type="button" class="btn btn-secondary btn-sm me-2" data-bs-dismiss="modal" data-v-40e633c5>${ssrInterpolate("Close")}</button><button type="submit" class="btn btn-primary btn-sm" data-v-40e633c5>${ssrInterpolate("Add Expense")}</button></div></form></div></div></div></div><div class="modal fade" id="incomeDetailModal" tabindex="-1" aria-labelledby="incomeDetailModalLabel" aria-hidden="true" data-v-40e633c5><div class="modal-dialog modal-dialog-centered modal-lg" data-v-40e633c5><div class="modal-content" data-v-40e633c5><div class="modal-header" data-v-40e633c5><h5 class="modal-title" id="incomeDetailModalLabel" data-v-40e633c5>${ssrInterpolate("Income Detail")}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-40e633c5></button></div><div class="modal-body" data-v-40e633c5>`);
      if (selectedIncome.value) {
        _push(`<div data-v-40e633c5>`);
        _push(ssrRenderComponent(IncomeReceiptTemplate, {
          income: selectedIncome.value,
          stand: stand.value,
          ref_key: "incomeReceiptRef",
          ref: incomeReceiptRef
        }, null, _parent));
        _push(`<div class="mt-3 text-center" data-v-40e633c5><button class="btn btn-primary btn-sm me-2" data-v-40e633c5><i class="bi bi-download" data-v-40e633c5></i> ${ssrInterpolate("Download")}</button><button class="btn btn-success btn-sm" data-v-40e633c5><i class="bi bi-whatsapp" data-v-40e633c5></i> ${ssrInterpolate("Share / Whatsapp")}</button></div></div>`);
      } else {
        _push(`<div class="text-center p-4" data-v-40e633c5><p class="text-muted mb-0" data-v-40e633c5>No income selected.</p></div>`);
      }
      _push(`</div></div></div></div><div class="modal fade" id="receiptModal" tabindex="-1" aria-labelledby="receiptModalLabel" aria-hidden="true" data-v-40e633c5><div class="modal-dialog modal-dialog-centered" data-v-40e633c5><div class="modal-content" data-v-40e633c5><div class="modal-header" data-v-40e633c5><h5 class="modal-title" id="receiptModalLabel" data-v-40e633c5>Expense Receipt</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-40e633c5></button></div><div class="modal-body" data-v-40e633c5>`);
      if (selected_expense.value) {
        _push(`<div data-v-40e633c5><p class="mb-1 text-primary-emphasis fw-medium" data-v-40e633c5>${ssrInterpolate(((_f2 = selected_expense.value) == null ? void 0 : _f2.name) || "")}</p><div class="small mb-2" data-v-40e633c5><div data-v-40e633c5><span class="text-secondary" data-v-40e633c5>Qty:</span> ${ssrInterpolate(selected_expense.value.qty)}</div><div data-v-40e633c5><span class="text-secondary" data-v-40e633c5>Unit Price:</span> ${ssrInterpolate(unref(formatIDR)(selected_expense.value.price))}</div><div data-v-40e633c5><span class="text-secondary" data-v-40e633c5>Total:</span> ${ssrInterpolate(unref(formatIDR)(selected_expense.value.total_price))}</div><div class="mt-1" data-v-40e633c5>`);
        if (selected_expense.value.operational_id && selected_expense.value.operational_id > 0) {
          _push(`<span class="badge bg-success" data-v-40e633c5><i class="bi bi-check-circle me-1" data-v-40e633c5></i>Validated </span>`);
        } else {
          _push(`<span class="badge bg-warning text-dark" data-v-40e633c5><i class="bi bi-clock me-1" data-v-40e633c5></i>Pending Validation </span>`);
        }
        _push(`</div></div>`);
        if (expenseReceiptUrl.value) {
          _push(`<div class="text-center" data-v-40e633c5>`);
          if (expenseReceiptLoading.value) {
            _push(`<div class="py-3" data-v-40e633c5><div class="spinner-border text-primary spinner-border-sm" role="status" data-v-40e633c5><span class="visually-hidden" data-v-40e633c5>Loading...</span></div><div class="small text-muted mt-1" data-v-40e633c5>Loading receipt...</div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<img style="${ssrRenderStyle([
            !expenseReceiptLoading.value && !expenseReceiptError.value ? null : { display: "none" },
            { "max-height": "300px" }
          ])}"${ssrRenderAttr("src", expenseReceiptSrc.value)} alt="Receipt" class="img-fluid rounded border" data-v-40e633c5>`);
          if (expenseReceiptError.value) {
            _push(`<div class="small text-danger mt-2" data-v-40e633c5>${ssrInterpolate(expenseReceiptError.value)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="mt-3 d-flex flex-wrap gap-2 justify-content-center" data-v-40e633c5><button type="button" class="btn btn-sm btn-outline-primary"${ssrIncludeBooleanAttr(expenseReceiptLoading.value || expenseReceiptError.value) ? " disabled" : ""} data-v-40e633c5>Download</button><button type="button" class="btn btn-sm btn-outline-secondary"${ssrIncludeBooleanAttr(expenseReceiptLoading.value || expenseReceiptError.value) ? " disabled" : ""} data-v-40e633c5>Copy Link</button><button type="button" class="btn btn-sm btn-outline-success"${ssrIncludeBooleanAttr(expenseReceiptLoading.value || expenseReceiptError.value) ? " disabled" : ""} data-v-40e633c5>Share WA</button>`);
          if ((unref(auth_user).roles_id == 99 || unref(auth_user).roles_id == 3) && !selected_expense.value.operational_id) {
            _push(`<button type="button" class="btn btn-sm btn-primary px-4 shadow-sm" data-v-40e633c5><i class="bi bi-check2-circle me-1" data-v-40e633c5></i>Validate Expense </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<div class="text-center text-muted small" data-v-40e633c5>No receipt image.</div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="text-center text-muted small" data-v-40e633c5>No expense selected.</div>`);
      }
      _push(`</div></div></div></div><div class="modal fade" id="workflowGuideModal" tabindex="-1" aria-labelledby="workflowGuideModalLabel" aria-hidden="true" data-v-40e633c5><div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" data-v-40e633c5><div class="modal-content border-0 shadow-lg" data-v-40e633c5><div class="modal-header border-0" style="${ssrRenderStyle({ "background-color": "#412f55" })}" data-v-40e633c5><h5 class="modal-title fw-bold text-white" id="workflowGuideModalLabel" data-v-40e633c5><i class="bi bi-map me-2" data-v-40e633c5></i>Stand Management â€” Panduan Lengkap </h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" data-v-40e633c5></button></div><div class="modal-body p-0" data-v-40e633c5><div class="px-4 pt-3 pb-2 bg-light border-bottom" data-v-40e633c5><p class="small text-muted mb-0" data-v-40e633c5>Ikuti urutan langkah berikut dari awal hingga stand siap berjualan dan ditutup. Setiap langkah memiliki peran yang bertanggung jawab.</p></div><div class="px-4 py-3" data-v-40e633c5><div class="d-flex gap-3 mb-4" data-v-40e633c5><div class="d-flex flex-column align-items-center" style="${ssrRenderStyle({ "min-width": "36px" })}" data-v-40e633c5><div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="${ssrRenderStyle({ "width": "36px", "height": "36px", "background": "#412f55", "flex-shrink": "0" })}" data-v-40e633c5>1</div><div style="${ssrRenderStyle({ "width": "2px", "flex": "1", "background": "#dee2e6", "margin-top": "4px" })}" data-v-40e633c5></div></div><div class="pb-3" style="${ssrRenderStyle({ "flex": "1" })}" data-v-40e633c5><div class="d-flex align-items-center gap-2 mb-1" data-v-40e633c5><h6 class="fw-bold mb-0" data-v-40e633c5>Buat Stand</h6><span class="badge bg-primary" style="${ssrRenderStyle({ "font-size": "0.6rem" })}" data-v-40e633c5>Operating (3)</span><span class="badge bg-dark" style="${ssrRenderStyle({ "font-size": "0.6rem" })}" data-v-40e633c5>Super Admin (99)</span></div><p class="small text-muted mb-2" data-v-40e633c5>Buat stand baru dari halaman <strong data-v-40e633c5>Stand List</strong>. Isi nama, tempat, tanggal, tipe (Live / Pre-Order), dan tentukan PIC.</p><div class="bg-light rounded p-2 small" data-v-40e633c5><i class="bi bi-info-circle text-primary me-1" data-v-40e633c5></i> Setelah dibuat, stand berstatus <strong data-v-40e633c5>&quot;Waiting for menu lock&quot;</strong> â€” semua fitur editing terbuka. </div></div></div><div class="d-flex gap-3 mb-4" data-v-40e633c5><div class="d-flex flex-column align-items-center" style="${ssrRenderStyle({ "min-width": "36px" })}" data-v-40e633c5><div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="${ssrRenderStyle({ "width": "36px", "height": "36px", "background": "#412f55", "flex-shrink": "0" })}" data-v-40e633c5>2</div><div style="${ssrRenderStyle({ "width": "2px", "flex": "1", "background": "#dee2e6", "margin-top": "4px" })}" data-v-40e633c5></div></div><div class="pb-3" style="${ssrRenderStyle({ "flex": "1" })}" data-v-40e633c5><div class="d-flex align-items-center gap-2 mb-1" data-v-40e633c5><h6 class="fw-bold mb-0" data-v-40e633c5>Daftarkan Production Staff &amp; Cashier</h6><span class="badge bg-primary" style="${ssrRenderStyle({ "font-size": "0.6rem" })}" data-v-40e633c5>Operating (3)</span><span class="badge" style="${ssrRenderStyle({ "font-size": "0.6rem", "background": "#412f55" })}" data-v-40e633c5>PIC Stand</span></div><p class="small text-muted mb-2" data-v-40e633c5>Klik ikon <i class="bi bi-people" data-v-40e633c5></i> (Production Staff) dan <i class="bi bi-person-badge" data-v-40e633c5></i> (Cashier) di tab Expense dan Income untuk mendaftarkan anggota tim.</p><div class="row g-2" data-v-40e633c5><div class="col-6" data-v-40e633c5><div class="border rounded p-2 small h-100" data-v-40e633c5><i class="bi bi-people text-warning me-1" data-v-40e633c5></i><strong data-v-40e633c5>Production Staff</strong><br data-v-40e633c5><span class="text-muted" data-v-40e633c5>Bisa input expense &amp; set resep menu.</span></div></div><div class="col-6" data-v-40e633c5><div class="border rounded p-2 small h-100" data-v-40e633c5><i class="bi bi-person-badge text-info me-1" data-v-40e633c5></i><strong data-v-40e633c5>Cashier Staff</strong><br data-v-40e633c5><span class="text-muted" data-v-40e633c5>Bisa akses panel kasir &amp; catat transaksi.</span></div></div></div></div></div><div class="d-flex gap-3 mb-4" data-v-40e633c5><div class="d-flex flex-column align-items-center" style="${ssrRenderStyle({ "min-width": "36px" })}" data-v-40e633c5><div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="${ssrRenderStyle({ "width": "36px", "height": "36px", "background": "#412f55", "flex-shrink": "0" })}" data-v-40e633c5>3</div><div style="${ssrRenderStyle({ "width": "2px", "flex": "1", "background": "#dee2e6", "margin-top": "4px" })}" data-v-40e633c5></div></div><div class="pb-3" style="${ssrRenderStyle({ "flex": "1" })}" data-v-40e633c5><div class="d-flex align-items-center gap-2 mb-1" data-v-40e633c5><h6 class="fw-bold mb-0" data-v-40e633c5>Input Expense (Belanja Bahan)</h6><span class="badge bg-warning text-dark" style="${ssrRenderStyle({ "font-size": "0.6rem" })}" data-v-40e633c5>Production Staff</span></div><p class="small text-muted mb-2" data-v-40e633c5>Di tab <strong data-v-40e633c5>Expense</strong>, klik <i class="bi bi-plus-lg" data-v-40e633c5></i> untuk input setiap bahan yang dibeli. Isi nama, harga satuan, jumlah, satuan, dan foto nota.</p><div class="bg-warning bg-opacity-10 border border-warning border-opacity-25 rounded p-2 small" data-v-40e633c5><i class="bi bi-exclamation-triangle text-warning me-1" data-v-40e633c5></i> Expense yang belum divalidasi <strong data-v-40e633c5>tidak bisa</strong> digunakan sebagai bahan resep. </div></div></div><div class="d-flex gap-3 mb-4" data-v-40e633c5><div class="d-flex flex-column align-items-center" style="${ssrRenderStyle({ "min-width": "36px" })}" data-v-40e633c5><div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="${ssrRenderStyle({ "width": "36px", "height": "36px", "background": "#412f55", "flex-shrink": "0" })}" data-v-40e633c5>4</div><div style="${ssrRenderStyle({ "width": "2px", "flex": "1", "background": "#dee2e6", "margin-top": "4px" })}" data-v-40e633c5></div></div><div class="pb-3" style="${ssrRenderStyle({ "flex": "1" })}" data-v-40e633c5><div class="d-flex align-items-center gap-2 mb-1" data-v-40e633c5><h6 class="fw-bold mb-0" data-v-40e633c5>Validasi Expense</h6><span class="badge bg-primary" style="${ssrRenderStyle({ "font-size": "0.6rem" })}" data-v-40e633c5>Operating (3)</span><span class="badge bg-dark" style="${ssrRenderStyle({ "font-size": "0.6rem" })}" data-v-40e633c5>Super Admin (99)</span></div><p class="small text-muted mb-2" data-v-40e633c5>Klik ikon <i class="bi bi-receipt" data-v-40e633c5></i> pada setiap expense, cek foto nota, lalu klik <strong data-v-40e633c5>Validate Expense</strong>. Expense yang tervalidasi ditandai badge hijau <span class="badge bg-success" style="${ssrRenderStyle({ "font-size": "0.6rem" })}" data-v-40e633c5>Validated</span>.</p><div class="bg-light rounded p-2 small" data-v-40e633c5><i class="bi bi-check-circle text-success me-1" data-v-40e633c5></i> Setelah divalidasi, total expense stand otomatis terupdate. </div></div></div><div class="d-flex gap-3 mb-4" data-v-40e633c5><div class="d-flex flex-column align-items-center" style="${ssrRenderStyle({ "min-width": "36px" })}" data-v-40e633c5><div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="${ssrRenderStyle({ "width": "36px", "height": "36px", "background": "#412f55", "flex-shrink": "0" })}" data-v-40e633c5>5</div><div style="${ssrRenderStyle({ "width": "2px", "flex": "1", "background": "#dee2e6", "margin-top": "4px" })}" data-v-40e633c5></div></div><div class="pb-3" style="${ssrRenderStyle({ "flex": "1" })}" data-v-40e633c5><div class="d-flex align-items-center gap-2 mb-1" data-v-40e633c5><h6 class="fw-bold mb-0" data-v-40e633c5>Tambah Menu &amp; Set Resep</h6><span class="badge bg-info text-dark" style="${ssrRenderStyle({ "font-size": "0.6rem" })}" data-v-40e633c5>Sales Distribution (10)</span><span class="badge bg-warning text-dark" style="${ssrRenderStyle({ "font-size": "0.6rem" })}" data-v-40e633c5>Production Staff</span></div><p class="small text-muted mb-2" data-v-40e633c5>Di tab <strong data-v-40e633c5>Menu</strong>, klik <i class="bi bi-plus-lg" data-v-40e633c5></i> untuk tambah item menu (nama, kategori, harga, stok, foto). Lalu klik <i class="bi bi-clipboard-plus" data-v-40e633c5></i> untuk set takaran bahan per porsi.</p><div class="row g-2" data-v-40e633c5><div class="col-6" data-v-40e633c5><div class="border rounded p-2 small h-100" data-v-40e633c5><i class="bi bi-plus-circle text-primary me-1" data-v-40e633c5></i><strong data-v-40e633c5>Tambah Menu</strong><br data-v-40e633c5><span class="text-muted" data-v-40e633c5>Isi nama, harga, stok awal, foto (rasio 1:1).</span></div></div><div class="col-6" data-v-40e633c5><div class="border rounded p-2 small h-100" data-v-40e633c5><i class="bi bi-clipboard-plus text-success me-1" data-v-40e633c5></i><strong data-v-40e633c5>Set Resep</strong><br data-v-40e633c5><span class="text-muted" data-v-40e633c5>Input qty bahan per porsi â†’ modal &amp; untung terhitung otomatis.</span></div></div></div></div></div><div class="d-flex gap-3 mb-4" data-v-40e633c5><div class="d-flex flex-column align-items-center" style="${ssrRenderStyle({ "min-width": "36px" })}" data-v-40e633c5><div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="${ssrRenderStyle({ "width": "36px", "height": "36px", "background": "#412f55", "flex-shrink": "0" })}" data-v-40e633c5>6</div><div style="${ssrRenderStyle({ "width": "2px", "flex": "1", "background": "#dee2e6", "margin-top": "4px" })}" data-v-40e633c5></div></div><div class="pb-3" style="${ssrRenderStyle({ "flex": "1" })}" data-v-40e633c5><div class="d-flex align-items-center gap-2 mb-1" data-v-40e633c5><h6 class="fw-bold mb-0" data-v-40e633c5>Menu Lock â€” Stand Siap Berjualan</h6><span class="badge bg-primary" style="${ssrRenderStyle({ "font-size": "0.6rem" })}" data-v-40e633c5>Operating (3)</span><span class="badge bg-dark" style="${ssrRenderStyle({ "font-size": "0.6rem" })}" data-v-40e633c5>Super Admin (99)</span></div><p class="small text-muted mb-2" data-v-40e633c5>Klik ikon <i class="bi bi-unlock" data-v-40e633c5></i> (gembok) di tab Menu untuk mengunci daftar menu. Status stand berubah menjadi <strong class="text-success" data-v-40e633c5>Active</strong>.</p><div class="bg-success bg-opacity-10 border border-success border-opacity-25 rounded p-2 small" data-v-40e633c5><i class="bi bi-lock-fill text-success me-1" data-v-40e633c5></i> Setelah dikunci, menu tidak bisa diubah. Kasir bisa mulai mencatat transaksi via panel kasir <i class="bi bi-cart-plus" data-v-40e633c5></i>. </div></div></div><div class="d-flex gap-3 mb-4" data-v-40e633c5><div class="d-flex flex-column align-items-center" style="${ssrRenderStyle({ "min-width": "36px" })}" data-v-40e633c5><div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="${ssrRenderStyle({ "width": "36px", "height": "36px", "background": "#412f55", "flex-shrink": "0" })}" data-v-40e633c5>7</div><div style="${ssrRenderStyle({ "width": "2px", "flex": "1", "background": "#dee2e6", "margin-top": "4px" })}" data-v-40e633c5></div></div><div class="pb-3" style="${ssrRenderStyle({ "flex": "1" })}" data-v-40e633c5><div class="d-flex align-items-center gap-2 mb-1" data-v-40e633c5><h6 class="fw-bold mb-0" data-v-40e633c5>Operasional â€” Catat Transaksi</h6><span class="badge bg-secondary" style="${ssrRenderStyle({ "font-size": "0.6rem" })}" data-v-40e633c5>Cashier Staff</span></div><p class="small text-muted mb-2" data-v-40e633c5>Kasir membuka panel kasir via tombol <i class="bi bi-cart-plus" data-v-40e633c5></i> di tab Income. Pilih menu â†’ isi customer â†’ submit transaksi â†’ cetak/share receipt.</p><div class="bg-light rounded p-2 small" data-v-40e633c5><i class="bi bi-lightbulb text-warning me-1" data-v-40e633c5></i> Stok menu berkurang otomatis setiap transaksi. Update stok manual via ikon <i class="bi bi-box-seam" data-v-40e633c5></i> jika diperlukan. </div></div></div><div class="d-flex gap-3" data-v-40e633c5><div class="d-flex flex-column align-items-center" style="${ssrRenderStyle({ "min-width": "36px" })}" data-v-40e633c5><div class="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="${ssrRenderStyle({ "width": "36px", "height": "36px", "background": "#412f55", "flex-shrink": "0" })}" data-v-40e633c5>8</div></div><div style="${ssrRenderStyle({ "flex": "1" })}" data-v-40e633c5><div class="d-flex align-items-center gap-2 mb-1" data-v-40e633c5><h6 class="fw-bold mb-0" data-v-40e633c5>Tutup Stand â€” Validasi Sales</h6><span class="badge bg-primary" style="${ssrRenderStyle({ "font-size": "0.6rem" })}" data-v-40e633c5>Operating (3)</span><span class="badge bg-dark" style="${ssrRenderStyle({ "font-size": "0.6rem" })}" data-v-40e633c5>Super Admin (99)</span></div><p class="small text-muted mb-2" data-v-40e633c5>Setelah selesai berjualan, klik <i class="bi bi-check-all" data-v-40e633c5></i> di tab Income untuk memvalidasi semua sales. Stand berubah menjadi <strong class="text-secondary" data-v-40e633c5>Inactive</strong>.</p><div class="bg-light rounded p-2 small" data-v-40e633c5><i class="bi bi-bar-chart text-primary me-1" data-v-40e633c5></i> Income, expense, dan profit stand otomatis terekap di halaman <strong data-v-40e633c5>Insight</strong>. </div></div></div></div><div class="px-4 pb-3 pt-0" data-v-40e633c5><div class="border rounded p-3 bg-light" data-v-40e633c5><p class="small fw-bold text-muted mb-2" data-v-40e633c5>LEGENDA IKON</p><div class="row g-1" style="${ssrRenderStyle({ "font-size": "0.78rem" })}" data-v-40e633c5><div class="col-6" data-v-40e633c5><i class="bi bi-plus-lg text-primary me-1" data-v-40e633c5></i>Tambah item</div><div class="col-6" data-v-40e633c5><i class="bi bi-unlock text-success me-1" data-v-40e633c5></i>Lock / Unlock menu</div><div class="col-6" data-v-40e633c5><i class="bi bi-receipt text-secondary me-1" data-v-40e633c5></i>Lihat nota expense</div><div class="col-6" data-v-40e633c5><i class="bi bi-clipboard-plus text-success me-1" data-v-40e633c5></i>Set resep / ingredient</div><div class="col-6" data-v-40e633c5><i class="bi bi-people text-warning me-1" data-v-40e633c5></i>Kelola production staff</div><div class="col-6" data-v-40e633c5><i class="bi bi-person-badge text-info me-1" data-v-40e633c5></i>Kelola cashier staff</div><div class="col-6" data-v-40e633c5><i class="bi bi-cart-plus text-info me-1" data-v-40e633c5></i>Buka panel kasir</div><div class="col-6" data-v-40e633c5><i class="bi bi-check-all text-success me-1" data-v-40e633c5></i>Validasi sales (tutup stand)</div><div class="col-6" data-v-40e633c5><i class="bi bi-box-seam text-secondary me-1" data-v-40e633c5></i>Update stok menu</div><div class="col-6" data-v-40e633c5><i class="bi bi-pencil-square text-primary me-1" data-v-40e633c5></i>Edit detail menu</div></div></div></div></div><div class="modal-footer border-0 bg-light rounded-bottom" data-v-40e633c5><button type="button" class="btn btn-sm px-4 text-white" style="${ssrRenderStyle({ "background-color": "#412f55" })}" data-bs-dismiss="modal" data-v-40e633c5>Saya Mengerti</button></div></div></div></div><div class="modal fade" id="editMenuImageModal" tabindex="-1" aria-hidden="true" data-v-40e633c5><div class="modal-dialog modal-dialog-centered" data-v-40e633c5><div class="modal-content border-0 shadow-lg" data-v-40e633c5><div class="modal-header bg-secondary text-white border-0" data-v-40e633c5><h5 class="modal-title fw-bold" data-v-40e633c5>Update Menu Image</h5><button type="button" class="btn-close btn-close-white" data-v-40e633c5></button></div><form data-v-40e633c5><div class="modal-body p-4 text-center" data-v-40e633c5><p class="small text-muted mb-3" data-v-40e633c5>Update image for <strong data-v-40e633c5>${ssrInterpolate((_g2 = selected_menu.value) == null ? void 0 : _g2.name)}</strong>.</p><div class="alert alert-warning py-2 small mb-3" data-v-40e633c5><i class="bi bi-exclamation-triangle me-2" data-v-40e633c5></i>Image <strong data-v-40e633c5>MUST</strong> be square (Ratio 1:1) or it will be rejected. </div><div class="mb-3" data-v-40e633c5><input class="form-control" type="file" accept="image/*" required data-v-40e633c5></div></div><div class="modal-footer border-0 p-4 pt-0" data-v-40e633c5><button type="button" class="btn btn-light px-4" data-v-40e633c5>Cancel</button><button type="submit" class="btn btn-secondary px-4"${ssrIncludeBooleanAttr(unref(form_edit_menu_image).processing) ? " disabled" : ""} data-v-40e633c5>`);
      if (unref(form_edit_menu_image).processing) {
        _push(`<span class="spinner-border spinner-border-sm me-2" data-v-40e633c5></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` Update Image </button></div></form></div></div></div><div class="modal fade" id="attachRecipeModal" tabindex="-1" aria-hidden="true" data-v-40e633c5><div class="modal-dialog modal-dialog-centered modal-lg" data-v-40e633c5><div class="modal-content border-0 shadow-lg" data-v-40e633c5><div class="modal-header bg-success text-white border-0" data-v-40e633c5><h5 class="modal-title fw-bold" data-v-40e633c5>Set Ingredients for ${ssrInterpolate((_h2 = selected_menu.value) == null ? void 0 : _h2.name)}</h5><button type="button" class="btn-close btn-close-white" data-v-40e633c5></button></div><form data-v-40e633c5><div class="modal-body p-4" data-v-40e633c5><p class="small text-muted mb-4" data-v-40e633c5>Input the quantity of each validated ingredient used per portion. Cost and profit will be calculated automatically.</p><div class="scroll-container-3 pe-2" data-v-40e633c5>`);
      if (unref(form_attach_recipe).components.length === 0) {
        _push(`<div class="text-center py-5" data-v-40e633c5><i class="bi bi-inbox fs-1 text-muted d-block mb-2" data-v-40e633c5></i><p class="text-muted" data-v-40e633c5>No validated ingredients found for this stand.<br data-v-40e633c5>Please add and validate expenses first.</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(form_attach_recipe).components, (comp, index) => {
        _push(`<div class="card border-0 bg-light mb-3" data-v-40e633c5><div class="card-body p-3" data-v-40e633c5><div class="row align-items-center" data-v-40e633c5><div class="col-md-5" data-v-40e633c5><div class="fw-bold text-primary" data-v-40e633c5>${ssrInterpolate(comp.name)}</div><div class="small text-muted" data-v-40e633c5>Stock: ${ssrInterpolate(comp.qty)} ${ssrInterpolate(comp.unit)} | Price: ${ssrInterpolate(unref(formatIDR)(comp.price))}</div></div><div class="col-md-4" data-v-40e633c5><div class="input-group input-group-sm" data-v-40e633c5><input type="number" step="0.001"${ssrRenderAttr("value", comp.quantity_used)} class="form-control" placeholder="0.00" data-v-40e633c5><span class="input-group-text bg-white border-start-0" data-v-40e633c5>${ssrInterpolate(comp.unit)}</span></div></div><div class="col-md-3 text-end" data-v-40e633c5><div class="small text-muted mb-0" data-v-40e633c5>Cost per portion:</div><div class="fw-bold" data-v-40e633c5>${ssrInterpolate(unref(formatIDR)(comp.quantity_used * comp.price))}</div></div></div></div></div>`);
      });
      _push(`<!--]--></div><div class="mt-4 p-3 bg-dark text-white rounded-3" data-v-40e633c5><div class="row align-items-center" data-v-40e633c5><div class="col-sm-4" data-v-40e633c5><div class="small opacity-75" data-v-40e633c5>Modal per portion:</div><div class="fs-5 fw-bold" data-v-40e633c5>${ssrInterpolate(unref(formatIDR)(unref(form_attach_recipe).components.reduce((acc, curr) => acc + curr.quantity_used * curr.price, 0)))}</div></div><div class="col-sm-4 border-start border-white border-opacity-25" data-v-40e633c5><div class="small opacity-75" data-v-40e633c5>Selling Price:</div><div class="fs-5 fw-bold" data-v-40e633c5>${ssrInterpolate(unref(formatIDR)(((_i = selected_menu.value) == null ? void 0 : _i.price) || 0))}</div></div><div class="col-sm-4 border-start border-white border-opacity-25 text-warning" data-v-40e633c5><div class="small opacity-75 text-warning" data-v-40e633c5>Estimated Profit:</div><div class="fs-5 fw-bold text-warning" data-v-40e633c5>${ssrInterpolate(unref(formatIDR)((((_j = selected_menu.value) == null ? void 0 : _j.price) || 0) - unref(form_attach_recipe).components.reduce((acc, curr) => acc + curr.quantity_used * curr.price, 0)))}</div></div></div></div></div><div class="modal-footer border-0 p-4 pt-0" data-v-40e633c5><button type="button" class="btn btn-light px-4" data-v-40e633c5>Cancel</button><button type="submit" class="btn btn-success px-4"${ssrIncludeBooleanAttr(unref(form_attach_recipe).processing) ? " disabled" : ""} data-v-40e633c5>`);
      if (unref(form_attach_recipe).processing) {
        _push(`<span class="spinner-border spinner-border-sm me-2" data-v-40e633c5></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` Save Ingredients </button></div></form></div></div></div>`);
      _push(ssrRenderComponent(ToastNotification, {
        ref_key: "toastNotifRef",
        ref: toastNotifRef
      }, null, _parent));
      _push(`<div class="modal fade" id="prouctionStaffModal" tabindex="-1" aria-labelledby="productionStaffModalLabel" aria-hidden="true" data-v-40e633c5><div class="modal-dialog modal-dialog-centered" data-v-40e633c5><div class="modal-content" data-v-40e633c5><div class="modal-header" data-v-40e633c5><h5 class="modal-title" id="productionStaffModalLabel" data-v-40e633c5><i class="bi bi-people me-2" data-v-40e633c5></i>Production Staff </h5><button type="button" class="btn-close" data-v-40e633c5></button></div><form data-v-40e633c5><div class="modal-body" data-v-40e633c5><p class="text-secondary small mb-3" data-v-40e633c5>Staff yang terdaftar sebagai Production dapat menambahkan expense dan mengatur resep menu.</p><div class="mb-3" data-v-40e633c5><label class="form-label fw-medium small text-muted" data-v-40e633c5>CURRENT PRODUCTION STAFF</label>`);
      if (unref(form_production_staff).staff_list.filter((s) => !s.deleted_at).length === 0) {
        _push(`<div class="text-secondary small fst-italic" data-v-40e633c5>Belum ada production staff.</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<ul class="list-group list-group-flush" data-v-40e633c5><!--[-->`);
      ssrRenderList(unref(form_production_staff).staff_list, (staff, index) => {
        _push(`<li style="${ssrRenderStyle(!staff.deleted_at ? null : { display: "none" })}" class="list-group-item px-0 py-1 d-flex align-items-center" data-v-40e633c5><i class="bi bi-person-fill text-primary me-2" data-v-40e633c5></i><span class="me-auto" data-v-40e633c5>${ssrInterpolate(staff.name)}</span><button type="button" class="btn btn-sm btn-outline-danger border-0 py-0" data-v-40e633c5><i class="bi bi-x-lg" data-v-40e633c5></i></button></li>`);
      });
      _push(`<!--]--></ul></div><div data-v-40e633c5><label class="form-label fw-medium small text-muted" data-v-40e633c5>ADD STAFF</label>`);
      _push(ssrRenderComponent(unref(vSelect), {
        options: users.value.filter((u) => !unref(form_production_staff).staff_list.some((s) => s.id === u.id && !s.deleted_at)),
        label: "name",
        placeholder: "Search staff...",
        "onOption:selected": (user) => {
          if (user) {
            unref(form_production_staff).staff_list.push({ id: user.id, name: user.name });
          }
        }
      }, null, _parent));
      _push(`</div></div><div class="modal-footer" data-v-40e633c5><button type="button" class="btn btn-secondary btn-sm" data-v-40e633c5>Cancel</button><button type="submit" class="btn btn-primary btn-sm"${ssrIncludeBooleanAttr(unref(form_production_staff).processing) ? " disabled" : ""} data-v-40e633c5>`);
      if (unref(form_production_staff).processing) {
        _push(`<span class="spinner-border spinner-border-sm me-1" data-v-40e633c5></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` Save </button></div></form></div></div></div><div class="modal fade" id="cashierStaffModal" tabindex="-1" aria-labelledby="cashierStaffModalLabel" aria-hidden="true" data-v-40e633c5><div class="modal-dialog modal-dialog-centered" data-v-40e633c5><div class="modal-content" data-v-40e633c5><div class="modal-header" data-v-40e633c5><h5 class="modal-title" id="cashierStaffModalLabel" data-v-40e633c5><i class="bi bi-person-badge me-2" data-v-40e633c5></i>Cashier Staff </h5><button type="button" class="btn-close" data-v-40e633c5></button></div><form data-v-40e633c5><div class="modal-body" data-v-40e633c5><p class="text-secondary small mb-3" data-v-40e633c5>Staff yang terdaftar sebagai Cashier dapat mengakses panel kasir dan mencatat transaksi.</p><div class="mb-3" data-v-40e633c5><label class="form-label fw-medium small text-muted" data-v-40e633c5>CURRENT CASHIER STAFF</label>`);
      if (unref(form_cashier_staff).staff_list.filter((s) => !s.deleted_at).length === 0) {
        _push(`<div class="text-secondary small fst-italic" data-v-40e633c5>Belum ada cashier staff.</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<ul class="list-group list-group-flush" data-v-40e633c5><!--[-->`);
      ssrRenderList(unref(form_cashier_staff).staff_list, (staff, index) => {
        _push(`<li style="${ssrRenderStyle(!staff.deleted_at ? null : { display: "none" })}" class="list-group-item px-0 py-1 d-flex align-items-center" data-v-40e633c5><i class="bi bi-person-badge text-primary me-2" data-v-40e633c5></i><span class="me-auto" data-v-40e633c5>${ssrInterpolate(staff.name)}</span><button type="button" class="btn btn-sm btn-outline-danger border-0 py-0" data-v-40e633c5><i class="bi bi-x-lg" data-v-40e633c5></i></button></li>`);
      });
      _push(`<!--]--></ul></div><div data-v-40e633c5><label class="form-label fw-medium small text-muted" data-v-40e633c5>ADD STAFF</label>`);
      _push(ssrRenderComponent(unref(vSelect), {
        options: users.value.filter((u) => !unref(form_cashier_staff).staff_list.some((s) => s.id === u.id && !s.deleted_at)),
        label: "name",
        placeholder: "Search staff...",
        "onOption:selected": (user) => {
          if (user) {
            unref(form_cashier_staff).staff_list.push({ id: user.id, name: user.name });
          }
        }
      }, null, _parent));
      _push(`</div></div><div class="modal-footer" data-v-40e633c5><button type="button" class="btn btn-secondary btn-sm" data-v-40e633c5>Cancel</button><button type="submit" class="btn btn-primary btn-sm"${ssrIncludeBooleanAttr(unref(form_cashier_staff).processing) ? " disabled" : ""} data-v-40e633c5>`);
      if (unref(form_cashier_staff).processing) {
        _push(`<span class="spinner-border spinner-border-sm me-1" data-v-40e633c5></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` Save </button></div></form></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Business/StandDetail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const StandDetail = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-40e633c5"]]);
export {
  StandDetail as default
};
//# sourceMappingURL=StandDetail-Ce4lXmgs.js.map
