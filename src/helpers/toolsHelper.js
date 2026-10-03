export const showSuccessDialog = async (title, text) => {
  const { default: Swal } = await import('sweetalert2');
  return Swal.fire({
    icon: 'success',
    title,
    text,
    timer: 2000,
    showConfirmButton: false,
  });
};

export const showErrorDialog = async (title, text) => {
  const { default: Swal } = await import('sweetalert2');
  return Swal.fire({
    icon: 'error',
    title,
    text,
  });
};

export const showConfirmDialog = async (title, text) => {
  const { default: Swal } = await import('sweetalert2');
  const result = await Swal.fire({
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, Lanjutkan!',
    cancelButtonText: 'Batal',
  });
  return result.isConfirmed;
};

export const formatDate = (dateString) => {
  if (!dateString) return '-';
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};