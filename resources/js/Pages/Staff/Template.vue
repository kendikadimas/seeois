<script setup>
import StaffLayout from "@/Layouts/StaffLayout.vue";
import InputError from "@/Components/InputError.vue";
import Notif from "@/Components/Notif.vue";
import ModalConfirmation from "@/Components/ModalConfirmation.vue";
import { Head, useForm, usePage } from "@inertiajs/vue3";
import {
    ref,
    computed,
    watch,
    onMounted,
    defineProps,
    defineExpose,
} from "vue";

const props = defineProps({
    employees: Array,
    filter: Array,
    roles: Array,
    level_list: Array,
    payroll_list: Array,
    departments: Array,
    notif: Object,
    errors: Object,
});

const auth_user = usePage().props.auth.user;
const title = ref("User Manager");
const modalConfirmationRef = ref(null);
const toastNotifRef = ref(null);
const placeholder = ref("placeholder");

function handleSubmitUpdateProfile() {
    formUpdateProfile.post(route("profile.update"), {
        onSuccess: () => {
            showUpdateProfileModal(false);
        },
        onError: (e) => {
            for (let key in e) {
                toastNotifRef.value.showToast("warning", e[key]);
            }
        },
    });
}

function confirmation(route, message) {
    if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route, message);
    } else {
        console.error("modalConfirmationRef is null");
    }
}

function showImage(event) {
    utils.showImage(event);
}
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
</script>

<template>
    <!-- Page Layout -->
    <StaffLayout>
        <Head :title="title" :icon="'/storage/local/images/apps/logo.png'" />
        <!-- Modal Box -->
        <ModalConfirmation ref="modalConfirmationRef" />
        <template #header>
            {{ title }}
        </template>

        <div class="container me-lg-0 mx-auto mb-5"></div>
    </StaffLayout>

    <!-- Notif Toast -->
    <Notif ref="toastNotifRef" />
</template>
