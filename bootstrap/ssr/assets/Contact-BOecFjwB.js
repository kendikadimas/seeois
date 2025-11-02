import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./PublicLayout-rYv0gHJQ.js";
import { Head } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Contact",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Hubungi Kami - SEEO" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main${_scopeId}><section class="relative bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white pt-48 pb-24 px-6 text-center"${_scopeId}><div class="relative z-10"${_scopeId}><h1 class="text-4xl sm:text-6xl font-black mb-4"${_scopeId}>Hubungi Kami</h1><p class="text-lg text-white/80 max-w-3xl mx-auto"${_scopeId}>Kami siap mendengar dari Anda. Kirimkan pertanyaan, saran, atau ide kolaborasi melalui informasi di bawah ini.</p></div></section><section class="py-20 px-4 sm:px-6 lg:px-8"${_scopeId}><div class="max-w-7xl mx-auto"${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-2 gap-16"${_scopeId}><div class="bg-white p-8 md:p-10 rounded-2xl shadow-xl"${_scopeId}><h2 class="text-3xl font-bold text-slate-900 mb-2"${_scopeId}>Kirim Pesan</h2><p class="text-slate-600 mb-8"${_scopeId}>Isi formulir di bawah ini dan tim kami akan segera merespons.</p><form action="#" method="POST" class="space-y-6"${_scopeId}><div${_scopeId}><label for="full-name" class="block text-sm font-medium text-gray-700"${_scopeId}>Nama Lengkap</label><div class="mt-1"${_scopeId}><input type="text" name="full-name" id="full-name" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"${_scopeId}></div></div><div${_scopeId}><label for="email" class="block text-sm font-medium text-gray-700"${_scopeId}>Alamat Email</label><div class="mt-1"${_scopeId}><input type="email" name="email" id="email" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"${_scopeId}></div></div><div${_scopeId}><label for="message" class="block text-sm font-medium text-gray-700"${_scopeId}>Pesan</label><div class="mt-1"${_scopeId}><textarea id="message" name="message" rows="4" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"${_scopeId}></textarea></div></div><div${_scopeId}><button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105"${_scopeId}> Kirim Pesan </button></div></form></div><div${_scopeId}><h2 class="text-3xl font-bold text-slate-900 mb-6"${_scopeId}>Informasi Kontak</h2><ul class="space-y-6 text-slate-600"${_scopeId}><li class="flex items-start space-x-4"${_scopeId}><div class="flex-shrink-0 w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center"${_scopeId}><i class="bi bi-geo-alt-fill text-xl"${_scopeId}></i></div><div${_scopeId}><h4 class="font-bold text-slate-800"${_scopeId}>Alamat</h4><p${_scopeId}>Fakultas Teknik, Universitas Jenderal Soedirman</p></div></li><li class="flex items-start space-x-4"${_scopeId}><div class="flex-shrink-0 w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center"${_scopeId}><i class="bi bi-envelope-fill text-xl"${_scopeId}></i></div><div${_scopeId}><h4 class="font-bold text-slate-800"${_scopeId}>Email</h4><a href="mailto:seeoftunsoed@gmail.com" class="hover:text-primary"${_scopeId}>seeoftunsoed@gmail.com</a></div></li><li class="flex items-start space-x-4"${_scopeId}><div class="flex-shrink-0 w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center"${_scopeId}><i class="bi bi-instagram text-xl"${_scopeId}></i></div><div${_scopeId}><h4 class="font-bold text-slate-800"${_scopeId}>Media Sosial</h4><a href="https://instagram.com/seeo_ftunsoed" class="hover:text-primary"${_scopeId}>@seeo_ftunsoed</a></div></li></ul></div></div></div></section></main>`);
          } else {
            return [
              createVNode("main", null, [
                createVNode("section", { class: "relative bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white pt-48 pb-24 px-6 text-center" }, [
                  createVNode("div", { class: "relative z-10" }, [
                    createVNode("h1", { class: "text-4xl sm:text-6xl font-black mb-4" }, "Hubungi Kami"),
                    createVNode("p", { class: "text-lg text-white/80 max-w-3xl mx-auto" }, "Kami siap mendengar dari Anda. Kirimkan pertanyaan, saran, atau ide kolaborasi melalui informasi di bawah ini.")
                  ])
                ]),
                createVNode("section", { class: "py-20 px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "max-w-7xl mx-auto" }, [
                    createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-16" }, [
                      createVNode("div", { class: "bg-white p-8 md:p-10 rounded-2xl shadow-xl" }, [
                        createVNode("h2", { class: "text-3xl font-bold text-slate-900 mb-2" }, "Kirim Pesan"),
                        createVNode("p", { class: "text-slate-600 mb-8" }, "Isi formulir di bawah ini dan tim kami akan segera merespons."),
                        createVNode("form", {
                          action: "#",
                          method: "POST",
                          class: "space-y-6"
                        }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "full-name",
                              class: "block text-sm font-medium text-gray-700"
                            }, "Nama Lengkap"),
                            createVNode("div", { class: "mt-1" }, [
                              createVNode("input", {
                                type: "text",
                                name: "full-name",
                                id: "full-name",
                                class: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                              })
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "email",
                              class: "block text-sm font-medium text-gray-700"
                            }, "Alamat Email"),
                            createVNode("div", { class: "mt-1" }, [
                              createVNode("input", {
                                type: "email",
                                name: "email",
                                id: "email",
                                class: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                              })
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "message",
                              class: "block text-sm font-medium text-gray-700"
                            }, "Pesan"),
                            createVNode("div", { class: "mt-1" }, [
                              createVNode("textarea", {
                                id: "message",
                                name: "message",
                                rows: "4",
                                class: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                              })
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("button", {
                              type: "submit",
                              class: "w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
                            }, " Kirim Pesan ")
                          ])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-3xl font-bold text-slate-900 mb-6" }, "Informasi Kontak"),
                        createVNode("ul", { class: "space-y-6 text-slate-600" }, [
                          createVNode("li", { class: "flex items-start space-x-4" }, [
                            createVNode("div", { class: "flex-shrink-0 w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center" }, [
                              createVNode("i", { class: "bi bi-geo-alt-fill text-xl" })
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", { class: "font-bold text-slate-800" }, "Alamat"),
                              createVNode("p", null, "Fakultas Teknik, Universitas Jenderal Soedirman")
                            ])
                          ]),
                          createVNode("li", { class: "flex items-start space-x-4" }, [
                            createVNode("div", { class: "flex-shrink-0 w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center" }, [
                              createVNode("i", { class: "bi bi-envelope-fill text-xl" })
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", { class: "font-bold text-slate-800" }, "Email"),
                              createVNode("a", {
                                href: "mailto:seeoftunsoed@gmail.com",
                                class: "hover:text-primary"
                              }, "seeoftunsoed@gmail.com")
                            ])
                          ]),
                          createVNode("li", { class: "flex items-start space-x-4" }, [
                            createVNode("div", { class: "flex-shrink-0 w-12 h-12 bg-blue-100 text-primary rounded-lg flex items-center justify-center" }, [
                              createVNode("i", { class: "bi bi-instagram text-xl" })
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", { class: "font-bold text-slate-800" }, "Media Sosial"),
                              createVNode("a", {
                                href: "https://instagram.com/seeo_ftunsoed",
                                class: "hover:text-primary"
                              }, "@seeo_ftunsoed")
                            ])
                          ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
