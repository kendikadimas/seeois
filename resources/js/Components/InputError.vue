<script setup>
import { ref, computed } from "vue";

defineProps({
    message: {
        type: [String, Array],
    },
});
</script>

<template>
    <div v-show="message">
        <p
            v-if="Array.isArray(message)"
            v-for="error in message"
            class="text-danger mb-1"
            style="font-size: smaller"
        >
            {{ error }}
        </p>
        <p
            v-if="!Array.isArray(message)"
            class="text-danger mb-1"
            style="font-size: smaller"
        >
            {{ message }}
        </p>
    </div>
</template>