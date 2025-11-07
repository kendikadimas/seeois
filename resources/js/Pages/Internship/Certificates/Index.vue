<template>
  <div class="certificates-container">
    <StaffLayout>
      <!-- Header Section -->
      <!-- <div class="header-section">
        <div class="header-content">
          <div class="header-icon">
            <i class="bi bi-file-pdf"></i>
          </div>
          <div class="header-text">
            <h1 class="header-title">Sertifikat Internship Saya</h1>
            <p class="header-subtitle">Lihat dan unduh semua sertifikat Internship Anda di sini</p>
          </div>
        </div>
      </div> -->

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

      <!-- No Certificates Message -->
      <div v-if="!certs || certs.length === 0" class="empty-state-container">
        <div class="empty-state">
          <div class="empty-icon">
            <i class="bi bi-inbox"></i>
          </div>
          <h3 class="empty-title">Belum Ada Sertifikat</h3>
          <p class="empty-text">
            Anda belum memiliki sertifikat Internship yang dipublikasikan. <br>
            Hubungi HR Manager untuk mendapatkan sertifikat Anda.
          </p>
        </div>
      </div>

      <!-- Certificates Display -->
      <div v-else class="certificates-content">
        <!-- Congratulations Section -->
        <div class="congrats-section">
          <div class="congrats-content">
            <h2 class="congrats-title">Selamat! 🎉</h2>
            <p class="congrats-message">
              Anda telah berhasil menyelesaikan program Internship di <strong>SEEO</strong>. 
              Terima kasih atas dedikasi dan kontribusi Anda selama masa Internship. 
              Pengalaman dan pembelajaran yang Anda dapatkan di sini semoga menjadi 
              bekal berharga untuk perjalanan karir Anda ke depan.
            </p>
          </div>
          
          <!-- Download Certificate Button -->
          <div v-for="cert in certs" :key="cert.id" class="cert-download-wrapper">
            <button
              @click="downloadCertificate(cert.id)"
              class="btn-download-certificate"
              title="Unduh Sertifikat PDF"
            >
              <i class="bi bi-download"></i>
              <span>Unduh Sertifikat Internship</span>
            </button>
          </div>
        </div>

        <!-- Invitation Section -->
        <div class="invitation-section">
          <div class="invitation-card">
            <div class="invitation-icon">
              <i class="bi bi-people-fill"></i>
            </div>
            <h3 class="invitation-title">Bergabung dengan Tim SEEO</h3>
            <p class="invitation-text">
              Kami mengundang Anda untuk menjadi bagian dari kepengurusan SEEO periode selanjutnya. 
              Mari bersama-sama membangun ekosistem entrepreneurship yang lebih kuat dan berdampak 
              positif bagi mahasiswa Fakultas Teknik UNSOED.
            </p>
            <div class="invitation-features">
              <div class="feature-item">
                <i class="bi bi-check-circle-fill"></i>
                <span>Kembangkan skill leadership & teamwork</span>
              </div>
              <div class="feature-item">
                <i class="bi bi-check-circle-fill"></i>
                <span>Perluas networking & relasi</span>
              </div>
              <div class="feature-item">
                <i class="bi bi-check-circle-fill"></i>
                <span>Berkontribusi dalam program-program inovatif</span>
              </div>
            </div>
            <!-- <div class="invitation-action">
              <a href="/contact" class="btn-join">
                <i class="bi bi-envelope-heart-fill"></i>
                <span>Hubungi Kami</span>
              </a>
            </div> -->
          </div>
        </div>
      </div>
    </StaffLayout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StaffLayout from '@/Layouts/StaffLayout.vue'
import { route } from 'ziggy-js'

const props = defineProps({
  certs: Array
})

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const downloadCertificate = (certId) => {
  // Simple direct download
  window.location.href = route('certificate.download', certId)
}
</script>

<style scoped>
.certificates-container {
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

.header-text .header-title {
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
  margin: 1.5rem 2rem;
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

/* Empty State */
.empty-state-container {
  padding: 2rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.empty-icon {
  font-size: 4rem;
  color: #cbd5e0;
  margin-bottom: 1rem;
}

.empty-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
}

.empty-text {
  margin: 0.75rem 0 0 0;
  color: #a0aec0;
  font-size: 1rem;
  line-height: 1.6;
}

/* Certificates Content */
.certificates-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fadeIn 0.6s ease-out;
  max-width: 1000px;
  margin: 0 auto;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Congratulations Section */
.congrats-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
}

.congrats-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffc107 0%, #ffb300 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  box-shadow: 0 8px 24px rgba(255, 193, 7, 0.3);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.congrats-content {
  flex: 1;
  text-align: left;
}

.congrats-title {
  margin: 0 0 0.75rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
}

.congrats-message {
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
  color: #64748b;
}

.congrats-message strong {
  color: #1e5a96;
  font-weight: 600;
}

/* Certificate Download */
.cert-download-wrapper {
  flex-shrink: 0;
}

.btn-download-certificate {
  padding: 1rem 2rem;
  background: #1e5a96;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 12px rgba(30, 90, 150, 0.3);
  white-space: nowrap;
}

.btn-download-certificate:hover:not(:disabled) {
  background: #2b7abd;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(30, 90, 150, 0.4);
}

.btn-download-certificate:active:not(:disabled) {
  transform: translateY(0);
}

.btn-download-certificate:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-download-certificate i {
  font-size: 1.25rem;
}

/* Invitation Section */
.invitation-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  text-align: left;
}

.invitation-card {
  text-align: left;
}

.invitation-icon {
  width: 56px;
  height: 56px;
  margin: 0 0 1rem 0;
  border-radius: 12px;
  background: #1e5a96;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: white;
}

.invitation-title {
  margin: 0 0 1rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1.2;
}

.invitation-text {
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
  line-height: 1.7;
  color: #64748b;
}

/* Invitation Features */
/* Invitation Features */
.invitation-features {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0 0 1.5rem 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0;
}

.feature-item i {
  font-size: 1.25rem;
  color: #1e5a96;
  flex-shrink: 0;
}

.feature-item span {
  font-size: 1rem;
  color: #64748b;
  font-weight: 500;
}
/* Invitation Action */
.invitation-action {
  margin-top: 1rem;
/* Invitation Action */
.invitation-action {
  margin-top: 1.5rem;
}

.btn-join {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: #1e5a96;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(30, 90, 150, 0.3);
} background: #2b7abd;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(30, 90, 150, 0.4);
}

.btn-join i {
  font-size: 1.1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .certificates-content {
    padding: 1rem;
    gap: 1rem;
  }

  .congrats-section {
    flex-direction: column;
    text-align: center;
    padding: 1.25rem;
  }

  .invitation-section {
    padding: 1.5rem;
  }

  .congrats-content {
    text-align: center;
  }

  .congrats-title {
    font-size: 1.5rem;
  }

  .congrats-message {
    font-size: 0.95rem;
  }

  .btn-download-certificate {
    padding: 0.875rem 1.5rem;
    font-size: 0.95rem;
  }

  .invitation-title {
    font-size: 1.5rem;
  }

  .invitation-text {
    font-size: 0.95rem;
  }

  .feature-item span {
    font-size: 0.95rem;
  }

  .btn-join {
    padding: 0.875rem 1.5rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }

  .header-text .header-title {
    font-size: 1.5rem;
  }

  .header-subtitle {
    font-size: 0.85rem;
  }
}
</style>
