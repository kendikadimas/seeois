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
      /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-C6NaytWE.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-Bb7DmuRE.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-B0PIJR59.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-CJFxIpzt.js"), "./Pages/Auth/RegisterGoogle.vue": () => import("./assets/RegisterGoogle-CxHC3tqL.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-H9SZTx-h.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-By6_91Xo.js"), "./Pages/Bingo.vue": () => import("./assets/Bingo-Bf3TCKIv.js"), "./Pages/Errors/Default.vue": () => import("./assets/Default-Butp8Xug.js"), "./Pages/Internship/Certificates/Index.vue": () => import("./assets/Index-C2O5vUtd.js"), "./Pages/Internship/Index.vue": () => import("./assets/Index-D6giiyR3.js"), "./Pages/Internship/Register.vue": () => import("./assets/Register-BG4-R6ad.js"), "./Pages/Public/About.vue": () => import("./assets/About-5V6zVirz.js"), "./Pages/Public/Activity.vue": () => import("./assets/Activity-CamSi-V1.js"), "./Pages/Public/ActivityDetail.vue": () => import("./assets/ActivityDetail-DXVASekA.js"), "./Pages/Public/Contact.vue": () => import("./assets/Contact-gadw3ig3.js"), "./Pages/Public/Departments.vue": () => import("./assets/Departments-C3Eo06K8.js"), "./Pages/Public/Events.vue": () => import("./assets/Events-CvPAkAp2.js"), "./Pages/Public/Homepage.vue": () => import("./assets/Homepage-UqMnsvnM.js"), "./Pages/Public/OurBrand.vue": () => import("./assets/OurBrand-BQfJtnt4.js"), "./Pages/Public/Profile.vue": () => import("./assets/Profile-D6cHk9X5.js"), "./Pages/Public/Promotion.vue": () => import("./assets/Promotion-Nf6_0X2U.js"), "./Pages/Public/SeminarRegister.vue": () => import("./assets/SeminarRegister-6jZIo3li.js"), "./Pages/Public/Shop.vue": () => import("./assets/Shop-COoS8fek.js"), "./Pages/Public/Stand.vue": () => import("./assets/Stand-DNp3BONM.js"), "./Pages/Public/Structure.vue": () => import("./assets/Structure-C4jDR9Dg.js"), "./Pages/Public/Transaction.vue": () => import("./assets/Transaction-C2SybwQl.js"), "./Pages/Public/Welcome.vue": () => import("./assets/Welcome-CgBVmXye.js"), "./Pages/Staff/Business/FoodBalance.vue": () => import("./assets/FoodBalance-CI2fIoN0.js"), "./Pages/Staff/Business/GoodBalance.vue": () => import("./assets/GoodBalance-CnF-A3Gq.js"), "./Pages/Staff/Business/GoodDetail.vue": () => import("./assets/GoodDetail-CFQZlubn.js"), "./Pages/Staff/Business/GoodInsight.vue": () => import("./assets/GoodInsight-CwNkqy2t.js"), "./Pages/Staff/Business/GoodProduct.vue": () => import("./assets/GoodProduct-GhaNhetv.js"), "./Pages/Staff/Business/Insight.vue": () => import("./assets/Insight-Bm3r2xN6.js"), "./Pages/Staff/Business/InsightCashflow.vue": () => import("./assets/InsightCashflow-LK6N6v8-.js"), "./Pages/Staff/Business/MenuBoard.vue": () => import("./assets/MenuBoard-YcXCUks0.js"), "./Pages/Staff/Business/ProductionPanel.vue": () => import("./assets/ProductionPanel-DovgW9hs.js"), "./Pages/Staff/Business/Stand.vue": () => import("./assets/Stand-BjxKJwBr.js"), "./Pages/Staff/Business/StandCashier.vue": () => import("./assets/StandCashier-B_ae3SJs.js"), "./Pages/Staff/Business/StandDetail.vue": () => import("./assets/StandDetail-CeHVYaLj.js"), "./Pages/Staff/Internship/CertificatesManage.vue": () => import("./assets/CertificatesManage-CD-ht5Gc.js"), "./Pages/Staff/Marketing/Activities.vue": () => import("./assets/Activities-B5N3QTrQ.js"), "./Pages/Staff/Marketing/Compro.vue": () => import("./assets/Compro-BEzdmk_C.js"), "./Pages/Staff/Marketing/MarketingCms.vue": () => import("./assets/MarketingCms-BWC8wTj2.js"), "./Pages/Staff/Marketing/Structures.vue": () => import("./assets/Structures-CTM7Etuo.js"), "./Pages/Staff/Profile.vue": () => import("./assets/Profile-C7-aVfFG.js"), "./Pages/Staff/SEEO/Birthdays.vue": () => import("./assets/Birthdays-DJ8hwWLq.js"), "./Pages/Staff/SEEO/CashFlow.vue": () => import("./assets/CashFlow-DKrrIN_A.js"), "./Pages/Staff/SEEO/CeoPanel.vue": () => import("./assets/CeoPanel-DgZHq5bW.js"), "./Pages/Staff/SEEO/Dashboard.vue": () => import("./assets/Dashboard-DwwH7cWW.js"), "./Pages/Staff/SEEO/Department.vue": () => import("./assets/Department-BNw11H8O.js"), "./Pages/Staff/SEEO/Employee.vue": () => import("./assets/Employee-BCsN33XE.js"), "./Pages/Staff/SEEO/FinanceFeature.vue": () => import("./assets/FinanceFeature-DO_IKylP.js"), "./Pages/Staff/SEEO/FinancePanel.vue": () => import("./assets/FinancePanel-BjeFZQpO.js"), "./Pages/Staff/SEEO/IwpPanel.vue": () => import("./assets/IwpPanel-BFP3SyiI.js"), "./Pages/Staff/SEEO/OperatingPanel.vue": () => import("./assets/OperatingPanel-D-jEnGkU.js"), "./Pages/Staff/SEEO/PinnedDocs.vue": () => import("./assets/PinnedDocs-ne_NtQA3.js"), "./Pages/Staff/SEEO/Program.vue": () => import("./assets/Program-CQA8vGZa.js"), "./Pages/Staff/SEEO/SeminarRegistrations.vue": () => import("./assets/SeminarRegistrations-Dfvi1MGO.js"), "./Pages/Staff/SEEO/SeminarRegistrationsDetail.vue": () => import("./assets/SeminarRegistrationsDetail-BpOL0qPk.js"), "./Pages/Staff/SEEO/Structural.vue": () => import("./assets/Structural-DF5MLcHN.js"), "./Pages/Staff/SEEO/SuperAdminPanel.vue": () => import("./assets/SuperAdminPanel-yKHCXlyN.js"), "./Pages/Staff/Template.vue": () => import("./assets/Template-BxaG9pI-.js") })
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
