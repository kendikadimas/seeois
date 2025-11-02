<template>
    <!-- Hero Section -->
    <section class="hero-section text-white py-5">
        <div class="container">
            <div class="row align-items-center min-vh-60">
                <div class="col-lg-6">
                    <div class="hero-content">
                        <h1 class="display-4 fw-bold mb-4">
                            Internship <span>SEEO 2025</span>
                        </h1>
                        <!-- <p class="lead mb-4 opacity-90">
                            Bergabunglah dengan program internship terbaik dan dapatkan pengalaman kerja yang berharga 
                            untuk membangun karir masa depan Anda.
                        </p> -->
                        <a href="#registration-form" class="btn btn-accent btn-lg px-5 py-3 fw-semibold shadow-lg">
                            <i class="bi bi-arrow-down me-2"></i>
                            Daftar Sekarang
                        </a>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="hero-visual text-center">
                        <!-- <div class="hero-icon">
                            <i class="bi bi-building"></i>
                        </div>
                        <p class="mt-3 opacity-75">Program Internship Professional</p> -->
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Registration Form Section -->
    <section id="registration-form" class="py-5 bg-light-subtle">
        <div class="container">
            <div class="row g-4">
                <!-- Sidebar -->
                <div class="col-lg-3 col-md-4">
                    <div class="sidebar-sticky">
                        <!-- Panduan -->
                        <div class="info-card mb-4">
                            <div class="info-card-header">
                                <i class="bi bi-info-circle"></i>
                                <span>Panduan Pengisian</span>
                            </div>
                            <div class="info-card-body">
                                <div class="guide-item">
                                    <div class="guide-number">1</div>
                                    <div>
                                        <strong>Data Diri</strong>
                                        <p>Isi data pribadi dengan lengkap dan benar. Setiap NIM dan nomor telepon hanya bisa mendaftar sekali.</p>
                                    </div>
                                </div>
                                
                                <div class="guide-item">
                                    <div class="guide-number">2</div>
                                    <div>
                                        <strong>Upload KRS</strong>
                                        <p>Upload foto KRS yang jelas (max 2MB)</p>
                                    </div>
                                </div>
                                
                                <div class="guide-item">
                                    <div class="guide-number">3</div>
                                    <div>
                                        <strong>Pilihan Departemen</strong>
                                        <p>Pilih 2 departemen sesuai minat</p>
                                    </div>
                                </div>
                                
                                <div class="guide-item">
                                    <div class="guide-number">4</div>
                                    <div>
                                        <strong>Kesediaan</strong>
                                        <p>Tentukan kesediaan penempatan</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Divisi -->
                        <div class="info-card mb-4">
                            <div class="info-card-header">
                                <i class="bi bi-diagram-3"></i>
                                <span>Departemen Tersedia</span>
                            </div>
                            <div class="info-card-body">
                                <div class="division-list">
                                    <div class="division-item" v-for="division in divisions" :key="division">
                                        <i class="bi bi-arrow-right"></i>
                                        <span>{{ division }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Support -->
                        <div class="support-card">
                            <h6><i class="bi bi-question-circle me-2"></i>Butuh Bantuan?</h6>
                            <p>Jika mengalami kendala saat pengisian form:</p>
                            <a href="https://wa.me/62895377161641" target="_blank" class="support-link">
                                <i class="bi bi-whatsapp"></i>
                                <span>0895-3771-6141 (Diana)</span>
                            </a>
                            <a href="https://wa.me/62895424003147" target="_blank" class="support-link">
                                <i class="bi bi-whatsapp"></i>
                                <span>0895-4240-03147 (Gita)</span>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Main Form -->
                <div class="col-lg-9 col-md-8">
                    <!-- Already Submitted Message -->
                    <div v-if="hasSubmitted" class="form-card">
                        <div class="form-header">
                            <div class="form-header-content">
                                <i class="bi bi-check-circle"></i>
                                <div>
                                    <h4>Pendaftaran Berhasil</h4>
                                    <p>Terima kasih telah mendaftar SEEO Internship 2025</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-body">
                            <div class="success-container">
                                <div class="success-icon">
                                    <i class="bi bi-check-circle-fill"></i>
                                </div>
                                <h3 class="success-title">Pendaftaran Anda Telah Diterima!</h3>
                                <p class="success-message">
                                    Pendaftaran internship Anda telah berhasil dikirim dan sedang dalam proses review. 
                                    Tim kami akan menghubungi Anda melalui email atau WhatsApp untuk informasi selanjutnya.
                                </p>
                                
                                <div v-if="submissionData" class="submission-summary">
                                    <h5>Ringkasan Pendaftaran:</h5>
                                    <div class="summary-grid">
                                        <div class="summary-item">
                                            <strong>Nama:</strong> {{ submissionData.name }}
                                        </div>
                                        <div class="summary-item">
                                            <strong>NIM:</strong> {{ submissionData.nim }}
                                        </div>
                                        <div class="summary-item">
                                            <strong>Program Studi:</strong> {{ submissionData.study_program }}
                                        </div>
                                        <div class="summary-item">
                                            <strong>Departemen Pilihan 1:</strong> {{ submissionData.division_choice_1 }}
                                        </div>
                                        <div class="summary-item">
                                            <strong>Departemen Pilihan 2:</strong> {{ submissionData.division_choice_2 }}
                                        </div>
                                        <div class="summary-item">
                                            <strong>Tanggal Daftar:</strong> {{ formatSubmissionDate(submissionData.created_at) }}
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="success-actions">
                                    <a href="https://chat.whatsapp.com/Ef6sbho6nQ6CIVw7HnLqaB" target="_blank" class="btn-join-group">
                                        <i class="bi bi-whatsapp"></i>
                                        Gabung Grup WhatsApp
                                    </a>
                                    <a href="/" class="btn-back-home">
                                        <i class="bi bi-house"></i>
                                        Kembali ke Beranda
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Registration Form -->
                    <div v-else class="form-card">
                        <div class="form-header">
                            <div class="form-header-content">
                                <i class="bi bi-clipboard-data"></i>
                                <div>
                                    <h4>Formulir Pendaftaran Internship</h4>
                                    <p>SEEO - Internship 2025</p>
                                    <small class="text-warning"><i class="bi bi-exclamation-triangle"></i> Setiap calon peserta hanya dapat mendaftar sekali</small>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-body">
                            <form @submit.prevent="submit" enctype="multipart/form-data">
                                <!-- Progress -->
                                <div class="progress-section">
                                    <div class="progress-bar-container">
                                        <div class="progress-bar" :style="{ width: progressWidth + '%' }"></div>
                                    </div>
                                    <div class="progress-labels">
                                        <span>Data Diri</span>
                                        <span>Upload KRS</span>
                                        <span>Pilihan Departemen</span>
                                        <span>Kesediaan</span>
                                    </div>
                                </div>

                                <!-- Data Diri -->
                                <div class="form-section">
                                    <div class="section-header">
                                        <i class="bi bi-person-fill"></i>
                                        <span>Data Diri</span>
                                    </div>
                                    
                                    <div class="form-grid">
                                        <div class="form-group">
                                            <label class="form-label">Nama Lengkap <span class="required">*</span></label>
                                            <input 
                                                v-model="form.name" 
                                                type="text" 
                                                class="form-input" 
                                                placeholder="Ex : Bruce Wayne"
                                                required
                                            >
                                            <p v-if="form.errors.name" class="error-message">{{ form.errors.name }}</p>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label class="form-label">NIM <span class="required">*</span></label>
                                            <input 
                                                v-model="form.nim" 
                                                type="text" 
                                                class="form-input" 
                                                placeholder="Ex : H1D023083"
                                                required
                                            >
                                            <p v-if="form.errors.nim" class="error-message">{{ form.errors.nim }}</p>
                                        </div>
                                    </div>

                                    <div class="form-grid">
                                        <div class="form-group">
                                            <label class="form-label">Nomor HP/WhatsApp <span class="required">*</span></label>
                                            <div class="input-group">
                                                <span class="input-prefix">+62</span>
                                                <input 
                                                    v-model="form.phone_number" 
                                                    type="tel" 
                                                    class="form-input" 
                                                    placeholder="Ex : 812-3456-7890"
                                                    required
                                                >
                                            </div>
                                            <p v-if="form.errors.phone_number" class="error-message">{{ form.errors.phone_number }}</p>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label class="form-label">Email Unsoed <span class="required">*</span></label>
                                            <div class="input-group">
                                                <input 
                                                    v-model="form.email_username" 
                                                    type="text" 
                                                    class="form-input" 
                                                    placeholder="Ex : bruce.wayne"
                                                    required
                                                >
                                                <span class="input-suffix">@mhs.unsoed.ac.id</span>
                                            </div>
                                            <div class="form-text">
                                                <i class="bi bi-info-circle"></i>
                                                Gunakan email mahasiswa resmi Universitas Jenderal Soedirman
                                            </div>
                                            <p v-if="form.errors.email_username" class="error-message">{{ form.errors.email_username }}</p>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="form-label">Program Studi <span class="required">*</span></label>
                                        <select v-model="form.study_program" class="form-select" required>
                                            <option disabled value="" class="text-muted">Pilih prodi kamu..</option>
                                            <option v-for="program in studyPrograms" :key="program" :value="program">{{ program }}</option>
                                        </select>
                                        <p v-if="form.errors.study_program" class="error-message">{{ form.errors.study_program }}</p>
                                    </div>
                                </div>

                                <!-- Upload KRS -->
                                <div class="form-section">
                                    <div class="section-header">
                                        <i class="bi bi-cloud-upload"></i>
                                        <span>Upload Foto KRS</span>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">Foto KRS (Kartu Rencana Studi) <span class="required">*</span></label>
                                        <div class="file-upload" :class="{ 'has-file': selectedFileName }">
                                            <input 
                                                ref="krsInput" 
                                                @change="handleFileUpload" 
                                                type="file" 
                                                class="file-input" 
                                                accept="image/jpeg,image/jpg,image/png,application/pdf"
                                                required
                                            >
                                            <div class="file-upload-content">
                                                <i class="bi bi-cloud-upload-fill" v-if="!selectedFileName"></i>
                                                <i class="bi bi-file-earmark-check-fill text-success" v-else></i>
                                                <div class="file-upload-text">
                                                    <span v-if="!selectedFileName">Klik untuk upload file</span>
                                                    <span v-else class="text-success fw-semibold">{{ selectedFileName }}</span>
                                                </div>
                                                <div class="file-upload-hint">
                                                    JPG, PNG, JPEG, PDF (Max 2MB)
                                                </div>
                                            </div>
                                        </div>
                                        <p v-if="form.errors.krs_photo" class="error-message">{{ form.errors.krs_photo }}</p>
                                    </div>
                                </div>

                                <!-- Pilihan Divisi -->
                                <div class="form-section">
                                    <div class="section-header">
                                        <i class="bi bi-diagram-3-fill"></i>
                                        <span>Pilihan Departemen</span>
                                    </div>
                                    
                                    <div class="division-choice-container">
                                        <!-- Divisi 1 -->
                                        <div class="division-choice">
                                            <div class="division-label">
                                                <span class="division-number">1</span>
                                                <span>Pilihan Departemen Pertama</span>
                                            </div>
                                            
                                            <div class="form-group">
                                                <label class="form-label">Pilihan Departemen 1 <span class="required">*</span></label>
                                                <select v-model="form.division_choice_1" class="form-select" required>
                                                    <option disabled value="">Pilih departemen...</option>
                                                    <option v-for="division in divisions" :key="division" :value="division">{{ division }}</option>
                                                </select>
                                                <p v-if="form.errors.division_choice_1" class="error-message">{{ form.errors.division_choice_1 }}</p>
                                            </div>

                                            <div class="form-group">
                                                <label class="form-label">Alasan Memilih Departemen 1 <span class="required">*</span></label>
                                                <textarea 
                                                    v-model="form.reason_choice_1" 
                                                    rows="3" 
                                                    class="form-textarea" 
                                                    placeholder="Jelaskan mengapa Anda memilih departemen ini..."
                                                    required
                                                ></textarea>
                                                <p v-if="form.errors.reason_choice_1" class="error-message">{{ form.errors.reason_choice_1 }}</p>
                                            </div>
                                        </div>

                                        <!-- Divisi 2 -->
                                        <div class="division-choice">
                                            <div class="division-label">
                                                <span class="division-number">2</span>
                                                <span>Pilihan Departemen Kedua</span>
                                            </div>
                                            
                                            <div class="form-group">
                                                <label class="form-label">Pilihan Departemen 2 <span class="required">*</span></label>
                                                <select v-model="form.division_choice_2" class="form-select" required>
                                                    <option disabled value="">Pilih departemen...</option>
                                                    <option v-for="division in divisions" :key="division" :value="division">
                                                        {{ division }}
                                                    </option>
                                                </select>
                                                <div class="form-text">
                                                    <i class="bi bi-info-circle"></i>
                                                    Pilihan departemen 2 boleh sama dengan pilihan departemen 1
                                                </div>
                                                <p v-if="form.errors.division_choice_2" class="error-message">{{ form.errors.division_choice_2 }}</p>
                                            </div>

                                            <div class="form-group">
                                                <label class="form-label">Alasan Memilih Departemen 2 <span class="required">*</span></label>
                                                <textarea 
                                                    v-model="form.reason_choice_2" 
                                                    rows="3" 
                                                    class="form-textarea" 
                                                    placeholder="Jelaskan mengapa Anda memilih departemen ini..."
                                                    required
                                                ></textarea>
                                                <p v-if="form.errors.reason_choice_2" class="error-message">{{ form.errors.reason_choice_2 }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Kesediaan -->
                                <div class="form-section">
                                    <div class="section-header">
                                        <i class="bi bi-patch-question-fill"></i>
                                        <span>Kesediaan</span>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label">Apakah Anda bersedia ditempatkan di departemen lain selain pilihan Anda? <span class="required">*</span></label>
                                        <div class="radio-group">
                                            <label class="radio-item">
                                                <input 
                                                    v-model="form.willing_to_be_placed_elsewhere" 
                                                    type="radio" 
                                                    :value="true"
                                                    required
                                                >
                                                <span class="radio-checkmark"></span>
                                                <span class="radio-label">
                                                    <i class="bi bi-check-circle text-success"></i>
                                                    Ya, saya bersedia
                                                </span>
                                            </label>
                                            <label class="radio-item">
                                                <input 
                                                    v-model="form.willing_to_be_placed_elsewhere" 
                                                    type="radio" 
                                                    :value="false"
                                                    required
                                                >
                                                <span class="radio-checkmark"></span>
                                                <span class="radio-label">
                                                    <i class="bi bi-x-circle text-danger"></i>
                                                    Tidak, saya tidak bersedia
                                                </span>
                                            </label>
                                        </div>
                                        <p v-if="form.errors.willing_to_be_placed_elsewhere" class="error-message">{{ form.errors.willing_to_be_placed_elsewhere }}</p>
                                    </div>
                                </div>

                                <!-- Submit -->
                                <div class="submit-section">
                                    <button type="submit" class="btn-submit" :disabled="form.processing">
                                        <span v-if="form.processing" class="spinner"></span>
                                        <i v-else class="bi bi-send"></i>
                                        <span>{{ form.processing ? 'Mengirim...' : 'Daftar Sekarang' }}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div> <!-- End of Registration Form -->
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useForm, usePage } from '@inertiajs/vue3';
import { ref, onMounted, computed } from 'vue';
import Swal from 'sweetalert2';

// Define props
const props = defineProps({
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
    }
});

const page = usePage();
const krsInput = ref(null);
const selectedFileName = ref('');

// Data constants
const divisions = [
    'Financial', 'Operating', 'Administration', 'Production',
    'Marketing Medinfo', 'Sales Distribution', 'Public Relation', 'Human Resource'
];

const studyPrograms = [
    'Teknik Elektro','Teknik Sipil','Teknik Geologi','Informatika','Teknik Industri','Teknik Mesin','Teknik Komputer'
];

// Form
const form = useForm({
    name: '',
    nim: '',
    phone_number: '',
    krs_photo: null,
    email_username: '',
    study_program: '',
    division_choice_1: '',
    reason_choice_1: '',
    division_choice_2: '',
    reason_choice_2: '',
    willing_to_be_placed_elsewhere: null,
});

// Progress calculation
const progressWidth = computed(() => {
    let progress = 0;
    const fields = ['name', 'nim', 'phone_number', 'email_username', 'study_program'];
    
    const filledDataDiri = fields.filter(field => form[field]).length;
    progress += (filledDataDiri / fields.length) * 25;
    
    if (form.krs_photo) progress += 25;
    
    const divisionFields = ['division_choice_1', 'reason_choice_1', 'division_choice_2', 'reason_choice_2'];
    const filledDivision = divisionFields.filter(field => form[field]).length;
    progress += (filledDivision / divisionFields.length) * 25;
    
    if (form.willing_to_be_placed_elsewhere !== null) progress += 25;
    
    return Math.min(progress, 100);
});

// File upload handler
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            Swal.fire({
                icon: 'error',
                title: 'File Terlalu Besar',
                text: 'Ukuran file maksimal adalah 2MB.',
                confirmButtonText: 'OK'
            });
            event.target.value = '';
            form.krs_photo = null;
            selectedFileName.value = '';
            return;
        }
        
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            Swal.fire({
                icon: 'error',
                title: 'Format File Tidak Valid',
                text: 'Format yang diperbolehkan: JPG, JPEG, PNG, PDF.',
                confirmButtonText: 'OK'
            });
            event.target.value = '';
            form.krs_photo = null;
            selectedFileName.value = '';
            return;
        }
        
        form.krs_photo = file;
        selectedFileName.value = file.name;
    }
};

// Form submission
const submit = () => {
    form.post(route('internship.store'), {
        onSuccess: (page) => {
            if (page.props.flash.success) {
                if (page.props.flash.whatsapp_link) {
                    showWhatsAppPopup(page.props.flash.whatsapp_link);
                } else {
                    showSuccessPopup(page.props.flash.success);
                }
            }
        },
        onError: (errors) => {
            showErrors(errors);
        }
    });
};

const showSuccessPopup = (message) => {
    Swal.fire({
        icon: 'success',
        title: 'Pendaftaran Berhasil!',
        text: message,
        confirmButtonText: 'OK'
    });
};

const showWhatsAppPopup = (whatsappLink) => {
    Swal.fire({
        icon: 'success',
        title: 'Pendaftaran Berhasil!',
        html: `
            <p>Terima kasih telah mendaftar program internship SEEO 2025!</p>
            <p>Silakan bergabung dengan grup WhatsApp untuk informasi lebih lanjut:</p>
        `,
        showCancelButton: true,
        confirmButtonText: '<i class="bi bi-whatsapp"></i> Gabung Grup WhatsApp',
        cancelButtonText: 'Tutup',
        confirmButtonColor: '#25D366',
        cancelButtonColor: '#6c757d'
    }).then((result) => {
        if (result.isConfirmed) {
            window.open(whatsappLink, '_blank');
        }
    });
};

const showErrors = (errors) => {
    let errorMessage = 'Terjadi kesalahan pada form:\n\n';
    Object.keys(errors).forEach(key => {
        if (key === 'nim' && errors[key].includes('sudah terdaftar')) {
            errorMessage += `• ${errors[key]}\n`;
        } else if (key === 'phone_number' && errors[key].includes('sudah terdaftar')) {
            errorMessage += `• ${errors[key]}\n`;
        } else {
            errorMessage += `• ${errors[key]}\n`;
        }
    });
    
    Swal.fire({
        icon: 'error',
        title: 'Error Validasi',
        text: errorMessage,
        confirmButtonText: 'OK'
    });
};

// Format submission date
const formatSubmissionDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Component mounted
onMounted(() => {
    // Smooth scroll
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Check flash messages
    if (props.flash.success) {
        if (props.flash.whatsapp_link) {
            showWhatsAppPopup(props.flash.whatsapp_link);
        } else {
            showSuccessPopup(props.flash.success);
        }
    }
});
</script>

<style scoped>
/* Internship Form Specific Styles - High Specificity to Override Global CSS */

/* Hero Section */
.hero-section {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
    position: relative;
    overflow: hidden;
}

.hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.min-vh-60 {
    min-height: 60vh !important;
}

.hero-content {
    position: relative;
    z-index: 2;
}

.text-accent {
    color: #f59e0b !important;
}

.btn-accent {
    background: #f59e0b !important;
    border: none !important;
    color: white !important;
    border-radius: 12px !important;
    transition: all 0.3s ease !important;
}

.btn-accent:hover {
    background: #d97706 !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important;
    color: white !important;
}

.hero-visual {
    position: relative;
    z-index: 2;
}

.hero-icon i {
    font-size: 6rem !important;
    opacity: 0.8 !important;
    color: #f59e0b !important;
}

/* Layout */
.bg-light-subtle {
    background-color: #f9fafb !important;
}

.sidebar-sticky {
    position: sticky !important;
    top: 2rem !important;
}

/* Info Cards */
.info-card {
    background: white !important;
    border-radius: 16px !important;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) !important;
    border: 1px solid #e5e7eb !important;
    overflow: hidden !important;
}

.info-card-header {
    background: #f3f4f6 !important;
    padding: 1rem !important;
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    font-weight: 600 !important;
    color: #374151 !important;
    border-bottom: 1px solid #e5e7eb !important;
}

.info-card-body {
    padding: 1.5rem !important;
}

.guide-item {
    display: flex !important;
    gap: 1rem !important;
    margin-bottom: 1.5rem !important;
}

.guide-item:last-child {
    margin-bottom: 0 !important;
}

.guide-number {
    width: 2rem !important;
    height: 2rem !important;
    background: #2563eb !important;
    color: white !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-weight: 600 !important;
    font-size: 0.875rem !important;
    flex-shrink: 0 !important;
}

.guide-item strong {
    color: #1f2937 !important;
    font-size: 0.9rem !important;
}

.guide-item p {
    color: #4b5563 !important;
    font-size: 0.8rem !important;
    margin: 0.25rem 0 0 0 !important;
    line-height: 1.4 !important;
}

.division-list {
    display: flex !important;
    flex-direction: column !important;
    gap: 0.75rem !important;
}

.division-item {
    display: flex !important;
    align-items: center !important;
    gap: 0.75rem !important;
    color: #374151 !important;
    font-size: 0.875rem !important;
}

.division-item i {
    color: #059669 !important;
    font-size: 0.75rem !important;
}

.support-card {
    background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%) !important;
    padding: 1.5rem !important;
    border-radius: 16px !important;
    border: 1px solid #fbbf24 !important;
}

.support-card h6 {
    color: #1f2937 !important;
    margin-bottom: 0.75rem !important;
    font-size: 0.9rem !important;
}

.support-card p {
    color: #374151 !important;
    font-size: 0.85rem !important;
    margin-bottom: 1rem !important;
}

.support-link {
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    color: #059669 !important;
    text-decoration: none !important;
    font-weight: 600 !important;
    font-size: 0.9rem !important;
}

.support-link:hover {
    color: #047857 !important;
}

/* Form Card */
.form-card {
    background: white !important;
    border-radius: 16px !important;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important;
    overflow: hidden !important;
    border: 1px solid #e5e7eb !important;
}

.form-header {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
    color: white !important;
    padding: 2rem !important;
}

.form-header-content {
    display: flex !important;
    align-items: center !important;
    gap: 1rem !important;
}

.form-header i {
    font-size: 2.5rem !important;
    opacity: 0.9 !important;
}

.form-header h4 {
    margin: 0 !important;
    font-size: 1.5rem !important;
    font-weight: 700 !important;
    color: white !important;
}

.form-header p {
    margin: 0.25rem 0 0 0 !important;
    opacity: 0.8 !important;
    font-size: 0.95rem !important;
    color: white !important;
}

.form-body {
    padding: 2.5rem !important;
}

/* Progress */
.progress-section {
    margin-bottom: 3rem !important;
}

.progress-bar-container {
    height: 8px !important;
    background: #e5e7eb !important;
    border-radius: 999px !important;
    overflow: hidden !important;
    margin-bottom: 1rem !important;
}

.progress-bar {
    height: 100% !important;
    background: linear-gradient(90deg, #2563eb 0%, #f59e0b 100%) !important;
    border-radius: 999px !important;
    transition: width 0.5s ease !important;
}

.progress-labels {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 1rem !important;
    font-size: 0.75rem !important;
    color: #6b7280 !important;
    text-align: center !important;
}

/* Form Sections */
.form-section {
    margin-bottom: 3rem !important;
    padding-bottom: 2rem !important;
    border-bottom: 1px solid #e5e7eb !important;
}

.form-section:last-of-type {
    border-bottom: none !important;
    margin-bottom: 2rem !important;
}

.section-header {
    display: flex !important;
    align-items: center !important;
    gap: 0.75rem !important;
    margin-bottom: 2rem !important;
    padding-bottom: 0.75rem !important;
    border-bottom: 2px solid #f3f4f6 !important;
}

.section-header i {
    color: #2563eb !important;
    font-size: 1.25rem !important;
}

.section-header span {
    font-size: 1.25rem !important;
    font-weight: 700 !important;
    color: #1f2937 !important;
}

/* Form Elements */
.form-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
    gap: 1.5rem !important;
    margin-bottom: 1.5rem !important;
}

.form-group {
    margin-bottom: 1.5rem !important;
}

.form-label {
    display: block !important;
    font-weight: 600 !important;
    color: #374151 !important;
    margin-bottom: 0.5rem !important;
    font-size: 0.9rem !important;
}

.required {
    color: #dc2626 !important;
}

.form-input,
.form-select,
.form-textarea {
    width: 100% !important;
    padding: 0.75rem 1rem !important;
    border: 2px solid #d1d5db !important;
    border-radius: 12px !important;
    font-size: 0.95rem !important;
    transition: all 0.2s ease !important;
    background: white !important;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
    outline: none !important;
    border-color: #2563eb !important;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1) !important;
}

.form-textarea {
    resize: vertical !important;
    min-height: 100px !important;
    font-family: inherit !important;
}

.input-group {
    display: flex !important;
    align-items: stretch !important;
    width: 100% !important;
}

.input-prefix,
.input-suffix {
    background: #f3f4f6 !important;
    border: 2px solid #d1d5db !important;
    padding: 0.75rem 0.75rem !important;
    font-size: 0.85rem !important;
    color: #4b5563 !important;
    font-weight: 500 !important;
    white-space: nowrap !important;
    flex-shrink: 0 !important;
    display: flex !important;
    align-items: center !important;
}

.input-prefix {
    border-right: none !important;
    border-radius: 12px 0 0 12px !important;
}

.input-suffix {
    border-left: none !important;
    border-radius: 0 12px 12px 0 !important;
}

.input-group .form-input {
    border-radius: 0 !important;
    flex: 1 !important;
    min-width: 0 !important;
}

.input-group .form-input:first-child {
    border-radius: 12px 0 0 12px !important;
}

.input-group .form-input:last-child {
    border-radius: 0 12px 12px 0 !important;
}

.form-text {
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    margin-top: 0.5rem !important;
    font-size: 0.8rem !important;
    color: #6b7280 !important;
}

.error-message {
    color: #dc2626 !important;
    font-size: 0.8rem !important;
    margin-top: 0.5rem !important;
    margin-bottom: 0 !important;
}

/* File Upload */
.file-upload {
    position: relative !important;
    border: 2px dashed #d1d5db !important;
    border-radius: 12px !important;
    background: #f9fafb !important;
    transition: all 0.2s ease !important;
    cursor: pointer !important;
}

.file-upload:hover {
    border-color: #2563eb !important;
    background: rgba(37, 99, 235, 0.05) !important;
}

.file-upload.has-file {
    border-color: #059669 !important;
    background: rgba(5, 150, 105, 0.05) !important;
}

.file-input {
    position: absolute !important;
    inset: 0 !important;
    opacity: 0 !important;
    cursor: pointer !important;
}

.file-upload-content {
    padding: 2rem !important;
    text-align: center !important;
}

.file-upload-content i {
    font-size: 2.5rem !important;
    color: #9ca3af !important;
    margin-bottom: 1rem !important;
}

.file-upload-text {
    font-weight: 600 !important;
    color: #374151 !important;
    margin-bottom: 0.5rem !important;
}

.file-upload-hint {
    font-size: 0.8rem !important;
    color: #6b7280 !important;
}

/* Division Choices */
.division-choice-container {
    display: grid !important;
    gap: 2rem !important;
}

.division-choice {
    background: #f9fafb !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 16px !important;
    padding: 1.5rem !important;
}

.division-label {
    display: flex !important;
    align-items: center !important;
    gap: 0.75rem !important;
    margin-bottom: 1.5rem !important;
    padding-bottom: 0.75rem !important;
    border-bottom: 1px solid #e5e7eb !important;
}

.division-number {
    width: 2rem !important;
    height: 2rem !important;
    background: #2563eb !important;
    color: white !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-weight: 700 !important;
    font-size: 0.9rem !important;
}

.division-label span:last-child {
    font-weight: 600 !important;
    color: #1f2937 !important;
}

/* Radio Group */
.radio-group {
    display: flex !important;
    flex-direction: column !important;
    gap: 1rem !important;
}

.radio-item {
    display: flex !important;
    align-items: center !important;
    gap: 1rem !important;
    padding: 1rem !important;
    background: white !important;
    border: 2px solid #e5e7eb !important;
    border-radius: 12px !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
}

.radio-item:hover {
    border-color: #2563eb !important;
    background: rgba(37, 99, 235, 0.02) !important;
}

.radio-item input[type="radio"] {
    display: none !important;
}

.radio-checkmark {
    width: 1.25rem !important;
    height: 1.25rem !important;
    border: 2px solid #d1d5db !important;
    border-radius: 50% !important;
    position: relative !important;
    transition: all 0.2s ease !important;
}

.radio-item input[type="radio"]:checked + .radio-checkmark {
    border-color: #2563eb !important;
    background: #2563eb !important;
}

.radio-item input[type="radio"]:checked + .radio-checkmark::after {
    content: '' !important;
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: 0.5rem !important;
    height: 0.5rem !important;
    background: white !important;
    border-radius: 50% !important;
}

.radio-label {
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    font-weight: 500 !important;
    color: #374151 !important;
}

/* Submit Section */
.submit-section {
    padding-top: 2rem !important;
    border-top: 1px solid #e5e7eb !important;
}

.btn-submit {
    width: 100% !important;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
    color: white !important;
    border: none !important;
    padding: 1rem 2rem !important;
    border-radius: 12px !important;
    font-size: 1.1rem !important;
    font-weight: 600 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 0.75rem !important;
    transition: all 0.3s ease !important;
    cursor: pointer !important;
}

.btn-submit:hover:not(:disabled) {
    transform: translateY(-2px) !important;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important;
}

.btn-submit:disabled {
    opacity: 0.7 !important;
    cursor: not-allowed !important;
    transform: none !important;
}

.spinner {
    width: 1rem !important;
    height: 1rem !important;
    border: 2px solid rgba(255, 255, 255, 0.3) !important;
    border-top: 2px solid white !important;
    border-radius: 50% !important;
    animation: spin 1s linear infinite !important;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
    .sidebar-sticky {
        position: relative !important;
        top: auto !important;
    }
    
    .form-header {
        padding: 1.5rem !important;
    }
    
    .form-body {
        padding: 1.5rem !important;
    }
    
    .form-grid {
        grid-template-columns: 1fr !important;
    }
    
    .hero-section {
        text-align: center !important;
    }
    
    .display-4 {
        font-size: 2rem !important;
    }
    
    .progress-labels {
        font-size: 0.7rem !important;
    }
    
    .radio-group {
        gap: 0.75rem !important;
    }
    
    .radio-item {
        padding: 0.75rem !important;
    }
    
    .input-prefix,
    .input-suffix {
        padding: 0.75rem 0.5rem !important;
        font-size: 0.8rem !important;
    }
}

@media (max-width: 576px) {
    .division-choice-container {
        gap: 1.5rem !important;
    }
    
    .division-choice {
        padding: 1rem !important;
    }
    
    .info-card-body {
        padding: 1rem !important;
    }
    
    .support-card {
        padding: 1rem !important;
    }
    
    .form-grid {
        grid-template-columns: 1fr !important;
    }
    
    .input-prefix,
    .input-suffix {
        padding: 0.75rem 0.5rem !important;
        font-size: 0.75rem !important;
    }
}

/* Smooth animations */
.hero-content > * {
    animation: fadeInUp 0.8s ease-out;
}

.hero-content > *:nth-child(2) {
    animation-delay: 0.2s;
}

.hero-content > *:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}

/* Override global text colors */
.text-success {
    color: #059669 !important;
}

.text-danger {
    color: #dc2626 !important;
}

/* Success Page Styles */
.success-container {
    text-align: center !important;
    padding: 3rem 2rem !important;
}

.success-icon {
    font-size: 4rem !important;
    color: #059669 !important;
    margin-bottom: 2rem !important;
}

.success-title {
    color: #1f2937 !important;
    font-size: 2rem !important;
    font-weight: 700 !important;
    margin-bottom: 1rem !important;
}

.success-message {
    color: #6b7280 !important;
    font-size: 1.1rem !important;
    line-height: 1.6 !important;
    margin-bottom: 2rem !important;
    max-width: 600px !important;
    margin-left: auto !important;
    margin-right: auto !important;
}

.submission-summary {
    background: #f8fafc !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 12px !important;
    padding: 2rem !important;
    margin-bottom: 2rem !important;
    text-align: left !important;
}

.submission-summary h5 {
    color: #374151 !important;
    font-size: 1.25rem !important;
    font-weight: 600 !important;
    margin-bottom: 1.5rem !important;
    text-align: center !important;
}

.summary-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
    gap: 1rem !important;
}

.summary-item {
    padding: 0.75rem !important;
    background: white !important;
    border-radius: 8px !important;
    border: 1px solid #e5e7eb !important;
}

.summary-item strong {
    color: #374151 !important;
    display: block !important;
    font-size: 0.875rem !important;
    margin-bottom: 0.25rem !important;
}

.success-actions {
    display: flex !important;
    gap: 1rem !important;
    justify-content: center !important;
    flex-wrap: wrap !important;
}

.btn-join-group {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.75rem !important;
    padding: 1rem 2rem !important;
    background: #25D366 !important;
    color: white !important;
    text-decoration: none !important;
    border-radius: 12px !important;
    font-size: 1rem !important;
    font-weight: 600 !important;
    transition: all 0.3s ease !important;
}

.btn-join-group:hover {
    background: #1DA851 !important;
    color: white !important;
    transform: translateY(-2px) !important;
}

.btn-back-home {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.75rem !important;
    padding: 1rem 2rem !important;
    background: #6b7280 !important;
    color: white !important;
    text-decoration: none !important;
    border-radius: 12px !important;
    font-size: 1rem !important;
    font-weight: 600 !important;
    transition: all 0.3s ease !important;
}

.btn-back-home:hover {
    background: #4b5563 !important;
    color: white !important;
    transform: translateY(-2px) !important;
}

/* Success page responsive */
@media (max-width: 768px) {
    .success-container {
        padding: 2rem 1rem !important;
    }
    
    .success-title {
        font-size: 1.5rem !important;
    }
    
    .success-message {
        font-size: 1rem !important;
    }
    
    .summary-grid {
        grid-template-columns: 1fr !important;
    }
    
    .success-actions {
        flex-direction: column !important;
        align-items: center !important;
    }
    
    .btn-join-group,
    .btn-back-home {
        width: 100% !important;
        max-width: 300px !important;
        justify-content: center !important;
    }
}
</style>