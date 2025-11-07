<template>
    <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    </Head>

    <div class="min-h-screen" style="background: white; font-family: 'Poppins', sans-serif;">
        <nav 
            class="fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4" 
            :class="{ '-translate-y-full': isNavbarHidden }"
            style="background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);"
        >
            <div class="max-w-7xl mx-auto flex items-center justify-between">
                <!-- Logo/Brand - Tetap di Kiri -->
                <Link href="/" class="flex items-center gap-3 transition-all duration-300 hover:scale-105">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style="background: linear-gradient(135deg, #3b82f6, #1e40af);">
                        <img src="/storage/local/images/compro/logo.png" alt="SEEO Logo" class="h-6 w-6 rounded-md" @error="$event.target.src='/storage/local/images/compro/logo.png'">
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-lg" style="color: #1e293b; letter-spacing: -0.02em;">SEEO</span>
                        <!-- <span class="text-xs text-gray-500 -mt-1">Engineering</span> -->
                    </div>
                </Link>
                
                <!-- Navigation Menu (Desktop) - Center -->
                <div class="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-2xl" style="background: rgba(241, 245, 249, 0.6); border: 1px solid rgba(226, 232, 240, 0.8);">
                    <Link href="/" 
                          :class="page.component === 'Public/Homepage' ? 'bg-white shadow-sm' : 'hover:bg-white hover:bg-opacity-60'"
                          class="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300"
                          style="color: #334155;">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        <span class="text-sm font-medium">Beranda</span>
                    </Link>
                    
                    <Link href="/structure" 
                          :class="page.component === 'Public/Structure' ? 'bg-white shadow-sm' : 'hover:bg-white hover:bg-opacity-60'"
                          class="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300"
                          style="color: #334155;">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <span class="text-sm font-medium">Struktur</span>
                    </Link>
                    
                    <Link href="/activity" 
                          :class="page.component === 'Public/Activity' ? 'bg-white shadow-sm' : 'hover:bg-white hover:bg-opacity-60'"
                          class="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300"
                          style="color: #334155;">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                        <span class="text-sm font-medium">Kegiatan</span>
                    </Link>
                    
                    <Link href="/contact" 
                          :class="page.component === 'Public/Contact' ? 'bg-white shadow-sm' : 'hover:bg-white hover:bg-opacity-60'"
                          class="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300"
                          style="color: #334155;">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span class="text-sm font-medium">Kontak</span>
                    </Link>
                </div>
                
                <!-- Login Button -->
                <Link href="/login" class="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white transition-all duration-300 hover:shadow-lg hover:scale-105" style="background: linear-gradient(135deg, #3b82f6, #2563eb); box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                    </svg>
                    <span>Masuk</span>
                </Link>

                <!-- Mobile menu button -->
                <button @click="open = !open" class="lg:hidden p-2.5 rounded-xl transition-all duration-300 hover:bg-gray-100" style="color: #1e293b;">
                    <span v-if="!open">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </span>
                    <span v-else>
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </span>
                </button>
            </div>

            <!-- Mobile Menu -->
            <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
                <div v-if="open" class="lg:hidden mt-4 p-3 rounded-2xl space-y-1 backdrop-filter backdrop-blur-xl" style="background: rgba(255, 255, 255, 0.95); border: 1px solid rgba(226, 232, 240, 0.8); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
                    <Link href="/" 
                          :class="page.component === 'Public/Homepage' ? 'bg-blue-50' : ''"
                          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-gray-50" 
                          style="color: #1e293b;">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        <span class="text-sm font-medium">Beranda</span>
                    </Link>
                    
                    <Link href="/structure" 
                          :class="page.component === 'Public/Structure' ? 'bg-blue-50' : ''"
                          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-gray-50" 
                          style="color: #1e293b;">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <span class="text-sm font-medium">Struktur</span>
                    </Link>
                    
                    <Link href="/activity" 
                          :class="page.component === 'Public/Activity' ? 'bg-blue-50' : ''"
                          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-gray-50" 
                          style="color: #1e293b;">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                        <span class="text-sm font-medium">Kegiatan</span>
                    </Link>
                    
                    <Link href="/contact" 
                          :class="page.component === 'Public/Contact' ? 'bg-blue-50' : ''"
                          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-gray-50" 
                          style="color: #1e293b;">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span class="text-sm font-medium">Kontak</span>
                    </Link>
                    
                    <div style="border-top: 1px solid rgba(226, 232, 240, 0.8); margin: 0.5rem 0;"></div>
                    
                    <Link href="/login" class="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-white transition-all hover:shadow-md" style="background: linear-gradient(135deg, #3b82f6, #2563eb);">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                        </svg>
                        <span class="text-sm">Masuk</span>
                    </Link>
                </div>
            </Transition>
        </nav>

        <main class="pt-20">
            <slot />
        </main>
        
        <footer class="text-white pt-16 pb-10 px-6" style="background: linear-gradient(135deg, #1f2937, #111827);">
            <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                <div class="md:col-span-2">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-12 h-12 rounded-lg flex items-center justify-center" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">
                            <img src="/storage/local/images/compro/logo.png" alt="SEEO Logo" class="h-8 w-8 rounded-md" @error="$event.target.src='/storage/local/images/compro/logo.png'">
                        </div>
                        <div>
                            <h3 class="text-xl font-bold" style="color: #fbbf24;">SEEO</h3>
                        </div>
                    </div>
                    <p class="text-sm mb-6 max-w-md" style="color: #d1d5db; line-height: 1.6;">
                        Bergabunglah dengan komunitas wirausahawan muda Fakultas Teknik UNSOED untuk membangun masa depan bisnis yang lebih cerah.
                    </p>
                </div>
                
                <div>
                    <h4 class="font-semibold mb-4 text-sm uppercase tracking-wider" style="color: #fbbf24;">Tautan Cepat</h4>
                    <ul class="space-y-3 text-sm" style="color: #d1d5db;">
                        <li><Link href="/" class="hover:text-yellow-400 transition-colors duration-200">Beranda</Link></li>
                        <li><Link href="/structure" class="hover:text-yellow-400 transition-colors duration-200">Struktur</Link></li>
                        <li><Link href="/activity" class="hover:text-yellow-400 transition-colors duration-200">Kegiatan</Link></li>
                        <li><Link href="/contact" class="hover:text-yellow-400 transition-colors duration-200">Kontak</Link></li>
                    </ul>
                </div>
                
                <!-- Contact -->
                <div>
                    <h4 class="font-semibold mb-4 text-sm uppercase tracking-wider" style="color: #fbbf24;">Hubungi Kami</h4>
                    <ul class="space-y-3 text-sm" style="color: #d1d5db;">
                        <li>
                            <a href="mailto:seeoftunsoed@gmail.com" class="hover:text-yellow-400 transition-colors duration-200">
                                seeoftunsoed@gmail.com
                            </a>
                        </li>
                        <li>Fakultas Teknik, UNSOED</li>
                        <li>Purwokerto, Jawa Tengah</li>
                    </ul>
                </div>
            </div>
            
            <!-- Copyright -->
            <div class="border-t mt-12 pt-6 text-center text-sm" style="border-color: #374151; color: #9ca3af;">
                <p>&copy; 2025 Soedirman Entrepreneur Engineering Organization. All rights reserved.</p>
            </div>
        </footer>

        <!-- Scroll to Top Button -->
        <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 scale-75 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-75 translate-y-4"
        >
            <button 
                v-show="showScrollTopButton"
                @click="scrollToTop" 
                class="fixed bottom-8 right-8 text-white w-14 h-14 rounded-lg flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 group"
                style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);"
            >
                <svg class="w-6 h-6 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path>
                </svg>
                
                <!-- Ripple effect on click -->
                <div class="absolute inset-0 rounded-lg bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150"></div>
            </button>
        </Transition>
    </div>
</template>

<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import { ref, onMounted, onUnmounted } from 'vue';

const open = ref(false);
const page = usePage();
const showScrollTopButton = ref(false);
const isNavbarHidden = ref(false);
let lastScrollY = 0;

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Show/hide scroll to top button
    showScrollTopButton.value = currentScrollY > 200;
    
    // Show/hide navbar based on scroll direction
    if (currentScrollY > 100) { // Start hiding after 100px scroll
        if (currentScrollY > lastScrollY && currentScrollY > 300) {
            // Scrolling down & past 300px - hide navbar
            isNavbarHidden.value = true;
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up - show navbar
            isNavbarHidden.value = false;
        }
    } else {
        // At top of page - always show navbar
        isNavbarHidden.value = false;
    }
    
    lastScrollY = currentScrollY;
};

const linkClass = (component) => {
    const isActive = page.component === component;
    return isActive ? 'font-semibold' : '';
};

const getLinkStyle = (component) => {
    const isActive = page.component === component;
    if (isActive) {
        return {
            'background': 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            'color': 'white',
            'box-shadow': '0 4px 15px rgba(59, 130, 246, 0.3)',
            'transform': 'translateY(-1px)'
        };
    }
    return {
        'color': '#6b7280',
        'background': 'transparent'
    };
};

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style scoped>
/* Utility classes untuk fallback */
.max-w-7xl { max-width: 80rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-8 { gap: 2rem; }
.w-10 { width: 2.5rem; }
.h-10 { height: 2.5rem; }
.w-12 { width: 3rem; }
.h-12 { height: 3rem; }
.w-8 { width: 2rem; }
.h-8 { height: 2rem; }
.w-4 { width: 1rem; }
.h-4 { height: 1rem; }
.w-5 { width: 1.25rem; }
.h-5 { height: 1.25rem; }
.rounded-2xl { border-radius: 1rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-full { border-radius: 50%; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-md { border-radius: 0.375rem; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.text-xl { font-size: 1.25rem; }
.text-lg { font-size: 1.125rem; }
.text-sm { font-size: 0.875rem; }
.text-xs { font-size: 0.75rem; }
.font-medium { font-weight: 500; }
.hidden { display: none; }
.block { display: block; }
.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.py-1\.5 { padding-top: 0.375rem; padding-bottom: 0.375rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-2\.5 { padding-top: 0.625rem; padding-bottom: 0.625rem; }
.px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.p-2\.5 { padding: 0.625rem; }
.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.transition-all { transition: all 0.3s; }
.duration-300 { transition-duration: 300ms; }
.duration-200 { transition-duration: 200ms; }
.duration-500 { transition-duration: 500ms; }
.transform { transform: translateZ(0); }
.hover\:scale-105:hover { transform: scale(1.05); }
.hover\:scale-110:hover { transform: scale(1.1); }
.text-white { color: white; }
.text-gray-500 { color: #6b7280; }
.text-center { text-align: center; }
.bg-white { background-color: white; }
.hover\:bg-white:hover { background-color: white; }
.hover\:bg-opacity-60:hover { --tw-bg-opacity: 0.6; }
.hover\:bg-gray-50:hover { background-color: #f9fafb; }
.hover\:bg-gray-100:hover { background-color: #f3f4f6; }
.bg-blue-50 { background-color: #eff6ff; }
.-mt-1 { margin-top: -0.25rem; }
.fixed { position: fixed; }
.bottom-8 { bottom: 2rem; }
.right-8 { right: 2rem; }
.z-50 { z-index: 50; }
.shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
.hover\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.sticky { position: sticky; }
.top-0 { top: 0; }
.relative { position: relative; }
.space-y-1 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.25rem; }
.space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.75rem; }
.space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mt-4 { margin-top: 1rem; }
.mt-12 { margin-top: 3rem; }
.pt-6 { padding-top: 1.5rem; }
.pt-16 { padding-top: 4rem; }
.pb-10 { padding-bottom: 2.5rem; }
.uppercase { text-transform: uppercase; }
.tracking-wider { letter-spacing: 0.05em; }
.grid { display: grid; }
.col-span-2 { grid-column: span 2 / span 2; }
.max-w-md { max-width: 28rem; }
.border-t { border-top-width: 1px; }
.inline-flex { display: inline-flex; }
.justify-center { justify-content: center; }
.pt-20 { padding-top: 5rem; }
.-translate-y-full { transform: translateY(-100%); }
.w-14 { width: 3.5rem; }
.h-14 { height: 3.5rem; }
.w-6 { width: 1.5rem; }
.h-6 { height: 1.5rem; }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
.group:hover .-translate-y-0\.5 { transform: translateY(-0.125rem); }
.group:active .group-active\:opacity-20 { opacity: 0.2; }
.absolute { position: absolute; }
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.opacity-0 { opacity: 0; }
.opacity-20 { opacity: 0.2; }
.transition-opacity { transition-property: opacity; }
.duration-150 { transition-duration: 150ms; }

@media (min-width: 768px) {
  .md\:flex { display: flex; }
  .md\:hidden { display: none; }
  .md\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .md\:col-span-2 { grid-column: span 2 / span 2; }
}

@media (min-width: 1024px) {
  .lg\:flex { display: flex !important; }
  .lg\:hidden { display: none !important; }
}

/* Hover effects */
.hover\:text-yellow-400:hover { color: #fbbf24; }

/* Navigation link hover effects */
.nav-link {
    position: relative;
    transition: all 0.3s ease;
}

.nav-link:not(.font-semibold):hover {
    background: rgba(59, 130, 246, 0.1) !important;
    color: #3b82f6 !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* Mobile menu hover effects */
.mobile-link {
    transition: all 0.2s ease;
}

.mobile-link:hover {
    background: rgba(59, 130, 246, 0.1) !important;
    color: #3b82f6 !important;
    transform: translateX(2px);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
}

/* Animation untuk scroll to top button */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.show-scroll-button {
    animation: fadeIn 0.3s ease-out;
}

/* Global link styles - remove underline from all links */
a, button, [role="button"] {
    text-decoration: none !important;
}

a:hover, button:hover, [role="button"]:hover {
    text-decoration: none !important;
}

/* Ensure Inertia Link components don't have underline */
:deep(a) {
    text-decoration: none !important;
}

:deep(a:hover) {
    text-decoration: none !important;
}

:deep(a:focus) {
    text-decoration: none !important;
}
</style>