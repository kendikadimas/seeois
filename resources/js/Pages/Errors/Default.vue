<script setup>
import ErrorsLayout from "@/Layouts/ErrorsLayout.vue";
import { Head, usePage } from "@inertiajs/vue3";
import { ref, watch, computed, onMounted, defineProps } from "vue";
const props = defineProps({
    status: Number,
    information: String,
});

const message = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    408: "Request Timeout",
    419: "Page Expired",
    429: "Too Many Request",
    500: "Internal Server Error",
    502: "Bad Gateway",
    504: "Gateway Timeout",
};

const caption = {
    404: "Page you are looking for is not found.",
    419: "The page is expired. Please reload again.",
};
const question = [404, 408, 419, 500, 502, 504];
const image = computed(() => {
    return question.find((status) => status == props.status)
        ? "question"
        : "exclamation";
});
</script>
<template>
    <Head :title="status" :icon="'/storage/local/images/apps/logo.png'" />
    <ErrorsLayout>
        <template #status> {{ status }} </template>
        <template #title> {{ message[status] }} </template>
        <template #caption>
            <div class="d-flex mt-3" v-if="caption[status]">
                <span class="text-secondary" style="text-align: justify">
                    {{ caption[status] }}
                </span>
            </div>
            <div class="d-flex mt-3" v-if="information">
                <span class="text-secondary" style="text-align: justify">
                    {{ information }}
                </span>
            </div>
        </template>
        <template #image>
            <img
                :src="
                    '/storage/local/images/apps/error_' + image + '_image.png'
                "
                class="img-fluid my-lg-auto mt-auto mb-0"
                alt="image"
            />
        </template>
    </ErrorsLayout>
</template>
