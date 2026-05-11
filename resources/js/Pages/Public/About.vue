<template>
    <Head title="Tentang SEEO - Student Entrepreneur and Empowerment Organization" />
    <PublicLayout>
        <!-- Hero Section -->
        <section class="relative bg-slate-950 min-h-[calc(100vh-5rem)] flex items-center justify-center border-b border-slate-900 overflow-hidden">
            <!-- Decorative Elements -->
            <div class="absolute inset-0 z-0">
                <div class="absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] -translate-y-1/2"></div>
            </div>

            <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20">
                    Satu Pandangan, Satu Dedikasi.
                </div>
                
                <h1 class="text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
                    Profil <span class="text-blue-500 italic">SEEO</span>
                </h1>
                
                <p class="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                    Institusi mahasiswa resmi di lingkungan Fakultas Teknik Universitas Jenderal Soedirman untuk melahirkan individu bisnis adaptif, inovatif, serta melek digital.
                </p>

                <!-- Scroll Indicator -->
                <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
                    <div class="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent"></div>
                </div>
            </div>
        </section>

        <!-- Prologue / Core Definition -->
        <section class="py-24 bg-slate-50 border-b border-slate-200">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 class="text-3xl font-bold text-slate-900 mb-6">Latar Organisasi</h2>
                        <div class="space-y-4 text-slate-600 leading-relaxed">
                            <p>
                                <strong>Student Entrepreneur and Empowerment Organization (SEEO)</strong> didirikan sebagai representasi nyata Fakultas Teknik UNSOED dalam merengkuh talenta kreatif yang memiliki intensi mendirikan mandiri finansial di era industri modern.
                            </p>
                            <p>
                                Beroperasi di bawah arahan dekanat sebagai Unit Kegiatan Mahasiswa, fokus kami adalah menekan gap antara perlakuan akademis teoretis dengan keagresifan pasar di lapangan, serta memastikan pengalihan wawasan itu dilakukan dengan standar manajerial level profesional.
                            </p>
                        </div>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10">
                            <div class="p-4 bg-white rounded-xl border border-slate-200">
                                <div class="text-2xl font-bold text-blue-600 mb-1">2014</div>
                                <div class="text-xs text-slate-500 font-medium tracking-wide">Tahun Berdiri</div>
                            </div>
                            <div class="p-4 bg-white rounded-xl border border-slate-200">
                                <div class="text-2xl font-bold text-blue-600 mb-1">100+</div>
                                <div class="text-xs text-slate-500 font-medium tracking-wide">SDM Terlatih</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex items-center justify-center min-h-[350px]">
                        <img :src="$imageUrl('compro/logo.png')" alt="Logo SEEO" class="w-2/3 h-auto max-w-[250px] object-contain opacity-90 drop-shadow-lg" @error="$event.target.src=fallbackLogo" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Vision and Mission Section -->
        <section class="py-24 bg-white border-b border-slate-200">
             <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold text-slate-900 mb-4">Visi & Misi</h2>
                    <p class="text-lg text-slate-600 max-w-2xl mx-auto">Fondasi landasan gerak yang mendasari pengambilan keputusan operasional sehari-hari.</p>
                </div>

                <div class="grid md:grid-cols-2 gap-8">
                    <div class="bg-blue-600 rounded-2xl p-10 text-white shadow-md">
                        <div class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        </div>
                        <h3 class="text-2xl font-bold mb-4">Visi</h3>
                        <p class="text-blue-50 leading-relaxed text-lg">
                            Menjadi Unit Kegiatan Mahasiswa Kewirausahaan yang unggul, inovatif, tangguh, dan berkelanjutan dari semua lini kompartemen Fakultas Teknik UNSOED.
                        </p>
                    </div>

                    <div class="bg-slate-50 rounded-2xl p-10 border border-slate-200 shadow-sm">
                        <div class="w-12 h-12 bg-slate-200 text-slate-700 rounded-xl flex items-center justify-center mb-6">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                        </div>
                        <h3 class="text-2xl font-bold text-slate-900 mb-4">Misi</h3>
                        <ul class="space-y-3 text-slate-600">
                            <li class="flex gap-3"><span class="text-blue-600 font-bold">•</span> Mengekstraksikan keseimbangan wawasan teoretis dan uji klinis praktik pasar yang adaptif.</li>
                            <li class="flex gap-3"><span class="text-blue-600 font-bold">•</span> Memfasilitasi ekosistem kolaborasi harmonis baik persatuan internal maupun mitra instansi berafiliasi eksternal.</li>
                            <li class="flex gap-3"><span class="text-blue-600 font-bold">•</span> Menjadi inkubator pencetak kemandirian komersial mahasiswa teknik.</li>
                        </ul>
                    </div>
                </div>
             </div>
        </section>

        <!-- Values Section -->
        <section class="py-24 bg-slate-50">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl font-bold text-slate-900 mb-4">Nilai-Nilai Fundamental</h2>
                    <p class="text-lg text-slate-600">Standar pedoman etika setiap aktivitas kemahasiswaan kami.</p>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <h3 class="text-xl font-bold text-slate-900 mb-3">Inovatif</h3>
                        <p class="text-slate-600 text-sm leading-relaxed">Keluwesan taktik pemasaran dan modernisasi administrasi internal mengikuti dinamisasi regulasi IT.</p>
                    </div>
                    <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <h3 class="text-xl font-bold text-slate-900 mb-3">Kolaboratif</h3>
                        <p class="text-slate-600 text-sm leading-relaxed">Prinsip menolak determinasi eksklusif grup; mewajibkan keterlibatan jejaring ekosistem.</p>
                    </div>
                    <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <h3 class="text-xl font-bold text-slate-900 mb-3">Keunggulan Etis</h3>
                        <p class="text-slate-600 text-sm leading-relaxed">Prioritas integritas pertanggungjawaban legalitas produk atas seluruh profit margin yang diperoleh organisasi.</p>
                    </div>
                </div>
            </div>
        </section>
    </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { Head } from '@inertiajs/vue3';
import { inject } from 'vue';

const imageUrl = inject('imageUrl');
const fallbackLogo = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyNlMmU4ZjAnLz48dGV4dCB4PSc1MCUnIHk9JzUwJScgZmlsbD0nI2EwYWJjMCcgZm9udC1zaXplPScxNScgZm9udC1mYW1pbHk9J3NhbnMtc2VyaWYnIGFsaWdubWVudC1iYXNlbGluZT0nbWlkZGxlJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJz5TQU1QTEUgSU1BR0U8L3RleHQ+PC9zdmc+';
</script>