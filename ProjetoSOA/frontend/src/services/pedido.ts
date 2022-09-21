import Pedido from "../modelos/Pedido/Pedido";
import { getRequest, postRequest } from "./base";

// TODO: Mudar para o serviço de Pedido.
export const getPedido = async (id: string): Promise<Pedido> => {
  const token = localStorage.getItem("token");
  const response = await getRequest(`/pedidos/${id}`, token?.toString());
  return response;
};

// TODO: Mudar para o serviço de Pedido.
export const getPedidos = async (): Promise<Pedido[]> => {
  const token = localStorage.getItem("token");
  const response = await getRequest(`/pedidos`, token?.toString());
  return response;
};

// TODO: Mudar para o serviço de Pedido.
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
