import InfoPagamentoCartao from "./InfoPagamentoCartao";

interface IPagamentoCartao {
  pagarCartao(infoPagamentoCartao: InfoPagamentoCartao): Promise<any>;
}

export default IPagamentoCartao;
