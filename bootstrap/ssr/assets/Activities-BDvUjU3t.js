import { ref, onMounted, nextTick, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, withModifiers, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, usePage } from "@inertiajs/vue3";
import { S as StaffLayout } from "./StaffLayout-CmduQjnL.js";
import { _ as _sfc_main$1 } from "./InputError-DkffFxkw.js";
import { _ as _sfc_main$2 } from "./Notif-DL0SggHu.js";
import "./ModalConfirmation-CaKJYApU.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
const _sfc_main = {
  __name: "Activities",
  __ssrInlineRender: true,
  props: {
    activities: Array
  },
  setup(__props) {
    const notifRef = ref(null);
    const modalInstance = ref(null);
    const isEdit = ref(false);
    const form = useForm({
      id: null,
      title: "",
      description: "",
      category: "",
      date: "",
      is_published: true,
      image_path: null
    });
    function handleFileChange(e) {
      form.image_path = e.target.files[0];
    }
    function showModal(activity = null) {
      if (activity) {
        isEdit.value = true;
        form.id = activity.id;
        form.title = activity.title;
        form.description = activity.description;
        form.category = activity.category;
        form.date = activity.date || "";
        form.is_published = activity.is_published == 1;
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
        })).post(`/seeo/marketing/activities/${form.id}`, {
          onSuccess: () => {
            var _a;
            hideModal();
            (_a = notifRef.value) == null ? void 0 : _a.showToast("success", "Kegiatan/Berita berhasil diupdate.");
          }
        });
      } else {
        form.post("/seeo/marketing/activities", {
          onSuccess: () => {
            var _a;
            hideModal();
            (_a = notifRef.value) == null ? void 0 : _a.showToast("success", "Kegiatan/Berita berhasil ditambahkan.");
          }
        });
      }
    }
    function deleteActivity(id) {
      if (confirm("Yakin ingin menghapus berita/kegiatan ini?")) {
        form.delete(`/seeo/marketing/activities/${id}`, {
          onSuccess: () => {
            var _a;
            (_a = notifRef.value) == null ? void 0 : _a.showToast("success", "Berita/Kegiatan berhasil dihapus.");
          }
        });
      }
    }
    onMounted(async () => {
      await nextTick();
      const modalEl = document.getElementById("activityModal");
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
            _push2(` Manajemen Berita &amp; Kegiatan (Marketing) `);
          } else {
            return [
              createTextVNode(" Manajemen Berita & Kegiatan (Marketing) ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container-fluid p-4"${_scopeId}><div class="card shadow-sm border-0 rounded-4"${_scopeId}><div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center"${_scopeId}><h5 class="mb-0 fw-bold"${_scopeId}>Data Berita / Sorotan Program</h5><button class="btn btn-primary shadow-sm"${_scopeId}><i class="bi bi-plus-lg me-1"${_scopeId}></i> Tambah Entri </button></div><div class="card-body"${_scopeId}><div class="table-responsive"${_scopeId}><table class="table table-hover align-middle"${_scopeId}><thead class="table-light"${_scopeId}><tr${_scopeId}><th${_scopeId}>Tanggal</th><th${_scopeId}>Status</th><th${_scopeId}>Judul / Berita</th><th${_scopeId}>Kategori</th><th${_scopeId}>Banner</th><th${_scopeId}>Aksi</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.activities, (item) => {
              _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(item.date || "-")}</td><td${_scopeId}><span class="${ssrRenderClass([item.is_published ? "bg-success" : "bg-warning text-dark", "badge"])}"${_scopeId}>${ssrInterpolate(item.is_published ? "Published" : "Draft")}</span></td><td${_scopeId}><span class="fw-medium d-block"${_scopeId}>${ssrInterpolate(item.title)}</span><small class="text-muted text-truncate d-inline-block" style="${ssrRenderStyle({ "max-width": "250px" })}"${_scopeId}>${ssrInterpolate(item.description)}</small></td><td${_scopeId}>${ssrInterpolate(item.category || "-")}</td><td${_scopeId}>`);
              if (item.image_url) {
                _push2(`<img${ssrRenderAttr("src", item.image_url)} class="rounded border object-fit-cover" style="${ssrRenderStyle({ "width": "60px", "height": "40px" })}"${_scopeId}>`);
              } else {
                _push2(`<span class="text-muted small fst-italic"${_scopeId}>No Image</span>`);
              }
              _push2(`</td><td${_scopeId}><button class="btn btn-sm btn-light border me-2"${_scopeId}><i class="bi bi-pencil"${_scopeId}></i></button><button class="btn btn-sm btn-outline-danger"${_scopeId}><i class="bi bi-trash"${_scopeId}></i></button></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.activities.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="text-center py-4 text-muted"${_scopeId}>Belum ada data berita atau aktivitas.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div></div><div class="modal fade" id="activityModal" tabindex="-1" aria-labelledby="activityModalLabel" aria-hidden="true"${_scopeId}><div class="modal-dialog modal-lg"${_scopeId}><div class="modal-content"${_scopeId}><form${_scopeId}><div class="modal-header"${_scopeId}><h5 class="modal-title" id="activityModalLabel"${_scopeId}>${ssrInterpolate(isEdit.value ? "Edit Berita/Kegiatan" : "Tambah Berita/Kegiatan")}</h5><button type="button" class="btn-close"${_scopeId}></button></div><div class="modal-body"${_scopeId}><div class="mb-3"${_scopeId}><label class="form-label"${_scopeId}>Judul / Sorotan Utama</label><input type="text" class="form-control"${ssrRenderAttr("value", unref(form).title)} required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.title,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3"${_scopeId}><label class="form-label"${_scopeId}>Deskripsi Lengkap</label><textarea class="form-control" rows="4" required${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.description,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="row mb-3"${_scopeId}><div class="col-md-6"${_scopeId}><label class="form-label"${_scopeId}>Kategori</label><input type="text" class="form-control"${ssrRenderAttr("value", unref(form).category)} placeholder="Contoh: Publikasi, Event, dst"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.category,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="col-md-6"${_scopeId}><label class="form-label"${_scopeId}>Tanggal Terjadi (Opsional)</label><input type="date" class="form-control"${ssrRenderAttr("value", unref(form).date)}${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.date,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="row mb-3"${_scopeId}><div class="col-md-6"${_scopeId}><label class="form-label"${_scopeId}>Gambar Thumbnail / Banner</label><input type="file" class="form-control" accept="image/*"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.image_path,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            if (isEdit.value) {
              _push2(`<div class="form-text text-muted"${_scopeId}>Biarkan kosong jika tidak mengubah gambar lama.</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-md-6 d-flex align-items-center"${_scopeId}><div class="form-check form-switch mt-4"${_scopeId}><input class="form-check-input" type="checkbox" id="isPub"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_published) ? ssrLooseContain(unref(form).is_published, null) : unref(form).is_published) ? " checked" : ""}${_scopeId}><label class="form-check-label" for="isPub"${_scopeId}>Terbitkan (Published)?</label></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.is_published,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="modal-footer"${_scopeId}><button type="button" class="btn btn-secondary"${_scopeId}>Batal</button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>Simpan</button></div></form></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "notifRef",
              ref: notifRef
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "container-fluid p-4" }, [
                createVNode("div", { class: "card shadow-sm border-0 rounded-4" }, [
                  createVNode("div", { class: "card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center" }, [
                    createVNode("h5", { class: "mb-0 fw-bold" }, "Data Berita / Sorotan Program"),
                    createVNode("button", {
                      class: "btn btn-primary shadow-sm",
                      onClick: ($event) => showModal(null)
                    }, [
                      createVNode("i", { class: "bi bi-plus-lg me-1" }),
                      createTextVNode(" Tambah Entri ")
                    ], 8, ["onClick"])
                  ]),
                  createVNode("div", { class: "card-body" }, [
                    createVNode("div", { class: "table-responsive" }, [
                      createVNode("table", { class: "table table-hover align-middle" }, [
                        createVNode("thead", { class: "table-light" }, [
                          createVNode("tr", null, [
                            createVNode("th", null, "Tanggal"),
                            createVNode("th", null, "Status"),
                            createVNode("th", null, "Judul / Berita"),
                            createVNode("th", null, "Kategori"),
                            createVNode("th", null, "Banner"),
                            createVNode("th", null, "Aksi")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.activities, (item) => {
                            return openBlock(), createBlock("tr", {
                              key: item.id
                            }, [
                              createVNode("td", null, toDisplayString(item.date || "-"), 1),
                              createVNode("td", null, [
                                createVNode("span", {
                                  class: ["badge", item.is_published ? "bg-success" : "bg-warning text-dark"]
                                }, toDisplayString(item.is_published ? "Published" : "Draft"), 3)
                              ]),
                              createVNode("td", null, [
                                createVNode("span", { class: "fw-medium d-block" }, toDisplayString(item.title), 1),
                                createVNode("small", {
                                  class: "text-muted text-truncate d-inline-block",
                                  style: { "max-width": "250px" }
                                }, toDisplayString(item.description), 1)
                              ]),
                              createVNode("td", null, toDisplayString(item.category || "-"), 1),
                              createVNode("td", null, [
                                item.image_url ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: item.image_url,
                                  class: "rounded border object-fit-cover",
                                  style: { "width": "60px", "height": "40px" }
                                }, null, 8, ["src"])) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-muted small fst-italic"
                                }, "No Image"))
                              ]),
                              createVNode("td", null, [
                                createVNode("button", {
                                  class: "btn btn-sm btn-light border me-2",
                                  onClick: ($event) => showModal(item)
                                }, [
                                  createVNode("i", { class: "bi bi-pencil" })
                                ], 8, ["onClick"]),
                                createVNode("button", {
                                  class: "btn btn-sm btn-outline-danger",
                                  onClick: ($event) => deleteActivity(item.id)
                                }, [
                                  createVNode("i", { class: "bi bi-trash" })
                                ], 8, ["onClick"])
                              ])
                            ]);
                          }), 128)),
                          __props.activities.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "6",
                              class: "text-center py-4 text-muted"
                            }, "Belum ada data berita atau aktivitas.")
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal fade",
                id: "activityModal",
                tabindex: "-1",
                "aria-labelledby": "activityModalLabel",
                "aria-hidden": "true"
              }, [
                createVNode("div", { class: "modal-dialog modal-lg" }, [
                  createVNode("div", { class: "modal-content" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submitForm, ["prevent"])
                    }, [
                      createVNode("div", { class: "modal-header" }, [
                        createVNode("h5", {
                          class: "modal-title",
                          id: "activityModalLabel"
                        }, toDisplayString(isEdit.value ? "Edit Berita/Kegiatan" : "Tambah Berita/Kegiatan"), 1),
                        createVNode("button", {
                          type: "button",
                          class: "btn-close",
                          onClick: hideModal
                        })
                      ]),
                      createVNode("div", { class: "modal-body" }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label" }, "Judul / Sorotan Utama"),
                          withDirectives(createVNode("input", {
                            type: "text",
                            class: "form-control",
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).title]
                          ]),
                          createVNode(_sfc_main$1, {
                            message: unref(form).errors.title,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label" }, "Deskripsi Lengkap"),
                          withDirectives(createVNode("textarea", {
                            class: "form-control",
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            rows: "4",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ]),
                          createVNode(_sfc_main$1, {
                            message: unref(form).errors.description,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "row mb-3" }, [
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("label", { class: "form-label" }, "Kategori"),
                            withDirectives(createVNode("input", {
                              type: "text",
                              class: "form-control",
                              "onUpdate:modelValue": ($event) => unref(form).category = $event,
                              placeholder: "Contoh: Publikasi, Event, dst"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).category]
                            ]),
                            createVNode(_sfc_main$1, {
                              message: unref(form).errors.category,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("label", { class: "form-label" }, "Tanggal Terjadi (Opsional)"),
                            withDirectives(createVNode("input", {
                              type: "date",
                              class: "form-control",
                              "onUpdate:modelValue": ($event) => unref(form).date = $event
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).date]
                            ]),
                            createVNode(_sfc_main$1, {
                              message: unref(form).errors.date,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("div", { class: "row mb-3" }, [
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("label", { class: "form-label" }, "Gambar Thumbnail / Banner"),
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
                            }, "Biarkan kosong jika tidak mengubah gambar lama.")) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "col-md-6 d-flex align-items-center" }, [
                            createVNode("div", { class: "form-check form-switch mt-4" }, [
                              withDirectives(createVNode("input", {
                                class: "form-check-input",
                                type: "checkbox",
                                id: "isPub",
                                "onUpdate:modelValue": ($event) => unref(form).is_published = $event
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(form).is_published]
                              ]),
                              createVNode("label", {
                                class: "form-check-label",
                                for: "isPub"
                              }, "Terbitkan (Published)?")
                            ]),
                            createVNode(_sfc_main$1, {
                              message: unref(form).errors.is_published,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Marketing/Activities.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Activities-BDvUjU3t.js.map
