import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "ModalConfirmation",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const form_confirmation = useForm({});
    const confirmation_modal = ref(null);
    function showModal(route, message) {
      document.getElementById("confirmation_message").innerHTML = message;
      const element = document.getElementById("confirmationModal");
      confirmation_modal.value = bootstrap.Modal.getOrCreateInstance(element);
      confirmation_modal.value.show();
      const form = document.getElementById("confirmationForm");
      form.onsubmit = function() {
        event.preventDefault();
        handleSubmitConfirmation(route);
      };
    }
    function handleSubmitConfirmation(route) {
      form_confirmation.post(route, {
        onSuccess: () => hideModal(),
        onError: (e) => {
          console.error("submission error: " + e);
        }
      });
    }
    const hideModal = () => {
      confirmation_modal.value.hide();
    };
    __expose({ showModal });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: { "z-index": "1500" },
        class: "modal fade",
        id: "confirmationModal",
        tabindex: "-1",
        "aria-labelledby": "confirmationModal"
      }, _attrs))}><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-question-circle border-secondary border-end me-2 pe-2"></i> ${ssrInterpolate("Confirm Action")}</span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal" aria-label="Close" id="close_button_confirmation_modal"><i class="bi bi-x-lg"></i></button></div><form id="confirmationForm"><div class="modal-body bg-light"><div class="row justify-content-center"><div class="col-12"><p class="mb-0" id="confirmation_message"></p></div></div></div><div class="modal-footer p-1"><button type="submit" data-bs-dismiss="modal" aria-label="Close" class="btn btn-sm btn-primary">${ssrInterpolate("Confirm")}</button></div></form></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ModalConfirmation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
