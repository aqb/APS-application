import { singleton } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import Item from "../../../negocio/Item/Item";
import IRepositorioEstoque from "../IRepositorioEstoque";
import ItensDefault from "./default";

@singleton()
class RepositorioEstoqueInMemory implements IRepositorioEstoque {
  private itens: Item[];

  constructor() {
    // TODO: Remover dados estaticos!
    this.itens = ItensDefault;
  }

  adicionarNovoProduto(item: Item) {
    const id = uuidv4();
    item.getProduto().setId(id);
    this.itens.push(item);
  }

  adicionarItens(itens: Item[]): void {
    itens.forEach(item => {
      this.adicionar(item);
    });
  }

  adicionar(item: Item): void {
    const itemEstoque = this.itens.find(
      itemEstoque => itemEstoque.getId() === item.getId()
    );

    if (itemEstoque) {
      itemEstoque.adicionarProduto(item.getQuantidade());
    } else {
      this.itens.push(item);
    }
  }

  pegarItens(nomeFiltro?: string): Item[] {
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

  pegarItemPeloId(id: string): Item {
    const item = this.itens.find(item => item.getId() === id);
    if (item) {
      return item;
    }
    throw new Error(`Item ${id} não encontrado`);
  }

  reservarItens(itensCarrinho: Item[]) {
    itensCarrinho.forEach(itemCarrinho => {
      const itemEstoque = this.itens.find(
        itemEstoque => itemEstoque.getId() === itemCarrinho.getId()
      );
      if (itemEstoque !== undefined) {
        const qtdParaAdicionar = itemCarrinho.getQuantidade();
        if (itemEstoque.getQuantidade() >= qtdParaAdicionar) {
          itemEstoque.removerProduto(qtdParaAdicionar);
        } else {
          throw new Error(
            `Item ${itemEstoque.getNome()} não existe em estoque.`
          );
        }
      } else {
        throw new Error(
          `Item ${itemCarrinho.getNome()} não encontrado no estoque.`
        );
      }
    });
  }
}

export default RepositorioEstoqueInMemory;
