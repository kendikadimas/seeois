import { ref, computed, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { P as PublicLayout } from "./PublicLayout-1sZl-0H2.js";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Homepage",
  __ssrInlineRender: true,
  props: {
    structures: { type: Array, default: () => [] },
    activities: { type: Array, default: () => [] },
    companyContents: { type: Array, default: () => [] },
    activeSeminars: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const logoSrc = ref("/images/assets/logo.png");
    const stripHtml = (html) => {
      if (!html) return "";
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    };
    const formatDate = (dateStr) => {
      if (!dateStr) return "No Date";
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    const departments = computed(() => {
      const groups = {};
      const members = props.structures.filter((s) => !s.is_executive);
      members.forEach((m) => {
        const dept = m.department_name || "CEO Internal";
        if (!groups[dept]) groups[dept] = [];
        groups[dept].push(m);
      });
      return groups;
    });
    const getDeptIcon = (name) => {
      const n = name.toLowerCase();
      if (n.includes("ceo")) return "bi bi-person-workspace";
      if (n.includes("marketing")) return "bi bi-megaphone-fill";
      if (n.includes("production")) return "bi bi-box-seam-fill";
      if (n.includes("finance")) return "bi bi-cash-stack";
      if (n.includes("hrd")) return "bi bi-people-fill";
      if (n.includes("business")) return "bi bi-graph-up-arrow";
      return "bi bi-briefcase-fill";
    };
    const getDeptDesc = (name) => {
      const n = name.toLowerCase();
      if (n.includes("ceo")) return "Bertanggung jawab atas koordinasi internal dan manajemen operasional harian organisasi.";
      if (n.includes("marketing")) return "Mengelola strategi branding, promosi, dan hubungan media untuk seluruh lini bisnis SEEO.";
      if (n.includes("production")) return "Fokus pada pengembangan produk, kontrol kualitas, dan manajemen rantai pasok bisnis.";
      if (n.includes("finance")) return "Mengatur administrasi keuangan, budgeting, dan pelaporan profitabilitas organisasi.";
      if (n.includes("hrd")) return "Mengelola pengembangan sumber daya manusia dan menjaga budaya kerja profesional.";
      if (n.includes("business")) return "Mengeksplorasi peluang kemitraan baru dan pengembangan ekspansi model bisnis.";
      return "Mendukung kelancaran operasional organisasi melalui tugas-tugas departemen spesifik.";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-41a79d67${_scopeId}>SEEO - Soedirman Engineering Entrepreneurship Organization</title><meta name="description" content="Wadah resmi mahasiswa Fakultas Teknik UNSOED untuk mengembangkan jiwa kepemimpinan dan kewirausahaan. Temukan berita, kegiatan, dan struktur organisasi SEEO di sini." data-v-41a79d67${_scopeId}><meta name="keywords" content="organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, SEEO, FT UNSOED" data-v-41a79d67${_scopeId}><meta property="og:title" content="SEEO FT UNSOED - Empowering Engineers to Lead" data-v-41a79d67${_scopeId}><meta property="og:description" content="Wadah resmi mahasiswa Fakultas Teknik UNSOED untuk mengembangkan jiwa kepemimpinan dan kewirausahaan." data-v-41a79d67${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "SEEO - Soedirman Engineering Entrepreneurship Organization"),
              createVNode("meta", {
                name: "description",
                content: "Wadah resmi mahasiswa Fakultas Teknik UNSOED untuk mengembangkan jiwa kepemimpinan dan kewirausahaan. Temukan berita, kegiatan, dan struktur organisasi SEEO di sini."
              }),
              createVNode("meta", {
                name: "keywords",
                content: "organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, SEEO, FT UNSOED"
              }),
              createVNode("meta", {
                property: "og:title",
                content: "SEEO FT UNSOED - Empowering Engineers to Lead"
              }),
              createVNode("meta", {
                property: "og:description",
                content: "Wadah resmi mahasiswa Fakultas Teknik UNSOED untuk mengembangkan jiwa kepemimpinan dan kewirausahaan."
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(PublicLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<header class="relative h-[100vh] flex items-center justify-center overflow-hidden bg-[#004182]" data-v-41a79d67${_scopeId}><div class="absolute inset-0 z-0" data-v-41a79d67${_scopeId}><div class="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFD700] rounded-full blur-[150px] opacity-10" data-v-41a79d67${_scopeId}></div><div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-[150px] opacity-10" data-v-41a79d67${_scopeId}></div></div><div class="relative z-10 max-w-5xl mx-auto px-6 text-center text-white pt-24 pb-20 lg:py-20" data-v-41a79d67${_scopeId}><h1 class="text-3xl md:text-7xl font-black mb-6 mt-24 tracking-tight leading-[1.2] animate-fade-in uppercase" data-v-41a79d67${_scopeId}> Soedirman Engineering<br data-v-41a79d67${_scopeId}><span class="text-[#FFD700]" data-v-41a79d67${_scopeId}>Entrepreneurship </span>Organization </h1><p class="text-lg md:text-xl font-medium mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed" data-v-41a79d67${_scopeId}> #Set Up Your Mind To Be An Entrepreneur! </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6" data-v-41a79d67${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/about",
              class: "w-full sm:w-auto bg-[#FFD700] hover:bg-[#FFC700] text-[#004182] px-8 py-3.5 lg:px-12 lg:py-5 rounded-full font-black text-sm lg:text-lg shadow-2xl transition-all hover:scale-105 uppercase tracking-widest"
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
            _push2(ssrRenderComponent(unref(Link), {
              href: "/contact",
              class: "w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 lg:px-12 lg:py-5 rounded-full font-black text-sm lg:text-lg transition-all hover:scale-105 uppercase tracking-widest"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Mulai Kolaborasi `);
                } else {
                  return [
                    createTextVNode(" Mulai Kolaborasi ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce" data-v-41a79d67${_scopeId}><i class="bi bi-chevron-down text-white text-3xl opacity-50" data-v-41a79d67${_scopeId}></i></div></header><section class="py-20 lg:py-32 bg-white relative overflow-hidden" data-v-41a79d67${_scopeId}><div class="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20" data-v-41a79d67${_scopeId}><div class="w-full lg:w-1/2 relative" data-v-41a79d67${_scopeId}><div class="absolute -top-10 -left-10 w-40 h-40 bg-[#004182]/5 rounded-full blur-3xl" data-v-41a79d67${_scopeId}></div><div class="relative z-10 p-8 lg:p-12 bg-[#004182] rounded-3xl lg:rounded-[3rem] shadow-2xl transform lg:-rotate-3 hover:rotate-0 transition-transform duration-700" data-v-41a79d67${_scopeId}><img${ssrRenderAttr("src", logoSrc.value)} alt="SEEO Logo" class="w-full h-auto opacity-90 brightness-200" data-v-41a79d67${_scopeId}></div></div><div class="w-full lg:w-1/2 space-y-6 lg:space-y-8" data-v-41a79d67${_scopeId}><div class="inline-block px-6 py-2 bg-[#004182]/5 text-[#004182] font-black text-[10px] lg:text-xs tracking-widest rounded-full border border-[#004182]/10" data-v-41a79d67${_scopeId}> Since 2020 </div><h2 class="text-4xl lg:text-6xl font-black text-[#004182] tracking-tight leading-tight uppercase" data-v-41a79d67${_scopeId}> What is <span class="text-[#FFD700]" data-v-41a79d67${_scopeId}>SEEO?</span></h2><p class="text-lg lg:text-xl text-gray-500 leading-relaxed font-medium" data-v-41a79d67${_scopeId}> SEEO merupakan UKM Fakultas Teknik Unsoed yang didirikan sebagai representasi nyata dalam melahirkan talenta kreatif yang memiliki jiwa enterpreneurship. Kami adalah inkubator bisnis mahasiswa yang menggabungkan standar manajerial profesional dengan semangat inovasi teknik. </p><div class="pt-6" data-v-41a79d67${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/about",
              class: "inline-flex items-center gap-3 font-black text-[#004182] border-b-4 border-[#FFD700] pb-2 text-sm uppercase tracking-widest hover:gap-6 transition-all"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Selengkapnya Tentang Kami <i class="bi bi-arrow-right" data-v-41a79d67${_scopeId2}></i>`);
                } else {
                  return [
                    createTextVNode(" Selengkapnya Tentang Kami "),
                    createVNode("i", { class: "bi bi-arrow-right" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></section><section class="py-20 lg:py-32 relative overflow-hidden" data-v-41a79d67${_scopeId}><div class="absolute top-0 right-0 w-1/3 h-full bg-[#FFD700]/5 -skew-x-12 translate-x-1/2" data-v-41a79d67${_scopeId}></div><div class="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20" data-v-41a79d67${_scopeId}><div class="w-full lg:w-1/2" data-v-41a79d67${_scopeId}><div class="relative rounded-3xl lg:rounded-[4rem] overflow-hidden shadow-2xl group" data-v-41a79d67${_scopeId}><img${ssrRenderAttr("src", "/images/assets/blaterian.png")} alt="Blaterian" class="w-full h-[350px] lg:h-[500px] object-contain p-12 lg:p-20 group-hover:scale-110 transition-transform duration-700" data-v-41a79d67${_scopeId}><div class="absolute bottom-10 left-10 z-20" data-v-41a79d67${_scopeId}></div></div></div><div class="w-full lg:w-1/2 space-y-6 lg:space-y-8" data-v-41a79d67${_scopeId}><h2 class="text-4xl lg:text-6xl font-black text-[#004182] tracking-tight leading-tight uppercase" data-v-41a79d67${_scopeId}> Our Brand: <span class="text-[#FFD700]" data-v-41a79d67${_scopeId}>Blaterian</span></h2><p class="text-lg lg:text-xl text-gray-500 leading-relaxed font-medium" data-v-41a79d67${_scopeId}> Merek kuliner andalan SEEO yang berfokus pada penyediaan produk makanan, minuman dan produk inovatif. Blaterian bukan sekadar bisnis, melainkan laboratorium nyata tempat kami belajar manajemen produksi, pemasaran kreatif, dan kepuasan pelanggan secara profesional. </p><div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 pt-8" data-v-41a79d67${_scopeId}><div class="flex items-start gap-4" data-v-41a79d67${_scopeId}><div class="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center shrink-0 text-[#004182]" data-v-41a79d67${_scopeId}><i class="bi bi-patch-check-fill text-2xl" data-v-41a79d67${_scopeId}></i></div><div data-v-41a79d67${_scopeId}><h4 class="font-black text-[#004182] mb-1 uppercase tracking-tight" data-v-41a79d67${_scopeId}>Kualitas Tinggi</h4><p class="text-sm text-gray-500 font-medium leading-tight" data-v-41a79d67${_scopeId}>Standar rasa &amp; produksi yang terjaga.</p></div></div><div class="flex items-start gap-4" data-v-41a79d67${_scopeId}><div class="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center shrink-0 text-[#004182]" data-v-41a79d67${_scopeId}><i class="bi bi-lightbulb-fill text-2xl" data-v-41a79d67${_scopeId}></i></div><div data-v-41a79d67${_scopeId}><h4 class="font-black text-[#004182] mb-1 uppercase tracking-tight" data-v-41a79d67${_scopeId}>Inovasi Menu</h4><p class="text-sm text-gray-500 font-medium leading-tight" data-v-41a79d67${_scopeId}>Kreasi menu kreatif dari tangan mahasiswa.</p></div></div></div></div></div></section>`);
            if (__props.activities && __props.activities.length) {
              _push2(`<section class="py-32 bg-white" data-v-41a79d67${_scopeId}><div class="max-w-7xl mx-auto px-6" data-v-41a79d67${_scopeId}><div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8" data-v-41a79d67${_scopeId}><div class="max-w-2xl" data-v-41a79d67${_scopeId}><h2 class="text-[#004182] font-black text-3xl lg:text-6xl mb-6 uppercase tracking-tight" data-v-41a79d67${_scopeId}>Berita <span class="text-[#FFD700]" data-v-41a79d67${_scopeId}>&amp;</span> Kegiatan</h2><p class="text-gray-500 text-base lg:text-lg font-medium" data-v-41a79d67${_scopeId}>Dokumentasi perjalanan kami dalam membangun ekosistem entrepreneurship.</p></div>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: "/activity",
                class: "bg-gray-100 hover:bg-[#FFD700] text-[#004182] px-8 py-3 rounded-full font-bold text-sm transition-all uppercase tracking-widest shadow-inner"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Lihat Semua <i class="bi bi-arrow-up-right ml-2" data-v-41a79d67${_scopeId2}></i>`);
                  } else {
                    return [
                      createTextVNode(" Lihat Semua "),
                      createVNode("i", { class: "bi bi-arrow-up-right ml-2" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12" data-v-41a79d67${_scopeId}><!--[-->`);
              ssrRenderList(__props.activities.slice(0, 3), (act) => {
                _push2(`<div class="group bg-white rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col h-full" data-v-41a79d67${_scopeId}><div class="relative aspect-[4/3] overflow-hidden" data-v-41a79d67${_scopeId}><img${ssrRenderAttr("src", act.image_url || "/images/placeholder.jpg")} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-v-41a79d67${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" data-v-41a79d67${_scopeId}></div><div class="absolute top-4 lg:top-6 left-4 lg:left-6" data-v-41a79d67${_scopeId}><span class="px-4 lg:px-5 py-1.5 lg:py-2 bg-[#FFD700] text-[#004182] rounded-full text-[9px] lg:text-[10px] font-black uppercase tracking-widest shadow-lg" data-v-41a79d67${_scopeId}>${ssrInterpolate(act.category || "EVENT")}</span></div></div><div class="p-8 lg:p-10 flex flex-col flex-grow" data-v-41a79d67${_scopeId}><div class="flex items-center gap-3 text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4" data-v-41a79d67${_scopeId}><i class="bi bi-calendar3 text-[#FFD700]" data-v-41a79d67${_scopeId}></i> ${ssrInterpolate(formatDate(act.date))}</div><h3 class="text-lg lg:text-xl font-black text-[#004182] mb-4 leading-tight group-hover:text-[#FFD700] transition-colors line-clamp-2 uppercase tracking-tight" data-v-41a79d67${_scopeId}>${ssrInterpolate(act.title)}</h3><div class="text-gray-500 text-xs lg:text-sm leading-relaxed mb-8 line-clamp-3 font-medium overflow-hidden" data-v-41a79d67${_scopeId}>${ssrInterpolate(stripHtml(act.description))}</div><div class="mt-auto pt-6 border-t border-gray-50" data-v-41a79d67${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/activity/${act.slug}`,
                  class: "inline-flex items-center gap-2 text-[10px] font-black text-[#004182] uppercase tracking-[0.2em] group/btn"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Read Article <i class="bi bi-arrow-right transition-transform group-hover/btn:translate-x-2" data-v-41a79d67${_scopeId2}></i>`);
                    } else {
                      return [
                        createTextVNode(" Read Article "),
                        createVNode("i", { class: "bi bi-arrow-right transition-transform group-hover/btn:translate-x-2" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<section class="py-32 bg-[#004182] relative overflow-hidden" data-v-41a79d67${_scopeId}><div class="absolute top-0 right-0 w-64 h-64 border-4 border-[#FFD700]/20 rounded-full -translate-y-1/2 translate-x-1/2" data-v-41a79d67${_scopeId}></div><div class="max-w-7xl mx-auto px-6 relative z-10" data-v-41a79d67${_scopeId}><div class="text-center mb-16 lg:mb-20" data-v-41a79d67${_scopeId}><h2 class="text-white font-black text-3xl lg:text-6xl mb-6 uppercase tracking-tight" data-v-41a79d67${_scopeId}>Our <span class="text-[#FFD700]" data-v-41a79d67${_scopeId}>Departments</span></h2><p class="text-white/60 text-base lg:text-lg font-medium max-w-2xl mx-auto" data-v-41a79d67${_scopeId}>Sinergi departemen yang menjalankan roda organisasi SEEO secara profesional.</p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" data-v-41a79d67${_scopeId}><!--[-->`);
            ssrRenderList(departments.value, (dept, name) => {
              _push2(`<div class="bg-white/5 backdrop-blur-xl p-8 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border border-white/10 hover:border-[#FFD700]/50 transition-all group flex flex-col h-full" data-v-41a79d67${_scopeId}><div class="w-14 h-14 lg:w-16 lg:h-16 bg-[#FFD700] text-[#004182] rounded-2xl flex items-center justify-center mb-6 lg:mb-8 shadow-lg group-hover:scale-110 transition-transform" data-v-41a79d67${_scopeId}><i class="${ssrRenderClass([getDeptIcon(name), "text-xl lg:text-2xl"])}" data-v-41a79d67${_scopeId}></i></div><h4 class="text-lg lg:text-xl font-black text-white mb-4 uppercase tracking-tight" data-v-41a79d67${_scopeId}>${ssrInterpolate(name)}</h4><p class="text-white/60 text-xs lg:text-sm leading-relaxed mb-8" data-v-41a79d67${_scopeId}>${ssrInterpolate(getDeptDesc(name))}</p><div class="mt-auto flex items-center justify-between border-t border-white/5 pt-6" data-v-41a79d67${_scopeId}><div class="flex items-center gap-2 text-[10px] font-black text-[#FFD700] uppercase tracking-widest" data-v-41a79d67${_scopeId}><i class="bi bi-people-fill" data-v-41a79d67${_scopeId}></i> ${ssrInterpolate(dept.length)} Staff </div>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: "/structure",
                class: "text-[9px] font-black text-white uppercase tracking-[0.2em] hover:text-[#FFD700] transition-colors"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` View Team <i class="bi bi-chevron-right ml-1" data-v-41a79d67${_scopeId2}></i>`);
                  } else {
                    return [
                      createTextVNode(" View Team "),
                      createVNode("i", { class: "bi bi-chevron-right ml-1" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div><div class="mt-12 lg:mt-20 text-center" data-v-41a79d67${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/structure",
              class: "inline-block bg-white text-[#004182] px-8 py-3.5 lg:px-10 lg:py-4 rounded-full font-black text-[10px] lg:text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-[#FFD700] hover:scale-105 transition-all"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` See All SEEO Staff <i class="bi bi-arrow-right-short ml-2" data-v-41a79d67${_scopeId2}></i>`);
                } else {
                  return [
                    createTextVNode(" See All SEEO Staff "),
                    createVNode("i", { class: "bi bi-arrow-right-short ml-2" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></section><section class="py-20 lg:py-32 bg-white" data-v-41a79d67${_scopeId}><div class="max-w-6xl mx-auto px-6" data-v-41a79d67${_scopeId}><div class="text-center mb-12 lg:mb-16" data-v-41a79d67${_scopeId}><h2 class="text-[#004182] font-black text-4xl lg:text-5xl mb-6 uppercase tracking-tight" data-v-41a79d67${_scopeId}>Profile <span class="text-[#FFD700]" data-v-41a79d67${_scopeId}>Video</span></h2><p class="text-gray-500 font-medium" data-v-41a79d67${_scopeId}>Visualisasi perjalanan dan semangat kami dalam satu video profil.</p></div><div class="relative aspect-video rounded-[2rem] lg:rounded-[4rem] overflow-hidden shadow-2xl group border-4 lg:border-8 border-gray-50" data-v-41a79d67${_scopeId}><div class="absolute inset-0 bg-[#004182]/40 z-10 group-hover:bg-[#004182]/20 transition-all" data-v-41a79d67${_scopeId}></div><img${ssrRenderAttr("src", "/images/assets/hero.png")} class="w-full h-full object-cover" data-v-41a79d67${_scopeId}><div class="absolute inset-0 flex items-center justify-center z-20" data-v-41a79d67${_scopeId}><button class="w-16 h-16 lg:w-24 lg:h-24 bg-[#FFD700] text-[#004182] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform ring-4 lg:ring-8 ring-white/20" data-v-41a79d67${_scopeId}><i class="bi bi-play-fill text-3xl lg:text-5xl translate-x-1" data-v-41a79d67${_scopeId}></i></button></div></div></div></section><section class="py-20 lg:py-24 bg-[#004182] relative overflow-hidden" data-v-41a79d67${_scopeId}><div class="absolute inset-0 opacity-10" data-v-41a79d67${_scopeId}><div class="absolute bottom-10 left-10 w-64 h-64 lg:w-96 lg:h-96 border-[10px] lg:border-[20px] border-[#FFD700] rounded-full -translate-x-1/2 translate-y-1/2" data-v-41a79d67${_scopeId}></div></div><div class="max-w-4xl mx-auto px-6 text-center relative z-10" data-v-41a79d67${_scopeId}><h2 class="text-3xl lg:text-6xl font-black text-white mb-8 lg:mb-10 leading-tight uppercase tracking-tight" data-v-41a79d67${_scopeId}> Start Your <span class="text-[#FFD700]" data-v-41a79d67${_scopeId}>Journey</span> <br data-v-41a79d67${_scopeId}> With Us </h2><p class="text-white/70 text-base lg:text-lg mb-10 lg:mb-12 font-medium max-w-2xl mx-auto" data-v-41a79d67${_scopeId}> Apakah Anda memiliki pertanyaan, ingin menjalin kemitraan, atau tertarik bergabung dalam perjalanan kami? Kami selalu terbuka untuk kolaborasi baru. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-6" data-v-41a79d67${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/contact",
              class: "w-full sm:w-auto bg-[#FFD700] text-[#004182] px-8 py-3.5 lg:px-12 lg:py-5 rounded-full font-black text-sm lg:text-lg shadow-2xl hover:scale-105 transition-all uppercase tracking-widest text-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Hubungi Kami`);
                } else {
                  return [
                    createTextVNode("Hubungi Kami")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<a href="mailto:seeoftunsoed@gmail.com" class="text-white font-bold text-xs lg:text-base flex items-center gap-3 hover:text-[#FFD700] transition-colors" data-v-41a79d67${_scopeId}><i class="bi bi-envelope-at text-xl lg:text-2xl" data-v-41a79d67${_scopeId}></i> seeoftunsoed@gmail.com </a></div></div></section>`);
          } else {
            return [
              createVNode("header", { class: "relative h-[100vh] flex items-center justify-center overflow-hidden bg-[#004182]" }, [
                createVNode("div", { class: "absolute inset-0 z-0" }, [
                  createVNode("div", { class: "absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFD700] rounded-full blur-[150px] opacity-10" }),
                  createVNode("div", { class: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-[150px] opacity-10" })
                ]),
                createVNode("div", { class: "relative z-10 max-w-5xl mx-auto px-6 text-center text-white pt-24 pb-20 lg:py-20" }, [
                  createVNode("h1", { class: "text-3xl md:text-7xl font-black mb-6 mt-24 tracking-tight leading-[1.2] animate-fade-in uppercase" }, [
                    createTextVNode(" Soedirman Engineering"),
                    createVNode("br"),
                    createVNode("span", { class: "text-[#FFD700]" }, "Entrepreneurship "),
                    createTextVNode("Organization ")
                  ]),
                  createVNode("p", { class: "text-lg md:text-xl font-medium mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed" }, " #Set Up Your Mind To Be An Entrepreneur! "),
                  createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6" }, [
                    createVNode(unref(Link), {
                      href: "/about",
                      class: "w-full sm:w-auto bg-[#FFD700] hover:bg-[#FFC700] text-[#004182] px-8 py-3.5 lg:px-12 lg:py-5 rounded-full font-black text-sm lg:text-lg shadow-2xl transition-all hover:scale-105 uppercase tracking-widest"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Tentang SEEO ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Link), {
                      href: "/contact",
                      class: "w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 lg:px-12 lg:py-5 rounded-full font-black text-sm lg:text-lg transition-all hover:scale-105 uppercase tracking-widest"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Mulai Kolaborasi ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", { class: "absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce" }, [
                  createVNode("i", { class: "bi bi-chevron-down text-white text-3xl opacity-50" })
                ])
              ]),
              createVNode("section", { class: "py-20 lg:py-32 bg-white relative overflow-hidden" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20" }, [
                  createVNode("div", { class: "w-full lg:w-1/2 relative" }, [
                    createVNode("div", { class: "absolute -top-10 -left-10 w-40 h-40 bg-[#004182]/5 rounded-full blur-3xl" }),
                    createVNode("div", { class: "relative z-10 p-8 lg:p-12 bg-[#004182] rounded-3xl lg:rounded-[3rem] shadow-2xl transform lg:-rotate-3 hover:rotate-0 transition-transform duration-700" }, [
                      createVNode("img", {
                        src: logoSrc.value,
                        alt: "SEEO Logo",
                        class: "w-full h-auto opacity-90 brightness-200"
                      }, null, 8, ["src"])
                    ])
                  ]),
                  createVNode("div", { class: "w-full lg:w-1/2 space-y-6 lg:space-y-8" }, [
                    createVNode("div", { class: "inline-block px-6 py-2 bg-[#004182]/5 text-[#004182] font-black text-[10px] lg:text-xs tracking-widest rounded-full border border-[#004182]/10" }, " Since 2020 "),
                    createVNode("h2", { class: "text-4xl lg:text-6xl font-black text-[#004182] tracking-tight leading-tight uppercase" }, [
                      createTextVNode(" What is "),
                      createVNode("span", { class: "text-[#FFD700]" }, "SEEO?")
                    ]),
                    createVNode("p", { class: "text-lg lg:text-xl text-gray-500 leading-relaxed font-medium" }, " SEEO merupakan UKM Fakultas Teknik Unsoed yang didirikan sebagai representasi nyata dalam melahirkan talenta kreatif yang memiliki jiwa enterpreneurship. Kami adalah inkubator bisnis mahasiswa yang menggabungkan standar manajerial profesional dengan semangat inovasi teknik. "),
                    createVNode("div", { class: "pt-6" }, [
                      createVNode(unref(Link), {
                        href: "/about",
                        class: "inline-flex items-center gap-3 font-black text-[#004182] border-b-4 border-[#FFD700] pb-2 text-sm uppercase tracking-widest hover:gap-6 transition-all"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Selengkapnya Tentang Kami "),
                          createVNode("i", { class: "bi bi-arrow-right" })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-20 lg:py-32 relative overflow-hidden" }, [
                createVNode("div", { class: "absolute top-0 right-0 w-1/3 h-full bg-[#FFD700]/5 -skew-x-12 translate-x-1/2" }),
                createVNode("div", { class: "max-w-7xl mx-auto px-6 flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20" }, [
                  createVNode("div", { class: "w-full lg:w-1/2" }, [
                    createVNode("div", { class: "relative rounded-3xl lg:rounded-[4rem] overflow-hidden shadow-2xl group" }, [
                      createVNode("img", {
                        src: "/images/assets/blaterian.png",
                        alt: "Blaterian",
                        class: "w-full h-[350px] lg:h-[500px] object-contain p-12 lg:p-20 group-hover:scale-110 transition-transform duration-700"
                      }),
                      createVNode("div", { class: "absolute bottom-10 left-10 z-20" })
                    ])
                  ]),
                  createVNode("div", { class: "w-full lg:w-1/2 space-y-6 lg:space-y-8" }, [
                    createVNode("h2", { class: "text-4xl lg:text-6xl font-black text-[#004182] tracking-tight leading-tight uppercase" }, [
                      createTextVNode(" Our Brand: "),
                      createVNode("span", { class: "text-[#FFD700]" }, "Blaterian")
                    ]),
                    createVNode("p", { class: "text-lg lg:text-xl text-gray-500 leading-relaxed font-medium" }, " Merek kuliner andalan SEEO yang berfokus pada penyediaan produk makanan, minuman dan produk inovatif. Blaterian bukan sekadar bisnis, melainkan laboratorium nyata tempat kami belajar manajemen produksi, pemasaran kreatif, dan kepuasan pelanggan secara profesional. "),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 pt-8" }, [
                      createVNode("div", { class: "flex items-start gap-4" }, [
                        createVNode("div", { class: "w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center shrink-0 text-[#004182]" }, [
                          createVNode("i", { class: "bi bi-patch-check-fill text-2xl" })
                        ]),
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-black text-[#004182] mb-1 uppercase tracking-tight" }, "Kualitas Tinggi"),
                          createVNode("p", { class: "text-sm text-gray-500 font-medium leading-tight" }, "Standar rasa & produksi yang terjaga.")
                        ])
                      ]),
                      createVNode("div", { class: "flex items-start gap-4" }, [
                        createVNode("div", { class: "w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center shrink-0 text-[#004182]" }, [
                          createVNode("i", { class: "bi bi-lightbulb-fill text-2xl" })
                        ]),
                        createVNode("div", null, [
                          createVNode("h4", { class: "font-black text-[#004182] mb-1 uppercase tracking-tight" }, "Inovasi Menu"),
                          createVNode("p", { class: "text-sm text-gray-500 font-medium leading-tight" }, "Kreasi menu kreatif dari tangan mahasiswa.")
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              __props.activities && __props.activities.length ? (openBlock(), createBlock("section", {
                key: 0,
                class: "py-32 bg-white"
              }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-6" }, [
                  createVNode("div", { class: "flex flex-col md:flex-row justify-between items-end mb-20 gap-8" }, [
                    createVNode("div", { class: "max-w-2xl" }, [
                      createVNode("h2", { class: "text-[#004182] font-black text-3xl lg:text-6xl mb-6 uppercase tracking-tight" }, [
                        createTextVNode("Berita "),
                        createVNode("span", { class: "text-[#FFD700]" }, "&"),
                        createTextVNode(" Kegiatan")
                      ]),
                      createVNode("p", { class: "text-gray-500 text-base lg:text-lg font-medium" }, "Dokumentasi perjalanan kami dalam membangun ekosistem entrepreneurship.")
                    ]),
                    createVNode(unref(Link), {
                      href: "/activity",
                      class: "bg-gray-100 hover:bg-[#FFD700] text-[#004182] px-8 py-3 rounded-full font-bold text-sm transition-all uppercase tracking-widest shadow-inner"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Lihat Semua "),
                        createVNode("i", { class: "bi bi-arrow-up-right ml-2" })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.activities.slice(0, 3), (act) => {
                      return openBlock(), createBlock("div", {
                        key: act.id,
                        class: "group bg-white rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col h-full"
                      }, [
                        createVNode("div", { class: "relative aspect-[4/3] overflow-hidden" }, [
                          createVNode("img", {
                            src: act.image_url || "/images/placeholder.jpg",
                            class: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          }, null, 8, ["src"]),
                          createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" }),
                          createVNode("div", { class: "absolute top-4 lg:top-6 left-4 lg:left-6" }, [
                            createVNode("span", { class: "px-4 lg:px-5 py-1.5 lg:py-2 bg-[#FFD700] text-[#004182] rounded-full text-[9px] lg:text-[10px] font-black uppercase tracking-widest shadow-lg" }, toDisplayString(act.category || "EVENT"), 1)
                          ])
                        ]),
                        createVNode("div", { class: "p-8 lg:p-10 flex flex-col flex-grow" }, [
                          createVNode("div", { class: "flex items-center gap-3 text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4" }, [
                            createVNode("i", { class: "bi bi-calendar3 text-[#FFD700]" }),
                            createTextVNode(" " + toDisplayString(formatDate(act.date)), 1)
                          ]),
                          createVNode("h3", { class: "text-lg lg:text-xl font-black text-[#004182] mb-4 leading-tight group-hover:text-[#FFD700] transition-colors line-clamp-2 uppercase tracking-tight" }, toDisplayString(act.title), 1),
                          createVNode("div", {
                            class: "text-gray-500 text-xs lg:text-sm leading-relaxed mb-8 line-clamp-3 font-medium overflow-hidden",
                            textContent: toDisplayString(stripHtml(act.description))
                          }, null, 8, ["textContent"]),
                          createVNode("div", { class: "mt-auto pt-6 border-t border-gray-50" }, [
                            createVNode(unref(Link), {
                              href: `/activity/${act.slug}`,
                              class: "inline-flex items-center gap-2 text-[10px] font-black text-[#004182] uppercase tracking-[0.2em] group/btn"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Read Article "),
                                createVNode("i", { class: "bi bi-arrow-right transition-transform group-hover/btn:translate-x-2" })
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ])
                        ])
                      ]);
                    }), 128))
                  ])
                ])
              ])) : createCommentVNode("", true),
              createVNode("section", { class: "py-32 bg-[#004182] relative overflow-hidden" }, [
                createVNode("div", { class: "absolute top-0 right-0 w-64 h-64 border-4 border-[#FFD700]/20 rounded-full -translate-y-1/2 translate-x-1/2" }),
                createVNode("div", { class: "max-w-7xl mx-auto px-6 relative z-10" }, [
                  createVNode("div", { class: "text-center mb-16 lg:mb-20" }, [
                    createVNode("h2", { class: "text-white font-black text-3xl lg:text-6xl mb-6 uppercase tracking-tight" }, [
                      createTextVNode("Our "),
                      createVNode("span", { class: "text-[#FFD700]" }, "Departments")
                    ]),
                    createVNode("p", { class: "text-white/60 text-base lg:text-lg font-medium max-w-2xl mx-auto" }, "Sinergi departemen yang menjalankan roda organisasi SEEO secara profesional.")
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(departments.value, (dept, name) => {
                      return openBlock(), createBlock("div", {
                        key: name,
                        class: "bg-white/5 backdrop-blur-xl p-8 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border border-white/10 hover:border-[#FFD700]/50 transition-all group flex flex-col h-full"
                      }, [
                        createVNode("div", { class: "w-14 h-14 lg:w-16 lg:h-16 bg-[#FFD700] text-[#004182] rounded-2xl flex items-center justify-center mb-6 lg:mb-8 shadow-lg group-hover:scale-110 transition-transform" }, [
                          createVNode("i", {
                            class: [getDeptIcon(name), "text-xl lg:text-2xl"]
                          }, null, 2)
                        ]),
                        createVNode("h4", { class: "text-lg lg:text-xl font-black text-white mb-4 uppercase tracking-tight" }, toDisplayString(name), 1),
                        createVNode("p", { class: "text-white/60 text-xs lg:text-sm leading-relaxed mb-8" }, toDisplayString(getDeptDesc(name)), 1),
                        createVNode("div", { class: "mt-auto flex items-center justify-between border-t border-white/5 pt-6" }, [
                          createVNode("div", { class: "flex items-center gap-2 text-[10px] font-black text-[#FFD700] uppercase tracking-widest" }, [
                            createVNode("i", { class: "bi bi-people-fill" }),
                            createTextVNode(" " + toDisplayString(dept.length) + " Staff ", 1)
                          ]),
                          createVNode(unref(Link), {
                            href: "/structure",
                            class: "text-[9px] font-black text-white uppercase tracking-[0.2em] hover:text-[#FFD700] transition-colors"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" View Team "),
                              createVNode("i", { class: "bi bi-chevron-right ml-1" })
                            ]),
                            _: 1
                          })
                        ])
                      ]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "mt-12 lg:mt-20 text-center" }, [
                    createVNode(unref(Link), {
                      href: "/structure",
                      class: "inline-block bg-white text-[#004182] px-8 py-3.5 lg:px-10 lg:py-4 rounded-full font-black text-[10px] lg:text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-[#FFD700] hover:scale-105 transition-all"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" See All SEEO Staff "),
                        createVNode("i", { class: "bi bi-arrow-right-short ml-2" })
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              createVNode("section", { class: "py-20 lg:py-32 bg-white" }, [
                createVNode("div", { class: "max-w-6xl mx-auto px-6" }, [
                  createVNode("div", { class: "text-center mb-12 lg:mb-16" }, [
                    createVNode("h2", { class: "text-[#004182] font-black text-4xl lg:text-5xl mb-6 uppercase tracking-tight" }, [
                      createTextVNode("Profile "),
                      createVNode("span", { class: "text-[#FFD700]" }, "Video")
                    ]),
                    createVNode("p", { class: "text-gray-500 font-medium" }, "Visualisasi perjalanan dan semangat kami dalam satu video profil.")
                  ]),
                  createVNode("div", { class: "relative aspect-video rounded-[2rem] lg:rounded-[4rem] overflow-hidden shadow-2xl group border-4 lg:border-8 border-gray-50" }, [
                    createVNode("div", { class: "absolute inset-0 bg-[#004182]/40 z-10 group-hover:bg-[#004182]/20 transition-all" }),
                    createVNode("img", {
                      src: "/images/assets/hero.png",
                      class: "w-full h-full object-cover"
                    }),
                    createVNode("div", { class: "absolute inset-0 flex items-center justify-center z-20" }, [
                      createVNode("button", { class: "w-16 h-16 lg:w-24 lg:h-24 bg-[#FFD700] text-[#004182] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform ring-4 lg:ring-8 ring-white/20" }, [
                        createVNode("i", { class: "bi bi-play-fill text-3xl lg:text-5xl translate-x-1" })
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-20 lg:py-24 bg-[#004182] relative overflow-hidden" }, [
                createVNode("div", { class: "absolute inset-0 opacity-10" }, [
                  createVNode("div", { class: "absolute bottom-10 left-10 w-64 h-64 lg:w-96 lg:h-96 border-[10px] lg:border-[20px] border-[#FFD700] rounded-full -translate-x-1/2 translate-y-1/2" })
                ]),
                createVNode("div", { class: "max-w-4xl mx-auto px-6 text-center relative z-10" }, [
                  createVNode("h2", { class: "text-3xl lg:text-6xl font-black text-white mb-8 lg:mb-10 leading-tight uppercase tracking-tight" }, [
                    createTextVNode(" Start Your "),
                    createVNode("span", { class: "text-[#FFD700]" }, "Journey"),
                    createTextVNode(),
                    createVNode("br"),
                    createTextVNode(" With Us ")
                  ]),
                  createVNode("p", { class: "text-white/70 text-base lg:text-lg mb-10 lg:mb-12 font-medium max-w-2xl mx-auto" }, " Apakah Anda memiliki pertanyaan, ingin menjalin kemitraan, atau tertarik bergabung dalam perjalanan kami? Kami selalu terbuka untuk kolaborasi baru. "),
                  createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-center gap-6" }, [
                    createVNode(unref(Link), {
                      href: "/contact",
                      class: "w-full sm:w-auto bg-[#FFD700] text-[#004182] px-8 py-3.5 lg:px-12 lg:py-5 rounded-full font-black text-sm lg:text-lg shadow-2xl hover:scale-105 transition-all uppercase tracking-widest text-center"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Hubungi Kami")
                      ]),
                      _: 1
                    }),
                    createVNode("a", {
                      href: "mailto:seeoftunsoed@gmail.com",
                      class: "text-white font-bold text-xs lg:text-base flex items-center gap-3 hover:text-[#FFD700] transition-colors"
                    }, [
                      createVNode("i", { class: "bi bi-envelope-at text-xl lg:text-2xl" }),
                      createTextVNode(" seeoftunsoed@gmail.com ")
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
const Homepage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-41a79d67"]]);
export {
  Homepage as default
};
//# sourceMappingURL=Homepage-BBhsAafS.js.map
