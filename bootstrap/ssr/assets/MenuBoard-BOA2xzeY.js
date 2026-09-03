import { ref, computed, watch, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, createTextVNode, withDirectives, Fragment, renderList, vModelSelect, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from "vue/server-renderer";
import { usePage, useForm, Head, router } from "@inertiajs/vue3";
import { f as formatIDR } from "./utils-DIF4pdrF.js";
import { _ as _sfc_main$2 } from "./InputError-DkffFxkw.js";
import { S as StaffLayout } from "./StaffLayout-Cpng7oLR.js";
import { _ as _sfc_main$1 } from "./Notif-DL0SggHu.js";
import vSelect from "vue-select";
/* empty css                    */
import "date-fns";
import "./ModalConfirmation-CaKJYApU.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
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
    const menuSearch = ref("");
    const buyerSearch = ref("");
    const deliveryFilter = ref("all");
    const menuForm = useForm({
      stand_id: selectedStandId.value,
      name: "",
      category: "",
      food_tag: [],
      price: 0,
      stock: 0,
      volume: "",
      volume_unit: "",
      mass: "",
      mass_unit: "",
      image: null
    });
    ref(null);
    ref(null);
    const recipeForm = useForm({
      components: []
    });
    const activeMenu = computed(() => props.menus.find((menu) => menu.id === selectedMenuId.value) ?? null);
    const filteredMenus = computed(() => {
      const keyword = menuSearch.value.trim().toLowerCase();
      return props.menus.filter((menu) => {
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
          syncRecipeMenu(menus[0].id);
          return;
        }
        recipeForm.components = buildRecipeComponents(activeMenu.value);
      },
      { immediate: true, deep: true }
    );
    watch(selectedStandId, (value) => {
      menuForm.stand_id = value;
    });
    function filterStand() {
      router.get(route("staff.sales-distribution.index"), { stand_id: selectedStandId.value }, { preserveState: true, replace: true });
    }
    function submitRecipe() {
      if (!selectedMenuId.value) {
        return;
      }
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
      if (!cost) {
        return "-";
      }
      return formatIDR(Math.ceil(cost * 1.3));
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Sales Distribution Panel" }, null, _parent));
      _push(ssrRenderComponent(StaffLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container-fluid py-4"${_scopeId}>`);
            if (__props.notif) {
              _push2(ssrRenderComponent(_sfc_main$1, { notif: __props.notif }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="row g-4"${_scopeId}><div class="col-12"${_scopeId}><div class="row g-3 mb-3"${_scopeId}><div class="col-12 col-md-4"${_scopeId}><div class="card border-0 shadow-sm h-100"${_scopeId}><div class="card-body"${_scopeId}><div class="text-muted small"${_scopeId}>Menu Published</div><div class="fs-3 fw-bold"${_scopeId}>${ssrInterpolate(publishedMenuCount.value)}</div></div></div></div><div class="col-12 col-md-4"${_scopeId}><div class="card border-0 shadow-sm h-100"${_scopeId}><div class="card-body"${_scopeId}><div class="text-muted small"${_scopeId}>Order Sudah Diantar</div><div class="fs-3 fw-bold"${_scopeId}>${ssrInterpolate(deliveredCount.value)}</div></div></div></div><div class="col-12 col-md-4"${_scopeId}><div class="card border-0 shadow-sm h-100"${_scopeId}><div class="card-body"${_scopeId}><div class="text-muted small"${_scopeId}>Menunggu Pengantaran</div><div class="fs-3 fw-bold"${_scopeId}>${ssrInterpolate(pendingDeliveryCount.value)}</div></div></div></div></div><div class="card border-0 shadow-sm"${_scopeId}><div class="card-body"${_scopeId}><div class="d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-center"${_scopeId}><div${_scopeId}><h4 class="mb-1"${_scopeId}>Sales Distribution Panel</h4><p class="text-muted mb-0"${_scopeId}><i class="bi bi-info-circle me-1"${_scopeId}></i> Hitung biaya produksi, publish menu ke toko, dan pantau pengantaran order. </p></div><div class="d-flex gap-2 align-items-center"${_scopeId}><select class="form-select" style="${ssrRenderStyle({ "min-width": "220px" })}"${_scopeId}><!--[-->`);
            ssrRenderList(__props.stands, (stand) => {
              _push2(`<option${ssrRenderAttr("value", stand.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedStandId.value) ? ssrLooseContain(selectedStandId.value, stand.id) : ssrLooseEqual(selectedStandId.value, stand.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(stand.name)}</option>`);
            });
            _push2(`<!--]--></select></div></div></div></div></div><div class="col-12 col-xl-5"${_scopeId}><div class="card border-0 shadow-sm mb-4"${_scopeId}><div class="card-body"${_scopeId}><div class="alert alert-info mb-0"${_scopeId}><i class="bi bi-info-circle me-2"${_scopeId}></i><strong${_scopeId}>Info:</strong> Menu dibuat oleh <strong${_scopeId}>Production</strong>. Sales Distribution bertugas untuk: <ul class="mb-0 mt-2"${_scopeId}><li${_scopeId}>Menghitung biaya produksi (attach recipe)</li><li${_scopeId}>Publish menu ke toko online</li><li${_scopeId}>Memantau dan konfirmasi pengantaran</li></ul></div></div></div><div class="card border-0 shadow-sm"${_scopeId}><div class="card-header bg-transparent border-0 pt-4 pb-0"${_scopeId}><h5 class="mb-0"${_scopeId}>Bahan &amp; Biaya Produksi</h5></div><div class="card-body"${_scopeId}><div class="mb-3"${_scopeId}><label class="form-label"${_scopeId}>Pilih Menu</label><select class="form-select"${_scopeId}><!--[-->`);
            ssrRenderList(__props.menus, (menu) => {
              _push2(`<option${ssrRenderAttr("value", menu.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedMenuId.value) ? ssrLooseContain(selectedMenuId.value, menu.id) : ssrLooseEqual(selectedMenuId.value, menu.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(menu.name)}</option>`);
            });
            _push2(`<!--]--></select></div>`);
            if (activeMenu.value) {
              _push2(`<div class="alert alert-light border"${_scopeId}><div class="d-flex justify-content-between align-items-center flex-wrap gap-2"${_scopeId}><div${_scopeId}><strong${_scopeId}>${ssrInterpolate(activeMenu.value.name)}</strong><div class="text-muted small"${_scopeId}>Biaya produksi: ${ssrInterpolate(activeMenu.value.cost ? unref(formatIDR)(activeMenu.value.cost) : "-")}</div><div class="text-muted small"${_scopeId}>Harga saran: ${ssrInterpolate(suggestPrice(activeMenu.value.cost))}</div></div><button class="btn btn-outline-primary btn-sm"${_scopeId}>${ssrInterpolate(activeMenu.value.is_published ? "Unpublish" : "Publish to Shop")}</button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeMenu.value) {
              _push2(`<div class="table-responsive"${_scopeId}><table class="table align-middle"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Bahan</th><th${_scopeId}>Qty Dipakai</th><th${_scopeId}>Harga Total Bahan</th></tr></thead><tbody${_scopeId}><!--[-->`);
              ssrRenderList(unref(recipeForm).components, (component, index) => {
                var _a2;
                _push2(`<tr${_scopeId}><td${_scopeId}><div${_scopeId}>${ssrInterpolate(component.name)}</div><div class="text-muted small"${_scopeId}>${ssrInterpolate(unref(formatIDR)(component.total_price))} / ${ssrInterpolate(component.unit)}</div></td><td style="${ssrRenderStyle({ "width": "180px" })}"${_scopeId}><input${ssrRenderAttr("value", unref(recipeForm).components[index].quantity_used)} type="number" min="0" step="0.01" class="form-control"${_scopeId}></td><td${_scopeId}>`);
                if (component.quantity_used > 0) {
                  _push2(`<span${_scopeId}>${ssrInterpolate(unref(formatIDR)(component.total_price / (((_a2 = component.expense) == null ? void 0 : _a2.qty) || 1) * component.quantity_used))}</span>`);
                } else {
                  _push2(`<span${_scopeId}>-</span>`);
                }
                _push2(`</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (activeMenu.value) {
              _push2(`<button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(recipeForm).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(recipeForm).processing ? "Menyimpan..." : "Simpan Resep Menu")}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="col-12 col-xl-7"${_scopeId}><div class="card border-0 shadow-sm mb-4"${_scopeId}><div class="card-header bg-transparent border-0 pt-4 pb-0"${_scopeId}><h5 class="mb-0"${_scopeId}>Daftar Menu</h5></div><div class="card-body table-responsive"${_scopeId}><div class="row g-2 mb-3"${_scopeId}><div class="col-md-8"${_scopeId}><label for="menuSearch" class="form-label small mb-1"${_scopeId}><i class="bi bi-search me-1"${_scopeId}></i>Cari Menu </label><input id="menuSearch"${ssrRenderAttr("value", menuSearch.value)} type="search" class="form-control" placeholder="Ketik nama menu atau kategori..."${_scopeId}></div><div class="col-md-4 text-md-end"${_scopeId}><label class="form-label small mb-1 d-block"${_scopeId}> </label><button class="btn btn-outline-secondary w-100"${_scopeId}><i class="bi bi-arrow-clockwise me-1"${_scopeId}></i>Reset Pencarian </button></div></div><table class="table align-middle"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Menu</th><th${_scopeId}>Biaya Produksi</th><th${_scopeId}>Harga Jual</th><th${_scopeId}>Status</th><th${_scopeId}></th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(filteredMenus.value, (menu) => {
              _push2(`<tr${_scopeId}><td${_scopeId}><div class="fw-semibold"${_scopeId}>${ssrInterpolate(menu.name)}</div><div class="text-muted small"${_scopeId}>Stock ${ssrInterpolate(menu.stock)} | Terjual ${ssrInterpolate(menu.sale)}</div></td><td${_scopeId}>${ssrInterpolate(menu.cost ? unref(formatIDR)(menu.cost) : "-")}</td><td${_scopeId}>${ssrInterpolate(unref(formatIDR)(menu.price))}</td><td${_scopeId}><span class="${ssrRenderClass([menu.is_published ? "bg-success" : "bg-secondary", "badge"])}"${_scopeId}>${ssrInterpolate(menu.is_published ? "Published" : "Draft")}</span></td><td class="text-end"${_scopeId}><button class="btn btn-outline-primary btn-sm"${_scopeId}>Resep</button><button class="btn btn-outline-success btn-sm ms-2"${_scopeId}>${ssrInterpolate(menu.is_published ? "Unpublish" : "Publish")}</button></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div><div class="card border-0 shadow-sm"${_scopeId}><div class="card-header bg-transparent border-0 pt-4 pb-0"${_scopeId}><h5 class="mb-0"${_scopeId}>Daftar Pembeli &amp; Pengantaran</h5></div><div class="card-body table-responsive"${_scopeId}><div class="row g-2 mb-3"${_scopeId}><div class="col-md-5"${_scopeId}><label for="buyerSearch" class="form-label small mb-1"${_scopeId}><i class="bi bi-search me-1"${_scopeId}></i>Cari Pembeli/Order </label><input id="buyerSearch"${ssrRenderAttr("value", buyerSearch.value)} type="search" class="form-control" placeholder="Ketik nama pembeli, menu, atau opsi kirim..."${_scopeId}></div><div class="col-md-4"${_scopeId}><label for="deliveryFilter" class="form-label small mb-1"${_scopeId}><i class="bi bi-filter me-1"${_scopeId}></i>Filter Status Pengantaran </label><select id="deliveryFilter" class="form-select"${_scopeId}><option value="all"${ssrIncludeBooleanAttr(Array.isArray(deliveryFilter.value) ? ssrLooseContain(deliveryFilter.value, "all") : ssrLooseEqual(deliveryFilter.value, "all")) ? " selected" : ""}${_scopeId}>Semua status</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(deliveryFilter.value) ? ssrLooseContain(deliveryFilter.value, "pending") : ssrLooseEqual(deliveryFilter.value, "pending")) ? " selected" : ""}${_scopeId}>Belum diantar</option><option value="delivered"${ssrIncludeBooleanAttr(Array.isArray(deliveryFilter.value) ? ssrLooseContain(deliveryFilter.value, "delivered") : ssrLooseEqual(deliveryFilter.value, "delivered")) ? " selected" : ""}${_scopeId}>Sudah diantar</option></select></div><div class="col-md-3 text-md-end"${_scopeId}><label class="form-label small mb-1 d-block"${_scopeId}> </label><button class="btn btn-outline-secondary w-100"${_scopeId}><i class="bi bi-arrow-clockwise me-1"${_scopeId}></i>Reset Filter </button></div></div><table class="table align-middle"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Pembeli</th><th${_scopeId}>Detail Order</th><th${_scopeId}>Total</th><th${_scopeId}>Diantar</th><th${_scopeId}></th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(filteredBuyers.value, (buyer) => {
              _push2(`<tr${_scopeId}><td${_scopeId}><div class="fw-semibold"${_scopeId}>${ssrInterpolate(buyer.customer)}</div><div class="text-muted small"${_scopeId}>${ssrInterpolate(buyer.order_type)} • ${ssrInterpolate(buyer.send_option)}</div></td><td${_scopeId}><!--[-->`);
              ssrRenderList(buyer.items, (item) => {
                _push2(`<div class="small"${_scopeId}>${ssrInterpolate(item.menu)} x${ssrInterpolate(item.amount)}</div>`);
              });
              _push2(`<!--]--></td><td${_scopeId}>${ssrInterpolate(unref(formatIDR)(buyer.transaction))}</td><td${_scopeId}><span class="${ssrRenderClass([buyer.is_delivered ? "bg-success" : "bg-warning text-dark", "badge"])}"${_scopeId}>${ssrInterpolate(buyer.is_delivered ? "Sudah" : "Belum")}</span></td><td class="text-end"${_scopeId}><button class="btn btn-outline-primary btn-sm"${_scopeId}>${ssrInterpolate(buyer.is_delivered ? "Batalkan" : "Checklist")}</button></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-fluid py-4" }, [
                __props.notif ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 0,
                  notif: __props.notif
                }, null, 8, ["notif"])) : createCommentVNode("", true),
                createVNode("div", { class: "row g-4" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "row g-3 mb-3" }, [
                      createVNode("div", { class: "col-12 col-md-4" }, [
                        createVNode("div", { class: "card border-0 shadow-sm h-100" }, [
                          createVNode("div", { class: "card-body" }, [
                            createVNode("div", { class: "text-muted small" }, "Menu Published"),
                            createVNode("div", { class: "fs-3 fw-bold" }, toDisplayString(publishedMenuCount.value), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "col-12 col-md-4" }, [
                        createVNode("div", { class: "card border-0 shadow-sm h-100" }, [
                          createVNode("div", { class: "card-body" }, [
                            createVNode("div", { class: "text-muted small" }, "Order Sudah Diantar"),
                            createVNode("div", { class: "fs-3 fw-bold" }, toDisplayString(deliveredCount.value), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "col-12 col-md-4" }, [
                        createVNode("div", { class: "card border-0 shadow-sm h-100" }, [
                          createVNode("div", { class: "card-body" }, [
                            createVNode("div", { class: "text-muted small" }, "Menunggu Pengantaran"),
                            createVNode("div", { class: "fs-3 fw-bold" }, toDisplayString(pendingDeliveryCount.value), 1)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "card border-0 shadow-sm" }, [
                      createVNode("div", { class: "card-body" }, [
                        createVNode("div", { class: "d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-center" }, [
                          createVNode("div", null, [
                            createVNode("h4", { class: "mb-1" }, "Sales Distribution Panel"),
                            createVNode("p", { class: "text-muted mb-0" }, [
                              createVNode("i", { class: "bi bi-info-circle me-1" }),
                              createTextVNode(" Hitung biaya produksi, publish menu ke toko, dan pantau pengantaran order. ")
                            ])
                          ]),
                          createVNode("div", { class: "d-flex gap-2 align-items-center" }, [
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => selectedStandId.value = $event,
                              class: "form-select",
                              style: { "min-width": "220px" },
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
                  createVNode("div", { class: "col-12 col-xl-5" }, [
                    createVNode("div", { class: "card border-0 shadow-sm mb-4" }, [
                      createVNode("div", { class: "card-body" }, [
                        createVNode("div", { class: "alert alert-info mb-0" }, [
                          createVNode("i", { class: "bi bi-info-circle me-2" }),
                          createVNode("strong", null, "Info:"),
                          createTextVNode(" Menu dibuat oleh "),
                          createVNode("strong", null, "Production"),
                          createTextVNode(". Sales Distribution bertugas untuk: "),
                          createVNode("ul", { class: "mb-0 mt-2" }, [
                            createVNode("li", null, "Menghitung biaya produksi (attach recipe)"),
                            createVNode("li", null, "Publish menu ke toko online"),
                            createVNode("li", null, "Memantau dan konfirmasi pengantaran")
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "card border-0 shadow-sm" }, [
                      createVNode("div", { class: "card-header bg-transparent border-0 pt-4 pb-0" }, [
                        createVNode("h5", { class: "mb-0" }, "Bahan & Biaya Produksi")
                      ]),
                      createVNode("div", { class: "card-body" }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label" }, "Pilih Menu"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => selectedMenuId.value = $event,
                            class: "form-select",
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
                          class: "alert alert-light border"
                        }, [
                          createVNode("div", { class: "d-flex justify-content-between align-items-center flex-wrap gap-2" }, [
                            createVNode("div", null, [
                              createVNode("strong", null, toDisplayString(activeMenu.value.name), 1),
                              createVNode("div", { class: "text-muted small" }, "Biaya produksi: " + toDisplayString(activeMenu.value.cost ? unref(formatIDR)(activeMenu.value.cost) : "-"), 1),
                              createVNode("div", { class: "text-muted small" }, "Harga saran: " + toDisplayString(suggestPrice(activeMenu.value.cost)), 1)
                            ]),
                            createVNode("button", {
                              class: "btn btn-outline-primary btn-sm",
                              onClick: ($event) => togglePublish(activeMenu.value)
                            }, toDisplayString(activeMenu.value.is_published ? "Unpublish" : "Publish to Shop"), 9, ["onClick"])
                          ])
                        ])) : createCommentVNode("", true),
                        activeMenu.value ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "table-responsive"
                        }, [
                          createVNode("table", { class: "table align-middle" }, [
                            createVNode("thead", null, [
                              createVNode("tr", null, [
                                createVNode("th", null, "Bahan"),
                                createVNode("th", null, "Qty Dipakai"),
                                createVNode("th", null, "Harga Total Bahan")
                              ])
                            ]),
                            createVNode("tbody", null, [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(recipeForm).components, (component, index) => {
                                var _a2;
                                return openBlock(), createBlock("tr", {
                                  key: component.stand_expense_id
                                }, [
                                  createVNode("td", null, [
                                    createVNode("div", null, toDisplayString(component.name), 1),
                                    createVNode("div", { class: "text-muted small" }, toDisplayString(unref(formatIDR)(component.total_price)) + " / " + toDisplayString(component.unit), 1)
                                  ]),
                                  createVNode("td", { style: { "width": "180px" } }, [
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => unref(recipeForm).components[index].quantity_used = $event,
                                      type: "number",
                                      min: "0",
                                      step: "0.01",
                                      class: "form-control"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(recipeForm).components[index].quantity_used]
                                    ])
                                  ]),
                                  createVNode("td", null, [
                                    component.quantity_used > 0 ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(formatIDR)(component.total_price / (((_a2 = component.expense) == null ? void 0 : _a2.qty) || 1) * component.quantity_used)), 1)) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                                  ])
                                ]);
                              }), 128))
                            ])
                          ])
                        ])) : createCommentVNode("", true),
                        activeMenu.value ? (openBlock(), createBlock("button", {
                          key: 2,
                          class: "btn btn-primary",
                          disabled: unref(recipeForm).processing,
                          onClick: submitRecipe
                        }, toDisplayString(unref(recipeForm).processing ? "Menyimpan..." : "Simpan Resep Menu"), 9, ["disabled"])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "col-12 col-xl-7" }, [
                    createVNode("div", { class: "card border-0 shadow-sm mb-4" }, [
                      createVNode("div", { class: "card-header bg-transparent border-0 pt-4 pb-0" }, [
                        createVNode("h5", { class: "mb-0" }, "Daftar Menu")
                      ]),
                      createVNode("div", { class: "card-body table-responsive" }, [
                        createVNode("div", { class: "row g-2 mb-3" }, [
                          createVNode("div", { class: "col-md-8" }, [
                            createVNode("label", {
                              for: "menuSearch",
                              class: "form-label small mb-1"
                            }, [
                              createVNode("i", { class: "bi bi-search me-1" }),
                              createTextVNode("Cari Menu ")
                            ]),
                            withDirectives(createVNode("input", {
                              id: "menuSearch",
                              "onUpdate:modelValue": ($event) => menuSearch.value = $event,
                              type: "search",
                              class: "form-control",
                              placeholder: "Ketik nama menu atau kategori..."
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, menuSearch.value]
                            ])
                          ]),
                          createVNode("div", { class: "col-md-4 text-md-end" }, [
                            createVNode("label", { class: "form-label small mb-1 d-block" }, " "),
                            createVNode("button", {
                              class: "btn btn-outline-secondary w-100",
                              onClick: ($event) => menuSearch.value = ""
                            }, [
                              createVNode("i", { class: "bi bi-arrow-clockwise me-1" }),
                              createTextVNode("Reset Pencarian ")
                            ], 8, ["onClick"])
                          ])
                        ]),
                        createVNode("table", { class: "table align-middle" }, [
                          createVNode("thead", null, [
                            createVNode("tr", null, [
                              createVNode("th", null, "Menu"),
                              createVNode("th", null, "Biaya Produksi"),
                              createVNode("th", null, "Harga Jual"),
                              createVNode("th", null, "Status"),
                              createVNode("th")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredMenus.value, (menu) => {
                              return openBlock(), createBlock("tr", {
                                key: menu.id
                              }, [
                                createVNode("td", null, [
                                  createVNode("div", { class: "fw-semibold" }, toDisplayString(menu.name), 1),
                                  createVNode("div", { class: "text-muted small" }, "Stock " + toDisplayString(menu.stock) + " | Terjual " + toDisplayString(menu.sale), 1)
                                ]),
                                createVNode("td", null, toDisplayString(menu.cost ? unref(formatIDR)(menu.cost) : "-"), 1),
                                createVNode("td", null, toDisplayString(unref(formatIDR)(menu.price)), 1),
                                createVNode("td", null, [
                                  createVNode("span", {
                                    class: ["badge", menu.is_published ? "bg-success" : "bg-secondary"]
                                  }, toDisplayString(menu.is_published ? "Published" : "Draft"), 3)
                                ]),
                                createVNode("td", { class: "text-end" }, [
                                  createVNode("button", {
                                    class: "btn btn-outline-primary btn-sm",
                                    onClick: ($event) => syncRecipeMenu(menu.id)
                                  }, "Resep", 8, ["onClick"]),
                                  createVNode("button", {
                                    class: "btn btn-outline-success btn-sm ms-2",
                                    onClick: ($event) => togglePublish(menu)
                                  }, toDisplayString(menu.is_published ? "Unpublish" : "Publish"), 9, ["onClick"])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "card border-0 shadow-sm" }, [
                      createVNode("div", { class: "card-header bg-transparent border-0 pt-4 pb-0" }, [
                        createVNode("h5", { class: "mb-0" }, "Daftar Pembeli & Pengantaran")
                      ]),
                      createVNode("div", { class: "card-body table-responsive" }, [
                        createVNode("div", { class: "row g-2 mb-3" }, [
                          createVNode("div", { class: "col-md-5" }, [
                            createVNode("label", {
                              for: "buyerSearch",
                              class: "form-label small mb-1"
                            }, [
                              createVNode("i", { class: "bi bi-search me-1" }),
                              createTextVNode("Cari Pembeli/Order ")
                            ]),
                            withDirectives(createVNode("input", {
                              id: "buyerSearch",
                              "onUpdate:modelValue": ($event) => buyerSearch.value = $event,
                              type: "search",
                              class: "form-control",
                              placeholder: "Ketik nama pembeli, menu, atau opsi kirim..."
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, buyerSearch.value]
                            ])
                          ]),
                          createVNode("div", { class: "col-md-4" }, [
                            createVNode("label", {
                              for: "deliveryFilter",
                              class: "form-label small mb-1"
                            }, [
                              createVNode("i", { class: "bi bi-filter me-1" }),
                              createTextVNode("Filter Status Pengantaran ")
                            ]),
                            withDirectives(createVNode("select", {
                              id: "deliveryFilter",
                              "onUpdate:modelValue": ($event) => deliveryFilter.value = $event,
                              class: "form-select"
                            }, [
                              createVNode("option", { value: "all" }, "Semua status"),
                              createVNode("option", { value: "pending" }, "Belum diantar"),
                              createVNode("option", { value: "delivered" }, "Sudah diantar")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, deliveryFilter.value]
                            ])
                          ]),
                          createVNode("div", { class: "col-md-3 text-md-end" }, [
                            createVNode("label", { class: "form-label small mb-1 d-block" }, " "),
                            createVNode("button", {
                              class: "btn btn-outline-secondary w-100",
                              onClick: ($event) => {
                                buyerSearch.value = "";
                                deliveryFilter.value = "all";
                              }
                            }, [
                              createVNode("i", { class: "bi bi-arrow-clockwise me-1" }),
                              createTextVNode("Reset Filter ")
                            ], 8, ["onClick"])
                          ])
                        ]),
                        createVNode("table", { class: "table align-middle" }, [
                          createVNode("thead", null, [
                            createVNode("tr", null, [
                              createVNode("th", null, "Pembeli"),
                              createVNode("th", null, "Detail Order"),
                              createVNode("th", null, "Total"),
                              createVNode("th", null, "Diantar"),
                              createVNode("th")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredBuyers.value, (buyer) => {
                              return openBlock(), createBlock("tr", {
                                key: buyer.id
                              }, [
                                createVNode("td", null, [
                                  createVNode("div", { class: "fw-semibold" }, toDisplayString(buyer.customer), 1),
                                  createVNode("div", { class: "text-muted small" }, toDisplayString(buyer.order_type) + " • " + toDisplayString(buyer.send_option), 1)
                                ]),
                                createVNode("td", null, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(buyer.items, (item) => {
                                    return openBlock(), createBlock("div", {
                                      key: item.id,
                                      class: "small"
                                    }, toDisplayString(item.menu) + " x" + toDisplayString(item.amount), 1);
                                  }), 128))
                                ]),
                                createVNode("td", null, toDisplayString(unref(formatIDR)(buyer.transaction)), 1),
                                createVNode("td", null, [
                                  createVNode("span", {
                                    class: ["badge", buyer.is_delivered ? "bg-success" : "bg-warning text-dark"]
                                  }, toDisplayString(buyer.is_delivered ? "Sudah" : "Belum"), 3)
                                ]),
                                createVNode("td", { class: "text-end" }, [
                                  createVNode("button", {
                                    class: "btn btn-outline-primary btn-sm",
                                    onClick: ($event) => toggleDelivery(buyer)
                                  }, toDisplayString(buyer.is_delivered ? "Batalkan" : "Checklist"), 9, ["onClick"])
                                ])
                              ]);
                            }), 128))
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
      _push(`<div class="modal fade" id="addMenuModal" tabindex="-1" aria-labelledby="addMenuModalLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="addMenuModalLabel"> Tambah Menu Baru </h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><form><div class="mb-3"><label class="form-label fw-medium">Stand</label><select class="form-select form-select-sm"><!--[-->`);
      ssrRenderList(__props.stands, (stand) => {
        _push(`<option${ssrRenderAttr("value", stand.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(menuForm).stand_id) ? ssrLooseContain(unref(menuForm).stand_id, stand.id) : ssrLooseEqual(unref(menuForm).stand_id, stand.id)) ? " selected" : ""}>${ssrInterpolate(stand.name)}</option>`);
      });
      _push(`<!--]--></select>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        message: unref(menuForm).errors.stand_id,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="mb-3"><label for="addMenuName" class="form-label fw-medium">Nama Menu</label><input${ssrRenderAttr("value", unref(menuForm).name)} type="text" class="form-control form-control-sm" id="addMenuName" required>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        message: unref(menuForm).errors.name,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="mb-3"><label for="addMenuCategory" class="form-label fw-medium">Kategori</label>`);
      _push(ssrRenderComponent(unref(vSelect), {
        modelValue: unref(menuForm).category,
        "onUpdate:modelValue": ($event) => unref(menuForm).category = $event,
        options: [.../* @__PURE__ */ new Set([...__props.all_categories || [], "Main Course", "Drink", "Snack", "Dessert"])],
        id: "addMenuCategory",
        class: ["basic-single", { "is-invalid": unref(menuForm).errors.category }],
        placeholder: "Pilih Kategori",
        taggable: ""
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        message: unref(menuForm).errors.category,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="mb-3"><label for="addMenuFoodTag" class="form-label fw-medium">Food Tag</label>`);
      _push(ssrRenderComponent(unref(vSelect), {
        modelValue: unref(menuForm).food_tag,
        "onUpdate:modelValue": ($event) => unref(menuForm).food_tag = $event,
        options: __props.food_tag_list,
        label: "name",
        reduce: (tag) => tag.id,
        id: "addMenuFoodTag",
        class: ["basic-single", { "is-invalid": unref(menuForm).errors.food_tag }],
        multiple: "",
        placeholder: "Pilih Food Tag"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        message: unref(menuForm).errors.food_tag,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="row g-2 mb-3"><div class="col-md-6"><label for="addMenuPrice" class="form-label fw-medium">Harga Jual</label><input${ssrRenderAttr("value", unref(menuForm).price)} type="number" class="form-control form-control-sm" id="addMenuPrice" required>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        message: unref(menuForm).errors.price,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="col-md-6"><label for="addMenuStock" class="form-label fw-medium">Stock Awal</label><input${ssrRenderAttr("value", unref(menuForm).stock)} type="number" class="form-control form-control-sm" id="addMenuStock" required>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        message: unref(menuForm).errors.stock,
        class: "mt-2"
      }, null, _parent));
      _push(`</div></div><div class="row g-2 mb-3"><div class="col-md-6"><label for="addMenuVolume" class="form-label fw-medium">Volume</label><div class="input-group"><input${ssrRenderAttr("value", unref(menuForm).volume)} type="number" class="form-control form-control-sm" id="addMenuVolume"><select class="form-select form-select-sm" id="addMenuVolumeUnit"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(menuForm).volume_unit) ? ssrLooseContain(unref(menuForm).volume_unit, "") : ssrLooseEqual(unref(menuForm).volume_unit, "")) ? " selected" : ""}>Unit</option><option value="ml"${ssrIncludeBooleanAttr(Array.isArray(unref(menuForm).volume_unit) ? ssrLooseContain(unref(menuForm).volume_unit, "ml") : ssrLooseEqual(unref(menuForm).volume_unit, "ml")) ? " selected" : ""}>ml</option><option value="l"${ssrIncludeBooleanAttr(Array.isArray(unref(menuForm).volume_unit) ? ssrLooseContain(unref(menuForm).volume_unit, "l") : ssrLooseEqual(unref(menuForm).volume_unit, "l")) ? " selected" : ""}>l</option><option value="cc"${ssrIncludeBooleanAttr(Array.isArray(unref(menuForm).volume_unit) ? ssrLooseContain(unref(menuForm).volume_unit, "cc") : ssrLooseEqual(unref(menuForm).volume_unit, "cc")) ? " selected" : ""}>cc</option><option value="g"${ssrIncludeBooleanAttr(Array.isArray(unref(menuForm).volume_unit) ? ssrLooseContain(unref(menuForm).volume_unit, "g") : ssrLooseEqual(unref(menuForm).volume_unit, "g")) ? " selected" : ""}>g</option><option value="kg"${ssrIncludeBooleanAttr(Array.isArray(unref(menuForm).volume_unit) ? ssrLooseContain(unref(menuForm).volume_unit, "kg") : ssrLooseEqual(unref(menuForm).volume_unit, "kg")) ? " selected" : ""}>kg</option><option value="pcs"${ssrIncludeBooleanAttr(Array.isArray(unref(menuForm).volume_unit) ? ssrLooseContain(unref(menuForm).volume_unit, "pcs") : ssrLooseEqual(unref(menuForm).volume_unit, "pcs")) ? " selected" : ""}>pcs</option></select></div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        message: unref(menuForm).errors.volume,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="col-md-6"><label for="addMenuMass" class="form-label fw-medium">Massa</label><div class="input-group"><input${ssrRenderAttr("value", unref(menuForm).mass)} type="number" class="form-control form-control-sm" id="addMenuMass"><select class="form-select form-select-sm" id="addMenuMassUnit"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(menuForm).mass_unit) ? ssrLooseContain(unref(menuForm).mass_unit, "") : ssrLooseEqual(unref(menuForm).mass_unit, "")) ? " selected" : ""}>Unit</option><option value="gr"${ssrIncludeBooleanAttr(Array.isArray(unref(menuForm).mass_unit) ? ssrLooseContain(unref(menuForm).mass_unit, "gr") : ssrLooseEqual(unref(menuForm).mass_unit, "gr")) ? " selected" : ""}>gr</option><option value="kg"${ssrIncludeBooleanAttr(Array.isArray(unref(menuForm).mass_unit) ? ssrLooseContain(unref(menuForm).mass_unit, "kg") : ssrLooseEqual(unref(menuForm).mass_unit, "kg")) ? " selected" : ""}>kg</option></select></div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        message: unref(menuForm).errors.mass,
        class: "mt-2"
      }, null, _parent));
      _push(`</div></div><div class="mb-3"><label for="addMenuImage" class="form-label fw-medium">Gambar Menu</label><input class="form-control form-control-sm" type="file" id="addMenuImage" accept="image/*">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        message: unref(menuForm).errors.image,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="d-flex justify-content-end"><button type="button" class="btn btn-secondary btn-sm me-2" data-bs-dismiss="modal"> Tutup </button><button type="submit" class="btn btn-primary btn-sm"${ssrIncludeBooleanAttr(unref(menuForm).processing) ? " disabled" : ""}>${ssrInterpolate(unref(menuForm).processing ? "Menyimpan..." : "Simpan Menu")}</button></div></form></div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Business/MenuBoard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=MenuBoard-BOA2xzeY.js.map
