import { ref, computed, watch, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, withDirectives, Fragment, renderList, vModelSelect, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass, ssrRenderTeleport } from "vue/server-renderer";
import { usePage, useForm, Head, router } from "@inertiajs/vue3";
import { f as formatIDR } from "./utils-DIF4pdrF.js";
import "./InputError-DkffFxkw.js";
import { S as StaffLayout } from "./StaffLayout-kVLGS8T_.js";
import { _ as _sfc_main$1 } from "./Notif-DL0SggHu.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "date-fns";
import "./ModalConfirmation-CaKJYApU.js";
import "vue-toastification";
const _sfc_main = {
  __name: "MenuBoard",
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
    expenseItems: {
      type: Array,
      default: () => []
    },
    menus: {
      type: Array,
      default: () => []
    },
    buyers: {
      type: Array,
      default: () => []
    },
    menu_category: {
      type: Object,
      default: () => ({})
    },
    food_tag_list: {
      type: Array,
      default: () => []
    },
    all_categories: {
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
    var _a, _b, _c, _d, _e;
    const route = (name, params = {}) => window.route(name, params);
    const props = __props;
    const { auth } = usePage().props;
    auth.user;
    const selectedStandId = ref(((_a = props.selectedStand) == null ? void 0 : _a.id) ?? ((_c = (_b = props.stands) == null ? void 0 : _b[0]) == null ? void 0 : _c.id) ?? null);
    const selectedMenuId = ref(((_e = (_d = props.menus) == null ? void 0 : _d[0]) == null ? void 0 : _e.id) ?? null);
    const activeTab = ref("delivery");
    const showGuideModal = ref(false);
    const menuSearch = ref("");
    const buyerSearch = ref("");
    const deliveryFilter = ref("all");
    const categoryFilter = ref("all");
    const recipeForm = useForm({
      components: []
    });
    const activeMenu = computed(() => props.menus.find((menu) => menu.id === selectedMenuId.value) ?? null);
    const filteredMenus = computed(() => {
      const keyword = menuSearch.value.trim().toLowerCase();
      return props.menus.filter((menu) => {
        const catMatch = categoryFilter.value === "all" || menu.category === categoryFilter.value;
        if (!catMatch) return false;
        if (!keyword) return true;
        return [menu.name, menu.category].filter(Boolean).some((value) => String(value).toLowerCase().includes(keyword));
      });
    });
    const filteredBuyers = computed(() => {
      const keyword = buyerSearch.value.trim().toLowerCase();
      return props.buyers.filter((buyer) => {
        const statusMatch = deliveryFilter.value === "all" || deliveryFilter.value === "delivered" && buyer.is_delivered || deliveryFilter.value === "pending" && !buyer.is_delivered;
        if (!statusMatch) return false;
        if (!keyword) return true;
        const haystack = [buyer.customer, buyer.order_type, buyer.send_option, ...(buyer.items || []).map((item) => item.menu)].filter(Boolean).join(" ").toLowerCase();
        return haystack.includes(keyword);
      });
    });
    const publishedMenuCount = computed(() => props.menus.filter((menu) => menu.is_published).length);
    const pendingDeliveryCount = computed(() => props.buyers.filter((buyer) => !buyer.is_delivered).length);
    const deliveredCount = computed(() => props.buyers.filter((buyer) => buyer.is_delivered).length);
    function filterStand() {
      router.get(route("staff.sales-distribution.index"), { stand_id: selectedStandId.value }, { preserveState: true, replace: true });
    }
    function buildRecipeComponents(menu) {
      return props.expenseItems.map((expense) => {
        var _a2;
        const currentComponent = (_a2 = menu == null ? void 0 : menu.recipe_components) == null ? void 0 : _a2.find((component) => component.stand_expense_id === expense.id);
        return {
          stand_expense_id: expense.id,
          name: expense.name,
          unit: expense.unit,
          total_price: expense.total_price,
          expense,
          quantity_used: (currentComponent == null ? void 0 : currentComponent.quantity_used) ?? 0
        };
      });
    }
    function syncRecipeMenu(menuId) {
      selectedMenuId.value = Number(menuId);
      const menu = props.menus.find((item) => item.id === selectedMenuId.value) ?? null;
      recipeForm.components = buildRecipeComponents(menu);
      activeTab.value = "recipe";
    }
    watch(
      () => props.menus,
      (menus) => {
        if (!menus.length) {
          selectedMenuId.value = null;
          recipeForm.components = buildRecipeComponents(null);
          return;
        }
        if (!selectedMenuId.value || !menus.some((menu) => menu.id === selectedMenuId.value)) {
          selectedMenuId.value = menus[0].id;
          recipeForm.components = buildRecipeComponents(menus[0]);
        }
      },
      { immediate: true }
    );
    function submitRecipe() {
      if (!selectedMenuId.value) return;
      recipeForm.transform((data) => ({
        ...data,
        components: data.components.filter((component) => Number(component.quantity_used) > 0).map(({ stand_expense_id, quantity_used }) => ({ stand_expense_id, quantity_used }))
      })).post(route("staff.sales-distribution.menu.recipe.store", { menu: selectedMenuId.value }), {
        preserveScroll: true
      });
    }
    function togglePublish(menu) {
      router.post(route("staff.sales-distribution.menu.publish", { menu: menu.id }), {}, { preserveScroll: true });
    }
    function toggleDelivery(buyer) {
      router.post(route("staff.sales-distribution.order.deliver", { sale: buyer.id }), {}, { preserveScroll: true });
    }
    function suggestPrice(cost) {
      if (!cost) return "-";
      return formatIDR(Math.ceil(cost * 1.3));
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Sales Distribution & Pengantaran" }, null, _parent));
      _push(ssrRenderComponent(StaffLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2;
          if (_push2) {
            _push2(`<div class="container-fluid py-3 py-md-4" data-v-b613ab18${_scopeId}>`);
            if (__props.notif) {
              _push2(ssrRenderComponent(_sfc_main$1, { notif: __props.notif }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="card border-0 shadow-sm rounded-4 bg-white mb-4" data-v-b613ab18${_scopeId}><div class="card-body p-4 d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-center" data-v-b613ab18${_scopeId}><div data-v-b613ab18${_scopeId}><div class="d-flex align-items-center gap-2 mb-1 flex-wrap" data-v-b613ab18${_scopeId}><span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-semibold" data-v-b613ab18${_scopeId}><i class="bi bi-cart-check-fill me-1" data-v-b613ab18${_scopeId}></i> Sales Distribution </span><span class="badge bg-light text-secondary border rounded-pill px-3 py-1" data-v-b613ab18${_scopeId}> Stand: ${ssrInterpolate(((_a2 = __props.selectedStand) == null ? void 0 : _a2.name) || "Semua Stand")}</span></div><h4 class="mb-1 fw-bold text-dark" data-v-b613ab18${_scopeId}>Manajemen Penjualan, Etalase &amp; Pengantaran</h4><p class="text-secondary mb-0 small" data-v-b613ab18${_scopeId}> Pantau antrean pengantaran pesanan, atur ketersediaan menu di web toko, dan kelola HPP resep produk. </p></div><div class="d-flex gap-2 align-items-center flex-wrap" data-v-b613ab18${_scopeId}><button type="button" class="btn btn-warning text-dark fw-bold rounded-pill px-3 py-2 shadow-2xs d-inline-flex align-items-center gap-2 hover-lift transition-all" data-v-b613ab18${_scopeId}><i class="bi bi-lightbulb-fill text-dark fs-6" data-v-b613ab18${_scopeId}></i><span data-v-b613ab18${_scopeId}>Panduan Alur Fitur</span></button><div class="d-flex align-items-center gap-1 bg-light p-1 ps-2 rounded-pill border" data-v-b613ab18${_scopeId}><i class="bi bi-shop text-muted small" data-v-b613ab18${_scopeId}></i><select class="form-select form-select-sm border-0 bg-transparent fw-medium pe-4" style="${ssrRenderStyle({ "min-width": "180px" })}" data-v-b613ab18${_scopeId}><!--[-->`);
            ssrRenderList(__props.stands, (stand) => {
              _push2(`<option${ssrRenderAttr("value", stand.id)} data-v-b613ab18${ssrIncludeBooleanAttr(Array.isArray(selectedStandId.value) ? ssrLooseContain(selectedStandId.value, stand.id) : ssrLooseEqual(selectedStandId.value, stand.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(stand.name)}</option>`);
            });
            _push2(`<!--]--></select></div></div></div></div><div class="row g-3 mb-4" data-v-b613ab18${_scopeId}><div class="col-12 col-sm-6 col-lg-4" data-v-b613ab18${_scopeId}><div class="${ssrRenderClass([pendingDeliveryCount.value > 0 ? "bg-warning bg-opacity-10 border-start border-4 border-warning" : "bg-white", "card border-0 shadow-sm rounded-4 p-3 transition-all cursor-pointer h-100"])}" data-v-b613ab18${_scopeId}><div class="d-flex justify-content-between align-items-center" data-v-b613ab18${_scopeId}><div data-v-b613ab18${_scopeId}><span class="text-secondary small fw-medium" data-v-b613ab18${_scopeId}>Antrean Menunggu Pengantaran</span><div class="${ssrRenderClass([pendingDeliveryCount.value > 0 ? "text-danger" : "text-dark", "fs-3 fw-bold mt-1"])}" data-v-b613ab18${_scopeId}>${ssrInterpolate(pendingDeliveryCount.value)} Pesanan </div><small class="text-muted d-block mt-1" data-v-b613ab18${_scopeId}>Perlu diantar ke pemesan</small></div><div class="${ssrRenderClass([pendingDeliveryCount.value > 0 ? "bg-warning text-dark" : "bg-light text-secondary", "rounded-circle p-3 d-flex align-items-center justify-content-center"])}" style="${ssrRenderStyle({ "width": "52px", "height": "52px" })}" data-v-b613ab18${_scopeId}><i class="bi bi-box-seam fs-4" data-v-b613ab18${_scopeId}></i></div></div></div></div><div class="col-12 col-sm-6 col-lg-4" data-v-b613ab18${_scopeId}><div class="card border-0 shadow-sm rounded-4 p-3 bg-white h-100 cursor-pointer" data-v-b613ab18${_scopeId}><div class="d-flex justify-content-between align-items-center" data-v-b613ab18${_scopeId}><div data-v-b613ab18${_scopeId}><span class="text-secondary small fw-medium" data-v-b613ab18${_scopeId}>Order Selesai Diantar</span><div class="fs-3 fw-bold text-success mt-1" data-v-b613ab18${_scopeId}>${ssrInterpolate(deliveredCount.value)} Pesanan </div><small class="text-muted d-block mt-1" data-v-b613ab18${_scopeId}>Telah diserahkan ke pelanggan</small></div><div class="rounded-circle p-3 bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center" style="${ssrRenderStyle({ "width": "52px", "height": "52px" })}" data-v-b613ab18${_scopeId}><i class="bi bi-check2-circle fs-4" data-v-b613ab18${_scopeId}></i></div></div></div></div><div class="col-12 col-sm-6 col-lg-4" data-v-b613ab18${_scopeId}><div class="card border-0 shadow-sm rounded-4 p-3 bg-white h-100 cursor-pointer" data-v-b613ab18${_scopeId}><div class="d-flex justify-content-between align-items-center" data-v-b613ab18${_scopeId}><div data-v-b613ab18${_scopeId}><span class="text-secondary small fw-medium" data-v-b613ab18${_scopeId}>Menu Tayang di Toko Online</span><div class="fs-3 fw-bold text-primary mt-1" data-v-b613ab18${_scopeId}>${ssrInterpolate(publishedMenuCount.value)} / ${ssrInterpolate(__props.menus.length)} Menu </div><small class="text-muted d-block mt-1" data-v-b613ab18${_scopeId}>Aktif &amp; dapat dibeli konsumen</small></div><div class="rounded-circle p-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center" style="${ssrRenderStyle({ "width": "52px", "height": "52px" })}" data-v-b613ab18${_scopeId}><i class="bi bi-shop fs-4" data-v-b613ab18${_scopeId}></i></div></div></div></div></div><div class="card border-0 shadow-sm rounded-4 bg-white mb-4" data-v-b613ab18${_scopeId}><div class="card-header bg-white border-bottom p-2 px-3" data-v-b613ab18${_scopeId}><ul class="nav nav-pills gap-2 flex-wrap" role="tablist" data-v-b613ab18${_scopeId}><li class="nav-item" role="presentation" data-v-b613ab18${_scopeId}><button class="${ssrRenderClass([{ active: activeTab.value === "delivery" }, "nav-link rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2"])}" type="button" data-v-b613ab18${_scopeId}><i class="bi bi-box-seam" data-v-b613ab18${_scopeId}></i><span data-v-b613ab18${_scopeId}>Pengantaran Pesanan (Delivery)</span>`);
            if (pendingDeliveryCount.value > 0) {
              _push2(`<span class="badge bg-danger rounded-pill ms-1" data-v-b613ab18${_scopeId}>${ssrInterpolate(pendingDeliveryCount.value)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button></li><li class="nav-item" role="presentation" data-v-b613ab18${_scopeId}><button class="${ssrRenderClass([{ active: activeTab.value === "catalog" }, "nav-link rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2"])}" type="button" data-v-b613ab18${_scopeId}><i class="bi bi-grid" data-v-b613ab18${_scopeId}></i><span data-v-b613ab18${_scopeId}>Etalase &amp; Publikasi Toko</span><span class="badge bg-secondary rounded-pill ms-1" data-v-b613ab18${_scopeId}>${ssrInterpolate(__props.menus.length)}</span></button></li><li class="nav-item" role="presentation" data-v-b613ab18${_scopeId}><button class="${ssrRenderClass([{ active: activeTab.value === "recipe" }, "nav-link rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2"])}" type="button" data-v-b613ab18${_scopeId}><i class="bi bi-card-checklist" data-v-b613ab18${_scopeId}></i><span data-v-b613ab18${_scopeId}>Resep &amp; Kalkulasi HPP</span></button></li></ul></div><div class="card-body p-3 p-md-4" data-v-b613ab18${_scopeId}>`);
            if (activeTab.value === "delivery") {
              _push2(`<div class="delivery-tab-pane" data-v-b613ab18${_scopeId}><div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2" data-v-b613ab18${_scopeId}><div data-v-b613ab18${_scopeId}><h5 class="fw-bold text-dark mb-1" data-v-b613ab18${_scopeId}><i class="bi bi-bicycle text-primary me-1" data-v-b613ab18${_scopeId}></i> Antrean Pengantaran Pesanan Konsumen </h5><small class="text-muted" data-v-b613ab18${_scopeId}>Kelola pesanan yang masuk dan tandai pesanan yang telah berhasil diantar ke pembeli.</small></div><div class="d-flex gap-2 align-items-center flex-wrap" data-v-b613ab18${_scopeId}><div class="input-group input-group-sm" style="${ssrRenderStyle({ "width": "220px" })}" data-v-b613ab18${_scopeId}><span class="input-group-text bg-light" data-v-b613ab18${_scopeId}><i class="bi bi-search" data-v-b613ab18${_scopeId}></i></span><input${ssrRenderAttr("value", buyerSearch.value)} type="search" class="form-control" placeholder="Cari pembeli / menu..." data-v-b613ab18${_scopeId}></div><select class="form-select form-select-sm" style="${ssrRenderStyle({ "width": "170px" })}" data-v-b613ab18${_scopeId}><option value="all" data-v-b613ab18${ssrIncludeBooleanAttr(Array.isArray(deliveryFilter.value) ? ssrLooseContain(deliveryFilter.value, "all") : ssrLooseEqual(deliveryFilter.value, "all")) ? " selected" : ""}${_scopeId}>Semua Status (${ssrInterpolate(__props.buyers.length)})</option><option value="pending" data-v-b613ab18${ssrIncludeBooleanAttr(Array.isArray(deliveryFilter.value) ? ssrLooseContain(deliveryFilter.value, "pending") : ssrLooseEqual(deliveryFilter.value, "pending")) ? " selected" : ""}${_scopeId}>🛵 Belum Diantar (${ssrInterpolate(pendingDeliveryCount.value)})</option><option value="delivered" data-v-b613ab18${ssrIncludeBooleanAttr(Array.isArray(deliveryFilter.value) ? ssrLooseContain(deliveryFilter.value, "delivered") : ssrLooseEqual(deliveryFilter.value, "delivered")) ? " selected" : ""}${_scopeId}>✓ Sudah Diantar (${ssrInterpolate(deliveredCount.value)})</option></select></div></div><div class="table-responsive rounded-3 border" data-v-b613ab18${_scopeId}><table class="table align-middle table-hover mb-0" data-v-b613ab18${_scopeId}><thead class="table-light" data-v-b613ab18${_scopeId}><tr data-v-b613ab18${_scopeId}><th class="ps-3 fw-semibold small text-secondary" data-v-b613ab18${_scopeId}>Pembeli &amp; Opsi Kirim</th><th class="fw-semibold small text-secondary" data-v-b613ab18${_scopeId}>Rincian Menu &amp; Jumlah</th><th class="fw-semibold small text-secondary" data-v-b613ab18${_scopeId}>Total Transaksi</th><th class="fw-semibold small text-secondary" data-v-b613ab18${_scopeId}>Status Pengantaran</th><th class="text-center fw-semibold small text-secondary pe-3" data-v-b613ab18${_scopeId}>Aksi Petugas</th></tr></thead><tbody data-v-b613ab18${_scopeId}><!--[-->`);
              ssrRenderList(filteredBuyers.value, (buyer) => {
                _push2(`<tr data-v-b613ab18${_scopeId}><td class="ps-3" data-v-b613ab18${_scopeId}><div class="fw-bold text-dark" data-v-b613ab18${_scopeId}>${ssrInterpolate(buyer.customer)}</div><div class="d-flex gap-1 mt-1" data-v-b613ab18${_scopeId}><span class="badge bg-light text-secondary border small" data-v-b613ab18${_scopeId}>${ssrInterpolate(buyer.order_type || "Takeaway")}</span><span class="badge bg-primary-subtle text-primary border border-primary-subtle small" data-v-b613ab18${_scopeId}>${ssrInterpolate(buyer.send_option || "Delivery")}</span></div></td><td data-v-b613ab18${_scopeId}><div class="d-flex flex-column gap-1" data-v-b613ab18${_scopeId}><!--[-->`);
                ssrRenderList(buyer.items, (item) => {
                  _push2(`<div class="small fw-medium text-dark" data-v-b613ab18${_scopeId}> • ${ssrInterpolate(item.menu)} <span class="badge bg-light text-dark border ms-1" data-v-b613ab18${_scopeId}>${ssrInterpolate(item.amount)}x</span></div>`);
                });
                _push2(`<!--]--></div></td><td data-v-b613ab18${_scopeId}><span class="fw-bold text-success" data-v-b613ab18${_scopeId}>${ssrInterpolate(unref(formatIDR)(buyer.transaction))}</span></td><td data-v-b613ab18${_scopeId}><span class="${ssrRenderClass([buyer.is_delivered ? "bg-success text-white" : "bg-warning text-dark", "badge rounded-pill px-3 py-1 fw-bold"])}" data-v-b613ab18${_scopeId}>${ssrInterpolate(buyer.is_delivered ? "✓ Sudah Diantar" : "🛵 Belum Diantar")}</span></td><td class="text-center pe-3" data-v-b613ab18${_scopeId}><button class="${ssrRenderClass([buyer.is_delivered ? "btn-outline-danger" : "btn-success text-white", "btn btn-sm rounded-pill px-3 fw-semibold d-inline-flex align-items-center gap-1 shadow-2xs"])}"${ssrRenderAttr("title", buyer.is_delivered ? "Batalkan status sudah diantar" : "Konfirmasi pesanan telah sampai ke tangan pemesan")} data-v-b613ab18${_scopeId}><i class="${ssrRenderClass(buyer.is_delivered ? "bi bi-arrow-counterclockwise" : "bi bi-check2-circle")}" data-v-b613ab18${_scopeId}></i><span data-v-b613ab18${_scopeId}>${ssrInterpolate(buyer.is_delivered ? "Batalkan" : "Tandai Sudah Diantar")}</span></button></td></tr>`);
              });
              _push2(`<!--]-->`);
              if (!filteredBuyers.value.length) {
                _push2(`<tr data-v-b613ab18${_scopeId}><td colspan="5" class="text-center text-muted py-5" data-v-b613ab18${_scopeId}><i class="bi bi-inbox display-6 d-block mb-2 text-muted opacity-50" data-v-b613ab18${_scopeId}></i> Tidak ada data pesanan yang cocok dengan filter. </td></tr>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</tbody></table></div></div>`);
            } else if (activeTab.value === "catalog") {
              _push2(`<div class="catalog-tab-pane" data-v-b613ab18${_scopeId}><div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2" data-v-b613ab18${_scopeId}><div data-v-b613ab18${_scopeId}><h5 class="fw-bold text-dark mb-1" data-v-b613ab18${_scopeId}><i class="bi bi-grid text-primary me-1" data-v-b613ab18${_scopeId}></i> Katalog Menu Stand &amp; Status Toko Online </h5><small class="text-muted" data-v-b613ab18${_scopeId}>Tentukan menu mana yang boleh tampil dan dipesan oleh pelanggan di web \`/shop\`.</small></div><div class="d-flex gap-2 align-items-center flex-wrap" data-v-b613ab18${_scopeId}><div class="input-group input-group-sm" style="${ssrRenderStyle({ "width": "220px" })}" data-v-b613ab18${_scopeId}><span class="input-group-text bg-light" data-v-b613ab18${_scopeId}><i class="bi bi-search" data-v-b613ab18${_scopeId}></i></span><input${ssrRenderAttr("value", menuSearch.value)} type="search" class="form-control" placeholder="Cari nama menu..." data-v-b613ab18${_scopeId}></div><select class="form-select form-select-sm" style="${ssrRenderStyle({ "width": "170px" })}" data-v-b613ab18${_scopeId}><option value="all" data-v-b613ab18${ssrIncludeBooleanAttr(Array.isArray(categoryFilter.value) ? ssrLooseContain(categoryFilter.value, "all") : ssrLooseEqual(categoryFilter.value, "all")) ? " selected" : ""}${_scopeId}>Semua Kategori</option><!--[-->`);
              ssrRenderList(__props.all_categories, (cat) => {
                _push2(`<option${ssrRenderAttr("value", cat)} data-v-b613ab18${ssrIncludeBooleanAttr(Array.isArray(categoryFilter.value) ? ssrLooseContain(categoryFilter.value, cat) : ssrLooseEqual(categoryFilter.value, cat)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(cat)}</option>`);
              });
              _push2(`<!--]--></select></div></div><div class="table-responsive rounded-3 border" data-v-b613ab18${_scopeId}><table class="table align-middle table-hover mb-0" data-v-b613ab18${_scopeId}><thead class="table-light" data-v-b613ab18${_scopeId}><tr data-v-b613ab18${_scopeId}><th class="ps-3 fw-semibold small text-secondary" data-v-b613ab18${_scopeId}>Menu</th><th class="fw-semibold small text-secondary" data-v-b613ab18${_scopeId}>Stok &amp; Penjualan</th><th class="fw-semibold small text-secondary" data-v-b613ab18${_scopeId}>HPP (Biaya)</th><th class="fw-semibold small text-secondary" data-v-b613ab18${_scopeId}>Harga Jual</th><th class="fw-semibold small text-secondary" data-v-b613ab18${_scopeId}>Status Toko</th><th class="text-center fw-semibold small text-secondary pe-3" data-v-b613ab18${_scopeId}>Aksi Publikasi &amp; Resep</th></tr></thead><tbody data-v-b613ab18${_scopeId}><!--[-->`);
              ssrRenderList(filteredMenus.value, (menu) => {
                _push2(`<tr data-v-b613ab18${_scopeId}><td class="ps-3" data-v-b613ab18${_scopeId}><div class="fw-bold text-dark" data-v-b613ab18${_scopeId}>${ssrInterpolate(menu.name)}</div><span class="badge bg-light text-secondary border small" data-v-b613ab18${_scopeId}>${ssrInterpolate(menu.category)}</span></td><td data-v-b613ab18${_scopeId}><div class="small fw-medium text-dark" data-v-b613ab18${_scopeId}>Stok: <strong data-v-b613ab18${_scopeId}>${ssrInterpolate(menu.stock)}</strong> porsi</div><small class="text-muted" data-v-b613ab18${_scopeId}>Terjual: ${ssrInterpolate(menu.sale)} porsi</small></td><td data-v-b613ab18${_scopeId}><span class="${ssrRenderClass([menu.cost ? "text-secondary" : "text-danger", "small fw-medium"])}" data-v-b613ab18${_scopeId}>${ssrInterpolate(menu.cost ? unref(formatIDR)(menu.cost) : "Belum diset")}</span></td><td data-v-b613ab18${_scopeId}><span class="fw-bold text-success" data-v-b613ab18${_scopeId}>${ssrInterpolate(unref(formatIDR)(menu.price))}</span></td><td data-v-b613ab18${_scopeId}><span class="${ssrRenderClass([menu.is_published ? "bg-success text-white" : "bg-secondary text-white", "badge rounded-pill px-3 py-1 fw-bold"])}" data-v-b613ab18${_scopeId}>${ssrInterpolate(menu.is_published ? "🟢 Tayang di Toko" : "⚪ Draft / Sembunyi")}</span></td><td class="text-center pe-3" data-v-b613ab18${_scopeId}><div class="d-flex gap-2 justify-content-center" data-v-b613ab18${_scopeId}><button type="button" class="btn btn-outline-primary btn-sm rounded-pill px-3 shadow-2xs" title="Buka kalkulator resep bahan &amp; HPP untuk menu ini" data-v-b613ab18${_scopeId}><i class="bi bi-card-checklist me-1" data-v-b613ab18${_scopeId}></i> Resep &amp; HPP </button><button type="button" class="${ssrRenderClass([menu.is_published ? "btn-outline-danger" : "btn-success text-white", "btn btn-sm rounded-pill px-3 shadow-2xs fw-semibold"])}"${ssrRenderAttr("title", menu.is_published ? "Tarik menu dari toko online pelanggan" : "Tampilkan menu di toko online pelanggan")} data-v-b613ab18${_scopeId}><i class="${ssrRenderClass(menu.is_published ? "bi bi-eye-slash" : "bi bi-eye")}" data-v-b613ab18${_scopeId}></i><span data-v-b613ab18${_scopeId}>${ssrInterpolate(menu.is_published ? "Tarik (Unpublish)" : "Tayangkan (Publish)")}</span></button></div></td></tr>`);
              });
              _push2(`<!--]-->`);
              if (!filteredMenus.value.length) {
                _push2(`<tr data-v-b613ab18${_scopeId}><td colspan="6" class="text-center text-muted py-5" data-v-b613ab18${_scopeId}><i class="bi bi-inbox display-6 d-block mb-2 text-muted opacity-50" data-v-b613ab18${_scopeId}></i> Tidak ada menu yang sesuai dengan pencarian. </td></tr>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</tbody></table></div></div>`);
            } else if (activeTab.value === "recipe") {
              _push2(`<div class="recipe-tab-pane" data-v-b613ab18${_scopeId}><div class="row g-4" data-v-b613ab18${_scopeId}><div class="col-12 col-lg-4" data-v-b613ab18${_scopeId}><div class="p-3 p-md-4 rounded-4 bg-light border h-100" data-v-b613ab18${_scopeId}><h6 class="fw-bold text-dark mb-3 d-flex align-items-center gap-2" data-v-b613ab18${_scopeId}><i class="bi bi-calculator-fill text-primary" data-v-b613ab18${_scopeId}></i> Pilih Menu &amp; Rangkuman Biaya </h6><div class="mb-3" data-v-b613ab18${_scopeId}><label class="form-label small fw-semibold text-secondary" data-v-b613ab18${_scopeId}>Pilih Menu yang Dihitung:</label><select class="form-select form-select-sm rounded-3 fw-medium" data-v-b613ab18${_scopeId}><!--[-->`);
              ssrRenderList(__props.menus, (menu) => {
                _push2(`<option${ssrRenderAttr("value", menu.id)} data-v-b613ab18${ssrIncludeBooleanAttr(Array.isArray(selectedMenuId.value) ? ssrLooseContain(selectedMenuId.value, menu.id) : ssrLooseEqual(selectedMenuId.value, menu.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(menu.name)}</option>`);
              });
              _push2(`<!--]--></select></div>`);
              if (activeMenu.value) {
                _push2(`<div class="cost-summary-card card border-0 shadow-2xs p-3 rounded-3 bg-white mb-3" data-v-b613ab18${_scopeId}><div class="fw-bold text-dark mb-2" data-v-b613ab18${_scopeId}>${ssrInterpolate(activeMenu.value.name)}</div><div class="d-flex justify-content-between py-1 border-bottom small" data-v-b613ab18${_scopeId}><span class="text-muted" data-v-b613ab18${_scopeId}>Biaya Produksi (HPP):</span><span class="${ssrRenderClass([activeMenu.value.cost ? "text-primary" : "text-danger", "fw-bold"])}" data-v-b613ab18${_scopeId}>${ssrInterpolate(activeMenu.value.cost ? unref(formatIDR)(activeMenu.value.cost) : "Belum dihitung")}</span></div><div class="d-flex justify-content-between py-1 border-bottom small" data-v-b613ab18${_scopeId}><span class="text-muted" data-v-b613ab18${_scopeId}>Saran Harga (+30%):</span><span class="fw-semibold text-success" data-v-b613ab18${_scopeId}>${ssrInterpolate(suggestPrice(activeMenu.value.cost))}</span></div><div class="d-flex justify-content-between py-1 small" data-v-b613ab18${_scopeId}><span class="text-muted" data-v-b613ab18${_scopeId}>Harga Jual Saat Ini:</span><span class="fw-bold text-dark" data-v-b613ab18${_scopeId}>${ssrInterpolate(unref(formatIDR)(activeMenu.value.price))}</span></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (activeMenu.value) {
                _push2(`<div class="d-grid gap-2" data-v-b613ab18${_scopeId}><button type="button" class="${ssrRenderClass([activeMenu.value.is_published ? "btn-outline-danger" : "btn-success", "btn btn-sm rounded-pill fw-semibold py-2"])}" data-v-b613ab18${_scopeId}><i class="${ssrRenderClass(activeMenu.value.is_published ? "bi bi-eye-slash me-1" : "bi bi-check-circle me-1")}" data-v-b613ab18${_scopeId}></i> ${ssrInterpolate(activeMenu.value.is_published ? "Tarik dari Toko (Unpublish)" : "Tayangkan Menu ke Toko")}</button></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="col-12 col-lg-8" data-v-b613ab18${_scopeId}><div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2" data-v-b613ab18${_scopeId}><div data-v-b613ab18${_scopeId}><h6 class="fw-bold text-dark mb-1" data-v-b613ab18${_scopeId}><i class="bi bi-basket3-fill text-warning me-1" data-v-b613ab18${_scopeId}></i> Komposisi Bahan Baku Stand </h6><small class="text-muted" data-v-b613ab18${_scopeId}>Masukkan takaran bahan belanja yang digunakan per porsi menu ini.</small></div><button type="button" class="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm btn-sm"${ssrIncludeBooleanAttr(unref(recipeForm).processing) ? " disabled" : ""} data-v-b613ab18${_scopeId}>`);
              if (unref(recipeForm).processing) {
                _push2(`<span class="spinner-border spinner-border-sm me-1" data-v-b613ab18${_scopeId}></span>`);
              } else {
                _push2(`<i class="bi bi-save me-1" data-v-b613ab18${_scopeId}></i>`);
              }
              _push2(`<span data-v-b613ab18${_scopeId}>Simpan Resep Menu</span></button></div><div class="table-responsive rounded-3 border" data-v-b613ab18${_scopeId}><table class="table align-middle table-hover mb-0" data-v-b613ab18${_scopeId}><thead class="table-light" data-v-b613ab18${_scopeId}><tr data-v-b613ab18${_scopeId}><th class="ps-3 fw-semibold small text-secondary" data-v-b613ab18${_scopeId}>Nama Bahan Belanja</th><th class="fw-semibold small text-secondary" style="${ssrRenderStyle({ "width": "180px" })}" data-v-b613ab18${_scopeId}>Takaran / Porsi</th><th class="text-end pe-3 fw-semibold small text-secondary" data-v-b613ab18${_scopeId}>Estimasi Biaya Bahan</th></tr></thead><tbody data-v-b613ab18${_scopeId}><!--[-->`);
              ssrRenderList(unref(recipeForm).components, (component, index) => {
                var _a3, _b3;
                _push2(`<tr data-v-b613ab18${_scopeId}><td class="ps-3" data-v-b613ab18${_scopeId}><div class="fw-bold text-dark" data-v-b613ab18${_scopeId}>${ssrInterpolate(component.name)}</div><small class="text-muted" data-v-b613ab18${_scopeId}> Harga Beli: ${ssrInterpolate(unref(formatIDR)(component.total_price))} per ${ssrInterpolate(((_a3 = component.expense) == null ? void 0 : _a3.qty) || 1)} ${ssrInterpolate(component.unit)}</small></td><td data-v-b613ab18${_scopeId}><div class="input-group input-group-sm" data-v-b613ab18${_scopeId}><input${ssrRenderAttr("value", unref(recipeForm).components[index].quantity_used)} type="number" min="0" step="0.01" class="form-control text-center" placeholder="0" data-v-b613ab18${_scopeId}><span class="input-group-text bg-light small" data-v-b613ab18${_scopeId}>${ssrInterpolate(component.unit)}</span></div></td><td class="text-end pe-3" data-v-b613ab18${_scopeId}>`);
                if (component.quantity_used > 0) {
                  _push2(`<span class="fw-bold text-dark" data-v-b613ab18${_scopeId}>${ssrInterpolate(unref(formatIDR)(component.total_price / (((_b3 = component.expense) == null ? void 0 : _b3.qty) || 1) * component.quantity_used))}</span>`);
                } else {
                  _push2(`<span class="text-muted small" data-v-b613ab18${_scopeId}>-</span>`);
                }
                _push2(`</td></tr>`);
              });
              _push2(`<!--]-->`);
              if (!unref(recipeForm).components.length) {
                _push2(`<tr data-v-b613ab18${_scopeId}><td colspan="3" class="text-center text-muted py-5" data-v-b613ab18${_scopeId}><i class="bi bi-receipt display-6 d-block mb-2 text-muted opacity-50" data-v-b613ab18${_scopeId}></i> Belum ada item belanja pengeluaran yang divalidasi pada stand ini. </td></tr>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</tbody></table></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-fluid py-3 py-md-4" }, [
                __props.notif ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 0,
                  notif: __props.notif
                }, null, 8, ["notif"])) : createCommentVNode("", true),
                createVNode("div", { class: "card border-0 shadow-sm rounded-4 bg-white mb-4" }, [
                  createVNode("div", { class: "card-body p-4 d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-center" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "d-flex align-items-center gap-2 mb-1 flex-wrap" }, [
                        createVNode("span", { class: "badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-semibold" }, [
                          createVNode("i", { class: "bi bi-cart-check-fill me-1" }),
                          createTextVNode(" Sales Distribution ")
                        ]),
                        createVNode("span", { class: "badge bg-light text-secondary border rounded-pill px-3 py-1" }, " Stand: " + toDisplayString(((_b2 = __props.selectedStand) == null ? void 0 : _b2.name) || "Semua Stand"), 1)
                      ]),
                      createVNode("h4", { class: "mb-1 fw-bold text-dark" }, "Manajemen Penjualan, Etalase & Pengantaran"),
                      createVNode("p", { class: "text-secondary mb-0 small" }, " Pantau antrean pengantaran pesanan, atur ketersediaan menu di web toko, dan kelola HPP resep produk. ")
                    ]),
                    createVNode("div", { class: "d-flex gap-2 align-items-center flex-wrap" }, [
                      createVNode("button", {
                        type: "button",
                        class: "btn btn-warning text-dark fw-bold rounded-pill px-3 py-2 shadow-2xs d-inline-flex align-items-center gap-2 hover-lift transition-all",
                        onClick: ($event) => showGuideModal.value = true
                      }, [
                        createVNode("i", { class: "bi bi-lightbulb-fill text-dark fs-6" }),
                        createVNode("span", null, "Panduan Alur Fitur")
                      ], 8, ["onClick"]),
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
                ]),
                createVNode("div", { class: "row g-3 mb-4" }, [
                  createVNode("div", { class: "col-12 col-sm-6 col-lg-4" }, [
                    createVNode("div", {
                      class: ["card border-0 shadow-sm rounded-4 p-3 transition-all cursor-pointer h-100", pendingDeliveryCount.value > 0 ? "bg-warning bg-opacity-10 border-start border-4 border-warning" : "bg-white"],
                      onClick: ($event) => activeTab.value = "delivery"
                    }, [
                      createVNode("div", { class: "d-flex justify-content-between align-items-center" }, [
                        createVNode("div", null, [
                          createVNode("span", { class: "text-secondary small fw-medium" }, "Antrean Menunggu Pengantaran"),
                          createVNode("div", {
                            class: ["fs-3 fw-bold mt-1", pendingDeliveryCount.value > 0 ? "text-danger" : "text-dark"]
                          }, toDisplayString(pendingDeliveryCount.value) + " Pesanan ", 3),
                          createVNode("small", { class: "text-muted d-block mt-1" }, "Perlu diantar ke pemesan")
                        ]),
                        createVNode("div", {
                          class: ["rounded-circle p-3 d-flex align-items-center justify-content-center", pendingDeliveryCount.value > 0 ? "bg-warning text-dark" : "bg-light text-secondary"],
                          style: { "width": "52px", "height": "52px" }
                        }, [
                          createVNode("i", { class: "bi bi-box-seam fs-4" })
                        ], 2)
                      ])
                    ], 10, ["onClick"])
                  ]),
                  createVNode("div", { class: "col-12 col-sm-6 col-lg-4" }, [
                    createVNode("div", {
                      class: "card border-0 shadow-sm rounded-4 p-3 bg-white h-100 cursor-pointer",
                      onClick: ($event) => activeTab.value = "delivery"
                    }, [
                      createVNode("div", { class: "d-flex justify-content-between align-items-center" }, [
                        createVNode("div", null, [
                          createVNode("span", { class: "text-secondary small fw-medium" }, "Order Selesai Diantar"),
                          createVNode("div", { class: "fs-3 fw-bold text-success mt-1" }, toDisplayString(deliveredCount.value) + " Pesanan ", 1),
                          createVNode("small", { class: "text-muted d-block mt-1" }, "Telah diserahkan ke pelanggan")
                        ]),
                        createVNode("div", {
                          class: "rounded-circle p-3 bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center",
                          style: { "width": "52px", "height": "52px" }
                        }, [
                          createVNode("i", { class: "bi bi-check2-circle fs-4" })
                        ])
                      ])
                    ], 8, ["onClick"])
                  ]),
                  createVNode("div", { class: "col-12 col-sm-6 col-lg-4" }, [
                    createVNode("div", {
                      class: "card border-0 shadow-sm rounded-4 p-3 bg-white h-100 cursor-pointer",
                      onClick: ($event) => activeTab.value = "catalog"
                    }, [
                      createVNode("div", { class: "d-flex justify-content-between align-items-center" }, [
                        createVNode("div", null, [
                          createVNode("span", { class: "text-secondary small fw-medium" }, "Menu Tayang di Toko Online"),
                          createVNode("div", { class: "fs-3 fw-bold text-primary mt-1" }, toDisplayString(publishedMenuCount.value) + " / " + toDisplayString(__props.menus.length) + " Menu ", 1),
                          createVNode("small", { class: "text-muted d-block mt-1" }, "Aktif & dapat dibeli konsumen")
                        ]),
                        createVNode("div", {
                          class: "rounded-circle p-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center",
                          style: { "width": "52px", "height": "52px" }
                        }, [
                          createVNode("i", { class: "bi bi-shop fs-4" })
                        ])
                      ])
                    ], 8, ["onClick"])
                  ])
                ]),
                createVNode("div", { class: "card border-0 shadow-sm rounded-4 bg-white mb-4" }, [
                  createVNode("div", { class: "card-header bg-white border-bottom p-2 px-3" }, [
                    createVNode("ul", {
                      class: "nav nav-pills gap-2 flex-wrap",
                      role: "tablist"
                    }, [
                      createVNode("li", {
                        class: "nav-item",
                        role: "presentation"
                      }, [
                        createVNode("button", {
                          class: ["nav-link rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2", { active: activeTab.value === "delivery" }],
                          type: "button",
                          onClick: ($event) => activeTab.value = "delivery"
                        }, [
                          createVNode("i", { class: "bi bi-box-seam" }),
                          createVNode("span", null, "Pengantaran Pesanan (Delivery)"),
                          pendingDeliveryCount.value > 0 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "badge bg-danger rounded-pill ms-1"
                          }, toDisplayString(pendingDeliveryCount.value), 1)) : createCommentVNode("", true)
                        ], 10, ["onClick"])
                      ]),
                      createVNode("li", {
                        class: "nav-item",
                        role: "presentation"
                      }, [
                        createVNode("button", {
                          class: ["nav-link rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2", { active: activeTab.value === "catalog" }],
                          type: "button",
                          onClick: ($event) => activeTab.value = "catalog"
                        }, [
                          createVNode("i", { class: "bi bi-grid" }),
                          createVNode("span", null, "Etalase & Publikasi Toko"),
                          createVNode("span", { class: "badge bg-secondary rounded-pill ms-1" }, toDisplayString(__props.menus.length), 1)
                        ], 10, ["onClick"])
                      ]),
                      createVNode("li", {
                        class: "nav-item",
                        role: "presentation"
                      }, [
                        createVNode("button", {
                          class: ["nav-link rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2", { active: activeTab.value === "recipe" }],
                          type: "button",
                          onClick: ($event) => activeTab.value = "recipe"
                        }, [
                          createVNode("i", { class: "bi bi-card-checklist" }),
                          createVNode("span", null, "Resep & Kalkulasi HPP")
                        ], 10, ["onClick"])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "card-body p-3 p-md-4" }, [
                    activeTab.value === "delivery" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "delivery-tab-pane"
                    }, [
                      createVNode("div", { class: "d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2" }, [
                        createVNode("div", null, [
                          createVNode("h5", { class: "fw-bold text-dark mb-1" }, [
                            createVNode("i", { class: "bi bi-bicycle text-primary me-1" }),
                            createTextVNode(" Antrean Pengantaran Pesanan Konsumen ")
                          ]),
                          createVNode("small", { class: "text-muted" }, "Kelola pesanan yang masuk dan tandai pesanan yang telah berhasil diantar ke pembeli.")
                        ]),
                        createVNode("div", { class: "d-flex gap-2 align-items-center flex-wrap" }, [
                          createVNode("div", {
                            class: "input-group input-group-sm",
                            style: { "width": "220px" }
                          }, [
                            createVNode("span", { class: "input-group-text bg-light" }, [
                              createVNode("i", { class: "bi bi-search" })
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => buyerSearch.value = $event,
                              type: "search",
                              class: "form-control",
                              placeholder: "Cari pembeli / menu..."
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, buyerSearch.value]
                            ])
                          ]),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => deliveryFilter.value = $event,
                            class: "form-select form-select-sm",
                            style: { "width": "170px" }
                          }, [
                            createVNode("option", { value: "all" }, "Semua Status (" + toDisplayString(__props.buyers.length) + ")", 1),
                            createVNode("option", { value: "pending" }, "🛵 Belum Diantar (" + toDisplayString(pendingDeliveryCount.value) + ")", 1),
                            createVNode("option", { value: "delivered" }, "✓ Sudah Diantar (" + toDisplayString(deliveredCount.value) + ")", 1)
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, deliveryFilter.value]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "table-responsive rounded-3 border" }, [
                        createVNode("table", { class: "table align-middle table-hover mb-0" }, [
                          createVNode("thead", { class: "table-light" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "ps-3 fw-semibold small text-secondary" }, "Pembeli & Opsi Kirim"),
                              createVNode("th", { class: "fw-semibold small text-secondary" }, "Rincian Menu & Jumlah"),
                              createVNode("th", { class: "fw-semibold small text-secondary" }, "Total Transaksi"),
                              createVNode("th", { class: "fw-semibold small text-secondary" }, "Status Pengantaran"),
                              createVNode("th", { class: "text-center fw-semibold small text-secondary pe-3" }, "Aksi Petugas")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredBuyers.value, (buyer) => {
                              return openBlock(), createBlock("tr", {
                                key: buyer.id
                              }, [
                                createVNode("td", { class: "ps-3" }, [
                                  createVNode("div", { class: "fw-bold text-dark" }, toDisplayString(buyer.customer), 1),
                                  createVNode("div", { class: "d-flex gap-1 mt-1" }, [
                                    createVNode("span", { class: "badge bg-light text-secondary border small" }, toDisplayString(buyer.order_type || "Takeaway"), 1),
                                    createVNode("span", { class: "badge bg-primary-subtle text-primary border border-primary-subtle small" }, toDisplayString(buyer.send_option || "Delivery"), 1)
                                  ])
                                ]),
                                createVNode("td", null, [
                                  createVNode("div", { class: "d-flex flex-column gap-1" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(buyer.items, (item) => {
                                      return openBlock(), createBlock("div", {
                                        key: item.id,
                                        class: "small fw-medium text-dark"
                                      }, [
                                        createTextVNode(" • " + toDisplayString(item.menu) + " ", 1),
                                        createVNode("span", { class: "badge bg-light text-dark border ms-1" }, toDisplayString(item.amount) + "x", 1)
                                      ]);
                                    }), 128))
                                  ])
                                ]),
                                createVNode("td", null, [
                                  createVNode("span", { class: "fw-bold text-success" }, toDisplayString(unref(formatIDR)(buyer.transaction)), 1)
                                ]),
                                createVNode("td", null, [
                                  createVNode("span", {
                                    class: ["badge rounded-pill px-3 py-1 fw-bold", buyer.is_delivered ? "bg-success text-white" : "bg-warning text-dark"]
                                  }, toDisplayString(buyer.is_delivered ? "✓ Sudah Diantar" : "🛵 Belum Diantar"), 3)
                                ]),
                                createVNode("td", { class: "text-center pe-3" }, [
                                  createVNode("button", {
                                    class: ["btn btn-sm rounded-pill px-3 fw-semibold d-inline-flex align-items-center gap-1 shadow-2xs", buyer.is_delivered ? "btn-outline-danger" : "btn-success text-white"],
                                    onClick: ($event) => toggleDelivery(buyer),
                                    title: buyer.is_delivered ? "Batalkan status sudah diantar" : "Konfirmasi pesanan telah sampai ke tangan pemesan"
                                  }, [
                                    createVNode("i", {
                                      class: buyer.is_delivered ? "bi bi-arrow-counterclockwise" : "bi bi-check2-circle"
                                    }, null, 2),
                                    createVNode("span", null, toDisplayString(buyer.is_delivered ? "Batalkan" : "Tandai Sudah Diantar"), 1)
                                  ], 10, ["onClick", "title"])
                                ])
                              ]);
                            }), 128)),
                            !filteredBuyers.value.length ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "5",
                                class: "text-center text-muted py-5"
                              }, [
                                createVNode("i", { class: "bi bi-inbox display-6 d-block mb-2 text-muted opacity-50" }),
                                createTextVNode(" Tidak ada data pesanan yang cocok dengan filter. ")
                              ])
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ])) : activeTab.value === "catalog" ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "catalog-tab-pane"
                    }, [
                      createVNode("div", { class: "d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2" }, [
                        createVNode("div", null, [
                          createVNode("h5", { class: "fw-bold text-dark mb-1" }, [
                            createVNode("i", { class: "bi bi-grid text-primary me-1" }),
                            createTextVNode(" Katalog Menu Stand & Status Toko Online ")
                          ]),
                          createVNode("small", { class: "text-muted" }, "Tentukan menu mana yang boleh tampil dan dipesan oleh pelanggan di web `/shop`.")
                        ]),
                        createVNode("div", { class: "d-flex gap-2 align-items-center flex-wrap" }, [
                          createVNode("div", {
                            class: "input-group input-group-sm",
                            style: { "width": "220px" }
                          }, [
                            createVNode("span", { class: "input-group-text bg-light" }, [
                              createVNode("i", { class: "bi bi-search" })
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => menuSearch.value = $event,
                              type: "search",
                              class: "form-control",
                              placeholder: "Cari nama menu..."
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, menuSearch.value]
                            ])
                          ]),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => categoryFilter.value = $event,
                            class: "form-select form-select-sm",
                            style: { "width": "170px" }
                          }, [
                            createVNode("option", { value: "all" }, "Semua Kategori"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.all_categories, (cat) => {
                              return openBlock(), createBlock("option", {
                                key: cat,
                                value: cat
                              }, toDisplayString(cat), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, categoryFilter.value]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "table-responsive rounded-3 border" }, [
                        createVNode("table", { class: "table align-middle table-hover mb-0" }, [
                          createVNode("thead", { class: "table-light" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "ps-3 fw-semibold small text-secondary" }, "Menu"),
                              createVNode("th", { class: "fw-semibold small text-secondary" }, "Stok & Penjualan"),
                              createVNode("th", { class: "fw-semibold small text-secondary" }, "HPP (Biaya)"),
                              createVNode("th", { class: "fw-semibold small text-secondary" }, "Harga Jual"),
                              createVNode("th", { class: "fw-semibold small text-secondary" }, "Status Toko"),
                              createVNode("th", { class: "text-center fw-semibold small text-secondary pe-3" }, "Aksi Publikasi & Resep")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredMenus.value, (menu) => {
                              return openBlock(), createBlock("tr", {
                                key: menu.id
                              }, [
                                createVNode("td", { class: "ps-3" }, [
                                  createVNode("div", { class: "fw-bold text-dark" }, toDisplayString(menu.name), 1),
                                  createVNode("span", { class: "badge bg-light text-secondary border small" }, toDisplayString(menu.category), 1)
                                ]),
                                createVNode("td", null, [
                                  createVNode("div", { class: "small fw-medium text-dark" }, [
                                    createTextVNode("Stok: "),
                                    createVNode("strong", null, toDisplayString(menu.stock), 1),
                                    createTextVNode(" porsi")
                                  ]),
                                  createVNode("small", { class: "text-muted" }, "Terjual: " + toDisplayString(menu.sale) + " porsi", 1)
                                ]),
                                createVNode("td", null, [
                                  createVNode("span", {
                                    class: ["small fw-medium", menu.cost ? "text-secondary" : "text-danger"]
                                  }, toDisplayString(menu.cost ? unref(formatIDR)(menu.cost) : "Belum diset"), 3)
                                ]),
                                createVNode("td", null, [
                                  createVNode("span", { class: "fw-bold text-success" }, toDisplayString(unref(formatIDR)(menu.price)), 1)
                                ]),
                                createVNode("td", null, [
                                  createVNode("span", {
                                    class: ["badge rounded-pill px-3 py-1 fw-bold", menu.is_published ? "bg-success text-white" : "bg-secondary text-white"]
                                  }, toDisplayString(menu.is_published ? "🟢 Tayang di Toko" : "⚪ Draft / Sembunyi"), 3)
                                ]),
                                createVNode("td", { class: "text-center pe-3" }, [
                                  createVNode("div", { class: "d-flex gap-2 justify-content-center" }, [
                                    createVNode("button", {
                                      type: "button",
                                      class: "btn btn-outline-primary btn-sm rounded-pill px-3 shadow-2xs",
                                      onClick: ($event) => syncRecipeMenu(menu.id),
                                      title: "Buka kalkulator resep bahan & HPP untuk menu ini"
                                    }, [
                                      createVNode("i", { class: "bi bi-card-checklist me-1" }),
                                      createTextVNode(" Resep & HPP ")
                                    ], 8, ["onClick"]),
                                    createVNode("button", {
                                      type: "button",
                                      class: ["btn btn-sm rounded-pill px-3 shadow-2xs fw-semibold", menu.is_published ? "btn-outline-danger" : "btn-success text-white"],
                                      onClick: ($event) => togglePublish(menu),
                                      title: menu.is_published ? "Tarik menu dari toko online pelanggan" : "Tampilkan menu di toko online pelanggan"
                                    }, [
                                      createVNode("i", {
                                        class: menu.is_published ? "bi bi-eye-slash" : "bi bi-eye"
                                      }, null, 2),
                                      createVNode("span", null, toDisplayString(menu.is_published ? "Tarik (Unpublish)" : "Tayangkan (Publish)"), 1)
                                    ], 10, ["onClick", "title"])
                                  ])
                                ])
                              ]);
                            }), 128)),
                            !filteredMenus.value.length ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "6",
                                class: "text-center text-muted py-5"
                              }, [
                                createVNode("i", { class: "bi bi-inbox display-6 d-block mb-2 text-muted opacity-50" }),
                                createTextVNode(" Tidak ada menu yang sesuai dengan pencarian. ")
                              ])
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ])) : activeTab.value === "recipe" ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "recipe-tab-pane"
                    }, [
                      createVNode("div", { class: "row g-4" }, [
                        createVNode("div", { class: "col-12 col-lg-4" }, [
                          createVNode("div", { class: "p-3 p-md-4 rounded-4 bg-light border h-100" }, [
                            createVNode("h6", { class: "fw-bold text-dark mb-3 d-flex align-items-center gap-2" }, [
                              createVNode("i", { class: "bi bi-calculator-fill text-primary" }),
                              createTextVNode(" Pilih Menu & Rangkuman Biaya ")
                            ]),
                            createVNode("div", { class: "mb-3" }, [
                              createVNode("label", { class: "form-label small fw-semibold text-secondary" }, "Pilih Menu yang Dihitung:"),
                              withDirectives(createVNode("select", {
                                "onUpdate:modelValue": ($event) => selectedMenuId.value = $event,
                                class: "form-select form-select-sm rounded-3 fw-medium",
                                onChange: ($event) => syncRecipeMenu($event.target.value)
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.menus, (menu) => {
                                  return openBlock(), createBlock("option", {
                                    key: menu.id,
                                    value: menu.id
                                  }, toDisplayString(menu.name), 9, ["value"]);
                                }), 128))
                              ], 40, ["onUpdate:modelValue", "onChange"]), [
                                [vModelSelect, selectedMenuId.value]
                              ])
                            ]),
                            activeMenu.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "cost-summary-card card border-0 shadow-2xs p-3 rounded-3 bg-white mb-3"
                            }, [
                              createVNode("div", { class: "fw-bold text-dark mb-2" }, toDisplayString(activeMenu.value.name), 1),
                              createVNode("div", { class: "d-flex justify-content-between py-1 border-bottom small" }, [
                                createVNode("span", { class: "text-muted" }, "Biaya Produksi (HPP):"),
                                createVNode("span", {
                                  class: ["fw-bold", activeMenu.value.cost ? "text-primary" : "text-danger"]
                                }, toDisplayString(activeMenu.value.cost ? unref(formatIDR)(activeMenu.value.cost) : "Belum dihitung"), 3)
                              ]),
                              createVNode("div", { class: "d-flex justify-content-between py-1 border-bottom small" }, [
                                createVNode("span", { class: "text-muted" }, "Saran Harga (+30%):"),
                                createVNode("span", { class: "fw-semibold text-success" }, toDisplayString(suggestPrice(activeMenu.value.cost)), 1)
                              ]),
                              createVNode("div", { class: "d-flex justify-content-between py-1 small" }, [
                                createVNode("span", { class: "text-muted" }, "Harga Jual Saat Ini:"),
                                createVNode("span", { class: "fw-bold text-dark" }, toDisplayString(unref(formatIDR)(activeMenu.value.price)), 1)
                              ])
                            ])) : createCommentVNode("", true),
                            activeMenu.value ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "d-grid gap-2"
                            }, [
                              createVNode("button", {
                                type: "button",
                                class: ["btn btn-sm rounded-pill fw-semibold py-2", activeMenu.value.is_published ? "btn-outline-danger" : "btn-success"],
                                onClick: ($event) => togglePublish(activeMenu.value)
                              }, [
                                createVNode("i", {
                                  class: activeMenu.value.is_published ? "bi bi-eye-slash me-1" : "bi bi-check-circle me-1"
                                }, null, 2),
                                createTextVNode(" " + toDisplayString(activeMenu.value.is_published ? "Tarik dari Toko (Unpublish)" : "Tayangkan Menu ke Toko"), 1)
                              ], 10, ["onClick"])
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "col-12 col-lg-8" }, [
                          createVNode("div", { class: "d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2" }, [
                            createVNode("div", null, [
                              createVNode("h6", { class: "fw-bold text-dark mb-1" }, [
                                createVNode("i", { class: "bi bi-basket3-fill text-warning me-1" }),
                                createTextVNode(" Komposisi Bahan Baku Stand ")
                              ]),
                              createVNode("small", { class: "text-muted" }, "Masukkan takaran bahan belanja yang digunakan per porsi menu ini.")
                            ]),
                            createVNode("button", {
                              type: "button",
                              class: "btn btn-primary rounded-pill px-4 fw-semibold shadow-sm btn-sm",
                              disabled: unref(recipeForm).processing,
                              onClick: submitRecipe
                            }, [
                              unref(recipeForm).processing ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "spinner-border spinner-border-sm me-1"
                              })) : (openBlock(), createBlock("i", {
                                key: 1,
                                class: "bi bi-save me-1"
                              })),
                              createVNode("span", null, "Simpan Resep Menu")
                            ], 8, ["disabled"])
                          ]),
                          createVNode("div", { class: "table-responsive rounded-3 border" }, [
                            createVNode("table", { class: "table align-middle table-hover mb-0" }, [
                              createVNode("thead", { class: "table-light" }, [
                                createVNode("tr", null, [
                                  createVNode("th", { class: "ps-3 fw-semibold small text-secondary" }, "Nama Bahan Belanja"),
                                  createVNode("th", {
                                    class: "fw-semibold small text-secondary",
                                    style: { "width": "180px" }
                                  }, "Takaran / Porsi"),
                                  createVNode("th", { class: "text-end pe-3 fw-semibold small text-secondary" }, "Estimasi Biaya Bahan")
                                ])
                              ]),
                              createVNode("tbody", null, [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(recipeForm).components, (component, index) => {
                                  var _a3, _b3;
                                  return openBlock(), createBlock("tr", {
                                    key: component.stand_expense_id
                                  }, [
                                    createVNode("td", { class: "ps-3" }, [
                                      createVNode("div", { class: "fw-bold text-dark" }, toDisplayString(component.name), 1),
                                      createVNode("small", { class: "text-muted" }, " Harga Beli: " + toDisplayString(unref(formatIDR)(component.total_price)) + " per " + toDisplayString(((_a3 = component.expense) == null ? void 0 : _a3.qty) || 1) + " " + toDisplayString(component.unit), 1)
                                    ]),
                                    createVNode("td", null, [
                                      createVNode("div", { class: "input-group input-group-sm" }, [
                                        withDirectives(createVNode("input", {
                                          "onUpdate:modelValue": ($event) => unref(recipeForm).components[index].quantity_used = $event,
                                          type: "number",
                                          min: "0",
                                          step: "0.01",
                                          class: "form-control text-center",
                                          placeholder: "0"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [
                                            vModelText,
                                            unref(recipeForm).components[index].quantity_used,
                                            void 0,
                                            { number: true }
                                          ]
                                        ]),
                                        createVNode("span", { class: "input-group-text bg-light small" }, toDisplayString(component.unit), 1)
                                      ])
                                    ]),
                                    createVNode("td", { class: "text-end pe-3" }, [
                                      component.quantity_used > 0 ? (openBlock(), createBlock("span", {
                                        key: 0,
                                        class: "fw-bold text-dark"
                                      }, toDisplayString(unref(formatIDR)(component.total_price / (((_b3 = component.expense) == null ? void 0 : _b3.qty) || 1) * component.quantity_used)), 1)) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-muted small"
                                      }, "-"))
                                    ])
                                  ]);
                                }), 128)),
                                !unref(recipeForm).components.length ? (openBlock(), createBlock("tr", { key: 0 }, [
                                  createVNode("td", {
                                    colspan: "3",
                                    class: "text-center text-muted py-5"
                                  }, [
                                    createVNode("i", { class: "bi bi-receipt display-6 d-block mb-2 text-muted opacity-50" }),
                                    createTextVNode(" Belum ada item belanja pengeluaran yang divalidasi pada stand ini. ")
                                  ])
                                ])) : createCommentVNode("", true)
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      ssrRenderTeleport(_push, (_push2) => {
        if (showGuideModal.value) {
          _push2(`<div class="guide-modal-backdrop" tabindex="-1" data-v-b613ab18><div class="guide-modal-box card border-0 shadow-lg rounded-4 overflow-hidden" role="dialog" data-v-b613ab18><div class="modal-header-custom p-4 text-white" style="${ssrRenderStyle({ "background": "linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)" })}" data-v-b613ab18><div class="d-flex justify-content-between align-items-center w-100" data-v-b613ab18><div class="d-flex align-items-center gap-3" data-v-b613ab18><div class="rounded-circle p-2 bg-white bg-opacity-20 d-flex align-items-center justify-content-center" style="${ssrRenderStyle({ "width": "48px", "height": "48px" })}" data-v-b613ab18><i class="bi bi-cart-check-fill fs-4 text-warning" data-v-b613ab18></i></div><div data-v-b613ab18><span class="badge rounded-pill bg-white bg-opacity-20 text-white text-2xs mb-1" data-v-b613ab18>Panduan Pengoperasian</span><h5 class="mb-0 fw-bold" data-v-b613ab18>Alur Kerja Fitur Sales Distribution</h5></div></div><button type="button" class="btn-close btn-close-white" aria-label="Close" data-v-b613ab18></button></div></div><div class="modal-body-custom p-4 overflow-y-auto" style="${ssrRenderStyle({ "max-height": "75vh" })}" data-v-b613ab18><div class="mb-4" data-v-b613ab18><h6 class="fw-bold text-dark d-flex align-items-center gap-2 mb-2" data-v-b613ab18><i class="bi bi-bullseye text-primary" data-v-b613ab18></i> Apa Tujuan Halaman Ini? </h6><p class="small text-secondary mb-0 lh-base" data-v-b613ab18> Halaman <strong data-v-b613ab18>Sales Distribution</strong> adalah jembatan antara tim Dapur (Produksi) dan Konsumen. Tugas utama tim di halaman ini terbagi menjadi 3 kegiatan pokok: </p></div><div class="mb-4" data-v-b613ab18><h6 class="fw-bold text-dark d-flex align-items-center gap-2 mb-3" data-v-b613ab18><i class="bi bi-signpost-2 text-primary" data-v-b613ab18></i> 3 Alur Kerja Pokok (SOP Harian) </h6><div class="d-flex flex-column gap-3" data-v-b613ab18><div class="d-flex gap-3 p-3 rounded-3 bg-light border" data-v-b613ab18><div class="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center shrink-0" style="${ssrRenderStyle({ "width": "32px", "height": "32px" })}" data-v-b613ab18> 1 </div><div data-v-b613ab18><div class="fw-bold text-dark small mb-1" data-v-b613ab18>Hitung Resep &amp; Biaya Pokok Produksi (HPP)</div><p class="small text-secondary mb-0 lh-sm" data-v-b613ab18> Buka tab <strong data-v-b613ab18>Resep &amp; Kalkulasi HPP</strong>. Pilih menu yang dibuat, lalu masukkan jumlah takaran bahan belanja yang dipakai per porsi. Sistem akan otomatis menghitung HPP dan memberikan saran harga jual (+30%). </p></div></div><div class="d-flex gap-3 p-3 rounded-3 bg-light border" data-v-b613ab18><div class="rounded-circle bg-success text-white fw-bold d-flex align-items-center justify-content-center shrink-0" style="${ssrRenderStyle({ "width": "32px", "height": "32px" })}" data-v-b613ab18> 2 </div><div data-v-b613ab18><div class="fw-bold text-dark small mb-1" data-v-b613ab18>Publikasikan Menu ke Toko Online (Publish to Shop)</div><p class="small text-secondary mb-0 lh-sm" data-v-b613ab18> Buka tab <strong data-v-b613ab18>Etalase &amp; Publikasi Toko</strong>. Setelah stok siap dari dapur, klik tombol <strong data-v-b613ab18>&quot;Tayangkan (Publish)&quot;</strong> agar menu dapat dipesan konsumen di website pemesanan pelanggan (\`/shop\`). Jika bahan baku habis, klik <strong data-v-b613ab18>&quot;Tarik (Unpublish)&quot;</strong>. </p></div></div><div class="d-flex gap-3 p-3 rounded-3 bg-light border" data-v-b613ab18><div class="rounded-circle bg-warning text-dark fw-bold d-flex align-items-center justify-content-center shrink-0" style="${ssrRenderStyle({ "width": "32px", "height": "32px" })}" data-v-b613ab18> 3 </div><div data-v-b613ab18><div class="fw-bold text-dark small mb-1" data-v-b613ab18>Pantau &amp; Konfirmasi Pengantaran Pesanan (Delivery)</div><p class="small text-secondary mb-0 lh-sm" data-v-b613ab18> Buka tab <strong data-v-b613ab18>Pengantaran Pesanan</strong>. Saat ada pesanan dengan opsi delivery masuk, pantau nama pembeli dan rincian makanannya. Setelah kurir atau staf menyerahkan pesanan ke pelanggan, klik tombol <strong data-v-b613ab18>&quot;Tandai Sudah Diantar&quot;</strong>. </p></div></div></div></div><div class="mb-4" data-v-b613ab18><h6 class="fw-bold text-dark d-flex align-items-center gap-2 mb-3" data-v-b613ab18><i class="bi bi-book-half text-primary" data-v-b613ab18></i> Kamus Istilah Penting </h6><div class="row g-2" data-v-b613ab18><div class="col-12 col-md-6" data-v-b613ab18><div class="p-2 px-3 rounded-3 bg-light border small" data-v-b613ab18><strong class="text-primary d-block" data-v-b613ab18>Published</strong> Menu aktif dan dapat dilihat serta dibeli oleh customer di web belanja. </div></div><div class="col-12 col-md-6" data-v-b613ab18><div class="p-2 px-3 rounded-3 bg-light border small" data-v-b613ab18><strong class="text-danger d-block" data-v-b613ab18>Draft / Unpublish</strong> Menu disembunyikan sementara dari toko online (misal saat stok habis). </div></div><div class="col-12 col-md-6" data-v-b613ab18><div class="p-2 px-3 rounded-3 bg-light border small" data-v-b613ab18><strong class="text-success d-block" data-v-b613ab18>HPP (Biaya Produksi)</strong> Akumulasi harga bahan baku yang dihabiskan untuk memproduksi 1 porsi menu. </div></div><div class="col-12 col-md-6" data-v-b613ab18><div class="p-2 px-3 rounded-3 bg-light border small" data-v-b613ab18><strong class="text-warning text-dark d-block" data-v-b613ab18>Tandai Sudah Diantar</strong> Status bahwa pesanan antar telah sampai ke tangan customer dengan sukses. </div></div></div></div><div data-v-b613ab18><h6 class="fw-bold text-dark d-flex align-items-center gap-2 mb-2" data-v-b613ab18><i class="bi bi-question-circle text-primary" data-v-b613ab18></i> Pertanyaan Sering Diajukan </h6><div class="small text-secondary" data-v-b613ab18><p class="mb-2" data-v-b613ab18><strong data-v-b613ab18>Q: Mengapa HPP menu berstatus &quot;Belum dihitung&quot;?</strong><br data-v-b613ab18>A: Karena menu tersebut belum diatur takaran bahan bakunya pada tab <em data-v-b613ab18>Resep &amp; Kalkulasi HPP</em>.</p><p class="mb-0" data-v-b613ab18><strong data-v-b613ab18>Q: Bagaimana cara menambah menu baru jika belum ada di daftar?</strong><br data-v-b613ab18>A: Pembuatan menu baru dilakukan di menu <strong data-v-b613ab18>Production Panel</strong> oleh tim dapur.</p></div></div></div><div class="modal-footer-custom bg-light p-3 px-4 border-top d-flex justify-content-end" data-v-b613ab18><button type="button" class="btn btn-primary rounded-pill px-4 fw-medium" data-v-b613ab18><i class="bi bi-check2 me-1" data-v-b613ab18></i> Saya Paham </button></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Business/MenuBoard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MenuBoard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b613ab18"]]);
export {
  MenuBoard as default
};
//# sourceMappingURL=MenuBoard-CqLOmCl9.js.map
