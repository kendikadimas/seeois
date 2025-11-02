import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "InputError",
  __ssrInlineRender: true,
  props: {
    message: {
      type: [String, Array]
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: __props.message ? null : { display: "none" }
      }, _attrs))}>`);
      if (Array.isArray(__props.message)) {
        _push(`<!--[-->`);
        ssrRenderList(__props.message, (error) => {
          _push(`<p class="text-sm text-danger mb-1" style="${ssrRenderStyle({ "font-size": "smaller" })}">${ssrInterpolate(error)}</p>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (!Array.isArray(__props.message)) {
        _push(`<p class="text-sm text-danger mb-1" style="${ssrRenderStyle({ "font-size": "smaller" })}">${ssrInterpolate(__props.message)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputError.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
