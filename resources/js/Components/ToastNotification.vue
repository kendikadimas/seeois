<template>
    <div class="toast-container top-15 start-50 translate-middle-x p-3">
        <div
            :class="'toast bg-light border-' + notif_type"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-bs-autohide="true"
            id="toast_notification"
        >
            <div
                :class="
                    'toast-header bg-' +
                    notif_type +
                    '-subtle border-' +
                    notif_type
                "
            >
                <span class="fw-bold text-dark me-auto">
                    <i :class="'bi bi-app text-' + notif_type + 'me-2'"></i>
                    {{ notif_title }}
                </span>
                <small class="text-body-secondary d-none d-lg-block">
                    {{ notif_time }}
                </small>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                ></button>
            </div>
            <div class="toast-body">
                {{ notif_message }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        notif: Array,
        errors: Array,
    },
    data() {
        return {
            notif_type: String,
            notif_message: String,
            notif_time: String,
            notif_title: String,
            is_error: Boolean,
            currentTime: new Date(),
        };
    },
    methods: {
        showToast(type, message) {
            this.notif_type = type;
            this.notif_message = message;
            this.notif_title =
                type.charAt(0).toUpperCase() + type.slice(1) + ".";
            this.currentTime = new Date();
            const hours = String(this.currentTime.getHours()).padStart(2, "0");
            const minutes = String(this.currentTime.getMinutes()).padStart(
                2,
                "0"
            );
            this.notif_time = hours + ":" + minutes;

            const toastEl = document.getElementById("toast_notification");
            if (toastEl) {
                const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
                toast.show();
            }
        },
        notif_parse() {
            if (!this.notif && !this.errors) return;

            this.notif_type = this.is_error ? "warning" : (this.notif?.type || "info");
            this.notif_message = this.is_error
                ? (Array.isArray(this.errors) ? this.errors.join(". ") : this.errors)
                : (this.notif?.message || "");
                
            this.currentTime = new Date();
            const hours = String(this.currentTime.getHours()).padStart(2, "0");
            const minutes = String(this.currentTime.getMinutes()).padStart(2, "0");
            this.notif_time = hours + ":" + minutes;
            
            switch (this.notif_type) {
                case "warning":
                    this.notif_title = "Warning!";
                    break;
                case "danger":
                    this.notif_title = "Danger!";
                    break;
                default:
                    this.notif_title = "Information.";
                    break;
            }
        },
    },
    mounted() {
        if (this.errors && this.errors.length > 0) {
            this.is_error = true;
            this.notif_parse();
            this.showToast("warning", Array.isArray(this.errors) ? this.errors.join(". ") : this.errors);
        } else if (this.notif && this.notif.message) {
            this.is_error = false;
            this.notif_parse();
            this.showToast(this.notif.type, this.notif.message);
        }
    },
};
</script>
