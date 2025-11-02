import { computed, mergeProps, useSSRContext, withCtx, unref, createVNode, toDisplayString, withModifiers, withDirectives, vModelText, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
/* empty css             */
import { A as AuthenticationLayout } from "./AuthenticationLayout-DQrsiqrM.js";
import { _ as _sfc_main$2 } from "./InputError-DugfSnOg.js";
import { useForm, Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: {
      type: [Array, Boolean],
      required: true
    },
    value: {
      default: null
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        type: "checkbox",
        value: __props.value,
        checked: Array.isArray(proxyChecked.value) ? ssrLooseContain(proxyChecked.value, __props.value) : proxyChecked.value,
        class: "rounded"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, proxyChecked.value))))}>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  setup(__props) {
    const form_login = useForm({
      email: "",
      password: "",
      remember: false
    });
    const submit_login = () => {
      form_login.post(route("login"), {
        onSuccess: () => form_login.reset()
      });
    };
    const show_password = (input_id, icon_id) => {
      var password = document.getElementById(input_id);
      var password_icon = document.getElementById(icon_id);
      if (password.type === "password") {
        password.type = "text";
        password_icon.classList.remove("bi-eye-slash-fill");
        password_icon.classList.add("bi-eye-fill");
      } else {
        password.type = "password";
        password_icon.classList.remove("bi-eye-fill");
        password_icon.classList.add("bi-eye-slash-fill");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AuthenticationLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: "Login",
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(`<div class="row px-2"${_scopeId}><div class="col-12 border-primary border-bottom d-flex pb-1 mb-3 px-0"${_scopeId}><span class="h4 text-primary-emphasis my-auto me-auto"${_scopeId}>${ssrInterpolate("LOGIN")}</span><a class="fs-6"${ssrRenderAttr("href", _ctx.route("register"))}${_scopeId}><button class="btn btn-sm btn-outline-primary border-0 py-0"${_scopeId}>${ssrInterpolate("Register")}</button></a></div></div><form${_scopeId}><div class="row"${_scopeId}><div class="col-3 col-md-4"${_scopeId}><label for="email" class="form-label my-1"${_scopeId}>Email</label></div><div class="col-9 col-md-8"${_scopeId}><input type="email" class="form-control form-control-sm" id="email"${ssrRenderAttr("value", unref(form_login).email)} autocomplete="username" required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: unref(form_login).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="row mt-3"${_scopeId}><div class="col-3 col-md-4"${_scopeId}><label for="password" class="form-label my-1"${_scopeId}>Password</label></div><div class="col-9 col-md-8"${_scopeId}><div class="input-group input-group-sm"${_scopeId}><input type="password" class="form-control form-control-sm" id="password"${ssrRenderAttr("value", unref(form_login).password)} autocomplete="password" required${_scopeId}><button type="button" class="btn bg-light text-secondary"${_scopeId}><i class="bi bi-eye-slash-fill" id="password_icon"${_scopeId}></i></button></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: unref(form_login).errors.password
            }, null, _parent2, _scopeId));
            _push2(`<label for="remember_me" class="text-secondary mt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              id: "remember_me",
              type: "checkbox",
              name: "remember",
              checked: unref(form_login).remember,
              "onUpdate:checked": ($event) => unref(form_login).remember = $event,
              class: "rounded"
            }, null, _parent2, _scopeId));
            _push2(`<span class="ms-2 text-sm text-gray-600"${_scopeId}>${ssrInterpolate("Remember me")}</span></label></div></div><div class="row justify-content-center mt-4"${_scopeId}><div class="col-auto"${_scopeId}><div class="input-group input-group-sm shadow-sm"${_scopeId}><a class="link-secondary text-decoration-none btn btn-sm btn-light text-sm"${ssrRenderAttr("href", _ctx.route("password.request"))}${_scopeId}>${ssrInterpolate("Forget password?")}</a><button class="btn btn-sm btn-primary px-3"${_scopeId}>${ssrInterpolate("Login")} <i class="bi bi-box-arrow-in-right border-start border-1 ms-1 ps-1"${_scopeId}></i></button></div></div></div></form>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: "Login",
                icon: "/storage/local/images/apps/logo.png"
              }),
              createVNode("div", { class: "row px-2" }, [
                createVNode("div", { class: "col-12 border-primary border-bottom d-flex pb-1 mb-3 px-0" }, [
                  createVNode("span", { class: "h4 text-primary-emphasis my-auto me-auto" }, toDisplayString("LOGIN")),
                  createVNode("a", {
                    class: "fs-6",
                    href: _ctx.route("register")
                  }, [
                    createVNode("button", { class: "btn btn-sm btn-outline-primary border-0 py-0" }, toDisplayString("Register"))
                  ], 8, ["href"])
                ])
              ]),
              createVNode("form", {
                onSubmit: withModifiers(submit_login, ["prevent"])
              }, [
                createVNode("div", { class: "row" }, [
                  createVNode("div", { class: "col-3 col-md-4" }, [
                    createVNode("label", {
                      for: "email",
                      class: "form-label my-1"
                    }, "Email")
                  ]),
                  createVNode("div", { class: "col-9 col-md-8" }, [
                    withDirectives(createVNode("input", {
                      type: "email",
                      class: "form-control form-control-sm",
                      id: "email",
                      "onUpdate:modelValue": ($event) => unref(form_login).email = $event,
                      autocomplete: "username",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form_login).email]
                    ]),
                    createVNode(_sfc_main$2, {
                      message: unref(form_login).errors.email
                    }, null, 8, ["message"])
                  ])
                ]),
                createVNode("div", { class: "row mt-3" }, [
                  createVNode("div", { class: "col-3 col-md-4" }, [
                    createVNode("label", {
                      for: "password",
                      class: "form-label my-1"
                    }, "Password")
                  ]),
                  createVNode("div", { class: "col-9 col-md-8" }, [
                    createVNode("div", { class: "input-group input-group-sm" }, [
                      withDirectives(createVNode("input", {
                        type: "password",
                        class: "form-control form-control-sm",
                        id: "password",
                        "onUpdate:modelValue": ($event) => unref(form_login).password = $event,
                        autocomplete: "password",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form_login).password]
                      ]),
                      createVNode("button", {
                        type: "button",
                        class: "btn bg-light text-secondary",
                        onClick: ($event) => show_password("password", "password_icon")
                      }, [
                        createVNode("i", {
                          class: "bi bi-eye-slash-fill",
                          id: "password_icon"
                        })
                      ], 8, ["onClick"])
                    ]),
                    createVNode(_sfc_main$2, {
                      message: unref(form_login).errors.password
                    }, null, 8, ["message"]),
                    createVNode("label", {
                      for: "remember_me",
                      class: "text-secondary mt-2"
                    }, [
                      createVNode(_sfc_main$1, {
                        id: "remember_me",
                        type: "checkbox",
                        name: "remember",
                        checked: unref(form_login).remember,
                        "onUpdate:checked": ($event) => unref(form_login).remember = $event,
                        class: "rounded"
                      }, null, 8, ["checked", "onUpdate:checked"]),
                      createVNode("span", { class: "ms-2 text-sm text-gray-600" }, toDisplayString("Remember me"))
                    ])
                  ])
                ]),
                createVNode("div", { class: "row justify-content-center mt-4" }, [
                  createVNode("div", { class: "col-auto" }, [
                    createVNode("div", { class: "input-group input-group-sm shadow-sm" }, [
                      createVNode("a", {
                        class: "link-secondary text-decoration-none btn btn-sm btn-light text-sm",
                        href: _ctx.route("password.request")
                      }, toDisplayString("Forget password?"), 8, ["href"]),
                      createVNode("button", { class: "btn btn-sm btn-primary px-3" }, [
                        createTextVNode(toDisplayString("Login") + " "),
                        createVNode("i", { class: "bi bi-box-arrow-in-right border-start border-1 ms-1 ps-1" })
                      ])
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
