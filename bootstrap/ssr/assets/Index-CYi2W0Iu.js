import { mergeProps, withCtx, createBlock, createCommentVNode, openBlock, createVNode, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-tN1R9s2b.js";
import { route } from "ziggy-js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ModalConfirmation-CQDhtLdH.js";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    certs: Array
  },
  setup(__props) {
    const downloadCertificate = (certId) => {
      window.location.href = route("certificate.download", certId);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "certificates-container" }, _attrs))} data-v-ad189982>`);
      _push(ssrRenderComponent(StaffLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.$page.props.flash.success) {
              _push2(`<div class="alert alert-success-custom" role="alert" data-v-ad189982${_scopeId}><i class="bi bi-check-circle-fill" data-v-ad189982${_scopeId}></i><div class="alert-content" data-v-ad189982${_scopeId}><strong data-v-ad189982${_scopeId}>Sukses!</strong> ${ssrInterpolate(_ctx.$page.props.flash.success)}</div><button type="button" class="alert-close" data-v-ad189982${_scopeId}><i class="bi bi-x" data-v-ad189982${_scopeId}></i></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.$page.props.flash.error) {
              _push2(`<div class="alert alert-danger-custom" role="alert" data-v-ad189982${_scopeId}><i class="bi bi-exclamation-circle-fill" data-v-ad189982${_scopeId}></i><div class="alert-content" data-v-ad189982${_scopeId}><strong data-v-ad189982${_scopeId}>Error!</strong> ${ssrInterpolate(_ctx.$page.props.flash.error)}</div><button type="button" class="alert-close" data-v-ad189982${_scopeId}><i class="bi bi-x" data-v-ad189982${_scopeId}></i></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!__props.certs || __props.certs.length === 0) {
              _push2(`<div class="empty-state-container" data-v-ad189982${_scopeId}><div class="empty-state" data-v-ad189982${_scopeId}><div class="empty-icon" data-v-ad189982${_scopeId}><i class="bi bi-inbox" data-v-ad189982${_scopeId}></i></div><h3 class="empty-title" data-v-ad189982${_scopeId}>Belum Ada Sertifikat</h3><p class="empty-text" data-v-ad189982${_scopeId}> Anda belum memiliki sertifikat Internship yang dipublikasikan. <br data-v-ad189982${_scopeId}> Hubungi HR Manager untuk mendapatkan sertifikat Anda. </p></div></div>`);
            } else {
              _push2(`<div class="certificates-content" data-v-ad189982${_scopeId}><div class="congrats-section" data-v-ad189982${_scopeId}><div class="congrats-content" data-v-ad189982${_scopeId}><h2 class="congrats-title" data-v-ad189982${_scopeId}>Selamat! 🎉</h2><p class="congrats-message" data-v-ad189982${_scopeId}> Anda telah berhasil menyelesaikan program Internship di <strong data-v-ad189982${_scopeId}>SEEO</strong>. Terima kasih atas dedikasi dan kontribusi Anda selama masa Internship. Pengalaman dan pembelajaran yang Anda dapatkan di sini semoga menjadi bekal berharga untuk perjalanan karir Anda ke depan. </p></div><!--[-->`);
              ssrRenderList(__props.certs, (cert) => {
                _push2(`<div class="cert-download-wrapper" data-v-ad189982${_scopeId}><button class="btn-download-certificate" title="Unduh Sertifikat PDF" data-v-ad189982${_scopeId}><i class="bi bi-download" data-v-ad189982${_scopeId}></i><span data-v-ad189982${_scopeId}>Unduh Sertifikat Internship</span></button></div>`);
              });
              _push2(`<!--]--></div><div class="invitation-section" data-v-ad189982${_scopeId}><div class="invitation-card" data-v-ad189982${_scopeId}><div class="invitation-icon" data-v-ad189982${_scopeId}><i class="bi bi-people-fill" data-v-ad189982${_scopeId}></i></div><h3 class="invitation-title" data-v-ad189982${_scopeId}>Bergabung dengan Tim SEEO</h3><p class="invitation-text" data-v-ad189982${_scopeId}> Kami mengundang Anda untuk menjadi bagian dari kepengurusan SEEO periode selanjutnya. Mari bersama-sama membangun ekosistem entrepreneurship yang lebih kuat dan berdampak positif bagi mahasiswa Fakultas Teknik UNSOED. </p><div class="invitation-features" data-v-ad189982${_scopeId}><div class="feature-item" data-v-ad189982${_scopeId}><i class="bi bi-check-circle-fill" data-v-ad189982${_scopeId}></i><span data-v-ad189982${_scopeId}>Kembangkan skill leadership &amp; teamwork</span></div><div class="feature-item" data-v-ad189982${_scopeId}><i class="bi bi-check-circle-fill" data-v-ad189982${_scopeId}></i><span data-v-ad189982${_scopeId}>Perluas networking &amp; relasi</span></div><div class="feature-item" data-v-ad189982${_scopeId}><i class="bi bi-check-circle-fill" data-v-ad189982${_scopeId}></i><span data-v-ad189982${_scopeId}>Berkontribusi dalam program-program inovatif</span></div></div></div></div></div>`);
            }
          } else {
            return [
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
              !__props.certs || __props.certs.length === 0 ? (openBlock(), createBlock("div", {
                key: 2,
                class: "empty-state-container"
              }, [
                createVNode("div", { class: "empty-state" }, [
                  createVNode("div", { class: "empty-icon" }, [
                    createVNode("i", { class: "bi bi-inbox" })
                  ]),
                  createVNode("h3", { class: "empty-title" }, "Belum Ada Sertifikat"),
                  createVNode("p", { class: "empty-text" }, [
                    createTextVNode(" Anda belum memiliki sertifikat Internship yang dipublikasikan. "),
                    createVNode("br"),
                    createTextVNode(" Hubungi HR Manager untuk mendapatkan sertifikat Anda. ")
                  ])
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 3,
                class: "certificates-content"
              }, [
                createVNode("div", { class: "congrats-section" }, [
                  createVNode("div", { class: "congrats-content" }, [
                    createVNode("h2", { class: "congrats-title" }, "Selamat! 🎉"),
                    createVNode("p", { class: "congrats-message" }, [
                      createTextVNode(" Anda telah berhasil menyelesaikan program Internship di "),
                      createVNode("strong", null, "SEEO"),
                      createTextVNode(". Terima kasih atas dedikasi dan kontribusi Anda selama masa Internship. Pengalaman dan pembelajaran yang Anda dapatkan di sini semoga menjadi bekal berharga untuk perjalanan karir Anda ke depan. ")
                    ])
                  ]),
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.certs, (cert) => {
                    return openBlock(), createBlock("div", {
                      key: cert.id,
                      class: "cert-download-wrapper"
                    }, [
                      createVNode("button", {
                        onClick: ($event) => downloadCertificate(cert.id),
                        class: "btn-download-certificate",
                        title: "Unduh Sertifikat PDF"
                      }, [
                        createVNode("i", { class: "bi bi-download" }),
                        createVNode("span", null, "Unduh Sertifikat Internship")
                      ], 8, ["onClick"])
                    ]);
                  }), 128))
                ]),
                createVNode("div", { class: "invitation-section" }, [
                  createVNode("div", { class: "invitation-card" }, [
                    createVNode("div", { class: "invitation-icon" }, [
                      createVNode("i", { class: "bi bi-people-fill" })
                    ]),
                    createVNode("h3", { class: "invitation-title" }, "Bergabung dengan Tim SEEO"),
                    createVNode("p", { class: "invitation-text" }, " Kami mengundang Anda untuk menjadi bagian dari kepengurusan SEEO periode selanjutnya. Mari bersama-sama membangun ekosistem entrepreneurship yang lebih kuat dan berdampak positif bagi mahasiswa Fakultas Teknik UNSOED. "),
                    createVNode("div", { class: "invitation-features" }, [
                      createVNode("div", { class: "feature-item" }, [
                        createVNode("i", { class: "bi bi-check-circle-fill" }),
                        createVNode("span", null, "Kembangkan skill leadership & teamwork")
                      ]),
                      createVNode("div", { class: "feature-item" }, [
                        createVNode("i", { class: "bi bi-check-circle-fill" }),
                        createVNode("span", null, "Perluas networking & relasi")
                      ]),
                      createVNode("div", { class: "feature-item" }, [
                        createVNode("i", { class: "bi bi-check-circle-fill" }),
                        createVNode("span", null, "Berkontribusi dalam program-program inovatif")
                      ])
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
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ad189982"]]);
export {
  Index as default
};
