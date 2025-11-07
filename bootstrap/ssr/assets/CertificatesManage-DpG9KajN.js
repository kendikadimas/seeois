import { ref, onMounted, reactive, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, withModifiers, withDirectives, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-tN1R9s2b.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { route } from "ziggy-js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ModalConfirmation-CQDhtLdH.js";
const _sfc_main = {
  __name: "CertificatesManage",
  __ssrInlineRender: true,
  props: {
    interns: Array,
    certs: Array
  },
  setup(__props) {
    const props = __props;
    usePage();
    const certs = ref(props.certs || []);
    const interns = ref(props.interns || []);
    onMounted(() => {
      var _a;
      console.log("Interns received:", props.interns);
      console.log("Interns count:", (_a = props.interns) == null ? void 0 : _a.length);
      console.log("Certs received:", props.certs);
      if (!props.interns || props.interns.length === 0) {
        console.warn("⚠️ No interns data received from server!");
      }
    });
    const isSubmitting = ref(false);
    const errors = reactive({});
    const form = useForm({
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
          fetch(route("certificate.manage.index")).then((res) => res.text()).then((html) => {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
            const scriptTag = tempDiv.querySelector('script[type="application/json"]');
            if (scriptTag) {
              const data = JSON.parse(scriptTag.textContent);
              if (data.props && data.props.certs) {
                certs.value = data.props.certs;
              }
            }
          });
        },
        onError: (err) => {
          errors.value = err;
          isSubmitting.value = false;
        }
      });
    };
    const downloadCertificate = (certId) => {
      window.location.href = route("certificate.download", certId);
    };
    const deleteCertificate = (certId) => {
      if (!confirm("Apakah Anda yakin ingin menghapus sertifikat ini?")) return;
      const deleteForm = useForm({});
      deleteForm.delete(route("certificate.destroy", certId), {
        onSuccess: () => {
          certs.value = certs.value.filter((c) => c.id !== certId);
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "certificates-manage-container" }, _attrs))} data-v-2e5800d8>`);
      _push(ssrRenderComponent(unref(Head), { title: "Manajemen Sertifikat Internship" }, null, _parent));
      _push(ssrRenderComponent(StaffLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="header-section" data-v-2e5800d8${_scopeId}><div class="header-content" data-v-2e5800d8${_scopeId}><div class="header-left" data-v-2e5800d8${_scopeId}><div class="header-icon" data-v-2e5800d8${_scopeId}><i class="bi bi-file-pdf" data-v-2e5800d8${_scopeId}></i></div><div class="header-text" data-v-2e5800d8${_scopeId}><h1 class="header-title" data-v-2e5800d8${_scopeId}>Manajemen Sertifikat Internship</h1><p class="header-subtitle" data-v-2e5800d8${_scopeId}>Unggah, edit, dan kelola sertifikat Internship dari sini</p></div></div></div></div>`);
            if (_ctx.$page.props.flash.success) {
              _push2(`<div class="alert alert-success-custom" role="alert" data-v-2e5800d8${_scopeId}><i class="bi bi-check-circle-fill" data-v-2e5800d8${_scopeId}></i><div class="alert-content" data-v-2e5800d8${_scopeId}><strong data-v-2e5800d8${_scopeId}>Sukses!</strong> ${ssrInterpolate(_ctx.$page.props.flash.success)}</div><button type="button" class="alert-close" data-v-2e5800d8${_scopeId}><i class="bi bi-x" data-v-2e5800d8${_scopeId}></i></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.$page.props.flash.error) {
              _push2(`<div class="alert alert-danger-custom" role="alert" data-v-2e5800d8${_scopeId}><i class="bi bi-exclamation-circle-fill" data-v-2e5800d8${_scopeId}></i><div class="alert-content" data-v-2e5800d8${_scopeId}><strong data-v-2e5800d8${_scopeId}>Error!</strong> ${ssrInterpolate(_ctx.$page.props.flash.error)}</div><button type="button" class="alert-close" data-v-2e5800d8${_scopeId}><i class="bi bi-x" data-v-2e5800d8${_scopeId}></i></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="content-grid" data-v-2e5800d8${_scopeId}><div class="upload-card" data-v-2e5800d8${_scopeId}><div class="card-header-custom" data-v-2e5800d8${_scopeId}><div class="header-icon-small" data-v-2e5800d8${_scopeId}><i class="bi bi-cloud-upload" data-v-2e5800d8${_scopeId}></i></div><h5 class="card-title-custom" data-v-2e5800d8${_scopeId}>Unggah Sertifikat Baru</h5></div><div class="card-body-custom" data-v-2e5800d8${_scopeId}><form class="upload-form" data-v-2e5800d8${_scopeId}><div class="form-group-custom" data-v-2e5800d8${_scopeId}><label class="form-label-custom" data-v-2e5800d8${_scopeId}><i class="bi bi-person-check" data-v-2e5800d8${_scopeId}></i> Pilih Intern </label><select class="${ssrRenderClass([{ "is-invalid": errors.generated_for_user_id }, "form-select-custom"])}" data-v-2e5800d8${_scopeId}><option value="" data-v-2e5800d8${ssrIncludeBooleanAttr(Array.isArray(unref(form).generated_for_user_id) ? ssrLooseContain(unref(form).generated_for_user_id, "") : ssrLooseEqual(unref(form).generated_for_user_id, "")) ? " selected" : ""}${_scopeId}>-- Pilih Intern --</option><!--[-->`);
            ssrRenderList(interns.value, (intern) => {
              _push2(`<option${ssrRenderAttr("value", intern.id)} data-v-2e5800d8${ssrIncludeBooleanAttr(Array.isArray(unref(form).generated_for_user_id) ? ssrLooseContain(unref(form).generated_for_user_id, intern.id) : ssrLooseEqual(unref(form).generated_for_user_id, intern.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(intern.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (errors.generated_for_user_id) {
              _push2(`<div class="error-message" data-v-2e5800d8${_scopeId}><i class="bi bi-exclamation-circle" data-v-2e5800d8${_scopeId}></i> ${ssrInterpolate(errors.generated_for_user_id[0])}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-group-custom" data-v-2e5800d8${_scopeId}><label class="form-label-custom" data-v-2e5800d8${_scopeId}><i class="bi bi-file-pdf" data-v-2e5800d8${_scopeId}></i> File Sertifikat (PDF) </label><div class="file-input-wrapper" data-v-2e5800d8${_scopeId}><input type="file" class="${ssrRenderClass([{ "is-invalid": errors.file }, "file-input-custom"])}" accept=".pdf" id="certificateFile" data-v-2e5800d8${_scopeId}><label for="certificateFile" class="file-label-custom" data-v-2e5800d8${_scopeId}><i class="bi bi-cloud-arrow-up" data-v-2e5800d8${_scopeId}></i>`);
            if (!unref(form).file) {
              _push2(`<span data-v-2e5800d8${_scopeId}>Klik untuk memilih file atau drag &amp; drop</span>`);
            } else {
              _push2(`<span class="file-selected" data-v-2e5800d8${_scopeId}><i class="bi bi-check-circle-fill text-success" data-v-2e5800d8${_scopeId}></i> ${ssrInterpolate(unref(form).file.name)}</span>`);
            }
            _push2(`</label></div><small class="form-hint" data-v-2e5800d8${_scopeId}>Maksimal 20MB, format PDF</small>`);
            if (errors.file) {
              _push2(`<div class="error-message" data-v-2e5800d8${_scopeId}><i class="bi bi-exclamation-circle" data-v-2e5800d8${_scopeId}></i> ${ssrInterpolate(errors.file[0])}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="btn-submit-custom" data-v-2e5800d8${_scopeId}>`);
            if (!isSubmitting.value) {
              _push2(`<span class="btn-content" data-v-2e5800d8${_scopeId}><i class="bi bi-cloud-upload" data-v-2e5800d8${_scopeId}></i> Unggah Sertifikat </span>`);
            } else {
              _push2(`<span class="btn-content" data-v-2e5800d8${_scopeId}><span class="spinner-custom" data-v-2e5800d8${_scopeId}></span> Mengunggah... </span>`);
            }
            _push2(`</button></form></div></div><div class="certificates-card" data-v-2e5800d8${_scopeId}><div class="card-header-custom" data-v-2e5800d8${_scopeId}><div class="header-title-section" data-v-2e5800d8${_scopeId}><div class="header-icon-small" data-v-2e5800d8${_scopeId}><i class="bi bi-list-check" data-v-2e5800d8${_scopeId}></i></div><div data-v-2e5800d8${_scopeId}><h5 class="card-title-custom" data-v-2e5800d8${_scopeId}>Daftar Sertifikat</h5><p class="card-subtitle-custom" data-v-2e5800d8${_scopeId}>Total: ${ssrInterpolate(certs.value.length)} sertifikat</p></div></div></div><div class="certificates-list-wrapper" data-v-2e5800d8${_scopeId}>`);
            if (certs.value.length === 0) {
              _push2(`<div class="empty-state" data-v-2e5800d8${_scopeId}><div class="empty-icon" data-v-2e5800d8${_scopeId}><i class="bi bi-inbox" data-v-2e5800d8${_scopeId}></i></div><h6 class="empty-title" data-v-2e5800d8${_scopeId}>Belum Ada Sertifikat</h6><p class="empty-text" data-v-2e5800d8${_scopeId}>Mulai dengan mengunggah sertifikat baru di formulir di samping.</p></div>`);
            } else {
              _push2(`<div class="certificates-table" data-v-2e5800d8${_scopeId}><!--[-->`);
              ssrRenderList(certs.value, (cert) => {
                var _a, _b, _c;
                _push2(`<div class="certificate-item" data-v-2e5800d8${_scopeId}><div class="cert-header" data-v-2e5800d8${_scopeId}><div class="cert-info" data-v-2e5800d8${_scopeId}><div class="cert-recipient" data-v-2e5800d8${_scopeId}><i class="bi bi-person-circle" data-v-2e5800d8${_scopeId}></i><div data-v-2e5800d8${_scopeId}><p class="recipient-name" data-v-2e5800d8${_scopeId}>${ssrInterpolate(((_a = cert.recipient) == null ? void 0 : _a.name) || "N/A")}</p><small class="recipient-email" data-v-2e5800d8${_scopeId}>${ssrInterpolate(((_b = cert.recipient) == null ? void 0 : _b.email) || "-")}</small></div></div></div><div class="cert-meta" data-v-2e5800d8${_scopeId}><div class="meta-item" data-v-2e5800d8${_scopeId}><i class="bi bi-calendar-event" data-v-2e5800d8${_scopeId}></i><span data-v-2e5800d8${_scopeId}>${ssrInterpolate(formatDate(cert.issued_at))}</span></div><div class="meta-item" data-v-2e5800d8${_scopeId}><i class="bi bi-person-badge" data-v-2e5800d8${_scopeId}></i><span data-v-2e5800d8${_scopeId}>${ssrInterpolate(((_c = cert.issuer) == null ? void 0 : _c.name) || "N/A")}</span></div></div></div><div class="cert-footer" data-v-2e5800d8${_scopeId}><div class="cert-stats" data-v-2e5800d8${_scopeId}><div class="stat-badge" data-v-2e5800d8${_scopeId}><i class="bi bi-download" data-v-2e5800d8${_scopeId}></i><span data-v-2e5800d8${_scopeId}>${ssrInterpolate(cert.download_count || 0)} unduhan</span></div><div class="status-badge published" data-v-2e5800d8${_scopeId}><i class="bi bi-check2-circle" data-v-2e5800d8${_scopeId}></i><span data-v-2e5800d8${_scopeId}>Dipublikasikan</span></div></div><div class="cert-actions" data-v-2e5800d8${_scopeId}><button class="btn-action btn-download" title="Unduh Sertifikat" data-v-2e5800d8${_scopeId}><i class="bi bi-download" data-v-2e5800d8${_scopeId}></i><span data-v-2e5800d8${_scopeId}>Unduh</span></button><button class="btn-action btn-delete" title="Hapus Sertifikat" data-v-2e5800d8${_scopeId}><i class="bi bi-trash" data-v-2e5800d8${_scopeId}></i><span data-v-2e5800d8${_scopeId}>Hapus</span></button></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "header-section" }, [
                createVNode("div", { class: "header-content" }, [
                  createVNode("div", { class: "header-left" }, [
                    createVNode("div", { class: "header-icon" }, [
                      createVNode("i", { class: "bi bi-file-pdf" })
                    ]),
                    createVNode("div", { class: "header-text" }, [
                      createVNode("h1", { class: "header-title" }, "Manajemen Sertifikat Internship"),
                      createVNode("p", { class: "header-subtitle" }, "Unggah, edit, dan kelola sertifikat Internship dari sini")
                    ])
                  ])
                ])
              ]),
              _ctx.$page.props.flash.success ? (openBlock(), createBlock("div", {
                key: 0,
                class: "alert alert-success-custom",
                role: "alert"
              }, [
                createVNode("i", { class: "bi bi-check-circle-fill" }),
                createVNode("div", { class: "alert-content" }, [
                  createVNode("strong", null, "Sukses!"),
                  createTextVNode(" " + toDisplayString(_ctx.$page.props.flash.success), 1)
                ]),
                createVNode("button", {
                  type: "button",
                  class: "alert-close",
                  onClick: ($event) => $event.target.parentElement.style.display = "none"
                }, [
                  createVNode("i", { class: "bi bi-x" })
                ], 8, ["onClick"])
              ])) : createCommentVNode("", true),
              _ctx.$page.props.flash.error ? (openBlock(), createBlock("div", {
                key: 1,
                class: "alert alert-danger-custom",
                role: "alert"
              }, [
                createVNode("i", { class: "bi bi-exclamation-circle-fill" }),
                createVNode("div", { class: "alert-content" }, [
                  createVNode("strong", null, "Error!"),
                  createTextVNode(" " + toDisplayString(_ctx.$page.props.flash.error), 1)
                ]),
                createVNode("button", {
                  type: "button",
                  class: "alert-close",
                  onClick: ($event) => $event.target.parentElement.style.display = "none"
                }, [
                  createVNode("i", { class: "bi bi-x" })
                ], 8, ["onClick"])
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "content-grid" }, [
                createVNode("div", { class: "upload-card" }, [
                  createVNode("div", { class: "card-header-custom" }, [
                    createVNode("div", { class: "header-icon-small" }, [
                      createVNode("i", { class: "bi bi-cloud-upload" })
                    ]),
                    createVNode("h5", { class: "card-title-custom" }, "Unggah Sertifikat Baru")
                  ]),
                  createVNode("div", { class: "card-body-custom" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submitForm, ["prevent"]),
                      class: "upload-form"
                    }, [
                      createVNode("div", { class: "form-group-custom" }, [
                        createVNode("label", { class: "form-label-custom" }, [
                          createVNode("i", { class: "bi bi-person-check" }),
                          createTextVNode(" Pilih Intern ")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).generated_for_user_id = $event,
                          class: ["form-select-custom", { "is-invalid": errors.generated_for_user_id }]
                        }, [
                          createVNode("option", { value: "" }, "-- Pilih Intern --"),
                          (openBlock(true), createBlock(Fragment, null, renderList(interns.value, (intern) => {
                            return openBlock(), createBlock("option", {
                              key: intern.id,
                              value: intern.id
                            }, toDisplayString(intern.name), 9, ["value"]);
                          }), 128))
                        ], 10, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).generated_for_user_id]
                        ]),
                        errors.generated_for_user_id ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "error-message"
                        }, [
                          createVNode("i", { class: "bi bi-exclamation-circle" }),
                          createTextVNode(" " + toDisplayString(errors.generated_for_user_id[0]), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "form-group-custom" }, [
                        createVNode("label", { class: "form-label-custom" }, [
                          createVNode("i", { class: "bi bi-file-pdf" }),
                          createTextVNode(" File Sertifikat (PDF) ")
                        ]),
                        createVNode("div", { class: "file-input-wrapper" }, [
                          createVNode("input", {
                            type: "file",
                            class: ["file-input-custom", { "is-invalid": errors.file }],
                            onChange: ($event) => unref(form).file = $event.target.files[0],
                            accept: ".pdf",
                            id: "certificateFile"
                          }, null, 42, ["onChange"]),
                          createVNode("label", {
                            for: "certificateFile",
                            class: "file-label-custom"
                          }, [
                            createVNode("i", { class: "bi bi-cloud-arrow-up" }),
                            !unref(form).file ? (openBlock(), createBlock("span", { key: 0 }, "Klik untuk memilih file atau drag & drop")) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "file-selected"
                            }, [
                              createVNode("i", { class: "bi bi-check-circle-fill text-success" }),
                              createTextVNode(" " + toDisplayString(unref(form).file.name), 1)
                            ]))
                          ])
                        ]),
                        createVNode("small", { class: "form-hint" }, "Maksimal 20MB, format PDF"),
                        errors.file ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "error-message"
                        }, [
                          createVNode("i", { class: "bi bi-exclamation-circle" }),
                          createTextVNode(" " + toDisplayString(errors.file[0]), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("button", {
                        type: "submit",
                        disabled: isSubmitting.value,
                        class: "btn-submit-custom"
                      }, [
                        !isSubmitting.value ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "btn-content"
                        }, [
                          createVNode("i", { class: "bi bi-cloud-upload" }),
                          createTextVNode(" Unggah Sertifikat ")
                        ])) : (openBlock(), createBlock("span", {
                          key: 1,
                          class: "btn-content"
                        }, [
                          createVNode("span", { class: "spinner-custom" }),
                          createTextVNode(" Mengunggah... ")
                        ]))
                      ], 8, ["disabled"])
                    ], 32)
                  ])
                ]),
                createVNode("div", { class: "certificates-card" }, [
                  createVNode("div", { class: "card-header-custom" }, [
                    createVNode("div", { class: "header-title-section" }, [
                      createVNode("div", { class: "header-icon-small" }, [
                        createVNode("i", { class: "bi bi-list-check" })
                      ]),
                      createVNode("div", null, [
                        createVNode("h5", { class: "card-title-custom" }, "Daftar Sertifikat"),
                        createVNode("p", { class: "card-subtitle-custom" }, "Total: " + toDisplayString(certs.value.length) + " sertifikat", 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "certificates-list-wrapper" }, [
                    certs.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "empty-state"
                    }, [
                      createVNode("div", { class: "empty-icon" }, [
                        createVNode("i", { class: "bi bi-inbox" })
                      ]),
                      createVNode("h6", { class: "empty-title" }, "Belum Ada Sertifikat"),
                      createVNode("p", { class: "empty-text" }, "Mulai dengan mengunggah sertifikat baru di formulir di samping.")
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "certificates-table"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(certs.value, (cert) => {
                        var _a, _b, _c;
                        return openBlock(), createBlock("div", {
                          key: cert.id,
                          class: "certificate-item"
                        }, [
                          createVNode("div", { class: "cert-header" }, [
                            createVNode("div", { class: "cert-info" }, [
                              createVNode("div", { class: "cert-recipient" }, [
                                createVNode("i", { class: "bi bi-person-circle" }),
                                createVNode("div", null, [
                                  createVNode("p", { class: "recipient-name" }, toDisplayString(((_a = cert.recipient) == null ? void 0 : _a.name) || "N/A"), 1),
                                  createVNode("small", { class: "recipient-email" }, toDisplayString(((_b = cert.recipient) == null ? void 0 : _b.email) || "-"), 1)
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "cert-meta" }, [
                              createVNode("div", { class: "meta-item" }, [
                                createVNode("i", { class: "bi bi-calendar-event" }),
                                createVNode("span", null, toDisplayString(formatDate(cert.issued_at)), 1)
                              ]),
                              createVNode("div", { class: "meta-item" }, [
                                createVNode("i", { class: "bi bi-person-badge" }),
                                createVNode("span", null, toDisplayString(((_c = cert.issuer) == null ? void 0 : _c.name) || "N/A"), 1)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "cert-footer" }, [
                            createVNode("div", { class: "cert-stats" }, [
                              createVNode("div", { class: "stat-badge" }, [
                                createVNode("i", { class: "bi bi-download" }),
                                createVNode("span", null, toDisplayString(cert.download_count || 0) + " unduhan", 1)
                              ]),
                              createVNode("div", { class: "status-badge published" }, [
                                createVNode("i", { class: "bi bi-check2-circle" }),
                                createVNode("span", null, "Dipublikasikan")
                              ])
                            ]),
                            createVNode("div", { class: "cert-actions" }, [
                              createVNode("button", {
                                onClick: ($event) => downloadCertificate(cert.id),
                                class: "btn-action btn-download",
                                title: "Unduh Sertifikat"
                              }, [
                                createVNode("i", { class: "bi bi-download" }),
                                createVNode("span", null, "Unduh")
                              ], 8, ["onClick"]),
                              createVNode("button", {
                                onClick: ($event) => deleteCertificate(cert.id),
                                class: "btn-action btn-delete",
                                title: "Hapus Sertifikat"
                              }, [
                                createVNode("i", { class: "bi bi-trash" }),
                                createVNode("span", null, "Hapus")
                              ], 8, ["onClick"])
                            ])
                          ])
                        ]);
                      }), 128))
                    ]))
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
const CertificatesManage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2e5800d8"]]);
export {
  CertificatesManage as default
};
