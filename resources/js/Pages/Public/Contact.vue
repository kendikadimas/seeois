<template>
    <Head>
        <title>Hubungi Kami - SEEO FT UNSOED</title>
        <meta name="description" content="Hubungi SEEO FT UNSOED untuk pertanyaan, kerjasama, atau informasi lebih lanjut. Temukan lokasi sekretariat kami di PKM Fakultas Teknik UNSOED Purbalingga.">
        <meta name="keywords" content="organisasi entrepreneur, ukm mahasiswa, website ukm, ukm kewirausahaan, kewirausahaan mahasiswa, organisasi kewirausahaan, ukm unsoed, ukm ft unsoed, kontak seeo">
        <meta property="og:title" content="Hubungi SEEO FT UNSOED">
        <meta property="og:description" content="Punya pertanyaan atau ide kolaborasi? Hubungi kami sekarang.">
    </Head>
    <PublicLayout>
        <!-- Modern Hero Section -->
        <section class="pt-32 pb-20 bg-white overflow-hidden relative">
            <div class="max-w-7xl mx-auto px-6 relative z-10">
                <h1 class="text-6xl md:text-8xl font-black text-[#004182] mb-8 tracking-tight uppercase">
                    Let's <span class="text-[#FFD700]">Connect</span>
                </h1>
                <p class="text-gray-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed mb-12">
                    Punya pertanyaan, ide kolaborasi, atau ingin memberikan masukan? <br class="hidden md:block"> Kami siap mendengar dan membantu Anda.
                </p>

                <!-- Social Links (Integrated) -->
                <div class="flex flex-wrap gap-6 items-center">
                    <a href="https://instagram.com/seeo_unsoed" target="_blank" class="group flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all">
                        <i class="bi bi-instagram text-[#004182] text-xl group-hover:scale-125 transition-transform"></i>
                        <span class="text-[10px] font-black text-[#004182] uppercase tracking-widest">Instagram</span>
                    </a>
                    <a href="#" class="group flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all">
                        <i class="bi bi-linkedin text-[#004182] text-xl group-hover:scale-125 transition-transform"></i>
                        <span class="text-[10px] font-black text-[#004182] uppercase tracking-widest">LinkedIn</span>
                    </a>
                    <a href="#" class="group flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all">
                        <i class="bi bi-youtube text-[#004182] text-xl group-hover:scale-125 transition-transform"></i>
                        <span class="text-[10px] font-black text-[#004182] uppercase tracking-widest">YouTube</span>
                    </a>
                    <a href="#" class="group flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all">
                        <i class="bi bi-tiktok text-[#004182] text-xl group-hover:scale-125 transition-transform"></i>
                        <span class="text-[10px] font-black text-[#004182] uppercase tracking-widest">TikTok</span>
                    </a>
                </div>
            </div>
            <!-- Background Decoration -->
            <!-- <div class="absolute top-0 right-0 w-1/3 h-full bg-[#f8f9fa] -skew-x-12 translate-x-1/2 -z-0"></div> -->
        </section>

        <!-- Contact Channels (Only Essential Info) -->
        <!-- <section class="py-24 bg-white relative z-10 border-t border-gray-50">
            <div class="max-w-7xl mx-auto px-6">
                <div class="grid md:grid-cols-2 gap-12">
                    
                    <div class="group p-10 bg-white rounded-[3rem] border border-gray-100 shadow-xl transition-all hover:border-[#FFD700]">
                        <div class="w-16 h-16 bg-[#004182] text-[#FFD700] rounded-[1.5rem] flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                            <i class="bi bi-geo-alt-fill text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-black text-[#004182] mb-4 uppercase tracking-tight">Sekretariat</h3>
                        <p class="text-gray-500 text-sm leading-[2] font-medium italic">
                            Sekretariat SEEO<br>
                            PKM Fakultas Teknik UNSOED, Purbalingga
                        </p>
                    </div>


                    <div class="group p-10 bg-white rounded-[3rem] border border-gray-100 shadow-xl transition-all hover:border-[#FFD700]">
                        <div class="w-16 h-16 bg-[#FFD700] text-[#004182] rounded-[1.5rem] flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                            <i class="bi bi-envelope-fill text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-black text-[#004182] mb-4 uppercase tracking-tight">Email</h3>
                        <p class="text-gray-500 text-sm leading-[2] font-medium">
                            <a href="mailto:seeoftunsoed@gmail.com" class="hover:text-[#FFD700] transition-colors">seeoftunsoed@gmail.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </section> -->

        <!-- Contact Form Section -->
        <section class="py-24 bg-[#f8f9fa]">
            <div class="max-w-7xl mx-auto px-6">
                <div class="bg-white rounded-[4rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                    <!-- Form Side -->
                    <div class="lg:w-3/5 p-10 md:p-20">
                        <h2 class="text-4xl font-black text-[#004182] mb-12 uppercase tracking-tight">Kirim Pesan</h2>
                        <form @submit.prevent class="space-y-8">
                            <div class="grid md:grid-cols-2 gap-8">
                                <div class="space-y-3">
                                    <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Nama Lengkap</label>
                                    <input type="text" placeholder="John Doe" class="w-full px-8 py-4 bg-gray-50 rounded-full border border-transparent focus:border-[#FFD700] focus:outline-none transition-all font-medium">
                                </div>
                                <div class="space-y-3">
                                    <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Alamat Email</label>
                                    <input type="email" placeholder="john@example.com" class="w-full px-8 py-4 bg-gray-50 rounded-full border border-transparent focus:border-[#FFD700] focus:outline-none transition-all font-medium">
                                </div>
                            </div>
                            <div class="space-y-3">
                                <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Subjek Pesan</label>
                                <input type="text" placeholder="Media Partner / Sponsorship / Lainnya" class="w-full px-8 py-4 bg-gray-50 rounded-full border border-transparent focus:border-[#FFD700] focus:outline-none transition-all font-medium">
                            </div>
                            <div class="space-y-3">
                                <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">Isi Pesan</label>
                                <textarea rows="6" placeholder="Halo kak, saya ingin mengajukan..." class="w-full px-8 py-6 bg-gray-50 rounded-[2rem] border border-transparent focus:border-[#FFD700] focus:outline-none transition-all font-medium resize-none"></textarea>
                            </div>
                            <div class="pt-4">
                                <button class="bg-[#004182] text-white px-10 py-3 rounded-full font-black hover:bg-[#FFD700] hover:text-[#004182] transition-all tracking-[0.1em] text-sm">
                                    Kirim Pesan
                                </button>
                            </div>
                        </form>
                    </div>
                    <!-- Visual Side -->
                    <div class="lg:w-2/5 bg-[#004182] p-20 flex flex-col justify-center text-white relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-64 h-64 border-[30px] border-[#FFD700]/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div class="absolute bottom-0 left-0 w-32 h-32 bg-[#FFD700] rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl opacity-20"></div>
                        
                        <div class="relative z-10">
                            <h3 class="text-3xl font-black mb-8 leading-tight">Mencari Kerjasama Strategis?</h3>
                            <p class="text-white/60 text-lg mb-12 font-medium">Kami sangat terbuka untuk kolaborasi dengan instansi, perusahaan, atau organisasi lain untuk memajukan teknologi di lingkungan kampus.</p>
                            <div class="space-y-6">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                                        <i class="bi bi-telephone-fill"></i>
                                    </div>
                                    <span class="font-bold">+62 812-3456-7890</span>
                                </div>
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                                        <i class="bi bi-clock-fill"></i>
                                    </div>
                                    <span class="font-bold">Senin - Jumat | 09:00 - 17:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Map Section -->
        <section class="h-[500px] bg-gray-100 grayscale hover:grayscale-0 transition-all duration-1000">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d521.3327011582118!2d109.33636630681688!3d-7.428993513373772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6559bc3139f21b%3A0xd5c712f3a50928fe!2sPKM%20Teknik%20Unsoed!5e0!3m2!1sid!2sid!4v1778857389901!5m2!1sid!2sid" 
                class="w-full h-full border-0" 
                allowfullscreen="" 
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        </section>
    </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>
