import { singleton } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import ItemPedido from "../../../negocio/Item/ItemPedido";
import Pedido from "../../../negocio/Pedido/Pedido";
import PedidoStatus from "../../../negocio/Pedido/PedidoStatus";
import Usuario from "../../../negocio/Usuario/Usuario";
import IRepositorioPedidos from "../IRepositorioPedidos";
import PedidosDefault from "./default";

@singleton()
class RepositorioPedidosInMemory implements IRepositorioPedidos {
  private pedidos: Pedido[];

  constructor() {
    // TODO: Remover dados estaticos!
    this.pedidos = PedidosDefault;
  }

  adicionar(cliente: Usuario, itens: ItemPedido[]): Pedido {
    const id = uuidv4();
    const pedido = new Pedido(id, cliente, itens, PedidoStatus.PENDENTE);
    this.pedidos.push(pedido);
    return pedido;
  }

  async pegarPedidos(clienteId: string): Promise<Pedido[]> {
    return this.pedidos.filter(pedido => {
      return pedido.getCliente().getId() === clienteId;
    });
  }

  async pegarPedido(pedidoId: string): Promise<Pedido> {
    const pedido = this.pedidos.find(pedido => pedido.getId() === pedidoId);
    if (pedido) {
      return pedido;
    }
    throw new Error(`Pedido ${pedidoId} não encontrado.`);
  }

  async confirmarPedido(pedidoId: string): Promise<void> {
    const pedido = await this.pegarPedido(pedidoId);
    pedido.setStatus(PedidoStatus.CONFIRMADO);
  }

  async cancelarPedido(pedidoId: string): Promise<void> {
    const pedido = await this.pegarPedido(pedidoId);
    pedido.setStatus(PedidoStatus.CANCELADO);
  }
}

export default RepositorioPedidosInMemory;
