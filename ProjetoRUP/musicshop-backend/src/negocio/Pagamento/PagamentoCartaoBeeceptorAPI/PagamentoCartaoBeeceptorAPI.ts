import axios from "axios";

import InfoPagamentoCartao from "../InfoPagamentoCartao/InfoPagamentoCartao";
import IPagamentoCartao from "../IPagamentoCartao/IPagamentoCartao";

class PagamentoCartaoBeeceptorAPI {
  private apiUrl =
    "https://apsapplication.free.beeceptor.com/my/api/musicshop/beeceptor/pagamento";

  async pagar(
    nomeTitular: string,
    numeroCvvCartao: string,
    vencimento: Date,
    cpfTitular: string
  ): Promise<any> {
    const body = {
      nomeTitular,
      numeroCvvCartao,
      vencimento,
      cpfTitular
    };

    const response = await axios.post(this.apiUrl, body);
    return response.data;
  }
}

export default PagamentoCartaoBeeceptorAPI;
