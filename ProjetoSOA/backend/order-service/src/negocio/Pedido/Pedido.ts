import { injectable } from "tsyringe";

import ItemPedido from "../Item/ItemPedido";
import Usuario from "../Usuario/Usuario";
import PedidoStatus from "./PedidoStatus";

@injectable()
class Pedido {
  private id: string;
  private cliente: Usuario;
  private itens: ItemPedido[];
  private status: PedidoStatus;

  public constructor(
    id: string,
    cliente: Usuario,
    itens: ItemPedido[],
    status: PedidoStatus
  ) {
    this.id = id;
    this.cliente = cliente;
    this.itens = itens;
    this.status = status;
  }

  public getId(): string {
    return this.id;
  }

  public getCliente(): Usuario {
    return this.cliente;
  }

  public setCliente(cliente: Usuario) {
    this.cliente = cliente;
  }

  public getItens(): ItemPedido[] {
    return this.itens;
  }

  public setItens(itens: ItemPedido[]) {
    this.itens = itens;
  }

  public getStatus(): PedidoStatus {
    return this.status;
  }

  public setStatus(status: PedidoStatus) {
    this.status = status;
  }

  public getTotal(): number {
    return this.itens.reduce((total: number, item: ItemPedido) => {
      return total + item.getValor();
    }, 0);
  }
}

export default Pedido;
