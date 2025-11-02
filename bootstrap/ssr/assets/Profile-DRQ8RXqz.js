import { computed, ref, onMounted, onUnmounted, watch, withCtx, unref, createVNode, createBlock, createCommentVNode, Transition, openBlock, createTextVNode, toDisplayString, withModifiers, withDirectives, vModelText, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-4HC-0vm9.js";
import { _ as _sfc_main$2 } from "./InputError-DkffFxkw.js";
import { _ as _sfc_main$3 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CQDhtLdH.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { g as getMonthName, f as formatIDR, s as showImage } from "./utils-WpvxxmT9.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
import "date-fns";
const _sfc_main = {
  __name: "Profile",
  __ssrInlineRender: true,
  props: {
    profile: Object,
    logbook_list: Array,
    program_list: Array,
    contribution_settings: Object,
    contribution: Object,
    notif: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const auth_user = computed(() => {
      return usePage().props.auth.user;
    });
    const title = computed(() => {
      return props.profile.name + " Profile";
    });
    const modalConfirmationRef = ref(null);
    const toastNotifRef = ref(null);
    const modalUpdateProfileRef = ref(null);
    const modalUpdateProfile = ref(null);
    const modalUpdatePasswordRef = ref(null);
    const modalUpdatePassword = ref(null);
    const inputProfileImageRef = ref(null);
    const logbookImageRef = ref(null);
    const contributionReceiptRef = ref(null);
    const activeTab = ref(1);
    const targetTab = ref(0);
    const thisMonth = computed(() => {
      return (/* @__PURE__ */ new Date()).getMonth() + 1;
    });
    const formUpdateProfile = useForm({
      name: props.profile.name,
      phone: props.profile.phone,
      profile_image: props.profile.profile_image
    });
    const formUpdatePassword = useForm({
      old_password: null,
      password: null,
      password_confirmation: null
    });
    const formAddLogbook = useForm({
      program_id: null,
      date_time: null,
      description: null,
      image: null
    });
    const formAddContribution = useForm({
      month: null,
      receipt: null
    });
    function handleSubmitUpdateProfile() {
      formUpdateProfile.post(route("profile.update"), {
        onSuccess: () => {
          showUpdateProfileModal(false);
        },
        onError: (e) => {
          var _a;
          if (((_a = e["profile_image"]) == null ? void 0 : _a.length) > 0) {
            toastNotifRef.value.showToast("warning", e["profile_image"]);
          }
        }
      });
    }
    function handleSubmitUpdatePassword() {
      formUpdatePassword.post(route("password.change"), {
        onSuccess: () => {
          showUpdatePasswordModal(false);
          formUpdatePassword.reset();
        }
      });
    }
    function handleSubmitLogbook() {
      formAddLogbook.post(route("logbook.add"), {
        onSuccess: () => {
          formAddLogbook.reset();
          if (logbookImageRef.value) {
            logbookImageRef.value.value = "";
          }
        }
      });
    }
    function handleSubmitContribution() {
      formAddContribution.post(route("contribution.insert"), {
        onSuccess: () => {
          formAddContribution.reset();
          if (contributionReceiptRef.value) {
            contributionReceiptRef.value.value = "";
          }
        }
      });
    }
    function triggerFileUploadProfileImage() {
      inputProfileImageRef.value.click();
    }
    const handleFileUploadProfileImage = (event) => {
      formUpdateProfile.profile_image = event.target.files[0];
      handleSubmitUpdateProfile();
    };
    const handleFileUploadLogbookImage = (event) => {
      formAddLogbook.image = event.target.files[0];
    };
    const handleFileUploadContributionReceipt = (event) => {
      formAddContribution.receipt = event.target.files[0];
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
      if (is_true) {
        modalUpdatePassword.value.show();
      } else {
        modalUpdatePassword.value.hide();
      }
    }
    function setActiveTab() {
      activeTab.value = targetTab.value;
    }
    function setTargetTab(number) {
      targetTab.value = number;
      activeTab.value = 0;
      console.log(targetTab.value, activeTab.value);
    }
    const show_password = (input_id, icon_id) => {
      var password = document.getElementById(input_id);
      var password_icon = document.getElementById(icon_id);
      if (password.type === "password") {
        password.type = "text";
        password_icon.classList.remove("bi-eye-slash-fill");
        password_icon.classList.add("bi-eye-fill");
      } else {
        password.type = "password";
        password_icon.classList.remove("bi-eye-fill");
        password_icon.classList.add("bi-eye-slash-fill");
      }
    };
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
          var _a, _b, _c, _d, _e, _f, _g;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: title.value,
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="container me-lg-0 mx-auto mb-5"${_scopeId}><div class="row gx-4 mt-4"${_scopeId}>`);
            if (activeTab.value == 1 || isLargeScreen.value) {
              _push2(`<div class="${ssrRenderClass(
                "col-12 " + (auth_user.value.id == __props.profile.id ? "col-lg-5" : "col-lg-9")
              )}"${_scopeId}><div class="card position-relative shadow"${_scopeId}><div class="dropdown"${_scopeId}>`);
              if (auth_user.value.id == __props.profile.id) {
                _push2(`<button data-bs-toggle="dropdown" aria-expanded="false" class="btn btn-sm btn-outline-secondary end-0 top-0 position-absolute mt-1 me-1 border-0"${_scopeId}><i class="bi bi-gear-fill"${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="dropdown-menu dropdown-menu-end p-0 shadow"${_scopeId}><ul class="list-group list-group-flush"${_scopeId}><li class="list-group-item p-0 d-flex rounded-top"${_scopeId}><button class="btn btn-sm border-0 w-100 card-bg-hover text-start"${_scopeId}><i class="bi bi-person-vcard text-secondary me-2"${_scopeId}></i>${ssrInterpolate("Profile")}</button></li><li class="list-group-item p-0 d-flex rounded-bottom"${_scopeId}><button class="btn btn-sm border-0 w-100 card-bg-hover text-start"${_scopeId}><i class="bi bi-key text-secondary me-2"${_scopeId}></i>${ssrInterpolate("Password")}</button></li></ul></div>`);
              if (auth_user.value.id == __props.profile.id) {
                _push2(`<div class="modal fade" tabindex="-1"${_scopeId}><div class="modal-dialog modal-dialog-centered px-3 px-lg-0"${_scopeId}><div class="modal-content shadow mt-5"${_scopeId}><div class="modal-header py-1 ps-3 pe-2"${_scopeId}><span class="modal-title fs-5 text-primary-emphasis"${_scopeId}><i class="bi bi-person-vcard border-secondary-subtle border-2 border-end pe-2"${_scopeId}></i> ${ssrInterpolate("Update Profile")}</span><button type="button" class="btn btn-sm ms-auto"${_scopeId}><i class="bi bi-x-lg"${_scopeId}></i></button></div><form method="post"${_scopeId}><div class="modal-body bg-light"${_scopeId}><div class="row justify-content-center"${_scopeId}><div class="col-4 col-lg-3 d-flex"${_scopeId}><label class="form-label d-inline-block my-auto"${_scopeId}>${ssrInterpolate("Email")}</label></div><div class="col-8 col-lg-7"${_scopeId}><span${_scopeId}>${ssrInterpolate(__props.profile.email)}</span></div></div><div class="row justify-content-center mt-2"${_scopeId}><div class="col-4 col-lg-3 d-flex"${_scopeId}><label for="profile_name" class="form-label d-inline-block my-auto"${_scopeId}>${ssrInterpolate("Name")}</label></div><div class="col-8 col-lg-7"${_scopeId}><input id="profile_name" type="text" class="form-control form-control-sm d-inline-block"${ssrRenderAttr(
                  "value",
                  unref(formUpdateProfile).name
                )} required${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formUpdateProfile).errors.name
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="row justify-content-center mt-2"${_scopeId}><div class="col-4 col-lg-3 d-flex"${_scopeId}><label for="profile_phone" class="form-label d-inline-block my-auto"${_scopeId}>${ssrInterpolate("Phone")}</label></div><div class="col-8 col-lg-7"${_scopeId}><input id="profile_phone" type="tel" class="form-control form-control-sm d-inline-block"${ssrRenderAttr(
                  "value",
                  unref(formUpdateProfile).phone
                )} required${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formUpdateProfile).errors.phone
                }, null, _parent2, _scopeId));
                _push2(`</div></div></div><div class="modal-footer p-1"${_scopeId}><button type="submit" class="btn btn-sm btn-primary"${_scopeId}>${ssrInterpolate("Update")}</button></div></form></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (auth_user.value.id == __props.profile.id) {
                _push2(`<div class="modal fade" tabindex="-1"${_scopeId}><div class="modal-dialog modal-dialog-centered px-3 px-lg-0"${_scopeId}><div class="modal-content shadow mt-5"${_scopeId}><div class="modal-header py-1 ps-3 pe-2"${_scopeId}><span class="modal-title fs-5 text-primary-emphasis"${_scopeId}><i class="bi bi-key border-secondary-subtle border-2 border-end pe-2"${_scopeId}></i> ${ssrInterpolate("Update Password")}</span><button type="button" class="btn btn-sm ms-auto"${_scopeId}><i class="bi bi-x-lg"${_scopeId}></i></button></div><form method="post"${_scopeId}><div class="modal-body bg-light"${_scopeId}><div class="row justify-content-center"${_scopeId}><div class="col-10"${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "text-align": "justify" })}"${_scopeId}>${ssrInterpolate("Be caution, you will update your password account. If you are forget, you can choose 'forget password' in the login or register page.")}</span></div></div><div class="row justify-content-center mt-3"${_scopeId}><div class="col-5 col-lg-4"${_scopeId}><label for="old_password" class="form-label my-1"${_scopeId}>Old Password</label></div><div class="col-7 col-lg-6"${_scopeId}><div class="input-group input-group-sm"${_scopeId}><input type="password" class="form-control form-control-sm" id="old_password"${ssrRenderAttr(
                  "value",
                  unref(formUpdatePassword).old_password
                )} autocomplete="password" required${_scopeId}><button type="button" class="btn bg-light text-secondary"${_scopeId}><i class="bi bi-eye-slash-fill" id="old_password_icon"${_scopeId}></i></button></div>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formUpdatePassword).errors.old_password
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="row justify-content-center mt-3"${_scopeId}><div class="col-5 col-lg-4"${_scopeId}><label for="password" class="form-label my-1"${_scopeId}>New Password</label></div><div class="col-7 col-lg-6"${_scopeId}><div class="input-group input-group-sm"${_scopeId}><input type="password" class="form-control form-control-sm" id="password"${ssrRenderAttr(
                  "value",
                  unref(formUpdatePassword).password
                )} required${_scopeId}><button type="button" class="btn bg-light text-secondary"${_scopeId}><i class="bi bi-eye-slash-fill" id="password_icon"${_scopeId}></i></button></div>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formUpdatePassword).errors.password
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="row justify-content-center mt-3"${_scopeId}><div class="col-5 col-lg-4"${_scopeId}><label for="password_confirmation" class="form-label my-1"${_scopeId}>Confirm Password</label></div><div class="col-7 col-lg-6"${_scopeId}><div class="input-group input-group-sm"${_scopeId}><input type="password" class="form-control form-control-sm" id="password_confirmation"${ssrRenderAttr(
                  "value",
                  unref(formUpdatePassword).password_confirmation
                )} required${_scopeId}><button type="button" class="btn bg-light text-secondary"${_scopeId}><i class="bi bi-eye-slash-fill" id="password_confirmation_icon"${_scopeId}></i></button></div>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formUpdatePassword).errors.password_confirmation
                }, null, _parent2, _scopeId));
                _push2(`</div></div></div><div class="modal-footer p-1"${_scopeId}><button type="submit" class="btn btn-sm btn-primary"${_scopeId}>${ssrInterpolate("Update")}</button></div></form></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="row gx-3 justify-content-center"${_scopeId}><div class="col-5 col-lg-5 d-flex"${_scopeId}><div class="card position-relative my-3 ms-3 w-100"${_scopeId}><img${ssrRenderAttr(
                "src",
                "/storage/images/profile/" + (((_a = __props.profile) == null ? void 0 : _a.profile_image) ?? "example.png")
              )} alt="image" class="img-fluid w-100 h-100 object-fit-cover rounded border-secondary-subtle border-1 shadow placeholder" style="${ssrRenderStyle({ "min-height": "200px" })}"${_scopeId}><a${ssrRenderAttr(
                "href",
                "/storage/images/profile/" + (((_b = __props.profile) == null ? void 0 : _b.profile_image) ?? "example.png")
              )} class="${ssrRenderClass(
                "btn btn-sm btn-primary border-0 shadow rounded-5 position-absolute end-0 bottom-0 mb-2 " + (auth_user.value.id !== __props.profile.id ? "me-2" : "")
              )}" style="${ssrRenderStyle({ "font-size": "0.6rem", "padding": "0.15rem 0.34rem", "margin-right": "2.5rem" })}" download${_scopeId}><i class="bi bi-download"${_scopeId}></i></a>`);
              if (auth_user.value.id == __props.profile.id) {
                _push2(`<button class="btn btn-sm btn-primary border-0 shadow rounded-5 position-absolute end-0 bottom-0 me-2 mb-2"${_scopeId}><i class="bi bi-camera"${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<input type="file" class="d-none"${_scopeId}></div></div><div class="col-10 col-lg-7"${_scopeId}><div class="d-flex"${_scopeId}><i class="bi bi-person text-secondary d-lg-none fs-5 me-3 mt-1"${_scopeId}></i><div class=""${_scopeId}><p class="text-secondary mb-0 mt-lg-3" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Name")}</p><p class="text-secondary-emphasis"${_scopeId}>${ssrInterpolate(__props.profile.name)}</p></div></div><div class="d-flex"${_scopeId}><i class="bi bi-person-badge text-secondary d-lg-none fs-5 me-3 mt-1"${_scopeId}></i><div${_scopeId}><p class="text-secondary mb-0" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Role")}</p><p class="text-secondary-emphasis"${_scopeId}>${ssrInterpolate(__props.profile.roles.name)}</p></div></div><div class="d-flex"${_scopeId}><i class="bi bi-envelope-at text-secondary d-lg-none fs-5 me-3 mt-1"${_scopeId}></i><div${_scopeId}><p class="text-secondary mb-0" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Email")}</p><p class="text-secondary-emphasis"${_scopeId}>${ssrInterpolate(__props.profile.email)}</p></div></div><div class="d-flex"${_scopeId}><i class="bi bi-whatsapp text-secondary d-lg-none fs-5 me-3 mt-1"${_scopeId}></i><div${_scopeId}><p class="text-secondary mb-0" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Phone")}</p><p class="text-secondary-emphasis"${_scopeId}><a${ssrRenderAttr(
                "href",
                "https://wa.me/+62" + __props.profile.phone.slice(1)
              )} target="_blank" class="text-decoration-none text-primary"${_scopeId}><i class="bi bi-whatsapp d-none d-lg-inline"${_scopeId}></i> ${ssrInterpolate(__props.profile.phone)}</a></p></div></div></div></div></div><div class="card p-3 mt-4 d-lg-none"${_scopeId}><div class="d-flex border-bottom border-secondary pb-1"${_scopeId}><span class="text-secondary"${_scopeId}>${ssrInterpolate("Duties and Obligations")}</span></div><div class="d-flex mt-2"${_scopeId}><button class="btn btn-sm"${_scopeId}><div class="d-flex"${_scopeId}><i class="bi bi-journal-bookmark rounded-4 fs-1 text-primary border border-primary-subtle border-1 shadow-sm py-1 px-2 d-block mx-auto"${_scopeId}></i></div><span class="fw-light d-block mt-1" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Logbook")}</span></button><button class="ms-4 btn btn-sm"${_scopeId}><div class="d-flex"${_scopeId}><i class="bi bi-journal-text rounded-4 fs-1 text-primary border border-primary-subtle border-1 shadow-sm py-1 px-2 mx-auto"${_scopeId}></i></div><span class="fw-light d-block mt-1" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Contribution")}</span></button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (auth_user.value.id == __props.profile.id) {
              _push2(`<div class="col-lg-7 col-12"${_scopeId}><div class="row gx-4"${_scopeId}><div class="col-lg-6 col-12"${_scopeId}>`);
              if (activeTab.value == 2 || isLargeScreen.value) {
                _push2(`<div class="card p-3"${_scopeId}><div class="d-flex border-bottom border-primary"${_scopeId}><span class="w-100 text-primary-emphasis h5"${_scopeId}><i class="bi bi-journal-bookmark me-2 fs-6"${_scopeId}></i>${ssrInterpolate("Logbook")}</span><button class="btn btn-sm text-primary fw-light ms-auto p-0 d-lg-none d-flex"${_scopeId}><i class="bi bi-chevron-left"${_scopeId}></i> ${ssrInterpolate("Back")}</button></div><form${_scopeId}><div class="mt-2"${_scopeId}><div class="form-floating"${_scopeId}><select class="${ssrRenderClass(
                  "form-select border-0 border-bottom " + (unref(formAddLogbook).errors.program_id ? "is-invalid" : "")
                )}" id="logbook_program" aria-label="Floating label select example" required${_scopeId}><option value="null" selected${_scopeId}>${ssrInterpolate("Choose here")}</option><!--[-->`);
                ssrRenderList(__props.program_list, (program) => {
                  var _a2;
                  _push2(`<option${ssrRenderAttr(
                    "value",
                    program.program_id
                  )}${ssrIncludeBooleanAttr(Array.isArray(
                    unref(formAddLogbook).program_id
                  ) ? ssrLooseContain(
                    unref(formAddLogbook).program_id,
                    program.program_id
                  ) : ssrLooseEqual(
                    unref(formAddLogbook).program_id,
                    program.program_id
                  )) ? " selected" : ""}${_scopeId}>${ssrInterpolate(((_a2 = program.program) == null ? void 0 : _a2.name) + " as " + program.title)}</option>`);
                });
                _push2(`<!--]--></select><label for="logbook_program"${_scopeId}>Program</label></div>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formAddLogbook).errors.program_id
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="mt-2"${_scopeId}><div class="form-floating"${_scopeId}><input type="date" class="${ssrRenderClass(
                  "form-control border-0 border-bottom  " + (unref(formAddLogbook).errors.date_time ? "is-invalid" : "")
                )}" id="logbook_date"${ssrRenderAttr(
                  "value",
                  unref(formAddLogbook).date_time
                )}${_scopeId}><label for="logbook_date"${_scopeId}>Date &amp; Time</label></div>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formAddLogbook).errors.date_time
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="mt-2"${_scopeId}><div class="form-floating"${_scopeId}><input type="file" class="${ssrRenderClass(
                  "form-control border-0 border-bottom  " + (unref(formAddLogbook).errors.image ? "is-invalid" : "")
                )}" id="logbook_image"${_scopeId}><label for="logbook_image"${_scopeId}>${ssrInterpolate("Image Photo")}</label></div>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formAddLogbook).errors.image
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="mt-2"${_scopeId}><div class="form-floating"${_scopeId}><textarea class="form-control border-0 border-bottom" id="logbook_description" style="${ssrRenderStyle({ "height": "84px" })}" placeholder="Add description of your activities"${_scopeId}>${ssrInterpolate(
                  unref(formAddLogbook).description
                )}</textarea><label for="logbook_description"${_scopeId}>${ssrInterpolate("Description")}</label></div>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formAddLogbook).errors.description
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="mt-3"${_scopeId}><button type="submit" class="btn btn-sm btn-primary w-100"${_scopeId}>${ssrInterpolate("Add Logbook")}</button></div></form><div class="mt-2"${_scopeId}><div class="d-flex"${_scopeId}><button class="btn btn-sm border-0 ms-auto text-primary text-decoration-none p-0" style="${ssrRenderStyle({ "font-size": "0.7rem" })}" data-bs-toggle="collapse" data-bs-target="#programListCollapse"${_scopeId}>${ssrInterpolate("check my logbook")}</button></div><div class="collapse" id="programListCollapse"${_scopeId}><!--[-->`);
                ssrRenderList(__props.program_list, (program) => {
                  var _a2;
                  _push2(`<a${ssrRenderAttr(
                    "href",
                    _ctx.route("checkLogbook", [
                      program.program_id,
                      auth_user.value.id
                    ])
                  )} class="${ssrRenderClass("text-decoration-none ")}"${_scopeId}><div class="${ssrRenderClass(
                    "d-flex " + (__props.program_list.indexOf(
                      program
                    ) > 0 ? "mt-2" : "")
                  )}" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}><span class="text-secondary"${_scopeId}>${ssrInterpolate(((_a2 = program.program) == null ? void 0 : _a2.name) ?? program.program_id)}</span><span class="fw-light text-secondary mx-2"${_scopeId}>${ssrInterpolate("as")}</span><span class="fw-light text-primary"${_scopeId}>${ssrInterpolate(program.title)}</span><i class="bi bi-box-arrow-up-right ms-1 text-primary"${_scopeId}></i></div></a>`);
                });
                _push2(`<!--]--></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="col-lg-6 col-12"${_scopeId}>`);
              if (activeTab.value == 3 || isLargeScreen.value) {
                _push2(`<div class="card p-3"${_scopeId}><div class="d-flex border-bottom border-primary"${_scopeId}><span class="w-100 text-primary-emphasis h5"${_scopeId}><i class="bi bi-journal-text me-2 fs-6"${_scopeId}></i>${ssrInterpolate("Contribution")}</span><button class="btn btn-sm text-primary fw-light ms-auto p-0 d-lg-none d-flex"${_scopeId}><i class="bi bi-chevron-left mb-0"${_scopeId}></i> ${ssrInterpolate("Back")}</button></div><div class="mt-2"${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Your progress :")}</span></div><div class="mt-1"${_scopeId}><!--[-->`);
                ssrRenderList(__props.contribution_settings.period, (month) => {
                  var _a2, _b2, _c2, _d2;
                  _push2(`<div class="${ssrRenderClass(
                    "btn shadow-sm px-1 py-0 me-1 " + (month + ((_a2 = __props.contribution_settings) == null ? void 0 : _a2.start) - 1 <= thisMonth.value && month > (__props.contribution ? (_b2 = __props.contribution) == null ? void 0 : _b2.months : 0) ? "bg-danger bg-opacity-25" : "") + (month <= ((_c2 = __props.contribution) == null ? void 0 : _c2.months) ? "bg-primary bg-opacity-25" : "bg-secondary bg-opacity-25 border-dark-subtle border-1")
                  )}"${_scopeId}><span style="${ssrRenderStyle({ "font-size": "0.7rem" })}" class="${ssrRenderClass(
                    "position-relative " + (month <= ((_d2 = __props.contribution) == null ? void 0 : _d2.months) ? "text-primary " : "text-secondary ")
                  )}"${_scopeId}>${ssrInterpolate(unref(getMonthName)(
                    month + __props.contribution_settings.start - 1,
                    "short"
                  ))}</span></div>`);
                });
                _push2(`<!--]--></div><div class="mt-2 d-flex"${_scopeId}><span class="text-secondary me-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Status :")}</span></div><div class="mt-1"${_scopeId}><span class="text-secondary"${_scopeId}>${ssrInterpolate(__props.contribution_settings.start + (__props.contribution ? __props.contribution.months - 1 : 0) <= thisMonth.value ? "You have unpaid bill for " + (thisMonth.value - ((_c = __props.contribution_settings) == null ? void 0 : _c.start) - (__props.contribution ? __props.contribution.months - 1 : -1) + (thisMonth.value - ((_d = __props.contribution_settings) == null ? void 0 : _d.start) - (__props.contribution ? __props.contribution.months - 1 : -1) > 1 ? " months" : " month")) : "You are on track.")}</span></div><form${_scopeId}><div class="mt-3 border-top border-primary"${_scopeId}><div class="form-floating"${_scopeId}><select class="${ssrRenderClass(
                  "form-select border-0 border-bottom " + (unref(formAddContribution).errors.month ? "is-invalid" : "")
                )}" id="contribution_month" aria-label="Floating label select example" required${_scopeId}><option value="null" selected${_scopeId}>${ssrInterpolate("Choose here")}</option><!--[-->`);
                ssrRenderList(((_e = __props.contribution_settings) == null ? void 0 : _e.period) - (__props.contribution ? (_f = __props.contribution) == null ? void 0 : _f.months : 0), (month) => {
                  _push2(`<option${ssrRenderAttr("value", month)} class="position-relative"${ssrIncludeBooleanAttr(Array.isArray(
                    unref(formAddContribution).month
                  ) ? ssrLooseContain(
                    unref(formAddContribution).month,
                    month
                  ) : ssrLooseEqual(
                    unref(formAddContribution).month,
                    month
                  )) ? " selected" : ""}${_scopeId}>${ssrInterpolate(month + (month > 1 ? " months" : " month"))}</option>`);
                });
                _push2(`<!--]--></select><label for="contribution_month"${_scopeId}>${ssrInterpolate("Pay for")}</label></div>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formAddContribution).errors.month
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="mt-2"${_scopeId}><div class="form-floating"${_scopeId}><input type="file" class="${ssrRenderClass(
                  "form-control border-0 border-bottom  " + (unref(formAddContribution).errors.receipt ? "is-invalid" : "")
                )}" id="contribution_receipt"${_scopeId}><label for="contribution_receipt"${_scopeId}>${ssrInterpolate("Receipt")}</label></div>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formAddContribution).errors.receipt
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="mt-2 d-flex"${_scopeId}><span class="ms-auto text-secondary"${_scopeId}>${ssrInterpolate("Price : ")}</span><span class="text-dark ms-2"${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                  ((_g = __props.contribution_settings) == null ? void 0 : _g.price) * unref(formAddContribution).month
                ))}</span></div><div class="mt-3"${_scopeId}><button type="submit" class="btn btn-sm btn-primary w-100"${_scopeId}>${ssrInterpolate("Add Contribution")}</button></div></form><div class="mt-2 d-flex"${_scopeId}><a class="ms-auto text-primary text-decoration-none" style="${ssrRenderStyle({ "font-size": "0.7rem" })}"${ssrRenderAttr(
                  "href",
                  _ctx.route(
                    "checkContribution",
                    auth_user.value.id
                  )
                )}${_scopeId}>${ssrInterpolate("check my contribution")} <i class="bi bi-box-arrow-up-right ms-1"${_scopeId}></i></a></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
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
                createVNode("div", { class: "row gx-4 mt-4" }, [
                  createVNode(Transition, {
                    name: "fade-slide-ltr",
                    onAfterLeave: ($event) => setActiveTab()
                  }, {
                    default: withCtx(() => {
                      var _a2, _b2;
                      return [
                        activeTab.value == 1 || isLargeScreen.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "col-12 " + (auth_user.value.id == __props.profile.id ? "col-lg-5" : "col-lg-9")
                        }, [
                          createVNode("div", { class: "card position-relative shadow" }, [
                            createVNode("div", { class: "dropdown" }, [
                              auth_user.value.id == __props.profile.id ? (openBlock(), createBlock("button", {
                                key: 0,
                                "data-bs-toggle": "dropdown",
                                "aria-expanded": "false",
                                class: "btn btn-sm btn-outline-secondary end-0 top-0 position-absolute mt-1 me-1 border-0"
                              }, [
                                createVNode("i", { class: "bi bi-gear-fill" })
                              ])) : createCommentVNode("", true),
                              createVNode("div", { class: "dropdown-menu dropdown-menu-end p-0 shadow" }, [
                                createVNode("ul", { class: "list-group list-group-flush" }, [
                                  createVNode("li", { class: "list-group-item p-0 d-flex rounded-top" }, [
                                    createVNode("button", {
                                      class: "btn btn-sm border-0 w-100 card-bg-hover text-start",
                                      onClick: ($event) => showUpdateProfileModal(true)
                                    }, [
                                      createVNode("i", { class: "bi bi-person-vcard text-secondary me-2" }),
                                      createTextVNode(toDisplayString("Profile"))
                                    ], 8, ["onClick"])
                                  ]),
                                  createVNode("li", { class: "list-group-item p-0 d-flex rounded-bottom" }, [
                                    createVNode("button", {
                                      onClick: ($event) => showUpdatePasswordModal(
                                        true
                                      ),
                                      class: "btn btn-sm border-0 w-100 card-bg-hover text-start"
                                    }, [
                                      createVNode("i", { class: "bi bi-key text-secondary me-2" }),
                                      createTextVNode(toDisplayString("Password"))
                                    ], 8, ["onClick"])
                                  ])
                                ])
                              ]),
                              auth_user.value.id == __props.profile.id ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "modal fade",
                                ref_key: "modalUpdateProfileRef",
                                ref: modalUpdateProfileRef,
                                tabindex: "-1"
                              }, [
                                createVNode("div", { class: "modal-dialog modal-dialog-centered px-3 px-lg-0" }, [
                                  createVNode("div", { class: "modal-content shadow mt-5" }, [
                                    createVNode("div", { class: "modal-header py-1 ps-3 pe-2" }, [
                                      createVNode("span", { class: "modal-title fs-5 text-primary-emphasis" }, [
                                        createVNode("i", { class: "bi bi-person-vcard border-secondary-subtle border-2 border-end pe-2" }),
                                        createTextVNode(" " + toDisplayString("Update Profile"))
                                      ]),
                                      createVNode("button", {
                                        type: "button",
                                        class: "btn btn-sm ms-auto",
                                        onClick: ($event) => showUpdateProfileModal(
                                          false
                                        )
                                      }, [
                                        createVNode("i", { class: "bi bi-x-lg" })
                                      ], 8, ["onClick"])
                                    ]),
                                    createVNode("form", {
                                      method: "post",
                                      onSubmit: withModifiers(($event) => handleSubmitUpdateProfile(), ["prevent"])
                                    }, [
                                      createVNode("div", { class: "modal-body bg-light" }, [
                                        createVNode("div", { class: "row justify-content-center" }, [
                                          createVNode("div", { class: "col-4 col-lg-3 d-flex" }, [
                                            createVNode("label", { class: "form-label d-inline-block my-auto" }, toDisplayString("Email"))
                                          ]),
                                          createVNode("div", { class: "col-8 col-lg-7" }, [
                                            createVNode("span", null, toDisplayString(__props.profile.email), 1)
                                          ])
                                        ]),
                                        createVNode("div", { class: "row justify-content-center mt-2" }, [
                                          createVNode("div", { class: "col-4 col-lg-3 d-flex" }, [
                                            createVNode("label", {
                                              for: "profile_name",
                                              class: "form-label d-inline-block my-auto"
                                            }, toDisplayString("Name"))
                                          ]),
                                          createVNode("div", { class: "col-8 col-lg-7" }, [
                                            withDirectives(createVNode("input", {
                                              id: "profile_name",
                                              type: "text",
                                              class: "form-control form-control-sm d-inline-block",
                                              "onUpdate:modelValue": ($event) => unref(formUpdateProfile).name = $event,
                                              required: ""
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [
                                                vModelText,
                                                unref(formUpdateProfile).name
                                              ]
                                            ]),
                                            createVNode(_sfc_main$2, {
                                              message: unref(formUpdateProfile).errors.name
                                            }, null, 8, ["message"])
                                          ])
                                        ]),
                                        createVNode("div", { class: "row justify-content-center mt-2" }, [
                                          createVNode("div", { class: "col-4 col-lg-3 d-flex" }, [
                                            createVNode("label", {
                                              for: "profile_phone",
                                              class: "form-label d-inline-block my-auto"
                                            }, toDisplayString("Phone"))
                                          ]),
                                          createVNode("div", { class: "col-8 col-lg-7" }, [
                                            withDirectives(createVNode("input", {
                                              id: "profile_phone",
                                              type: "tel",
                                              class: "form-control form-control-sm d-inline-block",
                                              "onUpdate:modelValue": ($event) => unref(formUpdateProfile).phone = $event,
                                              required: ""
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [
                                                vModelText,
                                                unref(formUpdateProfile).phone
                                              ]
                                            ]),
                                            createVNode(_sfc_main$2, {
                                              message: unref(formUpdateProfile).errors.phone
                                            }, null, 8, ["message"])
                                          ])
                                        ])
                                      ]),
                                      createVNode("div", { class: "modal-footer p-1" }, [
                                        createVNode("button", {
                                          type: "submit",
                                          class: "btn btn-sm btn-primary"
                                        }, toDisplayString("Update"))
                                      ])
                                    ], 40, ["onSubmit"])
                                  ])
                                ])
                              ], 512)) : createCommentVNode("", true),
                              auth_user.value.id == __props.profile.id ? (openBlock(), createBlock("div", {
                                key: 2,
                                class: "modal fade",
                                ref_key: "modalUpdatePasswordRef",
                                ref: modalUpdatePasswordRef,
                                tabindex: "-1"
                              }, [
                                createVNode("div", { class: "modal-dialog modal-dialog-centered px-3 px-lg-0" }, [
                                  createVNode("div", { class: "modal-content shadow mt-5" }, [
                                    createVNode("div", { class: "modal-header py-1 ps-3 pe-2" }, [
                                      createVNode("span", { class: "modal-title fs-5 text-primary-emphasis" }, [
                                        createVNode("i", { class: "bi bi-key border-secondary-subtle border-2 border-end pe-2" }),
                                        createTextVNode(" " + toDisplayString("Update Password"))
                                      ]),
                                      createVNode("button", {
                                        type: "button",
                                        class: "btn btn-sm ms-auto",
                                        onClick: ($event) => showUpdateProfileModal(
                                          false
                                        )
                                      }, [
                                        createVNode("i", { class: "bi bi-x-lg" })
                                      ], 8, ["onClick"])
                                    ]),
                                    createVNode("form", {
                                      method: "post",
                                      onSubmit: withModifiers(($event) => handleSubmitUpdatePassword(), ["prevent"])
                                    }, [
                                      createVNode("div", { class: "modal-body bg-light" }, [
                                        createVNode("div", { class: "row justify-content-center" }, [
                                          createVNode("div", { class: "col-10" }, [
                                            createVNode("span", {
                                              class: "text-secondary d-block",
                                              style: { "text-align": "justify" }
                                            }, toDisplayString("Be caution, you will update your password account. If you are forget, you can choose 'forget password' in the login or register page."))
                                          ])
                                        ]),
                                        createVNode("div", { class: "row justify-content-center mt-3" }, [
                                          createVNode("div", { class: "col-5 col-lg-4" }, [
                                            createVNode("label", {
                                              for: "old_password",
                                              class: "form-label my-1"
                                            }, "Old Password")
                                          ]),
                                          createVNode("div", { class: "col-7 col-lg-6" }, [
                                            createVNode("div", { class: "input-group input-group-sm" }, [
                                              withDirectives(createVNode("input", {
                                                type: "password",
                                                class: "form-control form-control-sm",
                                                id: "old_password",
                                                "onUpdate:modelValue": ($event) => unref(formUpdatePassword).old_password = $event,
                                                autocomplete: "password",
                                                required: ""
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [
                                                  vModelText,
                                                  unref(formUpdatePassword).old_password
                                                ]
                                              ]),
                                              createVNode("button", {
                                                type: "button",
                                                class: "btn bg-light text-secondary",
                                                onClick: ($event) => show_password(
                                                  "old_password",
                                                  "old_password_icon"
                                                )
                                              }, [
                                                createVNode("i", {
                                                  class: "bi bi-eye-slash-fill",
                                                  id: "old_password_icon"
                                                })
                                              ], 8, ["onClick"])
                                            ]),
                                            createVNode(_sfc_main$2, {
                                              message: unref(formUpdatePassword).errors.old_password
                                            }, null, 8, ["message"])
                                          ])
                                        ]),
                                        createVNode("div", { class: "row justify-content-center mt-3" }, [
                                          createVNode("div", { class: "col-5 col-lg-4" }, [
                                            createVNode("label", {
                                              for: "password",
                                              class: "form-label my-1"
                                            }, "New Password")
                                          ]),
                                          createVNode("div", { class: "col-7 col-lg-6" }, [
                                            createVNode("div", { class: "input-group input-group-sm" }, [
                                              withDirectives(createVNode("input", {
                                                type: "password",
                                                class: "form-control form-control-sm",
                                                id: "password",
                                                "onUpdate:modelValue": ($event) => unref(formUpdatePassword).password = $event,
                                                required: ""
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [
                                                  vModelText,
                                                  unref(formUpdatePassword).password
                                                ]
                                              ]),
                                              createVNode("button", {
                                                type: "button",
                                                class: "btn bg-light text-secondary",
                                                onClick: ($event) => show_password(
                                                  "password",
                                                  "password_icon"
                                                )
                                              }, [
                                                createVNode("i", {
                                                  class: "bi bi-eye-slash-fill",
                                                  id: "password_icon"
                                                })
                                              ], 8, ["onClick"])
                                            ]),
                                            createVNode(_sfc_main$2, {
                                              message: unref(formUpdatePassword).errors.password
                                            }, null, 8, ["message"])
                                          ])
                                        ]),
                                        createVNode("div", { class: "row justify-content-center mt-3" }, [
                                          createVNode("div", { class: "col-5 col-lg-4" }, [
                                            createVNode("label", {
                                              for: "password_confirmation",
                                              class: "form-label my-1"
                                            }, "Confirm Password")
                                          ]),
                                          createVNode("div", { class: "col-7 col-lg-6" }, [
                                            createVNode("div", { class: "input-group input-group-sm" }, [
                                              withDirectives(createVNode("input", {
                                                type: "password",
                                                class: "form-control form-control-sm",
                                                id: "password_confirmation",
                                                "onUpdate:modelValue": ($event) => unref(formUpdatePassword).password_confirmation = $event,
                                                required: ""
                                              }, null, 8, ["onUpdate:modelValue"]), [
                                                [
                                                  vModelText,
                                                  unref(formUpdatePassword).password_confirmation
                                                ]
                                              ]),
                                              createVNode("button", {
                                                type: "button",
                                                class: "btn bg-light text-secondary",
                                                onClick: ($event) => show_password(
                                                  "password_confirmation",
                                                  "password_confirmation_icon"
                                                )
                                              }, [
                                                createVNode("i", {
                                                  class: "bi bi-eye-slash-fill",
                                                  id: "password_confirmation_icon"
                                                })
                                              ], 8, ["onClick"])
                                            ]),
                                            createVNode(_sfc_main$2, {
                                              message: unref(formUpdatePassword).errors.password_confirmation
                                            }, null, 8, ["message"])
                                          ])
                                        ])
                                      ]),
                                      createVNode("div", { class: "modal-footer p-1" }, [
                                        createVNode("button", {
                                          type: "submit",
                                          class: "btn btn-sm btn-primary"
                                        }, toDisplayString("Update"))
                                      ])
                                    ], 40, ["onSubmit"])
                                  ])
                                ])
                              ], 512)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "row gx-3 justify-content-center" }, [
                              createVNode("div", { class: "col-5 col-lg-5 d-flex" }, [
                                createVNode("div", { class: "card position-relative my-3 ms-3 w-100" }, [
                                  createVNode("img", {
                                    src: "/storage/images/profile/" + (((_a2 = __props.profile) == null ? void 0 : _a2.profile_image) ?? "example.png"),
                                    alt: "image",
                                    class: "img-fluid w-100 h-100 object-fit-cover rounded border-secondary-subtle border-1 shadow placeholder",
                                    onLoad: unref(showImage),
                                    style: { "min-height": "200px" }
                                  }, null, 40, ["src", "onLoad"]),
                                  createVNode("a", {
                                    href: "/storage/images/profile/" + (((_b2 = __props.profile) == null ? void 0 : _b2.profile_image) ?? "example.png"),
                                    class: "btn btn-sm btn-primary border-0 shadow rounded-5 position-absolute end-0 bottom-0 mb-2 " + (auth_user.value.id !== __props.profile.id ? "me-2" : ""),
                                    style: { "font-size": "0.6rem", "padding": "0.15rem 0.34rem", "margin-right": "2.5rem" },
                                    download: ""
                                  }, [
                                    createVNode("i", { class: "bi bi-download" })
                                  ], 10, ["href"]),
                                  auth_user.value.id == __props.profile.id ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    onClick: ($event) => triggerFileUploadProfileImage(),
                                    class: "btn btn-sm btn-primary border-0 shadow rounded-5 position-absolute end-0 bottom-0 me-2 mb-2"
                                  }, [
                                    createVNode("i", { class: "bi bi-camera" })
                                  ], 8, ["onClick"])) : createCommentVNode("", true),
                                  createVNode("input", {
                                    ref_key: "inputProfileImageRef",
                                    ref: inputProfileImageRef,
                                    type: "file",
                                    class: "d-none",
                                    onChange: handleFileUploadProfileImage
                                  }, null, 40, ["onChange"])
                                ])
                              ]),
                              createVNode("div", { class: "col-10 col-lg-7" }, [
                                createVNode("div", { class: "d-flex" }, [
                                  createVNode("i", { class: "bi bi-person text-secondary d-lg-none fs-5 me-3 mt-1" }),
                                  createVNode("div", { class: "" }, [
                                    createVNode("p", {
                                      class: "text-secondary mb-0 mt-lg-3",
                                      style: { "font-size": "0.8rem" }
                                    }, toDisplayString("Name")),
                                    createVNode("p", { class: "text-secondary-emphasis" }, toDisplayString(__props.profile.name), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "d-flex" }, [
                                  createVNode("i", { class: "bi bi-person-badge text-secondary d-lg-none fs-5 me-3 mt-1" }),
                                  createVNode("div", null, [
                                    createVNode("p", {
                                      class: "text-secondary mb-0",
                                      style: { "font-size": "0.8rem" }
                                    }, toDisplayString("Role")),
                                    createVNode("p", { class: "text-secondary-emphasis" }, toDisplayString(__props.profile.roles.name), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "d-flex" }, [
                                  createVNode("i", { class: "bi bi-envelope-at text-secondary d-lg-none fs-5 me-3 mt-1" }),
                                  createVNode("div", null, [
                                    createVNode("p", {
                                      class: "text-secondary mb-0",
                                      style: { "font-size": "0.8rem" }
                                    }, toDisplayString("Email")),
                                    createVNode("p", { class: "text-secondary-emphasis" }, toDisplayString(__props.profile.email), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "d-flex" }, [
                                  createVNode("i", { class: "bi bi-whatsapp text-secondary d-lg-none fs-5 me-3 mt-1" }),
                                  createVNode("div", null, [
                                    createVNode("p", {
                                      class: "text-secondary mb-0",
                                      style: { "font-size": "0.8rem" }
                                    }, toDisplayString("Phone")),
                                    createVNode("p", { class: "text-secondary-emphasis" }, [
                                      createVNode("a", {
                                        href: "https://wa.me/+62" + __props.profile.phone.slice(1),
                                        target: "_blank",
                                        class: "text-decoration-none text-primary"
                                      }, [
                                        createVNode("i", { class: "bi bi-whatsapp d-none d-lg-inline" }),
                                        createTextVNode(" " + toDisplayString(__props.profile.phone), 1)
                                      ], 8, ["href"])
                                    ])
                                  ])
                                ])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "card p-3 mt-4 d-lg-none" }, [
                            createVNode("div", { class: "d-flex border-bottom border-secondary pb-1" }, [
                              createVNode("span", { class: "text-secondary" }, toDisplayString("Duties and Obligations"))
                            ]),
                            createVNode("div", { class: "d-flex mt-2" }, [
                              createVNode("button", {
                                class: "btn btn-sm",
                                onClick: ($event) => setTargetTab(2)
                              }, [
                                createVNode("div", { class: "d-flex" }, [
                                  createVNode("i", { class: "bi bi-journal-bookmark rounded-4 fs-1 text-primary border border-primary-subtle border-1 shadow-sm py-1 px-2 d-block mx-auto" })
                                ]),
                                createVNode("span", {
                                  class: "fw-light d-block mt-1",
                                  style: { "font-size": "0.8rem" }
                                }, toDisplayString("Logbook"))
                              ], 8, ["onClick"]),
                              createVNode("button", {
                                class: "ms-4 btn btn-sm",
                                onClick: ($event) => setTargetTab(3)
                              }, [
                                createVNode("div", { class: "d-flex" }, [
                                  createVNode("i", { class: "bi bi-journal-text rounded-4 fs-1 text-primary border border-primary-subtle border-1 shadow-sm py-1 px-2 mx-auto" })
                                ]),
                                createVNode("span", {
                                  class: "fw-light d-block mt-1",
                                  style: { "font-size": "0.8rem" }
                                }, toDisplayString("Contribution"))
                              ], 8, ["onClick"])
                            ])
                          ])
                        ], 2)) : createCommentVNode("", true)
                      ];
                    }),
                    _: 1
                  }, 8, ["onAfterLeave"]),
                  auth_user.value.id == __props.profile.id ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "col-lg-7 col-12"
                  }, [
                    createVNode("div", { class: "row gx-4" }, [
                      createVNode("div", { class: "col-lg-6 col-12" }, [
                        createVNode(Transition, {
                          name: "fade-slide-rtl",
                          onAfterLeave: ($event) => setActiveTab()
                        }, {
                          default: withCtx(() => [
                            activeTab.value == 2 || isLargeScreen.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "card p-3"
                            }, [
                              createVNode("div", { class: "d-flex border-bottom border-primary" }, [
                                createVNode("span", { class: "w-100 text-primary-emphasis h5" }, [
                                  createVNode("i", { class: "bi bi-journal-bookmark me-2 fs-6" }),
                                  createTextVNode(toDisplayString("Logbook"))
                                ]),
                                createVNode("button", {
                                  class: "btn btn-sm text-primary fw-light ms-auto p-0 d-lg-none d-flex",
                                  onClick: ($event) => setTargetTab(1)
                                }, [
                                  createVNode("i", { class: "bi bi-chevron-left" }),
                                  createTextVNode(" " + toDisplayString("Back"))
                                ], 8, ["onClick"])
                              ]),
                              createVNode("form", {
                                onSubmit: withModifiers(($event) => handleSubmitLogbook(), ["prevent"])
                              }, [
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode("div", { class: "form-floating" }, [
                                    withDirectives(createVNode("select", {
                                      class: "form-select border-0 border-bottom " + (unref(formAddLogbook).errors.program_id ? "is-invalid" : ""),
                                      id: "logbook_program",
                                      "aria-label": "Floating label select example",
                                      "onUpdate:modelValue": ($event) => unref(formAddLogbook).program_id = $event,
                                      required: ""
                                    }, [
                                      createVNode("option", {
                                        value: "null",
                                        selected: ""
                                      }, toDisplayString("Choose here")),
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.program_list, (program) => {
                                        var _a2;
                                        return openBlock(), createBlock("option", {
                                          value: program.program_id
                                        }, toDisplayString(((_a2 = program.program) == null ? void 0 : _a2.name) + " as " + program.title), 9, ["value"]);
                                      }), 256))
                                    ], 10, ["onUpdate:modelValue"]), [
                                      [
                                        vModelSelect,
                                        unref(formAddLogbook).program_id
                                      ]
                                    ]),
                                    createVNode("label", { for: "logbook_program" }, "Program")
                                  ]),
                                  createVNode(_sfc_main$2, {
                                    message: unref(formAddLogbook).errors.program_id
                                  }, null, 8, ["message"])
                                ]),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode("div", { class: "form-floating" }, [
                                    withDirectives(createVNode("input", {
                                      type: "date",
                                      class: "form-control border-0 border-bottom  " + (unref(formAddLogbook).errors.date_time ? "is-invalid" : ""),
                                      id: "logbook_date",
                                      "onUpdate:modelValue": ($event) => unref(formAddLogbook).date_time = $event
                                    }, null, 10, ["onUpdate:modelValue"]), [
                                      [
                                        vModelText,
                                        unref(formAddLogbook).date_time
                                      ]
                                    ]),
                                    createVNode("label", { for: "logbook_date" }, "Date & Time")
                                  ]),
                                  createVNode(_sfc_main$2, {
                                    message: unref(formAddLogbook).errors.date_time
                                  }, null, 8, ["message"])
                                ]),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode("div", { class: "form-floating" }, [
                                    createVNode("input", {
                                      type: "file",
                                      class: "form-control border-0 border-bottom  " + (unref(formAddLogbook).errors.image ? "is-invalid" : ""),
                                      id: "logbook_image",
                                      ref_key: "logbookImageRef",
                                      ref: logbookImageRef,
                                      onChange: handleFileUploadLogbookImage
                                    }, null, 42, ["onChange"]),
                                    createVNode("label", { for: "logbook_image" }, toDisplayString("Image Photo"))
                                  ]),
                                  createVNode(_sfc_main$2, {
                                    message: unref(formAddLogbook).errors.image
                                  }, null, 8, ["message"])
                                ]),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode("div", { class: "form-floating" }, [
                                    withDirectives(createVNode("textarea", {
                                      class: "form-control border-0 border-bottom",
                                      id: "logbook_description",
                                      style: { "height": "84px" },
                                      "onUpdate:modelValue": ($event) => unref(formAddLogbook).description = $event,
                                      placeholder: "Add description of your activities"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [
                                        vModelText,
                                        unref(formAddLogbook).description
                                      ]
                                    ]),
                                    createVNode("label", { for: "logbook_description" }, toDisplayString("Description"))
                                  ]),
                                  createVNode(_sfc_main$2, {
                                    message: unref(formAddLogbook).errors.description
                                  }, null, 8, ["message"])
                                ]),
                                createVNode("div", { class: "mt-3" }, [
                                  createVNode("button", {
                                    type: "submit",
                                    class: "btn btn-sm btn-primary w-100"
                                  }, toDisplayString("Add Logbook"))
                                ])
                              ], 40, ["onSubmit"]),
                              createVNode("div", { class: "mt-2" }, [
                                createVNode("div", { class: "d-flex" }, [
                                  createVNode("button", {
                                    class: "btn btn-sm border-0 ms-auto text-primary text-decoration-none p-0",
                                    style: { "font-size": "0.7rem" },
                                    "data-bs-toggle": "collapse",
                                    "data-bs-target": "#programListCollapse"
                                  }, toDisplayString("check my logbook"))
                                ]),
                                createVNode("div", {
                                  class: "collapse",
                                  id: "programListCollapse"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.program_list, (program) => {
                                    var _a2;
                                    return openBlock(), createBlock("a", {
                                      href: _ctx.route("checkLogbook", [
                                        program.program_id,
                                        auth_user.value.id
                                      ]),
                                      class: "text-decoration-none "
                                    }, [
                                      createVNode("div", {
                                        class: "d-flex " + (__props.program_list.indexOf(
                                          program
                                        ) > 0 ? "mt-2" : ""),
                                        style: { "font-size": "0.8rem" }
                                      }, [
                                        createVNode("span", { class: "text-secondary" }, toDisplayString(((_a2 = program.program) == null ? void 0 : _a2.name) ?? program.program_id), 1),
                                        createVNode("span", { class: "fw-light text-secondary mx-2" }, toDisplayString("as")),
                                        createVNode("span", { class: "fw-light text-primary" }, toDisplayString(program.title), 1),
                                        createVNode("i", { class: "bi bi-box-arrow-up-right ms-1 text-primary" })
                                      ], 2)
                                    ], 8, ["href"]);
                                  }), 256))
                                ])
                              ])
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }, 8, ["onAfterLeave"])
                      ]),
                      createVNode("div", { class: "col-lg-6 col-12" }, [
                        createVNode(Transition, {
                          name: "fade-slide-rtl",
                          onAfterLeave: ($event) => setActiveTab()
                        }, {
                          default: withCtx(() => {
                            var _a2, _b2, _c2, _d2, _e2;
                            return [
                              activeTab.value == 3 || isLargeScreen.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "card p-3"
                              }, [
                                createVNode("div", { class: "d-flex border-bottom border-primary" }, [
                                  createVNode("span", { class: "w-100 text-primary-emphasis h5" }, [
                                    createVNode("i", { class: "bi bi-journal-text me-2 fs-6" }),
                                    createTextVNode(toDisplayString("Contribution"))
                                  ]),
                                  createVNode("button", {
                                    class: "btn btn-sm text-primary fw-light ms-auto p-0 d-lg-none d-flex",
                                    onClick: ($event) => setTargetTab(1)
                                  }, [
                                    createVNode("i", { class: "bi bi-chevron-left mb-0" }),
                                    createTextVNode(" " + toDisplayString("Back"))
                                  ], 8, ["onClick"])
                                ]),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode("span", {
                                    class: "text-secondary",
                                    style: { "font-size": "0.8rem" }
                                  }, toDisplayString("Your progress :"))
                                ]),
                                createVNode("div", { class: "mt-1" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.contribution_settings.period, (month) => {
                                    var _a3, _b3, _c3, _d3;
                                    return openBlock(), createBlock("div", {
                                      class: "btn shadow-sm px-1 py-0 me-1 " + (month + ((_a3 = __props.contribution_settings) == null ? void 0 : _a3.start) - 1 <= thisMonth.value && month > (__props.contribution ? (_b3 = __props.contribution) == null ? void 0 : _b3.months : 0) ? "bg-danger bg-opacity-25" : "") + (month <= ((_c3 = __props.contribution) == null ? void 0 : _c3.months) ? "bg-primary bg-opacity-25" : "bg-secondary bg-opacity-25 border-dark-subtle border-1")
                                    }, [
                                      createVNode("span", {
                                        style: { "font-size": "0.7rem" },
                                        class: "position-relative " + (month <= ((_d3 = __props.contribution) == null ? void 0 : _d3.months) ? "text-primary " : "text-secondary ")
                                      }, toDisplayString(unref(getMonthName)(
                                        month + __props.contribution_settings.start - 1,
                                        "short"
                                      )), 3)
                                    ], 2);
                                  }), 256))
                                ]),
                                createVNode("div", { class: "mt-2 d-flex" }, [
                                  createVNode("span", {
                                    class: "text-secondary me-2",
                                    style: { "font-size": "0.8rem" }
                                  }, toDisplayString("Status :"))
                                ]),
                                createVNode("div", { class: "mt-1" }, [
                                  createVNode("span", { class: "text-secondary" }, toDisplayString(__props.contribution_settings.start + (__props.contribution ? __props.contribution.months - 1 : 0) <= thisMonth.value ? "You have unpaid bill for " + (thisMonth.value - ((_a2 = __props.contribution_settings) == null ? void 0 : _a2.start) - (__props.contribution ? __props.contribution.months - 1 : -1) + (thisMonth.value - ((_b2 = __props.contribution_settings) == null ? void 0 : _b2.start) - (__props.contribution ? __props.contribution.months - 1 : -1) > 1 ? " months" : " month")) : "You are on track."), 1)
                                ]),
                                createVNode("form", {
                                  onSubmit: withModifiers(($event) => handleSubmitContribution(), ["prevent"])
                                }, [
                                  createVNode("div", { class: "mt-3 border-top border-primary" }, [
                                    createVNode("div", { class: "form-floating" }, [
                                      withDirectives(createVNode("select", {
                                        class: "form-select border-0 border-bottom " + (unref(formAddContribution).errors.month ? "is-invalid" : ""),
                                        id: "contribution_month",
                                        "aria-label": "Floating label select example",
                                        "onUpdate:modelValue": ($event) => unref(formAddContribution).month = $event,
                                        required: ""
                                      }, [
                                        createVNode("option", {
                                          value: "null",
                                          selected: ""
                                        }, toDisplayString("Choose here")),
                                        (openBlock(true), createBlock(Fragment, null, renderList(((_c2 = __props.contribution_settings) == null ? void 0 : _c2.period) - (__props.contribution ? (_d2 = __props.contribution) == null ? void 0 : _d2.months : 0), (month) => {
                                          return openBlock(), createBlock("option", {
                                            value: month,
                                            class: "position-relative"
                                          }, toDisplayString(month + (month > 1 ? " months" : " month")), 9, ["value"]);
                                        }), 256))
                                      ], 10, ["onUpdate:modelValue"]), [
                                        [
                                          vModelSelect,
                                          unref(formAddContribution).month
                                        ]
                                      ]),
                                      createVNode("label", { for: "contribution_month" }, toDisplayString("Pay for"))
                                    ]),
                                    createVNode(_sfc_main$2, {
                                      message: unref(formAddContribution).errors.month
                                    }, null, 8, ["message"])
                                  ]),
                                  createVNode("div", { class: "mt-2" }, [
                                    createVNode("div", { class: "form-floating" }, [
                                      createVNode("input", {
                                        type: "file",
                                        class: "form-control border-0 border-bottom  " + (unref(formAddContribution).errors.receipt ? "is-invalid" : ""),
                                        id: "contribution_receipt",
                                        ref_key: "contributionReceiptRef",
                                        ref: contributionReceiptRef,
                                        onChange: handleFileUploadContributionReceipt
                                      }, null, 42, ["onChange"]),
                                      createVNode("label", { for: "contribution_receipt" }, toDisplayString("Receipt"))
                                    ]),
                                    createVNode(_sfc_main$2, {
                                      message: unref(formAddContribution).errors.receipt
                                    }, null, 8, ["message"])
                                  ]),
                                  createVNode("div", { class: "mt-2 d-flex" }, [
                                    createVNode("span", { class: "ms-auto text-secondary" }, toDisplayString("Price : ")),
                                    createVNode("span", { class: "text-dark ms-2" }, toDisplayString(unref(formatIDR)(
                                      ((_e2 = __props.contribution_settings) == null ? void 0 : _e2.price) * unref(formAddContribution).month
                                    )), 1)
                                  ]),
                                  createVNode("div", { class: "mt-3" }, [
                                    createVNode("button", {
                                      type: "submit",
                                      class: "btn btn-sm btn-primary w-100"
                                    }, toDisplayString("Add Contribution"))
                                  ])
                                ], 40, ["onSubmit"]),
                                createVNode("div", { class: "mt-2 d-flex" }, [
                                  createVNode("a", {
                                    class: "ms-auto text-primary text-decoration-none",
                                    style: { "font-size": "0.7rem" },
                                    href: _ctx.route(
                                      "checkContribution",
                                      auth_user.value.id
                                    )
                                  }, [
                                    createTextVNode(toDisplayString("check my contribution") + " "),
                                    createVNode("i", { class: "bi bi-box-arrow-up-right ms-1" })
                                  ], 8, ["href"])
                                ])
                              ])) : createCommentVNode("", true)
                            ];
                          }),
                          _: 1
                        }, 8, ["onAfterLeave"])
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
