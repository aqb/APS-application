import { injectable } from "tsyringe";

import RegistroUsuarios from "./RegistroUsuarios";
import Usuario from "./Usuario";

@injectable()
class ControladorCadastro {
  private registroUsuarios;

  constructor(registroUsuarios: RegistroUsuarios) {
    this.registroUsuarios = registroUsuarios;
  }

  public efetuarCadastro(camposUsuario: Usuario) {
    const novoUsuario = this.registroUsuarios.adicionar(camposUsuario);

    // TODO: Comunicar com serviço carrinho para criar um novo carrinho para o novo usuário.
  }
}

export default ControladorCadastro;
