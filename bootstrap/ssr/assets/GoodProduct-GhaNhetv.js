import { computed, ref, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, withModifiers, withDirectives, vModelText, vModelSelect, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm, Head, Link, router } from "@inertiajs/vue3";
import { S as StaffLayout } from "./StaffLayout-DYM3ADh0.js";
import { _ as _sfc_main$1 } from "./Notif-Zffab37M.js";
import "./ModalConfirmation-CzGDjmDO.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
const _sfc_main = {
  __name: "GoodProduct",
  __ssrInlineRender: true,
  props: {
    product_list: { type: Array, default: () => [] },
    user_list: { type: Array, default: () => [] },
    cart_count: { type: Number, default: 0 },
    filter: { type: Object, default: () => ({}) },
    notif: { type: Object, default: null }
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f;
    const props = __props;
    const page = usePage();
    const canManage = computed(() => {
      var _a2, _b2;
      return (((_b2 = (_a2 = page.props.auth) == null ? void 0 : _a2.user) == null ? void 0 : _b2.capabilities) ?? []).some((item) => item === "*" || item === "goods.manage");
    });
    const search = ref(((_b = (_a = props.filter) == null ? void 0 : _a.product) == null ? void 0 : _b.keyword) ?? "");
    const category = ref(((_d = (_c = props.filter) == null ? void 0 : _c.product) == null ? void 0 : _d.category) ?? "created_at");
    const order = ref(((_f = (_e = props.filter) == null ? void 0 : _e.product) == null ? void 0 : _f.order) ?? "desc");
    const productForm = useForm({ name: "", category: "", pic: "" });
    const totalVariants = computed(() => props.product_list.reduce((sum, product) => {
      var _a2;
      return sum + (((_a2 = product.variant) == null ? void 0 : _a2.length) ?? 0);
    }, 0));
    const totalStock = computed(() => props.product_list.reduce((sum, product) => sum + (product.variant ?? []).reduce((acc, variant) => acc + Number(variant.stock || 0), 0), 0));
    const imageUrl = (product) => {
      var _a2, _b2;
      return ((_b2 = (_a2 = product.image) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.image) ? `/storage/images/product/${encodeURIComponent(product.image[0].image)}` : null;
    };
    function applyFilter() {
      router.post(route("good.product.filter"), { keyword: search.value || null, category: category.value, order: order.value }, { preserveScroll: true });
    }
    function resetFilter() {
      search.value = "";
      category.value = "created_at";
      order.value = "desc";
      applyFilter();
    }
    function createProduct() {
      productForm.post(route("good.product.add"), {
        preserveScroll: true,
        onSuccess: () => productForm.reset()
      });
    }
    function deleteProduct(product) {
      if (!window.confirm(`Hapus produk "${product.name}"? Tindakan ini tidak dapat dibatalkan.`)) return;
      router.post(route("good.product.delete", { id: product.id }), {}, { preserveScroll: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Produk Merchandise" }, null, _parent));
      _push(ssrRenderComponent(StaffLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Produk Merchandise`);
          } else {
            return [
              createTextVNode("Produk Merchandise")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container-fluid py-3 py-lg-4"${_scopeId}>`);
            if (__props.notif) {
              _push2(ssrRenderComponent(_sfc_main$1, { notif: __props.notif }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4"${_scopeId}><div${_scopeId}><h2 class="fw-bold mb-1"${_scopeId}>Katalog Merchandise</h2><p class="text-muted mb-0"${_scopeId}>Kelola produk, varian, stok, dan penanggung jawab dalam satu tempat.</p></div>`);
            if (canManage.value) {
              _push2(`<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newProductModal"${_scopeId}><i class="bi bi-plus-lg me-2"${_scopeId}></i>Tambah produk</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="row g-3 mb-4"${_scopeId}><div class="col-4"${_scopeId}><div class="card border-0 shadow-sm h-100"${_scopeId}><div class="card-body"${_scopeId}><div class="text-muted small"${_scopeId}>Produk</div><div class="fs-3 fw-bold"${_scopeId}>${ssrInterpolate(__props.product_list.length)}</div></div></div></div><div class="col-4"${_scopeId}><div class="card border-0 shadow-sm h-100"${_scopeId}><div class="card-body"${_scopeId}><div class="text-muted small"${_scopeId}>Varian</div><div class="fs-3 fw-bold"${_scopeId}>${ssrInterpolate(totalVariants.value)}</div></div></div></div><div class="col-4"${_scopeId}><div class="card border-0 shadow-sm h-100"${_scopeId}><div class="card-body"${_scopeId}><div class="text-muted small"${_scopeId}>Total stok</div><div class="fs-3 fw-bold"${_scopeId}>${ssrInterpolate(totalStock.value)}</div></div></div></div></div><form class="card border-0 shadow-sm mb-4"${_scopeId}><div class="card-body row g-2 align-items-center"${_scopeId}><div class="col-12 col-lg-5"${_scopeId}><input${ssrRenderAttr("value", search.value)} type="search" class="form-control" placeholder="Cari nama atau kategori produk..."${_scopeId}></div><div class="col-6 col-lg-2"${_scopeId}><select class="form-select"${_scopeId}><option value="created_at"${ssrIncludeBooleanAttr(Array.isArray(category.value) ? ssrLooseContain(category.value, "created_at") : ssrLooseEqual(category.value, "created_at")) ? " selected" : ""}${_scopeId}>Tanggal dibuat</option><option value="name"${ssrIncludeBooleanAttr(Array.isArray(category.value) ? ssrLooseContain(category.value, "name") : ssrLooseEqual(category.value, "name")) ? " selected" : ""}${_scopeId}>Nama</option><option value="category"${ssrIncludeBooleanAttr(Array.isArray(category.value) ? ssrLooseContain(category.value, "category") : ssrLooseEqual(category.value, "category")) ? " selected" : ""}${_scopeId}>Kategori</option></select></div><div class="col-6 col-lg-2"${_scopeId}><select class="form-select"${_scopeId}><option value="desc"${ssrIncludeBooleanAttr(Array.isArray(order.value) ? ssrLooseContain(order.value, "desc") : ssrLooseEqual(order.value, "desc")) ? " selected" : ""}${_scopeId}>Menurun</option><option value="asc"${ssrIncludeBooleanAttr(Array.isArray(order.value) ? ssrLooseContain(order.value, "asc") : ssrLooseEqual(order.value, "asc")) ? " selected" : ""}${_scopeId}>Menaik</option></select></div><div class="col-7 col-lg-auto"${_scopeId}><button class="btn btn-outline-primary w-100"${_scopeId}><i class="bi bi-search me-2"${_scopeId}></i>Cari</button></div><div class="col-5 col-lg-auto"${_scopeId}><button type="button" class="btn btn-light w-100"${_scopeId}>Reset</button></div></div></form>`);
            if (__props.product_list.length) {
              _push2(`<div class="row g-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.product_list, (product) => {
                var _a2, _b2;
                _push2(`<div class="col-12 col-md-6 col-xl-4"${_scopeId}><div class="card border-0 shadow-sm h-100 overflow-hidden"${_scopeId}><div class="ratio ratio-16x9 bg-light d-flex align-items-center justify-content-center"${_scopeId}>`);
                if (imageUrl(product)) {
                  _push2(`<img${ssrRenderAttr("src", imageUrl(product))}${ssrRenderAttr("alt", product.name)} class="w-100 h-100 object-fit-cover"${_scopeId}>`);
                } else {
                  _push2(`<div class="d-flex flex-column align-items-center justify-content-center text-muted"${_scopeId}><i class="bi bi-box-seam fs-1"${_scopeId}></i><span class="small"${_scopeId}>Belum ada foto</span></div>`);
                }
                _push2(`</div><div class="card-body d-flex flex-column"${_scopeId}><div class="d-flex justify-content-between gap-2"${_scopeId}><div${_scopeId}><span class="badge text-bg-light mb-2"${_scopeId}>${ssrInterpolate(product.category)}</span><h5 class="mb-1"${_scopeId}>${ssrInterpolate(product.name)}</h5></div>`);
                if (canManage.value) {
                  _push2(`<button class="btn btn-sm btn-link text-danger align-self-start" title="Hapus produk"${_scopeId}><i class="bi bi-trash"${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="text-muted small mb-3"${_scopeId}>PIC: ${ssrInterpolate(((_a2 = product.pic) == null ? void 0 : _a2.name) ?? "Belum ditentukan")}</div><div class="d-flex gap-3 small mb-3"${_scopeId}><span${_scopeId}><i class="bi bi-layers me-1"${_scopeId}></i>${ssrInterpolate(((_b2 = product.variant) == null ? void 0 : _b2.length) ?? 0)} varian</span><span${_scopeId}><i class="bi bi-boxes me-1"${_scopeId}></i>${ssrInterpolate((product.variant ?? []).reduce((sum, item) => sum + Number(item.stock || 0), 0))} stok</span></div>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("good.product.detail", { id: product.id }),
                  class: "btn btn-outline-primary mt-auto"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Lihat &amp; kelola produk`);
                    } else {
                      return [
                        createTextVNode("Lihat & kelola produk")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="card border-0 shadow-sm"${_scopeId}><div class="card-body text-center py-5"${_scopeId}><i class="bi bi-search fs-1 text-muted"${_scopeId}></i><h5 class="mt-3"${_scopeId}>Produk tidak ditemukan</h5><p class="text-muted"${_scopeId}>Coba ubah kata kunci atau tambahkan produk baru.</p></div></div>`);
            }
            _push2(`</div><div id="newProductModal" class="modal fade" tabindex="-1" aria-hidden="true"${_scopeId}><div class="modal-dialog"${_scopeId}><form class="modal-content"${_scopeId}><div class="modal-header"${_scopeId}><h5 class="modal-title"${_scopeId}>Tambah produk</h5><button type="button" class="btn-close" data-bs-dismiss="modal"${_scopeId}></button></div><div class="modal-body"${_scopeId}><div class="mb-3"${_scopeId}><label class="form-label"${_scopeId}>Nama produk</label><input${ssrRenderAttr("value", unref(productForm).name)} class="form-control" required maxlength="255"${_scopeId}><div class="text-danger small"${_scopeId}>${ssrInterpolate(unref(productForm).errors.name)}</div></div><div class="mb-3"${_scopeId}><label class="form-label"${_scopeId}>Kategori</label><input${ssrRenderAttr("value", unref(productForm).category)} class="form-control" required maxlength="100" placeholder="Contoh: Pakaian"${_scopeId}><div class="text-danger small"${_scopeId}>${ssrInterpolate(unref(productForm).errors.category)}</div></div><div${_scopeId}><label class="form-label"${_scopeId}>Penanggung jawab</label><select class="form-select" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(productForm).pic) ? ssrLooseContain(unref(productForm).pic, "") : ssrLooseEqual(unref(productForm).pic, "")) ? " selected" : ""}${_scopeId}>Pilih PIC</option><!--[-->`);
            ssrRenderList(__props.user_list, (user) => {
              _push2(`<option${ssrRenderAttr("value", user.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(productForm).pic) ? ssrLooseContain(unref(productForm).pic, user.id) : ssrLooseEqual(unref(productForm).pic, user.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(user.name)}</option>`);
            });
            _push2(`<!--]--></select><div class="text-danger small"${_scopeId}>${ssrInterpolate(unref(productForm).errors.pic)}</div></div></div><div class="modal-footer"${_scopeId}><button type="button" class="btn btn-light" data-bs-dismiss="modal"${_scopeId}>Batal</button><button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(productForm).processing) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(productForm).processing ? "Menyimpan..." : "Simpan produk")}</button></div></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-fluid py-3 py-lg-4" }, [
                __props.notif ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 0,
                  notif: __props.notif
                }, null, 8, ["notif"])) : createCommentVNode("", true),
                createVNode("div", { class: "d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4" }, [
                  createVNode("div", null, [
                    createVNode("h2", { class: "fw-bold mb-1" }, "Katalog Merchandise"),
                    createVNode("p", { class: "text-muted mb-0" }, "Kelola produk, varian, stok, dan penanggung jawab dalam satu tempat.")
                  ]),
                  canManage.value ? (openBlock(), createBlock("button", {
                    key: 0,
                    class: "btn btn-primary",
                    "data-bs-toggle": "modal",
                    "data-bs-target": "#newProductModal"
                  }, [
                    createVNode("i", { class: "bi bi-plus-lg me-2" }),
                    createTextVNode("Tambah produk")
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "row g-3 mb-4" }, [
                  createVNode("div", { class: "col-4" }, [
                    createVNode("div", { class: "card border-0 shadow-sm h-100" }, [
                      createVNode("div", { class: "card-body" }, [
                        createVNode("div", { class: "text-muted small" }, "Produk"),
                        createVNode("div", { class: "fs-3 fw-bold" }, toDisplayString(__props.product_list.length), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "col-4" }, [
                    createVNode("div", { class: "card border-0 shadow-sm h-100" }, [
                      createVNode("div", { class: "card-body" }, [
                        createVNode("div", { class: "text-muted small" }, "Varian"),
                        createVNode("div", { class: "fs-3 fw-bold" }, toDisplayString(totalVariants.value), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "col-4" }, [
                    createVNode("div", { class: "card border-0 shadow-sm h-100" }, [
                      createVNode("div", { class: "card-body" }, [
                        createVNode("div", { class: "text-muted small" }, "Total stok"),
                        createVNode("div", { class: "fs-3 fw-bold" }, toDisplayString(totalStock.value), 1)
                      ])
                    ])
                  ])
                ]),
                createVNode("form", {
                  class: "card border-0 shadow-sm mb-4",
                  onSubmit: withModifiers(applyFilter, ["prevent"])
                }, [
                  createVNode("div", { class: "card-body row g-2 align-items-center" }, [
                    createVNode("div", { class: "col-12 col-lg-5" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => search.value = $event,
                        type: "search",
                        class: "form-control",
                        placeholder: "Cari nama atau kategori produk..."
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, search.value]
                      ])
                    ]),
                    createVNode("div", { class: "col-6 col-lg-2" }, [
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => category.value = $event,
                        class: "form-select"
                      }, [
                        createVNode("option", { value: "created_at" }, "Tanggal dibuat"),
                        createVNode("option", { value: "name" }, "Nama"),
                        createVNode("option", { value: "category" }, "Kategori")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, category.value]
                      ])
                    ]),
                    createVNode("div", { class: "col-6 col-lg-2" }, [
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => order.value = $event,
                        class: "form-select"
                      }, [
                        createVNode("option", { value: "desc" }, "Menurun"),
                        createVNode("option", { value: "asc" }, "Menaik")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, order.value]
                      ])
                    ]),
                    createVNode("div", { class: "col-7 col-lg-auto" }, [
                      createVNode("button", { class: "btn btn-outline-primary w-100" }, [
                        createVNode("i", { class: "bi bi-search me-2" }),
                        createTextVNode("Cari")
                      ])
                    ]),
                    createVNode("div", { class: "col-5 col-lg-auto" }, [
                      createVNode("button", {
                        type: "button",
                        class: "btn btn-light w-100",
                        onClick: resetFilter
                      }, "Reset")
                    ])
                  ])
                ], 32),
                __props.product_list.length ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "row g-3"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.product_list, (product) => {
                    var _a2, _b2;
                    return openBlock(), createBlock("div", {
                      key: product.id,
                      class: "col-12 col-md-6 col-xl-4"
                    }, [
                      createVNode("div", { class: "card border-0 shadow-sm h-100 overflow-hidden" }, [
                        createVNode("div", { class: "ratio ratio-16x9 bg-light d-flex align-items-center justify-content-center" }, [
                          imageUrl(product) ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: imageUrl(product),
                            alt: product.name,
                            class: "w-100 h-100 object-fit-cover"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "d-flex flex-column align-items-center justify-content-center text-muted"
                          }, [
                            createVNode("i", { class: "bi bi-box-seam fs-1" }),
                            createVNode("span", { class: "small" }, "Belum ada foto")
                          ]))
                        ]),
                        createVNode("div", { class: "card-body d-flex flex-column" }, [
                          createVNode("div", { class: "d-flex justify-content-between gap-2" }, [
                            createVNode("div", null, [
                              createVNode("span", { class: "badge text-bg-light mb-2" }, toDisplayString(product.category), 1),
                              createVNode("h5", { class: "mb-1" }, toDisplayString(product.name), 1)
                            ]),
                            canManage.value ? (openBlock(), createBlock("button", {
                              key: 0,
                              class: "btn btn-sm btn-link text-danger align-self-start",
                              title: "Hapus produk",
                              onClick: ($event) => deleteProduct(product)
                            }, [
                              createVNode("i", { class: "bi bi-trash" })
                            ], 8, ["onClick"])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "text-muted small mb-3" }, "PIC: " + toDisplayString(((_a2 = product.pic) == null ? void 0 : _a2.name) ?? "Belum ditentukan"), 1),
                          createVNode("div", { class: "d-flex gap-3 small mb-3" }, [
                            createVNode("span", null, [
                              createVNode("i", { class: "bi bi-layers me-1" }),
                              createTextVNode(toDisplayString(((_b2 = product.variant) == null ? void 0 : _b2.length) ?? 0) + " varian", 1)
                            ]),
                            createVNode("span", null, [
                              createVNode("i", { class: "bi bi-boxes me-1" }),
                              createTextVNode(toDisplayString((product.variant ?? []).reduce((sum, item) => sum + Number(item.stock || 0), 0)) + " stok", 1)
                            ])
                          ]),
                          createVNode(unref(Link), {
                            href: _ctx.route("good.product.detail", { id: product.id }),
                            class: "btn btn-outline-primary mt-auto"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Lihat & kelola produk")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ]);
                  }), 128))
                ])) : (openBlock(), createBlock("div", {
                  key: 2,
                  class: "card border-0 shadow-sm"
                }, [
                  createVNode("div", { class: "card-body text-center py-5" }, [
                    createVNode("i", { class: "bi bi-search fs-1 text-muted" }),
                    createVNode("h5", { class: "mt-3" }, "Produk tidak ditemukan"),
                    createVNode("p", { class: "text-muted" }, "Coba ubah kata kunci atau tambahkan produk baru.")
                  ])
                ]))
              ]),
              createVNode("div", {
                id: "newProductModal",
                class: "modal fade",
                tabindex: "-1",
                "aria-hidden": "true"
              }, [
                createVNode("div", { class: "modal-dialog" }, [
                  createVNode("form", {
                    class: "modal-content",
                    onSubmit: withModifiers(createProduct, ["prevent"])
                  }, [
                    createVNode("div", { class: "modal-header" }, [
                      createVNode("h5", { class: "modal-title" }, "Tambah produk"),
                      createVNode("button", {
                        type: "button",
                        class: "btn-close",
                        "data-bs-dismiss": "modal"
                      })
                    ]),
                    createVNode("div", { class: "modal-body" }, [
                      createVNode("div", { class: "mb-3" }, [
                        createVNode("label", { class: "form-label" }, "Nama produk"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(productForm).name = $event,
                          class: "form-control",
                          required: "",
                          maxlength: "255"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(productForm).name]
                        ]),
                        createVNode("div", { class: "text-danger small" }, toDisplayString(unref(productForm).errors.name), 1)
                      ]),
                      createVNode("div", { class: "mb-3" }, [
                        createVNode("label", { class: "form-label" }, "Kategori"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(productForm).category = $event,
                          class: "form-control",
                          required: "",
                          maxlength: "100",
                          placeholder: "Contoh: Pakaian"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(productForm).category]
                        ]),
                        createVNode("div", { class: "text-danger small" }, toDisplayString(unref(productForm).errors.category), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Penanggung jawab"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(productForm).pic = $event,
                          class: "form-select",
                          required: ""
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: ""
                          }, "Pilih PIC"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.user_list, (user) => {
                            return openBlock(), createBlock("option", {
                              key: user.id,
                              value: user.id
                            }, toDisplayString(user.name), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(productForm).pic]
                        ]),
                        createVNode("div", { class: "text-danger small" }, toDisplayString(unref(productForm).errors.pic), 1)
                      ])
                    ]),
                    createVNode("div", { class: "modal-footer" }, [
                      createVNode("button", {
                        type: "button",
                        class: "btn btn-light",
                        "data-bs-dismiss": "modal"
                      }, "Batal"),
                      createVNode("button", {
                        class: "btn btn-primary",
                        disabled: unref(productForm).processing
                      }, toDisplayString(unref(productForm).processing ? "Menyimpan..." : "Simpan produk"), 9, ["disabled"])
                    ])
                  ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Business/GoodProduct.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=GoodProduct-GhaNhetv.js.map
