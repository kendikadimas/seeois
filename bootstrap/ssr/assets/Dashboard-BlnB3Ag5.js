import { ref, computed, watch, onMounted, nextTick, withCtx, unref, createVNode, createBlock, openBlock, createTextVNode, createCommentVNode, Fragment, renderList, toDisplayString, withModifiers, withDirectives, vModelText, vModelCheckbox, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-4HC-0vm9.js";
import { _ as _sfc_main$2 } from "./InputError-DkffFxkw.js";
import { _ as _sfc_main$3 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$1 } from "./ModalConfirmation-CQDhtLdH.js";
import { usePage, useForm } from "@inertiajs/vue3";
import { route } from "ziggy-js";
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
    errors: Object
    // Error dari session flash
  },
  setup(__props) {
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const title = ref("Dashboard");
    const modalConfirmationRef = ref(null);
    const toastNotifRef = ref(null);
    const modal_post_instance = ref(null);
    const modal_attachment_instance = ref(null);
    const modal_billboard_instance = ref(null);
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
      // Default tidak anonim
    });
    const document_list = computed(() => {
      var _a;
      return ((_a = props.attachment_list) == null ? void 0 : _a.filter((a) => a.type === 0)) || [];
    });
    const link_list = computed(() => {
      var _a;
      return ((_a = props.attachment_list) == null ? void 0 : _a.filter((a) => a.type === 1)) || [];
    });
    function handleFormErrors(responseErrors, formErrors) {
      const errorsToShow = Object.keys(responseErrors).length > 0 ? responseErrors : formErrors;
      console.error("Form submission failed:", errorsToShow);
      if (toastNotifRef.value) {
        for (const key in errorsToShow) {
          const message = Array.isArray(errorsToShow[key]) ? errorsToShow[key][0] : errorsToShow[key];
          toastNotifRef.value.showToast("warning", message);
        }
      }
    }
    function handleSubmitBillboard() {
      var _a;
      if (!form_billboard.billboard_typeText && !form_billboard.billboard_typeImage) {
        (_a = toastNotifRef.value) == null ? void 0 : _a.showToast("warning", "Pilih minimal satu tipe billboard.");
        return;
      }
      form_billboard.post(route("billboard.add"), {
        preserveScroll: true,
        onSuccess: () => {
          var _a2, _b;
          form_billboard.reset();
          (_a2 = modal_billboard_instance.value) == null ? void 0 : _a2.hide();
          (_b = toastNotifRef.value) == null ? void 0 : _b.showToast("info", "Billboard ditambahkan.");
        },
        onError: (errors) => {
          handleFormErrors(usePage().props.errors, form_billboard.errors);
        }
      });
    }
    function handleFileBillboard(event) {
      form_billboard.billboard_image = event.target.files[0] || null;
    }
    function handleSubmitAttachment() {
      form_attachment.post(route("attachment.add"), {
        preserveScroll: true,
        onSuccess: () => {
          var _a, _b;
          form_attachment.reset();
          (_a = modal_attachment_instance.value) == null ? void 0 : _a.hide();
          (_b = toastNotifRef.value) == null ? void 0 : _b.showToast("info", "Attachment ditambahkan.");
        },
        onError: (errors) => {
          handleFormErrors(usePage().props.errors, form_attachment.errors);
        }
      });
    }
    function handleFileAttachment(event) {
      form_attachment.attachment_document = event.target.files[0] || null;
    }
    function handleSubmitPost() {
      form_post.post(route("post.add"), {
        preserveScroll: true,
        onSuccess: () => {
          var _a, _b;
          form_post.reset();
          (_a = modal_post_instance.value) == null ? void 0 : _a.hide();
          (_b = toastNotifRef.value) == null ? void 0 : _b.showToast("info", "Post ditambahkan.");
        },
        onError: (errors) => {
          handleFormErrors(usePage().props.errors, form_post.errors);
        }
      });
    }
    function setPostImage(isAnonymus, profile_image) {
      const defaultImage = "example.png";
      const image = isAnonymus ? defaultImage : profile_image || defaultImage;
      return `/storage/images/profile/${image}`;
    }
    function confirmation(routeUrl, message) {
      var _a, _b;
      if (!routeUrl || routeUrl === "#") {
        console.error("Invalid route URL passed to confirmation:", routeUrl);
        (_a = toastNotifRef.value) == null ? void 0 : _a.showToast("danger", "Aksi tidak valid.");
        return;
      }
      (_b = modalConfirmationRef.value) == null ? void 0 : _b.showModal(routeUrl, message);
    }
    function showModalBillboard() {
      var _a;
      if (modal_billboard_instance.value) modal_billboard_instance.value.show();
      else {
        console.error("Billboard modal instance not ready.");
        (_a = toastNotifRef.value) == null ? void 0 : _a.showToast("danger", "Gagal membuka modal Billboard.");
      }
    }
    function showModalPost() {
      var _a;
      if (modal_post_instance.value) modal_post_instance.value.show();
      else {
        console.error("Post modal instance not ready.");
        (_a = toastNotifRef.value) == null ? void 0 : _a.showToast("danger", "Gagal membuka modal Post.");
      }
    }
    function showModalAttachment() {
      var _a;
      if (modal_attachment_instance.value) modal_attachment_instance.value.show();
      else {
        console.error("Attachment modal instance not ready.");
        (_a = toastNotifRef.value) == null ? void 0 : _a.showToast("danger", "Gagal membuka modal Attachment.");
      }
    }
    watch(() => props.notif, (newValue) => {
      if (newValue && toastNotifRef.value) {
        toastNotifRef.value.showToast(newValue.type, newValue.message);
      }
    }, { deep: true, immediate: true });
    watch(() => props.errors, (newErrors) => {
      if (newErrors && Object.keys(newErrors).length > 0 && toastNotifRef.value) {
        console.warn("Flash errors detected:", newErrors);
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
            console.error("Carousel Init Err:", e);
          }
        }
        const bbModalEl = document.getElementById("setBillboardModal");
        if (bbModalEl) try {
          modal_billboard_instance.value = window.bootstrap.Modal.getOrCreateInstance(bbModalEl);
        } catch (e) {
          console.error("BB Modal Err:", e);
        }
        else console.error("#setBillboardModal not found!");
        const attModalEl = document.getElementById("addAttachmentModal");
        if (attModalEl) try {
          modal_attachment_instance.value = window.bootstrap.Modal.getOrCreateInstance(attModalEl);
        } catch (e) {
          console.error("Att Modal Err:", e);
        }
        else console.error("#addAttachmentModal not found!");
        const postModalEl = document.getElementById("addPostModal");
        if (postModalEl) try {
          modal_post_instance.value = window.bootstrap.Modal.getOrCreateInstance(postModalEl);
        } catch (e) {
          console.error("Post Modal Err:", e);
        }
        else console.error("#addPostModal not found!");
      } else console.error("window.bootstrap is undefined.");
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
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="container-fluid g-0" data-v-3e6ae42f${_scopeId}><div class="row g-0 vh-100 overflow-hidden" data-v-3e6ae42f${_scopeId}><div class="col-12 d-flex flex-column bg-light overflow-hidden" data-v-3e6ae42f${_scopeId}><main class="dashboard-content flex-grow-1 overflow-auto p-2 p-lg-3" data-v-3e6ae42f${_scopeId}><div class="row gx-2 gy-3 gy-lg-3 gx-lg-3" data-v-3e6ae42f${_scopeId}><div class="col-12 col-lg-9 d-flex flex-column" data-v-3e6ae42f${_scopeId}><div class="card shadow-sm mb-2 mb-lg-3 flex-shrink-0 rounded-3 border-0" data-v-3e6ae42f${_scopeId}><div class="card-body p-0 position-relative rounded-3 overflow-hidden" data-v-3e6ae42f${_scopeId}>`);
            if (!__props.billboard_list || __props.billboard_list.length === 0) {
              _push2(`<div class="empty-billboard d-flex align-items-center justify-content-center p-4" style="${ssrRenderStyle({ "min-height": "200px", "max-height": "360px", "background-color": "#e9ecef" })}" data-v-3e6ae42f${_scopeId}>`);
              if (unref(auth_user).roles_id === 1) {
                _push2(`<button class="btn btn-primary btn-lg" data-v-3e6ae42f${_scopeId}><i class="bi bi-plus-circle me-2" data-v-3e6ae42f${_scopeId}></i> <span data-v-3e6ae42f${_scopeId}>Tambah Billboard</span></button>`);
              } else {
                _push2(`<span class="text-muted fs-5" data-v-3e6ae42f${_scopeId}>Selamat Datang!</span>`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div id="billboardCarousel" class="carousel slide" data-bs-ride="carousel" style="${ssrRenderStyle({ "max-height": "360px" })}" data-v-3e6ae42f${_scopeId}>`);
              if (unref(auth_user).roles_id === 1) {
                _push2(`<div class="position-absolute top-0 end-0 p-2" style="${ssrRenderStyle({ "z-index": "20" })}" data-v-3e6ae42f${_scopeId}><button class="btn btn-sm btn-light me-1" title="Tambah Billboard Baru" data-v-3e6ae42f${_scopeId}><i class="bi bi-plus-lg" data-v-3e6ae42f${_scopeId}></i></button></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="carousel-inner rounded-3" data-v-3e6ae42f${_scopeId}><!--[-->`);
              ssrRenderList(__props.billboard_list, (billboard, index) => {
                _push2(`<div class="${ssrRenderClass(["carousel-item", index === 0 ? "active" : ""])}" data-v-3e6ae42f${_scopeId}><div class="billboard-wrapper position-relative" data-v-3e6ae42f${_scopeId}>`);
                if (unref(auth_user).roles_id == 1) {
                  _push2(`<button class="btn btn-danger btn-sm rounded-circle p-0 lh-1 position-absolute m-2" style="${ssrRenderStyle({ "z-index": "11", "width": "28px", "height": "28px", "top": "0.35rem", "right": "3rem" })}" data-v-3e6ae42f${_scopeId}><i class="bi bi-x-lg small" data-v-3e6ae42f${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                if (billboard.image) {
                  _push2(`<img${ssrRenderAttr("src", billboard.full_image_url)} alt="Billboard" data-v-3e6ae42f${_scopeId}>`);
                } else if (!billboard.image && billboard.text) {
                  _push2(`<div class="d-flex flex-column justify-content-center align-items-center text-center p-4 bg-light w-100 h-100" data-v-3e6ae42f${_scopeId}><h3 class="mb-2" data-v-3e6ae42f${_scopeId}>${ssrInterpolate(billboard.title)}</h3> <p class="mb-0" data-v-3e6ae42f${_scopeId}>${ssrInterpolate(billboard.text)}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
              if (__props.billboard_list && __props.billboard_list.length > 1) {
                _push2(`<button class="carousel-control-prev" type="button" data-bs-target="#billboardCarousel" data-bs-slide="prev" data-v-3e6ae42f${_scopeId}><span class="carousel-control-prev-icon" aria-hidden="true" data-v-3e6ae42f${_scopeId}></span> <span class="visually-hidden" data-v-3e6ae42f${_scopeId}>Previous</span></button>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.billboard_list && __props.billboard_list.length > 1) {
                _push2(`<button class="carousel-control-next" type="button" data-bs-target="#billboardCarousel" data-bs-slide="next" data-v-3e6ae42f${_scopeId}><span class="carousel-control-next-icon" aria-hidden="true" data-v-3e6ae42f${_scopeId}></span> <span class="visually-hidden" data-v-3e6ae42f${_scopeId}>Next</span></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div></div><div class="card shadow-sm flex-grow-1 rounded-3 border-0" data-v-3e6ae42f${_scopeId}><div class="card-header d-flex justify-content-between align-items-center py-2 bg-white border-0 border-bottom rounded-top" data-v-3e6ae42f${_scopeId}><h5 class="mb-0 fs-6 fw-medium text-secondary" data-v-3e6ae42f${_scopeId}><i class="bi bi-paperclip me-2" data-v-3e6ae42f${_scopeId}></i> Attachments </h5>`);
            if (unref(auth_user).roles_id === 1) {
              _push2(`<button class="btn btn-outline-success btn-sm rounded-circle p-0 lh-1" style="${ssrRenderStyle({ "width": "28px", "height": "28px" })}" title="Tambah Attachment" data-v-3e6ae42f${_scopeId}><i class="bi bi-plus-lg" data-v-3e6ae42f${_scopeId}></i></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="card-body pt-2" data-v-3e6ae42f${_scopeId}><div class="row g-3" data-v-3e6ae42f${_scopeId}><div class="col-md-6" data-v-3e6ae42f${_scopeId}><h6 class="text-muted small mb-2" data-v-3e6ae42f${_scopeId}><i class="bi bi-file-earmark-text me-1" data-v-3e6ae42f${_scopeId}></i> Documents</h6><div class="attachment-list list-group list-group-flush small scroll-container-sm" data-v-3e6ae42f${_scopeId}>`);
            if (document_list.value.length === 0) {
              _push2(`<div class="list-group-item text-muted text-center py-3 border-0 fst-italic" data-v-3e6ae42f${_scopeId}><small data-v-3e6ae42f${_scopeId}>No documents.</small></div>`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(document_list.value, (document2) => {
                _push2(`<div class="list-group-item d-flex justify-content-between align-items-center px-0 py-1 border-bottom" data-v-3e6ae42f${_scopeId}><a${ssrRenderAttr("href", `/storage/document/attachment/${document2.document}`)} class="text-decoration-none text-dark text-truncate me-2" download${ssrRenderAttr("title", document2.title)} data-v-3e6ae42f${_scopeId}>${ssrInterpolate(document2.title)}</a>`);
                if (unref(auth_user).roles_id === 1) {
                  _push2(`<button class="btn btn-outline-danger border-0 btn-sm py-0 px-1" data-v-3e6ae42f${_scopeId}><i class="bi bi-trash3" data-v-3e6ae42f${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
            }
            _push2(`</div></div><div class="col-md-6" data-v-3e6ae42f${_scopeId}><h6 class="text-muted small mb-2" data-v-3e6ae42f${_scopeId}><i class="bi bi-link-45deg me-1" data-v-3e6ae42f${_scopeId}></i> Links</h6><div class="attachment-list list-group list-group-flush small scroll-container-sm" data-v-3e6ae42f${_scopeId}>`);
            if (link_list.value.length === 0) {
              _push2(`<div class="list-group-item text-muted text-center py-3 border-0 fst-italic" data-v-3e6ae42f${_scopeId}><small data-v-3e6ae42f${_scopeId}>No links.</small></div>`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(link_list.value, (link) => {
                _push2(`<div class="list-group-item d-flex justify-content-between align-items-center px-0 py-1 border-bottom" data-v-3e6ae42f${_scopeId}><a${ssrRenderAttr("href", link.link)} target="_blank" rel="noopener noreferrer" class="text-decoration-none text-primary text-truncate me-2"${ssrRenderAttr("title", link.title)} data-v-3e6ae42f${_scopeId}>${ssrInterpolate(link.title)}</a>`);
                if (unref(auth_user).roles_id === 1) {
                  _push2(`<button class="btn btn-outline-danger border-0 btn-sm py-0 px-1" data-v-3e6ae42f${_scopeId}><i class="bi bi-trash3" data-v-3e6ae42f${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
            }
            _push2(`</div></div></div></div></div></div><div class="col-12 col-lg-3 d-flex" data-v-3e6ae42f${_scopeId}><div class="card shadow-sm h-100 w-100 d-flex flex-column" data-v-3e6ae42f${_scopeId}><div class="card-header d-flex justify-content-between align-items-center py-2 bg-primary text-white" data-v-3e6ae42f${_scopeId}><h4 class="mb-0 fs-6 fw-medium" data-v-3e6ae42f${_scopeId}><i class="bi bi-send me-2" data-v-3e6ae42f${_scopeId}></i> SEEO POST </h4><button class="btn btn-light btn-sm rounded-circle p-0 lh-1" style="${ssrRenderStyle({ "width": "28px", "height": "28px" })}" title="Buat Postingan" data-v-3e6ae42f${_scopeId}><i class="bi bi-plus-lg text-primary" data-v-3e6ae42f${_scopeId}></i></button></div><div class="card-body d-flex flex-column overflow-hidden p-2" style="${ssrRenderStyle({ "max-height": "calc(100vh - 180px)" })}" data-v-3e6ae42f${_scopeId}>`);
            if (!__props.post_list || __props.post_list.length === 0) {
              _push2(`<div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center text-muted p-4" data-v-3e6ae42f${_scopeId}><i class="bi bi-chat-square-dots display-5 mb-3 opacity-50" data-v-3e6ae42f${_scopeId}></i><h6 class="mb-1 text-secondary" data-v-3e6ae42f${_scopeId}>Belum Ada Postingan</h6><p class="small mb-0 text-secondary" data-v-3e6ae42f${_scopeId}>Jadilah yang pertama berbagi!</p></div>`);
            } else {
              _push2(`<div class="posts-list flex-grow-1 overflow-auto pe-1" data-v-3e6ae42f${_scopeId}><!--[-->`);
              ssrRenderList(__props.post_list, (post) => {
                var _a2, _b2;
                _push2(`<div class="post-card bg-light border rounded p-2 mb-2" data-v-3e6ae42f${_scopeId}><div class="d-flex justify-content-between align-items-start mb-1" data-v-3e6ae42f${_scopeId}><div class="d-flex align-items-center text-truncate me-2" data-v-3e6ae42f${_scopeId}><img${ssrRenderAttr("src", setPostImage(post.anonymus, (_a2 = post.user) == null ? void 0 : _a2.profile_image))} alt="Avatar" class="rounded-circle me-2" style="${ssrRenderStyle({ "width": "24px", "height": "24px", "object-fit": "cover" })}" data-v-3e6ae42f${_scopeId}><div class="lh-sm" data-v-3e6ae42f${_scopeId}><h6 class="mb-0 small fw-bold text-truncate" style="${ssrRenderStyle({ "max-width": "150px" })}" data-v-3e6ae42f${_scopeId}>${ssrInterpolate(post.anonymus ? "Anonymous" : (_b2 = post.user) == null ? void 0 : _b2.name)}</h6><small class="text-muted" style="${ssrRenderStyle({ "font-size": "0.7rem" })}" data-v-3e6ae42f${_scopeId}>${ssrInterpolate(new Date(post.created_at).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" }))}</small></div></div>`);
                if (unref(auth_user).roles_id === 1 || !post.anonymus && unref(auth_user).id == post.user_id) {
                  _push2(`<button class="btn btn-outline-danger border-0 btn-sm py-0 px-1 flex-shrink-0" data-v-3e6ae42f${_scopeId}><i class="bi bi-trash3 small" data-v-3e6ae42f${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><p class="mb-0 small post-text" style="${ssrRenderStyle({ "max-height": "110px", "overflow": "hidden" })}" data-v-3e6ae42f${_scopeId}>${ssrInterpolate(post.text)}</p></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div></div></div></main><button class="btn btn-primary rounded-circle shadow fab d-lg-none" title="Buat Postingan" style="${ssrRenderStyle({ "width": "56px", "height": "56px" })}" data-v-3e6ae42f${_scopeId}><i class="bi bi-send-plus fs-4" data-v-3e6ae42f${_scopeId}></i></button></div></div></div><div class="modal fade" id="setBillboardModal" tabindex="-1" aria-labelledby="setBillboardModalLabel" aria-hidden="true" data-v-3e6ae42f${_scopeId}><div class="modal-dialog modal-lg modal-dialog-centered" data-v-3e6ae42f${_scopeId}><div class="modal-content" data-v-3e6ae42f${_scopeId}><form data-v-3e6ae42f${_scopeId}><div class="modal-header" data-v-3e6ae42f${_scopeId}><h1 class="modal-title fs-5" id="setBillboardModalLabel" data-v-3e6ae42f${_scopeId}>Tambah Billboard Baru</h1> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-3e6ae42f${_scopeId}></button></div><div class="modal-body" data-v-3e6ae42f${_scopeId}><div class="mb-3" data-v-3e6ae42f${_scopeId}><label for="billboard_title_modal" class="form-label" data-v-3e6ae42f${_scopeId}>Judul <span class="text-danger" data-v-3e6ae42f${_scopeId}>*</span></label> <input type="text" class="form-control" id="billboard_title_modal"${ssrRenderAttr("value", unref(form_billboard).billboard_title)} required data-v-3e6ae42f${_scopeId}> `);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: __props.errors.billboard_title || unref(form_billboard).errors.billboard_title,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3" data-v-3e6ae42f${_scopeId}><label class="form-label" data-v-3e6ae42f${_scopeId}>Tipe <span class="text-danger" data-v-3e6ae42f${_scopeId}>*</span></label> <div class="d-flex gap-3" data-v-3e6ae42f${_scopeId}><div class="form-check" data-v-3e6ae42f${_scopeId}><input class="form-check-input" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form_billboard).billboard_typeText) ? ssrLooseContain(unref(form_billboard).billboard_typeText, null) : unref(form_billboard).billboard_typeText) ? " checked" : ""} id="billboard_typeText_modal" data-v-3e6ae42f${_scopeId}> <label class="form-check-label" for="billboard_typeText_modal" data-v-3e6ae42f${_scopeId}> Teks </label></div> <div class="form-check" data-v-3e6ae42f${_scopeId}><input class="form-check-input" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form_billboard).billboard_typeImage) ? ssrLooseContain(unref(form_billboard).billboard_typeImage, null) : unref(form_billboard).billboard_typeImage) ? " checked" : ""} id="billboard_typeImage_modal" data-v-3e6ae42f${_scopeId}> <label class="form-check-label" for="billboard_typeImage_modal" data-v-3e6ae42f${_scopeId}> Gambar </label></div></div></div>`);
            if (unref(form_billboard).billboard_typeText) {
              _push2(`<div class="mb-3" data-v-3e6ae42f${_scopeId}><label for="billboard_text_modal" class="form-label" data-v-3e6ae42f${_scopeId}>Teks <span class="text-danger" data-v-3e6ae42f${_scopeId}>*</span></label> <textarea class="form-control" id="billboard_text_modal" rows="3"${ssrIncludeBooleanAttr(unref(form_billboard).billboard_typeText) ? " required" : ""} data-v-3e6ae42f${_scopeId}>${ssrInterpolate(unref(form_billboard).billboard_text)}</textarea> `);
              _push2(ssrRenderComponent(_sfc_main$2, {
                message: __props.errors.billboard_text || unref(form_billboard).errors.billboard_text,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form_billboard).billboard_typeImage) {
              _push2(`<div class="mb-3" data-v-3e6ae42f${_scopeId}><label for="billboard_image_modal" class="form-label" data-v-3e6ae42f${_scopeId}>Gambar <span class="text-danger" data-v-3e6ae42f${_scopeId}>*</span></label> <input class="form-control" type="file" id="billboard_image_modal" accept="image/jpeg,image/png,image/heic"${ssrIncludeBooleanAttr(unref(form_billboard).billboard_typeImage) ? " required" : ""} data-v-3e6ae42f${_scopeId}> <div class="form-text" data-v-3e6ae42f${_scopeId}>JPG, PNG, HEIC. Maks: 5MB.</div> `);
              _push2(ssrRenderComponent(_sfc_main$2, {
                message: __props.errors.billboard_image || unref(form_billboard).errors.billboard_image,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="modal-footer" data-v-3e6ae42f${_scopeId}><button type="button" class="btn btn-secondary" data-bs-dismiss="modal" data-v-3e6ae42f${_scopeId}>Batal</button> <button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form_billboard).processing) ? " disabled" : ""} data-v-3e6ae42f${_scopeId}>`);
            if (unref(form_billboard).processing) {
              _push2(`<span class="spinner-border spinner-border-sm me-1" aria-hidden="true" data-v-3e6ae42f${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` Simpan </button></div></form></div></div></div><div class="modal fade" id="addAttachmentModal" tabindex="-1" aria-labelledby="addAttachmentModalLabel" aria-hidden="true" data-v-3e6ae42f${_scopeId}><div class="modal-dialog modal-dialog-centered" data-v-3e6ae42f${_scopeId}><div class="modal-content" data-v-3e6ae42f${_scopeId}><form data-v-3e6ae42f${_scopeId}><div class="modal-header" data-v-3e6ae42f${_scopeId}><h1 class="modal-title fs-5" id="addAttachmentModalLabel" data-v-3e6ae42f${_scopeId}>Tambah Attachment</h1> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-3e6ae42f${_scopeId}></button></div><div class="modal-body" data-v-3e6ae42f${_scopeId}><div class="mb-3" data-v-3e6ae42f${_scopeId}><label for="attachment_title_modal" class="form-label" data-v-3e6ae42f${_scopeId}>Judul <span class="text-danger" data-v-3e6ae42f${_scopeId}>*</span></label> <input type="text" class="form-control" id="attachment_title_modal"${ssrRenderAttr("value", unref(form_attachment).attachment_title)} required data-v-3e6ae42f${_scopeId}> `);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: __props.errors.attachment_title || unref(form_attachment).errors.attachment_title,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-3" data-v-3e6ae42f${_scopeId}><label for="attachment_type_modal" class="form-label" data-v-3e6ae42f${_scopeId}>Tipe <span class="text-danger" data-v-3e6ae42f${_scopeId}>*</span></label> <select class="form-select" id="attachment_type_modal" required data-v-3e6ae42f${_scopeId}><option value="document" data-v-3e6ae42f${ssrIncludeBooleanAttr(Array.isArray(unref(form_attachment).attachment_type) ? ssrLooseContain(unref(form_attachment).attachment_type, "document") : ssrLooseEqual(unref(form_attachment).attachment_type, "document")) ? " selected" : ""}${_scopeId}>Dokumen (File)</option> <option value="link" data-v-3e6ae42f${ssrIncludeBooleanAttr(Array.isArray(unref(form_attachment).attachment_type) ? ssrLooseContain(unref(form_attachment).attachment_type, "link") : ssrLooseEqual(unref(form_attachment).attachment_type, "link")) ? " selected" : ""}${_scopeId}>Link Eksternal</option></select> `);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: __props.errors.attachment_type || unref(form_attachment).errors.attachment_type,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(form_attachment).attachment_type === "document") {
              _push2(`<div class="mb-3" data-v-3e6ae42f${_scopeId}><label for="attachment_document_modal" class="form-label" data-v-3e6ae42f${_scopeId}>Dokumen <span class="text-danger" data-v-3e6ae42f${_scopeId}>*</span></label> <input class="form-control" type="file" id="attachment_document_modal" accept=".pdf,.doc,.docx,.png,.jpeg,.jpg,.heic"${ssrIncludeBooleanAttr(unref(form_attachment).attachment_type === "document") ? " required" : ""} data-v-3e6ae42f${_scopeId}> <div class="form-text" data-v-3e6ae42f${_scopeId}>PDF, DOCX, PNG, JPG, HEIC. Maks: 5MB.</div> `);
              _push2(ssrRenderComponent(_sfc_main$2, {
                message: __props.errors.attachment_document || unref(form_attachment).errors.attachment_document,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form_attachment).attachment_type === "link") {
              _push2(`<div class="mb-3" data-v-3e6ae42f${_scopeId}><label for="attachment_link_modal" class="form-label" data-v-3e6ae42f${_scopeId}>URL Link <span class="text-danger" data-v-3e6ae42f${_scopeId}>*</span></label> <input type="url" class="form-control" id="attachment_link_modal"${ssrRenderAttr("value", unref(form_attachment).attachment_link)} placeholder="https://contoh.com"${ssrIncludeBooleanAttr(unref(form_attachment).attachment_type === "link") ? " required" : ""} data-v-3e6ae42f${_scopeId}> `);
              _push2(ssrRenderComponent(_sfc_main$2, {
                message: __props.errors.attachment_link || unref(form_attachment).errors.attachment_link,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="modal-footer" data-v-3e6ae42f${_scopeId}><button type="button" class="btn btn-secondary" data-bs-dismiss="modal" data-v-3e6ae42f${_scopeId}>Batal</button> <button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form_attachment).processing) ? " disabled" : ""} data-v-3e6ae42f${_scopeId}>`);
            if (unref(form_attachment).processing) {
              _push2(`<span class="spinner-border spinner-border-sm me-1" aria-hidden="true" data-v-3e6ae42f${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` Simpan </button></div></form></div></div></div><div class="modal fade" id="addPostModal" tabindex="-1" aria-labelledby="addPostModalLabel" aria-hidden="true" data-v-3e6ae42f${_scopeId}><div class="modal-dialog modal-dialog-centered" data-v-3e6ae42f${_scopeId}><div class="modal-content" data-v-3e6ae42f${_scopeId}><form data-v-3e6ae42f${_scopeId}><div class="modal-header" data-v-3e6ae42f${_scopeId}><h1 class="modal-title fs-5" id="addPostModalLabel" data-v-3e6ae42f${_scopeId}>Buat Postingan Baru</h1> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-3e6ae42f${_scopeId}></button></div><div class="modal-body" data-v-3e6ae42f${_scopeId}><div class="mb-3" data-v-3e6ae42f${_scopeId}><label for="post_text_modal" class="form-label" data-v-3e6ae42f${_scopeId}>Isi Postingan <span class="text-danger" data-v-3e6ae42f${_scopeId}>*</span></label> <textarea class="form-control" id="post_text_modal" rows="4" required maxlength="255" data-v-3e6ae42f${_scopeId}>${ssrInterpolate(unref(form_post).post_text)}</textarea> <div class="form-text text-end small" data-v-3e6ae42f${_scopeId}>${ssrInterpolate(((_a = unref(form_post).post_text) == null ? void 0 : _a.length) || 0)}/255 karakter</div> `);
            _push2(ssrRenderComponent(_sfc_main$2, {
              message: __props.errors.post_text || unref(form_post).errors.post_text,
              class: "mt-1"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form-check" data-v-3e6ae42f${_scopeId}><input class="form-check-input" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form_post).post_username) ? ssrLooseContain(unref(form_post).post_username, null) : unref(form_post).post_username) ? " checked" : ""} id="post_username_modal" data-v-3e6ae42f${_scopeId}> <label class="form-check-label" for="post_username_modal" data-v-3e6ae42f${_scopeId}> Posting sebagai Anonymous </label></div></div><div class="modal-footer" data-v-3e6ae42f${_scopeId}><button type="button" class="btn btn-secondary" data-bs-dismiss="modal" data-v-3e6ae42f${_scopeId}>Batal</button> <button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form_post).processing) ? " disabled" : ""} data-v-3e6ae42f${_scopeId}>`);
            if (unref(form_post).processing) {
              _push2(`<span class="spinner-border spinner-border-sm me-1" aria-hidden="true" data-v-3e6ae42f${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` Kirim </button></div></form></div></div></div>`);
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
              createVNode("div", { class: "container-fluid g-0" }, [
                createVNode("div", { class: "row g-0 vh-100 overflow-hidden" }, [
                  createVNode("div", { class: "col-12 d-flex flex-column bg-light overflow-hidden" }, [
                    createVNode("main", { class: "dashboard-content flex-grow-1 overflow-auto p-2 p-lg-3" }, [
                      createVNode("div", { class: "row gx-2 gy-3 gy-lg-3 gx-lg-3" }, [
                        createVNode("div", { class: "col-12 col-lg-9 d-flex flex-column" }, [
                          createVNode("div", { class: "card shadow-sm mb-2 mb-lg-3 flex-shrink-0 rounded-3 border-0" }, [
                            createVNode("div", { class: "card-body p-0 position-relative rounded-3 overflow-hidden" }, [
                              !__props.billboard_list || __props.billboard_list.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "empty-billboard d-flex align-items-center justify-content-center p-4",
                                style: { "min-height": "200px", "max-height": "360px", "background-color": "#e9ecef" }
                              }, [
                                unref(auth_user).roles_id === 1 ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  class: "btn btn-primary btn-lg",
                                  onClick: showModalBillboard
                                }, [
                                  createVNode("i", { class: "bi bi-plus-circle me-2" }),
                                  createTextVNode(),
                                  createVNode("span", null, "Tambah Billboard")
                                ])) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "text-muted fs-5"
                                }, "Selamat Datang!"))
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                id: "billboardCarousel",
                                class: "carousel slide",
                                "data-bs-ride": "carousel",
                                style: { "max-height": "360px" }
                              }, [
                                unref(auth_user).roles_id === 1 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "position-absolute top-0 end-0 p-2",
                                  style: { "z-index": "20" }
                                }, [
                                  createVNode("button", {
                                    class: "btn btn-sm btn-light me-1",
                                    onClick: showModalBillboard,
                                    title: "Tambah Billboard Baru"
                                  }, [
                                    createVNode("i", { class: "bi bi-plus-lg" })
                                  ])
                                ])) : createCommentVNode("", true),
                                createVNode("div", { class: "carousel-inner rounded-3" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.billboard_list, (billboard, index) => {
                                    return openBlock(), createBlock("div", {
                                      key: billboard.id,
                                      class: ["carousel-item", index === 0 ? "active" : ""]
                                    }, [
                                      createVNode("div", { class: "billboard-wrapper position-relative" }, [
                                        unref(auth_user).roles_id == 1 ? (openBlock(), createBlock("button", {
                                          key: 0,
                                          class: "btn btn-danger btn-sm rounded-circle p-0 lh-1 position-absolute m-2",
                                          style: { "z-index": "11", "width": "28px", "height": "28px", "top": "0.35rem", "right": "3rem" },
                                          onClick: ($event) => confirmation(unref(route)("billboard.remove", { id: billboard.id }), "Hapus billboard '" + billboard.title + "'?")
                                        }, [
                                          createVNode("i", { class: "bi bi-x-lg small" })
                                        ], 8, ["onClick"])) : createCommentVNode("", true),
                                        billboard.image ? (openBlock(), createBlock("img", {
                                          key: 1,
                                          src: billboard.full_image_url,
                                          alt: "Billboard"
                                        }, null, 8, ["src"])) : !billboard.image && billboard.text ? (openBlock(), createBlock("div", {
                                          key: 2,
                                          class: "d-flex flex-column justify-content-center align-items-center text-center p-4 bg-light w-100 h-100"
                                        }, [
                                          createVNode("h3", { class: "mb-2" }, toDisplayString(billboard.title), 1),
                                          createTextVNode(),
                                          createVNode("p", { class: "mb-0" }, toDisplayString(billboard.text), 1)
                                        ])) : createCommentVNode("", true)
                                      ])
                                    ], 2);
                                  }), 128))
                                ]),
                                __props.billboard_list && __props.billboard_list.length > 1 ? (openBlock(), createBlock("button", {
                                  key: 1,
                                  class: "carousel-control-prev",
                                  type: "button",
                                  "data-bs-target": "#billboardCarousel",
                                  "data-bs-slide": "prev"
                                }, [
                                  createVNode("span", {
                                    class: "carousel-control-prev-icon",
                                    "aria-hidden": "true"
                                  }),
                                  createTextVNode(),
                                  createVNode("span", { class: "visually-hidden" }, "Previous")
                                ])) : createCommentVNode("", true),
                                __props.billboard_list && __props.billboard_list.length > 1 ? (openBlock(), createBlock("button", {
                                  key: 2,
                                  class: "carousel-control-next",
                                  type: "button",
                                  "data-bs-target": "#billboardCarousel",
                                  "data-bs-slide": "next"
                                }, [
                                  createVNode("span", {
                                    class: "carousel-control-next-icon",
                                    "aria-hidden": "true"
                                  }),
                                  createTextVNode(),
                                  createVNode("span", { class: "visually-hidden" }, "Next")
                                ])) : createCommentVNode("", true)
                              ]))
                            ])
                          ]),
                          createVNode("div", { class: "card shadow-sm flex-grow-1 rounded-3 border-0" }, [
                            createVNode("div", { class: "card-header d-flex justify-content-between align-items-center py-2 bg-white border-0 border-bottom rounded-top" }, [
                              createVNode("h5", { class: "mb-0 fs-6 fw-medium text-secondary" }, [
                                createVNode("i", { class: "bi bi-paperclip me-2" }),
                                createTextVNode(" Attachments ")
                              ]),
                              unref(auth_user).roles_id === 1 ? (openBlock(), createBlock("button", {
                                key: 0,
                                class: "btn btn-outline-success btn-sm rounded-circle p-0 lh-1",
                                style: { "width": "28px", "height": "28px" },
                                onClick: showModalAttachment,
                                title: "Tambah Attachment"
                              }, [
                                createVNode("i", { class: "bi bi-plus-lg" })
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "card-body pt-2" }, [
                              createVNode("div", { class: "row g-3" }, [
                                createVNode("div", { class: "col-md-6" }, [
                                  createVNode("h6", { class: "text-muted small mb-2" }, [
                                    createVNode("i", { class: "bi bi-file-earmark-text me-1" }),
                                    createTextVNode(" Documents")
                                  ]),
                                  createVNode("div", { class: "attachment-list list-group list-group-flush small scroll-container-sm" }, [
                                    document_list.value.length === 0 ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "list-group-item text-muted text-center py-3 border-0 fst-italic"
                                    }, [
                                      createVNode("small", null, "No documents.")
                                    ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(document_list.value, (document2) => {
                                      return openBlock(), createBlock("div", {
                                        key: document2.id,
                                        class: "list-group-item d-flex justify-content-between align-items-center px-0 py-1 border-bottom"
                                      }, [
                                        createVNode("a", {
                                          href: `/storage/document/attachment/${document2.document}`,
                                          class: "text-decoration-none text-dark text-truncate me-2",
                                          download: "",
                                          title: document2.title
                                        }, toDisplayString(document2.title), 9, ["href", "title"]),
                                        unref(auth_user).roles_id === 1 ? (openBlock(), createBlock("button", {
                                          key: 0,
                                          class: "btn btn-outline-danger border-0 btn-sm py-0 px-1",
                                          onClick: ($event) => confirmation(unref(route)("attachment.remove", { id: document2.id }), "Hapus '" + document2.title + "'?")
                                        }, [
                                          createVNode("i", { class: "bi bi-trash3" })
                                        ], 8, ["onClick"])) : createCommentVNode("", true)
                                      ]);
                                    }), 128))
                                  ])
                                ]),
                                createVNode("div", { class: "col-md-6" }, [
                                  createVNode("h6", { class: "text-muted small mb-2" }, [
                                    createVNode("i", { class: "bi bi-link-45deg me-1" }),
                                    createTextVNode(" Links")
                                  ]),
                                  createVNode("div", { class: "attachment-list list-group list-group-flush small scroll-container-sm" }, [
                                    link_list.value.length === 0 ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "list-group-item text-muted text-center py-3 border-0 fst-italic"
                                    }, [
                                      createVNode("small", null, "No links.")
                                    ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(link_list.value, (link) => {
                                      return openBlock(), createBlock("div", {
                                        key: link.id,
                                        class: "list-group-item d-flex justify-content-between align-items-center px-0 py-1 border-bottom"
                                      }, [
                                        createVNode("a", {
                                          href: link.link,
                                          target: "_blank",
                                          rel: "noopener noreferrer",
                                          class: "text-decoration-none text-primary text-truncate me-2",
                                          title: link.title
                                        }, toDisplayString(link.title), 9, ["href", "title"]),
                                        unref(auth_user).roles_id === 1 ? (openBlock(), createBlock("button", {
                                          key: 0,
                                          class: "btn btn-outline-danger border-0 btn-sm py-0 px-1",
                                          onClick: ($event) => confirmation(unref(route)("attachment.remove", { id: link.id }), "Hapus '" + link.title + "'?")
                                        }, [
                                          createVNode("i", { class: "bi bi-trash3" })
                                        ], 8, ["onClick"])) : createCommentVNode("", true)
                                      ]);
                                    }), 128))
                                  ])
                                ])
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "col-12 col-lg-3 d-flex" }, [
                          createVNode("div", { class: "card shadow-sm h-100 w-100 d-flex flex-column" }, [
                            createVNode("div", { class: "card-header d-flex justify-content-between align-items-center py-2 bg-primary text-white" }, [
                              createVNode("h4", { class: "mb-0 fs-6 fw-medium" }, [
                                createVNode("i", { class: "bi bi-send me-2" }),
                                createTextVNode(" SEEO POST ")
                              ]),
                              createVNode("button", {
                                class: "btn btn-light btn-sm rounded-circle p-0 lh-1",
                                style: { "width": "28px", "height": "28px" },
                                onClick: showModalPost,
                                title: "Buat Postingan"
                              }, [
                                createVNode("i", { class: "bi bi-plus-lg text-primary" })
                              ])
                            ]),
                            createVNode("div", {
                              class: "card-body d-flex flex-column overflow-hidden p-2",
                              style: { "max-height": "calc(100vh - 180px)" }
                            }, [
                              !__props.post_list || __props.post_list.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center text-muted p-4"
                              }, [
                                createVNode("i", { class: "bi bi-chat-square-dots display-5 mb-3 opacity-50" }),
                                createVNode("h6", { class: "mb-1 text-secondary" }, "Belum Ada Postingan"),
                                createVNode("p", { class: "small mb-0 text-secondary" }, "Jadilah yang pertama berbagi!")
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "posts-list flex-grow-1 overflow-auto pe-1"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.post_list, (post) => {
                                  var _a2, _b2;
                                  return openBlock(), createBlock("div", {
                                    key: post.id,
                                    class: "post-card bg-light border rounded p-2 mb-2"
                                  }, [
                                    createVNode("div", { class: "d-flex justify-content-between align-items-start mb-1" }, [
                                      createVNode("div", { class: "d-flex align-items-center text-truncate me-2" }, [
                                        createVNode("img", {
                                          src: setPostImage(post.anonymus, (_a2 = post.user) == null ? void 0 : _a2.profile_image),
                                          alt: "Avatar",
                                          class: "rounded-circle me-2",
                                          style: { "width": "24px", "height": "24px", "object-fit": "cover" }
                                        }, null, 8, ["src"]),
                                        createVNode("div", { class: "lh-sm" }, [
                                          createVNode("h6", {
                                            class: "mb-0 small fw-bold text-truncate",
                                            style: { "max-width": "150px" }
                                          }, toDisplayString(post.anonymus ? "Anonymous" : (_b2 = post.user) == null ? void 0 : _b2.name), 1),
                                          createVNode("small", {
                                            class: "text-muted",
                                            style: { "font-size": "0.7rem" }
                                          }, toDisplayString(new Date(post.created_at).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" })), 1)
                                        ])
                                      ]),
                                      unref(auth_user).roles_id === 1 || !post.anonymus && unref(auth_user).id == post.user_id ? (openBlock(), createBlock("button", {
                                        key: 0,
                                        class: "btn btn-outline-danger border-0 btn-sm py-0 px-1 flex-shrink-0",
                                        onClick: ($event) => confirmation(unref(route)("post.remove", { id: post.id }), "Hapus post ini?")
                                      }, [
                                        createVNode("i", { class: "bi bi-trash3 small" })
                                      ], 8, ["onClick"])) : createCommentVNode("", true)
                                    ]),
                                    createVNode("p", {
                                      class: "mb-0 small post-text",
                                      style: { "max-height": "110px", "overflow": "hidden" }
                                    }, toDisplayString(post.text), 1)
                                  ]);
                                }), 128))
                              ]))
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("button", {
                      class: "btn btn-primary rounded-circle shadow fab d-lg-none",
                      onClick: showModalPost,
                      title: "Buat Postingan",
                      style: { "width": "56px", "height": "56px" }
                    }, [
                      createVNode("i", { class: "bi bi-send-plus fs-4" })
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
                  createVNode("div", { class: "modal-content" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(handleSubmitBillboard, ["prevent"])
                    }, [
                      createVNode("div", { class: "modal-header" }, [
                        createVNode("h1", {
                          class: "modal-title fs-5",
                          id: "setBillboardModalLabel"
                        }, "Tambah Billboard Baru"),
                        createTextVNode(),
                        createVNode("button", {
                          type: "button",
                          class: "btn-close",
                          "data-bs-dismiss": "modal",
                          "aria-label": "Close"
                        })
                      ]),
                      createVNode("div", { class: "modal-body" }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "billboard_title_modal",
                            class: "form-label"
                          }, [
                            createTextVNode("Judul "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          createTextVNode(),
                          withDirectives(createVNode("input", {
                            type: "text",
                            class: "form-control",
                            id: "billboard_title_modal",
                            "onUpdate:modelValue": ($event) => unref(form_billboard).billboard_title = $event,
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form_billboard).billboard_title]
                          ]),
                          createTextVNode(),
                          createVNode(_sfc_main$2, {
                            message: __props.errors.billboard_title || unref(form_billboard).errors.billboard_title,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label" }, [
                            createTextVNode("Tipe "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          createTextVNode(),
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
                              createTextVNode(),
                              createVNode("label", {
                                class: "form-check-label",
                                for: "billboard_typeText_modal"
                              }, " Teks ")
                            ]),
                            createTextVNode(),
                            createVNode("div", { class: "form-check" }, [
                              withDirectives(createVNode("input", {
                                class: "form-check-input",
                                type: "checkbox",
                                "onUpdate:modelValue": ($event) => unref(form_billboard).billboard_typeImage = $event,
                                id: "billboard_typeImage_modal"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelCheckbox, unref(form_billboard).billboard_typeImage]
                              ]),
                              createTextVNode(),
                              createVNode("label", {
                                class: "form-check-label",
                                for: "billboard_typeImage_modal"
                              }, " Gambar ")
                            ])
                          ])
                        ]),
                        unref(form_billboard).billboard_typeText ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mb-3"
                        }, [
                          createVNode("label", {
                            for: "billboard_text_modal",
                            class: "form-label"
                          }, [
                            createTextVNode("Teks "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          createTextVNode(),
                          withDirectives(createVNode("textarea", {
                            class: "form-control",
                            id: "billboard_text_modal",
                            rows: "3",
                            "onUpdate:modelValue": ($event) => unref(form_billboard).billboard_text = $event,
                            required: unref(form_billboard).billboard_typeText
                          }, null, 8, ["onUpdate:modelValue", "required"]), [
                            [vModelText, unref(form_billboard).billboard_text]
                          ]),
                          createTextVNode(),
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
                            class: "form-label"
                          }, [
                            createTextVNode("Gambar "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          createTextVNode(),
                          createVNode("input", {
                            class: "form-control",
                            type: "file",
                            id: "billboard_image_modal",
                            onInput: handleFileBillboard,
                            accept: "image/jpeg,image/png,image/heic",
                            required: unref(form_billboard).billboard_typeImage
                          }, null, 40, ["required"]),
                          createTextVNode(),
                          createVNode("div", { class: "form-text" }, "JPG, PNG, HEIC. Maks: 5MB."),
                          createTextVNode(),
                          createVNode(_sfc_main$2, {
                            message: __props.errors.billboard_image || unref(form_billboard).errors.billboard_image,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "modal-footer" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-secondary",
                          "data-bs-dismiss": "modal"
                        }, "Batal"),
                        createTextVNode(),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary",
                          disabled: unref(form_billboard).processing
                        }, [
                          unref(form_billboard).processing ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "spinner-border spinner-border-sm me-1",
                            "aria-hidden": "true"
                          })) : createCommentVNode("", true),
                          createTextVNode(" Simpan ")
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
                  createVNode("div", { class: "modal-content" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(handleSubmitAttachment, ["prevent"])
                    }, [
                      createVNode("div", { class: "modal-header" }, [
                        createVNode("h1", {
                          class: "modal-title fs-5",
                          id: "addAttachmentModalLabel"
                        }, "Tambah Attachment"),
                        createTextVNode(),
                        createVNode("button", {
                          type: "button",
                          class: "btn-close",
                          "data-bs-dismiss": "modal",
                          "aria-label": "Close"
                        })
                      ]),
                      createVNode("div", { class: "modal-body" }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "attachment_title_modal",
                            class: "form-label"
                          }, [
                            createTextVNode("Judul "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          createTextVNode(),
                          withDirectives(createVNode("input", {
                            type: "text",
                            class: "form-control",
                            id: "attachment_title_modal",
                            "onUpdate:modelValue": ($event) => unref(form_attachment).attachment_title = $event,
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form_attachment).attachment_title]
                          ]),
                          createTextVNode(),
                          createVNode(_sfc_main$2, {
                            message: __props.errors.attachment_title || unref(form_attachment).errors.attachment_title,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "attachment_type_modal",
                            class: "form-label"
                          }, [
                            createTextVNode("Tipe "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          createTextVNode(),
                          withDirectives(createVNode("select", {
                            class: "form-select",
                            id: "attachment_type_modal",
                            "onUpdate:modelValue": ($event) => unref(form_attachment).attachment_type = $event,
                            required: ""
                          }, [
                            createVNode("option", { value: "document" }, "Dokumen (File)"),
                            createTextVNode(),
                            createVNode("option", { value: "link" }, "Link Eksternal")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form_attachment).attachment_type]
                          ]),
                          createTextVNode(),
                          createVNode(_sfc_main$2, {
                            message: __props.errors.attachment_type || unref(form_attachment).errors.attachment_type,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ]),
                        unref(form_attachment).attachment_type === "document" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mb-3"
                        }, [
                          createVNode("label", {
                            for: "attachment_document_modal",
                            class: "form-label"
                          }, [
                            createTextVNode("Dokumen "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          createTextVNode(),
                          createVNode("input", {
                            class: "form-control",
                            type: "file",
                            id: "attachment_document_modal",
                            onInput: handleFileAttachment,
                            accept: ".pdf,.doc,.docx,.png,.jpeg,.jpg,.heic",
                            required: unref(form_attachment).attachment_type === "document"
                          }, null, 40, ["required"]),
                          createTextVNode(),
                          createVNode("div", { class: "form-text" }, "PDF, DOCX, PNG, JPG, HEIC. Maks: 5MB."),
                          createTextVNode(),
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
                            class: "form-label"
                          }, [
                            createTextVNode("URL Link "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          createTextVNode(),
                          withDirectives(createVNode("input", {
                            type: "url",
                            class: "form-control",
                            id: "attachment_link_modal",
                            "onUpdate:modelValue": ($event) => unref(form_attachment).attachment_link = $event,
                            placeholder: "https://contoh.com",
                            required: unref(form_attachment).attachment_type === "link"
                          }, null, 8, ["onUpdate:modelValue", "required"]), [
                            [vModelText, unref(form_attachment).attachment_link]
                          ]),
                          createTextVNode(),
                          createVNode(_sfc_main$2, {
                            message: __props.errors.attachment_link || unref(form_attachment).errors.attachment_link,
                            class: "mt-1"
                          }, null, 8, ["message"])
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "modal-footer" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-secondary",
                          "data-bs-dismiss": "modal"
                        }, "Batal"),
                        createTextVNode(),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary",
                          disabled: unref(form_attachment).processing
                        }, [
                          unref(form_attachment).processing ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "spinner-border spinner-border-sm me-1",
                            "aria-hidden": "true"
                          })) : createCommentVNode("", true),
                          createTextVNode(" Simpan ")
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
                  createVNode("div", { class: "modal-content" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(handleSubmitPost, ["prevent"])
                    }, [
                      createVNode("div", { class: "modal-header" }, [
                        createVNode("h1", {
                          class: "modal-title fs-5",
                          id: "addPostModalLabel"
                        }, "Buat Postingan Baru"),
                        createTextVNode(),
                        createVNode("button", {
                          type: "button",
                          class: "btn-close",
                          "data-bs-dismiss": "modal",
                          "aria-label": "Close"
                        })
                      ]),
                      createVNode("div", { class: "modal-body" }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", {
                            for: "post_text_modal",
                            class: "form-label"
                          }, [
                            createTextVNode("Isi Postingan "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          createTextVNode(),
                          withDirectives(createVNode("textarea", {
                            class: "form-control",
                            id: "post_text_modal",
                            rows: "4",
                            "onUpdate:modelValue": ($event) => unref(form_post).post_text = $event,
                            required: "",
                            maxlength: "255"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form_post).post_text]
                          ]),
                          createTextVNode(),
                          createVNode("div", { class: "form-text text-end small" }, toDisplayString(((_b = unref(form_post).post_text) == null ? void 0 : _b.length) || 0) + "/255 karakter", 1),
                          createTextVNode(),
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
                          createTextVNode(),
                          createVNode("label", {
                            class: "form-check-label",
                            for: "post_username_modal"
                          }, " Posting sebagai Anonymous ")
                        ])
                      ]),
                      createVNode("div", { class: "modal-footer" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-secondary",
                          "data-bs-dismiss": "modal"
                        }, "Batal"),
                        createTextVNode(),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary",
                          disabled: unref(form_post).processing
                        }, [
                          unref(form_post).processing ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "spinner-border spinner-border-sm me-1",
                            "aria-hidden": "true"
                          })) : createCommentVNode("", true),
                          createTextVNode(" Kirim ")
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
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3e6ae42f"]]);
export {
  Dashboard as default
};
