import Email from "../../negocio/Email/Email";
import Senha from "../../negocio/Senha/Senha";
import Usuario from "../../negocio/Usuario/Usuario";

interface IRepositorioUsuarios {
  adicionar(camposUsuario: Usuario): Usuario;

  efetuarLogin(email: Email, senha: Senha): Usuario;

  editar(usuario: Usuario): Usuario;

  pegarUsuario(id: string): Usuario;
}

export default IRepositorioUsuarios;
