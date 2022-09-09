import Pedido from "../Pedido/Pedido";
import Pagamento from "./Pagamento";

interface FabricaPagamento {
  criarPagamento(pedido: Pedido, infoPagamentoJSON: any): Pagamento;
}

export default FabricaPagamento;
