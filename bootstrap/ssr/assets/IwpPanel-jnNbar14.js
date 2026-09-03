import { ref, onMounted, watch, withCtx, createVNode, withDirectives, withKeys, vModelText, openBlock, createBlock, createCommentVNode, toDisplayString, Fragment, renderList, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-BSa5kc_g.js";
import { router } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ModalConfirmation-CaKJYApU.js";
const _sfc_main = {
  __name: "IwpPanel",
  __ssrInlineRender: true,
  props: {
    pendingReceipts: { type: Array, default: () => [] },
    filters: { type: Object, default: () => ({ search: "" }) }
  },
  setup(__props) {
    const props = __props;
    const modalRef = ref(null);
    const selectedReceipt = ref(null);
    const search = ref(props.filters.search);
    let bootstrapModal = null;
    let searchTimeout = null;
    onMounted(() => {
      if (typeof window.bootstrap !== "undefined") {
        bootstrapModal = new window.bootstrap.Modal(modalRef.value);
      }
    });
    const handleSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        router.get("/seeo/staff/iwp/receipts", { search: search.value }, {
          preserveState: true,
          replace: true,
          preserveScroll: true
        });
      }, 500);
    };
    watch(search, () => {
      handleSearch();
    });
    function clearSearch() {
      search.value = "";
    }
    function showPreview(receipt) {
      selectedReceipt.value = receipt;
      if (bootstrapModal) bootstrapModal.show();
    }
    function confirmValidation() {
      if (!selectedReceipt.value) return;
      router.post(`/seeo/staff/iwp/receipts/${selectedReceipt.value.id}/validate`, {}, {
        preserveScroll: true,
        onSuccess: () => {
          if (bootstrapModal) bootstrapModal.hide();
          selectedReceipt.value = null;
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(StaffLayout, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`IWP Receipt Panel`);
          } else {
            return [
              createTextVNode("IWP Receipt Panel")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="container-fluid p-4" data-v-4101cbd6${_scopeId}><div class="row mb-4" data-v-4101cbd6${_scopeId}><div class="col-md-6 col-lg-4" data-v-4101cbd6${_scopeId}><div class="input-group shadow-sm rounded-lg overflow-hidden border-0" data-v-4101cbd6${_scopeId}><span class="input-group-text bg-white border-0 ps-3" data-v-4101cbd6${_scopeId}><i class="bi bi-search text-muted" data-v-4101cbd6${_scopeId}></i></span><input type="text"${ssrRenderAttr("value", search.value)} class="form-control border-0 py-2.5" placeholder="Search by staff name..." data-v-4101cbd6${_scopeId}>`);
            if (search.value) {
              _push2(`<button class="btn btn-white border-0 text-muted" data-v-4101cbd6${_scopeId}><i class="bi bi-x-lg" data-v-4101cbd6${_scopeId}></i></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="card shadow-sm border-0" data-v-4101cbd6${_scopeId}><div class="card-header bg-white py-3 d-flex justify-content-between align-items-center" data-v-4101cbd6${_scopeId}><h5 class="mb-0 fw-bold" data-v-4101cbd6${_scopeId}>Pending Staff Payment Receipts</h5><div class="d-flex align-items-center gap-3" data-v-4101cbd6${_scopeId}>`);
            if (__props.filters.search) {
              _push2(`<span class="small text-muted" data-v-4101cbd6${_scopeId}>Results for &quot;${ssrInterpolate(__props.filters.search)}&quot;</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="badge bg-primary px-3 rounded-pill" data-v-4101cbd6${_scopeId}>${ssrInterpolate(__props.pendingReceipts.length)}</span></div></div><div class="table-responsive" data-v-4101cbd6${_scopeId}><table class="table mb-0 align-middle table-hover" data-v-4101cbd6${_scopeId}><thead class="table-light" data-v-4101cbd6${_scopeId}><tr data-v-4101cbd6${_scopeId}><th data-v-4101cbd6${_scopeId}>Employee</th><th class="text-center" data-v-4101cbd6${_scopeId}>Months</th><th data-v-4101cbd6${_scopeId}>Receipt File</th><th class="text-end px-4" data-v-4101cbd6${_scopeId}>Action</th></tr></thead><tbody data-v-4101cbd6${_scopeId}><!--[-->`);
            ssrRenderList(__props.pendingReceipts, (receipt) => {
              var _a2, _b2;
              _push2(`<tr data-v-4101cbd6${_scopeId}><td class="fw-medium" data-v-4101cbd6${_scopeId}>${ssrInterpolate(((_b2 = (_a2 = receipt.contribution) == null ? void 0 : _a2.employee) == null ? void 0 : _b2.name) || "-")}</td><td class="text-center" data-v-4101cbd6${_scopeId}><span class="badge bg-info-subtle text-info border border-info-subtle px-3" data-v-4101cbd6${_scopeId}>${ssrInterpolate(receipt.months)}</span></td><td class="text-muted small" data-v-4101cbd6${_scopeId}>${ssrInterpolate(receipt.receipt)}</td><td class="text-end px-4" data-v-4101cbd6${_scopeId}><button class="btn btn-sm btn-primary px-3" data-v-4101cbd6${_scopeId}><i class="bi bi-eye me-1" data-v-4101cbd6${_scopeId}></i> Preview &amp; Validate </button></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.pendingReceipts.length === 0) {
              _push2(`<tr data-v-4101cbd6${_scopeId}><td colspan="4" class="text-center text-muted py-5 italic" data-v-4101cbd6${_scopeId}><i class="bi bi-check2-circle d-block mb-2 fs-2 text-success" data-v-4101cbd6${_scopeId}></i> No pending receipts. All staff payments are validated. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div><div class="modal fade shadow-lg" id="receiptModal" tabindex="-1" data-v-4101cbd6${_scopeId}><div class="modal-dialog modal-dialog-centered" data-v-4101cbd6${_scopeId}><div class="modal-content border-0" data-v-4101cbd6${_scopeId}><div class="modal-header bg-dark text-white border-0" data-v-4101cbd6${_scopeId}><h5 class="modal-title fw-bold" data-v-4101cbd6${_scopeId}>Receipt Preview</h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" data-v-4101cbd6${_scopeId}></button></div><div class="modal-body p-0 bg-light d-flex align-items-center justify-content-center min-vh-50" style="${ssrRenderStyle({ "overflow": "hidden" })}" data-v-4101cbd6${_scopeId}>`);
            if ((_a = selectedReceipt.value) == null ? void 0 : _a.image_url) {
              _push2(`<img${ssrRenderAttr("src", selectedReceipt.value.image_url)} class="img-fluid shadow-sm" style="${ssrRenderStyle({ "max-height": "70vh", "object-fit": "contain" })}" data-v-4101cbd6${_scopeId}>`);
            } else {
              _push2(`<div class="p-5 text-center text-muted" data-v-4101cbd6${_scopeId}><i class="bi bi-image fs-1 mb-3" data-v-4101cbd6${_scopeId}></i><p data-v-4101cbd6${_scopeId}>Image not available</p></div>`);
            }
            _push2(`</div>`);
            if (selectedReceipt.value) {
              _push2(`<div class="p-3 bg-white border-top" data-v-4101cbd6${_scopeId}><div class="d-flex justify-content-between align-items-center mb-3" data-v-4101cbd6${_scopeId}><div data-v-4101cbd6${_scopeId}><div class="small text-muted uppercase fw-bold tracking-wider" data-v-4101cbd6${_scopeId}>Employee</div><div class="fw-bold fs-5" data-v-4101cbd6${_scopeId}>${ssrInterpolate((_c = (_b = selectedReceipt.value.contribution) == null ? void 0 : _b.employee) == null ? void 0 : _c.name)}</div></div><div class="text-end" data-v-4101cbd6${_scopeId}><div class="small text-muted uppercase fw-bold tracking-wider" data-v-4101cbd6${_scopeId}>Payment Period</div><div class="badge bg-primary fs-6" data-v-4101cbd6${_scopeId}>${ssrInterpolate(selectedReceipt.value.months)} Months</div></div></div><div class="d-grid" data-v-4101cbd6${_scopeId}><button class="btn btn-success py-2 fw-bold shadow-sm" data-v-4101cbd6${_scopeId}><i class="bi bi-check-lg me-2" data-v-4101cbd6${_scopeId}></i> Confirm Validation </button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-fluid p-4" }, [
                createVNode("div", { class: "row mb-4" }, [
                  createVNode("div", { class: "col-md-6 col-lg-4" }, [
                    createVNode("div", { class: "input-group shadow-sm rounded-lg overflow-hidden border-0" }, [
                      createVNode("span", { class: "input-group-text bg-white border-0 ps-3" }, [
                        createVNode("i", { class: "bi bi-search text-muted" })
                      ]),
                      withDirectives(createVNode("input", {
                        type: "text",
                        "onUpdate:modelValue": ($event) => search.value = $event,
                        class: "form-control border-0 py-2.5",
                        placeholder: "Search by staff name...",
                        onKeyup: withKeys(handleSearch, ["enter"])
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, search.value]
                      ]),
                      search.value ? (openBlock(), createBlock("button", {
                        key: 0,
                        class: "btn btn-white border-0 text-muted",
                        onClick: clearSearch
                      }, [
                        createVNode("i", { class: "bi bi-x-lg" })
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                createVNode("div", { class: "card shadow-sm border-0" }, [
                  createVNode("div", { class: "card-header bg-white py-3 d-flex justify-content-between align-items-center" }, [
                    createVNode("h5", { class: "mb-0 fw-bold" }, "Pending Staff Payment Receipts"),
                    createVNode("div", { class: "d-flex align-items-center gap-3" }, [
                      __props.filters.search ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "small text-muted"
                      }, 'Results for "' + toDisplayString(__props.filters.search) + '"', 1)) : createCommentVNode("", true),
                      createVNode("span", { class: "badge bg-primary px-3 rounded-pill" }, toDisplayString(__props.pendingReceipts.length), 1)
                    ])
                  ]),
                  createVNode("div", { class: "table-responsive" }, [
                    createVNode("table", { class: "table mb-0 align-middle table-hover" }, [
                      createVNode("thead", { class: "table-light" }, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Employee"),
                          createVNode("th", { class: "text-center" }, "Months"),
                          createVNode("th", null, "Receipt File"),
                          createVNode("th", { class: "text-end px-4" }, "Action")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.pendingReceipts, (receipt) => {
                          var _a2, _b2;
                          return openBlock(), createBlock("tr", {
                            key: receipt.id
                          }, [
                            createVNode("td", { class: "fw-medium" }, toDisplayString(((_b2 = (_a2 = receipt.contribution) == null ? void 0 : _a2.employee) == null ? void 0 : _b2.name) || "-"), 1),
                            createVNode("td", { class: "text-center" }, [
                              createVNode("span", { class: "badge bg-info-subtle text-info border border-info-subtle px-3" }, toDisplayString(receipt.months), 1)
                            ]),
                            createVNode("td", { class: "text-muted small" }, toDisplayString(receipt.receipt), 1),
                            createVNode("td", { class: "text-end px-4" }, [
                              createVNode("button", {
                                class: "btn btn-sm btn-primary px-3",
                                onClick: ($event) => showPreview(receipt)
                              }, [
                                createVNode("i", { class: "bi bi-eye me-1" }),
                                createTextVNode(" Preview & Validate ")
                              ], 8, ["onClick"])
                            ])
                          ]);
                        }), 128)),
                        __props.pendingReceipts.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "4",
                            class: "text-center text-muted py-5 italic"
                          }, [
                            createVNode("i", { class: "bi bi-check2-circle d-block mb-2 fs-2 text-success" }),
                            createTextVNode(" No pending receipts. All staff payments are validated. ")
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal fade shadow-lg",
                id: "receiptModal",
                tabindex: "-1",
                ref_key: "modalRef",
                ref: modalRef
              }, [
                createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                  createVNode("div", { class: "modal-content border-0" }, [
                    createVNode("div", { class: "modal-header bg-dark text-white border-0" }, [
                      createVNode("h5", { class: "modal-title fw-bold" }, "Receipt Preview"),
                      createVNode("button", {
                        type: "button",
                        class: "btn-close btn-close-white",
                        "data-bs-dismiss": "modal"
                      })
                    ]),
                    createVNode("div", {
                      class: "modal-body p-0 bg-light d-flex align-items-center justify-content-center min-vh-50",
                      style: { "overflow": "hidden" }
                    }, [
                      ((_d = selectedReceipt.value) == null ? void 0 : _d.image_url) ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: selectedReceipt.value.image_url,
                        class: "img-fluid shadow-sm",
                        style: { "max-height": "70vh", "object-fit": "contain" }
                      }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "p-5 text-center text-muted"
                      }, [
                        createVNode("i", { class: "bi bi-image fs-1 mb-3" }),
                        createVNode("p", null, "Image not available")
                      ]))
                    ]),
                    selectedReceipt.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "p-3 bg-white border-top"
                    }, [
                      createVNode("div", { class: "d-flex justify-content-between align-items-center mb-3" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "small text-muted uppercase fw-bold tracking-wider" }, "Employee"),
                          createVNode("div", { class: "fw-bold fs-5" }, toDisplayString((_f = (_e = selectedReceipt.value.contribution) == null ? void 0 : _e.employee) == null ? void 0 : _f.name), 1)
                        ]),
                        createVNode("div", { class: "text-end" }, [
                          createVNode("div", { class: "small text-muted uppercase fw-bold tracking-wider" }, "Payment Period"),
                          createVNode("div", { class: "badge bg-primary fs-6" }, toDisplayString(selectedReceipt.value.months) + " Months", 1)
                        ])
                      ]),
                      createVNode("div", { class: "d-grid" }, [
                        createVNode("button", {
                          class: "btn btn-success py-2 fw-bold shadow-sm",
                          onClick: confirmValidation
                        }, [
                          createVNode("i", { class: "bi bi-check-lg me-2" }),
                          createTextVNode(" Confirm Validation ")
                        ])
                      ])
                    ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/IwpPanel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const IwpPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4101cbd6"]]);
export {
  IwpPanel as default
};
//# sourceMappingURL=IwpPanel-jnNbar14.js.map
