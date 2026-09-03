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
      _push(`<!--[--><section class="hero-section text-white py-5" data-v-a857bc0d><div class="container" data-v-a857bc0d><div class="row align-items-center min-vh-60" data-v-a857bc0d><div class="col-lg-6" data-v-a857bc0d><div class="hero-content" data-v-a857bc0d><h1 class="display-4 fw-bold mb-4" data-v-a857bc0d> Internship <span data-v-a857bc0d>SEEO 2025</span></h1><a href="#registration-form" class="btn btn-accent btn-lg px-5 py-3 fw-semibold shadow-lg" data-v-a857bc0d><i class="bi bi-arrow-down me-2" data-v-a857bc0d></i> Daftar Sekarang </a></div></div><div class="col-lg-6" data-v-a857bc0d><div class="hero-visual text-center" data-v-a857bc0d></div></div></div></div></section><section id="registration-form" class="py-5 bg-light-subtle" data-v-a857bc0d><div class="container" data-v-a857bc0d><div class="row g-4" data-v-a857bc0d><div class="col-lg-3 col-md-4" data-v-a857bc0d><div class="sidebar-sticky" data-v-a857bc0d><div class="info-card mb-4" data-v-a857bc0d><div class="info-card-header" data-v-a857bc0d><i class="bi bi-info-circle" data-v-a857bc0d></i><span data-v-a857bc0d>Panduan Pengisian</span></div><div class="info-card-body" data-v-a857bc0d><div class="guide-item" data-v-a857bc0d><div class="guide-number" data-v-a857bc0d>1</div><div data-v-a857bc0d><strong data-v-a857bc0d>Data Diri</strong><p data-v-a857bc0d>Isi data pribadi dengan lengkap dan benar. Setiap NIM dan nomor telepon hanya bisa mendaftar sekali.</p></div></div><div class="guide-item" data-v-a857bc0d><div class="guide-number" data-v-a857bc0d>2</div><div data-v-a857bc0d><strong data-v-a857bc0d>Upload KRS</strong><p data-v-a857bc0d>Upload foto KRS yang jelas (max 2MB)</p></div></div><div class="guide-item" data-v-a857bc0d><div class="guide-number" data-v-a857bc0d>3</div><div data-v-a857bc0d><strong data-v-a857bc0d>Pilihan Departemen</strong><p data-v-a857bc0d>Pilih 2 departemen sesuai minat</p></div></div><div class="guide-item" data-v-a857bc0d><div class="guide-number" data-v-a857bc0d>4</div><div data-v-a857bc0d><strong data-v-a857bc0d>Kesediaan</strong><p data-v-a857bc0d>Tentukan kesediaan penempatan</p></div></div></div></div><div class="info-card mb-4" data-v-a857bc0d><div class="info-card-header" data-v-a857bc0d><i class="bi bi-diagram-3" data-v-a857bc0d></i><span data-v-a857bc0d>Departemen Tersedia</span></div><div class="info-card-body" data-v-a857bc0d><div class="division-list" data-v-a857bc0d><!--[-->`);
      ssrRenderList(divisions, (division) => {
        _push(`<div class="division-item" data-v-a857bc0d><i class="bi bi-arrow-right" data-v-a857bc0d></i><span data-v-a857bc0d>${ssrInterpolate(division)}</span></div>`);
      });
      _push(`<!--]--></div></div></div><div class="support-card" data-v-a857bc0d><h6 data-v-a857bc0d><i class="bi bi-question-circle me-2" data-v-a857bc0d></i>Butuh Bantuan?</h6><p data-v-a857bc0d>Jika mengalami kendala saat pengisian form:</p><a href="https://wa.me/62895377161641" target="_blank" class="support-link" data-v-a857bc0d><i class="bi bi-whatsapp" data-v-a857bc0d></i><span data-v-a857bc0d>0895-3771-6141 (Diana)</span></a><a href="https://wa.me/62895424003147" target="_blank" class="support-link" data-v-a857bc0d><i class="bi bi-whatsapp" data-v-a857bc0d></i><span data-v-a857bc0d>0895-4240-03147 (Gita)</span></a></div></div></div><div class="col-lg-9 col-md-8" data-v-a857bc0d>`);
      if (__props.hasSubmitted) {
        _push(`<div class="form-card" data-v-a857bc0d><div class="form-header" data-v-a857bc0d><div class="form-header-content" data-v-a857bc0d><i class="bi bi-check-circle" data-v-a857bc0d></i><div data-v-a857bc0d><h4 data-v-a857bc0d>Pendaftaran Berhasil</h4><p data-v-a857bc0d>Terima kasih telah mendaftar SEEO Internship 2025</p></div></div></div><div class="form-body" data-v-a857bc0d><div class="success-container" data-v-a857bc0d><div class="success-icon" data-v-a857bc0d><i class="bi bi-check-circle-fill" data-v-a857bc0d></i></div><h3 class="success-title" data-v-a857bc0d>Pendaftaran Anda Telah Diterima!</h3><p class="success-message" data-v-a857bc0d> Pendaftaran internship Anda telah berhasil dikirim dan sedang dalam proses review. Tim kami akan menghubungi Anda melalui email atau WhatsApp untuk informasi selanjutnya. </p>`);
        if (__props.submissionData) {
          _push(`<div class="submission-summary" data-v-a857bc0d><h5 data-v-a857bc0d>Ringkasan Pendaftaran:</h5><div class="summary-grid" data-v-a857bc0d><div class="summary-item" data-v-a857bc0d><strong data-v-a857bc0d>Nama:</strong> ${ssrInterpolate(__props.submissionData.name)}</div><div class="summary-item" data-v-a857bc0d><strong data-v-a857bc0d>NIM:</strong> ${ssrInterpolate(__props.submissionData.nim)}</div><div class="summary-item" data-v-a857bc0d><strong data-v-a857bc0d>Program Studi:</strong> ${ssrInterpolate(__props.submissionData.study_program)}</div><div class="summary-item" data-v-a857bc0d><strong data-v-a857bc0d>Departemen Pilihan 1:</strong> ${ssrInterpolate(__props.submissionData.division_choice_1)}</div><div class="summary-item" data-v-a857bc0d><strong data-v-a857bc0d>Departemen Pilihan 2:</strong> ${ssrInterpolate(__props.submissionData.division_choice_2)}</div><div class="summary-item" data-v-a857bc0d><strong data-v-a857bc0d>Tanggal Daftar:</strong> ${ssrInterpolate(formatSubmissionDate(__props.submissionData.created_at))}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="success-actions" data-v-a857bc0d><a href="https://chat.whatsapp.com/Ef6sbho6nQ6CIVw7HnLqaB" target="_blank" class="btn-join-group" data-v-a857bc0d><i class="bi bi-whatsapp" data-v-a857bc0d></i> Gabung Grup WhatsApp </a><a href="/" class="btn-back-home" data-v-a857bc0d><i class="bi bi-house" data-v-a857bc0d></i> Kembali ke Beranda </a></div></div></div></div>`);
      } else {
        _push(`<div class="form-card" data-v-a857bc0d><div class="form-header" data-v-a857bc0d><div class="form-header-content" data-v-a857bc0d><i class="bi bi-clipboard-data" data-v-a857bc0d></i><div data-v-a857bc0d><h4 data-v-a857bc0d>Formulir Pendaftaran Internship</h4><p data-v-a857bc0d>SEEO - Internship 2025</p><small class="text-warning" data-v-a857bc0d><i class="bi bi-exclamation-triangle" data-v-a857bc0d></i> Setiap calon peserta hanya dapat mendaftar sekali</small></div></div></div><div class="form-body" data-v-a857bc0d><form enctype="multipart/form-data" data-v-a857bc0d><div class="progress-section" data-v-a857bc0d><div class="progress-bar-container" data-v-a857bc0d><div class="progress-bar" style="${ssrRenderStyle({ width: progressWidth.value + "%" })}" data-v-a857bc0d></div></div><div class="progress-labels" data-v-a857bc0d><span data-v-a857bc0d>Data Diri</span><span data-v-a857bc0d>Upload KRS</span><span data-v-a857bc0d>Pilihan Departemen</span><span data-v-a857bc0d>Kesediaan</span></div></div><div class="form-section" data-v-a857bc0d><div class="section-header" data-v-a857bc0d><i class="bi bi-person-fill" data-v-a857bc0d></i><span data-v-a857bc0d>Data Diri</span></div><div class="form-grid" data-v-a857bc0d><div class="form-group" data-v-a857bc0d><label class="form-label" data-v-a857bc0d>Nama Lengkap <span class="required" data-v-a857bc0d>*</span></label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="form-input" placeholder="Ex : Bruce Wayne" required data-v-a857bc0d>`);
        if (unref(form).errors.name) {
          _push(`<p class="error-message" data-v-a857bc0d>${ssrInterpolate(unref(form).errors.name)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-a857bc0d><label class="form-label" data-v-a857bc0d>NIM <span class="required" data-v-a857bc0d>*</span></label><input${ssrRenderAttr("value", unref(form).nim)} type="text" class="form-input" placeholder="Ex : H1D023083" required data-v-a857bc0d>`);
        if (unref(form).errors.nim) {
          _push(`<p class="error-message" data-v-a857bc0d>${ssrInterpolate(unref(form).errors.nim)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="form-grid" data-v-a857bc0d><div class="form-group" data-v-a857bc0d><label class="form-label" data-v-a857bc0d>Nomor HP/WhatsApp <span class="required" data-v-a857bc0d>*</span></label><div class="input-group" data-v-a857bc0d><span class="input-prefix" data-v-a857bc0d>+62</span><input${ssrRenderAttr("value", unref(form).phone_number)} type="tel" class="form-input" placeholder="Ex : 812-3456-7890" required data-v-a857bc0d></div>`);
        if (unref(form).errors.phone_number) {
          _push(`<p class="error-message" data-v-a857bc0d>${ssrInterpolate(unref(form).errors.phone_number)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-a857bc0d><label class="form-label" data-v-a857bc0d>Email Unsoed <span class="required" data-v-a857bc0d>*</span></label><div class="input-group" data-v-a857bc0d><input${ssrRenderAttr("value", unref(form).email_username)} type="text" class="form-input" placeholder="Ex : bruce.wayne" required data-v-a857bc0d><span class="input-suffix" data-v-a857bc0d>@mhs.unsoed.ac.id</span></div><div class="form-text" data-v-a857bc0d><i class="bi bi-info-circle" data-v-a857bc0d></i> Gunakan email mahasiswa resmi Universitas Jenderal Soedirman </div>`);
        if (unref(form).errors.email_username) {
          _push(`<p class="error-message" data-v-a857bc0d>${ssrInterpolate(unref(form).errors.email_username)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="form-group" data-v-a857bc0d><label class="form-label" data-v-a857bc0d>Program Studi <span class="required" data-v-a857bc0d>*</span></label><select class="form-select" required data-v-a857bc0d><option disabled value="" class="text-muted" data-v-a857bc0d${ssrIncludeBooleanAttr(Array.isArray(unref(form).study_program) ? ssrLooseContain(unref(form).study_program, "") : ssrLooseEqual(unref(form).study_program, "")) ? " selected" : ""}>Pilih prodi kamu..</option><!--[-->`);
        ssrRenderList(studyPrograms, (program) => {
          _push(`<option${ssrRenderAttr("value", program)} data-v-a857bc0d${ssrIncludeBooleanAttr(Array.isArray(unref(form).study_program) ? ssrLooseContain(unref(form).study_program, program) : ssrLooseEqual(unref(form).study_program, program)) ? " selected" : ""}>${ssrInterpolate(program)}</option>`);
        });
        _push(`<!--]--></select>`);
        if (unref(form).errors.study_program) {
          _push(`<p class="error-message" data-v-a857bc0d>${ssrInterpolate(unref(form).errors.study_program)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group mt-3" data-v-a857bc0d><label class="form-label" data-v-a857bc0d>Tahun Pendaftaran <span class="required" data-v-a857bc0d>*</span></label><select class="form-select" required data-v-a857bc0d><!--[-->`);
        ssrRenderList(__props.availableYears, (year) => {
          _push(`<option${ssrRenderAttr("value", year)} data-v-a857bc0d${ssrIncludeBooleanAttr(Array.isArray(unref(form).internship_year) ? ssrLooseContain(unref(form).internship_year, year) : ssrLooseEqual(unref(form).internship_year, year)) ? " selected" : ""}>${ssrInterpolate(year)}</option>`);
        });
        _push(`<!--]--></select>`);
        if (unref(form).errors.internship_year) {
          _push(`<p class="error-message" data-v-a857bc0d>${ssrInterpolate(unref(form).errors.internship_year)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="form-section" data-v-a857bc0d><div class="section-header" data-v-a857bc0d><i class="bi bi-cloud-upload" data-v-a857bc0d></i><span data-v-a857bc0d>Upload Foto KRS</span></div><div class="form-group" data-v-a857bc0d><label class="form-label" data-v-a857bc0d>Foto KRS (Kartu Rencana Studi) <span class="required" data-v-a857bc0d>*</span></label><div class="${ssrRenderClass([{ "has-file": selectedFileName.value }, "file-upload"])}" data-v-a857bc0d><input type="file" class="file-input" accept="image/jpeg,image/jpg,image/png,application/pdf" required data-v-a857bc0d><div class="file-upload-content" data-v-a857bc0d>`);
        if (!selectedFileName.value) {
          _push(`<i class="bi bi-cloud-upload-fill" data-v-a857bc0d></i>`);
        } else {
          _push(`<i class="bi bi-file-earmark-check-fill text-success" data-v-a857bc0d></i>`);
        }
        _push(`<div class="file-upload-text" data-v-a857bc0d>`);
        if (!selectedFileName.value) {
          _push(`<span data-v-a857bc0d>Klik untuk upload file</span>`);
        } else {
          _push(`<span class="text-success fw-semibold" data-v-a857bc0d>${ssrInterpolate(selectedFileName.value)}</span>`);
        }
        _push(`</div><div class="file-upload-hint" data-v-a857bc0d> JPG, PNG, JPEG, PDF (Max 2MB) </div></div></div>`);
        if (unref(form).errors.krs_photo) {
          _push(`<p class="error-message" data-v-a857bc0d>${ssrInterpolate(unref(form).errors.krs_photo)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="form-section" data-v-a857bc0d><div class="section-header" data-v-a857bc0d><i class="bi bi-diagram-3-fill" data-v-a857bc0d></i><span data-v-a857bc0d>Pilihan Departemen</span></div><div class="division-choice-container" data-v-a857bc0d><div class="division-choice" data-v-a857bc0d><div class="division-label" data-v-a857bc0d><span class="division-number" data-v-a857bc0d>1</span><span data-v-a857bc0d>Pilihan Departemen Pertama</span></div><div class="form-group" data-v-a857bc0d><label class="form-label" data-v-a857bc0d>Pilihan Departemen 1 <span class="required" data-v-a857bc0d>*</span></label><select class="form-select" required data-v-a857bc0d><option disabled value="" data-v-a857bc0d${ssrIncludeBooleanAttr(Array.isArray(unref(form).division_choice_1) ? ssrLooseContain(unref(form).division_choice_1, "") : ssrLooseEqual(unref(form).division_choice_1, "")) ? " selected" : ""}>Pilih departemen...</option><!--[-->`);
        ssrRenderList(divisions, (division) => {
          _push(`<option${ssrRenderAttr("value", division)} data-v-a857bc0d${ssrIncludeBooleanAttr(Array.isArray(unref(form).division_choice_1) ? ssrLooseContain(unref(form).division_choice_1, division) : ssrLooseEqual(unref(form).division_choice_1, division)) ? " selected" : ""}>${ssrInterpolate(division)}</option>`);
        });
        _push(`<!--]--></select>`);
        if (unref(form).errors.division_choice_1) {
          _push(`<p class="error-message" data-v-a857bc0d>${ssrInterpolate(unref(form).errors.division_choice_1)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-a857bc0d><label class="form-label" data-v-a857bc0d>Alasan Memilih Departemen 1 <span class="required" data-v-a857bc0d>*</span></label><textarea rows="3" class="form-textarea" placeholder="Jelaskan mengapa Anda memilih departemen ini..." required data-v-a857bc0d>${ssrInterpolate(unref(form).reason_choice_1)}</textarea>`);
        if (unref(form).errors.reason_choice_1) {
          _push(`<p class="error-message" data-v-a857bc0d>${ssrInterpolate(unref(form).errors.reason_choice_1)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="division-choice" data-v-a857bc0d><div class="division-label" data-v-a857bc0d><span class="division-number" data-v-a857bc0d>2</span><span data-v-a857bc0d>Pilihan Departemen Kedua</span></div><div class="form-group" data-v-a857bc0d><label class="form-label" data-v-a857bc0d>Pilihan Departemen 2 <span class="required" data-v-a857bc0d>*</span></label><select class="form-select" required data-v-a857bc0d><option disabled value="" data-v-a857bc0d${ssrIncludeBooleanAttr(Array.isArray(unref(form).division_choice_2) ? ssrLooseContain(unref(form).division_choice_2, "") : ssrLooseEqual(unref(form).division_choice_2, "")) ? " selected" : ""}>Pilih departemen...</option><!--[-->`);
        ssrRenderList(divisions, (division) => {
          _push(`<option${ssrRenderAttr("value", division)} data-v-a857bc0d${ssrIncludeBooleanAttr(Array.isArray(unref(form).division_choice_2) ? ssrLooseContain(unref(form).division_choice_2, division) : ssrLooseEqual(unref(form).division_choice_2, division)) ? " selected" : ""}>${ssrInterpolate(division)}</option>`);
        });
        _push(`<!--]--></select><div class="form-text" data-v-a857bc0d><i class="bi bi-info-circle" data-v-a857bc0d></i> Pilihan departemen 2 boleh sama dengan pilihan departemen 1 </div>`);
        if (unref(form).errors.division_choice_2) {
          _push(`<p class="error-message" data-v-a857bc0d>${ssrInterpolate(unref(form).errors.division_choice_2)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="form-group" data-v-a857bc0d><label class="form-label" data-v-a857bc0d>Alasan Memilih Departemen 2 <span class="required" data-v-a857bc0d>*</span></label><textarea rows="3" class="form-textarea" placeholder="Jelaskan mengapa Anda memilih departemen ini..." required data-v-a857bc0d>${ssrInterpolate(unref(form).reason_choice_2)}</textarea>`);
        if (unref(form).errors.reason_choice_2) {
          _push(`<p class="error-message" data-v-a857bc0d>${ssrInterpolate(unref(form).errors.reason_choice_2)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div><div class="form-section" data-v-a857bc0d><div class="section-header" data-v-a857bc0d><i class="bi bi-patch-question-fill" data-v-a857bc0d></i><span data-v-a857bc0d>Kesediaan</span></div><div class="form-group" data-v-a857bc0d><label class="form-label" data-v-a857bc0d>Apakah Anda bersedia ditempatkan di departemen lain selain pilihan Anda? <span class="required" data-v-a857bc0d>*</span></label><div class="radio-group" data-v-a857bc0d><label class="radio-item" data-v-a857bc0d><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).willing_to_be_placed_elsewhere, true)) ? " checked" : ""} type="radio"${ssrRenderAttr("value", true)} required data-v-a857bc0d><span class="radio-checkmark" data-v-a857bc0d></span><span class="radio-label" data-v-a857bc0d><i class="bi bi-check-circle text-success" data-v-a857bc0d></i> Ya, saya bersedia </span></label><label class="radio-item" data-v-a857bc0d><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).willing_to_be_placed_elsewhere, false)) ? " checked" : ""} type="radio"${ssrRenderAttr("value", false)} required data-v-a857bc0d><span class="radio-checkmark" data-v-a857bc0d></span><span class="radio-label" data-v-a857bc0d><i class="bi bi-x-circle text-danger" data-v-a857bc0d></i> Tidak, saya tidak bersedia </span></label></div>`);
        if (unref(form).errors.willing_to_be_placed_elsewhere) {
          _push(`<p class="error-message" data-v-a857bc0d>${ssrInterpolate(unref(form).errors.willing_to_be_placed_elsewhere)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="submit-section" data-v-a857bc0d><button type="submit" class="btn-submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-a857bc0d>`);
        if (unref(form).processing) {
          _push(`<span class="spinner" data-v-a857bc0d></span>`);
        } else {
          _push(`<i class="bi bi-send" data-v-a857bc0d></i>`);
        }
        _push(`<span data-v-a857bc0d>${ssrInterpolate(unref(form).processing ? "Mengirim..." : "Daftar Sekarang")}</span></button></div></form></div></div>`);
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
const Register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a857bc0d"]]);
export {
  Register as default
};
//# sourceMappingURL=Register-BG4-R6ad.js.map
