// import "../css/app.scss";
import "./bootstrap";
import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import imageHelperPlugin from './plugins/imageHelper';

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
window.bootstrap = bootstrap; // Make Bootstrap JS globally accessible if needed
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        );

        // 🎯 CONDITIONAL CSS LOADING
        const isPublicPage =
            name.startsWith("Public/") ||
            name === "Public/Homepage";

        const isAuthPage = name.startsWith("Auth/");

        if (isPublicPage) {
            // ✅ Load Tailwind untuk company profile
            await import("../css/app.css");
        } else if (isAuthPage || name.includes("Staff/") || name.includes("Dashboard")) {
            // ✅ Load Bootstrap untuk auth/dashboard
            await import("../css/bootstrap.css");
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
        color: "#4B5563",
    },
});
