import { Carrinho } from "../modelos/Carrinho";
import { getRequest, postRequest } from "./base";

export type GetCarrinhoResponse = Carrinho;

export const getCarrinho = async (): Promise<GetCarrinhoResponse> => {
  const token = localStorage.getItem("token");
  const response = await getRequest(`/carrinho`, token?.toString());
  return response;
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
      quantidade: quantidadeDesejada
    },
    token?.toString()
  );
};
