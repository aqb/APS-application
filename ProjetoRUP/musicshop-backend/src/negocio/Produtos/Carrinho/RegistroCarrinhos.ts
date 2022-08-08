import IRepositorioCarrinhos from "../../../dados/IRepositorioCarrinhos";
import Carrinho from "./Carrinho";

class RegistroCarrinhos {
  private repositorioCarrinhos;

  constructor(repositorioCarrinhos: IRepositorioCarrinhos) {
    this.repositorioCarrinhos = repositorioCarrinhos;
  }

  public adicionar(carrinho: Carrinho) {
    this.repositorioCarrinhos.adicionar(carrinho);
  }
}

export default RegistroCarrinhos;
