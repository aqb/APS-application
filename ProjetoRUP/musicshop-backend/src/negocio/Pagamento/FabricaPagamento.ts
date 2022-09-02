import Pagamento from "./Pagamento";

abstract class FabricaPagamento {
  private clienteId: string;
  private pedidoId: string;
  private infoPagamento: any;

  constructor(clienteId: string, pedidoId: string, infoPagamento: any) {
    this.clienteId = clienteId;
    this.pedidoId = pedidoId;
    this.infoPagamento = infoPagamento;
  }

  abstract criarPagamento(): Pagamento;

  public getClienteId(): string {
    return this.clienteId;
  }

  public getPedidoId(): string {
    return this.pedidoId;
  }

  public getInfoPagamento(): any {
    return this.infoPagamento;
  }
}

export default FabricaPagamento;
