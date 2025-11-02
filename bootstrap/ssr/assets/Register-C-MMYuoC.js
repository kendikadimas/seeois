import { withCtx, unref, createVNode, toDisplayString, withModifiers, withDirectives, vModelText, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { A as AuthenticationLayout } from "./AuthenticationLayout-DQrsiqrM.js";
import { _ as _sfc_main$1 } from "./InputError-DugfSnOg.js";
import { useForm, Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: ""
    });
    const submit_register = () => {
      form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation")
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
              title: "Register",
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(`<div class="row px-2"${_scopeId}><div class="col-12 border-primary border-bottom d-flex pb-1 mb-3 px-0"${_scopeId}><span class="h4 text-primary-emphasis my-auto me-auto"${_scopeId}>${ssrInterpolate("REGISTER")}</span><a class="fs-6"${ssrRenderAttr("href", _ctx.route("login"))}${_scopeId}><button class="btn btn-sm btn-outline-primary border-0 py-0"${_scopeId}>${ssrInterpolate("Login")}</button></a></div></div><form${_scopeId}><div class="row"${_scopeId}><div class="col-3 col-md-4"${_scopeId}><label for="name" class="form-label my-1"${_scopeId}>Name</label></div><div class="col-9 col-md-8"${_scopeId}><input type="text" class="form-control form-control-sm" id="name"${ssrRenderAttr("value", unref(form).name)} autocomplete="name" autofocus required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="row mt-3"${_scopeId}><div class="col-3 col-md-4"${_scopeId}><label for="email" class="form-label my-1"${_scopeId}>Email</label></div><div class="col-9 col-md-8"${_scopeId}><input type="email" class="form-control form-control-sm" id="email"${ssrRenderAttr("value", unref(form).email)} autocomplete="username" required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="row mt-3"${_scopeId}><div class="col-3 col-md-4"${_scopeId}><label for="phone" class="form-label my-1"${_scopeId}>Phone</label></div><div class="col-9 col-md-8"${_scopeId}><input type="tel" class="form-control form-control-sm" name="phone" id="phone"${ssrRenderAttr("value", unref(form).phone)} autocomplete="phone" required${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.phone
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="row mt-3"${_scopeId}><div class="col-3 col-md-4"${_scopeId}><label for="password" class="form-label my-1"${_scopeId}>Password</label></div><div class="col-9 col-md-8"${_scopeId}><div class="input-group input-group-sm"${_scopeId}><input id="password" type="password" class="form-control form-control-sm"${ssrRenderAttr("value", unref(form).password)} required autocomplete="new-password"${_scopeId}><button type="button" class="btn bg-light text-secondary"${_scopeId}><i class="bi bi-eye-slash-fill" id="password_icon"${_scopeId}></i></button></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="row mt-3"${_scopeId}><div class="col-3 col-md-4"${_scopeId}><label for="password_confirmation" class="form-label my-1"${_scopeId}>Confirm <span class="d-none d-md-inline"${_scopeId}>Password</span></label></div><div class="col-9 col-md-8"${_scopeId}><div class="input-group input-group-sm"${_scopeId}><input type="password" class="form-control form-control-sm" id="password_confirmation"${ssrRenderAttr("value", unref(form).password_confirmation)} required autocomplete="new-password"${_scopeId}><button type="button" class="btn bg-light text-secondary"${_scopeId}><i class="bi bi-eye-slash-fill" id="password_confirmation_icon"${_scopeId}></i></button></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="row justify-content-center mt-4"${_scopeId}><div class="col-auto"${_scopeId}><div class="input-group input-group-sm shadow-sm"${_scopeId}><a class="link-secondary text-decoration-none btn btn-sm btn-light text-sm"${ssrRenderAttr("href", _ctx.route("login"))}${_scopeId}> Already registered? </a><button class="btn btn-primary px-3"${_scopeId}> Register <i class="bi bi-person-fill-add border-start border-1 ms-1 ps-1"${_scopeId}></i></button></div></div></div></form>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: "Register",
                icon: "/storage/local/images/apps/logo.png"
              }),
              createVNode("div", { class: "row px-2" }, [
                createVNode("div", { class: "col-12 border-primary border-bottom d-flex pb-1 mb-3 px-0" }, [
                  createVNode("span", { class: "h4 text-primary-emphasis my-auto me-auto" }, toDisplayString("REGISTER")),
                  createVNode("a", {
                    class: "fs-6",
                    href: _ctx.route("login")
                  }, [
                    createVNode("button", { class: "btn btn-sm btn-outline-primary border-0 py-0" }, toDisplayString("Login"))
                  ], 8, ["href"])
                ])
              ]),
              createVNode("form", {
                onSubmit: withModifiers(submit_register, ["prevent"])
              }, [
                createVNode("div", { class: "row" }, [
                  createVNode("div", { class: "col-3 col-md-4" }, [
                    createVNode("label", {
                      for: "name",
                      class: "form-label my-1"
                    }, "Name")
                  ]),
                  createVNode("div", { class: "col-9 col-md-8" }, [
                    withDirectives(createVNode("input", {
                      type: "text",
                      class: "form-control form-control-sm",
                      id: "name",
                      "onUpdate:modelValue": ($event) => unref(form).name = $event,
                      autocomplete: "name",
                      autofocus: "",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).name]
                    ]),
                    createVNode(_sfc_main$1, {
                      message: unref(form).errors.name
                    }, null, 8, ["message"])
                  ])
                ]),
                createVNode("div", { class: "row mt-3" }, [
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
                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                      autocomplete: "username",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).email]
                    ]),
                    createVNode(_sfc_main$1, {
                      message: unref(form).errors.email
                    }, null, 8, ["message"])
                  ])
                ]),
                createVNode("div", { class: "row mt-3" }, [
                  createVNode("div", { class: "col-3 col-md-4" }, [
                    createVNode("label", {
                      for: "phone",
                      class: "form-label my-1"
                    }, "Phone")
                  ]),
                  createVNode("div", { class: "col-9 col-md-8" }, [
                    withDirectives(createVNode("input", {
                      type: "tel",
                      class: "form-control form-control-sm",
                      name: "phone",
                      id: "phone",
                      "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                      autocomplete: "phone",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).phone]
                    ]),
                    createVNode(_sfc_main$1, {
                      message: unref(form).errors.phone
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
                        id: "password",
                        type: "password",
                        class: "form-control form-control-sm",
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        required: "",
                        autocomplete: "new-password"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).password]
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
                    createVNode(_sfc_main$1, {
                      message: unref(form).errors.password
                    }, null, 8, ["message"])
                  ])
                ]),
                createVNode("div", { class: "row mt-3" }, [
                  createVNode("div", { class: "col-3 col-md-4" }, [
                    createVNode("label", {
                      for: "password_confirmation",
                      class: "form-label my-1"
                    }, [
                      createTextVNode("Confirm "),
                      createVNode("span", { class: "d-none d-md-inline" }, "Password")
                    ])
                  ]),
                  createVNode("div", { class: "col-9 col-md-8" }, [
                    createVNode("div", { class: "input-group input-group-sm" }, [
                      withDirectives(createVNode("input", {
                        type: "password",
                        class: "form-control form-control-sm",
                        id: "password_confirmation",
                        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                        required: "",
                        autocomplete: "new-password"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).password_confirmation]
                      ]),
                      createVNode("button", {
                        type: "button",
                        class: "btn bg-light text-secondary",
                        onClick: ($event) => show_password(
                          "password_confirmation",
                          "password_confirmation_icon"
                        )
                      }, [
                        createVNode("i", {
                          class: "bi bi-eye-slash-fill",
                          id: "password_confirmation_icon"
                        })
                      ], 8, ["onClick"])
                    ]),
                    createVNode(_sfc_main$1, {
                      message: unref(form).errors.password_confirmation
                    }, null, 8, ["message"])
                  ])
                ]),
                createVNode("div", { class: "row justify-content-center mt-4" }, [
                  createVNode("div", { class: "col-auto" }, [
                    createVNode("div", { class: "input-group input-group-sm shadow-sm" }, [
                      createVNode("a", {
                        class: "link-secondary text-decoration-none btn btn-sm btn-light text-sm",
                        href: _ctx.route("login")
                      }, " Already registered? ", 8, ["href"]),
                      createVNode("button", { class: "btn btn-primary px-3" }, [
                        createTextVNode(" Register "),
                        createVNode("i", { class: "bi bi-person-fill-add border-start border-1 ms-1 ps-1" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
