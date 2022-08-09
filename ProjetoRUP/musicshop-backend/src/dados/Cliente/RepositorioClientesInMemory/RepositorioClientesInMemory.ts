import { singleton } from "tsyringe";

import Cliente from "../../../negocio/Cliente/Cliente";
import IRepositorioClientes from "../IRepositorioClientes";

@singleton()
class RepositorioClientesInMemory implements IRepositorioClientes {
  private clientes: Cliente[];

  constructor() {
    this.clientes = [];
  }

  adicionar(email: string, senha: string, cpf: string): Cliente {
    throw new Error("Method not implemented.");
  }

  validarCredenciais(email: string, senha: string): boolean {
    throw new Error("Method not implemented.");
  }
}

export default RepositorioClientesInMemory;
