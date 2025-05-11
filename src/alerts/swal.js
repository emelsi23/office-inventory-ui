import Swal from 'sweetalert2'

const showSuccess = (message = 'Saved successfully!') => {
    return Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
        timer: 2000,
        showConfirmButton: false
    })
}

const showError = (message = 'Something went wrong!') => {
    return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
    })
}

const showConfirm = (message = 'Are you sure?', confirmText = 'Yes') => {
    return Swal.fire({
        title: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmText
    })
}

export default {
    showSuccess,
    showError,
    showConfirm
}
