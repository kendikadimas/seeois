import { ref, computed, watch, withCtx, unref, createVNode, createBlock, openBlock, toDisplayString, withModifiers, createCommentVNode, withDirectives, vModelText, Fragment, renderList, vModelSelect, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./StaffLayout-Dx7OTDGc.js";
import { Head } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./ModalConfirmation-CQDhtLdH.js";
/* empty css             */
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    applications: {
      type: Array,
      default: () => []
    },
    user: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    console.log("User data:", props.user);
    console.log("Applications:", props.applications);
    const searchQuery = ref("");
    const filterStudyProgram = ref("");
    const isExporting = ref(false);
    const tableContainer = ref(null);
    const sortField = ref("created_at");
    const sortOrder = ref("desc");
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const selectedApp = ref(null);
    const selectedKRSApp = ref(null);
    const krsModal = ref(null);
    const detailModal = ref(null);
    const divisionStatsModal = ref(null);
    const uniqueStudyPrograms = computed(() => {
      if (!props.applications || props.applications.length === 0) return [];
      const programs = [...new Set(props.applications.map((app) => app.study_program))];
      return programs.sort();
    });
    const filteredApplications = computed(() => {
      if (!props.applications || props.applications.length === 0) return [];
      let filtered = [...props.applications];
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (app) => app.name && app.name.toLowerCase().includes(query)
        );
      }
      if (filterStudyProgram.value) {
        filtered = filtered.filter(
          (app) => app.study_program === filterStudyProgram.value
        );
      }
      return filtered;
    });
    const allDivisionStats = computed(() => {
      if (!filteredApplications.value.length) return [];
      const divisionCounts = {};
      filteredApplications.value.forEach((app) => {
        if (app.division_choice_1) {
          if (!divisionCounts[app.division_choice_1]) {
            divisionCounts[app.division_choice_1] = { choice1: 0, choice2: 0 };
          }
          divisionCounts[app.division_choice_1].choice1++;
        }
        if (app.division_choice_2) {
          if (!divisionCounts[app.division_choice_2]) {
            divisionCounts[app.division_choice_2] = { choice1: 0, choice2: 0 };
          }
          divisionCounts[app.division_choice_2].choice2++;
        }
      });
      const stats = Object.entries(divisionCounts).map(([name, counts]) => ({
        name,
        choice1: counts.choice1,
        choice2: counts.choice2,
        total: counts.choice1 + counts.choice2
      }));
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
          if (sortField.value === "created_at") {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
          }
          if (typeof aValue === "string") {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }
          if (sortOrder.value === "asc") {
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
      return filteredApplications.value.filter((app) => app.willing_to_be_placed_elsewhere).length;
    });
    const notWillingCount = computed(() => {
      return filteredApplications.value.filter((app) => !app.willing_to_be_placed_elsewhere).length;
    });
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
    const showDivisionStatsModal = () => {
      const modal = new bootstrap.Modal(divisionStatsModal.value);
      modal.show();
    };
    const clearSearch = () => {
      searchQuery.value = "";
    };
    const toggleSort = (field) => {
      if (sortField.value === field) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
      } else {
        sortField.value = field;
        sortOrder.value = "asc";
      }
    };
    const getWhatsAppLink = (phoneNumber) => {
      let formattedNumber = phoneNumber.replace(/\D/g, "");
      if (!formattedNumber.startsWith("62")) {
        if (formattedNumber.startsWith("0")) {
          formattedNumber = "62" + formattedNumber.slice(1);
        } else {
          formattedNumber = "62" + formattedNumber;
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
      console.log(`KRS viewed for: ${app.name} - ${app.nim}`);
    };
    const getFileType = (krsPath) => {
      if (!krsPath) return "image";
      const extension = krsPath.split(".").pop().toLowerCase();
      return extension === "pdf" ? "pdf" : "image";
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const exportToPDF = async () => {
      try {
        isExporting.value = "pdf";
        const html2canvas = (await import("html2canvas")).default;
        const { jsPDF } = await import("jspdf");
        const mainContainer = document.createElement("div");
        mainContainer.style.padding = "20px";
        mainContainer.style.backgroundColor = "white";
        mainContainer.style.width = "1400px";
        mainContainer.style.fontFamily = "Arial, sans-serif";
        const header = document.createElement("div");
        header.innerHTML = `
            <h2 style="text-align: center; margin-bottom: 10px; color: #3f51b5;">DATA PENDAFTAR INTERNSHIP SEEO 2025</h2>
            <p style="text-align: center; margin-bottom: 5px; font-size: 14px;">Tanggal Export: ${(/* @__PURE__ */ new Date()).toLocaleDateString("id-ID")}</p>
            <p style="text-align: center; margin-bottom: 20px; font-size: 14px;">Total Pendaftar: ${sortedApplications.value.length} orang</p>
            ${filterStudyProgram.value ? `<p style="text-align: center; margin-bottom: 20px; font-size: 12px; color: #666;">Filter: ${filterStudyProgram.value}</p>` : ""}
        `;
        mainContainer.appendChild(header);
        const basicTable = document.createElement("table");
        basicTable.className = "table table-bordered";
        basicTable.style.fontSize = "11px";
        basicTable.style.width = "100%";
        basicTable.style.marginBottom = "30px";
        basicTable.style.borderCollapse = "collapse";
        const basicThead = document.createElement("thead");
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
        const basicTbody = document.createElement("tbody");
        sortedApplications.value.forEach((app, index) => {
          const row = document.createElement("tr");
          row.style.borderBottom = "1px solid #ddd";
          if (index % 2 === 1) row.style.backgroundColor = "#f8f9fa";
          row.innerHTML = `
                <td style="padding: 6px; text-align: center; border: 1px solid #ddd;">${index + 1}</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${app.name}</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${app.nim}</td>
                <td style="padding: 6px; font-size: 9px; border: 1px solid #ddd;">${app.email}</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${app.phone_number}</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${app.study_program}</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${app.division_choice_1}</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${app.division_choice_2}</td>
                <td style="padding: 6px; text-align: center; border: 1px solid #ddd;">${app.willing_to_be_placed_elsewhere ? "Ya" : "Tidak"}</td>
                <td style="padding: 6px; font-size: 9px; border: 1px solid #ddd;">${formatDate(app.created_at)}</td>
            `;
          basicTbody.appendChild(row);
        });
        basicTable.appendChild(basicTbody);
        mainContainer.appendChild(basicTable);
        const reasonSection = document.createElement("div");
        reasonSection.innerHTML = `
            <h3 style="color: #3f51b5; margin-bottom: 15px; border-bottom: 2px solid #3f51b5; padding-bottom: 5px;">ALASAN PEMILIHAN DIVISI</h3>
        `;
        mainContainer.appendChild(reasonSection);
        sortedApplications.value.forEach((app, index) => {
          const reasonCard = document.createElement("div");
          reasonCard.style.border = "1px solid #ddd";
          reasonCard.style.borderRadius = "8px";
          reasonCard.style.marginBottom = "15px";
          reasonCard.style.padding = "15px";
          reasonCard.style.backgroundColor = index % 2 === 0 ? "#ffffff" : "#f8f9fa";
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
        const footer = document.createElement("div");
        footer.style.marginTop = "20px";
        footer.style.textAlign = "center";
        footer.style.fontSize = "10px";
        footer.style.color = "#666";
        footer.innerHTML = `
            <p>Dokumen ini digenerate secara otomatis pada ${(/* @__PURE__ */ new Date()).toLocaleString("id-ID")}</p>
            <p>© ${(/* @__PURE__ */ new Date()).getFullYear()} SEEO Information System</p>
        `;
        mainContainer.appendChild(footer);
        document.body.appendChild(mainContainer);
        const canvas = await html2canvas(mainContainer, {
          scale: 1.5,
          // Kurangi scale untuk performa lebih baik
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          height: mainContainer.scrollHeight,
          width: mainContainer.scrollWidth
        });
        document.body.removeChild(mainContainer);
        const pdf = new jsPDF("portrait", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        const fileName = `Data_Pendaftar_Internship_SEEO_Lengkap_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`;
        pdf.save(fileName);
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Terjadi kesalahan saat membuat PDF. Silakan coba lagi.");
      } finally {
        isExporting.value = false;
      }
    };
    const exportToPDFSimple = async () => {
      try {
        isExporting.value = "pdf";
        const html2canvas = (await import("html2canvas")).default;
        const { jsPDF } = await import("jspdf");
        const exportTable = document.createElement("table");
        exportTable.className = "table table-bordered";
        exportTable.style.fontSize = "12px";
        exportTable.style.width = "100%";
        const thead = document.createElement("thead");
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
        const tbody = document.createElement("tbody");
        sortedApplications.value.forEach((app, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                <td style="padding: 6px; text-align: center;">${index + 1}</td>
                <td style="padding: 6px;">${app.name}</td>
                <td style="padding: 6px;">${app.nim}</td>
                <td style="padding: 6px; font-size: 10px;">${app.email}</td>
                <td style="padding: 6px;">${app.phone_number}</td>
                <td style="padding: 6px;">${app.study_program}</td>
                <td style="padding: 6px;">${app.division_choice_1}</td>
                <td style="padding: 6px;">${app.division_choice_2}</td>
                <td style="padding: 6px; text-align: center;">${app.willing_to_be_placed_elsewhere ? "Ya" : "Tidak"}</td>
                <td style="padding: 6px; font-size: 10px;">${formatDate(app.created_at)}</td>
            `;
          tbody.appendChild(row);
        });
        exportTable.appendChild(tbody);
        const container = document.createElement("div");
        container.style.padding = "20px";
        container.style.backgroundColor = "white";
        container.style.width = "1200px";
        const header = document.createElement("div");
        header.innerHTML = `
            <h2 style="text-align: center; margin-bottom: 10px;">DATA PENDAFTAR INTERNSHIP SEEO 2025</h2>
            <p style="text-align: center; margin-bottom: 5px;">Tanggal Export: ${(/* @__PURE__ */ new Date()).toLocaleDateString("id-ID")}</p>
            <p style="text-align: center; margin-bottom: 20px;">Total Pendaftar: ${sortedApplications.value.length} orang</p>
        `;
        container.appendChild(header);
        container.appendChild(exportTable);
        document.body.appendChild(container);
        const canvas = await html2canvas(container, {
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        document.body.removeChild(container);
        const pdf = new jsPDF("landscape", "mm", "a4");
        const imgWidth = 297;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, imgHeight);
        const fileName = `Data_Pendaftar_Internship_SEEO_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`;
        pdf.save(fileName);
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Terjadi kesalahan saat membuat PDF. Silakan coba lagi.");
      } finally {
        isExporting.value = false;
      }
    };
    const exportToExcel = async () => {
      try {
        isExporting.value = "excel";
        const XLSX = await import("xlsx");
        const excelData = sortedApplications.value.map((app, index) => ({
          "No": index + 1,
          "Nama Lengkap": app.name,
          "NIM": app.nim,
          "Email": app.email,
          "No. HP": app.phone_number,
          "Program Studi": app.study_program,
          "Pilihan Divisi 1": app.division_choice_1,
          "Alasan Pilihan Divisi 1": app.reason_choice_1,
          "Pilihan Divisi 2": app.division_choice_2,
          "Alasan Pilihan Divisi 2": app.reason_choice_2,
          "Bersedia Ditempatkan di Divisi Lain": app.willing_to_be_placed_elsewhere ? "Ya" : "Tidak",
          "Tanggal Pendaftaran": formatDate(app.created_at)
        }));
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(excelData);
        const colWidths = [
          { wch: 5 },
          // No
          { wch: 25 },
          // Nama Lengkap
          { wch: 15 },
          // NIM
          { wch: 30 },
          // Email
          { wch: 15 },
          // No HP
          { wch: 20 },
          // Program Studi
          { wch: 20 },
          // Pilihan Divisi 1
          { wch: 40 },
          // Alasan Pilihan Divisi 1
          { wch: 20 },
          // Pilihan Divisi 2
          { wch: 40 },
          // Alasan Pilihan Divisi 2
          { wch: 25 },
          // Bersedia Ditempatkan
          { wch: 20 }
          // Tanggal Pendaftaran
        ];
        ws["!cols"] = colWidths;
        sortedApplications.value.forEach((app, index) => {
          const rowIndex = index + 2;
          const cellRef = `E${rowIndex}`;
          if (ws[cellRef]) {
            let phoneNumber = app.phone_number.replace(/\D/g, "");
            if (!phoneNumber.startsWith("62")) {
              if (phoneNumber.startsWith("0")) {
                phoneNumber = "62" + phoneNumber.slice(1);
              } else {
                phoneNumber = "62" + phoneNumber;
              }
            }
            const whatsappLink = `https://wa.me/${phoneNumber}`;
            ws[cellRef].l = { Target: whatsappLink, Tooltip: `Chat WhatsApp ${app.name}` };
            ws[cellRef].s = {
              font: {
                color: { rgb: "0000FF" },
                underline: true
              }
            };
          }
        });
        const range = XLSX.utils.decode_range(ws["!ref"]);
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
        for (let R = range.s.r + 1; R <= range.e.r; ++R) {
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell_address = XLSX.utils.encode_cell({ c: C, r: R });
            if (!ws[cell_address]) continue;
            if (R % 2 === 0) {
              ws[cell_address].s = {
                ...ws[cell_address].s,
                fill: { fgColor: { rgb: "F8F9FA" } }
              };
            }
            if (C === 0 || C === 10) {
              ws[cell_address].s = {
                ...ws[cell_address].s,
                alignment: { horizontal: "center", vertical: "center" }
              };
            }
          }
        }
        XLSX.utils.book_append_sheet(wb, ws, "Data Pendaftar Internship");
        const summaryData = [
          ["RINGKASAN DATA PENDAFTAR INTERNSHIP SEEO 2025"],
          [""],
          ["Total Pendaftar", sortedApplications.value.length],
          ["Tanggal Export", (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID")],
          ["Waktu Export", (/* @__PURE__ */ new Date()).toLocaleTimeString("id-ID")],
          [""],
          ["STATISTIK BERDASARKAN PROGRAM STUDI"],
          ["Program Studi", "Jumlah Pendaftar"]
        ];
        const studyProgramStats = {};
        sortedApplications.value.forEach((app) => {
          studyProgramStats[app.study_program] = (studyProgramStats[app.study_program] || 0) + 1;
        });
        Object.entries(studyProgramStats).forEach(([program, count]) => {
          summaryData.push([program, count]);
        });
        summaryData.push([]);
        summaryData.push(["STATISTIK BERDASARKAN PILIHAN DIVISI"]);
        summaryData.push(["Divisi", "Pilihan 1", "Pilihan 2", "Total"]);
        const divisionStats = {};
        sortedApplications.value.forEach((app) => {
          divisionStats[app.division_choice_1] = divisionStats[app.division_choice_1] || { choice1: 0, choice2: 0 };
          divisionStats[app.division_choice_1].choice1++;
          divisionStats[app.division_choice_2] = divisionStats[app.division_choice_2] || { choice1: 0, choice2: 0 };
          divisionStats[app.division_choice_2].choice2++;
        });
        Object.entries(divisionStats).forEach(([division, stats]) => {
          summaryData.push([division, stats.choice1, stats.choice2, stats.choice1 + stats.choice2]);
        });
        summaryData.push([]);
        summaryData.push(["STATISTIK KESEDIAAN DITEMPATKAN"]);
        summaryData.push(["Kategori", "Jumlah", "Persentase"]);
        summaryData.push([
          "Bersedia Ditempatkan",
          willingCount.value,
          `${(willingCount.value / sortedApplications.value.length * 100).toFixed(1)}%`
        ]);
        summaryData.push([
          "Tidak Bersedia",
          notWillingCount.value,
          `${(notWillingCount.value / sortedApplications.value.length * 100).toFixed(1)}%`
        ]);
        const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
        summaryWs["!cols"] = [{ wch: 35 }, { wch: 20 }, { wch: 15 }, { wch: 15 }];
        if (summaryWs["A1"]) {
          summaryWs["A1"].s = {
            font: { bold: true, size: 16, color: { rgb: "3F51B5" } },
            alignment: { horizontal: "center" }
          };
        }
        summaryWs["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }];
        XLSX.utils.book_append_sheet(wb, summaryWs, "Ringkasan");
        const contactData = [
          ["DAFTAR KONTAK WHATSAPP PENDAFTAR"],
          [""],
          ["No", "Nama", "Program Studi", "No. HP", "Link WhatsApp"]
        ];
        sortedApplications.value.forEach((app, index) => {
          let phoneNumber = app.phone_number.replace(/\D/g, "");
          if (!phoneNumber.startsWith("62")) {
            if (phoneNumber.startsWith("0")) {
              phoneNumber = "62" + phoneNumber.slice(1);
            } else {
              phoneNumber = "62" + phoneNumber;
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
        contactWs["!cols"] = [{ wch: 5 }, { wch: 25 }, { wch: 20 }, { wch: 15 }, { wch: 40 }];
        sortedApplications.value.forEach((app, index) => {
          const rowIndex = index + 4;
          const cellRef = `E${rowIndex}`;
          if (contactWs[cellRef]) {
            let phoneNumber = app.phone_number.replace(/\D/g, "");
            if (!phoneNumber.startsWith("62")) {
              if (phoneNumber.startsWith("0")) {
                phoneNumber = "62" + phoneNumber.slice(1);
              } else {
                phoneNumber = "62" + phoneNumber;
              }
            }
            const whatsappLink = `https://wa.me/${phoneNumber}`;
            contactWs[cellRef].l = { Target: whatsappLink, Tooltip: `Chat ${app.name}` };
            contactWs[cellRef].s = {
              font: { color: { rgb: "0000FF" }, underline: true }
            };
          }
        });
        XLSX.utils.book_append_sheet(wb, contactWs, "Kontak WhatsApp");
        const fileName = `Data_Pendaftar_Internship_SEEO_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
      } catch (error) {
        console.error("Error generating Excel:", error);
        alert("Terjadi kesalahan saat membuat Excel. Silakan coba lagi.");
      } finally {
        isExporting.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Data Pendaftar Internship `);
          } else {
            return [
              createTextVNode(" Data Pendaftar Internship ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Data Pendaftar Internship" }, null, _parent2, _scopeId));
            _push2(`<div class="container-fluid internship-index-container" data-v-2be29492${_scopeId}><div class="main-card shadow-sm mt-4" data-v-2be29492${_scopeId}><div class="card-header-internship" data-v-2be29492${_scopeId}><div class="header-left" data-v-2be29492${_scopeId}><div class="header-info" data-v-2be29492${_scopeId}><h5 class="header-title" data-v-2be29492${_scopeId}>Internship SEEO 2025</h5><small class="header-subtitle" data-v-2be29492${_scopeId}>Sistem Manajemen Data Pendaftar</small></div></div><div class="header-actions" data-v-2be29492${_scopeId}><div class="export-group" data-v-2be29492${_scopeId}><div class="btn-group shadow-sm" role="group" data-v-2be29492${_scopeId}><div class="btn-group" role="group" data-v-2be29492${_scopeId}><button type="button" class="export-btn export-btn-pdf" data-bs-toggle="dropdown" aria-expanded="false"${ssrIncludeBooleanAttr(__props.applications.length === 0 || isExporting.value) ? " disabled" : ""} data-v-2be29492${_scopeId}>`);
            if (isExporting.value === "pdf") {
              _push2(`<span class="btn-spinner" role="status" data-v-2be29492${_scopeId}></span>`);
            } else {
              _push2(`<i class="bi bi-file-earmark-pdf" data-v-2be29492${_scopeId}></i>`);
            }
            _push2(`<span class="btn-text" data-v-2be29492${_scopeId}>${ssrInterpolate(isExporting.value === "pdf" ? "Generating..." : "Export PDF")}</span><i class="bi bi-chevron-down" data-v-2be29492${_scopeId}></i></button><ul class="dropdown-menu dropdown-menu-internship" data-v-2be29492${_scopeId}><li data-v-2be29492${_scopeId}><a class="dropdown-item-internship" href="#" data-v-2be29492${_scopeId}><i class="bi bi-table dropdown-icon text-primary" data-v-2be29492${_scopeId}></i><div class="dropdown-content" data-v-2be29492${_scopeId}><div class="dropdown-title" data-v-2be29492${_scopeId}>PDF Ringkas</div><small class="dropdown-subtitle" data-v-2be29492${_scopeId}>Tanpa alasan divisi</small></div></a></li><li data-v-2be29492${_scopeId}><hr class="dropdown-divider" data-v-2be29492${_scopeId}></li><li data-v-2be29492${_scopeId}><a class="dropdown-item-internship" href="#" data-v-2be29492${_scopeId}><i class="bi bi-file-text dropdown-icon text-success" data-v-2be29492${_scopeId}></i><div class="dropdown-content" data-v-2be29492${_scopeId}><div class="dropdown-title" data-v-2be29492${_scopeId}>PDF Lengkap</div><small class="dropdown-subtitle" data-v-2be29492${_scopeId}>Dengan alasan divisi</small></div></a></li></ul></div><button type="button" class="export-btn export-btn-excel"${ssrIncludeBooleanAttr(__props.applications.length === 0 || isExporting.value) ? " disabled" : ""} data-v-2be29492${_scopeId}>`);
            if (isExporting.value === "excel") {
              _push2(`<span class="btn-spinner" role="status" data-v-2be29492${_scopeId}></span>`);
            } else {
              _push2(`<i class="bi bi-file-earmark-excel" data-v-2be29492${_scopeId}></i>`);
            }
            _push2(`<span class="btn-text" data-v-2be29492${_scopeId}>${ssrInterpolate(isExporting.value === "excel" ? "Generating..." : "Export Excel")}</span></button></div></div><div class="data-counter" data-v-2be29492${_scopeId}><i class="bi bi-people" data-v-2be29492${_scopeId}></i><span data-v-2be29492${_scopeId}>${ssrInterpolate(filteredApplications.value.length)} / ${ssrInterpolate(__props.applications.length)}</span></div></div></div><div class="card-body-internship" data-v-2be29492${_scopeId}><div class="filter-section" data-v-2be29492${_scopeId}><div class="search-box" data-v-2be29492${_scopeId}><div class="search-input-group" data-v-2be29492${_scopeId}><span class="search-icon" data-v-2be29492${_scopeId}><i class="bi bi-search" data-v-2be29492${_scopeId}></i></span><input${ssrRenderAttr("value", searchQuery.value)} type="text" class="search-input" placeholder="Cari berdasarkan nama pendaftar..." data-v-2be29492${_scopeId}>`);
            if (searchQuery.value) {
              _push2(`<button class="search-clear" type="button" data-v-2be29492${_scopeId}><i class="bi bi-x" data-v-2be29492${_scopeId}></i></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="filter-box" data-v-2be29492${_scopeId}><select class="filter-select" data-v-2be29492${_scopeId}><option value="" data-v-2be29492${ssrIncludeBooleanAttr(Array.isArray(filterStudyProgram.value) ? ssrLooseContain(filterStudyProgram.value, "") : ssrLooseEqual(filterStudyProgram.value, "")) ? " selected" : ""}${_scopeId}>Semua Program Studi</option><!--[-->`);
            ssrRenderList(uniqueStudyPrograms.value, (program) => {
              _push2(`<option${ssrRenderAttr("value", program)} data-v-2be29492${ssrIncludeBooleanAttr(Array.isArray(filterStudyProgram.value) ? ssrLooseContain(filterStudyProgram.value, program) : ssrLooseEqual(filterStudyProgram.value, program)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(program)}</option>`);
            });
            _push2(`<!--]--></select></div></div><div class="stats-grid" data-v-2be29492${_scopeId}><div class="stat-card stat-primary" data-v-2be29492${_scopeId}><div class="stat-content" data-v-2be29492${_scopeId}><i class="bi bi-people stat-icon" data-v-2be29492${_scopeId}></i><div class="stat-details" data-v-2be29492${_scopeId}><h4 class="stat-number" data-v-2be29492${_scopeId}>${ssrInterpolate(filteredApplications.value.length)}</h4><small class="stat-label" data-v-2be29492${_scopeId}>Total Pendaftar</small></div></div></div><div class="stat-card stat-success" data-v-2be29492${_scopeId}><div class="stat-content" data-v-2be29492${_scopeId}><i class="bi bi-check-circle stat-icon" data-v-2be29492${_scopeId}></i><div class="stat-details" data-v-2be29492${_scopeId}><h4 class="stat-number" data-v-2be29492${_scopeId}>${ssrInterpolate(willingCount.value)}</h4><small class="stat-label" data-v-2be29492${_scopeId}>Bersedia Ditempatkan</small></div></div></div><div class="stat-card stat-warning" data-v-2be29492${_scopeId}><div class="stat-content" data-v-2be29492${_scopeId}><i class="bi bi-x-circle stat-icon" data-v-2be29492${_scopeId}></i><div class="stat-details" data-v-2be29492${_scopeId}><h4 class="stat-number" data-v-2be29492${_scopeId}>${ssrInterpolate(notWillingCount.value)}</h4><small class="stat-label" data-v-2be29492${_scopeId}>Tidak Bersedia</small></div></div></div><div class="stat-card stat-info" data-v-2be29492${_scopeId}><div class="stat-content" data-v-2be29492${_scopeId}><i class="bi bi-mortarboard stat-icon" data-v-2be29492${_scopeId}></i><div class="stat-details" data-v-2be29492${_scopeId}><h4 class="stat-number" data-v-2be29492${_scopeId}>${ssrInterpolate(uniqueStudyPrograms.value.length)}</h4><small class="stat-label" data-v-2be29492${_scopeId}>Program Studi</small></div></div></div><div class="stat-card stat-gradient" data-v-2be29492${_scopeId}><div class="stat-content" data-v-2be29492${_scopeId}><i class="bi bi-diagram-3 stat-icon" data-v-2be29492${_scopeId}></i><div class="stat-details" data-v-2be29492${_scopeId}><h4 class="stat-number" data-v-2be29492${_scopeId}>${ssrInterpolate(allDivisionStats.value.length)}</h4><small class="stat-label" data-v-2be29492${_scopeId}>Divisi Tersedia</small></div></div><div class="stat-action" data-v-2be29492${_scopeId}><button class="stats-btn"${ssrIncludeBooleanAttr(allDivisionStats.value.length === 0) ? " disabled" : ""} data-v-2be29492${_scopeId}><i class="bi bi-bar-chart" data-v-2be29492${_scopeId}></i><span data-v-2be29492${_scopeId}>Lihat Statistik</span></button></div></div></div><div class="table-container" data-v-2be29492${_scopeId}><table class="data-table" data-v-2be29492${_scopeId}><thead class="table-header" data-v-2be29492${_scopeId}><tr data-v-2be29492${_scopeId}><th scope="col" class="th-center" data-v-2be29492${_scopeId}>#</th><th scope="col" data-v-2be29492${_scopeId}><div class="sortable-header-internship" data-v-2be29492${_scopeId}><span data-v-2be29492${_scopeId}>Nama</span><i class="${ssrRenderClass([{ "active": sortField.value === "name" }, "bi bi-arrow-down-up sort-icon-internship"])}" data-v-2be29492${_scopeId}></i></div></th><th scope="col" data-v-2be29492${_scopeId}>NIM</th><th scope="col" data-v-2be29492${_scopeId}>Email</th><th scope="col" data-v-2be29492${_scopeId}>No. HP</th><th scope="col" data-v-2be29492${_scopeId}><div class="sortable-header-internship" data-v-2be29492${_scopeId}><span data-v-2be29492${_scopeId}>Program Studi</span><i class="${ssrRenderClass([{ "active": sortField.value === "study_program" }, "bi bi-arrow-down-up sort-icon-internship"])}" data-v-2be29492${_scopeId}></i></div></th><th scope="col" data-v-2be29492${_scopeId}>Pilihan Divisi 1</th><th scope="col" class="hide-mobile" data-v-2be29492${_scopeId}>Alasan Divisi 1</th><th scope="col" data-v-2be29492${_scopeId}>Pilihan Divisi 2</th><th scope="col" class="hide-mobile" data-v-2be29492${_scopeId}>Alasan Divisi 2</th><th scope="col" data-v-2be29492${_scopeId}>Status</th><th scope="col" data-v-2be29492${_scopeId}><div class="sortable-header-internship" data-v-2be29492${_scopeId}><span data-v-2be29492${_scopeId}>Tanggal Daftar</span><i class="${ssrRenderClass([{ "active": sortField.value === "created_at" }, "bi bi-arrow-down-up sort-icon-internship"])}" data-v-2be29492${_scopeId}></i></div></th><th scope="col" class="th-center" data-v-2be29492${_scopeId}>Aksi</th></tr></thead><tbody class="table-body" data-v-2be29492${_scopeId}>`);
            if (filteredApplications.value.length === 0) {
              _push2(`<tr class="empty-row" data-v-2be29492${_scopeId}><td colspan="13" class="empty-cell" data-v-2be29492${_scopeId}><div class="empty-state-internship" data-v-2be29492${_scopeId}><i class="bi bi-inbox empty-icon" data-v-2be29492${_scopeId}></i><h5 class="empty-title" data-v-2be29492${_scopeId}>${ssrInterpolate(__props.applications.length === 0 ? "Belum Ada Data" : "Tidak Ada Hasil")}</h5><p class="empty-description" data-v-2be29492${_scopeId}>${ssrInterpolate(__props.applications.length === 0 ? "Belum ada pendaftar yang terdaftar." : "Tidak ada data yang sesuai dengan pencarian Anda.")}</p></div></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(paginatedApplications.value, (app, index) => {
              _push2(`<tr class="table-row" data-v-2be29492${_scopeId}><td class="td-center" data-v-2be29492${_scopeId}><span class="row-number" data-v-2be29492${_scopeId}>${ssrInterpolate((currentPage.value - 1) * itemsPerPage.value + index + 1)}</span></td><td class="td-name" data-v-2be29492${_scopeId}><div class="name-cell" data-v-2be29492${_scopeId}><div class="name-primary" data-v-2be29492${_scopeId}>${ssrInterpolate(app.name)}</div><small class="name-secondary" data-v-2be29492${_scopeId}>${ssrInterpolate(app.nim)}</small></div></td><td class="td-nim" data-v-2be29492${_scopeId}><span data-v-2be29492${_scopeId}>${ssrInterpolate(app.nim)}</span></td><td class="td-email" data-v-2be29492${_scopeId}><a${ssrRenderAttr("href", `mailto:${app.email}`)} class="email-link" data-v-2be29492${_scopeId}>${ssrInterpolate(app.email)}</a></td><td class="td-phone" data-v-2be29492${_scopeId}><a${ssrRenderAttr("href", getWhatsAppLink(app.phone_number))} target="_blank" class="phone-link"${ssrRenderAttr("title", `Chat WhatsApp ${app.name}`)} data-v-2be29492${_scopeId}>${ssrInterpolate(app.phone_number)}</a></td><td class="td-program" data-v-2be29492${_scopeId}><span data-v-2be29492${_scopeId}>${ssrInterpolate(app.study_program)}</span></td><td class="td-division" data-v-2be29492${_scopeId}><span class="division-text" data-v-2be29492${_scopeId}>${ssrInterpolate(app.division_choice_1)}</span></td><td class="td-reason hide-mobile" data-v-2be29492${_scopeId}><span${ssrRenderAttr("title", app.reason_choice_1)} class="reason-text" data-v-2be29492${_scopeId}>${ssrInterpolate(app.reason_choice_1)}</span></td><td class="td-division" data-v-2be29492${_scopeId}><span class="division-text" data-v-2be29492${_scopeId}>${ssrInterpolate(app.division_choice_2)}</span></td><td class="td-reason hide-mobile" data-v-2be29492${_scopeId}><span${ssrRenderAttr("title", app.reason_choice_2)} class="reason-text" data-v-2be29492${_scopeId}>${ssrInterpolate(app.reason_choice_2)}</span></td><td class="td-center" data-v-2be29492${_scopeId}>`);
              if (app.willing_to_be_placed_elsewhere) {
                _push2(`<span class="status-badge status-success" data-v-2be29492${_scopeId}><i class="bi bi-check-circle" data-v-2be29492${_scopeId}></i>Bersedia </span>`);
              } else {
                _push2(`<span class="status-badge status-danger" data-v-2be29492${_scopeId}><i class="bi bi-x-circle" data-v-2be29492${_scopeId}></i>Tidak Bersedia </span>`);
              }
              _push2(`</td><td class="td-date" data-v-2be29492${_scopeId}><small data-v-2be29492${_scopeId}>${ssrInterpolate(formatDate(app.created_at))}</small></td><td class="td-action" data-v-2be29492${_scopeId}><div class="action-group" data-v-2be29492${_scopeId}><button class="action-btn action-btn-info"${ssrRenderAttr("title", `Detail ${app.name}`)} data-v-2be29492${_scopeId}><i class="bi bi-eye" data-v-2be29492${_scopeId}></i><span data-v-2be29492${_scopeId}>Detail</span></button><button class="action-btn action-btn-primary"${ssrRenderAttr("title", `Lihat KRS ${app.name}`)} data-v-2be29492${_scopeId}><i class="bi bi-file-earmark-image" data-v-2be29492${_scopeId}></i><span data-v-2be29492${_scopeId}>KRS</span></button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (totalPages.value > 1) {
              _push2(`<div class="pagination-section" data-v-2be29492${_scopeId}><div class="pagination-info" data-v-2be29492${_scopeId}> Menampilkan <strong data-v-2be29492${_scopeId}>${ssrInterpolate((currentPage.value - 1) * itemsPerPage.value + 1)}</strong> - <strong data-v-2be29492${_scopeId}>${ssrInterpolate(Math.min(currentPage.value * itemsPerPage.value, filteredApplications.value.length))}</strong> dari <strong data-v-2be29492${_scopeId}>${ssrInterpolate(filteredApplications.value.length)}</strong> data </div><nav class="pagination-nav" data-v-2be29492${_scopeId}><ul class="pagination-list" data-v-2be29492${_scopeId}><li class="${ssrRenderClass([{ disabled: currentPage.value === 1 }, "page-item-internship"])}" data-v-2be29492${_scopeId}><button class="page-link-internship"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-2be29492${_scopeId}><i class="bi bi-chevron-double-left" data-v-2be29492${_scopeId}></i></button></li><li class="${ssrRenderClass([{ disabled: currentPage.value === 1 }, "page-item-internship"])}" data-v-2be29492${_scopeId}><button class="page-link-internship"${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} data-v-2be29492${_scopeId}><i class="bi bi-chevron-left" data-v-2be29492${_scopeId}></i></button></li><!--[-->`);
              ssrRenderList(visiblePages.value, (page) => {
                _push2(`<li class="${ssrRenderClass([{ active: page === currentPage.value }, "page-item-internship"])}" data-v-2be29492${_scopeId}><button class="page-link-internship" data-v-2be29492${_scopeId}>${ssrInterpolate(page)}</button></li>`);
              });
              _push2(`<!--]--><li class="${ssrRenderClass([{ disabled: currentPage.value === totalPages.value }, "page-item-internship"])}" data-v-2be29492${_scopeId}><button class="page-link-internship"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-2be29492${_scopeId}><i class="bi bi-chevron-right" data-v-2be29492${_scopeId}></i></button></li><li class="${ssrRenderClass([{ disabled: currentPage.value === totalPages.value }, "page-item-internship"])}" data-v-2be29492${_scopeId}><button class="page-link-internship"${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} data-v-2be29492${_scopeId}><i class="bi bi-chevron-double-right" data-v-2be29492${_scopeId}></i></button></li></ul></nav></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="modal fade" id="divisionStatsModal" tabindex="-1" aria-labelledby="divisionStatsModalLabel" aria-hidden="true" data-v-2be29492${_scopeId}><div class="modal-dialog modal-xl" data-v-2be29492${_scopeId}><div class="modal-content modal-content-stats" data-v-2be29492${_scopeId}><div class="modal-header-stats" data-v-2be29492${_scopeId}><div class="modal-header-content" data-v-2be29492${_scopeId}><i class="bi bi-diagram-3 modal-icon-stats" data-v-2be29492${_scopeId}></i><div class="modal-title-section" data-v-2be29492${_scopeId}><h5 class="modal-title-stats" data-v-2be29492${_scopeId}>Statistik Per Divisi</h5><small class="modal-subtitle-stats" data-v-2be29492${_scopeId}>Data berdasarkan pilihan pendaftar</small></div></div><button type="button" class="modal-close-stats" data-bs-dismiss="modal" data-v-2be29492${_scopeId}><i class="bi bi-x" data-v-2be29492${_scopeId}></i></button></div><div class="modal-body-stats" data-v-2be29492${_scopeId}><div class="stats-summary" data-v-2be29492${_scopeId}><div class="summary-card summary-primary" data-v-2be29492${_scopeId}><div class="summary-content" data-v-2be29492${_scopeId}><i class="bi bi-building" data-v-2be29492${_scopeId}></i><div class="summary-details" data-v-2be29492${_scopeId}><h6 data-v-2be29492${_scopeId}>${ssrInterpolate(allDivisionStats.value.length)}</h6><small data-v-2be29492${_scopeId}>Total Divisi</small></div></div></div><div class="summary-card summary-success" data-v-2be29492${_scopeId}><div class="summary-content" data-v-2be29492${_scopeId}><i class="bi bi-person-check" data-v-2be29492${_scopeId}></i><div class="summary-details" data-v-2be29492${_scopeId}><h6 data-v-2be29492${_scopeId}>${ssrInterpolate(totalDivisionChoices.value)}</h6><small data-v-2be29492${_scopeId}>Total Pilihan</small></div></div></div><div class="summary-card summary-info" data-v-2be29492${_scopeId}><div class="summary-content" data-v-2be29492${_scopeId}><i class="bi bi-trophy" data-v-2be29492${_scopeId}></i><div class="summary-details" data-v-2be29492${_scopeId}><h6 data-v-2be29492${_scopeId}>${ssrInterpolate(((_a = topDivision.value) == null ? void 0 : _a.name) || "-")}</h6><small data-v-2be29492${_scopeId}>Paling Diminati</small></div></div></div></div><div class="division-stats-list" data-v-2be29492${_scopeId}><h6 class="list-title" data-v-2be29492${_scopeId}><i class="bi bi-list-ul" data-v-2be29492${_scopeId}></i> Daftar Divisi &amp; Jumlah Pendaftar </h6><div class="division-items" data-v-2be29492${_scopeId}><!--[-->`);
            ssrRenderList(allDivisionStats.value, (division, index) => {
              _push2(`<div class="${ssrRenderClass([{ "most-popular": index === 0 }, "division-item"])}" data-v-2be29492${_scopeId}><div class="division-info" data-v-2be29492${_scopeId}><div class="division-header-item" data-v-2be29492${_scopeId}><h6 class="division-name-item" data-v-2be29492${_scopeId}><i class="bi bi-building division-icon" data-v-2be29492${_scopeId}></i> ${ssrInterpolate(division.name)} `);
              if (index === 0) {
                _push2(`<span class="popular-badge" data-v-2be29492${_scopeId}><i class="bi bi-star-fill" data-v-2be29492${_scopeId}></i> Terpopuler </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</h6></div><div class="division-stats-row" data-v-2be29492${_scopeId}><div class="stat-item" data-v-2be29492${_scopeId}><span class="stat-icon" data-v-2be29492${_scopeId}><i class="bi bi-1-circle" data-v-2be29492${_scopeId}></i></span><div class="stat-content-item" data-v-2be29492${_scopeId}><span class="stat-value" data-v-2be29492${_scopeId}>${ssrInterpolate(division.choice1)}</span><span class="stat-text" data-v-2be29492${_scopeId}>Pilihan 1</span></div></div><div class="stat-item" data-v-2be29492${_scopeId}><span class="stat-icon" data-v-2be29492${_scopeId}><i class="bi bi-2-circle" data-v-2be29492${_scopeId}></i></span><div class="stat-content-item" data-v-2be29492${_scopeId}><span class="stat-value" data-v-2be29492${_scopeId}>${ssrInterpolate(division.choice2)}</span><span class="stat-text" data-v-2be29492${_scopeId}>Pilihan 2</span></div></div><div class="stat-item total-item" data-v-2be29492${_scopeId}><span class="stat-icon" data-v-2be29492${_scopeId}><i class="bi bi-plus-circle" data-v-2be29492${_scopeId}></i></span><div class="stat-content-item" data-v-2be29492${_scopeId}><span class="stat-value total-value" data-v-2be29492${_scopeId}>${ssrInterpolate(division.total)}</span><span class="stat-text" data-v-2be29492${_scopeId}>Total</span></div></div></div><div class="progress-container" data-v-2be29492${_scopeId}><div class="progress-bar-stats" data-v-2be29492${_scopeId}><div class="progress-fill-stats" style="${ssrRenderStyle({ width: `${division.total / maxDivisionTotal.value * 100}%` })}" data-v-2be29492${_scopeId}></div></div><span class="progress-percentage" data-v-2be29492${_scopeId}>${ssrInterpolate((division.total / totalDivisionChoices.value * 100).toFixed(1))}% </span></div></div></div>`);
            });
            _push2(`<!--]--></div></div></div><div class="modal-footer-stats" data-v-2be29492${_scopeId}><div class="footer-info" data-v-2be29492${_scopeId}><small class="text-muted" data-v-2be29492${_scopeId}><i class="bi bi-info-circle" data-v-2be29492${_scopeId}></i> Data diperbarui secara real-time berdasarkan filter yang aktif </small></div><div class="modal-actions-stats" data-v-2be29492${_scopeId}><button type="button" class="btn-close-stats" data-bs-dismiss="modal" data-v-2be29492${_scopeId}><i class="bi bi-x" data-v-2be29492${_scopeId}></i> Tutup </button></div></div></div></div></div><div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModalLabel" aria-hidden="true" data-v-2be29492${_scopeId}><div class="modal-dialog modal-xl" data-v-2be29492${_scopeId}><div class="modal-content modal-content-internship" data-v-2be29492${_scopeId}><div class="modal-header-internship" data-v-2be29492${_scopeId}><div class="modal-header-content" data-v-2be29492${_scopeId}><i class="bi bi-person-circle modal-icon" data-v-2be29492${_scopeId}></i><div class="modal-title-section" data-v-2be29492${_scopeId}><h5 class="modal-title-internship" data-v-2be29492${_scopeId}>Detail Pendaftar Internship</h5>`);
            if (selectedApp.value) {
              _push2(`<small class="modal-subtitle" data-v-2be29492${_scopeId}>${ssrInterpolate(selectedApp.value.name)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><button type="button" class="modal-close" data-bs-dismiss="modal" data-v-2be29492${_scopeId}><i class="bi bi-x" data-v-2be29492${_scopeId}></i></button></div>`);
            if (selectedApp.value) {
              _push2(`<div class="modal-body-internship" data-v-2be29492${_scopeId}><div class="modal-grid" data-v-2be29492${_scopeId}><div class="info-section" data-v-2be29492${_scopeId}><div class="info-card-internship" data-v-2be29492${_scopeId}><div class="info-header" data-v-2be29492${_scopeId}><h6 class="info-title" data-v-2be29492${_scopeId}><i class="bi bi-person-fill info-icon" data-v-2be29492${_scopeId}></i> Informasi Personal </h6></div><div class="info-body" data-v-2be29492${_scopeId}><div class="info-table" data-v-2be29492${_scopeId}><div class="info-row" data-v-2be29492${_scopeId}><span class="info-label" data-v-2be29492${_scopeId}>Nama Lengkap:</span><span class="info-value" data-v-2be29492${_scopeId}>${ssrInterpolate(selectedApp.value.name)}</span></div><div class="info-row" data-v-2be29492${_scopeId}><span class="info-label" data-v-2be29492${_scopeId}>NIM:</span><span class="info-value" data-v-2be29492${_scopeId}>${ssrInterpolate(selectedApp.value.nim)}</span></div><div class="info-row" data-v-2be29492${_scopeId}><span class="info-label" data-v-2be29492${_scopeId}>Email:</span><span class="info-value" data-v-2be29492${_scopeId}><a${ssrRenderAttr("href", `mailto:${selectedApp.value.email}`)} class="info-link" data-v-2be29492${_scopeId}>${ssrInterpolate(selectedApp.value.email)}</a></span></div><div class="info-row" data-v-2be29492${_scopeId}><span class="info-label" data-v-2be29492${_scopeId}>No. HP:</span><span class="info-value" data-v-2be29492${_scopeId}><div class="phone-group" data-v-2be29492${_scopeId}><span data-v-2be29492${_scopeId}>${ssrInterpolate(selectedApp.value.phone_number)}</span><a${ssrRenderAttr("href", getWhatsAppLink(selectedApp.value.phone_number))} target="_blank" class="whatsapp-btn" data-v-2be29492${_scopeId}><i class="bi bi-whatsapp" data-v-2be29492${_scopeId}></i>Chat </a></div></span></div><div class="info-row" data-v-2be29492${_scopeId}><span class="info-label" data-v-2be29492${_scopeId}>Program Studi:</span><span class="info-value" data-v-2be29492${_scopeId}><span class="program-badge" data-v-2be29492${_scopeId}>${ssrInterpolate(selectedApp.value.study_program)}</span></span></div></div></div></div></div><div class="info-section" data-v-2be29492${_scopeId}><div class="info-card-internship" data-v-2be29492${_scopeId}><div class="info-header" data-v-2be29492${_scopeId}><h6 class="info-title" data-v-2be29492${_scopeId}><i class="bi bi-building info-icon" data-v-2be29492${_scopeId}></i> Informasi Pendaftaran </h6></div><div class="info-body" data-v-2be29492${_scopeId}><div class="info-table" data-v-2be29492${_scopeId}><div class="info-row" data-v-2be29492${_scopeId}><span class="info-label" data-v-2be29492${_scopeId}>Tanggal Daftar:</span><span class="info-value" data-v-2be29492${_scopeId}>${ssrInterpolate(formatDate(selectedApp.value.created_at))}</span></div><div class="info-row" data-v-2be29492${_scopeId}><span class="info-label" data-v-2be29492${_scopeId}>Bersedia Ditempatkan:</span><span class="info-value" data-v-2be29492${_scopeId}>`);
              if (selectedApp.value.willing_to_be_placed_elsewhere) {
                _push2(`<span class="status-badge status-success" data-v-2be29492${_scopeId}><i class="bi bi-check-circle" data-v-2be29492${_scopeId}></i>Ya, Bersedia </span>`);
              } else {
                _push2(`<span class="status-badge status-danger" data-v-2be29492${_scopeId}><i class="bi bi-x-circle" data-v-2be29492${_scopeId}></i>Tidak Bersedia </span>`);
              }
              _push2(`</span></div></div></div></div></div></div><div class="modal-divider" data-v-2be29492${_scopeId}></div><div class="modal-grid" data-v-2be29492${_scopeId}><div class="division-section" data-v-2be29492${_scopeId}><div class="division-card division-primary" data-v-2be29492${_scopeId}><div class="division-header" data-v-2be29492${_scopeId}><h6 class="division-title" data-v-2be29492${_scopeId}><i class="bi bi-1-circle" data-v-2be29492${_scopeId}></i> Pilihan Divisi Pertama </h6></div><div class="division-body" data-v-2be29492${_scopeId}><h6 class="division-name" data-v-2be29492${_scopeId}>${ssrInterpolate(selectedApp.value.division_choice_1)}</h6><div class="division-reason" data-v-2be29492${_scopeId}><p data-v-2be29492${_scopeId}>${ssrInterpolate(selectedApp.value.reason_choice_1)}</p></div></div></div></div><div class="division-section" data-v-2be29492${_scopeId}><div class="division-card division-info" data-v-2be29492${_scopeId}><div class="division-header" data-v-2be29492${_scopeId}><h6 class="division-title" data-v-2be29492${_scopeId}><i class="bi bi-2-circle" data-v-2be29492${_scopeId}></i> Pilihan Divisi Kedua </h6></div><div class="division-body" data-v-2be29492${_scopeId}><h6 class="division-name" data-v-2be29492${_scopeId}>${ssrInterpolate(selectedApp.value.division_choice_2)}</h6><div class="division-reason" data-v-2be29492${_scopeId}><p data-v-2be29492${_scopeId}>${ssrInterpolate(selectedApp.value.reason_choice_2)}</p></div></div></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="modal-footer-internship" data-v-2be29492${_scopeId}><div class="modal-actions" data-v-2be29492${_scopeId}>`);
            if (selectedApp.value) {
              _push2(`<a${ssrRenderAttr("href", getWhatsAppLink(selectedApp.value.phone_number))} target="_blank" class="modal-btn modal-btn-success" data-v-2be29492${_scopeId}><i class="bi bi-whatsapp" data-v-2be29492${_scopeId}></i>Chat WhatsApp </a>`);
            } else {
              _push2(`<!---->`);
            }
            if (selectedApp.value) {
              _push2(`<a${ssrRenderAttr("href", `mailto:${selectedApp.value.email}?subject=Internship SEEO 2025 - ${selectedApp.value.name}`)} class="modal-btn modal-btn-info" data-v-2be29492${_scopeId}><i class="bi bi-envelope" data-v-2be29492${_scopeId}></i>Kirim Email </a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button type="button" class="modal-btn modal-btn-secondary" data-bs-dismiss="modal" data-v-2be29492${_scopeId}><i class="bi bi-x" data-v-2be29492${_scopeId}></i>Tutup </button></div></div></div></div></div><div class="modal fade" id="krsModal" tabindex="-1" aria-labelledby="krsModalLabel" aria-hidden="true" data-v-2be29492${_scopeId}><div class="modal-dialog modal-xl modal-dialog-centered" data-v-2be29492${_scopeId}><div class="modal-content krs-modal-content" data-v-2be29492${_scopeId}><div class="modal-header krs-modal-header" data-v-2be29492${_scopeId}><h5 class="modal-title" id="krsModalLabel" data-v-2be29492${_scopeId}><i class="bi bi-file-earmark-image me-2" data-v-2be29492${_scopeId}></i> KRS - ${ssrInterpolate((_b = selectedKRSApp.value) == null ? void 0 : _b.name)}</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-v-2be29492${_scopeId}></button></div><div class="modal-body krs-modal-body" data-v-2be29492${_scopeId}>`);
            if (selectedKRSApp.value) {
              _push2(`<div class="krs-container" data-v-2be29492${_scopeId}><div class="krs-info" data-v-2be29492${_scopeId}><div class="info-item" data-v-2be29492${_scopeId}><strong data-v-2be29492${_scopeId}>Nama:</strong> ${ssrInterpolate(selectedKRSApp.value.name)}</div><div class="info-item" data-v-2be29492${_scopeId}><strong data-v-2be29492${_scopeId}>NIM:</strong> ${ssrInterpolate(selectedKRSApp.value.nim)}</div><div class="info-item" data-v-2be29492${_scopeId}><strong data-v-2be29492${_scopeId}>Program Studi:</strong> ${ssrInterpolate(selectedKRSApp.value.study_program)}</div></div><div class="krs-viewer" data-v-2be29492${_scopeId}>`);
              if (getFileType(selectedKRSApp.value.krs_path) === "pdf") {
                _push2(`<iframe${ssrRenderAttr("src", "/storage/" + selectedKRSApp.value.krs_path)} class="krs-pdf-viewer" frameborder="0" data-v-2be29492${_scopeId}></iframe>`);
              } else {
                _push2(`<img${ssrRenderAttr("src", "/storage/" + selectedKRSApp.value.krs_path)}${ssrRenderAttr("alt", "KRS " + selectedKRSApp.value.name)} class="krs-image-viewer" data-v-2be29492${_scopeId}>`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="modal-footer krs-modal-footer" data-v-2be29492${_scopeId}>`);
            if (selectedKRSApp.value) {
              _push2(`<a${ssrRenderAttr("href", "/storage/" + selectedKRSApp.value.krs_path)} target="_blank" class="btn-download-krs" data-v-2be29492${_scopeId}><i class="bi bi-download" data-v-2be29492${_scopeId}></i> Download KRS </a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button type="button" class="btn-close-krs" data-bs-dismiss="modal" data-v-2be29492${_scopeId}><i class="bi bi-x-lg" data-v-2be29492${_scopeId}></i> Tutup </button></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Data Pendaftar Internship" }),
              createVNode("div", { class: "container-fluid internship-index-container" }, [
                createVNode("div", { class: "main-card shadow-sm mt-4" }, [
                  createVNode("div", { class: "card-header-internship" }, [
                    createVNode("div", { class: "header-left" }, [
                      createVNode("div", { class: "header-info" }, [
                        createVNode("h5", { class: "header-title" }, "Internship SEEO 2025"),
                        createVNode("small", { class: "header-subtitle" }, "Sistem Manajemen Data Pendaftar")
                      ])
                    ]),
                    createVNode("div", { class: "header-actions" }, [
                      createVNode("div", { class: "export-group" }, [
                        createVNode("div", {
                          class: "btn-group shadow-sm",
                          role: "group"
                        }, [
                          createVNode("div", {
                            class: "btn-group",
                            role: "group"
                          }, [
                            createVNode("button", {
                              type: "button",
                              class: "export-btn export-btn-pdf",
                              "data-bs-toggle": "dropdown",
                              "aria-expanded": "false",
                              disabled: __props.applications.length === 0 || isExporting.value
                            }, [
                              isExporting.value === "pdf" ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "btn-spinner",
                                role: "status"
                              })) : (openBlock(), createBlock("i", {
                                key: 1,
                                class: "bi bi-file-earmark-pdf"
                              })),
                              createVNode("span", { class: "btn-text" }, toDisplayString(isExporting.value === "pdf" ? "Generating..." : "Export PDF"), 1),
                              createVNode("i", { class: "bi bi-chevron-down" })
                            ], 8, ["disabled"]),
                            createVNode("ul", { class: "dropdown-menu dropdown-menu-internship" }, [
                              createVNode("li", null, [
                                createVNode("a", {
                                  class: "dropdown-item-internship",
                                  href: "#",
                                  onClick: withModifiers(exportToPDFSimple, ["prevent"])
                                }, [
                                  createVNode("i", { class: "bi bi-table dropdown-icon text-primary" }),
                                  createVNode("div", { class: "dropdown-content" }, [
                                    createVNode("div", { class: "dropdown-title" }, "PDF Ringkas"),
                                    createVNode("small", { class: "dropdown-subtitle" }, "Tanpa alasan divisi")
                                  ])
                                ])
                              ]),
                              createVNode("li", null, [
                                createVNode("hr", { class: "dropdown-divider" })
                              ]),
                              createVNode("li", null, [
                                createVNode("a", {
                                  class: "dropdown-item-internship",
                                  href: "#",
                                  onClick: withModifiers(exportToPDF, ["prevent"])
                                }, [
                                  createVNode("i", { class: "bi bi-file-text dropdown-icon text-success" }),
                                  createVNode("div", { class: "dropdown-content" }, [
                                    createVNode("div", { class: "dropdown-title" }, "PDF Lengkap"),
                                    createVNode("small", { class: "dropdown-subtitle" }, "Dengan alasan divisi")
                                  ])
                                ])
                              ])
                            ])
                          ]),
                          createVNode("button", {
                            onClick: exportToExcel,
                            type: "button",
                            class: "export-btn export-btn-excel",
                            disabled: __props.applications.length === 0 || isExporting.value
                          }, [
                            isExporting.value === "excel" ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "btn-spinner",
                              role: "status"
                            })) : (openBlock(), createBlock("i", {
                              key: 1,
                              class: "bi bi-file-earmark-excel"
                            })),
                            createVNode("span", { class: "btn-text" }, toDisplayString(isExporting.value === "excel" ? "Generating..." : "Export Excel"), 1)
                          ], 8, ["disabled"])
                        ])
                      ]),
                      createVNode("div", { class: "data-counter" }, [
                        createVNode("i", { class: "bi bi-people" }),
                        createVNode("span", null, toDisplayString(filteredApplications.value.length) + " / " + toDisplayString(__props.applications.length), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "card-body-internship" }, [
                    createVNode("div", { class: "filter-section" }, [
                      createVNode("div", { class: "search-box" }, [
                        createVNode("div", { class: "search-input-group" }, [
                          createVNode("span", { class: "search-icon" }, [
                            createVNode("i", { class: "bi bi-search" })
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                            type: "text",
                            class: "search-input",
                            placeholder: "Cari berdasarkan nama pendaftar..."
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, searchQuery.value]
                          ]),
                          searchQuery.value ? (openBlock(), createBlock("button", {
                            key: 0,
                            onClick: clearSearch,
                            class: "search-clear",
                            type: "button"
                          }, [
                            createVNode("i", { class: "bi bi-x" })
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "filter-box" }, [
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => filterStudyProgram.value = $event,
                          class: "filter-select"
                        }, [
                          createVNode("option", { value: "" }, "Semua Program Studi"),
                          (openBlock(true), createBlock(Fragment, null, renderList(uniqueStudyPrograms.value, (program) => {
                            return openBlock(), createBlock("option", {
                              key: program,
                              value: program
                            }, toDisplayString(program), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, filterStudyProgram.value]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "stats-grid" }, [
                      createVNode("div", { class: "stat-card stat-primary" }, [
                        createVNode("div", { class: "stat-content" }, [
                          createVNode("i", { class: "bi bi-people stat-icon" }),
                          createVNode("div", { class: "stat-details" }, [
                            createVNode("h4", { class: "stat-number" }, toDisplayString(filteredApplications.value.length), 1),
                            createVNode("small", { class: "stat-label" }, "Total Pendaftar")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "stat-card stat-success" }, [
                        createVNode("div", { class: "stat-content" }, [
                          createVNode("i", { class: "bi bi-check-circle stat-icon" }),
                          createVNode("div", { class: "stat-details" }, [
                            createVNode("h4", { class: "stat-number" }, toDisplayString(willingCount.value), 1),
                            createVNode("small", { class: "stat-label" }, "Bersedia Ditempatkan")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "stat-card stat-warning" }, [
                        createVNode("div", { class: "stat-content" }, [
                          createVNode("i", { class: "bi bi-x-circle stat-icon" }),
                          createVNode("div", { class: "stat-details" }, [
                            createVNode("h4", { class: "stat-number" }, toDisplayString(notWillingCount.value), 1),
                            createVNode("small", { class: "stat-label" }, "Tidak Bersedia")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "stat-card stat-info" }, [
                        createVNode("div", { class: "stat-content" }, [
                          createVNode("i", { class: "bi bi-mortarboard stat-icon" }),
                          createVNode("div", { class: "stat-details" }, [
                            createVNode("h4", { class: "stat-number" }, toDisplayString(uniqueStudyPrograms.value.length), 1),
                            createVNode("small", { class: "stat-label" }, "Program Studi")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "stat-card stat-gradient" }, [
                        createVNode("div", { class: "stat-content" }, [
                          createVNode("i", { class: "bi bi-diagram-3 stat-icon" }),
                          createVNode("div", { class: "stat-details" }, [
                            createVNode("h4", { class: "stat-number" }, toDisplayString(allDivisionStats.value.length), 1),
                            createVNode("small", { class: "stat-label" }, "Divisi Tersedia")
                          ])
                        ]),
                        createVNode("div", { class: "stat-action" }, [
                          createVNode("button", {
                            onClick: showDivisionStatsModal,
                            class: "stats-btn",
                            disabled: allDivisionStats.value.length === 0
                          }, [
                            createVNode("i", { class: "bi bi-bar-chart" }),
                            createVNode("span", null, "Lihat Statistik")
                          ], 8, ["disabled"])
                        ])
                      ])
                    ]),
                    createVNode("div", {
                      class: "table-container",
                      ref_key: "tableContainer",
                      ref: tableContainer
                    }, [
                      createVNode("table", { class: "data-table" }, [
                        createVNode("thead", { class: "table-header" }, [
                          createVNode("tr", null, [
                            createVNode("th", {
                              scope: "col",
                              class: "th-center"
                            }, "#"),
                            createVNode("th", { scope: "col" }, [
                              createVNode("div", {
                                class: "sortable-header-internship",
                                onClick: ($event) => toggleSort("name")
                              }, [
                                createVNode("span", null, "Nama"),
                                createVNode("i", {
                                  class: ["bi bi-arrow-down-up sort-icon-internship", { "active": sortField.value === "name" }]
                                }, null, 2)
                              ], 8, ["onClick"])
                            ]),
                            createVNode("th", { scope: "col" }, "NIM"),
                            createVNode("th", { scope: "col" }, "Email"),
                            createVNode("th", { scope: "col" }, "No. HP"),
                            createVNode("th", { scope: "col" }, [
                              createVNode("div", {
                                class: "sortable-header-internship",
                                onClick: ($event) => toggleSort("study_program")
                              }, [
                                createVNode("span", null, "Program Studi"),
                                createVNode("i", {
                                  class: ["bi bi-arrow-down-up sort-icon-internship", { "active": sortField.value === "study_program" }]
                                }, null, 2)
                              ], 8, ["onClick"])
                            ]),
                            createVNode("th", { scope: "col" }, "Pilihan Divisi 1"),
                            createVNode("th", {
                              scope: "col",
                              class: "hide-mobile"
                            }, "Alasan Divisi 1"),
                            createVNode("th", { scope: "col" }, "Pilihan Divisi 2"),
                            createVNode("th", {
                              scope: "col",
                              class: "hide-mobile"
                            }, "Alasan Divisi 2"),
                            createVNode("th", { scope: "col" }, "Status"),
                            createVNode("th", { scope: "col" }, [
                              createVNode("div", {
                                class: "sortable-header-internship",
                                onClick: ($event) => toggleSort("created_at")
                              }, [
                                createVNode("span", null, "Tanggal Daftar"),
                                createVNode("i", {
                                  class: ["bi bi-arrow-down-up sort-icon-internship", { "active": sortField.value === "created_at" }]
                                }, null, 2)
                              ], 8, ["onClick"])
                            ]),
                            createVNode("th", {
                              scope: "col",
                              class: "th-center"
                            }, "Aksi")
                          ])
                        ]),
                        createVNode("tbody", { class: "table-body" }, [
                          filteredApplications.value.length === 0 ? (openBlock(), createBlock("tr", {
                            key: 0,
                            class: "empty-row"
                          }, [
                            createVNode("td", {
                              colspan: "13",
                              class: "empty-cell"
                            }, [
                              createVNode("div", { class: "empty-state-internship" }, [
                                createVNode("i", { class: "bi bi-inbox empty-icon" }),
                                createVNode("h5", { class: "empty-title" }, toDisplayString(__props.applications.length === 0 ? "Belum Ada Data" : "Tidak Ada Hasil"), 1),
                                createVNode("p", { class: "empty-description" }, toDisplayString(__props.applications.length === 0 ? "Belum ada pendaftar yang terdaftar." : "Tidak ada data yang sesuai dengan pencarian Anda."), 1)
                              ])
                            ])
                          ])) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(paginatedApplications.value, (app, index) => {
                            return openBlock(), createBlock("tr", {
                              key: app.id,
                              class: "table-row"
                            }, [
                              createVNode("td", { class: "td-center" }, [
                                createVNode("span", { class: "row-number" }, toDisplayString((currentPage.value - 1) * itemsPerPage.value + index + 1), 1)
                              ]),
                              createVNode("td", { class: "td-name" }, [
                                createVNode("div", { class: "name-cell" }, [
                                  createVNode("div", { class: "name-primary" }, toDisplayString(app.name), 1),
                                  createVNode("small", { class: "name-secondary" }, toDisplayString(app.nim), 1)
                                ])
                              ]),
                              createVNode("td", { class: "td-nim" }, [
                                createVNode("span", null, toDisplayString(app.nim), 1)
                              ]),
                              createVNode("td", { class: "td-email" }, [
                                createVNode("a", {
                                  href: `mailto:${app.email}`,
                                  class: "email-link"
                                }, toDisplayString(app.email), 9, ["href"])
                              ]),
                              createVNode("td", { class: "td-phone" }, [
                                createVNode("a", {
                                  href: getWhatsAppLink(app.phone_number),
                                  target: "_blank",
                                  class: "phone-link",
                                  title: `Chat WhatsApp ${app.name}`,
                                  onClick: ($event) => trackWhatsAppClick(app.name)
                                }, toDisplayString(app.phone_number), 9, ["href", "title", "onClick"])
                              ]),
                              createVNode("td", { class: "td-program" }, [
                                createVNode("span", null, toDisplayString(app.study_program), 1)
                              ]),
                              createVNode("td", { class: "td-division" }, [
                                createVNode("span", { class: "division-text" }, toDisplayString(app.division_choice_1), 1)
                              ]),
                              createVNode("td", { class: "td-reason hide-mobile" }, [
                                createVNode("span", {
                                  title: app.reason_choice_1,
                                  class: "reason-text"
                                }, toDisplayString(app.reason_choice_1), 9, ["title"])
                              ]),
                              createVNode("td", { class: "td-division" }, [
                                createVNode("span", { class: "division-text" }, toDisplayString(app.division_choice_2), 1)
                              ]),
                              createVNode("td", { class: "td-reason hide-mobile" }, [
                                createVNode("span", {
                                  title: app.reason_choice_2,
                                  class: "reason-text"
                                }, toDisplayString(app.reason_choice_2), 9, ["title"])
                              ]),
                              createVNode("td", { class: "td-center" }, [
                                app.willing_to_be_placed_elsewhere ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "status-badge status-success"
                                }, [
                                  createVNode("i", { class: "bi bi-check-circle" }),
                                  createTextVNode("Bersedia ")
                                ])) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "status-badge status-danger"
                                }, [
                                  createVNode("i", { class: "bi bi-x-circle" }),
                                  createTextVNode("Tidak Bersedia ")
                                ]))
                              ]),
                              createVNode("td", { class: "td-date" }, [
                                createVNode("small", null, toDisplayString(formatDate(app.created_at)), 1)
                              ]),
                              createVNode("td", { class: "td-action" }, [
                                createVNode("div", { class: "action-group" }, [
                                  createVNode("button", {
                                    onClick: ($event) => showDetailModal(app),
                                    class: "action-btn action-btn-info",
                                    title: `Detail ${app.name}`
                                  }, [
                                    createVNode("i", { class: "bi bi-eye" }),
                                    createVNode("span", null, "Detail")
                                  ], 8, ["onClick", "title"]),
                                  createVNode("button", {
                                    onClick: ($event) => viewKRS(app),
                                    class: "action-btn action-btn-primary",
                                    title: `Lihat KRS ${app.name}`
                                  }, [
                                    createVNode("i", { class: "bi bi-file-earmark-image" }),
                                    createVNode("span", null, "KRS")
                                  ], 8, ["onClick", "title"])
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ], 512),
                    totalPages.value > 1 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "pagination-section"
                    }, [
                      createVNode("div", { class: "pagination-info" }, [
                        createTextVNode(" Menampilkan "),
                        createVNode("strong", null, toDisplayString((currentPage.value - 1) * itemsPerPage.value + 1), 1),
                        createTextVNode(" - "),
                        createVNode("strong", null, toDisplayString(Math.min(currentPage.value * itemsPerPage.value, filteredApplications.value.length)), 1),
                        createTextVNode(" dari "),
                        createVNode("strong", null, toDisplayString(filteredApplications.value.length), 1),
                        createTextVNode(" data ")
                      ]),
                      createVNode("nav", { class: "pagination-nav" }, [
                        createVNode("ul", { class: "pagination-list" }, [
                          createVNode("li", {
                            class: ["page-item-internship", { disabled: currentPage.value === 1 }]
                          }, [
                            createVNode("button", {
                              class: "page-link-internship",
                              onClick: ($event) => currentPage.value = 1,
                              disabled: currentPage.value === 1
                            }, [
                              createVNode("i", { class: "bi bi-chevron-double-left" })
                            ], 8, ["onClick", "disabled"])
                          ], 2),
                          createVNode("li", {
                            class: ["page-item-internship", { disabled: currentPage.value === 1 }]
                          }, [
                            createVNode("button", {
                              class: "page-link-internship",
                              onClick: ($event) => currentPage.value--,
                              disabled: currentPage.value === 1
                            }, [
                              createVNode("i", { class: "bi bi-chevron-left" })
                            ], 8, ["onClick", "disabled"])
                          ], 2),
                          (openBlock(true), createBlock(Fragment, null, renderList(visiblePages.value, (page) => {
                            return openBlock(), createBlock("li", {
                              key: page,
                              class: ["page-item-internship", { active: page === currentPage.value }]
                            }, [
                              createVNode("button", {
                                class: "page-link-internship",
                                onClick: ($event) => currentPage.value = page
                              }, toDisplayString(page), 9, ["onClick"])
                            ], 2);
                          }), 128)),
                          createVNode("li", {
                            class: ["page-item-internship", { disabled: currentPage.value === totalPages.value }]
                          }, [
                            createVNode("button", {
                              class: "page-link-internship",
                              onClick: ($event) => currentPage.value++,
                              disabled: currentPage.value === totalPages.value
                            }, [
                              createVNode("i", { class: "bi bi-chevron-right" })
                            ], 8, ["onClick", "disabled"])
                          ], 2),
                          createVNode("li", {
                            class: ["page-item-internship", { disabled: currentPage.value === totalPages.value }]
                          }, [
                            createVNode("button", {
                              class: "page-link-internship",
                              onClick: ($event) => currentPage.value = totalPages.value,
                              disabled: currentPage.value === totalPages.value
                            }, [
                              createVNode("i", { class: "bi bi-chevron-double-right" })
                            ], 8, ["onClick", "disabled"])
                          ], 2)
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              createVNode("div", {
                class: "modal fade",
                id: "divisionStatsModal",
                tabindex: "-1",
                "aria-labelledby": "divisionStatsModalLabel",
                "aria-hidden": "true",
                ref_key: "divisionStatsModal",
                ref: divisionStatsModal
              }, [
                createVNode("div", { class: "modal-dialog modal-xl" }, [
                  createVNode("div", { class: "modal-content modal-content-stats" }, [
                    createVNode("div", { class: "modal-header-stats" }, [
                      createVNode("div", { class: "modal-header-content" }, [
                        createVNode("i", { class: "bi bi-diagram-3 modal-icon-stats" }),
                        createVNode("div", { class: "modal-title-section" }, [
                          createVNode("h5", { class: "modal-title-stats" }, "Statistik Per Divisi"),
                          createVNode("small", { class: "modal-subtitle-stats" }, "Data berdasarkan pilihan pendaftar")
                        ])
                      ]),
                      createVNode("button", {
                        type: "button",
                        class: "modal-close-stats",
                        "data-bs-dismiss": "modal"
                      }, [
                        createVNode("i", { class: "bi bi-x" })
                      ])
                    ]),
                    createVNode("div", { class: "modal-body-stats" }, [
                      createVNode("div", { class: "stats-summary" }, [
                        createVNode("div", { class: "summary-card summary-primary" }, [
                          createVNode("div", { class: "summary-content" }, [
                            createVNode("i", { class: "bi bi-building" }),
                            createVNode("div", { class: "summary-details" }, [
                              createVNode("h6", null, toDisplayString(allDivisionStats.value.length), 1),
                              createVNode("small", null, "Total Divisi")
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "summary-card summary-success" }, [
                          createVNode("div", { class: "summary-content" }, [
                            createVNode("i", { class: "bi bi-person-check" }),
                            createVNode("div", { class: "summary-details" }, [
                              createVNode("h6", null, toDisplayString(totalDivisionChoices.value), 1),
                              createVNode("small", null, "Total Pilihan")
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "summary-card summary-info" }, [
                          createVNode("div", { class: "summary-content" }, [
                            createVNode("i", { class: "bi bi-trophy" }),
                            createVNode("div", { class: "summary-details" }, [
                              createVNode("h6", null, toDisplayString(((_c = topDivision.value) == null ? void 0 : _c.name) || "-"), 1),
                              createVNode("small", null, "Paling Diminati")
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "division-stats-list" }, [
                        createVNode("h6", { class: "list-title" }, [
                          createVNode("i", { class: "bi bi-list-ul" }),
                          createTextVNode(" Daftar Divisi & Jumlah Pendaftar ")
                        ]),
                        createVNode("div", { class: "division-items" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(allDivisionStats.value, (division, index) => {
                            return openBlock(), createBlock("div", {
                              key: division.name,
                              class: ["division-item", { "most-popular": index === 0 }]
                            }, [
                              createVNode("div", { class: "division-info" }, [
                                createVNode("div", { class: "division-header-item" }, [
                                  createVNode("h6", { class: "division-name-item" }, [
                                    createVNode("i", { class: "bi bi-building division-icon" }),
                                    createTextVNode(" " + toDisplayString(division.name) + " ", 1),
                                    index === 0 ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "popular-badge"
                                    }, [
                                      createVNode("i", { class: "bi bi-star-fill" }),
                                      createTextVNode(" Terpopuler ")
                                    ])) : createCommentVNode("", true)
                                  ])
                                ]),
                                createVNode("div", { class: "division-stats-row" }, [
                                  createVNode("div", { class: "stat-item" }, [
                                    createVNode("span", { class: "stat-icon" }, [
                                      createVNode("i", { class: "bi bi-1-circle" })
                                    ]),
                                    createVNode("div", { class: "stat-content-item" }, [
                                      createVNode("span", { class: "stat-value" }, toDisplayString(division.choice1), 1),
                                      createVNode("span", { class: "stat-text" }, "Pilihan 1")
                                    ])
                                  ]),
                                  createVNode("div", { class: "stat-item" }, [
                                    createVNode("span", { class: "stat-icon" }, [
                                      createVNode("i", { class: "bi bi-2-circle" })
                                    ]),
                                    createVNode("div", { class: "stat-content-item" }, [
                                      createVNode("span", { class: "stat-value" }, toDisplayString(division.choice2), 1),
                                      createVNode("span", { class: "stat-text" }, "Pilihan 2")
                                    ])
                                  ]),
                                  createVNode("div", { class: "stat-item total-item" }, [
                                    createVNode("span", { class: "stat-icon" }, [
                                      createVNode("i", { class: "bi bi-plus-circle" })
                                    ]),
                                    createVNode("div", { class: "stat-content-item" }, [
                                      createVNode("span", { class: "stat-value total-value" }, toDisplayString(division.total), 1),
                                      createVNode("span", { class: "stat-text" }, "Total")
                                    ])
                                  ])
                                ]),
                                createVNode("div", { class: "progress-container" }, [
                                  createVNode("div", { class: "progress-bar-stats" }, [
                                    createVNode("div", {
                                      class: "progress-fill-stats",
                                      style: { width: `${division.total / maxDivisionTotal.value * 100}%` }
                                    }, null, 4)
                                  ]),
                                  createVNode("span", { class: "progress-percentage" }, toDisplayString((division.total / totalDivisionChoices.value * 100).toFixed(1)) + "% ", 1)
                                ])
                              ])
                            ], 2);
                          }), 128))
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "modal-footer-stats" }, [
                      createVNode("div", { class: "footer-info" }, [
                        createVNode("small", { class: "text-muted" }, [
                          createVNode("i", { class: "bi bi-info-circle" }),
                          createTextVNode(" Data diperbarui secara real-time berdasarkan filter yang aktif ")
                        ])
                      ]),
                      createVNode("div", { class: "modal-actions-stats" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn-close-stats",
                          "data-bs-dismiss": "modal"
                        }, [
                          createVNode("i", { class: "bi bi-x" }),
                          createTextVNode(" Tutup ")
                        ])
                      ])
                    ])
                  ])
                ])
              ], 512),
              createVNode("div", {
                class: "modal fade",
                id: "detailModal",
                tabindex: "-1",
                "aria-labelledby": "detailModalLabel",
                "aria-hidden": "true",
                ref_key: "detailModal",
                ref: detailModal
              }, [
                createVNode("div", { class: "modal-dialog modal-xl" }, [
                  createVNode("div", { class: "modal-content modal-content-internship" }, [
                    createVNode("div", { class: "modal-header-internship" }, [
                      createVNode("div", { class: "modal-header-content" }, [
                        createVNode("i", { class: "bi bi-person-circle modal-icon" }),
                        createVNode("div", { class: "modal-title-section" }, [
                          createVNode("h5", { class: "modal-title-internship" }, "Detail Pendaftar Internship"),
                          selectedApp.value ? (openBlock(), createBlock("small", {
                            key: 0,
                            class: "modal-subtitle"
                          }, toDisplayString(selectedApp.value.name), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("button", {
                        type: "button",
                        class: "modal-close",
                        "data-bs-dismiss": "modal"
                      }, [
                        createVNode("i", { class: "bi bi-x" })
                      ])
                    ]),
                    selectedApp.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "modal-body-internship"
                    }, [
                      createVNode("div", { class: "modal-grid" }, [
                        createVNode("div", { class: "info-section" }, [
                          createVNode("div", { class: "info-card-internship" }, [
                            createVNode("div", { class: "info-header" }, [
                              createVNode("h6", { class: "info-title" }, [
                                createVNode("i", { class: "bi bi-person-fill info-icon" }),
                                createTextVNode(" Informasi Personal ")
                              ])
                            ]),
                            createVNode("div", { class: "info-body" }, [
                              createVNode("div", { class: "info-table" }, [
                                createVNode("div", { class: "info-row" }, [
                                  createVNode("span", { class: "info-label" }, "Nama Lengkap:"),
                                  createVNode("span", { class: "info-value" }, toDisplayString(selectedApp.value.name), 1)
                                ]),
                                createVNode("div", { class: "info-row" }, [
                                  createVNode("span", { class: "info-label" }, "NIM:"),
                                  createVNode("span", { class: "info-value" }, toDisplayString(selectedApp.value.nim), 1)
                                ]),
                                createVNode("div", { class: "info-row" }, [
                                  createVNode("span", { class: "info-label" }, "Email:"),
                                  createVNode("span", { class: "info-value" }, [
                                    createVNode("a", {
                                      href: `mailto:${selectedApp.value.email}`,
                                      class: "info-link"
                                    }, toDisplayString(selectedApp.value.email), 9, ["href"])
                                  ])
                                ]),
                                createVNode("div", { class: "info-row" }, [
                                  createVNode("span", { class: "info-label" }, "No. HP:"),
                                  createVNode("span", { class: "info-value" }, [
                                    createVNode("div", { class: "phone-group" }, [
                                      createVNode("span", null, toDisplayString(selectedApp.value.phone_number), 1),
                                      createVNode("a", {
                                        href: getWhatsAppLink(selectedApp.value.phone_number),
                                        target: "_blank",
                                        class: "whatsapp-btn"
                                      }, [
                                        createVNode("i", { class: "bi bi-whatsapp" }),
                                        createTextVNode("Chat ")
                                      ], 8, ["href"])
                                    ])
                                  ])
                                ]),
                                createVNode("div", { class: "info-row" }, [
                                  createVNode("span", { class: "info-label" }, "Program Studi:"),
                                  createVNode("span", { class: "info-value" }, [
                                    createVNode("span", { class: "program-badge" }, toDisplayString(selectedApp.value.study_program), 1)
                                  ])
                                ])
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "info-section" }, [
                          createVNode("div", { class: "info-card-internship" }, [
                            createVNode("div", { class: "info-header" }, [
                              createVNode("h6", { class: "info-title" }, [
                                createVNode("i", { class: "bi bi-building info-icon" }),
                                createTextVNode(" Informasi Pendaftaran ")
                              ])
                            ]),
                            createVNode("div", { class: "info-body" }, [
                              createVNode("div", { class: "info-table" }, [
                                createVNode("div", { class: "info-row" }, [
                                  createVNode("span", { class: "info-label" }, "Tanggal Daftar:"),
                                  createVNode("span", { class: "info-value" }, toDisplayString(formatDate(selectedApp.value.created_at)), 1)
                                ]),
                                createVNode("div", { class: "info-row" }, [
                                  createVNode("span", { class: "info-label" }, "Bersedia Ditempatkan:"),
                                  createVNode("span", { class: "info-value" }, [
                                    selectedApp.value.willing_to_be_placed_elsewhere ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "status-badge status-success"
                                    }, [
                                      createVNode("i", { class: "bi bi-check-circle" }),
                                      createTextVNode("Ya, Bersedia ")
                                    ])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "status-badge status-danger"
                                    }, [
                                      createVNode("i", { class: "bi bi-x-circle" }),
                                      createTextVNode("Tidak Bersedia ")
                                    ]))
                                  ])
                                ])
                              ])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "modal-divider" }),
                      createVNode("div", { class: "modal-grid" }, [
                        createVNode("div", { class: "division-section" }, [
                          createVNode("div", { class: "division-card division-primary" }, [
                            createVNode("div", { class: "division-header" }, [
                              createVNode("h6", { class: "division-title" }, [
                                createVNode("i", { class: "bi bi-1-circle" }),
                                createTextVNode(" Pilihan Divisi Pertama ")
                              ])
                            ]),
                            createVNode("div", { class: "division-body" }, [
                              createVNode("h6", { class: "division-name" }, toDisplayString(selectedApp.value.division_choice_1), 1),
                              createVNode("div", { class: "division-reason" }, [
                                createVNode("p", null, toDisplayString(selectedApp.value.reason_choice_1), 1)
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "division-section" }, [
                          createVNode("div", { class: "division-card division-info" }, [
                            createVNode("div", { class: "division-header" }, [
                              createVNode("h6", { class: "division-title" }, [
                                createVNode("i", { class: "bi bi-2-circle" }),
                                createTextVNode(" Pilihan Divisi Kedua ")
                              ])
                            ]),
                            createVNode("div", { class: "division-body" }, [
                              createVNode("h6", { class: "division-name" }, toDisplayString(selectedApp.value.division_choice_2), 1),
                              createVNode("div", { class: "division-reason" }, [
                                createVNode("p", null, toDisplayString(selectedApp.value.reason_choice_2), 1)
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "modal-footer-internship" }, [
                      createVNode("div", { class: "modal-actions" }, [
                        selectedApp.value ? (openBlock(), createBlock("a", {
                          key: 0,
                          href: getWhatsAppLink(selectedApp.value.phone_number),
                          target: "_blank",
                          class: "modal-btn modal-btn-success"
                        }, [
                          createVNode("i", { class: "bi bi-whatsapp" }),
                          createTextVNode("Chat WhatsApp ")
                        ], 8, ["href"])) : createCommentVNode("", true),
                        selectedApp.value ? (openBlock(), createBlock("a", {
                          key: 1,
                          href: `mailto:${selectedApp.value.email}?subject=Internship SEEO 2025 - ${selectedApp.value.name}`,
                          class: "modal-btn modal-btn-info"
                        }, [
                          createVNode("i", { class: "bi bi-envelope" }),
                          createTextVNode("Kirim Email ")
                        ], 8, ["href"])) : createCommentVNode("", true),
                        createVNode("button", {
                          type: "button",
                          class: "modal-btn modal-btn-secondary",
                          "data-bs-dismiss": "modal"
                        }, [
                          createVNode("i", { class: "bi bi-x" }),
                          createTextVNode("Tutup ")
                        ])
                      ])
                    ])
                  ])
                ])
              ], 512),
              createVNode("div", {
                class: "modal fade",
                id: "krsModal",
                tabindex: "-1",
                "aria-labelledby": "krsModalLabel",
                "aria-hidden": "true",
                ref_key: "krsModal",
                ref: krsModal
              }, [
                createVNode("div", { class: "modal-dialog modal-xl modal-dialog-centered" }, [
                  createVNode("div", { class: "modal-content krs-modal-content" }, [
                    createVNode("div", { class: "modal-header krs-modal-header" }, [
                      createVNode("h5", {
                        class: "modal-title",
                        id: "krsModalLabel"
                      }, [
                        createVNode("i", { class: "bi bi-file-earmark-image me-2" }),
                        createTextVNode(" KRS - " + toDisplayString((_d = selectedKRSApp.value) == null ? void 0 : _d.name), 1)
                      ]),
                      createVNode("button", {
                        type: "button",
                        class: "btn-close",
                        "data-bs-dismiss": "modal",
                        "aria-label": "Close"
                      })
                    ]),
                    createVNode("div", { class: "modal-body krs-modal-body" }, [
                      selectedKRSApp.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "krs-container"
                      }, [
                        createVNode("div", { class: "krs-info" }, [
                          createVNode("div", { class: "info-item" }, [
                            createVNode("strong", null, "Nama:"),
                            createTextVNode(" " + toDisplayString(selectedKRSApp.value.name), 1)
                          ]),
                          createVNode("div", { class: "info-item" }, [
                            createVNode("strong", null, "NIM:"),
                            createTextVNode(" " + toDisplayString(selectedKRSApp.value.nim), 1)
                          ]),
                          createVNode("div", { class: "info-item" }, [
                            createVNode("strong", null, "Program Studi:"),
                            createTextVNode(" " + toDisplayString(selectedKRSApp.value.study_program), 1)
                          ])
                        ]),
                        createVNode("div", { class: "krs-viewer" }, [
                          getFileType(selectedKRSApp.value.krs_path) === "pdf" ? (openBlock(), createBlock("iframe", {
                            key: 0,
                            src: "/storage/" + selectedKRSApp.value.krs_path,
                            class: "krs-pdf-viewer",
                            frameborder: "0"
                          }, null, 8, ["src"])) : (openBlock(), createBlock("img", {
                            key: 1,
                            src: "/storage/" + selectedKRSApp.value.krs_path,
                            alt: "KRS " + selectedKRSApp.value.name,
                            class: "krs-image-viewer"
                          }, null, 8, ["src", "alt"]))
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "modal-footer krs-modal-footer" }, [
                      selectedKRSApp.value ? (openBlock(), createBlock("a", {
                        key: 0,
                        href: "/storage/" + selectedKRSApp.value.krs_path,
                        target: "_blank",
                        class: "btn-download-krs"
                      }, [
                        createVNode("i", { class: "bi bi-download" }),
                        createTextVNode(" Download KRS ")
                      ], 8, ["href"])) : createCommentVNode("", true),
                      createVNode("button", {
                        type: "button",
                        class: "btn-close-krs",
                        "data-bs-dismiss": "modal"
                      }, [
                        createVNode("i", { class: "bi bi-x-lg" }),
                        createTextVNode(" Tutup ")
                      ])
                    ])
                  ])
                ])
              ], 512)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Internship/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2be29492"]]);
export {
  Index as default
};
