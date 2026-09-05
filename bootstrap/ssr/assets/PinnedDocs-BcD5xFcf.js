import { ref, onMounted, withCtx, unref, createVNode, openBlock, createBlock, withModifiers, withDirectives, vModelText, createTextVNode, createCommentVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-kVLGS8T_.js";
import { useForm } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ModalConfirmation-CaKJYApU.js";
const _sfc_main = {
  __name: "PinnedDocs",
  __ssrInlineRender: true,
  props: {
    pinnedDocs: Array,
    defaultYear: Number
  },
  setup(__props) {
    const props = __props;
    const pinnedDocs = ref(props.pinnedDocs || []);
    const showAdd = ref(false);
    const processing = ref(false);
    const form = useForm({
      title: "",
      document: null,
      link: "",
      pinned_year: props.defaultYear ?? (/* @__PURE__ */ new Date()).getFullYear(),
      type: 1
    });
    function onFile(e) {
      form.document = e.target.files[0] || null;
    }
    const editForm = useForm({
      id: null,
      title: "",
      document: null,
      link: "",
      pinned_year: props.defaultYear ?? (/* @__PURE__ */ new Date()).getFullYear()
    });
    function onEditFile(e) {
      editForm.document = e.target.files[0] || null;
    }
    function submitAdd() {
      processing.value = true;
      form.post("/seeo/staff/pinned-docs", {
        onSuccess: () => location.reload(),
        onFinish: () => processing.value = false
      });
    }
    function startEdit(doc) {
      editForm.id = doc.id;
      editForm.title = doc.title;
      editForm.link = doc.link || "";
      editForm.pinned_year = doc.pinned_year;
      const modalEl = document.getElementById("editModal");
      if (modalEl && window.bootstrap) window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
    function submitEdit() {
      processing.value = true;
      editForm.transform((data) => ({ ...data, _method: "put" })).post("/seeo/staff/pinned-docs/" + editForm.id, {
        onSuccess: () => location.reload(),
        onFinish: () => processing.value = false
      });
    }
    function remove(id) {
      if (!confirm("Hapus dokumen ini?")) return;
      const f = useForm();
      f.delete("/seeo/staff/pinned-docs/" + id, { onSuccess: () => location.reload() });
    }
    onMounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(StaffLayout, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Dokumen Penting (Pinned Documents)`);
          } else {
            return [
              createTextVNode("Dokumen Penting (Pinned Documents)")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container-fluid p-4" data-v-62bda611${_scopeId}><div class="card shadow-sm" data-v-62bda611${_scopeId}><div class="card-header d-flex justify-content-between align-items-center" data-v-62bda611${_scopeId}><h5 class="mb-0" data-v-62bda611${_scopeId}>Daftar Dokumen Penting</h5><button class="btn btn-primary" data-v-62bda611${_scopeId}>Tambah Dokumen</button></div><div class="card-body" data-v-62bda611${_scopeId}>`);
            if (showAdd.value) {
              _push2(`<div class="mb-4 p-3 border rounded bg-light" data-v-62bda611${_scopeId}><h6 data-v-62bda611${_scopeId}>Tambah Dokumen Penting</h6><form enctype="multipart/form-data" data-v-62bda611${_scopeId}><div class="row g-2" data-v-62bda611${_scopeId}><div class="col-md-6" data-v-62bda611${_scopeId}><label class="form-label" data-v-62bda611${_scopeId}>Judul</label><input${ssrRenderAttr("value", unref(form).title)} class="form-control" required data-v-62bda611${_scopeId}></div><div class="col-md-6" data-v-62bda611${_scopeId}><label class="form-label" data-v-62bda611${_scopeId}>Tahun <small class="text-muted" data-v-62bda611${_scopeId}>(opsional)</small></label><input${ssrRenderAttr("value", unref(form).pinned_year)} type="number" class="form-control" placeholder="cth: 2025" min="2000" max="2099" data-v-62bda611${_scopeId}></div><div class="col-md-6" data-v-62bda611${_scopeId}><label class="form-label" data-v-62bda611${_scopeId}>File Dokumen (PDF/DOC)</label><input type="file" accept=".pdf,.doc,.docx" class="form-control" data-v-62bda611${_scopeId}></div><div class="col-md-6" data-v-62bda611${_scopeId}><label class="form-label" data-v-62bda611${_scopeId}>Link (opsional)</label><input${ssrRenderAttr("value", unref(form).link)} type="url" class="form-control" placeholder="https://..." data-v-62bda611${_scopeId}></div><div class="col-12 mt-2 text-end" data-v-62bda611${_scopeId}><button class="btn btn-secondary me-2" data-v-62bda611${_scopeId}>Batal</button><button class="btn btn-success"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} data-v-62bda611${_scopeId}>Simpan</button></div></div></form></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (pinnedDocs.value && pinnedDocs.value.length) {
              _push2(`<div class="table-responsive" data-v-62bda611${_scopeId}><table class="table table-hover" data-v-62bda611${_scopeId}><thead class="table-light" data-v-62bda611${_scopeId}><tr data-v-62bda611${_scopeId}><th data-v-62bda611${_scopeId}>Judul</th><th data-v-62bda611${_scopeId}>Tahun</th><th data-v-62bda611${_scopeId}>Tipe</th><th data-v-62bda611${_scopeId}>File</th><th data-v-62bda611${_scopeId}>Link</th><th data-v-62bda611${_scopeId}>Pembuat</th><th data-v-62bda611${_scopeId}>Aksi</th></tr></thead><tbody data-v-62bda611${_scopeId}><!--[-->`);
              ssrRenderList(pinnedDocs.value, (doc) => {
                var _a;
                _push2(`<tr data-v-62bda611${_scopeId}><td data-v-62bda611${_scopeId}>${ssrInterpolate(doc.title)}</td><td data-v-62bda611${_scopeId}><span class="badge bg-secondary" data-v-62bda611${_scopeId}>${ssrInterpolate(doc.pinned_year)}</span></td><td data-v-62bda611${_scopeId}><small class="text-muted" data-v-62bda611${_scopeId}>${ssrInterpolate(doc.type)}</small></td><td data-v-62bda611${_scopeId}>`);
                if (doc.document) {
                  _push2(`<a${ssrRenderAttr("href", `/storage/local/${doc.document}`)} target="_blank" class="btn btn-sm btn-outline-secondary" data-v-62bda611${_scopeId}>Unduh</a>`);
                } else {
                  _push2(`<small class="text-muted" data-v-62bda611${_scopeId}>-</small>`);
                }
                _push2(`</td><td data-v-62bda611${_scopeId}>`);
                if (doc.link) {
                  _push2(`<a${ssrRenderAttr("href", doc.link)} target="_blank" class="btn btn-sm btn-outline-info" data-v-62bda611${_scopeId}>Buka</a>`);
                } else {
                  _push2(`<small class="text-muted" data-v-62bda611${_scopeId}>-</small>`);
                }
                _push2(`</td><td data-v-62bda611${_scopeId}><small data-v-62bda611${_scopeId}>${ssrInterpolate(((_a = doc.user) == null ? void 0 : _a.name) || "N/A")}</small></td><td data-v-62bda611${_scopeId}><button class="btn btn-sm btn-outline-primary" data-v-62bda611${_scopeId}>Edit</button><button class="btn btn-sm btn-outline-danger ms-1" data-v-62bda611${_scopeId}>Hapus</button></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            } else {
              _push2(`<div class="alert alert-info" data-v-62bda611${_scopeId}>Belum ada dokumen penting yang ditambahkan.</div>`);
            }
            _push2(`</div></div></div><div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true" data-v-62bda611${_scopeId}><div class="modal-dialog modal-lg modal-dialog-centered" data-v-62bda611${_scopeId}><div class="modal-content" data-v-62bda611${_scopeId}><form enctype="multipart/form-data" data-v-62bda611${_scopeId}><div class="modal-header" data-v-62bda611${_scopeId}><h5 class="modal-title" data-v-62bda611${_scopeId}>Edit Dokumen Penting</h5><button type="button" class="btn-close" data-bs-dismiss="modal" data-v-62bda611${_scopeId}></button></div><div class="modal-body" data-v-62bda611${_scopeId}><div class="mb-3" data-v-62bda611${_scopeId}><label class="form-label" data-v-62bda611${_scopeId}>Judul</label><input${ssrRenderAttr("value", unref(editForm).title)} class="form-control" required data-v-62bda611${_scopeId}></div><div class="mb-3" data-v-62bda611${_scopeId}><label class="form-label" data-v-62bda611${_scopeId}>Tahun <small class="text-muted" data-v-62bda611${_scopeId}>(opsional)</small></label><input${ssrRenderAttr("value", unref(editForm).pinned_year)} type="number" class="form-control" placeholder="cth: 2025" min="2000" max="2099" data-v-62bda611${_scopeId}></div><div class="mb-3" data-v-62bda611${_scopeId}><label class="form-label" data-v-62bda611${_scopeId}>File Dokumen (PDF/DOC)</label><input type="file" accept=".pdf,.doc,.docx" class="form-control" data-v-62bda611${_scopeId}><small class="text-muted d-block mt-1" data-v-62bda611${_scopeId}>Kosongkan jika tidak ingin mengubah file</small></div><div class="mb-3" data-v-62bda611${_scopeId}><label class="form-label" data-v-62bda611${_scopeId}>Link (opsional)</label><input${ssrRenderAttr("value", unref(editForm).link)} type="url" class="form-control" data-v-62bda611${_scopeId}></div></div><div class="modal-footer" data-v-62bda611${_scopeId}><button class="btn btn-secondary" data-bs-dismiss="modal" data-v-62bda611${_scopeId}>Batal</button><button class="btn btn-primary"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} data-v-62bda611${_scopeId}>Simpan Perubahan</button></div></form></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-fluid p-4" }, [
                createVNode("div", { class: "card shadow-sm" }, [
                  createVNode("div", { class: "card-header d-flex justify-content-between align-items-center" }, [
                    createVNode("h5", { class: "mb-0" }, "Daftar Dokumen Penting"),
                    createVNode("button", {
                      class: "btn btn-primary",
                      onClick: ($event) => showAdd.value = !showAdd.value
                    }, "Tambah Dokumen", 8, ["onClick"])
                  ]),
                  createVNode("div", { class: "card-body" }, [
                    showAdd.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-4 p-3 border rounded bg-light"
                    }, [
                      createVNode("h6", null, "Tambah Dokumen Penting"),
                      createVNode("form", {
                        onSubmit: withModifiers(submitAdd, ["prevent"]),
                        enctype: "multipart/form-data"
                      }, [
                        createVNode("div", { class: "row g-2" }, [
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("label", { class: "form-label" }, "Judul"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).title = $event,
                              class: "form-control",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).title]
                            ])
                          ]),
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("label", { class: "form-label" }, [
                              createTextVNode("Tahun "),
                              createVNode("small", { class: "text-muted" }, "(opsional)")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).pinned_year = $event,
                              type: "number",
                              class: "form-control",
                              placeholder: "cth: 2025",
                              min: "2000",
                              max: "2099"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [
                                vModelText,
                                unref(form).pinned_year,
                                void 0,
                                { number: true }
                              ]
                            ])
                          ]),
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("label", { class: "form-label" }, "File Dokumen (PDF/DOC)"),
                            createVNode("input", {
                              type: "file",
                              onChange: onFile,
                              accept: ".pdf,.doc,.docx",
                              class: "form-control"
                            }, null, 32)
                          ]),
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("label", { class: "form-label" }, "Link (opsional)"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).link = $event,
                              type: "url",
                              class: "form-control",
                              placeholder: "https://..."
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).link]
                            ])
                          ]),
                          createVNode("div", { class: "col-12 mt-2 text-end" }, [
                            createVNode("button", {
                              class: "btn btn-secondary me-2",
                              onClick: ($event) => showAdd.value = false
                            }, "Batal", 8, ["onClick"]),
                            createVNode("button", {
                              class: "btn btn-success",
                              disabled: processing.value
                            }, "Simpan", 8, ["disabled"])
                          ])
                        ])
                      ], 32)
                    ])) : createCommentVNode("", true),
                    pinnedDocs.value && pinnedDocs.value.length ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "table-responsive"
                    }, [
                      createVNode("table", { class: "table table-hover" }, [
                        createVNode("thead", { class: "table-light" }, [
                          createVNode("tr", null, [
                            createVNode("th", null, "Judul"),
                            createVNode("th", null, "Tahun"),
                            createVNode("th", null, "Tipe"),
                            createVNode("th", null, "File"),
                            createVNode("th", null, "Link"),
                            createVNode("th", null, "Pembuat"),
                            createVNode("th", null, "Aksi")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(pinnedDocs.value, (doc) => {
                            var _a;
                            return openBlock(), createBlock("tr", {
                              key: doc.id
                            }, [
                              createVNode("td", null, toDisplayString(doc.title), 1),
                              createVNode("td", null, [
                                createVNode("span", { class: "badge bg-secondary" }, toDisplayString(doc.pinned_year), 1)
                              ]),
                              createVNode("td", null, [
                                createVNode("small", { class: "text-muted" }, toDisplayString(doc.type), 1)
                              ]),
                              createVNode("td", null, [
                                doc.document ? (openBlock(), createBlock("a", {
                                  key: 0,
                                  href: `/storage/local/${doc.document}`,
                                  target: "_blank",
                                  class: "btn btn-sm btn-outline-secondary"
                                }, "Unduh", 8, ["href"])) : (openBlock(), createBlock("small", {
                                  key: 1,
                                  class: "text-muted"
                                }, "-"))
                              ]),
                              createVNode("td", null, [
                                doc.link ? (openBlock(), createBlock("a", {
                                  key: 0,
                                  href: doc.link,
                                  target: "_blank",
                                  class: "btn btn-sm btn-outline-info"
                                }, "Buka", 8, ["href"])) : (openBlock(), createBlock("small", {
                                  key: 1,
                                  class: "text-muted"
                                }, "-"))
                              ]),
                              createVNode("td", null, [
                                createVNode("small", null, toDisplayString(((_a = doc.user) == null ? void 0 : _a.name) || "N/A"), 1)
                              ]),
                              createVNode("td", null, [
                                createVNode("button", {
                                  class: "btn btn-sm btn-outline-primary",
                                  onClick: ($event) => startEdit(doc)
                                }, "Edit", 8, ["onClick"]),
                                createVNode("button", {
                                  class: "btn btn-sm btn-outline-danger ms-1",
                                  onClick: ($event) => remove(doc.id)
                                }, "Hapus", 8, ["onClick"])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "alert alert-info"
                    }, "Belum ada dokumen penting yang ditambahkan."))
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal fade",
                id: "editModal",
                tabindex: "-1",
                "aria-hidden": "true"
              }, [
                createVNode("div", { class: "modal-dialog modal-lg modal-dialog-centered" }, [
                  createVNode("div", { class: "modal-content" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submitEdit, ["prevent"]),
                      enctype: "multipart/form-data"
                    }, [
                      createVNode("div", { class: "modal-header" }, [
                        createVNode("h5", { class: "modal-title" }, "Edit Dokumen Penting"),
                        createVNode("button", {
                          type: "button",
                          class: "btn-close",
                          "data-bs-dismiss": "modal"
                        })
                      ]),
                      createVNode("div", { class: "modal-body" }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label" }, "Judul"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(editForm).title = $event,
                            class: "form-control",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(editForm).title]
                          ])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label" }, [
                            createTextVNode("Tahun "),
                            createVNode("small", { class: "text-muted" }, "(opsional)")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(editForm).pinned_year = $event,
                            type: "number",
                            class: "form-control",
                            placeholder: "cth: 2025",
                            min: "2000",
                            max: "2099"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [
                              vModelText,
                              unref(editForm).pinned_year,
                              void 0,
                              { number: true }
                            ]
                          ])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label" }, "File Dokumen (PDF/DOC)"),
                          createVNode("input", {
                            type: "file",
                            onChange: onEditFile,
                            accept: ".pdf,.doc,.docx",
                            class: "form-control"
                          }, null, 32),
                          createVNode("small", { class: "text-muted d-block mt-1" }, "Kosongkan jika tidak ingin mengubah file")
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label" }, "Link (opsional)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(editForm).link = $event,
                            type: "url",
                            class: "form-control"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(editForm).link]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "modal-footer" }, [
                        createVNode("button", {
                          class: "btn btn-secondary",
                          "data-bs-dismiss": "modal"
                        }, "Batal"),
                        createVNode("button", {
                          class: "btn btn-primary",
                          disabled: processing.value
                        }, "Simpan Perubahan", 8, ["disabled"])
                      ])
                    ], 32)
                  ])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/PinnedDocs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PinnedDocs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-62bda611"]]);
export {
  PinnedDocs as default
};
//# sourceMappingURL=PinnedDocs-BcD5xFcf.js.map
