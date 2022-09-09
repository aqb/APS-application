import { container, injectable } from "tsyringe";

import PagamentoCartao from "../PagamentoCartao";
import PagamentoCartaoBeeceptorAPI from "./PagamentoCartaoBeeceptorAPI";

@injectable()
class AdapterPagamentoBeeceptor extends PagamentoCartao {
  public async pagar(): Promise<void> {
    const beeceptor = container.resolve(PagamentoCartaoBeeceptorAPI);
    const id = {
      id: this.pedidoId
    };
    const pagamento = {
      valor: this.valorPagamento
    };
    const cartao = {
      numero: this.numeroCartao,
      cvv: this.cvvCartao,
      vencimento: this.vencimento
    };
    const titular = {
      nome: this.nomeTitular,
      cpf: this.cpfTitular
    };
    const argumentoBeeceptor = {
      id,
      pagamento,
      cartao,
      titular
    };
    await beeceptor.pagar(argumentoBeeceptor);
  }
}

export default AdapterPagamentoBeeceptor;
