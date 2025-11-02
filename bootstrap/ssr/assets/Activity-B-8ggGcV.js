import { unref, withCtx, createVNode, createTextVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./PublicLayout-rYv0gHJQ.js";
import { Head } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Activity",
  __ssrInlineRender: true,
  setup(__props) {
    const activities = [
      { title: "Visitasi I ke KOPMA UIN SAIZU", image: "/storage/local/images/compro/visitasi.JPG", department: "Public Relation", badgeColor: "bg-green-100 text-green-600", description: "Studi banding untuk meningkatkan wawasan mengenai praktik kewirausahaan di organisasi lain." },
      { title: "Upgrading I", image: "/storage/local/images/compro/upgrading.webp", department: "Human Resources", badgeColor: "bg-red-100 text-red-600", description: "Kegiatan bonding anggota untuk memperkuat hubungan tim dan meningkatkan semangat kolaborasi." },
      { title: "Rapat Pleno I", image: "/storage/local/images/compro/raplen1.JPG", department: "CEO-CoCEO", badgeColor: "bg-yellow-100 text-yellow-600", description: "Membahas perkembangan dan evaluasi program kerja setiap departemen." }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Kegiatan & Artikel - SEEO" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main${_scopeId}><div class="relative pt-48 pb-30 px-6 text-center bg-gray-900 overflow-hidden"${_scopeId}><div class="absolute inset-0 bg-cover bg-center opacity-20" style="${ssrRenderStyle({ "background-image": "url('/assets/entclass.JPG')" })}"${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"${_scopeId}></div><div class="relative z-10 items-center justify-center"${_scopeId}><h1 class="text-4xl sm:text-5xl font-black text-white mb-4 mx-auto"${_scopeId}>Dokumentasi Kegiatan SEEO</h1><p class="text-lg text-white/80 max-w-3xl mx-auto"${_scopeId}>Jelajahi berbagai program dan aktivitas yang telah kami selenggarakan untuk membangun dan menginspirasi jiwa wirausaha di kalangan mahasiswa.</p></div></div><div class="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8"${_scopeId}><section class="mb-20"${_scopeId}><div class="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"${_scopeId}><div class="relative overflow-hidden rounded-xl h-96"${_scopeId}><img src="/storage/local/images/compro/entclass.JPG" alt="EntClass" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"${_scopeId}></div><div class="flex flex-col justify-center"${_scopeId}><span class="inline-block px-3 py-1 mb-4 text-xs font-semibold text-white bg-indigo-600 rounded-full w-fit"${_scopeId}>Human Resources</span><h2 class="text-3xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors"${_scopeId}>EntClass 1</h2><p class="text-slate-600 mb-4"${_scopeId}>Sebuah program pelatihan berwirausaha yang dirancang untuk mahasiswa, fokus pada pengembangan keterampilan bisnis seperti analisis pasar, perencanaan bisnis, dan pengembangan produk.</p><a href="#" class="inline-flex items-center font-bold text-indigo-600 w-fit"${_scopeId}> Baca Selengkapnya <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg></a></div></div></section><section class="mb-20"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"${_scopeId}><!--[-->`);
            ssrRenderList(activities, (activity) => {
              _push2(`<div class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"${_scopeId}><div class="relative overflow-hidden h-48 rounded-t-xl"${_scopeId}><img${ssrRenderAttr("src", activity.image)}${ssrRenderAttr("alt", activity.title)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"${_scopeId}></div><div class="p-6 flex flex-col flex-grow"${_scopeId}><span class="${ssrRenderClass([activity.badgeColor, "px-3 py-1 rounded-full text-xs font-medium w-fit mb-3"])}"${_scopeId}>${ssrInterpolate(activity.department)}</span><h3 class="text-lg font-bold text-slate-900 mb-2 flex-grow"${_scopeId}>${ssrInterpolate(activity.title)}</h3><p class="text-sm text-slate-600 mb-4"${_scopeId}>${ssrInterpolate(activity.description)}</p><a href="#" class="mt-auto font-semibold text-sm text-primary w-fit"${_scopeId}>Lihat Detail →</a></div></div>`);
            });
            _push2(`<!--]--></div></section></div></main>`);
          } else {
            return [
              createVNode("main", null, [
                createVNode("div", { class: "relative pt-48 pb-30 px-6 text-center bg-gray-900 overflow-hidden" }, [
                  createVNode("div", {
                    class: "absolute inset-0 bg-cover bg-center opacity-20",
                    style: { "background-image": "url('/assets/entclass.JPG')" }
                  }),
                  createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" }),
                  createVNode("div", { class: "relative z-10 items-center justify-center" }, [
                    createVNode("h1", { class: "text-4xl sm:text-5xl font-black text-white mb-4 mx-auto" }, "Dokumentasi Kegiatan SEEO"),
                    createVNode("p", { class: "text-lg text-white/80 max-w-3xl mx-auto" }, "Jelajahi berbagai program dan aktivitas yang telah kami selenggarakan untuk membangun dan menginspirasi jiwa wirausaha di kalangan mahasiswa.")
                  ])
                ]),
                createVNode("div", { class: "max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8" }, [
                  createVNode("section", { class: "mb-20" }, [
                    createVNode("div", { class: "group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" }, [
                      createVNode("div", { class: "relative overflow-hidden rounded-xl h-96" }, [
                        createVNode("img", {
                          src: "/storage/local/images/compro/entclass.JPG",
                          alt: "EntClass",
                          class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        })
                      ]),
                      createVNode("div", { class: "flex flex-col justify-center" }, [
                        createVNode("span", { class: "inline-block px-3 py-1 mb-4 text-xs font-semibold text-white bg-indigo-600 rounded-full w-fit" }, "Human Resources"),
                        createVNode("h2", { class: "text-3xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors" }, "EntClass 1"),
                        createVNode("p", { class: "text-slate-600 mb-4" }, "Sebuah program pelatihan berwirausaha yang dirancang untuk mahasiswa, fokus pada pengembangan keterampilan bisnis seperti analisis pasar, perencanaan bisnis, dan pengembangan produk."),
                        createVNode("a", {
                          href: "#",
                          class: "inline-flex items-center font-bold text-indigo-600 w-fit"
                        }, [
                          createTextVNode(" Baca Selengkapnya "),
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 ml-2 transition-transform group-hover:translate-x-1",
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
                        ])
                      ])
                    ])
                  ]),
                  createVNode("section", { class: "mb-20" }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(activities, (activity) => {
                        return createVNode("div", {
                          key: activity.title,
                          class: "group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                        }, [
                          createVNode("div", { class: "relative overflow-hidden h-48 rounded-t-xl" }, [
                            createVNode("img", {
                              src: activity.image,
                              alt: activity.title,
                              class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            }, null, 8, ["src", "alt"])
                          ]),
                          createVNode("div", { class: "p-6 flex flex-col flex-grow" }, [
                            createVNode("span", {
                              class: [activity.badgeColor, "px-3 py-1 rounded-full text-xs font-medium w-fit mb-3"]
                            }, toDisplayString(activity.department), 3),
                            createVNode("h3", { class: "text-lg font-bold text-slate-900 mb-2 flex-grow" }, toDisplayString(activity.title), 1),
                            createVNode("p", { class: "text-sm text-slate-600 mb-4" }, toDisplayString(activity.description), 1),
                            createVNode("a", {
                              href: "#",
                              class: "mt-auto font-semibold text-sm text-primary w-fit"
                            }, "Lihat Detail →")
                          ])
                        ]);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Activity.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
