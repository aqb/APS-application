import { injectable } from "tsyringe";

import RegistroUsuarios from "./RegistroUsuarios";

@injectable()
class ControladorCadastro {
  private registroUsuarios;

  constructor(registroUsuarios: RegistroUsuarios) {
    this.registroUsuarios = registroUsuarios;
  }

  public efetuarCadastro(
    email: string,
    senha: string,
    cpf: string,
    perfil: string
  ) {
    const usuario = this.registroUsuarios.adicionar(email, senha, cpf, perfil);

    // TODO: Comunicar com serviço carrinho para criar um novo carrinho para o novo usuário.
  }
}

export default ControladorCadastro;
