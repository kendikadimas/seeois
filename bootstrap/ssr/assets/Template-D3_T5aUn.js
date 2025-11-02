import { ref, onMounted, watch, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-4HC-0vm9.js";
import "./InputError-DkffFxkw.js";
import { _ as _sfc_main$2 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CQDhtLdH.js";
import { usePage, Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
const _sfc_main = {
  __name: "Template",
  __ssrInlineRender: true,
  props: {
    employees: Array,
    filter: Array,
    roles: Array,
    level_list: Array,
    payroll_list: Array,
    departments: Array,
    notif: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    usePage().props.auth.user;
    const title = ref("User Manager");
    const modalConfirmationRef = ref(null);
    const toastNotifRef = ref(null);
    ref("placeholder");
    onMounted(() => {
      if (props.notif) {
        toastNotifRef.value.showToast(props.notif.type, props.notif.message);
      }
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
      _push(ssrRenderComponent(StaffLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(title.value)}`);
          } else {
            return [
              createTextVNode(toDisplayString(title.value), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: title.value,
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="container me-lg-0 mx-auto mb-5"${_scopeId}></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: title.value,
                icon: "/storage/local/images/apps/logo.png"
              }, null, 8, ["title"]),
              createVNode(_sfc_main$1, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
              }, null, 512),
              createVNode("div", { class: "container me-lg-0 mx-auto mb-5" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Template.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
