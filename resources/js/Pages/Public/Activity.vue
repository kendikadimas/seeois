<template>
    <Head>
        <title>Blog & Berita - SEEO UNSOED</title>
        <meta name="description" content="Kumpulan berita, kegiatan, dan artikel terbaru seputar dunia kewirausahaan dan teknologi dari SEEO FT UNSOED. Tetap update dengan inovasi mahasiswa teknik.">
        <meta name="keywords" content="organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, berita seeo">
        <meta property="og:title" content="SEEO Blog - Berita & Kegiatan Terbaru">
        <meta property="og:description" content="Update terbaru kegiatan dan inovasi dari SEEO FT UNSOED.">
    </Head>
    <PublicLayout>
        <!-- Modern Hero Section -->
        <section class="pt-28 pb-10 bg-white">
            <div class="max-w-7xl mx-auto px-6">
                <!-- <div class="inline-block px-4 py-1.5 bg-[#FFD700]/10 text-[#004182] font-black text-[10px] uppercase tracking-[0.3em] rounded-full mb-8 border border-[#FFD700]/20">
                    Latest Updates
                </div> -->
                <h1 class="text-6xl md:text-8xl font-black text-[#004182] mb-10 tracking-tight uppercase">
                    SEEO <span class="text-[#FFD700]">Blog</span>
                </h1>
                
                <!-- Category Filter -->
                <div class="flex flex-wrap gap-4 border-b border-gray-100 pb-6">
                    <button 
                        @click="selectedCategory = 'SEMUA'"
                        :class="selectedCategory === 'SEMUA' ? 'bg-[#004182] text-white shadow-xl' : 'bg-gray-50 text-gray-400 hover:bg-[#FFD700]/10 hover:text-[#004182] border-transparent hover:border-[#FFD700]/20'"
                        class="px-8 py-3 rounded-full font-bold text-sm transition-all border"
                    >SEMUA</button>
                    
                    <button 
                        v-for="cat in categories" 
                        :key="cat"
                        @click="selectedCategory = cat"
                        :class="selectedCategory === cat ? 'bg-[#004182] text-white shadow-xl' : 'bg-gray-50 text-gray-400 hover:bg-[#FFD700]/10 hover:text-[#004182] border-transparent hover:border-[#FFD700]/20'"
                        class="px-8 py-3 rounded-full font-bold text-sm transition-all border uppercase"
                    >{{ cat }}</button>
                </div>
            </div>
        </section>

        <!-- Blog Grid -->
        <section class="pb-20 bg-white">
            <div class="max-w-7xl mx-auto px-6">
                <div v-if="filteredActivities && filteredActivities.length" class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-10">
                    <div v-for="act in filteredActivities" :key="act.id" class="group flex flex-col transition-all duration-500 overflow-hidden relative">
                        <!-- Image Container -->
                        <div class="relative aspect-[16/10] md:aspect-[16/10] overflow-hidden rounded-xl md:rounded-[2.5rem] mb-3 md:mb-0">
                            <img :src="act.image_url || '/images/placeholder.jpg'" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                            <div class="absolute inset-0 bg-gradient-to-t from-[#004182]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <!-- Desktop Category Tag -->
                            <div class="hidden md:block absolute top-6 left-6 z-10">
                                <span class="px-5 py-2 bg-[#FFD700] text-[#004182] rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                                    {{ act.category || 'NEWS' }}
                                </span>
                            </div>
                        </div>
                        
                        <!-- Content Area -->
                        <div class="md:p-8 lg:p-10 flex flex-col flex-1">
                            <!-- Mobile Category -->
                            <div class="md:hidden text-[#f97316] font-bold text-[11px] mb-1">
                                {{ act.category || 'SEEO News' }}
                            </div>

                            <!-- Metadata (Hidden on Mobile) -->
                            <div class="hidden md:flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
                                <div class="flex items-center gap-2">
                                    <i class="bi bi-calendar3 text-[#FFD700]"></i> 
                                    <span>{{ formatDate(act.date) }}</span>
                                </div>
                                <span class="w-1 h-1 rounded-full bg-gray-200"></span>
                                <div class="flex items-center gap-2">
                                    <i class="bi bi-person text-[#FFD700]"></i>
                                    <span>ADMIN</span>
                                </div>
                            </div>

                            <!-- Title -->
                            <h3 class="text-[14px] md:text-2xl font-bold md:font-black text-gray-900 md:text-[#004182] mb-2 md:mb-4 leading-snug md:leading-tight group-hover:text-[#f97316] md:group-hover:text-[#FFD700] transition-colors line-clamp-3 md:uppercase tracking-tight">
                                <Link :href="`/activity/${act.slug}`" class="after:absolute after:inset-0 after:z-20">{{ act.title }}</Link>
                            </h3>

                            <!-- Excerpt (Hidden on Mobile) -->
                            <div class="hidden md:block text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium opacity-80" v-html="act.description"></div>
                            
                            <!-- Action (Hidden on Mobile) -->
                            <div class="mt-auto hidden md:block">
                                <div class="inline-flex items-center gap-3 font-black text-[11px] text-[#004182] uppercase tracking-[0.2em] group/btn transition-all">
                                    <span class="relative">
                                        Read Article
                                        <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover/btn:w-full"></span>
                                    </span>
                                    <i class="bi bi-arrow-right text-[#FFD700] group-hover/btn:translate-x-2 transition-transform"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-40 bg-gray-50/50 rounded-[4rem] border-2 border-dashed border-gray-100">
                    <div class="mb-8 opacity-20">
                        <i class="bi bi-journal-x text-9xl text-[#004182]"></i>
                    </div>
                    <h3 class="text-2xl font-black text-[#004182] uppercase tracking-widest">Belum Ada Artikel</h3>
                    <p class="text-gray-400 font-medium mt-2">Nantikan update terbaru dari kami segera!</p>
                </div>
            </div>
        </section>

        <!-- Newsletter Section -->
        <!-- <section class="py-32 bg-[#f8f9fa]">
            <div class="max-w-4xl mx-auto px-6 text-center">
                <h2 class="text-4xl font-black text-[#004182] mb-8 uppercase tracking-tight leading-tight">Jangan Lewatkan <br> Informasi Penting</h2>
                <p class="text-gray-500 text-lg mb-12 font-medium">Berlangganan newsletter kami untuk mendapatkan update kegiatan dan berita terbaru SEEO langsung di inbox Anda.</p>
                <div class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                    <div class="flex-1 relative">
                        <i class="bi bi-envelope absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input type="email" placeholder="Alamat Email Anda" class="w-full pl-14 pr-8 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-[#004182] font-medium shadow-inner transition-all">
                    </div>
                    <button class="bg-[#004182] text-white px-10 py-4 rounded-full font-black shadow-2xl hover:bg-[#FFD700] hover:text-[#004182] transition-all uppercase tracking-widest text-xs">JOIN NOW</button>
                </div>
            </div>
        </section> -->
    </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

const props = defineProps({
    activities: { type: Array, default: () => [] },
    categories: { type: Array, default: () => [] }
});

const selectedCategory = ref('SEMUA');

const filteredActivities = computed(() => {
    if (selectedCategory.value === 'SEMUA') return props.activities;
    return props.activities.filter(act => act.category === selectedCategory.value);
});

function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}
</script>