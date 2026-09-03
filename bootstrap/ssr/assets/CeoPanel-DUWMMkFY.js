import { ref, computed, resolveComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, withDirectives, vModelText, Fragment, renderList, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { S as StaffLayout } from "./StaffLayout-Cpng7oLR.js";
import { _ as _sfc_main$1 } from "./Notif-DL0SggHu.js";
import { router } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ModalConfirmation-CaKJYApU.js";
import "vue-toastification";
const _sfc_main = {
  __name: "CeoPanel",
  __ssrInlineRender: true,
  props: {
    governanceYears: Array,
    activeYear: Object,
    staff: Array,
    nonStaff: Array,
    roles: Array,
    notif: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const newYear = ref((/* @__PURE__ */ new Date()).getFullYear() + 1);
    const newLabel = ref("");
    function storeYear() {
      router.post("/seeo/staff/ceo/year", { year: newYear.value, label: newLabel.value }, {
        preserveScroll: true,
        onSuccess: () => {
          newYear.value = (/* @__PURE__ */ new Date()).getFullYear() + 1;
          newLabel.value = "";
        }
      });
    }
    function toggleYear(id) {
      router.post(`/seeo/staff/ceo/year/${id}/toggle`, {}, { preserveScroll: true });
    }
    const staffSearch = ref("");
    const nonStaffSearch = ref("");
    const filteredStaff = computed(
      () => props.staff.filter(
        (u) => u.name.toLowerCase().includes(staffSearch.value.toLowerCase()) || (u.email || "").toLowerCase().includes(staffSearch.value.toLowerCase())
      )
    );
    const filteredNonStaff = computed(
      () => props.nonStaff.filter(
        (u) => u.name.toLowerCase().includes(nonStaffSearch.value.toLowerCase()) || (u.email || "").toLowerCase().includes(nonStaffSearch.value.toLowerCase())
      )
    );
    const roleMap = ref({});
    function getRoleValue(user) {
      return roleMap.value[user.id] ?? user.roles_id;
    }
    function setRoleValue(user, val) {
      roleMap.value[user.id] = parseInt(val);
    }
    function assignRole(user) {
      const rid = roleMap.value[user.id] ?? user.roles_id;
      router.post(`/seeo/staff/ceo/user/${user.id}/role`, { roles_id: rid }, { preserveScroll: true });
    }
    function promoteUser(userId) {
      router.post(`/seeo/staff/ceo/user/${userId}/promote`, {}, { preserveScroll: true });
    }
    function demoteUser(userId, name) {
      if (!confirm(`Keluarkan ${name} dari staff?`)) return;
      router.post(`/seeo/staff/ceo/user/${userId}/demote`, {}, { preserveScroll: true });
    }
    const tab = ref("years");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      _push(ssrRenderComponent(StaffLayout, mergeProps({ page_title: "CEO Panel" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, { title: "CEO Panel" }, null, _parent2, _scopeId));
            if (__props.notif) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                type: __props.notif.type,
                message: __props.notif.message
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="ceo-panel" data-v-ce55a28f${_scopeId}><div class="panel-header" data-v-ce55a28f${_scopeId}><div data-v-ce55a28f${_scopeId}><h1 class="panel-title" data-v-ce55a28f${_scopeId}><i class="bi bi-award-fill me-2" data-v-ce55a28f${_scopeId}></i>CEO Panel</h1><p class="panel-sub" data-v-ce55a28f${_scopeId}>Kelola kepengurusan tahunan &amp; manajemen staff</p></div>`);
            if (__props.activeYear) {
              _push2(`<div class="active-year-badge" data-v-ce55a28f${_scopeId}><i class="bi bi-calendar-check-fill" data-v-ce55a28f${_scopeId}></i> Aktif: ${ssrInterpolate(__props.activeYear.label || __props.activeYear.year)}</div>`);
            } else {
              _push2(`<div class="active-year-badge inactive" data-v-ce55a28f${_scopeId}><i class="bi bi-exclamation-triangle-fill" data-v-ce55a28f${_scopeId}></i> Belum ada tahun aktif </div>`);
            }
            _push2(`</div><div class="tab-bar" data-v-ce55a28f${_scopeId}><button class="${ssrRenderClass(["tab-btn", { active: tab.value === "years" }])}" data-v-ce55a28f${_scopeId}><i class="bi bi-calendar3" data-v-ce55a28f${_scopeId}></i> Tahun Kepengurusan </button><button class="${ssrRenderClass(["tab-btn", { active: tab.value === "staff" }])}" data-v-ce55a28f${_scopeId}><i class="bi bi-people-fill" data-v-ce55a28f${_scopeId}></i> Manajemen Staff <span class="badge" data-v-ce55a28f${_scopeId}>${ssrInterpolate(__props.staff.length)}</span></button><button class="${ssrRenderClass(["tab-btn", { active: tab.value === "recruit" }])}" data-v-ce55a28f${_scopeId}><i class="bi bi-person-plus-fill" data-v-ce55a28f${_scopeId}></i> Rekrut Staff <span class="badge" data-v-ce55a28f${_scopeId}>${ssrInterpolate(__props.nonStaff.length)}</span></button></div><div style="${ssrRenderStyle(tab.value === "years" ? null : { display: "none" })}" class="tab-content" data-v-ce55a28f${_scopeId}><div class="card-block" data-v-ce55a28f${_scopeId}><h3 class="block-title" data-v-ce55a28f${_scopeId}><i class="bi bi-plus-circle-fill" data-v-ce55a28f${_scopeId}></i> Tambah Tahun Kepengurusan</h3><div class="form-row" data-v-ce55a28f${_scopeId}><div class="form-group" data-v-ce55a28f${_scopeId}><label data-v-ce55a28f${_scopeId}>Tahun</label><input type="number"${ssrRenderAttr("value", newYear.value)} min="2000" max="2099" class="form-ctrl" data-v-ce55a28f${_scopeId}></div><div class="form-group flex-2" data-v-ce55a28f${_scopeId}><label data-v-ce55a28f${_scopeId}>Label (opsional)</label><input type="text"${ssrRenderAttr("value", newLabel.value)} placeholder="cth: Kepengurusan 2026/2027" class="form-ctrl" data-v-ce55a28f${_scopeId}></div><div class="form-group align-end" data-v-ce55a28f${_scopeId}><button class="btn-primary" data-v-ce55a28f${_scopeId}><i class="bi bi-plus" data-v-ce55a28f${_scopeId}></i> Tambah </button></div></div>`);
            if ((_a = __props.errors) == null ? void 0 : _a.year) {
              _push2(`<p class="err-msg" data-v-ce55a28f${_scopeId}>${ssrInterpolate(__props.errors.year[0])}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="card-block" data-v-ce55a28f${_scopeId}><h3 class="block-title" data-v-ce55a28f${_scopeId}><i class="bi bi-list-ul" data-v-ce55a28f${_scopeId}></i> Daftar Tahun Kepengurusan</h3>`);
            if (__props.governanceYears.length === 0) {
              _push2(`<div class="empty-state" data-v-ce55a28f${_scopeId}> Belum ada tahun kepengurusan. Tambahkan di atas. </div>`);
            } else {
              _push2(`<div class="year-list" data-v-ce55a28f${_scopeId}><!--[-->`);
              ssrRenderList(__props.governanceYears, (gy) => {
                var _a2;
                _push2(`<div class="${ssrRenderClass(["year-card", { "year-active": gy.is_active }])}" data-v-ce55a28f${_scopeId}><div class="year-info" data-v-ce55a28f${_scopeId}><span class="year-number" data-v-ce55a28f${_scopeId}>${ssrInterpolate(gy.year)}</span><span class="year-label" data-v-ce55a28f${_scopeId}>${ssrInterpolate(gy.label || "—")}</span>`);
                if (gy.is_active) {
                  _push2(`<span class="badge-active" data-v-ce55a28f${_scopeId}>AKTIF</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
                if (gy.activated_by && gy.is_active) {
                  _push2(`<div class="year-meta" data-v-ce55a28f${_scopeId}> Diaktifkan oleh ${ssrInterpolate(((_a2 = gy.activated_by) == null ? void 0 : _a2.name) || "—")} ${ssrInterpolate(gy.activated_at ? "pada " + new Date(gy.activated_at).toLocaleDateString("id-ID") : "")}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="year-actions" data-v-ce55a28f${_scopeId}><button class="${ssrRenderClass(["toggle-switch", { "toggle-on": gy.is_active }])}"${ssrRenderAttr("title", gy.is_active ? "Klik untuk nonaktifkan" : "Klik untuk aktifkan")} data-v-ce55a28f${_scopeId}><span class="toggle-knob" data-v-ce55a28f${_scopeId}></span></button><span class="${ssrRenderClass([{ "toggle-label-on": gy.is_active }, "toggle-label"])}" data-v-ce55a28f${_scopeId}>${ssrInterpolate(gy.is_active ? "Aktif" : "Nonaktif")}</span></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div><div style="${ssrRenderStyle(tab.value === "staff" ? null : { display: "none" })}" class="tab-content" data-v-ce55a28f${_scopeId}><div class="card-block" data-v-ce55a28f${_scopeId}><div class="block-header" data-v-ce55a28f${_scopeId}><h3 class="block-title" data-v-ce55a28f${_scopeId}><i class="bi bi-people-fill" data-v-ce55a28f${_scopeId}></i> Daftar Staff</h3><input type="text"${ssrRenderAttr("value", staffSearch.value)} placeholder="Cari nama / email..." class="form-ctrl search-ctrl" data-v-ce55a28f${_scopeId}></div>`);
            if (filteredStaff.value.length === 0) {
              _push2(`<div class="empty-state" data-v-ce55a28f${_scopeId}> Tidak ada staff ditemukan. </div>`);
            } else {
              _push2(`<div class="staff-table-wrap" data-v-ce55a28f${_scopeId}><table class="staff-table" data-v-ce55a28f${_scopeId}><thead data-v-ce55a28f${_scopeId}><tr data-v-ce55a28f${_scopeId}><th data-v-ce55a28f${_scopeId}>Nama</th><th data-v-ce55a28f${_scopeId}>Email</th><th data-v-ce55a28f${_scopeId}>Role Saat Ini</th><th data-v-ce55a28f${_scopeId}>Ubah Role</th><th data-v-ce55a28f${_scopeId}>Aksi</th></tr></thead><tbody data-v-ce55a28f${_scopeId}><!--[-->`);
              ssrRenderList(filteredStaff.value, (user) => {
                var _a2;
                _push2(`<tr data-v-ce55a28f${_scopeId}><td data-v-ce55a28f${_scopeId}><div class="user-name" data-v-ce55a28f${_scopeId}>${ssrInterpolate(user.name)}</div></td><td class="text-muted" data-v-ce55a28f${_scopeId}>${ssrInterpolate(user.email)}</td><td data-v-ce55a28f${_scopeId}><span class="role-chip" data-v-ce55a28f${_scopeId}>${ssrInterpolate(((_a2 = user.roles) == null ? void 0 : _a2.name) || "Role #" + user.roles_id)}</span></td><td data-v-ce55a28f${_scopeId}><select${ssrRenderAttr("value", getRoleValue(user))} class="form-ctrl-sm" data-v-ce55a28f${_scopeId}><!--[-->`);
                ssrRenderList(__props.roles, (r) => {
                  _push2(`<option${ssrRenderAttr("value", r.id)} data-v-ce55a28f${_scopeId}> [${ssrInterpolate(r.id)}] ${ssrInterpolate(r.name)}</option>`);
                });
                _push2(`<!--]--></select></td><td class="actions-cell" data-v-ce55a28f${_scopeId}><button class="btn-sm-primary" title="Simpan role" data-v-ce55a28f${_scopeId}><i class="bi bi-check2" data-v-ce55a28f${_scopeId}></i> Simpan </button><button class="btn-sm-danger" title="Keluarkan dari staff" data-v-ce55a28f${_scopeId}><i class="bi bi-person-dash" data-v-ce55a28f${_scopeId}></i></button></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            }
            _push2(`</div></div><div style="${ssrRenderStyle(tab.value === "recruit" ? null : { display: "none" })}" class="tab-content" data-v-ce55a28f${_scopeId}><div class="card-block" data-v-ce55a28f${_scopeId}><div class="block-header" data-v-ce55a28f${_scopeId}><h3 class="block-title" data-v-ce55a28f${_scopeId}><i class="bi bi-person-plus-fill" data-v-ce55a28f${_scopeId}></i> User Terdaftar (Belum Staff)</h3><input type="text"${ssrRenderAttr("value", nonStaffSearch.value)} placeholder="Cari nama / email..." class="form-ctrl search-ctrl" data-v-ce55a28f${_scopeId}></div>`);
            if (filteredNonStaff.value.length === 0) {
              _push2(`<div class="empty-state" data-v-ce55a28f${_scopeId}> Semua user sudah menjadi staff, atau belum ada yang mendaftar. </div>`);
            } else {
              _push2(`<div class="staff-table-wrap" data-v-ce55a28f${_scopeId}><table class="staff-table" data-v-ce55a28f${_scopeId}><thead data-v-ce55a28f${_scopeId}><tr data-v-ce55a28f${_scopeId}><th data-v-ce55a28f${_scopeId}>Nama</th><th data-v-ce55a28f${_scopeId}>Email</th><th data-v-ce55a28f${_scopeId}>Bergabung</th><th data-v-ce55a28f${_scopeId}>Aksi</th></tr></thead><tbody data-v-ce55a28f${_scopeId}><!--[-->`);
              ssrRenderList(filteredNonStaff.value, (user) => {
                _push2(`<tr data-v-ce55a28f${_scopeId}><td data-v-ce55a28f${_scopeId}><div class="user-name" data-v-ce55a28f${_scopeId}>${ssrInterpolate(user.name)}</div></td><td class="text-muted" data-v-ce55a28f${_scopeId}>${ssrInterpolate(user.email)}</td><td class="text-muted" data-v-ce55a28f${_scopeId}>${ssrInterpolate(new Date(user.created_at).toLocaleDateString("id-ID"))}</td><td data-v-ce55a28f${_scopeId}><button class="btn-sm-primary" data-v-ce55a28f${_scopeId}><i class="bi bi-person-plus" data-v-ce55a28f${_scopeId}></i> Jadikan Staff </button></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(_component_Head, { title: "CEO Panel" }),
              __props.notif ? (openBlock(), createBlock(_sfc_main$1, {
                key: 0,
                type: __props.notif.type,
                message: __props.notif.message
              }, null, 8, ["type", "message"])) : createCommentVNode("", true),
              createVNode("div", { class: "ceo-panel" }, [
                createVNode("div", { class: "panel-header" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "panel-title" }, [
                      createVNode("i", { class: "bi bi-award-fill me-2" }),
                      createTextVNode("CEO Panel")
                    ]),
                    createVNode("p", { class: "panel-sub" }, "Kelola kepengurusan tahunan & manajemen staff")
                  ]),
                  __props.activeYear ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "active-year-badge"
                  }, [
                    createVNode("i", { class: "bi bi-calendar-check-fill" }),
                    createTextVNode(" Aktif: " + toDisplayString(__props.activeYear.label || __props.activeYear.year), 1)
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "active-year-badge inactive"
                  }, [
                    createVNode("i", { class: "bi bi-exclamation-triangle-fill" }),
                    createTextVNode(" Belum ada tahun aktif ")
                  ]))
                ]),
                createVNode("div", { class: "tab-bar" }, [
                  createVNode("button", {
                    class: ["tab-btn", { active: tab.value === "years" }],
                    onClick: ($event) => tab.value = "years"
                  }, [
                    createVNode("i", { class: "bi bi-calendar3" }),
                    createTextVNode(" Tahun Kepengurusan ")
                  ], 10, ["onClick"]),
                  createVNode("button", {
                    class: ["tab-btn", { active: tab.value === "staff" }],
                    onClick: ($event) => tab.value = "staff"
                  }, [
                    createVNode("i", { class: "bi bi-people-fill" }),
                    createTextVNode(" Manajemen Staff "),
                    createVNode("span", { class: "badge" }, toDisplayString(__props.staff.length), 1)
                  ], 10, ["onClick"]),
                  createVNode("button", {
                    class: ["tab-btn", { active: tab.value === "recruit" }],
                    onClick: ($event) => tab.value = "recruit"
                  }, [
                    createVNode("i", { class: "bi bi-person-plus-fill" }),
                    createTextVNode(" Rekrut Staff "),
                    createVNode("span", { class: "badge" }, toDisplayString(__props.nonStaff.length), 1)
                  ], 10, ["onClick"])
                ]),
                withDirectives(createVNode("div", { class: "tab-content" }, [
                  createVNode("div", { class: "card-block" }, [
                    createVNode("h3", { class: "block-title" }, [
                      createVNode("i", { class: "bi bi-plus-circle-fill" }),
                      createTextVNode(" Tambah Tahun Kepengurusan")
                    ]),
                    createVNode("div", { class: "form-row" }, [
                      createVNode("div", { class: "form-group" }, [
                        createVNode("label", null, "Tahun"),
                        withDirectives(createVNode("input", {
                          type: "number",
                          "onUpdate:modelValue": ($event) => newYear.value = $event,
                          min: "2000",
                          max: "2099",
                          class: "form-ctrl"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, newYear.value]
                        ])
                      ]),
                      createVNode("div", { class: "form-group flex-2" }, [
                        createVNode("label", null, "Label (opsional)"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => newLabel.value = $event,
                          placeholder: "cth: Kepengurusan 2026/2027",
                          class: "form-ctrl"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, newLabel.value]
                        ])
                      ]),
                      createVNode("div", { class: "form-group align-end" }, [
                        createVNode("button", {
                          class: "btn-primary",
                          onClick: storeYear
                        }, [
                          createVNode("i", { class: "bi bi-plus" }),
                          createTextVNode(" Tambah ")
                        ])
                      ])
                    ]),
                    ((_b = __props.errors) == null ? void 0 : _b.year) ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "err-msg"
                    }, toDisplayString(__props.errors.year[0]), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "card-block" }, [
                    createVNode("h3", { class: "block-title" }, [
                      createVNode("i", { class: "bi bi-list-ul" }),
                      createTextVNode(" Daftar Tahun Kepengurusan")
                    ]),
                    __props.governanceYears.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "empty-state"
                    }, " Belum ada tahun kepengurusan. Tambahkan di atas. ")) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "year-list"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.governanceYears, (gy) => {
                        var _a2;
                        return openBlock(), createBlock("div", {
                          key: gy.id,
                          class: ["year-card", { "year-active": gy.is_active }]
                        }, [
                          createVNode("div", { class: "year-info" }, [
                            createVNode("span", { class: "year-number" }, toDisplayString(gy.year), 1),
                            createVNode("span", { class: "year-label" }, toDisplayString(gy.label || "—"), 1),
                            gy.is_active ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "badge-active"
                            }, "AKTIF")) : createCommentVNode("", true)
                          ]),
                          gy.activated_by && gy.is_active ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "year-meta"
                          }, " Diaktifkan oleh " + toDisplayString(((_a2 = gy.activated_by) == null ? void 0 : _a2.name) || "—") + " " + toDisplayString(gy.activated_at ? "pada " + new Date(gy.activated_at).toLocaleDateString("id-ID") : ""), 1)) : createCommentVNode("", true),
                          createVNode("div", { class: "year-actions" }, [
                            createVNode("button", {
                              class: ["toggle-switch", { "toggle-on": gy.is_active }],
                              onClick: ($event) => toggleYear(gy.id),
                              title: gy.is_active ? "Klik untuk nonaktifkan" : "Klik untuk aktifkan"
                            }, [
                              createVNode("span", { class: "toggle-knob" })
                            ], 10, ["onClick", "title"]),
                            createVNode("span", {
                              class: ["toggle-label", { "toggle-label-on": gy.is_active }]
                            }, toDisplayString(gy.is_active ? "Aktif" : "Nonaktif"), 3)
                          ])
                        ], 2);
                      }), 128))
                    ]))
                  ])
                ], 512), [
                  [vShow, tab.value === "years"]
                ]),
                withDirectives(createVNode("div", { class: "tab-content" }, [
                  createVNode("div", { class: "card-block" }, [
                    createVNode("div", { class: "block-header" }, [
                      createVNode("h3", { class: "block-title" }, [
                        createVNode("i", { class: "bi bi-people-fill" }),
                        createTextVNode(" Daftar Staff")
                      ]),
                      withDirectives(createVNode("input", {
                        type: "text",
                        "onUpdate:modelValue": ($event) => staffSearch.value = $event,
                        placeholder: "Cari nama / email...",
                        class: "form-ctrl search-ctrl"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, staffSearch.value]
                      ])
                    ]),
                    filteredStaff.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "empty-state"
                    }, " Tidak ada staff ditemukan. ")) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "staff-table-wrap"
                    }, [
                      createVNode("table", { class: "staff-table" }, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", null, "Nama"),
                            createVNode("th", null, "Email"),
                            createVNode("th", null, "Role Saat Ini"),
                            createVNode("th", null, "Ubah Role"),
                            createVNode("th", null, "Aksi")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(filteredStaff.value, (user) => {
                            var _a2;
                            return openBlock(), createBlock("tr", {
                              key: user.id
                            }, [
                              createVNode("td", null, [
                                createVNode("div", { class: "user-name" }, toDisplayString(user.name), 1)
                              ]),
                              createVNode("td", { class: "text-muted" }, toDisplayString(user.email), 1),
                              createVNode("td", null, [
                                createVNode("span", { class: "role-chip" }, toDisplayString(((_a2 = user.roles) == null ? void 0 : _a2.name) || "Role #" + user.roles_id), 1)
                              ]),
                              createVNode("td", null, [
                                createVNode("select", {
                                  value: getRoleValue(user),
                                  onChange: ($event) => setRoleValue(user, $event.target.value),
                                  class: "form-ctrl-sm"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.roles, (r) => {
                                    return openBlock(), createBlock("option", {
                                      key: r.id,
                                      value: r.id
                                    }, " [" + toDisplayString(r.id) + "] " + toDisplayString(r.name), 9, ["value"]);
                                  }), 128))
                                ], 40, ["value", "onChange"])
                              ]),
                              createVNode("td", { class: "actions-cell" }, [
                                createVNode("button", {
                                  class: "btn-sm-primary",
                                  onClick: ($event) => assignRole(user),
                                  title: "Simpan role"
                                }, [
                                  createVNode("i", { class: "bi bi-check2" }),
                                  createTextVNode(" Simpan ")
                                ], 8, ["onClick"]),
                                createVNode("button", {
                                  class: "btn-sm-danger",
                                  onClick: ($event) => demoteUser(user.id, user.name),
                                  title: "Keluarkan dari staff"
                                }, [
                                  createVNode("i", { class: "bi bi-person-dash" })
                                ], 8, ["onClick"])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ]))
                  ])
                ], 512), [
                  [vShow, tab.value === "staff"]
                ]),
                withDirectives(createVNode("div", { class: "tab-content" }, [
                  createVNode("div", { class: "card-block" }, [
                    createVNode("div", { class: "block-header" }, [
                      createVNode("h3", { class: "block-title" }, [
                        createVNode("i", { class: "bi bi-person-plus-fill" }),
                        createTextVNode(" User Terdaftar (Belum Staff)")
                      ]),
                      withDirectives(createVNode("input", {
                        type: "text",
                        "onUpdate:modelValue": ($event) => nonStaffSearch.value = $event,
                        placeholder: "Cari nama / email...",
                        class: "form-ctrl search-ctrl"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, nonStaffSearch.value]
                      ])
                    ]),
                    filteredNonStaff.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "empty-state"
                    }, " Semua user sudah menjadi staff, atau belum ada yang mendaftar. ")) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "staff-table-wrap"
                    }, [
                      createVNode("table", { class: "staff-table" }, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th", null, "Nama"),
                            createVNode("th", null, "Email"),
                            createVNode("th", null, "Bergabung"),
                            createVNode("th", null, "Aksi")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(filteredNonStaff.value, (user) => {
                            return openBlock(), createBlock("tr", {
                              key: user.id
                            }, [
                              createVNode("td", null, [
                                createVNode("div", { class: "user-name" }, toDisplayString(user.name), 1)
                              ]),
                              createVNode("td", { class: "text-muted" }, toDisplayString(user.email), 1),
                              createVNode("td", { class: "text-muted" }, toDisplayString(new Date(user.created_at).toLocaleDateString("id-ID")), 1),
                              createVNode("td", null, [
                                createVNode("button", {
                                  class: "btn-sm-primary",
                                  onClick: ($event) => promoteUser(user.id)
                                }, [
                                  createVNode("i", { class: "bi bi-person-plus" }),
                                  createTextVNode(" Jadikan Staff ")
                                ], 8, ["onClick"])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ]))
                  ])
                ], 512), [
                  [vShow, tab.value === "recruit"]
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/CeoPanel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CeoPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ce55a28f"]]);
export {
  CeoPanel as default
};
//# sourceMappingURL=CeoPanel-DUWMMkFY.js.map
