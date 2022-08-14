import { singleton } from "tsyringe";

import ItemEstoque from "../../../negocio/Produto/Estoque/ItemEstoque";
import Produto from "../../../negocio/Produto/Produto";
import IRepositorioEstoque from "../IRepositorioEstoque";
import ItensDefault from "./default";

@singleton()
class RepositorioEstoqueInMemory implements IRepositorioEstoque {
  private itens: ItemEstoque[];

  constructor() {
    // TODO: Remover dados estaticos!
    this.itens = ItensDefault;
  }

  adicionar(produto: Produto): void {
    const id = (this.itens.length + 1).toString();
    const item = new ItemEstoque(produto, 1);
    this.itens.push(item);
  }

  pegarItensEstoque(nomeFiltro?: string): ItemEstoque[] {
    return this.itens.filter(item => {
      if (nomeFiltro) {
        return item
          .getProduto()
          .getNome()
          .toLowerCase()
          .includes(nomeFiltro.toLowerCase());
      }
      return true;
    });
  }

  pegarItemEstoque(produto: Produto): ItemEstoque {
    return this.pegarItemEstoquePeloId(produto.getId());
  }

  pegarItemEstoquePeloId(id: string): ItemEstoque {
    const item = this.itens.find(item => item.getId() === id);
    if (item) {
      return item;
    }
    throw new Error(`Item ${id} não encontrado`);
  }
}

export default RepositorioEstoqueInMemory;
