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
        notif_parse() {
            this.notif_type = this.is_error ? "warning" : this.notif["type"];
            this.notif_message = this.is_error
                ? this.errors.join(". ")
                : this.notif["message"];
            this.currentTime = new Date();
            hours = String(this.currentTime.getHours()).padStart(2, "0");
            minutes = String(this.currentTime.getMinutes()).padStart(2, "0");
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
        if (this.errors) {
            this.is_error = true;
        } else {
            this.is_error = false;
        }
        this.notif_parse();
    },
};
</script>
