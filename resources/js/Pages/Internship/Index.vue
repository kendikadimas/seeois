<template>
    <StaffLayout>
        <Head title="Data Pendaftar Internship" />
        
        <template #header>
            Data Pendaftar Internship
        </template>

        <div class="container-fluid internship-index-container">
            <!-- Main Card -->
            <div class="main-card shadow-sm mt-4">
                <!-- Card Header -->
                <div class="card-header-internship">
                    <div class="header-left">
                        <div class="header-info">
                            <h5 class="header-title">Internship SEEO 2025</h5>
                            <small class="header-subtitle">Sistem Manajemen Data Pendaftar</small>
                        </div>
                    </div>
                    <div class="header-actions">
                        <!-- Export Buttons -->
                        <div class="export-group">
                            <div class="btn-group shadow-sm" role="group">
                                <div class="btn-group" role="group">
                                    <button 
                                        type="button" 
                                        class="export-btn export-btn-pdf" 
                                        data-bs-toggle="dropdown" 
                                        aria-expanded="false"
                                        :disabled="applications.length === 0 || isExporting"
                                    >
                                        <span v-if="isExporting === 'pdf'" class="btn-spinner" role="status"></span>
                                        <i v-else class="bi bi-file-earmark-pdf"></i>
                                        <span class="btn-text">{{ isExporting === 'pdf' ? 'Generating...' : 'Export PDF' }}</span>
                                        <i class="bi bi-chevron-down"></i>
                                    </button>
                                    <ul class="dropdown-menu dropdown-menu-internship">
                                        <li>
                                            <a class="dropdown-item-internship" href="#" @click.prevent="exportToPDFSimple">
                                                <i class="bi bi-table dropdown-icon text-primary"></i>
                                                <div class="dropdown-content">
                                                    <div class="dropdown-title">PDF Ringkas</div>
                                                    <small class="dropdown-subtitle">Tanpa alasan divisi</small>
                                                </div>
                                            </a>
                                        </li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li>
                                            <a class="dropdown-item-internship" href="#" @click.prevent="exportToPDF">
                                                <i class="bi bi-file-text dropdown-icon text-success"></i>
                                                <div class="dropdown-content">
                                                    <div class="dropdown-title">PDF Lengkap</div>
                                                    <small class="dropdown-subtitle">Dengan alasan divisi</small>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                
                                <button 
                                    @click="exportToExcel" 
                                    type="button" 
                                    class="export-btn export-btn-excel"
                                    :disabled="applications.length === 0 || isExporting"
                                >
                                    <span v-if="isExporting === 'excel'" class="btn-spinner" role="status"></span>
                                    <i v-else class="bi bi-file-earmark-excel"></i>
                                    <span class="btn-text">{{ isExporting === 'excel' ? 'Generating...' : 'Export Excel' }}</span>
                                </button>
                            </div>
                        </div>
                        
                        <div class="data-counter">
                            <i class="bi bi-people"></i>
                            <span>{{ filteredApplications.length }} / {{ applications.length }}</span>
                        </div>
                    </div>
                </div>

                <div class="card-body-internship">
                    <!-- Filter Section -->
                    <div class="filter-section">
                        <div class="search-box">
                            <div class="search-input-group">
                                <span class="search-icon">
                                    <i class="bi bi-search"></i>
                                </span>
                                <input 
                                    v-model="searchQuery" 
                                    type="text" 
                                    class="search-input" 
                                    placeholder="Cari berdasarkan nama pendaftar..."
                                >
                                <button 
                                    v-if="searchQuery" 
                                    @click="clearSearch" 
                                    class="search-clear"
                                    type="button"
                                >
                                    <i class="bi bi-x"></i>
                                </button>
                            </div>
                        </div>
                        <div class="filter-box">
                            <select v-model="filterStudyProgram" class="filter-select">
                                <option value="">Semua Program Studi</option>
                                <option v-for="program in uniqueStudyPrograms" :key="program" :value="program">
                                    {{ program }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <!-- Statistics Cards -->
                    <div class="stats-grid">
                        <!-- Basic Stats -->
                        <div class="stat-card stat-primary">
                            <div class="stat-content">
                                <i class="bi bi-people stat-icon"></i>
                                <div class="stat-details">
                                    <h4 class="stat-number">{{ filteredApplications.length }}</h4>
                                    <small class="stat-label">Total Pendaftar</small>
                                </div>
                            </div>
                        </div>
                        <div class="stat-card stat-success">
                            <div class="stat-content">
                                <i class="bi bi-check-circle stat-icon"></i>
                                <div class="stat-details">
                                    <h4 class="stat-number">{{ willingCount }}</h4>
                                    <small class="stat-label">Bersedia Ditempatkan</small>
                                </div>
                            </div>
                        </div>
                        <div class="stat-card stat-warning">
                            <div class="stat-content">
                                <i class="bi bi-x-circle stat-icon"></i>
                                <div class="stat-details">
                                    <h4 class="stat-number">{{ notWillingCount }}</h4>
                                    <small class="stat-label">Tidak Bersedia</small>
                                </div>
                            </div>
                        </div>
                        <div class="stat-card stat-info">
                            <div class="stat-content">
                                <i class="bi bi-mortarboard stat-icon"></i>
                                <div class="stat-details">
                                    <h4 class="stat-number">{{ uniqueStudyPrograms.length }}</h4>
                                    <small class="stat-label">Program Studi</small>
                                </div>
                            </div>
                        </div>
                        <!-- Statistik Divisi Button -->
                        <div class="stat-card stat-gradient">
                            <div class="stat-content">
                                <i class="bi bi-diagram-3 stat-icon"></i>
                                <div class="stat-details">
                                    <h4 class="stat-number">{{ allDivisionStats.length }}</h4>
                                    <small class="stat-label">Divisi Tersedia</small>
                                </div>
                            </div>
                            <div class="stat-action">
                                <button 
                                    @click="showDivisionStatsModal" 
                                    class="stats-btn"
                                    :disabled="allDivisionStats.length === 0"
                                >
                                    <i class="bi bi-bar-chart"></i>
                                    <span>Lihat Statistik</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Table -->
                    <div class="table-container" ref="tableContainer">
                        <table class="data-table">
                            <thead class="table-header">
                                <tr>
                                    <th scope="col" class="th-center">#</th>
                                    <th scope="col">
                                        <div class="sortable-header-internship" @click="toggleSort('name')">
                                            <span>Nama</span>
                                            <i class="bi bi-arrow-down-up sort-icon-internship" 
                                               :class="{ 'active': sortField === 'name' }"></i>
                                        </div>
                                    </th>
                                    <th scope="col">NIM</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">No. HP</th>
                                    <th scope="col">
                                        <div class="sortable-header-internship" @click="toggleSort('study_program')">
                                            <span>Program Studi</span>
                                            <i class="bi bi-arrow-down-up sort-icon-internship" 
                                               :class="{ 'active': sortField === 'study_program' }"></i>
                                        </div>
                                    </th>
                                    <th scope="col">Pilihan Divisi 1</th>
                                    <th scope="col" class="hide-mobile">Alasan Divisi 1</th>
                                    <th scope="col">Pilihan Divisi 2</th>
                                    <th scope="col" class="hide-mobile">Alasan Divisi 2</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">
                                        <div class="sortable-header-internship" @click="toggleSort('created_at')">
                                            <span>Tanggal Daftar</span>
                                            <i class="bi bi-arrow-down-up sort-icon-internship" 
                                               :class="{ 'active': sortField === 'created_at' }"></i>
                                        </div>
                                    </th>
                                    <th scope="col" class="th-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="table-body">
                                <tr v-if="filteredApplications.length === 0" class="empty-row">
                                    <td colspan="13" class="empty-cell">
                                        <div class="empty-state-internship">
                                            <i class="bi bi-inbox empty-icon"></i>
                                            <h5 class="empty-title">{{ applications.length === 0 ? 'Belum Ada Data' : 'Tidak Ada Hasil' }}</h5>
                                            <p class="empty-description">{{ applications.length === 0 ? 'Belum ada pendaftar yang terdaftar.' : 'Tidak ada data yang sesuai dengan pencarian Anda.' }}</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(app, index) in paginatedApplications" :key="app.id" class="table-row">
                                    <td class="td-center">
                                        <span class="row-number">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</span>
                                    </td>
                                    <td class="td-name">
                                        <div class="name-cell">
                                            <div class="name-primary">{{ app.name }}</div>
                                            <small class="name-secondary">{{ app.nim }}</small>
                                        </div>
                                    </td>
                                    <td class="td-nim">
                                        <span>{{ app.nim }}</span>
                                    </td>
                                    <td class="td-email">
                                        <a :href="`mailto:${app.email}`" class="email-link">
                                            {{ app.email }}
                                        </a>
                                    </td>
                                    <td class="td-phone">
                                        <a 
                                            :href="getWhatsAppLink(app.phone_number)" 
                                            target="_blank" 
                                            class="phone-link"
                                            :title="`Chat WhatsApp ${app.name}`"
                                            @click="trackWhatsAppClick(app.name)"
                                        >
                                            {{ app.phone_number }}
                                        </a>
                                    </td>
                                    <td class="td-program">
                                        <span>{{ app.study_program }}</span>
                                    </td>
                                    <td class="td-division">
                                        <span class="division-text">{{ app.division_choice_1 }}</span>
                                    </td>
                                    <td class="td-reason hide-mobile">
                                        <span 
                                            :title="app.reason_choice_1" 
                                            class="reason-text"
                                        >
                                            {{ app.reason_choice_1 }}
                                        </span>
                                    </td>
                                    <td class="td-division">
                                        <span class="division-text">{{ app.division_choice_2 }}</span>
                                    </td>
                                    <td class="td-reason hide-mobile">
                                        <span 
                                            :title="app.reason_choice_2" 
                                            class="reason-text"
                                        >
                                            {{ app.reason_choice_2 }}
                                        </span>
                                    </td>
                                    <td class="td-center">
                                        <span v-if="app.willing_to_be_placed_elsewhere" class="status-badge status-success">
                                            <i class="bi bi-check-circle"></i>Bersedia
                                        </span>
                                        <span v-else class="status-badge status-danger">
                                            <i class="bi bi-x-circle"></i>Tidak Bersedia
                                        </span>
                                    </td>
                                    <td class="td-date">
                                        <small>{{ formatDate(app.created_at) }}</small>
                                    </td>
                                    <td class="td-action">
                                        <div class="action-group">
                                            <button 
                                                @click="showDetailModal(app)" 
                                                class="action-btn action-btn-info"
                                                :title="`Detail ${app.name}`"
                                            >
                                                <i class="bi bi-eye"></i>
                                                <span>Detail</span>
                                            </button>
                                            <button 
                                                @click="viewKRS(app)" 
                                                class="action-btn action-btn-primary"
                                                :title="`Lihat KRS ${app.name}`"
                                            >
                                                <i class="bi bi-file-earmark-image"></i>
                                                <span>KRS</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div v-if="totalPages > 1" class="pagination-section">
                        <div class="pagination-info">
                            Menampilkan <strong>{{ (currentPage - 1) * itemsPerPage + 1 }}</strong> - 
                            <strong>{{ Math.min(currentPage * itemsPerPage, filteredApplications.length) }}</strong> 
                            dari <strong>{{ filteredApplications.length }}</strong> data
                        </div>
                        <nav class="pagination-nav">
                            <ul class="pagination-list">
                                <li class="page-item-internship" :class="{ disabled: currentPage === 1 }">
                                    <button class="page-link-internship" @click="currentPage = 1" :disabled="currentPage === 1">
                                        <i class="bi bi-chevron-double-left"></i>
                                    </button>
                                </li>
                                <li class="page-item-internship" :class="{ disabled: currentPage === 1 }">
                                    <button class="page-link-internship" @click="currentPage--" :disabled="currentPage === 1">
                                        <i class="bi bi-chevron-left"></i>
                                    </button>
                                </li>
                                <li 
                                    v-for="page in visiblePages" 
                                    :key="page" 
                                    class="page-item-internship" 
                                    :class="{ active: page === currentPage }"
                                >
                                    <button class="page-link-internship" @click="currentPage = page">{{ page }}</button>
                                </li>
                                <li class="page-item-internship" :class="{ disabled: currentPage === totalPages }">
                                    <button class="page-link-internship" @click="currentPage++" :disabled="currentPage === totalPages">
                                        <i class="bi bi-chevron-right"></i>
                                    </button>
                                </li>
                                <li class="page-item-internship" :class="{ disabled: currentPage === totalPages }">
                                    <button class="page-link-internship" @click="currentPage = totalPages" :disabled="currentPage === totalPages">
                                        <i class="bi bi-chevron-double-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>

        <!-- Division Statistics Modal -->
        <div class="modal fade" id="divisionStatsModal" tabindex="-1" aria-labelledby="divisionStatsModalLabel" aria-hidden="true" ref="divisionStatsModal">
            <div class="modal-dialog modal-xl">
                <div class="modal-content modal-content-stats">
                    <div class="modal-header-stats">
                        <div class="modal-header-content">
                            <i class="bi bi-diagram-3 modal-icon-stats"></i>
                            <div class="modal-title-section">
                                <h5 class="modal-title-stats">Statistik Per Divisi</h5>
                                <small class="modal-subtitle-stats">Data berdasarkan pilihan pendaftar</small>
                            </div>
                        </div>
                        <button type="button" class="modal-close-stats" data-bs-dismiss="modal">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                    <div class="modal-body-stats">
                        <!-- Quick Summary -->
                        <div class="stats-summary">
                            <div class="summary-card summary-primary">
                                <div class="summary-content">
                                    <i class="bi bi-building"></i>
                                    <div class="summary-details">
                                        <h6>{{ allDivisionStats.length }}</h6>
                                        <small>Total Divisi</small>
                                    </div>
                                </div>
                            </div>
                            <div class="summary-card summary-success">
                                <div class="summary-content">
                                    <i class="bi bi-person-check"></i>
                                    <div class="summary-details">
                                        <h6>{{ totalDivisionChoices }}</h6>
                                        <small>Total Pilihan</small>
                                    </div>
                                </div>
                            </div>
                            <div class="summary-card summary-info">
                                <div class="summary-content">
                                    <i class="bi bi-trophy"></i>
                                    <div class="summary-details">
                                        <h6>{{ topDivision?.name || '-' }}</h6>
                                        <small>Paling Diminati</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Division List -->
                        <div class="division-stats-list">
                            <h6 class="list-title">
                                <i class="bi bi-list-ul"></i>
                                Daftar Divisi & Jumlah Pendaftar
                            </h6>
                            
                            <div class="division-items">
                                <div 
                                    v-for="(division, index) in allDivisionStats" 
                                    :key="division.name" 
                                    class="division-item"
                                    :class="{ 'most-popular': index === 0 }"
                                >
                                    <div class="division-info">
                                        <div class="division-header-item">
                                            <h6 class="division-name-item">
                                                <i class="bi bi-building division-icon"></i>
                                                {{ division.name }}
                                                <span v-if="index === 0" class="popular-badge">
                                                    <i class="bi bi-star-fill"></i>
                                                    Terpopuler
                                                </span>
                                            </h6>
                                        </div>
                                        
                                        <div class="division-stats-row">
                                            <div class="stat-item">
                                                <span class="stat-icon">
                                                    <i class="bi bi-1-circle"></i>
                                                </span>
                                                <div class="stat-content-item">
                                                    <span class="stat-value">{{ division.choice1 }}</span>
                                                    <span class="stat-text">Pilihan 1</span>
                                                </div>
                                            </div>
                                            
                                            <div class="stat-item">
                                                <span class="stat-icon">
                                                    <i class="bi bi-2-circle"></i>
                                                </span>
                                                <div class="stat-content-item">
                                                    <span class="stat-value">{{ division.choice2 }}</span>
                                                    <span class="stat-text">Pilihan 2</span>
                                                </div>
                                            </div>
                                            
                                            <div class="stat-item total-item">
                                                <span class="stat-icon">
                                                    <i class="bi bi-plus-circle"></i>
                                                </span>
                                                <div class="stat-content-item">
                                                    <span class="stat-value total-value">{{ division.total }}</span>
                                                    <span class="stat-text">Total</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <!-- Progress Bar -->
                                        <div class="progress-container">
                                            <div class="progress-bar-stats">
                                                <div 
                                                    class="progress-fill-stats" 
                                                    :style="{ width: `${(division.total / maxDivisionTotal) * 100}%` }"
                                                ></div>
                                            </div>
                                            <span class="progress-percentage">
                                                {{ ((division.total / totalDivisionChoices) * 100).toFixed(1) }}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer-stats">
                        <div class="footer-info">
                            <small class="text-muted">
                                <i class="bi bi-info-circle"></i>
                                Data diperbarui secara real-time berdasarkan filter yang aktif
                            </small>
                        </div>
                        <div class="modal-actions-stats">
                            <button type="button" class="btn-close-stats" data-bs-dismiss="modal">
                                <i class="bi bi-x"></i>
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Detail Modal -->
        <div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModalLabel" aria-hidden="true" ref="detailModal">
            <div class="modal-dialog modal-xl">
                <div class="modal-content modal-content-internship">
                    <div class="modal-header-internship">
                        <div class="modal-header-content">
                            <i class="bi bi-person-circle modal-icon"></i>
                            <div class="modal-title-section">
                                <h5 class="modal-title-internship">Detail Pendaftar Internship</h5>
                                <small v-if="selectedApp" class="modal-subtitle">{{ selectedApp.name }}</small>
                            </div>
                        </div>
                        <button type="button" class="modal-close" data-bs-dismiss="modal">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                    <div class="modal-body-internship" v-if="selectedApp">
                        <div class="modal-grid">
                            <!-- Personal Info -->
                            <div class="info-section">
                                <div class="info-card-internship">
                                    <div class="info-header">
                                        <h6 class="info-title">
                                            <i class="bi bi-person-fill info-icon"></i>
                                            Informasi Personal
                                        </h6>
                                    </div>
                                    <div class="info-body">
                                        <div class="info-table">
                                            <div class="info-row">
                                                <span class="info-label">Nama Lengkap:</span>
                                                <span class="info-value">{{ selectedApp.name }}</span>
                                            </div>
                                            <div class="info-row">
                                                <span class="info-label">NIM:</span>
                                                <span class="info-value">{{ selectedApp.nim }}</span>
                                            </div>
                                            <div class="info-row">
                                                <span class="info-label">Email:</span>
                                                <span class="info-value">
                                                    <a :href="`mailto:${selectedApp.email}`" class="info-link">
                                                        {{ selectedApp.email }}
                                                    </a>
                                                </span>
                                            </div>
                                            <div class="info-row">
                                                <span class="info-label">No. HP:</span>
                                                <span class="info-value">
                                                    <div class="phone-group">
                                                        <span>{{ selectedApp.phone_number }}</span>
                                                        <a 
                                                            :href="getWhatsAppLink(selectedApp.phone_number)" 
                                                            target="_blank" 
                                                            class="whatsapp-btn"
                                                        >
                                                            <i class="bi bi-whatsapp"></i>Chat
                                                        </a>
                                                    </div>
                                                </span>
                                            </div>
                                            <div class="info-row">
                                                <span class="info-label">Program Studi:</span>
                                                <span class="info-value">
                                                    <span class="program-badge">{{ selectedApp.study_program }}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Registration Info -->
                            <div class="info-section">
                                <div class="info-card-internship">
                                    <div class="info-header">
                                        <h6 class="info-title">
                                            <i class="bi bi-building info-icon"></i>
                                            Informasi Pendaftaran
                                        </h6>
                                    </div>
                                    <div class="info-body">
                                        <div class="info-table">
                                            <div class="info-row">
                                                <span class="info-label">Tanggal Daftar:</span>
                                                <span class="info-value">{{ formatDate(selectedApp.created_at) }}</span>
                                            </div>
                                            <div class="info-row">
                                                <span class="info-label">Bersedia Ditempatkan:</span>
                                                <span class="info-value">
                                                    <span v-if="selectedApp.willing_to_be_placed_elsewhere" class="status-badge status-success">
                                                        <i class="bi bi-check-circle"></i>Ya, Bersedia
                                                    </span>
                                                    <span v-else class="status-badge status-danger">
                                                        <i class="bi bi-x-circle"></i>Tidak Bersedia
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal-divider"></div>

                        <!-- Division Choices -->
                        <div class="modal-grid">
                            <div class="division-section">
                                <div class="division-card division-primary">
                                    <div class="division-header">
                                        <h6 class="division-title">
                                            <i class="bi bi-1-circle"></i>
                                            Pilihan Divisi Pertama
                                        </h6>
                                    </div>
                                    <div class="division-body">
                                        <h6 class="division-name">{{ selectedApp.division_choice_1 }}</h6>
                                        <div class="division-reason">
                                            <p>{{ selectedApp.reason_choice_1 }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="division-section">
                                <div class="division-card division-info">
                                    <div class="division-header">
                                        <h6 class="division-title">
                                            <i class="bi bi-2-circle"></i>
                                            Pilihan Divisi Kedua
                                        </h6>
                                    </div>
                                    <div class="division-body">
                                        <h6 class="division-name">{{ selectedApp.division_choice_2 }}</h6>
                                        <div class="division-reason">
                                            <p>{{ selectedApp.reason_choice_2 }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer-internship">
                        <div class="modal-actions">
                            <a 
                                v-if="selectedApp"
                                :href="getWhatsAppLink(selectedApp.phone_number)" 
                                target="_blank" 
                                class="modal-btn modal-btn-success"
                            >
                                <i class="bi bi-whatsapp"></i>Chat WhatsApp
                            </a>
                            <a 
                                v-if="selectedApp"
                                :href="`mailto:${selectedApp.email}?subject=Internship SEEO 2025 - ${selectedApp.name}`" 
                                class="modal-btn modal-btn-info"
                            >
                                <i class="bi bi-envelope"></i>Kirim Email
                            </a>
                            <button type="button" class="modal-btn modal-btn-secondary" data-bs-dismiss="modal">
                                <i class="bi bi-x"></i>Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- KRS Modal -->
        <div class="modal fade" id="krsModal" tabindex="-1" aria-labelledby="krsModalLabel" aria-hidden="true" ref="krsModal">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content krs-modal-content">
                    <div class="modal-header krs-modal-header">
                        <h5 class="modal-title" id="krsModalLabel">
                            <i class="bi bi-file-earmark-image me-2"></i>
                            KRS - {{ selectedKRSApp?.name }}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body krs-modal-body">
                        <div v-if="selectedKRSApp" class="krs-container">
                            <div class="krs-info">
                                <div class="info-item">
                                    <strong>Nama:</strong> {{ selectedKRSApp.name }}
                                </div>
                                <div class="info-item">
                                    <strong>NIM:</strong> {{ selectedKRSApp.nim }}
                                </div>
                                <div class="info-item">
                                    <strong>Program Studi:</strong> {{ selectedKRSApp.study_program }}
                                </div>
                            </div>
                            <div class="krs-viewer">
                                <iframe 
                                    v-if="getFileType(selectedKRSApp.krs_path) === 'pdf'"
                                    :src="'/storage/' + selectedKRSApp.krs_path" 
                                    class="krs-pdf-viewer"
                                    frameborder="0">
                                </iframe>
                                <img 
                                    v-else
                                    :src="'/storage/' + selectedKRSApp.krs_path" 
                                    :alt="'KRS ' + selectedKRSApp.name"
                                    class="krs-image-viewer"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer krs-modal-footer">
                        <a 
                            v-if="selectedKRSApp"
                            :href="'/storage/' + selectedKRSApp.krs_path" 
                            target="_blank" 
                            class="btn-download-krs"
                        >
                            <i class="bi bi-download"></i>
                            Download KRS
                        </a>
                        <button type="button" class="btn-close-krs" data-bs-dismiss="modal">
                            <i class="bi bi-x-lg"></i>
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </StaffLayout>
</template>

<script setup>
import StaffLayout from "@/Layouts/StaffLayout.vue";
import { Head } from "@inertiajs/vue3";
import { ref, computed, watch } from 'vue';

// Props
const props = defineProps({
    applications: {
        type: Array,
        default: () => []
    },
    user: {
        type: Object,
        required: true
    }
});

// Debug props
console.log('User data:', props.user);
console.log('Applications:', props.applications);

// Reactive data
const searchQuery = ref('');
const filterStudyProgram = ref('');
const isExporting = ref(false);
const tableContainer = ref(null);
const sortField = ref('created_at');
const sortOrder = ref('desc');
const currentPage = ref(1);
const itemsPerPage = ref(10);
const selectedApp = ref(null);
const selectedKRSApp = ref(null);
const krsModal = ref(null);
const detailModal = ref(null);
const divisionStatsModal = ref(null);

// Computed properties
const uniqueStudyPrograms = computed(() => {
    if (!props.applications || props.applications.length === 0) return [];
    const programs = [...new Set(props.applications.map(app => app.study_program))];
    return programs.sort();
});

const filteredApplications = computed(() => {
    if (!props.applications || props.applications.length === 0) return [];
    
    let filtered = [...props.applications];

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(app => 
            app.name && app.name.toLowerCase().includes(query)
        );
    }

    if (filterStudyProgram.value) {
        filtered = filtered.filter(app => 
            app.study_program === filterStudyProgram.value
        );
    }

    return filtered;
});

// Division statistics computed properties
const allDivisionStats = computed(() => {
    if (!filteredApplications.value.length) return [];
    
    const divisionCounts = {};
    
    // Count division choices
    filteredApplications.value.forEach(app => {
        // Choice 1
        if (app.division_choice_1) {
            if (!divisionCounts[app.division_choice_1]) {
                divisionCounts[app.division_choice_1] = { choice1: 0, choice2: 0 };
            }
            divisionCounts[app.division_choice_1].choice1++;
        }
        
        // Choice 2
        if (app.division_choice_2) {
            if (!divisionCounts[app.division_choice_2]) {
                divisionCounts[app.division_choice_2] = { choice1: 0, choice2: 0 };
            }
            divisionCounts[app.division_choice_2].choice2++;
        }
    });
    
    // Convert to array and calculate totals
    const stats = Object.entries(divisionCounts).map(([name, counts]) => ({
        name,
        choice1: counts.choice1,
        choice2: counts.choice2,
        total: counts.choice1 + counts.choice2
    }));
    
    // Sort by total (descending)
    return stats.sort((a, b) => b.total - a.total);
});

const topDivision = computed(() => {
    return allDivisionStats.value.length > 0 ? allDivisionStats.value[0] : null;
});

const maxDivisionTotal = computed(() => {
    return allDivisionStats.value.length > 0 ? allDivisionStats.value[0].total : 1;
});

const totalDivisionChoices = computed(() => {
    return allDivisionStats.value.reduce((sum, division) => sum + division.total, 0);
});

const sortedApplications = computed(() => {
    if (!filteredApplications.value.length) return [];
    
    const sorted = [...filteredApplications.value];
    
    if (sortField.value) {
        sorted.sort((a, b) => {
            let aValue = a[sortField.value];
            let bValue = b[sortField.value];

            if (aValue == null && bValue == null) return 0;
            if (aValue == null) return 1;
            if (bValue == null) return -1;

            if (sortField.value === 'created_at') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (sortOrder.value === 'asc') {
                return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            } else {
                return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
            }
        });
    }
    
    return sorted;
});

const paginatedApplications = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return sortedApplications.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(sortedApplications.value.length / itemsPerPage.value);
});

const visiblePages = computed(() => {
    const pages = [];
    const start = Math.max(1, currentPage.value - 2);
    const end = Math.min(totalPages.value, currentPage.value + 2);
    
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    
    return pages;
});

const willingCount = computed(() => {
    return filteredApplications.value.filter(app => app.willing_to_be_placed_elsewhere).length;
});

const notWillingCount = computed(() => {
    return filteredApplications.value.filter(app => !app.willing_to_be_placed_elsewhere).length;
});

// Watch for changes that should reset pagination
watch([searchQuery, filterStudyProgram], () => {
    currentPage.value = 1;
});

watch([sortField, sortOrder], () => {
    if (currentPage.value > totalPages.value) {
        currentPage.value = Math.max(1, totalPages.value);
    }
});

watch(totalPages, (newTotalPages) => {
    if (currentPage.value > newTotalPages && newTotalPages > 0) {
        currentPage.value = newTotalPages;
    }
});

// Methods
const showDivisionStatsModal = () => {
    const modal = new bootstrap.Modal(divisionStatsModal.value);
    modal.show();
};

const clearSearch = () => {
    searchQuery.value = '';
};

const toggleSort = (field) => {
    if (sortField.value === field) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortField.value = field;
        sortOrder.value = 'asc';
    }
};

const getWhatsAppLink = (phoneNumber) => {
    let formattedNumber = phoneNumber.replace(/\D/g, '');
    
    if (!formattedNumber.startsWith('62')) {
        if (formattedNumber.startsWith('0')) {
            formattedNumber = '62' + formattedNumber.slice(1);
        } else {
            formattedNumber = '62' + formattedNumber;
        }
    }
    
    return `https://wa.me/${formattedNumber}`;
};

const trackWhatsAppClick = (name) => {
    console.log(`WhatsApp link clicked for: ${name}`);
};

const showDetailModal = (app) => {
    selectedApp.value = app;
    const modal = new bootstrap.Modal(detailModal.value);
    modal.show();
};

const viewKRS = (app) => {
    selectedKRSApp.value = app;
    const modal = new bootstrap.Modal(krsModal.value);
    modal.show();
    
    // Log aksi untuk tracking
    console.log(`KRS viewed for: ${app.name} - ${app.nim}`);
};

const getFileType = (krsPath) => {
    if (!krsPath) return 'image';
    const extension = krsPath.split('.').pop().toLowerCase();
    return extension === 'pdf' ? 'pdf' : 'image';
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Export functions (tetap sama)
const exportToPDF = async () => {
    try {
        isExporting.value = 'pdf';
        
        // Dynamic import
        const html2canvas = (await import('html2canvas')).default;
        const { jsPDF } = await import('jspdf');
        
        // Buat container untuk semua konten
        const mainContainer = document.createElement('div');
        mainContainer.style.padding = '20px';
        mainContainer.style.backgroundColor = 'white';
        mainContainer.style.width = '1400px';
        mainContainer.style.fontFamily = 'Arial, sans-serif';
        
        // Header
        const header = document.createElement('div');
        header.innerHTML = `
            <h2 style="text-align: center; margin-bottom: 10px; color: #3f51b5;">DATA PENDAFTAR INTERNSHIP SEEO 2025</h2>
            <p style="text-align: center; margin-bottom: 5px; font-size: 14px;">Tanggal Export: ${new Date().toLocaleDateString('id-ID')}</p>
            <p style="text-align: center; margin-bottom: 20px; font-size: 14px;">Total Pendaftar: ${sortedApplications.value.length} orang</p>
            ${filterStudyProgram.value ? `<p style="text-align: center; margin-bottom: 20px; font-size: 12px; color: #666;">Filter: ${filterStudyProgram.value}</p>` : ''}
        `;
        mainContainer.appendChild(header);
        
        // Buat tabel utama (data dasar)
        const basicTable = document.createElement('table');
        basicTable.className = 'table table-bordered';
        basicTable.style.fontSize = '11px';
        basicTable.style.width = '100%';
        basicTable.style.marginBottom = '30px';
        basicTable.style.borderCollapse = 'collapse';
        
        // Header tabel dasar
        const basicThead = document.createElement('thead');
        basicThead.innerHTML = `
            <tr style="background-color: #3f51b5; color: white;">
                <th style="padding: 8px; text-align: center; border: 1px solid #ddd;">No</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Nama</th>
                <th style="padding: 8px; border: 1px solid #ddd;">NIM</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Email</th>
                <th style="padding: 8px; border: 1px solid #ddd;">No. HP</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Program Studi</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Divisi 1</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Divisi 2</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Bersedia</th>
                <th style="padding: 8px; border: 1px solid #ddd;">Tanggal Daftar</th>
            </tr>
        `;
        basicTable.appendChild(basicThead);
        
        // Body tabel dasar
        const basicTbody = document.createElement('tbody');
        sortedApplications.value.forEach((app, index) => {
            const row = document.createElement('tr');
            row.style.borderBottom = '1px solid #ddd';
            if (index % 2 === 1) row.style.backgroundColor = '#f8f9fa';
            
            row.innerHTML = `
                <td style="padding: 6px; text-align: center; border: 1px solid #ddd;">${index + 1}</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${app.name}</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${app.nim}</td>
                <td style="padding: 6px; font-size: 9px; border: 1px solid #ddd;">${app.email}</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${app.phone_number}</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${app.study_program}</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${app.division_choice_1}</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${app.division_choice_2}</td>
                <td style="padding: 6px; text-align: center; border: 1px solid #ddd;">${app.willing_to_be_placed_elsewhere ? 'Ya' : 'Tidak'}</td>
                <td style="padding: 6px; font-size: 9px; border: 1px solid #ddd;">${formatDate(app.created_at)}</td>
            `;
            basicTbody.appendChild(row);
        });
        basicTable.appendChild(basicTbody);
        mainContainer.appendChild(basicTable);
        
        // Tambahkan section alasan divisi
        const reasonSection = document.createElement('div');
        reasonSection.innerHTML = `
            <h3 style="color: #3f51b5; margin-bottom: 15px; border-bottom: 2px solid #3f51b5; padding-bottom: 5px;">ALASAN PEMILIHAN DIVISI</h3>
        `;
        mainContainer.appendChild(reasonSection);
        
        // Buat cards untuk setiap pendaftar dengan alasan divisi
        sortedApplications.value.forEach((app, index) => {
            const reasonCard = document.createElement('div');
            reasonCard.style.border = '1px solid #ddd';
            reasonCard.style.borderRadius = '8px';
            reasonCard.style.marginBottom = '15px';
            reasonCard.style.padding = '15px';
            reasonCard.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f8f9fa';
            
            reasonCard.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 8px;">
                    <h4 style="margin: 0; color: #3f51b5; font-size: 14px;">${index + 1}. ${app.name} (${app.nim})</h4>
                    <span style="font-size: 12px; color: #666;">${app.study_program}</span>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <div style="background-color: #e3f2fd; padding: 8px; border-radius: 4px; margin-bottom: 5px;">
                            <strong style="color: #1976d2; font-size: 12px;">Pilihan Divisi 1: ${app.division_choice_1}</strong>
                        </div>
                        <div style="font-size: 11px; line-height: 1.4; text-align: justify; padding: 5px;">
                            ${app.reason_choice_1}
                        </div>
                    </div>
                    
                    <div>
                        <div style="background-color: #e8f5e8; padding: 8px; border-radius: 4px; margin-bottom: 5px;">
                            <strong style="color: #2e7d32; font-size: 12px;">Pilihan Divisi 2: ${app.division_choice_2}</strong>
                        </div>
                        <div style="font-size: 11px; line-height: 1.4; text-align: justify; padding: 5px;">
                            ${app.reason_choice_2}
                        </div>
                    </div>
                </div>
            `;
            
            mainContainer.appendChild(reasonCard);
        });
        
        // Tambahkan footer
        const footer = document.createElement('div');
        footer.style.marginTop = '20px';
        footer.style.textAlign = 'center';
        footer.style.fontSize = '10px';
        footer.style.color = '#666';
        footer.innerHTML = `
            <p>Dokumen ini digenerate secara otomatis pada ${new Date().toLocaleString('id-ID')}</p>
            <p>© ${new Date().getFullYear()} SEEO Information System</p>
        `;
        mainContainer.appendChild(footer);
        
        // Tambahkan ke DOM sementara
        document.body.appendChild(mainContainer);
        
        // Capture dengan html2canvas
        const canvas = await html2canvas(mainContainer, {
            scale: 1.5, // Kurangi scale untuk performa lebih baik
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            height: mainContainer.scrollHeight,
            width: mainContainer.scrollWidth
        });
        
        // Remove dari DOM
        document.body.removeChild(mainContainer);
        
        // Buat PDF dengan multiple pages jika perlu
        const pdf = new jsPDF('portrait', 'mm', 'a4');
        const imgWidth = 210; // A4 width
        const pageHeight = 297; // A4 height
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        let heightLeft = imgHeight;
        let position = 0;
        
        // Add first page
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        // Add additional pages if needed
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        // Save
        const fileName = `Data_Pendaftar_Internship_SEEO_Lengkap_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(fileName);
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Terjadi kesalahan saat membuat PDF. Silakan coba lagi.');
    } finally {
        isExporting.value = false;
    }
};

const exportToPDFSimple = async () => {
    try {
        isExporting.value = 'pdf';
        
        // Dynamic import
        const html2canvas = (await import('html2canvas')).default;
        const { jsPDF } = await import('jspdf');
        
        // Buat elemen table terpisah untuk export (tanpa responsive classes)
        const exportTable = document.createElement('table');
        exportTable.className = 'table table-bordered';
        exportTable.style.fontSize = '12px';
        exportTable.style.width = '100%';
        
        // Header table
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr style="background-color: #3f51b5; color: white;">
                <th style="padding: 8px; text-align: center;">No</th>
                <th style="padding: 8px;">Nama</th>
                <th style="padding: 8px;">NIM</th>
                <th style="padding: 8px;">Email</th>
                <th style="padding: 8px;">No. HP</th>
                <th style="padding: 8px;">Program Studi</th>
                <th style="padding: 8px;">Divisi 1</th>
                <th style="padding: 8px;">Divisi 2</th>
                <th style="padding: 8px;">Bersedia</th>
                <th style="padding: 8px;">Tanggal Daftar</th>
            </tr>
        `;
        exportTable.appendChild(thead);
        
        // Body table
        const tbody = document.createElement('tbody');
        sortedApplications.value.forEach((app, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="padding: 6px; text-align: center;">${index + 1}</td>
                <td style="padding: 6px;">${app.name}</td>
                <td style="padding: 6px;">${app.nim}</td>
                <td style="padding: 6px; font-size: 10px;">${app.email}</td>
                <td style="padding: 6px;">${app.phone_number}</td>
                <td style="padding: 6px;">${app.study_program}</td>
                <td style="padding: 6px;">${app.division_choice_1}</td>
                <td style="padding: 6px;">${app.division_choice_2}</td>
                <td style="padding: 6px; text-align: center;">${app.willing_to_be_placed_elsewhere ? 'Ya' : 'Tidak'}</td>
                <td style="padding: 6px; font-size: 10px;">${formatDate(app.created_at)}</td>
            `;
            tbody.appendChild(row);
        });
        exportTable.appendChild(tbody);
        
        // Container untuk export
        const container = document.createElement('div');
        container.style.padding = '20px';
        container.style.backgroundColor = 'white';
        container.style.width = '1200px';
        
        // Header
        const header = document.createElement('div');
        header.innerHTML = `
            <h2 style="text-align: center; margin-bottom: 10px;">DATA PENDAFTAR INTERNSHIP SEEO 2025</h2>
            <p style="text-align: center; margin-bottom: 5px;">Tanggal Export: ${new Date().toLocaleDateString('id-ID')}</p>
            <p style="text-align: center; margin-bottom: 20px;">Total Pendaftar: ${sortedApplications.value.length} orang</p>
        `;
        
        container.appendChild(header);
        container.appendChild(exportTable);
        
        // Tambahkan ke DOM sementara
        document.body.appendChild(container);
        
        // Capture dengan html2canvas
        const canvas = await html2canvas(container, {
            scale: 2,
            useCORS: true,
            allowTaint: true
        });
        
        // Remove dari DOM
        document.body.removeChild(container);
        
        // Buat PDF
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        const imgWidth = 297; // A4 landscape width
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
        
        // Save
        const fileName = `Data_Pendaftar_Internship_SEEO_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(fileName);
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Terjadi kesalahan saat membuat PDF. Silakan coba lagi.');
    } finally {
        isExporting.value = false;
    }
};

const exportToExcel = async () => {
    try {
        isExporting.value = 'excel';
        
        // Dynamic import XLSX
        const XLSX = await import('xlsx');
        
        // Buat data untuk Excel
        const excelData = sortedApplications.value.map((app, index) => ({
            'No': index + 1,
            'Nama Lengkap': app.name,
            'NIM': app.nim,
            'Email': app.email,
            'No. HP': app.phone_number,
            'Program Studi': app.study_program,
            'Pilihan Divisi 1': app.division_choice_1,
            'Alasan Pilihan Divisi 1': app.reason_choice_1,
            'Pilihan Divisi 2': app.division_choice_2,
            'Alasan Pilihan Divisi 2': app.reason_choice_2,
            'Bersedia Ditempatkan di Divisi Lain': app.willing_to_be_placed_elsewhere ? 'Ya' : 'Tidak',
            'Tanggal Pendaftaran': formatDate(app.created_at)
        }));

        // Create workbook dan worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(excelData);

        // Set column widths
        const colWidths = [
            { wch: 5 },  // No
            { wch: 25 }, // Nama Lengkap
            { wch: 15 }, // NIM
            { wch: 30 }, // Email
            { wch: 15 }, // No HP
            { wch: 20 }, // Program Studi
            { wch: 20 }, // Pilihan Divisi 1
            { wch: 40 }, // Alasan Pilihan Divisi 1
            { wch: 20 }, // Pilihan Divisi 2
            { wch: 40 }, // Alasan Pilihan Divisi 2
            { wch: 25 }, // Bersedia Ditempatkan
            { wch: 20 }, // Tanggal Pendaftaran
        ];
        ws['!cols'] = colWidths;

        // Add hyperlinks untuk kolom No. HP (kolom E)
        sortedApplications.value.forEach((app, index) => {
            const rowIndex = index + 2; // +2 karena header di row 1, data mulai row 2
            const cellRef = `E${rowIndex}`; // Kolom E untuk No. HP
            
            if (ws[cellRef]) {
                // Format nomor HP untuk WhatsApp (hapus karakter non-digit)
                let phoneNumber = app.phone_number.replace(/\D/g, '');
                
                // Tambahkan kode negara Indonesia jika belum ada
                if (!phoneNumber.startsWith('62')) {
                    if (phoneNumber.startsWith('0')) {
                        phoneNumber = '62' + phoneNumber.slice(1);
                    } else {
                        phoneNumber = '62' + phoneNumber;
                    }
                }
                
                // Buat WhatsApp link
                const whatsappLink = `https://wa.me/${phoneNumber}`;
                
                // Set cell sebagai hyperlink
                ws[cellRef].l = { Target: whatsappLink, Tooltip: `Chat WhatsApp ${app.name}` };
                
                // Style hyperlink
                ws[cellRef].s = {
                    font: { 
                        color: { rgb: "0000FF" }, 
                        underline: true 
                    }
                };
            }
        });

        // Add header styling untuk semua kolom
        const range = XLSX.utils.decode_range(ws['!ref']);
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell_address = XLSX.utils.encode_cell({ c: C, r: 0 });
            if (!ws[cell_address]) continue;
            ws[cell_address].s = {
                font: { 
                    bold: true, 
                    color: { rgb: "FFFFFF" } 
                },
                fill: { 
                    fgColor: { rgb: "3F51B5" } 
                },
                alignment: { 
                    horizontal: "center",
                    vertical: "center"
                }
            };
        }

        // Style untuk data rows
        for (let R = range.s.r + 1; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cell_address = XLSX.utils.encode_cell({ c: C, r: R });
                if (!ws[cell_address]) continue;
                
                // Alternating row colors
                if (R % 2 === 0) {
                    ws[cell_address].s = {
                        ...ws[cell_address].s,
                        fill: { fgColor: { rgb: "F8F9FA" } }
                    };
                }
                
                // Center alignment untuk kolom No dan Bersedia
                if (C === 0 || C === 10) { // Kolom No dan Bersedia
                    ws[cell_address].s = {
                        ...ws[cell_address].s,
                        alignment: { horizontal: "center", vertical: "center" }
                    };
                }
            }
        }

        // Add worksheet ke workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Data Pendaftar Internship');

        // Create summary sheet
        const summaryData = [
            ['RINGKASAN DATA PENDAFTAR INTERNSHIP SEEO 2025'],
            [''],
            ['Total Pendaftar', sortedApplications.value.length],
            ['Tanggal Export', new Date().toLocaleDateString('id-ID')],
            ['Waktu Export', new Date().toLocaleTimeString('id-ID')],
            [''],
            ['STATISTIK BERDASARKAN PROGRAM STUDI'],
            ['Program Studi', 'Jumlah Pendaftar'],
        ];

        // Group by study program
        const studyProgramStats = {};
        sortedApplications.value.forEach(app => {
            studyProgramStats[app.study_program] = (studyProgramStats[app.study_program] || 0) + 1;
        });

        Object.entries(studyProgramStats).forEach(([program, count]) => {
            summaryData.push([program, count]);
        });

        summaryData.push([]);
        summaryData.push(['STATISTIK BERDASARKAN PILIHAN DIVISI']);
        summaryData.push(['Divisi', 'Pilihan 1', 'Pilihan 2', 'Total']);

        // Group by division choices
        const divisionStats = {};
        sortedApplications.value.forEach(app => {
            // Division choice 1
            divisionStats[app.division_choice_1] = divisionStats[app.division_choice_1] || { choice1: 0, choice2: 0 };
            divisionStats[app.division_choice_1].choice1++;
            
            // Division choice 2
            divisionStats[app.division_choice_2] = divisionStats[app.division_choice_2] || { choice1: 0, choice2: 0 };
            divisionStats[app.division_choice_2].choice2++;
        });

        Object.entries(divisionStats).forEach(([division, stats]) => {
            summaryData.push([division, stats.choice1, stats.choice2, stats.choice1 + stats.choice2]);
        });

        // Add kesediaan ditempatkan statistics
        summaryData.push([]);
        summaryData.push(['STATISTIK KESEDIAAN DITEMPATKAN']);
        summaryData.push(['Kategori', 'Jumlah', 'Persentase']);
        summaryData.push([
            'Bersedia Ditempatkan', 
            willingCount.value, 
            `${((willingCount.value / sortedApplications.value.length) * 100).toFixed(1)}%`
        ]);
        summaryData.push([
            'Tidak Bersedia', 
            notWillingCount.value, 
            `${((notWillingCount.value / sortedApplications.value.length) * 100).toFixed(1)}%`
        ]);

        const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
        
        // Style summary sheet
        summaryWs['!cols'] = [{ wch: 35 }, { wch: 20 }, { wch: 15 }, { wch: 15 }];
        
        // Style title
        if (summaryWs['A1']) {
            summaryWs['A1'].s = {
                font: { bold: true, size: 16, color: { rgb: "3F51B5" } },
                alignment: { horizontal: "center" }
            };
        }

        // Merge title cell
        summaryWs['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];

        XLSX.utils.book_append_sheet(wb, summaryWs, 'Ringkasan');

        // Create contact sheet dengan semua kontak WhatsApp
        const contactData = [
            ['DAFTAR KONTAK WHATSAPP PENDAFTAR'],
            [''],
            ['No', 'Nama', 'Program Studi', 'No. HP', 'Link WhatsApp'],
        ];

        sortedApplications.value.forEach((app, index) => {
            let phoneNumber = app.phone_number.replace(/\D/g, '');
            if (!phoneNumber.startsWith('62')) {
                if (phoneNumber.startsWith('0')) {
                    phoneNumber = '62' + phoneNumber.slice(1);
                } else {
                    phoneNumber = '62' + phoneNumber;
                }
            }
            const whatsappLink = `https://wa.me/${phoneNumber}`;
            
            contactData.push([
                index + 1,
                app.name,
                app.study_program,
                app.phone_number,
                whatsappLink
            ]);
        });

        const contactWs = XLSX.utils.aoa_to_sheet(contactData);
        contactWs['!cols'] = [{ wch: 5 }, { wch: 25 }, { wch: 20 }, { wch: 15 }, { wch: 40 }];

        // Add hyperlinks untuk contact sheet
        sortedApplications.value.forEach((app, index) => {
            const rowIndex = index + 4; // +4 karena header mulai row 4
            const cellRef = `E${rowIndex}`; // Kolom E untuk link WhatsApp
            
            if (contactWs[cellRef]) {
                let phoneNumber = app.phone_number.replace(/\D/g, '');
                if (!phoneNumber.startsWith('62')) {
                    if (phoneNumber.startsWith('0')) {
                        phoneNumber = '62' + phoneNumber.slice(1);
                    } else {
                        phoneNumber = '62' + phoneNumber;
                    }
                }
                const whatsappLink = `https://wa.me/${phoneNumber}`;
                
                contactWs[cellRef].l = { Target: whatsappLink, Tooltip: `Chat ${app.name}` };
                contactWs[cellRef].s = {
                    font: { color: { rgb: "0000FF" }, underline: true }
                };
            }
        });

        XLSX.utils.book_append_sheet(wb, contactWs, 'Kontak WhatsApp');

        // Save Excel file
        const fileName = `Data_Pendaftar_Internship_SEEO_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
        
    } catch (error) {
        console.error('Error generating Excel:', error);
        alert('Terjadi kesalahan saat membuat Excel. Silakan coba lagi.');
    } finally {
        isExporting.value = false;
    }
};

// Export to CSV (simple method)
const exportToCSV = () => {
    try {
        const headers = ['No', 'Nama', 'NIM', 'Email', 'No. HP', 'Program Studi', 'Divisi 1', 'Alasan 1', 'Divisi 2', 'Alasan 2', 'Bersedia', 'Tanggal'];
        
        const csvData = [
            headers,
            ...sortedApplications.value.map((app, index) => [
                index + 1,
                app.name,
                app.nim,
                app.email,
                app.phone_number,
                app.study_program,
                app.division_choice_1,
                app.reason_choice_1.replace(/,/g, ';'), // Replace comma to avoid CSV issues
                app.division_choice_2,
                app.reason_choice_2.replace(/,/g, ';'),
                app.willing_to_be_placed_elsewhere ? 'Ya' : 'Tidak',
                formatDate(app.created_at)
            ])
        ];
        
        const csvContent = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `Data_Pendaftar_Internship_SEEO_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    } catch (error) {
        console.error('Error generating CSV:', error);
        alert('Terjadi kesalahan saat membuat CSV. Silakan coba lagi.');
    }
};
</script>

<style scoped>
/* Internship Index Specific Styles - Clean & Non-Conflicting */

.internship-index-container {
    max-width: 100% !important;
    padding: 0 1rem !important;
}

/* Main Card */
.main-card {
    background: white !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 12px !important;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1) !important;
    overflow: hidden !important;
}

/* Card Header */
.card-header-internship {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
    color: white !important;
    padding: 1.5rem 2rem !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    flex-wrap: wrap !important;
    gap: 1rem !important;
}

.header-left {
    display: flex !important;
    align-items: center !important;
    gap: 1rem !important;
}

.header-info {
    display: flex !important;
    flex-direction: column !important;
}

.header-title {
    margin: 0 !important;
    font-size: 1.25rem !important;
    font-weight: 700 !important;
    color: white !important;
}

.header-subtitle {
    color: rgba(255, 255, 255, 0.8) !important;
    font-size: 0.875rem !important;
}

.header-actions {
    display: flex !important;
    align-items: center !important;
    gap: 1.5rem !important;
    flex-wrap: wrap !important;
}

/* Export Buttons */
.export-group {
    display: flex !important;
    gap: 0.5rem !important;
}

.export-btn {
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    padding: 0.5rem 1rem !important;
    border: none !important;
    border-radius: 8px !important;
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    transition: all 0.2s ease !important;
    cursor: pointer !important;
}

.export-btn-pdf {
    background: #dc3545 !important;
    color: white !important;
}

.export-btn-pdf:hover:not(:disabled) {
    background: #c82333 !important;
    transform: translateY(-1px) !important;
}

.export-btn-excel {
    background: #198754 !important;
    color: white !important;
}

.export-btn-excel:hover:not(:disabled) {
    background: #157347 !important;
    transform: translateY(-1px) !important;
}

.export-btn:disabled {
    opacity: 0.6 !important;
    cursor: not-allowed !important;
    transform: none !important;
}

.btn-spinner {
    width: 1rem !important;
    height: 1rem !important;
    border: 2px solid rgba(255, 255, 255, 0.3) !important;
    border-top: 2px solid white !important;
    border-radius: 50% !important;
    animation: spin-internship 1s linear infinite !important;
}

.btn-text {
    white-space: nowrap !important;
}

@keyframes spin-internship {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Dropdown */
.dropdown-menu-internship {
    border: 1px solid #e5e7eb !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
    padding: 0.5rem 0 !important;
    min-width: 200px !important;
}

.dropdown-item-internship {
    display: flex !important;
    align-items: center !important;
    gap: 0.75rem !important;
    padding: 0.75rem 1rem !important;
    color: #374151 !important;
    text-decoration: none !important;
    transition: background-color 0.15s ease !important;
}

.dropdown-item-internship:hover {
    background-color: #f3f4f6 !important;
    color: #374151 !important;
}

.dropdown-icon {
    font-size: 1.25rem !important;
    width: 1.5rem !important;
    text-align: center !important;
}

.dropdown-content {
    display: flex !important;
    flex-direction: column !important;
}

.dropdown-title {
    font-weight: 600 !important;
    color: #111827 !important;
}

.dropdown-subtitle {
    color: #6b7280 !important;
    font-size: 0.75rem !important;
}

/* Data Counter */
.data-counter {
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    background: rgba(255, 255, 255, 0.2) !important;
    padding: 0.5rem 1rem !important;
    border-radius: 8px !important;
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    color: white !important;
}

/* Card Body */
.card-body-internship {
    padding: 2rem !important;
}

/* Filter Section */
.filter-section {
    display: grid !important;
    grid-template-columns: 2fr 1fr !important;
    gap: 1rem !important;
    margin-bottom: 2rem !important;
}

.search-box {
    width: 100% !important;
}

.search-input-group {
    position: relative !important;
    display: flex !important;
    align-items: center !important;
    background: white !important;
    border: 2px solid #e5e7eb !important;
    border-radius: 8px !important;
    transition: border-color 0.2s ease !important;
}

.search-input-group:focus-within {
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
}

.search-icon {
    padding: 0 0.75rem !important;
    color: #6b7280 !important;
}

.search-input {
    flex: 1 !important;
    border: none !important;
    outline: none !important;
    padding: 0.75rem 0.5rem !important;
    font-size: 0.875rem !important;
    background: transparent !important;
}

.search-clear {
    padding: 0.5rem !important;
    background: none !important;
    border: none !important;
    color: #ef4444 !important;
    cursor: pointer !important;
    border-radius: 4px !important;
    transition: background-color 0.15s ease !important;
}

.search-clear:hover {
    background: #fef2f2 !important;
}

.filter-box {
    width: 100% !important;
}

.filter-select {
    width: 100% !important;
    padding: 0.75rem !important;
    border: 2px solid #e5e7eb !important;
    border-radius: 8px !important;
    font-size: 0.875rem !important;
    background: white !important;
    transition: border-color 0.2s ease !important;
}

.filter-select:focus {
    outline: none !important;
    border-color: #3b82f6 !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
}

/* Statistics Cards */
.stats-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
    gap: 1rem !important;
    margin-bottom: 2rem !important;
}

.stat-card {
    padding: 1.5rem !important;
    border-radius: 12px !important;
    color: white !important;
    transition: transform 0.2s ease !important;
}

.stat-card:hover {
    transform: translateY(-2px) !important;
}

.stat-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
}

.stat-success {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
}

.stat-warning {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
}

.stat-info {
    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%) !important;
}

.stat-content {
    display: flex !important;
    align-items: center !important;
    gap: 1rem !important;
}

.stat-icon {
    font-size: 2rem !important;
    opacity: 0.9 !important;
}

.stat-details {
    display: flex !important;
    flex-direction: column !important;
}

.stat-number {
    font-size: 1.75rem !important;
    font-weight: 700 !important;
    margin: 0 !important;
    color: white !important;
}

.stat-label {
    font-size: 0.875rem !important;
    opacity: 0.9 !important;
    color: white !important;
}

/* Table */
.table-container {
    background: white !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 8px !important;
    overflow: hidden !important;
    overflow-x: auto !important;
}

.data-table {
    width: 100% !important;
    border-collapse: collapse !important;
    font-size: 0.875rem !important;
}

.table-header {
    background: #f8fafc !important;
    border-bottom: 2px solid #e5e7eb !important;
}

.table-header th {
    padding: 1rem 0.75rem !important;
    text-align: left !important;
    font-weight: 600 !important;
    color: #374151 !important;
    border-bottom: 1px solid #e5e7eb !important;
    white-space: nowrap !important;
}

.th-center {
    text-align: center !important;
}

.sortable-header-internship {
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    cursor: pointer !important;
    user-select: none !important;
    transition: color 0.2s ease !important;
}

.sortable-header-internship:hover {
    color: #3b82f6 !important;
}

.sort-icon-internship {
    font-size: 0.75rem !important;
    opacity: 0.5 !important;
    transition: all 0.2s ease !important;
}

.sort-icon-internship.active {
    opacity: 1 !important;
    color: #3b82f6 !important;
}

.table-body tr {
    border-bottom: 1px solid #f3f4f6 !important;
    transition: background-color 0.15s ease !important;
}

.table-row:hover {
    background-color: #f8fafc !important;
}

.table-body td {
    padding: 1rem 0.75rem !important;
    vertical-align: top !important;
    color: #374151 !important;
}

.td-center {
    text-align: center !important;
}

.row-number {
    font-weight: 600 !important;
    color: #6b7280 !important;
}

.name-cell {
    display: flex !important;
    flex-direction: column !important;
    gap: 0.25rem !important;
}

.name-primary {
    font-weight: 600 !important;
    color: #111827 !important;
}

.name-secondary {
    color: #6b7280 !important;
    font-size: 0.75rem !important;
}

.email-link,
.phone-link,
.info-link {
    color: #3b82f6 !important;
    text-decoration: none !important;
    transition: color 0.15s ease !important;
}

.email-link:hover,
.phone-link:hover,
.info-link:hover {
    color: #1d4ed8 !important;
    text-decoration: underline !important;
}

.phone-link {
    font-weight: 500 !important;
}

.division-text {
    font-weight: 500 !important;
    color: #111827 !important;
}

.reason-text {
    display: block !important;
    max-width: 150px !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    cursor: help !important;
}

.status-badge {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.25rem !important;
    padding: 0.25rem 0.75rem !important;
    border-radius: 6px !important;
    font-size: 0.75rem !important;
    font-weight: 500 !important;
    white-space: nowrap !important;
}

.status-success {
    background: #dcfce7 !important;
    color: #166534 !important;
}

.status-danger {
    background: #fee2e2 !important;
    color: #991b1b !important;
}

.action-btn {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    padding: 0.5rem 0.75rem !important;
    background: #3b82f6 !important;
    color: white !important;
    border: none !important;
    border-radius: 6px !important;
    font-size: 0.75rem !important;
    font-weight: 500 !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
}

.action-btn:hover {
    background: #1d4ed8 !important;
    transform: translateY(-1px) !important;
}

.action-group {
    display: flex !important;
    gap: 0.5rem !important;
    flex-wrap: wrap !important;
}

.action-btn-info {
    background: #6b7280 !important;
}

.action-btn-info:hover {
    background: #4b5563 !important;
}

.action-btn-primary {
    background: #059669 !important;
}

.action-btn-primary:hover {
    background: #047857 !important;
}

/* Empty State */
.empty-row {
    background: #f9fafb !important;
}

.empty-cell {
    text-align: center !important;
    padding: 3rem 2rem !important;
}

.empty-state-internship {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: 1rem !important;
}

.empty-icon {
    font-size: 3rem !important;
    color: #9ca3af !important;
}

.empty-title {
    margin: 0 !important;
    color: #6b7280 !important;
    font-size: 1.125rem !important;
}

.empty-description {
    margin: 0 !important;
    color: #9ca3af !important;
}

/* Pagination */
.pagination-section {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    margin-top: 2rem !important;
    flex-wrap: wrap !important;
    gap: 1rem !important;
}

.pagination-info {
    color: #6b7280 !important;
    font-size: 0.875rem !important;
}

.pagination-nav {
    display: flex !important;
}

.pagination-list {
    display: flex !important;
    list-style: none !important;
    margin: 0 !important;
    padding: 0 !important;
    gap: 0.25rem !important;
}

.page-item-internship {
    display: flex !important;
}

.page-item-internship.disabled .page-link-internship {
    opacity: 0.5 !important;
    cursor: not-allowed !important;
}

.page-item-internship.active .page-link-internship {
    background: #3b82f6 !important;
    color: white !important;
    border-color: #3b82f6 !important;
}

.page-link-internship {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-width: 2.25rem !important;
    height: 2.25rem !important;
    padding: 0.5rem !important;
    background: white !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 6px !important;
    color: #374151 !important;
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    text-decoration: none !important;
    cursor: pointer !important;
    transition: all 0.15s ease !important;
}

.page-link-internship:hover:not(:disabled) {
    background: #f3f4f6 !important;
    border-color: #d1d5db !important;
    color: #111827 !important;
}

.page-link-internship:disabled {
    cursor: not-allowed !important;
}

/* Modal */
.modal-content-internship {
    border: none !important;
    border-radius: 12px !important;
    overflow: hidden !important;
}

.modal-header-internship {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
    color: white !important;
    padding: 1.5rem 2rem !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    border-bottom: none !important;
}

.modal-header-content {
    display: flex !important;
    align-items: center !important;
    gap: 1rem !important;
}

.modal-icon {
    font-size: 2rem !important;
    opacity: 0.9 !important;
}

.modal-title-section {
    display: flex !important;
    flex-direction: column !important;
}

.modal-title-internship {
    margin: 0 !important;
    font-size: 1.25rem !important;
    font-weight: 700 !important;
    color: white !important;
}

.modal-subtitle {
    color: rgba(255, 255, 255, 0.8) !important;
    font-size: 0.875rem !important;
}

.modal-close {
    background: none !important;
    border: none !important;
    color: white !important;
    font-size: 1.5rem !important;
    cursor: pointer !important;
    padding: 0.5rem !important;
    border-radius: 6px !important;
    transition: background-color 0.15s ease !important;
}

.modal-close:hover {
    background: rgba(255, 255, 255, 0.1) !important;
}

.modal-body-internship {
    padding: 2rem !important;
}

.modal-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
    gap: 1.5rem !important;
    margin-bottom: 1.5rem !important;
}

.modal-grid:last-child {
    margin-bottom: 0 !important;
}

.modal-divider {
    height: 1px !important;
    background: #e5e7eb !important;
    margin: 2rem 0 !important;
}

/* Info Cards */
.info-section,
.division-section {
    width: 100% !important;
}

.info-card-internship {
    background: #f8fafc !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 8px !important;
    overflow: hidden !important;
    height: 100% !important;
}

.info-header {
    background: #e2e8f0 !important;
    padding: 1rem !important;
    border-bottom: 1px solid #e5e7eb !important;
}

.info-title {
    margin: 0 !important;
    font-size: 0.875rem !important;
    font-weight: 600 !important;
    color: #374151 !important;
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
}

.info-icon {
    color: #3b82f6 !important;
}

.info-body {
    padding: 1.5rem !important;
}

.info-table {
    display: flex !important;
    flex-direction: column !important;
    gap: 1rem !important;
}



.info-row {
    display: grid !important;
    grid-template-columns: 140px 1fr !important;
    gap: 1rem !important;
    align-items: start !important;
}

.info-label {
    font-weight: 600 !important;
    color: #6b7280 !important;
    font-size: 0.875rem !important;
}

.info-value {
    color: #111827 !important;
    font-size: 0.875rem !important;
}

.phone-group {
    display: flex !important;
    align-items: center !important;
    gap: 0.75rem !important;
    flex-wrap: wrap !important;
}

.whatsapp-btn {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.25rem !important;
    padding: 0.25rem 0.5rem !important;
    background: #25d366 !important;
    color: white !important;
    text-decoration: none !important;
    border-radius: 4px !important;
    font-size: 0.75rem !important;
    font-weight: 500 !important;
    transition: background-color 0.15s ease !important;
}

.whatsapp-btn:hover {
    background: #128c7e !important;
    color: white !important;
}

.program-badge {
    display: inline-block !important;
    padding: 0.25rem 0.75rem !important;
    background: #dbeafe !important;
    color: #1e40af !important;
    border-radius: 6px !important;
    font-size: 0.75rem !important;
    font-weight: 500 !important;
}

/* Division Cards */
.division-card {
    border: 2px solid !important;
    border-radius: 8px !important;
    overflow: hidden !important;
    height: 100% !important;
}

.division-primary {
    border-color: #3b82f6 !important;
}

.division-info {
    border-color: #06b6d4 !important;
}

.division-header {
    padding: 1rem !important;
    color: white !important;
}

.division-primary .division-header {
    background: #3b82f6 !important;
}

.division-info .division-header {
    background: #06b6d4 !important;
}

.division-title {
    margin: 0 !important;
    font-size: 0.875rem !important;
    font-weight: 600 !important;
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    color: white !important;
}

.division-body {
    padding: 1.5rem !important;
    background: white !important;
}

.division-name {
    margin: 0 0 1rem 0 !important;
    font-size: 1rem !important;
    font-weight: 600 !important;
}

.division-primary .division-name {
    color: #3b82f6 !important;
}

.division-info .division-name {
    color: #06b6d4 !important;
}

.division-reason {
    max-height: 150px !important;
    overflow-y: auto !important;
}

.division-reason p {
    margin: 0 !important;
    color: #6b7280 !important;
    font-size: 0.875rem !important;
    line-height: 1.5 !important;
}

/* Modal Footer */
.modal-footer-internship {
    padding: 1.5rem 2rem !important;
    background: #f8fafc !important;
    border-top: 1px solid #e5e7eb !important;
}

.modal-actions {
    display: flex !important;
    gap: 0.75rem !important;
    flex-wrap: wrap !important;
}

.modal-btn {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    padding: 0.75rem 1rem !important;
    border: none !important;
    border-radius: 6px !important;
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    text-decoration: none !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
}

.modal-btn-success {
    background: #25d366 !important;
    color: white !important;
}

.modal-btn-success:hover {
    background: #128c7e !important;
    color: white !important;
}

.modal-btn-info {
    background: #06b6d4 !important;
    color: white !important;
}

.modal-btn-info:hover {
    background: #0891b2 !important;
    color: white !important;
}

.modal-btn-secondary {
    background: #6b7280 !important;
    color: white !important;
    margin-left: auto !important;
}

.modal-btn-secondary:hover {
    background: #4b5563 !important;
    color: white !important;
}

/* Stat Card Gradient */
.stat-gradient {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%) !important;
    position: relative !important;
    overflow: hidden !important;
}

.stat-action {
    margin-top: 1rem !important;
    padding-top: 1rem !important;
    border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.stats-btn {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    padding: 0.5rem 1rem !important;
    background: rgba(255, 255, 255, 0.2) !important;
    color: white !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    border-radius: 6px !important;
    font-size: 0.75rem !important;
    font-weight: 500 !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    backdrop-filter: blur(10px) !important;
}

.stats-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.3) !important;
    border-color: rgba(255, 255, 255, 0.5) !important;
    transform: translateY(-1px) !important;
}

.stats-btn:disabled {
    opacity: 0.5 !important;
    cursor: not-allowed !important;
}

/* Division Stats Modal */
.modal-content-stats {
    border: none !important;
    border-radius: 12px !important;
    overflow: hidden !important;
}

.modal-header-stats {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%) !important;
    color: white !important;
    padding: 1.5rem 2rem !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    border-bottom: none !important;
}

.modal-header-content {
    display: flex !important;
    align-items: center !important;
    gap: 1rem !important;
}

.modal-icon-stats {
    font-size: 2rem !important;
    opacity: 0.9 !important;
}

.modal-title-section {
    display: flex !important;
    flex-direction: column !important;
}

.modal-title-stats {
    margin: 0 !important;
    font-size: 1.25rem !important;
    font-weight: 700 !important;
    color: white !important;
}

.modal-subtitle-stats {
    color: rgba(255, 255, 255, 0.8) !important;
    font-size: 0.875rem !important;
}

.modal-close-stats {
    background: none !important;
    border: none !important;
    color: white !important;
    font-size: 1.5rem !important;
    cursor: pointer !important;
    padding: 0.5rem !important;
    border-radius: 6px !important;
    transition: background-color 0.15s ease !important;
}

.modal-close-stats:hover {
    background: rgba(255, 255, 255, 0.1) !important;
}

.modal-body-stats {
    padding: 2rem !important;
    max-height: 70vh !important;
    overflow-y: auto !important;
}

/* Stats Summary */
.stats-summary {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
    gap: 1rem !important;
    margin-bottom: 2rem !important;
}

.summary-card {
    padding: 1rem !important;
    border-radius: 8px !important;
    color: white !important;
}

.summary-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
}

.summary-success {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
}

.summary-info {
    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%) !important;
}

.summary-content {
    display: flex !important;
    align-items: center !important;
    gap: 0.75rem !important;
}

.summary-content i {
    font-size: 1.5rem !important;
    opacity: 0.9 !important;
}

.summary-details h6 {
    margin: 0 !important;
    font-size: 1.25rem !important;
    font-weight: 700 !important;
    color: white !important;
}

.summary-details small {
    color: rgba(255, 255, 255, 0.8) !important;
    font-size: 0.75rem !important;
}

/* Division Stats List */
.division-stats-list {
    background: #f8fafc !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 8px !important;
    padding: 1.5rem !important;
}

.list-title {
    margin: 0 0 1.5rem 0 !important;
    font-size: 1rem !important;
    font-weight: 600 !important;
    color: #374151 !important;
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
}

.list-title i {
    color: #8b5cf6 !important;
}

.division-items {
    display: flex !important;
    flex-direction: column !important;
    gap: 1rem !important;
}

.division-item {
    background: white !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 8px !important;
    padding: 1.5rem !important;
    transition: all 0.2s ease !important;
}

.division-item:hover {
    border-color: #8b5cf6 !important;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.1) !important;
}

.division-item.most-popular {
    border-color: #f59e0b !important;
    background: linear-gradient(135deg, #fefbf0 0%, #fef3c7 100%) !important;
}

.division-header-item {
    margin-bottom: 1rem !important;
}

.division-name-item {
    margin: 0 !important;
    font-size: 1.125rem !important;
    font-weight: 600 !important;
    color: #111827 !important;
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    flex-wrap: wrap !important;
}

.division-icon {
    color: #8b5cf6 !important;
    font-size: 1.25rem !important;
}

.popular-badge {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.25rem !important;
    padding: 0.25rem 0.5rem !important;
    background: #f59e0b !important;
    color: white !important;
    border-radius: 4px !important;
    font-size: 0.6rem !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
}

.division-stats-row {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) !important;
    gap: 1rem !important;
    margin-bottom: 1rem !important;
}

.stat-item {
    display: flex !important;
    align-items: center !important;
    gap: 0.75rem !important;
    padding: 0.75rem !important;
    background: #f8fafc !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 6px !important;
}

.stat-item.total-item {
    background: #ede9fe !important;
    border-color: #8b5cf6 !important;
}

.stat-icon {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 2rem !important;
    height: 2rem !important;
    background: white !important;
    border-radius: 50% !important;
    color: #6b7280 !important;
    font-size: 1rem !important;
}

.total-item .stat-icon {
    background: #8b5cf6 !important;
    color: white !important;
}

.stat-content-item {
    display: flex !important;
    flex-direction: column !important;
}

.stat-value {
    font-size: 1.25rem !important;
    font-weight: 700 !important;
    color: #111827 !important;
    line-height: 1 !important;
}

.total-value {
    color: #8b5cf6 !important;
}

.stat-text {
    font-size: 0.75rem !important;
    color: #6b7280 !important;
    font-weight: 500 !important;
}

/* Progress Container */
.progress-container {
    display: flex !important;
    align-items: center !important;
    gap: 1rem !important;
}

.progress-bar-stats {
    flex: 1 !important;
    height: 6px !important;
    background: #e5e7eb !important;
    border-radius: 3px !important;
    overflow: hidden !important;
}

.progress-fill-stats {
    height: 100% !important;
    background: linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%) !important;
    border-radius: 3px !important;
    transition: width 0.5s ease !important;
}

.progress-percentage {
    font-size: 0.875rem !important;
    font-weight: 600 !important;
    color: #8b5cf6 !important;
    min-width: 50px !important;
    text-align: right !important;
}

/* Modal Footer */
.modal-footer-stats {
    padding: 1.5rem 2rem !important;
    background: #f8fafc !important;
    border-top: 1px solid #e5e7eb !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    flex-wrap: wrap !important;
    gap: 1rem !important;
}

.footer-info {
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    color: #6b7280 !important;
    font-size: 0.875rem !important;
}

.footer-info i {
    color: #8b5cf6 !important;
}

.modal-actions-stats {
    display: flex !important;
    gap: 0.75rem !important;
}

.btn-close-stats {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    padding: 0.75rem 1rem !important;
    background: #6b7280 !important;
    color: white !important;
    border: none !important;
    border-radius: 6px !important;
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
}

.btn-close-stats:hover {
    background: #4b5563 !important;
}

/* Responsive Design */
@media (max-width: 768px) {
    .stats-summary {
        grid-template-columns: 1fr !important;
    }
    
    .division-stats-row {
        grid-template-columns: 1fr !important;
        gap: 0.75rem !important;
    }
    
    .division-name-item {
        font-size: 1rem !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        gap: 0.5rem !important;
    }
    
    .progress-container {
        flex-direction: column !important;
        align-items: stretch !important;
    }
    
    .progress-percentage {
        text-align: center !important;
        margin-top: 0.5rem !important;
    }
    
    .modal-footer-stats {
        flex-direction: column !important;
        text-align: center !important;
    }
}

@media (max-width: 640px) {
    .modal-body-stats {
        padding: 1rem !important;
    }
    
    .division-stats-list {
        padding: 1rem !important;
    }
    
    .division-item {
        padding: 1rem !important;
    }
    
    .stat-item {
        padding: 0.5rem !important;
    }
    
    .stat-value {
        font-size: 1rem !important;
    }
}

/* KRS Modal Styles */
.krs-modal-content {
    border-radius: 12px !important;
    border: none !important;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) !important;
}

.krs-modal-header {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
    color: white !important;
    border-bottom: none !important;
    border-radius: 12px 12px 0 0 !important;
    padding: 1.5rem !important;
}

.krs-modal-header .modal-title {
    font-size: 1.25rem !important;
    font-weight: 600 !important;
    display: flex !important;
    align-items: center !important;
}

.krs-modal-header .btn-close {
    filter: brightness(0) invert(1) !important;
    opacity: 0.8 !important;
}

.krs-modal-header .btn-close:hover {
    opacity: 1 !important;
}

.krs-modal-body {
    padding: 0 !important;
    max-height: 80vh !important;
    overflow: hidden !important;
}

.krs-container {
    display: flex !important;
    flex-direction: column !important;
    height: 100% !important;
}

.krs-info {
    display: flex !important;
    gap: 2rem !important;
    padding: 1.5rem !important;
    background: #f8fafc !important;
    border-bottom: 1px solid #e2e8f0 !important;
}

.info-item {
    display: flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    font-size: 0.875rem !important;
}

.info-item strong {
    color: #374151 !important;
    min-width: fit-content !important;
}

.krs-viewer {
    flex: 1 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    min-height: 500px !important;
    padding: 1rem !important;
    background: #f9fafb !important;
}

.krs-pdf-viewer {
    width: 100% !important;
    height: 600px !important;
    border: none !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
}

.krs-image-viewer {
    max-width: 100% !important;
    max-height: 600px !important;
    object-fit: contain !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
    background: white !important;
}

.krs-modal-footer {
    padding: 1.5rem !important;
    border-top: 1px solid #e2e8f0 !important;
    background: #f8fafc !important;
    border-radius: 0 0 12px 12px !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
}

.btn-download-krs {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    padding: 0.75rem 1.5rem !important;
    background: #059669 !important;
    color: white !important;
    text-decoration: none !important;
    border-radius: 8px !important;
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    transition: all 0.2s ease !important;
}

.btn-download-krs:hover {
    background: #047857 !important;
    color: white !important;
    transform: translateY(-1px) !important;
}

.btn-close-krs {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    padding: 0.75rem 1.5rem !important;
    background: #6b7280 !important;
    color: white !important;
    border: none !important;
    border-radius: 8px !important;
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
}

.btn-close-krs:hover {
    background: #4b5563 !important;
}

/* Responsive KRS Modal */
@media (max-width: 768px) {
    .modal-xl {
        max-width: 95% !important;
    }
    
    .krs-info {
        flex-direction: column !important;
        gap: 1rem !important;
        padding: 1rem !important;
    }
    
    .krs-viewer {
        min-height: 400px !important;
        padding: 0.5rem !important;
    }
    
    .krs-pdf-viewer {
        height: 400px !important;
    }
    
    .krs-image-viewer {
        max-height: 400px !important;
    }
    
    .krs-modal-footer {
        flex-direction: column !important;
        gap: 1rem !important;
        padding: 1rem !important;
    }
}
</style>