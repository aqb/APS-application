import { injectable } from "tsyringe";

import Cliente from "./Cliente";
import RegistroClientes from "./RegistroClientes";

@injectable()
class ControladorLogin {
  private registroClientes: RegistroClientes;

  constructor(registroClientes: RegistroClientes) {
    this.registroClientes = registroClientes;
  }

  public efetuarLogin(email: string, senha: string): boolean {
    return this.registroClientes.validarCredenciais(email, senha);
  }

  // TODO: Adicionar o parametro de usuario.
  public registrarSessao() {
    return null;
  }
}

export default ControladorLogin;
