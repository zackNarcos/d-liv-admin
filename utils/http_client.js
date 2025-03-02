
export const http_client = async (client, {resourceUrl, action, data, id = null, additionalParams = {}}) => {
  try {
    let url = id ? `${resourceUrl}/${id}` : resourceUrl;
    if (action === "get") url = id ? `${resourceUrl}/${id}` : resourceUrl;

    const token = useAuthedUser().authData.token;
    const headers = {Authorization: `Bearer ${token}`};
    let response = {};

    switch (action) {
      case "get":
        response = await client.get(url, {params: additionalParams, headers});
        break;
      case "create":
        response = await client.post(url, data, {headers});
        break;
      case "update":
        response = await client.put(url, data, {headers});
        break;
      case "delete":
        response = await client.delete(url, {params: additionalParams});
        break;
      default:
        throw new Error("Invalid action type");
    }
    return response.data;
  } catch (error) {
    return error;
  }
}