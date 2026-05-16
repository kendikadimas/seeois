import { computed, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-23vkxrDC.js";
import { Head } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Structure",
  __ssrInlineRender: true,
  props: {
    structures: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const executives = computed(() => props.structures.filter((s) => s.is_executive));
    const deptMembers = computed(() => props.structures.filter((s) => !s.is_executive));
    const groupedDepartments = computed(() => {
      const groups = {};
      deptMembers.value.forEach((m) => {
        const dept = m.department_name || "Lainnya";
        if (!groups[dept]) groups[dept] = [];
        groups[dept].push(m);
      });
      return groups;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-3b800a90${_scopeId}>Struktur Organisasi - SEEO FT UNSOED</title><meta name="description" content="Kenali pengurus dan struktur organisasi SEEO FT UNSOED Kabinet Arshaka Karsa. Temukan talenta-talenta muda berbakat di balik setiap departemen kami." data-v-3b800a90${_scopeId}><meta name="keywords" content="organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, struktur seeo" data-v-3b800a90${_scopeId}><meta property="og:title" content="Struktur Organisasi SEEO - Kabinet Arshaka Karsa" data-v-3b800a90${_scopeId}><meta property="og:description" content="Profil pengurus dan struktur departemen SEEO FT UNSOED." data-v-3b800a90${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Struktur Organisasi - SEEO FT UNSOED"),
              createVNode("meta", {
                name: "description",
                content: "Kenali pengurus dan struktur organisasi SEEO FT UNSOED Kabinet Arshaka Karsa. Temukan talenta-talenta muda berbakat di balik setiap departemen kami."
              }),
              createVNode("meta", {
                name: "keywords",
                content: "organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, struktur seeo"
              }),
              createVNode("meta", {
                property: "og:title",
                content: "Struktur Organisasi SEEO - Kabinet Arshaka Karsa"
              }),
              createVNode("meta", {
                property: "og:description",
                content: "Profil pengurus dan struktur departemen SEEO FT UNSOED."
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="relative pt-24 pb-20 bg-white overflow-hidden" data-v-3b800a90${_scopeId}><div class="max-w-7xl mx-auto px-6 text-center relative z-10" data-v-3b800a90${_scopeId}><div class="inline-block px-4 py-1.5 bg-[#FFD700]/10 text-[#004182] font-black text-[10px] uppercase tracking-[0.3em] rounded-full mb-8 border border-[#FFD700]/20" data-v-3b800a90${_scopeId}> Kepengurusan SEEO 2026 </div><h1 class="text-5xl md:text-7xl font-black text-[#004182] mb-8 leading-tight tracking-tight uppercase" data-v-3b800a90${_scopeId}> KABINET<span class="text-[#FFD700]" data-v-3b800a90${_scopeId}> ARSHAKA KARSA</span><br data-v-3b800a90${_scopeId}></h1></div><div class="absolute top-0 right-0 w-1/2 h-full bg-[#f8f9fa] -skew-x-12 translate-x-1/2 -z-0" data-v-3b800a90${_scopeId}></div></section><section class="py-24 bg-white relative z-10" data-v-3b800a90${_scopeId}><div class="max-w-7xl mx-auto px-6" data-v-3b800a90${_scopeId}>`);
            if (executives.value.length) {
              _push2(`<div class="mb-32" data-v-3b800a90${_scopeId}><div class="text-center mb-16" data-v-3b800a90${_scopeId}><h2 class="text-3xl md:text-4xl font-black text-[#004182] uppercase tracking-tight mb-4" data-v-3b800a90${_scopeId}>Pengurus Harian</h2><div class="w-20 h-1.5 bg-[#FFD700] mx-auto" data-v-3b800a90${_scopeId}></div></div><div class="flex overflow-x-auto gap-6 pb-8 px-6 snap-x snap-mandatory scrollbar-hide -mx-6" data-v-3b800a90${_scopeId}><!--[-->`);
              ssrRenderList(executives.value, (s) => {
                _push2(`<div class="flex-shrink-0 w-[260px] md:w-[280px] snap-center" data-v-3b800a90${_scopeId}><div class="group relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-50 transition-all hover:-translate-y-2 h-full" data-v-3b800a90${_scopeId}><div class="aspect-[3/4] overflow-hidden" data-v-3b800a90${_scopeId}><img${ssrRenderAttr("src", s.image_url || (s.gender === "f" ? "/images/assets/staff_f.png" : "/images/assets/staff_m.png"))}${ssrRenderAttr("alt", s.name)} class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" data-v-3b800a90${_scopeId}></div><div class="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#004182] to-transparent text-white" data-v-3b800a90${_scopeId}><h3 class="text-lg font-black leading-tight mb-1" data-v-3b800a90${_scopeId}>${ssrInterpolate(s.name)}</h3><p class="text-[10px] uppercase font-bold text-[#FFD700] tracking-widest" data-v-3b800a90${_scopeId}>${ssrInterpolate(s.role_title)}</p></div></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(groupedDepartments.value, (members, deptName) => {
              _push2(`<div class="mb-24" data-v-3b800a90${_scopeId}><div class="text-center mb-12" data-v-3b800a90${_scopeId}><h2 class="text-2xl md:text-3xl font-black text-[#004182] uppercase tracking-tight mb-4" data-v-3b800a90${_scopeId}>${ssrInterpolate(deptName)}</h2><div class="w-16 h-1 bg-[#FFD700] mx-auto" data-v-3b800a90${_scopeId}></div></div><div class="flex overflow-x-auto gap-4 md:gap-6 pb-6 px-6 snap-x snap-mandatory scrollbar-hide -mx-6" data-v-3b800a90${_scopeId}><!--[-->`);
              ssrRenderList(members, (s) => {
                _push2(`<div class="flex-shrink-0 w-[160px] md:w-[220px] snap-center" data-v-3b800a90${_scopeId}><div class="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-50 transition-all hover:shadow-xl h-full" data-v-3b800a90${_scopeId}><div class="aspect-[3/4] overflow-hidden" data-v-3b800a90${_scopeId}><img${ssrRenderAttr("src", s.image_url || (s.gender === "f" ? "/images/assets/staff_f.png" : "/images/assets/staff_m.png"))}${ssrRenderAttr("alt", s.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform" data-v-3b800a90${_scopeId}></div><div class="p-4 text-left" data-v-3b800a90${_scopeId}><h4 class="text-sm font-black text-[#004182] line-clamp-1 mb-1" data-v-3b800a90${_scopeId}>${ssrInterpolate(s.name)}</h4><p class="text-[9px] uppercase font-bold text-gray-400 tracking-widest" data-v-3b800a90${_scopeId}>${ssrInterpolate(s.role_title)}</p></div><div class="absolute top-2 right-2 w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center shadow-md" data-v-3b800a90${_scopeId}><i class="bi bi-person text-xs text-[#004182]" data-v-3b800a90${_scopeId}></i></div></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            });
            _push2(`<!--]-->`);
            if (!__props.structures.length) {
              _push2(`<div class="text-center py-24" data-v-3b800a90${_scopeId}><div class="mb-6 opacity-20" data-v-3b800a90${_scopeId}><i class="bi bi-people text-9xl" data-v-3b800a90${_scopeId}></i></div><p class="text-gray-400 font-bold uppercase tracking-widest" data-v-3b800a90${_scopeId}>Belum ada data kepengurusan</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></section>`);
          } else {
            return [
              createVNode("section", { class: "relative pt-24 pb-20 bg-white overflow-hidden" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 text-center relative z-10" }, [
                  createVNode("div", { class: "inline-block px-4 py-1.5 bg-[#FFD700]/10 text-[#004182] font-black text-[10px] uppercase tracking-[0.3em] rounded-full mb-8 border border-[#FFD700]/20" }, " Kepengurusan SEEO 2026 "),
                  createVNode("h1", { class: "text-5xl md:text-7xl font-black text-[#004182] mb-8 leading-tight tracking-tight uppercase" }, [
                    createTextVNode(" KABINET"),
                    createVNode("span", { class: "text-[#FFD700]" }, " ARSHAKA KARSA"),
                    createVNode("br")
                  ])
                ]),
                createVNode("div", { class: "absolute top-0 right-0 w-1/2 h-full bg-[#f8f9fa] -skew-x-12 translate-x-1/2 -z-0" })
              ]),
              createVNode("section", { class: "py-24 bg-white relative z-10" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6" }, [
                  executives.value.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-32"
                  }, [
                    createVNode("div", { class: "text-center mb-16" }, [
                      createVNode("h2", { class: "text-3xl md:text-4xl font-black text-[#004182] uppercase tracking-tight mb-4" }, "Pengurus Harian"),
                      createVNode("div", { class: "w-20 h-1.5 bg-[#FFD700] mx-auto" })
                    ]),
                    createVNode("div", { class: "flex overflow-x-auto gap-6 pb-8 px-6 snap-x snap-mandatory scrollbar-hide -mx-6" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(executives.value, (s) => {
                        return openBlock(), createBlock("div", {
                          key: s.id,
                          class: "flex-shrink-0 w-[260px] md:w-[280px] snap-center"
                        }, [
                          createVNode("div", { class: "group relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-50 transition-all hover:-translate-y-2 h-full" }, [
                            createVNode("div", { class: "aspect-[3/4] overflow-hidden" }, [
                              createVNode("img", {
                                src: s.image_url || (s.gender === "f" ? "/images/assets/staff_f.png" : "/images/assets/staff_m.png"),
                                alt: s.name,
                                class: "w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                              }, null, 8, ["src", "alt"])
                            ]),
                            createVNode("div", { class: "absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#004182] to-transparent text-white" }, [
                              createVNode("h3", { class: "text-lg font-black leading-tight mb-1" }, toDisplayString(s.name), 1),
                              createVNode("p", { class: "text-[10px] uppercase font-bold text-[#FFD700] tracking-widest" }, toDisplayString(s.role_title), 1)
                            ])
                          ])
                        ]);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true),
                  (openBlock(true), createBlock(Fragment, null, renderList(groupedDepartments.value, (members, deptName) => {
                    return openBlock(), createBlock("div", {
                      key: deptName,
                      class: "mb-24"
                    }, [
                      createVNode("div", { class: "text-center mb-12" }, [
                        createVNode("h2", { class: "text-2xl md:text-3xl font-black text-[#004182] uppercase tracking-tight mb-4" }, toDisplayString(deptName), 1),
                        createVNode("div", { class: "w-16 h-1 bg-[#FFD700] mx-auto" })
                      ]),
                      createVNode("div", { class: "flex overflow-x-auto gap-4 md:gap-6 pb-6 px-6 snap-x snap-mandatory scrollbar-hide -mx-6" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(members, (s) => {
                          return openBlock(), createBlock("div", {
                            key: s.id,
                            class: "flex-shrink-0 w-[160px] md:w-[220px] snap-center"
                          }, [
                            createVNode("div", { class: "group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-50 transition-all hover:shadow-xl h-full" }, [
                              createVNode("div", { class: "aspect-[3/4] overflow-hidden" }, [
                                createVNode("img", {
                                  src: s.image_url || (s.gender === "f" ? "/images/assets/staff_f.png" : "/images/assets/staff_m.png"),
                                  alt: s.name,
                                  class: "w-full h-full object-cover group-hover:scale-105 transition-transform"
                                }, null, 8, ["src", "alt"])
                              ]),
                              createVNode("div", { class: "p-4 text-left" }, [
                                createVNode("h4", { class: "text-sm font-black text-[#004182] line-clamp-1 mb-1" }, toDisplayString(s.name), 1),
                                createVNode("p", { class: "text-[9px] uppercase font-bold text-gray-400 tracking-widest" }, toDisplayString(s.role_title), 1)
                              ]),
                              createVNode("div", { class: "absolute top-2 right-2 w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center shadow-md" }, [
                                createVNode("i", { class: "bi bi-person text-xs text-[#004182]" })
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ]);
                  }), 128)),
                  !__props.structures.length ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-24"
                  }, [
                    createVNode("div", { class: "mb-6 opacity-20" }, [
                      createVNode("i", { class: "bi bi-people text-9xl" })
                    ]),
                    createVNode("p", { class: "text-gray-400 font-bold uppercase tracking-widest" }, "Belum ada data kepengurusan")
                  ])) : createCommentVNode("", true)
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
const Structure = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3b800a90"]]);
export {
  Structure as default
};
//# sourceMappingURL=Structure-C08PQEIv.js.map
