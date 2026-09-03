import { ref, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, withDirectives, vModelText, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderStyle } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-1sZl-0H2.js";
import { _ as _sfc_main$1 } from "./Notif-DL0SggHu.js";
import { useForm, Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
const _sfc_main = {
  __name: "SeminarRegister",
  __ssrInlineRender: true,
  props: {
    event: {
      type: Object,
      required: true
    },
    eventName: {
      type: String,
      default: "Seminar Nasional"
    },
    waLink: {
      type: String,
      default: ""
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
    const form = useForm({
      full_name: "",
      email: "",
      phone: "",
      institution: "",
      job_title: "",
      notes: ""
    });
    const showSuccessModal = ref(false);
    function submit() {
      form.post(`/seminar/nasional/register/${props.event.slug}`, {
        preserveScroll: true,
        onSuccess: () => {
          form.reset("full_name", "email", "phone", "institution", "job_title", "notes");
          showSuccessModal.value = true;
          const modalElement = document.getElementById("successModal");
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: __props.eventName }, null, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container py-5"${_scopeId}>`);
            if (__props.notif) {
              _push2(ssrRenderComponent(_sfc_main$1, { notif: __props.notif }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="row justify-content-center"${_scopeId}><div class="col-12 col-lg-8"${_scopeId}><div class="card border-0 shadow-sm"${_scopeId}><div class="card-body p-4 p-lg-5"${_scopeId}><p class="text-uppercase text-primary fw-semibold mb-2"${_scopeId}>Public Relation</p><h2 class="mb-2"${_scopeId}>${ssrInterpolate(__props.eventName)}</h2><p class="text-muted mb-4"${_scopeId}>Isi data seperti form Google Form. Data ini akan dipakai untuk rekap registrasi seminar.</p><div class="mb-3"${_scopeId}><label class="form-label"${_scopeId}>Nama Lengkap</label><input${ssrRenderAttr("value", unref(form).full_name)} type="text" class="form-control"${_scopeId}>`);
            if (unref(form).errors.full_name) {
              _push2(`<small class="text-danger"${_scopeId}>${ssrInterpolate(unref(form).errors.full_name)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="row g-3"${_scopeId}><div class="col-md-6"${_scopeId}><label class="form-label"${_scopeId}>Email</label><input${ssrRenderAttr("value", unref(form).email)} type="email" class="form-control"${_scopeId}></div><div class="col-md-6"${_scopeId}><label class="form-label"${_scopeId}>No. HP</label><input${ssrRenderAttr("value", unref(form).phone)} type="text" class="form-control"${_scopeId}></div><div class="col-md-6"${_scopeId}><label class="form-label"${_scopeId}>Institusi / Sekolah / Kampus</label><input${ssrRenderAttr("value", unref(form).institution)} type="text" class="form-control"${_scopeId}></div><div class="col-md-6"${_scopeId}><label class="form-label"${_scopeId}>Jabatan / Pekerjaan</label><input${ssrRenderAttr("value", unref(form).job_title)} type="text" class="form-control"${_scopeId}></div></div><div class="mt-3"${_scopeId}><label class="form-label"${_scopeId}>Catatan</label><textarea class="form-control" rows="4" placeholder="Tulis pertanyaan, kebutuhan khusus, atau informasi tambahan"${_scopeId}>${ssrInterpolate(unref(form).notes)}</textarea></div><button class="btn btn-primary mt-4"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(form).processing ? "Mengirim..." : "Kirim Pendaftaran")}</button></div></div></div></div></div><div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true"${_scopeId}><div class="modal-dialog modal-dialog-centered"${_scopeId}><div class="modal-content border-0 shadow-lg text-center p-4"${_scopeId}><div class="modal-body"${_scopeId}><div class="mb-4"${_scopeId}><div class="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center" style="${ssrRenderStyle({ "width": "80px", "height": "80px" })}"${_scopeId}><i class="bi bi-check-lg fs-1"${_scopeId}></i></div></div><h3 class="fw-bold mb-2"${_scopeId}>Pendaftaran Berhasil!</h3><p class="text-muted mb-4"${_scopeId}>Terima kasih telah mendaftar di ${ssrInterpolate(__props.eventName)}. Data Anda telah kami terima.</p>`);
            if (__props.waLink) {
              _push2(`<div class="bg-light p-4 rounded-3 mb-4"${_scopeId}><p class="small fw-bold text-uppercase tracking-wider text-muted mb-3"${_scopeId}>Langkah Selanjutnya</p><p class="mb-4"${_scopeId}>Silakan bergabung ke grup WhatsApp resmi peserta untuk mendapatkan informasi lebih lanjut.</p><a${ssrRenderAttr("href", __props.waLink)} target="_blank" class="btn btn-success w-100 py-3 fw-bold"${_scopeId}><i class="bi bi-whatsapp me-2"${_scopeId}></i> Gabung Grup WhatsApp </a></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button type="button" class="btn btn-outline-secondary w-100" data-bs-dismiss="modal"${_scopeId}>Tutup</button></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container py-5" }, [
                __props.notif ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 0,
                  notif: __props.notif
                }, null, 8, ["notif"])) : createCommentVNode("", true),
                createVNode("div", { class: "row justify-content-center" }, [
                  createVNode("div", { class: "col-12 col-lg-8" }, [
                    createVNode("div", { class: "card border-0 shadow-sm" }, [
                      createVNode("div", { class: "card-body p-4 p-lg-5" }, [
                        createVNode("p", { class: "text-uppercase text-primary fw-semibold mb-2" }, "Public Relation"),
                        createVNode("h2", { class: "mb-2" }, toDisplayString(__props.eventName), 1),
                        createVNode("p", { class: "text-muted mb-4" }, "Isi data seperti form Google Form. Data ini akan dipakai untuk rekap registrasi seminar."),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label" }, "Nama Lengkap"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).full_name = $event,
                            type: "text",
                            class: "form-control"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).full_name]
                          ]),
                          unref(form).errors.full_name ? (openBlock(), createBlock("small", {
                            key: 0,
                            class: "text-danger"
                          }, toDisplayString(unref(form).errors.full_name), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "row g-3" }, [
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("label", { class: "form-label" }, "Email"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).email = $event,
                              type: "email",
                              class: "form-control"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).email]
                            ])
                          ]),
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("label", { class: "form-label" }, "No. HP"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                              type: "text",
                              class: "form-control"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).phone]
                            ])
                          ]),
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("label", { class: "form-label" }, "Institusi / Sekolah / Kampus"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).institution = $event,
                              type: "text",
                              class: "form-control"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).institution]
                            ])
                          ]),
                          createVNode("div", { class: "col-md-6" }, [
                            createVNode("label", { class: "form-label" }, "Jabatan / Pekerjaan"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).job_title = $event,
                              type: "text",
                              class: "form-control"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).job_title]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "mt-3" }, [
                          createVNode("label", { class: "form-label" }, "Catatan"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                            class: "form-control",
                            rows: "4",
                            placeholder: "Tulis pertanyaan, kebutuhan khusus, atau informasi tambahan"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).notes]
                          ])
                        ]),
                        createVNode("button", {
                          class: "btn btn-primary mt-4",
                          disabled: unref(form).processing,
                          onClick: submit
                        }, toDisplayString(unref(form).processing ? "Mengirim..." : "Kirim Pendaftaran"), 9, ["disabled"])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal fade",
                id: "successModal",
                tabindex: "-1",
                "aria-labelledby": "successModalLabel",
                "aria-hidden": "true"
              }, [
                createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                  createVNode("div", { class: "modal-content border-0 shadow-lg text-center p-4" }, [
                    createVNode("div", { class: "modal-body" }, [
                      createVNode("div", { class: "mb-4" }, [
                        createVNode("div", {
                          class: "bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center",
                          style: { "width": "80px", "height": "80px" }
                        }, [
                          createVNode("i", { class: "bi bi-check-lg fs-1" })
                        ])
                      ]),
                      createVNode("h3", { class: "fw-bold mb-2" }, "Pendaftaran Berhasil!"),
                      createVNode("p", { class: "text-muted mb-4" }, "Terima kasih telah mendaftar di " + toDisplayString(__props.eventName) + ". Data Anda telah kami terima.", 1),
                      __props.waLink ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "bg-light p-4 rounded-3 mb-4"
                      }, [
                        createVNode("p", { class: "small fw-bold text-uppercase tracking-wider text-muted mb-3" }, "Langkah Selanjutnya"),
                        createVNode("p", { class: "mb-4" }, "Silakan bergabung ke grup WhatsApp resmi peserta untuk mendapatkan informasi lebih lanjut."),
                        createVNode("a", {
                          href: __props.waLink,
                          target: "_blank",
                          class: "btn btn-success w-100 py-3 fw-bold"
                        }, [
                          createVNode("i", { class: "bi bi-whatsapp me-2" }),
                          createTextVNode(" Gabung Grup WhatsApp ")
                        ], 8, ["href"])
                      ])) : createCommentVNode("", true),
                      createVNode("button", {
                        type: "button",
                        class: "btn btn-outline-secondary w-100",
                        "data-bs-dismiss": "modal"
                      }, "Tutup")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/SeminarRegister.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=SeminarRegister-ctCdpkIq.js.map
