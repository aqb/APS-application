import { InfoPagamentoCartao } from "../modelos/InfoPagamentoCartao";
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
  infoPagamentoCartao: InfoPagamentoCartao,
  metodoPagamento: string
): Promise<void> => {
  const token = localStorage.getItem("token");
  await postRequest(
    `/finalizarpedido`,
    {
      pedidoId,
      infoPagamentoCartao,
      metodoPagamento
    },
    token?.toString()
  );
};
