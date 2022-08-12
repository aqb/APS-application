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
  produtoId: string,
  quantidadeDesejada: number
): Promise<void> => {
  const token = localStorage.getItem("token");
  await postRequest(
    `/adicionar`,
    {
      produtoId,
      quantidadeDesejada
    },
    token?.toString()
  );
};
