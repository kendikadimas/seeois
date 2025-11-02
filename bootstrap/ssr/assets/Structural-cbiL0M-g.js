import { ref, onMounted, onUnmounted, watch, withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, createTextVNode, withDirectives, vModelText, openBlock, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrRenderList } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-4HC-0vm9.js";
import { _ as _sfc_main$2 } from "./InputError-DkffFxkw.js";
import { _ as _sfc_main$3 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CQDhtLdH.js";
import vSelect from "vue-select";
/* empty css                    */
import { usePage, useForm, Head } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
const _sfc_main = {
  __name: "Structural",
  __ssrInlineRender: true,
  props: {
    staff_list: Array,
    department_list: Array,
    filter: Object,
    notif: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const title = ref("Structural");
    const modalConfirmationRef = ref(null);
    const toastNotifRef = ref(null);
    ref("placeholder");
    const modalNewDepartment = ref(null);
    const modalUpdateDepartmentRef = ref(null);
    const modalDeleteDepartmentRef = ref(null);
    const active_department = ref(null);
    const form_filter = useForm({
      category: props.filter.category,
      order: props.filter.order,
      keyword: props.filter.keyword
    });
    const form_new_department = useForm({
      name: null,
      manager_id: null
    });
    const form_update_department = useForm({
      name: null,
      manager_id: null
    });
    const form_delete_department = useForm({
      password: null
    });
    function handleSubmitFilter(category) {
      if (category) {
        form_filter.order = form_filter.category == category ? form_filter.order == "asc" ? "desc" : "asc" : "desc";
        form_filter.category = category;
        form_filter.keyword = null;
      }
      form_filter.post(route("structural.filter"));
    }
    function showNewDepartmentModal(is_show) {
      if (modalNewDepartment.value == null) {
        const modal = document.getElementById("newDepartmentModal");
        modalNewDepartment.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalNewDepartment.value.show();
      }
    }
    function showUpdateDepartmentModal(is_show) {
      if (modalUpdateDepartmentRef.value == null) {
        const modal = document.getElementById("updateDepartmentModal");
        modalUpdateDepartmentRef.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalUpdateDepartmentRef.value.show();
      }
    }
    function showDeleteDepartmentModal(is_show) {
      if (modalDeleteDepartmentRef.value == null) {
        const modal = document.getElementById("deleteDepartmentModal");
        modalDeleteDepartmentRef.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalDeleteDepartmentRef.value.show();
      }
    }
    function navigateToDepartment(id) {
      document.getElementById("department_" + id).click();
    }
    const isLargeScreen = ref(window.innerWidth >= 768);
    const handleResize = () => {
      isLargeScreen.value = window.innerWidth >= 768;
      window.addEventListener("resize", handleResize);
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      if (props.notif) {
        toastNotifRef.value.showToast(props.notif.type, props.notif.message);
      }
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    watch(
      () => props.notif,
      (newValue) => {
        const notification = newValue;
        toastNotifRef.value.showToast(notification.type, notification.message);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(StaffLayout, null, {
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
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="container me-lg-0 mx-auto mb-5"${_scopeId}><div class="row mt-4"${_scopeId}><div class="col-12"${_scopeId}><div class="card shadow-sm p-lg-3 p-2"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto"${_scopeId}>${ssrInterpolate("Filter")}</span><button class="btn text-nowrap btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"${_scopeId}>${ssrInterpolate("Name")} <i class="${ssrRenderClass(
              "bi bi-arrow-" + (__props.filter.category == "name" ? __props.filter.order == "asc" ? "up" : "down" : "up")
            )}"${_scopeId}></i></button><div class="input-group ms-2"${_scopeId}><input type="text" class="form-control form-control-sm py-0" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1"${ssrRenderAttr("value", unref(form_filter).keyword)}${_scopeId}><span class="input-group-text py-0" id="basic-addon1"${_scopeId}><i class="bi bi-search" style="${ssrRenderStyle("font-size: 0.9rem")}"${_scopeId}></i></span></div>`);
            if (unref(auth_user).roles_id == 1) {
              _push2(`<button class="ms-2 btn btn-sm btn-outline-primary border-0 py-0 text-nowrap"${_scopeId}><i class="bi bi-plus-lg d-lg-none"${_scopeId}></i><span class="d-none d-lg-block"${_scopeId}>${ssrInterpolate("New Department")}</span></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="row gx-4 mt-4 mt-lg-5"${_scopeId}><!--[-->`);
            ssrRenderList(__props.department_list, (item) => {
              _push2(`<div class="col-lg-4 col-12"${_scopeId}><a${ssrRenderAttr("id", "department_" + (item.id * 7 - 4))}${ssrRenderAttr("href", _ctx.route("department", item.id))} class="text-decoration-none"${_scopeId}></a><div class="card card-bg-hover p-3 mb-3 mb-lg-4"${_scopeId}><div class="d-flex"${_scopeId}><div class="" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}><span class="text-secondary d-block"${_scopeId}>${ssrInterpolate(item.manager.name)}</span><span class="h5 text-primary-emphasis d-block"${_scopeId}>${ssrInterpolate("Department " + item.name)}</span></div><div class="ms-auto mb-auto d-flex"${_scopeId}>`);
              if (unref(auth_user).roles_id == 1) {
                _push2(`<button class="border-0 btn btn-sm btn-outline-secondary"${_scopeId}><i class="bi bi-pencil"${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="border-start border-secondary border-2 mx-1 my-1"${_scopeId}></div>`);
              if (unref(auth_user).roles_id == 1) {
                _push2(`<button class="border-0 btn btn-sm btn-outline-secondary"${_scopeId}><i class="bi bi-trash3"${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></div>`);
            });
            _push2(`<!--]--></div></div>`);
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
              createVNode("div", { class: "container me-lg-0 mx-auto mb-5" }, [
                createVNode("div", { class: "row mt-4" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card shadow-sm p-lg-3 p-2" }, [
                      createVNode("div", { class: "d-flex" }, [
                        createVNode("span", { class: "text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto" }, toDisplayString("Filter")),
                        createVNode("button", {
                          onClick: ($event) => handleSubmitFilter("name"),
                          class: "btn text-nowrap btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"
                        }, [
                          createTextVNode(toDisplayString("Name") + " "),
                          createVNode("i", {
                            class: "bi bi-arrow-" + (__props.filter.category == "name" ? __props.filter.order == "asc" ? "up" : "down" : "up")
                          }, null, 2)
                        ], 8, ["onClick"]),
                        createVNode("div", { class: "input-group ms-2" }, [
                          withDirectives(createVNode("input", {
                            type: "text",
                            class: "form-control form-control-sm py-0",
                            placeholder: "Search",
                            "aria-label": "Search",
                            "aria-describedby": "basic-addon1",
                            "onUpdate:modelValue": ($event) => unref(form_filter).keyword = $event,
                            onInput: ($event) => handleSubmitFilter()
                          }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                            [vModelText, unref(form_filter).keyword]
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
                        ]),
                        unref(auth_user).roles_id == 1 ? (openBlock(), createBlock("button", {
                          key: 0,
                          class: "ms-2 btn btn-sm btn-outline-primary border-0 py-0 text-nowrap",
                          onClick: ($event) => showNewDepartmentModal()
                        }, [
                          createVNode("i", { class: "bi bi-plus-lg d-lg-none" }),
                          createVNode("span", { class: "d-none d-lg-block" }, toDisplayString("New Department"))
                        ], 8, ["onClick"])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "row gx-4 mt-4 mt-lg-5" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.department_list, (item) => {
                    return openBlock(), createBlock("div", { class: "col-lg-4 col-12" }, [
                      createVNode("a", {
                        id: "department_" + (item.id * 7 - 4),
                        href: _ctx.route("department", item.id),
                        class: "text-decoration-none"
                      }, null, 8, ["id", "href"]),
                      createVNode("div", {
                        class: "card card-bg-hover p-3 mb-3 mb-lg-4",
                        onClick: ($event) => navigateToDepartment(item.id * 7 - 4)
                      }, [
                        createVNode("div", { class: "d-flex" }, [
                          createVNode("div", {
                            class: "",
                            style: { "font-size": "0.8rem" }
                          }, [
                            createVNode("span", { class: "text-secondary d-block" }, toDisplayString(item.manager.name), 1),
                            createVNode("span", { class: "h5 text-primary-emphasis d-block" }, toDisplayString("Department " + item.name), 1)
                          ]),
                          createVNode("div", { class: "ms-auto mb-auto d-flex" }, [
                            unref(auth_user).roles_id == 1 ? (openBlock(), createBlock("button", {
                              key: 0,
                              class: "border-0 btn btn-sm btn-outline-secondary",
                              onClick: withModifiers(
                                () => {
                                  active_department.value = item;
                                  showUpdateDepartmentModal();
                                },
                                ["stop"]
                              )
                            }, [
                              createVNode("i", { class: "bi bi-pencil" })
                            ], 8, ["onClick"])) : createCommentVNode("", true),
                            createVNode("div", { class: "border-start border-secondary border-2 mx-1 my-1" }),
                            unref(auth_user).roles_id == 1 ? (openBlock(), createBlock("button", {
                              key: 1,
                              class: "border-0 btn btn-sm btn-outline-secondary",
                              onClick: withModifiers(
                                () => {
                                  active_department.value = item;
                                  showDeleteDepartmentModal();
                                },
                                ["stop"]
                              )
                            }, [
                              createVNode("i", { class: "bi bi-trash3" })
                            ], 8, ["onClick"])) : createCommentVNode("", true)
                          ])
                        ])
                      ], 8, ["onClick"])
                    ]);
                  }), 256))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(auth_user).roles_id == 1) {
        _push(`<div class="modal fade" id="newDepartmentModal" tabindex="-1" aria-labelledby="newDepartmentModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-building-add pe-2"></i> ${ssrInterpolate("New Department")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><form><div class="modal-body bg-light"><div class="row justify-content-center"><div class="col-4 col-lg-3"><label for="department_name" class="form-label d-inline-block">${ssrInterpolate("Name")}</label></div><div class="col-8 col-lg-7"><div class="input-group input-group-sm bg-secondary bg-opacity-10 border-dark"><label class="form-label text-secondary my-auto px-2" for="department_name">${ssrInterpolate("Department")}</label><input type="text" class="form-control form-control-sm" id="department_name"${ssrRenderAttr("value", unref(form_new_department).name)} placeholder="Finance"></div>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          message: unref(form_new_department).errors.name,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row justify-content-center mt-2"><div class="col-4 col-lg-3"><label for="stand_pic" class="form-label d-inline-block">${ssrInterpolate("Manager")}</label></div><div class="col-8 col-lg-7">`);
        _push(ssrRenderComponent(unref(vSelect), {
          class: "bg-white text-nowrap",
          options: __props.staff_list,
          label: "name",
          reduce: (staff) => staff.id,
          modelValue: unref(form_new_department).manager_id,
          "onUpdate:modelValue": ($event) => unref(form_new_department).manager_id = $event,
          placeholder: "Select staff"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          message: unref(form_new_department).errors.manager_id,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-primary">${ssrInterpolate("Create")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(auth_user).roles_id == 1) {
        _push(`<div class="modal fade" id="updateDepartmentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis" id="exampleModalLabel"><i class="bi bi-building-gear me-2"></i> ${ssrInterpolate("Update " + ((_a = active_department.value) == null ? void 0 : _a.name))} <span class="d-none d-lg-inline">${ssrInterpolate("Department")}</span></span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button></div><form><div class="modal-body bg-light"><div class="row justify-content-center mt-0"><div class="col-4 col-lg-3"><label for="edit_department_name" class="form-label text-sm">Name</label></div><div class="col-8 col-lg-7"><input id="edit_department_name" class="form-control form-control-sm" type="text" required${ssrRenderAttr("value", unref(form_update_department).name)}>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          messages: unref(form_update_department).errors.name,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row justify-content-center mt-2"><div class="col-4 col-lg-3"><label for="edit_department_manager" class="form-label d-inline-block">Manager</label></div><div class="col-8 col-lg-7">`);
        _push(ssrRenderComponent(unref(vSelect), {
          class: "bg-white text-nowrap",
          options: __props.staff_list,
          label: "name",
          reduce: (staff) => staff.id,
          modelValue: unref(form_update_department).manager_id,
          "onUpdate:modelValue": ($event) => unref(form_update_department).manager_id = $event,
          placeholder: "Select staff"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          messages: unref(form_update_department).errors.manager_id,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-primary shadow"> Update </button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(auth_user).roles_id == 1) {
        _push(`<div class="modal fade" id="deleteDepartmentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title text-primary-emphasis fs-5" id="exampleModalLabel"><i class="bi bi-building-exclamation me-2"></i> ${ssrInterpolate("Delete " + ((_b = active_department.value) == null ? void 0 : _b.name))} <span class="d-none d-lg-inline">Department</span></span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button></div><form><div class="modal-body bg-light"><div class="row justify-content-center"><div class="col-12 col-lg-10"><p class="m-0" style="${ssrRenderStyle({ "text-align": "justify" })}">${ssrInterpolate("All program and progress in " + ((_c = active_department.value) == null ? void 0 : _c.name) + " Department will be lost. Please make sure you have back up all the data needed.")}</p></div></div><div class="row justify-content-center mt-2"><div class="col-lg-10 col-11 border-bottom"><span class="d-block text-center"><label for="password">Password Needed to Authorize</label></span></div></div><div class="row justify-content-center mt-2"><div class="col-3 col-lg-3"><label for="pic" class="form-label d-inline-block">Password</label></div><div class="col-9 col-lg-7"><div class="input-group"><input id="password" class="form-control" type="password"${ssrRenderAttr(
          "value",
          unref(form_delete_department).password
        )} required autocomplete="current-password"><button type="button" class="btn bg-light"><i class="bi bi-eye-slash-fill" id="password_icon_del"></i></button></div>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          messages: unref(form_delete_department).errors.password,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-danger shadow"> Delete </button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$3, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/Structural.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
