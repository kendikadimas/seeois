import { ref, watch, computed, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, withDirectives, Fragment, renderList, vModelSelect, withModifiers, vModelText, withKeys, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-kVLGS8T_.js";
import { _ as _sfc_main$1 } from "./Notif-DL0SggHu.js";
import { useForm, Head, router } from "@inertiajs/vue3";
import { f as formatIDR } from "./utils-DIF4pdrF.js";
import axios from "axios";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ModalConfirmation-CaKJYApU.js";
import "vue-toastification";
import "date-fns";
const _sfc_main = {
  __name: "ProductionPanel",
  __ssrInlineRender: true,
  props: {
    stands: {
      type: Array,
      default: () => []
    },
    selectedStand: {
      type: Object,
      default: null
    },
    menus: {
      type: Array,
      default: () => []
    },
    foodTags: {
      type: Array,
      default: () => []
    },
    notif: {
      type: Object,
      default: null
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    var _a, _b, _c;
    const route = (name, params = {}) => window.route(name, params);
    const props = __props;
    const selectedStandId = ref(((_a = props.selectedStand) == null ? void 0 : _a.id) ?? ((_c = (_b = props.stands) == null ? void 0 : _b[0]) == null ? void 0 : _c.id) ?? null);
    const stockForms = ref({});
    const menuForm = useForm({
      stand_id: selectedStandId.value,
      name: "",
      category: "",
      food_tag: [],
      price: 0,
      stock: 0
    });
    const localFoodTags = ref([...props.foodTags || []]);
    watch(() => props.foodTags, (newTags) => {
      if (newTags) localFoodTags.value = [...newTags];
    }, { deep: true });
    const categorySuggestions = ["Makanan Berat", "Minuman Dingin", "Minuman Hangat", "Snack & Cemilan", "Dessert"];
    const showNewTagForm = ref(false);
    const newTagName = ref("");
    const newTagColor = ref("#2563eb");
    const isSubmittingTag = ref(false);
    const tagColorOptions = ["#2563eb", "#7c3aed", "#0284c7", "#ea580c", "#dc2626", "#d97706", "#059669", "#ca8a04", "#e11d48"];
    function selectCategory(cat) {
      menuForm.category = cat;
    }
    function toggleTag(tagId) {
      const idx = menuForm.food_tag.indexOf(tagId);
      if (idx > -1) {
        menuForm.food_tag.splice(idx, 1);
      } else {
        menuForm.food_tag.push(tagId);
      }
    }
    async function submitQuickTag() {
      const trimmed = newTagName.value.trim();
      if (!trimmed) return;
      isSubmittingTag.value = true;
      try {
        const response = await axios.post("/seeo/staff/food/tag/quick-store", {
          name: trimmed,
          color: newTagColor.value
        }, {
          headers: { "Accept": "application/json" }
        });
        if (response.data && response.data.tag) {
          const createdTag = response.data.tag;
          const existingIdx = localFoodTags.value.findIndex((t) => t.id === createdTag.id);
          if (existingIdx === -1) {
            localFoodTags.value.push(createdTag);
          }
          if (!menuForm.food_tag.includes(createdTag.id)) {
            menuForm.food_tag.push(createdTag.id);
          }
          newTagName.value = "";
          showNewTagForm.value = false;
        }
      } catch (err) {
        console.error("Gagal menambahkan tag:", err);
        alert("Gagal menambahkan tag baru. Silakan coba lagi.");
      } finally {
        isSubmittingTag.value = false;
      }
    }
    const activeMenuCount = computed(() => props.menus.filter((menu) => menu.is_published).length);
    function filterStand() {
      router.get(route("staff.production.panel.index"), { stand_id: selectedStandId.value }, { preserveState: true, replace: true });
    }
    function submitMenu() {
      menuForm.stand_id = selectedStandId.value;
      menuForm.post(route("staff.sales-distribution.menu.store"), {
        preserveScroll: true,
        onSuccess: () => {
          menuForm.reset("name", "category", "food_tag", "price", "stock");
        }
      });
    }
    function togglePublish(menu) {
      router.post(route("staff.production.panel.publish", { menu: menu.id }), {}, { preserveScroll: true });
    }
    function updateStock(menuId) {
      const amount = stockForms.value[`amount_${menuId}`];
      if (!amount || amount === 0) {
        alert("Silakan masukkan jumlah penambahan (+) atau pengurangan (-) stok terlebih dahulu.");
        return;
      }
      const request_id = crypto.randomUUID();
      router.post(route("staff.production.panel.stock.update", { menu: menuId }), {
        amount,
        request_id,
        reason: stockForms.value[`reason_${menuId}`] || "production",
        notes: stockForms.value[`notes_${menuId}`] || null
      }, {
        preserveScroll: true,
        onSuccess: () => {
          stockForms.value[`amount_${menuId}`] = "";
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Production Panel" }, null, _parent));
      _push(ssrRenderComponent(StaffLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container-fluid py-3 py-md-4" data-v-5420eff8${_scopeId}>`);
            if (__props.notif) {
              _push2(ssrRenderComponent(_sfc_main$1, { notif: __props.notif }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (!__props.stands.length) {
              _push2(`<div class="alert alert-warning shadow-2xs rounded-3" data-v-5420eff8${_scopeId}><i class="bi bi-exclamation-triangle-fill me-2" data-v-5420eff8${_scopeId}></i> Anda belum ditugaskan ke stand aktif. Hubungi Operational Officer (COO) untuk menambahkan assignment tim Produksi Anda. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="row g-4" data-v-5420eff8${_scopeId}><div class="col-12" data-v-5420eff8${_scopeId}><div class="card border-0 shadow-sm rounded-4 bg-white" data-v-5420eff8${_scopeId}><div class="card-body p-4 d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center" data-v-5420eff8${_scopeId}><div data-v-5420eff8${_scopeId}><h4 class="mb-1 fw-bold text-dark d-flex align-items-center gap-2" data-v-5420eff8${_scopeId}><i class="bi bi-tools text-primary" data-v-5420eff8${_scopeId}></i><span data-v-5420eff8${_scopeId}>Production &amp; Kitchen Panel</span></h4><p class="text-secondary mb-0 small" data-v-5420eff8${_scopeId}> Kelola resep makanan, pantau porsi siap jual, dan perbarui stok menu harian secara real-time. </p></div><div class="d-flex gap-2 align-items-center flex-wrap" data-v-5420eff8${_scopeId}><span class="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-3 py-2 fw-semibold" data-v-5420eff8${_scopeId}><i class="bi bi-check-circle-fill me-1" data-v-5420eff8${_scopeId}></i> Published: ${ssrInterpolate(activeMenuCount.value)} Menu </span><div class="d-flex align-items-center gap-1 bg-light p-1 ps-2 rounded-pill border" data-v-5420eff8${_scopeId}><i class="bi bi-shop text-muted small" data-v-5420eff8${_scopeId}></i><select class="form-select form-select-sm border-0 bg-transparent fw-medium pe-4" style="${ssrRenderStyle({ "min-width": "180px" })}" data-v-5420eff8${_scopeId}><!--[-->`);
            ssrRenderList(__props.stands, (stand) => {
              _push2(`<option${ssrRenderAttr("value", stand.id)} data-v-5420eff8${ssrIncludeBooleanAttr(Array.isArray(selectedStandId.value) ? ssrLooseContain(selectedStandId.value, stand.id) : ssrLooseEqual(selectedStandId.value, stand.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(stand.name)}</option>`);
            });
            _push2(`<!--]--></select></div></div></div></div></div>`);
            if (selectedStandId.value) {
              _push2(`<div class="col-12" data-v-5420eff8${_scopeId}><div class="card border-0 shadow-sm rounded-4 bg-white overflow-hidden" data-v-5420eff8${_scopeId}><div class="card-header bg-white border-bottom p-4" data-v-5420eff8${_scopeId}><div class="d-flex align-items-center gap-3" data-v-5420eff8${_scopeId}><div class="rounded-circle p-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center" style="${ssrRenderStyle({ "width": "52px", "height": "52px" })}" data-v-5420eff8${_scopeId}><i class="bi bi-plus-circle-fill fs-4" data-v-5420eff8${_scopeId}></i></div><div data-v-5420eff8${_scopeId}><h5 class="mb-1 fw-bold text-dark" data-v-5420eff8${_scopeId}>Tambah Menu Baru ke Stand</h5><p class="mb-0 text-muted small" data-v-5420eff8${_scopeId}>Isi data produk makanan/minuman yang akan diproduksi dan dijual ke pelanggan.</p></div></div></div><form class="card-body p-4" data-v-5420eff8${_scopeId}><div class="row g-3" data-v-5420eff8${_scopeId}><div class="col-12 col-md-6 col-lg-4" data-v-5420eff8${_scopeId}><label for="menuName" class="form-label fw-semibold text-dark mb-1" data-v-5420eff8${_scopeId}><i class="bi bi-card-text text-primary me-1" data-v-5420eff8${_scopeId}></i> Nama Menu <span class="text-danger" data-v-5420eff8${_scopeId}>*</span></label><input id="menuName"${ssrRenderAttr("value", unref(menuForm).name)} class="form-control rounded-3" placeholder="Contoh: Nasi Goreng Spesial" required data-v-5420eff8${_scopeId}><div class="form-text text-2xs text-muted" data-v-5420eff8${_scopeId}>Nama yang akan tampil pada kasir &amp; struk belanja</div></div><div class="col-12 col-md-6 col-lg-4" data-v-5420eff8${_scopeId}><label for="menuCategory" class="form-label fw-semibold text-dark mb-1" data-v-5420eff8${_scopeId}><i class="bi bi-tag-fill text-primary me-1" data-v-5420eff8${_scopeId}></i> Kategori <span class="text-danger" data-v-5420eff8${_scopeId}>*</span></label><input id="menuCategory"${ssrRenderAttr("value", unref(menuForm).category)} class="form-control rounded-3" placeholder="Ketik atau pilih kategori..." required data-v-5420eff8${_scopeId}><div class="d-flex flex-wrap gap-1 mt-1" data-v-5420eff8${_scopeId}><!--[-->`);
              ssrRenderList(categorySuggestions, (cat) => {
                _push2(`<button type="button" class="${ssrRenderClass([unref(menuForm).category === cat ? "btn-primary" : "btn-outline-secondary", "btn btn-2xs rounded-pill py-0 px-2"])}" data-v-5420eff8${_scopeId}>${ssrInterpolate(cat)}</button>`);
              });
              _push2(`<!--]--></div></div><div class="col-6 col-lg-2" data-v-5420eff8${_scopeId}><label for="menuPrice" class="form-label fw-semibold text-dark mb-1" data-v-5420eff8${_scopeId}><i class="bi bi-cash-stack text-success me-1" data-v-5420eff8${_scopeId}></i> Harga Jual <span class="text-danger" data-v-5420eff8${_scopeId}>*</span></label><div class="input-group" data-v-5420eff8${_scopeId}><span class="input-group-text bg-light text-muted small" data-v-5420eff8${_scopeId}>Rp</span><input id="menuPrice"${ssrRenderAttr("value", unref(menuForm).price)} type="number" min="0" step="500" class="form-control" placeholder="15000" required data-v-5420eff8${_scopeId}></div><div class="form-text text-2xs text-muted" data-v-5420eff8${_scopeId}>Harga ke pembeli</div></div><div class="col-6 col-lg-2" data-v-5420eff8${_scopeId}><label for="menuStock" class="form-label fw-semibold text-dark mb-1" data-v-5420eff8${_scopeId}><i class="bi bi-box-seam-fill text-warning me-1" data-v-5420eff8${_scopeId}></i> Stok Siap <span class="text-danger" data-v-5420eff8${_scopeId}>*</span></label><div class="input-group" data-v-5420eff8${_scopeId}><input id="menuStock"${ssrRenderAttr("value", unref(menuForm).stock)} type="number" min="0" class="form-control" placeholder="20" required data-v-5420eff8${_scopeId}><span class="input-group-text bg-light text-muted small" data-v-5420eff8${_scopeId}>Porsi</span></div><div class="form-text text-2xs text-muted" data-v-5420eff8${_scopeId}>Porsi awal di dapur</div></div><div class="col-12 mt-3" data-v-5420eff8${_scopeId}><div class="p-3 rounded-4 bg-light border" data-v-5420eff8${_scopeId}><div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2" data-v-5420eff8${_scopeId}><div data-v-5420eff8${_scopeId}><label class="form-label fw-bold text-dark mb-0 d-flex align-items-center gap-2" data-v-5420eff8${_scopeId}><i class="bi bi-tags-fill text-info" data-v-5420eff8${_scopeId}></i><span data-v-5420eff8${_scopeId}>Tag Menu (Rasa &amp; Karakteristik)</span><span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill text-3xs" data-v-5420eff8${_scopeId}> Terpilih: ${ssrInterpolate(unref(menuForm).food_tag.length)} Tag </span></label><small class="text-muted d-block mt-1" data-v-5420eff8${_scopeId}> Klik badge di bawah untuk memilih karakteristik menu (bisa pilih lebih dari satu, tanpa tombol Ctrl): </small></div><button type="button" class="btn btn-sm btn-outline-primary rounded-pill px-3 shadow-2xs d-inline-flex align-items-center gap-1" data-v-5420eff8${_scopeId}><i class="${ssrRenderClass(showNewTagForm.value ? "bi bi-x-lg" : "bi bi-plus-lg")}" data-v-5420eff8${_scopeId}></i><span data-v-5420eff8${_scopeId}>${ssrInterpolate(showNewTagForm.value ? "Tutup Form Tag" : "+ Tambah Tag Baru")}</span></button></div>`);
              if (showNewTagForm.value) {
                _push2(`<div class="p-3 mb-3 bg-white border rounded-3 shadow-2xs transition-all" data-v-5420eff8${_scopeId}><div class="row g-2 align-items-center" data-v-5420eff8${_scopeId}><div class="col-12 col-md-5" data-v-5420eff8${_scopeId}><label class="form-label small fw-semibold text-secondary mb-1" data-v-5420eff8${_scopeId}>Nama Tag Rasa / Karakteristik:</label><input type="text"${ssrRenderAttr("value", newTagName.value)} class="form-control form-control-sm rounded-pill px-3" placeholder="Contoh: Kopi, Dingin, Extra Pedas, Halal..." data-v-5420eff8${_scopeId}></div><div class="col-12 col-md-4" data-v-5420eff8${_scopeId}><label class="form-label small fw-semibold text-secondary mb-1" data-v-5420eff8${_scopeId}>Pilihan Warna Tag:</label><div class="d-flex gap-2 align-items-center flex-wrap" data-v-5420eff8${_scopeId}><!--[-->`);
                ssrRenderList(tagColorOptions, (c) => {
                  _push2(`<div class="color-dot rounded-circle cursor-pointer transition-all" style="${ssrRenderStyle({ backgroundColor: c, width: "22px", height: "22px", border: newTagColor.value === c ? "2px solid #000" : "2px solid transparent" })}"${ssrRenderAttr("title", c)} data-v-5420eff8${_scopeId}></div>`);
                });
                _push2(`<!--]--></div></div><div class="col-12 col-md-3 d-grid align-self-end" data-v-5420eff8${_scopeId}><button type="button" class="btn btn-sm btn-primary rounded-pill fw-medium"${ssrIncludeBooleanAttr(!newTagName.value.trim() || isSubmittingTag.value) ? " disabled" : ""} data-v-5420eff8${_scopeId}>`);
                if (isSubmittingTag.value) {
                  _push2(`<span class="spinner-border spinner-border-sm me-1" data-v-5420eff8${_scopeId}></span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(` Simpan &amp; Gunakan </button></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="tag-chips-box d-flex flex-wrap gap-2 pt-1" data-v-5420eff8${_scopeId}>`);
              if (localFoodTags.value.length === 0) {
                _push2(`<div class="text-muted small py-2" data-v-5420eff8${_scopeId}> Belum ada tag menu. Klik <strong data-v-5420eff8${_scopeId}>+ Tambah Tag Baru</strong> untuk membuat tag pertama Anda. </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(localFoodTags.value, (tag) => {
                _push2(`<button type="button" class="${ssrRenderClass([unref(menuForm).food_tag.includes(tag.id) ? "tag-chip-active shadow-sm text-white" : "bg-white border text-secondary hover-lift", "btn btn-sm rounded-pill tag-chip transition-all d-flex align-items-center gap-1"])}" style="${ssrRenderStyle(unref(menuForm).food_tag.includes(tag.id) ? { backgroundColor: tag.color || "#2563eb", borderColor: tag.color || "#2563eb" } : {})}" data-v-5420eff8${_scopeId}><i class="${ssrRenderClass(unref(menuForm).food_tag.includes(tag.id) ? "bi bi-check-circle-fill" : "bi bi-plus")}" data-v-5420eff8${_scopeId}></i><span class="fw-medium small" data-v-5420eff8${_scopeId}>${ssrInterpolate(tag.name)}</span></button>`);
              });
              _push2(`<!--]--></div></div></div><div class="col-12 d-flex justify-content-end gap-2 mt-3 pt-2 border-top" data-v-5420eff8${_scopeId}><button type="submit" class="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm d-flex align-items-center gap-2"${ssrIncludeBooleanAttr(unref(menuForm).processing) ? " disabled" : ""} data-v-5420eff8${_scopeId}>`);
              if (unref(menuForm).processing) {
                _push2(`<span class="spinner-border spinner-border-sm" data-v-5420eff8${_scopeId}></span>`);
              } else {
                _push2(`<i class="bi bi-plus-lg" data-v-5420eff8${_scopeId}></i>`);
              }
              _push2(`<span data-v-5420eff8${_scopeId}>${ssrInterpolate(unref(menuForm).processing ? "Menyimpan Menu..." : "Tambah Menu ke Stand")}</span></button></div>`);
              if (Object.keys(unref(menuForm).errors).length) {
                _push2(`<div class="col-12" data-v-5420eff8${_scopeId}><div class="alert alert-danger mb-0 rounded-3 small" data-v-5420eff8${_scopeId}><i class="bi bi-exclamation-triangle-fill me-2" data-v-5420eff8${_scopeId}></i><strong data-v-5420eff8${_scopeId}>Error:</strong> ${ssrInterpolate(Object.values(unref(menuForm).errors)[0])}</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="col-12" data-v-5420eff8${_scopeId}><div class="card border-0 shadow-sm rounded-4 bg-white overflow-hidden" data-v-5420eff8${_scopeId}><div class="card-header bg-white border-bottom p-4" data-v-5420eff8${_scopeId}><div class="d-flex justify-content-between align-items-center flex-wrap gap-2" data-v-5420eff8${_scopeId}><div class="d-flex align-items-center gap-3" data-v-5420eff8${_scopeId}><div class="rounded-circle p-3 bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center" style="${ssrRenderStyle({ "width": "52px", "height": "52px" })}" data-v-5420eff8${_scopeId}><i class="bi bi-list-check fs-4" data-v-5420eff8${_scopeId}></i></div><div data-v-5420eff8${_scopeId}><h5 class="mb-1 fw-bold text-dark" data-v-5420eff8${_scopeId}>Katalog Menu &amp; Stok Siap Jual</h5><p class="mb-0 text-muted small" data-v-5420eff8${_scopeId}>Kelola ketersediaan porsi, biaya produksi (HPP), dan status publikasi menu.</p></div></div><span class="badge bg-light text-dark border px-3 py-2 rounded-pill" data-v-5420eff8${_scopeId}> Total ${ssrInterpolate(__props.menus.length)} Menu Terdaftar </span></div></div><div class="card-body p-0 table-responsive" data-v-5420eff8${_scopeId}><table class="table align-middle table-hover mb-0" data-v-5420eff8${_scopeId}><thead class="table-light" data-v-5420eff8${_scopeId}><tr data-v-5420eff8${_scopeId}><th class="ps-4 fw-semibold small text-secondary" data-v-5420eff8${_scopeId}>Menu</th><th class="fw-semibold small text-secondary" data-v-5420eff8${_scopeId}>Stok Siap</th><th class="fw-semibold small text-secondary" data-v-5420eff8${_scopeId}>HPP (Biaya)</th><th class="fw-semibold small text-secondary" data-v-5420eff8${_scopeId}>Harga Jual</th><th class="fw-semibold small text-secondary" data-v-5420eff8${_scopeId}>Status Kasir</th><th class="fw-semibold small text-secondary" data-v-5420eff8${_scopeId}>Mutasi Terakhir</th><th class="text-center fw-semibold small text-secondary pe-4" data-v-5420eff8${_scopeId}>Aksi Stok &amp; Ketersediaan</th></tr></thead><tbody data-v-5420eff8${_scopeId}><!--[-->`);
            ssrRenderList(__props.menus, (menu) => {
              _push2(`<tr data-v-5420eff8${_scopeId}><td class="ps-4" data-v-5420eff8${_scopeId}><div class="fw-bold text-dark" data-v-5420eff8${_scopeId}>${ssrInterpolate(menu.name)}</div><span class="badge bg-light text-secondary border small" data-v-5420eff8${_scopeId}>${ssrInterpolate(menu.category)}</span></td><td data-v-5420eff8${_scopeId}><span class="${ssrRenderClass([menu.stock <= 5 ? "bg-danger text-white" : menu.stock <= 15 ? "bg-warning text-dark" : "bg-primary text-white", "badge rounded-pill px-3 py-1 fw-bold"])}" data-v-5420eff8${_scopeId}>${ssrInterpolate(menu.stock)} Porsi </span></td><td data-v-5420eff8${_scopeId}><span class="small fw-medium text-secondary" data-v-5420eff8${_scopeId}>${ssrInterpolate(menu.cost ? unref(formatIDR)(menu.cost) : "-")}</span></td><td data-v-5420eff8${_scopeId}><span class="fw-bold text-success" data-v-5420eff8${_scopeId}>${ssrInterpolate(unref(formatIDR)(menu.price))}</span></td><td data-v-5420eff8${_scopeId}><span class="${ssrRenderClass([menu.is_published ? "bg-success text-white" : menu.workflow_status === "ready" ? "bg-info text-white" : "bg-secondary text-white", "badge rounded-pill px-2 py-1"])}" data-v-5420eff8${_scopeId}>${ssrInterpolate(menu.is_published ? "✓ Tayang di Kasir" : menu.workflow_status === "ready" ? "Siap Dijual" : "Draft")}</span></td><td class="small text-muted" data-v-5420eff8${_scopeId}>`);
              if (menu.latest_stock_movement) {
                _push2(`<!--[--><span class="${ssrRenderClass(menu.latest_stock_movement.change > 0 ? "text-success fw-bold" : "text-danger fw-bold")}" data-v-5420eff8${_scopeId}>${ssrInterpolate(menu.latest_stock_movement.change > 0 ? "+" : "")}${ssrInterpolate(menu.latest_stock_movement.change)}</span><span class="text-2xs d-block text-muted" data-v-5420eff8${_scopeId}>${ssrInterpolate(menu.latest_stock_movement.staff || "Sistem")}</span><!--]-->`);
              } else {
                _push2(`<span class="text-muted" data-v-5420eff8${_scopeId}>-</span>`);
              }
              _push2(`</td><td class="pe-4" data-v-5420eff8${_scopeId}><div class="d-flex gap-2 flex-wrap justify-content-center align-items-center" data-v-5420eff8${_scopeId}><div class="input-group input-group-sm" style="${ssrRenderStyle({ "width": "140px" })}" data-v-5420eff8${_scopeId}><input${ssrRenderAttr("id", `stockAmount_${menu.id}`)}${ssrRenderAttr("value", stockForms.value[`amount_${menu.id}`])} type="number" class="form-control text-center" placeholder="± Porsi" title="Ketik angka positif untuk menambah stok, negatif untuk mengurangi" data-v-5420eff8${_scopeId}><button class="btn btn-primary" type="button" title="Simpan perubahan stok" data-v-5420eff8${_scopeId}><i class="bi bi-check-lg" data-v-5420eff8${_scopeId}></i></button></div><select${ssrRenderAttr("id", `stockReason_${menu.id}`)} class="form-select form-select-sm" style="${ssrRenderStyle({ "width": "120px" })}" data-v-5420eff8${_scopeId}><option value="production" data-v-5420eff8${ssrIncludeBooleanAttr(Array.isArray(stockForms.value[`reason_${menu.id}`]) ? ssrLooseContain(stockForms.value[`reason_${menu.id}`], "production") : ssrLooseEqual(stockForms.value[`reason_${menu.id}`], "production")) ? " selected" : ""}${_scopeId}>➕ Produksi</option><option value="correction" data-v-5420eff8${ssrIncludeBooleanAttr(Array.isArray(stockForms.value[`reason_${menu.id}`]) ? ssrLooseContain(stockForms.value[`reason_${menu.id}`], "correction") : ssrLooseEqual(stockForms.value[`reason_${menu.id}`], "correction")) ? " selected" : ""}${_scopeId}>🔧 Koreksi</option><option value="damaged" data-v-5420eff8${ssrIncludeBooleanAttr(Array.isArray(stockForms.value[`reason_${menu.id}`]) ? ssrLooseContain(stockForms.value[`reason_${menu.id}`], "damaged") : ssrLooseEqual(stockForms.value[`reason_${menu.id}`], "damaged")) ? " selected" : ""}${_scopeId}>❌ Rusak</option><option value="return" data-v-5420eff8${ssrIncludeBooleanAttr(Array.isArray(stockForms.value[`reason_${menu.id}`]) ? ssrLooseContain(stockForms.value[`reason_${menu.id}`], "return") : ssrLooseEqual(stockForms.value[`reason_${menu.id}`], "return")) ? " selected" : ""}${_scopeId}>🔄 Retur</option></select><button class="${ssrRenderClass([menu.is_published ? "btn-outline-danger" : "btn-success", "btn btn-sm rounded-pill px-3"])}"${ssrRenderAttr("title", menu.is_published ? "Tarik dari kasir (Sold out)" : "Aktifkan agar bisa dipesan di kasir")} data-v-5420eff8${_scopeId}><i class="${ssrRenderClass([menu.is_published ? "bi bi-eye-slash-fill" : "bi bi-check-circle-fill", "me-1"])}" data-v-5420eff8${_scopeId}></i> ${ssrInterpolate(menu.is_published ? "Nonaktifkan" : "Tayangkan")}</button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (!__props.menus.length) {
              _push2(`<tr data-v-5420eff8${_scopeId}><td colspan="7" class="text-center text-muted py-5" data-v-5420eff8${_scopeId}><i class="bi bi-inbox display-6 d-block mb-2 text-muted opacity-50" data-v-5420eff8${_scopeId}></i> Belum ada menu terdaftar untuk stand ini. Silakan tambahkan menu baru di form di atas. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-fluid py-3 py-md-4" }, [
                __props.notif ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 0,
                  notif: __props.notif
                }, null, 8, ["notif"])) : createCommentVNode("", true),
                !__props.stands.length ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "alert alert-warning shadow-2xs rounded-3"
                }, [
                  createVNode("i", { class: "bi bi-exclamation-triangle-fill me-2" }),
                  createTextVNode(" Anda belum ditugaskan ke stand aktif. Hubungi Operational Officer (COO) untuk menambahkan assignment tim Produksi Anda. ")
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "row g-4" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card border-0 shadow-sm rounded-4 bg-white" }, [
                      createVNode("div", { class: "card-body p-4 d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center" }, [
                        createVNode("div", null, [
                          createVNode("h4", { class: "mb-1 fw-bold text-dark d-flex align-items-center gap-2" }, [
                            createVNode("i", { class: "bi bi-tools text-primary" }),
                            createVNode("span", null, "Production & Kitchen Panel")
                          ]),
                          createVNode("p", { class: "text-secondary mb-0 small" }, " Kelola resep makanan, pantau porsi siap jual, dan perbarui stok menu harian secara real-time. ")
                        ]),
                        createVNode("div", { class: "d-flex gap-2 align-items-center flex-wrap" }, [
                          createVNode("span", { class: "badge rounded-pill bg-success-subtle text-success border border-success-subtle px-3 py-2 fw-semibold" }, [
                            createVNode("i", { class: "bi bi-check-circle-fill me-1" }),
                            createTextVNode(" Published: " + toDisplayString(activeMenuCount.value) + " Menu ", 1)
                          ]),
                          createVNode("div", { class: "d-flex align-items-center gap-1 bg-light p-1 ps-2 rounded-pill border" }, [
                            createVNode("i", { class: "bi bi-shop text-muted small" }),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => selectedStandId.value = $event,
                              class: "form-select form-select-sm border-0 bg-transparent fw-medium pe-4",
                              style: { "min-width": "180px" },
                              onChange: filterStand
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.stands, (stand) => {
                                return openBlock(), createBlock("option", {
                                  key: stand.id,
                                  value: stand.id
                                }, toDisplayString(stand.name), 9, ["value"]);
                              }), 128))
                            ], 40, ["onUpdate:modelValue"]), [
                              [vModelSelect, selectedStandId.value]
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  selectedStandId.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "col-12"
                  }, [
                    createVNode("div", { class: "card border-0 shadow-sm rounded-4 bg-white overflow-hidden" }, [
                      createVNode("div", { class: "card-header bg-white border-bottom p-4" }, [
                        createVNode("div", { class: "d-flex align-items-center gap-3" }, [
                          createVNode("div", {
                            class: "rounded-circle p-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center",
                            style: { "width": "52px", "height": "52px" }
                          }, [
                            createVNode("i", { class: "bi bi-plus-circle-fill fs-4" })
                          ]),
                          createVNode("div", null, [
                            createVNode("h5", { class: "mb-1 fw-bold text-dark" }, "Tambah Menu Baru ke Stand"),
                            createVNode("p", { class: "mb-0 text-muted small" }, "Isi data produk makanan/minuman yang akan diproduksi dan dijual ke pelanggan.")
                          ])
                        ])
                      ]),
                      createVNode("form", {
                        class: "card-body p-4",
                        onSubmit: withModifiers(submitMenu, ["prevent"])
                      }, [
                        createVNode("div", { class: "row g-3" }, [
                          createVNode("div", { class: "col-12 col-md-6 col-lg-4" }, [
                            createVNode("label", {
                              for: "menuName",
                              class: "form-label fw-semibold text-dark mb-1"
                            }, [
                              createVNode("i", { class: "bi bi-card-text text-primary me-1" }),
                              createTextVNode(" Nama Menu "),
                              createVNode("span", { class: "text-danger" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              id: "menuName",
                              "onUpdate:modelValue": ($event) => unref(menuForm).name = $event,
                              class: "form-control rounded-3",
                              placeholder: "Contoh: Nasi Goreng Spesial",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(menuForm).name]
                            ]),
                            createVNode("div", { class: "form-text text-2xs text-muted" }, "Nama yang akan tampil pada kasir & struk belanja")
                          ]),
                          createVNode("div", { class: "col-12 col-md-6 col-lg-4" }, [
                            createVNode("label", {
                              for: "menuCategory",
                              class: "form-label fw-semibold text-dark mb-1"
                            }, [
                              createVNode("i", { class: "bi bi-tag-fill text-primary me-1" }),
                              createTextVNode(" Kategori "),
                              createVNode("span", { class: "text-danger" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              id: "menuCategory",
                              "onUpdate:modelValue": ($event) => unref(menuForm).category = $event,
                              class: "form-control rounded-3",
                              placeholder: "Ketik atau pilih kategori...",
                              required: ""
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(menuForm).category]
                            ]),
                            createVNode("div", { class: "d-flex flex-wrap gap-1 mt-1" }, [
                              (openBlock(), createBlock(Fragment, null, renderList(categorySuggestions, (cat) => {
                                return createVNode("button", {
                                  key: cat,
                                  type: "button",
                                  class: ["btn btn-2xs rounded-pill py-0 px-2", unref(menuForm).category === cat ? "btn-primary" : "btn-outline-secondary"],
                                  onClick: ($event) => selectCategory(cat)
                                }, toDisplayString(cat), 11, ["onClick"]);
                              }), 64))
                            ])
                          ]),
                          createVNode("div", { class: "col-6 col-lg-2" }, [
                            createVNode("label", {
                              for: "menuPrice",
                              class: "form-label fw-semibold text-dark mb-1"
                            }, [
                              createVNode("i", { class: "bi bi-cash-stack text-success me-1" }),
                              createTextVNode(" Harga Jual "),
                              createVNode("span", { class: "text-danger" }, "*")
                            ]),
                            createVNode("div", { class: "input-group" }, [
                              createVNode("span", { class: "input-group-text bg-light text-muted small" }, "Rp"),
                              withDirectives(createVNode("input", {
                                id: "menuPrice",
                                "onUpdate:modelValue": ($event) => unref(menuForm).price = $event,
                                type: "number",
                                min: "0",
                                step: "500",
                                class: "form-control",
                                placeholder: "15000",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [
                                  vModelText,
                                  unref(menuForm).price,
                                  void 0,
                                  { number: true }
                                ]
                              ])
                            ]),
                            createVNode("div", { class: "form-text text-2xs text-muted" }, "Harga ke pembeli")
                          ]),
                          createVNode("div", { class: "col-6 col-lg-2" }, [
                            createVNode("label", {
                              for: "menuStock",
                              class: "form-label fw-semibold text-dark mb-1"
                            }, [
                              createVNode("i", { class: "bi bi-box-seam-fill text-warning me-1" }),
                              createTextVNode(" Stok Siap "),
                              createVNode("span", { class: "text-danger" }, "*")
                            ]),
                            createVNode("div", { class: "input-group" }, [
                              withDirectives(createVNode("input", {
                                id: "menuStock",
                                "onUpdate:modelValue": ($event) => unref(menuForm).stock = $event,
                                type: "number",
                                min: "0",
                                class: "form-control",
                                placeholder: "20",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [
                                  vModelText,
                                  unref(menuForm).stock,
                                  void 0,
                                  { number: true }
                                ]
                              ]),
                              createVNode("span", { class: "input-group-text bg-light text-muted small" }, "Porsi")
                            ]),
                            createVNode("div", { class: "form-text text-2xs text-muted" }, "Porsi awal di dapur")
                          ]),
                          createVNode("div", { class: "col-12 mt-3" }, [
                            createVNode("div", { class: "p-3 rounded-4 bg-light border" }, [
                              createVNode("div", { class: "d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2" }, [
                                createVNode("div", null, [
                                  createVNode("label", { class: "form-label fw-bold text-dark mb-0 d-flex align-items-center gap-2" }, [
                                    createVNode("i", { class: "bi bi-tags-fill text-info" }),
                                    createVNode("span", null, "Tag Menu (Rasa & Karakteristik)"),
                                    createVNode("span", { class: "badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill text-3xs" }, " Terpilih: " + toDisplayString(unref(menuForm).food_tag.length) + " Tag ", 1)
                                  ]),
                                  createVNode("small", { class: "text-muted d-block mt-1" }, " Klik badge di bawah untuk memilih karakteristik menu (bisa pilih lebih dari satu, tanpa tombol Ctrl): ")
                                ]),
                                createVNode("button", {
                                  type: "button",
                                  class: "btn btn-sm btn-outline-primary rounded-pill px-3 shadow-2xs d-inline-flex align-items-center gap-1",
                                  onClick: ($event) => showNewTagForm.value = !showNewTagForm.value
                                }, [
                                  createVNode("i", {
                                    class: showNewTagForm.value ? "bi bi-x-lg" : "bi bi-plus-lg"
                                  }, null, 2),
                                  createVNode("span", null, toDisplayString(showNewTagForm.value ? "Tutup Form Tag" : "+ Tambah Tag Baru"), 1)
                                ], 8, ["onClick"])
                              ]),
                              showNewTagForm.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "p-3 mb-3 bg-white border rounded-3 shadow-2xs transition-all"
                              }, [
                                createVNode("div", { class: "row g-2 align-items-center" }, [
                                  createVNode("div", { class: "col-12 col-md-5" }, [
                                    createVNode("label", { class: "form-label small fw-semibold text-secondary mb-1" }, "Nama Tag Rasa / Karakteristik:"),
                                    withDirectives(createVNode("input", {
                                      type: "text",
                                      "onUpdate:modelValue": ($event) => newTagName.value = $event,
                                      class: "form-control form-control-sm rounded-pill px-3",
                                      placeholder: "Contoh: Kopi, Dingin, Extra Pedas, Halal...",
                                      onKeydown: withKeys(withModifiers(submitQuickTag, ["prevent"]), ["enter"])
                                    }, null, 40, ["onUpdate:modelValue", "onKeydown"]), [
                                      [vModelText, newTagName.value]
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-12 col-md-4" }, [
                                    createVNode("label", { class: "form-label small fw-semibold text-secondary mb-1" }, "Pilihan Warna Tag:"),
                                    createVNode("div", { class: "d-flex gap-2 align-items-center flex-wrap" }, [
                                      (openBlock(), createBlock(Fragment, null, renderList(tagColorOptions, (c) => {
                                        return createVNode("div", {
                                          key: c,
                                          class: "color-dot rounded-circle cursor-pointer transition-all",
                                          style: { backgroundColor: c, width: "22px", height: "22px", border: newTagColor.value === c ? "2px solid #000" : "2px solid transparent" },
                                          onClick: ($event) => newTagColor.value = c,
                                          title: c
                                        }, null, 12, ["onClick", "title"]);
                                      }), 64))
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-12 col-md-3 d-grid align-self-end" }, [
                                    createVNode("button", {
                                      type: "button",
                                      class: "btn btn-sm btn-primary rounded-pill fw-medium",
                                      disabled: !newTagName.value.trim() || isSubmittingTag.value,
                                      onClick: submitQuickTag
                                    }, [
                                      isSubmittingTag.value ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "spinner-border spinner-border-sm me-1"
                                      })) : createCommentVNode("", true),
                                      createTextVNode(" Simpan & Gunakan ")
                                    ], 8, ["disabled"])
                                  ])
                                ])
                              ])) : createCommentVNode("", true),
                              createVNode("div", { class: "tag-chips-box d-flex flex-wrap gap-2 pt-1" }, [
                                localFoodTags.value.length === 0 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-muted small py-2"
                                }, [
                                  createTextVNode(" Belum ada tag menu. Klik "),
                                  createVNode("strong", null, "+ Tambah Tag Baru"),
                                  createTextVNode(" untuk membuat tag pertama Anda. ")
                                ])) : createCommentVNode("", true),
                                (openBlock(true), createBlock(Fragment, null, renderList(localFoodTags.value, (tag) => {
                                  return openBlock(), createBlock("button", {
                                    key: tag.id,
                                    type: "button",
                                    class: ["btn btn-sm rounded-pill tag-chip transition-all d-flex align-items-center gap-1", unref(menuForm).food_tag.includes(tag.id) ? "tag-chip-active shadow-sm text-white" : "bg-white border text-secondary hover-lift"],
                                    style: unref(menuForm).food_tag.includes(tag.id) ? { backgroundColor: tag.color || "#2563eb", borderColor: tag.color || "#2563eb" } : {},
                                    onClick: ($event) => toggleTag(tag.id)
                                  }, [
                                    createVNode("i", {
                                      class: unref(menuForm).food_tag.includes(tag.id) ? "bi bi-check-circle-fill" : "bi bi-plus"
                                    }, null, 2),
                                    createVNode("span", { class: "fw-medium small" }, toDisplayString(tag.name), 1)
                                  ], 14, ["onClick"]);
                                }), 128))
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "col-12 d-flex justify-content-end gap-2 mt-3 pt-2 border-top" }, [
                            createVNode("button", {
                              type: "submit",
                              class: "btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm d-flex align-items-center gap-2",
                              disabled: unref(menuForm).processing
                            }, [
                              unref(menuForm).processing ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "spinner-border spinner-border-sm"
                              })) : (openBlock(), createBlock("i", {
                                key: 1,
                                class: "bi bi-plus-lg"
                              })),
                              createVNode("span", null, toDisplayString(unref(menuForm).processing ? "Menyimpan Menu..." : "Tambah Menu ke Stand"), 1)
                            ], 8, ["disabled"])
                          ]),
                          Object.keys(unref(menuForm).errors).length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "col-12"
                          }, [
                            createVNode("div", { class: "alert alert-danger mb-0 rounded-3 small" }, [
                              createVNode("i", { class: "bi bi-exclamation-triangle-fill me-2" }),
                              createVNode("strong", null, "Error:"),
                              createTextVNode(" " + toDisplayString(Object.values(unref(menuForm).errors)[0]), 1)
                            ])
                          ])) : createCommentVNode("", true)
                        ])
                      ], 32)
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card border-0 shadow-sm rounded-4 bg-white overflow-hidden" }, [
                      createVNode("div", { class: "card-header bg-white border-bottom p-4" }, [
                        createVNode("div", { class: "d-flex justify-content-between align-items-center flex-wrap gap-2" }, [
                          createVNode("div", { class: "d-flex align-items-center gap-3" }, [
                            createVNode("div", {
                              class: "rounded-circle p-3 bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center",
                              style: { "width": "52px", "height": "52px" }
                            }, [
                              createVNode("i", { class: "bi bi-list-check fs-4" })
                            ]),
                            createVNode("div", null, [
                              createVNode("h5", { class: "mb-1 fw-bold text-dark" }, "Katalog Menu & Stok Siap Jual"),
                              createVNode("p", { class: "mb-0 text-muted small" }, "Kelola ketersediaan porsi, biaya produksi (HPP), dan status publikasi menu.")
                            ])
                          ]),
                          createVNode("span", { class: "badge bg-light text-dark border px-3 py-2 rounded-pill" }, " Total " + toDisplayString(__props.menus.length) + " Menu Terdaftar ", 1)
                        ])
                      ]),
                      createVNode("div", { class: "card-body p-0 table-responsive" }, [
                        createVNode("table", { class: "table align-middle table-hover mb-0" }, [
                          createVNode("thead", { class: "table-light" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "ps-4 fw-semibold small text-secondary" }, "Menu"),
                              createVNode("th", { class: "fw-semibold small text-secondary" }, "Stok Siap"),
                              createVNode("th", { class: "fw-semibold small text-secondary" }, "HPP (Biaya)"),
                              createVNode("th", { class: "fw-semibold small text-secondary" }, "Harga Jual"),
                              createVNode("th", { class: "fw-semibold small text-secondary" }, "Status Kasir"),
                              createVNode("th", { class: "fw-semibold small text-secondary" }, "Mutasi Terakhir"),
                              createVNode("th", { class: "text-center fw-semibold small text-secondary pe-4" }, "Aksi Stok & Ketersediaan")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.menus, (menu) => {
                              return openBlock(), createBlock("tr", {
                                key: menu.id
                              }, [
                                createVNode("td", { class: "ps-4" }, [
                                  createVNode("div", { class: "fw-bold text-dark" }, toDisplayString(menu.name), 1),
                                  createVNode("span", { class: "badge bg-light text-secondary border small" }, toDisplayString(menu.category), 1)
                                ]),
                                createVNode("td", null, [
                                  createVNode("span", {
                                    class: ["badge rounded-pill px-3 py-1 fw-bold", menu.stock <= 5 ? "bg-danger text-white" : menu.stock <= 15 ? "bg-warning text-dark" : "bg-primary text-white"]
                                  }, toDisplayString(menu.stock) + " Porsi ", 3)
                                ]),
                                createVNode("td", null, [
                                  createVNode("span", { class: "small fw-medium text-secondary" }, toDisplayString(menu.cost ? unref(formatIDR)(menu.cost) : "-"), 1)
                                ]),
                                createVNode("td", null, [
                                  createVNode("span", { class: "fw-bold text-success" }, toDisplayString(unref(formatIDR)(menu.price)), 1)
                                ]),
                                createVNode("td", null, [
                                  createVNode("span", {
                                    class: ["badge rounded-pill px-2 py-1", menu.is_published ? "bg-success text-white" : menu.workflow_status === "ready" ? "bg-info text-white" : "bg-secondary text-white"]
                                  }, toDisplayString(menu.is_published ? "✓ Tayang di Kasir" : menu.workflow_status === "ready" ? "Siap Dijual" : "Draft"), 3)
                                ]),
                                createVNode("td", { class: "small text-muted" }, [
                                  menu.latest_stock_movement ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createVNode("span", {
                                      class: menu.latest_stock_movement.change > 0 ? "text-success fw-bold" : "text-danger fw-bold"
                                    }, toDisplayString(menu.latest_stock_movement.change > 0 ? "+" : "") + toDisplayString(menu.latest_stock_movement.change), 3),
                                    createVNode("span", { class: "text-2xs d-block text-muted" }, toDisplayString(menu.latest_stock_movement.staff || "Sistem"), 1)
                                  ], 64)) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-muted"
                                  }, "-"))
                                ]),
                                createVNode("td", { class: "pe-4" }, [
                                  createVNode("div", { class: "d-flex gap-2 flex-wrap justify-content-center align-items-center" }, [
                                    createVNode("div", {
                                      class: "input-group input-group-sm",
                                      style: { "width": "140px" }
                                    }, [
                                      withDirectives(createVNode("input", {
                                        id: `stockAmount_${menu.id}`,
                                        "onUpdate:modelValue": ($event) => stockForms.value[`amount_${menu.id}`] = $event,
                                        type: "number",
                                        class: "form-control text-center",
                                        placeholder: "± Porsi",
                                        title: "Ketik angka positif untuk menambah stok, negatif untuk mengurangi"
                                      }, null, 8, ["id", "onUpdate:modelValue"]), [
                                        [vModelText, stockForms.value[`amount_${menu.id}`]]
                                      ]),
                                      createVNode("button", {
                                        class: "btn btn-primary",
                                        type: "button",
                                        onClick: ($event) => updateStock(menu.id),
                                        title: "Simpan perubahan stok"
                                      }, [
                                        createVNode("i", { class: "bi bi-check-lg" })
                                      ], 8, ["onClick"])
                                    ]),
                                    withDirectives(createVNode("select", {
                                      id: `stockReason_${menu.id}`,
                                      "onUpdate:modelValue": ($event) => stockForms.value[`reason_${menu.id}`] = $event,
                                      class: "form-select form-select-sm",
                                      style: { "width": "120px" }
                                    }, [
                                      createVNode("option", { value: "production" }, "➕ Produksi"),
                                      createVNode("option", { value: "correction" }, "🔧 Koreksi"),
                                      createVNode("option", { value: "damaged" }, "❌ Rusak"),
                                      createVNode("option", { value: "return" }, "🔄 Retur")
                                    ], 8, ["id", "onUpdate:modelValue"]), [
                                      [vModelSelect, stockForms.value[`reason_${menu.id}`]]
                                    ]),
                                    createVNode("button", {
                                      class: ["btn btn-sm rounded-pill px-3", menu.is_published ? "btn-outline-danger" : "btn-success"],
                                      onClick: ($event) => togglePublish(menu),
                                      title: menu.is_published ? "Tarik dari kasir (Sold out)" : "Aktifkan agar bisa dipesan di kasir"
                                    }, [
                                      createVNode("i", {
                                        class: [menu.is_published ? "bi bi-eye-slash-fill" : "bi bi-check-circle-fill", "me-1"]
                                      }, null, 2),
                                      createTextVNode(" " + toDisplayString(menu.is_published ? "Nonaktifkan" : "Tayangkan"), 1)
                                    ], 10, ["onClick", "title"])
                                  ])
                                ])
                              ]);
                            }), 128)),
                            !__props.menus.length ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "7",
                                class: "text-center text-muted py-5"
                              }, [
                                createVNode("i", { class: "bi bi-inbox display-6 d-block mb-2 text-muted opacity-50" }),
                                createTextVNode(" Belum ada menu terdaftar untuk stand ini. Silakan tambahkan menu baru di form di atas. ")
                              ])
                            ])) : createCommentVNode("", true)
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
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Business/ProductionPanel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProductionPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5420eff8"]]);
export {
  ProductionPanel as default
};
//# sourceMappingURL=ProductionPanel-RqPOrkAo.js.map
