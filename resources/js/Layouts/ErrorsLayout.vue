<script setup>
import { Head, useForm, usePage } from "@inertiajs/vue3";
</script>

<template>
    <body
        style="
            min-height: 100vh;
            width: 100%;
            margin: 0;
            background: url('/storage/local/images/apps/error_background.png');
            background-size: cover;
        "
    >
        <div class="d-flex w-100 h-100">
            <div class="container" style="height: 100vh">
                <div class="row align-item-center h-100">
                    <!-- Content Error -->
                    <div class="col-12 col-lg-7 order-2 order-lg-1">
                        <div class="d-flex h-100">
                            <div
                                class="card rounded-2 bg-light my-lg-auto mb-auto mt-0 shadow mx-3 p-3 w-100 border-secondary-subtle border"
                            >
                                <div
                                    class="d-flex border-bottom border-primary pb-3"
                                >
                                    <span class="h1 text-primary my-auto">
                                        {{ "Oops!" }}
                                    </span>
                                    <span
                                        class="text-primary-emphasis h1 ms-3 my-auto"
                                    >
                                        <slot name="status" />
                                        {{ ":" }}
                                        <slot name="title" />
                                    </span>
                                </div>
                                <slot name="caption" />

                                <div class="d-flex mt-3">
                                    <a
                                        :href="route('intro')"
                                        class="btn btn-sm btn-primary border-0 w-75"
                                    >
                                        {{ "Back to Home" }}
                                    </a>
                                    <a
                                        target="_blank"
                                        href="https://docs.google.com/forms/d/e/1FAIpQLScC1aottJgG3y1JCFt1UQwvaW2dSLO3DxHq3Ds3k5DL1VaSZA/viewform?usp=sharing"
                                        class="btn btn-sm btn-secondary border-0 w-25 ms-3"
                                    >
                                        {{ "Report" }}
                                    </a>
                                </div>
                                <slot />
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-5 order-1 order-lg-2">
                        <div class="d-flex h-100">
                            <slot name="image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>
