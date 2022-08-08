import IRepositorioEstoque from "../../../dados/IRepositorioEstoque";
import Produto from "../Produto";

class RegistroEstoque {
  private repositorioEstoque;

  constructor(repositorioEstoque: IRepositorioEstoque) {
    this.repositorioEstoque = repositorioEstoque;
  }

  public adicionar(produto: Produto) {
    this.repositorioEstoque.adicionar(produto);
  }
}

export default RegistroEstoque;
