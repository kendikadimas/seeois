import { ref, computed, onMounted, nextTick, watch, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CQDhtLdH.js";
import { usePage, Head } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "StaffLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const sidebarRef = ref(null);
    ref(null);
    const offcanvasInstance = ref(null);
    const auth_user = computed(() => page.props.auth.user);
    const route = (name, params = {}) => {
      const routes = {
        "dashboard": "/seeo/dashboard",
        "role": "/seeo/user",
        "structural": "/seeo/structural",
        "department": "/seeo/department",
        "program": "/seeo/program",
        "finance": "/seeo/finance",
        "finance.feature": "/seeo/finance_feature",
        "blaterian.insight": "/blaterian/insight",
        "blaterian.insight.cashflow": "/blaterian/insight/cashflow",
        "blaterian.insight.customer": "/blaterian/insight/customer",
        "food.stand": "/blaterian/foods/stand",
        "food.stand.detail": "/blaterian/foods/stand_detail",
        "food.stand.cashier": "/blaterian/foods/cashier",
        "profile.edit": "/profile",
        "logout": "/logout",
        "intro": "/intro",
        "billboard.remove": "/billboard/delete",
        "attachment.remove": "/attachment/remove",
        "post.remove": "/dashboard/post/remove",
        "billboard.add": "/billboard/add",
        "attachment.add": "/attachment/add",
        "post.add": "/dashboard/post/add"
      };
      if (routes[name]) {
        let url = routes[name];
        if (params && Object.keys(params).length > 0) {
          for (const key in params) {
            let replaced = url.replace(`{${key}}`, params[key]);
            if (replaced === url) {
              replaced = url.replace(`{${key}?}`, params[key]);
            }
            url = replaced;
          }
          url = url.replace(/\{\w+\?\}/g, "");
          if (url.endsWith("/") && url.length > 1) {
            url = url.slice(0, -1);
          }
        } else if (params && params.id && !url.includes("{id}") && !url.includes("{id?}")) {
          url = `${url}/${params.id}`;
        }
        return url;
      }
      console.warn(`Route "${name}" not found.`);
      return "#";
    };
    route.current = (routeName) => {
      const currentComponent = page.component;
      if (!routeName) return currentComponent;
      const componentToRouteBase = {
        "Staff/SEEO/Dashboard": "dashboard",
        "Staff/SEEO/UserController": "role",
        "Staff/SEEO/DepartmentController": "structural",
        "Staff/SEEO/Department": "department",
        "Staff/SEEO/Program": "program",
        "Staff/SEEO/CashFlow": "finance",
        "Staff/SEEO/CashFlowFeature": "finance.feature",
        "Staff/Business/Insight": "blaterian.insight",
        "Staff/Business/InsightCashflow": "blaterian.insight.cashflow",
        "Staff/Business/InsightCustomer": "blaterian.insight.customer",
        "Staff/Business/Stand": "food.stand",
        "Staff/Business/StandDetail": "food.stand.detail",
        "Staff/Business/StandCashier": "food.stand.cashier",
        "Staff/Business/GoodBalance": "good.balance",
        "Staff/Business/GoodProduct": "good.product"
      };
      const currentRouteBase = componentToRouteBase[currentComponent];
      if (!currentRouteBase) return false;
      return currentRouteBase === routeName || currentRouteBase.startsWith(routeName + ".");
    };
    const currentTime = ref("");
    const modalConfirmationRef = ref(null);
    const nav_list = ref({});
    const active_section = computed(() => {
      const current = page.component;
      if (current.startsWith("Staff/SEEO")) return "Organization";
      if (current.startsWith("Staff/Business")) return "Business";
      return "Organization";
    });
    const active_group = computed(() => {
      const current = page.component;
      if (current.includes("Finance") || current.includes("CashFlow")) return "Finance";
      if (current.includes("Foods") || current.includes("Stand")) return "Foods";
      if (current.includes("Goods") || current.includes("Good")) return "Goods";
      return null;
    });
    function updateTime() {
      currentTime.value = (/* @__PURE__ */ new Date()).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    }
    const date_header = computed(() => {
      const now = /* @__PURE__ */ new Date();
      return now.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    });
    function updateNavList() {
      nav_list.value = {
        Organization: {
          Dashboard: { route: route("dashboard"), active: route.current("dashboard"), title: "Dashboard" },
          User: { route: route("role"), active: route.current("role"), title: "User" },
          Structural: { route: route("structural"), active: route.current("structural") || route.current("department") || route.current("program"), title: "Structural" },
          Finance: [
            { route: route("finance"), active: route.current("finance"), title: "Cashflow" },
            { route: route("finance.feature"), active: route.current("finance.feature"), title: "Feature" }
          ]
        },
        Business: {
          Insight: { route: route("blaterian.insight"), active: route.current("blaterian.insight"), title: "Insight" },
          Foods: [
            { route: route("food.stand"), active: route.current("food.stand"), title: "Stand" }
          ],
          Goods: [
            { route: route("good.product"), active: route.current("good"), title: "Product (Coming Soon)" }
          ]
        }
      };
      console.log("Nav list updated:", JSON.parse(JSON.stringify(nav_list.value)));
    }
    let timeInterval = null;
    onMounted(async () => {
      updateTime();
      timeInterval = setInterval(updateTime, 1e3);
      await nextTick();
      if (typeof window.bootstrap !== "undefined") {
        if (sidebarRef.value) {
          try {
            offcanvasInstance.value = window.bootstrap.Offcanvas.getOrCreateInstance(sidebarRef.value);
            console.log("Bootstrap Offcanvas initialized.");
            window.addEventListener("resize", () => {
              if (window.innerWidth >= 992 && offcanvasInstance.value) {
                offcanvasInstance.value.hide();
              }
            });
          } catch (e) {
            console.error("Error initializing Offcanvas:", e);
          }
        } else console.warn("Sidebar element not found.");
        updateNavList();
      } else console.error("window.bootstrap is undefined. Check app.js.");
      return () => {
        if (timeInterval) clearInterval(timeInterval);
      };
    });
    watch(() => page.component, () => {
      updateNavList();
      if (window.innerWidth < 992 && offcanvasInstance.value) {
        offcanvasInstance.value.hide();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<link rel="preconnect" href="https://fonts.googleapis.com" data-v-44998b04${_scopeId}><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin data-v-44998b04${_scopeId}><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet" data-v-44998b04${_scopeId}><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" data-v-44998b04${_scopeId}><link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet" data-v-44998b04${_scopeId}>`);
          } else {
            return [
              createVNode("link", {
                rel: "preconnect",
                href: "https://fonts.googleapis.com"
              }),
              createVNode("link", {
                rel: "preconnect",
                href: "https://fonts.gstatic.com",
                crossorigin: ""
              }),
              createVNode("link", {
                href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
                rel: "stylesheet"
              }),
              createVNode("link", {
                href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
                rel: "stylesheet"
              }),
              createVNode("link", {
                href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css",
                rel: "stylesheet"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="d-flex vh-100 overflow-hidden" data-v-44998b04><div class="sidebar-desktop d-none d-lg-flex flex-column flex-shrink-0 bg-gradient-custom text-white" data-v-44998b04><div class="sidebar-content-inner p-3" data-v-44998b04><div class="sidebar-logo mb-4" data-v-44998b04><div class="d-flex align-items-center p-2 rounded bg-white bg-opacity-10" data-v-44998b04><img${ssrRenderAttr("src", _ctx.$imageUrl("apps/logo.png"))} alt="SEEO Logo" class="sidebar-logo-img me-2" data-v-44998b04><div class="lh-sm" data-v-44998b04><h5 class="sidebar-logo-title mb-0" data-v-44998b04>SEEO</h5><span class="sidebar-logo-subtitle d-block" data-v-44998b04>Information System</span><small class="sidebar-logo-version text-warning" data-v-44998b04>v2.0</small></div></div></div><div class="navigation-menu flex-grow-1" data-v-44998b04><!--[-->`);
      ssrRenderList(nav_list.value, (sectionContent, sectionKey) => {
        _push(`<div class="nav-section mb-2" data-v-44998b04><button type="button" data-bs-toggle="collapse"${ssrRenderAttr("data-bs-target", "#nav_section_desktop_" + sectionKey.replace(/\s+/g, ""))} class="${ssrRenderClass([{ "active-section": active_section.value == sectionKey }, "nav-header btn w-100 text-start d-flex align-items-center"])}" data-v-44998b04><i${ssrRenderAttr("id", "icon_nav_section_desktop_" + sectionKey.replace(/\s+/g, ""))} class="${ssrRenderClass(["bi", "me-2", active_section.value == sectionKey ? "bi-chevron-up" : "bi-chevron-down"])}" data-v-44998b04></i><span class="fw-semibold" data-v-44998b04>${ssrInterpolate(sectionKey)}</span></button><div class="collapse"${ssrRenderAttr("id", "nav_section_desktop_" + sectionKey.replace(/\s+/g, ""))} data-v-44998b04><div class="nav-items pt-1 ps-3" data-v-44998b04><!--[-->`);
        ssrRenderList(sectionContent, (nav_group, nav_group_key) => {
          _push(`<div class="mb-1" data-v-44998b04>`);
          if (Array.isArray(nav_group)) {
            _push(`<a data-bs-toggle="collapse"${ssrRenderAttr("href", "#nav_group_desktop_" + sectionKey.replace(/\s+/g, "") + "_" + nav_group_key.replace(/\s+/g, ""))} role="button" class="${ssrRenderClass([{ "active-group": active_group.value == nav_group_key }, "nav-item nav-group d-flex align-items-center btn text-start w-100"])}" data-v-44998b04><i${ssrRenderAttr("id", "icon_nav_group_desktop_" + sectionKey.replace(/\s+/g, "") + "_" + nav_group_key.replace(/\s+/g, ""))} class="${ssrRenderClass(["bi", "me-2", "nav-group-icon", active_group.value == nav_group_key ? "bi-chevron-up" : "bi-chevron-down"])}" data-v-44998b04></i><span class="fw-medium" data-v-44998b04>${ssrInterpolate(nav_group_key)}</span></a>`);
          } else {
            _push(`<!---->`);
          }
          if (Array.isArray(nav_group)) {
            _push(`<div class="collapse"${ssrRenderAttr("id", "nav_group_desktop_" + sectionKey.replace(/\s+/g, "") + "_" + nav_group_key.replace(/\s+/g, ""))} data-v-44998b04><!--[-->`);
            ssrRenderList(nav_group, (nav, index) => {
              _push(`<a${ssrRenderAttr("href", nav.route)} class="${ssrRenderClass(["nav-item", "sub-item", "d-block", nav.active ? "active" : ""])}" data-v-44998b04>${ssrInterpolate(nav.title)}</a>`);
            });
            _push(`<!--]--></div>`);
          } else if (typeof nav_group === "object" && nav_group !== null && nav_group.route !== void 0) {
            _push(`<a${ssrRenderAttr("href", nav_group.route)} class="${ssrRenderClass(["nav-item", "d-block", nav_group.active ? "active" : ""])}" data-v-44998b04>${ssrInterpolate(nav_group.title)}</a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      });
      _push(`<!--]--></div></div></div><div class="offcanvas offcanvas-start bg-gradient-custom text-white sidebar-mobile" tabindex="-1" id="sidebarOffcanvas" aria-labelledby="sidebarOffcanvasLabel" data-v-44998b04><div class="offcanvas-header border-bottom border-white border-opacity-25" data-v-44998b04><div class="d-flex align-items-center" data-v-44998b04><img${ssrRenderAttr("src", _ctx.$imageUrl("apps/logo.png"))} alt="SEEO Logo" class="sidebar-logo-img me-2" data-v-44998b04><div class="lh-sm" data-v-44998b04><h5 class="sidebar-logo-title mb-0" id="sidebarOffcanvasLabel" data-v-44998b04>SEEO</h5><span class="sidebar-logo-subtitle d-block" data-v-44998b04>Information System</span></div></div><button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" data-v-44998b04></button></div><div class="offcanvas-body sidebar-content-inner p-3" data-v-44998b04><div class="navigation-menu flex-grow-1" data-v-44998b04><!--[-->`);
      ssrRenderList(nav_list.value, (sectionContent, sectionKey) => {
        _push(`<div class="nav-section mb-2" data-v-44998b04><button type="button" data-bs-toggle="collapse"${ssrRenderAttr("data-bs-target", "#nav_section_mobile_" + sectionKey.replace(/\s+/g, ""))} class="${ssrRenderClass([{ "active-section": active_section.value == sectionKey }, "nav-header btn w-100 text-start d-flex align-items-center"])}" data-v-44998b04><i${ssrRenderAttr("id", "icon_nav_section_mobile_" + sectionKey.replace(/\s+/g, ""))} class="${ssrRenderClass(["bi", "me-2", active_section.value == sectionKey ? "bi-chevron-up" : "bi-chevron-down"])}" data-v-44998b04></i><span class="fw-semibold" data-v-44998b04>${ssrInterpolate(sectionKey)}</span></button><div class="collapse"${ssrRenderAttr("id", "nav_section_mobile_" + sectionKey.replace(/\s+/g, ""))} data-v-44998b04><div class="nav-items pt-1 ps-3" data-v-44998b04><!--[-->`);
        ssrRenderList(sectionContent, (nav_group, nav_group_key) => {
          _push(`<div class="mb-1" data-v-44998b04>`);
          if (Array.isArray(nav_group)) {
            _push(`<a data-bs-toggle="collapse"${ssrRenderAttr("href", "#nav_group_mobile_" + sectionKey.replace(/\s+/g, "") + "_" + nav_group_key.replace(/\s+/g, ""))} role="button" class="${ssrRenderClass([{ "active-group": active_group.value == nav_group_key }, "nav-item nav-group d-flex align-items-center btn text-start w-100"])}" data-v-44998b04><i${ssrRenderAttr("id", "icon_nav_group_mobile_" + sectionKey.replace(/\s+/g, "") + "_" + nav_group_key.replace(/\s+/g, ""))} class="${ssrRenderClass(["bi", "me-2", "nav-group-icon", active_group.value == nav_group_key ? "bi-chevron-up" : "bi-chevron-down"])}" data-v-44998b04></i><span class="fw-medium" data-v-44998b04>${ssrInterpolate(nav_group_key)}</span></a>`);
          } else {
            _push(`<!---->`);
          }
          if (Array.isArray(nav_group)) {
            _push(`<div class="collapse"${ssrRenderAttr("id", "nav_group_mobile_" + sectionKey.replace(/\s+/g, "") + "_" + nav_group_key.replace(/\s+/g, ""))} data-v-44998b04><!--[-->`);
            ssrRenderList(nav_group, (nav, index) => {
              _push(`<a${ssrRenderAttr("href", nav.route)} class="${ssrRenderClass(["nav-item", "sub-item", "d-block", nav.active ? "active" : ""])}" data-v-44998b04>${ssrInterpolate(nav.title)}</a>`);
            });
            _push(`<!--]--></div>`);
          } else if (typeof nav_group === "object" && nav_group !== null && nav_group.route !== void 0) {
            _push(`<a${ssrRenderAttr("href", nav_group.route)} class="${ssrRenderClass(["nav-item", "d-block", nav_group.active ? "active" : ""])}" data-v-44998b04>${ssrInterpolate(nav_group.title)}</a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      });
      _push(`<!--]--></div></div></div><div class="main-content-wrapper flex-grow-1 d-flex flex-column overflow-hidden" data-v-44998b04>`);
      if (_ctx.$slots.header) {
        _push(`<header class="top-header bg-white border-bottom shadow-sm px-2 px-lg-3 py-2" data-v-44998b04><div class="d-flex justify-content-between align-items-center" data-v-44998b04><button class="btn border-0 d-lg-none p-1 me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas" aria-controls="sidebarOffcanvas" data-v-44998b04><i class="bi bi-list fs-3" data-v-44998b04></i></button><div class="page-title me-auto" data-v-44998b04><h4 class="mb-0 fs-5 fw-semibold" data-v-44998b04>`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</h4><div class="page-meta small text-muted" data-v-44998b04><span data-v-44998b04>${ssrInterpolate(date_header.value)}</span><span class="mx-1 d-none d-md-inline" data-v-44998b04>•</span><span class="d-none d-md-inline" data-v-44998b04>${ssrInterpolate(currentTime.value)}</span></div></div><div class="user-profile dropdown" data-v-44998b04><button class="profile-btn btn d-flex align-items-center dropdown-toggle border-0" type="button" id="profileDropdownMenu" data-bs-toggle="dropdown" aria-expanded="false" data-v-44998b04><img${ssrRenderAttr("src", "/storage/images/profile/" + (((_a = auth_user.value) == null ? void 0 : _a.profile_image) ?? "example.png"))} alt="Profile" class="profile-img rounded-circle me-2" style="${ssrRenderStyle({ "width": "40px", "height": "40px", "object-fit": "cover" })}" data-v-44998b04><div class="profile-info d-none d-lg-block lh-sm text-start" data-v-44998b04><h6 class="mb-0 small fw-medium text-dark text-truncate" style="${ssrRenderStyle({ "max-width": "150px" })}" data-v-44998b04>${ssrInterpolate((_b = auth_user.value) == null ? void 0 : _b.name)}</h6><small class="text-muted d-block text-truncate" style="${ssrRenderStyle({ "max-width": "150px" })}" data-v-44998b04>${ssrInterpolate(((_d = (_c = auth_user.value) == null ? void 0 : _c.roles) == null ? void 0 : _d.name) || "Staff")}</small></div></button><ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2" aria-labelledby="profileDropdownMenu" data-v-44998b04><li data-v-44998b04><a${ssrRenderAttr("href", route("profile.edit"))} class="dropdown-item small" data-v-44998b04><i class="bi bi-person-circle me-2" data-v-44998b04></i><span data-v-44998b04>Profile</span></a></li><li data-v-44998b04><hr class="dropdown-divider my-1" data-v-44998b04></li><li data-v-44998b04><a class="dropdown-item text-danger small" href="#" data-v-44998b04><i class="bi bi-box-arrow-right me-2" data-v-44998b04></i><span data-v-44998b04>Logout</span></a></li></ul></div></div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="content-container flex-grow-1 overflow-auto p-2 p-lg-3" data-v-44998b04>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        ref_key: "modalConfirmationRef",
        ref: modalConfirmationRef
      }, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/StaffLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const StaffLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-44998b04"]]);
export {
  StaffLayout as S
};
