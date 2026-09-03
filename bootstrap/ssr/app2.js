import axios from "axios";
import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
const ziggyRoute = window.route;
window.route = function(name, params, absolute, config) {
  if (ziggyRoute && typeof ziggyRoute === "function") {
    try {
      return ziggyRoute(name, params, absolute, config);
    } catch (e) {
    }
  }
  const routes = {
    login: "/login",
    register: "/register",
    homepage: "/",
    home: "/",
    dashboard: "/seeo/dashboard",
    structure: "/structure",
    activity: "/activity",
    contact: "/contact",
    about: "/about",
    "password.request": "/forgot-password",
    "password.email": "/forgot-password",
    "password.reset": "/reset-password/{token}",
    "password.store": "/reset-password",
    "password.update": "/password",
    "logout": "/logout"
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
const appName = "Laravel";
window.bootstrap = bootstrap;
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: async (name) => {
    const page = await resolvePageComponent(
      `./Pages/${name}.vue`,
      /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-DtnlRWvX.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-DLwYqAay.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-By4iNGpr.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-C2f89d3h.js"), "./Pages/Auth/RegisterGoogle.vue": () => import("./assets/RegisterGoogle-D84MgKVu.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-DwDV-eLs.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-C-IEKhJJ.js"), "./Pages/Bingo.vue": () => import("./assets/Bingo-Bf3TCKIv.js"), "./Pages/Errors/Default.vue": () => import("./assets/Default-Butp8Xug.js"), "./Pages/Internship/Certificates/Index.vue": () => import("./assets/Index-CLxQZmSQ.js"), "./Pages/Internship/Index.vue": () => import("./assets/Index-DzL47j2X.js"), "./Pages/Internship/Register.vue": () => import("./assets/Register-BG4-R6ad.js"), "./Pages/Public/About.vue": () => import("./assets/About-Byxfc4lW.js"), "./Pages/Public/Activity.vue": () => import("./assets/Activity-B6u7iokm.js"), "./Pages/Public/ActivityDetail.vue": () => import("./assets/ActivityDetail-CmY1FV2V.js"), "./Pages/Public/Contact.vue": () => import("./assets/Contact-CNuoTtSB.js"), "./Pages/Public/Departments.vue": () => import("./assets/Departments-DgVUB_jw.js"), "./Pages/Public/Events.vue": () => import("./assets/Events-BJNVoknm.js"), "./Pages/Public/Homepage.vue": () => import("./assets/Homepage-BBhsAafS.js"), "./Pages/Public/OurBrand.vue": () => import("./assets/OurBrand-BlN3rN4g.js"), "./Pages/Public/Profile.vue": () => import("./assets/Profile-DBitp1D-.js"), "./Pages/Public/Promotion.vue": () => import("./assets/Promotion-CwdEWxXX.js"), "./Pages/Public/SeminarRegister.vue": () => import("./assets/SeminarRegister-ctCdpkIq.js"), "./Pages/Public/Shop.vue": () => import("./assets/Shop-sz9Xtuet.js"), "./Pages/Public/Stand.vue": () => import("./assets/Stand-Ad08amxG.js"), "./Pages/Public/Structure.vue": () => import("./assets/Structure-By9IR4eA.js"), "./Pages/Public/Transaction.vue": () => import("./assets/Transaction-DxX79ENR.js"), "./Pages/Public/Welcome.vue": () => import("./assets/Welcome-hrdq3TVn.js"), "./Pages/Staff/Business/Insight.vue": () => import("./assets/Insight-loJNGJRY.js"), "./Pages/Staff/Business/InsightCashflow.vue": () => import("./assets/InsightCashflow-BbRk7UxT.js"), "./Pages/Staff/Business/MenuBoard.vue": () => import("./assets/MenuBoard-CWiD9vj0.js"), "./Pages/Staff/Business/ProductionPanel.vue": () => import("./assets/ProductionPanel-BwBFRwtT.js"), "./Pages/Staff/Business/Stand.vue": () => import("./assets/Stand-BER-ISUI.js"), "./Pages/Staff/Business/StandCashier.vue": () => import("./assets/StandCashier-BIC23Qf7.js"), "./Pages/Staff/Business/StandDetail.vue": () => import("./assets/StandDetail-8_6oV7uR.js"), "./Pages/Staff/Internship/CertificatesManage.vue": () => import("./assets/CertificatesManage-D7dt20Iw.js"), "./Pages/Staff/Marketing/Activities.vue": () => import("./assets/Activities-Du6lEUmo.js"), "./Pages/Staff/Marketing/Compro.vue": () => import("./assets/Compro-bowogNP-.js"), "./Pages/Staff/Marketing/MarketingCms.vue": () => import("./assets/MarketingCms-Cl5LB5xq.js"), "./Pages/Staff/Marketing/Structures.vue": () => import("./assets/Structures-NlA9NObJ.js"), "./Pages/Staff/Profile.vue": () => import("./assets/Profile-DBkAsXKY.js"), "./Pages/Staff/SEEO/Birthdays.vue": () => import("./assets/Birthdays-ClxPrfOE.js"), "./Pages/Staff/SEEO/CashFlow.vue": () => import("./assets/CashFlow-Q5hjcYvw.js"), "./Pages/Staff/SEEO/CeoPanel.vue": () => import("./assets/CeoPanel-70kB7luc.js"), "./Pages/Staff/SEEO/Dashboard.vue": () => import("./assets/Dashboard-ChMc4IIb.js"), "./Pages/Staff/SEEO/Department.vue": () => import("./assets/Department-C6gd3f4m.js"), "./Pages/Staff/SEEO/Employee.vue": () => import("./assets/Employee-CM0Nmu9E.js"), "./Pages/Staff/SEEO/FinanceFeature.vue": () => import("./assets/FinanceFeature-DJWuMJWA.js"), "./Pages/Staff/SEEO/FinancePanel.vue": () => import("./assets/FinancePanel-CcLyIlXC.js"), "./Pages/Staff/SEEO/IwpPanel.vue": () => import("./assets/IwpPanel-jnNbar14.js"), "./Pages/Staff/SEEO/OperatingPanel.vue": () => import("./assets/OperatingPanel-XEn5Q1gF.js"), "./Pages/Staff/SEEO/PinnedDocs.vue": () => import("./assets/PinnedDocs-BOuJfVll.js"), "./Pages/Staff/SEEO/Program.vue": () => import("./assets/Program-CprrwjTK.js"), "./Pages/Staff/SEEO/SeminarRegistrations.vue": () => import("./assets/SeminarRegistrations-CcKQ2WUm.js"), "./Pages/Staff/SEEO/SeminarRegistrationsDetail.vue": () => import("./assets/SeminarRegistrationsDetail-B8rrNVK0.js"), "./Pages/Staff/SEEO/Structural.vue": () => import("./assets/Structural-CRDcr2-Y.js"), "./Pages/Staff/SEEO/SuperAdminPanel.vue": () => import("./assets/SuperAdminPanel-Ck3JlJwT.js"), "./Pages/Staff/Template.vue": () => import("./assets/Template-zIUKwv4W.js") })
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
//# sourceMappingURL=app2.js.map
