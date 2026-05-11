import { unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-BM372l0n.js";
import { Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const logoSrc = "/storage/images/misc/logo.png";
const fallbackLogo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyNlMmU4ZjAnLz48dGV4dCB4PSc1MCUnIHk9JzUwJScgZmlsbD0nI2EwYWJjMCcgZm9udC1zaXplPScxNScgZm9udC1mYW1pbHk9J3NhbnMtc2VyaWYnIGFsaWdubWVudC1iYXNlbGluZT0nbWlkZGxlJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJz5TQU1QTEUgSU1BR0U8L3RleHQ+PC9zdmc+";
const _sfc_main = {
  __name: "Structure",
  __ssrInlineRender: true,
  setup(__props) {
    const departments = [
      { name: "Financial", image: logoSrc, icon: "💰" },
      { name: "Operating", image: logoSrc, icon: "💼" },
      { name: "Administration", image: logoSrc, icon: "📝" },
      { name: "Production", image: logoSrc, icon: "👨‍🍳" },
      { name: "Marketing Medinfo", image: logoSrc, icon: "💻" },
      { name: "Sales Distribution", image: logoSrc, icon: "📈" },
      { name: "Public Relations", image: logoSrc, icon: "📱" },
      { name: "Human Resources", image: logoSrc, icon: "👥" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Struktur Organisasi - SEEO" }, null, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="relative bg-slate-950 min-h-[calc(100vh-5rem)] flex items-center justify-center border-b border-slate-900 overflow-hidden"${_scopeId}><div class="absolute inset-0 z-0"${_scopeId}><div class="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]"${_scopeId}></div><div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px]"${_scopeId}></div></div><div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center"${_scopeId}><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20"${_scopeId}> Struktur Organisasi </div><h1 class="text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-tight"${_scopeId}> Tim <span class="text-blue-500 italic"${_scopeId}>Departemen</span> SEEO </h1><p class="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"${_scopeId}> Mengenal talenta struktural yang menjadi motor penggerak kompetensi operasional dan pertumbuhan organisasi ekosistem wirausaha. </p><div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20"${_scopeId}><div class="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent"${_scopeId}></div></div></div></section><section class="py-24 bg-slate-50"${_scopeId}><div class="max-w-7xl mx-auto px-6 lg:px-8"${_scopeId}><div class="text-center mb-16"${_scopeId}><h2 class="text-3xl font-bold text-slate-900 mb-4"${_scopeId}>Kepemimpinan Eksekutif</h2><p class="text-lg text-slate-600"${_scopeId}>Visi strategis dan kemudi arah kebijakan organisasi.</p></div><div class="flex justify-center mb-24"${_scopeId}><div class="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300"${_scopeId}><div class="aspect-[4/3] bg-slate-100 relative overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", logoSrc)} alt="CEO &amp; Co-CEO" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"${_scopeId}></div><div class="p-6 text-center"${_scopeId}><div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 mb-4 border border-blue-100"${_scopeId}><span class="text-lg"${_scopeId}>👑</span></div><h3 class="text-xl font-bold text-slate-900 mb-2"${_scopeId}>CEO &amp; Co-CEO</h3><p class="text-slate-600 text-sm leading-relaxed"${_scopeId}>Penanggung jawab utama atas efisiensi, kultur, dan pencapaian target strategis SEEO FT UNSOED.</p></div></div></div><div class="text-center mb-16"${_scopeId}><h2 class="text-3xl font-bold text-slate-900 mb-4"${_scopeId}>Divisi &amp; Departemen</h2><p class="text-lg text-slate-600"${_scopeId}>Pilar pendukung operasional internal maupun ekspansi eksternal.</p></div><div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"${_scopeId}><!--[-->`);
            ssrRenderList(departments, (dept) => {
              _push2(`<div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300"${_scopeId}><div class="aspect-[4/3] bg-slate-100 relative overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", dept.image)}${ssrRenderAttr("alt", dept.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"${_scopeId}></div><div class="p-5 flex-1 flex flex-col items-center text-center"${_scopeId}><div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-700 mb-3 border border-slate-200"${_scopeId}><span class="text-lg"${_scopeId}>${ssrInterpolate(dept.icon)}</span></div><h4 class="text-lg font-bold text-slate-900"${_scopeId}>${ssrInterpolate(dept.name)}</h4></div></div>`);
            });
            _push2(`<!--]--></div></div></section><section class="py-24 bg-white border-t border-slate-200"${_scopeId}><div class="max-w-4xl mx-auto px-6 lg:px-8 text-center"${_scopeId}><h3 class="text-3xl font-bold text-slate-900 mb-6"${_scopeId}>Kekuatan Kolektif Terstruktur</h3><p class="text-lg text-slate-600 mb-12 leading-relaxed"${_scopeId}> Sinkronisasi tata kerja secara vertikal maupun kompartemental guna menjamin kelincahan manuver serta keberlanjutan regenerasi sumber daya berintegritas. </p><div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pt-8 border-t border-slate-100"${_scopeId}><div${_scopeId}><div class="text-4xl font-bold text-blue-600 mb-1"${_scopeId}>1</div><div class="text-sm text-slate-500 font-medium"${_scopeId}>Badan Eksekutif</div></div><div${_scopeId}><div class="text-4xl font-bold text-blue-600 mb-1"${_scopeId}>8</div><div class="text-sm text-slate-500 font-medium"${_scopeId}>Departemen Utama</div></div><div${_scopeId}><div class="text-4xl font-bold text-blue-600 mb-1"${_scopeId}>40+</div><div class="text-sm text-slate-500 font-medium"${_scopeId}>Staf Terverifikasi</div></div><div${_scopeId}><div class="text-4xl font-bold text-blue-600 mb-1"${_scopeId}>100%</div><div class="text-sm text-slate-500 font-medium"${_scopeId}>Sinergi Solid</div></div></div><div class="flex flex-col sm:flex-row gap-4 justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/activity",
              class: "inline-flex justify-center items-center px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 hover:shadow transition-all duration-200"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Laporan Kegiatan `);
                } else {
                  return [
                    createTextVNode(" Laporan Kegiatan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/contact",
              class: "inline-flex justify-center items-center px-6 py-3.5 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors duration-200"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Hubungi Administrasi `);
                } else {
                  return [
                    createTextVNode(" Hubungi Administrasi ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "relative bg-slate-950 min-h-[calc(100vh-5rem)] flex items-center justify-center border-b border-slate-900 overflow-hidden" }, [
                createVNode("div", { class: "absolute inset-0 z-0" }, [
                  createVNode("div", { class: "absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]" }),
                  createVNode("div", { class: "absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px]" })
                ]),
                createVNode("div", { class: "max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center" }, [
                  createVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20" }, " Struktur Organisasi "),
                  createVNode("h1", { class: "text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-tight" }, [
                    createTextVNode(" Tim "),
                    createVNode("span", { class: "text-blue-500 italic" }, "Departemen"),
                    createTextVNode(" SEEO ")
                  ]),
                  createVNode("p", { class: "text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto" }, " Mengenal talenta struktural yang menjadi motor penggerak kompetensi operasional dan pertumbuhan organisasi ekosistem wirausaha. "),
                  createVNode("div", { class: "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20" }, [
                    createVNode("div", { class: "w-px h-16 bg-gradient-to-b from-blue-500 to-transparent" })
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-slate-50" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 lg:px-8" }, [
                  createVNode("div", { class: "text-center mb-16" }, [
                    createVNode("h2", { class: "text-3xl font-bold text-slate-900 mb-4" }, "Kepemimpinan Eksekutif"),
                    createVNode("p", { class: "text-lg text-slate-600" }, "Visi strategis dan kemudi arah kebijakan organisasi.")
                  ]),
                  createVNode("div", { class: "flex justify-center mb-24" }, [
                    createVNode("div", { class: "w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300" }, [
                      createVNode("div", { class: "aspect-[4/3] bg-slate-100 relative overflow-hidden" }, [
                        createVNode("img", {
                          src: logoSrc,
                          alt: "CEO & Co-CEO",
                          class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out",
                          onError: ($event) => $event.target.src = fallbackLogo
                        }, null, 40, ["onError"])
                      ]),
                      createVNode("div", { class: "p-6 text-center" }, [
                        createVNode("div", { class: "inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 mb-4 border border-blue-100" }, [
                          createVNode("span", { class: "text-lg" }, "👑")
                        ]),
                        createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-2" }, "CEO & Co-CEO"),
                        createVNode("p", { class: "text-slate-600 text-sm leading-relaxed" }, "Penanggung jawab utama atas efisiensi, kultur, dan pencapaian target strategis SEEO FT UNSOED.")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "text-center mb-16" }, [
                    createVNode("h2", { class: "text-3xl font-bold text-slate-900 mb-4" }, "Divisi & Departemen"),
                    createVNode("p", { class: "text-lg text-slate-600" }, "Pilar pendukung operasional internal maupun ekspansi eksternal.")
                  ]),
                  createVNode("div", { class: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(departments, (dept) => {
                      return createVNode("div", {
                        key: dept.name,
                        class: "bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300"
                      }, [
                        createVNode("div", { class: "aspect-[4/3] bg-slate-100 relative overflow-hidden" }, [
                          createVNode("img", {
                            src: dept.image,
                            alt: dept.name,
                            class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out",
                            onError: ($event) => $event.target.src = fallbackLogo
                          }, null, 40, ["src", "alt", "onError"])
                        ]),
                        createVNode("div", { class: "p-5 flex-1 flex flex-col items-center text-center" }, [
                          createVNode("div", { class: "inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-700 mb-3 border border-slate-200" }, [
                            createVNode("span", { class: "text-lg" }, toDisplayString(dept.icon), 1)
                          ]),
                          createVNode("h4", { class: "text-lg font-bold text-slate-900" }, toDisplayString(dept.name), 1)
                        ])
                      ]);
                    }), 64))
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-white border-t border-slate-200" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-6 lg:px-8 text-center" }, [
                  createVNode("h3", { class: "text-3xl font-bold text-slate-900 mb-6" }, "Kekuatan Kolektif Terstruktur"),
                  createVNode("p", { class: "text-lg text-slate-600 mb-12 leading-relaxed" }, " Sinkronisasi tata kerja secara vertikal maupun kompartemental guna menjamin kelincahan manuver serta keberlanjutan regenerasi sumber daya berintegritas. "),
                  createVNode("div", { class: "grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pt-8 border-t border-slate-100" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "text-4xl font-bold text-blue-600 mb-1" }, "1"),
                      createVNode("div", { class: "text-sm text-slate-500 font-medium" }, "Badan Eksekutif")
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "text-4xl font-bold text-blue-600 mb-1" }, "8"),
                      createVNode("div", { class: "text-sm text-slate-500 font-medium" }, "Departemen Utama")
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "text-4xl font-bold text-blue-600 mb-1" }, "40+"),
                      createVNode("div", { class: "text-sm text-slate-500 font-medium" }, "Staf Terverifikasi")
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "text-4xl font-bold text-blue-600 mb-1" }, "100%"),
                      createVNode("div", { class: "text-sm text-slate-500 font-medium" }, "Sinergi Solid")
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-col sm:flex-row gap-4 justify-center" }, [
                    createVNode(unref(Link), {
                      href: "/activity",
                      class: "inline-flex justify-center items-center px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 hover:shadow transition-all duration-200"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Laporan Kegiatan ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Link), {
                      href: "/contact",
                      class: "inline-flex justify-center items-center px-6 py-3.5 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors duration-200"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Hubungi Administrasi ")
                      ]),
                      _: 1
                    })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Structure.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Structure-Bt6suCEv.js.map
