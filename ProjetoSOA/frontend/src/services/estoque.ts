import Item from "../modelos/Item/Item";
import { getRequest } from "./base";

type GetEstoqueResponse = Item[];

export const getEstoque = async (
  nomeFiltro?: string
): Promise<GetEstoqueResponse> => {
  const response = await getRequest(`inventory/estoque`, undefined, {
    nome: nomeFiltro
  });
  return response;
};
