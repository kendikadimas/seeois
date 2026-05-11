import { inject, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-BM372l0n.js";
import { Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const fallbackLogo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyNlMmU4ZjAnLz48dGV4dCB4PSc1MCUnIHk9JzUwJScgZmlsbD0nI2EwYWJjMCcgZm9udC1zaXplPScxNScgZm9udC1mYW1pbHk9J3NhbnMtc2VyaWYnIGFsaWdubWVudC1iYXNlbGluZT0nbWlkZGxlJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJz5TQU1QTEUgSU1BR0U8L3RleHQ+PC9zdmc+";
const _sfc_main = {
  __name: "Activity",
  __ssrInlineRender: true,
  setup(__props) {
    inject("imageUrl");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Kegiatan & Program - SEEO" }, null, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="relative bg-slate-950 min-h-[calc(100vh-5rem)] flex items-center justify-center border-b border-slate-900 overflow-hidden"${_scopeId}><div class="absolute inset-0 z-0"${_scopeId}><div class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]"${_scopeId}></div></div><div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center"${_scopeId}><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20"${_scopeId}> Program &amp; Kegiatan SEEO </div><h1 class="text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-tight"${_scopeId}> Aktualisasi <span class="text-blue-500"${_scopeId}>Entrepreneurship</span></h1><p class="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"${_scopeId}> Arsip dokumentatif mengenai inisiatif program kerja, seminar edukasi, dan pembinaan kolektif dalam rangka mencetak probabilitas keberhasilan industri startup. </p><div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"${_scopeId}><div class="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent"${_scopeId}></div></div></div></section><section class="py-24 bg-slate-50 border-b border-slate-200"${_scopeId}><div class="max-w-7xl mx-auto px-6 lg:px-8"${_scopeId}><div class="bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-sm border border-slate-200"${_scopeId}><div class="lg:w-1/2 relative bg-slate-100 min-h-[300px] lg:min-h-full overflow-hidden group"${_scopeId}><img${ssrRenderAttr("src", _ctx.$imageUrl("compro/entclass.JPG"))} alt="EntClass I" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"${_scopeId}></div><div class="p-10 lg:p-16 lg:w-1/2 flex flex-col justify-center text-left"${_scopeId}><div class="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mb-6 border border-blue-100 w-fit uppercase tracking-widest"${_scopeId}> Program Flagship </div><h2 class="text-3xl font-bold text-slate-900 mb-4"${_scopeId}>Entrepreneur Class I</h2><div class="space-y-4 text-slate-600 mb-8 leading-relaxed"${_scopeId}><p${_scopeId}> EntClass merupakan kursus bersertifikasi yang disusun untuk memvalidasi kurikulum bisnis fundamental terhadap eksekutif muda di Fakultas Teknik UNSOED. </p><p${_scopeId}> Mahasiswa difasilitasi materi esensial semacam validasi pasar, konstruksi <em${_scopeId}>Business Model Canvas (BMC)</em>, administrasi legalitas, dan digital marketing konversi tinggi. Diharapkan partisipan siap menembus fase inkubasi akhir tanpa distorsi teknis. </p></div><div class="flex flex-wrap gap-6 pt-6 border-t border-slate-100"${_scopeId}><div${_scopeId}><span class="block text-2xl font-bold text-slate-900"${_scopeId}>50+</span><span class="text-sm text-slate-500 font-medium"${_scopeId}>Partisipan Internal</span></div><div${_scopeId}><span class="block text-2xl font-bold text-slate-900"${_scopeId}>3 KPI</span><span class="text-sm text-slate-500 font-medium"${_scopeId}>Modul Keahlian Terukur</span></div></div></div></div></div></section><section class="py-24 bg-white"${_scopeId}><div class="max-w-7xl mx-auto px-6 lg:px-8"${_scopeId}><div class="text-center mb-16"${_scopeId}><h2 class="text-3xl font-bold text-slate-900 mb-4"${_scopeId}>Arsip Program Berkelanjutan</h2><p class="text-lg text-slate-600 max-w-2xl mx-auto"${_scopeId}>Realisasi program operasional yang mendukung percepatan wawasan organisasi secara komprehensif.</p></div><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"${_scopeId}><div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300"${_scopeId}><div class="aspect-[4/3] bg-slate-100 relative overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", _ctx.$imageUrl("compro/visitasi.JPG"))} alt="Visitasi I" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"${_scopeId}></div><div class="p-6 flex-1 flex flex-col"${_scopeId}><div class="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3"${_scopeId}>Public Relations</div><h3 class="text-xl font-bold text-slate-900 mb-3"${_scopeId}>Visitasi Kelembagaan</h3><p class="text-slate-600 text-sm leading-relaxed mb-4"${_scopeId}>Benchmarking model administrasi dan birokrasi komite lokal lewat tinjauan komparatif dengan institusi di luar universitas (KOPMA UIN SAIZU).</p></div></div><div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300"${_scopeId}><div class="aspect-[4/3] bg-slate-100 relative overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", _ctx.$imageUrl("compro/upgrading.webp"))} alt="Upgrading" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"${_scopeId}></div><div class="p-6 flex-1 flex flex-col"${_scopeId}><div class="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3"${_scopeId}>Human Resources</div><h3 class="text-xl font-bold text-slate-900 mb-3"${_scopeId}>Team Upgrading Intensive</h3><p class="text-slate-600 text-sm leading-relaxed mb-4"${_scopeId}>Intervensi kapasitas struktural guna mengharmonisasikan komunikasi manajerial antar divisi saat memecahkan isu krusial korporasi.</p></div></div><div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300 md:col-span-2 lg:col-span-1"${_scopeId}><div class="aspect-[4/3] bg-slate-100 relative overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", _ctx.$imageUrl("compro/raplen1.JPG"))} alt="Rapat Pleno" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"${_scopeId}></div><div class="p-6 flex-1 flex flex-col"${_scopeId}><div class="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3"${_scopeId}>CEO &amp; Co-CEO</div><h3 class="text-xl font-bold text-slate-900 mb-3"${_scopeId}>Quarterly Pleno</h3><p class="text-slate-600 text-sm leading-relaxed mb-4"${_scopeId}>Rapat evaluasi progres periodik yang mewajibkan audit faktual setiap program departemen demi kontrol transparansi organisasi.</p></div></div></div></div></section><section class="py-24 bg-slate-50 border-t border-slate-200"${_scopeId}><div class="max-w-4xl mx-auto px-6 lg:px-8 text-center"${_scopeId}><h3 class="text-3xl font-bold text-slate-900 mb-6"${_scopeId}>Berkolaborasi Bersama Kami</h3><p class="text-lg text-slate-600 mb-8 leading-relaxed"${_scopeId}> SEEO sangat terbuka terhadap kemitraan akademis, sponsorship industri, maupun entitas startup lain. Satukan gagasan untuk memperluas dampak ekonomi. </p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/contact",
              class: "inline-flex justify-center items-center px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 hover:shadow transition-all duration-200"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Ajukan Kemitraan `);
                } else {
                  return [
                    createTextVNode(" Ajukan Kemitraan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></section>`);
          } else {
            return [
              createVNode("section", { class: "relative bg-slate-950 min-h-[calc(100vh-5rem)] flex items-center justify-center border-b border-slate-900 overflow-hidden" }, [
                createVNode("div", { class: "absolute inset-0 z-0" }, [
                  createVNode("div", { class: "absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" })
                ]),
                createVNode("div", { class: "max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center" }, [
                  createVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20" }, " Program & Kegiatan SEEO "),
                  createVNode("h1", { class: "text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-tight" }, [
                    createTextVNode(" Aktualisasi "),
                    createVNode("span", { class: "text-blue-500" }, "Entrepreneurship")
                  ]),
                  createVNode("p", { class: "text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto" }, " Arsip dokumentatif mengenai inisiatif program kerja, seminar edukasi, dan pembinaan kolektif dalam rangka mencetak probabilitas keberhasilan industri startup. "),
                  createVNode("div", { class: "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30" }, [
                    createVNode("div", { class: "w-px h-16 bg-gradient-to-b from-blue-500 to-transparent" })
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-slate-50 border-b border-slate-200" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-sm border border-slate-200" }, [
                    createVNode("div", { class: "lg:w-1/2 relative bg-slate-100 min-h-[300px] lg:min-h-full overflow-hidden group" }, [
                      createVNode("img", {
                        src: _ctx.$imageUrl("compro/entclass.JPG"),
                        alt: "EntClass I",
                        class: "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out",
                        onError: ($event) => $event.target.src = fallbackLogo
                      }, null, 40, ["src", "onError"])
                    ]),
                    createVNode("div", { class: "p-10 lg:p-16 lg:w-1/2 flex flex-col justify-center text-left" }, [
                      createVNode("div", { class: "inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mb-6 border border-blue-100 w-fit uppercase tracking-widest" }, " Program Flagship "),
                      createVNode("h2", { class: "text-3xl font-bold text-slate-900 mb-4" }, "Entrepreneur Class I"),
                      createVNode("div", { class: "space-y-4 text-slate-600 mb-8 leading-relaxed" }, [
                        createVNode("p", null, " EntClass merupakan kursus bersertifikasi yang disusun untuk memvalidasi kurikulum bisnis fundamental terhadap eksekutif muda di Fakultas Teknik UNSOED. "),
                        createVNode("p", null, [
                          createTextVNode(" Mahasiswa difasilitasi materi esensial semacam validasi pasar, konstruksi "),
                          createVNode("em", null, "Business Model Canvas (BMC)"),
                          createTextVNode(", administrasi legalitas, dan digital marketing konversi tinggi. Diharapkan partisipan siap menembus fase inkubasi akhir tanpa distorsi teknis. ")
                        ])
                      ]),
                      createVNode("div", { class: "flex flex-wrap gap-6 pt-6 border-t border-slate-100" }, [
                        createVNode("div", null, [
                          createVNode("span", { class: "block text-2xl font-bold text-slate-900" }, "50+"),
                          createVNode("span", { class: "text-sm text-slate-500 font-medium" }, "Partisipan Internal")
                        ]),
                        createVNode("div", null, [
                          createVNode("span", { class: "block text-2xl font-bold text-slate-900" }, "3 KPI"),
                          createVNode("span", { class: "text-sm text-slate-500 font-medium" }, "Modul Keahlian Terukur")
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-white" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 lg:px-8" }, [
                  createVNode("div", { class: "text-center mb-16" }, [
                    createVNode("h2", { class: "text-3xl font-bold text-slate-900 mb-4" }, "Arsip Program Berkelanjutan"),
                    createVNode("p", { class: "text-lg text-slate-600 max-w-2xl mx-auto" }, "Realisasi program operasional yang mendukung percepatan wawasan organisasi secara komprehensif.")
                  ]),
                  createVNode("div", { class: "grid md:grid-cols-2 lg:grid-cols-3 gap-8" }, [
                    createVNode("div", { class: "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300" }, [
                      createVNode("div", { class: "aspect-[4/3] bg-slate-100 relative overflow-hidden" }, [
                        createVNode("img", {
                          src: _ctx.$imageUrl("compro/visitasi.JPG"),
                          alt: "Visitasi I",
                          class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out",
                          onError: ($event) => $event.target.src = fallbackLogo
                        }, null, 40, ["src", "onError"])
                      ]),
                      createVNode("div", { class: "p-6 flex-1 flex flex-col" }, [
                        createVNode("div", { class: "text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3" }, "Public Relations"),
                        createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-3" }, "Visitasi Kelembagaan"),
                        createVNode("p", { class: "text-slate-600 text-sm leading-relaxed mb-4" }, "Benchmarking model administrasi dan birokrasi komite lokal lewat tinjauan komparatif dengan institusi di luar universitas (KOPMA UIN SAIZU).")
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300" }, [
                      createVNode("div", { class: "aspect-[4/3] bg-slate-100 relative overflow-hidden" }, [
                        createVNode("img", {
                          src: _ctx.$imageUrl("compro/upgrading.webp"),
                          alt: "Upgrading",
                          class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out",
                          onError: ($event) => $event.target.src = fallbackLogo
                        }, null, 40, ["src", "onError"])
                      ]),
                      createVNode("div", { class: "p-6 flex-1 flex flex-col" }, [
                        createVNode("div", { class: "text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3" }, "Human Resources"),
                        createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-3" }, "Team Upgrading Intensive"),
                        createVNode("p", { class: "text-slate-600 text-sm leading-relaxed mb-4" }, "Intervensi kapasitas struktural guna mengharmonisasikan komunikasi manajerial antar divisi saat memecahkan isu krusial korporasi.")
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300 md:col-span-2 lg:col-span-1" }, [
                      createVNode("div", { class: "aspect-[4/3] bg-slate-100 relative overflow-hidden" }, [
                        createVNode("img", {
                          src: _ctx.$imageUrl("compro/raplen1.JPG"),
                          alt: "Rapat Pleno",
                          class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out",
                          onError: ($event) => $event.target.src = fallbackLogo
                        }, null, 40, ["src", "onError"])
                      ]),
                      createVNode("div", { class: "p-6 flex-1 flex flex-col" }, [
                        createVNode("div", { class: "text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3" }, "CEO & Co-CEO"),
                        createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-3" }, "Quarterly Pleno"),
                        createVNode("p", { class: "text-slate-600 text-sm leading-relaxed mb-4" }, "Rapat evaluasi progres periodik yang mewajibkan audit faktual setiap program departemen demi kontrol transparansi organisasi.")
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-slate-50 border-t border-slate-200" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-6 lg:px-8 text-center" }, [
                  createVNode("h3", { class: "text-3xl font-bold text-slate-900 mb-6" }, "Berkolaborasi Bersama Kami"),
                  createVNode("p", { class: "text-lg text-slate-600 mb-8 leading-relaxed" }, " SEEO sangat terbuka terhadap kemitraan akademis, sponsorship industri, maupun entitas startup lain. Satukan gagasan untuk memperluas dampak ekonomi. "),
                  createVNode(unref(Link), {
                    href: "/contact",
                    class: "inline-flex justify-center items-center px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 hover:shadow transition-all duration-200"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Ajukan Kemitraan ")
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Activity.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Activity-BK9KsP-n.js.map
