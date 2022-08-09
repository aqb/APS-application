import { injectable } from "tsyringe";

import RegistroClientes from "../Cliente/RegistroClientes";
import RegistroCarrinhos from "../Produtos/Carrinho/RegistroCarrinhos";

@injectable()
class ControladorCadastro {
  private registroClientes;
  private registroCarrinhos;

  constructor(
    registroClientes: RegistroClientes,
    registroCarrinhos: RegistroCarrinhos
  ) {
    this.registroClientes = registroClientes;
    this.registroCarrinhos = registroCarrinhos;
  }

  public cadastrarUsuario(email: string, senha: string, cpf: string) {
    // Cadastra e retorna um novo usuario a partir dos campos email, senha e cpf.
    const cliente = this.registroClientes.adicionar(email, senha, cpf);

    // Adiciona um carrinho vazio para o novo cliente adicionado anteriormente.
    this.registroCarrinhos.adicionar(cliente);
  }
}

export default ControladorCadastro;
