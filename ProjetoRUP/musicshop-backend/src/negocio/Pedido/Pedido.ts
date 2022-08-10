import { injectable } from "tsyringe";

import Cliente from "../Cliente/Cliente";
import Carrinho from "../Produtos/Carrinho/Carrinho";
import PedidoStatus from "./PedidoStatus";

@injectable()
class Pedido {
  private cliente;
  private carrinho;
  private status;

  public constructor(
    cliente: Cliente,
    carrinho: Carrinho,
    status: PedidoStatus
  ) {
    this.cliente = cliente;
    this.carrinho = carrinho;
    this.status = status;
  }

  public getCliente(): Cliente {
    return this.cliente;
  }

  public setCliente(cliente: Cliente) {
    this.cliente = cliente;
  }

  public getCarrinho(): Carrinho {
    return this.carrinho;
  }

  public setCarrinho(carrinho: Carrinho) {
    this.carrinho = carrinho;
  }

  public getStatus(): PedidoStatus {
    return this.status;
  }

  public setStatus(status: PedidoStatus) {
    this.status = status;
  }
}

export default Pedido;
