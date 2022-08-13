import { inject, injectable } from "tsyringe";

import IRepositorioPedidos from "../../dados/Pedido/IRepositorioPedidos";
import Cliente from "../Cliente/Cliente";
import Carrinho from "../Produto/Carrinho/Carrinho";

@injectable()
class RegistroPedidos {
  private repositorioPedidos;

  constructor(
    @inject("RepositorioPedidos") repositorioPedidos: IRepositorioPedidos
  ) {
    this.repositorioPedidos = repositorioPedidos;
  }

  public adicionar(cliente: Cliente, carrinho: Carrinho) {
    this.repositorioPedidos.adicionar(cliente, carrinho);
  }
}

export default RegistroPedidos;
