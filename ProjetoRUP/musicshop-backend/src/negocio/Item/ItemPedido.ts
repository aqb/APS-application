import Produto from "../Produto/Produto";
import Item from "./Item";

class ItemPedido extends Item {
  private valor;

  public constructor(produto: Produto, quantidade: number, valor: number) {
    super(produto, quantidade);
    this.valor = valor;
  }

  public getId(): string {
    return this.getProduto().getId();
  }

  public getValor(): number {
    return this.valor;
  }

  public setValor(valor: number) {
    this.valor = valor;
  }
}

export default ItemPedido;
