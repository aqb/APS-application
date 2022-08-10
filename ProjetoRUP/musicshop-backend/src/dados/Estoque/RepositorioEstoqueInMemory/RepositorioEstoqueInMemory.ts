import { singleton } from "tsyringe";

import Cliente from "../../../negocio/Cliente/Cliente";
import ItemEstoque from "../../../negocio/Produtos/Estoque/ItemEstoque";
import Produto from "../../../negocio/Produtos/Produto";
import IRepositorioEstoque from "../IRepositorioEstoque";

// TODO: Remover dados estaticos!
const defaultItens: ItemEstoque[] = [
  new ItemEstoque(new Produto("1", "Guitarra", "Guitarra de rock", 100), 13),
  new ItemEstoque(new Produto("2", "Bateria", "Bateria Verde", 13000), 4),
  new ItemEstoque(
    new Produto("3", "Cavaquinho", "Cavaquinho de pagode", 130),
    20
  ),
  new ItemEstoque(new Produto("4", "Microfone", "Microfone", 219), 10),
  new ItemEstoque(
    new Produto("5", "Pandeiro", "Pandeiro do Mumuzinho", 50000),
    1
  ),
  new ItemEstoque(new Produto("14", "Guitarra", "Guitarra vermelha", 1300), 5)
];

@singleton()
class RepositorioEstoqueInMemory implements IRepositorioEstoque {
  private itens: ItemEstoque[];

  constructor() {
    // TODO: Remover dados estaticos!
    this.itens = defaultItens;
  }

  adicionar(produto: Produto): void {
    const id = (this.itens.length + 1).toString();
    const item = new ItemEstoque(produto, 1);
    this.itens.push(item);
  }

  pegarItensComNome(nome: string): ItemEstoque[] {
    return this.itens.filter(item => item.getNome() === nome);
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
