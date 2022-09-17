import axios, { AxiosRequestConfig } from "axios";

import consul from "../config/consul";

export const comunicar = async (
  service: string,
  config: AxiosRequestConfig
) => {
  const services = await consul.health.service<any[]>({
    service,
    passing: true
  });

  if (services.length === 0) {
    throw new Error("Service not found");
  }

  const serviceInfo = services[0].Service;

  return await axios.request({
    ...config,
    baseURL: `http://${serviceInfo.Address}:${serviceInfo.Port}`
  });
};
