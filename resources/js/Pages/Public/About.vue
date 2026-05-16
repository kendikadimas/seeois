<template>
    <Head>
        <title>Tentang Kami - SEEO FT UNSOED</title>
        <meta name="description" content="Pelajari lebih dalam tentang SEEO FT UNSOED, visi misi kami dalam mencetak enterpreneur muda, serta sejarah perjalanan organisasi kami di Fakultas Teknik Universitas Jenderal Soedirman.">
        <meta name="keywords" content="organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, tentang seeo">
        <meta property="og:title" content="Tentang SEEO - Visi, Misi, dan Sejarah">
        <meta property="og:description" content="Mencetak talenta enterpreneur masa depan di Fakultas Teknik UNSOED.">
    </Head>
    <PublicLayout>
        <!-- Modern Hero Section -->
        <section class="pt-32 pb-20 bg-white overflow-hidden relative">
            <div class="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <!-- <div class="inline-block px-4 py-1.5 bg-[#FFD700]/10 text-[#004182] font-black text-[10px] uppercase tracking-[0.3em] rounded-full mb-8 border border-[#FFD700]/20">
                    Our Vision
                </div> -->
                <h1 class="text-6xl md:text-8xl font-black text-[#004182] mb-8 tracking-tight uppercase">
                    About <span class="text-[#FFD700]">SEEO</span>
                </h1>
                <p class="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                    Student Entrepreneur and Empowerment Organization (SEEO) adalah Unit Kegiatan Mahasiswa resmi di lingkungan Fakultas Teknik Universitas Jenderal Soedirman.
                </p>
            </div>
            <!-- Background Decoration -->
            <div class="absolute top-0 right-0 w-1/3 h-full bg-[#f8f9fa] -skew-x-12 translate-x-1/2 -z-0"></div>
        </section>

        <!-- History Section -->
        <section class="py-24 bg-white relative z-10">
            <div class="max-w-7xl mx-auto px-6">
                <div class="flex flex-col lg:flex-row items-center gap-20">
                    <div class="lg:w-1/2 relative">
                        <div class="absolute -top-10 -left-10 w-32 h-32 bg-[#FFD700]/20 rounded-full blur-3xl"></div>
                        <div class="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white bg-[#004182] p-20">
                            <img :src="logoSrc" alt="SEEO Logo" class="w-full h-auto drop-shadow-2xl" @error="$event.target.src='/storage/images/compro/logo.png'">
                        </div>
                    </div>
                    <div class="lg:w-1/2 space-y-8">
                        <h2 class="text-4xl font-black text-[#004182] uppercase tracking-tight">Latar Belakang</h2>
                        <div class="w-20 h-2 bg-[#FFD700]"></div>
                        <div class="prose prose-lg text-gray-500 font-medium leading-relaxed">
                            <p>
                                SEEO didirikan sebagai representasi nyata Fakultas Teknik UNSOED dalam merengkuh talenta kreatif yang memiliki intensi mendirikan mandiri finansial di era industri modern.
                            </p>
                            <p>
                                Beroperasi di bawah arahan dekanat sebagai Unit Kegiatan Mahasiswa, fokus kami adalah menekan gap antara perlakuan akademis teoretis dengan keagresifan pasar di lapangan, serta memastikan pengalihan wawasan itu dilakukan dengan standar manajerial level profesional.
                            </p>
                        </div>
                        <div class="grid grid-cols-2 gap-8 pt-8">
                            <div>
                                <h4 class="text-4xl font-black text-[#004182]">2020</h4>
                                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">TAHUN BERDIRI</p>
                            </div>
                            <div>
                                <h4 class="text-4xl font-black text-[#004182]">8</h4>
                                <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Departemen</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Vision & Mission -->
        <section class="py-32 bg-[#004182] relative overflow-hidden">
            <div class="max-w-7xl mx-auto px-6 relative z-10">
                <div class="grid lg:grid-cols-2 gap-16">
                    <!-- Vision -->
                    <div class="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10">
                        <div class="w-16 h-16 bg-[#FFD700] text-[#004182] rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                            <i class="bi bi-eye-fill text-2xl"></i>
                        </div>
                        <h3 class="text-3xl font-black text-white mb-6 uppercase tracking-tight">Visi</h3>
                        <p class="text-white/70 text-lg leading-[2] font-medium italic">
                            "Menjadi Unit Kegiatan Mahasiswa Kewirausahaan yang unggul, inovatif, tangguh, dan berkelanjutan dari semua lini kompartemen Fakultas Teknik UNSOED."
                        </p>
                    </div>

                    <!-- Mission -->
                    <!-- Mission -->
                    <div class="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10">
                        <div class="w-16 h-16 bg-white text-[#004182] rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                            <i class="bi bi-bullseye text-2xl"></i>
                        </div>
                        <h3 class="text-3xl font-black text-white mb-6 uppercase tracking-tight">Misi</h3>
                        <ul class="space-y-6 list-none p-0 m-0">
                            <li class="flex gap-4 text-white/70 font-medium">
                                <span class="w-6 h-6 bg-[#FFD700] rounded-full flex-shrink-0 flex items-center justify-center text-[#004182] font-black text-xs">1</span>
                                <p>Mengekstraksikan keseimbangan wawasan teoretis dan uji klinis praktik pasar yang adaptif.</p>
                            </li>
                            <li class="flex gap-4 text-white/70 font-medium">
                                <span class="w-6 h-6 bg-[#FFD700] rounded-full flex-shrink-0 flex items-center justify-center text-[#004182] font-black text-xs">2</span>
                                <p>Memfasilitasi ekosistem kolaborasi harmonis baik persatuan internal maupun mitra instansi berafiliasi eksternal.</p>
                            </li>
                            <li class="flex gap-4 text-white/70 font-medium">
                                <span class="w-6 h-6 bg-[#FFD700] rounded-full flex-shrink-0 flex items-center justify-center text-[#004182] font-black text-xs">3</span>
                                <p>Menjadi inkubator pencetak kemandirian komersial mahasiswa teknik.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- Decorative Background -->
            <div class="absolute -bottom-20 -right-20 w-96 h-96 bg-[#FFD700] rounded-full opacity-5 blur-3xl"></div>
        </section>

        <!-- Values Section -->
        <!-- <section class="py-32 bg-white">
            <div class="max-w-7xl mx-auto px-6">
                <div class="text-center mb-20">
                    <h2 class="text-[#004182] font-black text-4xl md:text-5xl mb-4 uppercase tracking-tight">Fundamental Values</h2>
                    <div class="w-24 h-2 bg-[#FFD700] mx-auto mb-6"></div>
                    <p class="text-gray-500 max-w-2xl mx-auto font-medium">Standar pedoman etika setiap aktivitas kemahasiswaan kami.</p>
                </div>

                <div class="grid md:grid-cols-3 gap-12">
                    <div class="text-center group">
                        <div class="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-gray-100 group-hover:bg-[#FFD700] group-hover:scale-110 transition-all duration-500">
                            <i class="bi bi-lightning text-4xl text-[#004182]"></i>
                        </div>
                        <h4 class="text-xl font-black text-[#004182] mb-4 uppercase tracking-tight">Inovatif</h4>
                        <p class="text-gray-500 text-sm leading-relaxed font-medium">Keluwesan taktik pemasaran dan modernisasi administrasi internal.</p>
                    </div>

                    <div class="text-center group">
                        <div class="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-gray-100 group-hover:bg-[#004182] group-hover:text-[#FFD700] group-hover:scale-110 transition-all duration-500">
                            <i class="bi bi-people text-4xl"></i>
                        </div>
                        <h4 class="text-xl font-black text-[#004182] mb-4 uppercase tracking-tight">Kolaboratif</h4>
                        <p class="text-gray-500 text-sm leading-relaxed font-medium">Prinsip keterlibatan jejaring ekosistem dalam setiap langkah organisasi.</p>
                    </div>

                    <div class="text-center group">
                        <div class="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-gray-100 group-hover:bg-[#FFD700] group-hover:scale-110 transition-all duration-500">
                            <i class="bi bi-award text-4xl text-[#004182]"></i>
                        </div>
                        <h4 class="text-xl font-black text-[#004182] mb-4 uppercase tracking-tight">Keunggulan Etis</h4>
                        <p class="text-gray-500 text-sm leading-relaxed font-medium">Prioritas integritas pertanggungjawaban dalam seluruh operasional organisasi.</p>
                    </div>
                </div>
            </div>
        <!-- 4. CTA Section -->
        <section class="py-20 md:py-32 relative overflow-hidden">
            <div class="max-w-7xl mx-auto px-6 relative z-10">
                <div class="bg-gradient-to-br from-[#004182] to-[#002d5a] rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-20 text-left md:text-center relative overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,65,130,0.4)]">
                    <!-- Premium Background Accents -->
                    <div class="absolute top-0 left-0 w-full h-full">
                        <div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFD700] rounded-full blur-[120px] opacity-[0.08]"></div>
                        <div class="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[100px] opacity-[0.05]"></div>
                    </div>
                    
                    <div class="relative z-10 max-w-2xl mx-auto md:mx-auto ml-0">
                        <div class="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[#FFD700] text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                            Join the Movement
                        </div>
                        <h2 class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight uppercase hyphens-auto">
                            Siap <span class="text-[#FFD700]">Berkolaborasi</span><br class="hidden md:block"> Dengan Kami?
                        </h2>
                        <p class="text-white/60 text-base md:text-lg font-medium mb-12 leading-relaxed">
                            Jadilah bagian dari perjalanan SEEO dalam mencetak talenta enterpreneur masa depan. Kami terbuka untuk berbagai bentuk kerjasama strategis.
                        </p>
                        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-center gap-4 md:gap-6">
                            <Link href="/contact" class="w-full sm:w-auto px-10 py-4 bg-[#FFD700] text-[#004182] rounded-xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-white hover:-translate-y-1 transition-all duration-300">
                                Mulai Kerjasama
                            </Link>
                            <Link href="/structure" class="w-full sm:w-auto px-10 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
                                Lihat Tim Kami
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
import { ref } from 'vue';

const logoSrc = ref('/storage/images/compro/logo.png');
</script>