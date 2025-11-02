import { withCtx, unref, createVNode, toDisplayString, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { A as AuthenticationLayout } from "./AuthenticationLayout-DQrsiqrM.js";
import { _ as _sfc_main$1 } from "./InputError-DugfSnOg.js";
import "./PrimaryButton-RMx7sa3g.js";
import { useForm, Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ResetPassword",
  __ssrInlineRender: true,
  props: {
    email: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      token: props.token,
      email: props.email,
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route("password.store"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AuthenticationLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: "Reset Password",
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(`<div class="d-flex border-bottom border-primary"${_scopeId}><span class="h5 text-primary-emphasis"${_scopeId}>${ssrInterpolate("New Password")}</span></div><form${_scopeId}><div class="row gx-3 mt-3"${_scopeId}><div class="col-5 col-lg-4"${_scopeId}><label for="email"${_scopeId}>${ssrInterpolate("Email")}</label></div><div class="col-7 col-lg-8"${_scopeId}><input id="email" type="email" class="form-control form-control-sm"${ssrRenderAttr("value", unref(form).email)} required autofocus autocomplete="username" placeholder="user@mail.com"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-4"${_scopeId}><div class="row gx-3"${_scopeId}><div class="col-5 col-lg-4"${_scopeId}><label for="password"${_scopeId}>${ssrInterpolate("Password")}</label></div><div class="col-7 col-lg-8"${_scopeId}><input id="password" type="password" class="form-control form-control-sm"${ssrRenderAttr("value", unref(form).password)} required autocomplete="new-password" placeholder="Pasword123"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="mt-4"${_scopeId}><div class="row gx-3"${_scopeId}><div class="col-5 col-lg-4"${_scopeId}><label for="password_confirmation"${_scopeId}>${ssrInterpolate("Confirm Password")}</label></div><div class="col-7 col-lg-8"${_scopeId}><input id="password_confirmation" type="password" class="form-control form-control-sm"${ssrRenderAttr("value", unref(form).password_confirmation)} required autocomplete="new-password" placeholder="Pasword123"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              class: "mt-2",
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="mt-4 d-flex"${_scopeId}><button class="btn btn-sm btn-primary ms-auto"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}> Reset Password </button></div></form>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: "Reset Password",
                icon: "/storage/local/images/apps/logo.png"
              }),
              createVNode("div", { class: "d-flex border-bottom border-primary" }, [
                createVNode("span", { class: "h5 text-primary-emphasis" }, toDisplayString("New Password"))
              ]),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", { class: "row gx-3 mt-3" }, [
                  createVNode("div", { class: "col-5 col-lg-4" }, [
                    createVNode("label", { for: "email" }, toDisplayString("Email"))
                  ]),
                  createVNode("div", { class: "col-7 col-lg-8" }, [
                    withDirectives(createVNode("input", {
                      id: "email",
                      type: "email",
                      class: "form-control form-control-sm",
                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                      required: "",
                      autofocus: "",
                      autocomplete: "username",
                      placeholder: "user@mail.com"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).email]
                    ]),
                    createVNode(_sfc_main$1, {
                      class: "mt-2",
                      message: unref(form).errors.email
                    }, null, 8, ["message"])
                  ])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode("div", { class: "row gx-3" }, [
                    createVNode("div", { class: "col-5 col-lg-4" }, [
                      createVNode("label", { for: "password" }, toDisplayString("Password"))
                    ]),
                    createVNode("div", { class: "col-7 col-lg-8" }, [
                      withDirectives(createVNode("input", {
                        id: "password",
                        type: "password",
                        class: "form-control form-control-sm",
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        required: "",
                        autocomplete: "new-password",
                        placeholder: "Pasword123"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).password]
                      ]),
                      createVNode(_sfc_main$1, {
                        class: "mt-2",
                        message: unref(form).errors.password
                      }, null, 8, ["message"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode("div", { class: "row gx-3" }, [
                    createVNode("div", { class: "col-5 col-lg-4" }, [
                      createVNode("label", { for: "password_confirmation" }, toDisplayString("Confirm Password"))
                    ]),
                    createVNode("div", { class: "col-7 col-lg-8" }, [
                      withDirectives(createVNode("input", {
                        id: "password_confirmation",
                        type: "password",
                        class: "form-control form-control-sm",
                        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                        required: "",
                        autocomplete: "new-password",
                        placeholder: "Pasword123"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).password_confirmation]
                      ]),
                      createVNode(_sfc_main$1, {
                        class: "mt-2",
                        message: unref(form).errors.password_confirmation
                      }, null, 8, ["message"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "mt-4 d-flex" }, [
                  createVNode("button", {
                    class: "btn btn-sm btn-primary ms-auto",
                    disabled: unref(form).processing
                  }, " Reset Password ", 8, ["disabled"])
                ])
              ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ResetPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
