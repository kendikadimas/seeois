<script setup>
import StaffLayout from '@/Layouts/StaffLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';

const props = defineProps({
    env: Object,
    notif: Object
});

const form = useForm({
    google_client_id: props.env.google_client_id || '',
    google_client_secret: props.env.google_client_secret || '',
    google_drive_folder: props.env.google_drive_folder || '',
    app_url: props.env.app_url || '',
});

const submitConfig = () => {
    form.post('/seeo/staff/super-admin/google-drive', {
        preserveScroll: true,
        onSuccess: () => {
            // Optional: Show success message or handle post-save logic
        }
    });
};

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
};
</script>

<template>
    <Head title="Super Admin Panel" />
    <StaffLayout>
        <template #header>
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="font-black text-2xl text-[#004182] uppercase tracking-tighter">Super Admin <span class="text-[#FFD700]">Panel</span></h2>
                    <p class="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Sistem Management & API Configuration</p>
                </div>
                <div class="px-4 py-2 bg-red-100 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-200 animate-pulse">
                    High Privileged Access
                </div>
            </div>
        </template>

        <div class="py-12 px-6 max-w-7xl mx-auto">
            <div class="grid md:grid-cols-2 gap-8">
                <!-- Google Drive Configuration -->
                <div class="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div class="p-8 md:p-12">
                        <div class="flex items-center gap-4 mb-8">
                            <div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#004182]">
                                <i class="bi bi-google-drive text-2xl"></i>
                            </div>
                            <div>
                                <h3 class="text-xl font-black text-[#004182] uppercase tracking-tight">Google Drive API</h3>
                                <p class="text-sm text-gray-400 font-medium">Refresh Token & Connection Status</p>
                            </div>
                        </div>

                        <form @submit.prevent="submitConfig" class="space-y-6 mb-10">
                            <div>
                                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ps-1">Application URL (APP_URL)</label>
                                <input 
                                    v-model="form.app_url"
                                    type="text" 
                                    class="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-[#004182] focus:ring-2 focus:ring-[#004182]/10 focus:border-[#004182] transition-all"
                                    placeholder="Contoh: http://localhost:8000"
                                />
                                <p class="text-[10px] text-gray-400 mt-2 font-medium ps-1">Pastikan URL ini sesuai dengan yang Anda buka di browser saat ini.</p>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ps-1">Client ID</label>
                                    <input 
                                        v-model="form.google_client_id"
                                        type="text" 
                                        class="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-[#004182] focus:ring-2 focus:ring-[#004182]/10 focus:border-[#004182] transition-all"
                                        placeholder="Google Client ID"
                                    />
                                </div>
                                <div>
                                    <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ps-1">Client Secret</label>
                                    <input 
                                        v-model="form.google_client_secret"
                                        type="password" 
                                        class="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-[#004182] focus:ring-2 focus:ring-[#004182]/10 focus:border-[#004182] transition-all"
                                        placeholder="Google Client Secret"
                                    />
                                </div>
                            </div>

                            <div>
                                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ps-1">Google Drive Folder ID</label>
                                <input 
                                    v-model="form.google_drive_folder"
                                    type="text" 
                                    class="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-[#004182] focus:ring-2 focus:ring-[#004182]/10 focus:border-[#004182] transition-all"
                                    placeholder="Google Drive Folder ID (Contoh: 1A2B3C4D...)"
                                />
                                <p class="text-[10px] text-orange-500 mt-2 font-medium ps-1">
                                    <i class="bi bi-exclamation-triangle-fill me-1"></i>
                                    <strong>PENTING:</strong> Masukkan <strong>Folder ID</strong> Anda (deretan karakter unik dari URL folder Google Drive), <strong>BUKAN</strong> nama folder.
                                    Ini sangat penting untuk mencegah bug duplikasi folder tak terbatas di Google Drive Anda.
                                </p>
                            </div>

                            <div class="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                <label class="block text-[9px] font-black text-[#004182] uppercase tracking-widest mb-2 ps-1">Authorized Redirect URI</label>
                                <div class="flex items-center gap-3">
                                    <code class="flex-1 text-[10px] font-bold text-[#004182] break-all truncate">{{ env.callback_uri }}</code>
                                    <button type="button" @click="copyToClipboard(env.callback_uri)" class="text-[#004182] hover:scale-110 transition-transform">
                                        <i class="bi bi-clipboard"></i>
                                    </button>
                                </div>
                                <p class="text-[9px] text-blue-400 mt-2 font-bold uppercase tracking-tighter italic">Copy & paste link ini ke Google Cloud Console</p>
                            </div>
                            
                            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <span class="text-xs font-bold text-gray-500 uppercase tracking-widest">Refresh Token Status</span>
                                <span v-if="env.has_refresh_token" class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[9px] font-black uppercase tracking-widest">Active</span>
                                <span v-else class="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[9px] font-black uppercase tracking-widest">Not Set</span>
                            </div>

                            <button 
                                type="submit"
                                :disabled="form.processing"
                                class="w-full py-4 bg-[#FFD700] text-[#004182] rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-lg hover:shadow-xl transition-all active:scale-95 disabled:opacity-50"
                            >
                                <i class="bi bi-save2 me-2"></i>
                                {{ form.processing ? 'Menyimpan...' : 'Simpan Konfigurasi' }}
                            </button>
                        </form>

                        <div class="bg-[#004182]/5 rounded-3xl p-6 border border-[#004182]/10 mb-6">
                            <p class="text-xs text-gray-600 leading-relaxed font-medium">
                                <i class="bi bi-info-circle-fill text-[#004182] mr-2"></i>
                                Setelah menyimpan Client ID & Secret, klik tombol di bawah untuk mendapatkan <strong>Refresh Token</strong> baru.
                            </p>
                        </div>

                        <a href="/google-drive/auth" class="flex items-center justify-center gap-3 w-full py-5 border-2 border-[#004182] text-[#004182] rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#004182] hover:text-white transition-all">
                            <i class="bi bi-arrow-repeat text-lg"></i>
                            Refresh Google Token
                        </a>
                    </div>
                </div>

                <!-- System Maintenance -->
                <div class="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div class="p-8 md:p-12">
                        <div class="flex items-center gap-4 mb-8">
                            <div class="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                                <i class="bi bi-shield-lock text-2xl"></i>
                            </div>
                            <div>
                                <h3 class="text-xl font-black text-[#004182] uppercase tracking-tight">System Guard</h3>
                                <p class="text-sm text-gray-400 font-medium">Security & Maintenance Tools</p>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center">
                                <div class="text-2xl mb-2"><i class="bi bi-hdd-network text-gray-400"></i></div>
                                <div class="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Cache</div>
                                <div class="text-sm font-black text-[#004182]">Optimized</div>
                            </div>
                            <div class="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center">
                                <div class="text-2xl mb-2"><i class="bi bi-safe text-gray-400"></i></div>
                                <div class="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Backup</div>
                                <div class="text-sm font-black text-[#004182]">Automated</div>
                            </div>
                        </div>

                        <div class="mt-10 p-8 border-2 border-dashed border-gray-100 rounded-[2rem] text-center">
                            <p class="text-xs text-gray-400 font-bold uppercase tracking-widest leading-loose">
                                Additional super admin features<br>will be integrated here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StaffLayout>
</template>
