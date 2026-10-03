import { ref, onMounted, nextTick, onBeforeUnmount, withCtx, unref, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, withModifiers, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, usePage } from "@inertiajs/vue3";
import { S as StaffLayout } from "./StaffLayout-6jqdAWGT.js";
import { _ as _sfc_main$1 } from "./InputError-DkffFxkw.js";
import { _ as _sfc_main$2 } from "./Notif-Zffab37M.js";
import "./ModalConfirmation-CzGDjmDO.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
const _sfc_main = {
  __name: "Activities",
  __ssrInlineRender: true,
  props: {
    activities: Array
  },
  setup(__props) {
    const route = (name, params = {}) => window.route(name, params);
    const notifRef = ref(null);
    const modalInstance = ref(null);
    const isEdit = ref(false);
    const currentImageUrl = ref(null);
    const imagePreviewUrl = ref(null);
    const fileError = ref("");
    const fileInputKey = ref(0);
    const isGeneratingContent = ref(false);
    const aiError = ref("");
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
      var _a;
      const file = ((_a = e.target.files) == null ? void 0 : _a[0]) || null;
      fileError.value = "";
      if (file && !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        fileError.value = "Gunakan gambar JPG, PNG, atau WEBP.";
        e.target.value = "";
        form.image_path = null;
        clearImagePreview();
        return;
      }
      if (file && file.size > 2 * 1024 * 1024) {
        fileError.value = "Ukuran gambar maksimal 2 MB.";
        e.target.value = "";
        form.image_path = null;
        clearImagePreview();
        return;
      }
      clearImagePreview();
      form.image_path = file;
      imagePreviewUrl.value = file ? URL.createObjectURL(file) : null;
    }
    function clearImagePreview() {
      if (imagePreviewUrl.value) URL.revokeObjectURL(imagePreviewUrl.value);
      imagePreviewUrl.value = null;
    }
    function formatDate(value) {
      if (!value) return "-";
      const [year, month, day] = value.slice(0, 10).split("-");
      return `${day}/${month}/${year}`;
    }
    function showModal(activity = null) {
      var _a;
      form.reset();
      form.clearErrors();
      clearImagePreview();
      fileError.value = "";
      fileInputKey.value += 1;
      aiError.value = "";
      if (activity) {
        isEdit.value = true;
        form.id = activity.id;
        form.title = activity.title;
        form.description = activity.description;
        form.category = activity.category;
        form.date = ((_a = activity.date) == null ? void 0 : _a.slice(0, 10)) || "";
        form.is_published = activity.is_published == 1;
        form.image_path = null;
        currentImageUrl.value = activity.image_url;
      } else {
        isEdit.value = false;
        currentImageUrl.value = null;
      }
      if (modalInstance.value) modalInstance.value.show();
    }
    function hideModal() {
      if (modalInstance.value) modalInstance.value.hide();
      form.reset();
      form.clearErrors();
      currentImageUrl.value = null;
      fileError.value = "";
      aiError.value = "";
      clearImagePreview();
      fileInputKey.value += 1;
    }
    async function generateContent() {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      aiError.value = "";
      if (!form.title.trim()) {
        aiError.value = "Isi judul terlebih dahulu agar AI memiliki konteks.";
        return;
      }
      if (form.description.trim().length < 40) {
        aiError.value = "Tuliskan bahan berita minimal 40 karakter (5W+1H, rangkaian, atau hasil kegiatan) sebelum menggunakan AI.";
        return;
      }
      if (form.description.trim() && !confirm("Konten yang ada akan diganti dengan hasil AI. Lanjutkan?")) {
        return;
      }
      isGeneratingContent.value = true;
      try {
        const response = await window.axios.post(
          route("marketing.activities.generate-content"),
          {
            title: form.title,
            category: form.category || null,
            date: form.date || null,
            current_content: form.description || null
          }
        );
        form.description = response.data.content;
        (_a = notifRef.value) == null ? void 0 : _a.showToast("success", "Draf konten berhasil dibuat oleh AI. Silakan periksa sebelum diterbitkan.");
      } catch (error) {
        aiError.value = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message) || ((_g = (_f = (_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.errors) == null ? void 0 : _f.title) == null ? void 0 : _g[0]) || ((_k = (_j = (_i = (_h = error.response) == null ? void 0 : _h.data) == null ? void 0 : _i.errors) == null ? void 0 : _j.current_content) == null ? void 0 : _k[0]) || "Konten AI gagal dibuat. Silakan coba lagi.";
      } finally {
        isGeneratingContent.value = false;
      }
    }
    function submitForm() {
      if (fileError.value) return;
      const options = {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          var _a;
          const message = isEdit.value ? "Berita atau kegiatan berhasil diperbarui." : "Berita atau kegiatan berhasil ditambahkan.";
          hideModal();
          (_a = notifRef.value) == null ? void 0 : _a.showToast("success", message);
        }
      };
      if (isEdit.value) {
        form.post(route("marketing.activities.update", form.id), options);
      } else {
        form.post(route("marketing.activities.store"), options);
      }
    }
    function deleteActivity(id) {
      if (confirm("Yakin ingin menghapus berita/kegiatan ini?")) {
        form.delete(route("marketing.activities.destroy", id), {
          preserveScroll: true,
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
    onBeforeUnmount(clearImagePreview);
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
            _push2(`<div class="container-fluid p-4"${_scopeId}><div class="card shadow-sm border-0 rounded-4"${_scopeId}><div class="card-header bg-white border-bottom py-3 d-flex flex-wrap gap-3 justify-content-between align-items-center"${_scopeId}><div${_scopeId}><h5 class="mb-1 fw-bold"${_scopeId}>Data Berita / Sorotan Program</h5><small class="text-muted"${_scopeId}>Buat sebagai draft dulu atau langsung terbitkan ke halaman publik.</small></div><button type="button" class="btn btn-primary shadow-sm"${_scopeId}><i class="bi bi-plus-lg me-1"${_scopeId}></i> Tambah Entri </button></div><div class="card-body"${_scopeId}><div class="table-responsive"${_scopeId}><table class="table table-hover align-middle"${_scopeId}><thead class="table-light"${_scopeId}><tr${_scopeId}><th${_scopeId}>Tanggal</th><th${_scopeId}>Status</th><th${_scopeId}>Judul / Berita</th><th${_scopeId}>Kategori</th><th${_scopeId}>Banner</th><th${_scopeId}>Aksi</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.activities, (item) => {
              _push2(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(formatDate(item.date))}</td><td${_scopeId}><span class="${ssrRenderClass([item.is_published ? "bg-success" : "bg-warning text-dark", "badge"])}"${_scopeId}>${ssrInterpolate(item.is_published ? "Terbit" : "Draft")}</span></td><td${_scopeId}><span class="fw-medium d-block"${_scopeId}>${ssrInterpolate(item.title)}</span><small class="text-muted text-truncate d-inline-block" style="${ssrRenderStyle({ "max-width": "250px" })}"${_scopeId}>${ssrInterpolate(item.description)}</small></td><td${_scopeId}>${ssrInterpolate(item.category || "-")}</td><td${_scopeId}>`);
              if (item.image_url) {
                _push2(`<img${ssrRenderAttr("src", item.image_url)} class="rounded border object-fit-cover" style="${ssrRenderStyle({ "width": "60px", "height": "40px" })}"${_scopeId}>`);
              } else {
                _push2(`<span class="text-muted small fst-italic"${_scopeId}>Tanpa gambar</span>`);
              }
              _push2(`</td><td${_scopeId}><button type="button" class="btn btn-sm btn-light border me-2" title="Edit berita"${_scopeId}><i class="bi bi-pencil me-1"${_scopeId}></i>Edit </button><button type="button" class="btn btn-sm btn-outline-danger" title="Hapus berita"${_scopeId}><i class="bi bi-trash me-1"${_scopeId}></i>Hapus </button></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.activities.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="text-center py-4 text-muted"${_scopeId}>Belum ada data berita atau aktivitas.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div></div><div class="modal fade" id="activityModal" tabindex="-1" aria-labelledby="activityModalLabel" aria-hidden="true"${_scopeId}><div class="modal-dialog modal-lg"${_scopeId}><div class="modal-content"${_scopeId}><form${_scopeId}><div class="modal-header"${_scopeId}><h5 class="modal-title" id="activityModalLabel"${_scopeId}>${ssrInterpolate(isEdit.value ? "Edit Berita/Kegiatan" : "Tambah Berita/Kegiatan")}</h5><button type="button" class="btn-close"${_scopeId}></button></div><div class="modal-body"${_scopeId}><div class="mb-3"${_scopeId}><label class="form-label"${_scopeId}>Judul / Sorotan Utama <span class="text-danger"${_scopeId}>*</span></label><input type="text" class="form-control"${ssrRenderAttr("value", unref(form).title)} maxlength="150" placeholder="Judul singkat, bukan bahan berita" required autofocus${_scopeId}><div class="form-text d-flex justify-content-between gap-3"${_scopeId}><span${_scopeId}>Maksimal 150 karakter. Masukkan fakta mentah pada kolom Bahan AI di bawah.</span><span${_scopeId}>${ssrInterpolate(unref(form).title.length)}/150</span></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.title,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3"${_scopeId}><div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2"${_scopeId}><label class="form-label mb-0"${_scopeId}>Deskripsi Lengkap / Bahan AI <span class="text-danger"${_scopeId}>*</span></label><button type="button" class="btn btn-sm btn-outline-primary"${ssrIncludeBooleanAttr(isGeneratingContent.value || !unref(form).title.trim()) ? " disabled" : ""}${_scopeId}>`);
            if (isGeneratingContent.value) {
              _push2(`<span class="spinner-border spinner-border-sm me-1"${_scopeId}></span>`);
            } else {
              _push2(`<i class="bi bi-stars me-1"${_scopeId}></i>`);
            }
            _push2(` ${ssrInterpolate(isGeneratingContent.value ? "AI sedang menulis..." : "Buat Konten dengan AI")}</button></div><textarea class="form-control" rows="6" placeholder="Tuliskan poin faktual: siapa yang terlibat, apa kegiatannya, kapan dan di mana, rangkaian acara, hasil, serta kutipan bila ada. Setelah itu klik Buat Konten dengan AI." required${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea><div class="form-text"${_scopeId}>Semakin lengkap bahan 5W+1H yang ditulis, semakin natural hasil artikelnya. AI tidak akan menambahkan fakta yang tidak tersedia.</div>`);
            if (aiError.value) {
              _push2(`<div class="text-danger small mt-1"${_scopeId}>${ssrInterpolate(aiError.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
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
            _push2(`</div></div><div class="row mb-3"${_scopeId}><div class="col-md-6"${_scopeId}><label class="form-label"${_scopeId}>Gambar Thumbnail / Banner</label>`);
            if (imagePreviewUrl.value || currentImageUrl.value) {
              _push2(`<img${ssrRenderAttr("src", imagePreviewUrl.value || currentImageUrl.value)} alt="Pratinjau gambar" class="d-block rounded border object-fit-cover mb-2 w-100" style="${ssrRenderStyle({ "height": "130px" })}"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<input type="file" class="form-control" accept="image/jpeg,image/png,image/webp"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.image_path,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            if (fileError.value) {
              _push2(`<div class="text-danger small mt-1"${_scopeId}>${ssrInterpolate(fileError.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="form-text"${_scopeId}>JPG, PNG, atau WEBP; maksimal 2 MB. ${ssrInterpolate(isEdit.value ? "Biarkan kosong untuk mempertahankan gambar." : "")}</div></div><div class="col-md-6 d-flex align-items-center"${_scopeId}><div class="form-check form-switch mt-4"${_scopeId}><input class="form-check-input" type="checkbox" id="isPub"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_published) ? ssrLooseContain(unref(form).is_published, null) : unref(form).is_published) ? " checked" : ""}${_scopeId}><label class="form-check-label" for="isPub"${_scopeId}>Langsung tampilkan di halaman publik</label></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.is_published,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="modal-footer"${_scopeId}><button type="button" class="btn btn-secondary"${_scopeId}>Batal</button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form).processing || !!fileError.value) ? " disabled" : ""}${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<span class="spinner-border spinner-border-sm me-2"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Menyimpan..." : isEdit.value ? "Simpan Perubahan" : "Tambah Berita")}</button></div></form></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "notifRef",
              ref: notifRef
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "container-fluid p-4" }, [
                createVNode("div", { class: "card shadow-sm border-0 rounded-4" }, [
                  createVNode("div", { class: "card-header bg-white border-bottom py-3 d-flex flex-wrap gap-3 justify-content-between align-items-center" }, [
                    createVNode("div", null, [
                      createVNode("h5", { class: "mb-1 fw-bold" }, "Data Berita / Sorotan Program"),
                      createVNode("small", { class: "text-muted" }, "Buat sebagai draft dulu atau langsung terbitkan ke halaman publik.")
                    ]),
                    createVNode("button", {
                      type: "button",
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
                              createVNode("td", null, toDisplayString(formatDate(item.date)), 1),
                              createVNode("td", null, [
                                createVNode("span", {
                                  class: ["badge", item.is_published ? "bg-success" : "bg-warning text-dark"]
                                }, toDisplayString(item.is_published ? "Terbit" : "Draft"), 3)
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
                                }, "Tanpa gambar"))
                              ]),
                              createVNode("td", null, [
                                createVNode("button", {
                                  type: "button",
                                  class: "btn btn-sm btn-light border me-2",
                                  title: "Edit berita",
                                  onClick: ($event) => showModal(item)
                                }, [
                                  createVNode("i", { class: "bi bi-pencil me-1" }),
                                  createTextVNode("Edit ")
                                ], 8, ["onClick"]),
                                createVNode("button", {
                                  type: "button",
                                  class: "btn btn-sm btn-outline-danger",
                                  title: "Hapus berita",
                                  onClick: ($event) => deleteActivity(item.id)
                                }, [
                                  createVNode("i", { class: "bi bi-trash me-1" }),
                                  createTextVNode("Hapus ")
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
                          createVNode("label", { class: "form-label" }, [
                            createTextVNode("Judul / Sorotan Utama "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            class: "form-control",
                            "onUpdate:modelValue": ($event) => unref(form).title = $event,
                            maxlength: "150",
                            placeholder: "Judul singkat, bukan bahan berita",
                            required: "",
                            autofocus: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [
                              vModelText,
                              unref(form).title,
                              void 0,
                              { trim: true }
                            ]
                          ]),
                          createVNode("div", { class: "form-text d-flex justify-content-between gap-3" }, [
                            createVNode("span", null, "Maksimal 150 karakter. Masukkan fakta mentah pada kolom Bahan AI di bawah."),
                            createVNode("span", null, toDisplayString(unref(form).title.length) + "/150", 1)
                          ]),
                          createVNode(_sfc_main$1, {
                            message: unref(form).errors.title,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("div", { class: "d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2" }, [
                            createVNode("label", { class: "form-label mb-0" }, [
                              createTextVNode("Deskripsi Lengkap / Bahan AI "),
                              createVNode("span", { class: "text-danger" }, "*")
                            ]),
                            createVNode("button", {
                              type: "button",
                              class: "btn btn-sm btn-outline-primary",
                              disabled: isGeneratingContent.value || !unref(form).title.trim(),
                              onClick: generateContent
                            }, [
                              isGeneratingContent.value ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "spinner-border spinner-border-sm me-1"
                              })) : (openBlock(), createBlock("i", {
                                key: 1,
                                class: "bi bi-stars me-1"
                              })),
                              createTextVNode(" " + toDisplayString(isGeneratingContent.value ? "AI sedang menulis..." : "Buat Konten dengan AI"), 1)
                            ], 8, ["disabled"])
                          ]),
                          withDirectives(createVNode("textarea", {
                            class: "form-control",
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            rows: "6",
                            placeholder: "Tuliskan poin faktual: siapa yang terlibat, apa kegiatannya, kapan dan di mana, rangkaian acara, hasil, serta kutipan bila ada. Setelah itu klik Buat Konten dengan AI.",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [
                              vModelText,
                              unref(form).description,
                              void 0,
                              { trim: true }
                            ]
                          ]),
                          createVNode("div", { class: "form-text" }, "Semakin lengkap bahan 5W+1H yang ditulis, semakin natural hasil artikelnya. AI tidak akan menambahkan fakta yang tidak tersedia."),
                          aiError.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-danger small mt-1"
                          }, toDisplayString(aiError.value), 1)) : createCommentVNode("", true),
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
                            imagePreviewUrl.value || currentImageUrl.value ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: imagePreviewUrl.value || currentImageUrl.value,
                              alt: "Pratinjau gambar",
                              class: "d-block rounded border object-fit-cover mb-2 w-100",
                              style: { "height": "130px" }
                            }, null, 8, ["src"])) : createCommentVNode("", true),
                            (openBlock(), createBlock("input", {
                              key: fileInputKey.value,
                              type: "file",
                              class: "form-control",
                              onChange: handleFileChange,
                              accept: "image/jpeg,image/png,image/webp"
                            }, null, 32)),
                            createVNode(_sfc_main$1, {
                              message: unref(form).errors.image_path,
                              class: "mt-1"
                            }, null, 8, ["message"]),
                            fileError.value ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "text-danger small mt-1"
                            }, toDisplayString(fileError.value), 1)) : createCommentVNode("", true),
                            createVNode("div", { class: "form-text" }, "JPG, PNG, atau WEBP; maksimal 2 MB. " + toDisplayString(isEdit.value ? "Biarkan kosong untuk mempertahankan gambar." : ""), 1)
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
                              }, "Langsung tampilkan di halaman publik")
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
                          disabled: unref(form).processing || !!fileError.value
                        }, [
                          unref(form).processing ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "spinner-border spinner-border-sm me-2"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : isEdit.value ? "Simpan Perubahan" : "Tambah Berita"), 1)
                        ], 8, ["disabled"])
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
//# sourceMappingURL=Activities-DxaIaV1n.js.map
