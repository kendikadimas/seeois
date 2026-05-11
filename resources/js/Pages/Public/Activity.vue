<template>
    <Head title="Kegiatan & Program - SEEO" />
    <PublicLayout>
        <!-- Hero Section -->
        <section class="relative bg-slate-950 min-h-[calc(100vh-5rem)] flex items-center justify-center border-b border-slate-900 overflow-hidden">
            <!-- Background Gradient -->
            <div class="absolute inset-0 z-0">
                <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]"></div>
            </div>

            <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20">
                    Program & Kegiatan SEEO
                </div>
                
                <h1 class="text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
                    Aktualisasi <span class="text-blue-500">Entrepreneurship</span>
                </h1>
                
                <p class="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                    Arsip dokumentatif mengenai inisiatif program kerja, seminar edukasi, dan pembinaan kolektif dalam rangka mencetak probabilitas keberhasilan industri startup.
                </p>

                <!-- Scroll Indicator -->
                <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
                    <div class="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent"></div>
                </div>
            </div>
        </section>

        <!-- Highlighted Program -->
        <section class="py-24 bg-slate-50 border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-sm border border-slate-200">
                    <div class="lg:w-1/2 relative bg-slate-100 min-h-[300px] lg:min-h-full overflow-hidden group">
                        <img :src="$imageUrl('compro/entclass.JPG')" alt="EntClass I" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" @error="$event.target.src=fallbackLogo" />
                    </div>
                    
                    <div class="p-10 lg:p-16 lg:w-1/2 flex flex-col justify-center text-left">
                        <div class="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mb-6 border border-blue-100 w-fit uppercase tracking-widest">
                            Program Flagship
                        </div>
                        
                        <h2 class="text-3xl font-bold text-slate-900 mb-4">Entrepreneur Class I</h2>
                        
                        <div class="space-y-4 text-slate-600 mb-8 leading-relaxed">
                            <p>
                                EntClass merupakan kursus bersertifikasi yang disusun untuk memvalidasi kurikulum bisnis fundamental terhadap eksekutif muda di Fakultas Teknik UNSOED.
                            </p>
                            <p>
                                Mahasiswa difasilitasi materi esensial semacam validasi pasar, konstruksi <em>Business Model Canvas (BMC)</em>, administrasi legalitas, dan digital marketing konversi tinggi. Diharapkan partisipan siap menembus fase inkubasi akhir tanpa distorsi teknis.
                            </p>
                        </div>
                        
                        <div class="flex flex-wrap gap-6 pt-6 border-t border-slate-100">
                            <div>
                                <span class="block text-2xl font-bold text-slate-900">50+</span>
                                <span class="text-sm text-slate-500 font-medium">Partisipan Internal</span>
                            </div>
                            <div>
                                <span class="block text-2xl font-bold text-slate-900">3 KPI</span>
                                <span class="text-sm text-slate-500 font-medium">Modul Keahlian Terukur</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Archive Section -->
        <section class="py-24 bg-white">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold text-slate-900 mb-4">Arsip Program Berkelanjutan</h2>
                    <p class="text-lg text-slate-600 max-w-2xl mx-auto">Realisasi program operasional yang mendukung percepatan wawasan organisasi secara komprehensif.</p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Visitasi -->
                    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300">
                        <div class="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                            <img :src="$imageUrl('compro/visitasi.JPG')" alt="Visitasi I" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" @error="$event.target.src=fallbackLogo" />
                        </div>
                        <div class="p-6 flex-1 flex flex-col">
                            <div class="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3">Public Relations</div>
                            <h3 class="text-xl font-bold text-slate-900 mb-3">Visitasi Kelembagaan</h3>
                            <p class="text-slate-600 text-sm leading-relaxed mb-4">Benchmarking model administrasi dan birokrasi komite lokal lewat tinjauan komparatif dengan institusi di luar universitas (KOPMA UIN SAIZU).</p>
                        </div>
                    </div>

                    <!-- Upgrading -->
                    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300">
                        <div class="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                            <img :src="$imageUrl('compro/upgrading.webp')" alt="Upgrading" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" @error="$event.target.src=fallbackLogo" />
                        </div>
                        <div class="p-6 flex-1 flex flex-col">
                            <div class="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3">Human Resources</div>
                            <h3 class="text-xl font-bold text-slate-900 mb-3">Team Upgrading Intensive</h3>
                            <p class="text-slate-600 text-sm leading-relaxed mb-4">Intervensi kapasitas struktural guna mengharmonisasikan komunikasi manajerial antar divisi saat memecahkan isu krusial korporasi.</p>
                        </div>
                    </div>

                    <!-- Rapat Pleno -->
                    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300 md:col-span-2 lg:col-span-1">
                        <div class="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                            <img :src="$imageUrl('compro/raplen1.JPG')" alt="Rapat Pleno" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" @error="$event.target.src=fallbackLogo" />
                        </div>
                        <div class="p-6 flex-1 flex flex-col">
                            <div class="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3">CEO & Co-CEO</div>
                            <h3 class="text-xl font-bold text-slate-900 mb-3">Quarterly Pleno</h3>
                            <p class="text-slate-600 text-sm leading-relaxed mb-4">Rapat evaluasi progres periodik yang mewajibkan audit faktual setiap program departemen demi kontrol transparansi organisasi.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Call to Action -->
        <section class="py-24 bg-slate-50 border-t border-slate-200">
             <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                <h3 class="text-3xl font-bold text-slate-900 mb-6">Berkolaborasi Bersama Kami</h3>
                <p class="text-lg text-slate-600 mb-8 leading-relaxed">
                    SEEO sangat terbuka terhadap kemitraan akademis, sponsorship industri, maupun entitas startup lain. Satukan gagasan untuk memperluas dampak ekonomi.
                </p>
                <Link href="/contact" class="inline-flex justify-center items-center px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 hover:shadow transition-all duration-200">
                    Ajukan Kemitraan
                </Link>
             </div>
        </section>
    </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { inject } from 'vue';

const imageUrl = inject('imageUrl');
const fallbackLogo = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyNlMmU4ZjAnLz48dGV4dCB4PSc1MCUnIHk9JzUwJScgZmlsbD0nI2EwYWJjMCcgZm9udC1zaXplPScxNScgZm9udC1mYW1pbHk9J3NhbnMtc2VyaWYnIGFsaWdubWVudC1iYXNlbGluZT0nbWlkZGxlJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJz5TQU1QTEUgSU1BR0U8L3RleHQ+PC9zdmc+';
</script>