import { ref, reactive, mergeProps, withCtx, unref, createVNode, createBlock, createCommentVNode, createTextVNode, openBlock, toDisplayString, withModifiers, withDirectives, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-4HC-0vm9.js";
import { useForm } from "@inertiajs/vue3";
import { route } from "ziggy-js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ModalConfirmation-CQDhtLdH.js";
const _sfc_main = {
  __name: "CertificatesManage",
  __ssrInlineRender: true,
  props: {
    applications: Array,
    certs: Array
  },
  setup(__props) {
    const isSubmitting = ref(false);
    const errors = reactive({});
    const form = useForm({
      internship_application_id: "",
      generated_for_user_id: "",
      file: null
    });
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const submitForm = async () => {
      isSubmitting.value = true;
      errors.value = {};
      form.post(route("certificate.store"), {
        onSuccess: () => {
          form.reset();
          isSubmitting.value = false;
        },
        onError: (err) => {
          errors.value = err;
          isSubmitting.value = false;
        }
      });
    };
    const downloadCertificate = async (certId) => {
      try {
        const response = await fetch(route("certificate.download", certId));
        if (!response.ok) throw new Error("Failed to download");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `sertifikat-${certId}.pdf`;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      } catch (error) {
        console.error("Download error:", error);
        alert("Gagal mengunduh sertifikat");
      }
    };
    const deleteCertificate = (certId) => {
      if (!confirm("Apakah Anda yakin ingin menghapus sertifikat ini?")) return;
      const deleteForm = useForm({});
      deleteForm.delete(route("certificate.destroy", certId));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-fluid mt-4 mb-4" }, _attrs))} data-v-30d07228>`);
      _push(ssrRenderComponent(StaffLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row mb-4" data-v-30d07228${_scopeId}><div class="col-12" data-v-30d07228${_scopeId}><h1 class="h3 fw-bold text-dark" data-v-30d07228${_scopeId}><i class="bi bi-file-pdf" data-v-30d07228${_scopeId}></i> Manajemen Sertifikat Magang </h1><p class="text-muted" data-v-30d07228${_scopeId}>Unggah, edit, dan kelola sertifikat magang dari sini.</p></div></div>`);
            if (_ctx.$page.props.flash.success) {
              _push2(`<div class="alert alert-success alert-dismissible fade show" role="alert" data-v-30d07228${_scopeId}><i class="bi bi-check-circle" data-v-30d07228${_scopeId}></i> ${ssrInterpolate(_ctx.$page.props.flash.success)} <button type="button" class="btn-close" data-bs-dismiss="alert" data-v-30d07228${_scopeId}></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.$page.props.flash.error) {
              _push2(`<div class="alert alert-danger alert-dismissible fade show" role="alert" data-v-30d07228${_scopeId}><i class="bi bi-exclamation-circle" data-v-30d07228${_scopeId}></i> ${ssrInterpolate(_ctx.$page.props.flash.error)} <button type="button" class="btn-close" data-bs-dismiss="alert" data-v-30d07228${_scopeId}></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="row" data-v-30d07228${_scopeId}><div class="col-lg-4 mb-4" data-v-30d07228${_scopeId}><div class="card border-0 shadow-sm" data-v-30d07228${_scopeId}><div class="card-header bg-primary text-white" data-v-30d07228${_scopeId}><h5 class="mb-0" data-v-30d07228${_scopeId}><i class="bi bi-cloud-upload" data-v-30d07228${_scopeId}></i> Unggah Sertifikat Baru </h5></div><div class="card-body" data-v-30d07228${_scopeId}><form enctype="multipart/form-data" data-v-30d07228${_scopeId}><div class="mb-3" data-v-30d07228${_scopeId}><label class="form-label fw-bold" data-v-30d07228${_scopeId}>Pilih Aplikasi Magang</label><select class="${ssrRenderClass([{ "is-invalid": errors.internship_application_id }, "form-select"])}" data-v-30d07228${_scopeId}><option value="" data-v-30d07228${ssrIncludeBooleanAttr(Array.isArray(unref(form).internship_application_id) ? ssrLooseContain(unref(form).internship_application_id, "") : ssrLooseEqual(unref(form).internship_application_id, "")) ? " selected" : ""}${_scopeId}>-- Pilih Aplikasi --</option><!--[-->`);
            ssrRenderList(__props.applications, (app) => {
              var _a;
              _push2(`<option${ssrRenderAttr("value", app.id)} data-v-30d07228${ssrIncludeBooleanAttr(Array.isArray(unref(form).internship_application_id) ? ssrLooseContain(unref(form).internship_application_id, app.id) : ssrLooseEqual(unref(form).internship_application_id, app.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate((_a = app.user) == null ? void 0 : _a.name)} - ${ssrInterpolate(formatDate(app.created_at))}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (errors.internship_application_id) {
              _push2(`<div class="invalid-feedback" data-v-30d07228${_scopeId}>${ssrInterpolate(errors.internship_application_id[0])}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-3" data-v-30d07228${_scopeId}><label class="form-label fw-bold" data-v-30d07228${_scopeId}>Untuk Pengguna (Opsional)</label><select class="${ssrRenderClass([{ "is-invalid": errors.generated_for_user_id }, "form-select"])}" data-v-30d07228${_scopeId}><option value="" data-v-30d07228${ssrIncludeBooleanAttr(Array.isArray(unref(form).generated_for_user_id) ? ssrLooseContain(unref(form).generated_for_user_id, "") : ssrLooseEqual(unref(form).generated_for_user_id, "")) ? " selected" : ""}${_scopeId}>-- Otomatis dari Aplikasi --</option></select><small class="text-muted" data-v-30d07228${_scopeId}>Biarkan kosong untuk menggunakan pengguna dari aplikasi</small>`);
            if (errors.generated_for_user_id) {
              _push2(`<div class="invalid-feedback" data-v-30d07228${_scopeId}>${ssrInterpolate(errors.generated_for_user_id[0])}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mb-3" data-v-30d07228${_scopeId}><label class="form-label fw-bold" data-v-30d07228${_scopeId}>File Sertifikat (PDF)</label><input type="file" class="${ssrRenderClass([{ "is-invalid": errors.file }, "form-control"])}" accept=".pdf" data-v-30d07228${_scopeId}><small class="text-muted" data-v-30d07228${_scopeId}>Maksimal 20MB, format PDF</small>`);
            if (errors.file) {
              _push2(`<div class="invalid-feedback" data-v-30d07228${_scopeId}>${ssrInterpolate(errors.file[0])}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="btn btn-primary w-100" data-v-30d07228${_scopeId}>`);
            if (!isSubmitting.value) {
              _push2(`<i class="bi bi-cloud-upload" data-v-30d07228${_scopeId}></i>`);
            } else {
              _push2(`<span class="spinner-border spinner-border-sm me-2" role="status" data-v-30d07228${_scopeId}></span>`);
            }
            _push2(` ${ssrInterpolate(isSubmitting.value ? "Mengunggah..." : "Unggah Sertifikat")}</button></form></div></div></div><div class="col-lg-8" data-v-30d07228${_scopeId}><div class="card border-0 shadow-sm" data-v-30d07228${_scopeId}><div class="card-header bg-light" data-v-30d07228${_scopeId}><h5 class="mb-0" data-v-30d07228${_scopeId}><i class="bi bi-list" data-v-30d07228${_scopeId}></i> Daftar Sertifikat (${ssrInterpolate(__props.certs.length)}) </h5></div><div class="table-responsive" data-v-30d07228${_scopeId}><table class="table table-hover mb-0" data-v-30d07228${_scopeId}><thead class="table-light" data-v-30d07228${_scopeId}><tr data-v-30d07228${_scopeId}><th class="fw-bold" data-v-30d07228${_scopeId}>Penerima</th><th class="fw-bold" data-v-30d07228${_scopeId}>Tanggal Terbit</th><th class="fw-bold" data-v-30d07228${_scopeId}>Diterbitkan Oleh</th><th class="fw-bold" data-v-30d07228${_scopeId}>Unduhan</th><th class="fw-bold text-center" data-v-30d07228${_scopeId}>Aksi</th></tr></thead><tbody data-v-30d07228${_scopeId}>`);
            if (__props.certs.length === 0) {
              _push2(`<tr data-v-30d07228${_scopeId}><td colspan="5" class="text-center text-muted py-4" data-v-30d07228${_scopeId}> Belum ada sertifikat yang diunggah </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.certs, (cert) => {
              var _a, _b;
              _push2(`<tr class="align-middle" data-v-30d07228${_scopeId}><td data-v-30d07228${_scopeId}><div class="d-flex align-items-center gap-2" data-v-30d07228${_scopeId}><i class="bi bi-person text-info" data-v-30d07228${_scopeId}></i><span class="text-dark fw-500" data-v-30d07228${_scopeId}>${ssrInterpolate(((_a = cert.recipient) == null ? void 0 : _a.name) || "N/A")}</span></div></td><td data-v-30d07228${_scopeId}><span class="text-dark" data-v-30d07228${_scopeId}>${ssrInterpolate(formatDate(cert.issued_at))}</span></td><td data-v-30d07228${_scopeId}><span class="text-muted" data-v-30d07228${_scopeId}>${ssrInterpolate(((_b = cert.issuer) == null ? void 0 : _b.name) || "N/A")}</span></td><td data-v-30d07228${_scopeId}><span class="badge bg-light text-dark" data-v-30d07228${_scopeId}><i class="bi bi-download" data-v-30d07228${_scopeId}></i> ${ssrInterpolate(cert.download_count || 0)}</span></td><td class="text-center" data-v-30d07228${_scopeId}><button class="btn btn-sm btn-info me-2" title="Unduh" data-v-30d07228${_scopeId}><i class="bi bi-download" data-v-30d07228${_scopeId}></i></button><button class="btn btn-sm btn-danger" title="Hapus" data-v-30d07228${_scopeId}><i class="bi bi-trash" data-v-30d07228${_scopeId}></i></button></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "row mb-4" }, [
                createVNode("div", { class: "col-12" }, [
                  createVNode("h1", { class: "h3 fw-bold text-dark" }, [
                    createVNode("i", { class: "bi bi-file-pdf" }),
                    createTextVNode(" Manajemen Sertifikat Magang ")
                  ]),
                  createVNode("p", { class: "text-muted" }, "Unggah, edit, dan kelola sertifikat magang dari sini.")
                ])
              ]),
              _ctx.$page.props.flash.success ? (openBlock(), createBlock("div", {
                key: 0,
                class: "alert alert-success alert-dismissible fade show",
                role: "alert"
              }, [
                createVNode("i", { class: "bi bi-check-circle" }),
                createTextVNode(" " + toDisplayString(_ctx.$page.props.flash.success) + " ", 1),
                createVNode("button", {
                  type: "button",
                  class: "btn-close",
                  "data-bs-dismiss": "alert"
                })
              ])) : createCommentVNode("", true),
              _ctx.$page.props.flash.error ? (openBlock(), createBlock("div", {
                key: 1,
                class: "alert alert-danger alert-dismissible fade show",
                role: "alert"
              }, [
                createVNode("i", { class: "bi bi-exclamation-circle" }),
                createTextVNode(" " + toDisplayString(_ctx.$page.props.flash.error) + " ", 1),
                createVNode("button", {
                  type: "button",
                  class: "btn-close",
                  "data-bs-dismiss": "alert"
                })
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "col-lg-4 mb-4" }, [
                  createVNode("div", { class: "card border-0 shadow-sm" }, [
                    createVNode("div", { class: "card-header bg-primary text-white" }, [
                      createVNode("h5", { class: "mb-0" }, [
                        createVNode("i", { class: "bi bi-cloud-upload" }),
                        createTextVNode(" Unggah Sertifikat Baru ")
                      ])
                    ]),
                    createVNode("div", { class: "card-body" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submitForm, ["prevent"]),
                        enctype: "multipart/form-data"
                      }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label fw-bold" }, "Pilih Aplikasi Magang"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).internship_application_id = $event,
                            class: ["form-select", { "is-invalid": errors.internship_application_id }]
                          }, [
                            createVNode("option", { value: "" }, "-- Pilih Aplikasi --"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.applications, (app) => {
                              var _a;
                              return openBlock(), createBlock("option", {
                                key: app.id,
                                value: app.id
                              }, toDisplayString((_a = app.user) == null ? void 0 : _a.name) + " - " + toDisplayString(formatDate(app.created_at)), 9, ["value"]);
                            }), 128))
                          ], 10, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).internship_application_id]
                          ]),
                          errors.internship_application_id ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "invalid-feedback"
                          }, toDisplayString(errors.internship_application_id[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label fw-bold" }, "Untuk Pengguna (Opsional)"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).generated_for_user_id = $event,
                            class: ["form-select", { "is-invalid": errors.generated_for_user_id }]
                          }, [
                            createVNode("option", { value: "" }, "-- Otomatis dari Aplikasi --")
                          ], 10, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).generated_for_user_id]
                          ]),
                          createVNode("small", { class: "text-muted" }, "Biarkan kosong untuk menggunakan pengguna dari aplikasi"),
                          errors.generated_for_user_id ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "invalid-feedback"
                          }, toDisplayString(errors.generated_for_user_id[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label fw-bold" }, "File Sertifikat (PDF)"),
                          createVNode("input", {
                            type: "file",
                            class: ["form-control", { "is-invalid": errors.file }],
                            onChange: ($event) => unref(form).file = $event.target.files[0],
                            accept: ".pdf"
                          }, null, 42, ["onChange"]),
                          createVNode("small", { class: "text-muted" }, "Maksimal 20MB, format PDF"),
                          errors.file ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "invalid-feedback"
                          }, toDisplayString(errors.file[0]), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("button", {
                          type: "submit",
                          disabled: isSubmitting.value,
                          class: "btn btn-primary w-100"
                        }, [
                          !isSubmitting.value ? (openBlock(), createBlock("i", {
                            key: 0,
                            class: "bi bi-cloud-upload"
                          })) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "spinner-border spinner-border-sm me-2",
                            role: "status"
                          })),
                          createTextVNode(" " + toDisplayString(isSubmitting.value ? "Mengunggah..." : "Unggah Sertifikat"), 1)
                        ], 8, ["disabled"])
                      ], 32)
                    ])
                  ])
                ]),
                createVNode("div", { class: "col-lg-8" }, [
                  createVNode("div", { class: "card border-0 shadow-sm" }, [
                    createVNode("div", { class: "card-header bg-light" }, [
                      createVNode("h5", { class: "mb-0" }, [
                        createVNode("i", { class: "bi bi-list" }),
                        createTextVNode(" Daftar Sertifikat (" + toDisplayString(__props.certs.length) + ") ", 1)
                      ])
                    ]),
                    createVNode("div", { class: "table-responsive" }, [
                      createVNode("table", { class: "table table-hover mb-0" }, [
                        createVNode("thead", { class: "table-light" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "fw-bold" }, "Penerima"),
                            createVNode("th", { class: "fw-bold" }, "Tanggal Terbit"),
                            createVNode("th", { class: "fw-bold" }, "Diterbitkan Oleh"),
                            createVNode("th", { class: "fw-bold" }, "Unduhan"),
                            createVNode("th", { class: "fw-bold text-center" }, "Aksi")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          __props.certs.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "5",
                              class: "text-center text-muted py-4"
                            }, " Belum ada sertifikat yang diunggah ")
                          ])) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.certs, (cert) => {
                            var _a, _b;
                            return openBlock(), createBlock("tr", {
                              key: cert.id,
                              class: "align-middle"
                            }, [
                              createVNode("td", null, [
                                createVNode("div", { class: "d-flex align-items-center gap-2" }, [
                                  createVNode("i", { class: "bi bi-person text-info" }),
                                  createVNode("span", { class: "text-dark fw-500" }, toDisplayString(((_a = cert.recipient) == null ? void 0 : _a.name) || "N/A"), 1)
                                ])
                              ]),
                              createVNode("td", null, [
                                createVNode("span", { class: "text-dark" }, toDisplayString(formatDate(cert.issued_at)), 1)
                              ]),
                              createVNode("td", null, [
                                createVNode("span", { class: "text-muted" }, toDisplayString(((_b = cert.issuer) == null ? void 0 : _b.name) || "N/A"), 1)
                              ]),
                              createVNode("td", null, [
                                createVNode("span", { class: "badge bg-light text-dark" }, [
                                  createVNode("i", { class: "bi bi-download" }),
                                  createTextVNode(" " + toDisplayString(cert.download_count || 0), 1)
                                ])
                              ]),
                              createVNode("td", { class: "text-center" }, [
                                createVNode("button", {
                                  onClick: ($event) => downloadCertificate(cert.id),
                                  class: "btn btn-sm btn-info me-2",
                                  title: "Unduh"
                                }, [
                                  createVNode("i", { class: "bi bi-download" })
                                ], 8, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => deleteCertificate(cert.id),
                                  class: "btn btn-sm btn-danger",
                                  title: "Hapus"
                                }, [
                                  createVNode("i", { class: "bi bi-trash" })
                                ], 8, ["onClick"])
                              ])
                            ]);
                          }), 128))
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
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Internship/CertificatesManage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CertificatesManage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-30d07228"]]);
export {
  CertificatesManage as default
};
