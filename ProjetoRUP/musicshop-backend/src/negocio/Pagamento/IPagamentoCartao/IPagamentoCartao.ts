import InfoPagamentoCartao from "../InfoPagamentoCartao/InfoPagamentoCartao";

interface IPagamentoCartao {
  pagarCartao(infoPagamentoCartao: InfoPagamentoCartao): Promise<any>;
}

export default IPagamentoCartao;
