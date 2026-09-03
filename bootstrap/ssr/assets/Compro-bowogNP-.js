import { ref, onMounted, withCtx, unref, createVNode, openBlock, createBlock, withModifiers, withDirectives, vModelText, createCommentVNode, Fragment, renderList, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-BSa5kc_g.js";
import { useForm } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ModalConfirmation-CaKJYApU.js";
const _sfc_main = {
  __name: "Compro",
  __ssrInlineRender: true,
  props: { items: Array },
  setup(__props) {
    const props = __props;
    const items = ref(props.items || []);
    const showAdd = ref(false);
    const processing = ref(false);
    const form = useForm({ key: "", value: "", image: null, order: 0 });
    function onFile(e) {
      form.image = e.target.files[0] || null;
    }
    const editForm = useForm({ id: null, value: "", image: null, order: 0 });
    function onEditFile(e) {
      editForm.image = e.target.files[0] || null;
    }
    function submitAdd() {
      processing.value = true;
      form.post("/seeo/marketing/compro", {
        onSuccess: () => location.reload(),
        onFinish: () => processing.value = false
      });
    }
    function startEdit(item) {
      editForm.id = item.id;
      editForm.value = item.value;
      editForm.order = item.order || 0;
      const modalEl = document.getElementById("editModal");
      if (modalEl && window.bootstrap) window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
    function submitEdit() {
      processing.value = true;
      editForm.transform((data) => ({ ...data, _method: "put" })).post(`/seeo/marketing/compro/${editForm.id}`, {
        onSuccess: () => location.reload(),
        onFinish: () => processing.value = false
      });
    }
    function remove(id) {
      if (!confirm("Hapus konten ini?")) return;
      const f = useForm();
      f.delete(`/seeo/marketing/compro/${id}`, { onSuccess: () => location.reload() });
    }
    onMounted(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(StaffLayout, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Company Profile CMS (Marketing)`);
          } else {
            return [
              createTextVNode("Company Profile CMS (Marketing)")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container-fluid p-4" data-v-ee397916${_scopeId}><div class="card shadow-sm" data-v-ee397916${_scopeId}><div class="card-header d-flex justify-content-between align-items-center" data-v-ee397916${_scopeId}><h5 class="mb-0" data-v-ee397916${_scopeId}>Konten Company Profile</h5><button class="btn btn-primary" data-v-ee397916${_scopeId}>Tambah Konten</button></div><div class="card-body" data-v-ee397916${_scopeId}>`);
            if (showAdd.value) {
              _push2(`<div class="mb-4" data-v-ee397916${_scopeId}><form enctype="multipart/form-data" data-v-ee397916${_scopeId}><div class="row g-2" data-v-ee397916${_scopeId}><div class="col-md-4" data-v-ee397916${_scopeId}><input${ssrRenderAttr("value", unref(form).key)} class="form-control" placeholder="Key (unique)" required data-v-ee397916${_scopeId}></div><div class="col-md-4" data-v-ee397916${_scopeId}><input${ssrRenderAttr("value", unref(form).order)} type="number" class="form-control" placeholder="Order" data-v-ee397916${_scopeId}></div><div class="col-md-4" data-v-ee397916${_scopeId}><input type="file" accept="image/*" class="form-control" data-v-ee397916${_scopeId}></div><div class="col-12 mt-2" data-v-ee397916${_scopeId}><textarea class="form-control" rows="3" placeholder="Content value (HTML allowed)" data-v-ee397916${_scopeId}>${ssrInterpolate(unref(form).value)}</textarea></div><div class="col-12 mt-2 text-end" data-v-ee397916${_scopeId}><button class="btn btn-success"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} data-v-ee397916${_scopeId}>Simpan</button></div></div></form></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="list-group" data-v-ee397916${_scopeId}><!--[-->`);
            ssrRenderList(items.value, (item) => {
              _push2(`<div class="list-group-item d-flex justify-content-between align-items-start" data-v-ee397916${_scopeId}><div data-v-ee397916${_scopeId}><div class="fw-bold" data-v-ee397916${_scopeId}>${ssrInterpolate(item.key)} <small class="text-muted" data-v-ee397916${_scopeId}>#${ssrInterpolate(item.order)}</small></div><div class="text-truncate" style="${ssrRenderStyle({ "max-width": "600px" })}" data-v-ee397916${_scopeId}>${ssrInterpolate(item.value)}</div></div><div class="d-flex gap-2" data-v-ee397916${_scopeId}>`);
              if (item.image_path) {
                _push2(`<a${ssrRenderAttr("href", item.image_path)} target="_blank" class="btn btn-sm btn-outline-secondary" data-v-ee397916${_scopeId}>View</a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button class="btn btn-sm btn-outline-primary" data-v-ee397916${_scopeId}>Edit</button><button class="btn btn-sm btn-outline-danger" data-v-ee397916${_scopeId}>Hapus</button></div></div>`);
            });
            _push2(`<!--]--></div></div></div></div><div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true" data-v-ee397916${_scopeId}><div class="modal-dialog modal-lg modal-dialog-centered" data-v-ee397916${_scopeId}><div class="modal-content" data-v-ee397916${_scopeId}><form enctype="multipart/form-data" data-v-ee397916${_scopeId}><div class="modal-header" data-v-ee397916${_scopeId}><h5 class="modal-title" data-v-ee397916${_scopeId}>Edit Konten</h5><button type="button" class="btn-close" data-bs-dismiss="modal" data-v-ee397916${_scopeId}></button></div><div class="modal-body" data-v-ee397916${_scopeId}><div class="mb-2" data-v-ee397916${_scopeId}><textarea class="form-control" rows="6" data-v-ee397916${_scopeId}>${ssrInterpolate(unref(editForm).value)}</textarea></div><div class="mb-2" data-v-ee397916${_scopeId}><input type="file" class="form-control" accept="image/*" data-v-ee397916${_scopeId}></div><div class="mb-2" data-v-ee397916${_scopeId}><input${ssrRenderAttr("value", unref(editForm).order)} type="number" class="form-control" data-v-ee397916${_scopeId}></div></div><div class="modal-footer" data-v-ee397916${_scopeId}><button class="btn btn-secondary" data-bs-dismiss="modal" data-v-ee397916${_scopeId}>Batal</button><button class="btn btn-primary"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} data-v-ee397916${_scopeId}>Simpan</button></div></form></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-fluid p-4" }, [
                createVNode("div", { class: "card shadow-sm" }, [
                  createVNode("div", { class: "card-header d-flex justify-content-between align-items-center" }, [
                    createVNode("h5", { class: "mb-0" }, "Konten Company Profile"),
                    createVNode("button", {
                      class: "btn btn-primary",
                      onClick: ($event) => showAdd.value = !showAdd.value
                    }, "Tambah Konten", 8, ["onClick"])
                  ]),
                  createVNode("div", { class: "card-body" }, [
                    showAdd.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-4"
                    }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submitAdd, ["prevent"]),
                        enctype: "multipart/form-data"
                      }, [
                        createVNode("div", { class: "row g-2" }, [
                          createVNode("div", { class: "col-md-4" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).key = $event,
                              class: "form-control",
                              placeholder: "Key (unique)",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).key]
                            ])
                          ]),
                          createVNode("div", { class: "col-md-4" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).order = $event,
                              type: "number",
                              class: "form-control",
                              placeholder: "Order"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).order]
                            ])
                          ]),
                          createVNode("div", { class: "col-md-4" }, [
                            createVNode("input", {
                              type: "file",
                              onChange: onFile,
                              accept: "image/*",
                              class: "form-control"
                            }, null, 32)
                          ]),
                          createVNode("div", { class: "col-12 mt-2" }, [
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).value = $event,
                              class: "form-control",
                              rows: "3",
                              placeholder: "Content value (HTML allowed)"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).value]
                            ])
                          ]),
                          createVNode("div", { class: "col-12 mt-2 text-end" }, [
                            createVNode("button", {
                              class: "btn btn-success",
                              disabled: processing.value
                            }, "Simpan", 8, ["disabled"])
                          ])
                        ])
                      ], 32)
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "list-group" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(items.value, (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "list-group-item d-flex justify-content-between align-items-start"
                        }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "fw-bold" }, [
                              createTextVNode(toDisplayString(item.key) + " ", 1),
                              createVNode("small", { class: "text-muted" }, "#" + toDisplayString(item.order), 1)
                            ]),
                            createVNode("div", {
                              class: "text-truncate",
                              style: { "max-width": "600px" }
                            }, toDisplayString(item.value), 1)
                          ]),
                          createVNode("div", { class: "d-flex gap-2" }, [
                            item.image_path ? (openBlock(), createBlock("a", {
                              key: 0,
                              href: item.image_path,
                              target: "_blank",
                              class: "btn btn-sm btn-outline-secondary"
                            }, "View", 8, ["href"])) : createCommentVNode("", true),
                            createVNode("button", {
                              class: "btn btn-sm btn-outline-primary",
                              onClick: ($event) => startEdit(item)
                            }, "Edit", 8, ["onClick"]),
                            createVNode("button", {
                              class: "btn btn-sm btn-outline-danger",
                              onClick: ($event) => remove(item.id)
                            }, "Hapus", 8, ["onClick"])
                          ])
                        ]);
                      }), 128))
                    ])
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
                        createVNode("h5", { class: "modal-title" }, "Edit Konten"),
                        createVNode("button", {
                          type: "button",
                          class: "btn-close",
                          "data-bs-dismiss": "modal"
                        })
                      ]),
                      createVNode("div", { class: "modal-body" }, [
                        createVNode("div", { class: "mb-2" }, [
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(editForm).value = $event,
                            class: "form-control",
                            rows: "6"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(editForm).value]
                          ])
                        ]),
                        createVNode("div", { class: "mb-2" }, [
                          createVNode("input", {
                            type: "file",
                            onChange: onEditFile,
                            class: "form-control",
                            accept: "image/*"
                          }, null, 32)
                        ]),
                        createVNode("div", { class: "mb-2" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(editForm).order = $event,
                            type: "number",
                            class: "form-control"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [
                              vModelText,
                              unref(editForm).order,
                              void 0,
                              { number: true }
                            ]
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
                        }, "Simpan", 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Marketing/Compro.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Compro = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ee397916"]]);
export {
  Compro as default
};
//# sourceMappingURL=Compro-bowogNP-.js.map
