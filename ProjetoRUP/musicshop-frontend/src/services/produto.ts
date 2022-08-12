import { Produto } from "../modelos/Produto";
import { getRequest } from "./crud";

type GetProdutoResponse = {
  produto: Produto;
};

export const getProduto = async (id: string): Promise<GetProdutoResponse> => {
  const token = localStorage.getItem("token");
  const response = await getRequest(`/produto/${id}`, token?.toString());
  return response;
};
