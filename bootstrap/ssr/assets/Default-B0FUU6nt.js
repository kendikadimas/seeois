import { mergeProps, useSSRContext, computed, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderSlot, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
const _sfc_main$1 = {
  __name: "ErrorsLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<body${ssrRenderAttrs(mergeProps({ style: { "min-height": "100vh", "width": "100%", "margin": "0", "background": "url('/storage/local/images/apps/error_background.png')", "background-size": "cover" } }, _attrs))}><div class="d-flex w-100 h-100"><div class="container" style="${ssrRenderStyle({ "height": "100vh" })}"><div class="row align-item-center h-100"><div class="col-12 col-lg-7 order-2 order-lg-1"><div class="d-flex h-100"><div class="card rounded-2 bg-light my-lg-auto mb-auto mt-0 shadow mx-3 p-3 w-100 border-secondary-subtle border"><div class="d-flex border-bottom border-primary pb-3"><span class="h1 text-primary my-auto">${ssrInterpolate("Oops!")}</span><span class="text-primary-emphasis h1 ms-3 my-auto">`);
      ssrRenderSlot(_ctx.$slots, "status", {}, null, _push, _parent);
      _push(` ${ssrInterpolate(":")} `);
      ssrRenderSlot(_ctx.$slots, "title", {}, null, _push, _parent);
      _push(`</span></div>`);
      ssrRenderSlot(_ctx.$slots, "caption", {}, null, _push, _parent);
      _push(`<div class="d-flex mt-3"><a${ssrRenderAttr("href", _ctx.route("intro"))} class="btn btn-sm btn-primary border-0 w-75">${ssrInterpolate("Back to Home")}</a><a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScC1aottJgG3y1JCFt1UQwvaW2dSLO3DxHq3Ds3k5DL1VaSZA/viewform?usp=sharing" class="btn btn-sm btn-secondary border-0 w-25 ms-3">${ssrInterpolate("Report")}</a></div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div><div class="col-12 col-lg-5 order-1 order-lg-2"><div class="d-flex h-100">`);
      ssrRenderSlot(_ctx.$slots, "image", {}, null, _push, _parent);
      _push(`</div></div></div></div></div></body>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/ErrorsLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Default",
  __ssrInlineRender: true,
  props: {
    status: Number,
    information: String
  },
  setup(__props) {
    const props = __props;
    const message = {
      400: "Bad Request",
      401: "Unauthorized",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      408: "Request Timeout",
      419: "Page Expired",
      429: "Too Many Request",
      500: "Internal Server Error",
      502: "Bad Gateway",
      504: "Gateway Timeout"
    };
    const caption = {
      404: "Page you are looking for is not found.",
      419: "The page is expired. Please reload again."
    };
    const question = [404, 408, 419, 500, 502, 504];
    const image = computed(() => {
      return question.find((status) => status == props.status) ? "question" : "exclamation";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.status,
        icon: "/storage/local/images/apps/logo.png"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        status: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.status)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.status), 1)
            ];
          }
        }),
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(message[__props.status])}`);
          } else {
            return [
              createTextVNode(toDisplayString(message[__props.status]), 1)
            ];
          }
        }),
        caption: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (caption[__props.status]) {
              _push2(`<div class="d-flex mt-3"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "text-align": "justify" })}"${_scopeId}>${ssrInterpolate(caption[__props.status])}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.information) {
              _push2(`<div class="d-flex mt-3"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "text-align": "justify" })}"${_scopeId}>${ssrInterpolate(__props.information)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              caption[__props.status] ? (openBlock(), createBlock("div", {
                key: 0,
                class: "d-flex mt-3"
              }, [
                createVNode("span", {
                  class: "text-secondary",
                  style: { "text-align": "justify" }
                }, toDisplayString(caption[__props.status]), 1)
              ])) : createCommentVNode("", true),
              __props.information ? (openBlock(), createBlock("div", {
                key: 1,
                class: "d-flex mt-3"
              }, [
                createVNode("span", {
                  class: "text-secondary",
                  style: { "text-align": "justify" }
                }, toDisplayString(__props.information), 1)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        image: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr(
              "src",
              "/storage/local/images/apps/error_" + image.value + "_image.png"
            )} class="img-fluid my-lg-auto mt-auto mb-0" alt="image"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: "/storage/local/images/apps/error_" + image.value + "_image.png",
                class: "img-fluid my-lg-auto mt-auto mb-0",
                alt: "image"
              }, null, 8, ["src"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Errors/Default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
