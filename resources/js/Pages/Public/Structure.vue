<template>
    <Head title="Struktur Organisasi - SEEO" />
    <PublicLayout>
        <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
            <div class="absolute inset-0">
                <div class="absolute top-1/4 left-1/6 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
                <div class="absolute bottom-1/4 right-1/6 w-80 h-80 bg-slate-100 rounded-full blur-3xl opacity-30"></div>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20"></div>
            </div>
            <div class="absolute inset-0 opacity-[0.02]" style="background-image: radial-gradient(circle, #1e293b 1px, transparent 1px); background-size: 50px 50px;"></div>
            <div class="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <div class="space-y-8">
                    <div class="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v4h8v-4zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                        </svg>
                        <span class="font-medium">Struktur Organisasi</span>
                    </div>
                    <div>
                        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 leading-tight">
                            <span class="block">Tim</span>
                            <span class="block text-blue-600">Departemen</span>
                            <span class="block text-slate-900">SEEO</span>
                        </h1>
                        <p class="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Mengenal talenta-talenta terbaik yang menjadi motor penggerak inovasi dan pertumbuhan organisasi
                        </p>
                    </div>
                </div>
            </div>
            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 animate-bounce">
                <div class="flex flex-col items-center">
                    <span class="text-sm font-medium mb-2">Jelajahi Tim Kami</span>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </div>
        </section>
        <section class="relative py-32 overflow-hidden">
            <div class="absolute inset-0 bg-slate-50">
                <div class="absolute inset-0 opacity-[0.02]" style="background-image: radial-gradient(circle, #1e293b 1px, transparent 1px); background-size: 30px 30px;"></div>
            </div>
            <div class="relative z-10 max-w-7xl mx-auto px-6">
                <div class="text-center mb-20">
                    <div class="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-6">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Kekuatan Tim
                    </div>
                    <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                        Setiap Departemen,
                        <span class="block text-blue-600">Setiap Keahlian</span>
                    </h2>
                    <p class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Kolaborasi harmonis dari berbagai expertise untuk mencapai visi bersama
                    </p>
                </div>
                <div class="mb-24">
                    <h3 class="text-2xl font-bold text-slate-900 text-center mb-12">Kepemimpinan</h3>
                    <div class="flex justify-center">
                        <div class="group relative max-w-md">
                            <div class="relative overflow-hidden rounded-3xl bg-blue-600 p-1 hover:scale-105 transition-all duration-500">
                                <div class="relative h-80 rounded-3xl overflow-hidden bg-white">
                                    <img :src="logoSrc" alt="CEO & Co-CEO" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                    <div class="absolute -top-4 left-6 bg-blue-600 rounded-2xl p-4 shadow-xl border-4 border-white">
                                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                                        </svg>
                                    </div>
                                    <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h4 class="text-2xl font-bold mb-2">CEO & Co-CEO</h4>
                                        <p class="text-white/80 text-sm">Kepemimpinan strategis dan visi organisasi</p>
                                    </div>
                                    <div class="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <div class="text-center text-white">
                                            <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                            </svg>
                                            <p class="font-semibold">Visioner</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <div v-for="dept in departments" :key="dept.name" class="group relative">
                        <div class="relative overflow-hidden rounded-3xl bg-blue-600 p-1 hover:scale-105 transition-all duration-500">
                            <div class="relative h-72 rounded-3xl overflow-hidden bg-white">
                                <img :src="dept.image" :alt="dept.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                <div class="absolute -top-4 left-6 bg-blue-600 rounded-2xl p-3 shadow-xl border-4 border-white">
                                    <span class="text-white text-xl">{{ dept.icon }}</span>
                                </div>
                                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h4 class="text-xl font-bold mb-1">{{ dept.name }}</h4>
                                    <p class="text-white/80 text-xs">Departemen {{ dept.name }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-32 text-center">
                    <div class="bg-slate-900 rounded-3xl p-16 text-white">
                        <h3 class="text-3xl md:text-4xl font-bold mb-8">Kekuatan Kolektif</h3>
                        <p class="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Setiap departemen berkontribusi dengan keahlian unik mereka untuk menciptakan sinergi yang luar biasa dalam mencapai visi SEEO
                        </p>
                        <div class="grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
                            <div class="text-center">
                                <div class="text-4xl font-bold text-blue-400 mb-2">9</div>
                                <div class="text-slate-400">Departemen</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-bold text-blue-400 mb-2">100+</div>
                                <div class="text-slate-400">Anggota</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-bold text-blue-400 mb-2">1</div>
                                <div class="text-slate-400">Visi Bersama</div>
                            </div>
                        </div>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/activity" class="inline-flex items-center px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                <span>Lihat Kegiatan Tim</span>
                                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </Link>
                            <Link href="/contact" class="inline-flex items-center px-8 py-4 rounded-2xl border-2 border-white text-white font-bold hover:bg-white hover:text-slate-900 transition-all duration-300">
                                <span>Bergabung dengan Kami</span>
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

// Placeholder image
const logoSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';

// Departments data using placeholder to avoid missing asset build failures
const departments = [
    { name: 'CEO & Co-CEO', image: logoSrc, icon: '👑' },
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