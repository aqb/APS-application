import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";

import RegistroUsuarios from "./RegistroUsuarios";
import Usuario from "./Usuario";

@injectable()
class ControladorLogin {
  private registroUsuarios: RegistroUsuarios;

  constructor(registroUsuarios: RegistroUsuarios) {
    this.registroUsuarios = registroUsuarios;
  }

  public efetuarLogin(email: string, senha: string): Usuario {
    return this.registroUsuarios.efetuarLogin(email, senha);
  }

  public registrarSessao(usuario: Usuario): string {
    return jwt.sign({ id: usuario.getId() }, "secret", {
      expiresIn: 60 * 60 * 24 * 30
    });
  }
}

export default ControladorLogin;
