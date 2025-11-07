// import "../css/app.scss";
import "./bootstrap";
import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import imageHelperPlugin from './plugins/imageHelper';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
window.bootstrap = bootstrap; // Make Bootstrap globally accessible

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        );

        // Load additional CSS for public pages (Tailwind)
        const isPublicPage = name.startsWith("Public/") || name === "Public/Homepage";
        
        if (isPublicPage) {
            await import("../css/app.css");
        }

        return page;
    },
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(imageHelperPlugin);

        // Make route function available globally in Vue components
        app.config.globalProperties.route = window.route;

        // Also provide it as a global property
        app.provide("route", window.route);

        return app.mount(el);
    },
    progress: {
        color: "#0d6efd",
        showSpinner: true,
        delay: 250, // Hanya tampilkan jika loading > 250ms
    },
});
