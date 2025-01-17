import { container, inject, injectable, singleton } from "tsyringe";

import IRepositorioUsuarios from "../dados/Usuario/IRepositorioUsuarios";
import Email from "./Email/Email";
import IFabricaRepositorios from "./IFabricaRepositorios";
import Senha from "./Senha/Senha";
import ControladorCadastro from "./Usuario/ControladorCadastro";
import ControladorLogin from "./Usuario/ControladorLogin";
import ControladorPerfil from "./Usuario/ControladorUsuario";
import Usuario from "./Usuario/Usuario";

@injectable()
@singleton()
class Fachada {
  private controladorLogin;
  private controladorCadastro;
  private controladorPerfil;

  constructor(
    @inject("FabricaRepositorios") fabricaRepositorios: IFabricaRepositorios
  ) {
    container.register<IRepositorioUsuarios>("RepositorioUsuarios", {
      useValue: fabricaRepositorios.criarRepositorioUsuarios()
    });

    this.controladorLogin = container.resolve(ControladorLogin);
    this.controladorCadastro = container.resolve(ControladorCadastro);
    this.controladorPerfil = container.resolve(ControladorPerfil);
  }

  public async efetuarCadastro(usuario: Usuario) {
    await this.controladorCadastro.efetuarCadastro(usuario);
  }

  public async efetuarLogin(email: Email, senha: Senha): Promise<Usuario> {
    return await this.controladorLogin.efetuarLogin(email, senha);
  }

  public async registrarSessao(usuario: Usuario): Promise<string> {
    return await this.controladorLogin.registrarSessao(usuario);
  }

  public async me(id: string): Promise<Usuario> {
    return await this.controladorPerfil.me(id);
  }

  public async listarUsuarios(): Promise<Usuario[]> {
    return await this.controladorPerfil.listarUsuarios();
  }
}

export default Fachada;
