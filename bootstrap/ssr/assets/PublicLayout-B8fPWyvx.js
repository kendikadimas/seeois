import { ref, onMounted, onUnmounted, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderClass, ssrRenderAttr, ssrRenderSlot } from "vue/server-renderer";
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
    const linkClass = (component) => {
      const isActive = page.component === component;
      return isActive ? "font-semibold" : "";
    };
    const getLinkStyle = (component) => {
      const isActive = page.component === component;
      if (isActive) {
        return {
          "background": "linear-gradient(135deg, #3b82f6, #1d4ed8)",
          "color": "white",
          "box-shadow": "0 4px 15px rgba(59, 130, 246, 0.3)",
          "transform": "translateY(-1px)"
        };
      }
      return {
        "color": "#6b7280",
        "background": "transparent"
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<link rel="preconnect" href="https://fonts.googleapis.com" data-v-00a643c5${_scopeId}><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin data-v-00a643c5${_scopeId}><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet" data-v-00a643c5${_scopeId}>`);
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
      _push(`<div class="min-h-screen" style="${ssrRenderStyle({ "background": "white", "font-family": "'Poppins', sans-serif" })}" data-v-00a643c5><nav class="${ssrRenderClass([{ "-translate-y-full": isNavbarHidden.value }, "py-4 mt-5 px-6 fixed top-0 w-full z-50 transition-transform duration-300"])}" style="${ssrRenderStyle({ "background": "rgba(255, 255, 255, 0.95)", "backdrop-filter": "blur(10px)" })}" data-v-00a643c5><div class="max-w-7xl mx-auto flex items-center justify-between" data-v-00a643c5>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex items-center gap-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-12 h-12 rounded-lg flex items-center justify-center" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #3b82f6, #1d4ed8)" })}" data-v-00a643c5${_scopeId}><img${ssrRenderAttr("src", _ctx.$imageUrl("compro/logo.png"))} alt="SEEO Logo" class="h-8 w-8 rounded-md" data-v-00a643c5${_scopeId}></div><div class="flex flex-col" data-v-00a643c5${_scopeId}><span class="font-bold text-xl" style="${ssrRenderStyle({ "color": "#111827" })}" data-v-00a643c5${_scopeId}>SEEO</span></div>`);
          } else {
            return [
              createVNode("div", {
                class: "w-12 h-12 rounded-lg flex items-center justify-center",
                style: { "background": "linear-gradient(135deg, #3b82f6, #1d4ed8)" }
              }, [
                createVNode("img", {
                  src: _ctx.$imageUrl("compro/logo.png"),
                  alt: "SEEO Logo",
                  class: "h-8 w-8 rounded-md"
                }, null, 8, ["src"])
              ]),
              createVNode("div", { class: "flex flex-col" }, [
                createVNode("span", {
                  class: "font-bold text-xl",
                  style: { "color": "#111827" }
                }, "SEEO")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<ul class="hidden md:flex items-center gap-8 text-sm font-medium" data-v-00a643c5><li data-v-00a643c5>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: [linkClass("Public/Homepage"), "nav-link px-5 py-2 rounded-lg"],
        style: getLinkStyle("Public/Homepage")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Beranda `);
          } else {
            return [
              createTextVNode(" Beranda ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-00a643c5>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/structure",
        class: [linkClass("Public/Structure"), "nav-link px-5 py-2 rounded-lg"],
        style: getLinkStyle("Public/Structure")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Struktur `);
          } else {
            return [
              createTextVNode(" Struktur ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-00a643c5>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/activity",
        class: [linkClass("Public/Activity"), "nav-link px-5 py-2 rounded-lg"],
        style: getLinkStyle("Public/Activity")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kegiatan `);
          } else {
            return [
              createTextVNode(" Kegiatan ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-00a643c5>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/contact",
        class: [linkClass("Public/Contact"), "nav-link px-5 py-2 rounded-lg"],
        style: getLinkStyle("Public/Contact")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kontak `);
          } else {
            return [
              createTextVNode(" Kontak ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul><div class="hidden md:flex items-center" data-v-00a643c5>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/login",
        class: "text-white text-sm px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105",
        style: { "background": "linear-gradient(135deg, #fbbf24, #f59e0b)", "box-shadow": "0 4px 15px rgba(251, 191, 36, 0.4)" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Login `);
          } else {
            return [
              createTextVNode(" Login ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><button class="md:hidden text-xl p-2 rounded-md transition-colors" style="${ssrRenderStyle({ "color": "#374151", "background-color": "#f3f4f6" })}" data-v-00a643c5>`);
      if (!open.value) {
        _push(`<span data-v-00a643c5>☰</span>`);
      } else {
        _push(`<span data-v-00a643c5>✕</span>`);
      }
      _push(`</button></div>`);
      if (open.value) {
        _push(`<div class="md:hidden mt-4 p-6 rounded-lg space-y-4 text-sm font-medium shadow-xl" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #ffffff, #f8fafc)", "border": "1px solid #e5e7eb" })}" data-v-00a643c5>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/",
          class: "mobile-link block px-4 py-3 rounded-md",
          style: { "color": "#374151", "background-color": "#f9fafb" }
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
        _push(ssrRenderComponent(unref(Link), {
          href: "/structure",
          class: "mobile-link block px-4 py-3 rounded-md",
          style: { "color": "#374151" }
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
        _push(ssrRenderComponent(unref(Link), {
          href: "/activity",
          class: "mobile-link block px-4 py-3 rounded-md",
          style: { "color": "#374151" }
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
        _push(ssrRenderComponent(unref(Link), {
          href: "/contact",
          class: "mobile-link block px-4 py-3 rounded-md",
          style: { "color": "#374151" }
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
        _push(`<hr style="${ssrRenderStyle({ "border-color": "#e5e7eb", "margin": "1rem 0" })}" data-v-00a643c5>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/login",
          class: "block text-white text-center px-4 py-3 rounded-md font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105",
          style: { "background": "linear-gradient(135deg, #fbbf24, #f59e0b)" }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Login`);
            } else {
              return [
                createTextVNode("Login")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><main class="pt-20" data-v-00a643c5>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="text-white pt-16 pb-10 px-6" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #1f2937, #111827)" })}" data-v-00a643c5><div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-8" data-v-00a643c5><div class="md:col-span-2" data-v-00a643c5><div class="flex items-center gap-3 mb-6" data-v-00a643c5><div class="w-12 h-12 rounded-lg flex items-center justify-center" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #3b82f6, #1d4ed8)" })}" data-v-00a643c5><img${ssrRenderAttr("src", _ctx.$imageUrl("compro/logo.png"))} alt="SEEO Logo" class="h-8 w-8 rounded-md" data-v-00a643c5></div><div data-v-00a643c5><h3 class="text-xl font-bold" style="${ssrRenderStyle({ "color": "#fbbf24" })}" data-v-00a643c5>SEEO</h3></div></div><p class="text-sm mb-6 max-w-md" style="${ssrRenderStyle({ "color": "#d1d5db", "line-height": "1.6" })}" data-v-00a643c5> Bergabunglah dengan komunitas wirausahawan muda Fakultas Teknik UNSOED untuk membangun masa depan bisnis yang lebih cerah. </p></div><div data-v-00a643c5><h4 class="font-semibold mb-4 text-sm uppercase tracking-wider" style="${ssrRenderStyle({ "color": "#fbbf24" })}" data-v-00a643c5>Tautan Cepat</h4><ul class="space-y-3 text-sm" style="${ssrRenderStyle({ "color": "#d1d5db" })}" data-v-00a643c5><li data-v-00a643c5>`);
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
      _push(`</li><li data-v-00a643c5>`);
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
      _push(`</li><li data-v-00a643c5>`);
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
      _push(`</li><li data-v-00a643c5>`);
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
      _push(`</li></ul></div><div data-v-00a643c5><h4 class="font-semibold mb-4 text-sm uppercase tracking-wider" style="${ssrRenderStyle({ "color": "#fbbf24" })}" data-v-00a643c5>Hubungi Kami</h4><ul class="space-y-3 text-sm" style="${ssrRenderStyle({ "color": "#d1d5db" })}" data-v-00a643c5><li data-v-00a643c5><a href="mailto:seeoftunsoed@gmail.com" class="hover:text-yellow-400 transition-colors duration-200" data-v-00a643c5> seeoftunsoed@gmail.com </a></li><li data-v-00a643c5>Fakultas Teknik, UNSOED</li><li data-v-00a643c5>Purwokerto, Jawa Tengah</li></ul></div></div><div class="border-t mt-12 pt-6 text-center text-sm" style="${ssrRenderStyle({ "border-color": "#374151", "color": "#9ca3af" })}" data-v-00a643c5><p data-v-00a643c5>© 2025 Soedirman Entrepreneur Engineering Organization. All rights reserved.</p></div></footer><button style="${ssrRenderStyle([
        showScrollTopButton.value ? null : { display: "none" },
        { "background": "linear-gradient(135deg, #3b82f6, #1d4ed8)", "box-shadow": "0 10px 30px rgba(59, 130, 246, 0.4)" }
      ])}" class="fixed bottom-8 right-8 text-white w-14 h-14 rounded-lg flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 group" data-v-00a643c5><svg class="w-6 h-6 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-00a643c5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" data-v-00a643c5></path></svg><div class="absolute inset-0 rounded-lg bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150" data-v-00a643c5></div></button></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/PublicLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PublicLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-00a643c5"]]);
export {
  PublicLayout as P
};
