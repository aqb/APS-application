import Produto from "../Produto";

class ItemEstoque {
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

  public getNome(): string {
    return this.getProduto().getNome();
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

  public adicionarProduto(quantidade = 1) {
    this.setQuantidade(this.getQuantidade() + quantidade);
  }

  public removerProduto(quantidade = 1) {
    this.setQuantidade(this.getQuantidade() - quantidade);
  }
}

export default ItemEstoque;
