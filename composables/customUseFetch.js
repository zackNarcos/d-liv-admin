import { useAuthedUser } from "~/stores/authedUser";
let errorMessage = null;

export default async function customUseFetch({ url, method, headers = null, params = null, body = null }) {
  const appConfig = useAppConfig();

  const { data, error, pending, status } = await useFetch(`${appConfig.api.base}/${url}`, {
    method,
    headers,
    params,
    body,
    onRequest({ request, options }) {
      const authedUser = useAuthedUser();
      const token = authedUser.authData.token;
      options.headers = options.headers || {};
      if (token) options.headers.Authorization = `Bearer ${token}`;
    },

    onRequestError({ request, options, error }) {},

    onResponse({ request, response, options }) {},

    async onResponseError({ request, response, options }) {
      errorMessage = response._data.message;

      // Handle the response errors
      if (response.status === 401) {
        const authedUser = useAuthedUser();

        await authedUser.refreshToken();
        window.location.href = "/";
      }
    },
  });
  return { data: data.value, pending: pending.value, status: status.value, error: error.value, errorMessage };
}
