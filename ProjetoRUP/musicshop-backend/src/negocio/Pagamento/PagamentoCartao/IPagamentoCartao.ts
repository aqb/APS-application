import InfoPagamentoCartao from "./InfoPagamentoCartao";

interface IPagamentoCartao {
  pagarCartao(
    pedidoId: string,
    infoPagamentoCartao: InfoPagamentoCartao
  ): Promise<any>;
}

export default IPagamentoCartao;
