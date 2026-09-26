import { ref, onMounted, watch, onBeforeUnmount, mergeProps, useSSRContext, computed, withCtx, unref, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, withModifiers, withDirectives, vModelText, vModelCheckbox, vModelSelect } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-oB6sdmCc.js";
import { _ as _sfc_main$2 } from "./Notif-Zffab37M.js";
import { _ as _sfc_main$3 } from "./InputError-DkffFxkw.js";
import { _ as _sfc_main$4 } from "./ModalConfirmation-CzGDjmDO.js";
import { useForm } from "@inertiajs/vue3";
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
          if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            alert("Gunakan gambar JPG, PNG, atau WEBP.");
            return;
          }
          if (file.size > 5 * 1024 * 1024) {
            alert("Ukuran gambar maksimal 5 MB.");
            return;
          }
          const formData = new FormData();
          formData.append("image", file);
          try {
            const response = await window.axios.post(window.route("marketing.upload.image"), formData, {
              headers: { "Content-Type": "multipart/form-data" }
            });
            const range = quill.getSelection(true) || { index: quill.getLength() };
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
    const props = __props;
    const route = (name, params = {}) => window.route(name, params);
    const modalRef = ref(null);
    const modalConfirmationRef = ref(null);
    const notifRef = ref(null);
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
      if (activeType.value === "article") return "Berita / Kegiatan";
      if (activeType.value === "member") return "Anggota Struktur";
      return "";
    });
    const isLoading = computed(() => {
      return formArticle.processing || formMember.processing;
    });
    onMounted(() => {
      var _a;
      if (typeof window.bootstrap !== "undefined") {
        bootstrapModal = new window.bootstrap.Modal(modalRef.value);
      }
      if (props.notif) {
        (_a = notifRef.value) == null ? void 0 : _a.showToast(props.notif.type, props.notif.message);
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
      if (type === "article") {
        formArticle.reset();
        formArticle.clearErrors();
      } else if (type === "member") {
        formMember.reset();
        formMember.clearErrors();
      }
      if (bootstrapModal) bootstrapModal.show();
    }
    function editItem(type, item) {
      var _a;
      activeType.value = type;
      isEdit.value = true;
      currentItem.value = item;
      if (type === "article") {
        formArticle.reset();
        formArticle.clearErrors();
        formArticle.title = item.title;
        formArticle.description = item.description;
        formArticle.category = item.category;
        formArticle.date = ((_a = item.date) == null ? void 0 : _a.slice(0, 10)) || "";
        formArticle.is_published = !!item.is_published;
        formArticle.image_path = null;
      } else if (type === "member") {
        formMember.reset();
        formMember.clearErrors();
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
        url = isEdit.value ? route("marketing.activities.update", currentItem.value.id) : route("marketing.activities.store");
      } else if (activeType.value === "member") {
        form = formMember;
        url = isEdit.value ? route("marketing.structures.update", currentItem.value.id) : route("marketing.structures.store");
      }
      const options = {
        onSuccess: () => {
          if (bootstrapModal) bootstrapModal.hide();
        },
        forceFormData: true
      };
      form.post(url, options);
    }
    function deleteItem(type, id) {
      let url = "";
      let label = "";
      if (type === "article") {
        url = route("marketing.activities.destroy", id);
        label = "berita/kegiatan";
      } else if (type === "member") {
        url = route("marketing.structures.destroy", id);
        label = "anggota struktur";
      }
      modalConfirmationRef.value.showModal(url, `Hapus ${label} ini? Data yang dihapus tidak dapat dikembalikan.`, "DELETE");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(StaffLayout, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Panel Konten Marketing`);
          } else {
            return [
              createTextVNode("Panel Konten Marketing")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="container-fluid p-4" data-v-b41b6eb6${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "notifRef",
              ref: notifRef
            }, null, _parent2, _scopeId));
            _push2(`<ul class="nav nav-pills mb-4 bg-white p-2 rounded shadow-sm d-inline-flex border" id="pills-tab" role="tablist" data-v-b41b6eb6${_scopeId}><li class="nav-item" role="presentation" data-v-b41b6eb6${_scopeId}><button class="nav-link active fw-medium px-4" id="pills-articles-tab" data-bs-toggle="pill" data-bs-target="#pills-articles" type="button" role="tab" data-v-b41b6eb6${_scopeId}><i class="bi bi-newspaper me-2" data-v-b41b6eb6${_scopeId}></i>Berita &amp; Kegiatan </button></li><li class="nav-item" role="presentation" data-v-b41b6eb6${_scopeId}><button class="nav-link fw-medium px-4" id="pills-members-tab" data-bs-toggle="pill" data-bs-target="#pills-members" type="button" role="tab" data-v-b41b6eb6${_scopeId}><i class="bi bi-people me-2" data-v-b41b6eb6${_scopeId}></i>Struktur Organisasi </button></li></ul><div class="tab-content" id="pills-tabContent" data-v-b41b6eb6${_scopeId}><div class="tab-pane fade show active" id="pills-articles" role="tabpanel" data-v-b41b6eb6${_scopeId}><div class="card shadow-sm border-0" data-v-b41b6eb6${_scopeId}><div class="card-header bg-white py-3 d-flex justify-content-between align-items-center" data-v-b41b6eb6${_scopeId}><h5 class="mb-0 fw-bold" data-v-b41b6eb6${_scopeId}>Berita &amp; Kegiatan Terbaru</h5><button type="button" class="btn btn-primary btn-sm px-3" data-v-b41b6eb6${_scopeId}><i class="bi bi-plus-lg me-1" data-v-b41b6eb6${_scopeId}></i> Tambah Berita </button></div><div class="table-responsive" data-v-b41b6eb6${_scopeId}><table class="table align-middle mb-0 table-hover" data-v-b41b6eb6${_scopeId}><thead class="table-light" data-v-b41b6eb6${_scopeId}><tr data-v-b41b6eb6${_scopeId}><th data-v-b41b6eb6${_scopeId}>Gambar</th><th data-v-b41b6eb6${_scopeId}>Judul &amp; Slug</th><th data-v-b41b6eb6${_scopeId}>Kategori</th><th data-v-b41b6eb6${_scopeId}>Status</th><th class="text-center" data-v-b41b6eb6${_scopeId}>Aksi</th></tr></thead><tbody data-v-b41b6eb6${_scopeId}><!--[-->`);
            ssrRenderList(__props.articles, (article) => {
              _push2(`<tr data-v-b41b6eb6${_scopeId}><td style="${ssrRenderStyle({ "width": "80px" })}" data-v-b41b6eb6${_scopeId}>`);
              if (article.image_url) {
                _push2(`<img${ssrRenderAttr("src", article.image_url)} class="rounded shadow-sm" style="${ssrRenderStyle({ "width": "60px", "height": "40px", "object-fit": "cover" })}" data-v-b41b6eb6${_scopeId}>`);
              } else {
                _push2(`<div class="rounded bg-light d-flex align-items-center justify-content-center text-muted" style="${ssrRenderStyle({ "width": "60px", "height": "40px" })}" data-v-b41b6eb6${_scopeId}><i class="bi bi-image" data-v-b41b6eb6${_scopeId}></i></div>`);
              }
              _push2(`</td><td data-v-b41b6eb6${_scopeId}><div class="fw-bold" data-v-b41b6eb6${_scopeId}>${ssrInterpolate(article.title)}</div><div class="small text-muted" data-v-b41b6eb6${_scopeId}>${ssrInterpolate(article.slug)}</div></td><td data-v-b41b6eb6${_scopeId}><span class="badge bg-secondary-subtle text-secondary px-2 border" data-v-b41b6eb6${_scopeId}>${ssrInterpolate(article.category || "Umum")}</span></td><td data-v-b41b6eb6${_scopeId}>`);
              if (article.is_published) {
                _push2(`<span class="badge bg-success-subtle text-success" data-v-b41b6eb6${_scopeId}>Terbit</span>`);
              } else {
                _push2(`<span class="badge bg-warning-subtle text-warning text-dark" data-v-b41b6eb6${_scopeId}>Draft</span>`);
              }
              _push2(`</td><td class="text-center" data-v-b41b6eb6${_scopeId}><div class="btn-group" data-v-b41b6eb6${_scopeId}><button type="button" class="btn btn-sm btn-light border text-primary" title="Edit" data-v-b41b6eb6${_scopeId}><i class="bi bi-pencil" data-v-b41b6eb6${_scopeId}></i></button><button type="button" class="btn btn-sm btn-light border text-danger" title="Hapus" data-v-b41b6eb6${_scopeId}><i class="bi bi-trash" data-v-b41b6eb6${_scopeId}></i></button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.articles.length === 0) {
              _push2(`<tr data-v-b41b6eb6${_scopeId}><td colspan="5" class="text-center py-5 text-muted small italic" data-v-b41b6eb6${_scopeId}>Belum ada berita. Tambahkan berita pertama Anda.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div><div class="tab-pane fade" id="pills-members" role="tabpanel" data-v-b41b6eb6${_scopeId}><div class="card shadow-sm border-0" data-v-b41b6eb6${_scopeId}><div class="card-header bg-white py-3 d-flex justify-content-between align-items-center" data-v-b41b6eb6${_scopeId}><h5 class="mb-0 fw-bold" data-v-b41b6eb6${_scopeId}>Anggota Struktur Organisasi</h5><button type="button" class="btn btn-primary btn-sm px-3" data-v-b41b6eb6${_scopeId}><i class="bi bi-person-plus me-1" data-v-b41b6eb6${_scopeId}></i> Tambah Anggota </button></div><div class="table-responsive" data-v-b41b6eb6${_scopeId}><table class="table align-middle mb-0 table-hover" data-v-b41b6eb6${_scopeId}><thead class="table-light" data-v-b41b6eb6${_scopeId}><tr data-v-b41b6eb6${_scopeId}><th data-v-b41b6eb6${_scopeId}>Foto</th><th data-v-b41b6eb6${_scopeId}>Nama &amp; Jabatan</th><th data-v-b41b6eb6${_scopeId}>Departemen</th><th data-v-b41b6eb6${_scopeId}>Urutan</th><th class="text-center" data-v-b41b6eb6${_scopeId}>Aksi</th></tr></thead><tbody data-v-b41b6eb6${_scopeId}><!--[-->`);
            ssrRenderList(__props.members, (member) => {
              _push2(`<tr data-v-b41b6eb6${_scopeId}><td style="${ssrRenderStyle({ "width": "80px" })}" data-v-b41b6eb6${_scopeId}>`);
              if (member.image_url) {
                _push2(`<img${ssrRenderAttr("src", member.image_url)} class="rounded-circle shadow-sm" style="${ssrRenderStyle({ "width": "45px", "height": "45px", "object-fit": "cover" })}" data-v-b41b6eb6${_scopeId}>`);
              } else {
                _push2(`<div class="rounded-circle bg-light d-flex align-items-center justify-content-center text-muted" style="${ssrRenderStyle({ "width": "45px", "height": "45px" })}" data-v-b41b6eb6${_scopeId}><i class="bi bi-person" data-v-b41b6eb6${_scopeId}></i></div>`);
              }
              _push2(`</td><td data-v-b41b6eb6${_scopeId}><div class="fw-bold" data-v-b41b6eb6${_scopeId}>${ssrInterpolate(member.name)}</div><div class="small text-muted" data-v-b41b6eb6${_scopeId}>${ssrInterpolate(member.role_title)}</div></td><td data-v-b41b6eb6${_scopeId}>${ssrInterpolate(member.department_name)}</td><td data-v-b41b6eb6${_scopeId}><span class="badge bg-light text-dark border" data-v-b41b6eb6${_scopeId}>${ssrInterpolate(member.order_num)}</span></td><td class="text-center" data-v-b41b6eb6${_scopeId}><div class="btn-group" data-v-b41b6eb6${_scopeId}><button type="button" class="btn btn-sm btn-light border text-primary" title="Edit" data-v-b41b6eb6${_scopeId}><i class="bi bi-pencil" data-v-b41b6eb6${_scopeId}></i></button><button type="button" class="btn btn-sm btn-light border text-danger" title="Hapus" data-v-b41b6eb6${_scopeId}><i class="bi bi-trash" data-v-b41b6eb6${_scopeId}></i></button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.members.length === 0) {
              _push2(`<tr data-v-b41b6eb6${_scopeId}><td colspan="5" class="text-center py-5 text-muted small italic" data-v-b41b6eb6${_scopeId}>Belum ada anggota struktur organisasi.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div></div></div><div class="modal fade shadow-lg" id="cmsModal" tabindex="-1" data-v-b41b6eb6${_scopeId}><div class="modal-dialog modal-lg modal-dialog-centered" data-v-b41b6eb6${_scopeId}><div class="modal-content border-0" data-v-b41b6eb6${_scopeId}><div class="modal-header bg-primary text-white" data-v-b41b6eb6${_scopeId}><h5 class="modal-title fw-bold" data-v-b41b6eb6${_scopeId}><i class="${ssrRenderClass([getModalIcon(), "me-2"])}" data-v-b41b6eb6${_scopeId}></i> ${ssrInterpolate(isEdit.value ? "Edit" : "Tambah")} ${ssrInterpolate(activeTabLabel.value)}</h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" data-v-b41b6eb6${_scopeId}></button></div><form data-v-b41b6eb6${_scopeId}><div class="modal-body p-4" data-v-b41b6eb6${_scopeId}>`);
            if (activeType.value === "article") {
              _push2(`<!--[--><div class="mb-3" data-v-b41b6eb6${_scopeId}><label class="form-label fw-semibold small" data-v-b41b6eb6${_scopeId}>Judul <span class="text-danger" data-v-b41b6eb6${_scopeId}>*</span></label><input type="text"${ssrRenderAttr("value", unref(formArticle).title)} class="form-control form-control-lg fw-bold" placeholder="Judul Artikel..." required data-v-b41b6eb6${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                message: unref(formArticle).errors.title,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="row mb-3" data-v-b41b6eb6${_scopeId}><div class="col-md-6" data-v-b41b6eb6${_scopeId}><label class="form-label fw-semibold small" data-v-b41b6eb6${_scopeId}>Kategori</label><input type="text"${ssrRenderAttr("value", unref(formArticle).category)} class="form-control" placeholder="Contoh: Berita, Event" data-v-b41b6eb6${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                message: unref(formArticle).errors.category,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="col-md-6" data-v-b41b6eb6${_scopeId}><label class="form-label fw-semibold small" data-v-b41b6eb6${_scopeId}>Tanggal</label><input type="date"${ssrRenderAttr("value", unref(formArticle).date)} class="form-control" data-v-b41b6eb6${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                message: unref(formArticle).errors.date,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="mb-3" data-v-b41b6eb6${_scopeId}><label class="form-label fw-semibold small" data-v-b41b6eb6${_scopeId}>Isi / Deskripsi <span class="text-danger" data-v-b41b6eb6${_scopeId}>*</span></label>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                modelValue: unref(formArticle).description,
                "onUpdate:modelValue": ($event) => unref(formArticle).description = $event,
                placeholder: "Tulis konten artikel di sini..."
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$3, {
                message: unref(formArticle).errors.description,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="row mb-3" data-v-b41b6eb6${_scopeId}><div class="col-md-6" data-v-b41b6eb6${_scopeId}><label class="form-label fw-semibold small" data-v-b41b6eb6${_scopeId}>Gambar Sampul</label><input type="file" accept="image/jpeg,image/png,image/webp" class="form-control" data-v-b41b6eb6${_scopeId}><div class="form-text" data-v-b41b6eb6${_scopeId}>JPG, PNG, atau WEBP; maksimal 2 MB.</div>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                message: unref(formArticle).errors.image_path,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              if (isEdit.value && currentItem.value.image_url) {
                _push2(`<img${ssrRenderAttr("src", currentItem.value.image_url)} alt="Gambar saat ini" class="mt-2 rounded border object-fit-cover" style="${ssrRenderStyle({ "width": "100px", "height": "70px" })}" data-v-b41b6eb6${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="col-md-6" data-v-b41b6eb6${_scopeId}><label class="form-label fw-semibold small" data-v-b41b6eb6${_scopeId}>Galeri (maksimal 10 gambar)</label><input type="file" accept="image/jpeg,image/png,image/webp" class="form-control" multiple data-v-b41b6eb6${_scopeId}><div class="form-text" data-v-b41b6eb6${_scopeId}>Masing-masing gambar maksimal 2 MB.</div>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                message: unref(formArticle).errors.gallery,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              if (isEdit.value && ((_a = currentItem.value.gallery_urls) == null ? void 0 : _a.length)) {
                _push2(`<div class="mt-2 d-flex gap-1 flex-wrap" data-v-b41b6eb6${_scopeId}><!--[-->`);
                ssrRenderList(currentItem.value.gallery_urls, (url) => {
                  _push2(`<img${ssrRenderAttr("src", url)} class="rounded border" style="${ssrRenderStyle({ "width": "30px", "height": "30px", "object-fit": "cover" })}" data-v-b41b6eb6${_scopeId}>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="form-check form-switch mt-3" data-v-b41b6eb6${_scopeId}><input class="form-check-input" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(formArticle).is_published) ? ssrLooseContain(unref(formArticle).is_published, null) : unref(formArticle).is_published) ? " checked" : ""} id="isPublished" data-v-b41b6eb6${_scopeId}><label class="form-check-label fw-semibold" for="isPublished" data-v-b41b6eb6${_scopeId}>Langsung tampilkan di halaman publik</label></div><!--]-->`);
            } else if (activeType.value === "member") {
              _push2(`<!--[--><div class="row mb-3" data-v-b41b6eb6${_scopeId}><div class="col-md-6" data-v-b41b6eb6${_scopeId}><label class="form-label fw-semibold small" data-v-b41b6eb6${_scopeId}>Nama Lengkap <span class="text-danger" data-v-b41b6eb6${_scopeId}>*</span></label><input type="text"${ssrRenderAttr("value", unref(formMember).name)} class="form-control" required data-v-b41b6eb6${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                message: unref(formMember).errors.name,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="col-md-6" data-v-b41b6eb6${_scopeId}><label class="form-label fw-semibold small" data-v-b41b6eb6${_scopeId}>Jabatan <span class="text-danger" data-v-b41b6eb6${_scopeId}>*</span></label><input type="text"${ssrRenderAttr("value", unref(formMember).role_title)} class="form-control" placeholder="Contoh: Manajer Marketing" required data-v-b41b6eb6${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                message: unref(formMember).errors.role_title,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="row mb-3" data-v-b41b6eb6${_scopeId}><div class="col-md-6" data-v-b41b6eb6${_scopeId}><label class="form-label fw-semibold small" data-v-b41b6eb6${_scopeId}>Departemen</label><select class="form-select" data-v-b41b6eb6${_scopeId}><option value="" data-v-b41b6eb6${ssrIncludeBooleanAttr(Array.isArray(unref(formMember).department_name) ? ssrLooseContain(unref(formMember).department_name, "") : ssrLooseEqual(unref(formMember).department_name, "")) ? " selected" : ""}${_scopeId}>Pilih Departemen</option><!--[-->`);
              ssrRenderList(__props.departments, (dept) => {
                _push2(`<option${ssrRenderAttr("value", dept.name)} data-v-b41b6eb6${ssrIncludeBooleanAttr(Array.isArray(unref(formMember).department_name) ? ssrLooseContain(unref(formMember).department_name, dept.name) : ssrLooseEqual(unref(formMember).department_name, dept.name)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(dept.name)}</option>`);
              });
              _push2(`<!--]--><option value="Non-Departmental" data-v-b41b6eb6${ssrIncludeBooleanAttr(Array.isArray(unref(formMember).department_name) ? ssrLooseContain(unref(formMember).department_name, "Non-Departmental") : ssrLooseEqual(unref(formMember).department_name, "Non-Departmental")) ? " selected" : ""}${_scopeId}>Eksekutif / Tanpa Departemen</option></select>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                message: unref(formMember).errors.department_name,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="col-md-6" data-v-b41b6eb6${_scopeId}><label class="form-label fw-semibold small" data-v-b41b6eb6${_scopeId}>Urutan Tampil</label><input type="number" min="0"${ssrRenderAttr("value", unref(formMember).order_num)} class="form-control" data-v-b41b6eb6${_scopeId}><div class="form-text" data-v-b41b6eb6${_scopeId}>Angka kecil tampil lebih dahulu.</div>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                message: unref(formMember).errors.order_num,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="mb-3" data-v-b41b6eb6${_scopeId}><label class="form-label fw-semibold small" data-v-b41b6eb6${_scopeId}>Foto</label><input type="file" accept="image/jpeg,image/png,image/webp" class="form-control" data-v-b41b6eb6${_scopeId}><div class="form-text" data-v-b41b6eb6${_scopeId}>JPG, PNG, atau WEBP; maksimal 2 MB.</div>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                message: unref(formMember).errors.image_path,
                class: "mt-1"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="form-check form-switch mt-3" data-v-b41b6eb6${_scopeId}><input class="form-check-input" type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(formMember).is_executive) ? ssrLooseContain(unref(formMember).is_executive, null) : unref(formMember).is_executive) ? " checked" : ""} id="isExecutive" data-v-b41b6eb6${_scopeId}><label class="form-check-label fw-semibold" for="isExecutive" data-v-b41b6eb6${_scopeId}>Anggota eksekutif / pimpinan</label></div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="modal-footer bg-light p-3" data-v-b41b6eb6${_scopeId}><button type="button" class="btn btn-light px-4" data-bs-dismiss="modal" data-v-b41b6eb6${_scopeId}>Batal</button><button type="submit" class="btn btn-primary px-5 shadow-sm"${ssrIncludeBooleanAttr(unref(formArticle).processing || unref(formMember).processing) ? " disabled" : ""} data-v-b41b6eb6${_scopeId}>`);
            if (isLoading.value) {
              _push2(`<span class="spinner-border spinner-border-sm me-2" data-v-b41b6eb6${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(isLoading.value ? "Menyimpan..." : isEdit.value ? "Simpan Perubahan" : "Tambahkan")}</button></div></form></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "container-fluid p-4" }, [
                createVNode(_sfc_main$2, {
                  ref_key: "notifRef",
                  ref: notifRef
                }, null, 512),
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
                      createTextVNode("Berita & Kegiatan ")
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
                      createTextVNode("Struktur Organisasi ")
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
                        createVNode("h5", { class: "mb-0 fw-bold" }, "Berita & Kegiatan Terbaru"),
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-primary btn-sm px-3",
                          onClick: ($event) => openModal("article")
                        }, [
                          createVNode("i", { class: "bi bi-plus-lg me-1" }),
                          createTextVNode(" Tambah Berita ")
                        ], 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "table-responsive" }, [
                        createVNode("table", { class: "table align-middle mb-0 table-hover" }, [
                          createVNode("thead", { class: "table-light" }, [
                            createVNode("tr", null, [
                              createVNode("th", null, "Gambar"),
                              createVNode("th", null, "Judul & Slug"),
                              createVNode("th", null, "Kategori"),
                              createVNode("th", null, "Status"),
                              createVNode("th", { class: "text-center" }, "Aksi")
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
                                  createVNode("span", { class: "badge bg-secondary-subtle text-secondary px-2 border" }, toDisplayString(article.category || "Umum"), 1)
                                ]),
                                createVNode("td", null, [
                                  article.is_published ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "badge bg-success-subtle text-success"
                                  }, "Terbit")) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "badge bg-warning-subtle text-warning text-dark"
                                  }, "Draft"))
                                ]),
                                createVNode("td", { class: "text-center" }, [
                                  createVNode("div", { class: "btn-group" }, [
                                    createVNode("button", {
                                      type: "button",
                                      onClick: ($event) => editItem("article", article),
                                      class: "btn btn-sm btn-light border text-primary",
                                      title: "Edit"
                                    }, [
                                      createVNode("i", { class: "bi bi-pencil" })
                                    ], 8, ["onClick"]),
                                    createVNode("button", {
                                      type: "button",
                                      onClick: ($event) => deleteItem("article", article.id),
                                      class: "btn btn-sm btn-light border text-danger",
                                      title: "Hapus"
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
                              }, "Belum ada berita. Tambahkan berita pertama Anda.")
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
                        createVNode("h5", { class: "mb-0 fw-bold" }, "Anggota Struktur Organisasi"),
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-primary btn-sm px-3",
                          onClick: ($event) => openModal("member")
                        }, [
                          createVNode("i", { class: "bi bi-person-plus me-1" }),
                          createTextVNode(" Tambah Anggota ")
                        ], 8, ["onClick"])
                      ]),
                      createVNode("div", { class: "table-responsive" }, [
                        createVNode("table", { class: "table align-middle mb-0 table-hover" }, [
                          createVNode("thead", { class: "table-light" }, [
                            createVNode("tr", null, [
                              createVNode("th", null, "Foto"),
                              createVNode("th", null, "Nama & Jabatan"),
                              createVNode("th", null, "Departemen"),
                              createVNode("th", null, "Urutan"),
                              createVNode("th", { class: "text-center" }, "Aksi")
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
                                      type: "button",
                                      onClick: ($event) => editItem("member", member),
                                      class: "btn btn-sm btn-light border text-primary",
                                      title: "Edit"
                                    }, [
                                      createVNode("i", { class: "bi bi-pencil" })
                                    ], 8, ["onClick"]),
                                    createVNode("button", {
                                      type: "button",
                                      onClick: ($event) => deleteItem("member", member.id),
                                      class: "btn btn-sm btn-light border text-danger",
                                      title: "Hapus"
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
                              }, "Belum ada anggota struktur organisasi.")
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
                        createTextVNode(" " + toDisplayString(isEdit.value ? "Edit" : "Tambah") + " " + toDisplayString(activeTabLabel.value), 1)
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
                            createVNode("label", { class: "form-label fw-semibold small" }, [
                              createTextVNode("Judul "),
                              createVNode("span", { class: "text-danger" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              type: "text",
                              "onUpdate:modelValue": ($event) => unref(formArticle).title = $event,
                              class: "form-control form-control-lg fw-bold",
                              placeholder: "Judul Artikel...",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(formArticle).title]
                            ]),
                            createVNode(_sfc_main$3, {
                              message: unref(formArticle).errors.title,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "row mb-3" }, [
                            createVNode("div", { class: "col-md-6" }, [
                              createVNode("label", { class: "form-label fw-semibold small" }, "Kategori"),
                              withDirectives(createVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": ($event) => unref(formArticle).category = $event,
                                class: "form-control",
                                placeholder: "Contoh: Berita, Event"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(formArticle).category]
                              ]),
                              createVNode(_sfc_main$3, {
                                message: unref(formArticle).errors.category,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "col-md-6" }, [
                              createVNode("label", { class: "form-label fw-semibold small" }, "Tanggal"),
                              withDirectives(createVNode("input", {
                                type: "date",
                                "onUpdate:modelValue": ($event) => unref(formArticle).date = $event,
                                class: "form-control"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(formArticle).date]
                              ]),
                              createVNode(_sfc_main$3, {
                                message: unref(formArticle).errors.date,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ])
                          ]),
                          createVNode("div", { class: "mb-3" }, [
                            createVNode("label", { class: "form-label fw-semibold small" }, [
                              createTextVNode("Isi / Deskripsi "),
                              createVNode("span", { class: "text-danger" }, "*")
                            ]),
                            createVNode(_sfc_main$1, {
                              modelValue: unref(formArticle).description,
                              "onUpdate:modelValue": ($event) => unref(formArticle).description = $event,
                              placeholder: "Tulis konten artikel di sini..."
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_sfc_main$3, {
                              message: unref(formArticle).errors.description,
                              class: "mt-1"
                            }, null, 8, ["message"])
                          ]),
                          createVNode("div", { class: "row mb-3" }, [
                            createVNode("div", { class: "col-md-6" }, [
                              createVNode("label", { class: "form-label fw-semibold small" }, "Gambar Sampul"),
                              createVNode("input", {
                                type: "file",
                                accept: "image/jpeg,image/png,image/webp",
                                onInput: ($event) => unref(formArticle).image_path = $event.target.files[0],
                                class: "form-control"
                              }, null, 40, ["onInput"]),
                              createVNode("div", { class: "form-text" }, "JPG, PNG, atau WEBP; maksimal 2 MB."),
                              createVNode(_sfc_main$3, {
                                message: unref(formArticle).errors.image_path,
                                class: "mt-1"
                              }, null, 8, ["message"]),
                              isEdit.value && currentItem.value.image_url ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: currentItem.value.image_url,
                                alt: "Gambar saat ini",
                                class: "mt-2 rounded border object-fit-cover",
                                style: { "width": "100px", "height": "70px" }
                              }, null, 8, ["src"])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "col-md-6" }, [
                              createVNode("label", { class: "form-label fw-semibold small" }, "Galeri (maksimal 10 gambar)"),
                              createVNode("input", {
                                type: "file",
                                accept: "image/jpeg,image/png,image/webp",
                                onInput: ($event) => unref(formArticle).gallery = Array.from($event.target.files),
                                class: "form-control",
                                multiple: ""
                              }, null, 40, ["onInput"]),
                              createVNode("div", { class: "form-text" }, "Masing-masing gambar maksimal 2 MB."),
                              createVNode(_sfc_main$3, {
                                message: unref(formArticle).errors.gallery,
                                class: "mt-1"
                              }, null, 8, ["message"]),
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
                            }, "Langsung tampilkan di halaman publik")
                          ])
                        ], 64)) : activeType.value === "member" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createVNode("div", { class: "row mb-3" }, [
                            createVNode("div", { class: "col-md-6" }, [
                              createVNode("label", { class: "form-label fw-semibold small" }, [
                                createTextVNode("Nama Lengkap "),
                                createVNode("span", { class: "text-danger" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": ($event) => unref(formMember).name = $event,
                                class: "form-control",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(formMember).name]
                              ]),
                              createVNode(_sfc_main$3, {
                                message: unref(formMember).errors.name,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "col-md-6" }, [
                              createVNode("label", { class: "form-label fw-semibold small" }, [
                                createTextVNode("Jabatan "),
                                createVNode("span", { class: "text-danger" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": ($event) => unref(formMember).role_title = $event,
                                class: "form-control",
                                placeholder: "Contoh: Manajer Marketing",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(formMember).role_title]
                              ]),
                              createVNode(_sfc_main$3, {
                                message: unref(formMember).errors.role_title,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ])
                          ]),
                          createVNode("div", { class: "row mb-3" }, [
                            createVNode("div", { class: "col-md-6" }, [
                              createVNode("label", { class: "form-label fw-semibold small" }, "Departemen"),
                              withDirectives(createVNode("select", {
                                "onUpdate:modelValue": ($event) => unref(formMember).department_name = $event,
                                class: "form-select"
                              }, [
                                createVNode("option", { value: "" }, "Pilih Departemen"),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.departments, (dept) => {
                                  return openBlock(), createBlock("option", {
                                    key: dept.id,
                                    value: dept.name
                                  }, toDisplayString(dept.name), 9, ["value"]);
                                }), 128)),
                                createVNode("option", { value: "Non-Departmental" }, "Eksekutif / Tanpa Departemen")
                              ], 8, ["onUpdate:modelValue"]), [
                                [vModelSelect, unref(formMember).department_name]
                              ]),
                              createVNode(_sfc_main$3, {
                                message: unref(formMember).errors.department_name,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ]),
                            createVNode("div", { class: "col-md-6" }, [
                              createVNode("label", { class: "form-label fw-semibold small" }, "Urutan Tampil"),
                              withDirectives(createVNode("input", {
                                type: "number",
                                min: "0",
                                "onUpdate:modelValue": ($event) => unref(formMember).order_num = $event,
                                class: "form-control"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [
                                  vModelText,
                                  unref(formMember).order_num,
                                  void 0,
                                  { number: true }
                                ]
                              ]),
                              createVNode("div", { class: "form-text" }, "Angka kecil tampil lebih dahulu."),
                              createVNode(_sfc_main$3, {
                                message: unref(formMember).errors.order_num,
                                class: "mt-1"
                              }, null, 8, ["message"])
                            ])
                          ]),
                          createVNode("div", { class: "mb-3" }, [
                            createVNode("label", { class: "form-label fw-semibold small" }, "Foto"),
                            createVNode("input", {
                              type: "file",
                              accept: "image/jpeg,image/png,image/webp",
                              onInput: ($event) => unref(formMember).image_path = $event.target.files[0],
                              class: "form-control"
                            }, null, 40, ["onInput"]),
                            createVNode("div", { class: "form-text" }, "JPG, PNG, atau WEBP; maksimal 2 MB."),
                            createVNode(_sfc_main$3, {
                              message: unref(formMember).errors.image_path,
                              class: "mt-1"
                            }, null, 8, ["message"])
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
                            }, "Anggota eksekutif / pimpinan")
                          ])
                        ], 64)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "modal-footer bg-light p-3" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-light px-4",
                          "data-bs-dismiss": "modal"
                        }, "Batal"),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary px-5 shadow-sm",
                          disabled: unref(formArticle).processing || unref(formMember).processing
                        }, [
                          isLoading.value ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "spinner-border spinner-border-sm me-2"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(isLoading.value ? "Menyimpan..." : isEdit.value ? "Simpan Perubahan" : "Tambahkan"), 1)
                        ], 8, ["disabled"])
                      ])
                    ], 32)
                  ])
                ])
              ], 512),
              createVNode(_sfc_main$4, {
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
const MarketingCms = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b41b6eb6"]]);
export {
  MarketingCms as default
};
//# sourceMappingURL=MarketingCms-DJpWguye.js.map
