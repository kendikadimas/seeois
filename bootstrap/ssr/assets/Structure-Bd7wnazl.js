import { resolveComponent, unref, withCtx, createVNode, createBlock, openBlock, createTextVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-DgOkSIG5.js";
import { Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const logoSrc = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
const _sfc_main = {
  __name: "Structure",
  __ssrInlineRender: true,
  setup(__props) {
    const departments = [
      { name: "CEO & Co-CEO", image: logoSrc, icon: "👑" },
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
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Struktur Organisasi - SEEO" }, null, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"${_scopeId}><div class="absolute inset-0"${_scopeId}><div class="absolute top-1/4 left-1/6 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30"${_scopeId}></div><div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-slate-100 rounded-full blur-3xl opacity-30"${_scopeId}></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20"${_scopeId}></div></div><div class="absolute inset-0 opacity-[0.02]" style="${ssrRenderStyle({ "background-image": "radial-gradient(circle, #1e293b 1px, transparent 1px)", "background-size": "50px 50px" })}"${_scopeId}></div><div class="relative z-10 max-w-6xl mx-auto px-6 text-center"${_scopeId}><div class="space-y-8"${_scopeId}><div class="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"${_scopeId}><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v4h8v-4zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"${_scopeId}></path></svg><span class="font-medium"${_scopeId}>Struktur Organisasi</span></div><div${_scopeId}><h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 leading-tight"${_scopeId}><span class="block"${_scopeId}>Tim</span><span class="block text-blue-600"${_scopeId}>Departemen</span><span class="block text-slate-900"${_scopeId}>SEEO</span></h1><p class="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed"${_scopeId}> Mengenal talenta-talenta terbaik yang menjadi motor penggerak inovasi dan pertumbuhan organisasi </p></div></div></div><div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 animate-bounce"${_scopeId}><div class="flex flex-col items-center"${_scopeId}><span class="text-sm font-medium mb-2"${_scopeId}>Jelajahi Tim Kami</span><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"${_scopeId}></path></svg></div></div></section><section class="relative py-32 overflow-hidden"${_scopeId}><div class="absolute inset-0 bg-slate-50"${_scopeId}><div class="absolute inset-0 opacity-[0.02]" style="${ssrRenderStyle({ "background-image": "radial-gradient(circle, #1e293b 1px, transparent 1px)", "background-size": "30px 30px" })}"${_scopeId}></div></div><div class="relative z-10 max-w-7xl mx-auto px-6"${_scopeId}><div class="text-center mb-20"${_scopeId}><div class="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-6"${_scopeId}><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> Kekuatan Tim </div><h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"${_scopeId}> Setiap Departemen, <span class="block text-blue-600"${_scopeId}>Setiap Keahlian</span></h2><p class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"${_scopeId}> Kolaborasi harmonis dari berbagai expertise untuk mencapai visi bersama </p></div><div class="mb-24"${_scopeId}><h3 class="text-2xl font-bold text-slate-900 text-center mb-12"${_scopeId}>Kepemimpinan</h3><div class="flex justify-center"${_scopeId}><div class="group relative max-w-md"${_scopeId}><div class="relative overflow-hidden rounded-3xl bg-blue-600 p-1 hover:scale-105 transition-all duration-500"${_scopeId}><div class="relative h-80 rounded-3xl overflow-hidden bg-white"${_scopeId}><img${ssrRenderAttr("src", logoSrc)} alt="CEO &amp; Co-CEO" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"${_scopeId}></div><div class="absolute -top-4 left-6 bg-blue-600 rounded-2xl p-4 shadow-xl border-4 border-white"${_scopeId}><svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"${_scopeId}></path></svg></div><div class="absolute bottom-0 left-0 right-0 p-6 text-white"${_scopeId}><h4 class="text-2xl font-bold mb-2"${_scopeId}>CEO &amp; Co-CEO</h4><p class="text-white/80 text-sm"${_scopeId}>Kepemimpinan strategis dan visi organisasi</p></div><div class="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"${_scopeId}><div class="text-center text-white"${_scopeId}><svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"${_scopeId}></path></svg><p class="font-semibold"${_scopeId}>Visioner</p></div></div></div></div></div></div></div><div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"${_scopeId}><!--[-->`);
            ssrRenderList(departments, (dept) => {
              _push2(`<div class="group relative"${_scopeId}><div class="relative overflow-hidden rounded-3xl bg-blue-600 p-1 hover:scale-105 transition-all duration-500"${_scopeId}><div class="relative h-72 rounded-3xl overflow-hidden bg-white"${_scopeId}><img${ssrRenderAttr("src", dept.image)}${ssrRenderAttr("alt", dept.name)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"${_scopeId}></div><div class="absolute -top-4 left-6 bg-blue-600 rounded-2xl p-3 shadow-xl border-4 border-white"${_scopeId}><span class="text-white text-xl"${_scopeId}>${ssrInterpolate(dept.icon)}</span></div><div class="absolute bottom-0 left-0 right-0 p-6 text-white"${_scopeId}><h4 class="text-xl font-bold mb-1"${_scopeId}>${ssrInterpolate(dept.name)}</h4><p class="text-white/80 text-xs"${_scopeId}>Departemen ${ssrInterpolate(dept.name)}</p></div></div></div></div>`);
            });
            _push2(`<!--]--></div><div class="mt-32 text-center"${_scopeId}><div class="bg-slate-900 rounded-3xl p-16 text-white"${_scopeId}><h3 class="text-3xl md:text-4xl font-bold mb-8"${_scopeId}>Kekuatan Kolektif</h3><p class="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"${_scopeId}> Setiap departemen berkontribusi dengan keahlian unik mereka untuk menciptakan sinergi yang luar biasa dalam mencapai visi SEEO </p><div class="grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"${_scopeId}><div class="text-center"${_scopeId}><div class="text-4xl font-bold text-blue-400 mb-2"${_scopeId}>9</div><div class="text-slate-400"${_scopeId}>Departemen</div></div><div class="text-center"${_scopeId}><div class="text-4xl font-bold text-blue-400 mb-2"${_scopeId}>100+</div><div class="text-slate-400"${_scopeId}>Anggota</div></div><div class="text-center"${_scopeId}><div class="text-4xl font-bold text-blue-400 mb-2"${_scopeId}>1</div><div class="text-slate-400"${_scopeId}>Visi Bersama</div></div></div><div class="flex flex-col sm:flex-row gap-4 justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: "/activity",
              class: "inline-flex items-center px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Lihat Kegiatan Tim</span><svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createVNode("span", null, "Lihat Kegiatan Tim"),
                    (openBlock(), createBlock("svg", {
                      class: "ml-2 w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M17 8l4 4m0 0l-4 4m4-4H3"
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Link, {
              href: "/contact",
              class: "inline-flex items-center px-8 py-4 rounded-2xl border-2 border-white text-white font-bold hover:bg-white hover:text-slate-900 transition-all duration-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Bergabung dengan Kami</span><svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createVNode("span", null, "Bergabung dengan Kami"),
                    (openBlock(), createBlock("svg", {
                      class: "ml-2 w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M17 8l4 4m0 0l-4 4m4-4H3"
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "relative min-h-screen flex items-center justify-center overflow-hidden bg-white" }, [
                createVNode("div", { class: "absolute inset-0" }, [
                  createVNode("div", { class: "absolute top-1/4 left-1/6 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30" }),
                  createVNode("div", { class: "absolute bottom-1/4 right-1/6 w-80 h-80 bg-slate-100 rounded-full blur-3xl opacity-30" }),
                  createVNode("div", { class: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20" })
                ]),
                createVNode("div", {
                  class: "absolute inset-0 opacity-[0.02]",
                  style: { "background-image": "radial-gradient(circle, #1e293b 1px, transparent 1px)", "background-size": "50px 50px" }
                }),
                createVNode("div", { class: "relative z-10 max-w-6xl mx-auto px-6 text-center" }, [
                  createVNode("div", { class: "space-y-8" }, [
                    createVNode("div", { class: "inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 mr-2",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", { d: "M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v4h8v-4zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" })
                      ])),
                      createVNode("span", { class: "font-medium" }, "Struktur Organisasi")
                    ]),
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 leading-tight" }, [
                        createVNode("span", { class: "block" }, "Tim"),
                        createVNode("span", { class: "block text-blue-600" }, "Departemen"),
                        createVNode("span", { class: "block text-slate-900" }, "SEEO")
                      ]),
                      createVNode("p", { class: "text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed" }, " Mengenal talenta-talenta terbaik yang menjadi motor penggerak inovasi dan pertumbuhan organisasi ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 animate-bounce" }, [
                  createVNode("div", { class: "flex flex-col items-center" }, [
                    createVNode("span", { class: "text-sm font-medium mb-2" }, "Jelajahi Tim Kami"),
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
                        d: "M19 14l-7 7m0 0l-7-7m7 7V3"
                      })
                    ]))
                  ])
                ])
              ]),
              createVNode("section", { class: "relative py-32 overflow-hidden" }, [
                createVNode("div", { class: "absolute inset-0 bg-slate-50" }, [
                  createVNode("div", {
                    class: "absolute inset-0 opacity-[0.02]",
                    style: { "background-image": "radial-gradient(circle, #1e293b 1px, transparent 1px)", "background-size": "30px 30px" }
                  })
                ]),
                createVNode("div", { class: "relative z-10 max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "text-center mb-20" }, [
                    createVNode("div", { class: "inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-6" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 mr-2",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
                      ])),
                      createTextVNode(" Kekuatan Tim ")
                    ]),
                    createVNode("h2", { class: "text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6" }, [
                      createTextVNode(" Setiap Departemen, "),
                      createVNode("span", { class: "block text-blue-600" }, "Setiap Keahlian")
                    ]),
                    createVNode("p", { class: "text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed" }, " Kolaborasi harmonis dari berbagai expertise untuk mencapai visi bersama ")
                  ]),
                  createVNode("div", { class: "mb-24" }, [
                    createVNode("h3", { class: "text-2xl font-bold text-slate-900 text-center mb-12" }, "Kepemimpinan"),
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode("div", { class: "group relative max-w-md" }, [
                        createVNode("div", { class: "relative overflow-hidden rounded-3xl bg-blue-600 p-1 hover:scale-105 transition-all duration-500" }, [
                          createVNode("div", { class: "relative h-80 rounded-3xl overflow-hidden bg-white" }, [
                            createVNode("img", {
                              src: logoSrc,
                              alt: "CEO & Co-CEO",
                              class: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            }),
                            createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" }),
                            createVNode("div", { class: "absolute -top-4 left-6 bg-blue-600 rounded-2xl p-4 shadow-xl border-4 border-white" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-8 h-8 text-white",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                })
                              ]))
                            ]),
                            createVNode("div", { class: "absolute bottom-0 left-0 right-0 p-6 text-white" }, [
                              createVNode("h4", { class: "text-2xl font-bold mb-2" }, "CEO & Co-CEO"),
                              createVNode("p", { class: "text-white/80 text-sm" }, "Kepemimpinan strategis dan visi organisasi")
                            ]),
                            createVNode("div", { class: "absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center" }, [
                              createVNode("div", { class: "text-center text-white" }, [
                                (openBlock(), createBlock("svg", {
                                  class: "w-12 h-12 mx-auto mb-2",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M13 10V3L4 14h7v7l9-11h-7z"
                                  })
                                ])),
                                createVNode("p", { class: "font-semibold" }, "Visioner")
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(departments, (dept) => {
                      return createVNode("div", {
                        key: dept.name,
                        class: "group relative"
                      }, [
                        createVNode("div", { class: "relative overflow-hidden rounded-3xl bg-blue-600 p-1 hover:scale-105 transition-all duration-500" }, [
                          createVNode("div", { class: "relative h-72 rounded-3xl overflow-hidden bg-white" }, [
                            createVNode("img", {
                              src: dept.image,
                              alt: dept.name,
                              class: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            }, null, 8, ["src", "alt"]),
                            createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" }),
                            createVNode("div", { class: "absolute -top-4 left-6 bg-blue-600 rounded-2xl p-3 shadow-xl border-4 border-white" }, [
                              createVNode("span", { class: "text-white text-xl" }, toDisplayString(dept.icon), 1)
                            ]),
                            createVNode("div", { class: "absolute bottom-0 left-0 right-0 p-6 text-white" }, [
                              createVNode("h4", { class: "text-xl font-bold mb-1" }, toDisplayString(dept.name), 1),
                              createVNode("p", { class: "text-white/80 text-xs" }, "Departemen " + toDisplayString(dept.name), 1)
                            ])
                          ])
                        ])
                      ]);
                    }), 64))
                  ]),
                  createVNode("div", { class: "mt-32 text-center" }, [
                    createVNode("div", { class: "bg-slate-900 rounded-3xl p-16 text-white" }, [
                      createVNode("h3", { class: "text-3xl md:text-4xl font-bold mb-8" }, "Kekuatan Kolektif"),
                      createVNode("p", { class: "text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed" }, " Setiap departemen berkontribusi dengan keahlian unik mereka untuk menciptakan sinergi yang luar biasa dalam mencapai visi SEEO "),
                      createVNode("div", { class: "grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto mb-12" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-4xl font-bold text-blue-400 mb-2" }, "9"),
                          createVNode("div", { class: "text-slate-400" }, "Departemen")
                        ]),
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-4xl font-bold text-blue-400 mb-2" }, "100+"),
                          createVNode("div", { class: "text-slate-400" }, "Anggota")
                        ]),
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-4xl font-bold text-blue-400 mb-2" }, "1"),
                          createVNode("div", { class: "text-slate-400" }, "Visi Bersama")
                        ])
                      ]),
                      createVNode("div", { class: "flex flex-col sm:flex-row gap-4 justify-center" }, [
                        createVNode(_component_Link, {
                          href: "/activity",
                          class: "inline-flex items-center px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "Lihat Kegiatan Tim"),
                            (openBlock(), createBlock("svg", {
                              class: "ml-2 w-5 h-5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M17 8l4 4m0 0l-4 4m4-4H3"
                              })
                            ]))
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Link, {
                          href: "/contact",
                          class: "inline-flex items-center px-8 py-4 rounded-2xl border-2 border-white text-white font-bold hover:bg-white hover:text-slate-900 transition-all duration-300"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "Bergabung dengan Kami"),
                            (openBlock(), createBlock("svg", {
                              class: "ml-2 w-5 h-5",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M17 8l4 4m0 0l-4 4m4-4H3"
                              })
                            ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Structure.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Structure-Bd7wnazl.js.map
