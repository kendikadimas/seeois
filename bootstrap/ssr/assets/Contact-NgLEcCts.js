import { unref, withCtx, createVNode, createTextVNode, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-BM372l0n.js";
import { Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
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
            _push2(`<section class="relative bg-slate-950 min-h-[calc(100vh-5rem)] flex items-center justify-center border-b border-slate-900 overflow-hidden"${_scopeId}><div class="absolute inset-0 z-0"${_scopeId}><div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]"${_scopeId}></div></div><div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center"${_scopeId}><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20"${_scopeId}> Layanan Administrasi </div><h1 class="text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-tight"${_scopeId}> Pusat Bantuan &amp; <br${_scopeId}><span class="text-blue-500 italic"${_scopeId}>Kemitraan</span></h1><p class="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"${_scopeId}> Akses representasi formal untuk kelimpahan pertukaran informasi, laporan legalitas, dan rancangan strategis korespondensi partnership institusi Anda bersama kami. </p><div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20"${_scopeId}><div class="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent"${_scopeId}></div></div></div></section><section class="py-24 bg-slate-50"${_scopeId}><div class="max-w-7xl mx-auto px-6 lg:px-8"${_scopeId}><div class="grid lg:grid-cols-2 gap-16"${_scopeId}><div class="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm"${_scopeId}><h2 class="text-2xl font-bold text-slate-900 mb-2"${_scopeId}>Saluran Terpadu Cepat</h2><p class="text-slate-600 mb-8 border-b border-slate-100 pb-6"${_scopeId}>Tim Humas kami akan menyinkronisasikan korespondensi via surel paling lambat dalam 2 x 24 Jam hari operasional.</p><form action="#" method="POST" class="space-y-6"${_scopeId}><div${_scopeId}><label for="full-name" class="block text-sm font-bold text-slate-700 mb-1.5"${_scopeId}>Identitas Lengkap (Instansi) <span class="text-red-500"${_scopeId}>*</span></label><input type="text" name="full-name" id="full-name" required placeholder="Cth: Bagas - PT. Teknologi..." class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-slate-50 transition-colors p-3.5 border"${_scopeId}></div><div${_scopeId}><label for="email" class="block text-sm font-bold text-slate-700 mb-1.5"${_scopeId}>Surel Formal / Aktif <span class="text-red-500"${_scopeId}>*</span></label><input type="email" name="email" id="email" required placeholder="Cth: corporate@mail.id" class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-slate-50 transition-colors p-3.5 border"${_scopeId}></div><div${_scopeId}><label for="subject" class="block text-sm font-bold text-slate-700 mb-1.5"${_scopeId}>Klasifikasi Tujuan <span class="text-red-500"${_scopeId}>*</span></label><select id="subject" name="subject" required class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-slate-50 transition-colors p-3.5 border"${_scopeId}><option value=""${_scopeId}>-- Pilih Kategori --</option><option value="partnership"${_scopeId}>Tawaran Sponsorship &amp; Kemitraan</option><option value="business"${_scopeId}>Eksplorasi Transaksi Blaterian</option><option value="academic"${_scopeId}>Agenda Akademis / Riset</option><option value="other"${_scopeId}>Tanya Jawab Publik &amp; Lainnya</option></select></div><div${_scopeId}><label for="message" class="block text-sm font-bold text-slate-700 mb-1.5"${_scopeId}>Formulasi Pesan Khusus <span class="text-red-500"${_scopeId}>*</span></label><textarea id="message" name="message" rows="5" required placeholder="Uraikan rincian korespondensi..." class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-slate-50 transition-colors p-3.5 border resize-y"${_scopeId}></textarea></div><div class="pt-4"${_scopeId}><button type="submit" class="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"${_scopeId}> Transmisikan Formulir </button></div></form></div><div class="flex flex-col gap-8 flex-1"${_scopeId}><div class="bg-slate-900 rounded-3xl p-10 border border-slate-800 text-white shadow-xl"${_scopeId}><h3 class="text-xl font-bold mb-8"${_scopeId}>Informasi Identitas Official</h3><ul class="space-y-8"${_scopeId}><li class="flex gap-4"${_scopeId}><div class="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg></div><div${_scopeId}><h4 class="font-bold text-slate-200 mb-1"${_scopeId}>Sekretariat Fisik Pusat</h4><p class="text-slate-400 text-sm leading-relaxed"${_scopeId}>Pusat Kegiatan Kemahasiswaan (PKM)<br${_scopeId}>Fakultas Teknik Universitas Jenderal Soedirman<br${_scopeId}>Sokaraja, Kab. Banyumas, Jawa Tengah</p></div></li><li class="flex gap-4"${_scopeId}><div class="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"${_scopeId}></path></svg></div><div${_scopeId}><h4 class="font-bold text-slate-200 mb-1"${_scopeId}>Surat Elektronik (Email)</h4><a href="mailto:seeoftunsoed@gmail.com" class="text-blue-400 hover:text-blue-300 text-sm transition-colors"${_scopeId}>seeoftunsoed@gmail.com</a><p class="text-slate-500 text-xs mt-1"${_scopeId}>Direkomendasikan untuk Partnership Proposal.</p></div></li><li class="flex gap-4"${_scopeId}><div class="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400"${_scopeId}><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"${_scopeId}><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.724-1.378l-.701 2.67c-.256.982-.94 2.213-1.398 2.967C9.095 23.707 10.52 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017.001z"${_scopeId}></path></svg></div><div${_scopeId}><h4 class="font-bold text-slate-200 mb-1"${_scopeId}>Sosial Media Publik</h4><a href="https://instagram.com/seeo_ftunsoed" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm transition-colors"${_scopeId}>@seeo_ftunsoed (Instagram)</a></div></li></ul></div><div class="bg-blue-50 rounded-3xl p-8 border border-blue-100 flex items-center justify-between shadow-sm"${_scopeId}><div class="max-w-[200px]"${_scopeId}><h4 class="font-bold text-slate-900 mb-1"${_scopeId}>Lokasi Kami</h4><p class="text-xs text-slate-600"${_scopeId}>Klik visual panduan disamping guna menyusuri rute eksternal melalui peta.</p></div><a href="https://g.co/kgs/2X7C39x" target="_blank" class="w-14 h-14 bg-white rounded-full flex items-center justify-center border border-slate-200 text-blue-600 hover:shadow-md transition-shadow"${_scopeId}><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"${_scopeId}><path d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 00-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 002 12v2a1 1 0 001 1h2v5c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-5h2a1 1 0 001-1v-2c0-.142-.03-.277-.072-.393zM10.5 4.5a.5.5 0 011 0v1.5h-1V4.5zm-5.5 4h14v2h-14V8zm12 11c0 .551-.449 1-1 1H8c-.551 0-1-.449-1-1v-4h10v4zm-5-3h-4v-2h4v2z"${_scopeId}></path></svg></a></div></div></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "relative bg-slate-950 min-h-[calc(100vh-5rem)] flex items-center justify-center border-b border-slate-900 overflow-hidden" }, [
                createVNode("div", { class: "absolute inset-0 z-0" }, [
                  createVNode("div", { class: "absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" })
                ]),
                createVNode("div", { class: "max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center" }, [
                  createVNode("div", { class: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20" }, " Layanan Administrasi "),
                  createVNode("h1", { class: "text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-tight" }, [
                    createTextVNode(" Pusat Bantuan & "),
                    createVNode("br"),
                    createVNode("span", { class: "text-blue-500 italic" }, "Kemitraan")
                  ]),
                  createVNode("p", { class: "text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto" }, " Akses representasi formal untuk kelimpahan pertukaran informasi, laporan legalitas, dan rancangan strategis korespondensi partnership institusi Anda bersama kami. "),
                  createVNode("div", { class: "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20" }, [
                    createVNode("div", { class: "w-px h-16 bg-gradient-to-b from-blue-500 to-transparent" })
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-slate-50" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 lg:px-8" }, [
                  createVNode("div", { class: "grid lg:grid-cols-2 gap-16" }, [
                    createVNode("div", { class: "bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm" }, [
                      createVNode("h2", { class: "text-2xl font-bold text-slate-900 mb-2" }, "Saluran Terpadu Cepat"),
                      createVNode("p", { class: "text-slate-600 mb-8 border-b border-slate-100 pb-6" }, "Tim Humas kami akan menyinkronisasikan korespondensi via surel paling lambat dalam 2 x 24 Jam hari operasional."),
                      createVNode("form", {
                        action: "#",
                        method: "POST",
                        class: "space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "full-name",
                            class: "block text-sm font-bold text-slate-700 mb-1.5"
                          }, [
                            createTextVNode("Identitas Lengkap (Instansi) "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          createVNode("input", {
                            type: "text",
                            name: "full-name",
                            id: "full-name",
                            required: "",
                            placeholder: "Cth: Bagas - PT. Teknologi...",
                            class: "block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-slate-50 transition-colors p-3.5 border"
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "email",
                            class: "block text-sm font-bold text-slate-700 mb-1.5"
                          }, [
                            createTextVNode("Surel Formal / Aktif "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          createVNode("input", {
                            type: "email",
                            name: "email",
                            id: "email",
                            required: "",
                            placeholder: "Cth: corporate@mail.id",
                            class: "block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-slate-50 transition-colors p-3.5 border"
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "subject",
                            class: "block text-sm font-bold text-slate-700 mb-1.5"
                          }, [
                            createTextVNode("Klasifikasi Tujuan "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          createVNode("select", {
                            id: "subject",
                            name: "subject",
                            required: "",
                            class: "block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-slate-50 transition-colors p-3.5 border"
                          }, [
                            createVNode("option", { value: "" }, "-- Pilih Kategori --"),
                            createVNode("option", { value: "partnership" }, "Tawaran Sponsorship & Kemitraan"),
                            createVNode("option", { value: "business" }, "Eksplorasi Transaksi Blaterian"),
                            createVNode("option", { value: "academic" }, "Agenda Akademis / Riset"),
                            createVNode("option", { value: "other" }, "Tanya Jawab Publik & Lainnya")
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "message",
                            class: "block text-sm font-bold text-slate-700 mb-1.5"
                          }, [
                            createTextVNode("Formulasi Pesan Khusus "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          createVNode("textarea", {
                            id: "message",
                            name: "message",
                            rows: "5",
                            required: "",
                            placeholder: "Uraikan rincian korespondensi...",
                            class: "block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-slate-50 transition-colors p-3.5 border resize-y"
                          })
                        ]),
                        createVNode("div", { class: "pt-4" }, [
                          createVNode("button", {
                            type: "submit",
                            class: "w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          }, " Transmisikan Formulir ")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-col gap-8 flex-1" }, [
                      createVNode("div", { class: "bg-slate-900 rounded-3xl p-10 border border-slate-800 text-white shadow-xl" }, [
                        createVNode("h3", { class: "text-xl font-bold mb-8" }, "Informasi Identitas Official"),
                        createVNode("ul", { class: "space-y-8" }, [
                          createVNode("li", { class: "flex gap-4" }, [
                            createVNode("div", { class: "flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                }),
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                })
                              ]))
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", { class: "font-bold text-slate-200 mb-1" }, "Sekretariat Fisik Pusat"),
                              createVNode("p", { class: "text-slate-400 text-sm leading-relaxed" }, [
                                createTextVNode("Pusat Kegiatan Kemahasiswaan (PKM)"),
                                createVNode("br"),
                                createTextVNode("Fakultas Teknik Universitas Jenderal Soedirman"),
                                createVNode("br"),
                                createTextVNode("Sokaraja, Kab. Banyumas, Jawa Tengah")
                              ])
                            ])
                          ]),
                          createVNode("li", { class: "flex gap-4" }, [
                            createVNode("div", { class: "flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                })
                              ]))
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", { class: "font-bold text-slate-200 mb-1" }, "Surat Elektronik (Email)"),
                              createVNode("a", {
                                href: "mailto:seeoftunsoed@gmail.com",
                                class: "text-blue-400 hover:text-blue-300 text-sm transition-colors"
                              }, "seeoftunsoed@gmail.com"),
                              createVNode("p", { class: "text-slate-500 text-xs mt-1" }, "Direkomendasikan untuk Partnership Proposal.")
                            ])
                          ]),
                          createVNode("li", { class: "flex gap-4" }, [
                            createVNode("div", { class: "flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-5 h-5",
                                fill: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", { d: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.724-1.378l-.701 2.67c-.256.982-.94 2.213-1.398 2.967C9.095 23.707 10.52 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017.001z" })
                              ]))
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", { class: "font-bold text-slate-200 mb-1" }, "Sosial Media Publik"),
                              createVNode("a", {
                                href: "https://instagram.com/seeo_ftunsoed",
                                target: "_blank",
                                class: "text-blue-400 hover:text-blue-300 text-sm transition-colors"
                              }, "@seeo_ftunsoed (Instagram)")
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-blue-50 rounded-3xl p-8 border border-blue-100 flex items-center justify-between shadow-sm" }, [
                        createVNode("div", { class: "max-w-[200px]" }, [
                          createVNode("h4", { class: "font-bold text-slate-900 mb-1" }, "Lokasi Kami"),
                          createVNode("p", { class: "text-xs text-slate-600" }, "Klik visual panduan disamping guna menyusuri rute eksternal melalui peta.")
                        ]),
                        createVNode("a", {
                          href: "https://g.co/kgs/2X7C39x",
                          target: "_blank",
                          class: "w-14 h-14 bg-white rounded-full flex items-center justify-center border border-slate-200 text-blue-600 hover:shadow-md transition-shadow"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-6 h-6",
                            fill: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", { d: "M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 00-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 002 12v2a1 1 0 001 1h2v5c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-5h2a1 1 0 001-1v-2c0-.142-.03-.277-.072-.393zM10.5 4.5a.5.5 0 011 0v1.5h-1V4.5zm-5.5 4h14v2h-14V8zm12 11c0 .551-.449 1-1 1H8c-.551 0-1-.449-1-1v-4h10v4zm-5-3h-4v-2h4v2z" })
                          ]))
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
//# sourceMappingURL=Contact-NgLEcCts.js.map
