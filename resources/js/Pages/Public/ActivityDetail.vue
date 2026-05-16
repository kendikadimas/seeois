<template>
    <Head>
        <title>{{ activity.title }} - SEEO FT UNSOED</title>
        <meta name="description" :content="activity.description.substring(0, 160).replace(/<[^>]*>?/gm, '')">
        <meta name="keywords" :content="'organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, ' + activity.category">
        <meta property="og:title" :content="activity.title">
        <meta property="og:description" :content="activity.description.substring(0, 160).replace(/<[^>]*>?/gm, '')">
        <meta property="og:image" :content="activity.image_url">
    </Head>
    <PublicLayout>
        <!-- Article Header -->
        <header class="pt-32 pb-16 bg-white">
            <div class="max-w-4xl mx-auto px-6">
                <!-- Breadcrumbs -->
                <nav class="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-12">
                    <Link href="/" class="hover:text-[#004182] transition-colors">HOME</Link>
                    <i class="bi bi-chevron-right text-[8px]"></i>
                    <Link href="/activity" class="hover:text-[#004182] transition-colors">BLOG</Link>
                    <i class="bi bi-chevron-right text-[8px]"></i>
                    <span class="text-[#FFD700] truncate max-w-[200px]">{{ activity.title }}</span>
                </nav>

                <div class="inline-block px-5 py-2 bg-[#FFD700] text-[#004182] rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg mb-8">
                    {{ activity.category || 'NEWS' }}
                </div>
                
                <h1 class="text-4xl md:text-6xl font-black text-[#004182] mb-8 leading-tight tracking-tight uppercase">
                    {{ activity.title }}
                </h1>

                <div class="flex items-center gap-6 border-y border-gray-100 py-6">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-[#004182] rounded-full flex items-center justify-center text-[#FFD700]">
                            <i class="bi bi-person-fill text-xl"></i>
                        </div>
                        <div>
                            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">PUBLISHED BY</p>
                            <p class="text-sm font-black text-[#004182]">ADMIN SEEO</p>
                        </div>
                    </div>
                    <div class="h-10 w-px bg-gray-100"></div>
                    <div>
                        <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">DATE</p>
                        <p class="text-sm font-black text-[#004182] uppercase">{{ formatDate(activity.date) }}</p>
                    </div>
                </div>
            </div>
        </header>

        <!-- Featured Image -->
        <section v-if="activity.image_url" class="bg-white">
            <div class="max-w-4xl mx-auto px-6">
                <div class="relative aspect-[16/7] md:h-[400px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,65,130,0.15)] border border-gray-50">
                    <img :src="activity.image_url" :alt="activity.title" class="w-full h-full object-cover">
                </div>
            </div>
        </section>

        <!-- Article Content -->
        <article class="py-24 bg-white">
            <div class="max-w-4xl mx-auto px-6">
                <div class="prose prose-xl prose-slate max-w-none break-words
                    prose-headings:text-[#004182] prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                    prose-p:text-gray-600 prose-p:leading-[2] prose-p:font-medium
                    prose-strong:text-[#004182] prose-strong:font-black
                    prose-a:text-[#FFD700] prose-a:font-black prose-a:no-underline hover:prose-a:text-[#004182]
                    prose-img:rounded-[2rem] prose-img:shadow-2xl" 
                    v-html="activity.description">
                </div>

                <!-- Gallery Grid -->
                <div v-if="activity.gallery_urls && activity.gallery_urls.length" class="mt-32">
                    <div class="text-center mb-16">
                        <h2 class="text-3xl font-black text-[#004182] uppercase tracking-tight mb-4">Galeri Dokumentasi</h2>
                        <div class="w-20 h-1.5 bg-[#FFD700] mx-auto"></div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div v-for="(img, idx) in activity.gallery_urls" :key="idx" class="group relative aspect-square rounded-[2rem] overflow-hidden shadow-xl border border-gray-50 cursor-pointer" @click="openImage(img)">
                            <img :src="img" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                            <div class="absolute inset-0 bg-[#004182]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <i class="bi bi-zoom-in text-white text-4xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Share Section -->
                <div class="mt-32 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div class="flex items-center gap-4">
                        <span class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">SHARE THIS</span>
                        <div class="flex gap-3">
                            <button class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#004182] hover:bg-[#004182] hover:text-white transition-all"><i class="bi bi-facebook"></i></button>
                            <button class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#004182] hover:bg-[#004182] hover:text-white transition-all"><i class="bi bi-twitter-x"></i></button>
                            <button class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#004182] hover:bg-[#004182] hover:text-white transition-all"><i class="bi bi-whatsapp"></i></button>
                            <button class="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#004182] hover:bg-[#004182] hover:text-white transition-all"><i class="bi bi-link-45deg"></i></button>
                        </div>
                    </div>
                    <Link href="/activity" class="inline-flex items-center gap-3 font-black text-[11px] text-[#004182] border-b-2 border-[#FFD700] pb-1 hover:gap-6 transition-all uppercase tracking-widest">
                        KEMBALI KE BLOG <i class="bi bi-arrow-left order-first"></i>
                    </Link>
                </div>
            </div>
        </article>

        <!-- Related Posts (Optional/Future) -->
        <section class="py-32 bg-[#f8f9fa]">
            <div class="max-w-7xl mx-auto px-6 text-center">
                <h2 class="text-3xl font-black text-[#004182] uppercase tracking-tight mb-4">Ingin Berkolaborasi?</h2>
                <p class="text-gray-500 font-medium mb-10">Hubungi kami untuk informasi kemitraan atau peliputan kegiatan.</p>
                <Link href="/contact" class="bg-[#004182] text-white px-12 py-4 rounded-full font-black shadow-2xl hover:bg-[#FFD700] hover:text-[#004182] transition-all uppercase tracking-widest text-xs">CONTACT US</Link>
            </div>
        </section>
    </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { Head, Link } from '@inertiajs/vue3';

const props = defineProps({
    activity: { type: Object, required: true }
});

function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function openImage(url) {
    window.open(url, '_blank');
}
</script>

<style scoped>
:deep(.prose) {
    max-width: 100%;
}
</style>
