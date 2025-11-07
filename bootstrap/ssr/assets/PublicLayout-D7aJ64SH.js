import { ref, onMounted, onUnmounted, unref, withCtx, createVNode, createBlock, openBlock, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Head, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "PublicLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const open = ref(false);
    const page = usePage();
    const showScrollTopButton = ref(false);
    const isNavbarHidden = ref(false);
    let lastScrollY = 0;
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      showScrollTopButton.value = currentScrollY > 200;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && currentScrollY > 300) {
          isNavbarHidden.value = true;
        } else if (currentScrollY < lastScrollY) {
          isNavbarHidden.value = false;
        }
      } else {
        isNavbarHidden.value = false;
      }
      lastScrollY = currentScrollY;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<link rel="preconnect" href="https://fonts.googleapis.com" data-v-48d32ffd${_scopeId}><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin data-v-48d32ffd${_scopeId}><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet" data-v-48d32ffd${_scopeId}>`);
          } else {
            return [
              createVNode("link", {
                rel: "preconnect",
                href: "https://fonts.googleapis.com"
              }),
              createVNode("link", {
                rel: "preconnect",
                href: "https://fonts.gstatic.com",
                crossorigin: ""
              }),
              createVNode("link", {
                href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap",
                rel: "stylesheet"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="min-h-screen" style="${ssrRenderStyle({ "background": "white", "font-family": "'Poppins', sans-serif" })}" data-v-48d32ffd><nav class="${ssrRenderClass([{ "-translate-y-full": isNavbarHidden.value }, "fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4"])}" style="${ssrRenderStyle({ "background": "rgba(255, 255, 255, 0.8)", "backdrop-filter": "blur(20px)", "-webkit-backdrop-filter": "blur(20px)", "box-shadow": "0 4px 24px rgba(0, 0, 0, 0.06)" })}" data-v-48d32ffd><div class="max-w-7xl mx-auto flex items-center justify-between" data-v-48d32ffd>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex items-center gap-3 transition-all duration-300 hover:scale-105"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #3b82f6, #1e40af)" })}" data-v-48d32ffd${_scopeId}><img src="/storage/local/images/compro/logo.png" alt="SEEO Logo" class="h-6 w-6 rounded-md" data-v-48d32ffd${_scopeId}></div><div class="flex flex-col" data-v-48d32ffd${_scopeId}><span class="font-bold text-lg" style="${ssrRenderStyle({ "color": "#1e293b", "letter-spacing": "-0.02em" })}" data-v-48d32ffd${_scopeId}>SEEO</span></div>`);
          } else {
            return [
              createVNode("div", {
                class: "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg",
                style: { "background": "linear-gradient(135deg, #3b82f6, #1e40af)" }
              }, [
                createVNode("img", {
                  src: "/storage/local/images/compro/logo.png",
                  alt: "SEEO Logo",
                  class: "h-6 w-6 rounded-md",
                  onError: ($event) => $event.target.src = "/storage/local/images/compro/logo.png"
                }, null, 40, ["onError"])
              ]),
              createVNode("div", { class: "flex flex-col" }, [
                createVNode("span", {
                  class: "font-bold text-lg",
                  style: { "color": "#1e293b", "letter-spacing": "-0.02em" }
                }, "SEEO")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-2xl" style="${ssrRenderStyle({ "background": "rgba(241, 245, 249, 0.6)", "border": "1px solid rgba(226, 232, 240, 0.8)" })}" data-v-48d32ffd>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: [unref(page).component === "Public/Homepage" ? "bg-white shadow-sm" : "hover:bg-white hover:bg-opacity-60", "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300"],
        style: { "color": "#334155" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48d32ffd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-48d32ffd${_scopeId}></path></svg><span class="text-sm font-medium" data-v-48d32ffd${_scopeId}>Beranda</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                })
              ])),
              createVNode("span", { class: "text-sm font-medium" }, "Beranda")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/structure",
        class: [unref(page).component === "Public/Structure" ? "bg-white shadow-sm" : "hover:bg-white hover:bg-opacity-60", "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300"],
        style: { "color": "#334155" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48d32ffd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-48d32ffd${_scopeId}></path></svg><span class="text-sm font-medium" data-v-48d32ffd${_scopeId}>Struktur</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4",
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
              ])),
              createVNode("span", { class: "text-sm font-medium" }, "Struktur")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/activity",
        class: [unref(page).component === "Public/Activity" ? "bg-white shadow-sm" : "hover:bg-white hover:bg-opacity-60", "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300"],
        style: { "color": "#334155" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48d32ffd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-48d32ffd${_scopeId}></path></svg><span class="text-sm font-medium" data-v-48d32ffd${_scopeId}>Kegiatan</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4",
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
              ])),
              createVNode("span", { class: "text-sm font-medium" }, "Kegiatan")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/contact",
        class: [unref(page).component === "Public/Contact" ? "bg-white shadow-sm" : "hover:bg-white hover:bg-opacity-60", "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300"],
        style: { "color": "#334155" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48d32ffd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-48d32ffd${_scopeId}></path></svg><span class="text-sm font-medium" data-v-48d32ffd${_scopeId}>Kontak</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4",
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
              ])),
              createVNode("span", { class: "text-sm font-medium" }, "Kontak")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/login",
        class: "hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white transition-all duration-300 hover:shadow-lg hover:scale-105",
        style: { "background": "linear-gradient(135deg, #3b82f6, #2563eb)", "box-shadow": "0 4px 14px rgba(59, 130, 246, 0.3)" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48d32ffd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" data-v-48d32ffd${_scopeId}></path></svg><span data-v-48d32ffd${_scopeId}>Masuk</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                })
              ])),
              createVNode("span", null, "Masuk")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="lg:hidden p-2.5 rounded-xl transition-all duration-300 hover:bg-gray-100" style="${ssrRenderStyle({ "color": "#1e293b" })}" data-v-48d32ffd>`);
      if (!open.value) {
        _push(`<span data-v-48d32ffd><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48d32ffd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-48d32ffd></path></svg></span>`);
      } else {
        _push(`<span data-v-48d32ffd><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48d32ffd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-48d32ffd></path></svg></span>`);
      }
      _push(`</button></div>`);
      if (open.value) {
        _push(`<div class="lg:hidden mt-4 p-3 rounded-2xl space-y-1 backdrop-filter backdrop-blur-xl" style="${ssrRenderStyle({ "background": "rgba(255, 255, 255, 0.95)", "border": "1px solid rgba(226, 232, 240, 0.8)", "box-shadow": "0 10px 30px rgba(0, 0, 0, 0.1)" })}" data-v-48d32ffd>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/",
          class: [unref(page).component === "Public/Homepage" ? "bg-blue-50" : "", "flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-gray-50"],
          style: { "color": "#1e293b" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48d32ffd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-48d32ffd${_scopeId}></path></svg><span class="text-sm font-medium" data-v-48d32ffd${_scopeId}>Beranda</span>`);
            } else {
              return [
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
                    d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  })
                ])),
                createVNode("span", { class: "text-sm font-medium" }, "Beranda")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/structure",
          class: [unref(page).component === "Public/Structure" ? "bg-blue-50" : "", "flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-gray-50"],
          style: { "color": "#1e293b" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48d32ffd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-48d32ffd${_scopeId}></path></svg><span class="text-sm font-medium" data-v-48d32ffd${_scopeId}>Struktur</span>`);
            } else {
              return [
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
                    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  })
                ])),
                createVNode("span", { class: "text-sm font-medium" }, "Struktur")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/activity",
          class: [unref(page).component === "Public/Activity" ? "bg-blue-50" : "", "flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-gray-50"],
          style: { "color": "#1e293b" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48d32ffd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-48d32ffd${_scopeId}></path></svg><span class="text-sm font-medium" data-v-48d32ffd${_scopeId}>Kegiatan</span>`);
            } else {
              return [
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
                    d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  })
                ])),
                createVNode("span", { class: "text-sm font-medium" }, "Kegiatan")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/contact",
          class: [unref(page).component === "Public/Contact" ? "bg-blue-50" : "", "flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-gray-50"],
          style: { "color": "#1e293b" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48d32ffd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-48d32ffd${_scopeId}></path></svg><span class="text-sm font-medium" data-v-48d32ffd${_scopeId}>Kontak</span>`);
            } else {
              return [
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
                ])),
                createVNode("span", { class: "text-sm font-medium" }, "Kontak")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div style="${ssrRenderStyle({ "border-top": "1px solid rgba(226, 232, 240, 0.8)", "margin": "0.5rem 0" })}" data-v-48d32ffd></div>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/login",
          class: "flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-white transition-all hover:shadow-md",
          style: { "background": "linear-gradient(135deg, #3b82f6, #2563eb)" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48d32ffd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" data-v-48d32ffd${_scopeId}></path></svg><span class="text-sm" data-v-48d32ffd${_scopeId}>Masuk</span>`);
            } else {
              return [
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
                    d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  })
                ])),
                createVNode("span", { class: "text-sm" }, "Masuk")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><main class="pt-20" data-v-48d32ffd>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="text-white pt-16 pb-10 px-6" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #1f2937, #111827)" })}" data-v-48d32ffd><div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-8" data-v-48d32ffd><div class="md:col-span-2" data-v-48d32ffd><div class="flex items-center gap-3 mb-6" data-v-48d32ffd><div class="w-12 h-12 rounded-lg flex items-center justify-center" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #3b82f6, #1d4ed8)" })}" data-v-48d32ffd><img src="/storage/local/images/compro/logo.png" alt="SEEO Logo" class="h-8 w-8 rounded-md" data-v-48d32ffd></div><div data-v-48d32ffd><h3 class="text-xl font-bold" style="${ssrRenderStyle({ "color": "#fbbf24" })}" data-v-48d32ffd>SEEO</h3></div></div><p class="text-sm mb-6 max-w-md" style="${ssrRenderStyle({ "color": "#d1d5db", "line-height": "1.6" })}" data-v-48d32ffd> Bergabunglah dengan komunitas wirausahawan muda Fakultas Teknik UNSOED untuk membangun masa depan bisnis yang lebih cerah. </p></div><div data-v-48d32ffd><h4 class="font-semibold mb-4 text-sm uppercase tracking-wider" style="${ssrRenderStyle({ "color": "#fbbf24" })}" data-v-48d32ffd>Tautan Cepat</h4><ul class="space-y-3 text-sm" style="${ssrRenderStyle({ "color": "#d1d5db" })}" data-v-48d32ffd><li data-v-48d32ffd>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "hover:text-yellow-400 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Beranda`);
          } else {
            return [
              createTextVNode("Beranda")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-48d32ffd>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/structure",
        class: "hover:text-yellow-400 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Struktur`);
          } else {
            return [
              createTextVNode("Struktur")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-48d32ffd>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/activity",
        class: "hover:text-yellow-400 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Kegiatan`);
          } else {
            return [
              createTextVNode("Kegiatan")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-48d32ffd>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/contact",
        class: "hover:text-yellow-400 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Kontak`);
          } else {
            return [
              createTextVNode("Kontak")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div data-v-48d32ffd><h4 class="font-semibold mb-4 text-sm uppercase tracking-wider" style="${ssrRenderStyle({ "color": "#fbbf24" })}" data-v-48d32ffd>Hubungi Kami</h4><ul class="space-y-3 text-sm" style="${ssrRenderStyle({ "color": "#d1d5db" })}" data-v-48d32ffd><li data-v-48d32ffd><a href="mailto:seeoftunsoed@gmail.com" class="hover:text-yellow-400 transition-colors duration-200" data-v-48d32ffd> seeoftunsoed@gmail.com </a></li><li data-v-48d32ffd>Fakultas Teknik, UNSOED</li><li data-v-48d32ffd>Purwokerto, Jawa Tengah</li></ul></div></div><div class="border-t mt-12 pt-6 text-center text-sm" style="${ssrRenderStyle({ "border-color": "#374151", "color": "#9ca3af" })}" data-v-48d32ffd><p data-v-48d32ffd>© 2025 Soedirman Entrepreneur Engineering Organization. All rights reserved.</p></div></footer><button style="${ssrRenderStyle([
        showScrollTopButton.value ? null : { display: "none" },
        { "background": "linear-gradient(135deg, #3b82f6, #1d4ed8)", "box-shadow": "0 10px 30px rgba(59, 130, 246, 0.4)" }
      ])}" class="fixed bottom-8 right-8 text-white w-14 h-14 rounded-lg flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 group" data-v-48d32ffd><svg class="w-6 h-6 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48d32ffd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" data-v-48d32ffd></path></svg><div class="absolute inset-0 rounded-lg bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150" data-v-48d32ffd></div></button></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/PublicLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PublicLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-48d32ffd"]]);
export {
  PublicLayout as P
};
