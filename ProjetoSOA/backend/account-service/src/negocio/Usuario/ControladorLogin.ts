import jwt from "jsonwebtoken";
import { injectable } from "tsyringe";

import auth from "../../config/auth";
import Email from "../Email/Email";
import Senha from "../Senha/Senha";
import RegistroUsuarios from "./RegistroUsuarios";
import Usuario from "./Usuario";

@injectable()
class ControladorLogin {
  private registroUsuarios: RegistroUsuarios;

  constructor(registroUsuarios: RegistroUsuarios) {
    this.registroUsuarios = registroUsuarios;
  }

  public async efetuarLogin(email: Email, senha: Senha): Promise<Usuario> {
    const usuario = await this.registroUsuarios.efetuarLogin(email, senha);
    usuario.setSenha(undefined);
    return usuario;
  }

  public async registrarSessao(usuario: Usuario): Promise<string> {
    return jwt.sign({ id: usuario.getId() }, auth.secret, {
      expiresIn: auth.expiresIn
    });
  }
}

export default ControladorLogin;
