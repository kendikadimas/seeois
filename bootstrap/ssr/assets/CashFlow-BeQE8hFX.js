import { ref, watch, withCtx, unref, createVNode, toDisplayString, createBlock, createCommentVNode, createTextVNode, openBlock, withModifiers, withDirectives, vModelText, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./StaffLayout-Dx7OTDGc.js";
import { _ as _sfc_main$3 } from "./InputError-DugfSnOg.js";
import { _ as _sfc_main$4 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$2 } from "./ModalConfirmation-CQDhtLdH.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
/* empty css             */
import "vue-toastification";
const _sfc_main = {
  __name: "CashFlow",
  __ssrInlineRender: true,
  props: {
    default_contribution_id: Number,
    contribution_config: Object,
    contribution_users: Array,
    cash_in_items: Array,
    cash_out_items: Array,
    cash_in_total: Number,
    cash_out_total: Number,
    filter: Object,
    notif: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const title = ref("Cash Flow");
    const modalConfirmationRef = ref(null);
    const modalAddCashInRef = ref(null);
    const toastNotifRef = ref(null);
    const cash_in_receipt = ref(null);
    const form_add_cash_in = useForm({
      name: null,
      price: null,
      receipt: null
    });
    const form_cash_in_filter = useForm({
      category: props.filter.cash_in.category,
      order: props.filter.cash_in.order
    });
    const form_cash_out_filter = useForm({
      category: props.filter.cash_out.category,
      order: props.filter.cash_out.order
    });
    function handleAddCashIn() {
      form_add_cash_in.post(route("cashIn.add"), {
        onSuccess: () => {
          showAddCashInModal(false);
          form_add_cash_in.reset();
        },
        onError: (e) => {
          for (let key in e) {
            toastNotifRef.value.showToast("warning", e[key]);
          }
        }
      });
    }
    function handleCashInFilter(category) {
      form_cash_in_filter.order = props.filter.cash_in.category == category ? props.filter.cash_in.order == "asc" ? "desc" : "asc" : "desc";
      form_cash_in_filter.category = category;
      form_cash_in_filter.post(route("cashIn.filter"));
    }
    function handleCashOutFilter(category) {
      form_cash_out_filter.order = props.filter.cash_out.category == category ? props.filter.cash_out.order == "asc" ? "desc" : "asc" : "desc";
      form_cash_out_filter.category = category;
      form_cash_out_filter.post(route("cashOut.filter"));
    }
    const handleFileAddCashIn = (event) => {
      form_add_cash_in.receipt = event.target.files[0];
    };
    function showAddCashInModal(is_show) {
      if (modalAddCashInRef.value == null) {
        const modal = document.getElementById("addCashInModal");
        modalAddCashInRef.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      if (is_show) {
        modalAddCashInRef.value.show();
      } else {
        modalAddCashInRef.value.hide();
      }
    }
    function confirmation(route2, message) {
      if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route2, message);
      } else {
        console.error("modalConfirmationRef is null");
      }
    }
    function formatIDR(amount) {
      return utils.formatIDR(amount);
    }
    function formatDate(date) {
      return utils.formatDate(date);
    }
    watch(
      () => props.notif,
      (newValue) => {
        const notification = newValue;
        toastNotifRef.value.showToast(notification.type, notification.message);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(title.value)}`);
          } else {
            return [
              createTextVNode(toDisplayString(title.value), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: title.value,
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="container me-lg-0 mx-auto mb-5"${_scopeId}><div class="row gx-lg-4 mt-4"${_scopeId}><div class="col-12"${_scopeId}><div class="row"${_scopeId}><div class="col-12"${_scopeId}><div class="card p-3"${_scopeId}><div class="d-flex border-bottom border-1 border-primary"${_scopeId}><span class="h5 text-primary-emphasis"${_scopeId}>${ssrInterpolate("General Cashflow")}</span></div><div class="row gx-2"${_scopeId}><div class="col-6 col-lg-4"${_scopeId}><div class="mx-auto mt-2 d-flex"${_scopeId}><i class="bi bi-wallet2 me-3 text-primary fs-5 my-auto"${_scopeId}></i><div${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Balance")}</span><span class="text-dark"${_scopeId}>${ssrInterpolate(formatIDR(
              __props.cash_in_total - __props.cash_out_total
            ))}</span></div></div></div><div class="col-6 col-lg-4"${_scopeId}><div class="mx-auto mt-2 d-flex"${_scopeId}><i class="bi bi-journal-plus me-3 text-primary fs-5 my-auto"${_scopeId}></i><div${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Cash In")}</span><span class="text-dark"${_scopeId}>${ssrInterpolate(formatIDR(__props.cash_in_total))}</span></div></div></div><div class="col-6 col-lg-4"${_scopeId}><div class="mx-auto mt-2 d-flex"${_scopeId}><i class="bi bi-journal-minus me-3 text-primary fs-5 my-auto"${_scopeId}></i><div${_scopeId}><span class="d-block text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Cash Out")}</span><span class="text-dark"${_scopeId}>${ssrInterpolate(formatIDR(__props.cash_out_total))}</span></div></div></div></div></div></div></div><div class="row gx-4 pb-4"${_scopeId}><div class="col-12 col-lg-6"${_scopeId}><div class="card bg-secondary bg-opacity-25 mt-4"${_scopeId}><div class="row"${_scopeId}><div class="col-12"${_scopeId}><div class="card p-3"${_scopeId}><div class="row"${_scopeId}><div class="col-12"${_scopeId}><div class="d-flex border-primary border-bottom pb-2 px-0"${_scopeId}><span class="text-primary-emphasis ms-0 me-auto my-auto h6"${_scopeId}><i class="bi bi-journal-plus me-1"${_scopeId}></i> ${ssrInterpolate("Cash In List")}</span>`);
            if (unref(auth_user).roles_id == 2) {
              _push2(`<button class="btn btn-sm btn-outline-primary border-0 py-0"${_scopeId}><i class="bi bi-plus-lg"${_scopeId}></i></button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(auth_user).roles_id == 2) {
              _push2(`<div class="modal fade" id="addCashInModal" tabindex="-1" aria-labelledby="newCashInModal"${_scopeId}><div class="modal-dialog modal-dialog-centered"${_scopeId}><div class="modal-content shadow mx-3"${_scopeId}><div class="modal-header py-1 ps-3 pe-2"${_scopeId}><span class="modal-title fs-5 text-primary-emphasis" id="newCashInModal"${_scopeId}><i class="bi bi-wallet border-secondary border-end me-2 pe-2"${_scopeId}></i> ${ssrInterpolate("New Cash In")}</span><button type="button" class="btn btn-sm ms-auto"${_scopeId}><i class="bi bi-x-lg"${_scopeId}></i></button></div><form${_scopeId}><div class="modal-body bg-light"${_scopeId}><div class="row justify-content-center"${_scopeId}><div class="col-4 col-lg-3"${_scopeId}><label for="cash_in_name" class="form-label d-inline-block"${_scopeId}>${ssrInterpolate("Name")}</label></div><div class="col-8 col-lg-7"${_scopeId}><input type="text" class="form-control form-control-sm" id="cash_in_name"${ssrRenderAttr(
                "value",
                unref(form_add_cash_in).name
              )} placeholder="Dana Fakultas or etc..."${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                messages: unref(form_add_cash_in).errors.name,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="row mt-2 justify-content-center"${_scopeId}><div class="col-4 col-lg-3"${_scopeId}><label for="cash_in_price" class="form-label d-inline-block"${_scopeId}>${ssrInterpolate("Price")}</label></div><div class="col-8 col-lg-7"${_scopeId}><input type="number" name="cash_in_price" class="form-control form-control-sm"${ssrRenderAttr(
                "value",
                unref(form_add_cash_in).price
              )} id="cash_in_price"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                messages: unref(form_add_cash_in).errors.price,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="row mt-2 justify-content-center"${_scopeId}><div class="col-4 col-lg-3"${_scopeId}><label for="cash_in_receipt" class="form-label d-inline-block"${_scopeId}>${ssrInterpolate("Receipt")}</label></div><div class="col-8 col-lg-7"${_scopeId}><input type="file" class="form-control form-control-sm" id="cash_in_receipt" required${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                messages: unref(form_add_cash_in).errors.receipt,
                class: "mt-2"
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div><div class="modal-footer p-1"${_scopeId}><button type="submit" class="btn btn-sm btn-primary"${_scopeId}>${ssrInterpolate("Add Cash In")}</button></div></form></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="d-flex mt-2"${_scopeId}><span class="text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto"${_scopeId}>${ssrInterpolate("Filter")}</span><button class="btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"${_scopeId}>${ssrInterpolate("Name")} <i class="${ssrRenderClass(
              "bi bi-arrow-" + (__props.filter.cash_in.category == "name" ? __props.filter.cash_in.order == "asc" ? "up" : "down" : "up")
            )}"${_scopeId}></i></button><button class="btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0 ms-2"${_scopeId}>${ssrInterpolate("Price")} <i class="${ssrRenderClass(
              "bi bi-arrow-" + (__props.filter.cash_in.category == "price" ? __props.filter.cash_in.order == "asc" ? "up" : "down" : "up")
            )}"${_scopeId}></i></button></div></div></div></div><div class="row"${_scopeId}><div class="col-12"${_scopeId}><div class="scroll-container-2 scroll-container-lg-2 pt-2 mb-1 rounded"${_scopeId}>`);
            if (__props.cash_in_items.length == 0) {
              _push2(`<div class="row mb-2"${_scopeId}><div class="col"${_scopeId}><span class="ms-3 text-secondary"${_scopeId}>${ssrInterpolate("No cash in found.")}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.cash_in_items, (item) => {
              _push2(`<div class="row mb-2"${_scopeId}><div class="col-12"${_scopeId}><div class="card py-2 mx-2 px-1 shadow-sm card-bg-hover text-dark"${_scopeId}><div class="d-block" style="${ssrRenderStyle({ "width": "100%" })}"${_scopeId}><div class="d-flex border-bottom border-1 mx-2 pb-1"${_scopeId}><p class="fw-normal me-auto my-auto scroll-x-hidden"${_scopeId}><span class="text-nowrap text-primary-emphasis"${_scopeId}>${ssrInterpolate(item.name)}</span></p><div class="d-flex ms-2 mb-auto"${_scopeId}>`);
              if (item.name !== "Contribution Charge") {
                _push2(`<button class="btn btn-sm btn-outline-secondary border-0 my-auto" data-bs-toggle="modal" data-bs-target="#cashInReceiptModal"${_scopeId}><i class="bi bi-receipt"${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).roles_id == 2 && item.name !== "Contribution Charge") {
                _push2(`<div class="border-start border-2 border-secondary-subtle my-1 mx-1"${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).roles_id == 2 && item.name !== "Contribution Charge") {
                _push2(`<button class="text-decoration-none btn btn-sm btn-outline-secondary border-0 my-auto"${_scopeId}><i class="bi bi-trash"${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="d-flex mx-0 mt-1"${_scopeId}><p class="mb-0 ms-2"${_scopeId}><i class="${ssrRenderClass(
                " me-2 text-secondary bi bi-person" + (item.financial ? "" : "-exclamation text-danger")
              )}"${_scopeId}></i>`);
              if (item.financial) {
                _push2(`<span${_scopeId}>${ssrInterpolate(item.financial.name)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).roles_id == 2 && item.name !== "Contribution Charge" && !item.financial) {
                _push2(`<button class="btn btn-sm btn-outline-danger border-0"${_scopeId}>${ssrInterpolate("Click here to validate")}</button>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).roles_id !== 2 && item.name !== "Contribution Charge" && !item.financial) {
                _push2(`<span${_scopeId}>${ssrInterpolate("Required validation from Financial Officer.")}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</p></div><div class="d-flex mx-0 mt-1"${_scopeId}><span class="ms-2 text-primary"${_scopeId}><i class="bi bi-journal-plus me-2 text-secondary"${_scopeId}></i> ${ssrInterpolate(formatIDR(
                item.price
              ))}</span><span class="ms-auto me-2 my-auto text-end text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(formatDate(
                item.created_at
              ))}</span></div></div></div></div></div>`);
            });
            _push2(`<!--]--></div></div></div></div></div><div class="col-12 col-lg-6"${_scopeId}><div class="card bg-secondary bg-opacity-25 mt-4"${_scopeId}><div class="row"${_scopeId}><div class="col-12"${_scopeId}><div class="card shadow-sm p-3"${_scopeId}><div class="row px-0"${_scopeId}><div class="col-12"${_scopeId}><div class="d-flex border-primary border-bottom px-0 pb-2"${_scopeId}><span class="text-primary-emphasis ms-0 me-auto my-auto h6"${_scopeId}><i class="bi bi-journal-minus me-1"${_scopeId}></i> ${ssrInterpolate("Cash Out List")}</span></div></div></div><div class="d-flex mt-2"${_scopeId}><span class="text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto"${_scopeId}>${ssrInterpolate("Filter")}</span><button class="btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"${_scopeId}>${ssrInterpolate("Name")} <i class="${ssrRenderClass(
              "bi bi-arrow-" + (__props.filter.cash_out.category == "name" ? __props.filter.cash_out.order == "asc" ? "up" : "down" : "up")
            )}"${_scopeId}></i></button><button class="btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0 ms-2"${_scopeId}>${ssrInterpolate("Price")} <i class="${ssrRenderClass(
              "bi bi-arrow-" + (__props.filter.cash_out.category == "disbursement" ? __props.filter.cash_out.order == "asc" ? "up" : "down" : "up")
            )}"${_scopeId}></i></button></div></div></div></div><div class="row mt-0"${_scopeId}><div class="col-12"${_scopeId}><div class="scroll-container-2 scroll-container-lg-2 pt-2 mb-1 rounded"${_scopeId}>`);
            if (__props.cash_out_items.length == 0) {
              _push2(`<div class="row mb-2"${_scopeId}><div class="col"${_scopeId}><span class="ms-3 text-secondary"${_scopeId}>${ssrInterpolate("No department found.")}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.cash_out_items, (item) => {
              _push2(`<div class="row mb-2"${_scopeId}><div class="col-12"${_scopeId}><div class="card py-2 mx-2 px-1 shadow-sm card-bg-hover text-dark"${_scopeId}><div class="d-block mx-0"${_scopeId}><div class="d-flex mx-2 border-bottom border-1 pb-1"${_scopeId}><p class="fw-normal me-auto my-auto text-primary-emphasis"${_scopeId}>${ssrInterpolate(item.name)}</p><div class="btn-group btn-group-sm ms-auto"${_scopeId}><a class="btn btn-sm btn-outline-primary border-0 text-decoration-none py-0 d-flex"${ssrRenderAttr(
                "href",
                _ctx.route(
                  "department",
                  item.department_id
                )
              )}${_scopeId}><i class="bi bi-info-circle my-auto"${_scopeId}></i></a></div></div><div class="d-flex mx-2 mt-1 text-secondary"${_scopeId}><i class="bi bi-person me-2"${_scopeId}></i> ${ssrInterpolate(item.manager.name)}</div><div class="d-flex"${_scopeId}><span class="ms-2 text-primary"${_scopeId}><i class="bi bi-journal-minus me-2 text-secondary"${_scopeId}></i> ${ssrInterpolate(formatIDR(
                item.disbursement
              ))}</span><span class="ms-auto me-2 my-auto text-end text-secondary" style="${ssrRenderStyle("font-size: 0.8rem;")}"${_scopeId}>${ssrInterpolate(formatDate(
                item.created_at
              ))}</span></div></div></div></div></div>`);
            });
            _push2(`<!--]--></div></div></div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: title.value,
                icon: "/storage/local/images/apps/logo.png"
              }, null, 8, ["title"]),
              createVNode(_sfc_main$2, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
              }, null, 512),
              createVNode("div", { class: "container me-lg-0 mx-auto mb-5" }, [
                createVNode("div", { class: "row gx-lg-4 mt-4" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "row" }, [
                      createVNode("div", { class: "col-12" }, [
                        createVNode("div", { class: "card p-3" }, [
                          createVNode("div", { class: "d-flex border-bottom border-1 border-primary" }, [
                            createVNode("span", { class: "h5 text-primary-emphasis" }, toDisplayString("General Cashflow"))
                          ]),
                          createVNode("div", { class: "row gx-2" }, [
                            createVNode("div", { class: "col-6 col-lg-4" }, [
                              createVNode("div", { class: "mx-auto mt-2 d-flex" }, [
                                createVNode("i", { class: "bi bi-wallet2 me-3 text-primary fs-5 my-auto" }),
                                createVNode("div", null, [
                                  createVNode("span", {
                                    class: "d-block text-secondary",
                                    style: { "font-size": "0.8rem" }
                                  }, toDisplayString("Balance")),
                                  createVNode("span", { class: "text-dark" }, toDisplayString(formatIDR(
                                    __props.cash_in_total - __props.cash_out_total
                                  )), 1)
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "col-6 col-lg-4" }, [
                              createVNode("div", { class: "mx-auto mt-2 d-flex" }, [
                                createVNode("i", { class: "bi bi-journal-plus me-3 text-primary fs-5 my-auto" }),
                                createVNode("div", null, [
                                  createVNode("span", {
                                    class: "d-block text-secondary",
                                    style: { "font-size": "0.8rem" }
                                  }, toDisplayString("Cash In")),
                                  createVNode("span", { class: "text-dark" }, toDisplayString(formatIDR(__props.cash_in_total)), 1)
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "col-6 col-lg-4" }, [
                              createVNode("div", { class: "mx-auto mt-2 d-flex" }, [
                                createVNode("i", { class: "bi bi-journal-minus me-3 text-primary fs-5 my-auto" }),
                                createVNode("div", null, [
                                  createVNode("span", {
                                    class: "d-block text-secondary",
                                    style: { "font-size": "0.8rem" }
                                  }, toDisplayString("Cash Out")),
                                  createVNode("span", { class: "text-dark" }, toDisplayString(formatIDR(__props.cash_out_total)), 1)
                                ])
                              ])
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "row gx-4 pb-4" }, [
                      createVNode("div", { class: "col-12 col-lg-6" }, [
                        createVNode("div", { class: "card bg-secondary bg-opacity-25 mt-4" }, [
                          createVNode("div", { class: "row" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("div", { class: "card p-3" }, [
                                createVNode("div", { class: "row" }, [
                                  createVNode("div", { class: "col-12" }, [
                                    createVNode("div", { class: "d-flex border-primary border-bottom pb-2 px-0" }, [
                                      createVNode("span", { class: "text-primary-emphasis ms-0 me-auto my-auto h6" }, [
                                        createVNode("i", { class: "bi bi-journal-plus me-1" }),
                                        createTextVNode(" " + toDisplayString("Cash In List"))
                                      ]),
                                      unref(auth_user).roles_id == 2 ? (openBlock(), createBlock("button", {
                                        key: 0,
                                        class: "btn btn-sm btn-outline-primary border-0 py-0",
                                        onClick: ($event) => showAddCashInModal(
                                          true
                                        )
                                      }, [
                                        createVNode("i", { class: "bi bi-plus-lg" })
                                      ], 8, ["onClick"])) : createCommentVNode("", true),
                                      unref(auth_user).roles_id == 2 ? (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "modal fade",
                                        id: "addCashInModal",
                                        tabindex: "-1",
                                        "aria-labelledby": "newCashInModal"
                                      }, [
                                        createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                                          createVNode("div", { class: "modal-content shadow mx-3" }, [
                                            createVNode("div", { class: "modal-header py-1 ps-3 pe-2" }, [
                                              createVNode("span", {
                                                class: "modal-title fs-5 text-primary-emphasis",
                                                id: "newCashInModal"
                                              }, [
                                                createVNode("i", { class: "bi bi-wallet border-secondary border-end me-2 pe-2" }),
                                                createTextVNode(" " + toDisplayString("New Cash In"))
                                              ]),
                                              createVNode("button", {
                                                type: "button",
                                                class: "btn btn-sm ms-auto",
                                                onClick: ($event) => showAddCashInModal(
                                                  false
                                                )
                                              }, [
                                                createVNode("i", { class: "bi bi-x-lg" })
                                              ], 8, ["onClick"])
                                            ]),
                                            createVNode("form", {
                                              onSubmit: withModifiers(($event) => handleAddCashIn(), ["prevent"])
                                            }, [
                                              createVNode("div", { class: "modal-body bg-light" }, [
                                                createVNode("div", { class: "row justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3" }, [
                                                    createVNode("label", {
                                                      for: "cash_in_name",
                                                      class: "form-label d-inline-block"
                                                    }, toDisplayString("Name"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    withDirectives(createVNode("input", {
                                                      type: "text",
                                                      class: "form-control form-control-sm",
                                                      id: "cash_in_name",
                                                      "onUpdate:modelValue": ($event) => unref(form_add_cash_in).name = $event,
                                                      placeholder: "Dana Fakultas or etc..."
                                                    }, null, 8, ["onUpdate:modelValue"]), [
                                                      [
                                                        vModelText,
                                                        unref(form_add_cash_in).name
                                                      ]
                                                    ]),
                                                    createVNode(_sfc_main$3, {
                                                      messages: unref(form_add_cash_in).errors.name,
                                                      class: "mt-2"
                                                    }, null, 8, ["messages"])
                                                  ])
                                                ]),
                                                createVNode("div", { class: "row mt-2 justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3" }, [
                                                    createVNode("label", {
                                                      for: "cash_in_price",
                                                      class: "form-label d-inline-block"
                                                    }, toDisplayString("Price"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    withDirectives(createVNode("input", {
                                                      type: "number",
                                                      name: "cash_in_price",
                                                      class: "form-control form-control-sm",
                                                      "onUpdate:modelValue": ($event) => unref(form_add_cash_in).price = $event,
                                                      id: "cash_in_price"
                                                    }, null, 8, ["onUpdate:modelValue"]), [
                                                      [
                                                        vModelText,
                                                        unref(form_add_cash_in).price
                                                      ]
                                                    ]),
                                                    createVNode(_sfc_main$3, {
                                                      messages: unref(form_add_cash_in).errors.price,
                                                      class: "mt-2"
                                                    }, null, 8, ["messages"])
                                                  ])
                                                ]),
                                                createVNode("div", { class: "row mt-2 justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3" }, [
                                                    createVNode("label", {
                                                      for: "cash_in_receipt",
                                                      class: "form-label d-inline-block"
                                                    }, toDisplayString("Receipt"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    createVNode("input", {
                                                      type: "file",
                                                      class: "form-control form-control-sm",
                                                      id: "cash_in_receipt",
                                                      onChange: handleFileAddCashIn,
                                                      required: ""
                                                    }, null, 40, ["onChange"]),
                                                    createVNode(_sfc_main$3, {
                                                      messages: unref(form_add_cash_in).errors.receipt,
                                                      class: "mt-2"
                                                    }, null, 8, ["messages"])
                                                  ])
                                                ])
                                              ]),
                                              createVNode("div", { class: "modal-footer p-1" }, [
                                                createVNode("button", {
                                                  type: "submit",
                                                  class: "btn btn-sm btn-primary"
                                                }, toDisplayString("Add Cash In"))
                                              ])
                                            ], 40, ["onSubmit"])
                                          ])
                                        ])
                                      ])) : createCommentVNode("", true)
                                    ])
                                  ])
                                ]),
                                createVNode("div", { class: "d-flex mt-2" }, [
                                  createVNode("span", { class: "text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto" }, toDisplayString("Filter")),
                                  createVNode("button", {
                                    onClick: ($event) => handleCashInFilter(
                                      "name"
                                    ),
                                    class: "btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"
                                  }, [
                                    createTextVNode(toDisplayString("Name") + " "),
                                    createVNode("i", {
                                      class: "bi bi-arrow-" + (__props.filter.cash_in.category == "name" ? __props.filter.cash_in.order == "asc" ? "up" : "down" : "up")
                                    }, null, 2)
                                  ], 8, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => handleCashInFilter(
                                      "price"
                                    ),
                                    class: "btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0 ms-2"
                                  }, [
                                    createTextVNode(toDisplayString("Price") + " "),
                                    createVNode("i", {
                                      class: "bi bi-arrow-" + (__props.filter.cash_in.category == "price" ? __props.filter.cash_in.order == "asc" ? "up" : "down" : "up")
                                    }, null, 2)
                                  ], 8, ["onClick"])
                                ])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "row" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("div", { class: "scroll-container-2 scroll-container-lg-2 pt-2 mb-1 rounded" }, [
                                __props.cash_in_items.length == 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "row mb-2"
                                }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode("span", { class: "ms-3 text-secondary" }, toDisplayString("No cash in found."))
                                  ])
                                ])) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.cash_in_items, (item) => {
                                  return openBlock(), createBlock("div", { class: "row mb-2" }, [
                                    createVNode("div", { class: "col-12" }, [
                                      createVNode("div", { class: "card py-2 mx-2 px-1 shadow-sm card-bg-hover text-dark" }, [
                                        createVNode("div", {
                                          class: "d-block",
                                          style: { "width": "100%" }
                                        }, [
                                          createVNode("div", { class: "d-flex border-bottom border-1 mx-2 pb-1" }, [
                                            createVNode("p", { class: "fw-normal me-auto my-auto scroll-x-hidden" }, [
                                              createVNode("span", { class: "text-nowrap text-primary-emphasis" }, toDisplayString(item.name), 1)
                                            ]),
                                            createVNode("div", { class: "d-flex ms-2 mb-auto" }, [
                                              item.name !== "Contribution Charge" ? (openBlock(), createBlock("button", {
                                                key: 0,
                                                class: "btn btn-sm btn-outline-secondary border-0 my-auto",
                                                "data-bs-toggle": "modal",
                                                "data-bs-target": "#cashInReceiptModal",
                                                onClick: () => cash_in_receipt.value = item.name !== "Contribution Charge" ? item.reciept : ""
                                              }, [
                                                createVNode("i", { class: "bi bi-receipt" })
                                              ], 8, ["onClick"])) : createCommentVNode("", true),
                                              unref(auth_user).roles_id == 2 && item.name !== "Contribution Charge" ? (openBlock(), createBlock("div", {
                                                key: 1,
                                                class: "border-start border-2 border-secondary-subtle my-1 mx-1"
                                              })) : createCommentVNode("", true),
                                              unref(auth_user).roles_id == 2 && item.name !== "Contribution Charge" ? (openBlock(), createBlock("button", {
                                                key: 2,
                                                class: "text-decoration-none btn btn-sm btn-outline-secondary border-0 my-auto",
                                                onClick: ($event) => confirmation(
                                                  _ctx.route(
                                                    "cashIn.delete",
                                                    item.id
                                                  ),
                                                  "Please confirm to delete " + item.name + " from Cash In item list."
                                                )
                                              }, [
                                                createVNode("i", { class: "bi bi-trash" })
                                              ], 8, ["onClick"])) : createCommentVNode("", true)
                                            ])
                                          ]),
                                          createVNode("div", { class: "d-flex mx-0 mt-1" }, [
                                            createVNode("p", { class: "mb-0 ms-2" }, [
                                              createVNode("i", {
                                                class: " me-2 text-secondary bi bi-person" + (item.financial ? "" : "-exclamation text-danger")
                                              }, null, 2),
                                              item.financial ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(item.financial.name), 1)) : createCommentVNode("", true),
                                              unref(auth_user).roles_id == 2 && item.name !== "Contribution Charge" && !item.financial ? (openBlock(), createBlock("button", {
                                                key: 1,
                                                class: "btn btn-sm btn-outline-danger border-0",
                                                onClick: ($event) => confirmation(
                                                  _ctx.route(
                                                    "cashIn.validate",
                                                    item.id
                                                  ),
                                                  "Click the button to confirm that " + item.name + " price is valid for " + formatIDR(
                                                    item.price
                                                  ) + "."
                                                )
                                              }, toDisplayString("Click here to validate"), 8, ["onClick"])) : createCommentVNode("", true),
                                              unref(auth_user).roles_id !== 2 && item.name !== "Contribution Charge" && !item.financial ? (openBlock(), createBlock("span", { key: 2 }, toDisplayString("Required validation from Financial Officer."))) : createCommentVNode("", true)
                                            ])
                                          ]),
                                          createVNode("div", { class: "d-flex mx-0 mt-1" }, [
                                            createVNode("span", { class: "ms-2 text-primary" }, [
                                              createVNode("i", { class: "bi bi-journal-plus me-2 text-secondary" }),
                                              createTextVNode(" " + toDisplayString(formatIDR(
                                                item.price
                                              )), 1)
                                            ]),
                                            createVNode("span", {
                                              class: "ms-auto me-2 my-auto text-end text-secondary",
                                              style: { "font-size": "0.8rem" }
                                            }, toDisplayString(formatDate(
                                              item.created_at
                                            )), 1)
                                          ])
                                        ])
                                      ])
                                    ])
                                  ]);
                                }), 256))
                              ])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "col-12 col-lg-6" }, [
                        createVNode("div", { class: "card bg-secondary bg-opacity-25 mt-4" }, [
                          createVNode("div", { class: "row" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("div", { class: "card shadow-sm p-3" }, [
                                createVNode("div", { class: "row px-0" }, [
                                  createVNode("div", { class: "col-12" }, [
                                    createVNode("div", { class: "d-flex border-primary border-bottom px-0 pb-2" }, [
                                      createVNode("span", { class: "text-primary-emphasis ms-0 me-auto my-auto h6" }, [
                                        createVNode("i", { class: "bi bi-journal-minus me-1" }),
                                        createTextVNode(" " + toDisplayString("Cash Out List"))
                                      ])
                                    ])
                                  ])
                                ]),
                                createVNode("div", { class: "d-flex mt-2" }, [
                                  createVNode("span", { class: "text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto" }, toDisplayString("Filter")),
                                  createVNode("button", {
                                    onClick: ($event) => handleCashOutFilter(
                                      "name"
                                    ),
                                    class: "btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"
                                  }, [
                                    createTextVNode(toDisplayString("Name") + " "),
                                    createVNode("i", {
                                      class: "bi bi-arrow-" + (__props.filter.cash_out.category == "name" ? __props.filter.cash_out.order == "asc" ? "up" : "down" : "up")
                                    }, null, 2)
                                  ], 8, ["onClick"]),
                                  createVNode("button", {
                                    onClick: ($event) => handleCashOutFilter(
                                      "disbursement"
                                    ),
                                    class: "btn btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0 ms-2"
                                  }, [
                                    createTextVNode(toDisplayString("Price") + " "),
                                    createVNode("i", {
                                      class: "bi bi-arrow-" + (__props.filter.cash_out.category == "disbursement" ? __props.filter.cash_out.order == "asc" ? "up" : "down" : "up")
                                    }, null, 2)
                                  ], 8, ["onClick"])
                                ])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "row mt-0" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("div", { class: "scroll-container-2 scroll-container-lg-2 pt-2 mb-1 rounded" }, [
                                __props.cash_out_items.length == 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "row mb-2"
                                }, [
                                  createVNode("div", { class: "col" }, [
                                    createVNode("span", { class: "ms-3 text-secondary" }, toDisplayString("No department found."))
                                  ])
                                ])) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.cash_out_items, (item) => {
                                  return openBlock(), createBlock("div", { class: "row mb-2" }, [
                                    createVNode("div", { class: "col-12" }, [
                                      createVNode("div", { class: "card py-2 mx-2 px-1 shadow-sm card-bg-hover text-dark" }, [
                                        createVNode("div", { class: "d-block mx-0" }, [
                                          createVNode("div", { class: "d-flex mx-2 border-bottom border-1 pb-1" }, [
                                            createVNode("p", { class: "fw-normal me-auto my-auto text-primary-emphasis" }, toDisplayString(item.name), 1),
                                            createVNode("div", { class: "btn-group btn-group-sm ms-auto" }, [
                                              createVNode("a", {
                                                class: "btn btn-sm btn-outline-primary border-0 text-decoration-none py-0 d-flex",
                                                href: _ctx.route(
                                                  "department",
                                                  item.department_id
                                                )
                                              }, [
                                                createVNode("i", { class: "bi bi-info-circle my-auto" })
                                              ], 8, ["href"])
                                            ])
                                          ]),
                                          createVNode("div", { class: "d-flex mx-2 mt-1 text-secondary" }, [
                                            createVNode("i", { class: "bi bi-person me-2" }),
                                            createTextVNode(" " + toDisplayString(item.manager.name), 1)
                                          ]),
                                          createVNode("div", { class: "d-flex" }, [
                                            createVNode("span", { class: "ms-2 text-primary" }, [
                                              createVNode("i", { class: "bi bi-journal-minus me-2 text-secondary" }),
                                              createTextVNode(" " + toDisplayString(formatIDR(
                                                item.disbursement
                                              )), 1)
                                            ]),
                                            createVNode("span", {
                                              class: "ms-auto me-2 my-auto text-end text-secondary",
                                              style: "font-size: 0.8rem;"
                                            }, toDisplayString(formatDate(
                                              item.created_at
                                            )), 1)
                                          ])
                                        ])
                                      ])
                                    ])
                                  ]);
                                }), 256))
                              ])
                            ])
                          ])
                        ])
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
      _push(`<div class="modal fade" id="cashInReceiptModal" tabindex="-1" aria-labelledby="cashInReceiptModal" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3 mt-5"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-receipt border-secondary border-end me-2 pe-2"></i> ${ssrInterpolate("Cash In Receipt")}</span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button></div><div class="modal-body bg-light p-1 px-3"><div class="row justify-content-center mt-2"><div class="col-12 d-flex"><img${ssrRenderAttr(
        "src",
        "/storage/images/receipt/cash_in/" + cash_in_receipt.value
      )} alt="image" class="rounded mx-auto placeholder" style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "contain", "max-height": "320px" })}"></div></div><div class="row justify-content-center"><div class="col-12 d-flex"><a${ssrRenderAttr(
        "href",
        "/storage/images/reeceipt/cash_in/" + cash_in_receipt.value
      )} target="blank" style="${ssrRenderStyle({})}" class="mx-auto" id="ci_receipt_download" download><button class="btn btn-sm btn-light"><span class="fw-light me-2">${ssrInterpolate(cash_in_receipt.value)}</span><i class="bi bi-download text-primary"></i></button></a></div></div></div><div class="modal-footer p-1"><button data-bs-dismiss="modal" aria-label="Close" class="btn btn-sm btn-secondary">${ssrInterpolate("Close")}</button></div></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        ref_key: "toastNotifRef",
        ref: toastNotifRef
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/CashFlow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
