<template>
    <Head title="Hubungi Kami - SEEO" />
    <PublicLayout>
        <!-- Hero Section -->
        <section class="relative bg-slate-950 min-h-[calc(100vh-5rem)] flex items-center justify-center border-b border-slate-900 overflow-hidden">
            <!-- Background Decoration -->
            <div class="absolute inset-0 z-0">
                <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-8 border border-blue-500/20">
                    Layanan Administrasi
                </div>
                
                <h1 class="text-5xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
                    Pusat Bantuan & <br />
                    <span class="text-blue-500 italic">Kemitraan</span>
                </h1>
                
                <p class="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                    Akses representasi formal untuk kelimpahan pertukaran informasi, laporan legalitas, dan rancangan strategis korespondensi partnership institusi Anda bersama kami.
                </p>

                <!-- Scroll Indicator -->
                <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
                    <div class="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent"></div>
                </div>
            </div>
        </section>

        <!-- Main Content Core -->
        <section class="py-24 bg-slate-50">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-16">
                    
                    <!-- Form Control Panel -->
                    <div class="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm">
                        <h2 class="text-2xl font-bold text-slate-900 mb-2">Saluran Terpadu Cepat</h2>
                        <p class="text-slate-600 mb-8 border-b border-slate-100 pb-6">Tim Humas kami akan menyinkronisasikan korespondensi via surel paling lambat dalam 2 x 24 Jam hari operasional.</p>
                        
                        <form action="#" method="POST" class="space-y-6">
                            <div>
                                <label for="full-name" class="block text-sm font-bold text-slate-700 mb-1.5">Identitas Lengkap (Instansi) <span class="text-red-500">*</span></label>
                                <input type="text" name="full-name" id="full-name" required placeholder="Cth: Bagas - PT. Teknologi..." 
                                       class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-slate-50 transition-colors p-3.5 border">
                            </div>
                            
                            <div>
                                <label for="email" class="block text-sm font-bold text-slate-700 mb-1.5">Surel Formal / Aktif <span class="text-red-500">*</span></label>
                                <input type="email" name="email" id="email" required placeholder="Cth: corporate@mail.id"
                                       class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-slate-50 transition-colors p-3.5 border">
                            </div>

                            <div>
                                <label for="subject" class="block text-sm font-bold text-slate-700 mb-1.5">Klasifikasi Tujuan <span class="text-red-500">*</span></label>
                                <select id="subject" name="subject" required class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-slate-50 transition-colors p-3.5 border">
                                    <option value="">-- Pilih Kategori --</option>
                                    <option value="partnership">Tawaran Sponsorship & Kemitraan</option>
                                    <option value="business">Eksplorasi Transaksi Blaterian</option>
                                    <option value="academic">Agenda Akademis / Riset</option>
                                    <option value="other">Tanya Jawab Publik & Lainnya</option>
                                </select>
                            </div>
                            
                            <div>
                                <label for="message" class="block text-sm font-bold text-slate-700 mb-1.5">Formulasi Pesan Khusus <span class="text-red-500">*</span></label>
                                <textarea id="message" name="message" rows="5" required placeholder="Uraikan rincian korespondensi..."
                                          class="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-slate-50 transition-colors p-3.5 border resize-y"></textarea>
                            </div>
                            
                            <div class="pt-4">
                                <button type="submit" class="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                                    Transmisikan Formulir
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Company Identifiers Sidebar -->
                    <div class="flex flex-col gap-8 flex-1">
                        <div class="bg-slate-900 rounded-3xl p-10 border border-slate-800 text-white shadow-xl">
                            <h3 class="text-xl font-bold mb-8">Informasi Identitas Official</h3>
                            
                            <ul class="space-y-8">
                                <li class="flex gap-4">
                                    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-slate-200 mb-1">Sekretariat Fisik Pusat</h4>
                                        <p class="text-slate-400 text-sm leading-relaxed">Pusat Kegiatan Kemahasiswaan (PKM)<br/>Fakultas Teknik Universitas Jenderal Soedirman<br/>Sokaraja, Kab. Banyumas, Jawa Tengah</p>
                                    </div>
                                </li>
                                
                                <li class="flex gap-4">
                                    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-slate-200 mb-1">Surat Elektronik (Email)</h4>
                                        <a href="mailto:seeoftunsoed@gmail.com" class="text-blue-400 hover:text-blue-300 text-sm transition-colors">seeoftunsoed@gmail.com</a>
                                        <p class="text-slate-500 text-xs mt-1">Direkomendasikan untuk Partnership Proposal.</p>
                                    </div>
                                </li>
                                
                                <li class="flex gap-4">
                                    <div class="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.724-1.378l-.701 2.67c-.256.982-.94 2.213-1.398 2.967C9.095 23.707 10.52 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017.001z"/></svg>
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-slate-200 mb-1">Sosial Media Publik</h4>
                                        <a href="https://instagram.com/seeo_ftunsoed" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm transition-colors">@seeo_ftunsoed (Instagram)</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                        <div class="bg-blue-50 rounded-3xl p-8 border border-blue-100 flex items-center justify-between shadow-sm">
                            <div class="max-w-[200px]">
                                <h4 class="font-bold text-slate-900 mb-1">Lokasi Kami</h4>
                                <p class="text-xs text-slate-600">Klik visual panduan disamping guna menyusuri rute eksternal melalui peta.</p>
                            </div>
                            <a href="https://g.co/kgs/2X7C39x" target="_blank" class="w-14 h-14 bg-white rounded-full flex items-center justify-center border border-slate-200 text-blue-600 hover:shadow-md transition-shadow">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.928 11.607c-.202-.488-.635-.605-.928-.633V8c0-1.103-.897-2-2-2h-6V4.61c.305-.274.5-.668.5-1.11a1.5 1.5 0 00-3 0c0 .442.195.836.5 1.11V6H5c-1.103 0-2 .897-2 2v2.997l-.082.006A1 1 0 002 12v2a1 1 0 001 1h2v5c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-5h2a1 1 0 001-1v-2c0-.142-.03-.277-.072-.393zM10.5 4.5a.5.5 0 011 0v1.5h-1V4.5zm-5.5 4h14v2h-14V8zm12 11c0 .551-.449 1-1 1H8c-.551 0-1-.449-1-1v-4h10v4zm-5-3h-4v-2h4v2z"/></svg>
                            </a>
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