import { ref, computed, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, withDirectives, Fragment, renderList, vModelSelect, withModifiers, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-Cpng7oLR.js";
import { _ as _sfc_main$1 } from "./Notif-DL0SggHu.js";
import { useForm, Head, router } from "@inertiajs/vue3";
import { f as formatIDR } from "./utils-DIF4pdrF.js";
import "./ModalConfirmation-CaKJYApU.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
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
    const activeMenuCount = computed(() => props.menus.filter((menu) => menu.is_published).length);
    function filterStand() {
      router.get(route("staff.production.panel.index"), { stand_id: selectedStandId.value }, { preserveState: true, replace: true });
    }
    function submitMenu() {
      menuForm.stand_id = selectedStandId.value;
      menuForm.post(route("staff.sales-distribution.menu.store"), {
        preserveScroll: true,
        onSuccess: () => menuForm.reset("name", "category", "food_tag", "price", "stock")
      });
    }
    function togglePublish(menu) {
      router.post(route("staff.production.panel.publish", { menu: menu.id }), {}, { preserveScroll: true });
    }
    function updateStock(menuId) {
      const amount = stockForms.value[`amount_${menuId}`];
      const request_id = crypto.randomUUID();
      router.post(route("staff.production.panel.stock.update", { menu: menuId }), {
        amount,
        request_id,
        reason: stockForms.value[`reason_${menuId}`] || "production",
        notes: stockForms.value[`notes_${menuId}`] || null
      }, { preserveScroll: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Production Panel" }, null, _parent));
      _push(ssrRenderComponent(StaffLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container-fluid py-4"${_scopeId}>`);
            if (__props.notif) {
              _push2(ssrRenderComponent(_sfc_main$1, { notif: __props.notif }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (!__props.stands.length) {
              _push2(`<div class="alert alert-warning"${_scopeId}> Anda belum ditugaskan ke stand aktif. Hubungi Operational Officer untuk menambahkan assignment Production. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="row g-4"${_scopeId}><div class="col-12"${_scopeId}><div class="card border-0 shadow-sm"${_scopeId}><div class="card-body d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center"${_scopeId}><div${_scopeId}><h4 class="mb-1"${_scopeId}><i class="bi bi-tools me-2 text-primary"${_scopeId}></i>Production Panel </h4><p class="text-muted mb-0"${_scopeId}><i class="bi bi-info-circle me-1"${_scopeId}></i> Buat menu baru, kelola stok produksi, dan tandai menu yang siap dijual ke customer. </p></div><div class="d-flex gap-2 align-items-center"${_scopeId}><span class="badge bg-primary"${_scopeId}>Published ${ssrInterpolate(activeMenuCount.value)}</span><select class="form-select" style="${ssrRenderStyle({ "min-width": "220px" })}"${_scopeId}><!--[-->`);
            ssrRenderList(__props.stands, (stand) => {
              _push2(`<option${ssrRenderAttr("value", stand.id)}${ssrIncludeBooleanAttr(Array.isArray(selectedStandId.value) ? ssrLooseContain(selectedStandId.value, stand.id) : ssrLooseEqual(selectedStandId.value, stand.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(stand.name)}</option>`);
            });
            _push2(`<!--]--></select></div></div></div></div>`);
            if (selectedStandId.value) {
              _push2(`<div class="col-12"${_scopeId}><div class="card border-0 shadow-sm"${_scopeId}><div class="card-header bg-white border-bottom pt-4 pb-3"${_scopeId}><div class="d-flex align-items-start gap-3"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="bg-primary bg-opacity-10 rounded-circle p-3"${_scopeId}><i class="bi bi-plus-circle text-primary fs-3"${_scopeId}></i></div></div><div class="flex-grow-1"${_scopeId}><h5 class="mb-2 fw-bold"${_scopeId}>Tambah Menu Produksi Baru</h5><div class="alert alert-info mb-0"${_scopeId}><div class="d-flex align-items-start"${_scopeId}><i class="bi bi-info-circle-fill me-2 flex-shrink-0 mt-1"${_scopeId}></i><div${_scopeId}><strong${_scopeId}>Cara Mengisi Form:</strong><ul class="mb-0 mt-1 ps-3"${_scopeId}><li${_scopeId}><strong${_scopeId}>Nama Menu:</strong> Tulis nama makanan/minuman yang akan diproduksi</li><li${_scopeId}><strong${_scopeId}>Kategori:</strong> Jenis menu (Makanan Berat, Minuman, Snack, dll)</li><li${_scopeId}><strong${_scopeId}>Harga Jual:</strong> Harga yang akan dijual ke customer (dalam Rupiah)</li><li${_scopeId}><strong${_scopeId}>Stok Awal:</strong> Jumlah porsi yang sudah siap dijual saat ini</li><li${_scopeId}><strong${_scopeId}>Tag Menu:</strong> Pilih karakteristik menu (Pedas, Manis, Halal, dll) - Tekan Ctrl untuk pilih lebih dari satu</li></ul></div></div></div></div></div></div><form class="card-body row g-3"${_scopeId}><div class="col-md-4"${_scopeId}><label for="menuName" class="form-label fw-semibold mb-2"${_scopeId}><i class="bi bi-card-text me-2 text-primary"${_scopeId}></i>Nama Menu <span class="text-danger"${_scopeId}>*</span></label><input id="menuName"${ssrRenderAttr("value", unref(menuForm).name)} class="form-control form-control-lg" placeholder="Contoh: Nasi Goreng Spesial" required${_scopeId}><small class="text-muted"${_scopeId}>Nama menu yang akan ditampilkan ke customer</small></div><div class="col-md-3"${_scopeId}><label for="menuCategory" class="form-label fw-semibold mb-2"${_scopeId}><i class="bi bi-tag me-2 text-primary"${_scopeId}></i>Kategori <span class="text-danger"${_scopeId}>*</span></label><input id="menuCategory"${ssrRenderAttr("value", unref(menuForm).category)} class="form-control form-control-lg" placeholder="Contoh: Makanan Berat" required${_scopeId}><small class="text-muted"${_scopeId}>Jenis/kategori menu</small></div><div class="col-md-2"${_scopeId}><label for="menuPrice" class="form-label fw-semibold mb-2"${_scopeId}><i class="bi bi-cash me-2 text-success"${_scopeId}></i>Harga Jual (Rp) <span class="text-danger"${_scopeId}>*</span></label><input id="menuPrice"${ssrRenderAttr("value", unref(menuForm).price)} type="number" min="0" step="1000" class="form-control form-control-lg" placeholder="15000" required${_scopeId}><small class="text-muted"${_scopeId}>Harga jual ke customer</small></div><div class="col-md-3"${_scopeId}><label for="menuStock" class="form-label fw-semibold mb-2"${_scopeId}><i class="bi bi-box-seam me-2 text-warning"${_scopeId}></i>Stok Awal (Porsi) <span class="text-danger"${_scopeId}>*</span></label><input id="menuStock"${ssrRenderAttr("value", unref(menuForm).stock)} type="number" min="0" class="form-control form-control-lg" placeholder="20" required${_scopeId}><small class="text-muted"${_scopeId}>Jumlah porsi yang sudah siap</small></div><div class="col-md-8"${_scopeId}><label for="menuTags" class="form-label fw-semibold mb-2"${_scopeId}><i class="bi bi-tags me-2 text-info"${_scopeId}></i>Tag Menu <span class="text-danger"${_scopeId}>*</span></label><select id="menuTags" class="form-select form-select-lg" multiple required style="${ssrRenderStyle({ "min-height": "80px" })}"${_scopeId}><!--[-->`);
              ssrRenderList(__props.foodTags, (tag) => {
                _push2(`<option${ssrRenderAttr("value", tag.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(menuForm).food_tag) ? ssrLooseContain(unref(menuForm).food_tag, tag.id) : ssrLooseEqual(unref(menuForm).food_tag, tag.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(tag.name)}</option>`);
              });
              _push2(`<!--]--></select><small class="text-muted"${_scopeId}><i class="bi bi-hand-index me-1"${_scopeId}></i><strong${_scopeId}>Cara memilih:</strong> Tekan dan tahan tombol <kbd${_scopeId}>Ctrl</kbd> (Windows) atau <kbd${_scopeId}>Cmd</kbd> (Mac), lalu klik beberapa tag </small></div><div class="col-md-4 d-grid align-self-end"${_scopeId}><button class="btn btn-primary btn-lg"${ssrIncludeBooleanAttr(unref(menuForm).processing) ? " disabled" : ""}${_scopeId}><i class="bi bi-plus-lg me-2"${_scopeId}></i> ${ssrInterpolate(unref(menuForm).processing ? "Menambah Menu..." : "Tambah Menu")}</button></div>`);
              if (Object.keys(unref(menuForm).errors).length) {
                _push2(`<div class="col-12"${_scopeId}><div class="alert alert-danger mb-0"${_scopeId}><i class="bi bi-exclamation-triangle-fill me-2"${_scopeId}></i><strong${_scopeId}>Error:</strong> ${ssrInterpolate(Object.values(unref(menuForm).errors)[0])}</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="col-12"${_scopeId}><div class="card border-0 shadow-sm"${_scopeId}><div class="card-header bg-white border-bottom pt-4 pb-3"${_scopeId}><div class="d-flex align-items-start gap-3"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="bg-success bg-opacity-10 rounded-circle p-3"${_scopeId}><i class="bi bi-list-check text-success fs-3"${_scopeId}></i></div></div><div class="flex-grow-1"${_scopeId}><h5 class="mb-2 fw-bold"${_scopeId}>Kelola Menu &amp; Stok Produksi</h5><div class="alert alert-light border mb-0"${_scopeId}><div class="d-flex align-items-start"${_scopeId}><i class="bi bi-lightbulb-fill me-2 flex-shrink-0 mt-1 text-warning"${_scopeId}></i><div${_scopeId}><strong${_scopeId}>Panduan Kolom Aksi:</strong><ul class="mb-0 mt-1 ps-3 small"${_scopeId}><li${_scopeId}><strong${_scopeId}>Jumlah:</strong> Isi angka positif (+) untuk menambah stok, atau negatif (-) untuk mengurangi stok</li><li${_scopeId}><strong${_scopeId}>Alasan:</strong> Pilih alasan perubahan stok (Produksi = tambah stok baru, Koreksi = perbaikan data, Rusak/Retur = kurangi stok)</li><li${_scopeId}><strong${_scopeId}>Tombol Update:</strong> Klik untuk menyimpan perubahan stok</li><li${_scopeId}><strong${_scopeId}>Tombol Siap Jual:</strong> Tandai menu sudah siap untuk dipublish oleh Sales Distribution ke toko online</li></ul></div></div></div></div></div></div><div class="card-body table-responsive"${_scopeId}><table class="table align-middle table-hover"${_scopeId}><thead class="table-light"${_scopeId}><tr${_scopeId}><th class="fw-semibold"${_scopeId}>Menu</th><th class="fw-semibold"${_scopeId}>Stock Saat Ini</th><th class="fw-semibold"${_scopeId}>Biaya Produksi</th><th class="fw-semibold"${_scopeId}>Harga Jual</th><th class="fw-semibold"${_scopeId}>Status</th><th class="fw-semibold"${_scopeId}>Mutasi Terakhir</th><th class="fw-semibold text-center"${_scopeId}>Kelola Stok &amp; Status</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.menus, (menu) => {
              _push2(`<tr${_scopeId}><td${_scopeId}><div class="fw-semibold"${_scopeId}>${ssrInterpolate(menu.name)}</div><small class="text-muted"${_scopeId}>${ssrInterpolate(menu.category)}</small></td><td${_scopeId}><span class="badge bg-primary fs-6"${_scopeId}>${ssrInterpolate(menu.stock)} porsi</span></td><td${_scopeId}>${ssrInterpolate(menu.cost ? unref(formatIDR)(menu.cost) : "-")}</td><td${_scopeId}>${ssrInterpolate(unref(formatIDR)(menu.price))}</td><td${_scopeId}><span class="${ssrRenderClass([menu.is_published ? "bg-success" : menu.workflow_status === "ready" ? "bg-info" : "bg-secondary", "badge"])}"${_scopeId}>${ssrInterpolate(menu.workflow_status === "ready" ? "✓ Siap Dijual" : menu.is_published ? "Published" : "Draft")}</span></td><td class="small text-muted"${_scopeId}>`);
              if (menu.latest_stock_movement) {
                _push2(`<!--[--><span class="${ssrRenderClass(menu.latest_stock_movement.change > 0 ? "text-success fw-semibold" : "text-danger fw-semibold")}"${_scopeId}>${ssrInterpolate(menu.latest_stock_movement.change > 0 ? "+" : "")}${ssrInterpolate(menu.latest_stock_movement.change)}</span> · ${ssrInterpolate(menu.latest_stock_movement.staff || "Sistem")}<!--]-->`);
              } else {
                _push2(`<span${_scopeId}>-</span>`);
              }
              _push2(`</td><td${_scopeId}><div class="d-flex gap-2 flex-wrap justify-content-center align-items-end"${_scopeId}><div style="${ssrRenderStyle({ "width": "120px" })}"${_scopeId}><label${ssrRenderAttr("for", `stockAmount_${menu.id}`)} class="form-label small mb-1 fw-semibold"${_scopeId}><i class="bi bi-hash"${_scopeId}></i> Jumlah Stok </label><input${ssrRenderAttr("id", `stockAmount_${menu.id}`)}${ssrRenderAttr("value", stockForms.value[`amount_${menu.id}`])} type="number" class="form-control form-control-sm text-center" placeholder="±10" title="Isi angka positif untuk tambah stok, negatif untuk kurangi stok"${_scopeId}></div><div style="${ssrRenderStyle({ "width": "140px" })}"${_scopeId}><label${ssrRenderAttr("for", `stockReason_${menu.id}`)} class="form-label small mb-1 fw-semibold"${_scopeId}><i class="bi bi-question-circle"${_scopeId}></i> Alasan </label><select${ssrRenderAttr("id", `stockReason_${menu.id}`)} class="form-select form-select-sm"${_scopeId}><option value="production"${ssrIncludeBooleanAttr(Array.isArray(stockForms.value[`reason_${menu.id}`]) ? ssrLooseContain(stockForms.value[`reason_${menu.id}`], "production") : ssrLooseEqual(stockForms.value[`reason_${menu.id}`], "production")) ? " selected" : ""}${_scopeId}>➕ Produksi</option><option value="correction"${ssrIncludeBooleanAttr(Array.isArray(stockForms.value[`reason_${menu.id}`]) ? ssrLooseContain(stockForms.value[`reason_${menu.id}`], "correction") : ssrLooseEqual(stockForms.value[`reason_${menu.id}`], "correction")) ? " selected" : ""}${_scopeId}>🔧 Koreksi</option><option value="damaged"${ssrIncludeBooleanAttr(Array.isArray(stockForms.value[`reason_${menu.id}`]) ? ssrLooseContain(stockForms.value[`reason_${menu.id}`], "damaged") : ssrLooseEqual(stockForms.value[`reason_${menu.id}`], "damaged")) ? " selected" : ""}${_scopeId}>❌ Rusak</option><option value="return"${ssrIncludeBooleanAttr(Array.isArray(stockForms.value[`reason_${menu.id}`]) ? ssrLooseContain(stockForms.value[`reason_${menu.id}`], "return") : ssrLooseEqual(stockForms.value[`reason_${menu.id}`], "return")) ? " selected" : ""}${_scopeId}>🔄 Retur</option></select></div><div${_scopeId}><button class="btn btn-primary btn-sm" title="Klik untuk menyimpan perubahan stok"${_scopeId}><i class="bi bi-save me-1"${_scopeId}></i>Update Stok </button></div><div${_scopeId}><button class="${ssrRenderClass([menu.workflow_status === "ready" ? "btn-warning" : "btn-success", "btn btn-sm"])}"${ssrRenderAttr("title", menu.workflow_status === "ready" ? "Batalkan status siap dijual" : "Tandai menu siap dijual ke customer")}${_scopeId}><i class="${ssrRenderClass([menu.workflow_status === "ready" ? "bi bi-x-circle" : "bi bi-check-circle", "me-1"])}"${_scopeId}></i> ${ssrInterpolate(menu.workflow_status === "ready" ? "Batalkan" : "Siap Jual")}</button></div></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (!__props.menus.length) {
              _push2(`<tr${_scopeId}><td colspan="7" class="text-center text-muted py-4"${_scopeId}><i class="bi bi-inbox fs-1 d-block mb-2"${_scopeId}></i> Belum ada menu. Silakan tambahkan menu baru di form di atas. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-fluid py-4" }, [
                __props.notif ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 0,
                  notif: __props.notif
                }, null, 8, ["notif"])) : createCommentVNode("", true),
                !__props.stands.length ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "alert alert-warning"
                }, " Anda belum ditugaskan ke stand aktif. Hubungi Operational Officer untuk menambahkan assignment Production. ")) : createCommentVNode("", true),
                createVNode("div", { class: "row g-4" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card border-0 shadow-sm" }, [
                      createVNode("div", { class: "card-body d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center" }, [
                        createVNode("div", null, [
                          createVNode("h4", { class: "mb-1" }, [
                            createVNode("i", { class: "bi bi-tools me-2 text-primary" }),
                            createTextVNode("Production Panel ")
                          ]),
                          createVNode("p", { class: "text-muted mb-0" }, [
                            createVNode("i", { class: "bi bi-info-circle me-1" }),
                            createTextVNode(" Buat menu baru, kelola stok produksi, dan tandai menu yang siap dijual ke customer. ")
                          ])
                        ]),
                        createVNode("div", { class: "d-flex gap-2 align-items-center" }, [
                          createVNode("span", { class: "badge bg-primary" }, "Published " + toDisplayString(activeMenuCount.value), 1),
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
                  ]),
                  selectedStandId.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "col-12"
                  }, [
                    createVNode("div", { class: "card border-0 shadow-sm" }, [
                      createVNode("div", { class: "card-header bg-white border-bottom pt-4 pb-3" }, [
                        createVNode("div", { class: "d-flex align-items-start gap-3" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode("div", { class: "bg-primary bg-opacity-10 rounded-circle p-3" }, [
                              createVNode("i", { class: "bi bi-plus-circle text-primary fs-3" })
                            ])
                          ]),
                          createVNode("div", { class: "flex-grow-1" }, [
                            createVNode("h5", { class: "mb-2 fw-bold" }, "Tambah Menu Produksi Baru"),
                            createVNode("div", { class: "alert alert-info mb-0" }, [
                              createVNode("div", { class: "d-flex align-items-start" }, [
                                createVNode("i", { class: "bi bi-info-circle-fill me-2 flex-shrink-0 mt-1" }),
                                createVNode("div", null, [
                                  createVNode("strong", null, "Cara Mengisi Form:"),
                                  createVNode("ul", { class: "mb-0 mt-1 ps-3" }, [
                                    createVNode("li", null, [
                                      createVNode("strong", null, "Nama Menu:"),
                                      createTextVNode(" Tulis nama makanan/minuman yang akan diproduksi")
                                    ]),
                                    createVNode("li", null, [
                                      createVNode("strong", null, "Kategori:"),
                                      createTextVNode(" Jenis menu (Makanan Berat, Minuman, Snack, dll)")
                                    ]),
                                    createVNode("li", null, [
                                      createVNode("strong", null, "Harga Jual:"),
                                      createTextVNode(" Harga yang akan dijual ke customer (dalam Rupiah)")
                                    ]),
                                    createVNode("li", null, [
                                      createVNode("strong", null, "Stok Awal:"),
                                      createTextVNode(" Jumlah porsi yang sudah siap dijual saat ini")
                                    ]),
                                    createVNode("li", null, [
                                      createVNode("strong", null, "Tag Menu:"),
                                      createTextVNode(" Pilih karakteristik menu (Pedas, Manis, Halal, dll) - Tekan Ctrl untuk pilih lebih dari satu")
                                    ])
                                  ])
                                ])
                              ])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("form", {
                        class: "card-body row g-3",
                        onSubmit: withModifiers(submitMenu, ["prevent"])
                      }, [
                        createVNode("div", { class: "col-md-4" }, [
                          createVNode("label", {
                            for: "menuName",
                            class: "form-label fw-semibold mb-2"
                          }, [
                            createVNode("i", { class: "bi bi-card-text me-2 text-primary" }),
                            createTextVNode("Nama Menu "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            id: "menuName",
                            "onUpdate:modelValue": ($event) => unref(menuForm).name = $event,
                            class: "form-control form-control-lg",
                            placeholder: "Contoh: Nasi Goreng Spesial",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(menuForm).name]
                          ]),
                          createVNode("small", { class: "text-muted" }, "Nama menu yang akan ditampilkan ke customer")
                        ]),
                        createVNode("div", { class: "col-md-3" }, [
                          createVNode("label", {
                            for: "menuCategory",
                            class: "form-label fw-semibold mb-2"
                          }, [
                            createVNode("i", { class: "bi bi-tag me-2 text-primary" }),
                            createTextVNode("Kategori "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            id: "menuCategory",
                            "onUpdate:modelValue": ($event) => unref(menuForm).category = $event,
                            class: "form-control form-control-lg",
                            placeholder: "Contoh: Makanan Berat",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(menuForm).category]
                          ]),
                          createVNode("small", { class: "text-muted" }, "Jenis/kategori menu")
                        ]),
                        createVNode("div", { class: "col-md-2" }, [
                          createVNode("label", {
                            for: "menuPrice",
                            class: "form-label fw-semibold mb-2"
                          }, [
                            createVNode("i", { class: "bi bi-cash me-2 text-success" }),
                            createTextVNode("Harga Jual (Rp) "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            id: "menuPrice",
                            "onUpdate:modelValue": ($event) => unref(menuForm).price = $event,
                            type: "number",
                            min: "0",
                            step: "1000",
                            class: "form-control form-control-lg",
                            placeholder: "15000",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [
                              vModelText,
                              unref(menuForm).price,
                              void 0,
                              { number: true }
                            ]
                          ]),
                          createVNode("small", { class: "text-muted" }, "Harga jual ke customer")
                        ]),
                        createVNode("div", { class: "col-md-3" }, [
                          createVNode("label", {
                            for: "menuStock",
                            class: "form-label fw-semibold mb-2"
                          }, [
                            createVNode("i", { class: "bi bi-box-seam me-2 text-warning" }),
                            createTextVNode("Stok Awal (Porsi) "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            id: "menuStock",
                            "onUpdate:modelValue": ($event) => unref(menuForm).stock = $event,
                            type: "number",
                            min: "0",
                            class: "form-control form-control-lg",
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
                          createVNode("small", { class: "text-muted" }, "Jumlah porsi yang sudah siap")
                        ]),
                        createVNode("div", { class: "col-md-8" }, [
                          createVNode("label", {
                            for: "menuTags",
                            class: "form-label fw-semibold mb-2"
                          }, [
                            createVNode("i", { class: "bi bi-tags me-2 text-info" }),
                            createTextVNode("Tag Menu "),
                            createVNode("span", { class: "text-danger" }, "*")
                          ]),
                          withDirectives(createVNode("select", {
                            id: "menuTags",
                            "onUpdate:modelValue": ($event) => unref(menuForm).food_tag = $event,
                            class: "form-select form-select-lg",
                            multiple: "",
                            required: "",
                            style: { "min-height": "80px" }
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.foodTags, (tag) => {
                              return openBlock(), createBlock("option", {
                                key: tag.id,
                                value: tag.id
                              }, toDisplayString(tag.name), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(menuForm).food_tag]
                          ]),
                          createVNode("small", { class: "text-muted" }, [
                            createVNode("i", { class: "bi bi-hand-index me-1" }),
                            createVNode("strong", null, "Cara memilih:"),
                            createTextVNode(" Tekan dan tahan tombol "),
                            createVNode("kbd", null, "Ctrl"),
                            createTextVNode(" (Windows) atau "),
                            createVNode("kbd", null, "Cmd"),
                            createTextVNode(" (Mac), lalu klik beberapa tag ")
                          ])
                        ]),
                        createVNode("div", { class: "col-md-4 d-grid align-self-end" }, [
                          createVNode("button", {
                            class: "btn btn-primary btn-lg",
                            disabled: unref(menuForm).processing
                          }, [
                            createVNode("i", { class: "bi bi-plus-lg me-2" }),
                            createTextVNode(" " + toDisplayString(unref(menuForm).processing ? "Menambah Menu..." : "Tambah Menu"), 1)
                          ], 8, ["disabled"])
                        ]),
                        Object.keys(unref(menuForm).errors).length ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "col-12"
                        }, [
                          createVNode("div", { class: "alert alert-danger mb-0" }, [
                            createVNode("i", { class: "bi bi-exclamation-triangle-fill me-2" }),
                            createVNode("strong", null, "Error:"),
                            createTextVNode(" " + toDisplayString(Object.values(unref(menuForm).errors)[0]), 1)
                          ])
                        ])) : createCommentVNode("", true)
                      ], 32)
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card border-0 shadow-sm" }, [
                      createVNode("div", { class: "card-header bg-white border-bottom pt-4 pb-3" }, [
                        createVNode("div", { class: "d-flex align-items-start gap-3" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode("div", { class: "bg-success bg-opacity-10 rounded-circle p-3" }, [
                              createVNode("i", { class: "bi bi-list-check text-success fs-3" })
                            ])
                          ]),
                          createVNode("div", { class: "flex-grow-1" }, [
                            createVNode("h5", { class: "mb-2 fw-bold" }, "Kelola Menu & Stok Produksi"),
                            createVNode("div", { class: "alert alert-light border mb-0" }, [
                              createVNode("div", { class: "d-flex align-items-start" }, [
                                createVNode("i", { class: "bi bi-lightbulb-fill me-2 flex-shrink-0 mt-1 text-warning" }),
                                createVNode("div", null, [
                                  createVNode("strong", null, "Panduan Kolom Aksi:"),
                                  createVNode("ul", { class: "mb-0 mt-1 ps-3 small" }, [
                                    createVNode("li", null, [
                                      createVNode("strong", null, "Jumlah:"),
                                      createTextVNode(" Isi angka positif (+) untuk menambah stok, atau negatif (-) untuk mengurangi stok")
                                    ]),
                                    createVNode("li", null, [
                                      createVNode("strong", null, "Alasan:"),
                                      createTextVNode(" Pilih alasan perubahan stok (Produksi = tambah stok baru, Koreksi = perbaikan data, Rusak/Retur = kurangi stok)")
                                    ]),
                                    createVNode("li", null, [
                                      createVNode("strong", null, "Tombol Update:"),
                                      createTextVNode(" Klik untuk menyimpan perubahan stok")
                                    ]),
                                    createVNode("li", null, [
                                      createVNode("strong", null, "Tombol Siap Jual:"),
                                      createTextVNode(" Tandai menu sudah siap untuk dipublish oleh Sales Distribution ke toko online")
                                    ])
                                  ])
                                ])
                              ])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "card-body table-responsive" }, [
                        createVNode("table", { class: "table align-middle table-hover" }, [
                          createVNode("thead", { class: "table-light" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "fw-semibold" }, "Menu"),
                              createVNode("th", { class: "fw-semibold" }, "Stock Saat Ini"),
                              createVNode("th", { class: "fw-semibold" }, "Biaya Produksi"),
                              createVNode("th", { class: "fw-semibold" }, "Harga Jual"),
                              createVNode("th", { class: "fw-semibold" }, "Status"),
                              createVNode("th", { class: "fw-semibold" }, "Mutasi Terakhir"),
                              createVNode("th", { class: "fw-semibold text-center" }, "Kelola Stok & Status")
                            ])
                          ]),
                          createVNode("tbody", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.menus, (menu) => {
                              return openBlock(), createBlock("tr", {
                                key: menu.id
                              }, [
                                createVNode("td", null, [
                                  createVNode("div", { class: "fw-semibold" }, toDisplayString(menu.name), 1),
                                  createVNode("small", { class: "text-muted" }, toDisplayString(menu.category), 1)
                                ]),
                                createVNode("td", null, [
                                  createVNode("span", { class: "badge bg-primary fs-6" }, toDisplayString(menu.stock) + " porsi", 1)
                                ]),
                                createVNode("td", null, toDisplayString(menu.cost ? unref(formatIDR)(menu.cost) : "-"), 1),
                                createVNode("td", null, toDisplayString(unref(formatIDR)(menu.price)), 1),
                                createVNode("td", null, [
                                  createVNode("span", {
                                    class: ["badge", menu.is_published ? "bg-success" : menu.workflow_status === "ready" ? "bg-info" : "bg-secondary"]
                                  }, toDisplayString(menu.workflow_status === "ready" ? "✓ Siap Dijual" : menu.is_published ? "Published" : "Draft"), 3)
                                ]),
                                createVNode("td", { class: "small text-muted" }, [
                                  menu.latest_stock_movement ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createVNode("span", {
                                      class: menu.latest_stock_movement.change > 0 ? "text-success fw-semibold" : "text-danger fw-semibold"
                                    }, toDisplayString(menu.latest_stock_movement.change > 0 ? "+" : "") + toDisplayString(menu.latest_stock_movement.change), 3),
                                    createTextVNode(" · " + toDisplayString(menu.latest_stock_movement.staff || "Sistem"), 1)
                                  ], 64)) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                                ]),
                                createVNode("td", null, [
                                  createVNode("div", { class: "d-flex gap-2 flex-wrap justify-content-center align-items-end" }, [
                                    createVNode("div", { style: { "width": "120px" } }, [
                                      createVNode("label", {
                                        for: `stockAmount_${menu.id}`,
                                        class: "form-label small mb-1 fw-semibold"
                                      }, [
                                        createVNode("i", { class: "bi bi-hash" }),
                                        createTextVNode(" Jumlah Stok ")
                                      ], 8, ["for"]),
                                      withDirectives(createVNode("input", {
                                        id: `stockAmount_${menu.id}`,
                                        "onUpdate:modelValue": ($event) => stockForms.value[`amount_${menu.id}`] = $event,
                                        type: "number",
                                        class: "form-control form-control-sm text-center",
                                        placeholder: "±10",
                                        title: "Isi angka positif untuk tambah stok, negatif untuk kurangi stok"
                                      }, null, 8, ["id", "onUpdate:modelValue"]), [
                                        [vModelText, stockForms.value[`amount_${menu.id}`]]
                                      ])
                                    ]),
                                    createVNode("div", { style: { "width": "140px" } }, [
                                      createVNode("label", {
                                        for: `stockReason_${menu.id}`,
                                        class: "form-label small mb-1 fw-semibold"
                                      }, [
                                        createVNode("i", { class: "bi bi-question-circle" }),
                                        createTextVNode(" Alasan ")
                                      ], 8, ["for"]),
                                      withDirectives(createVNode("select", {
                                        id: `stockReason_${menu.id}`,
                                        "onUpdate:modelValue": ($event) => stockForms.value[`reason_${menu.id}`] = $event,
                                        class: "form-select form-select-sm"
                                      }, [
                                        createVNode("option", { value: "production" }, "➕ Produksi"),
                                        createVNode("option", { value: "correction" }, "🔧 Koreksi"),
                                        createVNode("option", { value: "damaged" }, "❌ Rusak"),
                                        createVNode("option", { value: "return" }, "🔄 Retur")
                                      ], 8, ["id", "onUpdate:modelValue"]), [
                                        [vModelSelect, stockForms.value[`reason_${menu.id}`]]
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("button", {
                                        class: "btn btn-primary btn-sm",
                                        onClick: ($event) => updateStock(menu.id),
                                        title: "Klik untuk menyimpan perubahan stok"
                                      }, [
                                        createVNode("i", { class: "bi bi-save me-1" }),
                                        createTextVNode("Update Stok ")
                                      ], 8, ["onClick"])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("button", {
                                        class: ["btn btn-sm", menu.workflow_status === "ready" ? "btn-warning" : "btn-success"],
                                        onClick: ($event) => togglePublish(menu),
                                        title: menu.workflow_status === "ready" ? "Batalkan status siap dijual" : "Tandai menu siap dijual ke customer"
                                      }, [
                                        createVNode("i", {
                                          class: [menu.workflow_status === "ready" ? "bi bi-x-circle" : "bi bi-check-circle", "me-1"]
                                        }, null, 2),
                                        createTextVNode(" " + toDisplayString(menu.workflow_status === "ready" ? "Batalkan" : "Siap Jual"), 1)
                                      ], 10, ["onClick", "title"])
                                    ])
                                  ])
                                ])
                              ]);
                            }), 128)),
                            !__props.menus.length ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "7",
                                class: "text-center text-muted py-4"
                              }, [
                                createVNode("i", { class: "bi bi-inbox fs-1 d-block mb-2" }),
                                createTextVNode(" Belum ada menu. Silakan tambahkan menu baru di form di atas. ")
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
export {
  _sfc_main as default
};
//# sourceMappingURL=ProductionPanel-gAQWKf88.js.map
