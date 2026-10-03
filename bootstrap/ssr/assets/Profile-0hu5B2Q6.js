import { computed, ref, watch, withCtx, unref, createVNode, Transition, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, withModifiers, withDirectives, vModelText, Fragment, renderList, vModelSelect, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrRenderList, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-6jqdAWGT.js";
import { _ as _sfc_main$2 } from "./InputError-DkffFxkw.js";
import { _ as _sfc_main$3 } from "./Notif-Zffab37M.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CzGDjmDO.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { b as formatDateOnly, g as getMonthName, f as formatIDR, s as showImage } from "./utils-CBRgzR_O.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
import "date-fns";
const _sfc_main = {
  __name: "Profile",
  __ssrInlineRender: true,
  props: {
    section: { type: String, default: "profile" },
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
      if (props.section === "logbook") return "Logbook Saya";
      if (props.section === "iwp") return "Pembayaran IWP";
      return "Profil " + props.profile.name;
    });
    const modalConfirmationRef = ref(null);
    const toastNotifRef = ref(null);
    const modalUpdateProfileRef = ref(null);
    const modalUpdateProfile = ref(null);
    const modalUpdatePasswordRef = ref(null);
    const modalUpdatePassword = ref(null);
    const inputProfileImageRef = ref(null);
    const logbookImageRef = ref(null);
    const modalLogbookImageRef = ref(null);
    const selectedLogbookImage = ref(null);
    const isLogbookOpen = ref(false);
    function openLogbookImage(src) {
      selectedLogbookImage.value = src;
      if (typeof bootstrap !== "undefined" && modalLogbookImageRef.value) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalLogbookImageRef.value);
        modal.show();
      }
    }
    const contributionReceiptRef = ref(null);
    const thisMonth = computed(() => {
      return (/* @__PURE__ */ new Date()).getMonth() + 1;
    });
    const formUpdateProfile = useForm({
      name: props.profile.name,
      phone: props.profile.phone,
      birth_date: props.profile.birth_date,
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
      formUpdateProfile.post("/seeo/staff/profile/update", {
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
      formUpdatePassword.post("/seeo/staff/profile/password", {
        onSuccess: () => {
          showUpdatePasswordModal(false);
          formUpdatePassword.reset();
        }
      });
    }
    function handleSubmitLogbook() {
      formAddLogbook.post("/seeo/staff/logbook/add", {
        onSuccess: () => {
          formAddLogbook.reset();
          if (logbookImageRef.value) {
            logbookImageRef.value.value = "";
          }
        }
      });
    }
    function handleSubmitContribution() {
      formAddContribution.post("/seeo/staff/contribution/insert", {
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
    watch(
      () => props.notif,
      (newValue) => {
        var _a;
        if (newValue) (_a = toastNotifRef.value) == null ? void 0 : _a.showToast(newValue.type, newValue.message);
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
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: title.value,
              icon: _ctx.$imageUrl("apps/logo.png")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="${ssrRenderClass([{ "profile-feature-page": __props.section !== "profile" }, "container profile-page mb-5"])}" data-v-1889a6ad${_scopeId}><div class="row gx-3 gy-3 mt-1 mt-md-3 profile-grid" data-v-1889a6ad${_scopeId}>`);
            if (__props.section === "profile") {
              _push2(`<div class="col-12 col-xl-9 mx-auto" data-v-1889a6ad${_scopeId}><div id="profile-summary" class="card position-relative profile-summary-card" data-v-1889a6ad${_scopeId}><div class="dropdown" data-v-1889a6ad${_scopeId}>`);
              if (auth_user.value.roles_id == 99 || auth_user.value.id == __props.profile.id) {
                _push2(`<button data-bs-toggle="dropdown" aria-expanded="false" class="btn btn-sm btn-outline-secondary inset-e-0 top-0 position-absolute mt-1 me-1 border-0" data-v-1889a6ad${_scopeId}><i class="bi bi-gear-fill" data-v-1889a6ad${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="dropdown-menu dropdown-menu-end p-0 shadow" data-v-1889a6ad${_scopeId}><ul class="list-group list-group-flush" data-v-1889a6ad${_scopeId}><li class="list-group-item p-0 d-flex rounded-top" data-v-1889a6ad${_scopeId}><button class="btn btn-sm border-0 w-100 card-bg-hover text-start" data-v-1889a6ad${_scopeId}><i class="bi bi-person-vcard text-secondary me-2" data-v-1889a6ad${_scopeId}></i>${ssrInterpolate("Profile")}</button></li><li class="list-group-item p-0 d-flex rounded-bottom" data-v-1889a6ad${_scopeId}><button class="btn btn-sm border-0 w-100 card-bg-hover text-start" data-v-1889a6ad${_scopeId}><i class="bi bi-key text-secondary me-2" data-v-1889a6ad${_scopeId}></i>${ssrInterpolate("Password")}</button></li></ul></div>`);
              if (auth_user.value.roles_id == 99 || auth_user.value.id == __props.profile.id) {
                _push2(`<div class="modal fade" tabindex="-1" data-v-1889a6ad${_scopeId}><div class="modal-dialog modal-dialog-centered px-3 px-lg-0" data-v-1889a6ad${_scopeId}><div class="modal-content shadow mt-5" data-v-1889a6ad${_scopeId}><div class="modal-header py-1 ps-3 pe-2" data-v-1889a6ad${_scopeId}><span class="modal-title fs-5 text-primary-emphasis" data-v-1889a6ad${_scopeId}><i class="bi bi-person-vcard border-secondary-subtle border-2 border-end pe-2" data-v-1889a6ad${_scopeId}></i> ${ssrInterpolate("Update Profile")}</span><button type="button" class="btn btn-sm ms-auto" data-v-1889a6ad${_scopeId}><i class="bi bi-x-lg" data-v-1889a6ad${_scopeId}></i></button></div><form method="post" data-v-1889a6ad${_scopeId}><div class="modal-body bg-light" data-v-1889a6ad${_scopeId}><div class="row justify-content-center" data-v-1889a6ad${_scopeId}><div class="col-4 col-lg-3 d-flex" data-v-1889a6ad${_scopeId}><label class="form-label d-inline-block my-auto" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Email")}</label></div><div class="col-8 col-lg-7" data-v-1889a6ad${_scopeId}><span data-v-1889a6ad${_scopeId}>${ssrInterpolate(__props.profile.email)}</span></div></div><div class="row justify-content-center mt-2" data-v-1889a6ad${_scopeId}><div class="col-4 col-lg-3 d-flex" data-v-1889a6ad${_scopeId}><label for="profile_name" class="form-label d-inline-block my-auto" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Name")}</label></div><div class="col-8 col-lg-7" data-v-1889a6ad${_scopeId}><input id="profile_name" type="text" class="form-control form-control-sm d-inline-block"${ssrRenderAttr(
                  "value",
                  unref(formUpdateProfile).name
                )} required data-v-1889a6ad${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formUpdateProfile).errors.name
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="row justify-content-center mt-2" data-v-1889a6ad${_scopeId}><div class="col-4 col-lg-3 d-flex" data-v-1889a6ad${_scopeId}><label for="profile_phone" class="form-label d-inline-block my-auto" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Phone")}</label></div><div class="col-8 col-lg-7" data-v-1889a6ad${_scopeId}><input id="profile_phone" type="tel" class="form-control form-control-sm d-inline-block"${ssrRenderAttr(
                  "value",
                  unref(formUpdateProfile).phone
                )} required data-v-1889a6ad${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formUpdateProfile).errors.phone
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="row justify-content-center mt-2" data-v-1889a6ad${_scopeId}><div class="col-4 col-lg-3 d-flex" data-v-1889a6ad${_scopeId}><label for="profile_birth_date" class="form-label d-inline-block my-auto" data-v-1889a6ad${_scopeId}>Birthday</label></div><div class="col-8 col-lg-7" data-v-1889a6ad${_scopeId}><input id="profile_birth_date" type="date" class="form-control form-control-sm d-inline-block"${ssrRenderAttr(
                  "value",
                  unref(formUpdateProfile).birth_date
                )} data-v-1889a6ad${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formUpdateProfile).errors.birth_date
                }, null, _parent2, _scopeId));
                _push2(`</div></div></div><div class="modal-footer p-1" data-v-1889a6ad${_scopeId}><button type="submit" class="btn btn-sm btn-primary" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Update")}</button></div></form></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (auth_user.value.roles_id == 99 || auth_user.value.id == __props.profile.id) {
                _push2(`<div class="modal fade" tabindex="-1" aria-labelledby="modalUpdatePasswordTitle" aria-hidden="true" data-v-1889a6ad${_scopeId}><div class="modal-dialog modal-dialog-centered px-3 px-lg-0" data-v-1889a6ad${_scopeId}><div class="modal-content border-0 shadow-lg rounded-3 overflow-hidden" data-v-1889a6ad${_scopeId}><div class="modal-header bg-light border-bottom py-2.5 px-3" data-v-1889a6ad${_scopeId}><div class="d-flex align-items-center gap-2" data-v-1889a6ad${_scopeId}><div class="rounded-circle bg-warning-subtle text-warning d-flex align-items-center justify-content-center" style="${ssrRenderStyle({ "width": "32px", "height": "32px" })}" data-v-1889a6ad${_scopeId}><i class="bi bi-key-fill" data-v-1889a6ad${_scopeId}></i></div><div data-v-1889a6ad${_scopeId}><h6 class="modal-title fw-bold text-dark mb-0" id="modalUpdatePasswordTitle" data-v-1889a6ad${_scopeId}> Ganti Kata Sandi </h6><small class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.75rem" })}" data-v-1889a6ad${_scopeId}> Perbarui kata sandi akun Anda </small></div></div><button type="button" class="btn-close" aria-label="Close" data-v-1889a6ad${_scopeId}></button></div><form method="post" data-v-1889a6ad${_scopeId}><div class="modal-body p-3 p-md-4" data-v-1889a6ad${_scopeId}><div class="alert alert-info py-2 px-3 small d-flex align-items-start gap-2 mb-3 rounded-2" data-v-1889a6ad${_scopeId}><i class="bi bi-info-circle-fill text-info mt-0.5" data-v-1889a6ad${_scopeId}></i><span data-v-1889a6ad${_scopeId}>Pastikan kata sandi baru Anda minimal 8 karakter dan belum pernah digunakan sebelumnya.</span></div><div class="mb-3" data-v-1889a6ad${_scopeId}><label for="old_password" class="form-label small fw-semibold text-secondary mb-1" data-v-1889a6ad${_scopeId}> Kata Sandi Saat Ini <span class="text-danger" data-v-1889a6ad${_scopeId}>*</span></label><div class="input-group" data-v-1889a6ad${_scopeId}><span class="input-group-text bg-light text-secondary border-end-0" data-v-1889a6ad${_scopeId}><i class="bi bi-lock" data-v-1889a6ad${_scopeId}></i></span><input type="password" class="form-control border-start-0 border-end-0" id="old_password"${ssrRenderAttr("value", unref(formUpdatePassword).old_password)} placeholder="Masukkan kata sandi saat ini" autocomplete="current-password" required data-v-1889a6ad${_scopeId}><button type="button" class="btn btn-outline-secondary border-start-0" data-v-1889a6ad${_scopeId}><i class="bi bi-eye-slash-fill" id="old_password_icon" data-v-1889a6ad${_scopeId}></i></button></div>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formUpdatePassword).errors.old_password,
                  class: "mt-1"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="mb-3" data-v-1889a6ad${_scopeId}><label for="password" class="form-label small fw-semibold text-secondary mb-1" data-v-1889a6ad${_scopeId}> Kata Sandi Baru <span class="text-danger" data-v-1889a6ad${_scopeId}>*</span></label><div class="input-group" data-v-1889a6ad${_scopeId}><span class="input-group-text bg-light text-secondary border-end-0" data-v-1889a6ad${_scopeId}><i class="bi bi-shield-lock" data-v-1889a6ad${_scopeId}></i></span><input type="password" class="form-control border-start-0 border-end-0" id="password"${ssrRenderAttr("value", unref(formUpdatePassword).password)} placeholder="Minimal 8 karakter" autocomplete="new-password" required data-v-1889a6ad${_scopeId}><button type="button" class="btn btn-outline-secondary border-start-0" data-v-1889a6ad${_scopeId}><i class="bi bi-eye-slash-fill" id="password_icon" data-v-1889a6ad${_scopeId}></i></button></div>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formUpdatePassword).errors.password,
                  class: "mt-1"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="mb-2" data-v-1889a6ad${_scopeId}><label for="password_confirmation" class="form-label small fw-semibold text-secondary mb-1" data-v-1889a6ad${_scopeId}> Konfirmasi Kata Sandi Baru <span class="text-danger" data-v-1889a6ad${_scopeId}>*</span></label><div class="input-group" data-v-1889a6ad${_scopeId}><span class="input-group-text bg-light text-secondary border-end-0" data-v-1889a6ad${_scopeId}><i class="bi bi-check2-circle" data-v-1889a6ad${_scopeId}></i></span><input type="password" class="form-control border-start-0 border-end-0" id="password_confirmation"${ssrRenderAttr("value", unref(formUpdatePassword).password_confirmation)} placeholder="Ketik ulang kata sandi baru" autocomplete="new-password" required data-v-1889a6ad${_scopeId}><button type="button" class="btn btn-outline-secondary border-start-0" data-v-1889a6ad${_scopeId}><i class="bi bi-eye-slash-fill" id="password_confirmation_icon" data-v-1889a6ad${_scopeId}></i></button></div>`);
                _push2(ssrRenderComponent(_sfc_main$2, {
                  message: unref(formUpdatePassword).errors.password_confirmation,
                  class: "mt-1"
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="modal-footer bg-light py-2 px-3 border-top d-flex justify-content-end gap-2" data-v-1889a6ad${_scopeId}><button type="button" class="btn btn-sm btn-outline-secondary px-3" data-v-1889a6ad${_scopeId}> Batal </button><button type="submit" class="btn btn-sm btn-primary px-3 d-inline-flex align-items-center gap-1.5"${ssrIncludeBooleanAttr(unref(formUpdatePassword).processing) ? " disabled" : ""} data-v-1889a6ad${_scopeId}>`);
                if (unref(formUpdatePassword).processing) {
                  _push2(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" data-v-1889a6ad${_scopeId}></span>`);
                } else {
                  _push2(`<i class="bi bi-check-lg" data-v-1889a6ad${_scopeId}></i>`);
                }
                _push2(`<span data-v-1889a6ad${_scopeId}>Simpan Kata Sandi</span></button></div></form></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="row gx-3 justify-content-center" data-v-1889a6ad${_scopeId}><div class="col-12 col-sm-5 col-lg-5 d-flex" data-v-1889a6ad${_scopeId}><div class="profile-photo-card position-relative mx-3 mt-3 mb-2 mx-sm-0 ms-sm-3 mb-sm-3 w-100" data-v-1889a6ad${_scopeId}><img${ssrRenderAttr(
                "src",
                "/storage/images/profile/" + (((_a = __props.profile) == null ? void 0 : _a.profile_image) ?? "example.png")
              )} alt="image" class="img-fluid w-100 h-100 object-fit-cover rounded border-secondary-subtle border shadow placeholder" style="${ssrRenderStyle({ "min-height": "200px" })}" data-v-1889a6ad${_scopeId}><a${ssrRenderAttr(
                "href",
                "/storage/images/profile/" + (((_b = __props.profile) == null ? void 0 : _b.profile_image) ?? "example.png")
              )} class="${ssrRenderClass(
                "btn btn-sm btn-primary border-0 shadow rounded-5 position-absolute inset-e-0 bottom-0 mb-2 " + (auth_user.value.id !== __props.profile.id ? "me-2" : "")
              )}" style="${ssrRenderStyle({ "font-size": "0.6rem", "padding": "0.15rem 0.34rem", "margin-right": "2.5rem" })}" download data-v-1889a6ad${_scopeId}><i class="bi bi-download" data-v-1889a6ad${_scopeId}></i></a>`);
              if (auth_user.value.roles_id == 99 || auth_user.value.id == __props.profile.id) {
                _push2(`<button class="btn btn-sm btn-primary border-0 shadow rounded-5 position-absolute inset-e-0 bottom-0 me-2 mb-2" data-v-1889a6ad${_scopeId}><i class="bi bi-camera" data-v-1889a6ad${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<input type="file" class="d-none" data-v-1889a6ad${_scopeId}></div></div><div class="col-12 col-sm-7 col-lg-7 px-4 px-sm-3 pb-3 pb-sm-0" data-v-1889a6ad${_scopeId}><div class="d-flex" data-v-1889a6ad${_scopeId}><i class="bi bi-person text-secondary d-lg-none fs-5 me-3 mt-1" data-v-1889a6ad${_scopeId}></i><div class="" data-v-1889a6ad${_scopeId}><p class="text-secondary mb-0 mt-lg-3" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Name")}</p><p class="text-secondary-emphasis" data-v-1889a6ad${_scopeId}>${ssrInterpolate(__props.profile.name)}</p></div></div><div class="d-flex" data-v-1889a6ad${_scopeId}><i class="bi bi-person-badge text-secondary d-lg-none fs-5 me-3 mt-1" data-v-1889a6ad${_scopeId}></i><div data-v-1889a6ad${_scopeId}><p class="text-secondary mb-0" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Role")}</p><p class="text-secondary-emphasis" data-v-1889a6ad${_scopeId}>${ssrInterpolate((_c = __props.profile.roles) == null ? void 0 : _c.name)}</p></div></div><div class="d-flex" data-v-1889a6ad${_scopeId}><i class="bi bi-envelope-at text-secondary d-lg-none fs-5 me-3 mt-1" data-v-1889a6ad${_scopeId}></i><div data-v-1889a6ad${_scopeId}><p class="text-secondary mb-0" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Email")}</p><p class="text-secondary-emphasis" data-v-1889a6ad${_scopeId}>${ssrInterpolate(__props.profile.email)}</p></div></div><div class="d-flex" data-v-1889a6ad${_scopeId}><i class="bi bi-whatsapp text-secondary d-lg-none fs-5 me-3 mt-1" data-v-1889a6ad${_scopeId}></i><div data-v-1889a6ad${_scopeId}><p class="text-secondary mb-0" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Phone")}</p>`);
              if (__props.profile.phone) {
                _push2(`<p class="text-secondary-emphasis" data-v-1889a6ad${_scopeId}><a${ssrRenderAttr(
                  "href",
                  "https://wa.me/+62" + __props.profile.phone.slice(1)
                )} target="_blank" class="text-decoration-none text-primary" data-v-1889a6ad${_scopeId}><i class="bi bi-whatsapp d-none d-lg-inline" data-v-1889a6ad${_scopeId}></i> ${ssrInterpolate(__props.profile.phone)}</a></p>`);
              } else {
                _push2(`<p class="text-muted small" data-v-1889a6ad${_scopeId}>Belum diatur</p>`);
              }
              _push2(`</div></div>`);
              if (auth_user.value.roles_id == 99 || auth_user.value.id == __props.profile.id) {
                _push2(`<div class="d-flex flex-wrap gap-2 mt-4 pt-3 border-top" data-v-1889a6ad${_scopeId}><button type="button" class="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1.5 px-3 py-1.5 rounded-2" data-v-1889a6ad${_scopeId}><i class="bi bi-pencil-square" data-v-1889a6ad${_scopeId}></i><span data-v-1889a6ad${_scopeId}>Edit Profil</span></button><button type="button" class="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1.5 px-3 py-1.5 rounded-2" data-v-1889a6ad${_scopeId}><i class="bi bi-key-fill text-warning" data-v-1889a6ad${_scopeId}></i><span data-v-1889a6ad${_scopeId}>Ganti Password</span></button></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
              if (auth_user.value.roles_id == 99 || auth_user.value.id == __props.profile.id) {
                _push2(`<div class="card mt-3 border-0 shadow-sm rounded-3 p-3 p-md-4 bg-white" data-v-1889a6ad${_scopeId}><div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom" data-v-1889a6ad${_scopeId}><h6 class="fw-bold text-dark mb-0 d-flex align-items-center gap-2" data-v-1889a6ad${_scopeId}><i class="bi bi-shield-lock-fill text-primary" data-v-1889a6ad${_scopeId}></i> Keamanan Akun &amp; Kata Sandi </h6><span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2.5 py-1 small" data-v-1889a6ad${_scopeId}> Keamanan </span></div><div class="row align-items-center g-3" data-v-1889a6ad${_scopeId}><div class="col-12 col-md-8" data-v-1889a6ad${_scopeId}><p class="small text-secondary mb-0" data-v-1889a6ad${_scopeId}> Ganti kata sandi secara berkala untuk menjaga akun Anda tetap aman. Kata sandi minimal 8 karakter dengan kombinasi huruf besar, huruf kecil, dan angka. </p></div><div class="col-12 col-md-4 text-md-end" data-v-1889a6ad${_scopeId}><button type="button" class="btn btn-primary btn-sm d-inline-flex align-items-center gap-2 px-3 py-2 rounded-2 fw-semibold shadow-2xs" data-v-1889a6ad${_scopeId}><i class="bi bi-key-fill" data-v-1889a6ad${_scopeId}></i><span data-v-1889a6ad${_scopeId}>Ganti Password</span></button></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.section !== "profile" && (auth_user.value.roles_id == 99 || auth_user.value.id == __props.profile.id)) {
              _push2(`<div class="col-12 profile-obligations" data-v-1889a6ad${_scopeId}><div class="row gx-3 gy-3" data-v-1889a6ad${_scopeId}><div class="col-12" data-v-1889a6ad${_scopeId}>`);
              if (__props.section === "logbook") {
                _push2(`<div id="logbook-upload" class="card p-3 obligation-card" data-v-1889a6ad${_scopeId}><div class="d-flex" data-v-1889a6ad${_scopeId}><span class="w-100 text-primary-emphasis h5" data-v-1889a6ad${_scopeId}><i class="bi bi-journal-bookmark me-2 fs-6" data-v-1889a6ad${_scopeId}></i>${ssrInterpolate("Logbook")}</span></div>`);
                if (auth_user.value.id == __props.profile.id) {
                  _push2(`<form data-v-1889a6ad${_scopeId}><div class="mt-2" data-v-1889a6ad${_scopeId}><div class="form-floating" data-v-1889a6ad${_scopeId}><select class="${ssrRenderClass(
                    "form-select border-0 border-bottom " + (unref(formAddLogbook).errors.program_id ? "is-invalid" : "")
                  )}" id="logbook_program" aria-label="Floating label select example" required data-v-1889a6ad${_scopeId}><option value="null" selected data-v-1889a6ad${_scopeId}>${ssrInterpolate("Choose here")}</option><!--[-->`);
                  ssrRenderList(__props.program_list, (program) => {
                    var _a2;
                    _push2(`<option${ssrRenderAttr(
                      "value",
                      program.program_id
                    )} data-v-1889a6ad${ssrIncludeBooleanAttr(Array.isArray(
                      unref(formAddLogbook).program_id
                    ) ? ssrLooseContain(
                      unref(formAddLogbook).program_id,
                      program.program_id
                    ) : ssrLooseEqual(
                      unref(formAddLogbook).program_id,
                      program.program_id
                    )) ? " selected" : ""}${_scopeId}>${ssrInterpolate(((_a2 = program.program) == null ? void 0 : _a2.name) + " as " + program.title)}</option>`);
                  });
                  _push2(`<!--]--></select><label for="logbook_program" data-v-1889a6ad${_scopeId}>Program</label></div>`);
                  _push2(ssrRenderComponent(_sfc_main$2, {
                    message: unref(formAddLogbook).errors.program_id
                  }, null, _parent2, _scopeId));
                  _push2(`</div><div class="mt-2" data-v-1889a6ad${_scopeId}><div class="form-floating" data-v-1889a6ad${_scopeId}><input type="date" class="${ssrRenderClass(
                    "form-control border-0 border-bottom  " + (unref(formAddLogbook).errors.date_time ? "is-invalid" : "")
                  )}" id="logbook_date"${ssrRenderAttr(
                    "value",
                    unref(formAddLogbook).date_time
                  )} data-v-1889a6ad${_scopeId}><label for="logbook_date" data-v-1889a6ad${_scopeId}>Date &amp; Time</label></div>`);
                  _push2(ssrRenderComponent(_sfc_main$2, {
                    message: unref(formAddLogbook).errors.date_time
                  }, null, _parent2, _scopeId));
                  _push2(`</div><div class="mt-2" data-v-1889a6ad${_scopeId}><div class="form-floating" data-v-1889a6ad${_scopeId}><input type="file" class="${ssrRenderClass(
                    "form-control border-0 border-bottom  " + (unref(formAddLogbook).errors.image ? "is-invalid" : "")
                  )}" id="logbook_image" data-v-1889a6ad${_scopeId}><label for="logbook_image" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Image Photo")}</label></div>`);
                  _push2(ssrRenderComponent(_sfc_main$2, {
                    message: unref(formAddLogbook).errors.image
                  }, null, _parent2, _scopeId));
                  _push2(`</div><div class="mt-2" data-v-1889a6ad${_scopeId}><div class="form-floating" data-v-1889a6ad${_scopeId}><textarea class="form-control border-0 border-bottom" id="logbook_description" style="${ssrRenderStyle({ "height": "84px" })}" placeholder="Add description of your activities" data-v-1889a6ad${_scopeId}>${ssrInterpolate(
                    unref(formAddLogbook).description
                  )}</textarea><label for="logbook_description" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Description")}</label></div>`);
                  _push2(ssrRenderComponent(_sfc_main$2, {
                    message: unref(formAddLogbook).errors.description
                  }, null, _parent2, _scopeId));
                  _push2(`</div><div class="mt-3" data-v-1889a6ad${_scopeId}><button type="submit" class="btn btn-sm btn-primary w-100" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Add Logbook")}</button></div></form>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="mt-2 pt-2 border-top" data-v-1889a6ad${_scopeId}><div class="d-flex align-items-center justify-content-between" data-v-1889a6ad${_scopeId}><button type="button" class="btn btn-sm border-0 text-primary text-decoration-none p-0 d-flex align-items-center gap-1" style="${ssrRenderStyle({ "font-size": "0.78rem" })}" data-v-1889a6ad${_scopeId}><i class="bi bi-journal-text fs-6" data-v-1889a6ad${_scopeId}></i><span class="fw-semibold" data-v-1889a6ad${_scopeId}>${ssrInterpolate(auth_user.value.id == __props.profile.id ? "check my logbook" : "check logbook")}</span>`);
                if (__props.logbook_list && __props.logbook_list.length > 0) {
                  _push2(`<span class="badge rounded-pill bg-primary-subtle text-primary border border-primary-subtle ms-1" style="${ssrRenderStyle({ "font-size": "0.68rem" })}" data-v-1889a6ad${_scopeId}>${ssrInterpolate(__props.logbook_list.length)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<i class="${ssrRenderClass([isLogbookOpen.value ? "bi-chevron-up" : "bi-chevron-down", "bi ms-1"])}" style="${ssrRenderStyle({ "font-size": "0.75rem" })}" data-v-1889a6ad${_scopeId}></i></button>`);
                if (__props.program_list && __props.program_list.length > 0) {
                  _push2(`<span class="text-muted" style="${ssrRenderStyle({ "font-size": "0.72rem" })}" data-v-1889a6ad${_scopeId}>${ssrInterpolate(__props.program_list.length)} Program </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div style="${ssrRenderStyle(isLogbookOpen.value ? null : { display: "none" })}" class="mt-2 pt-2 border-top" data-v-1889a6ad${_scopeId}><div class="mb-3" data-v-1889a6ad${_scopeId}><div class="d-flex align-items-center justify-content-between mb-1" data-v-1889a6ad${_scopeId}><span class="text-secondary fw-semibold" style="${ssrRenderStyle({ "font-size": "0.72rem", "text-transform": "uppercase", "letter-spacing": "0.5px" })}" data-v-1889a6ad${_scopeId}><i class="bi bi-folder2-open me-1" data-v-1889a6ad${_scopeId}></i>Halaman Logbook Program </span></div>`);
                if (__props.program_list && __props.program_list.length > 0) {
                  _push2(`<div class="d-flex flex-column gap-1" data-v-1889a6ad${_scopeId}><!--[-->`);
                  ssrRenderList(__props.program_list, (program) => {
                    var _a2;
                    _push2(`<a${ssrRenderAttr("href", `/seeo/staff/program/${program.program_id}/logbook/${__props.profile.id}`)} class="d-flex align-items-center justify-content-between p-2 rounded-2 border bg-light text-decoration-none text-body" style="${ssrRenderStyle({ "font-size": "0.78rem" })}" data-v-1889a6ad${_scopeId}><div class="d-flex align-items-center text-truncate me-2" data-v-1889a6ad${_scopeId}><i class="bi bi-kanban text-primary me-2 flex-shrink-0" data-v-1889a6ad${_scopeId}></i><span class="fw-medium text-dark text-truncate" data-v-1889a6ad${_scopeId}>${ssrInterpolate(((_a2 = program.program) == null ? void 0 : _a2.name) ?? "Program #" + program.program_id)}</span><span class="text-secondary mx-1 fw-light" data-v-1889a6ad${_scopeId}>as</span><span class="text-primary fw-medium text-truncate" data-v-1889a6ad${_scopeId}>${ssrInterpolate(program.title)}</span></div><i class="bi bi-box-arrow-up-right text-primary flex-shrink-0" style="${ssrRenderStyle({ "font-size": "0.72rem" })}" data-v-1889a6ad${_scopeId}></i></a>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<div class="text-muted fst-italic py-1" style="${ssrRenderStyle({ "font-size": "0.75rem" })}" data-v-1889a6ad${_scopeId}> Belum terdaftar pada program apapun. </div>`);
                }
                _push2(`</div><div data-v-1889a6ad${_scopeId}><div class="d-flex align-items-center justify-content-between mb-2" data-v-1889a6ad${_scopeId}><span class="text-secondary fw-semibold" style="${ssrRenderStyle({ "font-size": "0.72rem", "text-transform": "uppercase", "letter-spacing": "0.5px" })}" data-v-1889a6ad${_scopeId}><i class="bi bi-clock-history me-1" data-v-1889a6ad${_scopeId}></i>Riwayat Logbook </span>`);
                if (__props.logbook_list && __props.logbook_list.length > 0) {
                  _push2(`<span class="text-muted" style="${ssrRenderStyle({ "font-size": "0.7rem" })}" data-v-1889a6ad${_scopeId}> (5 Terakhir) </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
                if (__props.logbook_list && __props.logbook_list.length > 0) {
                  _push2(`<div class="d-flex flex-column gap-2" style="${ssrRenderStyle({ "max-height": "380px", "overflow-y": "auto" })}" data-v-1889a6ad${_scopeId}><!--[-->`);
                  ssrRenderList(__props.logbook_list, (log) => {
                    var _a2;
                    _push2(`<div class="card border border-light-subtle bg-white p-2 rounded-2 shadow-xs" data-v-1889a6ad${_scopeId}><div class="d-flex justify-content-between align-items-start mb-1" data-v-1889a6ad${_scopeId}><div class="d-flex align-items-center gap-1 flex-wrap" data-v-1889a6ad${_scopeId}><span class="badge bg-primary-subtle text-primary border border-primary-subtle" style="${ssrRenderStyle({ "font-size": "0.68rem" })}" data-v-1889a6ad${_scopeId}>${ssrInterpolate(((_a2 = log.program) == null ? void 0 : _a2.name) ?? "Program")}</span>`);
                    if (log.validated == 1) {
                      _push2(`<span class="badge bg-success-subtle text-success border border-success-subtle" style="${ssrRenderStyle({ "font-size": "0.65rem" })}" data-v-1889a6ad${_scopeId}><i class="bi bi-check-circle-fill me-1" data-v-1889a6ad${_scopeId}></i>Tervalidasi </span>`);
                    } else {
                      _push2(`<span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle" style="${ssrRenderStyle({ "font-size": "0.65rem" })}" data-v-1889a6ad${_scopeId}><i class="bi bi-clock me-1" data-v-1889a6ad${_scopeId}></i>Pending </span>`);
                    }
                    _push2(`</div><small class="text-muted flex-shrink-0 ms-1" style="${ssrRenderStyle({ "font-size": "0.7rem" })}" data-v-1889a6ad${_scopeId}><i class="bi bi-calendar3 me-1" data-v-1889a6ad${_scopeId}></i>${ssrInterpolate(unref(formatDateOnly)(log.date_time))}</small></div><div class="d-flex gap-2 align-items-start mt-1" data-v-1889a6ad${_scopeId}>`);
                    if (log.image) {
                      _push2(`<div class="flex-shrink-0" data-v-1889a6ad${_scopeId}><img${ssrRenderAttr("src", `/storage/images/log/${log.program_id}/${log.image}`)} alt="Foto Logbook" class="rounded border border-secondary-subtle object-fit-cover" style="${ssrRenderStyle({ "width": "52px", "height": "52px", "cursor": "pointer" })}" title="Klik untuk melihat foto lebih besar" data-v-1889a6ad${_scopeId}></div>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<div class="flex-grow-1 text-wrap" style="${ssrRenderStyle({ "min-width": "0" })}" data-v-1889a6ad${_scopeId}><p class="mb-1 text-dark" style="${ssrRenderStyle({ "font-size": "0.78rem", "line-height": "1.35", "white-space": "pre-line" })}" data-v-1889a6ad${_scopeId}>${ssrInterpolate(log.title || "(Tanpa keterangan kegiatan)")}</p></div></div><div class="d-flex justify-content-end mt-1 pt-1 border-top border-light" data-v-1889a6ad${_scopeId}><a${ssrRenderAttr("href", `/seeo/staff/program/${log.program_id}/logbook/${__props.profile.id}`)} class="text-primary text-decoration-none fw-medium d-inline-flex align-items-center" style="${ssrRenderStyle({ "font-size": "0.7rem" })}" data-v-1889a6ad${_scopeId}><span data-v-1889a6ad${_scopeId}>Buka halaman program</span><i class="bi bi-arrow-right-short fs-6" data-v-1889a6ad${_scopeId}></i></a></div></div>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<div class="alert alert-light border text-center py-3 my-1 rounded-2" data-v-1889a6ad${_scopeId}><i class="bi bi-journal-x text-muted fs-3 d-block mb-1" data-v-1889a6ad${_scopeId}></i><p class="mb-0 text-muted" style="${ssrRenderStyle({ "font-size": "0.78rem" })}" data-v-1889a6ad${_scopeId}> Belum ada catatan logbook yang diunggah. </p></div>`);
                }
                _push2(`</div></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="col-12" data-v-1889a6ad${_scopeId}>`);
              if (__props.section === "iwp") {
                _push2(`<div id="iwp-payment" class="card p-3 obligation-card" data-v-1889a6ad${_scopeId}><div class="d-flex" data-v-1889a6ad${_scopeId}><span class="w-100 text-primary-emphasis h5" data-v-1889a6ad${_scopeId}><i class="bi bi-journal-text me-2 fs-6" data-v-1889a6ad${_scopeId}></i>${ssrInterpolate("Contribution")}</span></div><div class="mt-2" data-v-1889a6ad${_scopeId}><span class="text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Your progress :")}</span></div><div class="mt-1" data-v-1889a6ad${_scopeId}><!--[-->`);
                ssrRenderList(__props.contribution_settings.period, (month) => {
                  var _a2, _b2, _c2, _d2;
                  _push2(`<div class="${ssrRenderClass(
                    "btn shadow-sm px-1 py-0 me-1 " + (month + ((_a2 = __props.contribution_settings) == null ? void 0 : _a2.start) - 1 <= thisMonth.value && month > (__props.contribution ? (_b2 = __props.contribution) == null ? void 0 : _b2.months : 0) ? "bg-danger bg-opacity-25" : "") + (month <= ((_c2 = __props.contribution) == null ? void 0 : _c2.months) ? "bg-primary bg-opacity-25" : "bg-secondary bg-opacity-25 border-dark-subtle border")
                  )}" data-v-1889a6ad${_scopeId}><span style="${ssrRenderStyle({ "font-size": "0.7rem" })}" class="${ssrRenderClass(
                    "position-relative " + (month <= ((_d2 = __props.contribution) == null ? void 0 : _d2.months) ? "text-primary " : "text-secondary ")
                  )}" data-v-1889a6ad${_scopeId}>${ssrInterpolate(unref(getMonthName)(
                    month + __props.contribution_settings.start - 1,
                    "short"
                  ))}</span></div>`);
                });
                _push2(`<!--]--></div><div class="mt-2 d-flex" data-v-1889a6ad${_scopeId}><span class="text-secondary me-2" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Status :")}</span></div><div class="mt-1" data-v-1889a6ad${_scopeId}><span class="text-secondary" data-v-1889a6ad${_scopeId}>${ssrInterpolate(__props.contribution_settings.start + (__props.contribution ? __props.contribution.months - 1 : 0) <= thisMonth.value ? "You have unpaid bill for " + (thisMonth.value - ((_d = __props.contribution_settings) == null ? void 0 : _d.start) - (__props.contribution ? __props.contribution.months - 1 : -1) + (thisMonth.value - ((_e = __props.contribution_settings) == null ? void 0 : _e.start) - (__props.contribution ? __props.contribution.months - 1 : -1) > 1 ? " months" : " month")) : "You are on track.")}</span></div>`);
                if (auth_user.value.id == __props.profile.id) {
                  _push2(`<form data-v-1889a6ad${_scopeId}><div class="mt-3 border-top border-primary" data-v-1889a6ad${_scopeId}><div class="form-floating" data-v-1889a6ad${_scopeId}><select class="${ssrRenderClass(
                    "form-select border-0 border-bottom " + (unref(formAddContribution).errors.month ? "is-invalid" : "")
                  )}" id="contribution_month" aria-label="Floating label select example" required data-v-1889a6ad${_scopeId}><option value="null" selected data-v-1889a6ad${_scopeId}>${ssrInterpolate("Choose here")}</option><!--[-->`);
                  ssrRenderList(((_f = __props.contribution_settings) == null ? void 0 : _f.period) - (__props.contribution ? (_g = __props.contribution) == null ? void 0 : _g.months : 0), (month) => {
                    _push2(`<option${ssrRenderAttr("value", month)} class="position-relative" data-v-1889a6ad${ssrIncludeBooleanAttr(Array.isArray(
                      unref(formAddContribution).month
                    ) ? ssrLooseContain(
                      unref(formAddContribution).month,
                      month
                    ) : ssrLooseEqual(
                      unref(formAddContribution).month,
                      month
                    )) ? " selected" : ""}${_scopeId}>${ssrInterpolate(month + (month > 1 ? " months" : " month"))}</option>`);
                  });
                  _push2(`<!--]--></select><label for="contribution_month" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Pay for")}</label></div>`);
                  _push2(ssrRenderComponent(_sfc_main$2, {
                    message: unref(formAddContribution).errors.month
                  }, null, _parent2, _scopeId));
                  _push2(`</div><div class="mt-2" data-v-1889a6ad${_scopeId}><div class="form-floating" data-v-1889a6ad${_scopeId}><input type="file" class="${ssrRenderClass(
                    "form-control border-0 border-bottom  " + (unref(formAddContribution).errors.receipt ? "is-invalid" : "")
                  )}" id="contribution_receipt" data-v-1889a6ad${_scopeId}><label for="contribution_receipt" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Receipt")}</label></div>`);
                  _push2(ssrRenderComponent(_sfc_main$2, {
                    message: unref(formAddContribution).errors.receipt
                  }, null, _parent2, _scopeId));
                  _push2(`</div><div class="mt-2 d-flex" data-v-1889a6ad${_scopeId}><span class="ms-auto text-secondary" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Price : ")}</span><span class="text-dark ms-2" data-v-1889a6ad${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                    ((_h = __props.contribution_settings) == null ? void 0 : _h.price) * unref(formAddContribution).month
                  ))}</span></div><div class="mt-3" data-v-1889a6ad${_scopeId}><button type="submit" class="btn btn-sm btn-primary w-100" data-v-1889a6ad${_scopeId}>${ssrInterpolate("Add Contribution")}</button></div></form>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="modal fade" tabindex="-1" aria-hidden="true" data-v-1889a6ad${_scopeId}><div class="modal-dialog modal-dialog-centered" data-v-1889a6ad${_scopeId}><div class="modal-content shadow border-0" data-v-1889a6ad${_scopeId}><div class="modal-header py-2 ps-3 pe-2 bg-light" data-v-1889a6ad${_scopeId}><span class="modal-title fs-6 fw-semibold text-primary-emphasis" data-v-1889a6ad${_scopeId}><i class="bi bi-image me-2 text-primary" data-v-1889a6ad${_scopeId}></i>Foto Dokumentasi Logbook </span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal" data-v-1889a6ad${_scopeId}><i class="bi bi-x-lg" data-v-1889a6ad${_scopeId}></i></button></div><div class="modal-body bg-light text-center p-3" data-v-1889a6ad${_scopeId}>`);
            if (selectedLogbookImage.value) {
              _push2(`<img${ssrRenderAttr("src", selectedLogbookImage.value)} class="img-fluid rounded shadow-sm border" style="${ssrRenderStyle({ "max-height": "70vh", "object-fit": "contain" })}" alt="Foto Logbook" data-v-1889a6ad${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="modal-footer py-2 px-3 d-flex justify-content-between" data-v-1889a6ad${_scopeId}>`);
            if (selectedLogbookImage.value) {
              _push2(`<a${ssrRenderAttr("href", selectedLogbookImage.value)} target="_blank" download class="btn btn-sm btn-outline-primary" data-v-1889a6ad${_scopeId}><i class="bi bi-download me-1" data-v-1889a6ad${_scopeId}></i>Download Foto </a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal" data-v-1889a6ad${_scopeId}> Tutup </button></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: title.value,
                icon: _ctx.$imageUrl("apps/logo.png")
              }, null, 8, ["title", "icon"]),
              createVNode(_sfc_main$1, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
              }, null, 512),
              createVNode("div", {
                class: ["container profile-page mb-5", { "profile-feature-page": __props.section !== "profile" }]
              }, [
                createVNode("div", { class: "row gx-3 gy-3 mt-1 mt-md-3 profile-grid" }, [
                  createVNode(Transition, { name: "fade-slide-ltr" }, {
                    default: withCtx(() => {
                      var _a2, _b2, _c2;
                      return [
                        __props.section === "profile" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "col-12 col-xl-9 mx-auto"
                        }, [
                          createVNode("div", {
                            id: "profile-summary",
                            class: "card position-relative profile-summary-card"
                          }, [
                            createVNode("div", { class: "dropdown" }, [
                              auth_user.value.roles_id == 99 || auth_user.value.id == __props.profile.id ? (openBlock(), createBlock("button", {
                                key: 0,
                                "data-bs-toggle": "dropdown",
                                "aria-expanded": "false",
                                class: "btn btn-sm btn-outline-secondary inset-e-0 top-0 position-absolute mt-1 me-1 border-0"
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
                              auth_user.value.roles_id == 99 || auth_user.value.id == __props.profile.id ? (openBlock(), createBlock("div", {
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
                                        ]),
                                        createVNode("div", { class: "row justify-content-center mt-2" }, [
                                          createVNode("div", { class: "col-4 col-lg-3 d-flex" }, [
                                            createVNode("label", {
                                              for: "profile_birth_date",
                                              class: "form-label d-inline-block my-auto"
                                            }, "Birthday")
                                          ]),
                                          createVNode("div", { class: "col-8 col-lg-7" }, [
                                            withDirectives(createVNode("input", {
                                              id: "profile_birth_date",
                                              type: "date",
                                              class: "form-control form-control-sm d-inline-block",
                                              "onUpdate:modelValue": ($event) => unref(formUpdateProfile).birth_date = $event
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [
                                                vModelText,
                                                unref(formUpdateProfile).birth_date
                                              ]
                                            ]),
                                            createVNode(_sfc_main$2, {
                                              message: unref(formUpdateProfile).errors.birth_date
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
                              auth_user.value.roles_id == 99 || auth_user.value.id == __props.profile.id ? (openBlock(), createBlock("div", {
                                key: 2,
                                class: "modal fade",
                                ref_key: "modalUpdatePasswordRef",
                                ref: modalUpdatePasswordRef,
                                tabindex: "-1",
                                "aria-labelledby": "modalUpdatePasswordTitle",
                                "aria-hidden": "true"
                              }, [
                                createVNode("div", { class: "modal-dialog modal-dialog-centered px-3 px-lg-0" }, [
                                  createVNode("div", { class: "modal-content border-0 shadow-lg rounded-3 overflow-hidden" }, [
                                    createVNode("div", { class: "modal-header bg-light border-bottom py-2.5 px-3" }, [
                                      createVNode("div", { class: "d-flex align-items-center gap-2" }, [
                                        createVNode("div", {
                                          class: "rounded-circle bg-warning-subtle text-warning d-flex align-items-center justify-content-center",
                                          style: { "width": "32px", "height": "32px" }
                                        }, [
                                          createVNode("i", { class: "bi bi-key-fill" })
                                        ]),
                                        createVNode("div", null, [
                                          createVNode("h6", {
                                            class: "modal-title fw-bold text-dark mb-0",
                                            id: "modalUpdatePasswordTitle"
                                          }, " Ganti Kata Sandi "),
                                          createVNode("small", {
                                            class: "text-secondary",
                                            style: { "font-size": "0.75rem" }
                                          }, " Perbarui kata sandi akun Anda ")
                                        ])
                                      ]),
                                      createVNode("button", {
                                        type: "button",
                                        class: "btn-close",
                                        "aria-label": "Close",
                                        onClick: ($event) => showUpdatePasswordModal(false)
                                      }, null, 8, ["onClick"])
                                    ]),
                                    createVNode("form", {
                                      method: "post",
                                      onSubmit: withModifiers(($event) => handleSubmitUpdatePassword(), ["prevent"])
                                    }, [
                                      createVNode("div", { class: "modal-body p-3 p-md-4" }, [
                                        createVNode("div", { class: "alert alert-info py-2 px-3 small d-flex align-items-start gap-2 mb-3 rounded-2" }, [
                                          createVNode("i", { class: "bi bi-info-circle-fill text-info mt-0.5" }),
                                          createVNode("span", null, "Pastikan kata sandi baru Anda minimal 8 karakter dan belum pernah digunakan sebelumnya.")
                                        ]),
                                        createVNode("div", { class: "mb-3" }, [
                                          createVNode("label", {
                                            for: "old_password",
                                            class: "form-label small fw-semibold text-secondary mb-1"
                                          }, [
                                            createTextVNode(" Kata Sandi Saat Ini "),
                                            createVNode("span", { class: "text-danger" }, "*")
                                          ]),
                                          createVNode("div", { class: "input-group" }, [
                                            createVNode("span", { class: "input-group-text bg-light text-secondary border-end-0" }, [
                                              createVNode("i", { class: "bi bi-lock" })
                                            ]),
                                            withDirectives(createVNode("input", {
                                              type: "password",
                                              class: "form-control border-start-0 border-end-0",
                                              id: "old_password",
                                              "onUpdate:modelValue": ($event) => unref(formUpdatePassword).old_password = $event,
                                              placeholder: "Masukkan kata sandi saat ini",
                                              autocomplete: "current-password",
                                              required: ""
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, unref(formUpdatePassword).old_password]
                                            ]),
                                            createVNode("button", {
                                              type: "button",
                                              class: "btn btn-outline-secondary border-start-0",
                                              onClick: ($event) => show_password("old_password", "old_password_icon")
                                            }, [
                                              createVNode("i", {
                                                class: "bi bi-eye-slash-fill",
                                                id: "old_password_icon"
                                              })
                                            ], 8, ["onClick"])
                                          ]),
                                          createVNode(_sfc_main$2, {
                                            message: unref(formUpdatePassword).errors.old_password,
                                            class: "mt-1"
                                          }, null, 8, ["message"])
                                        ]),
                                        createVNode("div", { class: "mb-3" }, [
                                          createVNode("label", {
                                            for: "password",
                                            class: "form-label small fw-semibold text-secondary mb-1"
                                          }, [
                                            createTextVNode(" Kata Sandi Baru "),
                                            createVNode("span", { class: "text-danger" }, "*")
                                          ]),
                                          createVNode("div", { class: "input-group" }, [
                                            createVNode("span", { class: "input-group-text bg-light text-secondary border-end-0" }, [
                                              createVNode("i", { class: "bi bi-shield-lock" })
                                            ]),
                                            withDirectives(createVNode("input", {
                                              type: "password",
                                              class: "form-control border-start-0 border-end-0",
                                              id: "password",
                                              "onUpdate:modelValue": ($event) => unref(formUpdatePassword).password = $event,
                                              placeholder: "Minimal 8 karakter",
                                              autocomplete: "new-password",
                                              required: ""
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, unref(formUpdatePassword).password]
                                            ]),
                                            createVNode("button", {
                                              type: "button",
                                              class: "btn btn-outline-secondary border-start-0",
                                              onClick: ($event) => show_password("password", "password_icon")
                                            }, [
                                              createVNode("i", {
                                                class: "bi bi-eye-slash-fill",
                                                id: "password_icon"
                                              })
                                            ], 8, ["onClick"])
                                          ]),
                                          createVNode(_sfc_main$2, {
                                            message: unref(formUpdatePassword).errors.password,
                                            class: "mt-1"
                                          }, null, 8, ["message"])
                                        ]),
                                        createVNode("div", { class: "mb-2" }, [
                                          createVNode("label", {
                                            for: "password_confirmation",
                                            class: "form-label small fw-semibold text-secondary mb-1"
                                          }, [
                                            createTextVNode(" Konfirmasi Kata Sandi Baru "),
                                            createVNode("span", { class: "text-danger" }, "*")
                                          ]),
                                          createVNode("div", { class: "input-group" }, [
                                            createVNode("span", { class: "input-group-text bg-light text-secondary border-end-0" }, [
                                              createVNode("i", { class: "bi bi-check2-circle" })
                                            ]),
                                            withDirectives(createVNode("input", {
                                              type: "password",
                                              class: "form-control border-start-0 border-end-0",
                                              id: "password_confirmation",
                                              "onUpdate:modelValue": ($event) => unref(formUpdatePassword).password_confirmation = $event,
                                              placeholder: "Ketik ulang kata sandi baru",
                                              autocomplete: "new-password",
                                              required: ""
                                            }, null, 8, ["onUpdate:modelValue"]), [
                                              [vModelText, unref(formUpdatePassword).password_confirmation]
                                            ]),
                                            createVNode("button", {
                                              type: "button",
                                              class: "btn btn-outline-secondary border-start-0",
                                              onClick: ($event) => show_password("password_confirmation", "password_confirmation_icon")
                                            }, [
                                              createVNode("i", {
                                                class: "bi bi-eye-slash-fill",
                                                id: "password_confirmation_icon"
                                              })
                                            ], 8, ["onClick"])
                                          ]),
                                          createVNode(_sfc_main$2, {
                                            message: unref(formUpdatePassword).errors.password_confirmation,
                                            class: "mt-1"
                                          }, null, 8, ["message"])
                                        ])
                                      ]),
                                      createVNode("div", { class: "modal-footer bg-light py-2 px-3 border-top d-flex justify-content-end gap-2" }, [
                                        createVNode("button", {
                                          type: "button",
                                          class: "btn btn-sm btn-outline-secondary px-3",
                                          onClick: ($event) => showUpdatePasswordModal(false)
                                        }, " Batal ", 8, ["onClick"]),
                                        createVNode("button", {
                                          type: "submit",
                                          class: "btn btn-sm btn-primary px-3 d-inline-flex align-items-center gap-1.5",
                                          disabled: unref(formUpdatePassword).processing
                                        }, [
                                          unref(formUpdatePassword).processing ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "spinner-border spinner-border-sm",
                                            role: "status",
                                            "aria-hidden": "true"
                                          })) : (openBlock(), createBlock("i", {
                                            key: 1,
                                            class: "bi bi-check-lg"
                                          })),
                                          createVNode("span", null, "Simpan Kata Sandi")
                                        ], 8, ["disabled"])
                                      ])
                                    ], 40, ["onSubmit"])
                                  ])
                                ])
                              ], 512)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "row gx-3 justify-content-center" }, [
                              createVNode("div", { class: "col-12 col-sm-5 col-lg-5 d-flex" }, [
                                createVNode("div", { class: "profile-photo-card position-relative mx-3 mt-3 mb-2 mx-sm-0 ms-sm-3 mb-sm-3 w-100" }, [
                                  createVNode("img", {
                                    src: "/storage/images/profile/" + (((_a2 = __props.profile) == null ? void 0 : _a2.profile_image) ?? "example.png"),
                                    alt: "image",
                                    class: "img-fluid w-100 h-100 object-fit-cover rounded border-secondary-subtle border shadow placeholder",
                                    onLoad: unref(showImage),
                                    style: { "min-height": "200px" }
                                  }, null, 40, ["src", "onLoad"]),
                                  createVNode("a", {
                                    href: "/storage/images/profile/" + (((_b2 = __props.profile) == null ? void 0 : _b2.profile_image) ?? "example.png"),
                                    class: "btn btn-sm btn-primary border-0 shadow rounded-5 position-absolute inset-e-0 bottom-0 mb-2 " + (auth_user.value.id !== __props.profile.id ? "me-2" : ""),
                                    style: { "font-size": "0.6rem", "padding": "0.15rem 0.34rem", "margin-right": "2.5rem" },
                                    download: ""
                                  }, [
                                    createVNode("i", { class: "bi bi-download" })
                                  ], 10, ["href"]),
                                  auth_user.value.roles_id == 99 || auth_user.value.id == __props.profile.id ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    onClick: ($event) => triggerFileUploadProfileImage(),
                                    class: "btn btn-sm btn-primary border-0 shadow rounded-5 position-absolute inset-e-0 bottom-0 me-2 mb-2"
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
                              createVNode("div", { class: "col-12 col-sm-7 col-lg-7 px-4 px-sm-3 pb-3 pb-sm-0" }, [
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
                                    createVNode("p", { class: "text-secondary-emphasis" }, toDisplayString((_c2 = __props.profile.roles) == null ? void 0 : _c2.name), 1)
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
                                    __props.profile.phone ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "text-secondary-emphasis"
                                    }, [
                                      createVNode("a", {
                                        href: "https://wa.me/+62" + __props.profile.phone.slice(1),
                                        target: "_blank",
                                        class: "text-decoration-none text-primary"
                                      }, [
                                        createVNode("i", { class: "bi bi-whatsapp d-none d-lg-inline" }),
                                        createTextVNode(" " + toDisplayString(__props.profile.phone), 1)
                                      ], 8, ["href"])
                                    ])) : (openBlock(), createBlock("p", {
                                      key: 1,
                                      class: "text-muted small"
                                    }, "Belum diatur"))
                                  ])
                                ]),
                                auth_user.value.roles_id == 99 || auth_user.value.id == __props.profile.id ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "d-flex flex-wrap gap-2 mt-4 pt-3 border-top"
                                }, [
                                  createVNode("button", {
                                    type: "button",
                                    class: "btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1.5 px-3 py-1.5 rounded-2",
                                    onClick: ($event) => showUpdateProfileModal(true)
                                  }, [
                                    createVNode("i", { class: "bi bi-pencil-square" }),
                                    createVNode("span", null, "Edit Profil")
                                  ], 8, ["onClick"]),
                                  createVNode("button", {
                                    type: "button",
                                    class: "btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1.5 px-3 py-1.5 rounded-2",
                                    onClick: ($event) => showUpdatePasswordModal(true)
                                  }, [
                                    createVNode("i", { class: "bi bi-key-fill text-warning" }),
                                    createVNode("span", null, "Ganti Password")
                                  ], 8, ["onClick"])
                                ])) : createCommentVNode("", true)
                              ])
                            ])
                          ]),
                          auth_user.value.roles_id == 99 || auth_user.value.id == __props.profile.id ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "card mt-3 border-0 shadow-sm rounded-3 p-3 p-md-4 bg-white"
                          }, [
                            createVNode("div", { class: "d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom" }, [
                              createVNode("h6", { class: "fw-bold text-dark mb-0 d-flex align-items-center gap-2" }, [
                                createVNode("i", { class: "bi bi-shield-lock-fill text-primary" }),
                                createTextVNode(" Keamanan Akun & Kata Sandi ")
                              ]),
                              createVNode("span", { class: "badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2.5 py-1 small" }, " Keamanan ")
                            ]),
                            createVNode("div", { class: "row align-items-center g-3" }, [
                              createVNode("div", { class: "col-12 col-md-8" }, [
                                createVNode("p", { class: "small text-secondary mb-0" }, " Ganti kata sandi secara berkala untuk menjaga akun Anda tetap aman. Kata sandi minimal 8 karakter dengan kombinasi huruf besar, huruf kecil, dan angka. ")
                              ]),
                              createVNode("div", { class: "col-12 col-md-4 text-md-end" }, [
                                createVNode("button", {
                                  type: "button",
                                  class: "btn btn-primary btn-sm d-inline-flex align-items-center gap-2 px-3 py-2 rounded-2 fw-semibold shadow-2xs",
                                  onClick: ($event) => showUpdatePasswordModal(true)
                                }, [
                                  createVNode("i", { class: "bi bi-key-fill" }),
                                  createVNode("span", null, "Ganti Password")
                                ], 8, ["onClick"])
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ];
                    }),
                    _: 1
                  }),
                  __props.section !== "profile" && (auth_user.value.roles_id == 99 || auth_user.value.id == __props.profile.id) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "col-12 profile-obligations"
                  }, [
                    createVNode("div", { class: "row gx-3 gy-3" }, [
                      createVNode("div", { class: "col-12" }, [
                        createVNode(Transition, { name: "fade-slide-rtl" }, {
                          default: withCtx(() => [
                            __props.section === "logbook" ? (openBlock(), createBlock("div", {
                              key: 0,
                              id: "logbook-upload",
                              class: "card p-3 obligation-card"
                            }, [
                              createVNode("div", { class: "d-flex" }, [
                                createVNode("span", { class: "w-100 text-primary-emphasis h5" }, [
                                  createVNode("i", { class: "bi bi-journal-bookmark me-2 fs-6" }),
                                  createTextVNode(toDisplayString("Logbook"))
                                ])
                              ]),
                              auth_user.value.id == __props.profile.id ? (openBlock(), createBlock("form", {
                                key: 0,
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
                              ], 40, ["onSubmit"])) : createCommentVNode("", true),
                              createVNode("div", { class: "mt-2 pt-2 border-top" }, [
                                createVNode("div", { class: "d-flex align-items-center justify-content-between" }, [
                                  createVNode("button", {
                                    type: "button",
                                    class: "btn btn-sm border-0 text-primary text-decoration-none p-0 d-flex align-items-center gap-1",
                                    style: { "font-size": "0.78rem" },
                                    onClick: ($event) => isLogbookOpen.value = !isLogbookOpen.value
                                  }, [
                                    createVNode("i", { class: "bi bi-journal-text fs-6" }),
                                    createVNode("span", { class: "fw-semibold" }, toDisplayString(auth_user.value.id == __props.profile.id ? "check my logbook" : "check logbook"), 1),
                                    __props.logbook_list && __props.logbook_list.length > 0 ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "badge rounded-pill bg-primary-subtle text-primary border border-primary-subtle ms-1",
                                      style: { "font-size": "0.68rem" }
                                    }, toDisplayString(__props.logbook_list.length), 1)) : createCommentVNode("", true),
                                    createVNode("i", {
                                      class: ["bi ms-1", isLogbookOpen.value ? "bi-chevron-up" : "bi-chevron-down"],
                                      style: { "font-size": "0.75rem" }
                                    }, null, 2)
                                  ], 8, ["onClick"]),
                                  __props.program_list && __props.program_list.length > 0 ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "text-muted",
                                    style: { "font-size": "0.72rem" }
                                  }, toDisplayString(__props.program_list.length) + " Program ", 1)) : createCommentVNode("", true)
                                ]),
                                createVNode(Transition, { name: "fade" }, {
                                  default: withCtx(() => [
                                    withDirectives(createVNode("div", { class: "mt-2 pt-2 border-top" }, [
                                      createVNode("div", { class: "mb-3" }, [
                                        createVNode("div", { class: "d-flex align-items-center justify-content-between mb-1" }, [
                                          createVNode("span", {
                                            class: "text-secondary fw-semibold",
                                            style: { "font-size": "0.72rem", "text-transform": "uppercase", "letter-spacing": "0.5px" }
                                          }, [
                                            createVNode("i", { class: "bi bi-folder2-open me-1" }),
                                            createTextVNode("Halaman Logbook Program ")
                                          ])
                                        ]),
                                        __props.program_list && __props.program_list.length > 0 ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "d-flex flex-column gap-1"
                                        }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(__props.program_list, (program) => {
                                            var _a2;
                                            return openBlock(), createBlock("a", {
                                              key: program.id,
                                              href: `/seeo/staff/program/${program.program_id}/logbook/${__props.profile.id}`,
                                              class: "d-flex align-items-center justify-content-between p-2 rounded-2 border bg-light text-decoration-none text-body",
                                              style: { "font-size": "0.78rem" }
                                            }, [
                                              createVNode("div", { class: "d-flex align-items-center text-truncate me-2" }, [
                                                createVNode("i", { class: "bi bi-kanban text-primary me-2 flex-shrink-0" }),
                                                createVNode("span", { class: "fw-medium text-dark text-truncate" }, toDisplayString(((_a2 = program.program) == null ? void 0 : _a2.name) ?? "Program #" + program.program_id), 1),
                                                createVNode("span", { class: "text-secondary mx-1 fw-light" }, "as"),
                                                createVNode("span", { class: "text-primary fw-medium text-truncate" }, toDisplayString(program.title), 1)
                                              ]),
                                              createVNode("i", {
                                                class: "bi bi-box-arrow-up-right text-primary flex-shrink-0",
                                                style: { "font-size": "0.72rem" }
                                              })
                                            ], 8, ["href"]);
                                          }), 128))
                                        ])) : (openBlock(), createBlock("div", {
                                          key: 1,
                                          class: "text-muted fst-italic py-1",
                                          style: { "font-size": "0.75rem" }
                                        }, " Belum terdaftar pada program apapun. "))
                                      ]),
                                      createVNode("div", null, [
                                        createVNode("div", { class: "d-flex align-items-center justify-content-between mb-2" }, [
                                          createVNode("span", {
                                            class: "text-secondary fw-semibold",
                                            style: { "font-size": "0.72rem", "text-transform": "uppercase", "letter-spacing": "0.5px" }
                                          }, [
                                            createVNode("i", { class: "bi bi-clock-history me-1" }),
                                            createTextVNode("Riwayat Logbook ")
                                          ]),
                                          __props.logbook_list && __props.logbook_list.length > 0 ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "text-muted",
                                            style: { "font-size": "0.7rem" }
                                          }, " (5 Terakhir) ")) : createCommentVNode("", true)
                                        ]),
                                        __props.logbook_list && __props.logbook_list.length > 0 ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "d-flex flex-column gap-2",
                                          style: { "max-height": "380px", "overflow-y": "auto" }
                                        }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(__props.logbook_list, (log) => {
                                            var _a2;
                                            return openBlock(), createBlock("div", {
                                              key: log.id,
                                              class: "card border border-light-subtle bg-white p-2 rounded-2 shadow-xs"
                                            }, [
                                              createVNode("div", { class: "d-flex justify-content-between align-items-start mb-1" }, [
                                                createVNode("div", { class: "d-flex align-items-center gap-1 flex-wrap" }, [
                                                  createVNode("span", {
                                                    class: "badge bg-primary-subtle text-primary border border-primary-subtle",
                                                    style: { "font-size": "0.68rem" }
                                                  }, toDisplayString(((_a2 = log.program) == null ? void 0 : _a2.name) ?? "Program"), 1),
                                                  log.validated == 1 ? (openBlock(), createBlock("span", {
                                                    key: 0,
                                                    class: "badge bg-success-subtle text-success border border-success-subtle",
                                                    style: { "font-size": "0.65rem" }
                                                  }, [
                                                    createVNode("i", { class: "bi bi-check-circle-fill me-1" }),
                                                    createTextVNode("Tervalidasi ")
                                                  ])) : (openBlock(), createBlock("span", {
                                                    key: 1,
                                                    class: "badge bg-warning-subtle text-warning-emphasis border border-warning-subtle",
                                                    style: { "font-size": "0.65rem" }
                                                  }, [
                                                    createVNode("i", { class: "bi bi-clock me-1" }),
                                                    createTextVNode("Pending ")
                                                  ]))
                                                ]),
                                                createVNode("small", {
                                                  class: "text-muted flex-shrink-0 ms-1",
                                                  style: { "font-size": "0.7rem" }
                                                }, [
                                                  createVNode("i", { class: "bi bi-calendar3 me-1" }),
                                                  createTextVNode(toDisplayString(unref(formatDateOnly)(log.date_time)), 1)
                                                ])
                                              ]),
                                              createVNode("div", { class: "d-flex gap-2 align-items-start mt-1" }, [
                                                log.image ? (openBlock(), createBlock("div", {
                                                  key: 0,
                                                  class: "flex-shrink-0"
                                                }, [
                                                  createVNode("img", {
                                                    src: `/storage/images/log/${log.program_id}/${log.image}`,
                                                    alt: "Foto Logbook",
                                                    class: "rounded border border-secondary-subtle object-fit-cover",
                                                    style: { "width": "52px", "height": "52px", "cursor": "pointer" },
                                                    onClick: ($event) => openLogbookImage(`/storage/images/log/${log.program_id}/${log.image}`),
                                                    title: "Klik untuk melihat foto lebih besar"
                                                  }, null, 8, ["src", "onClick"])
                                                ])) : createCommentVNode("", true),
                                                createVNode("div", {
                                                  class: "flex-grow-1 text-wrap",
                                                  style: { "min-width": "0" }
                                                }, [
                                                  createVNode("p", {
                                                    class: "mb-1 text-dark",
                                                    style: { "font-size": "0.78rem", "line-height": "1.35", "white-space": "pre-line" }
                                                  }, toDisplayString(log.title || "(Tanpa keterangan kegiatan)"), 1)
                                                ])
                                              ]),
                                              createVNode("div", { class: "d-flex justify-content-end mt-1 pt-1 border-top border-light" }, [
                                                createVNode("a", {
                                                  href: `/seeo/staff/program/${log.program_id}/logbook/${__props.profile.id}`,
                                                  class: "text-primary text-decoration-none fw-medium d-inline-flex align-items-center",
                                                  style: { "font-size": "0.7rem" }
                                                }, [
                                                  createVNode("span", null, "Buka halaman program"),
                                                  createVNode("i", { class: "bi bi-arrow-right-short fs-6" })
                                                ], 8, ["href"])
                                              ])
                                            ]);
                                          }), 128))
                                        ])) : (openBlock(), createBlock("div", {
                                          key: 1,
                                          class: "alert alert-light border text-center py-3 my-1 rounded-2"
                                        }, [
                                          createVNode("i", { class: "bi bi-journal-x text-muted fs-3 d-block mb-1" }),
                                          createVNode("p", {
                                            class: "mb-0 text-muted",
                                            style: { "font-size": "0.78rem" }
                                          }, " Belum ada catatan logbook yang diunggah. ")
                                        ]))
                                      ])
                                    ], 512), [
                                      [vShow, isLogbookOpen.value]
                                    ])
                                  ]),
                                  _: 1
                                })
                              ])
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "col-12" }, [
                        createVNode(Transition, { name: "fade-slide-rtl" }, {
                          default: withCtx(() => {
                            var _a2, _b2, _c2, _d2, _e2;
                            return [
                              __props.section === "iwp" ? (openBlock(), createBlock("div", {
                                key: 0,
                                id: "iwp-payment",
                                class: "card p-3 obligation-card"
                              }, [
                                createVNode("div", { class: "d-flex" }, [
                                  createVNode("span", { class: "w-100 text-primary-emphasis h5" }, [
                                    createVNode("i", { class: "bi bi-journal-text me-2 fs-6" }),
                                    createTextVNode(toDisplayString("Contribution"))
                                  ])
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
                                      class: "btn shadow-sm px-1 py-0 me-1 " + (month + ((_a3 = __props.contribution_settings) == null ? void 0 : _a3.start) - 1 <= thisMonth.value && month > (__props.contribution ? (_b3 = __props.contribution) == null ? void 0 : _b3.months : 0) ? "bg-danger bg-opacity-25" : "") + (month <= ((_c3 = __props.contribution) == null ? void 0 : _c3.months) ? "bg-primary bg-opacity-25" : "bg-secondary bg-opacity-25 border-dark-subtle border")
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
                                auth_user.value.id == __props.profile.id ? (openBlock(), createBlock("form", {
                                  key: 0,
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
                                ], 40, ["onSubmit"])) : createCommentVNode("", true)
                              ])) : createCommentVNode("", true)
                            ];
                          }),
                          _: 1
                        })
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ], 2),
              createVNode("div", {
                class: "modal fade",
                ref_key: "modalLogbookImageRef",
                ref: modalLogbookImageRef,
                tabindex: "-1",
                "aria-hidden": "true"
              }, [
                createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                  createVNode("div", { class: "modal-content shadow border-0" }, [
                    createVNode("div", { class: "modal-header py-2 ps-3 pe-2 bg-light" }, [
                      createVNode("span", { class: "modal-title fs-6 fw-semibold text-primary-emphasis" }, [
                        createVNode("i", { class: "bi bi-image me-2 text-primary" }),
                        createTextVNode("Foto Dokumentasi Logbook ")
                      ]),
                      createVNode("button", {
                        type: "button",
                        class: "btn btn-sm ms-auto",
                        "data-bs-dismiss": "modal"
                      }, [
                        createVNode("i", { class: "bi bi-x-lg" })
                      ])
                    ]),
                    createVNode("div", { class: "modal-body bg-light text-center p-3" }, [
                      selectedLogbookImage.value ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: selectedLogbookImage.value,
                        class: "img-fluid rounded shadow-sm border",
                        style: { "max-height": "70vh", "object-fit": "contain" },
                        alt: "Foto Logbook"
                      }, null, 8, ["src"])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "modal-footer py-2 px-3 d-flex justify-content-between" }, [
                      selectedLogbookImage.value ? (openBlock(), createBlock("a", {
                        key: 0,
                        href: selectedLogbookImage.value,
                        target: "_blank",
                        download: "",
                        class: "btn btn-sm btn-outline-primary"
                      }, [
                        createVNode("i", { class: "bi bi-download me-1" }),
                        createTextVNode("Download Foto ")
                      ], 8, ["href"])) : createCommentVNode("", true),
                      createVNode("button", {
                        type: "button",
                        class: "btn btn-sm btn-secondary",
                        "data-bs-dismiss": "modal"
                      }, " Tutup ")
                    ])
                  ])
                ])
              ], 512)
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
const Profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1889a6ad"]]);
export {
  Profile as default
};
//# sourceMappingURL=Profile-0hu5B2Q6.js.map
