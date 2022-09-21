import Usuario from "../modelos/Usuario/Usuario";
import { postRequest } from "./base";

export const cadastro = async (usuario: Usuario): Promise<void> => {
  const response = await postRequest(`/account/cadastro`, {
    usuario
  });
  return response;
};
