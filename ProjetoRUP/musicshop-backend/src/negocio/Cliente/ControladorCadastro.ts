import { injectable } from "tsyringe";

import RegistroClientes from "../Cliente/RegistroClientes";
import RegistroCarrinhos from "../Produto/Carrinho/RegistroCarrinhos";

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

  // TODO: Renomear para `cadastrarCliente`!
  public cadastrarUsuario(email: string, senha: string, cpf: string) {
    const cliente = this.registroClientes.adicionar(email, senha, cpf);
    this.registroCarrinhos.adicionar(cliente);
  }
}

export default ControladorCadastro;
