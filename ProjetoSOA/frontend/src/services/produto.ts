import Produto from "../modelos/Produto/Produto";
import { getRequest } from "./base";

type GetProdutoResponse = {
  produto: Produto;
};

export const getProduto = async (id: string): Promise<GetProdutoResponse> => {
  const response = await getRequest(`inventory/produto/${id}`);
  return response;
};
