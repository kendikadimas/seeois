import { ref, computed, watch, onMounted, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, createTextVNode, withModifiers, withDirectives, vModelText, vModelCheckbox, vModelRadio, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./StaffLayout-Dx7OTDGc.js";
import { _ as _sfc_main$3 } from "./InputError-DugfSnOg.js";
import { _ as _sfc_main$4 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$2 } from "./ModalConfirmation-CQDhtLdH.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
/* empty css             */
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
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const title = ref("Dashboard");
    const modalConfirmationRef = ref(null);
    const toastNotifRef = ref(null);
    const modal_post = ref(null);
    const modal_attachment = ref(null);
    const modal_billboard = ref(null);
    const post_is_expanded = ref(false);
    const placeholder = ref("placeholder");
    const form_billboard = useForm({
      billboard_title: "",
      billboard_typeText: "",
      billboard_typeImage: "",
      billboard_text: "",
      billboard_image: ""
    });
    const form_attachment = useForm({
      attachment_title: "",
      attachment_type: "document",
      attachment_link: "",
      attachment_document: null
    });
    const form_post = useForm({
      post_text: "",
      post_username: ""
    });
    const document_list = computed(() => {
      return props.attachment_list.filter((attachment) => attachment.type === 0);
    });
    const link_list = computed(() => {
      return props.attachment_list.filter((attachment) => attachment.type === 1);
    });
    function handleSubmitBillboard(event, route_name) {
      event.preventDefault();
      form_billboard.post(route(route_name), {
        onSuccess: () => {
          form_billboard.reset();
          modal_billboard.value.hide();
        },
        onError: (error) => console.error("submit billboard failed:", error)
      });
    }
    function handleFileBillboard(event) {
      form_billboard.billboard_image = event.target.files[0];
    }
    function handleSubmitAttachment(event, route2) {
      event.preventDefault();
      form_attachment.post(route2, {
        onSuccess: () => {
          form_attachment.reset();
          hideModalAttachment();
        },
        onError: (e) => {
          for (let key in e) {
            toastNotifRef.value.showToast("warning", e[key]);
          }
        }
      });
    }
    function handleFileAttachment(event) {
      form_attachment.attachment_document = event.target.files[0];
    }
    function handleSubmitPost(event, route2) {
      event.preventDefault();
      form_post.post(route2, {
        onSuccess: () => {
          form_post.reset();
          hideModalPost();
        }
      });
    }
    function setBillboardImage(billboard_image) {
      return `/storage/images/billboard/${billboard_image}`;
    }
    function setBillboard(billboard) {
      if (auth_user.roles_id == 1) {
        const btnBillboardDelete = document.getElementById(
          "btn_billboard_delete"
        );
        btnBillboardDelete.onclick = function() {
          confirmation(
            route("billboard.remove", billboard.id),
            `Are you sure want to delete ${billboard.title} Billboard?`
          );
        };
      }
    }
    function expand() {
      post_is_expanded.value = !post_is_expanded.value;
    }
    function confirmation(route2, message) {
      if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route2, message);
      } else {
        console.error("modalConfirmationRef is null");
      }
    }
    function hideModalBillboard() {
      var _a;
      (_a = modal_billboard.value) == null ? void 0 : _a.hide();
    }
    function showModalBillboard() {
      modal_billboard.value = new bootstrap.Modal(
        document.getElementById("addBillboardModal")
      );
      modal_billboard.value.show();
    }
    function hideModalPost() {
      var _a;
      (_a = modal_post.value) == null ? void 0 : _a.hide();
    }
    function showModalPost() {
      modal_post.value = new bootstrap.Modal(document.getElementById("addPost"));
      modal_post.value.show();
    }
    function hideModalAttachment() {
      var _a;
      (_a = modal_attachment.value) == null ? void 0 : _a.hide();
    }
    function showModalAttachment() {
      modal_attachment.value = new bootstrap.Modal(
        document.getElementById("addAttachmentModal")
      );
      modal_attachment.value.show();
    }
    watch(
      () => props.notif,
      (newValue) => {
        const notification = newValue;
        toastNotifRef.value.showToast(notification.type, notification.message);
      }
    );
    onMounted(() => {
      placeholder.value = "";
      if (props.notif) {
        toastNotifRef.value.showToast(props.notif.type, props.notif.message);
      }
    });
    __expose({
      handleSubmitBillboard,
      handleSubmitAttachment,
      handleSubmitPost,
      hideModalBillboard,
      showModalBillboard,
      hideModalPost,
      showModalPost,
      hideModalAttachment,
      showModalAttachment
    });
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
              title: "Dashboard",
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="container me-lg-0 mx-auto mb-5"${_scopeId}><div class="row gx-4 px-lg-0 px-2"${_scopeId}><div class="col-12 col-lg-8"${_scopeId}><div class="row mt-4"${_scopeId}>`);
            if (__props.billboard_list.length == 0) {
              _push2(`<div class="col-12"${_scopeId}><button class="btn btn-primary d-flex w-100" data-bs-target="#setBillboardModal" data-bs-toggle="modal"${_scopeId}><i class="bi bi-file-earmark-richtext fs-6"${_scopeId}></i><span class="fs-6 fw-light ms-2"${_scopeId}>${ssrInterpolate("Add Billboard")}</span></button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="col-12"${_scopeId}><div class="carousel slide position-relative shadow rounded" id="billboardCarousel" data-bs-ride="carousel"${_scopeId}><div class="carousel-inner rounded"${_scopeId}><!--[-->`);
            ssrRenderList(__props.billboard_list, (billboard) => {
              _push2(`<div class="${ssrRenderClass(
                "carousel-item " + (__props.billboard_list[0] == billboard ? "active" : "")
              )}"${_scopeId}><div class="card"${ssrRenderAttr(
                "data-bs-target",
                unref(auth_user).roles_id == 1 ? "#setBillboardModal" : ""
              )}${ssrRenderAttr(
                "data-bs-toggle",
                unref(auth_user).roles_id == 1 ? "modal" : ""
              )}${_scopeId}><div class="row g-2 justify-content-center"${_scopeId}><div class="${ssrRenderClass(
                (billboard.text ? "col-lg-4 col-5 " : "col-lg-12 col-12 ") + (!billboard.image ? "d-none" : "")
              )}"${_scopeId}><img${ssrRenderAttr(
                "src",
                setBillboardImage(
                  billboard.image
                )
              )} alt="image" class="${ssrRenderClass(
                "rounded bg-secondary bg-opacity-25 " + placeholder.value
              )}" style="${ssrRenderStyle(
                "height:auto; width:100%; object-fit:cover; " + (billboard.text ? "aspect-ratio:1;" : "aspect-ratio:2.5;")
              )}"${_scopeId}></div><div class="${ssrRenderClass(
                (billboard.image ? "col-lg-8 col-7 " : "col-lg-12 col-12 ") + (!billboard.text ? "d-none" : "")
              )}"${_scopeId}><div class="row mt-2"${_scopeId}><div class="col-12 d-flex"${_scopeId}><div class="${ssrRenderClass(
                "scroll-x-hidden me-2 " + (!billboard.image ? "ms-2" : "")
              )}"${_scopeId}><span class="h3 text-primary-emphasis"${_scopeId}>${ssrInterpolate(billboard.title)}</span></div></div></div><div class="row mt-0"${_scopeId}><div class="col-12"${_scopeId}><p style="${ssrRenderStyle({ "text-align": "justify" })}" class="${ssrRenderClass(
                "me-2 justify-text " + (!billboard.image ? "ms-2" : "")
              )}"${_scopeId}>${ssrInterpolate(billboard.text)}</p></div></div></div></div></div></div>`);
            });
            _push2(`<!--]--></div><button class="carousel-control-prev" type="button" data-bs-target="#billboardCarousel" data-bs-slide="prev"${_scopeId}></button><button class="carousel-control-next" type="button" data-bs-target="#billboardCarousel" data-bs-slide="next"${_scopeId}></button></div></div>`);
            if (unref(auth_user).roles_id == 1) {
              _push2(`<div class="modal fade" id="setBillboardModal" tabindex="-1" aria-labelledby="setBillboardModal" aria-hidden="true"${_scopeId}><div class="modal-dialog modal-dialog-centered"${_scopeId}><div class="modal-content shadow mx-3"${_scopeId}><div class="modal-header py-1 ps-3 pe-2"${_scopeId}><span class="modal-title fs-5 text-primary-emphasis"${_scopeId}><i class="bi bi-gear border-secondary border-end me-2 pe-2"${_scopeId}></i> ${ssrInterpolate("Billboard Settings")}</span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal" aria-label="Close"${_scopeId}><i class="bi bi-x-lg"${_scopeId}></i></button></div><div class="modal-body bg-light"${_scopeId}><div class="row g-2 justify-content-center"${_scopeId}><div class="col-4"${_scopeId}><button class="btn btn-sm btn-primary w-100" data-bs-dismiss="modal"${_scopeId}>${ssrInterpolate("New Billboard")}</button></div>`);
              if (__props.billboard_list.length > 0) {
                _push2(`<div class="col-4"${_scopeId}><button class="btn btn-sm btn-secondary w-100" data-bs-dismiss="modal" id="btn_billboard_delete"${_scopeId}>${ssrInterpolate("Delete Billboard")}</button></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="modal-footer p-1"${_scopeId}><button type="button" class="btn btn-sm btn-primary" data-bs-dismiss="modal"${_scopeId}>${ssrInterpolate("Cancel")}</button></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(auth_user).roles_id == 1) {
              _push2(`<div class="modal fade" id="addBillboardModal" tabindex="-1" aria-labelledby="addBillboardModal" aria-hidden="true"${_scopeId}><div class="modal-dialog modal-dialog-centered"${_scopeId}><div class="modal-content shadow mx-3"${_scopeId}><div class="modal-header py-1 ps-3 pe-2"${_scopeId}><span class="modal-title fs-5 text-primary-emphasis"${_scopeId}><i class="bi bi-plus-lg border-secondary border-end me-2 pe-2"${_scopeId}></i> ${ssrInterpolate("New Billboard")}</span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal" aria-label="Close"${_scopeId}><i class="bi bi-x-lg"${_scopeId}></i></button></div><form enctype="multipart/form-data"${_scopeId}><div class="modal-body bg-light bg-opacity-100"${_scopeId}><div class="row gx-2 justify-content-center text-end"${_scopeId}><div class="col-2 col-lg-2"${_scopeId}><label for="dashboard_title" class="form-label d-inline-block text-secondary"${_scopeId}>${ssrInterpolate("Title")}</label></div><div class="col-10 col-lg-8"${_scopeId}><input type="text" class="form-control form-control-sm d-inline-block" placeholder="Type here.."${ssrRenderAttr(
                "value",
                unref(form_billboard).billboard_title
              )} id="dashboard_title" required${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                message: unref(form_billboard).errors.billboard_title
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="row gx-2 justify-content-center mt-2"${_scopeId}><div class="col-2 col-lg-2 text-end"${_scopeId}><label for="billboardType1" class="form-label d-inline-block text-secondary"${_scopeId}>${ssrInterpolate("Type")}</label></div><div class="col-10 col-lg-8"${_scopeId}><div class="form-check form-check-inline"${_scopeId}><input class="form-check-input" type="checkbox"${ssrIncludeBooleanAttr(
                Array.isArray(
                  unref(form_billboard).billboard_typeImage
                ) ? ssrLooseContain(
                  unref(form_billboard).billboard_typeImage,
                  null
                ) : unref(form_billboard).billboard_typeImage
              ) ? " checked" : ""} id="billboardType1"${_scopeId}><label class="form-check-label" for="billboardType1"${_scopeId}>${ssrInterpolate("image")}</label></div><div class="form-check form-check-inline"${_scopeId}><input class="form-check-input" type="checkbox" id="billboardType2"${ssrIncludeBooleanAttr(
                Array.isArray(
                  unref(form_billboard).billboard_typeText
                ) ? ssrLooseContain(
                  unref(form_billboard).billboard_typeText,
                  null
                ) : unref(form_billboard).billboard_typeText
              ) ? " checked" : ""}${_scopeId}><label class="form-check-label" for="billboardType2"${_scopeId}>${ssrInterpolate("text")}</label></div></div></div>`);
              if (unref(form_billboard).billboard_typeImage) {
                _push2(`<div class="row gx-2 mt-2 justify-content-center" id="attachment_input_image"${_scopeId}><div class="col-2 col-lg-2 text-end"${_scopeId}><label for="dashboard_image" class="form-label d-inline-block text-secondary"${_scopeId}>${ssrInterpolate("Image")}</label></div><div class="col-10 col-lg-8"${_scopeId}><input type="file" class="form-control form-control-sm" id="dashboard_image"${ssrIncludeBooleanAttr(
                  unref(form_billboard).billboard_typeImage
                ) ? " required" : ""}${_scopeId}><span class="mt-1 text-secondary" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("max: 5Mb, ratio: 1/1")}</span>`);
                _push2(ssrRenderComponent(_sfc_main$3, {
                  message: unref(form_billboard).errors.dashboard_image
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(form_billboard).billboard_typeText) {
                _push2(`<div class="row gx-2 mt-2 justify-content-center" id="attachment_input_text"${_scopeId}><div class="col-2 col-lg-2 text-end"${_scopeId}><label for="dashboard_text" class="form-label d-inline-block text-secondary"${_scopeId}>${ssrInterpolate("Text")}</label></div><div class="col-10 col-lg-8"${_scopeId}><textarea class="form-control form-control-sm" rows="4" id="dashboard_text"${ssrIncludeBooleanAttr(
                  unref(form_billboard).billboard_typeText
                ) ? " required" : ""}${_scopeId}>${ssrInterpolate(
                  unref(form_billboard).billboard_text
                )}</textarea>`);
                _push2(ssrRenderComponent(_sfc_main$3, {
                  message: unref(form_billboard).errors.dashboard_text
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="modal-footer p-1"${_scopeId}><button type="submit" class="btn btn-sm btn-primary"${_scopeId}>${ssrInterpolate("Set")}</button></div></form></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="${ssrRenderClass(
              "row " + (__props.billboard_list.length > 0 ? "mt-4" : "mt-2")
            )}"${_scopeId}><div class="col-12"${_scopeId}><div class="card bg-white"${_scopeId}><h5 class="mx-2 mt-2 border-bottom border-1 border-primary pb-1 text-primary-emphasis d-flex"${_scopeId}><i class="bi bi-journal-bookmark-fill me-1 text-primary-emphasis rounded p-1"${_scopeId}></i><span class="my-auto"${_scopeId}>${ssrInterpolate("Important Attachment")}</span>`);
            if (unref(auth_user).roles_id == 1) {
              _push2(`<button class="btn btn-sm btn-outline-primary my-auto ms-auto border-0 py-0 me-1"${_scopeId}><i class="bi bi-plus-lg"${_scopeId}></i></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</h5>`);
            if (unref(auth_user).roles_id == 1) {
              _push2(`<div class="modal fade" id="addAttachmentModal" tabindex="-1" aria-labelledby="addAttachmentModal" aria-hidden="true"${_scopeId}><div class="modal-dialog modal-dialog-centered"${_scopeId}><div class="modal-content shadow mx-3"${_scopeId}><div class="modal-header py-1 ps-3 pe-2"${_scopeId}><span class="modal-title fs-5 text-primary-emphasis"${_scopeId}><i class="bi bi-plus-lg border-secondary border-end me-2 pe-2"${_scopeId}></i> ${ssrInterpolate("New Attachment")}</span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal" aria-label="Close"${_scopeId}><i class="bi bi-x-lg"${_scopeId}></i></button></div><form enctype="multipart/form-data"${_scopeId}><div class="modal-body bg-light bg-opacity-100"${_scopeId}><div class="row gx-2 justify-content-center text-end"${_scopeId}><div class="col-3 col-lg-3 text-end"${_scopeId}><label for="attachment_title" class="form-label d-inline-block text-secondary"${_scopeId}>${ssrInterpolate("Title")}</label></div><div class="col-8 col-lg-8"${_scopeId}><input type="text" class="form-control form-control-sm d-inline-block" placeholder="Type here.." name="attachment_title"${ssrRenderAttr(
                "value",
                unref(form_attachment).attachment_title
              )} id="attachment_title" required${_scopeId}>`);
              if (__props.errors.attachment_title) {
                _push2(ssrRenderComponent(_sfc_main$3, {
                  message: unref(form_attachment).errors.attachment_title
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="row gx-2 justify-content-center mt-2"${_scopeId}><div class="col-3 col-lg-3 text-end"${_scopeId}><label for="billboardType1" class="form-label d-inline-block text-secondary"${_scopeId}>${ssrInterpolate("Type")}</label></div><div class="col-8 col-lg-8"${_scopeId}><div class="form-check form-check-inline"${_scopeId}><input class="form-check-input" type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(
                unref(form_attachment).attachment_type,
                "document"
              )) ? " checked" : ""} id="attachmentType1" checked="checked" value="document"${_scopeId}><label class="form-check-label" for="attachmentType1"${_scopeId}>${ssrInterpolate("Document")}</label></div><div class="form-check form-check-inline"${_scopeId}><input class="form-check-input" type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(
                unref(form_attachment).attachment_type,
                "link"
              )) ? " checked" : ""} id="attachmentType2" value="link"${_scopeId}><label class="form-check-label" for="attachmentType2"${_scopeId}>${ssrInterpolate("Link")}</label></div></div></div><div class="${ssrRenderClass(
                "row gx-2 mt-2 justify-content-center " + (unref(form_attachment).attachment_type == "link" ? "d-none" : "")
              )}" id="attachment_input_document"${_scopeId}><div class="col-3 col-lg-3 text-end"${_scopeId}><label for="attachment_document" class="form-label d-inline-block text-secondary"${_scopeId}>${ssrInterpolate("Document")}</label></div><div class="col-8 col-lg-8"${_scopeId}><input type="file" class="form-control form-control-sm" id="attachment_document"${_scopeId}><span class="mt-1 text-secondary fw-light" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("5Mb - pdf, docx, jpg, jpeg, png, heic")}</span>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                message: unref(form_attachment).errors.attachment_document
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="${ssrRenderClass(
                "row gx-2 mt-2 justify-content-center " + (unref(form_attachment).attachment_type == "document" ? "d-none" : "")
              )}" id="attachment_input_link"${_scopeId}><div class="col-3 col-lg-3 text-end"${_scopeId}><label for="attachment_link" class="form-label d-inline-block text-secondary"${_scopeId}>${ssrInterpolate("Link")}</label></div><div class="col-8 col-lg-8"${_scopeId}><input type="text"${ssrRenderAttr(
                "value",
                unref(form_attachment).attachment_link
              )} id="attachment_link" class="form-control form-control-sm"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                message: unref(form_attachment).errors.attachment_link
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div><div class="modal-footer p-1"${_scopeId}><button type="submit" class="btn btn-sm btn-primary"${_scopeId}>${ssrInterpolate("Set")}</button></div></form></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="row g-2 px-2 pb-2"${_scopeId}><div class="col-6"${_scopeId}><h6 class="text-secondary ps-2 d-flex"${_scopeId}><i class="bi bi-file-earmark-text me-2"${_scopeId}></i> ${ssrInterpolate("Documents")}</h6><div class="scroll-container scroll-container-lg"${_scopeId}><div class="row gx-1"${_scopeId}><div class="col-12"${_scopeId}><!--[-->`);
            ssrRenderList(document_list.value, (document2) => {
              _push2(`<div class="list-group rounded-0"${_scopeId}><li class="list-group-item list-group-item-action list-group-item-white border-top border-0 p-1 d-flex"${_scopeId}><a${ssrRenderAttr(
                "href",
                "/storage/document/attachment/" + document2.document
              )} class="list-group-item list-group-item-action list-group-item-white py-0 border-0" download${_scopeId}><div class="scroll-x-hidden my-auto me-2"${_scopeId}><span class="text-decoration-none text-nowrap"${_scopeId}>${ssrInterpolate(document2.title)}</span></div></a>`);
              if (unref(auth_user).roles_id == 1) {
                _push2(`<button type="button" class="btn btn-sm btn-outline-secondary border-0"${_scopeId}><div class="d-flex"${_scopeId}><i class="bi bi-trash3 mx-auto"${_scopeId}></i></div></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</li></div>`);
            });
            _push2(`<!--]--></div>`);
            if (unref(auth_user).roles_id == 1) {
              _push2(`<div class="col-2"${_scopeId}><!--[-->`);
              ssrRenderList(document_list.value, (document2) => {
                _push2(`<div class="list-group rounded-0"${_scopeId}></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="col-6"${_scopeId}><h6 class="text-secondary ps-2 d-flex"${_scopeId}><i class="bi bi-link-45deg me-2"${_scopeId}></i> ${ssrInterpolate("Links")}</h6><div class="scroll-container scroll-container-lg"${_scopeId}><div class="row gx-1"${_scopeId}><div class="col-12"${_scopeId}><!--[-->`);
            ssrRenderList(link_list.value, (link) => {
              _push2(`<div class="list-group rounded-0"${_scopeId}><li class="list-group-item list-group-item-action list-group-item-white border-top border-0 p-1 d-flex"${_scopeId}><a${ssrRenderAttr(
                "href",
                link.link
              )} target="_blank" class="text-decoration-none list-group-item list-group-item-action list-group-item-white border-0 py-0"${_scopeId}><div class="scroll-x-hidden my-auto me-2"${_scopeId}><span class="text-decoration-none text-nowrap"${_scopeId}>${ssrInterpolate(link.title)}</span></div></a>`);
              if (unref(auth_user).roles_id == 1) {
                _push2(`<button type="button" class="btn btn-sm btn-outline-secondary border-0 ms-auto my-auto"${_scopeId}><i class="bi bi-trash3 mx-auto"${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</li></div>`);
            });
            _push2(`<!--]--></div></div></div></div></div></div></div></div></div><div class="col-12 col-lg-4"${_scopeId}><div class="row mt-4 h-100"${_scopeId}><div class="col-12 h-100"${_scopeId}><div class="card bg-secondary bg-opacity-25 w-100"${_scopeId}><div class="w-100 rounded bg-white shadow-sm"${_scopeId}><h4 class="fst-italic bg-light bg-opacity-75 rounded p-2 d-flex mb-0"${_scopeId}><span class="mx-auto text-primary-emphasis bg-white w-100 rounded text-center p-1"${_scopeId}><i class="bi bi-send-fill me-2 text-primary-emphasis"${_scopeId}></i> ${ssrInterpolate("SEEO POST")}</span><button class="btn btn-sm btn-outline-secondary border-0 d-lg-none d-block"${_scopeId}><i class="${ssrRenderClass(
              "bi bi-arrows-" + (post_is_expanded.value ? "collapse" : "expand")
            )}" id="expandTrigger"${_scopeId}></i></button></h4></div><div class="d-flex"${_scopeId}><div class="${ssrRenderClass(
              "scroll-container-lg-" + (post_is_expanded.value ? "5" : "3") + " scroll-container-" + (post_is_expanded.value ? "5" : "3") + " px-2 mt-3 bg-opacity-0"
            )}" id="expandContainer" style="${ssrRenderStyle({ minHeight: "120px" })}"${_scopeId}><div class="row gy-3 pb-3"${_scopeId}><!--[-->`);
            ssrRenderList(__props.post_list, (post) => {
              _push2(`<div class="col-12"${_scopeId}><div class="card"${_scopeId}><h6 class="mb-0 d-flex mt-2"${_scopeId}><div class="d-flex border-bottom border-secondary-subtle mx-2 w-100 pb-1"${_scopeId}><a${ssrRenderAttr(
                "href",
                !post.anonymus ? _ctx.route(
                  "profile.edit",
                  {
                    id: post.id
                  }
                ) : null
              )} class="${ssrRenderClass(
                "text-decoration-none m-0 d-flex " + (post.anonymus ? "disabled-link" : "")
              )}"${_scopeId}><span class="my-auto text-secondary fw-normal"${_scopeId}>${ssrInterpolate(post.anonymus ? "Anonymus" : post.user.name)}</span></a>`);
              if (unref(auth_user).roles_id == 1 || (post.anonymus ? false : unref(auth_user).id == post.user_id)) {
                _push2(`<button class="btn btn-sm btn-outline-secondary border-0 ms-auto"${_scopeId}><i class="bi bi-trash3"${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></h6><p class="px-2 mb-1" style="${ssrRenderStyle({ "text-align": "justify" })}"${_scopeId}>${ssrInterpolate(post.text)}</p></div></div>`);
            });
            _push2(`<!--]-->`);
            if (__props.post_list.length == 0) {
              _push2(`<div class="col-12"${_scopeId}><div class="d-flex"${_scopeId}><span class="text-white text-opacity-50 fs-1 bg-opacity-0 mx-auto"${_scopeId}><i class="bi bi-send-slash me-2 pe-2 border-end border-white border-2 border-opacity-50"${_scopeId}></i> ${ssrInterpolate("Oh No!")}</span></div><div class="d-flex"${_scopeId}><span class="fs-5 text-white text-opacity-50 mx-auto"${_scopeId}>${ssrInterpolate("Let`s add a new post.")}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: "Dashboard",
                icon: "/storage/local/images/apps/logo.png"
              }),
              createVNode(_sfc_main$2, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
              }, null, 512),
              createVNode("div", { class: "container me-lg-0 mx-auto mb-5" }, [
                createVNode("div", { class: "row gx-4 px-lg-0 px-2" }, [
                  createVNode("div", { class: "col-12 col-lg-8" }, [
                    createVNode("div", { class: "row mt-4" }, [
                      __props.billboard_list.length == 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "col-12"
                      }, [
                        createVNode("button", {
                          class: "btn btn-primary d-flex w-100",
                          "data-bs-target": "#setBillboardModal",
                          "data-bs-toggle": "modal"
                        }, [
                          createVNode("i", { class: "bi bi-file-earmark-richtext fs-6" }),
                          createVNode("span", { class: "fs-6 fw-light ms-2" }, toDisplayString("Add Billboard"))
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "col-12" }, [
                        createVNode("div", {
                          class: "carousel slide position-relative shadow rounded",
                          id: "billboardCarousel",
                          "data-bs-ride": "carousel"
                        }, [
                          createVNode("div", { class: "carousel-inner rounded" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.billboard_list, (billboard) => {
                              return openBlock(), createBlock("div", {
                                class: "carousel-item " + (__props.billboard_list[0] == billboard ? "active" : "")
                              }, [
                                createVNode("div", {
                                  class: "card",
                                  "data-bs-target": unref(auth_user).roles_id == 1 ? "#setBillboardModal" : "",
                                  "data-bs-toggle": unref(auth_user).roles_id == 1 ? "modal" : "",
                                  onLoad: ($event) => _ctx.addBillboardIndex(),
                                  onClick: ($event) => setBillboard(billboard)
                                }, [
                                  createVNode("div", { class: "row g-2 justify-content-center" }, [
                                    createVNode("div", {
                                      class: (billboard.text ? "col-lg-4 col-5 " : "col-lg-12 col-12 ") + (!billboard.image ? "d-none" : "")
                                    }, [
                                      createVNode("img", {
                                        src: setBillboardImage(
                                          billboard.image
                                        ),
                                        alt: "image",
                                        class: "rounded bg-secondary bg-opacity-25 " + placeholder.value,
                                        style: "height:auto; width:100%; object-fit:cover; " + (billboard.text ? "aspect-ratio:1;" : "aspect-ratio:2.5;")
                                      }, null, 14, ["src"])
                                    ], 2),
                                    createVNode("div", {
                                      class: (billboard.image ? "col-lg-8 col-7 " : "col-lg-12 col-12 ") + (!billboard.text ? "d-none" : "")
                                    }, [
                                      createVNode("div", { class: "row mt-2" }, [
                                        createVNode("div", { class: "col-12 d-flex" }, [
                                          createVNode("div", {
                                            class: "scroll-x-hidden me-2 " + (!billboard.image ? "ms-2" : "")
                                          }, [
                                            createVNode("span", { class: "h3 text-primary-emphasis" }, toDisplayString(billboard.title), 1)
                                          ], 2)
                                        ])
                                      ]),
                                      createVNode("div", { class: "row mt-0" }, [
                                        createVNode("div", { class: "col-12" }, [
                                          createVNode("p", {
                                            style: { "text-align": "justify" },
                                            class: "me-2 justify-text " + (!billboard.image ? "ms-2" : "")
                                          }, toDisplayString(billboard.text), 3)
                                        ])
                                      ])
                                    ], 2)
                                  ])
                                ], 40, ["data-bs-target", "data-bs-toggle", "onLoad", "onClick"])
                              ], 2);
                            }), 256))
                          ]),
                          createVNode("button", {
                            class: "carousel-control-prev",
                            type: "button",
                            "data-bs-target": "#billboardCarousel",
                            "data-bs-slide": "prev"
                          }),
                          createVNode("button", {
                            class: "carousel-control-next",
                            type: "button",
                            "data-bs-target": "#billboardCarousel",
                            "data-bs-slide": "next"
                          })
                        ])
                      ]),
                      unref(auth_user).roles_id == 1 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "modal fade",
                        id: "setBillboardModal",
                        tabindex: "-1",
                        "aria-labelledby": "setBillboardModal",
                        "aria-hidden": "true"
                      }, [
                        createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                          createVNode("div", { class: "modal-content shadow mx-3" }, [
                            createVNode("div", { class: "modal-header py-1 ps-3 pe-2" }, [
                              createVNode("span", { class: "modal-title fs-5 text-primary-emphasis" }, [
                                createVNode("i", { class: "bi bi-gear border-secondary border-end me-2 pe-2" }),
                                createTextVNode(" " + toDisplayString("Billboard Settings"))
                              ]),
                              createVNode("button", {
                                type: "button",
                                class: "btn btn-sm ms-auto",
                                "data-bs-dismiss": "modal",
                                "aria-label": "Close"
                              }, [
                                createVNode("i", { class: "bi bi-x-lg" })
                              ])
                            ]),
                            createVNode("div", { class: "modal-body bg-light" }, [
                              createVNode("div", { class: "row g-2 justify-content-center" }, [
                                createVNode("div", { class: "col-4" }, [
                                  createVNode("button", {
                                    class: "btn btn-sm btn-primary w-100",
                                    onClick: showModalBillboard,
                                    "data-bs-dismiss": "modal"
                                  }, toDisplayString("New Billboard"))
                                ]),
                                __props.billboard_list.length > 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "col-4"
                                }, [
                                  createVNode("button", {
                                    class: "btn btn-sm btn-secondary w-100",
                                    "data-bs-dismiss": "modal",
                                    id: "btn_billboard_delete"
                                  }, toDisplayString("Delete Billboard"))
                                ])) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("div", { class: "modal-footer p-1" }, [
                              createVNode("button", {
                                type: "button",
                                class: "btn btn-sm btn-primary",
                                "data-bs-dismiss": "modal"
                              }, toDisplayString("Cancel"))
                            ])
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      unref(auth_user).roles_id == 1 ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "modal fade",
                        id: "addBillboardModal",
                        tabindex: "-1",
                        "aria-labelledby": "addBillboardModal",
                        "aria-hidden": "true"
                      }, [
                        createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                          createVNode("div", { class: "modal-content shadow mx-3" }, [
                            createVNode("div", { class: "modal-header py-1 ps-3 pe-2" }, [
                              createVNode("span", { class: "modal-title fs-5 text-primary-emphasis" }, [
                                createVNode("i", { class: "bi bi-plus-lg border-secondary border-end me-2 pe-2" }),
                                createTextVNode(" " + toDisplayString("New Billboard"))
                              ]),
                              createVNode("button", {
                                type: "button",
                                class: "btn btn-sm ms-auto",
                                "data-bs-dismiss": "modal",
                                "aria-label": "Close"
                              }, [
                                createVNode("i", { class: "bi bi-x-lg" })
                              ])
                            ]),
                            createVNode("form", {
                              onSubmit: withModifiers(($event) => handleSubmitBillboard(
                                $event,
                                "billboard.add"
                              ), ["prevent"]),
                              enctype: "multipart/form-data"
                            }, [
                              createVNode("div", { class: "modal-body bg-light bg-opacity-100" }, [
                                createVNode("div", { class: "row gx-2 justify-content-center text-end" }, [
                                  createVNode("div", { class: "col-2 col-lg-2" }, [
                                    createVNode("label", {
                                      for: "dashboard_title",
                                      class: "form-label d-inline-block text-secondary"
                                    }, toDisplayString("Title"))
                                  ]),
                                  createVNode("div", { class: "col-10 col-lg-8" }, [
                                    withDirectives(createVNode("input", {
                                      type: "text",
                                      class: "form-control form-control-sm d-inline-block",
                                      placeholder: "Type here..",
                                      "onUpdate:modelValue": ($event) => unref(form_billboard).billboard_title = $event,
                                      id: "dashboard_title",
                                      required: ""
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [
                                        vModelText,
                                        unref(form_billboard).billboard_title
                                      ]
                                    ]),
                                    createVNode(_sfc_main$3, {
                                      message: unref(form_billboard).errors.billboard_title
                                    }, null, 8, ["message"])
                                  ])
                                ]),
                                createVNode("div", { class: "row gx-2 justify-content-center mt-2" }, [
                                  createVNode("div", { class: "col-2 col-lg-2 text-end" }, [
                                    createVNode("label", {
                                      for: "billboardType1",
                                      class: "form-label d-inline-block text-secondary"
                                    }, toDisplayString("Type"))
                                  ]),
                                  createVNode("div", { class: "col-10 col-lg-8" }, [
                                    createVNode("div", { class: "form-check form-check-inline" }, [
                                      withDirectives(createVNode("input", {
                                        class: "form-check-input",
                                        type: "checkbox",
                                        "onUpdate:modelValue": ($event) => unref(form_billboard).billboard_typeImage = $event,
                                        id: "billboardType1"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [
                                          vModelCheckbox,
                                          unref(form_billboard).billboard_typeImage
                                        ]
                                      ]),
                                      createVNode("label", {
                                        class: "form-check-label",
                                        for: "billboardType1"
                                      }, toDisplayString("image"))
                                    ]),
                                    createVNode("div", { class: "form-check form-check-inline" }, [
                                      withDirectives(createVNode("input", {
                                        class: "form-check-input",
                                        type: "checkbox",
                                        id: "billboardType2",
                                        "onUpdate:modelValue": ($event) => unref(form_billboard).billboard_typeText = $event
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [
                                          vModelCheckbox,
                                          unref(form_billboard).billboard_typeText
                                        ]
                                      ]),
                                      createVNode("label", {
                                        class: "form-check-label",
                                        for: "billboardType2"
                                      }, toDisplayString("text"))
                                    ])
                                  ])
                                ]),
                                unref(form_billboard).billboard_typeImage ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "row gx-2 mt-2 justify-content-center",
                                  id: "attachment_input_image"
                                }, [
                                  createVNode("div", { class: "col-2 col-lg-2 text-end" }, [
                                    createVNode("label", {
                                      for: "dashboard_image",
                                      class: "form-label d-inline-block text-secondary"
                                    }, toDisplayString("Image"))
                                  ]),
                                  createVNode("div", { class: "col-10 col-lg-8" }, [
                                    createVNode("input", {
                                      type: "file",
                                      class: "form-control form-control-sm",
                                      id: "dashboard_image",
                                      onChange: handleFileBillboard,
                                      required: unref(form_billboard).billboard_typeImage
                                    }, null, 40, ["onChange", "required"]),
                                    createVNode("span", {
                                      class: "mt-1 text-secondary",
                                      style: { "font-size": "0.8rem" }
                                    }, toDisplayString("max: 5Mb, ratio: 1/1")),
                                    createVNode(_sfc_main$3, {
                                      message: unref(form_billboard).errors.dashboard_image
                                    }, null, 8, ["message"])
                                  ])
                                ])) : createCommentVNode("", true),
                                unref(form_billboard).billboard_typeText ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "row gx-2 mt-2 justify-content-center",
                                  id: "attachment_input_text"
                                }, [
                                  createVNode("div", { class: "col-2 col-lg-2 text-end" }, [
                                    createVNode("label", {
                                      for: "dashboard_text",
                                      class: "form-label d-inline-block text-secondary"
                                    }, toDisplayString("Text"))
                                  ]),
                                  createVNode("div", { class: "col-10 col-lg-8" }, [
                                    withDirectives(createVNode("textarea", {
                                      class: "form-control form-control-sm",
                                      rows: "4",
                                      "onUpdate:modelValue": ($event) => unref(form_billboard).billboard_text = $event,
                                      id: "dashboard_text",
                                      required: unref(form_billboard).billboard_typeText
                                    }, "                                                    ", 8, ["onUpdate:modelValue", "required"]), [
                                      [
                                        vModelText,
                                        unref(form_billboard).billboard_text
                                      ]
                                    ]),
                                    createVNode(_sfc_main$3, {
                                      message: unref(form_billboard).errors.dashboard_text
                                    }, null, 8, ["message"])
                                  ])
                                ])) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "modal-footer p-1" }, [
                                createVNode("button", {
                                  type: "submit",
                                  class: "btn btn-sm btn-primary"
                                }, toDisplayString("Set"))
                              ])
                            ], 40, ["onSubmit"])
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", {
                      class: "row " + (__props.billboard_list.length > 0 ? "mt-4" : "mt-2")
                    }, [
                      createVNode("div", { class: "col-12" }, [
                        createVNode("div", { class: "card bg-white" }, [
                          createVNode("h5", { class: "mx-2 mt-2 border-bottom border-1 border-primary pb-1 text-primary-emphasis d-flex" }, [
                            createVNode("i", { class: "bi bi-journal-bookmark-fill me-1 text-primary-emphasis rounded p-1" }),
                            createVNode("span", { class: "my-auto" }, toDisplayString("Important Attachment")),
                            unref(auth_user).roles_id == 1 ? (openBlock(), createBlock("button", {
                              key: 0,
                              class: "btn btn-sm btn-outline-primary my-auto ms-auto border-0 py-0 me-1",
                              onClick: ($event) => showModalAttachment()
                            }, [
                              createVNode("i", { class: "bi bi-plus-lg" })
                            ], 8, ["onClick"])) : createCommentVNode("", true)
                          ]),
                          unref(auth_user).roles_id == 1 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "modal fade",
                            id: "addAttachmentModal",
                            tabindex: "-1",
                            "aria-labelledby": "addAttachmentModal",
                            "aria-hidden": "true"
                          }, [
                            createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                              createVNode("div", { class: "modal-content shadow mx-3" }, [
                                createVNode("div", { class: "modal-header py-1 ps-3 pe-2" }, [
                                  createVNode("span", { class: "modal-title fs-5 text-primary-emphasis" }, [
                                    createVNode("i", { class: "bi bi-plus-lg border-secondary border-end me-2 pe-2" }),
                                    createTextVNode(" " + toDisplayString("New Attachment"))
                                  ]),
                                  createVNode("button", {
                                    type: "button",
                                    class: "btn btn-sm ms-auto",
                                    "data-bs-dismiss": "modal",
                                    "aria-label": "Close"
                                  }, [
                                    createVNode("i", { class: "bi bi-x-lg" })
                                  ])
                                ]),
                                createVNode("form", {
                                  onSubmit: withModifiers(($event) => handleSubmitAttachment(
                                    $event,
                                    _ctx.route("attachment.add")
                                  ), ["prevent"]),
                                  enctype: "multipart/form-data"
                                }, [
                                  createVNode("div", { class: "modal-body bg-light bg-opacity-100" }, [
                                    createVNode("div", { class: "row gx-2 justify-content-center text-end" }, [
                                      createVNode("div", { class: "col-3 col-lg-3 text-end" }, [
                                        createVNode("label", {
                                          for: "attachment_title",
                                          class: "form-label d-inline-block text-secondary"
                                        }, toDisplayString("Title"))
                                      ]),
                                      createVNode("div", { class: "col-8 col-lg-8" }, [
                                        withDirectives(createVNode("input", {
                                          type: "text",
                                          class: "form-control form-control-sm d-inline-block",
                                          placeholder: "Type here..",
                                          name: "attachment_title",
                                          "onUpdate:modelValue": ($event) => unref(form_attachment).attachment_title = $event,
                                          id: "attachment_title",
                                          required: ""
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [
                                            vModelText,
                                            unref(form_attachment).attachment_title
                                          ]
                                        ]),
                                        __props.errors.attachment_title ? (openBlock(), createBlock(_sfc_main$3, {
                                          key: 0,
                                          message: unref(form_attachment).errors.attachment_title
                                        }, null, 8, ["message"])) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "row gx-2 justify-content-center mt-2" }, [
                                      createVNode("div", { class: "col-3 col-lg-3 text-end" }, [
                                        createVNode("label", {
                                          for: "billboardType1",
                                          class: "form-label d-inline-block text-secondary"
                                        }, toDisplayString("Type"))
                                      ]),
                                      createVNode("div", { class: "col-8 col-lg-8" }, [
                                        createVNode("div", { class: "form-check form-check-inline" }, [
                                          withDirectives(createVNode("input", {
                                            class: "form-check-input",
                                            type: "radio",
                                            "onUpdate:modelValue": ($event) => unref(form_attachment).attachment_type = $event,
                                            id: "attachmentType1",
                                            checked: "checked",
                                            value: "document"
                                          }, null, 8, ["onUpdate:modelValue"]), [
                                            [
                                              vModelRadio,
                                              unref(form_attachment).attachment_type
                                            ]
                                          ]),
                                          createVNode("label", {
                                            class: "form-check-label",
                                            for: "attachmentType1"
                                          }, toDisplayString("Document"))
                                        ]),
                                        createVNode("div", { class: "form-check form-check-inline" }, [
                                          withDirectives(createVNode("input", {
                                            class: "form-check-input",
                                            type: "radio",
                                            "onUpdate:modelValue": ($event) => unref(form_attachment).attachment_type = $event,
                                            id: "attachmentType2",
                                            value: "link"
                                          }, null, 8, ["onUpdate:modelValue"]), [
                                            [
                                              vModelRadio,
                                              unref(form_attachment).attachment_type
                                            ]
                                          ]),
                                          createVNode("label", {
                                            class: "form-check-label",
                                            for: "attachmentType2"
                                          }, toDisplayString("Link"))
                                        ])
                                      ])
                                    ]),
                                    createVNode("div", {
                                      class: "row gx-2 mt-2 justify-content-center " + (unref(form_attachment).attachment_type == "link" ? "d-none" : ""),
                                      id: "attachment_input_document"
                                    }, [
                                      createVNode("div", { class: "col-3 col-lg-3 text-end" }, [
                                        createVNode("label", {
                                          for: "attachment_document",
                                          class: "form-label d-inline-block text-secondary"
                                        }, toDisplayString("Document"))
                                      ]),
                                      createVNode("div", { class: "col-8 col-lg-8" }, [
                                        createVNode("input", {
                                          type: "file",
                                          class: "form-control form-control-sm",
                                          id: "attachment_document",
                                          onChange: handleFileAttachment
                                        }, null, 40, ["onChange"]),
                                        createVNode("span", {
                                          class: "mt-1 text-secondary fw-light",
                                          style: { "font-size": "0.8rem" }
                                        }, toDisplayString("5Mb - pdf, docx, jpg, jpeg, png, heic")),
                                        createVNode(_sfc_main$3, {
                                          message: unref(form_attachment).errors.attachment_document
                                        }, null, 8, ["message"])
                                      ])
                                    ], 2),
                                    createVNode("div", {
                                      class: "row gx-2 mt-2 justify-content-center " + (unref(form_attachment).attachment_type == "document" ? "d-none" : ""),
                                      id: "attachment_input_link"
                                    }, [
                                      createVNode("div", { class: "col-3 col-lg-3 text-end" }, [
                                        createVNode("label", {
                                          for: "attachment_link",
                                          class: "form-label d-inline-block text-secondary"
                                        }, toDisplayString("Link"))
                                      ]),
                                      createVNode("div", { class: "col-8 col-lg-8" }, [
                                        withDirectives(createVNode("input", {
                                          type: "text",
                                          "onUpdate:modelValue": ($event) => unref(form_attachment).attachment_link = $event,
                                          id: "attachment_link",
                                          class: "form-control form-control-sm"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [
                                            vModelText,
                                            unref(form_attachment).attachment_link
                                          ]
                                        ]),
                                        createVNode(_sfc_main$3, {
                                          message: unref(form_attachment).errors.attachment_link
                                        }, null, 8, ["message"])
                                      ])
                                    ], 2)
                                  ]),
                                  createVNode("div", { class: "modal-footer p-1" }, [
                                    createVNode("button", {
                                      type: "submit",
                                      class: "btn btn-sm btn-primary"
                                    }, toDisplayString("Set"))
                                  ])
                                ], 40, ["onSubmit"])
                              ])
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "row g-2 px-2 pb-2" }, [
                            createVNode("div", { class: "col-6" }, [
                              createVNode("h6", { class: "text-secondary ps-2 d-flex" }, [
                                createVNode("i", { class: "bi bi-file-earmark-text me-2" }),
                                createTextVNode(" " + toDisplayString("Documents"))
                              ]),
                              createVNode("div", { class: "scroll-container scroll-container-lg" }, [
                                createVNode("div", { class: "row gx-1" }, [
                                  createVNode("div", { class: "col-12" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(document_list.value, (document2) => {
                                      return openBlock(), createBlock("div", { class: "list-group rounded-0" }, [
                                        createVNode("li", { class: "list-group-item list-group-item-action list-group-item-white border-top border-0 p-1 d-flex" }, [
                                          createVNode("a", {
                                            href: "/storage/document/attachment/" + document2.document,
                                            class: "list-group-item list-group-item-action list-group-item-white py-0 border-0",
                                            download: ""
                                          }, [
                                            createVNode("div", { class: "scroll-x-hidden my-auto me-2" }, [
                                              createVNode("span", { class: "text-decoration-none text-nowrap" }, toDisplayString(document2.title), 1)
                                            ])
                                          ], 8, ["href"]),
                                          unref(auth_user).roles_id == 1 ? (openBlock(), createBlock("button", {
                                            key: 0,
                                            type: "button",
                                            class: "btn btn-sm btn-outline-secondary border-0",
                                            onClick: ($event) => confirmation(
                                              _ctx.route(
                                                "attachment.remove",
                                                {
                                                  id: document2.id
                                                }
                                              ),
                                              "Are you sure want to remove " + document2.title + " from attachment?"
                                            )
                                          }, [
                                            createVNode("div", { class: "d-flex" }, [
                                              createVNode("i", { class: "bi bi-trash3 mx-auto" })
                                            ])
                                          ], 8, ["onClick"])) : createCommentVNode("", true)
                                        ])
                                      ]);
                                    }), 256))
                                  ]),
                                  unref(auth_user).roles_id == 1 ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "col-2"
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(document_list.value, (document2) => {
                                      return openBlock(), createBlock("div", { class: "list-group rounded-0" });
                                    }), 256))
                                  ])) : createCommentVNode("", true)
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "col-6" }, [
                              createVNode("h6", { class: "text-secondary ps-2 d-flex" }, [
                                createVNode("i", { class: "bi bi-link-45deg me-2" }),
                                createTextVNode(" " + toDisplayString("Links"))
                              ]),
                              createVNode("div", { class: "scroll-container scroll-container-lg" }, [
                                createVNode("div", { class: "row gx-1" }, [
                                  createVNode("div", { class: "col-12" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(link_list.value, (link) => {
                                      return openBlock(), createBlock("div", { class: "list-group rounded-0" }, [
                                        createVNode("li", { class: "list-group-item list-group-item-action list-group-item-white border-top border-0 p-1 d-flex" }, [
                                          createVNode("a", {
                                            href: link.link,
                                            target: "_blank",
                                            class: "text-decoration-none list-group-item list-group-item-action list-group-item-white border-0 py-0"
                                          }, [
                                            createVNode("div", { class: "scroll-x-hidden my-auto me-2" }, [
                                              createVNode("span", { class: "text-decoration-none text-nowrap" }, toDisplayString(link.title), 1)
                                            ])
                                          ], 8, ["href"]),
                                          unref(auth_user).roles_id == 1 ? (openBlock(), createBlock("button", {
                                            key: 0,
                                            type: "button",
                                            class: "btn btn-sm btn-outline-secondary border-0 ms-auto my-auto",
                                            onClick: ($event) => confirmation(
                                              _ctx.route(
                                                "attachment.remove",
                                                {
                                                  id: link.id
                                                }
                                              ),
                                              "Are you sure want to remove " + link.title + " from attachment?"
                                            )
                                          }, [
                                            createVNode("i", { class: "bi bi-trash3 mx-auto" })
                                          ], 8, ["onClick"])) : createCommentVNode("", true)
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
                    ], 2)
                  ]),
                  createVNode("div", { class: "col-12 col-lg-4" }, [
                    createVNode("div", { class: "row mt-4 h-100" }, [
                      createVNode("div", { class: "col-12 h-100" }, [
                        createVNode("div", { class: "card bg-secondary bg-opacity-25 w-100" }, [
                          createVNode("div", { class: "w-100 rounded bg-white shadow-sm" }, [
                            createVNode("h4", { class: "fst-italic bg-light bg-opacity-75 rounded p-2 d-flex mb-0" }, [
                              createVNode("span", { class: "mx-auto text-primary-emphasis bg-white w-100 rounded text-center p-1" }, [
                                createVNode("i", { class: "bi bi-send-fill me-2 text-primary-emphasis" }),
                                createTextVNode(" " + toDisplayString("SEEO POST"))
                              ]),
                              createVNode("button", {
                                class: "btn btn-sm btn-outline-secondary border-0 d-lg-none d-block",
                                onClick: ($event) => expand()
                              }, [
                                createVNode("i", {
                                  class: "bi bi-arrows-" + (post_is_expanded.value ? "collapse" : "expand"),
                                  id: "expandTrigger"
                                }, null, 2)
                              ], 8, ["onClick"])
                            ])
                          ]),
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("div", {
                              class: "scroll-container-lg-" + (post_is_expanded.value ? "5" : "3") + " scroll-container-" + (post_is_expanded.value ? "5" : "3") + " px-2 mt-3 bg-opacity-0",
                              id: "expandContainer",
                              style: { minHeight: "120px" }
                            }, [
                              createVNode("div", { class: "row gy-3 pb-3" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.post_list, (post) => {
                                  return openBlock(), createBlock("div", { class: "col-12" }, [
                                    createVNode("div", { class: "card" }, [
                                      createVNode("h6", { class: "mb-0 d-flex mt-2" }, [
                                        createVNode("div", { class: "d-flex border-bottom border-secondary-subtle mx-2 w-100 pb-1" }, [
                                          createVNode("a", {
                                            href: !post.anonymus ? _ctx.route(
                                              "profile.edit",
                                              {
                                                id: post.id
                                              }
                                            ) : null,
                                            class: "text-decoration-none m-0 d-flex " + (post.anonymus ? "disabled-link" : "")
                                          }, [
                                            createVNode("span", { class: "my-auto text-secondary fw-normal" }, toDisplayString(post.anonymus ? "Anonymus" : post.user.name), 1)
                                          ], 10, ["href"]),
                                          unref(auth_user).roles_id == 1 || (post.anonymus ? false : unref(auth_user).id == post.user_id) ? (openBlock(), createBlock("button", {
                                            key: 0,
                                            class: "btn btn-sm btn-outline-secondary border-0 ms-auto",
                                            onClick: ($event) => confirmation(
                                              _ctx.route(
                                                "post.remove",
                                                {
                                                  id: post.id
                                                }
                                              ),
                                              "Are you sure want to remove post from " + (post.anonymus ? "anonymus" : post.user.name) + "?"
                                            )
                                          }, [
                                            createVNode("i", { class: "bi bi-trash3" })
                                          ], 8, ["onClick"])) : createCommentVNode("", true)
                                        ])
                                      ]),
                                      createVNode("p", {
                                        class: "px-2 mb-1",
                                        style: { "text-align": "justify" }
                                      }, toDisplayString(post.text), 1)
                                    ])
                                  ]);
                                }), 256)),
                                __props.post_list.length == 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "col-12"
                                }, [
                                  createVNode("div", { class: "d-flex" }, [
                                    createVNode("span", { class: "text-white text-opacity-50 fs-1 bg-opacity-0 mx-auto" }, [
                                      createVNode("i", { class: "bi bi-send-slash me-2 pe-2 border-end border-white border-2 border-opacity-50" }),
                                      createTextVNode(" " + toDisplayString("Oh No!"))
                                    ])
                                  ]),
                                  createVNode("div", { class: "d-flex" }, [
                                    createVNode("span", { class: "fs-5 text-white text-opacity-50 mx-auto" }, toDisplayString("Let`s add a new post."))
                                  ])
                                ])) : createCommentVNode("", true)
                              ])
                            ], 2)
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
      _push(ssrRenderComponent(_sfc_main$4, {
        ref_key: "toastNotifRef",
        ref: toastNotifRef
      }, null, _parent));
      _push(`<button class="fab btn btn-primary p-2"><i class="bi bi-send-plus fs-3"></i></button><div class="modal fade" id="addPost" tabindex="-1"><div class="modal-dialog modal-dialog-centered px-3 px-lg-0"><div class="modal-content shadow mt-5"><div class="modal-header py-1 ps-3 pe-2"><span class="modal-title fs-5 text-primary-emphasis"><i class="bi bi-send-plus border-secondary border-end me-2 pe-2"></i> ${ssrInterpolate("New Post")}</span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button></div><form><div class="modal-body bg-light"><div class="row justify-content-center mt-2 gx-2"><div class="col-12 col-lg-10"><div class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" name="post_username"${ssrIncludeBooleanAttr(Array.isArray(unref(form_post).post_username) ? ssrLooseContain(unref(form_post).post_username, null) : unref(form_post).post_username) ? " checked" : ""} id="post_username"><label class="form-check-label" for="post_username">${ssrInterpolate("Anonymus")}</label></div></div></div><div class="row justify-content-center mt-2 gx-2"><div class="col-12 col-lg-10"><textarea class="form-control form-control-sm" rows="4" id="post_text" required>${ssrInterpolate(unref(form_post).post_text)}</textarea>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        message: unref(form_post).errors.post_text
      }, null, _parent));
      _push(`</div></div></div><div class="modal-footer p-1"><button type="submit" class="btn btn-sm btn-primary">${ssrInterpolate("Post")} <i class="bi bi-send ms-2 ps-2 border-start border-light"></i></button></div></form></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
