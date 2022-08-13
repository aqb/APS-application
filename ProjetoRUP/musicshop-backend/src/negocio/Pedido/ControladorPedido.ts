import { injectable } from "tsyringe";

import Cliente from "../Cliente/Cliente";
import InfoPagamento from "../Pagamento/InfoPagamento";
import Carrinho from "../Produto/Carrinho/Carrinho";
import RegistroCarrinhos from "../Produto/Carrinho/RegistroCarrinhos";
import RegistroPedidos from "./RegistroPedidos";

@injectable()
class ControladorPedido {
  private registroPedidos: RegistroPedidos;
  private registroCarrinhos: RegistroCarrinhos;

  constructor(
    registroPedidos: RegistroPedidos,
    registroCarrinhos: RegistroCarrinhos
  ) {
    this.registroPedidos = registroPedidos;
    this.registroCarrinhos = registroCarrinhos;
  }

  private pegarCarrinho(cliente: Cliente): Carrinho {
    return this.registroCarrinhos.pegarCarrinhoDe(cliente.getId());
  }

  public criarPedido(cliente: Cliente) {
    const carrinho = this.pegarCarrinho(cliente);
    this.registroPedidos.adicionar(cliente, carrinho);
  }

  // TODO: Caso de uso de pagamento
  // public pagar(infoPagament: InfoPagamento) {

  // }
}

export default ControladorPedido;
