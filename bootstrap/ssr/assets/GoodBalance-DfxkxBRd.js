import { unref, withCtx, openBlock, createBlock, createCommentVNode, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-oB6sdmCc.js";
import { _ as _sfc_main$2 } from "./BusinessBalance-Cfi8ddRz.js";
import { _ as _sfc_main$1 } from "./Notif-Zffab37M.js";
import { Head } from "@inertiajs/vue3";
import "./ModalConfirmation-CzGDjmDO.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
const _sfc_main = {
  __name: "GoodBalance",
  __ssrInlineRender: true,
  props: { balance: Object, total_income: Number, total_expense: Number, income: Array, expense: Array, default_tab: [Number, String], filter: Object, notif: Object },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Saldo Goods" }, null, _parent));
      _push(ssrRenderComponent(StaffLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Saldo Goods`);
          } else {
            return [
              createTextVNode("Saldo Goods")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.notif) {
              _push2(ssrRenderComponent(_sfc_main$1, { notif: __props.notif }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              title: "Saldo Merchandise",
              subtitle: "Pantau arus kas penjualan produk dan setoran ke kas utama.",
              balance: __props.balance,
              "total-income": __props.total_income,
              "total-expense": __props.total_expense,
              income: __props.income,
              expense: __props.expense,
              "default-tab": __props.default_tab,
              filter: __props.filter,
              "income-filter-route": _ctx.route("good.balance.filter.cash_in"),
              "expense-filter-route": _ctx.route("good.balance.filter.cash_out"),
              "withdraw-route": _ctx.route("good.balance.withdraw")
            }, null, _parent2, _scopeId));
          } else {
            return [
              __props.notif ? (openBlock(), createBlock(_sfc_main$1, {
                key: 0,
                notif: __props.notif
              }, null, 8, ["notif"])) : createCommentVNode("", true),
              createVNode(_sfc_main$2, {
                title: "Saldo Merchandise",
                subtitle: "Pantau arus kas penjualan produk dan setoran ke kas utama.",
                balance: __props.balance,
                "total-income": __props.total_income,
                "total-expense": __props.total_expense,
                income: __props.income,
                expense: __props.expense,
                "default-tab": __props.default_tab,
                filter: __props.filter,
                "income-filter-route": _ctx.route("good.balance.filter.cash_in"),
                "expense-filter-route": _ctx.route("good.balance.filter.cash_out"),
                "withdraw-route": _ctx.route("good.balance.withdraw")
              }, null, 8, ["balance", "total-income", "total-expense", "income", "expense", "default-tab", "filter", "income-filter-route", "expense-filter-route", "withdraw-route"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Business/GoodBalance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=GoodBalance-DfxkxBRd.js.map
