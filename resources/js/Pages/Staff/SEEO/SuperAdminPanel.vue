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

                        <div class="bg-[#004182]/5 text-[#004182] rounded-3xl p-6 border border-[#004182]/10 mb-8 text-xs font-bold flex gap-4">
                            <div class="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                                <i class="bi bi-shield-lock-fill text-xl"></i>
                            </div>
                            <div>
                                <span class="uppercase tracking-widest text-[9px] block text-amber-600 font-black mb-1">Konfigurasi Dikunci Secara Aman</span>
                                Semua kredensial Google Drive telah ditetapkan dan dikunci secara aman pada file konfigurasi sistem (<code class="bg-[#004182]/10 px-1.5 py-0.5 rounded font-black">filesystems.php</code>) untuk mencegah kesalahan data. Anda hanya perlu melakukan <strong>Refresh Google Token</strong> di bawah jika token kedaluwarsa.
                            </div>
                        </div>

                        <form @submit.prevent class="space-y-6 mb-10 opacity-75">
                            <div>
                                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ps-1">Application URL (APP_URL)</label>
                                <input 
                                    v-model="form.app_url"
                                    type="text" 
                                    disabled
                                    class="w-full px-5 py-4 bg-gray-100 border border-gray-200 rounded-2xl text-sm font-bold text-gray-500 cursor-not-allowed transition-all"
                                    placeholder="Contoh: http://localhost:8000"
                                />
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ps-1">Client ID</label>
                                    <input 
                                        v-model="form.google_client_id"
                                        type="text" 
                                        disabled
                                        class="w-full px-5 py-4 bg-gray-100 border border-gray-200 rounded-2xl text-sm font-bold text-gray-500 cursor-not-allowed transition-all"
                                        placeholder="Google Client ID"
                                    />
                                </div>
                                <div>
                                    <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ps-1">Client Secret</label>
                                    <input 
                                        v-model="form.google_client_secret"
                                        type="password" 
                                        disabled
                                        class="w-full px-5 py-4 bg-gray-100 border border-gray-200 rounded-2xl text-sm font-bold text-gray-500 cursor-not-allowed transition-all"
                                        placeholder="Google Client Secret"
                                    />
                                </div>
                            </div>

                            <div>
                                <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ps-1">Google Drive Folder ID</label>
                                <input 
                                    v-model="form.google_drive_folder"
                                    type="text" 
                                    disabled
                                    class="w-full px-5 py-4 bg-gray-100 border border-gray-200 rounded-2xl text-sm font-bold text-gray-500 cursor-not-allowed transition-all"
                                    placeholder="Google Drive Folder ID"
                                />
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
                        </form>

                        <a href="/google-drive/auth" class="flex items-center justify-center gap-3 w-full py-5 bg-[#004182] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#003162] hover:shadow-xl transition-all">
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
