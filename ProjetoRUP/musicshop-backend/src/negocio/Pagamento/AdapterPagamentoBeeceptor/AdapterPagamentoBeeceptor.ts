import InfoPagamentoCartao from "../InfoPagamentoCartao/InfoPagamentoCartao";
import IPagamentoCartao from "../IPagamentoCartao/IPagamentoCartao";
import PagamentoCartaoBeeceptorAPI from "../PagamentoCartaoBeeceptorAPI/PagamentoCartaoBeeceptorAPI";

class AdapterPagamentoBeeceptor implements IPagamentoCartao {
  async pagarCartao(infoPagamentoCartao: InfoPagamentoCartao): Promise<any> {
    const beeceptor = new PagamentoCartaoBeeceptorAPI();
    const nomeTitular = infoPagamentoCartao.getNomeTitular();
    const numeroCvvCartao =
      infoPagamentoCartao.getNumeroCartao() +
      infoPagamentoCartao.getCvvCartao();
    const vencimento = infoPagamentoCartao.getVencimento();
    const cpfTitular = infoPagamentoCartao.getCPFTitular();

    return beeceptor.pagar(
      nomeTitular,
      numeroCvvCartao,
      vencimento,
      cpfTitular
    );
  }
}

export default AdapterPagamentoBeeceptor;
