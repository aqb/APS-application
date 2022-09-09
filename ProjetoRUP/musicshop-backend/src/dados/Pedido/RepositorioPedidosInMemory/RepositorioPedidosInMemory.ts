import { singleton } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import Cliente from "../../../negocio/Cliente/Cliente";
import ItemPedido from "../../../negocio/Item/ItemPedido";
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

  adicionar(cliente: Cliente, itens: ItemPedido[]): Pedido {
    const id = uuidv4();
    const pedido = new Pedido(id, cliente, itens, PedidoStatus.PENDENTE);
    this.pedidos.push(pedido);
    return pedido;
  }

  pegarPedidos(clienteId: string): Pedido[] {
    return this.pedidos.filter(pedido => {
      return pedido.getCliente().getId() === clienteId;
    });
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
