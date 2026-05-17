import { ref, watch, computed, onMounted, withCtx, unref, createVNode, createBlock, createCommentVNode, createTextVNode, toDisplayString, openBlock, Fragment, renderList, withDirectives, vModelText, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-CmduQjnL.js";
import { _ as _sfc_main$2 } from "./InputError-DkffFxkw.js";
import { _ as _sfc_main$3 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CaKJYApU.js";
import { M as ModalAlertNotification } from "./ModalAlertNotification-DTKoiHkW.js";
import vSelect from "vue-select";
/* empty css                    */
import { usePage, useForm, Head } from "@inertiajs/vue3";
import "html2canvas";
import { f as formatIDR, a as formatDate } from "./utils-DIF4pdrF.js";
import { format } from "date-fns";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
const _sfc_main = {
  __name: "StandCashier",
  __ssrInlineRender: true,
  props: {
    stand: Object,
    menu_list: Object,
    customer_list: Array,
    order_list: Array,
    today_sales: Array,
    payment_method_list: Array,
    data: Object,
    notif: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const title = ref("Cashier");
    const modalConfirmationRef = ref(null);
    const modalAlertNotificationRef = ref(null);
    const modalPrintReceipt = ref(null);
    const modalNewCustomer = ref(null);
    const modalCashierHelp = ref(null);
    const customerSelect = ref(null);
    const toastNotifRef = ref(null);
    ref(null);
    ref(null);
    const currentSearch = ref("");
    const selectedTodaySale = ref(null);
    watch(() => props.data, (newData) => {
      if (newData && newData.new_customer_id) {
        form_transaction.customer_id = newData.new_customer_id;
        const newCustomer = props.customer_list.find((c) => c.id == newData.new_customer_id);
        if (newCustomer) {
          form_transaction.customer = newCustomer.name;
        }
        toastNotifRef.value.showToast("info", "New customer auto-selected");
      }
    }, { deep: true });
    const active_tab = ref(1);
    const selected_order = ref();
    ref("placeholder");
    ref(/* @__PURE__ */ new Date());
    const is_cashier = computed(() => {
      return props.stand.cashier.some((cashier) => cashier.id == auth_user.id);
    });
    ref({
      id: null,
      print: false
    });
    const form_transaction = useForm({
      customer: null,
      customer_id: null,
      order: [],
      discount: 0,
      subtotal: 0,
      transaction: 0,
      payment_method_id: 1,
      payment_price: 0
    });
    const form_new_customer = useForm({
      name: null,
      phone: null
    });
    const form_print_receipt = ref({
      date: null,
      customer: null,
      customer_id: null,
      order_list: null,
      discount: null,
      transaction: null,
      payment_method_id: null,
      payment_price: null
    });
    function addOrder(menu) {
      const index = form_transaction.order.findIndex(
        (item) => item.menu_id === menu.id
      );
      if (index !== -1) {
        form_transaction.order[index].amount += 1;
        form_transaction.order[index].total += Number(
          form_transaction.order[index].price
        );
        form_transaction.subtotal += Number(
          form_transaction.order[index].price
        );
      } else {
        form_transaction.order.push({
          menu_id: menu.id,
          name: menu.name,
          price: Number(menu.price),
          amount: 1,
          total: Number(menu.price)
        });
        form_transaction.subtotal += Number(menu.price);
      }
    }
    function handleSubmitSale() {
      form_transaction.post(`/seeo/staff/food/stand/sales/add/${props.stand.id}`, {
        onError: (errors) => {
          for (const key in errors) {
            toastNotifRef.value.showToast("warning", errors[key]);
          }
        }
      });
    }
    function debugOpenStandDetail() {
      console.debug("[StandCashier] opening detail", {
        standId: props.stand.id,
        standName: props.stand.name,
        href: `/seeo/staff/blaterian/foods/stand_detail/${props.stand.id}`
      });
    }
    function showPrintReceiptModal(is_show) {
      if (modalPrintReceipt.value == null) {
        const modal = document.getElementById("printReceiptModal");
        modalPrintReceipt.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalPrintReceipt.value.show();
      }
    }
    function showNewCustomerModal(is_show) {
      if (modalNewCustomer.value == null) {
        const modal = document.getElementById("newCustomerModal");
        modalNewCustomer.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalNewCustomer.value.show();
      }
    }
    function showCashierHelpModal(is_show) {
      if (modalCashierHelp.value == null) {
        const modal = document.getElementById("cashierHelpModal");
        modalCashierHelp.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalCashierHelp.value.show();
      }
    }
    function openTodayReceiptModal(sale) {
      var _a;
      selectedTodaySale.value = sale;
      form_print_receipt.value.date = format(new Date(sale.created_at), "EE, dd/MM/yy HH:mm");
      form_print_receipt.value.customer = ((_a = sale.customer) == null ? void 0 : _a.name) ?? sale.customer ?? "â€”";
      form_print_receipt.value.customer_id = sale.customer_id;
      form_print_receipt.value.order_list = sale.order;
      form_print_receipt.value.subtotal = (sale.transaction ?? 0) + (sale.discount ?? 0);
      form_print_receipt.value.discount = sale.discount ?? 0;
      form_print_receipt.value.transaction = sale.transaction ?? 0;
      form_print_receipt.value.payment_method_id = sale.payment_method_id;
      form_print_receipt.value.payment_price = sale.payment_price ?? 0;
      form_print_receipt.value.payment_change = (sale.payment_price ?? 0) - (sale.transaction ?? 0);
      showPrintReceiptModal();
    }
    function openNewCustomerModal() {
      var _a, _b;
      if (auth_user.roles_id != 99 && !props.stand.cashier.some((c) => c.id === auth_user.id)) {
        alertNotification(
          "You are not listed as Cashier in Stand " + props.stand.name + ". Only cashier can add customer."
        );
      } else {
        const searchVal = ((_a = currentSearch.value) == null ? void 0 : _a.trim()) ?? "";
        form_new_customer.phone = searchVal !== "" ? searchVal : "";
        const nameVal = ((_b = form_transaction.customer) == null ? void 0 : _b.trim()) ?? "";
        form_new_customer.name = nameVal !== "" ? nameVal : "";
        showNewCustomerModal();
      }
    }
    function resetForm() {
      form_transaction.customer = null;
      form_transaction.customer_id = null;
      form_transaction.discount = null;
      form_transaction.order = [];
      form_transaction.transaction = null;
      form_transaction.subtotal = null;
      form_transaction.payment_method_id = 1;
      form_transaction.payment_price = 0;
    }
    function onSearchCustomer(search) {
      currentSearch.value = search;
      if (search && search.trim() !== "") {
        form_new_customer.phone = search;
      }
    }
    const onInputCustomer = () => {
      if (form_transaction.customer) {
        form_new_customer.name = form_transaction.customer;
      }
    };
    function alertNotification(message) {
      modalAlertNotificationRef.value.showModal(message);
    }
    onMounted(() => {
    });
    watch(
      () => props.notif,
      (newValue) => {
        const notification = newValue;
        toastNotifRef.value.showToast(notification.type, notification.message);
      }
    );
    watch(
      () => form_transaction.discount,
      (newValue) => {
        const discount = Number(newValue);
        form_transaction.transaction = form_transaction.subtotal - discount;
      }
    );
    watch(
      () => form_transaction.subtotal,
      (newValue) => {
        const subtotal = Number(newValue);
        form_transaction.transaction = subtotal - form_transaction.discount;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(StaffLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a href="/blaterian/foods/stand" class="bg-opacity-0 text-decoration-none text-primary-emphasis"${_scopeId}><span class="fw-light"${_scopeId}>${ssrInterpolate("Stand")}</span></a><span class="mx-2"${_scopeId}>${ssrInterpolate("/")}</span><a${ssrRenderAttr("href", `/seeo/staff/blaterian/foods/stand_detail/${__props.stand.id}`)} class="bg-opacity-0 text-decoration-none text-primary-emphasis"${_scopeId}><span class="fw-light"${_scopeId}>${ssrInterpolate(__props.stand.name)}</span></a><span class="mx-2"${_scopeId}>${ssrInterpolate("/")}</span> ${ssrInterpolate(title.value)}`);
          } else {
            return [
              createVNode("a", {
                href: "/blaterian/foods/stand",
                class: "bg-opacity-0 text-decoration-none text-primary-emphasis"
              }, [
                createVNode("span", { class: "fw-light" }, toDisplayString("Stand"))
              ]),
              createVNode("span", { class: "mx-2" }, toDisplayString("/")),
              createVNode("a", {
                href: `/seeo/staff/blaterian/foods/stand_detail/${__props.stand.id}`,
                onClick: ($event) => debugOpenStandDetail(),
                class: "bg-opacity-0 text-decoration-none text-primary-emphasis"
              }, [
                createVNode("span", { class: "fw-light" }, toDisplayString(__props.stand.name), 1)
              ], 8, ["href", "onClick"]),
              createVNode("span", { class: "mx-2" }, toDisplayString("/")),
              createTextVNode(" " + toDisplayString(title.value), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: title.value,
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(ModalAlertNotification, {
              ref_key: "modalAlertNotificationRef",
              ref: modalAlertNotificationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="container me-lg-0 mx-auto mb-5"${_scopeId}><div class="row gx-4 mt-4"${_scopeId}><div class="col-12 col-lg-5"${_scopeId}><div class="card bg-white p-3"${_scopeId}><div class="d-flex"${_scopeId}><span class="h5 text-primary-emphasis me-auto"${_scopeId}><i class="bi bi-shop me-2"${_scopeId}></i>${ssrInterpolate("Stand " + __props.stand.name)}</span><button class="btn btn-sm btn-outline-info border-0 py-0 mb-auto" title="Panduan Kasir"${_scopeId}><i class="bi bi-question-circle"${_scopeId}></i></button></div><div class="row g-2 mt-1"${_scopeId}><div class="col-6"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("In Charge")}</span><div class="scroll-x-hidden"${_scopeId}><span class="d-block text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(__props.stand.pic.name)}</span></div></div><div class="col-6"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Place")}</span><div class="scroll-x-hidden"${_scopeId}><span class="d-block text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(__props.stand.place)}</span></div></div></div></div><div class="card my-4 bg-white p-1 d-lg-none"${_scopeId}><div class="d-flex"${_scopeId}><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary border-0 w-33 " + (active_tab.value == 1 ? "active" : "")
            )}" style="${ssrRenderStyle({ "width": "33.33%" })}"${_scopeId}><i class="fa-solid fa-cash-register me-2"${_scopeId}></i> ${ssrInterpolate("Cashier")}</button><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary border-0 " + (active_tab.value == 3 ? "active" : "")
            )}" style="${ssrRenderStyle({ "width": "33.33%" })}"${_scopeId}><i class="bi bi-receipt me-2"${_scopeId}></i> ${ssrInterpolate("Today")} `);
            if (((_a2 = __props.today_sales) == null ? void 0 : _a2.length) > 0) {
              _push2(`<span class="badge bg-primary ms-1" style="${ssrRenderStyle({ "font-size": "0.65rem" })}"${_scopeId}>${ssrInterpolate(__props.today_sales.length)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button></div></div>`);
            if (active_tab.value == 1) {
              _push2(`<div class="card bg-white p-3 my-4"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-primary h6 mb-0 me-auto"${_scopeId}><i class="bi bi-list-ul me-2"${_scopeId}></i>${ssrInterpolate("Menu")}</span><span class="text-secondary fst-italic ms-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Click on the menu, to add customer order.")}</span></div><div class="scroll-container-3 scroll-container-lg-2 pe-1"${_scopeId}><!--[-->`);
              ssrRenderList(__props.menu_list, (list, category) => {
                _push2(`<li class="list-group list-group-flush"${_scopeId}><ul class="list-group-item list-group-item-light py-1 ps-0 pe-2 mb-0"${_scopeId}><span class="text-secondary"${_scopeId}>${ssrInterpolate(category)}</span></ul><!--[-->`);
                ssrRenderList(list, (item) => {
                  _push2(`<ul class="list-group-item list-group-item-action py-1 ps-0 pe-2 mb-0"${_scopeId}><div class="d-flex"${_scopeId}><span class="rounded-2 text-nowrap"${_scopeId}>${ssrInterpolate("(")} <span class="${ssrRenderClass(
                    "text-nowrap text-" + (item.stock - item.sale == 0 ? "danger" : item.stock - item.sale <= 5 ? "warning" : "dark")
                  )}"${_scopeId}>${ssrInterpolate(item.sale)}</span> ${ssrInterpolate("/")} <span class="${ssrRenderClass(
                    "text-nowrap text-" + (item.stock == 0 ? "danger" : "dark")
                  )}"${_scopeId}>${ssrInterpolate(item.stock)}</span> ${ssrInterpolate(")")}</span><span class="scroll-x-hidden ms-2 me-auto my-auto"${_scopeId}><span class="text-nowrap text-primary-emphasis"${_scopeId}>${ssrInterpolate(item.name)}</span><span class="text-nowrap text-secondary"${_scopeId}>${ssrInterpolate((item.volume || item.mass ? " - " : "") + (item.volume ? item.volume + item.volume_unit : "") + (item.mass ? item.mass + item.mass_unit : ""))}</span></span><span class="text-nowrap my-auto text-primary"${_scopeId}>${ssrInterpolate(unref(formatIDR)(item.price))}</span></div></ul>`);
                });
                _push2(`<!--]--></li>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-12 col-lg-7"${_scopeId}><div class="card mb-4 bg-white p-1 d-lg-block d-none"${_scopeId}><div class="d-flex"${_scopeId}><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary border-0 " + (active_tab.value == 1 ? "active" : "")
            )}" style="${ssrRenderStyle({ "width": "33.33%" })}"${_scopeId}><i class="fa-solid fa-cash-register me-2"${_scopeId}></i> ${ssrInterpolate("Cashier")}</button><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary border-0 " + (active_tab.value == 3 ? "active" : "")
            )}" style="${ssrRenderStyle({ "width": "33.33%" })}"${_scopeId}><i class="bi bi-receipt me-2"${_scopeId}></i> ${ssrInterpolate("Today's Transactions")} `);
            if (((_b2 = __props.today_sales) == null ? void 0 : _b2.length) > 0) {
              _push2(`<span class="badge bg-primary ms-1" style="${ssrRenderStyle({ "font-size": "0.65rem" })}"${_scopeId}>${ssrInterpolate(__props.today_sales.length)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button></div></div>`);
            if (active_tab.value == 1) {
              _push2(`<div class="card bg-white p-3 mb-4"${_scopeId}><div class="d-flex"${_scopeId}><span class="h6 mb-0 text-primary"${_scopeId}>${ssrInterpolate("Point Of Sales")}</span></div><div class="d-flex mt-2 bg-light"${_scopeId}><button class="btn-outline-secondary btn py-1 rounded-0 w-100 border-0"${_scopeId}>${ssrInterpolate("New Transaction")}</button></div><div class="row g-2 mt-1"${_scopeId}><div class="col-6 col-lg-4"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Cashier")}</span><div class="scroll-x-hidden"${_scopeId}><span class="d-block text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(unref(auth_user).name)}</span></div></div><div class="col-12 col-lg-8"${_scopeId}><label for="customer" class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Customer")}</label><div class="d-flex"${_scopeId}><input type="text"${ssrRenderAttr("value", unref(form_transaction).customer)} class="form-control form-control-sm py-0 w-50 me-2" placeholder="ex: Timothy"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(vSelect), {
                ref_key: "customerSelect",
                ref: customerSelect,
                class: "bg-white text-nowrap w-100 me-2",
                options: __props.customer_list,
                label: "phone",
                reduce: (customer) => customer.id,
                modelValue: unref(form_transaction).customer_id,
                "onUpdate:modelValue": ($event) => unref(form_transaction).customer_id = $event,
                placeholder: "08xxxxxx",
                onSearch: onSearchCustomer,
                "onOption:selected": () => {
                  unref(form_transaction).customer = __props.customer_list.find(
                    (item) => item.id == unref(form_transaction).customer_id
                  ).name;
                }
              }, null, _parent2, _scopeId));
              _push2(`<button class="btn btn-sm btn-outline-primary"${_scopeId}><i class="bi bi-plus-lg"${_scopeId}></i></button></div>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                message: unref(form_transaction).errors.customer_id,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="row"${_scopeId}><div class="col-12"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Order")}</span><div class="border rounded-3" style="${ssrRenderStyle({ "min-height": "50px" })}"${_scopeId}>`);
              if (((_c2 = unref(form_transaction).order) == null ? void 0 : _c2.length) == 0) {
                _push2(`<span class="text-secondary fst-italic ms-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Add an order from menu list.")}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="scroll-container scroll-container-lg pe-1"${_scopeId}>`);
              if (((_d2 = unref(form_transaction).order) == null ? void 0 : _d2.length) > 0) {
                _push2(`<li class="list-group list-group-flush px-2"${_scopeId}><!--[-->`);
                ssrRenderList(unref(form_transaction).order, (menu, index) => {
                  _push2(`<ul class="list-group-item list-group-item-action mb-0 py-1 px-1"${_scopeId}><div class="d-flex"${_scopeId}><button class="btn btn-sm btn-outline-primary border-0 py-0"${_scopeId}><i class="${ssrRenderClass(
                    "bi bi-" + (menu.amount > 1 ? "dash-lg" : "trash3")
                  )}" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}></i></button><span class="text-secondary mx-1"${_scopeId}>${ssrInterpolate(menu.amount)}</span><button class="btn btn-sm btn-outline-primary border-0 py-0"${_scopeId}><i class="bi bi-plus-lg" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}></i></button><span class="scroll-x-hidden me-auto"${_scopeId}><span class="text-nowrap text-primary-emphasis"${_scopeId}>${ssrInterpolate(menu.name)}</span></span><span class="ms-2 text-secondary"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                    menu.total
                  ))}</span></div></ul>`);
                });
                _push2(`<!--]--></li>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></div><div class="row justify-content-end g-2 mt-2"${_scopeId}><div class="col-6 col-lg-4"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Subtotal")}</span><div class="scroll-x-hidden"${_scopeId}><span class="d-block text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(unref(formatIDR)(unref(form_transaction).subtotal))}</span></div></div><div class="col-lg-4 col-6"${_scopeId}><label for="discount" class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Discount")}</label><div class="input-group input-group-sm bg-light"${_scopeId}><label for="discount" class="text-secondary my-auto mx-1"${_scopeId}>${ssrInterpolate("Rp")}</label><input type="number"${ssrRenderAttr("value", unref(form_transaction).discount)} id="discount" class="form-control form-control-sm py-0 rounded-2" placeholder="ex: 2000"${_scopeId}></div></div><div class="col-6 col-lg-4"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Total Transaction")}</span><div class="d-flex"${_scopeId}><div class="scroll-x-hidden w-100"${_scopeId}><span class="d-block text-primary text-nowrap"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                unref(form_transaction).transaction
              ))}</span></div></div></div></div><div class="row justify-content-end g-2 mt-2"${_scopeId}><div class="col-6 col-lg-4"${_scopeId}><label for="payment_method_id" class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Payment Method")}</label><div class="input-group input-group-sm bg-light"${_scopeId}><select required id="payment_method_id" class="form-select"${_scopeId}><!--[-->`);
              ssrRenderList(__props.payment_method_list, (item) => {
                _push2(`<option${ssrRenderAttr("value", item.id)}${ssrIncludeBooleanAttr(Array.isArray(
                  unref(form_transaction).payment_method_id
                ) ? ssrLooseContain(
                  unref(form_transaction).payment_method_id,
                  item.id
                ) : ssrLooseEqual(
                  unref(form_transaction).payment_method_id,
                  item.id
                )) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.name)}</option>`);
              });
              _push2(`<!--]--></select></div></div><div class="col-lg-4 col-6"${_scopeId}><label for="payment_price" class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Payment Price")}</label><div class="input-group input-group-sm bg-light"${_scopeId}><label for="payment_price" class="text-secondary my-auto mx-1"${_scopeId}>${ssrInterpolate("Rp")}</label><input type="number"${ssrRenderAttr("value", unref(form_transaction).payment_price)} id="payment_price" class="form-control form-control-sm py-0 rounded-2 rounded-end-0" placeholder="ex: 2000"${_scopeId}><div class="btn-group"${_scopeId}><button type="button" class="btn btn-outline-secondary border-0 px-2 dropdown-toggle rounded-start-0" data-bs-toggle="dropdown" aria-expanded="false"${_scopeId}></button><ul class="dropdown-menu dropdown-menu-end"${_scopeId}><li class="dropdown-item"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                unref(form_transaction).transaction
              ))}</li><!--[-->`);
              ssrRenderList([
                5e3,
                1e4,
                2e4,
                5e4,
                1e5
              ], (cash) => {
                _push2(`<li class="dropdown-item"${_scopeId}>${ssrInterpolate(unref(formatIDR)(cash))}</li>`);
              });
              _push2(`<!--]--></ul></div></div></div><div class="col-lg-4 col-6"${_scopeId}><label for="payment_price" class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Payment Change")}</label><div class="scroll-x-hidden w-100"${_scopeId}><span class="d-block text-secondary text-nowrap"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                unref(form_transaction).payment_price - unref(form_transaction).transaction
              ))}</span></div></div></div><div class="d-flex mt-3 bg-primary bg-opacity-10"${_scopeId}><button class="btn btn-outline-primary w-50 border-0 rounded-0"${_scopeId}>${ssrInterpolate("Submit")}</button><button class="btn btn-sm btn-outline-primary w-50 rounded-0 border-0"${_scopeId}><i class="bi bi-receipt-cutoff me-2"${_scopeId}></i> ${ssrInterpolate("Receipt")}</button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value == 3) {
              _push2(`<div class="card p-3 my-4"${_scopeId}><div class="d-flex pb-2"${_scopeId}><span class="text-primary-emphasis h6 mb-0 me-auto"${_scopeId}><i class="bi bi-receipt me-2"${_scopeId}></i> ${ssrInterpolate("Today's Transactions")}</span><span class="text-secondary my-auto" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(((_e2 = __props.today_sales) == null ? void 0 : _e2.length) ?? 0)} transaksi </span></div><div class="row g-2 mt-1 mb-2"${_scopeId}><div class="col-6"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>Total Pemasukan</span><span class="d-block text-primary fw-bold"${_scopeId}>${ssrInterpolate(unref(formatIDR)(((_f2 = __props.today_sales) == null ? void 0 : _f2.reduce((sum, s) => sum + (s.transaction ?? 0), 0)) ?? 0))}</span></div><div class="col-6"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>Total Transaksi</span><span class="d-block text-primary-emphasis fw-bold"${_scopeId}>${ssrInterpolate(((_g2 = __props.today_sales) == null ? void 0 : _g2.length) ?? 0)} order </span></div></div><div class="scroll-container scroll-container-lg pe-1"${_scopeId}>`);
              if (!__props.today_sales || __props.today_sales.length === 0) {
                _push2(`<div class="d-flex bg-light py-2"${_scopeId}><span class="text-secondary fst-italic mx-auto" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>Belum ada transaksi hari ini.</span></div>`);
              } else {
                _push2(`<li class="list-group list-group-flush"${_scopeId}><!--[-->`);
                ssrRenderList(__props.today_sales, (sale) => {
                  var _a3, _b3, _c3;
                  _push2(`<ul class="list-group-item mb-0 px-0 py-2"${_scopeId}><div class="d-flex align-items-start gap-2"${_scopeId}><div class="me-auto"${_scopeId}><span class="d-block text-primary-emphasis fw-semibold"${_scopeId}>${ssrInterpolate(((_a3 = sale.customer) == null ? void 0 : _a3.name) ?? sale.customer ?? "â€”")}</span><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.75rem" })}"${_scopeId}><i class="bi bi-telephone me-1"${_scopeId}></i>${ssrInterpolate(((_b3 = sale.customer) == null ? void 0 : _b3.phone) ?? "â€”")}</span><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.75rem" })}"${_scopeId}><i class="bi bi-clock me-1"${_scopeId}></i>${ssrInterpolate(unref(formatDate)(sale.created_at))}</span></div><div class="text-end"${_scopeId}><span class="d-block text-primary fw-bold"${_scopeId}>${ssrInterpolate(unref(formatIDR)(sale.transaction ?? 0))}</span><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.75rem" })}"${_scopeId}>${ssrInterpolate(((_c3 = __props.payment_method_list.find((p) => p.id == sale.payment_method_id)) == null ? void 0 : _c3.name) ?? "â€”")}</span></div><button class="btn btn-sm btn-outline-primary border-0 px-2 py-0 align-self-center" title="Lihat &amp; Print Receipt"${_scopeId}><i class="bi bi-receipt-cutoff"${_scopeId}></i></button></div><div class="mt-1 ps-1"${_scopeId}><!--[-->`);
                  ssrRenderList(sale.order, (item) => {
                    var _a4;
                    _push2(`<span class="badge bg-light text-secondary border me-1 mb-1" style="${ssrRenderStyle({ "font-size": "0.7rem" })}"${_scopeId}>${ssrInterpolate(item.amount)}x ${ssrInterpolate(((_a4 = item.menu) == null ? void 0 : _a4.name) ?? "?")}</span>`);
                  });
                  _push2(`<!--]--></div></ul>`);
                });
                _push2(`<!--]--></li>`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: title.value,
                icon: "/storage/local/images/apps/logo.png"
              }, null, 8, ["title"]),
              createVNode(_sfc_main$1, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
              }, null, 512),
              createVNode(ModalAlertNotification, {
                ref_key: "modalAlertNotificationRef",
                ref: modalAlertNotificationRef
              }, null, 512),
              createVNode("div", { class: "container me-lg-0 mx-auto mb-5" }, [
                createVNode("div", { class: "row gx-4 mt-4" }, [
                  createVNode("div", { class: "col-12 col-lg-5" }, [
                    createVNode("div", { class: "card bg-white p-3" }, [
                      createVNode("div", { class: "d-flex" }, [
                        createVNode("span", { class: "h5 text-primary-emphasis me-auto" }, [
                          createVNode("i", { class: "bi bi-shop me-2" }),
                          createTextVNode(toDisplayString("Stand " + __props.stand.name), 1)
                        ]),
                        createVNode("button", {
                          class: "btn btn-sm btn-outline-info border-0 py-0 mb-auto",
                          onClick: ($event) => showCashierHelpModal(),
                          title: "Panduan Kasir"
                        }, [
                          createVNode("i", { class: "bi bi-question-circle" })
                        ], 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "row g-2 mt-1" }, [
                        createVNode("div", { class: "col-6" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("In Charge")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(__props.stand.pic.name), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Place")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(__props.stand.place), 1)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "card my-4 bg-white p-1 d-lg-none" }, [
                      createVNode("div", { class: "d-flex" }, [
                        createVNode("button", {
                          class: "btn btn-sm btn-outline-primary border-0 w-33 " + (active_tab.value == 1 ? "active" : ""),
                          style: { "width": "33.33%" },
                          onClick: ($event) => active_tab.value = 1
                        }, [
                          createVNode("i", { class: "fa-solid fa-cash-register me-2" }),
                          createTextVNode(" " + toDisplayString("Cashier"))
                        ], 10, ["onClick"]),
                        createVNode("button", {
                          class: "btn btn-sm btn-outline-primary border-0 " + (active_tab.value == 3 ? "active" : ""),
                          style: { "width": "33.33%" },
                          onClick: ($event) => active_tab.value = 3
                        }, [
                          createVNode("i", { class: "bi bi-receipt me-2" }),
                          createTextVNode(" " + toDisplayString("Today") + " "),
                          ((_h2 = __props.today_sales) == null ? void 0 : _h2.length) > 0 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "badge bg-primary ms-1",
                            style: { "font-size": "0.65rem" }
                          }, toDisplayString(__props.today_sales.length), 1)) : createCommentVNode("", true)
                        ], 10, ["onClick"])
                      ])
                    ]),
                    active_tab.value == 1 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "card bg-white p-3 my-4"
                    }, [
                      createVNode("div", { class: "d-flex" }, [
                        createVNode("span", { class: "text-primary h6 mb-0 me-auto" }, [
                          createVNode("i", { class: "bi bi-list-ul me-2" }),
                          createTextVNode(toDisplayString("Menu"))
                        ]),
                        createVNode("span", {
                          class: "text-secondary fst-italic ms-2",
                          style: { "font-size": "0.8rem" }
                        }, toDisplayString("Click on the menu, to add customer order."))
                      ]),
                      createVNode("div", { class: "scroll-container-3 scroll-container-lg-2 pe-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.menu_list, (list, category) => {
                          return openBlock(), createBlock("li", { class: "list-group list-group-flush" }, [
                            createVNode("ul", { class: "list-group-item list-group-item-light py-1 ps-0 pe-2 mb-0" }, [
                              createVNode("span", { class: "text-secondary" }, toDisplayString(category), 1)
                            ]),
                            (openBlock(true), createBlock(Fragment, null, renderList(list, (item) => {
                              return openBlock(), createBlock("ul", {
                                onClick: ($event) => addOrder(item),
                                class: "list-group-item list-group-item-action py-1 ps-0 pe-2 mb-0"
                              }, [
                                createVNode("div", { class: "d-flex" }, [
                                  createVNode("span", { class: "rounded-2 text-nowrap" }, [
                                    createTextVNode(toDisplayString("(") + " "),
                                    createVNode("span", {
                                      class: "text-nowrap text-" + (item.stock - item.sale == 0 ? "danger" : item.stock - item.sale <= 5 ? "warning" : "dark")
                                    }, toDisplayString(item.sale), 3),
                                    createTextVNode(" " + toDisplayString("/") + " "),
                                    createVNode("span", {
                                      class: "text-nowrap text-" + (item.stock == 0 ? "danger" : "dark")
                                    }, toDisplayString(item.stock), 3),
                                    createTextVNode(" " + toDisplayString(")"))
                                  ]),
                                  createVNode("span", { class: "scroll-x-hidden ms-2 me-auto my-auto" }, [
                                    createVNode("span", { class: "text-nowrap text-primary-emphasis" }, toDisplayString(item.name), 1),
                                    createVNode("span", { class: "text-nowrap text-secondary" }, toDisplayString((item.volume || item.mass ? " - " : "") + (item.volume ? item.volume + item.volume_unit : "") + (item.mass ? item.mass + item.mass_unit : "")), 1)
                                  ]),
                                  createVNode("span", { class: "text-nowrap my-auto text-primary" }, toDisplayString(unref(formatIDR)(item.price)), 1)
                                ])
                              ], 8, ["onClick"]);
                            }), 256))
                          ]);
                        }), 256))
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "col-12 col-lg-7" }, [
                    createVNode("div", { class: "card mb-4 bg-white p-1 d-lg-block d-none" }, [
                      createVNode("div", { class: "d-flex" }, [
                        createVNode("button", {
                          class: "btn btn-sm btn-outline-primary border-0 " + (active_tab.value == 1 ? "active" : ""),
                          style: { "width": "33.33%" },
                          onClick: ($event) => active_tab.value = 1
                        }, [
                          createVNode("i", { class: "fa-solid fa-cash-register me-2" }),
                          createTextVNode(" " + toDisplayString("Cashier"))
                        ], 10, ["onClick"]),
                        createVNode("button", {
                          class: "btn btn-sm btn-outline-primary border-0 " + (active_tab.value == 3 ? "active" : ""),
                          style: { "width": "33.33%" },
                          onClick: ($event) => active_tab.value = 3
                        }, [
                          createVNode("i", { class: "bi bi-receipt me-2" }),
                          createTextVNode(" " + toDisplayString("Today's Transactions") + " "),
                          ((_i2 = __props.today_sales) == null ? void 0 : _i2.length) > 0 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "badge bg-primary ms-1",
                            style: { "font-size": "0.65rem" }
                          }, toDisplayString(__props.today_sales.length), 1)) : createCommentVNode("", true)
                        ], 10, ["onClick"])
                      ])
                    ]),
                    active_tab.value == 1 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "card bg-white p-3 mb-4"
                    }, [
                      createVNode("div", { class: "d-flex" }, [
                        createVNode("span", { class: "h6 mb-0 text-primary" }, toDisplayString("Point Of Sales"))
                      ]),
                      createVNode("div", { class: "d-flex mt-2 bg-light" }, [
                        createVNode("button", {
                          onClick: ($event) => resetForm(),
                          class: "btn-outline-secondary btn py-1 rounded-0 w-100 border-0"
                        }, toDisplayString("New Transaction"), 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "row g-2 mt-1" }, [
                        createVNode("div", { class: "col-6 col-lg-4" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Cashier")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(unref(auth_user).name), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-12 col-lg-8" }, [
                          createVNode("label", {
                            for: "customer",
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Customer")),
                          createVNode("div", { class: "d-flex" }, [
                            withDirectives(createVNode("input", {
                              type: "text",
                              "onUpdate:modelValue": ($event) => unref(form_transaction).customer = $event,
                              class: "form-control form-control-sm py-0 w-50 me-2",
                              placeholder: "ex: Timothy",
                              onInput: onInputCustomer
                            }, null, 40, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form_transaction).customer]
                            ]),
                            createVNode(unref(vSelect), {
                              ref_key: "customerSelect",
                              ref: customerSelect,
                              class: "bg-white text-nowrap w-100 me-2",
                              options: __props.customer_list,
                              label: "phone",
                              reduce: (customer) => customer.id,
                              modelValue: unref(form_transaction).customer_id,
                              "onUpdate:modelValue": ($event) => unref(form_transaction).customer_id = $event,
                              placeholder: "08xxxxxx",
                              onSearch: onSearchCustomer,
                              "onOption:selected": () => {
                                unref(form_transaction).customer = __props.customer_list.find(
                                  (item) => item.id == unref(form_transaction).customer_id
                                ).name;
                              }
                            }, null, 8, ["options", "reduce", "modelValue", "onUpdate:modelValue", "onOption:selected"]),
                            createVNode("button", {
                              class: "btn btn-sm btn-outline-primary",
                              onClick: openNewCustomerModal
                            }, [
                              createVNode("i", { class: "bi bi-plus-lg" })
                            ])
                          ]),
                          createVNode(_sfc_main$2, {
                            message: unref(form_transaction).errors.customer_id,
                            class: "mt-2"
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("div", { class: "row" }, [
                        createVNode("div", { class: "col-12" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Order")),
                          createVNode("div", {
                            class: "border rounded-3",
                            style: { "min-height": "50px" }
                          }, [
                            ((_j2 = unref(form_transaction).order) == null ? void 0 : _j2.length) == 0 ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-secondary fst-italic ms-2",
                              style: { "font-size": "0.8rem" }
                            }, toDisplayString("Add an order from menu list."))) : createCommentVNode("", true),
                            createVNode("div", { class: "scroll-container scroll-container-lg pe-1" }, [
                              ((_k2 = unref(form_transaction).order) == null ? void 0 : _k2.length) > 0 ? (openBlock(), createBlock("li", {
                                key: 0,
                                class: "list-group list-group-flush px-2"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(form_transaction).order, (menu, index) => {
                                  return openBlock(), createBlock("ul", { class: "list-group-item list-group-item-action mb-0 py-1 px-1" }, [
                                    createVNode("div", { class: "d-flex" }, [
                                      createVNode("button", {
                                        onClick: () => {
                                          if (menu.amount > 1) {
                                            unref(form_transaction).order[index].amount -= 1;
                                            unref(form_transaction).order[index].total = menu.price * menu.amount;
                                          } else {
                                            unref(form_transaction).order.splice(
                                              index,
                                              1
                                            );
                                          }
                                          unref(form_transaction).subtotal -= menu.price;
                                        },
                                        class: "btn btn-sm btn-outline-primary border-0 py-0"
                                      }, [
                                        createVNode("i", {
                                          class: "bi bi-" + (menu.amount > 1 ? "dash-lg" : "trash3"),
                                          style: { "font-size": "0.8rem" }
                                        }, null, 2)
                                      ], 8, ["onClick"]),
                                      createVNode("span", { class: "text-secondary mx-1" }, toDisplayString(menu.amount), 1),
                                      createVNode("button", {
                                        onClick: () => {
                                          unref(form_transaction).order[index].amount += 1;
                                          unref(form_transaction).order[index].total = menu.price * menu.amount;
                                          unref(form_transaction).subtotal += menu.price;
                                        },
                                        class: "btn btn-sm btn-outline-primary border-0 py-0"
                                      }, [
                                        createVNode("i", {
                                          class: "bi bi-plus-lg",
                                          style: { "font-size": "0.8rem" }
                                        })
                                      ], 8, ["onClick"]),
                                      createVNode("span", { class: "scroll-x-hidden me-auto" }, [
                                        createVNode("span", { class: "text-nowrap text-primary-emphasis" }, toDisplayString(menu.name), 1)
                                      ]),
                                      createVNode("span", { class: "ms-2 text-secondary" }, toDisplayString(unref(formatIDR)(
                                        menu.total
                                      )), 1)
                                    ])
                                  ]);
                                }), 256))
                              ])) : createCommentVNode("", true)
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "row justify-content-end g-2 mt-2" }, [
                        createVNode("div", { class: "col-6 col-lg-4" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Subtotal")),
                          createVNode("div", { class: "scroll-x-hidden" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis text-nowrap" }, toDisplayString(unref(formatIDR)(unref(form_transaction).subtotal)), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-lg-4 col-6" }, [
                          createVNode("label", {
                            for: "discount",
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Discount")),
                          createVNode("div", { class: "input-group input-group-sm bg-light" }, [
                            createVNode("label", {
                              for: "discount",
                              class: "text-secondary my-auto mx-1"
                            }, toDisplayString("Rp")),
                            withDirectives(createVNode("input", {
                              type: "number",
                              "onUpdate:modelValue": ($event) => unref(form_transaction).discount = $event,
                              id: "discount",
                              class: "form-control form-control-sm py-0 rounded-2",
                              placeholder: "ex: 2000"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form_transaction).discount]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-4" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Total Transaction")),
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("div", { class: "scroll-x-hidden w-100" }, [
                              createVNode("span", { class: "d-block text-primary text-nowrap" }, toDisplayString(unref(formatIDR)(
                                unref(form_transaction).transaction
                              )), 1)
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "row justify-content-end g-2 mt-2" }, [
                        createVNode("div", { class: "col-6 col-lg-4" }, [
                          createVNode("label", {
                            for: "payment_method_id",
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Payment Method")),
                          createVNode("div", { class: "input-group input-group-sm bg-light" }, [
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(form_transaction).payment_method_id = $event,
                              required: "",
                              id: "payment_method_id",
                              class: "form-select"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.payment_method_list, (item) => {
                                return openBlock(), createBlock("option", {
                                  value: item.id
                                }, toDisplayString(item.name), 9, ["value"]);
                              }), 256))
                            ], 8, ["onUpdate:modelValue"]), [
                              [
                                vModelSelect,
                                unref(form_transaction).payment_method_id
                              ]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "col-lg-4 col-6" }, [
                          createVNode("label", {
                            for: "payment_price",
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Payment Price")),
                          createVNode("div", { class: "input-group input-group-sm bg-light" }, [
                            createVNode("label", {
                              for: "payment_price",
                              class: "text-secondary my-auto mx-1"
                            }, toDisplayString("Rp")),
                            withDirectives(createVNode("input", {
                              type: "number",
                              "onUpdate:modelValue": ($event) => unref(form_transaction).payment_price = $event,
                              id: "payment_price",
                              class: "form-control form-control-sm py-0 rounded-2 rounded-end-0",
                              placeholder: "ex: 2000"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form_transaction).payment_price]
                            ]),
                            createVNode("div", { class: "btn-group" }, [
                              createVNode("button", {
                                type: "button",
                                class: "btn btn-outline-secondary border-0 px-2 dropdown-toggle rounded-start-0",
                                "data-bs-toggle": "dropdown",
                                "aria-expanded": "false"
                              }),
                              createVNode("ul", { class: "dropdown-menu dropdown-menu-end" }, [
                                createVNode("li", {
                                  class: "dropdown-item",
                                  onClick: () => {
                                    unref(form_transaction).payment_price = unref(form_transaction).transaction;
                                  }
                                }, toDisplayString(unref(formatIDR)(
                                  unref(form_transaction).transaction
                                )), 9, ["onClick"]),
                                (openBlock(), createBlock(Fragment, null, renderList([
                                  5e3,
                                  1e4,
                                  2e4,
                                  5e4,
                                  1e5
                                ], (cash) => {
                                  return createVNode("li", {
                                    class: "dropdown-item",
                                    onClick: () => {
                                      unref(form_transaction).payment_price = cash;
                                    }
                                  }, toDisplayString(unref(formatIDR)(cash)), 9, ["onClick"]);
                                }), 64))
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "col-lg-4 col-6" }, [
                          createVNode("label", {
                            for: "payment_price",
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Payment Change")),
                          createVNode("div", { class: "scroll-x-hidden w-100" }, [
                            createVNode("span", { class: "d-block text-secondary text-nowrap" }, toDisplayString(unref(formatIDR)(
                              unref(form_transaction).payment_price - unref(form_transaction).transaction
                            )), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "d-flex mt-3 bg-primary bg-opacity-10" }, [
                        createVNode("button", {
                          onClick: handleSubmitSale,
                          class: "btn btn-outline-primary w-50 border-0 rounded-0"
                        }, toDisplayString("Submit")),
                        createVNode("button", {
                          class: "btn btn-sm btn-outline-primary w-50 rounded-0 border-0",
                          onClick: () => {
                            var _a3, _b3, _c3, _d3, _e3, _f3, _g3, _h3, _i3, _j3, _k3;
                            if (unref(auth_user).roles_id != 99 && !__props.stand.cashier.some((c) => c.cashier_id === unref(auth_user).id)) {
                              alertNotification(
                                "You are not listed as Cashier in Stand " + __props.stand.name + ". Only cashier can add transaction."
                              );
                            } else {
                              form_print_receipt.value.date = unref(format)(
                                /* @__PURE__ */ new Date(),
                                "EE, dd/MM/yy-HH:ii"
                              );
                              form_print_receipt.value.customer = (_a3 = unref(form_transaction)) == null ? void 0 : _a3.customer;
                              form_print_receipt.value.customer_id = (_b3 = unref(form_transaction)) == null ? void 0 : _b3.customer_id;
                              form_print_receipt.value.order_list = (_c3 = unref(form_transaction)) == null ? void 0 : _c3.order;
                              form_print_receipt.value.subtotal = ((_d3 = unref(form_transaction)) == null ? void 0 : _d3.transaction) + ((_e3 = unref(form_transaction)) == null ? void 0 : _e3.discount);
                              form_print_receipt.value.discount = (_f3 = unref(form_transaction)) == null ? void 0 : _f3.discount;
                              form_print_receipt.value.transaction = (_g3 = unref(form_transaction)) == null ? void 0 : _g3.transaction;
                              form_print_receipt.value.payment_method_id = (_h3 = unref(form_transaction)) == null ? void 0 : _h3.payment_method_id;
                              form_print_receipt.value.payment_price = (_i3 = unref(form_transaction)) == null ? void 0 : _i3.payment_price;
                              form_print_receipt.value.payment_change = ((_j3 = unref(form_transaction)) == null ? void 0 : _j3.payment_price) - ((_k3 = unref(form_transaction)) == null ? void 0 : _k3.transaction);
                              showPrintReceiptModal();
                            }
                          }
                        }, [
                          createVNode("i", { class: "bi bi-receipt-cutoff me-2" }),
                          createTextVNode(" " + toDisplayString("Receipt"))
                        ], 8, ["onClick"])
                      ])
                    ])) : createCommentVNode("", true),
                    active_tab.value == 3 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "card p-3 my-4"
                    }, [
                      createVNode("div", { class: "d-flex pb-2" }, [
                        createVNode("span", { class: "text-primary-emphasis h6 mb-0 me-auto" }, [
                          createVNode("i", { class: "bi bi-receipt me-2" }),
                          createTextVNode(" " + toDisplayString("Today's Transactions"))
                        ]),
                        createVNode("span", {
                          class: "text-secondary my-auto",
                          style: { "font-size": "0.8rem" }
                        }, toDisplayString(((_l2 = __props.today_sales) == null ? void 0 : _l2.length) ?? 0) + " transaksi ", 1)
                      ]),
                      createVNode("div", { class: "row g-2 mt-1 mb-2" }, [
                        createVNode("div", { class: "col-6" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, "Total Pemasukan"),
                          createVNode("span", { class: "d-block text-primary fw-bold" }, toDisplayString(unref(formatIDR)(((_m2 = __props.today_sales) == null ? void 0 : _m2.reduce((sum, s) => sum + (s.transaction ?? 0), 0)) ?? 0)), 1)
                        ]),
                        createVNode("div", { class: "col-6" }, [
                          createVNode("span", {
                            class: "d-block text-secondary",
                            style: { "font-size": "0.8rem" }
                          }, "Total Transaksi"),
                          createVNode("span", { class: "d-block text-primary-emphasis fw-bold" }, toDisplayString(((_n2 = __props.today_sales) == null ? void 0 : _n2.length) ?? 0) + " order ", 1)
                        ])
                      ]),
                      createVNode("div", { class: "scroll-container scroll-container-lg pe-1" }, [
                        !__props.today_sales || __props.today_sales.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "d-flex bg-light py-2"
                        }, [
                          createVNode("span", {
                            class: "text-secondary fst-italic mx-auto",
                            style: { "font-size": "0.8rem" }
                          }, "Belum ada transaksi hari ini.")
                        ])) : (openBlock(), createBlock("li", {
                          key: 1,
                          class: "list-group list-group-flush"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.today_sales, (sale) => {
                            var _a3, _b3, _c3;
                            return openBlock(), createBlock("ul", {
                              class: "list-group-item mb-0 px-0 py-2",
                              key: sale.id
                            }, [
                              createVNode("div", { class: "d-flex align-items-start gap-2" }, [
                                createVNode("div", { class: "me-auto" }, [
                                  createVNode("span", { class: "d-block text-primary-emphasis fw-semibold" }, toDisplayString(((_a3 = sale.customer) == null ? void 0 : _a3.name) ?? sale.customer ?? "â€”"), 1),
                                  createVNode("span", {
                                    class: "text-secondary d-block",
                                    style: { "font-size": "0.75rem" }
                                  }, [
                                    createVNode("i", { class: "bi bi-telephone me-1" }),
                                    createTextVNode(toDisplayString(((_b3 = sale.customer) == null ? void 0 : _b3.phone) ?? "â€”"), 1)
                                  ]),
                                  createVNode("span", {
                                    class: "text-secondary",
                                    style: { "font-size": "0.75rem" }
                                  }, [
                                    createVNode("i", { class: "bi bi-clock me-1" }),
                                    createTextVNode(toDisplayString(unref(formatDate)(sale.created_at)), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "text-end" }, [
                                  createVNode("span", { class: "d-block text-primary fw-bold" }, toDisplayString(unref(formatIDR)(sale.transaction ?? 0)), 1),
                                  createVNode("span", {
                                    class: "text-secondary d-block",
                                    style: { "font-size": "0.75rem" }
                                  }, toDisplayString(((_c3 = __props.payment_method_list.find((p) => p.id == sale.payment_method_id)) == null ? void 0 : _c3.name) ?? "â€”"), 1)
                                ]),
                                createVNode("button", {
                                  class: "btn btn-sm btn-outline-primary border-0 px-2 py-0 align-self-center",
                                  title: "Lihat & Print Receipt",
                                  onClick: ($event) => openTodayReceiptModal(sale)
                                }, [
                                  createVNode("i", { class: "bi bi-receipt-cutoff" })
                                ], 8, ["onClick"])
                              ]),
                              createVNode("div", { class: "mt-1 ps-1" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(sale.order, (item) => {
                                  var _a4;
                                  return openBlock(), createBlock("span", {
                                    class: "badge bg-light text-secondary border me-1 mb-1",
                                    style: { "font-size": "0.7rem" },
                                    key: item.id
                                  }, toDisplayString(item.amount) + "x " + toDisplayString(((_a4 = item.menu) == null ? void 0 : _a4.name) ?? "?"), 1);
                                }), 128))
                              ])
                            ]);
                          }), 128))
                        ]))
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="modal fade" id="printReceiptModal" tabindex="-1" aria-labelledby="printReceiptModal"><div class="modal-dialog modal-dialog-centered" style="${ssrRenderStyle({ "max-width": "380px" })}"><div class="modal-content shadow mx-auto" style="${ssrRenderStyle({ "width": "380px" })}"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-receipt-cutoff pe-2"></i> ${ssrInterpolate("Receipt")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><div class="modal-body p-0"><div style="${ssrRenderStyle({ "width": "360px", "height": "640px", "background-color": "#ffffff", "background-image": "url('/storage/local/images/shop/brand/logo_watermark.png')", "background-repeat": "repeat", "background-size": "60px", "display": "flex", "flex-direction": "column", "overflow": "hidden", "margin": "0 auto", "font-family": "'Segoe UI', Arial, sans-serif" })}"><div style="${ssrRenderStyle({ "background-color": "#412f55", "padding": "20px 16px 16px", "flex-shrink": "0", "display": "flex", "justify-content": "center", "align-items": "center", "gap": "10px" })}"><img${ssrRenderAttr("src", "/storage/local/images/shop/brand/blaterian_logo.png")} alt="logo" style="${ssrRenderStyle({ "height": "48px", "object-fit": "contain" })}"><img${ssrRenderAttr("src", "/storage/local/images/shop/brand/blaterian_text.png")} alt="BLATERIAN" style="${ssrRenderStyle({ "height": "36px", "object-fit": "contain" })}"></div><div style="${ssrRenderStyle({ "flex": "1", "padding": "16px 20px", "display": "flex", "flex-direction": "column", "gap": "0", "overflow": "hidden" })}"><div style="${ssrRenderStyle({ "display": "grid", "grid-template-columns": "1fr 1fr", "gap": "4px 12px", "margin-bottom": "14px" })}"><div><div style="${ssrRenderStyle({ "font-size": "0.72rem", "color": "#888", "margin-bottom": "2px" })}">Date-Time</div><div style="${ssrRenderStyle({ "font-size": "0.92rem", "font-weight": "600", "color": "#222" })}">${ssrInterpolate((_a = form_print_receipt.value) == null ? void 0 : _a.date)}</div></div><div><div style="${ssrRenderStyle({ "font-size": "0.72rem", "color": "#888", "margin-bottom": "2px" })}">Place</div><div style="${ssrRenderStyle({ "font-size": "0.92rem", "font-weight": "600", "color": "#222" })}">${ssrInterpolate(__props.stand.place)}</div></div><div style="${ssrRenderStyle({ "margin-top": "8px" })}"><div style="${ssrRenderStyle({ "font-size": "0.72rem", "color": "#888", "margin-bottom": "2px" })}">Customer</div><div style="${ssrRenderStyle({ "font-size": "0.92rem", "font-weight": "600", "color": "#222" })}">${ssrInterpolate((_b = form_print_receipt.value) == null ? void 0 : _b.customer)}</div></div><div style="${ssrRenderStyle({ "margin-top": "8px" })}"><div style="${ssrRenderStyle({ "font-size": "0.72rem", "color": "#888", "margin-bottom": "2px" })}">Cashier</div><div style="${ssrRenderStyle({ "font-size": "0.92rem", "font-weight": "600", "color": "#222" })}">${ssrInterpolate(unref(auth_user).name)}</div></div></div><div style="${ssrRenderStyle({ "border-top": "1.5px dashed #c8c8c8", "margin-bottom": "10px" })}"></div><div style="${ssrRenderStyle({ "margin-bottom": "10px" })}"><div style="${ssrRenderStyle({ "font-size": "1rem", "font-weight": "700", "color": "#412f55", "margin-bottom": "8px" })}">Order Items</div><!--[-->`);
      ssrRenderList((_c = form_print_receipt.value) == null ? void 0 : _c.order_list, (item) => {
        _push(`<div style="${ssrRenderStyle({ "margin-bottom": "6px" })}"><div style="${ssrRenderStyle({ "font-size": "0.88rem" })}"><span style="${ssrRenderStyle({ "color": "#555" })}">(${ssrInterpolate(item.amount)})</span><span style="${ssrRenderStyle({ "font-weight": "700", "margin-left": "6px" })}">${ssrInterpolate((item == null ? void 0 : item.menu) ? item.menu.name : item.name)}</span></div><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "font-size": "0.82rem", "color": "#555", "margin-top": "1px" })}"><span>${ssrInterpolate(unref(formatIDR)((item == null ? void 0 : item.menu) ? item.menu.price : item.price))}</span><span style="${ssrRenderStyle({ "color": "#222", "font-weight": "500" })}">${ssrInterpolate(unref(formatIDR)((item == null ? void 0 : item.menu) ? item.menu.price * item.amount : item.total))}</span></div></div>`);
      });
      _push(`<!--]--></div><div style="${ssrRenderStyle({ "border-top": "1.5px dashed #c8c8c8", "margin-bottom": "10px" })}"></div><div style="${ssrRenderStyle({ "margin-bottom": "10px" })}"><div style="${ssrRenderStyle({ "font-size": "1rem", "font-weight": "700", "color": "#412f55", "margin-bottom": "8px" })}">Total</div><div style="${ssrRenderStyle({ "display": "grid", "grid-template-columns": "1fr 1fr 1fr", "gap": "4px" })}"><div><div style="${ssrRenderStyle({ "font-size": "0.72rem", "color": "#888", "margin-bottom": "2px" })}">Subtotal</div><div style="${ssrRenderStyle({ "font-size": "0.88rem", "color": "#222" })}">${ssrInterpolate(unref(formatIDR)(((_d = form_print_receipt.value) == null ? void 0 : _d.subtotal) ?? 0))}</div></div><div><div style="${ssrRenderStyle({ "font-size": "0.72rem", "color": "#888", "margin-bottom": "2px" })}">Discount</div><div style="${ssrRenderStyle({ "font-size": "0.88rem", "color": "#222" })}">${ssrInterpolate(unref(formatIDR)(((_e = form_print_receipt.value) == null ? void 0 : _e.discount) ?? 0))}</div></div><div><div style="${ssrRenderStyle({ "font-size": "0.72rem", "color": "#888", "margin-bottom": "2px" })}">Total</div><div style="${ssrRenderStyle({ "font-size": "0.92rem", "font-weight": "700", "color": "#222" })}">${ssrInterpolate(unref(formatIDR)(((_f = form_print_receipt.value) == null ? void 0 : _f.transaction) ?? 0))}</div></div></div></div><div style="${ssrRenderStyle({ "border-top": "1.5px dashed #c8c8c8", "margin-bottom": "10px" })}"></div><div><div style="${ssrRenderStyle({ "font-size": "1rem", "font-weight": "700", "color": "#412f55", "margin-bottom": "8px" })}">Payment</div><div style="${ssrRenderStyle({ "display": "grid", "grid-template-columns": "1fr 1fr 1fr", "gap": "4px" })}"><div><div style="${ssrRenderStyle({ "font-size": "0.72rem", "color": "#888", "margin-bottom": "2px" })}">Method</div><div style="${ssrRenderStyle({ "font-size": "0.88rem", "color": "#222" })}">${ssrInterpolate(((_g = __props.payment_method_list.find((p) => {
        var _a2;
        return p.id == ((_a2 = form_print_receipt.value) == null ? void 0 : _a2.payment_method_id);
      })) == null ? void 0 : _g.name) ?? "â€”")}</div></div><div><div style="${ssrRenderStyle({ "font-size": "0.72rem", "color": "#888", "margin-bottom": "2px" })}">Price</div><div style="${ssrRenderStyle({ "font-size": "0.88rem", "color": "#222" })}">${ssrInterpolate(unref(formatIDR)(((_h = form_print_receipt.value) == null ? void 0 : _h.payment_price) ?? 0))}</div></div><div><div style="${ssrRenderStyle({ "font-size": "0.72rem", "color": "#888", "margin-bottom": "2px" })}">Change</div><div style="${ssrRenderStyle({ "font-size": "0.88rem", "color": "#222" })}">${ssrInterpolate(unref(formatIDR)((((_i = form_print_receipt.value) == null ? void 0 : _i.payment_price) ?? 0) - (((_j = form_print_receipt.value) == null ? void 0 : _j.transaction) ?? 0)))}</div></div></div></div></div><div style="${ssrRenderStyle({ "background-color": "#412f55", "border-top": "2px dashed #efc55c", "padding": "10px 16px", "flex-shrink": "0", "display": "flex", "justify-content": "center", "align-items": "center", "gap": "8px" })}"><i class="bi bi-instagram" style="${ssrRenderStyle({ "color": "#efc55c", "font-size": "1rem" })}"></i><span style="${ssrRenderStyle({ "color": "#efc55c", "font-size": "0.85rem", "font-weight": "500" })}">blaterian.id</span></div></div></div><div class="modal-footer p-2 d-flex flex-column gap-2"><div class="d-flex gap-2 w-100"><button type="button" class="btn btn-sm btn-outline-primary w-50 d-flex align-items-center justify-content-center gap-2"><i class="bi bi-download"></i> ${ssrInterpolate("Download")}</button><button type="button" class="btn btn-sm btn-outline-success w-50 d-flex align-items-center justify-content-center gap-2"><i class="bi bi-whatsapp"></i> ${ssrInterpolate("Share WA")}</button></div><button type="button" class="btn btn-sm btn-primary w-100 d-flex align-items-center justify-content-center gap-2"><i class="bi bi-printer"></i> ${ssrInterpolate("Download & Share WA")}</button></div></div></div></div>`);
      if (is_cashier.value || unref(auth_user).roles_id == 99) {
        _push(`<div class="modal fade" id="newCustomerModal" tabindex="-1" aria-labelledby="newCustomerModal"><div class="modal-dialog modal-sm modal-dialog-centered"><div class="modal-content shadow"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-person-plus pe-2"></i> ${ssrInterpolate("New Customer")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><form><div class="modal-body bg-white"><p class="text-secondary mb-3" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"> Tambahkan customer baru dengan nama dan nomor HP. Nomor HP akan digunakan untuk mencatat transaksi. </p><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Name")}</span><input type="text"${ssrRenderAttr("value", unref(form_new_customer).name)} class="form-control form-control-sm" placeholder="ex: Timothy" required autofocus>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          message: unref(form_new_customer).errors.name,
          class: "mt-2"
        }, null, _parent));
        _push(`<span class="text-secondary d-block mt-3" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Phone")}</span><input type="tel"${ssrRenderAttr("value", unref(form_new_customer).phone)} class="form-control form-control-sm" placeholder="08xxxxxxx" required>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          message: unref(form_new_customer).errors.phone,
          class: "mt-2"
        }, null, _parent));
        _push(`</div><div class="modal-footer py-1 px-2"><button type="submit" class="btn btn-sm btn-primary w-100"${ssrIncludeBooleanAttr(unref(form_new_customer).processing) ? " disabled" : ""}>`);
        if (!unref(form_new_customer).processing) {
          _push(`<i class="bi bi-save me-2"></i>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(form_new_customer).processing) {
          _push(`<span class="spinner-border spinner-border-sm me-2" role="status"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(unref(form_new_customer).processing ? "Adding..." : "Add Customer")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (is_cashier.value || unref(auth_user).roles_id == 99) {
        _push(`<div class="modal fade" id="danaReceiptModal" tabindex="-1" aria-labelledby="danaReceiptModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><svg class="icon icon-dana d-inline rounded-circle border-primary border" style="${ssrRenderStyle({ "width": "1.5rem", "height": "1.5rem", "padding": "0.1rem" })}"><rect width="24" height="24" fill="#ccc" rx="4"></rect></svg> ${ssrInterpolate("Dana Transfer Receipt")}</span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal"><i class="bi bi-x-lg"></i></button></div><div class="modal-body bg-secondary bg-opacity-50"><div class="d-flex bg-white p-2 rounded shadow-sm"><img${ssrRenderAttr(
          "src",
          "/storage/images/receipt/stand/income/" + ((_k = selected_order.value) == null ? void 0 : _k.receipt_income)
        )} alt="image" style="${ssrRenderStyle({ "width": "100%", "max-height": "80vh" })}"></div><div class="d-flex bg-white p-2 rounded shadow-sm mt-3"><span class="text-secondary">${ssrInterpolate("Customer")}</span><span class="text-primary ms-auto">${ssrInterpolate((_m = (_l = selected_order.value) == null ? void 0 : _l.customer) == null ? void 0 : _m.name)}</span></div><div class="d-flex bg-white p-2 rounded shadow-sm mt-3"><span class="text-secondary">${ssrInterpolate("Payment Price")}</span><span class="text-primary ms-auto">${ssrInterpolate(unref(formatIDR)((_n = selected_order.value) == null ? void 0 : _n.payment_price))}</span></div></div><div class="modal-footer py-1 px-2"><button class="${ssrRenderClass(
          "btn btn-sm w-100 border-0 btn-outline-primary " + (((_o = selected_order.value) == null ? void 0 : _o.dana_receipt_validate) ? "active" : "")
        )}" data-bs-dismiss="modal"><i class="${ssrRenderClass(
          "bi me-2 bi-" + (((_p = selected_order.value) == null ? void 0 : _p.dana_receipt_validate) ? "check-square " : "square ")
        )}"></i> ${ssrInterpolate("Validate")}</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="modal fade" id="cashierHelpModal" tabindex="-1" aria-labelledby="cashierHelpModalLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"><div class="modal-content border-0 shadow-lg"><div class="modal-header border-0" style="${ssrRenderStyle({ "background-color": "#412f55" })}"><h5 class="modal-title fw-bold text-white" id="cashierHelpModalLabel"><i class="bi bi-question-circle me-2"></i>Panduan Kasir </h5><button type="button" class="btn-close btn-close-white"></button></div><div class="modal-body p-0"><div class="px-4 pt-3 pb-2 bg-light border-bottom"><p class="small text-muted mb-0">Panduan singkat untuk kasir dalam mencatat transaksi di stand <strong>${ssrInterpolate(__props.stand.name)}</strong>.</p></div><div class="px-4 py-3 d-flex flex-column gap-4"><div><h6 class="fw-bold mb-2" style="${ssrRenderStyle({ "color": "#412f55" })}"><i class="bi bi-cart-plus me-2"></i>Cara Mencatat Transaksi</h6><ol class="small text-muted ps-3 mb-0" style="${ssrRenderStyle({ "line-height": "1.8" })}"><li>Pastikan kamu berada di tab <strong>Cashier</strong>.</li><li>Klik menu di daftar kiri untuk menambahkan ke order.</li><li>Isi nama customer di kolom <strong>Customer</strong>.</li><li>Pilih nomor HP customer dari dropdown, atau klik <i class="bi bi-plus-lg"></i> untuk daftarkan customer baru.</li><li>Isi <strong>Discount</strong> jika ada (opsional).</li><li>Pilih <strong>Payment Method</strong> dan isi <strong>Payment Price</strong>.</li><li>Klik <strong>Submit</strong> untuk menyimpan transaksi.</li></ol></div><div class="border rounded p-3 bg-light"><h6 class="fw-bold mb-2"><i class="bi bi-person-plus text-primary me-2"></i>Customer Baru</h6><p class="small text-muted mb-0">Jika customer belum terdaftar, klik tombol <span class="badge bg-primary"><i class="bi bi-plus-lg"></i></span> di sebelah dropdown nomor HP. Isi nama dan nomor HP, lalu simpan. Customer akan otomatis ter-select.</p></div><div class="border rounded p-3 bg-light"><h6 class="fw-bold mb-2"><i class="bi bi-receipt-cutoff text-secondary me-2"></i>Cetak &amp; Share Receipt</h6><p class="small text-muted mb-1">Klik tombol <strong>Receipt</strong> setelah mengisi form transaksi untuk preview receipt.</p><div class="d-flex gap-2 flex-wrap"><span class="badge bg-primary" style="${ssrRenderStyle({ "font-size": "0.7rem" })}"><i class="bi bi-download me-1"></i>Download</span><span class="badge bg-success" style="${ssrRenderStyle({ "font-size": "0.7rem" })}"><i class="bi bi-whatsapp me-1"></i>Share WA</span><span class="badge bg-dark" style="${ssrRenderStyle({ "font-size": "0.7rem" })}"><i class="bi bi-printer me-1"></i>Download &amp; Share WA</span></div></div><div class="border rounded p-3 bg-light"><h6 class="fw-bold mb-2"><i class="bi bi-receipt text-info me-2"></i>Tab Today&#39;s Transactions</h6><p class="small text-muted mb-0">Lihat semua transaksi yang sudah selesai hari ini. Klik ikon <i class="bi bi-receipt-cutoff"></i> di setiap baris untuk mencetak ulang atau share receipt ke customer.</p></div><div class="border rounded p-3" style="${ssrRenderStyle({ "border-color": "#efc55c !important", "background": "#fffbf0" })}"><h6 class="fw-bold mb-2"><i class="bi bi-exclamation-triangle text-warning me-2"></i>Stok Habis</h6><p class="small text-muted mb-0">Menu yang stoknya habis (sold = stock) masih bisa diklik tapi sebaiknya tidak dijual. Hubungi Production Staff untuk update stok via ikon <i class="bi bi-box-seam"></i> di halaman Stand Detail.</p></div><div><h6 class="fw-bold mb-2" style="${ssrRenderStyle({ "color": "#412f55" })}"><i class="bi bi-info-circle me-2"></i>Indikator Stok di Daftar Menu</h6><div class="d-flex flex-column gap-1 small"><div><span class="text-dark fw-bold me-2">( sold / stock )</span>â€” angka terjual vs stok total</div><div><span class="text-danger fw-bold me-2">Merah</span>â€” stok habis (sold = stock)</div><div><span class="text-warning fw-bold me-2">Kuning</span>â€” stok hampir habis (sisa â‰¤ 5)</div><div><span class="text-dark fw-bold me-2">Hitam</span>â€” stok masih aman</div></div></div><div><h6 class="fw-bold mb-2" style="${ssrRenderStyle({ "color": "#412f55" })}"><i class="bi bi-credit-card me-2"></i>Metode Pembayaran</h6><div class="small text-muted"> Pilih metode sesuai cara bayar customer. Untuk pembayaran <strong>DANA</strong>, minta customer upload bukti transfer â€” kasir perlu memverifikasi sebelum submit. </div></div></div></div><div class="modal-footer border-0 bg-light"><button type="button" class="btn btn-sm px-4 text-white" style="${ssrRenderStyle({ "background-color": "#412f55" })}">Mengerti</button></div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Business/StandCashier.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=StandCashier-vVO6H1-0.js.map
