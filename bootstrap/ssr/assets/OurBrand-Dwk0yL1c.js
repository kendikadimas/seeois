import { unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-B8fPWyvx.js";
import { Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "OurBrand",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Our Brand" }, null, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="bg-slate-100 py-20 lg:py-24"${_scopeId}><div class="container mx-auto px-6 text-center"${_scopeId}><h1 class="text-4xl lg:text-5xl font-extrabold text-slate-900"${_scopeId}>Our Brands</h1><p class="mt-4 text-lg text-slate-500 max-w-2xl mx-auto"${_scopeId}>Setiap merek yang kami bangun adalah cerminan dari semangat, kerja keras, dan inovasi mahasiswa Fakultas Teknik.</p></div></section><section class="py-20 lg:py-24 bg-white"${_scopeId}><div class="container mx-auto px-6"${_scopeId}><div class="grid lg:grid-cols-2 gap-12 items-center"${_scopeId}><div${_scopeId}></div><div${_scopeId}><span class="inline-block bg-secondary/20 text-yellow-800 font-semibold px-3 py-1 rounded-full mb-4"${_scopeId}>Featured Brand</span><h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"${_scopeId}>Blaterian</h2><p class="text-slate-500 leading-relaxed mb-4"${_scopeId}> Blaterian adalah merek kuliner andalan SEEO yang berfokus pada penyediaan makanan dan minuman berkualitas tinggi untuk berbagai acara. Dikelola sepenuhnya oleh anggota kami, Blaterian menjadi laboratorium nyata untuk belajar manajemen bisnis kuliner. </p><ul class="space-y-2 text-slate-600"${_scopeId}><li class="flex items-center"${_scopeId}><i class="bi bi-check-circle-fill text-primary mr-2"${_scopeId}></i>Produk Inovatif &amp; Kekinian</li><li class="flex items-center"${_scopeId}><i class="bi bi-check-circle-fill text-primary mr-2"${_scopeId}></i>Manajemen Produksi Profesional</li><li class="flex items-center"${_scopeId}><i class="bi bi-check-circle-fill text-primary mr-2"${_scopeId}></i>Strategi Pemasaran Kreatif</li></ul></div></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "bg-slate-100 py-20 lg:py-24" }, [
                createVNode("div", { class: "container mx-auto px-6 text-center" }, [
                  createVNode("h1", { class: "text-4xl lg:text-5xl font-extrabold text-slate-900" }, "Our Brands"),
                  createVNode("p", { class: "mt-4 text-lg text-slate-500 max-w-2xl mx-auto" }, "Setiap merek yang kami bangun adalah cerminan dari semangat, kerja keras, dan inovasi mahasiswa Fakultas Teknik.")
                ])
              ]),
              createVNode("section", { class: "py-20 lg:py-24 bg-white" }, [
                createVNode("div", { class: "container mx-auto px-6" }, [
                  createVNode("div", { class: "grid lg:grid-cols-2 gap-12 items-center" }, [
                    createVNode("div"),
                    createVNode("div", null, [
                      createVNode("span", { class: "inline-block bg-secondary/20 text-yellow-800 font-semibold px-3 py-1 rounded-full mb-4" }, "Featured Brand"),
                      createVNode("h2", { class: "text-3xl lg:text-4xl font-bold text-slate-900 mb-4" }, "Blaterian"),
                      createVNode("p", { class: "text-slate-500 leading-relaxed mb-4" }, " Blaterian adalah merek kuliner andalan SEEO yang berfokus pada penyediaan makanan dan minuman berkualitas tinggi untuk berbagai acara. Dikelola sepenuhnya oleh anggota kami, Blaterian menjadi laboratorium nyata untuk belajar manajemen bisnis kuliner. "),
                      createVNode("ul", { class: "space-y-2 text-slate-600" }, [
                        createVNode("li", { class: "flex items-center" }, [
                          createVNode("i", { class: "bi bi-check-circle-fill text-primary mr-2" }),
                          createTextVNode("Produk Inovatif & Kekinian")
                        ]),
                        createVNode("li", { class: "flex items-center" }, [
                          createVNode("i", { class: "bi bi-check-circle-fill text-primary mr-2" }),
                          createTextVNode("Manajemen Produksi Profesional")
                        ]),
                        createVNode("li", { class: "flex items-center" }, [
                          createVNode("i", { class: "bi bi-check-circle-fill text-primary mr-2" }),
                          createTextVNode("Strategi Pemasaran Kreatif")
                        ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/OurBrand.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
