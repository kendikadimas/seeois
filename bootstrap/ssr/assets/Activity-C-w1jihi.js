import { unref, withCtx, createVNode, createBlock, openBlock, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-CBiR0q4v.js";
import { Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Activity",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Kegiatan & Program - SEEO" }, null, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="relative min-h-screen flex items-center justify-center overflow-hidden"${_scopeId}><div class="absolute inset-0"${_scopeId}><div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"${_scopeId}></div><div class="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 animate-gradient-shift"${_scopeId}></div><div class="absolute inset-0 bg-black/20"${_scopeId}></div></div><div class="absolute inset-0 overflow-hidden"${_scopeId}><div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl animate-float-slow"${_scopeId}></div><div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slower"${_scopeId}></div><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/5 to-purple-500/5 rounded-full blur-3xl animate-pulse-slow"${_scopeId}></div></div><div class="absolute inset-0 opacity-[0.03]" style="${ssrRenderStyle({ "background-image": "radial-gradient(circle, #ffffff 1px, transparent 1px)", "background-size": "50px 50px" })}"${_scopeId}></div><div class="relative z-10 max-w-6xl mx-auto px-6 text-center"${_scopeId}><div class="space-y-8"${_scopeId}><div class="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white"${_scopeId}><svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg><span class="font-semibold"${_scopeId}>Program &amp; Kegiatan SEEO</span></div><div${_scopeId}><h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"${_scopeId}><span class="block"${_scopeId}>Aksi Nyata</span><span class="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"${_scopeId}> Entrepreneurship </span></h1><p class="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed"${_scopeId}> Jelajahi dokumentasi perjalanan kami dalam membangun ekosistem entrepreneur </p></div><div class="grid grid-cols-3 gap-8 max-w-2xl mx-auto"${_scopeId}><div class="text-center"${_scopeId}><div class="text-4xl font-black text-cyan-400 mb-2"${_scopeId}>50+</div><div class="text-white/70 text-sm"${_scopeId}>Program Sukses</div></div><div class="text-center"${_scopeId}><div class="text-4xl font-black text-blue-400 mb-2"${_scopeId}>1000+</div><div class="text-white/70 text-sm"${_scopeId}>Peserta Terlibat</div></div><div class="text-center"${_scopeId}><div class="text-4xl font-black text-purple-400 mb-2"${_scopeId}>5+</div><div class="text-white/70 text-sm"${_scopeId}>Tahun Pengalaman</div></div></div></div></div><div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce"${_scopeId}><div class="flex flex-col items-center"${_scopeId}><span class="text-sm font-medium mb-2"${_scopeId}>Lihat Program Kami</span><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"${_scopeId}></path></svg></div></div></section><section class="relative py-32 overflow-hidden"${_scopeId}><div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"${_scopeId}><div class="absolute inset-0 opacity-[0.02]" style="${ssrRenderStyle({ "background-image": "radial-gradient(circle, #3b82f6 1px, transparent 1px)", "background-size": "30px 30px" })}"${_scopeId}></div></div><div class="relative z-10 max-w-7xl mx-auto px-6"${_scopeId}><div class="text-center mb-20"${_scopeId}><div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6"${_scopeId}><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"${_scopeId}></path></svg> Program Unggulan </div><h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6"${_scopeId}> EntClass I <span class="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"${_scopeId}> Entrepreneur Bootcamp </span></h2><p class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"${_scopeId}> Program intensif pengembangan jiwa entrepreneur melalui pembelajaran terintegrasi </p></div><div class="grid lg:grid-cols-2 gap-16 items-center mb-20"${_scopeId}><div class="relative group"${_scopeId}><div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1"${_scopeId}><div class="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden bg-white"${_scopeId}><img src="/storage/local/images/compro/entclass.JPG" alt="EntClass I" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"${_scopeId}></div><div class="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"${_scopeId}><div class="flex items-center justify-between text-white mb-4"${_scopeId}><span class="bg-indigo-600 px-3 py-1 rounded-full text-xs font-bold"${_scopeId}>Human Resources</span><span class="text-sm font-medium"${_scopeId}>2024</span></div><h3 class="text-xl font-bold text-white mb-2"${_scopeId}>EntClass I Workshop</h3><p class="text-white/80 text-sm"${_scopeId}>Intensive entrepreneurship training program</p></div></div></div><div class="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform rotate-12 hover:rotate-0 transition-transform duration-300"${_scopeId}><div class="text-center"${_scopeId}><div class="text-2xl font-black text-indigo-600 mb-1"${_scopeId}>50+</div><div class="text-xs text-gray-600"${_scopeId}>Peserta</div></div></div><div class="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform -rotate-12 hover:rotate-0 transition-transform duration-300"${_scopeId}><div class="text-center"${_scopeId}><div class="text-2xl font-black text-purple-600 mb-1"${_scopeId}>3</div><div class="text-xs text-gray-600"${_scopeId}>Hari</div></div></div></div><div class="space-y-8"${_scopeId}><div${_scopeId}><h3 class="text-3xl font-bold text-slate-900 mb-6"${_scopeId}>Transformasi Mindset Entrepreneur</h3><div class="space-y-4 text-lg text-slate-700"${_scopeId}><p class="leading-relaxed"${_scopeId}> EntClass I merupakan program pelatihan intensif yang dirancang khusus untuk <span class="font-semibold text-indigo-600"${_scopeId}>mengembangkan mindset entrepreneur</span> di kalangan mahasiswa Fakultas Teknik UNSOED. </p><p class="leading-relaxed"${_scopeId}> Program ini mencakup pembelajaran komprehensif mulai dari <span class="font-semibold text-purple-600"${_scopeId}>analisis pasar, business model canvas, hingga strategi pemasaran digital</span> yang relevan dengan era modern. </p></div></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"${_scopeId}><div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4"${_scopeId}><svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"${_scopeId}></path></svg></div><h4 class="font-bold text-slate-900 mb-2"${_scopeId}>Ide &amp; Inovasi</h4><p class="text-sm text-slate-600"${_scopeId}>Pengembangan ide bisnis inovatif</p></div><div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"${_scopeId}><div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4"${_scopeId}><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"${_scopeId}></path></svg></div><h4 class="font-bold text-slate-900 mb-2"${_scopeId}>Analisis Pasar</h4><p class="text-sm text-slate-600"${_scopeId}>Strategi analisis dan riset pasar</p></div></div><div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white"${_scopeId}><h4 class="text-xl font-bold mb-6"${_scopeId}>Dampak Program</h4><div class="grid grid-cols-3 gap-4"${_scopeId}><div class="text-center"${_scopeId}><div class="text-2xl font-black text-cyan-300 mb-1"${_scopeId}>95%</div><div class="text-white/80 text-xs"${_scopeId}>Tingkat Kepuasan</div></div><div class="text-center"${_scopeId}><div class="text-2xl font-black text-blue-300 mb-1"${_scopeId}>80%</div><div class="text-white/80 text-xs"${_scopeId}>Melanjutkan Bisnis</div></div><div class="text-center"${_scopeId}><div class="text-2xl font-black text-purple-300 mb-1"${_scopeId}>15+</div><div class="text-white/80 text-xs"${_scopeId}>Startup Lahir</div></div></div></div></div></div></div></section><section class="relative py-32 overflow-hidden"${_scopeId}><div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"${_scopeId}><div class="absolute inset-0 opacity-10"${_scopeId}></div></div><div class="relative z-10 max-w-7xl mx-auto px-6"${_scopeId}><div class="text-center mb-20"${_scopeId}><div class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-6"${_scopeId}><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> Kegiatan Lainnya </div><h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"${_scopeId}> Program <span class="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"${_scopeId}> Berkelanjutan </span></h2><p class="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"${_scopeId}> Serangkaian program yang dirancang untuk membangun ekosistem entrepreneur yang kuat dan berkelanjutan </p></div><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"${_scopeId}><div class="group relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105"${_scopeId}><div class="relative h-64 overflow-hidden"${_scopeId}><img src="/storage/local/images/compro/visitasi.JPG" alt="Visitasi I" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"${_scopeId}></div><div class="absolute top-4 left-4"${_scopeId}><span class="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white"${_scopeId}> Public Relations </span></div><div class="absolute bottom-6 left-6 right-6"${_scopeId}><h3 class="text-xl font-bold text-white mb-2"${_scopeId}>Visitasi I</h3><p class="text-white/80 text-sm"${_scopeId}>Studi banding ke KOPMA UIN SAIZU untuk memperluas wawasan organizational management</p></div></div><div class="p-6"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><span class="text-green-400 text-sm font-medium"${_scopeId}>Learning Experience</span><svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg></div><p class="text-white/70 text-sm leading-relaxed"${_scopeId}> Eksplorasi best practices dalam kewirausahaan dan manajemen organisasi melalui interaksi langsung dengan komunitas entrepreneur sukses. </p></div></div><div class="group relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105"${_scopeId}><div class="relative h-64 overflow-hidden"${_scopeId}><img src="/storage/local/images/compro/upgrading.webp" alt="Upgrading I" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"${_scopeId}></div><div class="absolute top-4 left-4"${_scopeId}><span class="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-pink-600 text-white"${_scopeId}> Human Resources </span></div><div class="absolute bottom-6 left-6 right-6"${_scopeId}><h3 class="text-xl font-bold text-white mb-2"${_scopeId}>Upgrading I</h3><p class="text-white/80 text-sm"${_scopeId}>Team building intensive untuk memperkuat soliditas dan chemistry antar anggota</p></div></div><div class="p-6"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><span class="text-red-400 text-sm font-medium"${_scopeId}>Team Building</span><svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg></div><p class="text-white/70 text-sm leading-relaxed"${_scopeId}> Kegiatan bonding yang dirancang untuk meningkatkan kolaborasi, komunikasi, dan semangat kebersamaan dalam tim. </p></div></div><div class="group relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105 md:col-span-2 lg:col-span-1"${_scopeId}><div class="relative h-64 overflow-hidden"${_scopeId}><img src="/storage/local/images/compro/raplen1.JPG" alt="Rapat Pleno I" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"${_scopeId}></div><div class="absolute top-4 left-4"${_scopeId}><span class="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-500 to-orange-600 text-white"${_scopeId}> CEO-CoCEO </span></div><div class="absolute bottom-6 left-6 right-6"${_scopeId}><h3 class="text-xl font-bold text-white mb-2"${_scopeId}>Rapat Pleno I</h3><p class="text-white/80 text-sm"${_scopeId}>Evaluasi komprehensif perkembangan dan roadmap strategis organisasi</p></div></div><div class="p-6"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><span class="text-yellow-400 text-sm font-medium"${_scopeId}>Strategic Planning</span><svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg></div><p class="text-white/70 text-sm leading-relaxed"${_scopeId}> Forum evaluasi menyeluruh untuk membahas progress setiap departemen dan merumuskan strategi pengembangan organisasi ke depan. </p></div></div></div><div class="text-center mt-20"${_scopeId}><div class="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl p-12 text-white"${_scopeId}><h3 class="text-3xl font-bold mb-6"${_scopeId}>Bergabung dalam Perjalanan Kami</h3><p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"${_scopeId}> Jadilah bagian dari komunitas entrepreneur yang dinamis dan terus berinovasi </p><div class="flex flex-col sm:flex-row gap-4 justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
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
            _push2(ssrRenderComponent(unref(Link), {
              href: "/structure",
              class: "inline-flex items-center px-8 py-4 rounded-2xl border-2 border-white text-white font-bold hover:bg-white hover:text-slate-900 transition-all duration-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Lihat Tim Kami</span><svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createVNode("span", null, "Lihat Tim Kami"),
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
                  createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900" }),
                  createVNode("div", { class: "absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 animate-gradient-shift" }),
                  createVNode("div", { class: "absolute inset-0 bg-black/20" })
                ]),
                createVNode("div", { class: "absolute inset-0 overflow-hidden" }, [
                  createVNode("div", { class: "absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl animate-float-slow" }),
                  createVNode("div", { class: "absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slower" }),
                  createVNode("div", { class: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/5 to-purple-500/5 rounded-full blur-3xl animate-pulse-slow" })
                ]),
                createVNode("div", {
                  class: "absolute inset-0 opacity-[0.03]",
                  style: { "background-image": "radial-gradient(circle, #ffffff 1px, transparent 1px)", "background-size": "50px 50px" }
                }),
                createVNode("div", { class: "relative z-10 max-w-6xl mx-auto px-6 text-center" }, [
                  createVNode("div", { class: "space-y-8" }, [
                    createVNode("div", { class: "inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-5 h-5 mr-3",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        })
                      ])),
                      createVNode("span", { class: "font-semibold" }, "Program & Kegiatan SEEO")
                    ]),
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight" }, [
                        createVNode("span", { class: "block" }, "Aksi Nyata"),
                        createVNode("span", { class: "block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent" }, " Entrepreneurship ")
                      ]),
                      createVNode("p", { class: "text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed" }, " Jelajahi dokumentasi perjalanan kami dalam membangun ekosistem entrepreneur ")
                    ]),
                    createVNode("div", { class: "grid grid-cols-3 gap-8 max-w-2xl mx-auto" }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("div", { class: "text-4xl font-black text-cyan-400 mb-2" }, "50+"),
                        createVNode("div", { class: "text-white/70 text-sm" }, "Program Sukses")
                      ]),
                      createVNode("div", { class: "text-center" }, [
                        createVNode("div", { class: "text-4xl font-black text-blue-400 mb-2" }, "1000+"),
                        createVNode("div", { class: "text-white/70 text-sm" }, "Peserta Terlibat")
                      ]),
                      createVNode("div", { class: "text-center" }, [
                        createVNode("div", { class: "text-4xl font-black text-purple-400 mb-2" }, "5+"),
                        createVNode("div", { class: "text-white/70 text-sm" }, "Tahun Pengalaman")
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce" }, [
                  createVNode("div", { class: "flex flex-col items-center" }, [
                    createVNode("span", { class: "text-sm font-medium mb-2" }, "Lihat Program Kami"),
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
                ])
              ]),
              createVNode("section", { class: "relative py-32 overflow-hidden" }, [
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" }, [
                  createVNode("div", {
                    class: "absolute inset-0 opacity-[0.02]",
                    style: { "background-image": "radial-gradient(circle, #3b82f6 1px, transparent 1px)", "background-size": "30px 30px" }
                  })
                ]),
                createVNode("div", { class: "relative z-10 max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "text-center mb-20" }, [
                    createVNode("div", { class: "inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 mr-2",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
                      ])),
                      createTextVNode(" Program Unggulan ")
                    ]),
                    createVNode("h2", { class: "text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6" }, [
                      createTextVNode(" EntClass I "),
                      createVNode("span", { class: "block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" }, " Entrepreneur Bootcamp ")
                    ]),
                    createVNode("p", { class: "text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed" }, " Program intensif pengembangan jiwa entrepreneur melalui pembelajaran terintegrasi ")
                  ]),
                  createVNode("div", { class: "grid lg:grid-cols-2 gap-16 items-center mb-20" }, [
                    createVNode("div", { class: "relative group" }, [
                      createVNode("div", { class: "relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1" }, [
                        createVNode("div", { class: "relative h-96 lg:h-[500px] rounded-3xl overflow-hidden bg-white" }, [
                          createVNode("img", {
                            src: "/storage/local/images/compro/entclass.JPG",
                            alt: "EntClass I",
                            class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          }),
                          createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" }),
                          createVNode("div", { class: "absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20" }, [
                            createVNode("div", { class: "flex items-center justify-between text-white mb-4" }, [
                              createVNode("span", { class: "bg-indigo-600 px-3 py-1 rounded-full text-xs font-bold" }, "Human Resources"),
                              createVNode("span", { class: "text-sm font-medium" }, "2024")
                            ]),
                            createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, "EntClass I Workshop"),
                            createVNode("p", { class: "text-white/80 text-sm" }, "Intensive entrepreneurship training program")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform rotate-12 hover:rotate-0 transition-transform duration-300" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl font-black text-indigo-600 mb-1" }, "50+"),
                          createVNode("div", { class: "text-xs text-gray-600" }, "Peserta")
                        ])
                      ]),
                      createVNode("div", { class: "absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform -rotate-12 hover:rotate-0 transition-transform duration-300" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl font-black text-purple-600 mb-1" }, "3"),
                          createVNode("div", { class: "text-xs text-gray-600" }, "Hari")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-8" }, [
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-3xl font-bold text-slate-900 mb-6" }, "Transformasi Mindset Entrepreneur"),
                        createVNode("div", { class: "space-y-4 text-lg text-slate-700" }, [
                          createVNode("p", { class: "leading-relaxed" }, [
                            createTextVNode(" EntClass I merupakan program pelatihan intensif yang dirancang khusus untuk "),
                            createVNode("span", { class: "font-semibold text-indigo-600" }, "mengembangkan mindset entrepreneur"),
                            createTextVNode(" di kalangan mahasiswa Fakultas Teknik UNSOED. ")
                          ]),
                          createVNode("p", { class: "leading-relaxed" }, [
                            createTextVNode(" Program ini mencakup pembelajaran komprehensif mulai dari "),
                            createVNode("span", { class: "font-semibold text-purple-600" }, "analisis pasar, business model canvas, hingga strategi pemasaran digital"),
                            createTextVNode(" yang relevan dengan era modern. ")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode("div", { class: "bg-white rounded-2xl p-6 shadow-lg border border-gray-100" }, [
                          createVNode("div", { class: "w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-6 h-6 text-indigo-600",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                              })
                            ]))
                          ]),
                          createVNode("h4", { class: "font-bold text-slate-900 mb-2" }, "Ide & Inovasi"),
                          createVNode("p", { class: "text-sm text-slate-600" }, "Pengembangan ide bisnis inovatif")
                        ]),
                        createVNode("div", { class: "bg-white rounded-2xl p-6 shadow-lg border border-gray-100" }, [
                          createVNode("div", { class: "w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-6 h-6 text-purple-600",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              })
                            ]))
                          ]),
                          createVNode("h4", { class: "font-bold text-slate-900 mb-2" }, "Analisis Pasar"),
                          createVNode("p", { class: "text-sm text-slate-600" }, "Strategi analisis dan riset pasar")
                        ])
                      ]),
                      createVNode("div", { class: "bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white" }, [
                        createVNode("h4", { class: "text-xl font-bold mb-6" }, "Dampak Program"),
                        createVNode("div", { class: "grid grid-cols-3 gap-4" }, [
                          createVNode("div", { class: "text-center" }, [
                            createVNode("div", { class: "text-2xl font-black text-cyan-300 mb-1" }, "95%"),
                            createVNode("div", { class: "text-white/80 text-xs" }, "Tingkat Kepuasan")
                          ]),
                          createVNode("div", { class: "text-center" }, [
                            createVNode("div", { class: "text-2xl font-black text-blue-300 mb-1" }, "80%"),
                            createVNode("div", { class: "text-white/80 text-xs" }, "Melanjutkan Bisnis")
                          ]),
                          createVNode("div", { class: "text-center" }, [
                            createVNode("div", { class: "text-2xl font-black text-purple-300 mb-1" }, "15+"),
                            createVNode("div", { class: "text-white/80 text-xs" }, "Startup Lahir")
                          ])
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
                createVNode("div", { class: "relative z-10 max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "text-center mb-20" }, [
                    createVNode("div", { class: "inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-6" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 mr-2",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
                      ])),
                      createTextVNode(" Kegiatan Lainnya ")
                    ]),
                    createVNode("h2", { class: "text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6" }, [
                      createTextVNode(" Program "),
                      createVNode("span", { class: "block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent" }, " Berkelanjutan ")
                    ]),
                    createVNode("p", { class: "text-xl text-white/70 max-w-3xl mx-auto leading-relaxed" }, " Serangkaian program yang dirancang untuk membangun ekosistem entrepreneur yang kuat dan berkelanjutan ")
                  ]),
                  createVNode("div", { class: "grid md:grid-cols-2 lg:grid-cols-3 gap-8" }, [
                    createVNode("div", { class: "group relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105" }, [
                      createVNode("div", { class: "relative h-64 overflow-hidden" }, [
                        createVNode("img", {
                          src: "/storage/local/images/compro/visitasi.JPG",
                          alt: "Visitasi I",
                          class: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        }),
                        createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" }),
                        createVNode("div", { class: "absolute top-4 left-4" }, [
                          createVNode("span", { class: "px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white" }, " Public Relations ")
                        ]),
                        createVNode("div", { class: "absolute bottom-6 left-6 right-6" }, [
                          createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, "Visitasi I"),
                          createVNode("p", { class: "text-white/80 text-sm" }, "Studi banding ke KOPMA UIN SAIZU untuk memperluas wawasan organizational management")
                        ])
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                          createVNode("span", { class: "text-green-400 text-sm font-medium" }, "Learning Experience"),
                          (openBlock(), createBlock("svg", {
                            class: "w-5 h-5 text-green-400",
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
                        createVNode("p", { class: "text-white/70 text-sm leading-relaxed" }, " Eksplorasi best practices dalam kewirausahaan dan manajemen organisasi melalui interaksi langsung dengan komunitas entrepreneur sukses. ")
                      ])
                    ]),
                    createVNode("div", { class: "group relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105" }, [
                      createVNode("div", { class: "relative h-64 overflow-hidden" }, [
                        createVNode("img", {
                          src: "/storage/local/images/compro/upgrading.webp",
                          alt: "Upgrading I",
                          class: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        }),
                        createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" }),
                        createVNode("div", { class: "absolute top-4 left-4" }, [
                          createVNode("span", { class: "px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-pink-600 text-white" }, " Human Resources ")
                        ]),
                        createVNode("div", { class: "absolute bottom-6 left-6 right-6" }, [
                          createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, "Upgrading I"),
                          createVNode("p", { class: "text-white/80 text-sm" }, "Team building intensive untuk memperkuat soliditas dan chemistry antar anggota")
                        ])
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                          createVNode("span", { class: "text-red-400 text-sm font-medium" }, "Team Building"),
                          (openBlock(), createBlock("svg", {
                            class: "w-5 h-5 text-red-400",
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
                        createVNode("p", { class: "text-white/70 text-sm leading-relaxed" }, " Kegiatan bonding yang dirancang untuk meningkatkan kolaborasi, komunikasi, dan semangat kebersamaan dalam tim. ")
                      ])
                    ]),
                    createVNode("div", { class: "group relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105 md:col-span-2 lg:col-span-1" }, [
                      createVNode("div", { class: "relative h-64 overflow-hidden" }, [
                        createVNode("img", {
                          src: "/storage/local/images/compro/raplen1.JPG",
                          alt: "Rapat Pleno I",
                          class: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        }),
                        createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" }),
                        createVNode("div", { class: "absolute top-4 left-4" }, [
                          createVNode("span", { class: "px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-500 to-orange-600 text-white" }, " CEO-CoCEO ")
                        ]),
                        createVNode("div", { class: "absolute bottom-6 left-6 right-6" }, [
                          createVNode("h3", { class: "text-xl font-bold text-white mb-2" }, "Rapat Pleno I"),
                          createVNode("p", { class: "text-white/80 text-sm" }, "Evaluasi komprehensif perkembangan dan roadmap strategis organisasi")
                        ])
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                          createVNode("span", { class: "text-yellow-400 text-sm font-medium" }, "Strategic Planning"),
                          (openBlock(), createBlock("svg", {
                            class: "w-5 h-5 text-yellow-400",
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
                        createVNode("p", { class: "text-white/70 text-sm leading-relaxed" }, " Forum evaluasi menyeluruh untuk membahas progress setiap departemen dan merumuskan strategi pengembangan organisasi ke depan. ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "text-center mt-20" }, [
                    createVNode("div", { class: "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl p-12 text-white" }, [
                      createVNode("h3", { class: "text-3xl font-bold mb-6" }, "Bergabung dalam Perjalanan Kami"),
                      createVNode("p", { class: "text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed" }, " Jadilah bagian dari komunitas entrepreneur yang dinamis dan terus berinovasi "),
                      createVNode("div", { class: "flex flex-col sm:flex-row gap-4 justify-center" }, [
                        createVNode(unref(Link), {
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
                        createVNode(unref(Link), {
                          href: "/structure",
                          class: "inline-flex items-center px-8 py-4 rounded-2xl border-2 border-white text-white font-bold hover:bg-white hover:text-slate-900 transition-all duration-300"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "Lihat Tim Kami"),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Activity.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
