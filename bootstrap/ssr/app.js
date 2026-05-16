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
      /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-DtnlRWvX.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-DLwYqAay.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-By4iNGpr.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-DzCIXMof.js"), "./Pages/Auth/RegisterGoogle.vue": () => import("./assets/RegisterGoogle-BcSoITtH.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-BAocvqUq.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-C-IEKhJJ.js"), "./Pages/Bingo.vue": () => import("./assets/Bingo-C0m6IC1M.js"), "./Pages/Errors/Default.vue": () => import("./assets/Default-BtBYJkIC.js"), "./Pages/Internship/Certificates/Index.vue": () => import("./assets/Index-RrRXHO1_.js"), "./Pages/Internship/Index.vue": () => import("./assets/Index-BnSM0VVW.js"), "./Pages/Internship/Register.vue": () => import("./assets/Register-CHi7Fdof.js"), "./Pages/Public/About.vue": () => import("./assets/About-ZAl0TTHu.js"), "./Pages/Public/Activity.vue": () => import("./assets/Activity-BpuAT8Ro.js"), "./Pages/Public/ActivityDetail.vue": () => import("./assets/ActivityDetail-BK4AWLzB.js"), "./Pages/Public/Contact.vue": () => import("./assets/Contact-DpQ2NpTh.js"), "./Pages/Public/Departments.vue": () => import("./assets/Departments-BatcMpft.js"), "./Pages/Public/Events.vue": () => import("./assets/Events-myHciKBL.js"), "./Pages/Public/Homepage.vue": () => import("./assets/Homepage-BeRyDH6I.js"), "./Pages/Public/OurBrand.vue": () => import("./assets/OurBrand-CIkCLdI0.js"), "./Pages/Public/Profile.vue": () => import("./assets/Profile-DBitp1D-.js"), "./Pages/Public/Promotion.vue": () => import("./assets/Promotion-Cx6_8byK.js"), "./Pages/Public/SeminarRegister.vue": () => import("./assets/SeminarRegister-BhF1IPam.js"), "./Pages/Public/Shop.vue": () => import("./assets/Shop-99jUPXhC.js"), "./Pages/Public/Stand.vue": () => import("./assets/Stand-BikHdet7.js"), "./Pages/Public/Structure.vue": () => import("./assets/Structure-C08PQEIv.js"), "./Pages/Public/Transaction.vue": () => import("./assets/Transaction-Ce2xsxaX.js"), "./Pages/Public/Welcome.vue": () => import("./assets/Welcome-hrdq3TVn.js"), "./Pages/Staff/Business/Insight.vue": () => import("./assets/Insight-BsUOJqVk.js"), "./Pages/Staff/Business/InsightCashflow.vue": () => import("./assets/InsightCashflow-BUlnQXBe.js"), "./Pages/Staff/Business/MenuBoard.vue": () => import("./assets/MenuBoard-B6a6SfVH.js"), "./Pages/Staff/Business/ProductionPanel.vue": () => import("./assets/ProductionPanel-BEDkItnx.js"), "./Pages/Staff/Business/Stand.vue": () => import("./assets/Stand-_81UcAgs.js"), "./Pages/Staff/Business/StandCashier.vue": () => import("./assets/StandCashier-uNb11zLZ.js"), "./Pages/Staff/Business/StandDetail.vue": () => import("./assets/StandDetail-xhVhDQMV.js"), "./Pages/Staff/Internship/CertificatesManage.vue": () => import("./assets/CertificatesManage-qM-Gdsk2.js"), "./Pages/Staff/Marketing/Activities.vue": () => import("./assets/Activities-BDvUjU3t.js"), "./Pages/Staff/Marketing/Compro.vue": () => import("./assets/Compro-DuUTOxGC.js"), "./Pages/Staff/Marketing/MarketingCms.vue": () => import("./assets/MarketingCms-ve83ThVu.js"), "./Pages/Staff/Marketing/Structures.vue": () => import("./assets/Structures-4BqqfAko.js"), "./Pages/Staff/Profile.vue": () => import("./assets/Profile-vPrxqYqU.js"), "./Pages/Staff/SEEO/Birthdays.vue": () => import("./assets/Birthdays-7VnmvKm2.js"), "./Pages/Staff/SEEO/CashFlow.vue": () => import("./assets/CashFlow-CaW3ybsY.js"), "./Pages/Staff/SEEO/CeoPanel.vue": () => import("./assets/CeoPanel-qlJ80iUl.js"), "./Pages/Staff/SEEO/Dashboard.vue": () => import("./assets/Dashboard-CnM3qrRS.js"), "./Pages/Staff/SEEO/Department.vue": () => import("./assets/Department-BkYwwoEH.js"), "./Pages/Staff/SEEO/Employee.vue": () => import("./assets/Employee-CxaWOPPc.js"), "./Pages/Staff/SEEO/FinanceFeature.vue": () => import("./assets/FinanceFeature-CPJFoa6x.js"), "./Pages/Staff/SEEO/FinancePanel.vue": () => import("./assets/FinancePanel-BcHs46Nh.js"), "./Pages/Staff/SEEO/IwpPanel.vue": () => import("./assets/IwpPanel-nyvZiNRI.js"), "./Pages/Staff/SEEO/OperatingPanel.vue": () => import("./assets/OperatingPanel-7T1FYGnL.js"), "./Pages/Staff/SEEO/PinnedDocs.vue": () => import("./assets/PinnedDocs-DK6XnJJY.js"), "./Pages/Staff/SEEO/Program.vue": () => import("./assets/Program-C8aumMnr.js"), "./Pages/Staff/SEEO/SeminarRegistrations.vue": () => import("./assets/SeminarRegistrations-CwVmphxN.js"), "./Pages/Staff/SEEO/SeminarRegistrationsDetail.vue": () => import("./assets/SeminarRegistrationsDetail-CYTE82CO.js"), "./Pages/Staff/SEEO/Structural.vue": () => import("./assets/Structural-Bp0jbWLX.js"), "./Pages/Staff/SEEO/SuperAdminPanel.vue": () => import("./assets/SuperAdminPanel-DAI00-_A.js"), "./Pages/Staff/Template.vue": () => import("./assets/Template-_TZarlVO.js") })
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
