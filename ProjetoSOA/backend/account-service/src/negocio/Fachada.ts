import { container, inject, injectable, singleton } from "tsyringe";
import IRepositorioUsuarios from "../dados/Usuario/IRepositorioUsuarios";
import IFabricaRepositorios from "./IFabricaRepositorios";
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

  public efetuarCadastro(email: string, senha: string, cpf: string, perfil: string) {
    this.controladorCadastro.efetuarCadastro(email, senha, cpf, perfil);
  }

  public efetuarLogin(email: string, senha: string): Usuario {
    return this.controladorLogin.efetuarLogin(email, senha);
  }

  public registrarSessao(usuario: Usuario): string {
    return this.controladorLogin.registrarSessao(usuario);
  }
}

export default Fachada;
