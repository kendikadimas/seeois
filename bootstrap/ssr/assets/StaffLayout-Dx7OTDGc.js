import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CQDhtLdH.js";
/* empty css             */
import { usePage } from "@inertiajs/vue3";
import { computed, ref, onMounted, useSSRContext } from "vue";
const _sfc_main = {
  __name: "StaffLayout",
  __ssrInlineRender: true,
  props: {
    total_amount: Number
  },
  setup(__props) {
    const auth_user = computed(() => {
      return usePage().props.auth.user;
    });
    const currentTime = ref();
    const modalConfirmationRef = ref();
    const nav_list = ref({
      Organization: {
        Dashboard: {
          route: route("dashboard"),
          active: route().current("dashboard"),
          title: "Dashboard"
        },
        User: {
          route: route("role"),
          active: route().current("role"),
          title: "User"
        },
        Structural: {
          route: route("structural"),
          active: route().current("structural") || route().current("department") || route().current("program"),
          title: "Structural"
        },
        Finance: [
          {
            route: route("finance"),
            active: route().current("finance"),
            title: "Cashflow"
          },
          {
            route: route("finance.feature"),
            active: route().current("finance.feature"),
            title: "Feature"
          }
        ]
      },
      Business: {
        Insight: {
          route: route("blaterian.insight"),
          active: route().current("blaterian.insight") || route().current("blaterian.insight.cashflow") || route().current("blaterian.insight.customer"),
          title: "Insight"
        },
        Foods: [
          {
            route: route("food.stand"),
            active: route().current("food.stand") || route().current("food.stand.detail") || route().current("food.stand.cashier"),
            title: "Stand"
          }
        ],
        Goods: [
          {
            route: "",
            active: false,
            title: "Coming soon!"
          }
        ]
      }
    });
    const active_section = computed(() => {
      switch (route().current()) {
        case "dashboard":
          return "Organization";
        case "role":
          return "Organization";
        case "structural":
          return "Organization";
        case "department":
          return "Organization";
        case "program":
          return "Organization";
        case "finance":
          return "Organization";
        case "finance.feature":
          return "Organization";
        case "blaterian.insight":
          return "Business";
        case "blaterian.insight.cashflow":
          return "Business";
        case "blaterian.insight.customer":
          return "Business";
        case "food.stand":
          return "Business";
        case "food.stand.detail":
          return "Business";
        case "food.stand.cashier":
          return "Business";
        case "good.balance":
          return "Business";
        case "good.product":
          return "Business";
        default:
          return "seeo";
      }
    });
    const active_group = computed(() => {
      switch (route().current()) {
        case "finance":
          return "Finance";
        case "finance.feature":
          return "Finance";
        case "food.stand":
          return "Foods";
        case "food.stand.detail":
          return "Foods";
        case "food.stand.cashier":
          return "Foods";
      }
    });
    function updateTime() {
      currentTime.value = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    }
    const date_header = computed(() => {
      var currentTime2 = /* @__PURE__ */ new Date();
      var year = currentTime2.getFullYear();
      var month = currentTime2.toLocaleString("default", {
        month: "long"
      });
      var date = currentTime2.getDate();
      var day = currentTime2.toLocaleString("default", {
        weekday: "long"
      });
      var formattedDate = `${day}, ${date} ${month} ${year}`;
      return formattedDate;
    });
    const screen_height = ref(window.innerHeight);
    onMounted(() => {
      updateTime();
      setInterval(updateTime, 1e3);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<main${ssrRenderAttrs(_attrs)}><div class="offcanvas-lg offcanvas-start float-start pt-0 bg-opacity-0" data-bs-scroll="true" tabindex="-1" id="appOffcanvas" aria-labelledby="offcanvasDarkLabel" style="${ssrRenderStyle(
        "width: 250px;padding-top: 100px;z-index: 1500; background-color: #e6efff; height:" + screen_height.value + "px;"
      )}"><div class="offcanvas-body p-0"><div class="container"><div class="row px-2 mb-4"><div class="card shadow-sm px-0 mt-lg-0 mt-2 py-3"><div class="d-flex"><img src="/storage/local/images/apps/logo.png" alt="img_logo" style="${ssrRenderStyle({ "width": "4rem", "height": "4rem" })}" class="mx-2"><div class="d-flex"><div class="my-auto"><span class="h5 text-primary-emphasis d-block mb-0">${ssrInterpolate("SEEO")}</span><span class="text-primary-emphasis fw-light mb-0">${ssrInterpolate("Information System")}</span><span class="d-block text-primary" style="${ssrRenderStyle({ "font-size": "0.6rem" })}">${ssrInterpolate("version 2.0")}</span></div></div></div></div></div><div class="row mt-4"><div class="col-12"><!--[-->`);
      ssrRenderList(nav_list.value, (nav_value, nav_key) => {
        _push(`<div class="card mb-3"><button type="button" data-bs-toggle="collapse"${ssrRenderAttr("data-bs-target", "#nav_section_" + nav_key)}${ssrRenderAttr("aria-expanded", active_section.value == nav_key)} class="${ssrRenderClass(
          "btn btn-outline-primary border-0 w-100 d-flex " + (active_section.value == nav_key ? "" : "")
        )}"><i${ssrRenderAttr("id", "icon_nav_section_" + nav_key)} class="${ssrRenderClass(
          "bi me-2 mt-auto bi-chevron-" + (active_section.value == nav_key ? "up" : "down")
        )}" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"></i><span class="my-auto fw-bold">${ssrInterpolate(nav_key)}</span></button>`);
        if (Array.isArray(nav_value)) {
          _push(`<div class="${ssrRenderClass(
            "collapse " + (active_section.value == nav_key ? "show" : "")
          )}"${ssrRenderAttr("id", "nav_section_" + nav_key)}><ul class="list-group list-group-flush"><!--[-->`);
          ssrRenderList(nav_value, (nav) => {
            _push(`<a${ssrRenderAttr("href", nav.route)} class="${ssrRenderClass(
              "list-group-item list-group-item-action list-group-item-light " + (nav.active ? "bg-secondary bg-opacity-25" : "") + (nav_value.length - 1 == nav_value.indexOf(nav) ? " rounded-bottom" : "")
            )}">${ssrInterpolate(nav.title)}</a>`);
          });
          _push(`<!--]--></ul></div>`);
        } else {
          _push(`<!---->`);
        }
        if (!Array.isArray(nav_value)) {
          _push(`<div class="${ssrRenderClass(
            "collapse " + (active_section.value == nav_key ? "show" : "")
          )}"${ssrRenderAttr("id", "nav_section_" + nav_key)}><ul class="list-group list-group-flush"><!--[-->`);
          ssrRenderList(nav_value, (nav_group, nav_group_key) => {
            _push(`<div>`);
            if (Array.isArray(nav_group)) {
              _push(`<a data-bs-toggle="collapse"${ssrRenderAttr(
                "href",
                "#nav_group_" + nav_group_key
              )}${ssrRenderAttr(
                "aria-expanded",
                active_group.value == nav_group_key
              )} role="button" class="${ssrRenderClass("list-group-item list-group-item-action list-group-item-light px-2")}"><i${ssrRenderAttr(
                "id",
                "icon_nav_group_" + nav_group_key
              )} class="${ssrRenderClass(
                "bi ms-1 me-2 mt-auto bi-chevron-" + (active_group.value == nav_group_key ? "up" : "down")
              )}" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"></i><span class="fw-bold">${ssrInterpolate(nav_group_key)}</span></a>`);
            } else {
              _push(`<!---->`);
            }
            if (Array.isArray(nav_group)) {
              _push(`<div class="${ssrRenderClass(
                "collapse " + (active_group.value == nav_group_key ? "show" : "")
              )}"${ssrRenderAttr(
                "id",
                "nav_group_" + nav_group_key
              )}><!--[-->`);
              ssrRenderList(nav_group, (nav) => {
                _push(`<a${ssrRenderAttr("href", nav.route)} class="${ssrRenderClass(
                  "list-group-item list-group-item-action list-group-item-light " + (nav.active ? "bg-secondary bg-opacity-25" : "") + (nav_group.length - 1 == nav_group.indexOf(nav) ? " rounded-bottom" : "")
                )}">${ssrInterpolate(nav.title)}</a>`);
              });
              _push(`<!--]--></div>`);
            } else {
              _push(`<!---->`);
            }
            if (!Array.isArray(nav_group)) {
              _push(`<a${ssrRenderAttr("href", nav_group.route)} class="${ssrRenderClass(
                "list-group-item list-group-item-action list-group-item-light " + (nav_group.active ? "bg-secondary bg-opacity-25" : "")
              )}">${ssrInterpolate(nav_group.title)}</a>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          });
          _push(`<!--]--></ul></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div></div></div>`);
      if (_ctx.$slots.header) {
        _push(`<header class="border-0 mt-3"><div class="container me-0 pt-3 pb-2"><div class="d-flex"><h2 class="text-primary-emphasis d-flex my-auto d-lg-none"><button class="btn btn-light p-0 me-2"><i class="btn bi bi-list border-secondary border-0 fs-5" data-bs-toggle="offcanvas" data-bs-target="#appOffcanvas" aria-controls="staticBackdrop"></i></button></h2><div class="border-start border-primary border-2 ps-2"><span class="h4 text-primary-emphasis">`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</span><div class="d-flex"><span class="fw-light my-auto">${ssrInterpolate(date_header.value)}</span><div class="border-bottom border border-secondary my-auto mx-2 d-none d-lg-block" style="${ssrRenderStyle({ "width": "5px" })}"></div><span class="text-primary-emphasis d-none d-lg-block">${ssrInterpolate(currentTime.value)}</span></div></div><div class="ms-auto me-2"><button class="btn btn-light shadow-sm text-start p-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseProfile" aria-expanded="false"><div class="d-flex"><img${ssrRenderAttr(
          "src",
          "/storage/images/profile/" + (((_a = auth_user.value) == null ? void 0 : _a.profile_image) ?? "example.png")
        )} alt="image" class="rounded img-fluid object-fit-cover placeholder" style="${ssrRenderStyle({ "width": "3rem", "height": "3rem" })}"><div class="px-2 border-end border-primary border-2 d-none d-lg-block"><h6 class="mb-0">${ssrInterpolate(auth_user.value.name)}</h6><span class="fw-light">${ssrInterpolate(auth_user.value.roles.name)}</span></div></div></button></div></div></div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="d-flex"><div class="ms-auto me-3"><div class="collapse" id="collapseProfile"><div class="list-group"><a${ssrRenderAttr("href", _ctx.route("profile.edit"))} class="list-group-item list-group-item-action text-dark"><div class="row m-0"><div class="col-2 p-0 text-center"><i class="bi bi-person-square"></i></div><div class="col-9">${ssrInterpolate("Profile")}</div></div></a><a class="list-group-item list-group-item-action text-dark"><div class="row m-0"><div class="col-2 p-0 text-center"><i class="bi bi-box-arrow-right"></i></div><div class="col-9">${ssrInterpolate("Logout")}</div></div></a></div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        ref_key: "modalConfirmationRef",
        ref: modalConfirmationRef
      }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/StaffLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
