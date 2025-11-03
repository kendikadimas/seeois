import { ref, onMounted, onUnmounted, watch, withCtx, unref, createVNode, toDisplayString, Transition, createBlock, createCommentVNode, openBlock, Fragment, renderList, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-kumyCM4h.js";
import { _ as _sfc_main$2 } from "./InputError-DkffFxkw.js";
import { _ as _sfc_main$3 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CQDhtLdH.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import { f as formatIDR } from "./utils-WpvxxmT9.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
import "date-fns";
const _sfc_main = {
  __name: "Insight",
  __ssrInlineRender: true,
  props: {
    taste_chart: Array,
    food_tag_list: Array,
    customer_lifetime_list: Array,
    combo_list: Object,
    customer_feedback: Object,
    menu_performance_list: Object,
    foods: Object,
    goods: Object,
    notif: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const title = ref("Business Insight");
    const modalConfirmationRef = ref(null);
    const modalTasteTagSettingRef = ref(null);
    const toastNotifRef = ref(null);
    ref("");
    const tasteChart = ref(null);
    const chartInstance = ref(null);
    const active_tab = ref(1);
    const prev_tab = ref(0);
    const next_tab = ref(0);
    const form_taste_tag = useForm({
      food_tag: props.food_tag_list
    });
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);
    function showTasteTagSettingModal(is_show) {
      if (modalTasteTagSettingRef.value == null) {
        const modal = document.getElementById("tasteSettingModal");
        modalTasteTagSettingRef.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalTasteTagSettingRef.value.show();
      }
    }
    function renderChart(data) {
      const canvasContainer = tasteChart.value.parentElement;
      canvasContainer.style.width = props.taste_chart.length * 60 + "px";
      const ctx = tasteChart.value.getContext("2d");
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
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            },
            x: {
              ticks: {
                maxRotation: 0,
                minRotation: 0,
                callback: function(value, index, ticks) {
                  let label = this.getLabelForValue(value);
                  return label.length > 10 ? label.slice(0, 10) + "…" : label;
                }
              }
            }
          }
        }
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
      const wa_phone = customer_phone.startsWith("0") ? customer_phone.slice(1) : customer_phone;
      window.open(`https://wa.me/62${wa_phone}`, "_blank");
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
    watch(
      () => props.taste_chart,
      (newVal) => {
        if (newVal && newVal.length > 0) {
          renderChart(newVal);
        }
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(StaffLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(title.value)}`);
          } else {
            return [
              createTextVNode(toDisplayString(title.value), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: title.value,
              icon: _ctx.$imageUrl("apps/logo.png")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="container me-lg-0 mx-auto mb-5"${_scopeId}><div class="row mt-4"${_scopeId}><div class="col-12"${_scopeId}><div class="card p-1"${_scopeId}><div class="d-flex"${_scopeId}><button class="${ssrRenderClass(
              "btn btn-outline-primary border-0 w-100 text-nowrap " + (active_tab.value == 1 ? "active" : "")
            )}"${_scopeId}><i class="${ssrRenderClass(
              "bi bi-list-ul me-2 d-lg-none " + (active_tab.value == 1 ? "d-none" : "")
            )}"${_scopeId}></i><span class="${ssrRenderClass(
              "d-lg-inline " + (active_tab.value == 1 || isLargeScreen.value ? "" : "d-none")
            )}"${_scopeId}>${ssrInterpolate("by Menu")}</span></button><button class="${ssrRenderClass(
              "btn btn-outline-primary border-0 w-100 text-nowrap " + (active_tab.value == 2 ? "active" : "")
            )}"${_scopeId}><i class="${ssrRenderClass(
              "bi bi-person-lines-fill me-2 d-lg-none " + (active_tab.value == 2 ? "d-none" : "")
            )}"${_scopeId}></i><span class="${ssrRenderClass(
              "d-lg-inline " + (active_tab.value == 2 || isLargeScreen.value ? "" : "d-none")
            )}"${_scopeId}>${ssrInterpolate("by Customer")}</span></button><button class="${ssrRenderClass(
              "btn btn-outline-primary border-0 w-100 text-nowrap " + (active_tab.value == 3 ? "active" : "")
            )}"${_scopeId}><i class="${ssrRenderClass(
              "bi bi-wallet2 me-2 d-lg-none " + (active_tab.value == 3 ? "d-none" : "")
            )}"${_scopeId}></i><span class="${ssrRenderClass(
              "d-lg-inline " + (active_tab.value == 3 || isLargeScreen.value ? "" : "d-none")
            )}"${_scopeId}>${ssrInterpolate("Cash Flow")}</span></button></div></div></div></div>`);
            if (active_tab.value == 1) {
              _push2(`<div class="row g-4 mt-0"${_scopeId}><div class="col-12 col-lg-8"${_scopeId}><div class="row g-4"${_scopeId}><div class="col-12"${_scopeId}><div class="card p-3 border-0"${_scopeId}><div class="d-flex border-bottom border-primary pb-2"${_scopeId}><span class="text-primary-emphasis h6 my-auto"${_scopeId}>${ssrInterpolate("Taste Preference")}</span>`);
              if (unref(auth_user).roles_id == 3) {
                _push2(`<button type="button" class="btn btn-sm btn-outline-secondary border-0 py-0 ms-auto"${_scopeId}><i class="bi bi-gear"${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="scroll-container-horizontal-lg scroll-container-horizontal"${_scopeId}><div class="text-nowrap"${_scopeId}><canvas style="${ssrRenderStyle({ "height": "160px" })}"${_scopeId}></canvas></div></div></div></div><div class="col-12"${_scopeId}><div class="card p-3 border-0"${_scopeId}><div class="d-flex border-bottom border-primary pb-2"${_scopeId}><span class="text-primary-emphasis h6 my-auto"${_scopeId}>${ssrInterpolate("Menu Performance")}</span></div><div class="scroll-container-horizontal-lg scroll-container-horizontal"${_scopeId}><div class="d-flex"${_scopeId}><div class="w-100"${_scopeId}><div class="d-flex my-2"${_scopeId}><i class="bi bi-graph-up-arrow text-primary ms-auto me-2"${_scopeId}></i><span class="me-auto d-block text-primary-emphasis h6 my-auto"${_scopeId}>${ssrInterpolate("Top Selling")}</span></div><table class="table mb-0 table-hover"${_scopeId}><thead${_scopeId}><tr${_scopeId}><td class="text-secondary text-center"${_scopeId}>${ssrInterpolate("Rank")}</td><td class="text-secondary"${_scopeId}>${ssrInterpolate("Menu")}</td><td class="text-secondary"${_scopeId}>${ssrInterpolate("Sales")}</td></tr></thead><tbody${_scopeId}><!--[-->`);
              ssrRenderList(__props.menu_performance_list.top, (item, index) => {
                _push2(`<tr${_scopeId}><td class="text-center text-secondary"${_scopeId}>${ssrInterpolate(index + 1)}</td><td class="text-nowrap"${_scopeId}>${ssrInterpolate(item.name)}</td><td class="text-nowrap text-primary"${_scopeId}>${ssrInterpolate(item.sale + " pcs")}</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div><div class="d-flex"${_scopeId}><span class="text-primary mt-2"${_scopeId}>${ssrInterpolate("Vs")}</span></div><div class="w-100"${_scopeId}><div class="d-flex my-2"${_scopeId}><i class="bi bi-graph-down-arrow text-primary ms-auto me-2"${_scopeId}></i><span class="me-auto d-block text-primary-emphasis h6 my-auto"${_scopeId}>${ssrInterpolate("Less Popular")}</span></div><table class="table mb-0 table-hover"${_scopeId}><thead${_scopeId}><tr${_scopeId}><td class="text-secondary text-center"${_scopeId}>${ssrInterpolate("Rank")}</td><td class="text-secondary"${_scopeId}>${ssrInterpolate("Menu")}</td><td class="text-secondary"${_scopeId}>${ssrInterpolate("Sales")}</td></tr></thead><tbody${_scopeId}><!--[-->`);
              ssrRenderList(__props.menu_performance_list.bottom, (item, index) => {
                _push2(`<tr${_scopeId}><td class="text-center text-secondary"${_scopeId}>${ssrInterpolate(index + 1)}</td><td class="text-nowrap"${_scopeId}>${ssrInterpolate(item.name)}</td><td class="text-nowrap text-primary"${_scopeId}>${ssrInterpolate(item.sale + " pcs")}</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div></div></div></div></div></div><div class="col-12 col-lg-4"${_scopeId}><div class="card p-3 border-0"${_scopeId}><div class="d-flex border-bottom border-primary"${_scopeId}><span class="h6 text-primary-emphasis"${_scopeId}>${ssrInterpolate("Menu Combo Pattern")}</span></div><div class="scroll-container-2 scroll-container-lg-3"${_scopeId}><li class="list-group list-group-flush"${_scopeId}><!--[-->`);
              ssrRenderList(__props.combo_list, (item) => {
                _push2(`<ul class="list-group-item list-group-item-action mb-0"${_scopeId}><div class="d-flex"${_scopeId}><div class="me-0"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Transaction")}</span><span class="text-primary d-block"${_scopeId}>${ssrInterpolate(item.transaction + " time")}</span></div><div class="ms-3"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Menu Pattern  ")}</span>`);
                if (Array.isArray(
                  item.menu_list
                )) {
                  _push2(`<!--[-->`);
                  ssrRenderList(item.menu_list, (menu) => {
                    _push2(`<div class="d-flex"${_scopeId}><i style="${ssrRenderStyle({ "font-size": "0.5rem" })}" class="bi bi-chevron-right text-primary my-auto"${_scopeId}></i><span class="text-dark ms-2"${_scopeId}>${ssrInterpolate(menu)}</span></div>`);
                  });
                  _push2(`<!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></ul>`);
              });
              _push2(`<!--]--></li></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value == 2) {
              _push2(`<div class="row mt-0 g-4"${_scopeId}><div class="col-12 col-lg-6"${_scopeId}><div class="card p-3"${_scopeId}><div class="d-flex border-bottom border-primary"${_scopeId}><span class="text-primary-emphasis h6"${_scopeId}>${ssrInterpolate("Customer Lifetime Value")}</span></div><table class="table mb-0 table-hover"${_scopeId}><thead${_scopeId}><tr${_scopeId}><td class="text-secondary text-center"${_scopeId}>${ssrInterpolate("Rank")}</td><td class="text-secondary"${_scopeId}>${ssrInterpolate("Customer")}</td><td class="text-secondary"${_scopeId}>${ssrInterpolate("Transaction")}</td><td class="text-secondary"${_scopeId}>${ssrInterpolate("Point")}</td></tr></thead><tbody class="scroll-container-3 scroll-container-lg-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.customer_lifetime_list, (item, index) => {
                _push2(`<tr${_scopeId}><td class="text-center text-secondary"${_scopeId}>${ssrInterpolate(index + 1)}</td><td${_scopeId}>${ssrInterpolate(item.name)} <i class="bi bi-whatsapp text-success" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}></i></td><td class="text-nowrap text-primary"${_scopeId}>${ssrInterpolate(unref(formatIDR)(item.transaction))}</td><td class="text-nowrap text-primary-emphasis"${_scopeId}><i class="fa-solid fa-coins text-warning"${_scopeId}></i> ${ssrInterpolate(item.point)}</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div><div class="col-12 col-lg-6"${_scopeId}><div class="card p-3"${_scopeId}><div class="d-flex border-bottom border-primary"${_scopeId}><span class="text-primary-emphasis h6"${_scopeId}>${ssrInterpolate("Customer Rating & Feedback")}</span></div><div class="d-flex my-2 px-2 py-1"${_scopeId}><span class="text-secondary"${_scopeId}>${ssrInterpolate("Average Rating")}</span><div class="d-flex ms-auto"${_scopeId}><!--[-->`);
              ssrRenderList(5, (rate) => {
                _push2(`<i class="${ssrRenderClass(
                  "bi text-warning me-2 bi-star" + (__props.customer_feedback.average > rate ? "-fill" : __props.customer_feedback.average > rate - 0.5 ? "-half" : "")
                )}"${_scopeId}></i>`);
              });
              _push2(`<!--]--><span class="text-primary my-auto border-start border-primary ps-2"${_scopeId}>${ssrInterpolate(__props.customer_feedback.average)}</span></div></div><div class="scroll-container-3 scroll-container-lg-3"${_scopeId}><li class="list-group list-group-flush"${_scopeId}><!--[-->`);
              ssrRenderList(__props.customer_feedback.feedback_list, (item) => {
                _push2(`<ul class="list-group-item list-group-item-action mb-0"${_scopeId}><div class="d-flex"${_scopeId}><div class="scroll-x-hidden"${_scopeId}><span class="text-nowrap"${_scopeId}>${ssrInterpolate(item.customer.name)}</span></div><div class="ms-auto"${_scopeId}><!--[-->`);
                ssrRenderList(5, (rate) => {
                  _push2(`<i class="${ssrRenderClass(
                    "bi  text-warning me-2 bi-star" + (item.rate > rate ? "-fill" : item.rate > rate - 0.5 ? "-half" : "")
                  )}"${_scopeId}></i>`);
                });
                _push2(`<!--]--></div></div><span class="text-secondary" style="${ssrRenderStyle({ "text-align": "justify" })}"${_scopeId}>${ssrInterpolate(item.message)}</span></ul>`);
              });
              _push2(`<!--]--></li></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value == 3) {
              _push2(`<div class="row mt-0 g-4"${_scopeId}><div class="col-12 col-lg-6"${_scopeId}><div class="card bg-white p-3"${_scopeId}><div class="border-bottom border-1 border-primary d-flex"${_scopeId}><span class="text-primary-emphasis h6"${_scopeId}>${ssrInterpolate("Cashflow")}</span><a${ssrRenderAttr("href", _ctx.route("blaterian.insight.cashflow"))} class="text-decoration-none ms-auto my-auto" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("details")} <i class="bi bi-box-arrow-up-right ms-0"${_scopeId}></i></a></div><span class="d-block text-secondary mt-2"${_scopeId}>${ssrInterpolate("Foods and Beverages")}</span><div class="row gx-2"${_scopeId}><div class="col-6 col-lg-4 d-flex mt-2"${_scopeId}><i class="bi bi-wallet2 fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Balance")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.foods.balance.balance))}</span></div></div><div class="col-6 col-lg-4 d-flex mt-2"${_scopeId}><i class="bi bi-box-arrow-in-down fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Cash In")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.foods.balance.income))}</span></div></div><div class="col-6 col-lg-4 d-flex mt-2"${_scopeId}><i class="bi bi-box-arrow-up fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Cash Out")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.foods.balance.expense))}</span></div></div><div class="col-6 col-lg-4 d-flex mt-2"${_scopeId}><i class="bi bi-cash-stack fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Profit")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                __props.foods.total_income - __props.foods.total_expense
              ))}</span></div></div><div class="col-6 col-lg-4 d-flex mt-2"${_scopeId}><i class="bi bi-graph-up fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Income")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.foods.total_income))}</span></div></div><div class="col-6 col-lg-4 d-flex mt-2"${_scopeId}><i class="bi bi-graph-down fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Expense")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.foods.total_expense))}</span></div></div></div><span class="d-block text-secondary mt-2 d-none"${_scopeId}>${ssrInterpolate("Goods ")}</span><div class="row gx-2 d-none"${_scopeId}><div class="col-6 col-lg-4 d-flex mt-2"${_scopeId}><i class="bi bi-wallet2 fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Balance")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.goods.balance.balance))}</span></div></div><div class="col-6 col-lg-4 d-flex mt-2"${_scopeId}><i class="bi bi-box-arrow-in-down fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Cash In")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.goods.balance.income))}</span></div></div><div class="col-6 col-lg-4 d-flex mt-2"${_scopeId}><i class="bi bi-box-arrow-up fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Cash Out")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.goods.balance.expense))}</span></div></div><div class="col-6 col-lg-4 d-flex mt-2"${_scopeId}><i class="bi bi-cash-stack fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Profit")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                __props.goods.total_income - __props.goods.total_expense
              ))}</span></div></div><div class="col-6 col-lg-4 d-flex mt-2"${_scopeId}><i class="bi bi-graph-up fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Income")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.goods.total_income))}</span></div></div><div class="col-6 col-lg-4 d-flex mt-2"${_scopeId}><i class="bi bi-graph-down fs-5 my-auto text-primary"${_scopeId}></i><div class="ms-3"${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}>${ssrInterpolate("Expense")}</span><span class="d-block"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.goods.total_expense))}</span></div></div></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: title.value,
                icon: _ctx.$imageUrl("apps/logo.png")
              }, null, 8, ["title", "icon"]),
              createVNode(_sfc_main$1, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
              }, null, 512),
              createVNode("div", { class: "container me-lg-0 mx-auto mb-5" }, [
                createVNode("div", { class: "row mt-4" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card p-1" }, [
                      createVNode("div", { class: "d-flex" }, [
                        createVNode("button", {
                          class: "btn btn-outline-primary border-0 w-100 text-nowrap " + (active_tab.value == 1 ? "active" : ""),
                          onClick: ($event) => setTargetTab(1)
                        }, [
                          createVNode("i", {
                            class: "bi bi-list-ul me-2 d-lg-none " + (active_tab.value == 1 ? "d-none" : "")
                          }, null, 2),
                          createVNode("span", {
                            class: "d-lg-inline " + (active_tab.value == 1 || isLargeScreen.value ? "" : "d-none")
                          }, toDisplayString("by Menu"), 2)
                        ], 10, ["onClick"]),
                        createVNode("button", {
                          class: "btn btn-outline-primary border-0 w-100 text-nowrap " + (active_tab.value == 2 ? "active" : ""),
                          onClick: ($event) => setTargetTab(2)
                        }, [
                          createVNode("i", {
                            class: "bi bi-person-lines-fill me-2 d-lg-none " + (active_tab.value == 2 ? "d-none" : "")
                          }, null, 2),
                          createVNode("span", {
                            class: "d-lg-inline " + (active_tab.value == 2 || isLargeScreen.value ? "" : "d-none")
                          }, toDisplayString("by Customer"), 2)
                        ], 10, ["onClick"]),
                        createVNode("button", {
                          class: "btn btn-outline-primary border-0 w-100 text-nowrap " + (active_tab.value == 3 ? "active" : ""),
                          onClick: ($event) => setTargetTab(3)
                        }, [
                          createVNode("i", {
                            class: "bi bi-wallet2 me-2 d-lg-none " + (active_tab.value == 3 ? "d-none" : "")
                          }, null, 2),
                          createVNode("span", {
                            class: "d-lg-inline " + (active_tab.value == 3 || isLargeScreen.value ? "" : "d-none")
                          }, toDisplayString("Cash Flow"), 2)
                        ], 10, ["onClick"])
                      ])
                    ])
                  ])
                ]),
                createVNode(Transition, {
                  name: "fade-slide-ltr",
                  onAfterLeave: ($event) => proceedTab(),
                  onAfterEnter: ($event) => renderChart(__props.taste_chart)
                }, {
                  default: withCtx(() => [
                    active_tab.value == 1 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "row g-4 mt-0"
                    }, [
                      createVNode("div", { class: "col-12 col-lg-8" }, [
                        createVNode("div", { class: "row g-4" }, [
                          createVNode("div", { class: "col-12" }, [
                            createVNode("div", { class: "card p-3 border-0" }, [
                              createVNode("div", { class: "d-flex border-bottom border-primary pb-2" }, [
                                createVNode("span", { class: "text-primary-emphasis h6 my-auto" }, toDisplayString("Taste Preference")),
                                unref(auth_user).roles_id == 3 ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  type: "button",
                                  onClick: ($event) => showTasteTagSettingModal(),
                                  class: "btn btn-sm btn-outline-secondary border-0 py-0 ms-auto"
                                }, [
                                  createVNode("i", { class: "bi bi-gear" })
                                ], 8, ["onClick"])) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "scroll-container-horizontal-lg scroll-container-horizontal" }, [
                                createVNode("div", { class: "text-nowrap" }, [
                                  createVNode("canvas", {
                                    ref_key: "tasteChart",
                                    ref: tasteChart,
                                    style: { "height": "160px" }
                                  }, null, 512)
                                ])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "col-12" }, [
                            createVNode("div", { class: "card p-3 border-0" }, [
                              createVNode("div", { class: "d-flex border-bottom border-primary pb-2" }, [
                                createVNode("span", { class: "text-primary-emphasis h6 my-auto" }, toDisplayString("Menu Performance"))
                              ]),
                              createVNode("div", { class: "scroll-container-horizontal-lg scroll-container-horizontal" }, [
                                createVNode("div", { class: "d-flex" }, [
                                  createVNode("div", { class: "w-100" }, [
                                    createVNode("div", { class: "d-flex my-2" }, [
                                      createVNode("i", { class: "bi bi-graph-up-arrow text-primary ms-auto me-2" }),
                                      createVNode("span", { class: "me-auto d-block text-primary-emphasis h6 my-auto" }, toDisplayString("Top Selling"))
                                    ]),
                                    createVNode("table", { class: "table mb-0 table-hover" }, [
                                      createVNode("thead", null, [
                                        createVNode("tr", null, [
                                          createVNode("td", { class: "text-secondary text-center" }, toDisplayString("Rank")),
                                          createVNode("td", { class: "text-secondary" }, toDisplayString("Menu")),
                                          createVNode("td", { class: "text-secondary" }, toDisplayString("Sales"))
                                        ])
                                      ]),
                                      createVNode("tbody", null, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.menu_performance_list.top, (item, index) => {
                                          return openBlock(), createBlock("tr", null, [
                                            createVNode("td", { class: "text-center text-secondary" }, toDisplayString(index + 1), 1),
                                            createVNode("td", { class: "text-nowrap" }, toDisplayString(item.name), 1),
                                            createVNode("td", { class: "text-nowrap text-primary" }, toDisplayString(item.sale + " pcs"), 1)
                                          ]);
                                        }), 256))
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", { class: "d-flex" }, [
                                    createVNode("span", { class: "text-primary mt-2" }, toDisplayString("Vs"))
                                  ]),
                                  createVNode("div", { class: "w-100" }, [
                                    createVNode("div", { class: "d-flex my-2" }, [
                                      createVNode("i", { class: "bi bi-graph-down-arrow text-primary ms-auto me-2" }),
                                      createVNode("span", { class: "me-auto d-block text-primary-emphasis h6 my-auto" }, toDisplayString("Less Popular"))
                                    ]),
                                    createVNode("table", { class: "table mb-0 table-hover" }, [
                                      createVNode("thead", null, [
                                        createVNode("tr", null, [
                                          createVNode("td", { class: "text-secondary text-center" }, toDisplayString("Rank")),
                                          createVNode("td", { class: "text-secondary" }, toDisplayString("Menu")),
                                          createVNode("td", { class: "text-secondary" }, toDisplayString("Sales"))
                                        ])
                                      ]),
                                      createVNode("tbody", null, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.menu_performance_list.bottom, (item, index) => {
                                          return openBlock(), createBlock("tr", null, [
                                            createVNode("td", { class: "text-center text-secondary" }, toDisplayString(index + 1), 1),
                                            createVNode("td", { class: "text-nowrap" }, toDisplayString(item.name), 1),
                                            createVNode("td", { class: "text-nowrap text-primary" }, toDisplayString(item.sale + " pcs"), 1)
                                          ]);
                                        }), 256))
                                      ])
                                    ])
                                  ])
                                ])
                              ])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "col-12 col-lg-4" }, [
                        createVNode("div", { class: "card p-3 border-0" }, [
                          createVNode("div", { class: "d-flex border-bottom border-primary" }, [
                            createVNode("span", { class: "h6 text-primary-emphasis" }, toDisplayString("Menu Combo Pattern"))
                          ]),
                          createVNode("div", { class: "scroll-container-2 scroll-container-lg-3" }, [
                            createVNode("li", { class: "list-group list-group-flush" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.combo_list, (item) => {
                                return openBlock(), createBlock("ul", { class: "list-group-item list-group-item-action mb-0" }, [
                                  createVNode("div", { class: "d-flex" }, [
                                    createVNode("div", { class: "me-0" }, [
                                      createVNode("span", {
                                        class: "text-secondary d-block",
                                        style: { "font-size": "0.8rem" }
                                      }, toDisplayString("Transaction")),
                                      createVNode("span", { class: "text-primary d-block" }, toDisplayString(item.transaction + " time"), 1)
                                    ]),
                                    createVNode("div", { class: "ms-3" }, [
                                      createVNode("span", {
                                        class: "text-secondary d-block",
                                        style: { "font-size": "0.8rem" }
                                      }, toDisplayString("Menu Pattern  ")),
                                      Array.isArray(
                                        item.menu_list
                                      ) ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(item.menu_list, (menu) => {
                                        return openBlock(), createBlock("div", { class: "d-flex" }, [
                                          createVNode("i", {
                                            style: { "font-size": "0.5rem" },
                                            class: "bi bi-chevron-right text-primary my-auto"
                                          }),
                                          createVNode("span", { class: "text-dark ms-2" }, toDisplayString(menu), 1)
                                        ]);
                                      }), 256)) : createCommentVNode("", true)
                                    ])
                                  ])
                                ]);
                              }), 256))
                            ])
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["onAfterLeave", "onAfterEnter"]),
                createVNode(Transition, {
                  name: next_tab.value > 2 || 2 < prev_tab.value ? "fade-slide-ltr" : "fade-slide-rtl",
                  onAfterLeave: ($event) => proceedTab()
                }, {
                  default: withCtx(() => [
                    active_tab.value == 2 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "row mt-0 g-4"
                    }, [
                      createVNode("div", { class: "col-12 col-lg-6" }, [
                        createVNode("div", { class: "card p-3" }, [
                          createVNode("div", { class: "d-flex border-bottom border-primary" }, [
                            createVNode("span", { class: "text-primary-emphasis h6" }, toDisplayString("Customer Lifetime Value"))
                          ]),
                          createVNode("table", { class: "table mb-0 table-hover" }, [
                            createVNode("thead", null, [
                              createVNode("tr", null, [
                                createVNode("td", { class: "text-secondary text-center" }, toDisplayString("Rank")),
                                createVNode("td", { class: "text-secondary" }, toDisplayString("Customer")),
                                createVNode("td", { class: "text-secondary" }, toDisplayString("Transaction")),
                                createVNode("td", { class: "text-secondary" }, toDisplayString("Point"))
                              ])
                            ]),
                            createVNode("tbody", { class: "scroll-container-3 scroll-container-lg-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.customer_lifetime_list, (item, index) => {
                                return openBlock(), createBlock("tr", {
                                  onClick: ($event) => goToWhatsapp(item.phone)
                                }, [
                                  createVNode("td", { class: "text-center text-secondary" }, toDisplayString(index + 1), 1),
                                  createVNode("td", null, [
                                    createTextVNode(toDisplayString(item.name) + " ", 1),
                                    createVNode("i", {
                                      class: "bi bi-whatsapp text-success",
                                      style: { "font-size": "0.8rem" }
                                    })
                                  ]),
                                  createVNode("td", { class: "text-nowrap text-primary" }, toDisplayString(unref(formatIDR)(item.transaction)), 1),
                                  createVNode("td", { class: "text-nowrap text-primary-emphasis" }, [
                                    createVNode("i", { class: "fa-solid fa-coins text-warning" }),
                                    createTextVNode(" " + toDisplayString(item.point), 1)
                                  ])
                                ], 8, ["onClick"]);
                              }), 256))
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "col-12 col-lg-6" }, [
                        createVNode("div", { class: "card p-3" }, [
                          createVNode("div", { class: "d-flex border-bottom border-primary" }, [
                            createVNode("span", { class: "text-primary-emphasis h6" }, toDisplayString("Customer Rating & Feedback"))
                          ]),
                          createVNode("div", { class: "d-flex my-2 px-2 py-1" }, [
                            createVNode("span", { class: "text-secondary" }, toDisplayString("Average Rating")),
                            createVNode("div", { class: "d-flex ms-auto" }, [
                              (openBlock(), createBlock(Fragment, null, renderList(5, (rate) => {
                                return createVNode("i", {
                                  class: "bi text-warning me-2 bi-star" + (__props.customer_feedback.average > rate ? "-fill" : __props.customer_feedback.average > rate - 0.5 ? "-half" : "")
                                }, null, 2);
                              }), 64)),
                              createVNode("span", { class: "text-primary my-auto border-start border-primary ps-2" }, toDisplayString(__props.customer_feedback.average), 1)
                            ])
                          ]),
                          createVNode("div", { class: "scroll-container-3 scroll-container-lg-3" }, [
                            createVNode("li", { class: "list-group list-group-flush" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.customer_feedback.feedback_list, (item) => {
                                return openBlock(), createBlock("ul", { class: "list-group-item list-group-item-action mb-0" }, [
                                  createVNode("div", { class: "d-flex" }, [
                                    createVNode("div", { class: "scroll-x-hidden" }, [
                                      createVNode("span", { class: "text-nowrap" }, toDisplayString(item.customer.name), 1)
                                    ]),
                                    createVNode("div", { class: "ms-auto" }, [
                                      (openBlock(), createBlock(Fragment, null, renderList(5, (rate) => {
                                        return createVNode("i", {
                                          class: "bi  text-warning me-2 bi-star" + (item.rate > rate ? "-fill" : item.rate > rate - 0.5 ? "-half" : "")
                                        }, null, 2);
                                      }), 64))
                                    ])
                                  ]),
                                  createVNode("span", {
                                    class: "text-secondary",
                                    style: { "text-align": "justify" }
                                  }, toDisplayString(item.message), 1)
                                ]);
                              }), 256))
                            ])
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["name", "onAfterLeave"]),
                createVNode(Transition, {
                  name: "fade-slide-rtl",
                  onAfterLeave: ($event) => proceedTab()
                }, {
                  default: withCtx(() => [
                    active_tab.value == 3 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "row mt-0 g-4"
                    }, [
                      createVNode("div", { class: "col-12 col-lg-6" }, [
                        createVNode("div", { class: "card bg-white p-3" }, [
                          createVNode("div", { class: "border-bottom border-1 border-primary d-flex" }, [
                            createVNode("span", { class: "text-primary-emphasis h6" }, toDisplayString("Cashflow")),
                            createVNode("a", {
                              href: _ctx.route("blaterian.insight.cashflow"),
                              class: "text-decoration-none ms-auto my-auto",
                              style: { "font-size": "0.8rem" }
                            }, [
                              createTextVNode(toDisplayString("details") + " "),
                              createVNode("i", { class: "bi bi-box-arrow-up-right ms-0" })
                            ], 8, ["href"])
                          ]),
                          createVNode("span", { class: "d-block text-secondary mt-2" }, toDisplayString("Foods and Beverages")),
                          createVNode("div", { class: "row gx-2" }, [
                            createVNode("div", { class: "col-6 col-lg-4 d-flex mt-2" }, [
                              createVNode("i", { class: "bi bi-wallet2 fs-5 my-auto text-primary" }),
                              createVNode("div", { class: "ms-3" }, [
                                createVNode("span", {
                                  class: "d-block text-secondary",
                                  style: "font-size:0.8rem;"
                                }, toDisplayString("Balance")),
                                createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.foods.balance.balance)), 1)
                              ])
                            ]),
                            createVNode("div", { class: "col-6 col-lg-4 d-flex mt-2" }, [
                              createVNode("i", { class: "bi bi-box-arrow-in-down fs-5 my-auto text-primary" }),
                              createVNode("div", { class: "ms-3" }, [
                                createVNode("span", {
                                  class: "d-block text-secondary",
                                  style: "font-size:0.8rem;"
                                }, toDisplayString("Cash In")),
                                createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.foods.balance.income)), 1)
                              ])
                            ]),
                            createVNode("div", { class: "col-6 col-lg-4 d-flex mt-2" }, [
                              createVNode("i", { class: "bi bi-box-arrow-up fs-5 my-auto text-primary" }),
                              createVNode("div", { class: "ms-3" }, [
                                createVNode("span", {
                                  class: "d-block text-secondary",
                                  style: "font-size:0.8rem;"
                                }, toDisplayString("Cash Out")),
                                createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.foods.balance.expense)), 1)
                              ])
                            ]),
                            createVNode("div", { class: "col-6 col-lg-4 d-flex mt-2" }, [
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
                            createVNode("div", { class: "col-6 col-lg-4 d-flex mt-2" }, [
                              createVNode("i", { class: "bi bi-graph-up fs-5 my-auto text-primary" }),
                              createVNode("div", { class: "ms-3" }, [
                                createVNode("span", {
                                  class: "d-block text-secondary",
                                  style: "font-size:0.8rem;"
                                }, toDisplayString("Income")),
                                createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.foods.total_income)), 1)
                              ])
                            ]),
                            createVNode("div", { class: "col-6 col-lg-4 d-flex mt-2" }, [
                              createVNode("i", { class: "bi bi-graph-down fs-5 my-auto text-primary" }),
                              createVNode("div", { class: "ms-3" }, [
                                createVNode("span", {
                                  class: "d-block text-secondary",
                                  style: "font-size:0.8rem;"
                                }, toDisplayString("Expense")),
                                createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.foods.total_expense)), 1)
                              ])
                            ])
                          ]),
                          createVNode("span", { class: "d-block text-secondary mt-2 d-none" }, toDisplayString("Goods ")),
                          createVNode("div", { class: "row gx-2 d-none" }, [
                            createVNode("div", { class: "col-6 col-lg-4 d-flex mt-2" }, [
                              createVNode("i", { class: "bi bi-wallet2 fs-5 my-auto text-primary" }),
                              createVNode("div", { class: "ms-3" }, [
                                createVNode("span", {
                                  class: "d-block text-secondary",
                                  style: "font-size:0.8rem;"
                                }, toDisplayString("Balance")),
                                createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.goods.balance.balance)), 1)
                              ])
                            ]),
                            createVNode("div", { class: "col-6 col-lg-4 d-flex mt-2" }, [
                              createVNode("i", { class: "bi bi-box-arrow-in-down fs-5 my-auto text-primary" }),
                              createVNode("div", { class: "ms-3" }, [
                                createVNode("span", {
                                  class: "d-block text-secondary",
                                  style: "font-size:0.8rem;"
                                }, toDisplayString("Cash In")),
                                createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.goods.balance.income)), 1)
                              ])
                            ]),
                            createVNode("div", { class: "col-6 col-lg-4 d-flex mt-2" }, [
                              createVNode("i", { class: "bi bi-box-arrow-up fs-5 my-auto text-primary" }),
                              createVNode("div", { class: "ms-3" }, [
                                createVNode("span", {
                                  class: "d-block text-secondary",
                                  style: "font-size:0.8rem;"
                                }, toDisplayString("Cash Out")),
                                createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.goods.balance.expense)), 1)
                              ])
                            ]),
                            createVNode("div", { class: "col-6 col-lg-4 d-flex mt-2" }, [
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
                            createVNode("div", { class: "col-6 col-lg-4 d-flex mt-2" }, [
                              createVNode("i", { class: "bi bi-graph-up fs-5 my-auto text-primary" }),
                              createVNode("div", { class: "ms-3" }, [
                                createVNode("span", {
                                  class: "d-block text-secondary",
                                  style: "font-size:0.8rem;"
                                }, toDisplayString("Income")),
                                createVNode("span", { class: "d-block" }, toDisplayString(unref(formatIDR)(__props.goods.total_income)), 1)
                              ])
                            ]),
                            createVNode("div", { class: "col-6 col-lg-4 d-flex mt-2" }, [
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
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["onAfterLeave"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(auth_user).roles_id == 3) {
        _push(`<div class="modal fade" id="tasteSettingModal" tabindex="-1" aria-labelledby="tasteSettingModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3 text-dark"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title h5 text-primary-emphasis"><i class="bi bi-gear border-secondary"></i> ${ssrInterpolate("Taste Settings")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><div class="modal-body"><div class="d-flex border-bottom border-2 pb-1"><span class="text-dark">${ssrInterpolate("Tag List")}</span><button class="btn btn-outline-primary btn-sm border-0 ms-auto"><i class="bi bi-plus-lg"></i></button></div><!--[-->`);
        ssrRenderList(unref(form_taste_tag).food_tag, (item, index) => {
          _push(`<div class="">`);
          if (item.deleted_at == null) {
            _push(`<div class="d-flex"><div class="w-50"><label style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${ssrRenderAttr("for", "form_food_tag_" + index)} class="form-label text-secondary">${ssrInterpolate("Name")}</label><input type="text" class="form-control form-control-sm"${ssrRenderAttr(
              "value",
              unref(form_taste_tag).food_tag[index].name
            )}></div><div class="w-50 ms-2"><label style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${ssrRenderAttr("for", "form_food_tag_" + index)} class="form-label text-secondary">${ssrInterpolate("Color")}</label><div class="input-group input-group-sm"><span class="input-group-text">${ssrInterpolate(unref(form_taste_tag).food_tag[index].color)}</span><input type="color" class="form-control form-control-sm"${ssrRenderAttr(
              "value",
              unref(form_taste_tag).food_tag[index].color
            )}></div></div><button type="button" class="btn btn-sm btn-outline-secondary border-0 ms-2 mt-1 mb-auto"><i class="bi bi-trash3"></i></button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]-->`);
        _push(ssrRenderComponent(_sfc_main$2, {
          message: unref(form_taste_tag).errors.food_tag
        }, null, _parent));
        _push(`</div><div class="modal-footer p-1"><div class="d-flex w-100"><button class="btn btn-sm btn-outline-primary w-50 rounded-end-0">${ssrInterpolate("Reset")}</button><button class="btn btn-sm btn-primary w-50 rounded-start-0">${ssrInterpolate("Save")}</button></div></div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Business/Insight.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
