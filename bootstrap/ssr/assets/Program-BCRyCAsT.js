import { ref, computed, onMounted, onUnmounted, watch, withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, createTextVNode, Fragment, renderList, Transition, withModifiers, withDirectives, vModelText, vModelSelect, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./StaffLayout-Dx7OTDGc.js";
import { M as ModalAlertNotification } from "./ModalAlertNotification-DTKoiHkW.js";
import { _ as _sfc_main$2 } from "./Notif-DL0SggHu.js";
import { _ as _sfc_main$3 } from "./ModalConfirmation-CQDhtLdH.js";
import { _ as _sfc_main$4 } from "./InputError-DugfSnOg.js";
import { usePage, useForm, Head, Link } from "@inertiajs/vue3";
import { f as formatIDR, a as formatDate } from "../app.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
/* empty css             */
import "vue-toastification";
import "axios";
import "date-fns";
import "bootstrap";
const _sfc_main = {
  __name: "Program",
  __ssrInlineRender: true,
  props: {
    notif: Object,
    errors: Object,
    program: Object,
    default_logbook_id: Number,
    filter: Object,
    budget_list: Array,
    staff_list: Array,
    disbursement_list: Array,
    expense_list: Array,
    logbook_list: Array,
    disbursement_letter_list: Array,
    employee_list: Array,
    can_access_internship: Boolean,
    is_internship_program: Boolean,
    user_access_info: Object
  },
  setup(__props) {
    const props = __props;
    const auth_user = usePage().props.auth.user;
    const placeholder = ref("placeholder");
    const modalConfirmationRef = ref(null);
    const modalAlertNotificationRef = ref(null);
    const modalLetterRef = ref(null);
    const modalAddDisbursementLetterRef = ref(null);
    const modalAddDisbursementRef = ref(null);
    const modalAddExpenseRef = ref(null);
    const modalAddStaffRef = ref(null);
    const modalReceiptDisbursementRef = ref(null);
    const active_logbook = computed(() => {
      return props.logbook_list.filter(
        (logbook) => logbook.user_id == selected_user.value.id
      );
    });
    const selected_user = ref(0);
    const active_tab = ref(1);
    const next_tab = ref(0);
    const prev_tab = ref(0);
    const staffLogbookContainerRef = ref(null);
    const toastNotifRef = ref(null);
    const selectedLogbookImage = ref(null);
    const disbursement_letter = ref({
      id: null,
      letter: null,
      link: null,
      valid: null
    });
    const order_inverse = ref({
      asc: "desc",
      desc: "asc"
    });
    const trashed_inverse = ref({
      trashed: "exist",
      exist: "trashed"
    });
    const disbursement_receipt = ref({
      image: null,
      link: null
    });
    const expense_receipt = ref({
      iid: null,
      image: null,
      link: null,
      status: null,
      valid: null
    });
    const formBudgetFilter = useForm({
      category: props.filter["budget"]["category"],
      order: props.filter["budget"]["order"]
    });
    const formDisbursementFilter = useForm({
      category: "price",
      order: props.filter["disbursement"]["order"],
      trashed: props.filter["disbursement"]["trashed"]
    });
    const formExpenseFilter = useForm({
      category: props.filter["expense"]["category"],
      order: props.filter["expense"]["order"]
    });
    const formStaffFilter = useForm({
      category: props.filter["staff"]["category"],
      order: props.filter["staff"]["order"]
    });
    const formAddBudget = useForm({
      name: "",
      price: null,
      unit: null,
      qty: null,
      receipt: null
    });
    const formAddDisbursementLetter = useForm({
      letter: null
    });
    const formAddDisbursement = useForm({
      name: "",
      price: null,
      letter_id: "",
      receipt: null,
      blaterian_balance: null,
      blaterian_disbursement: null
    });
    const formAddExpense = useForm({
      name: "",
      price: 0,
      unit: "",
      qty: 0,
      reciept: null,
      same_receipt_check: false,
      receipt_same: false
    });
    const formAddStaff = useForm({
      staff_title: null,
      staff_id: null
    });
    function confirmation(route, message) {
      if (modalConfirmationRef.value) {
        modalConfirmationRef.value.showModal(route, message);
      } else {
        console.error("modalConfirmationRef is null");
      }
    }
    function alertNotification(message) {
      modalAlertNotificationRef.value.showModal(message);
    }
    function show_tab(target) {
      prev_tab.value = active_tab.value;
      active_tab.value = 0;
      next_tab.value = target;
    }
    function proceed_show_tab() {
      active_tab.value = next_tab.value;
    }
    function budgetFilterCategory(category) {
      if (formBudgetFilter.category !== category) {
        formBudgetFilter.order = order_inverse.value[formBudgetFilter.order];
      }
      formBudgetFilter.category = category;
    }
    function expenseFilterCategory(category) {
      if (formExpenseFilter.category !== category) {
        formExpenseFilter.order = order_inverse.value[formExpenseFilter.order];
      }
      formExpenseFilter.category = category;
    }
    function staffFilterCategory(category) {
      if (formStaffFilter.category !== category) {
        formStaffFilter.order = order_inverse.value[formStaffFilter.order];
      }
      formStaffFilter.category = category;
    }
    function filterDisbursementAction(action) {
      if (action == "trashed") {
        formDisbursementFilter.trashed = trashed_inverse.value[formDisbursementFilter.trashed];
      } else {
        formDisbursementFilter.order = order_inverse.value[formDisbursementFilter.order];
      }
    }
    function handleSubmitBudgetFilter(event, route_name) {
      event.preventDefault();
      formBudgetFilter.order = order_inverse.value[formBudgetFilter.order];
      formBudgetFilter.post(route_name, {
        onError: (error) => console.log(error)
      });
    }
    function handleSubmitDisbursementFilter(event, route_name) {
      event.preventDefault();
      formDisbursementFilter.post(route_name, {
        onError: (error) => console.log(error)
      });
    }
    function handleSubmitExpenseFilter(event, route_name) {
      event.preventDefault();
      formExpenseFilter.order = order_inverse.value[formExpenseFilter.order];
      formExpenseFilter.post(route_name, {
        onError: (error) => console.log(error)
      });
    }
    function handleSubmitStaffFilter(event, route_name) {
      event.preventDefault();
      formStaffFilter.order = order_inverse.value[formStaffFilter.order];
      formStaffFilter.post(route_name, {
        onError: (error) => console.log(error)
      });
    }
    function handleSubmitAddBudget(event, route_name) {
      event.preventDefault();
      formAddBudget.post(route_name, {
        onError: (error) => console.log("formAddBudget error submission:", error)
      });
    }
    function handleSubmitAddDisbursement(event, route_name) {
      event.preventDefault();
      formAddDisbursement.post(route_name, {
        onSuccess: () => {
          showAddDisbursementModal(false);
          formAddDisbursement.reset();
        },
        onError: (error) => console.log("formAddDisbursement error submission:", error)
      });
    }
    function handleSubmitAddDisbursementLetter(event, route_name) {
      event.preventDefault();
      formAddDisbursementLetter.post(route_name, {
        onSuccess: () => {
          showAddDisbursementLetterModal(false);
          formAddDisbursementLetter.reset();
        },
        onError: (error) => console.log("formAddDisbursementLetter error submission:", error)
      });
    }
    function handleSubmitAddExpense(event, route_name) {
      event.preventDefault();
      formAddExpense.post(route_name, {
        onSuccess: () => {
          showAddExpenseModal(false);
          formAddExpense.reset();
        },
        onError: (error) => console.log("formAddExpense error submission:", error)
      });
    }
    function handleSubmitAddStaff(event, route_name) {
      event.preventDefault();
      formAddStaff.post(route_name, {
        onSuccess: () => {
          showAddStaffModal(false);
          formAddStaff.reset();
        },
        onError: (error) => toastNotifRef.value.showToast("warning", error)
      });
    }
    function handleFileAddDisbursementReceipt(event) {
      formAddDisbursement.receipt = event.target.files[0];
    }
    function handleFileAddExpenseReceipt(event) {
      formAddExpense.reciept = event.target.files[0];
    }
    function handleFileAddDisbursementLetter(event) {
      formAddDisbursementLetter.letter = event.target.files[0];
    }
    function setDisbursementReceipt(receipt) {
      disbursement_receipt.value.image = receipt;
      disbursement_receipt.value.link = "/storage/images/receipt/disbursement/" + receipt;
      showReceiptDisbursementModal(true);
    }
    function setExpenseReceipt(expense) {
      expense_receipt.value.image = expense.reciept;
      expense_receipt.value.link = "/storage/images/receipt/expense/" + expense.reciept;
      expense_receipt.value.status = expense.financial_id > 0 ? "Validated by " + expense.financial.name : "Unvalidated";
      expense_receipt.value.valid = expense.financial_id > 0;
      expense_receipt.value.id = expense.id;
    }
    function setLetter(letter, valid) {
      disbursement_letter.value.id = letter.id;
      disbursement_letter.value.letter = letter.letter;
      disbursement_letter.value.valid = valid;
      disbursement_letter.value.link = "/storage/document/letter/disbursement/" + letter.letter;
    }
    function setSelectedUser(user) {
      selected_user.value = user;
    }
    function setSelectedLogbookImage(image) {
      selectedLogbookImage.value = image;
    }
    function showLetterModal(is_show) {
      if (modalLetterRef.value == null) {
        const modal = document.getElementById("disbursementLetterModal");
        modalLetterRef.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      if (is_show) {
        modalLetterRef.value.show();
      } else {
        modalLetterRef.value.hide();
      }
    }
    function showAddDisbursementLetterModal(is_show) {
      if (modalAddDisbursementLetterRef.value == null) {
        const modal = document.getElementById("addProgramDisbursementLetter");
        modalAddDisbursementLetterRef.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      if (is_show) {
        modalAddDisbursementLetterRef.value.show();
      } else {
        modalAddDisbursementLetterRef.value.hide();
      }
    }
    function showAddDisbursementModal(is_show) {
      if (modalAddDisbursementRef.value == null) {
        const modal = document.getElementById("addProgramDisbursement");
        modalAddDisbursementRef.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      if (is_show) {
        modalAddDisbursementRef.value.show();
      } else {
        modalAddDisbursementRef.value.hide();
      }
    }
    function showAddExpenseModal(is_show) {
      if (modalAddExpenseRef.value == null) {
        const modal = document.getElementById("addProgramExpense");
        modalAddExpenseRef.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      if (is_show) {
        modalAddExpenseRef.value.show();
      } else {
        modalAddExpenseRef.value.hide();
      }
    }
    function showAddStaffModal(is_show) {
      if (modalAddStaffRef.value == null) {
        const modal = document.getElementById("addProgramStaff");
        modalAddStaffRef.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      if (is_show) {
        modalAddStaffRef.value.show();
      } else {
        modalAddStaffRef.value.hide();
      }
    }
    function showReceiptDisbursementModal(is_show) {
      if (modalReceiptDisbursementRef.value == null) {
        const modal = document.getElementById("receiptDisbursementModal");
        modalReceiptDisbursementRef.value = bootstrap.Modal.getOrCreateInstance(modal);
      }
      if (is_show) {
        modalReceiptDisbursementRef.value.show();
      } else {
        modalReceiptDisbursementRef.value.hide();
      }
    }
    function scrollHorizontal(amount) {
      staffLogbookContainerRef.value.scrollBy({
        left: amount,
        behavior: "smooth"
      });
    }
    const isLargeScreen = ref(window.innerWidth >= 768);
    const handleResize = () => {
      isLargeScreen.value = window.innerWidth >= 768;
      window.addEventListener("resize", handleResize);
    };
    const showInternshipButton = computed(() => {
      var _a;
      console.log("=== DEBUG INTERNSHIP BUTTON ===");
      console.log("Program name:", (_a = props.program) == null ? void 0 : _a.name);
      console.log("Is Internship program:", props.is_internship_program);
      console.log("Can access internship:", props.can_access_internship);
      console.log("Auth user roles_id:", auth_user.roles_id);
      console.log("User access info:", props.user_access_info);
      const isInternshipProgram = props.is_internship_program;
      if (!isInternshipProgram) {
        console.log("Not an internship program, hiding button");
        return false;
      }
      const canAccess = props.can_access_internship;
      console.log("Final decision - Show button:", canAccess);
      return canAccess;
    });
    onMounted(() => {
      placeholder.value = "";
      if (props.default_logbook_id > 0) {
        if (props.default_logbook_id == auth_user.id) {
          setSelectedUser(auth_user);
        }
      }
      window.addEventListener("resize", handleResize);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    watch(
      () => props.notif,
      (newValue) => {
        const notification = newValue;
        toastNotifRef.value.showToast(notification.type, notification.message);
        if (notification.message == "Success delete Disbursement Letter.") {
          showLetterModal(false);
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", _ctx.route("structural"))} class="bg-opacity-0 text-decoration-none text-primary-emphasis" data-v-51d3f98b${_scopeId}><span class="fw-light" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Structural")}</span></a><span class="ms-2" data-v-51d3f98b${_scopeId}>${ssrInterpolate("/")}</span><a${ssrRenderAttr("href", _ctx.route("department", __props.program.department_id))} class="bg-opacity-0 text-decoration-none text-primary-emphasis ms-2" data-v-51d3f98b${_scopeId}><span class="fw-light" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Department")}</span></a><span class="ms-2" data-v-51d3f98b${_scopeId}>${ssrInterpolate("/")}</span> ${ssrInterpolate("Program")}`);
          } else {
            return [
              createVNode("a", {
                href: _ctx.route("structural"),
                class: "bg-opacity-0 text-decoration-none text-primary-emphasis"
              }, [
                createVNode("span", { class: "fw-light" }, toDisplayString("Structural"))
              ], 8, ["href"]),
              createVNode("span", { class: "ms-2" }, toDisplayString("/")),
              createVNode("a", {
                href: _ctx.route("department", __props.program.department_id),
                class: "bg-opacity-0 text-decoration-none text-primary-emphasis ms-2"
              }, [
                createVNode("span", { class: "fw-light" }, toDisplayString("Department"))
              ], 8, ["href"]),
              createVNode("span", { class: "ms-2" }, toDisplayString("/")),
              createTextVNode(" " + toDisplayString("Program"))
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: "Program",
              icon: "/storage/local/images/apps/logo.png"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              ref_key: "toastNotifRef",
              ref: toastNotifRef
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              ref_key: "modalConfirmationRef",
              ref: modalConfirmationRef
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(ModalAlertNotification, {
              ref_key: "modalAlertNotificationRef",
              ref: modalAlertNotificationRef
            }, null, _parent2, _scopeId));
            _push2(`<div class="container me-lg-0 mx-auto mb-5" data-v-51d3f98b${_scopeId}><div class="row mt-4" data-v-51d3f98b${_scopeId}><div class="col-12" data-v-51d3f98b${_scopeId}><div class="card shadow-sm p-3" data-v-51d3f98b${_scopeId}><div class="row" data-v-51d3f98b${_scopeId}><div class="col-12" data-v-51d3f98b${_scopeId}><div class="d-flex border-primary border-bottom pb-0" data-v-51d3f98b${_scopeId}><span class="h5 text-primary-emphasis" data-v-51d3f98b${_scopeId}>${ssrInterpolate(__props.program.name + " Program")}</span>`);
            if (showInternshipButton.value) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("internship.applications.index"),
                class: "btn btn-sm btn-outline-primary ms-auto me-2 d-flex align-items-center gap-2",
                style: { "text-decoration": "none" }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="bi bi-people-fill" data-v-51d3f98b${_scopeId2}></i><span class="d-none d-md-inline" data-v-51d3f98b${_scopeId2}>Data Pendaftar</span><span class="d-md-none" data-v-51d3f98b${_scopeId2}>Pendaftar</span>`);
                  } else {
                    return [
                      createVNode("i", { class: "bi bi-people-fill" }),
                      createVNode("span", { class: "d-none d-md-inline" }, "Data Pendaftar"),
                      createVNode("span", { class: "d-md-none" }, "Pendaftar")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(auth_user).id == __props.program.department.manager_id) {
              _push2(`<button class="text-decoration-none ms-auto mb-2 py-0 btn btn-sm btn-outline-secondary border-0" data-v-51d3f98b${_scopeId}><i class="bi bi-trash3" data-v-51d3f98b${_scopeId}></i></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="d-flex mt-2 d-lg-none" data-v-51d3f98b${_scopeId}><span class="text-secondary" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Detail")}</span></div><div class="row g-2 mt-0 mt-lg-2" data-v-51d3f98b${_scopeId}><div class="col-lg-1 d-none d-lg-block" data-v-51d3f98b${_scopeId}><div class="d-flex w-100 h-100" data-v-51d3f98b${_scopeId}><span class="text-secondary my-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Detail")}</span></div></div><div class="col-6 col-lg-3" data-v-51d3f98b${_scopeId}><div class="d-flex" data-v-51d3f98b${_scopeId}><i class="bi bi-person text-primary fs-5 my-auto me-2" data-v-51d3f98b${_scopeId}></i><div data-v-51d3f98b${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-51d3f98b${_scopeId}>${ssrInterpolate("In Charge")}</span><div class="scroll-x-hidden" data-v-51d3f98b${_scopeId}><span class="text-dark text-nowrap" data-v-51d3f98b${_scopeId}>${ssrInterpolate(__props.program.user.name)}</span></div></div></div></div><div class="col-6 col-lg-3" data-v-51d3f98b${_scopeId}><div class="d-flex" data-v-51d3f98b${_scopeId}><i class="bi bi-people text-primary fs-5 my-auto me-2" data-v-51d3f98b${_scopeId}></i><div data-v-51d3f98b${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Staff")}</span><div class="scroll-x-hidden" data-v-51d3f98b${_scopeId}><span class="text-dark text-nowrap" data-v-51d3f98b${_scopeId}>${ssrInterpolate(__props.staff_list.length + (__props.staff_list.length > 1 ? " persons" : " person"))}</span></div></div></div></div><div class="col-12 col-lg-3" data-v-51d3f98b${_scopeId}><div class="d-flex" data-v-51d3f98b${_scopeId}><i class="bi bi-calendar2 text-primary fs-5 my-auto me-2" data-v-51d3f98b${_scopeId}></i><div data-v-51d3f98b${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Progress")}</span><div class="scroll-x-hidden" data-v-51d3f98b${_scopeId}><span class="text-dark text-nowrap" data-v-51d3f98b${_scopeId}>${ssrInterpolate(__props.program.financial_id == 0 ? "Waiting for budget validation." : __props.program.disbursement == 0 ? "Waiting for disbursement." : "On progress")}</span></div></div></div></div></div><div class="d-flex mt-2 d-lg-none" data-v-51d3f98b${_scopeId}><span class="text-secondary" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Cashflow")}</span></div><div class="row g-2 mt-lg-2 mt-0" data-v-51d3f98b${_scopeId}><div class="col-lg-1 d-none d-lg-block" data-v-51d3f98b${_scopeId}><div class="d-flex w-100 h-100" data-v-51d3f98b${_scopeId}><span class="text-secondary my-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Cashflow")}</span></div></div><div class="col-6 col-lg-3" data-v-51d3f98b${_scopeId}><div class="d-flex" data-v-51d3f98b${_scopeId}><i class="bi bi-list-columns-reverse text-primary fs-5 my-auto me-2" data-v-51d3f98b${_scopeId}></i><div data-v-51d3f98b${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Budget")}</span><div class="scroll-x-hidden" data-v-51d3f98b${_scopeId}><span class="text-dark text-nowrap" data-v-51d3f98b${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.program.budget))}</span></div></div></div></div><div class="col-6 col-lg-3" data-v-51d3f98b${_scopeId}><div class="d-flex" data-v-51d3f98b${_scopeId}><i class="bi bi-box-arrow-in-down text-primary fs-5 my-auto me-2" data-v-51d3f98b${_scopeId}></i><div data-v-51d3f98b${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Disbursement")}</span><div class="scroll-x-hidden" data-v-51d3f98b${_scopeId}><span class="text-dark text-nowrap" data-v-51d3f98b${_scopeId}>${ssrInterpolate(unref(formatIDR)(
              __props.program.disbursement
            ))}</span></div></div></div></div><div class="col-6 col-lg-3" data-v-51d3f98b${_scopeId}><div class="d-flex" data-v-51d3f98b${_scopeId}><i class="bi bi-box-arrow-up text-primary fs-5 my-auto me-2" data-v-51d3f98b${_scopeId}></i><div data-v-51d3f98b${_scopeId}><span class="text-secondary d-block" style="${ssrRenderStyle({ "font-size": "0.8rem" })}" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Expense")}</span><div class="scroll-x-hidden" data-v-51d3f98b${_scopeId}><span class="text-dark text-nowrap" data-v-51d3f98b${_scopeId}>${ssrInterpolate(unref(formatIDR)(__props.program.expense))}</span></div></div></div></div></div></div></div></div><div class="row gx-4" data-v-51d3f98b${_scopeId}><div class="col-lg-6 col-12" data-v-51d3f98b${_scopeId}><div class="row mt-4" data-v-51d3f98b${_scopeId}><div class="col-12" data-v-51d3f98b${_scopeId}><div class="card p-2" data-v-51d3f98b${_scopeId}><div class="d-flex border-bottom mx-2 border-primary py-1" data-v-51d3f98b${_scopeId}><span class="h5 text-primary-emphasis my-1" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Logbook")}</span></div><div class="row gx-2 mt-2" data-v-51d3f98b${_scopeId}><div class="col-2 col-lg-2 d-flex" data-v-51d3f98b${_scopeId}><span class="text-primary-emphasis text-nowrap my-auto ms-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Staff ")} <span class="d-lg-inline d-none" data-v-51d3f98b${_scopeId}>${ssrInterpolate("List")}</span> ${ssrInterpolate(": ")}</span></div><div class="col-10 col-lg-10 d-flex" data-v-51d3f98b${_scopeId}><button class="btn btn-sm btn-outline-primary border-0 my-auto d-lg-block d-none px-0 me-1" data-v-51d3f98b${_scopeId}><i class="bi bi-caret-left-fill" data-v-51d3f98b${_scopeId}></i></button><div class="scroll-container-horizontal-lg scroll-container-horizontal bg-body-tertiary rounded px-2 me-2 me-lg-0" data-v-51d3f98b${_scopeId}><!--[-->`);
            ssrRenderList(__props.staff_list, (staff) => {
              _push2(`<button class="${ssrRenderClass(
                "btn btn-sm card shadow-sm my-1 me-2 card-bg-hover d-inline-block " + (staff.employee.id == selected_user.value.id ? "bg-secondary bg-opacity-25" : "")
              )}" data-v-51d3f98b${_scopeId}><span class="mx-1 text-nowrap" data-v-51d3f98b${_scopeId}>${ssrInterpolate(staff.employee.name)}</span></button>`);
            });
            _push2(`<!--]--></div><button class="btn btn-sm btn-outline-primary border-0 my-auto d-lg-block d-none px-0 ms-1 me-2" data-v-51d3f98b${_scopeId}><i class="bi bi-caret-right-fill" data-v-51d3f98b${_scopeId}></i></button></div></div><div class="row mt-2" data-v-51d3f98b${_scopeId}><div class="col-12" data-v-51d3f98b${_scopeId}><div class="d-flex border-bottom border-1 mx-2" data-v-51d3f98b${_scopeId}><span class="h6 text-primary-emphasis mx-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate(selected_user.value.name ?? "Select Staff")}</span>`);
            if (selected_user.value.id) {
              _push2(`<a${ssrRenderAttr(
                "href",
                _ctx.route(
                  "profile.edit",
                  selected_user.value.id
                )
              )} class="text-decoration-none me-2 d-flex" target="_blank" rel="noopener noreferrer" data-v-51d3f98b${_scopeId}><span class="text-primary mb-auto" style="${ssrRenderStyle("font-size:0.7rem;")}" data-v-51d3f98b${_scopeId}>${ssrInterpolate("visit profile")} <i class="bi bi-box-arrow-up-right" data-v-51d3f98b${_scopeId}></i></span></a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="row" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><div class="scroll-container-lg-2 scroll-container-2 mx-2" data-v-51d3f98b${_scopeId}><ul class="list-group list-group-flush" data-v-51d3f98b${_scopeId}><!--[-->`);
            ssrRenderList(active_logbook.value, (logbook) => {
              _push2(`<li class="list-group-item px-0" data-v-51d3f98b${_scopeId}><div class="d-flex w-100" data-v-51d3f98b${_scopeId}><div class="card d-flex me-2" style="${ssrRenderStyle("width: 25%; height: auto;")}" data-v-51d3f98b${_scopeId}><img${ssrRenderAttr(
                "src",
                "/storage/images/log/" + __props.program.id + "/" + logbook.image
              )} alt="image" class="rounded border border-1 border-secondary-subtle" data-bs-target="#modalLogbookImage" data-bs-toggle="modal" data-v-51d3f98b${_scopeId}><div class="modal fade" id="modalLogbookImage" tabindex="-1" data-v-51d3f98b${_scopeId}><div class="modal-dialog modal-dialog-centered px-3 px-lg-0" data-v-51d3f98b${_scopeId}><div class="modal-content shadow mt-5" data-v-51d3f98b${_scopeId}><div class="modal-header py-1 ps-3 pe-2" data-v-51d3f98b${_scopeId}><span class="modal-title fs-5 text-primary-emphasis" data-v-51d3f98b${_scopeId}><i class="bi bi-key border-secondary-subtle border-2 border-end pe-2" data-v-51d3f98b${_scopeId}></i> ${ssrInterpolate("Logbook Image")}</span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal" data-v-51d3f98b${_scopeId}><i class="bi bi-x-lg" data-v-51d3f98b${_scopeId}></i></button></div><div class="modal-body bg-light" data-v-51d3f98b${_scopeId}><div class="d-flex w-100" data-v-51d3f98b${_scopeId}><img${ssrRenderAttr(
                "src",
                "/storage/images/log/" + __props.program.id + "/" + selectedLogbookImage.value
              )} alt="image" class="img-fluid object-fit-cover" data-v-51d3f98b${_scopeId}></div></div><div class="modal-footer p-1" data-v-51d3f98b${_scopeId}><a${ssrRenderAttr(
                "href",
                "/storage/images/log/" + __props.program.id + "/" + selectedLogbookImage.value
              )} download class="btn btn-sm text-center text-decoration-none text-secondary w-100" data-v-51d3f98b${_scopeId}>${ssrInterpolate(selectedLogbookImage.value)} <i class="bi bi-download text-primary" data-v-51d3f98b${_scopeId}></i></a></div></div></div></div></div><div class="w-100" data-v-51d3f98b${_scopeId}><div class="d-flex w-100" data-v-51d3f98b${_scopeId}><span class="fw-light me-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate(unref(formatDate)(
                logbook.created_at
              ))}</span>`);
              if (unref(auth_user).id == __props.program.pic_id) {
                _push2(`<button class="${ssrRenderClass(
                  "btn btn-sm border-0 py-0 btn-outline-" + (logbook.validated > 0 ? "success" : "secondary")
                )}" data-v-51d3f98b${_scopeId}>${ssrInterpolate(logbook.validated > 0 ? "validated" : "unvalidated")}</button>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).id !== __props.program.pic_id) {
                _push2(`<span class="${ssrRenderClass(
                  "text-" + (logbook.validated > 0 ? "success" : "secondary")
                )}" data-v-51d3f98b${_scopeId}>${ssrInterpolate(logbook.validated > 0 ? "valid" : "unvalid")}</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).id == selected_user.value.id && logbook.validated == 0) {
                _push2(`<div class="my-1 border-start border-1 mx-1" data-v-51d3f98b${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).id == selected_user.value.id && logbook.validated == 0) {
                _push2(`<button class="btn btn-sm btn-outline-secondary border-0 py-0" data-v-51d3f98b${_scopeId}><i class="bi bi-trash3" data-v-51d3f98b${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><span data-v-51d3f98b${_scopeId}>${ssrInterpolate(logbook.title)}</span></div></div></li>`);
            });
            _push2(`<!--]-->`);
            if (active_logbook.value.length == 0) {
              _push2(`<li class="list-group-item px-0" data-v-51d3f98b${_scopeId}><div class="d-flex" data-v-51d3f98b${_scopeId}><div class="card d-flex me-2" style="${ssrRenderStyle("width: 25%; height: auto;")}" data-v-51d3f98b${_scopeId}><img${ssrRenderAttr("src", "/storage/images/apps/logo.png")} alt="image" class="rounded border border-1 border-secondary-subtle" data-v-51d3f98b${_scopeId}></div><div class="w-100" data-v-51d3f98b${_scopeId}><div class="d-flex" data-v-51d3f98b${_scopeId}><div class="fw-light card me-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate(selected_user.value == 0 ? "Logbook date" : "-")}</div><div class="text-secondary d-block ms-auto me-2" data-v-51d3f98b${_scopeId}>${ssrInterpolate(selected_user.value == 0 ? "Logbook status" : "")}</div></div><div data-v-51d3f98b${_scopeId}>${ssrInterpolate(selected_user.value == 0 ? "Logbook detail" : selected_user.value.name + " have not create any logbook.")}</div></div></div></li>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</ul></div></div></div></div></div></div></div><div class="col-lg-6 col-12" data-v-51d3f98b${_scopeId}><div class="row mt-4 mb-4" data-v-51d3f98b${_scopeId}><div class="col-12" data-v-51d3f98b${_scopeId}><div class="d-flex bg-white rounded" data-v-51d3f98b${_scopeId}><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary rounded w-25 border-3 border-light py-1 " + (active_tab.value == 1 ? "active" : "")
            )}" data-v-51d3f98b${_scopeId}><i class="${ssrRenderClass(
              "bi bi-list-columns-reverse d-lg-none " + (active_tab.value == 1 ? "d-none" : "")
            )}" data-v-51d3f98b${_scopeId}></i><span style="${ssrRenderStyle(
              isLargeScreen.value ? "font-size:1rem;" : "font-size:0.7rem;"
            )}" class="${ssrRenderClass(
              "d-lg-inline " + (active_tab.value == 1 ? "" : "d-none")
            )}" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Budget")}</span></button><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary rounded w-25 border-3 border-light py-1 " + (active_tab.value == 2 ? "active" : "")
            )}" data-v-51d3f98b${_scopeId}><i class="${ssrRenderClass(
              "bi bi-box-arrow-in-down d-lg-none " + (active_tab.value == 2 ? "d-none" : "")
            )}" data-v-51d3f98b${_scopeId}></i><span style="${ssrRenderStyle(
              isLargeScreen.value ? "font-size:1rem;" : "font-size:0.7rem;"
            )}" class="${ssrRenderClass(
              "d-lg-inline " + (active_tab.value == 2 ? "" : "d-none")
            )}" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Disbursement")}</span></button><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary rounded w-25 border-3 border-light py-1 " + (active_tab.value == 3 ? "active" : "")
            )}" data-v-51d3f98b${_scopeId}><i class="${ssrRenderClass(
              "bi bi-box-arrow-up d-lg-none " + (active_tab.value == 3 ? "d-none" : "")
            )}" data-v-51d3f98b${_scopeId}></i><span style="${ssrRenderStyle(
              isLargeScreen.value ? "font-size:1rem;" : "font-size:0.7rem;"
            )}" class="${ssrRenderClass(
              "d-lg-inline " + (active_tab.value == 3 ? "" : "d-none")
            )}" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Expense")}</span></button><button class="${ssrRenderClass(
              "btn btn-sm btn-outline-primary rounded w-25 border-3 border-light py-1 " + (active_tab.value == 4 ? "active" : "")
            )}" data-v-51d3f98b${_scopeId}><i class="${ssrRenderClass(
              "bi bi-people d-lg-none " + (active_tab.value == 4 ? "d-none" : "")
            )}" data-v-51d3f98b${_scopeId}></i><span style="${ssrRenderStyle(
              isLargeScreen.value ? "font-size:1rem;" : "font-size:0.7rem;"
            )}" class="${ssrRenderClass(
              "d-lg-inline " + (active_tab.value == 4 ? "" : "d-none")
            )}" id="tab_span_4" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Staff")}</span></button></div></div></div>`);
            if (active_tab.value == 1) {
              _push2(`<div id="content_1" data-v-51d3f98b${_scopeId}><div class="row justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-12" data-v-51d3f98b${_scopeId}><nav class="navbar rounded bg-white shadow-sm p-2" data-v-51d3f98b${_scopeId}><form method="post" id="formBudgetFilter" data-v-51d3f98b${_scopeId}></form><div class="container d-block px-0" data-v-51d3f98b${_scopeId}><div class="row" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><div class="input-group bg-body-tertiary rounded" data-v-51d3f98b${_scopeId}><button type="button" form="formBudgetFilter" class="btn btn-sm rounded-0 rounded-start text-light bg-secondary" data-v-51d3f98b${_scopeId}><i class="bi bi-funnel-fill" data-v-51d3f98b${_scopeId}></i><span class="ms-1 ps-2 border-start border-light d-none d-md-inline" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Filter")}</span></button><button type="submit" form="formBudgetFilter" class="btn btn-sm btn-outline-secondary border-0 rounded-0 my-0" data-v-51d3f98b${_scopeId}><span class="me-1" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Name")}</span><i class="${ssrRenderClass(
                "bi bi-sort-numeric-" + (__props.filter["budget"]["category"] == "name" && __props.filter["budget"]["order"] == "asc" ? "up" : "down") + "-alt"
              )}" data-v-51d3f98b${_scopeId}></i></button><button type="submit" form="formBudgetFilter" class="btn btn-sm btn-outline-secondary border-0 rounded-0 my-0" data-v-51d3f98b${_scopeId}><span class="me-1" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Price")}</span><i class="${ssrRenderClass(
                "bi bi-sort-numeric-" + (__props.filter["budget"]["category"] == "price" && __props.filter["budget"]["order"] == "asc" ? "up" : "down") + "-alt"
              )}" data-v-51d3f98b${_scopeId}></i></button></div>`);
              if (unref(auth_user).id == __props.program.pic_id) {
                _push2(`<div data-v-51d3f98b${_scopeId}><button class="${ssrRenderClass(
                  "ms-2 btn btn-sm btn-outline-primary border-0 " + (__props.program.financial_id <= 0 ? "" : "disabled")
                )}" data-bs-toggle="modal" data-bs-target="#addProgramBudget" data-v-51d3f98b${_scopeId}><i class="bi bi-plus-lg" data-v-51d3f98b${_scopeId}></i></button></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).id == __props.program.pic_id && __props.program.financial_id <= 0) {
                _push2(`<div class="modal fade" id="addProgramBudget" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-v-51d3f98b${_scopeId}><div class="modal-dialog modal-dialog-centered" data-v-51d3f98b${_scopeId}><div class="modal-content shadow mx-3" data-v-51d3f98b${_scopeId}><div class="modal-header py-1 ps-3 pe-2" data-v-51d3f98b${_scopeId}><span class="modal-title fs-5 text-primary-emphasis" id="exampleModalLabel" data-v-51d3f98b${_scopeId}><i class="bi bi-journal-plus border-secondary border-end me-2 pe-2" data-v-51d3f98b${_scopeId}></i> ${ssrInterpolate("New Budget Item")}</span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal" aria-label="Close" data-v-51d3f98b${_scopeId}><i class="bi bi-x-lg" data-v-51d3f98b${_scopeId}></i></button></div><form method="post" data-v-51d3f98b${_scopeId}><div class="modal-body bg-light" data-v-51d3f98b${_scopeId}><div class="row justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3" data-v-51d3f98b${_scopeId}><label for="add_budget_name" class="form-label d-inline-block" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Name")}</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><input type="text" class="form-control form-control-sm d-inline-block"${ssrRenderAttr(
                  "value",
                  unref(formAddBudget).name
                )} id="add_budget_name" required data-v-51d3f98b${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$4, {
                  message: unref(formAddBudget).errors.item_name
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="row mt-2 justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3" data-v-51d3f98b${_scopeId}><label for="add_budget_price" class="form-label d-inline-block" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Price")}</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><input type="number" class="form-control form-control-sm d-inline-block" id="add_budget_price"${ssrRenderAttr(
                  "value",
                  unref(formAddBudget).price
                )} placeholder="Type numbers only" required data-v-51d3f98b${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$4, {
                  message: unref(formAddBudget).errors.price
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="row mt-2 justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3" data-v-51d3f98b${_scopeId}><label for="add_budget_unit" class="form-label d-inline-block" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Unit")}</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><input type="text" class="form-control form-control-sm d-inline-block" placeholder="gram, ml, pcs, etc.." id="add_budget_unit"${ssrRenderAttr(
                  "value",
                  unref(formAddBudget).unit
                )} required data-v-51d3f98b${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$4, {
                  message: unref(formAddBudget).errors.unit
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="row mt-2 justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3" data-v-51d3f98b${_scopeId}><label for="add_budget_qty" class="form-label d-inline-block" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Quantity")}</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><input type="number" class="form-control form-control-sm d-inline-block" id="add_budget_qty"${ssrRenderAttr(
                  "value",
                  unref(formAddBudget).qty
                )} placeholder="Type numbers only" required data-v-51d3f98b${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$4, {
                  message: unref(formAddBudget).errors.qty
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="row mt-2 justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3" data-v-51d3f98b${_scopeId}><span data-v-51d3f98b${_scopeId}>${ssrInterpolate("Total Price")}</span></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><span id="add_budget_total" data-v-51d3f98b${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                  unref(formAddBudget).price * unref(formAddBudget).qty
                ))}</span></div></div></div><div class="modal-footer p-1" data-v-51d3f98b${_scopeId}><button type="submit" class="btn btn-sm btn-primary" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Add")}</button></div></form></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).roles_id == 2) {
                _push2(`<button class="${ssrRenderClass(
                  "position-relative ms-2 border-0 btn btn-sm btn-outline-" + (__props.program.financial_id > 0 ? "success" : "secondary")
                )}" data-v-51d3f98b${_scopeId}><i class="${ssrRenderClass(
                  "bi bi-" + (__props.program.financial_id > 0 ? "lock-fill" : "unlock")
                )}" data-v-51d3f98b${_scopeId}></i>`);
                if (__props.program.financial_id <= 0) {
                  _push2(`<i style="${ssrRenderStyle("font-size:0.5rem;")}" class="bi bi-circle-fill position-absolute top-0 end-0 text-danger" data-v-51d3f98b${_scopeId}></i>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></nav></div></div><div class="row" data-v-51d3f98b${_scopeId}><div class="col-12" data-v-51d3f98b${_scopeId}><div class="scroll-container-3 scroll-container-lg-2 bg-secondary bg-opacity-25 px-2 pt-2 rounded mt-2" data-v-51d3f98b${_scopeId}><!--[-->`);
              ssrRenderList(__props.budget_list, (budget) => {
                _push2(`<div class="card card-bg-hover shadow mb-2 py-1" data-v-51d3f98b${_scopeId}><div class="row" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><span class="text-primary-emphasis ms-2 my-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate(budget.name)}</span><span class="fw-light ms-2 d-none d-lg-flex my-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate("- " + unref(formatIDR)(
                  budget.price
                ) + " /" + budget.unit)}</span><span class="fw-light ms-auto d-none d-lg-flex my-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate("total (" + budget.qty + ") : ")}</span><span class="fw-normal mx-2 d-none d-lg-flex my-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                  budget.total_price
                ))}</span>`);
                if (unref(auth_user).id == __props.program.pic_id && __props.program.financial_id <= 0) {
                  _push2(`<button class="ms-auto ms-lg-1 me-2 btn btn-sm btn-danger" data-v-51d3f98b${_scopeId}><i class="bi bi-trash" data-v-51d3f98b${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><div class="row d-lg-none" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><span class="fw-light ms-2" data-v-51d3f98b${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                  budget.price
                ) + " /" + budget.unit)}</span><span class="fw-light ms-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate("total (" + budget.qty + ") : ")}</span><span class="fw-normal mx-2" data-v-51d3f98b${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                  budget.total_price
                ))}</span></div></div></div>`);
              });
              _push2(`<!--]--></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value == 2) {
              _push2(`<div id="content_2" data-v-51d3f98b${_scopeId}><div class="row justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-12" data-v-51d3f98b${_scopeId}><nav class="navbar rounded bg-white shadow-sm p-2" data-v-51d3f98b${_scopeId}><form method="post" id="formDisbursementFilter" data-v-51d3f98b${_scopeId}></form><div class="container d-block px-0" data-v-51d3f98b${_scopeId}><div class="row" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><div class="input-group bg-body-tertiary rounded" data-v-51d3f98b${_scopeId}><button type="button" class="btn btn-sm rounded-0 rounded-start text-light bg-secondary" data-v-51d3f98b${_scopeId}><i class="bi bi-funnel-fill" data-v-51d3f98b${_scopeId}></i><span class="ms-1 ps-2 border-start border-light d-none d-md-inline" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Filter")}</span></button><button type="submit" form="formDisbursementFilter" class="btn btn-sm btn-outline-secondary border-0 rounded-0 my-0" data-v-51d3f98b${_scopeId}><span class="me-1" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Price")}</span><i class="${ssrRenderClass(
                "bi bi-sort-numeric-" + (__props.filter["disbursement"]["category"] == "price" && __props.filter["disbursement"]["order"] == "asc" ? "up" : "down") + "-alt"
              )}" data-v-51d3f98b${_scopeId}></i></button><button type="submit" form="formDisbursementFilter" class="${ssrRenderClass(
                "btn btn-sm btn-outline-secondary " + (__props.filter["disbursement"]["trashed"] == "trashed" ? "active" : "") + " border-0 rounded-0 my-0"
              )}" data-v-51d3f98b${_scopeId}><span class="me-1" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Trashed")}</span><i class="bi bi-trash3" data-v-51d3f98b${_scopeId}></i></button></div>`);
              if (unref(auth_user).roles_id == 2) {
                _push2(`<div data-v-51d3f98b${_scopeId}><button class="${ssrRenderClass(
                  "ms-2 btn btn-sm btn-outline-primary border-0 " + (__props.program.financial_id > 0 ? "" : " disabled")
                )}" data-v-51d3f98b${_scopeId}><i class="bi bi-plus-lg" data-v-51d3f98b${_scopeId}></i></button></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.program.financial_id > 0) {
                _push2(`<div class="modal fade" id="addProgramDisbursement" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-v-51d3f98b${_scopeId}><div class="modal-dialog modal-dialog-centered" data-v-51d3f98b${_scopeId}><div class="modal-content shadow mx-3" data-v-51d3f98b${_scopeId}><div class="modal-header py-1 ps-3 pe-2" data-v-51d3f98b${_scopeId}><span class="modal-title fs-5 text-primary-emphasis" data-v-51d3f98b${_scopeId}><i class="bi bi-wallet2 border-secondary border-end me-2 pe-2" data-v-51d3f98b${_scopeId}></i> ${ssrInterpolate("New Disbursement Item")}</span><button type="button" class="btn btn-sm ms-auto" data-v-51d3f98b${_scopeId}><i class="bi bi-x-lg" data-v-51d3f98b${_scopeId}></i></button></div><form method="post" enctype="multipart/form-data" data-v-51d3f98b${_scopeId}><div class="modal-body bg-light" data-v-51d3f98b${_scopeId}><div class="row justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3" data-v-51d3f98b${_scopeId}><label for="add_disbursement_name" class="form-label d-inline-block" data-v-51d3f98b${_scopeId}>Name</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><input type="text" class="form-control form-control-sm d-inline-block" id="add_disbursement_name"${ssrRenderAttr(
                  "value",
                  unref(formAddDisbursement).name
                )} required data-v-51d3f98b${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$4, {
                  message: unref(formAddDisbursement).errors.name
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="row mt-2 justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3" data-v-51d3f98b${_scopeId}><label for="add_disbursement_price" class="form-label d-inline-block" data-v-51d3f98b${_scopeId}>Price</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><input type="number" class="form-control form-control-sm d-inline-block" name="price"${ssrRenderAttr(
                  "value",
                  unref(formAddDisbursement).price
                )} placeholder="Type numbers only" required data-v-51d3f98b${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$4, {
                  message: unref(formAddDisbursement).errors.price
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="row mt-2 justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3" data-v-51d3f98b${_scopeId}><label for="add_disbursement_letter" class="form-label d-inline-block" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Letter")}</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><select class="form-select py-0 d-inline" id="add_disbursement_letter" data-v-51d3f98b${_scopeId}><!--[-->`);
                ssrRenderList(__props.disbursement_letter_list.filter(
                  (item) => !item.disbursement
                ), (disbursement_letter2, index) => {
                  _push2(`<option${ssrRenderAttr(
                    "value",
                    disbursement_letter2.id
                  )}${ssrIncludeBooleanAttr(
                    index == 1
                  ) ? " selected" : ""} data-v-51d3f98b${ssrIncludeBooleanAttr(Array.isArray(
                    unref(formAddDisbursement).letter_id
                  ) ? ssrLooseContain(
                    unref(formAddDisbursement).letter_id,
                    disbursement_letter2.id
                  ) : ssrLooseEqual(
                    unref(formAddDisbursement).letter_id,
                    disbursement_letter2.id
                  )) ? " selected" : ""}${_scopeId}>${ssrInterpolate("disbursement_letter... " + (index + 1))}</option>`);
                });
                _push2(`<!--]--></select></div></div><div class="row mt-2 justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3" data-v-51d3f98b${_scopeId}><label for="add_disbursement_receipt" class="form-label d-inline-block" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Receipt")}</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><input type="file" class="form-control form-control-sm" id="add_disbursement_receipt" data-v-51d3f98b${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$4, {
                  message: unref(formAddDisbursement).errors.receipt
                }, null, _parent2, _scopeId));
                _push2(`<label for="blaterian_balance" class="inline-flex items-center mt-1" data-v-51d3f98b${_scopeId}><input id="blaterian_balance" type="checkbox" name="blaterian_balance"${ssrIncludeBooleanAttr(
                  Array.isArray(
                    unref(formAddDisbursement).blaterian_balance
                  ) ? ssrLooseContain(
                    unref(formAddDisbursement).blaterian_balance,
                    null
                  ) : unref(formAddDisbursement).blaterian_balance
                ) ? " checked" : ""} class="rounded" data-v-51d3f98b${_scopeId}><span class="ms-2 text-sm" data-v-51d3f98b${_scopeId}>${ssrInterpolate("For Blaterian Balance")}</span></label></div></div>`);
                if (unref(formAddDisbursement).blaterian_balance) {
                  _push2(`<div class="row mt-2 justify-content-center" id="add_blaterian_disbursement_container" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3" data-v-51d3f98b${_scopeId}><label for="add_disbursement_price" class="form-label d-inline-block" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Blaterian")}</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><div class="input-group input-group-sm" data-v-51d3f98b${_scopeId}><select class="form-select py-0 d-inline" id="add_blaterian_disbursement" data-v-51d3f98b${_scopeId}><option value="foods" selected data-v-51d3f98b${_scopeId}>${ssrInterpolate("Food")}</option><option value="goods" data-v-51d3f98b${ssrIncludeBooleanAttr(Array.isArray(
                    unref(formAddDisbursement).blaterian_disbursement
                  ) ? ssrLooseContain(
                    unref(formAddDisbursement).blaterian_disbursement,
                    "goods"
                  ) : ssrLooseEqual(
                    unref(formAddDisbursement).blaterian_disbursement,
                    "goods"
                  )) ? " selected" : ""}${_scopeId}>${ssrInterpolate("Good")}</option></select><label for="add_blaterian_disbursement" class="input-group-text" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Balance")}</label></div></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="modal-footer p-1" data-v-51d3f98b${_scopeId}><button type="submit" class="btn btn-sm btn-primary" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Add")}</button></div></form></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="row mt-2" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><span class="fw-light d-none d-lg-inline me-1 my-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Disbursement ")}</span><span class="fw-light my-auto me-1" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Letter :")}</span><!--[-->`);
              ssrRenderList(__props.disbursement_letter_list.filter(
                (disbursement_letter2) => !disbursement_letter2.disbursement
              ), (disbursement_letter2, disbursement_letter_index) => {
                _push2(`<button class="me-1 btn btn-sm btn-outline-primary border-0 py-0 position-relative" data-bs-toggle="modal" data-bs-target="#disbursementLetterModal" data-v-51d3f98b${_scopeId}>${ssrInterpolate(disbursement_letter_index + 1)} <i class="bi bi-envelope-exclamation" data-v-51d3f98b${_scopeId}></i></button>`);
              });
              _push2(`<!--]--><div class="modal fade" id="disbursementLetterModal" tabindex="-1" aria-labelledby="disbursementLetterModal" aria-hidden="true" data-v-51d3f98b${_scopeId}><div class="modal-dialog modal-lg modal-dialog-centered" data-v-51d3f98b${_scopeId}><div class="modal-content shadow mx-3 mt-5" data-v-51d3f98b${_scopeId}><div class="modal-header py-1 ps-3 pe-2" data-v-51d3f98b${_scopeId}><span class="modal-title fs-5 text-primary-emphasis" data-v-51d3f98b${_scopeId}><i class="bi bi-envelope border-secondary border-end me-2 pe-2" data-v-51d3f98b${_scopeId}></i> ${ssrInterpolate("Disbursement Letter")}</span><button type="button" class="btn btn-sm ms-auto" data-v-51d3f98b${_scopeId}><i class="bi bi-x-lg" data-v-51d3f98b${_scopeId}></i></button></div><div class="modal-body bg-light p-1 px-3" data-v-51d3f98b${_scopeId}><div class="row justify-content-center mt-2" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex ratio ratio-16x9" data-v-51d3f98b${_scopeId}><iframe id="disbursement_letter"${ssrRenderAttr(
                "src",
                disbursement_letter.value.link
              )} frameborder="0" data-v-51d3f98b${_scopeId}></iframe></div></div><div class="row justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><a${ssrRenderAttr(
                "href",
                disbursement_letter.value.link
              )} target="blank" class="mx-auto text-decoration-none" id="disbursement_letter_download" download data-v-51d3f98b${_scopeId}><button class="btn btn-sm btn-light" data-v-51d3f98b${_scopeId}><span class="fw-light d-none d-lg-inline" id="disbursement_letter_name" data-v-51d3f98b${_scopeId}></span><span class="fw-light" data-v-51d3f98b${_scopeId}>${ssrInterpolate(disbursement_letter.value.letter)}</span><i class="bi bi-download text-primary ms-2" data-v-51d3f98b${_scopeId}></i></button></a></div></div></div><div class="modal-footer p-1 px-2" data-v-51d3f98b${_scopeId}><div class="row" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex px-0" data-v-51d3f98b${_scopeId}><div class="input-group input-group-sm ms-auto" data-v-51d3f98b${_scopeId}>`);
              if (unref(auth_user).id == __props.program.pic_id && !disbursement_letter.value.valid) {
                _push2(`<button id="disbursement_letter_delete" class="btn btn-sm btn-danger text-decoration-none" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Delete")}</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button data-bs-dismiss="modal" aria-label="Close" class="btn btn-sm btn-secondary" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Close")}</button></div></div></div></div></div></div></div>`);
              if (unref(auth_user).id == __props.program.pic_id) {
                _push2(`<div class="ms-auto" data-v-51d3f98b${_scopeId}><button class="${ssrRenderClass(
                  "btn btn-sm btn-outline-primary border-0 " + (__props.program.financial_id > 0 ? "" : " disabled")
                )}" data-v-51d3f98b${_scopeId}><i class="bi bi-envelope-plus" data-v-51d3f98b${_scopeId}></i></button></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).id == __props.program.pic_id && __props.program.financial_id > 0) {
                _push2(`<div class="modal fade" id="addProgramDisbursementLetter" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-v-51d3f98b${_scopeId}><div class="modal-dialog modal-dialog-centered" data-v-51d3f98b${_scopeId}><div class="modal-content shadow mx-3" data-v-51d3f98b${_scopeId}><div class="modal-header py-1 ps-3 pe-2" data-v-51d3f98b${_scopeId}><span class="modal-title fs-5 text-primary-emphasis" id="exampleModalLabel" data-v-51d3f98b${_scopeId}><i class="bi bi-wallet2 border-secondary border-end me-2 pe-2" data-v-51d3f98b${_scopeId}></i> ${ssrInterpolate("New Disbursement Letter")}</span><button type="button" class="btn btn-sm ms-auto" data-v-51d3f98b${_scopeId}><i class="bi bi-x-lg" data-v-51d3f98b${_scopeId}></i></button></div><form method="post" enctype="multipart/form-data" data-v-51d3f98b${_scopeId}><div class="modal-body bg-light" data-v-51d3f98b${_scopeId}><div class="row justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3" data-v-51d3f98b${_scopeId}><label for="add_disbursement_letter" class="form-label d-inline-block" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Letter")}</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><input type="file" class="form-control form-control-sm" id="add_disbursement_letter" data-v-51d3f98b${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$4, {
                  message: unref(formAddDisbursementLetter).errors.letter
                }, null, _parent2, _scopeId));
                _push2(`</div></div></div><div class="modal-footer p-1" data-v-51d3f98b${_scopeId}><button type="submit" class="btn btn-sm btn-primary" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Add")}</button></div></form></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></nav></div></div><div class="row" data-v-51d3f98b${_scopeId}><div class="col-12" data-v-51d3f98b${_scopeId}><div class="scroll-container-3 scroll-container-lg-2 bg-secondary bg-opacity-25 px-2 pt-2 rounded mt-2" data-v-51d3f98b${_scopeId}><!--[-->`);
              ssrRenderList(__props.disbursement_list, (disbursement) => {
                _push2(`<div class="card card-bg-hover shadow mb-2 py-1" data-v-51d3f98b${_scopeId}><div class="row" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><span class="text-primary-emphasis ms-2 my-auto scroll-x-hidden text-nowrap me-2" data-v-51d3f98b${_scopeId}>${ssrInterpolate(disbursement.name)}</span><span class="fw-light ms-2 d-none d-lg-flex my-auto scroll-x-hidden text-nowrap me-3" data-v-51d3f98b${_scopeId}>${ssrInterpolate("by " + disbursement.financial.name)}</span><span class="fw-light ms-auto d-none d-lg-flex my-auto text-nowrap" data-v-51d3f98b${_scopeId}>${ssrInterpolate("price : ")}</span><span class="fw-normal mx-2 d-none d-lg-flex my-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                  disbursement.price
                ))}</span>`);
                if (disbursement.deleted_at == null) {
                  _push2(`<button class="ms-auto ms-lg-1 btn btn-sm btn-outline-secondary border-0 position-relative" data-v-51d3f98b${_scopeId}><i class="bi bi-envelope-paper" data-v-51d3f98b${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="border-start border-1 h-100 mx-1" data-v-51d3f98b${_scopeId}></div><button class="${ssrRenderClass(" btn btn-sm btn-outline-secondary border-0 me-1 ")}" data-v-51d3f98b${_scopeId}><i class="bi bi-receipt" data-v-51d3f98b${_scopeId}></i></button>`);
                if (unref(auth_user).roles_id == 2 && __props.filter["disbursement"]["trashed"] !== "trashed") {
                  _push2(`<div class="border-start border-1 h-100 me-1" data-v-51d3f98b${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (unref(auth_user).roles_id == 2 && __props.filter["disbursement"]["trashed"] !== "trashed") {
                  _push2(`<button class="me-2 btn btn-sm btn-outline-danger border-0" data-v-51d3f98b${_scopeId}><i class="bi bi-trash" data-v-51d3f98b${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><div class="row d-lg-none" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><span class="fw-light ms-2" data-v-51d3f98b${_scopeId}>${ssrInterpolate("by " + disbursement.financial.name)}</span><span class="fw-light ms-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate("price : ")}</span><span class="fw-normal mx-2" data-v-51d3f98b${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                  disbursement.price
                ))}</span></div></div></div>`);
              });
              _push2(`<!--]--></div></div><div class="modal fade" id="receiptDisbursementModal" tabindex="-1" aria-labelledby="receiptDisbursementModal" aria-hidden="true" data-v-51d3f98b${_scopeId}><div class="modal-dialog modal-dialog-centered" data-v-51d3f98b${_scopeId}><div class="modal-content shadow mx-3 mt-5" data-v-51d3f98b${_scopeId}><div class="modal-header py-1 ps-3 pe-2" data-v-51d3f98b${_scopeId}><span class="modal-title fs-5 text-primary-emphasis" data-v-51d3f98b${_scopeId}><i class="bi bi-receipt border-secondary border-end me-2 pe-2" data-v-51d3f98b${_scopeId}></i> ${ssrInterpolate("Disbursement Receipt")}</span><button type="button" class="btn btn-sm ms-auto" data-v-51d3f98b${_scopeId}><i class="bi bi-x-lg" data-v-51d3f98b${_scopeId}></i></button></div><div class="modal-body bg-light p-1 px-3" data-v-51d3f98b${_scopeId}><div class="row justify-content-center mt-2" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><img${ssrRenderAttr(
                "src",
                disbursement_receipt.value.link
              )} alt="image" class="${ssrRenderClass(
                "rounded mx-auto " + placeholder.value
              )}" style="${ssrRenderStyle({
                width: "100%",
                height: "100%",
                objectFit: "contain",
                maxHeight: "320px"
              })}" id="disbursement_receipt_image" data-v-51d3f98b${_scopeId}></div></div><div class="row justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><a${ssrRenderAttr(
                "href",
                disbursement_receipt.value.link
              )} target="blank" class="mx-auto text-decoration-none" id="disbursement_receipt_download" download data-v-51d3f98b${_scopeId}><button class="btn btn-sm btn-light" data-v-51d3f98b${_scopeId}><span class="fw-light" data-v-51d3f98b${_scopeId}>${ssrInterpolate(disbursement_receipt.value.image)}</span><i class="bi bi-download text-primary ms-2" data-v-51d3f98b${_scopeId}></i></button></a></div></div></div><div class="modal-footer p-1 px-2" data-v-51d3f98b${_scopeId}><button data-bs-dismiss="modal" aria-label="Close" class="btn btn-sm btn-secondary" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Close")}</button></div></div></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value == 3) {
              _push2(`<div id="content_3" data-v-51d3f98b${_scopeId}><div class="row justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-12" data-v-51d3f98b${_scopeId}><nav class="navbar rounded bg-white shadow-sm p-2" data-v-51d3f98b${_scopeId}><form method="post" id="formExpenseFilter" data-v-51d3f98b${_scopeId}></form><div class="container d-block px-0" data-v-51d3f98b${_scopeId}><div class="row" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><div class="input-group input-group-sm bg-body-tertiary rounded" data-v-51d3f98b${_scopeId}><button type="button" class="btn btn-sm rounded-0 rounded-start text-light bg-secondary" data-v-51d3f98b${_scopeId}><i class="bi bi-funnel-fill" data-v-51d3f98b${_scopeId}></i><span class="ms-1 ps-2 border-start border-light d-none d-md-inline" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Filter")}</span></button><button type="submit" form="formExpenseFilter" class="btn btn-sm btn-outline-secondary border-0 rounded-0 my-0" data-v-51d3f98b${_scopeId}><span class="me-1" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Name")}</span><i class="${ssrRenderClass(
                "bi bi-sort-numeric-" + (__props.filter["expense"]["category"] == "name" && __props.filter["expense"]["order"] == "asc" ? "up" : "down") + "-alt"
              )}" data-v-51d3f98b${_scopeId}></i></button><button type="submit" form="formExpenseFilter" class="btn btn-sm btn-outline-secondary border-0 rounded-0 my-0" data-v-51d3f98b${_scopeId}><span class="me-1" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Price")}</span><i class="${ssrRenderClass(
                "bi bi-sort-numeric-" + (__props.filter["expense"]["category"] == "total_price" && __props.filter["expense"]["order"] == "asc" ? "up" : "down") + "-alt"
              )}" data-v-51d3f98b${_scopeId}></i></button><button type="submit" form="formExpenseFilter" class="btn btn-sm btn-outline-secondary border-0 rounded-0 my-0" data-v-51d3f98b${_scopeId}><span class="me-1" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Valid")}</span><i class="${ssrRenderClass(
                "bi bi-sort-numeric-" + (__props.filter["expense"]["category"] == "financial_id" && __props.filter["expense"]["order"] == "asc" ? "up" : "down") + "-alt"
              )}" data-v-51d3f98b${_scopeId}></i></button></div>`);
              if (unref(auth_user).id == __props.program.pic_id) {
                _push2(`<div data-v-51d3f98b${_scopeId}><button class="${ssrRenderClass(
                  "ms-2 btn btn-sm btn-outline-primary border-0 " + (__props.program.financial_id > 0 ? "" : " disabled")
                )}" data-v-51d3f98b${_scopeId}><i class="bi bi-plus-lg" data-v-51d3f98b${_scopeId}></i></button></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).id == __props.program.pic_id && __props.program.financial_id > 0) {
                _push2(`<div class="modal fade" id="addProgramExpense" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-v-51d3f98b${_scopeId}><div class="modal-dialog modal-dialog-centered" data-v-51d3f98b${_scopeId}><div class="modal-content shadow mx-3" data-v-51d3f98b${_scopeId}><div class="modal-header py-1 ps-3 pe-2" data-v-51d3f98b${_scopeId}><span class="modal-title fs-5 text-primary-emphasis" id="exampleModalLabel" data-v-51d3f98b${_scopeId}><i class="bi bi-cart-plus border-secondary border-end me-2 pe-2" data-v-51d3f98b${_scopeId}></i> ${ssrInterpolate("New Expense Item")}</span><button type="button" class="btn btn-sm ms-auto" data-v-51d3f98b${_scopeId}><i class="bi bi-x-lg" data-v-51d3f98b${_scopeId}></i></button></div><form method="post" enctype="multipart/form-data" data-v-51d3f98b${_scopeId}><div class="modal-body bg-light" data-v-51d3f98b${_scopeId}><div class="row justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3 d-flex" data-v-51d3f98b${_scopeId}><label for="add_expense_name" class="form-label d-inline-block my-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Name")}</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><input type="text" class="form-control form-control-sm d-inline-block" name="name"${ssrRenderAttr(
                  "value",
                  unref(formAddExpense).name
                )} required data-v-51d3f98b${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$4, {
                  message: unref(formAddExpense).errors.name
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="row mt-2 justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3 d-flex" data-v-51d3f98b${_scopeId}><label for="add_expense_price" class="form-label d-inline-block my-auto" data-v-51d3f98b${_scopeId}>Price</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><input type="number" class="form-control form-control-sm d-inline-block" name="price" id="add_expense_price"${ssrRenderAttr(
                  "value",
                  unref(formAddExpense).price
                )} placeholder="Type numbers only" required data-v-51d3f98b${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$4, {
                  message: unref(formAddExpense).errors.price
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="row mt-2 justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3 d-flex" data-v-51d3f98b${_scopeId}><label for="add_expense_unit" class="form-label d-inline-block my-auto" data-v-51d3f98b${_scopeId}>Unit</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><input type="text" class="form-control form-control-sm d-inline-block" name="unit" placeholder="gram, ml, pcs, etc.."${ssrRenderAttr(
                  "value",
                  unref(formAddExpense).unit
                )} required data-v-51d3f98b${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$4, {
                  message: unref(formAddExpense).errors.unit
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="row mt-2 justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3 d-flex" data-v-51d3f98b${_scopeId}><label for="add_expense_qty" class="form-label d-inline-block my-auto" data-v-51d3f98b${_scopeId}>Quantity</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><input type="number" class="form-control form-control-sm d-inline-block" name="qty" id="add_expense_qty" placeholder="Type numbers only"${ssrRenderAttr(
                  "value",
                  unref(formAddExpense).qty
                )} required data-v-51d3f98b${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$4, {
                  message: unref(formAddExpense).errors.qty
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="row mt-2 justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3 d-flex" data-v-51d3f98b${_scopeId}><span data-v-51d3f98b${_scopeId}>${ssrInterpolate("Total Price")}</span></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><span data-v-51d3f98b${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                  unref(formAddExpense).price * unref(formAddExpense).qty
                ))}</span></div></div><div class="row mt-2 justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3 d-flex" data-v-51d3f98b${_scopeId}><label for="add_expense_receipt" class="form-label d-inline-block my-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Receipt")}</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}>`);
                if (!unref(formAddExpense).same_receipt_check) {
                  _push2(`<input type="file" class="form-control form-control-sm" name="reciept" data-v-51d3f98b${_scopeId}>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(ssrRenderComponent(_sfc_main$4, {
                  message: unref(formAddExpense).errors.reciept
                }, null, _parent2, _scopeId));
                if (unref(formAddExpense).same_receipt_check) {
                  _push2(`<div class="input-group input-group-sm" id="add_expense_receipt_same_container" data-v-51d3f98b${_scopeId}><label for="add_expense_receipt_same" class="input-group-text" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Same as item")}</label><select class="form-select py-0 d-inline" id="add_expense_receipt_same" data-v-51d3f98b${_scopeId}><!--[-->`);
                  ssrRenderList(__props.expense_list, (expense) => {
                    _push2(`<option${ssrRenderAttr(
                      "value",
                      expense.id
                    )}${ssrIncludeBooleanAttr(
                      __props.expense_list.indexOf(
                        expense
                      ) == 1
                    ) ? " selected" : ""} data-v-51d3f98b${ssrIncludeBooleanAttr(Array.isArray(
                      unref(formAddExpense).receipt_same
                    ) ? ssrLooseContain(
                      unref(formAddExpense).receipt_same,
                      expense.id
                    ) : ssrLooseEqual(
                      unref(formAddExpense).receipt_same,
                      expense.id
                    )) ? " selected" : ""}${_scopeId}>${ssrInterpolate(expense.name)}</option>`);
                  });
                  _push2(`<!--]--></select></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (__props.expense_list.length > 0) {
                  _push2(`<label for="same_receipt_check" class="inline-flex items-center mt-1" data-v-51d3f98b${_scopeId}><input id="same_receipt_check" type="checkbox"${ssrIncludeBooleanAttr(
                    Array.isArray(
                      unref(formAddExpense).same_receipt_check
                    ) ? ssrLooseContain(
                      unref(formAddExpense).same_receipt_check,
                      null
                    ) : unref(formAddExpense).same_receipt_check
                  ) ? " checked" : ""} class="rounded" data-v-51d3f98b${_scopeId}><span class="ms-2 text-sm" data-v-51d3f98b${_scopeId}>${ssrInterpolate("same as exist item")}</span></label>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div><div class="modal-footer p-1" data-v-51d3f98b${_scopeId}><button type="submit" class="btn btn-sm btn-primary" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Add")}</button></div></form></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></nav></div></div><div class="row" data-v-51d3f98b${_scopeId}><div class="col-12" data-v-51d3f98b${_scopeId}><div class="scroll-container-3 scroll-container-lg-2 bg-secondary bg-opacity-25 px-2 pt-2 rounded mt-2" data-v-51d3f98b${_scopeId}><!--[-->`);
              ssrRenderList(__props.expense_list, (expense) => {
                _push2(`<div class="card card-bg-hover shadow mb-2 py-1" data-v-51d3f98b${_scopeId}><div class="row" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><span class="text-primary-emphasis ms-2 my-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate(expense.name)}</span><span class="fw-light ms-2 d-none d-lg-flex my-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate("- " + unref(formatIDR)(
                  expense.price
                ) + " /" + expense.unit)}</span><span class="fw-light ms-auto d-none d-lg-flex my-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate("total (" + expense.qty + ") : ")}</span><span class="fw-normal mx-2 d-none d-lg-flex my-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                  expense.total_price
                ))}</span><button class="ms-auto ms-lg-1 me-1 btn btn-sm btn-outline-secondary border-0 position-relative my-auto" data-bs-toggle="modal" data-bs-target="#receiptExpenseModal" data-v-51d3f98b${_scopeId}>`);
                if (expense.financial_id == null) {
                  _push2(`<span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" data-v-51d3f98b${_scopeId}></span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<i class="bi bi-receipt" data-v-51d3f98b${_scopeId}></i></button>`);
                if (unref(auth_user).id == __props.program.pic_id) {
                  _push2(`<div class="border-start border-1 border-secondary-subtle me-1 my-1" data-v-51d3f98b${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (unref(auth_user).id == __props.program.pic_id) {
                  _push2(`<div class="me-1 my-auto" data-v-51d3f98b${_scopeId}><button class="${ssrRenderClass(
                    "btn btn-sm btn-outline-danger border-0 " + (expense.financial_id > 0 ? "disabled" : "")
                  )}" data-v-51d3f98b${_scopeId}><i class="bi bi-trash" data-v-51d3f98b${_scopeId}></i></button></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><div class="row d-lg-none" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><span class="fw-light ms-2" data-v-51d3f98b${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                  expense.price
                ) + " /" + expense.unit)}</span><span class="fw-light ms-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate("total (" + expense.qty + ") : ")}</span><span class="fw-normal mx-2" data-v-51d3f98b${_scopeId}>${ssrInterpolate(unref(formatIDR)(
                  expense.total_price
                ))}</span></div></div></div>`);
              });
              _push2(`<!--]--></div></div><div class="modal fade" id="receiptExpenseModal" tabindex="-1" aria-labelledby="receiptExpenseModal" aria-hidden="true" data-v-51d3f98b${_scopeId}><div class="modal-dialog modal-dialog-centered" data-v-51d3f98b${_scopeId}><div class="modal-content shadow mx-3 mt-5" data-v-51d3f98b${_scopeId}><div class="modal-header py-1 ps-3 pe-2" data-v-51d3f98b${_scopeId}><span class="modal-title fs-5 text-primary-emphasis" data-v-51d3f98b${_scopeId}><i class="bi bi-receipt border-secondary border-end me-2 pe-2" data-v-51d3f98b${_scopeId}></i> ${ssrInterpolate("Expense Receipt")}</span><button type="button" class="btn btn-sm ms-auto" data-bs-dismiss="modal" aria-label="Close" data-v-51d3f98b${_scopeId}><i class="bi bi-x-lg" data-v-51d3f98b${_scopeId}></i></button></div><div class="modal-body bg-light p-1 px-3" data-v-51d3f98b${_scopeId}><div class="row justify-content-center mt-2" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><img${ssrRenderAttr(
                "src",
                expense_receipt.value.link
              )} alt="image" class="${ssrRenderClass(
                "rounded mx-auto" + placeholder.value
              )}" style="${ssrRenderStyle({
                width: "100%",
                height: "100%",
                objectFit: "contain",
                maxHeight: "320px"
              })}" id="expense_receipt_image" data-v-51d3f98b${_scopeId}></div></div><div class="row mt-2 justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><span class="fw-light ms-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Status : ")}</span><span class="fw-normal text-primary-emphasis me-auto ms-1" data-v-51d3f98b${_scopeId}>${ssrInterpolate(expense_receipt.value.status)}</span></div></div><div class="row justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><a${ssrRenderAttr(
                "href",
                expense_receipt.value.link
              )} target="blank" class="mx-auto text-decoration-none" id="expense_receipt_download" download data-v-51d3f98b${_scopeId}><button class="btn btn-sm btn-light" data-v-51d3f98b${_scopeId}><span class="fw-light" data-v-51d3f98b${_scopeId}>${ssrInterpolate(expense_receipt.value.image)}</span><i class="bi bi-download text-primary ms-2" data-v-51d3f98b${_scopeId}></i></button></a></div></div></div><div class="modal-footer p-1 px-2" data-v-51d3f98b${_scopeId}>`);
              if (unref(auth_user).roles_id == 2) {
                _push2(`<button type="button" data-bs-dismiss="modal" aria-label="Close" class="${ssrRenderClass(
                  "btn btn-sm btn-" + (expense_receipt.value.valid ? "secondary" : "success")
                )}" id="expense_receipt_button" data-v-51d3f98b${_scopeId}>${ssrInterpolate(expense_receipt.value.valid ? "Unvalidate" : "Validate")}</button>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).roles_id !== 2) {
                _push2(`<button data-bs-dismiss="modal" aria-label="Close" class="btn btn-sm btn-secondary" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Close")}</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (active_tab.value == 4) {
              _push2(`<div id="content_4" data-v-51d3f98b${_scopeId}><div class="row justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-12" data-v-51d3f98b${_scopeId}><nav class="navbar rounded bg-white shadow-sm p-2" data-v-51d3f98b${_scopeId}><form method="post" id="formStaffFilter" data-v-51d3f98b${_scopeId}></form><div class="container d-block px-0" data-v-51d3f98b${_scopeId}><div class="row" data-v-51d3f98b${_scopeId}><div class="col-12 d-flex" data-v-51d3f98b${_scopeId}><div class="input-group input-group-sm bg-body-tertiary rounded" data-v-51d3f98b${_scopeId}><button type="button" class="btn btn-sm rounded-0 rounded-start text-light bg-secondary" data-v-51d3f98b${_scopeId}><i class="bi bi-funnel-fill" data-v-51d3f98b${_scopeId}></i><span class="ms-1 ps-2 border-start border-light d-none d-md-inline" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Filter")}</span></button><button type="submit" form="formStaffFilter" class="btn btn-sm btn-outline-secondary border-0 rounded-0 my-0" data-v-51d3f98b${_scopeId}><span class="me-1" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Name")}</span><i class="${ssrRenderClass(
                "bi bi-sort-numeric-" + (__props.filter["staff"]["category"] == "name" && __props.filter["staff"]["order"] == "asc" ? "up" : "down") + "-alt"
              )}" data-v-51d3f98b${_scopeId}></i></button><button type="submit" form="formStaffFilter" class="btn btn-sm btn-outline-secondary border-0 rounded-0 my-0" data-v-51d3f98b${_scopeId}><span class="me-1" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Date")}</span><i class="${ssrRenderClass(
                "bi bi-sort-numeric-" + (__props.filter["staff"]["category"] == "created_at" && __props.filter["staff"]["order"] == "asc" ? "up" : "down") + "-alt"
              )}" data-v-51d3f98b${_scopeId}></i></button></div>`);
              if (unref(auth_user).id == __props.program.pic_id) {
                _push2(`<button class="${ssrRenderClass(
                  "ms-2 btn btn-sm btn-outline-primary border-0 " + (__props.program.financial_id > 0 ? "" : "disabled")
                )}" data-v-51d3f98b${_scopeId}><i class="bi bi-plus-lg" data-v-51d3f98b${_scopeId}></i></button>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(auth_user).id == __props.program.pic_id) {
                _push2(`<div class="modal fade" id="addProgramStaff" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-v-51d3f98b${_scopeId}><div class="modal-dialog modal-dialog-centered" data-v-51d3f98b${_scopeId}><div class="modal-content shadow mx-3" data-v-51d3f98b${_scopeId}><div class="modal-header py-1 ps-3 pe-2" data-v-51d3f98b${_scopeId}><span class="modal-title fs-5 text-primary-emphasis" id="exampleModalLabel" data-v-51d3f98b${_scopeId}><i class="bi bi-person-fill-add border-secondary border-end me-2 pe-2" data-v-51d3f98b${_scopeId}></i> ${ssrInterpolate("Add New Staff")}</span><button type="button" class="btn btn-sm ms-auto" data-v-51d3f98b${_scopeId}><i class="bi bi-x-lg" data-v-51d3f98b${_scopeId}></i></button></div><form method="post" data-v-51d3f98b${_scopeId}><div class="modal-body bg-light" data-v-51d3f98b${_scopeId}><div class="row mt-0 justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3" data-v-51d3f98b${_scopeId}><label for="add_staff_title" class="form-label d-inline-block" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Title")}</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}><input type="text" class="form-control form-control-sm d-inline-block" id="add_staff_title"${ssrRenderAttr(
                  "value",
                  unref(formAddStaff).staff_title
                )} placeholder="PDD, ATP, etc.." required data-v-51d3f98b${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$4, {
                  message: unref(formAddStaff).errors.staff_title
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="row mt-2 justify-content-center" data-v-51d3f98b${_scopeId}><div class="col-4 col-lg-3" data-v-51d3f98b${_scopeId}><label for="add_staff_id" class="form-label d-inline-block" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Staff")}</label></div><div class="col-8 col-lg-7" data-v-51d3f98b${_scopeId}>`);
                if (__props.employee_list.length == 0) {
                  _push2(`<span class="fw-light fst-italic" data-v-51d3f98b${_scopeId}>${ssrInterpolate("There are no available staff.")}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                if (__props.employee_list.length > 0) {
                  _push2(`<select class="form-select py-0 d-inline" id="add_staff_id" required data-v-51d3f98b${_scopeId}><!--[-->`);
                  ssrRenderList(__props.employee_list, (employee) => {
                    _push2(`<option${ssrRenderAttr(
                      "value",
                      employee.id
                    )}${ssrIncludeBooleanAttr(
                      __props.employee_list.indexOf(
                        employee
                      ) == 1
                    ) ? " selected" : ""} data-v-51d3f98b${ssrIncludeBooleanAttr(Array.isArray(
                      unref(formAddStaff).staff_id
                    ) ? ssrLooseContain(
                      unref(formAddStaff).staff_id,
                      employee.id
                    ) : ssrLooseEqual(
                      unref(formAddStaff).staff_id,
                      employee.id
                    )) ? " selected" : ""}${_scopeId}>${ssrInterpolate(employee.name)}</option>`);
                  });
                  _push2(`<!--]--></select>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div><div class="modal-footer p-1" data-v-51d3f98b${_scopeId}><button${ssrRenderAttr(
                  "type",
                  __props.employee_list.length > 0 ? "submit" : "button"
                )} class="${ssrRenderClass(
                  "btn btn-sm btn-primary " + (__props.employee_list.length == 0 ? "disabled" : "")
                )}" data-v-51d3f98b${_scopeId}>${ssrInterpolate("Add")}</button></div></form></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></nav></div></div><div class="row" data-v-51d3f98b${_scopeId}><div class="col-12" data-v-51d3f98b${_scopeId}><div class="scroll-container-3 scroll-container-lg-2 bg-secondary bg-opacity-25 px-2 pt-2 rounded mt-2" data-v-51d3f98b${_scopeId}><!--[-->`);
              ssrRenderList(__props.staff_list, (staff) => {
                var _a;
                _push2(`<div class="card card-bg-hover shadow mb-2" data-v-51d3f98b${_scopeId}><div class="row gx-0 px-1" style="${ssrRenderStyle({ height: "100%" })}" data-v-51d3f98b${_scopeId}><div class="col-auto d-flex" data-v-51d3f98b${_scopeId}><div class="card position-relative shadow-sm rounded-circle border-primary border-2 my-auto" style="${ssrRenderStyle({
                  paddingBottom: "25px",
                  width: "25px"
                })}" data-v-51d3f98b${_scopeId}><img${ssrRenderAttr(
                  "src",
                  "/storage/images/profile/" + (staff.employee.profile_image !== null ? staff.employee.profile_image : "example.png")
                )} alt="image" class="${ssrRenderClass(
                  "rounded-circle position-absolute top-0 start-0 w-100 h-100 " + placeholder.value
                )}" style="${ssrRenderStyle({
                  objectFit: "cover"
                })}" data-v-51d3f98b${_scopeId}></div></div><div class="col d-flex my-1" data-v-51d3f98b${_scopeId}><a${ssrRenderAttr(
                  "href",
                  _ctx.route(
                    "profile.edit",
                    {
                      id: (_a = staff == null ? void 0 : staff.employee) == null ? void 0 : _a.id
                    }
                  )
                )} rel="noopener noreferrer" class="text-decoration-none d-flex w-100" data-v-51d3f98b${_scopeId}><div class="d-flex scroll-x-hidden text-nowrap ms-2" data-v-51d3f98b${_scopeId}><span class="text-primary-emphasis my-auto" data-v-51d3f98b${_scopeId}>${ssrInterpolate(staff.employee.name)}</span><span class="${ssrRenderClass(
                  "fw-light ms-1 my-auto " + (staff.employee.id == __props.program.pic_id ? "text-dark" : "")
                )}" data-v-51d3f98b${_scopeId}>${ssrInterpolate("- " + staff.title)}</span></div></a>`);
                if (unref(auth_user).id == __props.program.pic_id && __props.program.staff_lock <= 0 && staff.user_id !== __props.program.pic_id) {
                  _push2(`<button class="ms-auto btn btn-sm btn-outline-danger border-0" data-v-51d3f98b${_scopeId}><i class="bi bi-trash" data-v-51d3f98b${_scopeId}></i></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: "Program",
                icon: "/storage/local/images/apps/logo.png"
              }),
              createVNode(_sfc_main$2, {
                ref_key: "toastNotifRef",
                ref: toastNotifRef
              }, null, 512),
              createVNode(_sfc_main$3, {
                ref_key: "modalConfirmationRef",
                ref: modalConfirmationRef
              }, null, 512),
              createVNode(ModalAlertNotification, {
                ref_key: "modalAlertNotificationRef",
                ref: modalAlertNotificationRef
              }, null, 512),
              createVNode("div", { class: "container me-lg-0 mx-auto mb-5" }, [
                createVNode("div", { class: "row mt-4" }, [
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "card shadow-sm p-3" }, [
                      createVNode("div", { class: "row" }, [
                        createVNode("div", { class: "col-12" }, [
                          createVNode("div", { class: "d-flex border-primary border-bottom pb-0" }, [
                            createVNode("span", { class: "h5 text-primary-emphasis" }, toDisplayString(__props.program.name + " Program"), 1),
                            showInternshipButton.value ? (openBlock(), createBlock(unref(Link), {
                              key: 0,
                              href: _ctx.route("internship.applications.index"),
                              class: "btn btn-sm btn-outline-primary ms-auto me-2 d-flex align-items-center gap-2",
                              style: { "text-decoration": "none" }
                            }, {
                              default: withCtx(() => [
                                createVNode("i", { class: "bi bi-people-fill" }),
                                createVNode("span", { class: "d-none d-md-inline" }, "Data Pendaftar"),
                                createVNode("span", { class: "d-md-none" }, "Pendaftar")
                              ]),
                              _: 1
                            }, 8, ["href"])) : createCommentVNode("", true),
                            unref(auth_user).id == __props.program.department.manager_id ? (openBlock(), createBlock("button", {
                              key: 1,
                              onClick: ($event) => confirmation(
                                _ctx.route("program.delete", {
                                  id: __props.program.id
                                }),
                                "Are you sure want to delete " + __props.program.name + " Program?"
                              ),
                              class: "text-decoration-none ms-auto mb-2 py-0 btn btn-sm btn-outline-secondary border-0"
                            }, [
                              createVNode("i", { class: "bi bi-trash3" })
                            ], 8, ["onClick"])) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "d-flex mt-2 d-lg-none" }, [
                        createVNode("span", { class: "text-secondary" }, toDisplayString("Detail"))
                      ]),
                      createVNode("div", { class: "row g-2 mt-0 mt-lg-2" }, [
                        createVNode("div", { class: "col-lg-1 d-none d-lg-block" }, [
                          createVNode("div", { class: "d-flex w-100 h-100" }, [
                            createVNode("span", { class: "text-secondary my-auto" }, toDisplayString("Detail"))
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("i", { class: "bi bi-person text-primary fs-5 my-auto me-2" }),
                            createVNode("div", null, [
                              createVNode("span", {
                                class: "text-secondary d-block",
                                style: { "font-size": "0.8rem" }
                              }, toDisplayString("In Charge")),
                              createVNode("div", { class: "scroll-x-hidden" }, [
                                createVNode("span", { class: "text-dark text-nowrap" }, toDisplayString(__props.program.user.name), 1)
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("i", { class: "bi bi-people text-primary fs-5 my-auto me-2" }),
                            createVNode("div", null, [
                              createVNode("span", {
                                class: "text-secondary d-block",
                                style: { "font-size": "0.8rem" }
                              }, toDisplayString("Staff")),
                              createVNode("div", { class: "scroll-x-hidden" }, [
                                createVNode("span", { class: "text-dark text-nowrap" }, toDisplayString(__props.staff_list.length + (__props.staff_list.length > 1 ? " persons" : " person")), 1)
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "col-12 col-lg-3" }, [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("i", { class: "bi bi-calendar2 text-primary fs-5 my-auto me-2" }),
                            createVNode("div", null, [
                              createVNode("span", {
                                class: "text-secondary d-block",
                                style: { "font-size": "0.8rem" }
                              }, toDisplayString("Progress")),
                              createVNode("div", { class: "scroll-x-hidden" }, [
                                createVNode("span", { class: "text-dark text-nowrap" }, toDisplayString(__props.program.financial_id == 0 ? "Waiting for budget validation." : __props.program.disbursement == 0 ? "Waiting for disbursement." : "On progress"), 1)
                              ])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "d-flex mt-2 d-lg-none" }, [
                        createVNode("span", { class: "text-secondary" }, toDisplayString("Cashflow"))
                      ]),
                      createVNode("div", { class: "row g-2 mt-lg-2 mt-0" }, [
                        createVNode("div", { class: "col-lg-1 d-none d-lg-block" }, [
                          createVNode("div", { class: "d-flex w-100 h-100" }, [
                            createVNode("span", { class: "text-secondary my-auto" }, toDisplayString("Cashflow"))
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("i", { class: "bi bi-list-columns-reverse text-primary fs-5 my-auto me-2" }),
                            createVNode("div", null, [
                              createVNode("span", {
                                class: "text-secondary d-block",
                                style: { "font-size": "0.8rem" }
                              }, toDisplayString("Budget")),
                              createVNode("div", { class: "scroll-x-hidden" }, [
                                createVNode("span", { class: "text-dark text-nowrap" }, toDisplayString(unref(formatIDR)(__props.program.budget)), 1)
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("i", { class: "bi bi-box-arrow-in-down text-primary fs-5 my-auto me-2" }),
                            createVNode("div", null, [
                              createVNode("span", {
                                class: "text-secondary d-block",
                                style: { "font-size": "0.8rem" }
                              }, toDisplayString("Disbursement")),
                              createVNode("div", { class: "scroll-x-hidden" }, [
                                createVNode("span", { class: "text-dark text-nowrap" }, toDisplayString(unref(formatIDR)(
                                  __props.program.disbursement
                                )), 1)
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "col-6 col-lg-3" }, [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode("i", { class: "bi bi-box-arrow-up text-primary fs-5 my-auto me-2" }),
                            createVNode("div", null, [
                              createVNode("span", {
                                class: "text-secondary d-block",
                                style: { "font-size": "0.8rem" }
                              }, toDisplayString("Expense")),
                              createVNode("div", { class: "scroll-x-hidden" }, [
                                createVNode("span", { class: "text-dark text-nowrap" }, toDisplayString(unref(formatIDR)(__props.program.expense)), 1)
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "row gx-4" }, [
                  createVNode("div", { class: "col-lg-6 col-12" }, [
                    createVNode("div", { class: "row mt-4" }, [
                      createVNode("div", { class: "col-12" }, [
                        createVNode("div", { class: "card p-2" }, [
                          createVNode("div", { class: "d-flex border-bottom mx-2 border-primary py-1" }, [
                            createVNode("span", { class: "h5 text-primary-emphasis my-1" }, toDisplayString("Logbook"))
                          ]),
                          createVNode("div", { class: "row gx-2 mt-2" }, [
                            createVNode("div", { class: "col-2 col-lg-2 d-flex" }, [
                              createVNode("span", { class: "text-primary-emphasis text-nowrap my-auto ms-auto" }, [
                                createTextVNode(toDisplayString("Staff ") + " "),
                                createVNode("span", { class: "d-lg-inline d-none" }, toDisplayString("List")),
                                createTextVNode(" " + toDisplayString(": "))
                              ])
                            ]),
                            createVNode("div", { class: "col-10 col-lg-10 d-flex" }, [
                              createVNode("button", {
                                onClick: ($event) => scrollHorizontal(-100),
                                class: "btn btn-sm btn-outline-primary border-0 my-auto d-lg-block d-none px-0 me-1"
                              }, [
                                createVNode("i", { class: "bi bi-caret-left-fill" })
                              ], 8, ["onClick"]),
                              createVNode("div", {
                                ref_key: "staffLogbookContainerRef",
                                ref: staffLogbookContainerRef,
                                class: "scroll-container-horizontal-lg scroll-container-horizontal bg-body-tertiary rounded px-2 me-2 me-lg-0"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.staff_list, (staff) => {
                                  return openBlock(), createBlock("button", {
                                    class: "btn btn-sm card shadow-sm my-1 me-2 card-bg-hover d-inline-block " + (staff.employee.id == selected_user.value.id ? "bg-secondary bg-opacity-25" : ""),
                                    onClick: ($event) => setSelectedUser(
                                      staff.employee
                                    )
                                  }, [
                                    createVNode("span", { class: "mx-1 text-nowrap" }, toDisplayString(staff.employee.name), 1)
                                  ], 10, ["onClick"]);
                                }), 256))
                              ], 512),
                              createVNode("button", {
                                class: "btn btn-sm btn-outline-primary border-0 my-auto d-lg-block d-none px-0 ms-1 me-2",
                                onClick: ($event) => scrollHorizontal(100)
                              }, [
                                createVNode("i", { class: "bi bi-caret-right-fill" })
                              ], 8, ["onClick"])
                            ])
                          ]),
                          createVNode("div", { class: "row mt-2" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("div", { class: "d-flex border-bottom border-1 mx-2" }, [
                                createVNode("span", { class: "h6 text-primary-emphasis mx-auto" }, toDisplayString(selected_user.value.name ?? "Select Staff"), 1),
                                selected_user.value.id ? (openBlock(), createBlock("a", {
                                  key: 0,
                                  href: _ctx.route(
                                    "profile.edit",
                                    selected_user.value.id
                                  ),
                                  class: "text-decoration-none me-2 d-flex",
                                  target: "_blank",
                                  rel: "noopener noreferrer"
                                }, [
                                  createVNode("span", {
                                    class: "text-primary mb-auto",
                                    style: "font-size:0.7rem;"
                                  }, [
                                    createTextVNode(toDisplayString("visit profile") + " "),
                                    createVNode("i", { class: "bi bi-box-arrow-up-right" })
                                  ])
                                ], 8, ["href"])) : createCommentVNode("", true)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "row" }, [
                            createVNode("div", { class: "col-12 d-flex" }, [
                              createVNode("div", { class: "scroll-container-lg-2 scroll-container-2 mx-2" }, [
                                createVNode("ul", { class: "list-group list-group-flush" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(active_logbook.value, (logbook) => {
                                    return openBlock(), createBlock("li", { class: "list-group-item px-0" }, [
                                      createVNode("div", { class: "d-flex w-100" }, [
                                        createVNode("div", {
                                          class: "card d-flex me-2",
                                          style: "width: 25%; height: auto;"
                                        }, [
                                          createVNode("img", {
                                            src: "/storage/images/log/" + __props.program.id + "/" + logbook.image,
                                            alt: "image",
                                            class: "rounded border border-1 border-secondary-subtle",
                                            "data-bs-target": "#modalLogbookImage",
                                            "data-bs-toggle": "modal",
                                            onClick: ($event) => setSelectedLogbookImage(
                                              logbook.image
                                            )
                                          }, null, 8, ["src", "onClick"]),
                                          createVNode("div", {
                                            class: "modal fade",
                                            id: "modalLogbookImage",
                                            tabindex: "-1"
                                          }, [
                                            createVNode("div", { class: "modal-dialog modal-dialog-centered px-3 px-lg-0" }, [
                                              createVNode("div", { class: "modal-content shadow mt-5" }, [
                                                createVNode("div", { class: "modal-header py-1 ps-3 pe-2" }, [
                                                  createVNode("span", { class: "modal-title fs-5 text-primary-emphasis" }, [
                                                    createVNode("i", { class: "bi bi-key border-secondary-subtle border-2 border-end pe-2" }),
                                                    createTextVNode(" " + toDisplayString("Logbook Image"))
                                                  ]),
                                                  createVNode("button", {
                                                    type: "button",
                                                    class: "btn btn-sm ms-auto",
                                                    "data-bs-dismiss": "modal"
                                                  }, [
                                                    createVNode("i", { class: "bi bi-x-lg" })
                                                  ])
                                                ]),
                                                createVNode("div", { class: "modal-body bg-light" }, [
                                                  createVNode("div", { class: "d-flex w-100" }, [
                                                    createVNode("img", {
                                                      src: "/storage/images/log/" + __props.program.id + "/" + selectedLogbookImage.value,
                                                      alt: "image",
                                                      class: "img-fluid object-fit-cover"
                                                    }, null, 8, ["src"])
                                                  ])
                                                ]),
                                                createVNode("div", { class: "modal-footer p-1" }, [
                                                  createVNode("a", {
                                                    href: "/storage/images/log/" + __props.program.id + "/" + selectedLogbookImage.value,
                                                    download: "",
                                                    class: "btn btn-sm text-center text-decoration-none text-secondary w-100"
                                                  }, [
                                                    createTextVNode(toDisplayString(selectedLogbookImage.value) + " ", 1),
                                                    createVNode("i", { class: "bi bi-download text-primary" })
                                                  ], 8, ["href"])
                                                ])
                                              ])
                                            ])
                                          ])
                                        ]),
                                        createVNode("div", { class: "w-100" }, [
                                          createVNode("div", { class: "d-flex w-100" }, [
                                            createVNode("span", { class: "fw-light me-auto" }, toDisplayString(unref(formatDate)(
                                              logbook.created_at
                                            )), 1),
                                            unref(auth_user).id == __props.program.pic_id ? (openBlock(), createBlock("button", {
                                              key: 0,
                                              onClick: ($event) => confirmation(
                                                _ctx.route(
                                                  "logbook.validate",
                                                  logbook.id
                                                ),
                                                "Are you sure this log book is " + (logbook.validated > 0 ? "not valid" : "valid") + "?"
                                              ),
                                              class: "btn btn-sm border-0 py-0 btn-outline-" + (logbook.validated > 0 ? "success" : "secondary")
                                            }, toDisplayString(logbook.validated > 0 ? "validated" : "unvalidated"), 11, ["onClick"])) : createCommentVNode("", true),
                                            unref(auth_user).id !== __props.program.pic_id ? (openBlock(), createBlock("span", {
                                              key: 1,
                                              class: "text-" + (logbook.validated > 0 ? "success" : "secondary")
                                            }, toDisplayString(logbook.validated > 0 ? "valid" : "unvalid"), 3)) : createCommentVNode("", true),
                                            unref(auth_user).id == selected_user.value.id && logbook.validated == 0 ? (openBlock(), createBlock("div", {
                                              key: 2,
                                              class: "my-1 border-start border-1 mx-1"
                                            })) : createCommentVNode("", true),
                                            unref(auth_user).id == selected_user.value.id && logbook.validated == 0 ? (openBlock(), createBlock("button", {
                                              key: 3,
                                              class: "btn btn-sm btn-outline-secondary border-0 py-0",
                                              onClick: ($event) => confirmation(
                                                _ctx.route(
                                                  "logbook.delete",
                                                  logbook.id
                                                ),
                                                "Are you sure want to delete this log?"
                                              )
                                            }, [
                                              createVNode("i", { class: "bi bi-trash3" })
                                            ], 8, ["onClick"])) : createCommentVNode("", true)
                                          ]),
                                          createVNode("span", null, toDisplayString(logbook.title), 1)
                                        ])
                                      ])
                                    ]);
                                  }), 256)),
                                  active_logbook.value.length == 0 ? (openBlock(), createBlock("li", {
                                    key: 0,
                                    class: "list-group-item px-0"
                                  }, [
                                    createVNode("div", { class: "d-flex" }, [
                                      createVNode("div", {
                                        class: "card d-flex me-2",
                                        style: "width: 25%; height: auto;"
                                      }, [
                                        createVNode("img", {
                                          src: "/storage/images/apps/logo.png",
                                          alt: "image",
                                          class: "rounded border border-1 border-secondary-subtle"
                                        })
                                      ]),
                                      createVNode("div", { class: "w-100" }, [
                                        createVNode("div", { class: "d-flex" }, [
                                          createVNode("div", { class: "fw-light card me-auto" }, toDisplayString(selected_user.value == 0 ? "Logbook date" : "-"), 1),
                                          createVNode("div", { class: "text-secondary d-block ms-auto me-2" }, toDisplayString(selected_user.value == 0 ? "Logbook status" : ""), 1)
                                        ]),
                                        createVNode("div", null, toDisplayString(selected_user.value == 0 ? "Logbook detail" : selected_user.value.name + " have not create any logbook."), 1)
                                      ])
                                    ])
                                  ])) : createCommentVNode("", true)
                                ])
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "col-lg-6 col-12" }, [
                    createVNode("div", { class: "row mt-4 mb-4" }, [
                      createVNode("div", { class: "col-12" }, [
                        createVNode("div", { class: "d-flex bg-white rounded" }, [
                          (openBlock(), createBlock("button", {
                            onClick: ($event) => show_tab(1),
                            key: active_tab.value == 1,
                            class: "btn btn-sm btn-outline-primary rounded w-25 border-3 border-light py-1 " + (active_tab.value == 1 ? "active" : "")
                          }, [
                            createVNode("i", {
                              class: "bi bi-list-columns-reverse d-lg-none " + (active_tab.value == 1 ? "d-none" : "")
                            }, null, 2),
                            createVNode("span", {
                              style: isLargeScreen.value ? "font-size:1rem;" : "font-size:0.7rem;",
                              class: "d-lg-inline " + (active_tab.value == 1 ? "" : "d-none")
                            }, toDisplayString("Budget"), 6)
                          ], 10, ["onClick"])),
                          (openBlock(), createBlock("button", {
                            onClick: ($event) => show_tab(2),
                            key: active_tab.value == 2,
                            class: "btn btn-sm btn-outline-primary rounded w-25 border-3 border-light py-1 " + (active_tab.value == 2 ? "active" : "")
                          }, [
                            createVNode("i", {
                              class: "bi bi-box-arrow-in-down d-lg-none " + (active_tab.value == 2 ? "d-none" : "")
                            }, null, 2),
                            createVNode("span", {
                              style: isLargeScreen.value ? "font-size:1rem;" : "font-size:0.7rem;",
                              class: "d-lg-inline " + (active_tab.value == 2 ? "" : "d-none")
                            }, toDisplayString("Disbursement"), 6)
                          ], 10, ["onClick"])),
                          (openBlock(), createBlock("button", {
                            onClick: ($event) => show_tab(3),
                            key: active_tab.value == 3,
                            class: "btn btn-sm btn-outline-primary rounded w-25 border-3 border-light py-1 " + (active_tab.value == 3 ? "active" : "")
                          }, [
                            createVNode("i", {
                              class: "bi bi-box-arrow-up d-lg-none " + (active_tab.value == 3 ? "d-none" : "")
                            }, null, 2),
                            createVNode("span", {
                              style: isLargeScreen.value ? "font-size:1rem;" : "font-size:0.7rem;",
                              class: "d-lg-inline " + (active_tab.value == 3 ? "" : "d-none")
                            }, toDisplayString("Expense"), 6)
                          ], 10, ["onClick"])),
                          (openBlock(), createBlock("button", {
                            onClick: ($event) => show_tab(4),
                            key: active_tab.value == 4,
                            class: "btn btn-sm btn-outline-primary rounded w-25 border-3 border-light py-1 " + (active_tab.value == 4 ? "active" : "")
                          }, [
                            createVNode("i", {
                              class: "bi bi-people d-lg-none " + (active_tab.value == 4 ? "d-none" : "")
                            }, null, 2),
                            createVNode("span", {
                              style: isLargeScreen.value ? "font-size:1rem;" : "font-size:0.7rem;",
                              class: "d-lg-inline " + (active_tab.value == 4 ? "" : "d-none"),
                              id: "tab_span_4"
                            }, toDisplayString("Staff"), 6)
                          ], 10, ["onClick"]))
                        ])
                      ])
                    ]),
                    createVNode(Transition, {
                      name: "fade-slide-ltr",
                      onAfterLeave: ($event) => proceed_show_tab()
                    }, {
                      default: withCtx(() => [
                        active_tab.value == 1 ? (openBlock(), createBlock("div", {
                          key: 0,
                          id: "content_1"
                        }, [
                          createVNode("div", { class: "row justify-content-center" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("nav", { class: "navbar rounded bg-white shadow-sm p-2" }, [
                                createVNode("form", {
                                  method: "post",
                                  id: "formBudgetFilter",
                                  onSubmit: withModifiers(($event) => handleSubmitBudgetFilter(
                                    $event,
                                    _ctx.route(
                                      "program.budget.filter",
                                      {
                                        id: __props.program.id
                                      }
                                    )
                                  ), ["prevent"])
                                }, null, 40, ["onSubmit"]),
                                createVNode("div", { class: "container d-block px-0" }, [
                                  createVNode("div", { class: "row" }, [
                                    createVNode("div", { class: "col-12 d-flex" }, [
                                      createVNode("div", { class: "input-group bg-body-tertiary rounded" }, [
                                        createVNode("button", {
                                          type: "button",
                                          form: "formBudgetFilter",
                                          class: "btn btn-sm rounded-0 rounded-start text-light bg-secondary"
                                        }, [
                                          createVNode("i", { class: "bi bi-funnel-fill" }),
                                          createVNode("span", { class: "ms-1 ps-2 border-start border-light d-none d-md-inline" }, toDisplayString("Filter"))
                                        ]),
                                        createVNode("button", {
                                          type: "submit",
                                          form: "formBudgetFilter",
                                          class: "btn btn-sm btn-outline-secondary border-0 rounded-0 my-0",
                                          onClick: ($event) => budgetFilterCategory(
                                            "name"
                                          )
                                        }, [
                                          createVNode("span", { class: "me-1" }, toDisplayString("Name")),
                                          createVNode("i", {
                                            class: "bi bi-sort-numeric-" + (__props.filter["budget"]["category"] == "name" && __props.filter["budget"]["order"] == "asc" ? "up" : "down") + "-alt"
                                          }, null, 2)
                                        ], 8, ["onClick"]),
                                        createVNode("button", {
                                          type: "submit",
                                          form: "formBudgetFilter",
                                          class: "btn btn-sm btn-outline-secondary border-0 rounded-0 my-0",
                                          onClick: ($event) => budgetFilterCategory(
                                            "price"
                                          )
                                        }, [
                                          createVNode("span", { class: "me-1" }, toDisplayString("Price")),
                                          createVNode("i", {
                                            class: "bi bi-sort-numeric-" + (__props.filter["budget"]["category"] == "price" && __props.filter["budget"]["order"] == "asc" ? "up" : "down") + "-alt"
                                          }, null, 2)
                                        ], 8, ["onClick"])
                                      ]),
                                      unref(auth_user).id == __props.program.pic_id ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        onClick: ($event) => __props.program.financial_id > 0 ? alertNotification(
                                          "You can not add Budget Item after Program Budget approved by Financial Officer."
                                        ) : ""
                                      }, [
                                        createVNode("button", {
                                          class: "ms-2 btn btn-sm btn-outline-primary border-0 " + (__props.program.financial_id <= 0 ? "" : "disabled"),
                                          "data-bs-toggle": "modal",
                                          "data-bs-target": "#addProgramBudget"
                                        }, [
                                          createVNode("i", { class: "bi bi-plus-lg" })
                                        ], 2)
                                      ], 8, ["onClick"])) : createCommentVNode("", true),
                                      unref(auth_user).id == __props.program.pic_id && __props.program.financial_id <= 0 ? (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "modal fade",
                                        id: "addProgramBudget",
                                        tabindex: "-1",
                                        "aria-labelledby": "exampleModalLabel",
                                        "aria-hidden": "true"
                                      }, [
                                        createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                                          createVNode("div", { class: "modal-content shadow mx-3" }, [
                                            createVNode("div", { class: "modal-header py-1 ps-3 pe-2" }, [
                                              createVNode("span", {
                                                class: "modal-title fs-5 text-primary-emphasis",
                                                id: "exampleModalLabel"
                                              }, [
                                                createVNode("i", { class: "bi bi-journal-plus border-secondary border-end me-2 pe-2" }),
                                                createTextVNode(" " + toDisplayString("New Budget Item"))
                                              ]),
                                              createVNode("button", {
                                                type: "button",
                                                class: "btn btn-sm ms-auto",
                                                "data-bs-dismiss": "modal",
                                                "aria-label": "Close"
                                              }, [
                                                createVNode("i", { class: "bi bi-x-lg" })
                                              ])
                                            ]),
                                            createVNode("form", {
                                              method: "post",
                                              onSubmit: withModifiers(($event) => handleSubmitAddBudget(
                                                $event,
                                                _ctx.route(
                                                  "program.budget.add",
                                                  {
                                                    id: __props.program.id
                                                  }
                                                )
                                              ), ["prevent"])
                                            }, [
                                              createVNode("div", { class: "modal-body bg-light" }, [
                                                createVNode("div", { class: "row justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3" }, [
                                                    createVNode("label", {
                                                      for: "add_budget_name",
                                                      class: "form-label d-inline-block"
                                                    }, toDisplayString("Name"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    withDirectives(createVNode("input", {
                                                      type: "text",
                                                      class: "form-control form-control-sm d-inline-block",
                                                      "onUpdate:modelValue": ($event) => unref(formAddBudget).name = $event,
                                                      id: "add_budget_name",
                                                      required: ""
                                                    }, null, 8, ["onUpdate:modelValue"]), [
                                                      [
                                                        vModelText,
                                                        unref(formAddBudget).name
                                                      ]
                                                    ]),
                                                    createVNode(_sfc_main$4, {
                                                      message: unref(formAddBudget).errors.item_name
                                                    }, null, 8, ["message"])
                                                  ])
                                                ]),
                                                createVNode("div", { class: "row mt-2 justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3" }, [
                                                    createVNode("label", {
                                                      for: "add_budget_price",
                                                      class: "form-label d-inline-block"
                                                    }, toDisplayString("Price"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    withDirectives(createVNode("input", {
                                                      type: "number",
                                                      class: "form-control form-control-sm d-inline-block",
                                                      id: "add_budget_price",
                                                      "onUpdate:modelValue": ($event) => unref(formAddBudget).price = $event,
                                                      placeholder: "Type numbers only",
                                                      required: ""
                                                    }, null, 8, ["onUpdate:modelValue"]), [
                                                      [
                                                        vModelText,
                                                        unref(formAddBudget).price
                                                      ]
                                                    ]),
                                                    createVNode(_sfc_main$4, {
                                                      message: unref(formAddBudget).errors.price
                                                    }, null, 8, ["message"])
                                                  ])
                                                ]),
                                                createVNode("div", { class: "row mt-2 justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3" }, [
                                                    createVNode("label", {
                                                      for: "add_budget_unit",
                                                      class: "form-label d-inline-block"
                                                    }, toDisplayString("Unit"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    withDirectives(createVNode("input", {
                                                      type: "text",
                                                      class: "form-control form-control-sm d-inline-block",
                                                      placeholder: "gram, ml, pcs, etc..",
                                                      id: "add_budget_unit",
                                                      "onUpdate:modelValue": ($event) => unref(formAddBudget).unit = $event,
                                                      required: ""
                                                    }, null, 8, ["onUpdate:modelValue"]), [
                                                      [
                                                        vModelText,
                                                        unref(formAddBudget).unit
                                                      ]
                                                    ]),
                                                    createVNode(_sfc_main$4, {
                                                      message: unref(formAddBudget).errors.unit
                                                    }, null, 8, ["message"])
                                                  ])
                                                ]),
                                                createVNode("div", { class: "row mt-2 justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3" }, [
                                                    createVNode("label", {
                                                      for: "add_budget_qty",
                                                      class: "form-label d-inline-block"
                                                    }, toDisplayString("Quantity"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    withDirectives(createVNode("input", {
                                                      type: "number",
                                                      class: "form-control form-control-sm d-inline-block",
                                                      id: "add_budget_qty",
                                                      "onUpdate:modelValue": ($event) => unref(formAddBudget).qty = $event,
                                                      placeholder: "Type numbers only",
                                                      required: ""
                                                    }, null, 8, ["onUpdate:modelValue"]), [
                                                      [
                                                        vModelText,
                                                        unref(formAddBudget).qty
                                                      ]
                                                    ]),
                                                    createVNode(_sfc_main$4, {
                                                      message: unref(formAddBudget).errors.qty
                                                    }, null, 8, ["message"])
                                                  ])
                                                ]),
                                                createVNode("div", { class: "row mt-2 justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3" }, [
                                                    createVNode("span", null, toDisplayString("Total Price"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    createVNode("span", { id: "add_budget_total" }, toDisplayString(unref(formatIDR)(
                                                      unref(formAddBudget).price * unref(formAddBudget).qty
                                                    )), 1)
                                                  ])
                                                ])
                                              ]),
                                              createVNode("div", { class: "modal-footer p-1" }, [
                                                createVNode("button", {
                                                  type: "submit",
                                                  class: "btn btn-sm btn-primary"
                                                }, toDisplayString("Add"))
                                              ])
                                            ], 40, ["onSubmit"])
                                          ])
                                        ])
                                      ])) : createCommentVNode("", true),
                                      unref(auth_user).roles_id == 2 ? (openBlock(), createBlock("button", {
                                        key: 2,
                                        class: "position-relative ms-2 border-0 btn btn-sm btn-outline-" + (__props.program.financial_id > 0 ? "success" : "secondary"),
                                        onClick: ($event) => confirmation(
                                          _ctx.route(
                                            "program.budget.validate",
                                            {
                                              id: __props.program.id,
                                              valid: __props.program.financial_id > 0 ? 0 : 1
                                            }
                                          ),
                                          __props.program.financial_id > 0 ? "Are you sure want to UNPROVE " + __props.program.name + " Program Budget?" : "Are you sure want to APPROVE " + __props.program.name + " Program Budget?"
                                        )
                                      }, [
                                        createVNode("i", {
                                          class: "bi bi-" + (__props.program.financial_id > 0 ? "lock-fill" : "unlock")
                                        }, null, 2),
                                        __props.program.financial_id <= 0 ? (openBlock(), createBlock("i", {
                                          key: 0,
                                          style: "font-size:0.5rem;",
                                          class: "bi bi-circle-fill position-absolute top-0 end-0 text-danger"
                                        })) : createCommentVNode("", true)
                                      ], 10, ["onClick"])) : createCommentVNode("", true)
                                    ])
                                  ])
                                ])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "row" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("div", { class: "scroll-container-3 scroll-container-lg-2 bg-secondary bg-opacity-25 px-2 pt-2 rounded mt-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.budget_list, (budget) => {
                                  return openBlock(), createBlock("div", { class: "card card-bg-hover shadow mb-2 py-1" }, [
                                    createVNode("div", { class: "row" }, [
                                      createVNode("div", { class: "col-12 d-flex" }, [
                                        createVNode("span", { class: "text-primary-emphasis ms-2 my-auto" }, toDisplayString(budget.name), 1),
                                        createVNode("span", { class: "fw-light ms-2 d-none d-lg-flex my-auto" }, toDisplayString("- " + unref(formatIDR)(
                                          budget.price
                                        ) + " /" + budget.unit), 1),
                                        createVNode("span", { class: "fw-light ms-auto d-none d-lg-flex my-auto" }, toDisplayString("total (" + budget.qty + ") : "), 1),
                                        createVNode("span", { class: "fw-normal mx-2 d-none d-lg-flex my-auto" }, toDisplayString(unref(formatIDR)(
                                          budget.total_price
                                        )), 1),
                                        unref(auth_user).id == __props.program.pic_id && __props.program.financial_id <= 0 ? (openBlock(), createBlock("button", {
                                          key: 0,
                                          class: "ms-auto ms-lg-1 me-2 btn btn-sm btn-danger",
                                          onClick: ($event) => confirmation(
                                            _ctx.route(
                                              "program.budget.delete",
                                              {
                                                id: budget.id
                                              }
                                            ),
                                            "Are you sure want to delete " + budget.name + " from " + __props.program.name + " Program Budget?"
                                          )
                                        }, [
                                          createVNode("i", { class: "bi bi-trash" })
                                        ], 8, ["onClick"])) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "row d-lg-none" }, [
                                      createVNode("div", { class: "col-12 d-flex" }, [
                                        createVNode("span", { class: "fw-light ms-2" }, toDisplayString(unref(formatIDR)(
                                          budget.price
                                        ) + " /" + budget.unit), 1),
                                        createVNode("span", { class: "fw-light ms-auto" }, toDisplayString("total (" + budget.qty + ") : "), 1),
                                        createVNode("span", { class: "fw-normal mx-2" }, toDisplayString(unref(formatIDR)(
                                          budget.total_price
                                        )), 1)
                                      ])
                                    ])
                                  ]);
                                }), 256))
                              ])
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["onAfterLeave"]),
                    createVNode(Transition, {
                      name: prev_tab.value > 2 || next_tab.value > 2 ? "fade-slide-ltr" : "fade-slide-rtl",
                      onAfterLeave: ($event) => proceed_show_tab()
                    }, {
                      default: withCtx(() => [
                        active_tab.value == 2 ? (openBlock(), createBlock("div", {
                          key: 0,
                          id: "content_2"
                        }, [
                          createVNode("div", { class: "row justify-content-center" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("nav", { class: "navbar rounded bg-white shadow-sm p-2" }, [
                                createVNode("form", {
                                  method: "post",
                                  id: "formDisbursementFilter",
                                  onSubmit: withModifiers(($event) => handleSubmitDisbursementFilter(
                                    $event,
                                    _ctx.route(
                                      "program.disbursement.filter",
                                      { id: __props.program.id }
                                    )
                                  ), ["prevent"])
                                }, null, 40, ["onSubmit"]),
                                createVNode("div", { class: "container d-block px-0" }, [
                                  createVNode("div", { class: "row" }, [
                                    createVNode("div", { class: "col-12 d-flex" }, [
                                      createVNode("div", { class: "input-group bg-body-tertiary rounded" }, [
                                        createVNode("button", {
                                          type: "button",
                                          class: "btn btn-sm rounded-0 rounded-start text-light bg-secondary"
                                        }, [
                                          createVNode("i", { class: "bi bi-funnel-fill" }),
                                          createVNode("span", { class: "ms-1 ps-2 border-start border-light d-none d-md-inline" }, toDisplayString("Filter"))
                                        ]),
                                        createVNode("button", {
                                          type: "submit",
                                          form: "formDisbursementFilter",
                                          class: "btn btn-sm btn-outline-secondary border-0 rounded-0 my-0",
                                          onClick: ($event) => filterDisbursementAction(
                                            "price"
                                          )
                                        }, [
                                          createVNode("span", { class: "me-1" }, toDisplayString("Price")),
                                          createVNode("i", {
                                            class: "bi bi-sort-numeric-" + (__props.filter["disbursement"]["category"] == "price" && __props.filter["disbursement"]["order"] == "asc" ? "up" : "down") + "-alt"
                                          }, null, 2)
                                        ], 8, ["onClick"]),
                                        createVNode("button", {
                                          type: "submit",
                                          form: "formDisbursementFilter",
                                          onClick: ($event) => filterDisbursementAction(
                                            "trashed"
                                          ),
                                          class: "btn btn-sm btn-outline-secondary " + (__props.filter["disbursement"]["trashed"] == "trashed" ? "active" : "") + " border-0 rounded-0 my-0"
                                        }, [
                                          createVNode("span", { class: "me-1" }, toDisplayString("Trashed")),
                                          createVNode("i", { class: "bi bi-trash3" })
                                        ], 10, ["onClick"])
                                      ]),
                                      unref(auth_user).roles_id == 2 ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        onClick: ($event) => __props.program.financial_id == 0 ? alertNotification(
                                          "You can add Disbursement Item after Program Budget approved by Financial Officer."
                                        ) : ""
                                      }, [
                                        createVNode("button", {
                                          class: "ms-2 btn btn-sm btn-outline-primary border-0 " + (__props.program.financial_id > 0 ? "" : " disabled"),
                                          onClick: ($event) => showAddDisbursementModal(
                                            true
                                          )
                                        }, [
                                          createVNode("i", { class: "bi bi-plus-lg" })
                                        ], 10, ["onClick"])
                                      ], 8, ["onClick"])) : createCommentVNode("", true),
                                      __props.program.financial_id > 0 ? (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "modal fade",
                                        id: "addProgramDisbursement",
                                        tabindex: "-1",
                                        "aria-labelledby": "exampleModalLabel",
                                        "aria-hidden": "true"
                                      }, [
                                        createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                                          createVNode("div", { class: "modal-content shadow mx-3" }, [
                                            createVNode("div", { class: "modal-header py-1 ps-3 pe-2" }, [
                                              createVNode("span", { class: "modal-title fs-5 text-primary-emphasis" }, [
                                                createVNode("i", { class: "bi bi-wallet2 border-secondary border-end me-2 pe-2" }),
                                                createTextVNode(" " + toDisplayString("New Disbursement Item"))
                                              ]),
                                              createVNode("button", {
                                                type: "button",
                                                class: "btn btn-sm ms-auto",
                                                onClick: ($event) => showAddDisbursementModal(
                                                  false
                                                )
                                              }, [
                                                createVNode("i", { class: "bi bi-x-lg" })
                                              ], 8, ["onClick"])
                                            ]),
                                            createVNode("form", {
                                              method: "post",
                                              enctype: "multipart/form-data",
                                              onSubmit: withModifiers(($event) => handleSubmitAddDisbursement(
                                                $event,
                                                _ctx.route(
                                                  "program.disbursement.add",
                                                  {
                                                    id: __props.program.id
                                                  }
                                                )
                                              ), ["prevent"])
                                            }, [
                                              createVNode("div", { class: "modal-body bg-light" }, [
                                                createVNode("div", { class: "row justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3" }, [
                                                    createVNode("label", {
                                                      for: "add_disbursement_name",
                                                      class: "form-label d-inline-block"
                                                    }, "Name")
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    withDirectives(createVNode("input", {
                                                      type: "text",
                                                      class: "form-control form-control-sm d-inline-block",
                                                      id: "add_disbursement_name",
                                                      "onUpdate:modelValue": ($event) => unref(formAddDisbursement).name = $event,
                                                      required: ""
                                                    }, null, 8, ["onUpdate:modelValue"]), [
                                                      [
                                                        vModelText,
                                                        unref(formAddDisbursement).name
                                                      ]
                                                    ]),
                                                    createVNode(_sfc_main$4, {
                                                      message: unref(formAddDisbursement).errors.name
                                                    }, null, 8, ["message"])
                                                  ])
                                                ]),
                                                createVNode("div", { class: "row mt-2 justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3" }, [
                                                    createVNode("label", {
                                                      for: "add_disbursement_price",
                                                      class: "form-label d-inline-block"
                                                    }, "Price")
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    withDirectives(createVNode("input", {
                                                      type: "number",
                                                      class: "form-control form-control-sm d-inline-block",
                                                      name: "price",
                                                      "onUpdate:modelValue": ($event) => unref(formAddDisbursement).price = $event,
                                                      placeholder: "Type numbers only",
                                                      required: ""
                                                    }, null, 8, ["onUpdate:modelValue"]), [
                                                      [
                                                        vModelText,
                                                        unref(formAddDisbursement).price
                                                      ]
                                                    ]),
                                                    createVNode(_sfc_main$4, {
                                                      message: unref(formAddDisbursement).errors.price
                                                    }, null, 8, ["message"])
                                                  ])
                                                ]),
                                                createVNode("div", { class: "row mt-2 justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3" }, [
                                                    createVNode("label", {
                                                      for: "add_disbursement_letter",
                                                      class: "form-label d-inline-block"
                                                    }, toDisplayString("Letter"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    withDirectives(createVNode("select", {
                                                      "onUpdate:modelValue": ($event) => unref(formAddDisbursement).letter_id = $event,
                                                      class: "form-select py-0 d-inline",
                                                      id: "add_disbursement_letter"
                                                    }, [
                                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.disbursement_letter_list.filter(
                                                        (item) => !item.disbursement
                                                      ), (disbursement_letter2, index) => {
                                                        return openBlock(), createBlock("option", {
                                                          value: disbursement_letter2.id,
                                                          key: disbursement_letter2.id,
                                                          selected: index == 1
                                                        }, toDisplayString("disbursement_letter... " + (index + 1)), 9, ["value", "selected"]);
                                                      }), 128))
                                                    ], 8, ["onUpdate:modelValue"]), [
                                                      [
                                                        vModelSelect,
                                                        unref(formAddDisbursement).letter_id
                                                      ]
                                                    ])
                                                  ])
                                                ]),
                                                createVNode("div", { class: "row mt-2 justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3" }, [
                                                    createVNode("label", {
                                                      for: "add_disbursement_receipt",
                                                      class: "form-label d-inline-block"
                                                    }, toDisplayString("Receipt"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    createVNode("input", {
                                                      type: "file",
                                                      class: "form-control form-control-sm",
                                                      onChange: handleFileAddDisbursementReceipt,
                                                      id: "add_disbursement_receipt"
                                                    }, null, 40, ["onChange"]),
                                                    createVNode(_sfc_main$4, {
                                                      message: unref(formAddDisbursement).errors.receipt
                                                    }, null, 8, ["message"]),
                                                    createVNode("label", {
                                                      for: "blaterian_balance",
                                                      class: "inline-flex items-center mt-1"
                                                    }, [
                                                      withDirectives(createVNode("input", {
                                                        id: "blaterian_balance",
                                                        type: "checkbox",
                                                        name: "blaterian_balance",
                                                        "onUpdate:modelValue": ($event) => unref(formAddDisbursement).blaterian_balance = $event,
                                                        class: "rounded"
                                                      }, null, 8, ["onUpdate:modelValue"]), [
                                                        [
                                                          vModelCheckbox,
                                                          unref(formAddDisbursement).blaterian_balance
                                                        ]
                                                      ]),
                                                      createVNode("span", { class: "ms-2 text-sm" }, toDisplayString("For Blaterian Balance"))
                                                    ])
                                                  ])
                                                ]),
                                                unref(formAddDisbursement).blaterian_balance ? (openBlock(), createBlock("div", {
                                                  key: 0,
                                                  class: "row mt-2 justify-content-center",
                                                  id: "add_blaterian_disbursement_container"
                                                }, [
                                                  createVNode("div", { class: "col-4 col-lg-3" }, [
                                                    createVNode("label", {
                                                      for: "add_disbursement_price",
                                                      class: "form-label d-inline-block"
                                                    }, toDisplayString("Blaterian"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    createVNode("div", { class: "input-group input-group-sm" }, [
                                                      withDirectives(createVNode("select", {
                                                        "onUpdate:modelValue": ($event) => unref(formAddDisbursement).blaterian_disbursement = $event,
                                                        class: "form-select py-0 d-inline",
                                                        id: "add_blaterian_disbursement"
                                                      }, [
                                                        createVNode("option", {
                                                          value: "foods",
                                                          selected: ""
                                                        }, toDisplayString("Food")),
                                                        createVNode("option", { value: "goods" }, toDisplayString("Good"))
                                                      ], 8, ["onUpdate:modelValue"]), [
                                                        [
                                                          vModelSelect,
                                                          unref(formAddDisbursement).blaterian_disbursement
                                                        ]
                                                      ]),
                                                      createVNode("label", {
                                                        for: "add_blaterian_disbursement",
                                                        class: "input-group-text"
                                                      }, toDisplayString("Balance"))
                                                    ])
                                                  ])
                                                ])) : createCommentVNode("", true)
                                              ]),
                                              createVNode("div", { class: "modal-footer p-1" }, [
                                                createVNode("button", {
                                                  type: "submit",
                                                  class: "btn btn-sm btn-primary"
                                                }, toDisplayString("Add"))
                                              ])
                                            ], 40, ["onSubmit"])
                                          ])
                                        ])
                                      ])) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  createVNode("div", { class: "row mt-2" }, [
                                    createVNode("div", { class: "col-12 d-flex" }, [
                                      createVNode("span", { class: "fw-light d-none d-lg-inline me-1 my-auto" }, toDisplayString("Disbursement ")),
                                      createVNode("span", { class: "fw-light my-auto me-1" }, toDisplayString("Letter :")),
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.disbursement_letter_list.filter(
                                        (disbursement_letter2) => !disbursement_letter2.disbursement
                                      ), (disbursement_letter2, disbursement_letter_index) => {
                                        return openBlock(), createBlock("button", {
                                          class: "me-1 btn btn-sm btn-outline-primary border-0 py-0 position-relative",
                                          key: disbursement_letter2.id,
                                          "data-bs-toggle": "modal",
                                          "data-bs-target": "#disbursementLetterModal",
                                          onClick: ($event) => setLetter(
                                            disbursement_letter2,
                                            false
                                          )
                                        }, [
                                          createTextVNode(toDisplayString(disbursement_letter_index + 1) + " ", 1),
                                          createVNode("i", { class: "bi bi-envelope-exclamation" })
                                        ], 8, ["onClick"]);
                                      }), 128)),
                                      createVNode("div", {
                                        class: "modal fade",
                                        id: "disbursementLetterModal",
                                        tabindex: "-1",
                                        "aria-labelledby": "disbursementLetterModal",
                                        "aria-hidden": "true"
                                      }, [
                                        createVNode("div", { class: "modal-dialog modal-lg modal-dialog-centered" }, [
                                          createVNode("div", { class: "modal-content shadow mx-3 mt-5" }, [
                                            createVNode("div", { class: "modal-header py-1 ps-3 pe-2" }, [
                                              createVNode("span", { class: "modal-title fs-5 text-primary-emphasis" }, [
                                                createVNode("i", { class: "bi bi-envelope border-secondary border-end me-2 pe-2" }),
                                                createTextVNode(" " + toDisplayString("Disbursement Letter"))
                                              ]),
                                              createVNode("button", {
                                                type: "button",
                                                class: "btn btn-sm ms-auto",
                                                onClick: ($event) => showLetterModal(
                                                  false
                                                )
                                              }, [
                                                createVNode("i", { class: "bi bi-x-lg" })
                                              ], 8, ["onClick"])
                                            ]),
                                            createVNode("div", { class: "modal-body bg-light p-1 px-3" }, [
                                              createVNode("div", { class: "row justify-content-center mt-2" }, [
                                                createVNode("div", { class: "col-12 d-flex ratio ratio-16x9" }, [
                                                  (openBlock(), createBlock(Transition, {
                                                    name: "fade",
                                                    mode: "out-in",
                                                    key: disbursement_letter.value.link
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode("iframe", {
                                                        id: "disbursement_letter",
                                                        src: disbursement_letter.value.link,
                                                        frameborder: "0"
                                                      }, null, 8, ["src"])
                                                    ]),
                                                    _: 1
                                                  }))
                                                ])
                                              ]),
                                              createVNode("div", { class: "row justify-content-center" }, [
                                                createVNode("div", { class: "col-12 d-flex" }, [
                                                  createVNode("a", {
                                                    href: disbursement_letter.value.link,
                                                    target: "blank",
                                                    class: "mx-auto text-decoration-none",
                                                    id: "disbursement_letter_download",
                                                    download: ""
                                                  }, [
                                                    createVNode("button", { class: "btn btn-sm btn-light" }, [
                                                      createVNode("span", {
                                                        class: "fw-light d-none d-lg-inline",
                                                        id: "disbursement_letter_name"
                                                      }),
                                                      createVNode("span", { class: "fw-light" }, toDisplayString(disbursement_letter.value.letter), 1),
                                                      createVNode("i", { class: "bi bi-download text-primary ms-2" })
                                                    ])
                                                  ], 8, ["href"])
                                                ])
                                              ])
                                            ]),
                                            createVNode("div", { class: "modal-footer p-1 px-2" }, [
                                              createVNode("div", { class: "row" }, [
                                                createVNode("div", { class: "col-12 d-flex px-0" }, [
                                                  createVNode("div", { class: "input-group input-group-sm ms-auto" }, [
                                                    unref(auth_user).id == __props.program.pic_id && !disbursement_letter.value.valid ? (openBlock(), createBlock("button", {
                                                      key: 0,
                                                      onClick: ($event) => confirmation(
                                                        _ctx.route(
                                                          "program.disbursement.letter.delete",
                                                          {
                                                            id: disbursement_letter.value.id
                                                          }
                                                        ),
                                                        "Are you sure want to delete " + disbursement_letter.value.letter + " from disbursement letter list?"
                                                      ),
                                                      id: "disbursement_letter_delete",
                                                      class: "btn btn-sm btn-danger text-decoration-none"
                                                    }, toDisplayString("Delete"), 8, ["onClick"])) : createCommentVNode("", true),
                                                    createVNode("button", {
                                                      "data-bs-dismiss": "modal",
                                                      "aria-label": "Close",
                                                      class: "btn btn-sm btn-secondary"
                                                    }, toDisplayString("Close"))
                                                  ])
                                                ])
                                              ])
                                            ])
                                          ])
                                        ])
                                      ]),
                                      unref(auth_user).id == __props.program.pic_id ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "ms-auto",
                                        onClick: ($event) => __props.program.financial_id > 0 ? "" : alertNotification(
                                          "You can add Disbursement Letter after Program Budget approved by Financial Officer."
                                        )
                                      }, [
                                        createVNode("button", {
                                          class: "btn btn-sm btn-outline-primary border-0 " + (__props.program.financial_id > 0 ? "" : " disabled"),
                                          onClick: ($event) => showAddDisbursementLetterModal(
                                            true
                                          )
                                        }, [
                                          createVNode("i", { class: "bi bi-envelope-plus" })
                                        ], 10, ["onClick"])
                                      ], 8, ["onClick"])) : createCommentVNode("", true),
                                      unref(auth_user).id == __props.program.pic_id && __props.program.financial_id > 0 ? (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "modal fade",
                                        id: "addProgramDisbursementLetter",
                                        tabindex: "-1",
                                        "aria-labelledby": "exampleModalLabel",
                                        "aria-hidden": "true"
                                      }, [
                                        createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                                          createVNode("div", { class: "modal-content shadow mx-3" }, [
                                            createVNode("div", { class: "modal-header py-1 ps-3 pe-2" }, [
                                              createVNode("span", {
                                                class: "modal-title fs-5 text-primary-emphasis",
                                                id: "exampleModalLabel"
                                              }, [
                                                createVNode("i", { class: "bi bi-wallet2 border-secondary border-end me-2 pe-2" }),
                                                createTextVNode(" " + toDisplayString("New Disbursement Letter"))
                                              ]),
                                              createVNode("button", {
                                                type: "button",
                                                class: "btn btn-sm ms-auto",
                                                onClick: ($event) => showAddDisbursementLetterModal(
                                                  false
                                                )
                                              }, [
                                                createVNode("i", { class: "bi bi-x-lg" })
                                              ], 8, ["onClick"])
                                            ]),
                                            createVNode("form", {
                                              method: "post",
                                              enctype: "multipart/form-data",
                                              onSubmit: withModifiers(($event) => handleSubmitAddDisbursementLetter(
                                                $event,
                                                _ctx.route(
                                                  "program.disbursement.letter.add",
                                                  {
                                                    id: __props.program.id
                                                  }
                                                )
                                              ), ["prevent"])
                                            }, [
                                              createVNode("div", { class: "modal-body bg-light" }, [
                                                createVNode("div", { class: "row justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3" }, [
                                                    createVNode("label", {
                                                      for: "add_disbursement_letter",
                                                      class: "form-label d-inline-block"
                                                    }, toDisplayString("Letter"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    createVNode("input", {
                                                      type: "file",
                                                      class: "form-control form-control-sm",
                                                      id: "add_disbursement_letter",
                                                      onChange: handleFileAddDisbursementLetter
                                                    }, null, 40, ["onChange"]),
                                                    createVNode(_sfc_main$4, {
                                                      message: unref(formAddDisbursementLetter).errors.letter
                                                    }, null, 8, ["message"])
                                                  ])
                                                ])
                                              ]),
                                              createVNode("div", { class: "modal-footer p-1" }, [
                                                createVNode("button", {
                                                  type: "submit",
                                                  class: "btn btn-sm btn-primary"
                                                }, toDisplayString("Add"))
                                              ])
                                            ], 40, ["onSubmit"])
                                          ])
                                        ])
                                      ])) : createCommentVNode("", true)
                                    ])
                                  ])
                                ])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "row" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("div", { class: "scroll-container-3 scroll-container-lg-2 bg-secondary bg-opacity-25 px-2 pt-2 rounded mt-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.disbursement_list, (disbursement) => {
                                  return openBlock(), createBlock("div", { class: "card card-bg-hover shadow mb-2 py-1" }, [
                                    createVNode("div", { class: "row" }, [
                                      createVNode("div", { class: "col-12 d-flex" }, [
                                        createVNode("span", { class: "text-primary-emphasis ms-2 my-auto scroll-x-hidden text-nowrap me-2" }, toDisplayString(disbursement.name), 1),
                                        createVNode("span", { class: "fw-light ms-2 d-none d-lg-flex my-auto scroll-x-hidden text-nowrap me-3" }, toDisplayString("by " + disbursement.financial.name), 1),
                                        createVNode("span", { class: "fw-light ms-auto d-none d-lg-flex my-auto text-nowrap" }, toDisplayString("price : ")),
                                        createVNode("span", { class: "fw-normal mx-2 d-none d-lg-flex my-auto" }, toDisplayString(unref(formatIDR)(
                                          disbursement.price
                                        )), 1),
                                        disbursement.deleted_at == null ? (openBlock(), createBlock("button", {
                                          key: 0,
                                          class: "ms-auto ms-lg-1 btn btn-sm btn-outline-secondary border-0 position-relative",
                                          onClick: () => {
                                            setLetter(
                                              disbursement.letter,
                                              true
                                            );
                                            showLetterModal(
                                              true
                                            );
                                          }
                                        }, [
                                          createVNode("i", { class: "bi bi-envelope-paper" })
                                        ], 8, ["onClick"])) : createCommentVNode("", true),
                                        createVNode("div", { class: "border-start border-1 h-100 mx-1" }),
                                        createVNode("button", {
                                          class: " btn btn-sm btn-outline-secondary border-0 me-1 ",
                                          onClick: ($event) => setDisbursementReceipt(
                                            disbursement.reciept
                                          )
                                        }, [
                                          createVNode("i", { class: "bi bi-receipt" })
                                        ], 8, ["onClick"]),
                                        unref(auth_user).roles_id == 2 && __props.filter["disbursement"]["trashed"] !== "trashed" ? (openBlock(), createBlock("div", {
                                          key: 1,
                                          class: "border-start border-1 h-100 me-1"
                                        })) : createCommentVNode("", true),
                                        unref(auth_user).roles_id == 2 && __props.filter["disbursement"]["trashed"] !== "trashed" ? (openBlock(), createBlock("button", {
                                          key: 2,
                                          class: "me-2 btn btn-sm btn-outline-danger border-0",
                                          onClick: ($event) => confirmation(
                                            _ctx.route(
                                              "program.disbursement.delete",
                                              {
                                                id: disbursement.id
                                              }
                                            ),
                                            "Are you sure want to delete " + disbursement.name + " from " + __props.program.name + " Program Disbursement?"
                                          )
                                        }, [
                                          createVNode("i", { class: "bi bi-trash" })
                                        ], 8, ["onClick"])) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "row d-lg-none" }, [
                                      createVNode("div", { class: "col-12 d-flex" }, [
                                        createVNode("span", { class: "fw-light ms-2" }, toDisplayString("by " + disbursement.financial.name), 1),
                                        createVNode("span", { class: "fw-light ms-auto" }, toDisplayString("price : ")),
                                        createVNode("span", { class: "fw-normal mx-2" }, toDisplayString(unref(formatIDR)(
                                          disbursement.price
                                        )), 1)
                                      ])
                                    ])
                                  ]);
                                }), 256))
                              ])
                            ]),
                            createVNode("div", {
                              class: "modal fade",
                              id: "receiptDisbursementModal",
                              tabindex: "-1",
                              "aria-labelledby": "receiptDisbursementModal",
                              "aria-hidden": "true"
                            }, [
                              createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                                createVNode("div", { class: "modal-content shadow mx-3 mt-5" }, [
                                  createVNode("div", { class: "modal-header py-1 ps-3 pe-2" }, [
                                    createVNode("span", { class: "modal-title fs-5 text-primary-emphasis" }, [
                                      createVNode("i", { class: "bi bi-receipt border-secondary border-end me-2 pe-2" }),
                                      createTextVNode(" " + toDisplayString("Disbursement Receipt"))
                                    ]),
                                    createVNode("button", {
                                      type: "button",
                                      class: "btn btn-sm ms-auto",
                                      onClick: ($event) => showReceiptDisbursementModal(
                                        false
                                      )
                                    }, [
                                      createVNode("i", { class: "bi bi-x-lg" })
                                    ], 8, ["onClick"])
                                  ]),
                                  createVNode("div", { class: "modal-body bg-light p-1 px-3" }, [
                                    createVNode("div", { class: "row justify-content-center mt-2" }, [
                                      createVNode("div", { class: "col-12 d-flex" }, [
                                        createVNode("img", {
                                          src: disbursement_receipt.value.link,
                                          alt: "image",
                                          class: "rounded mx-auto " + placeholder.value,
                                          onLoad: ($event) => _ctx.showImage(this),
                                          style: {
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            maxHeight: "320px"
                                          },
                                          id: "disbursement_receipt_image"
                                        }, null, 42, ["src", "onLoad"])
                                      ])
                                    ]),
                                    createVNode("div", { class: "row justify-content-center" }, [
                                      createVNode("div", { class: "col-12 d-flex" }, [
                                        createVNode("a", {
                                          href: disbursement_receipt.value.link,
                                          target: "blank",
                                          class: "mx-auto text-decoration-none",
                                          id: "disbursement_receipt_download",
                                          download: ""
                                        }, [
                                          createVNode("button", { class: "btn btn-sm btn-light" }, [
                                            createVNode("span", { class: "fw-light" }, toDisplayString(disbursement_receipt.value.image), 1),
                                            createVNode("i", { class: "bi bi-download text-primary ms-2" })
                                          ])
                                        ], 8, ["href"])
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", { class: "modal-footer p-1 px-2" }, [
                                    createVNode("button", {
                                      "data-bs-dismiss": "modal",
                                      "aria-label": "Close",
                                      class: "btn btn-sm btn-secondary"
                                    }, toDisplayString("Close"))
                                  ])
                                ])
                              ])
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["name", "onAfterLeave"]),
                    createVNode(Transition, {
                      name: prev_tab.value > 3 || next_tab.value > 3 ? "fade-slide-ltr" : "fade-slide-rtl",
                      onAfterLeave: ($event) => proceed_show_tab()
                    }, {
                      default: withCtx(() => [
                        active_tab.value == 3 ? (openBlock(), createBlock("div", {
                          key: 0,
                          id: "content_3"
                        }, [
                          createVNode("div", { class: "row justify-content-center" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("nav", { class: "navbar rounded bg-white shadow-sm p-2" }, [
                                createVNode("form", {
                                  method: "post",
                                  id: "formExpenseFilter",
                                  onSubmit: withModifiers(($event) => handleSubmitExpenseFilter(
                                    $event,
                                    _ctx.route(
                                      "program.expense.filter",
                                      { id: __props.program.id }
                                    )
                                  ), ["prevent"])
                                }, null, 40, ["onSubmit"]),
                                createVNode("div", { class: "container d-block px-0" }, [
                                  createVNode("div", { class: "row" }, [
                                    createVNode("div", { class: "col-12 d-flex" }, [
                                      createVNode("div", { class: "input-group input-group-sm bg-body-tertiary rounded" }, [
                                        createVNode("button", {
                                          type: "button",
                                          class: "btn btn-sm rounded-0 rounded-start text-light bg-secondary"
                                        }, [
                                          createVNode("i", { class: "bi bi-funnel-fill" }),
                                          createVNode("span", { class: "ms-1 ps-2 border-start border-light d-none d-md-inline" }, toDisplayString("Filter"))
                                        ]),
                                        createVNode("button", {
                                          type: "submit",
                                          form: "formExpenseFilter",
                                          class: "btn btn-sm btn-outline-secondary border-0 rounded-0 my-0",
                                          onClick: ($event) => expenseFilterCategory(
                                            "name"
                                          )
                                        }, [
                                          createVNode("span", { class: "me-1" }, toDisplayString("Name")),
                                          createVNode("i", {
                                            class: "bi bi-sort-numeric-" + (__props.filter["expense"]["category"] == "name" && __props.filter["expense"]["order"] == "asc" ? "up" : "down") + "-alt"
                                          }, null, 2)
                                        ], 8, ["onClick"]),
                                        createVNode("button", {
                                          type: "submit",
                                          form: "formExpenseFilter",
                                          class: "btn btn-sm btn-outline-secondary border-0 rounded-0 my-0",
                                          onClick: ($event) => expenseFilterCategory(
                                            "total_price"
                                          )
                                        }, [
                                          createVNode("span", { class: "me-1" }, toDisplayString("Price")),
                                          createVNode("i", {
                                            class: "bi bi-sort-numeric-" + (__props.filter["expense"]["category"] == "total_price" && __props.filter["expense"]["order"] == "asc" ? "up" : "down") + "-alt"
                                          }, null, 2)
                                        ], 8, ["onClick"]),
                                        createVNode("button", {
                                          type: "submit",
                                          form: "formExpenseFilter",
                                          class: "btn btn-sm btn-outline-secondary border-0 rounded-0 my-0",
                                          onClick: ($event) => expenseFilterCategory(
                                            "financial_id"
                                          )
                                        }, [
                                          createVNode("span", { class: "me-1" }, toDisplayString("Valid")),
                                          createVNode("i", {
                                            class: "bi bi-sort-numeric-" + (__props.filter["expense"]["category"] == "financial_id" && __props.filter["expense"]["order"] == "asc" ? "up" : "down") + "-alt"
                                          }, null, 2)
                                        ], 8, ["onClick"])
                                      ]),
                                      unref(auth_user).id == __props.program.pic_id ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        onClick: ($event) => __props.program.financial_id > 0 ? "" : alertNotification(
                                          "You can add Expense Item after Program Budget approved by Financial Officer."
                                        )
                                      }, [
                                        createVNode("button", {
                                          class: "ms-2 btn btn-sm btn-outline-primary border-0 " + (__props.program.financial_id > 0 ? "" : " disabled"),
                                          onClick: ($event) => showAddExpenseModal(
                                            true
                                          )
                                        }, [
                                          createVNode("i", { class: "bi bi-plus-lg" })
                                        ], 10, ["onClick"])
                                      ], 8, ["onClick"])) : createCommentVNode("", true),
                                      unref(auth_user).id == __props.program.pic_id && __props.program.financial_id > 0 ? (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "modal fade",
                                        id: "addProgramExpense",
                                        tabindex: "-1",
                                        "aria-labelledby": "exampleModalLabel",
                                        "aria-hidden": "true"
                                      }, [
                                        createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                                          createVNode("div", { class: "modal-content shadow mx-3" }, [
                                            createVNode("div", { class: "modal-header py-1 ps-3 pe-2" }, [
                                              createVNode("span", {
                                                class: "modal-title fs-5 text-primary-emphasis",
                                                id: "exampleModalLabel"
                                              }, [
                                                createVNode("i", { class: "bi bi-cart-plus border-secondary border-end me-2 pe-2" }),
                                                createTextVNode(" " + toDisplayString("New Expense Item"))
                                              ]),
                                              createVNode("button", {
                                                type: "button",
                                                class: "btn btn-sm ms-auto",
                                                onClick: ($event) => showAddExpenseModal(
                                                  false
                                                )
                                              }, [
                                                createVNode("i", { class: "bi bi-x-lg" })
                                              ], 8, ["onClick"])
                                            ]),
                                            createVNode("form", {
                                              method: "post",
                                              enctype: "multipart/form-data",
                                              onSubmit: withModifiers(($event) => handleSubmitAddExpense(
                                                $event,
                                                _ctx.route(
                                                  "program.expense.add",
                                                  {
                                                    id: __props.program.id
                                                  }
                                                )
                                              ), ["prevent"])
                                            }, [
                                              createVNode("div", { class: "modal-body bg-light" }, [
                                                createVNode("div", { class: "row justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3 d-flex" }, [
                                                    createVNode("label", {
                                                      for: "add_expense_name",
                                                      class: "form-label d-inline-block my-auto"
                                                    }, toDisplayString("Name"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    withDirectives(createVNode("input", {
                                                      type: "text",
                                                      class: "form-control form-control-sm d-inline-block",
                                                      name: "name",
                                                      "onUpdate:modelValue": ($event) => unref(formAddExpense).name = $event,
                                                      required: ""
                                                    }, null, 8, ["onUpdate:modelValue"]), [
                                                      [
                                                        vModelText,
                                                        unref(formAddExpense).name
                                                      ]
                                                    ]),
                                                    createVNode(_sfc_main$4, {
                                                      message: unref(formAddExpense).errors.name
                                                    }, null, 8, ["message"])
                                                  ])
                                                ]),
                                                createVNode("div", { class: "row mt-2 justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3 d-flex" }, [
                                                    createVNode("label", {
                                                      for: "add_expense_price",
                                                      class: "form-label d-inline-block my-auto"
                                                    }, "Price")
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    withDirectives(createVNode("input", {
                                                      type: "number",
                                                      class: "form-control form-control-sm d-inline-block",
                                                      name: "price",
                                                      id: "add_expense_price",
                                                      "onUpdate:modelValue": ($event) => unref(formAddExpense).price = $event,
                                                      placeholder: "Type numbers only",
                                                      required: ""
                                                    }, null, 8, ["onUpdate:modelValue"]), [
                                                      [
                                                        vModelText,
                                                        unref(formAddExpense).price
                                                      ]
                                                    ]),
                                                    createVNode(_sfc_main$4, {
                                                      message: unref(formAddExpense).errors.price
                                                    }, null, 8, ["message"])
                                                  ])
                                                ]),
                                                createVNode("div", { class: "row mt-2 justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3 d-flex" }, [
                                                    createVNode("label", {
                                                      for: "add_expense_unit",
                                                      class: "form-label d-inline-block my-auto"
                                                    }, "Unit")
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    withDirectives(createVNode("input", {
                                                      type: "text",
                                                      class: "form-control form-control-sm d-inline-block",
                                                      name: "unit",
                                                      placeholder: "gram, ml, pcs, etc..",
                                                      "onUpdate:modelValue": ($event) => unref(formAddExpense).unit = $event,
                                                      required: ""
                                                    }, null, 8, ["onUpdate:modelValue"]), [
                                                      [
                                                        vModelText,
                                                        unref(formAddExpense).unit
                                                      ]
                                                    ]),
                                                    createVNode(_sfc_main$4, {
                                                      message: unref(formAddExpense).errors.unit
                                                    }, null, 8, ["message"])
                                                  ])
                                                ]),
                                                createVNode("div", { class: "row mt-2 justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3 d-flex" }, [
                                                    createVNode("label", {
                                                      for: "add_expense_qty",
                                                      class: "form-label d-inline-block my-auto"
                                                    }, "Quantity")
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    withDirectives(createVNode("input", {
                                                      type: "number",
                                                      class: "form-control form-control-sm d-inline-block",
                                                      name: "qty",
                                                      id: "add_expense_qty",
                                                      placeholder: "Type numbers only",
                                                      "onUpdate:modelValue": ($event) => unref(formAddExpense).qty = $event,
                                                      required: ""
                                                    }, null, 8, ["onUpdate:modelValue"]), [
                                                      [
                                                        vModelText,
                                                        unref(formAddExpense).qty
                                                      ]
                                                    ]),
                                                    createVNode(_sfc_main$4, {
                                                      message: unref(formAddExpense).errors.qty
                                                    }, null, 8, ["message"])
                                                  ])
                                                ]),
                                                createVNode("div", { class: "row mt-2 justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3 d-flex" }, [
                                                    createVNode("span", null, toDisplayString("Total Price"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    createVNode("span", null, toDisplayString(unref(formatIDR)(
                                                      unref(formAddExpense).price * unref(formAddExpense).qty
                                                    )), 1)
                                                  ])
                                                ]),
                                                createVNode("div", { class: "row mt-2 justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3 d-flex" }, [
                                                    createVNode("label", {
                                                      for: "add_expense_receipt",
                                                      class: "form-label d-inline-block my-auto"
                                                    }, toDisplayString("Receipt"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    !unref(formAddExpense).same_receipt_check ? (openBlock(), createBlock("input", {
                                                      key: 0,
                                                      type: "file",
                                                      class: "form-control form-control-sm",
                                                      name: "reciept",
                                                      onChange: ($event) => handleFileAddExpenseReceipt(
                                                        $event
                                                      )
                                                    }, null, 40, ["onChange"])) : createCommentVNode("", true),
                                                    createVNode(_sfc_main$4, {
                                                      message: unref(formAddExpense).errors.reciept
                                                    }, null, 8, ["message"]),
                                                    unref(formAddExpense).same_receipt_check ? (openBlock(), createBlock("div", {
                                                      key: 1,
                                                      class: "input-group input-group-sm",
                                                      id: "add_expense_receipt_same_container"
                                                    }, [
                                                      createVNode("label", {
                                                        for: "add_expense_receipt_same",
                                                        class: "input-group-text"
                                                      }, toDisplayString("Same as item")),
                                                      withDirectives(createVNode("select", {
                                                        "onUpdate:modelValue": ($event) => unref(formAddExpense).receipt_same = $event,
                                                        class: "form-select py-0 d-inline",
                                                        id: "add_expense_receipt_same"
                                                      }, [
                                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.expense_list, (expense) => {
                                                          return openBlock(), createBlock("option", {
                                                            value: expense.id,
                                                            selected: __props.expense_list.indexOf(
                                                              expense
                                                            ) == 1
                                                          }, toDisplayString(expense.name), 9, ["value", "selected"]);
                                                        }), 256))
                                                      ], 8, ["onUpdate:modelValue"]), [
                                                        [
                                                          vModelSelect,
                                                          unref(formAddExpense).receipt_same
                                                        ]
                                                      ])
                                                    ])) : createCommentVNode("", true),
                                                    __props.expense_list.length > 0 ? (openBlock(), createBlock("label", {
                                                      key: 2,
                                                      for: "same_receipt_check",
                                                      class: "inline-flex items-center mt-1"
                                                    }, [
                                                      withDirectives(createVNode("input", {
                                                        id: "same_receipt_check",
                                                        type: "checkbox",
                                                        "onUpdate:modelValue": ($event) => unref(formAddExpense).same_receipt_check = $event,
                                                        class: "rounded"
                                                      }, null, 8, ["onUpdate:modelValue"]), [
                                                        [
                                                          vModelCheckbox,
                                                          unref(formAddExpense).same_receipt_check
                                                        ]
                                                      ]),
                                                      createVNode("span", { class: "ms-2 text-sm" }, toDisplayString("same as exist item"))
                                                    ])) : createCommentVNode("", true)
                                                  ])
                                                ])
                                              ]),
                                              createVNode("div", { class: "modal-footer p-1" }, [
                                                createVNode("button", {
                                                  type: "submit",
                                                  class: "btn btn-sm btn-primary"
                                                }, toDisplayString("Add"))
                                              ])
                                            ], 40, ["onSubmit"])
                                          ])
                                        ])
                                      ])) : createCommentVNode("", true)
                                    ])
                                  ])
                                ])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "row" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("div", { class: "scroll-container-3 scroll-container-lg-2 bg-secondary bg-opacity-25 px-2 pt-2 rounded mt-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.expense_list, (expense) => {
                                  return openBlock(), createBlock("div", { class: "card card-bg-hover shadow mb-2 py-1" }, [
                                    createVNode("div", { class: "row" }, [
                                      createVNode("div", { class: "col-12 d-flex" }, [
                                        createVNode("span", { class: "text-primary-emphasis ms-2 my-auto" }, toDisplayString(expense.name), 1),
                                        createVNode("span", { class: "fw-light ms-2 d-none d-lg-flex my-auto" }, toDisplayString("- " + unref(formatIDR)(
                                          expense.price
                                        ) + " /" + expense.unit), 1),
                                        createVNode("span", { class: "fw-light ms-auto d-none d-lg-flex my-auto" }, toDisplayString("total (" + expense.qty + ") : "), 1),
                                        createVNode("span", { class: "fw-normal mx-2 d-none d-lg-flex my-auto" }, toDisplayString(unref(formatIDR)(
                                          expense.total_price
                                        )), 1),
                                        createVNode("button", {
                                          class: "ms-auto ms-lg-1 me-1 btn btn-sm btn-outline-secondary border-0 position-relative my-auto",
                                          "data-bs-toggle": "modal",
                                          "data-bs-target": "#receiptExpenseModal",
                                          onClick: ($event) => setExpenseReceipt(
                                            expense
                                          )
                                        }, [
                                          expense.financial_id == null ? (openBlock(), createBlock("span", {
                                            key: 0,
                                            class: "position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
                                          })) : createCommentVNode("", true),
                                          createVNode("i", { class: "bi bi-receipt" })
                                        ], 8, ["onClick"]),
                                        unref(auth_user).id == __props.program.pic_id ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "border-start border-1 border-secondary-subtle me-1 my-1"
                                        })) : createCommentVNode("", true),
                                        unref(auth_user).id == __props.program.pic_id ? (openBlock(), createBlock("div", {
                                          key: 1,
                                          class: "me-1 my-auto",
                                          onClick: ($event) => expense.financial_id <= 0 ? "" : alertNotification(
                                            "This expense has been validated by Financial Officer. You can not delete it, please contact Financial Officer."
                                          )
                                        }, [
                                          createVNode("button", {
                                            class: "btn btn-sm btn-outline-danger border-0 " + (expense.financial_id > 0 ? "disabled" : ""),
                                            onClick: ($event) => confirmation(
                                              _ctx.route(
                                                "program.expense.delete",
                                                {
                                                  id: expense.id
                                                }
                                              ),
                                              "Are you sure want to delete " + expense.name + " from " + __props.program.name + " Program Expense?"
                                            )
                                          }, [
                                            createVNode("i", { class: "bi bi-trash" })
                                          ], 10, ["onClick"])
                                        ], 8, ["onClick"])) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "row d-lg-none" }, [
                                      createVNode("div", { class: "col-12 d-flex" }, [
                                        createVNode("span", { class: "fw-light ms-2" }, toDisplayString(unref(formatIDR)(
                                          expense.price
                                        ) + " /" + expense.unit), 1),
                                        createVNode("span", { class: "fw-light ms-auto" }, toDisplayString("total (" + expense.qty + ") : "), 1),
                                        createVNode("span", { class: "fw-normal mx-2" }, toDisplayString(unref(formatIDR)(
                                          expense.total_price
                                        )), 1)
                                      ])
                                    ])
                                  ]);
                                }), 256))
                              ])
                            ]),
                            createVNode("div", {
                              class: "modal fade",
                              id: "receiptExpenseModal",
                              tabindex: "-1",
                              "aria-labelledby": "receiptExpenseModal",
                              "aria-hidden": "true"
                            }, [
                              createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                                createVNode("div", { class: "modal-content shadow mx-3 mt-5" }, [
                                  createVNode("div", { class: "modal-header py-1 ps-3 pe-2" }, [
                                    createVNode("span", { class: "modal-title fs-5 text-primary-emphasis" }, [
                                      createVNode("i", { class: "bi bi-receipt border-secondary border-end me-2 pe-2" }),
                                      createTextVNode(" " + toDisplayString("Expense Receipt"))
                                    ]),
                                    createVNode("button", {
                                      type: "button",
                                      class: "btn btn-sm ms-auto",
                                      "data-bs-dismiss": "modal",
                                      "aria-label": "Close"
                                    }, [
                                      createVNode("i", { class: "bi bi-x-lg" })
                                    ])
                                  ]),
                                  createVNode("div", { class: "modal-body bg-light p-1 px-3" }, [
                                    createVNode("div", { class: "row justify-content-center mt-2" }, [
                                      createVNode("div", { class: "col-12 d-flex" }, [
                                        createVNode("img", {
                                          src: expense_receipt.value.link,
                                          alt: "image",
                                          class: "rounded mx-auto" + placeholder.value,
                                          style: {
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            maxHeight: "320px"
                                          },
                                          id: "expense_receipt_image"
                                        }, null, 10, ["src"])
                                      ])
                                    ]),
                                    createVNode("div", { class: "row mt-2 justify-content-center" }, [
                                      createVNode("div", { class: "col-12 d-flex" }, [
                                        createVNode("span", { class: "fw-light ms-auto" }, toDisplayString("Status : ")),
                                        createVNode("span", { class: "fw-normal text-primary-emphasis me-auto ms-1" }, toDisplayString(expense_receipt.value.status), 1)
                                      ])
                                    ]),
                                    createVNode("div", { class: "row justify-content-center" }, [
                                      createVNode("div", { class: "col-12 d-flex" }, [
                                        createVNode("a", {
                                          href: expense_receipt.value.link,
                                          target: "blank",
                                          class: "mx-auto text-decoration-none",
                                          id: "expense_receipt_download",
                                          download: ""
                                        }, [
                                          createVNode("button", { class: "btn btn-sm btn-light" }, [
                                            createVNode("span", { class: "fw-light" }, toDisplayString(expense_receipt.value.image), 1),
                                            createVNode("i", { class: "bi bi-download text-primary ms-2" })
                                          ])
                                        ], 8, ["href"])
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", { class: "modal-footer p-1 px-2" }, [
                                    unref(auth_user).roles_id == 2 ? (openBlock(), createBlock("button", {
                                      key: 0,
                                      type: "button",
                                      "data-bs-dismiss": "modal",
                                      "aria-label": "Close",
                                      class: "btn btn-sm btn-" + (expense_receipt.value.valid ? "secondary" : "success"),
                                      id: "expense_receipt_button",
                                      onClick: ($event) => confirmation(
                                        _ctx.route(
                                          "program.expense.validate",
                                          {
                                            id: expense_receipt.value.id
                                          }
                                        ),
                                        "Are you sure want to " + (expense_receipt.value.valid ? "Unvalidate" : "Validate") + " " + expense_receipt.value.image + "?"
                                      )
                                    }, toDisplayString(expense_receipt.value.valid ? "Unvalidate" : "Validate"), 11, ["onClick"])) : createCommentVNode("", true),
                                    unref(auth_user).roles_id !== 2 ? (openBlock(), createBlock("button", {
                                      key: 1,
                                      "data-bs-dismiss": "modal",
                                      "aria-label": "Close",
                                      class: "btn btn-sm btn-secondary"
                                    }, toDisplayString("Close"))) : createCommentVNode("", true)
                                  ])
                                ])
                              ])
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["name", "onAfterLeave"]),
                    createVNode(Transition, {
                      name: "fade-slide-rtl",
                      onAfterLeave: ($event) => proceed_show_tab()
                    }, {
                      default: withCtx(() => [
                        active_tab.value == 4 ? (openBlock(), createBlock("div", {
                          key: 0,
                          id: "content_4"
                        }, [
                          createVNode("div", { class: "row justify-content-center" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("nav", { class: "navbar rounded bg-white shadow-sm p-2" }, [
                                createVNode("form", {
                                  method: "post",
                                  id: "formStaffFilter",
                                  onSubmit: withModifiers(($event) => handleSubmitStaffFilter(
                                    $event,
                                    _ctx.route(
                                      "program.staff.filter",
                                      {
                                        id: __props.program.id
                                      }
                                    )
                                  ), ["prevent"])
                                }, null, 40, ["onSubmit"]),
                                createVNode("div", { class: "container d-block px-0" }, [
                                  createVNode("div", { class: "row" }, [
                                    createVNode("div", { class: "col-12 d-flex" }, [
                                      createVNode("div", { class: "input-group input-group-sm bg-body-tertiary rounded" }, [
                                        createVNode("button", {
                                          type: "button",
                                          class: "btn btn-sm rounded-0 rounded-start text-light bg-secondary"
                                        }, [
                                          createVNode("i", { class: "bi bi-funnel-fill" }),
                                          createVNode("span", { class: "ms-1 ps-2 border-start border-light d-none d-md-inline" }, toDisplayString("Filter"))
                                        ]),
                                        createVNode("button", {
                                          type: "submit",
                                          form: "formStaffFilter",
                                          class: "btn btn-sm btn-outline-secondary border-0 rounded-0 my-0",
                                          onClick: ($event) => staffFilterCategory(
                                            "name"
                                          )
                                        }, [
                                          createVNode("span", { class: "me-1" }, toDisplayString("Name")),
                                          createVNode("i", {
                                            class: "bi bi-sort-numeric-" + (__props.filter["staff"]["category"] == "name" && __props.filter["staff"]["order"] == "asc" ? "up" : "down") + "-alt"
                                          }, null, 2)
                                        ], 8, ["onClick"]),
                                        createVNode("button", {
                                          type: "submit",
                                          form: "formStaffFilter",
                                          class: "btn btn-sm btn-outline-secondary border-0 rounded-0 my-0",
                                          onClick: ($event) => staffFilterCategory(
                                            "created_at"
                                          )
                                        }, [
                                          createVNode("span", { class: "me-1" }, toDisplayString("Date")),
                                          createVNode("i", {
                                            class: "bi bi-sort-numeric-" + (__props.filter["staff"]["category"] == "created_at" && __props.filter["staff"]["order"] == "asc" ? "up" : "down") + "-alt"
                                          }, null, 2)
                                        ], 8, ["onClick"])
                                      ]),
                                      unref(auth_user).id == __props.program.pic_id ? (openBlock(), createBlock("button", {
                                        key: 0,
                                        class: "ms-2 btn btn-sm btn-outline-primary border-0 " + (__props.program.financial_id > 0 ? "" : "disabled"),
                                        onClick: ($event) => showAddStaffModal(
                                          true
                                        )
                                      }, [
                                        createVNode("i", { class: "bi bi-plus-lg" })
                                      ], 10, ["onClick"])) : createCommentVNode("", true),
                                      unref(auth_user).id == __props.program.pic_id ? (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "modal fade",
                                        id: "addProgramStaff",
                                        tabindex: "-1",
                                        "aria-labelledby": "exampleModalLabel",
                                        "aria-hidden": "true"
                                      }, [
                                        createVNode("div", { class: "modal-dialog modal-dialog-centered" }, [
                                          createVNode("div", { class: "modal-content shadow mx-3" }, [
                                            createVNode("div", { class: "modal-header py-1 ps-3 pe-2" }, [
                                              createVNode("span", {
                                                class: "modal-title fs-5 text-primary-emphasis",
                                                id: "exampleModalLabel"
                                              }, [
                                                createVNode("i", { class: "bi bi-person-fill-add border-secondary border-end me-2 pe-2" }),
                                                createTextVNode(" " + toDisplayString("Add New Staff"))
                                              ]),
                                              createVNode("button", {
                                                type: "button",
                                                class: "btn btn-sm ms-auto",
                                                onClick: ($event) => showAddStaffModal(
                                                  false
                                                )
                                              }, [
                                                createVNode("i", { class: "bi bi-x-lg" })
                                              ], 8, ["onClick"])
                                            ]),
                                            createVNode("form", {
                                              method: "post",
                                              onSubmit: withModifiers(($event) => handleSubmitAddStaff(
                                                $event,
                                                _ctx.route(
                                                  "program.staff.add",
                                                  {
                                                    id: __props.program.id
                                                  }
                                                )
                                              ), ["prevent"])
                                            }, [
                                              createVNode("div", { class: "modal-body bg-light" }, [
                                                createVNode("div", { class: "row mt-0 justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3" }, [
                                                    createVNode("label", {
                                                      for: "add_staff_title",
                                                      class: "form-label d-inline-block"
                                                    }, toDisplayString("Title"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    withDirectives(createVNode("input", {
                                                      type: "text",
                                                      class: "form-control form-control-sm d-inline-block",
                                                      id: "add_staff_title",
                                                      "onUpdate:modelValue": ($event) => unref(formAddStaff).staff_title = $event,
                                                      placeholder: "PDD, ATP, etc..",
                                                      required: ""
                                                    }, null, 8, ["onUpdate:modelValue"]), [
                                                      [
                                                        vModelText,
                                                        unref(formAddStaff).staff_title
                                                      ]
                                                    ]),
                                                    createVNode(_sfc_main$4, {
                                                      message: unref(formAddStaff).errors.staff_title
                                                    }, null, 8, ["message"])
                                                  ])
                                                ]),
                                                createVNode("div", { class: "row mt-2 justify-content-center" }, [
                                                  createVNode("div", { class: "col-4 col-lg-3" }, [
                                                    createVNode("label", {
                                                      for: "add_staff_id",
                                                      class: "form-label d-inline-block"
                                                    }, toDisplayString("Staff"))
                                                  ]),
                                                  createVNode("div", { class: "col-8 col-lg-7" }, [
                                                    __props.employee_list.length == 0 ? (openBlock(), createBlock("span", {
                                                      key: 0,
                                                      class: "fw-light fst-italic"
                                                    }, toDisplayString("There are no available staff."))) : createCommentVNode("", true),
                                                    __props.employee_list.length > 0 ? withDirectives((openBlock(), createBlock("select", {
                                                      key: 1,
                                                      "onUpdate:modelValue": ($event) => unref(formAddStaff).staff_id = $event,
                                                      class: "form-select py-0 d-inline",
                                                      id: "add_staff_id",
                                                      required: ""
                                                    }, [
                                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.employee_list, (employee) => {
                                                        return openBlock(), createBlock("option", {
                                                          value: employee.id,
                                                          selected: __props.employee_list.indexOf(
                                                            employee
                                                          ) == 1
                                                        }, toDisplayString(employee.name), 9, ["value", "selected"]);
                                                      }), 256))
                                                    ], 8, ["onUpdate:modelValue"])), [
                                                      [
                                                        vModelSelect,
                                                        unref(formAddStaff).staff_id
                                                      ]
                                                    ]) : createCommentVNode("", true)
                                                  ])
                                                ])
                                              ]),
                                              createVNode("div", { class: "modal-footer p-1" }, [
                                                createVNode("button", {
                                                  type: __props.employee_list.length > 0 ? "submit" : "button",
                                                  class: "btn btn-sm btn-primary " + (__props.employee_list.length == 0 ? "disabled" : "")
                                                }, toDisplayString("Add"), 10, ["type"])
                                              ])
                                            ], 40, ["onSubmit"])
                                          ])
                                        ])
                                      ])) : createCommentVNode("", true)
                                    ])
                                  ])
                                ])
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "row" }, [
                            createVNode("div", { class: "col-12" }, [
                              createVNode("div", { class: "scroll-container-3 scroll-container-lg-2 bg-secondary bg-opacity-25 px-2 pt-2 rounded mt-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.staff_list, (staff) => {
                                  var _a;
                                  return openBlock(), createBlock("div", { class: "card card-bg-hover shadow mb-2" }, [
                                    createVNode("div", {
                                      class: "row gx-0 px-1",
                                      style: { height: "100%" }
                                    }, [
                                      createVNode("div", { class: "col-auto d-flex" }, [
                                        createVNode("div", {
                                          class: "card position-relative shadow-sm rounded-circle border-primary border-2 my-auto",
                                          style: {
                                            paddingBottom: "25px",
                                            width: "25px"
                                          }
                                        }, [
                                          createVNode("img", {
                                            src: "/storage/images/profile/" + (staff.employee.profile_image !== null ? staff.employee.profile_image : "example.png"),
                                            alt: "image",
                                            class: "rounded-circle position-absolute top-0 start-0 w-100 h-100 " + placeholder.value,
                                            style: {
                                              objectFit: "cover"
                                            }
                                          }, null, 10, ["src"])
                                        ])
                                      ]),
                                      createVNode("div", { class: "col d-flex my-1" }, [
                                        createVNode("a", {
                                          href: _ctx.route(
                                            "profile.edit",
                                            {
                                              id: (_a = staff == null ? void 0 : staff.employee) == null ? void 0 : _a.id
                                            }
                                          ),
                                          rel: "noopener noreferrer",
                                          class: "text-decoration-none d-flex w-100"
                                        }, [
                                          createVNode("div", { class: "d-flex scroll-x-hidden text-nowrap ms-2" }, [
                                            createVNode("span", { class: "text-primary-emphasis my-auto" }, toDisplayString(staff.employee.name), 1),
                                            createVNode("span", {
                                              class: "fw-light ms-1 my-auto " + (staff.employee.id == __props.program.pic_id ? "text-dark" : "")
                                            }, toDisplayString("- " + staff.title), 3)
                                          ])
                                        ], 8, ["href"]),
                                        unref(auth_user).id == __props.program.pic_id && __props.program.staff_lock <= 0 && staff.user_id !== __props.program.pic_id ? (openBlock(), createBlock("button", {
                                          key: 0,
                                          class: "ms-auto btn btn-sm btn-outline-danger border-0",
                                          onClick: ($event) => confirmation(
                                            _ctx.route(
                                              "program.staff.delete",
                                              {
                                                id: staff.id
                                              }
                                            ),
                                            "Are you sure want to remove " + staff.employee.name + " from " + __props.program.name + " Staff Program ?"
                                          )
                                        }, [
                                          createVNode("i", { class: "bi bi-trash" })
                                        ], 8, ["onClick"])) : createCommentVNode("", true)
                                      ])
                                    ])
                                  ]);
                                }), 256))
                              ])
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["onAfterLeave"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Staff/SEEO/Program.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Program = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-51d3f98b"]]);
export {
  Program as default
};
