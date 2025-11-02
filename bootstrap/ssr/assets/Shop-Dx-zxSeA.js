import { ref, computed, onMounted, onUnmounted, watch, withCtx, unref, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, Transition, withDirectives, Fragment, renderList, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./Notif-DL0SggHu.js";
import { G as GuestLayout } from "./GuestLayout-EBOafcqa.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CQDhtLdH.js";
import { M as ModalAlertNotification } from "./ModalAlertNotification-DTKoiHkW.js";
import { f as formatIDR, a as formatDate, s as showImage } from "./utils-WpvxxmT9.js";
import { usePage, useForm, Head, router } from "@inertiajs/vue3";
import "vue-toastification";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "date-fns";
const _sfc_main = {
  __name: "Shop",
  __ssrInlineRender: true,
  props: {
    notif: Object,
    stand_list: Array,
    active_order_list: Array,
    finished_order_list: Array
  },
  setup(__props) {
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const toastNotifRef = ref(null);
    const modalConfirmationRef = ref(null);
    const modalAlertNotificationRef = ref(null);
    const active_tab = ref(1);
    const active_history_tab = ref(1);
    const prev_tab = ref(0);
    const next_tab = ref(0);
    const title = ref("Shop");
    const linkIntroRef = ref();
    const linkShop1 = ref();
    const linkShop2 = ref();
    const linkProfileRef = ref();
    const scrollY = ref(0);
    const onScroll = () => {
      scrollY.value = window.scrollY;
    };
    const headerStyle = computed(() => {
      const offsetY = Math.min(scrollY.value * 0.3, 100);
      const opacity = scrollY.value < 50 ? 1 : 0;
      return {
        top: "0px",
        transform: `translate(-50%, ${offsetY}px)`,
        transition: "transform 0.3s ease, opacity 0.5s ease",
        opacity,
        width: "100%",
        padding: "1rem",
        backgroundImage: `url('/storage/local/images/shop/brand/background.png')`,
        backgroundRepeat: "repeat-x",
        backgroundSize: isLargeScreen.value ? "auto 100%" : "auto 0%"
      };
    });
    const form_add_feedback = useForm({
      rate: 0,
      feedback: null
    });
    const stand_type = [
      { value: 0, name: "Live" },
      { value: 1, name: "Pre-Order" },
      { value: 2, name: "Live and Pre-Order" }
    ];
    const isLargeScreen = ref(window.innerWidth >= 1200);
    const handleResize = () => {
      isLargeScreen.value = window.innerWidth >= 768;
      window.addEventListener("resize", handleResize);
    };
    function handleAddFeedback() {
      form_add_feedback.post(route("customer.feedback.add"), {
        onError: (e) => {
          for (i = 0; i < e.length; i++) {
            toastNotifRef.value.showToast("warning", e);
          }
        }
      });
    }
    function redirectToStand(id) {
      return document.getElementById("linkStand" + id).click();
    }
    function setTab(tab) {
      prev_tab.value = active_tab.value;
      next_tab.value = tab;
      active_tab.value = 0;
    }
    function proceedTab() {
      active_tab.value = next_tab.value;
    }
    function confirmation(route2, message) {
      if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route2, message);
      } else {
        console.error("modalConfirmationRef is null");
      }
    }
    function alertNotification(message) {
      modalAlertNotificationRef.value.showModal(message);
    }
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", onScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
    });
    watch(
      () => props.notif,
      (newValue) => {
        const notification = newValue;
        toastNotifRef.value.showToast(notification.type, notification.message);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(GuestLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: title.value,
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(ModalAlertNotification, {
              ref_key: "modalAlertNotificationRef",
              ref: modalAlertNotificationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="card rounded-0 bg-warning bg-opacity-50 position-fixed start-50 translate-middle-x z-3" style="${ssrRenderStyle(headerStyle.value)}"${_scopeId}><button class="btn btn-light shadow-lg text-start p-2 mx-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"${_scopeId}><div class="d-flex"${_scopeId}><div class="d-flex border-end border-primary-subtle border-2 pe-1 me-2"${_scopeId}><img src="/storage/local/images/shop/brand/blaterian_logo.png" alt="image" style="${ssrRenderStyle({ "height": "2.5rem" })}" class="my-auto"${_scopeId}><img src="/storage/local/images/shop/brand/blaterian_text.png" alt="image" class="my-auto" style="${ssrRenderStyle({ "height": "2.5rem" })}"${_scopeId}></div><img${ssrRenderAttr(
              "src",
              "/storage/images/profile/" + (((_a = unref(auth_user)) == null ? void 0 : _a.profile_image) ?? "example.png")
            )} alt="image" class="rounded object-fit-cover placeholder" style="${ssrRenderStyle({ "width": "3rem", "height": "3rem" })}"${_scopeId}><div class="px-2 d-none d-xl-block"${_scopeId}><h6 class="mb-0"${_scopeId}>${ssrInterpolate(((_b = unref(auth_user)) == null ? void 0 : _b.name) ?? "Guest")}</h6><span class="fw-light"${_scopeId}>${ssrInterpolate(unref(auth_user) ? ((_c = unref(auth_user).roles) == null ? void 0 : _c.name) ?? "Customer" : "Please Login")}</span></div></div></button></div><div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel"${_scopeId}><div class="offcanvas-header border-bottom shadow-sm"${_scopeId}><div class="d-flex"${_scopeId}><img${ssrRenderAttr(
              "src",
              "/storage/images/profile/" + (((_d = unref(auth_user)) == null ? void 0 : _d.profile_image) ?? "example.png")
            )} alt="image" class="rounded img-fluid object-fit-cover placeholder" style="${ssrRenderStyle({ "width": "3rem", "height": "3rem" })}"${_scopeId}><div class="px-2"${_scopeId}><h6 class="mb-0"${_scopeId}>${ssrInterpolate(((_e = unref(auth_user)) == null ? void 0 : _e.name) ?? "Guest")}</h6><span class="fw-light"${_scopeId}>${ssrInterpolate(unref(auth_user) ? ((_f = unref(auth_user).roles) == null ? void 0 : _f.name) ?? "Customer" : "Please Login")}</span></div></div><button type="button" class="btn btn-sm btn-outline-warning border-0 ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"${_scopeId}>${ssrInterpolate("Close")} <i class="bi bi-chevron-right"${_scopeId}></i></button></div><div class="offcanvas-body"${_scopeId}><ul class="list-group list-group-flush"${_scopeId}><li class="list-group-item list-group-item-action"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("intro"))}${_scopeId}></a><div class="d-flex fs-5"${_scopeId}><i class="bi bi-house me-2"${_scopeId}></i> ${ssrInterpolate("Home")}</div></li>`);
            if (unref(auth_user)) {
              _push2(`<li class="list-group-item list-group-item-action"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("customer.profile"))}${_scopeId}></a><div class="d-flex fs-5"${_scopeId}><i class="bi bi-person me-2"${_scopeId}></i> ${ssrInterpolate("Profile")}</div></li>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<li class="list-group-item list-group-item-action"${_scopeId}><div class="d-flex fs-5"${_scopeId}><i class="bi bi-question-circle me-2"${_scopeId}></i> ${ssrInterpolate("FAQ")}</div></li></ul><div class="d-flex mt-3"${_scopeId}>`);
            if (unref(auth_user)) {
              _push2(`<button class="btn btn-warning w-100"${_scopeId}><i class="fa-solid fa-arrow-right-from-bracket"${_scopeId}></i> ${ssrInterpolate("Logout")}</button>`);
            } else {
              _push2(`<!---->`);
            }
            if (!unref(auth_user)) {
              _push2(`<div class="d-flex rounded border border-warning w-100"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("login"))} class="btn btn-warning w-50 rounded-end-0 border-0"${_scopeId}><i class="fa-solid fa-arrow-right-to-bracket"${_scopeId}></i> ${ssrInterpolate("Login")}</a><a${ssrRenderAttr("href", _ctx.route("register"))} class="btn btn-warning w-50 rounded-start-0 border-0"${_scopeId}><i class="fa-solid fa-user-plus"${_scopeId}></i> ${ssrInterpolate("Register")}</a></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="container" style="${ssrRenderStyle({ "margin-bottom": "4rem", "margin-top": "8rem" })}"${_scopeId}>`);
            if (active_tab.value == 1) {
              _push2(`<div${_scopeId}><div class="row g-4"${_scopeId}><div class="col-xl-4 col-lg-5 col-12"${_scopeId}><div class="card shadow-sm p-1"${_scopeId}><div class="scroll-container-horizontal scroll-container-horizontal-lg pb-1"${_scopeId}><img src="/storage/images/billboard/Billboard_1741771637.png" alt="" class="img-fluid rounded w-100 me-2"${_scopeId}><img src="/storage/images/billboard/Billboard_1741771637.png" alt="" class="img-fluid rounded w-100 me-2"${_scopeId}></div></div><div class="row g-4 mt-0"${_scopeId}><div class="col-12 col-md-7 col-lg-12"${_scopeId}><div class="card shadow-sm p-3"${_scopeId}><div class="d-flex"${_scopeId}><div class="w-50"${_scopeId}><span class="h6 text-primary-emphasis d-block mb-0"${_scopeId}>${ssrInterpolate("My Points")}</span><span class="h3 text-warning"${_scopeId}><i class="fa-solid fa-coins fs-5"${_scopeId}></i> ${ssrInterpolate(unref(auth_user) ? 0 : 0)}</span></div><div class="border border-start border-primary-subtle mx-3"${_scopeId}></div><div class="w-50"${_scopeId}><span class="h6 text-primary-emphasis d-block mb-0"${_scopeId}>${ssrInterpolate("My Vouchers")}</span><span class="h3 text-warning"${_scopeId}><i class="fa-solid fa-ticket fs-5"${_scopeId}></i> ${ssrInterpolate(unref(auth_user) ? 0 : 0)}</span></div></div><span class="text-secondary fst-italic mt-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(unref(auth_user) ? "Woo-hoo! You have point, let`s redeem the voucher and get the discount! " : "Create an account, collect the points and redeem the voucher!")}</span></div></div><div class="col-12 col-md-5 col-lg-12"${_scopeId}><div class="card shadow-sm p-3"${_scopeId}><div class="d-flex border-bottom border-primary border-2 pb-1"${_scopeId}><i class="bi bi-chat-dots text-primary-emphasis me-2 ms-auto"${_scopeId}></i><span class="h6 text-primary-emphasis me-auto my-auto"${_scopeId}>${ssrInterpolate("Rate & Feedback")}</span></div><span class="d-block text-secondary mt-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Rate")}</span><div class="d-flex mt-0 w-100"${_scopeId}><!--[-->`);
              ssrRenderList(5, (i2) => {
                _push2(`<div class="d-flex" style="${ssrRenderStyle({ "width": "20%" })}"${_scopeId}><i class="${ssrRenderClass(
                  "bi text-warning fs-5 d-block card-bg-hover-warning text-center px-2 rounded-circle mx-auto bi-" + (unref(form_add_feedback).rate >= i2 ? "star-fill" : "star")
                )}"${_scopeId}></i></div>`);
              });
              _push2(`<!--]--></div><span for="input_feedback" class="d-block text-secondary mt-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Feedback")}</span><textarea class="form-control mt-2" id="input_feedback" style="${ssrRenderStyle({ "height": "80px" })}"${ssrRenderAttr(
                "placeholder",
                unref(auth_user) ? "Help us serve you better, with give us your honest review." : null
              )}${ssrIncludeBooleanAttr(!unref(auth_user)) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(form_add_feedback).feedback)}</textarea><button type="button" class="btn btn-warning w-100 btn-sm mt-2"${ssrIncludeBooleanAttr(!unref(auth_user)) ? " disabled" : ""}${_scopeId}>${ssrInterpolate("Submit")}</button></div></div></div></div><div class="col-xl-8 col-lg-7 col-12"${_scopeId}><div class="card shadow-sm p-3"${_scopeId}><p class="h6 text-primary-emphasis mb-0 border-bottom border-primary border-2 pb-2"${_scopeId}><i class="bi bi-shop me-1"${_scopeId}></i> ${ssrInterpolate("Available Stand")}</p><div class="scroll-container-4 scroll-container-lg-4 scroll-thumb-warning pe-2 mt-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.stand_list, (stand) => {
                _push2(`<div class="card-bg-hover-warning p-1 mb-4"${_scopeId}><a${ssrRenderAttr("id", "linkStand" + stand.id)}${ssrRenderAttr(
                  "href",
                  _ctx.route("shop.stand", stand.id)
                )}${_scopeId}></a><p class="mb-0 d-flex"${_scopeId}><span class="text-warning-emphasis h6"${_scopeId}>${ssrInterpolate("Stand " + stand.name)}</span><span style="${ssrRenderStyle({ "font-size": "0.8rem" })}" class="ms-auto text-primary text-nowrap me-2"${_scopeId}>${ssrInterpolate(stand_type.find(
                  (item) => item.value == stand.type
                ).name)}</span></p><div class="d-flex"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}><i class="fa-solid fa-utensils text-body-tertiary me-1"${_scopeId}></i> ${ssrInterpolate("Menu")}</span></div><div class="row g-2"${_scopeId}><div class="col-xl-11 col-10"${_scopeId}><div class="w-100"${_scopeId}><div class="scroll-container-horizontal scroll-container-horizontal-lg scroll-thumb-warning py-1 mt-1 bg-warning bg-opacity-25 rounded"${_scopeId}><!--[-->`);
                ssrRenderList(stand.menu.slice(
                  0,
                  7
                ), (menu) => {
                  _push2(`<div class="card card-bg-hover shadow-sm d-inline-block p-0 ms-2 me-2 rounded"${_scopeId}><img${ssrRenderAttr(
                    "src",
                    menu.image ? "/storage/images/shop/foods/menu/" + menu.image : "/storage/local/images/shop/foods/menu/default.png"
                  )} alt="" class="rounded-top placeholder m-1" style="${ssrRenderStyle({ "width": "120px", "height": "120px" })}"${_scopeId}><div class="d-flex px-2"${_scopeId}><div class="scroll-x-hidden" style="${ssrRenderStyle({ "width": "104px" })}"${_scopeId}><span class="text-nowrap text-dark" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(menu.name)}</span></div></div><div class="d-flex px-2"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                    menu.price
                  ))}</span></div></div>`);
                });
                _push2(`<!--]--></div></div></div><div class="col-xl-1 col-2"${_scopeId}><div class="w-100"${_scopeId}><div class="d-flex"${_scopeId}><i class="bi bi-chevron-compact-right text-body-tertiary my-auto fs-1 mt-5 mx-auto"${_scopeId}></i></div><div class="d-flex"${_scopeId}><span class="mx-auto text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("More")}</span></div></div></div></div></div>`);
              });
              _push2(`<!--]-->`);
              if (__props.stand_list.length == 0) {
                _push2(`<div class="d-flex"${_scopeId}><div class="mx-auto"${_scopeId}><span class="fs-1 text-body-tertiary d-block"${_scopeId}>${ssrInterpolate("Oops! No available stand.")}</span><span class="text-secondary d-block"${_scopeId}>${ssrInterpolate("We are searching new recipe for you...")} <i class="fa-solid fa-comment-dots"${_scopeId}></i></span></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value == 2 && unref(auth_user)) {
              _push2(`<div${_scopeId}><div class="row g-4"${_scopeId}><div class="col-12 d-lg-none"${_scopeId}><div class="d-flex bg-white shadow-sm p-1"${_scopeId}><button class="${ssrRenderClass(
                "btn btn-sm btn-outline-primary border-0 w-50 " + (active_history_tab.value == 1 ? "active" : "")
              )}"${_scopeId}>${ssrInterpolate("On Going")} <i class="${ssrRenderClass(
                "bi bi-" + (active_history_tab.value != 1 ? (_g = __props.active_order_list) == null ? void 0 : _g.length : "") + "-square-fill ms-2"
              )}"${_scopeId}></i></button><button class="${ssrRenderClass(
                "btn btn-sm btn-outline-primary border-0 w-50 " + (active_history_tab.value == 2 ? "active" : "")
              )}"${_scopeId}>${ssrInterpolate("Finish")}</button></div></div>`);
              if (isLargeScreen.value || active_history_tab.value == 1) {
                _push2(`<div class="col-xl-6 col-12"${_scopeId}><div class="card p-3 shadow-sm"${_scopeId}><div class="d-flex border-bottom border-primary border-2 pb-2"${_scopeId}><span class="h6 mb-0 text-primary-emphasis"${_scopeId}><i class="bi bi-app-indicator"${_scopeId}></i> ${ssrInterpolate("On Going Order")}</span><span class="text-success my-0 ms-auto" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(((_h = __props.active_order_list) == null ? void 0 : _h.length) + " order")}</span></div><div class="scroll-container-4 scroll-container-lg-3 pe-1 scroll-thumb-warning"${_scopeId}><li class="list-group list-group-flush"${_scopeId}><!--[-->`);
                ssrRenderList(__props.active_order_list, (item) => {
                  _push2(`<ul class="list-group-item list-group-item-action mb-0 px-1 pt-2"${_scopeId}><div class="d-flex"${_scopeId}><span style="${ssrRenderStyle({ "font-size": "0.8rem" })}" class="text-secondary"${_scopeId}><span class="border-end border-2 border-secondary me-1 pe-1"${_scopeId}><i class="bi bi-shop"${_scopeId}></i> ${ssrInterpolate(item.stand.name)}</span>${ssrInterpolate(unref(formatDate)(
                    item.updated_at
                  ))}</span><span style="${ssrRenderStyle({ "font-size": "0.8rem" })}" class="text-primary ms-auto mb-auto"${_scopeId}>${ssrInterpolate(item.send_option == "delivery" ? "Delivery" : "Pick-Up")}</span></div><div class="d-flex"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.6rem" })}"${_scopeId}>${ssrInterpolate("Menu Item")}</span></div><div class="scroll-container scroll-container-lg"${_scopeId}><li class="list-group list-group-flush"${_scopeId}><!--[-->`);
                  ssrRenderList(item.order, (order) => {
                    _push2(`<ul class="list-group-item list-group-item-light mb-0 p-1"${_scopeId}><span class="text-secondary me-1"${_scopeId}>${ssrInterpolate("(" + order.amount + ")")}</span><span class="text-dark"${_scopeId}>${ssrInterpolate(order.menu.name)}</span><span class="text-dark float-end"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                      order.menu.price * order.amount
                    ))}</span></ul>`);
                  });
                  _push2(`<!--]--></li></div><div class="d-flex mt-1"${_scopeId}>`);
                  if (item.discount > 0) {
                    _push2(`<span class="text-secondary ms-3 mt-auto" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("discount :")}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (item.discount > 0) {
                    _push2(`<span class="text-primary-emphasis py-0 my-auto ms-2"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                      item.discount
                    ))}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="text-secondary ms-auto mt-auto" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("total :")}</span><span class="text-primary-emphasis h6 my-auto ms-2"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                    item.transaction
                  ))}</span></div></ul>`);
                });
                _push2(`<!--]--></li>`);
                if (__props.active_order_list.length == 0) {
                  _push2(`<div class="d-flex"${_scopeId}><div class="mx-auto my-3"${_scopeId}><span class="text-secondary my-auto h6 d-block"${_scopeId}>${ssrInterpolate("No Active Order")}</span><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Let`s make new Order!")}</span></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (isLargeScreen.value || active_history_tab.value == 2) {
                _push2(`<div class="col-xl-6 col-12"${_scopeId}><div class="card p-3 shadow-sm"${_scopeId}><div class="d-flex border-bottom border-primary border-2 pb-2"${_scopeId}><span class="h6 mb-0 text-primary-emphasis"${_scopeId}><i class="bi bi-check2-square"${_scopeId}></i> ${ssrInterpolate("Finish Transaction")}</span></div><div class="scroll-container-4 scroll-container-lg-3 pe-1 scroll-thumb-warning"${_scopeId}><li class="list-group list-group-flush"${_scopeId}><!--[-->`);
                ssrRenderList(__props.finished_order_list, (item) => {
                  _push2(`<ul class="list-group-item list-group-item-action mb-0 px-1 pt-2"${_scopeId}><div class="d-flex"${_scopeId}><span style="${ssrRenderStyle({ "font-size": "0.8rem" })}" class="text-secondary"${_scopeId}><span class="border-end border-2 border-secondary me-1 pe-1"${_scopeId}><i class="bi bi-shop"${_scopeId}></i> ${ssrInterpolate(item.stand.name)}</span>${ssrInterpolate(unref(formatDate)(
                    item.updated_at
                  ))}</span><span style="${ssrRenderStyle({ "font-size": "0.8rem" })}" class="text-primary ms-auto mb-auto"${_scopeId}>${ssrInterpolate(item.send_option == "delivery" ? "Delivery" : "Pick-Up")}</span></div><div class="d-flex"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.6rem" })}"${_scopeId}>${ssrInterpolate("Menu Item")}</span></div><div class="scroll-container scroll-container-lg"${_scopeId}><li class="list-group list-group-flush"${_scopeId}><!--[-->`);
                  ssrRenderList(item.order, (order) => {
                    _push2(`<ul class="list-group-item list-group-item-light mb-0 p-1"${_scopeId}><span class="text-secondary me-1"${_scopeId}>${ssrInterpolate("(" + order.amount + ")")}</span><span class="text-dark"${_scopeId}>${ssrInterpolate(order.menu.name)}</span><span class="text-dark float-end"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                      order.menu.price * order.amount
                    ))}</span></ul>`);
                  });
                  _push2(`<!--]--></li></div><div class="d-flex mt-1"${_scopeId}>`);
                  if (item.discount > 0) {
                    _push2(`<span class="text-secondary ms-3 mt-auto" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("discount :")}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (item.discount > 0) {
                    _push2(`<span class="text-primary-emphasis py-0 my-auto ms-2"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                      item.discount
                    ))}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="text-secondary ms-auto mt-auto" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("total :")}</span><span class="text-primary-emphasis h6 my-auto ms-2"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                    item.transaction
                  ))}</span></div></ul>`);
                });
                _push2(`<!--]--></li>`);
                if (__props.active_order_list.length == 0) {
                  _push2(`<div class="d-flex"${_scopeId}><div class="mx-auto my-3"${_scopeId}><span class="text-secondary my-auto h6 d-block"${_scopeId}>${ssrInterpolate("No Active Order")}</span><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Let`s make new Order!")}</span></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="position-fixed bottom-0 start-50 translate-middle-x w-100 bg-white shadow z-1"${_scopeId}><div class="d-flex w-100"${_scopeId}><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-warning w-100 rounded-0 border-0 p-xl-3 p-1 " + (active_tab.value == 1 ? "active" : "")
            )}"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("shop", 1))}${_scopeId}></a><i class="${ssrRenderClass("fa-utensils fa-solid")}"${_scopeId}></i><span class="${ssrRenderClass("d-xl-inline d-block ms-2")}" style="${ssrRenderStyle(isLargeScreen.value ? "font-size: 0.8rem;" : "")}"${_scopeId}>${ssrInterpolate("Foods and Beverage")}</span></button>`);
            if (unref(auth_user)) {
              _push2(`<button class="${ssrRenderClass(
                "btn btn-sm btn-outline-warning w-100 rounded-0 border-0 p-xl-3 p-1 " + (active_tab.value == 2 ? "active" : "")
              )}"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("shop", 2))}${_scopeId}></a><i class="${ssrRenderClass("fa-clipboard-list fa-solid")}"${_scopeId}></i><span class="${ssrRenderClass("d-xl-inline d-block ms-2")}" style="${ssrRenderStyle(isLargeScreen.value ? "font-size: 0.8rem;" : "")}"${_scopeId}>${ssrInterpolate("History")}</span></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "toastNotifRef",
              ref: toastNotifRef
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), {
                title: title.value,
                icon: "/storage/local/images/apps/logo.png"
              }, null, 8, ["title"]),
              createVNode(_sfc_main$1, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
              }, null, 512),
              createVNode(ModalAlertNotification, {
                ref_key: "modalAlertNotificationRef",
                ref: modalAlertNotificationRef
              }, null, 512),
              createVNode("div", {
                class: "card rounded-0 bg-warning bg-opacity-50 position-fixed start-50 translate-middle-x z-3",
                style: headerStyle.value
              }, [
                createVNode("button", {
                  class: "btn btn-light shadow-lg text-start p-2 mx-auto",
                  type: "button",
                  "data-bs-toggle": "offcanvas",
                  "data-bs-target": "#offcanvasRight",
                  "aria-controls": "offcanvasRight"
                }, [
                  createVNode("div", { class: "d-flex" }, [
                    createVNode("div", { class: "d-flex border-end border-primary-subtle border-2 pe-1 me-2" }, [
                      createVNode("img", {
                        src: "/storage/local/images/shop/brand/blaterian_logo.png",
                        alt: "image",
                        style: { "height": "2.5rem" },
                        class: "my-auto"
                      }),
                      createVNode("img", {
                        src: "/storage/local/images/shop/brand/blaterian_text.png",
                        alt: "image",
                        class: "my-auto",
                        style: { "height": "2.5rem" }
                      })
                    ]),
                    createVNode("img", {
                      src: "/storage/images/profile/" + (((_i = unref(auth_user)) == null ? void 0 : _i.profile_image) ?? "example.png"),
                      alt: "image",
                      class: "rounded object-fit-cover placeholder",
                      onLoad: unref(showImage),
                      style: { "width": "3rem", "height": "3rem" }
                    }, null, 40, ["src", "onLoad"]),
                    createVNode("div", { class: "px-2 d-none d-xl-block" }, [
                      createVNode("h6", { class: "mb-0" }, toDisplayString(((_j = unref(auth_user)) == null ? void 0 : _j.name) ?? "Guest"), 1),
                      createVNode("span", { class: "fw-light" }, toDisplayString(unref(auth_user) ? ((_k = unref(auth_user).roles) == null ? void 0 : _k.name) ?? "Customer" : "Please Login"), 1)
                    ])
                  ])
                ])
              ], 4),
              createVNode("div", {
                class: "offcanvas offcanvas-end",
                tabindex: "-1",
                id: "offcanvasRight",
                "aria-labelledby": "offcanvasRightLabel"
              }, [
                createVNode("div", { class: "offcanvas-header border-bottom shadow-sm" }, [
                  createVNode("div", { class: "d-flex" }, [
                    createVNode("img", {
                      src: "/storage/images/profile/" + (((_l = unref(auth_user)) == null ? void 0 : _l.profile_image) ?? "example.png"),
                      alt: "image",
                      class: "rounded img-fluid object-fit-cover placeholder",
                      onLoad: unref(showImage),
                      style: { "width": "3rem", "height": "3rem" }
                    }, null, 40, ["src", "onLoad"]),
                    createVNode("div", { class: "px-2" }, [
                      createVNode("h6", { class: "mb-0" }, toDisplayString(((_m = unref(auth_user)) == null ? void 0 : _m.name) ?? "Guest"), 1),
                      createVNode("span", { class: "fw-light" }, toDisplayString(unref(auth_user) ? ((_n = unref(auth_user).roles) == null ? void 0 : _n.name) ?? "Customer" : "Please Login"), 1)
                    ])
                  ]),
                  createVNode("button", {
                    type: "button",
                    class: "btn btn-sm btn-outline-warning border-0 ms-auto",
                    "data-bs-dismiss": "offcanvas",
                    "aria-label": "Close"
                  }, [
                    createTextVNode(toDisplayString("Close") + " "),
                    createVNode("i", { class: "bi bi-chevron-right" })
                  ])
                ]),
                createVNode("div", { class: "offcanvas-body" }, [
                  createVNode("ul", { class: "list-group list-group-flush" }, [
                    createVNode("li", {
                      class: "list-group-item list-group-item-action",
                      onClick: () => {
                        linkIntroRef.value.click();
                      }
                    }, [
                      createVNode("a", {
                        ref_key: "linkIntroRef",
                        ref: linkIntroRef,
                        href: _ctx.route("intro")
                      }, null, 8, ["href"]),
                      createVNode("div", { class: "d-flex fs-5" }, [
                        createVNode("i", { class: "bi bi-house me-2" }),
                        createTextVNode(" " + toDisplayString("Home"))
                      ])
                    ], 8, ["onClick"]),
                    unref(auth_user) ? (openBlock(), createBlock("li", {
                      key: 0,
                      class: "list-group-item list-group-item-action",
                      onClick: () => {
                        linkProfileRef.value.click();
                      }
                    }, [
                      createVNode("a", {
                        ref_key: "linkProfileRef",
                        ref: linkProfileRef,
                        href: _ctx.route("customer.profile")
                      }, null, 8, ["href"]),
                      createVNode("div", { class: "d-flex fs-5" }, [
                        createVNode("i", { class: "bi bi-person me-2" }),
                        createTextVNode(" " + toDisplayString("Profile"))
                      ])
                    ], 8, ["onClick"])) : createCommentVNode("", true),
                    createVNode("li", { class: "list-group-item list-group-item-action" }, [
                      createVNode("div", { class: "d-flex fs-5" }, [
                        createVNode("i", { class: "bi bi-question-circle me-2" }),
                        createTextVNode(" " + toDisplayString("FAQ"))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "d-flex mt-3" }, [
                    unref(auth_user) ? (openBlock(), createBlock("button", {
                      key: 0,
                      class: "btn btn-warning w-100",
                      onClick: ($event) => confirmation(
                        _ctx.route("logout"),
                        "Are you sure you want to logout?"
                      )
                    }, [
                      createVNode("i", { class: "fa-solid fa-arrow-right-from-bracket" }),
                      createTextVNode(" " + toDisplayString("Logout"))
                    ], 8, ["onClick"])) : createCommentVNode("", true),
                    !unref(auth_user) ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "d-flex rounded border border-warning w-100"
                    }, [
                      createVNode("a", {
                        href: _ctx.route("login"),
                        class: "btn btn-warning w-50 rounded-end-0 border-0"
                      }, [
                        createVNode("i", { class: "fa-solid fa-arrow-right-to-bracket" }),
                        createTextVNode(" " + toDisplayString("Login"))
                      ], 8, ["href"]),
                      createVNode("a", {
                        href: _ctx.route("register"),
                        class: "btn btn-warning w-50 rounded-start-0 border-0"
                      }, [
                        createVNode("i", { class: "fa-solid fa-user-plus" }),
                        createTextVNode(" " + toDisplayString("Register"))
                      ], 8, ["href"])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              createVNode("div", {
                class: "container",
                style: { "margin-bottom": "4rem", "margin-top": "8rem" }
              }, [
                createVNode(Transition, {
                  name: "fade-slide-ltr",
                  onAfterLeave: ($event) => proceedTab()
                }, {
                  default: withCtx(() => [
                    active_tab.value == 1 ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("div", { class: "row g-4" }, [
                        createVNode("div", { class: "col-xl-4 col-lg-5 col-12" }, [
                          createVNode("div", { class: "card shadow-sm p-1" }, [
                            createVNode("div", { class: "scroll-container-horizontal scroll-container-horizontal-lg pb-1" }, [
                              createVNode("img", {
                                src: "/storage/images/billboard/Billboard_1741771637.png",
                                alt: "",
                                class: "img-fluid rounded w-100 me-2"
                              }),
                              createVNode("img", {
                                src: "/storage/images/billboard/Billboard_1741771637.png",
                                alt: "",
                                class: "img-fluid rounded w-100 me-2"
                              })
                            ])
                          ]),
                          createVNode("div", { class: "row g-4 mt-0" }, [
                            createVNode("div", { class: "col-12 col-md-7 col-lg-12" }, [
                              createVNode("div", {
                                class: "card shadow-sm p-3",
                                onClick: () => {
                                  if (unref(auth_user)) {
                                    unref(router).visit(
                                      _ctx.route("shop.promotion")
                                    );
                                  } else {
                                    toastNotifRef.value.showToast(
                                      "warning",
                                      "Please login to redeem the voucher."
                                    );
                                  }
                                }
                              }, [
                                createVNode("div", { class: "d-flex" }, [
                                  createVNode("div", { class: "w-50" }, [
                                    createVNode("span", { class: "h6 text-primary-emphasis d-block mb-0" }, toDisplayString("My Points")),
                                    createVNode("span", { class: "h3 text-warning" }, [
                                      createVNode("i", { class: "fa-solid fa-coins fs-5" }),
                                      createTextVNode(" " + toDisplayString(unref(auth_user) ? 0 : 0), 1)
                                    ])
                                  ]),
                                  createVNode("div", { class: "border border-start border-primary-subtle mx-3" }),
                                  createVNode("div", { class: "w-50" }, [
                                    createVNode("span", { class: "h6 text-primary-emphasis d-block mb-0" }, toDisplayString("My Vouchers")),
                                    createVNode("span", { class: "h3 text-warning" }, [
                                      createVNode("i", { class: "fa-solid fa-ticket fs-5" }),
                                      createTextVNode(" " + toDisplayString(unref(auth_user) ? 0 : 0), 1)
                                    ])
                                  ])
                                ]),
                                createVNode("span", {
                                  class: "text-secondary fst-italic mt-2",
                                  style: { "font-size": "0.8rem" }
                                }, toDisplayString(unref(auth_user) ? "Woo-hoo! You have point, let`s redeem the voucher and get the discount! " : "Create an account, collect the points and redeem the voucher!"), 1)
                              ], 8, ["onClick"])
                            ]),
                            createVNode("div", { class: "col-12 col-md-5 col-lg-12" }, [
                              createVNode("div", { class: "card shadow-sm p-3" }, [
                                createVNode("div", { class: "d-flex border-bottom border-primary border-2 pb-1" }, [
                                  createVNode("i", { class: "bi bi-chat-dots text-primary-emphasis me-2 ms-auto" }),
                                  createVNode("span", { class: "h6 text-primary-emphasis me-auto my-auto" }, toDisplayString("Rate & Feedback"))
                                ]),
                                createVNode("span", {
                                  class: "d-block text-secondary mt-2",
                                  style: { "font-size": "0.8rem" }
                                }, toDisplayString("Rate")),
                                createVNode("div", { class: "d-flex mt-0 w-100" }, [
                                  (openBlock(), createBlock(Fragment, null, renderList(5, (i2) => {
                                    return createVNode("div", {
                                      class: "d-flex",
                                      style: { "width": "20%" },
                                      onClick: () => {
                                        if (unref(auth_user)) {
                                          unref(form_add_feedback).rate = i2;
                                        } else {
                                          toastNotifRef.value.showToast(
                                            "warning",
                                            "We love to hear your feedback. Please login first to submit feedback."
                                          );
                                        }
                                      }
                                    }, [
                                      createVNode("i", {
                                        class: "bi text-warning fs-5 d-block card-bg-hover-warning text-center px-2 rounded-circle mx-auto bi-" + (unref(form_add_feedback).rate >= i2 ? "star-fill" : "star")
                                      }, null, 2)
                                    ], 8, ["onClick"]);
                                  }), 64))
                                ]),
                                createVNode("span", {
                                  for: "input_feedback",
                                  class: "d-block text-secondary mt-2",
                                  style: { "font-size": "0.8rem" }
                                }, toDisplayString("Feedback")),
                                withDirectives(createVNode("textarea", {
                                  class: "form-control mt-2",
                                  id: "input_feedback",
                                  style: { "height": "80px" },
                                  placeholder: unref(auth_user) ? "Help us serve you better, with give us your honest review." : null,
                                  "onUpdate:modelValue": ($event) => unref(form_add_feedback).feedback = $event,
                                  disabled: !unref(auth_user)
                                }, null, 8, ["placeholder", "onUpdate:modelValue", "disabled"]), [
                                  [vModelText, unref(form_add_feedback).feedback]
                                ]),
                                createVNode("button", {
                                  onClick: ($event) => unref(auth_user) ? handleAddFeedback() : alertNotification(
                                    "We love to hear your feedback. Please login first to submit feedback."
                                  ),
                                  type: "button",
                                  class: "btn btn-warning w-100 btn-sm mt-2",
                                  disabled: !unref(auth_user)
                                }, toDisplayString("Submit"), 8, ["onClick", "disabled"])
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "col-xl-8 col-lg-7 col-12" }, [
                          createVNode("div", { class: "card shadow-sm p-3" }, [
                            createVNode("p", { class: "h6 text-primary-emphasis mb-0 border-bottom border-primary border-2 pb-2" }, [
                              createVNode("i", { class: "bi bi-shop me-1" }),
                              createTextVNode(" " + toDisplayString("Available Stand"))
                            ]),
                            createVNode("div", { class: "scroll-container-4 scroll-container-lg-4 scroll-thumb-warning pe-2 mt-3" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.stand_list, (stand) => {
                                return openBlock(), createBlock("div", {
                                  class: "card-bg-hover-warning p-1 mb-4",
                                  onClick: ($event) => redirectToStand(stand.id)
                                }, [
                                  createVNode("a", {
                                    id: "linkStand" + stand.id,
                                    href: _ctx.route("shop.stand", stand.id)
                                  }, null, 8, ["id", "href"]),
                                  createVNode("p", { class: "mb-0 d-flex" }, [
                                    createVNode("span", { class: "text-warning-emphasis h6" }, toDisplayString("Stand " + stand.name), 1),
                                    createVNode("span", {
                                      style: { "font-size": "0.8rem" },
                                      class: "ms-auto text-primary text-nowrap me-2"
                                    }, toDisplayString(stand_type.find(
                                      (item) => item.value == stand.type
                                    ).name), 1)
                                  ]),
                                  createVNode("div", { class: "d-flex" }, [
                                    createVNode("span", {
                                      class: "text-secondary",
                                      style: { "font-size": "0.8rem" }
                                    }, [
                                      createVNode("i", { class: "fa-solid fa-utensils text-body-tertiary me-1" }),
                                      createTextVNode(" " + toDisplayString("Menu"))
                                    ])
                                  ]),
                                  createVNode("div", { class: "row g-2" }, [
                                    createVNode("div", { class: "col-xl-11 col-10" }, [
                                      createVNode("div", { class: "w-100" }, [
                                        createVNode("div", { class: "scroll-container-horizontal scroll-container-horizontal-lg scroll-thumb-warning py-1 mt-1 bg-warning bg-opacity-25 rounded" }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(stand.menu.slice(
                                            0,
                                            7
                                          ), (menu) => {
                                            return openBlock(), createBlock("div", { class: "card card-bg-hover shadow-sm d-inline-block p-0 ms-2 me-2 rounded" }, [
                                              createVNode("img", {
                                                src: menu.image ? "/storage/images/shop/foods/menu/" + menu.image : "/storage/local/images/shop/foods/menu/default.png",
                                                alt: "",
                                                class: "rounded-top placeholder m-1",
                                                style: { "width": "120px", "height": "120px" },
                                                onLoad: unref(showImage)
                                              }, null, 40, ["src", "onLoad"]),
                                              createVNode("div", { class: "d-flex px-2" }, [
                                                createVNode("div", {
                                                  class: "scroll-x-hidden",
                                                  style: { "width": "104px" }
                                                }, [
                                                  createVNode("span", {
                                                    class: "text-nowrap text-dark",
                                                    style: { "font-size": "0.8rem" }
                                                  }, toDisplayString(menu.name), 1)
                                                ])
                                              ]),
                                              createVNode("div", { class: "d-flex px-2" }, [
                                                createVNode("span", {
                                                  class: "text-secondary",
                                                  style: { "font-size": "0.8rem" }
                                                }, toDisplayString(unref(formatIDR)(
                                                  menu.price
                                                )), 1)
                                              ])
                                            ]);
                                          }), 256))
                                        ])
                                      ])
                                    ]),
                                    createVNode("div", { class: "col-xl-1 col-2" }, [
                                      createVNode("div", { class: "w-100" }, [
                                        createVNode("div", { class: "d-flex" }, [
                                          createVNode("i", { class: "bi bi-chevron-compact-right text-body-tertiary my-auto fs-1 mt-5 mx-auto" })
                                        ]),
                                        createVNode("div", { class: "d-flex" }, [
                                          createVNode("span", {
                                            class: "mx-auto text-secondary",
                                            style: { "font-size": "0.8rem" }
                                          }, toDisplayString("More"))
                                        ])
                                      ])
                                    ])
                                  ])
                                ], 8, ["onClick"]);
                              }), 256)),
                              __props.stand_list.length == 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "d-flex"
                              }, [
                                createVNode("div", { class: "mx-auto" }, [
                                  createVNode("span", { class: "fs-1 text-body-tertiary d-block" }, toDisplayString("Oops! No available stand.")),
                                  createVNode("span", { class: "text-secondary d-block" }, [
                                    createTextVNode(toDisplayString("We are searching new recipe for you...") + " "),
                                    createVNode("i", { class: "fa-solid fa-comment-dots" })
                                  ])
                                ])
                              ])) : createCommentVNode("", true)
                            ])
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["onAfterLeave"]),
                createVNode(Transition, {
                  name: "fade-slide-rtl",
                  onAfterLeave: ($event) => proceedTab()
                }, {
                  default: withCtx(() => {
                    var _a2;
                    return [
                      active_tab.value == 2 && unref(auth_user) ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("div", { class: "row g-4" }, [
                          createVNode("div", { class: "col-12 d-lg-none" }, [
                            createVNode("div", { class: "d-flex bg-white shadow-sm p-1" }, [
                              createVNode("button", {
                                onClick: ($event) => active_history_tab.value = 0,
                                class: "btn btn-sm btn-outline-primary border-0 w-50 " + (active_history_tab.value == 1 ? "active" : "")
                              }, [
                                createTextVNode(toDisplayString("On Going") + " "),
                                createVNode("i", {
                                  class: "bi bi-" + (active_history_tab.value != 1 ? (_a2 = __props.active_order_list) == null ? void 0 : _a2.length : "") + "-square-fill ms-2"
                                }, null, 2)
                              ], 10, ["onClick"]),
                              createVNode("button", {
                                onClick: ($event) => active_history_tab.value = 0,
                                class: "btn btn-sm btn-outline-primary border-0 w-50 " + (active_history_tab.value == 2 ? "active" : "")
                              }, toDisplayString("Finish"), 10, ["onClick"])
                            ])
                          ]),
                          createVNode(Transition, {
                            name: "fade-slide-ltr",
                            onAfterLeave: ($event) => active_history_tab.value = 2
                          }, {
                            default: withCtx(() => {
                              var _a3;
                              return [
                                isLargeScreen.value || active_history_tab.value == 1 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "col-xl-6 col-12"
                                }, [
                                  createVNode("div", { class: "card p-3 shadow-sm" }, [
                                    createVNode("div", { class: "d-flex border-bottom border-primary border-2 pb-2" }, [
                                      createVNode("span", { class: "h6 mb-0 text-primary-emphasis" }, [
                                        createVNode("i", { class: "bi bi-app-indicator" }),
                                        createTextVNode(" " + toDisplayString("On Going Order"))
                                      ]),
                                      createVNode("span", {
                                        class: "text-success my-0 ms-auto",
                                        style: { "font-size": "0.8rem" }
                                      }, toDisplayString(((_a3 = __props.active_order_list) == null ? void 0 : _a3.length) + " order"), 1)
                                    ]),
                                    createVNode("div", { class: "scroll-container-4 scroll-container-lg-3 pe-1 scroll-thumb-warning" }, [
                                      createVNode("li", { class: "list-group list-group-flush" }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.active_order_list, (item) => {
                                          return openBlock(), createBlock("ul", { class: "list-group-item list-group-item-action mb-0 px-1 pt-2" }, [
                                            createVNode("div", { class: "d-flex" }, [
                                              createVNode("span", {
                                                style: { "font-size": "0.8rem" },
                                                class: "text-secondary"
                                              }, [
                                                createVNode("span", { class: "border-end border-2 border-secondary me-1 pe-1" }, [
                                                  createVNode("i", { class: "bi bi-shop" }),
                                                  createTextVNode(" " + toDisplayString(item.stand.name), 1)
                                                ]),
                                                createTextVNode(toDisplayString(unref(formatDate)(
                                                  item.updated_at
                                                )), 1)
                                              ]),
                                              createVNode("span", {
                                                style: { "font-size": "0.8rem" },
                                                class: "text-primary ms-auto mb-auto"
                                              }, toDisplayString(item.send_option == "delivery" ? "Delivery" : "Pick-Up"), 1)
                                            ]),
                                            createVNode("div", { class: "d-flex" }, [
                                              createVNode("span", {
                                                class: "text-secondary",
                                                style: { "font-size": "0.6rem" }
                                              }, toDisplayString("Menu Item"))
                                            ]),
                                            createVNode("div", { class: "scroll-container scroll-container-lg" }, [
                                              createVNode("li", { class: "list-group list-group-flush" }, [
                                                (openBlock(true), createBlock(Fragment, null, renderList(item.order, (order) => {
                                                  return openBlock(), createBlock("ul", { class: "list-group-item list-group-item-light mb-0 p-1" }, [
                                                    createVNode("span", { class: "text-secondary me-1" }, toDisplayString("(" + order.amount + ")"), 1),
                                                    createVNode("span", { class: "text-dark" }, toDisplayString(order.menu.name), 1),
                                                    createVNode("span", { class: "text-dark float-end" }, toDisplayString(unref(formatIDR)(
                                                      order.menu.price * order.amount
                                                    )), 1)
                                                  ]);
                                                }), 256))
                                              ])
                                            ]),
                                            createVNode("div", { class: "d-flex mt-1" }, [
                                              item.discount > 0 ? (openBlock(), createBlock("span", {
                                                key: 0,
                                                class: "text-secondary ms-3 mt-auto",
                                                style: { "font-size": "0.8rem" }
                                              }, toDisplayString("discount :"))) : createCommentVNode("", true),
                                              item.discount > 0 ? (openBlock(), createBlock("span", {
                                                key: 1,
                                                class: "text-primary-emphasis py-0 my-auto ms-2"
                                              }, toDisplayString(unref(formatIDR)(
                                                item.discount
                                              )), 1)) : createCommentVNode("", true),
                                              createVNode("span", {
                                                class: "text-secondary ms-auto mt-auto",
                                                style: { "font-size": "0.8rem" }
                                              }, toDisplayString("total :")),
                                              createVNode("span", { class: "text-primary-emphasis h6 my-auto ms-2" }, toDisplayString(unref(formatIDR)(
                                                item.transaction
                                              )), 1)
                                            ])
                                          ]);
                                        }), 256))
                                      ]),
                                      __props.active_order_list.length == 0 ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "d-flex"
                                      }, [
                                        createVNode("div", { class: "mx-auto my-3" }, [
                                          createVNode("span", { class: "text-secondary my-auto h6 d-block" }, toDisplayString("No Active Order")),
                                          createVNode("span", {
                                            class: "text-secondary",
                                            style: { "font-size": "0.8rem" }
                                          }, toDisplayString("Let`s make new Order!"))
                                        ])
                                      ])) : createCommentVNode("", true)
                                    ])
                                  ])
                                ])) : createCommentVNode("", true)
                              ];
                            }),
                            _: 1
                          }, 8, ["onAfterLeave"]),
                          createVNode(Transition, {
                            name: "fade-slide-rtl",
                            onAfterLeave: ($event) => active_history_tab.value = 1
                          }, {
                            default: withCtx(() => [
                              isLargeScreen.value || active_history_tab.value == 2 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "col-xl-6 col-12"
                              }, [
                                createVNode("div", { class: "card p-3 shadow-sm" }, [
                                  createVNode("div", { class: "d-flex border-bottom border-primary border-2 pb-2" }, [
                                    createVNode("span", { class: "h6 mb-0 text-primary-emphasis" }, [
                                      createVNode("i", { class: "bi bi-check2-square" }),
                                      createTextVNode(" " + toDisplayString("Finish Transaction"))
                                    ])
                                  ]),
                                  createVNode("div", { class: "scroll-container-4 scroll-container-lg-3 pe-1 scroll-thumb-warning" }, [
                                    createVNode("li", { class: "list-group list-group-flush" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.finished_order_list, (item) => {
                                        return openBlock(), createBlock("ul", { class: "list-group-item list-group-item-action mb-0 px-1 pt-2" }, [
                                          createVNode("div", { class: "d-flex" }, [
                                            createVNode("span", {
                                              style: { "font-size": "0.8rem" },
                                              class: "text-secondary"
                                            }, [
                                              createVNode("span", { class: "border-end border-2 border-secondary me-1 pe-1" }, [
                                                createVNode("i", { class: "bi bi-shop" }),
                                                createTextVNode(" " + toDisplayString(item.stand.name), 1)
                                              ]),
                                              createTextVNode(toDisplayString(unref(formatDate)(
                                                item.updated_at
                                              )), 1)
                                            ]),
                                            createVNode("span", {
                                              style: { "font-size": "0.8rem" },
                                              class: "text-primary ms-auto mb-auto"
                                            }, toDisplayString(item.send_option == "delivery" ? "Delivery" : "Pick-Up"), 1)
                                          ]),
                                          createVNode("div", { class: "d-flex" }, [
                                            createVNode("span", {
                                              class: "text-secondary",
                                              style: { "font-size": "0.6rem" }
                                            }, toDisplayString("Menu Item"))
                                          ]),
                                          createVNode("div", { class: "scroll-container scroll-container-lg" }, [
                                            createVNode("li", { class: "list-group list-group-flush" }, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(item.order, (order) => {
                                                return openBlock(), createBlock("ul", { class: "list-group-item list-group-item-light mb-0 p-1" }, [
                                                  createVNode("span", { class: "text-secondary me-1" }, toDisplayString("(" + order.amount + ")"), 1),
                                                  createVNode("span", { class: "text-dark" }, toDisplayString(order.menu.name), 1),
                                                  createVNode("span", { class: "text-dark float-end" }, toDisplayString(unref(formatIDR)(
                                                    order.menu.price * order.amount
                                                  )), 1)
                                                ]);
                                              }), 256))
                                            ])
                                          ]),
                                          createVNode("div", { class: "d-flex mt-1" }, [
                                            item.discount > 0 ? (openBlock(), createBlock("span", {
                                              key: 0,
                                              class: "text-secondary ms-3 mt-auto",
                                              style: { "font-size": "0.8rem" }
                                            }, toDisplayString("discount :"))) : createCommentVNode("", true),
                                            item.discount > 0 ? (openBlock(), createBlock("span", {
                                              key: 1,
                                              class: "text-primary-emphasis py-0 my-auto ms-2"
                                            }, toDisplayString(unref(formatIDR)(
                                              item.discount
                                            )), 1)) : createCommentVNode("", true),
                                            createVNode("span", {
                                              class: "text-secondary ms-auto mt-auto",
                                              style: { "font-size": "0.8rem" }
                                            }, toDisplayString("total :")),
                                            createVNode("span", { class: "text-primary-emphasis h6 my-auto ms-2" }, toDisplayString(unref(formatIDR)(
                                              item.transaction
                                            )), 1)
                                          ])
                                        ]);
                                      }), 256))
                                    ]),
                                    __props.active_order_list.length == 0 ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "d-flex"
                                    }, [
                                      createVNode("div", { class: "mx-auto my-3" }, [
                                        createVNode("span", { class: "text-secondary my-auto h6 d-block" }, toDisplayString("No Active Order")),
                                        createVNode("span", {
                                          class: "text-secondary",
                                          style: { "font-size": "0.8rem" }
                                        }, toDisplayString("Let`s make new Order!"))
                                      ])
                                    ])) : createCommentVNode("", true)
                                  ])
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["onAfterLeave"])
                        ])
                      ])) : createCommentVNode("", true)
                    ];
                  }),
                  _: 1
                }, 8, ["onAfterLeave"])
              ]),
              createVNode("div", { class: "position-fixed bottom-0 start-50 translate-middle-x w-100 bg-white shadow z-1" }, [
                createVNode("div", { class: "d-flex w-100" }, [
                  createVNode("button", {
                    class: "btn btn-sm btn-outline-warning w-100 rounded-0 border-0 p-xl-3 p-1 " + (active_tab.value == 1 ? "active" : ""),
                    onClick: ($event) => setTab(1)
                  }, [
                    createVNode("a", {
                      ref_key: "linkShop1",
                      ref: linkShop1,
                      href: _ctx.route("shop", 1)
                    }, null, 8, ["href"]),
                    createVNode("i", { class: "fa-utensils fa-solid" }),
                    createVNode("span", {
                      class: "d-xl-inline d-block ms-2",
                      style: isLargeScreen.value ? "font-size: 0.8rem;" : ""
                    }, toDisplayString("Foods and Beverage"), 4)
                  ], 10, ["onClick"]),
                  unref(auth_user) ? (openBlock(), createBlock("button", {
                    key: 0,
                    onClick: ($event) => setTab(2),
                    class: "btn btn-sm btn-outline-warning w-100 rounded-0 border-0 p-xl-3 p-1 " + (active_tab.value == 2 ? "active" : "")
                  }, [
                    createVNode("a", {
                      ref_key: "linkShop2",
                      ref: linkShop2,
                      href: _ctx.route("shop", 2)
                    }, null, 8, ["href"]),
                    createVNode("i", { class: "fa-clipboard-list fa-solid" }),
                    createVNode("span", {
                      class: "d-xl-inline d-block ms-2",
                      style: isLargeScreen.value ? "font-size: 0.8rem;" : ""
                    }, toDisplayString("History"), 4)
                  ], 10, ["onClick"])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(_sfc_main$2, {
                ref_key: "toastNotifRef",
                ref: toastNotifRef
              }, null, 512)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Shop.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
