import { inject, unref, withCtx, createVNode, createTextVNode, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-BM372l0n.js";
import { Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const fallbackLogo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyNlMmU4ZjAnLz48dGV4dCB4PSc1MCUnIHk9JzUwJScgZmlsbD0nI2EwYWJjMCcgZm9udC1zaXplPScxNScgZm9udC1mYW1pbHk9J3NhbnMtc2VyaWYnIGFsaWdubWVudC1iYXNlbGluZT0nbWlkZGxlJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJz5TQU1QTEUgSU1BR0U8L3RleHQ+PC9zdmc+";
const _sfc_main = {
  __name: "About",
  __ssrInlineRender: true,
  setup(__props) {
    inject("imageUrl");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Tentang SEEO - Student Entrepreneur and Empowerment Organization" }, null, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="relative bg-slate-950 min-h-[calc(100vh-5rem)] flex items-center justify-center border-b border-slate-900 overflow-hidden"${_scopeId}><div class="absolute inset-0 z-0"${_scopeId}><div class="absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] -translate-y-1/2"${_scopeId}></div></div><div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center"${_scopeId}><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20"${_scopeId}> Satu Pandangan, Satu Dedikasi. </div><h1 class="text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-tight"${_scopeId}> Profil <span class="text-blue-500 italic"${_scopeId}>SEEO</span></h1><p class="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"${_scopeId}> Institusi mahasiswa resmi di lingkungan Fakultas Teknik Universitas Jenderal Soedirman untuk melahirkan individu bisnis adaptif, inovatif, serta melek digital. </p><div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20"${_scopeId}><div class="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent"${_scopeId}></div></div></div></section><section class="py-24 bg-slate-50 border-b border-slate-200"${_scopeId}><div class="max-w-7xl mx-auto px-6 lg:px-8"${_scopeId}><div class="grid lg:grid-cols-2 gap-16 items-center"${_scopeId}><div${_scopeId}><h2 class="text-3xl font-bold text-slate-900 mb-6"${_scopeId}>Latar Organisasi</h2><div class="space-y-4 text-slate-600 leading-relaxed"${_scopeId}><p${_scopeId}><strong${_scopeId}>Student Entrepreneur and Empowerment Organization (SEEO)</strong> didirikan sebagai representasi nyata Fakultas Teknik UNSOED dalam merengkuh talenta kreatif yang memiliki intensi mendirikan mandiri finansial di era industri modern. </p><p${_scopeId}> Beroperasi di bawah arahan dekanat sebagai Unit Kegiatan Mahasiswa, fokus kami adalah menekan gap antara perlakuan akademis teoretis dengan keagresifan pasar di lapangan, serta memastikan pengalihan wawasan itu dilakukan dengan standar manajerial level profesional. </p></div><div class="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10"${_scopeId}><div class="p-4 bg-white rounded-xl border border-slate-200"${_scopeId}><div class="text-2xl font-bold text-blue-600 mb-1"${_scopeId}>2014</div><div class="text-xs text-slate-500 font-medium tracking-wide"${_scopeId}>Tahun Berdiri</div></div><div class="p-4 bg-white rounded-xl border border-slate-200"${_scopeId}><div class="text-2xl font-bold text-blue-600 mb-1"${_scopeId}>100+</div><div class="text-xs text-slate-500 font-medium tracking-wide"${_scopeId}>SDM Terlatih</div></div></div></div><div class="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex items-center justify-center min-h-[350px]"${_scopeId}><img${ssrRenderAttr("src", _ctx.$imageUrl("compro/logo.png"))} alt="Logo SEEO" class="w-2/3 h-auto max-w-[250px] object-contain opacity-90 drop-shadow-lg"${_scopeId}></div></div></div></section><section class="py-24 bg-white border-b border-slate-200"${_scopeId}><div class="max-w-7xl mx-auto px-6 lg:px-8"${_scopeId}><div class="text-center mb-16"${_scopeId}><h2 class="text-3xl font-bold text-slate-900 mb-4"${_scopeId}>Visi &amp; Misi</h2><p class="text-lg text-slate-600 max-w-2xl mx-auto"${_scopeId}>Fondasi landasan gerak yang mendasari pengambilan keputusan operasional sehari-hari.</p></div><div class="grid md:grid-cols-2 gap-8"${_scopeId}><div class="bg-blue-600 rounded-2xl p-10 text-white shadow-md"${_scopeId}><div class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6"${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg></div><h3 class="text-2xl font-bold mb-4"${_scopeId}>Visi</h3><p class="text-blue-50 leading-relaxed text-lg"${_scopeId}> Menjadi Unit Kegiatan Mahasiswa Kewirausahaan yang unggul, inovatif, tangguh, dan berkelanjutan dari semua lini kompartemen Fakultas Teknik UNSOED. </p></div><div class="bg-slate-50 rounded-2xl p-10 border border-slate-200 shadow-sm"${_scopeId}><div class="w-12 h-12 bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center mb-6"${_scopeId}><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"${_scopeId}></path></svg></div><h3 class="text-2xl font-bold text-slate-900 mb-4"${_scopeId}>Misi</h3><ul class="space-y-3 text-slate-600"${_scopeId}><li class="flex gap-3"${_scopeId}><span class="text-blue-600 font-bold"${_scopeId}>•</span> Mengekstraksikan keseimbangan wawasan teoretis dan uji klinis praktik pasar yang adaptif.</li><li class="flex gap-3"${_scopeId}><span class="text-blue-600 font-bold"${_scopeId}>•</span> Memfasilitasi ekosistem kolaborasi harmonis baik persatuan internal maupun mitra instansi berafiliasi eksternal.</li><li class="flex gap-3"${_scopeId}><span class="text-blue-600 font-bold"${_scopeId}>•</span> Menjadi inkubator pencetak kemandirian komersial mahasiswa teknik.</li></ul></div></div></div></section><section class="py-24 bg-slate-50"${_scopeId}><div class="max-w-7xl mx-auto px-6 lg:px-8"${_scopeId}><div class="text-center mb-16"${_scopeId}><h2 class="text-3xl font-bold text-slate-900 mb-4"${_scopeId}>Nilai-Nilai Fundamental</h2><p class="text-lg text-slate-600"${_scopeId}>Standar pedoman etika setiap aktivitas kemahasiswaan kami.</p></div><div class="grid md:grid-cols-3 gap-8"${_scopeId}><div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center"${_scopeId}><h3 class="text-xl font-bold text-slate-900 mb-3"${_scopeId}>Inovatif</h3><p class="text-slate-600 text-sm leading-relaxed"${_scopeId}>Keluwesan taktik pemasaran dan modernisasi administrasi internal mengikuti dinamisasi regulasi IT.</p></div><div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center"${_scopeId}><h3 class="text-xl font-bold text-slate-900 mb-3"${_scopeId}>Kolaboratif</h3><p class="text-slate-600 text-sm leading-relaxed"${_scopeId}>Prinsip menolak determinasi eksklusif grup; mewajibkan keterlibatan jejaring ekosistem.</p></div><div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center"${_scopeId}><h3 class="text-xl font-bold text-slate-900 mb-3"${_scopeId}>Keunggulan Etis</h3><p class="text-slate-600 text-sm leading-relaxed"${_scopeId}>Prioritas integritas pertanggungjawaban legalitas produk atas seluruh profit margin yang diperoleh organisasi.</p></div></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "relative bg-slate-950 min-h-[calc(100vh-5rem)] flex items-center justify-center border-b border-slate-900 overflow-hidden" }, [
                createVNode("div", { class: "absolute inset-0 z-0" }, [
                  createVNode("div", { class: "absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] -translate-y-1/2" })
                ]),
                createVNode("div", { class: "max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center" }, [
                  createVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20" }, " Satu Pandangan, Satu Dedikasi. "),
                  createVNode("h1", { class: "text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-tight" }, [
                    createTextVNode(" Profil "),
                    createVNode("span", { class: "text-blue-500 italic" }, "SEEO")
                  ]),
                  createVNode("p", { class: "text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto" }, " Institusi mahasiswa resmi di lingkungan Fakultas Teknik Universitas Jenderal Soedirman untuk melahirkan individu bisnis adaptif, inovatif, serta melek digital. "),
                  createVNode("div", { class: "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20" }, [
                    createVNode("div", { class: "w-px h-16 bg-gradient-to-b from-blue-500 to-transparent" })
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-slate-50 border-b border-slate-200" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 lg:px-8" }, [
                  createVNode("div", { class: "grid lg:grid-cols-2 gap-16 items-center" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-3xl font-bold text-slate-900 mb-6" }, "Latar Organisasi"),
                      createVNode("div", { class: "space-y-4 text-slate-600 leading-relaxed" }, [
                        createVNode("p", null, [
                          createVNode("strong", null, "Student Entrepreneur and Empowerment Organization (SEEO)"),
                          createTextVNode(" didirikan sebagai representasi nyata Fakultas Teknik UNSOED dalam merengkuh talenta kreatif yang memiliki intensi mendirikan mandiri finansial di era industri modern. ")
                        ]),
                        createVNode("p", null, " Beroperasi di bawah arahan dekanat sebagai Unit Kegiatan Mahasiswa, fokus kami adalah menekan gap antara perlakuan akademis teoretis dengan keagresifan pasar di lapangan, serta memastikan pengalihan wawasan itu dilakukan dengan standar manajerial level profesional. ")
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10" }, [
                        createVNode("div", { class: "p-4 bg-white rounded-xl border border-slate-200" }, [
                          createVNode("div", { class: "text-2xl font-bold text-blue-600 mb-1" }, "2014"),
                          createVNode("div", { class: "text-xs text-slate-500 font-medium tracking-wide" }, "Tahun Berdiri")
                        ]),
                        createVNode("div", { class: "p-4 bg-white rounded-xl border border-slate-200" }, [
                          createVNode("div", { class: "text-2xl font-bold text-blue-600 mb-1" }, "100+"),
                          createVNode("div", { class: "text-xs text-slate-500 font-medium tracking-wide" }, "SDM Terlatih")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex items-center justify-center min-h-[350px]" }, [
                      createVNode("img", {
                        src: _ctx.$imageUrl("compro/logo.png"),
                        alt: "Logo SEEO",
                        class: "w-2/3 h-auto max-w-[250px] object-contain opacity-90 drop-shadow-lg",
                        onError: ($event) => $event.target.src = fallbackLogo
                      }, null, 40, ["src", "onError"])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-white border-b border-slate-200" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 lg:px-8" }, [
                  createVNode("div", { class: "text-center mb-16" }, [
                    createVNode("h2", { class: "text-3xl font-bold text-slate-900 mb-4" }, "Visi & Misi"),
                    createVNode("p", { class: "text-lg text-slate-600 max-w-2xl mx-auto" }, "Fondasi landasan gerak yang mendasari pengambilan keputusan operasional sehari-hari.")
                  ]),
                  createVNode("div", { class: "grid md:grid-cols-2 gap-8" }, [
                    createVNode("div", { class: "bg-blue-600 rounded-2xl p-10 text-white shadow-md" }, [
                      createVNode("div", { class: "w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-white",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          }),
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          })
                        ]))
                      ]),
                      createVNode("h3", { class: "text-2xl font-bold mb-4" }, "Visi"),
                      createVNode("p", { class: "text-blue-50 leading-relaxed text-lg" }, " Menjadi Unit Kegiatan Mahasiswa Kewirausahaan yang unggul, inovatif, tangguh, dan berkelanjutan dari semua lini kompartemen Fakultas Teknik UNSOED. ")
                    ]),
                    createVNode("div", { class: "bg-slate-50 rounded-2xl p-10 border border-slate-200 shadow-sm" }, [
                      createVNode("div", { class: "w-12 h-12 bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center mb-6" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          })
                        ]))
                      ]),
                      createVNode("h3", { class: "text-2xl font-bold text-slate-900 mb-4" }, "Misi"),
                      createVNode("ul", { class: "space-y-3 text-slate-600" }, [
                        createVNode("li", { class: "flex gap-3" }, [
                          createVNode("span", { class: "text-blue-600 font-bold" }, "•"),
                          createTextVNode(" Mengekstraksikan keseimbangan wawasan teoretis dan uji klinis praktik pasar yang adaptif.")
                        ]),
                        createVNode("li", { class: "flex gap-3" }, [
                          createVNode("span", { class: "text-blue-600 font-bold" }, "•"),
                          createTextVNode(" Memfasilitasi ekosistem kolaborasi harmonis baik persatuan internal maupun mitra instansi berafiliasi eksternal.")
                        ]),
                        createVNode("li", { class: "flex gap-3" }, [
                          createVNode("span", { class: "text-blue-600 font-bold" }, "•"),
                          createTextVNode(" Menjadi inkubator pencetak kemandirian komersial mahasiswa teknik.")
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-slate-50" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 lg:px-8" }, [
                  createVNode("div", { class: "text-center mb-16" }, [
                    createVNode("h2", { class: "text-3xl font-bold text-slate-900 mb-4" }, "Nilai-Nilai Fundamental"),
                    createVNode("p", { class: "text-lg text-slate-600" }, "Standar pedoman etika setiap aktivitas kemahasiswaan kami.")
                  ]),
                  createVNode("div", { class: "grid md:grid-cols-3 gap-8" }, [
                    createVNode("div", { class: "bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center" }, [
                      createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-3" }, "Inovatif"),
                      createVNode("p", { class: "text-slate-600 text-sm leading-relaxed" }, "Keluwesan taktik pemasaran dan modernisasi administrasi internal mengikuti dinamisasi regulasi IT.")
                    ]),
                    createVNode("div", { class: "bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center" }, [
                      createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-3" }, "Kolaboratif"),
                      createVNode("p", { class: "text-slate-600 text-sm leading-relaxed" }, "Prinsip menolak determinasi eksklusif grup; mewajibkan keterlibatan jejaring ekosistem.")
                    ]),
                    createVNode("div", { class: "bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center" }, [
                      createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-3" }, "Keunggulan Etis"),
                      createVNode("p", { class: "text-slate-600 text-sm leading-relaxed" }, "Prioritas integritas pertanggungjawaban legalitas produk atas seluruh profit margin yang diperoleh organisasi.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/About.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=About-C2CAlI_7.js.map
