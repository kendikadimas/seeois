import { ref, computed, onMounted, onUnmounted, watch, withCtx, unref, createVNode, toDisplayString, createTextVNode, Transition, createBlock, openBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./StaffLayout-Dx7OTDGc.js";
import "./InputError-DugfSnOg.js";
import { _ as _sfc_main$3 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$2 } from "./ModalConfirmation-CQDhtLdH.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { f as formatIDR, a as formatDate } from "../app.js";
/* empty css             */
import "vue-toastification";
import "axios";
import "date-fns";
import "bootstrap";
const _sfc_main = {
  __name: "InsightCashflow",
  __ssrInlineRender: true,
  props: {
    foods: Object,
    goods: Object,
    notif: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    usePage().props.auth.user;
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
      order: props.foods.filter.order
    });
    const form_goods_filter = useForm({
      category: props.goods.filter.category,
      order: props.goods.filter.order
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
    function handleFoodsFilter(category) {
      form_foods_filter.order = props.foods.filter.category == category ? props.foods.filter.order == "asc" ? "desc" : "asc" : "desc";
      form_foods_filter.category = category;
      form_foods_filter.post(route("insight.filter.foods"));
    }
    function handleGoodsFilter(category) {
      form_goods_filter.order = props.goods.filter.category == category ? props.goods.filter.order == "asc" ? "desc" : "asc" : "desc";
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
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", _ctx.route("blaterian.insight"))} class="bg-opacity-0 text-decoration-none text-primary-emphasis"${_scopeId}><span class="fw-light"${_scopeId}>${ssrInterpolate("Business Insight")}</span></a><span class="ms-2"${_scopeId}>${ssrInterpolate("/")}</span> ${ssrInterpolate(title.value)}`);
          } else {
            return [
              createVNode("a", {
                href: _ctx.route("blaterian.insight"),
                class: "bg-opacity-0 text-decoration-none text-primary-emphasis"
              }, [
                createVNode("span", { class: "fw-light" }, toDisplayString("Business Insight"))
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
            _push2(`<div class="container me-lg-0 mx-auto mb-5"${_scopeId}><div class="row mt-4"${_scopeId}><div class="col-12"${_scopeId}><div class="card bg-white p-3"${_scopeId}><div class="border-bottom border-1 border-primary pb-1 d-flex"${_scopeId}><span class="text-primary-emphasis h5"${_scopeId}>${ssrInterpolate("Foods")}</span><button class="btn-sm border-0 ms-auto p-0 bg-white d-lg-none" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}><span class="text-primary"${_scopeId}>${ssrInterpolate(opened_detail.value == "foods" ? "hide detail" : "show detail")} <i class="${ssrRenderClass(
              "bi bi-chevron-" + (opened_detail.value == "foods" ? "up" : "down")
            )}"${_scopeId}></i></span></button></div><div class="row gx-2"${_scopeId}><div class="col-6 col-lg-2 d-flex mt-2"${_scopeId}><i class="bi bi-wallet2 fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Balance")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.foods.balance.balance))}</span></div></div><div class="col-6 col-lg-2 d-flex mt-2"${_scopeId}><i class="bi bi-box-arrow-in-down fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Cash In")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.foods.balance.income))}</span></div></div><div class="col-6 col-lg-2 d-flex mt-2"${_scopeId}><i class="bi bi-box-arrow-up fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Cash Out")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.foods.balance.expense))}</span></div></div><div class="col-6 col-lg-2 d-flex mt-2"${_scopeId}><i class="bi bi-cash-stack fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Profit")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
              __props.foods.total_income - __props.foods.total_expense
            ))}</span></div></div><div class="col-6 col-lg-2 d-flex mt-2"${_scopeId}><i class="bi bi-graph-up fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Income")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.foods.total_income))}</span></div></div><div class="col-6 col-lg-2 d-flex mt-2"${_scopeId}><i class="bi bi-graph-down fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Expense")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.foods.total_expense))}</span></div></div></div></div><div class="card bg-white p-3 mt-4"${_scopeId}><div class="border-bottom border-1 border-primary pb-1 d-flex"${_scopeId}><span class="text-primary-emphasis h5"${_scopeId}>${ssrInterpolate("Goods")}</span><button class="ms-auto p-0 btn-sm border-0 bg-white d-lg-none" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}><span class="text-primary"${_scopeId}>${ssrInterpolate(opened_detail.value == "goods" ? "hide detail" : "show detail")} <i class="${ssrRenderClass(
              "bi bi-chevron-" + (opened_detail.value == "goods" ? "up" : "down")
            )}"${_scopeId}></i></span></button></div><div class="row gx-2"${_scopeId}><div class="col-6 col-lg-2 d-flex mt-2"${_scopeId}><i class="bi bi-wallet2 fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Balance")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.goods.balance.balance))}</span></div></div><div class="col-6 col-lg-2 d-flex mt-2"${_scopeId}><i class="bi bi-box-arrow-in-down fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Cash In")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.goods.balance.income))}</span></div></div><div class="col-6 col-lg-2 d-flex mt-2"${_scopeId}><i class="bi bi-box-arrow-up fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Cash Out")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.goods.balance.expense))}</span></div></div><div class="col-6 col-lg-2 d-flex mt-2"${_scopeId}><i class="bi bi-cash-stack fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Profit")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
              __props.goods.total_income - __props.goods.total_expense
            ))}</span></div></div><div class="col-6 col-lg-2 d-flex mt-2"${_scopeId}><i class="bi bi-graph-up fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Income")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.goods.total_income))}</span></div></div><div class="col-6 col-lg-2 d-flex mt-2"${_scopeId}><i class="bi bi-graph-down fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Expense")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.goods.total_expense))}</span></div></div></div></div></div></div><div class="row gx-4 mt-4"${_scopeId}>`);
            if (isLargeScreen.value || opened_detail.value == "foods") {
              _push2(`<div class="col-lg-6 col-12" id="foodsDetail"${_scopeId}><div class="card p-2"${_scopeId}><div class="card bg-white p-1"${_scopeId}><div class="d-flex"${_scopeId}><span class="h6 text-primary-emphasis ms-1 me-2 my-auto text-nowrap"${_scopeId}>${ssrInterpolate("Foods List")}</span><div class="d-flex w-100"${_scopeId}><button class="${ssrRenderClass(
                "btn btn-sm btn-outline-primary border-0 text-center w-25 " + (foods_active_tab.value == 1 ? "border-bottom rounded-0 border-primary" : "")
              )}"${_scopeId}>${ssrInterpolate(foods_active_tab.value == 1 ? "Cash In" : "")} `);
              if (foods_active_tab.value !== 1) {
                _push2(`<i class="bi bi-box-arrow-in-down"${_scopeId}></i>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</button><button class="${ssrRenderClass(
                "btn btn-sm btn-outline-primary border-0 text-center w-25 " + (foods_active_tab.value == 2 ? "border-bottom rounded-0 border-primary" : "")
              )}"${_scopeId}>${ssrInterpolate(foods_active_tab.value == 2 ? "Cash Out" : "")} `);
              if (foods_active_tab.value !== 2) {
                _push2(`<i class="bi bi-box-arrow-up"${_scopeId}></i>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</button><button class="${ssrRenderClass(
                "btn btn-sm btn-outline-primary border-0 text-center w-25 " + (foods_active_tab.value == 3 ? "border-bottom rounded-0 border-primary" : "")
              )}"${_scopeId}>${ssrInterpolate(foods_active_tab.value == 3 ? "Income" : "")} `);
              if (foods_active_tab.value !== 3) {
                _push2(`<i class="bi bi-graph-up"${_scopeId}></i>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</button><button class="${ssrRenderClass(
                "btn btn-sm btn-outline-primary border-0 text-center w-25 " + (foods_active_tab.value == 4 ? "border-bottom rounded-0 border-primary" : "")
              )}"${_scopeId}>${ssrInterpolate(foods_active_tab.value == 4 ? "Expense" : "")} `);
              if (foods_active_tab.value !== 4) {
                _push2(`<i class="bi bi-graph-down"${_scopeId}></i>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</button></div></div></div><div class="d-flex mt-2 ms-2"${_scopeId}><span class="text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto h6"${_scopeId}>${ssrInterpolate("Filter")}</span><button class="btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"${_scopeId}>${ssrInterpolate("Date")} <i class="${ssrRenderClass(
                "bi bi-arrow-" + (__props.foods.filter.category == "updated_at" ? __props.foods.filter.order == "asc" ? "up" : "down" : "up")
              )}"${_scopeId}></i></button><button class="btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0 ms-2"${_scopeId}>${ssrInterpolate("Price")} <i class="${ssrRenderClass(
                "bi bi-arrow-" + (__props.foods.filter.category == "price" ? __props.foods.filter.order == "asc" ? "up" : "down" : "up")
              )}"${_scopeId}></i></button></div>`);
              if (foods_active_tab.value == 1) {
                _push2(`<div class="scroll-container-lg-3 scroll-container-3"${_scopeId}><div class="list-group list-group-flush"${_scopeId}><!--[-->`);
                ssrRenderList(__props.foods.income_list, (item) => {
                  _push2(`<div class="${ssrRenderClass(
                    "list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 " + (__props.foods.income_list.indexOf(
                      item
                    ) == __props.foods.income_list.length - 1 ? "rounded-bottom-3" : "")
                  )}"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-primary fw-light me-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(unref(formatDate)(
                    item.created_at
                  ))}</span><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(item.category)}</span></div><div class="d-flex"${_scopeId}><div class="scroll-x-hidden"${_scopeId}><span class="text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(item.category == "stand income" ? item.stand.name : item.program.name)}</span></div><span class="ms-auto me-0"${_scopeId}>${ssrInterpolate(unref(formatIDR)(item.price))}</span></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (foods_active_tab.value == 2) {
                _push2(`<div class="scroll-container-lg-3 scroll-container-3"${_scopeId}><div class="list-group list-group-flush"${_scopeId}><!--[-->`);
                ssrRenderList(__props.foods.expense_list, (item) => {
                  _push2(`<div class="${ssrRenderClass(
                    "list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 " + (__props.foods.expense_list.indexOf(
                      item
                    ) == __props.foods.expense_list.length - 1 ? "rounded-bottom-3" : "")
                  )}"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-primary fw-light me-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(unref(formatDate)(
                    item.created_at
                  ))}</span><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(item.category)}</span></div><div class="d-flex"${_scopeId}><div class="scroll-x-hidden"${_scopeId}><span class="text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(item.category == "stand expense" ? item.stand.name : item.withdraw.name)}</span></div><span class="ms-auto me-0"${_scopeId}>${ssrInterpolate(unref(formatIDR)(item.price))}</span></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (foods_active_tab.value == 3) {
                _push2(`<div class="scroll-container-lg-3 scroll-container-3"${_scopeId}><div class="list-group list-group-flush"${_scopeId}><!--[-->`);
                ssrRenderList(filtered_foods_income_list.value, (item) => {
                  _push2(`<div class="${ssrRenderClass(
                    "list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 " + (filtered_foods_income_list.value.indexOf(
                      item
                    ) == filtered_foods_income_list.value.length - 1 ? "rounded-bottom-3" : "")
                  )}"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-primary fw-light me-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(unref(formatDate)(
                    item.created_at
                  ))}</span></div><div class="d-flex"${_scopeId}><div class="scroll-x-hidden"${_scopeId}><span class="text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(item.stand.name)}</span></div><span class="ms-auto me-0"${_scopeId}>${ssrInterpolate(unref(formatIDR)(item.price))}</span></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (foods_active_tab.value == 4) {
                _push2(`<div class="scroll-container-lg-3 scroll-container-3"${_scopeId}><div class="list-group list-group-flush"${_scopeId}><!--[-->`);
                ssrRenderList(filtered_foods_expense_list.value, (item) => {
                  _push2(`<div class="${ssrRenderClass(
                    "list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 " + (filtered_foods_expense_list.value.indexOf(
                      item
                    ) == filtered_foods_expense_list.value.length - 1 ? "rounded-bottom-3" : "")
                  )}"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-primary fw-light me-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(unref(formatDate)(
                    item.created_at
                  ))}</span></div><div class="d-flex"${_scopeId}><div class="scroll-x-hidden"${_scopeId}><span class="text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(item.stand.name)}</span></div><span class="ms-auto me-0"${_scopeId}>${ssrInterpolate(unref(formatIDR)(item.price))}</span></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (isLargeScreen.value || opened_detail.value == "goods") {
              _push2(`<div class="col-lg-6 col-12" id="goodsDetail"${_scopeId}><div class="card p-2"${_scopeId}><div class="card bg-white p-1"${_scopeId}><div class="d-flex"${_scopeId}><span class="h6 text-primary-emphasis mx-2 my-auto text-nowrap"${_scopeId}>${ssrInterpolate("Goods List")}</span><div class="d-flex w-100"${_scopeId}><button class="${ssrRenderClass(
                "btn btn-sm btn-outline-primary border-0 text-center w-25 " + (goods_active_tab.value == 1 ? "border-bottom rounded-0 border-primary" : "")
              )}"${_scopeId}>${ssrInterpolate(goods_active_tab.value == 1 ? "Cash In" : "")} `);
              if (goods_active_tab.value !== 1) {
                _push2(`<i class="bi bi-box-arrow-in-down"${_scopeId}></i>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</button><button class="${ssrRenderClass(
                "btn btn-sm btn-outline-primary border-0 text-center w-25 " + (goods_active_tab.value == 2 ? "border-bottom rounded-0 border-primary" : "")
              )}"${_scopeId}>${ssrInterpolate(goods_active_tab.value == 2 ? "Cash Out" : "")} `);
              if (goods_active_tab.value !== 2) {
                _push2(`<i class="bi bi-box-arrow-up"${_scopeId}></i>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</button><button class="${ssrRenderClass(
                "btn btn-sm btn-outline-primary border-0 text-center w-25 " + (goods_active_tab.value == 3 ? "border-bottom rounded-0 border-primary" : "")
              )}"${_scopeId}>${ssrInterpolate(goods_active_tab.value == 3 ? "Income" : "")} `);
              if (goods_active_tab.value !== 3) {
                _push2(`<i class="bi bi-graph-up"${_scopeId}></i>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</button><button class="${ssrRenderClass(
                "btn btn-sm btn-outline-primary border-0 text-center w-25 " + (goods_active_tab.value == 4 ? "border-bottom rounded-0 border-primary" : "")
              )}"${_scopeId}>${ssrInterpolate(goods_active_tab.value == 4 ? "Expense" : "")} `);
              if (goods_active_tab.value !== 4) {
                _push2(`<i class="bi bi-graph-down"${_scopeId}></i>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</button></div></div></div><div class="d-flex mt-2 ms-2"${_scopeId}><span class="text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto h6"${_scopeId}>${ssrInterpolate("Filter")}</span><button class="btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"${_scopeId}>${ssrInterpolate("Date")} <i class="${ssrRenderClass(
                "bi bi-arrow-" + (__props.goods.filter.category == "updated_at" ? __props.goods.filter.order == "asc" ? "up" : "down" : "up")
              )}"${_scopeId}></i></button><button class="btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0 ms-2"${_scopeId}>${ssrInterpolate("Price")} <i class="${ssrRenderClass(
                "bi bi-arrow-" + (__props.goods.filter.category == "price" ? __props.goods.filter.order == "asc" ? "up" : "down" : "up")
              )}"${_scopeId}></i></button></div>`);
              if (goods_active_tab.value == 1) {
                _push2(`<div class="scroll-container-lg-3 scroll-container-3"${_scopeId}><div class="list-group list-group-flush"${_scopeId}><!--[-->`);
                ssrRenderList(__props.goods.income_list, (item) => {
                  _push2(`<div class="${ssrRenderClass(
                    "list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 " + (__props.goods.income_list.indexOf(
                      item
                    ) == __props.goods.income_list.length - 1 ? "rounded-bottom-3" : "")
                  )}"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-primary fw-light me-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(unref(formatDate)(
                    item.created_at
                  ))}</span><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(item.category)}</span></div><div class="d-flex"${_scopeId}><div class="scroll-x-hidden"${_scopeId}><span class="text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(item.category == "goods income" ? item.sales.customer : item.program.name)}</span></div><span class="ms-auto me-0"${_scopeId}>${ssrInterpolate(unref(formatIDR)(item.price))}</span></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (goods_active_tab.value == 2) {
                _push2(`<div class="scroll-container-lg-3 scroll-container-3"${_scopeId}><div class="list-group list-group-flush"${_scopeId}><!--[-->`);
                ssrRenderList(__props.goods.expense_list, (item) => {
                  _push2(`<div class="${ssrRenderClass(
                    "list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 " + (__props.goods.expense_list.indexOf(
                      item
                    ) == __props.goods.expense_list.length - 1 ? "rounded-bottom-3" : "")
                  )}"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-primary fw-light me-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(unref(formatDate)(
                    item.created_at
                  ))}</span><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(item.category)}</span></div><div class="d-flex"${_scopeId}><div class="scroll-x-hidden"${_scopeId}><span class="text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(item.category == "goods expense" ? item.capital.name : item.withdraw.name)}</span></div><span class="ms-auto me-0"${_scopeId}>${ssrInterpolate(unref(formatIDR)(item.price))}</span></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (goods_active_tab.value == 3) {
                _push2(`<div class="scroll-container-lg-3 scroll-container-3"${_scopeId}><div class="list-group list-group-flush"${_scopeId}><!--[-->`);
                ssrRenderList(filtered_goods_income_list.value, (item) => {
                  _push2(`<div class="${ssrRenderClass(
                    "list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 " + (filtered_goods_income_list.value.indexOf(
                      item
                    ) == filtered_goods_income_list.value.length - 1 ? "rounded-bottom-3" : "")
                  )}"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-primary fw-light me-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(unref(formatDate)(
                    item.created_at
                  ))}</span></div><div class="d-flex"${_scopeId}><div class="scroll-x-hidden"${_scopeId}><span class="text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(item.sales.customer)}</span></div><span class="ms-auto me-0"${_scopeId}>${ssrInterpolate(unref(formatIDR)(item.price))}</span></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (goods_active_tab.value == 4) {
                _push2(`<div class="scroll-container-lg-3 scroll-container-3"${_scopeId}><div class="list-group list-group-flush"${_scopeId}><!--[-->`);
                ssrRenderList(filtered_goods_expense_list.value, (item) => {
                  _push2(`<div class="${ssrRenderClass(
                    "list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 " + (filtered_goods_expense_list.value.indexOf(
                      item
                    ) == filtered_goods_expense_list.value.length - 1 ? "rounded-bottom-3" : "")
                  )}"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-primary fw-light me-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(unref(formatDate)(
                    item.created_at
                  ))}</span></div><div class="d-flex"${_scopeId}><div class="scroll-x-hidden"${_scopeId}><span class="text-primary-emphasis text-nowrap"${_scopeId}>${ssrInterpolate(item.capital.name)}</span></div><span class="ms-auto me-0"${_scopeId}>${ssrInterpolate(unref(formatIDR)(item.price))}</span></div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
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
              createVNode("div", { class: "container me-lg-0 mx-auto mb-5" }, [
                createVNode("div", { class: "row mt-4" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card bg-white p-3" }, [
                      createVNode("div", { class: "border-bottom border-1 border-primary pb-1 d-flex" }, [
                        createVNode("span", { class: "text-primary-emphasis h5" }, toDisplayString("Foods")),
                        createVNode("button", {
                          class: "btn-sm border-0 ms-auto p-0 bg-white d-lg-none",
                          style: { "font-size": "0.8rem" },
                          onClick: () => {
                            opened_detail.value = opened_detail.value == "foods" ? "" : "foods";
                          }
                        }, [
                          createVNode("span", { class: "text-primary" }, [
                            createTextVNode(toDisplayString(opened_detail.value == "foods" ? "hide detail" : "show detail") + " ", 1),
                            createVNode("i", {
                              class: "bi bi-chevron-" + (opened_detail.value == "foods" ? "up" : "down")
                            }, null, 2)
                          ])
                        ], 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "row gx-2" }, [
                        createVNode("div", { class: "col-6 col-lg-2 d-flex mt-2" }, [
                          createVNode("i", { class: "bi bi-wallet2 fs-5 my-auto text-primary" }),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("span", {
                              class: "d-block text-secondary",
                              style: "font-size:0.8rem;"
                            }, toDisplayString("Balance")),
                            createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.foods.balance.balance)), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-2 d-flex mt-2" }, [
                          createVNode("i", { class: "bi bi-box-arrow-in-down fs-5 my-auto text-primary" }),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("span", {
                              class: "d-block text-secondary",
                              style: "font-size:0.8rem;"
                            }, toDisplayString("Cash In")),
                            createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.foods.balance.income)), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-2 d-flex mt-2" }, [
                          createVNode("i", { class: "bi bi-box-arrow-up fs-5 my-auto text-primary" }),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("span", {
                              class: "d-block text-secondary",
                              style: "font-size:0.8rem;"
                            }, toDisplayString("Cash Out")),
                            createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.foods.balance.expense)), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-2 d-flex mt-2" }, [
                          createVNode("i", { class: "bi bi-cash-stack fs-5 my-auto text-primary" }),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("span", {
                              class: "d-block text-secondary",
                              style: "font-size:0.8rem;"
                            }, toDisplayString("Profit")),
                            createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(
                              __props.foods.total_income - __props.foods.total_expense
                            )), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-2 d-flex mt-2" }, [
                          createVNode("i", { class: "bi bi-graph-up fs-5 my-auto text-primary" }),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("span", {
                              class: "d-block text-secondary",
                              style: "font-size:0.8rem;"
                            }, toDisplayString("Income")),
                            createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.foods.total_income)), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-2 d-flex mt-2" }, [
                          createVNode("i", { class: "bi bi-graph-down fs-5 my-auto text-primary" }),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("span", {
                              class: "d-block text-secondary",
                              style: "font-size:0.8rem;"
                            }, toDisplayString("Expense")),
                            createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.foods.total_expense)), 1)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "card bg-white p-3 mt-4" }, [
                      createVNode("div", { class: "border-bottom border-1 border-primary pb-1 d-flex" }, [
                        createVNode("span", { class: "text-primary-emphasis h5" }, toDisplayString("Goods")),
                        createVNode("button", {
                          class: "ms-auto p-0 btn-sm border-0 bg-white d-lg-none",
                          style: { "font-size": "0.8rem" },
                          onClick: () => {
                            opened_detail.value = opened_detail.value == "goods" ? "" : "goods";
                          }
                        }, [
                          createVNode("span", { class: "text-primary" }, [
                            createTextVNode(toDisplayString(opened_detail.value == "goods" ? "hide detail" : "show detail") + " ", 1),
                            createVNode("i", {
                              class: "bi bi-chevron-" + (opened_detail.value == "goods" ? "up" : "down")
                            }, null, 2)
                          ])
                        ], 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "row gx-2" }, [
                        createVNode("div", { class: "col-6 col-lg-2 d-flex mt-2" }, [
                          createVNode("i", { class: "bi bi-wallet2 fs-5 my-auto text-primary" }),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("span", {
                              class: "d-block text-secondary",
                              style: "font-size:0.8rem;"
                            }, toDisplayString("Balance")),
                            createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.goods.balance.balance)), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-2 d-flex mt-2" }, [
                          createVNode("i", { class: "bi bi-box-arrow-in-down fs-5 my-auto text-primary" }),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("span", {
                              class: "d-block text-secondary",
                              style: "font-size:0.8rem;"
                            }, toDisplayString("Cash In")),
                            createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.goods.balance.income)), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-2 d-flex mt-2" }, [
                          createVNode("i", { class: "bi bi-box-arrow-up fs-5 my-auto text-primary" }),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("span", {
                              class: "d-block text-secondary",
                              style: "font-size:0.8rem;"
                            }, toDisplayString("Cash Out")),
                            createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.goods.balance.expense)), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-2 d-flex mt-2" }, [
                          createVNode("i", { class: "bi bi-cash-stack fs-5 my-auto text-primary" }),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("span", {
                              class: "d-block text-secondary",
                              style: "font-size:0.8rem;"
                            }, toDisplayString("Profit")),
                            createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(
                              __props.goods.total_income - __props.goods.total_expense
                            )), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-2 d-flex mt-2" }, [
                          createVNode("i", { class: "bi bi-graph-up fs-5 my-auto text-primary" }),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("span", {
                              class: "d-block text-secondary",
                              style: "font-size:0.8rem;"
                            }, toDisplayString("Income")),
                            createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.goods.total_income)), 1)
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-2 d-flex mt-2" }, [
                          createVNode("i", { class: "bi bi-graph-down fs-5 my-auto text-primary" }),
                          createVNode("div", { class: "ms-3" }, [
                            createVNode("span", {
                              class: "d-block text-secondary",
                              style: "font-size:0.8rem;"
                            }, toDisplayString("Expense")),
                            createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.goods.total_expense)), 1)
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode(Transition, {
                  name: "fade",
                  mode: "out-in"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock("div", {
                      class: "row gx-4 mt-4",
                      key: opened_detail.value
                    }, [
                      isLargeScreen.value || opened_detail.value == "foods" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "col-lg-6 col-12",
                        id: "foodsDetail"
                      }, [
                        createVNode("div", { class: "card p-2" }, [
                          createVNode("div", { class: "card bg-white p-1" }, [
                            createVNode("div", { class: "d-flex" }, [
                              createVNode("span", { class: "h6 text-primary-emphasis ms-1 me-2 my-auto text-nowrap" }, toDisplayString("Foods List")),
                              createVNode("div", { class: "d-flex w-100" }, [
                                createVNode("button", {
                                  onClick: ($event) => setFoodsActiveTab(1),
                                  class: "btn btn-sm btn-outline-primary border-0 text-center w-25 " + (foods_active_tab.value == 1 ? "border-bottom rounded-0 border-primary" : "")
                                }, [
                                  createTextVNode(toDisplayString(foods_active_tab.value == 1 ? "Cash In" : "") + " ", 1),
                                  foods_active_tab.value !== 1 ? (openBlock(), createBlock("i", {
                                    key: 0,
                                    class: "bi bi-box-arrow-in-down"
                                  })) : createCommentVNode("", true)
                                ], 10, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => setFoodsActiveTab(2),
                                  class: "btn btn-sm btn-outline-primary border-0 text-center w-25 " + (foods_active_tab.value == 2 ? "border-bottom rounded-0 border-primary" : "")
                                }, [
                                  createTextVNode(toDisplayString(foods_active_tab.value == 2 ? "Cash Out" : "") + " ", 1),
                                  foods_active_tab.value !== 2 ? (openBlock(), createBlock("i", {
                                    key: 0,
                                    class: "bi bi-box-arrow-up"
                                  })) : createCommentVNode("", true)
                                ], 10, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => setFoodsActiveTab(3),
                                  class: "btn btn-sm btn-outline-primary border-0 text-center w-25 " + (foods_active_tab.value == 3 ? "border-bottom rounded-0 border-primary" : "")
                                }, [
                                  createTextVNode(toDisplayString(foods_active_tab.value == 3 ? "Income" : "") + " ", 1),
                                  foods_active_tab.value !== 3 ? (openBlock(), createBlock("i", {
                                    key: 0,
                                    class: "bi bi-graph-up"
                                  })) : createCommentVNode("", true)
                                ], 10, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => setFoodsActiveTab(4),
                                  class: "btn btn-sm btn-outline-primary border-0 text-center w-25 " + (foods_active_tab.value == 4 ? "border-bottom rounded-0 border-primary" : "")
                                }, [
                                  createTextVNode(toDisplayString(foods_active_tab.value == 4 ? "Expense" : "") + " ", 1),
                                  foods_active_tab.value !== 4 ? (openBlock(), createBlock("i", {
                                    key: 0,
                                    class: "bi bi-graph-down"
                                  })) : createCommentVNode("", true)
                                ], 10, ["onClick"])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "d-flex mt-2 ms-2" }, [
                            createVNode("span", { class: "text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto h6" }, toDisplayString("Filter")),
                            createVNode("button", {
                              onClick: ($event) => handleFoodsFilter("updated_at"),
                              class: "btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"
                            }, [
                              createTextVNode(toDisplayString("Date") + " "),
                              createVNode("i", {
                                class: "bi bi-arrow-" + (__props.foods.filter.category == "updated_at" ? __props.foods.filter.order == "asc" ? "up" : "down" : "up")
                              }, null, 2)
                            ], 8, ["onClick"]),
                            createVNode("button", {
                              onClick: ($event) => handleFoodsFilter("price"),
                              class: "btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0 ms-2"
                            }, [
                              createTextVNode(toDisplayString("Price") + " "),
                              createVNode("i", {
                                class: "bi bi-arrow-" + (__props.foods.filter.category == "price" ? __props.foods.filter.order == "asc" ? "up" : "down" : "up")
                              }, null, 2)
                            ], 8, ["onClick"])
                          ]),
                          createVNode(Transition, {
                            name: "fade-slide-ltr",
                            mode: "out-in",
                            onAfterLeave: proceedFoodsTab
                          }, {
                            default: withCtx(() => [
                              foods_active_tab.value == 1 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "scroll-container-lg-3 scroll-container-3"
                              }, [
                                createVNode("div", { class: "list-group list-group-flush" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.foods.income_list, (item) => {
                                    return openBlock(), createBlock("div", {
                                      class: "list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 " + (__props.foods.income_list.indexOf(
                                        item
                                      ) == __props.foods.income_list.length - 1 ? "rounded-bottom-3" : "")
                                    }, [
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("span", {
                                          class: "text-primary fw-light me-2",
                                          style: { "font-size": "0.8rem" }
                                        }, toDisplayString(unref(formatDate)(
                                          item.created_at
                                        )), 1),
                                        createVNode("span", {
                                          class: "text-secondary",
                                          style: { "font-size": "0.8rem" }
                                        }, toDisplayString(item.category), 1)
                                      ]),
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("div", { class: "scroll-x-hidden" }, [
                                          createVNode("span", { class: "text-primary-emphasis text-nowrap" }, toDisplayString(item.category == "stand income" ? item.stand.name : item.program.name), 1)
                                        ]),
                                        createVNode("span", { class: "ms-auto me-0" }, toDisplayString(unref(formatIDR)(item.price)), 1)
                                      ])
                                    ], 2);
                                  }), 256))
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }),
                          createVNode(Transition, {
                            name: "fade-slide-" + (foods_prev_tab.value > 2 || foods_next_tab.value > 2 ? "ltr" : "rtl"),
                            onAfterLeave: proceedFoodsTab
                          }, {
                            default: withCtx(() => [
                              foods_active_tab.value == 2 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "scroll-container-lg-3 scroll-container-3"
                              }, [
                                createVNode("div", { class: "list-group list-group-flush" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.foods.expense_list, (item) => {
                                    return openBlock(), createBlock("div", {
                                      class: "list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 " + (__props.foods.expense_list.indexOf(
                                        item
                                      ) == __props.foods.expense_list.length - 1 ? "rounded-bottom-3" : "")
                                    }, [
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("span", {
                                          class: "text-primary fw-light me-2",
                                          style: { "font-size": "0.8rem" }
                                        }, toDisplayString(unref(formatDate)(
                                          item.created_at
                                        )), 1),
                                        createVNode("span", {
                                          class: "text-secondary",
                                          style: { "font-size": "0.8rem" }
                                        }, toDisplayString(item.category), 1)
                                      ]),
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("div", { class: "scroll-x-hidden" }, [
                                          createVNode("span", { class: "text-primary-emphasis text-nowrap" }, toDisplayString(item.category == "stand expense" ? item.stand.name : item.withdraw.name), 1)
                                        ]),
                                        createVNode("span", { class: "ms-auto me-0" }, toDisplayString(unref(formatIDR)(item.price)), 1)
                                      ])
                                    ], 2);
                                  }), 256))
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["name"]),
                          createVNode(Transition, {
                            name: "fade-slide-" + (foods_prev_tab.value > 3 || foods_next_tab.value > 3 ? "ltr" : "rtl"),
                            onAfterLeave: proceedFoodsTab
                          }, {
                            default: withCtx(() => [
                              foods_active_tab.value == 3 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "scroll-container-lg-3 scroll-container-3"
                              }, [
                                createVNode("div", { class: "list-group list-group-flush" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(filtered_foods_income_list.value, (item) => {
                                    return openBlock(), createBlock("div", {
                                      class: "list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 " + (filtered_foods_income_list.value.indexOf(
                                        item
                                      ) == filtered_foods_income_list.value.length - 1 ? "rounded-bottom-3" : "")
                                    }, [
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("span", {
                                          class: "text-primary fw-light me-2",
                                          style: { "font-size": "0.8rem" }
                                        }, toDisplayString(unref(formatDate)(
                                          item.created_at
                                        )), 1)
                                      ]),
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("div", { class: "scroll-x-hidden" }, [
                                          createVNode("span", { class: "text-primary-emphasis text-nowrap" }, toDisplayString(item.stand.name), 1)
                                        ]),
                                        createVNode("span", { class: "ms-auto me-0" }, toDisplayString(unref(formatIDR)(item.price)), 1)
                                      ])
                                    ], 2);
                                  }), 256))
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["name"]),
                          createVNode(Transition, {
                            name: "fade-slide-rtl",
                            onAfterLeave: proceedFoodsTab
                          }, {
                            default: withCtx(() => [
                              foods_active_tab.value == 4 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "scroll-container-lg-3 scroll-container-3"
                              }, [
                                createVNode("div", { class: "list-group list-group-flush" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(filtered_foods_expense_list.value, (item) => {
                                    return openBlock(), createBlock("div", {
                                      class: "list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 " + (filtered_foods_expense_list.value.indexOf(
                                        item
                                      ) == filtered_foods_expense_list.value.length - 1 ? "rounded-bottom-3" : "")
                                    }, [
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("span", {
                                          class: "text-primary fw-light me-2",
                                          style: { "font-size": "0.8rem" }
                                        }, toDisplayString(unref(formatDate)(
                                          item.created_at
                                        )), 1)
                                      ]),
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("div", { class: "scroll-x-hidden" }, [
                                          createVNode("span", { class: "text-primary-emphasis text-nowrap" }, toDisplayString(item.stand.name), 1)
                                        ]),
                                        createVNode("span", { class: "ms-auto me-0" }, toDisplayString(unref(formatIDR)(item.price)), 1)
                                      ])
                                    ], 2);
                                  }), 256))
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ])
                      ])) : createCommentVNode("", true),
                      isLargeScreen.value || opened_detail.value == "goods" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "col-lg-6 col-12",
                        id: "goodsDetail"
                      }, [
                        createVNode("div", { class: "card p-2" }, [
                          createVNode("div", { class: "card bg-white p-1" }, [
                            createVNode("div", { class: "d-flex" }, [
                              createVNode("span", { class: "h6 text-primary-emphasis mx-2 my-auto text-nowrap" }, toDisplayString("Goods List")),
                              createVNode("div", { class: "d-flex w-100" }, [
                                createVNode("button", {
                                  onClick: ($event) => setGoodsActiveTab(1),
                                  class: "btn btn-sm btn-outline-primary border-0 text-center w-25 " + (goods_active_tab.value == 1 ? "border-bottom rounded-0 border-primary" : "")
                                }, [
                                  createTextVNode(toDisplayString(goods_active_tab.value == 1 ? "Cash In" : "") + " ", 1),
                                  goods_active_tab.value !== 1 ? (openBlock(), createBlock("i", {
                                    key: 0,
                                    class: "bi bi-box-arrow-in-down"
                                  })) : createCommentVNode("", true)
                                ], 10, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => setGoodsActiveTab(2),
                                  class: "btn btn-sm btn-outline-primary border-0 text-center w-25 " + (goods_active_tab.value == 2 ? "border-bottom rounded-0 border-primary" : "")
                                }, [
                                  createTextVNode(toDisplayString(goods_active_tab.value == 2 ? "Cash Out" : "") + " ", 1),
                                  goods_active_tab.value !== 2 ? (openBlock(), createBlock("i", {
                                    key: 0,
                                    class: "bi bi-box-arrow-up"
                                  })) : createCommentVNode("", true)
                                ], 10, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => setGoodsActiveTab(3),
                                  class: "btn btn-sm btn-outline-primary border-0 text-center w-25 " + (goods_active_tab.value == 3 ? "border-bottom rounded-0 border-primary" : "")
                                }, [
                                  createTextVNode(toDisplayString(goods_active_tab.value == 3 ? "Income" : "") + " ", 1),
                                  goods_active_tab.value !== 3 ? (openBlock(), createBlock("i", {
                                    key: 0,
                                    class: "bi bi-graph-up"
                                  })) : createCommentVNode("", true)
                                ], 10, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => setGoodsActiveTab(4),
                                  class: "btn btn-sm btn-outline-primary border-0 text-center w-25 " + (goods_active_tab.value == 4 ? "border-bottom rounded-0 border-primary" : "")
                                }, [
                                  createTextVNode(toDisplayString(goods_active_tab.value == 4 ? "Expense" : "") + " ", 1),
                                  goods_active_tab.value !== 4 ? (openBlock(), createBlock("i", {
                                    key: 0,
                                    class: "bi bi-graph-down"
                                  })) : createCommentVNode("", true)
                                ], 10, ["onClick"])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "d-flex mt-2 ms-2" }, [
                            createVNode("span", { class: "text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto h6" }, toDisplayString("Filter")),
                            createVNode("button", {
                              onClick: ($event) => handleGoodsFilter("updated_at"),
                              class: "btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"
                            }, [
                              createTextVNode(toDisplayString("Date") + " "),
                              createVNode("i", {
                                class: "bi bi-arrow-" + (__props.goods.filter.category == "updated_at" ? __props.goods.filter.order == "asc" ? "up" : "down" : "up")
                              }, null, 2)
                            ], 8, ["onClick"]),
                            createVNode("button", {
                              onClick: ($event) => handleGoodsFilter("price"),
                              class: "btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0 ms-2"
                            }, [
                              createTextVNode(toDisplayString("Price") + " "),
                              createVNode("i", {
                                class: "bi bi-arrow-" + (__props.goods.filter.category == "price" ? __props.goods.filter.order == "asc" ? "up" : "down" : "up")
                              }, null, 2)
                            ], 8, ["onClick"])
                          ]),
                          createVNode(Transition, {
                            name: "fade-slide-ltr",
                            mode: "out-in",
                            onAfterLeave: proceedGoodsTab
                          }, {
                            default: withCtx(() => [
                              goods_active_tab.value == 1 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "scroll-container-lg-3 scroll-container-3"
                              }, [
                                createVNode("div", { class: "list-group list-group-flush" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.goods.income_list, (item) => {
                                    return openBlock(), createBlock("div", {
                                      class: "list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 " + (__props.goods.income_list.indexOf(
                                        item
                                      ) == __props.goods.income_list.length - 1 ? "rounded-bottom-3" : "")
                                    }, [
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("span", {
                                          class: "text-primary fw-light me-2",
                                          style: { "font-size": "0.8rem" }
                                        }, toDisplayString(unref(formatDate)(
                                          item.created_at
                                        )), 1),
                                        createVNode("span", {
                                          class: "text-secondary",
                                          style: { "font-size": "0.8rem" }
                                        }, toDisplayString(item.category), 1)
                                      ]),
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("div", { class: "scroll-x-hidden" }, [
                                          createVNode("span", { class: "text-primary-emphasis text-nowrap" }, toDisplayString(item.category == "goods income" ? item.sales.customer : item.program.name), 1)
                                        ]),
                                        createVNode("span", { class: "ms-auto me-0" }, toDisplayString(unref(formatIDR)(item.price)), 1)
                                      ])
                                    ], 2);
                                  }), 256))
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }),
                          createVNode(Transition, {
                            name: "fade-slide-" + (goods_prev_tab.value > 2 || goods_next_tab.value > 2 ? "ltr" : "rtl"),
                            onAfterLeave: proceedGoodsTab
                          }, {
                            default: withCtx(() => [
                              goods_active_tab.value == 2 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "scroll-container-lg-3 scroll-container-3"
                              }, [
                                createVNode("div", { class: "list-group list-group-flush" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.goods.expense_list, (item) => {
                                    return openBlock(), createBlock("div", {
                                      class: "list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 " + (__props.goods.expense_list.indexOf(
                                        item
                                      ) == __props.goods.expense_list.length - 1 ? "rounded-bottom-3" : "")
                                    }, [
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("span", {
                                          class: "text-primary fw-light me-2",
                                          style: { "font-size": "0.8rem" }
                                        }, toDisplayString(unref(formatDate)(
                                          item.created_at
                                        )), 1),
                                        createVNode("span", {
                                          class: "text-secondary",
                                          style: { "font-size": "0.8rem" }
                                        }, toDisplayString(item.category), 1)
                                      ]),
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("div", { class: "scroll-x-hidden" }, [
                                          createVNode("span", { class: "text-primary-emphasis text-nowrap" }, toDisplayString(item.category == "goods expense" ? item.capital.name : item.withdraw.name), 1)
                                        ]),
                                        createVNode("span", { class: "ms-auto me-0" }, toDisplayString(unref(formatIDR)(item.price)), 1)
                                      ])
                                    ], 2);
                                  }), 256))
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["name"]),
                          createVNode(Transition, {
                            name: "fade-slide-" + (goods_prev_tab.value > 3 || goods_next_tab.value > 3 ? "ltr" : "rtl"),
                            onAfterLeave: proceedGoodsTab
                          }, {
                            default: withCtx(() => [
                              goods_active_tab.value == 3 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "scroll-container-lg-3 scroll-container-3"
                              }, [
                                createVNode("div", { class: "list-group list-group-flush" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(filtered_goods_income_list.value, (item) => {
                                    return openBlock(), createBlock("div", {
                                      class: "list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 " + (filtered_goods_income_list.value.indexOf(
                                        item
                                      ) == filtered_goods_income_list.value.length - 1 ? "rounded-bottom-3" : "")
                                    }, [
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("span", {
                                          class: "text-primary fw-light me-2",
                                          style: { "font-size": "0.8rem" }
                                        }, toDisplayString(unref(formatDate)(
                                          item.created_at
                                        )), 1)
                                      ]),
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("div", { class: "scroll-x-hidden" }, [
                                          createVNode("span", { class: "text-primary-emphasis text-nowrap" }, toDisplayString(item.sales.customer), 1)
                                        ]),
                                        createVNode("span", { class: "ms-auto me-0" }, toDisplayString(unref(formatIDR)(item.price)), 1)
                                      ])
                                    ], 2);
                                  }), 256))
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["name"]),
                          createVNode(Transition, {
                            name: "fade-slide-rtl",
                            onAfterLeave: proceedGoodsTab
                          }, {
                            default: withCtx(() => [
                              goods_active_tab.value == 4 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "scroll-container-lg-3 scroll-container-3"
                              }, [
                                createVNode("div", { class: "list-group list-group-flush" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(filtered_goods_expense_list.value, (item) => {
                                    return openBlock(), createBlock("div", {
                                      class: "list-group-item card card-bg-hover py-1 px-2 d-flex rounded-0 " + (filtered_goods_expense_list.value.indexOf(
                                        item
                                      ) == filtered_goods_expense_list.value.length - 1 ? "rounded-bottom-3" : "")
                                    }, [
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("span", {
                                          class: "text-primary fw-light me-2",
                                          style: { "font-size": "0.8rem" }
                                        }, toDisplayString(unref(formatDate)(
                                          item.created_at
                                        )), 1)
                                      ]),
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("div", { class: "scroll-x-hidden" }, [
                                          createVNode("span", { class: "text-primary-emphasis text-nowrap" }, toDisplayString(item.capital.name), 1)
                                        ]),
                                        createVNode("span", { class: "ms-auto me-0" }, toDisplayString(unref(formatIDR)(item.price)), 1)
                                      ])
                                    ], 2);
                                  }), 256))
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          })
                        ])
                      ])) : createCommentVNode("", true)
                    ]))
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Business/InsightCashflow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
