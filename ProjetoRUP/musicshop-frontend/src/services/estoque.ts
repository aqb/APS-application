import { ItemEstoque } from "../modelos/Estoque";
import { getRequest } from "./crud";

type GetEstoqueResponse = ItemEstoque[];

export const getEstoque = async (
  nomeFiltro?: string
): Promise<GetEstoqueResponse> => {
  const token = localStorage.getItem("token");
  const response = await getRequest(`/estoque`, token?.toString());
  return response;
};
