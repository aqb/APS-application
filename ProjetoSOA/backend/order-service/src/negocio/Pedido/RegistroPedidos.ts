import { inject, injectable } from "tsyringe";

import IRepositorioPedidos from "../../dados/Pedido/IRepositorioPedidos";
import ItemPedido from "../Item/ItemPedido";
import Usuario from "../Usuario/Usuario";
import Pedido from "./Pedido";

@injectable()
class RegistroPedidos {
  private repositorioPedidos;

  constructor(
    @inject("RepositorioPedidos") repositorioPedidos: IRepositorioPedidos
  ) {
    this.repositorioPedidos = repositorioPedidos;
  }

  public adicionar(cliente: Usuario, itens: ItemPedido[]): Pedido {
    return this.repositorioPedidos.adicionar(cliente, itens);
  }

  public async pegarPedidos(clienteId: string): Promise<Pedido[]> {
    return await this.repositorioPedidos.pegarPedidos(clienteId);
  }

  public async pegarPedido(pedidoId: string): Promise<Pedido> {
    return await this.repositorioPedidos.pegarPedido(pedidoId);
  }

  public confirmarPedido(pedidoId: string): void {
    this.repositorioPedidos.confirmarPedido(pedidoId);
  }

  public cancelarPedido(pedidoId: string): void {
    this.repositorioPedidos.cancelarPedido(pedidoId);
  }
}

export default RegistroPedidos;
