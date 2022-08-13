import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";

import Cliente from "./Cliente";
import RegistroClientes from "./RegistroClientes";

@injectable()
class ControladorLogin {
  private registroClientes: RegistroClientes;

  constructor(registroClientes: RegistroClientes) {
    this.registroClientes = registroClientes;
  }

  public efetuarLogin(email: string, senha: string): Cliente {
    return this.registroClientes.efetuarLogin(email, senha);
  }

  public registrarSessao(cliente: Cliente): string {
    return jwt.sign({ id: cliente.getId() }, "secret", {
      expiresIn: 60 * 60 * 24 * 30
    });
  }
}

export default ControladorLogin;
