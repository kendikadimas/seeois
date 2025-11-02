import { ref, onMounted, onUnmounted, watch, withCtx, unref, createVNode, toDisplayString, Transition, createBlock, createCommentVNode, openBlock, createTextVNode, withDirectives, vModelText, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./StaffLayout-Dx7OTDGc.js";
import { _ as _sfc_main$3 } from "./InputError-DugfSnOg.js";
import { _ as _sfc_main$4 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$2 } from "./ModalConfirmation-CQDhtLdH.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import vSelect from "vue-select";
/* empty css                    */
/* empty css             */
import "vue-toastification";
const _sfc_main = {
  __name: "Employee",
  __ssrInlineRender: true,
  props: {
    unemployees: Array,
    employees: Array,
    filter: Object,
    roles: Array,
    level_list: Array,
    departments: Array,
    notif: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const title = ref("User Manager");
    const modalConfirmationRef = ref(null);
    const toastNotifRef = ref(null);
    const active_tab = ref(1);
    const selected_employee = ref({
      id: null,
      name: "Username",
      email: "user@mail.com",
      phone: "08xxxxxxxx",
      department: {
        name: " - "
      },
      level: " - ",
      roles_id: 0
    });
    const default_selected_employee = {
      id: null,
      name: "User name",
      email: "user@mail.com",
      phone: "08xxxxxxxx",
      department: {
        name: " - "
      },
      level: " - ",
      roles_id: 0
    };
    const form_update_employee = useForm({
      user_id: null,
      roles_id: null
    });
    const form_employee_filter = useForm({
      keyword: props.filter.staff.keyword,
      category: props.filter.staff.category,
      order: props.filter.staff.order
    });
    const selected_customer = ref({
      id: null,
      name: "Username",
      email: "user@mail.com",
      phone: "08xxxxxxxx",
      roles_id: null
    });
    const default_selected_customer = {
      id: null,
      name: "Username",
      email: "user@mail.com",
      phone: "08xxxxxxxx",
      roles_id: null
    };
    const form_customer_filter = useForm({
      keyword: props.filter.customer.keyword,
      category: props.filter.customer.category,
      order: props.filter.customer.order
    });
    function setActiveTab(number) {
      active_tab.value = number;
    }
    function setSelectedEmployee(employee) {
      selected_employee.value = employee;
    }
    function handleUpdateEmployee() {
      event.preventDefault();
      form_update_employee.user_id = selected_employee.value.id;
      console.log(form_update_employee);
      form_update_employee.post(route("role.update"), {
        onSuccess: () => {
          form_update_employee.reset();
        },
        onError: (error) => console.error("update employee failed:", error)
      });
    }
    function handleEmployeeFilter(category = null) {
      if (category) {
        form_employee_filter.order = form_employee_filter.category == category ? form_employee_filter.order == "asc" ? "desc" : "asc" : "desc";
        form_employee_filter.category = category;
        form_employee_filter.keyword = null;
      }
      form_employee_filter.post(route("role.filter"));
    }
    function handleCustomerFilter(category = null) {
      if (category) {
        form_customer_filter.order = form_customer_filter.category == category ? form_customer_filter.order == "asc" ? "desc" : "asc" : "desc";
        form_customer_filter.category = category;
        form_customer_filter.keyword = null;
      }
      form_customer_filter.post(route("unemployee.filter"));
    }
    function confirmation(route2, message) {
      if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route2, message);
      } else {
        console.error("modalConfirmationRef is null");
      }
    }
    const isLargeScreen = ref(window.innerWidth >= 768);
    const handleResize = () => {
      isLargeScreen.value = window.innerWidth >= 768;
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    watch(
      () => props.notif,
      (newValue) => {
        const notification = newValue;
        toastNotifRef.value.showToast(notification.type, notification.message);
        if (notification.type !== "warning" && notification.type !== "danger") {
          selected_employee.value = default_selected_employee;
          selected_customer.value = default_selected_customer;
        }
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
          var _a, _b, _c, _d, _e;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: title.value,
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="container me-lg-0 mx-auto mb-5"${_scopeId}><div class="row gx-4 mt-4 px-lg-0 px-2"${_scopeId}><div class="col-lg-5"${_scopeId}><div class="row mb-4"${_scopeId}><div class="col-12"${_scopeId}><div class="card shadow-sm border-light border-4"${_scopeId}><div class="d-flex"${_scopeId}><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary border-0 w-50 text-center me-1 " + (active_tab.value == 1 ? "active " : "")
            )}"${_scopeId}>${ssrInterpolate("Staff")}</button><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary border-0 w-50 text-center " + (active_tab.value == 2 ? "active " : "")
            )}"${_scopeId}>${ssrInterpolate("Customer")}</button></div></div></div></div>`);
            if (active_tab.value == 1) {
              _push2(`<div class="row mb-4"${_scopeId}><div class="col-12"${_scopeId}><div class="card border-0 shadow-sm p-3"${_scopeId}><div class="row"${_scopeId}><div class="col-12"${_scopeId}><div class="card border-0 border-bottom border-primary rounded-0 rounded-top d-flex"${_scopeId}><div class="d-flex mb-1"${_scopeId}><div class="scroll-x-hidden mx-auto"${_scopeId}><span class="h5 text-primary-emphasis text-nowrap"${_scopeId}><i class="bi bi-person-vcard me-2"${_scopeId}></i><span${_scopeId}>${ssrInterpolate("Staff Contact")}</span></span></div></div></div></div></div><div class="row g-2 mt-2"${_scopeId}><div class="col-12 col-lg-6"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Name")}</span><a${ssrRenderAttr(
                "href",
                selected_employee.value.id > 0 ? _ctx.route(
                  "profile.edit",
                  selected_employee.value.id
                ) : ""
              )} class="text-dark scroll-x-hidden d-block text-decoration-none"${_scopeId}><span class="text-nowrap"${_scopeId}>${ssrInterpolate(selected_employee.value.name)}</span>`);
              if (selected_employee.value.id > 0) {
                _push2(`<i style="${ssrRenderStyle({ "font-size": "0.8rem" })}" class="bi bi-box-arrow-up-right ms-2 my-auto"${_scopeId}></i>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</a></div><div class="col-12 col-lg-6"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Email")}</span><span class="text-dark scroll-x-hidden d-block"${_scopeId}><span class="text-nowrap"${_scopeId}>${ssrInterpolate(selected_employee.value.email)}</span></span></div><div class="col-12 col-lg-6"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Phone")}</span><span class="text-dark"${_scopeId}>${ssrInterpolate(selected_employee.value.phone)}</span></div><div class="col-12 col-lg-6"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Role")}</span>`);
              if (!(((_a = selected_employee.value) == null ? void 0 : _a.id) > 0)) {
                _push2(`<span class="d-block"${_scopeId}>${ssrInterpolate(" - ")}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).roles_id !== 1 && ((_b = selected_employee.value) == null ? void 0 : _b.id) > 0) {
                _push2(`<span class="d-block"${_scopeId}>${ssrInterpolate(selected_employee.value.roles.name)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).roles_id == 1 && ((_c = selected_employee.value) == null ? void 0 : _c.id) > 0) {
                _push2(`<div class="d-flex"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(vSelect), {
                  class: "bg-white text-nowrap w-100",
                  options: __props.roles,
                  label: "name",
                  reduce: (role) => role.id,
                  modelValue: unref(form_update_employee).roles_id,
                  "onUpdate:modelValue": ($event) => unref(form_update_employee).roles_id = $event,
                  placeholder: "Select role"
                }, null, _parent2, _scopeId));
                _push2(`<button class="btn btn-outline-primary border-0 py-0"${_scopeId}><i class="bi bi-check-lg"${_scopeId}></i></button></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).roles_id == 1 && ((_d = selected_employee.value) == null ? void 0 : _d.id) > 0) {
                _push2(ssrRenderComponent(_sfc_main$3, {
                  message: unref(form_update_employee).errors.roles_id,
                  class: "mt-2"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
              if (unref(auth_user).roles_id == 1 && selected_employee.value.id > 0) {
                _push2(`<div class="d-flex mt-2"${_scopeId}><button class="btn btn-sm btn-secondary w-100 text-decoration-none"${_scopeId}>${ssrInterpolate("Remove")}</button></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value == 2) {
              _push2(`<div class="row mb-4"${_scopeId}><div class="col-12"${_scopeId}><div class="card border-0 shadow-sm p-3"${_scopeId}><div class="row"${_scopeId}><div class="col-12"${_scopeId}><div class="card border-0 border-bottom border-primary rounded-0 rounded-top d-flex"${_scopeId}><span class="h5 text-primary-emphasis fw-bold mx-auto"${_scopeId}><i class="bi bi-person-vcard me-2"${_scopeId}></i><span${_scopeId}>${ssrInterpolate("Customer Contact")}</span></span></div></div></div><div class="row g-2 mt-2"${_scopeId}><div class="col-12 col-lg-6"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Name")}</span><span class="text-dark scroll-x-hidden d-block text-decoration-none"${_scopeId}><span class="text-nowrap"${_scopeId}>${ssrInterpolate(selected_customer.value.name)}</span></span></div><div class="col-12 col-lg-6"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Email")}</span><span class="text-dark scroll-x-hidden d-block"${_scopeId}><span class="text-nowrap"${_scopeId}>${ssrInterpolate(selected_customer.value.email)}</span></span></div><div class="col-12 col-lg-6"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Phone")}</span><span class="text-dark"${_scopeId}>${ssrInterpolate(selected_customer.value.phone)}</span></div></div>`);
              if (unref(auth_user).roles_id == 1 && ((_e = selected_customer.value) == null ? void 0 : _e.id) > 0) {
                _push2(`<button class="btn btn-sm btn-primary w-100 text-decoration-none mt-2"${_scopeId}>${ssrInterpolate("Recruit")}</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-lg-7"${_scopeId}>`);
            if (active_tab.value == 1) {
              _push2(`<div class="row mb-3"${_scopeId}><div class="col-12"${_scopeId}><div class="card shadow-sm p-3"${_scopeId}><div class="row"${_scopeId}><div class="col-12"${_scopeId}><div class="d-flex border-primary border-bottom pb-2"${_scopeId}><span class="text-primary-emphasis me-auto my-auto h6"${_scopeId}><i class="bi bi-people me-1"${_scopeId}></i> ${ssrInterpolate("Staff List")}</span></div></div></div><div class="d-flex mt-2"${_scopeId}><span class="text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto"${_scopeId}>${ssrInterpolate("Filter")}</span><button class="btn text-nowrap btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"${_scopeId}>${ssrInterpolate("Name")} <i class="${ssrRenderClass(
                "bi bi-arrow-" + (__props.filter.staff.category == "name" ? __props.filter.staff.order == "asc" ? "up" : "down" : "up")
              )}"${_scopeId}></i></button><button class="btn text-nowrap btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0 ms-2"${_scopeId}>${ssrInterpolate("Role")} <i class="${ssrRenderClass(
                "bi bi-arrow-" + (__props.filter.staff.category == "roles_id" ? __props.filter.staff.order == "asc" ? "up" : "down" : "up")
              )}"${_scopeId}></i></button><div class="input-group ms-2"${_scopeId}><input type="text" class="form-control form-control-sm py-0" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1"${ssrRenderAttr(
                "value",
                unref(form_employee_filter).keyword
              )}${_scopeId}><span class="input-group-text py-0" id="basic-addon1"${_scopeId}><i class="bi bi-search" style="${ssrRenderStyle("font-size: 0.9rem")}"${_scopeId}></i></span></div></div><div class="scroll-container-3 scroll-container-lg-3 mt-2"${_scopeId}><li class="list-group list-group-flush"${_scopeId}>`);
              if (__props.employees.length == 0) {
                _push2(`<ul class="list-group-item"${_scopeId}><div class="col"${_scopeId}><span class="ms-3 text-secondary"${_scopeId}>${ssrInterpolate("No employee found.")}</span></div></ul>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.employees.length > 0) {
                _push2(`<!--[-->`);
                ssrRenderList(__props.employees, (employee) => {
                  _push2(`<ul class="${ssrRenderClass(
                    "list-group-item list-group-item-action mb-0 py-2 px-0 " + (employee.id == selected_employee.value.id ? "bg-light" : "")
                  )}"${_scopeId}><span class="d-flex"${_scopeId}><span class="me-2 border-end border-secondary-subtle border-2 text-secondary fw-normal pe-2"${_scopeId}>${ssrInterpolate(__props.employees.indexOf(
                    employee
                  ) + 1)}</span><span class="${ssrRenderClass(
                    "scroll-x-hidden me-2 " + (employee.id == selected_employee.value.id ? "text-primary" : "text-dark")
                  )}"${_scopeId}><span class="text-nowrap"${_scopeId}>${ssrInterpolate(employee.name)}</span></span><span class="ms-auto text-secondary scroll-x-hidden"${_scopeId}><span class="text-nowrap"${_scopeId}>${ssrInterpolate(employee.roles_id ? employee.roles.name : "")}</span></span></span></ul>`);
                });
                _push2(`<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</li></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value == 2) {
              _push2(`<div class="row mb-3"${_scopeId}><div class="col-12"${_scopeId}><div class="card shadow-sm p-3"${_scopeId}><div class="row"${_scopeId}><div class="col-12"${_scopeId}><div class="d-flex border-primary border-bottom pb-2"${_scopeId}><span class="text-primary-emphasis me-auto my-auto h6"${_scopeId}><i class="bi bi-people me-1"${_scopeId}></i><span class="d-none d-lg-inline"${_scopeId}>${ssrInterpolate("Employee ")}</span> ${ssrInterpolate("List")}</span></div></div></div><div class="d-flex mt-2"${_scopeId}><span class="text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto"${_scopeId}>${ssrInterpolate("Filter")}</span><button class="btn text-nowrap btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"${_scopeId}>${ssrInterpolate("Name")} <i class="${ssrRenderClass(
                "bi bi-arrow-" + (__props.filter.customer.category == "name" ? __props.filter.customer.order == "asc" ? "up" : "down" : "up")
              )}"${_scopeId}></i></button><div class="input-group ms-2"${_scopeId}><input type="text" class="form-control form-control-sm py-0" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1"${ssrRenderAttr(
                "value",
                unref(form_customer_filter).keyword
              )}${_scopeId}><span class="input-group-text py-0" id="basic-addon1"${_scopeId}><i class="bi bi-search" style="${ssrRenderStyle("font-size: 0.9rem")}"${_scopeId}></i></span></div></div><div class="scroll-container-3 scroll-container-lg-3 mt-2"${_scopeId}><li class="list-group list-group-flush"${_scopeId}>`);
              if (__props.unemployees.length == 0) {
                _push2(`<ul class="list-group-item list-group-item-action"${_scopeId}><span class="text-secondary fst-italic"${_scopeId}>${ssrInterpolate("No employee found.")}</span></ul>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.unemployees.length > 0) {
                _push2(`<!--[-->`);
                ssrRenderList(__props.unemployees, (employee) => {
                  _push2(`<ul class="${ssrRenderClass(
                    "list-group-item list-group-item-action mb-0 " + (employee.id == selected_customer.value.id ? " bg-light" : "")
                  )}"${_scopeId}><span class="d-flex"${_scopeId}><span class="mx-2 border-end border-secondary-subtle border-2 text-secondary pe-2"${_scopeId}>${ssrInterpolate(__props.unemployees.indexOf(
                    employee
                  ) + 1)}</span><span class="${ssrRenderClass(
                    employee.id == selected_customer.value.id ? "text-primary" : "text-secondary"
                  )}"${_scopeId}>${ssrInterpolate(employee.name)}</span></span></ul>`);
                });
                _push2(`<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</li></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
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
                createVNode("div", { class: "row gx-4 mt-4 px-lg-0 px-2" }, [
                  createVNode("div", { class: "col-lg-5" }, [
                    createVNode("div", { class: "row mb-4" }, [
                      createVNode("div", { class: "col-12" }, [
                        createVNode("div", { class: "card shadow-sm border-light border-4" }, [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("button", {
                              class: "btn btn-sm btn-outline-primary border-0 w-50 text-center me-1 " + (active_tab.value == 1 ? "active " : ""),
                              onClick: ($event) => setActiveTab(0)
                            }, toDisplayString("Staff"), 10, ["onClick"]),
                            createVNode("button", {
                              class: "btn btn-sm btn-outline-primary border-0 w-50 text-center " + (active_tab.value == 2 ? "active " : ""),
                              onClick: ($event) => setActiveTab(0)
                            }, toDisplayString("Customer"), 10, ["onClick"])
                          ])
                        ])
                      ])
                    ]),
                    createVNode(Transition, {
                      name: isLargeScreen.value ? "fade" : "fade-slide-ltr",
                      onAfterLeave: ($event) => setActiveTab(2)
                    }, {
                      default: withCtx(() => {
                        var _a2, _b2, _c2, _d2;
                        return [
                          active_tab.value == 1 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "row mb-4"
                          }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("div", { class: "card border-0 shadow-sm p-3" }, [
                                createVNode("div", { class: "row" }, [
                                  createVNode("div", { class: "col-12" }, [
                                    createVNode("div", { class: "card border-0 border-bottom border-primary rounded-0 rounded-top d-flex" }, [
                                      createVNode("div", { class: "d-flex mb-1" }, [
                                        createVNode("div", { class: "scroll-x-hidden mx-auto" }, [
                                          createVNode("span", { class: "h5 text-primary-emphasis text-nowrap" }, [
                                            createVNode("i", { class: "bi bi-person-vcard me-2" }),
                                            createVNode("span", null, toDisplayString("Staff Contact"))
                                          ])
                                        ])
                                      ])
                                    ])
                                  ])
                                ]),
                                createVNode("div", { class: "row g-2 mt-2" }, [
                                  createVNode("div", { class: "col-12 col-lg-6" }, [
                                    createVNode("span", {
                                      class: "text-secondary d-block",
                                      style: { "font-size": "0.8rem" }
                                    }, toDisplayString("Name")),
                                    createVNode("a", {
                                      href: selected_employee.value.id > 0 ? _ctx.route(
                                        "profile.edit",
                                        selected_employee.value.id
                                      ) : "",
                                      class: "text-dark scroll-x-hidden d-block text-decoration-none"
                                    }, [
                                      createVNode("span", { class: "text-nowrap" }, toDisplayString(selected_employee.value.name), 1),
                                      selected_employee.value.id > 0 ? (openBlock(), createBlock("i", {
                                        key: 0,
                                        style: { "font-size": "0.8rem" },
                                        class: "bi bi-box-arrow-up-right ms-2 my-auto"
                                      })) : createCommentVNode("", true)
                                    ], 8, ["href"])
                                  ]),
                                  createVNode("div", { class: "col-12 col-lg-6" }, [
                                    createVNode("span", {
                                      class: "text-secondary d-block",
                                      style: { "font-size": "0.8rem" }
                                    }, toDisplayString("Email")),
                                    createVNode("span", { class: "text-dark scroll-x-hidden d-block" }, [
                                      createVNode("span", { class: "text-nowrap" }, toDisplayString(selected_employee.value.email), 1)
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-12 col-lg-6" }, [
                                    createVNode("span", {
                                      class: "text-secondary d-block",
                                      style: { "font-size": "0.8rem" }
                                    }, toDisplayString("Phone")),
                                    createVNode("span", { class: "text-dark" }, toDisplayString(selected_employee.value.phone), 1)
                                  ]),
                                  createVNode("div", { class: "col-12 col-lg-6" }, [
                                    createVNode("span", {
                                      class: "text-secondary d-block",
                                      style: { "font-size": "0.8rem" }
                                    }, toDisplayString("Role")),
                                    !(((_a2 = selected_employee.value) == null ? void 0 : _a2.id) > 0) ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "d-block"
                                    }, toDisplayString(" - "))) : createCommentVNode("", true),
                                    unref(auth_user).roles_id !== 1 && ((_b2 = selected_employee.value) == null ? void 0 : _b2.id) > 0 ? (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "d-block"
                                    }, toDisplayString(selected_employee.value.roles.name), 1)) : createCommentVNode("", true),
                                    unref(auth_user).roles_id == 1 && ((_c2 = selected_employee.value) == null ? void 0 : _c2.id) > 0 ? (openBlock(), createBlock("div", {
                                      key: 2,
                                      class: "d-flex"
                                    }, [
                                      createVNode(unref(vSelect), {
                                        class: "bg-white text-nowrap w-100",
                                        options: __props.roles,
                                        label: "name",
                                        reduce: (role) => role.id,
                                        modelValue: unref(form_update_employee).roles_id,
                                        "onUpdate:modelValue": ($event) => unref(form_update_employee).roles_id = $event,
                                        placeholder: "Select role"
                                      }, null, 8, ["options", "reduce", "modelValue", "onUpdate:modelValue"]),
                                      createVNode("button", {
                                        onClick: handleUpdateEmployee,
                                        class: "btn btn-outline-primary border-0 py-0"
                                      }, [
                                        createVNode("i", { class: "bi bi-check-lg" })
                                      ], 8, ["onClick"])
                                    ])) : createCommentVNode("", true),
                                    unref(auth_user).roles_id == 1 && ((_d2 = selected_employee.value) == null ? void 0 : _d2.id) > 0 ? (openBlock(), createBlock(_sfc_main$3, {
                                      key: 3,
                                      message: unref(form_update_employee).errors.roles_id,
                                      class: "mt-2"
                                    }, null, 8, ["message"])) : createCommentVNode("", true)
                                  ])
                                ]),
                                unref(auth_user).roles_id == 1 && selected_employee.value.id > 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "d-flex mt-2"
                                }, [
                                  createVNode("button", {
                                    onClick: ($event) => confirmation(
                                      _ctx.route(
                                        "role.remove",
                                        selected_employee.value.id
                                      ),
                                      "Are you sure want to remove " + selected_employee.value.name + " from SEEO Staff?"
                                    ),
                                    class: "btn btn-sm btn-secondary w-100 text-decoration-none"
                                  }, toDisplayString("Remove"), 8, ["onClick"])
                                ])) : createCommentVNode("", true)
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ];
                      }),
                      _: 1
                    }, 8, ["name", "onAfterLeave"]),
                    createVNode(Transition, {
                      name: isLargeScreen.value ? "fade" : "fade-slide-rtl",
                      onAfterLeave: ($event) => setActiveTab(1)
                    }, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          active_tab.value == 2 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "row mb-4"
                          }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("div", { class: "card border-0 shadow-sm p-3" }, [
                                createVNode("div", { class: "row" }, [
                                  createVNode("div", { class: "col-12" }, [
                                    createVNode("div", { class: "card border-0 border-bottom border-primary rounded-0 rounded-top d-flex" }, [
                                      createVNode("span", { class: "h5 text-primary-emphasis fw-bold mx-auto" }, [
                                        createVNode("i", { class: "bi bi-person-vcard me-2" }),
                                        createVNode("span", null, toDisplayString("Customer Contact"))
                                      ])
                                    ])
                                  ])
                                ]),
                                createVNode("div", { class: "row g-2 mt-2" }, [
                                  createVNode("div", { class: "col-12 col-lg-6" }, [
                                    createVNode("span", {
                                      class: "text-secondary d-block",
                                      style: { "font-size": "0.8rem" }
                                    }, toDisplayString("Name")),
                                    createVNode("span", { class: "text-dark scroll-x-hidden d-block text-decoration-none" }, [
                                      createVNode("span", { class: "text-nowrap" }, toDisplayString(selected_customer.value.name), 1)
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-12 col-lg-6" }, [
                                    createVNode("span", {
                                      class: "text-secondary d-block",
                                      style: { "font-size": "0.8rem" }
                                    }, toDisplayString("Email")),
                                    createVNode("span", { class: "text-dark scroll-x-hidden d-block" }, [
                                      createVNode("span", { class: "text-nowrap" }, toDisplayString(selected_customer.value.email), 1)
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-12 col-lg-6" }, [
                                    createVNode("span", {
                                      class: "text-secondary d-block",
                                      style: { "font-size": "0.8rem" }
                                    }, toDisplayString("Phone")),
                                    createVNode("span", { class: "text-dark" }, toDisplayString(selected_customer.value.phone), 1)
                                  ])
                                ]),
                                unref(auth_user).roles_id == 1 && ((_a2 = selected_customer.value) == null ? void 0 : _a2.id) > 0 ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => confirmation(
                                    _ctx.route(
                                      "employee.add",
                                      selected_customer.value.id
                                    ),
                                    "Are you sure want to recruit " + selected_customer.value.name + " to SEEO Staff?"
                                  ),
                                  class: "btn btn-sm btn-primary w-100 text-decoration-none mt-2"
                                }, toDisplayString("Recruit"), 8, ["onClick"])) : createCommentVNode("", true)
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ];
                      }),
                      _: 1
                    }, 8, ["name", "onAfterLeave"])
                  ]),
                  createVNode("div", { class: "col-lg-7" }, [
                    createVNode(Transition, {
                      name: isLargeScreen.value ? "fade" : "fade-slide-ltr",
                      onAfterLeave: ($event) => setActiveTab(2)
                    }, {
                      default: withCtx(() => [
                        active_tab.value == 1 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "row mb-3"
                        }, [
                          createVNode("div", { class: "col-12" }, [
                            createVNode("div", { class: "card shadow-sm p-3" }, [
                              createVNode("div", { class: "row" }, [
                                createVNode("div", { class: "col-12" }, [
                                  createVNode("div", { class: "d-flex border-primary border-bottom pb-2" }, [
                                    createVNode("span", { class: "text-primary-emphasis me-auto my-auto h6" }, [
                                      createVNode("i", { class: "bi bi-people me-1" }),
                                      createTextVNode(" " + toDisplayString("Staff List"))
                                    ])
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "d-flex mt-2" }, [
                                createVNode("span", { class: "text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto" }, toDisplayString("Filter")),
                                createVNode("button", {
                                  onClick: ($event) => handleEmployeeFilter("name"),
                                  class: "btn text-nowrap btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"
                                }, [
                                  createTextVNode(toDisplayString("Name") + " "),
                                  createVNode("i", {
                                    class: "bi bi-arrow-" + (__props.filter.staff.category == "name" ? __props.filter.staff.order == "asc" ? "up" : "down" : "up")
                                  }, null, 2)
                                ], 8, ["onClick"]),
                                createVNode("button", {
                                  onClick: ($event) => handleEmployeeFilter("roles_id"),
                                  class: "btn text-nowrap btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0 ms-2"
                                }, [
                                  createTextVNode(toDisplayString("Role") + " "),
                                  createVNode("i", {
                                    class: "bi bi-arrow-" + (__props.filter.staff.category == "roles_id" ? __props.filter.staff.order == "asc" ? "up" : "down" : "up")
                                  }, null, 2)
                                ], 8, ["onClick"]),
                                createVNode("div", { class: "input-group ms-2" }, [
                                  withDirectives(createVNode("input", {
                                    type: "text",
                                    class: "form-control form-control-sm py-0",
                                    placeholder: "Search",
                                    "aria-label": "Search",
                                    "aria-describedby": "basic-addon1",
                                    "onUpdate:modelValue": ($event) => unref(form_employee_filter).keyword = $event,
                                    onInput: ($event) => handleEmployeeFilter()
                                  }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                    [
                                      vModelText,
                                      unref(form_employee_filter).keyword
                                    ]
                                  ]),
                                  createVNode("span", {
                                    class: "input-group-text py-0",
                                    id: "basic-addon1"
                                  }, [
                                    createVNode("i", {
                                      class: "bi bi-search",
                                      style: "font-size: 0.9rem"
                                    })
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "scroll-container-3 scroll-container-lg-3 mt-2" }, [
                                createVNode("li", { class: "list-group list-group-flush" }, [
                                  __props.employees.length == 0 ? (openBlock(), createBlock("ul", {
                                    key: 0,
                                    class: "list-group-item"
                                  }, [
                                    createVNode("div", { class: "col" }, [
                                      createVNode("span", { class: "ms-3 text-secondary" }, toDisplayString("No employee found."))
                                    ])
                                  ])) : createCommentVNode("", true),
                                  __props.employees.length > 0 ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.employees, (employee) => {
                                    return openBlock(), createBlock("ul", {
                                      class: "list-group-item list-group-item-action mb-0 py-2 px-0 " + (employee.id == selected_employee.value.id ? "bg-light" : ""),
                                      key: __props.employees.id
                                    }, [
                                      createVNode("span", {
                                        class: "d-flex",
                                        onClick: ($event) => setSelectedEmployee(
                                          employee
                                        )
                                      }, [
                                        createVNode("span", { class: "me-2 border-end border-secondary-subtle border-2 text-secondary fw-normal pe-2" }, toDisplayString(__props.employees.indexOf(
                                          employee
                                        ) + 1), 1),
                                        createVNode("span", {
                                          class: "scroll-x-hidden me-2 " + (employee.id == selected_employee.value.id ? "text-primary" : "text-dark")
                                        }, [
                                          createVNode("span", { class: "text-nowrap" }, toDisplayString(employee.name), 1)
                                        ], 2),
                                        createVNode("span", { class: "ms-auto text-secondary scroll-x-hidden" }, [
                                          createVNode("span", { class: "text-nowrap" }, toDisplayString(employee.roles_id ? employee.roles.name : ""), 1)
                                        ])
                                      ], 8, ["onClick"])
                                    ], 2);
                                  }), 128)) : createCommentVNode("", true)
                                ])
                              ])
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["name", "onAfterLeave"]),
                    createVNode(Transition, {
                      name: isLargeScreen.value ? "fade" : "fade-slide-rtl",
                      onAfterLeave: ($event) => setActiveTab(1)
                    }, {
                      default: withCtx(() => [
                        active_tab.value == 2 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "row mb-3"
                        }, [
                          createVNode("div", { class: "col-12" }, [
                            createVNode("div", { class: "card shadow-sm p-3" }, [
                              createVNode("div", { class: "row" }, [
                                createVNode("div", { class: "col-12" }, [
                                  createVNode("div", { class: "d-flex border-primary border-bottom pb-2" }, [
                                    createVNode("span", { class: "text-primary-emphasis me-auto my-auto h6" }, [
                                      createVNode("i", { class: "bi bi-people me-1" }),
                                      createVNode("span", { class: "d-none d-lg-inline" }, toDisplayString("Employee ")),
                                      createTextVNode(" " + toDisplayString("List"))
                                    ])
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "d-flex mt-2" }, [
                                createVNode("span", { class: "text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto" }, toDisplayString("Filter")),
                                createVNode("button", {
                                  onClick: ($event) => handleCustomerFilter("name"),
                                  class: "btn text-nowrap btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"
                                }, [
                                  createTextVNode(toDisplayString("Name") + " "),
                                  createVNode("i", {
                                    class: "bi bi-arrow-" + (__props.filter.customer.category == "name" ? __props.filter.customer.order == "asc" ? "up" : "down" : "up")
                                  }, null, 2)
                                ], 8, ["onClick"]),
                                createVNode("div", { class: "input-group ms-2" }, [
                                  withDirectives(createVNode("input", {
                                    type: "text",
                                    class: "form-control form-control-sm py-0",
                                    placeholder: "Search",
                                    "aria-label": "Search",
                                    "aria-describedby": "basic-addon1",
                                    "onUpdate:modelValue": ($event) => unref(form_customer_filter).keyword = $event,
                                    onInput: ($event) => handleCustomerFilter()
                                  }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                    [
                                      vModelText,
                                      unref(form_customer_filter).keyword
                                    ]
                                  ]),
                                  createVNode("span", {
                                    class: "input-group-text py-0",
                                    id: "basic-addon1"
                                  }, [
                                    createVNode("i", {
                                      class: "bi bi-search",
                                      style: "font-size: 0.9rem"
                                    })
                                  ])
                                ])
                              ]),
                              createVNode("div", { class: "scroll-container-3 scroll-container-lg-3 mt-2" }, [
                                createVNode("li", { class: "list-group list-group-flush" }, [
                                  __props.unemployees.length == 0 ? (openBlock(), createBlock("ul", {
                                    key: 0,
                                    class: "list-group-item list-group-item-action"
                                  }, [
                                    createVNode("span", { class: "text-secondary fst-italic" }, toDisplayString("No employee found."))
                                  ])) : createCommentVNode("", true),
                                  __props.unemployees.length > 0 ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.unemployees, (employee) => {
                                    return openBlock(), createBlock("ul", {
                                      class: "list-group-item list-group-item-action mb-0 " + (employee.id == selected_customer.value.id ? " bg-light" : ""),
                                      onClick: () => {
                                        selected_customer.value = employee;
                                      }
                                    }, [
                                      createVNode("span", { class: "d-flex" }, [
                                        createVNode("span", { class: "mx-2 border-end border-secondary-subtle border-2 text-secondary pe-2" }, toDisplayString(__props.unemployees.indexOf(
                                          employee
                                        ) + 1), 1),
                                        createVNode("span", {
                                          class: employee.id == selected_customer.value.id ? "text-primary" : "text-secondary"
                                        }, toDisplayString(employee.name), 3)
                                      ])
                                    ], 10, ["onClick"]);
                                  }), 256)) : createCommentVNode("", true)
                                ])
                              ])
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["name", "onAfterLeave"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/Employee.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
