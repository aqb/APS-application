import { InfoPagamentoCartao } from "../modelos/InfoPagamentoCartao";
import { getRequest, postRequest } from "./base";

export const finalizarPedido = async (
  infoPagamentoCartao: InfoPagamentoCartao,
  metodoPagamento: string
): Promise<void> => {
  const token = localStorage.getItem("token");
  await postRequest(
    `/finalizarpedido`,
    {
      infoPagamentoCartao,
      metodoPagamento
    },
    token?.toString()
  );
};
