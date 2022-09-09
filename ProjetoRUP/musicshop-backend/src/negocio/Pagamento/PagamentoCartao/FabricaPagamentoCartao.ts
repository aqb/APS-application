import { container } from "tsyringe";

import Cliente from "../../Cliente/Cliente";
import Pedido from "../../Pedido/Pedido";
import FabricaPagamento from "../FabricaPagamento";
import Pagamento from "../Pagamento";
import AdapterPagamentoBeeceptor from "./Beeceptor/AdapterPagamentoBeeceptor";
import PagamentoCartao from "./PagamentoCartao";

class FabricaPagamentoCartao implements FabricaPagamento {
  public criarPagamento(
    pedido: Pedido,
    infoPagamentoJSON: any
  ): PagamentoCartao {
    const bandeiraAdapterMap: { [key: string]: typeof PagamentoCartao } = {
      beeceptor: AdapterPagamentoBeeceptor
    };
    const CartaoAdapterType = bandeiraAdapterMap[infoPagamentoJSON.bandeira];

    if (!CartaoAdapterType) {
      throw new Error(`Bandeira ${infoPagamentoJSON.bandeira} não suportada.`);
    }

    container.register("PagamentoCartao", {
      useValue: new CartaoAdapterType(pedido, infoPagamentoJSON)
    });
    const pagamento = container.resolve<PagamentoCartao>("PagamentoCartao");
    return pagamento;
  }
}

export default FabricaPagamentoCartao;
