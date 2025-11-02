import { ref, computed, onMounted, onUnmounted, watch, withCtx, unref, createVNode, toDisplayString, createTextVNode, Transition, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$3 } from "./InputError-DugfSnOg.js";
import { G as GuestLayout } from "./GuestLayout-EBOafcqa.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CQDhtLdH.js";
import { M as ModalAlertNotification } from "./ModalAlertNotification-DTKoiHkW.js";
import { f as formatIDR, a as formatDate, b as showImage } from "../app.js";
import { usePage, useForm, Head, router } from "@inertiajs/vue3";
import { format } from "date-fns";
import "vue-toastification";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "axios";
import "bootstrap";
const _sfc_main = {
  __name: "Promotion",
  __ssrInlineRender: true,
  props: {
    notif: Object,
    voucher_list: Array,
    customer_voucher: Array
  },
  setup(__props) {
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const title = ref("Promotion");
    const active_tab = ref(1);
    const active_tab_voucher = ref(1);
    const toastNotifRef = ref(null);
    const modalConfirmationRef = ref(null);
    const modalAlertNotificationRef = ref(null);
    const modalAddVoucher = ref(null);
    const isLargeScreen = ref(window.innerWidth >= 1200);
    const scrollY = ref(0);
    const onScroll = () => {
      scrollY.value = window.scrollY;
    };
    ref([]);
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
    const handleResize = () => {
      isLargeScreen.value = window.innerWidth >= 768;
      window.addEventListener("resize", handleResize);
    };
    const form_add_voucher = useForm({
      name: null,
      code: null,
      point: 0,
      start_date: 0,
      end_date: 0,
      image: null,
      user_quota: 0,
      min_transaction: 0,
      discount_type: "price",
      discount_price: 0,
      discount_percent: 0,
      discount_max_price: 0
    });
    function showAddVoucherModal(is_show) {
      if (modalAddVoucher.value == null) {
        const modal = document.getElementById("addVoucherModal");
        modalAddVoucher.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalAddVoucher.value.show();
      }
    }
    function changeDetailCollapseTriger(id) {
      const collapseElement = document.getElementById(
        "voucherDetailTrigger" + id
      );
      if (collapseElement.innerHTML == "Click to see voucher detail") {
        collapseElement.innerHTML = "Hide voucher detail";
      } else {
        collapseElement.innerHTML = "Click to see voucher detail";
      }
    }
    function changeCustomerDetailCollapseTriger(id) {
      const collapseElement = document.getElementById(
        "customerVoucherDetailTrigger" + id
      );
      if (collapseElement.innerHTML == "Click to see voucher detail") {
        collapseElement.innerHTML = "Hide voucher detail";
      } else {
        collapseElement.innerHTML = "Click to see voucher detail";
      }
    }
    function alertNotification(message) {
      modalAlertNotificationRef.value.showModal(message);
    }
    function confirmation(route, message) {
      if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route, message);
      } else {
        console.error("modalConfirmationRef is null");
      }
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
      var _a;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(GuestLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: title.value }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(ModalAlertNotification, {
              ref_key: "modalAlertNotificationRef",
              ref: modalAlertNotificationRef
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "toastNotifRef",
              ref: toastNotifRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="card rounded-0 bg-warning bg-opacity-50 position-fixed start-50 translate-middle-x z-3" style="${ssrRenderStyle(headerStyle.value)}"${_scopeId}><div class="card shadow-lg mx-auto px-3 py-3"${_scopeId}><div class="d-flex text-primary-emphasis"${_scopeId}><button class="btn btn-sm btn-light text-primary"${_scopeId}><i class="bi bi-chevron-left"${_scopeId}></i><span class="d-none d-lg-inline ms-2"${_scopeId}>${ssrInterpolate("Back")}</span></button><div class="border-start border-primary border-2 mx-2 mx-lg-4"${_scopeId}></div><img${ssrRenderAttr(
              "src",
              "/storage/images/profile/" + (((_a2 = unref(auth_user)) == null ? void 0 : _a2.profile_image) ?? "example.png")
            )} alt="image" class="rounded object-fit-cover placeholder" style="${ssrRenderStyle({ "width": "3rem", "height": "3rem" })}"${_scopeId}><div class="px-2"${_scopeId}><h6 class="mb-0"${_scopeId}>${ssrInterpolate(((_b = unref(auth_user)) == null ? void 0 : _b.name) ?? "Guest")}</h6><span class="fw-light"${_scopeId}>${ssrInterpolate(unref(auth_user) ? ((_c = unref(auth_user).roles) == null ? void 0 : _c.name) ?? "Customer" : "Please Login")}</span></div></div></div></div><div class="container" style="${ssrRenderStyle({ "margin-top": "9rem" })}"${_scopeId}><div class="row"${_scopeId}><div class="col-12 col-xl-5"${_scopeId}><div class="card bg-white shadow p-3"${_scopeId}><div class="d-flex"${_scopeId}><div class="w-50"${_scopeId}><div class="d-flex"${_scopeId}><span class="d-block text-primary-emphasis h6 mb-0 me-3 my-auto"${_scopeId}>${ssrInterpolate("My Point")}</span><i class="bi bi-question-circle my-auto"${_scopeId}></i></div><span class="d-block text-warning fs-5 fw-bold"${_scopeId}><i class="fa-solid fa-coins me-1"${_scopeId}></i> ${ssrInterpolate(((_d = unref(auth_user)) == null ? void 0 : _d.point) ?? 0)}</span></div><div class="w-50"${_scopeId}><div class="d-flex"${_scopeId}><span class="d-block text-primary-emphasis h6 mb-0 me-3 my-auto"${_scopeId}>${ssrInterpolate("My Voucher")}</span><i class="bi bi-question-circle my-auto"${_scopeId}></i></div><span class="d-block text-warning fs-5 fw-bold"${_scopeId}><i class="fa-solid fa-ticket me-1"${_scopeId}></i> ${ssrInterpolate(((_e = __props.customer_voucher) == null ? void 0 : _e.length) ?? 0)}</span></div></div></div><div class="d-flex d-xl-none mt-4 bg-white shadow-sm p-2 rounded"${_scopeId}><button class="${ssrRenderClass(
              "btn btn-sm border-0 card-bg-hover-warning w-50 " + (active_tab_voucher.value == 1 ? "bg-warning bg-opacity-10" : "")
            )}"${_scopeId}><i class="bi bi-folder2-open me-2"${_scopeId}></i>${ssrInterpolate("Available")}</button><button class="${ssrRenderClass(
              "btn btn-sm border-0 card-bg-hover-warning w-50 ms-2 " + (active_tab_voucher.value == 2 ? "bg-warning bg-opacity-10" : "")
            )}"${_scopeId}><i class="bi bi-folder-plus me-2"${_scopeId}></i>${ssrInterpolate("Gallery")}</button></div>`);
            if (active_tab_voucher.value == 1 || isLargeScreen.value) {
              _push2(`<div class="card bg-white shadow-sm my-4 px-0"${_scopeId}><div class="card p-3 shadow-sm bg-white rounded-bottom-0"${_scopeId}><span class="text-primary-emphasis h6 mb-0"${_scopeId}><i class="bi bi-folder2-open me-2"${_scopeId}></i> ${ssrInterpolate("Available Voucher")}</span></div><div class="d-flex"${_scopeId}><div class="scroll-container-4 scroll-container-lg-3 scroll-thumb-warning pe-3 ps-3 pb-2 pt-3"${_scopeId}>`);
              if (!(((_f = __props.customer_voucher) == null ? void 0 : _f.length) > 0)) {
                _push2(`<div class="my-3"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-secondary mx-auto"${_scopeId}>${ssrInterpolate("No voucher available")}</span></div><div class="d-flex"${_scopeId}><span class="text-secondary mx-auto fst-italic" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Redeem voucher using points")}</span></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(__props.customer_voucher, (voucher) => {
                _push2(`<div class="position-relative bg-warning bg-opacity-25 d-flex rounded-4 mb-3"${_scopeId}><!--[-->`);
                ssrRenderList([
                  { top: "30%", left: "0" },
                  { top: "70%", left: "0" },
                  { top: "30%", left: "100%" },
                  { top: "70%", left: "100%" }
                ], (dot) => {
                  _push2(`<div class="position-absolute rounded-circle p-3 bg-white" style="${ssrRenderStyle({
                    top: dot.top,
                    left: dot.left,
                    transform: "translate(-50%, -50%)"
                  })}"${_scopeId}></div>`);
                });
                _push2(`<!--]--><div class="d-xl-flex d-block border-secondary-subtle rounded-3 border-0 bg-primary bg-opacity-25 my-2 mx-4 w-100 py-2 px-3"${_scopeId}><img${ssrRenderAttr(
                  "src",
                  "/storage/images/shop/voucher/" + ((voucher == null ? void 0 : voucher.image) ?? "default.png")
                )} class="rounded-3 my-auto" alt="Ticket Image" style="${ssrRenderStyle({
                  aspectRatio: "1/1",
                  width: isLargeScreen.value ? "25%" : "100%",
                  minWidth: "90px",
                  backgroundSize: "cover"
                })}"${_scopeId}><div class="ms-xl-3 rounded bg-white p-3" style="${ssrRenderStyle({
                  width: isLargeScreen.value ? "75%" : "100%"
                })}"${_scopeId}><div class="d-flex bg-primary bg-opacity-10 rounded-top"${_scopeId}><span class="text-primary h6 mb-0 mx-auto py-1"${_scopeId}>${ssrInterpolate((voucher == null ? void 0 : voucher.discount_type) == "price" ? "DISCOUNT " + unref(formatIDR)(
                  voucher == null ? void 0 : voucher.discount_price
                ) + "!" : "DISCOUNT " + (voucher == null ? void 0 : voucher.discount_percent) + "%!")}</span></div><div class="d-flex"${_scopeId}><span class="text-primary-emphasis" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("PROMO : ")} <span class="h6 mb-0" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(((voucher == null ? void 0 : voucher.name) ?? "No Name").toUpperCase())}</span></span></div><div class="d-flex mb-2"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(unref(format)(
                  voucher == null ? void 0 : voucher.start_date,
                  "d MMM yyy"
                ) + " - " + unref(format)(
                  voucher == null ? void 0 : voucher.end_date,
                  "d MMM yyy"
                ))}</span></div><div class="mb-2"${_scopeId}><div class="card border text-secondary"${_scopeId}><button${ssrRenderAttr(
                  "id",
                  "customerVoucherDetailTrigger" + (voucher == null ? void 0 : voucher.id)
                )} class="btn btn-sm text-primary card-bg-hover border-0 py-1" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-bs-toggle="collapse"${ssrRenderAttr(
                  "data-bs-target",
                  "#customerVoucherDetail" + (voucher == null ? void 0 : voucher.id)
                )}${_scopeId}>${ssrInterpolate("Click to see voucher detail")}</button><div class="collapse"${ssrRenderAttr(
                  "id",
                  "customerVoucherDetail" + (voucher == null ? void 0 : voucher.id)
                )} style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}><li class="list-group list-group-flush"${_scopeId}><!--[-->`);
                ssrRenderList({
                  user_quota: {
                    text: "This voucher can be redeemed by the first " + (voucher == null ? void 0 : voucher.user_quota) + " user.",
                    sub: "Kupon ini dapat ditebus oleh " + (voucher == null ? void 0 : voucher.user_quota) + " pengguna tercepat."
                  },
                  min_transaction: {
                    text: "Minimum transaction is " + unref(formatIDR)(
                      voucher == null ? void 0 : voucher.min_transaction
                    ) + ".",
                    sub: "Transaksi minimum senilai " + unref(formatIDR)(
                      voucher == null ? void 0 : voucher.min_transaction
                    ) + "."
                  },
                  discount_max_price: {
                    text: voucher.discount_type == "percent" ? "Maximum discount price is " + unref(formatIDR)(
                      voucher == null ? void 0 : voucher.discount_max_price
                    ) + "." : null,
                    sub: voucher.discount_type == "percent" ? "Potongan harga paling besar senilai " + unref(formatIDR)(
                      voucher == null ? void 0 : voucher.discount_max_price
                    ) + "." : null
                  }
                }, (item, key) => {
                  _push2(`<ul class="list-group-item list-group-item-action mb-0 py-1"${_scopeId}><div class="d-inline"${_scopeId}><p class="mb-0"${_scopeId}>${ssrInterpolate(item.text)}</p><p class="mb-0 fst-italic text-secondary"${_scopeId}>${ssrInterpolate(item.sub)}</p></div></ul>`);
                });
                _push2(`<!--]--></li></div></div></div></div></div></div>`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-12 col-xl-7"${_scopeId}>`);
            if (active_tab_voucher.value == 2 || isLargeScreen.value) {
              _push2(`<div class="card bg-white shadow-sm p-0 mt-4 mt-xl-0"${_scopeId}><div class="d-flex shadow-sm p-3"${_scopeId}><span class="text-primary-emphasis h6 mb-0 me-3"${_scopeId}><i class="bi bi-folder-plus me-2"${_scopeId}></i> ${ssrInterpolate("Voucher Gallery")}</span>`);
              if (((_g = unref(auth_user)) == null ? void 0 : _g.roles_id) == 3) {
                _push2(`<button class="btn btn-sm btn-outline-primary border-0 py-0 ms-auto"${_scopeId}><i class="bi bi-plus-lg me-1"${_scopeId}></i> ${ssrInterpolate("Add Voucher")}</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="d-flex"${_scopeId}><div class="scroll-container-4 scroll-container-lg-4 pe-3 ps-3 pt-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.voucher_list, (voucher) => {
                _push2(`<div class="position-relative bg-warning bg-opacity-25 d-flex rounded-4 mb-3"${_scopeId}><!--[-->`);
                ssrRenderList([
                  { top: "30%", left: "0" },
                  { top: "70%", left: "0" },
                  { top: "30%", left: "100%" },
                  { top: "70%", left: "100%" }
                ], (dot) => {
                  _push2(`<div class="position-absolute rounded-circle p-3 bg-white" style="${ssrRenderStyle({
                    top: dot.top,
                    left: dot.left,
                    transform: "translate(-50%, -50%)"
                  })}"${_scopeId}></div>`);
                });
                _push2(`<!--]--><div class="d-xl-flex d-block border-secondary-subtle rounded-3 border-0 bg-primary bg-opacity-25 my-2 mx-4 w-100 py-2 px-3"${_scopeId}><img${ssrRenderAttr(
                  "src",
                  "/storage/images/shop/voucher/" + ((voucher == null ? void 0 : voucher.image) ?? "default.png")
                )} class="rounded-3 my-auto" alt="Ticket Image" style="${ssrRenderStyle({
                  aspectRatio: "1/1",
                  width: isLargeScreen.value ? "25%" : "100%",
                  minWidth: "90px",
                  backgroundSize: "cover"
                })}"${_scopeId}><div class="ms-xl-3 rounded bg-white p-3" style="${ssrRenderStyle({
                  width: isLargeScreen.value ? "75%" : "100%"
                })}"${_scopeId}><div class="d-flex bg-success bg-opacity-10 rounded-top"${_scopeId}><span class="text-primary h6 mb-0 mx-auto py-1"${_scopeId}>${ssrInterpolate((voucher == null ? void 0 : voucher.discount_type) == "price" ? "DISCOUNT " + unref(formatIDR)(
                  voucher == null ? void 0 : voucher.discount_price
                ) + "!" : "DISCOUNT " + (voucher == null ? void 0 : voucher.discount_percent) + "%!")}</span></div><div class="d-flex"${_scopeId}><span class="text-primary-emphasis" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("PROMO : ")} <span class="h6 mb-0" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(((voucher == null ? void 0 : voucher.name) ?? "No Name").toUpperCase())}</span></span></div><div class="d-flex mb-2"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(unref(format)(
                  voucher == null ? void 0 : voucher.start_date,
                  "d MMM yyy"
                ) + " - " + unref(format)(
                  voucher == null ? void 0 : voucher.end_date,
                  "d MMM yyy"
                ))}</span></div><div class="mb-2"${_scopeId}><div class="card border text-secondary"${_scopeId}><button${ssrRenderAttr(
                  "id",
                  "voucherDetailTrigger" + (voucher == null ? void 0 : voucher.id)
                )} class="btn btn-sm text-primary card-bg-hover border-0 py-1" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-bs-toggle="collapse"${ssrRenderAttr(
                  "data-bs-target",
                  "#voucherDetail" + (voucher == null ? void 0 : voucher.id)
                )}${_scopeId}>${ssrInterpolate("Click to see voucher detail")}</button><div class="collapse"${ssrRenderAttr(
                  "id",
                  "voucherDetail" + (voucher == null ? void 0 : voucher.id)
                )} style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}><li class="list-group list-group-flush"${_scopeId}><!--[-->`);
                ssrRenderList({
                  user_quota: {
                    text: "This voucher can be redeemed by the first " + (voucher == null ? void 0 : voucher.user_quota) + " user.",
                    sub: "Kupon ini dapat ditebus oleh " + (voucher == null ? void 0 : voucher.user_quota) + " pengguna tercepat."
                  },
                  min_transaction: {
                    text: "Minimum transaction is " + unref(formatIDR)(
                      voucher == null ? void 0 : voucher.min_transaction
                    ) + ".",
                    sub: "Transaksi minimum senilai " + unref(formatIDR)(
                      voucher == null ? void 0 : voucher.min_transaction
                    ) + "."
                  },
                  discount_max_price: {
                    text: voucher.discount_type == "percent" ? "Maximum discount price is " + unref(formatIDR)(
                      voucher == null ? void 0 : voucher.discount_max_price
                    ) + "." : null,
                    sub: voucher.discount_type == "percent" ? "Potongan harga paling besar senilai " + unref(formatIDR)(
                      voucher == null ? void 0 : voucher.discount_max_price
                    ) + "." : null
                  },
                  author: {
                    text: unref(auth_user).roles_id > 0 ? voucher.customer.length + " customer has redeemed this voucher." : null,
                    sub: unref(auth_user).roles_id > 0 ? "This is only shown to staff of SEEO. Customer can not see this information." : null
                  },
                  redeemed_user: {
                    text: unref(auth_user).roles_id > 0 ? "Created by " + voucher.operational.name + " at " + unref(formatDate)(
                      voucher.created_at
                    ) + "." : null,
                    sub: unref(auth_user).roles_id > 0 ? "This is only shown to staff of SEEO. Customer can not see this information." : null
                  }
                }, (item, key) => {
                  _push2(`<ul class="list-group-item list-group-item-action mb-0 py-1"${_scopeId}><div class="d-inline"${_scopeId}><p class="mb-0"${_scopeId}>${ssrInterpolate(item.text)}</p><p class="mb-0 fst-italic text-secondary"${_scopeId}>${ssrInterpolate(item.sub)}</p></div></ul>`);
                });
                _push2(`<!--]--></li></div></div></div><div class="d-flex"${_scopeId}><button class="btn btn-sm btn-primary w-100"${ssrIncludeBooleanAttr(
                  voucher.customer.length > voucher.user_quota
                ) ? " disabled" : ""}${_scopeId}>${ssrInterpolate("Redeem")} <span class="h6 my-auto ms-2 mb-0"${_scopeId}>${ssrInterpolate(voucher == null ? void 0 : voucher.point)}</span><i class="ms-1 fa-solid fa-coins"${_scopeId}></i></button></div></div></div></div>`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: title.value }, null, 8, ["title"]),
              createVNode(_sfc_main$1, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
              }, null, 512),
              createVNode(ModalAlertNotification, {
                ref_key: "modalAlertNotificationRef",
                ref: modalAlertNotificationRef
              }, null, 512),
              createVNode(_sfc_main$2, {
                ref_key: "toastNotifRef",
                ref: toastNotifRef
              }, null, 512),
              createVNode("div", {
                class: "card rounded-0 bg-warning bg-opacity-50 position-fixed start-50 translate-middle-x z-3",
                style: headerStyle.value
              }, [
                createVNode("div", { class: "card shadow-lg mx-auto px-3 py-3" }, [
                  createVNode("div", { class: "d-flex text-primary-emphasis" }, [
                    createVNode("button", {
                      class: "btn btn-sm btn-light text-primary",
                      onClick: ($event) => unref(router).visit(_ctx.route("shop"))
                    }, [
                      createVNode("i", { class: "bi bi-chevron-left" }),
                      createVNode("span", { class: "d-none d-lg-inline ms-2" }, toDisplayString("Back"))
                    ], 8, ["onClick"]),
                    createVNode("div", { class: "border-start border-primary border-2 mx-2 mx-lg-4" }),
                    createVNode("img", {
                      src: "/storage/images/profile/" + (((_h = unref(auth_user)) == null ? void 0 : _h.profile_image) ?? "example.png"),
                      alt: "image",
                      class: "rounded object-fit-cover placeholder",
                      onLoad: unref(showImage),
                      style: { "width": "3rem", "height": "3rem" }
                    }, null, 40, ["src", "onLoad"]),
                    createVNode("div", { class: "px-2" }, [
                      createVNode("h6", { class: "mb-0" }, toDisplayString(((_i = unref(auth_user)) == null ? void 0 : _i.name) ?? "Guest"), 1),
                      createVNode("span", { class: "fw-light" }, toDisplayString(unref(auth_user) ? ((_j = unref(auth_user).roles) == null ? void 0 : _j.name) ?? "Customer" : "Please Login"), 1)
                    ])
                  ])
                ])
              ], 4),
              createVNode("div", {
                class: "container",
                style: { "margin-top": "9rem" }
              }, [
                createVNode("div", { class: "row" }, [
                  createVNode("div", { class: "col-12 col-xl-5" }, [
                    createVNode("div", { class: "card bg-white shadow p-3" }, [
                      createVNode("div", { class: "d-flex" }, [
                        createVNode("div", { class: "w-50" }, [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis h6 mb-0 me-3 my-auto" }, toDisplayString("My Point")),
                            createVNode("i", {
                              onClick: ($event) => alertNotification(
                                "Point is used to redeem voucher and promotion. For every multiple of Rp10.000 in a transaction, you will earn 50 point."
                              ),
                              class: "bi bi-question-circle my-auto"
                            }, null, 8, ["onClick"])
                          ]),
                          createVNode("span", { class: "d-block text-warning fs-5 fw-bold" }, [
                            createVNode("i", { class: "fa-solid fa-coins me-1" }),
                            createTextVNode(" " + toDisplayString(((_k = unref(auth_user)) == null ? void 0 : _k.point) ?? 0), 1)
                          ])
                        ]),
                        createVNode("div", { class: "w-50" }, [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("span", { class: "d-block text-primary-emphasis h6 mb-0 me-3 my-auto" }, toDisplayString("My Voucher")),
                            createVNode("i", {
                              onClick: ($event) => alertNotification(
                                "Voucher is a discount that can be used in the next transaction. You can earn voucher by redeeming point"
                              ),
                              class: "bi bi-question-circle my-auto"
                            }, null, 8, ["onClick"])
                          ]),
                          createVNode("span", { class: "d-block text-warning fs-5 fw-bold" }, [
                            createVNode("i", { class: "fa-solid fa-ticket me-1" }),
                            createTextVNode(" " + toDisplayString(((_l = __props.customer_voucher) == null ? void 0 : _l.length) ?? 0), 1)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "d-flex d-xl-none mt-4 bg-white shadow-sm p-2 rounded" }, [
                      createVNode("button", {
                        class: "btn btn-sm border-0 card-bg-hover-warning w-50 " + (active_tab_voucher.value == 1 ? "bg-warning bg-opacity-10" : ""),
                        onClick: ($event) => active_tab_voucher.value = 0
                      }, [
                        createVNode("i", { class: "bi bi-folder2-open me-2" }),
                        createTextVNode(toDisplayString("Available"))
                      ], 10, ["onClick"]),
                      createVNode("button", {
                        class: "btn btn-sm border-0 card-bg-hover-warning w-50 ms-2 " + (active_tab_voucher.value == 2 ? "bg-warning bg-opacity-10" : ""),
                        onClick: ($event) => active_tab_voucher.value = 0
                      }, [
                        createVNode("i", { class: "bi bi-folder-plus me-2" }),
                        createTextVNode(toDisplayString("Gallery"))
                      ], 10, ["onClick"])
                    ]),
                    createVNode(Transition, {
                      name: "fade-slide-ltr",
                      onAfterLeave: ($event) => active_tab_voucher.value = 2
                    }, {
                      default: withCtx(() => {
                        var _a3;
                        return [
                          active_tab_voucher.value == 1 || isLargeScreen.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "card bg-white shadow-sm my-4 px-0"
                          }, [
                            createVNode("div", { class: "card p-3 shadow-sm bg-white rounded-bottom-0" }, [
                              createVNode("span", { class: "text-primary-emphasis h6 mb-0" }, [
                                createVNode("i", { class: "bi bi-folder2-open me-2" }),
                                createTextVNode(" " + toDisplayString("Available Voucher"))
                              ])
                            ]),
                            createVNode("div", { class: "d-flex" }, [
                              createVNode("div", { class: "scroll-container-4 scroll-container-lg-3 scroll-thumb-warning pe-3 ps-3 pb-2 pt-3" }, [
                                !(((_a3 = __props.customer_voucher) == null ? void 0 : _a3.length) > 0) ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "my-3"
                                }, [
                                  createVNode("div", { class: "d-flex" }, [
                                    createVNode("span", { class: "text-secondary mx-auto" }, toDisplayString("No voucher available"))
                                  ]),
                                  createVNode("div", { class: "d-flex" }, [
                                    createVNode("span", {
                                      class: "text-secondary mx-auto fst-italic",
                                      style: { "font-size": "0.8rem" }
                                    }, toDisplayString("Redeem voucher using points"))
                                  ])
                                ])) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.customer_voucher, (voucher) => {
                                  return openBlock(), createBlock("div", {
                                    key: voucher.id,
                                    class: "position-relative bg-warning bg-opacity-25 d-flex rounded-4 mb-3"
                                  }, [
                                    (openBlock(), createBlock(Fragment, null, renderList([
                                      { top: "30%", left: "0" },
                                      { top: "70%", left: "0" },
                                      { top: "30%", left: "100%" },
                                      { top: "70%", left: "100%" }
                                    ], (dot) => {
                                      return createVNode("div", {
                                        class: "position-absolute rounded-circle p-3 bg-white",
                                        style: {
                                          top: dot.top,
                                          left: dot.left,
                                          transform: "translate(-50%, -50%)"
                                        }
                                      }, null, 4);
                                    }), 64)),
                                    createVNode("div", { class: "d-xl-flex d-block border-secondary-subtle rounded-3 border-0 bg-primary bg-opacity-25 my-2 mx-4 w-100 py-2 px-3" }, [
                                      createVNode("img", {
                                        src: "/storage/images/shop/voucher/" + ((voucher == null ? void 0 : voucher.image) ?? "default.png"),
                                        class: "rounded-3 my-auto",
                                        alt: "Ticket Image",
                                        style: {
                                          aspectRatio: "1/1",
                                          width: isLargeScreen.value ? "25%" : "100%",
                                          minWidth: "90px",
                                          backgroundSize: "cover"
                                        }
                                      }, null, 12, ["src"]),
                                      createVNode("div", {
                                        class: "ms-xl-3 rounded bg-white p-3",
                                        style: {
                                          width: isLargeScreen.value ? "75%" : "100%"
                                        }
                                      }, [
                                        createVNode("div", { class: "d-flex bg-primary bg-opacity-10 rounded-top" }, [
                                          createVNode("span", { class: "text-primary h6 mb-0 mx-auto py-1" }, toDisplayString((voucher == null ? void 0 : voucher.discount_type) == "price" ? "DISCOUNT " + unref(formatIDR)(
                                            voucher == null ? void 0 : voucher.discount_price
                                          ) + "!" : "DISCOUNT " + (voucher == null ? void 0 : voucher.discount_percent) + "%!"), 1)
                                        ]),
                                        createVNode("div", { class: "d-flex" }, [
                                          createVNode("span", {
                                            class: "text-primary-emphasis",
                                            style: { "font-size": "0.8rem" }
                                          }, [
                                            createTextVNode(toDisplayString("PROMO : ") + " "),
                                            createVNode("span", {
                                              class: "h6 mb-0",
                                              style: { "font-size": "0.8rem" }
                                            }, toDisplayString(((voucher == null ? void 0 : voucher.name) ?? "No Name").toUpperCase()), 1)
                                          ])
                                        ]),
                                        createVNode("div", { class: "d-flex mb-2" }, [
                                          createVNode("span", {
                                            class: "text-secondary",
                                            style: { "font-size": "0.8rem" }
                                          }, toDisplayString(unref(format)(
                                            voucher == null ? void 0 : voucher.start_date,
                                            "d MMM yyy"
                                          ) + " - " + unref(format)(
                                            voucher == null ? void 0 : voucher.end_date,
                                            "d MMM yyy"
                                          )), 1)
                                        ]),
                                        createVNode("div", { class: "mb-2" }, [
                                          createVNode("div", { class: "card border text-secondary" }, [
                                            createVNode("button", {
                                              id: "customerVoucherDetailTrigger" + (voucher == null ? void 0 : voucher.id),
                                              class: "btn btn-sm text-primary card-bg-hover border-0 py-1",
                                              style: { "font-size": "0.8rem" },
                                              "data-bs-toggle": "collapse",
                                              "data-bs-target": "#customerVoucherDetail" + (voucher == null ? void 0 : voucher.id),
                                              onClick: ($event) => changeCustomerDetailCollapseTriger(
                                                voucher == null ? void 0 : voucher.id
                                              )
                                            }, toDisplayString("Click to see voucher detail"), 8, ["id", "data-bs-target", "onClick"]),
                                            createVNode("div", {
                                              class: "collapse",
                                              id: "customerVoucherDetail" + (voucher == null ? void 0 : voucher.id),
                                              style: { "font-size": "0.8rem" }
                                            }, [
                                              createVNode("li", { class: "list-group list-group-flush" }, [
                                                (openBlock(true), createBlock(Fragment, null, renderList({
                                                  user_quota: {
                                                    text: "This voucher can be redeemed by the first " + (voucher == null ? void 0 : voucher.user_quota) + " user.",
                                                    sub: "Kupon ini dapat ditebus oleh " + (voucher == null ? void 0 : voucher.user_quota) + " pengguna tercepat."
                                                  },
                                                  min_transaction: {
                                                    text: "Minimum transaction is " + unref(formatIDR)(
                                                      voucher == null ? void 0 : voucher.min_transaction
                                                    ) + ".",
                                                    sub: "Transaksi minimum senilai " + unref(formatIDR)(
                                                      voucher == null ? void 0 : voucher.min_transaction
                                                    ) + "."
                                                  },
                                                  discount_max_price: {
                                                    text: voucher.discount_type == "percent" ? "Maximum discount price is " + unref(formatIDR)(
                                                      voucher == null ? void 0 : voucher.discount_max_price
                                                    ) + "." : null,
                                                    sub: voucher.discount_type == "percent" ? "Potongan harga paling besar senilai " + unref(formatIDR)(
                                                      voucher == null ? void 0 : voucher.discount_max_price
                                                    ) + "." : null
                                                  }
                                                }, (item, key) => {
                                                  return openBlock(), createBlock("ul", { class: "list-group-item list-group-item-action mb-0 py-1" }, [
                                                    createVNode("div", { class: "d-inline" }, [
                                                      createVNode("p", { class: "mb-0" }, toDisplayString(item.text), 1),
                                                      createVNode("p", { class: "mb-0 fst-italic text-secondary" }, toDisplayString(item.sub), 1)
                                                    ])
                                                  ]);
                                                }), 256))
                                              ])
                                            ], 8, ["id"])
                                          ])
                                        ])
                                      ], 4)
                                    ])
                                  ]);
                                }), 128))
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ];
                      }),
                      _: 1
                    }, 8, ["onAfterLeave"])
                  ]),
                  createVNode("div", { class: "col-12 col-xl-7" }, [
                    createVNode(Transition, {
                      name: "fade-slide-rtl",
                      onAfterLeave: ($event) => active_tab_voucher.value = 1
                    }, {
                      default: withCtx(() => {
                        var _a3;
                        return [
                          active_tab_voucher.value == 2 || isLargeScreen.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "card bg-white shadow-sm p-0 mt-4 mt-xl-0"
                          }, [
                            createVNode("div", { class: "d-flex shadow-sm p-3" }, [
                              createVNode("span", { class: "text-primary-emphasis h6 mb-0 me-3" }, [
                                createVNode("i", { class: "bi bi-folder-plus me-2" }),
                                createTextVNode(" " + toDisplayString("Voucher Gallery"))
                              ]),
                              ((_a3 = unref(auth_user)) == null ? void 0 : _a3.roles_id) == 3 ? (openBlock(), createBlock("button", {
                                key: 0,
                                class: "btn btn-sm btn-outline-primary border-0 py-0 ms-auto",
                                onClick: () => {
                                  if (unref(auth_user).roles_id == 3) {
                                    showAddVoucherModal();
                                  }
                                }
                              }, [
                                createVNode("i", { class: "bi bi-plus-lg me-1" }),
                                createTextVNode(" " + toDisplayString("Add Voucher"))
                              ], 8, ["onClick"])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "d-flex" }, [
                              createVNode("div", { class: "scroll-container-4 scroll-container-lg-4 pe-3 ps-3 pt-3" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.voucher_list, (voucher) => {
                                  return openBlock(), createBlock("div", {
                                    key: voucher.id,
                                    class: "position-relative bg-warning bg-opacity-25 d-flex rounded-4 mb-3"
                                  }, [
                                    (openBlock(), createBlock(Fragment, null, renderList([
                                      { top: "30%", left: "0" },
                                      { top: "70%", left: "0" },
                                      { top: "30%", left: "100%" },
                                      { top: "70%", left: "100%" }
                                    ], (dot) => {
                                      return createVNode("div", {
                                        class: "position-absolute rounded-circle p-3 bg-white",
                                        style: {
                                          top: dot.top,
                                          left: dot.left,
                                          transform: "translate(-50%, -50%)"
                                        }
                                      }, null, 4);
                                    }), 64)),
                                    createVNode("div", { class: "d-xl-flex d-block border-secondary-subtle rounded-3 border-0 bg-primary bg-opacity-25 my-2 mx-4 w-100 py-2 px-3" }, [
                                      createVNode("img", {
                                        src: "/storage/images/shop/voucher/" + ((voucher == null ? void 0 : voucher.image) ?? "default.png"),
                                        class: "rounded-3 my-auto",
                                        alt: "Ticket Image",
                                        style: {
                                          aspectRatio: "1/1",
                                          width: isLargeScreen.value ? "25%" : "100%",
                                          minWidth: "90px",
                                          backgroundSize: "cover"
                                        }
                                      }, null, 12, ["src"]),
                                      createVNode("div", {
                                        class: "ms-xl-3 rounded bg-white p-3",
                                        style: {
                                          width: isLargeScreen.value ? "75%" : "100%"
                                        }
                                      }, [
                                        createVNode("div", { class: "d-flex bg-success bg-opacity-10 rounded-top" }, [
                                          createVNode("span", { class: "text-primary h6 mb-0 mx-auto py-1" }, toDisplayString((voucher == null ? void 0 : voucher.discount_type) == "price" ? "DISCOUNT " + unref(formatIDR)(
                                            voucher == null ? void 0 : voucher.discount_price
                                          ) + "!" : "DISCOUNT " + (voucher == null ? void 0 : voucher.discount_percent) + "%!"), 1)
                                        ]),
                                        createVNode("div", { class: "d-flex" }, [
                                          createVNode("span", {
                                            class: "text-primary-emphasis",
                                            style: { "font-size": "0.8rem" }
                                          }, [
                                            createTextVNode(toDisplayString("PROMO : ") + " "),
                                            createVNode("span", {
                                              class: "h6 mb-0",
                                              style: { "font-size": "0.8rem" }
                                            }, toDisplayString(((voucher == null ? void 0 : voucher.name) ?? "No Name").toUpperCase()), 1)
                                          ])
                                        ]),
                                        createVNode("div", { class: "d-flex mb-2" }, [
                                          createVNode("span", {
                                            class: "text-secondary",
                                            style: { "font-size": "0.8rem" }
                                          }, toDisplayString(unref(format)(
                                            voucher == null ? void 0 : voucher.start_date,
                                            "d MMM yyy"
                                          ) + " - " + unref(format)(
                                            voucher == null ? void 0 : voucher.end_date,
                                            "d MMM yyy"
                                          )), 1)
                                        ]),
                                        createVNode("div", { class: "mb-2" }, [
                                          createVNode("div", { class: "card border text-secondary" }, [
                                            createVNode("button", {
                                              id: "voucherDetailTrigger" + (voucher == null ? void 0 : voucher.id),
                                              class: "btn btn-sm text-primary card-bg-hover border-0 py-1",
                                              style: { "font-size": "0.8rem" },
                                              "data-bs-toggle": "collapse",
                                              "data-bs-target": "#voucherDetail" + (voucher == null ? void 0 : voucher.id),
                                              onClick: ($event) => changeDetailCollapseTriger(
                                                voucher == null ? void 0 : voucher.id
                                              )
                                            }, toDisplayString("Click to see voucher detail"), 8, ["id", "data-bs-target", "onClick"]),
                                            createVNode("div", {
                                              class: "collapse",
                                              id: "voucherDetail" + (voucher == null ? void 0 : voucher.id),
                                              style: { "font-size": "0.8rem" }
                                            }, [
                                              createVNode("li", { class: "list-group list-group-flush" }, [
                                                (openBlock(true), createBlock(Fragment, null, renderList({
                                                  user_quota: {
                                                    text: "This voucher can be redeemed by the first " + (voucher == null ? void 0 : voucher.user_quota) + " user.",
                                                    sub: "Kupon ini dapat ditebus oleh " + (voucher == null ? void 0 : voucher.user_quota) + " pengguna tercepat."
                                                  },
                                                  min_transaction: {
                                                    text: "Minimum transaction is " + unref(formatIDR)(
                                                      voucher == null ? void 0 : voucher.min_transaction
                                                    ) + ".",
                                                    sub: "Transaksi minimum senilai " + unref(formatIDR)(
                                                      voucher == null ? void 0 : voucher.min_transaction
                                                    ) + "."
                                                  },
                                                  discount_max_price: {
                                                    text: voucher.discount_type == "percent" ? "Maximum discount price is " + unref(formatIDR)(
                                                      voucher == null ? void 0 : voucher.discount_max_price
                                                    ) + "." : null,
                                                    sub: voucher.discount_type == "percent" ? "Potongan harga paling besar senilai " + unref(formatIDR)(
                                                      voucher == null ? void 0 : voucher.discount_max_price
                                                    ) + "." : null
                                                  },
                                                  author: {
                                                    text: unref(auth_user).roles_id > 0 ? voucher.customer.length + " customer has redeemed this voucher." : null,
                                                    sub: unref(auth_user).roles_id > 0 ? "This is only shown to staff of SEEO. Customer can not see this information." : null
                                                  },
                                                  redeemed_user: {
                                                    text: unref(auth_user).roles_id > 0 ? "Created by " + voucher.operational.name + " at " + unref(formatDate)(
                                                      voucher.created_at
                                                    ) + "." : null,
                                                    sub: unref(auth_user).roles_id > 0 ? "This is only shown to staff of SEEO. Customer can not see this information." : null
                                                  }
                                                }, (item, key) => {
                                                  return openBlock(), createBlock("ul", { class: "list-group-item list-group-item-action mb-0 py-1" }, [
                                                    createVNode("div", { class: "d-inline" }, [
                                                      createVNode("p", { class: "mb-0" }, toDisplayString(item.text), 1),
                                                      createVNode("p", { class: "mb-0 fst-italic text-secondary" }, toDisplayString(item.sub), 1)
                                                    ])
                                                  ]);
                                                }), 256))
                                              ])
                                            ], 8, ["id"])
                                          ])
                                        ]),
                                        createVNode("div", { class: "d-flex" }, [
                                          createVNode("button", {
                                            class: "btn btn-sm btn-primary w-100",
                                            disabled: voucher.customer.length > voucher.user_quota,
                                            onClick: ($event) => voucher.customer.length <= voucher.user_quota ? confirmation(
                                              _ctx.route(
                                                "customer.redeem.voucher",
                                                voucher.id
                                              ),
                                              "Are you sure you want to redeem Voucher " + (voucher == null ? void 0 : voucher.name.toUpperCase()) + "?"
                                            ) : alertNotification(
                                              "This voucher has been redeemed by the maximum user quota."
                                            )
                                          }, [
                                            createTextVNode(toDisplayString("Redeem") + " "),
                                            createVNode("span", { class: "h6 my-auto ms-2 mb-0" }, toDisplayString(voucher == null ? void 0 : voucher.point), 1),
                                            createVNode("i", { class: "ms-1 fa-solid fa-coins" })
                                          ], 8, ["disabled", "onClick"])
                                        ])
                                      ], 4)
                                    ])
                                  ]);
                                }), 128))
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ];
                      }),
                      _: 1
                    }, 8, ["onAfterLeave"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (((_a = unref(auth_user)) == null ? void 0 : _a.roles_id) == 3) {
        _push(`<div class="modal fade" id="addVoucherModal" tabindex="-1" aria-labelledby="addVoucherModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="fa-solid fa-ticket pe-2"></i> ${ssrInterpolate("New Voucher")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><form><div class="modal-body bg-light">`);
        if (active_tab.value == 1) {
          _push(`<div><div class="d-flex"><span class="text-primary-emphasis mx-auto mb-2">${ssrInterpolate("General Condition ")}</span></div><div class="row mt-0 justify-content-center"><div class="col-4 col-lg-3"><label for="voucher_name" class="form-label d-inline-block">${ssrInterpolate("Name")}</label></div><div class="col-8 col-lg-7"><input type="text" class="form-control form-control-sm" id="voucher_name"${ssrRenderAttr("value", unref(form_add_voucher).name)} required>`);
          _push(ssrRenderComponent(_sfc_main$3, {
            message: unref(form_add_voucher).errors.name,
            class: "mt-2"
          }, null, _parent));
          _push(`</div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="voucher_code" class="form-label d-inline-block">${ssrInterpolate("Code")}</label></div><div class="col-8 col-lg-7"><input type="text" class="form-control form-control-sm" id="voucher_code"${ssrRenderAttr("value", unref(form_add_voucher).code)} placeholder="e.g. VOUCHER123" required>`);
          _push(ssrRenderComponent(_sfc_main$3, {
            message: unref(form_add_voucher).errors.code,
            class: "mt-2"
          }, null, _parent));
          _push(`</div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="voucher_point" class="form-label d-inline-block">${ssrInterpolate("Point")}</label></div><div class="col-8 col-lg-7"><input type="number" class="form-control form-control-sm" id="voucher_point"${ssrRenderAttr("value", unref(form_add_voucher).point)} required>`);
          _push(ssrRenderComponent(_sfc_main$3, {
            message: unref(form_add_voucher).errors.point,
            class: "mt-2"
          }, null, _parent));
          _push(`</div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="voucher_start" class="form-label d-inline-block">${ssrInterpolate("Start Date")}</label></div><div class="col-8 col-lg-7"><input type="date" class="form-control form-control-sm" id="voucher_start"${ssrRenderAttr(
            "value",
            unref(form_add_voucher).start_date
          )} required>`);
          _push(ssrRenderComponent(_sfc_main$3, {
            message: unref(form_add_voucher).errors.start_date,
            class: "mt-2"
          }, null, _parent));
          _push(`</div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="voucher_end" class="form-label d-inline-block">${ssrInterpolate("End Date")}</label></div><div class="col-8 col-lg-7"><input type="date" class="form-control form-control-sm" id="voucher_end"${ssrRenderAttr("value", unref(form_add_voucher).end_date)} required>`);
          _push(ssrRenderComponent(_sfc_main$3, {
            message: unref(form_add_voucher).errors.end_date,
            class: "mt-2"
          }, null, _parent));
          _push(`</div></div><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="voucher_image" class="form-label d-inline-block">${ssrInterpolate("Image")}</label></div><div class="col-8 col-lg-7"><input type="file" class="form-control form-control-sm" id="voucher_image" required><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Ratio = 1:1 ")}</span>`);
          _push(ssrRenderComponent(_sfc_main$3, {
            message: unref(form_add_voucher).errors.image,
            class: "mt-2"
          }, null, _parent));
          _push(`</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (active_tab.value == 2) {
          _push(`<div><div class="d-flex"><span class="text-primary-emphasis mx-auto mb-2">${ssrInterpolate("Specific Condition")}</span></div><div class="row"><div class="col-12"><div class="card shadow-sm p-2 bg-white"><div class="form-floating mb-2"><input type="number" class="form-control form-control-sm" id="voucher_user_max_quota"${ssrRenderAttr(
            "value",
            unref(form_add_voucher).user_quota
          )} placeholder="10"><label for="voucher_user_max_quota">${ssrInterpolate("User Quota")} `);
          _push(ssrRenderComponent(_sfc_main$3, {
            message: unref(form_add_voucher).errors.min_transaction,
            class: "ms-2"
          }, null, _parent));
          _push(`</label></div><div class="form-floating mb-2"><input type="number" class="form-control form-control-sm" id="voucher_min_transaction"${ssrRenderAttr(
            "value",
            unref(form_add_voucher).min_transaction
          )} placeholder="10"><label for="voucher_min_transaction">${ssrInterpolate("Minimum Transaction (Rp)")} `);
          _push(ssrRenderComponent(_sfc_main$3, {
            message: unref(form_add_voucher).errors.min_transaction,
            class: "ms-2"
          }, null, _parent));
          _push(`</label></div><div class="d-flex w-100"><button type="button" class="${ssrRenderClass(
            "btn btn-outline-secondary btn-sm w-50 border-0 rounded-end-0 " + (unref(form_add_voucher).discount_type == "price" ? "active" : "")
          )}">${ssrInterpolate("by Price")}</button><button type="button" class="${ssrRenderClass(
            "btn btn-outline-secondary btn-sm w-50 border-0 rounded-start-0 " + (unref(form_add_voucher).discount_type == "percent" ? "active" : "")
          )}">${ssrInterpolate("by Percent")}</button></div>`);
          if (unref(form_add_voucher).discount_type == "price") {
            _push(`<div class="form-floating mt-2"><input type="number" class="form-control form-control-sm" id="voucher_discount_price"${ssrRenderAttr(
              "value",
              unref(form_add_voucher).discount_price
            )}><label for="voucher_discount_price">${ssrInterpolate("Price (Rp)")} `);
            _push(ssrRenderComponent(_sfc_main$3, {
              message: unref(form_add_voucher).errors.discount_price,
              class: "ms-2"
            }, null, _parent));
            _push(`</label></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(form_add_voucher).discount_type == "percent") {
            _push(`<div class="mt-2"><div class="form-floating mb-2"><input type="number" class="form-control form-control-sm" id="voucher_discount_percent"${ssrRenderAttr(
              "value",
              unref(form_add_voucher).discount_percent
            )}><label for="voucher_discount_percent">${ssrInterpolate("Percent (%)")} `);
            _push(ssrRenderComponent(_sfc_main$3, {
              message: unref(form_add_voucher).errors.discount_percent,
              class: "ms-2"
            }, null, _parent));
            _push(`</label></div><div class="form-floating mb-2"><input type="number" class="form-control form-control-sm" id="voucher_discount_max_price"${ssrRenderAttr(
              "value",
              unref(form_add_voucher).discount_max_price
            )}><label for="voucher_discount_max_price">${ssrInterpolate("Maximum Discount (Rp)")} `);
            _push(ssrRenderComponent(_sfc_main$3, {
              message: unref(form_add_voucher).errors.discount_max_price,
              class: "ms-2"
            }, null, _parent));
            _push(`</label></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="modal-footer p-1">`);
        if (active_tab.value == 1) {
          _push(`<button type="button" class="btn btn-sm btn-primary" style="${ssrRenderStyle({ "width": "10rem" })}">${ssrInterpolate("Next")} <i class="bi bi-chevron-right ms-2"></i></button>`);
        } else {
          _push(`<!---->`);
        }
        if (active_tab.value == 2) {
          _push(`<div class="d-flex w-100"><button type="button" class="btn btn-sm btn-primary me-auto" style="${ssrRenderStyle({ "width": "10rem" })}"><i class="bi bi-chevron-left me-2"></i> ${ssrInterpolate("Back")}</button><button type="submit" class="btn btn-sm btn-primary" style="${ssrRenderStyle({ "width": "10rem" })}"><i class="bi bi-plus-lg me-2"></i> ${ssrInterpolate("Add Voucher")}</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Promotion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
