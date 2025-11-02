import { ref, computed, onMounted, onUnmounted, watch, withCtx, unref, createVNode, createBlock, createCommentVNode, createTextVNode, toDisplayString, openBlock, Transition, Fragment, renderList, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./StaffLayout-Dx7OTDGc.js";
import { _ as _sfc_main$3 } from "./InputError-DugfSnOg.js";
import { _ as _sfc_main$4 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$2 } from "./ModalConfirmation-CQDhtLdH.js";
import { M as ModalAlertNotification } from "./ModalAlertNotification-DTKoiHkW.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import vSelect from "vue-select";
/* empty css                    */
import "html2canvas";
import { c as formatDateOnly, f as formatIDR, d as formatTime, a as formatDate, e as formatTimeOnly } from "../app.js";
/* empty css             */
import "vue-toastification";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "axios";
import "date-fns";
import "bootstrap";
const _sfc_main = {
  __name: "StandDetail",
  __ssrInlineRender: true,
  props: {
    income_list: Array,
    menu_category: Object,
    expense_list: Array,
    food_tag_list: Array,
    users: Array,
    stand: Object,
    dana_contact: Object,
    notif: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const title = ref(props.stand.name);
    const modalConfirmationRef = ref(null);
    const modalAlertNotificationRef = ref(null);
    const toastNotifRef = ref(null);
    ref(null);
    ref("placeholder");
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
    ref(null);
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
      { value: 2, name: "Live and Pre-Order" }
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
            return (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0) == new Date(props.stand.date).setHours(0, 0, 0, 0) ? "open" : "close";
          case 1:
            return (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0) < new Date(props.stand.date).setHours(0, 0, 0, 0) ? "open" : "close";
          case 2:
            return (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0) <= new Date(props.stand.date).setHours(0, 0, 0, 0) ? "open" : "close";
        }
      } else {
        return "close";
      }
    });
    const new_production_staff = ref({
      staff: null,
      stand_id: props.stand.id
    });
    const new_cashier_staff = ref({
      staff: null,
      stand_id: props.stand.id
    });
    const form_edit_stand = useForm({
      name: props.stand.name,
      pic_id: props.stand.pic_id,
      place: props.stand.place,
      date: props.stand.date,
      type: props.stand.type
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
    const form_add_stock = useForm({
      id: null,
      amount: null
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
    const form_set_dana_contact = useForm({
      name: null,
      number: null
    });
    const form_production_staff = useForm({
      staff_list: props.stand.production
    });
    const form_cashier_staff = useForm({
      staff_list: props.stand.cashier
    });
    const form_edit_menu_image = useForm({
      image: null
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
      {
        modalAddMenu.value.show();
      }
    }
    function showAddStockModal(is_show) {
      if (modalAddStock.value == null) {
        const modal = document.getElementById("addStockModal");
        modalAddStock.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
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
    function showDanaContactModal(is_show) {
      if (modalDanaContact.value == null) {
        const modal = document.getElementById("danaContactModal");
        modalDanaContact.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalDanaContact.value.show();
      }
    }
    function showEditMenuImageModal(is_show) {
      if (modalEditMenuImage.value == null) {
        const modal = document.getElementById("editMenuImageModal");
        modalEditMenuImage.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalEditMenuImage.value.show();
      }
    }
    function handleFilterExpense() {
      form_filter_expense.post(route("stand.expense.filter"));
    }
    function handleFilterIncome() {
      form_filter_income.post(route("stand.income.filter"));
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
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", _ctx.route("food.stand"))} class="bg-opacity-0 text-decoration-none text-primary-emphasis"${_scopeId}><span class="fw-light"${_scopeId}>${ssrInterpolate("Stand")}</span></a><span class="ms-2"${_scopeId}>${ssrInterpolate("/")}</span> ${ssrInterpolate(title.value)}`);
          } else {
            return [
              createVNode("a", {
                href: _ctx.route("food.stand"),
                class: "bg-opacity-0 text-decoration-none text-primary-emphasis"
              }, [
                createVNode("span", { class: "fw-light" }, toDisplayString("Stand"))
              ], 8, ["href"]),
              createVNode("span", { class: "ms-2" }, toDisplayString("/")),
              createTextVNode(" " + toDisplayString(title.value), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: title.value,
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(ModalAlertNotification, {
              ref_key: "modalAlertNotificationRef",
              ref: modalAlertNotificationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="container me-lg-0 mx-auto mb-5"${_scopeId}><div class="row gx-4 mt-4 mb-5"${_scopeId}><div class="col-12"${_scopeId}><div class="card bg-white p-3"${_scopeId}><div class="d-flex border-bottom border-primary"${_scopeId}><span class="h5 text-primary-emphasis me-auto"${_scopeId}><i class="bi bi-shop me-2"${_scopeId}></i>${ssrInterpolate("Stand " + __props.stand.name)}</span>`);
            if (unref(auth_user).id == __props.stand.pic_id) {
              _push2(`<button class="btn btn-sm btn-outline-secondary border-0 py-0 mb-auto"${_scopeId}><span class="d-none d-lg-block"${_scopeId}>${ssrInterpolate("Edit")}</span><i class="bi bi-pencil d-lg-none"${_scopeId}></i></button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(auth_user).id == __props.stand.pic_id && unref(auth_user).roles_id == 3) {
              _push2(`<div class="border-start border-2 mx-1 mb-2"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(auth_user).roles_id == 3) {
              _push2(`<button class="btn btn-sm btn-outline-danger border-0 py-0 mb-auto"${_scopeId}><span class="d-none d-lg-block"${_scopeId}>${ssrInterpolate("Delete")}</span><i class="bi bi-trash3 d-lg-none"${_scopeId}></i></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="row g-2 mt-1"${_scopeId}><div class="col-6 col-lg-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Person In Charge")}</span><div class="scroll-x-hidden"${_scopeId}><span class="d-block text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(__props.stand.pic.name)}</span></div></div><div class="col-6 col-lg-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Status")}</span><div class="d-flex"${_scopeId}><div class="scroll-x-hidden"${_scopeId}><span class="${ssrRenderClass(
              "d-block text-nowrap " + (stand_status.value == "Active" ? "text-success" : "text-primary-emphasis")
            )}"${_scopeId}>${ssrInterpolate(stand_status.value)}</span></div><span class="${ssrRenderClass(
              "d-block text-nowrap px-2 ms-2 rounded " + (shop_status.value == "open" ? "text-white bg-success" : "text-secondary")
            )}"${_scopeId}>${ssrInterpolate(shop_status.value)}</span></div></div><div class="col-6 col-lg-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Place")}</span><div class="scroll-x-hidden"${_scopeId}><span class="d-block text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(__props.stand.place)}</span></div></div><div class="col-6 col-lg-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Date")}</span><div class="scroll-x-hidden"${_scopeId}><span class="d-block text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(unref(formatDateOnly)(__props.stand.date))}</span></div></div><div class="col-6 col-lg-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Type")}</span><div class="scroll-x-hidden"${_scopeId}><span class="d-block text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(stand_type.find(
              (item) => item.value == __props.stand.type
            ).name)}</span></div></div><div class="col-6 col-lg-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Profit")}</span><div class="scroll-x-hidden"${_scopeId}><span class="d-block text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.stand.profit))}</span></div></div><div class="col-6 col-lg-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Income")}</span><div class="scroll-x-hidden"${_scopeId}><span class="d-block text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.stand.income))}</span></div></div><div class="col-6 col-lg-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Expense")}</span><div class="scroll-x-hidden"${_scopeId}><span class="d-block text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.stand.expense))}</span></div></div></div></div></div></div><div class="row gx-4 mt-4"${_scopeId}><div class="col-12"${_scopeId}><div class="card bg-white p-1 d-lg-none"${_scopeId}><div class="d-flex"${_scopeId}><button class="btn btn-sm btn-outline-primary border-0 w-100 me-2"${_scopeId}>`);
            if (active_tab.value == 1) {
              _push2(`<span${_scopeId}>${ssrInterpolate("Menu")}</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value !== 1) {
              _push2(`<i class="bi bi-list-ul"${_scopeId}></i>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button><button class="btn btn-sm btn-outline-primary border-0 w-100 me-2"${_scopeId}>`);
            if (active_tab.value == 2) {
              _push2(`<span${_scopeId}>${ssrInterpolate("Expense")}</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value !== 2) {
              _push2(`<i class="bi bi-cart4"${_scopeId}></i>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button><button class="btn btn-sm btn-outline-primary border-0 w-100 me-2"${_scopeId}>`);
            if (active_tab.value == 3) {
              _push2(`<span${_scopeId}>${ssrInterpolate("Income")}</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value !== 3) {
              _push2(`<i class="bi bi-graph-up"${_scopeId}></i>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button></div></div></div></div><div class="row gx-4 mt-4 mt-lg-0"${_scopeId}>`);
            if (active_tab.value == 1 || isLargeScreen.value) {
              _push2(`<div class="col-12 col-lg-4"${_scopeId}><div class="card bg-white p-2"${_scopeId}><div class="d-flex pb-2"${_scopeId}><span class="text-primary ms-2"${_scopeId}><i class="bi bi-list-ul me-2 d-none d-lg-inline"${_scopeId}></i>${ssrInterpolate("Menu")}</span><div class="ms-auto me-2 d-flex"${_scopeId}><div${_scopeId}>`);
              if (unref(auth_user).id == __props.stand.pic_id) {
                _push2(`<button class="${ssrRenderClass(
                  "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value !== "Waiting for menu lock" ? "secondary disabled" : "primary")
                )}"${_scopeId}><i class="bi bi-plus-lg"${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (unref(auth_user).id == __props.stand.pic_id && unref(auth_user).roles_id == 3) {
                _push2(`<div class="border-start border-2 mt-1 mx-1"${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div${_scopeId}>`);
              if (unref(auth_user).roles_id == 3) {
                _push2(`<button class="${ssrRenderClass(
                  "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" ? "secondary disabled" : "success")
                )}"${_scopeId}><i class="${ssrRenderClass(
                  "bi bi-" + (__props.stand.menu_lock > 0 ? "lock-fill" : "unlock")
                )}"${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div><div class="scroll-container-3 scroll-container-lg-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.menu_category, (menu_list, key) => {
                _push2(`<ul class="list-group list-group-flush mb-2"${_scopeId}><li class="list-group-item list-group-item-light px-2 py-1"${_scopeId}><span class="text-secondary"${_scopeId}>${ssrInterpolate(key)}</span></li><!--[-->`);
                ssrRenderList(menu_list, (item) => {
                  _push2(`<li class="list-group-item list-group-item-action px-2 py-1"${_scopeId}><div class="text-nowrap p-1"${_scopeId}><div class="border border-primary-subtle border-2 rounded-3 d-inline-block float-start" style="${ssrRenderStyle({ "width": "20%" })}"${_scopeId}><img${ssrRenderAttr(
                    "src",
                    item.image ? "/storage/images/shop/foods/menu/" + item.image : "/storage/images/shop/foods/menu/default.png"
                  )} alt="image" class="placeholder img-fluid rounded" style="${ssrRenderStyle({ "aspect-ratio": "1" })}"${_scopeId}></div><div class="ps-2 d-inline-block" style="${ssrRenderStyle({ "width": "80%" })}"${_scopeId}><div class="d-flex"${_scopeId}><div class="scroll-x-hidden me-2 my-auto"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-primary-emphasis text-nowrap me-1"${_scopeId}>${ssrInterpolate(item.name)}</span><span class="text-secondary text-nowrap"${_scopeId}>${ssrInterpolate((item.volume > 0 ? item.volume + item.volume_unit + " " : "") + (item.volume > 0 || item.mass > 0 ? "- " : "") + (item.mass > 0 ? item.mass + item.mass_unit + " " : ""))}</span></div></div><div class="ms-auto text-end d-flex my-auto"${_scopeId}><span class="ms-1 text-primary"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                    item.price
                  ))}</span></div></div><div class="d-flex"${_scopeId}><span class="text-secondary border-end border-2 pe-2 my-1" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Tags")}</span><div class="my-auto scroll-container-horizontal scroll-container-horizontal-lg pb-1"${_scopeId}><!--[-->`);
                  ssrRenderList(item.tags, (tag) => {
                    _push2(`<span class="py-0 px-2 ms-2 rounded-1 bg-light bg-opacity-25 text-secondary d-inline-block" style="${ssrRenderStyle({
                      borderColor: tag.color,
                      borderWidth: "1px",
                      borderStyle: "solid",
                      fontSize: "0.8rem"
                    })}"${_scopeId}>${ssrInterpolate(tag.name)}</span>`);
                  });
                  _push2(`<!--]-->`);
                  if (item.tags.length == 0) {
                    _push2(`<span class="py-0 px-2 ms-2 rounded-1 border-secondary text-secondary" style="${ssrRenderStyle({
                      borderWidth: "1px",
                      borderStyle: "solid",
                      fontSize: "0.8rem"
                    })}"${_scopeId}>${ssrInterpolate("None")}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div><div class="d-flex"${_scopeId}><span class="rounded-3 text-dark my-auto px-1 text-nowrap ms-auto"${_scopeId}>${ssrInterpolate("( ")} <span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("sold:")}</span> ${ssrInterpolate(item.sale + " / ")} <span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("stock:")}</span> ${ssrInterpolate(item.stock + " )")}</span><div class="ms-1"${_scopeId}><div${_scopeId}><button class="${ssrRenderClass(
                    "btn btn-sm btn-outline-secondary border-0 " + (__props.stand.sale_validation > 0 ? "disabled" : "")
                  )}"${_scopeId}><i class="bi bi-image"${_scopeId}></i></button></div></div><div class="ms-0"${_scopeId}><div${_scopeId}><button class="${ssrRenderClass(
                    "btn btn-sm btn-outline-secondary border-0 " + (__props.stand.sale_validation > 0 ? "disabled" : "")
                  )}"${_scopeId}><i class="bi bi-box-seam"${_scopeId}></i></button></div></div><div class="ms-0"${_scopeId}><div${_scopeId}>`);
                  if (unref(auth_user).id == __props.stand.pic_id) {
                    _push2(`<button class="${ssrRenderClass(
                      "btn btn-sm btn-outline-secondary border-0 " + (__props.stand.menu_lock > 0 ? "disabled" : "")
                    )}"${_scopeId}><i class="bi bi-trash3 py-0"${_scopeId}></i></button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div></div></div></div></li>`);
                });
                _push2(`<!--]--></ul>`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value == 2 || isLargeScreen.value) {
              _push2(`<div class="col-12 col-lg-4"${_scopeId}><div class="card bg-white p-2"${_scopeId}><div class="d-flex mb-2"${_scopeId}><span class="text-primary ms-2"${_scopeId}><i class="bi bi-cart4 me-2 d-none d-lg-inline"${_scopeId}></i>${ssrInterpolate("Expenses")}</span><div class="ms-auto me-2"${_scopeId}>`);
              if (__props.stand.production.some(
                (staff) => staff.id == unref(auth_user).id
              )) {
                _push2(`<button class="${ssrRenderClass(
                  "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" ? "secondary disabled " : "primary")
                )}"${_scopeId}><i class="bi bi-plus-lg"${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button class="${ssrRenderClass(
                "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" ? "secondary disabled " : "primary")
              )}"${_scopeId}><i class="bi bi-people"${_scopeId}></i></button></div></div><div class="d-flex"${_scopeId}><div class="input-group"${_scopeId}><input type="text" class="form-control form-control-sm py-0" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1"${ssrRenderAttr("value", unref(form_filter_expense).name)}${_scopeId}><span class="input-group-text py-0" id="basic-addon1"${_scopeId}><i class="bi bi-search" style="${ssrRenderStyle({ "font-size": "0.9rem" })}"${_scopeId}></i></span></div></div><div class="d-flex mb-1"${_scopeId}><span class="text-secondary fst-italic mx-auto" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}><i class="bi bi-exclamation-triangle"${_scopeId}></i> ${ssrInterpolate("Expenses must be validated to update stand expense.")}</span></div><div class="scroll-container-2 scroll-container-lg-2"${_scopeId}><ul class="list-group list-group-flush"${_scopeId}><!--[-->`);
              ssrRenderList(__props.expense_list, (item) => {
                _push2(`<li class="list-group-item list-group-item-action px-2 py-1"${_scopeId}><div class="d-flex"${_scopeId}><span class="rounded-3 text-primary-emphasis my-auto px-1 text-nowrap"${_scopeId}>${ssrInterpolate("( " + item.qty + " )")}</span><div class="scroll-x-hidden me-2 my-auto"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-dark text-nowrap me-1"${_scopeId}>${ssrInterpolate(item.name)}</span><span class="text-secondary text-nowrap"${_scopeId}>${ssrInterpolate("- " + unref(formatIDR)(
                  item.price
                ) + "/" + item.unit)}</span></div></div><div class="ms-auto text-end d-flex my-auto"${_scopeId}><span class="ms-1 text-primary"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                  item.total_price
                ))}</span></div><button data-bs-toggle="modal" data-bs-target="#receiptModal" class="${ssrRenderClass("btn btn-sm border-0 my-auto ms-2 btn-outline-secondary d-flex")}"${_scopeId}>`);
                if (item.operational_id == 0 || item.operational_id == null) {
                  _push2(`<i class="bi bi-exclamation text-danger"${_scopeId}></i>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<i class="bi bi-receipt"${_scopeId}></i></button>`);
                if (is_production.value) {
                  _push2(`<div class="border-start border-2 mx-1 my-1"${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (is_production.value) {
                  _push2(`<button class="${ssrRenderClass(
                    "btn btn-sm border-0 " + (__props.stand.sale_validation > 0 ? "text-body-tertiary" : "btn-outline-secondary")
                  )}"${_scopeId}><i class="bi bi-trash3"${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></li>`);
              });
              _push2(`<!--]--></ul></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value == 3 || isLargeScreen.value) {
              _push2(`<div class="col-12 col-lg-4"${_scopeId}><div class="card bg-white p-2"${_scopeId}><div class="d-flex mb-2"${_scopeId}><span class="text-primary ms-2"${_scopeId}><i class="bi bi-graph-up me-2 d-none d-lg-inline"${_scopeId}></i> ${ssrInterpolate("Income")}</span><div class="d-flex ms-auto"${_scopeId}><button class="${ssrRenderClass(
                "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" ? "secondary disabled " : "primary")
              )}"${_scopeId}><svg class="icon icon-dana d-inline rounded-circle border-primary border" style="${ssrRenderStyle({ "width": "1rem", "height": "1rem", "padding": "0.1rem" })}"${_scopeId}><use href="/icons.svg#dana"${_scopeId}></use></svg></button><button class="${ssrRenderClass(
                "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" ? "secondary disabled " : "primary")
              )}"${_scopeId}><i class="bi bi-people"${_scopeId}></i></button>`);
              if (unref(auth_user).roles_id == 3) {
                _push2(`<button class="${ssrRenderClass(
                  "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value.sale_validation > 0 ? "success" : "secondary")
                )}"${_scopeId}><i class="${ssrRenderClass(
                  "bi bi-" + (__props.stand.sale_validation > 0 ? "lock-fill" : "unlock")
                )}"${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="d-flex"${_scopeId}><div class="input-group"${_scopeId}><input type="text" class="form-control form-control-sm py-0" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1"${ssrRenderAttr("value", unref(form_filter_income).name)}${_scopeId}><span class="input-group-text py-0" id="basic-addon1"${_scopeId}><i class="bi bi-search" style="${ssrRenderStyle({ "font-size": "0.9rem" })}"${_scopeId}></i></span></div></div><div class="d-flex mb-1"${_scopeId}><span class="text-secondary fst-italic mx-auto" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}><i class="bi bi-exclamation-triangle"${_scopeId}></i> ${ssrInterpolate("Transaction must be lock to update stand income.")}</span></div><div class="scroll-container-2 scroll-container-lg-2"${_scopeId}><ul class="list-group list-group-flush"${_scopeId}><!--[-->`);
              ssrRenderList(__props.income_list, (item) => {
                var _a2;
                _push2(`<li class="list-group-item list-group-item-action px-2 py-1"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-secondary my-auto me-2"${_scopeId}>${ssrInterpolate(unref(formatTime)(item.created_at))}</span><div class="scroll-x-hidden me-2 my-auto"${_scopeId}><span class="text-dark text-nowrap me-1"${_scopeId}>${ssrInterpolate(((_a2 = item.customer) == null ? void 0 : _a2.name) ?? "Unregistered")}</span></div><div class="ms-auto text-end d-flex"${_scopeId}><span class="ms-1 text-primary"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                  item.transaction
                ))}</span></div><button class="btn btn-sm btn-outline-secondary border-0 my-auto ms-2"${_scopeId}><i class="bi bi-receipt"${_scopeId}></i></button>`);
                if (is_cashier.value) {
                  _push2(`<div class="border-start border-2 mx-1 my-1"${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (is_cashier.value) {
                  _push2(`<div${_scopeId}><button class="${ssrRenderClass(
                    "btn btn-sm btn-outline-secondary border-0 " + (__props.stand.sale_validation > 0 ? "disabled" : "")
                  )}"${_scopeId}><i class="bi bi-trash3 py-0"${_scopeId}></i></button></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></li>`);
              });
              _push2(`<!--]--></ul></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="row mt-5"${_scopeId}></div></div><div class="fab bg-white"${_scopeId}><a class="${ssrRenderClass(
              "p-2 w-100 h-100 rounded-circle d-flex btn btn-" + (__props.stand.sale_validation > 0 || __props.stand.menu_lock == 0 ? "secondary disabled" : "primary")
            )}"${ssrRenderAttr("href", _ctx.route("food.stand.cashier", __props.stand.id))}${_scopeId}><i class="bi bi-shop-window fs-3 m-auto"${_scopeId}></i></a></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: title.value,
                icon: "/storage/local/images/apps/logo.png"
              }, null, 8, ["title"]),
              createVNode(_sfc_main$2, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
              }, null, 512),
              createVNode(ModalAlertNotification, {
                ref_key: "modalAlertNotificationRef",
                ref: modalAlertNotificationRef
              }, null, 512),
              createVNode("div", { class: "container me-lg-0 mx-auto mb-5" }, [
                createVNode("div", { class: "row gx-4 mt-4 mb-5" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card bg-white p-3" }, [
                      createVNode("div", { class: "d-flex border-bottom border-primary" }, [
                        createVNode("span", { class: "h5 text-primary-emphasis me-auto" }, [
                          createVNode("i", { class: "bi bi-shop me-2" }),
                          createTextVNode(toDisplayString("Stand " + __props.stand.name), 1)
                        ]),
                        unref(auth_user).id == __props.stand.pic_id ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: () => {
                            showEditStandModal();
                            unref(form_edit_stand).name = __props.stand.name;
                            unref(form_edit_stand).pic_id = __props.stand.pic_id;
                            unref(form_edit_stand).place = __props.stand.place;
                            unref(form_edit_stand).date = __props.stand.date;
                            unref(form_edit_stand).type = __props.stand.type;
                          },
                          class: "btn btn-sm btn-outline-secondary border-0 py-0 mb-auto"
                        }, [
                          createVNode("span", { class: "d-none d-lg-block" }, toDisplayString("Edit")),
                          createVNode("i", { class: "bi bi-pencil d-lg-none" })
                        ], 8, ["onClick"])) : createCommentVNode("", true),
                        unref(auth_user).id == __props.stand.pic_id && unref(auth_user).roles_id == 3 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "border-start border-2 mx-1 mb-2"
                        })) : createCommentVNode("", true),
                        unref(auth_user).roles_id == 3 ? (openBlock(), createBlock("button", {
                          key: 2,
                          onClick: ($event) => showDeleteStandModal(),
                          class: "btn btn-sm btn-outline-danger border-0 py-0 mb-auto"
                        }, [
                          createVNode("span", { class: "d-none d-lg-block" }, toDisplayString("Delete")),
                          createVNode("i", { class: "bi bi-trash3 d-lg-none" })
                        ], 8, ["onClick"])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "row g-2 mt-1" }, [
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Person In Charge")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(__props.stand.pic.name), 1)
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
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(__props.stand.place), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Date")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(unref(formatDateOnly)(__props.stand.date)), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Type")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(stand_type.find(
                              (item) => item.value == __props.stand.type
                            ).name), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Profit")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(unref(formatIDR)(__props.stand.profit)), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Income")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(unref(formatIDR)(__props.stand.income)), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Expense")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(unref(formatIDR)(__props.stand.expense)), 1)
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
                    default: withCtx(() => [
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
                                onClick: ($event) => stand_status.value !== "Waiting for menu lock" ? stand_status.value == "active" ? alertNotification(
                                  "You can`t change menu list after being locked by Operational Staff."
                                ) : alertNotification(
                                  "This stand is inactive. All feature are locked."
                                ) : ""
                              }, [
                                unref(auth_user).id == __props.stand.pic_id ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => stand_status.value == "Waiting for menu lock" ? showAddMenuModal() : "",
                                  class: "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value !== "Waiting for menu lock" ? "secondary disabled" : "primary")
                                }, [
                                  createVNode("i", { class: "bi bi-plus-lg" })
                                ], 10, ["onClick"])) : createCommentVNode("", true)
                              ], 8, ["onClick"]),
                              unref(auth_user).id == __props.stand.pic_id && unref(auth_user).roles_id == 3 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "border-start border-2 mt-1 mx-1"
                              })) : createCommentVNode("", true),
                              createVNode("div", {
                                onClick: ($event) => stand_status.value == "Inactive" ? alertNotification(
                                  "This stand is inactive. All feature are locked."
                                ) : ""
                              }, [
                                unref(auth_user).roles_id == 3 ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => __props.menu_category ? stand_status.value == "Inactive" ? "" : confirmation(
                                    _ctx.route(
                                      "stand.menu.validate",
                                      __props.stand.id
                                    ),
                                    "Are you sure want to " + (__props.stand.menu_lock > 0 ? "unlock" : "lock") + " the menu list of Stand " + __props.stand.name + "?"
                                  ) : alertNotification(
                                    "Please create a menu"
                                  ),
                                  class: "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" ? "secondary disabled" : "success")
                                }, [
                                  createVNode("i", {
                                    class: "bi bi-" + (__props.stand.menu_lock > 0 ? "lock-fill" : "unlock")
                                  }, null, 2)
                                ], 10, ["onClick"])) : createCommentVNode("", true)
                              ], 8, ["onClick"])
                            ])
                          ]),
                          createVNode("div", { class: "scroll-container-3 scroll-container-lg-2" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.menu_category, (menu_list, key) => {
                              return openBlock(), createBlock("ul", { class: "list-group list-group-flush mb-2" }, [
                                createVNode("li", { class: "list-group-item list-group-item-light px-2 py-1" }, [
                                  createVNode("span", { class: "text-secondary" }, toDisplayString(key), 1)
                                ]),
                                (openBlock(true), createBlock(Fragment, null, renderList(menu_list, (item) => {
                                  return openBlock(), createBlock("li", { class: "list-group-item list-group-item-action px-2 py-1" }, [
                                    createVNode("div", { class: "text-nowrap p-1" }, [
                                      createVNode("div", {
                                        class: "border border-primary-subtle border-2 rounded-3 d-inline-block float-start",
                                        style: { "width": "20%" }
                                      }, [
                                        createVNode("img", {
                                          src: item.image ? "/storage/images/shop/foods/menu/" + item.image : "/storage/images/shop/foods/menu/default.png",
                                          alt: "image",
                                          class: "placeholder img-fluid rounded",
                                          onLoad: showImage,
                                          style: { "aspect-ratio": "1" }
                                        }, null, 40, ["src"])
                                      ]),
                                      createVNode("div", {
                                        class: "ps-2 d-inline-block",
                                        style: { "width": "80%" }
                                      }, [
                                        createVNode("div", { class: "d-flex" }, [
                                          createVNode("div", { class: "scroll-x-hidden me-2 my-auto" }, [
                                            createVNode("div", { class: "d-flex" }, [
                                              createVNode("span", { class: "text-primary-emphasis text-nowrap me-1" }, toDisplayString(item.name), 1),
                                              createVNode("span", { class: "text-secondary text-nowrap" }, toDisplayString((item.volume > 0 ? item.volume + item.volume_unit + " " : "") + (item.volume > 0 || item.mass > 0 ? "- " : "") + (item.mass > 0 ? item.mass + item.mass_unit + " " : "")), 1)
                                            ])
                                          ]),
                                          createVNode("div", { class: "ms-auto text-end d-flex my-auto" }, [
                                            createVNode("span", { class: "ms-1 text-primary" }, toDisplayString(unref(formatIDR)(
                                              item.price
                                            )), 1)
                                          ])
                                        ]),
                                        createVNode("div", { class: "d-flex" }, [
                                          createVNode("span", {
                                            class: "text-secondary border-end border-2 pe-2 my-1",
                                            style: { "font-size": "0.8rem" }
                                          }, toDisplayString("Tags")),
                                          createVNode("div", { class: "my-auto scroll-container-horizontal scroll-container-horizontal-lg pb-1" }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(item.tags, (tag) => {
                                              return openBlock(), createBlock("span", {
                                                class: "py-0 px-2 ms-2 rounded-1 bg-light bg-opacity-25 text-secondary d-inline-block",
                                                style: {
                                                  borderColor: tag.color,
                                                  borderWidth: "1px",
                                                  borderStyle: "solid",
                                                  fontSize: "0.8rem"
                                                }
                                              }, toDisplayString(tag.name), 5);
                                            }), 256)),
                                            item.tags.length == 0 ? (openBlock(), createBlock("span", {
                                              key: 0,
                                              class: "py-0 px-2 ms-2 rounded-1 border-secondary text-secondary",
                                              style: {
                                                borderWidth: "1px",
                                                borderStyle: "solid",
                                                fontSize: "0.8rem"
                                              }
                                            }, toDisplayString("None"))) : createCommentVNode("", true)
                                          ])
                                        ]),
                                        createVNode("div", { class: "d-flex" }, [
                                          createVNode("span", { class: "rounded-3 text-dark my-auto px-1 text-nowrap ms-auto" }, [
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
                                          createVNode("div", { class: "ms-1" }, [
                                            createVNode("div", {
                                              onClick: ($event) => __props.stand.sale_validation > 0 ? alertNotification(
                                                "This stand is inactive. All feature are disabled."
                                              ) : ""
                                            }, [
                                              createVNode("button", {
                                                onClick: () => {
                                                  showEditMenuImageModal();
                                                  selected_menu.value = item;
                                                },
                                                class: "btn btn-sm btn-outline-secondary border-0 " + (__props.stand.sale_validation > 0 ? "disabled" : "")
                                              }, [
                                                createVNode("i", { class: "bi bi-image" })
                                              ], 10, ["onClick"])
                                            ], 8, ["onClick"])
                                          ]),
                                          createVNode("div", { class: "ms-0" }, [
                                            createVNode("div", {
                                              onClick: ($event) => __props.stand.sale_validation > 0 ? alertNotification(
                                                "This stand is inactive. All feature are disabled."
                                              ) : ""
                                            }, [
                                              createVNode("button", {
                                                onClick: () => {
                                                  showAddStockModal();
                                                  selected_stock.value = item;
                                                },
                                                class: "btn btn-sm btn-outline-secondary border-0 " + (__props.stand.sale_validation > 0 ? "disabled" : "")
                                              }, [
                                                createVNode("i", { class: "bi bi-box-seam" })
                                              ], 10, ["onClick"])
                                            ], 8, ["onClick"])
                                          ]),
                                          createVNode("div", { class: "ms-0" }, [
                                            createVNode("div", {
                                              onClick: ($event) => __props.stand.menu_lock > 0 ? alertNotification(
                                                "Menu list is locked by " + __props.stand.menu_validator.name + ". You can`t delete or make any changes."
                                              ) : ""
                                            }, [
                                              unref(auth_user).id == __props.stand.pic_id ? (openBlock(), createBlock("button", {
                                                key: 0,
                                                onClick: ($event) => confirmation(
                                                  _ctx.route(
                                                    "stand.menu.delete",
                                                    item.id
                                                  ),
                                                  "Are you sure want to remove " + item.name + " from menu list?"
                                                ),
                                                class: "btn btn-sm btn-outline-secondary border-0 " + (__props.stand.menu_lock > 0 ? "disabled" : "")
                                              }, [
                                                createVNode("i", { class: "bi bi-trash3 py-0" })
                                              ], 10, ["onClick"])) : createCommentVNode("", true)
                                            ], 8, ["onClick"])
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
                    ]),
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
                              __props.stand.production.some(
                                (staff) => staff.id == unref(auth_user).id
                              ) ? (openBlock(), createBlock("button", {
                                key: 0,
                                onClick: ($event) => stand_status.value == "Inactive" ? "" : showAddExpenseModal(),
                                class: "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" ? "secondary disabled " : "primary")
                              }, [
                                createVNode("i", { class: "bi bi-plus-lg" })
                              ], 10, ["onClick"])) : createCommentVNode("", true),
                              createVNode("button", {
                                onClick: ($event) => stand_status.value == "Inactive" ? "" : showProductionStaffModal(),
                                class: "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" ? "secondary disabled " : "primary")
                              }, [
                                createVNode("i", { class: "bi bi-people" })
                              ], 10, ["onClick"])
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
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.expense_list, (item) => {
                                return openBlock(), createBlock("li", { class: "list-group-item list-group-item-action px-2 py-1" }, [
                                  createVNode("div", { class: "d-flex" }, [
                                    createVNode("span", { class: "rounded-3 text-primary-emphasis my-auto px-1 text-nowrap" }, toDisplayString("( " + item.qty + " )"), 1),
                                    createVNode("div", { class: "scroll-x-hidden me-2 my-auto" }, [
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("span", { class: "text-dark text-nowrap me-1" }, toDisplayString(item.name), 1),
                                        createVNode("span", { class: "text-secondary text-nowrap" }, toDisplayString("- " + unref(formatIDR)(
                                          item.price
                                        ) + "/" + item.unit), 1)
                                      ])
                                    ]),
                                    createVNode("div", { class: "ms-auto text-end d-flex my-auto" }, [
                                      createVNode("span", { class: "ms-1 text-primary" }, toDisplayString(unref(formatIDR)(
                                        item.total_price
                                      )), 1)
                                    ]),
                                    createVNode("button", {
                                      "data-bs-toggle": "modal",
                                      "data-bs-target": "#receiptModal",
                                      class: "btn btn-sm border-0 my-auto ms-2 btn-outline-secondary d-flex",
                                      onClick: () => {
                                        selected_expense.value = item;
                                      }
                                    }, [
                                      item.operational_id == 0 || item.operational_id == null ? (openBlock(), createBlock("i", {
                                        key: 0,
                                        class: "bi bi-exclamation text-danger"
                                      })) : createCommentVNode("", true),
                                      createVNode("i", { class: "bi bi-receipt" })
                                    ], 8, ["onClick"]),
                                    is_production.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "border-start border-2 mx-1 my-1"
                                    })) : createCommentVNode("", true),
                                    is_production.value ? (openBlock(), createBlock("button", {
                                      key: 1,
                                      class: "btn btn-sm border-0 " + (__props.stand.sale_validation > 0 ? "text-body-tertiary" : "btn-outline-secondary"),
                                      onClick: () => {
                                        if (__props.stand.sale_validation > 0) {
                                          alertNotification(
                                            "This stand is inactive. All feature are disabled."
                                          );
                                        } else {
                                          confirmation(
                                            _ctx.route(
                                              "stand.expense.delete",
                                              item.id
                                            ),
                                            "Are you sure want to delete " + item.name + " from Stand " + __props.stand.name + " Expense List?"
                                          );
                                        }
                                      }
                                    }, [
                                      createVNode("i", { class: "bi bi-trash3" })
                                    ], 10, ["onClick"])) : createCommentVNode("", true)
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
                    name: "fade-slide-rtl",
                    mode: "out-in",
                    onAfterLeave: ($event) => proceedTab()
                  }, {
                    default: withCtx(() => [
                      active_tab.value == 3 || isLargeScreen.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "col-12 col-lg-4"
                      }, [
                        createVNode("div", { class: "card bg-white p-2" }, [
                          createVNode("div", { class: "d-flex mb-2" }, [
                            createVNode("span", { class: "text-primary ms-2" }, [
                              createVNode("i", { class: "bi bi-graph-up me-2 d-none d-lg-inline" }),
                              createTextVNode(" " + toDisplayString("Income"))
                            ]),
                            createVNode("div", { class: "d-flex ms-auto" }, [
                              createVNode("button", {
                                onClick: () => {
                                  var _a2, _b2;
                                  if (!(stand_status.value == "Inactive")) {
                                    unref(form_set_dana_contact).name = (_a2 = __props.dana_contact) == null ? void 0 : _a2.name;
                                    unref(form_set_dana_contact).number = (_b2 = __props.dana_contact) == null ? void 0 : _b2.phone;
                                    showDanaContactModal();
                                  }
                                },
                                class: "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" ? "secondary disabled " : "primary")
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "icon icon-dana d-inline rounded-circle border-primary border",
                                  style: { "width": "1rem", "height": "1rem", "padding": "0.1rem" }
                                }, [
                                  createVNode("use", { href: "/icons.svg#dana" })
                                ]))
                              ], 10, ["onClick"]),
                              createVNode("button", {
                                onClick: ($event) => stand_status.value == "Inactive" ? "" : showCashierStaffModal(),
                                class: "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value == "Inactive" ? "secondary disabled " : "primary")
                              }, [
                                createVNode("i", { class: "bi bi-people" })
                              ], 10, ["onClick"]),
                              unref(auth_user).roles_id == 3 ? (openBlock(), createBlock("button", {
                                key: 0,
                                onClick: ($event) => confirmation(
                                  _ctx.route(
                                    "stand.income.validate",
                                    __props.stand.id
                                  ),
                                  "Are you sure want to " + (__props.stand.sale_validation > 0 ? "unlock" : "lock") + " income " + __props.stand.name + "?"
                                ),
                                class: "btn btn-sm border-0 py-0 btn-outline-" + (stand_status.value.sale_validation > 0 ? "success" : "secondary")
                              }, [
                                createVNode("i", {
                                  class: "bi bi-" + (__props.stand.sale_validation > 0 ? "lock-fill" : "unlock")
                                }, null, 2)
                              ], 10, ["onClick"])) : createCommentVNode("", true)
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
                          createVNode("div", { class: "d-flex mb-1" }, [
                            createVNode("span", {
                              class: "text-secondary fst-italic mx-auto",
                              style: { "font-size": "0.8rem" }
                            }, [
                              createVNode("i", { class: "bi bi-exclamation-triangle" }),
                              createTextVNode(" " + toDisplayString("Transaction must be lock to update stand income."))
                            ])
                          ]),
                          createVNode("div", { class: "scroll-container-2 scroll-container-lg-2" }, [
                            createVNode("ul", { class: "list-group list-group-flush" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.income_list, (item) => {
                                var _a2;
                                return openBlock(), createBlock("li", { class: "list-group-item list-group-item-action px-2 py-1" }, [
                                  createVNode("div", { class: "d-flex" }, [
                                    createVNode("span", { class: "text-secondary my-auto me-2" }, toDisplayString(unref(formatTime)(item.created_at)), 1),
                                    createVNode("div", { class: "scroll-x-hidden me-2 my-auto" }, [
                                      createVNode("span", { class: "text-dark text-nowrap me-1" }, toDisplayString(((_a2 = item.customer) == null ? void 0 : _a2.name) ?? "Unregistered"), 1)
                                    ]),
                                    createVNode("div", { class: "ms-auto text-end d-flex" }, [
                                      createVNode("span", { class: "ms-1 text-primary" }, toDisplayString(unref(formatIDR)(
                                        item.transaction
                                      )), 1)
                                    ]),
                                    createVNode("button", {
                                      class: "btn btn-sm btn-outline-secondary border-0 my-auto ms-2",
                                      onClick: () => {
                                        selected_income.value = item;
                                        showIncomeDetailModal();
                                      }
                                    }, [
                                      createVNode("i", { class: "bi bi-receipt" })
                                    ], 8, ["onClick"]),
                                    is_cashier.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "border-start border-2 mx-1 my-1"
                                    })) : createCommentVNode("", true),
                                    is_cashier.value ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      onClick: ($event) => __props.stand.sale_validation > 0 ? alertNotification(
                                        "This stand is Inactive. All feature are locked."
                                      ) : ""
                                    }, [
                                      createVNode("button", {
                                        onClick: ($event) => {
                                          var _a3;
                                          return confirmation(
                                            _ctx.route(
                                              "stand.sale.delete",
                                              item.id
                                            ),
                                            "Are you sure want to remove " + (((_a3 = item.customer) == null ? void 0 : _a3.name) ?? "Unregistered Customer") + " transaction from Stand " + __props.stand.name + " income?"
                                          );
                                        },
                                        class: "btn btn-sm btn-outline-secondary border-0 " + (__props.stand.sale_validation > 0 ? "disabled" : "")
                                      }, [
                                        createVNode("i", { class: "bi bi-trash3 py-0" })
                                      ], 10, ["onClick"])
                                    ], 8, ["onClick"])) : createCommentVNode("", true)
                                  ])
                                ]);
                              }), 256))
                            ])
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["onAfterLeave"])
                ]),
                createVNode("div", { class: "row mt-5" })
              ]),
              createVNode("div", {
                class: "fab bg-white",
                onClick: ($event) => __props.stand.sale_validation > 0 || __props.stand.menu_lock == 0 ? alertNotification(
                  __props.stand.sale_validation > 0 ? "This stand is inactive. All feature are locked." : "This stand is still waiting for menu validation."
                ) : ""
              }, [
                createVNode("a", {
                  class: "p-2 w-100 h-100 rounded-circle d-flex btn btn-" + (__props.stand.sale_validation > 0 || __props.stand.menu_lock == 0 ? "secondary disabled" : "primary"),
                  href: _ctx.route("food.stand.cashier", __props.stand.id)
                }, [
                  createVNode("i", { class: "bi bi-shop-window fs-3 m-auto" })
                ], 10, ["href"])
              ], 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(auth_user).id == __props.stand.pic_id) {
        _push(`<div class="modal fade" id="editStandModal" tabindex="-1" aria-labelledby="editStandModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-shop pe-2"></i> ${ssrInterpolate("Edit Stand")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><form><div class="modal-body bg-light"><div class="row justify-content-center"><div class="col-4 col-lg-3"><label for="stand_name" class="form-label d-inline-block">${ssrInterpolate("Name")}</label></div><div class="col-8 col-lg-7"><input type="text" class="form-control form-control-sm" id="stand_name"${ssrRenderAttr("value", unref(form_edit_stand).name)} placeholder="Blaterian 1">`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_edit_stand).errors.name,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row justify-content-center mt-2"><div class="col-4 col-lg-3"><label for="stand_place" class="form-label d-inline-block">${ssrInterpolate("Place")}</label></div><div class="col-8 col-lg-7"><input type="text" class="form-control form-control-sm" id="stand_place"${ssrRenderAttr("value", unref(form_edit_stand).place)} placeholder="Gedung F">`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_edit_stand).errors.place,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row justify-content-center mt-2"><div class="col-4 col-lg-3"><label for="stand_date" class="form-label d-inline-block">${ssrInterpolate("Date")}</label></div><div class="col-8 col-lg-7"><input type="date" class="form-control form-control-sm" id="stand_date"${ssrRenderAttr("value", unref(form_edit_stand).date)}>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_edit_stand).errors.date,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row justify-content-center mt-2"><div class="col-4 col-lg-3"><label for="stand_type" class="form-label d-inline-block">${ssrInterpolate("Type")}</label></div><div class="col-8 col-lg-7"><select id="stand_type" class="form-select form-select-sm"><!--[-->`);
        ssrRenderList([
          { value: 0, name: "Live" },
          { value: 1, name: "Pre-Order" },
          {
            value: 2,
            name: "Live and Pre-Order"
          }
        ], (item) => {
          _push(`<option${ssrRenderAttr("value", item.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form_edit_stand).type) ? ssrLooseContain(unref(form_edit_stand).type, item.value) : ssrLooseEqual(unref(form_edit_stand).type, item.value)) ? " selected" : ""}>${ssrInterpolate(item.name)}</option>`);
        });
        _push(`<!--]--></select>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_edit_stand).errors.type,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-primary w-25">${ssrInterpolate("Edit")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(auth_user).roles_id == 3) {
        _push(`<div class="modal fade" id="deleteStandModal" tabindex="-1" aria-labelledby="deleteStandModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-trash3 pe-2"></i> ${ssrInterpolate("Delete Stand")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><form><div class="modal-body bg-light"><div class="d-flex"><p class="text-secondary" style="${ssrRenderStyle({ "text-align": "justify" })}">${ssrInterpolate("You are going to permanently delete Stand " + __props.stand.name + " data. Password needed to validate your action.")}</p></div><div class="row justify-content-center"><div class="col-4 col-lg-3"><div class="d-flex w-100 h-100"><label for="stand_name" class="form-label d-inline-block my-auto">${ssrInterpolate("Password")}</label></div></div><div class="col-8 col-lg-7"><div class="input-group"><input type="password" class="form-control form-control-sm" id="stand_delete_password"${ssrRenderAttr("value", unref(form_delete_stand).password)} placeholder="password" autocomplete="current-password"><button type="button" class="btn bg-light"><i class="bi bi-eye-slash-fill" id="password_icon_del"></i></button></div>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_delete_stand).errors.password,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-danger w-25">${ssrInterpolate("Delete")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(auth_user).id == __props.stand.pic_id && __props.stand.menu_lock == 0) {
        _push(`<div class="modal fade" id="addMenuModal" tabindex="-1" aria-labelledby="addMenuModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-list-ul pe-2"></i> ${ssrInterpolate("New Menu")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><form><div class="modal-body bg-light"><div class="row mt-0 justify-content-center"><div class="col-4 col-lg-3"><label for="menu_name" class="form-label d-inline-block">${ssrInterpolate("Name")}</label></div><div class="col-8 col-lg-7"><input type="text" class="form-control form-control-sm" id="menu_name"${ssrRenderAttr("value", unref(form_add_menu).name)} required>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_add_menu).errors.name,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="menu_category" class="form-label d-inline-block">${ssrInterpolate("Category")}</label></div><div class="col-8 col-lg-7"><input type="text" class="form-control form-control-sm" id="menu_category"${ssrRenderAttr("value", unref(form_add_menu).category)} required>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_add_menu).errors.category,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="menu_tag" class="form-label d-inline-block">${ssrInterpolate("Tag")}</label></div><div class="col-8 col-lg-7">`);
        _push(ssrRenderComponent(unref(vSelect), {
          id: "menu_tag",
          class: "bg-white text-nowrap",
          options: __props.food_tag_list,
          multiple: true,
          label: "name",
          modelValue: unref(form_add_menu).food_tag,
          "onUpdate:modelValue": ($event) => unref(form_add_menu).food_tag = $event,
          reduce: (item) => item.id,
          placeholder: "Choose Tag",
          getOptionKey: (option) => option.id,
          required: ""
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_add_menu).errors.food_tag,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="menu_volume" class="form-label d-inline-block">${ssrInterpolate("Volume")}</label></div><div class="col-8 col-lg-7"><div class="input-group input-group-sm"><input type="number" class="form-control form-control-sm" id="menu_volume"${ssrRenderAttr("value", unref(form_add_menu).volume)}><input type="text" class="form-control form-control-sm" id="menu_volume_unit"${ssrRenderAttr("value", unref(form_add_menu).volume_unit)} placeholder="unit: ml, ..."></div>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_add_menu).errors.volume,
          class: "mt-2"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_add_menu).errors.volume_unit,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="menu_mass" class="form-label d-inline-block">${ssrInterpolate("Mass")}</label></div><div class="col-8 col-lg-7"><div class="input-group input-group-sm"><input type="number" class="form-control form-control-sm" id="menu_mass"${ssrRenderAttr("value", unref(form_add_menu).mass)}><input type="text" class="form-control form-control-sm" id="menu_mass_unit"${ssrRenderAttr("value", unref(form_add_menu).mass_unit)} placeholder="unit: gram, ..."></div>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_add_menu).errors.mass,
          class: "mt-2"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_add_menu).errors.mass_unit,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="menu_stock" class="form-label d-inline-block">${ssrInterpolate("Stock")}</label></div><div class="col-8 col-lg-7"><input type="number" class="form-control form-control-sm" id="menu_stock"${ssrRenderAttr("value", unref(form_add_menu).stock)} required>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_add_menu).errors.stock,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="menu_price" class="form-label d-inline-block">${ssrInterpolate("Price")}</label></div><div class="col-8 col-lg-7"><input type="number" class="form-control form-control-sm" id="menu_price"${ssrRenderAttr("value", unref(form_add_menu).price)} required>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_add_menu).errors.price,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="menu_image" class="form-label d-inline-block">${ssrInterpolate("Image")}</label></div><div class="col-8 col-lg-7"><input type="file" class="form-control form-control-sm" id="menu_image" required><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Ratio = 1:1 ")}</span>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_add_menu).errors.image,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-primary w-25">${ssrInterpolate("Add Menu")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(auth_user).id == __props.stand.pic_id && __props.stand.sale_validation == 0) {
        _push(`<div class="modal fade" id="editMenuImageModal" tabindex="-1" aria-labelledby="editMenuImageModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-image pe-2"></i> ${ssrInterpolate("Edit Menu Image")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><div class="modal-body bg-light"><div class="row mt-0 justify-content-center"><div class="col-4 col-lg-3"><label for="menu_name" class="form-label d-inline-block">${ssrInterpolate("Name")}</label></div><div class="col-8 col-lg-7"><span class="rounded text-secondary px-2 py-1 w-100">${ssrInterpolate((_a = selected_menu.value) == null ? void 0 : _a.name)}</span></div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="edit_menu_image" class="form-label d-inline-block">${ssrInterpolate("New Image")}</label></div><div class="col-8 col-lg-7"><input type="file" class="form-control form-control-sm" id="edit_menu_image" required><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Ratio = 1:1 ")}</span>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_edit_menu_image).errors.image,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-primary w-25">${ssrInterpolate("Submit")}</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(auth_user).id == __props.stand.pic_id && __props.stand.sale_validation == 0) {
        _push(`<div class="modal fade" id="addStockModal" tabindex="-1" aria-labelledby="addStockModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-box-seam pe-2"></i> ${ssrInterpolate("Update Stock")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><form><div class="modal-body bg-light"><div class="row mt-0 justify-content-center"><div class="col-4 col-lg-3"><label class="form-label d-inline-block">${ssrInterpolate("Menu")}</label></div><div class="col-8 col-lg-7"><div class="d-flex"><span class="bg-white rounded-2 border w-100 text-secondary px-2 py-1">${ssrInterpolate((_b = selected_stock.value) == null ? void 0 : _b.name)}</span></div></div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label class="form-label d-inline-block">${ssrInterpolate("Old Stock")}</label></div><div class="col-8 col-lg-7"><div class="d-flex"><span class="bg-white rounded-2 border w-100 text-secondary px-2 py-1">${ssrInterpolate(((_c = selected_stock.value) == null ? void 0 : _c.stock) + " pcs")}</span></div></div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="stock_amount" class="form-label d-inline-block">${ssrInterpolate("Add")}</label></div><div class="col-8 col-lg-7"><div class="input-group input-group-sm bg-light rounded-2 border"><input type="number" class="form-control form-control-sm" id="stock_amount"${ssrRenderAttr("value", unref(form_add_stock).amount)} placeholder="Add ( - ) to reduce"><span class="rounded-end rounded-2 text-secondary px-2 py-1">${ssrInterpolate("pcs")}</span></div>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_add_stock).errors.amount,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label class="form-label d-inline-block">${ssrInterpolate("Total Stock")}</label></div><div class="col-8 col-lg-7"><div class="d-flex"><span class="bg-white rounded-2 border w-100 text-secondary px-2 py-1">${ssrInterpolate(((_d = selected_stock.value) == null ? void 0 : _d.stock) + unref(form_add_stock).amount + " pcs")}</span></div></div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-primary w-25">${ssrInterpolate("Add Stock")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (is_production.value) {
        _push(`<div class="modal fade" id="addExpenseModal" tabindex="-1" aria-labelledby="addExpenseModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-cart4 pe-2"></i> ${ssrInterpolate("New Expense")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><form><div class="modal-body bg-light"><div class="row mt-0 justify-content-center"><div class="col-4 col-lg-3"><label for="expense_name" class="form-label d-inline-block">${ssrInterpolate("Name")}</label></div><div class="col-8 col-lg-7"><input type="text" class="form-control form-control-sm" id="expense_name"${ssrRenderAttr("value", unref(form_add_expense).name)} required>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_add_expense).errors.name,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="expense_price" class="form-label d-inline-block">${ssrInterpolate("Price")}</label></div><div class="col-8 col-lg-7"><input type="number" class="form-control form-control-sm" id="expense_price"${ssrRenderAttr("value", unref(form_add_expense).price)} required>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_add_expense).errors.price,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="expense_qty" class="form-label d-inline-block">${ssrInterpolate("Quantity/unit")}</label></div><div class="col-8 col-lg-7"><div class="input-group input-group-sm"><input type="number" class="form-control form-control-sm" id="expense_qty"${ssrRenderAttr("value", unref(form_add_expense).qty)}><input type="text" class="form-control form-control-sm" id="expense_unit"${ssrRenderAttr("value", unref(form_add_expense).unit)} placeholder="pcs, ml, ..."></div>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_add_expense).errors.qty,
          class: "mt-2"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_add_expense).errors.unit,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="expense_price" class="form-label d-inline-block">${ssrInterpolate("Total Price")}</label></div><div class="col-8 col-lg-7"><span>${ssrInterpolate(unref(formatIDR)(
          (((_e = unref(form_add_expense)) == null ? void 0 : _e.price) ?? 0) * (((_f = unref(form_add_expense)) == null ? void 0 : _f.qty) ?? 0)
        ))}</span></div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="expense_stock" class="form-label d-inline-block">${ssrInterpolate("Receipt")}</label></div><div class="col-8 col-lg-7">`);
        if (!unref(form_add_expense).same_receipt_check) {
          _push(`<input type="file" class="form-control form-control-sm" name="reciept">`);
        } else {
          _push(`<!---->`);
        }
        if (unref(form_add_expense).same_receipt_check) {
          _push(ssrRenderComponent(unref(vSelect), {
            class: "bg-white text-nowrap",
            options: __props.expense_list,
            label: "name",
            reduce: (expense) => expense.id,
            modelValue: unref(form_add_expense).receipt_same,
            "onUpdate:modelValue": ($event) => unref(form_add_expense).receipt_same = $event,
            placeholder: "Select Item"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (__props.expense_list.length > 0) {
          _push(`<label for="same_receipt_check" class="inline-flex items-center mt-1"><input id="same_receipt_check" type="checkbox"${ssrIncludeBooleanAttr(
            Array.isArray(
              unref(form_add_expense).same_receipt_check
            ) ? ssrLooseContain(
              unref(form_add_expense).same_receipt_check,
              null
            ) : unref(form_add_expense).same_receipt_check
          ) ? " checked" : ""} class="rounded"><span class="ms-2 text-sm">${ssrInterpolate("same as exist item")}</span></label>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_add_expense).errors.reciept
        }, null, _parent));
        _push(`</div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-primary w-25">${ssrInterpolate("Add Menu")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="modal fade" id="receiptModal" tabindex="-1" aria-labelledby="receiptModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header border-2 py-2 ps-3 pe-2"><span class="h6 text-primary-emphasis mb-0 me-auto"><i class="bi bi-receipt me-2"></i>${ssrInterpolate("Expense Receipt")}</span><button class="btn btn-sm btn-outline-secondary border-0" data-bs-toggle="modal" data-bs-dismiss="true"><i class="bi bi-x-lg"></i></button></div><div class="modal-body pt-0"><div class="d-flex w-100"><a${ssrRenderAttr(
        "href",
        "/storage/images/receipt/stand/expense/" + ((_g = selected_expense.value) == null ? void 0 : _g.reciept)
      )} download class="btn btn-sm border-0 text-decoration-none mx-auto w-50">${ssrInterpolate((_h = selected_expense.value) == null ? void 0 : _h.reciept)} <i class="bi bi-download text-primary ms-2"></i></a></div><div class="scroll-container-3 w-100" style="${ssrRenderStyle({ "min-height": "200px" })}"><img${ssrRenderAttr(
        "src",
        "/storage/images/receipt/stand/expense/" + ((_i = selected_expense.value) == null ? void 0 : _i.reciept)
      )} alt="image" class="img-fluid w-100 h-100 object-fit-cover placeholder"></div><div class="d-flex text-secondary"><span class="">${ssrInterpolate(((_j = selected_expense.value) == null ? void 0 : _j.operational_id) > 0 ? "Validated by " + ((_k = selected_expense.value) == null ? void 0 : _k.operational.name) : "Unvalidated")}</span><span class="ms-auto">${ssrInterpolate(unref(formatDate)((_l = selected_expense.value) == null ? void 0 : _l.updated_at))}</span></div><div class="d-flex"><span class="">${ssrInterpolate((_m = selected_expense.value) == null ? void 0 : _m.name)}</span><span class="ms-auto text-secondary">${ssrInterpolate(unref(formatIDR)((_n = selected_expense.value) == null ? void 0 : _n.total_price))}</span></div>`);
      if (unref(auth_user).roles_id == 3) {
        _push(`<div class="d-flex w-100 mt-2"><button data-bs-toggle="modal" data-bs-dismiss="true" class="${ssrRenderClass(
          "w-100 btn btn-sm btn-" + (((_o = selected_expense.value) == null ? void 0 : _o.operational_id) > 0 ? "secondary" : "success")
        )}">${ssrInterpolate(((_p = selected_expense.value) == null ? void 0 : _p.operational_id) > 0 ? "Unvalidate" : "Validate")}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><div class="modal fade" id="incomeDetailModal" tabindex="-1" aria-labelledby="incomeDetailModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header border-2 py-2 ps-3 pe-2"><span class="h6 text-primary-emphasis mb-0 me-auto"><i class="bi bi-receipt me-2"></i>${ssrInterpolate("Receipt")}</span><button class="btn btn-sm btn-outline-secondary border-0"><i class="bi bi-x-lg"></i></button></div><div class="modal-body p-0"><div class="bg-white watermark-background" style="${ssrRenderStyle({ "background": "url('/storage/local/images/shop/brand/logo_watermark.png')", "background-repeat": "repeat", "background-size": "25mm" })}"><div class="p-3" style="${ssrRenderStyle({ "background-color": "#412f55" })}"><div class="d-flex w-100"><div class="mx-auto"><img${ssrRenderAttr("src", "/storage/local/images/shop/brand/blaterian_logo.png")} alt="image" class="" style="${ssrRenderStyle({ "height": "15mm" })}"><img${ssrRenderAttr("src", "/storage/local/images/shop/brand/blaterian_text.png")} alt="image" class="" style="${ssrRenderStyle({ "height": "15mm" })}"></div></div></div><div class="p-3"><div class="row g-3"><div class="col-6"><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Date & Time")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate(unref(formatDateOnly)(
        (_q = selected_income.value) == null ? void 0 : _q.created_at
      ) + " - " + unref(formatTimeOnly)(
        (_r = selected_income.value) == null ? void 0 : _r.created_at
      ))}</span></div></div><div class="col-6"><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Place")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate((_s = __props.stand) == null ? void 0 : _s.place)}</span></div></div><div class="col-6"><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Customer")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate(((_u = (_t = selected_income.value) == null ? void 0 : _t.customer) == null ? void 0 : _u.name) ?? "Unregistered")}</span></div></div><div class="col-6"><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Cashier")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate((_w = (_v = selected_income.value) == null ? void 0 : _v.cashier) == null ? void 0 : _w.name)}</span></div></div></div><div class="border-1 border-secondary-subtle mt-3" style="${ssrRenderStyle({ "border-style": "dashed" })}"></div><div class="mt-2"><span class="d-block h6 text-primary-emphasis">${ssrInterpolate("Order Items")}</span><!--[-->`);
      ssrRenderList((_x = selected_income.value) == null ? void 0 : _x.order, (item) => {
        _push(`<div class="mt-2"><div class="d-flex"><span class="me-2">${ssrInterpolate("(" + item.amount + ")")}</span><span class="fw-bold me-2">${ssrInterpolate(item.menu.name)}</span></div><div class="d-flex"><span class="me-auto text-secondary">${ssrInterpolate(unref(formatIDR)(item.menu.price))}</span><span class="ms-2">${ssrInterpolate(unref(formatIDR)(
          item.menu.price * item.amount
        ))}</span></div></div>`);
      });
      _push(`<!--]--></div><div class="border-1 border-secondary-subtle mt-3" style="${ssrRenderStyle({ "border-style": "dashed" })}"></div><div class="mt-2"><span class="d-block h6 text-primary-emphasis">${ssrInterpolate("Total")}</span><div class="d-flex"><div class=""><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Subtotal")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate(unref(formatIDR)(
        ((_y = selected_income.value) == null ? void 0 : _y.transaction) + ((_z = selected_income.value) == null ? void 0 : _z.discount)
      ))}</span></div></div><div class="mx-auto"><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Discount")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate(unref(formatIDR)(
        (_A = selected_income.value) == null ? void 0 : _A.discount
      ))}</span></div></div><div class=""><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Total")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap fw-bold">${ssrInterpolate(unref(formatIDR)(
        (_B = selected_income.value) == null ? void 0 : _B.transaction
      ))}</span></div></div></div></div><div class="border-1 border-secondary-subtle mt-3" style="${ssrRenderStyle({ "border-style": "dashed" })}"></div><div class="mt-2"><span class="d-block h6 text-primary-emphasis">${ssrInterpolate("Payment")}</span><div class="d-flex"><div class=""><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Method")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate((_D = (_C = selected_income.value) == null ? void 0 : _C.payment) == null ? void 0 : _D.name)}</span></div></div><div class="mx-auto"><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Price")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate(unref(formatIDR)(
        ((_E = selected_income.value) == null ? void 0 : _E.payment_price) > 0 ? (_F = selected_income.value) == null ? void 0 : _F.payment_price : (_G = selected_income.value) == null ? void 0 : _G.transaction
      ))}</span></div></div><div class=""><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Change")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate(unref(formatIDR)(
        ((_H = selected_income.value) == null ? void 0 : _H.payment_price) ?? ((_I = selected_income.value) == null ? void 0 : _I.transaction) - ((_J = selected_income.value) == null ? void 0 : _J.transaction)
      ))}</span></div></div></div></div></div><div style="${ssrRenderStyle({ "background-color": "#412f55", "border-top-style": "dashed", "border-top-color": "#efc55c", "border-top-width": "0.1rem" })}"><div class="d-flex"><span class="mx-auto my-2" style="${ssrRenderStyle({ "font-size": "0.8rem", "color": "#efc55c" })}"><i class="bi bi-instagram me-2"></i> ${ssrInterpolate("blaterian.id")}</span></div></div></div></div><div class="modal-footer p-0"><div class="d-flex w-100"><button class="btn btn-sm btn-outline-primary border-0 w-50 text-nowrap"><i class="bi bi-download me-2"></i> ${ssrInterpolate("Download")}</button><button class="btn btn-sm btn-outline-primary border-0 w-50 text-nowrap"><i class="bi bi-whatsapp me-2"></i> ${ssrInterpolate("Chat Customer")}</button></div></div></div></div></div><div class="modal fade" id="prouctionStaffModal" tabindex="-1" aria-labelledby="prouctionStaffModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3 text-dark"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title h5 text-primary-emphasis"><i class="bi bi-perople border-secondary"></i> ${ssrInterpolate("Production Staff")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><div class="modal-body"><div class="d-flex border-bottom border-2 pb-1"><span class="text-dark">${ssrInterpolate("Staff List")}</span></div><!--[-->`);
      ssrRenderList(unref(form_production_staff).staff_list, (item, index) => {
        _push(`<div class="">`);
        if (item.deleted_at == null) {
          _push(`<div class="d-flex"><div class="w-100"><label style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${ssrRenderAttr("for", "form_production_staff_" + index)} class="form-label text-secondary">${ssrInterpolate("Name")}</label><span class="d-block bg-white rounded-2 border px-2 py-1">${ssrInterpolate(unref(form_production_staff).staff_list[index].name)}</span></div>`);
          if (unref(auth_user).id == __props.stand.pic_id) {
            _push(`<button type="button" class="btn btn-sm btn-outline-secondary border-0 ms-2 mt-1 mb-auto"><i class="bi bi-trash3"></i></button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(form_production_staff).errors.staff_list
      }, null, _parent));
      if (unref(auth_user).id == __props.stand.pic_id) {
        _push(`<div class="d-flex"><div class="w-100"><label style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${ssrRenderAttr("for", "new_production_staff_")} class="form-label text-secondary">${ssrInterpolate("New Staff Name")}</label>`);
        _push(ssrRenderComponent(unref(vSelect), {
          id: "new_production_staff_",
          class: "bg-white text-nowrap w-100 me-2",
          options: __props.users,
          label: "name",
          reduce: (staff) => staff,
          modelValue: new_production_staff.value.staff,
          "onUpdate:modelValue": ($event) => new_production_staff.value.staff = $event,
          placeholder: "ex: Timothy",
          required: ""
        }, null, _parent));
        _push(`</div><button type="button" class="btn btn-sm btn-outline-primary border-0 ms-2 mt-1 mb-auto"><i class="bi bi-plus-lg"></i></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="modal-footer p-1">`);
      if (unref(auth_user).id == __props.stand.pic_id) {
        _push(`<div class="d-flex w-100"><button class="btn btn-sm btn-outline-primary w-50 rounded-end-0">${ssrInterpolate("Reset")}</button><button class="btn btn-sm btn-primary w-50 rounded-start-0">${ssrInterpolate("Save")}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><div class="modal fade" id="cashierStaffModal" tabindex="-1" aria-labelledby="cashierStaffModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3 text-dark"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title h5 text-primary-emphasis"><i class="bi bi-perople border-secondary"></i> ${ssrInterpolate("Cashier Staff")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><div class="modal-body"><div class="d-flex border-bottom border-2 pb-1"><span class="text-dark">${ssrInterpolate("Staff List")}</span></div><!--[-->`);
      ssrRenderList(unref(form_cashier_staff).staff_list, (item, index) => {
        _push(`<div class="">`);
        if (item.deleted_at == null) {
          _push(`<div class="d-flex"><div class="w-100"><label style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${ssrRenderAttr("for", "form_cashier_staff_" + index)} class="form-label text-secondary">${ssrInterpolate("Name")}</label><span class="d-block bg-white rounded-2 border px-2 py-1">${ssrInterpolate(unref(form_cashier_staff).staff_list[index].name)}</span></div>`);
          if (unref(auth_user).id == __props.stand.pic_id) {
            _push(`<button type="button" class="btn btn-sm btn-outline-secondary border-0 ms-2 mt-1 mb-auto"><i class="bi bi-trash3"></i></button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(form_cashier_staff).errors.staff_list
      }, null, _parent));
      if (unref(auth_user).id == __props.stand.pic_id) {
        _push(`<div class="d-flex"><div class="w-100"><label style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${ssrRenderAttr("for", "new_cashier_staff_")} class="form-label text-secondary">${ssrInterpolate("New Cashier Name")}</label>`);
        _push(ssrRenderComponent(unref(vSelect), {
          id: "new_cashier_staff_",
          class: "bg-white text-nowrap w-100 me-2",
          options: __props.users,
          label: "name",
          reduce: (staff) => staff,
          modelValue: new_cashier_staff.value.staff,
          "onUpdate:modelValue": ($event) => new_cashier_staff.value.staff = $event,
          placeholder: "ex: Timothy",
          required: ""
        }, null, _parent));
        _push(`</div><button type="button" class="btn btn-sm btn-outline-primary border-0 ms-2 mt-1 mb-auto"><i class="bi bi-plus-lg"></i></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="modal-footer p-1">`);
      if (unref(auth_user).id == __props.stand.pic_id) {
        _push(`<div class="d-flex w-100"><button class="btn btn-sm btn-outline-primary w-50 rounded-end-0">${ssrInterpolate("Reset")}</button><button class="btn btn-sm btn-primary w-50 rounded-start-0">${ssrInterpolate("Save")}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><div class="modal fade" id="danaContactModal" tabindex="-1" aria-labelledby="danaContactModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header border-2 py-2 ps-3 pe-2"><span class="h6 text-primary-emphasis mb-0 me-auto"><svg class="icon icon-dana d-inline rounded-circle border-primary border me-2" style="${ssrRenderStyle({ "width": "1rem", "height": "1rem", "padding": "0.1rem" })}"><use href="/icons.svg#dana"></use></svg>${ssrInterpolate("Dana Contact")}</span><button class="btn btn-sm btn-outline-secondary border-0"><i class="bi bi-x-lg"></i></button></div><div class="modal-body p-3"><div class="bg-white rounded"><div class="d-flex"><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Contact Name")}</span></div><input type="text" required placeholder="e.g Timothy Arella" class="form-control form-control-sm"${ssrRenderAttr("value", unref(form_set_dana_contact).name)}></div><div class="bg-white rounded mt-3"><div class="d-flex"><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Contact Number")}</span></div><input type="tel" required placeholder="e.g 08xxxxxxxx" class="form-control form-control-sm"${ssrRenderAttr("value", unref(form_set_dana_contact).number)}></div></div><div class="modal-footer px-2 py-1"><div class="d-flex w-100"><button class="btn btn-sm btn-primary border-0 w-100 text-nowrap"><i class="bi bi-person-fill-check me-2"></i> ${ssrInterpolate("Set Contact")}</button></div></div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        ref_key: "toastNotifRef",
        ref: toastNotifRef
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Business/StandDetail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
