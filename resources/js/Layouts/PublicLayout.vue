<template>
    <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    </Head>

    <div class="min-h-screen" style="background: white; font-family: 'Poppins', sans-serif;">
        <nav 
            class="py-4 mt-5 px-6 fixed top-0 w-full z-50 transition-transform duration-300" 
            :class="{ '-translate-y-full': isNavbarHidden }"
            style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);"
        >
            <div class="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">
                        <img :src="$imageUrl('compro/logo.png')" alt="SEEO Logo" class="h-8 w-8 rounded-md">
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-xl" style="color: #111827;">SEEO</span>
                    </div>
                </Link>
                
                <ul class="hidden md:flex items-center gap-8 text-sm font-medium">
                    <li>
                        <Link href="/" :class="linkClass('Public/Homepage')" class="nav-link px-5 py-2 rounded-lg" :style="getLinkStyle('Public/Homepage')">
                            Beranda
                        </Link>
                    </li>
                    <!-- <li>
                        <Link href="/about" :class="linkClass('Public/About')" class="nav-link px-5 py-2 rounded-lg" :style="getLinkStyle('Public/About')">
                            Tentang
                        </Link>
                    </li> -->
                    <li>
                        <Link href="/structure" :class="linkClass('Public/Structure')" class="nav-link px-5 py-2 rounded-lg" :style="getLinkStyle('Public/Structure')">
                            Struktur
                        </Link>
                    </li>
                    <li>
                        <Link href="/activity" :class="linkClass('Public/Activity')" class="nav-link px-5 py-2 rounded-lg" :style="getLinkStyle('Public/Activity')">
                            Kegiatan
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" :class="linkClass('Public/Contact')" class="nav-link px-5 py-2 rounded-lg" :style="getLinkStyle('Public/Contact')">
                            Kontak
                        </Link>
                    </li>
                </ul>
                
                <!-- Login button di kanan -->
                <div class="hidden md:flex items-center">
                    <Link href="/login" class="text-white text-sm px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105" style="background: linear-gradient(135deg, #fbbf24, #f59e0b); box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4);">
                        Login
                    </Link>
                </div>

                <!-- Mobile menu button -->
                <button @click="open = !open" class="md:hidden text-xl p-2 rounded-md transition-colors" style="color: #374151; background-color: #f3f4f6;">
                    <span v-if="!open">☰</span>
                    <span v-else>✕</span>
                </button>
            </div>

            <!-- Mobile Menu -->
            <div v-if="open" class="md:hidden mt-4 p-6 rounded-lg space-y-4 text-sm font-medium shadow-xl" style="background: linear-gradient(135deg, #ffffff, #f8fafc); border: 1px solid #e5e7eb;">
                <Link href="/" class="mobile-link block px-4 py-3 rounded-md" style="color: #374151; background-color: #f9fafb;">Beranda</Link>
                <!-- <Link href="/about" class="mobile-link block px-4 py-3 rounded-md" style="color: #374151;">Tentang</Link> -->
                <Link href="/structure" class="mobile-link block px-4 py-3 rounded-md" style="color: #374151;">Struktur</Link>
                <Link href="/activity" class="mobile-link block px-4 py-3 rounded-md" style="color: #374151;">Kegiatan</Link>
                <Link href="/contact" class="mobile-link block px-4 py-3 rounded-md" style="color: #374151;">Kontak</Link>
                <hr style="border-color: #e5e7eb; margin: 1rem 0;" />
                <Link href="/login" class="block text-white text-center px-4 py-3 rounded-md font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105" style="background: linear-gradient(135deg, #fbbf24, #f59e0b);">Login</Link>
            </div>
        </nav>

        <main class="pt-20">
            <slot />
        </main>
        
        <footer class="text-white pt-16 pb-10 px-6" style="background: linear-gradient(135deg, #1f2937, #111827);">
            <div class="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                <div class="md:col-span-2">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-12 h-12 rounded-lg flex items-center justify-center" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">
                            <img :src="$imageUrl('compro/logo.png')" alt="SEEO Logo" class="h-8 w-8 rounded-md">
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
.gap-3 { gap: 0.75rem; }
.gap-8 { gap: 2rem; }
.w-12 { width: 3rem; }
.h-12 { height: 3rem; }
.w-8 { width: 2rem; }
.h-8 { height: 2rem; }
.w-5 { width: 1.25rem; }
.h-5 { height: 1.25rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-full { border-radius: 50%; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-md { border-radius: 0.375rem; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.text-xl { font-size: 1.25rem; }
.text-sm { font-size: 0.875rem; }
.text-xs { font-size: 0.75rem; }
.hidden { display: none; }
.block { display: block; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.transition-all { transition: all 0.3s; }
.duration-300 { transition-duration: 300ms; }
.duration-200 { transition-duration: 200ms; }
.transform { transform: translateZ(0); }
.hover\:scale-105:hover { transform: scale(1.05); }
.hover\:scale-110:hover { transform: scale(1.1); }
.text-white { color: white; }
.text-center { text-align: center; }
.fixed { position: fixed; }
.bottom-8 { bottom: 2rem; }
.right-8 { right: 2rem; }
.z-50 { z-index: 50; }
.shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
.sticky { position: sticky; }
.top-0 { top: 0; }
.relative { position: relative; }
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
</style>