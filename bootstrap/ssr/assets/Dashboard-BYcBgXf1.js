import { computed, ref, watch, onMounted, nextTick, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, withModifiers, withDirectives, vModelText, vModelCheckbox, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { g as getRoleWorkflow, S as StaffLayout, R as RoleWorkflowGuideModal } from "./StaffLayout-kVLGS8T_.js";
import { _ as _sfc_main$2 } from "./InputError-DkffFxkw.js";
import { _ as _sfc_main$3 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CaKJYApU.js";
import { usePage, useForm } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    post_list: Array,
    billboard_list: Array,
    attachment_list: Array,
    notif: Object,
    errors: Object,
    monitoring: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const auth_user = computed(() => {
      var _a;
      return ((_a = page.props.auth) == null ? void 0 : _a.user) || {};
    });
    const userRoleId = computed(() => {
      var _a;
      return Number(((_a = auth_user.value) == null ? void 0 : _a.roles_id) || 0);
    });
    const userRoleName = computed(() => {
      var _a;
      return ((_a = auth_user.value) == null ? void 0 : _a.role_name) || "Staff";
    });
    const selectedYear = computed(() => page.props.selected_year || (/* @__PURE__ */ new Date()).getFullYear());
    const currentWorkflow = computed(() => getRoleWorkflow(userRoleId.value, userRoleName.value));
    const title = ref("Dashboard");
    const modalConfirmationRef = ref(null);
    const toastNotifRef = ref(null);
    const guideModalRef = ref(null);
    const modal_post_instance = ref(null);
    const modal_attachment_instance = ref(null);
    const modal_billboard_instance = ref(null);
    const route = (name, params = {}) => {
      if (typeof window.route === "function") {
        try {
          return window.route(name, params);
        } catch (e) {
          console.warn(`Route ${name} error:`, e);
        }
      }
      return "#";
    };
    const form_billboard = useForm({
      billboard_title: "",
      billboard_typeText: false,
      billboard_typeImage: false,
      billboard_text: "",
      billboard_image: null
    });
    const form_attachment = useForm({
      attachment_title: "",
      attachment_type: "document",
      attachment_link: "",
      attachment_document: null
    });
    const form_post = useForm({
      post_text: "",
      post_username: false
    });
    const document_list = computed(() => {
      var _a;
      return ((_a = props.attachment_list) == null ? void 0 : _a.filter((a) => a.type === 0)) || [];
    });
    const link_list = computed(() => {
      var _a;
      return ((_a = props.attachment_list) == null ? void 0 : _a.filter((a) => a.type === 1)) || [];
    });
    function getMonitoringLink(label) {
      if (label.includes("Stok")) return route("staff.production.panel.index");
      if (label.includes("resep")) return route("staff.sales-distribution.index");
      if (label.includes("Pengantaran")) return route("staff.sales-distribution.index");
      if (label.includes("Logbook")) return route("operating.panel");
      if (label.includes("Internship")) return route("internship.applications.index");
      return "#";
    }
    function handleFormErrors(responseErrors, formErrors) {
      const errorsToShow = Object.keys(responseErrors).length > 0 ? responseErrors : formErrors;
      console.error("Form submission failed:", errorsToShow);
      if (toastNotifRef.value) {
        for (const key in errorsToShow) {
          const messages = Array.isArray(errorsToShow[key]) ? errorsToShow[key] : [errorsToShow[key]];
          messages.forEach((msg) => {
            toastNotifRef.value.showToast("warning", msg);
          });
        }
      }
    }
    function handleSubmitBillboard() {
      var _a;
      if (!form_billboard.billboard_typeText && !form_billboard.billboard_typeImage) {
        (_a = toastNotifRef.value) == null ? void 0 : _a.showToast("warning", "Pilih minimal satu tipe billboard.");
        return;
      }
      form_billboard.post("/seeo/staff/billboard/add", {
        preserveScroll: true,
        onSuccess: () => {
          var _a2, _b;
          form_billboard.reset();
          (_a2 = modal_billboard_instance.value) == null ? void 0 : _a2.hide();
          (_b = toastNotifRef.value) == null ? void 0 : _b.showToast("info", "Billboard berhasil ditambahkan.");
        },
        onError: () => {
          handleFormErrors(page.props.errors, form_billboard.errors);
        }
      });
    }
    function handleFileBillboard(event) {
      var _a;
      const file = event.target.files[0];
      if (file && file.size > 2 * 1024 * 1024) {
        (_a = toastNotifRef.value) == null ? void 0 : _a.showToast("warning", "File terlalu besar! Batas upload server Anda saat ini adalah 2MB.");
      }
      form_billboard.billboard_image = file || null;
    }
    function handleSubmitAttachment() {
      form_attachment.post("/seeo/staff/attachment/add", {
        preserveScroll: true,
        onSuccess: () => {
          var _a, _b;
          form_attachment.reset();
          (_a = modal_attachment_instance.value) == null ? void 0 : _a.hide();
          (_b = toastNotifRef.value) == null ? void 0 : _b.showToast("info", "Attachment berhasil ditambahkan.");
        },
        onError: () => {
          handleFormErrors(page.props.errors, form_attachment.errors);
        }
      });
    }
    function handleFileAttachment(event) {
      var _a;
      const file = event.target.files[0];
      if (file && file.size > 2 * 1024 * 1024) {
        (_a = toastNotifRef.value) == null ? void 0 : _a.showToast("warning", "File terlalu besar! Batas upload server Anda saat ini adalah 2MB.");
      }
      form_attachment.attachment_document = file || null;
    }
    function handleSubmitPost() {
      form_post.post("/seeo/staff/dashboard/post/add", {
        preserveScroll: true,
        onSuccess: () => {
          var _a, _b;
          form_post.reset();
          (_a = modal_post_instance.value) == null ? void 0 : _a.hide();
          (_b = toastNotifRef.value) == null ? void 0 : _b.showToast("info", "Postingan baru berhasil dibuat.");
        },
        onError: () => {
          handleFormErrors(page.props.errors, form_post.errors);
        }
      });
    }
    function getProfileImage(user) {
      if (!user) return "/storage/images/profile/example.png";
      return user.drive_profile_image_url || user.full_profile_image_url || "/storage/images/profile/example.png";
    }
    function confirmation(routeUrl, message) {
      var _a, _b;
      if (!routeUrl || routeUrl === "#") {
        (_a = toastNotifRef.value) == null ? void 0 : _a.showToast("danger", "Aksi tidak valid.");
        return;
      }
      (_b = modalConfirmationRef.value) == null ? void 0 : _b.showModal(routeUrl, message);
    }
    function showModalBillboard() {
      var _a;
      if (modal_billboard_instance.value) modal_billboard_instance.value.show();
      else (_a = toastNotifRef.value) == null ? void 0 : _a.showToast("danger", "Gagal membuka modal Billboard.");
    }
    function showModalPost() {
      var _a;
      if (modal_post_instance.value) modal_post_instance.value.show();
      else (_a = toastNotifRef.value) == null ? void 0 : _a.showToast("danger", "Gagal membuka modal Post.");
    }
    function showModalAttachment() {
      var _a;
      if (modal_attachment_instance.value) modal_attachment_instance.value.show();
      else (_a = toastNotifRef.value) == null ? void 0 : _a.showToast("danger", "Gagal membuka modal Attachment.");
    }
    function openGuide() {
      var _a;
      (_a = guideModalRef.value) == null ? void 0 : _a.open(userRoleId.value);
    }
    watch(() => props.notif, (newValue) => {
      if (newValue && toastNotifRef.value) {
        toastNotifRef.value.showToast(newValue.type, newValue.message);
      }
    }, { deep: true, immediate: true });
    watch(() => props.errors, (newErrors) => {
      if (newErrors && Object.keys(newErrors).length > 0 && toastNotifRef.value) {
        handleFormErrors(newErrors, {});
      }
    }, { deep: true, immediate: true });
    onMounted(async () => {
      var _a;
      await nextTick();
      if (typeof window.bootstrap !== "undefined") {
        const carouselElement = document.getElementById("billboardCarousel");
        if (carouselElement && ((_a = props.billboard_list) == null ? void 0 : _a.length) > 0) {
          try {
            window.bootstrap.Carousel.getOrCreateInstance(carouselElement);
          } catch (e) {
            console.error("Carousel Err:", e);
          }
        }
        const bbModalEl = document.getElementById("setBillboardModal");
        if (bbModalEl) try {
          modal_billboard_instance.value = window.bootstrap.Modal.getOrCreateInstance(bbModalEl);
        } catch (e) {
        }
        const attModalEl = document.getElementById("addAttachmentModal");
        if (attModalEl) try {
          modal_attachment_instance.value = window.bootstrap.Modal.getOrCreateInstance(attModalEl);
        } catch (e) {
        }
        const postModalEl = document.getElementById("addPostModal");
        if (postModalEl) try {
          modal_post_instance.value = window.bootstrap.Modal.getOrCreateInstance(postModalEl);
        } catch (e) {
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(StaffLayout, _attrs, {
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
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(RoleWorkflowGuideModal, {
              ref_key: "guideModalRef",
              ref: guideModalRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="dashboard-command-center py-2" data-v-71453ccd${_scopeId}><div class="hero-role-card card border-0 shadow-sm rounded-4 mb-4 overflow-hidden text-white" style="${ssrRenderStyle({ background: ((_a = currentWorkflow.value.theme) == null ? void 0 : _a.gradient) || "linear-gradient(135deg, #1e1b4b 0%, #3730a3 100%)" })}" data-v-71453ccd${_scopeId}><div class="card-body p-4 position-relative" data-v-71453ccd${_scopeId}><div class="row align-items-center g-3" data-v-71453ccd${_scopeId}><div class="col-12 col-lg-8" data-v-71453ccd${_scopeId}><div class="d-flex align-items-center gap-2 mb-2 flex-wrap" data-v-71453ccd${_scopeId}><span class="badge rounded-pill bg-white bg-opacity-20 text-white px-3 py-1 fw-medium" data-v-71453ccd${_scopeId}><i class="bi bi-person-circle me-1" data-v-71453ccd${_scopeId}></i> ${ssrInterpolate(auth_user.value.name)}</span><span class="badge rounded-pill bg-warning text-dark px-3 py-1 fw-bold" data-v-71453ccd${_scopeId}><i class="${ssrRenderClass(["bi", currentWorkflow.value.icon || "bi-stars", "me-1"])}" data-v-71453ccd${_scopeId}></i> ${ssrInterpolate(currentWorkflow.value.title)}</span><span class="badge rounded-pill bg-white bg-opacity-20 text-white px-3 py-1" data-v-71453ccd${_scopeId}> Tahun Periode: ${ssrInterpolate(selectedYear.value)}</span></div><h2 class="hero-title fw-bold mb-2 text-white" data-v-71453ccd${_scopeId}> Selamat Datang di Pusat Komando Peran Anda 👋 </h2><p class="hero-mission text-white text-opacity-90 mb-0 small lh-base" style="${ssrRenderStyle({ "max-width": "680px" })}" data-v-71453ccd${_scopeId}>${ssrInterpolate(currentWorkflow.value.mission)}</p></div><div class="col-12 col-lg-4 d-flex justify-content-lg-end" data-v-71453ccd${_scopeId}><button type="button" class="btn btn-warning text-dark fw-bold rounded-pill shadow-sm px-4 py-2 d-inline-flex align-items-center gap-2 hover-scale transition-all" data-v-71453ccd${_scopeId}><i class="bi bi-lightbulb-fill fs-5" data-v-71453ccd${_scopeId}></i><span data-v-71453ccd${_scopeId}>Buka Panduan &amp; SOP Peran</span></button></div></div></div></div><div class="daily-workflow-section mb-4" data-v-71453ccd${_scopeId}><div class="d-flex justify-content-between align-items-center mb-3" data-v-71453ccd${_scopeId}><div data-v-71453ccd${_scopeId}><h5 class="fw-bold text-dark mb-0 d-flex align-items-center gap-2" data-v-71453ccd${_scopeId}><i class="bi bi-signpost-2-fill text-primary" data-v-71453ccd${_scopeId}></i> Alur Tugas Harian (${ssrInterpolate(currentWorkflow.value.alias)}) </h5><small class="text-muted" data-v-71453ccd${_scopeId}>Ikuti alur bertahap di bawah ini untuk menyelesaikan tugas pokok peran Anda.</small></div><button type="button" class="btn btn-sm btn-link text-primary text-decoration-none fw-semibold p-0" data-v-71453ccd${_scopeId}> Lihat Kamus &amp; FAQ <i class="bi bi-arrow-right" data-v-71453ccd${_scopeId}></i></button></div><div class="row g-3" data-v-71453ccd${_scopeId}><!--[-->`);
            ssrRenderList(currentWorkflow.value.steps, (st, idx) => {
              var _a2, _b2, _c2;
              _push2(`<div class="col-12 col-md-6 col-xl-3" data-v-71453ccd${_scopeId}><div class="step-card card h-100 border-0 shadow-sm rounded-4 p-3 d-flex flex-column justify-content-between transition-all" style="${ssrRenderStyle({ backgroundColor: ((_a2 = currentWorkflow.value.theme) == null ? void 0 : _a2.lightBg) || "#ffffff" })}" data-v-71453ccd${_scopeId}><div data-v-71453ccd${_scopeId}><div class="d-flex justify-content-between align-items-center mb-2" data-v-71453ccd${_scopeId}><div class="step-badge-num fw-bold text-white rounded-circle shadow-2xs" style="${ssrRenderStyle({ backgroundColor: ((_b2 = currentWorkflow.value.theme) == null ? void 0 : _b2.accentColor) || "#4f46e5" })}" data-v-71453ccd${_scopeId}>${ssrInterpolate(st.step)}</div><span class="badge bg-white text-secondary border small" data-v-71453ccd${_scopeId}> Langkah ${ssrInterpolate(st.step)}</span></div><h6 class="fw-bold text-dark mb-1" data-v-71453ccd${_scopeId}>${ssrInterpolate(st.title)}</h6><p class="small text-secondary mb-3 lh-sm" data-v-71453ccd${_scopeId}>${ssrInterpolate(st.desc)}</p></div><div data-v-71453ccd${_scopeId}><a${ssrRenderAttr("href", route(st.route) + (st.hash || ""))} class="btn btn-sm w-100 text-white rounded-pill fw-medium d-flex align-items-center justify-content-center gap-2 shadow-2xs" style="${ssrRenderStyle({ backgroundColor: ((_c2 = currentWorkflow.value.theme) == null ? void 0 : _c2.accentColor) || "#4f46e5" })}" data-v-71453ccd${_scopeId}><span data-v-71453ccd${_scopeId}>${ssrInterpolate(st.btnText)}</span><i class="bi bi-arrow-right-short fs-6" data-v-71453ccd${_scopeId}></i></a></div></div></div>`);
            });
            _push2(`<!--]--></div></div>`);
            if (Object.keys(__props.monitoring).length) {
              _push2(`<div class="monitoring-section mb-4" data-v-71453ccd${_scopeId}><div class="mb-2" data-v-71453ccd${_scopeId}><h6 class="fw-bold text-dark mb-0 d-flex align-items-center gap-2" data-v-71453ccd${_scopeId}><i class="bi bi-bell-fill text-danger" data-v-71453ccd${_scopeId}></i> Perhatian &amp; Tugas Tertunda </h6><small class="text-muted" data-v-71453ccd${_scopeId}>Item yang memerlukan tindakan cepat dari Anda saat ini.</small></div><div class="row g-2" data-v-71453ccd${_scopeId}><!--[-->`);
              ssrRenderList(__props.monitoring, (count, label) => {
                _push2(`<div class="col-6 col-md-3" data-v-71453ccd${_scopeId}><a${ssrRenderAttr("href", getMonitoringLink(label))} class="${ssrRenderClass([count > 0 ? "border-start border-4 border-warning bg-white" : "bg-light text-muted", "card border-0 shadow-sm rounded-3 text-decoration-none transition-all hover-lift"])}" data-v-71453ccd${_scopeId}><div class="card-body p-3 d-flex justify-content-between align-items-center" data-v-71453ccd${_scopeId}><div data-v-71453ccd${_scopeId}><div class="small text-secondary text-truncate" style="${ssrRenderStyle({ "max-width": "150px" })}" data-v-71453ccd${_scopeId}>${ssrInterpolate(label)}</div><div class="${ssrRenderClass([count > 0 ? "text-danger" : "text-muted", "fs-4 fw-bold"])}" data-v-71453ccd${_scopeId}>${ssrInterpolate(count)}</div></div><div class="rounded-circle p-2 bg-light text-secondary" data-v-71453ccd${_scopeId}><i class="bi bi-arrow-up-right-square" data-v-71453ccd${_scopeId}></i></div></div></a></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="quick-shortcuts-section mb-4" data-v-71453ccd${_scopeId}><div class="mb-2" data-v-71453ccd${_scopeId}><h6 class="fw-bold text-dark mb-0 d-flex align-items-center gap-2" data-v-71453ccd${_scopeId}><i class="bi bi-grid-fill text-primary" data-v-71453ccd${_scopeId}></i> Aksi Cepat Peran Anda </h6></div><div class="row g-2" data-v-71453ccd${_scopeId}><!--[-->`);
            ssrRenderList(currentWorkflow.value.quickActions, (qa, idx) => {
              _push2(`<div class="col-6 col-sm-4 col-md-3 col-xl-2" data-v-71453ccd${_scopeId}><a${ssrRenderAttr("href", route(qa.route) + (qa.hash || ""))} class="quick-action-card card border-0 shadow-sm rounded-3 p-3 text-center text-decoration-none bg-white transition-all hover-lift h-100 d-flex flex-column align-items-center justify-content-center" data-v-71453ccd${_scopeId}><div class="${ssrRenderClass(["bg-" + (qa.color || "primary") + "-subtle text-" + (qa.color || "primary"), "qa-icon-wrapper rounded-circle p-3 mb-2 shadow-2xs"])}" data-v-71453ccd${_scopeId}><i class="${ssrRenderClass(["bi", qa.icon, "fs-4"])}" data-v-71453ccd${_scopeId}></i></div><span class="small fw-bold text-dark lh-sm text-truncate w-100" data-v-71453ccd${_scopeId}>${ssrInterpolate(qa.title)}</span></a></div>`);
            });
            _push2(`<!--]--></div></div><div class="row g-3" data-v-71453ccd${_scopeId}><div class="col-12 col-lg-8 d-flex flex-column gap-3" data-v-71453ccd${_scopeId}><div class="card shadow-sm border-0 rounded-4 overflow-hidden bg-white" data-v-71453ccd${_scopeId}><div class="card-header bg-white border-0 py-3 px-4 d-flex justify-content-between align-items-center" data-v-71453ccd${_scopeId}><h6 class="mb-0 fw-bold text-dark d-flex align-items-center gap-2" data-v-71453ccd${_scopeId}><i class="bi bi-megaphone-fill text-warning" data-v-71453ccd${_scopeId}></i> Papan Pengumuman (Billboard) </h6>`);
            if (auth_user.value.roles_id === 1 || auth_user.value.roles_id === 99) {
              _push2(`<button class="btn btn-sm btn-primary rounded-pill px-3 shadow-2xs" data-v-71453ccd${_scopeId}><i class="bi bi-plus-lg me-1" data-v-71453ccd${_scopeId}></i> Tambah Banner </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="card-body p-0 position-relative" data-v-71453ccd${_scopeId}>`);
            if (!__props.billboard_list || __props.billboard_list.length === 0) {
              _push2(`<div class="empty-billboard d-flex flex-column align-items-center justify-content-center p-5 text-center bg-light" style="${ssrRenderStyle({ "min-height": "220px" })}" data-v-71453ccd${_scopeId}><i class="bi bi-images display-5 text-muted opacity-50 mb-2" data-v-71453ccd${_scopeId}></i><h6 class="text-secondary mb-1" data-v-71453ccd${_scopeId}>Belum Ada Banner Pengumuman</h6><p class="small text-muted mb-0" data-v-71453ccd${_scopeId}>Informasi dan agenda penting kepengurusan akan ditampilkan di sini.</p></div>`);
            } else {
              _push2(`<div id="billboardCarousel" class="carousel slide" data-bs-ride="carousel" style="${ssrRenderStyle({ "max-height": "380px" })}" data-v-71453ccd${_scopeId}><div class="carousel-inner" data-v-71453ccd${_scopeId}><!--[-->`);
              ssrRenderList(__props.billboard_list, (billboard, index) => {
                _push2(`<div class="${ssrRenderClass(["carousel-item", index === 0 ? "active" : ""])}" data-v-71453ccd${_scopeId}><div class="billboard-wrapper position-relative" data-v-71453ccd${_scopeId}>`);
                if (auth_user.value.roles_id == 1 || auth_user.value.roles_id === 99) {
                  _push2(`<button class="btn btn-danger btn-sm rounded-circle p-0 lh-1 position-absolute m-3 shadow" style="${ssrRenderStyle({ "z-index": "15", "width": "32px", "height": "32px", "top": "0", "right": "0" })}" title="Hapus Banner" data-v-71453ccd${_scopeId}><i class="bi bi-trash3-fill small" data-v-71453ccd${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                if (billboard.image && billboard.full_image_url) {
                  _push2(`<img${ssrRenderAttr("src", billboard.full_image_url)} alt="Billboard" class="w-100 object-fit-cover" style="${ssrRenderStyle({ "max-height": "380px" })}" data-v-71453ccd${_scopeId}>`);
                } else {
                  _push2(`<div class="d-flex flex-column justify-content-center align-items-center text-center p-5 bg-light w-100" style="${ssrRenderStyle({ "min-height": "240px" })}" data-v-71453ccd${_scopeId}><h4 class="fw-bold text-dark mb-2" data-v-71453ccd${_scopeId}>${ssrInterpolate(billboard.title)}</h4><p class="text-secondary mb-0 small" style="${ssrRenderStyle({ "max-width": "500px" })}" data-v-71453ccd${_scopeId}>${ssrInterpolate(billboard.text)}</p></div>`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
              if (__props.billboard_list.length > 1) {
                _push2(`<button class="carousel-control-prev" type="button" data-bs-target="#billboardCarousel" data-bs-slide="prev" data-v-71453ccd${_scopeId}><span class="carousel-control-prev-icon" aria-hidden="true" data-v-71453ccd${_scopeId}></span><span class="visually-hidden" data-v-71453ccd${_scopeId}>Previous</span></button>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.billboard_list.length > 1) {
                _push2(`<button class="carousel-control-next" type="button" data-bs-target="#billboardCarousel" data-bs-slide="next" data-v-71453ccd${_scopeId}><span class="carousel-control-next-icon" aria-hidden="true" data-v-71453ccd${_scopeId}></span><span class="visually-hidden" data-v-71453ccd${_scopeId}>Next</span></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div></div><div class="card shadow-sm border-0 rounded-4 bg-white grow" data-v-71453ccd${_scopeId}><div class="card-header bg-white border-0 py-3 px-4 d-flex justify-content-between align-items-center" data-v-71453ccd${_scopeId}><h6 class="mb-0 fw-bold text-dark d-flex align-items-center gap-2" data-v-71453ccd${_scopeId}><i class="bi bi-paperclip text-primary" data-v-71453ccd${_scopeId}></i> Berkas &amp; Tautan Penting Organisasi </h6>`);
            if (auth_user.value.roles_id === 1 || auth_user.value.roles_id === 8 || auth_user.value.roles_id === 99) {
              _push2(`<button class="btn btn-sm btn-outline-primary rounded-pill px-3 shadow-2xs" data-v-71453ccd${_scopeId}><i class="bi bi-plus-lg me-1" data-v-71453ccd${_scopeId}></i> Tambah Berkas </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="card-body pt-0 px-4 pb-4" data-v-71453ccd${_scopeId}><div class="row g-3" data-v-71453ccd${_scopeId}><div class="col-12 col-md-6" data-v-71453ccd${_scopeId}><div class="p-3 rounded-3 bg-light h-100" data-v-71453ccd${_scopeId}><h6 class="small fw-bold text-secondary text-uppercase tracking-wider mb-2" data-v-71453ccd${_scopeId}><i class="bi bi-file-earmark-pdf-fill text-danger me-1" data-v-71453ccd${_scopeId}></i> Dokumen Resmi </h6>`);
            if (document_list.value.length === 0) {
              _push2(`<div class="text-center py-4 text-muted small" data-v-71453ccd${_scopeId}> Belum ada dokumen yang diunggah. </div>`);
            } else {
              _push2(`<div class="d-flex flex-column gap-2" data-v-71453ccd${_scopeId}><!--[-->`);
              ssrRenderList(document_list.value, (doc) => {
                _push2(`<div class="d-flex justify-content-between align-items-center p-2 rounded-2 bg-white border shadow-2xs" data-v-71453ccd${_scopeId}><a${ssrRenderAttr("href", `/storage/document/attachment/${doc.document}`)} class="text-decoration-none text-dark fw-medium small text-truncate me-2" download${ssrRenderAttr("title", doc.title)} data-v-71453ccd${_scopeId}><i class="bi bi-file-earmark-arrow-down text-primary me-1" data-v-71453ccd${_scopeId}></i> ${ssrInterpolate(doc.title)}</a>`);
                if (auth_user.value.roles_id === 1 || auth_user.value.roles_id === 8 || auth_user.value.roles_id === 99) {
                  _push2(`<button class="btn btn-sm btn-link text-danger p-0" title="Hapus" data-v-71453ccd${_scopeId}><i class="bi bi-trash3" data-v-71453ccd${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div><div class="col-12 col-md-6" data-v-71453ccd${_scopeId}><div class="p-3 rounded-3 bg-light h-100" data-v-71453ccd${_scopeId}><h6 class="small fw-bold text-secondary text-uppercase tracking-wider mb-2" data-v-71453ccd${_scopeId}><i class="bi bi-link-45deg text-primary me-1" data-v-71453ccd${_scopeId}></i> Tautan Cepat </h6>`);
            if (link_list.value.length === 0) {
              _push2(`<div class="text-center py-4 text-muted small" data-v-71453ccd${_scopeId}> Belum ada link eksternal. </div>`);
            } else {
              _push2(`<div class="d-flex flex-column gap-2" data-v-71453ccd${_scopeId}><!--[-->`);
              ssrRenderList(link_list.value, (lnk) => {
                _push2(`<div class="d-flex justify-content-between align-items-center p-2 rounded-2 bg-white border shadow-2xs" data-v-71453ccd${_scopeId}><a${ssrRenderAttr("href", lnk.link)} target="_blank" rel="noopener noreferrer" class="text-decoration-none text-primary fw-medium small text-truncate me-2"${ssrRenderAttr("title", lnk.title)} data-v-71453ccd${_scopeId}><i class="bi bi-box-arrow-up-right me-1" data-v-71453ccd${_scopeId}></i> ${ssrInterpolate(lnk.title)}</a>`);
                if (auth_user.value.roles_id === 1 || auth_user.value.roles_id === 8 || auth_user.value.roles_id === 99) {
                  _push2(`<button class="btn btn-sm btn-link text-danger p-0" title="Hapus" data-v-71453ccd${_scopeId}><i class="bi bi-trash3" data-v-71453ccd${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div></div></div></div></div><div class="col-12 col-lg-4" data-v-71453ccd${_scopeId}><div class="card shadow-sm border-0 rounded-4 h-100 bg-white d-flex flex-column overflow-hidden" data-v-71453ccd${_scopeId}><div class="card-header bg-primary text-white py-3 px-3 d-flex justify-content-between align-items-center" data-v-71453ccd${_scopeId}><h6 class="mb-0 fw-bold d-flex align-items-center gap-2" data-v-71453ccd${_scopeId}><i class="bi bi-chat-quote-fill text-warning" data-v-71453ccd${_scopeId}></i> SEEO Post (Feed) </h6><button class="btn btn-sm btn-light rounded-circle shadow-2xs p-0 d-flex align-items-center justify-content-center" style="${ssrRenderStyle({ "width": "32px", "height": "32px" })}" title="Buat Postingan Baru" data-v-71453ccd${_scopeId}><i class="bi bi-plus-lg text-primary fw-bold" data-v-71453ccd${_scopeId}></i></button></div><div class="card-body p-3 grow overflow-auto" style="${ssrRenderStyle({ "max-height": "600px" })}" data-v-71453ccd${_scopeId}>`);
            if (!__props.post_list || __props.post_list.length === 0) {
              _push2(`<div class="text-center py-5 text-muted small" data-v-71453ccd${_scopeId}><i class="bi bi-chat-dots display-6 opacity-50 d-block mb-2" data-v-71453ccd${_scopeId}></i> Belum ada postingan. Jadilah yang pertama berbagi! </div>`);
            } else {
              _push2(`<div class="d-flex flex-column gap-2" data-v-71453ccd${_scopeId}><!--[-->`);
              ssrRenderList(__props.post_list, (post) => {
                var _a2;
                _push2(`<div class="post-bubble p-3 rounded-3 bg-light border shadow-2xs transition-all" data-v-71453ccd${_scopeId}><div class="d-flex justify-content-between align-items-center mb-2" data-v-71453ccd${_scopeId}><div class="d-flex align-items-center gap-2 text-truncate" data-v-71453ccd${_scopeId}><img${ssrRenderAttr("src", post.full_profile_image_url || getProfileImage(post.user))} alt="Avatar" class="rounded-circle shadow-2xs" style="${ssrRenderStyle({ "width": "28px", "height": "28px", "object-fit": "cover" })}" data-v-71453ccd${_scopeId}><div class="lh-1 text-truncate" data-v-71453ccd${_scopeId}><div class="fw-bold small text-dark text-truncate" style="${ssrRenderStyle({ "max-width": "140px" })}" data-v-71453ccd${_scopeId}>${ssrInterpolate(post.anonymus ? "Anonymous" : (_a2 = post.user) == null ? void 0 : _a2.name)}</div><small class="text-muted text-3xs" data-v-71453ccd${_scopeId}>${ssrInterpolate(new Date(post.created_at).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" }))}</small></div></div>`);
                if (auth_user.value.roles_id === 99 || auth_user.value.roles_id === 1 || auth_user.value.id == post.user_id) {
                  _push2(`<button class="btn btn-sm btn-link text-danger p-0" title="Hapus Post" data-v-71453ccd${_scopeId}><i class="bi bi-trash3 small" data-v-71453ccd${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><p class="mb-0 small text-secondary lh-sm" data-v-71453ccd${_scopeId}>${ssrInterpolate(post.text)}</p></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div></div></div></div><div class="modal fade" id="setBillboardModal" tabindex="-1" aria-labelledby="setBillboardModalLabel" aria-hidden="true" data-v-71453ccd${_scopeId}><div class="modal-dialog modal-lg modal-dialog-centered" data-v-71453ccd${_scopeId}><div class="modal-content rounded-4 border-0 shadow" data-v-71453ccd${_scopeId}><form data-v-71453ccd${_scopeId}><div class="modal-header" data-v-71453ccd${_scopeId}><h5 class="modal-title fw-bold" id="setBillboardModalLabel" data-v-71453ccd${_scopeId}>Tambah Banner Billboard Baru</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-71453ccd${_scopeId}></button></div><div class="modal-body p-4" data-v-71453ccd${_scopeId}><div class="mb-3" data-v-71453ccd${_scopeId}><label for="billboard_title_modal" class="form-label fw-semibold" data-v-71453ccd${_scopeId}>Judul Pengumuman <span class="text-danger" data-v-71453ccd${_scopeId}>*</span></label><input type="text" class="form-control rounded-3" id="billboard_title_modal"${ssrRenderAttr("value", unref(form_billboard).billboard_title)} required placeholder="Contoh: Rapat Pleno Tahunan" data-v-71453ccd${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: __props.errors.billboard_title || unref(form_billboard).errors.billboard_title,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3" data-v-71453ccd${_scopeId}><label class="form-label fw-semibold" data-v-71453ccd${_scopeId}>Format Konten <span class="text-danger" data-v-71453ccd${_scopeId}>*</span></label><div class="d-flex gap-3" data-v-71453ccd${_scopeId}><div class="form-check" data-v-71453ccd${_scopeId}><input class="form-check-input" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form_billboard).billboard_typeText) ? ssrLooseContain(unref(form_billboard).billboard_typeText, null) : unref(form_billboard).billboard_typeText) ? " checked" : ""} id="billboard_typeText_modal" data-v-71453ccd${_scopeId}><label class="form-check-label" for="billboard_typeText_modal" data-v-71453ccd${_scopeId}>Teks Pesan</label></div><div class="form-check" data-v-71453ccd${_scopeId}><input class="form-check-input" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form_billboard).billboard_typeImage) ? ssrLooseContain(unref(form_billboard).billboard_typeImage, null) : unref(form_billboard).billboard_typeImage) ? " checked" : ""} id="billboard_typeImage_modal" data-v-71453ccd${_scopeId}><label class="form-check-label" for="billboard_typeImage_modal" data-v-71453ccd${_scopeId}>Gambar Poster (16:9)</label></div></div></div>`);
            if (unref(form_billboard).billboard_typeText) {
              _push2(`<div class="mb-3" data-v-71453ccd${_scopeId}><label for="billboard_text_modal" class="form-label fw-semibold" data-v-71453ccd${_scopeId}>Isi Teks Pengumuman <span class="text-danger" data-v-71453ccd${_scopeId}>*</span></label><textarea class="form-control rounded-3" id="billboard_text_modal" rows="3"${ssrIncludeBooleanAttr(unref(form_billboard).billboard_typeText) ? " required" : ""} placeholder="Tuliskan pesan lengkap..." data-v-71453ccd${_scopeId}>${ssrInterpolate(unref(form_billboard).billboard_text)}</textarea>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                message: __props.errors.billboard_text || unref(form_billboard).errors.billboard_text,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form_billboard).billboard_typeImage) {
              _push2(`<div class="mb-3" data-v-71453ccd${_scopeId}><label for="billboard_image_modal" class="form-label fw-semibold" data-v-71453ccd${_scopeId}>File Gambar Poster <span class="text-danger" data-v-71453ccd${_scopeId}>*</span></label><input class="form-control rounded-3" type="file" id="billboard_image_modal" accept="image/jpeg,image/png,image/heic"${ssrIncludeBooleanAttr(unref(form_billboard).billboard_typeImage) ? " required" : ""} data-v-71453ccd${_scopeId}><div class="form-text small" data-v-71453ccd${_scopeId}>Format JPG, PNG. Maks: 2MB.</div>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                message: __props.errors.billboard_image || unref(form_billboard).errors.billboard_image,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="modal-footer bg-light border-top p-3" data-v-71453ccd${_scopeId}><button type="button" class="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal" data-v-71453ccd${_scopeId}>Batal</button><button type="submit" class="btn btn-primary rounded-pill px-4 fw-semibold"${ssrIncludeBooleanAttr(unref(form_billboard).processing) ? " disabled" : ""} data-v-71453ccd${_scopeId}>`);
            if (unref(form_billboard).processing) {
              _push2(`<span class="spinner-border spinner-border-sm me-1" data-v-71453ccd${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` Simpan Billboard </button></div></form></div></div></div><div class="modal fade" id="addAttachmentModal" tabindex="-1" aria-labelledby="addAttachmentModalLabel" aria-hidden="true" data-v-71453ccd${_scopeId}><div class="modal-dialog modal-dialog-centered" data-v-71453ccd${_scopeId}><div class="modal-content rounded-4 border-0 shadow" data-v-71453ccd${_scopeId}><form data-v-71453ccd${_scopeId}><div class="modal-header" data-v-71453ccd${_scopeId}><h5 class="modal-title fw-bold" id="addAttachmentModalLabel" data-v-71453ccd${_scopeId}>Tambah Lampiran Berkas / Tautan</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-71453ccd${_scopeId}></button></div><div class="modal-body p-4" data-v-71453ccd${_scopeId}><div class="mb-3" data-v-71453ccd${_scopeId}><label for="attachment_title_modal" class="form-label fw-semibold" data-v-71453ccd${_scopeId}>Nama Berkas / Judul <span class="text-danger" data-v-71453ccd${_scopeId}>*</span></label><input type="text" class="form-control rounded-3" id="attachment_title_modal"${ssrRenderAttr("value", unref(form_attachment).attachment_title)} required placeholder="Contoh: AD/ART Organisasi 2026" data-v-71453ccd${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: __props.errors.attachment_title || unref(form_attachment).errors.attachment_title,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3" data-v-71453ccd${_scopeId}><label for="attachment_type_modal" class="form-label fw-semibold" data-v-71453ccd${_scopeId}>Tipe Lampiran <span class="text-danger" data-v-71453ccd${_scopeId}>*</span></label><select class="form-select rounded-3" id="attachment_type_modal" required data-v-71453ccd${_scopeId}><option value="document" data-v-71453ccd${ssrIncludeBooleanAttr(Array.isArray(unref(form_attachment).attachment_type) ? ssrLooseContain(unref(form_attachment).attachment_type, "document") : ssrLooseEqual(unref(form_attachment).attachment_type, "document")) ? " selected" : ""}${_scopeId}>Dokumen File (PDF / Word / Gambar)</option><option value="link" data-v-71453ccd${ssrIncludeBooleanAttr(Array.isArray(unref(form_attachment).attachment_type) ? ssrLooseContain(unref(form_attachment).attachment_type, "link") : ssrLooseEqual(unref(form_attachment).attachment_type, "link")) ? " selected" : ""}${_scopeId}>Tautan Eksternal (Google Drive / Form / Website)</option></select></div>`);
            if (unref(form_attachment).attachment_type === "document") {
              _push2(`<div class="mb-3" data-v-71453ccd${_scopeId}><label for="attachment_document_modal" class="form-label fw-semibold" data-v-71453ccd${_scopeId}>Pilih Berkas File <span class="text-danger" data-v-71453ccd${_scopeId}>*</span></label><input class="form-control rounded-3" type="file" id="attachment_document_modal" accept=".pdf,.doc,.docx,.png,.jpeg,.jpg,.heic"${ssrIncludeBooleanAttr(unref(form_attachment).attachment_type === "document") ? " required" : ""} data-v-71453ccd${_scopeId}><div class="form-text small" data-v-71453ccd${_scopeId}>PDF, DOCX, PNG, JPG. Maksimal 2MB.</div>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                message: __props.errors.attachment_document || unref(form_attachment).errors.attachment_document,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form_attachment).attachment_type === "link") {
              _push2(`<div class="mb-3" data-v-71453ccd${_scopeId}><label for="attachment_link_modal" class="form-label fw-semibold" data-v-71453ccd${_scopeId}>URL Alamat Tautan <span class="text-danger" data-v-71453ccd${_scopeId}>*</span></label><input type="url" class="form-control rounded-3" id="attachment_link_modal"${ssrRenderAttr("value", unref(form_attachment).attachment_link)} placeholder="https://..."${ssrIncludeBooleanAttr(unref(form_attachment).attachment_type === "link") ? " required" : ""} data-v-71453ccd${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                message: __props.errors.attachment_link || unref(form_attachment).errors.attachment_link,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="modal-footer bg-light border-top p-3" data-v-71453ccd${_scopeId}><button type="button" class="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal" data-v-71453ccd${_scopeId}>Batal</button><button type="submit" class="btn btn-primary rounded-pill px-4 fw-semibold"${ssrIncludeBooleanAttr(unref(form_attachment).processing) ? " disabled" : ""} data-v-71453ccd${_scopeId}>`);
            if (unref(form_attachment).processing) {
              _push2(`<span class="spinner-border spinner-border-sm me-1" data-v-71453ccd${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` Simpan Lampiran </button></div></form></div></div></div><div class="modal fade" id="addPostModal" tabindex="-1" aria-labelledby="addPostModalLabel" aria-hidden="true" data-v-71453ccd${_scopeId}><div class="modal-dialog modal-dialog-centered" data-v-71453ccd${_scopeId}><div class="modal-content rounded-4 border-0 shadow" data-v-71453ccd${_scopeId}><form data-v-71453ccd${_scopeId}><div class="modal-header" data-v-71453ccd${_scopeId}><h5 class="modal-title fw-bold" id="addPostModalLabel" data-v-71453ccd${_scopeId}>Buat Postingan Baru di Feed SEEO</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-71453ccd${_scopeId}></button></div><div class="modal-body p-4" data-v-71453ccd${_scopeId}><div class="mb-3" data-v-71453ccd${_scopeId}><label for="post_text_modal" class="form-label fw-semibold" data-v-71453ccd${_scopeId}>Tulis Pesan <span class="text-danger" data-v-71453ccd${_scopeId}>*</span></label><textarea class="form-control rounded-3" id="post_text_modal" rows="4" required maxlength="255" placeholder="Bagikan informasi atau kabar ke seluruh staf..." data-v-71453ccd${_scopeId}>${ssrInterpolate(unref(form_post).post_text)}</textarea><div class="form-text text-end small" data-v-71453ccd${_scopeId}>${ssrInterpolate(((_b = unref(form_post).post_text) == null ? void 0 : _b.length) || 0)}/255 karakter</div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: __props.errors.post_text || unref(form_post).errors.post_text,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form-check" data-v-71453ccd${_scopeId}><input class="form-check-input" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form_post).post_username) ? ssrLooseContain(unref(form_post).post_username, null) : unref(form_post).post_username) ? " checked" : ""} id="post_username_modal" data-v-71453ccd${_scopeId}><label class="form-check-label" for="post_username_modal" data-v-71453ccd${_scopeId}>Kirim sebagai Anonymous (Nama Disamarkan)</label></div></div><div class="modal-footer bg-light border-top p-3" data-v-71453ccd${_scopeId}><button type="button" class="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal" data-v-71453ccd${_scopeId}>Batal</button><button type="submit" class="btn btn-primary rounded-pill px-4 fw-semibold"${ssrIncludeBooleanAttr(unref(form_post).processing) ? " disabled" : ""} data-v-71453ccd${_scopeId}>`);
            if (unref(form_post).processing) {
              _push2(`<span class="spinner-border spinner-border-sm me-1" data-v-71453ccd${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` Terbitkan Post </button></div></form></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              ref_key: "toastNotifRef",
              ref: toastNotifRef
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
              }, null, 512),
              createVNode(RoleWorkflowGuideModal, {
                ref_key: "guideModalRef",
                ref: guideModalRef
              }, null, 512),
              createVNode("div", { class: "dashboard-command-center py-2" }, [
                createVNode("div", {
                  class: "hero-role-card card border-0 shadow-sm rounded-4 mb-4 overflow-hidden text-white",
                  style: { background: ((_c = currentWorkflow.value.theme) == null ? void 0 : _c.gradient) || "linear-gradient(135deg, #1e1b4b 0%, #3730a3 100%)" }
                }, [
                  createVNode("div", { class: "card-body p-4 position-relative" }, [
                    createVNode("div", { class: "row align-items-center g-3" }, [
                      createVNode("div", { class: "col-12 col-lg-8" }, [
                        createVNode("div", { class: "d-flex align-items-center gap-2 mb-2 flex-wrap" }, [
                          createVNode("span", { class: "badge rounded-pill bg-white bg-opacity-20 text-white px-3 py-1 fw-medium" }, [
                            createVNode("i", { class: "bi bi-person-circle me-1" }),
                            createTextVNode(" " + toDisplayString(auth_user.value.name), 1)
                          ]),
                          createVNode("span", { class: "badge rounded-pill bg-warning text-dark px-3 py-1 fw-bold" }, [
                            createVNode("i", {
                              class: ["bi", currentWorkflow.value.icon || "bi-stars", "me-1"]
                            }, null, 2),
                            createTextVNode(" " + toDisplayString(currentWorkflow.value.title), 1)
                          ]),
                          createVNode("span", { class: "badge rounded-pill bg-white bg-opacity-20 text-white px-3 py-1" }, " Tahun Periode: " + toDisplayString(selectedYear.value), 1)
                        ]),
                        createVNode("h2", { class: "hero-title fw-bold mb-2 text-white" }, " Selamat Datang di Pusat Komando Peran Anda 👋 "),
                        createVNode("p", {
                          class: "hero-mission text-white text-opacity-90 mb-0 small lh-base",
                          style: { "max-width": "680px" }
                        }, toDisplayString(currentWorkflow.value.mission), 1)
                      ]),
                      createVNode("div", { class: "col-12 col-lg-4 d-flex justify-content-lg-end" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-warning text-dark fw-bold rounded-pill shadow-sm px-4 py-2 d-inline-flex align-items-center gap-2 hover-scale transition-all",
                          onClick: openGuide
                        }, [
                          createVNode("i", { class: "bi bi-lightbulb-fill fs-5" }),
                          createVNode("span", null, "Buka Panduan & SOP Peran")
                        ])
                      ])
                    ])
                  ])
                ], 4),
                createVNode("div", { class: "daily-workflow-section mb-4" }, [
                  createVNode("div", { class: "d-flex justify-content-between align-items-center mb-3" }, [
                    createVNode("div", null, [
                      createVNode("h5", { class: "fw-bold text-dark mb-0 d-flex align-items-center gap-2" }, [
                        createVNode("i", { class: "bi bi-signpost-2-fill text-primary" }),
                        createTextVNode(" Alur Tugas Harian (" + toDisplayString(currentWorkflow.value.alias) + ") ", 1)
                      ]),
                      createVNode("small", { class: "text-muted" }, "Ikuti alur bertahap di bawah ini untuk menyelesaikan tugas pokok peran Anda.")
                    ]),
                    createVNode("button", {
                      type: "button",
                      class: "btn btn-sm btn-link text-primary text-decoration-none fw-semibold p-0",
                      onClick: openGuide
                    }, [
                      createTextVNode(" Lihat Kamus & FAQ "),
                      createVNode("i", { class: "bi bi-arrow-right" })
                    ])
                  ]),
                  createVNode("div", { class: "row g-3" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(currentWorkflow.value.steps, (st, idx) => {
                      var _a2, _b2, _c2;
                      return openBlock(), createBlock("div", {
                        key: idx,
                        class: "col-12 col-md-6 col-xl-3"
                      }, [
                        createVNode("div", {
                          class: "step-card card h-100 border-0 shadow-sm rounded-4 p-3 d-flex flex-column justify-content-between transition-all",
                          style: { backgroundColor: ((_a2 = currentWorkflow.value.theme) == null ? void 0 : _a2.lightBg) || "#ffffff" }
                        }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "d-flex justify-content-between align-items-center mb-2" }, [
                              createVNode("div", {
                                class: "step-badge-num fw-bold text-white rounded-circle shadow-2xs",
                                style: { backgroundColor: ((_b2 = currentWorkflow.value.theme) == null ? void 0 : _b2.accentColor) || "#4f46e5" }
                              }, toDisplayString(st.step), 5),
                              createVNode("span", { class: "badge bg-white text-secondary border small" }, " Langkah " + toDisplayString(st.step), 1)
                            ]),
                            createVNode("h6", { class: "fw-bold text-dark mb-1" }, toDisplayString(st.title), 1),
                            createVNode("p", { class: "small text-secondary mb-3 lh-sm" }, toDisplayString(st.desc), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("a", {
                              href: route(st.route) + (st.hash || ""),
                              class: "btn btn-sm w-100 text-white rounded-pill fw-medium d-flex align-items-center justify-content-center gap-2 shadow-2xs",
                              style: { backgroundColor: ((_c2 = currentWorkflow.value.theme) == null ? void 0 : _c2.accentColor) || "#4f46e5" }
                            }, [
                              createVNode("span", null, toDisplayString(st.btnText), 1),
                              createVNode("i", { class: "bi bi-arrow-right-short fs-6" })
                            ], 12, ["href"])
                          ])
                        ], 4)
                      ]);
                    }), 128))
                  ])
                ]),
                Object.keys(__props.monitoring).length ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "monitoring-section mb-4"
                }, [
                  createVNode("div", { class: "mb-2" }, [
                    createVNode("h6", { class: "fw-bold text-dark mb-0 d-flex align-items-center gap-2" }, [
                      createVNode("i", { class: "bi bi-bell-fill text-danger" }),
                      createTextVNode(" Perhatian & Tugas Tertunda ")
                    ]),
                    createVNode("small", { class: "text-muted" }, "Item yang memerlukan tindakan cepat dari Anda saat ini.")
                  ]),
                  createVNode("div", { class: "row g-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.monitoring, (count, label) => {
                      return openBlock(), createBlock("div", {
                        key: label,
                        class: "col-6 col-md-3"
                      }, [
                        createVNode("a", {
                          href: getMonitoringLink(label),
                          class: ["card border-0 shadow-sm rounded-3 text-decoration-none transition-all hover-lift", count > 0 ? "border-start border-4 border-warning bg-white" : "bg-light text-muted"]
                        }, [
                          createVNode("div", { class: "card-body p-3 d-flex justify-content-between align-items-center" }, [
                            createVNode("div", null, [
                              createVNode("div", {
                                class: "small text-secondary text-truncate",
                                style: { "max-width": "150px" }
                              }, toDisplayString(label), 1),
                              createVNode("div", {
                                class: ["fs-4 fw-bold", count > 0 ? "text-danger" : "text-muted"]
                              }, toDisplayString(count), 3)
                            ]),
                            createVNode("div", { class: "rounded-circle p-2 bg-light text-secondary" }, [
                              createVNode("i", { class: "bi bi-arrow-up-right-square" })
                            ])
                          ])
                        ], 10, ["href"])
                      ]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "quick-shortcuts-section mb-4" }, [
                  createVNode("div", { class: "mb-2" }, [
                    createVNode("h6", { class: "fw-bold text-dark mb-0 d-flex align-items-center gap-2" }, [
                      createVNode("i", { class: "bi bi-grid-fill text-primary" }),
                      createTextVNode(" Aksi Cepat Peran Anda ")
                    ])
                  ]),
                  createVNode("div", { class: "row g-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(currentWorkflow.value.quickActions, (qa, idx) => {
                      return openBlock(), createBlock("div", {
                        key: idx,
                        class: "col-6 col-sm-4 col-md-3 col-xl-2"
                      }, [
                        createVNode("a", {
                          href: route(qa.route) + (qa.hash || ""),
                          class: "quick-action-card card border-0 shadow-sm rounded-3 p-3 text-center text-decoration-none bg-white transition-all hover-lift h-100 d-flex flex-column align-items-center justify-content-center"
                        }, [
                          createVNode("div", {
                            class: ["qa-icon-wrapper rounded-circle p-3 mb-2 shadow-2xs", "bg-" + (qa.color || "primary") + "-subtle text-" + (qa.color || "primary")]
                          }, [
                            createVNode("i", {
                              class: ["bi", qa.icon, "fs-4"]
                            }, null, 2)
                          ], 2),
                          createVNode("span", { class: "small fw-bold text-dark lh-sm text-truncate w-100" }, toDisplayString(qa.title), 1)
                        ], 8, ["href"])
                      ]);
                    }), 128))
                  ])
                ]),
                createVNode("div", { class: "row g-3" }, [
                  createVNode("div", { class: "col-12 col-lg-8 d-flex flex-column gap-3" }, [
                    createVNode("div", { class: "card shadow-sm border-0 rounded-4 overflow-hidden bg-white" }, [
                      createVNode("div", { class: "card-header bg-white border-0 py-3 px-4 d-flex justify-content-between align-items-center" }, [
                        createVNode("h6", { class: "mb-0 fw-bold text-dark d-flex align-items-center gap-2" }, [
                          createVNode("i", { class: "bi bi-megaphone-fill text-warning" }),
                          createTextVNode(" Papan Pengumuman (Billboard) ")
                        ]),
                        auth_user.value.roles_id === 1 || auth_user.value.roles_id === 99 ? (openBlock(), createBlock("button", {
                          key: 0,
                          class: "btn btn-sm btn-primary rounded-pill px-3 shadow-2xs",
                          onClick: showModalBillboard
                        }, [
                          createVNode("i", { class: "bi bi-plus-lg me-1" }),
                          createTextVNode(" Tambah Banner ")
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "card-body p-0 position-relative" }, [
                        !__props.billboard_list || __props.billboard_list.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "empty-billboard d-flex flex-column align-items-center justify-content-center p-5 text-center bg-light",
                          style: { "min-height": "220px" }
                        }, [
                          createVNode("i", { class: "bi bi-images display-5 text-muted opacity-50 mb-2" }),
                          createVNode("h6", { class: "text-secondary mb-1" }, "Belum Ada Banner Pengumuman"),
                          createVNode("p", { class: "small text-muted mb-0" }, "Informasi dan agenda penting kepengurusan akan ditampilkan di sini.")
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          id: "billboardCarousel",
                          class: "carousel slide",
                          "data-bs-ride": "carousel",
                          style: { "max-height": "380px" }
                        }, [
                          createVNode("div", { class: "carousel-inner" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.billboard_list, (billboard, index) => {
                              return openBlock(), createBlock("div", {
                                key: billboard.id,
                                class: ["carousel-item", index === 0 ? "active" : ""]
                              }, [
                                createVNode("div", { class: "billboard-wrapper position-relative" }, [
                                  auth_user.value.roles_id == 1 || auth_user.value.roles_id === 99 ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    class: "btn btn-danger btn-sm rounded-circle p-0 lh-1 position-absolute m-3 shadow",
                                    style: { "z-index": "15", "width": "32px", "height": "32px", "top": "0", "right": "0" },
                                    onClick: ($event) => confirmation(`/seeo/staff/billboard/delete/${billboard.id}`, `Hapus billboard '${billboard.title}'?`),
                                    title: "Hapus Banner"
                                  }, [
                                    createVNode("i", { class: "bi bi-trash3-fill small" })
                                  ], 8, ["onClick"])) : createCommentVNode("", true),
                                  billboard.image && billboard.full_image_url ? (openBlock(), createBlock("img", {
                                    key: 1,
                                    src: billboard.full_image_url,
                                    alt: "Billboard",
                                    class: "w-100 object-fit-cover",
                                    style: { "max-height": "380px" },
                                    onError: ($event) => $event.target.style.display = "none"
                                  }, null, 40, ["src", "onError"])) : (openBlock(), createBlock("div", {
                                    key: 2,
                                    class: "d-flex flex-column justify-content-center align-items-center text-center p-5 bg-light w-100",
                                    style: { "min-height": "240px" }
                                  }, [
                                    createVNode("h4", { class: "fw-bold text-dark mb-2" }, toDisplayString(billboard.title), 1),
                                    createVNode("p", {
                                      class: "text-secondary mb-0 small",
                                      style: { "max-width": "500px" }
                                    }, toDisplayString(billboard.text), 1)
                                  ]))
                                ])
                              ], 2);
                            }), 128))
                          ]),
                          __props.billboard_list.length > 1 ? (openBlock(), createBlock("button", {
                            key: 0,
                            class: "carousel-control-prev",
                            type: "button",
                            "data-bs-target": "#billboardCarousel",
                            "data-bs-slide": "prev"
                          }, [
                            createVNode("span", {
                              class: "carousel-control-prev-icon",
                              "aria-hidden": "true"
                            }),
                            createVNode("span", { class: "visually-hidden" }, "Previous")
                          ])) : createCommentVNode("", true),
                          __props.billboard_list.length > 1 ? (openBlock(), createBlock("button", {
                            key: 1,
                            class: "carousel-control-next",
                            type: "button",
                            "data-bs-target": "#billboardCarousel",
                            "data-bs-slide": "next"
                          }, [
                            createVNode("span", {
                              class: "carousel-control-next-icon",
                              "aria-hidden": "true"
                            }),
                            createVNode("span", { class: "visually-hidden" }, "Next")
                          ])) : createCommentVNode("", true)
                        ]))
                      ])
                    ]),
                    createVNode("div", { class: "card shadow-sm border-0 rounded-4 bg-white grow" }, [
                      createVNode("div", { class: "card-header bg-white border-0 py-3 px-4 d-flex justify-content-between align-items-center" }, [
                        createVNode("h6", { class: "mb-0 fw-bold text-dark d-flex align-items-center gap-2" }, [
                          createVNode("i", { class: "bi bi-paperclip text-primary" }),
                          createTextVNode(" Berkas & Tautan Penting Organisasi ")
                        ]),
                        auth_user.value.roles_id === 1 || auth_user.value.roles_id === 8 || auth_user.value.roles_id === 99 ? (openBlock(), createBlock("button", {
                          key: 0,
                          class: "btn btn-sm btn-outline-primary rounded-pill px-3 shadow-2xs",
                          onClick: showModalAttachment
                        }, [
                          createVNode("i", { class: "bi bi-plus-lg me-1" }),
                          createTextVNode(" Tambah Berkas ")
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "card-body pt-0 px-4 pb-4" }, [
                        createVNode("div", { class: "row g-3" }, [
                          createVNode("div", { class: "col-12 col-md-6" }, [
                            createVNode("div", { class: "p-3 rounded-3 bg-light h-100" }, [
                              createVNode("h6", { class: "small fw-bold text-secondary text-uppercase tracking-wider mb-2" }, [
                                createVNode("i", { class: "bi bi-file-earmark-pdf-fill text-danger me-1" }),
                                createTextVNode(" Dokumen Resmi ")
                              ]),
                              document_list.value.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center py-4 text-muted small"
                              }, " Belum ada dokumen yang diunggah. ")) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "d-flex flex-column gap-2"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(document_list.value, (doc) => {
                                  return openBlock(), createBlock("div", {
                                    key: doc.id,
                                    class: "d-flex justify-content-between align-items-center p-2 rounded-2 bg-white border shadow-2xs"
                                  }, [
                                    createVNode("a", {
                                      href: `/storage/document/attachment/${doc.document}`,
                                      class: "text-decoration-none text-dark fw-medium small text-truncate me-2",
                                      download: "",
                                      title: doc.title
                                    }, [
                                      createVNode("i", { class: "bi bi-file-earmark-arrow-down text-primary me-1" }),
                                      createTextVNode(" " + toDisplayString(doc.title), 1)
                                    ], 8, ["href", "title"]),
                                    auth_user.value.roles_id === 1 || auth_user.value.roles_id === 8 || auth_user.value.roles_id === 99 ? (openBlock(), createBlock("button", {
                                      key: 0,
                                      class: "btn btn-sm btn-link text-danger p-0",
                                      onClick: ($event) => confirmation(`/seeo/staff/attachment/delete/${doc.id}`, `Hapus attachment '${doc.title}'?`),
                                      title: "Hapus"
                                    }, [
                                      createVNode("i", { class: "bi bi-trash3" })
                                    ], 8, ["onClick"])) : createCommentVNode("", true)
                                  ]);
                                }), 128))
                              ]))
                            ])
                          ]),
                          createVNode("div", { class: "col-12 col-md-6" }, [
                            createVNode("div", { class: "p-3 rounded-3 bg-light h-100" }, [
                              createVNode("h6", { class: "small fw-bold text-secondary text-uppercase tracking-wider mb-2" }, [
                                createVNode("i", { class: "bi bi-link-45deg text-primary me-1" }),
                                createTextVNode(" Tautan Cepat ")
                              ]),
                              link_list.value.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-center py-4 text-muted small"
                              }, " Belum ada link eksternal. ")) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "d-flex flex-column gap-2"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(link_list.value, (lnk) => {
                                  return openBlock(), createBlock("div", {
                                    key: lnk.id,
                                    class: "d-flex justify-content-between align-items-center p-2 rounded-2 bg-white border shadow-2xs"
                                  }, [
                                    createVNode("a", {
                                      href: lnk.link,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      class: "text-decoration-none text-primary fw-medium small text-truncate me-2",
                                      title: lnk.title
                                    }, [
                                      createVNode("i", { class: "bi bi-box-arrow-up-right me-1" }),
                                      createTextVNode(" " + toDisplayString(lnk.title), 1)
                                    ], 8, ["href", "title"]),
                                    auth_user.value.roles_id === 1 || auth_user.value.roles_id === 8 || auth_user.value.roles_id === 99 ? (openBlock(), createBlock("button", {
                                      key: 0,
                                      class: "btn btn-sm btn-link text-danger p-0",
                                      onClick: ($event) => confirmation(`/seeo/staff/attachment/delete/${lnk.id}`, `Hapus link '${lnk.title}'?`),
                                      title: "Hapus"
                                    }, [
                                      createVNode("i", { class: "bi bi-trash3" })
                                    ], 8, ["onClick"])) : createCommentVNode("", true)
                                  ]);
                                }), 128))
                              ]))
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "col-12 col-lg-4" }, [
                    createVNode("div", { class: "card shadow-sm border-0 rounded-4 h-100 bg-white d-flex flex-column overflow-hidden" }, [
                      createVNode("div", { class: "card-header bg-primary text-white py-3 px-3 d-flex justify-content-between align-items-center" }, [
                        createVNode("h6", { class: "mb-0 fw-bold d-flex align-items-center gap-2" }, [
                          createVNode("i", { class: "bi bi-chat-quote-fill text-warning" }),
                          createTextVNode(" SEEO Post (Feed) ")
                        ]),
                        createVNode("button", {
                          class: "btn btn-sm btn-light rounded-circle shadow-2xs p-0 d-flex align-items-center justify-content-center",
                          style: { "width": "32px", "height": "32px" },
                          onClick: showModalPost,
                          title: "Buat Postingan Baru"
                        }, [
                          createVNode("i", { class: "bi bi-plus-lg text-primary fw-bold" })
                        ])
                      ]),
                      createVNode("div", {
                        class: "card-body p-3 grow overflow-auto",
                        style: { "max-height": "600px" }
                      }, [
                        !__props.post_list || __props.post_list.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center py-5 text-muted small"
                        }, [
                          createVNode("i", { class: "bi bi-chat-dots display-6 opacity-50 d-block mb-2" }),
                          createTextVNode(" Belum ada postingan. Jadilah yang pertama berbagi! ")
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "d-flex flex-column gap-2"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.post_list, (post) => {
                            var _a2;
                            return openBlock(), createBlock("div", {
                              key: post.id,
                              class: "post-bubble p-3 rounded-3 bg-light border shadow-2xs transition-all"
                            }, [
                              createVNode("div", { class: "d-flex justify-content-between align-items-center mb-2" }, [
                                createVNode("div", { class: "d-flex align-items-center gap-2 text-truncate" }, [
                                  createVNode("img", {
                                    src: post.full_profile_image_url || getProfileImage(post.user),
                                    alt: "Avatar",
                                    class: "rounded-circle shadow-2xs",
                                    style: { "width": "28px", "height": "28px", "object-fit": "cover" },
                                    onError: ($event) => $event.target.src = "/storage/images/profile/example.png"
                                  }, null, 40, ["src", "onError"]),
                                  createVNode("div", { class: "lh-1 text-truncate" }, [
                                    createVNode("div", {
                                      class: "fw-bold small text-dark text-truncate",
                                      style: { "max-width": "140px" }
                                    }, toDisplayString(post.anonymus ? "Anonymous" : (_a2 = post.user) == null ? void 0 : _a2.name), 1),
                                    createVNode("small", { class: "text-muted text-3xs" }, toDisplayString(new Date(post.created_at).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" })), 1)
                                  ])
                                ]),
                                auth_user.value.roles_id === 99 || auth_user.value.roles_id === 1 || auth_user.value.id == post.user_id ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  class: "btn btn-sm btn-link text-danger p-0",
                                  onClick: ($event) => confirmation(`/seeo/staff/dashboard/post/remove/${post.id}`, "Hapus postingan ini?"),
                                  title: "Hapus Post"
                                }, [
                                  createVNode("i", { class: "bi bi-trash3 small" })
                                ], 8, ["onClick"])) : createCommentVNode("", true)
                              ]),
                              createVNode("p", { class: "mb-0 small text-secondary lh-sm" }, toDisplayString(post.text), 1)
                            ]);
                          }), 128))
                        ]))
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal fade",
                id: "setBillboardModal",
                tabindex: "-1",
                "aria-labelledby": "setBillboardModalLabel",
                "aria-hidden": "true"
              }, [
                createVNode("div", { class: "modal-dialog modal-lg modal-dialog-centered" }, [
                  createVNode("div", { class: "modal-content rounded-4 border-0 shadow" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(handleSubmitBillboard, ["prevent"])
                    }, [
                      createVNode("div", { class: "modal-header" }, [
                        createVNode("h5", {
                          class: "modal-title fw-bold",
                          id: "setBillboardModalLabel"
                        }, "Tambah Banner Billboard Baru"),
                        createVNode("button", {
                          type: "button",
                          class: "btn-close",
                          "data-bs-dismiss": "modal",
                          "aria-label": "Close"
                        })
                      ]),
                      createVNode("div", { class: "modal-body p-4" }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "billboard_title_modal",
                            class: "form-label fw-semibold"
                          }, [
                            createTextVNode("Judul Pengumuman "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            class: "form-control rounded-3",
                            id: "billboard_title_modal",
                            "onUpdate:modelValue": ($event) => unref(form_billboard).billboard_title = $event,
                            required: "",
                            placeholder: "Contoh: Rapat Pleno Tahunan"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form_billboard).billboard_title]
                          ]),
                          createVNode(_sfc_main$2, {
                            message: __props.errors.billboard_title || unref(form_billboard).errors.billboard_title,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label fw-semibold" }, [
                            createTextVNode("Format Konten "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          createVNode("div", { class: "d-flex gap-3" }, [
                            createVNode("div", { class: "form-check" }, [
                              withDirectives(createVNode("input", {
                                class: "form-check-input",
                                type: "checkbox",
                                "onUpdate:modelValue": ($event) => unref(form_billboard).billboard_typeText = $event,
                                id: "billboard_typeText_modal"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(form_billboard).billboard_typeText]
                              ]),
                              createVNode("label", {
                                class: "form-check-label",
                                for: "billboard_typeText_modal"
                              }, "Teks Pesan")
                            ]),
                            createVNode("div", { class: "form-check" }, [
                              withDirectives(createVNode("input", {
                                class: "form-check-input",
                                type: "checkbox",
                                "onUpdate:modelValue": ($event) => unref(form_billboard).billboard_typeImage = $event,
                                id: "billboard_typeImage_modal"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(form_billboard).billboard_typeImage]
                              ]),
                              createVNode("label", {
                                class: "form-check-label",
                                for: "billboard_typeImage_modal"
                              }, "Gambar Poster (16:9)")
                            ])
                          ])
                        ]),
                        unref(form_billboard).billboard_typeText ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mb-3"
                        }, [
                          createVNode("label", {
                            for: "billboard_text_modal",
                            class: "form-label fw-semibold"
                          }, [
                            createTextVNode("Isi Teks Pengumuman "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          withDirectives(createVNode("textarea", {
                            class: "form-control rounded-3",
                            id: "billboard_text_modal",
                            rows: "3",
                            "onUpdate:modelValue": ($event) => unref(form_billboard).billboard_text = $event,
                            required: unref(form_billboard).billboard_typeText,
                            placeholder: "Tuliskan pesan lengkap..."
                          }, null, 8, ["onUpdate:modelValue", "required"]), [
                            [vModelText, unref(form_billboard).billboard_text]
                          ]),
                          createVNode(_sfc_main$2, {
                            message: __props.errors.billboard_text || unref(form_billboard).errors.billboard_text,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ])) : createCommentVNode("", true),
                        unref(form_billboard).billboard_typeImage ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mb-3"
                        }, [
                          createVNode("label", {
                            for: "billboard_image_modal",
                            class: "form-label fw-semibold"
                          }, [
                            createTextVNode("File Gambar Poster "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          createVNode("input", {
                            class: "form-control rounded-3",
                            type: "file",
                            id: "billboard_image_modal",
                            onInput: handleFileBillboard,
                            accept: "image/jpeg,image/png,image/heic",
                            required: unref(form_billboard).billboard_typeImage
                          }, null, 40, ["required"]),
                          createVNode("div", { class: "form-text small" }, "Format JPG, PNG. Maks: 2MB."),
                          createVNode(_sfc_main$2, {
                            message: __props.errors.billboard_image || unref(form_billboard).errors.billboard_image,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "modal-footer bg-light border-top p-3" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-secondary rounded-pill px-4",
                          "data-bs-dismiss": "modal"
                        }, "Batal"),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary rounded-pill px-4 fw-semibold",
                          disabled: unref(form_billboard).processing
                        }, [
                          unref(form_billboard).processing ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "spinner-border spinner-border-sm me-1"
                          })) : createCommentVNode("", true),
                          createTextVNode(" Simpan Billboard ")
                        ], 8, ["disabled"])
                      ])
                    ], 32)
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal fade",
                id: "addAttachmentModal",
                tabindex: "-1",
                "aria-labelledby": "addAttachmentModalLabel",
                "aria-hidden": "true"
              }, [
                createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                  createVNode("div", { class: "modal-content rounded-4 border-0 shadow" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(handleSubmitAttachment, ["prevent"])
                    }, [
                      createVNode("div", { class: "modal-header" }, [
                        createVNode("h5", {
                          class: "modal-title fw-bold",
                          id: "addAttachmentModalLabel"
                        }, "Tambah Lampiran Berkas / Tautan"),
                        createVNode("button", {
                          type: "button",
                          class: "btn-close",
                          "data-bs-dismiss": "modal",
                          "aria-label": "Close"
                        })
                      ]),
                      createVNode("div", { class: "modal-body p-4" }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "attachment_title_modal",
                            class: "form-label fw-semibold"
                          }, [
                            createTextVNode("Nama Berkas / Judul "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            class: "form-control rounded-3",
                            id: "attachment_title_modal",
                            "onUpdate:modelValue": ($event) => unref(form_attachment).attachment_title = $event,
                            required: "",
                            placeholder: "Contoh: AD/ART Organisasi 2026"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form_attachment).attachment_title]
                          ]),
                          createVNode(_sfc_main$2, {
                            message: __props.errors.attachment_title || unref(form_attachment).errors.attachment_title,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "attachment_type_modal",
                            class: "form-label fw-semibold"
                          }, [
                            createTextVNode("Tipe Lampiran "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          withDirectives(createVNode("select", {
                            class: "form-select rounded-3",
                            id: "attachment_type_modal",
                            "onUpdate:modelValue": ($event) => unref(form_attachment).attachment_type = $event,
                            required: ""
                          }, [
                            createVNode("option", { value: "document" }, "Dokumen File (PDF / Word / Gambar)"),
                            createVNode("option", { value: "link" }, "Tautan Eksternal (Google Drive / Form / Website)")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form_attachment).attachment_type]
                          ])
                        ]),
                        unref(form_attachment).attachment_type === "document" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mb-3"
                        }, [
                          createVNode("label", {
                            for: "attachment_document_modal",
                            class: "form-label fw-semibold"
                          }, [
                            createTextVNode("Pilih Berkas File "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          createVNode("input", {
                            class: "form-control rounded-3",
                            type: "file",
                            id: "attachment_document_modal",
                            onInput: handleFileAttachment,
                            accept: ".pdf,.doc,.docx,.png,.jpeg,.jpg,.heic",
                            required: unref(form_attachment).attachment_type === "document"
                          }, null, 40, ["required"]),
                          createVNode("div", { class: "form-text small" }, "PDF, DOCX, PNG, JPG. Maksimal 2MB."),
                          createVNode(_sfc_main$2, {
                            message: __props.errors.attachment_document || unref(form_attachment).errors.attachment_document,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ])) : createCommentVNode("", true),
                        unref(form_attachment).attachment_type === "link" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mb-3"
                        }, [
                          createVNode("label", {
                            for: "attachment_link_modal",
                            class: "form-label fw-semibold"
                          }, [
                            createTextVNode("URL Alamat Tautan "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "url",
                            class: "form-control rounded-3",
                            id: "attachment_link_modal",
                            "onUpdate:modelValue": ($event) => unref(form_attachment).attachment_link = $event,
                            placeholder: "https://...",
                            required: unref(form_attachment).attachment_type === "link"
                          }, null, 8, ["onUpdate:modelValue", "required"]), [
                            [vModelText, unref(form_attachment).attachment_link]
                          ]),
                          createVNode(_sfc_main$2, {
                            message: __props.errors.attachment_link || unref(form_attachment).errors.attachment_link,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "modal-footer bg-light border-top p-3" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-secondary rounded-pill px-4",
                          "data-bs-dismiss": "modal"
                        }, "Batal"),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary rounded-pill px-4 fw-semibold",
                          disabled: unref(form_attachment).processing
                        }, [
                          unref(form_attachment).processing ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "spinner-border spinner-border-sm me-1"
                          })) : createCommentVNode("", true),
                          createTextVNode(" Simpan Lampiran ")
                        ], 8, ["disabled"])
                      ])
                    ], 32)
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal fade",
                id: "addPostModal",
                tabindex: "-1",
                "aria-labelledby": "addPostModalLabel",
                "aria-hidden": "true"
              }, [
                createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                  createVNode("div", { class: "modal-content rounded-4 border-0 shadow" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(handleSubmitPost, ["prevent"])
                    }, [
                      createVNode("div", { class: "modal-header" }, [
                        createVNode("h5", {
                          class: "modal-title fw-bold",
                          id: "addPostModalLabel"
                        }, "Buat Postingan Baru di Feed SEEO"),
                        createVNode("button", {
                          type: "button",
                          class: "btn-close",
                          "data-bs-dismiss": "modal",
                          "aria-label": "Close"
                        })
                      ]),
                      createVNode("div", { class: "modal-body p-4" }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "post_text_modal",
                            class: "form-label fw-semibold"
                          }, [
                            createTextVNode("Tulis Pesan "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          withDirectives(createVNode("textarea", {
                            class: "form-control rounded-3",
                            id: "post_text_modal",
                            rows: "4",
                            "onUpdate:modelValue": ($event) => unref(form_post).post_text = $event,
                            required: "",
                            maxlength: "255",
                            placeholder: "Bagikan informasi atau kabar ke seluruh staf..."
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form_post).post_text]
                          ]),
                          createVNode("div", { class: "form-text text-end small" }, toDisplayString(((_d = unref(form_post).post_text) == null ? void 0 : _d.length) || 0) + "/255 karakter", 1),
                          createVNode(_sfc_main$2, {
                            message: __props.errors.post_text || unref(form_post).errors.post_text,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "form-check" }, [
                          withDirectives(createVNode("input", {
                            class: "form-check-input",
                            type: "checkbox",
                            "onUpdate:modelValue": ($event) => unref(form_post).post_username = $event,
                            id: "post_username_modal"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, unref(form_post).post_username]
                          ]),
                          createVNode("label", {
                            class: "form-check-label",
                            for: "post_username_modal"
                          }, "Kirim sebagai Anonymous (Nama Disamarkan)")
                        ])
                      ]),
                      createVNode("div", { class: "modal-footer bg-light border-top p-3" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-secondary rounded-pill px-4",
                          "data-bs-dismiss": "modal"
                        }, "Batal"),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary rounded-pill px-4 fw-semibold",
                          disabled: unref(form_post).processing
                        }, [
                          unref(form_post).processing ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "spinner-border spinner-border-sm me-1"
                          })) : createCommentVNode("", true),
                          createTextVNode(" Terbitkan Post ")
                        ], 8, ["disabled"])
                      ])
                    ], 32)
                  ])
                ])
              ]),
              createVNode(_sfc_main$3, {
                ref_key: "toastNotifRef",
                ref: toastNotifRef
              }, null, 512)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-71453ccd"]]);
export {
  Dashboard as default
};
//# sourceMappingURL=Dashboard-BYcBgXf1.js.map
