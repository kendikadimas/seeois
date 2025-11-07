import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        tailwindcss(),
        laravel({
            input: [
                "resources/css/app.css",
                "resources/css/bootstrap.css",
                "resources/js/app.js",
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
    css: {
        preprocessorOptions: {
            css: {
                charset: false,
            },
        },
    },
    // Optimized server config untuk development
    server: {
        host: '127.0.0.1', // Gunakan IP langsung, lebih cepat dari localhost
        port: 5173,
        strictPort: true, // Gagal jika port sudah dipakai
        hmr: {
            host: '127.0.0.1',
            protocol: 'ws', // WebSocket biasa untuk local
            timeout: 5000, // Timeout 5 detik (default 30s)
        },
        watch: {
            usePolling: false, // Disable polling untuk performa lebih baik
            ignored: ['**/vendor/**', '**/node_modules/**', '**/storage/**'],
        },
    },
    // Optimasi build
    build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vue-vendor': ['vue', '@inertiajs/vue3'],
                    'bootstrap': ['bootstrap'],
                    'chart': ['chart.js'],
                },
            },
        },
    },
    // Optimasi dependencies
    optimizeDeps: {
        include: [
            'vue',
            '@inertiajs/vue3',
            'bootstrap',
            'date-fns',
            'vue-select',
        ],
        exclude: ['@tailwindcss/vite'],
    },
});
