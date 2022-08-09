import { singleton } from "tsyringe";

import Cliente from "../../../negocio/Cliente/Cliente";
import Carrinho from "../../../negocio/Produtos/Carrinho/Carrinho";
import IRepositorioClientes from "../IRepositorioClientes";

@singleton()
class RepositorioClientesInMemory implements IRepositorioClientes {
  private clientes: Cliente[];

  constructor() {
    const testeCarrinho = new Carrinho("0", []);
    const testeCliente = new Cliente(
      "0",
      "eric.clapton@gmail.com",
      "1234",
      "789",
      testeCarrinho
    );
    this.clientes = [testeCliente];
  }

  adicionar(email: string, senha: string, cpf: string): Cliente {
    throw new Error("Method not implemented.");
  }

  validarCredenciais(email: string, senha: string): boolean {
    return (
      this.clientes.find(
        cliente => cliente.getEmail() === email && cliente.getSenha() === senha
      ) !== undefined
    );
  }
}

export default RepositorioClientesInMemory;
