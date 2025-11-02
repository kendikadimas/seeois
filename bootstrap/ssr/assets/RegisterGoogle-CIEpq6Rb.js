import { ref, onMounted, watch, withCtx, unref, createVNode, toDisplayString, withDirectives, vModelText, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { A as AuthenticationLayout } from "./AuthenticationLayout-DQrsiqrM.js";
import { _ as _sfc_main$1 } from "./InputError-DugfSnOg.js";
import { _ as _sfc_main$2 } from "./Notif-DL0SggHu.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { s as showPassword } from "../app.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
import "axios";
import "date-fns";
import "bootstrap";
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
    usePage().props.auth.user;
    const title = ref("Complete Registration");
    const toastNotifRef = ref(null);
    const form_register_google = useForm({
      id_google: props.id,
      phone: null,
      password: null,
      password_confirmation: null
    });
    function handleSubmitRegister() {
      form_register_google.post(route("complete.register.google"));
    }
    onMounted(() => {
    });
    watch(
      () => props.notif,
      (newValue) => {
        const notification = newValue;
        toastNotifRef.value.showToast(notification.type, notification.message);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(AuthenticationLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: title.value,
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(`<div class="row px-2"${_scopeId}><div class="col-12 border-secondary border-bottom d-flex pb-1 mb-3 px-0"${_scopeId}><span class="h5 text-primary-emphasis my-auto me-auto"${_scopeId}>${ssrInterpolate("Complete Registration")}</span></div></div><p class="fw-normal text-dark bg-danger-subtle border text-center rounded border-danger pb-1 mb-1"${_scopeId}>${ssrInterpolate("Do not leave or refresh this page!")}</p><p class="fw-light text-secondary" style="${ssrRenderStyle({ "text-align": "justify" })}"${_scopeId}>${ssrInterpolate("You are registering new account using google. Please insert your phone and password information to complete the registration.")}</p><div class="row justify-content-center mt-2"${_scopeId}><div class="col-4 col-lg-3"${_scopeId}><label for="phone" class="form-label my-1"${_scopeId}>Phone</label></div><div class="col-8 col-lg-7"${_scopeId}><input type="tel" class="form-control" id="phone" autocomplete="username" autofocus required${ssrRenderAttr("value", unref(form_register_google).phone)}${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form_register_google).errors.phone,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="row justify-content-center mt-2"${_scopeId}><div class="col-4 col-lg-3"${_scopeId}><label for="password" class="form-label my-1"${_scopeId}>Password</label></div><div class="col-8 col-lg-7"${_scopeId}><div class="input-group input-group-sm"${_scopeId}><input type="password" class="form-control" id="password" autocomplete="username" required style="${ssrRenderStyle({ "width": "auto" })}"${ssrRenderAttr("value", unref(form_register_google).password)}${_scopeId}><button type="button" class="btn bg-light"${_scopeId}><i class="bi bi-eye-slash-fill" id="password_icon"${_scopeId}></i></button></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form_register_google).errors.password,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="row justify-content-center mt-2"${_scopeId}><div class="col-4 col-lg-3"${_scopeId}><label for="password_confirmation" class="form-label my-1"${_scopeId}>Confirm</label></div><div class="col-8 col-lg-7"${_scopeId}><div class="input-group input-group-sm"${_scopeId}><input type="password" class="form-control" id="password_confirmation" autocomplete="password_confirmation" required style="${ssrRenderStyle({ "width": "auto" })}"${ssrRenderAttr("value", unref(form_register_google).password_confirmation)}${_scopeId}><button type="button" class="btn bg-light"${_scopeId}><i class="bi bi-eye-slash-fill" id="password_confirmation_icon"${_scopeId}></i></button></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              message: unref(form_register_google).errors.password_confirmation,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-4"${_scopeId}><button class="btn btn-primary w-100"${_scopeId}>${ssrInterpolate("Register")}<i class="bi bi-person-fill-add border-start border-1 ms-3 ps-3"${_scopeId}></i></button></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: title.value,
                icon: "/storage/local/images/apps/logo.png"
              }, null, 8, ["title"]),
              createVNode("div", { class: "row px-2" }, [
                createVNode("div", { class: "col-12 border-secondary border-bottom d-flex pb-1 mb-3 px-0" }, [
                  createVNode("span", { class: "h5 text-primary-emphasis my-auto me-auto" }, toDisplayString("Complete Registration"))
                ])
              ]),
              createVNode("p", { class: "fw-normal text-dark bg-danger-subtle border text-center rounded border-danger pb-1 mb-1" }, toDisplayString("Do not leave or refresh this page!")),
              createVNode("p", {
                class: "fw-light text-secondary",
                style: { "text-align": "justify" }
              }, toDisplayString("You are registering new account using google. Please insert your phone and password information to complete the registration.")),
              createVNode("div", { class: "row justify-content-center mt-2" }, [
                createVNode("div", { class: "col-4 col-lg-3" }, [
                  createVNode("label", {
                    for: "phone",
                    class: "form-label my-1"
                  }, "Phone")
                ]),
                createVNode("div", { class: "col-8 col-lg-7" }, [
                  withDirectives(createVNode("input", {
                    type: "tel",
                    class: "form-control",
                    id: "phone",
                    autocomplete: "username",
                    autofocus: "",
                    required: "",
                    "onUpdate:modelValue": ($event) => unref(form_register_google).phone = $event
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form_register_google).phone]
                  ]),
                  createVNode(_sfc_main$1, {
                    message: unref(form_register_google).errors.phone,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])
              ]),
              createVNode("div", { class: "row justify-content-center mt-2" }, [
                createVNode("div", { class: "col-4 col-lg-3" }, [
                  createVNode("label", {
                    for: "password",
                    class: "form-label my-1"
                  }, "Password")
                ]),
                createVNode("div", { class: "col-8 col-lg-7" }, [
                  createVNode("div", { class: "input-group input-group-sm" }, [
                    withDirectives(createVNode("input", {
                      type: "password",
                      class: "form-control",
                      id: "password",
                      autocomplete: "username",
                      required: "",
                      style: { "width": "auto" },
                      "onUpdate:modelValue": ($event) => unref(form_register_google).password = $event
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form_register_google).password]
                    ]),
                    createVNode("button", {
                      type: "button",
                      class: "btn bg-light",
                      onClick: ($event) => unref(showPassword)("password", "password_icon")
                    }, [
                      createVNode("i", {
                        class: "bi bi-eye-slash-fill",
                        id: "password_icon"
                      })
                    ], 8, ["onClick"])
                  ]),
                  createVNode(_sfc_main$1, {
                    message: unref(form_register_google).errors.password,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])
              ]),
              createVNode("div", { class: "row justify-content-center mt-2" }, [
                createVNode("div", { class: "col-4 col-lg-3" }, [
                  createVNode("label", {
                    for: "password_confirmation",
                    class: "form-label my-1"
                  }, "Confirm")
                ]),
                createVNode("div", { class: "col-8 col-lg-7" }, [
                  createVNode("div", { class: "input-group input-group-sm" }, [
                    withDirectives(createVNode("input", {
                      type: "password",
                      class: "form-control",
                      id: "password_confirmation",
                      autocomplete: "password_confirmation",
                      required: "",
                      style: { "width": "auto" },
                      "onUpdate:modelValue": ($event) => unref(form_register_google).password_confirmation = $event
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form_register_google).password_confirmation]
                    ]),
                    createVNode("button", {
                      type: "button",
                      class: "btn bg-light",
                      onClick: ($event) => unref(showPassword)(
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
                    message: unref(form_register_google).errors.password_confirmation,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ])
              ]),
              createVNode("div", { class: "mt-4" }, [
                createVNode("button", {
                  onClick: handleSubmitRegister,
                  class: "btn btn-primary w-100"
                }, [
                  createTextVNode(toDisplayString("Register")),
                  createVNode("i", { class: "bi bi-person-fill-add border-start border-1 ms-3 ps-3" })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
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
export {
  _sfc_main as default
};
