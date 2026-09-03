import { unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-1sZl-0H2.js";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ActivityDetail",
  __ssrInlineRender: true,
  props: {
    activity: { type: Object, required: true }
  },
  setup(__props) {
    function formatDate(dateStr) {
      if (!dateStr) return "-";
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }
    function openImage(url) {
      window.open(url, "_blank");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-c9f01e4a${_scopeId}>${ssrInterpolate(__props.activity.title)} - SEEO FT UNSOED</title><meta name="description"${ssrRenderAttr("content", __props.activity.description.substring(0, 160).replace(/<[^>]*>?/gm, ""))} data-v-c9f01e4a${_scopeId}><meta name="keywords"${ssrRenderAttr("content", "organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, " + __props.activity.category)} data-v-c9f01e4a${_scopeId}><meta property="og:title"${ssrRenderAttr("content", __props.activity.title)} data-v-c9f01e4a${_scopeId}><meta property="og:description"${ssrRenderAttr("content", __props.activity.description.substring(0, 160).replace(/<[^>]*>?/gm, ""))} data-v-c9f01e4a${_scopeId}><meta property="og:image"${ssrRenderAttr("content", __props.activity.image_url)} data-v-c9f01e4a${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(__props.activity.title) + " - SEEO FT UNSOED", 1),
              createVNode("meta", {
                name: "description",
                content: __props.activity.description.substring(0, 160).replace(/<[^>]*>?/gm, "")
              }, null, 8, ["content"]),
              createVNode("meta", {
                name: "keywords",
                content: "organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, " + __props.activity.category
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:title",
                content: __props.activity.title
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:description",
                content: __props.activity.description.substring(0, 160).replace(/<[^>]*>?/gm, "")
              }, null, 8, ["content"]),
              createVNode("meta", {
                property: "og:image",
                content: __props.activity.image_url
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<header class="pt-32 pb-16 bg-white" data-v-c9f01e4a${_scopeId}><div class="max-w-4xl mx-auto px-6" data-v-c9f01e4a${_scopeId}><nav class="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-12" data-v-c9f01e4a${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/",
              class: "hover:text-[#004182] transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`HOME`);
                } else {
                  return [
                    createTextVNode("HOME")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<i class="bi bi-chevron-right text-[8px]" data-v-c9f01e4a${_scopeId}></i>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/activity",
              class: "hover:text-[#004182] transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`BLOG`);
                } else {
                  return [
                    createTextVNode("BLOG")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<i class="bi bi-chevron-right text-[8px]" data-v-c9f01e4a${_scopeId}></i><span class="text-[#FFD700] truncate max-w-[200px]" data-v-c9f01e4a${_scopeId}>${ssrInterpolate(__props.activity.title)}</span></nav><div class="inline-block px-5 py-2 bg-[#FFD700] text-[#004182] rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg mb-8" data-v-c9f01e4a${_scopeId}>${ssrInterpolate(__props.activity.category || "NEWS")}</div><h1 class="text-4xl md:text-6xl font-black text-[#004182] mb-8 leading-tight tracking-tight uppercase" data-v-c9f01e4a${_scopeId}>${ssrInterpolate(__props.activity.title)}</h1><div class="flex items-center gap-6 border-y border-gray-100 py-6" data-v-c9f01e4a${_scopeId}><div class="flex items-center gap-3" data-v-c9f01e4a${_scopeId}><div class="w-12 h-12 bg-[#004182] rounded-full flex items-center justify-center text-[#FFD700]" data-v-c9f01e4a${_scopeId}><i class="bi bi-person-fill text-xl" data-v-c9f01e4a${_scopeId}></i></div><div data-v-c9f01e4a${_scopeId}><p class="text-[10px] font-black text-gray-400 uppercase tracking-widest" data-v-c9f01e4a${_scopeId}>PUBLISHED BY</p><p class="text-sm font-black text-[#004182]" data-v-c9f01e4a${_scopeId}>ADMIN SEEO</p></div></div><div class="h-10 w-px bg-gray-100" data-v-c9f01e4a${_scopeId}></div><div data-v-c9f01e4a${_scopeId}><p class="text-[10px] font-black text-gray-400 uppercase tracking-widest" data-v-c9f01e4a${_scopeId}>DATE</p><p class="text-sm font-black text-[#004182] uppercase" data-v-c9f01e4a${_scopeId}>${ssrInterpolate(formatDate(__props.activity.date))}</p></div></div></div></header>`);
            if (__props.activity.image_url) {
              _push2(`<section class="bg-white" data-v-c9f01e4a${_scopeId}><div class="max-w-4xl mx-auto px-6" data-v-c9f01e4a${_scopeId}><div class="relative aspect-[16/7] md:h-[400px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,65,130,0.15)] border border-gray-50" data-v-c9f01e4a${_scopeId}><img${ssrRenderAttr("src", __props.activity.image_url)}${ssrRenderAttr("alt", __props.activity.title)} class="w-full h-full object-cover" data-v-c9f01e4a${_scopeId}></div></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<article class="py-24 bg-white" data-v-c9f01e4a${_scopeId}><div class="max-w-4xl mx-auto px-6" data-v-c9f01e4a${_scopeId}><div class="prose prose-xl prose-slate max-w-none break-words prose-headings:text-[#004182] prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-p:text-gray-600 prose-p:leading-[2] prose-p:font-medium prose-strong:text-[#004182] prose-strong:font-black prose-a:text-[#FFD700] prose-a:font-black prose-a:no-underline hover:prose-a:text-[#004182] prose-img:rounded-[2rem] prose-img:shadow-2xl" data-v-c9f01e4a${_scopeId}>${__props.activity.description ?? ""}</div>`);
            if (__props.activity.gallery_urls && __props.activity.gallery_urls.length) {
              _push2(`<div class="mt-32" data-v-c9f01e4a${_scopeId}><div class="text-center mb-16" data-v-c9f01e4a${_scopeId}><h2 class="text-3xl font-black text-[#004182] uppercase tracking-tight mb-4" data-v-c9f01e4a${_scopeId}>Galeri Dokumentasi</h2><div class="w-20 h-1.5 bg-[#FFD700] mx-auto" data-v-c9f01e4a${_scopeId}></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-8" data-v-c9f01e4a${_scopeId}><!--[-->`);
              ssrRenderList(__props.activity.gallery_urls, (img, idx) => {
                _push2(`<div class="group relative aspect-square rounded-[2rem] overflow-hidden shadow-xl border border-gray-50 cursor-pointer" data-v-c9f01e4a${_scopeId}><img${ssrRenderAttr("src", img)} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-v-c9f01e4a${_scopeId}><div class="absolute inset-0 bg-[#004182]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" data-v-c9f01e4a${_scopeId}><i class="bi bi-zoom-in text-white text-4xl" data-v-c9f01e4a${_scopeId}></i></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-32 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8" data-v-c9f01e4a${_scopeId}><div class="flex items-center gap-4" data-v-c9f01e4a${_scopeId}><span class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]" data-v-c9f01e4a${_scopeId}>SHARE THIS</span><div class="flex gap-3" data-v-c9f01e4a${_scopeId}><button class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#004182] hover:bg-[#004182] hover:text-white transition-all" data-v-c9f01e4a${_scopeId}><i class="bi bi-facebook" data-v-c9f01e4a${_scopeId}></i></button><button class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#004182] hover:bg-[#004182] hover:text-white transition-all" data-v-c9f01e4a${_scopeId}><i class="bi bi-twitter-x" data-v-c9f01e4a${_scopeId}></i></button><button class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#004182] hover:bg-[#004182] hover:text-white transition-all" data-v-c9f01e4a${_scopeId}><i class="bi bi-whatsapp" data-v-c9f01e4a${_scopeId}></i></button><button class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#004182] hover:bg-[#004182] hover:text-white transition-all" data-v-c9f01e4a${_scopeId}><i class="bi bi-link-45deg" data-v-c9f01e4a${_scopeId}></i></button></div></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/activity",
              class: "inline-flex items-center gap-3 font-black text-[11px] text-[#004182] border-b-2 border-[#FFD700] pb-1 hover:gap-6 transition-all uppercase tracking-widest"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` KEMBALI KE BLOG <i class="bi bi-arrow-left order-first" data-v-c9f01e4a${_scopeId2}></i>`);
                } else {
                  return [
                    createTextVNode(" KEMBALI KE BLOG "),
                    createVNode("i", { class: "bi bi-arrow-left order-first" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></article><section class="py-32 bg-[#f8f9fa]" data-v-c9f01e4a${_scopeId}><div class="max-w-7xl mx-auto px-6 text-center" data-v-c9f01e4a${_scopeId}><h2 class="text-3xl font-black text-[#004182] uppercase tracking-tight mb-4" data-v-c9f01e4a${_scopeId}>Ingin Berkolaborasi?</h2><p class="text-gray-500 font-medium mb-10" data-v-c9f01e4a${_scopeId}>Hubungi kami untuk informasi kemitraan atau peliputan kegiatan.</p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/contact",
              class: "bg-[#004182] text-white px-12 py-4 rounded-full font-black shadow-2xl hover:bg-[#FFD700] hover:text-[#004182] transition-all uppercase tracking-widest text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`CONTACT US`);
                } else {
                  return [
                    createTextVNode("CONTACT US")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></section>`);
          } else {
            return [
              createVNode("header", { class: "pt-32 pb-16 bg-white" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-6" }, [
                  createVNode("nav", { class: "flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-12" }, [
                    createVNode(unref(Link), {
                      href: "/",
                      class: "hover:text-[#004182] transition-colors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("HOME")
                      ]),
                      _: 1
                    }),
                    createVNode("i", { class: "bi bi-chevron-right text-[8px]" }),
                    createVNode(unref(Link), {
                      href: "/activity",
                      class: "hover:text-[#004182] transition-colors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("BLOG")
                      ]),
                      _: 1
                    }),
                    createVNode("i", { class: "bi bi-chevron-right text-[8px]" }),
                    createVNode("span", { class: "text-[#FFD700] truncate max-w-[200px]" }, toDisplayString(__props.activity.title), 1)
                  ]),
                  createVNode("div", { class: "inline-block px-5 py-2 bg-[#FFD700] text-[#004182] rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg mb-8" }, toDisplayString(__props.activity.category || "NEWS"), 1),
                  createVNode("h1", { class: "text-4xl md:text-6xl font-black text-[#004182] mb-8 leading-tight tracking-tight uppercase" }, toDisplayString(__props.activity.title), 1),
                  createVNode("div", { class: "flex items-center gap-6 border-y border-gray-100 py-6" }, [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode("div", { class: "w-12 h-12 bg-[#004182] rounded-full flex items-center justify-center text-[#FFD700]" }, [
                        createVNode("i", { class: "bi bi-person-fill text-xl" })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-[10px] font-black text-gray-400 uppercase tracking-widest" }, "PUBLISHED BY"),
                        createVNode("p", { class: "text-sm font-black text-[#004182]" }, "ADMIN SEEO")
                      ])
                    ]),
                    createVNode("div", { class: "h-10 w-px bg-gray-100" }),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-[10px] font-black text-gray-400 uppercase tracking-widest" }, "DATE"),
                      createVNode("p", { class: "text-sm font-black text-[#004182] uppercase" }, toDisplayString(formatDate(__props.activity.date)), 1)
                    ])
                  ])
                ])
              ]),
              __props.activity.image_url ? (openBlock(), createBlock("section", {
                key: 0,
                class: "bg-white"
              }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-6" }, [
                  createVNode("div", { class: "relative aspect-[16/7] md:h-[400px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,65,130,0.15)] border border-gray-50" }, [
                    createVNode("img", {
                      src: __props.activity.image_url,
                      alt: __props.activity.title,
                      class: "w-full h-full object-cover"
                    }, null, 8, ["src", "alt"])
                  ])
                ])
              ])) : createCommentVNode("", true),
              createVNode("article", { class: "py-24 bg-white" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-6" }, [
                  createVNode("div", {
                    class: "prose prose-xl prose-slate max-w-none break-words prose-headings:text-[#004182] prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-p:text-gray-600 prose-p:leading-[2] prose-p:font-medium prose-strong:text-[#004182] prose-strong:font-black prose-a:text-[#FFD700] prose-a:font-black prose-a:no-underline hover:prose-a:text-[#004182] prose-img:rounded-[2rem] prose-img:shadow-2xl",
                    innerHTML: __props.activity.description
                  }, null, 8, ["innerHTML"]),
                  __props.activity.gallery_urls && __props.activity.gallery_urls.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-32"
                  }, [
                    createVNode("div", { class: "text-center mb-16" }, [
                      createVNode("h2", { class: "text-3xl font-black text-[#004182] uppercase tracking-tight mb-4" }, "Galeri Dokumentasi"),
                      createVNode("div", { class: "w-20 h-1.5 bg-[#FFD700] mx-auto" })
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-8" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.activity.gallery_urls, (img, idx) => {
                        return openBlock(), createBlock("div", {
                          key: idx,
                          class: "group relative aspect-square rounded-[2rem] overflow-hidden shadow-xl border border-gray-50 cursor-pointer",
                          onClick: ($event) => openImage(img)
                        }, [
                          createVNode("img", {
                            src: img,
                            class: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          }, null, 8, ["src"]),
                          createVNode("div", { class: "absolute inset-0 bg-[#004182]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" }, [
                            createVNode("i", { class: "bi bi-zoom-in text-white text-4xl" })
                          ])
                        ], 8, ["onClick"]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "mt-32 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8" }, [
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("span", { class: "text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]" }, "SHARE THIS"),
                      createVNode("div", { class: "flex gap-3" }, [
                        createVNode("button", { class: "w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#004182] hover:bg-[#004182] hover:text-white transition-all" }, [
                          createVNode("i", { class: "bi bi-facebook" })
                        ]),
                        createVNode("button", { class: "w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#004182] hover:bg-[#004182] hover:text-white transition-all" }, [
                          createVNode("i", { class: "bi bi-twitter-x" })
                        ]),
                        createVNode("button", { class: "w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#004182] hover:bg-[#004182] hover:text-white transition-all" }, [
                          createVNode("i", { class: "bi bi-whatsapp" })
                        ]),
                        createVNode("button", { class: "w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#004182] hover:bg-[#004182] hover:text-white transition-all" }, [
                          createVNode("i", { class: "bi bi-link-45deg" })
                        ])
                      ])
                    ]),
                    createVNode(unref(Link), {
                      href: "/activity",
                      class: "inline-flex items-center gap-3 font-black text-[11px] text-[#004182] border-b-2 border-[#FFD700] pb-1 hover:gap-6 transition-all uppercase tracking-widest"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" KEMBALI KE BLOG "),
                        createVNode("i", { class: "bi bi-arrow-left order-first" })
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              createVNode("section", { class: "py-32 bg-[#f8f9fa]" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 text-center" }, [
                  createVNode("h2", { class: "text-3xl font-black text-[#004182] uppercase tracking-tight mb-4" }, "Ingin Berkolaborasi?"),
                  createVNode("p", { class: "text-gray-500 font-medium mb-10" }, "Hubungi kami untuk informasi kemitraan atau peliputan kegiatan."),
                  createVNode(unref(Link), {
                    href: "/contact",
                    class: "bg-[#004182] text-white px-12 py-4 rounded-full font-black shadow-2xl hover:bg-[#FFD700] hover:text-[#004182] transition-all uppercase tracking-widest text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("CONTACT US")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/ActivityDetail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ActivityDetail = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c9f01e4a"]]);
export {
  ActivityDetail as default
};
//# sourceMappingURL=ActivityDetail-CmY1FV2V.js.map
