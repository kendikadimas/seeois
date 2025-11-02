import { mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext, ref, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { route } from "ziggy-js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
  __name: "InternLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "internship-layout" }, _attrs))} data-v-94cffa3a><nav class="navbar navbar-expand-lg navbar-dark bg-dark" data-v-94cffa3a><div class="container-fluid" data-v-94cffa3a>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "navbar-brand fw-bold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-mortarboard" data-v-94cffa3a${_scopeId}></i> SEEO Internship `);
          } else {
            return [
              createVNode("i", { class: "bi bi-mortarboard" }),
              createTextVNode(" SEEO Internship ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" data-v-94cffa3a><span class="navbar-toggler-icon" data-v-94cffa3a></span></button><div class="collapse navbar-collapse" id="navbarNav" data-v-94cffa3a><ul class="navbar-nav ms-auto" data-v-94cffa3a><li class="nav-item" data-v-94cffa3a>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/internship/certificates",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-file-pdf" data-v-94cffa3a${_scopeId}></i> Sertifikat `);
          } else {
            return [
              createVNode("i", { class: "bi bi-file-pdf" }),
              createTextVNode(" Sertifikat ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item" data-v-94cffa3a>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("profile.edit"),
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-person" data-v-94cffa3a${_scopeId}></i> Profil `);
          } else {
            return [
              createVNode("i", { class: "bi bi-person" }),
              createTextVNode(" Profil ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item" data-v-94cffa3a>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(route)("logout"),
        method: "post",
        as: "button",
        class: "nav-link btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="bi bi-box-arrow-right" data-v-94cffa3a${_scopeId}></i> Keluar `);
          } else {
            return [
              createVNode("i", { class: "bi bi-box-arrow-right" }),
              createTextVNode(" Keluar ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></div></nav><main class="py-4" data-v-94cffa3a>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-light text-center py-3 mt-4 border-top" data-v-94cffa3a><p class="text-muted mb-0" data-v-94cffa3a>© 2024 SEEO Platform. All rights reserved.</p></footer></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/InternLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const InternLayout = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-94cffa3a"]]);
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    certs: Array
  },
  setup(__props) {
    const isDownloading = ref(null);
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const downloadCertificate = async (certId) => {
      isDownloading.value = certId;
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
      } finally {
        isDownloading.value = null;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mt-4 mb-4" }, _attrs))} data-v-c68a7db2>`);
      _push(ssrRenderComponent(InternLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row mb-4" data-v-c68a7db2${_scopeId}><div class="col-12" data-v-c68a7db2${_scopeId}><h1 class="h3 fw-bold text-dark" data-v-c68a7db2${_scopeId}><i class="bi bi-file-pdf" data-v-c68a7db2${_scopeId}></i> Sertifikat Magang </h1><p class="text-muted" data-v-c68a7db2${_scopeId}>Lihat dan unduh sertifikat magang Anda di sini.</p></div></div>`);
            if (_ctx.$page.props.flash.success) {
              _push2(`<div class="alert alert-success alert-dismissible fade show" role="alert" data-v-c68a7db2${_scopeId}><i class="bi bi-check-circle" data-v-c68a7db2${_scopeId}></i> ${ssrInterpolate(_ctx.$page.props.flash.success)} <button type="button" class="btn-close" data-bs-dismiss="alert" data-v-c68a7db2${_scopeId}></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.$page.props.flash.error) {
              _push2(`<div class="alert alert-danger alert-dismissible fade show" role="alert" data-v-c68a7db2${_scopeId}><i class="bi bi-exclamation-circle" data-v-c68a7db2${_scopeId}></i> ${ssrInterpolate(_ctx.$page.props.flash.error)} <button type="button" class="btn-close" data-bs-dismiss="alert" data-v-c68a7db2${_scopeId}></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!__props.certs || __props.certs.length === 0) {
              _push2(`<div class="alert alert-info" role="alert" data-v-c68a7db2${_scopeId}><i class="bi bi-info-circle" data-v-c68a7db2${_scopeId}></i> Anda belum memiliki sertifikat magang yang dipublikasikan. </div>`);
            } else {
              _push2(`<div class="card border-0 shadow-sm" data-v-c68a7db2${_scopeId}><div class="table-responsive" data-v-c68a7db2${_scopeId}><table class="table table-hover mb-0" data-v-c68a7db2${_scopeId}><thead class="table-light" data-v-c68a7db2${_scopeId}><tr data-v-c68a7db2${_scopeId}><th class="fw-bold text-dark" data-v-c68a7db2${_scopeId}><i class="bi bi-calendar" data-v-c68a7db2${_scopeId}></i> Tanggal Terbit </th><th class="fw-bold text-dark" data-v-c68a7db2${_scopeId}><i class="bi bi-person" data-v-c68a7db2${_scopeId}></i> Diterbitkan Oleh </th><th class="fw-bold text-dark" data-v-c68a7db2${_scopeId}><i class="bi bi-download" data-v-c68a7db2${_scopeId}></i> Unduhan </th><th class="fw-bold text-dark text-center" data-v-c68a7db2${_scopeId}>Aksi</th></tr></thead><tbody data-v-c68a7db2${_scopeId}><!--[-->`);
              ssrRenderList(__props.certs, (cert) => {
                var _a;
                _push2(`<tr class="align-middle" data-v-c68a7db2${_scopeId}><td data-v-c68a7db2${_scopeId}><span class="text-dark fw-500" data-v-c68a7db2${_scopeId}>${ssrInterpolate(formatDate(cert.issued_at))}</span></td><td data-v-c68a7db2${_scopeId}><div class="d-flex align-items-center gap-2" data-v-c68a7db2${_scopeId}><i class="bi bi-person-badge text-primary" data-v-c68a7db2${_scopeId}></i><span class="text-dark" data-v-c68a7db2${_scopeId}>${ssrInterpolate(((_a = cert.issuer) == null ? void 0 : _a.name) || "N/A")}</span></div></td><td data-v-c68a7db2${_scopeId}><span class="badge bg-light text-dark" data-v-c68a7db2${_scopeId}><i class="bi bi-download" data-v-c68a7db2${_scopeId}></i> ${ssrInterpolate(cert.download_count || 0)} kali </span></td><td class="text-center" data-v-c68a7db2${_scopeId}><button${ssrIncludeBooleanAttr(isDownloading.value === cert.id) ? " disabled" : ""} class="btn btn-sm btn-primary" data-v-c68a7db2${_scopeId}>`);
                if (isDownloading.value !== cert.id) {
                  _push2(`<i class="bi bi-download" data-v-c68a7db2${_scopeId}></i>`);
                } else {
                  _push2(`<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" data-v-c68a7db2${_scopeId}></span>`);
                }
                _push2(` ${ssrInterpolate(isDownloading.value === cert.id ? "Mengunduh..." : "Unduh")}</button></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div>`);
            }
          } else {
            return [
              createVNode("div", { class: "row mb-4" }, [
                createVNode("div", { class: "col-12" }, [
                  createVNode("h1", { class: "h3 fw-bold text-dark" }, [
                    createVNode("i", { class: "bi bi-file-pdf" }),
                    createTextVNode(" Sertifikat Magang ")
                  ]),
                  createVNode("p", { class: "text-muted" }, "Lihat dan unduh sertifikat magang Anda di sini.")
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
              !__props.certs || __props.certs.length === 0 ? (openBlock(), createBlock("div", {
                key: 2,
                class: "alert alert-info",
                role: "alert"
              }, [
                createVNode("i", { class: "bi bi-info-circle" }),
                createTextVNode(" Anda belum memiliki sertifikat magang yang dipublikasikan. ")
              ])) : (openBlock(), createBlock("div", {
                key: 3,
                class: "card border-0 shadow-sm"
              }, [
                createVNode("div", { class: "table-responsive" }, [
                  createVNode("table", { class: "table table-hover mb-0" }, [
                    createVNode("thead", { class: "table-light" }, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "fw-bold text-dark" }, [
                          createVNode("i", { class: "bi bi-calendar" }),
                          createTextVNode(" Tanggal Terbit ")
                        ]),
                        createVNode("th", { class: "fw-bold text-dark" }, [
                          createVNode("i", { class: "bi bi-person" }),
                          createTextVNode(" Diterbitkan Oleh ")
                        ]),
                        createVNode("th", { class: "fw-bold text-dark" }, [
                          createVNode("i", { class: "bi bi-download" }),
                          createTextVNode(" Unduhan ")
                        ]),
                        createVNode("th", { class: "fw-bold text-dark text-center" }, "Aksi")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.certs, (cert) => {
                        var _a;
                        return openBlock(), createBlock("tr", {
                          key: cert.id,
                          class: "align-middle"
                        }, [
                          createVNode("td", null, [
                            createVNode("span", { class: "text-dark fw-500" }, toDisplayString(formatDate(cert.issued_at)), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("div", { class: "d-flex align-items-center gap-2" }, [
                              createVNode("i", { class: "bi bi-person-badge text-primary" }),
                              createVNode("span", { class: "text-dark" }, toDisplayString(((_a = cert.issuer) == null ? void 0 : _a.name) || "N/A"), 1)
                            ])
                          ]),
                          createVNode("td", null, [
                            createVNode("span", { class: "badge bg-light text-dark" }, [
                              createVNode("i", { class: "bi bi-download" }),
                              createTextVNode(" " + toDisplayString(cert.download_count || 0) + " kali ", 1)
                            ])
                          ]),
                          createVNode("td", { class: "text-center" }, [
                            createVNode("button", {
                              onClick: ($event) => downloadCertificate(cert.id),
                              disabled: isDownloading.value === cert.id,
                              class: "btn btn-sm btn-primary"
                            }, [
                              isDownloading.value !== cert.id ? (openBlock(), createBlock("i", {
                                key: 0,
                                class: "bi bi-download"
                              })) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "spinner-border spinner-border-sm me-2",
                                role: "status",
                                "aria-hidden": "true"
                              })),
                              createTextVNode(" " + toDisplayString(isDownloading.value === cert.id ? "Mengunduh..." : "Unduh"), 1)
                            ], 8, ["onClick", "disabled"])
                          ])
                        ]);
                      }), 128))
                    ])
                  ])
                ])
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Internship/Certificates/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c68a7db2"]]);
export {
  Index as default
};
