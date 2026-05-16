<template>
    <Head>
        <title>SEEO - Soedirman Engineering Entrepreneurship Organization</title>
        <meta name="description" content="Wadah resmi mahasiswa Fakultas Teknik UNSOED untuk mengembangkan jiwa kepemimpinan dan kewirausahaan. Temukan berita, kegiatan, dan struktur organisasi SEEO di sini.">
        <meta name="keywords" content="organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, SEEO, FT UNSOED">
        <meta property="og:title" content="SEEO FT UNSOED - Empowering Engineers to Lead">
        <meta property="og:description" content="Wadah resmi mahasiswa Fakultas Teknik UNSOED untuk mengembangkan jiwa kepemimpinan dan kewirausahaan.">
    </Head>
    <PublicLayout>
        <!-- 1. Hero Section -->
        <header class="relative h-[100vh]  flex items-center justify-center overflow-hidden bg-[#004182]">
            <div class="absolute inset-0 z-0">
                <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFD700] rounded-full blur-[150px] opacity-10"></div>
                <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-[150px] opacity-10"></div>
            </div>
            
            <div class="relative z-10 max-w-5xl mx-auto px-6 text-center text-white pt-24 pb-20 lg:py-20">
                <h1 class="text-3xl md:text-7xl font-black mb-6 mt-24 tracking-tight leading-[1.2] animate-fade-in uppercase">
                    Soedirman Engineering<br>
                    <span class="text-[#FFD700]">Entrepreneurship </span>Organization
                </h1>
                <p class="text-lg md:text-xl font-medium mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
                    #Set Up Your Mind To Be An Entrepreneur!
                </p>
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
                    <Link href="/about" class="w-full sm:w-auto bg-[#FFD700] hover:bg-[#FFC700] text-[#004182] px-8 py-3.5 lg:px-12 lg:py-5 rounded-full font-black text-sm lg:text-lg shadow-2xl transition-all hover:scale-105 uppercase tracking-widest">
                        Tentang SEEO
                    </Link>
                    <Link href="/contact" class="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 lg:px-12 lg:py-5 rounded-full font-black text-sm lg:text-lg transition-all hover:scale-105 uppercase tracking-widest">
                        Mulai Kolaborasi
                    </Link>
                </div>
            </div>

            <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                <i class="bi bi-chevron-down text-white text-3xl opacity-50"></i>
            </div>
        </header>

        <!-- 2. About SEEO Section -->
        <section class="py-20 lg:py-32 bg-white relative overflow-hidden">
            <div class="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div class="w-full lg:w-1/2 relative">
                    <div class="absolute -top-10 -left-10 w-40 h-40 bg-[#004182]/5 rounded-full blur-3xl"></div>
                    <div class="relative z-10 p-8 lg:p-12 bg-[#004182] rounded-3xl lg:rounded-[3rem] shadow-2xl transform lg:-rotate-3 hover:rotate-0 transition-transform duration-700">
                        <img :src="logoSrc" alt="SEEO Logo" class="w-full h-auto opacity-90 brightness-200">
                    </div>
                </div>
                <div class="w-full lg:w-1/2 space-y-6 lg:space-y-8">
                    <div class="inline-block px-6 py-2 bg-[#004182]/5 text-[#004182] font-black text-[10px] lg:text-xs  tracking-widest rounded-full border border-[#004182]/10">
                        Since 2020
                    </div>
                    <h2 class="text-4xl lg:text-6xl font-black text-[#004182] tracking-tight leading-tight uppercase">
                        What is <span class="text-[#FFD700]">SEEO?</span>
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-500 leading-relaxed font-medium">
                        SEEO merupakan UKM Fakultas Teknik Unsoed yang didirikan sebagai representasi nyata dalam melahirkan talenta kreatif yang memiliki jiwa enterpreneurship. Kami adalah inkubator bisnis mahasiswa yang menggabungkan standar manajerial profesional dengan semangat inovasi teknik.
                    </p>
                    <div class="pt-6">
                        <Link href="/about" class="inline-flex items-center gap-3 font-black text-[#004182] border-b-4 border-[#FFD700] pb-2 text-sm uppercase tracking-widest hover:gap-6 transition-all">
                            Selengkapnya Tentang Kami <i class="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <!-- 3. About Blaterian Section -->
        <section class="py-20 lg:py-32 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-1/3 h-full bg-[#FFD700]/5 -skew-x-12 translate-x-1/2"></div>
            <div class="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
                <div class="w-full lg:w-1/2">
                    <div class="relative rounded-3xl lg:rounded-[4rem] overflow-hidden shadow-2xl group">
                        <img :src="'/images/assets/blaterian.png'" alt="Blaterian" class="w-full h-[350px] lg:h-[500px] object-contain p-12 lg:p-20 group-hover:scale-110 transition-transform duration-700">
                        <div class="absolute bottom-10 left-10 z-20">
                            <!-- <span class="bg-[#FFD700] text-[#004182] px-6 py-2 rounded-full font-black text-xs uppercase shadow-xl tracking-widest">FOOD & BEVERAGE</span> -->
                        </div>
                    </div>
                </div>
                <div class="w-full lg:w-1/2 space-y-6 lg:space-y-8">
                    <!-- <div class="inline-block px-6 py-2 bg-[#FFD700]/10 text-[#004182] font-black text-[10px] lg:text-xs uppercase tracking-widest rounded-full border border-[#FFD700]/20">
                        Strategic Business Unit
                    </div> -->
                    <h2 class="text-4xl lg:text-6xl font-black text-[#004182] tracking-tight leading-tight uppercase">
                        Our Brand: <span class="text-[#FFD700]">Blaterian</span>
                    </h2>
                    <p class="text-lg lg:text-xl text-gray-500 leading-relaxed font-medium">
                        Merek kuliner andalan SEEO yang berfokus pada penyediaan produk makanan, minuman dan produk inovatif. Blaterian bukan sekadar bisnis, melainkan laboratorium nyata tempat kami belajar manajemen produksi, pemasaran kreatif, dan kepuasan pelanggan secara profesional.
                    </p>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 pt-8">
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center shrink-0 text-[#004182]">
                                <i class="bi bi-patch-check-fill text-2xl"></i>
                            </div>
                            <div>
                                <h4 class="font-black text-[#004182] mb-1 uppercase tracking-tight">Kualitas Tinggi</h4>
                                <p class="text-sm text-gray-500 font-medium leading-tight">Standar rasa & produksi yang terjaga.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center shrink-0 text-[#004182]">
                                <i class="bi bi-lightbulb-fill text-2xl"></i>
                            </div>
                            <div>
                                <h4 class="font-black text-[#004182] mb-1 uppercase tracking-tight">Inovasi Menu</h4>
                                <p class="text-sm text-gray-500 font-medium leading-tight">Kreasi menu kreatif dari tangan mahasiswa.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 4. Article SEEO Section -->
        <section v-if="activities && activities.length" class="py-32 bg-white">
            <div class="max-w-7xl mx-auto px-6">
                <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div class="max-w-2xl">
                        <h2 class="text-[#004182] font-black text-3xl lg:text-6xl mb-6 uppercase tracking-tight">Berita <span class="text-[#FFD700]">&</span> Kegiatan</h2>
                        <p class="text-gray-500 text-base lg:text-lg font-medium">Dokumentasi perjalanan kami dalam membangun ekosistem entrepreneurship.</p>
                    </div>
                    <Link href="/activity" class="bg-gray-100 hover:bg-[#FFD700] text-[#004182] px-8 py-3 rounded-full font-bold text-sm transition-all uppercase tracking-widest shadow-inner">
                        Lihat Semua <i class="bi bi-arrow-up-right ml-2"></i>
                    </Link>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    <div v-for="act in activities.slice(0, 3)" :key="act.id" class="group bg-white rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 flex flex-col h-full">
                        <!-- Image Container -->
                        <div class="relative aspect-[4/3] overflow-hidden">
                            <img :src="act.image_url || '/images/placeholder.jpg'" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            <div class="absolute top-4 lg:top-6 left-4 lg:left-6">
                                <span class="px-4 lg:px-5 py-1.5 lg:py-2 bg-[#FFD700] text-[#004182] rounded-full text-[9px] lg:text-[10px] font-black uppercase tracking-widest shadow-lg">
                                    {{ act.category || 'EVENT' }}
                                </span>
                            </div>
                        </div>
                        
                        <!-- Content -->
                        <div class="p-8 lg:p-10 flex flex-col flex-grow">
                            <div class="flex items-center gap-3 text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                                <i class="bi bi-calendar3 text-[#FFD700]"></i>
                                {{ formatDate(act.date) }}
                            </div>
                            
                            <h3 class="text-lg lg:text-xl font-black text-[#004182] mb-4 leading-tight group-hover:text-[#FFD700] transition-colors line-clamp-2 uppercase tracking-tight">
                                {{ act.title }}
                            </h3>
                            
                            <!-- Stripping HTML for excerpt -->
                            <div class="text-gray-500 text-xs lg:text-sm leading-relaxed mb-8 line-clamp-3 font-medium overflow-hidden" 
                                v-text="stripHtml(act.description)">
                            </div>
                            
                            <div class="mt-auto pt-6 border-t border-gray-50">
                                <Link :href="`/activity/${act.slug}`" class="inline-flex items-center gap-2 text-[10px] font-black text-[#004182] uppercase tracking-[0.2em] group/btn">
                                    Read Article 
                                    <i class="bi bi-arrow-right transition-transform group-hover/btn:translate-x-2"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 5. Departments at SEEO Section -->
        <section class="py-32 bg-[#004182] relative overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 border-4 border-[#FFD700]/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div class="max-w-7xl mx-auto px-6 relative z-10">
                <div class="text-center mb-16 lg:mb-20">
                    <h2 class="text-white font-black text-3xl lg:text-6xl mb-6 uppercase tracking-tight">Our <span class="text-[#FFD700]">Departments</span></h2>
                    <p class="text-white/60 text-base lg:text-lg font-medium max-w-2xl mx-auto">Sinergi departemen yang menjalankan roda organisasi SEEO secara profesional.</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <div v-for="(dept, name) in departments" :key="name" class="bg-white/5 backdrop-blur-xl p-8 lg:p-10 rounded-[2rem] lg:rounded-[3rem] border border-white/10 hover:border-[#FFD700]/50 transition-all group flex flex-col h-full">
                        <div class="w-14 h-14 lg:w-16 lg:h-16 bg-[#FFD700] text-[#004182] rounded-2xl flex items-center justify-center mb-6 lg:mb-8 shadow-lg group-hover:scale-110 transition-transform">
                            <i :class="getDeptIcon(name)" class="text-xl lg:text-2xl"></i>
                        </div>
                        <h4 class="text-lg lg:text-xl font-black text-white mb-4 uppercase tracking-tight">{{ name }}</h4>
                        <p class="text-white/60 text-xs lg:text-sm leading-relaxed mb-8">{{ getDeptDesc(name) }}</p>
                        
                        <div class="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
                            <div class="flex items-center gap-2 text-[10px] font-black text-[#FFD700] uppercase tracking-widest">
                                <i class="bi bi-people-fill"></i> {{ dept.length }} Staff
                            </div>
                            <Link href="/structure" class="text-[9px] font-black text-white uppercase tracking-[0.2em] hover:text-[#FFD700] transition-colors">
                                View Team <i class="bi bi-chevron-right ml-1"></i>
                            </Link>
                        </div>
                    </div>
                </div>

                <div class="mt-12 lg:mt-20 text-center">
                    <Link href="/structure" class="inline-block bg-white text-[#004182] px-8 py-3.5 lg:px-10 lg:py-4 rounded-full font-black text-[10px] lg:text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-[#FFD700] hover:scale-105 transition-all">
                        See All SEEO Staff <i class="bi bi-arrow-right-short ml-2"></i>
                    </Link>
                </div>
            </div>
        </section>

        <!-- 6. Video Profile Section -->
        <section class="py-20 lg:py-32 bg-white">
            <div class="max-w-6xl mx-auto px-6">
                <div class="text-center mb-12 lg:mb-16">
                    <h2 class="text-[#004182] font-black text-4xl lg:text-5xl mb-6 uppercase tracking-tight">Profile <span class="text-[#FFD700]">Video</span></h2>
                    <p class="text-gray-500 font-medium">Visualisasi perjalanan dan semangat kami dalam satu video profil.</p>
                </div>
                <div class="relative aspect-video rounded-[2rem] lg:rounded-[4rem] overflow-hidden shadow-2xl group border-4 lg:border-8 border-gray-50">
                    <div class="absolute inset-0 bg-[#004182]/40 z-10 group-hover:bg-[#004182]/20 transition-all"></div>
                    <img :src="'/images/assets/hero.png'" class="w-full h-full object-cover">
                    <div class="absolute inset-0 flex items-center justify-center z-20">
                        <button class="w-16 h-16 lg:w-24 lg:h-24 bg-[#FFD700] text-[#004182] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform ring-4 lg:ring-8 ring-white/20">
                            <i class="bi bi-play-fill text-3xl lg:text-5xl translate-x-1"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- 7. CTA for Contact -->
        <section class="py-20 lg:py-24 bg-[#004182] relative overflow-hidden">
            <div class="absolute inset-0 opacity-10">
                <div class="absolute bottom-10 left-10 w-64 h-64 lg:w-96 lg:h-96 border-[10px] lg:border-[20px] border-[#FFD700] rounded-full -translate-x-1/2 translate-y-1/2"></div>
            </div>
            <div class="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 class="text-3xl lg:text-6xl font-black text-white mb-8 lg:mb-10 leading-tight uppercase tracking-tight">
                    Start Your <span class="text-[#FFD700]">Journey</span> <br> With Us
                </h2>
                <p class="text-white/70 text-base lg:text-lg mb-10 lg:mb-12 font-medium max-w-2xl mx-auto">
                    Apakah Anda memiliki pertanyaan, ingin menjalin kemitraan, atau tertarik bergabung dalam perjalanan kami? Kami selalu terbuka untuk kolaborasi baru.
                </p>
                <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link href="/contact" class="w-full sm:w-auto bg-[#FFD700] text-[#004182] px-8 py-3.5 lg:px-12 lg:py-5 rounded-full font-black text-sm lg:text-lg shadow-2xl hover:scale-105 transition-all uppercase tracking-widest text-center">Hubungi Kami</Link>
                    <a href="mailto:seeoftunsoed@gmail.com" class="text-white font-bold text-xs lg:text-base flex items-center gap-3 hover:text-[#FFD700] transition-colors">
                        <i class="bi bi-envelope-at text-xl lg:text-2xl"></i> seeoftunsoed@gmail.com
                    </a>
                </div>
            </div>
        </section>

    </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

const props = defineProps({
    structures: { type: Array, default: () => [] },
    activities: { type: Array, default: () => [] },
    companyContents: { type: Array, default: () => [] },
    activeSeminars: { type: Array, default: () => [] },
});

const logoSrc = ref('/images/assets/logo.png');

// Helper to strip HTML for excerpt
const stripHtml = (html) => {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

const formatDate = (dateStr) => {
    if (!dateStr) return 'No Date';
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

// Group departments from structures
const departments = computed(() => {
    const groups = {};
    const members = props.structures.filter(s => !s.is_executive);
    members.forEach(m => {
        const dept = m.department_name || 'CEO Internal';
        if (!groups[dept]) groups[dept] = [];
        groups[dept].push(m);
    });
    return groups;
});

const getDeptIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('ceo')) return 'bi bi-person-workspace';
    if (n.includes('marketing')) return 'bi bi-megaphone-fill';
    if (n.includes('production')) return 'bi bi-box-seam-fill';
    if (n.includes('finance')) return 'bi bi-cash-stack';
    if (n.includes('hrd')) return 'bi bi-people-fill';
    if (n.includes('business')) return 'bi bi-graph-up-arrow';
    return 'bi bi-briefcase-fill';
};

const getDeptDesc = (name) => {
    const n = name.toLowerCase();
    if (n.includes('ceo')) return 'Bertanggung jawab atas koordinasi internal dan manajemen operasional harian organisasi.';
    if (n.includes('marketing')) return 'Mengelola strategi branding, promosi, dan hubungan media untuk seluruh lini bisnis SEEO.';
    if (n.includes('production')) return 'Fokus pada pengembangan produk, kontrol kualitas, dan manajemen rantai pasok bisnis.';
    if (n.includes('finance')) return 'Mengatur administrasi keuangan, budgeting, dan pelaporan profitabilitas organisasi.';
    if (n.includes('hrd')) return 'Mengelola pengembangan sumber daya manusia dan menjaga budaya kerja profesional.';
    if (n.includes('business')) return 'Mengeksplorasi peluang kemitraan baru dan pengembangan ekspansi model bisnis.';
    return 'Mendukung kelancaran operasional organisasi melalui tugas-tugas departemen spesifik.';
};
</script>

<style scoped>
@keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
    animation: fade-in 1s ease-out forwards;
}
</style>