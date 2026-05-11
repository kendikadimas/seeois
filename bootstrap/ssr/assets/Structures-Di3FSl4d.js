import { ref, onMounted, nextTick, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, withModifiers, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, usePage } from "@inertiajs/vue3";
import { S as StaffLayout } from "./StaffLayout-B0bsnTIo.js";
import { _ as _sfc_main$1 } from "./InputError-DkffFxkw.js";
import { _ as _sfc_main$2 } from "./Notif-DL0SggHu.js";
import "./ModalConfirmation-CQDhtLdH.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
const _sfc_main = {
  __name: "Structures",
  __ssrInlineRender: true,
  props: {
    structures: Array
  },
  setup(__props) {
    const notifRef = ref(null);
    const modalInstance = ref(null);
    const isEdit = ref(false);
    const form = useForm({
      id: null,
      name: "",
      role_title: "",
      department_name: "",
      order_num: 0,
      is_executive: false,
      image_path: null
    });
    function handleFileChange(e) {
      form.image_path = e.target.files[0];
    }
    function showModal(structure = null) {
      if (structure) {
        isEdit.value = true;
        form.id = structure.id;
        form.name = structure.name;
        form.role_title = structure.role_title;
        form.department_name = structure.department_name;
        form.order_num = structure.order_num;
        form.is_executive = structure.is_executive == 1;
        form.image_path = null;
      } else {
        isEdit.value = false;
        form.reset();
      }
      if (modalInstance.value) modalInstance.value.show();
    }
    function hideModal() {
      if (modalInstance.value) modalInstance.value.hide();
      form.reset();
    }
    function submitForm() {
      if (isEdit.value) {
        form.transform((data) => ({
          ...data,
          _method: "put"
        })).post(route("marketing.structures.update", form.id), {
          onSuccess: () => {
            var _a;
            hideModal();
            (_a = notifRef.value) == null ? void 0 : _a.showToast("success", "Struktur berhasil diupdate.");
          }
        });
      } else {
        form.post(route("marketing.structures.store"), {
          onSuccess: () => {
            var _a;
            hideModal();
            (_a = notifRef.value) == null ? void 0 : _a.showToast("success", "Struktur berhasil ditambahkan.");
          }
        });
      }
    }
    function deleteStructure(id) {
      if (confirm("Yakin ingin menghapus data struktur ini?")) {
        form.delete(route("marketing.structures.destroy", id), {
          onSuccess: () => {
            var _a;
            (_a = notifRef.value) == null ? void 0 : _a.showToast("success", "Struktur berhasil dihapus.");
          }
        });
      }
    }
    onMounted(async () => {
      await nextTick();
      const modalEl = document.getElementById("structureModal");
      if (modalEl && typeof window.bootstrap !== "undefined") {
        modalInstance.value = new window.bootstrap.Modal(modalEl);
      }
      const pageProps = usePage().props;
      if (pageProps.notif && notifRef.value) {
        notifRef.value.showToast(pageProps.notif.type, pageProps.notif.message);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(StaffLayout, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Manajemen Struktur (Marketing) `);
          } else {
            return [
              createTextVNode(" Manajemen Struktur (Marketing) ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container-fluid p-4"${_scopeId}><div class="card shadow-sm border-0 rounded-4"${_scopeId}><div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center"${_scopeId}><h5 class="mb-0 fw-bold"${_scopeId}>Data Struktur Organisasi</h5><button class="btn btn-primary shadow-sm"${_scopeId}><i class="bi bi-plus-lg me-1"${_scopeId}></i> Tambah Struktur </button></div><div class="card-body"${_scopeId}><div class="table-responsive"${_scopeId}><table class="table table-hover align-middle"${_scopeId}><thead class="table-light"${_scopeId}><tr${_scopeId}><th${_scopeId}>#Order</th><th${_scopeId}>Executive?</th><th${_scopeId}>Nama</th><th${_scopeId}>Jabatan</th><th${_scopeId}>Departemen</th><th${_scopeId}>Aksi</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.structures, (item) => {
              _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(item.order_num)}</td><td${_scopeId}><span class="${ssrRenderClass([item.is_executive ? "bg-success" : "bg-secondary", "badge"])}"${_scopeId}>${ssrInterpolate(item.is_executive ? "Ya" : "Tidak")}</span></td><td${_scopeId}><div class="d-flex align-items-center"${_scopeId}>`);
              if (item.image_url) {
                _push2(`<img${ssrRenderAttr("src", item.image_url)} class="rounded-circle me-2 object-fit-cover" style="${ssrRenderStyle({ "width": "40px", "height": "40px" })}"${_scopeId}>`);
              } else {
                _push2(`<div class="rounded-circle bg-light me-2 d-flex justify-content-center align-items-center" style="${ssrRenderStyle({ "width": "40px", "height": "40px" })}"${_scopeId}><i class="bi bi-person text-secondary"${_scopeId}></i></div>`);
              }
              _push2(`<span class="fw-medium"${_scopeId}>${ssrInterpolate(item.name)}</span></div></td><td${_scopeId}>${ssrInterpolate(item.role_title)}</td><td${_scopeId}>${ssrInterpolate(item.department_name || "-")}</td><td${_scopeId}><button class="btn btn-sm btn-light border me-2"${_scopeId}><i class="bi bi-pencil"${_scopeId}></i></button><button class="btn btn-sm btn-outline-danger"${_scopeId}><i class="bi bi-trash"${_scopeId}></i></button></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.structures.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="text-center py-4 text-muted"${_scopeId}>Belum ada data struktur.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div></div><div class="modal fade" id="structureModal" tabindex="-1" aria-labelledby="structureModalLabel" aria-hidden="true"${_scopeId}><div class="modal-dialog"${_scopeId}><div class="modal-content"${_scopeId}><form${_scopeId}><div class="modal-header"${_scopeId}><h5 class="modal-title" id="structureModalLabel"${_scopeId}>${ssrInterpolate(isEdit.value ? "Edit Struktur" : "Tambah Struktur")}</h5><button type="button" class="btn-close"${_scopeId}></button></div><div class="modal-body"${_scopeId}><div class="mb-3"${_scopeId}><label class="form-label"${_scopeId}>Nama</label><input type="text" class="form-control"${ssrRenderAttr("value", unref(form).name)} required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.name,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="row mb-3"${_scopeId}><div class="col-md-6"${_scopeId}><label class="form-label"${_scopeId}>Jabatan (Role Title)</label><input type="text" class="form-control"${ssrRenderAttr("value", unref(form).role_title)} required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.role_title,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-md-6"${_scopeId}><label class="form-label"${_scopeId}>Departemen</label><input type="text" class="form-control"${ssrRenderAttr("value", unref(form).department_name)}${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.department_name,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="row mb-3"${_scopeId}><div class="col-md-6"${_scopeId}><label class="form-label"${_scopeId}>Nomor Urut</label><input type="number" class="form-control"${ssrRenderAttr("value", unref(form).order_num)}${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.order_num,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-md-6 d-flex align-items-end"${_scopeId}><div class="form-check form-switch pb-2"${_scopeId}><input class="form-check-input" type="checkbox" id="isExec"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_executive) ? ssrLooseContain(unref(form).is_executive, null) : unref(form).is_executive) ? " checked" : ""}${_scopeId}><label class="form-check-label" for="isExec"${_scopeId}>Executive (Pimpinan)?</label></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.is_executive,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-3"${_scopeId}><label class="form-label"${_scopeId}>Foto Profil (Opsional)</label><input type="file" class="form-control" accept="image/*"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.image_path,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            if (isEdit.value) {
              _push2(`<div class="form-text text-muted"${_scopeId}>Biarkan kosong jika tidak ingin mengubah foto.</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="modal-footer"${_scopeId}><button type="button" class="btn btn-secondary"${_scopeId}>Batal</button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>Simpan</button></div></form></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "notifRef",
              ref: notifRef
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "container-fluid p-4" }, [
                createVNode("div", { class: "card shadow-sm border-0 rounded-4" }, [
                  createVNode("div", { class: "card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center" }, [
                    createVNode("h5", { class: "mb-0 fw-bold" }, "Data Struktur Organisasi"),
                    createVNode("button", {
                      class: "btn btn-primary shadow-sm",
                      onClick: ($event) => showModal(null)
                    }, [
                      createVNode("i", { class: "bi bi-plus-lg me-1" }),
                      createTextVNode(" Tambah Struktur ")
                    ], 8, ["onClick"])
                  ]),
                  createVNode("div", { class: "card-body" }, [
                    createVNode("div", { class: "table-responsive" }, [
                      createVNode("table", { class: "table table-hover align-middle" }, [
                        createVNode("thead", { class: "table-light" }, [
                          createVNode("tr", null, [
                            createVNode("th", null, "#Order"),
                            createVNode("th", null, "Executive?"),
                            createVNode("th", null, "Nama"),
                            createVNode("th", null, "Jabatan"),
                            createVNode("th", null, "Departemen"),
                            createVNode("th", null, "Aksi")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.structures, (item) => {
                            return openBlock(), createBlock("tr", {
                              key: item.id
                            }, [
                              createVNode("td", null, toDisplayString(item.order_num), 1),
                              createVNode("td", null, [
                                createVNode("span", {
                                  class: ["badge", item.is_executive ? "bg-success" : "bg-secondary"]
                                }, toDisplayString(item.is_executive ? "Ya" : "Tidak"), 3)
                              ]),
                              createVNode("td", null, [
                                createVNode("div", { class: "d-flex align-items-center" }, [
                                  item.image_url ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: item.image_url,
                                    class: "rounded-circle me-2 object-fit-cover",
                                    style: { "width": "40px", "height": "40px" }
                                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "rounded-circle bg-light me-2 d-flex justify-content-center align-items-center",
                                    style: { "width": "40px", "height": "40px" }
                                  }, [
                                    createVNode("i", { class: "bi bi-person text-secondary" })
                                  ])),
                                  createVNode("span", { class: "fw-medium" }, toDisplayString(item.name), 1)
                                ])
                              ]),
                              createVNode("td", null, toDisplayString(item.role_title), 1),
                              createVNode("td", null, toDisplayString(item.department_name || "-"), 1),
                              createVNode("td", null, [
                                createVNode("button", {
                                  class: "btn btn-sm btn-light border me-2",
                                  onClick: ($event) => showModal(item)
                                }, [
                                  createVNode("i", { class: "bi bi-pencil" })
                                ], 8, ["onClick"]),
                                createVNode("button", {
                                  class: "btn btn-sm btn-outline-danger",
                                  onClick: ($event) => deleteStructure(item.id)
                                }, [
                                  createVNode("i", { class: "bi bi-trash" })
                                ], 8, ["onClick"])
                              ])
                            ]);
                          }), 128)),
                          __props.structures.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "6",
                              class: "text-center py-4 text-muted"
                            }, "Belum ada data struktur.")
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal fade",
                id: "structureModal",
                tabindex: "-1",
                "aria-labelledby": "structureModalLabel",
                "aria-hidden": "true"
              }, [
                createVNode("div", { class: "modal-dialog" }, [
                  createVNode("div", { class: "modal-content" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submitForm, ["prevent"])
                    }, [
                      createVNode("div", { class: "modal-header" }, [
                        createVNode("h5", {
                          class: "modal-title",
                          id: "structureModalLabel"
                        }, toDisplayString(isEdit.value ? "Edit Struktur" : "Tambah Struktur"), 1),
                        createVNode("button", {
                          type: "button",
                          class: "btn-close",
                          onClick: hideModal
                        })
                      ]),
                      createVNode("div", { class: "modal-body" }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label" }, "Nama"),
                          withDirectives(createVNode("input", {
                            type: "text",
                            class: "form-control",
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).name]
                          ]),
                          createVNode(_sfc_main$1, {
                            message: unref(form).errors.name,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "row mb-3" }, [
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("label", { class: "form-label" }, "Jabatan (Role Title)"),
                            withDirectives(createVNode("input", {
                              type: "text",
                              class: "form-control",
                              "onUpdate:modelValue": ($event) => unref(form).role_title = $event,
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).role_title]
                            ]),
                            createVNode(_sfc_main$1, {
                              message: unref(form).errors.role_title,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("label", { class: "form-label" }, "Departemen"),
                            withDirectives(createVNode("input", {
                              type: "text",
                              class: "form-control",
                              "onUpdate:modelValue": ($event) => unref(form).department_name = $event
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).department_name]
                            ]),
                            createVNode(_sfc_main$1, {
                              message: unref(form).errors.department_name,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", { class: "row mb-3" }, [
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("label", { class: "form-label" }, "Nomor Urut"),
                            withDirectives(createVNode("input", {
                              type: "number",
                              class: "form-control",
                              "onUpdate:modelValue": ($event) => unref(form).order_num = $event
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).order_num]
                            ]),
                            createVNode(_sfc_main$1, {
                              message: unref(form).errors.order_num,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "col-md-6 d-flex align-items-end" }, [
                            createVNode("div", { class: "form-check form-switch pb-2" }, [
                              withDirectives(createVNode("input", {
                                class: "form-check-input",
                                type: "checkbox",
                                id: "isExec",
                                "onUpdate:modelValue": ($event) => unref(form).is_executive = $event
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(form).is_executive]
                              ]),
                              createVNode("label", {
                                class: "form-check-label",
                                for: "isExec"
                              }, "Executive (Pimpinan)?")
                            ]),
                            createVNode(_sfc_main$1, {
                              message: unref(form).errors.is_executive,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label" }, "Foto Profil (Opsional)"),
                          createVNode("input", {
                            type: "file",
                            class: "form-control",
                            onChange: handleFileChange,
                            accept: "image/*"
                          }, null, 32),
                          createVNode(_sfc_main$1, {
                            message: unref(form).errors.image_path,
                            class: "mt-1"
                          }, null, 8, ["message"]),
                          isEdit.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "form-text text-muted"
                          }, "Biarkan kosong jika tidak ingin mengubah foto.")) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "modal-footer" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-secondary",
                          onClick: hideModal
                        }, "Batal"),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary",
                          disabled: unref(form).processing
                        }, "Simpan", 8, ["disabled"])
                      ])
                    ], 32)
                  ])
                ])
              ]),
              createVNode(_sfc_main$2, {
                ref_key: "notifRef",
                ref: notifRef
              }, null, 512)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Marketing/Structures.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Structures-Di3FSl4d.js.map
