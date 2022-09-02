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
    const CartaoAdapter = bandeiraAdapterMap[super.getInfoPagamento().bandeira];
    if (!CartaoAdapter) {
      throw new Error(
        `Bandeira ${super.getInfoPagamento().bandeira} não suportada.`
      );
    }
    container.register("PagamentoCartao", {
      useValue: new CartaoAdapter(
        super.getClienteId(),
        super.getPedidoId(),
        super.getInfoPagamento()
      )
    });
    const pagamento = container.resolve<PagamentoCartao>("PagamentoCartao");
    return pagamento;
  }
}

export default FabricaPagamentoCartao;
