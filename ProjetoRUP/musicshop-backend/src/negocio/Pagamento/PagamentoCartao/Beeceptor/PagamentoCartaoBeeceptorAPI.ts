import axios from "axios";

export type PagamentoCartaoBeeceptorAPIArgument = {
  cartao: {
    numero: string;
    cvv: string;
    vencimento: Date;
  };
  titular: {
    nome: string;
    cpf: string;
  };
};

class PagamentoCartaoBeeceptorAPI {
  private apiUrl =
    "https://apsapplication.free.beeceptor.com/my/api/musicshop/beeceptor/pagamento";

  async pagar(body: PagamentoCartaoBeeceptorAPIArgument): Promise<any> {
    const response = await axios.post(this.apiUrl, body);
    return response.data;
  }
}

export default PagamentoCartaoBeeceptorAPI;
