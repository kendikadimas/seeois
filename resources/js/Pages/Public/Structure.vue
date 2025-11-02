<template>
    <Head title="Struktur Organisasi - SEEO" />
    <PublicLayout>
        <!-- Hero Section -->
        <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
            <!-- Animated Background -->
            <div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-shift"></div>
            </div>
            
            <!-- Grid Pattern -->
            <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 50px 50px;"></div>
            
            <!-- Organizational Chart Background Elements -->
            <div class="absolute inset-0 overflow-hidden">
                <!-- Connection lines -->
                <svg class="absolute inset-0 w-full h-full" style="z-index: 1;">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3"/>
                            <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.3"/>
                        </linearGradient>
                    </defs>
                    <g class="animate-pulse">
                        <line x1="50%" y1="30%" x2="25%" y2="60%" stroke="url(#lineGradient)" stroke-width="2" stroke-dasharray="10,5"/>
                        <line x1="50%" y1="30%" x2="75%" y2="60%" stroke="url(#lineGradient)" stroke-width="2" stroke-dasharray="10,5"/>
                        <line x1="25%" y1="60%" x2="10%" y2="80%" stroke="url(#lineGradient)" stroke-width="2" stroke-dasharray="10,5"/>
                        <line x1="75%" y1="60%" x2="90%" y2="80%" stroke="url(#lineGradient)" stroke-width="2" stroke-dasharray="10,5"/>
                    </g>
                </svg>
                
                <!-- Floating nodes -->
                <div class="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
                <div class="absolute top-1/2 right-1/4 w-4 h-4 bg-purple-400 rounded-full animate-ping" style="animation-delay: 1s;"></div>
                <div class="absolute bottom-1/4 left-1/2 w-4 h-4 bg-pink-400 rounded-full animate-ping" style="animation-delay: 2s;"></div>
            </div>
            
            <div class="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <div class="space-y-8">
                    <!-- Badge -->
                    <div class="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                        <span class="font-semibold">Struktur Organisasi</span>
                    </div>
                    
                    <!-- Main heading -->
                    <div>
                        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
                            <span class="block">Tim</span>
                            <span class="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Departemen
                            </span>
                            <span class="block text-white">SEEO</span>
                        </h1>
                        <p class="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                            Mengenal talenta-talenta terbaik yang menjadi motor penggerak inovasi dan pertumbuhan organisasi
                        </p>
                    </div>
                </div>
            </div>
            
            <!-- Scroll indicator -->
            <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
                <div class="flex flex-col items-center">
                    <span class="text-sm font-medium mb-2">Jelajahi Tim Kami</span>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </div>
        </section>

        <!-- Departments Grid -->
        <section class="relative py-32 overflow-hidden">
            <!-- Background with subtle animation -->
            <div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <div class="absolute inset-0 opacity-[0.02]" style="background-image: radial-gradient(circle, #3b82f6 1px, transparent 1px); background-size: 30px 30px; animation: slide 30s linear infinite;"></div>
            </div>
            
            <div class="relative z-10 max-w-7xl mx-auto px-6">
                <!-- Section Header -->
                <div class="text-center mb-20">
                    <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Kekuatan Tim
                    </div>
                    <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
                        Setiap Departemen,
                        <span class="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Setiap Keahlian
                        </span>
                    </h2>
                    <p class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Kolaborasi harmonis dari berbagai expertise untuk mencapai visi bersama
                    </p>
                </div>
                
                <!-- Leadership Section -->
                <div class="mb-24">
                    <h3 class="text-2xl font-bold text-slate-900 text-center mb-12">Kepemimpinan</h3>
                    <div class="flex justify-center">
                        <div class="group relative max-w-md">
                            <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-1 hover:scale-105 transition-all duration-500">
                                <div class="relative h-80 rounded-3xl overflow-hidden bg-white">
                                    <img src="/storage/local/images/compro/ceoco.JPG" alt="CEO & Co-CEO" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                    
                                    <!-- Icon -->
                                    <div class="absolute -top-4 left-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-4 shadow-xl border-4 border-white">
                                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                                        </svg>
                                    </div>
                                    
                                    <!-- Content -->
                                    <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h4 class="text-2xl font-bold mb-2">CEO & Co-CEO</h4>
                                        <p class="text-white/80 text-sm">Kepemimpinan strategis dan visi organisasi</p>
                                    </div>
                                    
                                    <!-- Hover overlay -->
                                    <div class="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
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
                
                <!-- Departments Grid -->
                <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <!-- Financial -->
                    <div class="group relative">
                        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-400 to-emerald-500 p-1 hover:scale-105 transition-all duration-500">
                            <div class="relative h-72 rounded-3xl overflow-hidden bg-white">
                                <img src="/storage/local/images/compro/finance.JPG" alt="Financial" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                
                                <div class="absolute -top-4 left-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-3 shadow-xl border-4 border-white">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                                    </svg>
                                </div>
                                
                                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h4 class="text-xl font-bold mb-1">Financial</h4>
                                    <p class="text-white/80 text-xs">Pengelolaan keuangan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Operating -->
                    <div class="group relative">
                        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-400 to-indigo-500 p-1 hover:scale-105 transition-all duration-500">
                            <div class="relative h-72 rounded-3xl overflow-hidden bg-white">
                                <img src="/storage/local/images/compro/opet.JPG" alt="Operating" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                
                                <div class="absolute -top-4 left-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl p-3 shadow-xl border-4 border-white">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                </div>
                                
                                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h4 class="text-xl font-bold mb-1">Operating</h4>
                                    <p class="text-white/80 text-xs">Operasional harian</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Administration -->
                    <div class="group relative">
                        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-400 to-pink-500 p-1 hover:scale-105 transition-all duration-500">
                            <div class="relative h-72 rounded-3xl overflow-hidden bg-white">
                                <img src="/storage/local/images/compro/admin.JPG" alt="Administration" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                
                                <div class="absolute -top-4 left-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-3 shadow-xl border-4 border-white">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                    </svg>
                                </div>
                                
                                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h4 class="text-xl font-bold mb-1">Administration</h4>
                                    <p class="text-white/80 text-xs">Administrasi & dokumentasi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Production -->
                    <div class="group relative">
                        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-400 to-rose-500 p-1 hover:scale-105 transition-all duration-500">
                            <div class="relative h-72 rounded-3xl overflow-hidden bg-white">
                                <img src="/storage/local/images/compro/prod.JPG" alt="Production" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                
                                <div class="absolute -top-4 left-6 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl p-3 shadow-xl border-4 border-white">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                                    </svg>
                                </div>
                                
                                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h4 class="text-xl font-bold mb-1">Production</h4>
                                    <p class="text-white/80 text-xs">Produksi Blaterian Foods</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Marketing Medinfo -->
                    <div class="group relative">
                        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 p-1 hover:scale-105 transition-all duration-500">
                            <div class="relative h-72 rounded-3xl overflow-hidden bg-white">
                                <img src="/storage/local/images/compro/mm.JPG" alt="Marketing Medinfo" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                
                                <div class="absolute -top-4 left-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-3 shadow-xl border-4 border-white">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                
                                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h4 class="text-xl font-bold mb-1">Marketing Medinfo</h4>
                                    <p class="text-white/80 text-xs">Digital marketing & media</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Sales Distribution -->
                    <div class="group relative">
                        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-400 to-green-500 p-1 hover:scale-105 transition-all duration-500">
                            <div class="relative h-72 rounded-3xl overflow-hidden bg-white">
                                <img src="/storage/local/images/compro/ssd.JPG" alt="Sales Distribution" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                
                                <div class="absolute -top-4 left-6 bg-gradient-to-br from-teal-400 to-green-500 rounded-2xl p-3 shadow-xl border-4 border-white">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                                    </svg>
                                </div>
                                
                                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h4 class="text-xl font-bold mb-1">Sales Distribution</h4>
                                    <p class="text-white/80 text-xs">Penjualan & distribusi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Public Relations -->
                    <div class="group relative">
                        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-400 to-purple-500 p-1 hover:scale-105 transition-all duration-500">
                            <div class="relative h-72 rounded-3xl overflow-hidden bg-white">
                                <img src="/storage/local/images/compro/pr.JPG" alt="Public Relations" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                
                                <div class="absolute -top-4 left-6 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl p-3 shadow-xl border-4 border-white">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v10a2 2 0 002 2h6a2 2 0 002-2V7H7z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11v6m4-6v6"/>
                                    </svg>
                                </div>
                                
                                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h4 class="text-xl font-bold mb-1">Public Relations</h4>
                                    <p class="text-white/80 text-xs">Hubungan masyarakat</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Human Resources -->
                    <div class="group relative">
                        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-400 to-red-500 p-1 hover:scale-105 transition-all duration-500">
                            <div class="relative h-72 rounded-3xl overflow-hidden bg-white">
                                <img src="/storage/local/images/compro/hr.JPG" alt="Human Resources" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                
                                <div class="absolute -top-4 left-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-3 shadow-xl border-4 border-white">
                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                </div>
                                
                                <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h4 class="text-xl font-bold mb-1">Human Resources</h4>
                                    <p class="text-white/80 text-xs">Pengembangan SDM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Team Strength Section -->
                <div class="mt-32 text-center">
                    <div class="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-16 text-white">
                        <h3 class="text-3xl md:text-4xl font-bold mb-8">Kekuatan Kolektif</h3>
                        <p class="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Setiap departemen berkontribusi dengan keahlian unik mereka untuk menciptakan sinergi yang luar biasa dalam mencapai visi SEEO
                        </p>
                        
                        <!-- Team stats -->
                        <div class="grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
                            <div class="text-center">
                                <div class="text-4xl font-black text-cyan-400 mb-2">9</div>
                                <div class="text-white/70">Departemen</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-black text-blue-400 mb-2">100+</div>
                                <div class="text-white/70">Anggota</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-black text-purple-400 mb-2">1</div>
                                <div class="text-white/70">Visi Bersama</div>
                            </div>
                        </div>
                        
                        <!-- CTA -->
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

// Data statis untuk semua departemen
const departments = [
    { name: 'CEO & Co-CEO', image: '/storage/local/images/compro/ceoco.JPG', icon: '👑' },
    { name: 'Financial', image: '/storage/local/images/compro/finance.JPG', icon: '💰' },
    { name: 'Operating', image: '/storage/local/images/compro/opet.JPG', icon: '💼' },
    { name: 'Administration', image: '/storage/local/images/compro/admin.JPG', icon: '📝' },
    { name: 'Production', image: '/storage/local/images/compro/prod.JPG', icon: '👨‍🍳' },
    { name: 'Marketing Medinfo', image: '/storage/local/images/compro/mm.JPG', icon: '💻' },
    { name: 'Sales Distribution', image: '/storage/local/images/compro/ssd.JPG', icon: '📈' },
    { name: 'Public Relation', image: '/storage/local/images/compro/pr.JPG', icon: '📱' },
    { name: 'Human Resources', image: '/storage/local/images/compro/hr.JPG', icon: '👥' }
];
</script>