import Produto from "../Produto";

class ItemCarrinho {
  private produto;
  private quantidade;

  constructor(produto: Produto, quantidade: number) {
    this.produto = produto;
    this.quantidade = quantidade;
  }

  public getId() {
    return this.getProduto().getId();
  }

  public getProduto(): Produto {
    return this.produto;
  }

  public setProduto(produto: Produto) {
    this.produto = produto;
  }

  public getQuantidade(): number {
    return this.quantidade;
  }

  public setQuantidade(quantidade: number) {
    this.quantidade = quantidade;
  }

  public getValorTotal(): number {
    return this.quantidade * this.getProduto().getValor();
  }

  public adicionarProduto() {
    this.setQuantidade(this.getQuantidade() + 1);
  }

  public removerProduto() {
    this.setQuantidade(this.getQuantidade() - 1);
  }
}

export default ItemCarrinho;
