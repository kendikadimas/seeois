<template>
    <Head title="Tentang SEEO - Student Entrepreneur and Empowerment Organization" />
    <PublicLayout>
        <!-- Hero Section -->
        <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
            <!-- Decorative Elements -->
            <div class="absolute inset-0">
                <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-slate-400 rounded-full animate-ping"></div>
                <div class="absolute top-3/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" style="animation-delay: 2s;"></div>
                <div class="absolute top-1/2 left-3/4 w-2 h-2 bg-slate-400 rounded-full animate-ping" style="animation-delay: 4s;"></div>
            </div>
            
            <div class="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <div class="space-y-8">
                    <!-- Badge -->
                    <div class="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span class="font-medium">Fakultas Teknik Universitas Jenderal Soedirman</span>
                    </div>
                    
                    <!-- Main heading -->
                    <div>
                        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 leading-tight">
                            <span class="block">Tentang</span>
                            <span class="block text-blue-600">
                                SEEO
                            </span>
                        </h1>
                        <p class="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Student Entrepreneur and Empowerment Organization
                        </p>
                    </div>
                    
                    <!-- Subtitle -->
                    <p class="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto">
                        Mencetak generasi wirausaha teknik yang inovatif, adaptif, dan berkelanjutan
                    </p>
                </div>
            </div>
            
            <!-- Scroll indicator -->
            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 animate-bounce">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </section>

        <!-- Story Section -->
        <section class="relative py-32 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50"></div>
            
            <div class="relative z-10 max-w-7xl mx-auto px-6">
                <div class="grid lg:grid-cols-2 gap-20 items-center">
                    <!-- Left: Content -->
                    <div>
                        <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-8">
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            Cerita Kami
                        </div>
                        
                        <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            Perjalanan Membangun
                            <span class="text-blue-600 block">
                                Ekosistem Entrepreneurship
                            </span>
                        </h2>
                        
                        <div class="space-y-6 text-lg text-slate-700">
                            <p class="leading-relaxed">
                                SEEO lahir dari visi untuk menciptakan <strong class="text-blue-600">lingkungan pembelajaran entrepreneurship</strong> 
                                yang komprehensif di Fakultas Teknik Universitas Jenderal Soedirman.
                            </p>
                            <p class="leading-relaxed">
                                Sebagai Unit Kegiatan Mahasiswa Kewirausahaan (UKMK), kami berkomitmen memberikan pengalaman 
                                berwirausaha yang <strong class="text-blue-600">menggabungkan aspek teoritis dan praktis</strong> 
                                secara adaptif dan berkelanjutan.
                            </p>
                            <p class="leading-relaxed">
                                Melalui berbagai program inovatif dan brand unggulan <strong class="text-blue-600">Blaterian</strong>, 
                                kami membina mahasiswa untuk menjadi entrepreneur yang tangguh dan berdampak positif.
                            </p>
                        </div>
                        
                        <!-- Stats -->
                        <div class="grid grid-cols-3 gap-6 mt-12">
                            <div class="text-center">
                                <div class="text-3xl font-bold text-blue-600 mb-2">10+</div>
                                <div class="text-sm text-slate-600">Tahun Pengalaman</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-blue-600 mb-2">100+</div>
                                <div class="text-sm text-slate-600">Anggota Aktif</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-blue-600 mb-2">50+</div>
                                <div class="text-sm text-slate-600">Program Sukses</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right: Visual -->
                    <div class="relative">
                        <div class="relative bg-blue-600 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img :src="$imageUrl('compro/logo.png')" alt="SEEO Logo" class="w-full h-auto max-w-md mx-auto filter drop-shadow-2xl"/>
                        </div>
                        
                        <!-- Floating elements -->
                        <div class="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-xl rotate-12 hover:rotate-0 transition-transform duration-300">
                            <div class="text-center">
                                <div class="text-2xl mb-2">🚀</div>
                                <div class="text-xs text-gray-600">Inovasi</div>
                            </div>
                        </div>
                        
                        <div class="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl -rotate-12 hover:rotate-0 transition-transform duration-300">
                            <div class="text-center">
                                <div class="text-2xl mb-2">🤝</div>
                                <div class="text-xs text-gray-600">Kolaborasi</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Vision & Mission Section -->
        <section class="relative py-32 overflow-hidden">
            <div class="absolute inset-0 bg-slate-900">
                <div class="absolute inset-0 opacity-10"></div>
            </div>
            
            <div class="relative z-10 max-w-6xl mx-auto px-6">
                <!-- Section header -->
                <div class="text-center mb-20">
                    <div class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white mb-6">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        Visi & Misi
                    </div>
                    <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Arah & Tujuan
                        <span class="block text-blue-400">
                            Organisasi
                        </span>
                    </h2>
                </div>
                
                <!-- Vision & Mission Cards -->
                <div class="grid md:grid-cols-2 gap-12">
                    <!-- Vision -->
                    <div class="relative group">
                        <div class="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-10 h-full hover:bg-white/10 transition-all duration-500">
                            <div class="text-center mb-8">
                                <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                </div>
                                <h3 class="text-3xl font-bold text-white mb-4">Visi</h3>
                            </div>
                            <p class="text-lg text-slate-300 leading-relaxed text-center">
                                Menjadi Unit Kegiatan Mahasiswa Kewirausahaan yang <span class="text-blue-400 font-semibold">unggul, inovatif, dan berkelanjutan</span> 
                                dalam mengembangkan jiwa entrepreneur di kalangan mahasiswa Fakultas Teknik UNSOED.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Mission -->
                    <div class="relative group">
                        <div class="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-10 h-full hover:bg-white/10 transition-all duration-500">
                            <div class="text-center mb-8">
                                <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                                    </svg>
                                </div>
                                <h3 class="text-3xl font-bold text-white mb-4">Misi</h3>
                            </div>
                            <p class="text-lg text-slate-300 leading-relaxed text-center">
                                Memberikan pengalaman berwirausaha yang <span class="text-blue-400 font-semibold">menggabungkan aspek teoritis dan praktis</span> 
                                secara adaptif, serta membangun organisasi yang sinergis baik internal maupun eksternal UKMK FT UNSOED.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Values Section -->
        <section class="relative py-32 overflow-hidden">
            <div class="absolute inset-0 bg-slate-50"></div>
            
            <div class="relative z-10 max-w-7xl mx-auto px-6">
                <div class="text-center mb-20">
                    <div class="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-6">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                        </svg>
                        Nilai-Nilai Kami
                    </div>
                    <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Prinsip yang Kami
                        <span class="text-blue-600 block">
                            Pegang Teguh
                        </span>
                    </h2>
                    <p class="text-xl text-slate-600 max-w-3xl mx-auto">
                        Fondasi yang memandu setiap langkah dan keputusan dalam perjalanan SEEO
                    </p>
                </div>
                
                <!-- Values Grid -->
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Innovation -->
                    <div class="group bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                        <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 mb-4">Inovasi</h3>
                        <p class="text-slate-600 leading-relaxed">
                            Selalu mencari cara baru dan kreatif untuk mengembangkan program dan solusi entrepreneurship.
                        </p>
                    </div>
                    
                    <!-- Collaboration -->
                    <div class="group bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                        <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 mb-4">Kolaborasi</h3>
                        <p class="text-slate-600 leading-relaxed">
                            Membangun kemitraan yang kuat dengan berbagai pihak untuk mencapai tujuan bersama.
                        </p>
                    </div>
                    
                    <!-- Excellence -->
                    <div class="group bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 md:col-span-2 lg:col-span-1">
                        <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 mb-4">Keunggulan</h3>
                        <p class="text-slate-600 leading-relaxed">
                            Berkomitmen untuk memberikan hasil terbaik dalam setiap program dan layanan yang kami berikan.
                        </p>
                    </div>
                </div>
                
                <!-- CTA Section -->
                <div class="text-center mt-20">
                    <div class="bg-blue-600 rounded-3xl p-12 text-white">
                        <h3 class="text-3xl font-bold mb-6">Bergabung dengan Kami</h3>
                        <p class="text-xl text-white mb-8 max-w-2xl mx-auto">
                            Mari bersama-sama membangun masa depan entrepreneurship yang lebih cerah
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" class="inline-flex items-center px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                <span>Hubungi Kami</span>
                                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </Link>
                            <Link href="/structure" class="inline-flex items-center px-8 py-4 rounded-2xl border-2 border-white text-white font-bold hover:bg-white hover:text-slate-900 transition-all duration-300">
                                <span>Lihat Struktur</span>
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
import { Head } from '@inertiajs/vue3';
</script>