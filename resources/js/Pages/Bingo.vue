<script setup>
import GuestLayout from "@/Layouts/GuestLayout.vue";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import { computed } from "vue";
import { ref } from "vue";
const title = "Bingo";
const bingo_dimesnion = ref(1);
const bingo_array = ref([1]);
const receiptContentRef = ref(null);
const receiptPrintedImageUrl = ref(null);

function shuffleNumber() {
    bingo_array.value = getRandomizedNumbers(bingo_dimesnion.value ** 2);
}

function getRandomizedNumbers(n) {
    // Step 1: Create array [1, 2, ..., n]
    const array = Array.from({ length: n }, (_, i) => i + 1);

    // Step 2: Shuffle using Fisher-Yates algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

const printReceipt = async () => {
    const element = receiptContentRef.value;
    const canvas = await html2canvas(element, {
        scale: 2, // higher quality
    });
    receiptPrintedImageUrl.value = canvas.toDataURL("image/png", 0.8);
    const link = document.createElement("a");
    link.href = receiptPrintedImageUrl.value;
    link.download =
        "Bingo" +
        bingo_dimesnion.value +
        "_" +
        format(new Date(), "HHmm") +
        ".png";
    link.click();
};
</script>
<template>
    <GuestLayout>
        <!-- Page Layout -->
        <div class="container">
            <div class="row mt-5">
                <div class="col-12">
                    <div class="d-flex w-100">
                        <span class="mx-auto h1 text-primary-emphasis">{{
                            "Bingo"
                        }}</span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-auto">
                    <span class="text-secondary">
                        {{ "Dimension : " }}
                    </span>
                    <input
                        type="number"
                        v-model="bingo_dimesnion"
                        class="form-control form-control-sm"
                    />
                </div>
                <div class="col">
                    <div class="d-flex">
                        <div class="card p-3">
                            <div class="d-flex">
                                <button
                                    @click="shuffleNumber"
                                    class="btn btn-sm btn-outline-primary border-secondary-subtle"
                                >
                                    <i class="bi bi-play-fill fs-6"></i>
                                </button>
                                <button
                                    @click="printReceipt"
                                    class="btn btn-sm btn-outline-primary border-secondary-subtle ms-2"
                                >
                                    <i class="bi bi-download fs-6"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <div class="w-100 d-flex">
                        <div class="card p-3" ref="receiptContentRef">
                            <div class="d-flex mb-3">
                                <span
                                    class="h4 text-primary-emphasis my-auto me-3"
                                >
                                    {{ "BINGO" }}
                                </span>
                                <span class="text-primary fs-4 ms-auto">{{
                                    bingo_dimesnion
                                }}</span>
                                <i class="bi bi-x mx-2 fs-4"></i>
                                <span class="text-primary fs-4">{{
                                    bingo_dimesnion
                                }}</span>
                            </div>
                            <div
                                class="w-100 d-flex"
                                v-for="row in bingo_dimesnion"
                            >
                                <div
                                    class="border d-flex"
                                    v-for="col in bingo_dimesnion"
                                    style="width: 40px; height: 40px"
                                >
                                    <span class="m-auto">
                                        {{
                                            bingo_array[
                                                (row - 1) * bingo_dimesnion +
                                                    col -
                                                    1
                                            ]
                                        }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </GuestLayout>
</template>
