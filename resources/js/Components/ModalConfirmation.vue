<script setup>
import { useForm } from "@inertiajs/vue3";
import { ref } from "vue";

const form_confirmation = useForm({});

// Define var
const confirmation_modal = ref(null);

// Define function
function showModal(route, message) {
    document.getElementById("confirmation_message").innerHTML = message; // this is outside Vue reactivity scope. Because the bootstrap render the modal
    const element = document.getElementById("confirmationModal");
    confirmation_modal.value = bootstrap.Modal.getOrCreateInstance(element);
    confirmation_modal.value.show();

    const form = document.getElementById("confirmationForm");
    form.onsubmit = function () {
        event.preventDefault();
        handleSubmitConfirmation(route);
    };
}

function handleSubmitConfirmation(route) {
    form_confirmation.post(route, {
        onSuccess: () => hideModal(),
        onError: (e) => {
            console.error("submission error: " + e);
        },
    });
}

const hideModal = () => {
    confirmation_modal.value.hide();
};

defineExpose({ showModal });
</script>

<template>
    <div
        style="z-index: 1500"
        class="modal fade"
        id="confirmationModal"
        tabindex="-1"
        aria-labelledby="confirmationModal"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content shadow mx-3">
                <div class="modal-header py-1 ps-3 pe-2">
                    <span class="modal-title fs-5 text-primary-emphasis">
                        <i
                            class="bi bi-question-circle border-secondary border-end me-2 pe-2"
                        ></i>
                        {{ "Confirm Action" }}
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
                <form id="confirmationForm">
                    <div class="modal-body bg-light">
                        <div class="row justify-content-center">
                            <div class="col-12">
                                <p class="mb-0" id="confirmation_message"></p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer p-1">
                        <button
                            type="submit"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            class="btn btn-sm btn-primary"
                        >
                            {{ "Confirm" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
