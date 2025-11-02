import { unref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./PublicLayout-rYv0gHJQ.js";
import { Head } from "@inertiajs/vue3";
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
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="bg-slate-100 py-20 lg:py-24"${_scopeId}><div class="container mx-auto px-6 text-center"${_scopeId}><h1 class="text-4xl lg:text-5xl font-extrabold text-slate-900"${_scopeId}>Events &amp; Programs</h1><p class="mt-4 text-lg text-slate-500 max-w-2xl mx-auto"${_scopeId}>Temukan berbagai seminar, workshop, dan kompetisi yang kami selenggarakan untuk mengasah jiwa wirausaha Anda.</p></div></section><section class="py-20 lg:py-24"${_scopeId}><div class="container mx-auto px-6"${_scopeId}><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"${_scopeId}><!--[-->`);
            ssrRenderList(events, (event) => {
              _push2(`<div class="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300"${_scopeId}><div class="p-6"${_scopeId}><span class="inline-block bg-blue-100 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-3"${_scopeId}>${ssrInterpolate(event.category)}</span><h2 class="text-xl font-bold text-slate-900 mb-3 h-14 group-hover:text-primary transition-colors"${_scopeId}>${ssrInterpolate(event.name)}</h2><p class="text-slate-500 text-base"${_scopeId}>${ssrInterpolate(event.description)}</p></div></div>`);
            });
            _push2(`<!--]--></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "bg-slate-100 py-20 lg:py-24" }, [
                createVNode("div", { class: "container mx-auto px-6 text-center" }, [
                  createVNode("h1", { class: "text-4xl lg:text-5xl font-extrabold text-slate-900" }, "Events & Programs"),
                  createVNode("p", { class: "mt-4 text-lg text-slate-500 max-w-2xl mx-auto" }, "Temukan berbagai seminar, workshop, dan kompetisi yang kami selenggarakan untuk mengasah jiwa wirausaha Anda.")
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
