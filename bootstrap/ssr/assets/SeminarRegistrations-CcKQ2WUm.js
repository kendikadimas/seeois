import { ref, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-BSa5kc_g.js";
import { _ as _sfc_main$1 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$2 } from "./ModalConfirmation-CaKJYApU.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
const _sfc_main = {
  __name: "SeminarRegistrations",
  __ssrInlineRender: true,
  props: {
    events: {
      type: Array,
      default: () => []
    },
    notif: {
      type: Object,
      default: null
    }
  },
  setup(__props) {
    const modalConfirmationRef = ref(null);
    const modalAddEventRef = ref(null);
    const formAdd = useForm({
      name: "",
      wa_link: ""
    });
    function submitAdd() {
      formAdd.post("/seeo/staff/seminar/registrations/events", {
        onSuccess: () => {
          formAdd.reset();
          const modal = bootstrap.Modal.getInstance(modalAddEventRef.value);
          modal.hide();
        }
      });
    }
    function confirmation(routeUrl, message) {
      modalConfirmationRef.value.showModal(routeUrl, message);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Manajemen Seminar" }, null, _parent));
      _push(ssrRenderComponent(StaffLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Manajemen Seminar &amp; Pendaftaran `);
          } else {
            return [
              createTextVNode(" Manajemen Seminar & Pendaftaran ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container-fluid py-4" data-v-ca55bbb9${_scopeId}>`);
            if (__props.notif) {
              _push2(ssrRenderComponent(_sfc_main$1, { notif: __props.notif }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4" data-v-ca55bbb9${_scopeId}><div data-v-ca55bbb9${_scopeId}><h4 class="mb-1" data-v-ca55bbb9${_scopeId}>Daftar Event Seminar</h4><p class="text-muted small mb-0" data-v-ca55bbb9${_scopeId}>Kelola berbagai event seminar dan pantau pendaftar di setiap event.</p></div><div data-v-ca55bbb9${_scopeId}><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalAddEvent" data-v-ca55bbb9${_scopeId}><i class="bi bi-plus-lg me-1" data-v-ca55bbb9${_scopeId}></i> Tambah Event Baru </button></div></div><div class="row g-4" data-v-ca55bbb9${_scopeId}><!--[-->`);
            ssrRenderList(__props.events, (event) => {
              _push2(`<div class="col-12 col-md-6 col-xl-4" data-v-ca55bbb9${_scopeId}><div class="card border-0 shadow-sm h-100" data-v-ca55bbb9${_scopeId}><div class="card-body" data-v-ca55bbb9${_scopeId}><div class="d-flex justify-content-between align-items-start mb-3" data-v-ca55bbb9${_scopeId}><span class="${ssrRenderClass(`badge ${event.is_active ? "bg-success" : "bg-secondary"}`)}" data-v-ca55bbb9${_scopeId}>${ssrInterpolate(event.is_active ? "Aktif" : "Nonaktif")}</span><div class="dropdown" data-v-ca55bbb9${_scopeId}><button class="btn btn-sm btn-light" type="button" data-bs-toggle="dropdown" data-v-ca55bbb9${_scopeId}><i class="bi bi-three-dots-vertical" data-v-ca55bbb9${_scopeId}></i></button><ul class="dropdown-menu dropdown-menu-end shadow border-0" data-v-ca55bbb9${_scopeId}><li data-v-ca55bbb9${_scopeId}><button class="dropdown-item" data-v-ca55bbb9${_scopeId}><i class="${ssrRenderClass(`bi ${event.is_active ? "bi-pause-circle" : "bi-play-circle"} me-2`)}" data-v-ca55bbb9${_scopeId}></i> ${ssrInterpolate(event.is_active ? "Nonaktifkan" : "Aktifkan")}</button></li><li data-v-ca55bbb9${_scopeId}><hr class="dropdown-divider" data-v-ca55bbb9${_scopeId}></li><li data-v-ca55bbb9${_scopeId}><button class="dropdown-item text-danger" data-v-ca55bbb9${_scopeId}><i class="bi bi-trash me-2" data-v-ca55bbb9${_scopeId}></i> Hapus Event </button></li></ul></div></div><h5 class="fw-bold mb-1" data-v-ca55bbb9${_scopeId}>${ssrInterpolate(event.name)}</h5><p class="text-muted small mb-3" data-v-ca55bbb9${_scopeId}>Slug: ${ssrInterpolate(event.slug)}</p><div class="d-flex align-items-center gap-3 mb-4" data-v-ca55bbb9${_scopeId}><div class="p-3 bg-light rounded-3 text-center flex-grow-1" data-v-ca55bbb9${_scopeId}><h4 class="fw-bold mb-0" data-v-ca55bbb9${_scopeId}>${ssrInterpolate(event.registrations_count)}</h4><span class="text-muted extra-small uppercase fw-bold" data-v-ca55bbb9${_scopeId}>Pendaftar</span></div><div class="flex-grow-1 text-center" data-v-ca55bbb9${_scopeId}>`);
              if (event.is_active) {
                _push2(`<a${ssrRenderAttr("href", `/seminar/nasional/register/${event.slug}`)} target="_blank" class="text-decoration-none small text-primary fw-bold" data-v-ca55bbb9${_scopeId}><i class="bi bi-link-45deg" data-v-ca55bbb9${_scopeId}></i> Lihat Form </a>`);
              } else {
                _push2(`<span class="text-muted small italic" data-v-ca55bbb9${_scopeId}>Form Tutup</span>`);
              }
              _push2(`</div></div><div class="d-grid" data-v-ca55bbb9${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/seeo/staff/seminar/registrations/event/${event.id}`,
                class: "btn btn-outline-primary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Lihat Data &amp; Kelola <i class="bi bi-arrow-right ms-1" data-v-ca55bbb9${_scopeId2}></i>`);
                  } else {
                    return [
                      createTextVNode(" Lihat Data & Kelola "),
                      createVNode("i", { class: "bi bi-arrow-right ms-1" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></div></div>`);
            });
            _push2(`<!--]-->`);
            if (__props.events.length === 0) {
              _push2(`<div class="col-12" data-v-ca55bbb9${_scopeId}><div class="card border-0 shadow-sm py-5 text-center" data-v-ca55bbb9${_scopeId}><div class="card-body text-muted" data-v-ca55bbb9${_scopeId}><i class="bi bi-calendar-x fs-1 d-block mb-3" data-v-ca55bbb9${_scopeId}></i><h5 data-v-ca55bbb9${_scopeId}>Belum ada event seminar</h5><p data-v-ca55bbb9${_scopeId}>Klik tombol &quot;Tambah Event Baru&quot; untuk memulai.</p></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="modal fade" id="modalAddEvent" tabindex="-1" data-v-ca55bbb9${_scopeId}><div class="modal-dialog modal-dialog-centered" data-v-ca55bbb9${_scopeId}><div class="modal-content border-0 shadow" data-v-ca55bbb9${_scopeId}><div class="modal-header border-0" data-v-ca55bbb9${_scopeId}><h5 class="modal-title fw-bold" data-v-ca55bbb9${_scopeId}>Tambah Event Seminar Baru</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-ca55bbb9${_scopeId}></button></div><div class="modal-body" data-v-ca55bbb9${_scopeId}><div class="mb-3" data-v-ca55bbb9${_scopeId}><label class="form-label fw-medium" data-v-ca55bbb9${_scopeId}>Nama Event</label><input${ssrRenderAttr("value", unref(formAdd).name)} type="text" class="form-control" placeholder="Contoh: Seminar Nasional SEEO 2025" required data-v-ca55bbb9${_scopeId}></div><div class="mb-3" data-v-ca55bbb9${_scopeId}><label class="form-label fw-medium" data-v-ca55bbb9${_scopeId}>Link Grup WhatsApp (Opsional)</label><input${ssrRenderAttr("value", unref(formAdd).wa_link)} type="text" class="form-control" placeholder="https://chat.whatsapp.com/..." data-v-ca55bbb9${_scopeId}><div class="form-text" data-v-ca55bbb9${_scopeId}>Peserta akan diarahkan ke link ini setelah mendaftar.</div></div></div><div class="modal-footer border-0" data-v-ca55bbb9${_scopeId}><button type="button" class="btn btn-light" data-bs-dismiss="modal" data-v-ca55bbb9${_scopeId}>Batal</button><button type="button" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(formAdd).processing) ? " disabled" : ""} data-v-ca55bbb9${_scopeId}>${ssrInterpolate(unref(formAdd).processing ? "Menyimpan..." : "Buat Event")}</button></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-fluid py-4" }, [
                __props.notif ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 0,
                  notif: __props.notif
                }, null, 8, ["notif"])) : createCommentVNode("", true),
                createVNode(_sfc_main$2, {
                  ref_key: "modalConfirmationRef",
                  ref: modalConfirmationRef
                }, null, 512),
                createVNode("div", { class: "d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4" }, [
                  createVNode("div", null, [
                    createVNode("h4", { class: "mb-1" }, "Daftar Event Seminar"),
                    createVNode("p", { class: "text-muted small mb-0" }, "Kelola berbagai event seminar dan pantau pendaftar di setiap event.")
                  ]),
                  createVNode("div", null, [
                    createVNode("button", {
                      class: "btn btn-primary",
                      "data-bs-toggle": "modal",
                      "data-bs-target": "#modalAddEvent"
                    }, [
                      createVNode("i", { class: "bi bi-plus-lg me-1" }),
                      createTextVNode(" Tambah Event Baru ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "row g-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.events, (event) => {
                    return openBlock(), createBlock("div", {
                      key: event.id,
                      class: "col-12 col-md-6 col-xl-4"
                    }, [
                      createVNode("div", { class: "card border-0 shadow-sm h-100" }, [
                        createVNode("div", { class: "card-body" }, [
                          createVNode("div", { class: "d-flex justify-content-between align-items-start mb-3" }, [
                            createVNode("span", {
                              class: `badge ${event.is_active ? "bg-success" : "bg-secondary"}`
                            }, toDisplayString(event.is_active ? "Aktif" : "Nonaktif"), 3),
                            createVNode("div", { class: "dropdown" }, [
                              createVNode("button", {
                                class: "btn btn-sm btn-light",
                                type: "button",
                                "data-bs-toggle": "dropdown"
                              }, [
                                createVNode("i", { class: "bi bi-three-dots-vertical" })
                              ]),
                              createVNode("ul", { class: "dropdown-menu dropdown-menu-end shadow border-0" }, [
                                createVNode("li", null, [
                                  createVNode("button", {
                                    class: "dropdown-item",
                                    onClick: ($event) => confirmation(`/seeo/staff/seminar/registrations/events/${event.id}/toggle`, event.is_active ? "Nonaktifkan pendaftaran ini?" : "Aktifkan kembali pendaftaran ini?")
                                  }, [
                                    createVNode("i", {
                                      class: `bi ${event.is_active ? "bi-pause-circle" : "bi-play-circle"} me-2`
                                    }, null, 2),
                                    createTextVNode(" " + toDisplayString(event.is_active ? "Nonaktifkan" : "Aktifkan"), 1)
                                  ], 8, ["onClick"])
                                ]),
                                createVNode("li", null, [
                                  createVNode("hr", { class: "dropdown-divider" })
                                ]),
                                createVNode("li", null, [
                                  createVNode("button", {
                                    class: "dropdown-item text-danger",
                                    onClick: ($event) => confirmation(`/seeo/staff/seminar/registrations/events/${event.id}`, "Hapus event ini beserta SELURUH data pendaftarannya?")
                                  }, [
                                    createVNode("i", { class: "bi bi-trash me-2" }),
                                    createTextVNode(" Hapus Event ")
                                  ], 8, ["onClick"])
                                ])
                              ])
                            ])
                          ]),
                          createVNode("h5", { class: "fw-bold mb-1" }, toDisplayString(event.name), 1),
                          createVNode("p", { class: "text-muted small mb-3" }, "Slug: " + toDisplayString(event.slug), 1),
                          createVNode("div", { class: "d-flex align-items-center gap-3 mb-4" }, [
                            createVNode("div", { class: "p-3 bg-light rounded-3 text-center flex-grow-1" }, [
                              createVNode("h4", { class: "fw-bold mb-0" }, toDisplayString(event.registrations_count), 1),
                              createVNode("span", { class: "text-muted extra-small uppercase fw-bold" }, "Pendaftar")
                            ]),
                            createVNode("div", { class: "flex-grow-1 text-center" }, [
                              event.is_active ? (openBlock(), createBlock("a", {
                                key: 0,
                                href: `/seminar/nasional/register/${event.slug}`,
                                target: "_blank",
                                class: "text-decoration-none small text-primary fw-bold"
                              }, [
                                createVNode("i", { class: "bi bi-link-45deg" }),
                                createTextVNode(" Lihat Form ")
                              ], 8, ["href"])) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-muted small italic"
                              }, "Form Tutup"))
                            ])
                          ]),
                          createVNode("div", { class: "d-grid" }, [
                            createVNode(unref(Link), {
                              href: `/seeo/staff/seminar/registrations/event/${event.id}`,
                              class: "btn btn-outline-primary"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Lihat Data & Kelola "),
                                createVNode("i", { class: "bi bi-arrow-right ms-1" })
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ])
                        ])
                      ])
                    ]);
                  }), 128)),
                  __props.events.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "col-12"
                  }, [
                    createVNode("div", { class: "card border-0 shadow-sm py-5 text-center" }, [
                      createVNode("div", { class: "card-body text-muted" }, [
                        createVNode("i", { class: "bi bi-calendar-x fs-1 d-block mb-3" }),
                        createVNode("h5", null, "Belum ada event seminar"),
                        createVNode("p", null, 'Klik tombol "Tambah Event Baru" untuk memulai.')
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode("div", {
                class: "modal fade",
                id: "modalAddEvent",
                tabindex: "-1",
                ref_key: "modalAddEventRef",
                ref: modalAddEventRef
              }, [
                createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                  createVNode("div", { class: "modal-content border-0 shadow" }, [
                    createVNode("div", { class: "modal-header border-0" }, [
                      createVNode("h5", { class: "modal-title fw-bold" }, "Tambah Event Seminar Baru"),
                      createVNode("button", {
                        type: "button",
                        class: "btn-close",
                        "data-bs-dismiss": "modal",
                        "aria-label": "Close"
                      })
                    ]),
                    createVNode("div", { class: "modal-body" }, [
                      createVNode("div", { class: "mb-3" }, [
                        createVNode("label", { class: "form-label fw-medium" }, "Nama Event"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(formAdd).name = $event,
                          type: "text",
                          class: "form-control",
                          placeholder: "Contoh: Seminar Nasional SEEO 2025",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(formAdd).name]
                        ])
                      ]),
                      createVNode("div", { class: "mb-3" }, [
                        createVNode("label", { class: "form-label fw-medium" }, "Link Grup WhatsApp (Opsional)"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(formAdd).wa_link = $event,
                          type: "text",
                          class: "form-control",
                          placeholder: "https://chat.whatsapp.com/..."
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(formAdd).wa_link]
                        ]),
                        createVNode("div", { class: "form-text" }, "Peserta akan diarahkan ke link ini setelah mendaftar.")
                      ])
                    ]),
                    createVNode("div", { class: "modal-footer border-0" }, [
                      createVNode("button", {
                        type: "button",
                        class: "btn btn-light",
                        "data-bs-dismiss": "modal"
                      }, "Batal"),
                      createVNode("button", {
                        type: "button",
                        class: "btn btn-primary",
                        disabled: unref(formAdd).processing,
                        onClick: submitAdd
                      }, toDisplayString(unref(formAdd).processing ? "Menyimpan..." : "Buat Event"), 9, ["disabled"])
                    ])
                  ])
                ])
              ], 512)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/SeminarRegistrations.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SeminarRegistrations = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ca55bbb9"]]);
export {
  SeminarRegistrations as default
};
//# sourceMappingURL=SeminarRegistrations-CcKQ2WUm.js.map
