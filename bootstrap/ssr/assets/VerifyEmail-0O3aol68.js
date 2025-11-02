import { ref, computed, withCtx, unref, createVNode, createBlock, createCommentVNode, createTextVNode, toDisplayString, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { A as AuthenticationLayout } from "./AuthenticationLayout-DQrsiqrM.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CQDhtLdH.js";
import { useForm, usePage, Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
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
    const submit = () => {
      console.log(route("verification.send"));
      form.post(route("verification.send"));
    };
    const verificationLinkSent = computed(
      () => props.status === "verification-link-sent"
    );
    function confirmation(route2, message) {
      if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route2, message);
      } else {
        console.error("modalConfirmationRef is null");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AuthenticationLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: "Email Verification",
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4" style="${ssrRenderStyle({ "text-align": "justify" })}"${_scopeId}>${ssrInterpolate("Thanks for signing up! You are logged in. ")} ${ssrInterpolate("Before getting started, please confirm your email by ")} <b${_scopeId}>${ssrInterpolate("click the link")}</b> ${ssrInterpolate(" we have sent to ")} <b${_scopeId}>${ssrInterpolate(unref(auth_user).email + ".")}</b> ${ssrInterpolate(" If you didn't receive the email, we will gladly send you another.")}</div>`);
            if (verificationLinkSent.value) {
              _push2(`<div class="mb-4 text-sm font-medium text-green-600"${_scopeId}> A new verification link has been sent to the email address you provided during registration. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-4 d-flex"${_scopeId}><button class="btn btn-sm btn-outline-primary border-0 py-0"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}> Resend Verification Email </button><a method="post" as="button" class="btn btn-sm btn-secondary ms-auto"${_scopeId}>Log Out</a></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: "Email Verification",
                icon: "/storage/local/images/apps/logo.png"
              }),
              createVNode(_sfc_main$1, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
              }, null, 512),
              createVNode("div", {
                class: "mb-4",
                style: { "text-align": "justify" }
              }, [
                createTextVNode(toDisplayString("Thanks for signing up! You are logged in. ") + " " + toDisplayString("Before getting started, please confirm your email by ") + " "),
                createVNode("b", null, toDisplayString("click the link")),
                createTextVNode(" " + toDisplayString(" we have sent to ") + " "),
                createVNode("b", null, toDisplayString(unref(auth_user).email + "."), 1),
                createTextVNode(" " + toDisplayString(" If you didn't receive the email, we will gladly send you another."))
              ]),
              verificationLinkSent.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 text-sm font-medium text-green-600"
              }, " A new verification link has been sent to the email address you provided during registration. ")) : createCommentVNode("", true),
              createVNode("div", { class: "mt-4 d-flex" }, [
                createVNode("button", {
                  onClick: submit,
                  class: "btn btn-sm btn-outline-primary border-0 py-0",
                  disabled: unref(form).processing
                }, " Resend Verification Email ", 8, ["disabled"]),
                createVNode("a", {
                  onClick: ($event) => confirmation(
                    _ctx.route("logout"),
                    "Are you sure want to logout?"
                  ),
                  method: "post",
                  as: "button",
                  class: "btn btn-sm btn-secondary ms-auto"
                }, "Log Out", 8, ["onClick"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
