import { ref, computed, onMounted, watch, withCtx, unref, createVNode, createBlock, createCommentVNode, createTextVNode, toDisplayString, openBlock, Fragment, renderList, withModifiers, withDirectives, vModelText, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-tN1R9s2b.js";
import { _ as _sfc_main$2 } from "./InputError-DkffFxkw.js";
import { _ as _sfc_main$3 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CQDhtLdH.js";
import { M as ModalAlertNotification } from "./ModalAlertNotification-DTKoiHkW.js";
import vSelect from "vue-select";
/* empty css                    */
import { usePage, useForm, Head } from "@inertiajs/vue3";
import "html2canvas";
import { f as formatIDR, a as formatDate } from "./utils-WpvxxmT9.js";
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
    const toastNotifRef = ref(null);
    ref(null);
    ref(null);
    const receiptIsDownload = ref(true);
    const receiptIsSendWhatsapp = ref(true);
    const active_tab = ref(1);
    const selected_order = ref();
    ref("placeholder");
    ref(/* @__PURE__ */ new Date());
    const is_cashier = computed(() => {
      return props.stand.cashier.some((cashier) => cashier.id == auth_user.id);
    });
    const printedReceipt = ref({
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
    function handleSubmitTransaction() {
      console.log(form_transaction);
      form_transaction.post(route("stand.sale.add", props.stand.id), {
        onError: (errors) => {
          for (const key in errors) {
            toastNotifRef.value.showToast("warning", errors[key]);
          }
        }
      });
    }
    function handleFinishTransaction(id) {
      const form = useForm({
        transaction_id: id
      });
      form.post(route("shop.transaction.finish"));
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
      if (search !== "") {
        form_new_customer.phone = search;
      }
    }
    const onInputCustomer = () => {
      form_new_customer.name = form_transaction.customer;
    };
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
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(StaffLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", _ctx.route("food.stand"))} class="bg-opacity-0 text-decoration-none text-primary-emphasis"${_scopeId}><span class="fw-light"${_scopeId}>${ssrInterpolate("Stand")}</span></a><span class="mx-2"${_scopeId}>${ssrInterpolate("/")}</span><a${ssrRenderAttr("href", _ctx.route("food.stand.detail", __props.stand.id))} class="bg-opacity-0 text-decoration-none text-primary-emphasis"${_scopeId}><span class="fw-light"${_scopeId}>${ssrInterpolate(__props.stand.name)}</span></a><span class="mx-2"${_scopeId}>${ssrInterpolate("/")}</span> ${ssrInterpolate(title.value)}`);
          } else {
            return [
              createVNode("a", {
                href: _ctx.route("food.stand"),
                class: "bg-opacity-0 text-decoration-none text-primary-emphasis"
              }, [
                createVNode("span", { class: "fw-light" }, toDisplayString("Stand"))
              ], 8, ["href"]),
              createVNode("span", { class: "mx-2" }, toDisplayString("/")),
              createVNode("a", {
                href: _ctx.route("food.stand.detail", __props.stand.id),
                class: "bg-opacity-0 text-decoration-none text-primary-emphasis"
              }, [
                createVNode("span", { class: "fw-light" }, toDisplayString(__props.stand.name), 1)
              ], 8, ["href"]),
              createVNode("span", { class: "mx-2" }, toDisplayString("/")),
              createTextVNode(" " + toDisplayString(title.value), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja;
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
            _push2(`<div class="container me-lg-0 mx-auto mb-5"${_scopeId}><div class="row gx-4 mt-4"${_scopeId}><div class="col-12 col-lg-5"${_scopeId}><div class="card bg-white p-3"${_scopeId}><div class="d-flex border-bottom border-primary"${_scopeId}><span class="h5 text-primary-emphasis me-auto"${_scopeId}><i class="bi bi-shop me-2"${_scopeId}></i>${ssrInterpolate("Stand " + __props.stand.name)}</span></div><div class="row g-2 mt-1"${_scopeId}><div class="col-6"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("In Charge")}</span><div class="scroll-x-hidden"${_scopeId}><span class="d-block text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(__props.stand.pic.name)}</span></div></div><div class="col-6"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Place")}</span><div class="scroll-x-hidden"${_scopeId}><span class="d-block text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(__props.stand.place)}</span></div></div></div></div><div class="card my-4 bg-white p-1 d-lg-none"${_scopeId}><div class="d-flex"${_scopeId}><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary border-0 w-50 " + (active_tab.value == 1 ? "active" : "")
            )}"${_scopeId}><i class="fa-solid fa-cash-register me-2"${_scopeId}></i> ${ssrInterpolate("Cashier")}</button><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary border-0 w-50 " + (active_tab.value == 2 ? "active" : "")
            )}"${_scopeId}><i class="fa-solid fa-user-group me-2"${_scopeId}></i> ${ssrInterpolate("Self-Order")}</button></div></div>`);
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
            if (active_tab.value == 2) {
              _push2(`<div class="card p-3 bg-white mt-4"${_scopeId}><div class="d-flex border-primary border-bottom border-1 pb-2"${_scopeId}><span class="h6 mb-0 text-primary-emphasis"${_scopeId}><i class="fa-solid fa-user-group me-2"${_scopeId}></i>${ssrInterpolate("Order List")}</span><span class="text-secondary"${_scopeId}></span></div><div class="scroll-container-2 scroll-container-lg-2 pe-1"${_scopeId}><div class="d-flex bg-light"${_scopeId}><span class="text-secondary fst-italic mx-auto my-1" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(__props.order_list.length == 0 ? "Nothing" : "Click to see detail")}</span></div><li class="list-group list-group-flush"${_scopeId}><!--[-->`);
              ssrRenderList(__props.order_list, (item) => {
                var _a3, _b3;
                _push2(`<ul class="${ssrRenderClass(
                  "list-group-item list-group-item-action mb-0 px-0 d-flex " + (((_a3 = selected_order.value) == null ? void 0 : _a3.id) == item.id ? "bg-primary bg-opacity-10" : "")
                )}"${_scopeId}>${ssrInterpolate((_b3 = item == null ? void 0 : item.customer) == null ? void 0 : _b3.name)} <span class="text-secondary ms-auto"${_scopeId}>${ssrInterpolate(unref(formatDate)(item == null ? void 0 : item.created_at))}</span><i class="bi bi-x-lg btn btn-sm btn-light ms-2"${_scopeId}></i></ul>`);
              });
              _push2(`<!--]--></li></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-12 col-lg-7"${_scopeId}><div class="card mb-4 bg-white p-1 d-lg-block d-none"${_scopeId}><div class="d-flex"${_scopeId}><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary border-0 w-50 " + (active_tab.value == 1 ? "active" : "")
            )}"${_scopeId}><i class="fa-solid fa-cash-register me-2"${_scopeId}></i> ${ssrInterpolate("Cashier")}</button><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary border-0 w-50 " + (active_tab.value == 2 ? "active" : "")
            )}"${_scopeId}><i class="fa-solid fa-user-group me-2"${_scopeId}></i> ${ssrInterpolate("Self-Order")}</button></div></div>`);
            if (active_tab.value == 1) {
              _push2(`<div class="card bg-white p-3 mb-4"${_scopeId}><div class="d-flex"${_scopeId}><span class="h6 mb-0 text-primary"${_scopeId}>${ssrInterpolate("Point Of Sales")}</span></div><div class="d-flex mt-2 bg-light"${_scopeId}><button class="btn-outline-secondary btn py-1 rounded-0 w-100 border-0"${_scopeId}>${ssrInterpolate("New Transaction")}</button></div><div class="row g-2 mt-1"${_scopeId}><div class="col-6 col-lg-4"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Cashier")}</span><div class="scroll-x-hidden"${_scopeId}><span class="d-block text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(unref(auth_user).name)}</span></div></div><div class="col-12 col-lg-8"${_scopeId}><label for="customer" class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Customer")}</label><div class="d-flex"${_scopeId}><input type="text"${ssrRenderAttr("value", unref(form_transaction).customer)} class="form-control form-control-sm py-0 w-50 me-2" placeholder="ex: Timothy"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(vSelect), {
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
              if (((_a2 = unref(form_transaction).order) == null ? void 0 : _a2.length) == 0) {
                _push2(`<span class="text-secondary fst-italic ms-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Add an order from menu list.")}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="scroll-container scroll-container-lg pe-1"${_scopeId}>`);
              if (((_b2 = unref(form_transaction).order) == null ? void 0 : _b2.length) > 0) {
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
            if (active_tab.value == 2) {
              _push2(`<div class="card p-3 my-4"${_scopeId}><div class="d-flex pb-2 border-bottom border-primary"${_scopeId}><span class="text-primary-emphasis h6 mb-0"${_scopeId}><i class="bi bi-info-circle-fill me-1"${_scopeId}></i> ${ssrInterpolate("Order Detail")}</span></div><div class="row g-3 mt-0"${_scopeId}><div class="col-lg-4 col-6"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}><i class="bi bi-person-fill me-1"${_scopeId}></i> ${ssrInterpolate("Customer")}</span><div${_scopeId}><span class=""${_scopeId}>${ssrInterpolate(((_d2 = (_c2 = selected_order.value) == null ? void 0 : _c2.customer) == null ? void 0 : _d2.name) ?? "Unselected")}</span><a target="_blank"${ssrRenderAttr(
                "href",
                "https://wa.me/62" + (((_f2 = (_e2 = selected_order.value) == null ? void 0 : _e2.customer) == null ? void 0 : _f2.phone.startsWith(
                  "0"
                )) ? (_h2 = (_g2 = selected_order.value) == null ? void 0 : _g2.customer) == null ? void 0 : _h2.phone.slice(
                  1
                ) : (_j2 = (_i2 = selected_order.value) == null ? void 0 : _i2.customer) == null ? void 0 : _j2.phone)
              )}${_scopeId}><i class="bi bi-chat-dots card-bg-hover text-primary px-2"${_scopeId}></i></a></div></div><div class="col-lg-4 col-6"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}><i class="bi bi-calendar2-check me-1"${_scopeId}></i> ${ssrInterpolate("Order Date")}</span><div${_scopeId}><span class=""${_scopeId}>${ssrInterpolate(unref(formatDate)(
                ((_k2 = selected_order.value) == null ? void 0 : _k2.created_at) ?? /* @__PURE__ */ new Date()
              ))}</span></div></div><div class="col-lg-4 col-6"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}><i class="bi bi-calendar2-check me-1"${_scopeId}></i> ${ssrInterpolate("Send Option")}</span><div${_scopeId}><span class=""${_scopeId}>${ssrInterpolate(((_l2 = selected_order.value) == null ? void 0 : _l2.send_option) == "delivery" ? "Delivery" : "Pick Up")}</span></div></div></div><div class="d-flex mt-3"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}><i class="fa-solid fa-utensils me-1"${_scopeId}></i> ${ssrInterpolate("Menu List")}</span></div><div class="scroll-container scroll-container-lg pe-1"${_scopeId}><li class="list-group list-group-flush"${_scopeId}><!--[-->`);
              ssrRenderList((_m2 = selected_order.value) == null ? void 0 : _m2.order, (item) => {
                var _a3;
                _push2(`<ul class="list-group-item list-group-item-action mb-0 py-1"${_scopeId}><span class="text-secondary d-inline-block" style="${ssrRenderStyle({ "width": "2.7rem" })}"${_scopeId}>${ssrInterpolate("( " + (item == null ? void 0 : item.amount) + " )")}</span><span class="ms-0"${_scopeId}>${ssrInterpolate((_a3 = item == null ? void 0 : item.menu) == null ? void 0 : _a3.name)}</span><span class="float-end text-primary-emphasis"${_scopeId}>${ssrInterpolate(unref(formatIDR)(item.menu.price))}</span></ul>`);
              });
              _push2(`<!--]--></li></div><div class="row g-3 mt-0"${_scopeId}><div class="col-lg-4 col-6"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Subtotal")}</span><div${_scopeId}><span class=""${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                (((_n2 = selected_order.value) == null ? void 0 : _n2.transaction) ?? 0) + (((_o = selected_order.value) == null ? void 0 : _o.discount) ?? 0)
              ))}</span></div></div><div class="col-lg-4 col-6"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Discount")}</span><div${_scopeId}><span class="me-2"${_scopeId}>${ssrInterpolate(unref(formatIDR)(((_p = selected_order.value) == null ? void 0 : _p.discount) ?? 0))}</span>`);
              if (((_q = selected_order.value) == null ? void 0 : _q.voucher_id) > 0) {
                _push2(`<span class="text-success bg-success bg-opacity-10 px-2 text-nowrap"${_scopeId}><i class="fa-solid fa-ticket me-1"${_scopeId}></i>${ssrInterpolate(((_s = (_r = selected_order.value) == null ? void 0 : _r.voucher) == null ? void 0 : _s.code) ?? 0)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="col-lg-4 col-6"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Total Transaction")}</span><div${_scopeId}><span class="text-primary"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                ((_t = selected_order.value) == null ? void 0 : _t.transaction) ?? 0
              ))}</span></div></div><div class="col-lg-4 col-6"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Payment Method")}</span><div class="d-flex"${_scopeId}><span class=""${_scopeId}>${ssrInterpolate(((_u = __props.payment_method_list.find(
                (item) => {
                  var _a3;
                  return item.id == ((_a3 = selected_order.value) == null ? void 0 : _a3.payment_method_id);
                }
              )) == null ? void 0 : _u.name) ?? "Unset")}</span>`);
              if (((_v = selected_order.value) == null ? void 0 : _v.payment_method_id) == 2) {
                _push2(`<button class="btn btn-sm btn-light py-0 ms-2" data-bs-toggle="modal" data-bs-target="#danaReceiptModal"${_scopeId}><i class="bi bi-image"${_scopeId}></i>`);
                if (((_w = selected_order.value) == null ? void 0 : _w.dana_receipt_validate) == false) {
                  _push2(`<i class="bi bi-exclamation text-danger ms-2"${_scopeId}></i>`);
                } else {
                  _push2(`<!---->`);
                }
                if (((_x = selected_order.value) == null ? void 0 : _x.dana_receipt_validate) == true) {
                  _push2(`<i class="bi bi-check2 ms-2 text-success"${_scopeId}></i>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="col-lg-4 col-6"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Payment Price")}</span><div${_scopeId}><span class=""${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                ((_y = selected_order.value) == null ? void 0 : _y.payment_price) ?? 0
              ))}</span></div></div><div class="col-lg-4 col-6"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Payment Change")}</span><div${_scopeId}><span class=""${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                (((_z = selected_order.value) == null ? void 0 : _z.payment_price) ?? 0) - (((_A = selected_order.value) == null ? void 0 : _A.transaction) ?? 0)
              ))}</span></div></div></div><div class="d-flex mt-3 bg-primary bg-opacity-10"${_scopeId}><div class="w-50 p-0 m-0"${_scopeId}><button${ssrIncludeBooleanAttr(!((_B = printedReceipt.value) == null ? void 0 : _B.print)) ? " disabled" : ""} class="btn btn-sm btn-outline-primary w-100 rounded-0 border-0"${_scopeId}>${ssrInterpolate("Submit")}</button></div><div class="w-50 p-0 m-0"${_scopeId}><button${ssrIncludeBooleanAttr(!((_C = selected_order.value) == null ? void 0 : _C.id)) ? " disabled" : ""} class="btn btn-sm btn-outline-primary w-100 rounded-0 border-0"${_scopeId}><i class="${ssrRenderClass(
                "bi me-2 bi-" + (((_D = printedReceipt.value) == null ? void 0 : _D.id) == ((_E = selected_order.value) == null ? void 0 : _E.id) && ((_F = printedReceipt.value) == null ? void 0 : _F.print) ? "check2-square" : "square")
              )}"${_scopeId}></i> ${ssrInterpolate("Receipt")}</button></div></div></div>`);
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
                      createVNode("div", { class: "d-flex border-bottom border-primary" }, [
                        createVNode("span", { class: "h5 text-primary-emphasis me-auto" }, [
                          createVNode("i", { class: "bi bi-shop me-2" }),
                          createTextVNode(toDisplayString("Stand " + __props.stand.name), 1)
                        ])
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
                          class: "btn btn-sm btn-outline-primary border-0 w-50 " + (active_tab.value == 1 ? "active" : ""),
                          onClick: ($event) => active_tab.value = 1
                        }, [
                          createVNode("i", { class: "fa-solid fa-cash-register me-2" }),
                          createTextVNode(" " + toDisplayString("Cashier"))
                        ], 10, ["onClick"]),
                        createVNode("button", {
                          class: "btn btn-sm btn-outline-primary border-0 w-50 " + (active_tab.value == 2 ? "active" : ""),
                          onClick: ($event) => active_tab.value = 2
                        }, [
                          createVNode("i", { class: "fa-solid fa-user-group me-2" }),
                          createTextVNode(" " + toDisplayString("Self-Order"))
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
                    ])) : createCommentVNode("", true),
                    active_tab.value == 2 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "card p-3 bg-white mt-4"
                    }, [
                      createVNode("div", { class: "d-flex border-primary border-bottom border-1 pb-2" }, [
                        createVNode("span", { class: "h6 mb-0 text-primary-emphasis" }, [
                          createVNode("i", { class: "fa-solid fa-user-group me-2" }),
                          createTextVNode(toDisplayString("Order List"))
                        ]),
                        createVNode("span", { class: "text-secondary" })
                      ]),
                      createVNode("div", { class: "scroll-container-2 scroll-container-lg-2 pe-1" }, [
                        createVNode("div", { class: "d-flex bg-light" }, [
                          createVNode("span", {
                            class: "text-secondary fst-italic mx-auto my-1",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString(__props.order_list.length == 0 ? "Nothing" : "Click to see detail"), 1)
                        ]),
                        createVNode("li", { class: "list-group list-group-flush" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.order_list, (item) => {
                            var _a3, _b3;
                            return openBlock(), createBlock("ul", {
                              class: "list-group-item list-group-item-action mb-0 px-0 d-flex " + (((_a3 = selected_order.value) == null ? void 0 : _a3.id) == item.id ? "bg-primary bg-opacity-10" : ""),
                              onClick: () => {
                                var _a4;
                                if (is_cashier.value) {
                                  selected_order.value = item;
                                  selected_order.value.dana_receipt_validate = false;
                                } else {
                                  alertNotification(
                                    "You are not Cashier. This feature only available for listed cashier in Stand " + ((_a4 = __props.stand) == null ? void 0 : _a4.name)
                                  );
                                }
                              }
                            }, [
                              createTextVNode(toDisplayString((_b3 = item == null ? void 0 : item.customer) == null ? void 0 : _b3.name) + " ", 1),
                              createVNode("span", { class: "text-secondary ms-auto" }, toDisplayString(unref(formatDate)(item == null ? void 0 : item.created_at)), 1),
                              createVNode("i", {
                                onClick: withModifiers(($event) => {
                                  var _a4;
                                  return confirmation(
                                    _ctx.route(
                                      "shop.transaction.cancel",
                                      item.id
                                    ),
                                    "Confirm to cancel tranasction order from " + ((_a4 = item == null ? void 0 : item.customer) == null ? void 0 : _a4.name) + "?"
                                  );
                                }, ["prevent"]),
                                class: "bi bi-x-lg btn btn-sm btn-light ms-2"
                              }, null, 8, ["onClick"])
                            ], 10, ["onClick"]);
                          }), 256))
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "col-12 col-lg-7" }, [
                    createVNode("div", { class: "card mb-4 bg-white p-1 d-lg-block d-none" }, [
                      createVNode("div", { class: "d-flex" }, [
                        createVNode("button", {
                          class: "btn btn-sm btn-outline-primary border-0 w-50 " + (active_tab.value == 1 ? "active" : ""),
                          onClick: ($event) => active_tab.value = 1
                        }, [
                          createVNode("i", { class: "fa-solid fa-cash-register me-2" }),
                          createTextVNode(" " + toDisplayString("Cashier"))
                        ], 10, ["onClick"]),
                        createVNode("button", {
                          class: "btn btn-sm btn-outline-primary border-0 w-50 " + (active_tab.value == 2 ? "active" : ""),
                          onClick: ($event) => active_tab.value = 2
                        }, [
                          createVNode("i", { class: "fa-solid fa-user-group me-2" }),
                          createTextVNode(" " + toDisplayString("Self-Order"))
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
                              onClick: () => {
                                if (is_cashier.value) {
                                  showNewCustomerModal();
                                } else {
                                  alertNotification(
                                    "You are not listed as Cashier in Stand " + __props.stand.name + ". Only cashier can add customer."
                                  );
                                }
                              }
                            }, [
                              createVNode("i", { class: "bi bi-plus-lg" })
                            ], 8, ["onClick"])
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
                            ((_G = unref(form_transaction).order) == null ? void 0 : _G.length) == 0 ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-secondary fst-italic ms-2",
                              style: { "font-size": "0.8rem" }
                            }, toDisplayString("Add an order from menu list."))) : createCommentVNode("", true),
                            createVNode("div", { class: "scroll-container scroll-container-lg pe-1" }, [
                              ((_H = unref(form_transaction).order) == null ? void 0 : _H.length) > 0 ? (openBlock(), createBlock("li", {
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
                          onClick: handleSubmitTransaction,
                          class: "btn btn-outline-primary w-50 border-0 rounded-0"
                        }, toDisplayString("Submit")),
                        createVNode("button", {
                          class: "btn btn-sm btn-outline-primary w-50 rounded-0 border-0",
                          onClick: () => {
                            var _a3, _b3, _c3, _d3, _e3, _f3, _g3, _h3, _i3, _j3, _k3;
                            if (is_cashier.value) {
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
                            } else {
                              alertNotification(
                                "You are not listed as Cashier in Stand " + __props.stand.name + ". Only cashier can add transaction."
                              );
                            }
                          }
                        }, [
                          createVNode("i", { class: "bi bi-receipt-cutoff me-2" }),
                          createTextVNode(" " + toDisplayString("Receipt"))
                        ], 8, ["onClick"])
                      ])
                    ])) : createCommentVNode("", true),
                    active_tab.value == 2 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "card p-3 my-4"
                    }, [
                      createVNode("div", { class: "d-flex pb-2 border-bottom border-primary" }, [
                        createVNode("span", { class: "text-primary-emphasis h6 mb-0" }, [
                          createVNode("i", { class: "bi bi-info-circle-fill me-1" }),
                          createTextVNode(" " + toDisplayString("Order Detail"))
                        ])
                      ]),
                      createVNode("div", { class: "row g-3 mt-0" }, [
                        createVNode("div", { class: "col-lg-4 col-6" }, [
                          createVNode("span", {
                            class: "text-secondary d-block",
                            style: { "font-size": "0.8rem" }
                          }, [
                            createVNode("i", { class: "bi bi-person-fill me-1" }),
                            createTextVNode(" " + toDisplayString("Customer"))
                          ]),
                          createVNode("div", null, [
                            createVNode("span", { class: "" }, toDisplayString(((_J = (_I = selected_order.value) == null ? void 0 : _I.customer) == null ? void 0 : _J.name) ?? "Unselected"), 1),
                            createVNode("a", {
                              target: "_blank",
                              href: "https://wa.me/62" + (((_L = (_K = selected_order.value) == null ? void 0 : _K.customer) == null ? void 0 : _L.phone.startsWith(
                                "0"
                              )) ? (_N = (_M = selected_order.value) == null ? void 0 : _M.customer) == null ? void 0 : _N.phone.slice(
                                1
                              ) : (_P = (_O = selected_order.value) == null ? void 0 : _O.customer) == null ? void 0 : _P.phone)
                            }, [
                              createVNode("i", { class: "bi bi-chat-dots card-bg-hover text-primary px-2" })
                            ], 8, ["href"])
                          ])
                        ]),
                        createVNode("div", { class: "col-lg-4 col-6" }, [
                          createVNode("span", {
                            class: "text-secondary d-block",
                            style: { "font-size": "0.8rem" }
                          }, [
                            createVNode("i", { class: "bi bi-calendar2-check me-1" }),
                            createTextVNode(" " + toDisplayString("Order Date"))
                          ]),
                          createVNode("div", null, [
                            createVNode("span", { class: "" }, toDisplayString(unref(formatDate)(
                              ((_Q = selected_order.value) == null ? void 0 : _Q.created_at) ?? /* @__PURE__ */ new Date()
                            )), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-lg-4 col-6" }, [
                          createVNode("span", {
                            class: "text-secondary d-block",
                            style: { "font-size": "0.8rem" }
                          }, [
                            createVNode("i", { class: "bi bi-calendar2-check me-1" }),
                            createTextVNode(" " + toDisplayString("Send Option"))
                          ]),
                          createVNode("div", null, [
                            createVNode("span", { class: "" }, toDisplayString(((_R = selected_order.value) == null ? void 0 : _R.send_option) == "delivery" ? "Delivery" : "Pick Up"), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "d-flex mt-3" }, [
                        createVNode("span", {
                          class: "text-secondary",
                          style: { "font-size": "0.8rem" }
                        }, [
                          createVNode("i", { class: "fa-solid fa-utensils me-1" }),
                          createTextVNode(" " + toDisplayString("Menu List"))
                        ])
                      ]),
                      createVNode("div", { class: "scroll-container scroll-container-lg pe-1" }, [
                        createVNode("li", { class: "list-group list-group-flush" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList((_S = selected_order.value) == null ? void 0 : _S.order, (item) => {
                            var _a3;
                            return openBlock(), createBlock("ul", { class: "list-group-item list-group-item-action mb-0 py-1" }, [
                              createVNode("span", {
                                class: "text-secondary d-inline-block",
                                style: { "width": "2.7rem" }
                              }, toDisplayString("( " + (item == null ? void 0 : item.amount) + " )"), 1),
                              createVNode("span", { class: "ms-0" }, toDisplayString((_a3 = item == null ? void 0 : item.menu) == null ? void 0 : _a3.name), 1),
                              createVNode("span", { class: "float-end text-primary-emphasis" }, toDisplayString(unref(formatIDR)(item.menu.price)), 1)
                            ]);
                          }), 256))
                        ])
                      ]),
                      createVNode("div", { class: "row g-3 mt-0" }, [
                        createVNode("div", { class: "col-lg-4 col-6" }, [
                          createVNode("span", {
                            class: "text-secondary d-block",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Subtotal")),
                          createVNode("div", null, [
                            createVNode("span", { class: "" }, toDisplayString(unref(formatIDR)(
                              (((_T = selected_order.value) == null ? void 0 : _T.transaction) ?? 0) + (((_U = selected_order.value) == null ? void 0 : _U.discount) ?? 0)
                            )), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-lg-4 col-6" }, [
                          createVNode("span", {
                            class: "text-secondary d-block",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Discount")),
                          createVNode("div", null, [
                            createVNode("span", { class: "me-2" }, toDisplayString(unref(formatIDR)(((_V = selected_order.value) == null ? void 0 : _V.discount) ?? 0)), 1),
                            ((_W = selected_order.value) == null ? void 0 : _W.voucher_id) > 0 ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-success bg-success bg-opacity-10 px-2 text-nowrap"
                            }, [
                              createVNode("i", { class: "fa-solid fa-ticket me-1" }),
                              createTextVNode(toDisplayString(((_Y = (_X = selected_order.value) == null ? void 0 : _X.voucher) == null ? void 0 : _Y.code) ?? 0), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "col-lg-4 col-6" }, [
                          createVNode("span", {
                            class: "text-secondary d-block",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Total Transaction")),
                          createVNode("div", null, [
                            createVNode("span", { class: "text-primary" }, toDisplayString(unref(formatIDR)(
                              ((_Z = selected_order.value) == null ? void 0 : _Z.transaction) ?? 0
                            )), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-lg-4 col-6" }, [
                          createVNode("span", {
                            class: "text-secondary d-block",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Payment Method")),
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("span", { class: "" }, toDisplayString(((__ = __props.payment_method_list.find(
                              (item) => {
                                var _a3;
                                return item.id == ((_a3 = selected_order.value) == null ? void 0 : _a3.payment_method_id);
                              }
                            )) == null ? void 0 : __.name) ?? "Unset"), 1),
                            ((_$ = selected_order.value) == null ? void 0 : _$.payment_method_id) == 2 ? (openBlock(), createBlock("button", {
                              key: 0,
                              class: "btn btn-sm btn-light py-0 ms-2",
                              "data-bs-toggle": "modal",
                              "data-bs-target": "#danaReceiptModal"
                            }, [
                              createVNode("i", { class: "bi bi-image" }),
                              ((_aa = selected_order.value) == null ? void 0 : _aa.dana_receipt_validate) == false ? (openBlock(), createBlock("i", {
                                key: 0,
                                class: "bi bi-exclamation text-danger ms-2"
                              })) : createCommentVNode("", true),
                              ((_ba = selected_order.value) == null ? void 0 : _ba.dana_receipt_validate) == true ? (openBlock(), createBlock("i", {
                                key: 1,
                                class: "bi bi-check2 ms-2 text-success"
                              })) : createCommentVNode("", true)
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "col-lg-4 col-6" }, [
                          createVNode("span", {
                            class: "text-secondary d-block",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Payment Price")),
                          createVNode("div", null, [
                            createVNode("span", { class: "" }, toDisplayString(unref(formatIDR)(
                              ((_ca = selected_order.value) == null ? void 0 : _ca.payment_price) ?? 0
                            )), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-lg-4 col-6" }, [
                          createVNode("span", {
                            class: "text-secondary d-block",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString("Payment Change")),
                          createVNode("div", null, [
                            createVNode("span", { class: "" }, toDisplayString(unref(formatIDR)(
                              (((_da = selected_order.value) == null ? void 0 : _da.payment_price) ?? 0) - (((_ea = selected_order.value) == null ? void 0 : _ea.transaction) ?? 0)
                            )), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "d-flex mt-3 bg-primary bg-opacity-10" }, [
                        createVNode("div", {
                          class: "w-50 p-0 m-0",
                          onClick: () => {
                            var _a3, _b3;
                            if (!((_a3 = printedReceipt.value) == null ? void 0 : _a3.print)) {
                              alertNotification(
                                "Please print the receipt first before submit the transaction. After transaction submit, you can not print the receipt in this page and must go to Stand " + ((_b3 = __props.stand) == null ? void 0 : _b3.name) + " page."
                              );
                            }
                          }
                        }, [
                          createVNode("button", {
                            disabled: !((_fa = printedReceipt.value) == null ? void 0 : _fa.print),
                            class: "btn btn-sm btn-outline-primary w-100 rounded-0 border-0",
                            onClick: withModifiers(
                              () => {
                                var _a3;
                                if (is_cashier.value) {
                                  handleFinishTransaction(
                                    (_a3 = selected_order.value) == null ? void 0 : _a3.id
                                  );
                                  selected_order.value = null;
                                } else {
                                  alertNotification(
                                    "You are not listed as Cashier in Stand " + __props.stand.name + ". Only cashier can add transaction."
                                  );
                                }
                              },
                              ["prevent"]
                            )
                          }, toDisplayString("Submit"), 8, ["disabled", "onClick"])
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          class: "w-50 p-0 m-0",
                          onClick: () => {
                            var _a3;
                            if (!((_a3 = selected_order.value) == null ? void 0 : _a3.id)) {
                              toastNotifRef.value.showToast(
                                "warning",
                                "Please select order to print the receipt."
                              );
                            }
                          }
                        }, [
                          createVNode("button", {
                            disabled: !((_ga = selected_order.value) == null ? void 0 : _ga.id),
                            class: "btn btn-sm btn-outline-primary w-100 rounded-0 border-0",
                            onClick: withModifiers(
                              () => {
                                var _a3, _b3, _c3, _d3, _e3, _f3, _g3, _h3, _i3, _j3, _k3, _l3;
                                if (is_cashier.value) {
                                  form_print_receipt.value.date = unref(format)(
                                    new Date(
                                      (_a3 = selected_order.value) == null ? void 0 : _a3.created_at
                                    ),
                                    "EE, dd/MM/yy-HH:ii"
                                  );
                                  form_print_receipt.value.customer = (_b3 = selected_order.value) == null ? void 0 : _b3.customer.name;
                                  form_print_receipt.value.customer_id = (_c3 = selected_order.value) == null ? void 0 : _c3.customer_id;
                                  form_print_receipt.value.order_list = (_d3 = selected_order.value) == null ? void 0 : _d3.order;
                                  form_print_receipt.value.subtotal = ((_e3 = selected_order.value) == null ? void 0 : _e3.transaction) + ((_f3 = selected_order.value) == null ? void 0 : _f3.discount);
                                  form_print_receipt.value.discount = (_g3 = selected_order.value) == null ? void 0 : _g3.discount;
                                  form_print_receipt.value.transaction = (_h3 = selected_order.value) == null ? void 0 : _h3.transaction;
                                  form_print_receipt.value.payment_method_id = (_i3 = selected_order.value) == null ? void 0 : _i3.payment_method_id;
                                  form_print_receipt.value.payment_price = (_j3 = selected_order.value) == null ? void 0 : _j3.payment_price;
                                  form_print_receipt.value.payment_change = ((_k3 = selected_order.value) == null ? void 0 : _k3.payment_price) - ((_l3 = selected_order.value) == null ? void 0 : _l3.transaction);
                                  showPrintReceiptModal();
                                } else {
                                  alertNotification(
                                    "You are not listed as Cashier in Stand " + __props.stand.name + ". Only cashier can add transaction."
                                  );
                                }
                              },
                              ["prevent"]
                            )
                          }, [
                            createVNode("i", {
                              class: "bi me-2 bi-" + (((_ha = printedReceipt.value) == null ? void 0 : _ha.id) == ((_ia = selected_order.value) == null ? void 0 : _ia.id) && ((_ja = printedReceipt.value) == null ? void 0 : _ja.print) ? "check2-square" : "square")
                            }, null, 2),
                            createTextVNode(" " + toDisplayString("Receipt"))
                          ], 8, ["disabled", "onClick"])
                        ], 8, ["onClick"])
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
      if (is_cashier.value) {
        _push(`<div class="modal fade" id="printReceiptModal" tabindex="-1" aria-labelledby="printReceiptModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-auto"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-receipt-cutoff pe-2"></i> ${ssrInterpolate("Receipt")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><div class="modal-body p-0"><div class="bg-white watermark-background" style="${ssrRenderStyle({ "background": "url('/storage/local/images/shop/brand/logo_watermark.png')", "background-repeat": "repeat", "background-size": "25mm" })}"><div class="p-3" style="${ssrRenderStyle({ "background-color": "#412f55" })}"><div class="d-flex"><div class="mx-auto"><img${ssrRenderAttr("src", "/storage/local/images/shop/brand/blaterian_logo.png")} alt="image" class="" style="${ssrRenderStyle({ "height": "15mm" })}"><img${ssrRenderAttr("src", "/storage/local/images/shop/brand/blaterian_text.png")} alt="image" class="" style="${ssrRenderStyle({ "height": "15mm" })}"></div></div></div><div class="p-3"><div class="row g-3"><div class="col-6"><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Date-Time")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate((_a = form_print_receipt.value) == null ? void 0 : _a.date)}</span></div></div><div class="col-6"><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Place")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate(__props.stand.place)}</span></div></div><div class="col-6"><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Customer")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate((_b = form_print_receipt.value) == null ? void 0 : _b.customer)}</span></div></div><div class="col-6"><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Cashier")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate(unref(auth_user).name)}</span></div></div></div><div class="border-1 border-secondary-subtle mt-3" style="${ssrRenderStyle({ "border-style": "dashed" })}"></div><div class="mt-2"><span class="d-block h6 text-primary-emphasis">${ssrInterpolate("Order Items")}</span><!--[-->`);
        ssrRenderList((_c = form_print_receipt.value) == null ? void 0 : _c.order_list, (item) => {
          var _a2, _b2, _c2;
          _push(`<div class="mt-2"><div class="d-flex"><span class="me-2">${ssrInterpolate("(" + item.amount + ")")}</span><span class="fw-bold me-2">${ssrInterpolate((item == null ? void 0 : item.menu) ? (_a2 = item == null ? void 0 : item.menu) == null ? void 0 : _a2.name : item.name)}</span></div><div class="d-flex"><span class="me-auto text-secondary">${ssrInterpolate(unref(formatIDR)(
            (item == null ? void 0 : item.menu) ? (_b2 = item == null ? void 0 : item.menu) == null ? void 0 : _b2.price : item.price
          ))}</span><span class="ms-2">${ssrInterpolate(unref(formatIDR)(
            (item == null ? void 0 : item.menu) ? ((_c2 = item == null ? void 0 : item.menu) == null ? void 0 : _c2.price) * (item == null ? void 0 : item.amount) : item.total
          ))}</span></div></div>`);
        });
        _push(`<!--]--></div><div class="border-1 border-secondary-subtle mt-3" style="${ssrRenderStyle({ "border-style": "dashed" })}"></div><div class="mt-2"><span class="d-block h6 text-primary-emphasis">${ssrInterpolate("Total")}</span><div class="d-flex"><div class=""><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Subtotal")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate(unref(formatIDR)(
          ((_d = form_print_receipt.value) == null ? void 0 : _d.subtotal) ?? 0
        ))}</span></div></div><div class="mx-auto"><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Discount")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate(unref(formatIDR)(
          form_print_receipt.value.discount
        ))}</span></div></div><div class=""><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Total")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap fw-bold">${ssrInterpolate(unref(formatIDR)(
          form_print_receipt.value.transaction
        ))}</span></div></div></div></div><div class="border-1 border-secondary-subtle mt-3" style="${ssrRenderStyle({ "border-style": "dashed" })}"></div><div class="mt-2"><span class="d-block h6 text-primary-emphasis">${ssrInterpolate("Payment")}</span><div class="d-flex"><div class=""><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Method")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate((_e = __props.payment_method_list.find(
          (item) => {
            var _a2;
            return item.id == ((_a2 = form_print_receipt.value) == null ? void 0 : _a2.payment_method_id);
          }
        )) == null ? void 0 : _e.name)}</span></div></div><div class="mx-auto"><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Price")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate(unref(formatIDR)(
          (_f = form_print_receipt.value) == null ? void 0 : _f.payment_price
        ))}</span></div></div><div class=""><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Change")}</span><div class="d-flex scroll-x-hidden"><span class="text-nowrap">${ssrInterpolate(unref(formatIDR)(
          ((_g = form_print_receipt.value) == null ? void 0 : _g.payment_price) - ((_h = form_print_receipt.value) == null ? void 0 : _h.transaction)
        ))}</span></div></div></div></div></div><div style="${ssrRenderStyle({ "background-color": "#412f55", "border-top-style": "dashed", "border-top-color": "#efc55c", "border-top-width": "0.1rem" })}"><div class="d-flex"><span class="mx-auto my-2" style="${ssrRenderStyle({ "font-size": "0.8rem", "color": "#efc55c" })}"><i class="bi bi-instagram me-2"></i> ${ssrInterpolate("blaterian.id")}</span></div></div></div></div><div class="modal-footer p-1"><div class="d-flex bg-white"><div class="d-flex me-3"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(receiptIsDownload.value) ? ssrLooseContain(receiptIsDownload.value, null) : receiptIsDownload.value) ? " checked" : ""}><div class="d-flex w-100"><span class="ms-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Download Receipt")}</span><i class="bi bi-download ms-2 text-primary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"></i></div></div><div class="d-flex"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(receiptIsSendWhatsapp.value) ? ssrLooseContain(receiptIsSendWhatsapp.value, null) : receiptIsSendWhatsapp.value) ? " checked" : ""}><div class="d-flex w-100"><span class="ms-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Send Whatsapp")}</span><i class="bi bi-whatsapp ms-2 text-success" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"></i></div></div></div><button type="submit" class="btn btn-sm btn-primary w-100"><i class="bi bi-printer me-2"></i> ${ssrInterpolate("Print Receipt")}</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (is_cashier.value) {
        _push(`<div class="modal fade" id="newCustomerModal" tabindex="-1" aria-labelledby="newCustomerModal"><div class="modal-dialog modal-sm modal-dialog-centered"><div class="modal-content shadow"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-person-plus pe-2"></i> ${ssrInterpolate("New Customer")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><div class="modal-body bg-white"><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Name")}</span><input type="text"${ssrRenderAttr("value", unref(form_new_customer).name)} class="form-control form-control-sm" placeholder="ex: Timothy">`);
        _push(ssrRenderComponent(_sfc_main$2, {
          message: unref(form_new_customer).errors.name,
          class: "mt-2"
        }, null, _parent));
        _push(`<span class="text-secondary d-block mt-3" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Phone")}</span><input type="tel"${ssrRenderAttr("value", unref(form_new_customer).phone)} class="form-control form-control-sm" placeholder="08xxxxxxx">`);
        _push(ssrRenderComponent(_sfc_main$2, {
          message: unref(form_new_customer).errors.phone,
          class: "mt-2"
        }, null, _parent));
        _push(`</div><div class="modal-footer py-1 px-2"><button class="btn btn-sm btn-primary w-100">${ssrInterpolate("Add Customer")}</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (is_cashier.value) {
        _push(`<div class="modal fade" id="danaReceiptModal" tabindex="-1" aria-labelledby="danaReceiptModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><svg class="icon icon-dana d-inline rounded-circle border-primary border" style="${ssrRenderStyle({ "width": "1.5rem", "height": "1.5rem", "padding": "0.1rem" })}"><use href="/icons.svg#dana"></use></svg> ${ssrInterpolate("Dana Transfer Receipt")}</span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal"><i class="bi bi-x-lg"></i></button></div><div class="modal-body bg-secondary bg-opacity-50"><div class="d-flex bg-white p-2 rounded shadow-sm"><img${ssrRenderAttr(
          "src",
          "/storage/images/receipt/stand/income/" + ((_i = selected_order.value) == null ? void 0 : _i.receipt_income)
        )} alt="image" style="${ssrRenderStyle({ "width": "100%", "max-height": "80vh" })}"></div><div class="d-flex bg-white p-2 rounded shadow-sm mt-3"><span class="text-secondary">${ssrInterpolate("Customer")}</span><span class="text-primary ms-auto">${ssrInterpolate((_k = (_j = selected_order.value) == null ? void 0 : _j.customer) == null ? void 0 : _k.name)}</span></div><div class="d-flex bg-white p-2 rounded shadow-sm mt-3"><span class="text-secondary">${ssrInterpolate("Payment Price")}</span><span class="text-primary ms-auto">${ssrInterpolate(unref(formatIDR)((_l = selected_order.value) == null ? void 0 : _l.payment_price))}</span></div></div><div class="modal-footer py-1 px-2"><button class="${ssrRenderClass(
          "btn btn-sm w-100 border-0 btn-outline-primary " + (((_m = selected_order.value) == null ? void 0 : _m.dana_receipt_validate) ? "active" : "")
        )}" data-bs-dismiss="modal"><i class="${ssrRenderClass(
          "bi me-2 bi-" + (((_n = selected_order.value) == null ? void 0 : _n.dana_receipt_validate) ? "check-square " : "square ")
        )}"></i> ${ssrInterpolate("Validate")}</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
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
