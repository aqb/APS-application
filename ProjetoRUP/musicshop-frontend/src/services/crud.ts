import api from "../config/api";

export const getRequest = async (endpoint: string) => {
  const response = await api.get(endpoint);
  return response.data;
};

export const postRequest = async (endpoint: string, body: any) => {
  const response = await api.post(endpoint, body);
  return response.data;
};

export const putRequest = async (endpoint: string, body: any) => {
  const response = await api.put(endpoint, body);
  return response.data;
};

export const deleteRequest = async (endpoint: string) => {
  const response = await api.delete(endpoint);
  return response.data;
};
