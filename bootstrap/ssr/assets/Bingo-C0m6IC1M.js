import { ref, withCtx, createVNode, toDisplayString, withDirectives, vModelText, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { G as GuestLayout } from "./GuestLayout-EBOafcqa.js";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Bingo",
  __ssrInlineRender: true,
  setup(__props) {
    const bingo_dimesnion = ref(1);
    const bingo_array = ref([1]);
    const receiptContentRef = ref(null);
    const receiptPrintedImageUrl = ref(null);
    function shuffleNumber() {
      bingo_array.value = getRandomizedNumbers(bingo_dimesnion.value ** 2);
    }
    function getRandomizedNumbers(n) {
      const array = Array.from({ length: n }, (_, i) => i + 1);
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    const printReceipt = async () => {
      const element = receiptContentRef.value;
      const canvas = await html2canvas(element, {
        scale: 2
        // higher quality
      });
      receiptPrintedImageUrl.value = canvas.toDataURL("image/png", 0.8);
      const link = document.createElement("a");
      link.href = receiptPrintedImageUrl.value;
      link.download = "Bingo" + bingo_dimesnion.value + "_" + format(/* @__PURE__ */ new Date(), "HHmm") + ".png";
      link.click();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(GuestLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="container"${_scopeId}><div class="row mt-5"${_scopeId}><div class="col-12"${_scopeId}><div class="d-flex w-100"${_scopeId}><span class="mx-auto h1 text-primary-emphasis"${_scopeId}>${ssrInterpolate("Bingo")}</span></div></div></div><div class="row"${_scopeId}><div class="col-auto"${_scopeId}><span class="text-secondary"${_scopeId}>${ssrInterpolate("Dimension : ")}</span><input type="number"${ssrRenderAttr("value", bingo_dimesnion.value)} class="form-control form-control-sm"${_scopeId}></div><div class="col"${_scopeId}><div class="d-flex"${_scopeId}><div class="card p-3"${_scopeId}><div class="d-flex"${_scopeId}><button class="btn btn-sm btn-outline-primary border-secondary-subtle"${_scopeId}><i class="bi bi-play-fill fs-6"${_scopeId}></i></button><button class="btn btn-sm btn-outline-primary border-secondary-subtle ms-2"${_scopeId}><i class="bi bi-download fs-6"${_scopeId}></i></button></div></div></div></div></div><div class="row mt-4"${_scopeId}><div class="col-12"${_scopeId}><div class="w-100 d-flex"${_scopeId}><div class="card p-3"${_scopeId}><div class="d-flex mb-3"${_scopeId}><span class="h4 text-primary-emphasis my-auto me-3"${_scopeId}>${ssrInterpolate("BINGO")}</span><span class="text-primary fs-4 ms-auto"${_scopeId}>${ssrInterpolate(bingo_dimesnion.value)}</span><i class="bi bi-x mx-2 fs-4"${_scopeId}></i><span class="text-primary fs-4"${_scopeId}>${ssrInterpolate(bingo_dimesnion.value)}</span></div><!--[-->`);
            ssrRenderList(bingo_dimesnion.value, (row) => {
              _push2(`<div class="w-100 d-flex"${_scopeId}><!--[-->`);
              ssrRenderList(bingo_dimesnion.value, (col) => {
                _push2(`<div class="border d-flex" style="${ssrRenderStyle({ "width": "40px", "height": "40px" })}"${_scopeId}><span class="m-auto"${_scopeId}>${ssrInterpolate(bingo_array.value[(row - 1) * bingo_dimesnion.value + col - 1])}</span></div>`);
              });
              _push2(`<!--]--></div>`);
            });
            _push2(`<!--]--></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "container" }, [
                createVNode("div", { class: "row mt-5" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "d-flex w-100" }, [
                      createVNode("span", { class: "mx-auto h1 text-primary-emphasis" }, toDisplayString("Bingo"))
                    ])
                  ])
                ]),
                createVNode("div", { class: "row" }, [
                  createVNode("div", { class: "col-auto" }, [
                    createVNode("span", { class: "text-secondary" }, toDisplayString("Dimension : ")),
                    withDirectives(createVNode("input", {
                      type: "number",
                      "onUpdate:modelValue": ($event) => bingo_dimesnion.value = $event,
                      class: "form-control form-control-sm"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, bingo_dimesnion.value]
                    ])
                  ]),
                  createVNode("div", { class: "col" }, [
                    createVNode("div", { class: "d-flex" }, [
                      createVNode("div", { class: "card p-3" }, [
                        createVNode("div", { class: "d-flex" }, [
                          createVNode("button", {
                            onClick: shuffleNumber,
                            class: "btn btn-sm btn-outline-primary border-secondary-subtle"
                          }, [
                            createVNode("i", { class: "bi bi-play-fill fs-6" })
                          ]),
                          createVNode("button", {
                            onClick: printReceipt,
                            class: "btn btn-sm btn-outline-primary border-secondary-subtle ms-2"
                          }, [
                            createVNode("i", { class: "bi bi-download fs-6" })
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "row mt-4" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "w-100 d-flex" }, [
                      createVNode("div", {
                        class: "card p-3",
                        ref_key: "receiptContentRef",
                        ref: receiptContentRef
                      }, [
                        createVNode("div", { class: "d-flex mb-3" }, [
                          createVNode("span", { class: "h4 text-primary-emphasis my-auto me-3" }, toDisplayString("BINGO")),
                          createVNode("span", { class: "text-primary fs-4 ms-auto" }, toDisplayString(bingo_dimesnion.value), 1),
                          createVNode("i", { class: "bi bi-x mx-2 fs-4" }),
                          createVNode("span", { class: "text-primary fs-4" }, toDisplayString(bingo_dimesnion.value), 1)
                        ]),
                        (openBlock(true), createBlock(Fragment, null, renderList(bingo_dimesnion.value, (row) => {
                          return openBlock(), createBlock("div", { class: "w-100 d-flex" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(bingo_dimesnion.value, (col) => {
                              return openBlock(), createBlock("div", {
                                class: "border d-flex",
                                style: { "width": "40px", "height": "40px" }
                              }, [
                                createVNode("span", { class: "m-auto" }, toDisplayString(bingo_array.value[(row - 1) * bingo_dimesnion.value + col - 1]), 1)
                              ]);
                            }), 256))
                          ]);
                        }), 256))
                      ], 512)
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Bingo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
