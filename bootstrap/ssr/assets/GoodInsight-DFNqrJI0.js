import { ref, computed, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, Fragment, withModifiers, withDirectives, vModelText, vModelSelect, renderList, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, Head, router } from "@inertiajs/vue3";
import { S as StaffLayout } from "./StaffLayout-6jqdAWGT.js";
import { _ as _sfc_main$1 } from "./Notif-Zffab37M.js";
import "./ModalConfirmation-CzGDjmDO.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
const _sfc_main = {
  __name: "GoodInsight",
  __ssrInlineRender: true,
  props: {
    sale_list: { type: Array, default: () => [] },
    capital_list: { type: Array, default: () => [] },
    filter: { type: Object, default: () => ({}) },
    notif: { type: Object, default: null }
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const props = __props;
    const activeTab = ref("sales");
    const saleFilter = useForm({ keyword: ((_b = (_a = props.filter) == null ? void 0 : _a.sale) == null ? void 0 : _b.keyword) ?? "", category: ((_d = (_c = props.filter) == null ? void 0 : _c.sale) == null ? void 0 : _d.category) ?? "created_at", order: ((_f = (_e = props.filter) == null ? void 0 : _e.sale) == null ? void 0 : _f.order) ?? "desc" });
    const capitalFilter = useForm({ category: ((_h = (_g = props.filter) == null ? void 0 : _g.capital) == null ? void 0 : _h.category) ?? "created_at", order: ((_j = (_i = props.filter) == null ? void 0 : _i.capital) == null ? void 0 : _j.order) ?? "desc" });
    const capitalForm = useForm({ name: "", price: "", qty: "", unit: "", receipt: null, same_receipt_check: "", receipt_same: "" });
    const money = (value) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(value || 0));
    const date = (value) => value ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "-";
    const totalRevenue = computed(() => props.sale_list.reduce((sum, sale) => sum + Number(sale.transaction || 0), 0));
    const totalCapital = computed(() => props.capital_list.reduce((sum, capital) => sum + Number(capital.total_price || 0), 0));
    const pendingCapital = computed(() => props.capital_list.filter((capital) => !capital.operational_id).length);
    function filterSales() {
      saleFilter.post(route("good.insight.filter", { filter_name: "sale" }), { preserveScroll: true });
    }
    function filterCapital() {
      capitalFilter.post(route("good.insight.filter", { filter_name: "capital" }), { preserveScroll: true });
    }
    function addCapital() {
      capitalForm.post(route("good.capital.add"), { forceFormData: true, preserveScroll: true, onSuccess: () => capitalForm.reset() });
    }
    function toggleValidation(capital) {
      router.post(route("good.capital.validate"), { receipt_id: capital.id }, { preserveScroll: true });
    }
    function deleteCapital(capital) {
      if (!window.confirm(`Hapus pengeluaran "${capital.name}"?`)) return;
      router.post(route("good.capital.delete", { id: capital.id }), {}, { preserveScroll: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Insight Merchandise" }, null, _parent));
      _push(ssrRenderComponent(StaffLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Insight Merchandise`);
          } else {
            return [
              createTextVNode("Insight Merchandise")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container-fluid py-3 py-lg-4"${_scopeId}>`);
            if (__props.notif) {
              _push2(ssrRenderComponent(_sfc_main$1, { notif: __props.notif }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4"${_scopeId}><div${_scopeId}><h2 class="fw-bold mb-1"${_scopeId}>Insight Merchandise</h2><p class="text-muted mb-0"${_scopeId}>Pantau penjualan dan modal produk secara terpusat.</p></div><button class="btn btn-primary align-self-lg-center" data-bs-toggle="modal" data-bs-target="#newCapitalModal"${_scopeId}><i class="bi bi-receipt me-2"${_scopeId}></i>Catat pengeluaran</button></div><div class="row g-3 mb-4"${_scopeId}><div class="col-12 col-md-4"${_scopeId}><div class="card border-0 shadow-sm h-100"${_scopeId}><div class="card-body"${_scopeId}><div class="small text-muted"${_scopeId}>Omzet penjualan</div><div class="fs-4 fw-bold text-success"${_scopeId}>${ssrInterpolate(money(totalRevenue.value))}</div></div></div></div><div class="col-6 col-md-4"${_scopeId}><div class="card border-0 shadow-sm h-100"${_scopeId}><div class="card-body"${_scopeId}><div class="small text-muted"${_scopeId}>Total modal</div><div class="fs-4 fw-bold text-danger"${_scopeId}>${ssrInterpolate(money(totalCapital.value))}</div></div></div></div><div class="col-6 col-md-4"${_scopeId}><div class="card border-0 shadow-sm h-100"${_scopeId}><div class="card-body"${_scopeId}><div class="small text-muted"${_scopeId}>Menunggu validasi</div><div class="fs-4 fw-bold text-warning"${_scopeId}>${ssrInterpolate(pendingCapital.value)}</div></div></div></div></div><div class="card border-0 shadow-sm"${_scopeId}><div class="card-header bg-white border-0 pt-3"${_scopeId}><ul class="nav nav-pills gap-2"${_scopeId}><li class="nav-item"${_scopeId}><button class="${ssrRenderClass([{ active: activeTab.value === "sales" }, "nav-link"])}"${_scopeId}>Penjualan (${ssrInterpolate(__props.sale_list.length)})</button></li><li class="nav-item"${_scopeId}><button class="${ssrRenderClass([{ active: activeTab.value === "capital" }, "nav-link"])}"${_scopeId}>Pengeluaran (${ssrInterpolate(__props.capital_list.length)})</button></li></ul></div><div class="card-body"${_scopeId}>`);
            if (activeTab.value === "sales") {
              _push2(`<!--[--><form class="row g-2 mb-3"${_scopeId}><div class="col-12 col-md-5"${_scopeId}><input${ssrRenderAttr("value", unref(saleFilter).keyword)} class="form-control" type="search" placeholder="Cari nama pelanggan..."${_scopeId}></div><div class="col-6 col-md-3"${_scopeId}><select class="form-select"${_scopeId}><option value="created_at"${ssrIncludeBooleanAttr(Array.isArray(unref(saleFilter).category) ? ssrLooseContain(unref(saleFilter).category, "created_at") : ssrLooseEqual(unref(saleFilter).category, "created_at")) ? " selected" : ""}${_scopeId}>Tanggal</option><option value="customer"${ssrIncludeBooleanAttr(Array.isArray(unref(saleFilter).category) ? ssrLooseContain(unref(saleFilter).category, "customer") : ssrLooseEqual(unref(saleFilter).category, "customer")) ? " selected" : ""}${_scopeId}>Pelanggan</option><option value="transaction"${ssrIncludeBooleanAttr(Array.isArray(unref(saleFilter).category) ? ssrLooseContain(unref(saleFilter).category, "transaction") : ssrLooseEqual(unref(saleFilter).category, "transaction")) ? " selected" : ""}${_scopeId}>Nominal</option></select></div><div class="col-6 col-md-2"${_scopeId}><select class="form-select"${_scopeId}><option value="desc"${ssrIncludeBooleanAttr(Array.isArray(unref(saleFilter).order) ? ssrLooseContain(unref(saleFilter).order, "desc") : ssrLooseEqual(unref(saleFilter).order, "desc")) ? " selected" : ""}${_scopeId}>Menurun</option><option value="asc"${ssrIncludeBooleanAttr(Array.isArray(unref(saleFilter).order) ? ssrLooseContain(unref(saleFilter).order, "asc") : ssrLooseEqual(unref(saleFilter).order, "asc")) ? " selected" : ""}${_scopeId}>Menaik</option></select></div><div class="col-md-auto"${_scopeId}><button class="btn btn-outline-primary w-100"${_scopeId}>Terapkan</button></div></form><div class="table-responsive"${_scopeId}><table class="table table-hover align-middle"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Tanggal</th><th${_scopeId}>Pelanggan</th><th${_scopeId}>Pesanan</th><th${_scopeId}>Kasir</th><th${_scopeId}>Status</th><th class="text-end"${_scopeId}>Total</th></tr></thead><tbody${_scopeId}><!--[-->`);
              ssrRenderList(__props.sale_list, (sale) => {
                var _a2, _b2;
                _push2(`<tr${_scopeId}><td class="text-nowrap"${_scopeId}>${ssrInterpolate(date(sale.created_at))}</td><td${_scopeId}>${ssrInterpolate(sale.customer || "Walk-in")}</td><td${_scopeId}><!--[-->`);
                ssrRenderList(sale.order, (order) => {
                  var _a3, _b3, _c2;
                  _push2(`<div class="small"${_scopeId}>${ssrInterpolate(order.amount)}× ${ssrInterpolate((_b3 = (_a3 = order.variant) == null ? void 0 : _a3.product) == null ? void 0 : _b3.name)} ${ssrInterpolate((_c2 = order.variant) == null ? void 0 : _c2.name)}</div>`);
                });
                _push2(`<!--]-->`);
                if (!((_a2 = sale.order) == null ? void 0 : _a2.length)) {
                  _push2(`<span class="text-muted"${_scopeId}>-</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</td><td${_scopeId}>${ssrInterpolate(((_b2 = sale.cashier) == null ? void 0 : _b2.name) ?? "-")}</td><td${_scopeId}><span class="${ssrRenderClass([sale.operational_id ? "text-bg-success" : "text-bg-warning", "badge"])}"${_scopeId}>${ssrInterpolate(sale.operational_id ? "Valid" : "Menunggu")}</span></td><td class="text-end fw-semibold"${_scopeId}>${ssrInterpolate(money(sale.transaction))}</td></tr>`);
              });
              _push2(`<!--]-->`);
              if (!__props.sale_list.length) {
                _push2(`<tr${_scopeId}><td colspan="6" class="text-center text-muted py-5"${_scopeId}>Belum ada transaksi penjualan.</td></tr>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</tbody></table></div><!--]-->`);
            } else {
              _push2(`<!--[--><form class="row g-2 mb-3"${_scopeId}><div class="col-6 col-md-3"${_scopeId}><select class="form-select"${_scopeId}><option value="created_at"${ssrIncludeBooleanAttr(Array.isArray(unref(capitalFilter).category) ? ssrLooseContain(unref(capitalFilter).category, "created_at") : ssrLooseEqual(unref(capitalFilter).category, "created_at")) ? " selected" : ""}${_scopeId}>Tanggal</option><option value="name"${ssrIncludeBooleanAttr(Array.isArray(unref(capitalFilter).category) ? ssrLooseContain(unref(capitalFilter).category, "name") : ssrLooseEqual(unref(capitalFilter).category, "name")) ? " selected" : ""}${_scopeId}>Nama</option><option value="total_price"${ssrIncludeBooleanAttr(Array.isArray(unref(capitalFilter).category) ? ssrLooseContain(unref(capitalFilter).category, "total_price") : ssrLooseEqual(unref(capitalFilter).category, "total_price")) ? " selected" : ""}${_scopeId}>Total</option></select></div><div class="col-6 col-md-3"${_scopeId}><select class="form-select"${_scopeId}><option value="desc"${ssrIncludeBooleanAttr(Array.isArray(unref(capitalFilter).order) ? ssrLooseContain(unref(capitalFilter).order, "desc") : ssrLooseEqual(unref(capitalFilter).order, "desc")) ? " selected" : ""}${_scopeId}>Menurun</option><option value="asc"${ssrIncludeBooleanAttr(Array.isArray(unref(capitalFilter).order) ? ssrLooseContain(unref(capitalFilter).order, "asc") : ssrLooseEqual(unref(capitalFilter).order, "asc")) ? " selected" : ""}${_scopeId}>Menaik</option></select></div><div class="col-md-auto"${_scopeId}><button class="btn btn-outline-primary w-100"${_scopeId}>Terapkan</button></div></form><div class="table-responsive"${_scopeId}><table class="table table-hover align-middle"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Tanggal</th><th${_scopeId}>Item</th><th${_scopeId}>Jumlah</th><th class="text-end"${_scopeId}>Total</th><th${_scopeId}>Status</th><th class="text-end"${_scopeId}>Aksi</th></tr></thead><tbody${_scopeId}><!--[-->`);
              ssrRenderList(__props.capital_list, (capital) => {
                _push2(`<tr${_scopeId}><td class="text-nowrap"${_scopeId}>${ssrInterpolate(date(capital.created_at))}</td><td${_scopeId}><div class="fw-semibold"${_scopeId}>${ssrInterpolate(capital.name)}</div><div class="small text-muted"${_scopeId}>${ssrInterpolate(money(capital.price))} / ${ssrInterpolate(capital.unit)}</div></td><td${_scopeId}>${ssrInterpolate(capital.qty)} ${ssrInterpolate(capital.unit)}</td><td class="text-end fw-semibold"${_scopeId}>${ssrInterpolate(money(capital.total_price))}</td><td${_scopeId}><span class="${ssrRenderClass([capital.operational_id ? "text-bg-success" : "text-bg-warning", "badge"])}"${_scopeId}>${ssrInterpolate(capital.operational_id ? "Valid" : "Menunggu")}</span></td><td class="text-end"${_scopeId}><button class="${ssrRenderClass([capital.operational_id ? "btn-outline-warning" : "btn-outline-success", "btn btn-sm me-1"])}"${_scopeId}>${ssrInterpolate(capital.operational_id ? "Batalkan" : "Validasi")}</button>`);
                if (!capital.operational_id) {
                  _push2(`<button class="btn btn-sm btn-outline-danger"${_scopeId}><i class="bi bi-trash"${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</td></tr>`);
              });
              _push2(`<!--]-->`);
              if (!__props.capital_list.length) {
                _push2(`<tr${_scopeId}><td colspan="6" class="text-center text-muted py-5"${_scopeId}>Belum ada pengeluaran merchandise.</td></tr>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</tbody></table></div><!--]-->`);
            }
            _push2(`</div></div></div><div id="newCapitalModal" class="modal fade" tabindex="-1" aria-hidden="true"${_scopeId}><div class="modal-dialog"${_scopeId}><form class="modal-content"${_scopeId}><div class="modal-header"${_scopeId}><h5 class="modal-title"${_scopeId}>Catat pengeluaran</h5><button type="button" class="btn-close" data-bs-dismiss="modal"${_scopeId}></button></div><div class="modal-body"${_scopeId}><div class="mb-3"${_scopeId}><label class="form-label"${_scopeId}>Nama item</label><input${ssrRenderAttr("value", unref(capitalForm).name)} class="form-control" required maxlength="255"${_scopeId}><div class="text-danger small"${_scopeId}>${ssrInterpolate(unref(capitalForm).errors.name)}</div></div><div class="row g-2 mb-3"${_scopeId}><div class="col-6"${_scopeId}><label class="form-label"${_scopeId}>Harga satuan</label><input${ssrRenderAttr("value", unref(capitalForm).price)} type="number" min="1" class="form-control" required${_scopeId}></div><div class="col-3"${_scopeId}><label class="form-label"${_scopeId}>Jumlah</label><input${ssrRenderAttr("value", unref(capitalForm).qty)} type="number" min="1" class="form-control" required${_scopeId}></div><div class="col-3"${_scopeId}><label class="form-label"${_scopeId}>Satuan</label><input${ssrRenderAttr("value", unref(capitalForm).unit)} class="form-control" required placeholder="pcs"${_scopeId}></div></div><div class="form-check mb-3"${_scopeId}><input id="sameReceipt"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(capitalForm).same_receipt_check, "on")) ? " checked" : ""} class="form-check-input" type="checkbox"${_scopeId}><label class="form-check-label" for="sameReceipt"${_scopeId}>Gunakan bukti dari pengeluaran lain</label></div>`);
            if (unref(capitalForm).same_receipt_check === "on") {
              _push2(`<div${_scopeId}><label class="form-label"${_scopeId}>Pilih pengeluaran</label><select class="form-select" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(capitalForm).receipt_same) ? ssrLooseContain(unref(capitalForm).receipt_same, "") : ssrLooseEqual(unref(capitalForm).receipt_same, "")) ? " selected" : ""}${_scopeId}>Pilih bukti</option><!--[-->`);
              ssrRenderList(__props.capital_list.filter((row) => row.receipt), (item) => {
                _push2(`<option${ssrRenderAttr("value", item.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(capitalForm).receipt_same) ? ssrLooseContain(unref(capitalForm).receipt_same, item.id) : ssrLooseEqual(unref(capitalForm).receipt_same, item.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(item.name)} — ${ssrInterpolate(date(item.created_at))}</option>`);
              });
              _push2(`<!--]--></select></div>`);
            } else {
              _push2(`<div${_scopeId}><label class="form-label"${_scopeId}>Bukti pembelian</label><input type="file" accept="image/*" class="form-control" required${_scopeId}></div>`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(unref(capitalForm).errors, (error) => {
              _push2(`<div class="text-danger small mt-1"${_scopeId}>${ssrInterpolate(error)}</div>`);
            });
            _push2(`<!--]--></div><div class="modal-footer"${_scopeId}><button type="button" class="btn btn-light" data-bs-dismiss="modal"${_scopeId}>Batal</button><button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(capitalForm).processing) ? " disabled" : ""}${_scopeId}>Simpan pengeluaran</button></div></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-fluid py-3 py-lg-4" }, [
                __props.notif ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 0,
                  notif: __props.notif
                }, null, 8, ["notif"])) : createCommentVNode("", true),
                createVNode("div", { class: "d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4" }, [
                  createVNode("div", null, [
                    createVNode("h2", { class: "fw-bold mb-1" }, "Insight Merchandise"),
                    createVNode("p", { class: "text-muted mb-0" }, "Pantau penjualan dan modal produk secara terpusat.")
                  ]),
                  createVNode("button", {
                    class: "btn btn-primary align-self-lg-center",
                    "data-bs-toggle": "modal",
                    "data-bs-target": "#newCapitalModal"
                  }, [
                    createVNode("i", { class: "bi bi-receipt me-2" }),
                    createTextVNode("Catat pengeluaran")
                  ])
                ]),
                createVNode("div", { class: "row g-3 mb-4" }, [
                  createVNode("div", { class: "col-12 col-md-4" }, [
                    createVNode("div", { class: "card border-0 shadow-sm h-100" }, [
                      createVNode("div", { class: "card-body" }, [
                        createVNode("div", { class: "small text-muted" }, "Omzet penjualan"),
                        createVNode("div", { class: "fs-4 fw-bold text-success" }, toDisplayString(money(totalRevenue.value)), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "col-6 col-md-4" }, [
                    createVNode("div", { class: "card border-0 shadow-sm h-100" }, [
                      createVNode("div", { class: "card-body" }, [
                        createVNode("div", { class: "small text-muted" }, "Total modal"),
                        createVNode("div", { class: "fs-4 fw-bold text-danger" }, toDisplayString(money(totalCapital.value)), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "col-6 col-md-4" }, [
                    createVNode("div", { class: "card border-0 shadow-sm h-100" }, [
                      createVNode("div", { class: "card-body" }, [
                        createVNode("div", { class: "small text-muted" }, "Menunggu validasi"),
                        createVNode("div", { class: "fs-4 fw-bold text-warning" }, toDisplayString(pendingCapital.value), 1)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "card border-0 shadow-sm" }, [
                  createVNode("div", { class: "card-header bg-white border-0 pt-3" }, [
                    createVNode("ul", { class: "nav nav-pills gap-2" }, [
                      createVNode("li", { class: "nav-item" }, [
                        createVNode("button", {
                          class: ["nav-link", { active: activeTab.value === "sales" }],
                          onClick: ($event) => activeTab.value = "sales"
                        }, "Penjualan (" + toDisplayString(__props.sale_list.length) + ")", 11, ["onClick"])
                      ]),
                      createVNode("li", { class: "nav-item" }, [
                        createVNode("button", {
                          class: ["nav-link", { active: activeTab.value === "capital" }],
                          onClick: ($event) => activeTab.value = "capital"
                        }, "Pengeluaran (" + toDisplayString(__props.capital_list.length) + ")", 11, ["onClick"])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "card-body" }, [
                    activeTab.value === "sales" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createVNode("form", {
                        class: "row g-2 mb-3",
                        onSubmit: withModifiers(filterSales, ["prevent"])
                      }, [
                        createVNode("div", { class: "col-12 col-md-5" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(saleFilter).keyword = $event,
                            class: "form-control",
                            type: "search",
                            placeholder: "Cari nama pelanggan..."
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(saleFilter).keyword]
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-md-3" }, [
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(saleFilter).category = $event,
                            class: "form-select"
                          }, [
                            createVNode("option", { value: "created_at" }, "Tanggal"),
                            createVNode("option", { value: "customer" }, "Pelanggan"),
                            createVNode("option", { value: "transaction" }, "Nominal")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(saleFilter).category]
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-md-2" }, [
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(saleFilter).order = $event,
                            class: "form-select"
                          }, [
                            createVNode("option", { value: "desc" }, "Menurun"),
                            createVNode("option", { value: "asc" }, "Menaik")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(saleFilter).order]
                          ])
                        ]),
                        createVNode("div", { class: "col-md-auto" }, [
                          createVNode("button", { class: "btn btn-outline-primary w-100" }, "Terapkan")
                        ])
                      ], 32),
                      createVNode("div", { class: "table-responsive" }, [
                        createVNode("table", { class: "table table-hover align-middle" }, [
                          createVNode("thead", null, [
                            createVNode("tr", null, [
                              createVNode("th", null, "Tanggal"),
                              createVNode("th", null, "Pelanggan"),
                              createVNode("th", null, "Pesanan"),
                              createVNode("th", null, "Kasir"),
                              createVNode("th", null, "Status"),
                              createVNode("th", { class: "text-end" }, "Total")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.sale_list, (sale) => {
                              var _a2, _b2;
                              return openBlock(), createBlock("tr", {
                                key: sale.id
                              }, [
                                createVNode("td", { class: "text-nowrap" }, toDisplayString(date(sale.created_at)), 1),
                                createVNode("td", null, toDisplayString(sale.customer || "Walk-in"), 1),
                                createVNode("td", null, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(sale.order, (order) => {
                                    var _a3, _b3, _c2;
                                    return openBlock(), createBlock("div", {
                                      key: order.id,
                                      class: "small"
                                    }, toDisplayString(order.amount) + "× " + toDisplayString((_b3 = (_a3 = order.variant) == null ? void 0 : _a3.product) == null ? void 0 : _b3.name) + " " + toDisplayString((_c2 = order.variant) == null ? void 0 : _c2.name), 1);
                                  }), 128)),
                                  !((_a2 = sale.order) == null ? void 0 : _a2.length) ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "text-muted"
                                  }, "-")) : createCommentVNode("", true)
                                ]),
                                createVNode("td", null, toDisplayString(((_b2 = sale.cashier) == null ? void 0 : _b2.name) ?? "-"), 1),
                                createVNode("td", null, [
                                  createVNode("span", {
                                    class: ["badge", sale.operational_id ? "text-bg-success" : "text-bg-warning"]
                                  }, toDisplayString(sale.operational_id ? "Valid" : "Menunggu"), 3)
                                ]),
                                createVNode("td", { class: "text-end fw-semibold" }, toDisplayString(money(sale.transaction)), 1)
                              ]);
                            }), 128)),
                            !__props.sale_list.length ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "6",
                                class: "text-center text-muted py-5"
                              }, "Belum ada transaksi penjualan.")
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createVNode("form", {
                        class: "row g-2 mb-3",
                        onSubmit: withModifiers(filterCapital, ["prevent"])
                      }, [
                        createVNode("div", { class: "col-6 col-md-3" }, [
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(capitalFilter).category = $event,
                            class: "form-select"
                          }, [
                            createVNode("option", { value: "created_at" }, "Tanggal"),
                            createVNode("option", { value: "name" }, "Nama"),
                            createVNode("option", { value: "total_price" }, "Total")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(capitalFilter).category]
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-md-3" }, [
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(capitalFilter).order = $event,
                            class: "form-select"
                          }, [
                            createVNode("option", { value: "desc" }, "Menurun"),
                            createVNode("option", { value: "asc" }, "Menaik")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(capitalFilter).order]
                          ])
                        ]),
                        createVNode("div", { class: "col-md-auto" }, [
                          createVNode("button", { class: "btn btn-outline-primary w-100" }, "Terapkan")
                        ])
                      ], 32),
                      createVNode("div", { class: "table-responsive" }, [
                        createVNode("table", { class: "table table-hover align-middle" }, [
                          createVNode("thead", null, [
                            createVNode("tr", null, [
                              createVNode("th", null, "Tanggal"),
                              createVNode("th", null, "Item"),
                              createVNode("th", null, "Jumlah"),
                              createVNode("th", { class: "text-end" }, "Total"),
                              createVNode("th", null, "Status"),
                              createVNode("th", { class: "text-end" }, "Aksi")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.capital_list, (capital) => {
                              return openBlock(), createBlock("tr", {
                                key: capital.id
                              }, [
                                createVNode("td", { class: "text-nowrap" }, toDisplayString(date(capital.created_at)), 1),
                                createVNode("td", null, [
                                  createVNode("div", { class: "fw-semibold" }, toDisplayString(capital.name), 1),
                                  createVNode("div", { class: "small text-muted" }, toDisplayString(money(capital.price)) + " / " + toDisplayString(capital.unit), 1)
                                ]),
                                createVNode("td", null, toDisplayString(capital.qty) + " " + toDisplayString(capital.unit), 1),
                                createVNode("td", { class: "text-end fw-semibold" }, toDisplayString(money(capital.total_price)), 1),
                                createVNode("td", null, [
                                  createVNode("span", {
                                    class: ["badge", capital.operational_id ? "text-bg-success" : "text-bg-warning"]
                                  }, toDisplayString(capital.operational_id ? "Valid" : "Menunggu"), 3)
                                ]),
                                createVNode("td", { class: "text-end" }, [
                                  createVNode("button", {
                                    class: ["btn btn-sm me-1", capital.operational_id ? "btn-outline-warning" : "btn-outline-success"],
                                    onClick: ($event) => toggleValidation(capital)
                                  }, toDisplayString(capital.operational_id ? "Batalkan" : "Validasi"), 11, ["onClick"]),
                                  !capital.operational_id ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    class: "btn btn-sm btn-outline-danger",
                                    onClick: ($event) => deleteCapital(capital)
                                  }, [
                                    createVNode("i", { class: "bi bi-trash" })
                                  ], 8, ["onClick"])) : createCommentVNode("", true)
                                ])
                              ]);
                            }), 128)),
                            !__props.capital_list.length ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "6",
                                class: "text-center text-muted py-5"
                              }, "Belum ada pengeluaran merchandise.")
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ], 64))
                  ])
                ])
              ]),
              createVNode("div", {
                id: "newCapitalModal",
                class: "modal fade",
                tabindex: "-1",
                "aria-hidden": "true"
              }, [
                createVNode("div", { class: "modal-dialog" }, [
                  createVNode("form", {
                    class: "modal-content",
                    onSubmit: withModifiers(addCapital, ["prevent"])
                  }, [
                    createVNode("div", { class: "modal-header" }, [
                      createVNode("h5", { class: "modal-title" }, "Catat pengeluaran"),
                      createVNode("button", {
                        type: "button",
                        class: "btn-close",
                        "data-bs-dismiss": "modal"
                      })
                    ]),
                    createVNode("div", { class: "modal-body" }, [
                      createVNode("div", { class: "mb-3" }, [
                        createVNode("label", { class: "form-label" }, "Nama item"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(capitalForm).name = $event,
                          class: "form-control",
                          required: "",
                          maxlength: "255"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(capitalForm).name]
                        ]),
                        createVNode("div", { class: "text-danger small" }, toDisplayString(unref(capitalForm).errors.name), 1)
                      ]),
                      createVNode("div", { class: "row g-2 mb-3" }, [
                        createVNode("div", { class: "col-6" }, [
                          createVNode("label", { class: "form-label" }, "Harga satuan"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(capitalForm).price = $event,
                            type: "number",
                            min: "1",
                            class: "form-control",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(capitalForm).price]
                          ])
                        ]),
                        createVNode("div", { class: "col-3" }, [
                          createVNode("label", { class: "form-label" }, "Jumlah"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(capitalForm).qty = $event,
                            type: "number",
                            min: "1",
                            class: "form-control",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(capitalForm).qty]
                          ])
                        ]),
                        createVNode("div", { class: "col-3" }, [
                          createVNode("label", { class: "form-label" }, "Satuan"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(capitalForm).unit = $event,
                            class: "form-control",
                            required: "",
                            placeholder: "pcs"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(capitalForm).unit]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "form-check mb-3" }, [
                        withDirectives(createVNode("input", {
                          id: "sameReceipt",
                          "onUpdate:modelValue": ($event) => unref(capitalForm).same_receipt_check = $event,
                          class: "form-check-input",
                          type: "checkbox",
                          "true-value": "on",
                          "false-value": ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(capitalForm).same_receipt_check]
                        ]),
                        createVNode("label", {
                          class: "form-check-label",
                          for: "sameReceipt"
                        }, "Gunakan bukti dari pengeluaran lain")
                      ]),
                      unref(capitalForm).same_receipt_check === "on" ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("label", { class: "form-label" }, "Pilih pengeluaran"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(capitalForm).receipt_same = $event,
                          class: "form-select",
                          required: ""
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: ""
                          }, "Pilih bukti"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.capital_list.filter((row) => row.receipt), (item) => {
                            return openBlock(), createBlock("option", {
                              key: item.id,
                              value: item.id
                            }, toDisplayString(item.name) + " — " + toDisplayString(date(item.created_at)), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(capitalForm).receipt_same]
                        ])
                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("label", { class: "form-label" }, "Bukti pembelian"),
                        createVNode("input", {
                          type: "file",
                          accept: "image/*",
                          class: "form-control",
                          required: "",
                          onChange: ($event) => unref(capitalForm).receipt = $event.target.files[0]
                        }, null, 40, ["onChange"])
                      ])),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(capitalForm).errors, (error) => {
                        return openBlock(), createBlock("div", {
                          key: error,
                          class: "text-danger small mt-1"
                        }, toDisplayString(error), 1);
                      }), 128))
                    ]),
                    createVNode("div", { class: "modal-footer" }, [
                      createVNode("button", {
                        type: "button",
                        class: "btn btn-light",
                        "data-bs-dismiss": "modal"
                      }, "Batal"),
                      createVNode("button", {
                        class: "btn btn-primary",
                        disabled: unref(capitalForm).processing
                      }, "Simpan pengeluaran", 8, ["disabled"])
                    ])
                  ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Business/GoodInsight.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=GoodInsight-DFNqrJI0.js.map
