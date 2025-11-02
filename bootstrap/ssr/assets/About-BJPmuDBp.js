import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./PublicLayout-rYv0gHJQ.js";
import { Head } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "About",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "About Us" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="bg-white py-20 lg:py-24"${_scopeId}><div class="container mx-auto px-6"${_scopeId}><div class="grid lg:grid-cols-2 gap-12 items-center"${_scopeId}><div${_scopeId}><span class="font-semibold text-primary uppercase tracking-wider"${_scopeId}>Tentang Kami</span><h1 class="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-2 mb-4 tracking-tight"${_scopeId}>Mencetak Generasi Wirausaha Teknik</h1><p class="text-lg text-slate-500 leading-relaxed"${_scopeId}> Student Entrepreneur and Empowerment Organization (SEEO) adalah Unit Kegiatan Mahasiswa Kewirausahaan (UKMK) di Fakultas Teknik Universitas Jenderal Soedirman yang menjadi wadah bagi mahasiswa untuk belajar, berinovasi, dan bertumbuh dalam dunia wirausaha. </p></div><div class="hidden lg:block"${_scopeId}></div></div></div></section><section class="bg-slate-100 py-20 lg:py-24"${_scopeId}><div class="container mx-auto px-6"${_scopeId}><div class="max-w-4xl mx-auto text-center"${_scopeId}><h2 class="text-3xl lg:text-4xl font-bold text-slate-900"${_scopeId}>Visi &amp; Misi Kami</h2><div class="mt-8 text-slate-600 text-lg leading-relaxed border-t-4 border-primary pt-8"${_scopeId}><p${_scopeId}> Memberikan pengalaman berwirausaha yang mengedepankan teoritikal dan praktikal secara adaptif dalam pelaksanaannya, serta berorganisasi yang sinergis baik internal maupun eksternal UKMK FT Unsoed. </p></div></div></div></section><section class="py-20 lg:py-24"${_scopeId}><div class="container mx-auto px-6"${_scopeId}><div class="text-center max-w-3xl mx-auto mb-16"${_scopeId}><h2 class="text-3xl lg:text-4xl font-bold text-slate-900"${_scopeId}>Momen Kami</h2><p class="mt-4 text-lg text-slate-500"${_scopeId}>Beberapa cuplikan dari kegiatan dan kebersamaan tim kami.</p></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4"${_scopeId}><div class="grid gap-4"${_scopeId}><div${_scopeId}></div><div${_scopeId}></div></div><div class="grid gap-4"${_scopeId}><div${_scopeId}></div><div${_scopeId}></div></div><div class="grid gap-4"${_scopeId}><div${_scopeId}></div><div${_scopeId}></div></div><div class="grid gap-4"${_scopeId}><div${_scopeId}></div><div${_scopeId}></div></div></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "bg-white py-20 lg:py-24" }, [
                createVNode("div", { class: "container mx-auto px-6" }, [
                  createVNode("div", { class: "grid lg:grid-cols-2 gap-12 items-center" }, [
                    createVNode("div", null, [
                      createVNode("span", { class: "font-semibold text-primary uppercase tracking-wider" }, "Tentang Kami"),
                      createVNode("h1", { class: "text-4xl lg:text-5xl font-extrabold text-slate-900 mt-2 mb-4 tracking-tight" }, "Mencetak Generasi Wirausaha Teknik"),
                      createVNode("p", { class: "text-lg text-slate-500 leading-relaxed" }, " Student Entrepreneur and Empowerment Organization (SEEO) adalah Unit Kegiatan Mahasiswa Kewirausahaan (UKMK) di Fakultas Teknik Universitas Jenderal Soedirman yang menjadi wadah bagi mahasiswa untuk belajar, berinovasi, dan bertumbuh dalam dunia wirausaha. ")
                    ]),
                    createVNode("div", { class: "hidden lg:block" })
                  ])
                ])
              ]),
              createVNode("section", { class: "bg-slate-100 py-20 lg:py-24" }, [
                createVNode("div", { class: "container mx-auto px-6" }, [
                  createVNode("div", { class: "max-w-4xl mx-auto text-center" }, [
                    createVNode("h2", { class: "text-3xl lg:text-4xl font-bold text-slate-900" }, "Visi & Misi Kami"),
                    createVNode("div", { class: "mt-8 text-slate-600 text-lg leading-relaxed border-t-4 border-primary pt-8" }, [
                      createVNode("p", null, " Memberikan pengalaman berwirausaha yang mengedepankan teoritikal dan praktikal secara adaptif dalam pelaksanaannya, serta berorganisasi yang sinergis baik internal maupun eksternal UKMK FT Unsoed. ")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-20 lg:py-24" }, [
                createVNode("div", { class: "container mx-auto px-6" }, [
                  createVNode("div", { class: "text-center max-w-3xl mx-auto mb-16" }, [
                    createVNode("h2", { class: "text-3xl lg:text-4xl font-bold text-slate-900" }, "Momen Kami"),
                    createVNode("p", { class: "mt-4 text-lg text-slate-500" }, "Beberapa cuplikan dari kegiatan dan kebersamaan tim kami.")
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
                    createVNode("div", { class: "grid gap-4" }, [
                      createVNode("div"),
                      createVNode("div")
                    ]),
                    createVNode("div", { class: "grid gap-4" }, [
                      createVNode("div"),
                      createVNode("div")
                    ]),
                    createVNode("div", { class: "grid gap-4" }, [
                      createVNode("div"),
                      createVNode("div")
                    ]),
                    createVNode("div", { class: "grid gap-4" }, [
                      createVNode("div"),
                      createVNode("div")
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
