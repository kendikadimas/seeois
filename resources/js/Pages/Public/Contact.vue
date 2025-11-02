<template>
    <Head title="Hubungi Kami - SEEO" />
    <PublicLayout>
        <main>
            <!-- Hero Section -->
            <section class="relative text-white pt-48 pb-24 px-6 text-center" style="background: linear-gradient(135deg, #1f2937 0%, #374151 50%, #000000 100%);">
                <div class="relative z-10 max-w-7xl mx-auto">
                    <h1 class="text-4xl sm:text-6xl font-black mb-4">Hubungi Kami</h1>
                    <p class="text-lg max-w-3xl mx-auto" style="color: rgba(255, 255, 255, 0.8);">Kami siap mendengar dari Anda. Kirimkan pertanyaan, saran, atau ide kolaborasi melalui informasi di bawah ini.</p>
                </div>
            </section>

            <!-- Contact Section -->
            <section class="py-20 px-4 sm:px-6 lg:px-8" style="background: #f8fafc;">
                <div class="max-w-7xl mx-auto">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <!-- Contact Form -->
                        <div class="bg-white p-8 md:p-10 rounded-2xl shadow-xl">
                            <h2 class="text-3xl font-bold mb-2" style="color: #0f172a;">Kirim Pesan</h2>
                            <p class="mb-8" style="color: #64748b;">Isi formulir di bawah ini dan tim kami akan segera merespons.</p>
                            
                            <form action="#" method="POST" class="space-y-6">
                                <div>
                                    <label for="full-name" class="block text-sm font-medium" style="color: #374151;">Nama Lengkap</label>
                                    <div class="mt-1">
                                        <input type="text" name="full-name" id="full-name" class="block w-full rounded-md shadow-sm sm:text-sm p-3 transition-all duration-200" style="border: 2px solid #d1d5db; background: white;" 
                                               onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'" 
                                               onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'">
                                    </div>
                                </div>
                                <div>
                                    <label for="email" class="block text-sm font-medium" style="color: #374151;">Alamat Email</label>
                                    <div class="mt-1">
                                        <input type="email" name="email" id="email" class="block w-full rounded-md shadow-sm sm:text-sm p-3 transition-all duration-200" style="border: 2px solid #d1d5db; background: white;" 
                                               onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'" 
                                               onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'">
                                    </div>
                                </div>
                                <div>
                                    <label for="message" class="block text-sm font-medium" style="color: #374151;">Pesan</label>
                                    <div class="mt-1">
                                        <textarea id="message" name="message" rows="4" class="block w-full rounded-md shadow-sm sm:text-sm p-3 transition-all duration-200" style="border: 2px solid #d1d5db; background: white; resize: vertical;" 
                                                  onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'" 
                                                  onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"></textarea>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" class="w-full flex justify-center py-3 px-4 border-0 rounded-lg shadow-lg text-sm font-bold text-white transition-all transform hover:scale-105 duration-300" 
                                            style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);"
                                            onmouseover="this.style.background='linear-gradient(135deg, #1d4ed8, #1e40af)'"
                                            onmouseout="this.style.background='linear-gradient(135deg, #3b82f6, #1d4ed8)'">
                                        Kirim Pesan
                                    </button>
                                </div>
                            </form>
                        </div>

                        <!-- Contact Info -->
                        <div>
                            <h2 class="text-3xl font-bold mb-6" style="color: #0f172a;">Informasi Kontak</h2>
                            <ul class="space-y-6" style="color: #64748b;">
                                <!-- Address -->
                                <li class="flex items-start space-x-4">
                                    <div class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300" style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); color: #3b82f6;">
                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 class="font-bold" style="color: #1e293b;">Alamat</h4>
                                        <p>Fakultas Teknik, Universitas Jenderal Soedirman</p>
                                        <p>Purwokerto, Jawa Tengah</p>
                                    </div>
                                </li>
                                
                                <!-- Email -->
                                <li class="flex items-start space-x-4">
                                    <div class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300" style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); color: #3b82f6;">
                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 class="font-bold" style="color: #1e293b;">Email</h4>
                                        <a href="mailto:seeoftunsoed@gmail.com" class="transition-colors duration-200" style="color: #64748b;" 
                                           onmouseover="this.style.color='#3b82f6'" 
                                           onmouseout="this.style.color='#64748b'">seeoftunsoed@gmail.com</a>
                                    </div>
                                </li>
                                
                                <!-- Social Media -->
                                <li class="flex items-start space-x-4">
                                    <div class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300" style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); color: #3b82f6;">
                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.724-1.378l-.701 2.67c-.256.982-.94 2.213-1.398 2.967C9.095 23.707 10.52 24 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.017.001z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 class="font-bold" style="color: #1e293b;">Media Sosial</h4>
                                        <a href="https://instagram.com/seeo_ftunsoed" target="_blank" class="transition-colors duration-200" style="color: #64748b;" 
                                           onmouseover="this.style.color='#3b82f6'" 
                                           onmouseout="this.style.color='#64748b'">@seeo_ftunsoed</a>
                                    </div>
                                </li>

                                <!-- Phone (optional) -->
                                <li class="flex items-start space-x-4">
                                    <div class="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300" style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); color: #3b82f6;">
                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 class="font-bold" style="color: #1e293b;">Telepon</h4>
                                        <p>Hubungi kami melalui email atau media sosial</p>
                                    </div>
                                </li>
                            </ul>

                            <!-- Additional Info Card -->
                           
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </PublicLayout>
</template>

<script setup>
import PublicLayout from '@/Layouts/PublicLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<style scoped>
/* Utility classes sebagai fallback */
.max-w-7xl { max-width: 80rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.grid { display: grid; }
.flex { display: flex; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.justify-center { justify-content: center; }
.space-x-4 > :not([hidden]) ~ :not([hidden]) { margin-left: 1rem; }
.space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: 1.5rem; }
.w-full { width: 100%; }
.w-6 { width: 1.5rem; }
.h-6 { height: 1.5rem; }
.w-12 { width: 3rem; }
.h-12 { height: 3rem; }
.p-3 { padding: 0.75rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-20 { padding-top: 5rem; padding-bottom: 5rem; }
.pt-48 { padding-top: 12rem; }
.pb-24 { padding-bottom: 6rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }
.mt-1 { margin-top: 0.25rem; }
.mt-8 { margin-top: 2rem; }
.rounded-md { border-radius: 0.375rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-2xl { border-radius: 1rem; }
.shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
.shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.875rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-3xl { font-size: 1.875rem; }
.text-4xl { font-size: 2.25rem; }
.text-6xl { font-size: 3.75rem; }
.font-medium { font-weight: 500; }
.font-bold { font-weight: 700; }
.font-black { font-weight: 900; }
.text-center { text-align: center; }
.text-white { color: white; }
.bg-white { background-color: white; }
.block { display: block; }
.flex-shrink-0 { flex-shrink: 0; }
.transition-all { transition: all 0.3s; }
.transition-colors { transition: color 0.2s; }
.duration-200 { transition-duration: 200ms; }
.duration-300 { transition-duration: 300ms; }
.transform { transform: translateZ(0); }
.hover\:scale-105:hover { transform: scale(1.05); }
.border-0 { border-width: 0; }
.relative { position: relative; }
.z-10 { z-index: 10; }

@media (min-width: 640px) {
  .sm\:text-sm { font-size: 0.875rem; }
  .sm\:text-6xl { font-size: 3.75rem; }
  .sm\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
}

@media (min-width: 768px) {
  .md\:p-10 { padding: 2.5rem; }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .lg\:px-8 { padding-left: 2rem; padding-right: 2rem; }
}
</style>