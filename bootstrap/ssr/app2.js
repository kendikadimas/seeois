import axios from "axios";
import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { r as resolvePageComponent } from "./assets/vendor-koWuargk.js";
/* empty css                          */
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
      /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-DtnlRWvX.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-DLwYqAay.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-By4iNGpr.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-DzCIXMof.js"), "./Pages/Auth/RegisterGoogle.vue": () => import("./assets/RegisterGoogle-apDysBNu.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-DJo9V_AD.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-C-7VKzO7.js"), "./Pages/Bingo.vue": () => import("./assets/Bingo-C0m6IC1M.js"), "./Pages/Errors/Default.vue": () => import("./assets/Default-BtBYJkIC.js"), "./Pages/Internship/Certificates/Index.vue": () => import("./assets/Index-CYi2W0Iu.js"), "./Pages/Internship/Index.vue": () => import("./assets/Index-DpTK-KbK.js"), "./Pages/Internship/Register.vue": () => import("./assets/Register-fJfyGzXs.js"), "./Pages/Public/About.vue": () => import("./assets/About-DnUn-0td.js"), "./Pages/Public/Activity.vue": () => import("./assets/Activity-BHTkpv9k.js"), "./Pages/Public/Contact.vue": () => import("./assets/Contact-Ud_gCIyl.js"), "./Pages/Public/Departments.vue": () => import("./assets/Departments-Cp71CPVv.js"), "./Pages/Public/Events.vue": () => import("./assets/Events-MQoekvYX.js"), "./Pages/Public/Homepage.vue": () => import("./assets/Homepage-nWItfouZ.js"), "./Pages/Public/OurBrand.vue": () => import("./assets/OurBrand-DWkpiLuK.js"), "./Pages/Public/Profile.vue": () => import("./assets/Profile-CzZDRXmg.js"), "./Pages/Public/Promotion.vue": () => import("./assets/Promotion-D3oo69Ni.js"), "./Pages/Public/Shop.vue": () => import("./assets/Shop-BfgB5s22.js"), "./Pages/Public/Stand.vue": () => import("./assets/Stand-D0d2r4Qj.js"), "./Pages/Public/Structure.vue": () => import("./assets/Structure-Bvpmm7PV.js"), "./Pages/Public/Transaction.vue": () => import("./assets/Transaction-DNPBqxkp.js"), "./Pages/Public/Welcome.vue": () => import("./assets/Welcome-hrdq3TVn.js"), "./Pages/Staff/Business/Insight.vue": () => import("./assets/Insight-9q6YJpTN.js"), "./Pages/Staff/Business/InsightCashflow.vue": () => import("./assets/InsightCashflow-Cpkx4ATz.js"), "./Pages/Staff/Business/Stand.vue": () => import("./assets/Stand-BVUWW45J.js"), "./Pages/Staff/Business/StandCashier.vue": () => import("./assets/StandCashier-B8JvXFzA.js"), "./Pages/Staff/Business/StandDetail.vue": () => import("./assets/StandDetail-CaEPm8IX.js"), "./Pages/Staff/Internship/CertificatesManage.vue": () => import("./assets/CertificatesManage-DpG9KajN.js"), "./Pages/Staff/Profile.vue": () => import("./assets/Profile-CoejYI52.js"), "./Pages/Staff/SEEO/CashFlow.vue": () => import("./assets/CashFlow-CY-6jVEw.js"), "./Pages/Staff/SEEO/Dashboard.vue": () => import("./assets/Dashboard-BTXaPic_.js"), "./Pages/Staff/SEEO/Department.vue": () => import("./assets/Department-Brmx2Cdb.js"), "./Pages/Staff/SEEO/Employee.vue": () => import("./assets/Employee-Bhaee_7s.js"), "./Pages/Staff/SEEO/FinanceFeature.vue": () => import("./assets/FinanceFeature-DRmRNKbu.js"), "./Pages/Staff/SEEO/Program.vue": () => import("./assets/Program-Cb03zXMc.js"), "./Pages/Staff/SEEO/Structural.vue": () => import("./assets/Structural-CLm-iGtK.js"), "./Pages/Staff/Template.vue": () => import("./assets/Template-eqEznVdt.js") })
    );
    const isPublicPage = name.startsWith("Public/") || name === "Public/Homepage";
    if (isPublicPage) {
      await Promise.resolve({               });
    }
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
