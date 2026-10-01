import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "BusinessBalance",
  __ssrInlineRender: true,
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    balance: { type: Object, default: () => ({}) },
    totalIncome: { type: Number, default: 0 },
    totalExpense: { type: Number, default: 0 },
    income: { type: Array, default: () => [] },
    expense: { type: Array, default: () => [] },
    defaultTab: { type: [Number, String], default: 1 },
    filter: { type: Object, default: () => ({}) },
    incomeFilterRoute: { type: String, required: true },
    expenseFilterRoute: { type: String, required: true },
    withdrawRoute: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const activeTab = ref(Number(props.defaultTab) === 2 ? 2 : 1);
    const incomeSettings = props.filter.cash_in ?? props.filter.income ?? {};
    const expenseSettings = props.filter.cash_out ?? props.filter.expense ?? {};
    const incomeFilter = useForm({
      category: incomeSettings.category ?? "price",
      order: incomeSettings.order ?? "desc"
    });
    const expenseFilter = useForm({
      category: expenseSettings.category ?? "price",
      order: expenseSettings.order ?? "desc"
    });
    const withdrawForm = useForm({ name: "", price: "", receipt: null });
    const calculatedBalance = computed(() => {
      var _a;
      return Number(((_a = props.balance) == null ? void 0 : _a.balance) ?? props.totalIncome - props.totalExpense);
    });
    const money = (value) => new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(Number(value || 0));
    const date = (value) => value ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(value)) : "-";
    function detail(item) {
      var _a, _b, _c, _d, _e;
      return ((_a = item.stand) == null ? void 0 : _a.name) ?? ((_b = item.program) == null ? void 0 : _b.name) ?? ((_c = item.capital) == null ? void 0 : _c.name) ?? ((_d = item.withdraw) == null ? void 0 : _d.name) ?? ((_e = item.sales) == null ? void 0 : _e.customer) ?? "-";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-fluid py-3 py-lg-4" }, _attrs))}><div class="d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-center mb-4"><div><h2 class="fw-bold mb-1">${ssrInterpolate(__props.title)}</h2><p class="text-muted mb-0">${ssrInterpolate(__props.subtitle)}</p></div><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#withdrawBalanceModal"><i class="bi bi-send me-2"></i>Setor ke Kas SEEO </button></div><div class="row g-3 mb-4"><div class="col-12 col-md-4"><div class="card border-0 shadow-sm h-100"><div class="card-body"><div class="small text-muted">Saldo tercatat</div><div class="${ssrRenderClass([calculatedBalance.value < 0 ? "text-danger" : "text-primary", "fs-3 fw-bold"])}">${ssrInterpolate(money(calculatedBalance.value))}</div></div></div></div><div class="col-6 col-md-4"><div class="card border-0 shadow-sm h-100"><div class="card-body"><div class="small text-muted">Total pemasukan</div><div class="fs-4 fw-bold text-success">${ssrInterpolate(money(__props.totalIncome))}</div></div></div></div><div class="col-6 col-md-4"><div class="card border-0 shadow-sm h-100"><div class="card-body"><div class="small text-muted">Total pengeluaran</div><div class="fs-4 fw-bold text-danger">${ssrInterpolate(money(__props.totalExpense))}</div></div></div></div></div><div class="card border-0 shadow-sm"><div class="card-header bg-white border-0 pt-3"><ul class="nav nav-pills gap-2"><li class="nav-item"><button class="${ssrRenderClass([{ active: activeTab.value === 1 }, "nav-link"])}">Pemasukan (${ssrInterpolate(__props.income.length)})</button></li><li class="nav-item"><button class="${ssrRenderClass([{ active: activeTab.value === 2 }, "nav-link"])}">Pengeluaran (${ssrInterpolate(__props.expense.length)})</button></li></ul></div><div class="card-body">`);
      if (activeTab.value === 1) {
        _push(`<form class="row g-2 mb-3"><div class="col-6 col-md-3"><select class="form-select" aria-label="Urutkan pemasukan"><option value="created_at"${ssrIncludeBooleanAttr(Array.isArray(unref(incomeFilter).category) ? ssrLooseContain(unref(incomeFilter).category, "created_at") : ssrLooseEqual(unref(incomeFilter).category, "created_at")) ? " selected" : ""}>Tanggal</option><option value="price"${ssrIncludeBooleanAttr(Array.isArray(unref(incomeFilter).category) ? ssrLooseContain(unref(incomeFilter).category, "price") : ssrLooseEqual(unref(incomeFilter).category, "price")) ? " selected" : ""}>Nominal</option><option value="category"${ssrIncludeBooleanAttr(Array.isArray(unref(incomeFilter).category) ? ssrLooseContain(unref(incomeFilter).category, "category") : ssrLooseEqual(unref(incomeFilter).category, "category")) ? " selected" : ""}>Kategori</option></select></div><div class="col-6 col-md-3"><select class="form-select"><option value="desc"${ssrIncludeBooleanAttr(Array.isArray(unref(incomeFilter).order) ? ssrLooseContain(unref(incomeFilter).order, "desc") : ssrLooseEqual(unref(incomeFilter).order, "desc")) ? " selected" : ""}>Terbaru / terbesar</option><option value="asc"${ssrIncludeBooleanAttr(Array.isArray(unref(incomeFilter).order) ? ssrLooseContain(unref(incomeFilter).order, "asc") : ssrLooseEqual(unref(incomeFilter).order, "asc")) ? " selected" : ""}>Terlama / terkecil</option></select></div><div class="col-md-auto"><button class="btn btn-outline-primary w-100"${ssrIncludeBooleanAttr(unref(incomeFilter).processing) ? " disabled" : ""}>Terapkan</button></div></form>`);
      } else {
        _push(`<form class="row g-2 mb-3"><div class="col-6 col-md-3"><select class="form-select" aria-label="Urutkan pengeluaran"><option value="created_at"${ssrIncludeBooleanAttr(Array.isArray(unref(expenseFilter).category) ? ssrLooseContain(unref(expenseFilter).category, "created_at") : ssrLooseEqual(unref(expenseFilter).category, "created_at")) ? " selected" : ""}>Tanggal</option><option value="price"${ssrIncludeBooleanAttr(Array.isArray(unref(expenseFilter).category) ? ssrLooseContain(unref(expenseFilter).category, "price") : ssrLooseEqual(unref(expenseFilter).category, "price")) ? " selected" : ""}>Nominal</option><option value="category"${ssrIncludeBooleanAttr(Array.isArray(unref(expenseFilter).category) ? ssrLooseContain(unref(expenseFilter).category, "category") : ssrLooseEqual(unref(expenseFilter).category, "category")) ? " selected" : ""}>Kategori</option></select></div><div class="col-6 col-md-3"><select class="form-select"><option value="desc"${ssrIncludeBooleanAttr(Array.isArray(unref(expenseFilter).order) ? ssrLooseContain(unref(expenseFilter).order, "desc") : ssrLooseEqual(unref(expenseFilter).order, "desc")) ? " selected" : ""}>Terbaru / terbesar</option><option value="asc"${ssrIncludeBooleanAttr(Array.isArray(unref(expenseFilter).order) ? ssrLooseContain(unref(expenseFilter).order, "asc") : ssrLooseEqual(unref(expenseFilter).order, "asc")) ? " selected" : ""}>Terlama / terkecil</option></select></div><div class="col-md-auto"><button class="btn btn-outline-primary w-100"${ssrIncludeBooleanAttr(unref(expenseFilter).processing) ? " disabled" : ""}>Terapkan</button></div></form>`);
      }
      _push(`<div class="table-responsive"><table class="table table-hover align-middle mb-0"><thead><tr><th>Tanggal</th><th>Kategori</th><th>Keterangan</th><th class="text-end">Nominal</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(activeTab.value === 1 ? __props.income : __props.expense, (item) => {
        var _a;
        _push(`<tr><td class="text-nowrap">${ssrInterpolate(date(item.created_at))}</td><td><span class="badge text-bg-light text-capitalize">${ssrInterpolate((_a = item.category) == null ? void 0 : _a.replaceAll("_", " "))}</span></td><td>${ssrInterpolate(detail(item))}</td><td class="${ssrRenderClass([activeTab.value === 1 ? "text-success" : "text-danger", "text-end fw-semibold"])}">${ssrInterpolate(money(item.price))}</td></tr>`);
      });
      _push(`<!--]-->`);
      if (!(activeTab.value === 1 ? __props.income : __props.expense).length) {
        _push(`<tr><td colspan="4" class="text-center text-muted py-5">Belum ada transaksi pada bagian ini.</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></div></div><div id="withdrawBalanceModal" class="modal fade" tabindex="-1" aria-hidden="true"><div class="modal-dialog"><form class="modal-content"><div class="modal-header"><h5 class="modal-title">Setor saldo ke kas SEEO</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body"><div class="alert alert-info small">Transaksi akan tercatat sebagai pengeluaran dan menunggu validasi Financial Officer.</div><div class="mb-3"><label class="form-label">Keterangan</label><input${ssrRenderAttr("value", unref(withdrawForm).name)} class="form-control" required maxlength="255"><div class="text-danger small">${ssrInterpolate(unref(withdrawForm).errors.name)}</div></div><div class="mb-3"><label class="form-label">Nominal</label><input${ssrRenderAttr("value", unref(withdrawForm).price)} type="number" min="1" class="form-control" required><div class="text-danger small">${ssrInterpolate(unref(withdrawForm).errors.price)}</div></div><div><label class="form-label">Bukti transfer</label><input type="file" accept="image/*" class="form-control" required><div class="text-danger small">${ssrInterpolate(unref(withdrawForm).errors.receipt)}</div></div></div><div class="modal-footer"><button type="button" class="btn btn-light" data-bs-dismiss="modal">Batal</button><button class="btn btn-primary"${ssrIncludeBooleanAttr(unref(withdrawForm).processing) ? " disabled" : ""}>${ssrInterpolate(unref(withdrawForm).processing ? "Mengirim..." : "Kirim setoran")}</button></div></form></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/BusinessBalance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=BusinessBalance-Cfi8ddRz.js.map
