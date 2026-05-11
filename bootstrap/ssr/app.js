import axios from "axios";
import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.route = function(name, params) {
  const routes = {
    login: "/login",
    register: "/register",
    homepage: "/",
    home: "/",
    dashboard: "/seeo/dashboard",
    structure: "/structure",
    activity: "/activity",
    contact: "/contact",
    about: "/about"
  };
  let url = routes[name] || name;
  if (params && typeof params === "object") {
    Object.keys(params).forEach((key) => {
      url = url.replace(`{${key}}`, params[key]);
    });
  }
  return url;
};
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const imageHelperPlugin = {
  install(app, options = {}) {
    const imageUrl = (path) => {
      const cleanPath = path.startsWith("/") ? path.slice(1) : path;
      const paths = [
        `/images/${cleanPath}`,
        `/storage/images/${cleanPath}`,
        `/storage/local/images/${cleanPath}`
      ];
      return paths[0];
    };
    app.config.globalProperties.$imageUrl = imageUrl;
    app.provide("imageUrl", imageUrl);
    app.mixin({
      methods: {
        $imageUrl(path) {
          return imageUrl(path);
        }
      }
    });
  }
};
const appName = "Blaterian";
window.bootstrap = bootstrap;
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: async (name) => {
    const page = await resolvePageComponent(
      `./Pages/${name}.vue`,
      /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-DtnlRWvX.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-DLwYqAay.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-By4iNGpr.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-DzCIXMof.js"), "./Pages/Auth/RegisterGoogle.vue": () => import("./assets/RegisterGoogle-BcSoITtH.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-BAocvqUq.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-CVxjqCoC.js"), "./Pages/Bingo.vue": () => import("./assets/Bingo-C0m6IC1M.js"), "./Pages/Errors/Default.vue": () => import("./assets/Default-BtBYJkIC.js"), "./Pages/Internship/Certificates/Index.vue": () => import("./assets/Index-DcRl9GBJ.js"), "./Pages/Internship/Index.vue": () => import("./assets/Index-B1BLKA5h.js"), "./Pages/Internship/Register.vue": () => import("./assets/Register-fJfyGzXs.js"), "./Pages/Public/About.vue": () => import("./assets/About-C2CAlI_7.js"), "./Pages/Public/Activity.vue": () => import("./assets/Activity-BK9KsP-n.js"), "./Pages/Public/Contact.vue": () => import("./assets/Contact-NgLEcCts.js"), "./Pages/Public/Departments.vue": () => import("./assets/Departments-BIFCM6b5.js"), "./Pages/Public/Events.vue": () => import("./assets/Events-gKJDTUqP.js"), "./Pages/Public/Homepage.vue": () => import("./assets/Homepage-GuWpTIpt.js"), "./Pages/Public/OurBrand.vue": () => import("./assets/OurBrand-CNHacQQN.js"), "./Pages/Public/Profile.vue": () => import("./assets/Profile-CzZDRXmg.js"), "./Pages/Public/Promotion.vue": () => import("./assets/Promotion-_fl_ufdl.js"), "./Pages/Public/Shop.vue": () => import("./assets/Shop-B-oZrolE.js"), "./Pages/Public/Stand.vue": () => import("./assets/Stand-CVjmynf_.js"), "./Pages/Public/Structure.vue": () => import("./assets/Structure-Bt6suCEv.js"), "./Pages/Public/Transaction.vue": () => import("./assets/Transaction-dy0nJ0FI.js"), "./Pages/Public/Welcome.vue": () => import("./assets/Welcome-hrdq3TVn.js"), "./Pages/Staff/Business/Insight.vue": () => import("./assets/Insight-cnBe9FKt.js"), "./Pages/Staff/Business/InsightCashflow.vue": () => import("./assets/InsightCashflow-sCyCg9nv.js"), "./Pages/Staff/Business/Stand.vue": () => import("./assets/Stand-CeEC4IDJ.js"), "./Pages/Staff/Business/StandCashier.vue": () => import("./assets/StandCashier-C2uYjBg9.js"), "./Pages/Staff/Business/StandDetail.vue": () => import("./assets/StandDetail-BI-Su-6J.js"), "./Pages/Staff/Internship/CertificatesManage.vue": () => import("./assets/CertificatesManage-zjinQzFR.js"), "./Pages/Staff/Marketing/Activities.vue": () => import("./assets/Activities-BHkbvtVx.js"), "./Pages/Staff/Marketing/Structures.vue": () => import("./assets/Structures-Di3FSl4d.js"), "./Pages/Staff/Profile.vue": () => import("./assets/Profile-CgOjzkqg.js"), "./Pages/Staff/SEEO/CashFlow.vue": () => import("./assets/CashFlow-Djlj8h_m.js"), "./Pages/Staff/SEEO/Dashboard.vue": () => import("./assets/Dashboard-L0t5TqQe.js"), "./Pages/Staff/SEEO/Department.vue": () => import("./assets/Department-ClPWg7VE.js"), "./Pages/Staff/SEEO/Employee.vue": () => import("./assets/Employee-CCjBIZOR.js"), "./Pages/Staff/SEEO/FinanceFeature.vue": () => import("./assets/FinanceFeature-BoYeJeeP.js"), "./Pages/Staff/SEEO/Program.vue": () => import("./assets/Program-DPPZz37M.js"), "./Pages/Staff/SEEO/Structural.vue": () => import("./assets/Structural-C6kNDGki.js"), "./Pages/Staff/Template.vue": () => import("./assets/Template-DEYlgFPu.js") })
    );
    return page;
  },
  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) }).use(plugin).use(imageHelperPlugin);
    app.config.globalProperties.route = window.route;
    app.provide("route", window.route);
    return app.mount(el);
  },
  progress: {
    color: "#0d6efd",
    showSpinner: true,
    delay: 250
    // Hanya tampilkan jika loading > 250ms
  }
});
//# sourceMappingURL=app.js.map
