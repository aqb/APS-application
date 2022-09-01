import { PagamentoCartao } from "../modelos/PagamentoCartao";
import { Pedido } from "../modelos/Pedido";
import { getRequest, postRequest } from "./base";

type PostCriarPedidoResponse = Pedido;

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

export const criarPedido = async (): Promise<PostCriarPedidoResponse> => {
  const token = localStorage.getItem("token");
  const response = await postRequest(`/criarpedido`, {}, token?.toString());
  return response;
};

export const finalizarPedido = async (
  pedidoId: string,
  infoPagamento: any,
  metodoPagamento: string
): Promise<void> => {
  const token = localStorage.getItem("token");
  await postRequest(
    `/finalizarpedido`,
    {
      pedidoId,
      infoPagamento,
      metodoPagamento
    },
    token?.toString()
  );
};
