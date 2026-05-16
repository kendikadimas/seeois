import { ref, computed, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, withDirectives, toDisplayString, Fragment, renderList, vModelSelect, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-CmduQjnL.js";
import { _ as _sfc_main$1 } from "./Notif-DL0SggHu.js";
import { Head, router } from "@inertiajs/vue3";
import { f as formatIDR } from "./utils-DIF4pdrF.js";
import "./ModalConfirmation-CaKJYApU.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
import "date-fns";
const _sfc_main = {
  __name: "ProductionPanel",
  __ssrInlineRender: true,
  props: {
    stands: {
      type: Array,
      default: () => []
    },
    selectedStand: {
      type: Object,
      default: null
    },
    menus: {
      type: Array,
      default: () => []
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
    var _a, _b, _c;
    const props = __props;
    const selectedStandId = ref(((_a = props.selectedStand) == null ? void 0 : _a.id) ?? ((_c = (_b = props.stands) == null ? void 0 : _b[0]) == null ? void 0 : _c.id) ?? null);
    const stockForms = ref({});
    const activeMenuCount = computed(() => props.menus.filter((menu) => menu.is_published).length);
    function filterStand() {
      router.get("/staff/production/panel", { stand_id: selectedStandId.value }, { preserveState: true, replace: true });
    }
    function togglePublish(menu) {
      router.post(`/staff/production/panel/menu/${menu.id}/publish`, {}, { preserveScroll: true });
    }
    function updateStock(menuId) {
      const amount = stockForms.value[`amount_${menuId}`];
      router.post(`/staff/production/panel/menu/${menuId}/stock`, { amount }, { preserveScroll: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Production Panel" }, null, _parent));
      _push(ssrRenderComponent(StaffLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container-fluid py-4"${_scopeId}>`);
            if (__props.notif) {
              _push2(ssrRenderComponent(_sfc_main$1, { notif: __props.notif }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="row g-4"${_scopeId}><div class="col-12"${_scopeId}><div class="card border-0 shadow-sm"${_scopeId}><div class="card-body d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center"${_scopeId}><div${_scopeId}><h4 class="mb-1"${_scopeId}>Production Panel</h4><p class="text-muted mb-0"${_scopeId}>Kelola publish shop dan stock menu sebelum distribusi ke customer.</p></div><div class="d-flex gap-2 align-items-center"${_scopeId}><span class="badge bg-primary"${_scopeId}>Published ${ssrInterpolate(activeMenuCount.value)}</span><select class="form-select" style="${ssrRenderStyle({ "min-width": "220px" })}"${_scopeId}><!--[-->`);
            ssrRenderList(__props.stands, (stand) => {
              _push2(`<option${ssrRenderAttr("value", stand.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedStandId.value) ? ssrLooseContain(selectedStandId.value, stand.id) : ssrLooseEqual(selectedStandId.value, stand.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(stand.name)}</option>`);
            });
            _push2(`<!--]--></select></div></div></div></div><div class="col-12"${_scopeId}><div class="card border-0 shadow-sm"${_scopeId}><div class="card-header bg-transparent border-0 pt-4 pb-0"${_scopeId}><h5 class="mb-0"${_scopeId}>Menu &amp; Stock</h5></div><div class="card-body table-responsive"${_scopeId}><table class="table align-middle"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Menu</th><th${_scopeId}>Stock</th><th${_scopeId}>Biaya Produksi</th><th${_scopeId}>Harga Jual</th><th${_scopeId}>Status</th><th${_scopeId}>Aksi</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.menus, (menu) => {
              _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(menu.name)}</td><td${_scopeId}>${ssrInterpolate(menu.stock)}</td><td${_scopeId}>${ssrInterpolate(menu.cost ? unref(formatIDR)(menu.cost) : "-")}</td><td${_scopeId}>${ssrInterpolate(unref(formatIDR)(menu.price))}</td><td${_scopeId}><span class="${ssrRenderClass([menu.is_published ? "bg-success" : "bg-secondary", "badge"])}"${_scopeId}>${ssrInterpolate(menu.is_published ? "Published" : "Draft")}</span></td><td${_scopeId}><div class="d-flex gap-2 flex-wrap justify-content-end"${_scopeId}><input${ssrRenderAttr("value", stockForms.value[`amount_${menu.id}`])} type="number" class="form-control form-control-sm" style="${ssrRenderStyle({ "width": "110px" })}" placeholder="stock"${_scopeId}><button class="btn btn-outline-primary btn-sm"${_scopeId}>Update</button><button class="btn btn-outline-success btn-sm"${_scopeId}>${ssrInterpolate(menu.is_published ? "Unpublish" : "Publish")}</button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-fluid py-4" }, [
                __props.notif ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 0,
                  notif: __props.notif
                }, null, 8, ["notif"])) : createCommentVNode("", true),
                createVNode("div", { class: "row g-4" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card border-0 shadow-sm" }, [
                      createVNode("div", { class: "card-body d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center" }, [
                        createVNode("div", null, [
                          createVNode("h4", { class: "mb-1" }, "Production Panel"),
                          createVNode("p", { class: "text-muted mb-0" }, "Kelola publish shop dan stock menu sebelum distribusi ke customer.")
                        ]),
                        createVNode("div", { class: "d-flex gap-2 align-items-center" }, [
                          createVNode("span", { class: "badge bg-primary" }, "Published " + toDisplayString(activeMenuCount.value), 1),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => selectedStandId.value = $event,
                            class: "form-select",
                            style: { "min-width": "220px" },
                            onChange: filterStand
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.stands, (stand) => {
                              return openBlock(), createBlock("option", {
                                key: stand.id,
                                value: stand.id
                              }, toDisplayString(stand.name), 9, ["value"]);
                            }), 128))
                          ], 40, ["onUpdate:modelValue"]), [
                            [vModelSelect, selectedStandId.value]
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card border-0 shadow-sm" }, [
                      createVNode("div", { class: "card-header bg-transparent border-0 pt-4 pb-0" }, [
                        createVNode("h5", { class: "mb-0" }, "Menu & Stock")
                      ]),
                      createVNode("div", { class: "card-body table-responsive" }, [
                        createVNode("table", { class: "table align-middle" }, [
                          createVNode("thead", null, [
                            createVNode("tr", null, [
                              createVNode("th", null, "Menu"),
                              createVNode("th", null, "Stock"),
                              createVNode("th", null, "Biaya Produksi"),
                              createVNode("th", null, "Harga Jual"),
                              createVNode("th", null, "Status"),
                              createVNode("th", null, "Aksi")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.menus, (menu) => {
                              return openBlock(), createBlock("tr", {
                                key: menu.id
                              }, [
                                createVNode("td", null, toDisplayString(menu.name), 1),
                                createVNode("td", null, toDisplayString(menu.stock), 1),
                                createVNode("td", null, toDisplayString(menu.cost ? unref(formatIDR)(menu.cost) : "-"), 1),
                                createVNode("td", null, toDisplayString(unref(formatIDR)(menu.price)), 1),
                                createVNode("td", null, [
                                  createVNode("span", {
                                    class: ["badge", menu.is_published ? "bg-success" : "bg-secondary"]
                                  }, toDisplayString(menu.is_published ? "Published" : "Draft"), 3)
                                ]),
                                createVNode("td", null, [
                                  createVNode("div", { class: "d-flex gap-2 flex-wrap justify-content-end" }, [
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => stockForms.value[`amount_${menu.id}`] = $event,
                                      type: "number",
                                      class: "form-control form-control-sm",
                                      style: { "width": "110px" },
                                      placeholder: "stock"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, stockForms.value[`amount_${menu.id}`]]
                                    ]),
                                    createVNode("button", {
                                      class: "btn btn-outline-primary btn-sm",
                                      onClick: ($event) => updateStock(menu.id)
                                    }, "Update", 8, ["onClick"]),
                                    createVNode("button", {
                                      class: "btn btn-outline-success btn-sm",
                                      onClick: ($event) => togglePublish(menu)
                                    }, toDisplayString(menu.is_published ? "Unpublish" : "Publish"), 9, ["onClick"])
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Business/ProductionPanel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ProductionPanel-BEDkItnx.js.map
