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
const appName = "Blaterian";
window.bootstrap = bootstrap;
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: async (name) => {
    const page = await resolvePageComponent(
      `./Pages/${name}.vue`,
      /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-BK51SIzN.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-CBYOq2LK.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-D-q_OiCb.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-DzNlMddY.js"), "./Pages/Auth/RegisterGoogle.vue": () => import("./assets/RegisterGoogle-apDysBNu.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-DJo9V_AD.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-C-7VKzO7.js"), "./Pages/Bingo.vue": () => import("./assets/Bingo-C0m6IC1M.js"), "./Pages/Errors/Default.vue": () => import("./assets/Default-B0FUU6nt.js"), "./Pages/Internship/Certificates/Index.vue": () => import("./assets/Index-CyxtUdLw.js"), "./Pages/Internship/Index.vue": () => import("./assets/Index-C-1xTOS0.js"), "./Pages/Internship/Register.vue": () => import("./assets/Register-fJfyGzXs.js"), "./Pages/Public/About.vue": () => import("./assets/About-DEg4zh7L.js"), "./Pages/Public/Activity.vue": () => import("./assets/Activity-C-w1jihi.js"), "./Pages/Public/Contact.vue": () => import("./assets/Contact-C_R23jwh.js"), "./Pages/Public/Departments.vue": () => import("./assets/Departments-C88RtZFk.js"), "./Pages/Public/Events.vue": () => import("./assets/Events-Z-eKS6ef.js"), "./Pages/Public/Homepage.vue": () => import("./assets/Homepage-CdzDjnP-.js"), "./Pages/Public/OurBrand.vue": () => import("./assets/OurBrand-CGPlmkJE.js"), "./Pages/Public/Profile.vue": () => import("./assets/Profile-CzZDRXmg.js"), "./Pages/Public/Promotion.vue": () => import("./assets/Promotion-D3oo69Ni.js"), "./Pages/Public/Shop.vue": () => import("./assets/Shop-Dx-zxSeA.js"), "./Pages/Public/Stand.vue": () => import("./assets/Stand-D0d2r4Qj.js"), "./Pages/Public/Structure.vue": () => import("./assets/Structure-Ppx2eBU5.js"), "./Pages/Public/Transaction.vue": () => import("./assets/Transaction-DNPBqxkp.js"), "./Pages/Public/Welcome.vue": () => import("./assets/Welcome-DbO1Wumu.js"), "./Pages/Staff/Business/Insight.vue": () => import("./assets/Insight-CpUUXXnr.js"), "./Pages/Staff/Business/InsightCashflow.vue": () => import("./assets/InsightCashflow-CnmZRaCN.js"), "./Pages/Staff/Business/Stand.vue": () => import("./assets/Stand-u_aPRDJU.js"), "./Pages/Staff/Business/StandCashier.vue": () => import("./assets/StandCashier-Cvy_2OHa.js"), "./Pages/Staff/Business/StandDetail.vue": () => import("./assets/StandDetail-BH0pdJ-D.js"), "./Pages/Staff/Internship/CertificatesManage.vue": () => import("./assets/CertificatesManage-mAjxRYb-.js"), "./Pages/Staff/Profile.vue": () => import("./assets/Profile-DRQ8RXqz.js"), "./Pages/Staff/SEEO/CashFlow.vue": () => import("./assets/CashFlow-2UlqC7ov.js"), "./Pages/Staff/SEEO/Dashboard.vue": () => import("./assets/Dashboard-BlnB3Ag5.js"), "./Pages/Staff/SEEO/Department.vue": () => import("./assets/Department-QdHiRUk5.js"), "./Pages/Staff/SEEO/Employee.vue": () => import("./assets/Employee-DcSGtkUw.js"), "./Pages/Staff/SEEO/FinanceFeature.vue": () => import("./assets/FinanceFeature-fZRTG5RH.js"), "./Pages/Staff/SEEO/Program.vue": () => import("./assets/Program-C_S4IMZg.js"), "./Pages/Staff/SEEO/Structural.vue": () => import("./assets/Structural-cbiL0M-g.js"), "./Pages/Staff/Template.vue": () => import("./assets/Template-D3_T5aUn.js") })
    );
    const isPublicPage = name.startsWith("Public/") || name === "Public/Homepage";
    const isAuthPage = name.startsWith("Auth/");
    if (isPublicPage) {
      await Promise.resolve({               });
    } else if (isAuthPage || name.includes("Staff/") || name.includes("Dashboard")) {
      await Promise.resolve({                     });
    }
    return page;
  },
  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) }).use(plugin);
    app.config.globalProperties.route = window.route;
    app.provide("route", window.route);
    return app.mount(el);
  },
  progress: {
    color: "#4B5563"
  }
});
