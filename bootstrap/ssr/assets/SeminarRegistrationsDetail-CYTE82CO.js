import { ref, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-CmduQjnL.js";
import { _ as _sfc_main$1 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$2 } from "./ModalConfirmation-CaKJYApU.js";
import { Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
const _sfc_main = {
  __name: "SeminarRegistrationsDetail",
  __ssrInlineRender: true,
  props: {
    event: {
      type: Object,
      required: true
    },
    registrations: {
      type: Array,
      default: () => []
    },
    notif: {
      type: Object,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const modalConfirmationRef = ref(null);
    function confirmation(routeUrl, message) {
      modalConfirmationRef.value.showModal(routeUrl, message);
    }
    function exportData() {
      window.location.href = `/seeo/staff/seminar/registrations/event/${props.event.id}/export`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `Registrasi: ${__props.event.name}`
      }, null, _parent));
      _push(ssrRenderComponent(StaffLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="d-flex align-items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/seeo/staff/seminar/registrations",
              class: "btn btn-sm btn-light me-3"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="bi bi-arrow-left"${_scopeId2}></i>`);
                } else {
                  return [
                    createVNode("i", { class: "bi bi-arrow-left" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` Data Pendaftar: ${ssrInterpolate(__props.event.name)}</div>`);
          } else {
            return [
              createVNode("div", { class: "d-flex align-items-center" }, [
                createVNode(unref(Link), {
                  href: "/seeo/staff/seminar/registrations",
                  class: "btn btn-sm btn-light me-3"
                }, {
                  default: withCtx(() => [
                    createVNode("i", { class: "bi bi-arrow-left" })
                  ]),
                  _: 1
                }),
                createTextVNode(" Data Pendaftar: " + toDisplayString(__props.event.name), 1)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container-fluid py-4"${_scopeId}>`);
            if (__props.notif) {
              _push2(ssrRenderComponent(_sfc_main$1, { notif: __props.notif }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"${_scopeId}><div${_scopeId}><h4 class="mb-1"${_scopeId}>Total: ${ssrInterpolate(__props.registrations.length)} Pendaftar</h4><p class="text-muted small mb-0"${_scopeId}>Manajemen pendaftaran individu dan ekspor data untuk event ini.</p></div><div class="d-flex flex-wrap gap-2"${_scopeId}><a${ssrRenderAttr("href", `/seminar/nasional/register/${__props.event.slug}`)} target="_blank" class="btn btn-outline-primary"${_scopeId}><i class="bi bi-box-arrow-up-right me-1"${_scopeId}></i> Lihat Form Publik </a><button class="btn btn-success"${_scopeId}><i class="bi bi-file-earmark-excel me-1"${_scopeId}></i> Export CSV </button><button class="btn btn-outline-danger"${_scopeId}><i class="bi bi-trash me-1"${_scopeId}></i> Kosongkan Data </button></div></div><div class="card border-0 shadow-sm"${_scopeId}><div class="card-body table-responsive"${_scopeId}><table class="table align-middle table-hover"${_scopeId}><thead class="table-light"${_scopeId}><tr${_scopeId}><th${_scopeId}>Nama</th><th${_scopeId}>Email</th><th${_scopeId}>HP</th><th${_scopeId}>Institusi</th><th${_scopeId}>Jabatan</th><th${_scopeId}>Catatan</th><th${_scopeId}>Waktu Daftar</th><th${_scopeId}>Aksi</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.registrations, (registration) => {
              _push2(`<tr${_scopeId}><td class="fw-medium"${_scopeId}>${ssrInterpolate(registration.full_name)}</td><td${_scopeId}>${ssrInterpolate(registration.email ?? "-")}</td><td${_scopeId}>${ssrInterpolate(registration.phone ?? "-")}</td><td${_scopeId}>${ssrInterpolate(registration.institution ?? "-")}</td><td${_scopeId}>${ssrInterpolate(registration.job_title ?? "-")}</td><td class="text-muted small"${_scopeId}>${ssrInterpolate(registration.notes ?? "-")}</td><td class="small"${_scopeId}>${ssrInterpolate(new Date(registration.created_at).toLocaleString("id-ID"))}</td><td${_scopeId}><button class="btn btn-sm btn-light text-danger"${_scopeId}><i class="bi bi-trash"${_scopeId}></i></button></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.registrations.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="8" class="text-center py-5 text-muted"${_scopeId}><i class="bi bi-inbox fs-2 d-block mb-2"${_scopeId}></i> Belum ada pendaftaran untuk event ini. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div>`);
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
                    createVNode("h4", { class: "mb-1" }, "Total: " + toDisplayString(__props.registrations.length) + " Pendaftar", 1),
                    createVNode("p", { class: "text-muted small mb-0" }, "Manajemen pendaftaran individu dan ekspor data untuk event ini.")
                  ]),
                  createVNode("div", { class: "d-flex flex-wrap gap-2" }, [
                    createVNode("a", {
                      href: `/seminar/nasional/register/${__props.event.slug}`,
                      target: "_blank",
                      class: "btn btn-outline-primary"
                    }, [
                      createVNode("i", { class: "bi bi-box-arrow-up-right me-1" }),
                      createTextVNode(" Lihat Form Publik ")
                    ], 8, ["href"]),
                    createVNode("button", {
                      class: "btn btn-success",
                      onClick: exportData
                    }, [
                      createVNode("i", { class: "bi bi-file-earmark-excel me-1" }),
                      createTextVNode(" Export CSV ")
                    ]),
                    createVNode("button", {
                      class: "btn btn-outline-danger",
                      onClick: ($event) => confirmation(`/seeo/staff/seminar/registrations/event/${__props.event.id}/clear`, "Apakah Anda yakin ingin menghapus SELURUH data pendaftaran untuk event ini?")
                    }, [
                      createVNode("i", { class: "bi bi-trash me-1" }),
                      createTextVNode(" Kosongkan Data ")
                    ], 8, ["onClick"])
                  ])
                ]),
                createVNode("div", { class: "card border-0 shadow-sm" }, [
                  createVNode("div", { class: "card-body table-responsive" }, [
                    createVNode("table", { class: "table align-middle table-hover" }, [
                      createVNode("thead", { class: "table-light" }, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Nama"),
                          createVNode("th", null, "Email"),
                          createVNode("th", null, "HP"),
                          createVNode("th", null, "Institusi"),
                          createVNode("th", null, "Jabatan"),
                          createVNode("th", null, "Catatan"),
                          createVNode("th", null, "Waktu Daftar"),
                          createVNode("th", null, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.registrations, (registration) => {
                          return openBlock(), createBlock("tr", {
                            key: registration.id
                          }, [
                            createVNode("td", { class: "fw-medium" }, toDisplayString(registration.full_name), 1),
                            createVNode("td", null, toDisplayString(registration.email ?? "-"), 1),
                            createVNode("td", null, toDisplayString(registration.phone ?? "-"), 1),
                            createVNode("td", null, toDisplayString(registration.institution ?? "-"), 1),
                            createVNode("td", null, toDisplayString(registration.job_title ?? "-"), 1),
                            createVNode("td", { class: "text-muted small" }, toDisplayString(registration.notes ?? "-"), 1),
                            createVNode("td", { class: "small" }, toDisplayString(new Date(registration.created_at).toLocaleString("id-ID")), 1),
                            createVNode("td", null, [
                              createVNode("button", {
                                class: "btn btn-sm btn-light text-danger",
                                onClick: ($event) => confirmation(`/seeo/staff/seminar/registrations/registration/${registration.id}`, "Hapus data pendaftaran ini?")
                              }, [
                                createVNode("i", { class: "bi bi-trash" })
                              ], 8, ["onClick"])
                            ])
                          ]);
                        }), 128)),
                        __props.registrations.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "8",
                            class: "text-center py-5 text-muted"
                          }, [
                            createVNode("i", { class: "bi bi-inbox fs-2 d-block mb-2" }),
                            createTextVNode(" Belum ada pendaftaran untuk event ini. ")
                          ])
                        ])) : createCommentVNode("", true)
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
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/SeminarRegistrationsDetail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=SeminarRegistrationsDetail-CYTE82CO.js.map
