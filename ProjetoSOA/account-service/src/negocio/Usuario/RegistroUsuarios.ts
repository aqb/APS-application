import { inject, injectable } from "tsyringe";

import IRepositorioUsuarios from "../../dados/Usuario/IRepositorioUsuarios";
import Usuario from "./Usuario";

@injectable()
class RegistroUsuarios {
  private repositorioUsuarios;

  constructor(
    @inject("RepositorioUsuarios") repositorioUsuarios: IRepositorioUsuarios
  ) {
    this.repositorioUsuarios = repositorioUsuarios;
  }

  public adicionar(
    email: string,
    senha: string,
    cpf: string,
    perfil: string
  ): Usuario {
    return this.repositorioUsuarios.adicionar(email, senha, cpf, perfil);
  }

  public efetuarLogin(email: string, senha: string): Usuario {
    return this.repositorioUsuarios.efetuarLogin(email, senha);
  }

  public pegarUsuario(id: string): Usuario {
    return this.repositorioUsuarios.pegarUsuario(id);
  }
}
export default RegistroUsuarios;
