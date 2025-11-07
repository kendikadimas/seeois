<template>
  <div class="certificates-manage-container">
    <Head title="Manajemen Sertifikat Internship"/>
    <StaffLayout>
      <!-- Header Section -->
      <div class="header-section">
        <div class="header-content">
          <div class="header-left">
            <div class="header-icon">
              <i class="bi bi-file-pdf"></i>
            </div>
            <div class="header-text">
              <h1 class="header-title">Manajemen Sertifikat Internship</h1>
              <p class="header-subtitle">Unggah, edit, dan kelola sertifikat Internship dari sini</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Alert Messages -->
      <div v-if="$page.props.flash.success" class="alert alert-success-custom" role="alert">
        <i class="bi bi-check-circle-fill"></i>
        <div class="alert-content">
          <strong>Sukses!</strong>
          {{ $page.props.flash.success }}
        </div>
        <button type="button" class="alert-close" @click="$event.target.parentElement.style.display='none'">
          <i class="bi bi-x"></i>
        </button>
      </div>

      <div v-if="$page.props.flash.error" class="alert alert-danger-custom" role="alert">
        <i class="bi bi-exclamation-circle-fill"></i>
        <div class="alert-content">
          <strong>Error!</strong>
          {{ $page.props.flash.error }}
        </div>
        <button type="button" class="alert-close" @click="$event.target.parentElement.style.display='none'">
          <i class="bi bi-x"></i>
        </button>
      </div>

      <!-- Main Content -->
      <div class="content-grid">
        <!-- Upload Form Card -->
        <div class="upload-card">
          <div class="card-header-custom">
            <div class="header-icon-small">
              <i class="bi bi-cloud-upload"></i>
            </div>
            <h5 class="card-title-custom">Unggah Sertifikat Baru</h5>
          </div>
          
          <div class="card-body-custom">
            <form @submit.prevent="submitForm" class="upload-form">
              <!-- Intern Selection -->
              <div class="form-group-custom">
                <label class="form-label-custom">
                  <i class="bi bi-person-check"></i>
                  Pilih Intern
                </label>
                <select
                  v-model="form.generated_for_user_id"
                  class="form-select-custom"
                  :class="{ 'is-invalid': errors.generated_for_user_id }"
                >
                  <option value="">-- Pilih Intern --</option>
                  <option v-for="intern in interns" :key="intern.id" :value="intern.id">
                    {{ intern.name }}
                  </option>
                </select>
                <div v-if="errors.generated_for_user_id" class="error-message">
                  <i class="bi bi-exclamation-circle"></i>
                  {{ errors.generated_for_user_id[0] }}
                </div>
              </div>

              <!-- File Upload -->
              <div class="form-group-custom">
                <label class="form-label-custom">
                  <i class="bi bi-file-pdf"></i>
                  File Sertifikat (PDF)
                </label>
                <div class="file-input-wrapper">
                  <input
                    type="file"
                    class="file-input-custom"
                    :class="{ 'is-invalid': errors.file }"
                    @change="form.file = $event.target.files[0]"
                    accept=".pdf"
                    id="certificateFile"
                  />
                  <label for="certificateFile" class="file-label-custom">
                    <i class="bi bi-cloud-arrow-up"></i>
                    <span v-if="!form.file">Klik untuk memilih file atau drag & drop</span>
                    <span v-else class="file-selected">
                      <i class="bi bi-check-circle-fill text-success"></i>
                      {{ form.file.name }}
                    </span>
                  </label>
                </div>
                <small class="form-hint">Maksimal 20MB, format PDF</small>
                <div v-if="errors.file" class="error-message">
                  <i class="bi bi-exclamation-circle"></i>
                  {{ errors.file[0] }}
                </div>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="btn-submit-custom"
              >
                <span v-if="!isSubmitting" class="btn-content">
                  <i class="bi bi-cloud-upload"></i>
                  Unggah Sertifikat
                </span>
                <span v-else class="btn-content">
                  <span class="spinner-custom"></span>
                  Mengunggah...
                </span>
              </button>
            </form>
          </div>
        </div>

        <!-- Certificates List Card -->
        <div class="certificates-card">
          <div class="card-header-custom">
            <div class="header-title-section">
              <div class="header-icon-small">
                <i class="bi bi-list-check"></i>
              </div>
              <div>
                <h5 class="card-title-custom">Daftar Sertifikat</h5>
                <p class="card-subtitle-custom">Total: {{ certs.length }} sertifikat</p>
              </div>
            </div>
          </div>

          <div class="certificates-list-wrapper">
            <!-- Empty State -->
            <div v-if="certs.length === 0" class="empty-state">
              <div class="empty-icon">
                <i class="bi bi-inbox"></i>
              </div>
              <h6 class="empty-title">Belum Ada Sertifikat</h6>
              <p class="empty-text">Mulai dengan mengunggah sertifikat baru di formulir di samping.</p>
            </div>

            <!-- Certificate Items -->
            <div v-else class="certificates-table">
              <div v-for="cert in certs" :key="cert.id" class="certificate-item">
                <div class="cert-header">
                  <div class="cert-info">
                    <div class="cert-recipient">
                      <i class="bi bi-person-circle"></i>
                      <div>
                        <p class="recipient-name">{{ cert.recipient?.name || 'N/A' }}</p>
                        <small class="recipient-email">{{ cert.recipient?.email || '-' }}</small>
                      </div>
                    </div>
                  </div>
                  <div class="cert-meta">
                    <div class="meta-item">
                      <i class="bi bi-calendar-event"></i>
                      <span>{{ formatDate(cert.issued_at) }}</span>
                    </div>
                    <div class="meta-item">
                      <i class="bi bi-person-badge"></i>
                      <span>{{ cert.issuer?.name || 'N/A' }}</span>
                    </div>
                  </div>
                </div>

                <div class="cert-footer">
                  <div class="cert-stats">
                    <div class="stat-badge">
                      <i class="bi bi-download"></i>
                      <span>{{ cert.download_count || 0 }} unduhan</span>
                    </div>
                    <div class="status-badge published">
                      <i class="bi bi-check2-circle"></i>
                      <span>Dipublikasikan</span>
                    </div>
                  </div>
                  <div class="cert-actions">
                    <button
                      @click="downloadCertificate(cert.id)"
                      class="btn-action btn-download"
                      title="Unduh Sertifikat"
                    >
                      <i class="bi bi-download"></i>
                      <span>Unduh</span>
                    </button>
                    <button
                      @click="deleteCertificate(cert.id)"
                      class="btn-action btn-delete"
                      title="Hapus Sertifikat"
                    >
                      <i class="bi bi-trash"></i>
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import StaffLayout from '@/Layouts/StaffLayout.vue'
import { useForm, Head, usePage } from '@inertiajs/vue3'
import { route } from 'ziggy-js'

const props = defineProps({
  interns: Array,
  certs: Array
})

const page = usePage()
const certs = ref(props.certs || [])
const interns = ref(props.interns || [])

// Debug: log props
onMounted(() => {
  console.log('Interns received:', props.interns)
  console.log('Interns count:', props.interns?.length)
  console.log('Certs received:', props.certs)
  if (!props.interns || props.interns.length === 0) {
    console.warn('⚠️ No interns data received from server!')
  }
})

const isSubmitting = ref(false)
const errors = reactive({})

const form = useForm({
  generated_for_user_id: '',
  file: null
})

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const submitForm = async () => {
  isSubmitting.value = true
  errors.value = {}

  form.post(route('certificate.store'), {
    onSuccess: () => {
      form.reset()
      isSubmitting.value = false
      
      // Fetch updated certificates dari server
      fetch(route('certificate.manage.index'))
        .then(res => res.text())
        .then(html => {
          // Parse HTML dan extract cert data dari props
          const tempDiv = document.createElement('div')
          tempDiv.innerHTML = html
          const scriptTag = tempDiv.querySelector('script[type="application/json"]')
          if (scriptTag) {
            const data = JSON.parse(scriptTag.textContent)
            if (data.props && data.props.certs) {
              certs.value = data.props.certs
            }
          }
        })
    },
    onError: (err) => {
      errors.value = err
      isSubmitting.value = false
    }
  })
}

const downloadCertificate = (certId) => {
  // Simple direct download - let server handle the increment with cache
  window.location.href = route('certificate.download', certId)
}

const deleteCertificate = (certId) => {
  if (!confirm('Apakah Anda yakin ingin menghapus sertifikat ini?')) return

  const deleteForm = useForm({})
  deleteForm.delete(route('certificate.destroy', certId), {
    onSuccess: () => {
      // Update list setelah hapus
      certs.value = certs.value.filter(c => c.id !== certId)
    }
  })
}
</script>

<style scoped>
.certificates-manage-container {
  padding: 0;
  background: linear-gradient(135deg, #f0f4f9 0%, #e8f1f8 100%);
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

/* Header Section */
.header-section {
  margin-bottom: 1rem;
  animation: slideDown 0.5s ease-out;
  padding: 2rem;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2.5rem;
  background: linear-gradient(135deg, #1e5a96 0%, #2b7abd 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(30, 90, 150, 0.25);
  color: white;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: rgba(255, 193, 7, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  backdrop-filter: blur(10px);
  color: #ffc107;
}

.header-text h1 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
}

.header-subtitle {
  margin: 0.5rem 0 0 0;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
}

/* Alert Styles */
.alert-success-custom,
.alert-danger-custom {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  margin: 0 2rem 1.5rem 2rem;
  border-radius: 12px;
  border-left: 4px solid;
  animation: slideDown 0.3s ease-out;
}

.alert-success-custom {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  border-left-color: #28a745;
  color: #155724;
}

.alert-success-custom i {
  font-size: 1.5rem;
  color: #28a745;
}

.alert-danger-custom {
  background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
  border-left-color: #dc3545;
  color: #721c24;
}

.alert-danger-custom i {
  font-size: 1.5rem;
  color: #dc3545;
}

.alert-content {
  flex: 1;
}

.alert-content strong {
  display: block;
  margin-bottom: 0.25rem;
}

.alert-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.alert-close:hover {
  opacity: 1;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 0 2rem 2rem 2rem;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

/* Card Base Styles */
.upload-card,
.certificates-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header-custom {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.75rem;
  background: linear-gradient(135deg, #1e5a96 0%, #2b7abd 100%);
  color: white;
}

.card-header-custom .header-title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.header-icon-small {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: rgba(255, 193, 7, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #ffc107;
}

.card-title-custom {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
}

.card-subtitle-custom {
  margin: 0.35rem 0 0 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
}

.card-body-custom {
  padding: 2rem;
}

/* Form Styles */
.upload-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group-custom {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label-custom {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-label-custom i {
  color: #1e5a96;
  font-size: 1.1rem;
}

.form-select-custom {
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background: white;
  cursor: pointer;
}

.form-select-custom:hover {
  border-color: #cbd5e0;
}

.form-select-custom:focus {
  outline: none;
  border-color: #1e5a96;
  box-shadow: 0 0 0 3px rgba(30, 90, 150, 0.1);
}

.form-select-custom.is-invalid {
  border-color: #dc3545;
}

/* File Input Styles */
.file-input-wrapper {
  position: relative;
}

.file-input-custom {
  display: none;
}

.file-label-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem;
  border: 2px dashed #cbd5e0;
  border-radius: 8px;
  background: #f7fafc;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #4a5568;
  font-weight: 500;
}

.file-label-custom:hover {
  border-color: #1e5a96;
  background: #f0f4f9;
  color: #1e5a96;
}

.file-label-custom i {
  font-size: 1.5rem;
  color: #ffc107;
}

.file-selected {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #28a745;
}

.form-hint {
  display: block;
  color: #a0aec0;
  font-size: 0.8rem;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #dc3545;
  font-size: 0.85rem;
  padding: 0.5rem 0.75rem;
  background: #fff5f6;
  border-radius: 6px;
}

/* Submit Button */
.btn-submit-custom {
  padding: 0.9rem 1.5rem;
  background: linear-gradient(135deg, #ffc107 0%, #ffb300 100%);
  color: #333;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
}

.btn-submit-custom:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 193, 7, 0.4);
}

.btn-submit-custom:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.spinner-custom {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(51, 51, 51, 0.3);
  border-top: 2px solid #333;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Certificates List */
.certificates-list-wrapper {
  padding: 2rem;
  max-height: 600px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* Custom scrollbar */
.certificates-list-wrapper::-webkit-scrollbar {
  width: 8px;
}

.certificates-list-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.certificates-list-wrapper::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 4px;
}

.certificates-list-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: #a0aec0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-icon {
  font-size: 3.5rem;
  color: #cbd5e0;
  margin-bottom: 1rem;
}

.empty-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #4a5568;
}

.empty-text {
  margin: 0.5rem 0 0 0;
  color: #a0aec0;
  font-size: 0.95rem;
}

/* Certificate Items */
.certificates-table {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.certificate-item {
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  transition: all 0.3s ease;
  background: white;
}

.certificate-item:hover {
  border-color: #1e5a96;
  box-shadow: 0 4px 12px rgba(30, 90, 150, 0.15);
  transform: translateY(-2px);
}

.cert-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f4f8;
}

@media (max-width: 768px) {
  .cert-header {
    flex-direction: column;
  }
}

.cert-info {
  flex: 1;
}

.cert-recipient {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cert-recipient i {
  font-size: 2rem;
  color: #1e5a96;
}

.recipient-name {
  margin: 0;
  font-weight: 600;
  color: #2d3748;
  font-size: 1rem;
}

.recipient-email {
  display: block;
  color: #a0aec0;
  font-size: 0.85rem;
}

.cert-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: right;
}

@media (max-width: 768px) {
  .cert-meta {
    text-align: left;
  }
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #718096;
  font-size: 0.9rem;
}

.meta-item i {
  color: #ffc107;
}

/* Certificates Footer */
.cert-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.cert-stats {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.stat-badge,
.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
}

.stat-badge {
  background: #e3f2fd;
  color: #1e5a96;
}

.status-badge.published {
  background: #dcfce7;
  color: #28a745;
}

.stat-badge i,
.status-badge i {
  font-size: 1rem;
}

.cert-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-action {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-download {
  background: #e3f2fd;
  color: #1e5a96;
  border: 1px solid #1e5a96;
}

.btn-download:hover {
  background: #1e5a96;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(30, 90, 150, 0.3);
}

.btn-delete {
  background: #fff5f6;
  color: #dc3545;
  border: 1px solid #dc3545;
}

.btn-delete:hover {
  background: #dc3545;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(220, 53, 69, 0.3);
}

.btn-action i {
  font-size: 1rem;
}

@media (max-width: 480px) {
  .btn-action span {
    display: none;
  }
  
  .btn-action {
    padding: 0.6rem 0.75rem;
  }
}
</style>
