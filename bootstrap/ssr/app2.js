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
      /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-DtnlRWvX.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-DLwYqAay.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-By4iNGpr.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-C2f89d3h.js"), "./Pages/Auth/RegisterGoogle.vue": () => import("./assets/RegisterGoogle-D84MgKVu.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-DwDV-eLs.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-C-IEKhJJ.js"), "./Pages/Bingo.vue": () => import("./assets/Bingo-Bf3TCKIv.js"), "./Pages/Errors/Default.vue": () => import("./assets/Default-Butp8Xug.js"), "./Pages/Internship/Certificates/Index.vue": () => import("./assets/Index-B8ctafm0.js"), "./Pages/Internship/Index.vue": () => import("./assets/Index-BLkHl13f.js"), "./Pages/Internship/Register.vue": () => import("./assets/Register-BG4-R6ad.js"), "./Pages/Public/About.vue": () => import("./assets/About-Byxfc4lW.js"), "./Pages/Public/Activity.vue": () => import("./assets/Activity-B6u7iokm.js"), "./Pages/Public/ActivityDetail.vue": () => import("./assets/ActivityDetail-CmY1FV2V.js"), "./Pages/Public/Contact.vue": () => import("./assets/Contact-CNuoTtSB.js"), "./Pages/Public/Departments.vue": () => import("./assets/Departments-DgVUB_jw.js"), "./Pages/Public/Events.vue": () => import("./assets/Events-BJNVoknm.js"), "./Pages/Public/Homepage.vue": () => import("./assets/Homepage-BBhsAafS.js"), "./Pages/Public/OurBrand.vue": () => import("./assets/OurBrand-BlN3rN4g.js"), "./Pages/Public/Profile.vue": () => import("./assets/Profile-DBitp1D-.js"), "./Pages/Public/Promotion.vue": () => import("./assets/Promotion-CwdEWxXX.js"), "./Pages/Public/SeminarRegister.vue": () => import("./assets/SeminarRegister-ctCdpkIq.js"), "./Pages/Public/Shop.vue": () => import("./assets/Shop-sz9Xtuet.js"), "./Pages/Public/Stand.vue": () => import("./assets/Stand-Ad08amxG.js"), "./Pages/Public/Structure.vue": () => import("./assets/Structure-By9IR4eA.js"), "./Pages/Public/Transaction.vue": () => import("./assets/Transaction-DxX79ENR.js"), "./Pages/Public/Welcome.vue": () => import("./assets/Welcome-hrdq3TVn.js"), "./Pages/Staff/Business/Insight.vue": () => import("./assets/Insight-c7dSGW8t.js"), "./Pages/Staff/Business/InsightCashflow.vue": () => import("./assets/InsightCashflow-B1kHyFnh.js"), "./Pages/Staff/Business/MenuBoard.vue": () => import("./assets/MenuBoard-BOA2xzeY.js"), "./Pages/Staff/Business/ProductionPanel.vue": () => import("./assets/ProductionPanel-gAQWKf88.js"), "./Pages/Staff/Business/Stand.vue": () => import("./assets/Stand-CK3yeFbl.js"), "./Pages/Staff/Business/StandCashier.vue": () => import("./assets/StandCashier-BHd98Mg9.js"), "./Pages/Staff/Business/StandDetail.vue": () => import("./assets/StandDetail-Cc71a3er.js"), "./Pages/Staff/Internship/CertificatesManage.vue": () => import("./assets/CertificatesManage-DpPd27Mx.js"), "./Pages/Staff/Marketing/Activities.vue": () => import("./assets/Activities-BcyqyWZf.js"), "./Pages/Staff/Marketing/Compro.vue": () => import("./assets/Compro-DFGtYPth.js"), "./Pages/Staff/Marketing/MarketingCms.vue": () => import("./assets/MarketingCms-DJ-sDIHI.js"), "./Pages/Staff/Marketing/Structures.vue": () => import("./assets/Structures-BMaS19CP.js"), "./Pages/Staff/Profile.vue": () => import("./assets/Profile-C65pAgyA.js"), "./Pages/Staff/SEEO/Birthdays.vue": () => import("./assets/Birthdays-BBJIwQzY.js"), "./Pages/Staff/SEEO/CashFlow.vue": () => import("./assets/CashFlow-Q7aaVDVP.js"), "./Pages/Staff/SEEO/CeoPanel.vue": () => import("./assets/CeoPanel-DUWMMkFY.js"), "./Pages/Staff/SEEO/Dashboard.vue": () => import("./assets/Dashboard-DuKRZw5q.js"), "./Pages/Staff/SEEO/Department.vue": () => import("./assets/Department-D3QHVBZA.js"), "./Pages/Staff/SEEO/Employee.vue": () => import("./assets/Employee-BT4ztDaw.js"), "./Pages/Staff/SEEO/FinanceFeature.vue": () => import("./assets/FinanceFeature-BTsILHTa.js"), "./Pages/Staff/SEEO/FinancePanel.vue": () => import("./assets/FinancePanel-DbiIBLtv.js"), "./Pages/Staff/SEEO/IwpPanel.vue": () => import("./assets/IwpPanel-BtLg7mjD.js"), "./Pages/Staff/SEEO/OperatingPanel.vue": () => import("./assets/OperatingPanel-QBivACgD.js"), "./Pages/Staff/SEEO/PinnedDocs.vue": () => import("./assets/PinnedDocs-On2eXjj9.js"), "./Pages/Staff/SEEO/Program.vue": () => import("./assets/Program-BvnPaI-S.js"), "./Pages/Staff/SEEO/SeminarRegistrations.vue": () => import("./assets/SeminarRegistrations-DZrbFEYH.js"), "./Pages/Staff/SEEO/SeminarRegistrationsDetail.vue": () => import("./assets/SeminarRegistrationsDetail-DwGJH7QY.js"), "./Pages/Staff/SEEO/Structural.vue": () => import("./assets/Structural-ChM6Yh74.js"), "./Pages/Staff/SEEO/SuperAdminPanel.vue": () => import("./assets/SuperAdminPanel-CNp0IFTk.js"), "./Pages/Staff/Template.vue": () => import("./assets/Template-NVXBHqKa.js") })
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
