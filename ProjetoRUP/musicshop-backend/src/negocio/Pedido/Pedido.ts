import { injectable } from "tsyringe";

import ItemPedido from "./ItemPedido";
import PedidoStatus from "./PedidoStatus";

@injectable()
class Pedido {
  private id: string;
  private clienteId: string;
  private itens: ItemPedido[];
  private status: PedidoStatus;

  public constructor(
    id: string,
    clienteId: string,
    itens: ItemPedido[],
    status: PedidoStatus
  ) {
    this.id = id;
    this.clienteId = clienteId;
    this.itens = itens;
    this.status = status;
  }

  public getId(): string {
    return this.id;
  }

  public getClienteId(): string {
    return this.clienteId;
  }

  public setCliente(id: string) {
    this.clienteId = id;
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
