import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 10000,
})

export const buildQueryString = (params: Record<string, any>) => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
};
export const getAPi = async (url: string, params?: Record<string, any>) => {
  try {
    let fullUrl = url;
    if (params && Object.keys(params).length > 0) {
      const queryString = buildQueryString(params);
      fullUrl += (url.includes("?") ? "&" : "?") + queryString;
    }
    const response = await api.get(fullUrl);

    // Hem dizi hem obje destekli
    if (Array.isArray(response.data)) {
      return { data: response.data };
    } else if (response.data) {
      return response.data;
    } else {
      return { isEmpty: true };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { isEmpty: true };
  }
};

export const postApi = async (url: string, data: any) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}
export const deleteAPiWithParams = async (endpoint: string, id: any) => {
  if (!id || !endpoint) {
    console.error('Endpoint veya ID eksik');
    return;
  }

  try {
    const response = await api.delete(`/${endpoint}/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
}