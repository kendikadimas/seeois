import { unref, withCtx, createVNode, withModifiers, withDirectives, vModelText, createTextVNode, toDisplayString, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-CmduQjnL.js";
import { useForm, Head } from "@inertiajs/vue3";
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
    const props = __props;
    const form = useForm({
      google_client_id: props.env.google_client_id || "",
      google_client_secret: props.env.google_client_secret || "",
      google_drive_folder: props.env.google_drive_folder || "",
      app_url: props.env.app_url || ""
    });
    const submitConfig = () => {
      form.post("/seeo/staff/super-admin/google-drive", {
        preserveScroll: true,
        onSuccess: () => {
        }
      });
    };
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
            _push2(`<div class="py-12 px-6 max-w-7xl mx-auto"${_scopeId}><div class="grid md:grid-cols-2 gap-8"${_scopeId}><div class="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden"${_scopeId}><div class="p-8 md:p-12"${_scopeId}><div class="flex items-center gap-4 mb-8"${_scopeId}><div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#004182]"${_scopeId}><i class="bi bi-google-drive text-2xl"${_scopeId}></i></div><div${_scopeId}><h3 class="text-xl font-black text-[#004182] uppercase tracking-tight"${_scopeId}>Google Drive API</h3><p class="text-sm text-gray-400 font-medium"${_scopeId}>Refresh Token &amp; Connection Status</p></div></div><form class="space-y-6 mb-10"${_scopeId}><div${_scopeId}><label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ps-1"${_scopeId}>Application URL (APP_URL)</label><input${ssrRenderAttr("value", unref(form).app_url)} type="text" class="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-[#004182] focus:ring-2 focus:ring-[#004182]/10 focus:border-[#004182] transition-all" placeholder="Contoh: http://localhost:8000"${_scopeId}><p class="text-[10px] text-gray-400 mt-2 font-medium ps-1"${_scopeId}>Pastikan URL ini sesuai dengan yang Anda buka di browser saat ini.</p></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ps-1"${_scopeId}>Client ID</label><input${ssrRenderAttr("value", unref(form).google_client_id)} type="text" class="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-[#004182] focus:ring-2 focus:ring-[#004182]/10 focus:border-[#004182] transition-all" placeholder="Google Client ID"${_scopeId}></div><div${_scopeId}><label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ps-1"${_scopeId}>Client Secret</label><input${ssrRenderAttr("value", unref(form).google_client_secret)} type="password" class="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-[#004182] focus:ring-2 focus:ring-[#004182]/10 focus:border-[#004182] transition-all" placeholder="Google Client Secret"${_scopeId}></div></div><div${_scopeId}><label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ps-1"${_scopeId}>Google Drive Folder ID</label><input${ssrRenderAttr("value", unref(form).google_drive_folder)} type="text" class="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-[#004182] focus:ring-2 focus:ring-[#004182]/10 focus:border-[#004182] transition-all" placeholder="Google Drive Folder ID (Contoh: 1A2B3C4D...)"${_scopeId}><p class="text-[10px] text-orange-500 mt-2 font-medium ps-1"${_scopeId}><i class="bi bi-exclamation-triangle-fill me-1"${_scopeId}></i><strong${_scopeId}>PENTING:</strong> Masukkan <strong${_scopeId}>Folder ID</strong> Anda (deretan karakter unik dari URL folder Google Drive), <strong${_scopeId}>BUKAN</strong> nama folder. Ini sangat penting untuk mencegah bug duplikasi folder tak terbatas di Google Drive Anda. </p></div><div class="p-4 bg-blue-50 rounded-2xl border border-blue-100"${_scopeId}><label class="block text-[9px] font-black text-[#004182] uppercase tracking-widest mb-2 ps-1"${_scopeId}>Authorized Redirect URI</label><div class="flex items-center gap-3"${_scopeId}><code class="flex-1 text-[10px] font-bold text-[#004182] break-all truncate"${_scopeId}>${ssrInterpolate(__props.env.callback_uri)}</code><button type="button" class="text-[#004182] hover:scale-110 transition-transform"${_scopeId}><i class="bi bi-clipboard"${_scopeId}></i></button></div><p class="text-[9px] text-blue-400 mt-2 font-bold uppercase tracking-tighter italic"${_scopeId}>Copy &amp; paste link ini ke Google Cloud Console</p></div><div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100"${_scopeId}><span class="text-xs font-bold text-gray-500 uppercase tracking-widest"${_scopeId}>Refresh Token Status</span>`);
            if (__props.env.has_refresh_token) {
              _push2(`<span class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest"${_scopeId}>Active</span>`);
            } else {
              _push2(`<span class="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[9px] font-black uppercase tracking-widest"${_scopeId}>Not Set</span>`);
            }
            _push2(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="w-full py-4 bg-[#FFD700] text-[#004182] rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50"${_scopeId}><i class="bi bi-save2 me-2"${_scopeId}></i> ${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Konfigurasi")}</button></form><div class="bg-[#004182]/5 rounded-3xl p-6 border border-[#004182]/10 mb-6"${_scopeId}><p class="text-xs text-gray-600 leading-relaxed font-medium"${_scopeId}><i class="bi bi-info-circle-fill text-[#004182] mr-2"${_scopeId}></i> Setelah menyimpan Client ID &amp; Secret, klik tombol di bawah untuk mendapatkan <strong${_scopeId}>Refresh Token</strong> baru. </p></div><a href="/google-drive/auth" class="flex items-center justify-center gap-3 w-full py-5 border-2 border-[#004182] text-[#004182] rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#004182] hover:text-white transition-all"${_scopeId}><i class="bi bi-arrow-repeat text-lg"${_scopeId}></i> Refresh Google Token </a></div></div><div class="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden"${_scopeId}><div class="p-8 md:p-12"${_scopeId}><div class="flex items-center gap-4 mb-8"${_scopeId}><div class="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600"${_scopeId}><i class="bi bi-shield-lock text-2xl"${_scopeId}></i></div><div${_scopeId}><h3 class="text-xl font-black text-[#004182] uppercase tracking-tight"${_scopeId}>System Guard</h3><p class="text-sm text-gray-400 font-medium"${_scopeId}>Security &amp; Maintenance Tools</p></div></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div class="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center"${_scopeId}><div class="text-2xl mb-2"${_scopeId}><i class="bi bi-hdd-network text-gray-400"${_scopeId}></i></div><div class="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1"${_scopeId}>Cache</div><div class="text-sm font-black text-[#004182]"${_scopeId}>Optimized</div></div><div class="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center"${_scopeId}><div class="text-2xl mb-2"${_scopeId}><i class="bi bi-safe text-gray-400"${_scopeId}></i></div><div class="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1"${_scopeId}>Backup</div><div class="text-sm font-black text-[#004182]"${_scopeId}>Automated</div></div></div><div class="mt-10 p-8 border-2 border-dashed border-gray-100 rounded-[2rem] text-center"${_scopeId}><p class="text-xs text-gray-400 font-bold uppercase tracking-widest leading-loose"${_scopeId}> Additional super admin features<br${_scopeId}>will be integrated here. </p></div></div></div></div></div>`);
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
                      createVNode("form", {
                        onSubmit: withModifiers(submitConfig, ["prevent"]),
                        class: "space-y-6 mb-10"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ps-1" }, "Application URL (APP_URL)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).app_url = $event,
                            type: "text",
                            class: "w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-[#004182] focus:ring-2 focus:ring-[#004182]/10 focus:border-[#004182] transition-all",
                            placeholder: "Contoh: http://localhost:8000"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).app_url]
                          ]),
                          createVNode("p", { class: "text-[10px] text-gray-400 mt-2 font-medium ps-1" }, "Pastikan URL ini sesuai dengan yang Anda buka di browser saat ini.")
                        ]),
                        createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ps-1" }, "Client ID"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).google_client_id = $event,
                              type: "text",
                              class: "w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-[#004182] focus:ring-2 focus:ring-[#004182]/10 focus:border-[#004182] transition-all",
                              placeholder: "Google Client ID"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).google_client_id]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ps-1" }, "Client Secret"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).google_client_secret = $event,
                              type: "password",
                              class: "w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-[#004182] focus:ring-2 focus:ring-[#004182]/10 focus:border-[#004182] transition-all",
                              placeholder: "Google Client Secret"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).google_client_secret]
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ps-1" }, "Google Drive Folder ID"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).google_drive_folder = $event,
                            type: "text",
                            class: "w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-[#004182] focus:ring-2 focus:ring-[#004182]/10 focus:border-[#004182] transition-all",
                            placeholder: "Google Drive Folder ID (Contoh: 1A2B3C4D...)"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).google_drive_folder]
                          ]),
                          createVNode("p", { class: "text-[10px] text-orange-500 mt-2 font-medium ps-1" }, [
                            createVNode("i", { class: "bi bi-exclamation-triangle-fill me-1" }),
                            createVNode("strong", null, "PENTING:"),
                            createTextVNode(" Masukkan "),
                            createVNode("strong", null, "Folder ID"),
                            createTextVNode(" Anda (deretan karakter unik dari URL folder Google Drive), "),
                            createVNode("strong", null, "BUKAN"),
                            createTextVNode(" nama folder. Ini sangat penting untuk mencegah bug duplikasi folder tak terbatas di Google Drive Anda. ")
                          ])
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
                        ]),
                        createVNode("div", { class: "flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100" }, [
                          createVNode("span", { class: "text-xs font-bold text-gray-500 uppercase tracking-widest" }, "Refresh Token Status"),
                          __props.env.has_refresh_token ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "px-3 py-1 bg-green-100 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest"
                          }, "Active")) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[9px] font-black uppercase tracking-widest"
                          }, "Not Set"))
                        ]),
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "w-full py-4 bg-[#FFD700] text-[#004182] rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50"
                        }, [
                          createVNode("i", { class: "bi bi-save2 me-2" }),
                          createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Konfigurasi"), 1)
                        ], 8, ["disabled"])
                      ], 32),
                      createVNode("div", { class: "bg-[#004182]/5 rounded-3xl p-6 border border-[#004182]/10 mb-6" }, [
                        createVNode("p", { class: "text-xs text-gray-600 leading-relaxed font-medium" }, [
                          createVNode("i", { class: "bi bi-info-circle-fill text-[#004182] mr-2" }),
                          createTextVNode(" Setelah menyimpan Client ID & Secret, klik tombol di bawah untuk mendapatkan "),
                          createVNode("strong", null, "Refresh Token"),
                          createTextVNode(" baru. ")
                        ])
                      ]),
                      createVNode("a", {
                        href: "/google-drive/auth",
                        class: "flex items-center justify-center gap-3 w-full py-5 border-2 border-[#004182] text-[#004182] rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#004182] hover:text-white transition-all"
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
//# sourceMappingURL=SuperAdminPanel-2urfSd5V.js.map
