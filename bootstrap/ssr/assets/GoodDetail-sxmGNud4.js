import { reactive, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, toDisplayString, Fragment, renderList, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head, Link, router } from "@inertiajs/vue3";
import { S as StaffLayout } from "./StaffLayout-oB6sdmCc.js";
import { _ as _sfc_main$1 } from "./Notif-Zffab37M.js";
import "./ModalConfirmation-CzGDjmDO.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-toastification";
const _sfc_main = {
  __name: "GoodDetail",
  __ssrInlineRender: true,
  props: {
    product: { type: Object, required: true },
    cart_count: { type: Number, default: 0 },
    can_manage: { type: Boolean, default: false },
    notif: { type: Object, default: null }
  },
  setup(__props) {
    const props = __props;
    const variantForm = useForm({ name: "", price: "", stock: 0, description: "" });
    const imageForm = useForm({ image: null, note: "" });
    const stockChanges = reactive({});
    const descriptions = reactive(Object.fromEntries((props.product.variant ?? []).map((variant) => [variant.id, variant.description ?? ""])));
    const money = (value) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(value || 0));
    const imageUrl = (image) => `/storage/images/product/${encodeURIComponent(image.image)}`;
    function addVariant() {
      variantForm.post(route("good.product.variant.add", { id: props.product.id }), { preserveScroll: true, onSuccess: () => variantForm.reset() });
    }
    function addImage() {
      imageForm.post(route("good.product.image.add", { id: props.product.id }), { forceFormData: true, preserveScroll: true, onSuccess: () => imageForm.reset() });
    }
    function updateStock(variant) {
      router.post(route("good.product.stock.update", { id: variant.id }), { update_stock: Number(stockChanges[variant.id] || 0) }, { preserveScroll: true, onSuccess: () => {
        stockChanges[variant.id] = "";
      } });
    }
    function updateDescription(variant) {
      router.post(route("good.product.description.update", { id: variant.id }), { update_description: descriptions[variant.id] }, { preserveScroll: true });
    }
    function deleteImage(image) {
      if (!window.confirm("Hapus foto produk ini?")) return;
      router.delete(route("good.product.image.delete", { id: image.id }), { preserveScroll: true });
    }
    function toggleStatus() {
      router.post(route("good.product.transaction.status", { id: props.product.id }), {}, { preserveScroll: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: __props.product.name
      }, null, _parent));
      _push(ssrRenderComponent(StaffLayout, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Detail Produk`);
          } else {
            return [
              createTextVNode("Detail Produk")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(`<div class="container-fluid py-3 py-lg-4"${_scopeId}>`);
            if (__props.notif) {
              _push2(ssrRenderComponent(_sfc_main$1, { notif: __props.notif }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("good.product"),
              class: "text-decoration-none"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="bi bi-arrow-left me-2"${_scopeId2}></i>Kembali ke katalog`);
                } else {
                  return [
                    createVNode("i", { class: "bi bi-arrow-left me-2" }),
                    createTextVNode("Kembali ke katalog")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="card border-0 shadow-sm mb-4"${_scopeId}><div class="card-body d-flex flex-column flex-lg-row justify-content-between gap-3"${_scopeId}><div${_scopeId}><span class="badge text-bg-light mb-2"${_scopeId}>${ssrInterpolate(__props.product.category)}</span><h2 class="fw-bold mb-1"${_scopeId}>${ssrInterpolate(__props.product.name)}</h2><p class="text-muted mb-0"${_scopeId}>PIC: ${ssrInterpolate(((_a = __props.product.pic) == null ? void 0 : _a.name) ?? "Belum ditentukan")} · ${ssrInterpolate(((_b = __props.product.variant) == null ? void 0 : _b.length) ?? 0)} varian</p></div>`);
            if (__props.can_manage) {
              _push2(`<div class="align-self-lg-center"${_scopeId}><button class="${ssrRenderClass([__props.product.operational_id ? "btn-outline-danger" : "btn-outline-success", "btn"])}"${_scopeId}><i class="${ssrRenderClass([__props.product.operational_id ? "bi-pause-circle" : "bi-play-circle", "bi me-2"])}"${_scopeId}></i>${ssrInterpolate(__props.product.operational_id ? "Tutup transaksi" : "Buka transaksi")}</button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="row g-4"${_scopeId}><div class="col-12 col-xl-4"${_scopeId}><div class="card border-0 shadow-sm mb-4"${_scopeId}><div class="card-header bg-white border-0 pt-3 d-flex justify-content-between"${_scopeId}><h5 class="mb-0"${_scopeId}>Foto produk</h5><span class="badge text-bg-light"${_scopeId}>${ssrInterpolate(((_c = __props.product.image) == null ? void 0 : _c.length) ?? 0)}</span></div><div class="card-body"${_scopeId}>`);
            if ((_d = __props.product.image) == null ? void 0 : _d.length) {
              _push2(`<div class="row g-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.product.image, (image) => {
                _push2(`<div class="col-6"${_scopeId}><div class="position-relative"${_scopeId}><img${ssrRenderAttr("src", imageUrl(image))}${ssrRenderAttr("alt", image.note || __props.product.name)} class="img-fluid rounded border ratio ratio-1x1 object-fit-cover"${_scopeId}>`);
                if (__props.can_manage) {
                  _push2(`<button class="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"${_scopeId}><i class="bi bi-trash"${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="small text-muted mt-1 text-truncate"${_scopeId}>${ssrInterpolate(image.note || "Tanpa catatan")}</div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center text-muted py-4"${_scopeId}><i class="bi bi-images fs-1"${_scopeId}></i><p class="mb-0 mt-2"${_scopeId}>Belum ada foto produk.</p></div>`);
            }
            if (__props.can_manage) {
              _push2(`<form class="border-top mt-3 pt-3"${_scopeId}><label class="form-label fw-semibold"${_scopeId}>Tambah foto persegi</label><input type="file" accept="image/*" class="form-control mb-2" required${_scopeId}><input${ssrRenderAttr("value", unref(imageForm).note)} class="form-control mb-2" maxlength="255" placeholder="Catatan foto (opsional)"${_scopeId}><!--[-->`);
              ssrRenderList(unref(imageForm).errors, (error) => {
                _push2(`<div class="text-danger small"${_scopeId}>${ssrInterpolate(error)}</div>`);
              });
              _push2(`<!--]--><button class="btn btn-outline-primary w-100 mt-2"${ssrIncludeBooleanAttr(unref(imageForm).processing) ? " disabled" : ""}${_scopeId}>Unggah foto</button></form>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="col-12 col-xl-8"${_scopeId}><div class="d-flex justify-content-between align-items-center mb-3"${_scopeId}><h4 class="mb-0"${_scopeId}>Varian produk</h4>`);
            if (__props.can_manage) {
              _push2(`<button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#newVariantModal"${_scopeId}><i class="bi bi-plus-lg me-1"${_scopeId}></i>Tambah varian</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if ((_e = __props.product.variant) == null ? void 0 : _e.length) {
              _push2(`<div class="d-grid gap-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.product.variant, (variant) => {
                _push2(`<div class="card border-0 shadow-sm"${_scopeId}><div class="card-body"${_scopeId}><div class="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3"${_scopeId}><div${_scopeId}><h5 class="mb-1"${_scopeId}>${ssrInterpolate(variant.name)}</h5><div class="text-muted"${_scopeId}>${ssrInterpolate(money(variant.price))} · Terjual ${ssrInterpolate(variant.sale ?? 0)}</div></div><span class="${ssrRenderClass([Number(variant.stock) > 0 ? "text-bg-success" : "text-bg-danger", "badge align-self-start fs-6"])}"${_scopeId}>Stok ${ssrInterpolate(variant.stock)}</span></div>`);
                if (__props.can_manage) {
                  _push2(`<!--[--><form class="input-group mb-3"${_scopeId}><span class="input-group-text"${_scopeId}>Perubahan stok</span><input${ssrRenderAttr("value", stockChanges[variant.id])} type="number" class="form-control" required placeholder="Contoh: 5 atau -2"${_scopeId}><button class="btn btn-outline-primary"${_scopeId}>Simpan</button></form><form${_scopeId}><label class="form-label small fw-semibold"${_scopeId}>Deskripsi</label><textarea class="form-control" rows="2" required maxlength="2000"${_scopeId}>${ssrInterpolate(descriptions[variant.id])}</textarea><button class="btn btn-sm btn-outline-secondary mt-2"${_scopeId}>Perbarui deskripsi</button></form><!--]-->`);
                } else {
                  _push2(`<p class="mb-0"${_scopeId}>${ssrInterpolate(variant.description || "Belum ada deskripsi.")}</p>`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="card border-0 shadow-sm"${_scopeId}><div class="card-body text-center py-5 text-muted"${_scopeId}><i class="bi bi-layers fs-1"${_scopeId}></i><h5 class="mt-3"${_scopeId}>Belum ada varian</h5><p class="mb-0"${_scopeId}>Tambahkan varian agar stok dan harga produk dapat dikelola.</p></div></div>`);
            }
            _push2(`</div></div></div><div id="newVariantModal" class="modal fade" tabindex="-1" aria-hidden="true"${_scopeId}><div class="modal-dialog"${_scopeId}><form class="modal-content"${_scopeId}><div class="modal-header"${_scopeId}><h5 class="modal-title"${_scopeId}>Tambah varian</h5><button type="button" class="btn-close" data-bs-dismiss="modal"${_scopeId}></button></div><div class="modal-body"${_scopeId}><div class="mb-3"${_scopeId}><label class="form-label"${_scopeId}>Nama varian</label><input${ssrRenderAttr("value", unref(variantForm).name)} class="form-control" required maxlength="255"${_scopeId}><div class="text-danger small"${_scopeId}>${ssrInterpolate(unref(variantForm).errors.name)}</div></div><div class="row g-2 mb-3"${_scopeId}><div class="col-6"${_scopeId}><label class="form-label"${_scopeId}>Harga</label><input${ssrRenderAttr("value", unref(variantForm).price)} type="number" min="0" class="form-control" required${_scopeId}><div class="text-danger small"${_scopeId}>${ssrInterpolate(unref(variantForm).errors.price)}</div></div><div class="col-6"${_scopeId}><label class="form-label"${_scopeId}>Stok awal</label><input${ssrRenderAttr("value", unref(variantForm).stock)} type="number" min="0" class="form-control" required${_scopeId}><div class="text-danger small"${_scopeId}>${ssrInterpolate(unref(variantForm).errors.stock)}</div></div></div><div${_scopeId}><label class="form-label"${_scopeId}>Deskripsi</label><textarea class="form-control" rows="3" required maxlength="2000"${_scopeId}>${ssrInterpolate(unref(variantForm).description)}</textarea><div class="text-danger small"${_scopeId}>${ssrInterpolate(unref(variantForm).errors.description)}</div></div></div><div class="modal-footer"${_scopeId}><button type="button" class="btn btn-light" data-bs-dismiss="modal"${_scopeId}>Batal</button><button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(variantForm).processing) ? " disabled" : ""}${_scopeId}>Simpan varian</button></div></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-fluid py-3 py-lg-4" }, [
                __props.notif ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 0,
                  notif: __props.notif
                }, null, 8, ["notif"])) : createCommentVNode("", true),
                createVNode("div", { class: "mb-3" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("good.product"),
                    class: "text-decoration-none"
                  }, {
                    default: withCtx(() => [
                      createVNode("i", { class: "bi bi-arrow-left me-2" }),
                      createTextVNode("Kembali ke katalog")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode("div", { class: "card border-0 shadow-sm mb-4" }, [
                  createVNode("div", { class: "card-body d-flex flex-column flex-lg-row justify-content-between gap-3" }, [
                    createVNode("div", null, [
                      createVNode("span", { class: "badge text-bg-light mb-2" }, toDisplayString(__props.product.category), 1),
                      createVNode("h2", { class: "fw-bold mb-1" }, toDisplayString(__props.product.name), 1),
                      createVNode("p", { class: "text-muted mb-0" }, "PIC: " + toDisplayString(((_f = __props.product.pic) == null ? void 0 : _f.name) ?? "Belum ditentukan") + " · " + toDisplayString(((_g = __props.product.variant) == null ? void 0 : _g.length) ?? 0) + " varian", 1)
                    ]),
                    __props.can_manage ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "align-self-lg-center"
                    }, [
                      createVNode("button", {
                        class: ["btn", __props.product.operational_id ? "btn-outline-danger" : "btn-outline-success"],
                        onClick: toggleStatus
                      }, [
                        createVNode("i", {
                          class: ["bi me-2", __props.product.operational_id ? "bi-pause-circle" : "bi-play-circle"]
                        }, null, 2),
                        createTextVNode(toDisplayString(__props.product.operational_id ? "Tutup transaksi" : "Buka transaksi"), 1)
                      ], 2)
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("div", { class: "row g-4" }, [
                  createVNode("div", { class: "col-12 col-xl-4" }, [
                    createVNode("div", { class: "card border-0 shadow-sm mb-4" }, [
                      createVNode("div", { class: "card-header bg-white border-0 pt-3 d-flex justify-content-between" }, [
                        createVNode("h5", { class: "mb-0" }, "Foto produk"),
                        createVNode("span", { class: "badge text-bg-light" }, toDisplayString(((_h = __props.product.image) == null ? void 0 : _h.length) ?? 0), 1)
                      ]),
                      createVNode("div", { class: "card-body" }, [
                        ((_i = __props.product.image) == null ? void 0 : _i.length) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "row g-2"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.product.image, (image) => {
                            return openBlock(), createBlock("div", {
                              key: image.id,
                              class: "col-6"
                            }, [
                              createVNode("div", { class: "position-relative" }, [
                                createVNode("img", {
                                  src: imageUrl(image),
                                  alt: image.note || __props.product.name,
                                  class: "img-fluid rounded border ratio ratio-1x1 object-fit-cover"
                                }, null, 8, ["src", "alt"]),
                                __props.can_manage ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  class: "btn btn-danger btn-sm position-absolute top-0 end-0 m-1",
                                  onClick: ($event) => deleteImage(image)
                                }, [
                                  createVNode("i", { class: "bi bi-trash" })
                                ], 8, ["onClick"])) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "small text-muted mt-1 text-truncate" }, toDisplayString(image.note || "Tanpa catatan"), 1)
                            ]);
                          }), 128))
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-center text-muted py-4"
                        }, [
                          createVNode("i", { class: "bi bi-images fs-1" }),
                          createVNode("p", { class: "mb-0 mt-2" }, "Belum ada foto produk.")
                        ])),
                        __props.can_manage ? (openBlock(), createBlock("form", {
                          key: 2,
                          class: "border-top mt-3 pt-3",
                          onSubmit: withModifiers(addImage, ["prevent"])
                        }, [
                          createVNode("label", { class: "form-label fw-semibold" }, "Tambah foto persegi"),
                          createVNode("input", {
                            type: "file",
                            accept: "image/*",
                            class: "form-control mb-2",
                            required: "",
                            onChange: ($event) => unref(imageForm).image = $event.target.files[0]
                          }, null, 40, ["onChange"]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(imageForm).note = $event,
                            class: "form-control mb-2",
                            maxlength: "255",
                            placeholder: "Catatan foto (opsional)"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(imageForm).note]
                          ]),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(imageForm).errors, (error) => {
                            return openBlock(), createBlock("div", {
                              key: error,
                              class: "text-danger small"
                            }, toDisplayString(error), 1);
                          }), 128)),
                          createVNode("button", {
                            class: "btn btn-outline-primary w-100 mt-2",
                            disabled: unref(imageForm).processing
                          }, "Unggah foto", 8, ["disabled"])
                        ], 32)) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "col-12 col-xl-8" }, [
                    createVNode("div", { class: "d-flex justify-content-between align-items-center mb-3" }, [
                      createVNode("h4", { class: "mb-0" }, "Varian produk"),
                      __props.can_manage ? (openBlock(), createBlock("button", {
                        key: 0,
                        class: "btn btn-primary btn-sm",
                        "data-bs-toggle": "modal",
                        "data-bs-target": "#newVariantModal"
                      }, [
                        createVNode("i", { class: "bi bi-plus-lg me-1" }),
                        createTextVNode("Tambah varian")
                      ])) : createCommentVNode("", true)
                    ]),
                    ((_j = __props.product.variant) == null ? void 0 : _j.length) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "d-grid gap-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.product.variant, (variant) => {
                        return openBlock(), createBlock("div", {
                          key: variant.id,
                          class: "card border-0 shadow-sm"
                        }, [
                          createVNode("div", { class: "card-body" }, [
                            createVNode("div", { class: "d-flex flex-column flex-md-row justify-content-between gap-2 mb-3" }, [
                              createVNode("div", null, [
                                createVNode("h5", { class: "mb-1" }, toDisplayString(variant.name), 1),
                                createVNode("div", { class: "text-muted" }, toDisplayString(money(variant.price)) + " · Terjual " + toDisplayString(variant.sale ?? 0), 1)
                              ]),
                              createVNode("span", {
                                class: ["badge align-self-start fs-6", Number(variant.stock) > 0 ? "text-bg-success" : "text-bg-danger"]
                              }, "Stok " + toDisplayString(variant.stock), 3)
                            ]),
                            __props.can_manage ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createVNode("form", {
                                class: "input-group mb-3",
                                onSubmit: withModifiers(($event) => updateStock(variant), ["prevent"])
                              }, [
                                createVNode("span", { class: "input-group-text" }, "Perubahan stok"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => stockChanges[variant.id] = $event,
                                  type: "number",
                                  class: "form-control",
                                  required: "",
                                  placeholder: "Contoh: 5 atau -2"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, stockChanges[variant.id]]
                                ]),
                                createVNode("button", { class: "btn btn-outline-primary" }, "Simpan")
                              ], 40, ["onSubmit"]),
                              createVNode("form", {
                                onSubmit: withModifiers(($event) => updateDescription(variant), ["prevent"])
                              }, [
                                createVNode("label", { class: "form-label small fw-semibold" }, "Deskripsi"),
                                withDirectives(createVNode("textarea", {
                                  "onUpdate:modelValue": ($event) => descriptions[variant.id] = $event,
                                  class: "form-control",
                                  rows: "2",
                                  required: "",
                                  maxlength: "2000"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, descriptions[variant.id]]
                                ]),
                                createVNode("button", { class: "btn btn-sm btn-outline-secondary mt-2" }, "Perbarui deskripsi")
                              ], 40, ["onSubmit"])
                            ], 64)) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "mb-0"
                            }, toDisplayString(variant.description || "Belum ada deskripsi."), 1))
                          ])
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "card border-0 shadow-sm"
                    }, [
                      createVNode("div", { class: "card-body text-center py-5 text-muted" }, [
                        createVNode("i", { class: "bi bi-layers fs-1" }),
                        createVNode("h5", { class: "mt-3" }, "Belum ada varian"),
                        createVNode("p", { class: "mb-0" }, "Tambahkan varian agar stok dan harga produk dapat dikelola.")
                      ])
                    ]))
                  ])
                ])
              ]),
              createVNode("div", {
                id: "newVariantModal",
                class: "modal fade",
                tabindex: "-1",
                "aria-hidden": "true"
              }, [
                createVNode("div", { class: "modal-dialog" }, [
                  createVNode("form", {
                    class: "modal-content",
                    onSubmit: withModifiers(addVariant, ["prevent"])
                  }, [
                    createVNode("div", { class: "modal-header" }, [
                      createVNode("h5", { class: "modal-title" }, "Tambah varian"),
                      createVNode("button", {
                        type: "button",
                        class: "btn-close",
                        "data-bs-dismiss": "modal"
                      })
                    ]),
                    createVNode("div", { class: "modal-body" }, [
                      createVNode("div", { class: "mb-3" }, [
                        createVNode("label", { class: "form-label" }, "Nama varian"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(variantForm).name = $event,
                          class: "form-control",
                          required: "",
                          maxlength: "255"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(variantForm).name]
                        ]),
                        createVNode("div", { class: "text-danger small" }, toDisplayString(unref(variantForm).errors.name), 1)
                      ]),
                      createVNode("div", { class: "row g-2 mb-3" }, [
                        createVNode("div", { class: "col-6" }, [
                          createVNode("label", { class: "form-label" }, "Harga"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(variantForm).price = $event,
                            type: "number",
                            min: "0",
                            class: "form-control",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(variantForm).price]
                          ]),
                          createVNode("div", { class: "text-danger small" }, toDisplayString(unref(variantForm).errors.price), 1)
                        ]),
                        createVNode("div", { class: "col-6" }, [
                          createVNode("label", { class: "form-label" }, "Stok awal"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(variantForm).stock = $event,
                            type: "number",
                            min: "0",
                            class: "form-control",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(variantForm).stock]
                          ]),
                          createVNode("div", { class: "text-danger small" }, toDisplayString(unref(variantForm).errors.stock), 1)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "form-label" }, "Deskripsi"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(variantForm).description = $event,
                          class: "form-control",
                          rows: "3",
                          required: "",
                          maxlength: "2000"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(variantForm).description]
                        ]),
                        createVNode("div", { class: "text-danger small" }, toDisplayString(unref(variantForm).errors.description), 1)
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
                        disabled: unref(variantForm).processing
                      }, "Simpan varian", 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/Business/GoodDetail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=GoodDetail-sxmGNud4.js.map
