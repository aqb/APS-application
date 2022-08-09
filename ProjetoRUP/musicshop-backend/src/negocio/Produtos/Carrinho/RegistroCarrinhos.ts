import { inject, injectable } from "tsyringe";

import IRepositorioCarrinhos from "../../../dados/Carrinho/IRepositorioCarrinhos";
import IRepositorioEstoque from "../../../dados/Estoque/IRepositorioEstoque";
import Cliente from "../../Cliente/Cliente";
import Produto from "../Produto";
import Carrinho from "./Carrinho";

@injectable()
class RegistroCarrinhos {
  private repositorioCarrinhos;

  constructor(
    @inject("RepositorioCarrinhos") repositorioCarrinhos: IRepositorioCarrinhos
  ) {
    this.repositorioCarrinhos = repositorioCarrinhos;
  }

  public adicionar(cliente: Cliente) {
    const carrinho = new Carrinho(cliente.getId(), []);
    this.repositorioCarrinhos.adicionar(carrinho);
  }

  public pegarCarrinhoDe(cliente: Cliente): Carrinho {
    return this.repositorioCarrinhos.pegarCarrinhoDe(cliente);
  }

  public atualizarCarrinho(
    carrinho: Carrinho,
    produto: Produto,
    quantidade: number
  ) {
    this.repositorioCarrinhos.atualizarCarrinho(carrinho, produto, quantidade);
  }
}

export default RegistroCarrinhos;
