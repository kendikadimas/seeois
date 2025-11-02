import { ref, onMounted, watch, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./StaffLayout-Dx7OTDGc.js";
import { _ as _sfc_main$3 } from "./InputError-DugfSnOg.js";
import { _ as _sfc_main$4 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$2 } from "./ModalConfirmation-CQDhtLdH.js";
import vSelect from "vue-select";
/* empty css                    */
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { f as formatIDR } from "../app.js";
/* empty css             */
import "vue-toastification";
import "axios";
import "date-fns";
import "bootstrap";
const _sfc_main = {
  __name: "Department",
  __ssrInlineRender: true,
  props: {
    staff_list: Array,
    staff_list_2: Array,
    department: Object,
    notif: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const title = ref("Department");
    const modalConfirmationRef = ref(null);
    const toastNotifRef = ref(null);
    ref("placeholder");
    const modalAddStaffRef = ref(null);
    const modalNewProgram = ref(null);
    const form_add_staff = useForm({
      staff_id: null
    });
    const form_new_program = useForm({
      name: null,
      pic_id: null
    });
    function navigateToStaff(id) {
      document.getElementById(id).click();
    }
    function showAddStaffModal(is_show) {
      if (modalAddStaffRef.value == null) {
        const modal = document.getElementById("addStaffModal");
        modalAddStaffRef.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalAddStaffRef.value.show();
      }
    }
    function showNewProgramModal(is_show) {
      if (modalNewProgram.value == null) {
        const modal = document.getElementById("newProgramModal");
        modalNewProgram.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalNewProgram.value.show();
      }
    }
    function confirmation(route, message) {
      if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route, message);
      } else {
        console.error("modalConfirmationRef is null");
      }
    }
    onMounted(() => {
    });
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
            _push2(`<a${ssrRenderAttr("href", _ctx.route("structural"))} class="bg-opacity-0 text-decoration-none text-primary-emphasis"${_scopeId}><span class="fw-light"${_scopeId}>${ssrInterpolate("Structural")}</span></a><span class="ms-2"${_scopeId}>${ssrInterpolate("/")}</span> ${ssrInterpolate(title.value)}`);
          } else {
            return [
              createVNode("a", {
                href: _ctx.route("structural"),
                class: "bg-opacity-0 text-decoration-none text-primary-emphasis"
              }, [
                createVNode("span", { class: "fw-light" }, toDisplayString("Structural"))
              ], 8, ["href"]),
              createVNode("span", { class: "ms-2" }, toDisplayString("/")),
              createTextVNode(" " + toDisplayString(title.value), 1)
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
            _push2(`<div class="container me-lg-0 mx-auto mb-5"${_scopeId}><div class="row mt-4"${_scopeId}><div class="col-12"${_scopeId}><div class="card p-3"${_scopeId}><div class="d-flex border-bottom border-primary pb-1"${_scopeId}><span class="h5 text-primary-emphasis"${_scopeId}><i class="bi bi-building me-2"${_scopeId}></i> ${ssrInterpolate("Department " + __props.department.name)}</span></div><div class="d-flex mt-2 d-lg-none"${_scopeId}><span class="text-secondary"${_scopeId}>${ssrInterpolate("Detail")}</span></div><div class="row g-2 mt-0 mt-lg-2"${_scopeId}><div class="col-lg-1 d-none d-lg-block"${_scopeId}><div class="d-flex w-100 h-100"${_scopeId}><span class="text-secondary my-auto"${_scopeId}>${ssrInterpolate("Detail")}</span></div></div><div class="col-6 col-lg-3"${_scopeId}><div class="d-flex"${_scopeId}><i class="bi bi-person text-primary fs-5 my-auto me-2"${_scopeId}></i><div${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Manager")}</span><div class="scroll-x-hidden"${_scopeId}><span class="text-dark text-nowrap"${_scopeId}>${ssrInterpolate(__props.department.manager.name)}</span></div></div></div></div><div class="col-6 col-lg-3"${_scopeId}><div class="d-flex"${_scopeId}><i class="bi bi-people text-primary fs-5 my-auto me-2"${_scopeId}></i><div${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Staff")}</span><div class="scroll-x-hidden"${_scopeId}><span class="text-dark text-nowrap"${_scopeId}>${ssrInterpolate(__props.department.staff.length + (__props.department.staff.length > 1 ? " persons" : " person"))}</span></div></div></div></div><div class="col-6 col-lg-3"${_scopeId}><div class="d-flex"${_scopeId}><i class="bi bi-grid text-primary fs-5 my-auto me-2"${_scopeId}></i><div${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Program")}</span><div class="scroll-x-hidden"${_scopeId}><span class="text-dark text-nowrap"${_scopeId}>${ssrInterpolate(__props.department.program.length + (__props.department.program.length > 1 ? " programs" : " program"))}</span></div></div></div></div></div><div class="d-flex mt-2 d-lg-none"${_scopeId}><span class="text-secondary"${_scopeId}>${ssrInterpolate("Cashflow")}</span></div><div class="row g-2 mt-lg-2 mt-0"${_scopeId}><div class="col-lg-1 d-none d-lg-block"${_scopeId}><div class="d-flex w-100 h-100"${_scopeId}><span class="text-secondary my-auto"${_scopeId}>${ssrInterpolate("Cashflow")}</span></div></div><div class="col-6 col-lg-3"${_scopeId}><div class="d-flex"${_scopeId}><i class="bi bi-list-columns-reverse text-primary fs-5 my-auto me-2"${_scopeId}></i><div${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Budget")}</span><div class="scroll-x-hidden"${_scopeId}><span class="text-dark text-nowrap"${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.department.budget))}</span></div></div></div></div><div class="col-6 col-lg-3"${_scopeId}><div class="d-flex"${_scopeId}><i class="bi bi-box-arrow-in-down text-primary fs-5 my-auto me-2"${_scopeId}></i><div${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Disbursement")}</span><div class="scroll-x-hidden"${_scopeId}><span class="text-dark text-nowrap"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
              __props.department.disbursement
            ))}</span></div></div></div></div><div class="col-6 col-lg-3"${_scopeId}><div class="d-flex"${_scopeId}><i class="bi bi-box-arrow-up text-primary fs-5 my-auto me-2"${_scopeId}></i><div${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Expense")}</span><div class="scroll-x-hidden"${_scopeId}><span class="text-dark text-nowrap"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
              __props.department.expense
            ))}</span></div></div></div></div></div></div></div></div><div class="row g-4 mt-0"${_scopeId}><div class="col-12 col-lg-6"${_scopeId}><div class="card sm p-3"${_scopeId}><div class="row"${_scopeId}><div class="col-12"${_scopeId}><div class="d-flex border-primary border-bottom pb-2"${_scopeId}><span class="text-primary-emphasis me-auto my-auto h6"${_scopeId}><i class="bi bi-people me-1"${_scopeId}></i> ${ssrInterpolate("Staff List")}</span>`);
            if (unref(auth_user).id == __props.department.manager_id) {
              _push2(`<button class="btn btn-sm btn-outline-primary border-0 ms-auto py-0"${_scopeId}><i class="bi bi-plus-lg d-lg-none"${_scopeId}></i><span class="d-lg-block d-none"${_scopeId}>${ssrInterpolate("New Staff")}</span></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="scroll-container-2 scroll-container-lg-2"${_scopeId}><li class="list-group list-group-flush"${_scopeId}>`);
            if (__props.department.staff.length == 0) {
              _push2(`<ul class="list-group-item list-group-item-action"${_scopeId}><span class="fst-italic text-secondary"${_scopeId}>${ssrInterpolate("No staff found.")}</span></ul>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.department.staff.length > 0) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.department.staff, (staff, index) => {
                _push2(`<ul class="list-group-item list-group-item-action mb-0 py-2 px-0"${_scopeId}><a${ssrRenderAttr("id", "staff_" + (staff.id * 7 - 3))}${ssrRenderAttr("href", _ctx.route("profile.edit", staff.id))}${_scopeId}></a><div class="d-flex"${_scopeId}><span class="text-secondary border-end border-2 pe-2 me-2"${_scopeId}>${ssrInterpolate(index + 1)}</span><span class="text-dark d-flex"${_scopeId}>${ssrInterpolate(staff.name)} <i class="bi bi-box-arrow-up-right ms-2 my-auto" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}></i></span><button class="btn btn-sm btn-outline-secondary border-0 ms-auto py-0"${_scopeId}><i class="bi bi-trash3"${_scopeId}></i></button></div></ul>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</li></div></div></div><div class="col-12 col-lg-6"${_scopeId}><div class="card sm p-3"${_scopeId}><div class="row"${_scopeId}><div class="col-12"${_scopeId}><div class="d-flex border-primary border-bottom pb-2"${_scopeId}><span class="text-primary-emphasis me-auto my-auto h6"${_scopeId}><i class="bi bi-grid me-1"${_scopeId}></i> ${ssrInterpolate("Program List")}</span>`);
            if (unref(auth_user).id == __props.department.manager_id) {
              _push2(`<button class="btn btn-sm btn-outline-primary border-0 ms-auto py-0"${_scopeId}><i class="bi bi-plus-lg d-lg-none"${_scopeId}></i><span class="d-lg-block d-none"${_scopeId}>${ssrInterpolate("New Program")}</span></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="scroll-container-2 scroll-container-lg-2"${_scopeId}><li class="list-group list-group-flush"${_scopeId}>`);
            if (__props.department.program.length == 0) {
              _push2(`<ul class="list-group-item list-group-item-action"${_scopeId}><span class="fst-italic text-secondary"${_scopeId}>${ssrInterpolate("No program found.")}</span></ul>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.department.program.length > 0) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.department.program, (program, index) => {
                _push2(`<ul class="list-group-item list-group-item-action mb-0 py-2 px-0"${_scopeId}><a${ssrRenderAttr("id", "program_" + (program.id * 7 - 3))}${ssrRenderAttr("href", _ctx.route("program", program.id))}${_scopeId}></a><div class="d-flex"${_scopeId}><span class="text-secondary border-end border-2 pe-2 me-2"${_scopeId}>${ssrInterpolate(index + 1)}</span><span class="text-dark d-flex"${_scopeId}>${ssrInterpolate(program.name)} <i class="bi bi-box-arrow-up-right ms-2 my-auto" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}></i></span><button class="btn btn-sm btn-outline-secondary border-0 ms-auto py-0"${_scopeId}><i class="bi bi-trash3"${_scopeId}></i></button></div></ul>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</li></div></div></div></div></div>`);
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
                createVNode("div", { class: "row mt-4" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card p-3" }, [
                      createVNode("div", { class: "d-flex border-bottom border-primary pb-1" }, [
                        createVNode("span", { class: "h5 text-primary-emphasis" }, [
                          createVNode("i", { class: "bi bi-building me-2" }),
                          createTextVNode(" " + toDisplayString("Department " + __props.department.name), 1)
                        ])
                      ]),
                      createVNode("div", { class: "d-flex mt-2 d-lg-none" }, [
                        createVNode("span", { class: "text-secondary" }, toDisplayString("Detail"))
                      ]),
                      createVNode("div", { class: "row g-2 mt-0 mt-lg-2" }, [
                        createVNode("div", { class: "col-lg-1 d-none d-lg-block" }, [
                          createVNode("div", { class: "d-flex w-100 h-100" }, [
                            createVNode("span", { class: "text-secondary my-auto" }, toDisplayString("Detail"))
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("i", { class: "bi bi-person text-primary fs-5 my-auto me-2" }),
                            createVNode("div", null, [
                              createVNode("span", {
                                class: "text-secondary d-block",
                                style: { "font-size": "0.8rem" }
                              }, toDisplayString("Manager")),
                              createVNode("div", { class: "scroll-x-hidden" }, [
                                createVNode("span", { class: "text-dark text-nowrap" }, toDisplayString(__props.department.manager.name), 1)
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("i", { class: "bi bi-people text-primary fs-5 my-auto me-2" }),
                            createVNode("div", null, [
                              createVNode("span", {
                                class: "text-secondary d-block",
                                style: { "font-size": "0.8rem" }
                              }, toDisplayString("Staff")),
                              createVNode("div", { class: "scroll-x-hidden" }, [
                                createVNode("span", { class: "text-dark text-nowrap" }, toDisplayString(__props.department.staff.length + (__props.department.staff.length > 1 ? " persons" : " person")), 1)
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("i", { class: "bi bi-grid text-primary fs-5 my-auto me-2" }),
                            createVNode("div", null, [
                              createVNode("span", {
                                class: "text-secondary d-block",
                                style: { "font-size": "0.8rem" }
                              }, toDisplayString("Program")),
                              createVNode("div", { class: "scroll-x-hidden" }, [
                                createVNode("span", { class: "text-dark text-nowrap" }, toDisplayString(__props.department.program.length + (__props.department.program.length > 1 ? " programs" : " program")), 1)
                              ])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "d-flex mt-2 d-lg-none" }, [
                        createVNode("span", { class: "text-secondary" }, toDisplayString("Cashflow"))
                      ]),
                      createVNode("div", { class: "row g-2 mt-lg-2 mt-0" }, [
                        createVNode("div", { class: "col-lg-1 d-none d-lg-block" }, [
                          createVNode("div", { class: "d-flex w-100 h-100" }, [
                            createVNode("span", { class: "text-secondary my-auto" }, toDisplayString("Cashflow"))
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("i", { class: "bi bi-list-columns-reverse text-primary fs-5 my-auto me-2" }),
                            createVNode("div", null, [
                              createVNode("span", {
                                class: "text-secondary d-block",
                                style: { "font-size": "0.8rem" }
                              }, toDisplayString("Budget")),
                              createVNode("div", { class: "scroll-x-hidden" }, [
                                createVNode("span", { class: "text-dark text-nowrap" }, toDisplayString(unref(formatIDR)(__props.department.budget)), 1)
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("i", { class: "bi bi-box-arrow-in-down text-primary fs-5 my-auto me-2" }),
                            createVNode("div", null, [
                              createVNode("span", {
                                class: "text-secondary d-block",
                                style: { "font-size": "0.8rem" }
                              }, toDisplayString("Disbursement")),
                              createVNode("div", { class: "scroll-x-hidden" }, [
                                createVNode("span", { class: "text-dark text-nowrap" }, toDisplayString(unref(formatIDR)(
                                  __props.department.disbursement
                                )), 1)
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("i", { class: "bi bi-box-arrow-up text-primary fs-5 my-auto me-2" }),
                            createVNode("div", null, [
                              createVNode("span", {
                                class: "text-secondary d-block",
                                style: { "font-size": "0.8rem" }
                              }, toDisplayString("Expense")),
                              createVNode("div", { class: "scroll-x-hidden" }, [
                                createVNode("span", { class: "text-dark text-nowrap" }, toDisplayString(unref(formatIDR)(
                                  __props.department.expense
                                )), 1)
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "row g-4 mt-0" }, [
                  createVNode("div", { class: "col-12 col-lg-6" }, [
                    createVNode("div", { class: "card sm p-3" }, [
                      createVNode("div", { class: "row" }, [
                        createVNode("div", { class: "col-12" }, [
                          createVNode("div", { class: "d-flex border-primary border-bottom pb-2" }, [
                            createVNode("span", { class: "text-primary-emphasis me-auto my-auto h6" }, [
                              createVNode("i", { class: "bi bi-people me-1" }),
                              createTextVNode(" " + toDisplayString("Staff List"))
                            ]),
                            unref(auth_user).id == __props.department.manager_id ? (openBlock(), createBlock("button", {
                              key: 0,
                              onClick: ($event) => showAddStaffModal(),
                              class: "btn btn-sm btn-outline-primary border-0 ms-auto py-0"
                            }, [
                              createVNode("i", { class: "bi bi-plus-lg d-lg-none" }),
                              createVNode("span", { class: "d-lg-block d-none" }, toDisplayString("New Staff"))
                            ], 8, ["onClick"])) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "scroll-container-2 scroll-container-lg-2" }, [
                        createVNode("li", { class: "list-group list-group-flush" }, [
                          __props.department.staff.length == 0 ? (openBlock(), createBlock("ul", {
                            key: 0,
                            class: "list-group-item list-group-item-action"
                          }, [
                            createVNode("span", { class: "fst-italic text-secondary" }, toDisplayString("No staff found."))
                          ])) : createCommentVNode("", true),
                          __props.department.staff.length > 0 ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.department.staff, (staff, index) => {
                            return openBlock(), createBlock("ul", {
                              onClick: ($event) => navigateToStaff(
                                "staff_" + (staff.id * 7 - 3)
                              ),
                              class: "list-group-item list-group-item-action mb-0 py-2 px-0"
                            }, [
                              createVNode("a", {
                                id: "staff_" + (staff.id * 7 - 3),
                                href: _ctx.route("profile.edit", staff.id)
                              }, null, 8, ["id", "href"]),
                              createVNode("div", { class: "d-flex" }, [
                                createVNode("span", { class: "text-secondary border-end border-2 pe-2 me-2" }, toDisplayString(index + 1), 1),
                                createVNode("span", { class: "text-dark d-flex" }, [
                                  createTextVNode(toDisplayString(staff.name) + " ", 1),
                                  createVNode("i", {
                                    class: "bi bi-box-arrow-up-right ms-2 my-auto",
                                    style: { "font-size": "0.8rem" }
                                  })
                                ]),
                                createVNode("button", {
                                  class: "btn btn-sm btn-outline-secondary border-0 ms-auto py-0",
                                  onClick: withModifiers(($event) => confirmation(
                                    _ctx.route(
                                      "department.staff.remove",
                                      staff.id
                                    ),
                                    "Are you sure want to remove " + staff.name + " from Department " + __props.department.name + " staff?"
                                  ), ["stop"])
                                }, [
                                  createVNode("i", { class: "bi bi-trash3" })
                                ], 8, ["onClick"])
                              ])
                            ], 8, ["onClick"]);
                          }), 256)) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "col-12 col-lg-6" }, [
                    createVNode("div", { class: "card sm p-3" }, [
                      createVNode("div", { class: "row" }, [
                        createVNode("div", { class: "col-12" }, [
                          createVNode("div", { class: "d-flex border-primary border-bottom pb-2" }, [
                            createVNode("span", { class: "text-primary-emphasis me-auto my-auto h6" }, [
                              createVNode("i", { class: "bi bi-grid me-1" }),
                              createTextVNode(" " + toDisplayString("Program List"))
                            ]),
                            unref(auth_user).id == __props.department.manager_id ? (openBlock(), createBlock("button", {
                              key: 0,
                              onClick: ($event) => showNewProgramModal(),
                              class: "btn btn-sm btn-outline-primary border-0 ms-auto py-0"
                            }, [
                              createVNode("i", { class: "bi bi-plus-lg d-lg-none" }),
                              createVNode("span", { class: "d-lg-block d-none" }, toDisplayString("New Program"))
                            ], 8, ["onClick"])) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "scroll-container-2 scroll-container-lg-2" }, [
                        createVNode("li", { class: "list-group list-group-flush" }, [
                          __props.department.program.length == 0 ? (openBlock(), createBlock("ul", {
                            key: 0,
                            class: "list-group-item list-group-item-action"
                          }, [
                            createVNode("span", { class: "fst-italic text-secondary" }, toDisplayString("No program found."))
                          ])) : createCommentVNode("", true),
                          __props.department.program.length > 0 ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.department.program, (program, index) => {
                            return openBlock(), createBlock("ul", {
                              onClick: ($event) => navigateToStaff(
                                "program_" + (program.id * 7 - 3)
                              ),
                              class: "list-group-item list-group-item-action mb-0 py-2 px-0"
                            }, [
                              createVNode("a", {
                                id: "program_" + (program.id * 7 - 3),
                                href: _ctx.route("program", program.id)
                              }, null, 8, ["id", "href"]),
                              createVNode("div", { class: "d-flex" }, [
                                createVNode("span", { class: "text-secondary border-end border-2 pe-2 me-2" }, toDisplayString(index + 1), 1),
                                createVNode("span", { class: "text-dark d-flex" }, [
                                  createTextVNode(toDisplayString(program.name) + " ", 1),
                                  createVNode("i", {
                                    class: "bi bi-box-arrow-up-right ms-2 my-auto",
                                    style: { "font-size": "0.8rem" }
                                  })
                                ]),
                                createVNode("button", {
                                  class: "btn btn-sm btn-outline-secondary border-0 ms-auto py-0",
                                  onClick: withModifiers(($event) => confirmation(
                                    _ctx.route(
                                      "program.delete",
                                      program.id
                                    ),
                                    "Are you sure want to remove " + program.name + " from Department " + __props.department.name + " program?"
                                  ), ["stop"])
                                }, [
                                  createVNode("i", { class: "bi bi-trash3" })
                                ], 8, ["onClick"])
                              ])
                            ], 8, ["onClick"]);
                          }), 256)) : createCommentVNode("", true)
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
      if (unref(auth_user).id == __props.department.manager_id) {
        _push(`<div class="modal fade" id="addStaffModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis" id="exampleModalLabel"><i class="bi bi-person-plus border-secondary border-end me-2 pe-2"></i> ${ssrInterpolate("New Staff")}</span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button></div><form><div class="modal-body bg-light"><div class="row mt-2 justify-content-center"><div class="col-4 col-lg-3"><label for="add_staff" class="form-label d-inline-block">${ssrInterpolate("Staff")}</label></div><div class="col-8 col-lg-7">`);
        if (__props.staff_list.length > 0) {
          _push(ssrRenderComponent(unref(vSelect), {
            class: "bg-white text-nowrap",
            options: __props.staff_list,
            label: "name",
            reduce: (staff) => staff.id,
            modelValue: unref(form_add_staff).staff_id,
            "onUpdate:modelValue": ($event) => unref(form_add_staff).staff_id = $event,
            placeholder: "Select staff"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (__props.staff_list.length == 0) {
          _push(`<span class="fst-italic fw-light">${ssrInterpolate("All staf already belongs to department.")}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_sfc_main$3, {
          messages: unref(form_add_staff).errors.staff_id,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-primary">${ssrInterpolate("Add")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(auth_user).id == __props.department.manager_id) {
        _push(`<div class="modal fade" id="newProgramModal" tabindex="-1" aria-labelledby="newProgramModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-app-indicator pe-2"></i> ${ssrInterpolate("New Program")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><form><div class="modal-body bg-light"><div class="row justify-content-center"><div class="col-4 col-lg-3"><label for="department_name" class="form-label d-inline-block">${ssrInterpolate("Name")}</label></div><div class="col-8 col-lg-7"><div class="input-group input-group-sm bg-secondary bg-opacity-10 border-dark"><label class="form-label text-secondary my-auto px-2" for="department_name">${ssrInterpolate("Program")}</label><input type="text" class="form-control form-control-sm" id="department_name"${ssrRenderAttr("value", unref(form_new_program).name)} placeholder="Finance"></div>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_new_program).errors.name,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row justify-content-center mt-2"><div class="col-4 col-lg-3"><label for="stand_pic" class="form-label d-inline-block">${ssrInterpolate("PIC")}</label></div><div class="col-8 col-lg-7">`);
        _push(ssrRenderComponent(unref(vSelect), {
          class: "bg-white text-nowrap",
          options: __props.staff_list_2,
          label: "name",
          reduce: (staff) => staff.id,
          modelValue: unref(form_new_program).pic_id,
          "onUpdate:modelValue": ($event) => unref(form_new_program).pic_id = $event,
          placeholder: "Select staff"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$3, {
          message: unref(form_new_program).errors.pic_id,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-primary">${ssrInterpolate("Create")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/Department.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
