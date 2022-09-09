abstract class Pagamento {
  protected clienteId: string;
  protected pedidoId: string;

  constructor(clienteId: string, pedidoId: string) {
    this.clienteId = clienteId;
    this.pedidoId = pedidoId;
  }

  abstract pagar(): Promise<void>;

  public getClienteId(): string {
    return this.clienteId;
  }

  public getPedidoId(): string {
    return this.pedidoId;
  }
}

export default Pagamento;
