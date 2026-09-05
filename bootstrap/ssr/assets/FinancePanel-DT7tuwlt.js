import { ref, onMounted, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-kVLGS8T_.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CaKJYApU.js";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "FinancePanel",
  __ssrInlineRender: true,
  props: {
    pendingContributionReceipts: { type: Array, default: () => [] },
    pendingExpenseItems: { type: Array, default: () => [] },
    pendingDisbursementItems: { type: Array, default: () => [] },
    pendingDisbursementLetters: { type: Array, default: () => [] }
  },
  setup(__props) {
    const modalConfirmationRef = ref(null);
    const previewModalRef = ref(null);
    const previewUrl = ref(null);
    const currentValidateRoute = ref(null);
    const currentValidateMessage = ref(null);
    let bootstrapModal = null;
    onMounted(() => {
      if (typeof window.bootstrap !== "undefined") {
        bootstrapModal = new window.bootstrap.Modal(previewModalRef.value);
      }
    });
    function isImage(url) {
      if (!url) return false;
      const ext = url.split(".").pop().toLowerCase();
      return ["jpg", "jpeg", "png", "webp", "heic"].includes(ext);
    }
    function previewDoc(url, validateRoute = null, validateMessage = null) {
      previewUrl.value = url;
      currentValidateRoute.value = validateRoute;
      currentValidateMessage.value = validateMessage;
      if (bootstrapModal) {
        bootstrapModal.show();
      } else {
        window.open(url, "_blank");
      }
    }
    function confirmFromPreview() {
      if (bootstrapModal) bootstrapModal.hide();
      validateDoc(currentValidateRoute.value, currentValidateMessage.value);
    }
    function validateDoc(routeUrl, message) {
      modalConfirmationRef.value.showModal(routeUrl, message);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(StaffLayout, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Finance Monitoring Panel`);
          } else {
            return [
              createTextVNode("Finance Monitoring Panel")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container-fluid p-4" data-v-0953a5ab${_scopeId}><div class="row g-3 mb-4" data-v-0953a5ab${_scopeId}><div class="col-md-3" data-v-0953a5ab${_scopeId}><div class="card shadow-sm p-3 border-0 bg-white" data-v-0953a5ab${_scopeId}><div class="text-muted small mb-1" data-v-0953a5ab${_scopeId}>Pending Contribution</div><div class="fs-3 fw-bold text-primary" data-v-0953a5ab${_scopeId}>${ssrInterpolate(__props.pendingContributionReceipts.length)}</div></div></div><div class="col-md-3" data-v-0953a5ab${_scopeId}><div class="card shadow-sm p-3 border-0 bg-white" data-v-0953a5ab${_scopeId}><div class="text-muted small mb-1" data-v-0953a5ab${_scopeId}>Pending Expense</div><div class="fs-3 fw-bold text-primary" data-v-0953a5ab${_scopeId}>${ssrInterpolate(__props.pendingExpenseItems.length)}</div></div></div><div class="col-md-3" data-v-0953a5ab${_scopeId}><div class="card shadow-sm p-3 border-0 bg-white" data-v-0953a5ab${_scopeId}><div class="text-muted small mb-1" data-v-0953a5ab${_scopeId}>Pending Disbursement</div><div class="fs-3 fw-bold text-primary" data-v-0953a5ab${_scopeId}>${ssrInterpolate(__props.pendingDisbursementItems.length)}</div></div></div><div class="col-md-3" data-v-0953a5ab${_scopeId}><div class="card shadow-sm p-3 border-0 bg-white" data-v-0953a5ab${_scopeId}><div class="text-muted small mb-1" data-v-0953a5ab${_scopeId}>Pending Letters</div><div class="fs-3 fw-bold text-primary" data-v-0953a5ab${_scopeId}>${ssrInterpolate(__props.pendingDisbursementLetters.length)}</div></div></div></div><div class="card shadow-sm mb-4 border-0" data-v-0953a5ab${_scopeId}><div class="card-header bg-white fw-bold d-flex justify-content-between align-items-center py-3" data-v-0953a5ab${_scopeId}><span data-v-0953a5ab${_scopeId}>Pending Contribution Receipts</span><span class="badge bg-primary rounded-pill" data-v-0953a5ab${_scopeId}>${ssrInterpolate(__props.pendingContributionReceipts.length)}</span></div><div class="table-responsive" data-v-0953a5ab${_scopeId}><table class="table align-middle mb-0" data-v-0953a5ab${_scopeId}><thead class="table-light" data-v-0953a5ab${_scopeId}><tr data-v-0953a5ab${_scopeId}><th data-v-0953a5ab${_scopeId}>Employee</th><th data-v-0953a5ab${_scopeId}>Months</th><th data-v-0953a5ab${_scopeId}>Waktu</th><th class="text-center" data-v-0953a5ab${_scopeId}>Aksi</th></tr></thead><tbody data-v-0953a5ab${_scopeId}><!--[-->`);
            ssrRenderList(__props.pendingContributionReceipts, (item) => {
              var _a, _b, _c, _d;
              _push2(`<tr data-v-0953a5ab${_scopeId}><td data-v-0953a5ab${_scopeId}><div class="fw-medium" data-v-0953a5ab${_scopeId}>${ssrInterpolate(((_b = (_a = item.contribution) == null ? void 0 : _a.employee) == null ? void 0 : _b.name) || "-")}</div><div class="small text-muted" data-v-0953a5ab${_scopeId}>${ssrInterpolate((_d = (_c = item.contribution) == null ? void 0 : _c.employee) == null ? void 0 : _d.role_name)}</div></td><td data-v-0953a5ab${_scopeId}><span class="badge bg-info-subtle text-info px-2" data-v-0953a5ab${_scopeId}>${ssrInterpolate(item.months)} Bulan</span></td><td class="small text-muted" data-v-0953a5ab${_scopeId}>${ssrInterpolate(new Date(item.created_at).toLocaleString("id-ID"))}</td><td class="text-center" data-v-0953a5ab${_scopeId}><div class="d-flex justify-content-center gap-2" data-v-0953a5ab${_scopeId}><button class="btn btn-sm btn-light" title="Preview" data-v-0953a5ab${_scopeId}><i class="bi bi-eye text-primary" data-v-0953a5ab${_scopeId}></i></button><button class="btn btn-sm btn-light" title="Validate" data-v-0953a5ab${_scopeId}><i class="bi bi-check-circle text-success" data-v-0953a5ab${_scopeId}></i></button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.pendingContributionReceipts.length === 0) {
              _push2(`<tr data-v-0953a5ab${_scopeId}><td colspan="4" class="text-center py-4 text-muted small" data-v-0953a5ab${_scopeId}>Tidak ada data pending.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div><div class="card shadow-sm mb-4 border-0" data-v-0953a5ab${_scopeId}><div class="card-header bg-white fw-bold d-flex justify-content-between align-items-center py-3" data-v-0953a5ab${_scopeId}><span data-v-0953a5ab${_scopeId}>Pending Expense Items (Belanja)</span><span class="badge bg-primary rounded-pill" data-v-0953a5ab${_scopeId}>${ssrInterpolate(__props.pendingExpenseItems.length)}</span></div><div class="table-responsive" data-v-0953a5ab${_scopeId}><table class="table align-middle mb-0" data-v-0953a5ab${_scopeId}><thead class="table-light" data-v-0953a5ab${_scopeId}><tr data-v-0953a5ab${_scopeId}><th data-v-0953a5ab${_scopeId}>Program</th><th data-v-0953a5ab${_scopeId}>Item Name</th><th data-v-0953a5ab${_scopeId}>Total</th><th class="text-center" data-v-0953a5ab${_scopeId}>Aksi</th></tr></thead><tbody data-v-0953a5ab${_scopeId}><!--[-->`);
            ssrRenderList(__props.pendingExpenseItems, (item) => {
              var _a, _b, _c, _d;
              _push2(`<tr data-v-0953a5ab${_scopeId}><td data-v-0953a5ab${_scopeId}><div class="fw-medium" data-v-0953a5ab${_scopeId}>${ssrInterpolate(((_a = item.program) == null ? void 0 : _a.name) || "-")}</div><div class="small text-muted" data-v-0953a5ab${_scopeId}>${ssrInterpolate((_c = (_b = item.program) == null ? void 0 : _b.department) == null ? void 0 : _c.name)}</div></td><td data-v-0953a5ab${_scopeId}>${ssrInterpolate(item.name)}</td><td class="fw-bold" data-v-0953a5ab${_scopeId}>Rp ${ssrInterpolate((_d = item.total_price) == null ? void 0 : _d.toLocaleString("id-ID"))}</td><td class="text-center" data-v-0953a5ab${_scopeId}><div class="d-flex justify-content-center gap-2" data-v-0953a5ab${_scopeId}><button class="btn btn-sm btn-light" title="Preview" data-v-0953a5ab${_scopeId}><i class="bi bi-eye text-primary" data-v-0953a5ab${_scopeId}></i></button><button class="btn btn-sm btn-light" title="Validate" data-v-0953a5ab${_scopeId}><i class="bi bi-check-circle text-success" data-v-0953a5ab${_scopeId}></i></button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.pendingExpenseItems.length === 0) {
              _push2(`<tr data-v-0953a5ab${_scopeId}><td colspan="4" class="text-center py-4 text-muted small" data-v-0953a5ab${_scopeId}>Tidak ada data pending.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div><div class="card shadow-sm mb-4 border-0" data-v-0953a5ab${_scopeId}><div class="card-header bg-white fw-bold d-flex justify-content-between align-items-center py-3" data-v-0953a5ab${_scopeId}><span data-v-0953a5ab${_scopeId}>Pending Disbursement Items (Pencairan)</span><span class="badge bg-primary rounded-pill" data-v-0953a5ab${_scopeId}>${ssrInterpolate(__props.pendingDisbursementItems.length)}</span></div><div class="table-responsive" data-v-0953a5ab${_scopeId}><table class="table align-middle mb-0" data-v-0953a5ab${_scopeId}><thead class="table-light" data-v-0953a5ab${_scopeId}><tr data-v-0953a5ab${_scopeId}><th data-v-0953a5ab${_scopeId}>Program</th><th data-v-0953a5ab${_scopeId}>Name</th><th data-v-0953a5ab${_scopeId}>Price</th><th class="text-center" data-v-0953a5ab${_scopeId}>Aksi</th></tr></thead><tbody data-v-0953a5ab${_scopeId}><!--[-->`);
            ssrRenderList(__props.pendingDisbursementItems, (item) => {
              var _a, _b;
              _push2(`<tr data-v-0953a5ab${_scopeId}><td data-v-0953a5ab${_scopeId}>${ssrInterpolate(((_a = item.program) == null ? void 0 : _a.name) || "-")}</td><td data-v-0953a5ab${_scopeId}>${ssrInterpolate(item.name)}</td><td class="fw-bold" data-v-0953a5ab${_scopeId}>Rp ${ssrInterpolate((_b = item.price) == null ? void 0 : _b.toLocaleString("id-ID"))}</td><td class="text-center" data-v-0953a5ab${_scopeId}><button class="btn btn-sm btn-light" title="Preview" data-v-0953a5ab${_scopeId}><i class="bi bi-eye text-primary" data-v-0953a5ab${_scopeId}></i></button></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.pendingDisbursementItems.length === 0) {
              _push2(`<tr data-v-0953a5ab${_scopeId}><td colspan="4" class="text-center py-4 text-muted small" data-v-0953a5ab${_scopeId}>Tidak ada data pending.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div><div class="card shadow-sm border-0" data-v-0953a5ab${_scopeId}><div class="card-header bg-white fw-bold d-flex justify-content-between align-items-center py-3" data-v-0953a5ab${_scopeId}><span data-v-0953a5ab${_scopeId}>Pending Disbursement Letters (Surat Pencairan)</span><span class="badge bg-primary rounded-pill" data-v-0953a5ab${_scopeId}>${ssrInterpolate(__props.pendingDisbursementLetters.length)}</span></div><div class="table-responsive" data-v-0953a5ab${_scopeId}><table class="table align-middle mb-0" data-v-0953a5ab${_scopeId}><thead class="table-light" data-v-0953a5ab${_scopeId}><tr data-v-0953a5ab${_scopeId}><th data-v-0953a5ab${_scopeId}>Program</th><th data-v-0953a5ab${_scopeId}>PIC</th><th data-v-0953a5ab${_scopeId}>Waktu</th><th class="text-center" data-v-0953a5ab${_scopeId}>Aksi</th></tr></thead><tbody data-v-0953a5ab${_scopeId}><!--[-->`);
            ssrRenderList(__props.pendingDisbursementLetters, (item) => {
              var _a, _b, _c, _d, _e;
              _push2(`<tr data-v-0953a5ab${_scopeId}><td data-v-0953a5ab${_scopeId}><div class="fw-medium text-truncate" style="${ssrRenderStyle({ "max-width": "250px" })}" data-v-0953a5ab${_scopeId}>${ssrInterpolate(((_a = item.program) == null ? void 0 : _a.name) || "-")}</div><div class="small text-muted" data-v-0953a5ab${_scopeId}>${ssrInterpolate((_c = (_b = item.program) == null ? void 0 : _b.department) == null ? void 0 : _c.name)}</div></td><td data-v-0953a5ab${_scopeId}>${ssrInterpolate((_e = (_d = item.program) == null ? void 0 : _d.pic) == null ? void 0 : _e.name)}</td><td class="small text-muted" data-v-0953a5ab${_scopeId}>${ssrInterpolate(new Date(item.created_at).toLocaleString("id-ID"))}</td><td class="text-center" data-v-0953a5ab${_scopeId}><div class="d-flex justify-content-center gap-2" data-v-0953a5ab${_scopeId}><button class="btn btn-sm btn-light" title="Preview PDF" data-v-0953a5ab${_scopeId}><i class="bi bi-file-earmark-pdf text-danger" data-v-0953a5ab${_scopeId}></i></button>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/seeo/staff/program/${item.program_id}`,
                class: "btn btn-sm btn-light",
                title: "Proses Pencairan"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="bi bi-plus-circle text-success" data-v-0953a5ab${_scopeId2}></i>`);
                  } else {
                    return [
                      createVNode("i", { class: "bi bi-plus-circle text-success" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.pendingDisbursementLetters.length === 0) {
              _push2(`<tr data-v-0953a5ab${_scopeId}><td colspan="4" class="text-center py-4 text-muted small" data-v-0953a5ab${_scopeId}>Tidak ada surat pending.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="modal fade" id="previewModal" tabindex="-1" aria-hidden="true" data-v-0953a5ab${_scopeId}><div class="modal-dialog modal-xl modal-dialog-centered" data-v-0953a5ab${_scopeId}><div class="modal-content border-0 shadow-lg" data-v-0953a5ab${_scopeId}><div class="modal-header bg-light" data-v-0953a5ab${_scopeId}><h5 class="modal-title fw-bold" data-v-0953a5ab${_scopeId}>Document Preview</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-0953a5ab${_scopeId}></button></div><div class="modal-body p-0 bg-secondary bg-opacity-10 d-flex justify-content-center align-items-center" style="${ssrRenderStyle({ "min-height": "400px", "max-height": "85vh", "overflow": "auto" })}" data-v-0953a5ab${_scopeId}>`);
            if (previewUrl.value) {
              _push2(`<!--[-->`);
              if (isImage(previewUrl.value)) {
                _push2(`<img${ssrRenderAttr("src", previewUrl.value)} class="img-fluid shadow-sm" alt="Preview" data-v-0953a5ab${_scopeId}>`);
              } else {
                _push2(`<iframe${ssrRenderAttr("src", previewUrl.value)} class="w-100" style="${ssrRenderStyle({ "height": "75vh" })}" frameborder="0" data-v-0953a5ab${_scopeId}></iframe>`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<div class="text-muted" data-v-0953a5ab${_scopeId}>Loading...</div>`);
            }
            _push2(`</div><div class="modal-footer bg-light py-2" data-v-0953a5ab${_scopeId}><button type="button" class="btn btn-secondary btn-sm px-4" data-bs-dismiss="modal" data-v-0953a5ab${_scopeId}>Tutup</button><a${ssrRenderAttr("href", previewUrl.value)} target="_blank" class="btn btn-outline-primary btn-sm px-4" data-v-0953a5ab${_scopeId}><i class="bi bi-box-arrow-up-right me-1" data-v-0953a5ab${_scopeId}></i> Tab Baru </a>`);
            if (currentValidateRoute.value) {
              _push2(`<button class="btn btn-success btn-sm px-4" data-v-0953a5ab${_scopeId}><i class="bi bi-check-circle me-1" data-v-0953a5ab${_scopeId}></i> Validasi Sekarang </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-fluid p-4" }, [
                createVNode("div", { class: "row g-3 mb-4" }, [
                  createVNode("div", { class: "col-md-3" }, [
                    createVNode("div", { class: "card shadow-sm p-3 border-0 bg-white" }, [
                      createVNode("div", { class: "text-muted small mb-1" }, "Pending Contribution"),
                      createVNode("div", { class: "fs-3 fw-bold text-primary" }, toDisplayString(__props.pendingContributionReceipts.length), 1)
                    ])
                  ]),
                  createVNode("div", { class: "col-md-3" }, [
                    createVNode("div", { class: "card shadow-sm p-3 border-0 bg-white" }, [
                      createVNode("div", { class: "text-muted small mb-1" }, "Pending Expense"),
                      createVNode("div", { class: "fs-3 fw-bold text-primary" }, toDisplayString(__props.pendingExpenseItems.length), 1)
                    ])
                  ]),
                  createVNode("div", { class: "col-md-3" }, [
                    createVNode("div", { class: "card shadow-sm p-3 border-0 bg-white" }, [
                      createVNode("div", { class: "text-muted small mb-1" }, "Pending Disbursement"),
                      createVNode("div", { class: "fs-3 fw-bold text-primary" }, toDisplayString(__props.pendingDisbursementItems.length), 1)
                    ])
                  ]),
                  createVNode("div", { class: "col-md-3" }, [
                    createVNode("div", { class: "card shadow-sm p-3 border-0 bg-white" }, [
                      createVNode("div", { class: "text-muted small mb-1" }, "Pending Letters"),
                      createVNode("div", { class: "fs-3 fw-bold text-primary" }, toDisplayString(__props.pendingDisbursementLetters.length), 1)
                    ])
                  ])
                ]),
                createVNode("div", { class: "card shadow-sm mb-4 border-0" }, [
                  createVNode("div", { class: "card-header bg-white fw-bold d-flex justify-content-between align-items-center py-3" }, [
                    createVNode("span", null, "Pending Contribution Receipts"),
                    createVNode("span", { class: "badge bg-primary rounded-pill" }, toDisplayString(__props.pendingContributionReceipts.length), 1)
                  ]),
                  createVNode("div", { class: "table-responsive" }, [
                    createVNode("table", { class: "table align-middle mb-0" }, [
                      createVNode("thead", { class: "table-light" }, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Employee"),
                          createVNode("th", null, "Months"),
                          createVNode("th", null, "Waktu"),
                          createVNode("th", { class: "text-center" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.pendingContributionReceipts, (item) => {
                          var _a, _b, _c, _d;
                          return openBlock(), createBlock("tr", {
                            key: item.id
                          }, [
                            createVNode("td", null, [
                              createVNode("div", { class: "fw-medium" }, toDisplayString(((_b = (_a = item.contribution) == null ? void 0 : _a.employee) == null ? void 0 : _b.name) || "-"), 1),
                              createVNode("div", { class: "small text-muted" }, toDisplayString((_d = (_c = item.contribution) == null ? void 0 : _c.employee) == null ? void 0 : _d.role_name), 1)
                            ]),
                            createVNode("td", null, [
                              createVNode("span", { class: "badge bg-info-subtle text-info px-2" }, toDisplayString(item.months) + " Bulan", 1)
                            ]),
                            createVNode("td", { class: "small text-muted" }, toDisplayString(new Date(item.created_at).toLocaleString("id-ID")), 1),
                            createVNode("td", { class: "text-center" }, [
                              createVNode("div", { class: "d-flex justify-content-center gap-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => previewDoc(`/storage/images/receipt/contribution/${item.receipt}`, `/contribution/validation/${item.id}`, "Validasi bukti iuran ini?"),
                                  class: "btn btn-sm btn-light",
                                  title: "Preview"
                                }, [
                                  createVNode("i", { class: "bi bi-eye text-primary" })
                                ], 8, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => validateDoc(`/contribution/validation/${item.id}`, "Validasi bukti iuran ini?"),
                                  class: "btn btn-sm btn-light",
                                  title: "Validate"
                                }, [
                                  createVNode("i", { class: "bi bi-check-circle text-success" })
                                ], 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128)),
                        __props.pendingContributionReceipts.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "4",
                            class: "text-center py-4 text-muted small"
                          }, "Tidak ada data pending.")
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "card shadow-sm mb-4 border-0" }, [
                  createVNode("div", { class: "card-header bg-white fw-bold d-flex justify-content-between align-items-center py-3" }, [
                    createVNode("span", null, "Pending Expense Items (Belanja)"),
                    createVNode("span", { class: "badge bg-primary rounded-pill" }, toDisplayString(__props.pendingExpenseItems.length), 1)
                  ]),
                  createVNode("div", { class: "table-responsive" }, [
                    createVNode("table", { class: "table align-middle mb-0" }, [
                      createVNode("thead", { class: "table-light" }, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Program"),
                          createVNode("th", null, "Item Name"),
                          createVNode("th", null, "Total"),
                          createVNode("th", { class: "text-center" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.pendingExpenseItems, (item) => {
                          var _a, _b, _c, _d;
                          return openBlock(), createBlock("tr", {
                            key: item.id
                          }, [
                            createVNode("td", null, [
                              createVNode("div", { class: "fw-medium" }, toDisplayString(((_a = item.program) == null ? void 0 : _a.name) || "-"), 1),
                              createVNode("div", { class: "small text-muted" }, toDisplayString((_c = (_b = item.program) == null ? void 0 : _b.department) == null ? void 0 : _c.name), 1)
                            ]),
                            createVNode("td", null, toDisplayString(item.name), 1),
                            createVNode("td", { class: "fw-bold" }, "Rp " + toDisplayString((_d = item.total_price) == null ? void 0 : _d.toLocaleString("id-ID")), 1),
                            createVNode("td", { class: "text-center" }, [
                              createVNode("div", { class: "d-flex justify-content-center gap-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => previewDoc(`/storage/images/receipt/expense/${item.receipt}`, `/program/expense/validate/${item.id}`, "Validasi bukti belanja ini?"),
                                  class: "btn btn-sm btn-light",
                                  title: "Preview"
                                }, [
                                  createVNode("i", { class: "bi bi-eye text-primary" })
                                ], 8, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => validateDoc(`/program/expense/validate/${item.id}`, "Validasi bukti belanja ini?"),
                                  class: "btn btn-sm btn-light",
                                  title: "Validate"
                                }, [
                                  createVNode("i", { class: "bi bi-check-circle text-success" })
                                ], 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128)),
                        __props.pendingExpenseItems.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "4",
                            class: "text-center py-4 text-muted small"
                          }, "Tidak ada data pending.")
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "card shadow-sm mb-4 border-0" }, [
                  createVNode("div", { class: "card-header bg-white fw-bold d-flex justify-content-between align-items-center py-3" }, [
                    createVNode("span", null, "Pending Disbursement Items (Pencairan)"),
                    createVNode("span", { class: "badge bg-primary rounded-pill" }, toDisplayString(__props.pendingDisbursementItems.length), 1)
                  ]),
                  createVNode("div", { class: "table-responsive" }, [
                    createVNode("table", { class: "table align-middle mb-0" }, [
                      createVNode("thead", { class: "table-light" }, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Program"),
                          createVNode("th", null, "Name"),
                          createVNode("th", null, "Price"),
                          createVNode("th", { class: "text-center" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.pendingDisbursementItems, (item) => {
                          var _a, _b;
                          return openBlock(), createBlock("tr", {
                            key: item.id
                          }, [
                            createVNode("td", null, toDisplayString(((_a = item.program) == null ? void 0 : _a.name) || "-"), 1),
                            createVNode("td", null, toDisplayString(item.name), 1),
                            createVNode("td", { class: "fw-bold" }, "Rp " + toDisplayString((_b = item.price) == null ? void 0 : _b.toLocaleString("id-ID")), 1),
                            createVNode("td", { class: "text-center" }, [
                              createVNode("button", {
                                onClick: ($event) => previewDoc(`/storage/images/receipt/disbursement/${item.reciept}`),
                                class: "btn btn-sm btn-light",
                                title: "Preview"
                              }, [
                                createVNode("i", { class: "bi bi-eye text-primary" })
                              ], 8, ["onClick"])
                            ])
                          ]);
                        }), 128)),
                        __props.pendingDisbursementItems.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "4",
                            class: "text-center py-4 text-muted small"
                          }, "Tidak ada data pending.")
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "card shadow-sm border-0" }, [
                  createVNode("div", { class: "card-header bg-white fw-bold d-flex justify-content-between align-items-center py-3" }, [
                    createVNode("span", null, "Pending Disbursement Letters (Surat Pencairan)"),
                    createVNode("span", { class: "badge bg-primary rounded-pill" }, toDisplayString(__props.pendingDisbursementLetters.length), 1)
                  ]),
                  createVNode("div", { class: "table-responsive" }, [
                    createVNode("table", { class: "table align-middle mb-0" }, [
                      createVNode("thead", { class: "table-light" }, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Program"),
                          createVNode("th", null, "PIC"),
                          createVNode("th", null, "Waktu"),
                          createVNode("th", { class: "text-center" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.pendingDisbursementLetters, (item) => {
                          var _a, _b, _c, _d, _e;
                          return openBlock(), createBlock("tr", {
                            key: item.id
                          }, [
                            createVNode("td", null, [
                              createVNode("div", {
                                class: "fw-medium text-truncate",
                                style: { "max-width": "250px" }
                              }, toDisplayString(((_a = item.program) == null ? void 0 : _a.name) || "-"), 1),
                              createVNode("div", { class: "small text-muted" }, toDisplayString((_c = (_b = item.program) == null ? void 0 : _b.department) == null ? void 0 : _c.name), 1)
                            ]),
                            createVNode("td", null, toDisplayString((_e = (_d = item.program) == null ? void 0 : _d.pic) == null ? void 0 : _e.name), 1),
                            createVNode("td", { class: "small text-muted" }, toDisplayString(new Date(item.created_at).toLocaleString("id-ID")), 1),
                            createVNode("td", { class: "text-center" }, [
                              createVNode("div", { class: "d-flex justify-content-center gap-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => previewDoc(`/storage/document/letter/disbursement/${item.letter}`),
                                  class: "btn btn-sm btn-light",
                                  title: "Preview PDF"
                                }, [
                                  createVNode("i", { class: "bi bi-file-earmark-pdf text-danger" })
                                ], 8, ["onClick"]),
                                createVNode(unref(Link), {
                                  href: `/seeo/staff/program/${item.program_id}`,
                                  class: "btn btn-sm btn-light",
                                  title: "Proses Pencairan"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("i", { class: "bi bi-plus-circle text-success" })
                                  ]),
                                  _: 1
                                }, 8, ["href"])
                              ])
                            ])
                          ]);
                        }), 128)),
                        __props.pendingDisbursementLetters.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "4",
                            class: "text-center py-4 text-muted small"
                          }, "Tidak ada surat pending.")
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$1, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
              }, null, 512),
              createVNode("div", {
                class: "modal fade",
                id: "previewModal",
                tabindex: "-1",
                "aria-hidden": "true",
                ref_key: "previewModalRef",
                ref: previewModalRef
              }, [
                createVNode("div", { class: "modal-dialog modal-xl modal-dialog-centered" }, [
                  createVNode("div", { class: "modal-content border-0 shadow-lg" }, [
                    createVNode("div", { class: "modal-header bg-light" }, [
                      createVNode("h5", { class: "modal-title fw-bold" }, "Document Preview"),
                      createVNode("button", {
                        type: "button",
                        class: "btn-close",
                        "data-bs-dismiss": "modal",
                        "aria-label": "Close"
                      })
                    ]),
                    createVNode("div", {
                      class: "modal-body p-0 bg-secondary bg-opacity-10 d-flex justify-content-center align-items-center",
                      style: { "min-height": "400px", "max-height": "85vh", "overflow": "auto" }
                    }, [
                      previewUrl.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        isImage(previewUrl.value) ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: previewUrl.value,
                          class: "img-fluid shadow-sm",
                          alt: "Preview"
                        }, null, 8, ["src"])) : (openBlock(), createBlock("iframe", {
                          key: 1,
                          src: previewUrl.value,
                          class: "w-100",
                          style: { "height": "75vh" },
                          frameborder: "0"
                        }, null, 8, ["src"]))
                      ], 64)) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-muted"
                      }, "Loading..."))
                    ]),
                    createVNode("div", { class: "modal-footer bg-light py-2" }, [
                      createVNode("button", {
                        type: "button",
                        class: "btn btn-secondary btn-sm px-4",
                        "data-bs-dismiss": "modal"
                      }, "Tutup"),
                      createVNode("a", {
                        href: previewUrl.value,
                        target: "_blank",
                        class: "btn btn-outline-primary btn-sm px-4"
                      }, [
                        createVNode("i", { class: "bi bi-box-arrow-up-right me-1" }),
                        createTextVNode(" Tab Baru ")
                      ], 8, ["href"]),
                      currentValidateRoute.value ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: confirmFromPreview,
                        class: "btn btn-success btn-sm px-4"
                      }, [
                        createVNode("i", { class: "bi bi-check-circle me-1" }),
                        createTextVNode(" Validasi Sekarang ")
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ], 512)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/FinancePanel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FinancePanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0953a5ab"]]);
export {
  FinancePanel as default
};
//# sourceMappingURL=FinancePanel-DT7tuwlt.js.map
