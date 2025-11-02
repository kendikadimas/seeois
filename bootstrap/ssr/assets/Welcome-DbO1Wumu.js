import { ref, watch, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Notif-DL0SggHu.js";
import { Head, Link } from "@inertiajs/vue3";
import "vue-toastification";
const _sfc_main = {
  __name: "Welcome",
  __ssrInlineRender: true,
  props: {
    notif: Object
  },
  setup(__props) {
    const props = __props;
    const toastNotifRef = ref(null);
    watch(
      () => props.notif,
      (newValue) => {
        if (newValue && toastNotifRef.value) {
          const notification = newValue;
          toastNotifRef.value.showToast(notification.type, notification.message);
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Welcome to Blaterian" }, null, _parent));
      _push(`<main class="min-h-screen bg-cover bg-center bg-no-repeat relative" style="${ssrRenderStyle({ "background-image": "url('/storage/local/images/compro/seeo.jpg')" })}"><div class="absolute inset-0 bg-black bg-opacity-50"></div><div class="relative z-10 min-h-screen flex items-center"><div class="container mx-auto px-4 lg:px-8"><div class="grid lg:grid-cols-2 gap-12 items-center"><div class="text-white space-y-6"><h1 class="text-4xl lg:text-5xl font-bold text-yellow-400"> #SetUpYourMindToBeAnEntrepreneur! </h1><div class="text-lg leading-relaxed"><p class="mb-4"> Established in 2020 to develop students&#39; creativity and experience in entrepreneurship. The desire to have an impact on the surrounding environment gave birth to the <span class="text-yellow-400 font-semibold">Blaterian</span> brand by bringing local wisdom values from where we come from. </p><p> Located on the border of Purbalingga district, its name is Blater Village. </p></div></div><div class="flex justify-center lg:justify-end"><div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"><div class="text-center mb-8"><h2 class="text-3xl font-bold text-amber-600 mb-2">Blaterian</h2><p class="text-gray-600 text-sm">by Soedirman Engineering Entrepreneurship Organization</p></div><div class="space-y-4"><a href="/shop/home" target="_blank" class="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> Shop </a><div class="grid grid-cols-2 gap-3">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/auth/login",
        class: "bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 text-center"
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
      _push(ssrRenderComponent(unref(Link), {
        href: "/register",
        class: "bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Register `);
          } else {
            return [
              createTextVNode(" Register ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div></div></div></div><div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white py-8"><div class="container mx-auto px-4 lg:px-8"><div class="grid md:grid-cols-3 gap-8 text-sm"><div><h4 class="font-semibold text-yellow-400 mb-3">Our Contact :</h4><div class="space-y-2"><p class="font-medium">Business</p><div class="flex items-center gap-2"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg><span>blaterian.id</span></div></div></div><div><h4 class="font-semibold text-yellow-400 mb-3">Organization</h4><div class="flex items-center gap-2"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg><span>seeo_ftunsoed</span></div></div><div><h4 class="font-semibold text-yellow-400 mb-3">Address :</h4><div class="space-y-1"><p class="font-medium">Organization</p><p class="text-gray-300">FT Unsoed</p><p class="text-gray-300">Fakultas Teknik Universitas</p><p class="text-gray-300">Jenderal Soedirman. Jalan Mayjen</p></div></div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        ref_key: "toastNotifRef",
        ref: toastNotifRef
      }, null, _parent));
      _push(`</main><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Welcome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
