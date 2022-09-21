import Item from "../Item/Item";
import Usuario from "../Usuario/Usuario";

class Carrinho {
  private cliente;
  private id;
  private itens;

  public constructor(id: string, cliente: Usuario, itens: Item[]) {
    this.id = id;
    this.cliente = cliente;
    this.itens = itens;
  }

  public getId(): string {
    return this.id;
  }

  public getCliente(): Usuario {
    return this.cliente;
  }

  public setCliente(cliente: Usuario) {
    this.cliente = cliente;
  }

  public getItens(): Item[] {
    return this.itens;
  }

  public setItens(itens: Item[]) {
    this.itens = itens;
  }

  public removerItem(item: Item) {
    this.itens = this.itens.filter(i => i.getId() !== item.getId());
  }

  public getValorTotal(): number {
    return this.itens.reduce((total, item) => total + item.getValorTotal(), 0);
  }

  public adicionarItem(item: Item) {
    const itemCarrinho = this.itens.find(
      itemCarrinho => itemCarrinho.getId() === item.getId()
    );
    if (itemCarrinho) {
      itemCarrinho.adicionarProduto(item.getQuantidade());
    } else {
      this.itens.push(item);
    }
  }

  public getQuantidade(produtoId: string): number {
    return this.itens.reduce(
      (total, item) =>
        total + (item.getId() === produtoId ? item.getQuantidade() : 0),
      0
    );
  }

  public limpar(): void {
    this.setItens([]);
  }

  public isEmpty(): boolean {
    return this.getItens().length === 0;
  }
}

export default Carrinho;
