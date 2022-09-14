import { inject, injectable } from "tsyringe";

import IRepositorioUsuarios from "../../dados/Usuario/IRepositorioUsuarios";
import Email from "../Email/Email";
import Senha from "../Senha/Senha";
import Usuario from "./Usuario";

@injectable()
class RegistroUsuarios {
  private repositorioUsuarios;

  constructor(
    @inject("RepositorioUsuarios") repositorioUsuarios: IRepositorioUsuarios
  ) {
    this.repositorioUsuarios = repositorioUsuarios;
  }

  public adicionar(camposUsuario: Usuario): Usuario {
    return this.repositorioUsuarios.adicionar(camposUsuario);
  }

  public efetuarLogin(email: Email, senha: Senha): Usuario {
    return this.repositorioUsuarios.efetuarLogin(email, senha);
  }

  public editar(usuario: Usuario) {
    return this.repositorioUsuarios.editar(usuario);
  }

  public pegarUsuario(id: string): Usuario {
    return this.repositorioUsuarios.pegarUsuario(id);
  }
}

export default RegistroUsuarios;
