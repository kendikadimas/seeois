import { ref, computed, onMounted, onUnmounted, unref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderClass, ssrRenderAttr, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Head, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "PublicLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const logoSrc = ref("/images/assets/logo.png");
    const open = ref(false);
    const page = usePage();
    const auth_user = computed(() => {
      var _a;
      return (_a = page.props.auth) == null ? void 0 : _a.user;
    });
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
            _push2(`<link rel="preconnect" href="https://fonts.googleapis.com" data-v-c2d7f2d8${_scopeId}><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin data-v-c2d7f2d8${_scopeId}><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet" data-v-c2d7f2d8${_scopeId}>`);
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
                href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap",
                rel: "stylesheet"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="public-page min-h-screen bg-white" style="${ssrRenderStyle({ "font-family": "'Plus Jakarta Sans', sans-serif" })}" data-v-c2d7f2d8><nav class="${ssrRenderClass([{
        "-translate-y-[150%]": isNavbarHidden.value,
        "bg-white/95 backdrop-blur-2xl border-gray-100": showScrollTopButton.value,
        "bg-white/10 backdrop-blur-md": !showScrollTopButton.value && unref(page).component === "Public/Homepage",
        "bg-white shadow-xl": unref(page).component !== "Public/Homepage"
      }, "fixed top-4 lg:top-6 left-1/2 -translate-x-1/2 w-[92%] lg:w-[95%] max-w-7xl z-50 transition-all duration-500 px-3 md:px-5 lg:px-10 py-3 lg:py-4 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-between"])}" data-v-c2d7f2d8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex items-center gap-2 lg:gap-3 transition-all duration-300 hover:scale-105 group shrink-0"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", logoSrc.value)} alt="SEEO Logo" class="h-8 lg:h-10 w-8 lg:w-10 object-contain" data-v-c2d7f2d8${_scopeId}><span class="${ssrRenderClass([!showScrollTopButton.value && unref(page).component === "Public/Homepage" ? "text-white" : "text-[#004182]", "font-black text-xl lg:text-2xl tracking-tighter"])}" data-v-c2d7f2d8${_scopeId}>SEEO</span>`);
          } else {
            return [
              createVNode("img", {
                src: logoSrc.value,
                alt: "SEEO Logo",
                class: "h-8 lg:h-10 w-8 lg:w-10 object-contain",
                onError: ($event) => $event.target.src = logoSrc.value
              }, null, 40, ["src", "onError"]),
              createVNode("span", {
                class: ["font-black text-xl lg:text-2xl tracking-tighter", !showScrollTopButton.value && unref(page).component === "Public/Homepage" ? "text-white" : "text-[#004182]"]
              }, "SEEO", 2)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden lg:flex items-center px-2 py-1.5 absolute left-1/2 -translate-x-1/2" data-v-c2d7f2d8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: ["px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:text-[#FFD700]", unref(page).component !== "Public/Homepage" ? !showScrollTopButton.value && unref(page).component === "Public/Homepage" ? "text-white" : "text-[#004182]" : ""],
        style: unref(page).component === "Public/Homepage" ? "color: #FFD700" : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/about",
        class: ["px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:text-[#FFD700]", unref(page).component !== "Public/About" ? !showScrollTopButton.value && unref(page).component === "Public/Homepage" ? "text-white" : "text-[#004182]" : ""],
        style: unref(page).component === "Public/About" ? "color: #FFD700" : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`About`);
          } else {
            return [
              createTextVNode("About")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/activity",
        class: ["px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:text-[#FFD700]", unref(page).component !== "Public/Activity" ? !showScrollTopButton.value && unref(page).component === "Public/Homepage" ? "text-white" : "text-[#004182]" : ""],
        style: unref(page).component === "Public/Activity" ? "color: #FFD700" : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Blog`);
          } else {
            return [
              createTextVNode("Blog")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/structure",
        class: ["px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:text-[#FFD700]", unref(page).component !== "Public/Structure" ? !showScrollTopButton.value && unref(page).component === "Public/Homepage" ? "text-white" : "text-[#004182]" : ""],
        style: unref(page).component === "Public/Structure" ? "color: #FFD700" : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Structure`);
          } else {
            return [
              createTextVNode("Structure")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/contact",
        class: ["px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:text-[#FFD700]", unref(page).component !== "Public/Contact" ? !showScrollTopButton.value && unref(page).component === "Public/Homepage" ? "text-white" : "text-[#004182]" : ""],
        style: unref(page).component === "Public/Contact" ? "color: #FFD700" : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contact`);
          } else {
            return [
              createTextVNode("Contact")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden lg:flex items-center gap-6 shrink-0" data-v-c2d7f2d8>`);
      if (auth_user.value) {
        _push(ssrRenderComponent(unref(Link), {
          href: "/seeo/staff/dashboard",
          class: ["font-black text-[10px] uppercase tracking-widest hover:text-[#FFD700] transition-all", !showScrollTopButton.value && unref(page).component === "Public/Homepage" ? "text-white" : "text-[#004182]"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Dashboard`);
            } else {
              return [
                createTextVNode("Dashboard")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(unref(Link), {
          href: "/login",
          class: ["font-black text-[10px] uppercase tracking-widest hover:text-[#FFD700] transition-all", !showScrollTopButton.value && unref(page).component === "Public/Homepage" ? "text-white" : "text-[#004182]"]
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
      }
      _push(ssrRenderComponent(unref(Link), {
        href: "/contact",
        class: "bg-[#FFD700] text-[#004182] px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-white hover:scale-105 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Hubungi Kami`);
          } else {
            return [
              createTextVNode("Hubungi Kami")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><button class="${ssrRenderClass([!showScrollTopButton.value && unref(page).component === "Public/Homepage" ? "text-white hover:bg-white/10" : "text-[#004182] hover:bg-gray-100", "lg:hidden p-2 rounded-full transition-colors bg-transparent border-0 outline-none shadow-none"])}" data-v-c2d7f2d8><i class="${ssrRenderClass([open.value ? "bi-x-lg" : "bi-list", "bi"])}" style="${ssrRenderStyle({ "font-size": "1.5rem" })}" data-v-c2d7f2d8></i></button>`);
      if (open.value) {
        _push(`<div class="lg:hidden absolute top-full left-0 right-0 mt-3 p-5 rounded-3xl bg-white shadow-2xl border border-gray-100 space-y-1" data-v-c2d7f2d8>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/",
          class: ["block px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all", unref(page).component === "Public/Homepage" ? "bg-[#FFD700]/10 text-[#FFD700]" : "text-gray-700 hover:bg-gray-50 hover:text-[#004182]"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Home`);
            } else {
              return [
                createTextVNode("Home")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/about",
          class: ["block px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all", unref(page).component === "Public/About" ? "bg-[#FFD700]/10 text-[#FFD700]" : "text-gray-700 hover:bg-gray-50 hover:text-[#004182]"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`About`);
            } else {
              return [
                createTextVNode("About")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/activity",
          class: ["block px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all", unref(page).component === "Public/Activity" ? "bg-[#FFD700]/10 text-[#FFD700]" : "text-gray-700 hover:bg-gray-50 hover:text-[#004182]"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Blog`);
            } else {
              return [
                createTextVNode("Blog")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/structure",
          class: ["block px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all", unref(page).component === "Public/Structure" ? "bg-[#FFD700]/10 text-[#FFD700]" : "text-gray-700 hover:bg-gray-50 hover:text-[#004182]"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Structure`);
            } else {
              return [
                createTextVNode("Structure")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(Link), {
          href: "/contact",
          class: ["block px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all", unref(page).component === "Public/Contact" ? "bg-[#FFD700]/10 text-[#FFD700]" : "text-gray-700 hover:bg-gray-50 hover:text-[#004182]"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Contact`);
            } else {
              return [
                createTextVNode("Contact")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="pt-3 border-t border-gray-100 flex flex-col gap-2" data-v-c2d7f2d8>`);
        if (auth_user.value) {
          _push(ssrRenderComponent(unref(Link), {
            href: "/seeo/staff/dashboard",
            class: "text-center py-2.5 font-black text-[#004182] uppercase tracking-widest text-[10px]"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Dashboard`);
              } else {
                return [
                  createTextVNode("Dashboard")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(ssrRenderComponent(unref(Link), {
            href: "/login",
            class: ["text-center py-2.5 font-black text-[#004182] uppercase tracking-widest text-[10px]", unref(page).component === "Auth/Login" ? "text-[#FFD700]" : "text-[#004182]"]
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
        }
        _push(ssrRenderComponent(unref(Link), {
          href: "/contact",
          class: "bg-[#004182] text-white text-center py-3 rounded-2xl font-black shadow-lg uppercase tracking-widest text-[10px]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Hubungi Kami`);
            } else {
              return [
                createTextVNode("Hubungi Kami")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><main class="${ssrRenderClass({ "pt-0": unref(page).component === "Public/Homepage", "pt-24": unref(page).component !== "Public/Homepage" })}" data-v-c2d7f2d8>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-[#1a1a1a] text-white pt-20 pb-10 px-6 overflow-hidden" data-v-c2d7f2d8><div class="max-w-7xl mx-auto" data-v-c2d7f2d8><div class="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16" data-v-c2d7f2d8><div class="space-y-6" data-v-c2d7f2d8><div class="flex items-center gap-3" data-v-c2d7f2d8><div class="flex flex-col" data-v-c2d7f2d8><span class="font-black text-xl tracking-tight text-white" data-v-c2d7f2d8>SEEO</span></div></div><p class="text-gray-400 text-sm leading-relaxed max-w-xs" data-v-c2d7f2d8> Soedirman Engineering Entrepreneurship Organization. Wadah pengembangan minat bakat kewirausahaan mahasiswa Fakultas Teknik UNSOED. </p><div class="flex gap-4" data-v-c2d7f2d8><a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFD700] hover:text-[#004182] transition-all" data-v-c2d7f2d8><i class="bi bi-instagram" data-v-c2d7f2d8></i></a><a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFD700] hover:text-[#004182] transition-all" data-v-c2d7f2d8><i class="bi bi-linkedin" data-v-c2d7f2d8></i></a><a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFD700] hover:text-[#004182] transition-all" data-v-c2d7f2d8><i class="bi bi-youtube" data-v-c2d7f2d8></i></a><a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFD700] hover:text-[#004182] transition-all" data-v-c2d7f2d8><i class="bi bi-tiktok" data-v-c2d7f2d8></i></a></div></div><div data-v-c2d7f2d8><h4 class="font-bold text-lg mb-8 text-white border-b-2 border-[#FFD700] w-fit pb-1" data-v-c2d7f2d8>Site Menu</h4><ul class="space-y-4 text-gray-400 text-sm" data-v-c2d7f2d8><li data-v-c2d7f2d8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/activity",
        class: "hover:text-yellow-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Blog`);
          } else {
            return [
              createTextVNode("Blog")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-c2d7f2d8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/structure",
        class: "hover:text-yellow-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Structure`);
          } else {
            return [
              createTextVNode("Structure")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-c2d7f2d8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/about",
        class: "hover:text-yellow-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`About Us`);
          } else {
            return [
              createTextVNode("About Us")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-c2d7f2d8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/contact",
        class: "hover:text-yellow-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contact`);
          } else {
            return [
              createTextVNode("Contact")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div data-v-c2d7f2d8><h4 class="font-bold text-lg mb-8 text-white border-b-2 border-[#FFD700] w-fit pb-1" data-v-c2d7f2d8>Useful Links</h4><ul class="space-y-4 text-gray-400 text-sm" data-v-c2d7f2d8><li data-v-c2d7f2d8><a href="https://unsoed.ac.id" target="_blank" class="hover:text-yellow-400 transition-colors" data-v-c2d7f2d8>Universitas Jenderal Soedirman</a></li><li data-v-c2d7f2d8><a href="https://ft.unsoed.ac.id" target="_blank" class="hover:text-yellow-400 transition-colors" data-v-c2d7f2d8>Fakultas Teknik</a></li></ul></div><div data-v-c2d7f2d8><h4 class="font-bold text-lg mb-8 text-white border-b-2 border-[#FFD700] w-fit pb-1" data-v-c2d7f2d8>Contact Us</h4><ul class="space-y-4 text-gray-400 text-sm" data-v-c2d7f2d8><li class="flex gap-3" data-v-c2d7f2d8><i class="bi bi-geo-alt text-[#FFD700]" data-v-c2d7f2d8></i><span data-v-c2d7f2d8>Sekre FT Unsoed, Purbalingga</span></li><li class="flex gap-3" data-v-c2d7f2d8><i class="bi bi-envelope text-[#FFD700]" data-v-c2d7f2d8></i><span data-v-c2d7f2d8>seeoftunsoed@gmail.com</span></li><li class="flex gap-3" data-v-c2d7f2d8><i class="bi bi-phone text-[#FFD700]" data-v-c2d7f2d8></i><span data-v-c2d7f2d8>+62 812 3456 7890</span></li></ul></div></div><div class="pt-8 border-t border-white/5 text-center" data-v-c2d7f2d8><p class="text-xs text-gray-500 uppercase tracking-widest" data-v-c2d7f2d8> © 2026 SEEO UNSOED. Set Up Your Mind To Be An Entrepreneur </p></div></div></footer><button style="${ssrRenderStyle([
        showScrollTopButton.value ? null : { display: "none" },
        { "background": "linear-gradient(135deg, #3b82f6, #1d4ed8)", "box-shadow": "0 10px 30px rgba(59, 130, 246, 0.4)" }
      ])}" class="fixed bottom-8 right-8 text-white w-14 h-14 rounded-lg flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 group" data-v-c2d7f2d8><svg class="w-6 h-6 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c2d7f2d8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" data-v-c2d7f2d8></path></svg><div class="absolute inset-0 rounded-lg bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150" data-v-c2d7f2d8></div></button></div>`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<meta name="robots" content="index, follow" data-v-c2d7f2d8${_scopeId}><meta name="viewport" content="width=device-width, initial-scale=1" data-v-c2d7f2d8${_scopeId}><meta property="og:type" content="website" data-v-c2d7f2d8${_scopeId}><meta property="og:site_name" content="SEEO FT UNSOED" data-v-c2d7f2d8${_scopeId}><meta name="twitter:card" content="summary_large_image" data-v-c2d7f2d8${_scopeId}><link rel="canonical"${ssrRenderAttr("href", "https://seeo-unsoed.org" + unref(usePage)().url)} data-v-c2d7f2d8${_scopeId}>`);
          } else {
            return [
              createVNode("meta", {
                name: "robots",
                content: "index, follow"
              }),
              createVNode("meta", {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
              }),
              createVNode("meta", {
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                property: "og:site_name",
                content: "SEEO FT UNSOED"
              }),
              createVNode("meta", {
                name: "twitter:card",
                content: "summary_large_image"
              }),
              createVNode("link", {
                rel: "canonical",
                href: "https://seeo-unsoed.org" + unref(usePage)().url
              }, null, 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/PublicLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PublicLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c2d7f2d8"]]);
export {
  PublicLayout as P
};
//# sourceMappingURL=PublicLayout-23vkxrDC.js.map
