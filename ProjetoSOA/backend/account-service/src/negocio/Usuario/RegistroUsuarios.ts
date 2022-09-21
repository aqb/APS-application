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

  public async adicionar(camposUsuario: Usuario): Promise<Usuario> {
    return this.repositorioUsuarios.adicionar(camposUsuario);
  }

  public async efetuarLogin(email: Email, senha: Senha): Promise<Usuario> {
    return this.repositorioUsuarios.efetuarLogin(email, senha);
  }

  public async editar(usuario: Usuario) {
    return this.repositorioUsuarios.editar(usuario);
  }

  public async pegarUsuario(id: string): Promise<Usuario> {
    return this.repositorioUsuarios.pegarUsuario(id);
  }

  public async listarUsuarios(): Promise<Usuario[]> {
    return this.repositorioUsuarios.listarUsuarios();
  }
}

export default RegistroUsuarios;
