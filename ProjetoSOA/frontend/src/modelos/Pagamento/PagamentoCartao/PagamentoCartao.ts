type PagamentoCartao = {
  numeroCartao: string;
  cvvCartao: string;
  vencimento: Date;
  nomeTitular: string;
  cpfTitular: string;
  bandeira: string;
  valorPagamento: number;
};

export default PagamentoCartao;
