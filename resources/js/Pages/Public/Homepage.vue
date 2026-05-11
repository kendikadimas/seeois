<template>
    <Head title="Soedirman Engineering Entrepreneurship Organization" />
    <PublicLayout>
        <!-- Hero Section -->
        <!-- Hero Section -->
        <header class="relative bg-white min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
            <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
                <div class="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    <div class="max-w-2xl">
                        <!-- Badge -->
                        <!-- <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8 border border-blue-100">
                            <span class="flex h-2 w-2 relative">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                            </span>
                            Universitas Jenderal Soedirman
                        </div>
                         -->
                        <!-- Heading -->
                        <h1 class="text-5xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-8 leading-[1.1]">
                            Soedirman Engineering <br />
                            <span class="text-blue-600 italic">Entrepreneurship</span> Organization
                        </h1>
                        
                        <!-- Copy -->
                        <p class="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                            Wadah resmi kemahasiswaan Fakultas Teknik UNSOED untuk berinovasi, berkolaborasi, dan mengembangkan potensi bisnis melalui pendekatan profesional yang terukur.
                        </p>
                        
                        <!-- Buttons -->
                        <div class="flex flex-col sm:flex-row gap-5">
                            <Link href="/about" class="inline-flex justify-center items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all duration-300">
                                Tentang SEEO
                            </Link>
                            <a href="/shop/home" target="_blank" class="inline-flex justify-center items-center px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all duration-300">
                                Kunjungi Blaterian
                            </a>
                        </div>
                    </div>
                    
                    <!-- Hero Image & Stats -->
                    <div class="relative lg:ml-auto w-full max-w-lg lg:max-w-none hidden lg:block">
                        <div class="aspect-[4/3] rounded-[2rem] bg-slate-50 overflow-hidden shadow-2xl border border-slate-100 relative">
                            <img :src="logoSrc" alt="SEEO Kegiatan" class="w-full h-full object-cover" @error="$event.target.src=fallbackLogo" />
                        </div>
                        
                        <!-- Floating Stats -->
                        <div class="absolute -bottom-6 -left-6 bg-white p-8 rounded-2xl shadow-2xl border border-slate-50 flex items-center gap-8">
                            <div>
                                <p class="text-4xl font-black text-blue-600">8</p>
                                <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">Departemen</p>
                            </div>
                            <div class="w-px h-12 bg-slate-100"></div>
                            <div>
                                <p class="text-4xl font-black text-amber-500">40+</p>
                                <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">Pengurus Aktif</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Background Decoration -->
            <div class="absolute top-0 right-0 -z-10 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent hidden lg:block"></div>
        </header>

        <!-- Core Programs Section -->
        <section class="py-24 bg-slate-50 border-t border-slate-100">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="text-center max-w-2xl mx-auto mb-16">
                    <h2 class="text-3xl font-bold text-slate-900 mb-4">Pilar Program Kami</h2>
                    <p class="text-lg text-slate-600 leading-relaxed">Fokus strategis organisasi kami dalam memfasilitasi dan mengembangkan ekosistem kewirausahaan yang profesional bagi mahasiswa.</p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Feature Card 1 -->
                    <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
                        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100">
                            <!-- Bulb Icon -->
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11a3 3 0 106 0V8a3 3 0 00-6 0v3zm-4 8v1a2 2 0 002 2h10a2 2 0 002-2v-1M12 4v1m0 0a3 3 0 106 0 3 3 0 00-6 0zm-7 6h2m12 0h2m-2.121 4.243l1.414 1.414M4.929 15.243l1.414 1.414"></path></svg>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">Inkubasi Bisnis</h3>
                        <p class="text-slate-600 leading-relaxed">Penyediaan fasilitas operasional dan pendampingan fundamental untuk mengeksekusi ide bisnis dengan pendekatan yang terstruktur.</p>
                    </div>

                    <!-- Feature Card 2 -->
                    <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
                        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100">
                            <!-- Users / Network Icon -->
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">Kolaborasi & Relasi</h3>
                        <p class="text-slate-600 leading-relaxed">Membangun jejaring yang kompeten antar civitas, praktisi ahli, dan alumni guna menciptakan dan menangkap peluang kemitraan strategis.</p>
                    </div>

                    <!-- Feature Card 3 -->
                    <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200 md:col-span-2 lg:col-span-1">
                        <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 border border-blue-100">
                            <!-- Academic/Chart Icon -->
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        </div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">Peningkatan Kapasitas</h3>
                        <p class="text-slate-600 leading-relaxed">Agenda pelatihan, workshop edukasi, dan seminar komprehensif yang spesifik bertujuan mengasah teknis manajemen serta daya saing sumber daya.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Brand Showcase: Blaterian -->
        <section class="py-24 bg-amber-50">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-sm border border-amber-200">
                    <div class="p-10 lg:p-16 lg:w-1/2 flex flex-col justify-center text-left">
                        <div class="inline-flex items-center px-3 py-1 bg-amber-50 text-amber-700 text-sm font-semibold rounded-full mb-6 border border-amber-200 w-fit uppercase tracking-wider">
                            Official Business Unit
                        </div>
                        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Blaterian Enterprise</h2>
                        <p class="text-lg text-slate-700 mb-8 leading-relaxed font-light">
                            Lini komersial kebanggaan SEEO FT UNSOED. Menyajikan kurasi produk <em class="text-slate-900 font-medium">merchandise</em> aparatus kampus dan <em class="text-slate-900 font-medium">food & beverages</em> dengan standar kualitas profesional dari karya orisinil mahasiswa.
                        </p>
                        
                        <div class="flex flex-col sm:flex-row gap-4 mb-10">
                            <div class="flex items-center gap-3 text-slate-700">
                                <div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200">
                                    <svg class="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                </div>
                                <span class="font-medium text-sm">Blaterian Goods</span>
                            </div>
                            <div class="flex items-center gap-3 text-slate-700">
                                <div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center border border-amber-200">
                                    <svg class="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                </div>
                                <span class="font-medium text-sm">Blaterian Foods</span>
                            </div>
                        </div>
                        
                        <div>
                            <a href="/shop/home" target="_blank" class="inline-flex justify-center items-center px-6 py-3.5 bg-amber-500 text-slate-900 font-bold rounded-lg shadow hover:bg-amber-400 hover:shadow-md transition-all duration-200">
                                Akses Katalog Portal
                            </a>
                        </div>
                    </div>
                    
                    <div class="lg:w-1/2 bg-amber-100 p-10 flex items-center justify-center relative min-h-[350px]">
                        <div class="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
                        <div class="relative w-full max-w-sm aspect-square bg-white rounded-full border border-amber-200 shadow-xl flex items-center justify-center p-8">
                            <img :src="logoSrc" alt="Blaterian Representatif" class="w-1/2 h-1/2 object-contain" @error="$event.target.src=fallbackLogo" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Brief Activity Section -->
        <section class="py-24 bg-slate-50 border-t border-slate-200">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div class="max-w-2xl">
                        <h2 class="text-3xl font-bold text-slate-900 mb-4">Aktivitas Terkini Organisasi</h2>
                        <p class="text-slate-600 text-lg leading-relaxed">Tinjauan dokumentatif pelaksanaan agenda internal dan eksternal kami dalam memvalidasi komitmen operasional.</p>
                    </div>
                    <Link href="/activity" class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors whitespace-nowrap bg-blue-50 px-4 py-2 rounded-lg">
                        Seluruh Dokumentasi
                        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </Link>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    <!-- Activity Card 1 -->
                    <div class="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                        <div class="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                            <img :src="logoSrc" alt="Pelatihan Bisnis" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" @error="$event.target.src=fallbackLogo" />
                        </div>
                        <div class="p-6 flex-1 flex flex-col">
                            <div class="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3">Agenda Pelatihan</div>
                            <h3 class="text-xl font-bold text-slate-900 mb-3">Entrepreneur Class</h3>
                            <p class="text-slate-600 text-sm leading-relaxed mb-4">Pelaksanaan kursus intensif berbasis studi kasus terkait manajemen administrasi serta penetrasi digital marketing yang efisien.</p>
                        </div>
                    </div>

                    <!-- Activity Card 2 -->
                    <div class="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                        <div class="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                            <img :src="logoSrc" alt="Studi Banding" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" @error="$event.target.src=fallbackLogo" />
                        </div>
                        <div class="p-6 flex-1 flex flex-col">
                            <div class="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3">Agenda Relasi Publik</div>
                            <h3 class="text-xl font-bold text-slate-900 mb-3">Visitasi Kelembagaan</h3>
                            <p class="text-slate-600 text-sm leading-relaxed mb-4">Pertukaran insight prosedural serta wawasan manajerial ke berbagai inkubator lokal guna benchmarking sistem organisasi.</p>
                        </div>
                    </div>

                    <!-- Activity Card 3 -->
                    <div class="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                        <div class="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                            <img :src="logoSrc" alt="Kapasitas Internal" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" @error="$event.target.src=fallbackLogo" />
                        </div>
                        <div class="p-6 flex-1 flex flex-col">
                            <div class="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3">Kapasitas Internal</div>
                            <h3 class="text-xl font-bold text-slate-900 mb-3">Team Upgrading</h3>
                            <p class="text-slate-600 text-sm leading-relaxed mb-4">Penguatan struktur kohesif internal antar anggota manajemen guna mempertahankan stabilitas sinergi pelaksanaan program kerja.</p>
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
import { ref } from 'vue';

// Fallback logic for generic images assuming Laravel's internal asset structure
const logoSrc = ref('/storage/images/misc/logo.png');
const fallbackLogo = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyNlMmU4ZjAnLz48dGV4dCB4PSc1MCUnIHk9JzUwJScgZmlsbD0nI2EwYWJjMCcgZm9udC1zaXplPScxNScgZm9udC1mYW1pbHk9J3NhbnMtc2VyaWYnIGFsaWdubWVudC1iYXNlbGluZT0nbWlkZGxlJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJz5TQU1QTEUgSU1BR0U8L3RleHQ+PC9zdmc+';

</script>

<style scoped>
/* 
  Kini seluruh styling mengandalkan utility classes Tailwind murni yang minimalis.
  Layout dibuat datar (flat architecture), shadow menggunakan pendekatan soft-shadow
  yang ramah di mata, background yang terang (putih/slate-50),
  serta menghilangkan semua micro-animation AI/berlebihan yang tidak esensial.
*/
</style>