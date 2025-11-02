import { ref, onMounted, onUnmounted, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
import { usePage, Head, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "PublicLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const open = ref(false);
    const page = usePage();
    const showScrollTopButton = ref(false);
    const handleScroll = () => {
      showScrollTopButton.value = window.scrollY > 200;
    };
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    const linkClass = (component) => {
      const isActive = page.component === component;
      return isActive ? "text-primary" : "text-gray-700 hover:text-primary transition-colors";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<link rel="preconnect" href="https://fonts.googleapis.com"${_scopeId}><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin${_scopeId}><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet"${_scopeId}>`);
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
      _push(`<div class="bg-slate-50 font-sans"><nav class="py-4 px-6 bg-white shadow-sm sticky top-0 w-full z-50"><div class="max-w-7xl mx-auto flex items-center justify-between">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img src="/storage/local/images/compro/logo.png" alt="SEEO Logo" class="h-10 w-10 rounded-full"${_scopeId}><span class="font-semibold text-lg tracking-tight text-gray-900"${_scopeId}>SEEO</span>`);
          } else {
            return [
              createVNode("img", {
                src: "/storage/local/images/compro/logo.png",
                alt: "SEEO Logo",
                class: "h-10 w-10 rounded-full"
              }),
              createVNode("span", { class: "font-semibold text-lg tracking-tight text-gray-900" }, "SEEO")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<ul class="hidden md:flex items-center gap-6 text-sm font-bold"><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: linkClass("Public/Homepage")
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
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/structure",
        class: linkClass("Public/Structure")
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
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/activity",
        class: linkClass("Public/Activity")
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
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/contact",
        class: linkClass("Public/Contact")
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
      _push(`</li></ul><div class="hidden md:flex items-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/login",
        class: "bg-secondary hover:bg-amber-500 text-black text-sm px-6 py-3 rounded-lg font-bold transition shadow-lg hover:shadow-yellow-500/30"
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
      _push(`</div><button class="md:hidden text-2xl focus:outline-none text-gray-700">`);
      if (!open.value) {
        _push(`<span>☰</span>`);
      } else {
        _push(`<span>✕</span>`);
      }
      _push(`</button></div>`);
      if (open.value) {
        _push(`<div class="md:hidden mt-4 p-4 border-t border-gray-200 bg-white/95 backdrop-blur-md rounded-lg space-y-3 text-sm font-medium text-gray-700">`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/",
          class: "block px-3 py-2 hover:bg-gray-100 rounded"
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
          class: "block px-3 py-2 hover:bg-gray-100 rounded"
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
          class: "block px-3 py-2 hover:bg-gray-100 rounded"
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
          class: "block px-3 py-2 hover:bg-gray-100 rounded"
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
        _push(`<hr class="my-2"><a${ssrRenderAttr("href", _ctx.route("login"))} class="block bg-primary hover:bg-indigo-700 text-white text-center px-4 py-2 rounded-lg font-medium transition">Login</a><a href="/shop/home" target="_blank" class="block bg-yellow-500 hover:bg-yellow-600 text-white text-center px-4 py-2 rounded-lg font-medium transition">Blaterian</a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-gray-900 text-white pt-16 pb-10 px-6"><div class="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12"><div class="lg:col-span-2"><div class="flex items-center gap-2 mb-4"><img src="/favicon.ico" alt="SEEO Logo" class="h-10 w-10 rounded-full"><h2 class="text-xl font-bold">SEEO</h2></div><p class="text-gray-400 text-sm mb-6">Bergabunglah dengan komunitas wirausahawan muda Fakultas Teknik UNSOED untuk membangun masa depan bisnis yang lebih cerah.</p></div><div><h4 class="text-gray-200 font-semibold mb-4 text-sm uppercase tracking-wider">Tautan Cepat</h4><ul class="space-y-3 text-sm text-gray-400"><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "hover:text-yellow-400 transition"
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
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/structure",
        class: "hover:text-yellow-400 transition"
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
      _push(`</li><li>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/activity",
        class: "hover:text-yellow-400 transition"
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
      _push(`</li></ul></div><div><h4 class="text-gray-200 font-semibold mb-4 text-sm uppercase tracking-wider">Hubungi Kami</h4><ul class="space-y-3 text-sm text-gray-400"><li><a href="mailto:info@seeo.com" class="hover:text-yellow-400 transition">seeoftunsoed@gmail.com</a></li><li><p>Fakultas Teknik, UNSOED</p></li></ul></div></div><div class="border-t border-gray-800 mt-12 pt-6 text-sm text-gray-500 text-center"><p>© 2025 Soedirman Entrepreneur Engineering. All rights reserved.</p></div></footer><button style="${ssrRenderStyle(showScrollTopButton.value ? null : { display: "none" })}" class="fixed bottom-8 right-8 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition transform hover:scale-110 z-50"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg></button></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/PublicLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
