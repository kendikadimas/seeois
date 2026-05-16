import { ref, computed, onMounted, unref, useSSRContext } from "vue";
import { ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import Swal from "sweetalert2";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Register",
  __ssrInlineRender: true,
  props: {
    flash: {
      type: Object,
      default: () => ({})
    },
    hasSubmitted: {
      type: Boolean,
      default: false
    },
    submissionData: {
      type: Object,
      default: null
    },
    availableYears: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    var _a;
    const props = __props;
    usePage();
    ref(null);
    const selectedFileName = ref("");
    const divisions = [
      "Financial",
      "Operating",
      "Administration",
      "Production",
      "Marketing Medinfo",
      "Sales Distribution",
      "Public Relation",
      "Human Resource"
    ];
    const studyPrograms = [
      "Teknik Elektro",
      "Teknik Sipil",
      "Teknik Geologi",
      "Informatika",
      "Teknik Industri",
      "Teknik Mesin",
      "Teknik Komputer"
    ];
    const form = useForm({
      name: "",
      nim: "",
      phone_number: "",
      krs_photo: null,
      email_username: "",
      study_program: "",
      internship_year: ((_a = props.availableYears) == null ? void 0 : _a[0]) || (/* @__PURE__ */ new Date()).getFullYear(),
      division_choice_1: "",
      reason_choice_1: "",
      division_choice_2: "",
      reason_choice_2: "",
      willing_to_be_placed_elsewhere: null
    });
    const progressWidth = computed(() => {
      let progress = 0;
      const fields = ["name", "nim", "phone_number", "email_username", "study_program", "internship_year"];
      const filledDataDiri = fields.filter((field) => form[field]).length;
      progress += filledDataDiri / fields.length * 25;
      if (form.krs_photo) progress += 25;
      const divisionFields = ["division_choice_1", "reason_choice_1", "division_choice_2", "reason_choice_2"];
      const filledDivision = divisionFields.filter((field) => form[field]).length;
      progress += filledDivision / divisionFields.length * 25;
      if (form.willing_to_be_placed_elsewhere !== null) progress += 25;
      return Math.min(progress, 100);
    });
    const showSuccessPopup = (message) => {
      Swal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil!",
        text: message,
        confirmButtonText: "OK"
      });
    };
    const showWhatsAppPopup = (whatsappLink) => {
      Swal.fire({
        icon: "success",
        title: "Pendaftaran Berhasil!",
        html: `
            <p>Terima kasih telah mendaftar program internship SEEO 2025!</p>
            <p>Silakan bergabung dengan grup WhatsApp untuk informasi lebih lanjut:</p>
        `,
        showCancelButton: true,
        confirmButtonText: '<i class="bi bi-whatsapp"></i> Gabung Grup WhatsApp',
        cancelButtonText: "Tutup",
        confirmButtonColor: "#25D366",
        cancelButtonColor: "#6c757d"
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(whatsappLink, "_blank");
        }
      });
    };
    const formatSubmissionDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    onMounted(() => {
      const anchors = document.querySelectorAll('a[href^="#"]');
      anchors.forEach((anchor) => {
        anchor.addEventListener("click", function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        });
      });
      if (props.flash.success) {
        if (props.flash.whatsapp_link) {
          showWhatsAppPopup(props.flash.whatsapp_link);
        } else {
          showSuccessPopup(props.flash.success);
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><section class="hero-section text-white py-5" data-v-2c5b1516><div class="container" data-v-2c5b1516><div class="row align-items-center min-vh-60" data-v-2c5b1516><div class="col-lg-6" data-v-2c5b1516><div class="hero-content" data-v-2c5b1516><h1 class="display-4 fw-bold mb-4" data-v-2c5b1516> Internship <span data-v-2c5b1516>SEEO 2025</span></h1><a href="#registration-form" class="btn btn-accent btn-lg px-5 py-3 fw-semibold shadow-lg" data-v-2c5b1516><i class="bi bi-arrow-down me-2" data-v-2c5b1516></i> Daftar Sekarang </a></div></div><div class="col-lg-6" data-v-2c5b1516><div class="hero-visual text-center" data-v-2c5b1516></div></div></div></div></section><section id="registration-form" class="py-5 bg-light-subtle" data-v-2c5b1516><div class="container" data-v-2c5b1516><div class="row g-4" data-v-2c5b1516><div class="col-lg-3 col-md-4" data-v-2c5b1516><div class="sidebar-sticky" data-v-2c5b1516><div class="info-card mb-4" data-v-2c5b1516><div class="info-card-header" data-v-2c5b1516><i class="bi bi-info-circle" data-v-2c5b1516></i><span data-v-2c5b1516>Panduan Pengisian</span></div><div class="info-card-body" data-v-2c5b1516><div class="guide-item" data-v-2c5b1516><div class="guide-number" data-v-2c5b1516>1</div><div data-v-2c5b1516><strong data-v-2c5b1516>Data Diri</strong><p data-v-2c5b1516>Isi data pribadi dengan lengkap dan benar. Setiap NIM dan nomor telepon hanya bisa mendaftar sekali.</p></div></div><div class="guide-item" data-v-2c5b1516><div class="guide-number" data-v-2c5b1516>2</div><div data-v-2c5b1516><strong data-v-2c5b1516>Upload KRS</strong><p data-v-2c5b1516>Upload foto KRS yang jelas (max 2MB)</p></div></div><div class="guide-item" data-v-2c5b1516><div class="guide-number" data-v-2c5b1516>3</div><div data-v-2c5b1516><strong data-v-2c5b1516>Pilihan Departemen</strong><p data-v-2c5b1516>Pilih 2 departemen sesuai minat</p></div></div><div class="guide-item" data-v-2c5b1516><div class="guide-number" data-v-2c5b1516>4</div><div data-v-2c5b1516><strong data-v-2c5b1516>Kesediaan</strong><p data-v-2c5b1516>Tentukan kesediaan penempatan</p></div></div></div></div><div class="info-card mb-4" data-v-2c5b1516><div class="info-card-header" data-v-2c5b1516><i class="bi bi-diagram-3" data-v-2c5b1516></i><span data-v-2c5b1516>Departemen Tersedia</span></div><div class="info-card-body" data-v-2c5b1516><div class="division-list" data-v-2c5b1516><!--[-->`);
      ssrRenderList(divisions, (division) => {
        _push(`<div class="division-item" data-v-2c5b1516><i class="bi bi-arrow-right" data-v-2c5b1516></i><span data-v-2c5b1516>${ssrInterpolate(division)}</span></div>`);
      });
      _push(`<!--]--></div></div></div><div class="support-card" data-v-2c5b1516><h6 data-v-2c5b1516><i class="bi bi-question-circle me-2" data-v-2c5b1516></i>Butuh Bantuan?</h6><p data-v-2c5b1516>Jika mengalami kendala saat pengisian form:</p><a href="https://wa.me/62895377161641" target="_blank" class="support-link" data-v-2c5b1516><i class="bi bi-whatsapp" data-v-2c5b1516></i><span data-v-2c5b1516>0895-3771-6141 (Diana)</span></a><a href="https://wa.me/62895424003147" target="_blank" class="support-link" data-v-2c5b1516><i class="bi bi-whatsapp" data-v-2c5b1516></i><span data-v-2c5b1516>0895-4240-03147 (Gita)</span></a></div></div></div><div class="col-lg-9 col-md-8" data-v-2c5b1516>`);
      if (__props.hasSubmitted) {
        _push(`<div class="form-card" data-v-2c5b1516><div class="form-header" data-v-2c5b1516><div class="form-header-content" data-v-2c5b1516><i class="bi bi-check-circle" data-v-2c5b1516></i><div data-v-2c5b1516><h4 data-v-2c5b1516>Pendaftaran Berhasil</h4><p data-v-2c5b1516>Terima kasih telah mendaftar SEEO Internship 2025</p></div></div></div><div class="form-body" data-v-2c5b1516><div class="success-container" data-v-2c5b1516><div class="success-icon" data-v-2c5b1516><i class="bi bi-check-circle-fill" data-v-2c5b1516></i></div><h3 class="success-title" data-v-2c5b1516>Pendaftaran Anda Telah Diterima!</h3><p class="success-message" data-v-2c5b1516> Pendaftaran internship Anda telah berhasil dikirim dan sedang dalam proses review. Tim kami akan menghubungi Anda melalui email atau WhatsApp untuk informasi selanjutnya. </p>`);
        if (__props.submissionData) {
          _push(`<div class="submission-summary" data-v-2c5b1516><h5 data-v-2c5b1516>Ringkasan Pendaftaran:</h5><div class="summary-grid" data-v-2c5b1516><div class="summary-item" data-v-2c5b1516><strong data-v-2c5b1516>Nama:</strong> ${ssrInterpolate(__props.submissionData.name)}</div><div class="summary-item" data-v-2c5b1516><strong data-v-2c5b1516>NIM:</strong> ${ssrInterpolate(__props.submissionData.nim)}</div><div class="summary-item" data-v-2c5b1516><strong data-v-2c5b1516>Program Studi:</strong> ${ssrInterpolate(__props.submissionData.study_program)}</div><div class="summary-item" data-v-2c5b1516><strong data-v-2c5b1516>Departemen Pilihan 1:</strong> ${ssrInterpolate(__props.submissionData.division_choice_1)}</div><div class="summary-item" data-v-2c5b1516><strong data-v-2c5b1516>Departemen Pilihan 2:</strong> ${ssrInterpolate(__props.submissionData.division_choice_2)}</div><div class="summary-item" data-v-2c5b1516><strong data-v-2c5b1516>Tanggal Daftar:</strong> ${ssrInterpolate(formatSubmissionDate(__props.submissionData.created_at))}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="success-actions" data-v-2c5b1516><a href="https://chat.whatsapp.com/Ef6sbho6nQ6CIVw7HnLqaB" target="_blank" class="btn-join-group" data-v-2c5b1516><i class="bi bi-whatsapp" data-v-2c5b1516></i> Gabung Grup WhatsApp </a><a href="/" class="btn-back-home" data-v-2c5b1516><i class="bi bi-house" data-v-2c5b1516></i> Kembali ke Beranda </a></div></div></div></div>`);
      } else {
        _push(`<div class="form-card" data-v-2c5b1516><div class="form-header" data-v-2c5b1516><div class="form-header-content" data-v-2c5b1516><i class="bi bi-clipboard-data" data-v-2c5b1516></i><div data-v-2c5b1516><h4 data-v-2c5b1516>Formulir Pendaftaran Internship</h4><p data-v-2c5b1516>SEEO - Internship 2025</p><small class="text-warning" data-v-2c5b1516><i class="bi bi-exclamation-triangle" data-v-2c5b1516></i> Setiap calon peserta hanya dapat mendaftar sekali</small></div></div></div><div class="form-body" data-v-2c5b1516><form enctype="multipart/form-data" data-v-2c5b1516><div class="progress-section" data-v-2c5b1516><div class="progress-bar-container" data-v-2c5b1516><div class="progress-bar" style="${ssrRenderStyle({ width: progressWidth.value + "%" })}" data-v-2c5b1516></div></div><div class="progress-labels" data-v-2c5b1516><span data-v-2c5b1516>Data Diri</span><span data-v-2c5b1516>Upload KRS</span><span data-v-2c5b1516>Pilihan Departemen</span><span data-v-2c5b1516>Kesediaan</span></div></div><div class="form-section" data-v-2c5b1516><div class="section-header" data-v-2c5b1516><i class="bi bi-person-fill" data-v-2c5b1516></i><span data-v-2c5b1516>Data Diri</span></div><div class="form-grid" data-v-2c5b1516><div class="form-group" data-v-2c5b1516><label class="form-label" data-v-2c5b1516>Nama Lengkap <span class="required" data-v-2c5b1516>*</span></label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="form-input" placeholder="Ex : Bruce Wayne" required data-v-2c5b1516>`);
        if (unref(form).errors.name) {
          _push(`<p class="error-message" data-v-2c5b1516>${ssrInterpolate(unref(form).errors.name)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-2c5b1516><label class="form-label" data-v-2c5b1516>NIM <span class="required" data-v-2c5b1516>*</span></label><input${ssrRenderAttr("value", unref(form).nim)} type="text" class="form-input" placeholder="Ex : H1D023083" required data-v-2c5b1516>`);
        if (unref(form).errors.nim) {
          _push(`<p class="error-message" data-v-2c5b1516>${ssrInterpolate(unref(form).errors.nim)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="form-grid" data-v-2c5b1516><div class="form-group" data-v-2c5b1516><label class="form-label" data-v-2c5b1516>Nomor HP/WhatsApp <span class="required" data-v-2c5b1516>*</span></label><div class="input-group" data-v-2c5b1516><span class="input-prefix" data-v-2c5b1516>+62</span><input${ssrRenderAttr("value", unref(form).phone_number)} type="tel" class="form-input" placeholder="Ex : 812-3456-7890" required data-v-2c5b1516></div>`);
        if (unref(form).errors.phone_number) {
          _push(`<p class="error-message" data-v-2c5b1516>${ssrInterpolate(unref(form).errors.phone_number)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-2c5b1516><label class="form-label" data-v-2c5b1516>Email Unsoed <span class="required" data-v-2c5b1516>*</span></label><div class="input-group" data-v-2c5b1516><input${ssrRenderAttr("value", unref(form).email_username)} type="text" class="form-input" placeholder="Ex : bruce.wayne" required data-v-2c5b1516><span class="input-suffix" data-v-2c5b1516>@mhs.unsoed.ac.id</span></div><div class="form-text" data-v-2c5b1516><i class="bi bi-info-circle" data-v-2c5b1516></i> Gunakan email mahasiswa resmi Universitas Jenderal Soedirman </div>`);
        if (unref(form).errors.email_username) {
          _push(`<p class="error-message" data-v-2c5b1516>${ssrInterpolate(unref(form).errors.email_username)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="form-group" data-v-2c5b1516><label class="form-label" data-v-2c5b1516>Program Studi <span class="required" data-v-2c5b1516>*</span></label><select class="form-select" required data-v-2c5b1516><option disabled value="" class="text-muted" data-v-2c5b1516${ssrIncludeBooleanAttr(Array.isArray(unref(form).study_program) ? ssrLooseContain(unref(form).study_program, "") : ssrLooseEqual(unref(form).study_program, "")) ? " selected" : ""}>Pilih prodi kamu..</option><!--[-->`);
        ssrRenderList(studyPrograms, (program) => {
          _push(`<option${ssrRenderAttr("value", program)} data-v-2c5b1516${ssrIncludeBooleanAttr(Array.isArray(unref(form).study_program) ? ssrLooseContain(unref(form).study_program, program) : ssrLooseEqual(unref(form).study_program, program)) ? " selected" : ""}>${ssrInterpolate(program)}</option>`);
        });
        _push(`<!--]--></select>`);
        if (unref(form).errors.study_program) {
          _push(`<p class="error-message" data-v-2c5b1516>${ssrInterpolate(unref(form).errors.study_program)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group mt-3" data-v-2c5b1516><label class="form-label" data-v-2c5b1516>Tahun Pendaftaran <span class="required" data-v-2c5b1516>*</span></label><select class="form-select" required data-v-2c5b1516><!--[-->`);
        ssrRenderList(__props.availableYears, (year) => {
          _push(`<option${ssrRenderAttr("value", year)} data-v-2c5b1516${ssrIncludeBooleanAttr(Array.isArray(unref(form).internship_year) ? ssrLooseContain(unref(form).internship_year, year) : ssrLooseEqual(unref(form).internship_year, year)) ? " selected" : ""}>${ssrInterpolate(year)}</option>`);
        });
        _push(`<!--]--></select>`);
        if (unref(form).errors.internship_year) {
          _push(`<p class="error-message" data-v-2c5b1516>${ssrInterpolate(unref(form).errors.internship_year)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="form-section" data-v-2c5b1516><div class="section-header" data-v-2c5b1516><i class="bi bi-cloud-upload" data-v-2c5b1516></i><span data-v-2c5b1516>Upload Foto KRS</span></div><div class="form-group" data-v-2c5b1516><label class="form-label" data-v-2c5b1516>Foto KRS (Kartu Rencana Studi) <span class="required" data-v-2c5b1516>*</span></label><div class="${ssrRenderClass([{ "has-file": selectedFileName.value }, "file-upload"])}" data-v-2c5b1516><input type="file" class="file-input" accept="image/jpeg,image/jpg,image/png,application/pdf" required data-v-2c5b1516><div class="file-upload-content" data-v-2c5b1516>`);
        if (!selectedFileName.value) {
          _push(`<i class="bi bi-cloud-upload-fill" data-v-2c5b1516></i>`);
        } else {
          _push(`<i class="bi bi-file-earmark-check-fill text-success" data-v-2c5b1516></i>`);
        }
        _push(`<div class="file-upload-text" data-v-2c5b1516>`);
        if (!selectedFileName.value) {
          _push(`<span data-v-2c5b1516>Klik untuk upload file</span>`);
        } else {
          _push(`<span class="text-success fw-semibold" data-v-2c5b1516>${ssrInterpolate(selectedFileName.value)}</span>`);
        }
        _push(`</div><div class="file-upload-hint" data-v-2c5b1516> JPG, PNG, JPEG, PDF (Max 2MB) </div></div></div>`);
        if (unref(form).errors.krs_photo) {
          _push(`<p class="error-message" data-v-2c5b1516>${ssrInterpolate(unref(form).errors.krs_photo)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="form-section" data-v-2c5b1516><div class="section-header" data-v-2c5b1516><i class="bi bi-diagram-3-fill" data-v-2c5b1516></i><span data-v-2c5b1516>Pilihan Departemen</span></div><div class="division-choice-container" data-v-2c5b1516><div class="division-choice" data-v-2c5b1516><div class="division-label" data-v-2c5b1516><span class="division-number" data-v-2c5b1516>1</span><span data-v-2c5b1516>Pilihan Departemen Pertama</span></div><div class="form-group" data-v-2c5b1516><label class="form-label" data-v-2c5b1516>Pilihan Departemen 1 <span class="required" data-v-2c5b1516>*</span></label><select class="form-select" required data-v-2c5b1516><option disabled value="" data-v-2c5b1516${ssrIncludeBooleanAttr(Array.isArray(unref(form).division_choice_1) ? ssrLooseContain(unref(form).division_choice_1, "") : ssrLooseEqual(unref(form).division_choice_1, "")) ? " selected" : ""}>Pilih departemen...</option><!--[-->`);
        ssrRenderList(divisions, (division) => {
          _push(`<option${ssrRenderAttr("value", division)} data-v-2c5b1516${ssrIncludeBooleanAttr(Array.isArray(unref(form).division_choice_1) ? ssrLooseContain(unref(form).division_choice_1, division) : ssrLooseEqual(unref(form).division_choice_1, division)) ? " selected" : ""}>${ssrInterpolate(division)}</option>`);
        });
        _push(`<!--]--></select>`);
        if (unref(form).errors.division_choice_1) {
          _push(`<p class="error-message" data-v-2c5b1516>${ssrInterpolate(unref(form).errors.division_choice_1)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-2c5b1516><label class="form-label" data-v-2c5b1516>Alasan Memilih Departemen 1 <span class="required" data-v-2c5b1516>*</span></label><textarea rows="3" class="form-textarea" placeholder="Jelaskan mengapa Anda memilih departemen ini..." required data-v-2c5b1516>${ssrInterpolate(unref(form).reason_choice_1)}</textarea>`);
        if (unref(form).errors.reason_choice_1) {
          _push(`<p class="error-message" data-v-2c5b1516>${ssrInterpolate(unref(form).errors.reason_choice_1)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="division-choice" data-v-2c5b1516><div class="division-label" data-v-2c5b1516><span class="division-number" data-v-2c5b1516>2</span><span data-v-2c5b1516>Pilihan Departemen Kedua</span></div><div class="form-group" data-v-2c5b1516><label class="form-label" data-v-2c5b1516>Pilihan Departemen 2 <span class="required" data-v-2c5b1516>*</span></label><select class="form-select" required data-v-2c5b1516><option disabled value="" data-v-2c5b1516${ssrIncludeBooleanAttr(Array.isArray(unref(form).division_choice_2) ? ssrLooseContain(unref(form).division_choice_2, "") : ssrLooseEqual(unref(form).division_choice_2, "")) ? " selected" : ""}>Pilih departemen...</option><!--[-->`);
        ssrRenderList(divisions, (division) => {
          _push(`<option${ssrRenderAttr("value", division)} data-v-2c5b1516${ssrIncludeBooleanAttr(Array.isArray(unref(form).division_choice_2) ? ssrLooseContain(unref(form).division_choice_2, division) : ssrLooseEqual(unref(form).division_choice_2, division)) ? " selected" : ""}>${ssrInterpolate(division)}</option>`);
        });
        _push(`<!--]--></select><div class="form-text" data-v-2c5b1516><i class="bi bi-info-circle" data-v-2c5b1516></i> Pilihan departemen 2 boleh sama dengan pilihan departemen 1 </div>`);
        if (unref(form).errors.division_choice_2) {
          _push(`<p class="error-message" data-v-2c5b1516>${ssrInterpolate(unref(form).errors.division_choice_2)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-2c5b1516><label class="form-label" data-v-2c5b1516>Alasan Memilih Departemen 2 <span class="required" data-v-2c5b1516>*</span></label><textarea rows="3" class="form-textarea" placeholder="Jelaskan mengapa Anda memilih departemen ini..." required data-v-2c5b1516>${ssrInterpolate(unref(form).reason_choice_2)}</textarea>`);
        if (unref(form).errors.reason_choice_2) {
          _push(`<p class="error-message" data-v-2c5b1516>${ssrInterpolate(unref(form).errors.reason_choice_2)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div><div class="form-section" data-v-2c5b1516><div class="section-header" data-v-2c5b1516><i class="bi bi-patch-question-fill" data-v-2c5b1516></i><span data-v-2c5b1516>Kesediaan</span></div><div class="form-group" data-v-2c5b1516><label class="form-label" data-v-2c5b1516>Apakah Anda bersedia ditempatkan di departemen lain selain pilihan Anda? <span class="required" data-v-2c5b1516>*</span></label><div class="radio-group" data-v-2c5b1516><label class="radio-item" data-v-2c5b1516><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).willing_to_be_placed_elsewhere, true)) ? " checked" : ""} type="radio"${ssrRenderAttr("value", true)} required data-v-2c5b1516><span class="radio-checkmark" data-v-2c5b1516></span><span class="radio-label" data-v-2c5b1516><i class="bi bi-check-circle text-success" data-v-2c5b1516></i> Ya, saya bersedia </span></label><label class="radio-item" data-v-2c5b1516><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).willing_to_be_placed_elsewhere, false)) ? " checked" : ""} type="radio"${ssrRenderAttr("value", false)} required data-v-2c5b1516><span class="radio-checkmark" data-v-2c5b1516></span><span class="radio-label" data-v-2c5b1516><i class="bi bi-x-circle text-danger" data-v-2c5b1516></i> Tidak, saya tidak bersedia </span></label></div>`);
        if (unref(form).errors.willing_to_be_placed_elsewhere) {
          _push(`<p class="error-message" data-v-2c5b1516>${ssrInterpolate(unref(form).errors.willing_to_be_placed_elsewhere)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="submit-section" data-v-2c5b1516><button type="submit" class="btn-submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-2c5b1516>`);
        if (unref(form).processing) {
          _push(`<span class="spinner" data-v-2c5b1516></span>`);
        } else {
          _push(`<i class="bi bi-send" data-v-2c5b1516></i>`);
        }
        _push(`<span data-v-2c5b1516>${ssrInterpolate(unref(form).processing ? "Mengirim..." : "Daftar Sekarang")}</span></button></div></form></div></div>`);
      }
      _push(`</div></div></div></section><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Internship/Register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2c5b1516"]]);
export {
  Register as default
};
//# sourceMappingURL=Register-CHi7Fdof.js.map
