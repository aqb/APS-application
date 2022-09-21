import { injectable } from "tsyringe";

import RegistroUsuarios from "./RegistroUsuarios";
import Usuario from "./Usuario";

@injectable()
class ControladorPerfil {
  private registroUsuarios;

  constructor(registroUsuarios: RegistroUsuarios) {
    this.registroUsuarios = registroUsuarios;
  }

  public async editarUsuario(usuario: Usuario) {
    return this.registroUsuarios.editar(usuario);
  }

  public async me(id: string): Promise<Usuario> {
    return this.registroUsuarios.pegarUsuario(id);
  }

  public async listarUsuarios(): Promise<Usuario[]> {
    return this.registroUsuarios.listarUsuarios();
  }
}

export default ControladorPerfil;
