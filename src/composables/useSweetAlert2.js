import Swal from "sweetalert2";

export default function useSweetAlert2Notification() {
  const showSweetAlert = (options) => {
    Swal.fire(options);
  };
  return {
    showSweetAlert,
  };
}
