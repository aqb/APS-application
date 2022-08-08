import Cliente from "../Cliente/Cliente";
import PedidoStatus from "./PedidoStatus";

class Pedido {
  private cliente;
  private status;

  public constructor(cliente: Cliente, status: PedidoStatus) {
    this.cliente = cliente;
    this.status = status;
  }

  public getCliente(): Cliente {
    return this.cliente;
  }

  public setCliente(cliente: Cliente) {
    this.cliente = cliente;
  }

  public getStatus(): PedidoStatus {
    return this.status;
  }

  public setStatus(status: PedidoStatus) {
    this.status = status;
  }
}

export default Pedido;
