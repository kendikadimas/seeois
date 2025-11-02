import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderSlot, ssrRenderAttr } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<main${ssrRenderAttrs(_attrs)}><div class="container" style="${ssrRenderStyle({ "height": "100vh" })}"><div class="row justify-content-center bg-white" style="${ssrRenderStyle({ "height": "100vh" })}"><div class="col-6 d-none d-lg-flex" style="${ssrRenderStyle({ "height": "100vh" })}"><div class="my-auto"><div class="d-flex w-100"><a href="/" class="mx-auto"><img src="/storage/local/images/shop/brand/blaterian_logo.png" alt="SEEO Logo" width="300px" height="300px" class="bg-warning bg-opacity-10 rounded-circle"></a></div><h1 class="text-warning h1 fw-bold mx-3"> BLATERIAN <i class="fs-5 text-secondary-emphasis">by</i></h1><span class="text-primary-emphasis h4 d-none d-lg-inline mx-3">${ssrInterpolate("Soedirman Engineering Entrepreneurship Organization")}</span></div></div><div class="col-lg-6 col-md-10 col-12 bg-dark bg-opacity-25 pt-lg-5 pb-5 pb-lg-0" style="${ssrRenderStyle({ "height": "100%" })}"><div class="row justify-content-center h-100"><div class="col-lg-10"><div class="d-flex h-100"><div class="my-auto w-100"><div class="d-lg-none d-block"><div class="d-flex w-100"><a href="/"><div class="mx-auto w-50 bg-white rounded-circle"><img src="/storage/local/images/shop/brand/blaterian_logo.png" alt="image" width="100%" height="auto" class="bg-warning bg-opacity-10 rounded-circle"></div></a></div><h1 class="text-warning-emphasis h1 fw-bold mx-2 mb-0 mt-5"> BLATERIAN <i class="fs-5 text-secondary-emphasis">by</i></h1><span class="text-primary-emphasis d-block mx-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"> Soedirman Engineering Entrepeneurship Organization </span></div><div class="card shadow border-0 w-100 mt-4 mt-lg-0"><div class="card-body">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div>`);
  if (_ctx.route().current() == "login" || _ctx.route().current() == "register") {
    _push(`<a${ssrRenderAttr("href", _ctx.route("google.auth"))} class="shadow d-flex mt-3 border-0 bg-white rounded-3 text-decoration-none"><button class="btn btn-sm btn-outline-warning w-100 rounded-3 d-flex"><span class="my-auto text-secondary ms-auto text-decoration-none h6">Sign with Google</span><i class="bi bi-google fs-5 ms-3 me-auto my-auto"></i></button></a>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div></div></div></div></div></main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticationLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AuthenticationLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  AuthenticationLayout as A
};
