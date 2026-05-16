<template>
    <Head>
        <title>Struktur Organisasi - SEEO FT UNSOED</title>
        <meta name="description" content="Kenali pengurus dan struktur organisasi SEEO FT UNSOED Kabinet Arshaka Karsa. Temukan talenta-talenta muda berbakat di balik setiap departemen kami.">
        <meta name="keywords" content="organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, struktur seeo">
        <meta property="og:title" content="Struktur Organisasi SEEO - Kabinet Arshaka Karsa">
        <meta property="og:description" content="Profil pengurus dan struktur departemen SEEO FT UNSOED.">
    </Head>
    <PublicLayout>
        <!-- Modern Hero Section -->
        <section class="relative pt-24 pb-20 bg-white overflow-hidden">
            <div class="max-w-7xl mx-auto px-6 text-center relative z-10">
                <div class="inline-block px-4 py-1.5 bg-[#FFD700]/10 text-[#004182] font-black text-[10px] uppercase tracking-[0.3em] rounded-full mb-8 border border-[#FFD700]/20">
                    Kepengurusan SEEO 2026
                </div>
                <h1 class="text-5xl md:text-7xl font-black text-[#004182] mb-8 leading-tight tracking-tight uppercase">
                    KABINET<span class="text-[#FFD700]"> ARSHAKA KARSA</span><br>
                    
                </h1>
            </div>
            <!-- Background Decoration -->
            <div class="absolute top-0 right-0 w-1/2 h-full bg-[#f8f9fa] -skew-x-12 translate-x-1/2 -z-0"></div>
        </section>

        <!-- Main Structure -->
        <section class="py-24 bg-white relative z-10">
            <div class="max-w-7xl mx-auto px-6">
                <!-- Executive Leadership -->
                <div v-if="executives.length" class="mb-32">
                    <div class="text-center mb-16">
                        <h2 class="text-3xl md:text-4xl font-black text-[#004182] uppercase tracking-tight mb-4">Pengurus Harian</h2>
                        <div class="w-20 h-1.5 bg-[#FFD700] mx-auto"></div>
                    </div>

                    <div class="flex overflow-x-auto gap-6 pb-8 px-6 snap-x snap-mandatory scrollbar-hide -mx-6">
                        <div v-for="s in executives" :key="s.id" class="flex-shrink-0 w-[260px] md:w-[280px] snap-center">
                            <div class="group relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-50 transition-all hover:-translate-y-2 h-full">
                                <div class="aspect-[3/4] overflow-hidden">
                                    <img :src="s.image_url || (s.gender === 'f' ? '/images/assets/staff_f.png' : '/images/assets/staff_m.png')" :alt="s.name" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" />
                                </div>
                                <div class="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#004182] to-transparent text-white">
                                    <h3 class="text-lg font-black leading-tight mb-1">{{ s.name }}</h3>
                                    <p class="text-[10px] uppercase font-bold text-[#FFD700] tracking-widest">{{ s.role_title }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Departments by Group -->
                <div v-for="(members, deptName) in groupedDepartments" :key="deptName" class="mb-24">
                    <div class="text-center mb-12">
                        <h2 class="text-2xl md:text-3xl font-black text-[#004182] uppercase tracking-tight mb-4">{{ deptName }}</h2>
                        <div class="w-16 h-1 bg-[#FFD700] mx-auto"></div>
                    </div>

                    <div class="flex overflow-x-auto gap-4 md:gap-6 pb-6 px-6 snap-x snap-mandatory scrollbar-hide -mx-6">
                        <div v-for="s in members" :key="s.id" class="flex-shrink-0 w-[160px] md:w-[220px] snap-center">
                            <div class="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-50 transition-all hover:shadow-xl h-full">
                                <div class="aspect-[3/4] overflow-hidden">
                                    <img :src="s.image_url || (s.gender === 'f' ? '/images/assets/staff_f.png' : '/images/assets/staff_m.png')" :alt="s.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                </div>
                                <div class="p-4 text-left">
                                    <h4 class="text-sm font-black text-[#004182] line-clamp-1 mb-1">{{ s.name }}</h4>
                                    <p class="text-[9px] uppercase font-bold text-gray-400 tracking-widest">{{ s.role_title }}</p>
                                </div>
                                <div class="absolute top-2 right-2 w-6 h-6 bg-[#FFD700] rounded-full flex items-center justify-center shadow-md">
                                    <i class="bi bi-person text-xs text-[#004182]"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="!structures.length" class="text-center py-24">
                    <div class="mb-6 opacity-20">
                        <i class="bi bi-people text-9xl"></i>
                    </div>
                    <p class="text-gray-400 font-bold uppercase tracking-widest">Belum ada data kepengurusan</p>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <!-- <section class="py-32 bg-[#004182] relative overflow-hidden">
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-10 left-10 w-64 h-64 border-8 border-[#FFD700] rounded-full"></div>
                <div class="absolute bottom-10 right-10 w-96 h-96 border-[20px] border-[#FFD700] rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>
            <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 class="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">Siap Bergabung dengan SEEO?</h2>
                <p class="text-white/70 text-lg mb-12 font-medium">Jadilah bagian dari ekosistem wirausaha muda di lingkungan Fakultas Teknik UNSOED.</p>
                <Link href="/contact" class="inline-block bg-[#FFD700] text-[#004182] px-10 py-4 rounded-full font-black text-lg shadow-2xl hover:scale-105 transition-all">HUBUNGI KAMI</Link>
            </div>
        </section> -->
    </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
    structures: { type: Array, default: () => [] },
});

const executives = computed(() => props.structures.filter(s => s.is_executive));
const deptMembers = computed(() => props.structures.filter(s => !s.is_executive));

const groupedDepartments = computed(() => {
    const groups = {};
    deptMembers.value.forEach(m => {
        const dept = m.department_name || 'Lainnya';
        if (!groups[dept]) groups[dept] = [];
        groups[dept].push(m);
    });
    return groups;
});
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>