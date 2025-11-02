import { ref, computed, onMounted, onUnmounted, watch, withCtx, unref, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, Transition, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./Notif-DL0SggHu.js";
import "./InputError-DkffFxkw.js";
import { G as GuestLayout } from "./GuestLayout-EBOafcqa.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CQDhtLdH.js";
import { M as ModalAlertNotification } from "./ModalAlertNotification-DTKoiHkW.js";
import { f as formatIDR, s as showImage } from "./utils-WpvxxmT9.js";
import { usePage, useForm, Head, router } from "@inertiajs/vue3";
import { format } from "date-fns";
import "vue-toastification";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Transaction",
  __ssrInlineRender: true,
  props: {
    notif: Object,
    transaction: Object,
    stand: Object,
    dana_contact: Object
  },
  setup(__props) {
    const props = __props;
    usePage().props.auth.user;
    const title = ref("Payment Transaction");
    const toastNotifRef = ref(null);
    const modalConfirmationRef = ref(null);
    const modalAlertNotificationRef = ref(null);
    const inputDanaReceiptRef = ref(null);
    const isLargeScreen = ref(window.innerWidth >= 1200);
    const menu_collapse_trigger = ref("show");
    const payment_method = ref("cash");
    const send_option = ref(props.stand.type > 0 ? "delivery" : "pick_up");
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
    const handleResize = () => {
      isLargeScreen.value = window.innerWidth >= 768;
      window.addEventListener("resize", handleResize);
    };
    const total_item = computed(() => {
      return props.transaction.order_list.reduce((total, item) => {
        return total + Number(item.qty);
      }, 0);
    });
    const total_price = computed(() => {
      return props.transaction.order_list.reduce((total, item) => {
        return total + Number(item.qty) * item.price;
      }, 0);
    });
    const form_add_transaction = useForm({
      order_type: null,
      send_option: null,
      payment_method: null,
      payment_price: null,
      dana_receipt: null
    });
    function handleAddTransaction() {
      form_add_transaction.payment_method = payment_method.value;
      form_add_transaction.order_type = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd") == format(new Date(props.stand.date), "yyyy-MM-dd") ? "now" : "pre_order";
      form_add_transaction.send_option = send_option.value;
      if (form_add_transaction.payment_price < props.transaction.transaction && form_add_transaction.payment_method == "cash") {
        return toastNotifRef.value.showToast(
          "danger",
          "Payment Price can is less than Total Transaction!"
        );
      }
      form_add_transaction.post(route("customer.order.add"), {
        onSuccess: () => {
          setTimeout(() => {
            router.visit(
              route("shop.stand", [props.transaction.stand_id, "new"])
            );
          }, 200);
        },
        onError: (e) => {
          for (let i in e) {
            toastNotifRef.value.showToast("warning", e[i]);
          }
        }
      });
    }
    const handleFileUploadDanaReceipt = (event) => {
      form_add_transaction.dana_receipt = event.target.files[0];
    };
    function triggerFileDanaReceiptImage() {
      inputDanaReceiptRef.value.click();
    }
    function copyDanaContact() {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(props.dana_contact.phone).then(() => {
          toastNotifRef.value.showToast(
            "info",
            "Copied " + props.dana_contact.name + " DANA Number to clipboard."
          );
        }).catch(() => {
          toastNotifRef.value.showToast("warning", [
            "Can not copy " + props.dana_contact.name + " DANA Number.",
            "Browser is not supported. Please copy manually."
          ]);
        });
      } else {
        toastNotifRef.value.showToast("warning", [
          "Can not copy " + props.dana_contact.name + " DANA Number.",
          "Browser is not supported. Please copy manually."
        ]);
      }
    }
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", onScroll);
      console.log(/* @__PURE__ */ new Date() == new Date(props.stand.date));
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
          var _a, _b;
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
            _push2(`<div class="card rounded-0 bg-warning bg-opacity-50 position-fixed start-50 translate-middle-x z-3" style="${ssrRenderStyle(headerStyle.value)}"${_scopeId}><div class="card shadow-lg mx-auto px-3 py-3"${_scopeId}><div class="d-flex text-primary-emphasis"${_scopeId}><button class="btn btn-sm btn-light text-primary"${_scopeId}><i class="bi bi-chevron-left"${_scopeId}></i><span class="d-none d-lg-inline ms-2"${_scopeId}>${ssrInterpolate("Back")}</span></button><div class="border-start border-primary border-2 mx-2 mx-lg-4"${_scopeId}></div><div class="d-flex"${_scopeId}><span class="h5 my-auto"${_scopeId}>${ssrInterpolate(isLargeScreen.value ? "Payment Transaction" : "Payment")}</span></div></div></div></div><div class="container" style="${ssrRenderStyle({ "margin-top": "8rem" })}"${_scopeId}><div class="row g-4"${_scopeId}><div class="col-12 col-xl-7"${_scopeId}><div class="card bg-white shadow-sm"${_scopeId}><div class="d-flex shadow-sm p-3 bg-white rounded-top"${_scopeId}><span class="h6 text-primary-emphasis mb-0"${_scopeId}><i class="bi bi-cart4 me-2"${_scopeId}></i> ${ssrInterpolate("Order Detail")}</span></div><div class="d-flex px-3 py-2"${_scopeId}><span class="text-secondary h6 mb-0"${_scopeId}>${ssrInterpolate("Menu")}</span><span class="${ssrRenderClass(
              "ms-auto text-secondary mt-auto " + (!isLargeScreen.value ? "border-end border-primary border-2 pe-2" : "")
            )}" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(total_item.value + (total_item.value > 1 ? " items" : " item"))}</span>`);
            if (!isLargeScreen.value) {
              _push2(`<button data-bs-toggle="collapse" data-bs-target="#menu_collapse" class="btn btn-sm btn-outline-primary border-0 py-0" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" id="menu_collapse_trigger"${_scopeId}>${ssrInterpolate(menu_collapse_trigger.value)}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="${ssrRenderClass("collapse " + (isLargeScreen.value ? "show" : ""))}" id="menu_collapse"${_scopeId}><div class="scroll-container-3 scroll-container-lg-2 pe-1"${_scopeId}><li class="list-group list-group-flush"${_scopeId}><!--[-->`);
            ssrRenderList(__props.transaction.order_list, (item, index) => {
              _push2(`<ul class="list-group-item list-group-item-action px-0 py-1 mb-0"${_scopeId}><div class="float-start p-2" style="${ssrRenderStyle({
                width: isLargeScreen.value ? "15%" : "20%"
              })}"${_scopeId}><img${ssrRenderAttr(
                "src",
                "/storage/images/shop/foods/menu/" + ((item == null ? void 0 : item.image) ?? "default.png")
              )} alt="image" style="${ssrRenderStyle({ "aspect-ratio": "1", "width": "100%" })}" class="placeholder img-fluid rounded"${_scopeId}></div><div class="float-end py-2 my-auto" style="${ssrRenderStyle({
                width: isLargeScreen.value ? "85%" : "80%"
              })}"${_scopeId}><span class="d-block text-primary-emphasis"${_scopeId}>${ssrInterpolate("( " + item.qty + " ) " + item.name)}</span><div class="d-flex"${_scopeId}><div class=""${_scopeId}><span class="d-inline-block text-secondary my-auto" style="${ssrRenderStyle({ "width": "2.5rem", "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Price")}</span><span class=""${_scopeId}>${ssrInterpolate(": " + unref(formatIDR)(item.price))}</span></div><div class="ms-auto"${_scopeId}><span class="d-inline-block text-secondary my-auto" style="${ssrRenderStyle({ "width": "2.5rem", "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Total")}</span><span class="h6 d-inline-block" style="${ssrRenderStyle({ "width": "6rem" })}"${_scopeId}>${ssrInterpolate(": " + unref(formatIDR)(
                item.price * item.qty
              ))}</span></div></div></div></ul>`);
            });
            _push2(`<!--]--></li></div></div><div class="d-flex px-3 py-2"${_scopeId}><span class="text-secondary h6 mb-0"${_scopeId}>${ssrInterpolate("Transaction")}</span></div><div class="d-flex mt-2 px-3"${_scopeId}><span class="text-secondary"${_scopeId}>${ssrInterpolate("Subtotal")}</span><span class="ms-auto"${_scopeId}>${ssrInterpolate(unref(formatIDR)(total_price.value ?? 0))}</span></div><div class="d-flex mt-2 px-3"${_scopeId}><span class="text-secondary my-auto"${_scopeId}>${ssrInterpolate("Voucher")}</span><div class="bg-warning bg-opacity-10 ms-auto rounded px-2"${_scopeId}>${ssrInterpolate(__props.transaction.voucher_id > 0 ? "Applied" : "Not Used")}</div></div><div class="d-flex mt-2 px-3"${_scopeId}><span class="text-secondary"${_scopeId}>${ssrInterpolate("Discount")}</span><span class="ms-auto"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.transaction.discount ?? 0))}</span></div><div class="d-flex mt-2 rounded bg-warning bg-opacity-25 p-2 mx-3 mb-3"${_scopeId}><span${_scopeId}>${ssrInterpolate("Total")}</span><span class="h6 my-auto ms-auto text-warning-emphasis"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.transaction.transaction))}</span></div></div></div><div class="col-12 col-xl-5"${_scopeId}><div class="card p-3 shadow-sm"${_scopeId}><div class="d-flex border-bottom border-primary border-2 pb-2"${_scopeId}><span class="mb-0 h6 text-primary-emphasis"${_scopeId}><i class="fa-solid fa-cash-register me-2"${_scopeId}></i>${ssrInterpolate("PAYMENT")}</span></div><div class="d-flex mt-2"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Order Type")}</span></div><div class="d-flex"${_scopeId}>`);
            if (unref(format)(/* @__PURE__ */ new Date(), "yyyy-MM-dd") == unref(format)(new Date(__props.stand.date), "yyyy-MM-dd")) {
              _push2(`<div class="w-50 rounded card-bg-hover-warning"${_scopeId}><div class="${ssrRenderClass("card bg-warning bg-opacity-10")}"${_scopeId}><span class="${ssrRenderClass("mx-auto text-dark")}"${_scopeId}><i class="bi bi-calendar-check me-1"${_scopeId}></i> ${ssrInterpolate("Now")}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(format)(/* @__PURE__ */ new Date(), "yyyy-MM-dd") < unref(format)(new Date(__props.stand.date), "yyyy-MM-dd")) {
              _push2(`<div class="w-50 rounded card-bg-hover-warning"${_scopeId}><div class="${ssrRenderClass("card bg-warning bg-opacity-10")}"${_scopeId}><span class="${ssrRenderClass("mx-auto text-dark")}"${_scopeId}><i class="bi bi-calendar-week me-1"${_scopeId}></i> ${ssrInterpolate("Pre-Order")}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="d-flex mt-2"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Send Option")}</span></div><div class="d-flex"${_scopeId}>`);
            if (__props.stand.type != 1) {
              _push2(`<div class="w-50 rounded card-bg-hover-warning"${_scopeId}><div class="${ssrRenderClass(
                "card " + (send_option.value == "pick_up" ? "bg-warning bg-opacity-10" : "")
              )}"${_scopeId}><span class="${ssrRenderClass(
                "mx-auto " + (send_option.value == "pick_up" ? "text-dark" : "text-secondary")
              )}"${_scopeId}><i class="bi bi-person-arms-up me-1"${_scopeId}></i> ${ssrInterpolate("Pick Up")}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="w-50 rounded card-bg-hover-warning"${_scopeId}><div class="${ssrRenderClass(
              "card " + (send_option.value == "delivery" ? "bg-warning bg-opacity-10" : "")
            )}"${_scopeId}><span class="${ssrRenderClass(
              "mx-auto " + (send_option.value == "delivery" ? "text-dark" : "text-secondary")
            )}"${_scopeId}><i class="fa-solid fa-truck-fast me-1"${_scopeId}></i> ${ssrInterpolate("Delivery")}</span></div></div></div><div class="d-flex mt-2"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate((send_option.value == "pick_up" ? "Pick up " : "Delivery ") + " Date")}</span></div><div class="d-flex my-1"${_scopeId}><span class="text-warning-emphasis h6 mb-0"${_scopeId}>${ssrInterpolate(unref(format)(__props.stand.date, "EEEE, dd MMM yyy"))}</span></div><div class="d-flex mt-2"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Payment Method")}</span></div><div class="d-flex"${_scopeId}><div class="w-50 rounded card-bg-hover-warning"${_scopeId}><div class="${ssrRenderClass(
              "card " + (payment_method.value == "cash" ? "bg-warning bg-opacity-10" : "")
            )}"${_scopeId}><span class="${ssrRenderClass(
              "mx-auto " + (payment_method.value == "cash" ? "text-dark" : "text-secondary")
            )}"${_scopeId}><i class="fa-solid fa-money-bill-wave me-2 text-primary"${_scopeId}></i> ${ssrInterpolate("Cash")}</span></div></div><div class="w-50 rounded card-bg-hover-warning"${_scopeId}><div class="${ssrRenderClass(
              "card " + (payment_method.value == "dana" ? "bg-warning bg-opacity-10" : "")
            )}"${_scopeId}><span class="${ssrRenderClass(
              "mx-auto " + (payment_method.value == "dana" ? "text-dark" : "text-secondary")
            )}"${_scopeId}><svg class="icon icon-dana d-inline rounded-circle border-primary border" style="${ssrRenderStyle({ "width": "1rem", "height": "1rem", "padding": "0.1rem" })}"${_scopeId}><use href="/icons.svg#dana"${_scopeId}></use></svg> ${ssrInterpolate("Dana")}</span></div></div></div><div class="d-flex mt-3"${_scopeId}><button type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse" aria-controls="paymentGuideCollapseCash paymentGuideCollapseDana" class="btn btn-outline-secondary btn-sm py-0 w-100 border"${_scopeId}><span style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Payment Guide")}</span></button></div>`);
            if (payment_method.value == "cash") {
              _push2(`<div${_scopeId}><div class="collapse multi-collapse" id="paymentGuideCollapseCash"${_scopeId}><li class="list-group list-group-flush"${_scopeId}><!--[-->`);
              ssrRenderList([
                {
                  text: "Please give the cash to the courier when you receive the order.",
                  sub: "Anda dapat memberikan uangnya kepada kurir ketika menerima pesanan."
                },
                {
                  text: "Please fill the 'Payment Price'. For the courier will bring the payment change.",
                  sub: "Silakan mengisi 'Payment Price' sesuai nominal uang yang akan diberikan. Agar kurir dapat memberikan kembalian."
                }
              ], (item) => {
                _push2(`<ul style="${ssrRenderStyle({ "font-size": "0.8rem" })}" class="list-group-item list-group-item-light mb-0"${_scopeId}><p class="mb-0"${_scopeId}>${ssrInterpolate(item.text)}</p><p class="mb-0 text-secondary fst-italic"${_scopeId}>${ssrInterpolate(item.sub)}</p></ul>`);
              });
              _push2(`<!--]--></li></div><div class="d-flex mt-2"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Payment Price")} <i data-bs-target="#paymentGuideCollapseCash" data-bs-toggle="collapse" class="bi bi-info-circle ms-1 my-auto" style="${ssrRenderStyle({ "font-size": "0.6rem" })}"${_scopeId}></i></span></div><div class="input-group input-group-sm"${_scopeId}><label for="payment_price" class="input-group-text"${_scopeId}>${ssrInterpolate("Rp")}</label><input type="number" id="payment_price" class="form-control"${ssrRenderAttr(
                "placeholder",
                "e.g " + __props.transaction.transaction
              )}${ssrIncludeBooleanAttr(payment_method.value == "cash") ? " required" : ""}${ssrRenderAttr(
                "value",
                unref(form_add_transaction).payment_price
              )}${_scopeId}></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (payment_method.value == "dana") {
              _push2(`<div${_scopeId}><div class="collapse multi-collapse" id="paymentGuideCollapseDana"${_scopeId}><li class="list-group list-group-flush"${_scopeId}><!--[-->`);
              ssrRenderList([
                {
                  text: "Please upload the transfer receipt of DANA to the 'DANA Receipt'.",
                  sub: "Silakan mengunggah bukti transfer DANA ke bagian 'DANA Receipt'."
                },
                {
                  text: "Please transfer exact amount of 'Total Transaction'.",
                  sub: "Mohon untuk mentransfer jumlah yang sesuai dengan 'Total Transaction'."
                }
              ], (item) => {
                _push2(`<ul style="${ssrRenderStyle({ "font-size": "0.8rem" })}" class="list-group-item list-group-item-light mb-0"${_scopeId}><p class="mb-0"${_scopeId}>${ssrInterpolate(item.text)}</p><p class="mb-0 text-secondary fst-italic"${_scopeId}>${ssrInterpolate(item.sub)}</p></ul>`);
              });
              _push2(`<!--]--></li></div><div class="d-flex mt-2"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("DANA Contact")}</span></div><div class="d-flex"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({})}"${_scopeId}>${ssrInterpolate(__props.dana_contact.name + " - ")} <span class="text-dark"${_scopeId}>${ssrInterpolate(__props.dana_contact.phone)}</span></span><i class="bi bi-copy text-secondary card-bg-hover px-2 rounded"${_scopeId}></i></div><div class="d-flex mt-2"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Total Transaction")}</span></div><div class="d-flex"${_scopeId}><span class="h6" style="${ssrRenderStyle({})}"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.transaction.transaction))}</span></div><div class="d-flex mt-2"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("DANA Receipt")} <i data-bs-target="#paymentGuideCollapseDana" data-bs-toggle="collapse" class="bi bi-info-circle ms-1 my-auto" style="${ssrRenderStyle({ "font-size": "0.6rem" })}"${_scopeId}></i></span></div><div class="input-group input-group-sm border rounded"${_scopeId}><button class="btn btn-outline-secondary border-0" type="button"${_scopeId}>${ssrInterpolate("Upload Receipt")}</button><input type="file" class="d-none"${_scopeId}><input type="text" class="form-control" disabled${ssrRenderAttr(
                "placeholder",
                ((_b = (_a = unref(form_add_transaction)) == null ? void 0 : _a.dana_receipt) == null ? void 0 : _b.name) ?? "filename.format"
              )}${_scopeId}></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="d-flex mt-3"${_scopeId}><button type="button" class="btn btn-sm btn-warning w-100"${_scopeId}><span class="h6 mb-0"${_scopeId}>${ssrInterpolate("Pay with " + (payment_method.value == "cash" ? "Cash On Delivery" : "Dana"))}</span></button></div></div></div></div></div>`);
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
                      onClick: ($event) => unref(router).visit(
                        _ctx.route("shop.stand", __props.transaction.stand_id)
                      )
                    }, [
                      createVNode("i", { class: "bi bi-chevron-left" }),
                      createVNode("span", { class: "d-none d-lg-inline ms-2" }, toDisplayString("Back"))
                    ], 8, ["onClick"]),
                    createVNode("div", { class: "border-start border-primary border-2 mx-2 mx-lg-4" }),
                    createVNode("div", { class: "d-flex" }, [
                      createVNode("span", { class: "h5 my-auto" }, toDisplayString(isLargeScreen.value ? "Payment Transaction" : "Payment"), 1)
                    ])
                  ])
                ])
              ], 4),
              createVNode("div", {
                class: "container",
                style: { "margin-top": "8rem" }
              }, [
                createVNode("div", { class: "row g-4" }, [
                  createVNode("div", { class: "col-12 col-xl-7" }, [
                    createVNode("div", { class: "card bg-white shadow-sm" }, [
                      createVNode("div", { class: "d-flex shadow-sm p-3 bg-white rounded-top" }, [
                        createVNode("span", { class: "h6 text-primary-emphasis mb-0" }, [
                          createVNode("i", { class: "bi bi-cart4 me-2" }),
                          createTextVNode(" " + toDisplayString("Order Detail"))
                        ])
                      ]),
                      createVNode("div", { class: "d-flex px-3 py-2" }, [
                        createVNode("span", { class: "text-secondary h6 mb-0" }, toDisplayString("Menu")),
                        createVNode("span", {
                          class: "ms-auto text-secondary mt-auto " + (!isLargeScreen.value ? "border-end border-primary border-2 pe-2" : ""),
                          style: { "font-size": "0.8rem" }
                        }, toDisplayString(total_item.value + (total_item.value > 1 ? " items" : " item")), 3),
                        !isLargeScreen.value ? (openBlock(), createBlock("button", {
                          key: 0,
                          "data-bs-toggle": "collapse",
                          "data-bs-target": "#menu_collapse",
                          class: "btn btn-sm btn-outline-primary border-0 py-0",
                          style: { "font-size": "0.8rem" },
                          id: "menu_collapse_trigger",
                          onClick: () => {
                            menu_collapse_trigger.value = menu_collapse_trigger.value == "show" ? "hide" : "show";
                          }
                        }, toDisplayString(menu_collapse_trigger.value), 9, ["onClick"])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", {
                        class: "collapse " + (isLargeScreen.value ? "show" : ""),
                        id: "menu_collapse"
                      }, [
                        createVNode("div", { class: "scroll-container-3 scroll-container-lg-2 pe-1" }, [
                          createVNode("li", { class: "list-group list-group-flush" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.transaction.order_list, (item, index) => {
                              return openBlock(), createBlock("ul", { class: "list-group-item list-group-item-action px-0 py-1 mb-0" }, [
                                createVNode("div", {
                                  class: "float-start p-2",
                                  style: {
                                    width: isLargeScreen.value ? "15%" : "20%"
                                  }
                                }, [
                                  createVNode("img", {
                                    src: "/storage/images/shop/foods/menu/" + ((item == null ? void 0 : item.image) ?? "default.png"),
                                    alt: "image",
                                    style: { "aspect-ratio": "1", "width": "100%" },
                                    class: "placeholder img-fluid rounded",
                                    onLoad: unref(showImage)
                                  }, null, 40, ["src", "onLoad"])
                                ], 4),
                                createVNode("div", {
                                  class: "float-end py-2 my-auto",
                                  style: {
                                    width: isLargeScreen.value ? "85%" : "80%"
                                  }
                                }, [
                                  createVNode("span", { class: "d-block text-primary-emphasis" }, toDisplayString("( " + item.qty + " ) " + item.name), 1),
                                  createVNode("div", { class: "d-flex" }, [
                                    createVNode("div", { class: "" }, [
                                      createVNode("span", {
                                        class: "d-inline-block text-secondary my-auto",
                                        style: { "width": "2.5rem", "font-size": "0.8rem" }
                                      }, toDisplayString("Price")),
                                      createVNode("span", { class: "" }, toDisplayString(": " + unref(formatIDR)(item.price)), 1)
                                    ]),
                                    createVNode("div", { class: "ms-auto" }, [
                                      createVNode("span", {
                                        class: "d-inline-block text-secondary my-auto",
                                        style: { "width": "2.5rem", "font-size": "0.8rem" }
                                      }, toDisplayString("Total")),
                                      createVNode("span", {
                                        class: "h6 d-inline-block",
                                        style: { "width": "6rem" }
                                      }, toDisplayString(": " + unref(formatIDR)(
                                        item.price * item.qty
                                      )), 1)
                                    ])
                                  ])
                                ], 4)
                              ]);
                            }), 256))
                          ])
                        ])
                      ], 2),
                      createVNode("div", { class: "d-flex px-3 py-2" }, [
                        createVNode("span", { class: "text-secondary h6 mb-0" }, toDisplayString("Transaction"))
                      ]),
                      createVNode("div", { class: "d-flex mt-2 px-3" }, [
                        createVNode("span", { class: "text-secondary" }, toDisplayString("Subtotal")),
                        createVNode("span", { class: "ms-auto" }, toDisplayString(unref(formatIDR)(total_price.value ?? 0)), 1)
                      ]),
                      createVNode("div", { class: "d-flex mt-2 px-3" }, [
                        createVNode("span", { class: "text-secondary my-auto" }, toDisplayString("Voucher")),
                        createVNode("div", { class: "bg-warning bg-opacity-10 ms-auto rounded px-2" }, toDisplayString(__props.transaction.voucher_id > 0 ? "Applied" : "Not Used"), 1)
                      ]),
                      createVNode("div", { class: "d-flex mt-2 px-3" }, [
                        createVNode("span", { class: "text-secondary" }, toDisplayString("Discount")),
                        createVNode("span", { class: "ms-auto" }, toDisplayString(unref(formatIDR)(__props.transaction.discount ?? 0)), 1)
                      ]),
                      createVNode("div", { class: "d-flex mt-2 rounded bg-warning bg-opacity-25 p-2 mx-3 mb-3" }, [
                        createVNode("span", null, toDisplayString("Total")),
                        createVNode("span", { class: "h6 my-auto ms-auto text-warning-emphasis" }, toDisplayString(unref(formatIDR)(__props.transaction.transaction)), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "col-12 col-xl-5" }, [
                    createVNode("div", { class: "card p-3 shadow-sm" }, [
                      createVNode("div", { class: "d-flex border-bottom border-primary border-2 pb-2" }, [
                        createVNode("span", { class: "mb-0 h6 text-primary-emphasis" }, [
                          createVNode("i", { class: "fa-solid fa-cash-register me-2" }),
                          createTextVNode(toDisplayString("PAYMENT"))
                        ])
                      ]),
                      createVNode("div", { class: "d-flex mt-2" }, [
                        createVNode("span", {
                          class: "text-secondary",
                          style: { "font-size": "0.8rem" }
                        }, toDisplayString("Order Type"))
                      ]),
                      createVNode("div", { class: "d-flex" }, [
                        unref(format)(/* @__PURE__ */ new Date(), "yyyy-MM-dd") == unref(format)(new Date(__props.stand.date), "yyyy-MM-dd") ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "w-50 rounded card-bg-hover-warning"
                        }, [
                          createVNode("div", { class: "card bg-warning bg-opacity-10" }, [
                            createVNode("span", { class: "mx-auto text-dark" }, [
                              createVNode("i", { class: "bi bi-calendar-check me-1" }),
                              createTextVNode(" " + toDisplayString("Now"))
                            ])
                          ])
                        ])) : createCommentVNode("", true),
                        unref(format)(/* @__PURE__ */ new Date(), "yyyy-MM-dd") < unref(format)(new Date(__props.stand.date), "yyyy-MM-dd") ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "w-50 rounded card-bg-hover-warning"
                        }, [
                          createVNode("div", { class: "card bg-warning bg-opacity-10" }, [
                            createVNode("span", { class: "mx-auto text-dark" }, [
                              createVNode("i", { class: "bi bi-calendar-week me-1" }),
                              createTextVNode(" " + toDisplayString("Pre-Order"))
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "d-flex mt-2" }, [
                        createVNode("span", {
                          class: "text-secondary",
                          style: { "font-size": "0.8rem" }
                        }, toDisplayString("Send Option"))
                      ]),
                      createVNode("div", { class: "d-flex" }, [
                        __props.stand.type != 1 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "w-50 rounded card-bg-hover-warning",
                          onClick: ($event) => send_option.value = "pick_up"
                        }, [
                          createVNode("div", {
                            class: "card " + (send_option.value == "pick_up" ? "bg-warning bg-opacity-10" : "")
                          }, [
                            createVNode("span", {
                              class: "mx-auto " + (send_option.value == "pick_up" ? "text-dark" : "text-secondary")
                            }, [
                              createVNode("i", { class: "bi bi-person-arms-up me-1" }),
                              createTextVNode(" " + toDisplayString("Pick Up"))
                            ], 2)
                          ], 2)
                        ], 8, ["onClick"])) : createCommentVNode("", true),
                        createVNode("div", {
                          class: "w-50 rounded card-bg-hover-warning",
                          onClick: ($event) => send_option.value = "delivery"
                        }, [
                          createVNode("div", {
                            class: "card " + (send_option.value == "delivery" ? "bg-warning bg-opacity-10" : "")
                          }, [
                            createVNode("span", {
                              class: "mx-auto " + (send_option.value == "delivery" ? "text-dark" : "text-secondary")
                            }, [
                              createVNode("i", { class: "fa-solid fa-truck-fast me-1" }),
                              createTextVNode(" " + toDisplayString("Delivery"))
                            ], 2)
                          ], 2)
                        ], 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "d-flex mt-2" }, [
                        createVNode("span", {
                          class: "text-secondary",
                          style: { "font-size": "0.8rem" }
                        }, toDisplayString((send_option.value == "pick_up" ? "Pick up " : "Delivery ") + " Date"), 1)
                      ]),
                      createVNode("div", { class: "d-flex my-1" }, [
                        createVNode("span", { class: "text-warning-emphasis h6 mb-0" }, toDisplayString(unref(format)(__props.stand.date, "EEEE, dd MMM yyy")), 1)
                      ]),
                      createVNode("div", { class: "d-flex mt-2" }, [
                        createVNode("span", {
                          class: "text-secondary",
                          style: { "font-size": "0.8rem" }
                        }, toDisplayString("Payment Method"))
                      ]),
                      createVNode("div", { class: "d-flex" }, [
                        createVNode("div", {
                          class: "w-50 rounded card-bg-hover-warning",
                          onClick: ($event) => payment_method.value = ""
                        }, [
                          createVNode("div", {
                            class: "card " + (payment_method.value == "cash" ? "bg-warning bg-opacity-10" : "")
                          }, [
                            createVNode("span", {
                              class: "mx-auto " + (payment_method.value == "cash" ? "text-dark" : "text-secondary")
                            }, [
                              createVNode("i", { class: "fa-solid fa-money-bill-wave me-2 text-primary" }),
                              createTextVNode(" " + toDisplayString("Cash"))
                            ], 2)
                          ], 2)
                        ], 8, ["onClick"]),
                        createVNode("div", {
                          class: "w-50 rounded card-bg-hover-warning",
                          onClick: ($event) => payment_method.value = ""
                        }, [
                          createVNode("div", {
                            class: "card " + (payment_method.value == "dana" ? "bg-warning bg-opacity-10" : "")
                          }, [
                            createVNode("span", {
                              class: "mx-auto " + (payment_method.value == "dana" ? "text-dark" : "text-secondary")
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "icon icon-dana d-inline rounded-circle border-primary border",
                                style: { "width": "1rem", "height": "1rem", "padding": "0.1rem" }
                              }, [
                                createVNode("use", { href: "/icons.svg#dana" })
                              ])),
                              createTextVNode(" " + toDisplayString("Dana"))
                            ], 2)
                          ], 2)
                        ], 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "d-flex mt-3" }, [
                        createVNode("button", {
                          type: "button",
                          "data-bs-toggle": "collapse",
                          "data-bs-target": ".multi-collapse",
                          "aria-controls": "paymentGuideCollapseCash paymentGuideCollapseDana",
                          class: "btn btn-outline-secondary btn-sm py-0 w-100 border"
                        }, [
                          createVNode("span", { style: { "font-size": "0.8rem" } }, toDisplayString("Payment Guide"))
                        ])
                      ]),
                      createVNode(Transition, {
                        name: "fade-slide-ltr",
                        onAfterLeave: ($event) => payment_method.value = "dana"
                      }, {
                        default: withCtx(() => [
                          payment_method.value == "cash" ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("div", {
                              class: "collapse multi-collapse",
                              id: "paymentGuideCollapseCash"
                            }, [
                              createVNode("li", { class: "list-group list-group-flush" }, [
                                (openBlock(), createBlock(Fragment, null, renderList([
                                  {
                                    text: "Please give the cash to the courier when you receive the order.",
                                    sub: "Anda dapat memberikan uangnya kepada kurir ketika menerima pesanan."
                                  },
                                  {
                                    text: "Please fill the 'Payment Price'. For the courier will bring the payment change.",
                                    sub: "Silakan mengisi 'Payment Price' sesuai nominal uang yang akan diberikan. Agar kurir dapat memberikan kembalian."
                                  }
                                ], (item) => {
                                  return createVNode("ul", {
                                    style: { "font-size": "0.8rem" },
                                    class: "list-group-item list-group-item-light mb-0"
                                  }, [
                                    createVNode("p", { class: "mb-0" }, toDisplayString(item.text), 1),
                                    createVNode("p", { class: "mb-0 text-secondary fst-italic" }, toDisplayString(item.sub), 1)
                                  ]);
                                }), 64))
                              ])
                            ]),
                            createVNode("div", { class: "d-flex mt-2" }, [
                              createVNode("span", {
                                class: "text-secondary",
                                style: { "font-size": "0.8rem" }
                              }, [
                                createTextVNode(toDisplayString("Payment Price") + " "),
                                createVNode("i", {
                                  "data-bs-target": "#paymentGuideCollapseCash",
                                  "data-bs-toggle": "collapse",
                                  class: "bi bi-info-circle ms-1 my-auto",
                                  style: { "font-size": "0.6rem" }
                                })
                              ])
                            ]),
                            createVNode("div", { class: "input-group input-group-sm" }, [
                              createVNode("label", {
                                for: "payment_price",
                                class: "input-group-text"
                              }, toDisplayString("Rp")),
                              withDirectives(createVNode("input", {
                                type: "number",
                                id: "payment_price",
                                class: "form-control",
                                placeholder: "e.g " + __props.transaction.transaction,
                                required: payment_method.value == "cash",
                                "onUpdate:modelValue": ($event) => unref(form_add_transaction).payment_price = $event
                              }, null, 8, ["placeholder", "required", "onUpdate:modelValue"]), [
                                [
                                  vModelText,
                                  unref(form_add_transaction).payment_price
                                ]
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }, 8, ["onAfterLeave"]),
                      createVNode(Transition, {
                        name: "fade-slide-rtl",
                        onAfterLeave: ($event) => payment_method.value = "cash"
                      }, {
                        default: withCtx(() => {
                          var _a2, _b2;
                          return [
                            payment_method.value == "dana" ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("div", {
                                class: "collapse multi-collapse",
                                id: "paymentGuideCollapseDana"
                              }, [
                                createVNode("li", { class: "list-group list-group-flush" }, [
                                  (openBlock(), createBlock(Fragment, null, renderList([
                                    {
                                      text: "Please upload the transfer receipt of DANA to the 'DANA Receipt'.",
                                      sub: "Silakan mengunggah bukti transfer DANA ke bagian 'DANA Receipt'."
                                    },
                                    {
                                      text: "Please transfer exact amount of 'Total Transaction'.",
                                      sub: "Mohon untuk mentransfer jumlah yang sesuai dengan 'Total Transaction'."
                                    }
                                  ], (item) => {
                                    return createVNode("ul", {
                                      style: { "font-size": "0.8rem" },
                                      class: "list-group-item list-group-item-light mb-0"
                                    }, [
                                      createVNode("p", { class: "mb-0" }, toDisplayString(item.text), 1),
                                      createVNode("p", { class: "mb-0 text-secondary fst-italic" }, toDisplayString(item.sub), 1)
                                    ]);
                                  }), 64))
                                ])
                              ]),
                              createVNode("div", { class: "d-flex mt-2" }, [
                                createVNode("span", {
                                  class: "text-secondary",
                                  style: { "font-size": "0.8rem" }
                                }, toDisplayString("DANA Contact"))
                              ]),
                              createVNode("div", { class: "d-flex" }, [
                                createVNode("span", {
                                  class: "text-secondary",
                                  style: {}
                                }, [
                                  createTextVNode(toDisplayString(__props.dana_contact.name + " - ") + " ", 1),
                                  createVNode("span", { class: "text-dark" }, toDisplayString(__props.dana_contact.phone), 1)
                                ]),
                                createVNode("i", {
                                  class: "bi bi-copy text-secondary card-bg-hover px-2 rounded",
                                  onClick: ($event) => copyDanaContact()
                                }, null, 8, ["onClick"])
                              ]),
                              createVNode("div", { class: "d-flex mt-2" }, [
                                createVNode("span", {
                                  class: "text-secondary",
                                  style: { "font-size": "0.8rem" }
                                }, toDisplayString("Total Transaction"))
                              ]),
                              createVNode("div", { class: "d-flex" }, [
                                createVNode("span", {
                                  class: "h6",
                                  style: {}
                                }, toDisplayString(unref(formatIDR)(__props.transaction.transaction)), 1)
                              ]),
                              createVNode("div", { class: "d-flex mt-2" }, [
                                createVNode("span", {
                                  class: "text-secondary",
                                  style: { "font-size": "0.8rem" }
                                }, [
                                  createTextVNode(toDisplayString("DANA Receipt") + " "),
                                  createVNode("i", {
                                    "data-bs-target": "#paymentGuideCollapseDana",
                                    "data-bs-toggle": "collapse",
                                    class: "bi bi-info-circle ms-1 my-auto",
                                    style: { "font-size": "0.6rem" }
                                  })
                                ])
                              ]),
                              createVNode("div", { class: "input-group input-group-sm border rounded" }, [
                                createVNode("button", {
                                  class: "btn btn-outline-secondary border-0",
                                  type: "button",
                                  onClick: ($event) => triggerFileDanaReceiptImage()
                                }, toDisplayString("Upload Receipt"), 8, ["onClick"]),
                                createVNode("input", {
                                  ref_key: "inputDanaReceiptRef",
                                  ref: inputDanaReceiptRef,
                                  type: "file",
                                  class: "d-none",
                                  onChange: handleFileUploadDanaReceipt
                                }, null, 544),
                                createVNode("input", {
                                  type: "text",
                                  class: "form-control",
                                  disabled: "",
                                  placeholder: ((_b2 = (_a2 = unref(form_add_transaction)) == null ? void 0 : _a2.dana_receipt) == null ? void 0 : _b2.name) ?? "filename.format"
                                }, null, 8, ["placeholder"])
                              ])
                            ])) : createCommentVNode("", true)
                          ];
                        }),
                        _: 1
                      }, 8, ["onAfterLeave"]),
                      createVNode("div", { class: "d-flex mt-3" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-sm btn-warning w-100",
                          onClick: ($event) => handleAddTransaction()
                        }, [
                          createVNode("span", { class: "h6 mb-0" }, toDisplayString("Pay with " + (payment_method.value == "cash" ? "Cash On Delivery" : "Dana")), 1)
                        ], 8, ["onClick"])
                      ])
                    ])
                  ])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Transaction.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
