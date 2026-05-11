import { ref, unref, withCtx, createTextVNode, createBlock, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-BM372l0n.js";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const fallbackLogo = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyNlMmU4ZjAnLz48dGV4dCB4PSc1MCUnIHk9JzUwJScgZmlsbD0nI2EwYWJjMCcgZm9udC1zaXplPScxNScgZm9udC1mYW1pbHk9J3NhbnMtc2VyaWYnIGFsaWdubWVudC1iYXNlbGluZT0nbWlkZGxlJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJz5TQU1QTEUgSU1BR0U8L3RleHQ+PC9zdmc+";
const _sfc_main = {
  __name: "Homepage",
  __ssrInlineRender: true,
  setup(__props) {
    const logoSrc = ref("/storage/images/misc/logo.png");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Soedirman Engineering Entrepreneurship Organization" }, null, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<header class="relative bg-white min-h-[calc(100vh-5rem)] flex items-center overflow-hidden" data-v-e63d305c${_scopeId}><div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full" data-v-e63d305c${_scopeId}><div class="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center" data-v-e63d305c${_scopeId}><div class="max-w-2xl" data-v-e63d305c${_scopeId}><h1 class="text-5xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-8 leading-[1.1]" data-v-e63d305c${_scopeId}> Soedirman Engineering <br data-v-e63d305c${_scopeId}><span class="text-blue-600 italic" data-v-e63d305c${_scopeId}>Entrepreneurship</span> Organization </h1><p class="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl" data-v-e63d305c${_scopeId}> Wadah resmi kemahasiswaan Fakultas Teknik UNSOED untuk berinovasi, berkolaborasi, dan mengembangkan potensi bisnis melalui pendekatan profesional yang terukur. </p><div class="flex flex-col sm:flex-row gap-5" data-v-e63d305c${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/about",
              class: "inline-flex justify-center items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Tentang SEEO `);
                } else {
                  return [
                    createTextVNode(" Tentang SEEO ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<a href="/shop/home" target="_blank" class="inline-flex justify-center items-center px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all duration-300" data-v-e63d305c${_scopeId}> Kunjungi Blaterian </a></div></div><div class="relative lg:ml-auto w-full max-w-lg lg:max-w-none hidden lg:block" data-v-e63d305c${_scopeId}><div class="aspect-[4/3] rounded-[2rem] bg-slate-50 overflow-hidden shadow-2xl border border-slate-100 relative" data-v-e63d305c${_scopeId}><img${ssrRenderAttr("src", logoSrc.value)} alt="SEEO Kegiatan" class="w-full h-full object-cover" data-v-e63d305c${_scopeId}></div><div class="absolute -bottom-6 -left-6 bg-white p-8 rounded-2xl shadow-2xl border border-slate-50 flex items-center gap-8" data-v-e63d305c${_scopeId}><div data-v-e63d305c${_scopeId}><p class="text-4xl font-black text-blue-600" data-v-e63d305c${_scopeId}>8</p><p class="text-xs text-slate-400 font-bold uppercase tracking-widest" data-v-e63d305c${_scopeId}>Departemen</p></div><div class="w-px h-12 bg-slate-100" data-v-e63d305c${_scopeId}></div><div data-v-e63d305c${_scopeId}><p class="text-4xl font-black text-amber-500" data-v-e63d305c${_scopeId}>40+</p><p class="text-xs text-slate-400 font-bold uppercase tracking-widest" data-v-e63d305c${_scopeId}>Pengurus Aktif</p></div></div></div></div></div><div class="absolute top-0 right-0 -z-10 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent hidden lg:block" data-v-e63d305c${_scopeId}></div></header><section class="py-24 bg-slate-50 border-t border-slate-100" data-v-e63d305c${_scopeId}><div class="max-w-7xl mx-auto px-6 lg:px-8" data-v-e63d305c${_scopeId}><div class="text-center max-w-2xl mx-auto mb-16" data-v-e63d305c${_scopeId}><h2 class="text-3xl font-bold text-slate-900 mb-4" data-v-e63d305c${_scopeId}>Pilar Program Kami</h2><p class="text-lg text-slate-600 leading-relaxed" data-v-e63d305c${_scopeId}>Fokus strategis organisasi kami dalam memfasilitasi dan mengembangkan ekosistem kewirausahaan yang profesional bagi mahasiswa.</p></div><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-v-e63d305c${_scopeId}><div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200" data-v-e63d305c${_scopeId}><div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100" data-v-e63d305c${_scopeId}><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e63d305c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11a3 3 0 106 0V8a3 3 0 00-6 0v3zm-4 8v1a2 2 0 002 2h10a2 2 0 002-2v-1M12 4v1m0 0a3 3 0 106 0 3 3 0 00-6 0zm-7 6h2m12 0h2m-2.121 4.243l1.414 1.414M4.929 15.243l1.414 1.414" data-v-e63d305c${_scopeId}></path></svg></div><h3 class="text-xl font-bold text-slate-900 mb-3" data-v-e63d305c${_scopeId}>Inkubasi Bisnis</h3><p class="text-slate-600 leading-relaxed" data-v-e63d305c${_scopeId}>Penyediaan fasilitas operasional dan pendampingan fundamental untuk mengeksekusi ide bisnis dengan pendekatan yang terstruktur.</p></div><div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200" data-v-e63d305c${_scopeId}><div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100" data-v-e63d305c${_scopeId}><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e63d305c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-e63d305c${_scopeId}></path></svg></div><h3 class="text-xl font-bold text-slate-900 mb-3" data-v-e63d305c${_scopeId}>Kolaborasi &amp; Relasi</h3><p class="text-slate-600 leading-relaxed" data-v-e63d305c${_scopeId}>Membangun jejaring yang kompeten antar civitas, praktisi ahli, dan alumni guna menciptakan dan menangkap peluang kemitraan strategis.</p></div><div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200 md:col-span-2 lg:col-span-1" data-v-e63d305c${_scopeId}><div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100" data-v-e63d305c${_scopeId}><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e63d305c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-e63d305c${_scopeId}></path></svg></div><h3 class="text-xl font-bold text-slate-900 mb-3" data-v-e63d305c${_scopeId}>Peningkatan Kapasitas</h3><p class="text-slate-600 leading-relaxed" data-v-e63d305c${_scopeId}>Agenda pelatihan, workshop edukasi, dan seminar komprehensif yang spesifik bertujuan mengasah teknis manajemen serta daya saing sumber daya.</p></div></div></div></section><section class="py-24 bg-amber-50" data-v-e63d305c${_scopeId}><div class="max-w-7xl mx-auto px-6 lg:px-8" data-v-e63d305c${_scopeId}><div class="bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-sm border border-amber-200" data-v-e63d305c${_scopeId}><div class="p-10 lg:p-16 lg:w-1/2 flex flex-col justify-center text-left" data-v-e63d305c${_scopeId}><div class="inline-flex items-center px-3 py-1 bg-amber-50 text-amber-700 text-sm font-semibold rounded-full mb-6 border border-amber-200 w-fit uppercase tracking-wider" data-v-e63d305c${_scopeId}> Official Business Unit </div><h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-6" data-v-e63d305c${_scopeId}>Blaterian Enterprise</h2><p class="text-lg text-slate-700 mb-8 leading-relaxed font-light" data-v-e63d305c${_scopeId}> Lini komersial kebanggaan SEEO FT UNSOED. Menyajikan kurasi produk <em class="text-slate-900 font-medium" data-v-e63d305c${_scopeId}>merchandise</em> aparatus kampus dan <em class="text-slate-900 font-medium" data-v-e63d305c${_scopeId}>food &amp; beverages</em> dengan standar kualitas profesional dari karya orisinil mahasiswa. </p><div class="flex flex-col sm:flex-row gap-4 mb-10" data-v-e63d305c${_scopeId}><div class="flex items-center gap-3 text-slate-700" data-v-e63d305c${_scopeId}><div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200" data-v-e63d305c${_scopeId}><svg class="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20" data-v-e63d305c${_scopeId}><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-v-e63d305c${_scopeId}></path></svg></div><span class="font-medium text-sm" data-v-e63d305c${_scopeId}>Blaterian Goods</span></div><div class="flex items-center gap-3 text-slate-700" data-v-e63d305c${_scopeId}><div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200" data-v-e63d305c${_scopeId}><svg class="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20" data-v-e63d305c${_scopeId}><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-v-e63d305c${_scopeId}></path></svg></div><span class="font-medium text-sm" data-v-e63d305c${_scopeId}>Blaterian Foods</span></div></div><div data-v-e63d305c${_scopeId}><a href="/shop/home" target="_blank" class="inline-flex justify-center items-center px-6 py-3.5 bg-amber-500 text-slate-900 font-bold rounded-lg shadow hover:bg-amber-400 hover:shadow-md transition-all duration-200" data-v-e63d305c${_scopeId}> Akses Katalog Portal </a></div></div><div class="lg:w-1/2 bg-amber-100 p-10 flex items-center justify-center relative min-h-[350px]" data-v-e63d305c${_scopeId}><div class="absolute inset-0 opacity-20 bg-[url(&#39;data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=&#39;)] [mask-image:linear-gradient(to_bottom,white,transparent)]" data-v-e63d305c${_scopeId}></div><div class="relative w-full max-w-sm aspect-square bg-white rounded-full border border-amber-200 shadow-xl flex items-center justify-center p-8" data-v-e63d305c${_scopeId}><img${ssrRenderAttr("src", logoSrc.value)} alt="Blaterian Representatif" class="w-1/2 h-1/2 object-contain" data-v-e63d305c${_scopeId}></div></div></div></div></section><section class="py-24 bg-slate-50 border-t border-slate-200" data-v-e63d305c${_scopeId}><div class="max-w-7xl mx-auto px-6 lg:px-8" data-v-e63d305c${_scopeId}><div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6" data-v-e63d305c${_scopeId}><div class="max-w-2xl" data-v-e63d305c${_scopeId}><h2 class="text-3xl font-bold text-slate-900 mb-4" data-v-e63d305c${_scopeId}>Aktivitas Terkini Organisasi</h2><p class="text-slate-600 text-lg leading-relaxed" data-v-e63d305c${_scopeId}>Tinjauan dokumentatif pelaksanaan agenda internal dan eksternal kami dalam memvalidasi komitmen operasional.</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/activity",
              class: "inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors whitespace-nowrap bg-blue-50 px-4 py-2 rounded-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Seluruh Dokumentasi <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e63d305c${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-v-e63d305c${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createTextVNode(" Seluruh Dokumentasi "),
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5 ml-2",
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
            _push2(`</div><div class="grid md:grid-cols-3 gap-8" data-v-e63d305c${_scopeId}><div class="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col" data-v-e63d305c${_scopeId}><div class="aspect-[4/3] bg-slate-100 relative overflow-hidden" data-v-e63d305c${_scopeId}><img${ssrRenderAttr("src", logoSrc.value)} alt="Pelatihan Bisnis" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" data-v-e63d305c${_scopeId}></div><div class="p-6 flex-1 flex flex-col" data-v-e63d305c${_scopeId}><div class="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3" data-v-e63d305c${_scopeId}>Agenda Pelatihan</div><h3 class="text-xl font-bold text-slate-900 mb-3" data-v-e63d305c${_scopeId}>Entrepreneur Class</h3><p class="text-slate-600 text-sm leading-relaxed mb-4" data-v-e63d305c${_scopeId}>Pelaksanaan kursus intensif berbasis studi kasus terkait manajemen administrasi serta penetrasi digital marketing yang efisien.</p></div></div><div class="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col" data-v-e63d305c${_scopeId}><div class="aspect-[4/3] bg-slate-100 relative overflow-hidden" data-v-e63d305c${_scopeId}><img${ssrRenderAttr("src", logoSrc.value)} alt="Studi Banding" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" data-v-e63d305c${_scopeId}></div><div class="p-6 flex-1 flex flex-col" data-v-e63d305c${_scopeId}><div class="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3" data-v-e63d305c${_scopeId}>Agenda Relasi Publik</div><h3 class="text-xl font-bold text-slate-900 mb-3" data-v-e63d305c${_scopeId}>Visitasi Kelembagaan</h3><p class="text-slate-600 text-sm leading-relaxed mb-4" data-v-e63d305c${_scopeId}>Pertukaran insight prosedural serta wawasan manajerial ke berbagai inkubator lokal guna benchmarking sistem organisasi.</p></div></div><div class="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col" data-v-e63d305c${_scopeId}><div class="aspect-[4/3] bg-slate-100 relative overflow-hidden" data-v-e63d305c${_scopeId}><img${ssrRenderAttr("src", logoSrc.value)} alt="Kapasitas Internal" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" data-v-e63d305c${_scopeId}></div><div class="p-6 flex-1 flex flex-col" data-v-e63d305c${_scopeId}><div class="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3" data-v-e63d305c${_scopeId}>Kapasitas Internal</div><h3 class="text-xl font-bold text-slate-900 mb-3" data-v-e63d305c${_scopeId}>Team Upgrading</h3><p class="text-slate-600 text-sm leading-relaxed mb-4" data-v-e63d305c${_scopeId}>Penguatan struktur kohesif internal antar anggota manajemen guna mempertahankan stabilitas sinergi pelaksanaan program kerja.</p></div></div></div></div></section>`);
          } else {
            return [
              createVNode("header", { class: "relative bg-white min-h-[calc(100vh-5rem)] flex items-center overflow-hidden" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full" }, [
                  createVNode("div", { class: "grid lg:grid-cols-2 gap-12 lg:gap-8 items-center" }, [
                    createVNode("div", { class: "max-w-2xl" }, [
                      createVNode("h1", { class: "text-5xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-8 leading-[1.1]" }, [
                        createTextVNode(" Soedirman Engineering "),
                        createVNode("br"),
                        createVNode("span", { class: "text-blue-600 italic" }, "Entrepreneurship"),
                        createTextVNode(" Organization ")
                      ]),
                      createVNode("p", { class: "text-xl text-slate-600 mb-10 leading-relaxed max-w-xl" }, " Wadah resmi kemahasiswaan Fakultas Teknik UNSOED untuk berinovasi, berkolaborasi, dan mengembangkan potensi bisnis melalui pendekatan profesional yang terukur. "),
                      createVNode("div", { class: "flex flex-col sm:flex-row gap-5" }, [
                        createVNode(unref(Link), {
                          href: "/about",
                          class: "inline-flex justify-center items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tentang SEEO ")
                          ]),
                          _: 1
                        }),
                        createVNode("a", {
                          href: "/shop/home",
                          target: "_blank",
                          class: "inline-flex justify-center items-center px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all duration-300"
                        }, " Kunjungi Blaterian ")
                      ])
                    ]),
                    createVNode("div", { class: "relative lg:ml-auto w-full max-w-lg lg:max-w-none hidden lg:block" }, [
                      createVNode("div", { class: "aspect-[4/3] rounded-[2rem] bg-slate-50 overflow-hidden shadow-2xl border border-slate-100 relative" }, [
                        createVNode("img", {
                          src: logoSrc.value,
                          alt: "SEEO Kegiatan",
                          class: "w-full h-full object-cover",
                          onError: ($event) => $event.target.src = fallbackLogo
                        }, null, 40, ["src", "onError"])
                      ]),
                      createVNode("div", { class: "absolute -bottom-6 -left-6 bg-white p-8 rounded-2xl shadow-2xl border border-slate-50 flex items-center gap-8" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-4xl font-black text-blue-600" }, "8"),
                          createVNode("p", { class: "text-xs text-slate-400 font-bold uppercase tracking-widest" }, "Departemen")
                        ]),
                        createVNode("div", { class: "w-px h-12 bg-slate-100" }),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-4xl font-black text-amber-500" }, "40+"),
                          createVNode("p", { class: "text-xs text-slate-400 font-bold uppercase tracking-widest" }, "Pengurus Aktif")
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "absolute top-0 right-0 -z-10 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent hidden lg:block" })
              ]),
              createVNode("section", { class: "py-24 bg-slate-50 border-t border-slate-100" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 lg:px-8" }, [
                  createVNode("div", { class: "text-center max-w-2xl mx-auto mb-16" }, [
                    createVNode("h2", { class: "text-3xl font-bold text-slate-900 mb-4" }, "Pilar Program Kami"),
                    createVNode("p", { class: "text-lg text-slate-600 leading-relaxed" }, "Fokus strategis organisasi kami dalam memfasilitasi dan mengembangkan ekosistem kewirausahaan yang profesional bagi mahasiswa.")
                  ]),
                  createVNode("div", { class: "grid md:grid-cols-2 lg:grid-cols-3 gap-8" }, [
                    createVNode("div", { class: "bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200" }, [
                      createVNode("div", { class: "w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100" }, [
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
                            d: "M9 11a3 3 0 106 0V8a3 3 0 00-6 0v3zm-4 8v1a2 2 0 002 2h10a2 2 0 002-2v-1M12 4v1m0 0a3 3 0 106 0 3 3 0 00-6 0zm-7 6h2m12 0h2m-2.121 4.243l1.414 1.414M4.929 15.243l1.414 1.414"
                          })
                        ]))
                      ]),
                      createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-3" }, "Inkubasi Bisnis"),
                      createVNode("p", { class: "text-slate-600 leading-relaxed" }, "Penyediaan fasilitas operasional dan pendampingan fundamental untuk mengeksekusi ide bisnis dengan pendekatan yang terstruktur.")
                    ]),
                    createVNode("div", { class: "bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200" }, [
                      createVNode("div", { class: "w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100" }, [
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
                            d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          })
                        ]))
                      ]),
                      createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-3" }, "Kolaborasi & Relasi"),
                      createVNode("p", { class: "text-slate-600 leading-relaxed" }, "Membangun jejaring yang kompeten antar civitas, praktisi ahli, dan alumni guna menciptakan dan menangkap peluang kemitraan strategis.")
                    ]),
                    createVNode("div", { class: "bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200 md:col-span-2 lg:col-span-1" }, [
                      createVNode("div", { class: "w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100" }, [
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
                            d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          })
                        ]))
                      ]),
                      createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-3" }, "Peningkatan Kapasitas"),
                      createVNode("p", { class: "text-slate-600 leading-relaxed" }, "Agenda pelatihan, workshop edukasi, dan seminar komprehensif yang spesifik bertujuan mengasah teknis manajemen serta daya saing sumber daya.")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-amber-50" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-sm border border-amber-200" }, [
                    createVNode("div", { class: "p-10 lg:p-16 lg:w-1/2 flex flex-col justify-center text-left" }, [
                      createVNode("div", { class: "inline-flex items-center px-3 py-1 bg-amber-50 text-amber-700 text-sm font-semibold rounded-full mb-6 border border-amber-200 w-fit uppercase tracking-wider" }, " Official Business Unit "),
                      createVNode("h2", { class: "text-3xl lg:text-4xl font-bold text-slate-900 mb-6" }, "Blaterian Enterprise"),
                      createVNode("p", { class: "text-lg text-slate-700 mb-8 leading-relaxed font-light" }, [
                        createTextVNode(" Lini komersial kebanggaan SEEO FT UNSOED. Menyajikan kurasi produk "),
                        createVNode("em", { class: "text-slate-900 font-medium" }, "merchandise"),
                        createTextVNode(" aparatus kampus dan "),
                        createVNode("em", { class: "text-slate-900 font-medium" }, "food & beverages"),
                        createTextVNode(" dengan standar kualitas profesional dari karya orisinil mahasiswa. ")
                      ]),
                      createVNode("div", { class: "flex flex-col sm:flex-row gap-4 mb-10" }, [
                        createVNode("div", { class: "flex items-center gap-3 text-slate-700" }, [
                          createVNode("div", { class: "w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4 text-amber-600",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createVNode("path", {
                                "fill-rule": "evenodd",
                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                "clip-rule": "evenodd"
                              })
                            ]))
                          ]),
                          createVNode("span", { class: "font-medium text-sm" }, "Blaterian Goods")
                        ]),
                        createVNode("div", { class: "flex items-center gap-3 text-slate-700" }, [
                          createVNode("div", { class: "w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4 text-amber-600",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createVNode("path", {
                                "fill-rule": "evenodd",
                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                "clip-rule": "evenodd"
                              })
                            ]))
                          ]),
                          createVNode("span", { class: "font-medium text-sm" }, "Blaterian Foods")
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("a", {
                          href: "/shop/home",
                          target: "_blank",
                          class: "inline-flex justify-center items-center px-6 py-3.5 bg-amber-500 text-slate-900 font-bold rounded-lg shadow hover:bg-amber-400 hover:shadow-md transition-all duration-200"
                        }, " Akses Katalog Portal ")
                      ])
                    ]),
                    createVNode("div", { class: "lg:w-1/2 bg-amber-100 p-10 flex items-center justify-center relative min-h-[350px]" }, [
                      createVNode("div", { class: "absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" }),
                      createVNode("div", { class: "relative w-full max-w-sm aspect-square bg-white rounded-full border border-amber-200 shadow-xl flex items-center justify-center p-8" }, [
                        createVNode("img", {
                          src: logoSrc.value,
                          alt: "Blaterian Representatif",
                          class: "w-1/2 h-1/2 object-contain",
                          onError: ($event) => $event.target.src = fallbackLogo
                        }, null, 40, ["src", "onError"])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-24 bg-slate-50 border-t border-slate-200" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6" }, [
                    createVNode("div", { class: "max-w-2xl" }, [
                      createVNode("h2", { class: "text-3xl font-bold text-slate-900 mb-4" }, "Aktivitas Terkini Organisasi"),
                      createVNode("p", { class: "text-slate-600 text-lg leading-relaxed" }, "Tinjauan dokumentatif pelaksanaan agenda internal dan eksternal kami dalam memvalidasi komitmen operasional.")
                    ]),
                    createVNode(unref(Link), {
                      href: "/activity",
                      class: "inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors whitespace-nowrap bg-blue-50 px-4 py-2 rounded-lg"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Seluruh Dokumentasi "),
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5 ml-2",
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
                  ]),
                  createVNode("div", { class: "grid md:grid-cols-3 gap-8" }, [
                    createVNode("div", { class: "group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col" }, [
                      createVNode("div", { class: "aspect-[4/3] bg-slate-100 relative overflow-hidden" }, [
                        createVNode("img", {
                          src: logoSrc.value,
                          alt: "Pelatihan Bisnis",
                          class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out",
                          onError: ($event) => $event.target.src = fallbackLogo
                        }, null, 40, ["src", "onError"])
                      ]),
                      createVNode("div", { class: "p-6 flex-1 flex flex-col" }, [
                        createVNode("div", { class: "text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3" }, "Agenda Pelatihan"),
                        createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-3" }, "Entrepreneur Class"),
                        createVNode("p", { class: "text-slate-600 text-sm leading-relaxed mb-4" }, "Pelaksanaan kursus intensif berbasis studi kasus terkait manajemen administrasi serta penetrasi digital marketing yang efisien.")
                      ])
                    ]),
                    createVNode("div", { class: "group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col" }, [
                      createVNode("div", { class: "aspect-[4/3] bg-slate-100 relative overflow-hidden" }, [
                        createVNode("img", {
                          src: logoSrc.value,
                          alt: "Studi Banding",
                          class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out",
                          onError: ($event) => $event.target.src = fallbackLogo
                        }, null, 40, ["src", "onError"])
                      ]),
                      createVNode("div", { class: "p-6 flex-1 flex flex-col" }, [
                        createVNode("div", { class: "text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3" }, "Agenda Relasi Publik"),
                        createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-3" }, "Visitasi Kelembagaan"),
                        createVNode("p", { class: "text-slate-600 text-sm leading-relaxed mb-4" }, "Pertukaran insight prosedural serta wawasan manajerial ke berbagai inkubator lokal guna benchmarking sistem organisasi.")
                      ])
                    ]),
                    createVNode("div", { class: "group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col" }, [
                      createVNode("div", { class: "aspect-[4/3] bg-slate-100 relative overflow-hidden" }, [
                        createVNode("img", {
                          src: logoSrc.value,
                          alt: "Kapasitas Internal",
                          class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out",
                          onError: ($event) => $event.target.src = fallbackLogo
                        }, null, 40, ["src", "onError"])
                      ]),
                      createVNode("div", { class: "p-6 flex-1 flex flex-col" }, [
                        createVNode("div", { class: "text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3" }, "Kapasitas Internal"),
                        createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-3" }, "Team Upgrading"),
                        createVNode("p", { class: "text-slate-600 text-sm leading-relaxed mb-4" }, "Penguatan struktur kohesif internal antar anggota manajemen guna mempertahankan stabilitas sinergi pelaksanaan program kerja.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Homepage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Homepage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e63d305c"]]);
export {
  Homepage as default
};
//# sourceMappingURL=Homepage-GuWpTIpt.js.map
