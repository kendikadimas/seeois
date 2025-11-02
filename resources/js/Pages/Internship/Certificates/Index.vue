<template>
  <div class="container mt-4 mb-4">
    <InternLayout>
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="h3 fw-bold text-dark">
            <i class="bi bi-file-pdf"></i> Sertifikat Magang
          </h1>
          <p class="text-muted">Lihat dan unduh sertifikat magang Anda di sini.</p>
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

      <!-- No Certificates Message -->
      <div v-if="!certs || certs.length === 0" class="alert alert-info" role="alert">
        <i class="bi bi-info-circle"></i>
        Anda belum memiliki sertifikat magang yang dipublikasikan.
      </div>

      <!-- Certificates Table -->
      <div v-else class="card border-0 shadow-sm">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th class="fw-bold text-dark">
                  <i class="bi bi-calendar"></i> Tanggal Terbit
                </th>
                <th class="fw-bold text-dark">
                  <i class="bi bi-person"></i> Diterbitkan Oleh
                </th>
                <th class="fw-bold text-dark">
                  <i class="bi bi-download"></i> Unduhan
                </th>
                <th class="fw-bold text-dark text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cert in certs" :key="cert.id" class="align-middle">
                <td>
                  <span class="text-dark fw-500">
                    {{ formatDate(cert.issued_at) }}
                  </span>
                </td>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <i class="bi bi-person-badge text-primary"></i>
                    <span class="text-dark">{{ cert.issuer?.name || 'N/A' }}</span>
                  </div>
                </td>
                <td>
                  <span class="badge bg-light text-dark">
                    <i class="bi bi-download"></i>
                    {{ cert.download_count || 0 }} kali
                  </span>
                </td>
                <td class="text-center">
                  <button
                    @click="downloadCertificate(cert.id)"
                    :disabled="isDownloading === cert.id"
                    class="btn btn-sm btn-primary"
                  >
                    <i v-if="isDownloading !== cert.id" class="bi bi-download"></i>
                    <span v-else class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ isDownloading === cert.id ? 'Mengunduh...' : 'Unduh' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </InternLayout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InternLayout from '@/Layouts/InternLayout.vue'
import { route } from 'ziggy-js'

defineProps({
  certs: Array
})

const isDownloading = ref(null)

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const downloadCertificate = async (certId) => {
  isDownloading.value = certId
  try {
    // Fetch the file and download it
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
  } finally {
    isDownloading.value = null
  }
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
  padding: 0.375rem 0.75rem;
}

h1 {
  color: #2c3e50;
}

.card {
  border-radius: 0.5rem;
}

.alert {
  border-radius: 0.5rem;
  border: none;
}
</style>
