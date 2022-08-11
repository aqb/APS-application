import { ItemEstoque } from "../modelos/Estoque";
import { getRequest } from "./crud";

type GetEstoqueResponse = ItemEstoque[];

export const getEstoque = async (): Promise<GetEstoqueResponse> => {
  const response = await getRequest(`/estoque`);
  return response;
};
