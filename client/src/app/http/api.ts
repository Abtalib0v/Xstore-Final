import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/", // base URL'i düzenledim
  timeout: 10000,
})

export const getAPi = async (url: string, id?: string) => {
  try {
    const fullUrl = id ? `${url}/${id}` : url;
    const response = await api.get(fullUrl);

    if (response.data) {
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