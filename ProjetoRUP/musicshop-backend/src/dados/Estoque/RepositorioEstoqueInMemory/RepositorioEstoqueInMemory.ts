import { singleton } from "tsyringe";

import Carrinho from "../../../negocio/Produto/Carrinho/Carrinho";
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

  reservaItemEstoque(carrinho: Carrinho) {
    const itensCarrinho = carrinho.getItens();
    itensCarrinho.forEach(itemCarrinho => {
      const item = this.itens.find(
        itemEstoque => itemEstoque.getId() === itemCarrinho.getId()
      );
      if (item !== undefined) {
        if (item.getQuantidade() >= itemCarrinho.getQuantidade()) {
          item.removerProduto(itemCarrinho.getQuantidade());
        } else {
          throw new Error(`Item ${item.getNome()} não existe em estoque`);
        }
      } else {
        throw new Error(`Item não encontrado no estoque`);
      }
    });
  }

  devolverItensAoEstoque(itens: any): void {
    itens.forEach(
      (item: {
        getId: () => string;
        getQuantidade: () => number | undefined;
      }) => {
        const itemEstoque = this.pegarItemEstoquePeloId(item.getId());
        itemEstoque.adicionarProduto(item.getQuantidade());
      }
    );
  }
}

export default RepositorioEstoqueInMemory;
