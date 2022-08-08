import ItemCarrinho from "./ItemCarrinho";

class Carrinho {
  private itens;

  public constructor(itens: ItemCarrinho[]) {
    this.itens = itens;
  }
}

export default Carrinho;
