import { unref, withCtx, createVNode, createTextVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-1sZl-0H2.js";
import { Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Contact",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Hubungi Kami - SEEO FT UNSOED</title><meta name="description" content="Hubungi SEEO FT UNSOED untuk pertanyaan, kerjasama, atau informasi lebih lanjut. Temukan lokasi sekretariat kami di PKM Fakultas Teknik UNSOED Purbalingga."${_scopeId}><meta name="keywords" content="organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, kontak seeo"${_scopeId}><meta property="og:title" content="Hubungi SEEO FT UNSOED"${_scopeId}><meta property="og:description" content="Punya pertanyaan atau ide kolaborasi? Hubungi kami sekarang."${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Hubungi Kami - SEEO FT UNSOED"),
              createVNode("meta", {
                name: "description",
                content: "Hubungi SEEO FT UNSOED untuk pertanyaan, kerjasama, atau informasi lebih lanjut. Temukan lokasi sekretariat kami di PKM Fakultas Teknik UNSOED Purbalingga."
              }),
              createVNode("meta", {
                name: "keywords",
                content: "organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, kontak seeo"
              }),
              createVNode("meta", {
                property: "og:title",
                content: "Hubungi SEEO FT UNSOED"
              }),
              createVNode("meta", {
                property: "og:description",
                content: "Punya pertanyaan atau ide kolaborasi? Hubungi kami sekarang."
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="pt-32 pb-20 bg-white overflow-hidden relative"${_scopeId}><div class="max-w-7xl mx-auto px-6 relative z-10"${_scopeId}><h1 class="text-6xl md:text-8xl font-black text-[#004182] mb-8 tracking-tight uppercase"${_scopeId}> Let&#39;s <span class="text-[#FFD700]"${_scopeId}>Connect</span></h1><p class="text-gray-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed mb-12"${_scopeId}> Punya pertanyaan, ide kolaborasi, atau ingin memberikan masukan? <br class="hidden md:block"${_scopeId}> Kami siap mendengar dan membantu Anda. </p><div class="flex flex-wrap gap-6 items-center"${_scopeId}><a href="https://instagram.com/seeo_unsoed" target="_blank" class="group flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all"${_scopeId}><i class="bi bi-instagram text-[#004182] text-xl group-hover:scale-125 transition-transform"${_scopeId}></i><span class="text-[10px] font-black text-[#004182] uppercase tracking-widest"${_scopeId}>Instagram</span></a><a href="#" class="group flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all"${_scopeId}><i class="bi bi-linkedin text-[#004182] text-xl group-hover:scale-125 transition-transform"${_scopeId}></i><span class="text-[10px] font-black text-[#004182] uppercase tracking-widest"${_scopeId}>LinkedIn</span></a><a href="#" class="group flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all"${_scopeId}><i class="bi bi-youtube text-[#004182] text-xl group-hover:scale-125 transition-transform"${_scopeId}></i><span class="text-[10px] font-black text-[#004182] uppercase tracking-widest"${_scopeId}>YouTube</span></a><a href="#" class="group flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all"${_scopeId}><i class="bi bi-tiktok text-[#004182] text-xl group-hover:scale-125 transition-transform"${_scopeId}></i><span class="text-[10px] font-black text-[#004182] uppercase tracking-widest"${_scopeId}>TikTok</span></a></div></div></section><section class="py-24 bg-[#f8f9fa]"${_scopeId}><div class="max-w-7xl mx-auto px-6"${_scopeId}><div class="bg-white rounded-[4rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row"${_scopeId}><div class="lg:w-3/5 p-10 md:p-20"${_scopeId}><h2 class="text-4xl font-black text-[#004182] mb-12 uppercase tracking-tight"${_scopeId}>Kirim Pesan</h2><form class="space-y-8"${_scopeId}><div class="grid md:grid-cols-2 gap-8"${_scopeId}><div class="space-y-3"${_scopeId}><label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4"${_scopeId}>Nama Lengkap</label><input type="text" placeholder="John Doe" class="w-full px-8 py-4 bg-gray-50 rounded-full border border-transparent focus:border-[#FFD700] focus:outline-none transition-all font-medium"${_scopeId}></div><div class="space-y-3"${_scopeId}><label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4"${_scopeId}>Alamat Email</label><input type="email" placeholder="john@example.com" class="w-full px-8 py-4 bg-gray-50 rounded-full border border-transparent focus:border-[#FFD700] focus:outline-none transition-all font-medium"${_scopeId}></div></div><div class="space-y-3"${_scopeId}><label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4"${_scopeId}>Subjek Pesan</label><input type="text" placeholder="Media Partner / Sponsorship / Lainnya" class="w-full px-8 py-4 bg-gray-50 rounded-full border border-transparent focus:border-[#FFD700] focus:outline-none transition-all font-medium"${_scopeId}></div><div class="space-y-3"${_scopeId}><label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4"${_scopeId}>Isi Pesan</label><textarea rows="6" placeholder="Halo kak, saya ingin mengajukan..." class="w-full px-8 py-6 bg-gray-50 rounded-[2rem] border border-transparent focus:border-[#FFD700] focus:outline-none transition-all font-medium resize-none"${_scopeId}></textarea></div><div class="pt-4"${_scopeId}><button class="bg-[#004182] text-white px-10 py-3 rounded-full font-black hover:bg-[#FFD700] hover:text-[#004182] transition-all tracking-[0.1em] text-sm"${_scopeId}> Kirim Pesan </button></div></form></div><div class="lg:w-2/5 bg-[#004182] p-20 flex flex-col justify-center text-white relative overflow-hidden"${_scopeId}><div class="absolute top-0 right-0 w-64 h-64 border-[30px] border-[#FFD700]/10 rounded-full translate-x-1/2 -translate-y-1/2"${_scopeId}></div><div class="absolute bottom-0 left-0 w-32 h-32 bg-[#FFD700] rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl opacity-20"${_scopeId}></div><div class="relative z-10"${_scopeId}><h3 class="text-3xl font-black mb-8 leading-tight"${_scopeId}>Mencari Kerjasama Strategis?</h3><p class="text-white/60 text-lg mb-12 font-medium"${_scopeId}>Kami sangat terbuka untuk kolaborasi dengan instansi, perusahaan, atau organisasi lain untuk memajukan teknologi di lingkungan kampus.</p><div class="space-y-6"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10"${_scopeId}><i class="bi bi-telephone-fill"${_scopeId}></i></div><span class="font-bold"${_scopeId}>+62 812-3456-7890</span></div><div class="flex items-center gap-4"${_scopeId}><div class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10"${_scopeId}><i class="bi bi-clock-fill"${_scopeId}></i></div><span class="font-bold"${_scopeId}>Senin - Jumat | 09:00 - 17:00</span></div></div></div></div></div></div></section><section class="h-[500px] bg-gray-100 grayscale hover:grayscale-0 transition-all duration-1000"${_scopeId}><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d521.3327011582118!2d109.33636630681688!3d-7.428993513373772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6559bc3139f21b%3A0xd5c712f3a50928fe!2sPKM%20Teknik%20Unsoed!5e0!3m2!1sid!2sid!4v1778857389901!5m2!1sid!2sid" class="w-full h-full border-0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"${_scopeId}></iframe></section>`);
          } else {
            return [
              createVNode("section", { class: "pt-32 pb-20 bg-white overflow-hidden relative" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 relative z-10" }, [
                  createVNode("h1", { class: "text-6xl md:text-8xl font-black text-[#004182] mb-8 tracking-tight uppercase" }, [
                    createTextVNode(" Let's "),
                    createVNode("span", { class: "text-[#FFD700]" }, "Connect")
                  ]),
                  createVNode("p", { class: "text-gray-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed mb-12" }, [
                    createTextVNode(" Punya pertanyaan, ide kolaborasi, atau ingin memberikan masukan? "),
                    createVNode("br", { class: "hidden md:block" }),
                    createTextVNode(" Kami siap mendengar dan membantu Anda. ")
                  ]),
                  createVNode("div", { class: "flex flex-wrap gap-6 items-center" }, [
                    createVNode("a", {
                      href: "https://instagram.com/seeo_unsoed",
                      target: "_blank",
                      class: "group flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all"
                    }, [
                      createVNode("i", { class: "bi bi-instagram text-[#004182] text-xl group-hover:scale-125 transition-transform" }),
                      createVNode("span", { class: "text-[10px] font-black text-[#004182] uppercase tracking-widest" }, "Instagram")
                    ]),
                    createVNode("a", {
                      href: "#",
                      class: "group flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all"
                    }, [
                      createVNode("i", { class: "bi bi-linkedin text-[#004182] text-xl group-hover:scale-125 transition-transform" }),
                      createVNode("span", { class: "text-[10px] font-black text-[#004182] uppercase tracking-widest" }, "LinkedIn")
                    ]),
                    createVNode("a", {
                      href: "#",
                      class: "group flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all"
                    }, [
                      createVNode("i", { class: "bi bi-youtube text-[#004182] text-xl group-hover:scale-125 transition-transform" }),
                      createVNode("span", { class: "text-[10px] font-black text-[#004182] uppercase tracking-widest" }, "YouTube")
                    ]),
                    createVNode("a", {
                      href: "#",
                      class: "group flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all"
                    }, [
                      createVNode("i", { class: "bi bi-tiktok text-[#004182] text-xl group-hover:scale-125 transition-transform" }),
                      createVNode("span", { class: "text-[10px] font-black text-[#004182] uppercase tracking-widest" }, "TikTok")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-[#f8f9fa]" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "bg-white rounded-[4rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row" }, [
                    createVNode("div", { class: "lg:w-3/5 p-10 md:p-20" }, [
                      createVNode("h2", { class: "text-4xl font-black text-[#004182] mb-12 uppercase tracking-tight" }, "Kirim Pesan"),
                      createVNode("form", {
                        onSubmit: withModifiers(() => {
                        }, ["prevent"]),
                        class: "space-y-8"
                      }, [
                        createVNode("div", { class: "grid md:grid-cols-2 gap-8" }, [
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("label", { class: "text-[10px] font-black text-gray-400 uppercase tracking-widest px-4" }, "Nama Lengkap"),
                            createVNode("input", {
                              type: "text",
                              placeholder: "John Doe",
                              class: "w-full px-8 py-4 bg-gray-50 rounded-full border border-transparent focus:border-[#FFD700] focus:outline-none transition-all font-medium"
                            })
                          ]),
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("label", { class: "text-[10px] font-black text-gray-400 uppercase tracking-widest px-4" }, "Alamat Email"),
                            createVNode("input", {
                              type: "email",
                              placeholder: "john@example.com",
                              class: "w-full px-8 py-4 bg-gray-50 rounded-full border border-transparent focus:border-[#FFD700] focus:outline-none transition-all font-medium"
                            })
                          ])
                        ]),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("label", { class: "text-[10px] font-black text-gray-400 uppercase tracking-widest px-4" }, "Subjek Pesan"),
                          createVNode("input", {
                            type: "text",
                            placeholder: "Media Partner / Sponsorship / Lainnya",
                            class: "w-full px-8 py-4 bg-gray-50 rounded-full border border-transparent focus:border-[#FFD700] focus:outline-none transition-all font-medium"
                          })
                        ]),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("label", { class: "text-[10px] font-black text-gray-400 uppercase tracking-widest px-4" }, "Isi Pesan"),
                          createVNode("textarea", {
                            rows: "6",
                            placeholder: "Halo kak, saya ingin mengajukan...",
                            class: "w-full px-8 py-6 bg-gray-50 rounded-[2rem] border border-transparent focus:border-[#FFD700] focus:outline-none transition-all font-medium resize-none"
                          })
                        ]),
                        createVNode("div", { class: "pt-4" }, [
                          createVNode("button", { class: "bg-[#004182] text-white px-10 py-3 rounded-full font-black hover:bg-[#FFD700] hover:text-[#004182] transition-all tracking-[0.1em] text-sm" }, " Kirim Pesan ")
                        ])
                      ], 40, ["onSubmit"])
                    ]),
                    createVNode("div", { class: "lg:w-2/5 bg-[#004182] p-20 flex flex-col justify-center text-white relative overflow-hidden" }, [
                      createVNode("div", { class: "absolute top-0 right-0 w-64 h-64 border-[30px] border-[#FFD700]/10 rounded-full translate-x-1/2 -translate-y-1/2" }),
                      createVNode("div", { class: "absolute bottom-0 left-0 w-32 h-32 bg-[#FFD700] rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl opacity-20" }),
                      createVNode("div", { class: "relative z-10" }, [
                        createVNode("h3", { class: "text-3xl font-black mb-8 leading-tight" }, "Mencari Kerjasama Strategis?"),
                        createVNode("p", { class: "text-white/60 text-lg mb-12 font-medium" }, "Kami sangat terbuka untuk kolaborasi dengan instansi, perusahaan, atau organisasi lain untuk memajukan teknologi di lingkungan kampus."),
                        createVNode("div", { class: "space-y-6" }, [
                          createVNode("div", { class: "flex items-center gap-4" }, [
                            createVNode("div", { class: "w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10" }, [
                              createVNode("i", { class: "bi bi-telephone-fill" })
                            ]),
                            createVNode("span", { class: "font-bold" }, "+62 812-3456-7890")
                          ]),
                          createVNode("div", { class: "flex items-center gap-4" }, [
                            createVNode("div", { class: "w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10" }, [
                              createVNode("i", { class: "bi bi-clock-fill" })
                            ]),
                            createVNode("span", { class: "font-bold" }, "Senin - Jumat | 09:00 - 17:00")
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "h-[500px] bg-gray-100 grayscale hover:grayscale-0 transition-all duration-1000" }, [
                createVNode("iframe", {
                  src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d521.3327011582118!2d109.33636630681688!3d-7.428993513373772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6559bc3139f21b%3A0xd5c712f3a50928fe!2sPKM%20Teknik%20Unsoed!5e0!3m2!1sid!2sid!4v1778857389901!5m2!1sid!2sid",
                  class: "w-full h-full border-0",
                  allowfullscreen: "",
                  loading: "lazy",
                  referrerpolicy: "no-referrer-when-downgrade"
                })
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
//# sourceMappingURL=Contact-CNuoTtSB.js.map
