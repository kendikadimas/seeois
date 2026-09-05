import { ref, computed, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, Fragment, renderList, withDirectives, vModelText, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-kVLGS8T_.js";
import { _ as _sfc_main$1 } from "./Notif-DL0SggHu.js";
import { Head, router } from "@inertiajs/vue3";
import { b as formatDateOnly, c as formatTime } from "./utils-DIF4pdrF.js";
import "./ModalConfirmation-CaKJYApU.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
import "date-fns";
const _sfc_main = {
  __name: "OperatingPanel",
  __ssrInlineRender: true,
  props: {
    logs: {
      type: Array,
      default: () => []
    },
    staffSummary: {
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
    const props = __props;
    const logSearch = ref("");
    const validationFilter = ref("all");
    const filteredLogs = computed(() => {
      const keyword = logSearch.value.trim().toLowerCase();
      return props.logs.filter((log) => {
        var _a, _b;
        const statusMatch = validationFilter.value === "all" || validationFilter.value === "validated" && log.validated || validationFilter.value === "pending" && !log.validated;
        if (!statusMatch) return false;
        if (!keyword) return true;
        const haystack = [(_a = log.employee) == null ? void 0 : _a.name, (_b = log.program) == null ? void 0 : _b.name, log.title].filter(Boolean).join(" ").toLowerCase();
        return haystack.includes(keyword);
      });
    });
    const totalLogs = computed(() => props.logs.length);
    const validatedLogs = computed(() => props.logs.filter((log) => log.validated).length);
    const pendingLogs = computed(() => props.logs.filter((log) => !log.validated).length);
    function toggleValidation(logId) {
      router.post(`/seeo/staff/logbook/validate/${logId}`, {}, { preserveScroll: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Operating Panel" }, null, _parent));
      _push(ssrRenderComponent(StaffLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container-fluid py-4"${_scopeId}>`);
            if (__props.notif) {
              _push2(ssrRenderComponent(_sfc_main$1, { notif: __props.notif }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="row g-4"${_scopeId}><div class="col-12"${_scopeId}><div class="row g-3 mb-3"${_scopeId}><div class="col-12 col-md-4"${_scopeId}><div class="card border-0 shadow-sm h-100"${_scopeId}><div class="card-body"${_scopeId}><div class="text-muted small"${_scopeId}>Total Logbook</div><div class="fs-3 fw-bold"${_scopeId}>${ssrInterpolate(totalLogs.value)}</div></div></div></div><div class="col-12 col-md-4"${_scopeId}><div class="card border-0 shadow-sm h-100"${_scopeId}><div class="card-body"${_scopeId}><div class="text-muted small"${_scopeId}>Sudah Valid</div><div class="fs-3 fw-bold"${_scopeId}>${ssrInterpolate(validatedLogs.value)}</div></div></div></div><div class="col-12 col-md-4"${_scopeId}><div class="card border-0 shadow-sm h-100"${_scopeId}><div class="card-body"${_scopeId}><div class="text-muted small"${_scopeId}>Menunggu Validasi</div><div class="fs-3 fw-bold"${_scopeId}>${ssrInterpolate(pendingLogs.value)}</div></div></div></div></div><div class="card border-0 shadow-sm"${_scopeId}><div class="card-body"${_scopeId}><h4 class="mb-1"${_scopeId}>Operating Panel</h4><p class="text-muted mb-0"${_scopeId}>Pantau semua logbook staff dan validasi logbook yang masuk.</p></div></div></div><div class="col-12 col-xl-4"${_scopeId}><div class="card border-0 shadow-sm h-100"${_scopeId}><div class="card-header bg-transparent border-0 pt-4 pb-0"${_scopeId}><h5 class="mb-0"${_scopeId}>Ringkasan Staff</h5></div><div class="card-body"${_scopeId}><!--[-->`);
            ssrRenderList(__props.staffSummary, (staff) => {
              _push2(`<div class="d-flex justify-content-between py-2 border-bottom"${_scopeId}><div${_scopeId}><div class="fw-semibold"${_scopeId}>${ssrInterpolate(staff.name)}</div><div class="text-muted small"${_scopeId}>Role ${ssrInterpolate(staff.roles_id)}</div></div><span class="badge bg-primary"${_scopeId}>${ssrInterpolate(staff.logbooks_count)}</span></div>`);
            });
            _push2(`<!--]-->`);
            if (!__props.staffSummary.length) {
              _push2(`<div class="text-muted"${_scopeId}>Belum ada logbook yang diupload.</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="col-12 col-xl-8"${_scopeId}><div class="card border-0 shadow-sm"${_scopeId}><div class="card-header bg-transparent border-0 pt-4 pb-0"${_scopeId}><h5 class="mb-0"${_scopeId}>Semua Logbook</h5></div><div class="card-body table-responsive"${_scopeId}><div class="row g-2 mb-3"${_scopeId}><div class="col-md-5"${_scopeId}><input${ssrRenderAttr("value", logSearch.value)} type="search" class="form-control" placeholder="Cari staff, program, atau judul"${_scopeId}></div><div class="col-md-4"${_scopeId}><select class="form-select"${_scopeId}><option value="all"${ssrIncludeBooleanAttr(Array.isArray(validationFilter.value) ? ssrLooseContain(validationFilter.value, "all") : ssrLooseEqual(validationFilter.value, "all")) ? " selected" : ""}${_scopeId}>Semua status</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(validationFilter.value) ? ssrLooseContain(validationFilter.value, "pending") : ssrLooseEqual(validationFilter.value, "pending")) ? " selected" : ""}${_scopeId}>Menunggu validasi</option><option value="validated"${ssrIncludeBooleanAttr(Array.isArray(validationFilter.value) ? ssrLooseContain(validationFilter.value, "validated") : ssrLooseEqual(validationFilter.value, "validated")) ? " selected" : ""}${_scopeId}>Sudah valid</option></select></div><div class="col-md-3 text-md-end"${_scopeId}><button class="btn btn-outline-secondary w-100"${_scopeId}>Reset Filter</button></div></div><table class="table align-middle"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Staff</th><th${_scopeId}>Program</th><th${_scopeId}>Judul</th><th${_scopeId}>Tanggal</th><th${_scopeId}>Status</th><th${_scopeId}></th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(filteredLogs.value, (log) => {
              var _a, _b;
              _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(((_a = log.employee) == null ? void 0 : _a.name) ?? "-")}</td><td${_scopeId}>${ssrInterpolate(((_b = log.program) == null ? void 0 : _b.name) ?? "-")}</td><td${_scopeId}>${ssrInterpolate(log.title)}</td><td${_scopeId}>${ssrInterpolate(unref(formatDateOnly)(log.date_time))} ${ssrInterpolate(unref(formatTime)(log.date_time))}</td><td${_scopeId}><span class="${ssrRenderClass([log.validated ? "bg-success" : "bg-warning text-dark", "badge"])}"${_scopeId}>${ssrInterpolate(log.validated ? "Valid" : "Menunggu")}</span></td><td class="text-end"${_scopeId}><button class="btn btn-outline-primary btn-sm"${_scopeId}>${ssrInterpolate(log.validated ? "Batal Validasi" : "Validasi")}</button></td></tr>`);
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
                    createVNode("div", { class: "row g-3 mb-3" }, [
                      createVNode("div", { class: "col-12 col-md-4" }, [
                        createVNode("div", { class: "card border-0 shadow-sm h-100" }, [
                          createVNode("div", { class: "card-body" }, [
                            createVNode("div", { class: "text-muted small" }, "Total Logbook"),
                            createVNode("div", { class: "fs-3 fw-bold" }, toDisplayString(totalLogs.value), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "col-12 col-md-4" }, [
                        createVNode("div", { class: "card border-0 shadow-sm h-100" }, [
                          createVNode("div", { class: "card-body" }, [
                            createVNode("div", { class: "text-muted small" }, "Sudah Valid"),
                            createVNode("div", { class: "fs-3 fw-bold" }, toDisplayString(validatedLogs.value), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "col-12 col-md-4" }, [
                        createVNode("div", { class: "card border-0 shadow-sm h-100" }, [
                          createVNode("div", { class: "card-body" }, [
                            createVNode("div", { class: "text-muted small" }, "Menunggu Validasi"),
                            createVNode("div", { class: "fs-3 fw-bold" }, toDisplayString(pendingLogs.value), 1)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "card border-0 shadow-sm" }, [
                      createVNode("div", { class: "card-body" }, [
                        createVNode("h4", { class: "mb-1" }, "Operating Panel"),
                        createVNode("p", { class: "text-muted mb-0" }, "Pantau semua logbook staff dan validasi logbook yang masuk.")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "col-12 col-xl-4" }, [
                    createVNode("div", { class: "card border-0 shadow-sm h-100" }, [
                      createVNode("div", { class: "card-header bg-transparent border-0 pt-4 pb-0" }, [
                        createVNode("h5", { class: "mb-0" }, "Ringkasan Staff")
                      ]),
                      createVNode("div", { class: "card-body" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.staffSummary, (staff) => {
                          return openBlock(), createBlock("div", {
                            key: staff.id,
                            class: "d-flex justify-content-between py-2 border-bottom"
                          }, [
                            createVNode("div", null, [
                              createVNode("div", { class: "fw-semibold" }, toDisplayString(staff.name), 1),
                              createVNode("div", { class: "text-muted small" }, "Role " + toDisplayString(staff.roles_id), 1)
                            ]),
                            createVNode("span", { class: "badge bg-primary" }, toDisplayString(staff.logbooks_count), 1)
                          ]);
                        }), 128)),
                        !__props.staffSummary.length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-muted"
                        }, "Belum ada logbook yang diupload.")) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "col-12 col-xl-8" }, [
                    createVNode("div", { class: "card border-0 shadow-sm" }, [
                      createVNode("div", { class: "card-header bg-transparent border-0 pt-4 pb-0" }, [
                        createVNode("h5", { class: "mb-0" }, "Semua Logbook")
                      ]),
                      createVNode("div", { class: "card-body table-responsive" }, [
                        createVNode("div", { class: "row g-2 mb-3" }, [
                          createVNode("div", { class: "col-md-5" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => logSearch.value = $event,
                              type: "search",
                              class: "form-control",
                              placeholder: "Cari staff, program, atau judul"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, logSearch.value]
                            ])
                          ]),
                          createVNode("div", { class: "col-md-4" }, [
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => validationFilter.value = $event,
                              class: "form-select"
                            }, [
                              createVNode("option", { value: "all" }, "Semua status"),
                              createVNode("option", { value: "pending" }, "Menunggu validasi"),
                              createVNode("option", { value: "validated" }, "Sudah valid")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, validationFilter.value]
                            ])
                          ]),
                          createVNode("div", { class: "col-md-3 text-md-end" }, [
                            createVNode("button", {
                              class: "btn btn-outline-secondary w-100",
                              onClick: ($event) => {
                                logSearch.value = "";
                                validationFilter.value = "all";
                              }
                            }, "Reset Filter", 8, ["onClick"])
                          ])
                        ]),
                        createVNode("table", { class: "table align-middle" }, [
                          createVNode("thead", null, [
                            createVNode("tr", null, [
                              createVNode("th", null, "Staff"),
                              createVNode("th", null, "Program"),
                              createVNode("th", null, "Judul"),
                              createVNode("th", null, "Tanggal"),
                              createVNode("th", null, "Status"),
                              createVNode("th")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredLogs.value, (log) => {
                              var _a, _b;
                              return openBlock(), createBlock("tr", {
                                key: log.id
                              }, [
                                createVNode("td", null, toDisplayString(((_a = log.employee) == null ? void 0 : _a.name) ?? "-"), 1),
                                createVNode("td", null, toDisplayString(((_b = log.program) == null ? void 0 : _b.name) ?? "-"), 1),
                                createVNode("td", null, toDisplayString(log.title), 1),
                                createVNode("td", null, toDisplayString(unref(formatDateOnly)(log.date_time)) + " " + toDisplayString(unref(formatTime)(log.date_time)), 1),
                                createVNode("td", null, [
                                  createVNode("span", {
                                    class: ["badge", log.validated ? "bg-success" : "bg-warning text-dark"]
                                  }, toDisplayString(log.validated ? "Valid" : "Menunggu"), 3)
                                ]),
                                createVNode("td", { class: "text-end" }, [
                                  createVNode("button", {
                                    class: "btn btn-outline-primary btn-sm",
                                    onClick: ($event) => toggleValidation(log.id)
                                  }, toDisplayString(log.validated ? "Batal Validasi" : "Validasi"), 9, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/OperatingPanel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=OperatingPanel-EU1I2tS7.js.map
