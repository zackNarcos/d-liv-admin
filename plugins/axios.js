import axios from "axios";

export default defineNuxtPlugin((NuxtApp) => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "https://content.api.esigmap.dev";
  return {
    provide: {
      axios: axios,
    },
  };
});
