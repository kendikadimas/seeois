<template>
    <Head title="Struktur Organisasi - SEEO" />
    <PublicLayout>
        <!-- Hero Section -->
        <section class="relative bg-slate-950 min-h-[calc(100vh-5rem)] flex items-center justify-center border-b border-slate-900 overflow-hidden">
            <!-- Background Decoration -->
            <div class="absolute inset-0 z-0">
                <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]"></div>
                <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px]"></div>
            </div>

            <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20">
                    Struktur Organisasi
                </div>
                
                <h1 class="text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
                    Tim <span class="text-blue-500 italic">Departemen</span> SEEO
                </h1>
                
                <p class="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                    Mengenal talenta struktural yang menjadi motor penggerak kompetensi operasional dan pertumbuhan organisasi ekosistem wirausaha.
                </p>

                <!-- Scroll Indicator -->
                <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
                    <div class="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent"></div>
                </div>
            </div>
        </section>

        <!-- Executive Leadership Section -->
        <section class="py-24 bg-slate-50">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold text-slate-900 mb-4">Kepemimpinan Eksekutif</h2>
                    <p class="text-lg text-slate-600">Visi strategis dan kemudi arah kebijakan organisasi.</p>
                </div>

                <div class="flex justify-center mb-24">
                    <div class="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300">
                        <div class="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                            <img :src="logoSrc" alt="CEO & Co-CEO" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" @error="$event.target.src=fallbackLogo" />
                        </div>
                        <div class="p-6 text-center">
                            <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 mb-4 border border-blue-100">
                                <span class="text-lg">👑</span>
                            </div>
                            <h3 class="text-xl font-bold text-slate-900 mb-2">CEO & Co-CEO</h3>
                            <p class="text-slate-600 text-sm leading-relaxed">Penanggung jawab utama atas efisiensi, kultur, dan pencapaian target strategis SEEO FT UNSOED.</p>
                        </div>
                    </div>
                </div>

                <!-- Departments Grid -->
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold text-slate-900 mb-4">Divisi & Departemen</h2>
                    <p class="text-lg text-slate-600">Pilar pendukung operasional internal maupun ekspansi eksternal.</p>
                </div>

                <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <div v-for="dept in departments" :key="dept.name" class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300">
                        <div class="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                            <img :src="dept.image" :alt="dept.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" @error="$event.target.src=fallbackLogo" />
                        </div>
                        <div class="p-5 flex-1 flex flex-col items-center text-center">
                            <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-700 mb-3 border border-slate-200">
                                <span class="text-lg">{{ dept.icon }}</span>
                            </div>
                            <h4 class="text-lg font-bold text-slate-900">{{ dept.name }}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Summary & Call to Action -->
        <section class="py-24 bg-white border-t border-slate-200">
            <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                <h3 class="text-3xl font-bold text-slate-900 mb-6">Kekuatan Kolektif Terstruktur</h3>
                <p class="text-lg text-slate-600 mb-12 leading-relaxed">
                    Sinkronisasi tata kerja secara vertikal maupun kompartemental guna menjamin kelincahan manuver serta keberlanjutan regenerasi sumber daya berintegritas.
                </p>
                
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pt-8 border-t border-slate-100">
                    <div>
                        <div class="text-4xl font-bold text-blue-600 mb-1">1</div>
                        <div class="text-sm text-slate-500 font-medium">Badan Eksekutif</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold text-blue-600 mb-1">8</div>
                        <div class="text-sm text-slate-500 font-medium">Departemen Utama</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold text-blue-600 mb-1">40+</div>
                        <div class="text-sm text-slate-500 font-medium">Staf Terverifikasi</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold text-blue-600 mb-1">100%</div>
                        <div class="text-sm text-slate-500 font-medium">Sinergi Solid</div>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/activity" class="inline-flex justify-center items-center px-6 py-3.5 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 hover:shadow transition-all duration-200">
                        Laporan Kegiatan
                    </Link>
                    <Link href="/contact" class="inline-flex justify-center items-center px-6 py-3.5 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors duration-200">
                        Hubungi Administrasi
                    </Link>
                </div>
            </div>
        </section>
    </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { Head, Link } from '@inertiajs/vue3';

// Placeholder logic mapping
const logoSrc = '/storage/images/misc/logo.png';
const fallbackLogo = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyNlMmU4ZjAnLz48dGV4dCB4PSc1MCUnIHk9JzUwJScgZmlsbD0nI2EwYWJjMCcgZm9udC1zaXplPScxNScgZm9udC1mYW1pbHk9J3NhbnMtc2VyaWYnIGFsaWdubWVudC1iYXNlbGluZT0nbWlkZGxlJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJz5TQU1QTEUgSU1BR0U8L3RleHQ+PC9zdmc+';

// Departments data omitting top leadership since they have special section
const departments = [
    { name: 'Financial', image: logoSrc, icon: '💰' },
    { name: 'Operating', image: logoSrc, icon: '💼' },
    { name: 'Administration', image: logoSrc, icon: '📝' },
    { name: 'Production', image: logoSrc, icon: '👨‍🍳' },
    { name: 'Marketing Medinfo', image: logoSrc, icon: '💻' },
    { name: 'Sales Distribution', image: logoSrc, icon: '📈' },
    { name: 'Public Relations', image: logoSrc, icon: '📱' },
    { name: 'Human Resources', image: logoSrc, icon: '👥' }
];
</script>