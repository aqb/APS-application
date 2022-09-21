import Carrinho from "../modelos/Carrinho/Carrinho";
import { getRequest, postRequest } from "./base";

export type GetCarrinhoResponse = Carrinho;

export const getCarrinho = async (): Promise<GetCarrinhoResponse> => {
  const token = localStorage.getItem("token");
  const response = await getRequest(`/cart/carrinho`, token?.toString());
  return response;
};

export const adicionarAoCarrinho = async (
  produtoId: string,
  quantidade: number
): Promise<void> => {
  const token = localStorage.getItem("token");
  await postRequest(
    `/cart/adicionar`,
    {
      produtoId,
      quantidade
    },
    token?.toString()
  );
};
