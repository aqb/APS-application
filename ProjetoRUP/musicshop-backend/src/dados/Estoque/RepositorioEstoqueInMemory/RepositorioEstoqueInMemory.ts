import { singleton } from "tsyringe";

import Cliente from "../../../negocio/Cliente/Cliente";
import ItemEstoque from "../../../negocio/Produtos/Estoque/ItemEstoque";
import Produto from "../../../negocio/Produtos/Produto";
import IRepositorioEstoque from "../IRepositorioEstoque";

@singleton()
class RepositorioEstoqueInMemory implements IRepositorioEstoque {
  private itens: ItemEstoque[];

  constructor() {
    this.itens = [];
  }

  adicionar(produto: Produto): void {
    throw new Error("Method not implemented.");
  }

  getItensComNome(nome: string): ItemEstoque[] {
    throw new Error("Method not implemented.");
  }

  getItemEstoque(produto: Produto): ItemEstoque {
    throw new Error("Method not implemented.");
  }
}

export default RepositorioEstoqueInMemory;
