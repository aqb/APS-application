import { postRequest } from "./base";

export const cadastro = async (
  cpf: string,
  email: string,
  senha: string
): Promise<void> => {
  const response = await postRequest(`/cadastro`, {
    cpf,
    email,
    senha
  });
  return response;
};
