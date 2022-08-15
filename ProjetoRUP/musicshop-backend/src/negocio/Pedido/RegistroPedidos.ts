import { inject, injectable } from "tsyringe";

import IRepositorioPedidos from "../../dados/Pedido/IRepositorioPedidos";
import ItemPedido from "./ItemPedido";
import Pedido from "./Pedido";

@injectable()
class RegistroPedidos {
  private repositorioPedidos;

  constructor(
    @inject("RepositorioPedidos") repositorioPedidos: IRepositorioPedidos
  ) {
    this.repositorioPedidos = repositorioPedidos;
  }

  public adicionar(clienteId: string, itens: ItemPedido[]): Pedido {
    return this.repositorioPedidos.adicionar(clienteId, itens);
  }

  public pegarPedidos(clienteId: string): Pedido[] {
    return this.repositorioPedidos.pegarPedidos(clienteId);
  }

  public pegarPedido(pedidoId: string): Pedido {
    return this.repositorioPedidos.pegarPedido(pedidoId);
  }

  public confirmarPedido(pedidoId: string): void {
    this.repositorioPedidos.confirmarPedido(pedidoId);
  }

  public cancelarPedido(pedidoId: string): void {
    this.repositorioPedidos.cancelarPedido(pedidoId);
  }
}

export default RegistroPedidos;
