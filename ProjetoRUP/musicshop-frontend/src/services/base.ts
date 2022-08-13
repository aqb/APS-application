import api from "../config/api";

export const getRequest = async (
  endpoint: string,
  token?: string,
  params?: any
) => {
  const response = await api.get(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
    params
  });
  return response.data;
};

export const postRequest = async (
  endpoint: string,
  body: any,
  token?: string
) => {
  const response = await api.post(endpoint, body, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const putRequest = async (
  endpoint: string,
  body: any,
  token?: string
) => {
  const response = await api.put(endpoint, body, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteRequest = async (endpoint: string, token?: string) => {
  const response = await api.delete(endpoint, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
