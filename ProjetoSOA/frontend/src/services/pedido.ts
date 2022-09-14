import { Pedido } from "../modelos/Pedido";
import { getRequest, postRequest } from "./base";

export const getPedido = async (id: string): Promise<Pedido> => {
  const token = localStorage.getItem("token");
  const response = await getRequest(`/pedidos/${id}`, token?.toString());
  return response;
};

export const getPedidos = async (): Promise<Pedido[]> => {
  const token = localStorage.getItem("token");
  const response = await getRequest(`/pedidos`, token?.toString());
  return response;
};

export const realizarPedido = async (
  metodoPagamento: string,
  infoPagamento: any
): Promise<Pedido> => {
  const token = localStorage.getItem("token");
  const response = await postRequest(
    `/realizarpedido`,
    {
      metodoPagamento,
      infoPagamento
    },
    token?.toString()
  );
  return response;
};
