import { ItemEstoque } from "../modelos/Estoque";
import { getRequest } from "./base";

type GetEstoqueResponse = ItemEstoque[];

export const getEstoque = async (
  nomeFiltro?: string
): Promise<GetEstoqueResponse> => {
  const token = localStorage.getItem("token");
  const response = await getRequest(`/estoque`, token?.toString(), {
    nome: nomeFiltro
  });
  return response;
};
