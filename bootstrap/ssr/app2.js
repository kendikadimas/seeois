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
      /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-C6NaytWE.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-Bb7DmuRE.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-B0PIJR59.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-CJFxIpzt.js"), "./Pages/Auth/RegisterGoogle.vue": () => import("./assets/RegisterGoogle-CxHC3tqL.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-H9SZTx-h.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-By6_91Xo.js"), "./Pages/Bingo.vue": () => import("./assets/Bingo-Bf3TCKIv.js"), "./Pages/Errors/Default.vue": () => import("./assets/Default-Butp8Xug.js"), "./Pages/Internship/Certificates/Index.vue": () => import("./assets/Index-C55c-tfy.js"), "./Pages/Internship/Index.vue": () => import("./assets/Index-CP0HOYQu.js"), "./Pages/Internship/Register.vue": () => import("./assets/Register-BG4-R6ad.js"), "./Pages/Public/About.vue": () => import("./assets/About-5V6zVirz.js"), "./Pages/Public/Activity.vue": () => import("./assets/Activity-CamSi-V1.js"), "./Pages/Public/ActivityDetail.vue": () => import("./assets/ActivityDetail-BikGwdqT.js"), "./Pages/Public/Contact.vue": () => import("./assets/Contact-gadw3ig3.js"), "./Pages/Public/Departments.vue": () => import("./assets/Departments-C3Eo06K8.js"), "./Pages/Public/Events.vue": () => import("./assets/Events-CvPAkAp2.js"), "./Pages/Public/Homepage.vue": () => import("./assets/Homepage-UqMnsvnM.js"), "./Pages/Public/OurBrand.vue": () => import("./assets/OurBrand-BQfJtnt4.js"), "./Pages/Public/Profile.vue": () => import("./assets/Profile-D6cHk9X5.js"), "./Pages/Public/Promotion.vue": () => import("./assets/Promotion-Nf6_0X2U.js"), "./Pages/Public/SeminarRegister.vue": () => import("./assets/SeminarRegister-6jZIo3li.js"), "./Pages/Public/Shop.vue": () => import("./assets/Shop-COoS8fek.js"), "./Pages/Public/Stand.vue": () => import("./assets/Stand-DNp3BONM.js"), "./Pages/Public/Structure.vue": () => import("./assets/Structure-C4jDR9Dg.js"), "./Pages/Public/Transaction.vue": () => import("./assets/Transaction-C2SybwQl.js"), "./Pages/Public/Welcome.vue": () => import("./assets/Welcome-CgBVmXye.js"), "./Pages/Staff/Business/FoodBalance.vue": () => import("./assets/FoodBalance-DxnmwVS-.js"), "./Pages/Staff/Business/GoodBalance.vue": () => import("./assets/GoodBalance-DfxkxBRd.js"), "./Pages/Staff/Business/GoodDetail.vue": () => import("./assets/GoodDetail-sxmGNud4.js"), "./Pages/Staff/Business/GoodInsight.vue": () => import("./assets/GoodInsight-V305_3sB.js"), "./Pages/Staff/Business/GoodProduct.vue": () => import("./assets/GoodProduct-DiJdowLn.js"), "./Pages/Staff/Business/Insight.vue": () => import("./assets/Insight-Bodhr8Zb.js"), "./Pages/Staff/Business/InsightCashflow.vue": () => import("./assets/InsightCashflow-BDuDipci.js"), "./Pages/Staff/Business/MenuBoard.vue": () => import("./assets/MenuBoard-41FWr8kD.js"), "./Pages/Staff/Business/ProductionPanel.vue": () => import("./assets/ProductionPanel-BlY0XOhq.js"), "./Pages/Staff/Business/Stand.vue": () => import("./assets/Stand-kzFwLMDD.js"), "./Pages/Staff/Business/StandCashier.vue": () => import("./assets/StandCashier-UAuSPQ0K.js"), "./Pages/Staff/Business/StandDetail.vue": () => import("./assets/StandDetail-CauXC4WE.js"), "./Pages/Staff/Internship/CertificatesManage.vue": () => import("./assets/CertificatesManage-DpbPXuJI.js"), "./Pages/Staff/Marketing/Activities.vue": () => import("./assets/Activities-DtTXyEUQ.js"), "./Pages/Staff/Marketing/Compro.vue": () => import("./assets/Compro-DUXRvJo1.js"), "./Pages/Staff/Marketing/MarketingCms.vue": () => import("./assets/MarketingCms-DJpWguye.js"), "./Pages/Staff/Marketing/Structures.vue": () => import("./assets/Structures-tC2GMTmR.js"), "./Pages/Staff/Profile.vue": () => import("./assets/Profile-DWz50VwS.js"), "./Pages/Staff/SEEO/Birthdays.vue": () => import("./assets/Birthdays-fqUpK-BE.js"), "./Pages/Staff/SEEO/CashFlow.vue": () => import("./assets/CashFlow-CNLIin6t.js"), "./Pages/Staff/SEEO/CeoPanel.vue": () => import("./assets/CeoPanel-CgyGsKXU.js"), "./Pages/Staff/SEEO/Dashboard.vue": () => import("./assets/Dashboard-q0mvx2Yu.js"), "./Pages/Staff/SEEO/Department.vue": () => import("./assets/Department-D2qwB2fN.js"), "./Pages/Staff/SEEO/Employee.vue": () => import("./assets/Employee-BI_BCXsP.js"), "./Pages/Staff/SEEO/FinanceFeature.vue": () => import("./assets/FinanceFeature-BoFwsJUY.js"), "./Pages/Staff/SEEO/FinancePanel.vue": () => import("./assets/FinancePanel-DPICFsOB.js"), "./Pages/Staff/SEEO/IwpPanel.vue": () => import("./assets/IwpPanel-CsqTObhH.js"), "./Pages/Staff/SEEO/OperatingPanel.vue": () => import("./assets/OperatingPanel-BLfniBue.js"), "./Pages/Staff/SEEO/PinnedDocs.vue": () => import("./assets/PinnedDocs-sBKs1q6T.js"), "./Pages/Staff/SEEO/Program.vue": () => import("./assets/Program-CJWOa_sv.js"), "./Pages/Staff/SEEO/SeminarRegistrations.vue": () => import("./assets/SeminarRegistrations-CMLvhfzz.js"), "./Pages/Staff/SEEO/SeminarRegistrationsDetail.vue": () => import("./assets/SeminarRegistrationsDetail-DZ6VPvgS.js"), "./Pages/Staff/SEEO/Structural.vue": () => import("./assets/Structural-EvYmXT_Z.js"), "./Pages/Staff/SEEO/SuperAdminPanel.vue": () => import("./assets/SuperAdminPanel-c8km81N1.js"), "./Pages/Staff/Template.vue": () => import("./assets/Template-Cfe5lBPW.js") })
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
