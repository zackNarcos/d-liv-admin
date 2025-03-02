import Swal from "sweetalert2";
export default defineNuxtPlugin((NuxtApp) => {
  return {
    provide: {
      swal: Swal,
    },
  };
});
