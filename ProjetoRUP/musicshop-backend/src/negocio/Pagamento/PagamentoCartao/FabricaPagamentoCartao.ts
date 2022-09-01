import { container } from "tsyringe";

import FabricaPagamento from "../FabricaPagamento";
import AdapterPagamentoBeeceptor from "./Beeceptor/AdapterPagamentoBeeceptor";
import PagamentoCartao from "./PagamentoCartao";

class FabricaPagamentoCartao extends FabricaPagamento {
  // eslint-disable-next-line no-useless-constructor
  constructor(clienteId: string, pedidoId: string, infoPagamento: any) {
    super(clienteId, pedidoId, infoPagamento);
  }

  public criarPagamento(): PagamentoCartao {
    const bandeiraAdapterMap: { [key: string]: typeof PagamentoCartao } = {
      beeceptor: AdapterPagamentoBeeceptor
    };
    const CartaoAdapter = bandeiraAdapterMap[this.infoPagamento.bandeira];
    if (!CartaoAdapter) {
      throw new Error(`Bandeira ${this.infoPagamento.bandeira} não suportada.`);
    }
    container.register("PagamentoCartao", {
      useValue: new CartaoAdapter(
        this.clienteId,
        this.pedidoId,
        this.infoPagamento
      )
    });
    const pagamento = container.resolve<PagamentoCartao>("PagamentoCartao");
    return pagamento;
  }
}

export default FabricaPagamentoCartao;
