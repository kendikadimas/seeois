import { ref, unref, withCtx, createBlock, createTextVNode, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrRenderDynamicModel, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./InputError-DkffFxkw.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const showPassword = ref({
      password: false,
      password_confirmation: false
    });
    const form_register = useForm({
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&amp;display=swap" data-v-2596e2e6>`);
      _push(ssrRenderComponent(unref(Head), { title: "Register - SEEO" }, null, _parent));
      _push(`<div class="container-fluid g-0" data-v-2596e2e6><div class="row g-0 vh-100" data-v-2596e2e6><div class="col-lg-6 d-flex flex-column justify-content-center align-items-center bg-light p-4 p-lg-5" data-v-2596e2e6><div class="card shadow-lg border-0 rounded-4" style="${ssrRenderStyle({ "width": "100%", "max-width": "450px" })}" data-v-2596e2e6><div class="card-body p-4 p-lg-5" data-v-2596e2e6><div class="text-center mb-4" data-v-2596e2e6><div class="d-lg-none mb-4" data-v-2596e2e6><img src="/storage/local/images/compro/logo.png" alt="SEEO Logo" style="${ssrRenderStyle({ "width": "70px", "height": "70px" })}" data-v-2596e2e6></div><h2 class="h3 fw-bold" data-v-2596e2e6>Daftar Akun</h2><p class="text-muted" data-v-2596e2e6>Bergabung bersama SEEO!</p></div><form data-v-2596e2e6><div class="mb-3 form-floating" data-v-2596e2e6><input id="name" type="text"${ssrRenderAttr("value", unref(form_register).name)} autocomplete="name" required class="form-control" placeholder="Nama Lengkap" data-v-2596e2e6><label for="name" data-v-2596e2e6>Nama Lengkap</label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        message: unref(form_register).errors.name,
        class: "mt-1"
      }, null, _parent));
      _push(`</div><div class="mb-3 form-floating" data-v-2596e2e6><input id="email" type="email"${ssrRenderAttr("value", unref(form_register).email)} autocomplete="username" required class="form-control" placeholder="Alamat Email" data-v-2596e2e6><label for="email" data-v-2596e2e6>Alamat Email</label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        message: unref(form_register).errors.email,
        class: "mt-1"
      }, null, _parent));
      _push(`</div><div class="mb-3 form-floating" data-v-2596e2e6><input id="phone" type="tel"${ssrRenderAttr("value", unref(form_register).phone)} autocomplete="phone" required class="form-control" placeholder="Nomor HP" data-v-2596e2e6><label for="phone" data-v-2596e2e6>Nomor HP</label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        message: unref(form_register).errors.phone,
        class: "mt-1"
      }, null, _parent));
      _push(`</div><div class="mb-3 form-floating position-relative" data-v-2596e2e6><input id="password"${ssrRenderAttr("type", showPassword.value.password ? "text" : "password")}${ssrRenderDynamicModel(showPassword.value.password ? "text" : "password", unref(form_register).password, null)} autocomplete="new-password" required class="form-control" placeholder="Kata Sandi" data-v-2596e2e6><label for="password" data-v-2596e2e6>Kata Sandi</label><button type="button" class="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2 border-0" style="${ssrRenderStyle({ "z-index": "2" })}" data-v-2596e2e6>`);
      if (!showPassword.value.password) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16" data-v-2596e2e6><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" data-v-2596e2e6></path><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" data-v-2596e2e6></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16" data-v-2596e2e6><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.94 5.94 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.16.163-.32.321-.478.481l.77.771zm-1.605-1.605c.16-.16.32-.321.478-.481.635-.634 1.13-1.274 1.465-1.755.073-.105.137-.20.195-.288A13.133 13.133 0 0 0 8 3.5a5.94 5.94 0 0 0-.77.076l.77.771z" data-v-2596e2e6></path><path d="M14.082 9.182a.5.5 0 0 1 .53-.642c.262.068.526.148.79.24.098.034.2.07.303.111.01.004.02.007.03.011a.5.5 0 0 1-.254.99c-.066.014-.132.028-.2.042-.264.068-.53.148-.796.24-.098.034-.2.07-.303.111a.5.5 0 0 1-.53-.642zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" data-v-2596e2e6></path><path d="M12.5 8a4.5 4.5 0 0 1-8.31 2.802l1.018-.948a3.5 3.5 0 1 1 5.218-3.666l.94.94a4.5 4.5 0 0 1 1.134 3.77z" data-v-2596e2e6></path><path d="M1.36 2.111L.11 3.36a.5.5 0 0 0 0 .707l14.142 14.142a.5.5 0 0 0 .707 0l1.25-1.25a.5.5 0 0 0 0-.707L2.067 2.111a.5.5 0 0 0-.707 0z" data-v-2596e2e6></path></svg>`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        message: unref(form_register).errors.password,
        class: "mt-1"
      }, null, _parent));
      _push(`</div><div class="mb-3 form-floating position-relative" data-v-2596e2e6><input id="password_confirmation"${ssrRenderAttr("type", showPassword.value.password_confirmation ? "text" : "password")}${ssrRenderDynamicModel(showPassword.value.password_confirmation ? "text" : "password", unref(form_register).password_confirmation, null)} autocomplete="new-password" required class="form-control" placeholder="Konfirmasi Kata Sandi" data-v-2596e2e6><label for="password_confirmation" data-v-2596e2e6>Konfirmasi Kata Sandi</label><button type="button" class="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2 border-0" style="${ssrRenderStyle({ "z-index": "2" })}" data-v-2596e2e6>`);
      if (!showPassword.value.password_confirmation) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16" data-v-2596e2e6><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" data-v-2596e2e6></path><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" data-v-2596e2e6></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16" data-v-2596e2e6><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.94 5.94 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.16.163-.32.321-.478.481l.77.771zm-1.605-1.605c.16-.16.32-.321.478-.481.635-.634 1.13-1.274 1.465-1.755.073-.105.137-.20.195-.288A13.133 13.133 0 0 0 8 3.5a5.94 5.94 0 0 0-.77.076l.77.771z" data-v-2596e2e6></path><path d="M14.082 9.182a.5.5 0 0 1 .53-.642c.262.068.526.148.79.24.098.034.2.07.303.111.01.004.02.007.03.011a.5.5 0 0 1-.254.99c-.066.014-.132.028-.2.042-.264.068-.53.148-.796.24-.098.034-.2.07-.303.111a.5.5 0 0 1-.53-.642zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" data-v-2596e2e6></path><path d="M12.5 8a4.5 4.5 0 0 1-8.31 2.802l1.018-.948a3.5 3.5 0 1 1 5.218-3.666l.94.94a4.5 4.5 0 0 1 1.134 3.77z" data-v-2596e2e6></path><path d="M1.36 2.111L.11 3.36a.5.5 0 0 0 0 .707l14.142 14.142a.5.5 0 0 0 .707 0l1.25-1.25a.5.5 0 0 0 0-.707L2.067 2.111a.5.5 0 0 0-.707 0z" data-v-2596e2e6></path></svg>`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        message: unref(form_register).errors.password_confirmation,
        class: "mt-1"
      }, null, _parent));
      _push(`</div><div class="d-grid mb-3" data-v-2596e2e6><button type="submit"${ssrIncludeBooleanAttr(unref(form_register).processing) ? " disabled" : ""} class="btn btn-primary btn-lg" data-v-2596e2e6>`);
      if (unref(form_register).processing) {
        _push(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" data-v-2596e2e6></span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(form_register).processing) {
        _push(`<span data-v-2596e2e6> Memproses...</span>`);
      } else {
        _push(`<span data-v-2596e2e6>Register</span>`);
      }
      _push(`</button></div></form><div class="d-flex align-items-center my-3" data-v-2596e2e6><hr class="flex-grow-1" data-v-2596e2e6><span class="mx-2 text-muted small" data-v-2596e2e6>Atau</span><hr class="flex-grow-1" data-v-2596e2e6></div><div class="d-grid mb-3" data-v-2596e2e6>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/google/auth",
        class: "btn btn-outline-dark btn-lg d-flex justify-content-center align-items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google me-2" viewBox="0 0 16 16" data-v-2596e2e6${_scopeId}><path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" data-v-2596e2e6${_scopeId}></path></svg> Daftar dengan Google `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                fill: "currentColor",
                class: "bi bi-google me-2",
                viewBox: "0 0 16 16"
              }, [
                createVNode("path", { d: "M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" })
              ])),
              createTextVNode(" Daftar dengan Google ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="text-center text-muted" data-v-2596e2e6> Sudah punya akun? `);
      _push(ssrRenderComponent(unref(Link), {
        href: "/login",
        class: "fw-bold text-primary text-decoration-none"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Login sekarang `);
          } else {
            return [
              createTextVNode(" Login sekarang ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div><div class="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center bg-primary bg-gradient text-white p-5" data-v-2596e2e6><div class="text-center" style="${ssrRenderStyle({ "max-width": "450px" })}" data-v-2596e2e6><div class="mb-4 d-flex" data-v-2596e2e6><div class="mx-auto d-flex align-items-center justify-content-center bg-white bg-opacity-25 rounded-circle shadow-lg" style="${ssrRenderStyle({ "width": "130px", "height": "130px" })}" data-v-2596e2e6><img src="/storage/local/images/compro/logo.png" alt="SEEO Logo" class="rounded-circle" style="${ssrRenderStyle({ "width": "90px", "height": "90px" })}" data-v-2596e2e6></div></div><h1 class="display-4 fw-bolder mb-3" data-v-2596e2e6>SIS v5.0</h1><h2 class="h3 fw-light mb-4" data-v-2596e2e6>SEEO INFORMATION SYSTEM</h2></div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2596e2e6"]]);
export {
  Register as default
};
