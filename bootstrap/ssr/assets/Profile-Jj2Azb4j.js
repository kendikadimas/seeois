import { computed, ref, onMounted, onUnmounted, watch, withCtx, unref, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./Notif-DL0SggHu.js";
import { G as GuestLayout } from "./GuestLayout-EBOafcqa.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CQDhtLdH.js";
import { _ as _sfc_main$3 } from "./InputError-DugfSnOg.js";
import { usePage, useForm, Head, router } from "@inertiajs/vue3";
import "vue-toastification";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Profile",
  __ssrInlineRender: true,
  props: {
    notif: Object
  },
  setup(__props) {
    var _a;
    const props = __props;
    const auth_user = computed(() => usePage().props.auth.user);
    const title = ref("Profile");
    const toastNotifRef = ref(null);
    const modalConfirmationRef = ref(null);
    const modalUpdateProfileRef = ref(null);
    const modalUpdateProfile = ref(null);
    const modalUpdatePasswordRef = ref(null);
    const modalUpdatePassword = ref(null);
    const inputProfileImageRef = ref(null);
    const isLargeScreen = ref(window.innerWidth >= 1200);
    const formUpdateProfile = useForm({
      name: auth_user.value.name,
      phone: auth_user.value.phone,
      profile_image: auth_user.value.profile_image,
      location: ((_a = auth_user.value) == null ? void 0 : _a.location) ?? null
    });
    const formUpdatePassword = useForm({
      old_password: null,
      password: null,
      password_confirmation: null
    });
    function triggerFileUploadProfileImage() {
      inputProfileImageRef.value.click();
    }
    function handleSubmitUpdateProfile() {
      formUpdateProfile.post(route("profile.update"), {
        onSuccess: () => {
          showUpdateProfileModal(false);
        },
        onError: (e) => {
          var _a2;
          if (((_a2 = e["profile_image"]) == null ? void 0 : _a2.length) > 0) {
            toastNotifRef.value.showToast("warning", e["profile_image"]);
          }
        }
      });
    }
    const handleFileUploadProfileImage = (event) => {
      formUpdateProfile.profile_image = event.target.files[0];
      handleSubmitUpdateProfile();
    };
    function showUpdateProfileModal(is_true) {
      modalUpdateProfile.value = bootstrap.Modal.getOrCreateInstance(
        modalUpdateProfileRef.value
      );
      if (is_true) {
        modalUpdateProfile.value.show();
      } else {
        modalUpdateProfile.value.hide();
      }
    }
    function showUpdatePasswordModal(is_true) {
      modalUpdatePassword.value = bootstrap.Modal.getOrCreateInstance(
        modalUpdatePasswordRef.value
      );
      {
        modalUpdatePassword.value.show();
      }
    }
    const handleResize = () => {
      isLargeScreen.value = window.innerWidth >= 768;
      window.addEventListener("resize", handleResize);
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
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(GuestLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d;
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
            _push2(`<div class="${ssrRenderClass(isLargeScreen.value ? "bg-light" : "bg-light")}" style="${ssrRenderStyle({ "min-height": "100vh", "min-width": "100vw" })}"${_scopeId}><div class="bg-warning shadow-lg mx-auto px-3 py-3"${_scopeId}><div class="d-flex text-primary-emphasis"${_scopeId}><div class="card bg-white shadow p-3 mx-auto"${_scopeId}><div class="d-flex"${_scopeId}><button class="btn btn-sm btn-light text-primary"${_scopeId}><i class="bi bi-chevron-left"${_scopeId}></i><span class="ms-2"${_scopeId}>${ssrInterpolate("Back")}</span></button><div class="border-start border-primary border-2 mx-3 my-1"${_scopeId}></div><span class="h4 text-warning my-auto"${_scopeId}><i class="bi bi-person-fill"${_scopeId}></i> ${ssrInterpolate("Profile")}</span></div></div></div></div><div class="container mt-5"${_scopeId}><div class="row g-4"${_scopeId}><div class="col-12 col-xl-7"${_scopeId}><div class="card bg-white shadow-sm p-3"${_scopeId}><div class="d-block position-relative"${_scopeId}><div class="dropdown"${_scopeId}><button data-bs-toggle="dropdown" aria-expanded="false" class="btn btn-sm btn-outline-secondary end-0 top-0 position-absolute mt-1 me-1 border-0"${_scopeId}><i class="bi bi-gear-fill"${_scopeId}></i></button><div class="dropdown-menu dropdown-menu-end p-0 shadow border"${_scopeId}><ul class="list-group list-group-flush"${_scopeId}><li class="list-group-item list-group-item-action p-2 d-flex rounded-top"${_scopeId}><i class="bi bi-person-vcard text-secondary me-2"${_scopeId}></i>${ssrInterpolate("Profile")}</li><li class="list-group-item list-group-item-action p-2 d-flex rounded-bottom"${_scopeId}><i class="bi bi-key text-secondary me-2"${_scopeId}></i>${ssrInterpolate("Password")}</li></ul></div></div><div class="rounded d-xl-inline-block d-block mx-auto mx-xl-0 float-xl-start position-relative" style="${ssrRenderStyle({ width: "40%" })}"${_scopeId}><img${ssrRenderAttr(
              "src",
              "/storage/images/profile/" + (((_a2 = auth_user.value) == null ? void 0 : _a2.profile_image) ?? "example.png")
            )} alt="image" class="w-100 rounded" style="${ssrRenderStyle({ "aspect-ratio": "1", "object-fit": "cover", "width": "40%" })}"${_scopeId}><button class="btn btn-sm btn-primary border-0 shadow rounded-5 position-absolute end-0 bottom-0 me-2 mb-2"${_scopeId}><i class="bi bi-camera"${_scopeId}></i></button><input type="file" class="d-none"${_scopeId}></div><div class="d-xl-inline-block d-lg-block ps-3 float-xl-end" style="${ssrRenderStyle({ "width": "60%" })}"${_scopeId}><div class="d-flex mt-3 mt-xl-0"${_scopeId}><i class="bi bi-person text-secondary fs-5 me-3 my-auto"${_scopeId}></i><div class=""${_scopeId}><p class="text-secondary mb-0" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Name")}</p><p class="text-secondary-emphasis mb-0"${_scopeId}>${ssrInterpolate(auth_user.value.name)}</p></div></div><div class="d-flex mt-3"${_scopeId}><i class="bi bi-envelope-at text-secondary fs-5 me-3 my-auto"${_scopeId}></i><div class=""${_scopeId}><p class="text-secondary mb-0" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Email")}</p><p class="text-secondary-emphasis mb-0"${_scopeId}>${ssrInterpolate(auth_user.value.email)}</p></div></div><div class="d-flex mt-3"${_scopeId}><i class="bi bi-whatsapp text-secondary fs-5 me-3 my-auto"${_scopeId}></i><div class=""${_scopeId}><p class="text-secondary mb-0" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Whatsapp / Phone")}</p><p class="text-secondary-emphasis mb-0"${_scopeId}>${ssrInterpolate(auth_user.value.phone)}</p></div></div><div class="d-flex mt-3"${_scopeId}><i class="bi bi-cake2 text-secondary fs-5 me-3 my-auto"${_scopeId}></i><div class=""${_scopeId}><p class="text-secondary mb-0" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Birth Date")}</p><p class="text-secondary-emphasis mb-0"${_scopeId}>${ssrInterpolate(auth_user.value.phone)}</p></div></div><div class="d-flex mt-3"${_scopeId}><i class="bi bi-geo-alt text-secondary fs-5 me-3 my-auto"${_scopeId}></i><div class=""${_scopeId}><p class="text-secondary mb-0" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Address")}</p><p class="text-secondary-emphasis mb-0"${_scopeId}>${ssrInterpolate(((_b = auth_user.value) == null ? void 0 : _b.location) ?? "Not set")}</p></div></div></div></div></div></div></div></div></div>`);
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
                class: isLargeScreen.value ? "bg-light" : "bg-light",
                style: { "min-height": "100vh", "min-width": "100vw" }
              }, [
                createVNode("div", { class: "bg-warning shadow-lg mx-auto px-3 py-3" }, [
                  createVNode("div", { class: "d-flex text-primary-emphasis" }, [
                    createVNode("div", { class: "card bg-white shadow p-3 mx-auto" }, [
                      createVNode("div", { class: "d-flex" }, [
                        createVNode("button", {
                          class: "btn btn-sm btn-light text-primary",
                          onClick: ($event) => unref(router).visit(_ctx.route("shop"))
                        }, [
                          createVNode("i", { class: "bi bi-chevron-left" }),
                          createVNode("span", { class: "ms-2" }, toDisplayString("Back"))
                        ], 8, ["onClick"]),
                        createVNode("div", { class: "border-start border-primary border-2 mx-3 my-1" }),
                        createVNode("span", { class: "h4 text-warning my-auto" }, [
                          createVNode("i", { class: "bi bi-person-fill" }),
                          createTextVNode(" " + toDisplayString("Profile"))
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "container mt-5" }, [
                  createVNode("div", { class: "row g-4" }, [
                    createVNode("div", { class: "col-12 col-xl-7" }, [
                      createVNode("div", { class: "card bg-white shadow-sm p-3" }, [
                        createVNode("div", { class: "d-block position-relative" }, [
                          createVNode("div", { class: "dropdown" }, [
                            createVNode("button", {
                              "data-bs-toggle": "dropdown",
                              "aria-expanded": "false",
                              class: "btn btn-sm btn-outline-secondary end-0 top-0 position-absolute mt-1 me-1 border-0"
                            }, [
                              createVNode("i", { class: "bi bi-gear-fill" })
                            ]),
                            createVNode("div", { class: "dropdown-menu dropdown-menu-end p-0 shadow border" }, [
                              createVNode("ul", { class: "list-group list-group-flush" }, [
                                createVNode("li", {
                                  class: "list-group-item list-group-item-action p-2 d-flex rounded-top",
                                  onClick: ($event) => showUpdateProfileModal(true)
                                }, [
                                  createVNode("i", { class: "bi bi-person-vcard text-secondary me-2" }),
                                  createTextVNode(toDisplayString("Profile"))
                                ], 8, ["onClick"]),
                                createVNode("li", {
                                  class: "list-group-item list-group-item-action p-2 d-flex rounded-bottom",
                                  onClick: ($event) => showUpdatePasswordModal()
                                }, [
                                  createVNode("i", { class: "bi bi-key text-secondary me-2" }),
                                  createTextVNode(toDisplayString("Password"))
                                ], 8, ["onClick"])
                              ])
                            ])
                          ]),
                          createVNode("div", {
                            class: "rounded d-xl-inline-block d-block mx-auto mx-xl-0 float-xl-start position-relative",
                            style: { width: "40%" }
                          }, [
                            createVNode("img", {
                              src: "/storage/images/profile/" + (((_c = auth_user.value) == null ? void 0 : _c.profile_image) ?? "example.png"),
                              alt: "image",
                              class: "w-100 rounded",
                              style: { "aspect-ratio": "1", "object-fit": "cover", "width": "40%" }
                            }, null, 8, ["src"]),
                            createVNode("button", {
                              onClick: ($event) => triggerFileUploadProfileImage(),
                              class: "btn btn-sm btn-primary border-0 shadow rounded-5 position-absolute end-0 bottom-0 me-2 mb-2"
                            }, [
                              createVNode("i", { class: "bi bi-camera" })
                            ], 8, ["onClick"]),
                            createVNode("input", {
                              ref_key: "inputProfileImageRef",
                              ref: inputProfileImageRef,
                              type: "file",
                              class: "d-none",
                              onChange: handleFileUploadProfileImage
                            }, null, 544)
                          ]),
                          createVNode("div", {
                            class: "d-xl-inline-block d-lg-block ps-3 float-xl-end",
                            style: { "width": "60%" }
                          }, [
                            createVNode("div", { class: "d-flex mt-3 mt-xl-0" }, [
                              createVNode("i", { class: "bi bi-person text-secondary fs-5 me-3 my-auto" }),
                              createVNode("div", { class: "" }, [
                                createVNode("p", {
                                  class: "text-secondary mb-0",
                                  style: { "font-size": "0.8rem" }
                                }, toDisplayString("Name")),
                                createVNode("p", { class: "text-secondary-emphasis mb-0" }, toDisplayString(auth_user.value.name), 1)
                              ])
                            ]),
                            createVNode("div", { class: "d-flex mt-3" }, [
                              createVNode("i", { class: "bi bi-envelope-at text-secondary fs-5 me-3 my-auto" }),
                              createVNode("div", { class: "" }, [
                                createVNode("p", {
                                  class: "text-secondary mb-0",
                                  style: { "font-size": "0.8rem" }
                                }, toDisplayString("Email")),
                                createVNode("p", { class: "text-secondary-emphasis mb-0" }, toDisplayString(auth_user.value.email), 1)
                              ])
                            ]),
                            createVNode("div", { class: "d-flex mt-3" }, [
                              createVNode("i", { class: "bi bi-whatsapp text-secondary fs-5 me-3 my-auto" }),
                              createVNode("div", { class: "" }, [
                                createVNode("p", {
                                  class: "text-secondary mb-0",
                                  style: { "font-size": "0.8rem" }
                                }, toDisplayString("Whatsapp / Phone")),
                                createVNode("p", { class: "text-secondary-emphasis mb-0" }, toDisplayString(auth_user.value.phone), 1)
                              ])
                            ]),
                            createVNode("div", { class: "d-flex mt-3" }, [
                              createVNode("i", { class: "bi bi-cake2 text-secondary fs-5 me-3 my-auto" }),
                              createVNode("div", { class: "" }, [
                                createVNode("p", {
                                  class: "text-secondary mb-0",
                                  style: { "font-size": "0.8rem" }
                                }, toDisplayString("Birth Date")),
                                createVNode("p", { class: "text-secondary-emphasis mb-0" }, toDisplayString(auth_user.value.phone), 1)
                              ])
                            ]),
                            createVNode("div", { class: "d-flex mt-3" }, [
                              createVNode("i", { class: "bi bi-geo-alt text-secondary fs-5 me-3 my-auto" }),
                              createVNode("div", { class: "" }, [
                                createVNode("p", {
                                  class: "text-secondary mb-0",
                                  style: { "font-size": "0.8rem" }
                                }, toDisplayString("Address")),
                                createVNode("p", { class: "text-secondary-emphasis mb-0" }, toDisplayString(((_d = auth_user.value) == null ? void 0 : _d.location) ?? "Not set"), 1)
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ], 2)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="modal fade" tabindex="-1"><div class="modal-dialog modal-dialog-centered px-3 px-lg-0"><div class="modal-content shadow mt-5"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-person-vcard border-secondary-subtle border-2 border-end pe-2"></i> ${ssrInterpolate("Update Profile")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><form method="post"><div class="modal-body bg-light"><div class="row justify-content-center"><div class="col-4 col-lg-3 d-flex"><label class="form-label d-inline-block my-auto">${ssrInterpolate("Email")}</label></div><div class="col-8 col-lg-7"><span>${ssrInterpolate(auth_user.value.email)}</span></div></div><div class="row justify-content-center mt-2"><div class="col-4 col-lg-3 d-flex"><label for="profile_name" class="form-label d-inline-block my-auto">${ssrInterpolate("Name")}</label></div><div class="col-8 col-lg-7"><input id="profile_name" type="text" class="form-control form-control-sm d-inline-block"${ssrRenderAttr("value", unref(formUpdateProfile).name)} required>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(formUpdateProfile).errors.name
      }, null, _parent));
      _push(`</div></div><div class="row justify-content-center mt-2"><div class="col-4 col-lg-3 d-flex"><label for="profile_phone" class="form-label d-inline-block my-auto">${ssrInterpolate("Whatsapp/Phone")}</label></div><div class="col-8 col-lg-7"><input id="profile_phone" type="tel" class="form-control form-control-sm d-inline-block"${ssrRenderAttr("value", unref(formUpdateProfile).phone)} required>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(formUpdateProfile).errors.phone
      }, null, _parent));
      _push(`</div></div><div class="row justify-content-center mt-2"><div class="col-4 col-lg-3 d-flex"><label for="profile_location" class="form-label d-inline-block my-auto">${ssrInterpolate("Location")}</label></div><div class="col-8 col-lg-7"><input id="profile_location" type="text" class="form-control form-control-sm d-inline-block"${ssrRenderAttr("value", unref(formUpdateProfile).location)}>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(formUpdateProfile).errors.location
      }, null, _parent));
      _push(`</div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-primary">${ssrInterpolate("Update")}</button></div></form></div></div></div><div class="modal fade" tabindex="-1"><div class="modal-dialog modal-dialog-centered px-3 px-lg-0"><div class="modal-content shadow mt-5"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-key border-secondary-subtle border-2 border-end pe-2"></i> ${ssrInterpolate("Update Password")}</span><button type="button" class="btn btn-sm ms-auto"><i class="bi bi-x-lg"></i></button></div><form method="post"><div class="modal-body bg-light"><div class="row justify-content-center"><div class="col-10"><span class="text-secondary d-block" style="${ssrRenderStyle({ "text-align": "justify" })}">${ssrInterpolate("Be caution, you will update your password account. If you are forget, you can choose 'forget password' in the login or register page.")}</span></div></div><div class="row justify-content-center mt-3"><div class="col-5 col-lg-4"><label for="old_password" class="form-label my-1">Old Password</label></div><div class="col-7 col-lg-6"><div class="input-group input-group-sm"><input type="password" class="form-control form-control-sm" id="old_password"${ssrRenderAttr(
        "value",
        unref(formUpdatePassword).old_password
      )} autocomplete="password" required><button type="button" class="btn bg-light text-secondary"><i class="bi bi-eye-slash-fill" id="old_password_icon"></i></button></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(formUpdatePassword).errors.old_password
      }, null, _parent));
      _push(`</div></div><div class="row justify-content-center mt-3"><div class="col-5 col-lg-4"><label for="password" class="form-label my-1">New Password</label></div><div class="col-7 col-lg-6"><div class="input-group input-group-sm"><input type="password" class="form-control form-control-sm" id="password"${ssrRenderAttr("value", unref(formUpdatePassword).password)} required><button type="button" class="btn bg-light text-secondary"><i class="bi bi-eye-slash-fill" id="password_icon"></i></button></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(formUpdatePassword).errors.password
      }, null, _parent));
      _push(`</div></div><div class="row justify-content-center mt-3"><div class="col-5 col-lg-4"><label for="password_confirmation" class="form-label my-1">Confirm Password</label></div><div class="col-7 col-lg-6"><div class="input-group input-group-sm"><input type="password" class="form-control form-control-sm" id="password_confirmation"${ssrRenderAttr(
        "value",
        unref(formUpdatePassword).password_confirmation
      )} required><button type="button" class="btn bg-light text-secondary"><i class="bi bi-eye-slash-fill" id="password_confirmation_icon"></i></button></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(formUpdatePassword).errors.password_confirmation
      }, null, _parent));
      _push(`</div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-primary">${ssrInterpolate("Update")}</button></div></form></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
