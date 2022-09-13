import Usuario from "../../negocio/Usuario/Usuario";

interface IRepositorioUsuarios {
  adicionar(email: string, senha: string, cpf: string, perfil: string): Usuario;

  efetuarLogin(email: string, senha: string): Usuario;

  pegarUsuario(id: string): Usuario;
}

export default IRepositorioUsuarios;
