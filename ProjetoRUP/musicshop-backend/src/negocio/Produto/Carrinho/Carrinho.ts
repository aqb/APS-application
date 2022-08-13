import Produto from "../Produto";
import ItemCarrinho from "./ItemCarrinho";

class Carrinho {
  private id;
  private itens;

  public constructor(id: string, itens: ItemCarrinho[]) {
    this.id = id;
    this.itens = itens;
  }

  public getId(): string {
    return this.id;
  }

  public getItens(): ItemCarrinho[] {
    return this.itens;
  }

  public setItens(itens: ItemCarrinho[]) {
    this.itens = itens;
  }

  public adicionarItem(item: ItemCarrinho) {
    this.itens.push(item);
  }

  public removerItem(item: ItemCarrinho) {
    this.itens = this.itens.filter(i => i.getId() !== item.getId());
  }

  public getValorTotal(): number {
    return this.itens.reduce((total, item) => total + item.getValorTotal(), 0);
  }

  public adicionarProduto(produto: Produto, quantidade: number) {
    const itemCarrinho = this.itens.find(i => i.getId() === produto.getId());
    if (itemCarrinho) {
      itemCarrinho.adicionarProduto(quantidade);
    } else {
      this.adicionarItem(new ItemCarrinho(produto, quantidade));
    }
  }

  public getQuantidade(produtoId: string): number {
    return this.itens.reduce(
      (total, item) =>
        total + (item.getId() === produtoId ? item.getQuantidade() : 0),
      0
    );
  }
}

export default Carrinho;
