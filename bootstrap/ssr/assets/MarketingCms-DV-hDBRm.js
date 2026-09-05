import { ref, onMounted, watch, onBeforeUnmount, mergeProps, useSSRContext, computed, withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, Fragment, renderList, toDisplayString, withModifiers, withDirectives, vModelText, vModelCheckbox, vModelSelect } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-kVLGS8T_.js";
import { _ as _sfc_main$2 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$3 } from "./ModalConfirmation-CaKJYApU.js";
import { useForm, router } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
const _sfc_main$1 = {
  __name: "RichTextEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "Tulis sesuatu yang luar biasa..."
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const editorRef = ref(null);
    let quill = null;
    onMounted(() => {
      if (!window.Quill) {
        const link = document.createElement("link");
        link.href = "https://cdn.quilljs.com/1.3.6/quill.snow.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);
        const script = document.createElement("script");
        script.src = "https://cdn.quilljs.com/1.3.6/quill.min.js";
        script.onload = initQuill;
        document.head.appendChild(script);
      } else {
        initQuill();
      }
    });
    function initQuill() {
      if (!editorRef.value) return;
      quill = new window.Quill(editorRef.value, {
        theme: "snow",
        placeholder: props.placeholder,
        modules: {
          toolbar: {
            container: [
              [{ "header": [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ "list": "ordered" }, { "list": "bullet" }],
              [{ "color": [] }, { "background": [] }],
              ["link", "image", "clean"]
            ],
            handlers: {
              image: imageHandler
            }
          }
        }
      });
      quill.root.innerHTML = props.modelValue;
      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        emit("update:modelValue", html === "<p><br></p>" ? "" : html);
      });
    }
    function imageHandler() {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.onchange = async () => {
        const file = input.files[0];
        if (file) {
          const formData = new FormData();
          formData.append("image", file);
          try {
            const response = await window.axios.post("/marketing/upload-image", formData, {
              headers: { "Content-Type": "multipart/form-data" }
            });
            const range = quill.getSelection();
            quill.insertEmbed(range.index, "image", response.data.url);
          } catch (error) {
            console.error("Image upload failed:", error);
            alert("Gagal mengunggah gambar. Pastikan format benar dan ukuran tidak terlalu besar.");
          }
        }
      };
    }
    watch(() => props.modelValue, (newVal) => {
      if (quill && newVal !== quill.root.innerHTML) {
        quill.root.innerHTML = newVal || "";
      }
    });
    onBeforeUnmount(() => {
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rich-text-editor shadow-sm rounded" }, _attrs))}><div style="${ssrRenderStyle({ "min-height": "250px" })}"></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/RichTextEditor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "MarketingCms",
  __ssrInlineRender: true,
  props: {
    stats: Array,
    articles: Array,
    members: Array,
    departments: Array,
    notif: Object
  },
  setup(__props) {
    const modalRef = ref(null);
    const modalConfirmationRef = ref(null);
    const activeType = ref("article");
    const isEdit = ref(false);
    const currentItem = ref(null);
    let bootstrapModal = null;
    const formArticle = useForm({
      title: "",
      description: "",
      image_path: null,
      category: "",
      date: (/* @__PURE__ */ new Date()).toISOString().substr(0, 10),
      is_published: true,
      gallery: null
    });
    const formMember = useForm({
      name: "",
      role_title: "",
      department_name: "",
      image_path: null,
      order_num: 1,
      is_executive: false
    });
    const activeTabLabel = computed(() => {
      if (activeType.value === "article") return "Article";
      if (activeType.value === "member") return "Member";
      return "";
    });
    const isLoading = computed(() => {
      return formArticle.processing || formMember.processing;
    });
    onMounted(() => {
      if (typeof window.bootstrap !== "undefined") {
        bootstrapModal = new window.bootstrap.Modal(modalRef.value);
      }
    });
    function getModalIcon() {
      if (activeType.value === "article") return "bi-newspaper";
      if (activeType.value === "member") return "bi-person-badge";
      return "";
    }
    function openModal(type) {
      activeType.value = type;
      isEdit.value = false;
      currentItem.value = null;
      if (type === "article") formArticle.reset();
      else if (type === "member") formMember.reset();
      if (bootstrapModal) bootstrapModal.show();
    }
    function editItem(type, item) {
      activeType.value = type;
      isEdit.value = true;
      currentItem.value = item;
      if (type === "article") {
        formArticle.title = item.title;
        formArticle.description = item.description;
        formArticle.category = item.category;
        formArticle.date = item.date;
        formArticle.is_published = !!item.is_published;
        formArticle.image_path = null;
      } else if (type === "member") {
        formMember.name = item.name;
        formMember.role_title = item.role_title;
        formMember.department_name = item.department_name;
        formMember.order_num = item.order_num;
        formMember.is_executive = !!item.is_executive;
        formMember.image_path = null;
      }
      if (bootstrapModal) bootstrapModal.show();
    }
    function submit() {
      let url = "";
      let form = null;
      if (activeType.value === "article") {
        form = formArticle;
        url = isEdit.value ? `/seeo/marketing/activities/${currentItem.value.id}` : `/seeo/marketing/activities`;
      } else if (activeType.value === "member") {
        form = formMember;
        url = isEdit.value ? `/seeo/marketing/structures/${currentItem.value.id}` : `/seeo/marketing/structures`;
      }
      const options = {
        onSuccess: () => {
          if (bootstrapModal) bootstrapModal.hide();
        },
        forceFormData: true
      };
      if (isEdit.value) {
        router.post(url, {
          ...form.data(),
          _method: "PUT"
        }, options);
      } else {
        form.post(url, options);
      }
    }
    function deleteItem(type, id) {
      let url = "";
      let label = "";
      if (type === "article") {
        url = `/seeo/marketing/activities/${id}`;
        label = "Article";
      } else if (type === "member") {
        url = `/seeo/marketing/structures/${id}`;
        label = "Member";
      }
      modalConfirmationRef.value.showModal(url, `Hapus ${label} ini?`, "DELETE");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(StaffLayout, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Marketing CMS Panel`);
          } else {
            return [
              createTextVNode("Marketing CMS Panel")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="container-fluid p-4" data-v-468477f5${_scopeId}>`);
            if (__props.notif) {
              _push2(ssrRenderComponent(_sfc_main$2, { notif: __props.notif }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<ul class="nav nav-pills mb-4 bg-white p-2 rounded shadow-sm d-inline-flex border" id="pills-tab" role="tablist" data-v-468477f5${_scopeId}><li class="nav-item" role="presentation" data-v-468477f5${_scopeId}><button class="nav-link active fw-medium px-4" id="pills-articles-tab" data-bs-toggle="pill" data-bs-target="#pills-articles" type="button" role="tab" data-v-468477f5${_scopeId}><i class="bi bi-newspaper me-2" data-v-468477f5${_scopeId}></i>Articles </button></li><li class="nav-item" role="presentation" data-v-468477f5${_scopeId}><button class="nav-link fw-medium px-4" id="pills-members-tab" data-bs-toggle="pill" data-bs-target="#pills-members" type="button" role="tab" data-v-468477f5${_scopeId}><i class="bi bi-people me-2" data-v-468477f5${_scopeId}></i>Members </button></li></ul><div class="tab-content" id="pills-tabContent" data-v-468477f5${_scopeId}><div class="tab-pane fade show active" id="pills-articles" role="tabpanel" data-v-468477f5${_scopeId}><div class="card shadow-sm border-0" data-v-468477f5${_scopeId}><div class="card-header bg-white py-3 d-flex justify-content-between align-items-center" data-v-468477f5${_scopeId}><h5 class="mb-0 fw-bold" data-v-468477f5${_scopeId}>Recent Articles &amp; News</h5><button class="btn btn-primary btn-sm px-3" data-v-468477f5${_scopeId}><i class="bi bi-plus-lg me-1" data-v-468477f5${_scopeId}></i> New Article </button></div><div class="table-responsive" data-v-468477f5${_scopeId}><table class="table align-middle mb-0 table-hover" data-v-468477f5${_scopeId}><thead class="table-light" data-v-468477f5${_scopeId}><tr data-v-468477f5${_scopeId}><th data-v-468477f5${_scopeId}>Image</th><th data-v-468477f5${_scopeId}>Title &amp; Slug</th><th data-v-468477f5${_scopeId}>Category</th><th data-v-468477f5${_scopeId}>Status</th><th class="text-center" data-v-468477f5${_scopeId}>Actions</th></tr></thead><tbody data-v-468477f5${_scopeId}><!--[-->`);
            ssrRenderList(__props.articles, (article) => {
              _push2(`<tr data-v-468477f5${_scopeId}><td style="${ssrRenderStyle({ "width": "80px" })}" data-v-468477f5${_scopeId}>`);
              if (article.image_url) {
                _push2(`<img${ssrRenderAttr("src", article.image_url)} class="rounded shadow-sm" style="${ssrRenderStyle({ "width": "60px", "height": "40px", "object-fit": "cover" })}" data-v-468477f5${_scopeId}>`);
              } else {
                _push2(`<div class="rounded bg-light d-flex align-items-center justify-content-center text-muted" style="${ssrRenderStyle({ "width": "60px", "height": "40px" })}" data-v-468477f5${_scopeId}><i class="bi bi-image" data-v-468477f5${_scopeId}></i></div>`);
              }
              _push2(`</td><td data-v-468477f5${_scopeId}><div class="fw-bold" data-v-468477f5${_scopeId}>${ssrInterpolate(article.title)}</div><div class="small text-muted" data-v-468477f5${_scopeId}>${ssrInterpolate(article.slug)}</div></td><td data-v-468477f5${_scopeId}><span class="badge bg-secondary-subtle text-secondary px-2 border" data-v-468477f5${_scopeId}>${ssrInterpolate(article.category || "General")}</span></td><td data-v-468477f5${_scopeId}>`);
              if (article.is_published) {
                _push2(`<span class="badge bg-success-subtle text-success" data-v-468477f5${_scopeId}>Published</span>`);
              } else {
                _push2(`<span class="badge bg-warning-subtle text-warning text-dark" data-v-468477f5${_scopeId}>Draft</span>`);
              }
              _push2(`</td><td class="text-center" data-v-468477f5${_scopeId}><div class="btn-group" data-v-468477f5${_scopeId}><button class="btn btn-sm btn-light border text-primary" title="Edit" data-v-468477f5${_scopeId}><i class="bi bi-pencil" data-v-468477f5${_scopeId}></i></button><button class="btn btn-sm btn-light border text-danger" title="Delete" data-v-468477f5${_scopeId}><i class="bi bi-trash" data-v-468477f5${_scopeId}></i></button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.articles.length === 0) {
              _push2(`<tr data-v-468477f5${_scopeId}><td colspan="5" class="text-center py-5 text-muted small italic" data-v-468477f5${_scopeId}>No articles found. Write your first story!</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div><div class="tab-pane fade" id="pills-members" role="tabpanel" data-v-468477f5${_scopeId}><div class="card shadow-sm border-0" data-v-468477f5${_scopeId}><div class="card-header bg-white py-3 d-flex justify-content-between align-items-center" data-v-468477f5${_scopeId}><h5 class="mb-0 fw-bold" data-v-468477f5${_scopeId}>Staff &amp; Member Structure</h5><button class="btn btn-primary btn-sm px-3" data-v-468477f5${_scopeId}><i class="bi bi-person-plus me-1" data-v-468477f5${_scopeId}></i> Add Member </button></div><div class="table-responsive" data-v-468477f5${_scopeId}><table class="table align-middle mb-0 table-hover" data-v-468477f5${_scopeId}><thead class="table-light" data-v-468477f5${_scopeId}><tr data-v-468477f5${_scopeId}><th data-v-468477f5${_scopeId}>Photo</th><th data-v-468477f5${_scopeId}>Name &amp; Role</th><th data-v-468477f5${_scopeId}>Department</th><th data-v-468477f5${_scopeId}>Priority</th><th class="text-center" data-v-468477f5${_scopeId}>Actions</th></tr></thead><tbody data-v-468477f5${_scopeId}><!--[-->`);
            ssrRenderList(__props.members, (member) => {
              _push2(`<tr data-v-468477f5${_scopeId}><td style="${ssrRenderStyle({ "width": "80px" })}" data-v-468477f5${_scopeId}>`);
              if (member.image_url) {
                _push2(`<img${ssrRenderAttr("src", member.image_url)} class="rounded-circle shadow-sm" style="${ssrRenderStyle({ "width": "45px", "height": "45px", "object-fit": "cover" })}" data-v-468477f5${_scopeId}>`);
              } else {
                _push2(`<div class="rounded-circle bg-light d-flex align-items-center justify-content-center text-muted" style="${ssrRenderStyle({ "width": "45px", "height": "45px" })}" data-v-468477f5${_scopeId}><i class="bi bi-person" data-v-468477f5${_scopeId}></i></div>`);
              }
              _push2(`</td><td data-v-468477f5${_scopeId}><div class="fw-bold" data-v-468477f5${_scopeId}>${ssrInterpolate(member.name)}</div><div class="small text-muted" data-v-468477f5${_scopeId}>${ssrInterpolate(member.role_title)}</div></td><td data-v-468477f5${_scopeId}>${ssrInterpolate(member.department_name)}</td><td data-v-468477f5${_scopeId}><span class="badge bg-light text-dark border" data-v-468477f5${_scopeId}>${ssrInterpolate(member.order_num)}</span></td><td class="text-center" data-v-468477f5${_scopeId}><div class="btn-group" data-v-468477f5${_scopeId}><button class="btn btn-sm btn-light border text-primary" title="Edit" data-v-468477f5${_scopeId}><i class="bi bi-pencil" data-v-468477f5${_scopeId}></i></button><button class="btn btn-sm btn-light border text-danger" title="Delete" data-v-468477f5${_scopeId}><i class="bi bi-trash" data-v-468477f5${_scopeId}></i></button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.members.length === 0) {
              _push2(`<tr data-v-468477f5${_scopeId}><td colspan="5" class="text-center py-5 text-muted small italic" data-v-468477f5${_scopeId}>No organizational structure defined yet.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div></div></div><div class="modal fade shadow-lg" id="cmsModal" tabindex="-1" data-v-468477f5${_scopeId}><div class="modal-dialog modal-lg modal-dialog-centered" data-v-468477f5${_scopeId}><div class="modal-content border-0" data-v-468477f5${_scopeId}><div class="modal-header bg-primary text-white" data-v-468477f5${_scopeId}><h5 class="modal-title fw-bold" data-v-468477f5${_scopeId}><i class="${ssrRenderClass([getModalIcon(), "me-2"])}" data-v-468477f5${_scopeId}></i> ${ssrInterpolate(isEdit.value ? "Edit" : "Add New")} ${ssrInterpolate(activeTabLabel.value)}</h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" data-v-468477f5${_scopeId}></button></div><form data-v-468477f5${_scopeId}><div class="modal-body p-4" data-v-468477f5${_scopeId}>`);
            if (activeType.value === "article") {
              _push2(`<!--[--><div class="mb-3" data-v-468477f5${_scopeId}><label class="form-label fw-semibold small" data-v-468477f5${_scopeId}>Article Title</label><input type="text"${ssrRenderAttr("value", unref(formArticle).title)} class="form-control form-control-lg fw-bold" placeholder="Judul Artikel..." required data-v-468477f5${_scopeId}></div><div class="row mb-3" data-v-468477f5${_scopeId}><div class="col-md-6" data-v-468477f5${_scopeId}><label class="form-label fw-semibold small" data-v-468477f5${_scopeId}>Category</label><input type="text"${ssrRenderAttr("value", unref(formArticle).category)} class="form-control" placeholder="e.g. News, Event" data-v-468477f5${_scopeId}></div><div class="col-md-6" data-v-468477f5${_scopeId}><label class="form-label fw-semibold small" data-v-468477f5${_scopeId}>Date</label><input type="date"${ssrRenderAttr("value", unref(formArticle).date)} class="form-control" data-v-468477f5${_scopeId}></div></div><div class="mb-3" data-v-468477f5${_scopeId}><label class="form-label fw-semibold small" data-v-468477f5${_scopeId}>Content / Description</label>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                modelValue: unref(formArticle).description,
                "onUpdate:modelValue": ($event) => unref(formArticle).description = $event,
                placeholder: "Tulis konten artikel di sini..."
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="row mb-3" data-v-468477f5${_scopeId}><div class="col-md-6" data-v-468477f5${_scopeId}><label class="form-label fw-semibold small" data-v-468477f5${_scopeId}>Cover Image</label><input type="file" class="form-control" data-v-468477f5${_scopeId}>`);
              if (isEdit.value && currentItem.value.image_url) {
                _push2(`<div class="mt-2 small text-muted italic" data-v-468477f5${_scopeId}>Current image: ${ssrInterpolate(currentItem.value.image_path)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="col-md-6" data-v-468477f5${_scopeId}><label class="form-label fw-semibold small" data-v-468477f5${_scopeId}>Gallery (Multiple Images)</label><input type="file" class="form-control" multiple data-v-468477f5${_scopeId}>`);
              if (isEdit.value && ((_a = currentItem.value.gallery_urls) == null ? void 0 : _a.length)) {
                _push2(`<div class="mt-2 d-flex gap-1 flex-wrap" data-v-468477f5${_scopeId}><!--[-->`);
                ssrRenderList(currentItem.value.gallery_urls, (url) => {
                  _push2(`<img${ssrRenderAttr("src", url)} class="rounded border" style="${ssrRenderStyle({ "width": "30px", "height": "30px", "object-fit": "cover" })}" data-v-468477f5${_scopeId}>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="form-check form-switch mt-3" data-v-468477f5${_scopeId}><input class="form-check-input" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(formArticle).is_published) ? ssrLooseContain(unref(formArticle).is_published, null) : unref(formArticle).is_published) ? " checked" : ""} id="isPublished" data-v-468477f5${_scopeId}><label class="form-check-label fw-semibold" for="isPublished" data-v-468477f5${_scopeId}>Publish Article</label></div><!--]-->`);
            } else if (activeType.value === "member") {
              _push2(`<!--[--><div class="row mb-3" data-v-468477f5${_scopeId}><div class="col-md-6" data-v-468477f5${_scopeId}><label class="form-label fw-semibold small" data-v-468477f5${_scopeId}>Full Name</label><input type="text"${ssrRenderAttr("value", unref(formMember).name)} class="form-control" required data-v-468477f5${_scopeId}></div><div class="col-md-6" data-v-468477f5${_scopeId}><label class="form-label fw-semibold small" data-v-468477f5${_scopeId}>Role Title</label><input type="text"${ssrRenderAttr("value", unref(formMember).role_title)} class="form-control" placeholder="e.g. Manager Marketing" required data-v-468477f5${_scopeId}></div></div><div class="row mb-3" data-v-468477f5${_scopeId}><div class="col-md-6" data-v-468477f5${_scopeId}><label class="form-label fw-semibold small" data-v-468477f5${_scopeId}>Department</label><select class="form-select" required data-v-468477f5${_scopeId}><option value="" data-v-468477f5${ssrIncludeBooleanAttr(Array.isArray(unref(formMember).department_name) ? ssrLooseContain(unref(formMember).department_name, "") : ssrLooseEqual(unref(formMember).department_name, "")) ? " selected" : ""}${_scopeId}>Select Department</option><!--[-->`);
              ssrRenderList(__props.departments, (dept) => {
                _push2(`<option${ssrRenderAttr("value", dept.name)} data-v-468477f5${ssrIncludeBooleanAttr(Array.isArray(unref(formMember).department_name) ? ssrLooseContain(unref(formMember).department_name, dept.name) : ssrLooseEqual(unref(formMember).department_name, dept.name)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(dept.name)}</option>`);
              });
              _push2(`<!--]--><option value="Non-Departmental" data-v-468477f5${ssrIncludeBooleanAttr(Array.isArray(unref(formMember).department_name) ? ssrLooseContain(unref(formMember).department_name, "Non-Departmental") : ssrLooseEqual(unref(formMember).department_name, "Non-Departmental")) ? " selected" : ""}${_scopeId}>Non-Departmental / Executive</option></select></div><div class="col-md-6" data-v-468477f5${_scopeId}><label class="form-label fw-semibold small" data-v-468477f5${_scopeId}>Order (Display Priority)</label><input type="number"${ssrRenderAttr("value", unref(formMember).order_num)} class="form-control" data-v-468477f5${_scopeId}></div></div><div class="mb-3" data-v-468477f5${_scopeId}><label class="form-label fw-semibold small" data-v-468477f5${_scopeId}>Photo</label><input type="file" class="form-control" data-v-468477f5${_scopeId}></div><div class="form-check form-switch mt-3" data-v-468477f5${_scopeId}><input class="form-check-input" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(formMember).is_executive) ? ssrLooseContain(unref(formMember).is_executive, null) : unref(formMember).is_executive) ? " checked" : ""} id="isExecutive" data-v-468477f5${_scopeId}><label class="form-check-label fw-semibold" for="isExecutive" data-v-468477f5${_scopeId}>Executive Member (Top Level)</label></div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="modal-footer bg-light p-3" data-v-468477f5${_scopeId}><button type="button" class="btn btn-light px-4" data-bs-dismiss="modal" data-v-468477f5${_scopeId}>Cancel</button><button type="submit" class="btn btn-primary px-5 shadow-sm"${ssrIncludeBooleanAttr(unref(formArticle).processing || unref(formMember).processing) ? " disabled" : ""} data-v-468477f5${_scopeId}>`);
            if (isLoading.value) {
              _push2(`<span class="spinner-border spinner-border-sm me-2" data-v-468477f5${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(isEdit.value ? "Save Changes" : "Create Now")}</button></div></form></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "container-fluid p-4" }, [
                __props.notif ? (openBlock(), createBlock(_sfc_main$2, {
                  key: 0,
                  notif: __props.notif
                }, null, 8, ["notif"])) : createCommentVNode("", true),
                createVNode("ul", {
                  class: "nav nav-pills mb-4 bg-white p-2 rounded shadow-sm d-inline-flex border",
                  id: "pills-tab",
                  role: "tablist"
                }, [
                  createVNode("li", {
                    class: "nav-item",
                    role: "presentation"
                  }, [
                    createVNode("button", {
                      class: "nav-link active fw-medium px-4",
                      id: "pills-articles-tab",
                      "data-bs-toggle": "pill",
                      "data-bs-target": "#pills-articles",
                      type: "button",
                      role: "tab"
                    }, [
                      createVNode("i", { class: "bi bi-newspaper me-2" }),
                      createTextVNode("Articles ")
                    ])
                  ]),
                  createVNode("li", {
                    class: "nav-item",
                    role: "presentation"
                  }, [
                    createVNode("button", {
                      class: "nav-link fw-medium px-4",
                      id: "pills-members-tab",
                      "data-bs-toggle": "pill",
                      "data-bs-target": "#pills-members",
                      type: "button",
                      role: "tab"
                    }, [
                      createVNode("i", { class: "bi bi-people me-2" }),
                      createTextVNode("Members ")
                    ])
                  ])
                ]),
                createVNode("div", {
                  class: "tab-content",
                  id: "pills-tabContent"
                }, [
                  createVNode("div", {
                    class: "tab-pane fade show active",
                    id: "pills-articles",
                    role: "tabpanel"
                  }, [
                    createVNode("div", { class: "card shadow-sm border-0" }, [
                      createVNode("div", { class: "card-header bg-white py-3 d-flex justify-content-between align-items-center" }, [
                        createVNode("h5", { class: "mb-0 fw-bold" }, "Recent Articles & News"),
                        createVNode("button", {
                          class: "btn btn-primary btn-sm px-3",
                          onClick: ($event) => openModal("article")
                        }, [
                          createVNode("i", { class: "bi bi-plus-lg me-1" }),
                          createTextVNode(" New Article ")
                        ], 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "table-responsive" }, [
                        createVNode("table", { class: "table align-middle mb-0 table-hover" }, [
                          createVNode("thead", { class: "table-light" }, [
                            createVNode("tr", null, [
                              createVNode("th", null, "Image"),
                              createVNode("th", null, "Title & Slug"),
                              createVNode("th", null, "Category"),
                              createVNode("th", null, "Status"),
                              createVNode("th", { class: "text-center" }, "Actions")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.articles, (article) => {
                              return openBlock(), createBlock("tr", {
                                key: article.id
                              }, [
                                createVNode("td", { style: { "width": "80px" } }, [
                                  article.image_url ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: article.image_url,
                                    class: "rounded shadow-sm",
                                    style: { "width": "60px", "height": "40px", "object-fit": "cover" }
                                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "rounded bg-light d-flex align-items-center justify-content-center text-muted",
                                    style: { "width": "60px", "height": "40px" }
                                  }, [
                                    createVNode("i", { class: "bi bi-image" })
                                  ]))
                                ]),
                                createVNode("td", null, [
                                  createVNode("div", { class: "fw-bold" }, toDisplayString(article.title), 1),
                                  createVNode("div", { class: "small text-muted" }, toDisplayString(article.slug), 1)
                                ]),
                                createVNode("td", null, [
                                  createVNode("span", { class: "badge bg-secondary-subtle text-secondary px-2 border" }, toDisplayString(article.category || "General"), 1)
                                ]),
                                createVNode("td", null, [
                                  article.is_published ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "badge bg-success-subtle text-success"
                                  }, "Published")) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "badge bg-warning-subtle text-warning text-dark"
                                  }, "Draft"))
                                ]),
                                createVNode("td", { class: "text-center" }, [
                                  createVNode("div", { class: "btn-group" }, [
                                    createVNode("button", {
                                      onClick: ($event) => editItem("article", article),
                                      class: "btn btn-sm btn-light border text-primary",
                                      title: "Edit"
                                    }, [
                                      createVNode("i", { class: "bi bi-pencil" })
                                    ], 8, ["onClick"]),
                                    createVNode("button", {
                                      onClick: ($event) => deleteItem("article", article.id),
                                      class: "btn btn-sm btn-light border text-danger",
                                      title: "Delete"
                                    }, [
                                      createVNode("i", { class: "bi bi-trash" })
                                    ], 8, ["onClick"])
                                  ])
                                ])
                              ]);
                            }), 128)),
                            __props.articles.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "5",
                                class: "text-center py-5 text-muted small italic"
                              }, "No articles found. Write your first story!")
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", {
                    class: "tab-pane fade",
                    id: "pills-members",
                    role: "tabpanel"
                  }, [
                    createVNode("div", { class: "card shadow-sm border-0" }, [
                      createVNode("div", { class: "card-header bg-white py-3 d-flex justify-content-between align-items-center" }, [
                        createVNode("h5", { class: "mb-0 fw-bold" }, "Staff & Member Structure"),
                        createVNode("button", {
                          class: "btn btn-primary btn-sm px-3",
                          onClick: ($event) => openModal("member")
                        }, [
                          createVNode("i", { class: "bi bi-person-plus me-1" }),
                          createTextVNode(" Add Member ")
                        ], 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "table-responsive" }, [
                        createVNode("table", { class: "table align-middle mb-0 table-hover" }, [
                          createVNode("thead", { class: "table-light" }, [
                            createVNode("tr", null, [
                              createVNode("th", null, "Photo"),
                              createVNode("th", null, "Name & Role"),
                              createVNode("th", null, "Department"),
                              createVNode("th", null, "Priority"),
                              createVNode("th", { class: "text-center" }, "Actions")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.members, (member) => {
                              return openBlock(), createBlock("tr", {
                                key: member.id
                              }, [
                                createVNode("td", { style: { "width": "80px" } }, [
                                  member.image_url ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: member.image_url,
                                    class: "rounded-circle shadow-sm",
                                    style: { "width": "45px", "height": "45px", "object-fit": "cover" }
                                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "rounded-circle bg-light d-flex align-items-center justify-content-center text-muted",
                                    style: { "width": "45px", "height": "45px" }
                                  }, [
                                    createVNode("i", { class: "bi bi-person" })
                                  ]))
                                ]),
                                createVNode("td", null, [
                                  createVNode("div", { class: "fw-bold" }, toDisplayString(member.name), 1),
                                  createVNode("div", { class: "small text-muted" }, toDisplayString(member.role_title), 1)
                                ]),
                                createVNode("td", null, toDisplayString(member.department_name), 1),
                                createVNode("td", null, [
                                  createVNode("span", { class: "badge bg-light text-dark border" }, toDisplayString(member.order_num), 1)
                                ]),
                                createVNode("td", { class: "text-center" }, [
                                  createVNode("div", { class: "btn-group" }, [
                                    createVNode("button", {
                                      onClick: ($event) => editItem("member", member),
                                      class: "btn btn-sm btn-light border text-primary",
                                      title: "Edit"
                                    }, [
                                      createVNode("i", { class: "bi bi-pencil" })
                                    ], 8, ["onClick"]),
                                    createVNode("button", {
                                      onClick: ($event) => deleteItem("member", member.id),
                                      class: "btn btn-sm btn-light border text-danger",
                                      title: "Delete"
                                    }, [
                                      createVNode("i", { class: "bi bi-trash" })
                                    ], 8, ["onClick"])
                                  ])
                                ])
                              ]);
                            }), 128)),
                            __props.members.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "5",
                                class: "text-center py-5 text-muted small italic"
                              }, "No organizational structure defined yet.")
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal fade shadow-lg",
                id: "cmsModal",
                tabindex: "-1",
                ref_key: "modalRef",
                ref: modalRef
              }, [
                createVNode("div", { class: "modal-dialog modal-lg modal-dialog-centered" }, [
                  createVNode("div", { class: "modal-content border-0" }, [
                    createVNode("div", { class: "modal-header bg-primary text-white" }, [
                      createVNode("h5", { class: "modal-title fw-bold" }, [
                        createVNode("i", {
                          class: [getModalIcon(), "me-2"]
                        }, null, 2),
                        createTextVNode(" " + toDisplayString(isEdit.value ? "Edit" : "Add New") + " " + toDisplayString(activeTabLabel.value), 1)
                      ]),
                      createVNode("button", {
                        type: "button",
                        class: "btn-close btn-close-white",
                        "data-bs-dismiss": "modal"
                      })
                    ]),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("div", { class: "modal-body p-4" }, [
                        activeType.value === "article" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createVNode("div", { class: "mb-3" }, [
                            createVNode("label", { class: "form-label fw-semibold small" }, "Article Title"),
                            withDirectives(createVNode("input", {
                              type: "text",
                              "onUpdate:modelValue": ($event) => unref(formArticle).title = $event,
                              class: "form-control form-control-lg fw-bold",
                              placeholder: "Judul Artikel...",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(formArticle).title]
                            ])
                          ]),
                          createVNode("div", { class: "row mb-3" }, [
                            createVNode("div", { class: "col-md-6" }, [
                              createVNode("label", { class: "form-label fw-semibold small" }, "Category"),
                              withDirectives(createVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": ($event) => unref(formArticle).category = $event,
                                class: "form-control",
                                placeholder: "e.g. News, Event"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(formArticle).category]
                              ])
                            ]),
                            createVNode("div", { class: "col-md-6" }, [
                              createVNode("label", { class: "form-label fw-semibold small" }, "Date"),
                              withDirectives(createVNode("input", {
                                type: "date",
                                "onUpdate:modelValue": ($event) => unref(formArticle).date = $event,
                                class: "form-control"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(formArticle).date]
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "mb-3" }, [
                            createVNode("label", { class: "form-label fw-semibold small" }, "Content / Description"),
                            createVNode(_sfc_main$1, {
                              modelValue: unref(formArticle).description,
                              "onUpdate:modelValue": ($event) => unref(formArticle).description = $event,
                              placeholder: "Tulis konten artikel di sini..."
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "row mb-3" }, [
                            createVNode("div", { class: "col-md-6" }, [
                              createVNode("label", { class: "form-label fw-semibold small" }, "Cover Image"),
                              createVNode("input", {
                                type: "file",
                                onInput: ($event) => unref(formArticle).image_path = $event.target.files[0],
                                class: "form-control"
                              }, null, 40, ["onInput"]),
                              isEdit.value && currentItem.value.image_url ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 small text-muted italic"
                              }, "Current image: " + toDisplayString(currentItem.value.image_path), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "col-md-6" }, [
                              createVNode("label", { class: "form-label fw-semibold small" }, "Gallery (Multiple Images)"),
                              createVNode("input", {
                                type: "file",
                                onInput: ($event) => unref(formArticle).gallery = $event.target.files,
                                class: "form-control",
                                multiple: ""
                              }, null, 40, ["onInput"]),
                              isEdit.value && ((_b = currentItem.value.gallery_urls) == null ? void 0 : _b.length) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 d-flex gap-1 flex-wrap"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(currentItem.value.gallery_urls, (url) => {
                                  return openBlock(), createBlock("img", {
                                    key: url,
                                    src: url,
                                    class: "rounded border",
                                    style: { "width": "30px", "height": "30px", "object-fit": "cover" }
                                  }, null, 8, ["src"]);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "form-check form-switch mt-3" }, [
                            withDirectives(createVNode("input", {
                              class: "form-check-input",
                              type: "checkbox",
                              "onUpdate:modelValue": ($event) => unref(formArticle).is_published = $event,
                              id: "isPublished"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(formArticle).is_published]
                            ]),
                            createVNode("label", {
                              class: "form-check-label fw-semibold",
                              for: "isPublished"
                            }, "Publish Article")
                          ])
                        ], 64)) : activeType.value === "member" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createVNode("div", { class: "row mb-3" }, [
                            createVNode("div", { class: "col-md-6" }, [
                              createVNode("label", { class: "form-label fw-semibold small" }, "Full Name"),
                              withDirectives(createVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": ($event) => unref(formMember).name = $event,
                                class: "form-control",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(formMember).name]
                              ])
                            ]),
                            createVNode("div", { class: "col-md-6" }, [
                              createVNode("label", { class: "form-label fw-semibold small" }, "Role Title"),
                              withDirectives(createVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": ($event) => unref(formMember).role_title = $event,
                                class: "form-control",
                                placeholder: "e.g. Manager Marketing",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(formMember).role_title]
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "row mb-3" }, [
                            createVNode("div", { class: "col-md-6" }, [
                              createVNode("label", { class: "form-label fw-semibold small" }, "Department"),
                              withDirectives(createVNode("select", {
                                "onUpdate:modelValue": ($event) => unref(formMember).department_name = $event,
                                class: "form-select",
                                required: ""
                              }, [
                                createVNode("option", { value: "" }, "Select Department"),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.departments, (dept) => {
                                  return openBlock(), createBlock("option", {
                                    key: dept.id,
                                    value: dept.name
                                  }, toDisplayString(dept.name), 9, ["value"]);
                                }), 128)),
                                createVNode("option", { value: "Non-Departmental" }, "Non-Departmental / Executive")
                              ], 8, ["onUpdate:modelValue"]), [
                                [vModelSelect, unref(formMember).department_name]
                              ])
                            ]),
                            createVNode("div", { class: "col-md-6" }, [
                              createVNode("label", { class: "form-label fw-semibold small" }, "Order (Display Priority)"),
                              withDirectives(createVNode("input", {
                                type: "number",
                                "onUpdate:modelValue": ($event) => unref(formMember).order_num = $event,
                                class: "form-control"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(formMember).order_num]
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "mb-3" }, [
                            createVNode("label", { class: "form-label fw-semibold small" }, "Photo"),
                            createVNode("input", {
                              type: "file",
                              onInput: ($event) => unref(formMember).image_path = $event.target.files[0],
                              class: "form-control"
                            }, null, 40, ["onInput"])
                          ]),
                          createVNode("div", { class: "form-check form-switch mt-3" }, [
                            withDirectives(createVNode("input", {
                              class: "form-check-input",
                              type: "checkbox",
                              "onUpdate:modelValue": ($event) => unref(formMember).is_executive = $event,
                              id: "isExecutive"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(formMember).is_executive]
                            ]),
                            createVNode("label", {
                              class: "form-check-label fw-semibold",
                              for: "isExecutive"
                            }, "Executive Member (Top Level)")
                          ])
                        ], 64)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "modal-footer bg-light p-3" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-light px-4",
                          "data-bs-dismiss": "modal"
                        }, "Cancel"),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary px-5 shadow-sm",
                          disabled: unref(formArticle).processing || unref(formMember).processing
                        }, [
                          isLoading.value ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "spinner-border spinner-border-sm me-2"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(isEdit.value ? "Save Changes" : "Create Now"), 1)
                        ], 8, ["disabled"])
                      ])
                    ], 32)
                  ])
                ])
              ], 512),
              createVNode(_sfc_main$3, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Marketing/MarketingCms.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MarketingCms = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-468477f5"]]);
export {
  MarketingCms as default
};
//# sourceMappingURL=MarketingCms-DV-hDBRm.js.map
