import { computed, ref, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, withModifiers, withDirectives, vModelText, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-6jqdAWGT.js";
import { _ as _sfc_main$1 } from "./InputError-DkffFxkw.js";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ModalConfirmation-CzGDjmDO.js";
const _sfc_main = {
  __name: "Compro",
  __ssrInlineRender: true,
  props: { items: Array },
  setup(__props) {
    const props = __props;
    const route = (name, params = {}) => window.route(name, params);
    const items = computed(() => props.items || []);
    const showAdd = ref(false);
    const currentImageUrl = ref(null);
    const addFileError = ref("");
    const editFileError = ref("");
    const form = useForm({ key: "", value: "", image: null, order: 0 });
    const editForm = useForm({ id: null, value: "", image: null, order: 0 });
    function validateImage(file) {
      if (!file) return "";
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        return "Gunakan gambar JPG, PNG, atau WEBP.";
      }
      if (file.size > 5 * 1024 * 1024) return "Ukuran gambar maksimal 5 MB.";
      return "";
    }
    function onFile(event) {
      var _a;
      const file = ((_a = event.target.files) == null ? void 0 : _a[0]) || null;
      addFileError.value = validateImage(file);
      form.image = addFileError.value ? null : file;
      if (addFileError.value) event.target.value = "";
    }
    function onEditFile(event) {
      var _a;
      const file = ((_a = event.target.files) == null ? void 0 : _a[0]) || null;
      editFileError.value = validateImage(file);
      editForm.image = editFileError.value ? null : file;
      if (editFileError.value) event.target.value = "";
    }
    function openAddForm() {
      if (showAdd.value) {
        showAdd.value = false;
        return;
      }
      form.reset();
      form.clearErrors();
      addFileError.value = "";
      showAdd.value = true;
    }
    function submitAdd() {
      if (addFileError.value) return;
      form.post(route("marketing.compro.store"), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          form.reset();
          showAdd.value = false;
        }
      });
    }
    function startEdit(item) {
      editForm.reset();
      editForm.clearErrors();
      editFileError.value = "";
      editForm.id = item.id;
      editForm.value = item.value || "";
      editForm.order = item.order || 0;
      currentImageUrl.value = item.image_url;
      const modalEl = document.getElementById("editComproModal");
      if (modalEl && window.bootstrap) window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
    function submitEdit() {
      if (editFileError.value) return;
      editForm.post(route("marketing.compro.update", editForm.id), {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          const modalEl = document.getElementById("editComproModal");
          if (modalEl && window.bootstrap) window.bootstrap.Modal.getOrCreateInstance(modalEl).hide();
        }
      });
    }
    function remove(id) {
      if (!confirm("Hapus konten ini? Data yang dihapus tidak dapat dikembalikan.")) return;
      useForm({}).delete(route("marketing.compro.destroy", id), { preserveScroll: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(StaffLayout, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Konten Company Profile`);
          } else {
            return [
              createTextVNode("Konten Company Profile")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Konten Company Profile" }, null, _parent2, _scopeId));
            _push2(`<div class="container-fluid p-4" data-v-e3075d36${_scopeId}><div class="card shadow-sm border-0 rounded-4" data-v-e3075d36${_scopeId}><div class="card-header bg-white d-flex flex-wrap gap-3 justify-content-between align-items-center py-3" data-v-e3075d36${_scopeId}><div data-v-e3075d36${_scopeId}><h5 class="mb-1 fw-bold" data-v-e3075d36${_scopeId}>Konten Halaman Publik</h5><small class="text-muted" data-v-e3075d36${_scopeId}>Kelola teks dan gambar yang digunakan pada company profile.</small></div><button type="button" class="btn btn-primary" data-v-e3075d36${_scopeId}><i class="${ssrRenderClass([showAdd.value ? "bi-x-lg" : "bi-plus-lg", "bi me-1"])}" data-v-e3075d36${_scopeId}></i> ${ssrInterpolate(showAdd.value ? "Tutup Form" : "Tambah Konten")}</button></div><div class="card-body" data-v-e3075d36${_scopeId}>`);
            if (showAdd.value) {
              _push2(`<div class="mb-4 p-3 p-md-4 border rounded-3 bg-light" data-v-e3075d36${_scopeId}><h6 class="fw-bold mb-3" data-v-e3075d36${_scopeId}>Konten Baru</h6><form data-v-e3075d36${_scopeId}><div class="row g-3" data-v-e3075d36${_scopeId}><div class="col-md-8" data-v-e3075d36${_scopeId}><label class="form-label" data-v-e3075d36${_scopeId}>Key / Identitas Konten <span class="text-danger" data-v-e3075d36${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).key)} class="form-control" placeholder="Contoh: homepage_hero_title" required data-v-e3075d36${_scopeId}><div class="form-text" data-v-e3075d36${_scopeId}>Harus unik. Key dipakai sistem untuk menempatkan konten dan tidak dapat diedit setelah dibuat.</div>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                message: unref(form).errors.key,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="col-md-4" data-v-e3075d36${_scopeId}><label class="form-label" data-v-e3075d36${_scopeId}>Urutan Tampil</label><input${ssrRenderAttr("value", unref(form).order)} min="0" type="number" class="form-control" data-v-e3075d36${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                message: unref(form).errors.order,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="col-12" data-v-e3075d36${_scopeId}><label class="form-label" data-v-e3075d36${_scopeId}>Isi Konten</label><textarea class="form-control" rows="4" placeholder="Tulis isi konten di sini" data-v-e3075d36${_scopeId}>${ssrInterpolate(unref(form).value)}</textarea>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                message: unref(form).errors.value,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="col-12" data-v-e3075d36${_scopeId}><label class="form-label" data-v-e3075d36${_scopeId}>Gambar <span class="text-muted" data-v-e3075d36${_scopeId}>(opsional)</span></label><input type="file" accept="image/jpeg,image/png,image/webp" class="form-control" data-v-e3075d36${_scopeId}><div class="form-text" data-v-e3075d36${_scopeId}>JPG, PNG, atau WEBP; maksimal 5 MB.</div>`);
              if (addFileError.value) {
                _push2(`<div class="text-danger small mt-1" data-v-e3075d36${_scopeId}>${ssrInterpolate(addFileError.value)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_sfc_main$1, {
                message: unref(form).errors.image,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="col-12 text-end" data-v-e3075d36${_scopeId}><button type="button" class="btn btn-light border me-2" data-v-e3075d36${_scopeId}>Batal</button><button type="submit" class="btn btn-success"${ssrIncludeBooleanAttr(unref(form).processing || !!addFileError.value) ? " disabled" : ""} data-v-e3075d36${_scopeId}>`);
              if (unref(form).processing) {
                _push2(`<span class="spinner-border spinner-border-sm me-2" data-v-e3075d36${_scopeId}></span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(` ${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Konten")}</button></div></div></form></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (items.value.length) {
              _push2(`<div class="list-group list-group-flush border rounded-3 overflow-hidden" data-v-e3075d36${_scopeId}><!--[-->`);
              ssrRenderList(items.value, (item) => {
                _push2(`<div class="list-group-item p-3 d-flex flex-column flex-md-row gap-3 justify-content-between align-items-md-center" data-v-e3075d36${_scopeId}><div class="d-flex gap-3 align-items-center min-width-0" data-v-e3075d36${_scopeId}>`);
                if (item.image_url) {
                  _push2(`<img${ssrRenderAttr("src", item.image_url)} alt="Gambar konten" class="rounded border object-fit-cover flex-shrink-0" style="${ssrRenderStyle({ "width": "72px", "height": "56px" })}" data-v-e3075d36${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="min-width-0" data-v-e3075d36${_scopeId}><div class="fw-bold text-break" data-v-e3075d36${_scopeId}>${ssrInterpolate(item.key)} <small class="badge bg-light text-dark border ms-1" data-v-e3075d36${_scopeId}>Urutan ${ssrInterpolate(item.order)}</small></div><div class="text-muted small text-preview" data-v-e3075d36${_scopeId}>${ssrInterpolate(item.value || "Belum ada isi teks.")}</div></div></div><div class="d-flex gap-2 flex-shrink-0" data-v-e3075d36${_scopeId}>`);
                if (item.image_url) {
                  _push2(`<a${ssrRenderAttr("href", item.image_url)} target="_blank" rel="noopener" class="btn btn-sm btn-outline-secondary" data-v-e3075d36${_scopeId}>Lihat Gambar</a>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<button type="button" class="btn btn-sm btn-outline-primary" data-v-e3075d36${_scopeId}>Edit</button><button type="button" class="btn btn-sm btn-outline-danger" data-v-e3075d36${_scopeId}>Hapus</button></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center text-muted py-5" data-v-e3075d36${_scopeId}><i class="bi bi-file-earmark-text fs-1 d-block mb-2" data-v-e3075d36${_scopeId}></i> Belum ada konten company profile. </div>`);
            }
            _push2(`</div></div></div><div class="modal fade" id="editComproModal" tabindex="-1" aria-hidden="true" data-v-e3075d36${_scopeId}><div class="modal-dialog modal-lg modal-dialog-centered" data-v-e3075d36${_scopeId}><div class="modal-content" data-v-e3075d36${_scopeId}><form data-v-e3075d36${_scopeId}><div class="modal-header" data-v-e3075d36${_scopeId}><h5 class="modal-title" data-v-e3075d36${_scopeId}>Edit Konten</h5><button type="button" class="btn-close" data-bs-dismiss="modal" data-v-e3075d36${_scopeId}></button></div><div class="modal-body" data-v-e3075d36${_scopeId}><div class="mb-3" data-v-e3075d36${_scopeId}><label class="form-label" data-v-e3075d36${_scopeId}>Isi Konten</label><textarea class="form-control" rows="6" data-v-e3075d36${_scopeId}>${ssrInterpolate(unref(editForm).value)}</textarea>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(editForm).errors.value,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3" data-v-e3075d36${_scopeId}><label class="form-label" data-v-e3075d36${_scopeId}>Ganti Gambar</label>`);
            if (currentImageUrl.value) {
              _push2(`<img${ssrRenderAttr("src", currentImageUrl.value)} alt="Gambar saat ini" class="d-block rounded border object-fit-cover mb-2" style="${ssrRenderStyle({ "width": "140px", "height": "90px" })}" data-v-e3075d36${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<input type="file" class="form-control" accept="image/jpeg,image/png,image/webp" data-v-e3075d36${_scopeId}><div class="form-text" data-v-e3075d36${_scopeId}>Biarkan kosong untuk mempertahankan gambar saat ini. Maksimal 5 MB.</div>`);
            if (editFileError.value) {
              _push2(`<div class="text-danger small mt-1" data-v-e3075d36${_scopeId}>${ssrInterpolate(editFileError.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(editForm).errors.image,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-e3075d36${_scopeId}><label class="form-label" data-v-e3075d36${_scopeId}>Urutan Tampil</label><input${ssrRenderAttr("value", unref(editForm).order)} min="0" type="number" class="form-control" data-v-e3075d36${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(editForm).errors.order,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="modal-footer" data-v-e3075d36${_scopeId}><button type="button" class="btn btn-light border" data-bs-dismiss="modal" data-v-e3075d36${_scopeId}>Batal</button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(editForm).processing || !!editFileError.value) ? " disabled" : ""} data-v-e3075d36${_scopeId}>`);
            if (unref(editForm).processing) {
              _push2(`<span class="spinner-border spinner-border-sm me-2" data-v-e3075d36${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(unref(editForm).processing ? "Menyimpan..." : "Simpan Perubahan")}</button></div></form></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Konten Company Profile" }),
              createVNode("div", { class: "container-fluid p-4" }, [
                createVNode("div", { class: "card shadow-sm border-0 rounded-4" }, [
                  createVNode("div", { class: "card-header bg-white d-flex flex-wrap gap-3 justify-content-between align-items-center py-3" }, [
                    createVNode("div", null, [
                      createVNode("h5", { class: "mb-1 fw-bold" }, "Konten Halaman Publik"),
                      createVNode("small", { class: "text-muted" }, "Kelola teks dan gambar yang digunakan pada company profile.")
                    ]),
                    createVNode("button", {
                      type: "button",
                      class: "btn btn-primary",
                      onClick: openAddForm
                    }, [
                      createVNode("i", {
                        class: [showAdd.value ? "bi-x-lg" : "bi-plus-lg", "bi me-1"]
                      }, null, 2),
                      createTextVNode(" " + toDisplayString(showAdd.value ? "Tutup Form" : "Tambah Konten"), 1)
                    ])
                  ]),
                  createVNode("div", { class: "card-body" }, [
                    showAdd.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-4 p-3 p-md-4 border rounded-3 bg-light"
                    }, [
                      createVNode("h6", { class: "fw-bold mb-3" }, "Konten Baru"),
                      createVNode("form", {
                        onSubmit: withModifiers(submitAdd, ["prevent"])
                      }, [
                        createVNode("div", { class: "row g-3" }, [
                          createVNode("div", { class: "col-md-8" }, [
                            createVNode("label", { class: "form-label" }, [
                              createTextVNode("Key / Identitas Konten "),
                              createVNode("span", { class: "text-danger" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).key = $event,
                              class: "form-control",
                              placeholder: "Contoh: homepage_hero_title",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [
                                vModelText,
                                unref(form).key,
                                void 0,
                                { trim: true }
                              ]
                            ]),
                            createVNode("div", { class: "form-text" }, "Harus unik. Key dipakai sistem untuk menempatkan konten dan tidak dapat diedit setelah dibuat."),
                            createVNode(_sfc_main$1, {
                              message: unref(form).errors.key,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "col-md-4" }, [
                            createVNode("label", { class: "form-label" }, "Urutan Tampil"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).order = $event,
                              min: "0",
                              type: "number",
                              class: "form-control"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [
                                vModelText,
                                unref(form).order,
                                void 0,
                                { number: true }
                              ]
                            ]),
                            createVNode(_sfc_main$1, {
                              message: unref(form).errors.order,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "col-12" }, [
                            createVNode("label", { class: "form-label" }, "Isi Konten"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).value = $event,
                              class: "form-control",
                              rows: "4",
                              placeholder: "Tulis isi konten di sini"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).value]
                            ]),
                            createVNode(_sfc_main$1, {
                              message: unref(form).errors.value,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "col-12" }, [
                            createVNode("label", { class: "form-label" }, [
                              createTextVNode("Gambar "),
                              createVNode("span", { class: "text-muted" }, "(opsional)")
                            ]),
                            createVNode("input", {
                              type: "file",
                              onChange: onFile,
                              accept: "image/jpeg,image/png,image/webp",
                              class: "form-control"
                            }, null, 32),
                            createVNode("div", { class: "form-text" }, "JPG, PNG, atau WEBP; maksimal 5 MB."),
                            addFileError.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-danger small mt-1"
                            }, toDisplayString(addFileError.value), 1)) : createCommentVNode("", true),
                            createVNode(_sfc_main$1, {
                              message: unref(form).errors.image,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "col-12 text-end" }, [
                            createVNode("button", {
                              type: "button",
                              class: "btn btn-light border me-2",
                              onClick: openAddForm
                            }, "Batal"),
                            createVNode("button", {
                              type: "submit",
                              class: "btn btn-success",
                              disabled: unref(form).processing || !!addFileError.value
                            }, [
                              unref(form).processing ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "spinner-border spinner-border-sm me-2"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Konten"), 1)
                            ], 8, ["disabled"])
                          ])
                        ])
                      ], 32)
                    ])) : createCommentVNode("", true),
                    items.value.length ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "list-group list-group-flush border rounded-3 overflow-hidden"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(items.value, (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "list-group-item p-3 d-flex flex-column flex-md-row gap-3 justify-content-between align-items-md-center"
                        }, [
                          createVNode("div", { class: "d-flex gap-3 align-items-center min-width-0" }, [
                            item.image_url ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: item.image_url,
                              alt: "Gambar konten",
                              class: "rounded border object-fit-cover flex-shrink-0",
                              style: { "width": "72px", "height": "56px" }
                            }, null, 8, ["src"])) : createCommentVNode("", true),
                            createVNode("div", { class: "min-width-0" }, [
                              createVNode("div", { class: "fw-bold text-break" }, [
                                createTextVNode(toDisplayString(item.key) + " ", 1),
                                createVNode("small", { class: "badge bg-light text-dark border ms-1" }, "Urutan " + toDisplayString(item.order), 1)
                              ]),
                              createVNode("div", { class: "text-muted small text-preview" }, toDisplayString(item.value || "Belum ada isi teks."), 1)
                            ])
                          ]),
                          createVNode("div", { class: "d-flex gap-2 flex-shrink-0" }, [
                            item.image_url ? (openBlock(), createBlock("a", {
                              key: 0,
                              href: item.image_url,
                              target: "_blank",
                              rel: "noopener",
                              class: "btn btn-sm btn-outline-secondary"
                            }, "Lihat Gambar", 8, ["href"])) : createCommentVNode("", true),
                            createVNode("button", {
                              type: "button",
                              class: "btn btn-sm btn-outline-primary",
                              onClick: ($event) => startEdit(item)
                            }, "Edit", 8, ["onClick"]),
                            createVNode("button", {
                              type: "button",
                              class: "btn btn-sm btn-outline-danger",
                              onClick: ($event) => remove(item.id)
                            }, "Hapus", 8, ["onClick"])
                          ])
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "text-center text-muted py-5"
                    }, [
                      createVNode("i", { class: "bi bi-file-earmark-text fs-1 d-block mb-2" }),
                      createTextVNode(" Belum ada konten company profile. ")
                    ]))
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal fade",
                id: "editComproModal",
                tabindex: "-1",
                "aria-hidden": "true"
              }, [
                createVNode("div", { class: "modal-dialog modal-lg modal-dialog-centered" }, [
                  createVNode("div", { class: "modal-content" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submitEdit, ["prevent"])
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
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label" }, "Isi Konten"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(editForm).value = $event,
                            class: "form-control",
                            rows: "6"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(editForm).value]
                          ]),
                          createVNode(_sfc_main$1, {
                            message: unref(editForm).errors.value,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label" }, "Ganti Gambar"),
                          currentImageUrl.value ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: currentImageUrl.value,
                            alt: "Gambar saat ini",
                            class: "d-block rounded border object-fit-cover mb-2",
                            style: { "width": "140px", "height": "90px" }
                          }, null, 8, ["src"])) : createCommentVNode("", true),
                          createVNode("input", {
                            type: "file",
                            onChange: onEditFile,
                            class: "form-control",
                            accept: "image/jpeg,image/png,image/webp"
                          }, null, 32),
                          createVNode("div", { class: "form-text" }, "Biarkan kosong untuk mempertahankan gambar saat ini. Maksimal 5 MB."),
                          editFileError.value ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-danger small mt-1"
                          }, toDisplayString(editFileError.value), 1)) : createCommentVNode("", true),
                          createVNode(_sfc_main$1, {
                            message: unref(editForm).errors.image,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "form-label" }, "Urutan Tampil"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(editForm).order = $event,
                            min: "0",
                            type: "number",
                            class: "form-control"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [
                              vModelText,
                              unref(editForm).order,
                              void 0,
                              { number: true }
                            ]
                          ]),
                          createVNode(_sfc_main$1, {
                            message: unref(editForm).errors.order,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("div", { class: "modal-footer" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-light border",
                          "data-bs-dismiss": "modal"
                        }, "Batal"),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary",
                          disabled: unref(editForm).processing || !!editFileError.value
                        }, [
                          unref(editForm).processing ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "spinner-border spinner-border-sm me-2"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(unref(editForm).processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
                        ], 8, ["disabled"])
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
const Compro = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e3075d36"]]);
export {
  Compro as default
};
//# sourceMappingURL=Compro-CVTom2F9.js.map
