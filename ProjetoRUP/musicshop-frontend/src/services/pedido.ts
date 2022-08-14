import { InfoPagamentoCartao } from "../modelos/InfoPagamentoCartao";
import { Pedido } from "../modelos/Pedido";
import { postRequest } from "./base";

type PostCriarPedidoResponse = Pedido;

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
