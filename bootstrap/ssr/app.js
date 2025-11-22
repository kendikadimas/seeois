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
      /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-DtnlRWvX.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-DLwYqAay.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-By4iNGpr.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-DzCIXMof.js"), "./Pages/Auth/RegisterGoogle.vue": () => import("./assets/RegisterGoogle-BcSoITtH.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-BAocvqUq.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-CVxjqCoC.js"), "./Pages/Bingo.vue": () => import("./assets/Bingo-C0m6IC1M.js"), "./Pages/Errors/Default.vue": () => import("./assets/Default-BtBYJkIC.js"), "./Pages/Internship/Certificates/Index.vue": () => import("./assets/Index-f80KFLhg.js"), "./Pages/Internship/Index.vue": () => import("./assets/Index-BQ_kdfvP.js"), "./Pages/Internship/Register.vue": () => import("./assets/Register-fJfyGzXs.js"), "./Pages/Public/About.vue": () => import("./assets/About-Epi_2ndM.js"), "./Pages/Public/Activity.vue": () => import("./assets/Activity-oy9Bz13C.js"), "./Pages/Public/Contact.vue": () => import("./assets/Contact-DENF2D_q.js"), "./Pages/Public/Departments.vue": () => import("./assets/Departments-kuZmKy7m.js"), "./Pages/Public/Events.vue": () => import("./assets/Events-D210OaoW.js"), "./Pages/Public/Homepage.vue": () => import("./assets/Homepage-XbEkhCIC.js"), "./Pages/Public/OurBrand.vue": () => import("./assets/OurBrand-CLhQnxas.js"), "./Pages/Public/Profile.vue": () => import("./assets/Profile-CzZDRXmg.js"), "./Pages/Public/Promotion.vue": () => import("./assets/Promotion-_fl_ufdl.js"), "./Pages/Public/Shop.vue": () => import("./assets/Shop-B-oZrolE.js"), "./Pages/Public/Stand.vue": () => import("./assets/Stand-CVjmynf_.js"), "./Pages/Public/Structure.vue": () => import("./assets/Structure-CcUHKffe.js"), "./Pages/Public/Transaction.vue": () => import("./assets/Transaction-dy0nJ0FI.js"), "./Pages/Public/Welcome.vue": () => import("./assets/Welcome-hrdq3TVn.js"), "./Pages/Staff/Business/Insight.vue": () => import("./assets/Insight-B7F7mJzA.js"), "./Pages/Staff/Business/InsightCashflow.vue": () => import("./assets/InsightCashflow-Cc3yWIJp.js"), "./Pages/Staff/Business/Stand.vue": () => import("./assets/Stand-DwXlDh1H.js"), "./Pages/Staff/Business/StandCashier.vue": () => import("./assets/StandCashier-BAxX1ALy.js"), "./Pages/Staff/Business/StandDetail.vue": () => import("./assets/StandDetail-B9Gt3ZQq.js"), "./Pages/Staff/Internship/CertificatesManage.vue": () => import("./assets/CertificatesManage-BGoMh9cA.js"), "./Pages/Staff/Profile.vue": () => import("./assets/Profile-7DoaR-hu.js"), "./Pages/Staff/SEEO/CashFlow.vue": () => import("./assets/CashFlow-DQ8XlUSR.js"), "./Pages/Staff/SEEO/Dashboard.vue": () => import("./assets/Dashboard-DH0IKYFE.js"), "./Pages/Staff/SEEO/Department.vue": () => import("./assets/Department-DCK2qtge.js"), "./Pages/Staff/SEEO/Employee.vue": () => import("./assets/Employee-DJ2HiWLi.js"), "./Pages/Staff/SEEO/FinanceFeature.vue": () => import("./assets/FinanceFeature-CJ5FUKgt.js"), "./Pages/Staff/SEEO/Program.vue": () => import("./assets/Program-B-aOKpJK.js"), "./Pages/Staff/SEEO/Structural.vue": () => import("./assets/Structural-BSiiteoL.js"), "./Pages/Staff/Template.vue": () => import("./assets/Template-B2JHw1wb.js") })
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
