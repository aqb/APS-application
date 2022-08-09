import ItemCarrinho from "./ItemCarrinho";

class Carrinho {
  private id;
  private itens;

  public constructor(id: string, itens: ItemCarrinho[]) {
    this.id = id;
    this.itens = itens;
  }
}

export default Carrinho;
