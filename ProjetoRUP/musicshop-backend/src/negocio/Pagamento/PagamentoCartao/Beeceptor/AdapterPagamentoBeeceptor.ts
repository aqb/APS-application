import InfoPagamentoCartao from "../InfoPagamentoCartao";
import IPagamentoCartao from "../IPagamentoCartao";
import PagamentoCartaoBeeceptorAPI from "./PagamentoCartaoBeeceptorAPI";

class AdapterPagamentoBeeceptor implements IPagamentoCartao {
  async pagarCartao(
    pedidoId: string,
    infoPagamentoCartao: InfoPagamentoCartao
  ): Promise<any> {
    const beeceptor = new PagamentoCartaoBeeceptorAPI();

    const id = {
      id: pedidoId
    };
    const pagamento = {
      valor: infoPagamentoCartao.getValorPagamento()
    };
    const cartao = {
      numero: infoPagamentoCartao.getNumeroCartao(),
      cvv: infoPagamentoCartao.getCvvCartao(),
      vencimento: infoPagamentoCartao.getVencimento()
    };
    const titular = {
      nome: infoPagamentoCartao.getNomeTitular(),
      cpf: infoPagamentoCartao.getCPFTitular()
    };
    const argumentoBeeceptor = {
      cartao,
      titular
    };

    return beeceptor.pagar(argumentoBeeceptor);
  }
}

export default AdapterPagamentoBeeceptor;
