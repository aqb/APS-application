import { injectable } from "tsyringe";

import RegistroUsuarios from "./RegistroUsuarios";
import Usuario from "./Usuario";

@injectable()
class ControladorUsuario {
  private registroUsuarios;

  constructor(registroUsuarios: RegistroUsuarios) {
    this.registroUsuarios = registroUsuarios;
  }

  public editarUsuario(usuario: Usuario) {
    return this.registroUsuarios.editar(usuario);
  }
}

export default ControladorUsuario;
