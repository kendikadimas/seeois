import { unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./InputError-DkffFxkw.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: {
    status: {
      type: String,
      default: null
    },
    reset_url: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const form_reset = useForm({
      email: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[--><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&amp;display=swap" data-v-a03df84a>`);
      _push(ssrRenderComponent(unref(Head), { title: "Lupa Password - SEEO" }, null, _parent));
      _push(`<div class="container-fluid g-0 auth-shell" data-v-a03df84a><div class="row g-0 vh-100" data-v-a03df84a><div class="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center bg-primary bg-gradient text-white p-5" data-v-a03df84a><div class="text-center" style="${ssrRenderStyle({ "max-width": "450px" })}" data-v-a03df84a><div class="mb-4 d-flex" data-v-a03df84a><div class="mx-auto d-flex align-items-center justify-content-center bg-white bg-opacity-25 rounded-circle shadow-lg" style="${ssrRenderStyle({ "width": "130px", "height": "130px" })}" data-v-a03df84a><img${ssrRenderAttr("src", _ctx.$imageUrl("compro/logo.png"))} alt="SEEO Logo" class="rounded-circle" style="${ssrRenderStyle({ "width": "90px", "height": "90px" })}" data-v-a03df84a></div></div><h1 class="display-4 fw-bolder mb-3" data-v-a03df84a>SIS v${ssrInterpolate(((_a = _ctx.$page.props.app) == null ? void 0 : _a.version) || "6.0")}</h1><h2 class="h3 fw-light mb-4" data-v-a03df84a>SEEO INFORMATION SYSTEM</h2></div></div><div class="col-lg-6 d-flex flex-column justify-content-center align-items-center bg-light p-4 p-lg-5" data-v-a03df84a><div class="card shadow-lg border-0 rounded-4" style="${ssrRenderStyle({ "width": "100%", "max-width": "450px" })}" data-v-a03df84a><div class="card-body p-4 p-lg-5" data-v-a03df84a><div class="text-center mb-4" data-v-a03df84a><div class="d-lg-none mb-4" data-v-a03df84a><img${ssrRenderAttr("src", _ctx.$imageUrl("compro/logo.png"))} alt="SEEO Logo" style="${ssrRenderStyle({ "width": "70px", "height": "70px" })}" data-v-a03df84a></div><h2 class="h3 fw-bold mb-2" data-v-a03df84a>Lupa Kata Sandi?</h2></div><div class="mb-4 text-muted" style="${ssrRenderStyle({ "text-align": "justify", "font-size": "0.95rem" })}" data-v-a03df84a> Masukkan alamat email Anda yang terdaftar. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda. </div>`);
      if (__props.status) {
        _push(`<div class="alert alert-success d-flex align-items-center gap-2 small mb-3" data-v-a03df84a><i class="bi bi-check-circle-fill fs-5" data-v-a03df84a></i><div data-v-a03df84a>${ssrInterpolate(__props.status)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.reset_url) {
        _push(`<div class="alert alert-info border-info-subtle small mb-4" data-v-a03df84a><div class="fw-bold mb-1 d-flex align-items-center gap-1 text-primary" data-v-a03df84a><i class="bi bi-info-circle-fill" data-v-a03df84a></i><span data-v-a03df84a>Mode Pengujian (Local):</span></div><p class="mb-2 text-secondary" data-v-a03df84a>Karena driver email menggunakan log lokal, Anda dapat langsung membuka tautan berikut:</p><a${ssrRenderAttr("href", __props.reset_url)} class="btn btn-sm btn-primary w-100 text-white d-flex align-items-center justify-content-center gap-2" data-v-a03df84a><span data-v-a03df84a>Buka Halaman Reset Kata Sandi</span><i class="bi bi-arrow-right" data-v-a03df84a></i></a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form data-v-a03df84a><div class="mb-3 form-floating" data-v-a03df84a><input id="email" type="email" class="form-control" placeholder="Alamat Email"${ssrRenderAttr("value", unref(form_reset).email)} autocomplete="username" autofocus required data-v-a03df84a><label for="email" data-v-a03df84a>Alamat Email</label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        message: unref(form_reset).errors.email,
        class: "mt-1"
      }, null, _parent));
      _push(`</div><div class="d-grid mt-4" data-v-a03df84a><button type="submit" class="btn btn-primary btn-lg"${ssrIncludeBooleanAttr(unref(form_reset).processing) ? " disabled" : ""} data-v-a03df84a>`);
      if (unref(form_reset).processing) {
        _push(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" data-v-a03df84a></span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(form_reset).processing) {
        _push(`<span data-v-a03df84a> Mengirim...</span>`);
      } else {
        _push(`<span data-v-a03df84a>Kirim Link Reset</span>`);
      }
      _push(`</button></div><div class="text-center text-muted border-top pt-3 mt-4" data-v-a03df84a> Ingat kata sandi Anda? `);
      _push(ssrRenderComponent(unref(Link), {
        href: "/login",
        class: "fw-bold text-primary text-decoration-none"
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
      _push(`</div></form></div></div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ForgotPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a03df84a"]]);
export {
  ForgotPassword as default
};
//# sourceMappingURL=ForgotPassword-BDXcKYBC.js.map
