import { unref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./PublicLayout-rYv0gHJQ.js";
import { Head } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Structure",
  __ssrInlineRender: true,
  setup(__props) {
    const departments = [
      { name: "CEO & Co-CEO", image: "/storage/local/images/compro/ceoco.JPG", icon: "👑" },
      { name: "Financial", image: "/storage/local/images/compro/finance.JPG", icon: "💰" },
      { name: "Operating", image: "/storage/local/images/compro/opet.JPG", icon: "💼" },
      { name: "Administration", image: "/storage/local/images/compro/admin.JPG", icon: "📝" },
      { name: "Production", image: "/storage/local/images/compro/prod.JPG", icon: "👨‍🍳" },
      { name: "Marketing Medinfo", image: "/storage/local/images/compro/mm.JPG", icon: "💻" },
      { name: "Sales Distribution", image: "/storage/local/images/compro/ssd.JPG", icon: "📈" },
      { name: "Public Relation", image: "/storage/local/images/compro/pr.JPG", icon: "📱" },
      { name: "Human Resources", image: "/storage/local/images/compro/hr.JPG", icon: "👥" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Struktur Kabinet - SEEO" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main${_scopeId}><section class="relative bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white pt-48 pb-24 px-6 text-center"${_scopeId}><div class="relative z-10"${_scopeId}><h1 class="text-4xl sm:text-6xl font-black mb-4" style="${ssrRenderStyle({ "text-shadow": "0 3px 10px rgba(0,0,0,0.2)" })}"${_scopeId}> Departemen SEEO </h1><p class="text-lg text-white/80 max-w-3xl mx-auto"${_scopeId}> Mengenal individu-individu berbakat yang menjadi motor penggerak di setiap departemen SEEO. </p></div></section><section class="bg-gradient-to-br from-white via-sky-50 to-blue-100 py-20 px-6"${_scopeId}><div class="max-w-7xl mx-auto"${_scopeId}><div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"${_scopeId}><!--[-->`);
            ssrRenderList(departments, (dept) => {
              _push2(`<div class="relative w-full h-60 rounded-3xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 shadow-lg" style="${ssrRenderStyle({ backgroundImage: `url('${dept.image}')`, backgroundSize: "cover", backgroundPosition: "center" })}"${_scopeId}><div class="absolute -top-5 left-6 text-4xl bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"${_scopeId}>${dept.icon ?? ""}</div><div class="absolute bottom-0 left-0 w-full h-full p-6 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/40 to-transparent"${_scopeId}><h3 class="text-white font-bold text-3xl drop-shadow-lg"${_scopeId}>${ssrInterpolate(dept.name)}</h3></div></div>`);
            });
            _push2(`<!--]--></div></div></section></main>`);
          } else {
            return [
              createVNode("main", null, [
                createVNode("section", { class: "relative bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white pt-48 pb-24 px-6 text-center" }, [
                  createVNode("div", { class: "relative z-10" }, [
                    createVNode("h1", {
                      class: "text-4xl sm:text-6xl font-black mb-4",
                      style: { "text-shadow": "0 3px 10px rgba(0,0,0,0.2)" }
                    }, " Departemen SEEO "),
                    createVNode("p", { class: "text-lg text-white/80 max-w-3xl mx-auto" }, " Mengenal individu-individu berbakat yang menjadi motor penggerak di setiap departemen SEEO. ")
                  ])
                ]),
                createVNode("section", { class: "bg-gradient-to-br from-white via-sky-50 to-blue-100 py-20 px-6" }, [
                  createVNode("div", { class: "max-w-7xl mx-auto" }, [
                    createVNode("div", { class: "grid sm:grid-cols-2 lg:grid-cols-3 gap-10" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(departments, (dept) => {
                        return createVNode("div", {
                          key: dept.name,
                          class: "relative w-full h-60 rounded-3xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 shadow-lg",
                          style: { backgroundImage: `url('${dept.image}')`, backgroundSize: "cover", backgroundPosition: "center" }
                        }, [
                          createVNode("div", {
                            class: "absolute -top-5 left-6 text-4xl bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg",
                            innerHTML: dept.icon
                          }, null, 8, ["innerHTML"]),
                          createVNode("div", { class: "absolute bottom-0 left-0 w-full h-full p-6 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/40 to-transparent" }, [
                            createVNode("h3", { class: "text-white font-bold text-3xl drop-shadow-lg" }, toDisplayString(dept.name), 1)
                          ])
                        ], 4);
                      }), 64))
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
