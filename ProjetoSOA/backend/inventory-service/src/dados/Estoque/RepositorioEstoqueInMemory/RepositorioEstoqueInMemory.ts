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

  async adicionarNovoProduto(item: Item): Promise<void> {
    const id = uuidv4();
    item.getProduto().setId(id);
    this.itens.push(item);
  }

  async adicionarItens(itens: Item[]): Promise<void> {
    itens.forEach(item => {
      this.adicionar(item);
    });
  }

  async adicionar(item: Item): Promise<void> {
    const itemEstoque = this.itens.find(
      itemEstoque => itemEstoque.getId() === item.getId()
    );

    if (itemEstoque) {
      itemEstoque.adicionarProduto(item.getQuantidade());
    } else {
      this.itens.push(item);
    }
  }

  async pegarItens(nomeFiltro?: string): Promise<Item[]> {
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

  async pegarItemPeloId(id: string): Promise<Item> {
    const item = this.itens.find(item => item.getId() === id);
    if (item) {
      return item;
    }
    throw new Error(`Item ${id} não encontrado`);
  }

  async reservarItens(itensCarrinho: Item[]): Promise<void> {
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
