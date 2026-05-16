import { unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-23vkxrDC.js";
import { Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Events",
  __ssrInlineRender: true,
  setup(__props) {
    const events = [
      { id: 1, name: "EntClass I", category: "Human Resource", description: "Program pelatihan wirausaha intensif, fokus pada pengembangan keterampilan bisnis vital." },
      { id: 2, name: "Visitasi I ke KOPMA UIN SAIZU", category: "Public Relation", description: "Kegiatan studi banding untuk meningkatkan wawasan anggota mengenai praktik kewirausahaan." },
      { id: 3, name: "Upgrading I", category: "Human Resource", description: "Kegiatan bonding anggota yang dirancang untuk memperkuat hubungan tim dan kolaborasi." },
      { id: 4, name: "Rapat Pleno I", category: "CEO-CoCEO", description: "Rapat pleno untuk membahas perkembangan dan evaluasi seluruh program kerja organisasi." },
      { id: 5, name: "Internship SEEO", category: "Human Resource", description: "Program magang bagi mahasiswa untuk mendapatkan pengalaman kerja langsung di dalam SEEO." },
      { id: 6, name: "Blaterian Stand", category: "Production", description: "Pembukaan stand penjualan produk Blaterian di berbagai acara kampus dan sekitarnya." }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Events" }, null, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="relative bg-slate-900 min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden border-b border-slate-800"${_scopeId}><div class="absolute inset-0 z-0"${_scopeId}><div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"${_scopeId}></div><div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"${_scopeId}></div></div><div class="container mx-auto px-6 relative z-10 text-center"${_scopeId}><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20"${_scopeId}> Programs &amp; Calendars </div><h1 class="text-5xl lg:text-7xl font-black text-white tracking-tight leading-tight mb-8"${_scopeId}> Discover Our <br${_scopeId}><span class="text-blue-500 italic"${_scopeId}>Signature</span> Events. </h1><p class="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"${_scopeId}> Temukan berbagai seminar, workshop, dan kompetisi yang kami selenggarakan untuk mengasah jiwa wirausaha Anda. </p><div class="mt-10 flex justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("seminar.registration.create"),
              class: "inline-flex items-center px-5 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Daftar Seminar Nasional `);
                } else {
                  return [
                    createTextVNode(" Daftar Seminar Nasional ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"${_scopeId}><span class="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold"${_scopeId}>Scroll to Explore</span><div class="w-px h-12 bg-linear-to-b from-blue-500 to-transparent"${_scopeId}></div></div></div></section><section class="py-20 lg:py-24"${_scopeId}><div class="container mx-auto px-6"${_scopeId}><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"${_scopeId}><!--[-->`);
            ssrRenderList(events, (event) => {
              _push2(`<div class="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300"${_scopeId}><div class="p-6"${_scopeId}><span class="inline-block bg-blue-100 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-3"${_scopeId}>${ssrInterpolate(event.category)}</span><h2 class="text-xl font-bold text-slate-900 mb-3 h-14 group-hover:text-primary transition-colors"${_scopeId}>${ssrInterpolate(event.name)}</h2><p class="text-slate-500 text-base"${_scopeId}>${ssrInterpolate(event.description)}</p></div></div>`);
            });
            _push2(`<!--]--></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "relative bg-slate-900 min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden border-b border-slate-800" }, [
                createVNode("div", { class: "absolute inset-0 z-0" }, [
                  createVNode("div", { class: "absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" }),
                  createVNode("div", { class: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" })
                ]),
                createVNode("div", { class: "container mx-auto px-6 relative z-10 text-center" }, [
                  createVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20" }, " Programs & Calendars "),
                  createVNode("h1", { class: "text-5xl lg:text-7xl font-black text-white tracking-tight leading-tight mb-8" }, [
                    createTextVNode(" Discover Our "),
                    createVNode("br"),
                    createVNode("span", { class: "text-blue-500 italic" }, "Signature"),
                    createTextVNode(" Events. ")
                  ]),
                  createVNode("p", { class: "text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed" }, " Temukan berbagai seminar, workshop, dan kompetisi yang kami selenggarakan untuk mengasah jiwa wirausaha Anda. "),
                  createVNode("div", { class: "mt-10 flex justify-center" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("seminar.registration.create"),
                      class: "inline-flex items-center px-5 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Daftar Seminar Nasional ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50" }, [
                    createVNode("span", { class: "text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold" }, "Scroll to Explore"),
                    createVNode("div", { class: "w-px h-12 bg-linear-to-b from-blue-500 to-transparent" })
                  ])
                ])
              ]),
              createVNode("section", { class: "py-20 lg:py-24" }, [
                createVNode("div", { class: "container mx-auto px-6" }, [
                  createVNode("div", { class: "grid md:grid-cols-2 lg:grid-cols-3 gap-8" }, [
                    (openBlock(), createBlock(Fragment, null, renderList(events, (event) => {
                      return createVNode("div", {
                        key: event.id,
                        class: "bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300"
                      }, [
                        createVNode("div", { class: "p-6" }, [
                          createVNode("span", { class: "inline-block bg-blue-100 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-3" }, toDisplayString(event.category), 1),
                          createVNode("h2", { class: "text-xl font-bold text-slate-900 mb-3 h-14 group-hover:text-primary transition-colors" }, toDisplayString(event.name), 1),
                          createVNode("p", { class: "text-slate-500 text-base" }, toDisplayString(event.description), 1)
                        ])
                      ]);
                    }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Events.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Events-myHciKBL.js.map
