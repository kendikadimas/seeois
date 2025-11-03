import { resolveComponent, unref, withCtx, createVNode, createBlock, openBlock, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-B8fPWyvx.js";
import { Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "About",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Link = resolveComponent("Link");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Tentang SEEO - Student Entrepreneur and Empowerment Organization" }, null, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="relative min-h-screen flex items-center justify-center overflow-hidden"${_scopeId}><div class="absolute inset-0"${_scopeId}><div class="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"${_scopeId}></div><div class="absolute inset-0 bg-black/20"${_scopeId}></div><div class="absolute inset-0" style="${ssrRenderStyle({ backgroundImage: `url('${_ctx.$imageUrl("compro/seeo.jpg")}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", opacity: 0.1 })}"${_scopeId}></div></div><div class="absolute inset-0"${_scopeId}><div class="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping" style="${ssrRenderStyle({ "animation-delay": "0s" })}"${_scopeId}></div><div class="absolute top-3/4 right-1/4 w-2 h-2 bg-blue-300/30 rounded-full animate-ping" style="${ssrRenderStyle({ "animation-delay": "2s" })}"${_scopeId}></div><div class="absolute top-1/2 left-3/4 w-2 h-2 bg-purple-300/30 rounded-full animate-ping" style="${ssrRenderStyle({ "animation-delay": "4s" })}"${_scopeId}></div></div><div class="relative z-10 max-w-6xl mx-auto px-6 text-center"${_scopeId}><div class="space-y-8"${_scopeId}><div class="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white"${_scopeId}><svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span class="font-semibold"${_scopeId}>Fakultas Teknik Universitas Jenderal Soedirman</span></div><div${_scopeId}><h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"${_scopeId}><span class="block"${_scopeId}>Tentang</span><span class="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"${_scopeId}> SEEO </span></h1><p class="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed"${_scopeId}> Student Entrepreneur and Empowerment Organization </p></div><p class="text-lg md:text-xl text-white/60 max-w-3xl mx-auto"${_scopeId}> Mencetak generasi wirausaha teknik yang inovatif, adaptif, dan berkelanjutan </p></div></div><div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce"${_scopeId}><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"${_scopeId}></path></svg></div></section><section class="relative py-32 overflow-hidden"${_scopeId}><div class="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50"${_scopeId}></div><div class="relative z-10 max-w-7xl mx-auto px-6"${_scopeId}><div class="grid lg:grid-cols-2 gap-20 items-center"${_scopeId}><div${_scopeId}><div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-8"${_scopeId}><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> Cerita Kami </div><h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight"${_scopeId}> Perjalanan Membangun <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block"${_scopeId}> Ekosistem Entrepreneurship </span></h2><div class="space-y-6 text-lg text-slate-700"${_scopeId}><p class="leading-relaxed"${_scopeId}> SEEO lahir dari visi untuk menciptakan <strong class="text-blue-600"${_scopeId}>lingkungan pembelajaran entrepreneurship</strong> yang komprehensif di Fakultas Teknik Universitas Jenderal Soedirman. </p><p class="leading-relaxed"${_scopeId}> Sebagai Unit Kegiatan Mahasiswa Kewirausahaan (UKMK), kami berkomitmen memberikan pengalaman berwirausaha yang <strong class="text-purple-600"${_scopeId}>menggabungkan aspek teoritis dan praktis</strong> secara adaptif dan berkelanjutan. </p><p class="leading-relaxed"${_scopeId}> Melalui berbagai program inovatif dan brand unggulan <strong class="text-amber-600"${_scopeId}>Blaterian</strong>, kami membina mahasiswa untuk menjadi entrepreneur yang tangguh dan berdampak positif. </p></div><div class="grid grid-cols-3 gap-6 mt-12"${_scopeId}><div class="text-center"${_scopeId}><div class="text-3xl font-black text-blue-600 mb-2"${_scopeId}>10+</div><div class="text-sm text-slate-600"${_scopeId}>Tahun Pengalaman</div></div><div class="text-center"${_scopeId}><div class="text-3xl font-black text-purple-600 mb-2"${_scopeId}>100+</div><div class="text-sm text-slate-600"${_scopeId}>Anggota Aktif</div></div><div class="text-center"${_scopeId}><div class="text-3xl font-black text-amber-600 mb-2"${_scopeId}>50+</div><div class="text-sm text-slate-600"${_scopeId}>Program Sukses</div></div></div></div><div class="relative"${_scopeId}><div class="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500"${_scopeId}><img${ssrRenderAttr("src", _ctx.$imageUrl("compro/logo.png"))} alt="SEEO Logo" class="w-full h-auto max-w-md mx-auto filter drop-shadow-2xl"${_scopeId}></div><div class="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-xl rotate-12 hover:rotate-0 transition-transform duration-300"${_scopeId}><div class="text-center"${_scopeId}><div class="text-2xl mb-2"${_scopeId}>🚀</div><div class="text-xs text-gray-600"${_scopeId}>Inovasi</div></div></div><div class="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl -rotate-12 hover:rotate-0 transition-transform duration-300"${_scopeId}><div class="text-center"${_scopeId}><div class="text-2xl mb-2"${_scopeId}>🤝</div><div class="text-xs text-gray-600"${_scopeId}>Kolaborasi</div></div></div></div></div></div></section><section class="relative py-32 overflow-hidden"${_scopeId}><div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"${_scopeId}><div class="absolute inset-0 opacity-10"${_scopeId}></div></div><div class="relative z-10 max-w-6xl mx-auto px-6"${_scopeId}><div class="text-center mb-20"${_scopeId}><div class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-6"${_scopeId}><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"${_scopeId}></path></svg> Visi &amp; Misi </div><h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"${_scopeId}> Arah &amp; Tujuan <span class="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"${_scopeId}> Organisasi </span></h2></div><div class="grid md:grid-cols-2 gap-12"${_scopeId}><div class="relative group"${_scopeId}><div class="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-10 h-full hover:bg-white/10 transition-all duration-500"${_scopeId}><div class="text-center mb-8"${_scopeId}><div class="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"${_scopeId}><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg></div><h3 class="text-3xl font-bold text-white mb-4"${_scopeId}>Visi</h3></div><p class="text-lg text-white/80 leading-relaxed text-center"${_scopeId}> Menjadi Unit Kegiatan Mahasiswa Kewirausahaan yang <span class="text-cyan-400 font-semibold"${_scopeId}>unggul, inovatif, dan berkelanjutan</span> dalam mengembangkan jiwa entrepreneur di kalangan mahasiswa Fakultas Teknik UNSOED. </p></div></div><div class="relative group"${_scopeId}><div class="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-10 h-full hover:bg-white/10 transition-all duration-500"${_scopeId}><div class="text-center mb-8"${_scopeId}><div class="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"${_scopeId}><svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"${_scopeId}></path></svg></div><h3 class="text-3xl font-bold text-white mb-4"${_scopeId}>Misi</h3></div><p class="text-lg text-white/80 leading-relaxed text-center"${_scopeId}> Memberikan pengalaman berwirausaha yang <span class="text-purple-400 font-semibold"${_scopeId}>menggabungkan aspek teoritis dan praktis</span> secara adaptif, serta membangun organisasi yang sinergis baik internal maupun eksternal UKMK FT UNSOED. </p></div></div></div></div></section><section class="relative py-32 overflow-hidden"${_scopeId}><div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"${_scopeId}></div><div class="relative z-10 max-w-7xl mx-auto px-6"${_scopeId}><div class="text-center mb-20"${_scopeId}><div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6"${_scopeId}><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"${_scopeId}></path></svg> Nilai-Nilai Kami </div><h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-6"${_scopeId}> Prinsip yang Kami <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block"${_scopeId}> Pegang Teguh </span></h2><p class="text-xl text-slate-600 max-w-3xl mx-auto"${_scopeId}> Fondasi yang memandu setiap langkah dan keputusan dalam perjalanan SEEO </p></div><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"${_scopeId}><div class="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"${_scopeId}><div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"${_scopeId}><svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"${_scopeId}></path></svg></div><h3 class="text-xl font-bold text-slate-900 mb-4"${_scopeId}>Inovasi</h3><p class="text-slate-600 leading-relaxed"${_scopeId}> Selalu mencari cara baru dan kreatif untuk mengembangkan program dan solusi entrepreneurship. </p></div><div class="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"${_scopeId}><div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"${_scopeId}><svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"${_scopeId}></path></svg></div><h3 class="text-xl font-bold text-slate-900 mb-4"${_scopeId}>Kolaborasi</h3><p class="text-slate-600 leading-relaxed"${_scopeId}> Membangun kemitraan yang kuat dengan berbagai pihak untuk mencapai tujuan bersama. </p></div><div class="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 md:col-span-2 lg:col-span-1"${_scopeId}><div class="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"${_scopeId}><svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"${_scopeId}></path></svg></div><h3 class="text-xl font-bold text-slate-900 mb-4"${_scopeId}>Keunggulan</h3><p class="text-slate-600 leading-relaxed"${_scopeId}> Berkomitmen untuk memberikan hasil terbaik dalam setiap program dan layanan yang kami berikan. </p></div></div><div class="text-center mt-20"${_scopeId}><div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"${_scopeId}><h3 class="text-3xl font-bold mb-6"${_scopeId}>Bergabung dengan Kami</h3><p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto"${_scopeId}> Mari bersama-sama membangun masa depan entrepreneurship yang lebih cerah </p><div class="flex flex-col sm:flex-row gap-4 justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Link, {
              href: "/contact",
              class: "inline-flex items-center px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Hubungi Kami</span><svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createVNode("span", null, "Hubungi Kami"),
                    (openBlock(), createBlock("svg", {
                      class: "ml-2 w-5 h-5",
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
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Link, {
              href: "/structure",
              class: "inline-flex items-center px-8 py-4 rounded-2xl border-2 border-white text-white font-bold hover:bg-white hover:text-slate-900 transition-all duration-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Lihat Struktur</span><svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createVNode("span", null, "Lihat Struktur"),
                    (openBlock(), createBlock("svg", {
                      class: "ml-2 w-5 h-5",
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
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div></section>`);
          } else {
            return [
              createVNode("section", { class: "relative min-h-screen flex items-center justify-center overflow-hidden" }, [
                createVNode("div", { class: "absolute inset-0" }, [
                  createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" }),
                  createVNode("div", { class: "absolute inset-0 bg-black/20" }),
                  createVNode("div", {
                    class: "absolute inset-0",
                    style: { backgroundImage: `url('${_ctx.$imageUrl("compro/seeo.jpg")}')`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", opacity: 0.1 }
                  }, null, 4)
                ]),
                createVNode("div", { class: "absolute inset-0" }, [
                  createVNode("div", {
                    class: "absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping",
                    style: { "animation-delay": "0s" }
                  }),
                  createVNode("div", {
                    class: "absolute top-3/4 right-1/4 w-2 h-2 bg-blue-300/30 rounded-full animate-ping",
                    style: { "animation-delay": "2s" }
                  }),
                  createVNode("div", {
                    class: "absolute top-1/2 left-3/4 w-2 h-2 bg-purple-300/30 rounded-full animate-ping",
                    style: { "animation-delay": "4s" }
                  })
                ]),
                createVNode("div", { class: "relative z-10 max-w-6xl mx-auto px-6 text-center" }, [
                  createVNode("div", { class: "space-y-8" }, [
                    createVNode("div", { class: "inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-5 h-5 mr-3",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
                      ])),
                      createVNode("span", { class: "font-semibold" }, "Fakultas Teknik Universitas Jenderal Soedirman")
                    ]),
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight" }, [
                        createVNode("span", { class: "block" }, "Tentang"),
                        createVNode("span", { class: "block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent" }, " SEEO ")
                      ]),
                      createVNode("p", { class: "text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed" }, " Student Entrepreneur and Empowerment Organization ")
                    ]),
                    createVNode("p", { class: "text-lg md:text-xl text-white/60 max-w-3xl mx-auto" }, " Mencetak generasi wirausaha teknik yang inovatif, adaptif, dan berkelanjutan ")
                  ])
                ]),
                createVNode("div", { class: "absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-6 h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M19 14l-7 7m0 0l-7-7m7 7V3"
                    })
                  ]))
                ])
              ]),
              createVNode("section", { class: "relative py-32 overflow-hidden" }, [
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50" }),
                createVNode("div", { class: "relative z-10 max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "grid lg:grid-cols-2 gap-20 items-center" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-8" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4 mr-2",
                          fill: "currentColor",
                          viewBox: "0 0 20 20"
                        }, [
                          createVNode("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
                        ])),
                        createTextVNode(" Cerita Kami ")
                      ]),
                      createVNode("h2", { class: "text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight" }, [
                        createTextVNode(" Perjalanan Membangun "),
                        createVNode("span", { class: "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block" }, " Ekosistem Entrepreneurship ")
                      ]),
                      createVNode("div", { class: "space-y-6 text-lg text-slate-700" }, [
                        createVNode("p", { class: "leading-relaxed" }, [
                          createTextVNode(" SEEO lahir dari visi untuk menciptakan "),
                          createVNode("strong", { class: "text-blue-600" }, "lingkungan pembelajaran entrepreneurship"),
                          createTextVNode(" yang komprehensif di Fakultas Teknik Universitas Jenderal Soedirman. ")
                        ]),
                        createVNode("p", { class: "leading-relaxed" }, [
                          createTextVNode(" Sebagai Unit Kegiatan Mahasiswa Kewirausahaan (UKMK), kami berkomitmen memberikan pengalaman berwirausaha yang "),
                          createVNode("strong", { class: "text-purple-600" }, "menggabungkan aspek teoritis dan praktis"),
                          createTextVNode(" secara adaptif dan berkelanjutan. ")
                        ]),
                        createVNode("p", { class: "leading-relaxed" }, [
                          createTextVNode(" Melalui berbagai program inovatif dan brand unggulan "),
                          createVNode("strong", { class: "text-amber-600" }, "Blaterian"),
                          createTextVNode(", kami membina mahasiswa untuk menjadi entrepreneur yang tangguh dan berdampak positif. ")
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-3 gap-6 mt-12" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-3xl font-black text-blue-600 mb-2" }, "10+"),
                          createVNode("div", { class: "text-sm text-slate-600" }, "Tahun Pengalaman")
                        ]),
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-3xl font-black text-purple-600 mb-2" }, "100+"),
                          createVNode("div", { class: "text-sm text-slate-600" }, "Anggota Aktif")
                        ]),
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-3xl font-black text-amber-600 mb-2" }, "50+"),
                          createVNode("div", { class: "text-sm text-slate-600" }, "Program Sukses")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "relative" }, [
                      createVNode("div", { class: "relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500" }, [
                        createVNode("img", {
                          src: _ctx.$imageUrl("compro/logo.png"),
                          alt: "SEEO Logo",
                          class: "w-full h-auto max-w-md mx-auto filter drop-shadow-2xl"
                        }, null, 8, ["src"])
                      ]),
                      createVNode("div", { class: "absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-xl rotate-12 hover:rotate-0 transition-transform duration-300" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl mb-2" }, "🚀"),
                          createVNode("div", { class: "text-xs text-gray-600" }, "Inovasi")
                        ])
                      ]),
                      createVNode("div", { class: "absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl -rotate-12 hover:rotate-0 transition-transform duration-300" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl mb-2" }, "🤝"),
                          createVNode("div", { class: "text-xs text-gray-600" }, "Kolaborasi")
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "relative py-32 overflow-hidden" }, [
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" }, [
                  createVNode("div", { class: "absolute inset-0 opacity-10" })
                ]),
                createVNode("div", { class: "relative z-10 max-w-6xl mx-auto px-6" }, [
                  createVNode("div", { class: "text-center mb-20" }, [
                    createVNode("div", { class: "inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-6" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 mr-2",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
                      ])),
                      createTextVNode(" Visi & Misi ")
                    ]),
                    createVNode("h2", { class: "text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6" }, [
                      createTextVNode(" Arah & Tujuan "),
                      createVNode("span", { class: "block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent" }, " Organisasi ")
                    ])
                  ]),
                  createVNode("div", { class: "grid md:grid-cols-2 gap-12" }, [
                    createVNode("div", { class: "relative group" }, [
                      createVNode("div", { class: "bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-10 h-full hover:bg-white/10 transition-all duration-500" }, [
                        createVNode("div", { class: "text-center mb-8" }, [
                          createVNode("div", { class: "w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-10 h-10 text-white",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              }),
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              })
                            ]))
                          ]),
                          createVNode("h3", { class: "text-3xl font-bold text-white mb-4" }, "Visi")
                        ]),
                        createVNode("p", { class: "text-lg text-white/80 leading-relaxed text-center" }, [
                          createTextVNode(" Menjadi Unit Kegiatan Mahasiswa Kewirausahaan yang "),
                          createVNode("span", { class: "text-cyan-400 font-semibold" }, "unggul, inovatif, dan berkelanjutan"),
                          createTextVNode(" dalam mengembangkan jiwa entrepreneur di kalangan mahasiswa Fakultas Teknik UNSOED. ")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "relative group" }, [
                      createVNode("div", { class: "bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-10 h-full hover:bg-white/10 transition-all duration-500" }, [
                        createVNode("div", { class: "text-center mb-8" }, [
                          createVNode("div", { class: "w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-10 h-10 text-white",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                              })
                            ]))
                          ]),
                          createVNode("h3", { class: "text-3xl font-bold text-white mb-4" }, "Misi")
                        ]),
                        createVNode("p", { class: "text-lg text-white/80 leading-relaxed text-center" }, [
                          createTextVNode(" Memberikan pengalaman berwirausaha yang "),
                          createVNode("span", { class: "text-purple-400 font-semibold" }, "menggabungkan aspek teoritis dan praktis"),
                          createTextVNode(" secara adaptif, serta membangun organisasi yang sinergis baik internal maupun eksternal UKMK FT UNSOED. ")
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "relative py-32 overflow-hidden" }, [
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" }),
                createVNode("div", { class: "relative z-10 max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "text-center mb-20" }, [
                    createVNode("div", { class: "inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 mr-2",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", { d: "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" })
                      ])),
                      createTextVNode(" Nilai-Nilai Kami ")
                    ]),
                    createVNode("h2", { class: "text-4xl md:text-5xl font-black text-slate-900 mb-6" }, [
                      createTextVNode(" Prinsip yang Kami "),
                      createVNode("span", { class: "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block" }, " Pegang Teguh ")
                    ]),
                    createVNode("p", { class: "text-xl text-slate-600 max-w-3xl mx-auto" }, " Fondasi yang memandu setiap langkah dan keputusan dalam perjalanan SEEO ")
                  ]),
                  createVNode("div", { class: "grid md:grid-cols-2 lg:grid-cols-3 gap-8" }, [
                    createVNode("div", { class: "group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500" }, [
                      createVNode("div", { class: "w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-8 h-8 text-white",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M13 10V3L4 14h7v7l9-11h-7z"
                          })
                        ]))
                      ]),
                      createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-4" }, "Inovasi"),
                      createVNode("p", { class: "text-slate-600 leading-relaxed" }, " Selalu mencari cara baru dan kreatif untuk mengembangkan program dan solusi entrepreneurship. ")
                    ]),
                    createVNode("div", { class: "group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500" }, [
                      createVNode("div", { class: "w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-8 h-8 text-white",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          })
                        ]))
                      ]),
                      createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-4" }, "Kolaborasi"),
                      createVNode("p", { class: "text-slate-600 leading-relaxed" }, " Membangun kemitraan yang kuat dengan berbagai pihak untuk mencapai tujuan bersama. ")
                    ]),
                    createVNode("div", { class: "group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 md:col-span-2 lg:col-span-1" }, [
                      createVNode("div", { class: "w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-8 h-8 text-white",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          })
                        ]))
                      ]),
                      createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-4" }, "Keunggulan"),
                      createVNode("p", { class: "text-slate-600 leading-relaxed" }, " Berkomitmen untuk memberikan hasil terbaik dalam setiap program dan layanan yang kami berikan. ")
                    ])
                  ]),
                  createVNode("div", { class: "text-center mt-20" }, [
                    createVNode("div", { class: "bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white" }, [
                      createVNode("h3", { class: "text-3xl font-bold mb-6" }, "Bergabung dengan Kami"),
                      createVNode("p", { class: "text-xl text-white/80 mb-8 max-w-2xl mx-auto" }, " Mari bersama-sama membangun masa depan entrepreneurship yang lebih cerah "),
                      createVNode("div", { class: "flex flex-col sm:flex-row gap-4 justify-center" }, [
                        createVNode(_component_Link, {
                          href: "/contact",
                          class: "inline-flex items-center px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "Hubungi Kami"),
                            (openBlock(), createBlock("svg", {
                              class: "ml-2 w-5 h-5",
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
                          ]),
                          _: 1
                        }),
                        createVNode(_component_Link, {
                          href: "/structure",
                          class: "inline-flex items-center px-8 py-4 rounded-2xl border-2 border-white text-white font-bold hover:bg-white hover:text-slate-900 transition-all duration-300"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "Lihat Struktur"),
                            (openBlock(), createBlock("svg", {
                              class: "ml-2 w-5 h-5",
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
                          ]),
                          _: 1
                        })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/About.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
