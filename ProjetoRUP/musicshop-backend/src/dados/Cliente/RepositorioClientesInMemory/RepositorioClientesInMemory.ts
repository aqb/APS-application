import { singleton } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import Cliente from "../../../negocio/Cliente/Cliente";
import Carrinho from "../../../negocio/Produtos/Carrinho/Carrinho";
import IRepositorioClientes from "../IRepositorioClientes";

// TODO: Remover dados estaticos!
const defaultClientes: Cliente[] = [
  new Cliente(
    "0",
    "eric.clapton@gmail.com",
    "1234",
    "789",
    new Carrinho("0", [])
  ),
  new Cliente(
    "1",
    "renato.russo@gmail.com",
    "1234",
    "789",
    new Carrinho("1", [])
  ),
  new Cliente(
    "2",
    "reginaldo.rossi@gmail.com",
    "1234",
    "789",
    new Carrinho("2", [])
  )
];

@singleton()
class RepositorioClientesInMemory implements IRepositorioClientes {
  private clientes: Cliente[];

  constructor() {
    // TODO: Remover dados estaticos!
    this.clientes = defaultClientes;
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

  validarCredenciais(email: string, senha: string): boolean {
    return (
      this.clientes.find(
        cliente => cliente.getEmail() === email && cliente.getSenha() === senha
      ) !== undefined
    );
  }
}

export default RepositorioClientesInMemory;
