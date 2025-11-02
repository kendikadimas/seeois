<template>
  <div class="container-fluid mt-4 mb-4">
    <StaffLayout>
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="h3 fw-bold text-dark">
            <i class="bi bi-file-pdf"></i> Manajemen Sertifikat Magang
          </h1>
          <p class="text-muted">Unggah, edit, dan kelola sertifikat magang dari sini.</p>
        </div>
      </div>

      <!-- Alert Messages -->
      <div v-if="$page.props.flash.success" class="alert alert-success alert-dismissible fade show" role="alert">
        <i class="bi bi-check-circle"></i>
        {{ $page.props.flash.success }}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>

      <div v-if="$page.props.flash.error" class="alert alert-danger alert-dismissible fade show" role="alert">
        <i class="bi bi-exclamation-circle"></i>
        {{ $page.props.flash.error }}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>

      <div class="row">
        <!-- Upload Form -->
        <div class="col-lg-4 mb-4">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">
                <i class="bi bi-cloud-upload"></i> Unggah Sertifikat Baru
              </h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitForm" enctype="multipart/form-data">
                <!-- Application Selection -->
                <div class="mb-3">
                  <label class="form-label fw-bold">Pilih Aplikasi Magang</label>
                  <select
                    v-model="form.internship_application_id"
                    class="form-select"
                    :class="{ 'is-invalid': errors.internship_application_id }"
                  >
                    <option value="">-- Pilih Aplikasi --</option>
                    <option v-for="app in applications" :key="app.id" :value="app.id">
                      {{ app.user?.name }} - {{ formatDate(app.created_at) }}
                    </option>
                  </select>
                  <div v-if="errors.internship_application_id" class="invalid-feedback">
                    {{ errors.internship_application_id[0] }}
                  </div>
                </div>

                <!-- User Selection (Optional) -->
                <div class="mb-3">
                  <label class="form-label fw-bold">Untuk Pengguna (Opsional)</label>
                  <select
                    v-model="form.generated_for_user_id"
                    class="form-select"
                    :class="{ 'is-invalid': errors.generated_for_user_id }"
                  >
                    <option value="">-- Otomatis dari Aplikasi --</option>
                  </select>
                  <small class="text-muted">Biarkan kosong untuk menggunakan pengguna dari aplikasi</small>
                  <div v-if="errors.generated_for_user_id" class="invalid-feedback">
                    {{ errors.generated_for_user_id[0] }}
                  </div>
                </div>

                <!-- File Upload -->
                <div class="mb-3">
                  <label class="form-label fw-bold">File Sertifikat (PDF)</label>
                  <input
                    type="file"
                    class="form-control"
                    :class="{ 'is-invalid': errors.file }"
                    @change="form.file = $event.target.files[0]"
                    accept=".pdf"
                  />
                  <small class="text-muted">Maksimal 20MB, format PDF</small>
                  <div v-if="errors.file" class="invalid-feedback">
                    {{ errors.file[0] }}
                  </div>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="btn btn-primary w-100"
                >
                  <i v-if="!isSubmitting" class="bi bi-cloud-upload"></i>
                  <span v-else class="spinner-border spinner-border-sm me-2" role="status"></span>
                  {{ isSubmitting ? 'Mengunggah...' : 'Unggah Sertifikat' }}
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Certificates List -->
        <div class="col-lg-8">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-light">
              <h5 class="mb-0">
                <i class="bi bi-list"></i> Daftar Sertifikat ({{ certs.length }})
              </h5>
            </div>
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead class="table-light">
                  <tr>
                    <th class="fw-bold">Penerima</th>
                    <th class="fw-bold">Tanggal Terbit</th>
                    <th class="fw-bold">Diterbitkan Oleh</th>
                    <th class="fw-bold">Unduhan</th>
                    <th class="fw-bold text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="certs.length === 0">
                    <td colspan="5" class="text-center text-muted py-4">
                      Belum ada sertifikat yang diunggah
                    </td>
                  </tr>
                  <tr v-for="cert in certs" :key="cert.id" class="align-middle">
                    <td>
                      <div class="d-flex align-items-center gap-2">
                        <i class="bi bi-person text-info"></i>
                        <span class="text-dark fw-500">{{ cert.recipient?.name || 'N/A' }}</span>
                      </div>
                    </td>
                    <td>
                      <span class="text-dark">{{ formatDate(cert.issued_at) }}</span>
                    </td>
                    <td>
                      <span class="text-muted">{{ cert.issuer?.name || 'N/A' }}</span>
                    </td>
                    <td>
                      <span class="badge bg-light text-dark">
                        <i class="bi bi-download"></i>
                        {{ cert.download_count || 0 }}
                      </span>
                    </td>
                    <td class="text-center">
                      <button
                        @click="downloadCertificate(cert.id)"
                        class="btn btn-sm btn-info me-2"
                        title="Unduh"
                      >
                        <i class="bi bi-download"></i>
                      </button>
                      <button
                        @click="deleteCertificate(cert.id)"
                        class="btn btn-sm btn-danger"
                        title="Hapus"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </StaffLayout>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import StaffLayout from '@/Layouts/StaffLayout.vue'
import { useForm } from '@inertiajs/vue3'
import { route } from 'ziggy-js'

defineProps({
  applications: Array,
  certs: Array
})

const isSubmitting = ref(false)
const errors = reactive({})

const form = useForm({
  internship_application_id: '',
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
    },
    onError: (err) => {
      errors.value = err
      isSubmitting.value = false
    }
  })
}

const downloadCertificate = async (certId) => {
  try {
    const response = await fetch(route('certificate.download', certId))
    if (!response.ok) throw new Error('Failed to download')
    
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `sertifikat-${certId}.pdf`
    document.body.appendChild(link)
    link.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(link)
  } catch (error) {
    console.error('Download error:', error)
    alert('Gagal mengunduh sertifikat')
  }
}

const deleteCertificate = (certId) => {
  if (!confirm('Apakah Anda yakin ingin menghapus sertifikat ini?')) return

  const deleteForm = useForm({})
  deleteForm.delete(route('certificate.destroy', certId))
}
</script>

<style scoped>
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
  transition: background-color 0.3s ease;
}

.badge {
  font-size: 0.85rem;
  padding: 0.4rem 0.6rem;
}

.btn-sm {
  font-size: 0.875rem;
  padding: 0.375rem 0.5rem;
}

h1, h5 {
  color: #2c3e50;
}

.card {
  border-radius: 0.5rem;
}

.card-header {
  border-radius: 0.5rem 0.5rem 0 0;
}

.form-control:focus,
.form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.alert {
  border-radius: 0.5rem;
  border: none;
}
</style>
