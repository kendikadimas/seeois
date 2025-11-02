import { ref, computed, onMounted, onUnmounted, watch, withCtx, unref, createVNode, toDisplayString, Transition, createBlock, createCommentVNode, openBlock, createTextVNode, Fragment, renderList, withDirectives, vModelSelect, vModelText, withModifiers, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./StaffLayout-Dx7OTDGc.js";
import { _ as _sfc_main$3 } from "./InputError-DugfSnOg.js";
import { _ as _sfc_main$4 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$2 } from "./ModalConfirmation-CQDhtLdH.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { getMonth } from "date-fns";
import { f as formatIDR, g as getMonthName, a as formatDate } from "../app.js";
/* empty css             */
import "vue-toastification";
import "axios";
import "bootstrap";
const _sfc_main = {
  __name: "FinanceFeature",
  __ssrInlineRender: true,
  props: {
    default_contribution_id: Number,
    contribution_config: Object,
    contribution_users: Array,
    payroll_detail: Array,
    payroll_balance: Object,
    filter: Object,
    notif: Object,
    errors: Object
  },
  setup(__props) {
    var _a, _b, _c;
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const title = ref("Finance Feature");
    const modalConfirmationRef = ref(null);
    const toastNotifRef = ref(null);
    ref("placeholder");
    const date = /* @__PURE__ */ new Date();
    const modalContributionSettingRef = ref(null);
    const modalPayrollSettingRef = ref(null);
    const thisMonth = computed(() => {
      return (/* @__PURE__ */ new Date()).getMonth() + 1;
    });
    const contribution_configuration_collapse = ref(false);
    const icon_collapse_contribution_configuration = computed(
      () => contribution_configuration_collapse.value ? "up" : "down"
    );
    const is_batch = ref(false);
    ref(false);
    const active_tab = ref(1);
    const selected_receipt_id = ref(null);
    const selected_receipt = computed(() => {
      var _a2;
      return (_a2 = props.contribution_users.find((user) => user.id == selected_contribution_id.value)) == null ? void 0 : _a2.contribution.receipt.find(
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
      price: ((_a = props.contribution_config) == null ? void 0 : _a.financial_id) > 0 ? props.contribution_config.price : 0,
      start: ((_b = props.contribution_config) == null ? void 0 : _b.financial_id) > 0 ? props.contribution_config.start : (/* @__PURE__ */ new Date()).getMonth(),
      end: ((_c = props.contribution_config) == null ? void 0 : _c.financial_id) > 0 ? props.contribution_config.period + props.contribution_config.start - 1 : (/* @__PURE__ */ new Date()).getMonth()
    });
    const form_contribution_filter = useForm({
      keyword: props.filter.contribution.keyword
    });
    const form_payroll_setting = useForm({
      balance: props.payroll_balance.balance,
      level_list: props.payroll_detail
    });
    const form_update_payroll_single = useForm({
      user_id: null,
      level: null
    });
    const form_update_payroll_batch = useForm({
      staff_id_list: [],
      level: ""
    });
    function handleUpdatePayrollSingle() {
      form_update_payroll_single.post(route("payroll.update.single"));
    }
    function handleUpdatePayrollBatch() {
      form_update_payroll_batch.post(route("payroll.update.batch"));
    }
    function showContributionSettingsModal(is_show) {
      if (modalContributionSettingRef.value == null) {
        const modal = document.getElementById("modalSettingContribution");
        modalContributionSettingRef.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalContributionSettingRef.value.show();
      }
    }
    function showPayrollSettingsModal(is_show) {
      if (modalPayrollSettingRef.value == null) {
        const modal = document.getElementById("modalSettingPayroll");
        modalPayrollSettingRef.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalPayrollSettingRef.value.show();
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
    function confirmation(route2, message) {
      if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route2, message);
      } else {
        console.error("modalConfirmationRef is null");
      }
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, {
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
          var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: title.value,
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="container me-lg-0 mx-auto mb-5"${_scopeId}><div class="row gx-2 mt-4 d-lg-none"${_scopeId}><div class="col-12"${_scopeId}><div class="card p-2 bg-light"${_scopeId}><div class="d-flex"${_scopeId}><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary border-0 w-50 " + (active_tab.value == 1 ? "active" : "")
            )}"${_scopeId}>${ssrInterpolate("Contribution")}</button><div class="mx-1"${_scopeId}></div><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary border-0 w-50 " + (active_tab.value == 2 ? "active" : "")
            )}"${_scopeId}>${ssrInterpolate("Payroll")}</button></div></div></div></div><div class="row gx-4 mt-4"${_scopeId}><div class="col-12"${_scopeId}><div class="card p-3 shadow-sm bg-white"${_scopeId}><div class="d-flex text-primary-emphasis h5"${_scopeId}><span class="d-none d-lg-inline"${_scopeId}>${ssrInterpolate("Contribution & Payroll")}</span><div class="d-lg-none"${_scopeId}>`);
            if (active_tab.value == 1) {
              _push2(`<span${_scopeId}>${ssrInterpolate("Contribution")}</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value == 2) {
              _push2(`<span${_scopeId}>${ssrInterpolate("Payroll")}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button class="btn btn-sm btn-outline-primary border-0 py-0 ms-auto" style="${ssrRenderStyle("font-size: 0.8rem;")}"${_scopeId}>${ssrInterpolate(icon_collapse_contribution_configuration.value == "up" ? "hide" : "settings")} <i class="${ssrRenderClass(
              "bi my-auto bi-chevron-" + icon_collapse_contribution_configuration.value
            )}" style="${ssrRenderStyle("font-size: 0.8rem;")}"${_scopeId}></i></button></div>`);
            if (contribution_configuration_collapse.value) {
              _push2(`<div class="mb-2"${_scopeId}>`);
              if (active_tab.value == 1 || isLargeScreen.value) {
                _push2(`<div${_scopeId}><div class="row gx-2"${_scopeId}><div class="col-2 d-none d-lg-block"${_scopeId}><div class="d-flex h-100"${_scopeId}><span class="text-primary my-auto"${_scopeId}>${ssrInterpolate("Contribution")}</span></div></div><div class="col-lg-10 col-12"${_scopeId}><div class="row g-2"${_scopeId}><div class="col-6 col-lg-3"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle("font-size: 0.8rem;")}"${_scopeId}>${ssrInterpolate("Charge")}</span><span class="text-dark"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                  __props.contribution_config.price
                ))}</span></div><div class="col-6 col-lg-3"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle("font-size: 0.8rem;")}"${_scopeId}>${ssrInterpolate("Period")}</span><span class="text-dark"${_scopeId}>${ssrInterpolate(unref(getMonthName)(
                  __props.contribution_config.start
                ) + " - " + unref(getMonthName)(
                  __props.contribution_config.start + __props.contribution_config.period - 1
                ))}</span></div><div class="col-6 col-lg-3"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle("font-size: 0.8rem;")}"${_scopeId}>${ssrInterpolate("Total")}</span><span class="text-dark"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                  __props.contribution_config.period * __props.contribution_config.price
                ))}</span></div><div class="col-6 col-lg-3"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle("font-size: 0.8rem;")}"${_scopeId}>${ssrInterpolate("Set by")}</span><a${ssrRenderAttr(
                  "href",
                  _ctx.route(
                    "profile.edit",
                    __props.contribution_config.financial_id
                  )
                )} class="text-dark text-decoration-none d-flex"${_scopeId}>${ssrInterpolate(__props.contribution_config.financial.name)} <i style="${ssrRenderStyle("font-size: 0.8rem;")}" class="bi bi-box-arrow-up-right my-auto ms-2"${_scopeId}></i></a></div></div></div></div><div class="row"${_scopeId}><div class="col"${_scopeId}><div class="d-flex mt-2 pt-1" style="${ssrRenderStyle("font-size: 0.8rem;")}"${_scopeId}><span class="ms-0 my-auto ms-lg-auto me-2 text-secondary"${_scopeId}>${ssrInterpolate(__props.contribution_config.financial_id > 0 ? "Set on " + unref(formatDate)(
                  __props.contribution_config.updated_at
                ) : "Wait for Financial set up")}</span>`);
                if (unref(auth_user).roles_id == 2) {
                  _push2(`<button class="btn btn-sm btn-outline-secondary ms-auto ms-lg-0 py-0 d-flex border-0"${_scopeId}><i class="bi bi-gear my-auto" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (active_tab.value == 2 || isLargeScreen.value) {
                _push2(`<div${_scopeId}><div class="row gx-2"${_scopeId}><div class="col-2 d-none d-lg-block"${_scopeId}><div class="d-flex h-100"${_scopeId}><span class="text-primary mt-2"${_scopeId}>${ssrInterpolate("Payroll")}</span></div></div><div class="col-12 col-lg-10"${_scopeId}><div class="row g-2"${_scopeId}><div class="col-12 col-lg-3"${_scopeId}><div class="row g-2"${_scopeId}><div class="col-6 col-lg-12"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle("font-size: 0.8rem;")}"${_scopeId}>${ssrInterpolate("Budget")}</span><span class="text-dark"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                  __props.payroll_balance.balance
                ))}</span></div><div class="col-6 col-lg-12"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle("font-size: 0.8rem;")}"${_scopeId}>${ssrInterpolate("Set by")}</span>`);
                if (__props.payroll_balance.financial_id > 0) {
                  _push2(`<a${ssrRenderAttr(
                    "href",
                    _ctx.route(
                      "profile.edit",
                      (_a2 = __props.payroll_balance) == null ? void 0 : _a2.financial_id
                    )
                  )} class="text-dark text-decoration-none d-flex"${_scopeId}>${ssrInterpolate(((_c2 = (_b2 = __props.payroll_balance) == null ? void 0 : _b2.financial) == null ? void 0 : _c2.name) ?? "-")} <i style="${ssrRenderStyle("font-size: 0.8rem;")}" class="bi bi-box-arrow-up-right my-auto ms-2"${_scopeId}></i></a>`);
                } else {
                  _push2(`<span${_scopeId}>${ssrInterpolate(" - ")}</span>`);
                }
                _push2(`</div></div></div><div class="col-12 col-lg-9"${_scopeId}><!--[-->`);
                ssrRenderList(__props.payroll_detail, (item) => {
                  _push2(`<div class="d-block mb-2"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle("font-size: 0.8rem;")}"${_scopeId}>${ssrInterpolate("Level " + item.level)}</span><div class="row gx-2"${_scopeId}><div class="col-4"${_scopeId}>${ssrInterpolate(item.salary + " percent")}</div><div class="col-4"${_scopeId}>${ssrInterpolate(item.employee + (item.employee > 1 ? " persons" : " person"))}</div><div class="col-4 scroll-x-hidden"${_scopeId}><span class="text-nowrap"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                    item.salary_idr
                  ) + " /person")}</span></div></div></div>`);
                });
                _push2(`<!--]--></div></div></div></div><div class="row"${_scopeId}><div class="col"${_scopeId}><div class="d-flex mt-2 pt-1" style="${ssrRenderStyle("font-size: 0.8rem;")}"${_scopeId}><span class="ms-0 my-auto ms-lg-auto me-lg-2 text-secondary"${_scopeId}>${ssrInterpolate(__props.payroll_balance.financial_id > 0 ? "Set on " + unref(formatDate)(
                  __props.payroll_balance.updated_at
                ) : "Wait for Financial set up")}</span>`);
                if (unref(auth_user).roles_id == 2) {
                  _push2(`<button class="ms-auto ms-lg-0 btn btn-sm btn-outline-secondary py-0 d-flex border-0"${_scopeId}><i class="bi bi-gear my-auto" style="${ssrRenderStyle("font-size:0.8rem;")}"${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="card border-top border-0 border-primary rounded-top-0"${_scopeId}><div class="row g-2 mt-2"${_scopeId}><div class="col-12 col-lg-3"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle("font-size: 0.8rem;")}"${_scopeId}>${ssrInterpolate("Staff")}</span><a${ssrRenderAttr(
              "href",
              ((_d = selected_contribution.value) == null ? void 0 : _d.id) > 0 ? _ctx.route(
                "profile.edit",
                (_e = selected_contribution.value) == null ? void 0 : _e.id
              ) : ""
            )} class="text-dark text-decoration-none d-flex scroll-x-hidden"${_scopeId}><span class="text-nowrap"${_scopeId}>${ssrInterpolate(((_f = selected_contribution.value) == null ? void 0 : _f.id) > 0 ? selected_contribution.value.name : " - ")}</span>`);
            if (((_g = selected_contribution.value) == null ? void 0 : _g.id) > 0) {
              _push2(`<i style="${ssrRenderStyle("font-size: 0.8rem;")}" class="bi bi-box-arrow-up-right my-auto ms-2"${_scopeId}></i>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</a></div><div class="col-12 col-lg-9"${_scopeId}><div class="row gx-4"${_scopeId}>`);
            if (active_tab.value == 1 || isLargeScreen.value) {
              _push2(`<div class="col-12 col-lg-6"${_scopeId}><div class="row g-2"${_scopeId}><div class="col-12 d-lg-block d-none"${_scopeId}><div class="d-flex bg-light p-3"${_scopeId}><span class="text-primary-emphasis h6 mb-0 text-center"${_scopeId}>${ssrInterpolate("Contribution")}</span></div></div><div class="col-12"${_scopeId}><span style="${ssrRenderStyle("font-size:0.8rem;")}" class="text-secondary d-block"${_scopeId}>${ssrInterpolate("Progress ")}</span><!--[-->`);
              ssrRenderList(__props.contribution_config.period, (month) => {
                var _a3, _b3, _c3, _d2, _e2, _f2, _g2, _h2;
                _push2(`<div class="${ssrRenderClass(
                  "btn shadow-sm px-1 py-0 me-2 " + (month + ((_a3 = __props.contribution_config) == null ? void 0 : _a3.start) - 1 <= thisMonth.value && month > (((_b3 = selected_contribution.value) == null ? void 0 : _b3.contribution) ? (_d2 = (_c3 = selected_contribution.value) == null ? void 0 : _c3.contribution) == null ? void 0 : _d2.months : 0) ? "bg-danger bg-opacity-25" : "") + (month <= ((_f2 = (_e2 = selected_contribution.value) == null ? void 0 : _e2.contribution) == null ? void 0 : _f2.months) ? "bg-primary bg-opacity-25" : "bg-secondary bg-opacity-25 border-dark-subtle border-1")
                )}"${_scopeId}><span style="${ssrRenderStyle("font-size: 0.7rem;")}" class="${ssrRenderClass(
                  "position-relative " + (month <= ((_h2 = (_g2 = selected_contribution.value) == null ? void 0 : _g2.contribution) == null ? void 0 : _h2.months) ? "text-primary" : "text-secondary")
                )}"${_scopeId}>${ssrInterpolate(unref(getMonthName)(
                  month + __props.contribution_config.start - 1,
                  "short"
                ))}</span></div>`);
              });
              _push2(`<!--]--></div><div class="col-12"${_scopeId}><span style="${ssrRenderStyle("font-size:0.8rem;")}" class="text-secondary d-block mt-2"${_scopeId}>${ssrInterpolate("Status ")}</span>`);
              if (selected_contribution_id.value > 0) {
                _push2(`<span class="text-dark d-block"${_scopeId}>${ssrInterpolate(__props.contribution_config.start + (((_h = selected_contribution.value) == null ? void 0 : _h.contribution) ? selected_contribution.value.contribution.months - 1 : 0) <= thisMonth.value ? "Late for " + (thisMonth.value - ((_i = __props.contribution_config) == null ? void 0 : _i.start) - (((_j = selected_contribution.value) == null ? void 0 : _j.contribution) ? ((_l = (_k = selected_contribution.value) == null ? void 0 : _k.contribution) == null ? void 0 : _l.months) - 1 : -1) + (thisMonth.value - ((_m = __props.contribution_config) == null ? void 0 : _m.start) - (((_n = selected_contribution.value) == null ? void 0 : _n.contribution) ? ((_p = (_o = selected_contribution.value) == null ? void 0 : _o.contribution) == null ? void 0 : _p.months) - 1 : -1) > 1 ? " months" : " month")) : "On track.")}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (selected_contribution_id.value <= 0) {
                _push2(`<span class="d-block text-dark fst-italic"${_scopeId}>${ssrInterpolate("based on this month (" + unref(getMonthName)(
                  thisMonth.value
                ) + ")")}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="col-12"${_scopeId}><span style="${ssrRenderStyle("font-size:0.8rem;")}" class="text-secondary d-block mt-2"${_scopeId}>${ssrInterpolate("Receipt ")}</span><div class=""${_scopeId}>`);
              if ((_r = (_q = selected_contribution.value) == null ? void 0 : _q.contribution) == null ? void 0 : _r.receipt) {
                _push2(`<!--[-->`);
                ssrRenderList((_t = (_s = selected_contribution.value) == null ? void 0 : _s.contribution) == null ? void 0 : _t.receipt, (receipt) => {
                  var _a3, _b3, _c3;
                  _push2(`<button class="${ssrRenderClass(
                    "border-1 border-primary-subtle btn btn-sm btn-outline-primary me-2 py-0 position-relative " + (receipt.id == ((_a3 = selected_receipt.value) == null ? void 0 : _a3.id) ? "active" : "")
                  )}"${_scopeId}>${ssrInterpolate(((_c3 = (_b3 = selected_contribution.value) == null ? void 0 : _b3.contribution) == null ? void 0 : _c3.receipt.indexOf(
                    receipt
                  )) + 1)} <i class="bi bi-receipt ms-0"${_scopeId}></i>`);
                  if (receipt.financial_id == null) {
                    _push2(`<i class="bi bi-circle-fill position-absolute top-0 start-100 translate-middle text-danger" style="${ssrRenderStyle("font-size: 0.5rem;")}"${_scopeId}></i>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</button>`);
                });
                _push2(`<!--]-->`);
              } else {
                _push2(`<span class="text-secondary"${_scopeId}>${ssrInterpolate(" - ")}</span>`);
              }
              _push2(`</div></div>`);
              if (selected_receipt_id.value) {
                _push2(`<div class="col-12"${_scopeId}><div class="card mt-2 bg-light"${_scopeId}><div class="row mt-2"${_scopeId}><div class="col-12 d-flex"${_scopeId}><a${ssrRenderAttr(
                  "href",
                  "/storage/images/receipt/contribution/" + selected_receipt.value.receipt
                )} class="btn btn-sm btn-light border-0 mx-auto" download${_scopeId}>${ssrInterpolate(selected_receipt.value.receipt)} <i style="${ssrRenderStyle("font-size: 0.8rem;")}" class="bi bi-download text-primary ms-2 my-auto"${_scopeId}></i></a><button class="btn btn-sm btn-light me-2"${_scopeId}><i class="bi bi-x-lg"${_scopeId}></i></button></div><div class="col-12"${_scopeId}><div class="card border-1 m-2"${_scopeId}><img${ssrRenderAttr(
                  "src",
                  "/storage/images/receipt/contribution/" + selected_receipt.value.receipt
                )} class="w-100 rounded" alt="image"${_scopeId}></div>`);
                if (unref(auth_user).roles_id == 2) {
                  _push2(`<div class="d-flex mb-1"${_scopeId}><button class="${ssrRenderClass(
                    "mx-2 w-100 btn btn-sm btn-" + (selected_receipt.value.financial_id ? "secondary" : "success")
                  )}" style="${ssrRenderStyle("font-size: 0.8rem;")}"${_scopeId}>${ssrInterpolate(selected_receipt.value.financial_id ? "Unvalid for " + selected_receipt.value.months + (selected_receipt.value.months > 1 ? " months" : " month") : "Valid for " + selected_receipt.value.months + (selected_receipt.value.months > 1 ? " months" : " month"))}</button></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (unref(auth_user).roles_id !== 2) {
                  _push2(`<div class="d-flex text-center w-100 px-2 mb-1"${_scopeId}><span class="fw-light text-secondary" style="${ssrRenderStyle("font-size: 0.8rem;")}"${_scopeId}>${ssrInterpolate(selected_receipt.value.financial_id ? "Valid for " + selected_receipt.value.months + (selected_receipt.value.months > 1 ? " months" : " month") + " by " : "Unvalid for " + selected_receipt.value.months + (selected_receipt.value.months > 1 ? " months" : " month"))} `);
                  if (selected_receipt.value.financial_id) {
                    _push2(`<span class="scroll-x-hidden"${_scopeId}><span class="text-nowrap"${_scopeId}>${ssrInterpolate(selected_receipt.value.financial.name)}</span></span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</span><span class="fw-light text-secondary ms-auto" style="${ssrRenderStyle("font-size: 0.8rem;")}"${_scopeId}>${ssrInterpolate(selected_receipt.value.financial_id ? unref(formatDate)(
                    selected_receipt.value.updated_at
                  ) : "")}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value == 2 || isLargeScreen.value) {
              _push2(`<div class="col-12 col-lg-6"${_scopeId}><div class="row g-2"${_scopeId}><div class="col-12 d-lg-block d-none"${_scopeId}><div class="d-flex bg-light p-3"${_scopeId}><span class="text-primary-emphasis h6 mb-0 text-center"${_scopeId}>${ssrInterpolate("Payroll")}</span></div></div><div class="col-12"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Level")}</span>`);
              if (unref(auth_user).roles_id !== 2 || !(((_u = selected_contribution.value) == null ? void 0 : _u.id) > 0)) {
                _push2(`<span class="mt-1"${_scopeId}>${ssrInterpolate(((_v = selected_contribution.value) == null ? void 0 : _v.level) ?? " - ")}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).roles_id == 2 && ((_w = selected_contribution.value) == null ? void 0 : _w.id) > 0) {
                _push2(`<div class="input-group input-group-sm bg-light border rounded-2 mt-1"${_scopeId}><select class="form-select border-0"${_scopeId}><option value="0"${ssrIncludeBooleanAttr(Array.isArray(
                  unref(form_update_payroll_single).level
                ) ? ssrLooseContain(
                  unref(form_update_payroll_single).level,
                  "0"
                ) : ssrLooseEqual(
                  unref(form_update_payroll_single).level,
                  "0"
                )) ? " selected" : ""}${_scopeId}>${ssrInterpolate("Unset")}</option><!--[-->`);
                ssrRenderList(__props.payroll_detail, (i) => {
                  _push2(`<option${ssrRenderAttr(
                    "value",
                    i.level
                  )}${ssrIncludeBooleanAttr(Array.isArray(
                    unref(form_update_payroll_single).level
                  ) ? ssrLooseContain(
                    unref(form_update_payroll_single).level,
                    i.level
                  ) : ssrLooseEqual(
                    unref(form_update_payroll_single).level,
                    i.level
                  )) ? " selected" : ""}${_scopeId}>${ssrInterpolate("Level " + i.level)}</option>`);
                });
                _push2(`<!--]--></select><button class="btn btn-sm btn-outline-primary border-0 py-0"${_scopeId}><i class="bi bi-check-lg"${_scopeId}></i></button></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="col-12"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Salary (Rp)")}</span><span${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                ((_x = __props.payroll_detail.find(
                  (item) => {
                    var _a3;
                    return item.level == ((_a3 = selected_contribution.value) == null ? void 0 : _a3.level);
                  }
                )) == null ? void 0 : _x.salary_idr) ?? 0
              ))}</span></div>`);
              if (unref(auth_user).roles_id == 2) {
                _push2(`<div class="col-12"${_scopeId}><div class="rounded-2 border"${_scopeId}><button data-bs-toggle="collapse" data-bs-target="#batchLevelAssignmentDiv" class="btn btn-sm text-primary border-0 w-100 py-2 d-flex"${_scopeId}>${ssrInterpolate("Batch Level Assignment")} <i class="bi bi-chevron-down ms-auto"${_scopeId}></i></button><div class="collapse p-3" id="batchLevelAssignmentDiv"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Selected staff")}</span><span class="mb-3 d-block"${_scopeId}>${ssrInterpolate(unref(form_update_payroll_batch).staff_id_list.length + (unref(form_update_payroll_batch).staff_id_list.length > 1 ? " persons" : " person"))}</span>`);
                _push2(ssrRenderComponent(_sfc_main$3, {
                  message: unref(form_update_payroll_batch).errors.staff_id_list
                }, null, _parent2, _scopeId));
                _push2(`<span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Update to")}</span><div class="input-group input-group-sm bg-light border border-1 border-secondary-subtle rounded-2"${_scopeId}><span class="form-label px-2 py-0 my-auto text-secondary" for="batch_level"${_scopeId}>${ssrInterpolate("Level")}</span><select id="batch_level" class="form-select border-0"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(
                  unref(form_update_payroll_batch).level
                ) ? ssrLooseContain(
                  unref(form_update_payroll_batch).level,
                  ""
                ) : ssrLooseEqual(
                  unref(form_update_payroll_batch).level,
                  ""
                )) ? " selected" : ""}${_scopeId}>${ssrInterpolate("Unset")}</option><!--[-->`);
                ssrRenderList(__props.payroll_detail, (i) => {
                  _push2(`<option${ssrRenderAttr(
                    "value",
                    i.level
                  )}${ssrIncludeBooleanAttr(Array.isArray(
                    unref(form_update_payroll_batch).level
                  ) ? ssrLooseContain(
                    unref(form_update_payroll_batch).level,
                    i.level
                  ) : ssrLooseEqual(
                    unref(form_update_payroll_batch).level,
                    i.level
                  )) ? " selected" : ""}${_scopeId}>${ssrInterpolate("Level " + i.level)}</option>`);
                });
                _push2(`<!--]--></select></div>`);
                _push2(ssrRenderComponent(_sfc_main$3, {
                  message: unref(form_update_payroll_batch).errors.level
                }, null, _parent2, _scopeId));
                _push2(`<button class="btn btn-sm btn-primary border-0 py-1 mt-3 w-100"${_scopeId}>${ssrInterpolate("Update Level")}</button></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></div></div></div><div class="row gx-4 mt-4"${_scopeId}><div class="col-12 col-lg-6"${_scopeId}>`);
            if (selected_receipt_id.value == null) {
              _push2(`<div class="card sm p-3"${_scopeId}><div class="row"${_scopeId}><div class="col-12"${_scopeId}><div class="d-flex border-primary border-bottom pb-2"${_scopeId}><span class="text-primary-emphasis me-auto my-auto h6"${_scopeId}><i class="bi bi-people me-1"${_scopeId}></i> ${ssrInterpolate("Staff List")}</span></div></div></div><div class="d-flex mt-2"${_scopeId}>`);
              if (unref(form_update_payroll_batch).staff_id_list.length > 0) {
                _push2(`<button class="btn btn-sm btn-outline-primary border me-2 text-nowrap"${_scopeId}>${ssrInterpolate("Unselect all")}</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="input-group"${_scopeId}><input type="text" class="form-control form-control-sm py-0" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1"${ssrRenderAttr(
                "value",
                unref(form_contribution_filter).keyword
              )}${_scopeId}><span class="input-group-text py-0" id="basic-addon1"${_scopeId}><i class="bi bi-search" style="${ssrRenderStyle("font-size: 0.9rem")}"${_scopeId}></i></span></div></div><div class="scroll-container-2 scroll-container-lg-2"${_scopeId}><li class="list-group list-group-flush"${_scopeId}>`);
              if (__props.contribution_users.length == 0) {
                _push2(`<ul class="list-group-item list-group-item-action"${_scopeId}><span class="fst-italic text-secondary"${_scopeId}>${ssrInterpolate("No employee found.")}</span></ul>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.contribution_users.length > 0) {
                _push2(`<!--[-->`);
                ssrRenderList(__props.contribution_users, (contribution) => {
                  var _a3;
                  _push2(`<ul class="${ssrRenderClass(
                    "list-group-item list-group-item-action mb-0 py-1 px-0 " + (contribution.id == selected_contribution_id.value ? "bg-light" : "")
                  )}"${_scopeId}><div class="mx-2 d-flex"${_scopeId}>`);
                  if (is_batch.value) {
                    _push2(`<input type="checkbox" class="form-check-input me-2"${ssrIncludeBooleanAttr(
                      Array.isArray(
                        unref(form_update_payroll_batch).staff_id_list
                      ) ? ssrLooseContain(
                        unref(form_update_payroll_batch).staff_id_list,
                        contribution.id
                      ) : unref(form_update_payroll_batch).staff_id_list
                    ) ? " checked" : ""}${ssrRenderAttr("value", contribution.id)}${_scopeId}>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="${ssrRenderClass(
                    "me-auto " + (contribution.id == selected_contribution_id.value ? "" : "text-secondary")
                  )}"${_scopeId}>${ssrInterpolate(contribution.name)}</span>`);
                  if (!is_batch.value) {
                    _push2(`<div class="d-flex"${_scopeId}>`);
                    if (((_a3 = contribution.contribution) == null ? void 0 : _a3.months) + __props.contribution_config.start - 1 <= unref(getMonth)(unref(date)) + 1 || !contribution.contribution) {
                      _push2(`<span class="text-danger ms-auto border-danger-subtle border px-2 rounded-2 text-nowrap d-flex" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}><span class="my-auto"${_scopeId}>${ssrInterpolate("Late")}</span><i class="bi bi-exclamation my-auto"${_scopeId}></i></span>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (is_batch.value) {
                    _push2(`<span class="text-secondary ms-2"${_scopeId}>${ssrInterpolate((contribution == null ? void 0 : contribution.level) ? "Level " + contribution.level : "Unset")}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></ul>`);
                });
                _push2(`<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</li></div></div>`);
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
              createVNode(_sfc_main$2, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
              }, null, 512),
              createVNode("div", { class: "container me-lg-0 mx-auto mb-5" }, [
                createVNode("div", { class: "row gx-2 mt-4 d-lg-none" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card p-2 bg-light" }, [
                      createVNode("div", { class: "d-flex" }, [
                        createVNode("button", {
                          class: "btn btn-sm btn-outline-primary border-0 w-50 " + (active_tab.value == 1 ? "active" : ""),
                          onClick: () => {
                            active_tab.value = 0;
                          }
                        }, toDisplayString("Contribution"), 10, ["onClick"]),
                        createVNode("div", { class: "mx-1" }),
                        createVNode("button", {
                          class: "btn btn-sm btn-outline-primary border-0 w-50 " + (active_tab.value == 2 ? "active" : ""),
                          onClick: () => {
                            active_tab.value = 0;
                          }
                        }, toDisplayString("Payroll"), 10, ["onClick"])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "row gx-4 mt-4" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card p-3 shadow-sm bg-white" }, [
                      createVNode("div", { class: "d-flex text-primary-emphasis h5" }, [
                        createVNode("span", { class: "d-none d-lg-inline" }, toDisplayString("Contribution & Payroll")),
                        createVNode("div", { class: "d-lg-none" }, [
                          createVNode(Transition, {
                            name: "fade-slide-ltr",
                            onAfterLeave: () => {
                              active_tab.value = 2;
                            }
                          }, {
                            default: withCtx(() => [
                              active_tab.value == 1 ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString("Contribution"))) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["onAfterLeave"]),
                          createVNode(Transition, {
                            name: "fade-slide-rtl",
                            onAfterLeave: () => {
                              active_tab.value = 1;
                            }
                          }, {
                            default: withCtx(() => [
                              active_tab.value == 2 ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString("Payroll"))) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["onAfterLeave"])
                        ]),
                        createVNode("button", {
                          onClick: () => contribution_configuration_collapse.value = !contribution_configuration_collapse.value,
                          class: "btn btn-sm btn-outline-primary border-0 py-0 ms-auto",
                          style: "font-size: 0.8rem;"
                        }, [
                          createTextVNode(toDisplayString(icon_collapse_contribution_configuration.value == "up" ? "hide" : "settings") + " ", 1),
                          createVNode("i", {
                            class: "bi my-auto bi-chevron-" + icon_collapse_contribution_configuration.value,
                            style: "font-size: 0.8rem;"
                          }, null, 2)
                        ], 8, ["onClick"])
                      ]),
                      createVNode(Transition, { name: "fade" }, {
                        default: withCtx(() => [
                          contribution_configuration_collapse.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mb-2"
                          }, [
                            createVNode(Transition, { name: "fade-slide-ltr" }, {
                              default: withCtx(() => [
                                active_tab.value == 1 || isLargeScreen.value ? (openBlock(), createBlock("div", { key: 0 }, [
                                  createVNode("div", { class: "row gx-2" }, [
                                    createVNode("div", { class: "col-2 d-none d-lg-block" }, [
                                      createVNode("div", { class: "d-flex h-100" }, [
                                        createVNode("span", { class: "text-primary my-auto" }, toDisplayString("Contribution"))
                                      ])
                                    ]),
                                    createVNode("div", { class: "col-lg-10 col-12" }, [
                                      createVNode("div", { class: "row g-2" }, [
                                        createVNode("div", { class: "col-6 col-lg-3" }, [
                                          createVNode("span", {
                                            class: "text-secondary d-block",
                                            style: "font-size: 0.8rem;"
                                          }, toDisplayString("Charge")),
                                          createVNode("span", { class: "text-dark" }, toDisplayString(unref(formatIDR)(
                                            __props.contribution_config.price
                                          )), 1)
                                        ]),
                                        createVNode("div", { class: "col-6 col-lg-3" }, [
                                          createVNode("span", {
                                            class: "text-secondary d-block",
                                            style: "font-size: 0.8rem;"
                                          }, toDisplayString("Period")),
                                          createVNode("span", { class: "text-dark" }, toDisplayString(unref(getMonthName)(
                                            __props.contribution_config.start
                                          ) + " - " + unref(getMonthName)(
                                            __props.contribution_config.start + __props.contribution_config.period - 1
                                          )), 1)
                                        ]),
                                        createVNode("div", { class: "col-6 col-lg-3" }, [
                                          createVNode("span", {
                                            class: "text-secondary d-block",
                                            style: "font-size: 0.8rem;"
                                          }, toDisplayString("Total")),
                                          createVNode("span", { class: "text-dark" }, toDisplayString(unref(formatIDR)(
                                            __props.contribution_config.period * __props.contribution_config.price
                                          )), 1)
                                        ]),
                                        createVNode("div", { class: "col-6 col-lg-3" }, [
                                          createVNode("span", {
                                            class: "text-secondary d-block",
                                            style: "font-size: 0.8rem;"
                                          }, toDisplayString("Set by")),
                                          createVNode("a", {
                                            href: _ctx.route(
                                              "profile.edit",
                                              __props.contribution_config.financial_id
                                            ),
                                            class: "text-dark text-decoration-none d-flex"
                                          }, [
                                            createTextVNode(toDisplayString(__props.contribution_config.financial.name) + " ", 1),
                                            createVNode("i", {
                                              style: "font-size: 0.8rem;",
                                              class: "bi bi-box-arrow-up-right my-auto ms-2"
                                            })
                                          ], 8, ["href"])
                                        ])
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", { class: "row" }, [
                                    createVNode("div", { class: "col" }, [
                                      createVNode("div", {
                                        class: "d-flex mt-2 pt-1",
                                        style: "font-size: 0.8rem;"
                                      }, [
                                        createVNode("span", { class: "ms-0 my-auto ms-lg-auto me-2 text-secondary" }, toDisplayString(__props.contribution_config.financial_id > 0 ? "Set on " + unref(formatDate)(
                                          __props.contribution_config.updated_at
                                        ) : "Wait for Financial set up"), 1),
                                        unref(auth_user).roles_id == 2 ? (openBlock(), createBlock("button", {
                                          key: 0,
                                          class: "btn btn-sm btn-outline-secondary ms-auto ms-lg-0 py-0 d-flex border-0",
                                          onClick: ($event) => showContributionSettingsModal()
                                        }, [
                                          createVNode("i", {
                                            class: "bi bi-gear my-auto",
                                            style: "font-size:0.8rem;"
                                          })
                                        ], 8, ["onClick"])) : createCommentVNode("", true)
                                      ])
                                    ])
                                  ])
                                ])) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }),
                            createVNode(Transition, { name: "fade-slide-rtl" }, {
                              default: withCtx(() => {
                                var _a3, _b3, _c3;
                                return [
                                  active_tab.value == 2 || isLargeScreen.value ? (openBlock(), createBlock("div", { key: 0 }, [
                                    createVNode("div", { class: "row gx-2" }, [
                                      createVNode("div", { class: "col-2 d-none d-lg-block" }, [
                                        createVNode("div", { class: "d-flex h-100" }, [
                                          createVNode("span", { class: "text-primary mt-2" }, toDisplayString("Payroll"))
                                        ])
                                      ]),
                                      createVNode("div", { class: "col-12 col-lg-10" }, [
                                        createVNode("div", { class: "row g-2" }, [
                                          createVNode("div", { class: "col-12 col-lg-3" }, [
                                            createVNode("div", { class: "row g-2" }, [
                                              createVNode("div", { class: "col-6 col-lg-12" }, [
                                                createVNode("span", {
                                                  class: "text-secondary d-block",
                                                  style: "font-size: 0.8rem;"
                                                }, toDisplayString("Budget")),
                                                createVNode("span", { class: "text-dark" }, toDisplayString(unref(formatIDR)(
                                                  __props.payroll_balance.balance
                                                )), 1)
                                              ]),
                                              createVNode("div", { class: "col-6 col-lg-12" }, [
                                                createVNode("span", {
                                                  class: "text-secondary d-block",
                                                  style: "font-size: 0.8rem;"
                                                }, toDisplayString("Set by")),
                                                __props.payroll_balance.financial_id > 0 ? (openBlock(), createBlock("a", {
                                                  key: 0,
                                                  href: _ctx.route(
                                                    "profile.edit",
                                                    (_a3 = __props.payroll_balance) == null ? void 0 : _a3.financial_id
                                                  ),
                                                  class: "text-dark text-decoration-none d-flex"
                                                }, [
                                                  createTextVNode(toDisplayString(((_c3 = (_b3 = __props.payroll_balance) == null ? void 0 : _b3.financial) == null ? void 0 : _c3.name) ?? "-") + " ", 1),
                                                  createVNode("i", {
                                                    style: "font-size: 0.8rem;",
                                                    class: "bi bi-box-arrow-up-right my-auto ms-2"
                                                  })
                                                ], 8, ["href"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(" - ")))
                                              ])
                                            ])
                                          ]),
                                          createVNode("div", { class: "col-12 col-lg-9" }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(__props.payroll_detail, (item) => {
                                              return openBlock(), createBlock("div", { class: "d-block mb-2" }, [
                                                createVNode("span", {
                                                  class: "text-secondary d-block",
                                                  style: "font-size: 0.8rem;"
                                                }, toDisplayString("Level " + item.level), 1),
                                                createVNode("div", { class: "row gx-2" }, [
                                                  createVNode("div", { class: "col-4" }, toDisplayString(item.salary + " percent"), 1),
                                                  createVNode("div", { class: "col-4" }, toDisplayString(item.employee + (item.employee > 1 ? " persons" : " person")), 1),
                                                  createVNode("div", { class: "col-4 scroll-x-hidden" }, [
                                                    createVNode("span", { class: "text-nowrap" }, toDisplayString(unref(formatIDR)(
                                                      item.salary_idr
                                                    ) + " /person"), 1)
                                                  ])
                                                ])
                                              ]);
                                            }), 256))
                                          ])
                                        ])
                                      ])
                                    ]),
                                    createVNode("div", { class: "row" }, [
                                      createVNode("div", { class: "col" }, [
                                        createVNode("div", {
                                          class: "d-flex mt-2 pt-1",
                                          style: "font-size: 0.8rem;"
                                        }, [
                                          createVNode("span", { class: "ms-0 my-auto ms-lg-auto me-lg-2 text-secondary" }, toDisplayString(__props.payroll_balance.financial_id > 0 ? "Set on " + unref(formatDate)(
                                            __props.payroll_balance.updated_at
                                          ) : "Wait for Financial set up"), 1),
                                          unref(auth_user).roles_id == 2 ? (openBlock(), createBlock("button", {
                                            key: 0,
                                            class: "ms-auto ms-lg-0 btn btn-sm btn-outline-secondary py-0 d-flex border-0",
                                            onClick: ($event) => showPayrollSettingsModal()
                                          }, [
                                            createVNode("i", {
                                              class: "bi bi-gear my-auto",
                                              style: "font-size:0.8rem;"
                                            })
                                          ], 8, ["onClick"])) : createCommentVNode("", true)
                                        ])
                                      ])
                                    ])
                                  ])) : createCommentVNode("", true)
                                ];
                              }),
                              _: 1
                            })
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "card border-top border-0 border-primary rounded-top-0" }, [
                        createVNode("div", { class: "row g-2 mt-2" }, [
                          createVNode("div", { class: "col-12 col-lg-3" }, [
                            createVNode("span", {
                              class: "text-secondary d-block",
                              style: "font-size: 0.8rem;"
                            }, toDisplayString("Staff")),
                            createVNode("a", {
                              href: ((_y = selected_contribution.value) == null ? void 0 : _y.id) > 0 ? _ctx.route(
                                "profile.edit",
                                (_z = selected_contribution.value) == null ? void 0 : _z.id
                              ) : "",
                              class: "text-dark text-decoration-none d-flex scroll-x-hidden"
                            }, [
                              createVNode("span", { class: "text-nowrap" }, toDisplayString(((_A = selected_contribution.value) == null ? void 0 : _A.id) > 0 ? selected_contribution.value.name : " - "), 1),
                              ((_B = selected_contribution.value) == null ? void 0 : _B.id) > 0 ? (openBlock(), createBlock("i", {
                                key: 0,
                                style: "font-size: 0.8rem;",
                                class: "bi bi-box-arrow-up-right my-auto ms-2"
                              })) : createCommentVNode("", true)
                            ], 8, ["href"])
                          ]),
                          createVNode("div", { class: "col-12 col-lg-9" }, [
                            createVNode("div", { class: "row gx-4" }, [
                              createVNode(Transition, { name: "fade-slide-ltr" }, {
                                default: withCtx(() => {
                                  var _a3, _b3, _c3, _d2, _e2, _f2, _g2, _h2, _i2;
                                  return [
                                    active_tab.value == 1 || isLargeScreen.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "col-12 col-lg-6"
                                    }, [
                                      createVNode("div", { class: "row g-2" }, [
                                        createVNode("div", { class: "col-12 d-lg-block d-none" }, [
                                          createVNode("div", { class: "d-flex bg-light p-3" }, [
                                            createVNode("span", { class: "text-primary-emphasis h6 mb-0 text-center" }, toDisplayString("Contribution"))
                                          ])
                                        ]),
                                        createVNode("div", { class: "col-12" }, [
                                          createVNode("span", {
                                            style: "font-size:0.8rem;",
                                            class: "text-secondary d-block"
                                          }, toDisplayString("Progress ")),
                                          (openBlock(true), createBlock(Fragment, null, renderList(__props.contribution_config.period, (month) => {
                                            var _a4, _b4, _c4, _d3, _e3, _f3, _g3, _h3;
                                            return openBlock(), createBlock("div", {
                                              class: "btn shadow-sm px-1 py-0 me-2 " + (month + ((_a4 = __props.contribution_config) == null ? void 0 : _a4.start) - 1 <= thisMonth.value && month > (((_b4 = selected_contribution.value) == null ? void 0 : _b4.contribution) ? (_d3 = (_c4 = selected_contribution.value) == null ? void 0 : _c4.contribution) == null ? void 0 : _d3.months : 0) ? "bg-danger bg-opacity-25" : "") + (month <= ((_f3 = (_e3 = selected_contribution.value) == null ? void 0 : _e3.contribution) == null ? void 0 : _f3.months) ? "bg-primary bg-opacity-25" : "bg-secondary bg-opacity-25 border-dark-subtle border-1")
                                            }, [
                                              createVNode("span", {
                                                style: "font-size: 0.7rem;",
                                                class: "position-relative " + (month <= ((_h3 = (_g3 = selected_contribution.value) == null ? void 0 : _g3.contribution) == null ? void 0 : _h3.months) ? "text-primary" : "text-secondary")
                                              }, toDisplayString(unref(getMonthName)(
                                                month + __props.contribution_config.start - 1,
                                                "short"
                                              )), 3)
                                            ], 2);
                                          }), 256))
                                        ]),
                                        createVNode("div", { class: "col-12" }, [
                                          createVNode("span", {
                                            style: "font-size:0.8rem;",
                                            class: "text-secondary d-block mt-2"
                                          }, toDisplayString("Status ")),
                                          selected_contribution_id.value > 0 ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "text-dark d-block"
                                          }, toDisplayString(__props.contribution_config.start + (((_a3 = selected_contribution.value) == null ? void 0 : _a3.contribution) ? selected_contribution.value.contribution.months - 1 : 0) <= thisMonth.value ? "Late for " + (thisMonth.value - ((_b3 = __props.contribution_config) == null ? void 0 : _b3.start) - (((_c3 = selected_contribution.value) == null ? void 0 : _c3.contribution) ? ((_e2 = (_d2 = selected_contribution.value) == null ? void 0 : _d2.contribution) == null ? void 0 : _e2.months) - 1 : -1) + (thisMonth.value - ((_f2 = __props.contribution_config) == null ? void 0 : _f2.start) - (((_g2 = selected_contribution.value) == null ? void 0 : _g2.contribution) ? ((_i2 = (_h2 = selected_contribution.value) == null ? void 0 : _h2.contribution) == null ? void 0 : _i2.months) - 1 : -1) > 1 ? " months" : " month")) : "On track."), 1)) : createCommentVNode("", true),
                                          selected_contribution_id.value <= 0 ? (openBlock(), createBlock("span", {
                                            key: 1,
                                            class: "d-block text-dark fst-italic"
                                          }, toDisplayString("based on this month (" + unref(getMonthName)(
                                            thisMonth.value
                                          ) + ")"), 1)) : createCommentVNode("", true)
                                        ]),
                                        createVNode("div", { class: "col-12" }, [
                                          createVNode("span", {
                                            style: "font-size:0.8rem;",
                                            class: "text-secondary d-block mt-2"
                                          }, toDisplayString("Receipt ")),
                                          createVNode(Transition, {
                                            name: "fade",
                                            mode: "out-in"
                                          }, {
                                            default: withCtx(() => {
                                              var _a4, _b4, _c4, _d3;
                                              return [
                                                createVNode("div", { class: "" }, [
                                                  ((_b4 = (_a4 = selected_contribution.value) == null ? void 0 : _a4.contribution) == null ? void 0 : _b4.receipt) ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList((_d3 = (_c4 = selected_contribution.value) == null ? void 0 : _c4.contribution) == null ? void 0 : _d3.receipt, (receipt) => {
                                                    var _a5, _b5, _c5;
                                                    return openBlock(), createBlock("button", {
                                                      class: "border-1 border-primary-subtle btn btn-sm btn-outline-primary me-2 py-0 position-relative " + (receipt.id == ((_a5 = selected_receipt.value) == null ? void 0 : _a5.id) ? "active" : ""),
                                                      key: receipt.id,
                                                      onClick: ($event) => setSelectedReceipt(
                                                        receipt.id
                                                      )
                                                    }, [
                                                      createTextVNode(toDisplayString(((_c5 = (_b5 = selected_contribution.value) == null ? void 0 : _b5.contribution) == null ? void 0 : _c5.receipt.indexOf(
                                                        receipt
                                                      )) + 1) + " ", 1),
                                                      createVNode("i", { class: "bi bi-receipt ms-0" }),
                                                      receipt.financial_id == null ? (openBlock(), createBlock("i", {
                                                        key: 0,
                                                        class: "bi bi-circle-fill position-absolute top-0 start-100 translate-middle text-danger",
                                                        style: "font-size: 0.5rem;"
                                                      })) : createCommentVNode("", true)
                                                    ], 10, ["onClick"]);
                                                  }), 128)) : (openBlock(), createBlock("span", {
                                                    key: 1,
                                                    class: "text-secondary"
                                                  }, toDisplayString(" - ")))
                                                ])
                                              ];
                                            }),
                                            _: 1
                                          })
                                        ]),
                                        createVNode(Transition, { name: "fade" }, {
                                          default: withCtx(() => [
                                            selected_receipt_id.value ? (openBlock(), createBlock("div", {
                                              key: 0,
                                              class: "col-12"
                                            }, [
                                              createVNode("div", { class: "card mt-2 bg-light" }, [
                                                createVNode("div", { class: "row mt-2" }, [
                                                  createVNode("div", { class: "col-12 d-flex" }, [
                                                    createVNode("a", {
                                                      href: "/storage/images/receipt/contribution/" + selected_receipt.value.receipt,
                                                      class: "btn btn-sm btn-light border-0 mx-auto",
                                                      download: ""
                                                    }, [
                                                      createTextVNode(toDisplayString(selected_receipt.value.receipt) + " ", 1),
                                                      createVNode("i", {
                                                        style: "font-size: 0.8rem;",
                                                        class: "bi bi-download text-primary ms-2 my-auto"
                                                      })
                                                    ], 8, ["href"]),
                                                    createVNode("button", {
                                                      class: "btn btn-sm btn-light me-2",
                                                      onClick: ($event) => setSelectedReceipt(
                                                        null
                                                      )
                                                    }, [
                                                      createVNode("i", { class: "bi bi-x-lg" })
                                                    ], 8, ["onClick"])
                                                  ]),
                                                  createVNode("div", { class: "col-12" }, [
                                                    createVNode("div", { class: "card border-1 m-2" }, [
                                                      createVNode(Transition, {
                                                        name: "fade",
                                                        mode: "out-in"
                                                      }, {
                                                        default: withCtx(() => [
                                                          (openBlock(), createBlock("img", {
                                                            key: selected_receipt.value,
                                                            src: "/storage/images/receipt/contribution/" + selected_receipt.value.receipt,
                                                            class: "w-100 rounded",
                                                            alt: "image"
                                                          }, null, 8, ["src"]))
                                                        ]),
                                                        _: 1
                                                      })
                                                    ]),
                                                    unref(auth_user).roles_id == 2 ? (openBlock(), createBlock("div", {
                                                      key: 0,
                                                      class: "d-flex mb-1"
                                                    }, [
                                                      createVNode(Transition, {
                                                        name: "fade",
                                                        mode: "out-in"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode("button", {
                                                            onClick: ($event) => confirmation(
                                                              _ctx.route(
                                                                "contribution.validation",
                                                                selected_receipt.value.id
                                                              ),
                                                              "Confirm to " + (selected_receipt.value.financial_id ? "unvalidate" : "validate") + " " + selected_receipt.value.receipt + "?"
                                                            ),
                                                            class: "mx-2 w-100 btn btn-sm btn-" + (selected_receipt.value.financial_id ? "secondary" : "success"),
                                                            style: "font-size: 0.8rem;"
                                                          }, toDisplayString(selected_receipt.value.financial_id ? "Unvalid for " + selected_receipt.value.months + (selected_receipt.value.months > 1 ? " months" : " month") : "Valid for " + selected_receipt.value.months + (selected_receipt.value.months > 1 ? " months" : " month")), 11, ["onClick"])
                                                        ]),
                                                        _: 1
                                                      })
                                                    ])) : createCommentVNode("", true),
                                                    unref(auth_user).roles_id !== 2 ? (openBlock(), createBlock("div", {
                                                      key: 1,
                                                      class: "d-flex text-center w-100 px-2 mb-1"
                                                    }, [
                                                      createVNode(Transition, {
                                                        name: "fade",
                                                        mode: "out-in"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode("span", {
                                                            class: "fw-light text-secondary",
                                                            style: "font-size: 0.8rem;"
                                                          }, [
                                                            createTextVNode(toDisplayString(selected_receipt.value.financial_id ? "Valid for " + selected_receipt.value.months + (selected_receipt.value.months > 1 ? " months" : " month") + " by " : "Unvalid for " + selected_receipt.value.months + (selected_receipt.value.months > 1 ? " months" : " month")) + " ", 1),
                                                            selected_receipt.value.financial_id ? (openBlock(), createBlock("span", {
                                                              key: 0,
                                                              class: "scroll-x-hidden"
                                                            }, [
                                                              createVNode("span", { class: "text-nowrap" }, toDisplayString(selected_receipt.value.financial.name), 1)
                                                            ])) : createCommentVNode("", true)
                                                          ])
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode(Transition, {
                                                        name: "fade",
                                                        mode: "out-in"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode("span", {
                                                            class: "fw-light text-secondary ms-auto",
                                                            style: "font-size: 0.8rem;"
                                                          }, toDisplayString(selected_receipt.value.financial_id ? unref(formatDate)(
                                                            selected_receipt.value.updated_at
                                                          ) : ""), 1)
                                                        ]),
                                                        _: 1
                                                      })
                                                    ])) : createCommentVNode("", true)
                                                  ])
                                                ])
                                              ])
                                            ])) : createCommentVNode("", true)
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ])) : createCommentVNode("", true)
                                  ];
                                }),
                                _: 1
                              }),
                              createVNode(Transition, { name: "fade-slide-rtl" }, {
                                default: withCtx(() => {
                                  var _a3, _b3, _c3, _d2;
                                  return [
                                    active_tab.value == 2 || isLargeScreen.value ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "col-12 col-lg-6"
                                    }, [
                                      createVNode("div", { class: "row g-2" }, [
                                        createVNode("div", { class: "col-12 d-lg-block d-none" }, [
                                          createVNode("div", { class: "d-flex bg-light p-3" }, [
                                            createVNode("span", { class: "text-primary-emphasis h6 mb-0 text-center" }, toDisplayString("Payroll"))
                                          ])
                                        ]),
                                        createVNode("div", { class: "col-12" }, [
                                          createVNode("span", {
                                            class: "text-secondary d-block",
                                            style: { "font-size": "0.8rem" }
                                          }, toDisplayString("Level")),
                                          unref(auth_user).roles_id !== 2 || !(((_a3 = selected_contribution.value) == null ? void 0 : _a3.id) > 0) ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "mt-1"
                                          }, toDisplayString(((_b3 = selected_contribution.value) == null ? void 0 : _b3.level) ?? " - "), 1)) : createCommentVNode("", true),
                                          unref(auth_user).roles_id == 2 && ((_c3 = selected_contribution.value) == null ? void 0 : _c3.id) > 0 ? (openBlock(), createBlock("div", {
                                            key: 1,
                                            class: "input-group input-group-sm bg-light border rounded-2 mt-1"
                                          }, [
                                            withDirectives(createVNode("select", {
                                              "onUpdate:modelValue": ($event) => unref(form_update_payroll_single).level = $event,
                                              class: "form-select border-0"
                                            }, [
                                              createVNode("option", { value: "0" }, toDisplayString("Unset")),
                                              (openBlock(true), createBlock(Fragment, null, renderList(__props.payroll_detail, (i) => {
                                                return openBlock(), createBlock("option", {
                                                  value: i.level
                                                }, toDisplayString("Level " + i.level), 9, ["value"]);
                                              }), 256))
                                            ], 8, ["onUpdate:modelValue"]), [
                                              [
                                                vModelSelect,
                                                unref(form_update_payroll_single).level
                                              ]
                                            ]),
                                            createVNode("button", {
                                              onClick: handleUpdatePayrollSingle,
                                              class: "btn btn-sm btn-outline-primary border-0 py-0"
                                            }, [
                                              createVNode("i", { class: "bi bi-check-lg" })
                                            ], 8, ["onClick"])
                                          ])) : createCommentVNode("", true)
                                        ]),
                                        createVNode("div", { class: "col-12" }, [
                                          createVNode("span", {
                                            class: "text-secondary d-block",
                                            style: { "font-size": "0.8rem" }
                                          }, toDisplayString("Salary (Rp)")),
                                          createVNode("span", null, toDisplayString(unref(formatIDR)(
                                            ((_d2 = __props.payroll_detail.find(
                                              (item) => {
                                                var _a4;
                                                return item.level == ((_a4 = selected_contribution.value) == null ? void 0 : _a4.level);
                                              }
                                            )) == null ? void 0 : _d2.salary_idr) ?? 0
                                          )), 1)
                                        ]),
                                        unref(auth_user).roles_id == 2 ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "col-12"
                                        }, [
                                          createVNode("div", { class: "rounded-2 border" }, [
                                            createVNode("button", {
                                              onClick: () => {
                                                is_batch.value = !is_batch.value;
                                              },
                                              "data-bs-toggle": "collapse",
                                              "data-bs-target": "#batchLevelAssignmentDiv",
                                              class: "btn btn-sm text-primary border-0 w-100 py-2 d-flex"
                                            }, [
                                              createTextVNode(toDisplayString("Batch Level Assignment") + " "),
                                              createVNode("i", { class: "bi bi-chevron-down ms-auto" })
                                            ], 8, ["onClick"]),
                                            createVNode("div", {
                                              class: "collapse p-3",
                                              id: "batchLevelAssignmentDiv"
                                            }, [
                                              createVNode("span", {
                                                class: "text-secondary d-block",
                                                style: { "font-size": "0.8rem" }
                                              }, toDisplayString("Selected staff")),
                                              createVNode("span", { class: "mb-3 d-block" }, toDisplayString(unref(form_update_payroll_batch).staff_id_list.length + (unref(form_update_payroll_batch).staff_id_list.length > 1 ? " persons" : " person")), 1),
                                              createVNode(_sfc_main$3, {
                                                message: unref(form_update_payroll_batch).errors.staff_id_list
                                              }, null, 8, ["message"]),
                                              createVNode("span", {
                                                class: "text-secondary d-block",
                                                style: { "font-size": "0.8rem" }
                                              }, toDisplayString("Update to")),
                                              createVNode("div", { class: "input-group input-group-sm bg-light border border-1 border-secondary-subtle rounded-2" }, [
                                                createVNode("span", {
                                                  class: "form-label px-2 py-0 my-auto text-secondary",
                                                  for: "batch_level"
                                                }, toDisplayString("Level")),
                                                withDirectives(createVNode("select", {
                                                  id: "batch_level",
                                                  "onUpdate:modelValue": ($event) => unref(form_update_payroll_batch).level = $event,
                                                  class: "form-select border-0"
                                                }, [
                                                  createVNode("option", { value: "" }, toDisplayString("Unset")),
                                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.payroll_detail, (i) => {
                                                    return openBlock(), createBlock("option", {
                                                      value: i.level
                                                    }, toDisplayString("Level " + i.level), 9, ["value"]);
                                                  }), 256))
                                                ], 8, ["onUpdate:modelValue"]), [
                                                  [
                                                    vModelSelect,
                                                    unref(form_update_payroll_batch).level
                                                  ]
                                                ])
                                              ]),
                                              createVNode(_sfc_main$3, {
                                                message: unref(form_update_payroll_batch).errors.level
                                              }, null, 8, ["message"]),
                                              createVNode("button", {
                                                onClick: handleUpdatePayrollBatch,
                                                class: "btn btn-sm btn-primary border-0 py-1 mt-3 w-100"
                                              }, toDisplayString("Update Level"), 8, ["onClick"])
                                            ])
                                          ])
                                        ])) : createCommentVNode("", true)
                                      ])
                                    ])) : createCommentVNode("", true)
                                  ];
                                }),
                                _: 1
                              })
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "row gx-4 mt-4" }, [
                  createVNode("div", { class: "col-12 col-lg-6" }, [
                    createVNode(Transition, {
                      name: "fade",
                      mode: "out-in"
                    }, {
                      default: withCtx(() => [
                        selected_receipt_id.value == null ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "card sm p-3"
                        }, [
                          createVNode("div", { class: "row" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("div", { class: "d-flex border-primary border-bottom pb-2" }, [
                                createVNode("span", { class: "text-primary-emphasis me-auto my-auto h6" }, [
                                  createVNode("i", { class: "bi bi-people me-1" }),
                                  createTextVNode(" " + toDisplayString("Staff List"))
                                ])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "d-flex mt-2" }, [
                            unref(form_update_payroll_batch).staff_id_list.length > 0 ? (openBlock(), createBlock("button", {
                              key: 0,
                              class: "btn btn-sm btn-outline-primary border me-2 text-nowrap",
                              onClick: () => {
                                unref(form_update_payroll_batch).staff_id_list = [];
                              }
                            }, toDisplayString("Unselect all"), 8, ["onClick"])) : createCommentVNode("", true),
                            createVNode("div", { class: "input-group" }, [
                              withDirectives(createVNode("input", {
                                type: "text",
                                class: "form-control form-control-sm py-0",
                                placeholder: "Search",
                                "aria-label": "Search",
                                "aria-describedby": "basic-addon1",
                                "onUpdate:modelValue": ($event) => unref(form_contribution_filter).keyword = $event,
                                onInput: handleContributionFilter
                              }, null, 40, ["onUpdate:modelValue"]), [
                                [
                                  vModelText,
                                  unref(form_contribution_filter).keyword
                                ]
                              ]),
                              createVNode("span", {
                                class: "input-group-text py-0",
                                id: "basic-addon1"
                              }, [
                                createVNode("i", {
                                  class: "bi bi-search",
                                  style: "font-size: 0.9rem"
                                })
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "scroll-container-2 scroll-container-lg-2" }, [
                            createVNode("li", { class: "list-group list-group-flush" }, [
                              __props.contribution_users.length == 0 ? (openBlock(), createBlock("ul", {
                                key: 0,
                                class: "list-group-item list-group-item-action"
                              }, [
                                createVNode("span", { class: "fst-italic text-secondary" }, toDisplayString("No employee found."))
                              ])) : createCommentVNode("", true),
                              __props.contribution_users.length > 0 ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.contribution_users, (contribution) => {
                                var _a3;
                                return openBlock(), createBlock("ul", {
                                  class: "list-group-item list-group-item-action mb-0 py-1 px-0 " + (contribution.id == selected_contribution_id.value ? "bg-light" : ""),
                                  onClick: () => {
                                    setSelectedContribution(
                                      contribution.id
                                    );
                                    unref(form_update_payroll_single).level = contribution.level;
                                    unref(form_update_payroll_single).user_id = contribution.id;
                                  }
                                }, [
                                  createVNode("div", { class: "mx-2 d-flex" }, [
                                    is_batch.value ? withDirectives((openBlock(), createBlock("input", {
                                      key: 0,
                                      type: "checkbox",
                                      class: "form-check-input me-2",
                                      "onUpdate:modelValue": ($event) => unref(form_update_payroll_batch).staff_id_list = $event,
                                      value: contribution.id,
                                      onClick: withModifiers(() => {
                                      }, ["stop"])
                                    }, null, 8, ["onUpdate:modelValue", "value", "onClick"])), [
                                      [
                                        vModelCheckbox,
                                        unref(form_update_payroll_batch).staff_id_list
                                      ]
                                    ]) : createCommentVNode("", true),
                                    createVNode("span", {
                                      class: "me-auto " + (contribution.id == selected_contribution_id.value ? "" : "text-secondary")
                                    }, toDisplayString(contribution.name), 3),
                                    !is_batch.value ? (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "d-flex"
                                    }, [
                                      ((_a3 = contribution.contribution) == null ? void 0 : _a3.months) + __props.contribution_config.start - 1 <= unref(getMonth)(unref(date)) + 1 || !contribution.contribution ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "text-danger ms-auto border-danger-subtle border px-2 rounded-2 text-nowrap d-flex",
                                        style: { "font-size": "0.8rem" }
                                      }, [
                                        createVNode("span", { class: "my-auto" }, toDisplayString("Late")),
                                        createVNode("i", { class: "bi bi-exclamation my-auto" })
                                      ])) : createCommentVNode("", true)
                                    ])) : createCommentVNode("", true),
                                    is_batch.value ? (openBlock(), createBlock("span", {
                                      key: 2,
                                      class: "text-secondary ms-2"
                                    }, toDisplayString((contribution == null ? void 0 : contribution.level) ? "Level " + contribution.level : "Unset"), 1)) : createCommentVNode("", true)
                                  ])
                                ], 10, ["onClick"]);
                              }), 256)) : createCommentVNode("", true)
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(auth_user).roles_id == 2) {
        _push(`<div class="modal fade" id="modalSettingContribution" tabindex="-1" aria-labelledby="modalSettingContribution"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3 text-dark"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-gear border-secondary border-end me-2 pe-2"></i> ${ssrInterpolate("Contribution Settings")}</span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button></div><form><div class="modal-body bg-light pt-1"><div class="row pt-0"><div class="col-12"><div class="d-flex"><i class="bi bi-exclamation-triangle text-danger me-2 ms-auto my-auto pb-2 fs-4"></i><span style="${ssrRenderStyle("font-size:0.8rem;")}" class="me-auto text-danger w-50 mb-1">${ssrInterpolate("Changing charge price may result in all receipts having to be ")} <span class="text-decoration-underline">${ssrInterpolate("revalidated")}</span> ${ssrInterpolate(".")}</span></div></div></div><div class="row justify-content-center mb-2"><div class="col-4 col-lg-3"><label for="contribution_setting_price" class="form-label d-inline-block">${ssrInterpolate("Charge")}</label></div><div class="col-8 col-lg-7"><input type="number" class="form-control form-control-sm" id="contribution_setting_price"${ssrRenderAttr("value", unref(form_contribution_setting).price)} placeholder="Dana Fakultas or etc...">`);
        _push(ssrRenderComponent(_sfc_main$3, {
          messages: unref(form_contribution_setting).errors.price,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row justify-content-center mb-2"><div class="col-4 col-lg-3"><label for="contribution_setting_start" class="form-label d-inline-block">${ssrInterpolate("Start Month")}</label></div><div class="col-8 col-lg-7"><select class="form-control form-control-sm form-select" id="contribution_setting_start"><!--[-->`);
        ssrRenderList(12, (i) => {
          _push(`<option${ssrRenderAttr("value", i)}${ssrIncludeBooleanAttr(Array.isArray(unref(form_contribution_setting).start) ? ssrLooseContain(unref(form_contribution_setting).start, i) : ssrLooseEqual(unref(form_contribution_setting).start, i)) ? " selected" : ""}>${ssrInterpolate(unref(getMonthName)(i))}</option>`);
        });
        _push(`<!--]--></select>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          messages: unref(form_contribution_setting).errors.start,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row justify-content-center"><div class="col-4 col-lg-3"><label for="contribution_setting_end" class="form-label d-inline-block">${ssrInterpolate("End Month")}</label></div><div class="col-8 col-lg-7"><select class="form-control form-control-sm form-select" id="contribution_setting_end"><!--[-->`);
        ssrRenderList(12, (i) => {
          _push(`<option${ssrRenderAttr("value", i)}${ssrIncludeBooleanAttr(Array.isArray(unref(form_contribution_setting).end) ? ssrLooseContain(unref(form_contribution_setting).end, i) : ssrLooseEqual(unref(form_contribution_setting).end, i)) ? " selected" : ""}>${ssrInterpolate(unref(getMonthName)(i))}</option>`);
        });
        _push(`<!--]--></select>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          messages: unref(form_contribution_setting).errors.end,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-primary">${ssrInterpolate("Set")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(auth_user).roles_id == 2) {
        _push(`<div class="modal fade" id="modalSettingPayroll" tabindex="-1" aria-labelledby="modalSettingPayroll"><div class="modal-dialog modal-lg modal-dialog-centered"><div class="modal-content shadow mx-3 text-dark"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-gear border-secondary border-end me-2 pe-2"></i> ${ssrInterpolate("Payroll Settings")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><form><div class="modal-body bg-light pt-3"><div class="row justify-content-center mb-3"><div class="col-12 col-lg-2"><label for="payroll_setting_balance" class="form-label d-inline-block ms-0">${ssrInterpolate("Budget")}</label></div><div class="col-12 col-lg-8"><div class="input-group input-group-sm bg-secondary rounded-2 ps-2"><label for="payroll_setting_balance" class="form-label d-inline-block me-2 my-auto text-white">${ssrInterpolate("Rp")}</label><input type="number" class="form-control form-control-sm" id="payroll_setting_balance"${ssrRenderAttr("value", unref(form_payroll_setting).balance)} placeholder="Dana Fakultas or etc..."></div>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          messages: unref(form_payroll_setting).errors.balance,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row justify-content-center mb-3"><div class="col-12 col-lg-2"><label class="form-label d-inline-block ms-0">${ssrInterpolate("Level")}</label></div><div class="col-12 col-lg-8"><!--[-->`);
        ssrRenderList(unref(form_payroll_setting).level_list, (item, index) => {
          _push(`<div>`);
          if (item.deleted_at == null) {
            _push(`<div class="d-flex mb-2"><div class="me-2"><div class="input-group input-group-sm bg-secondary text-white rounded-2 px-2"><label${ssrRenderAttr(
              "for",
              "payroll_setting_level" + item.id
            )} class="form-label my-auto me-2">${ssrInterpolate("Level")}</label><input type="number" class="form-control form-control-sm"${ssrRenderAttr(
              "id",
              "payroll_setting_level" + item.id
            )}${ssrRenderAttr(
              "value",
              unref(form_payroll_setting).level_list[index].level
            )} placeholder="ex: 1, 2, ..."><input type="number" class="form-control form-control-sm"${ssrRenderAttr(
              "id",
              "payroll_setting_salary" + item.id
            )}${ssrRenderAttr(
              "value",
              unref(form_payroll_setting).level_list[index].salary
            )} placeholder="ex: 20, 50, ..."><span class="form-label ms-2 my-auto">${ssrInterpolate("%")}</span></div><div class="d-flex"><div class="w-100">`);
            _push(ssrRenderComponent(_sfc_main$3, {
              messages: unref(form_payroll_setting).errors.level_list ? unref(form_payroll_setting).errors.level_list[index].level : null,
              class: "mt-2"
            }, null, _parent));
            _push(`</div><div class="w-100">`);
            _push(ssrRenderComponent(_sfc_main$3, {
              messages: unref(form_payroll_setting).errors.level_list ? unref(form_payroll_setting).errors.level_list[index].salary : null,
              class: "mt-2"
            }, null, _parent));
            _push(`</div></div></div><div class="d-flex ms-2 my-auto"><span class="text-nowrap text-primary-emphasis">${ssrInterpolate(unref(formatIDR)(
              item.salary * __props.payroll_balance.balance * 0.01
            ))}</span></div><button type="button" class="btn btn-sm btn-outline-secondary border-0 py-0 ms-2"><i class="bi bi-trash3"></i></button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]-->`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_payroll_setting).errors.level_list
        }, null, _parent));
        _push(`<div class="d-block mt-2">`);
        if (unref(form_payroll_setting).level_list.reduce(
          (sum, item) => sum + item.salary,
          0
        ) > 100) {
          _push(`<span class="d-flex my-auto text-danger" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"><i class="bi bi-exclamation-triangle me-2"></i> ${ssrInterpolate("Warning! Total salary percentage is can`t be bigger than 100.")}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(form_payroll_setting).level_list.reduce(
          (sum, item) => sum + item.salary,
          0
        ) < 100) {
          _push(`<span class="d-flex my-auto text-danger" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"><i class="bi bi-exclamation-triangle me-2"></i> ${ssrInterpolate("Warning! Total salary percentage is less than 100.")}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="d-flex w-100"><button type="button" class="btn btn-sm btn-outline-secondary border-0 py-0 text-nowrap">${ssrInterpolate("Reset")}</button><button type="button" class="btn btn-sm btn-outline-primary border-0 py-0 ms-auto text-nowrap">${ssrInterpolate("New Level")}</button></div></div></div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-primary w-25">${ssrInterpolate("Set")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/FinanceFeature.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
