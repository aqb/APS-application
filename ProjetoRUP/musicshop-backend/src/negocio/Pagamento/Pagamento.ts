abstract class Pagamento {
  protected clienteId: string;
  protected pedidoId: string;

  constructor(clienteId: string, pedidoId: string) {
    this.clienteId = clienteId;
    this.pedidoId = pedidoId;
  }

  abstract pagar(): Promise<any>;
}

export default Pagamento;
