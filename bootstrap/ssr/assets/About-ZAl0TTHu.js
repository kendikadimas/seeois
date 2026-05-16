import { ref, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-23vkxrDC.js";
import { Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "About",
  __ssrInlineRender: true,
  setup(__props) {
    const logoSrc = ref("/storage/images/compro/logo.png");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Tentang Kami - SEEO FT UNSOED</title><meta name="description" content="Pelajari lebih dalam tentang SEEO FT UNSOED, visi misi kami dalam mencetak enterpreneur muda, serta sejarah perjalanan organisasi kami di Fakultas Teknik Universitas Jenderal Soedirman."${_scopeId}><meta name="keywords" content="organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, tentang seeo"${_scopeId}><meta property="og:title" content="Tentang SEEO - Visi, Misi, dan Sejarah"${_scopeId}><meta property="og:description" content="Mencetak talenta enterpreneur masa depan di Fakultas Teknik UNSOED."${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Tentang Kami - SEEO FT UNSOED"),
              createVNode("meta", {
                name: "description",
                content: "Pelajari lebih dalam tentang SEEO FT UNSOED, visi misi kami dalam mencetak enterpreneur muda, serta sejarah perjalanan organisasi kami di Fakultas Teknik Universitas Jenderal Soedirman."
              }),
              createVNode("meta", {
                name: "keywords",
                content: "organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, tentang seeo"
              }),
              createVNode("meta", {
                property: "og:title",
                content: "Tentang SEEO - Visi, Misi, dan Sejarah"
              }),
              createVNode("meta", {
                property: "og:description",
                content: "Mencetak talenta enterpreneur masa depan di Fakultas Teknik UNSOED."
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="pt-32 pb-20 bg-white overflow-hidden relative"${_scopeId}><div class="max-w-7xl mx-auto px-6 relative z-10 text-center"${_scopeId}><h1 class="text-6xl md:text-8xl font-black text-[#004182] mb-8 tracking-tight uppercase"${_scopeId}> About <span class="text-[#FFD700]"${_scopeId}>SEEO</span></h1><p class="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"${_scopeId}> Soedirman Engineering Entrepreneurship Organization (SEEO) adalah Unit Kegiatan Mahasiswa resmi di lingkungan Fakultas Teknik Universitas Jenderal Soedirman. </p></div><div class="absolute top-0 right-0 w-1/3 h-full bg-[#f8f9fa] -skew-x-12 translate-x-1/2 -z-0"${_scopeId}></div></section><section class="py-24 bg-white relative z-10"${_scopeId}><div class="max-w-7xl mx-auto px-6"${_scopeId}><div class="flex flex-col lg:flex-row items-center gap-20"${_scopeId}><div class="lg:w-1/2 relative"${_scopeId}><div class="absolute -top-10 -left-10 w-32 h-32 bg-[#FFD700]/20 rounded-full blur-3xl"${_scopeId}></div><div class="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white bg-[#004182] p-20"${_scopeId}><img${ssrRenderAttr("src", logoSrc.value)} alt="SEEO Logo" class="w-full h-auto drop-shadow-2xl"${_scopeId}></div></div><div class="lg:w-1/2 space-y-8"${_scopeId}><h2 class="text-4xl font-black text-[#004182] uppercase tracking-tight"${_scopeId}>Latar Belakang</h2><div class="w-20 h-2 bg-[#FFD700]"${_scopeId}></div><div class="prose prose-lg text-gray-500 font-medium leading-relaxed"${_scopeId}><p${_scopeId}> SEEO didirikan sebagai representasi nyata Fakultas Teknik UNSOED dalam merengkuh talenta kreatif yang memiliki intensi mendirikan mandiri finansial di era industri modern. </p><p${_scopeId}> Beroperasi di bawah arahan dekanat sebagai Unit Kegiatan Mahasiswa, fokus kami adalah menekan gap antara perlakuan akademis teoretis dengan keagresifan pasar di lapangan, serta memastikan pengalihan wawasan itu dilakukan dengan standar manajerial level profesional. </p></div><div class="grid grid-cols-2 gap-8 pt-8"${_scopeId}><div${_scopeId}><h4 class="text-4xl font-black text-[#004182]"${_scopeId}>2020</h4><p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2"${_scopeId}>TAHUN BERDIRI</p></div><div${_scopeId}><h4 class="text-4xl font-black text-[#004182]"${_scopeId}>8</h4><p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2"${_scopeId}>Departemen</p></div></div></div></div></div></section><section class="py-32 bg-[#004182] relative overflow-hidden"${_scopeId}><div class="max-w-7xl mx-auto px-6 relative z-10"${_scopeId}><div class="grid lg:grid-cols-2 gap-16"${_scopeId}><div class="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10"${_scopeId}><div class="w-16 h-16 bg-[#FFD700] text-[#004182] rounded-2xl flex items-center justify-center mb-8 shadow-lg"${_scopeId}><i class="bi bi-eye-fill text-2xl"${_scopeId}></i></div><h3 class="text-3xl font-black text-white mb-6 uppercase tracking-tight"${_scopeId}>Visi</h3><p class="text-white/70 text-lg leading-[2] font-medium italic"${_scopeId}> &quot;Menjadi Unit Kegiatan Mahasiswa Kewirausahaan yang unggul, inovatif, tangguh, dan berkelanjutan dari semua lini kompartemen Fakultas Teknik UNSOED.&quot; </p></div><div class="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10"${_scopeId}><div class="w-16 h-16 bg-white text-[#004182] rounded-2xl flex items-center justify-center mb-8 shadow-lg"${_scopeId}><i class="bi bi-bullseye text-2xl"${_scopeId}></i></div><h3 class="text-3xl font-black text-white mb-6 uppercase tracking-tight"${_scopeId}>Misi</h3><ul class="space-y-6 list-none p-0 m-0"${_scopeId}><li class="flex gap-4 text-white/70 font-medium"${_scopeId}><span class="w-6 h-6 bg-[#FFD700] rounded-full flex-shrink-0 flex items-center justify-center text-[#004182] font-black text-xs"${_scopeId}>1</span><p${_scopeId}>Mengekstraksikan keseimbangan wawasan teoretis dan uji klinis praktik pasar yang adaptif.</p></li><li class="flex gap-4 text-white/70 font-medium"${_scopeId}><span class="w-6 h-6 bg-[#FFD700] rounded-full flex-shrink-0 flex items-center justify-center text-[#004182] font-black text-xs"${_scopeId}>2</span><p${_scopeId}>Memfasilitasi ekosistem kolaborasi harmonis baik persatuan internal maupun mitra instansi berafiliasi eksternal.</p></li><li class="flex gap-4 text-white/70 font-medium"${_scopeId}><span class="w-6 h-6 bg-[#FFD700] rounded-full flex-shrink-0 flex items-center justify-center text-[#004182] font-black text-xs"${_scopeId}>3</span><p${_scopeId}>Menjadi inkubator pencetak kemandirian komersial mahasiswa teknik.</p></li></ul></div></div></div><div class="absolute -bottom-20 -right-20 w-96 h-96 bg-[#FFD700] rounded-full opacity-5 blur-3xl"${_scopeId}></div></section><section class="py-20 md:py-32 relative overflow-hidden"${_scopeId}><div class="max-w-7xl mx-auto px-6 relative z-10"${_scopeId}><div class="bg-gradient-to-br from-[#004182] to-[#002d5a] rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-20 text-left md:text-center relative overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,65,130,0.4)]"${_scopeId}><div class="absolute top-0 left-0 w-full h-full"${_scopeId}><div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFD700] rounded-full blur-[120px] opacity-[0.08]"${_scopeId}></div><div class="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[100px] opacity-[0.05]"${_scopeId}></div></div><div class="relative z-10 max-w-2xl mx-auto md:mx-auto ml-0"${_scopeId}><div class="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[#FFD700] text-[10px] font-black uppercase tracking-[0.3em] mb-8"${_scopeId}> Join the Movement </div><h2 class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight uppercase hyphens-auto"${_scopeId}> Siap <span class="text-[#FFD700]"${_scopeId}>Berkolaborasi</span><br class="hidden md:block"${_scopeId}> Dengan Kami? </h2><p class="text-white/60 text-base md:text-lg font-medium mb-12 leading-relaxed"${_scopeId}> Jadilah bagian dari perjalanan SEEO dalam mencetak talenta enterpreneur masa depan. Kami terbuka untuk berbagai bentuk kerjasama strategis. </p><div class="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-center gap-4 md:gap-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/contact",
              class: "w-full sm:w-auto px-10 py-4 bg-[#FFD700] text-[#004182] rounded-xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-white hover:-translate-y-1 transition-all duration-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Mulai Kerjasama `);
                } else {
                  return [
                    createTextVNode(" Mulai Kerjasama ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/structure",
              class: "w-full sm:w-auto px-10 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Lihat Tim Kami `);
                } else {
                  return [
                    createTextVNode(" Lihat Tim Kami ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "pt-32 pb-20 bg-white overflow-hidden relative" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 relative z-10 text-center" }, [
                  createVNode("h1", { class: "text-6xl md:text-8xl font-black text-[#004182] mb-8 tracking-tight uppercase" }, [
                    createTextVNode(" About "),
                    createVNode("span", { class: "text-[#FFD700]" }, "SEEO")
                  ]),
                  createVNode("p", { class: "text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed" }, " Soedirman Engineering Entrepreneurship Organization (SEEO) adalah Unit Kegiatan Mahasiswa resmi di lingkungan Fakultas Teknik Universitas Jenderal Soedirman. ")
                ]),
                createVNode("div", { class: "absolute top-0 right-0 w-1/3 h-full bg-[#f8f9fa] -skew-x-12 translate-x-1/2 -z-0" })
              ]),
              createVNode("section", { class: "py-24 bg-white relative z-10" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "flex flex-col lg:flex-row items-center gap-20" }, [
                    createVNode("div", { class: "lg:w-1/2 relative" }, [
                      createVNode("div", { class: "absolute -top-10 -left-10 w-32 h-32 bg-[#FFD700]/20 rounded-full blur-3xl" }),
                      createVNode("div", { class: "relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white bg-[#004182] p-20" }, [
                        createVNode("img", {
                          src: logoSrc.value,
                          alt: "SEEO Logo",
                          class: "w-full h-auto drop-shadow-2xl",
                          onError: ($event) => $event.target.src = "/storage/images/compro/logo.png"
                        }, null, 40, ["src", "onError"])
                      ])
                    ]),
                    createVNode("div", { class: "lg:w-1/2 space-y-8" }, [
                      createVNode("h2", { class: "text-4xl font-black text-[#004182] uppercase tracking-tight" }, "Latar Belakang"),
                      createVNode("div", { class: "w-20 h-2 bg-[#FFD700]" }),
                      createVNode("div", { class: "prose prose-lg text-gray-500 font-medium leading-relaxed" }, [
                        createVNode("p", null, " SEEO didirikan sebagai representasi nyata Fakultas Teknik UNSOED dalam merengkuh talenta kreatif yang memiliki intensi mendirikan mandiri finansial di era industri modern. "),
                        createVNode("p", null, " Beroperasi di bawah arahan dekanat sebagai Unit Kegiatan Mahasiswa, fokus kami adalah menekan gap antara perlakuan akademis teoretis dengan keagresifan pasar di lapangan, serta memastikan pengalihan wawasan itu dilakukan dengan standar manajerial level profesional. ")
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-8 pt-8" }, [
                        createVNode("div", null, [
                          createVNode("h4", { class: "text-4xl font-black text-[#004182]" }, "2020"),
                          createVNode("p", { class: "text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2" }, "TAHUN BERDIRI")
                        ]),
                        createVNode("div", null, [
                          createVNode("h4", { class: "text-4xl font-black text-[#004182]" }, "8"),
                          createVNode("p", { class: "text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2" }, "Departemen")
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-32 bg-[#004182] relative overflow-hidden" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 relative z-10" }, [
                  createVNode("div", { class: "grid lg:grid-cols-2 gap-16" }, [
                    createVNode("div", { class: "bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10" }, [
                      createVNode("div", { class: "w-16 h-16 bg-[#FFD700] text-[#004182] rounded-2xl flex items-center justify-center mb-8 shadow-lg" }, [
                        createVNode("i", { class: "bi bi-eye-fill text-2xl" })
                      ]),
                      createVNode("h3", { class: "text-3xl font-black text-white mb-6 uppercase tracking-tight" }, "Visi"),
                      createVNode("p", { class: "text-white/70 text-lg leading-[2] font-medium italic" }, ' "Menjadi Unit Kegiatan Mahasiswa Kewirausahaan yang unggul, inovatif, tangguh, dan berkelanjutan dari semua lini kompartemen Fakultas Teknik UNSOED." ')
                    ]),
                    createVNode("div", { class: "bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10" }, [
                      createVNode("div", { class: "w-16 h-16 bg-white text-[#004182] rounded-2xl flex items-center justify-center mb-8 shadow-lg" }, [
                        createVNode("i", { class: "bi bi-bullseye text-2xl" })
                      ]),
                      createVNode("h3", { class: "text-3xl font-black text-white mb-6 uppercase tracking-tight" }, "Misi"),
                      createVNode("ul", { class: "space-y-6 list-none p-0 m-0" }, [
                        createVNode("li", { class: "flex gap-4 text-white/70 font-medium" }, [
                          createVNode("span", { class: "w-6 h-6 bg-[#FFD700] rounded-full flex-shrink-0 flex items-center justify-center text-[#004182] font-black text-xs" }, "1"),
                          createVNode("p", null, "Mengekstraksikan keseimbangan wawasan teoretis dan uji klinis praktik pasar yang adaptif.")
                        ]),
                        createVNode("li", { class: "flex gap-4 text-white/70 font-medium" }, [
                          createVNode("span", { class: "w-6 h-6 bg-[#FFD700] rounded-full flex-shrink-0 flex items-center justify-center text-[#004182] font-black text-xs" }, "2"),
                          createVNode("p", null, "Memfasilitasi ekosistem kolaborasi harmonis baik persatuan internal maupun mitra instansi berafiliasi eksternal.")
                        ]),
                        createVNode("li", { class: "flex gap-4 text-white/70 font-medium" }, [
                          createVNode("span", { class: "w-6 h-6 bg-[#FFD700] rounded-full flex-shrink-0 flex items-center justify-center text-[#004182] font-black text-xs" }, "3"),
                          createVNode("p", null, "Menjadi inkubator pencetak kemandirian komersial mahasiswa teknik.")
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "absolute -bottom-20 -right-20 w-96 h-96 bg-[#FFD700] rounded-full opacity-5 blur-3xl" })
              ]),
              createVNode("section", { class: "py-20 md:py-32 relative overflow-hidden" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 relative z-10" }, [
                  createVNode("div", { class: "bg-gradient-to-br from-[#004182] to-[#002d5a] rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-20 text-left md:text-center relative overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,65,130,0.4)]" }, [
                    createVNode("div", { class: "absolute top-0 left-0 w-full h-full" }, [
                      createVNode("div", { class: "absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFD700] rounded-full blur-[120px] opacity-[0.08]" }),
                      createVNode("div", { class: "absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[100px] opacity-[0.05]" })
                    ]),
                    createVNode("div", { class: "relative z-10 max-w-2xl mx-auto md:mx-auto ml-0" }, [
                      createVNode("div", { class: "inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[#FFD700] text-[10px] font-black uppercase tracking-[0.3em] mb-8" }, " Join the Movement "),
                      createVNode("h2", { class: "text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight uppercase hyphens-auto" }, [
                        createTextVNode(" Siap "),
                        createVNode("span", { class: "text-[#FFD700]" }, "Berkolaborasi"),
                        createVNode("br", { class: "hidden md:block" }),
                        createTextVNode(" Dengan Kami? ")
                      ]),
                      createVNode("p", { class: "text-white/60 text-base md:text-lg font-medium mb-12 leading-relaxed" }, " Jadilah bagian dari perjalanan SEEO dalam mencetak talenta enterpreneur masa depan. Kami terbuka untuk berbagai bentuk kerjasama strategis. "),
                      createVNode("div", { class: "flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-center gap-4 md:gap-6" }, [
                        createVNode(unref(Link), {
                          href: "/contact",
                          class: "w-full sm:w-auto px-10 py-4 bg-[#FFD700] text-[#004182] rounded-xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-white hover:-translate-y-1 transition-all duration-300"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Mulai Kerjasama ")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Link), {
                          href: "/structure",
                          class: "w-full sm:w-auto px-10 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Lihat Tim Kami ")
                          ]),
                          _: 1
                        })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/About.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=About-ZAl0TTHu.js.map
