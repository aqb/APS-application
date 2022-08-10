import { singleton } from "tsyringe";

import Cliente from "../../../negocio/Cliente/Cliente";
import Carrinho from "../../../negocio/Produtos/Carrinho/Carrinho";
import Produto from "../../../negocio/Produtos/Produto";
import IRepositorioCarrinhos from "../IRepositorioCarrinhos";

@singleton()
class RepositorioCarrinhosInMemory implements IRepositorioCarrinhos {
  private carrinhos: Carrinho[];

  constructor() {
    this.carrinhos = [];
  }

  adicionar(carrinho: Carrinho): void {
    throw new Error("Method not implemented.");
  }

  pegarCarrinhoDe(cliente: Cliente): Carrinho {
    throw new Error("Method not implemented.");
  }

  atualizarCarrinho(
    carrinho: Carrinho,
    produto: Produto,
    quantidade: number
  ): void {
    throw new Error("Method not implemented.");
  }
}

export default RepositorioCarrinhosInMemory;
