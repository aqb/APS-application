import Pagamento from "./Pagamento";

abstract class FabricaPagamento {
  protected clienteId: string;
  protected pedidoId: string;
  protected infoPagamento: any;

  constructor(clienteId: string, pedidoId: string, infoPagamento: any) {
    this.clienteId = clienteId;
    this.pedidoId = pedidoId;
    this.infoPagamento = infoPagamento;
  }

  abstract criarPagamento(): Pagamento;
}

export default FabricaPagamento;
