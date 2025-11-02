<template>
    <Head title="Events" />
    <PublicLayout>
        <section class="bg-slate-100 py-20 lg:py-24">
            <div class="container mx-auto px-6 text-center">
                <h1 class="text-4xl lg:text-5xl font-extrabold text-slate-900">Events & Programs</h1>
                <p class="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">Temukan berbagai seminar, workshop, dan kompetisi yang kami selenggarakan untuk mengasah jiwa wirausaha Anda.</p>
            </div>
        </section>

        <section class="py-20 lg:py-24">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-for="event in events" :key="event.id" class="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
                        <div class="p-6">
                            <span class="inline-block bg-blue-100 text-primary text-sm font-semibold px-3 py-1 rounded-full mb-3">{{ event.category }}</span>
                            <h2 class="text-xl font-bold text-slate-900 mb-3 h-14 group-hover:text-primary transition-colors">
                                {{ event.name }}
                            </h2>
                            <p class="text-slate-500 text-base">
                                {{ event.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { Head } from '@inertiajs/vue3';

// Hapus defineProps dan ganti dengan data statis ini
const events = [
    { id: 1, name: 'EntClass I', category: 'Human Resource', description: 'Program pelatihan wirausaha intensif, fokus pada pengembangan keterampilan bisnis vital.' },
    { id: 2, name: 'Visitasi I ke KOPMA UIN SAIZU', category: 'Public Relation', description: 'Kegiatan studi banding untuk meningkatkan wawasan anggota mengenai praktik kewirausahaan.' },
    { id: 3, name: 'Upgrading I', category: 'Human Resource', description: 'Kegiatan bonding anggota yang dirancang untuk memperkuat hubungan tim dan kolaborasi.' },
    { id: 4, name: 'Rapat Pleno I', category: 'CEO-CoCEO', description: 'Rapat pleno untuk membahas perkembangan dan evaluasi seluruh program kerja organisasi.' },
    { id: 5, name: 'Internship SEEO', category: 'Human Resource', description: 'Program magang bagi mahasiswa untuk mendapatkan pengalaman kerja langsung di dalam SEEO.' },
    { id: 6, name: 'Blaterian Stand', category: 'Production', description: 'Pembukaan stand penjualan produk Blaterian di berbagai acara kampus dan sekitarnya.' }
];
</script>