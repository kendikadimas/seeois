import { ref, computed, onMounted, onUnmounted, watch, withCtx, unref, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, Transition, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./Notif-DL0SggHu.js";
import { G as GuestLayout } from "./GuestLayout-EBOafcqa.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CQDhtLdH.js";
import { f as formatIDR, b as showImage } from "../app.js";
import { usePage, useForm, Head, router } from "@inertiajs/vue3";
import { format } from "date-fns";
import "vue-toastification";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "axios";
import "bootstrap";
const _sfc_main = {
  __name: "Stand",
  __ssrInlineRender: true,
  props: {
    notif: Object,
    stand: Object,
    menu_group: Object,
    customer_voucher: Array,
    active_transaction: Object
  },
  setup(__props) {
    var _a;
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const title = ref("Stand " + props.stand.name);
    const toastNotifRef = ref(null);
    const modalConfirmationRef = ref(null);
    const active_tab = ref(1);
    const isLargeScreen = ref(window.innerWidth >= 1200);
    const scrollY = ref(0);
    const onScroll = () => {
      scrollY.value = window.scrollY;
    };
    const form_add_transaction = useForm({
      stand_id: props.stand.id,
      order_list: [],
      voucher_id: null,
      discount: null,
      transaction: null
    });
    const order_list = ref(((_a = props.active_transaction) == null ? void 0 : _a.order_list) ?? []);
    const total_price = computed(() => {
      return order_list.value.reduce((total, item) => {
        return total + item.price * item.qty;
      }, 0);
    });
    const total_item = computed(() => {
      return order_list.value.reduce((total, item) => {
        return total + Number(item.qty);
      }, 0);
    });
    const discount = computed(() => {
      const voucher = props.customer_voucher.find(
        (voucher2) => voucher2.id == form_add_transaction.voucher_id
      );
      if (voucher == null ? void 0 : voucher.discount_percent) {
        const discountedPrice = total_price.value * (voucher == null ? void 0 : voucher.discount_percent) / 100;
        return discountedPrice > voucher.discount_max_price ? voucher.discount_max_price : discountedPrice;
      } else if (voucher == null ? void 0 : voucher.discount_price) {
        return voucher == null ? void 0 : voucher.discount_price;
      }
    });
    const order_type = computed(() => {
      if (props.stand.type == 0) {
        return "Now";
      } else if (props.stand.type == 1) {
        return "Pre-Order";
      } else if (props.stand.type == 2) {
        return "Now / Pre-Order";
      }
    });
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
    function handlePayment() {
      form_add_transaction.order_list = order_list.value;
      form_add_transaction.discount = discount.value;
      form_add_transaction.transaction = total_price.value - (discount.value ?? 0);
      form_add_transaction.post(route("shop.checkout"), {
        onError: (e) => {
          for (let key in e) {
            toastNotifRef.value.showToast("warning", e[key]);
          }
        }
      });
    }
    function confirmation(route2, message) {
      if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route2, message);
      } else {
        console.error("modalConfirmationRef is null");
      }
    }
    onMounted(() => {
      var _a2;
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", onScroll);
      form_add_transaction.voucher_id = ((_a2 = props.active_transaction) == null ? void 0 : _a2.voucher_id) ?? null;
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
    watch(
      () => total_price.value,
      (newValue) => {
        const total = newValue;
        const voucher = props.customer_voucher.find(
          (item) => item.id == form_add_transaction.voucher_id
        );
        if (total < (voucher == null ? void 0 : voucher.min_transaction)) {
          toastNotifRef.value.showToast("warning", [
            "Subtotal is less than minimum transaction."
          ]);
          setTimeout(() => {
            form_add_transaction.voucher_id = null;
            toastNotifRef.value.showToast("warning", ["Voucher removed."]);
          }, 1e3);
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(GuestLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: title.value }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "toastNotifRef",
              ref: toastNotifRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="card rounded-0 bg-warning bg-opacity-50 position-fixed start-50 translate-middle-x z-3" style="${ssrRenderStyle(headerStyle.value)}"${_scopeId}><div class="card shadow-lg mx-auto px-3 py-3"${_scopeId}><div class="d-flex text-primary-emphasis"${_scopeId}><button class="btn btn-sm btn-light text-primary"${_scopeId}><i class="bi bi-chevron-left"${_scopeId}></i><span class="d-none d-lg-inline ms-2"${_scopeId}>${ssrInterpolate("Back")}</span></button><div class="border-start border-primary border-2 mx-2 mx-lg-4"${_scopeId}></div><span class="h5 my-auto"${_scopeId}><i class="bi bi-shop me-0 d-inline d-lg-inline"${_scopeId}></i> ${ssrInterpolate("Stand " + __props.stand.name)}</span></div></div></div><div class="container pb-5" style="${ssrRenderStyle({ "min-height": "100vh", "margin-top": "8rem" })}"${_scopeId}><div class="row g-4"${_scopeId}><div class="col-12 d-block d-xl-none"${_scopeId}><div class="d-flex bg-white shadow-sm p-2 mb-2"${_scopeId}><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary border-0 w-50 me-2 " + (active_tab.value == 1 ? "active" : "")
            )}"${_scopeId}><i class="fa-solid fa-utensils me-1"${_scopeId}></i> ${ssrInterpolate("Menu")}</button><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary border-0 w-50 " + (active_tab.value == 2 ? "active" : "")
            )}"${_scopeId}><i class="bi bi-cart4 me-1"${_scopeId}></i><span class="position-relative"${_scopeId}>${ssrInterpolate("Cart")}</span>`);
            if (order_list.value.length > 0 && active_tab.value != 2) {
              _push2(`<span class="bg-danger text-white rounded-2 ms-2" style="${ssrRenderStyle({ "font-size": "0.7rem", "padding": "0.1rem 0.5rem" })}"${_scopeId}>${ssrInterpolate(order_list.value.length)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button></div></div>`);
            if (active_tab.value == 1 || isLargeScreen.value) {
              _push2(`<div class="col-12 col-xl-8"${_scopeId}><div class="card bg-white shadow-sm p-0"${_scopeId}><div class="d-flex shadow-sm"${_scopeId}><span class="text-secondary m-3"${_scopeId}><i class="fa-solid fa-utensils me-2"${_scopeId}></i> ${ssrInterpolate("Menu List")}</span><span class="text-secondary ms-auto me-3 my-auto" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("order type :")} <span class="ms-1 fw-bold"${_scopeId}>${ssrInterpolate(order_type.value)}</span></span></div><div class="scroll-container-lg-5 scroll-container-4 scroll-thumb-warning pe-1"${_scopeId}>`);
              if (order_list.value.length == 0) {
                _push2(`<div class="d-flex w-100 p-2"${_scopeId}><span class="text-secondary fst-italic mx-auto"${_scopeId}>${ssrInterpolate(unref(auth_user) ? "Click on the menu to add to cart" : "Please login to add menu to cart")}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(__props.menu_group, (menu_list, key) => {
                _push2(`<li class="list-group list-group-flush"${_scopeId}><ul class="list-group-item mb-0 bg-warning bg-opacity-10"${_scopeId}><span class="text-warning-emphasis"${_scopeId}>${ssrInterpolate(key)}</span></ul><!--[-->`);
                ssrRenderList(menu_list, (item) => {
                  _push2(`<ul class="${ssrRenderClass(
                    "list-group-item list-group-item-action px-2 py-1 mb-0 " + (item.sale < item.stock ? "" : "bg-secondary bg-opacity-10")
                  )}"${_scopeId}><div class="text-nowrap p-1"${_scopeId}><div class="rounded-3 d-inline-block float-start" style="${ssrRenderStyle({
                    width: isLargeScreen.value ? "20%" : "30%"
                  })}"${_scopeId}><img${ssrRenderAttr(
                    "src",
                    item.image ? "/storage/images/shop/foods/menu/" + item.image : "/storage/images/shop/foods/menu/default.png"
                  )} alt="image" class="placeholder img-fluid rounded" style="${ssrRenderStyle({ "aspect-ratio": "1" })}"${_scopeId}></div><div class="ps-2 d-inline-block" style="${ssrRenderStyle({
                    width: isLargeScreen.value ? "80%" : "70%"
                  })}"${_scopeId}><div class="d-flex"${_scopeId}><div class="scroll-x-hidden me-2 my-auto"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-primary-emphasis text-nowrap me-1"${_scopeId}>${ssrInterpolate(item.name)}</span></div></div></div><div${_scopeId}><span class="text-secondary d-inline-block my-auto" style="${ssrRenderStyle({ "width": "60px", "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Price")}</span><span${_scopeId}>${ssrInterpolate(":")}</span><span class="ms-1 h6"${_scopeId}>${ssrInterpolate(unref(formatIDR)(item.price))}</span></div><div class=""${_scopeId}><span class="text-secondary d-inline-block my-auto" style="${ssrRenderStyle({ "width": "60px", "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Detail")}</span><span class="text-secondary d-inline-block text-nowrap"${_scopeId}>${ssrInterpolate(":")} ${ssrInterpolate((!(item.volume > 0) && !(item.mass > 0) ? "- " : "") + (item.volume > 0 ? item.volume + item.volume_unit + " " : "") + (item.volume > 0 && item.mass > 0 ? "- " : "") + (item.mass > 0 ? item.mass + item.mass_unit + " " : ""))}</span></div><div class="d-block"${_scopeId}><span class="text-secondary d-inline-block my-auto" style="${ssrRenderStyle({ "width": "60px", "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Taste")}</span><span${_scopeId}>${ssrInterpolate(":")}</span><div class="d-inline-flex me-5" style="${ssrRenderStyle({ "flex-wrap": "wrap" })}"${_scopeId}><!--[-->`);
                  ssrRenderList(item.tags, (tag) => {
                    _push2(`<span class="py-0 px-2 ms-2 mb-2 rounded-1 bg-secondary bg-opacity-10 text-secondary d-inline-block border-0" style="${ssrRenderStyle({
                      borderWidth: "1px",
                      borderStyle: "solid",
                      fontSize: "0.8rem"
                    })}"${_scopeId}>${ssrInterpolate(tag.name)}</span>`);
                  });
                  _push2(`<!--]-->`);
                  if (item.tags.length == 0) {
                    _push2(`<span class="py-0 px-2 ms-2 rounded-1 border-secondary text-secondary mb-2" style="${ssrRenderStyle({
                      borderWidth: "1px",
                      borderStyle: "solid",
                      fontSize: "0.8rem"
                    })}"${_scopeId}>${ssrInterpolate("None")}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div><div class=""${_scopeId}><span class="text-secondary d-inline-block" style="${ssrRenderStyle({ "width": "60px", "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Sold ")}</span><span class="text-dark my-auto text-nowrap"${_scopeId}>${ssrInterpolate(": " + item.sale)}</span><div class="${ssrRenderClass(
                    "card bg-opacity-10 px-2 d-inline-block float-end bg-" + (item.sale < item.stock ? "warning" : "secondary")
                  )}"${_scopeId}><span class="${ssrRenderClass(
                    "text-" + (item.sale < item.stock ? "secondary" : "primary")
                  )}" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(item.sale < item.stock ? "Ready Stock" : "Out of Stock")}</span></div></div></div></div></ul>`);
                });
                _push2(`<!--]--></li>`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value == 2 || isLargeScreen.value) {
              _push2(`<div class="col-12 col-xl-4"${_scopeId}><div class="card bg-white shadow-sm p-3"${_scopeId}><div class="d-flex border-bottom border-2 border-primary mb-3 pb-1"${_scopeId}><span class="h6 text-primary-emphasis mx-auto"${_scopeId}><i class="bi bi-cart4 me-0"${_scopeId}></i> ${ssrInterpolate("My Order")}</span></div>`);
              if (order_list.value.length == 0) {
                _push2(`<div class="d-flex w-100 p-2"${_scopeId}><span class="text-secondary fst-italic mx-auto"${_scopeId}>${ssrInterpolate(unref(auth_user) ? "Click on the menu to add to cart" : "Please login to add menu to cart")}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="scroll-container-lg-3 scroll-container-3 scroll-thumb-warning pe-1"${_scopeId}><li class="list-group list-group-flush"${_scopeId}><!--[-->`);
              ssrRenderList(order_list.value, (item, index) => {
                _push2(`<ul class="list-group-item list-group-item-action px-0 py-1 mb-0"${_scopeId}><div class="w-25 float-start"${_scopeId}><img${ssrRenderAttr(
                  "src",
                  "/storage/images/shop/foods/menu/" + ((item == null ? void 0 : item.image) ?? "default.png")
                )} alt="image" style="${ssrRenderStyle({ "aspect-ratio": "1", "width": "100%" })}" class="placeholder img-fluid rounded"${_scopeId}></div><div class="w-75 float-end ps-3"${_scopeId}><span class="d-block text-primary-emphasis"${_scopeId}>${ssrInterpolate(item.name)}</span><div class=""${_scopeId}><span class="d-inline-block text-secondary my-auto" style="${ssrRenderStyle({ "width": "60px", "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Price")}</span><span class=""${_scopeId}>${ssrInterpolate(": " + unref(formatIDR)(item.price))}</span></div><div class=""${_scopeId}><span class="d-inline-block text-secondary my-auto" style="${ssrRenderStyle({ "width": "60px", "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Total")}</span><span class="h6"${_scopeId}>${ssrInterpolate(": " + unref(formatIDR)(
                  item.price * item.qty
                ))}</span></div><div class="d-flex"${_scopeId}><button class="btn btn-sm btn-outline-primary border-0 py-0 ms-auto"${_scopeId}><i class="${ssrRenderClass(
                  "bi bi-" + (item.qty > 1 ? "dash" : "trash3")
                )}"${_scopeId}></i></button><span class="d-inline block bg-warning bg-opacity-10 px-2 text-warning-emphasis h6 mb-0"${_scopeId}>${ssrInterpolate(item.qty)}</span><button class="btn btn-sm btn-outline-primary border-0 py-0"${_scopeId}><i class="${ssrRenderClass("bi bi-plus")}"${_scopeId}></i></button></div></div></ul>`);
              });
              _push2(`<!--]--></li></div></div><div class="card bg-white shadow-sm p-3 mt-4"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-secondary"${_scopeId}>${ssrInterpolate("Subtotal ( " + total_item.value + (total_item.value > 1 ? " items" : " item") + " )")}</span><span class="ms-auto"${_scopeId}>${ssrInterpolate(unref(formatIDR)(total_price.value ?? 0))}</span></div><div class="d-flex mt-2"${_scopeId}><span class="text-secondary my-auto"${_scopeId}>${ssrInterpolate("Voucher")}</span><div class="bg-warning bg-opacity-10 ms-auto rounded"${_scopeId}><button${ssrIncludeBooleanAttr(!unref(auth_user)) ? " disabled" : ""} data-bs-toggle="modal" data-bs-target="#voucherModal" type="button" class="btn btn-sm card-bg-hover-warning text-warning-emphasis border-0 p-1 px-2 px-1"${_scopeId}><span class=""${_scopeId}>${ssrInterpolate(((_a3 = __props.customer_voucher.find(
                (item) => item.id == unref(form_add_transaction).voucher_id
              )) == null ? void 0 : _a3.code) ?? "Click here")}</span><i class="fa-solid fa-ticket ms-2 rounded"${_scopeId}></i></button></div></div><div class="d-flex mt-2"${_scopeId}><span class="text-secondary"${_scopeId}>${ssrInterpolate("Discount")}</span><span class="ms-auto"${_scopeId}>${ssrInterpolate(unref(formatIDR)(discount.value ?? 0))}</span></div><div class="d-flex mt-2 rounded bg-warning bg-opacity-25 p-1"${_scopeId}><button${ssrIncludeBooleanAttr(
                !unref(auth_user) || order_list.value.length == 0
              ) ? " disabled" : ""} class="btn btn-sm btn-warning w-50"${_scopeId}><span class="h6 mb-0"${_scopeId}><i class="bi bi-cart-check me-1"${_scopeId}></i> ${ssrInterpolate("Checkout")}</span></button><span class="h6 my-auto ms-auto text-warning-emphasis"${_scopeId}>${ssrInterpolate(unref(formatIDR)(total_price.value - (discount.value ?? 0)))}</span></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: title.value }, null, 8, ["title"]),
              createVNode(_sfc_main$1, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
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
                    createVNode("span", { class: "h5 my-auto" }, [
                      createVNode("i", { class: "bi bi-shop me-0 d-inline d-lg-inline" }),
                      createTextVNode(" " + toDisplayString("Stand " + __props.stand.name), 1)
                    ])
                  ])
                ])
              ], 4),
              createVNode("div", {
                class: "container pb-5",
                style: { "min-height": "100vh", "margin-top": "8rem" }
              }, [
                createVNode("div", { class: "row g-4" }, [
                  createVNode("div", { class: "col-12 d-block d-xl-none" }, [
                    createVNode("div", { class: "d-flex bg-white shadow-sm p-2 mb-2" }, [
                      createVNode("button", {
                        class: "btn btn-sm btn-outline-primary border-0 w-50 me-2 " + (active_tab.value == 1 ? "active" : ""),
                        onClick: ($event) => active_tab.value = 0
                      }, [
                        createVNode("i", { class: "fa-solid fa-utensils me-1" }),
                        createTextVNode(" " + toDisplayString("Menu"))
                      ], 10, ["onClick"]),
                      createVNode("button", {
                        class: "btn btn-sm btn-outline-primary border-0 w-50 " + (active_tab.value == 2 ? "active" : ""),
                        onClick: ($event) => active_tab.value = 0
                      }, [
                        createVNode("i", { class: "bi bi-cart4 me-1" }),
                        createVNode("span", { class: "position-relative" }, toDisplayString("Cart")),
                        order_list.value.length > 0 && active_tab.value != 2 ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "bg-danger text-white rounded-2 ms-2",
                          style: { "font-size": "0.7rem", "padding": "0.1rem 0.5rem" }
                        }, toDisplayString(order_list.value.length), 1)) : createCommentVNode("", true)
                      ], 10, ["onClick"])
                    ])
                  ]),
                  createVNode(Transition, {
                    name: "fade-slide-ltr",
                    onAfterLeave: ($event) => active_tab.value = 2
                  }, {
                    default: withCtx(() => [
                      active_tab.value == 1 || isLargeScreen.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "col-12 col-xl-8"
                      }, [
                        createVNode("div", { class: "card bg-white shadow-sm p-0" }, [
                          createVNode("div", { class: "d-flex shadow-sm" }, [
                            createVNode("span", { class: "text-secondary m-3" }, [
                              createVNode("i", { class: "fa-solid fa-utensils me-2" }),
                              createTextVNode(" " + toDisplayString("Menu List"))
                            ]),
                            createVNode("span", {
                              class: "text-secondary ms-auto me-3 my-auto",
                              style: { "font-size": "0.8rem" }
                            }, [
                              createTextVNode(toDisplayString("order type :") + " "),
                              createVNode("span", { class: "ms-1 fw-bold" }, toDisplayString(order_type.value), 1)
                            ])
                          ]),
                          createVNode("div", { class: "scroll-container-lg-5 scroll-container-4 scroll-thumb-warning pe-1" }, [
                            order_list.value.length == 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "d-flex w-100 p-2"
                            }, [
                              createVNode("span", { class: "text-secondary fst-italic mx-auto" }, toDisplayString(unref(auth_user) ? "Click on the menu to add to cart" : "Please login to add menu to cart"), 1)
                            ])) : createCommentVNode("", true),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.menu_group, (menu_list, key) => {
                              return openBlock(), createBlock("li", { class: "list-group list-group-flush" }, [
                                createVNode("ul", { class: "list-group-item mb-0 bg-warning bg-opacity-10" }, [
                                  createVNode("span", { class: "text-warning-emphasis" }, toDisplayString(key), 1)
                                ]),
                                (openBlock(true), createBlock(Fragment, null, renderList(menu_list, (item) => {
                                  return openBlock(), createBlock("ul", {
                                    class: "list-group-item list-group-item-action px-2 py-1 mb-0 " + (item.sale < item.stock ? "" : "bg-secondary bg-opacity-10"),
                                    onClick: () => {
                                      if (unref(auth_user)) {
                                        if (item.sale < item.stock) {
                                          if (order_list.value.find(
                                            (order) => order.id == item.id
                                          )) {
                                            order_list.value.find(
                                              (order) => order.id == item.id
                                            ).qty++;
                                          } else {
                                            order_list.value.push({
                                              id: item.id,
                                              name: item.name,
                                              price: item.price,
                                              image: item.image,
                                              qty: 1
                                            });
                                          }
                                        } else {
                                          toastNotifRef.value.showToast(
                                            "info",
                                            "Sorry for the incovenience, " + item.name + " is Out of Stock. "
                                          );
                                          toastNotifRef.value.showToast(
                                            "info",
                                            "We appreciate you enthusiasm. We`ll add more stock next time!"
                                          );
                                        }
                                      } else {
                                        confirmation(
                                          _ctx.route("post.login"),
                                          "Please login to add menu to cart"
                                        );
                                      }
                                    }
                                  }, [
                                    createVNode("div", { class: "text-nowrap p-1" }, [
                                      createVNode("div", {
                                        class: "rounded-3 d-inline-block float-start",
                                        style: {
                                          width: isLargeScreen.value ? "20%" : "30%"
                                        }
                                      }, [
                                        createVNode("img", {
                                          src: item.image ? "/storage/images/shop/foods/menu/" + item.image : "/storage/images/shop/foods/menu/default.png",
                                          alt: "image",
                                          class: "placeholder img-fluid rounded",
                                          onLoad: unref(showImage),
                                          style: { "aspect-ratio": "1" }
                                        }, null, 40, ["src", "onLoad"])
                                      ], 4),
                                      createVNode("div", {
                                        class: "ps-2 d-inline-block",
                                        style: {
                                          width: isLargeScreen.value ? "80%" : "70%"
                                        }
                                      }, [
                                        createVNode("div", { class: "d-flex" }, [
                                          createVNode("div", { class: "scroll-x-hidden me-2 my-auto" }, [
                                            createVNode("div", { class: "d-flex" }, [
                                              createVNode("span", { class: "text-primary-emphasis text-nowrap me-1" }, toDisplayString(item.name), 1)
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("span", {
                                            class: "text-secondary d-inline-block my-auto",
                                            style: { "width": "60px", "font-size": "0.8rem" }
                                          }, toDisplayString("Price")),
                                          createVNode("span", null, toDisplayString(":")),
                                          createVNode("span", { class: "ms-1 h6" }, toDisplayString(unref(formatIDR)(item.price)), 1)
                                        ]),
                                        createVNode("div", { class: "" }, [
                                          createVNode("span", {
                                            class: "text-secondary d-inline-block my-auto",
                                            style: { "width": "60px", "font-size": "0.8rem" }
                                          }, toDisplayString("Detail")),
                                          createVNode("span", { class: "text-secondary d-inline-block text-nowrap" }, toDisplayString(":") + " " + toDisplayString((!(item.volume > 0) && !(item.mass > 0) ? "- " : "") + (item.volume > 0 ? item.volume + item.volume_unit + " " : "") + (item.volume > 0 && item.mass > 0 ? "- " : "") + (item.mass > 0 ? item.mass + item.mass_unit + " " : "")), 1)
                                        ]),
                                        createVNode("div", { class: "d-block" }, [
                                          createVNode("span", {
                                            class: "text-secondary d-inline-block my-auto",
                                            style: { "width": "60px", "font-size": "0.8rem" }
                                          }, toDisplayString("Taste")),
                                          createVNode("span", null, toDisplayString(":")),
                                          createVNode("div", {
                                            class: "d-inline-flex me-5",
                                            style: { "flex-wrap": "wrap" }
                                          }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(item.tags, (tag) => {
                                              return openBlock(), createBlock("span", {
                                                class: "py-0 px-2 ms-2 mb-2 rounded-1 bg-secondary bg-opacity-10 text-secondary d-inline-block border-0",
                                                style: {
                                                  borderWidth: "1px",
                                                  borderStyle: "solid",
                                                  fontSize: "0.8rem"
                                                }
                                              }, toDisplayString(tag.name), 1);
                                            }), 256)),
                                            item.tags.length == 0 ? (openBlock(), createBlock("span", {
                                              key: 0,
                                              class: "py-0 px-2 ms-2 rounded-1 border-secondary text-secondary mb-2",
                                              style: {
                                                borderWidth: "1px",
                                                borderStyle: "solid",
                                                fontSize: "0.8rem"
                                              }
                                            }, toDisplayString("None"))) : createCommentVNode("", true)
                                          ])
                                        ]),
                                        createVNode("div", { class: "" }, [
                                          createVNode("span", {
                                            class: "text-secondary d-inline-block",
                                            style: { "width": "60px", "font-size": "0.8rem" }
                                          }, toDisplayString("Sold ")),
                                          createVNode("span", { class: "text-dark my-auto text-nowrap" }, toDisplayString(": " + item.sale), 1),
                                          createVNode("div", {
                                            class: "card bg-opacity-10 px-2 d-inline-block float-end bg-" + (item.sale < item.stock ? "warning" : "secondary")
                                          }, [
                                            createVNode("span", {
                                              class: "text-" + (item.sale < item.stock ? "secondary" : "primary"),
                                              style: { "font-size": "0.8rem" }
                                            }, toDisplayString(item.sale < item.stock ? "Ready Stock" : "Out of Stock"), 3)
                                          ], 2)
                                        ])
                                      ], 4)
                                    ])
                                  ], 10, ["onClick"]);
                                }), 256))
                              ]);
                            }), 256))
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["onAfterLeave"]),
                  createVNode(Transition, {
                    name: "fade-slide-rtl",
                    onAfterLeave: ($event) => active_tab.value = 1
                  }, {
                    default: withCtx(() => {
                      var _a4;
                      return [
                        active_tab.value == 2 || isLargeScreen.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "col-12 col-xl-4"
                        }, [
                          createVNode("div", { class: "card bg-white shadow-sm p-3" }, [
                            createVNode("div", { class: "d-flex border-bottom border-2 border-primary mb-3 pb-1" }, [
                              createVNode("span", { class: "h6 text-primary-emphasis mx-auto" }, [
                                createVNode("i", { class: "bi bi-cart4 me-0" }),
                                createTextVNode(" " + toDisplayString("My Order"))
                              ])
                            ]),
                            order_list.value.length == 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "d-flex w-100 p-2"
                            }, [
                              createVNode("span", { class: "text-secondary fst-italic mx-auto" }, toDisplayString(unref(auth_user) ? "Click on the menu to add to cart" : "Please login to add menu to cart"), 1)
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "scroll-container-lg-3 scroll-container-3 scroll-thumb-warning pe-1" }, [
                              createVNode("li", { class: "list-group list-group-flush" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(order_list.value, (item, index) => {
                                  return openBlock(), createBlock("ul", { class: "list-group-item list-group-item-action px-0 py-1 mb-0" }, [
                                    createVNode("div", { class: "w-25 float-start" }, [
                                      createVNode("img", {
                                        src: "/storage/images/shop/foods/menu/" + ((item == null ? void 0 : item.image) ?? "default.png"),
                                        alt: "image",
                                        style: { "aspect-ratio": "1", "width": "100%" },
                                        class: "placeholder img-fluid rounded",
                                        onLoad: unref(showImage)
                                      }, null, 40, ["src", "onLoad"])
                                    ]),
                                    createVNode("div", { class: "w-75 float-end ps-3" }, [
                                      createVNode("span", { class: "d-block text-primary-emphasis" }, toDisplayString(item.name), 1),
                                      createVNode("div", { class: "" }, [
                                        createVNode("span", {
                                          class: "d-inline-block text-secondary my-auto",
                                          style: { "width": "60px", "font-size": "0.8rem" }
                                        }, toDisplayString("Price")),
                                        createVNode("span", { class: "" }, toDisplayString(": " + unref(formatIDR)(item.price)), 1)
                                      ]),
                                      createVNode("div", { class: "" }, [
                                        createVNode("span", {
                                          class: "d-inline-block text-secondary my-auto",
                                          style: { "width": "60px", "font-size": "0.8rem" }
                                        }, toDisplayString("Total")),
                                        createVNode("span", { class: "h6" }, toDisplayString(": " + unref(formatIDR)(
                                          item.price * item.qty
                                        )), 1)
                                      ]),
                                      createVNode("div", { class: "d-flex" }, [
                                        createVNode("button", {
                                          class: "btn btn-sm btn-outline-primary border-0 py-0 ms-auto",
                                          onClick: ($event) => {
                                            if (item.qty > 1) {
                                              item.qty--;
                                            } else {
                                              order_list.value.splice(
                                                index,
                                                1
                                              );
                                            }
                                          }
                                        }, [
                                          createVNode("i", {
                                            class: "bi bi-" + (item.qty > 1 ? "dash" : "trash3")
                                          }, null, 2)
                                        ], 8, ["onClick"]),
                                        createVNode("span", { class: "d-inline block bg-warning bg-opacity-10 px-2 text-warning-emphasis h6 mb-0" }, toDisplayString(item.qty), 1),
                                        createVNode("button", {
                                          class: "btn btn-sm btn-outline-primary border-0 py-0",
                                          onClick: ($event) => item.qty++
                                        }, [
                                          createVNode("i", { class: "bi bi-plus" })
                                        ], 8, ["onClick"])
                                      ])
                                    ])
                                  ]);
                                }), 256))
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "card bg-white shadow-sm p-3 mt-4" }, [
                            createVNode("div", { class: "d-flex" }, [
                              createVNode("span", { class: "text-secondary" }, toDisplayString("Subtotal ( " + total_item.value + (total_item.value > 1 ? " items" : " item") + " )"), 1),
                              createVNode("span", { class: "ms-auto" }, toDisplayString(unref(formatIDR)(total_price.value ?? 0)), 1)
                            ]),
                            createVNode("div", { class: "d-flex mt-2" }, [
                              createVNode("span", { class: "text-secondary my-auto" }, toDisplayString("Voucher")),
                              createVNode("div", { class: "bg-warning bg-opacity-10 ms-auto rounded" }, [
                                createVNode("button", {
                                  disabled: !unref(auth_user),
                                  "data-bs-toggle": "modal",
                                  "data-bs-target": "#voucherModal",
                                  type: "button",
                                  class: "btn btn-sm card-bg-hover-warning text-warning-emphasis border-0 p-1 px-2 px-1"
                                }, [
                                  createVNode("span", { class: "" }, toDisplayString(((_a4 = __props.customer_voucher.find(
                                    (item) => item.id == unref(form_add_transaction).voucher_id
                                  )) == null ? void 0 : _a4.code) ?? "Click here"), 1),
                                  createVNode("i", { class: "fa-solid fa-ticket ms-2 rounded" })
                                ], 8, ["disabled"])
                              ])
                            ]),
                            createVNode("div", { class: "d-flex mt-2" }, [
                              createVNode("span", { class: "text-secondary" }, toDisplayString("Discount")),
                              createVNode("span", { class: "ms-auto" }, toDisplayString(unref(formatIDR)(discount.value ?? 0)), 1)
                            ]),
                            createVNode("div", { class: "d-flex mt-2 rounded bg-warning bg-opacity-25 p-1" }, [
                              createVNode("button", {
                                disabled: !unref(auth_user) || order_list.value.length == 0,
                                class: "btn btn-sm btn-warning w-50",
                                onClick: ($event) => unref(auth_user) && order_list.value.length > 0 ? handlePayment() : null
                              }, [
                                createVNode("span", { class: "h6 mb-0" }, [
                                  createVNode("i", { class: "bi bi-cart-check me-1" }),
                                  createTextVNode(" " + toDisplayString("Checkout"))
                                ])
                              ], 8, ["disabled", "onClick"]),
                              createVNode("span", { class: "h6 my-auto ms-auto text-warning-emphasis" }, toDisplayString(unref(formatIDR)(total_price.value - (discount.value ?? 0))), 1)
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ];
                    }),
                    _: 1
                  }, 8, ["onAfterLeave"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="modal fade" id="voucherModal" tabindex="-1" aria-labelledby="voucherModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="fa-solid fa-ticket pe-2"></i> ${ssrInterpolate("Available Voucher")}</span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal"><i class="bi bi-x-lg"></i></button></div><div class="modal-body bg-light rounded-bottom p-0"><div class="d-flex"><div class="scroll-container-4 scroll-container-lg-4 px-3 pt-3"><!--[-->`);
      ssrRenderList(__props.customer_voucher, (voucher) => {
        var _a3, _b;
        _push(`<div class="position-relative bg-warning bg-opacity-25 d-flex rounded-4 mb-3"><!--[-->`);
        ssrRenderList([
          { top: "30%", left: "0" },
          { top: "70%", left: "0" },
          { top: "30%", left: "100%" },
          { top: "70%", left: "100%" }
        ], (dot) => {
          _push(`<div class="position-absolute rounded-circle p-3 bg-white" style="${ssrRenderStyle({
            top: dot.top,
            left: dot.left,
            transform: "translate(-50%, -50%)"
          })}"></div>`);
        });
        _push(`<!--]--><div class="d-block border-secondary-subtle rounded-3 border-0 bg-primary bg-opacity-25 my-2 mx-4 w-100 py-2 px-3"><img${ssrRenderAttr(
          "src",
          "/storage/images/shop/voucher/" + ((voucher == null ? void 0 : voucher.image) ?? "default.png")
        )} class="rounded-3 my-auto" alt="Ticket Image" style="${ssrRenderStyle({
          aspectRatio: "1/1",
          width: "100%",
          minWidth: "90px",
          backgroundSize: "cover"
        })}"><div class="rounded bg-white p-3" style="${ssrRenderStyle({
          width: "100%"
        })}"><div class="d-flex bg-success bg-opacity-10 rounded-top"><span class="text-primary h6 mb-0 mx-auto py-1">${ssrInterpolate((voucher == null ? void 0 : voucher.discount_type) == "price" ? "DISCOUNT " + unref(formatIDR)(
          voucher == null ? void 0 : voucher.discount_price
        ) + "!" : "DISCOUNT " + (voucher == null ? void 0 : voucher.discount_percent) + "%!")}</span></div><div class="d-flex"><span class="text-primary-emphasis" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("PROMO : ")} <span class="h6 mb-0" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate(((voucher == null ? void 0 : voucher.name) ?? "No Name").toUpperCase())}</span></span></div><div class="d-flex mb-2"><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate(unref(format)(
          voucher == null ? void 0 : voucher.start_date,
          "d MMM yyy"
        ) + " - " + unref(format)(
          voucher == null ? void 0 : voucher.end_date,
          "d MMM yyy"
        ))}</span></div><div class="mb-2"><div class="card border text-secondary"><button${ssrRenderAttr(
          "id",
          "voucherDetailTrigger" + (voucher == null ? void 0 : voucher.id)
        )} class="btn btn-sm text-primary card-bg-hover border-0 py-1" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-bs-toggle="collapse"${ssrRenderAttr(
          "data-bs-target",
          "#voucherDetail" + (voucher == null ? void 0 : voucher.id)
        )}>${ssrInterpolate("Click to see voucher detail")}</button><div class="collapse"${ssrRenderAttr(
          "id",
          "voucherDetail" + (voucher == null ? void 0 : voucher.id)
        )} style="${ssrRenderStyle({ "font-size": "0.8rem" })}"><li class="list-group list-group-flush"><!--[-->`);
        ssrRenderList({
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
          _push(`<ul class="list-group-item list-group-item-action mb-0 py-1"><div class="d-inline"><p class="mb-0">${ssrInterpolate(item.text)} `);
          if (key == "min_transaction" && total_price.value < (voucher == null ? void 0 : voucher.min_transaction)) {
            _push(`<i class="bi bi-exclamation-circle-fill text-danger rounded-circle p-0"></i>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p><p class="mb-0 fst-italic text-secondary">${ssrInterpolate(item.sub)}</p></div></ul>`);
        });
        _push(`<!--]--></li></div></div></div><div class="d-flex"><button data-bs-dismiss="modal" class="${ssrRenderClass(
          "btn btn-sm " + (total_price.value < (voucher == null ? void 0 : voucher.min_transaction) ? "disabled " : " ") + (((_a3 = unref(form_add_transaction)) == null ? void 0 : _a3.voucher_id) == (voucher == null ? void 0 : voucher.id) ? "w-75 btn-success " : "w-100 btn-primary ")
        )}">${ssrInterpolate(unref(form_add_transaction).voucher_id == voucher.id ? "Applied" : "Use Voucher")}</button>`);
        if (((_b = unref(form_add_transaction)) == null ? void 0 : _b.voucher_id) == (voucher == null ? void 0 : voucher.id)) {
          _push(`<button class="btn btn-sm btn-outline-secondary w-25 ms-2">${ssrInterpolate("Cancel")}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
      });
      _push(`<!--]-->`);
      if (!(((_a2 = __props.customer_voucher) == null ? void 0 : _a2.length) > 0)) {
        _push(`<div class="mb-5 mt-3"><div class="d-flex"><span class="text-secondary mx-auto">${ssrInterpolate("No voucher available")}</span></div><div class="d-flex"><span class="text-secondary mx-auto fst-italic" style="${ssrRenderStyle({ "font-size": "0.8rem" })}">${ssrInterpolate("Redeem voucher using points")}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Stand.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
