import { ref, onMounted, onUnmounted, watch, withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, createTextVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-4HC-0vm9.js";
import { _ as _sfc_main$2 } from "./InputError-DkffFxkw.js";
import { _ as _sfc_main$3 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CQDhtLdH.js";
import vSelect from "vue-select";
/* empty css                    */
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { b as formatDateOnly } from "./utils-WpvxxmT9.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
import "date-fns";
const _sfc_main = {
  __name: "Stand",
  __ssrInlineRender: true,
  props: {
    staff_list: Array,
    stand_list: Array,
    filter: Object,
    notif: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const title = ref("Stand");
    const modalConfirmationRef = ref(null);
    const toastNotifRef = ref(null);
    ref("placeholder");
    const modalNewStand = ref(null);
    const form_filter = useForm({
      category: props.filter.category,
      order: props.filter.order,
      active: props.filter.active
    });
    const form_new_stand = useForm({
      name: null,
      pic_id: null,
      place: null,
      date: null,
      type: 0
    });
    function handleSubmitFilter(category) {
      if (category) {
        form_filter.order = form_filter.category == category ? form_filter.order == "asc" ? "desc" : "asc" : "desc";
        form_filter.category = category;
        form_filter.keyword = null;
      }
      form_filter.post(route("food.stand.filter"));
    }
    function showNewStandModal(is_show) {
      if (modalNewStand.value == null) {
        const modal = document.getElementById("newStandModal");
        modalNewStand.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        modalNewStand.value.show();
      }
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
            _push2(`<div class="container me-lg-0 mx-auto mb-5"${_scopeId}><div class="row mt-4"${_scopeId}><div class="col-12"${_scopeId}><div class="card shadow-sm p-lg-3 p-2"${_scopeId}><div class="d-flex"${_scopeId}><div class="d-flex mx-auto"${_scopeId}><span class="text-primary border-end border-secondary-subtle border-3 pe-3 me-3 my-auto"${_scopeId}>${ssrInterpolate("Filter")}</span><button class="btn text-nowrap btn-sm btn-outline-secondary border-1 rounded-2 border-secondary-subtle py-0"${_scopeId}>${ssrInterpolate("Name")} <i class="${ssrRenderClass(
              "bi bi-arrow-" + (__props.filter.category == "name" ? __props.filter.order == "asc" ? "up" : "down" : "up")
            )}"${_scopeId}></i></button><button class="btn text-nowrap btn-sm btn-outline-secondary ms-2 border-1 rounded-2 border-secondary-subtle py-0"${_scopeId}>${ssrInterpolate("Date")} <i class="${ssrRenderClass(
              "bi bi-arrow-" + (__props.filter.category == "date" ? __props.filter.order == "asc" ? "up" : "down" : "up")
            )}"${_scopeId}></i></button><button class="${ssrRenderClass(
              "btn text-nowrap btn-sm ms-2 border-1 rounded-2 border-secondary-subtle py-0 btn-outline-success " + (__props.filter.active == true ? "active" : "")
            )}"${_scopeId}>${ssrInterpolate(__props.filter.active == true ? "Active" : "All Status")}</button></div>`);
            if (unref(auth_user).roles_id == 3) {
              _push2(`<button class="btn btn-sm btn-outline-primary border-0 py-0"${_scopeId}><i class="bi bi-plus-lg d-lg-none"${_scopeId}></i><span class="d-none d-lg-block"${_scopeId}>${ssrInterpolate("New Stand")}</span></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="row gx-4 mt-4 mt-lg-5"${_scopeId}><!--[-->`);
            ssrRenderList(__props.stand_list, (stand) => {
              _push2(`<div class="col-lg-4 col-12"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("food.stand.detail", stand.id))} class="text-decoration-none"${_scopeId}><div class="card card-bg-hover p-3 mb-3 mb-lg-4"${_scopeId}><div class="d-flex" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}><span class="me-auto"${_scopeId}>${ssrInterpolate(unref(formatDateOnly)(stand.date))}</span><span class="${ssrRenderClass(
                "d-block " + (stand.menu_lock > 0 && stand.sale_validation == 0 ? "text-success" : "text-secondary")
              )}"${_scopeId}>${ssrInterpolate(stand.menu_lock > 0 && stand.sale_validation == 0 ? "active" : "inactive")}</span></div><span class="h5 text-primary-emphasis me-auto"${_scopeId}>${ssrInterpolate("Stand " + stand.name)}</span></div></a></div>`);
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
                        createVNode("div", { class: "d-flex mx-auto" }, [
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
                          createVNode("button", {
                            onClick: ($event) => handleSubmitFilter("date"),
                            class: "btn text-nowrap btn-sm btn-outline-secondary ms-2 border-1 rounded-2 border-secondary-subtle py-0"
                          }, [
                            createTextVNode(toDisplayString("Date") + " "),
                            createVNode("i", {
                              class: "bi bi-arrow-" + (__props.filter.category == "date" ? __props.filter.order == "asc" ? "up" : "down" : "up")
                            }, null, 2)
                          ], 8, ["onClick"]),
                          createVNode("button", {
                            onClick: () => {
                              unref(form_filter).active = !__props.filter.active;
                              handleSubmitFilter();
                            },
                            class: "btn text-nowrap btn-sm ms-2 border-1 rounded-2 border-secondary-subtle py-0 btn-outline-success " + (__props.filter.active == true ? "active" : "")
                          }, toDisplayString(__props.filter.active == true ? "Active" : "All Status"), 11, ["onClick"])
                        ]),
                        unref(auth_user).roles_id == 3 ? (openBlock(), createBlock("button", {
                          key: 0,
                          class: "btn btn-sm btn-outline-primary border-0 py-0",
                          onClick: ($event) => showNewStandModal()
                        }, [
                          createVNode("i", { class: "bi bi-plus-lg d-lg-none" }),
                          createVNode("span", { class: "d-none d-lg-block" }, toDisplayString("New Stand"))
                        ], 8, ["onClick"])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "row gx-4 mt-4 mt-lg-5" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.stand_list, (stand) => {
                    return openBlock(), createBlock("div", { class: "col-lg-4 col-12" }, [
                      createVNode("a", {
                        href: _ctx.route("food.stand.detail", stand.id),
                        class: "text-decoration-none"
                      }, [
                        createVNode("div", { class: "card card-bg-hover p-3 mb-3 mb-lg-4" }, [
                          createVNode("div", {
                            class: "d-flex",
                            style: { "font-size": "0.8rem" }
                          }, [
                            createVNode("span", { class: "me-auto" }, toDisplayString(unref(formatDateOnly)(stand.date)), 1),
                            createVNode("span", {
                              class: "d-block " + (stand.menu_lock > 0 && stand.sale_validation == 0 ? "text-success" : "text-secondary")
                            }, toDisplayString(stand.menu_lock > 0 && stand.sale_validation == 0 ? "active" : "inactive"), 3)
                          ]),
                          createVNode("span", { class: "h5 text-primary-emphasis me-auto" }, toDisplayString("Stand " + stand.name), 1)
                        ])
                      ], 8, ["href"])
                    ]);
                  }), 256))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(auth_user).roles_id == 3) {
        _push(`<div class="modal fade" id="newStandModal" tabindex="-1" aria-labelledby="newStandModal"><div class="modal-dialog modal-dialog-centered"><div class="modal-content shadow mx-3"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-shop pe-2"></i> ${ssrInterpolate("New Stand")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><form><div class="modal-body bg-light"><div class="row justify-content-center"><div class="col-4 col-lg-3"><label for="stand_name" class="form-label d-inline-block">${ssrInterpolate("Name")}</label></div><div class="col-8 col-lg-7"><input type="text" class="form-control form-control-sm" id="stand_name"${ssrRenderAttr("value", unref(form_new_stand).name)} placeholder="Blaterian 1">`);
        _push(ssrRenderComponent(_sfc_main$2, {
          message: unref(form_new_stand).errors.name,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row justify-content-center mt-2"><div class="col-4 col-lg-3"><label for="stand_place" class="form-label d-inline-block">${ssrInterpolate("Place")}</label></div><div class="col-8 col-lg-7"><input type="text" class="form-control form-control-sm" id="stand_place"${ssrRenderAttr("value", unref(form_new_stand).place)} placeholder="Gedung F">`);
        _push(ssrRenderComponent(_sfc_main$2, {
          message: unref(form_new_stand).errors.place,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row justify-content-center mt-2"><div class="col-4 col-lg-3"><label for="stand_date" class="form-label d-inline-block">${ssrInterpolate("Date")}</label></div><div class="col-8 col-lg-7"><input type="date" class="form-control form-control-sm" id="stand_date"${ssrRenderAttr("value", unref(form_new_stand).date)}>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          message: unref(form_new_stand).errors.date,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row justify-content-center mt-2"><div class="col-4 col-lg-3"><label for="stand_type" class="form-label d-inline-block">${ssrInterpolate("Type")}</label></div><div class="col-8 col-lg-7"><select id="stand_type" class="form-select form-select-sm"><!--[-->`);
        ssrRenderList([
          { value: 0, name: "Live" },
          { value: 1, name: "Pre-Order" },
          {
            value: 2,
            name: "Live and Pre-Order"
          }
        ], (item) => {
          _push(`<option${ssrRenderAttr("value", item.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form_new_stand).type) ? ssrLooseContain(unref(form_new_stand).type, item.value) : ssrLooseEqual(unref(form_new_stand).type, item.value)) ? " selected" : ""}>${ssrInterpolate(item.name)}</option>`);
        });
        _push(`<!--]--></select>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          message: unref(form_new_stand).errors.type,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="row justify-content-center mt-2"><div class="col-4 col-lg-3"><label for="stand_pic" class="form-label d-inline-block">${ssrInterpolate("In Charge")}</label></div><div class="col-8 col-lg-7">`);
        _push(ssrRenderComponent(unref(vSelect), {
          class: "bg-white text-nowrap",
          options: __props.staff_list,
          label: "name",
          reduce: (staff) => staff.id,
          modelValue: unref(form_new_stand).pic_id,
          "onUpdate:modelValue": ($event) => unref(form_new_stand).pic_id = $event,
          placeholder: "Select staff"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          message: unref(form_new_stand).errors.pic_id,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-primary">${ssrInterpolate("Create")}</button></div></form></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Business/Stand.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
