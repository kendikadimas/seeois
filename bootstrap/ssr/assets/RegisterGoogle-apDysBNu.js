import { ref, watch, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrRenderDynamicModel, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./InputError-DkffFxkw.js";
import { _ as _sfc_main$2 } from "./Notif-DL0SggHu.js";
import { useForm, Head } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
const _sfc_main = {
  __name: "RegisterGoogle",
  __ssrInlineRender: true,
  props: {
    id: Number,
    notif: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const title = ref("Selesaikan Pendaftaran");
    const toastNotifRef = ref(null);
    const showPassword = ref({
      password: false,
      password_confirmation: false
    });
    const form_register_google = useForm({
      id_google: props.id,
      phone: null,
      password: null,
      password_confirmation: null
    });
    watch(
      () => props.notif,
      (newValue) => {
        if (newValue && toastNotifRef.value) {
          toastNotifRef.value.showToast(newValue.type, newValue.message);
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&amp;display=swap" data-v-56267678>`);
      _push(ssrRenderComponent(unref(Head), { title: title.value }, null, _parent));
      _push(`<div class="container-fluid g-0" data-v-56267678><div class="row g-0 vh-100" data-v-56267678><div class="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center bg-primary bg-gradient text-white p-5" data-v-56267678><div class="text-center" style="${ssrRenderStyle({ "max-width": "450px" })}" data-v-56267678><div class="mb-4 d-flex" data-v-56267678><div class="mx-auto d-flex align-items-center justify-content-center bg-white bg-opacity-25 rounded-circle shadow-lg" style="${ssrRenderStyle({ "width": "130px", "height": "130px" })}" data-v-56267678><img src="/storage/local/images/compro/logo.png" alt="SEEO Logo" class="rounded-circle" style="${ssrRenderStyle({ "width": "90px", "height": "90px" })}" data-v-56267678></div></div><h1 class="display-4 fw-bolder mb-3" data-v-56267678>SIS v5.0</h1><h2 class="h3 fw-light mb-4" data-v-56267678>SEEO INFORMATION SYSTEM</h2></div></div><div class="col-lg-6 d-flex flex-column justify-content-center align-items-center bg-light p-4 p-lg-5" data-v-56267678><div class="card shadow-lg border-0 rounded-4" style="${ssrRenderStyle({ "width": "100%", "max-width": "450px" })}" data-v-56267678><div class="card-body p-4 p-lg-5" data-v-56267678><div class="text-center mb-4" data-v-56267678><div class="d-lg-none mb-4" data-v-56267678><img src="/storage/local/images/compro/logo.png" alt="SEEO Logo" style="${ssrRenderStyle({ "width": "70px", "height": "70px" })}" data-v-56267678></div><h2 class="h3 fw-bold mb-2" data-v-56267678>Selesaikan Pendaftaran</h2><p class="text-muted" data-v-56267678>Lengkapi data akun Google Anda.</p></div><p class="fw-bold text-danger bg-danger-subtle border text-center rounded border-danger p-2 mb-3 small" data-v-56267678> Jangan tinggalkan atau refresh halaman ini! </p><p class="text-muted mb-4 small" style="${ssrRenderStyle({ "text-align": "justify" })}" data-v-56267678> Anda mendaftar menggunakan Google. Silakan masukkan nomor HP dan kata sandi baru untuk menyelesaikan pendaftaran. </p><form data-v-56267678><div class="mb-3 form-floating" data-v-56267678><input type="tel" class="form-control" id="phone" autocomplete="tel" autofocus required${ssrRenderAttr("value", unref(form_register_google).phone)} placeholder="Nomor HP" data-v-56267678><label for="phone" data-v-56267678>Nomor HP</label>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        message: unref(form_register_google).errors.phone,
        class: "mt-1"
      }, null, _parent));
      _push(`</div><div class="mb-3 form-floating position-relative" data-v-56267678><input id="password"${ssrRenderAttr("type", showPassword.value.password ? "text" : "password")} class="form-control"${ssrRenderDynamicModel(showPassword.value.password ? "text" : "password", unref(form_register_google).password, null)} required autocomplete="new-password" placeholder="Pasword123" data-v-56267678><label for="password" data-v-56267678>Kata Sandi Baru</label><button type="button" class="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2 border-0" style="${ssrRenderStyle({ "z-index": "2" })}" data-v-56267678>`);
      if (!showPassword.value.password) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16" data-v-56267678><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" data-v-56267678></path><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" data-v-56267678></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16" data-v-56267678><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.94 5.94 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.16.163-.32.321-.478.481l.77.771zm-1.605-1.605c.16-.16.32-.321.478-.481.635-.634 1.13-1.274 1.465-1.755.073-.105.137-.20.195-.288A13.133 13.133 0 0 0 8 3.5a5.94 5.94 0 0 0-.77.076l.77.771z" data-v-56267678></path><path d="M14.082 9.182a.5.5 0 0 1 .53-.642c.262.068.526.148.79.24.098.034.2.07.303.111.01.004.02.007.03.011a.5.5 0 0 1-.254.99c-.066.014-.132.028-.2.042-.264.068-.53.148-.796.24-.098.034-.2.07-.303.111a.5.5 0 0 1-.53-.642zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" data-v-56267678></path><path d="M12.5 8a4.5 4.5 0 0 1-8.31 2.802l1.018-.948a3.5 3.5 0 1 1 5.218-3.666l.94.94a4.5 4.5 0 0 1 1.134 3.77z" data-v-56267678></path><path d="M1.36 2.111L.11 3.36a.5.5 0 0 0 0 .707l14.142 14.142a.5.5 0 0 0 .707 0l1.25-1.25a.5.5 0 0 0 0-.707L2.067 2.111a.5.5 0 0 0-.707 0z" data-v-56267678></path></svg>`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        message: unref(form_register_google).errors.password,
        class: "mt-1"
      }, null, _parent));
      _push(`</div><div class="mb-3 form-floating position-relative" data-v-56267678><input id="password_confirmation"${ssrRenderAttr("type", showPassword.value.password_confirmation ? "text" : "password")} class="form-control"${ssrRenderDynamicModel(showPassword.value.password_confirmation ? "text" : "password", unref(form_register_google).password_confirmation, null)} required autocomplete="new-password" placeholder="Pasword123" data-v-56267678><label for="password_confirmation" data-v-56267678>Konfirmasi Kata Sandi</label><button type="button" class="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2 border-0" style="${ssrRenderStyle({ "z-index": "2" })}" data-v-56267678>`);
      if (!showPassword.value.password_confirmation) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16" data-v-56267678><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" data-v-56267678></path><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" data-v-56267678></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16" data-v-56267678><path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.94 5.94 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.16.163-.32.321-.478.481l.77.771zm-1.605-1.605c.16-.16.32-.321.478-.481.635-.634 1.13-1.274 1.465-1.755.073-.105.137-.20.195-.288A13.133 13.133 0 0 0 8 3.5a5.94 5.94 0 0 0-.77.076l.77.771z" data-v-56267678></path><path d="M14.082 9.182a.5.5 0 0 1 .53-.642c.262.068.526.148.79.24.098.034.2.07.303.111.01.004.02.007.03.011a.5.5 0 0 1-.254.99c-.066.014-.132.028-.2.042-.264.068-.53.148-.796.24-.098.034-.2.07-.303.111a.5.5 0 0 1-.53-.642zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" data-v-56267678></path><path d="M12.5 8a4.5 4.5 0 0 1-8.31 2.802l1.018-.948a3.5 3.5 0 1 1 5.218-3.666l.94.94a4.5 4.5 0 0 1 1.134 3.77z" data-v-56267678></path><path d="M1.36 2.111L.11 3.36a.5.5 0 0 0 0 .707l14.142 14.142a.5.5 0 0 0 .707 0l1.25-1.25a.5.5 0 0 0 0-.707L2.067 2.111a.5.5 0 0 0-.707 0z" data-v-56267678></path></svg>`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        message: unref(form_register_google).errors.password_confirmation,
        class: "mt-1"
      }, null, _parent));
      _push(`</div><div class="d-grid mt-4" data-v-56267678><button type="submit" class="btn btn-primary btn-lg"${ssrIncludeBooleanAttr(unref(form_register_google).processing) ? " disabled" : ""} data-v-56267678>`);
      if (unref(form_register_google).processing) {
        _push(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" data-v-56267678></span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(form_register_google).processing) {
        _push(`<span data-v-56267678> Mendaftar...</span>`);
      } else {
        _push(`<span data-v-56267678>Daftar</span>`);
      }
      _push(`</button></div></form></div></div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        ref_key: "toastNotifRef",
        ref: toastNotifRef
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/RegisterGoogle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RegisterGoogle = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-56267678"]]);
export {
  RegisterGoogle as default
};
