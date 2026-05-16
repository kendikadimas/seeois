<template>
    <Head title="Events" />
    <PublicLayout>
        <section class="relative bg-slate-900 min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden border-b border-slate-800">
            <!-- Background Decoration -->
            <div class="absolute inset-0 z-0">
                <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
                <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>
            </div>

            <div class="container mx-auto px-6 relative z-10 text-center">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20">
                    Programs & Calendars
                </div>
                <h1 class="text-5xl lg:text-7xl font-black text-white tracking-tight leading-tight mb-8">
                    Discover Our <br />
                    <span class="text-blue-500 italic">Signature</span> Events.
                </h1>
                <p class="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Temukan berbagai seminar, workshop, dan kompetisi yang kami selenggarakan untuk mengasah jiwa wirausaha Anda.
                </p>

                <div class="mt-10 flex justify-center">
                    <Link :href="route('seminar.registration.create')" class="inline-flex items-center px-5 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors">
                        Daftar Seminar Nasional
                    </Link>
                </div>

                <!-- Scroll Indicator -->
                <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                    <span class="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Scroll to Explore</span>
                    <div class="w-px h-12 bg-linear-to-b from-blue-500 to-transparent"></div>
                </div>
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
import { Head, Link } from '@inertiajs/vue3';

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