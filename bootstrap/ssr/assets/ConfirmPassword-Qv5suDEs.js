import { withCtx, unref, createVNode, withModifiers, toDisplayString, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { A as AuthenticationLayout } from "./AuthenticationLayout-DQrsiqrM.js";
import { _ as _sfc_main$1 } from "./InputError-DugfSnOg.js";
import "./PrimaryButton-RMx7sa3g.js";
import { useForm, Head } from "@inertiajs/vue3";
import { s as showPassword } from "../app.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "axios";
import "date-fns";
import "bootstrap";
import "vue-toastification";
const _sfc_main = {
  __name: "ConfirmPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      password: ""
    });
    const submit = () => {
      form.post(route("password.confirm"), {
        onFinish: () => form.reset()
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AuthenticationLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: "Confirm Password",
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> This is a secure area of the application. Please confirm your password before continuing. </div><form${_scopeId}><div class="d-flex"${_scopeId}><label for="password" class="me-3 mt-1"${_scopeId}>${ssrInterpolate("Password")}</label><div class="w-100"${_scopeId}><div class="input-group input-group-sm rounded-2"${_scopeId}><input id="password" type="password" class="form-control form-control-sm"${ssrRenderAttr("value", unref(form).password)} required autocomplete="current-password" autofocus${_scopeId}><button type="button" class="btn-sm btn-outline-secondary py-0 border-0 rounded-end-2"${_scopeId}><i class="bi bi-eye"${_scopeId}></i></button></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              id: "password_icon",
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-4 d-flex"${_scopeId}><button class="${ssrRenderClass([{ "opacity-25": unref(form).processing }, "btn btn-sm btn-primary w-100"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}> Confirm </button></div></form>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: "Confirm Password",
                icon: "/storage/local/images/apps/logo.png"
              }),
              createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " This is a secure area of the application. Please confirm your password before continuing. "),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", { class: "d-flex" }, [
                  createVNode("label", {
                    for: "password",
                    class: "me-3 mt-1"
                  }, toDisplayString("Password")),
                  createVNode("div", { class: "w-100" }, [
                    createVNode("div", { class: "input-group input-group-sm rounded-2" }, [
                      withDirectives(createVNode("input", {
                        id: "password",
                        type: "password",
                        class: "form-control form-control-sm",
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        required: "",
                        autocomplete: "current-password",
                        autofocus: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).password]
                      ]),
                      createVNode("button", {
                        type: "button",
                        class: "btn-sm btn-outline-secondary py-0 border-0 rounded-end-2",
                        onClick: ($event) => unref(showPassword)("password", "password_icon")
                      }, [
                        createVNode("i", { class: "bi bi-eye" })
                      ], 8, ["onClick"])
                    ]),
                    createVNode(_sfc_main$1, {
                      id: "password_icon",
                      class: "mt-2",
                      message: unref(form).errors.password
                    }, null, 8, ["message"])
                  ])
                ]),
                createVNode("div", { class: "mt-4 d-flex" }, [
                  createVNode("button", {
                    class: ["btn btn-sm btn-primary w-100", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, " Confirm ", 10, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ConfirmPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
