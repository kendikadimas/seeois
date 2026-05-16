<template>
    <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        <!-- Tailwind now loaded via compiled app.css; removed CDN to avoid duplication -->
    </Head>

    <div class="public-page min-h-screen bg-white" style="font-family: 'Plus Jakarta Sans', sans-serif;">
        <!-- Modern Navbar -->
        <!-- Modern Floating Navbar -->
        <nav 
            class="fixed top-4 lg:top-6 left-1/2 -translate-x-1/2 w-[92%] lg:w-[95%] max-w-7xl z-50 transition-all duration-500 px-3 md:px-5 lg:px-10 py-3 lg:py-4 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-between" 
            :class="{ 
                '-translate-y-[150%]': isNavbarHidden, 
                'bg-white/95 backdrop-blur-2xl border-gray-100': showScrollTopButton, 
                'bg-white/10 backdrop-blur-md': !showScrollTopButton && page.component === 'Public/Homepage',
                'bg-white shadow-xl': page.component !== 'Public/Homepage'
            }"
        >
            <!-- Logo Area -->
            <Link href="/" class="flex items-center gap-2 lg:gap-3 transition-all duration-300 hover:scale-105 group shrink-0">
                <img :src="logoSrc" alt="SEEO Logo" class="h-8 lg:h-10 w-8 lg:w-10 object-contain" @error="$event.target.src=logoSrc">
                <span class="font-black text-xl lg:text-2xl tracking-tighter" :class="!showScrollTopButton && page.component === 'Public/Homepage' ? 'text-white' : 'text-[#004182]'">SEEO</span>
            </Link>
            
            <!-- Navigation Menu (Desktop Center) -->
            <div class="hidden lg:flex items-center px-2 py-1.5 absolute left-1/2 -translate-x-1/2">
                <Link href="/" class="px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:text-[#FFD700]" :style="page.component === 'Public/Homepage' ? 'color: #FFD700' : ''" :class="page.component !== 'Public/Homepage' ? (!showScrollTopButton && page.component === 'Public/Homepage' ? 'text-white' : 'text-[#004182]') : ''">Home</Link>
                <Link href="/about" class="px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:text-[#FFD700]" :style="page.component === 'Public/About' ? 'color: #FFD700' : ''" :class="page.component !== 'Public/About' ? (!showScrollTopButton && page.component === 'Public/Homepage' ? 'text-white' : 'text-[#004182]') : ''">About</Link>
                <Link href="/activity" class="px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:text-[#FFD700]" :style="page.component === 'Public/Activity' ? 'color: #FFD700' : ''" :class="page.component !== 'Public/Activity' ? (!showScrollTopButton && page.component === 'Public/Homepage' ? 'text-white' : 'text-[#004182]') : ''">Blog</Link>
                <Link href="/structure" class="px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:text-[#FFD700]" :style="page.component === 'Public/Structure' ? 'color: #FFD700' : ''" :class="page.component !== 'Public/Structure' ? (!showScrollTopButton && page.component === 'Public/Homepage' ? 'text-white' : 'text-[#004182]') : ''">Structure</Link>
                <Link href="/contact" class="px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:text-[#FFD700]" :style="page.component === 'Public/Contact' ? 'color: #FFD700' : ''" :class="page.component !== 'Public/Contact' ? (!showScrollTopButton && page.component === 'Public/Homepage' ? 'text-white' : 'text-[#004182]') : ''">Contact</Link>
            </div>
            
            <!-- Action Area (Right) -->
            <div class="hidden lg:flex items-center gap-6 shrink-0">
                <Link v-if="auth_user" href="/seeo/staff/dashboard" class="font-black text-[10px] uppercase tracking-widest hover:text-[#FFD700] transition-all" :class="!showScrollTopButton && page.component === 'Public/Homepage' ? 'text-white' : 'text-[#004182]'">Dashboard</Link>
                <Link v-else href="/login" class="font-black text-[10px] uppercase tracking-widest hover:text-[#FFD700] transition-all" :class="!showScrollTopButton && page.component === 'Public/Homepage' ? 'text-white' : 'text-[#004182]'">Login</Link>
                <Link href="/contact" class="bg-[#FFD700] text-[#004182] px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-white hover:scale-105 transition-all">Hubungi Kami</Link>
            </div>

            <!-- Mobile menu button -->
            <button @click="open = !open" class="lg:hidden p-2 rounded-full transition-colors bg-transparent border-0 outline-none shadow-none" :class="!showScrollTopButton && page.component === 'Public/Homepage' ? 'text-white hover:bg-white/10' : 'text-[#004182] hover:bg-gray-100'">
                <i class="bi" :class="open ? 'bi-x-lg' : 'bi-list'" style="font-size: 1.5rem;"></i>
            </button>

            <!-- Mobile Menu (Inside Floating Nav) -->
            <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform -translate-y-4 opacity-0 scale-95"
                enter-to-class="transform translate-y-0 opacity-100 scale-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="transform translate-y-0 opacity-100 scale-100"
                leave-to-class="transform -translate-y-4 opacity-0 scale-95"
            >
                <div v-if="open" class="lg:hidden absolute top-full left-0 right-0 mt-3 p-5 rounded-3xl bg-white shadow-2xl border border-gray-100 space-y-1">
                    <Link href="/" class="block px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all" :class="page.component === 'Public/Homepage' ? 'bg-[#FFD700]/10 text-[#FFD700]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#004182]'">Home</Link>
                    <Link href="/about" class="block px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all" :class="page.component === 'Public/About' ? 'bg-[#FFD700]/10 text-[#FFD700]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#004182]'">About</Link>
                    <Link href="/activity" class="block px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all" :class="page.component === 'Public/Activity' ? 'bg-[#FFD700]/10 text-[#FFD700]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#004182]'">Blog</Link>
                    <Link href="/structure" class="block px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all" :class="page.component === 'Public/Structure' ? 'bg-[#FFD700]/10 text-[#FFD700]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#004182]'">Structure</Link>
                    <Link href="/contact" class="block px-6 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all" :class="page.component === 'Public/Contact' ? 'bg-[#FFD700]/10 text-[#FFD700]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#004182]'">Contact</Link>
                    <div class="pt-3 border-t border-gray-100 flex flex-col gap-2">
                        <Link v-if="auth_user" href="/seeo/staff/dashboard" class="text-center py-2.5 font-black text-[#004182] uppercase tracking-widest text-[10px]">Dashboard</Link>
                        <Link v-else href="/login" class="text-center py-2.5 font-black text-[#004182] uppercase tracking-widest text-[10px]" :class="page.component === 'Auth/Login' ? 'text-[#FFD700]' : 'text-[#004182]'">Login</Link>
                        <Link href="/contact" class="bg-[#004182] text-white text-center py-3 rounded-2xl font-black shadow-lg uppercase tracking-widest text-[10px]">Hubungi Kami</Link>
                    </div>
                </div>
            </Transition>
        </nav>

        <main :class="{ 'pt-0': page.component === 'Public/Homepage', 'pt-24': page.component !== 'Public/Homepage' }">
            <slot />
        </main>
        
        <!-- Modern Dark Footer -->
        <footer class="bg-[#1a1a1a] text-white pt-20 pb-10 px-6 overflow-hidden">
            <div class="max-w-7xl mx-auto">
                <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
                    <div class="space-y-6">
                        <div class="flex items-center gap-3">
                            <!-- <img :src="logoSrc" alt="Logo" class="h-12 w-12 brightness-0 invert" @error="$event.target.src=logoSrc"> -->
                            <div class="flex flex-col">
                                <span class="font-black text-xl tracking-tight text-white">SEEO</span>
                                <!-- <span class="text-[10px] uppercase text-gray-400 tracking-[0.2em]">Engineering Entrepreneurship</span> -->
                            </div>
                        </div>
                        <p class="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Soedirman Engineering Entrepreneurship Organization. Wadah pengembangan minat bakat kewirausahaan mahasiswa Fakultas Teknik UNSOED.
                        </p>
                        <div class="flex gap-4">
                            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFD700] hover:text-[#004182] transition-all"><i class="bi bi-instagram"></i></a>
                            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFD700] hover:text-[#004182] transition-all"><i class="bi bi-linkedin"></i></a>
                            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFD700] hover:text-[#004182] transition-all"><i class="bi bi-youtube"></i></a>
                            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFD700] hover:text-[#004182] transition-all"><i class="bi bi-tiktok"></i></a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-bold text-lg mb-8 text-white border-b-2 border-[#FFD700] w-fit pb-1">Site Menu</h4>
                        <ul class="space-y-4 text-gray-400 text-sm">
                            <li><Link href="/activity" class="hover:text-yellow-400 transition-colors">Blog</Link></li>
                            <li><Link href="/structure" class="hover:text-yellow-400 transition-colors">Structure</Link></li>
                            <li><Link href="/about" class="hover:text-yellow-400 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" class="hover:text-yellow-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="font-bold text-lg mb-8 text-white border-b-2 border-[#FFD700] w-fit pb-1">Useful Links</h4>
                        <ul class="space-y-4 text-gray-400 text-sm">
                            <li><a href="https://unsoed.ac.id" target="_blank" class="hover:text-yellow-400 transition-colors">Universitas Jenderal Soedirman</a></li>
                            <li><a href="https://ft.unsoed.ac.id" target="_blank" class="hover:text-yellow-400 transition-colors">Fakultas Teknik</a></li>
                            <!-- <li><a href="https://if.ft.unsoed.ac.id" target="_blank" class="hover:text-yellow-400 transition-colors">Informatika Unsoed</a></li> -->
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-bold text-lg mb-8 text-white border-b-2 border-[#FFD700] w-fit pb-1">Contact Us</h4>
                        <ul class="space-y-4 text-gray-400 text-sm">
                            <li class="flex gap-3">
                                <i class="bi bi-geo-alt text-[#FFD700]"></i>
                                <span>Sekre FT Unsoed, Purbalingga</span>
                            </li>
                            <li class="flex gap-3">
                                <i class="bi bi-envelope text-[#FFD700]"></i>
                                <span>seeoftunsoed@gmail.com</span>
                            </li>
                            <li class="flex gap-3">
                                <i class="bi bi-phone text-[#FFD700]"></i>
                                <span>+62 812 3456 7890</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div class="pt-8 border-t border-white/5 text-center">
                    <p class="text-xs text-gray-500 uppercase tracking-widest">
                        &copy; 2026 SEEO UNSOED. Set Up Your Mind To Be An Entrepreneur
                    </p>
                </div>
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

    <!-- SEO Global -->
    <Head>
        <meta name="robots" content="index, follow">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="SEEO FT UNSOED">
        <meta name="twitter:card" content="summary_large_image">
        <link rel="canonical" :href="'https://seeo-unsoed.org' + usePage().url">
    </Head>
</template>

<script setup>
import { Head, Link, usePage } from '@inertiajs/vue3';
import { ref, onMounted, onUnmounted, computed } from 'vue';

// Placeholder logo to avoid missing asset errors during build
const logoSrc = ref('/images/assets/logo.png');

const open = ref(false);
const page = usePage();
const auth_user = computed(() => page.props.auth?.user);
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