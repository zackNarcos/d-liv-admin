import axios from "axios";

export default defineNuxtPlugin((NuxtApp) => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "https://d-livz.com/api";
  return {
    provide: {
      axios: axios,
    },
  };
});
