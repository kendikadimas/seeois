<template>
    <div
        class="modal fade"
        id="alertNotificationModal"
        tabindex="-1"
        aria-labelledby="alertNotificationModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i
                            class="bi bi-exclamation-triangle border-secondary"
                        ></i>
                        {{ "Alert Notification" }}
                    </span>
                    <button
                        type="button"
                        class="btn btn-sm ms-auto"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        id="close_button_confirmation_modal"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>

                <div class="modal-body bg-light">
                    <div class="row justify-content-center">
                        <div class="col-12">
                            <p class="mb-0">
                                {{ alert_message }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer p-1">
                    <button
                        type="button"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        class="btn btn-sm btn-primary"
                    >
                        {{ "Okay" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
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
            showModal,
        };
    },
};
</script>
