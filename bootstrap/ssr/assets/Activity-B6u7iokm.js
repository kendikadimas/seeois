import { ref, computed, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-1sZl-0H2.js";
import { Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Activity",
  __ssrInlineRender: true,
  props: {
    activities: { type: Array, default: () => [] },
    categories: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const selectedCategory = ref("SEMUA");
    const filteredActivities = computed(() => {
      if (selectedCategory.value === "SEMUA") return props.activities;
      return props.activities.filter((act) => act.category === selectedCategory.value);
    });
    function formatDate(dateStr) {
      if (!dateStr) return "-";
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Blog &amp; Berita - SEEO UNSOED</title><meta name="description" content="Kumpulan berita, kegiatan, dan artikel terbaru seputar dunia kewirausahaan dan teknologi dari SEEO FT UNSOED. Tetap update dengan inovasi mahasiswa teknik."${_scopeId}><meta name="keywords" content="organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, berita seeo"${_scopeId}><meta property="og:title" content="SEEO Blog - Berita &amp; Kegiatan Terbaru"${_scopeId}><meta property="og:description" content="Update terbaru kegiatan dan inovasi dari SEEO FT UNSOED."${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Blog & Berita - SEEO UNSOED"),
              createVNode("meta", {
                name: "description",
                content: "Kumpulan berita, kegiatan, dan artikel terbaru seputar dunia kewirausahaan dan teknologi dari SEEO FT UNSOED. Tetap update dengan inovasi mahasiswa teknik."
              }),
              createVNode("meta", {
                name: "keywords",
                content: "organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, berita seeo"
              }),
              createVNode("meta", {
                property: "og:title",
                content: "SEEO Blog - Berita & Kegiatan Terbaru"
              }),
              createVNode("meta", {
                property: "og:description",
                content: "Update terbaru kegiatan dan inovasi dari SEEO FT UNSOED."
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="pt-28 pb-10 bg-white"${_scopeId}><div class="max-w-7xl mx-auto px-6"${_scopeId}><h1 class="text-6xl md:text-8xl font-black text-[#004182] mb-10 tracking-tight uppercase"${_scopeId}> SEEO <span class="text-[#FFD700]"${_scopeId}>Blog</span></h1><div class="flex flex-wrap gap-4 border-b border-gray-100 pb-6"${_scopeId}><button class="${ssrRenderClass([selectedCategory.value === "SEMUA" ? "bg-[#004182] text-white shadow-xl" : "bg-gray-50 text-gray-400 hover:bg-[#FFD700]/10 hover:text-[#004182] border-transparent hover:border-[#FFD700]/20", "px-8 py-3 rounded-full font-bold text-sm transition-all border"])}"${_scopeId}>SEMUA</button><!--[-->`);
            ssrRenderList(__props.categories, (cat) => {
              _push2(`<button class="${ssrRenderClass([selectedCategory.value === cat ? "bg-[#004182] text-white shadow-xl" : "bg-gray-50 text-gray-400 hover:bg-[#FFD700]/10 hover:text-[#004182] border-transparent hover:border-[#FFD700]/20", "px-8 py-3 rounded-full font-bold text-sm transition-all border uppercase"])}"${_scopeId}>${ssrInterpolate(cat)}</button>`);
            });
            _push2(`<!--]--></div></div></section><section class="pb-20 bg-white"${_scopeId}><div class="max-w-7xl mx-auto px-6"${_scopeId}>`);
            if (filteredActivities.value && filteredActivities.value.length) {
              _push2(`<div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-10"${_scopeId}><!--[-->`);
              ssrRenderList(filteredActivities.value, (act) => {
                _push2(`<div class="group flex flex-col transition-all duration-500 overflow-hidden relative"${_scopeId}><div class="relative aspect-[16/10] md:aspect-[16/10] overflow-hidden rounded-xl md:rounded-[2.5rem] mb-3 md:mb-0"${_scopeId}><img${ssrRenderAttr("src", act.image_url || "/images/placeholder.jpg")} class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-[#004182]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"${_scopeId}></div><div class="hidden md:block absolute top-6 left-6 z-10"${_scopeId}><span class="px-5 py-2 bg-[#FFD700] text-[#004182] rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl"${_scopeId}>${ssrInterpolate(act.category || "NEWS")}</span></div></div><div class="md:p-8 lg:p-10 flex flex-col flex-1"${_scopeId}><div class="md:hidden text-[#f97316] font-bold text-[11px] mb-1"${_scopeId}>${ssrInterpolate(act.category || "SEEO News")}</div><div class="hidden md:flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><i class="bi bi-calendar3 text-[#FFD700]"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(formatDate(act.date))}</span></div><span class="w-1 h-1 rounded-full bg-gray-200"${_scopeId}></span><div class="flex items-center gap-2"${_scopeId}><i class="bi bi-person text-[#FFD700]"${_scopeId}></i><span${_scopeId}>ADMIN</span></div></div><h3 class="text-[14px] md:text-2xl font-bold md:font-black text-gray-900 md:text-[#004182] mb-2 md:mb-4 leading-snug md:leading-tight group-hover:text-[#f97316] md:group-hover:text-[#FFD700] transition-colors line-clamp-3 md:uppercase tracking-tight"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/activity/${act.slug}`,
                  class: "after:absolute after:inset-0 after:z-20"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(act.title)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(act.title), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</h3><div class="hidden md:block text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium opacity-80"${_scopeId}>${act.description ?? ""}</div><div class="mt-auto hidden md:block"${_scopeId}><div class="inline-flex items-center gap-3 font-black text-[11px] text-[#004182] uppercase tracking-[0.2em] group/btn transition-all"${_scopeId}><span class="relative"${_scopeId}> Read Article <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover/btn:w-full"${_scopeId}></span></span><i class="bi bi-arrow-right text-[#FFD700] group-hover/btn:translate-x-2 transition-transform"${_scopeId}></i></div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-40 bg-gray-50/50 rounded-[4rem] border-2 border-dashed border-gray-100"${_scopeId}><div class="mb-8 opacity-20"${_scopeId}><i class="bi bi-journal-x text-9xl text-[#004182]"${_scopeId}></i></div><h3 class="text-2xl font-black text-[#004182] uppercase tracking-widest"${_scopeId}>Belum Ada Artikel</h3><p class="text-gray-400 font-medium mt-2"${_scopeId}>Nantikan update terbaru dari kami segera!</p></div>`);
            }
            _push2(`</div></section>`);
          } else {
            return [
              createVNode("section", { class: "pt-28 pb-10 bg-white" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6" }, [
                  createVNode("h1", { class: "text-6xl md:text-8xl font-black text-[#004182] mb-10 tracking-tight uppercase" }, [
                    createTextVNode(" SEEO "),
                    createVNode("span", { class: "text-[#FFD700]" }, "Blog")
                  ]),
                  createVNode("div", { class: "flex flex-wrap gap-4 border-b border-gray-100 pb-6" }, [
                    createVNode("button", {
                      onClick: ($event) => selectedCategory.value = "SEMUA",
                      class: [selectedCategory.value === "SEMUA" ? "bg-[#004182] text-white shadow-xl" : "bg-gray-50 text-gray-400 hover:bg-[#FFD700]/10 hover:text-[#004182] border-transparent hover:border-[#FFD700]/20", "px-8 py-3 rounded-full font-bold text-sm transition-all border"]
                    }, "SEMUA", 10, ["onClick"]),
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (cat) => {
                      return openBlock(), createBlock("button", {
                        key: cat,
                        onClick: ($event) => selectedCategory.value = cat,
                        class: [selectedCategory.value === cat ? "bg-[#004182] text-white shadow-xl" : "bg-gray-50 text-gray-400 hover:bg-[#FFD700]/10 hover:text-[#004182] border-transparent hover:border-[#FFD700]/20", "px-8 py-3 rounded-full font-bold text-sm transition-all border uppercase"]
                      }, toDisplayString(cat), 11, ["onClick"]);
                    }), 128))
                  ])
                ])
              ]),
              createVNode("section", { class: "pb-20 bg-white" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6" }, [
                  filteredActivities.value && filteredActivities.value.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-10"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredActivities.value, (act) => {
                      return openBlock(), createBlock("div", {
                        key: act.id,
                        class: "group flex flex-col transition-all duration-500 overflow-hidden relative"
                      }, [
                        createVNode("div", { class: "relative aspect-[16/10] md:aspect-[16/10] overflow-hidden rounded-xl md:rounded-[2.5rem] mb-3 md:mb-0" }, [
                          createVNode("img", {
                            src: act.image_url || "/images/placeholder.jpg",
                            class: "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          }, null, 8, ["src"]),
                          createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-[#004182]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
                          createVNode("div", { class: "hidden md:block absolute top-6 left-6 z-10" }, [
                            createVNode("span", { class: "px-5 py-2 bg-[#FFD700] text-[#004182] rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl" }, toDisplayString(act.category || "NEWS"), 1)
                          ])
                        ]),
                        createVNode("div", { class: "md:p-8 lg:p-10 flex flex-col flex-1" }, [
                          createVNode("div", { class: "md:hidden text-[#f97316] font-bold text-[11px] mb-1" }, toDisplayString(act.category || "SEEO News"), 1),
                          createVNode("div", { class: "hidden md:flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6" }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("i", { class: "bi bi-calendar3 text-[#FFD700]" }),
                              createVNode("span", null, toDisplayString(formatDate(act.date)), 1)
                            ]),
                            createVNode("span", { class: "w-1 h-1 rounded-full bg-gray-200" }),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("i", { class: "bi bi-person text-[#FFD700]" }),
                              createVNode("span", null, "ADMIN")
                            ])
                          ]),
                          createVNode("h3", { class: "text-[14px] md:text-2xl font-bold md:font-black text-gray-900 md:text-[#004182] mb-2 md:mb-4 leading-snug md:leading-tight group-hover:text-[#f97316] md:group-hover:text-[#FFD700] transition-colors line-clamp-3 md:uppercase tracking-tight" }, [
                            createVNode(unref(Link), {
                              href: `/activity/${act.slug}`,
                              class: "after:absolute after:inset-0 after:z-20"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(act.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ]),
                          createVNode("div", {
                            class: "hidden md:block text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium opacity-80",
                            innerHTML: act.description
                          }, null, 8, ["innerHTML"]),
                          createVNode("div", { class: "mt-auto hidden md:block" }, [
                            createVNode("div", { class: "inline-flex items-center gap-3 font-black text-[11px] text-[#004182] uppercase tracking-[0.2em] group/btn transition-all" }, [
                              createVNode("span", { class: "relative" }, [
                                createTextVNode(" Read Article "),
                                createVNode("span", { class: "absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover/btn:w-full" })
                              ]),
                              createVNode("i", { class: "bi bi-arrow-right text-[#FFD700] group-hover/btn:translate-x-2 transition-transform" })
                            ])
                          ])
                        ])
                      ]);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-40 bg-gray-50/50 rounded-[4rem] border-2 border-dashed border-gray-100"
                  }, [
                    createVNode("div", { class: "mb-8 opacity-20" }, [
                      createVNode("i", { class: "bi bi-journal-x text-9xl text-[#004182]" })
                    ]),
                    createVNode("h3", { class: "text-2xl font-black text-[#004182] uppercase tracking-widest" }, "Belum Ada Artikel"),
                    createVNode("p", { class: "text-gray-400 font-medium mt-2" }, "Nantikan update terbaru dari kami segera!")
                  ]))
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
//# sourceMappingURL=Activity-B6u7iokm.js.map
