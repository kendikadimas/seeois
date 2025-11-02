import { mergeProps, ref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  setup() {
    const alert_message = ref("");
    const alert_modal = ref(null);
    const showModal = (message) => {
      alert_message.value = message;
      const modal = new bootstrap.Modal(
        document.getElementById("alertNotificationModal")
      );
      alert_modal.value = modal;
      modal.show();
    };
    return {
      alert_message,
      showModal
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "modal fade",
    id: "alertNotificationModal",
    tabindex: "-1",
    "aria-labelledby": "alertNotificationModal"
  }, _attrs))}><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-exclamation-triangle border-secondary"></i> ${ssrInterpolate("Alert Notification")}</span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal" aria-label="Close" id="close_button_confirmation_modal"><i class="bi bi-x-lg"></i></button></div><div class="modal-body bg-light"><div class="row justify-content-center"><div class="col-12"><p class="mb-0">${ssrInterpolate($setup.alert_message)}</p></div></div></div><div class="modal-footer p-1"><button type="button" data-bs-dismiss="modal" aria-label="Close" class="btn btn-sm btn-primary">${ssrInterpolate("Okay")}</button></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ModalAlertNotification.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ModalAlertNotification = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  ModalAlertNotification as M
};
