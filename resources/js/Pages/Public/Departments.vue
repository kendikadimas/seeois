<template>
    <Head title="Struktur Kabinet - SEEO" />
    <PublicLayout>
        <main>
            <section class="relative bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white pt-48 pb-24 px-6 text-center">
                <div class="relative z-10">
                    <h1 class="text-4xl sm:text-6xl font-black mb-4" style="text-shadow: 0 3px 10px rgba(0,0,0,0.2);">
                        Departemen SEEO
                    </h1>
                    <p class="text-lg text-white/80 max-w-3xl mx-auto">
                        Mengenal individu-individu berbakat yang menjadi motor penggerak di setiap departemen SEEO.
                    </p>
                </div>
            </section>

            <section class="bg-gradient-to-br from-white via-sky-50 to-blue-100 py-20 px-6">
                <div class="max-w-7xl mx-auto">
                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        <div v-for="dept in departments" :key="dept.name"
                            class="relative w-full h-60 rounded-3xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 shadow-lg"
                            :style="{ backgroundImage: `url('${dept.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }">
                            
                            <div class="absolute -top-5 left-6 text-4xl bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg" v-html="dept.icon">
                            </div>
                            
                            <div class="absolute bottom-0 left-0 w-full h-full p-6 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/40 to-transparent">
                                <h3 class="text-white font-bold text-3xl drop-shadow-lg">{{ dept.name }}</h3>
                            </div>
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

// Data statis untuk semua departemen
const departments = [
    { name: 'CEO & Co-CEO', image: '/assets/ceoco.JPG', icon: '👑' },
    { name: 'Financial', image: '/assets/finance.JPG', icon: '💰' },
    { name: 'Operating', image: '/assets/opet.JPG', icon: '💼' },
    { name: 'Administration', image: '/assets/admin.JPG', icon: '📝' },
    { name: 'Production', image: '/assets/prod.JPG', icon: '👨‍🍳' },
    { name: 'Marketing Medinfo', image: '/assets/mm.JPG', icon: '💻' },
    { name: 'Sales Distribution', image: '/assets/ssd.JPG', icon: '📈' },
    { name: 'Public Relation', image: '/assets/pr.JPG', icon: '📱' },
    { name: 'Human Resources', image: '/assets/hr.JPG', icon: '👥' }
];
</script>