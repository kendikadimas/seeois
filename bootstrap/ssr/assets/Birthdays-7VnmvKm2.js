import { ref, onMounted, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, Fragment, renderList, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-CmduQjnL.js";
import { _ as _sfc_main$1 } from "./Notif-DL0SggHu.js";
import { useForm } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ModalConfirmation-CaKJYApU.js";
import "vue-toastification";
const _sfc_main = {
  __name: "Birthdays",
  __ssrInlineRender: true,
  props: {
    users: { type: Array, default: () => [] },
    notif: Object,
    errors: Object
  },
  setup(__props) {
    const modalRef = ref(null);
    const editingUser = ref(null);
    let bootstrapModal = null;
    const form = useForm({
      birth_date: ""
    });
    onMounted(() => {
      if (typeof window.bootstrap !== "undefined") {
        bootstrapModal = new window.bootstrap.Modal(modalRef.value);
      }
    });
    function openEditModal(user) {
      editingUser.value = user;
      form.birth_date = user.birth_date || "";
      if (bootstrapModal) bootstrapModal.show();
    }
    function submit() {
      form.post(`/seeo/staff/hr/birthdays/${editingUser.value.id}`, {
        onSuccess: () => {
          if (bootstrapModal) bootstrapModal.hide();
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(StaffLayout, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`HR Birthday Panel`);
          } else {
            return [
              createTextVNode("HR Birthday Panel")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="container-fluid p-4" data-v-132a3b12${_scopeId}>`);
            if (__props.notif) {
              _push2(ssrRenderComponent(_sfc_main$1, { notif: __props.notif }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="card shadow-sm border-0" data-v-132a3b12${_scopeId}><div class="card-header bg-white py-3 fw-bold d-flex justify-content-between align-items-center" data-v-132a3b12${_scopeId}><span class="text-primary" data-v-132a3b12${_scopeId}><i class="bi bi-cake2 me-2" data-v-132a3b12${_scopeId}></i>Staff Birthdays</span><span class="badge bg-primary rounded-pill" data-v-132a3b12${_scopeId}>${ssrInterpolate(__props.users.length)} Staff</span></div><div class="table-responsive" data-v-132a3b12${_scopeId}><table class="table mb-0 align-middle table-hover" data-v-132a3b12${_scopeId}><thead class="table-light" data-v-132a3b12${_scopeId}><tr data-v-132a3b12${_scopeId}><th data-v-132a3b12${_scopeId}>Name</th><th data-v-132a3b12${_scopeId}>Role</th><th data-v-132a3b12${_scopeId}>Birth Date</th><th data-v-132a3b12${_scopeId}>Next Birthday</th><th data-v-132a3b12${_scopeId}>Days Left</th><th class="text-center" data-v-132a3b12${_scopeId}>Aksi</th></tr></thead><tbody data-v-132a3b12${_scopeId}><!--[-->`);
            ssrRenderList(__props.users, (user) => {
              _push2(`<tr class="${ssrRenderClass({ "table-info-subtle": user.birthday_in_days >= 0 && user.birthday_in_days <= 7 })}" data-v-132a3b12${_scopeId}><td data-v-132a3b12${_scopeId}><div class="fw-medium" data-v-132a3b12${_scopeId}>${ssrInterpolate(user.name)}</div></td><td data-v-132a3b12${_scopeId}>${ssrInterpolate(user.role_name || "-")}</td><td data-v-132a3b12${_scopeId}>`);
              if (user.birth_date) {
                _push2(`<span class="text-dark" data-v-132a3b12${_scopeId}>${ssrInterpolate(new Date(user.birth_date).toLocaleDateString("id-ID", { day: "numeric", month: "long" }))}</span>`);
              } else {
                _push2(`<span class="text-muted small italic" data-v-132a3b12${_scopeId}>Belum diset</span>`);
              }
              _push2(`</td><td data-v-132a3b12${_scopeId}>${ssrInterpolate(user.next_birthday)}</td><td data-v-132a3b12${_scopeId}>`);
              if (user.birthday_in_days === 0) {
                _push2(`<span class="badge bg-danger pulse" data-v-132a3b12${_scopeId}>Today! 🎂</span>`);
              } else if (user.birthday_in_days > 0 && user.birthday_in_days <= 7) {
                _push2(`<span class="badge bg-warning text-dark" data-v-132a3b12${_scopeId}>In ${ssrInterpolate(user.birthday_in_days)} days</span>`);
              } else if (user.birthday_in_days > 7) {
                _push2(`<span data-v-132a3b12${_scopeId}>${ssrInterpolate(user.birthday_in_days)} days</span>`);
              } else {
                _push2(`<span class="text-muted" data-v-132a3b12${_scopeId}>-</span>`);
              }
              _push2(`</td><td class="text-center" data-v-132a3b12${_scopeId}><button class="btn btn-sm btn-light" title="Edit Tanggal Lahir" data-v-132a3b12${_scopeId}><i class="bi bi-pencil-square text-primary" data-v-132a3b12${_scopeId}></i></button></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.users.length === 0) {
              _push2(`<tr data-v-132a3b12${_scopeId}><td colspan="6" class="text-center text-muted py-5" data-v-132a3b12${_scopeId}><i class="bi bi-person-exclamation fs-2 d-block mb-2" data-v-132a3b12${_scopeId}></i> No staff data found. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div><div class="modal fade" id="editBirthdayModal" tabindex="-1" data-v-132a3b12${_scopeId}><div class="modal-dialog modal-dialog-centered" data-v-132a3b12${_scopeId}><div class="modal-content border-0 shadow" data-v-132a3b12${_scopeId}><div class="modal-header" data-v-132a3b12${_scopeId}><h5 class="modal-title fw-bold" data-v-132a3b12${_scopeId}>Set Tanggal Lahir</h5><button type="button" class="btn-close" data-bs-dismiss="modal" data-v-132a3b12${_scopeId}></button></div><form data-v-132a3b12${_scopeId}><div class="modal-body" data-v-132a3b12${_scopeId}><div class="mb-3 text-center" data-v-132a3b12${_scopeId}><div class="small text-muted mb-1" data-v-132a3b12${_scopeId}>Karyawan</div><div class="fw-bold fs-5" data-v-132a3b12${_scopeId}>${ssrInterpolate((_a = editingUser.value) == null ? void 0 : _a.name)}</div></div><div class="mb-3" data-v-132a3b12${_scopeId}><label class="form-label small fw-medium" data-v-132a3b12${_scopeId}>Tanggal Lahir</label><input type="date"${ssrRenderAttr("value", unref(form).birth_date)} class="form-control" required data-v-132a3b12${_scopeId}>`);
            if (__props.errors.birth_date) {
              _push2(`<div class="text-danger small mt-1" data-v-132a3b12${_scopeId}>${ssrInterpolate(__props.errors.birth_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="modal-footer bg-light" data-v-132a3b12${_scopeId}><button type="button" class="btn btn-light" data-bs-dismiss="modal" data-v-132a3b12${_scopeId}>Batal</button><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-132a3b12${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<span class="spinner-border spinner-border-sm me-1" data-v-132a3b12${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` Simpan Perubahan </button></div></form></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container-fluid p-4" }, [
                __props.notif ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 0,
                  notif: __props.notif
                }, null, 8, ["notif"])) : createCommentVNode("", true),
                createVNode("div", { class: "card shadow-sm border-0" }, [
                  createVNode("div", { class: "card-header bg-white py-3 fw-bold d-flex justify-content-between align-items-center" }, [
                    createVNode("span", { class: "text-primary" }, [
                      createVNode("i", { class: "bi bi-cake2 me-2" }),
                      createTextVNode("Staff Birthdays")
                    ]),
                    createVNode("span", { class: "badge bg-primary rounded-pill" }, toDisplayString(__props.users.length) + " Staff", 1)
                  ]),
                  createVNode("div", { class: "table-responsive" }, [
                    createVNode("table", { class: "table mb-0 align-middle table-hover" }, [
                      createVNode("thead", { class: "table-light" }, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Name"),
                          createVNode("th", null, "Role"),
                          createVNode("th", null, "Birth Date"),
                          createVNode("th", null, "Next Birthday"),
                          createVNode("th", null, "Days Left"),
                          createVNode("th", { class: "text-center" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.users, (user) => {
                          return openBlock(), createBlock("tr", {
                            key: user.id,
                            class: { "table-info-subtle": user.birthday_in_days >= 0 && user.birthday_in_days <= 7 }
                          }, [
                            createVNode("td", null, [
                              createVNode("div", { class: "fw-medium" }, toDisplayString(user.name), 1)
                            ]),
                            createVNode("td", null, toDisplayString(user.role_name || "-"), 1),
                            createVNode("td", null, [
                              user.birth_date ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-dark"
                              }, toDisplayString(new Date(user.birth_date).toLocaleDateString("id-ID", { day: "numeric", month: "long" })), 1)) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-muted small italic"
                              }, "Belum diset"))
                            ]),
                            createVNode("td", null, toDisplayString(user.next_birthday), 1),
                            createVNode("td", null, [
                              user.birthday_in_days === 0 ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "badge bg-danger pulse"
                              }, "Today! 🎂")) : user.birthday_in_days > 0 && user.birthday_in_days <= 7 ? (openBlock(), createBlock("span", {
                                key: 1,
                                class: "badge bg-warning text-dark"
                              }, "In " + toDisplayString(user.birthday_in_days) + " days", 1)) : user.birthday_in_days > 7 ? (openBlock(), createBlock("span", { key: 2 }, toDisplayString(user.birthday_in_days) + " days", 1)) : (openBlock(), createBlock("span", {
                                key: 3,
                                class: "text-muted"
                              }, "-"))
                            ]),
                            createVNode("td", { class: "text-center" }, [
                              createVNode("button", {
                                onClick: ($event) => openEditModal(user),
                                class: "btn btn-sm btn-light",
                                title: "Edit Tanggal Lahir"
                              }, [
                                createVNode("i", { class: "bi bi-pencil-square text-primary" })
                              ], 8, ["onClick"])
                            ])
                          ], 2);
                        }), 128)),
                        __props.users.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "6",
                            class: "text-center text-muted py-5"
                          }, [
                            createVNode("i", { class: "bi bi-person-exclamation fs-2 d-block mb-2" }),
                            createTextVNode(" No staff data found. ")
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal fade",
                id: "editBirthdayModal",
                tabindex: "-1",
                ref_key: "modalRef",
                ref: modalRef
              }, [
                createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                  createVNode("div", { class: "modal-content border-0 shadow" }, [
                    createVNode("div", { class: "modal-header" }, [
                      createVNode("h5", { class: "modal-title fw-bold" }, "Set Tanggal Lahir"),
                      createVNode("button", {
                        type: "button",
                        class: "btn-close",
                        "data-bs-dismiss": "modal"
                      })
                    ]),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("div", { class: "modal-body" }, [
                        createVNode("div", { class: "mb-3 text-center" }, [
                          createVNode("div", { class: "small text-muted mb-1" }, "Karyawan"),
                          createVNode("div", { class: "fw-bold fs-5" }, toDisplayString((_b = editingUser.value) == null ? void 0 : _b.name), 1)
                        ]),
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("label", { class: "form-label small fw-medium" }, "Tanggal Lahir"),
                          withDirectives(createVNode("input", {
                            type: "date",
                            "onUpdate:modelValue": ($event) => unref(form).birth_date = $event,
                            class: "form-control",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).birth_date]
                          ]),
                          __props.errors.birth_date ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-danger small mt-1"
                          }, toDisplayString(__props.errors.birth_date), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "modal-footer bg-light" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-light",
                          "data-bs-dismiss": "modal"
                        }, "Batal"),
                        createVNode("button", {
                          type: "submit",
                          class: "btn btn-primary",
                          disabled: unref(form).processing
                        }, [
                          unref(form).processing ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "spinner-border spinner-border-sm me-1"
                          })) : createCommentVNode("", true),
                          createTextVNode(" Simpan Perubahan ")
                        ], 8, ["disabled"])
                      ])
                    ], 32)
                  ])
                ])
              ], 512)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/Birthdays.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Birthdays = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-132a3b12"]]);
export {
  Birthdays as default
};
//# sourceMappingURL=Birthdays-7VnmvKm2.js.map
