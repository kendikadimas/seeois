import { ref, computed, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, withDirectives, Fragment, renderList, vModelSelect, withModifiers, vModelText, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-BSa5kc_g.js";
import { _ as _sfc_main$1 } from "./Notif-DL0SggHu.js";
import { useForm, Head, router } from "@inertiajs/vue3";
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
    foodTags: {
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
    const route = (name, params = {}) => window.route(name, params);
    const props = __props;
    const selectedStandId = ref(((_a = props.selectedStand) == null ? void 0 : _a.id) ?? ((_c = (_b = props.stands) == null ? void 0 : _b[0]) == null ? void 0 : _c.id) ?? null);
    const stockForms = ref({});
    const menuForm = useForm({
      stand_id: selectedStandId.value,
      name: "",
      category: "",
      food_tag: [],
      price: 0,
      stock: 0
    });
    const activeMenuCount = computed(() => props.menus.filter((menu) => menu.is_published).length);
    function filterStand() {
      router.get(route("staff.production.panel.index"), { stand_id: selectedStandId.value }, { preserveState: true, replace: true });
    }
    function submitMenu() {
      menuForm.stand_id = selectedStandId.value;
      menuForm.post(route("staff.sales-distribution.menu.store"), {
        preserveScroll: true,
        onSuccess: () => menuForm.reset("name", "category", "food_tag", "price", "stock")
      });
    }
    function togglePublish(menu) {
      router.post(route("staff.production.panel.publish", { menu: menu.id }), {}, { preserveScroll: true });
    }
    function updateStock(menuId) {
      const amount = stockForms.value[`amount_${menuId}`];
      const request_id = crypto.randomUUID();
      router.post(route("staff.production.panel.stock.update", { menu: menuId }), {
        amount,
        request_id,
        reason: stockForms.value[`reason_${menuId}`] || "production",
        notes: stockForms.value[`notes_${menuId}`] || null
      }, { preserveScroll: true });
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
            if (!__props.stands.length) {
              _push2(`<div class="alert alert-warning"${_scopeId}> Anda belum ditugaskan ke stand aktif. Hubungi Operational Officer untuk menambahkan assignment Production. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="row g-4"${_scopeId}><div class="col-12"${_scopeId}><div class="card border-0 shadow-sm"${_scopeId}><div class="card-body d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center"${_scopeId}><div${_scopeId}><h4 class="mb-1"${_scopeId}>Production Panel</h4><p class="text-muted mb-0"${_scopeId}>Kelola publish shop dan stock menu sebelum distribusi ke customer.</p></div><div class="d-flex gap-2 align-items-center"${_scopeId}><span class="badge bg-primary"${_scopeId}>Published ${ssrInterpolate(activeMenuCount.value)}</span><select class="form-select" style="${ssrRenderStyle({ "min-width": "220px" })}"${_scopeId}><!--[-->`);
            ssrRenderList(__props.stands, (stand) => {
              _push2(`<option${ssrRenderAttr("value", stand.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedStandId.value) ? ssrLooseContain(selectedStandId.value, stand.id) : ssrLooseEqual(selectedStandId.value, stand.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(stand.name)}</option>`);
            });
            _push2(`<!--]--></select></div></div></div></div>`);
            if (selectedStandId.value) {
              _push2(`<div class="col-12"${_scopeId}><div class="card border-0 shadow-sm"${_scopeId}><div class="card-header bg-transparent border-0 pt-4"${_scopeId}><h5 class="mb-0"${_scopeId}>Tambah Menu Produksi</h5></div><form class="card-body row g-3"${_scopeId}><div class="col-md-4"${_scopeId}><input${ssrRenderAttr("value", unref(menuForm).name)} class="form-control" placeholder="Nama menu" required${_scopeId}></div><div class="col-md-3"${_scopeId}><input${ssrRenderAttr("value", unref(menuForm).category)} class="form-control" placeholder="Kategori" required${_scopeId}></div><div class="col-md-2"${_scopeId}><input${ssrRenderAttr("value", unref(menuForm).price)} type="number" min="0" class="form-control" placeholder="Harga" required${_scopeId}></div><div class="col-md-2"${_scopeId}><input${ssrRenderAttr("value", unref(menuForm).stock)} type="number" min="0" class="form-control" placeholder="Stok awal" required${_scopeId}></div><div class="col-md-4"${_scopeId}><select class="form-select" multiple required${_scopeId}><!--[-->`);
              ssrRenderList(__props.foodTags, (tag) => {
                _push2(`<option${ssrRenderAttr("value", tag.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(menuForm).food_tag) ? ssrLooseContain(unref(menuForm).food_tag, tag.id) : ssrLooseEqual(unref(menuForm).food_tag, tag.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(tag.name)}</option>`);
              });
              _push2(`<!--]--></select></div><div class="col-md-2 d-grid"${_scopeId}><button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(menuForm).processing) ? " disabled" : ""}${_scopeId}>Tambah Menu</button></div>`);
              if (Object.keys(unref(menuForm).errors).length) {
                _push2(`<div class="col-12 text-danger small"${_scopeId}>${ssrInterpolate(Object.values(unref(menuForm).errors)[0])}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="col-12"${_scopeId}><div class="card border-0 shadow-sm"${_scopeId}><div class="card-header bg-transparent border-0 pt-4 pb-0"${_scopeId}><h5 class="mb-0"${_scopeId}>Menu &amp; Stock</h5></div><div class="card-body table-responsive"${_scopeId}><table class="table align-middle"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Menu</th><th${_scopeId}>Stock</th><th${_scopeId}>Biaya Produksi</th><th${_scopeId}>Harga Jual</th><th${_scopeId}>Status</th><th${_scopeId}>Mutasi Terakhir</th><th${_scopeId}>Aksi</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.menus, (menu) => {
              _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(menu.name)}</td><td${_scopeId}>${ssrInterpolate(menu.stock)}</td><td${_scopeId}>${ssrInterpolate(menu.cost ? unref(formatIDR)(menu.cost) : "-")}</td><td${_scopeId}>${ssrInterpolate(unref(formatIDR)(menu.price))}</td><td${_scopeId}><span class="${ssrRenderClass([menu.is_published ? "bg-success" : "bg-secondary", "badge"])}"${_scopeId}>${ssrInterpolate(menu.workflow_status === "ready" ? "Siap Dijual" : menu.is_published ? "Published" : "Draft")}</span></td><td class="small text-muted"${_scopeId}>`);
              if (menu.latest_stock_movement) {
                _push2(`<!--[--><span class="${ssrRenderClass(menu.latest_stock_movement.change > 0 ? "text-success" : "text-danger")}"${_scopeId}>${ssrInterpolate(menu.latest_stock_movement.change > 0 ? "+" : "")}${ssrInterpolate(menu.latest_stock_movement.change)}</span> · ${ssrInterpolate(menu.latest_stock_movement.staff || "Sistem")}<!--]-->`);
              } else {
                _push2(`<span${_scopeId}>-</span>`);
              }
              _push2(`</td><td${_scopeId}><div class="d-flex gap-2 flex-wrap justify-content-end"${_scopeId}><input${ssrRenderAttr("value", stockForms.value[`amount_${menu.id}`])} type="number" class="form-control form-control-sm" style="${ssrRenderStyle({ "width": "110px" })}" placeholder="stock"${_scopeId}><select class="form-select form-select-sm" style="${ssrRenderStyle({ "width": "130px" })}"${_scopeId}><option value="production"${ssrIncludeBooleanAttr(Array.isArray(stockForms.value[`reason_${menu.id}`]) ? ssrLooseContain(stockForms.value[`reason_${menu.id}`], "production") : ssrLooseEqual(stockForms.value[`reason_${menu.id}`], "production")) ? " selected" : ""}${_scopeId}>Produksi</option><option value="correction"${ssrIncludeBooleanAttr(Array.isArray(stockForms.value[`reason_${menu.id}`]) ? ssrLooseContain(stockForms.value[`reason_${menu.id}`], "correction") : ssrLooseEqual(stockForms.value[`reason_${menu.id}`], "correction")) ? " selected" : ""}${_scopeId}>Koreksi</option><option value="damaged"${ssrIncludeBooleanAttr(Array.isArray(stockForms.value[`reason_${menu.id}`]) ? ssrLooseContain(stockForms.value[`reason_${menu.id}`], "damaged") : ssrLooseEqual(stockForms.value[`reason_${menu.id}`], "damaged")) ? " selected" : ""}${_scopeId}>Rusak</option><option value="return"${ssrIncludeBooleanAttr(Array.isArray(stockForms.value[`reason_${menu.id}`]) ? ssrLooseContain(stockForms.value[`reason_${menu.id}`], "return") : ssrLooseEqual(stockForms.value[`reason_${menu.id}`], "return")) ? " selected" : ""}${_scopeId}>Retur</option></select><button class="btn btn-outline-primary btn-sm"${_scopeId}>Update</button><button class="btn btn-outline-success btn-sm"${_scopeId}>${ssrInterpolate(menu.workflow_status === "ready" ? "Batalkan Siap" : "Tandai Siap")}</button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-fluid py-4" }, [
                __props.notif ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 0,
                  notif: __props.notif
                }, null, 8, ["notif"])) : createCommentVNode("", true),
                !__props.stands.length ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "alert alert-warning"
                }, " Anda belum ditugaskan ke stand aktif. Hubungi Operational Officer untuk menambahkan assignment Production. ")) : createCommentVNode("", true),
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
                  selectedStandId.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "col-12"
                  }, [
                    createVNode("div", { class: "card border-0 shadow-sm" }, [
                      createVNode("div", { class: "card-header bg-transparent border-0 pt-4" }, [
                        createVNode("h5", { class: "mb-0" }, "Tambah Menu Produksi")
                      ]),
                      createVNode("form", {
                        class: "card-body row g-3",
                        onSubmit: withModifiers(submitMenu, ["prevent"])
                      }, [
                        createVNode("div", { class: "col-md-4" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(menuForm).name = $event,
                            class: "form-control",
                            placeholder: "Nama menu",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(menuForm).name]
                          ])
                        ]),
                        createVNode("div", { class: "col-md-3" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(menuForm).category = $event,
                            class: "form-control",
                            placeholder: "Kategori",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(menuForm).category]
                          ])
                        ]),
                        createVNode("div", { class: "col-md-2" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(menuForm).price = $event,
                            type: "number",
                            min: "0",
                            class: "form-control",
                            placeholder: "Harga",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [
                              vModelText,
                              unref(menuForm).price,
                              void 0,
                              { number: true }
                            ]
                          ])
                        ]),
                        createVNode("div", { class: "col-md-2" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(menuForm).stock = $event,
                            type: "number",
                            min: "0",
                            class: "form-control",
                            placeholder: "Stok awal",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [
                              vModelText,
                              unref(menuForm).stock,
                              void 0,
                              { number: true }
                            ]
                          ])
                        ]),
                        createVNode("div", { class: "col-md-4" }, [
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(menuForm).food_tag = $event,
                            class: "form-select",
                            multiple: "",
                            required: ""
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.foodTags, (tag) => {
                              return openBlock(), createBlock("option", {
                                key: tag.id,
                                value: tag.id
                              }, toDisplayString(tag.name), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(menuForm).food_tag]
                          ])
                        ]),
                        createVNode("div", { class: "col-md-2 d-grid" }, [
                          createVNode("button", {
                            class: "btn btn-primary",
                            disabled: unref(menuForm).processing
                          }, "Tambah Menu", 8, ["disabled"])
                        ]),
                        Object.keys(unref(menuForm).errors).length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "col-12 text-danger small"
                        }, toDisplayString(Object.values(unref(menuForm).errors)[0]), 1)) : createCommentVNode("", true)
                      ], 32)
                    ])
                  ])) : createCommentVNode("", true),
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
                              createVNode("th", null, "Mutasi Terakhir"),
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
                                  }, toDisplayString(menu.workflow_status === "ready" ? "Siap Dijual" : menu.is_published ? "Published" : "Draft"), 3)
                                ]),
                                createVNode("td", { class: "small text-muted" }, [
                                  menu.latest_stock_movement ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createVNode("span", {
                                      class: menu.latest_stock_movement.change > 0 ? "text-success" : "text-danger"
                                    }, toDisplayString(menu.latest_stock_movement.change > 0 ? "+" : "") + toDisplayString(menu.latest_stock_movement.change), 3),
                                    createTextVNode(" · " + toDisplayString(menu.latest_stock_movement.staff || "Sistem"), 1)
                                  ], 64)) : (openBlock(), createBlock("span", { key: 1 }, "-"))
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
                                    withDirectives(createVNode("select", {
                                      "onUpdate:modelValue": ($event) => stockForms.value[`reason_${menu.id}`] = $event,
                                      class: "form-select form-select-sm",
                                      style: { "width": "130px" }
                                    }, [
                                      createVNode("option", { value: "production" }, "Produksi"),
                                      createVNode("option", { value: "correction" }, "Koreksi"),
                                      createVNode("option", { value: "damaged" }, "Rusak"),
                                      createVNode("option", { value: "return" }, "Retur")
                                    ], 8, ["onUpdate:modelValue"]), [
                                      [vModelSelect, stockForms.value[`reason_${menu.id}`]]
                                    ]),
                                    createVNode("button", {
                                      class: "btn btn-outline-primary btn-sm",
                                      onClick: ($event) => updateStock(menu.id)
                                    }, "Update", 8, ["onClick"]),
                                    createVNode("button", {
                                      class: "btn btn-outline-success btn-sm",
                                      onClick: ($event) => togglePublish(menu)
                                    }, toDisplayString(menu.workflow_status === "ready" ? "Batalkan Siap" : "Tandai Siap"), 9, ["onClick"])
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
//# sourceMappingURL=ProductionPanel-BwBFRwtT.js.map
