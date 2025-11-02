import { ref, onMounted, onUnmounted, watch, withCtx, unref, createVNode, toDisplayString, createTextVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Notif-DL0SggHu.js";
import { G as GuestLayout } from "./GuestLayout-EBOafcqa.js";
import { usePage, Head } from "@inertiajs/vue3";
import "vue-toastification";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Welcome",
  __ssrInlineRender: true,
  props: {
    notif: Object
  },
  setup(__props) {
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const toastNotifRef = ref(null);
    const title = ref("Welcome");
    const placeholder = ref("placeholder");
    const isLargeScreen = ref(window.innerWidth >= 768);
    const handleResize = () => {
      isLargeScreen.value = window.innerWidth >= 768;
    };
    function navigateTo(link) {
      window.open(link, "_blank");
    }
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      placeholder.value = "";
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    watch(
      () => props.notif,
      (newValue) => {
        const notification = newValue;
        toastNotifRef.value.showToast(notification.type, notification.message);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(GuestLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: title.value,
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(`<div class="d-flex w-100" style="${ssrRenderStyle({ "height": "80vh", "background": "url('/storage/local/images/shop/home/main.jpg')", "background-size": "cover", "background-position": "center center" })}"${_scopeId}><div class="d-flex w-100 h-100 bg-dark bg-opacity-75"${_scopeId}><div class="container h-100"${_scopeId}><div class="row g-5 h-100 my-0 justify-content-end"${_scopeId}><div class="col-12 col-lg-7 mt-auto"${_scopeId}><div class="scroll-x-hidden"${_scopeId}><div class="h3 text-warning mx-3 d-none d-lg-block"${_scopeId}>${ssrInterpolate("#SetUpYourMindToBeAnEntrepreneur!")}</div><div class="h5 text-warning mx-3 d-lg-none"${_scopeId}>${ssrInterpolate("#SetUpYourMindToBeAnEntrepreneur!")}</div></div><p style="${ssrRenderStyle({
              textAlign: "justify",
              fontSize: isLargeScreen.value ? "1rem" : "0.8rem",
              lineHeight: "2rem"
            })}" class="mx-3 text-white"${_scopeId}>${ssrInterpolate("Established in 2020 to develop students` creativity and experience in entrepreneurship. The desire to have an impact on the surrounding environment gave birth to the ")} <span class="text-warning px-2 h6 py-0 py-lg-1"${_scopeId}>${ssrInterpolate("Blaterian")}</span> ${ssrInterpolate(" brand by bringing local wisdom values ​​from where we come from. Located on the border of Purbalingga district, its name is Blater Village.")}</p></div><div class="col-12 col-lg-5 mt-lg-auto mb-lg-4 mb-5 mt-auto"${_scopeId}><div class="card bg-white rounded shadow p-3"${_scopeId}><span class="h1 text-warning-emphasis d-block mb-0"${_scopeId}>${ssrInterpolate("Blaterian")}</span><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate(" by Soedirman Engineering Entrepreneurship Organization")}</span><div class="d-flex mt-3"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("shop"))} class="${ssrRenderClass(
              "btn btn-sm btn-outline-warning rounded-0 fs-5 border-0 py-2 " + (unref(auth_user) ? ((_a = unref(auth_user)) == null ? void 0 : _a.roles_id) > 4 ? "w-100" : "w-50" : "w-50")
            )}"${_scopeId}><i class="bi bi-shop me-2"${_scopeId}></i> ${ssrInterpolate("Shop")}</a><div class="d-flex w-50"${_scopeId}>`);
            if (!unref(auth_user)) {
              _push2(`<a${ssrRenderAttr("href", _ctx.route("login"))} class="btn btn-sm btn-secondary w-50 rounded-0 py-0 d-flex"${_scopeId}><span class="my-auto mx-auto"${_scopeId}>${ssrInterpolate("Login")}</span></a>`);
            } else {
              _push2(`<!---->`);
            }
            if (!unref(auth_user)) {
              _push2(`<a${ssrRenderAttr("href", _ctx.route("register"))} class="btn btn-sm btn-secondary w-50 rounded-0 py-0 d-flex"${_scopeId}><span class="my-auto mx-auto"${_scopeId}>${ssrInterpolate("Register")}</span></a>`);
            } else {
              _push2(`<!---->`);
            }
            if (((_b = unref(auth_user)) == null ? void 0 : _b.roles_id) > 0) {
              _push2(`<a${ssrRenderAttr("href", _ctx.route("dashboard"))} class="btn btn-sm btn-secondary w-100 rounded-0 py-0 d-flex"${_scopeId}><span class="my-auto mx-auto"${_scopeId}>${ssrInterpolate("Dashboard")}</span></a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></div></div></div></div><div class="d-flex w-100 bg-white pb-4"${_scopeId}><div class="container"${_scopeId}><div class="row gx-4 m-0"${_scopeId}><div class="col-12 col-lg-6 my-0"${_scopeId}><div class="row gx-4"${_scopeId}><div class="col-12"${_scopeId}><span class="text-warning-emphasis d-block h6 d-block mt-4"${_scopeId}>${ssrInterpolate("Our Contact :")}</span></div><div class="col-6"${_scopeId}><span class="d-block text-secondary"${_scopeId}>${ssrInterpolate("Business")}</span><li class="list-group list-group-flush"${_scopeId}><ul class="list-group-item list-group-item-action mb-0 py-2"${_scopeId}><div class="d-flex"${_scopeId}><i class="bi bi-instagram me-2 my-auto"${_scopeId}></i><div${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Instagram")}</span><span class="d-block"${_scopeId}>${ssrInterpolate("blaterian.id")}</span></div></div></ul></li></div><div class="col-6"${_scopeId}><span class="d-block text-secondary"${_scopeId}>${ssrInterpolate("Organization")}</span><li class="list-group list-group-flush"${_scopeId}><ul class="list-group-item list-group-item-action mb-0 py-2"${_scopeId}><div class="d-flex"${_scopeId}><i class="bi bi-instagram me-2 my-auto"${_scopeId}></i><div${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Instagram")}</span><span class="d-block"${_scopeId}>${ssrInterpolate("seeo_ftunsoed")}</span></div></div></ul><ul class="list-group-item list-group-item-action mb-0 py-2"${_scopeId}><div class="d-flex"${_scopeId}><i class="bi bi-tiktok me-2 my-auto"${_scopeId}></i><div${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("Tiktok")}</span><span class="d-block"${_scopeId}>${ssrInterpolate("@seeoftunsoed")}</span></div></div></ul></li></div></div></div><div class="col-12 col-lg-3"${_scopeId}><span class="text-warning-emphasis d-block h6 d-block mt-4"${_scopeId}>${ssrInterpolate("Address :")}</span><span class="d-block text-secondary"${_scopeId}>${ssrInterpolate("Organization")}</span><li class="list-group list-group-flush"${_scopeId}><ul class="list-group-item list-group-item-action mb-0 py-2"${_scopeId}><div class="d-flex"${_scopeId}><i class="bi bi-geo-alt me-2 mt-2 fs-5"${_scopeId}></i><div${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}"${_scopeId}>${ssrInterpolate("FT Unsoed")}</span><span class="d-block"${_scopeId}>${ssrInterpolate("Fakultas Teknik Universitas Jenderal Soedirman, Jalan Mayjen Sungkono km 5, Blater, Purbalingga 53371.")}</span></div></div></ul></li></div></div></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "toastNotifRef",
              ref: toastNotifRef
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), {
                title: title.value,
                icon: "/storage/local/images/apps/logo.png"
              }, null, 8, ["title"]),
              createVNode("div", {
                class: "d-flex w-100",
                style: { "height": "80vh", "background": "url('/storage/local/images/shop/home/main.jpg')", "background-size": "cover", "background-position": "center center" }
              }, [
                createVNode("div", { class: "d-flex w-100 h-100 bg-dark bg-opacity-75" }, [
                  createVNode("div", { class: "container h-100" }, [
                    createVNode("div", { class: "row g-5 h-100 my-0 justify-content-end" }, [
                      createVNode("div", { class: "col-12 col-lg-7 mt-auto" }, [
                        createVNode("div", { class: "scroll-x-hidden" }, [
                          createVNode("div", { class: "h3 text-warning mx-3 d-none d-lg-block" }, toDisplayString("#SetUpYourMindToBeAnEntrepreneur!")),
                          createVNode("div", { class: "h5 text-warning mx-3 d-lg-none" }, toDisplayString("#SetUpYourMindToBeAnEntrepreneur!"))
                        ]),
                        createVNode("p", {
                          style: {
                            textAlign: "justify",
                            fontSize: isLargeScreen.value ? "1rem" : "0.8rem",
                            lineHeight: "2rem"
                          },
                          class: "mx-3 text-white"
                        }, [
                          createTextVNode(toDisplayString("Established in 2020 to develop students` creativity and experience in entrepreneurship. The desire to have an impact on the surrounding environment gave birth to the ") + " "),
                          createVNode("span", { class: "text-warning px-2 h6 py-0 py-lg-1" }, toDisplayString("Blaterian")),
                          createTextVNode(" " + toDisplayString(" brand by bringing local wisdom values ​​from where we come from. Located on the border of Purbalingga district, its name is Blater Village."))
                        ], 4)
                      ]),
                      createVNode("div", { class: "col-12 col-lg-5 mt-lg-auto mb-lg-4 mb-5 mt-auto" }, [
                        createVNode("div", { class: "card bg-white rounded shadow p-3" }, [
                          createVNode("span", { class: "h1 text-warning-emphasis d-block mb-0" }, toDisplayString("Blaterian")),
                          createVNode("span", {
                            class: "text-secondary d-block",
                            style: { "font-size": "0.8rem" }
                          }, toDisplayString(" by Soedirman Engineering Entrepreneurship Organization")),
                          createVNode("div", { class: "d-flex mt-3" }, [
                            createVNode("a", {
                              href: _ctx.route("shop"),
                              class: "btn btn-sm btn-outline-warning rounded-0 fs-5 border-0 py-2 " + (unref(auth_user) ? ((_c = unref(auth_user)) == null ? void 0 : _c.roles_id) > 4 ? "w-100" : "w-50" : "w-50")
                            }, [
                              createVNode("i", { class: "bi bi-shop me-2" }),
                              createTextVNode(" " + toDisplayString("Shop"))
                            ], 10, ["href"]),
                            createVNode("div", { class: "d-flex w-50" }, [
                              !unref(auth_user) ? (openBlock(), createBlock("a", {
                                key: 0,
                                href: _ctx.route("login"),
                                class: "btn btn-sm btn-secondary w-50 rounded-0 py-0 d-flex"
                              }, [
                                createVNode("span", { class: "my-auto mx-auto" }, toDisplayString("Login"))
                              ], 8, ["href"])) : createCommentVNode("", true),
                              !unref(auth_user) ? (openBlock(), createBlock("a", {
                                key: 1,
                                href: _ctx.route("register"),
                                class: "btn btn-sm btn-secondary w-50 rounded-0 py-0 d-flex"
                              }, [
                                createVNode("span", { class: "my-auto mx-auto" }, toDisplayString("Register"))
                              ], 8, ["href"])) : createCommentVNode("", true),
                              ((_d = unref(auth_user)) == null ? void 0 : _d.roles_id) > 0 ? (openBlock(), createBlock("a", {
                                key: 2,
                                href: _ctx.route("dashboard"),
                                class: "btn btn-sm btn-secondary w-100 rounded-0 py-0 d-flex"
                              }, [
                                createVNode("span", { class: "my-auto mx-auto" }, toDisplayString("Dashboard"))
                              ], 8, ["href"])) : createCommentVNode("", true)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "d-flex w-100 bg-white pb-4" }, [
                createVNode("div", { class: "container" }, [
                  createVNode("div", { class: "row gx-4 m-0" }, [
                    createVNode("div", { class: "col-12 col-lg-6 my-0" }, [
                      createVNode("div", { class: "row gx-4" }, [
                        createVNode("div", { class: "col-12" }, [
                          createVNode("span", { class: "text-warning-emphasis d-block h6 d-block mt-4" }, toDisplayString("Our Contact :"))
                        ]),
                        createVNode("div", { class: "col-6" }, [
                          createVNode("span", { class: "d-block text-secondary" }, toDisplayString("Business")),
                          createVNode("li", { class: "list-group list-group-flush" }, [
                            createVNode("ul", {
                              onClick: ($event) => navigateTo(
                                "https://www.instagram.com/blaterian.id"
                              ),
                              class: "list-group-item list-group-item-action mb-0 py-2"
                            }, [
                              createVNode("div", { class: "d-flex" }, [
                                createVNode("i", { class: "bi bi-instagram me-2 my-auto" }),
                                createVNode("div", null, [
                                  createVNode("span", {
                                    class: "text-secondary d-block",
                                    style: { "font-size": "0.8rem" }
                                  }, toDisplayString("Instagram")),
                                  createVNode("span", { class: "d-block" }, toDisplayString("blaterian.id"))
                                ])
                              ])
                            ], 8, ["onClick"])
                          ])
                        ]),
                        createVNode("div", { class: "col-6" }, [
                          createVNode("span", { class: "d-block text-secondary" }, toDisplayString("Organization")),
                          createVNode("li", { class: "list-group list-group-flush" }, [
                            createVNode("ul", {
                              onClick: ($event) => navigateTo(
                                "https://www.instagram.com/seeo_ftunsoed"
                              ),
                              class: "list-group-item list-group-item-action mb-0 py-2"
                            }, [
                              createVNode("div", { class: "d-flex" }, [
                                createVNode("i", { class: "bi bi-instagram me-2 my-auto" }),
                                createVNode("div", null, [
                                  createVNode("span", {
                                    class: "text-secondary d-block",
                                    style: { "font-size": "0.8rem" }
                                  }, toDisplayString("Instagram")),
                                  createVNode("span", { class: "d-block" }, toDisplayString("seeo_ftunsoed"))
                                ])
                              ])
                            ], 8, ["onClick"]),
                            createVNode("ul", {
                              onClick: ($event) => navigateTo(
                                "https://www.tiktok.com/@seeoftunsoed"
                              ),
                              class: "list-group-item list-group-item-action mb-0 py-2"
                            }, [
                              createVNode("div", { class: "d-flex" }, [
                                createVNode("i", { class: "bi bi-tiktok me-2 my-auto" }),
                                createVNode("div", null, [
                                  createVNode("span", {
                                    class: "text-secondary d-block",
                                    style: { "font-size": "0.8rem" }
                                  }, toDisplayString("Tiktok")),
                                  createVNode("span", { class: "d-block" }, toDisplayString("@seeoftunsoed"))
                                ])
                              ])
                            ], 8, ["onClick"])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "col-12 col-lg-3" }, [
                      createVNode("span", { class: "text-warning-emphasis d-block h6 d-block mt-4" }, toDisplayString("Address :")),
                      createVNode("span", { class: "d-block text-secondary" }, toDisplayString("Organization")),
                      createVNode("li", { class: "list-group list-group-flush" }, [
                        createVNode("ul", {
                          onClick: ($event) => navigateTo(
                            "https://maps.app.goo.gl/D2VWaDPWFzLpXCf36"
                          ),
                          class: "list-group-item list-group-item-action mb-0 py-2"
                        }, [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("i", { class: "bi bi-geo-alt me-2 mt-2 fs-5" }),
                            createVNode("div", null, [
                              createVNode("span", {
                                class: "text-secondary d-block",
                                style: { "font-size": "0.8rem" }
                              }, toDisplayString("FT Unsoed")),
                              createVNode("span", { class: "d-block" }, toDisplayString("Fakultas Teknik Universitas Jenderal Soedirman, Jalan Mayjen Sungkono km 5, Blater, Purbalingga 53371."))
                            ])
                          ])
                        ], 8, ["onClick"])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(_sfc_main$1, {
                ref_key: "toastNotifRef",
                ref: toastNotifRef
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Public/Welcome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
