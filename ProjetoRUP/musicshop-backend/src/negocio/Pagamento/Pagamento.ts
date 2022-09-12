import Pedido from "../Pedido/Pedido";

abstract class Pagamento {
  protected pedido: Pedido;

  constructor(pedido: Pedido) {
    this.pedido = pedido;
  }

  abstract pagar(): Promise<void>;

  public getPedidoId(): string {
    return this.pedido.getId();
  }
}

export default Pagamento;
