import axios from "axios";
import { useAuthedUser } from "~/stores/authedUser";
import appConfig from "~/app.config.ts";

const createAxiosClient = (baseURL) => {
  const axiosClient = axios.create({
    baseURL,
  });

  return axiosClient;
};

const createAxiosClient2 = (baseURL) => {
  const axiosClient = axios.create({
    baseURL,
  });

  axiosClient.interceptors.request.use((config) => {
    const authedUser = useAuthedUser();

    //get token
    const token = authedUser.authData.token;
    
    if (token) {
      config.headers.authentication = token;
    }
    return config;
  });

  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && (error.response.status === 401)) {
        const authedUser = useAuthedUser();

        //redirect to login page
        // await authedUser.logout();

        await authedUser.refreshToken();
      }

      console.error("error => ", error);

      return error;
    },
  );

  return axiosClient;
};

// instances with different base URLs
const axiosClient = createAxiosClient(appConfig.api.auth);
const axiosClient2 = createAxiosClient2(appConfig.api.auth);
const axiosClient3 = createAxiosClient2(appConfig.api.base);
export { axiosClient, axiosClient2, axiosClient3 };