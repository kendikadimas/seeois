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
      /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.vue": () => import("./assets/ConfirmPassword-DtnlRWvX.js"), "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-DLwYqAay.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-ckGE_Mga.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-DzCIXMof.js"), "./Pages/Auth/RegisterGoogle.vue": () => import("./assets/RegisterGoogle-apDysBNu.js"), "./Pages/Auth/ResetPassword.vue": () => import("./assets/ResetPassword-DJo9V_AD.js"), "./Pages/Auth/VerifyEmail.vue": () => import("./assets/VerifyEmail-C-7VKzO7.js"), "./Pages/Bingo.vue": () => import("./assets/Bingo-C0m6IC1M.js"), "./Pages/Errors/Default.vue": () => import("./assets/Default-e4vhldhC.js"), "./Pages/Internship/Certificates/Index.vue": () => import("./assets/Index-CyxtUdLw.js"), "./Pages/Internship/Index.vue": () => import("./assets/Index-DzZo9Qbp.js"), "./Pages/Internship/Register.vue": () => import("./assets/Register-fJfyGzXs.js"), "./Pages/Public/About.vue": () => import("./assets/About-CPjko47y.js"), "./Pages/Public/Activity.vue": () => import("./assets/Activity-Dm6UuVSi.js"), "./Pages/Public/Contact.vue": () => import("./assets/Contact-Dw5f8-rp.js"), "./Pages/Public/Departments.vue": () => import("./assets/Departments-CSBr1cLW.js"), "./Pages/Public/Events.vue": () => import("./assets/Events-DM7QRWkz.js"), "./Pages/Public/Homepage.vue": () => import("./assets/Homepage-BQYWd8Cp.js"), "./Pages/Public/OurBrand.vue": () => import("./assets/OurBrand-Dwk0yL1c.js"), "./Pages/Public/Profile.vue": () => import("./assets/Profile-CzZDRXmg.js"), "./Pages/Public/Promotion.vue": () => import("./assets/Promotion-D3oo69Ni.js"), "./Pages/Public/Shop.vue": () => import("./assets/Shop-Dx-zxSeA.js"), "./Pages/Public/Stand.vue": () => import("./assets/Stand-D0d2r4Qj.js"), "./Pages/Public/Structure.vue": () => import("./assets/Structure-r_y-uwOY.js"), "./Pages/Public/Transaction.vue": () => import("./assets/Transaction-DNPBqxkp.js"), "./Pages/Public/Welcome.vue": () => import("./assets/Welcome-hrdq3TVn.js"), "./Pages/Staff/Business/Insight.vue": () => import("./assets/Insight-CPqFD-8i.js"), "./Pages/Staff/Business/InsightCashflow.vue": () => import("./assets/InsightCashflow-BQ69gQ57.js"), "./Pages/Staff/Business/Stand.vue": () => import("./assets/Stand--P-ls5bW.js"), "./Pages/Staff/Business/StandCashier.vue": () => import("./assets/StandCashier-CkXf4-qz.js"), "./Pages/Staff/Business/StandDetail.vue": () => import("./assets/StandDetail-CSSte5tV.js"), "./Pages/Staff/Internship/CertificatesManage.vue": () => import("./assets/CertificatesManage-BGF8-2E_.js"), "./Pages/Staff/Profile.vue": () => import("./assets/Profile-DRYFn2Bv.js"), "./Pages/Staff/SEEO/CashFlow.vue": () => import("./assets/CashFlow-DR4PKX4L.js"), "./Pages/Staff/SEEO/Dashboard.vue": () => import("./assets/Dashboard-Wrt5qokj.js"), "./Pages/Staff/SEEO/Department.vue": () => import("./assets/Department-yGP7Joub.js"), "./Pages/Staff/SEEO/Employee.vue": () => import("./assets/Employee-DyKBCPPK.js"), "./Pages/Staff/SEEO/FinanceFeature.vue": () => import("./assets/FinanceFeature-BZjZMlki.js"), "./Pages/Staff/SEEO/Program.vue": () => import("./assets/Program-DZeH54_e.js"), "./Pages/Staff/SEEO/Structural.vue": () => import("./assets/Structural-DGhuiWlT.js"), "./Pages/Staff/Template.vue": () => import("./assets/Template-Ds_-pLs0.js") })
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
    const app = createApp({ render: () => h(App, props) }).use(plugin).use(imageHelperPlugin);
    app.config.globalProperties.route = window.route;
    app.provide("route", window.route);
    return app.mount(el);
  },
  progress: {
    color: "#4B5563"
  }
});
