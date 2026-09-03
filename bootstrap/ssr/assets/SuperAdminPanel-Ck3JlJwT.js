import { unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-BSa5kc_g.js";
import { Head } from "@inertiajs/vue3";
import "./ModalConfirmation-CaKJYApU.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "SuperAdminPanel",
  __ssrInlineRender: true,
  props: {
    env: Object,
    notif: Object
  },
  setup(__props) {
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Super Admin Panel" }, null, _parent));
      _push(ssrRenderComponent(StaffLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h2 class="font-black text-2xl text-[#004182] uppercase tracking-tighter"${_scopeId}>Super Admin <span class="text-[#FFD700]"${_scopeId}>Panel</span></h2><p class="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1"${_scopeId}>Sistem Management &amp; API Configuration</p></div><div class="px-4 py-2 bg-red-100 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-200 animate-pulse"${_scopeId}> High Privileged Access </div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("div", null, [
                  createVNode("h2", { class: "font-black text-2xl text-[#004182] uppercase tracking-tighter" }, [
                    createTextVNode("Super Admin "),
                    createVNode("span", { class: "text-[#FFD700]" }, "Panel")
                  ]),
                  createVNode("p", { class: "text-sm text-gray-400 font-bold uppercase tracking-widest mt-1" }, "Sistem Management & API Configuration")
                ]),
                createVNode("div", { class: "px-4 py-2 bg-red-100 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-200 animate-pulse" }, " High Privileged Access ")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12 px-6 max-w-7xl mx-auto"${_scopeId}><div class="grid md:grid-cols-2 gap-8"${_scopeId}><div class="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden"${_scopeId}><div class="p-8 md:p-12"${_scopeId}><div class="flex items-center gap-4 mb-8"${_scopeId}><div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#004182]"${_scopeId}><i class="bi bi-google-drive text-2xl"${_scopeId}></i></div><div${_scopeId}><h3 class="text-xl font-black text-[#004182] uppercase tracking-tight"${_scopeId}>Google Drive API</h3><p class="text-sm text-gray-400 font-medium"${_scopeId}>Refresh Token &amp; Connection Status</p></div></div><div class="bg-[#004182]/5 text-[#004182] rounded-3xl p-6 border border-[#004182]/10 mb-8 text-xs font-bold flex gap-4"${_scopeId}><div class="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0"${_scopeId}><i class="bi bi-shield-lock-fill text-xl"${_scopeId}></i></div><div${_scopeId}><span class="uppercase tracking-widest text-[9px] block text-amber-600 font-black mb-1"${_scopeId}>Konfigurasi Dikunci Secara Aman</span> Kredensial tidak pernah dikirim ke browser dan hanya dapat diubah melalui environment server. Gunakan <strong${_scopeId}>Refresh Google Token</strong> jika otorisasi perlu diperbarui. </div></div><div class="space-y-6 mb-10"${_scopeId}><div class="grid grid-cols-3 gap-3"${_scopeId}><!--[-->`);
            ssrRenderList([
              ["Client ID", __props.env.has_google_client],
              ["Client Secret", __props.env.has_google_secret],
              ["Refresh Token", __props.env.has_refresh_token]
            ], (item) => {
              _push2(`<div class="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center"${_scopeId}><div class="text-[9px] font-black uppercase text-gray-400 tracking-wider mb-2"${_scopeId}>${ssrInterpolate(item[0])}</div><span class="${ssrRenderClass([item[1] ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600", "px-2 py-1 rounded-full text-[8px] font-black uppercase"])}"${_scopeId}>${ssrInterpolate(item[1] ? "Configured" : "Missing")}</span></div>`);
            });
            _push2(`<!--]--></div><div class="p-4 bg-gray-50 rounded-2xl border border-gray-100"${_scopeId}><label class="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2"${_scopeId}>Application URL</label><code class="text-[10px] font-bold text-gray-600 break-all"${_scopeId}>${ssrInterpolate(__props.env.app_url)}</code></div><div class="p-4 bg-blue-50 rounded-2xl border border-blue-100"${_scopeId}><label class="block text-[9px] font-black text-[#004182] uppercase tracking-widest mb-2 ps-1"${_scopeId}>Authorized Redirect URI</label><div class="flex items-center gap-3"${_scopeId}><code class="flex-1 text-[10px] font-bold text-[#004182] break-all truncate"${_scopeId}>${ssrInterpolate(__props.env.callback_uri)}</code><button type="button" class="text-[#004182] hover:scale-110 transition-transform"${_scopeId}><i class="bi bi-clipboard"${_scopeId}></i></button></div><p class="text-[9px] text-blue-400 mt-2 font-bold uppercase tracking-tighter italic"${_scopeId}>Copy &amp; paste link ini ke Google Cloud Console</p></div></div><a href="/google-drive/auth" class="flex items-center justify-center gap-3 w-full py-5 bg-[#004182] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#003162] hover:shadow-xl transition-all"${_scopeId}><i class="bi bi-arrow-repeat text-lg"${_scopeId}></i> Refresh Google Token </a></div></div><div class="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden"${_scopeId}><div class="p-8 md:p-12"${_scopeId}><div class="flex items-center gap-4 mb-8"${_scopeId}><div class="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600"${_scopeId}><i class="bi bi-shield-lock text-2xl"${_scopeId}></i></div><div${_scopeId}><h3 class="text-xl font-black text-[#004182] uppercase tracking-tight"${_scopeId}>System Guard</h3><p class="text-sm text-gray-400 font-medium"${_scopeId}>Security &amp; Maintenance Tools</p></div></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div class="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center"${_scopeId}><div class="text-2xl mb-2"${_scopeId}><i class="bi bi-hdd-network text-gray-400"${_scopeId}></i></div><div class="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1"${_scopeId}>Cache</div><div class="text-sm font-black text-[#004182]"${_scopeId}>Optimized</div></div><div class="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center"${_scopeId}><div class="text-2xl mb-2"${_scopeId}><i class="bi bi-safe text-gray-400"${_scopeId}></i></div><div class="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1"${_scopeId}>Backup</div><div class="text-sm font-black text-[#004182]"${_scopeId}>Automated</div></div></div><div class="mt-10 p-8 border-2 border-dashed border-gray-100 rounded-[2rem] text-center"${_scopeId}><p class="text-xs text-gray-400 font-bold uppercase tracking-widest leading-loose"${_scopeId}> Additional super admin features<br${_scopeId}>will be integrated here. </p></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12 px-6 max-w-7xl mx-auto" }, [
                createVNode("div", { class: "grid md:grid-cols-2 gap-8" }, [
                  createVNode("div", { class: "bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden" }, [
                    createVNode("div", { class: "p-8 md:p-12" }, [
                      createVNode("div", { class: "flex items-center gap-4 mb-8" }, [
                        createVNode("div", { class: "w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#004182]" }, [
                          createVNode("i", { class: "bi bi-google-drive text-2xl" })
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-xl font-black text-[#004182] uppercase tracking-tight" }, "Google Drive API"),
                          createVNode("p", { class: "text-sm text-gray-400 font-medium" }, "Refresh Token & Connection Status")
                        ])
                      ]),
                      createVNode("div", { class: "bg-[#004182]/5 text-[#004182] rounded-3xl p-6 border border-[#004182]/10 mb-8 text-xs font-bold flex gap-4" }, [
                        createVNode("div", { class: "w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0" }, [
                          createVNode("i", { class: "bi bi-shield-lock-fill text-xl" })
                        ]),
                        createVNode("div", null, [
                          createVNode("span", { class: "uppercase tracking-widest text-[9px] block text-amber-600 font-black mb-1" }, "Konfigurasi Dikunci Secara Aman"),
                          createTextVNode(" Kredensial tidak pernah dikirim ke browser dan hanya dapat diubah melalui environment server. Gunakan "),
                          createVNode("strong", null, "Refresh Google Token"),
                          createTextVNode(" jika otorisasi perlu diperbarui. ")
                        ])
                      ]),
                      createVNode("div", { class: "space-y-6 mb-10" }, [
                        createVNode("div", { class: "grid grid-cols-3 gap-3" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList([
                            ["Client ID", __props.env.has_google_client],
                            ["Client Secret", __props.env.has_google_secret],
                            ["Refresh Token", __props.env.has_refresh_token]
                          ], (item) => {
                            return openBlock(), createBlock("div", {
                              key: item[0],
                              class: "p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center"
                            }, [
                              createVNode("div", { class: "text-[9px] font-black uppercase text-gray-400 tracking-wider mb-2" }, toDisplayString(item[0]), 1),
                              createVNode("span", {
                                class: [item[1] ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600", "px-2 py-1 rounded-full text-[8px] font-black uppercase"]
                              }, toDisplayString(item[1] ? "Configured" : "Missing"), 3)
                            ]);
                          }), 128))
                        ]),
                        createVNode("div", { class: "p-4 bg-gray-50 rounded-2xl border border-gray-100" }, [
                          createVNode("label", { class: "block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2" }, "Application URL"),
                          createVNode("code", { class: "text-[10px] font-bold text-gray-600 break-all" }, toDisplayString(__props.env.app_url), 1)
                        ]),
                        createVNode("div", { class: "p-4 bg-blue-50 rounded-2xl border border-blue-100" }, [
                          createVNode("label", { class: "block text-[9px] font-black text-[#004182] uppercase tracking-widest mb-2 ps-1" }, "Authorized Redirect URI"),
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("code", { class: "flex-1 text-[10px] font-bold text-[#004182] break-all truncate" }, toDisplayString(__props.env.callback_uri), 1),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => copyToClipboard(__props.env.callback_uri),
                              class: "text-[#004182] hover:scale-110 transition-transform"
                            }, [
                              createVNode("i", { class: "bi bi-clipboard" })
                            ], 8, ["onClick"])
                          ]),
                          createVNode("p", { class: "text-[9px] text-blue-400 mt-2 font-bold uppercase tracking-tighter italic" }, "Copy & paste link ini ke Google Cloud Console")
                        ])
                      ]),
                      createVNode("a", {
                        href: "/google-drive/auth",
                        class: "flex items-center justify-center gap-3 w-full py-5 bg-[#004182] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#003162] hover:shadow-xl transition-all"
                      }, [
                        createVNode("i", { class: "bi bi-arrow-repeat text-lg" }),
                        createTextVNode(" Refresh Google Token ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden" }, [
                    createVNode("div", { class: "p-8 md:p-12" }, [
                      createVNode("div", { class: "flex items-center gap-4 mb-8" }, [
                        createVNode("div", { class: "w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600" }, [
                          createVNode("i", { class: "bi bi-shield-lock text-2xl" })
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-xl font-black text-[#004182] uppercase tracking-tight" }, "System Guard"),
                          createVNode("p", { class: "text-sm text-gray-400 font-medium" }, "Security & Maintenance Tools")
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode("div", { class: "p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center" }, [
                          createVNode("div", { class: "text-2xl mb-2" }, [
                            createVNode("i", { class: "bi bi-hdd-network text-gray-400" })
                          ]),
                          createVNode("div", { class: "text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1" }, "Cache"),
                          createVNode("div", { class: "text-sm font-black text-[#004182]" }, "Optimized")
                        ]),
                        createVNode("div", { class: "p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center" }, [
                          createVNode("div", { class: "text-2xl mb-2" }, [
                            createVNode("i", { class: "bi bi-safe text-gray-400" })
                          ]),
                          createVNode("div", { class: "text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1" }, "Backup"),
                          createVNode("div", { class: "text-sm font-black text-[#004182]" }, "Automated")
                        ])
                      ]),
                      createVNode("div", { class: "mt-10 p-8 border-2 border-dashed border-gray-100 rounded-[2rem] text-center" }, [
                        createVNode("p", { class: "text-xs text-gray-400 font-bold uppercase tracking-widest leading-loose" }, [
                          createTextVNode(" Additional super admin features"),
                          createVNode("br"),
                          createTextVNode("will be integrated here. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/SuperAdminPanel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=SuperAdminPanel-Ck3JlJwT.js.map
