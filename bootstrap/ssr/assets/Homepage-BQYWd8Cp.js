import { ref, onMounted, onUnmounted, unref, withCtx, createTextVNode, createBlock, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-B8fPWyvx.js";
import { Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Homepage",
  __ssrInlineRender: true,
  setup(__props) {
    const carousel = ref(null);
    const currentSlide = ref(0);
    const updateCurrentSlide = () => {
      if (carousel.value) {
        const cardWidth = carousel.value.children[0].offsetWidth + 16;
        const scrollLeft = carousel.value.scrollLeft;
        currentSlide.value = Math.round(scrollLeft / cardWidth);
      }
    };
    onMounted(() => {
      if (carousel.value) {
        carousel.value.addEventListener("scroll", updateCurrentSlide);
      }
    });
    onUnmounted(() => {
      if (carousel.value) {
        carousel.value.removeEventListener("scroll", updateCurrentSlide);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Soedirman Engineering Entrepreneurship Organization" }, null, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<header class="relative min-h-screen bg-white overflow-hidden"${_scopeId}><div class="max-w-7xl mx-auto px-6 sm:px-8"${_scopeId}><div class="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20"${_scopeId}><div class="space-y-8"${_scopeId}><div class="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"${_scopeId}><span class="w-2 h-2 bg-yellow-600 rounded-full mr-3"${_scopeId}></span> Universitas Jenderal Soedirman </div><div${_scopeId}><h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6"${_scopeId}> Soedirman Engineering <span class="text-blue-600"${_scopeId}>Entrepreneurship</span> Organization </h1><p class="text-xl text-slate-600 leading-relaxed max-w-lg"${_scopeId}> Set Up Your Mind To Be An Entrepreneur! </p></div><div class="flex flex-col sm:flex-row gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/about",
              class: "inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Tentang SEEO <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createTextVNode(" Tentang SEEO "),
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
            _push2(`<a href="/shop/home" target="_blank" class="inline-flex items-center justify-center px-8 py-4 border-2 border-amber-500 text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors duration-200"${_scopeId}> Kunjungi Blaterian <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"${_scopeId}></path></svg></a></div></div><div class="relative"${_scopeId}><div class="relative bg-slate-50 rounded-2xl overflow-hidden shadow-xl"${_scopeId}><img${ssrRenderAttr("src", _ctx.$imageUrl("compro/seeo.jpg"))} alt="SEEO Team" class="w-full h-96 lg:h-[500px] object-cover"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"${_scopeId}></div></div><div class="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg border"${_scopeId}><div class="text-center"${_scopeId}><div class="text-2xl font-bold text-blue-600"${_scopeId}>8</div><div class="text-sm text-slate-600"${_scopeId}>Departemen</div></div></div><div class="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border"${_scopeId}><div class="text-center"${_scopeId}><div class="text-2xl font-bold text-amber-600"${_scopeId}>44</div><div class="text-sm text-slate-600"${_scopeId}>Pengurus Aktif</div></div></div></div></div></div></header><section class="py-20 lg:py-32 bg-slate-50"${_scopeId}><div class="max-w-7xl mx-auto px-6"${_scopeId}><div class="text-center mb-16"${_scopeId}><div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-6"${_scopeId}><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> Tentang SEEO </div><h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"${_scopeId}> Mengenal Kami <span class="text-blue-600"${_scopeId}>Lebih Dekat</span></h2><p class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"${_scopeId}> Unit Kegiatan Mahasiswa Fakultas Teknik UNSOED yang berkomitmen membangun ekosistem entrepreneurship </p></div><div class="grid lg:grid-cols-2 gap-16 items-center"${_scopeId}><div class="relative"${_scopeId}><div class="bg-white rounded-2xl p-8 shadow-lg"${_scopeId}><img${ssrRenderAttr("src", _ctx.$imageUrl("compro/logo.png"))} alt="SEEO Logo" class="w-full h-auto max-w-sm mx-auto"${_scopeId}></div></div><div class="space-y-6"${_scopeId}><div${_scopeId}><p class="text-lg text-slate-700 leading-relaxed mb-4"${_scopeId}> Student Entrepreneur and Empowerment Organization (SEEO) adalah wadah bagi mahasiswa untuk <strong class="text-blue-600"${_scopeId}>belajar, berinovasi, dan bertumbuh</strong> dalam dunia wirausaha. </p><p class="text-lg text-slate-700 leading-relaxed"${_scopeId}> Kami fokus pada pengembangan dan pengelolaan bisnis, serta membina calon wirausahawan melalui brand unggulan kami, <strong class="text-amber-600"${_scopeId}>Blaterian</strong>. </p></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div class="bg-white rounded-xl p-4 border"${_scopeId}><div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3"${_scopeId}><svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"${_scopeId}></path></svg></div><h3 class="font-semibold text-slate-900 mb-1"${_scopeId}>Inovasi</h3><p class="text-sm text-slate-600"${_scopeId}>Mengembangkan ide kreatif</p></div><div class="bg-white rounded-xl p-4 border"${_scopeId}><div class="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-3"${_scopeId}><svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"${_scopeId}></path></svg></div><h3 class="font-semibold text-slate-900 mb-1"${_scopeId}>Kolaborasi</h3><p class="text-sm text-slate-600"${_scopeId}>Membangun kemitraan</p></div></div><div class="flex flex-wrap gap-4 pt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/structure",
              class: "inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Struktur Organisasi</span><svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createVNode("span", null, "Struktur Organisasi"),
                    (openBlock(), createBlock("svg", {
                      class: "ml-2 w-4 h-4",
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
              href: "/activity",
              class: "inline-flex items-center px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Lihat Kegiatan</span><svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createVNode("span", null, "Lihat Kegiatan"),
                    (openBlock(), createBlock("svg", {
                      class: "ml-2 w-4 h-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M14 5l7 7m0 0l-7 7m7-7H3"
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div></section><section class="py-20 lg:py-32 bg-amber-50"${_scopeId}><div class="max-w-7xl mx-auto px-6"${_scopeId}><div class="grid lg:grid-cols-2 gap-16 items-center"${_scopeId}><div class="order-2 lg:order-1"${_scopeId}><div class="bg-white rounded-2xl p-12 shadow-lg"${_scopeId}><img${ssrRenderAttr("src", _ctx.$imageUrl("compro/blaterianlogo.png"))} alt="Blaterian Logo" class="w-full h-auto max-w-sm mx-auto"${_scopeId}></div><div class="flex justify-center gap-4 mt-6"${_scopeId}><div class="bg-white rounded-lg px-4 py-2 shadow-sm border"${_scopeId}><span class="text-sm font-medium text-slate-700"${_scopeId}>🍽️ Blaterian Foods</span></div><div class="bg-white rounded-lg px-4 py-2 shadow-sm border"${_scopeId}><span class="text-sm font-medium text-slate-700"${_scopeId}>🛍️ Blaterian Goods</span></div></div></div><div class="order-1 lg:order-2"${_scopeId}><div class="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-6"${_scopeId}><span class="w-2 h-2 bg-amber-500 rounded-full mr-3"${_scopeId}></span> Brand Unggulan SEEO </div><h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"${_scopeId}> Blaterian <span class="block text-lg md:text-xl font-normal text-slate-600 mt-2"${_scopeId}>Karya Terbaik Kami</span></h2><div class="space-y-4 mb-8"${_scopeId}><p class="text-lg text-slate-700 leading-relaxed"${_scopeId}> Brand kebanggaan SEEO yang menghadirkan produk berkualitas tinggi hasil inovasi dan dedikasi anggota kami. </p><p class="text-slate-600"${_scopeId}> Dari makanan dan minuman segar hingga merchandise eksklusif, semua dibuat dengan standar kualitas terbaik. </p></div><div${_scopeId}><a href="/shop/home" target="_blank" class="inline-flex items-center px-8 py-4 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200"${_scopeId}> Kunjungi Toko Online <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"${_scopeId}></path></svg></a></div></div></div></div></section><section class="py-20 lg:py-32 bg-slate-900"${_scopeId}><div class="max-w-7xl mx-auto px-6"${_scopeId}><div class="text-center mb-16"${_scopeId}><div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-6"${_scopeId}><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg> Aktivitas &amp; Program SEEO </div><h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"${_scopeId}> Kegiatan Unggulan Kami </h2><p class="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"${_scopeId}> Program-program strategis yang dirancang untuk membangun ekosistem entrepreneurship yang berkelanjutan di Fakultas Teknik UNSOED </p></div><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"${_scopeId}><div class="bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-700 transition-colors duration-300"${_scopeId}><div class="h-48 overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", _ctx.$imageUrl("compro/entclass.JPG"))} alt="EntClass I" class="w-full h-full object-cover"${_scopeId}></div><div class="p-6"${_scopeId}><div class="mb-3"${_scopeId}><span class="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full"${_scopeId}> Human Resources </span></div><h3 class="text-xl font-bold text-white mb-3"${_scopeId}> EntClass I </h3><p class="text-slate-300 mb-4 leading-relaxed"${_scopeId}> Program pelatihan wirausaha intensif yang fokus pada pengembangan keterampilan bisnis fundamental dan strategi inovasi. </p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/activity",
              class: "inline-flex items-center text-blue-400 font-medium hover:text-blue-300 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Pelajari Lebih Lanjut <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createTextVNode(" Pelajari Lebih Lanjut "),
                    (openBlock(), createBlock("svg", {
                      class: "ml-2 w-4 h-4",
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
            _push2(`</div></div><div class="bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-700 transition-colors duration-300"${_scopeId}><div class="h-48 overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", _ctx.$imageUrl("compro/visitasi.JPG"))} alt="Visitasi I" class="w-full h-full object-cover"${_scopeId}></div><div class="p-6"${_scopeId}><div class="mb-3"${_scopeId}><span class="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full"${_scopeId}> Public Relations </span></div><h3 class="text-xl font-bold text-white mb-3"${_scopeId}> Visitasi I </h3><p class="text-slate-300 mb-4 leading-relaxed"${_scopeId}> Studi banding ke organisasi terkemuka untuk memperluas wawasan tentang best practices dalam kewirausahaan dan manajemen. </p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/activity",
              class: "inline-flex items-center text-green-400 font-medium hover:text-green-300 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Lihat Dokumentasi <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createTextVNode(" Lihat Dokumentasi "),
                    (openBlock(), createBlock("svg", {
                      class: "ml-2 w-4 h-4",
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
            _push2(`</div></div><div class="bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-700 transition-colors duration-300 md:col-span-2 lg:col-span-1"${_scopeId}><div class="h-48 overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", _ctx.$imageUrl("compro/upgrading.webp"))} alt="Upgrading I" class="w-full h-full object-cover"${_scopeId}></div><div class="p-6"${_scopeId}><div class="mb-3"${_scopeId}><span class="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-full"${_scopeId}> Team Building </span></div><h3 class="text-xl font-bold text-white mb-3"${_scopeId}> Upgrading I </h3><p class="text-slate-300 mb-4 leading-relaxed"${_scopeId}> Kegiatan team building yang dirancang untuk memperkuat soliditas tim dan meningkatkan chemistry antar anggota organisasi. </p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/activity",
              class: "inline-flex items-center text-red-400 font-medium hover:text-red-300 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Jelajahi Kegiatan <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createTextVNode(" Jelajahi Kegiatan "),
                    (openBlock(), createBlock("svg", {
                      class: "ml-2 w-4 h-4",
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
            _push2(`</div></div></div><div class="text-center mt-16"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/activity",
              class: "inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Lihat Semua Kegiatan <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId2}></path></svg>`);
                } else {
                  return [
                    createTextVNode(" Lihat Semua Kegiatan "),
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
            _push2(`</div></div></section>`);
          } else {
            return [
              createVNode("header", { class: "relative min-h-screen bg-white overflow-hidden" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 sm:px-8" }, [
                  createVNode("div", { class: "grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20" }, [
                    createVNode("div", { class: "space-y-8" }, [
                      createVNode("div", { class: "inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium" }, [
                        createVNode("span", { class: "w-2 h-2 bg-yellow-600 rounded-full mr-3" }),
                        createTextVNode(" Universitas Jenderal Soedirman ")
                      ]),
                      createVNode("div", null, [
                        createVNode("h1", { class: "text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6" }, [
                          createTextVNode(" Soedirman Engineering "),
                          createVNode("span", { class: "text-blue-600" }, "Entrepreneurship"),
                          createTextVNode(" Organization ")
                        ]),
                        createVNode("p", { class: "text-xl text-slate-600 leading-relaxed max-w-lg" }, " Set Up Your Mind To Be An Entrepreneur! ")
                      ]),
                      createVNode("div", { class: "flex flex-col sm:flex-row gap-4" }, [
                        createVNode(unref(Link), {
                          href: "/about",
                          class: "inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tentang SEEO "),
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
                        createVNode("a", {
                          href: "/shop/home",
                          target: "_blank",
                          class: "inline-flex items-center justify-center px-8 py-4 border-2 border-amber-500 text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors duration-200"
                        }, [
                          createTextVNode(" Kunjungi Blaterian "),
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
                              d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            })
                          ]))
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "relative" }, [
                      createVNode("div", { class: "relative bg-slate-50 rounded-2xl overflow-hidden shadow-xl" }, [
                        createVNode("img", {
                          src: _ctx.$imageUrl("compro/seeo.jpg"),
                          alt: "SEEO Team",
                          class: "w-full h-96 lg:h-[500px] object-cover"
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" })
                      ]),
                      createVNode("div", { class: "absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg border" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl font-bold text-blue-600" }, "8"),
                          createVNode("div", { class: "text-sm text-slate-600" }, "Departemen")
                        ])
                      ]),
                      createVNode("div", { class: "absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl font-bold text-amber-600" }, "44"),
                          createVNode("div", { class: "text-sm text-slate-600" }, "Pengurus Aktif")
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-20 lg:py-32 bg-slate-50" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "text-center mb-16" }, [
                    createVNode("div", { class: "inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-6" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 mr-2",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
                      ])),
                      createTextVNode(" Tentang SEEO ")
                    ]),
                    createVNode("h2", { class: "text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6" }, [
                      createTextVNode(" Mengenal Kami "),
                      createVNode("span", { class: "text-blue-600" }, "Lebih Dekat")
                    ]),
                    createVNode("p", { class: "text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed" }, " Unit Kegiatan Mahasiswa Fakultas Teknik UNSOED yang berkomitmen membangun ekosistem entrepreneurship ")
                  ]),
                  createVNode("div", { class: "grid lg:grid-cols-2 gap-16 items-center" }, [
                    createVNode("div", { class: "relative" }, [
                      createVNode("div", { class: "bg-white rounded-2xl p-8 shadow-lg" }, [
                        createVNode("img", {
                          src: _ctx.$imageUrl("compro/logo.png"),
                          alt: "SEEO Logo",
                          class: "w-full h-auto max-w-sm mx-auto"
                        }, null, 8, ["src"])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "text-lg text-slate-700 leading-relaxed mb-4" }, [
                          createTextVNode(" Student Entrepreneur and Empowerment Organization (SEEO) adalah wadah bagi mahasiswa untuk "),
                          createVNode("strong", { class: "text-blue-600" }, "belajar, berinovasi, dan bertumbuh"),
                          createTextVNode(" dalam dunia wirausaha. ")
                        ]),
                        createVNode("p", { class: "text-lg text-slate-700 leading-relaxed" }, [
                          createTextVNode(" Kami fokus pada pengembangan dan pengelolaan bisnis, serta membina calon wirausahawan melalui brand unggulan kami, "),
                          createVNode("strong", { class: "text-amber-600" }, "Blaterian"),
                          createTextVNode(". ")
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode("div", { class: "bg-white rounded-xl p-4 border" }, [
                          createVNode("div", { class: "w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-5 h-5 text-blue-600",
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
                          createVNode("h3", { class: "font-semibold text-slate-900 mb-1" }, "Inovasi"),
                          createVNode("p", { class: "text-sm text-slate-600" }, "Mengembangkan ide kreatif")
                        ]),
                        createVNode("div", { class: "bg-white rounded-xl p-4 border" }, [
                          createVNode("div", { class: "w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-3" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-5 h-5 text-slate-600",
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
                          createVNode("h3", { class: "font-semibold text-slate-900 mb-1" }, "Kolaborasi"),
                          createVNode("p", { class: "text-sm text-slate-600" }, "Membangun kemitraan")
                        ])
                      ]),
                      createVNode("div", { class: "flex flex-wrap gap-4 pt-4" }, [
                        createVNode(unref(Link), {
                          href: "/structure",
                          class: "inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "Struktur Organisasi"),
                            (openBlock(), createBlock("svg", {
                              class: "ml-2 w-4 h-4",
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
                          href: "/activity",
                          class: "inline-flex items-center px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "Lihat Kegiatan"),
                            (openBlock(), createBlock("svg", {
                              class: "ml-2 w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M14 5l7 7m0 0l-7 7m7-7H3"
                              })
                            ]))
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-20 lg:py-32 bg-amber-50" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "grid lg:grid-cols-2 gap-16 items-center" }, [
                    createVNode("div", { class: "order-2 lg:order-1" }, [
                      createVNode("div", { class: "bg-white rounded-2xl p-12 shadow-lg" }, [
                        createVNode("img", {
                          src: _ctx.$imageUrl("compro/blaterianlogo.png"),
                          alt: "Blaterian Logo",
                          class: "w-full h-auto max-w-sm mx-auto"
                        }, null, 8, ["src"])
                      ]),
                      createVNode("div", { class: "flex justify-center gap-4 mt-6" }, [
                        createVNode("div", { class: "bg-white rounded-lg px-4 py-2 shadow-sm border" }, [
                          createVNode("span", { class: "text-sm font-medium text-slate-700" }, "🍽️ Blaterian Foods")
                        ]),
                        createVNode("div", { class: "bg-white rounded-lg px-4 py-2 shadow-sm border" }, [
                          createVNode("span", { class: "text-sm font-medium text-slate-700" }, "🛍️ Blaterian Goods")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "order-1 lg:order-2" }, [
                      createVNode("div", { class: "inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-6" }, [
                        createVNode("span", { class: "w-2 h-2 bg-amber-500 rounded-full mr-3" }),
                        createTextVNode(" Brand Unggulan SEEO ")
                      ]),
                      createVNode("h2", { class: "text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6" }, [
                        createTextVNode(" Blaterian "),
                        createVNode("span", { class: "block text-lg md:text-xl font-normal text-slate-600 mt-2" }, "Karya Terbaik Kami")
                      ]),
                      createVNode("div", { class: "space-y-4 mb-8" }, [
                        createVNode("p", { class: "text-lg text-slate-700 leading-relaxed" }, " Brand kebanggaan SEEO yang menghadirkan produk berkualitas tinggi hasil inovasi dan dedikasi anggota kami. "),
                        createVNode("p", { class: "text-slate-600" }, " Dari makanan dan minuman segar hingga merchandise eksklusif, semua dibuat dengan standar kualitas terbaik. ")
                      ]),
                      createVNode("div", null, [
                        createVNode("a", {
                          href: "/shop/home",
                          target: "_blank",
                          class: "inline-flex items-center px-8 py-4 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200"
                        }, [
                          createTextVNode(" Kunjungi Toko Online "),
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
                              d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            })
                          ]))
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-20 lg:py-32 bg-slate-900" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "text-center mb-16" }, [
                    createVNode("div", { class: "inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-6" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 mr-2",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" })
                      ])),
                      createTextVNode(" Aktivitas & Program SEEO ")
                    ]),
                    createVNode("h2", { class: "text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6" }, " Kegiatan Unggulan Kami "),
                    createVNode("p", { class: "text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed" }, " Program-program strategis yang dirancang untuk membangun ekosistem entrepreneurship yang berkelanjutan di Fakultas Teknik UNSOED ")
                  ]),
                  createVNode("div", { class: "grid md:grid-cols-2 lg:grid-cols-3 gap-8" }, [
                    createVNode("div", { class: "bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-700 transition-colors duration-300" }, [
                      createVNode("div", { class: "h-48 overflow-hidden" }, [
                        createVNode("img", {
                          src: _ctx.$imageUrl("compro/entclass.JPG"),
                          alt: "EntClass I",
                          class: "w-full h-full object-cover"
                        }, null, 8, ["src"])
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("span", { class: "px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full" }, " Human Resources ")
                        ]),
                        createVNode("h3", { class: "text-xl font-bold text-white mb-3" }, " EntClass I "),
                        createVNode("p", { class: "text-slate-300 mb-4 leading-relaxed" }, " Program pelatihan wirausaha intensif yang fokus pada pengembangan keterampilan bisnis fundamental dan strategi inovasi. "),
                        createVNode(unref(Link), {
                          href: "/activity",
                          class: "inline-flex items-center text-blue-400 font-medium hover:text-blue-300 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Pelajari Lebih Lanjut "),
                            (openBlock(), createBlock("svg", {
                              class: "ml-2 w-4 h-4",
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
                    ]),
                    createVNode("div", { class: "bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-700 transition-colors duration-300" }, [
                      createVNode("div", { class: "h-48 overflow-hidden" }, [
                        createVNode("img", {
                          src: _ctx.$imageUrl("compro/visitasi.JPG"),
                          alt: "Visitasi I",
                          class: "w-full h-full object-cover"
                        }, null, 8, ["src"])
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("span", { class: "px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full" }, " Public Relations ")
                        ]),
                        createVNode("h3", { class: "text-xl font-bold text-white mb-3" }, " Visitasi I "),
                        createVNode("p", { class: "text-slate-300 mb-4 leading-relaxed" }, " Studi banding ke organisasi terkemuka untuk memperluas wawasan tentang best practices dalam kewirausahaan dan manajemen. "),
                        createVNode(unref(Link), {
                          href: "/activity",
                          class: "inline-flex items-center text-green-400 font-medium hover:text-green-300 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Lihat Dokumentasi "),
                            (openBlock(), createBlock("svg", {
                              class: "ml-2 w-4 h-4",
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
                    ]),
                    createVNode("div", { class: "bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-700 transition-colors duration-300 md:col-span-2 lg:col-span-1" }, [
                      createVNode("div", { class: "h-48 overflow-hidden" }, [
                        createVNode("img", {
                          src: _ctx.$imageUrl("compro/upgrading.webp"),
                          alt: "Upgrading I",
                          class: "w-full h-full object-cover"
                        }, null, 8, ["src"])
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("span", { class: "px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-full" }, " Team Building ")
                        ]),
                        createVNode("h3", { class: "text-xl font-bold text-white mb-3" }, " Upgrading I "),
                        createVNode("p", { class: "text-slate-300 mb-4 leading-relaxed" }, " Kegiatan team building yang dirancang untuk memperkuat soliditas tim dan meningkatkan chemistry antar anggota organisasi. "),
                        createVNode(unref(Link), {
                          href: "/activity",
                          class: "inline-flex items-center text-red-400 font-medium hover:text-red-300 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Jelajahi Kegiatan "),
                            (openBlock(), createBlock("svg", {
                              class: "ml-2 w-4 h-4",
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
                  ]),
                  createVNode("div", { class: "text-center mt-16" }, [
                    createVNode(unref(Link), {
                      href: "/activity",
                      class: "inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Lihat Semua Kegiatan "),
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
export {
  _sfc_main as default
};
