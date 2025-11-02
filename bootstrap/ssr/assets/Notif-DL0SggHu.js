import { ssrRenderAttrs } from "vue/server-renderer";
import { ref, useSSRContext } from "vue";
import { useToast } from "vue-toastification";
const _sfc_main = {
  __name: "Notif",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    ref("");
    ref("");
    const toast = useToast();
    const toast_option = {
      position: "bottom-right",
      timeout: 5e3,
      closeOnClick: false,
      pauseOnFocusLoss: false,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: true,
      hideProgressBar: false,
      closeButton: "button",
      icon: true,
      rtl: false
    };
    function showToast(type, message) {
      if (Array.isArray(message)) {
        message.forEach((m) => {
          showMessage(type, m);
        });
      } else {
        showMessage(type, message);
      }
    }
    function showMessage(type, message) {
      if (type == "warning") {
        toast.warning(message, toast_option);
      } else if (type == "danger") {
        toast.error(message, toast_option);
      } else {
        toast.info(message, toast_option);
      }
    }
    __expose({ showToast });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Notif.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
