// resources/js/Components/useSwal.js

import Swal from 'sweetalert2'

// Kustomisasi instance SweetAlert2 dengan kelas Bootstrap
const swal = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger me-2', // Tambahkan margin kanan
        denyButton: 'btn btn-secondary',
    },
    buttonsStyling: false // Penting: Matikan styling default agar kelas Bootstrap bisa bekerja
})

// Fungsi untuk menampilkan notifikasi sukses
export function showSuccess(message) {
    swal.fire({
        title: 'Berhasil!',
        text: message,
        icon: 'success',
        confirmButtonText: 'Oke'
    })
}

// Fungsi untuk menampilkan notifikasi error validasi
export function showErrors(errors) {
    const errorMessages = Object.values(errors).join('<br>');
    swal.fire({
        title: 'Oops... Terjadi Kesalahan!',
        html: errorMessages,
        icon: 'error',
        confirmButtonText: 'Tutup'
    })
}