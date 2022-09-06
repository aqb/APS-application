import Pagamento from "./Pagamento";

interface FabricaPagamento {
  criarPagamento(clienteId: string, pedidoId: string, infoPagamentoJSON: any): Pagamento;
}

export default FabricaPagamento;
