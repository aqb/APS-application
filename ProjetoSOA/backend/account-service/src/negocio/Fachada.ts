import { container, inject, injectable, singleton } from "tsyringe";

import IRepositorioUsuarios from "../dados/Usuario/IRepositorioUsuarios";
import Email from "./Email/Email";
import IFabricaRepositorios from "./IFabricaRepositorios";
import Senha from "./Senha/Senha";
import ControladorCadastro from "./Usuario/ControladorCadastro";
import ControladorLogin from "./Usuario/ControladorLogin";
import Usuario from "./Usuario/Usuario";

@injectable()
@singleton()
class Fachada {
  private controladorLogin;
  private controladorCadastro;

  constructor(
    @inject("FabricaRepositorios") fabricaRepositorios: IFabricaRepositorios
  ) {
    container.register<IRepositorioUsuarios>("RepositorioUsuarios", {
      useValue: fabricaRepositorios.criarRepositorioUsuarios()
    });

    this.controladorLogin = container.resolve(ControladorLogin);
    this.controladorCadastro = container.resolve(ControladorCadastro);
  }

  public efetuarCadastro(usuario: Usuario) {
    this.controladorCadastro.efetuarCadastro(usuario);
  }

  public efetuarLogin(email: Email, senha: Senha): Usuario {
    return this.controladorLogin.efetuarLogin(email, senha);
  }

  public registrarSessao(usuario: Usuario): string {
    return this.controladorLogin.registrarSessao(usuario);
  }
}

export default Fachada;
