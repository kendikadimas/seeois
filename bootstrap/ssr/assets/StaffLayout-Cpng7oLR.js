import { ref, computed, watch, onMounted, nextTick, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderSlot, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CaKJYApU.js";
import { usePage, Head } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const logoSrc = "/images/assets/logo.png";
const _sfc_main = {
  __name: "StaffLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const sidebarRef = ref(null);
    ref(null);
    const offcanvasInstance = ref(null);
    const auth_user = computed(() => page.props.auth.user);
    const available_years = computed(() => page.props.available_years || []);
    const selected_year = ref(page.props.selected_year || (/* @__PURE__ */ new Date()).getFullYear());
    watch(
      () => page.props.selected_year,
      (newYear) => {
        if (newYear) selected_year.value = newYear;
      }
    );
    const can_switch_year = computed(() => {
      var _a;
      const roleId = (_a = auth_user.value) == null ? void 0 : _a.roles_id;
      return roleId === 1 || roleId === 8 || roleId === 99;
    });
    const route = (name, params = {}) => window.route(name, params);
    route.current = (routeName) => {
      if (window.route().current(routeName)) return true;
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
        "Staff/SEEO/PinnedDocs": "PinnedDocs",
        "Staff/SEEO/FinancePanel": "finance.pending",
        "Staff/SEEO/IwpPanel": "iwp.receipts",
        "Staff/SEEO/Birthdays": "hr.birthdays",
        "Staff/Business/Insight": "blaterian.insight",
        "Staff/Business/InsightCashflow": "blaterian.insight.cashflow",
        "Staff/Business/InsightCustomer": "blaterian.insight.customer",
        "Staff/Business/Stand": "food.stand",
        "Staff/Business/StandDetail": "food.stand.detail",
        "Staff/Business/StandCashier": "food.stand.cashier",
        "Staff/Business/GoodBalance": "good.balance",
        "Staff/Business/GoodProduct": "good.product",
        "Staff/Marketing/MarketingCms": "marketing.cms",
        "Staff/Marketing/Structures": "marketing.structures.index",
        "Staff/Marketing/Activities": "marketing.activities",
        "Staff/SEEO/OperatingPanel": "operating.panel",
        "Staff/Business/MenuBoard": "staff.sales-distribution.index",
        "Staff/Business/ProductionPanel": "staff.production.panel.index",
        "Staff/SEEO/SeminarRegistrations": "staff.seminar.registrations.index",
        "Staff/SEEO/SuperAdminPanel": "super.admin.panel",
        "Public/SeminarRegister": "seminar.registration.create"
      };
      const currentRouteBase = componentToRouteBase[currentComponent];
      if (!currentRouteBase) return false;
      return currentRouteBase === routeName || currentRouteBase.startsWith(routeName + ".");
    };
    const currentTime = ref("");
    const modalConfirmationRef = ref(null);
    const userRole = computed(() => {
      var _a, _b;
      return Number(((_b = (_a = page.props.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.roles_id) || 0);
    });
    const roleName = computed(() => {
      var _a, _b;
      return ((_b = (_a = page.props.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.role_name) || "";
    });
    const capabilities = computed(() => {
      var _a, _b;
      return ((_b = (_a = page.props.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.capabilities) || [];
    });
    const can = (capability) => capabilities.value.includes("*") || capabilities.value.includes(capability);
    const nav_list = computed(() => {
      const role = userRole.value;
      roleName.value;
      let list = {
        Dashboard: {},
        Management: {},
        Business: {},
        "HR & Internship": {},
        Marketing: {},
        "Special Access": {}
      };
      list.Dashboard.Home = { route: route("dashboard"), active: route.current("dashboard"), title: "Dashboard", icon: "bi-speedometer2" };
      list.Dashboard.UploadLogbook = { route: route("profile.edit") + "#logbook-upload", active: false, title: "Upload Logbook", icon: "bi-journal-arrow-up" };
      list.Dashboard.PembayaranIwp = { route: route("profile.edit") + "#iwp-payment", active: false, title: "Pembayaran IWP", icon: "bi-wallet2" };
      if (can("organization.view") || can("organization.manage")) {
        list.Management.Structural = {
          route: route("structural"),
          active: route.current("structural") || route.current("department") || route.current("program"),
          title: "Structural",
          icon: "bi-diagram-3"
        };
      }
      if (can("employee.manage")) {
        list.Management.User = { route: route("role"), active: route.current("role"), title: "User & Employee", icon: "bi-person-badge" };
      }
      if (can("finance.view") || can("finance.manage")) {
        list.Management.Finance = [
          { route: route("finance"), active: route.current("finance"), title: "Cashflow", icon: "bi-cash-coin" },
          { route: route("finance.feature"), active: route.current("finance.feature"), title: "Contribution & Payroll", icon: "bi-stars" }
        ];
      }
      if (can("finance.manage")) {
        list.Management.FinancePanel = { route: route("finance.pending"), active: route.current("finance.pending"), title: "Pending Validation", icon: "bi-wallet2" };
      }
      if (can("iwp.manage")) {
        list.Management.IwpPanel = { route: route("iwp.receipts"), active: route.current("iwp.receipts"), title: "Validasi Pembayaran IWP", icon: "bi-receipt" };
      }
      if (can("inventory.view") || can("stands.manage") || can("goods.manage")) {
        list.Business.Insight = { route: route("blaterian.insight"), active: route.current("blaterian.insight"), title: "Business Insight", icon: "bi-graph-up" };
      }
      const foodsMenu = [];
      if (can("stands.manage") || can("inventory.view")) {
        foodsMenu.push({ route: route("food.stand"), active: route.current("food.stand"), title: "Stand Management", icon: "bi-shop" });
      }
      if (can("stands.manage")) {
        foodsMenu.push({ route: route("operating.panel"), active: route.current("operating.panel"), title: "Operating Panel", icon: "bi-clipboard-check" });
      }
      if (can("sales.manage")) {
        foodsMenu.push({ route: route("staff.sales-distribution.index"), active: route.current("staff.sales-distribution.index"), title: "Sales Distribution", icon: "bi-cart-check" });
      }
      if (can("production.manage")) {
        foodsMenu.push({ route: route("staff.production.panel.index"), active: route.current("staff.production.panel.index"), title: "Production Panel", icon: "bi-tools" });
      }
      if (foodsMenu.length > 0) {
        list.Business.Foods = foodsMenu;
      }
      if (can("goods.manage") || can("inventory.view")) {
        list.Business.Goods = [
          { route: route("good.product"), active: route.current("good.product"), title: "Product Management", icon: "bi-box" }
        ];
      }
      if (can("hr.manage")) {
        list["HR & Internship"].HRPanel = { route: route("hr.birthdays"), active: route.current("hr.birthdays"), title: "Staff Birthdays", icon: "bi-balloon" };
      }
      if (can("internship.manage") || can("internship.view")) {
        list["HR & Internship"].Internship = { route: route("internship.applications.index"), active: route.current("internship.applications.index"), title: "Internship Applications", icon: "bi-briefcase" };
      }
      if (can("internship.manage")) {
        list["HR & Internship"].Certificates = { route: route("certificate.manage"), active: route.current("certificate.manage"), title: "Certificates", icon: "bi-award" };
      }
      if (can("marketing.manage")) {
        list.Marketing.CMS = { route: route("marketing.cms"), active: route.current("marketing.cms"), title: "Marketing CMS", icon: "bi-megaphone" };
        list.Marketing.Structures = { route: route("marketing.structures.index"), active: route.current("marketing.structures"), title: "Company Structure", icon: "bi-diagram-2" };
        list.Marketing.Activities = { route: route("marketing.activities.index"), active: route.current("marketing.activities"), title: "Activities & News", icon: "bi-newspaper" };
      }
      if (can("seminar.manage")) {
        list.Marketing.Seminar = { route: route("staff.seminar.registrations.index"), active: route.current("staff.seminar.registrations"), title: "Seminar Registration", icon: "bi-easel" };
      }
      if (can("organization.manage")) {
        list["Special Access"].CeoPanel = { route: route("ceo.panel"), active: route.current("ceo.panel"), title: "CEO Panel", icon: "bi-award-fill" };
      }
      if (can("documents.manage")) {
        list["Special Access"].PinnedDocs = { route: route("pinneddoc.index"), active: route.current("PinnedDocs"), title: "Pinned Documents", icon: "bi-pin-angle" };
      }
      if (role === 99) {
        list["Special Access"].SuperAdmin = { route: route("super.admin.panel"), active: route.current("super.admin.panel"), title: "Super Admin Panel", icon: "bi-shield-lock-fill" };
      }
      return Object.fromEntries(Object.entries(list).filter(([_, content]) => Object.keys(content).length > 0));
    });
    const active_section = computed(() => {
      const current = page.component;
      if (current === "Staff/SEEO/Dashboard") return "Dashboard";
      if (current.includes("User") || current.includes("Employee") || current.includes("Department") || current.includes("Program") || current.includes("Structural") || current.includes("CashFlow") || current.includes("Finance") || current.includes("Contribution") || current.includes("Payroll") || current.includes("IwpPanel")) {
        return "Management";
      }
      if (current.includes("Business") || current.includes("Stand") || current.includes("MenuBoard") || current.includes("OperatingPanel") || current.includes("ProductionPanel") || current.includes("Insight") || current.includes("Good")) {
        return "Business";
      }
      if (current.includes("Internship") || current.includes("Birthdays") || current.includes("Certificate")) {
        return "HR & Internship";
      }
      if (current.includes("Marketing") || current.includes("Seminar") || current.includes("Structure") || current.includes("Activities")) {
        return "Marketing";
      }
      if (current.includes("CeoPanel") || current.includes("SuperAdmin") || current.includes("PinnedDocs")) {
        return "Special Access";
      }
      return "Dashboard";
    });
    const active_group = computed(() => {
      const current = page.component;
      if (current.includes("Finance") || current.includes("CashFlow") || current.includes("Contribution") || current.includes("Payroll")) return "Finance";
      if (current.includes("Foods") || current.includes("Stand") || current.includes("MenuBoard") || current.includes("OperatingPanel") || current.includes("ProductionPanel")) return "Foods";
      if (current.includes("Goods") || current.includes("Good")) return "Goods";
      return null;
    });
    function getSectionIcon(sectionKey) {
      const icons = {
        Dashboard: "bi-speedometer2",
        Management: "bi-building",
        Business: "bi-briefcase",
        "HR & Internship": "bi-people",
        Marketing: "bi-megaphone",
        "Special Access": "bi-star-fill"
      };
      return icons[sectionKey] || "bi-layers";
    }
    const openedSections = ref({ "Dashboard": true });
    const openedGroups = ref({});
    function updateTime() {
      currentTime.value = (/* @__PURE__ */ new Date()).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    }
    const date_header = computed(() => {
      const now = /* @__PURE__ */ new Date();
      return now.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    });
    let timeInterval = null;
    onMounted(async () => {
      updateTime();
      timeInterval = setInterval(updateTime, 1e3);
      await nextTick();
      openedSections.value[active_section.value] = true;
      if (active_group.value) {
        openedGroups.value[`${active_section.value}_${active_group.value}`] = true;
      }
      if (typeof window.bootstrap !== "undefined") {
        if (sidebarRef.value) {
          try {
            offcanvasInstance.value = window.bootstrap.Offcanvas.getOrCreateInstance(sidebarRef.value);
            window.addEventListener("resize", () => {
              if (window.innerWidth >= 992 && offcanvasInstance.value) {
                offcanvasInstance.value.hide();
              }
            });
          } catch (e) {
            console.error("Error initializing Offcanvas:", e);
          }
        }
      } else console.error("window.bootstrap is undefined. Check app.js.");
      return () => {
        if (timeInterval) clearInterval(timeInterval);
      };
    });
    watch(() => page.component, () => {
      openedSections.value[active_section.value] = true;
      if (active_group.value) {
        openedGroups.value[`${active_section.value}_${active_group.value}`] = true;
      }
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
            _push2(`<link rel="preconnect" href="https://fonts.googleapis.com" data-v-7f64fef9${_scopeId}><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin data-v-7f64fef9${_scopeId}><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet" data-v-7f64fef9${_scopeId}><link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet" data-v-7f64fef9${_scopeId}>`);
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
                href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css",
                rel: "stylesheet"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="d-flex vh-100 overflow-x-hidden" data-v-7f64fef9><div class="sidebar-desktop d-none d-lg-flex flex-column shrink-0 bg-gradient-custom text-white" data-v-7f64fef9><div class="sidebar-content-inner p-3" data-v-7f64fef9><div class="sidebar-logo mb-4" data-v-7f64fef9><a${ssrRenderAttr("href", route("dashboard"))} class="text-decoration-none" data-v-7f64fef9><div class="d-flex align-items-center p-2 rounded bg-white bg-opacity-10 sidebar-logo-hover" data-v-7f64fef9><img${ssrRenderAttr("src", logoSrc)} alt="SEEO Logo" class="sidebar-logo-img me-2" data-v-7f64fef9><div class="lh-sm" data-v-7f64fef9><h5 class="sidebar-logo-title mb-0 text-white" data-v-7f64fef9>SEEO</h5><span class="sidebar-logo-subtitle d-block text-white" data-v-7f64fef9>Information System</span><small class="sidebar-logo-version text-warning" data-v-7f64fef9>v5.0</small></div></div></a></div><div class="navigation-menu grow" data-v-7f64fef9><!--[-->`);
      ssrRenderList(nav_list.value, (sectionContent, sectionKey) => {
        _push(`<div class="nav-section mb-2" data-v-7f64fef9><button type="button" class="${ssrRenderClass([{ "active-section": active_section.value == sectionKey, "open": openedSections.value[sectionKey] }, "nav-header btn w-100 text-start d-flex align-items-center"])}" data-v-7f64fef9><i${ssrRenderAttr("id", "icon_nav_section_desktop_" + sectionKey.replace(/\s+/g, ""))} class="${ssrRenderClass(["bi", "me-2", openedSections.value[sectionKey] ? "bi-chevron-up" : "bi-chevron-down"])}" data-v-7f64fef9></i><i class="${ssrRenderClass(["bi", getSectionIcon(sectionKey), "me-2", "text-warning"])}" data-v-7f64fef9></i><span class="fw-semibold" data-v-7f64fef9>${ssrInterpolate(sectionKey)}</span></button><div style="${ssrRenderStyle(openedSections.value[sectionKey] ? null : { display: "none" })}"${ssrRenderAttr("id", "nav_section_desktop_" + sectionKey.replace(/\s+/g, ""))} data-v-7f64fef9><div class="nav-items pt-1 ps-3" data-v-7f64fef9><!--[-->`);
        ssrRenderList(sectionContent, (nav_group, nav_group_key) => {
          _push(`<div class="mb-1" data-v-7f64fef9>`);
          if (Array.isArray(nav_group)) {
            _push(`<!--[--><button type="button" class="${ssrRenderClass([{ "active-group": active_group.value == nav_group_key, "open": openedGroups.value[`${sectionKey}_${nav_group_key}`] }, "nav-item nav-group d-flex align-items-center btn text-start w-100"])}" data-v-7f64fef9><i${ssrRenderAttr("id", "icon_nav_group_desktop_" + sectionKey.replace(/\s+/g, "") + "_" + nav_group_key.replace(/\s+/g, ""))} class="${ssrRenderClass(["bi", "me-2", "nav-group-icon", openedGroups.value[`${sectionKey}_${nav_group_key}`] ? "bi-chevron-up" : "bi-chevron-down"])}" data-v-7f64fef9></i><span class="fw-medium" data-v-7f64fef9>${ssrInterpolate(nav_group_key)}</span></button><div style="${ssrRenderStyle(openedGroups.value[`${sectionKey}_${nav_group_key}`] ? null : { display: "none" })}"${ssrRenderAttr("id", "nav_group_desktop_" + sectionKey.replace(/\s+/g, "") + "_" + nav_group_key.replace(/\s+/g, ""))} data-v-7f64fef9><!--[-->`);
            ssrRenderList(nav_group, (nav, index) => {
              _push(`<a${ssrRenderAttr("href", nav.route)} class="${ssrRenderClass(["nav-item", "sub-item", "d-flex", "align-items-center", nav.active ? "active" : ""])}" data-v-7f64fef9>`);
              if (nav.icon) {
                _push(`<i class="${ssrRenderClass(["bi", nav.icon, "me-2"])}" data-v-7f64fef9></i>`);
              } else {
                _push(`<!---->`);
              }
              _push(` ${ssrInterpolate(nav.title)}</a>`);
            });
            _push(`<!--]--></div><!--]-->`);
          } else {
            _push(`<!---->`);
          }
          if (!Array.isArray(nav_group) && typeof nav_group === "object" && nav_group !== null && nav_group.route !== void 0) {
            _push(`<a${ssrRenderAttr("href", nav_group.route)} class="${ssrRenderClass(["nav-item", "d-flex", "align-items-center", nav_group.active ? "active" : ""])}" data-v-7f64fef9>`);
            if (nav_group.icon) {
              _push(`<i class="${ssrRenderClass(["bi", nav_group.icon, "me-2"])}" data-v-7f64fef9></i>`);
            } else {
              _push(`<!---->`);
            }
            _push(` ${ssrInterpolate(nav_group.title)}</a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      });
      _push(`<!--]--></div></div></div><div class="offcanvas offcanvas-start bg-gradient-custom text-white sidebar-mobile" tabindex="-1" id="sidebarOffcanvas" aria-labelledby="sidebarOffcanvasLabel" data-v-7f64fef9><div class="offcanvas-header border-bottom border-white border-opacity-25" data-v-7f64fef9><a${ssrRenderAttr("href", route("dashboard"))} class="text-decoration-none" data-v-7f64fef9><div class="d-flex align-items-center" data-v-7f64fef9><img${ssrRenderAttr("src", logoSrc)} alt="SEEO Logo" class="sidebar-logo-img me-2" data-v-7f64fef9><div class="lh-sm" data-v-7f64fef9><h5 class="sidebar-logo-title mb-0 text-white" id="sidebarOffcanvasLabel" data-v-7f64fef9>SEEO</h5><span class="sidebar-logo-subtitle d-block text-white" data-v-7f64fef9>Information System</span></div></div></a><button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" data-v-7f64fef9></button></div><div class="offcanvas-body sidebar-content-inner p-3" data-v-7f64fef9><div class="navigation-menu grow" data-v-7f64fef9><!--[-->`);
      ssrRenderList(nav_list.value, (sectionContent, sectionKey) => {
        _push(`<div class="nav-section mb-2" data-v-7f64fef9><button type="button" class="${ssrRenderClass([{ "active-section": active_section.value == sectionKey, "open": openedSections.value[sectionKey] }, "nav-header btn w-100 text-start d-flex align-items-center"])}" data-v-7f64fef9><i${ssrRenderAttr("id", "icon_nav_section_mobile_" + sectionKey.replace(/\s+/g, ""))} class="${ssrRenderClass(["bi", "me-2", openedSections.value[sectionKey] ? "bi-chevron-up" : "bi-chevron-down"])}" data-v-7f64fef9></i><i class="${ssrRenderClass(["bi", getSectionIcon(sectionKey), "me-2", "text-warning"])}" data-v-7f64fef9></i><span class="fw-semibold" data-v-7f64fef9>${ssrInterpolate(sectionKey)}</span></button><div style="${ssrRenderStyle(openedSections.value[sectionKey] ? null : { display: "none" })}"${ssrRenderAttr("id", "nav_section_mobile_" + sectionKey.replace(/\s+/g, ""))} data-v-7f64fef9><div class="nav-items pt-1 ps-3" data-v-7f64fef9><!--[-->`);
        ssrRenderList(sectionContent, (nav_group, nav_group_key) => {
          _push(`<div class="mb-1" data-v-7f64fef9>`);
          if (Array.isArray(nav_group)) {
            _push(`<!--[--><button type="button" class="${ssrRenderClass([{ "active-group": active_group.value == nav_group_key, "open": openedGroups.value[`${sectionKey}_${nav_group_key}`] }, "nav-item nav-group d-flex align-items-center btn text-start w-100"])}" data-v-7f64fef9><i${ssrRenderAttr("id", "icon_nav_group_mobile_" + sectionKey.replace(/\s+/g, "") + "_" + nav_group_key.replace(/\s+/g, ""))} class="${ssrRenderClass(["bi", "me-2", "nav-group-icon", openedGroups.value[`${sectionKey}_${nav_group_key}`] ? "bi-chevron-up" : "bi-chevron-down"])}" data-v-7f64fef9></i><span class="fw-medium" data-v-7f64fef9>${ssrInterpolate(nav_group_key)}</span></button><div style="${ssrRenderStyle(openedGroups.value[`${sectionKey}_${nav_group_key}`] ? null : { display: "none" })}"${ssrRenderAttr("id", "nav_group_mobile_" + sectionKey.replace(/\s+/g, "") + "_" + nav_group_key.replace(/\s+/g, ""))} data-v-7f64fef9><!--[-->`);
            ssrRenderList(nav_group, (nav, index) => {
              _push(`<a${ssrRenderAttr("href", nav.route)} class="${ssrRenderClass(["nav-item", "sub-item", "d-flex", "align-items-center", nav.active ? "active" : ""])}" data-v-7f64fef9>`);
              if (nav.icon) {
                _push(`<i class="${ssrRenderClass(["bi", nav.icon, "me-2"])}" data-v-7f64fef9></i>`);
              } else {
                _push(`<!---->`);
              }
              _push(` ${ssrInterpolate(nav.title)}</a>`);
            });
            _push(`<!--]--></div><!--]-->`);
          } else {
            _push(`<!---->`);
          }
          if (!Array.isArray(nav_group) && typeof nav_group === "object" && nav_group !== null && nav_group.route !== void 0) {
            _push(`<a${ssrRenderAttr("href", nav_group.route)} class="${ssrRenderClass(["nav-item", "d-flex", "align-items-center", nav_group.active ? "active" : ""])}" data-v-7f64fef9>`);
            if (nav_group.icon) {
              _push(`<i class="${ssrRenderClass(["bi", nav_group.icon, "me-2"])}" data-v-7f64fef9></i>`);
            } else {
              _push(`<!---->`);
            }
            _push(` ${ssrInterpolate(nav_group.title)}</a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      });
      _push(`<!--]--></div></div></div><div class="main-content-wrapper grow d-flex flex-column overflow-hidden position-relative" data-v-7f64fef9>`);
      if (_ctx.$slots.header) {
        _push(`<header class="top-header bg-white border-bottom shadow-sm px-2 px-lg-3 py-2 position-relative z-dropdown" data-v-7f64fef9><div class="d-flex justify-content-between align-items-center" data-v-7f64fef9><button class="btn border-0 d-lg-none p-1 me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas" aria-controls="sidebarOffcanvas" data-v-7f64fef9><i class="bi bi-list fs-3" data-v-7f64fef9></i></button><div class="page-title me-auto" data-v-7f64fef9><h4 class="mb-0 fs-5 fw-semibold" data-v-7f64fef9>`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</h4><div class="page-meta small text-muted" data-v-7f64fef9><span data-v-7f64fef9>${ssrInterpolate(date_header.value)}</span><span class="mx-1 d-none d-md-inline" data-v-7f64fef9>â€¢</span><span class="d-none d-md-inline" data-v-7f64fef9>${ssrInterpolate(currentTime.value)}</span></div></div>`);
        if (can_switch_year.value) {
          _push(`<div class="me-2 d-none d-md-flex align-items-center gap-2" data-v-7f64fef9><span class="small text-muted" data-v-7f64fef9>Tahun</span><select class="form-select form-select-sm" style="${ssrRenderStyle({ "width": "110px" })}" data-v-7f64fef9><!--[-->`);
          ssrRenderList(available_years.value, (y) => {
            _push(`<option${ssrRenderAttr("value", y)} data-v-7f64fef9${ssrIncludeBooleanAttr(Array.isArray(selected_year.value) ? ssrLooseContain(selected_year.value, y) : ssrLooseEqual(selected_year.value, y)) ? " selected" : ""}>${ssrInterpolate(y)}</option>`);
          });
          _push(`<!--]--></select></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="user-profile dropdown" data-v-7f64fef9><button class="profile-btn btn d-flex align-items-center dropdown-toggle border-0" type="button" id="profileDropdownMenu" data-bs-toggle="dropdown" aria-expanded="false" data-v-7f64fef9><img${ssrRenderAttr("src", ((_a = auth_user.value) == null ? void 0 : _a.full_profile_image_url) || `https://ui-avatars.com/api/?name=${encodeURIComponent(((_b = auth_user.value) == null ? void 0 : _b.name) || "User")}&color=7F9CF5&background=EBF4FF`)} alt="Profile" class="profile-img rounded-circle me-2" style="${ssrRenderStyle({ "width": "40px", "height": "40px", "object-fit": "cover" })}" data-v-7f64fef9><div class="profile-info d-none d-lg-block lh-sm text-start" data-v-7f64fef9><h6 class="mb-0 small fw-medium text-dark text-truncate" style="${ssrRenderStyle({ "max-width": "150px" })}" data-v-7f64fef9>${ssrInterpolate((_c = auth_user.value) == null ? void 0 : _c.name)}</h6><small class="text-muted d-block text-truncate" style="${ssrRenderStyle({ "max-width": "150px" })}" data-v-7f64fef9>${ssrInterpolate(((_d = auth_user.value) == null ? void 0 : _d.role_name) || "Staff")}</small></div></button><ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2" aria-labelledby="profileDropdownMenu" data-v-7f64fef9><li data-v-7f64fef9><a${ssrRenderAttr("href", route("profile.edit"))} class="dropdown-item small" data-v-7f64fef9><i class="bi bi-person-circle me-2" data-v-7f64fef9></i><span data-v-7f64fef9>Profile</span></a></li><li data-v-7f64fef9><hr class="dropdown-divider my-1" data-v-7f64fef9></li><li data-v-7f64fef9><a class="dropdown-item text-danger small" href="#" data-v-7f64fef9><i class="bi bi-box-arrow-right me-2" data-v-7f64fef9></i><span data-v-7f64fef9>Logout</span></a></li></ul></div></div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="content-container grow overflow-auto" data-v-7f64fef9>`);
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
const StaffLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7f64fef9"]]);
export {
  StaffLayout as S
};
//# sourceMappingURL=StaffLayout-Cpng7oLR.js.map
