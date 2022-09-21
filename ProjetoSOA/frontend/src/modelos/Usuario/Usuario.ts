import CPF from "./CPF/CPF";
import Email from "./Email/Email";
import Perfil from "./Perfil/Perfil";
import Senha from "./Senha/Senha";

type Usuario = {
  id: string | undefined;
  email: Email;
  senha: Senha | undefined;
  cpf: CPF;
  perfil: Perfil;
};

export default Usuario;
