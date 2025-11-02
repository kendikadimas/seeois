import { ref, computed, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CQDhtLdH.js";
import { useForm, usePage, Head } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "VerifyEmail",
  __ssrInlineRender: true,
  props: {
    status: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({});
    const auth_user = usePage().props.auth.user;
    const modalConfirmationRef = ref(null);
    const verificationLinkSent = computed(
      () => props.status === "verification-link-sent"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&amp;display=swap" data-v-f63f0cef>`);
      _push(ssrRenderComponent(unref(Head), { title: "Verifikasi Email - SEEO" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        ref_key: "modalConfirmationRef",
        ref: modalConfirmationRef
      }, null, _parent));
      _push(`<div class="container-fluid g-0" data-v-f63f0cef><div class="row g-0 vh-100" data-v-f63f0cef><div class="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center bg-primary bg-gradient text-white p-5" data-v-f63f0cef><div class="text-center" style="${ssrRenderStyle({ "max-width": "450px" })}" data-v-f63f0cef><div class="mb-4 d-flex" data-v-f63f0cef><div class="mx-auto d-flex align-items-center justify-content-center bg-white bg-opacity-25 rounded-circle shadow-lg" style="${ssrRenderStyle({ "width": "130px", "height": "130px" })}" data-v-f63f0cef><img src="/storage/local/images/compro/logo.png" alt="SEEO Logo" class="rounded-circle" style="${ssrRenderStyle({ "width": "90px", "height": "90px" })}" data-v-f63f0cef></div></div><h1 class="display-4 fw-bolder mb-3" data-v-f63f0cef>SIS v5.0</h1><h2 class="h3 fw-light mb-4" data-v-f63f0cef>SEEO INFORMATION SYSTEM</h2></div></div><div class="col-lg-6 d-flex flex-column justify-content-center align-items-center bg-light p-4 p-lg-5" data-v-f63f0cef><div class="card shadow-lg border-0 rounded-4" style="${ssrRenderStyle({ "width": "100%", "max-width": "450px" })}" data-v-f63f0cef><div class="card-body p-4 p-lg-5" data-v-f63f0cef><div class="text-center mb-4" data-v-f63f0cef><div class="d-lg-none mb-4" data-v-f63f0cef><img src="/storage/local/images/compro/logo.png" alt="SEEO Logo" style="${ssrRenderStyle({ "width": "70px", "height": "70px" })}" data-v-f63f0cef></div><h2 class="h3 fw-bold mb-2" data-v-f63f0cef>Verifikasi Email Anda</h2><p class="text-muted" data-v-f63f0cef>Satu langkah terakhir!</p></div><div class="mb-4 text-muted small" style="${ssrRenderStyle({ "text-align": "justify" })}" data-v-f63f0cef> Terima kasih telah mendaftar! Sebelum memulai, silakan konfirmasi email Anda dengan <b data-v-f63f0cef>mengklik link</b> yang telah kami kirimkan ke <b class="text-dark" data-v-f63f0cef>${ssrInterpolate(unref(auth_user).email)}</b>. Jika Anda tidak menerima email, kami akan dengan senang hati mengirimkannya lagi. </div>`);
      if (verificationLinkSent.value) {
        _push(`<div class="alert alert-success small" data-v-f63f0cef> Link verifikasi baru telah dikirimkan ke alamat email yang Anda berikan saat pendaftaran. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-4 d-flex justify-content-between align-items-center" data-v-f63f0cef><button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-f63f0cef>`);
      if (unref(form).processing) {
        _push(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" data-v-f63f0cef></span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(form).processing) {
        _push(`<span data-v-f63f0cef> Mengirim...</span>`);
      } else {
        _push(`<span data-v-f63f0cef>Kirim Ulang Email</span>`);
      }
      _push(`</button><a class="btn btn-outline-secondary" data-v-f63f0cef>Log Out</a></div></div></div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const VerifyEmail = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f63f0cef"]]);
export {
  VerifyEmail as default
};
