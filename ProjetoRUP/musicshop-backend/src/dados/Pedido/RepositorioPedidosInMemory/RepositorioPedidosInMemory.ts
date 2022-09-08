import { singleton } from "tsyringe";

import Pedido from "../../../negocio/Pedido/Pedido";
import PedidoStatus from "../../../negocio/Pedido/PedidoStatus";
import IRepositorioPedidos from "../IRepositorioPedidos";
import PedidosDefault from "./default";

@singleton()
class RepositorioPedidosInMemory implements IRepositorioPedidos {
  private pedidos: Pedido[];

  constructor() {
    // TODO: Remover dados estaticos!
    this.pedidos = PedidosDefault;
  }

  adicionar(pedido: Pedido): void {
    this.pedidos.push(pedido);
  }

  pegarPedidos(clienteId: string): Pedido[] {
    return this.pedidos.filter(pedido => pedido.getClienteId() === clienteId);
  }

  pegarPedido(pedidoId: string): Pedido {
    const pedido = this.pedidos.find(pedido => pedido.getId() === pedidoId);
    if (pedido) {
      return pedido;
    }
    throw new Error(`Pedido ${pedidoId} não encontrado.`);
  }

  confirmarPedido(pedidoId: string): void {
    const pedido = this.pegarPedido(pedidoId);
    pedido.setStatus(PedidoStatus.CONFIRMADO);
  }

  cancelarPedido(pedidoId: string): void {
    const pedido = this.pegarPedido(pedidoId);
    pedido.setStatus(PedidoStatus.CANCELADO);
  }
}

export default RepositorioPedidosInMemory;
