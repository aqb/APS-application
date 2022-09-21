import consul from "../config/consul";

export const getHost = (service: string) => {
  return async () => {
    const services = await consul.health.service<any[]>({
      service,
      passing: true
    });

    if (services.length === 0) {
      throw new Error("Service not found");
    }

    const serviceInfo = services[0].Service;

    return `http://${serviceInfo.Address}:${serviceInfo.Port}`;
  };
};
