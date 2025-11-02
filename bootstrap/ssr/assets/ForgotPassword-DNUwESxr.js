import { withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, withModifiers, withDirectives, vModelText, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { A as AuthenticationLayout } from "./AuthenticationLayout-DQrsiqrM.js";
import { _ as _sfc_main$1 } from "./InputError-DugfSnOg.js";
import { useForm, Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: {
    status: {
      type: String
    }
  },
  setup(__props) {
    const form_reset = useForm({
      email: null
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AuthenticationLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: "Forgot Password",
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(`<div class="row px-2"${_scopeId}><div class="col-12 border-primary border-bottom d-flex pb-1 mb-3 px-0"${_scopeId}><span class="h4 text-primary-emphasis my-auto me-auto"${_scopeId}>${ssrInterpolate("Reset Password")}</span></div></div><div class="text-secondary" style="${ssrRenderStyle({ "text-align": "justify" })}"${_scopeId}> Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. </div>`);
            if (__props.status) {
              _push2(`<div class="mb-4 text-sm font-medium text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div class="d-flex mt-2"${_scopeId}><label for="email" class="form-label my-1 me-3"${_scopeId}>Email</label><input id="email" type="email" class="form-control form-control-sm" placeholder="your@mail.com"${ssrRenderAttr("value", unref(form_reset).email)} autocomplete="username" autofocus required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form_reset).errors.email,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-3"${_scopeId}><button type="submit" class="btn btn-sm btn-primary w-100"${_scopeId}> Send Password Reset Link <i class="bi bi-envelope-arrow-up border-start ms-3 ps-3"${_scopeId}></i></button></div></form>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: "Forgot Password",
                icon: "/storage/local/images/apps/logo.png"
              }),
              createVNode("div", { class: "row px-2" }, [
                createVNode("div", { class: "col-12 border-primary border-bottom d-flex pb-1 mb-3 px-0" }, [
                  createVNode("span", { class: "h4 text-primary-emphasis my-auto me-auto" }, toDisplayString("Reset Password"))
                ])
              ]),
              createVNode("div", {
                class: "text-secondary",
                style: { "text-align": "justify" }
              }, " Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. "),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 text-sm font-medium text-green-600"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(($event) => unref(form_reset).post(_ctx.route("password.email")), ["prevent"])
              }, [
                createVNode("div", { class: "d-flex mt-2" }, [
                  createVNode("label", {
                    for: "email",
                    class: "form-label my-1 me-3"
                  }, "Email"),
                  withDirectives(createVNode("input", {
                    id: "email",
                    type: "email",
                    class: "form-control form-control-sm",
                    placeholder: "your@mail.com",
                    "onUpdate:modelValue": ($event) => unref(form_reset).email = $event,
                    autocomplete: "username",
                    autofocus: "",
                    required: ""
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form_reset).email]
                  ]),
                  createVNode(_sfc_main$1, {
                    message: unref(form_reset).errors.email,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-3" }, [
                  createVNode("button", {
                    type: "submit",
                    class: "btn btn-sm btn-primary w-100"
                  }, [
                    createTextVNode(" Send Password Reset Link "),
                    createVNode("i", { class: "bi bi-envelope-arrow-up border-start ms-3 ps-3" })
                  ])
                ])
              ], 40, ["onSubmit"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
