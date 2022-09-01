import { singleton } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import Carrinho from "../../../negocio/Carrinho/Carrinho";
import Cliente from "../../../negocio/Cliente/Cliente";
import IRepositorioClientes from "../IRepositorioClientes";
import ClientesDefault from "./default";

@singleton()
class RepositorioClientesInMemory implements IRepositorioClientes {
  private clientes: Cliente[];

  constructor() {
    // TODO: Remover dados estaticos!
    this.clientes = ClientesDefault;
  }

  adicionar(email: string, senha: string, cpf: string): Cliente {
    if (this.clientes.find(clienteAtual => clienteAtual.getEmail() === email)) {
      throw new Error("Email já cadastrado.");
    }

    if (this.clientes.find(clienteAtual => clienteAtual.getCPF() === cpf)) {
      throw new Error("CPF já cadastrado.");
    }

    const id = uuidv4();

    const novoCliente = new Cliente(
      id,
      email,
      senha,
      cpf,
      new Carrinho(id, [])
    );

    this.clientes.push(novoCliente);
    return novoCliente;
  }

  efetuarLogin(email: string, senha: string): Cliente {
    const cliente = this.clientes.find(
      cliente => cliente.getEmail() === email && cliente.getSenha() === senha
    );

    if (cliente) {
      return cliente;
    }
    throw new Error("Credenciais inválidas.");
  }
}

export default RepositorioClientesInMemory;
