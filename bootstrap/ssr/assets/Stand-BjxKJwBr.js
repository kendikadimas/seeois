import { computed, ref, onMounted, watch, withCtx, unref, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-DYM3ADh0.js";
import { _ as _sfc_main$1 } from "./InputError-DkffFxkw.js";
import { _ as _sfc_main$2 } from "./Notif-Zffab37M.js";
import vSelect from "vue-select";
/* empty css                    */
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { b as formatDateOnly } from "./utils-CBRgzR_O.js";
import "./ModalConfirmation-CzGDjmDO.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
import "date-fns";
const _sfc_main = {
  __name: "Stand",
  __ssrInlineRender: true,
  props: {
    staff_list: Array,
    stand_list: Array,
    governance_years: Array,
    selected_year_id: Number,
    active_year_id: Number,
    filter: Object,
    notif: Object,
    errors: Object
  },
  setup(__props) {
    const route = (name, params = {}) => window.route(name, params);
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const capabilities = computed(() => (auth_user == null ? void 0 : auth_user.capabilities) ?? []);
    const canManageStands = computed(() => capabilities.value.includes("*") || capabilities.value.includes("stands.manage"));
    const title = ref("Manajemen Stand");
    const toastNotifRef = ref(null);
    const modalNewStand = ref(null);
    const today = new Date(Date.now() - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
    const form_filter = useForm({
      category: props.filter.category,
      order: props.filter.order,
      active: props.filter.active,
      year_id: props.selected_year_id
    });
    const form_new_stand = useForm({
      name: null,
      pic_id: null,
      place: null,
      date: today,
      type: 0,
      year_id: props.selected_year_id
    });
    function safeNameLabel(option) {
      if (option == null) return "";
      if (typeof option === "string") return option;
      if (typeof option === "object") return option.name || option.label || "";
      return "";
    }
    function handleSubmitFilter(category) {
      if (category) {
        form_filter.order = form_filter.category == category ? form_filter.order == "asc" ? "desc" : "asc" : "desc";
        form_filter.category = category;
        form_filter.keyword = null;
      }
      form_filter.post(route("food.stand.filter"), { preserveScroll: true });
    }
    function showNewStandModal(is_show) {
      if (modalNewStand.value == null) {
        const modal = document.getElementById("newStandModal");
        modalNewStand.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      {
        form_new_stand.clearErrors();
        modalNewStand.value.show();
      }
    }
    function debugOpenStandDetail(stand) {
      console.debug("[Stand] opening detail", {
        standId: stand.id,
        standName: stand.name,
        href: `/seeo/staff/blaterian/foods/stand_detail/${stand.id}`,
        activeYearId: props.selected_year_id
      });
    }
    const standTypeLabel = (type) => ({ 0: "Live", 1: "Pre-order", 2: "Live & Pre-order" })[Number(type)] ?? "Tidak diketahui";
    onMounted(() => {
      var _a;
      if (props.notif) {
        (_a = toastNotifRef.value) == null ? void 0 : _a.showToast(props.notif.type, props.notif.message);
      }
    });
    watch(
      () => props.notif,
      (newValue) => {
        var _a;
        if (newValue) (_a = toastNotifRef.value) == null ? void 0 : _a.showToast(newValue.type, newValue.message);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
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
          var _a2, _b2;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: title.value,
              icon: "/favicon.ico"
            }, null, _parent2, _scopeId));
            _push2(`<div class="container-fluid py-3 py-md-4"${_scopeId}><section class="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 stand-hero"${_scopeId}><div class="card-body p-4 p-lg-5 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3"${_scopeId}><div${_scopeId}><span class="badge rounded-pill bg-primary-subtle text-primary border border-primary-subtle mb-2"${_scopeId}><i class="bi bi-shop me-1"${_scopeId}></i> Operasional Penjualan </span><h2 class="fw-bold mb-1"${_scopeId}>Manajemen Stand</h2><p class="text-muted mb-0"${_scopeId}>Buat stand, tentukan penanggung jawab, lalu kelola menu, bahan, kasir, dan penjualannya.</p></div>`);
            if (canManageStands.value) {
              _push2(`<button type="button" class="btn btn-primary btn-lg rounded-pill px-4 align-self-start align-self-lg-center"${_scopeId}><i class="bi bi-plus-circle-fill me-2"${_scopeId}></i>Tambah Stand Baru </button>`);
            } else {
              _push2(`<div class="alert alert-light border mb-0 py-2 px-3 small align-self-start align-self-lg-center"${_scopeId}><i class="bi bi-lock me-1 text-primary"${_scopeId}></i>Pembuatan stand hanya tersedia untuk COO dan Super Admin. </div>`);
            }
            _push2(`</div></section><section class="card border-0 shadow-sm rounded-4 mb-4"${_scopeId}><div class="card-body p-3 p-md-4"${_scopeId}><div class="d-flex flex-column flex-xl-row justify-content-between gap-3"${_scopeId}><div${_scopeId}><label class="form-label small fw-bold text-secondary mb-2"${_scopeId}>Periode kepengurusan</label><div class="d-flex flex-wrap gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(__props.governance_years, (year) => {
              _push2(`<a${ssrRenderAttr("href", route("food.stand", { year_id: year.id }))} class="${ssrRenderClass(["btn btn-sm rounded-pill px-3", __props.selected_year_id === year.id ? "btn-primary" : "btn-outline-secondary"])}"${_scopeId}>${ssrInterpolate(year.year)} `);
              if (year.is_active) {
                _push2(`<span class="badge rounded-pill bg-info text-dark ms-1"${_scopeId}>Aktif</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</a>`);
            });
            _push2(`<!--]--></div></div><div${_scopeId}><label class="form-label small fw-bold text-secondary mb-2"${_scopeId}>Urutkan dan tampilkan</label><div class="d-flex flex-wrap gap-2"${_scopeId}><button type="button" class="btn btn-sm btn-outline-secondary rounded-pill px-3"${_scopeId}><i class="bi bi-sort-alpha-down me-1"${_scopeId}></i>Nama `);
            if (__props.filter.category === "name") {
              _push2(`<i class="${ssrRenderClass(__props.filter.order === "asc" ? "bi bi-arrow-up" : "bi bi-arrow-down")}"${_scopeId}></i>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button><button type="button" class="btn btn-sm btn-outline-secondary rounded-pill px-3"${_scopeId}><i class="bi bi-calendar3 me-1"${_scopeId}></i>Tanggal `);
            if (__props.filter.category === "date") {
              _push2(`<i class="${ssrRenderClass(__props.filter.order === "asc" ? "bi bi-arrow-up" : "bi bi-arrow-down")}"${_scopeId}></i>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button><button type="button" class="${ssrRenderClass([__props.filter.active ? "btn-success" : "btn-outline-success", "btn btn-sm rounded-pill px-3"])}"${_scopeId}><i class="bi bi-toggle-on me-1"${_scopeId}></i>${ssrInterpolate(__props.filter.active ? "Hanya Stand Aktif" : "Semua Status")}</button></div></div></div></div></section>`);
            if ((_a2 = __props.stand_list) == null ? void 0 : _a2.length) {
              _push2(`<div class="row g-3 g-lg-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.stand_list, (stand) => {
                var _a3;
                _push2(`<div class="col-12 col-md-6 col-xl-4"${_scopeId}><a${ssrRenderAttr("href", route("food.stand.detail", { id: stand.id }))} class="text-decoration-none"${_scopeId}><article class="card stand-card border-0 shadow-sm h-100 rounded-4"${_scopeId}><div class="card-body p-4"${_scopeId}><div class="d-flex justify-content-between align-items-start gap-3 mb-3"${_scopeId}><div class="stand-icon"${_scopeId}><i class="bi bi-shop-window"${_scopeId}></i></div><span class="${ssrRenderClass([((stand == null ? void 0 : stand.menu_lock) || 0) > 0 && ((stand == null ? void 0 : stand.sale_validation) || 0) == 0 ? "text-bg-success" : "text-bg-secondary", "badge rounded-pill"])}"${_scopeId}>${ssrInterpolate(((stand == null ? void 0 : stand.menu_lock) || 0) > 0 && ((stand == null ? void 0 : stand.sale_validation) || 0) == 0 ? "Aktif" : "Belum aktif")}</span></div><h5 class="fw-bold text-dark mb-2"${_scopeId}>${ssrInterpolate((stand == null ? void 0 : stand.name) || "Stand tanpa nama")}</h5><div class="d-grid gap-2 small text-muted"${_scopeId}><span${_scopeId}><i class="bi bi-geo-alt me-2 text-primary"${_scopeId}></i>${ssrInterpolate((stand == null ? void 0 : stand.place) || "Lokasi belum diisi")}</span><span${_scopeId}><i class="bi bi-person-badge me-2 text-primary"${_scopeId}></i>PIC: ${ssrInterpolate(((_a3 = stand == null ? void 0 : stand.pic) == null ? void 0 : _a3.name) || "Belum ditentukan")}</span><span${_scopeId}><i class="bi bi-calendar-event me-2 text-primary"${_scopeId}></i>${ssrInterpolate((stand == null ? void 0 : stand.date) ? unref(formatDateOnly)(stand.date) : "Tanggal belum diisi")}</span><span${_scopeId}><i class="bi bi-bag-check me-2 text-primary"${_scopeId}></i>${ssrInterpolate(standTypeLabel(stand == null ? void 0 : stand.type))}</span></div></div><div class="card-footer bg-transparent border-top px-4 py-3 d-flex justify-content-between align-items-center text-primary fw-semibold small"${_scopeId}><span${_scopeId}>Buka dan kelola stand</span><i class="bi bi-arrow-right"${_scopeId}></i></div></article></a></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<section class="card border-0 shadow-sm rounded-4"${_scopeId}><div class="card-body text-center py-5 px-3"${_scopeId}><div class="empty-icon mx-auto mb-3"${_scopeId}><i class="bi bi-shop"${_scopeId}></i></div><h4 class="fw-bold"${_scopeId}>Belum ada stand pada periode ini</h4><p class="text-muted mx-auto" style="${ssrRenderStyle({ "max-width": "520px" })}"${_scopeId}> Stand adalah tempat utama untuk mengelola menu, bahan belanja, tim produksi, kasir, stok, dan transaksi. </p>`);
              if (canManageStands.value) {
                _push2(`<button type="button" class="btn btn-primary rounded-pill px-4"${_scopeId}><i class="bi bi-plus-circle me-2"${_scopeId}></i>Buat Stand Pertama </button>`);
              } else {
                _push2(`<div class="alert alert-light border d-inline-flex align-items-center gap-2 mb-0 text-start"${_scopeId}><i class="bi bi-info-circle text-primary"${_scopeId}></i><span${_scopeId}>Hanya COO atau Super Admin yang dapat membuat stand. Hubungi pengelola jika stand yang dibutuhkan belum tersedia.</span></div>`);
              }
              _push2(`</div></section>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: title.value,
                icon: "/favicon.ico"
              }, null, 8, ["title"]),
              createVNode("div", { class: "container-fluid py-3 py-md-4" }, [
                createVNode("section", { class: "card border-0 shadow-sm rounded-4 overflow-hidden mb-4 stand-hero" }, [
                  createVNode("div", { class: "card-body p-4 p-lg-5 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3" }, [
                    createVNode("div", null, [
                      createVNode("span", { class: "badge rounded-pill bg-primary-subtle text-primary border border-primary-subtle mb-2" }, [
                        createVNode("i", { class: "bi bi-shop me-1" }),
                        createTextVNode(" Operasional Penjualan ")
                      ]),
                      createVNode("h2", { class: "fw-bold mb-1" }, "Manajemen Stand"),
                      createVNode("p", { class: "text-muted mb-0" }, "Buat stand, tentukan penanggung jawab, lalu kelola menu, bahan, kasir, dan penjualannya.")
                    ]),
                    canManageStands.value ? (openBlock(), createBlock("button", {
                      key: 0,
                      type: "button",
                      class: "btn btn-primary btn-lg rounded-pill px-4 align-self-start align-self-lg-center",
                      onClick: ($event) => showNewStandModal()
                    }, [
                      createVNode("i", { class: "bi bi-plus-circle-fill me-2" }),
                      createTextVNode("Tambah Stand Baru ")
                    ], 8, ["onClick"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "alert alert-light border mb-0 py-2 px-3 small align-self-start align-self-lg-center"
                    }, [
                      createVNode("i", { class: "bi bi-lock me-1 text-primary" }),
                      createTextVNode("Pembuatan stand hanya tersedia untuk COO dan Super Admin. ")
                    ]))
                  ])
                ]),
                createVNode("section", { class: "card border-0 shadow-sm rounded-4 mb-4" }, [
                  createVNode("div", { class: "card-body p-3 p-md-4" }, [
                    createVNode("div", { class: "d-flex flex-column flex-xl-row justify-content-between gap-3" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label small fw-bold text-secondary mb-2" }, "Periode kepengurusan"),
                        createVNode("div", { class: "d-flex flex-wrap gap-2" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.governance_years, (year) => {
                            return openBlock(), createBlock("a", {
                              key: year.id,
                              href: route("food.stand", { year_id: year.id }),
                              class: ["btn btn-sm rounded-pill px-3", __props.selected_year_id === year.id ? "btn-primary" : "btn-outline-secondary"]
                            }, [
                              createTextVNode(toDisplayString(year.year) + " ", 1),
                              year.is_active ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "badge rounded-pill bg-info text-dark ms-1"
                              }, "Aktif")) : createCommentVNode("", true)
                            ], 10, ["href"]);
                          }), 128))
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label small fw-bold text-secondary mb-2" }, "Urutkan dan tampilkan"),
                        createVNode("div", { class: "d-flex flex-wrap gap-2" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => handleSubmitFilter("name"),
                            class: "btn btn-sm btn-outline-secondary rounded-pill px-3"
                          }, [
                            createVNode("i", { class: "bi bi-sort-alpha-down me-1" }),
                            createTextVNode("Nama "),
                            __props.filter.category === "name" ? (openBlock(), createBlock("i", {
                              key: 0,
                              class: __props.filter.order === "asc" ? "bi bi-arrow-up" : "bi bi-arrow-down"
                            }, null, 2)) : createCommentVNode("", true)
                          ], 8, ["onClick"]),
                          createVNode("button", {
                            type: "button",
                            onClick: ($event) => handleSubmitFilter("date"),
                            class: "btn btn-sm btn-outline-secondary rounded-pill px-3"
                          }, [
                            createVNode("i", { class: "bi bi-calendar3 me-1" }),
                            createTextVNode("Tanggal "),
                            __props.filter.category === "date" ? (openBlock(), createBlock("i", {
                              key: 0,
                              class: __props.filter.order === "asc" ? "bi bi-arrow-up" : "bi bi-arrow-down"
                            }, null, 2)) : createCommentVNode("", true)
                          ], 8, ["onClick"]),
                          createVNode("button", {
                            type: "button",
                            class: ["btn btn-sm rounded-pill px-3", __props.filter.active ? "btn-success" : "btn-outline-success"],
                            onClick: ($event) => {
                              unref(form_filter).active = !__props.filter.active;
                              handleSubmitFilter();
                            }
                          }, [
                            createVNode("i", { class: "bi bi-toggle-on me-1" }),
                            createTextVNode(toDisplayString(__props.filter.active ? "Hanya Stand Aktif" : "Semua Status"), 1)
                          ], 10, ["onClick"])
                        ])
                      ])
                    ])
                  ])
                ]),
                ((_b2 = __props.stand_list) == null ? void 0 : _b2.length) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "row g-3 g-lg-4"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.stand_list, (stand) => {
                    var _a3;
                    return openBlock(), createBlock("div", {
                      key: stand.id,
                      class: "col-12 col-md-6 col-xl-4"
                    }, [
                      createVNode("a", {
                        href: route("food.stand.detail", { id: stand.id }),
                        onClick: ($event) => debugOpenStandDetail(stand),
                        class: "text-decoration-none"
                      }, [
                        createVNode("article", { class: "card stand-card border-0 shadow-sm h-100 rounded-4" }, [
                          createVNode("div", { class: "card-body p-4" }, [
                            createVNode("div", { class: "d-flex justify-content-between align-items-start gap-3 mb-3" }, [
                              createVNode("div", { class: "stand-icon" }, [
                                createVNode("i", { class: "bi bi-shop-window" })
                              ]),
                              createVNode("span", {
                                class: ["badge rounded-pill", ((stand == null ? void 0 : stand.menu_lock) || 0) > 0 && ((stand == null ? void 0 : stand.sale_validation) || 0) == 0 ? "text-bg-success" : "text-bg-secondary"]
                              }, toDisplayString(((stand == null ? void 0 : stand.menu_lock) || 0) > 0 && ((stand == null ? void 0 : stand.sale_validation) || 0) == 0 ? "Aktif" : "Belum aktif"), 3)
                            ]),
                            createVNode("h5", { class: "fw-bold text-dark mb-2" }, toDisplayString((stand == null ? void 0 : stand.name) || "Stand tanpa nama"), 1),
                            createVNode("div", { class: "d-grid gap-2 small text-muted" }, [
                              createVNode("span", null, [
                                createVNode("i", { class: "bi bi-geo-alt me-2 text-primary" }),
                                createTextVNode(toDisplayString((stand == null ? void 0 : stand.place) || "Lokasi belum diisi"), 1)
                              ]),
                              createVNode("span", null, [
                                createVNode("i", { class: "bi bi-person-badge me-2 text-primary" }),
                                createTextVNode("PIC: " + toDisplayString(((_a3 = stand == null ? void 0 : stand.pic) == null ? void 0 : _a3.name) || "Belum ditentukan"), 1)
                              ]),
                              createVNode("span", null, [
                                createVNode("i", { class: "bi bi-calendar-event me-2 text-primary" }),
                                createTextVNode(toDisplayString((stand == null ? void 0 : stand.date) ? unref(formatDateOnly)(stand.date) : "Tanggal belum diisi"), 1)
                              ]),
                              createVNode("span", null, [
                                createVNode("i", { class: "bi bi-bag-check me-2 text-primary" }),
                                createTextVNode(toDisplayString(standTypeLabel(stand == null ? void 0 : stand.type)), 1)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "card-footer bg-transparent border-top px-4 py-3 d-flex justify-content-between align-items-center text-primary fw-semibold small" }, [
                            createVNode("span", null, "Buka dan kelola stand"),
                            createVNode("i", { class: "bi bi-arrow-right" })
                          ])
                        ])
                      ], 8, ["href", "onClick"])
                    ]);
                  }), 128))
                ])) : (openBlock(), createBlock("section", {
                  key: 1,
                  class: "card border-0 shadow-sm rounded-4"
                }, [
                  createVNode("div", { class: "card-body text-center py-5 px-3" }, [
                    createVNode("div", { class: "empty-icon mx-auto mb-3" }, [
                      createVNode("i", { class: "bi bi-shop" })
                    ]),
                    createVNode("h4", { class: "fw-bold" }, "Belum ada stand pada periode ini"),
                    createVNode("p", {
                      class: "text-muted mx-auto",
                      style: { "max-width": "520px" }
                    }, " Stand adalah tempat utama untuk mengelola menu, bahan belanja, tim produksi, kasir, stok, dan transaksi. "),
                    canManageStands.value ? (openBlock(), createBlock("button", {
                      key: 0,
                      type: "button",
                      class: "btn btn-primary rounded-pill px-4",
                      onClick: ($event) => showNewStandModal()
                    }, [
                      createVNode("i", { class: "bi bi-plus-circle me-2" }),
                      createTextVNode("Buat Stand Pertama ")
                    ], 8, ["onClick"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "alert alert-light border d-inline-flex align-items-center gap-2 mb-0 text-start"
                    }, [
                      createVNode("i", { class: "bi bi-info-circle text-primary" }),
                      createVNode("span", null, "Hanya COO atau Super Admin yang dapat membuat stand. Hubungi pengelola jika stand yang dibutuhkan belum tersedia.")
                    ]))
                  ])
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (canManageStands.value) {
        _push(`<div class="modal fade" id="newStandModal" tabindex="-1" aria-labelledby="newStandModalLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content border-0 shadow-lg mx-3 rounded-4 overflow-hidden"><div class="modal-header border-0 bg-primary text-white p-4"><div><h5 id="newStandModalLabel" class="modal-title fw-bold"><i class="bi bi-shop-window me-2"></i>Tambah Stand Baru</h5><small class="text-white text-opacity-75">Lengkapi identitas dasar. Menu dan anggota tim dapat ditambahkan setelah stand dibuat.</small></div><button type="button" class="btn-close btn-close-white ms-auto" aria-label="Tutup"></button></div><form><div class="modal-body p-4"><div class="mb-3"><label for="stand_name" class="form-label fw-semibold">Nama stand <span class="text-danger">*</span></label><input type="text" class="form-control" id="stand_name"${ssrRenderAttr("value", unref(form_new_stand).name)} placeholder="Contoh: Blaterian Fakultas Ekonomi" maxlength="255" required>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          message: unref(form_new_stand).errors.name,
          class: "mt-2"
        }, null, _parent));
        _push(`</div><div class="mb-3"><label for="stand_place" class="form-label fw-semibold">Lokasi <span class="text-danger">*</span></label><input type="text" class="form-control" id="stand_place"${ssrRenderAttr("value", unref(form_new_stand).place)} placeholder="Contoh: Lobi Gedung F" maxlength="255" required>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          message: unref(form_new_stand).errors.place,
          class: "mt-2"
        }, null, _parent));
        _push(`</div><div class="row g-3 mb-3"><div class="col-sm-6"><label for="stand_date" class="form-label fw-semibold">Tanggal mulai <span class="text-danger">*</span></label><input type="date" class="form-control" id="stand_date"${ssrRenderAttr("value", unref(form_new_stand).date)}${ssrRenderAttr("min", unref(today))} required>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          message: unref(form_new_stand).errors.date,
          class: "mt-2"
        }, null, _parent));
        _push(`</div><div class="col-sm-6"><label for="stand_type" class="form-label fw-semibold">Sistem penjualan <span class="text-danger">*</span></label><select id="stand_type" class="form-select" required><!--[-->`);
        ssrRenderList([
          { value: 0, name: "Penjualan langsung (Live)" },
          { value: 1, name: "Pre-order" },
          {
            value: 2,
            name: "Live dan Pre-order"
          }
        ], (item) => {
          _push(`<option${ssrRenderAttr("value", item.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form_new_stand).type) ? ssrLooseContain(unref(form_new_stand).type, item.value) : ssrLooseEqual(unref(form_new_stand).type, item.value)) ? " selected" : ""}>${ssrInterpolate(item.name)}</option>`);
        });
        _push(`<!--]--></select>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          message: unref(form_new_stand).errors.type,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div><label for="stand_pic" class="form-label fw-semibold">Penanggung jawab (PIC) <span class="text-danger">*</span></label>`);
        _push(ssrRenderComponent(unref(vSelect), {
          class: "bg-white text-nowrap",
          options: __props.staff_list,
          getOptionLabel: safeNameLabel,
          label: "name",
          reduce: (staff) => staff == null ? void 0 : staff.id,
          modelValue: unref(form_new_stand).pic_id,
          "onUpdate:modelValue": ($event) => unref(form_new_stand).pic_id = $event,
          placeholder: "Pilih anggota staf",
          "input-id": "stand_pic"
        }, null, _parent));
        if (!((_a = __props.staff_list) == null ? void 0 : _a.length)) {
          _push(`<div class="form-text text-warning">Belum ada staf pada periode ini. Tambahkan staf terlebih dahulu melalui Manajemen Staff.</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_sfc_main$1, {
          message: unref(form_new_stand).errors.pic_id,
          class: "mt-2"
        }, null, _parent));
        _push(`</div></div><div class="modal-footer border-0 px-4 pb-4 pt-0"><button type="button" class="btn btn-light">Batal</button><button type="submit" class="btn btn-primary px-4"${ssrIncludeBooleanAttr(unref(form_new_stand).processing || !((_b = __props.staff_list) == null ? void 0 : _b.length)) ? " disabled" : ""}>`);
        if (unref(form_new_stand).processing) {
          _push(`<span class="spinner-border spinner-border-sm me-2"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(unref(form_new_stand).processing ? "Membuat stand..." : "Buat Stand")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$2, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Business/Stand.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=Stand-BjxKJwBr.js.map
