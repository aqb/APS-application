import { singleton } from "tsyringe";

import Cliente from "../../../negocio/Cliente/Cliente";
import Pedido from "../../../negocio/Pedido/Pedido";
import PedidoStatus from "../../../negocio/Pedido/PedidoStatus";
import Carrinho from "../../../negocio/Produto/Carrinho/Carrinho";
import IRepositorioPedidos from "../IRepositorioPedidos";

@singleton()
class RepositorioPedidosInMemory implements IRepositorioPedidos {
  private pedidos: Pedido[];

  constructor() {
    this.pedidos = [];
  }

  adicionar(cliente: Cliente, carrinho: Carrinho): void {
    const pedido = new Pedido(cliente, carrinho, PedidoStatus.PENDENTE);
    this.pedidos.push(pedido);
  }
}

export default RepositorioPedidosInMemory;
