import { unref, withCtx, createVNode, createBlock, createTextVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-D7aJ64SH.js";
import { Head } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Contact",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Hubungi Kami - SEEO" }, null, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main data-v-12beed4c${_scopeId}><section class="relative text-white pt-48 pb-24 px-6 text-center" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)" })}" data-v-12beed4c${_scopeId}><div class="relative z-10 max-w-7xl mx-auto" data-v-12beed4c${_scopeId}><div class="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium mb-6" data-v-12beed4c${_scopeId}><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-12beed4c${_scopeId}><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" data-v-12beed4c${_scopeId}></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" data-v-12beed4c${_scopeId}></path></svg> Hubungi Kami </div><h1 class="text-4xl sm:text-6xl font-bold mb-4" data-v-12beed4c${_scopeId}>Hubungi Kami</h1><p class="text-lg max-w-3xl mx-auto text-slate-300" data-v-12beed4c${_scopeId}>Kami siap mendengar dari Anda. Kirimkan pertanyaan, saran, atau ide kolaborasi melalui informasi di bawah ini.</p></div></section><section class="py-20 px-4 sm:px-6 lg:px-8" style="${ssrRenderStyle({ "background": "#f8fafc" })}" data-v-12beed4c${_scopeId}><div class="max-w-7xl mx-auto" data-v-12beed4c${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-2 gap-16" data-v-12beed4c${_scopeId}><div class="bg-white p-8 md:p-10 rounded-2xl shadow-xl" data-v-12beed4c${_scopeId}><h2 class="text-3xl font-bold mb-2" style="${ssrRenderStyle({ "color": "#0f172a" })}" data-v-12beed4c${_scopeId}>Kirim Pesan</h2><p class="mb-8" style="${ssrRenderStyle({ "color": "#64748b" })}" data-v-12beed4c${_scopeId}>Isi formulir di bawah ini dan tim kami akan segera merespons.</p><form action="#" method="POST" class="space-y-6" data-v-12beed4c${_scopeId}><div data-v-12beed4c${_scopeId}><label for="full-name" class="block text-sm font-medium" style="${ssrRenderStyle({ "color": "#374151" })}" data-v-12beed4c${_scopeId}>Nama Lengkap</label><div class="mt-1" data-v-12beed4c${_scopeId}><input type="text" name="full-name" id="full-name" class="block w-full rounded-md shadow-sm sm:text-sm p-3 transition-all duration-200" style="${ssrRenderStyle({ "border": "2px solid #d1d5db", "background": "white" })}" onfocus="this.style.borderColor=&#39;#3b82f6&#39;; this.style.boxShadow=&#39;0 0 0 3px rgba(59, 130, 246, 0.1)&#39;" onblur="this.style.borderColor=&#39;#d1d5db&#39;; this.style.boxShadow=&#39;none&#39;" data-v-12beed4c${_scopeId}></div></div><div data-v-12beed4c${_scopeId}><label for="email" class="block text-sm font-medium" style="${ssrRenderStyle({ "color": "#374151" })}" data-v-12beed4c${_scopeId}>Alamat Email</label><div class="mt-1" data-v-12beed4c${_scopeId}><input type="email" name="email" id="email" class="block w-full rounded-md shadow-sm sm:text-sm p-3 transition-all duration-200" style="${ssrRenderStyle({ "border": "2px solid #d1d5db", "background": "white" })}" onfocus="this.style.borderColor=&#39;#3b82f6&#39;; this.style.boxShadow=&#39;0 0 0 3px rgba(59, 130, 246, 0.1)&#39;" onblur="this.style.borderColor=&#39;#d1d5db&#39;; this.style.boxShadow=&#39;none&#39;" data-v-12beed4c${_scopeId}></div></div><div data-v-12beed4c${_scopeId}><label for="message" class="block text-sm font-medium" style="${ssrRenderStyle({ "color": "#374151" })}" data-v-12beed4c${_scopeId}>Pesan</label><div class="mt-1" data-v-12beed4c${_scopeId}><textarea id="message" name="message" rows="4" class="block w-full rounded-md shadow-sm sm:text-sm p-3 transition-all duration-200" style="${ssrRenderStyle({ "border": "2px solid #d1d5db", "background": "white", "resize": "vertical" })}" onfocus="this.style.borderColor=&#39;#3b82f6&#39;; this.style.boxShadow=&#39;0 0 0 3px rgba(59, 130, 246, 0.1)&#39;" onblur="this.style.borderColor=&#39;#d1d5db&#39;; this.style.boxShadow=&#39;none&#39;" data-v-12beed4c${_scopeId}></textarea></div></div><div data-v-12beed4c${_scopeId}><button type="submit" class="w-full flex justify-center py-3 px-4 border-0 rounded-lg shadow-lg text-sm font-bold text-white transition-all transform hover:scale-105 duration-300" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #3b82f6, #1d4ed8)", "box-shadow": "0 4px 15px rgba(59, 130, 246, 0.4)" })}" onmouseover="this.style.background=&#39;linear-gradient(135deg, #1d4ed8, #1e40af)&#39;" onmouseout="this.style.background=&#39;linear-gradient(135deg, #3b82f6, #1d4ed8)&#39;" data-v-12beed4c${_scopeId}> Kirim Pesan </button></div></form></div><div data-v-12beed4c${_scopeId}><h2 class="text-3xl font-bold mb-6" style="${ssrRenderStyle({ "color": "#0f172a" })}" data-v-12beed4c${_scopeId}>Informasi Kontak</h2><ul class="space-y-6" style="${ssrRenderStyle({ "color": "#64748b" })}" data-v-12beed4c${_scopeId}><li class="flex items-start space-x-4" data-v-12beed4c${_scopeId}><div class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #dbeafe, #bfdbfe)", "color": "#3b82f6" })}" data-v-12beed4c${_scopeId}><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" data-v-12beed4c${_scopeId}><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" data-v-12beed4c${_scopeId}></path></svg></div><div data-v-12beed4c${_scopeId}><h4 class="font-bold" style="${ssrRenderStyle({ "color": "#1e293b" })}" data-v-12beed4c${_scopeId}>Alamat</h4><p data-v-12beed4c${_scopeId}>Fakultas Teknik, Universitas Jenderal Soedirman</p><p data-v-12beed4c${_scopeId}>Purwokerto, Jawa Tengah</p></div></li><li class="flex items-start space-x-4" data-v-12beed4c${_scopeId}><div class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #dbeafe, #bfdbfe)", "color": "#3b82f6" })}" data-v-12beed4c${_scopeId}><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" data-v-12beed4c${_scopeId}><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" data-v-12beed4c${_scopeId}></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" data-v-12beed4c${_scopeId}></path></svg></div><div data-v-12beed4c${_scopeId}><h4 class="font-bold" style="${ssrRenderStyle({ "color": "#1e293b" })}" data-v-12beed4c${_scopeId}>Email</h4><a href="mailto:seeoftunsoed@gmail.com" class="transition-colors duration-200" style="${ssrRenderStyle({ "color": "#64748b" })}" onmouseover="this.style.color=&#39;#3b82f6&#39;" onmouseout="this.style.color=&#39;#64748b&#39;" data-v-12beed4c${_scopeId}>seeoftunsoed@gmail.com</a></div></li><li class="flex items-start space-x-4" data-v-12beed4c${_scopeId}><div class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #dbeafe, #bfdbfe)", "color": "#3b82f6" })}" data-v-12beed4c${_scopeId}><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" data-v-12beed4c${_scopeId}><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.724-1.378l-.701 2.67c-.256.982-.94 2.213-1.398 2.967C9.095 23.707 10.52 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017.001z" data-v-12beed4c${_scopeId}></path></svg></div><div data-v-12beed4c${_scopeId}><h4 class="font-bold" style="${ssrRenderStyle({ "color": "#1e293b" })}" data-v-12beed4c${_scopeId}>Media Sosial</h4><a href="https://instagram.com/seeo_ftunsoed" target="_blank" class="transition-colors duration-200" style="${ssrRenderStyle({ "color": "#64748b" })}" onmouseover="this.style.color=&#39;#3b82f6&#39;" onmouseout="this.style.color=&#39;#64748b&#39;" data-v-12beed4c${_scopeId}>@seeo_ftunsoed</a></div></li><li class="flex items-start space-x-4" data-v-12beed4c${_scopeId}><div class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #dbeafe, #bfdbfe)", "color": "#3b82f6" })}" data-v-12beed4c${_scopeId}><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" data-v-12beed4c${_scopeId}><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" data-v-12beed4c${_scopeId}></path></svg></div><div data-v-12beed4c${_scopeId}><h4 class="font-bold" style="${ssrRenderStyle({ "color": "#1e293b" })}" data-v-12beed4c${_scopeId}>Telepon</h4><p data-v-12beed4c${_scopeId}>Hubungi kami melalui email atau media sosial</p></div></li></ul></div></div></div></section></main>`);
          } else {
            return [
              createVNode("main", null, [
                createVNode("section", {
                  class: "relative text-white pt-48 pb-24 px-6 text-center",
                  style: { "background": "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)" }
                }, [
                  createVNode("div", { class: "relative z-10 max-w-7xl mx-auto" }, [
                    createVNode("div", { class: "inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium mb-6" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 mr-2",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", { d: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" }),
                        createVNode("path", { d: "M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" })
                      ])),
                      createTextVNode(" Hubungi Kami ")
                    ]),
                    createVNode("h1", { class: "text-4xl sm:text-6xl font-bold mb-4" }, "Hubungi Kami"),
                    createVNode("p", { class: "text-lg max-w-3xl mx-auto text-slate-300" }, "Kami siap mendengar dari Anda. Kirimkan pertanyaan, saran, atau ide kolaborasi melalui informasi di bawah ini.")
                  ])
                ]),
                createVNode("section", {
                  class: "py-20 px-4 sm:px-6 lg:px-8",
                  style: { "background": "#f8fafc" }
                }, [
                  createVNode("div", { class: "max-w-7xl mx-auto" }, [
                    createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-16" }, [
                      createVNode("div", { class: "bg-white p-8 md:p-10 rounded-2xl shadow-xl" }, [
                        createVNode("h2", {
                          class: "text-3xl font-bold mb-2",
                          style: { "color": "#0f172a" }
                        }, "Kirim Pesan"),
                        createVNode("p", {
                          class: "mb-8",
                          style: { "color": "#64748b" }
                        }, "Isi formulir di bawah ini dan tim kami akan segera merespons."),
                        createVNode("form", {
                          action: "#",
                          method: "POST",
                          class: "space-y-6"
                        }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "full-name",
                              class: "block text-sm font-medium",
                              style: { "color": "#374151" }
                            }, "Nama Lengkap"),
                            createVNode("div", { class: "mt-1" }, [
                              createVNode("input", {
                                type: "text",
                                name: "full-name",
                                id: "full-name",
                                class: "block w-full rounded-md shadow-sm sm:text-sm p-3 transition-all duration-200",
                                style: { "border": "2px solid #d1d5db", "background": "white" },
                                onfocus: "this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'",
                                onblur: "this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
                              })
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "email",
                              class: "block text-sm font-medium",
                              style: { "color": "#374151" }
                            }, "Alamat Email"),
                            createVNode("div", { class: "mt-1" }, [
                              createVNode("input", {
                                type: "email",
                                name: "email",
                                id: "email",
                                class: "block w-full rounded-md shadow-sm sm:text-sm p-3 transition-all duration-200",
                                style: { "border": "2px solid #d1d5db", "background": "white" },
                                onfocus: "this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'",
                                onblur: "this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
                              })
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "message",
                              class: "block text-sm font-medium",
                              style: { "color": "#374151" }
                            }, "Pesan"),
                            createVNode("div", { class: "mt-1" }, [
                              createVNode("textarea", {
                                id: "message",
                                name: "message",
                                rows: "4",
                                class: "block w-full rounded-md shadow-sm sm:text-sm p-3 transition-all duration-200",
                                style: { "border": "2px solid #d1d5db", "background": "white", "resize": "vertical" },
                                onfocus: "this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'",
                                onblur: "this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
                              })
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("button", {
                              type: "submit",
                              class: "w-full flex justify-center py-3 px-4 border-0 rounded-lg shadow-lg text-sm font-bold text-white transition-all transform hover:scale-105 duration-300",
                              style: { "background": "linear-gradient(135deg, #3b82f6, #1d4ed8)", "box-shadow": "0 4px 15px rgba(59, 130, 246, 0.4)" },
                              onmouseover: "this.style.background='linear-gradient(135deg, #1d4ed8, #1e40af)'",
                              onmouseout: "this.style.background='linear-gradient(135deg, #3b82f6, #1d4ed8)'"
                            }, " Kirim Pesan ")
                          ])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", {
                          class: "text-3xl font-bold mb-6",
                          style: { "color": "#0f172a" }
                        }, "Informasi Kontak"),
                        createVNode("ul", {
                          class: "space-y-6",
                          style: { "color": "#64748b" }
                        }, [
                          createVNode("li", { class: "flex items-start space-x-4" }, [
                            createVNode("div", {
                              class: "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300",
                              style: { "background": "linear-gradient(135deg, #dbeafe, #bfdbfe)", "color": "#3b82f6" }
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-6 h-6",
                                fill: "currentColor",
                                viewBox: "0 0 20 20"
                              }, [
                                createVNode("path", {
                                  "fill-rule": "evenodd",
                                  d: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z",
                                  "clip-rule": "evenodd"
                                })
                              ]))
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", {
                                class: "font-bold",
                                style: { "color": "#1e293b" }
                              }, "Alamat"),
                              createVNode("p", null, "Fakultas Teknik, Universitas Jenderal Soedirman"),
                              createVNode("p", null, "Purwokerto, Jawa Tengah")
                            ])
                          ]),
                          createVNode("li", { class: "flex items-start space-x-4" }, [
                            createVNode("div", {
                              class: "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300",
                              style: { "background": "linear-gradient(135deg, #dbeafe, #bfdbfe)", "color": "#3b82f6" }
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-6 h-6",
                                fill: "currentColor",
                                viewBox: "0 0 20 20"
                              }, [
                                createVNode("path", { d: "M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" }),
                                createVNode("path", { d: "M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" })
                              ]))
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", {
                                class: "font-bold",
                                style: { "color": "#1e293b" }
                              }, "Email"),
                              createVNode("a", {
                                href: "mailto:seeoftunsoed@gmail.com",
                                class: "transition-colors duration-200",
                                style: { "color": "#64748b" },
                                onmouseover: "this.style.color='#3b82f6'",
                                onmouseout: "this.style.color='#64748b'"
                              }, "seeoftunsoed@gmail.com")
                            ])
                          ]),
                          createVNode("li", { class: "flex items-start space-x-4" }, [
                            createVNode("div", {
                              class: "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300",
                              style: { "background": "linear-gradient(135deg, #dbeafe, #bfdbfe)", "color": "#3b82f6" }
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-6 h-6",
                                fill: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", { d: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.724-1.378l-.701 2.67c-.256.982-.94 2.213-1.398 2.967C9.095 23.707 10.52 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017.001z" })
                              ]))
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", {
                                class: "font-bold",
                                style: { "color": "#1e293b" }
                              }, "Media Sosial"),
                              createVNode("a", {
                                href: "https://instagram.com/seeo_ftunsoed",
                                target: "_blank",
                                class: "transition-colors duration-200",
                                style: { "color": "#64748b" },
                                onmouseover: "this.style.color='#3b82f6'",
                                onmouseout: "this.style.color='#64748b'"
                              }, "@seeo_ftunsoed")
                            ])
                          ]),
                          createVNode("li", { class: "flex items-start space-x-4" }, [
                            createVNode("div", {
                              class: "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300",
                              style: { "background": "linear-gradient(135deg, #dbeafe, #bfdbfe)", "color": "#3b82f6" }
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-6 h-6",
                                fill: "currentColor",
                                viewBox: "0 0 20 20"
                              }, [
                                createVNode("path", { d: "M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" })
                              ]))
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", {
                                class: "font-bold",
                                style: { "color": "#1e293b" }
                              }, "Telepon"),
                              createVNode("p", null, "Hubungi kami melalui email atau media sosial")
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
const Contact = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-12beed4c"]]);
export {
  Contact as default
};
