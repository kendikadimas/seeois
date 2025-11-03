<template>
    <Head title="Soedirman Engineering Entrepreneurship Organization" />
    <PublicLayout>
        <!-- Hero Section - Clean Professional Design -->
        <header class="relative min-h-screen bg-white overflow-hidden">
            <div class="max-w-7xl mx-auto px-6 sm:px-8">
                <div class="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
                    <!-- Left Content -->
                    <div class="space-y-8">
                        <!-- Badge -->
                        <div class="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                            <span class="w-2 h-2 bg-yellow-600 rounded-full mr-3"></span>
                            Universitas Jenderal Soedirman
                        </div>
                        
                        <!-- Main Heading -->
                        <div>
                            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                                Soedirman Engineering
                                <span class="text-blue-600">Entrepreneurship</span>
                                Organization
                            </h1>
                            <p class="text-xl text-slate-600 leading-relaxed max-w-lg">
                                Set Up Your Mind To Be An Entrepreneur!
                            </p>
                        </div>
                        
                        <!-- CTA Buttons -->
                        <div class="flex flex-col sm:flex-row gap-4">
                            <Link href="/about" class="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                                Tentang SEEO
                                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </Link>
                            <a href="/shop/home" target="_blank" class="inline-flex items-center justify-center px-8 py-4 border-2 border-amber-500 text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors duration-200">
                                Kunjungi Blaterian
                                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="relative bg-slate-50 rounded-2xl overflow-hidden shadow-xl">
                            <img :src="$imageUrl('compro/seeo.jpg')" alt="SEEO Team" class="w-full h-96 lg:h-[500px] object-cover">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                        
                        <div class="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg border">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-blue-600">8</div>
                                <div class="text-sm text-slate-600">Departemen</div>
                            </div>
                        </div>
                        
                        <div class="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-amber-600">44</div>
                                <div class="text-sm text-slate-600">Pengurus Aktif</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- About Section - Clean & Simple -->
        <section class="py-20 lg:py-32 bg-slate-50">
            <div class="max-w-7xl mx-auto px-6">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-6">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Tentang SEEO
                    </div>
                    <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                        Mengenal Kami <span class="text-blue-600">Lebih Dekat</span>
                    </h2>
                    <p class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Unit Kegiatan Mahasiswa Fakultas Teknik UNSOED yang berkomitmen membangun ekosistem entrepreneurship
                    </p>
                </div>
                
                <!-- Content Grid -->
                <div class="grid lg:grid-cols-2 gap-16 items-center">
                    <!-- Left: Image -->
                    <div class="relative">
                        <div class="bg-white rounded-2xl p-8 shadow-lg">
                            <img :src="$imageUrl('compro/logo.png')" alt="SEEO Logo" class="w-full h-auto max-w-sm mx-auto"/>
                        </div>
                    </div>
                    
                    <!-- Right: Content -->
                    <div class="space-y-6">
                        <div>
                            <p class="text-lg text-slate-700 leading-relaxed mb-4">
                                Student Entrepreneur and Empowerment Organization (SEEO) adalah wadah bagi mahasiswa untuk 
                                <strong class="text-blue-600">belajar, berinovasi, dan bertumbuh</strong> dalam dunia wirausaha.
                            </p>
                            <p class="text-lg text-slate-700 leading-relaxed">
                                Kami fokus pada pengembangan dan pengelolaan bisnis, serta membina calon wirausahawan melalui 
                                brand unggulan kami, <strong class="text-amber-600">Blaterian</strong>.
                            </p>
                        </div>
                        
                        <!-- Features -->
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-white rounded-xl p-4 border">
                                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                </div>
                                <h3 class="font-semibold text-slate-900 mb-1">Inovasi</h3>
                                <p class="text-sm text-slate-600">Mengembangkan ide kreatif</p>
                            </div>
                            
                            <div class="bg-white rounded-xl p-4 border">
                                <div class="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                                    <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                </div>
                                <h3 class="font-semibold text-slate-900 mb-1">Kolaborasi</h3>
                                <p class="text-sm text-slate-600">Membangun kemitraan</p>
                            </div>
                        </div>
                        
                        <!-- Action buttons -->
                        <div class="flex flex-wrap gap-4 pt-4">
                            <Link href="/structure" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                                <span>Struktur Organisasi</span>
                                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </Link>
                            
                            <Link href="/activity" class="inline-flex items-center px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200">
                                <span>Lihat Kegiatan</span>
                                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Blaterian Section - Simple & Clean -->
        <section class="py-20 lg:py-32 bg-amber-50">
            <div class="max-w-7xl mx-auto px-6">
                <div class="grid lg:grid-cols-2 gap-16 items-center">
                    <!-- Left: Logo -->
                    <div class="order-2 lg:order-1">
                        <div class="bg-white rounded-2xl p-12 shadow-lg">
                            <img :src="$imageUrl('compro/blaterianlogo.png')" alt="Blaterian Logo" class="w-full h-auto max-w-sm mx-auto"/>
                        </div>
                        
                        <!-- Product categories -->
                        <div class="flex justify-center gap-4 mt-6">
                            <div class="bg-white rounded-lg px-4 py-2 shadow-sm border">
                                <span class="text-sm font-medium text-slate-700">🍽️ Blaterian Foods</span>
                            </div>
                            <div class="bg-white rounded-lg px-4 py-2 shadow-sm border">
                                <span class="text-sm font-medium text-slate-700">🛍️ Blaterian Goods</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right: Content -->
                    <div class="order-1 lg:order-2">
                        <!-- Badge -->
                        <div class="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-6">
                            <span class="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                            Brand Unggulan SEEO
                        </div>
                        
                        <!-- Heading -->
                        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                            Blaterian
                            <span class="block text-lg md:text-xl font-normal text-slate-600 mt-2">Karya Terbaik Kami</span>
                        </h2>
                        
                        <!-- Description -->
                        <div class="space-y-4 mb-8">
                            <p class="text-lg text-slate-700 leading-relaxed">
                                Brand kebanggaan SEEO yang menghadirkan produk berkualitas tinggi hasil inovasi dan dedikasi anggota kami.
                            </p>
                            <p class="text-slate-600">
                                Dari makanan dan minuman segar hingga merchandise eksklusif, semua dibuat dengan standar kualitas terbaik.
                            </p>
                        </div>
                        
                        <!-- CTA -->
                        <div>
                            <a href="/shop/home" target="_blank" class="inline-flex items-center px-8 py-4 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-200">
                                Kunjungi Toko Online
                                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Activities Section - Clean & Professional -->
        <section class="py-20 lg:py-32 bg-slate-900">
            <div class="max-w-7xl mx-auto px-6">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-6">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Aktivitas & Program SEEO
                    </div>
                    <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Kegiatan Unggulan Kami
                    </h2>
                    <p class="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Program-program strategis yang dirancang untuk membangun ekosistem entrepreneurship yang berkelanjutan di Fakultas Teknik UNSOED
                    </p>
                </div>
                
                <!-- Activities Grid -->
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- EntClass Card -->
                    <div class="bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-700 transition-colors duration-300">
                        <div class="h-48 overflow-hidden">
                            <img :src="$imageUrl('compro/entclass.JPG')" alt="EntClass I" class="w-full h-full object-cover">
                        </div>
                        
                        <div class="p-6">
                            <div class="mb-3">
                                <span class="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                                    Human Resources
                                </span>
                            </div>
                            <h3 class="text-xl font-bold text-white mb-3">
                                EntClass I
                            </h3>
                            <p class="text-slate-300 mb-4 leading-relaxed">
                                Program pelatihan wirausaha intensif yang fokus pada pengembangan keterampilan bisnis fundamental dan strategi inovasi.
                            </p>
                            <Link href="/activity" class="inline-flex items-center text-blue-400 font-medium hover:text-blue-300 transition-colors">
                                Pelajari Lebih Lanjut
                                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                    
                    <!-- Visitasi Card -->
                    <div class="bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-700 transition-colors duration-300">
                        <div class="h-48 overflow-hidden">
                            <img :src="$imageUrl('compro/visitasi.JPG')" alt="Visitasi I" class="w-full h-full object-cover">
                        </div>
                        
                        <div class="p-6">
                            <div class="mb-3">
                                <span class="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                                    Public Relations
                                </span>
                            </div>
                            <h3 class="text-xl font-bold text-white mb-3">
                                Visitasi I
                            </h3>
                            <p class="text-slate-300 mb-4 leading-relaxed">
                                Studi banding ke organisasi terkemuka untuk memperluas wawasan tentang best practices dalam kewirausahaan dan manajemen.
                            </p>
                            <Link href="/activity" class="inline-flex items-center text-green-400 font-medium hover:text-green-300 transition-colors">
                                Lihat Dokumentasi
                                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                    
                    <!-- Upgrading Card -->
                    <div class="bg-slate-800 rounded-xl overflow-hidden hover:bg-slate-700 transition-colors duration-300 md:col-span-2 lg:col-span-1">
                        <div class="h-48 overflow-hidden">
                            <img :src="$imageUrl('compro/upgrading.webp')" alt="Upgrading I" class="w-full h-full object-cover">
                        </div>
                        
                        <div class="p-6">
                            <div class="mb-3">
                                <span class="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-full">
                                    Team Building
                                </span>
                            </div>
                            <h3 class="text-xl font-bold text-white mb-3">
                                Upgrading I
                            </h3>
                            <p class="text-slate-300 mb-4 leading-relaxed">
                                Kegiatan team building yang dirancang untuk memperkuat soliditas tim dan meningkatkan chemistry antar anggota organisasi.
                            </p>
                            <Link href="/activity" class="inline-flex items-center text-red-400 font-medium hover:text-red-300 transition-colors">
                                Jelajahi Kegiatan
                                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                
                <!-- CTA Section -->
                <div class="text-center mt-16">
                    <Link href="/activity" class="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                        Lihat Semua Kegiatan
                        <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted, onUnmounted } from 'vue';

const carousel = ref(null);
const currentSlide = ref(0);

const scrollToCard = (index) => {
    if (carousel.value) {
        const cardWidth = carousel.value.children[0].offsetWidth + 16;
        carousel.value.scrollTo({
            left: cardWidth * index,
            behavior: 'smooth'
        });
        currentSlide.value = index;
    }
};

const updateCurrentSlide = () => {
    if (carousel.value) {
        const cardWidth = carousel.value.children[0].offsetWidth + 16;
        const scrollLeft = carousel.value.scrollLeft;
        currentSlide.value = Math.round(scrollLeft / cardWidth);
    }
};

onMounted(() => {
    if (carousel.value) {
        carousel.value.addEventListener('scroll', updateCurrentSlide);
    }
});

onUnmounted(() => {
    if (carousel.value) {
        carousel.value.removeEventListener('scroll', updateCurrentSlide);
    }
});
</script>

<style>
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Advanced Animations */
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

@keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(2deg); }
}

@keyframes float-slower {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-40px) rotate(-3deg); }
}

@keyframes pulse-slow {
    0%, 100% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.1) rotate(1deg); }
}

@keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes gradient-shift-slow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes slide {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.animate-float-slow {
    animation: float-slow 8s ease-in-out infinite;
}

.animate-float-slower {
    animation: float-slower 10s ease-in-out infinite;
}

.animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
}

.animate-gradient-shift {
    background-size: 400% 400%;
    animation: gradient-shift 6s ease infinite;
}

.animate-gradient-shift-slow {
    background-size: 400% 400%;
    animation: gradient-shift-slow 8s ease infinite;
}

/* Hover Effects */
.hover-lift {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Glass Effect */
.glass {
    backdrop-filter: blur(16px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Text Gradient */
.text-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Modern shadows */
.shadow-colored {
    box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04);
}

.shadow-colored-lg {
    box-shadow: 0 20px 40px -12px rgba(59, 130, 246, 0.25), 0 8px 16px -8px rgba(59, 130, 246, 0.1);
}

/* Smooth transitions */
.transition-smooth {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Loading spinner for images */
.image-loading {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
</style>