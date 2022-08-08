import { existsSync } from "fs";

import RegistroClientes from "./RegistroClientes";

class ControladorCadastro {
  private registroClientes: RegistroClientes;

  constructor(registroClientes: RegistroClientes) {
    this.registroClientes = registroClientes;
  }

  public adicionar(email: string, senha: string, cpf: string): void {
    return this.registroClientes.adicionar(email, senha, cpf);
  }
}

export default ControladorCadastro;
