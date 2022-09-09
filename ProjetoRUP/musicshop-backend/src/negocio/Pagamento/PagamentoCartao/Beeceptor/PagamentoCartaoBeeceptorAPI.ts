import axios from "axios";
import { injectable } from "tsyringe";

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

@injectable()
class PagamentoCartaoBeeceptorAPI {
  private apiUrl =
    "https://apsapplication.free.beeceptor.com/my/api/musicshop/beeceptor/pagamento";

  async pagar(body: PagamentoCartaoBeeceptorAPIArgument): Promise<any> {
    const response = await axios.post(this.apiUrl, body);
    return response.data;
  }
}

export default PagamentoCartaoBeeceptorAPI;
