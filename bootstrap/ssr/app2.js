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
      /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-C6NaytWE.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-Bb7DmuRE.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-B0PIJR59.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-CJFxIpzt.js"), "./Pages/Auth/RegisterGoogle.vue": () => import("./assets/RegisterGoogle-CxHC3tqL.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-H9SZTx-h.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-By6_91Xo.js"), "./Pages/Bingo.vue": () => import("./assets/Bingo-Bf3TCKIv.js"), "./Pages/Errors/Default.vue": () => import("./assets/Default-Butp8Xug.js"), "./Pages/Internship/Certificates/Index.vue": () => import("./assets/Index-DMo_1kl6.js"), "./Pages/Internship/Index.vue": () => import("./assets/Index-BOYQ7Z24.js"), "./Pages/Internship/Register.vue": () => import("./assets/Register-BG4-R6ad.js"), "./Pages/Public/About.vue": () => import("./assets/About-Ct9z2zuT.js"), "./Pages/Public/Activity.vue": () => import("./assets/Activity-BhjSpPZ1.js"), "./Pages/Public/ActivityDetail.vue": () => import("./assets/ActivityDetail-vahOQ2Y5.js"), "./Pages/Public/Contact.vue": () => import("./assets/Contact-CHBqjff7.js"), "./Pages/Public/Departments.vue": () => import("./assets/Departments-DDv89isr.js"), "./Pages/Public/Events.vue": () => import("./assets/Events-D0uHSdeP.js"), "./Pages/Public/Homepage.vue": () => import("./assets/Homepage-DJ7ZC_dv.js"), "./Pages/Public/OurBrand.vue": () => import("./assets/OurBrand-B35fCK2Y.js"), "./Pages/Public/Profile.vue": () => import("./assets/Profile-D6cHk9X5.js"), "./Pages/Public/Promotion.vue": () => import("./assets/Promotion-Nf6_0X2U.js"), "./Pages/Public/SeminarRegister.vue": () => import("./assets/SeminarRegister-m85i11La.js"), "./Pages/Public/Shop.vue": () => import("./assets/Shop-COoS8fek.js"), "./Pages/Public/Stand.vue": () => import("./assets/Stand-DNp3BONM.js"), "./Pages/Public/Structure.vue": () => import("./assets/Structure-Bu4LxuBQ.js"), "./Pages/Public/Transaction.vue": () => import("./assets/Transaction-C2SybwQl.js"), "./Pages/Public/Welcome.vue": () => import("./assets/Welcome-CgBVmXye.js"), "./Pages/Staff/Business/FoodBalance.vue": () => import("./assets/FoodBalance-Cqd0oNIY.js"), "./Pages/Staff/Business/GoodBalance.vue": () => import("./assets/GoodBalance-D3h9_S3b.js"), "./Pages/Staff/Business/GoodDetail.vue": () => import("./assets/GoodDetail-DdeYDLnU.js"), "./Pages/Staff/Business/GoodInsight.vue": () => import("./assets/GoodInsight-DFNqrJI0.js"), "./Pages/Staff/Business/GoodProduct.vue": () => import("./assets/GoodProduct-DQAQj-zI.js"), "./Pages/Staff/Business/Insight.vue": () => import("./assets/Insight-QjzfcCCH.js"), "./Pages/Staff/Business/InsightCashflow.vue": () => import("./assets/InsightCashflow-DLOEoAH6.js"), "./Pages/Staff/Business/MenuBoard.vue": () => import("./assets/MenuBoard-DGdiciyh.js"), "./Pages/Staff/Business/ProductionPanel.vue": () => import("./assets/ProductionPanel-CizGM00M.js"), "./Pages/Staff/Business/Stand.vue": () => import("./assets/Stand-ClbVm7KF.js"), "./Pages/Staff/Business/StandCashier.vue": () => import("./assets/StandCashier-CvBaAzco.js"), "./Pages/Staff/Business/StandDetail.vue": () => import("./assets/StandDetail-CbEXU5LB.js"), "./Pages/Staff/Internship/CertificatesManage.vue": () => import("./assets/CertificatesManage-DmNgsaw-.js"), "./Pages/Staff/Marketing/Activities.vue": () => import("./assets/Activities-DxaIaV1n.js"), "./Pages/Staff/Marketing/Compro.vue": () => import("./assets/Compro-CByIaStx.js"), "./Pages/Staff/Marketing/MarketingCms.vue": () => import("./assets/MarketingCms-BZ6pWGHq.js"), "./Pages/Staff/Marketing/Structures.vue": () => import("./assets/Structures-CCYoOfix.js"), "./Pages/Staff/Profile.vue": () => import("./assets/Profile-Dw_OPLJ_.js"), "./Pages/Staff/SEEO/Birthdays.vue": () => import("./assets/Birthdays-C_rKuy02.js"), "./Pages/Staff/SEEO/CashFlow.vue": () => import("./assets/CashFlow-DH87UQI2.js"), "./Pages/Staff/SEEO/CeoPanel.vue": () => import("./assets/CeoPanel-Bzr3Py0Q.js"), "./Pages/Staff/SEEO/Dashboard.vue": () => import("./assets/Dashboard-DHgviHYN.js"), "./Pages/Staff/SEEO/Department.vue": () => import("./assets/Department-BnmH4I3G.js"), "./Pages/Staff/SEEO/Employee.vue": () => import("./assets/Employee-BX455o6p.js"), "./Pages/Staff/SEEO/FinanceFeature.vue": () => import("./assets/FinanceFeature-CJxYezfU.js"), "./Pages/Staff/SEEO/FinancePanel.vue": () => import("./assets/FinancePanel-DT5PkenF.js"), "./Pages/Staff/SEEO/IwpPanel.vue": () => import("./assets/IwpPanel-2jUDzFyn.js"), "./Pages/Staff/SEEO/OperatingPanel.vue": () => import("./assets/OperatingPanel-eAcop_d1.js"), "./Pages/Staff/SEEO/PinnedDocs.vue": () => import("./assets/PinnedDocs-pTybGUpM.js"), "./Pages/Staff/SEEO/Program.vue": () => import("./assets/Program-DRYDIHI-.js"), "./Pages/Staff/SEEO/SeminarRegistrations.vue": () => import("./assets/SeminarRegistrations-Du7k77km.js"), "./Pages/Staff/SEEO/SeminarRegistrationsDetail.vue": () => import("./assets/SeminarRegistrationsDetail-BrmSv2f0.js"), "./Pages/Staff/SEEO/Structural.vue": () => import("./assets/Structural-P581z0mP.js"), "./Pages/Staff/SEEO/SuperAdminPanel.vue": () => import("./assets/SuperAdminPanel-DZ6qn_31.js"), "./Pages/Staff/Template.vue": () => import("./assets/Template-ek-46_qs.js") })
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
