<template>
    <Head title="Our Brand" />
    <PublicLayout>
        <section class="bg-slate-100 py-20 lg:py-24">
            <div class="container mx-auto px-6 text-center">
                <h1 class="text-4xl lg:text-5xl font-extrabold text-slate-900">Our Brands</h1>
                <p class="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">Setiap merek yang kami bangun adalah cerminan dari semangat, kerja keras, dan inovasi mahasiswa Fakultas Teknik.</p>
            </div>
        </section>

        <section class="py-20 lg:py-24 bg-white">
            <div class="container mx-auto px-6">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                                            </div>
                    <div>
                        <span class="inline-block bg-secondary/20 text-yellow-800 font-semibold px-3 py-1 rounded-full mb-4">Featured Brand</span>
                        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Blaterian</h2>
                        <p class="text-slate-500 leading-relaxed mb-4">
                            Blaterian adalah merek kuliner andalan SEEO yang berfokus pada penyediaan makanan dan minuman berkualitas tinggi untuk berbagai acara. Dikelola sepenuhnya oleh anggota kami, Blaterian menjadi laboratorium nyata untuk belajar manajemen bisnis kuliner.
                        </p>
                        <ul class="space-y-2 text-slate-600">
                            <li class="flex items-center"><i class="bi bi-check-circle-fill text-primary mr-2"></i>Produk Inovatif & Kekinian</li>
                            <li class="flex items-center"><i class="bi bi-check-circle-fill text-primary mr-2"></i>Manajemen Produksi Profesional</li>
                            <li class="flex items-center"><i class="bi bi-check-circle-fill text-primary mr-2"></i>Strategi Pemasaran Kreatif</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        
        </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>