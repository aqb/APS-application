export type InfoPagamentoCartao = {
  numeroCartao: string;
  cvvCartao: string;
  vencimento: Date;
  nomeTitular: string;
  cpfTitular: string;
  bandeira: string;
};

export default InfoPagamentoCartao;
