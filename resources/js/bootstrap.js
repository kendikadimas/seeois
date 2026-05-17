import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Simple route helper (replacement for Ziggy)
const ziggyRoute = window.route;

window.route = function (name, params, absolute, config) {
  if (ziggyRoute && typeof ziggyRoute === "function") {
    try {
      // If using the real Ziggy, delegate directly to it
      return ziggyRoute(name, params, absolute, config);
    } catch (e) {
      // Fallback to manual routing if Ziggy fails or route is not found
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
    "logout": "/logout",
  };

  let url = routes[name] || name;

  // Simple parameter replacement
  if (params && typeof params === "object") {
    Object.keys(params).forEach((key) => {
      url = url.replace(`{${key}}`, params[key]);
    });
  }

  return url;
};
