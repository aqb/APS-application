import { postRequest } from "./crud";

type PostLoginResponse = {
  token: string;
};

export const login = async (
  email: string,
  senha: string
): Promise<PostLoginResponse> => {
  const response = await postRequest(`/login`, {
    email,
    senha
  });
  return response;
};
