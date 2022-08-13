import Carrinho from "../../Produto/Carrinho/Carrinho";
import InfoPagamento from "../InfoPagamento";

class InfoPagamentoMercadoPagoPro {
  private carrinho;

  public constructor(carrinho: Carrinho) {
    this.carrinho = carrinho;
  }
}
