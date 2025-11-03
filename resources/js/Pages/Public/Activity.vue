<template>
    <Head title="Kegiatan & Program - SEEO" />
    <PublicLayout>
        <!-- Hero Section -->
        <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
            <!-- Dynamic Background -->
            <div class="absolute inset-0">
                <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 animate-gradient-shift"></div>
                <div class="absolute inset-0 bg-black/20"></div>
            </div>
            
            <!-- Floating Elements -->
            <div class="absolute inset-0 overflow-hidden">
                <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl animate-float-slow"></div>
                <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-slower"></div>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/5 to-purple-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
            </div>
            
            <!-- Grid Pattern -->
            <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 50px 50px;"></div>
            
            <div class="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <div class="space-y-8">
                    <!-- Badge -->
                    <div class="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span class="font-semibold">Program & Kegiatan SEEO</span>
                    </div>
                    
                    <!-- Main heading -->
                    <div>
                        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
                            <span class="block">Aksi Nyata</span>
                            <span class="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Entrepreneurship
                            </span>
                        </h1>
                        <p class="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                            Jelajahi dokumentasi perjalanan kami dalam membangun ekosistem entrepreneur
                        </p>
                    </div>
                    
                    <!-- Stats -->
                    <div class="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                        <div class="text-center">
                            <div class="text-4xl font-black text-cyan-400 mb-2">50+</div>
                            <div class="text-white/70 text-sm">Program Sukses</div>
                        </div>
                        <div class="text-center">
                            <div class="text-4xl font-black text-blue-400 mb-2">1000+</div>
                            <div class="text-white/70 text-sm">Peserta Terlibat</div>
                        </div>
                        <div class="text-center">
                            <div class="text-4xl font-black text-purple-400 mb-2">5+</div>
                            <div class="text-white/70 text-sm">Tahun Pengalaman</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Scroll indicator -->
            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
                <div class="flex flex-col items-center">
                    <span class="text-sm font-medium mb-2">Lihat Program Kami</span>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </div>
        </section>

        <!-- Featured Program Section -->
        <section class="relative py-32 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <div class="absolute inset-0 opacity-[0.02]" style="background-image: radial-gradient(circle, #3b82f6 1px, transparent 1px); background-size: 30px 30px;"></div>
            </div>
            
            <div class="relative z-10 max-w-7xl mx-auto px-6">
                <!-- Section Header -->
                <div class="text-center mb-20">
                    <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        Program Unggulan
                    </div>
                    <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
                        EntClass I
                        <span class="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Entrepreneur Bootcamp
                        </span>
                    </h2>
                    <p class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Program intensif pengembangan jiwa entrepreneur melalui pembelajaran terintegrasi
                    </p>
                </div>
                
                <!-- Featured Content -->
                <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    <!-- Image side -->
                    <div class="relative group">
                        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1">
                            <div class="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden bg-white">
                                <img :src="$imageUrl('compro/entclass.JPG')" alt="EntClass I" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                
                                <!-- Overlay info -->
                                <div class="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div class="flex items-center justify-between text-white mb-4">
                                        <span class="bg-indigo-600 px-3 py-1 rounded-full text-xs font-bold">Human Resources</span>
                                        <span class="text-sm font-medium">2024</span>
                                    </div>
                                    <h3 class="text-xl font-bold text-white mb-2">EntClass I Workshop</h3>
                                    <p class="text-white/80 text-sm">Intensive entrepreneurship training program</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Floating stats -->
                        <div class="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform rotate-12 hover:rotate-0 transition-transform duration-300">
                            <div class="text-center">
                                <div class="text-2xl font-black text-indigo-600 mb-1">50+</div>
                                <div class="text-xs text-gray-600">Peserta</div>
                            </div>
                        </div>
                        
                        <div class="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                            <div class="text-center">
                                <div class="text-2xl font-black text-purple-600 mb-1">3</div>
                                <div class="text-xs text-gray-600">Hari</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Content side -->
                    <div class="space-y-8">
                        <!-- Main content -->
                        <div>
                            <h3 class="text-3xl font-bold text-slate-900 mb-6">Transformasi Mindset Entrepreneur</h3>
                            <div class="space-y-4 text-lg text-slate-700">
                                <p class="leading-relaxed">
                                    EntClass I merupakan program pelatihan intensif yang dirancang khusus untuk 
                                    <span class="font-semibold text-indigo-600">mengembangkan mindset entrepreneur</span> 
                                    di kalangan mahasiswa Fakultas Teknik UNSOED.
                                </p>
                                <p class="leading-relaxed">
                                    Program ini mencakup pembelajaran komprehensif mulai dari 
                                    <span class="font-semibold text-purple-600">analisis pasar, business model canvas, 
                                    hingga strategi pemasaran digital</span> yang relevan dengan era modern.
                                </p>
                            </div>
                        </div>
                        
                        <!-- Key features -->
                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                                    <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                                    </svg>
                                </div>
                                <h4 class="font-bold text-slate-900 mb-2">Ide & Inovasi</h4>
                                <p class="text-sm text-slate-600">Pengembangan ide bisnis inovatif</p>
                            </div>
                            
                            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                    </svg>
                                </div>
                                <h4 class="font-bold text-slate-900 mb-2">Analisis Pasar</h4>
                                <p class="text-sm text-slate-600">Strategi analisis dan riset pasar</p>
                            </div>
                        </div>
                        
                        <!-- Impact metrics -->
                        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
                            <h4 class="text-xl font-bold mb-6">Dampak Program</h4>
                            <div class="grid grid-cols-3 gap-4">
                                <div class="text-center">
                                    <div class="text-2xl font-black text-cyan-300 mb-1">95%</div>
                                    <div class="text-white/80 text-xs">Tingkat Kepuasan</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-2xl font-black text-blue-300 mb-1">80%</div>
                                    <div class="text-white/80 text-xs">Melanjutkan Bisnis</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-2xl font-black text-purple-300 mb-1">15+</div>
                                    <div class="text-white/80 text-xs">Startup Lahir</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Other Activities Section -->
        <section class="relative py-32 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                <div class="absolute inset-0 opacity-10"></div>
            </div>
            
            <div class="relative z-10 max-w-7xl mx-auto px-6">
                <!-- Section header -->
                <div class="text-center mb-20">
                    <div class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-6">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Kegiatan Lainnya
                    </div>
                    <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                        Program
                        <span class="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            Berkelanjutan
                        </span>
                    </h2>
                    <p class="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                        Serangkaian program yang dirancang untuk membangun ekosistem entrepreneur yang kuat dan berkelanjutan
                    </p>
                </div>
                
                <!-- Activities Grid -->
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Visitasi -->
                    <div class="group relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105">
                        <div class="relative h-64 overflow-hidden">
                            <img :src="$imageUrl('compro/visitasi.JPG')" alt="Visitasi I" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            
                            <div class="absolute top-4 left-4">
                                <span class="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                                    Public Relations
                                </span>
                            </div>
                            
                            <div class="absolute bottom-6 left-6 right-6">
                                <h3 class="text-xl font-bold text-white mb-2">Visitasi I</h3>
                                <p class="text-white/80 text-sm">Studi banding ke KOPMA UIN SAIZU untuk memperluas wawasan organizational management</p>
                            </div>
                        </div>
                        
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-4">
                                <span class="text-green-400 text-sm font-medium">Learning Experience</span>
                                <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </div>
                            <p class="text-white/70 text-sm leading-relaxed">
                                Eksplorasi best practices dalam kewirausahaan dan manajemen organisasi melalui interaksi langsung dengan komunitas entrepreneur sukses.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Upgrading -->
                    <div class="group relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105">
                        <div class="relative h-64 overflow-hidden">
                            <img :src="$imageUrl('compro/upgrading.webp')" alt="Upgrading I" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            
                            <div class="absolute top-4 left-4">
                                <span class="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-pink-600 text-white">
                                    Human Resources
                                </span>
                            </div>
                            
                            <div class="absolute bottom-6 left-6 right-6">
                                <h3 class="text-xl font-bold text-white mb-2">Upgrading I</h3>
                                <p class="text-white/80 text-sm">Team building intensive untuk memperkuat soliditas dan chemistry antar anggota</p>
                            </div>
                        </div>
                        
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-4">
                                <span class="text-red-400 text-sm font-medium">Team Building</span>
                                <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </div>
                            <p class="text-white/70 text-sm leading-relaxed">
                                Kegiatan bonding yang dirancang untuk meningkatkan kolaborasi, komunikasi, dan semangat kebersamaan dalam tim.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Rapat Pleno -->
                    <div class="group relative bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105 md:col-span-2 lg:col-span-1">
                        <div class="relative h-64 overflow-hidden">
                            <img :src="$imageUrl('compro/raplen1.JPG')" alt="Rapat Pleno I" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            
                            <div class="absolute top-4 left-4">
                                <span class="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-500 to-orange-600 text-white">
                                    CEO-CoCEO
                                </span>
                            </div>
                            
                            <div class="absolute bottom-6 left-6 right-6">
                                <h3 class="text-xl font-bold text-white mb-2">Rapat Pleno I</h3>
                                <p class="text-white/80 text-sm">Evaluasi komprehensif perkembangan dan roadmap strategis organisasi</p>
                            </div>
                        </div>
                        
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-4">
                                <span class="text-yellow-400 text-sm font-medium">Strategic Planning</span>
                                <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </div>
                            <p class="text-white/70 text-sm leading-relaxed">
                                Forum evaluasi menyeluruh untuk membahas progress setiap departemen dan merumuskan strategi pengembangan organisasi ke depan.
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- CTA Section -->
                <div class="text-center mt-20">
                    <div class="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl p-12 text-white">
                        <h3 class="text-3xl font-bold mb-6">Bergabung dalam Perjalanan Kami</h3>
                        <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Jadilah bagian dari komunitas entrepreneur yang dinamis dan terus berinovasi
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" class="inline-flex items-center px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                <span>Hubungi Kami</span>
                                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </Link>
                            <Link href="/structure" class="inline-flex items-center px-8 py-4 rounded-2xl border-2 border-white text-white font-bold hover:bg-white hover:text-slate-900 transition-all duration-300">
                                <span>Lihat Tim Kami</span>
                                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </Link>
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
import { ref, inject } from 'vue';

const imageUrl = inject('imageUrl');

const activities = [
    { title: 'Visitasi I ke KOPMA UIN SAIZU', image: 'compro/visitasi.JPG', department: 'Public Relations', badgeColor: 'bg-green-100 text-green-600', description: 'Studi banding untuk meningkatkan wawasan mengenai praktik kewirausahaan di organisasi lain.' },
    { title: 'Upgrading I', image: 'compro/upgrading.webp', department: 'Human Resources', badgeColor: 'bg-red-100 text-red-600', description: 'Kegiatan bonding anggota untuk memperkuat hubungan tim dan meningkatkan semangat kolaborasi.' },
    { title: 'Rapat Pleno I', image: 'compro/raplen1.JPG', department: 'CEO-CoCEO', badgeColor: 'bg-yellow-100 text-yellow-600', description: 'Membahas perkembangan dan evaluasi program kerja setiap departemen.' }
];
</script>

<style>
/* Advanced Animations */
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

@keyframes slide {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
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

/* Glass Effect */
.backdrop-blur-sm {
    backdrop-filter: blur(8px);
}

/* Hover Effects */
.transition-smooth {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>