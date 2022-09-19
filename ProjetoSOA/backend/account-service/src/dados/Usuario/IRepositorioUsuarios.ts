import Email from "../../negocio/Email/Email";
import Senha from "../../negocio/Senha/Senha";
import Usuario from "../../negocio/Usuario/Usuario";

interface IRepositorioUsuarios {
  adicionar(camposUsuario: Usuario): Promise<Usuario>;

  efetuarLogin(email: Email, senha: Senha): Promise<Usuario>;

  editar(usuario: Usuario): Promise<Usuario>;

  pegarUsuario(id: string): Promise<Usuario>;
}

export default IRepositorioUsuarios;
