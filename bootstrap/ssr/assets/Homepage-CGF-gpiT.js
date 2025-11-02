import { ref, onMounted, onUnmounted, unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./PublicLayout-rYv0gHJQ.js";
import { Head, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Homepage",
  __ssrInlineRender: true,
  setup(__props) {
    const carousel = ref(null);
    const currentSlide = ref(0);
    const scrollToCard = (index) => {
      if (carousel.value) {
        const cardWidth = carousel.value.children[0].offsetWidth + 16;
        carousel.value.scrollTo({
          left: cardWidth * index,
          behavior: "smooth"
        });
        currentSlide.value = index;
      }
    };
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
      _push(ssrRenderComponent(unref(Head), { title: "Soedirman Entrepreneur Engineering Organization" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<header class="relative bg-white min-h-[90vh] flex items-center overflow-hidden pt-16 md:pt-0"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 py-6 sm:py-10"${_scopeId}><div class="text-center lg:text-left order-2 lg:order-1"${_scopeId}><h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-gray-900 mb-4 sm:mb-6"${_scopeId}> Soedirman <span class="text-primary"${_scopeId}>Engineering <span class="text-gray-900"${_scopeId}>Entrepreneurship Organization</span></span></h1><p class="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0"${_scopeId}> Set Up Your Mind To Be An Entrepreneur! </p><div class="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/contact",
              class: "bg-secondary hover:bg-yellow-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg transition transform hover:scale-105 text-sm sm:text-base"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Blaterian `);
                } else {
                  return [
                    createTextVNode(" Blaterian ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/contact",
              class: "bg-primary hover:bg-indigo-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg transition transform hover:scale-105 text-sm sm:text-base"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Hubungi Kami `);
                } else {
                  return [
                    createTextVNode(" Hubungi Kami ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="relative flex justify-center lg:justify-end h-[300px] sm:h-[400px] lg:h-[500px] w-full order-1 lg:order-2"${_scopeId}><div class="absolute inset-y-0 right-0 w-full lg:w-[120%] bg-primary rounded-l-[50px] sm:rounded-l-[75px] lg:rounded-l-[100px] transform lg:translate-x-[20%] z-0"${_scopeId}></div><div class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[85%] sm:w-[90%] lg:w-full h-[60%] sm:h-[65%] lg:h-[70%] xl:h-[80%] rounded-xl overflow-hidden shadow-2xl z-10"${_scopeId}><img src="/storage/local/images/compro/seeo.jpg" alt="Landscape Image" class="w-full h-full object-cover"${_scopeId}></div><div class="absolute -top-6 sm:-top-8 lg:-top-10 -left-6 sm:-left-8 lg:-left-10 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-yellow-400 rounded-full z-20 hidden sm:block lg:block"${_scopeId}></div><div class="absolute top-1/4 right-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-yellow-400 rounded-full z-20 block sm:hidden"${_scopeId}></div><div class="absolute bottom-6 sm:bottom-8 lg:bottom-10 -right-10 sm:-right-15 lg:-right-20 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-blue-200 rounded-full z-20 hidden sm:block lg:block"${_scopeId}></div></div></div><div class="absolute bottom-0 left-0 w-full z-0 opacity-50 hidden lg:block"${_scopeId}><svg viewBox="0 0 1440 320" class="w-full h-auto text-blue-200" fill="currentColor"${_scopeId}><path fill-opacity="1" d="M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,181.3C960,171,1056,181,1152,176C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"${_scopeId}></path></svg></div></header><section class="bg-white py-20 lg:py-32 px-6 overflow-hidden"${_scopeId}><div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"${_scopeId}><div class="order-last lg:order-first"${_scopeId}><span class="inline-block px-3 py-1 mb-4 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full"${_scopeId}>Tentang SEEO</span><h2 class="text-4xl sm:text-5xl font-bold leading-tight mb-6"${_scopeId}>Mengenal Kami Lebih Dekat</h2><p class="text-lg text-gray-600 mb-8 max-w-xl text-justify"${_scopeId}> Unit Kegiatan Mahasiswa Fakultas Teknik UNSOED yang bergerak di bidang kewirausahaan. Kami fokus pada pengembangan dan pengelolaan bisnis, serta membina calon wirausahawan melalui brand unggulan kami, Blaterian. </p><div class="flex flex-wrap gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/structure",
              class: "bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg hover:shadow-indigo-500/30"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Struktur Organisasi`);
                } else {
                  return [
                    createTextVNode("Struktur Organisasi")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/activity",
              class: "border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 hover:border-gray-400 transition transform hover:scale-105"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Lihat Kegiatan`);
                } else {
                  return [
                    createTextVNode("Lihat Kegiatan")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="relative flex justify-center mt-12 lg:mt-0"${_scopeId}><img src="/storage/local/images/compro/logo.png" alt="SEEO Logo" class="rounded-full shadow-2xl w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover border-8 border-white animate-float"${_scopeId}></div></div></section><section class="bg-yellow-400 py-20 lg:py-32 px-6 overflow-hidden"${_scopeId}><div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"${_scopeId}><div class="relative block"${_scopeId}><img src="/storage/local/images/compro/blaterianlogo.png" alt="Blaterian Logo" class="rounded-full shadow-2xl w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover border-8 border-white mx-auto animate-float" style="${ssrRenderStyle({ "animation-delay": "-3s" })}"${_scopeId}></div><div class="lg:text-right mt-12 lg:mt-0"${_scopeId}><span class="inline-block px-3 py-1 mb-4 text-sm font-semibold text-yellow-800 bg-yellow-200 rounded-full"${_scopeId}>BRAND UNGGULAN</span><h2 class="text-4xl sm:text-5xl font-bold leading-tight mb-6 text-gray-900"${_scopeId}>Blaterian</h2><p class="text-lg text-gray-800 mb-8 max-w-xl lg:ml-auto text-justify"${_scopeId}> Brand kebanggaan SEEO yang menyediakan berbagai produk berkualitas hasil karya anggota kami, mulai dari makanan dan minuman (Blaterian Foods), hingga merchandise eksklusif (Blaterian Goods). </p><div class="flex flex-wrap gap-4 lg:justify-end"${_scopeId}><a href="/shop/home" target="_blank" class="bg-gray-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-800 transition transform hover:scale-105 shadow-lg hover:shadow-black/20"${_scopeId}>Kunjungi Toko</a></div></div></div></section><section class="py-20 lg:py-32 px-6 bg-gray-50"${_scopeId}><div class="max-w-7xl mx-auto"${_scopeId}><div class="text-center mb-16"${_scopeId}><span class="inline-block px-4 py-1 mb-4 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full"${_scopeId}>Aktivitas SEEO</span><h2 class="text-4xl font-extrabold text-gray-900 mb-4"${_scopeId}>Kegiatan Kami</h2><p class="text-gray-600 text-lg max-w-2xl mx-auto"${_scopeId}>Berbagai program yang kami selenggarakan untuk membangun jiwa wirausaha mahasiswa Teknik UNSOED.</p></div><div class="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"${_scopeId}><div class="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"${_scopeId}><div class="relative overflow-hidden h-56"${_scopeId}><img src="/storage/local/images/compro/entclass.JPG" alt="EntClass I" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"${_scopeId}><div class="absolute top-4 left-4"${_scopeId}><span class="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold"${_scopeId}>Human Resource</span></div></div><div class="p-6"${_scopeId}><h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors"${_scopeId}>EntClass I</h3><p class="text-gray-600 mb-4 text-sm text-justify"${_scopeId}>Program pelatihan wirausaha intensif untuk pengembangan keterampilan bisnis vital.</p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/activity",
              class: "font-bold text-sm text-indigo-600 hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Lihat Detail →`);
                } else {
                  return [
                    createTextVNode("Lihat Detail →")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"${_scopeId}><div class="relative overflow-hidden h-56"${_scopeId}><img src="/storage/local/images/compro/visitasi.JPG" alt="Visitasi I" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"${_scopeId}><div class="absolute top-4 left-4"${_scopeId}><span class="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold"${_scopeId}>Public Relation</span></div></div><div class="p-6"${_scopeId}><h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors"${_scopeId}>Visitasi I</h3><p class="text-gray-600 mb-4 text-sm text-justify"${_scopeId}>Studi banding untuk meningkatkan wawasan anggota mengenai praktik kewirausahaan dan manajemen organisasi.</p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/activity",
              class: "font-bold text-sm text-green-600 hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Lihat Detail →`);
                } else {
                  return [
                    createTextVNode("Lihat Detail →")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"${_scopeId}><div class="relative overflow-hidden h-56"${_scopeId}><img src="/storage/local/images/compro/upgrading.webp" alt="Upgrading I" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"${_scopeId}><div class="absolute top-4 left-4"${_scopeId}><span class="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold"${_scopeId}>Human Resource</span></div></div><div class="p-6"${_scopeId}><h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors"${_scopeId}>Upgrading I</h3><p class="text-gray-600 mb-4 text-sm text-justify"${_scopeId}>Kegiatan bonding untuk memperkuat hubungan tim dan meningkatkan semangat kolaborasi.</p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/activity",
              class: "font-bold text-sm text-red-600 hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Lihat Detail →`);
                } else {
                  return [
                    createTextVNode("Lihat Detail →")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="lg:hidden relative"${_scopeId}><div class="flex overflow-x-auto scroll-smooth scrollbar-hide gap-4 pb-4" style="${ssrRenderStyle({ "scroll-snap-type": "x mandatory" })}"${_scopeId}><div class="flex-none w-[280px] sm:w-[320px] md:w-[350px] bg-white rounded-xl shadow-md overflow-hidden" style="${ssrRenderStyle({ "scroll-snap-align": "start" })}"${_scopeId}><div class="relative overflow-hidden h-48 sm:h-52"${_scopeId}><img src="/storage/local/images/compro/entclass.JPG" alt="EntClass I" class="w-full h-full object-cover"${_scopeId}><div class="absolute top-4 left-4"${_scopeId}><span class="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold"${_scopeId}>Human Resource</span></div></div><div class="p-4 sm:p-6"${_scopeId}><h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-3"${_scopeId}>EntClass I</h3><p class="text-gray-600 mb-4 text-sm text-justify"${_scopeId}>Program pelatihan wirausaha intensif untuk pengembangan keterampilan bisnis vital.</p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/activity",
              class: "font-bold text-sm text-indigo-600 hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Lihat Detail →`);
                } else {
                  return [
                    createTextVNode("Lihat Detail →")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="flex-none w-[280px] sm:w-[320px] md:w-[350px] bg-white rounded-xl shadow-md overflow-hidden" style="${ssrRenderStyle({ "scroll-snap-align": "start" })}"${_scopeId}><div class="relative overflow-hidden h-48 sm:h-52"${_scopeId}><img src="/storage/local/images/compro/visitasi.JPG" alt="Visitasi I" class="w-full h-full object-cover"${_scopeId}><div class="absolute top-4 left-4"${_scopeId}><span class="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold"${_scopeId}>Public Relation</span></div></div><div class="p-4 sm:p-6"${_scopeId}><h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-3"${_scopeId}>Visitasi I</h3><p class="text-gray-600 mb-4 text-sm text-justify"${_scopeId}>Studi banding untuk meningkatkan wawasan anggota mengenai praktik kewirausahaan dan manajemen organisasi.</p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/activity",
              class: "font-bold text-sm text-green-600 hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Lihat Detail →`);
                } else {
                  return [
                    createTextVNode("Lihat Detail →")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="flex-none w-[280px] sm:w-[320px] md:w-[350px] bg-white rounded-xl shadow-md overflow-hidden" style="${ssrRenderStyle({ "scroll-snap-align": "start" })}"${_scopeId}><div class="relative overflow-hidden h-48 sm:h-52"${_scopeId}><img src="/storage/local/images/compro/upgrading.webp" alt="Upgrading I" class="w-full h-full object-cover"${_scopeId}><div class="absolute top-4 left-4"${_scopeId}><span class="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold"${_scopeId}>Human Resource</span></div></div><div class="p-4 sm:p-6"${_scopeId}><h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-3"${_scopeId}>Upgrading I</h3><p class="text-gray-600 mb-4 text-sm text-justify"${_scopeId}>Kegiatan bonding untuk memperkuat hubungan tim dan meningkatkan semangat kolaborasi.</p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/activity",
              class: "font-bold text-sm text-red-600 hover:underline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Lihat Detail →`);
                } else {
                  return [
                    createTextVNode("Lihat Detail →")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="flex justify-center mt-6 space-x-2"${_scopeId}><!--[-->`);
            ssrRenderList(3, (item, index) => {
              _push2(`<button class="${ssrRenderClass([
                "w-2 h-2 rounded-full transition-colors duration-200",
                currentSlide.value === index ? "bg-indigo-600" : "bg-gray-300"
              ])}"${_scopeId}></button>`);
            });
            _push2(`<!--]--></div></div></div></section>`);
          } else {
            return [
              createVNode("header", { class: "relative bg-white min-h-[90vh] flex items-center overflow-hidden pt-16 md:pt-0" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 py-6 sm:py-10" }, [
                  createVNode("div", { class: "text-center lg:text-left order-2 lg:order-1" }, [
                    createVNode("h1", { class: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-gray-900 mb-4 sm:mb-6" }, [
                      createTextVNode(" Soedirman "),
                      createVNode("span", { class: "text-primary" }, [
                        createTextVNode("Engineering "),
                        createVNode("span", { class: "text-gray-900" }, "Entrepreneurship Organization")
                      ])
                    ]),
                    createVNode("p", { class: "text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0" }, " Set Up Your Mind To Be An Entrepreneur! "),
                    createVNode("div", { class: "flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start" }, [
                      createVNode(unref(Link), {
                        href: "/contact",
                        class: "bg-secondary hover:bg-yellow-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg transition transform hover:scale-105 text-sm sm:text-base"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Blaterian ")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Link), {
                        href: "/contact",
                        class: "bg-primary hover:bg-indigo-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg transition transform hover:scale-105 text-sm sm:text-base"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Hubungi Kami ")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  createVNode("div", { class: "relative flex justify-center lg:justify-end h-[300px] sm:h-[400px] lg:h-[500px] w-full order-1 lg:order-2" }, [
                    createVNode("div", { class: "absolute inset-y-0 right-0 w-full lg:w-[120%] bg-primary rounded-l-[50px] sm:rounded-l-[75px] lg:rounded-l-[100px] transform lg:translate-x-[20%] z-0" }),
                    createVNode("div", { class: "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[85%] sm:w-[90%] lg:w-full h-[60%] sm:h-[65%] lg:h-[70%] xl:h-[80%] rounded-xl overflow-hidden shadow-2xl z-10" }, [
                      createVNode("img", {
                        src: "/storage/local/images/compro/seeo.jpg",
                        alt: "Landscape Image",
                        class: "w-full h-full object-cover"
                      })
                    ]),
                    createVNode("div", { class: "absolute -top-6 sm:-top-8 lg:-top-10 -left-6 sm:-left-8 lg:-left-10 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-yellow-400 rounded-full z-20 hidden sm:block lg:block" }),
                    createVNode("div", { class: "absolute top-1/4 right-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-yellow-400 rounded-full z-20 block sm:hidden" }),
                    createVNode("div", { class: "absolute bottom-6 sm:bottom-8 lg:bottom-10 -right-10 sm:-right-15 lg:-right-20 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-blue-200 rounded-full z-20 hidden sm:block lg:block" })
                  ])
                ]),
                createVNode("div", { class: "absolute bottom-0 left-0 w-full z-0 opacity-50 hidden lg:block" }, [
                  (openBlock(), createBlock("svg", {
                    viewBox: "0 0 1440 320",
                    class: "w-full h-auto text-blue-200",
                    fill: "currentColor"
                  }, [
                    createVNode("path", {
                      "fill-opacity": "1",
                      d: "M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,181.3C960,171,1056,181,1152,176C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    })
                  ]))
                ])
              ]),
              createVNode("section", { class: "bg-white py-20 lg:py-32 px-6 overflow-hidden" }, [
                createVNode("div", { class: "max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center" }, [
                  createVNode("div", { class: "order-last lg:order-first" }, [
                    createVNode("span", { class: "inline-block px-3 py-1 mb-4 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full" }, "Tentang SEEO"),
                    createVNode("h2", { class: "text-4xl sm:text-5xl font-bold leading-tight mb-6" }, "Mengenal Kami Lebih Dekat"),
                    createVNode("p", { class: "text-lg text-gray-600 mb-8 max-w-xl text-justify" }, " Unit Kegiatan Mahasiswa Fakultas Teknik UNSOED yang bergerak di bidang kewirausahaan. Kami fokus pada pengembangan dan pengelolaan bisnis, serta membina calon wirausahawan melalui brand unggulan kami, Blaterian. "),
                    createVNode("div", { class: "flex flex-wrap gap-4" }, [
                      createVNode(unref(Link), {
                        href: "/structure",
                        class: "bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg hover:shadow-indigo-500/30"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Struktur Organisasi")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Link), {
                        href: "/activity",
                        class: "border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 hover:border-gray-400 transition transform hover:scale-105"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Lihat Kegiatan")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  createVNode("div", { class: "relative flex justify-center mt-12 lg:mt-0" }, [
                    createVNode("img", {
                      src: "/storage/local/images/compro/logo.png",
                      alt: "SEEO Logo",
                      class: "rounded-full shadow-2xl w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover border-8 border-white animate-float"
                    })
                  ])
                ])
              ]),
              createVNode("section", { class: "bg-yellow-400 py-20 lg:py-32 px-6 overflow-hidden" }, [
                createVNode("div", { class: "max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center" }, [
                  createVNode("div", { class: "relative block" }, [
                    createVNode("img", {
                      src: "/storage/local/images/compro/blaterianlogo.png",
                      alt: "Blaterian Logo",
                      class: "rounded-full shadow-2xl w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover border-8 border-white mx-auto animate-float",
                      style: { "animation-delay": "-3s" }
                    })
                  ]),
                  createVNode("div", { class: "lg:text-right mt-12 lg:mt-0" }, [
                    createVNode("span", { class: "inline-block px-3 py-1 mb-4 text-sm font-semibold text-yellow-800 bg-yellow-200 rounded-full" }, "BRAND UNGGULAN"),
                    createVNode("h2", { class: "text-4xl sm:text-5xl font-bold leading-tight mb-6 text-gray-900" }, "Blaterian"),
                    createVNode("p", { class: "text-lg text-gray-800 mb-8 max-w-xl lg:ml-auto text-justify" }, " Brand kebanggaan SEEO yang menyediakan berbagai produk berkualitas hasil karya anggota kami, mulai dari makanan dan minuman (Blaterian Foods), hingga merchandise eksklusif (Blaterian Goods). "),
                    createVNode("div", { class: "flex flex-wrap gap-4 lg:justify-end" }, [
                      createVNode("a", {
                        href: "/shop/home",
                        target: "_blank",
                        class: "bg-gray-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-800 transition transform hover:scale-105 shadow-lg hover:shadow-black/20"
                      }, "Kunjungi Toko")
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-20 lg:py-32 px-6 bg-gray-50" }, [
                createVNode("div", { class: "max-w-7xl mx-auto" }, [
                  createVNode("div", { class: "text-center mb-16" }, [
                    createVNode("span", { class: "inline-block px-4 py-1 mb-4 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full" }, "Aktivitas SEEO"),
                    createVNode("h2", { class: "text-4xl font-extrabold text-gray-900 mb-4" }, "Kegiatan Kami"),
                    createVNode("p", { class: "text-gray-600 text-lg max-w-2xl mx-auto" }, "Berbagai program yang kami selenggarakan untuk membangun jiwa wirausaha mahasiswa Teknik UNSOED.")
                  ]),
                  createVNode("div", { class: "hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" }, [
                    createVNode("div", { class: "group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2" }, [
                      createVNode("div", { class: "relative overflow-hidden h-56" }, [
                        createVNode("img", {
                          src: "/storage/local/images/compro/entclass.JPG",
                          alt: "EntClass I",
                          class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        }),
                        createVNode("div", { class: "absolute top-4 left-4" }, [
                          createVNode("span", { class: "bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold" }, "Human Resource")
                        ])
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("h3", { class: "text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors" }, "EntClass I"),
                        createVNode("p", { class: "text-gray-600 mb-4 text-sm text-justify" }, "Program pelatihan wirausaha intensif untuk pengembangan keterampilan bisnis vital."),
                        createVNode(unref(Link), {
                          href: "/activity",
                          class: "font-bold text-sm text-indigo-600 hover:underline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Lihat Detail →")
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("div", { class: "group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2" }, [
                      createVNode("div", { class: "relative overflow-hidden h-56" }, [
                        createVNode("img", {
                          src: "/storage/local/images/compro/visitasi.JPG",
                          alt: "Visitasi I",
                          class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        }),
                        createVNode("div", { class: "absolute top-4 left-4" }, [
                          createVNode("span", { class: "bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold" }, "Public Relation")
                        ])
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("h3", { class: "text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors" }, "Visitasi I"),
                        createVNode("p", { class: "text-gray-600 mb-4 text-sm text-justify" }, "Studi banding untuk meningkatkan wawasan anggota mengenai praktik kewirausahaan dan manajemen organisasi."),
                        createVNode(unref(Link), {
                          href: "/activity",
                          class: "font-bold text-sm text-green-600 hover:underline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Lihat Detail →")
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("div", { class: "group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2" }, [
                      createVNode("div", { class: "relative overflow-hidden h-56" }, [
                        createVNode("img", {
                          src: "/storage/local/images/compro/upgrading.webp",
                          alt: "Upgrading I",
                          class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        }),
                        createVNode("div", { class: "absolute top-4 left-4" }, [
                          createVNode("span", { class: "bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold" }, "Human Resource")
                        ])
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("h3", { class: "text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors" }, "Upgrading I"),
                        createVNode("p", { class: "text-gray-600 mb-4 text-sm text-justify" }, "Kegiatan bonding untuk memperkuat hubungan tim dan meningkatkan semangat kolaborasi."),
                        createVNode(unref(Link), {
                          href: "/activity",
                          class: "font-bold text-sm text-red-600 hover:underline"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Lihat Detail →")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "lg:hidden relative" }, [
                    createVNode("div", {
                      ref_key: "carousel",
                      ref: carousel,
                      class: "flex overflow-x-auto scroll-smooth scrollbar-hide gap-4 pb-4",
                      style: { "scroll-snap-type": "x mandatory" }
                    }, [
                      createVNode("div", {
                        class: "flex-none w-[280px] sm:w-[320px] md:w-[350px] bg-white rounded-xl shadow-md overflow-hidden",
                        style: { "scroll-snap-align": "start" }
                      }, [
                        createVNode("div", { class: "relative overflow-hidden h-48 sm:h-52" }, [
                          createVNode("img", {
                            src: "/storage/local/images/compro/entclass.JPG",
                            alt: "EntClass I",
                            class: "w-full h-full object-cover"
                          }),
                          createVNode("div", { class: "absolute top-4 left-4" }, [
                            createVNode("span", { class: "bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold" }, "Human Resource")
                          ])
                        ]),
                        createVNode("div", { class: "p-4 sm:p-6" }, [
                          createVNode("h3", { class: "text-lg sm:text-xl font-bold text-gray-900 mb-3" }, "EntClass I"),
                          createVNode("p", { class: "text-gray-600 mb-4 text-sm text-justify" }, "Program pelatihan wirausaha intensif untuk pengembangan keterampilan bisnis vital."),
                          createVNode(unref(Link), {
                            href: "/activity",
                            class: "font-bold text-sm text-indigo-600 hover:underline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Lihat Detail →")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("div", {
                        class: "flex-none w-[280px] sm:w-[320px] md:w-[350px] bg-white rounded-xl shadow-md overflow-hidden",
                        style: { "scroll-snap-align": "start" }
                      }, [
                        createVNode("div", { class: "relative overflow-hidden h-48 sm:h-52" }, [
                          createVNode("img", {
                            src: "/storage/local/images/compro/visitasi.JPG",
                            alt: "Visitasi I",
                            class: "w-full h-full object-cover"
                          }),
                          createVNode("div", { class: "absolute top-4 left-4" }, [
                            createVNode("span", { class: "bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold" }, "Public Relation")
                          ])
                        ]),
                        createVNode("div", { class: "p-4 sm:p-6" }, [
                          createVNode("h3", { class: "text-lg sm:text-xl font-bold text-gray-900 mb-3" }, "Visitasi I"),
                          createVNode("p", { class: "text-gray-600 mb-4 text-sm text-justify" }, "Studi banding untuk meningkatkan wawasan anggota mengenai praktik kewirausahaan dan manajemen organisasi."),
                          createVNode(unref(Link), {
                            href: "/activity",
                            class: "font-bold text-sm text-green-600 hover:underline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Lihat Detail →")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("div", {
                        class: "flex-none w-[280px] sm:w-[320px] md:w-[350px] bg-white rounded-xl shadow-md overflow-hidden",
                        style: { "scroll-snap-align": "start" }
                      }, [
                        createVNode("div", { class: "relative overflow-hidden h-48 sm:h-52" }, [
                          createVNode("img", {
                            src: "/storage/local/images/compro/upgrading.webp",
                            alt: "Upgrading I",
                            class: "w-full h-full object-cover"
                          }),
                          createVNode("div", { class: "absolute top-4 left-4" }, [
                            createVNode("span", { class: "bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold" }, "Human Resource")
                          ])
                        ]),
                        createVNode("div", { class: "p-4 sm:p-6" }, [
                          createVNode("h3", { class: "text-lg sm:text-xl font-bold text-gray-900 mb-3" }, "Upgrading I"),
                          createVNode("p", { class: "text-gray-600 mb-4 text-sm text-justify" }, "Kegiatan bonding untuk memperkuat hubungan tim dan meningkatkan semangat kolaborasi."),
                          createVNode(unref(Link), {
                            href: "/activity",
                            class: "font-bold text-sm text-red-600 hover:underline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Lihat Detail →")
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ], 512),
                    createVNode("div", { class: "flex justify-center mt-6 space-x-2" }, [
                      (openBlock(), createBlock(Fragment, null, renderList(3, (item, index) => {
                        return createVNode("button", {
                          key: index,
                          onClick: ($event) => scrollToCard(index),
                          class: [
                            "w-2 h-2 rounded-full transition-colors duration-200",
                            currentSlide.value === index ? "bg-indigo-600" : "bg-gray-300"
                          ]
                        }, null, 10, ["onClick"]);
                      }), 64))
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
export {
  _sfc_main as default
};
