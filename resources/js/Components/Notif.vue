<script setup>
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";

const notif_message = ref("");
const notif_type = ref("");
const toast = useToast();
const toast_option = {
    position: "bottom-right",
    timeout: 5000,
    closeOnClick: false,
    pauseOnFocusLoss: false,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: true,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
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

defineExpose({ showToast });
</script>

<template>
    <div></div>
</template>
