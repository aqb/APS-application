import { Carrinho } from "../modelos/Carrinho";
import { getRequest, postRequest } from "./crud";

export type GetCarrinhoResponse = {
  carrinho: Carrinho;
};

export const getCarrinho = async (id: string): Promise<GetCarrinhoResponse> => {
  const response = await getRequest(`/carrinho/${id}`);
  return response.data;
};

export const adicionarAoCarrinho = async (
  clienteId: string,
  produtoId: string,
  quantidadeDesejada: number
): Promise<void> => {
  await postRequest(`/adicionar`, {
    clienteId,
    produtoId,
    quantidadeDesejada
  });
};
